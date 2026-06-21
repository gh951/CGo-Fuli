// ─────────────────────────────────────────────────────────────
// api/stock.js · CGO-FULI 글로벌 시세 프록시 (멀티소스 폴백 + 캐싱)
// ─────────────────────────────────────────────────────────────
// 구조(정직): 무료 우선 → 무료 → 유료(폴백) 순서로 시도.
//   1) Yahoo Finance (무료, 다국적, 지연시세)   ← 메인
//   2) stooq.com    (무료, CSV, 미국·유럽 일부)  ← 백업
//   3) Twelve Data  (유료 키, 위 둘 다 실패 시)   ← 최후 폴백
// + 메모리 캐싱(30분): 같은 종목 반복 호출을 줄여 비용/한도 절약.
//   (주의: 서버리스 인스턴스 단위 캐시라 완전 공유는 아님.
//    더 강한 공유 캐시는 추후 Vercel KV로 업그레이드 가능.)
// 프론트 호출: /api/stock?symbol=AAPL&cc=US  /  ?symbol=005930&cc=KR
// 환경변수(선택): TWELVE_DATA_KEY  (없어도 무료 소스로 동작)
// ─────────────────────────────────────────────────────────────

var _cache = global.__stkCache || (global.__stkCache = new Map());
var TTL = 30 * 60 * 1000; // 30분 캐싱

// 국가코드 → 야후 거래소 접미사
function yahooSuffix(cc){
  var M = {US:'',KR:'.KS',JP:'.T',HK:'.HK',GB:'.L',DE:'.DE',FR:'.PA',IT:'.MI',
    NL:'.AS',BE:'.BR',ES:'.MC',SE:'.ST',NO:'.OL',FI:'.HE',DK:'.CO',PT:'.LS',
    IE:'.IR',CH:'.SW',AT:'.VI',IN:'.NS',ID:'.JK',BR:'.SA',CA:'.TO',AU:'.AX',
    PL:'.WA',GR:'.AT',TW:'.TW',SG:'.SI',MY:'.KL',NZ:'.NZ',ZA:'.JO'};
  return M.hasOwnProperty(cc) ? M[cc] : null;
}
function yahooSymbol(symbol, cc){
  if(symbol.indexOf('.') >= 0) return symbol;        // 이미 접미사 있음
  if(cc === 'CN'){                                    // 중국: 상하이6→.SS, 선전0/3→.SZ
    if(/^6/.test(symbol)) return symbol + '.SS';
    if(/^[03]/.test(symbol)) return symbol + '.SZ';
    return symbol + '.SS';
  }
  var sfx = yahooSuffix(cc);
  return (sfx != null) ? (symbol + sfx) : symbol;
}

// ① Yahoo Finance (무료)
async function fromYahoo(symbol, cc){
  var ysym = yahooSymbol(symbol, cc);
  var url = 'https://query1.finance.yahoo.com/v8/finance/chart/'
    + encodeURIComponent(ysym) + '?range=1d&interval=1d';
  var r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if(!r.ok) throw new Error('yahoo http ' + r.status);
  var d = await r.json();
  var res = d && d.chart && d.chart.result && d.chart.result[0];
  if(!res || !res.meta) throw new Error('yahoo nodata');
  var m = res.meta;
  var price = m.regularMarketPrice;
  var prev = m.chartPreviousClose != null ? m.chartPreviousClose : m.previousClose;
  if(price == null) throw new Error('yahoo noprice');
  var pct = (prev && prev !== 0) ? ((price - prev) / prev * 100) : null;
  return { ok:true, symbol:ysym, price:price, percent:pct,
    currency:m.currency || '', exchange:m.exchangeName || '', source:'yahoo' };
}

// ② stooq.com (무료 CSV)
async function fromStooq(symbol, cc){
  var ssym = symbol.toLowerCase();
  if(cc === 'US' && ssym.indexOf('.') < 0) ssym += '.us';
  var url = 'https://stooq.com/q/l/?s=' + encodeURIComponent(ssym) + '&f=sd2t2ohlcv&h&e=csv';
  var r = await fetch(url);
  if(!r.ok) throw new Error('stooq http');
  var txt = await r.text();
  var lines = txt.trim().split('\n');
  if(lines.length < 2) throw new Error('stooq nodata');
  var cols = lines[1].split(',');           // Symbol,Date,Time,Open,High,Low,Close,Volume
  var close = parseFloat(cols[6]);
  var open = parseFloat(cols[3]);
  if(!isFinite(close) || close === 0) throw new Error('stooq noprice');
  var pct = (isFinite(open) && open !== 0) ? ((close - open) / open * 100) : null;
  return { ok:true, symbol:symbol, price:close, percent:pct,
    currency:'', exchange:'stooq', source:'stooq' };
}

// ③ Twelve Data (유료 키 · 최후 폴백)
async function fromTwelve(symbol, cc, key){
  var isKR = (cc === 'KR');
  var url = 'https://api.twelvedata.com/quote?symbol=' + encodeURIComponent(symbol)
    + (isKR ? '&exchange=KRX' : '') + '&apikey=' + encodeURIComponent(key);
  var r = await fetch(url);
  var d = await r.json();
  if(!d || d.status === 'error' || d.code) throw new Error('twelve');
  var price = parseFloat(d.close);
  if(!isFinite(price)) throw new Error('twelve noprice');
  return { ok:true, symbol:symbol, price:price,
    percent:(d.percent_change != null ? parseFloat(d.percent_change) : null),
    currency:d.currency || '', exchange:d.exchange || '', source:'twelvedata' };
}

export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if(req.method === 'OPTIONS'){ res.status(200).end(); return; }

  var symbol = (req.query.symbol || '').toString().trim();
  var cc = (req.query.cc || req.query.country || '').toString().trim().toUpperCase();
  if(!symbol){ res.status(200).json({ ok:false, reason:'NO_SYMBOL', msg:'종목 심볼이 없습니다.' }); return; }

  // 캐시 확인
  var ckey = symbol + '|' + cc;
  var hit = _cache.get(ckey);
  if(hit && (Date.now() - hit.t) < TTL){
    res.status(200).json(Object.assign({ cached:true }, hit.v));
    return;
  }

  var out = null;
  // 1) Yahoo (무료)
  try { out = await fromYahoo(symbol, cc); } catch(e){}
  // 2) stooq (무료)
  if(!out){ try { out = await fromStooq(symbol, cc); } catch(e){} }
  // 3) Twelve Data (유료 폴백) — 키 있을 때만
  if(!out){
    var key = process.env.TWELVE_DATA_KEY;
    if(key){ try { out = await fromTwelve(symbol, cc, key); } catch(e){} }
  }

  if(!out){
    res.status(200).json({ ok:false, reason:'NOT_FOUND', msg:'시세를 찾지 못했습니다.' });
    return;
  }
  _cache.set(ckey, { t:Date.now(), v:out });
  // 캐시 과대 방지(최대 2000종목 유지)
  if(_cache.size > 2000){ var k0 = _cache.keys().next().value; _cache.delete(k0); }
  res.status(200).json(out);
}
