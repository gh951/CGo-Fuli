// ═══════════════════════════════════════════════════════════
//  /api/groq-whisper.js
//  Vercel 서버리스 함수 — Groq Whisper STT (음성→텍스트) 프록시
//  C-19 Message v1.0 (2026-04-20) 구현: Claude AI (C-19)
//
//  ▶ 사용법 (클라이언트):
//    const fd = new FormData();
//    fd.append('file', audioBlob, 'rec.webm');
//    fd.append('model', 'whisper-large-v3-turbo');
//    fd.append('language', 'ko');
//    fetch('/api/groq-whisper', { method:'POST', body:fd })
//
//  ▶ 환경변수 (Vercel 대시보드에서 설정 — groq.js가 쓰는 키 그대로):
//    GROQ_API_KEY = gsk_...
//
//  ▶ 가격: $0.04/시간 (whisper-large-v3-turbo)
//    1분 음성 = 약 1원 미만
// ═══════════════════════════════════════════════════════════

export const config = {
  api: {
    bodyParser: false,  // multipart/form-data는 원본 스트림 그대로 전달
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GROQ_API_KEY not set' });

  try {
    const contentType = req.headers['content-type'] || '';
    const groqUrl = 'https://api.groq.com/openai/v1/audio/transcriptions';

    // multipart/form-data 원본 스트림을 Buffer로 수집
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks);

    // Groq로 프록시 (multipart boundary 유지)
    const groqRes = await fetch(groqUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': contentType,
      },
      body: body,
    });

    const text = await groqRes.text();
    res.status(groqRes.status);
    res.setHeader('Content-Type', groqRes.headers.get('content-type') || 'application/json');
    res.send(text);
  } catch (err) {
    console.error('[groq-whisper] error:', err);
    res.status(500).json({ error: String(err && err.message || err) });
  }
}
