// ═══════════════════════════════════════════
// CGO-FULI Service Worker v2.0
// 푸시 알림 + 오프라인 캐시
// ═══════════════════════════════════════════

const CACHE_NAME = 'cgo-fuli-v2';

// ── 설치 ──
self.addEventListener('install', function(e){
  self.skipWaiting();
});

// ── 활성화 ──
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_NAME; })
            .map(function(k){ return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// ── 푸시 알림 수신 ──
self.addEventListener('push', function(e){
  var data = {};
  try {
    data = e.data ? e.data.json() : {};
  } catch(err) {
    data = { title: 'CGO 메신저', body: '새 메시지가 왔습니다!' };
  }

  var title   = data.title || 'CGO 메신저 💬';
  var options = {
    body:    data.body  || '새 메시지가 왔습니다!',
    icon:    '/images/icon-192.png',
    badge:   '/images/icon-192.png',
    tag:     'cgm-message',
    renotify: true,
    vibrate: [200, 100, 200],
    data:    { url: data.url || '/' },
    // ★ 풍경 소리 — 알림음 파일이 있으면 적용
    // silent: false  // 기본값
  };

  e.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ── 알림 클릭 ──
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var targetUrl = (e.notification.data && e.notification.data.url) || '/';

  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(function(windowClients){
        // 이미 열린 창이 있으면 포커스
        for(var i = 0; i < windowClients.length; i++){
          var client = windowClients[i];
          if(client.url.indexOf(self.location.origin) >= 0 && 'focus' in client){
            client.focus();
            client.postMessage({ type: 'CGM_NOTIFY_CLICK' });
            return;
          }
        }
        // 없으면 새 창 열기
        if(clients.openWindow){
          return clients.openWindow(targetUrl);
        }
      })
  );
});

// ── Firebase 메시지 백그라운드 수신 (compat) ──
// Firebase SDK가 로드되어 있으면 백그라운드 메시지 처리
try {
  importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

  var firebaseConfig = {
    apiKey: "AIzaSyBwT8Dz1C07J-UK3V6Y1oj4-XJvxr6CXMg",
    authDomain: "cgo-life.firebaseapp.com",
    databaseURL: "https://cgo-life-default-rtdb.firebaseio.com",
    projectId: "cgo-life",
    storageBucket: "cgo-life.firebasestorage.app",
    messagingSenderId: "435295214189",
    appId: "1:435295214189:web:004edd952498cbff727d64"
  };

  firebase.initializeApp(firebaseConfig);
  var messaging = firebase.messaging();

  // 백그라운드 메시지 처리
  messaging.onBackgroundMessage(function(payload){
    var title   = (payload.notification && payload.notification.title) || 'CGO 메신저 💬';
    var body    = (payload.notification && payload.notification.body)  || '새 메시지가 왔습니다!';
    var options = {
      body:     body,
      icon:     '/images/icon-192.png',
      badge:    '/images/icon-192.png',
      tag:      'cgm-message',
      renotify: true,
      vibrate:  [200, 100, 200]
    };
    return self.registration.showNotification(title, options);
  });
} catch(e) {
  // Firebase SDK 로드 실패 시 기본 push 이벤트로 처리
  console.log('[CGO-SW] Firebase 없이 기본 push 처리');
}
