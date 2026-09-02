// ══════════════════════════════════════════════════════════════
//  /api/stock  —  실시간 시세 한 자리
//
//  앱이 부르는 모양      /api/stock?symbol=005930&cc=KR
//  앱이 기다리는 답      { ok:true, price:71800, percent:1.24, currency:'KRW' }
//
//  ★ 값이 들지 않는다. 열쇠도 필요 없다.
//    Yahoo 의 공개 시세 자리를 쓰고, 같은 종목은 60초 동안 기억해
//    손님이 여러 번 눌러도 밖으로는 한 번만 나간다.
//
//  ★ 종목코드에 나라 꼬리를 붙인다.
//    삼성전자는 005930 이지만 Yahoo 에서는 005930.KS 다.
//    코스닥이면 .KQ 이므로 둘을 차례로 두드린다.
// ══════════════════════════════════════════════════════════════

// 나라 → 꼬리. 앞의 것부터 두드리고, 값이 나오면 그것으로 끝낸다.
const SUFFIX = {
  KR: ['.KS', '.KQ'],          // 코스피 · 코스닥
  US: [''],                    // 뉴욕·나스닥은 꼬리가 없다
  JP: ['.T'],
  CN: ['.SS', '.SZ'],          // 상하이 · 선전
  HK: ['.HK'],
  TW: ['.TW', '.TWO'],
  GB: ['.L'],  UK: ['.L'],
  DE: ['.DE', '.F'],
  FR: ['.PA'],
  NL: ['.AS'],
  BE: ['.BR'],
  IT: ['.MI'],
  ES: ['.MC'],
  PT: ['.LS'],
  IE: ['.IR'],
  AT: ['.VI'],
  CH: ['.SW'],
  SE: ['.ST'],
  NO: ['.OL'],
  DK: ['.CO'],
  FI: ['.HE'],
  IS: ['.IC'],
  PL: ['.WA'],
  HU: ['.BD'],
  CZ: ['.PR'],
  GR: ['.AT'],
  TR: ['.IS'],
  RU: ['.ME'],
  IL: ['.TA'],
  SA: ['.SR'],
  AE: ['.AE'],
  IN: ['.NS', '.BO'],          // NSE · BSE
  ID: ['.JK'],
  MY: ['.KL'],
  TH: ['.BK'],
  PH: ['.PS'],
  SG: ['.SI'],
  VN: ['.VN'],
  AU: ['.AX'],
  NZ: ['.NZ'],
  CA: ['.TO', '.V'],
  BR: ['.SA'],
  MX: ['.MX'],
  CL: ['.SN'],
  AR: ['.BA'],
  ZA: ['.JO']
};

// 60초 기억 — 같은 종목을 여러 번 눌러도 밖으로는 한 번만 나간다
const CACHE = new Map();
const TTL = 60 * 1000;

function cacheGet(k) {
  const hit = CACHE.get(k);
  if (!hit) return null;
  if (Date.now() - hit.at > TTL) { CACHE.delete(k); return null; }
  return hit.v;
}
function cacheSet(k, v) {
  CACHE.set(k, { v, at: Date.now() });
  // 너무 커지지 않게 — 오래된 것부터 버린다
  if (CACHE.size > 400) {
    const first = CACHE.keys().next().value;
    CACHE.delete(first);
  }
}

// Yahoo 한 자리를 두드린다. 값이 없으면 null 을 돌려 다음 꼬리로 넘긴다.
async function ask(sym) {
  const url = 'https://query1.finance.yahoo.com/v8/finance/chart/'
    + encodeURIComponent(sym) + '?interval=1d&range=5d';
  const r = await fetch(url, {
    headers: {
      // 이 머리글이 없으면 막는 일이 있다
      'User-Agent': 'Mozilla/5.0 (compatible; CGO-FULI/1.0)',
      'Accept': 'application/json'
    }
  });
  if (!r.ok) return null;

  const j = await r.json();
  const res = j && j.chart && j.chart.result && j.chart.result[0];
  const m = res && res.meta;
  if (!m) return null;

  const price = (m.regularMarketPrice != null) ? m.regularMarketPrice : null;
  if (price == null) return null;

  // 어제 종가 — 등락률을 셈하는 밑이다
  let prev = (m.chartPreviousClose != null) ? m.chartPreviousClose
           : (m.previousClose != null) ? m.previousClose : null;

  // meta 에 없으면 5일치 종가에서 직전 값을 찾는다
  if (prev == null) {
    try {
      const closes = res.indicators.quote[0].close.filter(v => v != null);
      if (closes.length >= 2) prev = closes[closes.length - 2];
    } catch (_) {}
  }

  const percent = (prev != null && prev !== 0)
    ? ((price - prev) / prev) * 100
    : null;

  return {
    ok: true,
    price,
    percent: (percent == null) ? null : Math.round(percent * 100) / 100,
    currency: (m.currency || 'USD').toUpperCase(),
    symbol: sym,
    exchange: m.exchangeName || m.fullExchangeName || null
  };
}

module.exports = async (req, res) => {
  // 앱과 같은 곳에서 부르므로 넓게 열 필요가 없다
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  // 서버 앞단에서도 60초 기억 — 손님이 몰려도 밖으로는 한 번만 나간다
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  try {
    const q = req.query || {};
    const raw = String(q.symbol || '').trim();
    const cc = String(q.cc || '').trim().toUpperCase();

    if (!raw) {
      return res.status(200).json({ ok: false, error: 'no symbol' });
    }
    // 이상한 글자는 받지 않는다
    if (!/^[A-Za-z0-9][A-Za-z0-9.\-]{0,15}$/.test(raw)) {
      return res.status(200).json({ ok: false, error: 'bad symbol' });
    }

    const key = cc + '|' + raw.toUpperCase();
    const hit = cacheGet(key);
    if (hit) return res.status(200).json(hit);

    // 두드릴 이름들을 짓는다
    const list = [];
    if (raw.includes('.')) {
      // 이미 꼬리가 붙어 있으면 그대로
      list.push(raw);
    } else {
      const sufs = SUFFIX[cc] || [''];
      for (const s of sufs) list.push(raw + s);
      // 나라를 모르면 여섯 자리 숫자는 한국으로 본다
      if (!SUFFIX[cc] && /^\d{6}$/.test(raw)) { list.push(raw + '.KS', raw + '.KQ'); }
      // 꼬리 없이도 한 번 (미국 종목이 cc 없이 올 때)
      if (list.indexOf(raw) < 0) list.push(raw);
    }

    for (const sym of list) {
      let out = null;
      try { out = await ask(sym); } catch (_) {}
      if (out) {
        cacheSet(key, out);
        return res.status(200).json(out);
      }
    }

    // 못 찾았다 — 앱은 「미지원」으로 안내하고 사주 분석은 그대로 보여 준다
    const miss = { ok: false, error: 'not found', tried: list };
    cacheSet(key, miss);
    return res.status(200).json(miss);

  } catch (e) {
    return res.status(200).json({ ok: false, error: String((e && e.message) || e) });
  }
};
