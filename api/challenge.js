/**
 * FULI — 단어 챌린지 발급 (서버)
 *
 * verify.js 와 1:1 호환:
 *  - challengeId = base64({ t, words }) + '.' + sign(base64)
 *  - sign() 은 verify.js 와 동일한 HMAC-SHA256(MUFE_SECRET) 16자
 *  - verify.js 가 challenge.words.includes(caughtWord) 로 확인하므로
 *    여기서 발급한 words 안에서 사용자가 STOP 으로 하나를 잡는다.
 *  - 10분 유효(재생공격 방지) — verify.js 의 (Date.now()-data.t > 600*1000) 와 짝.
 *
 * 환경변수: MUFE_SECRET (verify.js·register.js 와 같은 값)
 */
const crypto = require('crypto');

const SECRET = process.env.MUFE_SECRET;
function sign(data) {
  return crypto.createHmac('sha256', SECRET).update(data).digest('hex').slice(0, 16);
}

// 회전 단어 풀 — 친숙한 한글 단어(사용자가 쉽게 읽고 잡게). 보안에 닿는 선택은 crypto 난수 사용.
//  ※ 무패 레포의 진짜 단어 풀이 따로 있으면 이 배열만 그걸로 교체하면 됩니다(나머지 로직 동일).
const WORD_POOL = [
  '사랑','하늘','바다','구름','별빛','노을','바람','이슬','햇살','단풍',
  '벚꽃','보름','새벽','오름','물결','숲길','꽃잎','달빛','은하','파도',
  '안개','서리','눈꽃','봄날','여름','가을','겨울','아침','저녁','한낮',
  '초록','파랑','노랑','분홍','보라','주황','금빛','은빛','동백','민들',
  '수국','튤립','장미','백합','국화','연꽃','난초','대나','소나','잣나',
];

// crypto 난수로 풀에서 N개 비복원 추출
function pickWords(n) {
  const pool = WORD_POOL.slice();
  const out = [];
  for (let i = 0; i < n && pool.length; i++) {
    const r = crypto.randomInt(pool.length);
    out.push(pool.splice(r, 1)[0]);
  }
  return out;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!SECRET) {
    return res.status(500).json({ error: 'server not configured (MUFE_SECRET 없음)' });
  }

  // 회전시킬 단어 8개 발급
  const words = pickWords(8);
  const data = { t: Date.now(), words };
  const dataB64 = Buffer.from(JSON.stringify(data)).toString('base64');
  const challengeId = `${dataB64}.${sign(dataB64)}`;

  // 클라이언트: words 를 화면에서 회전 → STOP 으로 하나 잡고(caughtWord),
  //             challengeId 와 함께 /api/verify 로 보냄.
  return res.status(200).json({ challengeId, words });
};
