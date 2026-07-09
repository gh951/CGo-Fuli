// ════════════════════════════════════════════════════════════
// CGO-FULI Service Worker v3.1 (C-63 로딩 최적화)
// 특허 10-2026-0060113 · 기획 이주원 × C-14 × C-15 × C-63
// ════════════════════════════════════════════════════════════
//
// ★ C-63 변경 요약 (v3.0 → v3.1)
//   문제: 앱은 빠르게 뜨는데 브라우저 탭 로딩 스피너가 1분 넘게 계속 돌았다.
//   원인: ① index.html(약 11MB)을 cache:'no-store'로 매 방문마다 전체 재다운로드
//         ② 받은 11MB를 response.clone() 해서 Cache Storage에 다시 복사
//   해결: ① no-store → no-cache (서버에 변경 여부만 확인 → 안 바뀌었으면 304, 0바이트)
//         ② 문서(11MB)는 캐시에 쓰지 않음. 오프라인 폴백은 install 시 받아둔 것을 사용
//   결과: '항상 최신 버전' 보장은 그대로. 배포 즉시 반영됨. 스피너·트래픽만 해소.
//   원복: 아래 USE_NO_STORE 를 true 로 바꾸면 v3.0 동작.
// ════════════════════════════════════════════════════════════

const CACHE_NAME = 'cgo-fuli-v3-1';
const CACHE_URLS = [
  '/',
  '/index.html'
];

// v3.0 동작으로 되돌리려면 true
const USE_NO_STORE = false;

// ── 설치: 핵심 파일 캐싱 (오프라인 폴백용) ──
self.addEventListener('install', function(e) {
  console.log('[CGO-FULI SW] v3.1 설치 중...');
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
  console.log('[CGO-FULI SW] 활성화 v3.1');
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

  // index.html/네비게이션 판별
  var isDoc = e.request.mode === 'navigate' ||
              e.request.url.indexOf('index.html') > -1 ||
              e.request.url.endsWith('/');

  // ★ C-63: no-store(전체 재다운로드) → no-cache(변경 확인만)
  //   no-cache 도 서버에 매번 검증 요청을 보내므로 '항상 최신'은 동일하게 보장된다.
  //   다만 파일이 안 바뀌었으면 304 Not Modified(본문 0바이트)로 끝나므로
  //   11MB를 매번 다시 받지 않는다 → 탭 스피너가 즉시 멈춘다.
  var docReq = isDoc
    ? new Request(e.request.url, { cache: USE_NO_STORE ? 'no-store' : 'no-cache' })
    : e.request;

  e.respondWith(
    fetch(docReq)
      .then(function(response) {
        // ★ C-63: 문서(11MB)는 clone()해서 캐시에 다시 쓰지 않는다.
        //   clone()은 본문 전체를 메모리에 복제하고 Cache Storage 쓰기까지 유발해
        //   로딩이 끝난 뒤에도 백그라운드 작업이 길게 이어졌다.
        //   오프라인 폴백은 install 단계에서 받아둔 '/index.html'로 충분하다.
        if (!isDoc && response && response.status === 200 && response.type === 'basic') {
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

console.log('[CGO-FULI SW] v3.1 로드 완료 · C-63 로딩 최적화 · 특허 10-2026-0060113');
