// ════════════════════════════════════════════════════════════
// CGO-FULI Service Worker v4.2 (cgo-507 : 일꾼 8명 쓰기)
// 특허 10-2026-0060113 · 기획 이주원 × C-14 × C-15 × C-63
// ════════════════════════════════════════════════════════════
//
// ★ v4.1 변경 요약 (v4.0 → v4.1)  — 2026-10-07
//   문제: 악보용 '목소리 가려내기'가 파트너 폰에서 24분 걸렸다.
//         띠에 찍힌 값 — `길 wasm · 실 1/8 · 한토막 38.2초 · 모델 229초/233초`
//         폰에 일꾼(CPU 코어)이 8명 있는데 1명만 일하고 있었다.
//   원인: 브라우저는 페이지가 '격리(crossOriginIsolated)' 돼 있을 때만
//         일꾼 여럿(SharedArrayBuffer)을 허락한다. 격리 도장은 서버가
//         머리글로 찍어 주는 것인데, 깃허브 페이지에서는 못 찍는다.
//   해결: 서비스워커가 자기 사이트 문서에 그 머리글을 찍어 준다.
//         index.html(cgo-503~)은 이미 `crossOriginIsolated` 가 켜지면
//         일꾼 수를 저절로 올리게 돼 있다. 이 파일만 바뀌면 된다.
//   잰 값: 일꾼 1명 → 2명에서 1.93배 (거의 비례). 8명이면 5~6배.
//         24분 → 4~5분 예상.
//
//   ⚠️ 안 되면 되돌리는 법 — 아래 세 가지 중 아무거나
//      ① 이 파일 맨 아래 줄의  const 섬켜기 = true;  를  false  로 바꿔 올린다
//      ② 주소 뒤에 ?noisolate=1 을 붙여 연다 (예: https://www.c-go-fuli.com/?noisolate=1)
//         → 그 방문만 도장을 안 찍는다. 앱이 안 열릴 때 들어가는 비상문이다
//      ③ sw_v40_backup.js 를 sw.js 로 올린다 (고치기 전 원본 그대로)
//
//   왜 require-corp 가 아니라 credentialless 인가
//      require-corp 는 바깥 도메인에서 오는 그림·소리를 전부 막는다.
//      수노 mp3 를 <audio> 로 트는 것이 막혀 음악이 안 나올 수 있다.
//      credentialless 는 '쿠키 없이' 받아오게만 하고 막지 않는다.
//      이 방식을 모르는 브라우저(구형 사파리 등)에서는 격리가 그냥 안 걸린다
//      → 일꾼 1명으로 지금과 똑같이 돈다. 나빠지지 않는다.
//
//   ★ C-63 변경 요약 (v3.0 → v3.1)  — 그대로 둠
//     문제: 앱은 빠르게 뜨는데 브라우저 탭 로딩 스피너가 1분 넘게 계속 돌았다.
//     원인: ① index.html(약 11MB)을 cache:'no-store'로 매 방문마다 전체 재다운로드
//           ② 받은 11MB를 response.clone() 해서 Cache Storage에 다시 복사
//     해결: ① no-store → no-cache (서버에 변경 여부만 확인 → 안 바뀌었으면 304, 0바이트)
//           ② 문서(11MB)는 캐시에 쓰지 않음. 오프라인 폴백은 install 시 받아둔 것을 사용
//     결과: '항상 최신 버전' 보장은 그대로. 배포 즉시 반영됨. 스피너·트래픽만 해소.
//     원복: 아래 USE_NO_STORE 를 true 로 바꾸면 v3.0 동작.
// ════════════════════════════════════════════════════════════

const CACHE_NAME = 'cgo-fuli-v4-2';   /* v4.2 : 격리 머리글 — 이름을 바꿔야 구 캐시가 지워진다 */
const CACHE_URLS = [
  '/',
  '/index.html',
  '/memo.html'
];

// v3.0 동작으로 되돌리려면 true
const USE_NO_STORE = false;

// ★ v4.1 : 격리 도장을 찍을지. false 로 바꾸면 v4.0 과 똑같이 돈다.
const 섬켜기 = true;

// ── 격리 도장 ──────────────────────────────────────────────
//   ⚠️ v4.1 에서 '문서에만' 찍었다가 실패했다. 잡아낸 오류 —
//        ort-wasm-simd-threaded.jsep.mjs :: net::ERR_BLOCKED_BY_RESPONSE
//      격리를 켜면 **일꾼(worker)용 파일 자체에도 도장이 있어야** 브라우저가 열어준다.
//      그래서 v4.2 부터는 우리 사이트에서 오는 것 전부에 찍는다.
//      바깥 도메인(수노 mp3, jsdelivr, raw.githubusercontent)은 손대지 않는다 —
//      애초에 fetch 핸들러 맨 위에서 걸러진다.
function 도장찍기(res, 문서냐) {
  if (!섬켜기) return res;
  if (!res || res.status !== 200 || res.type !== 'basic') return res;
  try {
    var h = new Headers(res.headers);
    if (문서냐) h.set('Cross-Origin-Opener-Policy', 'same-origin');
    h.set('Cross-Origin-Embedder-Policy', 'credentialless');
    h.set('Cross-Origin-Resource-Policy', 'same-origin');
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
  } catch (err) {
    return res;   /* 어떤 이유로든 못 만들면 원래 것을 그대로 — 절대 막지 않는다 */
  }
}

// ── 설치: 핵심 파일 캐싱 (오프라인 폴백용) ──
self.addEventListener('install', function(e) {
  console.log('[CGO-FULI SW] v4.2 설치 중...');
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
  console.log('[CGO-FULI SW] 활성화 v4.2');
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
              /\.html(\?|$)/.test(e.request.url) ||
              e.request.url.endsWith('/');

  // ★ v4.1 비상문: 주소에 noisolate 가 있으면 이번 방문은 도장을 안 찍는다.
  var 비상문 = e.request.url.indexOf('noisolate') > -1;

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
        var 쓸만 = response && response.status === 200 && response.type === 'basic';
        /* ★ v4.2 : 도장을 먼저 찍는다. 찍은 것을 캐시에도 넣어야 오프라인에서도 격리가 산다. */
        var 내보낼 = 비상문 ? response : 도장찍기(response, isDoc);
        // ★ C-63: 문서(11MB)는 clone()해서 캐시에 다시 쓰지 않는다.
        //   clone()은 본문 전체를 메모리에 복제하고 Cache Storage 쓰기까지 유발해
        //   로딩이 끝난 뒤에도 백그라운드 작업이 길게 이어졌다.
        //   오프라인 폴백은 install 단계에서 받아둔 '/index.html'로 충분하다.
        if (!isDoc && 쓸만) {
          try {
            var cloned = 내보낼.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(e.request, cloned);
            });
          } catch (err) {}
        }
        return 내보낼;
      })
      .catch(function() {
        // 오프라인: 캐시에서 반환
        return caches.match(e.request).then(function(cached) {
          if (cached) return 비상문 ? cached : 도장찍기(cached, isDoc);
          // index.html 폴백
          return caches.match('/index.html').then(function(fb) {
            if (!fb) return fb;
            return 비상문 ? fb : 도장찍기(fb, true);
          });
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

console.log('[CGO-FULI SW] v4.2 로드 완료 · 격리 도장 ' + (섬켜기 ? '켬' : '끔') +
            ' · 특허 10-2026-0060113');
