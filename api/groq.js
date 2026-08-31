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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ choices: [], error: 'POST only' });
  }

  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return res.status(200).json({
      choices: [{ message: { content: '' } }],
      error: 'no key'
    });
  }

  const b = req.body || {};

  // 앱이 보낸 것을 그대로 넘긴다 — 모델 이름도 앱이 정한다
  const body = {
    model: b.model || 'openai/gpt-oss-20b',
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

    if (!r.ok) {
      console.warn('[groq]', r.status, j && j.error && j.error.message);
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
