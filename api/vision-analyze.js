// ═══════════════════════════════════════════════════════════════════════════
// /api/vision-analyze
// FULI C-39 두피 케어 — Vision API endpoint
// 
// 기능:
//   1) BASP 자동 분류 (L/M/C/U/V/F 형 + 단계)
//   2) 모낭 카운트 추정 (이미지당 모낭/가닥 수)
//   3) 부위별 정밀 분석 (홍반·유분·각질·모발 굵기)
//   4) 권위자 페르소나 종합 해석
//
// 호출 패턴: POST /api/vision-analyze
// Body: {
//   images: [{ part:'crown', base64:'...' }, ...],  // 5부위
//   selfDiag: { s1:[], s2:'', s3:{} },              // 자가진단
//   c37Data: {...}                                   // C-37 융합 데이터 (선택)
// }
//
// Response: JSON
//   {
//     basp: { basic:'M', basic_stage:2, specific:'V', specific_stage:1 },
//     follicles: [{ part:'crown', count:65, hair_per_follicle:1.8, validity:87 }, ...],
//     analysis: { 핵심_발견, 두피_환경, 모발_상태, 스트레스_영향, 권위자_종합_의견, 라이프스타일_가이드, 권장_OEM }
//   }
//
// 환경변수: GROQ_API_KEY (Vercel 환경에 등록)
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

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(500).json({ 
      error: 'GROQ_API_KEY not configured in Vercel environment variables.' 
    });
  }

  try {
    const { images = [], selfDiag = {}, c37Data = {} } = req.body || {};

    if (!images.length) {
      return res.status(400).json({ error: 'images array is required.' });
    }

    // ─────────────────────────────────────────────────────────────────
    // STEP 1: 각 부위별 Vision 분석 (BASP·모낭·홍반·유분)
    // ─────────────────────────────────────────────────────────────────
    const visionPromises = images.map(async (img) => {
      if (!img.base64 || !img.part) {
        return { part: img.part || 'unknown', skipped: true };
      }

      // base64에서 data:image/jpeg;base64, 접두사 제거 (있다면)
      const cleanB64 = img.base64.replace(/^data:image\/[a-z]+;base64,/, '');

      const visionPrompt = `당신은 두피·모발 분석 전문가입니다. 이 두피 사진(${img.part} 부위)을 정밀 분석해주세요.

반드시 JSON만 반환하세요 (코드블록·다른 텍스트 금지):
{
  "is_valid_scalp": true/false (실제 두피·모발이 보이는지),
  "validity_score": 0-100 (이미지 유효성),
  "basp_basic": "L/M/C/U 중 하나 또는 N/A",
  "basp_basic_stage": 0-4 (해당 시),
  "basp_specific": "V/F 중 하나 또는 N/A",
  "basp_specific_stage": 0-3 (해당 시),
  "follicle_count_estimate": 추정 모낭 개수 (이미지 중심 1cm² 영역),
  "hair_per_follicle": 모낭당 평균 가닥 수 (1.0~3.0),
  "hair_thickness": "정상/연모화/약함" 중 하나,
  "scalp_redness": 0-100 (두피 홍반 강도),
  "scalp_oiliness": 0-100 (유분 정도),
  "scalp_scaling": 0-100 (각질 정도),
  "hair_density_pct": 0-100 (모발 밀도 추정 %),
  "observation": "이 부위 관찰 결과 2-3문장 (한국어)"
}

매우 중요:
- 사진이 두피가 아니거나(의자·바닥·옷 등) 모발이 거의 안 보이면 is_valid_scalp=false, validity_score를 낮게.
- 유효하지 않은 사진은 다른 수치도 신뢰도 낮음을 반영.
- 한국어로만 응답.`;

      try {
        const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            messages: [{
              role: 'user',
              content: [
                { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,' + cleanB64 } },
                { type: 'text', text: visionPrompt }
              ]
            }],
            max_tokens: 600,
            temperature: 0.3
          })
        });

        const data = await resp.json();
        const txt = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '{}';
        const clean = txt.replace(/```json|```/g, '').trim();
        const match = clean.match(/\{[\s\S]*\}/);
        const parsed = match ? JSON.parse(match[0]) : {};
        
        return { part: img.part, ...parsed };
      } catch (e) {
        console.error('[vision-analyze] 부위 분석 오류:', img.part, e.message);
        return { part: img.part, error: e.message, validity_score: 0 };
      }
    });

    const partResults = await Promise.all(visionPromises);

    // ─────────────────────────────────────────────────────────────────
    // STEP 2: BASP 종합 분류 (5부위 결과 종합)
    // ─────────────────────────────────────────────────────────────────
    // 가장 빈도 높은 BASP 타입 선택
    const basicCounts = {};
    const specificCounts = {};
    let basicStageSum = 0, basicStageCount = 0;
    let specificStageSum = 0, specificStageCount = 0;

    partResults.forEach(r => {
      if (r.basp_basic && r.basp_basic !== 'N/A') {
        basicCounts[r.basp_basic] = (basicCounts[r.basp_basic] || 0) + 1;
        if (r.basp_basic_stage > 0) {
          basicStageSum += r.basp_basic_stage;
          basicStageCount++;
        }
      }
      if (r.basp_specific && r.basp_specific !== 'N/A') {
        specificCounts[r.basp_specific] = (specificCounts[r.basp_specific] || 0) + 1;
        if (r.basp_specific_stage > 0) {
          specificStageSum += r.basp_specific_stage;
          specificStageCount++;
        }
      }
    });

    const dominantBasic = Object.keys(basicCounts).sort((a, b) => basicCounts[b] - basicCounts[a])[0] || 'L';
    const dominantSpecific = Object.keys(specificCounts).sort((a, b) => specificCounts[b] - specificCounts[a])[0] || 'N/A';
    const basp = {
      basic: dominantBasic,
      basic_stage: basicStageCount ? Math.round(basicStageSum / basicStageCount) : 0,
      specific: dominantSpecific,
      specific_stage: specificStageCount ? Math.round(specificStageSum / specificStageCount) : 0
    };

    // ─────────────────────────────────────────────────────────────────
    // STEP 3: 권위자 페르소나 종합 분석 (Text LLM)
    // ─────────────────────────────────────────────────────────────────
    const typeNames = {
      crown:'정수리 탈모', mshape:'M자 탈모', round:'원형 탈모',
      female:'여성 탈모', thinning:'머리숱 감소', inflame:'두피 염증성',
      reloss:'모발이식 재탈모', stress:'스트레스성 탈모'
    };

    let context = `## 두피 5부위 정밀 분석 데이터\n\n`;
    context += `### BASP 자동 분류\n`;
    context += `- 기본형: ${basp.basic}${basp.basic_stage ? ' ' + basp.basic_stage + '단계' : ''}\n`;
    context += `- 특정형: ${basp.specific}${basp.specific_stage ? ' ' + basp.specific_stage + '단계' : ''}\n\n`;
    context += `### 부위별 측정 결과\n`;
    partResults.forEach(r => {
      if (r.skipped || r.error) {
        context += `- ${r.part}: 측정 안됨\n`;
      } else {
        context += `- ${r.part}: 유효성 ${r.validity_score}%, 모낭 ${r.follicle_count_estimate || '?'}개, 가닥/모낭 ${r.hair_per_follicle || '?'}, 밀도 ${r.hair_density_pct || '?'}%, 홍반 ${r.scalp_redness || '?'}, 유분 ${r.scalp_oiliness || '?'}, 모발굵기 ${r.hair_thickness || '?'}\n`;
        if (r.observation) context += `  · 관찰: ${r.observation}\n`;
      }
    });

    if (selfDiag.s1 || selfDiag.s2) {
      context += `\n### 자가진단 응답\n`;
      if (selfDiag.s1 && selfDiag.s1.length) {
        context += `- 증상 체크: ${selfDiag.s1.length}개 (항목 ${selfDiag.s1.join(',')})\n`;
      }
      if (selfDiag.s2) {
        context += `- 자가 의심 유형: ${typeNames[selfDiag.s2] || selfDiag.s2}\n`;
      }
      if (selfDiag.s3) {
        context += `- 진행속도: ${selfDiag.s3.q1 || '-'}, 두피상태: ${selfDiag.s3.q2 || '-'}, 모발상태: ${selfDiag.s3.q3 || '-'}, 관리경험: ${selfDiag.s3.q4 || '-'}\n`;
      }
    }

    if (c37Data && Object.keys(c37Data).length) {
      context += `\n### C-37 건강 예측 융합 데이터\n`;
      try {
        if (c37Data.bpm) context += `- BPM: ${c37Data.bpm}\n`;
        if (c37Data.hrv) context += `- HRV(심박변이도): ${c37Data.hrv}ms\n`;
        if (c37Data.scores) context += `- 6부위 점수: ${JSON.stringify(c37Data.scores).substring(0, 300)}\n`;
      } catch (e) {}
    }

    const sysPrompt = `당신은 FULI 두피 케어 종합 분석 AI입니다. 탈모 전문 피부과 의사 100명, 한의사 30명, 트리코로지스트들의 임상 지식을 종합한 권위자 연합 페르소나입니다.

다음 데이터를 기반으로 사용자의 두피 상태를 종합 분석하여 보고서를 작성하세요.

매우 중요한 원칙:
- 절대 의학적 "진단·예측·치료" 단어 사용 금지
- "라이프스타일 관찰·가이드·관리 권장" 표현만 사용
- 데이터 신뢰도가 낮으면 솔직히 표시
- 한국어만 사용 (한자 병기 시 한글 우선)
- 의학적 결정은 반드시 전문의 상담 권장으로 마무리

응답 형식 (반드시 이 JSON 형식만, 다른 텍스트 금지):
{
  "핵심_발견": "1-2문장으로 가장 중요한 관찰",
  "두피_환경": "두피 환경 분석 2-3문장",
  "모발_상태": "모발 굵기·밀도·강도 관찰 2-3문장",
  "스트레스_영향": "rPPG·자율신경 기반 스트레스 영향 2-3문장 (데이터 없으면 일반론)",
  "권위자_종합_의견": "전문의 100명·한의사 30명 연합 관점 종합 가이드 3-4문장",
  "라이프스타일_가이드": ["가이드1", "가이드2", "가이드3"],
  "권장_OEM": "C-04 후드·C-16 베개·C-02 잠옷 중 적합한 2개 추천 이유 포함"
}`;

    const analysisResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: sysPrompt },
          { role: 'user', content: '다음 데이터를 종합 분석하여 JSON 형식으로 보고서를 작성해주세요:\n\n' + context }
        ],
        max_tokens: 2500,
        temperature: 0.6,
        response_format: { type: 'json_object' }
      })
    });

    const analysisData = await analysisResp.json();
    const analysisRaw = (analysisData.choices && analysisData.choices[0] && analysisData.choices[0].message && analysisData.choices[0].message.content) || '{}';
    let analysis = {};
    try {
      analysis = JSON.parse(analysisRaw.replace(/```json|```/g, '').trim());
    } catch (e) {
      const match = analysisRaw.match(/\{[\s\S]*\}/);
      if (match) {
        try { analysis = JSON.parse(match[0]); } catch (e2) {}
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // 최종 응답
    // ─────────────────────────────────────────────────────────────────
    return res.status(200).json({
      basp,
      follicles: partResults.map(r => ({
        part: r.part,
        count: r.follicle_count_estimate || 0,
        hair_per_follicle: r.hair_per_follicle || 0,
        density_pct: r.hair_density_pct || 0,
        thickness: r.hair_thickness || 'unknown',
        validity: r.validity_score || 0,
        redness: r.scalp_redness || 0,
        oiliness: r.scalp_oiliness || 0,
        scaling: r.scalp_scaling || 0,
        observation: r.observation || ''
      })),
      analysis,
      meta: {
        model_vision: 'meta-llama/llama-4-scout-17b-16e-instruct',
        model_text: 'llama-3.3-70b-versatile',
        timestamp: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error('[vision-analyze] fatal error:', err);
    return res.status(500).json({ 
      error: err.message || 'Internal server error',
      fallback: '분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    });
  }
}
