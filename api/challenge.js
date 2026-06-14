/**
 * FULI — 단어 챌린지 발급 + 양자내성 키교환 (서버)
 *
 *  · challengeId = base64({ t, words }) + '.' + sign  (verify.js 호환)
 *  · 클라이언트가 ML-KEM 공개키(clientPk)를 보내면:
 *      - pq.encapsulate 로 캡슐화 → 암호문(ct) + 공유키(ss)
 *      - 공유키는 금고(KV)에 'pqss:'+challengeId 로 10분 보관 (verify 가 꺼내 복호)
 *      - 암호문(ct)만 응답으로 클라에 전달
 *  · clientPk 가 없으면(구버전/미지원) 양자 없이 단어만 발급 (하위호환)
 */
const crypto = require('crypto');
const pq = require('./pq');
const { kvSet } = require('./_kv');

const SECRET = process.env.MUFE_SECRET;
function sign(data) {
  return crypto.createHmac('sha256', SECRET).update(data).digest('hex').slice(0, 16);
}

const WORD_POOL = [
  '사랑','하늘','바다','구름','별빛','노을','바람','이슬','햇살','단풍',
  '벚꽃','보름','새벽','오름','물결','숲길','꽃잎','달빛','은하','파도',
  '안개','서리','눈꽃','봄날','여름','가을','겨울','아침','저녁','한낮',
  '초록','파랑','노랑','분홍','보라','주황','금빛','은빛','동백','민들',
  '수국','튤립','장미','백합','국화','연꽃','난초','대나','소나','잣나',
];

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
  if (!SECRET) return res.status(500).json({ error: 'server not configured (MUFE_SECRET 없음)' });

  const words = pickWords(8);
  const data = { t: Date.now(), words };
  const dataB64 = Buffer.from(JSON.stringify(data)).toString('base64');
  const challengeId = `${dataB64}.${sign(dataB64)}`;

  // 양자내성 키교환 — 클라 공개키가 오면 캡슐화
  let ct = null;
  const clientPk = (req.body && req.body.clientPk) || null;
  if (clientPk) {
    try {
      const { ctB64, ssB64 } = pq.encapsulate(clientPk);
      ct = ctB64;
      await kvSet('pqss:' + challengeId, ssB64, { ex: 600 });   // 공유키 10분 보관
    } catch (e) {
      ct = null;   // 공개키 이상 → 양자 없이 진행(앱은 정상)
    }
  }

  return res.status(200).json({ challengeId, words, rotationWords: words, ct });
};
