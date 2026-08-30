
/* ══ 공용 — 카메라 앞 얼굴이 화면을 얼마나 채우는가 ══
   cm 추정을 버리고 이 잣대 하나로 통일한다. 폰 화각이 달라도 같은 결과가 나온다.
   나의 건강 · 인지 건강 · 두피 · IQ · 관상 · 손금 · AR 메이크업 · 음식 궁합 · 궁합 — 모두 이것을 쓴다. */
window.cgoFaceFill = function(lms){
  if(!lms || !lms.length) return 0;
  var min = 1, max = 0;
  for(var i=0;i<lms.length;i++){
    var x = lms[i].x;
    if(x < min) min = x;
    if(x > max) max = x;
  }
  return max - min;
};
/* ★ 부위마다 대는 거리가 다르다 — 그 거리에서 화면이 얼마나 차는지로 판정한다.
   얼굴 15cm · 혀 9cm · 눈 7cm · 피부 8cm · 손 20cm(안쪽 상자)
   폰 화각이 달라도 채움 비율은 같은 뜻이라 한 잣대로 맞는다. */
window.CGO_FIT = {
  face:  { lo:0.68, hi:0.98, cm:15 },   /* 얼굴 — 가이드 원을 거의 채운다 */
  tongue:{ lo:0.22, hi:0.60, cm:9  },   /* 혀 — 내민 혀가 화면 가운데 */
  eye:   { lo:0.20, hi:0.55, cm:7  },   /* 눈 — 흰자가 보이게 바짝 */
  skin:  { lo:0.55, hi:1.00, cm:8  },   /* 피부 — 살갗이 화면을 덮는다 */
  hand:  { lo:0.45, hi:0.95, cm:20 },   /* 손등·손바닥 — 안쪽 상자에 맞춘다 */
  scalp: { lo:0.50, hi:1.00, cm:8  }    /* 두피 — 가르마가 화면을 덮는다 */
};
window.cgoFitState = function(fill, kind){
  var b = window.CGO_FIT[kind] || window.CGO_FIT.face;
  if(!fill) return 'none';
  if(fill < b.lo) return 'far';
  if(fill > b.hi) return 'near';
  return 'ok';
};
window.cgoFitCm = function(kind){
  var b = window.CGO_FIT[kind] || window.CGO_FIT.face;
  return b.cm;
};

/* ★ 딱 맞으면 "띵 띵 띵" 세 번 — 화면을 못 볼 때도 귀로 안다.
   한 부위에서 한 번만 울린다. */
window.cgoFitBeep = function(tag){
  try{
    if(!window._cgoBeeped) window._cgoBeeped = {};
    if(window._cgoBeeped[tag]) return;
    window._cgoBeeped[tag] = true;
    var AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return;
    var ac = window._cgoAC || (window._cgoAC = new AC());
    if(ac.state === 'suspended') ac.resume();
    [0, 0.18, 0.36].forEach(function(t){
      var o = ac.createOscillator(), g = ac.createGain();
      o.type = 'sine';
      o.frequency.value = 880;
      g.gain.setValueAtTime(0.0001, ac.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + t + 0.13);
      o.connect(g); g.connect(ac.destination);
      o.start(ac.currentTime + t);
      o.stop(ac.currentTime + t + 0.15);
    });
    if(navigator.vibrate) navigator.vibrate([40,60,40,60,40]);
  }catch(e){}
};
window.cgoFitBeepReset = function(tag){
  try{ if(window._cgoBeeped) delete window._cgoBeeped[tag]; }catch(e){}
};
function _cK(n,f){try{var v=window.K&&window.K(n);return (v&&v!==String(n))?v:f;}catch(e){return f;}}

/* ══ 측정 상태 — 구 CGO에서 그대로 가져온다. 이것이 없어 카메라가 시작되지 않았다 ══ */
var _c24 = {
  stream: null,
  offCanvas: null, offCtx: null,
  rawR: [], rawG: [], rawB: [],
  chromSig: [], bpZS: [0,0],
  bpB: [0.19701, 0, -0.19701],
  bpA: [1, -1.53077, 0.60556],
  sampleRate: 30,
  rafId: null, timerInt: null,
  sec: 0, TOTAL: 90,
  mode: 'face',
  bpm: 0, hrv: 0, fci: 0,
  lastSampleTime: 0,
  prevR: 0, prevG: 0,
  capturedImage: null,
  chatHistory: [],
  isRunning: false
};

// ★ 종합 스캔 상태
var _c24CompState = {
  active: false,          // 종합 스캔 중인지
  step: 0,                // 0=얼굴 1=혀 2=눈 3=피부 4=손등 5=손바닥
  steps: ['face','tongue','eye','skin','hand_back','hand_palm'],
  totals: [60, 20, 20, 30, 15, 15],
  labels: [], /* ★ 번호로 읽는다 — 아래 _c24StepLabel */
  cameras: ['user','user','user','user','environment','environment'],
  images: {face:null, tongue:null, eye:null, skin:null, hand_back:null, hand_palm:null},
  breathData: {cycles:0, inhaleAvg:0, holdAvg:0, exhaleAvg:0}
};

/* ★ 측정 중 화면 글자 — 고른 언어로 읽는다. 예전엔 한국어가 박혀 있었다 */
window._c24StepLabel=function(i){ return _cK(8730+i, ["👤 얼굴 (rPPG + 478호흡)","👅 혀 관찰","👁️ 눈 (눈빛 톤)","🎨 피부 (색·탄력)","✋ 손등 (손톱·혈관)","✋ 손바닥 (손금·색)"][i]||''); };
Object.defineProperty(_c24CompState,'labels',{get:function(){
  return [0,1,2,3,4,5].map(window._c24StepLabel);
}});

/* ══ 구 CGO에서 함께 가져온 컨디션 데이터 ══ */
function _c24Guide(color, steps, warning){
  var s='<div style="background:rgba('+color+',0.07);border:1px solid rgba('+color+',0.3);border-radius:10px;padding:12px 14px;margin-bottom:12px;">'+
    '<div style="font-size:11px;font-weight:800;color:rgba('+color+',1);margin-bottom:8px;">📋 측정 전 필독 지시사항</div>';
  steps.forEach(function(st,i){s+='<div style="font-size:11px;color:rgba(240,230,200,.85);margin-bottom:5px;"><b style="color:rgba('+color+',0.9);">'+String.fromCharCode(9312+i)+'</b> '+st+'</div>';});
  if(warning) s+='<div style="margin-top:8px;font-size:10px;color:rgba(251,191,36,.85);"><b>⚠️</b> '+warning+'</div>';
  s+='</div>';
  return s;
}

var _cgoTongueColor = (typeof _cgoTongueColor!=="undefined") ? _cgoTongueColor : {};

var _cgoTongueOrgan = (typeof _cgoTongueOrgan!=="undefined") ? _cgoTongueOrgan : {};

var _cgoTongueEnergy = (typeof _cgoTongueEnergy!=="undefined") ? _cgoTongueEnergy : {};

var _c24Cards = {
  cardio: {
    title:'💓 마음의 파도 & 생기 리듬',
    content:
    _c24Guide('248,113,113',
      ['밝은 곳에서 정면을 바라봐 주세요','카메라와 얼굴 거리 30~50cm 유지','안경·모자 등 제거 후 촬영','무표정으로 눈을 정면으로 응시','60초간 얼굴을 고정해 주세요'],
      '얼굴의 핏기와 미세한 떨림을 인식해 지금의 생기 에너지와 마음 텐션을 읽어냅니다')+
    '<b style="color:#f87171">📷 측정 부위:</b> 👤 얼굴 모드 선택 후 측정<br><br>'+
    '<b style="color:#f87171">카메라로 관찰 가능한 지표:</b><br>'+
    '• 🏃 <b>심장 엔진 과속</b> (마음 날씨: 폭풍우) — 심호흡 세 번, 페이스를 늦춰 보세요<br>'+
    '• 🛌 <b>엔진 휴식 모드</b> (마음 날씨: 잔잔한 호수) — 차분하고 느긋한 흐름이에요<br>'+
    '• 🌪️ <b>스트레스 방어벽 약화</b> — 오늘은 자극적인 뉴스나 업무를 멀리하세요<br>'+
    '• 🛑 <b>기운 정체 엇박자</b> — 가벼운 제자리걸음이나 따뜻한 물 한 잔으로 흐름을 뚫어 보세요<br><br>'+
    '<b style="color:#f87171">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:rgba(251,191,36,.8);font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  anemia: {
    title:'💗 혈기(血氣) 에너지 & 톤 밸런스',
    content:
    _c24Guide('251,191,36',
      ['밝은 자연광 또는 형광등 아래에서 측정하세요','얼굴 측정: 카메라와 30~50cm 거리 유지','손 측정: 손바닥을 카메라 정면으로 향하게 펴 주세요','화장·손톱 매니큐어 제거 후 측정 권장','45초간 얼굴 고정, 이후 손 15초 자동 전환'],
      '얼굴과 손바닥에 감도는 미세한 생기 톤을 종합해 활력 흐름을 읽어냅니다')+
    '<b style="color:#fbbf24">📷 측정 부위:</b> 👤 얼굴 또는 ✋ 손 모드 선택<br><br>'+
    '<b style="color:#fbbf24">카메라로 관찰 가능한 지표:</b><br>'+
    '• 🌫️ <b>안색 흐림(에너지 다운)</b> — 가벼운 산책으로 활력을 깨워 보세요<br>'+
    '• ❄️ <b>손끝 온기 부족</b> — 따뜻한 음료나 든든한 한 끼를 권해요<br>'+
    '• 🌪️ <b>기운 엇박자 리듬</b> — 안팎의 기운이 겉돌아요. 잠시 쉬어 가세요<br>'+
    '• 👁️ <b>눈가 생기 저하</b> — 오늘 밤은 스마트폰을 멀리하고 숙면을<br><br>'+
    '<b style="color:#fbbf24">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:rgba(251,191,36,.8);font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  thyroid: {
    title:'⚡ 활력 엔진 & 불꽃 밸런스',
    content:
    _c24Guide('167,139,250',
      ['밝은 곳에서 정면을 바라봐 주세요','카메라와 얼굴 거리 30~50cm 유지','안경 제거, 목 부위가 보이도록 옷깃 낮추기','무표정으로 정면 응시, 목을 편하게 유지','45초간 얼굴 고정, 이후 눈 15초 자동 전환'],
      '얼굴의 생기와 눈빛의 집중도를 함께 보면 지금의 에너지 상태를 더 정확히 읽어낼 수 있어요')+
    '<b style="color:#a78bfa">📷 측정 부위:</b> 👤 얼굴 모드 (추가로 👁️ 눈 모드 권장)<br><br>'+
    '<b style="color:#a78bfa">카메라로 관찰 가능한 지표:</b><br>'+
    '• 🔥 <b>과열(오버클럭) 모드</b> — 활력 엔진이 질주 중! 시원한 물과 심호흡으로 불꽃을 가라앉히세요<br>'+
    '• 🪫 <b>배터리 방전 모드</b> — 기운이 뚝 떨어진 타이밍. 따뜻한 차로 에너지를 완충하세요<br>'+
    '• 👁️ <b>눈가 긴장도 체크</b> — 에너지가 눈에 몰렸어요. 먼 곳을 보며 눈을 쉬어 주세요<br>'+
    '• 🌵 <b>수분 바짝 가뭄 모드</b> — 오늘 밤은 푹 자고 수분 충전이 필수!<br><br>'+
    '<b style="color:#a78bfa">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:rgba(251,191,36,.8);font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  liver: {
    title:'🫀 신체 정화(클린) 리듬',
    content:
    _c24Guide('52,211,153',
      ['밝은 곳에서 눈 흰자가 잘 보이도록 위를 약간 봐 주세요','카메라와 눈 거리 20~30cm 유지','렌즈 착용 시 제거 권장','눈을 크게 뜨고 흰자 부분이 화면에 잘 보이도록 조절','20초간 눈 고정, 이후 피부 20초 자동 전환'],
      '눈빛의 투명함과 안색의 맑은 정도를 종합해 몸속 정화 에너지 리듬을 읽어냅니다')+
    '<b style="color:#34d399">📷 측정 부위:</b> 👁️ 눈 또는 🎨 피부 모드 선택<br><br>'+
    '<b style="color:#34d399">카메라로 관찰 가능한 지표:</b><br>'+
    '• 🌫️ <b>눈빛 흐림(정화 시급)</b> — 밤샘·과로로 리프레시 엔진이 지쳤어요. 휴식을 권해요<br>'+
    '• 🍂 <b>안색 침체(나른함) 모드</b> — 오늘은 인스턴트를 피하고 가벼운 식단을<br>'+
    '• 🧪 <b>클린 지수 과부하</b> — 자체 정화 리듬이 무거워졌어요. 수분과 비타민 충전을<br>'+
    '• 🔥 <b>손바닥 열감(기운 과열)</b> — 기운이 한곳에 뭉쳤어요. 가벼운 손 지압을<br><br>'+
    '<b style="color:#34d399">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:rgba(251,191,36,.8);font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  diabetes: {
    title:'🍬 당(糖) 충전 밸런스 & 에너지 흡수 리듬',
    content:
    _c24Guide('56,189,248',
      ['손등 또는 손바닥을 카메라 정면으로 향하게 펴 주세요','후면 카메라가 자동으로 켜집니다','손가락을 가지런히 펴고 손톱이 잘 보이도록 조절','매니큐어 제거 후 측정 권장','20초간 손 고정, 이후 피부 20초 자동 전환'],
      '손끝에 감도는 생기와 피부 텐션을 종합해 지금의 에너지 흐름을 읽어냅니다')+
    '<b style="color:#38bdf8">📷 측정 부위:</b> ✋ 손 또는 🎨 피부 모드 선택<br><br>'+
    '<b style="color:#38bdf8">카메라로 관찰 가능한 지표:</b><br>'+
    '• 💗 <b>손끝 생기 순환 지수</b> — 흐름이 둔해요. 손가락 잼잼 운동으로 활력을 깨워 보세요<br>'+
    '• 🍂 <b>피부 푸석 가뭄 모드</b> — 카페인 대신 맑은 물을 충분히<br>'+
    '• 🪨 <b>스트레스 방전 모드</b> — 무리한 스케줄은 피하고 10분이라도 눈을 붙이세요<br>'+
    '• ✨ <b>스킨 재생 리듬</b> — 자극적인 음식을 피하고 비타민으로 세포를 응원해 주세요<br><br>'+
    '<b style="color:#38bdf8">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:rgba(251,191,36,.8);font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  autonomic: {
    title:'🧠 멘탈 에너지 & 마음 방어막',
    content:
    _c24Guide('244,114,182',
      ['밝은 곳에서 편안하게 앉아 정면을 바라봐 주세요','카메라와 얼굴 거리 30~50cm 유지','측정 전 1~2분 안정을 취한 후 시작하세요','무표정으로 코로 천천히 호흡하며 측정','60초간 얼굴을 고정, 호흡을 자연스럽게 유지'],
      'HRV는 안정 상태에서 측정해야 정확합니다. 운동 직후는 피해 주세요')+
    '<b style="color:#f472b6">📷 측정 부위:</b> 👤 얼굴 모드 선택 (가장 효과적)<br><br>'+
    '<b style="color:#f472b6">카메라로 관찰 가능한 지표:</b><br>'+
    '• 🪨 <b>멘탈 과부하(돌부처 모드)</b> — 중요한 결정은 잠시 멈추고 심호흡을<br>'+
    '• 🌪️ <b>마음의 파도 모드</b> — 작은 일에도 예민해지기 쉬워요. 시원한 음료 한 잔<br>'+
    '• 🚨 <b>에너지 불협화음</b> — 활력 박자가 엇나가요. 무리한 스케줄은 금물<br>'+
    '• 🪫 <b>종합 방전 주의보</b> — 오늘 저녁은 나만의 힐링 시간을 가지세요<br><br>'+
    '<b style="color:#f472b6">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:rgba(251,191,36,.8);font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  respiratory: {
    title:'🫁 숨결 리듬 & 청명 에너지',
    content:
    _c24Guide('96,165,250',
      ['밝은 곳에서 입술이 잘 보이도록 정면을 바라봐 주세요','카메라와 얼굴 거리 20~40cm 유지','입술에 립스틱·립밤 제거 후 측정 권장','입술 색이 화면에 선명히 보이도록 조명 조절','45초간 얼굴 고정, 이후 손 15초 자동 전환'],
      '입술과 손끝에 감도는 맑은 안색과 기운의 톤을 종합해 활력 순환 흐름을 읽어냅니다')+
    '<b style="color:#60a5fa">📷 측정 부위:</b> 👤 얼굴 또는 ✋ 손 모드 선택<br><br>'+
    '<b style="color:#60a5fa">카메라로 관찰 가능한 지표:</b><br>'+
    '• 🌫️ <b>숨결 정체(답답함) 모드</b> — 환기하고 깊은 심호흡으로 맑은 기운을<br>'+
    '• ❄️ <b>손끝 온기 방전</b> — 가벼운 스트레칭으로 온기를 깨워 보세요<br>'+
    '• 🌪️ <b>숨 가쁜 엇박자 리듬</b> — 과부하가 걸리기 쉬워요. 편안한 자세로 휴식을<br>'+
    '• 🪫 <b>에너지 가뭄 주의보</b> — 오늘 밤은 스마트폰을 멀리하고 깊은 숙면을<br><br>'+
    '<b style="color:#60a5fa">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:rgba(251,191,36,.8);font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  oriental: {
    title:'👅 혀 색·태 관찰',
    content:
    _c24Guide('212,168,67',
      ['밝은 곳에서 입을 크게 벌려 혀를 최대한 내밀어 주세요','카메라와 혀 거리 15~25cm 유지','혀 전체(끝·중간·뿌리)가 화면에 보이도록 조절','혀를 최대한 평평하게 펴 주세요','20초간 혀를 내밀고 고정해 주세요'],
      '혀 색깔과 태(苔)가 정확히 찍혀야 관찰이 가능합니다. 식사 직후는 피해 주세요')+
    '<b style="color:#d4a843">📷 측정 부위:</b> 👅 혀 모드 선택 (필수)<br><br>'+
    '<b style="color:#d4a843">카메라로 관찰 가능한 지표:</b><br>'+
    '• ⚪ 하얗고 흐린 혀 → 에너지 방전 — 기운이 떨어져 충전이 필요한 타이밍<br>'+
    '• 🔴 붉게 달아오른 혀 → 과열 모드 — 화(火) 기운이 올라 욱하기 쉬운 날<br>'+
    '• 🟣 자줏빛 어두운 혀 → 흐름 정체 — 순환이 막힌 느낌, 가벼운 스트레칭 추천<br>'+
    '• 🌫️ 하얀 이불을 덮은 혀 → 위장 과부하 — 오늘 점심은 가볍게<br>'+
    '• 🟡 노란빛이 도는 혀 → 노폐물 축적 — 야식은 잠시 미뤄 보세요<br>'+
    '• 🌵 가뭄처럼 갈라진 혀 → 수분 부족 — 지금 물 한 잔 드세요<br><br>'+
    '<b style="color:#d4a843">건강이 걱정되면:</b> 한의원 등 전문기관에서 상담하세요<br><br>'+
    '<span style="color:rgba(251,191,36,.8);font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  sleep: {
    title:'😴 밤샘 데미지 & 충전 배터리',
    content:
    _c24Guide('129,140,248',
      ['밝은 곳에서 정면을 바라봐 주세요','카메라와 얼굴 거리 30~50cm 유지','눈 밑 다크서클이 잘 보이도록 조명 조절','안경 제거 후 측정 권장','45초간 얼굴을 고정, 자연스럽게 눈을 떠 주세요'],
      '피로도 측정은 아침 기상 직후 또는 저녁 취침 전 측정이 가장 정확합니다')+
    '<b style="color:#818cf8">📷 측정 부위:</b> 👤 얼굴 모드 선택<br><br>'+
    '<b style="color:#818cf8">카메라로 관찰 가능한 지표:</b><br>'+
    '• 🐼 <b>다크 섀도우(밤샘 흔적)</b> — 얼굴에 지친 흔적이 누적됐어요. 오늘은 일찍 불을 끄세요<br>'+
    '• 🪨 <b>방전 주의보</b> — 배터리가 완충되지 못했어요. 정적인 휴식이 시급<br>'+
    '• 🌪️ <b>밤샘 폭주 엔진</b> — 쉬어야 할 때도 박자가 거칠어요. 따뜻한 우유나 명상으로<br>'+
    '• 🧊 <b>꽁꽁 얼어붙은 무기력</b> — 오늘만큼은 보양식과 긴 숙면을<br><br>'+
    '<b style="color:#818cf8">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:rgba(251,191,36,.8);font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  skin: {
    title:'🧬 피부 생기(生氣) 광채 & 안색 톤',
    content:
    _c24Guide('52,211,153',
      ['측정할 피부 부위(이마·뺨·손등)를 밝은 곳에 노출해 주세요','카메라와 피부 거리 10~20cm 유지','크림·화장품 없는 맨 피부 상태 권장','피부 전체가 화면에 균일하게 보이도록 조절','20초간 피부 고정, 이후 얼굴 20초 자동 전환'],
      '자연광 또는 백색 형광등 아래에서 측정해야 피부색이 정확히 측정됩니다')+
    '<b style="color:#34d399">📷 측정 부위:</b> 🎨 피부 또는 👤 얼굴 모드 선택<br><br>'+
    '<b style="color:#34d399">카메라로 관찰 가능한 지표:</b><br>'+
    '• 🌫️ <b>안색 흐림(정체된 기운)</b> — 몸을 가볍게 비워내고 충분한 휴식을<br>'+
    '• ❄️ <b>끝자락 온기 방전</b> — 따뜻한 음료로 온기를 채워 주세요<br>'+
    '• 🔥 <b>붉은 불꽃(과열 텐션)</b> — 쿨링 타임과 마음의 안정이 필요해요<br>'+
    '• 🧊 <b>생기 가뭄 구간</b> — 내면 배터리가 부족해요. 영양 가득한 식사를<br>'+
    '• ☀️ <b>빛 가림(스킨 방어막) 점검</b> — 외출 전 스킨 가드와 수분 충전을<br><br>'+
    '<b style="color:#34d399">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:rgba(251,191,36,.8);font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  }
};

// ★ 질환별 측정 순서 정의

var _c24DiseaseState = {
  key: null,       // 현재 컨디션 키
  stepIdx: 0,      // 현재 단계 인덱스
  results: [],     // 각 단계 결과 저장 [{mode,bpm,hrv,fci,image}]
  active: false
};

var _c24DiseaseFlow = {
  cardio:     {steps:['face'],          labels:['👤 얼굴'],          times:[60],     total:1},
  anemia:     {steps:['face','hand'],   labels:['👤 얼굴','✋ 손'],  times:[45,15],  total:2},
  thyroid:    {steps:['face','eye'],    labels:['👤 얼굴','👁️ 눈'],   times:[45,15],  total:2},
  liver:      {steps:['eye','skin'],    labels:['👁️ 눈','🎨 피부'],   times:[20,20],  total:2},
  diabetes:   {steps:['hand','skin'],   labels:['✋ 손','🎨 피부'],   times:[20,20],  total:2},
  autonomic:  {steps:['face'],          labels:['👤 얼굴'],          times:[60],     total:1},
  respiratory:{steps:['face','hand'],   labels:['👤 얼굴','✋ 손'],  times:[45,15],  total:2},
  oriental:   {steps:['tongue'],        labels:['👅 혀'],            times:[20],     total:1},
  sleep:      {steps:['face'],          labels:['👤 얼굴'],          times:[45],     total:1},
  skin:       {steps:['skin','face'],   labels:['🎨 피부','👤 얼굴'], times:[20,20],  total:2}
};

// 진행 중인 질환 검사 상태

function _c24Start(){ try{ if(typeof _c24CompStart==="function") return _c24CompStart(); }catch(e){} }

function _c24StartDisease(key){
  var flow = _c24DiseaseFlow[key];
  var card = _c24Cards[key];
  if(!flow||!card) return;

  // 기존 팝업 제거
  var old = document.getElementById('c24-disease-guide-pop');
  if(old) old.remove();

  // 단계별 안내 생성
  var stepColors = {face:'56,189,248', tongue:'248,113,113', eye:'52,211,153', skin:'244,114,182', hand:'251,191,36', hand_back:'251,191,36', hand_palm:'251,191,36'};
  var stepGuides = {
    face:  {ico:'👤', name:'얼굴', cam:_cK(8608,'📱 전면 카메라'), dist:'30~40cm', tips:['밝은 정면 조명', '안경·모자 제거', '무표정으로 정면 응시']},
    tongue:{ico:'👅', name:'혀',   cam:_cK(8608,'📱 전면 카메라'), dist:'15~20cm', tips:['혀를 최대한 내밀기', '혀 전체가 화면에 보이도록', '식사 30분 후 권장']},
    eye:   {ico:'👁️', name:'눈',   cam:_cK(8608,'📱 전면 카메라'), dist:'15~20cm', tips:['위를 약간 봐서 흰자 노출', '렌즈 제거 권장', '눈을 크게 뜨기']},
    skin:  {ico:'🎨', name:'피부', cam:_cK(8608,'📱 전면 카메라'), dist:'10~15cm', tips:['맨 피부 상태 권장', '크림·화장 없이', '자연광 또는 백색등']},
    hand:  {ico:'✋', name:'손',   cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손가락 가지런히 펴기', _cK(8627,'매니큐어 제거 권장'), '손 흔들지 않기']},
    hand_back: {ico:'🤚', name:'손등', cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손톱 잘 보이게', _cK(8627,'매니큐어 제거 권장'), '손 흔들지 않기']},
    hand_palm: {ico:'✋', name:'손바닥', cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손바닥 평평하게 펼치기', '손금이 보이도록', '손 흔들지 않기']}
  };

  var totalSec = (flow.times||[]).reduce(function(a,b){return a+b;},0);
  var stepsHtml = flow.steps.map(function(s,i){
    var g = stepGuides[s]||stepGuides['face'];
    var c = stepColors[s]||'56,189,248';
    var t = flow.times?flow.times[i]:60;
    return '<div style="background:rgba('+c+',.07);border:1px solid rgba('+c+',.25);border-radius:10px;padding:10px 12px;margin-bottom:8px;">'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">'
      +'<span style="font-size:18px;">'+g.ico+'</span>'
      +'<span style="font-size:12px;font-weight:800;color:rgba('+c+',1);">'+(i+1)+'단계 · '+g.name+' — '+t+'초</span>'
      +'<span style="font-size:10px;color:rgba('+c+',.5);margin-left:auto;">'+g.cam+'</span></div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;padding-left:26px;">'
      +'📏 카메라와 <b style="color:#fff;">'+g.dist+'</b> 거리 유지<br>'
      +g.tips.map(function(t){return '• '+t;}).join('<br>')
      +'</div></div>';
  }).join('');

  var pop = document.createElement('div');
  pop.id = 'c24-disease-guide-pop';
  pop.style.cssText = 'position:fixed;inset:0;z-index:19000;background:rgba(2,8,23,.92);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;';

  pop.innerHTML =
    '<div style="width:100%;max-width:480px;max-height:90vh;overflow-y:auto;background:linear-gradient(160deg,#0a1628,#0d1f3c);border-radius:20px 20px 0 0;border-top:2px solid rgba(212,168,67,.4);padding:20px 18px 32px;">'
    // 헤더
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">'
    +'<div style="font-size:15px;font-weight:900;color:#d4a843;">'+card.title+' 검사 안내</div>'
    +'<div style="font-size:11px;color:rgba(212,168,67,.6);">총 '+totalSec+'초</div></div>'
    // 단계 안내
    +stepsHtml
    // 공통 주의
    +'<div style="background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.2);border-radius:10px;padding:10px 14px;margin:10px 0 16px;">'
    +'<div style="font-size:11px;font-weight:800;color:#fbbf24;margin-bottom:4px;">'+_cK(8631,'⚠️ 공통 주의사항')+'</div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;">'
    +_cK(8632,'• 밝은 곳에서 측정할수록 정확도가 높아집니다')+'<br>'
    +(flow.total>1 ? '• 단계가 끝나면 자동으로 다음 단계로 넘어갑니다<br>' : '')
    +_cK(8635,'• 본 분석은 참고용이며 의학적 진단을 대체하지 않습니다')
    +'</div></div>'
    // 버튼
    +'<div style="display:flex;gap:10px;">'
    +'<button onclick="_c24DiseaseRealStart(\''+key+'\')" style="flex:3;padding:15px;background:linear-gradient(135deg,rgba(212,168,67,.3),rgba(248,113,113,.2));border:2px solid rgba(212,168,67,.7);border-radius:14px;color:#d4a843;font-size:15px;font-weight:900;cursor:pointer;">✅ 이해했습니다 — 측정 시작</button>'
    +'<button onclick="document.getElementById(\'c24-disease-guide-pop\').remove()" style="flex:1;padding:15px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:14px;color:rgba(240,230,200,.5);font-size:13px;cursor:pointer;">'+_cK(8637,'나중에')+'</button>'
    +'</div></div>';

  document.body.appendChild(pop);
};



/* ══════════════════════════════════════════════════════════════
   ② 색공간 다겹 + ③ POS 교차검증 + ① 환경 결합
   폰 카메라는 R·G·B 셋만 준다. 하드웨어는 그대로 두고,
   같은 픽셀을 다른 각도로 봐서 신호를 늘린다.
   세 방법이 같은 맥박을 가리키면 그것이 신뢰도 근거가 된다.
   ══════════════════════════════════════════════════════════════ */
window._c24Sig = { pos:[], green:[], ycbcr:[], lab:[], agree:0, snr:0 };

/* ── 색공간 변환 — 같은 픽셀, 다른 각도 ── */
function _c24Spaces(r, g, b){
  /* YCbCr — 밝기와 색을 나눈다. Cr 이 붉은기를 가장 잘 담는다 */
  var cr = 0.5*r - 0.4187*g - 0.0813*b + 128;
  /* CIE Lab 의 a* 근사 — 붉은-녹색 축. 혈류가 여기서 가장 크게 흔들린다 */
  var a  = 0.5*(r - g) + 0.25*(r - b);
  /* HSV 의 색상 각도 — 조명이 바뀌어도 잘 안 흔들린다 */
  var mx = Math.max(r,g,b), mn = Math.min(r,g,b), d = mx - mn;
  var hue = d < 1 ? 0 : (mx === r ? ((g-b)/d) : (mx === g ? 2+(b-r)/d : 4+(r-g)/d)) * 60;
  return { cr: cr, a: a, hue: hue };
}

/* ── POS (Plane-Orthogonal-to-Skin) — CHROM 과 다른 방법 ──
   피부색 평면에 수직인 방향으로 투영해 맥동만 남긴다.
   CHROM 과 결과가 같으면 서로가 서로의 증거가 된다. */
function _c24POS(rS, gS, bS){
  var n = rS.length; if(n < 8) return 0;
  function mean(a){ var s=0; for(var i=0;i<a.length;i++) s+=a[i]; return s/a.length; }
  var mr=mean(rS), mg=mean(gS), mb=mean(bS);
  if(mr<1||mg<1||mb<1) return 0;
  var rn = rS[n-1]/mr, gn = gS[n-1]/mg, bn = bS[n-1]/mb;
  /* 피부 평면에 수직인 두 축 */
  var s1 = -1*rn + 1*gn + 0*bn;
  var s2 = -2*rn + 1*gn + 1*bn;
  return s1 + s2 * 0.6;
}

/* ── 세 방법이 얼마나 일치하는가 — 신뢰도의 실제 근거 ── */
function _c24Agree(){
  var S = window._c24Sig;
  var a = _c24BpmOf(_c24.chromSig), b = _c24BpmOf(S.pos), g = _c24BpmOf(S.green);
  var v = [a,b,g].filter(function(x){ return x > 0; });
  if(v.length < 2){ S.agree = 0; return 0; }
  var mx = Math.max.apply(null,v), mn = Math.min.apply(null,v);
  S.agree = Math.max(0, 1 - (mx-mn)/25);   /* 25bpm 벌어지면 0 */
  return S.agree;
}

/* 신호 하나에서 맥박을 세는 가벼운 계산 */
function _c24BpmOf(sig){
  if(!sig || sig.length < 60) return 0;
  var minD = Math.round(_c24.sampleRate*0.35), pk = [];
  for(var i=2;i<sig.length-2;i++){
    if(sig[i]>sig[i-1]&&sig[i]>sig[i-2]&&sig[i]>sig[i+1]&&sig[i]>sig[i+2]){
      if(!pk.length || i-pk[pk.length-1] >= minD) pk.push(i);
    }
  }
  if(pk.length < 4) return 0;
  var d = [];
  for(var j=1;j<pk.length;j++) d.push((pk[j]-pk[j-1])*(1000/_c24.sampleRate));
  d = d.filter(function(x){ return x>333 && x<1500; });
  if(d.length < 2) return 0;
  var m = 0; for(var k=0;k<d.length;k++) m += d[k];
  return Math.round(60000/(m/d.length));
}

/* ── 신호대잡음 — 맥박 대역이 얼마나 또렷한가 ── */
function _c24SNR(sig){
  if(!sig || sig.length < 90) return 0;
  var s = sig.slice(-180);
  var m = 0; for(var i=0;i<s.length;i++) m += s[i]; m /= s.length;
  var band = 0, all = 0;
  for(var i=1;i<s.length;i++){
    var d = Math.abs(s[i]-s[i-1]);
    all += d;
    if(d > Math.abs(s[i]-m)*0.3) band += d;
  }
  if(all < 1e-6) return 0;
  return Math.round(10*Math.log10(Math.max(0.01, band/(all-band+1e-6)))*10)/10;
}

/* ══ ① 환경 결합 — 기온·습도가 혈류를 바꾼다 ══
   더우면 혈관이 열려 맥이 빠르고, 추우면 손끝 혈류가 줄어든다.
   같은 사람이 여름과 겨울에 다르게 나오던 것을 그만큼 되돌린다.
   인증에서는 이것이 재현성 근거가 된다. */
window._c24Env = { tempC: null, humid: null, lat: null, lon: null, at: 0 };

function _c24EnvRead(){
  var e = window._c24Env;
  try{
    /* 날씨 카드가 이미 받아 둔 값을 쓴다 — 새로 받지 않는다 */
    /* 화면에 이미 떠 있는 날씨 값을 읽는다 — 새로 받지 않는다 */
    var _t = document.getElementById('cgoWeatherTempBar');
    var _hm = document.getElementById('cgoWeatherHumBar');
    if(_t){ var mt = (_t.textContent||'').match(/-?\d+(\.\d+)?/); if(mt) e.tempC = +mt[0]; }
    if(_hm){ var mh = (_hm.textContent||'').match(/\d+/); if(mh) e.humid = +mh[0]; }
    if(window._cgoWeather){
      if(window._cgoWeather.temp  != null) e.tempC = +window._cgoWeather.temp;
      if(window._cgoWeather.humid != null) e.humid = +window._cgoWeather.humid;
    }
    var p = JSON.parse(localStorage.getItem('cgo_geo_pos') || 'null');
    if(p){ e.lat = p.lat; e.lon = p.lng; }
  }catch(_){}
  e.at = Date.now();
  return e;
}

/* 기온 보정 — 여름·겨울 차이를 되돌린다 */
function _c24EnvAdjust(bpm, mode){
  var e = window._c24Env;
  if(!isFinite(bpm) || bpm <= 0 || e.tempC == null) return bpm;
  /* 기준 22도. 1도 오를 때 약 0.35bpm 빨라진다 (일반적 관찰 범위) */
  var d = (e.tempC - 22) * 0.35;
  /* 손은 기온에 더 민감하다 */
  if(mode === 'hand' || mode === 'hand_back' || mode === 'hand_palm') d *= 1.6;
  var out = bpm - d;
  return Math.round(Math.max(40, Math.min(180, out)));
}

/* ══════════════════════════════════════════════════════════════
   측정 품질 엔진 — 거리 · 조도 · 흔들림 · 생리 구속 · 측정 원장
   인증은 결과가 아니라 기록으로 통과한다. 재현성 · 추적성 ·
   조건 기록 · 한계 고지를 매 초 남긴다.
   화면 표현은 웰니스, 속에 남는 값은 임상 지표 그대로.
   ══════════════════════════════════════════════════════════════ */
window._c24Q = {
  lux: 0, distCm: 0, motionPx: 0,
  dropped: 0, clamped: 0, frames: 0,
  distOK: true, luxOK: true,
  ledger: [], _lastLm: null, _bpmHist: []
};

/* ── 거리 — 눈 사이 픽셀로 cm 추정 ──
   사람 눈 사이는 평균 6.3cm 로 거의 일정하다. 화면에서 그 폭이
   몇 픽셀인지 보면 거리가 나온다. 사용자가 팔만 움직이면 고칠 수 있으므로
   이것만 막는다(원 빨강 · 타임바 정지). */
function _c24Distance(lms, vw){
  if(!lms || !lms[33] || !lms[263]) return 0;
  var dx = (lms[263].x - lms[33].x) * vw;
  var dy = (lms[263].y - lms[33].y) * vw;
  var px = Math.sqrt(dx*dx + dy*dy);
  if(px < 1) return 0;
  /* 초점거리를 화면 폭으로 근사 — 기기가 달라도 비율은 유지된다 */
  return Math.round((6.3 * vw) / px);
}

/* ── 조도 — 밝기를 없애고 비율만 남긴다 ──
   rPPG 가 보는 것은 "얼마나 붉어졌다 옅어졌다" 하는 비율이다.
   밝기 자체는 필요 없다. 비율만 남기면 형광등 깜빡임도, 구름이
   지나가는 것도 통째로 사라진다. 어두운 방에서도 비율은 살아 있다. */
function _c24Illum(r, g, b){
  var sum = r + g + b;
  var lux = Math.round(0.2126*r + 0.7152*g + 0.0722*b);  /* 휘도 */
  if(sum < 1) return { r:0, g:0, b:0, lux:0 };
  return { r: r/sum, g: g/sum, b: b/sum, lux: lux };     /* 색도만 */
}

/* ── 흔들림 — 버리지 않고 되돌린다 ──
   랜드마크가 있으니 얼굴이 어디로 몇 픽셀 움직였는지 안다.
   그만큼 ROI 를 따라 옮기면 얼굴이 움직여도 같은 뺨을 계속 본다.
   말하거나 기침하는 순간만(임계 초과) 그 프레임을 버린다. */
function _c24Motion(lms){
  var q = window._c24Q;
  if(!lms || !lms[1] || !lms[33] || !lms[263]){ q._lastLm = null; return 0; }
  var now = [lms[1].x, lms[1].y, lms[33].x, lms[33].y, lms[263].x, lms[263].y];
  var prev = q._lastLm;
  q._lastLm = now;
  if(!prev) return 0;
  var s = 0;
  for(var i=0; i<6; i+=2){
    var dx = (now[i]-prev[i]) * 640, dy = (now[i+1]-prev[i+1]) * 480;
    s += Math.sqrt(dx*dx + dy*dy);
  }
  return s / 3;
}

/* ── 생리 구속 — 사람 심장이 낼 수 없는 값을 깎는다 ──
   심박은 한 박자 만에 30 이상 뛰지 않는다. 카메라 잡음으로 튄 값을
   실제 생리 범위로 되돌린다. 깎은 횟수를 남겨 추적할 수 있게 한다. */
function _c24Physio(bpm){
  var q = window._c24Q, h = q._bpmHist;
  if(!isFinite(bpm) || bpm <= 0) return bpm;
  if(bpm < 40) bpm = 40; else if(bpm > 180) bpm = 180;
  if(h.length){
    var last = h[h.length-1], d = bpm - last;
    if(Math.abs(d) > 12){ bpm = last + (d > 0 ? 12 : -12); q.clamped++; }
  }
  h.push(bpm);
  if(h.length > 30) h.shift();
  return Math.round(bpm);
}

/* ── 측정 원장 — 인증의 실제 증거 ──
   매 초 조건과 값을 남긴다. 나중에 임상 검증할 때
   뒤늦게 만들 수 없는 데이터가 된다. 기기 안에만 남는다. */
function _c24Ledger(sec, mode){
  var q = window._c24Q;
  var S = window._c24Sig || {}, E = window._c24Env || {};
  q.ledger.push({
    t: sec, mode: mode,
    lux: q.lux, dist: q.distCm, motion: Math.round(q.motionPx*10)/10,
    bpm: _c24.bpm || 0, hrv: _c24.hrv || 0,
    fit: !!_c24.fitOK, dropped: q.dropped, clamped: q.clamped,
    /* 교차검증 — 세 방법이 얼마나 일치했는가 */
    agree: Math.round((S.agree||0)*100)/100, snr: S.snr||0,
    /* 측정 조건 — 재현성 근거 */
    tempC: E.tempC, humid: E.humid
  });
}

/* 신뢰도 — 못 믿을 때 못 믿는다고 말하기 위한 값 */
function _c24Confidence(){
  var q = window._c24Q;
  if(!q.frames) return 0;
  var keep = 1 - (q.dropped / q.frames);
  var lux  = Math.min(1, q.lux / 60);
  var dist = (q.distCm >= 28 && q.distCm <= 45) ? 1 : 0.6;
  var calm = Math.max(0, 1 - q.motionPx / 8);
  var agree = (window._c24Sig && window._c24Sig.agree) || 0;
  /* 세 방법이 같은 맥박을 가리키는지가 가장 큰 근거다 */
  return Math.round((keep*0.25 + lux*0.15 + dist*0.15 + calm*0.2 + agree*0.25) * 100) / 100;
}
window._c24Confidence = _c24Confidence;

function _c24InitFM(){
  try{
    if(_c24.fm) return;
    _c24.fm=new FaceMesh({locateFile:function(f){return 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/'+f;}});
    _c24.fm.setOptions({maxNumFaces:1,refineLandmarks:false,minDetectionConfidence:0.7,minTrackingConfidence:0.7});  /* ★ C-63: 0.7 유지 (정확도 우선) */
    _c24.fm.onResults(function(r){
      try{
        _c24._fmRecv=(_c24._fmRecv||0)+1;   /* ★ C-63: FaceMesh 응답 수신 횟수 */
        if(r && r.multiFaceLandmarks && r.multiFaceLandmarks.length>0){
          _c24._faceLms=r.multiFaceLandmarks[0]; _c24._faceLmsTime=performance.now();
          _c24._fmHit=(_c24._fmHit||0)+1;    /* 얼굴 검출 성공 횟수 */
        } else { _c24._faceLms=null; }
      }catch(e){}
    });
  }catch(e){ _c24.fm=null; }
};

function _c24StartDisease(key){
  var flow = _c24DiseaseFlow[key];
  var card = _c24Cards[key];
  if(!flow||!card) return;

  // 기존 팝업 제거
  var old = document.getElementById('c24-disease-guide-pop');
  if(old) old.remove();

  // 단계별 안내 생성
  var stepColors = {face:'56,189,248', tongue:'248,113,113', eye:'52,211,153', skin:'244,114,182', hand:'251,191,36', hand_back:'251,191,36', hand_palm:'251,191,36'};
  var stepGuides = {
    face:  {ico:'👤', name:'얼굴', cam:_cK(8608,'📱 전면 카메라'), dist:'30~40cm', tips:['밝은 정면 조명', '안경·모자 제거', '무표정으로 정면 응시']},
    tongue:{ico:'👅', name:'혀',   cam:_cK(8608,'📱 전면 카메라'), dist:'15~20cm', tips:['혀를 최대한 내밀기', '혀 전체가 화면에 보이도록', '식사 30분 후 권장']},
    eye:   {ico:'👁️', name:'눈',   cam:_cK(8608,'📱 전면 카메라'), dist:'15~20cm', tips:['위를 약간 봐서 흰자 노출', '렌즈 제거 권장', '눈을 크게 뜨기']},
    skin:  {ico:'🎨', name:'피부', cam:_cK(8608,'📱 전면 카메라'), dist:'10~15cm', tips:['맨 피부 상태 권장', '크림·화장 없이', '자연광 또는 백색등']},
    hand:  {ico:'✋', name:'손',   cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손가락 가지런히 펴기', _cK(8627,'매니큐어 제거 권장'), '손 흔들지 않기']},
    hand_back: {ico:'🤚', name:'손등', cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손톱 잘 보이게', _cK(8627,'매니큐어 제거 권장'), '손 흔들지 않기']},
    hand_palm: {ico:'✋', name:'손바닥', cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손바닥 평평하게 펼치기', '손금이 보이도록', '손 흔들지 않기']}
  };

  var totalSec = (flow.times||[]).reduce(function(a,b){return a+b;},0);
  var stepsHtml = flow.steps.map(function(s,i){
    var g = stepGuides[s]||stepGuides['face'];
    var c = stepColors[s]||'56,189,248';
    var t = flow.times?flow.times[i]:60;
    return '<div style="background:rgba('+c+',.07);border:1px solid rgba('+c+',.25);border-radius:10px;padding:10px 12px;margin-bottom:8px;">'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">'
      +'<span style="font-size:18px;">'+g.ico+'</span>'
      +'<span style="font-size:12px;font-weight:800;color:rgba('+c+',1);">'+(i+1)+'단계 · '+g.name+' — '+t+'초</span>'
      +'<span style="font-size:10px;color:rgba('+c+',.5);margin-left:auto;">'+g.cam+'</span></div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;padding-left:26px;">'
      +'📏 카메라와 <b style="color:#fff;">'+g.dist+'</b> 거리 유지<br>'
      +g.tips.map(function(t){return '• '+t;}).join('<br>')
      +'</div></div>';
  }).join('');

  var pop = document.createElement('div');
  pop.id = 'c24-disease-guide-pop';
  pop.style.cssText = 'position:fixed;inset:0;z-index:19000;background:rgba(2,8,23,.92);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;';

  pop.innerHTML =
    '<div style="width:100%;max-width:480px;max-height:90vh;overflow-y:auto;background:linear-gradient(160deg,#0a1628,#0d1f3c);border-radius:20px 20px 0 0;border-top:2px solid rgba(212,168,67,.4);padding:20px 18px 32px;">'
    // 헤더
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">'
    +'<div style="font-size:15px;font-weight:900;color:#d4a843;">'+card.title+' 검사 안내</div>'
    +'<div style="font-size:11px;color:rgba(212,168,67,.6);">총 '+totalSec+'초</div></div>'
    // 단계 안내
    +stepsHtml
    // 공통 주의
    +'<div style="background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.2);border-radius:10px;padding:10px 14px;margin:10px 0 16px;">'
    +'<div style="font-size:11px;font-weight:800;color:#fbbf24;margin-bottom:4px;">'+_cK(8631,'⚠️ 공통 주의사항')+'</div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;">'
    +_cK(8632,'• 밝은 곳에서 측정할수록 정확도가 높아집니다')+'<br>'
    +(flow.total>1 ? '• 단계가 끝나면 자동으로 다음 단계로 넘어갑니다<br>' : '')
    +_cK(8635,'• 본 분석은 참고용이며 의학적 진단을 대체하지 않습니다')
    +'</div></div>'
    // 버튼
    +'<div style="display:flex;gap:10px;">'
    +'<button onclick="_c24DiseaseRealStart(\''+key+'\')" style="flex:3;padding:15px;background:linear-gradient(135deg,rgba(212,168,67,.3),rgba(248,113,113,.2));border:2px solid rgba(212,168,67,.7);border-radius:14px;color:#d4a843;font-size:15px;font-weight:900;cursor:pointer;">✅ 이해했습니다 — 측정 시작</button>'
    +'<button onclick="document.getElementById(\'c24-disease-guide-pop\').remove()" style="flex:1;padding:15px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:14px;color:rgba(240,230,200,.5);font-size:13px;cursor:pointer;">'+_cK(8637,'나중에')+'</button>'
    +'</div></div>';

  document.body.appendChild(pop);
};

function _c24EnsureFM(){
  try{
    if(_c24.fm || _c24._fmLoading) return;
    if(typeof FaceMesh!=='undefined'){ _c24InitFM(); return; }
    _c24._fmLoading=true;
    if(!document.querySelector('script[data-c24-facemesh]')){
      var s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js';
      s.setAttribute('data-c24-facemesh','1'); s.crossOrigin='anonymous';
      document.head.appendChild(s);
    }
    var tries=0;
    var iv=setInterval(function(){
      tries++;
      if(typeof FaceMesh!=='undefined'){ clearInterval(iv); _c24._fmLoading=false; _c24InitFM(); }
      else if(tries>60){ clearInterval(iv); _c24._fmLoading=false; } /* 6초 실패 → 살색비율 폴백 */
    },100);
  }catch(e){ _c24._fmLoading=false; }
};

function _c24StartDisease(key){
  var flow = _c24DiseaseFlow[key];
  var card = _c24Cards[key];
  if(!flow||!card) return;

  // 기존 팝업 제거
  var old = document.getElementById('c24-disease-guide-pop');
  if(old) old.remove();

  // 단계별 안내 생성
  var stepColors = {face:'56,189,248', tongue:'248,113,113', eye:'52,211,153', skin:'244,114,182', hand:'251,191,36', hand_back:'251,191,36', hand_palm:'251,191,36'};
  var stepGuides = {
    face:  {ico:'👤', name:'얼굴', cam:_cK(8608,'📱 전면 카메라'), dist:'30~40cm', tips:['밝은 정면 조명', '안경·모자 제거', '무표정으로 정면 응시']},
    tongue:{ico:'👅', name:'혀',   cam:_cK(8608,'📱 전면 카메라'), dist:'15~20cm', tips:['혀를 최대한 내밀기', '혀 전체가 화면에 보이도록', '식사 30분 후 권장']},
    eye:   {ico:'👁️', name:'눈',   cam:_cK(8608,'📱 전면 카메라'), dist:'15~20cm', tips:['위를 약간 봐서 흰자 노출', '렌즈 제거 권장', '눈을 크게 뜨기']},
    skin:  {ico:'🎨', name:'피부', cam:_cK(8608,'📱 전면 카메라'), dist:'10~15cm', tips:['맨 피부 상태 권장', '크림·화장 없이', '자연광 또는 백색등']},
    hand:  {ico:'✋', name:'손',   cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손가락 가지런히 펴기', _cK(8627,'매니큐어 제거 권장'), '손 흔들지 않기']},
    hand_back: {ico:'🤚', name:'손등', cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손톱 잘 보이게', _cK(8627,'매니큐어 제거 권장'), '손 흔들지 않기']},
    hand_palm: {ico:'✋', name:'손바닥', cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손바닥 평평하게 펼치기', '손금이 보이도록', '손 흔들지 않기']}
  };

  var totalSec = (flow.times||[]).reduce(function(a,b){return a+b;},0);
  var stepsHtml = flow.steps.map(function(s,i){
    var g = stepGuides[s]||stepGuides['face'];
    var c = stepColors[s]||'56,189,248';
    var t = flow.times?flow.times[i]:60;
    return '<div style="background:rgba('+c+',.07);border:1px solid rgba('+c+',.25);border-radius:10px;padding:10px 12px;margin-bottom:8px;">'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">'
      +'<span style="font-size:18px;">'+g.ico+'</span>'
      +'<span style="font-size:12px;font-weight:800;color:rgba('+c+',1);">'+(i+1)+'단계 · '+g.name+' — '+t+'초</span>'
      +'<span style="font-size:10px;color:rgba('+c+',.5);margin-left:auto;">'+g.cam+'</span></div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;padding-left:26px;">'
      +'📏 카메라와 <b style="color:#fff;">'+g.dist+'</b> 거리 유지<br>'
      +g.tips.map(function(t){return '• '+t;}).join('<br>')
      +'</div></div>';
  }).join('');

  var pop = document.createElement('div');
  pop.id = 'c24-disease-guide-pop';
  pop.style.cssText = 'position:fixed;inset:0;z-index:19000;background:rgba(2,8,23,.92);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;';

  pop.innerHTML =
    '<div style="width:100%;max-width:480px;max-height:90vh;overflow-y:auto;background:linear-gradient(160deg,#0a1628,#0d1f3c);border-radius:20px 20px 0 0;border-top:2px solid rgba(212,168,67,.4);padding:20px 18px 32px;">'
    // 헤더
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">'
    +'<div style="font-size:15px;font-weight:900;color:#d4a843;">'+card.title+' 검사 안내</div>'
    +'<div style="font-size:11px;color:rgba(212,168,67,.6);">총 '+totalSec+'초</div></div>'
    // 단계 안내
    +stepsHtml
    // 공통 주의
    +'<div style="background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.2);border-radius:10px;padding:10px 14px;margin:10px 0 16px;">'
    +'<div style="font-size:11px;font-weight:800;color:#fbbf24;margin-bottom:4px;">'+_cK(8631,'⚠️ 공통 주의사항')+'</div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;">'
    +_cK(8632,'• 밝은 곳에서 측정할수록 정확도가 높아집니다')+'<br>'
    +(flow.total>1 ? '• 단계가 끝나면 자동으로 다음 단계로 넘어갑니다<br>' : '')
    +_cK(8635,'• 본 분석은 참고용이며 의학적 진단을 대체하지 않습니다')
    +'</div></div>'
    // 버튼
    +'<div style="display:flex;gap:10px;">'
    +'<button onclick="_c24DiseaseRealStart(\''+key+'\')" style="flex:3;padding:15px;background:linear-gradient(135deg,rgba(212,168,67,.3),rgba(248,113,113,.2));border:2px solid rgba(212,168,67,.7);border-radius:14px;color:#d4a843;font-size:15px;font-weight:900;cursor:pointer;">✅ 이해했습니다 — 측정 시작</button>'
    +'<button onclick="document.getElementById(\'c24-disease-guide-pop\').remove()" style="flex:1;padding:15px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:14px;color:rgba(240,230,200,.5);font-size:13px;cursor:pointer;">'+_cK(8637,'나중에')+'</button>'
    +'</div></div>';

  document.body.appendChild(pop);
};

function _c24CompStartReal(){
  var pop = document.getElementById('c24-scan-guide-pop');
  if(pop) pop.remove();
  _c24CompState.active = true;
  try{var _paS=document.getElementById('page-algo');if(_paS){_paS.classList.add('c24-scanning');_paS.scrollTop=0;}}catch(e){}
  _c24CompState.step = 0;
  _c24CompState.images = {face:null,tongue:null,eye:null,skin:null,hand_back:null,hand_palm:null};
  _c24CompState.breathData = {cycles:0, inhaleAvg:0, holdAvg:0, exhaleAvg:0};
  // 버튼 강조
  var cb=document.getElementById('c24-btn-comp');
  if(cb){cb.style.background='rgba(52,211,153,.25)';cb.style.borderColor='rgba(52,211,153,.9)';}
  // 시작 딩동댕 (B-2b)
  try{ if(typeof _c24Chime==='function') _c24Chime(); }catch(e){}
  // AR-1: FaceMesh 정밀 인터록 준비 (실패 시 살색비율 폴백)
  try{ if(typeof _c24EnsureFM==='function') _c24EnsureFM(); }catch(e){}
  // 1단계: 얼굴 60초
  _c24CompDoStep(0);
};

function _c24DiseaseClose(){
  var pop=document.getElementById('c24-disease-pop');
  var ov=document.getElementById('c24-disease-pop-ov');
  if(pop){ pop.style.transform='translateY(100%)'; setTimeout(function(){ pop.style.display='none'; },320); }
  if(ov) ov.style.display='none';
};

function _c24StartDisease(key){
  var flow = _c24DiseaseFlow[key];
  var card = _c24Cards[key];
  if(!flow||!card) return;

  // 기존 팝업 제거
  var old = document.getElementById('c24-disease-guide-pop');
  if(old) old.remove();

  // 단계별 안내 생성
  var stepColors = {face:'56,189,248', tongue:'248,113,113', eye:'52,211,153', skin:'244,114,182', hand:'251,191,36', hand_back:'251,191,36', hand_palm:'251,191,36'};
  var stepGuides = {
    face:  {ico:'👤', name:'얼굴', cam:_cK(8608,'📱 전면 카메라'), dist:'30~40cm', tips:['밝은 정면 조명', '안경·모자 제거', '무표정으로 정면 응시']},
    tongue:{ico:'👅', name:'혀',   cam:_cK(8608,'📱 전면 카메라'), dist:'15~20cm', tips:['혀를 최대한 내밀기', '혀 전체가 화면에 보이도록', '식사 30분 후 권장']},
    eye:   {ico:'👁️', name:'눈',   cam:_cK(8608,'📱 전면 카메라'), dist:'15~20cm', tips:['위를 약간 봐서 흰자 노출', '렌즈 제거 권장', '눈을 크게 뜨기']},
    skin:  {ico:'🎨', name:'피부', cam:_cK(8608,'📱 전면 카메라'), dist:'10~15cm', tips:['맨 피부 상태 권장', '크림·화장 없이', '자연광 또는 백색등']},
    hand:  {ico:'✋', name:'손',   cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손가락 가지런히 펴기', _cK(8627,'매니큐어 제거 권장'), '손 흔들지 않기']},
    hand_back: {ico:'🤚', name:'손등', cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손톱 잘 보이게', _cK(8627,'매니큐어 제거 권장'), '손 흔들지 않기']},
    hand_palm: {ico:'✋', name:'손바닥', cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손바닥 평평하게 펼치기', '손금이 보이도록', '손 흔들지 않기']}
  };

  var totalSec = (flow.times||[]).reduce(function(a,b){return a+b;},0);
  var stepsHtml = flow.steps.map(function(s,i){
    var g = stepGuides[s]||stepGuides['face'];
    var c = stepColors[s]||'56,189,248';
    var t = flow.times?flow.times[i]:60;
    return '<div style="background:rgba('+c+',.07);border:1px solid rgba('+c+',.25);border-radius:10px;padding:10px 12px;margin-bottom:8px;">'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">'
      +'<span style="font-size:18px;">'+g.ico+'</span>'
      +'<span style="font-size:12px;font-weight:800;color:rgba('+c+',1);">'+(i+1)+'단계 · '+g.name+' — '+t+'초</span>'
      +'<span style="font-size:10px;color:rgba('+c+',.5);margin-left:auto;">'+g.cam+'</span></div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;padding-left:26px;">'
      +'📏 카메라와 <b style="color:#fff;">'+g.dist+'</b> 거리 유지<br>'
      +g.tips.map(function(t){return '• '+t;}).join('<br>')
      +'</div></div>';
  }).join('');

  var pop = document.createElement('div');
  pop.id = 'c24-disease-guide-pop';
  pop.style.cssText = 'position:fixed;inset:0;z-index:19000;background:rgba(2,8,23,.92);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;';

  pop.innerHTML =
    '<div style="width:100%;max-width:480px;max-height:90vh;overflow-y:auto;background:linear-gradient(160deg,#0a1628,#0d1f3c);border-radius:20px 20px 0 0;border-top:2px solid rgba(212,168,67,.4);padding:20px 18px 32px;">'
    // 헤더
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">'
    +'<div style="font-size:15px;font-weight:900;color:#d4a843;">'+card.title+' 검사 안내</div>'
    +'<div style="font-size:11px;color:rgba(212,168,67,.6);">총 '+totalSec+'초</div></div>'
    // 단계 안내
    +stepsHtml
    // 공통 주의
    +'<div style="background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.2);border-radius:10px;padding:10px 14px;margin:10px 0 16px;">'
    +'<div style="font-size:11px;font-weight:800;color:#fbbf24;margin-bottom:4px;">'+_cK(8631,'⚠️ 공통 주의사항')+'</div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;">'
    +_cK(8632,'• 밝은 곳에서 측정할수록 정확도가 높아집니다')+'<br>'
    +(flow.total>1 ? '• 단계가 끝나면 자동으로 다음 단계로 넘어갑니다<br>' : '')
    +_cK(8635,'• 본 분석은 참고용이며 의학적 진단을 대체하지 않습니다')
    +'</div></div>'
    // 버튼
    +'<div style="display:flex;gap:10px;">'
    +'<button onclick="_c24DiseaseRealStart(\''+key+'\')" style="flex:3;padding:15px;background:linear-gradient(135deg,rgba(212,168,67,.3),rgba(248,113,113,.2));border:2px solid rgba(212,168,67,.7);border-radius:14px;color:#d4a843;font-size:15px;font-weight:900;cursor:pointer;">✅ 이해했습니다 — 측정 시작</button>'
    +'<button onclick="document.getElementById(\'c24-disease-guide-pop\').remove()" style="flex:1;padding:15px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:14px;color:rgba(240,230,200,.5);font-size:13px;cursor:pointer;">'+_cK(8637,'나중에')+'</button>'
    +'</div></div>';

  document.body.appendChild(pop);
};

function _c24CompStart(){
  try{var _pa0=document.getElementById('page-algo');if(_pa0)_pa0.classList.remove('c24-scanning');}catch(e){}
  // ★ FIX: page-algo가 모달 모드 — 자동으로 모달 열기 (어느 페이지에서든 호출 가능)
  var algoModal = document.getElementById('page-algo');
  if(algoModal && algoModal.getAttribute('data-modal-mode')==='1'){
    algoModal.style.display = 'block';
    algoModal.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }
  // 이미 팝업 있으면 제거
  var old = document.getElementById('c24-scan-guide-pop');
  if(old) old.remove();

  var pop = document.createElement('div');
  pop.id = 'c24-scan-guide-pop';
  pop.style.cssText = 'position:fixed;inset:0;z-index:19000;background:rgba(2,8,23,.92);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;padding:0;';

  pop.innerHTML =
    '<div style="width:100%;max-width:480px;max-height:92vh;overflow-y:auto;background:linear-gradient(160deg,#0a1628,#0d1f3c);border-radius:20px 20px 0 0;border-top:2px solid rgba(52,211,153,.4);padding:20px 18px 32px;">'
    // 헤더
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">'
    +'<div style="font-size:15px;font-weight:900;color:#34d399;">'+_cK(8680,'🔬 C-24 종합 건강 스캔 안내')+'</div>'
    +'<div style="font-size:11px;color:rgba(52,211,153,.6);">'+_cK(8681,'총 2분 40초')+'</div></div>'

    // 478 호흡법 설명
    +'<div style="background:rgba(56,189,248,.08);border:1px solid rgba(56,189,248,.25);border-radius:12px;padding:12px 14px;margin-bottom:14px;">'
    +'<div style="font-size:12px;font-weight:800;color:#38bdf8;margin-bottom:6px;">'+_cK(8602,'🫁 4-7-8 호흡법이란?')+'</div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.85);line-height:1.9;">'
    +_cK(8603,'마음을 안정시켜 측정 정확도를 높이는 호흡법입니다.')+'<br>'
    +_cK(8604,'<b style="color:#38bdf8;">① 코로 4초 들이쉬기</b> → <b style="color:#fbbf24;">② 7초 숨 멈추기</b> → <b style="color:#34d399;">③ 입으로 8초 내쉬기</b>')+'<br>'
    +_cK(8605,'얼굴 측정 시작 후 화면 아래 타임라인을 따라 한 번만 진행합니다.')
    +'</div></div>'

    // 6단계 안내
    +'<div style="font-size:11px;font-weight:800;color:rgba(240,230,200,.6);margin-bottom:8px;letter-spacing:.05em;">'+_cK(8606,'📋 측정 순서 및 방법')+'</div>'
    +'<div style="display:flex;flex-direction:column;gap:7px;margin-bottom:16px;">'

    // 1단계 얼굴
    +'<div style="background:rgba(56,189,248,.07);border:1px solid rgba(56,189,248,.2);border-radius:10px;padding:10px 12px;">'
    +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">'
    +'<span style="font-size:18px;">👤</span>'
    +'<span style="font-size:12px;font-weight:800;color:#38bdf8;">'+_cK(8607,'얼굴 — 60초')+'</span>'
    +'<span style="font-size:10px;color:rgba(56,189,248,.5);margin-left:auto;">'+_cK(8608,'📱 전면 카메라')+'</span></div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.8;padding-left:26px;">'
    +_cK(8609,'카메라와 <b style="color:#fff;">30~40cm</b> 거리 유지')+'<br>'
    +_cK(8610,'밝은 정면 조명 · 안경·모자 제거 · 무표정 유지')+'<br>'
    +'<span style="color:#38bdf8;">'+_cK(8611,'화면 하단 호흡 타임라인을 따라 4-7-8 호흡 1회')+'</span></div></div>'

    // 2단계 혀
    +'<div style="background:rgba(248,113,113,.07);border:1px solid rgba(248,113,113,.2);border-radius:10px;padding:10px 12px;">'
    +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">'
    +'<span style="font-size:18px;">👅</span>'
    +'<span style="font-size:12px;font-weight:800;color:#f87171;">'+_cK(8612,'혀 — 20초')+'</span>'
    +'<span style="font-size:10px;color:rgba(248,113,113,.5);margin-left:auto;">'+_cK(8608,'📱 전면 카메라')+'</span></div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.8;padding-left:26px;">'
    +_cK(8613,'카메라와 <b style="color:#fff;">15~20cm</b> 거리 유지')+'<br>'
    +_cK(8614,'혀를 최대한 내밀어 혀 전체가 보이도록')+'<br>'
    +'<span style="color:#fbbf24;">'+_cK(8615,'식사 30분 후 측정 권장')+'</span></div></div>'

    // 3단계 눈
    +'<div style="background:rgba(56,189,248,.07);border:1px solid rgba(56,189,248,.2);border-radius:10px;padding:10px 12px;">'
    +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">'
    +'<span style="font-size:18px;">👁️</span>'
    +'<span style="font-size:12px;font-weight:800;color:#38bdf8;">'+_cK(8616,'눈 — 20초')+'</span>'
    +'<span style="font-size:10px;color:rgba(56,189,248,.5);margin-left:auto;">'+_cK(8608,'📱 전면 카메라')+'</span></div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.8;padding-left:26px;">'
    +_cK(8613,'카메라와 <b style="color:#fff;">15~20cm</b> 거리 유지')+'<br>'
    +_cK(8617,'위를 약간 봐서 흰자가 잘 보이게')+'<br>'
    +'<span style="color:#fbbf24;">'+_cK(8618,'콘택트렌즈 제거 권장')+'</span></div></div>'

    // 4단계 피부
    +'<div style="background:rgba(244,114,182,.07);border:1px solid rgba(244,114,182,.2);border-radius:10px;padding:10px 12px;">'
    +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">'
    +'<span style="font-size:18px;">🎨</span>'
    +'<span style="font-size:12px;font-weight:800;color:#f472b6;">'+_cK(8619,'피부 — 30초')+'</span>'
    +'<span style="font-size:10px;color:rgba(244,114,182,.5);margin-left:auto;">'+_cK(8608,'📱 전면 카메라')+'</span></div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.8;padding-left:26px;">'
    +_cK(8620,'카메라와 <b style="color:#fff;">10~15cm</b> 거리 유지')+'<br>'
    +_cK(8621,'이마 또는 뺨 맨피부를 카메라에 가까이')+'<br>'
    +'<span style="color:#fbbf24;">'+_cK(8622,'크림·화장 없는 상태 권장')+'</span></div></div>'

    // 5단계 손등
    +'<div style="background:rgba(52,211,153,.07);border:1px solid rgba(52,211,153,.2);border-radius:10px;padding:10px 12px;">'
    +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">'
    +'<span style="font-size:18px;">🤚</span>'
    +'<span style="font-size:12px;font-weight:800;color:#34d399;">'+_cK(8623,'손등 — 15초')+'</span>'
    +'<span style="font-size:10px;color:rgba(52,211,153,.5);margin-left:auto;">'+_cK(8624,'📷 후면 카메라')+'</span></div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.8;padding-left:26px;">'
    +_cK(8625,'카메라와 <b style="color:#fff;">20~25cm</b> 거리 유지')+'<br>'
    +_cK(8626,'손톱이 잘 보이도록 손등을 카메라 정면으로')+'<br>'
    +'<span style="color:#fbbf24;">'+_cK(8627,'매니큐어 제거 권장')+'</span></div></div>'

    // 6단계 손바닥
    +'<div style="background:rgba(52,211,153,.07);border:1px solid rgba(52,211,153,.2);border-radius:10px;padding:10px 12px;">'
    +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">'
    +'<span style="font-size:18px;">✋</span>'
    +'<span style="font-size:12px;font-weight:800;color:#34d399;">'+_cK(8628,'손바닥 — 15초')+'</span>'
    +'<span style="font-size:10px;color:rgba(52,211,153,.5);margin-left:auto;">'+_cK(8624,'📷 후면 카메라')+'</span></div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.8;padding-left:26px;">'
    +_cK(8625,'카메라와 <b style="color:#fff;">20~25cm</b> 거리 유지')+'<br>'
    +_cK(8629,'손바닥을 평평하게 펼쳐 카메라 정면으로')+'<br>'
    +_cK(8630,'손금이 잘 보이도록 조명 확인')+'</div></div>'
    +'</div>'

    // 공통 주의사항
    +'<div style="background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.2);border-radius:10px;padding:10px 14px;margin-bottom:18px;">'
    +'<div style="font-size:11px;font-weight:800;color:#fbbf24;margin-bottom:5px;">'+_cK(8631,'⚠️ 공통 주의사항')+'</div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;">'
    +_cK(8632,'• 밝은 곳에서 측정할수록 정확도가 높아집니다')+'<br>'
    +_cK(8633,'• 각 단계는 자동으로 순서대로 진행됩니다')+'<br>'
    +_cK(8634,'• 측정 중 흔들리면 해당 단계가 다시 시작됩니다')+'<br>'
    +_cK(8635,'• 본 분석은 참고용이며 의학적 진단을 대체하지 않습니다')
    +'</div></div>'

    // 버튼
    +'<div style="display:flex;gap:10px;">'
    +'<button onclick="_c24CompStartReal()" style="flex:3;padding:15px;background:linear-gradient(135deg,rgba(52,211,153,.3),rgba(56,189,248,.2));border:2px solid rgba(52,211,153,.7);border-radius:14px;color:#34d399;font-size:15px;font-weight:900;cursor:pointer;letter-spacing:.03em;">'+_cK(8636,'✅ 이해했습니다 — 스캔 시작')+'</button>'
    +'<button onclick="document.getElementById(\'c24-scan-guide-pop\').remove()" style="flex:1;padding:15px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:14px;color:rgba(240,230,200,.5);font-size:13px;cursor:pointer;">'+_cK(8637,'나중에')+'</button>'
    +'</div>'
    +'</div>';

  document.body.appendChild(pop);
};

function _c24Stop(){
  try{var _pR=document.getElementById('page-algo');if(_pR)_pR.classList.remove('c24-scanning');}catch(e){}
  _c24Finish();
};

/* ══ 6부위 측정 흐름 ══ */
var _c24BreathTimer = null;
var _c24BreathElapsed = 0;
var _c24BreathPhase = 0;
var _c24BreathPhaseTime = [4, 7, 8];
var _c24BreathColors = ['#38bdf8', '#fbbf24', '#34d399'];
var _c24BreathTexts = ['🫁 들이쉬기', '⏸ 멈추기', '💨 내쉬기'];
var _c24r = window._c24||{}, _bsr=window.BS||{};
var _c24d = window._c24||{};
var _c24r = window._c24||{};

function _c24ChimeDone(){
  try{
    var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
    _c24._ac=_c24._ac||new AC(); var ac=_c24._ac;
    if(ac.state==='suspended'){ try{ac.resume();}catch(e){} }
    [[523.25,0],[659.25,0.13],[783.99,0.26],[1046.5,0.40]].forEach(function(n){
      var o=ac.createOscillator(), g=ac.createGain();
      o.type='sine'; o.frequency.value=n[0]; o.connect(g); g.connect(ac.destination);
      var t=ac.currentTime+n[1];
      g.gain.setValueAtTime(0.0001,t);
      g.gain.linearRampToValueAtTime(0.25,t+0.02);
      g.gain.exponentialRampToValueAtTime(0.0008,t+0.30);
      o.start(t); o.stop(t+0.32);
    });
  }catch(e){}
};

function _c24CompShowResult(ai){
  var loading=document.getElementById('c24-comp-loading');
  if(loading) loading.remove();

  var sec=document.getElementById('c24-result-section');
  if(!sec) return;

  var gradeC={A:'#34d399',B:'#fbbf24',C:'#f87171',D:'#ef4444'}[ai.종합등급||'B']||'#fbbf24';
  var s=_c24CompState;

  var div=document.createElement('div');
  div.style.cssText='margin-top:8px;';
  div.innerHTML=
    // 헤더
    '<div style="text-align:center;padding:16px;background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.3);border-radius:14px;margin-bottom:14px;">'
    +'<div style="font-size:11px;color:rgba(52,211,153,.6);margin-bottom:4px;">🔬 6부위 종합 건강 분석</div>'
    +'<div style="font-size:44px;font-weight:900;color:'+gradeC+';font-family:Orbitron,sans-serif;">'+(ai.종합점수||75)+'</div>'
    +'<div style="font-size:16px;font-weight:900;color:'+gradeC+';margin-top:4px;">'+( ai.종합등급||'B')+' 등급</div>'
    +'</div>'
    // 6부위 스냅샷
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:14px;">'
    +[['face','👤'],['tongue','👅'],['eye','👁️'],['skin','🎨'],['hand_back','🤚'],['hand_palm','✋']].map(function(x){
      return s.images[x[0]]
        ?'<div style="text-align:center;"><img src="data:image/jpeg;base64,'+s.images[x[0]]+'" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;border:1px solid rgba(52,211,153,.3);">'
        +'<div style="font-size:10px;color:rgba(52,211,153,.5);margin-top:2px;">'+x[1]+'</div></div>'
        :'';
    }).join('')+'</div>'
    // 핵심 발견
    +(ai.핵심발견?'<div style="padding:13px;background:rgba(0,0,0,.3);border-left:3px solid '+gradeC+';border-radius:0 12px 12px 0;margin-bottom:10px;">'
    +'<div style="font-size:10px;color:'+gradeC+';font-weight:700;margin-bottom:5px;">🔍 핵심 발견</div>'
    +'<div style="font-size:12px;color:rgba(240,230,200,.9);line-height:1.8;">'+ai.핵심발견+'</div></div>':'')
    // 각 진단 항목
    +['심장활력','소화기','순환계','신경계','오행_건강'].map(function(k){
      if(!ai[k]) return '';
      var ic={심장활력:'❤️',소화기:'🫃',순환계:'💗',신경계:'🧠',오행_건강:'☯️'};
      return '<div style="padding:12px;background:rgba(0,0,0,.2);border-left:3px solid rgba(52,211,153,.3);border-radius:0 10px 10px 0;margin-bottom:8px;">'
        +'<div style="font-size:10px;color:#34d399;font-weight:700;margin-bottom:4px;">'+(ic[k]||'•')+' '+k.replace('_',' ')+'</div>'
        +'<div style="font-size:12px;color:rgba(240,230,200,.85);line-height:1.8;">'+ai[k]+'</div></div>';
    }).join('')
    // 주의 신호
    +(ai.주의_신호&&ai.주의_신호!=='없음'?'<div style="padding:12px;background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.25);border-radius:12px;margin-bottom:10px;">'
    +'<div style="font-size:10px;color:#f87171;font-weight:700;margin-bottom:4px;">⚠️ 주의 신호</div>'
    +'<div style="font-size:12px;color:rgba(240,230,200,.85);line-height:1.8;">'+ai.주의_신호+'</div></div>':'')
    // 당장 조언
    +(ai.당장_조언?'<div style="padding:13px;background:rgba(251,191,36,.08);border:1px solid rgba(251,191,36,.25);border-radius:12px;margin-bottom:10px;">'
    +'<div style="font-size:10px;color:#fbbf24;font-weight:700;margin-bottom:4px;">💡 오늘 당장 실천</div>'
    +'<div style="font-size:12px;color:rgba(240,230,200,.85);line-height:1.8;">'+ai.당장_조언+'</div></div>':'')
    // 식이 처방
    +(ai.식이_가이드?'<div style="padding:13px;background:rgba(52,211,153,.06);border:1px solid rgba(52,211,153,.2);border-radius:12px;margin-bottom:10px;">'
    +'<div style="font-size:10px;color:#34d399;font-weight:700;margin-bottom:4px;">🥗 오행 식이 가이드</div>'
    +'<div style="font-size:12px;color:rgba(240,230,200,.85);line-height:1.8;">'+ai.식이_가이드+'</div></div>':'')
    +'<div style="text-align:center;font-size:10px;color:rgba(255,255,255,.15);margin-top:8px;">CGO-FULI 6부위 종합 건강 분석</div>';

  sec.insertBefore(div, sec.firstChild);
  div.scrollIntoView({behavior:'smooth'});
};

function _c24DiseaseRealStart(key){
  var pop = document.getElementById('c24-disease-guide-pop');
  if(pop) pop.remove();

  _c24DiseaseClose();
  var flow = _c24DiseaseFlow[key];
  if(!flow) return;

  _c24DiseaseState.key = key;
  _c24DiseaseState.stepIdx = 0;
  _c24DiseaseState.results = [];
  _c24DiseaseState.active = true;

  _c24UpdateBanner();

  var cam = document.getElementById('c24-disease-banner');
  if(cam) cam.scrollIntoView({behavior:'smooth', block:'center'});
  setTimeout(function(){
    _c24SetMode(flow.steps[0]);
    _c24.TOTAL = flow.times ? flow.times[0] : 60;
    setTimeout(function(){ _c24Start(); }, 600);
  }, 800);
};

function _c24StartDisease(key){
  var flow = _c24DiseaseFlow[key];
  var card = _c24Cards[key];
  if(!flow||!card) return;

  // 기존 팝업 제거
  var old = document.getElementById('c24-disease-guide-pop');
  if(old) old.remove();

  // 단계별 안내 생성
  var stepColors = {face:'56,189,248', tongue:'248,113,113', eye:'52,211,153', skin:'244,114,182', hand:'251,191,36', hand_back:'251,191,36', hand_palm:'251,191,36'};
  var stepGuides = {
    face:  {ico:'👤', name:'얼굴', cam:_cK(8608,'📱 전면 카메라'), dist:'30~40cm', tips:['밝은 정면 조명', '안경·모자 제거', '무표정으로 정면 응시']},
    tongue:{ico:'👅', name:'혀',   cam:_cK(8608,'📱 전면 카메라'), dist:'15~20cm', tips:['혀를 최대한 내밀기', '혀 전체가 화면에 보이도록', '식사 30분 후 권장']},
    eye:   {ico:'👁️', name:'눈',   cam:_cK(8608,'📱 전면 카메라'), dist:'15~20cm', tips:['위를 약간 봐서 흰자 노출', '렌즈 제거 권장', '눈을 크게 뜨기']},
    skin:  {ico:'🎨', name:'피부', cam:_cK(8608,'📱 전면 카메라'), dist:'10~15cm', tips:['맨 피부 상태 권장', '크림·화장 없이', '자연광 또는 백색등']},
    hand:  {ico:'✋', name:'손',   cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손가락 가지런히 펴기', _cK(8627,'매니큐어 제거 권장'), '손 흔들지 않기']},
    hand_back: {ico:'🤚', name:'손등', cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손톱 잘 보이게', _cK(8627,'매니큐어 제거 권장'), '손 흔들지 않기']},
    hand_palm: {ico:'✋', name:'손바닥', cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손바닥 평평하게 펼치기', '손금이 보이도록', '손 흔들지 않기']}
  };

  var totalSec = (flow.times||[]).reduce(function(a,b){return a+b;},0);
  var stepsHtml = flow.steps.map(function(s,i){
    var g = stepGuides[s]||stepGuides['face'];
    var c = stepColors[s]||'56,189,248';
    var t = flow.times?flow.times[i]:60;
    return '<div style="background:rgba('+c+',.07);border:1px solid rgba('+c+',.25);border-radius:10px;padding:10px 12px;margin-bottom:8px;">'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">'
      +'<span style="font-size:18px;">'+g.ico+'</span>'
      +'<span style="font-size:12px;font-weight:800;color:rgba('+c+',1);">'+(i+1)+'단계 · '+g.name+' — '+t+'초</span>'
      +'<span style="font-size:10px;color:rgba('+c+',.5);margin-left:auto;">'+g.cam+'</span></div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;padding-left:26px;">'
      +'📏 카메라와 <b style="color:#fff;">'+g.dist+'</b> 거리 유지<br>'
      +g.tips.map(function(t){return '• '+t;}).join('<br>')
      +'</div></div>';
  }).join('');

  var pop = document.createElement('div');
  pop.id = 'c24-disease-guide-pop';
  pop.style.cssText = 'position:fixed;inset:0;z-index:19000;background:rgba(2,8,23,.92);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;';

  pop.innerHTML =
    '<div style="width:100%;max-width:480px;max-height:90vh;overflow-y:auto;background:linear-gradient(160deg,#0a1628,#0d1f3c);border-radius:20px 20px 0 0;border-top:2px solid rgba(212,168,67,.4);padding:20px 18px 32px;">'
    // 헤더
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">'
    +'<div style="font-size:15px;font-weight:900;color:#d4a843;">'+card.title+' 검사 안내</div>'
    +'<div style="font-size:11px;color:rgba(212,168,67,.6);">총 '+totalSec+'초</div></div>'
    // 단계 안내
    +stepsHtml
    // 공통 주의
    +'<div style="background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.2);border-radius:10px;padding:10px 14px;margin:10px 0 16px;">'
    +'<div style="font-size:11px;font-weight:800;color:#fbbf24;margin-bottom:4px;">'+_cK(8631,'⚠️ 공통 주의사항')+'</div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;">'
    +_cK(8632,'• 밝은 곳에서 측정할수록 정확도가 높아집니다')+'<br>'
    +(flow.total>1 ? '• 단계가 끝나면 자동으로 다음 단계로 넘어갑니다<br>' : '')
    +_cK(8635,'• 본 분석은 참고용이며 의학적 진단을 대체하지 않습니다')
    +'</div></div>'
    // 버튼
    +'<div style="display:flex;gap:10px;">'
    +'<button onclick="_c24DiseaseRealStart(\''+key+'\')" style="flex:3;padding:15px;background:linear-gradient(135deg,rgba(212,168,67,.3),rgba(248,113,113,.2));border:2px solid rgba(212,168,67,.7);border-radius:14px;color:#d4a843;font-size:15px;font-weight:900;cursor:pointer;">✅ 이해했습니다 — 측정 시작</button>'
    +'<button onclick="document.getElementById(\'c24-disease-guide-pop\').remove()" style="flex:1;padding:15px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:14px;color:rgba(240,230,200,.5);font-size:13px;cursor:pointer;">'+_cK(8637,'나중에')+'</button>'
    +'</div></div>';

  document.body.appendChild(pop);
};

function _c24CompFinalAnalyze(){
  try{var _pR=document.getElementById('page-algo');if(_pR)_pR.classList.remove('c24-scanning');}catch(e){}
  try{ if(typeof _c24ChimeDone==='function') _c24ChimeDone(); }catch(e){} // 완료 차임 (B-2b)
  // C-60: 모든 사진(손바닥 포함) 캡처 완료 후 5카드 재동기화 — 손바닥 빈칸 버그 수정
  try{ if(typeof hltSyncBioCards==='function') hltSyncBioCards(); }catch(e){}
  var s = _c24CompState;
  var r = window.calcResult||{};
  var oh = r.domOh||'토';
  var name = r.name||'사용자';
  var ohK = {목:'木',화:'火',토:'土',금:'金',수:'水'};

  // 유도 버튼 제거
  var old = document.getElementById('c24-comp-next');
  if(old) old.remove();

  // 결과 섹션에 로딩 추가
  var sec = document.getElementById('c24-result-section');
  if(sec){
    var loading = document.createElement('div');
    loading.id = 'c24-comp-loading';
    loading.style.cssText = 'padding:20px;text-align:center;';
    loading.innerHTML =
      '<div style="font-size:36px;animation:spin 1s linear infinite;">🔬</div>'
      +'<div style="color:#34d399;font-size:13px;font-weight:700;margin-top:12px;">✨ C-24가 6부위 종합 건강 분석 중...</div>'
      +'<div style="font-size:11px;color:rgba(52,211,153,.5);margin-top:4px;">얼굴·손등·손바닥·혀 통합 스캔</div>';
    sec.insertBefore(loading, sec.firstChild);
  }

  // 각 이미지 Vision AI 분석
  var analyses = {};

  var _analyzeImg = function(b64, prompt, key){
    if(!b64) return Promise.resolve('');
    return fetch('/api/groq',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'meta-llama/llama-4-scout-17b-16e-instruct',
        messages:[{role:'user',content:[
          {type:'image_url',image_url:{url:'data:image/jpeg;base64,'+b64}},
          {type:'text',text:prompt}
        ]}],max_tokens:300,temperature:0.3})})
    .then(function(r2){return r2.json();})
    .then(function(d){
      var t=(d.choices&&d.choices[0]&&d.choices[0].message&&d.choices[0].message.content)||'';
      return t.replace(/```json|```/g,'').trim();
    }).catch(function(){return '';});
  };

  Promise.all([
    _analyzeImg(s.images.face,
      '이 얼굴 사진의 색조를 관찰. JSON만(코드블록없이):\n{"안색":"밝음/붉은톤/노란톤/보통","부기":"있음/없음","다크서클":"있음/없음","생기":"밝음/중간/어두움","특이사항":"눈에 띄는 특징"}','face'),
    _analyzeImg(s.images.tongue,
      '이 혀 사진을 관찰. JSON만(코드블록없이):\n{"설색":"담홍/홍/암홍/창백/청자","설태":"백태/황태/흑태/없음","설형":"정상/치흔/균열/점","혀크기":"정상/크고두꺼움/작고얇음"}','tongue'),
    _analyzeImg(s.images.eye,
      '이 눈 사진의 색조를 관찰. JSON만(코드블록없이):\n{"눈가톤":"맑음/흐림/노란톤/붉은톤","흰자톤":"맑음/노란톤/붉은톤","눈꺼풀":"보통/부음/처짐","특이사항":"눈에 띄는 특징"}','eye'),
    _analyzeImg(s.images.skin,
      '이 피부 사진의 색조를 관찰. JSON만(코드블록없이):\n{"피부톤":"밝음/옅음/노란톤/붉은톤/어두운톤","탄력":"좋음/보통/저하","건조도":"보통/건조/지성","트러블":"없음/있음","특이사항":"눈에 띄는 특징"}','skin'),
    _analyzeImg(s.images.hand_back,
      '이 손등 사진의 색조를 관찰. JSON만(코드블록없이):\n{"손톱톤":"옅음/분홍/어두움/노란톤/보통","혈관":"선명/보통/약함","손등톤":"보통/옅음/붉은톤/노란톤","특이사항":"눈에 띄는 특징"}','hand_back'),
    _analyzeImg(s.images.hand_palm,
      '이 손바닥 사진을 관찰. JSON만(코드블록없이):\n{"손바닥톤":"보통/옅음/붉은톤/노란톤/어두운톤","생명선":"길고깊음/보통/짧음/사슬","감정선":"선명/보통/끊김","두뇌선":"선명/보통/끊김","손바닥두께":"두꺼움/보통/얇음"}','hand_palm')
  ]).then(function(results){
    var _parse = function(t){ try{var m=t.match(/\{[\s\S]*\}/);return m?JSON.parse(m[0]):{};} catch(e){return {};} };
    var face=_parse(results[0]);
    var tongue=_parse(results[1]);
    var eye=_parse(results[2]);
    var skin=_parse(results[3]);
    var hBack=_parse(results[4]);
    var hPalm=_parse(results[5]);
    var breath=s.breathData;

    // 통합 AI 분석
    var sysPrompt = '당신은 공개된 한의학·의학 문헌을 학습한 건강 정보 도우미 AI입니다. 의료인이 아니며 진단·처방을 하지 않습니다. '
      +'실측 데이터만 근거로 현실적·구체적으로 분석하세요. JSON만 반환. 코드블록 금지. '
      +'반드시 100% 순수한 한국어로만 작성하세요. furthermore, however, additionally 등 영어 단어 절대 사용 금지.';

    var userPrompt = '분석 대상: '+name+'님 | 오행('+oh+'·'+ohK[oh]+')\n'
      +'rPPG 실측: BPM='+_c24.bpm+' HRV='+_c24.hrv+' FCI='+_c24.fci+'%\n'
      +'478호흡: 완료사이클='+breath.cycles+'회\n'
      +'얼굴 관찰: '+JSON.stringify(face)+'\n'
      +'혀 관찰: '+JSON.stringify(tongue)+'\n'
      +'눈 관찰: '+JSON.stringify(eye)+'\n'
      +'피부 관찰: '+JSON.stringify(skin)+'\n'
      +'손등 관찰: '+JSON.stringify(hBack)+'\n'
      +'손바닥 관찰: '+JSON.stringify(hPalm)+'\n\n'
      +'아래 JSON으로 반환:\n'
      +'{"종합등급":"A(매우건강)/B(양호)/C(주의)/D(관리필요) 중 하나",'
      +'"종합점수":점수(40~98),'
      +'"핵심발견":"6부위에서 발견한 가장 중요한 건강 신호. 실제 관찰 특징 언급. 3문장",'
      +'"심장활력":"얼굴안색+손톱색+rPPG BPM으로 본 심장 활력 상태. 3문장",'
      +'"소화기":"손바닥색+혀설태+설색으로 본 소화기(비위) 상태. 3문장",'
      +'"순환계":"손톱색+손등혈관+얼굴혈색으로 본 혈액순환. 3문장",'
      +'"신경계":"내면 탄력성 활력도='+(_c24.hrv>=60?'우수':_c24.hrv>=40?'양호':_c24.hrv>=20?'보통':'관리 권장')+'+안색+혀균열+478호흡('+breath.cycles+'사이클)로 본 내면 탄력성. 3문장",'
      +'"눈_건강":"눈빛 톤 관찰로 본 눈 컨디션. 3문장",'
      +'"피부_건강":"피부색+탄력+건조도로 본 피부 및 전신 건강 상태. 3문장",'
      +'"오행_건강":"오행('+oh+') 기준 현재 기운의 흐름. 어떤 부분을 돌보면 좋은지. 3문장",'
      +'"당장_조언":"오늘 당장 실천해야 할 건강 행동 3가지. 구체적으로.",'
      +'"주의_신호":"6부위에서 관찰된 컨디션 참고 사항. 없으면 없음. 2문장",'
      +'"식이_가이드":"오행('+oh+') 기준 지금 당장 먹어야 할 것과 피해야 할 것. 3문장"}';

    return fetch('/api/groq',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'openai/gpt-oss-20b',reasoning_effort:'low',include_reasoning:false,
        messages:[{role:'system',content:sysPrompt},{role:'user',content:userPrompt}],
        max_tokens:2500,temperature:0.6})});
  })
  .then(function(r3){return r3.json();})
  .then(function(d3){
    var t=(d3.choices&&d3.choices[0]&&d3.choices[0].message&&d3.choices[0].message.content)||'{}';
    var m=t.replace(/```json|```/g,'').trim().match(/\{[\s\S]*\}/);
    var ai=m?JSON.parse(m[0]):{};
    _c24CompShowResult(ai);
  })
  .catch(function(){ _c24CompShowResult({핵심발견:'분석 중 오류가 발생했습니다. 다시 시도해 주세요.'}); });
};

function _c24UpdateBanner(){
  var st = _c24DiseaseState;
  if(!st.active||!st.key) return;
  var flow = _c24DiseaseFlow[st.key];
  var card = _c24Cards[st.key];
  var banner = document.getElementById('c24-disease-banner');
  var btitle = document.getElementById('c24-banner-title');
  var bstep  = document.getElementById('c24-banner-step');
  var bguide = document.getElementById('c24-banner-guide');
  var bprog  = document.getElementById('c24-banner-prog');
  if(!banner) return;
  banner.style.display='block';
  if(btitle) btitle.textContent = _cgoT(card.title).replace(/[💓🩸🦋🫀🍬🧠🫁👅😴🧬]/u,'').trim()+' '+_cgoT('검사 중');
  if(bstep)  bstep.textContent = flow.total>1 ? (st.stepIdx+1)+'/'+flow.total+' 단계' : '단일 검사';
  if(bguide){
    var modeNames={face:'👤 얼굴을 카메라 정면 30~50cm에 맞춰 주세요',tongue:'👅 혀를 최대한 내밀어 카메라에 가까이 대 주세요',hand:'✋ 손바닥을 펴서 후면 카메라 앞 20~30cm에 대 주세요',eye:'👁️ 눈 흰자가 잘 보이도록 위를 약간 보며 카메라 가까이 대 주세요',skin:'🎨 측정할 피부 부위를 카메라 10~20cm 앞에 대 주세요'};
    bguide.textContent = (modeNames[flow.steps[st.stepIdx]]||'') + ' — '+(flow.times?flow.times[st.stepIdx]:90)+'초간 고정해 주세요';
  }
  if(bprog) bprog.style.width = ((st.stepIdx/flow.total)*100)+'%';
};

function _c24SetMode(mode){
  _c24.mode = mode;
  ['face','tongue','hand','eye','skin'].forEach(function(m){
    var btn = document.getElementById('c24-btn-'+m);
    if(!btn) return;
    if(m===mode){
      btn.style.background='rgba(56,189,248,.2)';
      btn.style.border='1px solid rgba(56,189,248,.6)';
      btn.style.color='#38bdf8';
      btn.style.fontWeight='700';
    } else {
      btn.style.background='rgba(255,255,255,.04)';
      btn.style.border='1px solid rgba(255,255,255,.1)';
      btn.style.color='rgba(240,230,200,.6)';
      btn.style.fontWeight='400';
    }
  });
  // 손 모드는 후면 카메라
  var v = document.getElementById('c24-video');
  if(v) v.style.transform = (mode==='hand') ? 'scaleX(1)' : 'scaleX(-1)';
};

function _c24StartDisease(key){
  var flow = _c24DiseaseFlow[key];
  var card = _c24Cards[key];
  if(!flow||!card) return;

  // 기존 팝업 제거
  var old = document.getElementById('c24-disease-guide-pop');
  if(old) old.remove();

  // 단계별 안내 생성
  var stepColors = {face:'56,189,248', tongue:'248,113,113', eye:'52,211,153', skin:'244,114,182', hand:'251,191,36', hand_back:'251,191,36', hand_palm:'251,191,36'};
  var stepGuides = {
    face:  {ico:'👤', name:'얼굴', cam:_cK(8608,'📱 전면 카메라'), dist:'30~40cm', tips:['밝은 정면 조명', '안경·모자 제거', '무표정으로 정면 응시']},
    tongue:{ico:'👅', name:'혀',   cam:_cK(8608,'📱 전면 카메라'), dist:'15~20cm', tips:['혀를 최대한 내밀기', '혀 전체가 화면에 보이도록', '식사 30분 후 권장']},
    eye:   {ico:'👁️', name:'눈',   cam:_cK(8608,'📱 전면 카메라'), dist:'15~20cm', tips:['위를 약간 봐서 흰자 노출', '렌즈 제거 권장', '눈을 크게 뜨기']},
    skin:  {ico:'🎨', name:'피부', cam:_cK(8608,'📱 전면 카메라'), dist:'10~15cm', tips:['맨 피부 상태 권장', '크림·화장 없이', '자연광 또는 백색등']},
    hand:  {ico:'✋', name:'손',   cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손가락 가지런히 펴기', _cK(8627,'매니큐어 제거 권장'), '손 흔들지 않기']},
    hand_back: {ico:'🤚', name:'손등', cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손톱 잘 보이게', _cK(8627,'매니큐어 제거 권장'), '손 흔들지 않기']},
    hand_palm: {ico:'✋', name:'손바닥', cam:_cK(8624,'📷 후면 카메라'), dist:'20~25cm', tips:['손바닥 평평하게 펼치기', '손금이 보이도록', '손 흔들지 않기']}
  };

  var totalSec = (flow.times||[]).reduce(function(a,b){return a+b;},0);
  var stepsHtml = flow.steps.map(function(s,i){
    var g = stepGuides[s]||stepGuides['face'];
    var c = stepColors[s]||'56,189,248';
    var t = flow.times?flow.times[i]:60;
    return '<div style="background:rgba('+c+',.07);border:1px solid rgba('+c+',.25);border-radius:10px;padding:10px 12px;margin-bottom:8px;">'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">'
      +'<span style="font-size:18px;">'+g.ico+'</span>'
      +'<span style="font-size:12px;font-weight:800;color:rgba('+c+',1);">'+(i+1)+'단계 · '+g.name+' — '+t+'초</span>'
      +'<span style="font-size:10px;color:rgba('+c+',.5);margin-left:auto;">'+g.cam+'</span></div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;padding-left:26px;">'
      +'📏 카메라와 <b style="color:#fff;">'+g.dist+'</b> 거리 유지<br>'
      +g.tips.map(function(t){return '• '+t;}).join('<br>')
      +'</div></div>';
  }).join('');

  var pop = document.createElement('div');
  pop.id = 'c24-disease-guide-pop';
  pop.style.cssText = 'position:fixed;inset:0;z-index:19000;background:rgba(2,8,23,.92);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;';

  pop.innerHTML =
    '<div style="width:100%;max-width:480px;max-height:90vh;overflow-y:auto;background:linear-gradient(160deg,#0a1628,#0d1f3c);border-radius:20px 20px 0 0;border-top:2px solid rgba(212,168,67,.4);padding:20px 18px 32px;">'
    // 헤더
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">'
    +'<div style="font-size:15px;font-weight:900;color:#d4a843;">'+card.title+' 검사 안내</div>'
    +'<div style="font-size:11px;color:rgba(212,168,67,.6);">총 '+totalSec+'초</div></div>'
    // 단계 안내
    +stepsHtml
    // 공통 주의
    +'<div style="background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.2);border-radius:10px;padding:10px 14px;margin:10px 0 16px;">'
    +'<div style="font-size:11px;font-weight:800;color:#fbbf24;margin-bottom:4px;">'+_cK(8631,'⚠️ 공통 주의사항')+'</div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,.8);line-height:1.9;">'
    +_cK(8632,'• 밝은 곳에서 측정할수록 정확도가 높아집니다')+'<br>'
    +(flow.total>1 ? '• 단계가 끝나면 자동으로 다음 단계로 넘어갑니다<br>' : '')
    +_cK(8635,'• 본 분석은 참고용이며 의학적 진단을 대체하지 않습니다')
    +'</div></div>'
    // 버튼
    +'<div style="display:flex;gap:10px;">'
    +'<button onclick="_c24DiseaseRealStart(\''+key+'\')" style="flex:3;padding:15px;background:linear-gradient(135deg,rgba(212,168,67,.3),rgba(248,113,113,.2));border:2px solid rgba(212,168,67,.7);border-radius:14px;color:#d4a843;font-size:15px;font-weight:900;cursor:pointer;">✅ 이해했습니다 — 측정 시작</button>'
    +'<button onclick="document.getElementById(\'c24-disease-guide-pop\').remove()" style="flex:1;padding:15px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:14px;color:rgba(240,230,200,.5);font-size:13px;cursor:pointer;">'+_cK(8637,'나중에')+'</button>'
    +'</div></div>';

  document.body.appendChild(pop);
};

function _c24AppendMsg(role, text){
  var box=document.getElementById('c24-chat-msgs');
  if(!box) return;
  // 초기 안내 메시지 제거
  var intro=box.querySelector('[data-intro]');
  if(intro) intro.remove();

  var div=document.createElement('div');
  div.style.cssText=role==='user'?
    'align-self:flex-end;max-width:85%;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.25);border-radius:14px 14px 4px 14px;padding:10px 14px;font-size:12px;color:rgba(240,230,200,.9);line-height:1.7;':
    'align-self:flex-start;max-width:95%;background:rgba(212,168,67,.07);border:1px solid rgba(212,168,67,.2);border-radius:14px 14px 14px 4px;padding:12px 14px;font-size:12px;color:rgba(240,230,200,.9);line-height:1.85;';
  if(role==='ai') div.setAttribute('data-ai-last','1');
  div.innerHTML=(role==='user'?'<span style="font-size:10px;color:rgba(56,189,248,.7);display:block;margin-bottom:4px;">👤 나</span>':'<span style="font-size:10px;color:rgba(212,168,67,.7);display:block;margin-bottom:4px;">🤖 C-24 AI</span>')+text.replace(/\n/g,'<br>');
  box.appendChild(div);
  box.scrollTop=box.scrollHeight;
};

function _c24UpdateLastAI(text){
  var box=document.getElementById('c24-chat-msgs');
  if(!box) return;
  var last=box.querySelector('[data-ai-last]');
  if(last){
    last.innerHTML='<span style="font-size:10px;color:rgba(212,168,67,.7);display:block;margin-bottom:4px;">🤖 C-24 AI</span>'+text.replace(/\n/g,'<br>');
    last.removeAttribute('data-ai-last');
  }
  box.scrollTop=box.scrollHeight;
};

function _c24BreathTick(){
  if(_c24BreathTimer) clearInterval(_c24BreathTimer);
  var phaseLen = _c24BreathPhaseTime[_c24BreathPhase];
  var phaseElapsed = 0;
  var bar = document.getElementById('c24-breath-bar');
  var txt = document.getElementById('c24-breath-text');
  var cnt = document.getElementById('c24-breath-count');
  if(txt) { txt.textContent = _c24BreathTexts[_c24BreathPhase]; txt.style.color = _c24BreathColors[_c24BreathPhase]; }
  if(bar) bar.style.background = _c24BreathColors[_c24BreathPhase];

  _c24BreathTimer = setInterval(function(){
    phaseElapsed += 0.1;
    var pct = Math.min(100, (phaseElapsed / phaseLen) * 100);
    // 들이쉬기: 0→100, 멈추기: 100유지, 내쉬기: 100→0
    var barPct = _c24BreathPhase===0 ? pct : _c24BreathPhase===1 ? 100 : (100 - pct);
    if(bar) bar.style.width = barPct + '%';
    if(phaseElapsed >= phaseLen){
      clearInterval(_c24BreathTimer);
      _c24BreathPhase = (_c24BreathPhase + 1) % 3;
      if(_c24BreathPhase === 0){
        // ★ 1사이클 완료 → 멈추고 완료 메시지 표시
        _c24CompState.breathData.cycles = 1;
        if(txt){ txt.textContent = _cgoT('✅ 호흡 완료 — 편안하게 정면을 바라봐 주세요'); txt.style.color = '#34d399'; }
        if(bar){ bar.style.width = '100%'; bar.style.background = '#34d399'; }
        if(cnt){ cnt.textContent = _cgoT('1 사이클 완료'); }
        // 5초 후 오버레이 자연스럽게 사라짐
        setTimeout(function(){
          var ov = document.getElementById('c24-breath-overlay');
          if(ov){ ov.style.transition = 'opacity 1s'; ov.style.opacity = '0';
            setTimeout(function(){ if(ov) ov.style.display = 'none'; }, 1000); }
        }, 5000);
        return; // 반복 안 함
      }
      // 한 사이클 내 다음 페이즈 진행
      if(_c24.isRunning && _c24.mode==='face') _c24BreathTick();
      else _c24BreathStop();
    }
  }, 100);
};

function _c24CalcVitals(){
  var sig=_c24.chromSig; if(sig.length<60) return null;
  var peaks=[],minD=Math.round(_c24.sampleRate*0.2);
  for(var i=2;i<sig.length-2;i++){
    if(sig[i]>sig[i-1]&&sig[i]>sig[i-2]&&sig[i]>sig[i+1]&&sig[i]>sig[i+2]){
      if(!peaks.length||i-peaks[peaks.length-1]>=minD) peaks.push(i);
    }
  }
  if(peaks.length<3) return null;
  var rri=[];
  for(var j=1;j<peaks.length;j++){
    var dt=(peaks[j]-peaks[j-1])*(1000/_c24.sampleRate);
    if(dt>333&&dt<1500) rri.push(dt);
  }
  if(rri.length<2) return null;
  var meanRRI=rri.reduce(function(a,b){return a+b;},0)/rri.length;
  var bpm=Math.max(45,Math.min(140,Math.round(60000/meanRRI)));
  var ss=0; for(var k=1;k<rri.length;k++) ss+=Math.pow(rri[k]-rri[k-1],2);
  var hrv=Math.max(8,Math.min(80,Math.round(Math.sqrt(ss/(rri.length-1)))));
  return {bpm:bpm,hrv:hrv};
};

function _c24CalcFCI(){
  if(_c24.rawR.length<30) return 0;
  var buf=_c24.rawR.slice(-60);
  var m=buf.reduce(function(a,b){return a+b;},0)/buf.length;
  if(m<10) return 0;
  var mx=Math.max.apply(null,buf),mn=Math.min.apply(null,buf);
  var ac=(mx-mn)/m;
  return Math.round(Math.min(95,Math.max(40,
    ac<0.005?40:ac>0.06?95:40+(ac-0.005)/(0.06-0.005)*55)));
};

function _c24BreathStop(){
  if(_c24BreathTimer){ clearInterval(_c24BreathTimer); _c24BreathTimer=null; }
  var ov = document.getElementById('c24-breath-overlay');
  if(ov) ov.style.display = 'none';

  // ★ 1사이클 완료된 경우 — HRV 기반 호흡 점수 계산 후 연동
  if(_c24CompState.breathData.cycles >= 1){
    var hrv = _c24.hrv || 0;
    // 타이밍 기반 기저 52~60 + HRV 보너스 (기존 _breathCalcScore 타이밍 로직과 동일)
    var timingBase = 52 + Math.round((Date.now()%1000)/1000*8);
    var hrvBonus = hrv>60?4:hrv>45?2:0;
    var breathScore = Math.max(40, Math.min(85, timingBase + hrvBonus));
    window._lastBreathScore = breathScore;
    // 호흡 카드 즉시 동기화
    if(typeof hltSyncBioCards==='function'){
      setTimeout(function(){ hltSyncBioCards(); }, 400);
    }
  }
};

function _c24ShowResult(){
  var sec=document.getElementById('c24-result-section');
  if(sec) sec.style.display='block';

  // 수치 표시
  var bpmEl=document.getElementById('c24-res-bpm');
  var hrvEl=document.getElementById('c24-res-hrv');
  var fciEl=document.getElementById('c24-res-fci');
  var bpmLb=document.getElementById('c24-res-bpm-label');
  var hrvLb=document.getElementById('c24-res-hrv-label');
  var fciLb=document.getElementById('c24-res-fci-label');

  var bpm=_c24.bpm, hrv=_c24.hrv, fci=_c24.fci;

  if(bpmEl) bpmEl.textContent=bpm>0?bpm:'--';
  if(hrvEl) hrvEl.textContent=hrv>0?hrv:'--';
  if(fciEl) fciEl.textContent=fci>0?fci:'--';

  if(bpmLb) bpmLb.textContent=bpm<=0?'측정 불가':bpm<60?'느림':bpm>100?'빠름':'✅ 일반 범위';
  if(hrvLb) hrvLb.textContent=hrv<=0?'측정 불가':hrv<20?'관리 권장':hrv<40?'보통':hrv>=60?'✅ 우수':'✅ 양호';
  if(fciLb) fciLb.textContent=fci<=0?'측정 불가':fci<50?'낮은 편':fci>=75?'✅ 혈색 양호':'보통';

  // 컨디션 참고 안내 (질병 판정·진료과 안내 없음 — 웰니스)
  var tips=[];
  if(bpm>100) tips.push('💓 맥박 플로우: 빠름 — 잠시 쉬었다가 다시 측정해 보세요');
  if(bpm>0&&bpm<60) tips.push('💓 맥박 플로우: 느림 — 컨디션 참고 지표입니다');
  if(hrv>0&&hrv<20) tips.push('🧠 내면 탄력성: 관리가 필요한 구간 — 4-7-8 호흡과 충분한 휴식을 권해요');
  if(fci>0&&fci<50) tips.push('💗 혈색 지수: 낮은 편 — 수분 섭취와 가벼운 스트레칭을 권해요');
  if(bpm>90&&hrv<25) tips.push('🦋 맥박 빠름 + 내면 탄력성 활력도 낮음 — 휴식과 컨디션 관리를 권해요');
  if(tips.length===0&&bpm>0) tips.push('✅ 현재 측정값은 일반적인 참고 범위입니다 — AI 상담으로 더 자세히 확인하세요');
  if(bpm===0) tips.push('📷 측정값 부족 — 얼굴을 카메라 가까이 대고 밝은 곳에서 다시 측정해 주세요');

  var dl=document.getElementById('c24-disease-list');
  if(dl) dl.innerHTML=tips.map(function(d){ return '<div style="padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05);">'+d+'</div>'; }).join('');

  // 스크롤
  if(sec) sec.scrollIntoView({behavior:'smooth',block:'nearest'});
};

function _c24CompNextStep(){
  var s = _c24CompState;
  var cur = s.step;
  var stepMode = s.steps[cur];

  // 현재 단계 이미지 저장
  if(_c24.capturedImage){
    s.images[stepMode] = _c24.capturedImage;
  }

  var nextIdx = cur + 1;
  if(nextIdx >= s.steps.length){
    // 모든 단계 완료 → 통합 분석
    s.active = false;
    setTimeout(function(){ _c24CompFinalAnalyze(); }, 500);
    return;
  }

  /* ★ 유도 화면을 카메라 위에 덮는다 — 카메라 밖 아래에 두었더니
     사용자가 화면을 끌어올려 읽고 다시 내려야 해서 측정 자세가 무너졌다.
     이제 그 자리에서 누르면 바로 다음 부위로 넘어간다. */
  var nextLabel = s.labels[nextIdx];
  var nextIcos = ['👤','👅','👁️','🎨','🤚','✋'];
  var nextIco = nextIcos[nextIdx] || '📷';

  var old = document.getElementById('c24-comp-next');
  if(old) old.remove();

  var host = document.getElementById('c24-cam-block')
          || (document.getElementById('c24-video') && document.getElementById('c24-video').parentElement);
  if(!host) return;
  if(getComputedStyle(host).position === 'static') host.style.position = 'relative';

  var guide = document.createElement('div');
  guide.id = 'c24-comp-next';
  guide.style.cssText = 'position:absolute;inset:0;z-index:30;display:flex;flex-direction:column;'
    + 'align-items:center;justify-content:center;text-align:center;padding:18px;'
    + 'background:rgba(2,20,16,.9);backdrop-filter:blur(3px);';
  guide.innerHTML =
    '<div style="font-size:11px;font-weight:800;color:rgba(52,211,153,.75);">'
      + nextIdx + '/' + s.steps.length + ' ' + _cK(8661,'단계') + '</div>'
    + '<div style="font-size:15px;font-weight:900;color:#34d399;margin-top:7px;line-height:1.4;">'
      + _cK(8810,'✅ 완료! 다음 부위로 넘어갑니다') + '</div>'
    + '<div style="font-size:38px;line-height:1;margin-top:12px;">' + nextIco + '</div>'
    + '<div style="font-size:13px;font-weight:800;color:#fff;margin-top:8px;line-height:1.4;overflow-wrap:anywhere;">'
      + nextLabel + '</div>'
    + '<button onclick="_c24CompDoStep(' + nextIdx + ')" '
    + 'style="margin-top:16px;padding:14px 34px;background:linear-gradient(135deg,#34d399,#10b981);'
    + 'border:0;border-radius:999px;color:#04231b;font-size:14px;font-weight:900;cursor:pointer;font-family:inherit;">'
      + nextIco + ' ' + _cK(8811,'다음 부위 시작') + '</button>';
  host.appendChild(guide);
};

function _c24DiseaseNextStep(){
  var st = _c24DiseaseState;
  if(!st.active||!st.key) return false;
  var flow = _c24DiseaseFlow[st.key];

  // 현재 단계 결과 저장
  st.results.push({
    mode: flow.steps[st.stepIdx],
    modeLabel: flow.labels[st.stepIdx],
    bpm: _c24.bpm, hrv: _c24.hrv, fci: _c24.fci,
    image: _c24.capturedImage
  });

  st.stepIdx++;

  if(st.stepIdx < flow.total){
    // 다음 단계 진행
    var nextMode = flow.steps[st.stepIdx];
    var nextLabel = flow.labels[st.stepIdx];
    _c24UpdateBanner();

    // 결과창에 중간 안내 표시
    var dl = document.getElementById('c24-disease-list');
    if(dl) dl.innerHTML =
      '<div style="text-align:center;padding:14px;">'+
      '<div style="font-size:20px;margin-bottom:6px;">✅</div>'+
      '<div style="font-size:12px;font-weight:700;color:#34d399;">'+(st.stepIdx)+'단계 완료!</div>'+
      '<div style="font-size:11px;color:rgba(240,230,200,.7);margin-top:6px;">'+
      '📍 다음: <b style="color:#38bdf8;">'+nextLabel+'</b> 측정을 시작합니다...</div></div>';

    var sec = document.getElementById('c24-result-section');
    if(sec) sec.style.display='block';

    setTimeout(function(){
      _c24SetMode(nextMode);
      // ★ 다음 단계 시간 적용
      _c24.TOTAL = flow.times ? flow.times[st.stepIdx] : 60;
      var startBtn = document.getElementById('c24-start-btn');
      if(startBtn) startBtn.textContent='▶ '+((typeof _cgoT==='function')?_cgoT(nextLabel):nextLabel)+' '+((typeof _cgoT==='function')?_cgoT('측정 시작'):'측정 시작')+' ('+(st.stepIdx+1)+'/'+flow.total+')';
      setTimeout(function(){ _c24Start(); }, 800);
    }, 1200);
    return true; // 다음 단계 있음
  } else {
    // 모든 단계 완료
    var bprog = document.getElementById('c24-banner-prog');
    var bstep = document.getElementById('c24-banner-step');
    if(bprog) bprog.style.width='100%';
    if(bstep){ bstep.textContent=_cgoT('✅ 완료'); bstep.style.color='#34d399'; }
    var btitle = document.getElementById('c24-banner-title');
    if(btitle) btitle.textContent = _c24Cards[st.key].title.replace(/[💓🩸🦋🫀🍬🧠🫁👅😴🧬]/u,'').trim()+' 검사 완료!';
    st.active = false;
    return false; // 완료
  }
};

function _c24AutoAnalyze(){
  var bpm=_c24.bpm, hrv=_c24.hrv, fci=_c24.fci, mode=_c24.mode;
  var modeNames={face:'얼굴',tongue:'혀',hand:'손/손톱',eye:'눈',skin:'피부'};

  var systemPrompt='당신은 공개된 의학·한의학 문헌을 학습한 건강 정보 도우미 AI입니다. 의료인이 아니며 진단·처방을 하지 않습니다. '+
    'CGO-FULI C-24 카메라 시스템이 측정한 생체 데이터를 바탕으로 분석합니다. '+
    '반드시 초등학생도 이해할 수 있도록 아주 쉽고 자세하게, 길게 설명해 주세요. '+
    '질환명·병명은 절대 언급하지 마세요. 측정값이 뜻하는 컨디션 경향만 설명하고 "관리가 권장됩니다", "경향이 관찰됩니다" 표현을 사용하세요. '+
    '증상이 지속되면 어느 진료 분야에 상담하면 좋은지 안내하세요. 반드시 100% 순수한 한국어로만 작성하세요. furthermore, however, additionally 등 영어 단어 절대 사용 금지. '+
    '답변 마지막에는 항상 법적 안전 문구를 추가하세요.';

  var userMsg, useVision=false, visionImg=null;

  // ★ 질환 연동 검사 완료 — 다중 측정 통합 프롬프트
  var st = _c24DiseaseState;
  if(st.results && st.results.length > 0){
    var card = _c24Cards[st.key]||{};
    var diseaseName = card.title||'';
    var resultLines = st.results.map(function(r,i){
      return '['+(i+1)+'단계 '+r.modeLabel+' 측정]\n'+
        '활력 박자: '+(r.bpm>0?r.bpm+'회/분':'측정 불가')+'\n'+
        '내면 탄력: '+(r.hrv>0?r.hrv:'측정 불가')+'\n'+
        '생기 톤: '+(r.fci>0?r.fci+'/100':'측정 불가');
    }).join('\n\n');

    userMsg='[C-24 '+diseaseName+' 연동 검사 결과 — '+st.results.length+'개 부위 통합]\n\n'+
      resultLines+'\n\n'+
      '위 '+st.results.length+'개 부위의 측정값을 종합하여 '+diseaseName+' 관련 건강 상태를 아주 자세히 분석해 주세요. '+
      '각 부위별 결과의 의미, 컨디션 참고 지표, 생활습관 개선 방법까지 초등학생도 이해할 수 있게 아주 길고 정성스럽게 설명해 주세요. 질환명·병명은 언급하지 마세요.';

    // 마지막 단계 이미지 Vision에 활용
    var lastImg = st.results[st.results.length-1].image;
    if(lastImg){ useVision=true; visionImg=lastImg; }

    // 측정 결과 초기화 (다음 검사를 위해)
    st.results=[];

  } else {
    // 일반 단일 측정
    var modeLabel=modeNames[mode]||mode;
    userMsg='[C-24 카메라 측정 결과]\n'+
      '측정 부위: '+modeLabel+'\n'+
      '활력 박자: '+(bpm>0?bpm+'회/분':'측정 불가')+'\n'+
      '내면 탄력: '+(hrv>0?hrv:'측정 불가')+'\n'+
      '생기 톤: '+(fci>0?fci+'/100':'측정 불가')+'\n\n'+
      '위 측정값을 바탕으로 건강 상태를 아주 자세히 분석해 주세요. '+
      '컨디션 참고 지표, 생활습관 개선 방법까지 초등학생도 이해할 수 있게 설명해 주세요. 질환명·병명은 언급하지 마세요.';
    if(_c24.capturedImage){ useVision=true; visionImg=_c24.capturedImage; }
  }

  _c24.chatHistory=[{role:'user',content:userMsg}];
  var chatLabel = (st.results||[]).length>0
    ? '🔗 '+(_c24Cards[st.key]&&_c24Cards[st.key].title||'연동 검사')+' 통합 분석 요청'
    : '📊 측정 완료 — AI 분석 요청';
  _c24AppendMsg('user', chatLabel);
  _c24AppendMsg('ai', '🔄 분석 중...');

  var msgs=[{role:'system',content:systemPrompt},{role:'user',content:userMsg}];

  // Vision 이미지 있으면 Vision 모델, 없으면 텍스트 모델
  var body;
  if(useVision && visionImg){
    body={
      model:'meta-llama/llama-4-scout-17b-16e-instruct',
      max_tokens:1800, temperature:0.6,
      messages:[{role:'user',content:[
        {type:'image_url',image_url:{url:'data:image/jpeg;base64,'+visionImg}},
        {type:'text',text:systemPrompt+'\n\n'+userMsg}
      ]}]
    };
  } else {
    body={
      model:'openai/gpt-oss-20b',reasoning_effort:'low',include_reasoning:false,
      max_tokens:1800, temperature:0.6,
      messages:msgs
    };
  }

  fetch('/api/groq',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
  .then(function(r){return r.json();})
  .then(function(data){
    var text=(data.choices&&data.choices[0]&&data.choices[0].message&&data.choices[0].message.content)||'분석 결과를 가져오지 못했습니다.';
    var disclaimer='<div style="margin-top:10px;padding:8px 10px;background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.15);border-radius:8px;font-size:10px;color:rgba(251,191,36,.7);">⚠️ 본 분석은 건강 참고 정보 제공 목적이며, 의학적 진단을 대체하지 않습니다. 이상 증상이 지속되면 반드시 전문의 진료를 받으시기 바랍니다.</div>';

    // ★ 측정 결과 분석 카드에 검진 결과 표시
    var dl = document.getElementById('c24-disease-list');
    if(dl){
      var cardKey = _c24DiseaseState.key;
      var cardTitle = (_c24Cards[cardKey]&&_c24Cards[cardKey].title)||'검사 결과';
      var resultHtml =
        '<div style="margin-bottom:10px;">'
        +'<div style="font-size:12px;font-weight:800;color:#34d399;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid rgba(52,211,153,.2);">📋 '+cardTitle+' 검진 결과</div>'
        +'<div style="font-size:12px;color:rgba(240,230,200,.9);line-height:1.9;">'+text.replace(/\n/g,'<br>')+'</div>'
        +disclaimer
        +'<div style="margin-top:10px;padding:8px 10px;background:rgba(56,189,248,.06);border:1px solid rgba(56,189,248,.15);border-radius:8px;font-size:11px;color:rgba(56,189,248,.8);text-align:center;">💬 더 궁금한 사항은 아래 AI 상담에서 질문하세요 ↓</div>'
        +'</div>';
      dl.innerHTML = resultHtml;
      var sec = document.getElementById('c24-result-section');
      if(sec) setTimeout(function(){ sec.scrollIntoView({behavior:'smooth',block:'nearest'}); }, 300);
    }

    // ★ 채팅창은 상담 대기 메시지만
    var chatText = '✅ 검진 결과가 위 [측정 결과 분석] 카드에 표시됐습니다.\n\n궁금한 점이 있으시면 편하게 질문해 주세요.\n\n⚠️ <i>본 분석은 건강 참고 정보 제공 목적이며, 의학적 진단을 대체하지 않습니다.</i>';
    _c24UpdateLastAI(chatText);
    _c24.chatHistory.push({role:'assistant',content:text});
  }).catch(function(){
    _c24UpdateLastAI('분석 중 오류가 발생했습니다. 다시 시도해 주세요.');
  });
};

function _c24Filter(x){
  var b=_c24.bpB, a=_c24.bpA, z=_c24.bpZS;
  var w = x - a[1]*z[0] - a[2]*z[1];
  var y = b[0]*w + b[2]*z[1];
  z[1]=z[0]; z[0]=w;
  return y;
};

function _c24FitBand(mode){
  return ({
    face:   [0.28, 0.85],
    tongue: [0.50, 0.97],
    eye:    [0.45, 0.95],
    skin:   [0.30, 0.95],
    hand:   [0.20, 0.92]
  })[mode] || [0.15, 0.95];
};

function _c24Chime(){
  try{
    var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
    _c24._ac=_c24._ac||new AC(); var ac=_c24._ac;
    if(ac.state==='suspended'){ try{ac.resume();}catch(e){} }
    var now=performance.now();
    if(_c24._lastChime && now-_c24._lastChime<1500) return; // 연타 방지
    _c24._lastChime=now;
    [[523.25,0],[659.25,0.11],[783.99,0.22]].forEach(function(n){ // 딩(도)-동(미)-댕(솔)
      var o=ac.createOscillator(), g=ac.createGain();
      o.type='sine'; o.frequency.value=n[0]; o.connect(g); g.connect(ac.destination);
      var t=ac.currentTime+n[1];
      g.gain.setValueAtTime(0.0001,t);
      g.gain.linearRampToValueAtTime(0.22,t+0.02);
      g.gain.exponentialRampToValueAtTime(0.0008,t+0.20);
      o.start(t); o.stop(t+0.22);
    });
  }catch(e){}
};

function _c24DrawGuide(skinRatio){
  var cv = document.getElementById('c24-guide-canvas');
  if(!cv||!cv.style||cv.style.display==='none') return;
  var v = document.getElementById('c24-video');
  if(!v||!v.videoWidth) return;
  cv.width = cv.offsetWidth;
  cv.height = cv.offsetHeight;
  var ctx = cv.getContext('2d', { willReadFrequently: true });
  ctx.clearRect(0,0,cv.width,cv.height);

  var mode = _c24.mode;
  var isHandMode = (mode==='hand'||mode==='hand_back'||mode==='hand_palm');
  var ok = _c24.faceOK;
  var _fs = _c24.fitState || (ok?'ok':'far');
  var _fcol = _fs==='ok'?'rgba(52,211,153,.92)':_fs==='near'?'rgba(251,191,36,.95)':'rgba(248,113,113,.85)';
  var _hint = _fs==='ok'?_cK(8762,'✅ 딱 맞아요 — 측정 중'):_fs==='near'?_cK(8763,'➡️ 조금 멀어지세요'):_cK(8764,'⬅️ 더 가까이 · 원 안에 맞춰주세요');

  if(isHandMode){
    // 손 모드: 사각형 가이드
    var rx=cv.width*0.1, ry=cv.height*0.15;
    var rw=cv.width*0.8, rh=cv.height*0.7;
    ctx.strokeStyle = _fcol;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8,4]);
    ctx.strokeRect(rx,ry,rw,rh);
    ctx.setLineDash([]);
  } else {
    // 얼굴/혀 모드: 타원 가이드
    var cx2=cv.width*0.5, cy2=cv.height*0.48;
    var ex=cv.width*0.38, ey=cv.height*0.42;
    /* ★ C-63: 원이 곧 FaceMesh 상태 표시기 — 얼굴 인식되면 초록 실선 + 발광 */
    var _fmOK = (_c24._roiBox && _c24._roiBox.src==='facemesh');
    ctx.beginPath();
    ctx.ellipse(cx2,cy2,ex,ey,0,0,Math.PI*2);
    if(_fmOK){
      ctx.strokeStyle='rgba(52,211,153,.95)';
      ctx.lineWidth=3;
      ctx.setLineDash([]);
      ctx.shadowColor='rgba(52,211,153,.85)'; ctx.shadowBlur=14;   /* 인식 = 발광 */
      ctx.stroke();
      ctx.shadowBlur=0;
    } else {
      ctx.strokeStyle = _fcol;
      ctx.lineWidth = 2.5;
      ctx.setLineDash(_fs==='ok'?[]:[6,4]);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    // 원안에원 — 혀·눈은 안쪽 작은 원 (더 가까이 유도)
    if(mode==='tongue'||mode==='eye'){
      ctx.beginPath();
      ctx.ellipse(cx2,cy2,ex*0.5,ey*0.5,0,0,Math.PI*2);
      ctx.strokeStyle=_fcol; ctx.lineWidth=1.5; ctx.setLineDash([4,3]);
      ctx.stroke(); ctx.setLineDash([]);
    }
    // 코너 강조
    var corners=[[-1,-1],[1,-1],[1,1],[-1,1]];
    corners.forEach(function(c3){
      ctx.beginPath();
      ctx.arc(cx2+c3[0]*ex*0.85,cy2+c3[1]*ey*0.85,4,0,Math.PI*2);
      ctx.fillStyle=ok?'rgba(52,211,153,.9)':'rgba(248,113,113,.7)';
      ctx.fill();
    });
  }

  // 얼굴 없으면 경고
  var warn=document.getElementById('c24-face-warn');
  if(warn) warn.style.display=(!ok&&mode!=='hand_back'&&mode!=='hand_palm')?'block':'none';
  // B-2a: 핏 안내 텍스트
  try{
    ctx.font='bold 13px sans-serif'; ctx.textAlign='center';
    ctx.shadowColor='rgba(0,0,0,.6)'; ctx.shadowBlur=4;
    ctx.fillStyle=_fcol; ctx.fillText(_cgoT(_hint), cv.width*0.5, cv.height*0.94); /* ★ C-63: 캔버스 번역 */
    ctx.shadowBlur=0;
  }catch(e){}
  /* ★ C-63: 실제 측정 ROI를 화면에 표시 — PC/모바일 모두 눈으로 확인 가능
     · 초록 실선 = 지금 픽셀을 뽑는 진짜 영역
     · 좌상단 배지 = ROI 소스(facemesh / inner-circle / hand-rect / ellipse / fixed)
     · 부위별 기호 안내로 정렬을 돕는다 */
  try{
    var _rb=_c24._roiBox;
    if(_rb && v.videoWidth){
      /* object-fit:cover 보정 — 비디오가 잘려 표시되므로 scale은 큰 쪽 기준 */
      var _sc=Math.max(cv.width/v.videoWidth, cv.height/v.videoHeight);
      var _ox=(cv.width - v.videoWidth*_sc)/2, _oy=(cv.height - v.videoHeight*_sc)/2;
      var _bx=_rb.sx*_sc+_ox, _by=_rb.sy*_sc+_oy, _bw=_rb.sw*_sc, _bh=_rb.sh*_sc;
      /* transform:scaleX(-1) 거울 보정 — 화면상 x를 반전 */
      _bx = cv.width - _bx - _bw;
      var _isFM=(_rb.src==='facemesh');
      ctx.save();
      ctx.strokeStyle=_isFM?'rgba(52,211,153,.95)':'rgba(251,191,36,.85)';
      ctx.lineWidth=2; ctx.setLineDash(_isFM?[]:[5,4]);
      /* ★ C-63: 얼굴 3패치(이마·좌볼·우볼)는 측정에만 사용하고 화면엔 표시하지 않는다.
         (박스가 얼굴을 따라다니면 사용자가 신경 쓰임 → 대신 타원 가이드가 인식 상태를 표현)
         패치 표시를 되살리려면: window._cgoShowPatches = true */
      if(_rb.patches && _rb.patches.length>=2){
        if(window._cgoShowPatches===true){
          _rb.patches.forEach(function(_p){
            var _px=_p.x*_sc+_ox, _py=_p.y*_sc+_oy, _pw2=_p.w*_sc, _ph2=_p.h*_sc;
            _px = cv.width - _px - _pw2;
            ctx.strokeRect(_px,_py,_pw2,_ph2);
            ctx.fillStyle='rgba(52,211,153,.13)';
            ctx.fillRect(_px,_py,_pw2,_ph2);
          });
        }
      } else if(mode==='hand'||mode==='hand_back'||mode==='hand_palm') {  /* 손만 박스 표시 (혀·눈은 안쪽 원이 안내) */
        ctx.strokeRect(_bx,_by,_bw,_bh);
        var _c=10;
        ctx.lineWidth=3;
        [[_bx,_by,1,1],[_bx+_bw,_by,-1,1],[_bx,_by+_bh,1,-1],[_bx+_bw,_by+_bh,-1,-1]].forEach(function(p){
          ctx.beginPath();
          ctx.moveTo(p[0]+p[2]*_c, p[1]); ctx.lineTo(p[0], p[1]); ctx.lineTo(p[0], p[1]+p[3]*_c);
          ctx.stroke();
        });
      }
      ctx.setLineDash([]);
      /* 좌상단 상태 배지 */
      var _lbl={facemesh:_cK(8750,'🎯 얼굴 추적 정밀'),
                'inner-circle':_cK(8751,'⭕ 안쪽 원 영역'),
                'hand-rect':_cK(8752,'✋ 손 영역'),
                ellipse:_cK(8753,'🔍 얼굴 탐색 중...'),
                fixed:_cK(8754,'⬜ 기본 영역')}[_rb.src]||_rb.src;
      ctx.font='bold 11px sans-serif'; ctx.textAlign='left';
      _lbl=_cgoT(_lbl);   /* ★ C-63: 캔버스 번역 (너비 계산 전에) */
      var _tw=ctx.measureText(_lbl).width+12;
      ctx.fillStyle=_isFM?'rgba(6,78,59,.85)':'rgba(69,26,3,.85)';
      /* ★C-68: HTML 단계 오버레이(상단 ~46px)와 겹쳐 글자가 포개졌다 → 캔버스 배지를 아래로 */
      ctx.fillRect(6,66,_tw,20);
      ctx.fillStyle=_isFM?'#34d399':'#fbbf24';
      ctx.fillText(_lbl, 12, 80);
      /* ★ C-63: FaceMesh 진단 (콘솔 없이 확인) — 전송/응답/검출 */
      /* ★ C-63: 진단 배지는 개발/검증용 → 언어 무관하게 영어 고정 (단독 '응답','검출'을
         전역 사전에 넣으면 다른 화면에서 오역될 위험이 있음 — C-60 용어집 경고) */
      var _dg='FM '+(_c24.fm?'ON':'OFF')+' · resp '+(_c24._fmRecv||0)+' · hit '+(_c24._fmHit||0);
      ctx.font='10px sans-serif';
      ctx.fillStyle='rgba(0,0,0,.7)';
      var _dw=ctx.measureText(_dg).width+10;
      ctx.fillRect(6,90,_dw,16);
      ctx.fillStyle=(_c24._fmHit>0)?'#5eead4':'rgba(255,255,255,.75)';
      ctx.fillText(_dg, 11, 102);
      /* 부위별 정렬 기호 */
      /* ★ C-63: 상황별 안내 — 얼굴 못 잡으면 무엇을 할지 알려준다 */
      var _sym;
      if((mode==='face'||mode==='skin')){
        _sym = _isFM ? _cK(8755,'✅ 얼굴 인식됨 — 그대로 유지하세요')
             : (_c24._fmHit>0 ? _cK(8756,'🔍 얼굴을 다시 화면 중앙으로')
                              : _cK(8757,'💡 얼굴이 안 잡혀요 — 조명을 밝게 · 카메라와 40~60cm'));
      } else {
        _sym={tongue:_cK(8758,'👅 혀를 작은 원 중앙에'),
              eye:_cK(8759,'👁️ 눈을 작은 원 중앙에'),
              hand_back:_cK(8760,'🤚 손등을 박스 가득'),
              hand_palm:_cK(8761,'🖐️ 손바닥을 박스 가득')}[mode];
      }
      if(_sym){
        ctx.font='bold 12px sans-serif'; ctx.textAlign='center';
        ctx.shadowColor='rgba(0,0,0,.7)'; ctx.shadowBlur=4;
        ctx.fillStyle='rgba(255,255,255,.92)';
        /* ★C-68: 상단은 HTML 오버레이가 차지 → 아래쪽에 배치.
           번역으로 길어지면 폭에 맞춰 2줄로 나눈다 (요약·생략 없음). */
        var _txt=_cgoT(_sym), _maxW=cv.width*0.92;
        if(ctx.measureText(_txt).width<=_maxW){
          ctx.fillText(_txt, cv.width*0.5, cv.height*0.88);
        } else {
          var _ws=_txt.split(' '), _l1='', _l2='';
          for(var _wi=0;_wi<_ws.length;_wi++){
            var _try=_l1?(_l1+' '+_ws[_wi]):_ws[_wi];
            if(!_l2 && ctx.measureText(_try).width<=_maxW) _l1=_try;
            else _l2=_l2?(_l2+' '+_ws[_wi]):_ws[_wi];
          }
          ctx.fillText(_l1, cv.width*0.5, cv.height*0.84);
          if(_l2) ctx.fillText(_l2, cv.width*0.5, cv.height*0.90);
        }
        ctx.shadowBlur=0;
      }
      ctx.restore();
    }
  }catch(e){}
};

window._c24ShowChatGuide = function(idx){
  var stale = document.getElementById('c24-chat-guide');
  if(stale) stale.remove();
  var stepInfo = [
    {emoji:'👤', title:'얼굴 측정', sec:60, msgs:[
      _cK(8642,'안녕하세요! 6부위 종합 검사 함께 시작할게요 🌸'),
      _cK(8643,'먼저 *얼굴*부터 측정해요'),
      _cK(8644,'카메라와 30~40cm 거리 유지 + 무표정 + 정면 조명'),
      _cK(8645,'안경·모자 제거하시고, 화면 아래 4-7-8 호흡 타임라인을 따라 호흡해주세요')
    ], tip:_cK(8646,'준비되면 [네, 시작할게요] 버튼을 눌러주세요. 카메라 켜진 후 *5초 위치 조정 시간*이 있어요')},
    {emoji:'👅', title:'혀 관찰 측정', sec:20, msgs:[
      _cK(8700,'잘하셨어요! 얼굴 측정 완료 ✓'),
      _cK(8701,'이제 *혀*를 보여주실 차례예요'),
      _cK(8702,'카메라 15~20cm 거리에 혀를 *최대한 내밀어* 전체가 보이게 해주세요'),
      _cK(8703,'식사 30분 후가 가장 정확합니다')
    ], tip:_cK(8704,'혀를 카메라에 가져다 댄 후 [네, 시작할게요] 눌러주세요')},
    {emoji:'👁️', title:'눈 측정', sec:20, msgs:[
      _cK(8705,'좋아요! 혀 측정 완료 ✓'),
      _cK(8706,'다음은 *눈* 차례예요'),
      _cK(8707,'카메라 15~20cm 거리에서 *위를 약간 봐서* 흰자가 잘 보이게'),
      _cK(8708,'콘택트렌즈는 제거해주시면 더 정확해요')
    ], tip:_cK(8709,'눈 위치 잡으신 후 [네, 시작할게요] 눌러주세요')},
    {emoji:'🎨', title:'피부 측정', sec:30, msgs:[
      _cK(8710,'훌륭해요! 눈 측정 완료 ✓'),
      _cK(8711,'이제 *피부* 차례예요'),
      _cK(8712,'카메라 10~15cm 거리에 *이마 또는 뺨 맨피부*를 가까이'),
      _cK(8713,'크림·화장 없는 상태가 가장 정확합니다')
    ], tip:_cK(8714,'피부 위치 잡으신 후 [네, 시작할게요] 눌러주세요')},
    {emoji:'🤚', title:'손등 측정', sec:15, msgs:[
      _cK(8715,'좋습니다! 피부 측정 완료 ✓'),
      _cK(8716,'*손등*을 측정할게요. 이번엔 *후면 카메라* 사용'),
      _cK(8717,'카메라 20~25cm 거리에 *손톱이 잘 보이도록* 손등을 정면으로'),
      _cK(8627,'매니큐어 제거 권장')
    ], tip:_cK(8718,'손등 위치 잡으신 후 [네, 시작할게요] 눌러주세요')},
    {emoji:'✋', title:'손바닥 측정 (마지막!)', sec:15, msgs:[
      _cK(8720,'거의 다 왔어요! 손등 측정 완료 ✓'),
      _cK(8721,'*마지막* — 손바닥 차례예요'),
      _cK(8722,'카메라 20~25cm 거리에 손바닥을 *평평하게 펼쳐* 정면으로'),
      _cK(8723,'조명이 잘 비추는 곳에서 측정하세요')
    ], tip:_cK(8724,'손바닥 위치 잡으신 후 [네, 시작할게요] 눌러주세요. 측정 완료까지 잠시!')}
  ];
  var info = stepInfo[idx] || stepInfo[0];
  var pop = document.createElement('div');
  pop.id = 'c24-chat-guide';
  pop.style.cssText = 'position:fixed;inset:0;z-index:30500;background:rgba(2,8,23,.95);backdrop-filter:blur(8px);display:flex;align-items:flex-end;justify-content:center;padding:20px;font-family:inherit;';
  var msgBubbles = info.msgs.map(function(m, i){
    return '<div style="display:flex;gap:8px;margin-bottom:10px;align-items:flex-start;animation:fadeInUp .4s ease '+(i*0.25)+'s both;">'
      +'<span style="flex-shrink:0;width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#10b981,#0891b2);display:flex;align-items:center;justify-content:center;font-size:16px;">🌸</span>'
      +'<div style="flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(52,211,153,.2);border-radius:14px 14px 14px 4px;padding:10px 14px;font-size:13px;color:#e2e8f0;line-height:1.7;">'+m+'</div>'
      +'</div>';
  }).join('');
  pop.innerHTML = 
    '<style>@keyframes fadeInUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}@keyframes pulseRing{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.05);opacity:.8;}}</style>'
    +'<div style="width:100%;max-width:480px;max-height:92vh;overflow-y:auto;background:linear-gradient(180deg,#0a1628,#0d1f3c);border:2px solid #10b981;border-radius:20px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,.6);">'
    // 헤더
    +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.08);">'
      +'<div style="font-size:32px;">'+info.emoji+'</div>'
      +'<div style="flex:1;">'
        +'<div style="font-size:9px;font-weight:800;color:#10b981;letter-spacing:.15em;margin-bottom:3px;">'+_cK(8660,'CGO-FULI ·')+' '+(idx+1)+'/6 '+_cK(8661,'단계')+'</div>'
        +'<div style="font-size:16px;font-weight:900;color:#e2e8f0;">'+_cK(8670+idx,info.title)+' · '+info.sec+_cK(8662,'초')+'</div>'
      +'</div>'
    +'</div>'
    // 챗봇 메시지들
    +msgBubbles
    // 팁
    +'<div style="margin-top:14px;padding:12px 14px;background:rgba(56,189,248,.08);border:1px dashed rgba(56,189,248,.4);border-radius:12px;font-size:12px;color:#7dd3fc;line-height:1.7;">💡 '+info.tip+'</div>'
    // 카운트다운 영역
    +'<div id="c24-chat-countdown" style="margin-top:18px;text-align:center;display:none;">'
      +'<div style="font-size:9px;font-weight:800;color:#fbbf24;letter-spacing:.15em;margin-bottom:6px;">자동 시작까지</div>'
      +'<div id="c24-chat-cd-num" style="font-family:Orbitron,sans-serif;font-size:48px;font-weight:900;color:#fbbf24;line-height:1;animation:pulseRing 1s infinite;">5</div>'
    +'</div>'
    // 버튼
    +'<div style="display:flex;gap:10px;margin-top:18px;">'
      +'<button id="c24-chat-go" style="flex:3;padding:14px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:12px;color:#fff;font-size:14px;font-weight:900;cursor:pointer;font-family:inherit;letter-spacing:.02em;">'+_cK(8647,'✅ 네, 시작할게요')+'</button>'
      +'<button id="c24-chat-pause" style="flex:1;padding:14px;background:rgba(251,191,36,.15);border:1px solid rgba(251,191,36,.4);border-radius:12px;color:#fbbf24;font-size:12px;font-weight:800;cursor:pointer;font-family:inherit;">⏸️ 잠깐</button>'
    +'</div>'
    +'</div>';
  document.body.appendChild(pop);
  
  // 28번째 정정: 챗봇 모달은 *클릭으로만* 진행 (자동 카운트다운 X)
  // 진짜 5초 위치 조정은 카메라 켜진 후 c24-capture-cd에서 처리
  var goBtn = pop.querySelector('#c24-chat-go');
  var pauseBtn = pop.querySelector('#c24-chat-pause');
  function proceed(){
    pop.remove();
    _c24CompState._guideOk = true;
    _c24CompDoStep(idx);  // 가드 통과해서 진짜 측정 시작 (카메라 ON + 5초 카운트다운)
  }
  goBtn.addEventListener('click', proceed);
  // [잠깐] 버튼은 모달 닫고 검사 일시 중단
  pauseBtn.addEventListener('click', function(){
    pop.remove();
    if(typeof window._c24CloseModal === 'function') window._c24CloseModal();
  });
  pauseBtn.innerHTML = _cgoT('✕ 중단');
};

window._c24ShowCaptureCountdown = function(){
  var stale = document.getElementById('c24-capture-cd');
  if(stale) stale.remove();
  // 폴링 — 카메라 stream 활성화 감지
  var pollCount = 0;
  var poll = setInterval(function(){
    pollCount++;
    if(pollCount > 50){ clearInterval(poll); return; } // 5초 안 켜지면 포기
    if(_c24.stream){
      clearInterval(poll);
      showOverlay();
    }
  }, 100);
  function showOverlay(){
    var ov = document.createElement('div');
    ov.id = 'c24-capture-cd';
    ov.style.cssText = 'position:fixed;inset:0;z-index:30200;background:rgba(2,8,23,.55);backdrop-filter:blur(2px);display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;font-family:inherit;animation:c24cdFade .3s ease;';
    ov.innerHTML = 
      '<style>@keyframes c24cdFade{from{opacity:0;}to{opacity:1;}}@keyframes c24cdPulse{0%,100%{transform:scale(1);}50%{transform:scale(1.08);}}</style>'
      +'<div style="background:rgba(15,23,42,.92);border:2px solid #fbbf24;border-radius:24px;padding:24px 40px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.6);">'
        +'<div style="font-size:11px;font-weight:800;color:#fbbf24;letter-spacing:.18em;margin-bottom:8px;">'+_cK(8770,'📍 부위를 카메라에 맞춰주세요')+'</div>'
        +'<div id="c24-cd-num" style="font-family:Orbitron,sans-serif;font-size:96px;font-weight:900;color:#fbbf24;line-height:1;animation:c24cdPulse 1s infinite;text-shadow:0 0 30px rgba(251,191,36,.6);">5</div>'
        +'<div style="font-size:12px;color:rgba(232,234,240,.7);margin-top:8px;line-height:1.7;">'+_cK(8771,'측정 시작까지')+'<br><span style="color:#fbbf24;font-weight:700;">'+_cK(8772,'위치 조정 시간')+'</span></div>'
      +'</div>';
    document.body.appendChild(ov);
    var num = ov.querySelector('#c24-cd-num');
    var left = 5;
    var t = setInterval(function(){
      left--;
      if(left > 0){
        if(num) num.textContent = left;
      } else {
        clearInterval(t);
        // 페이드 아웃 + 제거
        ov.style.transition = 'opacity .4s ease';
        ov.style.opacity = '0';
        setTimeout(function(){ if(ov.parentNode) ov.remove(); }, 400);
      }
    }, 1000);
  }
};

function _c24BreathStart(){
  _c24BreathElapsed = 0;
  _c24BreathPhase = 0;
  _c24CompState.breathData.cycles = 0;
  var ov = document.getElementById('c24-breath-overlay');
  if(ov) ov.style.display = 'block';
  _c24BreathTick();
}

function _c24Finish(){
  if(!_c24.isRunning&&_c24.sec===0) return;
  _c24.isRunning=false;
  clearInterval(_c24.timerInt);
  if(_c24.rafId){cancelAnimationFrame(_c24.rafId);_c24.rafId=null;}

  // 최종 수치 계산
  var vitals=_c24CalcVitals();
  if(vitals){ _c24.bpm=vitals.bpm; _c24.hrv=vitals.hrv; }
  _c24.fci=_c24CalcFCI();

  // 이미지 캡처
  var v=document.getElementById('c24-video');
  var cap=document.getElementById('c24-canvas');
  if(v&&v.videoWidth&&cap){
    cap.width=v.videoWidth; cap.height=v.videoHeight;
    var cx=cap.getContext('2d', { willReadFrequently: true });
    cx.drawImage(v,0,0);
    _c24.capturedImage=cap.toDataURL('image/jpeg',0.85).split(',')[1];
  }

  // 카메라 스트림 정지
  if(_c24.stream){ _c24.stream.getTracks().forEach(function(t){t.stop();}); _c24.stream=null; }
  // ★ 478 호흡 타임라인 종료
  _c24BreathStop();

  // UI 복구
  var startBtn=document.getElementById('c24-start-btn');
  var stopBtn=document.getElementById('c24-stop-btn');
  var idle=document.getElementById('c24-idle-overlay');
  var badge=document.getElementById('c24-live-badge');
  var lb=document.getElementById('c24-live-bpm');
  if(startBtn){startBtn.style.display='block';startBtn.textContent=_cgoT('▶ 다시 측정');}
  if(stopBtn){stopBtn.style.display='none';}
  if(idle){idle.style.display='none';}
  if(badge){badge.style.display='none';}
  if(lb){lb.style.display='none';}

  // 결과 표시
  _c24ShowResult();

  // ★ 생체 실측 지표 카드 동기화
  if(!window._bioFinalData) window._bioFinalData = {};
  var _mode = _c24.mode;
  // 얼굴·눈·피부 → BPM/HRV/FCI 저장
  if(_c24.bpm>0) window._bioFinalData.bpm = _c24.bpm;
  if(_c24.hrv>0) window._bioFinalData.hrv = _c24.hrv;
  if(_c24.fci>0) window._bioFinalData.fci = _c24.fci;
  window._bioFinalData.scanned = true;
  // 혀 모드 → tongue 데이터 저장
  if(_mode==='tongue' && _c24.capturedImage){
    if(!window._bioSkinData) window._bioSkinData = {};
    if(!window._bioSkinData.tongue){
      window._bioSkinData.tongue = {color:'담홍색', organ:'그라운딩 에너지', energy:70};
    }
    window._bioFinalData.tongueDone = true;
    try{ sessionStorage.setItem('_cgoTongueColor', window._bioSkinData.tongue.color);
         sessionStorage.setItem('_cgoTongueOrgan', window._bioSkinData.tongue.organ);
         sessionStorage.setItem('_cgoTongueEnergy', window._bioSkinData.tongue.energy); }catch(e){}
  }
  // 카드 즉시 업데이트
  if(typeof hltSyncBioCards==='function') setTimeout(function(){ hltSyncBioCards(); }, 500);

  // ★ 종합 스캔 단계 처리
  if(_c24CompState.active){
    _c24CompNextStep();
    return;
  }

  // ★ 질환 연동 검사: 다음 단계 있으면 진행, 없으면 AI 분석
  if(_c24DiseaseState.active){
    var hasNext = _c24DiseaseNextStep();
    if(!hasNext){
      // 모든 단계 완료 → 통합 AI 분석
      setTimeout(function(){ _c24AutoAnalyze(); }, 800);
    }
    // hasNext=true 면 다음 단계 자동 시작 (위에서 처리)
  } else {
    // 일반 측정 → 바로 AI 분석
    setTimeout(function(){ _c24AutoAnalyze(); }, 600);
  }
}

function _c24UpdateStageUI(){
  var ov=document.getElementById('c24-stage-overlay');
  var gc=document.getElementById('c24-guide-canvas');
  if(!ov) return;

  if(!_c24CompState.active){
    ov.style.display='none';
    if(gc) gc.style.display='none';
    return;
  }
  ov.style.display='block';
  if(gc) gc.style.display='block';

  var s=_c24CompState;
  var icons=['👤','🤚','✋','👅'];
  var colors=['#38bdf8','#34d399','#34d399','#fca5a5'];

  // 단계 점
  var dots=document.getElementById('c24-stage-dots');
  if(dots){
    dots.innerHTML=s.steps.map(function(_,i){
      return '<div style="width:8px;height:8px;border-radius:50%;background:'
        +(i<s.step?'rgba(52,211,153,.9)':i===s.step?colors[i]:'rgba(255,255,255,.2)')
        +';transition:all .3s;'+(i===s.step?'box-shadow:0 0 6px '+colors[i]+';':'')+'"></div>';
    }).join('');
  }

  // 단계 레이블
  var lbl=document.getElementById('c24-stage-label');
  if(lbl){
    var cur=s.step;
    lbl.style.color=colors[cur]||'#34d399';
          /* ★C-68: labels 앞 이모지가 좁은 오버레이를 밀어내 글자가 겹쳤다 → 표시할 때만 이모지 제거 */
      var _lb=((typeof _cgoT==='function')?_cgoT(s.labels[cur]):s.labels[cur]);
      _lb=_lb.replace(/^[\uD800-\uDBFF][\uDC00-\uDFFF][\uFE0F\u200D]*\s*|^[\u2190-\u2BFF\u3000-\u303F][\uFE0F\u200D]*\s*/,'');
      lbl.textContent=(cur+1)+'/'+s.steps.length+' '+_lb;
      lbl.style.whiteSpace='normal'; lbl.style.lineHeight='1.3'; lbl.style.wordBreak='keep-all'; lbl.style.minWidth='0';
  }
}

function _c24RoiRect(v){
  var vw=v.videoWidth, vh=v.videoHeight;
  var def={sx:Math.floor(vw*0.25), sy:Math.floor(vh*0.1), sw:Math.floor(vw*0.5), sh:Math.floor(vh*0.4), src:'fixed'};
  if(window._cgoRoiV2===false) return def;
  try{
    var mode=_c24.mode;
    /* ── 얼굴/피부: FaceMesh 랜드마크로 '이마 + 좌볼 + 우볼' 3개 패치 (눈·코 제외) ──
       ⚠️ 하나의 bbox로 묶으면 그 사이 눈이 포함됨 → 패치를 분리해 각각 사용.
       MediaPipe 468 실측 인덱스:
         이마 중앙 위: 10(정수리쪽), 151(미간 위), 9(미간)
         좌볼: 234(귀앞), 116, 123, 147   우볼: 454(귀앞), 345, 352, 376
       rPPG 문헌상 볼(cheek)이 신호가 가장 강하고, 이마가 그다음. */
    if((mode==='face'||mode==='skin') && _c24._faceLms &&
       (performance.now()-(_c24._faceLmsTime||0) < 700)){
      var L=_c24._faceLms;
      function _pt(i){ var p=L[i]; return p?{x:p.x*vw, y:p.y*vh}:null; }
      /* 안정적인 기준점 */
      var _l = _pt(234), _r = _pt(454);          /* 좌/우 귀 앞 (얼굴 폭) */
      var _mid = _pt(9), _chin = _pt(152), _brow = _pt(151);
      if(_l && _r && _mid && _chin && _brow){
        var faceW = Math.abs(_r.x - _l.x);
        var patches = [];

        /* ① 이마: 미간 위쪽 (눈썹보다 확실히 위) */
        var fH = Math.abs(_brow.y - _pt(10).y);   /* 미간~정수리 거리 */
        if(fH > 8){
          var fw = faceW*0.42, fh = fH*0.55;
          patches.push({ x:_mid.x - fw/2, y:_brow.y - fH*0.85, w:fw, h:fh });
        }
        /* ② 좌볼 / ③ 우볼: 눈 아래, 입 옆 (코·입 제외) */
        var cW = faceW*0.20, cH = faceW*0.20;
        var cheekY = _mid.y + Math.abs(_chin.y - _mid.y)*0.42;   /* 눈 아래로 충분히 내림 */
        patches.push({ x:_l.x + faceW*0.14, y:cheekY - cH/2, w:cW, h:cH });   /* 좌볼 */
        patches.push({ x:_r.x - faceW*0.14 - cW, y:cheekY - cH/2, w:cW, h:cH }); /* 우볼 */

        /* 화면 밖 클램프 + 유효성 */
        var valid = patches.filter(function(p){
          p.x=Math.max(0,Math.min(p.x, vw-4)); p.y=Math.max(0,Math.min(p.y, vh-4));
          p.w=Math.max(4,Math.min(p.w, vw-p.x)); p.h=Math.max(4,Math.min(p.h, vh-p.y));
          return p.w>=8 && p.h>=8;
        });
        if(valid.length>=2){
          /* 대표 사각형(픽셀 추출용)은 '볼 2개'를 감싸되 눈이 안 들어가게 y를 볼 기준으로 */
          var bx0=Math.min.apply(null, valid.map(function(p){return p.x;}));
          var bx1=Math.max.apply(null, valid.map(function(p){return p.x+p.w;}));
          var cheeks=valid.slice(-2);
          var by0=Math.min.apply(null, cheeks.map(function(p){return p.y;}));
          var by1=Math.max.apply(null, cheeks.map(function(p){return p.y+p.h;}));
          return { sx:Math.floor(bx0), sy:Math.floor(by0),
                   sw:Math.floor(bx1-bx0), sh:Math.floor(by1-by0),
                   src:'facemesh', patches:valid };
        }
      }
    }
    /* ── 혀/눈: 가이드 안쪽 작은 원 영역 (DrawGuide의 ex*0.5, ey*0.5와 동일) ── */
    if(mode==='tongue' || mode==='eye'){
      var cx=vw*0.5, cy=vh*0.48;
      var ex=vw*0.38*0.5, ey=vh*0.42*0.5;
      return {sx:Math.floor(cx-ex), sy:Math.floor(cy-ey), sw:Math.floor(ex*2), sh:Math.floor(ey*2), src:'inner-circle'};
    }
    /* ── 손등/손바닥: 사각 가이드 내부 (DrawGuide 0.1/0.15/0.8/0.7) ── */
    if(mode==='hand'||mode==='hand_back'||mode==='hand_palm'){
      return {sx:Math.floor(vw*0.18), sy:Math.floor(vh*0.22), sw:Math.floor(vw*0.64), sh:Math.floor(vh*0.56), src:'hand-rect'};
    }
    /* ── 얼굴인데 랜드마크 없음: 타원 가이드 내접 사각형 ── */
    if(mode==='face'||mode==='skin'){
      var cx2=vw*0.5, cy2=vh*0.48, ex2=vw*0.38*0.62, ey2=vh*0.42*0.62;
      return {sx:Math.floor(cx2-ex2), sy:Math.floor(cy2-ey2), sw:Math.floor(ex2*2), sh:Math.floor(ey2*2), src:'ellipse'};
    }
  }catch(e){}
  return def;
}

function _c24ChromStep(r, g, b){
  /* ★ C-63 조명 정규화 — 프레임 전체 밝기(luma) 변화를 상쇄해 조명 흔들림에 강인하게.
     기준 밝기(EMA)를 유지하고 현재 프레임을 그 비율로 스케일. rPPG 맥동 성분은 보존됨.
     (조명이 밝아지면 R·G·B가 함께 커지므로, 공통 성분을 나눠 제거) */
  if(window._cgoRoiV2!==false){
    try{
      var _lum = 0.299*r + 0.587*g + 0.114*b;
      if(_lum > 1){
        if(!_c24._lumaEMA) _c24._lumaEMA = _lum;
        else _c24._lumaEMA = _c24._lumaEMA*0.97 + _lum*0.03;   /* 느린 EMA = 조명 기준선 */
        var _k = _c24._lumaEMA / _lum;
        if(_k > 0.5 && _k < 2.0){ r*=_k; g*=_k; b*=_k; }        /* 급변 시엔 미적용(안전) */
      }
    }catch(e){}
  }
  _c24.rawR.push(r); _c24.rawG.push(g); _c24.rawB.push(b);

  /* ── 같은 픽셀을 다른 각도로 — 색공간 다겹 + POS 교차검증 ── */
  try{
    var S = window._c24Sig, sp = _c24Spaces(r,g,b);
    S.green.push(g);                    /* GREEN — 가장 단순하고 튼튼한 기준 */
    S.ycbcr.push(sp.cr);                /* YCbCr Cr — 붉은기 */
    S.lab.push(sp.a);                   /* Lab a* — 붉은-녹색 축 */
    var _w = Math.min(_c24.rawR.length, 30);
    S.pos.push(_c24POS(_c24.rawR.slice(-_w), _c24.rawG.slice(-_w), _c24.rawB.slice(-_w)));
    if(S.green.length > 900){ S.green.shift(); S.ycbcr.shift(); S.lab.shift(); S.pos.shift(); }
  }catch(_e){}

  var n=_c24.rawR.length;
  if(n<2) return;
  var wSize=Math.min(n,30);
  var rS=_c24.rawR.slice(-wSize), gS=_c24.rawG.slice(-wSize), bS=_c24.rawB.slice(-wSize);
  function mean(a){ return a.reduce(function(s,v){return s+v;},0)/a.length; }
  function std(a){ var m=mean(a); return Math.sqrt(a.reduce(function(s,v){return s+Math.pow(v-m,2);},0)/a.length)||0.0001; }
  var rM=mean(rS),gM=mean(gS),bM=mean(bS);
  if(rM<1||gM<1||bM<1) return;
  // 동작잡음 체크
  if(_c24.prevR>0&&(Math.abs(r-_c24.prevR)/rM>0.15||Math.abs(g-_c24.prevG)/gM>0.15)){
    _c24.prevR=r; _c24.prevG=g; return;
  }
  _c24.prevR=r; _c24.prevG=g;
  var xsArr=[],ysArr=[];
  for(var i=0;i<wSize;i++){
    xsArr.push(3*(rS[i]/rM)-2*(gS[i]/gM));
    ysArr.push(1.5*(rS[i]/rM)+(gS[i]/gM)-1.5*(bS[i]/bM));
  }
  var alpha=std(xsArr)/std(ysArr);
  var Xs=3*(r/rM)-2*(g/gM), Ys=1.5*(r/rM)+(g/gM)-1.5*(b/bM);
  _c24.chromSig.push(_c24Filter(Xs-alpha*Ys));
  if(_c24.chromSig.length>2700) _c24.chromSig.shift();
  if(_c24.rawR.length>2700){ _c24.rawR.shift(); _c24.rawG.shift(); _c24.rawB.shift(); }
}

function _c24CompStartStep(needBack){
  try{ if(window.cgoFitBeepReset){ ['face','tongue','eye','skin','hand'].forEach(function(p){ cgoFitBeepReset('c24-'+p); }); } }catch(e){}
  if(_c24.isRunning) return;
  _c24.rawR=[]; _c24.rawG=[]; _c24.rawB=[];
  _c24.chromSig=[]; _c24.bpZS=[0,0];
  _c24.bpm=0; _c24.hrv=0; _c24.fci=0;
  _c24.sec=0; _c24.prevR=0; _c24.prevG=0;
  _c24.capturedImage=null;
  _c24.faceOK=false;
  _c24.gotVitals=false; /* B-1: 유효 맥동 신호 1회라도 잡혔는지 */
  _c24.isRunning=true;

  _c24.offCanvas=document.createElement('canvas');
  _c24.offCtx=_c24.offCanvas.getContext('2d', { willReadFrequently: true });

  var stopBtn=document.getElementById('c24-stop-btn');
  var badge=document.getElementById('c24-live-badge');
  var startBtn=document.getElementById('c24-start-btn');
  if(stopBtn) stopBtn.style.display='block';
  if(badge) badge.style.display='block';
  if(startBtn) startBtn.style.display='none';

  var facing = needBack ? 'environment' : 'user';
  var constraints={video:{facingMode:facing,width:{ideal:640},height:{ideal:480},frameRate:{ideal:30}}};
  navigator.mediaDevices.getUserMedia(constraints)
  .catch(function(){return navigator.mediaDevices.getUserMedia({video:true});})
  .then(function(stream){
    _c24.stream=stream;
    var v=document.getElementById('c24-video');
    if(v){
      v.srcObject=stream;
      v.style.transform=needBack?'scaleX(1)':'scaleX(-1)';
      v.play().catch(function(){});
    }
    // idle overlay 숨기기 (카메라 준비됐을 때만)
    var idleOv=document.getElementById('c24-idle-overlay');
    if(idleOv) idleOv.style.display='none';
    // stage overlay 표시
    var stageOv=document.getElementById('c24-stage-overlay');
    if(stageOv) stageOv.style.display='block';
    var gc=document.getElementById('c24-guide-canvas');
    if(gc) gc.style.display='block';
    // ★ 얼굴 단계에서만 478 호흡 타임라인 시작
    if(_c24.mode==='face') _c24BreathStart();
    // ★ 5초 위치 조정 시간 후 측정 루프 시작 (28번째 — 사진 정확도 fix)
    _c24._delayedStart = setTimeout(function(){
      _c24.rafId=requestAnimationFrame(_c24Loop);
    }, 5000);
  }).catch(function(err){
    _c24.isRunning=false;
    /* ★ 알림창으로 막지 않는다 — 창을 닫아도 다시 시도할 길이 없어 멈춰 보였다.
       화면에 안내를 띄우고, 눌러서 다시 열 수 있게 한다. */
    try{
      var n=(err&&err.name)||'';
      var msg = n==='NotAllowedError' ? _cK(8790,'카메라 허용을 눌러 주세요 · 눌러서 다시 시도')
              : n==='NotFoundError'  ? _cK(8791,'카메라를 찾지 못했습니다')
              : _cK(8792,'카메라를 열지 못했습니다 · 눌러서 다시 시도');
      var host=document.getElementById('c24-idle-overlay')||document.getElementById('c24-stage-overlay');
      if(host){
        host.style.display='flex';
        host.innerHTML='<div style="text-align:center;padding:18px;">'
          +'<div style="font-size:30px;line-height:1">📷</div>'
          +'<div style="font-size:12.5px;font-weight:800;color:#fca5a5;margin-top:9px;line-height:1.5;overflow-wrap:anywhere">'+msg+'</div></div>';
        host.onclick=function(){ try{ _c24CompStartStep(false); }catch(e){} };
      }
    }catch(e){}
  });

  // 타이머
  var startTime=performance.now()+5000; // ★ 5초 위치 조정 시간 후 측정 시작
  var lastSec=0;
  var pausedTime=0, pauseStart=0;
  _c24.timerInt=setInterval(function(){
    var needFace=(_c24.mode==='face'||_c24.mode==='tongue');
    if(!_c24.fitOK&&_c24.sec>1){ /* B-2b: 핏(거리·원) 맞을 때만 진행 */
      if(!pauseStart) pauseStart=performance.now();
      return;
    }
    if(pauseStart){pausedTime+=performance.now()-pauseStart;pauseStart=0;}
    var elapsed=(performance.now()-startTime-pausedTime)/1000;
    var sec=Math.floor(elapsed);
    if(sec<=lastSec) return;
    lastSec=sec; _c24.sec=sec;
    try{ _c24Ledger(sec, _c24.mode); }catch(e){}
    var remain=_c24.TOTAL-sec;
    var timerEl=document.getElementById('c24-timer-badge');
    var prog=document.getElementById('c24-progress');
    if(timerEl) timerEl.textContent=remain>0?String(remain):'✓';
    if(prog) prog.style.width=(sec/_c24.TOTAL*100)+'%';
    if(sec>=_c24.TOTAL) _c24Finish();
  },250);
}

function _c24CompDoStep(idx){
  // ★ 챗봇 안내 + 5초 카운트다운 가드 (의료 시스템 0건 수정)
  if(typeof window._c24ShowChatGuide === 'function' && !_c24CompState._guideOk){
    window._c24ShowChatGuide(idx);
    return;
  }
  _c24CompState._guideOk = false;
  _c24CompState.step = idx;
  try{ var _q=window._c24Q; if(_q){ _q.ledger=[]; _q.dropped=0; _q.clamped=0; _q.frames=0; _q._bpmHist=[]; _q._lastLm=null; } }catch(e){}
  try{ var _S=window._c24Sig; if(_S){ _S.pos=[]; _S.green=[]; _S.ycbcr=[]; _S.lab=[]; _S.agree=0; _S.snr=0; } }catch(e){}
  try{ _c24EnvRead(); }catch(e){}
  try{ var _ov=document.getElementById('c24-comp-next'); if(_ov) _ov.remove(); }catch(e){}
  var s = _c24CompState;
  var stepMode = s.steps[idx];
  var stepLabel = s.labels[idx];
  var stepTotal = s.totals[idx];
  var needBack = (stepMode==='hand_back'||stepMode==='hand_palm');

  // 실제 c21 모드
  var realMode = needBack ? 'hand' : stepMode;
  _c24.mode = realMode;
  _c24.TOTAL = stepTotal;

  // ★ 기존 스트림·타이머 완전 정지
  _c24.isRunning = false;
  clearInterval(_c24.timerInt); _c24.timerInt=null;
  if(_c24.rafId){cancelAnimationFrame(_c24.rafId);_c24.rafId=null;}
  if(_c24.stream){
    _c24.stream.getTracks().forEach(function(t){t.stop();});
    _c24.stream=null;
  }

  // 비디오 미러 설정
  var v=document.getElementById('c24-video');
  if(v) v.style.transform=needBack?'scaleX(1)':'scaleX(-1)';

  // 단계별 안내 UI 표시
  var icons=['👤','👅','👁️','🎨','🤚','✋'];
  var guides=[
    _cK(8740,'얼굴을 카메라 정면 30cm에 맞춰주세요\n478 호흡법을 따라 호흡해 주세요 (60초)'),
    _cK(8741,'혀를 최대한 내밀어 카메라에 가까이 대주세요 (20초)'),
    _cK(8742,'눈 흰자가 보이도록 위를 약간 보며 카메라에 대주세요 (20초)'),
    _cK(8743,'피부 부위를 카메라 10~20cm 앞에 고정해 주세요 (30초)'),
    _cK(8744,'손등(손톱 보이는 쪽)을 후면 카메라에 보여주세요 (15초)'),
    _cK(8745,'손바닥을 펼쳐 후면 카메라에 보여주세요 (15초)')
  ];
  var idleOv=document.getElementById('c24-idle-overlay');
  if(idleOv){
    idleOv.style.display='flex';
    idleOv.innerHTML=
      '<div style="font-size:32px;margin-bottom:8px;">'+icons[idx]+'</div>'
      +'<div style="font-size:13px;font-weight:900;color:#34d399;margin-bottom:6px;">'+(idx+1)+'/'+s.steps.length+' '+_cK(8661,'단계')+'</div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.7);text-align:center;padding:0 16px;line-height:1.7;">'+guides[idx]+'</div>';
  }

  // 타이머 배지
  var timerB=document.getElementById('c24-timer-badge');
  if(timerB){timerB.style.display='block';timerB.textContent=String(stepTotal);}

  // stage overlay 업데이트
  _c24UpdateStageUI();

  // 300ms 후 종합스캔 전용 start
  setTimeout(function(){ 
    _c24CompStartStep(needBack); 
    // ★ 카메라 ON 후 5초 위치 조정 카운트다운 오버레이 (별도 폴링)
    if(typeof window._c24ShowCaptureCountdown === 'function'){
      window._c24ShowCaptureCountdown();
    }
  }, 400);
}

function _c24Loop(){
  var now=Date.now();
  if(now-_c24.lastSampleTime >= 1000/_c24.sampleRate){
    _c24.lastSampleTime=now;
    var v=document.getElementById('c24-video');
    if(v&&v.videoWidth&&_c24.offCtx){
      var vw=v.videoWidth,vh=v.videoHeight;
      /* ★ C-63: 부위별 정밀 ROI (FaceMesh 볼·이마 / 혀·눈 안쪽원 / 손 사각) · 실패 시 고정 사각형 폴백 */
      var _roi=(typeof _c24RoiRect==='function')?_c24RoiRect(v):{sx:Math.floor(vw*0.25),sy:Math.floor(vh*0.1),sw:Math.floor(vw*0.5),sh:Math.floor(vh*0.4),src:'fixed'};
      var sx=_roi.sx, sy=_roi.sy, sw=_roi.sw, sh=_roi.sh;
      _c24._roiSrc=_roi.src;
      if(_c24._roiSrcPrev!==_roi.src){ _c24._roiSrcPrev=_roi.src; try{ console.log('[C-63 ROI]', _c24.mode, '→', _roi.src, _roi.sw+'x'+_roi.sh); }catch(e){} }
      _c24._roiBox=_roi; /* ★ C-63: 화면에 ROI 박스 표시용 */
      _c24.offCanvas.width=64; _c24.offCanvas.height=48;
      /* ★ C-63: FaceMesh 성공 시 이마·좌볼·우볼 3패치만 나란히 그림 (눈·코·입 제외).
         실패 시 기존 단일 사각형 그대로 → 동작 보장 */
      if(_roi.patches && _roi.patches.length>=2){
        var _ps=_roi.patches, _pw=Math.floor(64/_ps.length);
        for(var _pi=0;_pi<_ps.length;_pi++){
          var _p=_ps[_pi];
          try{ _c24.offCtx.drawImage(v,_p.x,_p.y,_p.w,_p.h,_pi*_pw,0,_pw,48); }catch(e){}
        }
      } else {
        _c24.offCtx.drawImage(v,sx,sy,sw,sh,0,0,64,48);
      }
      var px=_c24.offCtx.getImageData(0,0,64,48).data;
      var rSum=0,gSum=0,bSum=0,cnt=0,skinCnt=0;
      for(var i=0;i<px.length;i+=4){
        var pr=px[i],pg=px[i+1],pb=px[i+2];
        rSum+=pr; gSum+=pg; bSum+=pb; cnt++;
        var mx2=Math.max(pr,pg,pb),mn2=Math.min(pr,pg,pb);
        var sv=mx2>0?(mx2-mn2)/mx2:0;
        if(pr>70&&pg>40&&pb>20&&pr>pg&&pr>pb&&(pr-pg)>10&&sv>0.15&&sv<0.7) skinCnt++;
      }
      var _skinNeed=(_c24.mode==='face'||_c24.mode==='tongue')?0.18:0.15; /* B-1: 얼굴/혀만 강화 */
      /* ★ C-63: 정밀 ROI(3패치)는 거의 순수 피부 → 하한만 의미 있음. 상한 판정 없음 */
      if(cnt&&skinCnt/cnt>=_skinNeed){
        _c24.faceOK = true;
        _c24ChromStep(rSum/cnt,gSum/cnt,bSum/cnt);
        // 실시간 BPM 업데이트 (3초 후)
        if(_c24.sec>3){
          var v2=_c24CalcVitals();
          if(v2){
            _c24.gotVitals=true; /* B-1: 진짜 맥동 신호 획득 */
            /* 환경 보정 → 생리 구속 → 교차검증 순서 */
            var _bp = _c24EnvAdjust(v2.bpm, _c24.mode);
            _c24.bpm = _c24Physio(_bp);
            try{
              _c24Agree();
              window._c24Sig.snr = _c24SNR(_c24.chromSig);
            }catch(_e){}
            var lb=document.getElementById('c24-live-bpm');
            if(lb){ lb.style.display='block'; lb.textContent='💓 '+v2.bpm; }
          }
        }
      } else {
        _c24.faceOK = (_c24.mode!=='face' && _c24.mode!=='tongue');
      }
      // ── AR-1: FaceMesh 우선(정밀) + 살색비율 폴백 ──
      var _ratioFit = cnt ? skinCnt/cnt : 0;
      var _band = _c24FitBand(_c24.mode);
      var _skinFit = (_ratioFit>=_band[0] && _ratioFit<=_band[1]);
      try{ if((_c24.mode==='face'||_c24.mode==='tongue'||_c24.mode==='skin'||_c24.mode==='eye')) _c24SendFM(document.getElementById('c24-video')); }catch(e){} /* ★ C-63: skin·eye도 FaceMesh 사용 */
      var _fmActive = !!_c24.fm && (_c24.mode==='face'||_c24.mode==='tongue'||_c24.mode==='skin'); /* ★ C-63: skin도 FaceMesh 판정 */
      var _lmsFresh = !!(_c24._faceLms && (performance.now()-(_c24._faceLmsTime||0) < 700));
      /* ★ C-63 fix: ROI가 이마·볼 3패치로 정밀해지면서 그 안은 거의 100% 피부가 된다.
         옛 상한(face 0.85)은 '고정 사각형에 배경이 섞이던 시절' 기준이라,
         정밀 ROI에서는 항상 상한을 넘어 'near(멀어지세요)'로 오판정 → 타임바 정지.
         FaceMesh가 랜드마크로 얼굴을 확인했다면 상한 판정을 적용하지 않는다.
         (하한은 유지 — 얼굴이 너무 작거나 벗어나면 여전히 'far') */
      var _roiPrecise = (_c24._roiBox && _c24._roiBox.src==='facemesh');
      if(_fmActive){
        // 진짜 얼굴 랜드마크 있어야 통과 (없으면 정지 = 정확)
        var _lo = _ratioFit < _band[0];
        var _hi = (!_roiPrecise) && (_ratioFit > _band[1]);   /* 정밀 ROI면 상한 무시 */
        _c24.fitOK = _lmsFresh && !_lo && !_hi;
        _c24.fitState = !_lmsFresh ? 'far' : (_lo ? 'far' : (_hi ? 'near' : 'ok'));
      } else {
        // 폴백: 살색 비율 (FaceMesh 미로드/실패 시)
        _c24.fitOK = _skinFit;
        _c24.fitState = _ratioFit<_band[0] ? 'far' : (_ratioFit>_band[1] ? 'near' : 'ok');
      }
      /* ── 측정 품질 — 거리는 막고, 조도·흔들림은 앱이 고친다 ── */
      try{
        var _q = window._c24Q;
        _q.frames++;
        var _vw = (document.getElementById('c24-video')||{}).videoWidth || 640;

        /* 거리 — 사용자가 고칠 수 있으므로 이것만 막는다 */
        if(_lmsFresh){
          var _d = _c24Distance(_c24._faceLms, _vw);
          if(_d > 0) _q.distCm = _d;
        }
        /* ★ cm 대신 화면 채움 비율로 판정한다.
           폰마다 렌즈 화각이 달라 같은 거리에서도 눈 사이 화소가 다르게 나왔다.
           얼굴 너비가 화면 폭의 45~85%면 어느 폰에서도 신호가 충분하다.
           cm 숫자는 참고로만 남긴다. */
        var _fill = 0;
        if(_lmsFresh && _c24._faceLms && _c24._faceLms.length){
          var _xs = _c24._faceLms.map(function(p){ return p.x; });
          _fill = Math.max.apply(null,_xs) - Math.min.apply(null,_xs);
        }
        _q.fill = _fill;
        /* ★ 지금 재는 부위에 맞는 잣대를 쓴다 — 얼굴 15cm · 혀 9cm · 눈 7cm · 피부 8cm · 손 20cm */
        var _part = ({0:'face',1:'tongue',2:'eye',3:'skin',4:'hand',5:'hand'})[
          (window._c24CompState && window._c24CompState.step) || 0] || 'face';
        _q.part = _part;
        var _st = window.cgoFitState ? cgoFitState(_fill, _part) : 'ok';
        _q.distOK = (_st === 'ok' || _st === 'none');
        /* 딱 맞으면 띵 띵 띵 — 화면을 못 봐도 귀로 안다 */
        if(_st === 'ok' && window.cgoFitBeep) cgoFitBeep('c24-' + _part);

        /* 조도 — 막지 않는다. 밝기를 없애고 비율만 남겨 앱이 고친다 */
        var _il = _c24Illum(cnt?rSum/cnt:0, cnt?gSum/cnt:0, cnt?bSum/cnt:0);
        _q.lux = _il.lux;
        _q.luxOK = _il.lux >= 12;   /* 거의 깜깜할 때만 안내 */

        /* 흔들림 — 버리지 않고 되돌린다. 말·기침 순간만 버린다 */
        if(_lmsFresh){
          _q.motionPx = _c24Motion(_c24._faceLms);
          if(_q.motionPx > 9){ _q.dropped++; }
        }

        /* 거리가 어긋나면 원이 빨개지고 타임바가 멈춘다 */
        if(!_q.distOK){
          _c24.fitOK = false;
          _c24.fitState = (window.cgoFitState ? cgoFitState(_q.fill, _q.part||'face') : 'far');
        }
        /* 왜 멈췄는지 한 줄 */
        var _hint = document.getElementById('c24-quality-hint');
        if(_hint){
          var _msg = '';
          if(!_q.distOK)      _msg = (_q.fill<0.45 ? _cK(8820,'📏 조금 더 가까이') : _cK(8821,'📏 조금 더 멀리'));
          else if(!_q.luxOK)  _msg = _cK(8822,'💡 너무 어둡습니다 · 불을 켜 주세요');
          else if(_q.motionPx > 14) _msg = _cK(8823,'🌀 흔들립니다 · 잠시 멈춰 주세요');
          _hint.textContent = _msg;
          _hint.style.display = _msg ? 'block' : 'none';
        }
      }catch(_e){}

      if(_c24.fitOK){ if(!_c24._wasFit){ _c24._wasFit=true; _c24Chime(); } }
      else { _c24._wasFit=false; }
      // ★ 얼굴 가이드 원 그리기
      _c24DrawGuide(skinCnt/(cnt||1));
    }
  }
  if(_c24.isRunning) _c24.rafId=requestAnimationFrame(_c24Loop);
}

function _c24SendFM(v){
  try{
    if(!_c24.fm || !v || !v.videoWidth) return;
    if(_c24._fmSending) return;
    _c24._fmFrame=(_c24._fmFrame||0)+1;
    if(_c24._fmFrame%4!==0) return; /* 4프레임마다 (CPU 절약) */
    _c24._fmSending=true;
    var p=_c24.fm.send({image:v});
    if(p&&p.then){ p.then(function(){_c24._fmSending=false;}).catch(function(){_c24._fmSending=false;}); }
    else { _c24._fmSending=false; }
  }catch(e){ _c24._fmSending=false; }
}


/* 마크업의 onclick이 부를 수 있게 전역으로 */
(function(){var n=["_c24CompStart","_c24Stop","_c24Start","_c24CompStartStep","_c24CompNextStep","_c24Finish"];n.forEach(function(k){try{ if(typeof eval(k)==="function") window[k]=eval(k); }catch(e){}});})();

/* ══ 측정 취소 — 결과를 만들지 않고 상태만 정리한다 ══
   페이지를 벗어나거나 앱이 뒤로 갈 때 쓰인다. _c24Stop은 결과를 계산해 저장하므로 여기서 쓰지 않는다. */
window._c24Cancel = function(){
  try{ var s=window._c24; if(s){
    s.isRunning=false;
    if(s.timerInt){ clearInterval(s.timerInt); s.timerInt=null; }
    if(s.rafId){ cancelAnimationFrame(s.rafId); s.rafId=null; }
    if(s.stream){ try{ s.stream.getTracks().forEach(function(t){t.stop();}); }catch(e){} s.stream=null; }
  } }catch(e){}
  try{ if(typeof _c24BreathStop==='function') _c24BreathStop(); }catch(e){}
  try{ var p=document.getElementById('page-algo'); if(p) p.classList.remove('c24-scanning'); }catch(e){}
};
