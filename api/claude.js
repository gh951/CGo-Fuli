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

import { check as rateCheck, limitedBody } from './_limit.js';   // ★ 2026.09.10 문지기 — IP 당 1분·하루 한도

const SONNET = 'claude-sonnet-4-5-20250929';   // 1회 약 63원
const OPUS   = 'claude-opus-4-1-20250805';     // 1회 약 375원 (Sonnet 의 6배) — 문장력이 값인 자리
const HAIKU  = 'claude-haiku-4-5-20251001';    // 1회 약 10원 (정책표엔 없다 — 표에 없는 기능이 떨어지는 자리용)
// ★ 날짜까지 붙인 이름을 쓴다 — 별칭은 어느 날 바뀌면 품질이 소리 없이 달라진다.
//   전에는 'claude-sonnet-5' 로 적혀 있었는데 그런 모델은 없어,
//   최고급을 받고도 조용히 Groq 으로 떨어지던 자리였다.

const MODEL = {
  advanced: SONNET,    // ★ 2026.09.10 정책표 — 고급은 전 기능 Sonnet
  premium : SONNET     // 최고급 기본값 Sonnet · Opus 는 아래 FEAT 표가 정한다
};

// ★ 2026.09.10 — 35번 정책표. 기능(feat) × 등급 → 모델.
//   앱(index.html 의 fetch 인터셉터)이 지금 열린 페이지로 feat 를 판별해 보낸다. 앱 쪽 CGO_AI_MODEL_POLICY 와 같은 표다 — 둘을 함께 고친다.
//   basic 이 적힌 기능은 「기본도 유료」 → 기본에서도 Sonnet. 안 적힌 기능의 기본은 Groq.
const FEAT = {
  med:   { basic:SONNET, advanced:SONNET, premium:SONNET },  // ③ 나의 건강 밸런스
  cog:   {               advanced:SONNET, premium:SONNET },  // ④ 인지 건강 셀프 체크
  skm:   { basic:SONNET, advanced:SONNET, premium:SONNET },  // ⑤ 두피 케어
  iq:    {               advanced:SONNET, premium:OPUS   },  // ⑥ 나의 IQ
  eye:   { basic:SONNET, advanced:SONNET, premium:SONNET },  // ⑦ 나의 눈 건강
  sleep: {               advanced:SONNET, premium:OPUS   },  // ⑧ 좋은 수면
  food:  { basic:SONNET, advanced:SONNET, premium:SONNET },  // ⑫ 음식 궁합
  tarot: {               advanced:SONNET, premium:SONNET },  // ⑭⑮⑯ 타로 3종
  navi:  {               advanced:SONNET, premium:SONNET },  // ⑰ 오행 길방
  cgp:   {               advanced:SONNET, premium:OPUS   },  // ⑱ 사진 색·기운 — 기본 무료(Groq) · 500 · 1,000 (2026.09.10 결정: 색 셈은 기기 안, AI 는 글만)
  gws:   {               advanced:SONNET, premium:OPUS   },  // ⑲⑳ 관상·손금
  dash:  {               advanced:SONNET, premium:OPUS   },  // ㉑~㉕ 꿈해몽·순수역학·실시간·rPPG (대시보드 역학 카드)
  cji:   {               advanced:SONNET, premium:OPUS   },  // 천지인 에너지 (2026.09.11 분리 · 1,000/2,000)
  fsc:   {               advanced:SONNET, premium:OPUS   },  // ㉗ 풍수 카메라
  cpl:   {               advanced:SONNET, premium:OPUS   },  // ㉘ 커플 궁합
  nm:    {               advanced:OPUS,   premium:OPUS   },  // ㉙ 작명 — 표준·고급·명작명 전부 Opus
  biz:   {               advanced:OPUS,   premium:OPUS   },  // ㉙ 회사·브랜드 작명
  tvy:   {               advanced:SONNET, premium:OPUS   },  // ㉚ 숙소·여행지
  shop:  {               advanced:SONNET, premium:OPUS   },  // ㉛ 오행 맞춤 쇼핑
  stock: {               advanced:SONNET, premium:SONNET },  // ㉜ 주식 (표에 모델 없음 → Sonnet)
  lotto: {               advanced:SONNET, premium:OPUS   },  // ㉝ 행운 번호
  sports:{               advanced:SONNET, premium:OPUS   },  // ㉞ 스포츠
  def:   {               advanced:SONNET, premium:SONNET }   // 표에 없는 기능
};
const COST = { [HAIKU]:10, [SONNET]:63, [OPUS]:375 };

// ★ 등급과 무관하게 모델이 정해지는 기능들.
//   앱이 kind 를 보내면 여기 표가 이긴다.
//
//   photo  사진 판독  — Haiku 는 미세한 색·결을 못 본다. 정밀도가 필요하다.
//   report 리포트     — 16장을 한 번에 낸다. 길고 촘촘해야 한다.
//   naming 명작명     — 글자를 만들어 내는 일이다. 근거가 흔들리면 안 된다.
//   med    6부위 건강 — 의료 근사 판독. 조심할 자리라 가장 좋은 눈을 쓴다.
const KIND = {
  photo : { model:SONNET, max:1600, cost:63  },
  report: { model:SONNET, max:6000, cost:210 },
  naming: { model:OPUS,   max:4200, cost:900 },   // ★ 정책표 ㉙ — 작명은 Opus
  med   : { model:SONNET, max:1800, cost:63  }
};
// Opus 는 FEAT 표가 정한 자리(역학 풀이·작명 등 문장력이 값인 곳)에서만 쓴다. 실패하면 Sonnet 으로 한 번 더 간다 — 최고급 값을 받고 Groq 답을 내지 않는다.

// 한 사람 1분·하루 한도 — _limit.js 로 옮겼다 (claude.js · groq.js 공용). 매니저는 x-cgo-mgr 열쇠로 면제.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ text: '', error: 'POST only' });
  }

  const b = req.body || {};
  const tier = b.tier || 'basic';
  const kind = b.kind && KIND[b.kind] ? b.kind : null;
  const feat = (b.feat && FEAT[b.feat]) ? b.feat : 'def';

  // ── 모델 고르기 — kind 표 > FEAT 표(기능×등급) ───────
  //    FEAT 에 그 등급 모델이 없으면(기본이 무료인 기능의 basic) Groq 으로.
  const featModel = FEAT[feat][tier] || null;

  // ── 문지기 — 갈래(kind > opus > 등급)별 1분·하루 한도. 기본(Groq) 경로도 센다 ──
  const willOpus = !kind && featModel === OPUS;
  const lane = kind || (willOpus ? 'opus' : (featModel ? tier : 'basic'));
  const hit = rateCheck(req, lane);
  if (hit) return res.status(200).json(limitedBody(hit, tier, kind));

  if (!kind && !featModel) {
    return groq(b, res);
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

  const pick = kind ? KIND[kind]
                    : { model: featModel, max: (featModel === OPUS ? 2400 : 1500), cost: COST[featModel] || 63 };
  if (pick.model === OPUS) pick.fallback = SONNET;   // Opus 가 막히면 Sonnet — Groq 으로 떨어지지 않게
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
    let j = await r.json();
    let usedModel = pick.model;

    if (!r.ok && pick.fallback) {
      console.warn('[claude] ' + pick.model + ' 실패 → ' + pick.fallback, r.status, j && j.error && j.error.message);
      body.model = pick.fallback;
      const r2 = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify(body)
      });
      j = await r2.json();
      usedModel = pick.fallback;
      if (!r2.ok) { console.warn('[claude] fallback 도 실패', r2.status); return groq(b, res); }
    } else if (!r.ok) {
      console.warn('[claude]', r.status, j && j.error && j.error.message);
      return groq(b, res);                // 실패하면 Groq 으로 — 화면이 비지 않게
    }

    const text = (j.content || [])
      .filter(c => c.type === 'text')
      .map(c => c.text)
      .join('\n');

    return res.status(200).json({ text, model: usedModel, tier, feat, kind: kind || null });
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
