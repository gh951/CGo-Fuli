// ══════════════════════════════════════════════════════════════════
//  /api/groq  —  앱이 44곳에서 부르는 문
//
//  앱은 열쇠를 모른다. 열쇠는 이 파일 안에서만 읽는다.
//    GROQ_API_KEY   Vercel 환경변수
//
//  앱이 보내는 것 (구 CGO 와 같은 모양 — 고칠 것 없음)
//    { model, messages, max_tokens, temperature, reasoning_effort, ... }
//  돌려주는 것
//    { choices:[{ message:{ content } }] }
// ══════════════════════════════════════════════════════════════════

import { check as rateCheck, limitedBody } from './_limit.js';   // ★ 2026.09.10 문지기 — claude.js 와 같은 표

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ choices: [], error: 'POST only' });
  }

  // ── 문지기 — 기본 등급(Groq) 도 IP 당 1분 3회 · 하루 40회. 0.4원이라도 봇이 만 번 돌리면 값이고,
  //    Groq 무료 한도가 막히면 유료 회원까지 답이 안 나온다. 매니저는 x-cgo-mgr 열쇠로 면제.
  const hit = rateCheck(req, 'basic');
  if (hit) {
    return res.status(200).json(Object.assign(limitedBody(hit, 'basic'), { choices: [{ message: { content: '' } }] }));
  }

  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return res.status(200).json({
      choices: [{ message: { content: '' } }],
      error: 'no key'
    });
  }

  const b = req.body || {};

  /* ★ 2026.09.16 — index.html 안에 'llama-3.3-70b-versatile' 같은 단종된 Groq
     모델명이 여러 곳(관상·손금, 천지인 등)에 하드코딩되어 있어 404가 반복됐다.
     Groq 공식 단종 공지(console.groq.com/docs/deprecations, 2026.06.17)에 따르면
     llama-3.3-70b-versatile → openai/gpt-oss-120b 또는 qwen/qwen3.6-27b 권장.
     앱 코드 44곳을 다 찾아 고치는 대신, 서버 한 곳에서 죽은 모델명이 오면
     공식 권장 모델로 자동 교체한다 — 어느 화면에서 부르든 이 문 하나만 지키면 막힌다. */
  const DEAD_MODELS = {
    'llama-3.3-70b-versatile': 'openai/gpt-oss-120b',
    'llama-3.1-8b-instant': 'openai/gpt-oss-20b',
    'llama3-70b-8192': 'openai/gpt-oss-120b',
    'llama3-8b-8192': 'openai/gpt-oss-20b',
  };
  var _model = b.model || 'openai/gpt-oss-20b';
  if (DEAD_MODELS[_model]) {
    console.warn('[groq] 죽은 모델명 감지 → 교체:', _model, '→', DEAD_MODELS[_model]);
    _model = DEAD_MODELS[_model];
  }

  // 앱이 보낸 것을 그대로 넘긴다 — 모델 이름도 앱이 정한다
  const body = {
    model: _model,
    messages: b.messages || [],
    max_tokens: Math.min(b.max_tokens || 1200, 8000),
    temperature: typeof b.temperature === 'number' ? b.temperature : 0.7
  };
  if (b.reasoning_effort) body.reasoning_effort = b.reasoning_effort;
  if (b.response_format) body.response_format = b.response_format;

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + key
      },
      body: JSON.stringify(body)
    });
    const j = await r.json();

    /* ★ 2026.09.16 — 교체한 모델마저 실패(404 등)하면 가장 안전한 기본 모델로
       마지막으로 한 번 더 시도한다 — 완전히 빈 응답보다 낫다. */
    if (!r.ok) {
      console.warn('[groq]', r.status, j && j.error && j.error.message);
      if (_model !== 'openai/gpt-oss-20b') {
        console.warn('[groq] 폴백 모델로 재시도: openai/gpt-oss-20b');
        body.model = 'openai/gpt-oss-20b';
        const r2 = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'content-type': 'application/json', authorization: 'Bearer ' + key },
          body: JSON.stringify(body)
        });
        const j2 = await r2.json();
        if (r2.ok) return res.status(200).json(j2);
        console.warn('[groq] 폴백도 실패', r2.status);
      }
      return res.status(200).json({
        choices: [{ message: { content: '' } }],
        error: (j && j.error && j.error.message) || String(r.status)
      });
    }
    return res.status(200).json(j);
  } catch (e) {
    console.warn('[groq] ' + e);
    return res.status(200).json({
      choices: [{ message: { content: '' } }],
      error: String(e)
    });
  }
}
