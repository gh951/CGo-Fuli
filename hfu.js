function _c24Guide(color, steps, warning){
  var s='<div style="background:rgba('+color+',0.07);border:1px solid rgba('+color+',0.3);border-radius:10px;padding:12px 14px;margin-bottom:12px;">'+
    '<div style="font-size:11px;font-weight:800;color:rgba('+color+',1);margin-bottom:8px;">📋 측정 전 필독 지시사항</div>';
  steps.forEach(function(st,i){s+='<div style="font-size:11px;color:#334155;margin-bottom:5px;"><b style="color:rgba('+color+',0.9);">'+String.fromCharCode(9312+i)+'</b> '+st+'</div>';});
  if(warning) s+='<div style="margin-top:8px;font-size:10px;color:#b45309;"><b>⚠️</b> '+warning+'</div>';
  s+='</div>';
  return s;
};

var _c24Cards = {
  cardio: {
    title:'💓 마음의 파도 & 생기 리듬',
    content:
    _c24Guide('185,28,28',
      ['밝은 곳에서 정면을 바라봐 주세요','카메라와 얼굴 거리 30~50cm 유지','안경·모자 등 제거 후 촬영','무표정으로 눈을 정면으로 응시','60초간 얼굴을 고정해 주세요'],
      '얼굴의 핏기와 미세한 떨림을 인식해 지금의 생기 에너지와 마음 텐션을 읽어냅니다')+
    '<b style="color:#b91c1c">📷 측정 부위:</b> 👤 얼굴 모드 선택 후 측정<br><br>'+
    '<b style="color:#b91c1c">카메라로 관찰 가능한 지표:</b><br>'+
    '• 🏃 <b>심장 엔진 과속</b> (마음 날씨: 폭풍우) — 심호흡 세 번, 페이스를 늦춰 보세요<br>'+
    '• 🛌 <b>엔진 휴식 모드</b> (마음 날씨: 잔잔한 호수) — 차분하고 느긋한 흐름이에요<br>'+
    '• 🌪️ <b>스트레스 방어벽 약화</b> — 오늘은 자극적인 뉴스나 업무를 멀리하세요<br>'+
    '• 🛑 <b>기운 정체 엇박자</b> — 가벼운 제자리걸음이나 따뜻한 물 한 잔으로 흐름을 뚫어 보세요<br><br>'+
    '<b style="color:#b91c1c">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:#b45309;font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  anemia: {
    title:'💗 혈기(血氣) 에너지 & 톤 밸런스',
    content:
    _c24Guide('180,83,9',
      ['밝은 자연광 또는 형광등 아래에서 측정하세요','얼굴 측정: 카메라와 30~50cm 거리 유지','손 측정: 손바닥을 카메라 정면으로 향하게 펴 주세요','화장·손톱 매니큐어 제거 후 측정 권장','45초간 얼굴 고정, 이후 손 15초 자동 전환'],
      '얼굴과 손바닥에 감도는 미세한 생기 톤을 종합해 활력 흐름을 읽어냅니다')+
    '<b style="color:#b45309">📷 측정 부위:</b> 👤 얼굴 또는 ✋ 손 모드 선택<br><br>'+
    '<b style="color:#b45309">카메라로 관찰 가능한 지표:</b><br>'+
    '• 🌫️ <b>안색 흐림(에너지 다운)</b> — 가벼운 산책으로 활력을 깨워 보세요<br>'+
    '• ❄️ <b>손끝 온기 부족</b> — 따뜻한 음료나 든든한 한 끼를 권해요<br>'+
    '• 🌪️ <b>기운 엇박자 리듬</b> — 안팎의 기운이 겉돌아요. 잠시 쉬어 가세요<br>'+
    '• 👁️ <b>눈가 생기 저하</b> — 오늘 밤은 스마트폰을 멀리하고 숙면을<br><br>'+
    '<b style="color:#b45309">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:#b45309;font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
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
    '<span style="color:#b45309;font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  liver: {
    title:'🫀 신체 정화(클린) 리듬',
    content:
    _c24Guide('4,120,87',
      ['밝은 곳에서 눈 흰자가 잘 보이도록 위를 약간 봐 주세요','카메라와 눈 거리 20~30cm 유지','렌즈 착용 시 제거 권장','눈을 크게 뜨고 흰자 부분이 화면에 잘 보이도록 조절','20초간 눈 고정, 이후 피부 20초 자동 전환'],
      '눈빛의 투명함과 안색의 맑은 정도를 종합해 몸속 정화 에너지 리듬을 읽어냅니다')+
    '<b style="color:#047857">📷 측정 부위:</b> 👁️ 눈 또는 🎨 피부 모드 선택<br><br>'+
    '<b style="color:#047857">카메라로 관찰 가능한 지표:</b><br>'+
    '• 🌫️ <b>눈빛 흐림(정화 시급)</b> — 밤샘·과로로 리프레시 엔진이 지쳤어요. 휴식을 권해요<br>'+
    '• 🍂 <b>안색 침체(나른함) 모드</b> — 오늘은 인스턴트를 피하고 가벼운 식단을<br>'+
    '• 🧪 <b>클린 지수 과부하</b> — 자체 정화 리듬이 무거워졌어요. 수분과 비타민 충전을<br>'+
    '• 🔥 <b>손바닥 열감(기운 과열)</b> — 기운이 한곳에 뭉쳤어요. 가벼운 손 지압을<br><br>'+
    '<b style="color:#047857">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:#b45309;font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  diabetes: {
    title:'🍬 당(糖) 충전 밸런스 & 에너지 흡수 리듬',
    content:
    _c24Guide('2,132,199',
      ['손등 또는 손바닥을 카메라 정면으로 향하게 펴 주세요','후면 카메라가 자동으로 켜집니다','손가락을 가지런히 펴고 손톱이 잘 보이도록 조절','매니큐어 제거 후 측정 권장','20초간 손 고정, 이후 피부 20초 자동 전환'],
      '손끝에 감도는 생기와 피부 텐션을 종합해 지금의 에너지 흐름을 읽어냅니다')+
    '<b style="color:#0284c7">📷 측정 부위:</b> ✋ 손 또는 🎨 피부 모드 선택<br><br>'+
    '<b style="color:#0284c7">카메라로 관찰 가능한 지표:</b><br>'+
    '• 💗 <b>손끝 생기 순환 지수</b> — 흐름이 둔해요. 손가락 잼잼 운동으로 활력을 깨워 보세요<br>'+
    '• 🍂 <b>피부 푸석 가뭄 모드</b> — 카페인 대신 맑은 물을 충분히<br>'+
    '• 🪨 <b>스트레스 방전 모드</b> — 무리한 스케줄은 피하고 10분이라도 눈을 붙이세요<br>'+
    '• ✨ <b>스킨 재생 리듬</b> — 자극적인 음식을 피하고 비타민으로 세포를 응원해 주세요<br><br>'+
    '<b style="color:#0284c7">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:#b45309;font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
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
    '<span style="color:#b45309;font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
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
    '<span style="color:#b45309;font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
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
    '<span style="color:#b45309;font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
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
    '<span style="color:#b45309;font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  },
  skin: {
    title:'🧬 피부 생기(生氣) 광채 & 안색 톤',
    content:
    _c24Guide('4,120,87',
      ['측정할 피부 부위(이마·뺨·손등)를 밝은 곳에 노출해 주세요','카메라와 피부 거리 10~20cm 유지','크림·화장품 없는 맨 피부 상태 권장','피부 전체가 화면에 균일하게 보이도록 조절','20초간 피부 고정, 이후 얼굴 20초 자동 전환'],
      '자연광 또는 백색 형광등 아래에서 측정해야 피부색이 정확히 측정됩니다')+
    '<b style="color:#047857">📷 측정 부위:</b> 🎨 피부 또는 👤 얼굴 모드 선택<br><br>'+
    '<b style="color:#047857">카메라로 관찰 가능한 지표:</b><br>'+
    '• 🌫️ <b>안색 흐림(정체된 기운)</b> — 몸을 가볍게 비워내고 충분한 휴식을<br>'+
    '• ❄️ <b>끝자락 온기 방전</b> — 따뜻한 음료로 온기를 채워 주세요<br>'+
    '• 🔥 <b>붉은 불꽃(과열 텐션)</b> — 쿨링 타임과 마음의 안정이 필요해요<br>'+
    '• 🧊 <b>생기 가뭄 구간</b> — 내면 배터리가 부족해요. 영양 가득한 식사를<br>'+
    '• ☀️ <b>빛 가림(스킨 방어막) 점검</b> — 외출 전 스킨 가드와 수분 충전을<br><br>'+
    '<b style="color:#047857">건강이 걱정되면:</b> 의료기관에서 상담하세요<br><br>'+
    '<span style="color:#b45309;font-size:10px;">⚠️ 본 분석은 일상적 건강관리(웰니스) 참고용이며, 질병의 진단·치료·예방 목적으로 사용할 수 없습니다. 건강이 걱정되면 의료기관에서 상담하세요.</span>'
  }
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


var HFU_ENERGY = [
      {key:'cardio',     emoji:'💓', name:'심장 엔진 리듬', desc:'활력 엔진이 뛰는 박자', color:'#ef4444', bg:'#fef2f2'},
      {key:'anemia',     emoji:'💗', name:'혈기 순환 밸런스', desc:'전신으로 뻗는 붉은 생기 톤', color:'#f59e0b', bg:'#fffbeb'},
      {key:'thyroid',    emoji:'⚡', name:'활력 연소 효율', desc:'에너지 불꽃의 속도와 텐션', color:'#a78bfa', bg:'#faf5ff'},
      {key:'liver',      emoji:'🫀', name:'신체 정화 리듬', desc:'몸속을 비워내는 클린 에너지', color:'#10b981', bg:'#f0fdf4'},
      {key:'diabetes',   emoji:'🍬', name:'당(糖) 충전 밸런스', desc:'에너지 흡수력과 소모 리듬', color:'#0284c7', bg:'#f0f9ff'},
      {key:'autonomic',  emoji:'🧠', name:'멘탈 방어막', desc:'외부 자극을 버티는 내면 탄력성', color:'#ec4899', bg:'#fdf2f8'},
      {key:'respiratory',emoji:'🫁', name:'청명 숨결 지수', desc:'맑은 기운을 들이마시는 안정도', color:'#3b82f6', bg:'#eff6ff'},
      {key:'oriental',   emoji:'👅', name:'설상(舌相) 기운', desc:'혀에 나타나는 오늘의 오행 신호', color:'#d97706', bg:'#fffbeb'},
      {key:'sleep',      emoji:'😴', name:'밤샘 데미지', desc:'에너지 배터리 잔량과 누적 피로', color:'#6366f1', bg:'#eef2ff'},
      {key:'skin',       emoji:'🧬', name:'매력 광채 톤', desc:'안색과 피부에 감도는 아우라', color:'#10b981', bg:'#f0fdf4'}
    ];
window.hfuOpenDisease = function(key){
      // _c24DiseaseCard 글로벌 함수 직접 호출 (팝업이 fixed라 어디서든 표시됨)
      if(typeof _c24DiseaseCard === 'function'){
        _c24DiseaseCard(key);
      }
    };

function hfuRenderDiseases(){
      var el = document.getElementById('hfu-disease-grid');
      if(!el) return;
      el.innerHTML = HFU_ENERGY.map(function(d){
        return '<div class="hfu-disease-card" onclick="window.hfuOpenDisease(\''+d.key+'\')">'
          + '<div class="hfu-disease-icon" style="background:'+d.bg+';color:'+d.color+';">'+d.emoji+'</div>'
          + '<div class="hfu-disease-info">'
          +   '<div class="hfu-disease-name">'+d.name+'</div>'
          +   '<div class="hfu-disease-desc">'+d.desc+'</div>'
          + '</div>'
          + '</div>';
      }).join('');
    };

window.hfuStartScan = function(){
      // ▼ C-60 사용 제한: 웰니스 리포트 측정 하루 2회 (마스터 무제한) ▼
      if(typeof cgoUseGate==='function' && !cgoUseGate('fn_algo-v2','나의 건강 밸런스')){ return; }
      // page-algo가 모달 모드 — _c24CompStart가 자동으로 모달 열고 카메라 시작
      if(typeof _c24CompStart === 'function'){
        try { _c24CompStart(); } catch(e){ console.log('[hfu] _c24CompStart err:', e); }
      } else {
        alert('측정 시스템 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      }
    };


function _c24DiseaseCard(key){
  setTimeout(function(){ try{
    var _p=document.getElementById('c24-disease-pop');
    if(_p){ _p.style.transform='none'; _p.style.display='block'; _p.scrollTop=0; }
    var _o=document.getElementById('c24-disease-pop-ov'); if(_o) _o.style.display='none';
  }catch(e){} },0);
  var d = _c24Cards[key]; if(!d) return;
  var flow = _c24DiseaseFlow[key];
  var pop = document.getElementById('c24-disease-pop');
  var ov = document.getElementById('c24-disease-pop-ov');
  var title = document.getElementById('c24-pop-title');
  var body = document.getElementById('c24-pop-body');
  if(!pop||!ov||!title||!body) return;
  // ★ FIX: page-algo가 모달 모드 — 팝업/오버레이를 body로 이동 (한 번만, fixed라 위치 영향 X)
  if(pop.parentNode !== document.body) document.body.appendChild(pop);
  if(ov.parentNode !== document.body) document.body.appendChild(ov);
  title.innerHTML = d.title;

  // 측정 순서 안내 배지
  var stepBadges = flow.steps.map(function(s,i){
    return '<span style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:rgba(2,132,199,.1);border:1px solid rgba(2,132,199,.3);border-radius:20px;font-size:11px;color:#0284c7;font-weight:700;margin:2px;">'+
      '<b style="color:rgba(212,168,67,.9);">'+(i+1)+'단계</b> '+_cgoT(flow.labels[i])+'</span>';
  }).join('');

  var stepLine = flow.total>1
    ? '<div style="background:rgba(2,132,199,.06);border:1px solid rgba(2,132,199,.2);border-radius:10px;padding:10px 12px;margin-bottom:12px;">'+
      '<div style="font-size:11px;font-weight:700;color:#0284c7;margin-bottom:6px;">🔗 이 컨디션은 '+flow.total+'개 부위 연동 측정입니다</div>'+
      '<div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;">'+stepBadges+'<span style="font-size:11px;color:#334155;">순서대로 자동 진행</span></div></div>'
    : '<div style="background:rgba(4,120,87,.06);border:1px solid rgba(4,120,87,.2);border-radius:10px;padding:8px 12px;margin-bottom:12px;">'+
      '<div style="font-size:11px;color:#047857;">'+((typeof _cgoT==='function')?_cgoT('✅ 단일 부위 측정:'):'✅ 단일 부위 측정:')+' '+((typeof _cgoT==='function')?_cgoT(flow.labels[0]):flow.labels[0])+'</div></div>';

  var totalSec = (flow.times||[]).reduce(function(a,b){return a+b;},0);
  body.innerHTML = stepLine + d.content +
    '<div style="margin-top:16px;">'+
    '<button onclick="_c24StartDisease(\''+key+'\')" style="width:100%;padding:15px;background:#000;border:0;border-radius:14px;color:#fff;font-size:15px;font-weight:600;cursor:pointer;letter-spacing:-.01em;">'+
    '🔬 '+_cgoT(d.title).replace(/[💓🩸🦋🫀🍬🧠🫁👅😴🧬]/u,'')+' '+_cgoT('측정 시작')+' · <span style="font-size:12px;opacity:.8;">'+((typeof _cgoT==='function')?_cgoT('총'):'총')+' '+totalSec+((typeof _cgoT==='function')?_cgoT('초'):'초')+'</span></button></div>';

  ov.style.display='block';
  pop.style.display='block';
  setTimeout(function(){ pop.style.transform='translateY(0)'; }, 10);
};


try{ window.hfuOpenDisease=hfuOpenDisease; window._c24DiseaseCard=_c24DiseaseCard; }catch(e){}



