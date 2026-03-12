// CGo-Fuli Groq 프록시 v2
export default async function handler(req, res) {
  // CORS 헤더 무조건 먼저
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 키는 서버에서 직접 주입 (클라이언트 키 무시하고 서버 키 사용)
    const GROQ_KEY = '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';

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_KEY
      },
      body: JSON.stringify(body)
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch(e) {
    return res.status(500).json({ error: { message: e.message } });
  }
}
