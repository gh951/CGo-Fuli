// ══════════════════════════════════════════════════════════════════
//  /api/claude  —  등급에 따라 모델을 고르는 문
//
//  열쇠는 이 파일 안에서만 읽는다. 앱은 이 주소만 부른다.
//    ANTHROPIC_API_KEY   Vercel 환경변수
//    GROQ_API_KEY        기본 등급이 여기로 떨어진다
//
//  앱이 보내는 것
//    { tier:'basic'|'advanced'|'premium', system, prompt, images:[base64],
//      max_tokens, temperature, cacheable }
//  돌려주는 것
//    { text, model, tier }        ← 실패해도 형태는 같다
// ══════════════════════════════════════════════════════════════════

const MODEL = {
  advanced: 'claude-haiku-4-5-20251001',    // 고급    1회 약 10원
  premium : 'claude-sonnet-4-5-20250929'    // 최고급  1회 약 63원
  // ★ 날짜까지 붙인 이름을 쓴다 — 별칭은 어느 날 바뀌면 품질이 소리 없이 달라진다.
  //   전에는 'claude-sonnet-5' 로 적혀 있었는데 그런 모델은 없어,
  //   최고급을 받고도 조용히 Groq 으로 떨어지던 자리였다.
};

// ★ 등급과 무관하게 모델이 정해지는 기능들.
//   앱이 kind 를 보내면 여기 표가 이긴다.
//
//   photo  사진 판독  — Haiku 는 미세한 색·결을 못 본다. 정밀도가 필요하다.
//   report 리포트     — 16장을 한 번에 낸다. 길고 촘촘해야 한다.
//   naming 명작명     — 글자를 만들어 내는 일이다. 근거가 흔들리면 안 된다.
//   med    6부위 건강 — 의료 근사 판독. 조심할 자리라 가장 좋은 눈을 쓴다.
const KIND = {
  photo : { model:'claude-sonnet-4-5-20250929', max:1600, cost:63  },
  report: { model:'claude-sonnet-4-5-20250929', max:6000, cost:210 },
  naming: { model:'claude-sonnet-4-5-20250929', max:4200, cost:164 },
  med   : { model:'claude-sonnet-4-5-20250929', max:1800, cost:63  }
};
// Opus 는 쓰지 않는다. 값이 6배인데 역학 풀이에서 손님이 느끼는 차이가 그만큼 나지 않는다.

// 한 사람 하루 한도 — 열쇠가 새더라도 값이 새지 않게 막는다
const LIMIT = { advanced: 20, premium: 5, photo: 6, report: 2, naming: 2, med: 6 };
const seen = new Map();            // { 'ip|tier|날짜' : 센 수 }

function overLimit(ip, tier) {
  const cap = LIMIT[tier];
  if (!cap) return false;
  const day = new Date().toISOString().slice(0, 10);
  const key = ip + '|' + tier + '|' + day;
  const n = (seen.get(key) || 0) + 1;
  seen.set(key, n);
  if (seen.size > 4000) seen.clear();   // 메모리가 쌓이지 않게
  return n > cap;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ text: '', error: 'POST only' });
  }

  const b = req.body || {};
  const tier = b.tier || 'basic';
  const kind = b.kind && KIND[b.kind] ? b.kind : null;
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';

  // ── 기본 등급은 Groq 으로 ─────────────────────────────
  //    단, kind 가 지정된 기능은 기본에서도 Sonnet 을 쓴다.
  //    사진 판독을 Groq 으로 하면 색과 결을 못 읽어 답이 헛돈다.
  if (!kind && (tier === 'basic' || !MODEL[tier])) {
    return groq(b, res);
  }

  // ── 하루 한도 ─────────────────────────────────────────
  if (overLimit(ip, kind || tier)) {
    return res.status(200).json({
      text: '', limited: true, tier, kind: kind || null,
      error: 'daily limit'
    });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return groq(b, res);          // 열쇠가 없으면 조용히 Groq 으로

  // ── 본문 ──────────────────────────────────────────────
  const parts = [];
  (b.images || []).slice(0, 6).forEach(img => {
    parts.push({
      type: 'image',
      source: { type: 'base64', media_type: 'image/jpeg', data: img }
    });
  });
  parts.push({ type: 'text', text: String(b.prompt || '') });

  const pick = kind ? KIND[kind] : { model: MODEL[tier], max: 1500 };
  const body = {
    model: pick.model,
    max_tokens: Math.min(b.max_tokens || pick.max, pick.max),
    temperature: typeof b.temperature === 'number' ? b.temperature : 0.7,
    messages: [{ role: 'user', content: parts }]
  };

  // 앞부분이 매번 같은 프롬프트는 캐싱한다 — 입력 값이 50~90% 준다
  if (b.system) {
    body.system = b.cacheable
      ? [{ type: 'text', text: String(b.system), cache_control: { type: 'ephemeral' } }]
      : String(b.system);
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });
    const j = await r.json();

    if (!r.ok) {
      console.warn('[claude]', r.status, j && j.error && j.error.message);
      return groq(b, res);                // 실패하면 Groq 으로 — 화면이 비지 않게
    }

    const text = (j.content || [])
      .filter(c => c.type === 'text')
      .map(c => c.text)
      .join('\n');

    return res.status(200).json({ text, model: pick.model, tier, kind: kind || null });
  } catch (e) {
    console.warn('[claude] ' + e);
    return groq(b, res);
  }
}

// ── Groq 으로 떨어지는 길 ─────────────────────────────────
async function groq(b, res) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return res.status(200).json({ text: '', error: 'no key' });

  const hasImg = (b.images || []).length > 0;
  const content = hasImg
    ? [
        ...b.images.slice(0, 2).map(i => ({
          type: 'image_url',
          image_url: { url: 'data:image/jpeg;base64,' + i }
        })),
        { type: 'text', text: String(b.prompt || '') }
      ]
    : String(b.prompt || '');

  const messages = [];
  if (b.system) messages.push({ role: 'system', content: String(b.system) });
  messages.push({ role: 'user', content });

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: 'Bearer ' + key },
      body: JSON.stringify({
        model: hasImg
          ? 'meta-llama/llama-4-scout-17b-16e-instruct'
          : 'openai/gpt-oss-20b',
        max_tokens: Math.min(b.max_tokens || 1200, 4000),
        temperature: typeof b.temperature === 'number' ? b.temperature : 0.7,
        messages
      })
    });
    const j = await r.json();
    const text =
      (j.choices && j.choices[0] && j.choices[0].message &&
       j.choices[0].message.content) || '';
    return res.status(200).json({ text, model: 'groq', tier: 'basic' });
  } catch (e) {
    return res.status(200).json({ text: '', error: String(e) });
  }
}
