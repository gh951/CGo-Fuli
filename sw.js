// CGO-FULI Service Worker v1.0
// 특허 출원 제10-2026-0060113호

const CACHE_NAME = 'cgo-fuli-v1';
const CACHE_URLS = ['/'];

// ── 설치: 캐시 저장 ──
self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(CACHE_URLS);
    })
  );
  self.skipWaiting();
});

// ── 활성화: 구버전 캐시 삭제 ──
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

// ── 네트워크 요청: 캐시 우선 전략 ──
self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(cached){
      // 캐시 있으면 캐시 반환, 없으면 네트워크
      var fetchPromise = fetch(e.request).then(function(response){
        // HTML 페이지는 캐시 업데이트
        if(response && response.status === 200 && e.request.mode === 'navigate'){
          var responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache){
            cache.put(e.request, responseClone);
          });
        }
        return response;
      }).catch(function(){ return cached; });

      return cached || fetchPromise;
    })
  );
});

// ── 푸시 알림 수신 ──
self.addEventListener('push', function(e){
  var data = {};
  try{ data = e.data ? e.data.json() : {}; }catch(err){}

  var title = data.title || 'CGO 메신저';
  var options = {
    body: data.body || '새 메시지가 왔습니다! 💬',
    icon: data.icon || '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'cgm-message',
    renotify: true,
    vibrate: [200, 100, 200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: '열기' },
      { action: 'close', title: '닫기' }
    ]
  };

  e.waitUntil(self.registration.showNotification(title, options));
});

// ── 알림 클릭 ──
self.addEventListener('notificationclick', function(e){
  e.notification.close();

  if(e.action === 'close') return;

  var url = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(
    clients.matchAll({type:'window', includeUncontrolled:true}).then(function(clientList){
      // 이미 열린 탭 있으면 포커스
      for(var i=0; i<clientList.length; i++){
        var client = clientList[i];
        if(client.url.indexOf(self.location.origin) !== -1 && 'focus' in client){
          client.focus();
          client.postMessage({type:'CGM_NOTIFY_CLICK'});
          return;
        }
      }
      // 없으면 새 탭
      if(clients.openWindow) return clients.openWindow(url);
    })
  );
});

// ── 백그라운드 동기화 ──
self.addEventListener('sync', function(e){
  if(e.tag === 'cgm-sync'){
    // 오프라인 중 쌓인 메시지 전송
    e.waitUntil(
      self.clients.matchAll().then(function(clients){
        clients.forEach(function(client){
          client.postMessage({type:'CGM_SYNC'});
        });
      })
    );
  }
});
