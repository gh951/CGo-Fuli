// ════════════════════════════════════════════════════════════
// CGO-FULI Service Worker v2.0
// 특허 10-2026-0060113 · 기획 이주원 × C-14 × C-15
// ════════════════════════════════════════════════════════════

const CACHE_NAME = 'cgo-fuli-v2';
const CACHE_URLS = [
  '/',
  '/index.html'
];

// ── 설치: 핵심 파일 캐싱 ──
self.addEventListener('install', function(e) {
  console.log('[CGO-FULI SW] 설치 중...');
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_URLS).catch(function(err) {
        console.log('[CGO-FULI SW] 캐시 일부 실패 (무시):', err);
      });
    })
  );
  self.skipWaiting();
});

// ── 활성화: 구 캐시 삭제 ──
self.addEventListener('activate', function(e) {
  console.log('[CGO-FULI SW] 활성화');
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CACHE_NAME;
        }).map(function(key) {
          console.log('[CGO-FULI SW] 구 캐시 삭제:', key);
          return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});

// ── 네트워크 요청 처리 ──
// 전략: Network First (항상 최신 버전 우선, 오프라인 시 캐시 사용)
self.addEventListener('fetch', function(e) {
  // POST, 외부 도메인은 패스
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    fetch(e.request)
      .then(function(response) {
        // 성공 시 캐시 업데이트 후 반환
        if (response && response.status === 200 && response.type === 'basic') {
          var cloned = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, cloned);
          });
        }
        return response;
      })
      .catch(function() {
        // 오프라인: 캐시에서 반환
        return caches.match(e.request).then(function(cached) {
          if (cached) return cached;
          // index.html 폴백
          return caches.match('/index.html');
        });
      })
  );
});

// ── 푸시 알림 수신 ──
self.addEventListener('push', function(e) {
  var data = {};
  try {
    data = e.data ? e.data.json() : {};
  } catch(err) {
    data = { title: 'CGO-FULI', body: e.data ? e.data.text() : '새 알림이 있습니다.' };
  }

  var title   = data.title   || 'CGO-FULI';
  var body    = data.body    || '새 알림이 있습니다.';
  var icon    = data.icon    || '/icon-192.png';
  var badge   = data.badge   || '/icon-192.png';
  var tag     = data.tag     || 'cgo-fuli-notify';
  var type    = data.type    || 'general';

  var options = {
    body:    body,
    icon:    icon,
    badge:   badge,
    tag:     tag,
    vibrate: [200, 100, 200],
    data:    { type: type, url: data.url || '/' },
    actions: []
  };

  // 메신저 알림
  if (type === 'messenger' || type === 'CGM_NOTIFY_CLICK') {
    options.actions = [
      { action: 'open',    title: '💬 메시지 확인' },
      { action: 'dismiss', title: '닫기' }
    ];
    options.requireInteraction = true;
  }

  e.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ── 알림 클릭 처리 ──
self.addEventListener('notificationclick', function(e) {
  e.notification.close();

  var data   = e.notification.data || {};
  var action = e.action;
  var type   = data.type || 'general';

  if (action === 'dismiss') return;

  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(function(clientList) {
        // 이미 열린 창 있으면 포커스
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url.indexOf('c-go-fuli.com') > -1 && 'focus' in client) {
            client.focus();
            // 메신저 알림이면 메신저 열기 메시지 전달
            if (type === 'messenger' || type === 'CGM_NOTIFY_CLICK') {
              client.postMessage({ type: 'CGM_NOTIFY_CLICK' });
            }
            return;
          }
        }
        // 새 창 열기
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});

// ── 백그라운드 동기화 (미래 확장용) ──
self.addEventListener('sync', function(e) {
  if (e.tag === 'cgo-sync') {
    console.log('[CGO-FULI SW] 백그라운드 동기화');
  }
});

console.log('[CGO-FULI SW] v2.0 로드 완료 · 특허 10-2026-0060113');
