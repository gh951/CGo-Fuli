// ─────────────────────────────────────────────────────────────
// api/stock.js  ·  CGO-FULI 실시간 시세 프록시 (Twelve Data)
// ─────────────────────────────────────────────────────────────
// 목적: API 키를 브라우저에 노출하지 않고, 서버(Vercel)에서 대신
//       Twelve Data 시세를 가져와 종목 카드에 "현재가"를 보여줌.
// 사용법(프론트): fetch('/api/stock?symbol=AAPL')  또는  ?symbol=005930&country=KR
// 환경변수: Vercel → Settings → Environment Variables 에
//           이름 TWELVE_DATA_KEY  값 [발급받은 키]  를 추가.
// 무료 한도: 800회/일, 8회/분 (검색한 종목 1개만 호출하므로 충분)
// ─────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // CORS (같은 도메인이면 없어도 되지만 안전하게)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    var key = process.env.TWELVE_DATA_KEY;
    if (!key) {
      res.status(200).json({ ok: false, reason: 'NO_KEY', msg: '서버에 시세 키가 설정되지 않았습니다.' });
      return;
    }

    var symbol = (req.query.symbol || '').toString().trim();
    if (!symbol) {
      res.status(200).json({ ok: false, reason: 'NO_SYMBOL', msg: '종목 심볼이 없습니다.' });
      return;
    }

    // 한국 종목(6자리 숫자)이면 거래소(KRX) 힌트 추가 → 정확도 ↑
    var country = (req.query.country || '').toString().trim().toUpperCase();
    var isKR = /^\d{6}$/.test(symbol) || country === 'KR';

    // Twelve Data /quote 엔드포인트 (현재가 + 등락 포함)
    var url = 'https://api.twelvedata.com/quote'
      + '?symbol=' + encodeURIComponent(symbol)
      + (isKR ? '&exchange=KRX&country=South Korea' : '')
      + '&apikey=' + encodeURIComponent(key);

    var r = await fetch(url);
    var data = await r.json();

    // Twelve Data 에러 형태: {status:'error', message:'...'}
    if (!data || data.status === 'error' || data.code) {
      res.status(200).json({
        ok: false,
        reason: 'API_ERROR',
        msg: (data && data.message) ? data.message : '시세를 찾지 못했습니다.'
      });
      return;
    }

    // 정상 응답 → 화면에 필요한 값만 추려서 반환
    var price = parseFloat(data.close);
    var prevClose = parseFloat(data.previous_close);
    var change = (isFinite(price) && isFinite(prevClose)) ? (price - prevClose) : null;
    var percent = (data.percent_change != null) ? parseFloat(data.percent_change) : null;

    res.status(200).json({
      ok: true,
      symbol: data.symbol || symbol,
      name: data.name || '',
      currency: data.currency || (isKR ? 'KRW' : 'USD'),
      exchange: data.exchange || '',
      price: isFinite(price) ? price : null,
      prevClose: isFinite(prevClose) ? prevClose : null,
      change: change,
      percent: (percent != null && isFinite(percent)) ? percent : null,
      isOpen: (data.is_market_open === true || data.is_market_open === 'true'),
      datetime: data.datetime || '',
      // ⚠️ 무료 티어는 지연될 수 있음(참고용). 투자 판단은 본인 책임.
      delayed: true
    });
  } catch (e) {
    res.status(200).json({ ok: false, reason: 'EXCEPTION', msg: '시세 요청 중 오류가 발생했습니다.' });
  }
}
