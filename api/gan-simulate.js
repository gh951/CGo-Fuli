// ═══════════════════════════════════════════════════════════════════════════
// /api/gan-simulate
// FULI C-39 두피 케어 — GAN 시뮬레이션 endpoint
//
// 기능: 사용자의 현재 두피·헤어라인 사진을 입력받아 미래 시뮬레이션 이미지 생성
//   - "관리 안 했을 때 N년 후" 시뮬레이션 (경각심 가이드 도구)
//   - Stable Diffusion XL via Replicate API + img2img
//
// 호출 패턴: POST /api/gan-simulate
// Body: {
//   image_base64: "...",      // 사용자 두피·헤어라인 사진 (base64)
//   years: 2,                  // 시뮬레이션 기간 (1, 2, 5)
//   basp_type: "M2",           // BASP 유형 + 단계 (선택, 정확도 향상)
//   scenario: "no_care"        // "no_care" | "good_care" (관리 안할 때 vs 관리할 때)
// }
//
// Response: JSON
//   {
//     image_url: "https://replicate.delivery/...",
//     prompt: "사용된 프롬프트",
//     years: 2,
//     scenario: "no_care",
//     prediction_id: "..."
//   }
//
// 환경변수: REPLICATE_API_TOKEN (Vercel 환경에 등록)
//
// 비용 안내: SDXL img2img ≈ $0.02-0.05 / 이미지
// ═══════════════════════════════════════════════════════════════════════════

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
  if (!REPLICATE_API_TOKEN) {
    return res.status(500).json({ 
      error: 'REPLICATE_API_TOKEN not configured in Vercel environment variables.',
      hint: 'https://replicate.com/account/api-tokens 에서 토큰 발급 후 Vercel에 등록'
    });
  }

  try {
    const { 
      image_base64,
      years = 2,
      basp_type = '',
      scenario = 'no_care'
    } = req.body || {};

    if (!image_base64) {
      return res.status(400).json({ error: 'image_base64 is required.' });
    }

    // base64 정리
    const cleanB64 = image_base64.replace(/^data:image\/[a-z]+;base64,/, '');
    const imageDataUrl = 'data:image/jpeg;base64,' + cleanB64;

    // ─────────────────────────────────────────────────────────────────
    // 프롬프트 생성 (BASP 유형 + 기간 + 시나리오 반영)
    // ─────────────────────────────────────────────────────────────────
    let prompt = '';
    let negativePrompt = '';

    if (scenario === 'no_care') {
      // 관리 안 했을 때 — 탈모 진행
      const baspHint = basp_type 
        ? `following BASP classification ${basp_type}, with progressive hairline recession and thinning crown area`
        : `with progressive hair thinning and visible scalp`;
      
      prompt = `photograph of the same person ${years} years later showing realistic male/female pattern hair loss progression, ${baspHint}, receding hairline, reduced hair density on top, visible scalp showing through thinner hair, natural lighting, photorealistic, high quality portrait, same face same person`;
      
      negativePrompt = `cartoon, illustration, painting, anime, fake, deformed face, different person, perfect hair, hair regrowth, thicker hair, full head of hair`;
    } else {
      // 관리 잘 했을 때 — 유지 또는 약간 개선
      prompt = `photograph of the same person ${years} years later with healthy maintained hair, well-managed scalp, slightly fuller hair appearance, natural healthy look, photorealistic, high quality portrait, same face same person`;
      
      negativePrompt = `cartoon, illustration, painting, anime, fake, deformed face, different person, severe hair loss, complete baldness`;
    }

    // ─────────────────────────────────────────────────────────────────
    // Replicate API 호출 (Stable Diffusion XL img2img)
    // ─────────────────────────────────────────────────────────────────
    // 모델: stability-ai/sdxl (Stable Diffusion XL)
    // img2img 모드: prompt_strength로 변형 정도 조절
    
    const replicateResp = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait'  // 비동기가 아닌 동기적 대기 (최대 60초)
      },
      body: JSON.stringify({
        // Stable Diffusion XL img2img — 안정적이고 가성비 좋음
        version: '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
        input: {
          prompt: prompt,
          negative_prompt: negativePrompt,
          image: imageDataUrl,
          prompt_strength: scenario === 'no_care' ? 0.55 : 0.45,
          num_outputs: 1,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          scheduler: 'K_EULER',
          seed: Math.floor(Math.random() * 1000000)
        }
      })
    });

    const prediction = await replicateResp.json();

    if (!replicateResp.ok) {
      console.error('[gan-simulate] Replicate API 오류:', prediction);
      return res.status(replicateResp.status).json({
        error: 'Replicate API 호출 실패',
        details: prediction
      });
    }

    // Replicate가 즉시 완료된 경우
    if (prediction.status === 'succeeded' && prediction.output) {
      const imageUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
      return res.status(200).json({
        image_url: imageUrl,
        prompt: prompt,
        years: years,
        scenario: scenario,
        prediction_id: prediction.id,
        status: 'succeeded'
      });
    }

    // 비동기 처리 중인 경우 — polling
    if (prediction.urls && prediction.urls.get) {
      const maxAttempts = 30; // 최대 60초 대기 (2초 간격)
      let attempt = 0;
      
      while (attempt < maxAttempts) {
        await new Promise(r => setTimeout(r, 2000));
        
        const pollResp = await fetch(prediction.urls.get, {
          headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` }
        });
        const pollData = await pollResp.json();
        
        if (pollData.status === 'succeeded') {
          const imageUrl = Array.isArray(pollData.output) ? pollData.output[0] : pollData.output;
          return res.status(200).json({
            image_url: imageUrl,
            prompt: prompt,
            years: years,
            scenario: scenario,
            prediction_id: prediction.id,
            status: 'succeeded'
          });
        }
        
        if (pollData.status === 'failed' || pollData.status === 'canceled') {
          return res.status(500).json({
            error: 'Prediction failed',
            details: pollData.error || pollData.status
          });
        }
        
        attempt++;
      }
      
      return res.status(504).json({
        error: 'Prediction timeout',
        prediction_id: prediction.id,
        hint: '시뮬레이션 생성에 시간이 더 필요합니다. 잠시 후 다시 시도해주세요.'
      });
    }

    return res.status(500).json({ error: 'Unexpected response from Replicate' });

  } catch (err) {
    console.error('[gan-simulate] fatal error:', err);
    return res.status(500).json({
      error: err.message || 'Internal server error',
      fallback: '시뮬레이션 생성 중 오류가 발생했습니다.'
    });
  }
}
