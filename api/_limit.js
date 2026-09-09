// ══════════════════════════════════════════════════════════════════
//  /api/_limit.js — 서버 문지기 (앞에 _ 가 붙어 Vercel 이 주소로 열지 않는다)
//
//  IP 하나가 1분·하루에 몇 번까지 부를 수 있는지 센다. claude.js · groq.js 둘이 같이 쓴다.
//  앱 안의 한도(localStorage)는 저장소를 지우면 0 이 되지만, 여기는 지울 수 없다.
//
//  한계 (정직하게): 메모리라 서버가 잠들다 깨면 하루 셈이 리셋된다 → 하루 한도는 「대충」, 1분 한도는 「확실」.
//                   같은 와이파이 식구는 한 IP 로 보인다. VPN 은 못 잡는다. 회원 토큰 기준은 다음 단계.
// ══════════════════════════════════════════════════════════════════

//  갈래(lane)별 한도 — 정책표와 원가 기준. { 1분, 하루 }
export const LIMIT = {
  basic:    { min: 3, day: 40 },   // Groq 0.4원 — 봇 방어 + Groq 무료 한도 보호
  advanced: { min: 2, day: 20 },   // Sonnet 63원
  premium:  { min: 1, day: 5  },   // Sonnet/Opus
  opus:     { min: 1, day: 6  },   // Opus 375원
  photo:    { min: 1, day: 6  },
  report:   { min: 1, day: 2  },
  naming:   { min: 1, day: 2  },
  med:      { min: 1, day: 6  },
  _all:     { min: 6, day: 80 }    // 모든 갈래 합산 — 이걸 넘으면 무엇을 눌러도 잠깐 막힌다
};

const seen = new Map();                 // key → 센 수

function tick(key, cap) {
  const n = (seen.get(key) || 0) + 1;
  seen.set(key, n);
  if (seen.size > 20000) seen.clear();  // 메모리가 쌓이지 않게 (몰려도 20,000 열쇠면 몇 MB)
  return n > cap;
}

export function ipOf(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
      || (req.socket && req.socket.remoteAddress) || 'unknown';
}

//  매니저 — 앱이 x-cgo-mgr 헤더로 열쇠를 보내고, Vercel 환경변수 CGO_MGR_KEY 와 같으면 한도를 안 센다.
//  (URL 의 /lee 는 누구나 칠 수 있어 서버가 믿지 않는다. 열쇠는 주인만 안다.)
export function isManager(req) {
  const k = process.env.CGO_MGR_KEY;
  return !!k && (req.headers['x-cgo-mgr'] === k);
}

//  돌려주는 것: null(통과) 또는 { lane, retry }  — retry 는 다시 시도할 때까지 초
export function check(req, lane) {
  if (isManager(req)) return null;
  const ip = ipOf(req);
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const minute = Math.floor(now.getTime() / 60000);
  const L = LIMIT[lane] || LIMIT.basic;

  //  합산 먼저 — 폭주는 갈래를 안 가린다
  if (tick(ip + '|_all|m|' + minute, LIMIT._all.min)) return { lane: '_all', retry: 60 - now.getSeconds() };
  if (tick(ip + '|_all|d|' + day,    LIMIT._all.day)) return { lane: '_all', retry: 3600 };
  //  갈래별
  if (tick(ip + '|' + lane + '|m|' + minute, L.min))  return { lane, retry: 60 - now.getSeconds() };
  if (tick(ip + '|' + lane + '|d|' + day,    L.day))  return { lane, retry: 3600 };
  return null;
}

//  막혔을 때 앱에 주는 모양 — 기존 { text, limited } 관례를 지킨다. 앱이 이 모양을 알아본다.
export function limitedBody(hit, tier, kind) {
  return { text: '', limited: true, lane: hit.lane, retry: hit.retry, tier, kind: kind || null, error: 'rate limit' };
}
