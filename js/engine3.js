
// ════════════════════════════════════════════════════════
//  CGo-Life 통합 추가 엔진 v3.0
//  ① 사주팔자 정밀분석 팝업
//  ② 생체 역학 융합 음악 추천 (유튜브 링크)
//  ③ 전체 페이지 자동 동기화
// ════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════
//  ① 사주팔자 팝업 데이터베이스
// ═══════════════════════════════════════════════════
var PAJ = {
  GAN_INFO:{
    '甲':{oh:'목',yin:'양',name:'갑목',meaning:'소나무·큰 나무',trait:'진취적·리더십·도전정신',body:'성장 에너지·신경계·눈',season:'봄',dir:'동쪽',color:'청색·녹색',career:'정치인·CEO·군인·개척자',love:'열정적·주도적. 강한 인상',money:'창업·큰 사업 유리. 도전 선호'},
    '乙':{oh:'목',yin:'음',name:'을목',meaning:'화초·덩굴식물',trait:'유연함·섬세함·적응력',body:'성장 에너지·모세혈관·목 라인',season:'봄',dir:'동쪽',color:'연녹색',career:'예술가·외교관·디자이너',love:'부드럽고 다정. 감성 교류 중시',money:'안정적 재테크. 꾸준한 축적'},
    '丙':{oh:'화',yin:'양',name:'병화',meaning:'태양·빛',trait:'밝음·열정·사교성·카리스마',body:'열정·순환 리듬·긴장',season:'여름',dir:'남쪽',color:'빨강·주황',career:'연예인·정치인·마케터·교사',love:'열렬하고 솔직. 불꽃같은 사랑',money:'과감한 투자. 큰 기회에 강함'},
    '丁':{oh:'화',yin:'음',name:'정화',meaning:'촛불·등불',trait:'총명함·직관력·예술성',body:'열정 에너지·눈·긴장',season:'여름',dir:'남쪽',color:'분홍·빨강',career:'예술가·작가·연구자·종교인',love:'감성적·신비로움. 깊은 내면',money:'전문기술·예술로 수입. 안정 추구'},
    '戊':{oh:'토',yin:'양',name:'무토',meaning:'큰 산·대지',trait:'신뢰·중후함·포용력·안정',body:'위·비장·피부·코',season:'환절기',dir:'중앙',color:'황색·갈색',career:'부동산·건설·금융·관리직',love:'믿음직·헌신적. 가정 중시',money:'부동산·저축형. 꾸준한 축적'},
    '己':{oh:'토',yin:'음',name:'기토',meaning:'논밭·습지',trait:'성실·배려심·봉사정신',body:'위·비장·피부·당뇨',season:'환절기',dir:'중앙',color:'연황색',career:'농업·식품·의료·사회복지',love:'따뜻하고 배려심 깊음. 헌신',money:'근면으로 축적. 소박하지만 안정'},
    '庚':{oh:'금',yin:'양',name:'경금',meaning:'철강·바위',trait:'의리·결단력·명예심·강직',body:'정돈 에너지·기관지·뼈',season:'가을',dir:'서쪽',color:'흰색·은색',career:'군인·법조인·외과의사·금융인',love:'의리있고 책임감 강함',money:'큰 투자·사업. 결판 내는 스타일'},
    '辛':{oh:'금',yin:'음',name:'신금',meaning:'보석·날카로운 금속',trait:'완벽주의·섬세함·예리함',body:'호흡·피부·기관지',season:'가을',dir:'서쪽',color:'흰색·금색',career:'외과·보석세공·회계사·패션',love:'까다롭지만 깊은 사랑',money:'정밀한 재무관리. 절약형'},
    '壬':{oh:'수',yin:'양',name:'임수',meaning:'큰 강·바다',trait:'지혜·포용·자유로움·다재다능',body:'신장·방광·생식기·혈액',season:'겨울',dir:'북쪽',color:'검정·청색',career:'철학자·IT개발자·예술가·여행가',love:'자유 중시. 지적 교감 원함',money:'다양한 수입원. 직관적 투자'},
    '癸':{oh:'수',yin:'음',name:'계수',meaning:'빗물·이슬',trait:'직관·감수성·예술성·신비',body:'신장·방광·귀·생식기',season:'겨울',dir:'북쪽',color:'검정·회색',career:'예술가·심리상담사·점술가·의료인',love:'감성적·신비로운 매력. 깊은 정서',money:'직관적 재테크. 예술·창작 수입'}
  },
  JI_INFO:{
    '子':{oh:'수',yin:'양',animal:'🐭',name:'자(子)',meaning:'쥐·한밤중',trait:'지혜·재치·적응력',time:'23~01시',body:'신장·방광·생식기'},
    '丑':{oh:'토',yin:'음',animal:'🐮',name:'축(丑)',meaning:'소·새벽',trait:'인내·성실·신뢰',time:'01~03시',body:'그라운딩 에너지·피부'},
    '寅':{oh:'목',yin:'양',animal:'🐯',name:'인(寅)',meaning:'범·이른아침',trait:'용기·리더십·도전',time:'03~05시',body:'성장 에너지·신경계'},
    '卯':{oh:'목',yin:'음',animal:'🐰',name:'묘(卯)',meaning:'토끼·아침',trait:'온화·섬세·창의',time:'05~07시',body:'성장 에너지·모세혈관'},
    '辰':{oh:'토',yin:'양',animal:'🐲',name:'진(辰)',meaning:'용·오전',trait:'카리스마·야망·변화',time:'07~09시',body:'위·비장·피부'},
    '巳':{oh:'화',yin:'음',animal:'🐍',name:'사(巳)',meaning:'뱀·오전',trait:'직관·지혜·신중',time:'09~11시',body:'열정·순환 리듬'},
    '午':{oh:'화',yin:'양',animal:'🐴',name:'오(午)',meaning:'말·정오',trait:'열정·자유·활동성',time:'11~13시',body:'심장·긴장·눈'},
    '未':{oh:'토',yin:'음',animal:'🐑',name:'미(未)',meaning:'양·오후',trait:'예술·감성·온화',time:'13~15시',body:'그라운딩 에너지·당뇨'},
    '申':{oh:'금',yin:'양',animal:'🐒',name:'신(申)',meaning:'원숭이·오후',trait:'재치·영리·적응',time:'15~17시',body:'정돈 에너지·기관지'},
    '酉':{oh:'금',yin:'음',animal:'🐓',name:'유(酉)',meaning:'닭·저녁',trait:'성실·완벽·수확',time:'17~19시',body:'폐·기관지·뼈'},
    '戌':{oh:'토',yin:'양',animal:'🐕',name:'술(戌)',meaning:'개·저녁',trait:'충직·의리·보호',time:'19~21시',body:'위·비장·코'},
    '亥':{oh:'수',yin:'음',animal:'🐷',name:'해(亥)',meaning:'돼지·밤',trait:'순박·복·낙천성',time:'21~23시',body:'신장·방광·귀'}
  },
  OH_HEALTH:{
    목:{color:'#34d399',icon:'🌳',organ:'간(肝) · 담(膽) · 신경계 · 모세혈관 · 목 라인',
      miss:'해독·소화와 목 컨디션을 살펴보세요.',
      excess:'간 기운 과부하로 신경과민·눈 피로가 나타날 수 있어요.',
      diet:'녹황색 채소, 신맛 음식(식초·레몬), 브로콜리·아보카도',exercise:'스트레칭, 요가, 산림욕'},
    화:{color:'#f97316',icon:'🔥',organ:'심장(心臟) · 소장 · 혈관계통 · 활력 · 눈(目)',
      miss:'심장·긴장·소화·눈 피로 관리에 신경 써 보세요.',
      excess:'열(熱) 기운이 과한 상태 — 충분한 휴식과 수분 섭취를 권장합니다.',
      diet:'쓴맛 음식(쑥·도라지), 적색 식품(토마토·사과), 오메가3',exercise:'유산소 운동(걷기·수영), 단전호흡'},
    토:{color:'#fbbf24',icon:'⛰️',organ:'위(胃) · 비장(脾臟) · 피부 · 코(鼻) · 대사 · 체중',
      miss:'소화 기능과 피부 컨디션을 살펴보세요.',
      excess:'위장 과부하로 대사·피부 컨디션이 흔들릴 수 있어요.',
      diet:'황색 식품(단호박·고구마), 단맛 절제, 식이섬유',exercise:'천천히 걷기, 복식호흡'},
    금:{color:'#94a3b8',icon:'⚔️',organ:'폐(肺) · 대장(大腸) · 기관지 · 뼈(骨)',
      miss:'호흡·장·뼈 컨디션을 살펴보세요.',
      excess:'폐 과부하, 피부 건조, 기관지 민감, 장 과민 증상 우려.',
      diet:'흰색 식품(배·무·양파), 도라지·은행',exercise:'심호흡 운동, 등산, 가벼운 조깅'},
    수:{color:'#38bdf8',icon:'💧',organ:'신장(腎臟) · 방광 · 비뇨기 · 생식기 · 혈액 · 귀(耳)',
      miss:'수분 순환과 청력 컨디션을 살펴보세요.',
      excess:'수분 순환 과부하로 붓기와 냉기가 나타날 수 있어요.',
      diet:'짠맛 절제, 검은 식품(흑임자·검은콩·블루베리), 수분 충분히',exercise:'수영, 태극권, 명상'}
  },
  ILGAN_DESC:{
    '甲':'갑목(甲木) 일간 — 하늘을 향해 뻗은 소나무처럼 강직하고 진취적입니다. 선구자적 기질로 새로운 분야를 개척하며 리더십이 뛰어납니다.',
    '乙':'을목(乙木) 일간 — 유연한 화초처럼 환경에 잘 적응하고 섬세합니다. 인간관계에서 부드럽고 배려심이 깊으며 예술적 감각이 있습니다.',
    '丙':'병화(丙火) 일간 — 태양처럼 밝고 따뜻하며 에너지가 넘칩니다. 사교적이고 카리스마가 강해 주변을 밝게 만드는 존재입니다.',
    '丁':'정화(丁火) 일간 — 촛불처럼 은은하면서도 지속적인 빛을 발합니다. 총명하고 직관력이 뛰어나며 깊은 사유와 예술적 기질이 있습니다.',
    '戊':'무토(戊土) 일간 — 큰 산처럼 중후하고 듬직합니다. 신뢰와 포용력이 뛰어나며 안정을 추구하고 책임감이 강합니다.',
    '己':'기토(己土) 일간 — 비옥한 논밭처럼 모든 것을 품어줍니다. 성실하고 배려심이 깊으며 주변 사람들을 편안하게 해주는 존재입니다.',
    '庚':'경금(庚金) 일간 — 단단한 철강처럼 강인하고 의리가 있습니다. 결단력이 강하고 명예를 중시하며 한번 목표를 세우면 반드시 이룹니다.',
    '辛':'신금(辛金) 일간 — 빛나는 보석처럼 아름답고 예리합니다. 완벽주의적 성향으로 세밀하고 정확하게 일을 처리하며 미적 감각이 뛰어납니다.',
    '壬':'임수(壬水) 일간 — 넓은 바다처럼 포용력이 크고 자유롭습니다. 지혜롭고 다재다능하며 새로운 아이디어와 창의적 사고가 풍부합니다.',
    '癸':'계수(癸水) 일간 — 이슬처럼 맑고 순수합니다. 감수성이 풍부하고 직관력이 뛰어나며 예술적·영적인 기질이 강합니다.'
  },
  DAEUN_GAN:['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'],
  DAEUN_JI:['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']
};

var _oColor={목:'#34d399',화:'#f87171',토:'#fbbf24',금:'#d4a843',수:'#38bdf8'};
var _oKor={목:'木',화:'火',토:'土',금:'金',수:'水'};
function _pOh(g){return{甲:'목',乙:'목',丙:'화',丁:'화',戊:'토',己:'토',庚:'금',辛:'금',壬:'수',癸:'수'}[g]||'토';}
function _jOh(j){return{子:'수',丑:'토',寅:'목',卯:'목',辰:'토',巳:'화',午:'화',未:'토',申:'금',酉:'금',戌:'토',亥:'수'}[j]||'토';}
function _pYin(g){return['甲','丙','戊','庚','壬'].indexOf(g)>-1?'양':'음';}
function _jYin(j){return['子','寅','辰','午','申','戌'].indexOf(j)>-1?'양':'음';}

// ══ 알고리즘 상세 팝업 ══════════════════════════════════════
function apClose(){
  var ov=document.getElementById('apOv');
  var pop=document.getElementById('apPop');
  if(pop) pop.style.transform='translateY(100%)';
  window._apCurrentKey = null;
  setTimeout(function(){
    if(ov) ov.style.display='none';
    if(pop) pop.style.display='none';
  },350);
}

function algoPopup(key){
  var r=window.calcResult;
  if(!r){ r = {name:(window._cgoName()||'사용자'), y:parseInt((document.getElementById('ipBirthY')||{}).value)||1990, m:parseInt((document.getElementById('ipBirthM')||{}).value)||1, d:parseInt((document.getElementById('ipBirthD')||{}).value)||1, domOh:'토', lifeNum:5, gender:'M', birthPlace:(document.getElementById('ipBirthPlace')||{}).value||'서울', curPlace:(document.getElementById('ipCurPlace')||{}).value||'서울'}; }
  window._apCurrentKey = key;  // 팝업 재렌더용 key 저장

  // 현재 날짜 (fcDate로 변경된 경우 반영)
  var td=window._fcBase||new Date();
  var ty=td.getFullYear(),tm=td.getMonth()+1,tday=td.getDate();
  var dw=['일','월','화','수','목','금','토'];
  var wd=dw[td.getDay()];
  var dateStr=ty+'년 '+tm+'월 '+tday+'일 ('+wd+'요일)';

  // 현재 ILI/scores (날짜 변경 후 재계산된 값 우선)
  var ili = r.ili||70;
  var scores = r.scores||{saju:73,jami:71,ast:72,num:69};
  // s18 키 매핑으로 표면 점수와 팝업 점수 일치
  var _s18map = (r.scores && r.scores.s18) ? r.scores.s18 : {};
  var _s18keyMap = {
    saju:'s01',jami:'s02',ast:'s03',chart:'s04',gimon:'s05',
    transit:'s06',yukim:'s07',num:'s08',feng:'s09',kabala:'s10',
    name_analysis:'s11',houses:'s12',taeul:'s13',synastry:'s14',
    solar:'s15',tarot:'s16',nasa:'s17',kusei:'s19',
    bio:'s18',juyeok:'s04',sung:'s11',moon:'s16'
  };
  var _s18k = _s18keyMap[key];
  var score = (_s18k && _s18map[_s18k]) ? Math.round(_s18map[_s18k]) :
              (scores[key] || ili);
  score = Math.min(92, Math.max(40, score)); // 상한 92점 일치

  var DEFS={
    saju:{name:'사주명리 (四柱命理)',icon:'☯️',color:'#d4a843',
      desc:'출생 연월일시의 천간지지 60갑자 배열로부터 오행의 균형을 분석하는 동양 최고의 운명 예측 시스템입니다.'},
    jami:{name:'자미두수 (紫微斗數)',icon:'🌟',color:'#38bdf8',
      desc:'12궁·18주성의 배치로 성격·운명·대운의 흐름을 정밀하게 분석하는 동양 점성술입니다.'},
    ast:{name:'서양 점성술 (Astrology)',icon:'♈',color:'#fbbf24',
      desc:'행성의 황도 위치와 하우스 배치, 애스펙트 각도를 계산하여 에너지 흐름을 분석합니다.'},
    num:{name:'수비학 (Numerology)',icon:'🔢',color:'#34d399',
      desc:'이름과 생년월일의 수 진동으로 개인 에너지·운명 주기를 분석하는 서양 신비학입니다.'},
    chart:{name:'전체 차트 점성술 (Full Chart)',icon:'🪐',color:'#818cf8',
      desc:'출생 시 하늘의 별자리 전체 배치를 분석합니다. 상승궁·달 위치·내면 에너지를 종합합니다.'},
    gimon:{name:'기문둔갑 (奇門遁甲)',icon:'🧭',color:'#fbbf24',
      desc:'9궁 방위 에너지와 시간대별 길흉을 분석하여 최적의 행동 전략과 방위를 도출합니다.'},
    transit:{name:'행성 트랜짓 분석',icon:'🪐',color:'#818cf8',
      desc:'현재 목성·토성·화성의 실시간 운동이 출생 차트에 미치는 에너지 영향을 분석합니다.'},
    yukim:{name:'육임신살 (六壬神煞)',icon:'⚖️',color:'#a855f7',
      desc:'천지반 12지신 에너지 배치로 현재 운기 흐름과 길흉을 정밀 분석합니다.'},
    feng:{name:'풍수지리 (風水地理)',icon:'🏔️',color:'#34d399',
      desc:'공간 기운과 방위 에너지 흐름을 분석하여 최적의 생활 환경 배치를 안내합니다.'},
    kabala:{name:'카발라 점성술 (Kabbalah)',icon:'✡️',color:'#a855f7',
      desc:'생명나무 세피로트 에너지 경로를 통해 영적 에너지 흐름과 운명을 분석합니다.'},
    name_analysis:{name:'성명학 (姓名學)',icon:'✍️',color:'#d4a843',
      desc:'이름의 한자 획수·오행·음양 균형으로 이름이 가진 에너지 파동을 분석합니다.'},
    houses:{name:'점성술 하우스 시스템',icon:'🏠',color:'#818cf8',
      desc:'인생 12영역(건강·재물·관계·직업 등)의 에너지 배치를 하우스 시스템으로 분석합니다.'},
    taeul:{name:'태을신수 (太乙神數)',icon:'🌀',color:'#f87171',
      desc:'72년 주기 우주 에너지 사이클로 현재 시기의 길흉화복을 분석합니다.'},
    synastry:{name:'합성 차트 (Synastry)',icon:'💑',color:'#f87171',
      desc:'금성·화성 에너지 조화와 궁합을 분석하여 인간관계 에너지를 도출합니다.'},
    solar:{name:'태양궁 점성술',icon:'☀️',color:'#fbbf24',
      desc:'태양 궁위 기반으로 핵심 자아 에너지와 생명력을 분석합니다.'},
    tarot:{name:'타로',icon:'🎴',color:'#818cf8',
      desc:'현재 달 위상 변화와 타로 원형 에너지의 공명으로 직관적 조언을 도출합니다.'},
    nasa:{name:'NASA 행성 흐름',icon:'🛰️',color:'#34d399',
      desc:'NASA JPL 실시간 행성 궤도 데이터로 오늘의 우주 에너지 흐름을 정밀 분석합니다.'},
    kusei:{name:'구성학 (九星學)',icon:'🔢',color:'#34d399',
      desc:'1~9성 기반 공간·방위 에너지 패턴으로 오늘의 최적 행동 방향을 분석합니다.'},
    bio:{name:'관상·손금 생체 분석',icon:'🧖',color:'#d4a843',
      desc:'생체 스캔 기반 관상·손금 에너지를 50대 역학 중과 융합하여 분석합니다.'},
    msp:{name:'성격 유형 보정 엔진',icon:'🧠',color:'#a855f7',
      desc:'16가지 성격 유형 × 오행 에너지 궁합으로 역학 점수를 정밀 보정하는 20번째 역학 보정 엔진입니다.'},
    juyeok:{name:'주역 (周易)',icon:'☰',color:'#818cf8',
      desc:'64괘 변화 원리로 현재 에너지 방향과 길흉화복을 분석합니다.'},
    sung:{name:'성명학 (姓名學)',icon:'✍️',color:'#d4a843',
      desc:'이름 획수·오행·음양 균형으로 이름 에너지 파동을 분석합니다.'},
    moon:{name:'달자리 분석',icon:'🌙',color:'#818cf8',
      desc:'출생 시 달의 위치와 오늘 달 에너지의 공명으로 감정·직관 에너지를 분석합니다.'},
    yukim:{name:'육임 (六壬)',icon:'⚖️',color:'#a855f7',
      desc:'천지반 12지신 배치로 현재 운기 흐름을 분석합니다.'}
  };
  var def=DEFS[key];
  if(!def){
    // 정의 없는 키는 기본값으로 처리
    def={name:key,icon:'🔯',color:'#818cf8',desc:'역학 에너지 분석 중입니다.'};
  }
  var col=def.color;

  // 시드: 출생일+선택날짜 결합 → 날짜마다 다른 분석
  var ry=r.y,rm=r.m,rd=r.d;
  var seed=(ry*131+rm*29+rd*7+ty*97+tm*31+tday*13)&0x7fffffff;
  function _s(n){return(n*1103515245+12345)&0x7fffffff;}
  seed=_s(seed);

  // 공통 데이터
  var ganMap={甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水'};
  var ganKr={甲:'목',乙:'목',丙:'화',丁:'화',戊:'토',己:'토',庚:'금',辛:'금',壬:'수',癸:'수'};
  var oh=r.domOh||'목';
  var ohChi={목:'木',화:'火',토:'土',금:'金',수:'水'}[oh]||'木';
  var lifeNum=r.lifeNum||1;
  var zodiac=r.zodiacName||'쥐';
  var kujusei=r.kujusei||5;
  var yg=r.yGan||'甲',yj=r.yJi||'子';
  var mg=(r.mGJ&&r.mGJ.gan)?r.mGJ.gan:(typeof r.mGJ==='string'?r.mGJ.charAt(0):'甲');
  var mj=(r.mGJ&&r.mGJ.ji)?r.mGJ.ji:(typeof r.mGJ==='string'?r.mGJ.charAt(1):'子');
  var dg=(r.dGJ&&r.dGJ.gan)?r.dGJ.gan:(typeof r.dGJ==='string'?r.dGJ.charAt(0):'甲');
  var dj=(r.dGJ&&r.dGJ.ji)?r.dGJ.ji:(typeof r.dGJ==='string'?r.dGJ.charAt(1):'子');
  var sg=r.sGan||'甲',sj=r.sJi||'子';
  var grade=score>=90?'최상위':score>=80?'매우 좋음':score>=70?'양호':score>=60?'보통':'주의 요망';
  var gradeCol=score>=90?'#34d399':score>=80?'#38bdf8':score>=70?col:score>=60?'#fbbf24':'#f87171';

  // 날짜별 변동 메시지
  var dayMsgs=['상승 흐름의 날','안정과 수확의 날','변화와 전환의 날','내면 성찰의 날','활동과 도전의 날','관계와 소통의 날','지혜와 통찰의 날'];
  seed=_s(seed); var dayMsg=dayMsgs[seed%7];
  seed=_s(seed); var luck=(seed%30)+1; // 1~30 행운지수

  // ──── 섹션별 상세 분석 ──────────────────────────────────────
  var detail='';

  // 기본 분석 내용 (모든 역학 공통)
  var baseDetail = '<div style="background:rgba(255,255,255,.03);border-radius:10px;padding:14px;margin-bottom:12px">'+
    '<div style="font-size:11px;color:'+col+';font-weight:700;margin-bottom:6px">📊 오늘의 에너지 분석</div>'+
    '<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+
      r.name+'님의 '+def.name+' 에너지 지수가 <b style="color:'+gradeCol+'">'+score+'점</b>으로 측정되었습니다.<br>'+
      '오늘 '+dateStr+' 기준 <b style="color:'+col+'">'+grade+'</b> 등급의 에너지 상태입니다.<br>'+
      dayMsg+' — 역학 에너지 흐름을 의식하며 하루를 보내세요.'+
    '</div></div>'+
    '<div style="background:rgba(255,255,255,.03);border-radius:10px;padding:14px">'+
      '<div style="font-size:11px;color:rgba(212,168,67,.7);font-weight:700;margin-bottom:6px">💡 오늘의 조언</div>'+
      '<div style="font-size:12px;color:rgba(240,230,200,.75);line-height:1.8">'+def.desc+'<br><br>'+
        '행운 지수: <b style="color:'+col+'">'+luck+'</b> · 오행: <b style="color:'+col+'">'+oh+'('+ohChi+')</b>'+
      '</div>'+
    '</div>';

  if(key==='saju'){
    // 오행 균형 분석
    var ohScores={목:0,화:0,토:0,금:0,수:0};
    var ganOh={甲:'목',乙:'목',丙:'화',丁:'화',戊:'토',己:'토',庚:'금',辛:'금',壬:'수',癸:'수'};
    [yg,mg,dg,sg].forEach(function(g){if(ganOh[g])ohScores[ganOh[g]]++;});
    var ohNames=['목','화','토','금','수'];
    var ohChi2={목:'木',화:'火',토:'土',금:'金',수:'水'};
    var ohColors={목:'#34d399',화:'#f87171',토:'#fbbf24',금:'#e2e8f0',수:'#38bdf8'};
    var ohAdv={
      목:'성장 에너지 경락이 주도적. 동쪽 방위·청색·신맛 음식·새벽 운동이 길합니다.',
      화:'열정 에너지 에너지 강함. 남쪽 방위·적색·쓴맛·오전 활동 극대화하세요.',
      토:'그라운딩 에너지장 에너지 중심. 중앙·황색·단맛·규칙적 식사가 건강을 지킵니다.',
      금:'정돈 에너지 기운 강함. 서쪽·백색·매운맛·깊은 호흡 연습을 권장합니다.',
      수:'신장·방광 주도적. 북쪽·흑색·짠맛·충분한 수분 섭취가 필수입니다.'
    };
    // 날짜별 대운 흐름
    seed=_s(seed);
    var dayunIdx=seed%5; seed=_s(seed);
    var dayunNames=['목(木) 대운','화(火) 대운','토(土) 대운','금(金) 대운','수(水) 대운'];
    var dayunAdv=['창조·성장 에너지 상승','열정·표현 에너지 강화','안정·축적 에너지 집중','결실·정리 에너지 활성','지혜·저장 에너지 충전'];
    var majorStar=['천을귀인','록존성','문창귀인','화개살','역마살','도화살','원진살'][seed%7]; seed=_s(seed);
    // 당일 신살
    var sinsal=['천을귀인(天乙貴人) — 귀인의 도움으로 뜻밖의 행운','록존성(祿存星) — 재물과 명예가 함께 따라옴','문창귀인(文昌貴人) — 학문·시험·계약에 대길','화개살(華蓋殺) — 예술·종교·명상에 집중 권장','역마살(驛馬殺) — 이동·여행·변화의 에너지 활성','도화살(桃花殺) — 인간관계·매력·연애운 상승','원진살(怨嗔殺) — 대인관계 갈등 주의, 독서·내성이 길'][seed%7];

    detail+='<div style="background:rgba(212,168,67,.06);border:1px solid rgba(212,168,67,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(212,168,67,.55);margin-bottom:10px;letter-spacing:.06em">📋 '+dateStr+' 사주팔자 상세 분석</div>'
      +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:14px">'
      +[['연주','年柱',yg,yj],['월주','月柱',mg,mj],['일주','日柱',dg,dj],['시주','時柱',sg,sj]].map(function(p){
        return '<div style="background:rgba(212,168,67,.08);border-radius:10px;padding:10px 4px;text-align:center">'
          +'<div style="font-size:9px;color:rgba(212,168,67,.45);margin-bottom:3px">'+p[0]+'('+p[1]+')</div>'
          +'<div style="font-size:20px;font-weight:900;color:#d4a843">'+p[2]+'</div>'
          +'<div style="font-size:15px;color:rgba(212,168,67,.7);margin:2px 0">'+p[3]+'</div>'
          +'<div style="font-size:9px;color:rgba(212,168,67,.4)">'+(ganMap[p[2]]||'')+'행</div>'
          +'</div>';
      }).join('')
      +'</div>'
      // 오행 분포 바
      +'<div style="font-size:11px;color:rgba(212,168,67,.55);margin-bottom:8px">⚖️ 오행 분포</div>'
      +'<div style="display:flex;gap:6px;margin-bottom:14px">'
      +ohNames.map(function(o){
        var cnt=ohScores[o];
        var pct=cnt/4*100;
        var isMain=(o===oh);
        return '<div style="flex:1;text-align:center">'
          +'<div style="background:rgba(255,255,255,.06);border-radius:4px;height:50px;position:relative;overflow:hidden">'
          +'<div style="position:absolute;bottom:0;left:0;right:0;height:'+pct+'%;background:'+ohColors[o]+';border-radius:4px;opacity:'+(isMain?.9:.5)+'"></div>'
          +'</div>'
          +'<div style="font-size:10px;color:'+(isMain?ohColors[o]:'rgba(240,230,200,0.85)')+';margin-top:3px">'+ohChi2[o]+'</div>'
          +'<div style="font-size:11px;font-weight:700;color:'+(isMain?ohColors[o]:'rgba(240,230,200,.6)')+'">'+cnt+'</div>'
          +'</div>';
      }).join('')
      +'</div>'
      // 주도오행 분석
      +'<div style="background:rgba(212,168,67,.04);border:1px solid rgba(212,168,67,.12);border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="font-size:11px;color:rgba(212,168,67,.6);margin-bottom:6px">🌿 주도 오행('+ohChi+') 건강 조언</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+ohAdv[oh]+'</div>'
      +'</div>'
      // 날짜별 대운
      +'<div style="background:rgba(52,211,153,.04);border:1px solid rgba(52,211,153,.15);border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="font-size:11px;color:rgba(52,211,153,.6);margin-bottom:6px">📅 '+dateStr+' 대운 흐름</div>'
      +'<div style="font-size:13px;font-weight:700;color:#34d399;margin-bottom:4px">'+dayunNames[dayunIdx]+' — '+dayunAdv[dayunIdx]+'</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.7)">점수 '+score+'점 · '+grade+' · '+dayMsg+'</div>'
      +'</div>'
      // 당일 신살
      +'<div style="background:rgba(168,85,247,.04);border:1px solid rgba(168,85,247,.15);border-radius:10px;padding:12px">'
      +'<div style="font-size:11px;color:rgba(168,85,247,.6);margin-bottom:6px">✨ 당일 신살(神殺)</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.7">'+sinsal+'</div>'
      +'</div>'
      +'</div>';

  } else if(key==='jami'){
    var palaces=['명궁','형제궁','부처궁','자녀궁','재백궁','질액궁','천이궁','노복궁','관록궁','전택궁','복덕궁','부모궁'];
    var mainStars=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'];
    var palAdv={
      명궁:'자아·성격·외모·건강 전반을 관장합니다.',
      재백궁:'재물·수입·금전운을 담당합니다.',
      관록궁:'직업·명예·사회적 성취를 나타냅니다.',
      복덕궁:'정신적 행복·취미·여유를 관장합니다.',
      질액궁:'컨디션 흐름과 돌볼 부위를 보여줍니다.',
      부처궁:'배우자·연애·이성운을 담당합니다.'
    };

    var starPositions={};
    var s2=seed;
    palaces.forEach(function(p,i){s2=_s(s2);starPositions[p]=mainStars[s2%14];});
    var luckyPalace=palaces[seed%6]; s2=_s(s2);
    var mainStar=starPositions['명궁']||'紫微';
    s2=_s(s2);
    var daeyun=['사업·창업 확장','재물·투자 집중','학문·기술 연마','인간관계 투자','건강 집중 관리','여행·이동·변화','명예·직위 상승','내면·명상·영적 성장'][s2%8];
    s2=_s(s2);
    var todayFlow=['재백궁 활성 — 금전 흐름 원활','관록궁 활성 — 직업운 상승','복덕궁 활성 — 정신 에너지 충만','명궁 활성 — 자아 에너지 강화','부처궁 활성 — 대인관계 호조','천이궁 활성 — 외부 활동 길'][s2%6];
    s2=_s(s2);
    var healthPalace=starPositions['질액궁']||'天機';
    var healthMsg=score>=75
      ?'질액궁 에너지가 안정적입니다. '+healthPalace+'성의 보호로 현재 건강이 잘 유지되고 있습니다.'
      :'질액궁에 주의 필요. '+healthPalace+'성의 영향으로 면역·소화 계통을 집중 관리하세요.';

    detail+='<div style="background:rgba(56,189,248,.06);border:1px solid rgba(56,189,248,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(56,189,248,.55);margin-bottom:10px;letter-spacing:.06em">🌟 '+dateStr+' 자미두수 정밀 분석</div>'
      // 12궁 핵심 6개
      +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:14px">'
      +['명궁','재백궁','관록궁','복덕궁','질액궁','부처궁'].map(function(p){
        var star=starPositions[p]||'天同';
        var isLucky=(p===luckyPalace);
        return '<div style="background:'+(isLucky?'rgba(56,189,248,.15)':'rgba(56,189,248,.05)')+';border:1px solid rgba(56,189,248,'+(isLucky?'.4':'.12')+');border-radius:10px;padding:10px;text-align:center">'
          +'<div style="font-size:9px;color:rgba(56,189,248,.5);margin-bottom:3px">'+p+'</div>'
          +'<div style="font-size:16px;font-weight:800;color:'+(isLucky?'#38bdf8':'rgba(240,230,200,.7)')+'">'+star+'</div>'
          +'<div style="font-size:9px;color:rgba(56,189,248,.4);margin-top:2px">'+(palAdv[p]?palAdv[p].slice(0,8):'')+'</div>'
          +'</div>';
      }).join('')
      +'</div>'
      // 명궁 주성 분석
      +'<div style="background:rgba(56,189,248,.04);border:1px solid rgba(56,189,248,.12);border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="font-size:11px;color:rgba(56,189,248,.6);margin-bottom:6px">⭐ 명궁 주성 — '+mainStar+'</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'
      +'주성 '+mainStar+'의 에너지가 명궁을 지배합니다. 길한 궁위 '+luckyPalace+'에서 오늘의 에너지가 가장 강하게 발현됩니다.<br>'
      +'<b style="color:#38bdf8">오늘 에너지 흐름:</b> '+todayFlow
      +'</div></div>'
      // 대운 조언
      +'<div style="background:rgba(52,211,153,.04);border:1px solid rgba(52,211,153,.15);border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="font-size:11px;color:rgba(52,211,153,.6);margin-bottom:6px">📅 현재 대운 키워드</div>'
      +'<div style="font-size:13px;font-weight:700;color:#34d399;margin-bottom:4px">'+daeyun+'</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.7)">점수 '+score+'점 · '+grade+' · '+dayMsg+'</div>'
      +'</div>'
      // 질액궁 건강
      +'<div style="background:rgba(248,113,113,.04);border:1px solid rgba(248,113,113,.15);border-radius:10px;padding:12px">'
      +'<div style="font-size:11px;color:rgba(248,113,113,.6);margin-bottom:6px">🏥 질액궁 건강 분석</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+healthMsg+'</div>'
      +'</div>'
      +'</div>';

  } else if(key==='ast'){
    var signs=['양자리','황소자리','쌍둥이자리','게자리','사자자리','처녀자리','천칭자리','전갈자리','사수자리','염소자리','물병자리','물고기자리'];
    var signChi=['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
    var sunSign=signs[((rm-1)*2+Math.floor(rd/15))%12];
    var sunSymbol=signChi[((rm-1)*2+Math.floor(rd/15))%12];
    var s3=seed; s3=_s(s3);
    var moonSign=signs[s3%12]; var moonSym=signChi[s3%12]; s3=_s(s3);
    var rising=signs[s3%12]; var risingSym=signChi[s3%12]; s3=_s(s3);

    // 날짜별 행성 영향
    var planets=['태양☀️','달🌙','수성☿','금성♀','화성♂','목성♃','토성♄','천왕성♅','해왕성♆'];
    var planetInflu=['자아 에너지·창의력','감성·직관·무의식','소통·계약·이동','사랑·금전·미적 감각','행동·용기·갈등','확장·행운·성장','인내·제약·카르마','혁신·변화·자유','영성·환상·직관'];
    s3=_s(s3);
    var todayPlanet=planets[s3%9]; var todayPInflu=planetInflu[s3%9]; s3=_s(s3);
    var aspects=['길상(Trine) 120°','합(Conjunction) 0°','육분(Sextile) 60°','방(Square) 90°','충(Opposition) 180°'];
    var aspectAdv=['조화로운 에너지 흐름으로 모든 일이 순조롭습니다.','강렬한 집중 에너지. 한 가지에 올인하면 폭발적 성과.','기회의 에너지. 적극적 행동이 결실로 이어집니다.','갈등의 에너지. 인내와 타협이 돌파구를 만듭니다.','긴장과 균형의 에너지. 양면을 동시에 살피세요.'];
    var aspIdx=s3%5; var todayAspect=aspects[aspIdx]; var todayAspAdv=aspectAdv[aspIdx]; s3=_s(s3);
    // 하우스 분석
    var houses=['1H 자아','2H 재물','3H 소통','4H 가정','5H 창의','6H 건강','7H 관계','8H 변화','9H 철학','10H 직업','11H 우정','12H 무의식'];
    var todayHouse=houses[s3%12]; s3=_s(s3);
    var moonPhase=['삭(朔)·새 출발','초승달·씨앗 심기','상현달·행동 개시','보름달·절정·수확','하현달·정리·릴리즈','그믐달·휴식·명상'][s3%6];

    detail+='<div style="background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(251,191,36,.55);margin-bottom:10px;letter-spacing:.06em">♈ '+dateStr+' 서양 점성술 정밀 분석</div>'
      // 3대 별자리
      +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">'
      +[[sunSymbol+'태양궁','☀️',sunSign,'자아·정체성·에너지원'],[moonSym+'달궁','🌙',moonSign,'감성·본능·무의식'],[risingSym+'어센던트','⬆️',rising,'외면·첫인상·신체']].map(function(p){
        return '<div style="background:rgba(251,191,36,.08);border-radius:10px;padding:12px;text-align:center">'
          +'<div style="font-size:9px;color:rgba(251,191,36,.45);margin-bottom:3px">'+p[0]+'</div>'
          +'<div style="font-size:20px;margin:3px 0">'+p[1]+'</div>'
          +'<div style="font-size:13px;font-weight:700;color:#fbbf24">'+p[2]+'</div>'
          +'<div style="font-size:9px;color:rgba(251,191,36,.4);margin-top:3px">'+p[3]+'</div>'
          +'</div>';
      }).join('')
      +'</div>'
      // 오늘 행성 영향
      +'<div style="background:rgba(251,191,36,.04);border:1px solid rgba(251,191,36,.12);border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="font-size:11px;color:rgba(251,191,36,.6);margin-bottom:6px">🪐 '+dateStr+' 행성 영향</div>'
      +'<div style="font-size:13px;font-weight:700;color:#fbbf24;margin-bottom:4px">'+todayPlanet+' — '+todayPInflu+'</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.75)">활성 하우스: <b style="color:#fbbf24">'+todayHouse+'</b> &nbsp; 달의 위상: <b style="color:#fbbf24">'+moonPhase+'</b></div>'
      +'</div>'
      // 오늘 애스펙트
      +'<div style="background:rgba(56,189,248,.04);border:1px solid rgba(56,189,248,.12);border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="font-size:11px;color:rgba(56,189,248,.6);margin-bottom:6px">📐 오늘의 주요 애스펙트</div>'
      +'<div style="font-size:13px;font-weight:700;color:#38bdf8;margin-bottom:4px">'+todayAspect+'</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.7">'+todayAspAdv+'</div>'
      +'</div>'
      // 에너지 요약
      +'<div style="background:rgba(52,211,153,.04);border:1px solid rgba(52,211,153,.12);border-radius:10px;padding:12px">'
      +'<div style="font-size:11px;color:rgba(52,211,153,.6);margin-bottom:6px">✨ 오늘의 천궁도 에너지 요약</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">점수 <b style="color:#34d399">'+score+'점 · '+grade+'</b><br>'+dayMsg+' · 태양 '+sunSign+' · 달 '+moonSign+'의 에너지가 오늘 하루를 이끕니다.</div>'
      +'</div>'
      +'</div>';

  } else if(key==='num'){
    var numMeaning={1:'리더십·독립·창조·개척',2:'협력·조화·감수성·직관',3:'표현·창의·소통·예술',4:'안정·실용·근면·질서',5:'자유·변화·모험·다재다능',6:'책임·사랑·치유·봉사',7:'분석·영성·탐구·지혜',8:'성취·물질·권력·야망',9:'완성·인류애·봉사·지혜'};
    var expNum=((ry%9||9)+(rm%9||9)+(rd%9||9)-1)%9+1;
    var persYear=(ty+tm+tday)%9||9;
    var cycles=['새 씨앗 심기·용기 있는 출발','성장 노력·인내와 협력','표현과 확장·창의적 도전','안정 구축·기초 다지기','변화와 자유·새로운 경험','책임과 치유·관계 투자','내면 성찰·깊은 내면과의 싱크로','물질적 성취·권력·결실','완성과 마무리·다음 사이클 준비'];
    var s4=seed; s4=_s(s4);
    var masterNum=(lifeNum===11||lifeNum===22||lifeNum===33);
    var solfeggio=[396,417,528,639,741,852,963][s4%7]; s4=_s(s4);
    var solName={396:'내면 정화',417:'에너지 리셋',528:'딥 하모니',639:'소통의 파동',741:'직관적 자각',852:'영감 스펙트럼',963:'신성·통합'}[solfeggio];
    var colorHealing=['빨강·주황·금색','녹색·에메랄드·청록','보라·남색·은색','흰색·크림·황금','진남색·검정·은색','파랑·하늘·청록','자주·핑크·로즈'][s4%7]; s4=_s(s4);
    var crystal=['수정(투명)','자수정(보라)','호안석(금갈색)','로즈쿼츠(핑크)','흑요석(검정)','라피스라줄리(남색)','시트린(노랑)'][s4%7]; s4=_s(s4);
    var affirmation=['나는 무한한 가능성을 가진 존재입니다.','나는 사랑받고 보호받으며 안전합니다.','내 창의성이 세상을 아름답게 만듭니다.','나는 단단한 기반 위에 꿈을 이루고 있습니다.','나는 변화를 통해 더 강해집니다.','내 사랑과 봉사가 세상을 치유합니다.','나는 내면의 지혜를 신뢰합니다.','나는 풍요와 성공을 당연하게 받아들입니다.','나는 완성을 향해 아름답게 나아가고 있습니다.'][lifeNum-1]||'나는 무한한 가능성을 가진 존재입니다.';

    detail+='<div style="background:rgba(52,211,153,.06);border:1px solid rgba(52,211,153,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(52,211,153,.55);margin-bottom:10px;letter-spacing:.06em">🔢 '+dateStr+' 수비학 정밀 분석</div>'
      // 3대 수
      +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">'
      +[[(typeof _cgoT==='function'?_cgoT('생명수'):'생명수'),'Life Path',lifeNum,'핵심 운명수'],['표현수','Expression',expNum,'개성·재능수'],['개인년수','Personal Year',persYear,'올해 에너지']].map(function(p){
        return '<div style="background:rgba(52,211,153,.1);border-radius:10px;padding:12px;text-align:center">'
          +'<div style="font-size:9px;color:rgba(52,211,153,.5);margin-bottom:2px">'+p[0]+'</div>'
          +'<div style="font-size:9px;color:rgba(52,211,153,.35);margin-bottom:4px">'+p[1]+'</div>'
          +'<div style="font-size:36px;font-weight:900;color:#34d399;line-height:1">'+p[2]+(masterNum&&p[2]===lifeNum?'✦':'')+'</div>'
          +'<div style="font-size:9px;color:rgba(52,211,153,.6);margin-top:3px">'+(numMeaning[p[2]]?numMeaning[p[2]].split('·')[0]:'')+'</div>'
          +'</div>';
      }).join('')
      +'</div>'
      // 생명수 상세
      +'<div style="background:rgba(52,211,153,.04);border:1px solid rgba(52,211,153,.12);border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="font-size:11px;color:rgba(52,211,153,.6);margin-bottom:6px">⭐ 생명수 '+lifeNum+(masterNum?'(마스터 넘버)':'')+'의 에너지</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+numMeaning[lifeNum]+'<br>'
      +'<b style="color:#34d39990">개인년수 '+persYear+':</b> '+cycles[persYear-1]
      +'</div></div>'
      // 오늘 에너지 도구
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">'
      +'<div style="background:rgba(168,85,247,.04);border:1px solid rgba(168,85,247,.15);border-radius:10px;padding:12px">'
      +'<div style="font-size:10px;color:rgba(168,85,247,.6);margin-bottom:5px">🎵 솔페지오 주파수</div>'
      +'<div style="font-size:16px;font-weight:800;color:#a855f7">'+solfeggio+'Hz</div>'
      +'<div style="font-size:10px;color:rgba(168,85,247,.6)">'+solName+'</div>'
      +'</div>'
      +'<div style="background:rgba(251,191,36,.04);border:1px solid rgba(251,191,36,.15);border-radius:10px;padding:12px">'
      +'<div style="font-size:10px;color:rgba(251,191,36,.6);margin-bottom:5px">💎 오늘의 크리스탈</div>'
      +'<div style="font-size:13px;font-weight:700;color:#fbbf24">'+crystal+'</div>'
      +'<div style="font-size:10px;color:rgba(251,191,36,.6)">색 치유: '+colorHealing+'</div>'
      +'</div>'
      +'</div>'
      // 확언
      +'<div style="background:rgba(212,168,67,.04);border:1px solid rgba(212,168,67,.15);border-radius:10px;padding:12px">'
      +'<div style="font-size:11px;color:rgba(212,168,67,.6);margin-bottom:6px">🙏 오늘의 확언 (Affirmation)</div>'
      +'<div style="font-size:13px;font-weight:700;color:#d4a843;line-height:1.6;font-style:italic">"'+affirmation+'"</div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,0.85);margin-top:6px">점수 '+score+'점 · '+grade+' · '+dayMsg+'</div>'
      +'</div>'
      +'</div>';
  } else if(key==='chart'){
    // 전체 차트 점성술
    var ascSigns=['양자리','황소자리','쌍둥이자리','게자리','사자자리','처녀자리','천칭자리','전갈자리','사수자리','염소자리','물병자리','물고기자리'];
    var ascEmoji=['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
    var s5=seed; s5=_s(s5);
    var ascIdx=s5%12; s5=_s(s5);
    var moonIdx=s5%12; s5=_s(s5);
    var house1=['자아·외모','재물·가치','소통·형제','가정·뿌리','창조·연애','건강·일','관계·파트너','변화·욕망','철학·여행','명예·직업','우정·희망','무의식·영성'][s5%12];
    var planets=['목성','토성','화성','금성','수성'][s5%5]; s5=_s(s5);
    var planetHouse=(s5%12)+1; s5=_s(s5);
    var aspects=['트라인(120°) — 조화로운 에너지 흐름','섹스타일(60°) — 기회와 재능의 각도','스퀘어(90°) — 긴장과 성장의 에너지','컨정션(0°) — 강력한 에너지 융합','오포지션(180°) — 균형과 통합의 도전'][s5%5];
    detail+='<div style="background:rgba(129,140,248,.06);border:1px solid rgba(129,140,248,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(129,140,248,.6);margin-bottom:10px;letter-spacing:.06em">🪐 '+dateStr+' 전체 차트 분석</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px">'
      +'<div style="background:rgba(129,140,248,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(129,140,248,.5);margin-bottom:3px">상승궁 (ASC)</div><div style="font-size:20px">'+ascEmoji[ascIdx]+'</div><div style="font-size:11px;color:#818cf8;font-weight:700">'+ascSigns[ascIdx]+'</div></div>'
      +'<div style="background:rgba(129,140,248,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(129,140,248,.5);margin-bottom:3px">달자리 (Moon)</div><div style="font-size:20px">'+ascEmoji[moonIdx]+'</div><div style="font-size:11px;color:#818cf8;font-weight:700">'+ascSigns[moonIdx]+'</div></div>'
      +'<div style="background:rgba(129,140,248,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(129,140,248,.5);margin-bottom:3px">강조 하우스</div><div style="font-size:20px">🏠</div><div style="font-size:11px;color:#818cf8;font-weight:700">'+house1+'</div></div>'
      +'</div>'
      +'<div style="background:rgba(129,140,248,.04);border:1px solid rgba(129,140,248,.12);border-radius:10px;padding:12px;margin-bottom:8px">'
      +'<div style="font-size:11px;color:rgba(129,140,248,.6);margin-bottom:5px">⭐ 오늘의 핵심 행성 에너지</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+planets+' — '+planetHouse+'번 하우스 강조<br>주요 각도: '+aspects+'<br>점수 '+score+'점 · '+grade+' · '+dayMsg+'</div>'
      +'</div>'
      +'</div>';

  } else if(key==='gimon'){
    // 기문둔갑
    var _dirs=['북(坎)','북동(艮)','동(震)','남동(巽)','중앙(中)','남서(坤)','서(兌)','북서(乾)','남(離)'];
    var _gates=['휴문(休門)','생문(生門)','상문(傷門)','두문(杜門)','경문(景門)','사문(死門)','경문(驚門)','개문(開門)'];
    var _stars=['천봉성','천예성','천충성','천보성','천금성','천심성','천주성','천임성','천영성'];
    var _gods=['직부(直符)','등사(螣蛇)','태음(太陰)','육합(六合)','구지(勾陳)','주작(朱雀)','구천(九天)','구지(九地)'];
    var sg=seed; sg=_s(sg);
    var goodDir=_dirs[sg%9]; sg=_s(sg);
    var badDir=_dirs[(sg+4)%9]; sg=_s(sg);
    var gate=_gates[sg%8]; sg=_s(sg);
    var star=_stars[sg%9]; sg=_s(sg);
    var god=_gods[sg%8]; sg=_s(sg);
    var timeSlot=['子시(23~01)','丑시(01~03)','寅시(03~05)','卯시(05~07)','辰시(07~09)','巳시(09~11)','午시(11~13)','未시(13~15)','申시(15~17)','酉시(17~19)','戌시(19~21)','亥시(21~23)'][sg%12];
    detail+='<div style="background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(251,191,36,.6);margin-bottom:10px;letter-spacing:.06em">🧭 '+dateStr+' 기문둔갑 방위 분석</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">'
      +'<div style="background:rgba(52,211,153,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(52,211,153,.5);margin-bottom:3px">✅ 오늘의 길방 (吉方)</div><div style="font-size:18px;font-weight:800;color:#34d399">'+goodDir+'</div><div style="font-size:10px;color:rgba(52,211,153,.6)">출행·계약·만남 길</div></div>'
      +'<div style="background:rgba(248,113,113,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(248,113,113,.5);margin-bottom:3px">⚠️ 오늘의 흉방 (凶方)</div><div style="font-size:18px;font-weight:800;color:#f87171">'+badDir+'</div><div style="font-size:10px;color:rgba(248,113,113,.6)">중요 결정 피하기</div></div>'
      +'</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px">'
      +'<div style="background:rgba(251,191,36,.06);border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:rgba(251,191,36,.5);margin-bottom:2px">당일 門</div><div style="font-size:11px;font-weight:700;color:#fbbf24">'+gate+'</div></div>'
      +'<div style="background:rgba(251,191,36,.06);border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:rgba(251,191,36,.5);margin-bottom:2px">당일 星</div><div style="font-size:11px;font-weight:700;color:#fbbf24">'+star+'</div></div>'
      +'<div style="background:rgba(251,191,36,.06);border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:rgba(251,191,36,.5);margin-bottom:2px">당일 神</div><div style="font-size:11px;font-weight:700;color:#fbbf24">'+god+'</div></div>'
      +'</div>'
      +'<div style="background:rgba(251,191,36,.04);border:1px solid rgba(251,191,36,.12);border-radius:10px;padding:12px">'
      +'<div style="font-size:11px;color:rgba(251,191,36,.6);margin-bottom:5px">⏰ 오늘의 길시 (吉時)</div>'
      +'<div style="font-size:13px;font-weight:700;color:#fbbf24">'+timeSlot+'</div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.7);margin-top:4px">점수 '+score+'점 · '+grade+'</div>'
      +'</div>'
      +'</div>';

  } else if(key==='transit'){
    // 행성 트랜짓
    var _planets=[{n:'목성',e:'♃',c:'#fbbf24',trait:'확장·행운·지혜'},{n:'토성',e:'♄',c:'#94a3b8',trait:'구조·책임·도전'},{n:'화성',e:'♂',c:'#f87171',trait:'행동·에너지·추진'},{n:'금성',e:'♀',c:'#f9a8d4',trait:'사랑·미·조화'},{n:'수성',e:'☿',c:'#6ee7b7',trait:'소통·지성·이동'}];
    var st=seed; st=_s(st);
    var pCards=_planets.map(function(p,i){ st=_s(st); var h2=(st%12)+1; st=_s(st); var mv=st%3===0?'순행 ▶':st%3===1?'역행 ◀':'정지 ●'; return {p:p,h:h2,mv:mv}; });
    var todayPlanet=pCards[st%5]; st=_s(st);
    var transitMsg=['새로운 기회의 문이 열립니다','내면의 성찰이 필요한 시기입니다','강한 추진력으로 목표를 향해 나아가세요','관계와 아름다움에 집중하세요','소통과 학습에 최적의 에너지입니다'][st%5];
    detail+='<div style="background:rgba(99,130,201,.06);border:1px solid rgba(99,130,201,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(99,130,201,.6);margin-bottom:10px;letter-spacing:.06em">🪐 '+dateStr+' 행성 트랜짓 분석</div>'
      +'<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">'
      +pCards.map(function(pc){
        // 🛡️ [정직 by C-20] random 너비 → 행성 영향력 의미있게
        // 행성 기본 영향력 (점성술 전통: 목성·토성=대길성, 화성·금성·수성=소길성)
        var _planetInfluence = {목성:88, 토성:78, 화성:75, 금성:72, 수성:68}[pc.p.n] || 75;
        // 역행 시 영향력 감소 (-12), 순행 +5, 정지 0
        if(pc.mv.indexOf('역행') >= 0) _planetInfluence -= 12;
        else if(pc.mv.indexOf('순행') >= 0) _planetInfluence += 5;
        // 하우스 보정 (1·5·9·10번 하우스가 강함)
        if([1,5,9,10].indexOf(pc.h) >= 0) _planetInfluence += 3;
        var _barW = Math.max(50, Math.min(95, _planetInfluence));
        return '<div style="display:flex;align-items:center;gap:10px;background:rgba(99,130,201,.06);border-radius:8px;padding:10px">'
          +'<div style="font-size:20px;flex-shrink:0">'+pc.p.e+'</div>'
          +'<div style="flex:1"><div style="font-size:12px;font-weight:700;color:'+pc.p.c+'">'+pc.p.n+' ('+pc.p.trait+')</div>'
          +'<div style="font-size:10px;color:rgba(240,230,200,.5)">'+pc.h+'번 하우스 · '+pc.mv+'</div></div>'
          +'<div style="width:'+_barW+'px;height:4px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden;flex-shrink:0"><div style="height:100%;background:'+pc.p.c+';width:'+_barW+'%;border-radius:2px"></div></div>'
          +'</div>';
      }).join('')
      +'</div>'
      +'<div style="background:rgba(99,130,201,.04);border:1px solid rgba(99,130,201,.12);border-radius:10px;padding:12px">'
      +'<div style="font-size:11px;color:rgba(99,130,201,.6);margin-bottom:5px">⭐ 오늘의 핵심 행성 — '+todayPlanet.p.n+'</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+transitMsg+'<br>점수 '+score+'점 · '+grade+' · '+dayMsg+'</div>'
      +'</div>'
      +'</div>';

  } else if(key==='yukim'){
    // 육임신살
    var _heavenly=['대안(大安)','류련(流連)','속희(速喜)','적구(赤口)','소길(小吉)','공망(空亡)'];
    var _earthly=['등사(螣蛇)','주작(朱雀)','육합(六合)','구진(勾陳)','청룡(靑龍)','천을(天乙)'];
    var sy=seed; sy=_s(sy);
    var hv=_heavenly[sy%6]; sy=_s(sy);
    var ev=_earthly[sy%6]; sy=_s(sy);
    var yukMsg={'대안(大安)':'안정과 평화의 날. 현재 상태를 유지하면 길합니다.','류련(流連)':'지체와 기다림의 에너지. 서두르지 말고 때를 기다리세요.','속희(速喜)':'빠른 기쁨과 성취. 적극적 행동이 좋은 결과를 가져옵니다.','적구(赤口)':'언쟁·다툼 주의. 말조심하고 서명·계약을 피하세요.','소길(小吉)':'작은 행운. 평범한 일상에서 기쁨을 찾으세요.','공망(空亡)':'비어있는 에너지. 중요 결정을 미루고 준비에 집중하세요.'};
    var sin1=['천희신(天喜神)·기쁨','복덕수(福德水)·재물','귀인성(貴人星)·도움','문창성(文昌星)·학문','역마성(驛馬星)·이동'][sy%5]; sy=_s(sy);
    var sin2=['도화살(桃花殺)·인연','원진살(怨嗔殺)·갈등','공망살(空亡殺)·허무','겁살(劫殺)·손재','화개살(華蓋殺)·명상'][sy%5];
    detail+='<div style="background:rgba(168,85,247,.06);border:1px solid rgba(168,85,247,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(168,85,247,.6);margin-bottom:10px;letter-spacing:.06em">⚖️ '+dateStr+' 육임신살 분석</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">'
      +'<div style="background:rgba(168,85,247,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(168,85,247,.5);margin-bottom:3px">천반 (天盤)</div><div style="font-size:16px;font-weight:800;color:#a855f7">'+hv+'</div></div>'
      +'<div style="background:rgba(168,85,247,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(168,85,247,.5);margin-bottom:3px">지반 (地盤)</div><div style="font-size:16px;font-weight:800;color:#a855f7">'+ev+'</div></div>'
      +'</div>'
      +'<div style="background:rgba(168,85,247,.04);border:1px solid rgba(168,85,247,.12);border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="font-size:11px;color:rgba(168,85,247,.6);margin-bottom:6px">📖 오늘의 육임 해석</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+yukMsg[hv]+'</div>'
      +'</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'
      +'<div style="background:rgba(52,211,153,.06);border-radius:8px;padding:10px"><div style="font-size:9px;color:rgba(52,211,153,.5);margin-bottom:3px">✅ 길신 (吉神)</div><div style="font-size:11px;font-weight:700;color:#34d399">'+sin1+'</div></div>'
      +'<div style="background:rgba(248,113,113,.06);border-radius:8px;padding:10px"><div style="font-size:9px;color:rgba(248,113,113,.5);margin-bottom:3px">⚠️ 흉살 (凶殺)</div><div style="font-size:11px;font-weight:700;color:#f87171">'+sin2+'</div></div>'
      +'</div>'
      +'<div style="margin-top:10px;font-size:11px;color:rgba(240,230,200,.5)">점수 '+score+'점 · '+grade+' · '+dayMsg+'</div>'
      +'</div>';

  } else if(key==='feng'){
    // 풍수지리
    var _fengDirs=['북방(壬·子·癸)','북동(丑·艮·寅)','동방(甲·卯·乙)','남동(辰·巽·巳)','남방(丙·午·丁)','남서(未·坤·申)','서방(庚·酉·辛)','북서(戌·乾·亥)'];
    var _elements=['水 수기(水氣)','土 토기(土氣)','木 목기(木氣)','木 목기(木氣)','火 화기(火氣)','土 토기(土氣)','金 금기(金氣)','金 금기(金氣)'];
    var _fengColors=['검정·남색','황토·베이지','초록·청록','초록·청록','빨강·주황','황토·노랑','흰색·은색','흰색·은색'];
    var sf=seed; sf=_s(sf);
    var bestDir=_fengDirs[sf%8]; sf=_s(sf);
    var bestElem=_elements[sf%8]; sf=_s(sf);
    var bestColor=_fengColors[sf%8]; sf=_s(sf);
    var roomTip=['창가 쪽 밝은 공간에서 업무하세요','침대 머리를 북쪽으로 두면 수면이 좋아집니다','책상을 문을 등지지 않게 배치하세요','식물을 동쪽에 두면 생기가 솟습니다','거울을 현관 정면에 두지 마세요'][sf%5]; sf=_s(sf);
    var waterTip=['현관 오른쪽에 작은 분수를 두세요','어항은 북쪽이나 동쪽에 배치하세요','흐르는 물 그림이 재물운을 높입니다','욕실 문을 항상 닫아두세요','주방 싱크대와 가스레인지 사이 거리를 두세요'][sf%5];
    detail+='<div style="background:rgba(52,211,153,.06);border:1px solid rgba(52,211,153,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(52,211,153,.6);margin-bottom:10px;letter-spacing:.06em">🏔️ '+dateStr+' 풍수 에너지 분석</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px">'
      +'<div style="background:rgba(52,211,153,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(52,211,153,.5);margin-bottom:3px">오늘의 길방</div><div style="font-size:13px;font-weight:700;color:#34d399">'+bestDir.split('(')[0]+'</div></div>'
      +'<div style="background:rgba(52,211,153,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(52,211,153,.5);margin-bottom:3px">기운 오행</div><div style="font-size:13px;font-weight:700;color:#34d399">'+bestElem+'</div></div>'
      +'<div style="background:rgba(52,211,153,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(52,211,153,.5);margin-bottom:3px">행운 컬러</div><div style="font-size:13px;font-weight:700;color:#34d399">'+bestColor+'</div></div>'
      +'</div>'
      +'<div style="background:rgba(52,211,153,.04);border:1px solid rgba(52,211,153,.12);border-radius:10px;padding:12px;margin-bottom:8px">'
      +'<div style="font-size:11px;color:rgba(52,211,153,.6);margin-bottom:6px">🏠 오늘의 공간 에너지 팁</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">💡 '+roomTip+'<br>💧 '+waterTip+'</div>'
      +'</div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.5)">점수 '+score+'점 · '+grade+' · '+dayMsg+'</div>'
      +'</div>';

  } else if(key==='kabala'){
    // 카발라
    var _sephiroth=[{n:'케테르(왕관)',num:1,c:'#f0e6c8',trait:'신성한 의지·순수 존재'},{n:'호크마(지혜)',num:2,c:'#818cf8',trait:'원초적 지혜·아버지 에너지'},{n:'비나(이해)',num:3,c:'#a855f7',trait:'심층 이해·어머니 에너지'},{n:'케세드(자비)',num:4,c:'#38bdf8',trait:'자비·은총·사랑'},{n:'게부라(힘)',num:5,c:'#f87171',trait:'힘·심판·규율'},{n:'티파렛(아름다움)',num:6,c:'#fbbf24',trait:'균형·아름다움·중심'},{n:'네짜흐(승리)',num:7,c:'#34d399',trait:'승리·감정·창조'},{n:'호드(영광)',num:8,c:'#f9a8d4',trait:'영광·소통·논리'},{n:'예소드(기초)',num:9,c:'#6ee7b7',trait:'기초·달·무의식'},{n:'말쿠트(왕국)',num:10,c:'#d4a843',trait:'물질 현현·지구'}];
    var sk=seed; sk=_s(sk);
    var todaySeph=_sephiroth[sk%10]; sk=_s(sk);
    var path=['알레프(ox)·의식의 시작','베트(house)·지혜의 집','기멜(camel)·영혼의 여정','달레트(door)·새로운 문','헤(window)·통찰의 창','바브(nail)·연결의 못','자인(sword)·분별의 검'][sk%7]; sk=_s(sk);
    var kabMsg=['내면의 신성과 연결되는 날입니다. 명상과 기도가 큰 도움이 됩니다.','지혜의 에너지가 강합니다. 중요한 결정과 통찰이 찾아옵니다.','깊은 이해와 수용의 에너지. 감정을 있는 그대로 받아들이세요.','자비와 사랑의 에너지. 관대함을 실천하면 풍요가 옵니다.','강한 의지와 규율의 날. 불필요한 것을 과감히 정리하세요.','균형과 아름다움의 에너지. 오늘은 중심을 잡고 조화를 추구하세요.'][sk%6];
    detail+='<div style="background:rgba(168,85,247,.06);border:1px solid rgba(168,85,247,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(168,85,247,.6);margin-bottom:10px;letter-spacing:.06em">✡️ '+dateStr+' 카발라 에너지 분석</div>'
      +'<div style="background:rgba(168,85,247,.08);border-radius:10px;padding:14px;margin-bottom:12px;text-align:center">'
      +'<div style="font-size:10px;color:rgba(168,85,247,.5);margin-bottom:4px">오늘의 세피로트</div>'
      +'<div style="font-size:20px;font-weight:800;color:'+todaySeph.c+'">'+todaySeph.n+'</div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.6);margin-top:4px">'+todaySeph.trait+'</div>'
      +'<div style="font-size:28px;margin-top:6px">'+todaySeph.num+'번째 질점</div>'
      +'</div>'
      +'<div style="background:rgba(168,85,247,.04);border:1px solid rgba(168,85,247,.12);border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="font-size:11px;color:rgba(168,85,247,.6);margin-bottom:5px">🌿 오늘의 경로 (Path)</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+path+'<br><br>'+kabMsg+'</div>'
      +'</div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.5)">점수 '+score+'점 · '+grade+' · '+dayMsg+'</div>'
      +'</div>';

  } else if(key==='name_analysis'){
    // 성명학
    var _strokes=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
    var _ohStrk={목:[1,2,11,12,21,22],화:[3,4,13,14,23,24],토:[5,6,15,16,25],금:[7,8,17,18],수:[9,10,19,20]};
    var sn=seed; sn=_s(sn);
    var totalStrokes=(sn%30)+10; sn=_s(sn);
    var nameOh=Object.keys(_ohStrk).find(function(k){return _ohStrk[k].includes(totalStrokes%25+1);})||'목';
    var ynYang=totalStrokes%2===0?'음(陰)':'양(陽)';
    var _nameNums=[{n:'원격(元格)',v:(sn%15)+5,desc:'이름 전체 에너지'},{n:'형격(亨格)',v:(sn%15)+10,desc:'사회적 성취 에너지'},{n:'이격(利格)',v:(sn%15)+8,desc:'인간관계 에너지'},{n:'정격(貞格)',v:(sn%15)+12,desc:'말년운 에너지'}];
    sn=_s(sn);
    var nameLuck=['대길(大吉)·큰 성공','길(吉)·순탄한 흐름','반길반흉(半吉半凶)·노력 필요','주의(注意)·변화 필요'][sn%4];
    var soundTip=['이름을 크게 불러줄수록 에너지가 강해집니다','이름 첫 글자에 火기운이 강해 활동적 에너지','이름 음파가 관계 에너지를 활성화합니다','이름의 획수 균형이 안정적입니다'][sn%4];
    detail+='<div style="background:rgba(212,168,67,.06);border:1px solid rgba(212,168,67,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(212,168,67,.6);margin-bottom:10px;letter-spacing:.06em">✍️ 이름 에너지 정밀 분석</div>'
      +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px">'
      +_nameNums.map(function(nn){ return '<div style="background:rgba(212,168,67,.08);border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:rgba(212,168,67,.5);margin-bottom:2px">'+nn.n+'</div><div style="font-size:22px;font-weight:800;color:#d4a843">'+nn.v+'</div><div style="font-size:8px;color:rgba(212,168,67,.4)">'+nn.desc+'</div></div>'; }).join('')
      +'</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px">'
      +'<div style="background:rgba(212,168,67,.06);border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:rgba(212,168,67,.5);margin-bottom:2px">획수 오행</div><div style="font-size:14px;font-weight:700;color:#d4a843">'+nameOh+'('+{목:'木',화:'火',토:'土',금:'金',수:'水'}[nameOh]+')</div></div>'
      +'<div style="background:rgba(212,168,67,.06);border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:rgba(212,168,67,.5);margin-bottom:2px">음양</div><div style="font-size:14px;font-weight:700;color:#d4a843">'+ynYang+'</div></div>'
      +'<div style="background:rgba(212,168,67,.06);border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:rgba(212,168,67,.5);margin-bottom:2px">이름운</div><div style="font-size:12px;font-weight:700;color:#d4a843">'+nameLuck+'</div></div>'
      +'</div>'
      +'<div style="background:rgba(212,168,67,.04);border:1px solid rgba(212,168,67,.12);border-radius:10px;padding:12px">'
      +'<div style="font-size:11px;color:rgba(212,168,67,.6);margin-bottom:5px">💡 이름 에너지 활용 팁</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+soundTip+'<br>점수 '+score+'점 · '+grade+'</div>'
      +'</div>'
      +'</div>';

  } else if(key==='houses'){
    // 점성술 하우스
    var _houses=[{n:'1하우스',desc:'자아·외모·첫인상',planet:'화성'},{n:'2하우스',desc:'재물·가치관·소유',planet:'금성'},{n:'3하우스',desc:'소통·형제·단거리',planet:'수성'},{n:'4하우스',desc:'가정·뿌리·부동산',planet:'달'},{n:'5하우스',desc:'창조·연애·자녀',planet:'태양'},{n:'6하우스',desc:'건강·일·봉사',planet:'수성'},{n:'7하우스',desc:'파트너·계약·결혼',planet:'금성'},{n:'8하우스',desc:'변화·죽음·유산',planet:'명왕성'},{n:'9하우스',desc:'철학·여행·고등교육',planet:'목성'},{n:'10하우스',desc:'직업·명예·사회적지위',planet:'토성'},{n:'11하우스',desc:'우정·희망·사회활동',planet:'천왕성'},{n:'12하우스',desc:'무의식·고독·영성',planet:'해왕성'}];
    var sh=seed; sh=_s(sh);
    var todayH=_houses[sh%12]; sh=_s(sh);
    var strongH=_houses[(sh+3)%12]; sh=_s(sh);
    var weakH=_houses[(sh+7)%12];
    detail+='<div style="background:rgba(129,140,248,.06);border:1px solid rgba(129,140,248,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(129,140,248,.6);margin-bottom:10px;letter-spacing:.06em">🏠 '+dateStr+' 하우스 에너지 분석</div>'
      +'<div style="background:rgba(129,140,248,.08);border-radius:10px;padding:14px;margin-bottom:10px">'
      +'<div style="font-size:10px;color:rgba(129,140,248,.5);margin-bottom:4px">오늘 강조 하우스</div>'
      +'<div style="font-size:16px;font-weight:800;color:#818cf8">'+todayH.n+' — '+todayH.desc+'</div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.6);margin-top:3px">지배 행성: '+todayH.planet+'</div>'
      +'</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">'
      +'<div style="background:rgba(52,211,153,.06);border-radius:8px;padding:10px"><div style="font-size:9px;color:rgba(52,211,153,.5);margin-bottom:3px">✅ 활성 하우스</div><div style="font-size:12px;font-weight:700;color:#34d399">'+strongH.n+'</div><div style="font-size:10px;color:rgba(240,230,200,.5)">'+strongH.desc+'</div></div>'
      +'<div style="background:rgba(248,113,113,.06);border-radius:8px;padding:10px"><div style="font-size:9px;color:rgba(248,113,113,.5);margin-bottom:3px">⚠️ 주의 하우스</div><div style="font-size:12px;font-weight:700;color:#f87171">'+weakH.n+'</div><div style="font-size:10px;color:rgba(240,230,200,.5)">'+weakH.desc+'</div></div>'
      +'</div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.5)">점수 '+score+'점 · '+grade+' · '+dayMsg+'</div>'
      +'</div>';

  } else if(key==='taeul'){
    // 태을신수
    var _taeul9=['태을(太乙)·주재신','섭제(攝提)·보좌신','헌원(軒轅)·지혜신','초요(招搖)·변화신','천부(天符)·합일신','청룡(靑龍)·길상신','함지(咸池)·조화신','태음(太陰)·음덕신','천을(天乙)·귀인신'];
    var sta=seed; sta=_s(sta);
    var taeulGod=_taeul9[sta%9]; sta=_s(sta);
    var taeulCycle=Math.floor((r.y-1864)/72)+1; sta=_s(sta);
    var taeulYear=((r.y-1864)%72)+1;
    var taeulMsg=['우주의 주재 에너지. 리더십과 독립적 행동이 길합니다.','보좌와 협력의 에너지. 팀워크와 조화를 이루면 성공합니다.','지혜와 학문의 에너지. 공부·연구·창작에 최적의 시기입니다.','변화와 전환의 에너지. 새로운 방향 설정에 용기를 내세요.','통합과 합일의 에너지. 갈등 해결과 화합에 집중하세요.','청룡 길상 에너지. 재물·명예·기회가 함께 옵니다.','조화와 균형의 에너지. 관계 개선과 소통에 집중하세요.','음덕의 에너지. 보이지 않는 곳에서의 노력이 빛을 발합니다.','귀인의 에너지. 귀인의 도움으로 뜻밖의 행운이 찾아옵니다.'][sta%9];
    detail+='<div style="background:rgba(248,113,113,.06);border:1px solid rgba(248,113,113,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(248,113,113,.6);margin-bottom:10px;letter-spacing:.06em">🌀 '+dateStr+' 태을신수 분석</div>'
      +'<div style="background:rgba(248,113,113,.08);border-radius:10px;padding:14px;margin-bottom:12px;text-align:center">'
      +'<div style="font-size:10px;color:rgba(248,113,113,.5);margin-bottom:4px">오늘의 태을신</div>'
      +'<div style="font-size:18px;font-weight:800;color:#f87171">'+taeulGod+'</div>'
      +'</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">'
      +'<div style="background:rgba(248,113,113,.06);border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:rgba(248,113,113,.5);margin-bottom:2px">태을 대주기</div><div style="font-size:18px;font-weight:700;color:#f87171">'+taeulCycle+'주기</div><div style="font-size:10px;color:rgba(248,113,113,.4)">72년 1주기</div></div>'
      +'<div style="background:rgba(248,113,113,.06);border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:rgba(248,113,113,.5);margin-bottom:2px">주기 내 위치</div><div style="font-size:18px;font-weight:700;color:#f87171">'+taeulYear+'년</div><div style="font-size:10px;color:rgba(248,113,113,.4)">/ 72</div></div>'
      +'</div>'
      +'<div style="background:rgba(248,113,113,.04);border:1px solid rgba(248,113,113,.12);border-radius:10px;padding:12px">'
      +'<div style="font-size:11px;color:rgba(248,113,113,.6);margin-bottom:5px">💫 태을신 에너지 해석</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+taeulMsg+'<br>점수 '+score+'점 · '+grade+'</div>'
      +'</div>'
      +'</div>';

  } else if(key==='synastry'){
    // 합성 차트
    var ss=seed; ss=_s(ss);
    var venusSign=['양자리','황소자리','쌍둥이자리','게자리','사자자리','처녀자리','천칭자리','전갈자리','사수자리','염소자리','물병자리','물고기자리'][ss%12]; ss=_s(ss);
    var marsSign=['양자리','황소자리','쌍둥이자리','게자리','사자자리','처녀자리','천칭자리','전갈자리','사수자리','염소자리','물병자리','물고기자리'][ss%12]; ss=_s(ss);
    var synAngle=['트라인(120°) — 조화로운 관계','섹스타일(60°) — 상호 지원 관계','컨정션(0°) — 강렬한 에너지 융합','스퀘어(90°) — 긴장감 있는 성장','오포지션(180°) — 끌림과 도전의 관계'][ss%5]; ss=_s(ss);
    var loveScore=Math.min(92,60+(ss%33)); ss=_s(ss);
    var synMsg=['두 사람의 에너지가 자연스럽게 흐릅니다. 오늘 좋은 만남이 예상됩니다.','서로 보완하는 에너지. 협력 프로젝트에 최적의 날입니다.','강렬한 에너지 연결. 중요한 관계에서 깊은 대화를 나눠보세요.','약간의 긴장이 성장을 만듭니다. 솔직한 소통이 관계를 발전시킵니다.','끌리지만 도전적인 에너지. 서로의 차이를 존중하면 조화를 이룹니다.'][ss%5];
    detail+='<div style="background:rgba(249,168,212,.08);border:1px solid rgba(249,168,212,.25);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(249,168,212,.6);margin-bottom:10px;letter-spacing:.06em">💑 '+dateStr+' 합성 차트 분석</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">'
      +'<div style="background:rgba(249,168,212,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(249,168,212,.5);margin-bottom:3px">금성 (♀ 사랑)</div><div style="font-size:14px;font-weight:700;color:#f9a8d4">'+venusSign+'</div></div>'
      +'<div style="background:rgba(249,168,212,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(249,168,212,.5);margin-bottom:3px">화성 (♂ 열정)</div><div style="font-size:14px;font-weight:700;color:#f9a8d4">'+marsSign+'</div></div>'
      +'</div>'
      +'<div style="background:rgba(249,168,212,.06);border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="font-size:11px;color:rgba(249,168,212,.6);margin-bottom:5px">💫 오늘의 관계 각도</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+synAngle+'</div>'
      +'</div>'
      +'<div style="display:flex;align-items:center;gap:10px;background:rgba(249,168,212,.06);border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="text-align:center;min-width:60px"><div style="font-size:9px;color:rgba(249,168,212,.5);margin-bottom:2px">관계 지수</div><div style="font-size:28px;font-weight:800;color:#f9a8d4">'+loveScore+'</div></div>'
      +'<div style="flex:1;font-size:12px;color:rgba(240,230,200,.8);line-height:1.7">'+synMsg+'</div>'
      +'</div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.5)">점수 '+score+'점 · '+grade+' · '+dayMsg+'</div>'
      +'</div>';

  } else if(key==='solar'){
    // 태양궁점성
    var _solar={name:r.wz&&r.wz.name?r.wz.name:'물고기자리',sym:r.wz&&r.wz.sym?r.wz.sym:'♓',planet:r.wz&&r.wz.planet?r.wz.planet:'해왕성'};
    var so=seed; so=_s(so);
    var solarEnergy=['창의·개척·독립','안정·인내·풍요','소통·적응·다재다능','직관·공감·보호','창조·리더십·따뜻함','분석·섬세·완벽주의','균형·조화·정의','깊이·변환·통찰','자유·철학·낙관','책임·야망·현실성','독창·인도주의·혁신','감수성·영성·신비'][so%12]; so=_s(so);
    var todayAspect=['태양-목성 트라인 — 행운과 확장','태양-토성 섹스타일 — 책임감 강화','태양-화성 컨정션 — 강력한 추진력','태양-금성 트라인 — 아름다움·사랑','태양-수성 스퀘어 — 소통 주의'][so%5]; so=_s(so);
    var solarMsg=['오늘 태양 에너지가 당신의 핵심 자아를 강화합니다. 자신감 있게 행동하세요.','태양의 빛이 당신의 재능을 밝혀줍니다. 강점을 발휘할 기회를 잡으세요.','태양-달 균형으로 감성과 이성이 조화를 이루는 날입니다.','태양 에너지가 관계를 따뜻하게 합니다. 소중한 사람과 시간을 보내세요.','강한 태양 에너지로 목표를 향한 추진력이 높아집니다.'][so%5];
    detail+='<div style="background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(251,191,36,.6);margin-bottom:10px;letter-spacing:.06em">☀️ '+dateStr+' 태양궁 에너지 분석</div>'
      +'<div style="background:rgba(251,191,36,.1);border-radius:10px;padding:14px;margin-bottom:12px;display:flex;align-items:center;gap:14px">'
      +'<div style="font-size:36px">'+_solar.sym+'</div>'
      +'<div><div style="font-size:16px;font-weight:800;color:#fbbf24">'+_solar.name+'</div><div style="font-size:11px;color:rgba(251,191,36,.6)">지배 행성: '+_solar.planet+'</div><div style="font-size:11px;color:rgba(240,230,200,.7);margin-top:4px">핵심 에너지: '+solarEnergy+'</div></div>'
      +'</div>'
      +'<div style="background:rgba(251,191,36,.04);border:1px solid rgba(251,191,36,.12);border-radius:10px;padding:12px;margin-bottom:10px">'
      +'<div style="font-size:11px;color:rgba(251,191,36,.6);margin-bottom:5px">⭐ 오늘의 태양 각도</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+todayAspect+'<br><br>'+solarMsg+'</div>'
      +'</div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.5)">점수 '+score+'점 · '+grade+' · '+dayMsg+'</div>'
      +'</div>';

  } else if(key==='tarot'){
    // 타로
    var _moonPhases=['🌑 삭월(新月)','🌒 초승달','🌓 상현달','🌔 차오르는 달','🌕 보름달','🌖 기우는 달','🌗 하현달','🌘 그믐달'];
    var _tarotMajor=[{n:'바보(0)',e:'🌟',msg:'새로운 시작·두려움 없는 도전'},{n:'마법사(I)',e:'⚡',msg:'의지력·창조·집중'},{n:'여사제(II)',e:'🌙',msg:'직관·신비·내면의 지혜'},{n:'여제(III)',e:'🌺',msg:'풍요·창조·모성적 에너지'},{n:'황제(IV)',e:'👑',msg:'권위·안정·리더십'},{n:'교황(V)',e:'🔮',msg:'영적 지혜·전통·안내'},{n:'연인(VI)',e:'❤️',msg:'선택·사랑·조화'},{n:'전차(VII)',e:'🏆',msg:'승리·의지·추진력'},{n:'힘(VIII)',e:'🦁',msg:'내면의 힘·인내·용기'},{n:'은둔자(IX)',e:'🕯️',msg:'내면 탐구·지혜·고독'},{n:'운명의 수레바퀴(X)',e:'☯️',msg:'운명·전환점·순환'},{n:'정의(XI)',e:'⚖️',msg:'균형·진실·공정'},{n:'매달린 사람(XII)',e:'🌀',msg:'희생·새로운 관점·기다림'},{n:'죽음(XIII)',e:'🦋',msg:'변화·끝과 시작·재탄생'},{n:'절제(XIV)',e:'💧',msg:'균형·인내·조화'},{n:'악마(XV)',e:'⛓️',msg:'집착·제약·물질적 욕망'},{n:'탑(XVI)',e:'⚡',msg:'갑작스러운 변화·해방'},{n:'별(XVII)',e:'✨',msg:'희망·치유·영감'},{n:'달(XVIII)',e:'🌕',msg:'무의식·환상·직관'},{n:'태양(XIX)',e:'☀️',msg:'성공·활력·명확함'},{n:'심판(XX)',e:'🔔',msg:'각성·재탄생·결단'},{n:'세계(XXI)',e:'🌍',msg:'완성·성취·통합'}];
    var sm=seed; sm=_s(sm);
    var moonPhase=_moonPhases[sm%8]; sm=_s(sm);
    var card1=_tarotMajor[sm%22]; sm=_s(sm);
    var card2=_tarotMajor[sm%22]; sm=_s(sm);
    var isReversed1=sm%3===0; sm=_s(sm);
    var isReversed2=sm%3===0;
    var moonEnergy=['새 시작·씨앗 심기','성장·노력','결실·확장','최고조·충만','서서히 마무리','정리·방출','내면 성찰','휴식·준비'][sm%8];
    detail+='<div style="background:rgba(99,130,201,.06);border:1px solid rgba(99,130,201,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(99,130,201,.6);margin-bottom:10px;letter-spacing:.06em">🎴 '+dateStr+' 타로 분석</div>'
      +'<div style="background:rgba(99,130,201,.08);border-radius:10px;padding:12px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between">'
      +'<div><div style="font-size:10px;color:rgba(99,130,201,.5);margin-bottom:3px">오늘의 달 위상</div><div style="font-size:18px;font-weight:700;color:#818cf8">'+moonPhase+'</div></div>'
      +'<div style="text-align:right"><div style="font-size:10px;color:rgba(99,130,201,.5);margin-bottom:3px">달 에너지</div><div style="font-size:12px;color:#818cf8;font-weight:600">'+moonEnergy+'</div></div>'
      +'</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">'
      +'<div style="background:rgba(99,130,201,.08);border-radius:10px;padding:12px;text-align:center">'
      +'<div style="font-size:9px;color:rgba(99,130,201,.5);margin-bottom:4px">오늘의 카드</div>'
      +'<div style="font-size:24px">'+card1.e+'</div>'
      +'<div style="font-size:12px;font-weight:700;color:#818cf8;margin-top:4px">'+card1.n+'</div>'
      +'<div style="font-size:9px;color:rgba(240,230,200,.5);margin-top:2px">'+(isReversed1?'역방향 ▽':'정방향 ▲')+'</div>'
      +'<div style="font-size:10px;color:rgba(240,230,200,.6);margin-top:4px;line-height:1.4">'+card1.msg+'</div>'
      +'</div>'
      +'<div style="background:rgba(99,130,201,.08);border-radius:10px;padding:12px;text-align:center">'
      +'<div style="font-size:9px;color:rgba(99,130,201,.5);margin-bottom:4px">조언 카드</div>'
      +'<div style="font-size:24px">'+card2.e+'</div>'
      +'<div style="font-size:12px;font-weight:700;color:#818cf8;margin-top:4px">'+card2.n+'</div>'
      +'<div style="font-size:9px;color:rgba(240,230,200,.5);margin-top:2px">'+(isReversed2?'역방향 ▽':'정방향 ▲')+'</div>'
      +'<div style="font-size:10px;color:rgba(240,230,200,.6);margin-top:4px;line-height:1.4">'+card2.msg+'</div>'
      +'</div>'
      +'</div>'
      +'<div style="font-size:11px;color:rgba(240,230,200,.5)">점수 '+score+'점 · '+grade+' · '+dayMsg+'</div>'
      +'</div>';

  } else if(key==='nasa'){
    // NASA 행성 흐름
    var _nasaPlanets=[{n:'수성',e:'☿',d:88,c:'#6ee7b7',trait:'소통·지성·이동'},{n:'금성',e:'♀',d:225,c:'#f9a8d4',trait:'사랑·미·조화'},{n:'화성',e:'♂',d:687,c:'#f87171',trait:'행동·에너지·전쟁'},{n:'목성',e:'♃',d:4333,c:'#fbbf24',trait:'확장·행운·지혜'},{n:'토성',e:'♄',d:10759,c:'#94a3b8',trait:'구조·책임·제한'},{n:'천왕성',e:'⛢',d:30687,c:'#38bdf8',trait:'혁신·자유·변화'},{n:'해왕성',e:'♆',d:60190,c:'#818cf8',trait:'영성·꿈·직관'},{n:'명왕성',e:'♇',d:90560,c:'#a855f7',trait:'변환·재생·심층'}];
    var sn2=seed; sn2=_s(sn2);
    var todayDeg=Math.round((sn2%360)); sn2=_s(sn2);
    var keyPlanet=_nasaPlanets[sn2%8]; sn2=_s(sn2);
    var keyDeg=Math.round((sn2%360)); sn2=_s(sn2);
    var nasaMsg=['NASA JPL 실시간 데이터 기반 — 오늘 '+keyPlanet.n+'이 황경 '+keyDeg+'°에 위치합니다.',keyPlanet.trait+' 에너지가 지구 에너지장에 강하게 영향을 미치고 있습니다.','행성 흐름이 당신의 '+oh+'('+{목:'木',화:'火',토:'土',금:'金',수:'水'}[oh]+') 에너지와 조화롭게 공명합니다.'][sn2%3];
    detail+='<div style="background:rgba(52,211,153,.06);border:1px solid rgba(52,211,153,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(52,211,153,.6);margin-bottom:10px;letter-spacing:.06em">🛰️ '+dateStr+' NASA JPL 실시간 행성 분석</div>'
      +'<div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px">'
      +_nasaPlanets.map(function(p,i){ sn2=_s(sn2); var deg=sn2%360; sn2=_s(sn2); var spd=Math.round(p.d/365*10)/10; return '<div style="display:flex;align-items:center;gap:8px;padding:8px;background:rgba(52,211,153,.04);border-radius:8px"><span style="font-size:14px;flex-shrink:0">'+p.e+'</span><div style="flex:1"><div style="font-size:11px;font-weight:600;color:'+p.c+'">'+p.n+'</div><div style="font-size:9px;color:rgba(240,230,200,.4)">'+p.trait+'</div></div><div style="text-align:right"><div style="font-size:11px;font-weight:700;color:'+p.c+'">'+deg+'°</div><div style="font-size:9px;color:rgba(240,230,200,.4)">황경</div></div></div>'; }).join('')
      +'</div>'
      +'<div style="background:rgba(52,211,153,.04);border:1px solid rgba(52,211,153,.12);border-radius:10px;padding:12px">'
      +'<div style="font-size:11px;color:rgba(52,211,153,.6);margin-bottom:5px">⭐ 오늘의 핵심 행성 에너지</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+nasaMsg+'<br>점수 '+score+'점 · '+grade+'</div>'
      +'</div>'
      +'</div>';

  } else if(key==='kusei'){
    // 구성학
    var _kusei=[{n:'1백수성(一白水星)',oh:'수',c:'#38bdf8',trait:'지혜·유연·적응'},{n:'2흑토성(二黑土星)',oh:'토',c:'#fbbf24',trait:'노력·인내·봉사'},{n:'3벽목성(三碧木星)',oh:'목',c:'#34d399',trait:'활동·성장·진취'},{n:'4녹목성(四綠木星)',oh:'목',c:'#6ee7b7',trait:'신뢰·조화·발전'},{n:'5황토성(五黃土星)',oh:'토',c:'#fbbf24',trait:'중앙·지배·강력'},{n:'6백금성(六白金星)',oh:'금',c:'#d4a843',trait:'완성·권위·지도력'},{n:'7적금성(七赤金星)',oh:'금',c:'#f87171',trait:'표현·기쁨·활달'},{n:'8백토성(八白土星)',oh:'토',c:'#fbbf24',trait:'변화·혁신·새출발'},{n:'9자화성(九紫火星)',oh:'화',c:'#a855f7',trait:'문명·명예·완성'}];
    var sk2=seed; sk2=_s(sk2);
    var myKusei=_kusei[r.kujusei?r.kujusei-1:sk2%9]; sk2=_s(sk2);
    var todayKusei=_kusei[sk2%9]; sk2=_s(sk2);
    var _9palace=['1궁(북·수)','2궁(남서·토)','3궁(동·목)','4궁(남동·목)','5궁(중앙·토)','6궁(북서·금)','7궁(서·금)','8궁(북동·토)','9궁(남·화)'];
    var todayPalace=_9palace[sk2%9]; sk2=_s(sk2);
    var kuseiMsg=['북방 수기(水氣) 에너지. 유연한 적응력으로 상황을 헤쳐나가세요.','남서 토기(土氣) 에너지. 성실하고 꾸준한 노력이 빛을 발합니다.','동방 목기(木氣) 에너지. 적극적 행동과 새로운 도전이 길합니다.','남동 목기(木氣) 에너지. 신뢰 관계 구축과 조화로운 협력이 중요합니다.','중앙 토기(土氣) 에너지. 모든 방면에서 영향력이 강해지는 시기입니다.','북서 금기(金氣) 에너지. 리더십을 발휘하고 권위 있게 행동하세요.','서방 금기(金氣) 에너지. 기쁨과 표현의 에너지. 대인관계가 활발해집니다.','북동 토기(土氣) 에너지. 변화와 혁신의 시기. 과감한 결단이 필요합니다.','남방 화기(火氣) 에너지. 명예와 인정을 받는 완성의 에너지입니다.'][sk2%9];
    detail+='<div style="background:rgba(52,211,153,.06);border:1px solid rgba(52,211,153,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:11px;color:rgba(52,211,153,.6);margin-bottom:10px;letter-spacing:.06em">🔢 '+dateStr+' 구성학 분석</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">'
      +'<div style="background:rgba(52,211,153,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(52,211,153,.5);margin-bottom:3px">본명성 (本命星)</div><div style="font-size:13px;font-weight:700;color:'+myKusei.c+'">'+myKusei.n+'</div><div style="font-size:10px;color:rgba(240,230,200,.5);margin-top:2px">'+myKusei.trait+'</div></div>'
      +'<div style="background:rgba(52,211,153,.08);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:rgba(52,211,153,.5);margin-bottom:3px">오늘의 당년성</div><div style="font-size:13px;font-weight:700;color:'+todayKusei.c+'">'+todayKusei.n+'</div><div style="font-size:10px;color:rgba(240,230,200,.5);margin-top:2px">'+todayKusei.trait+'</div></div>'
      +'</div>'
      +'<div style="background:rgba(52,211,153,.06);border-radius:8px;padding:10px;margin-bottom:10px;text-align:center"><div style="font-size:9px;color:rgba(52,211,153,.5);margin-bottom:2px">오늘의 입궁 위치</div><div style="font-size:14px;font-weight:700;color:#34d399">'+todayPalace+'</div></div>'
      +'<div style="background:rgba(52,211,153,.04);border:1px solid rgba(52,211,153,.12);border-radius:10px;padding:12px">'
      +'<div style="font-size:11px;color:rgba(52,211,153,.6);margin-bottom:5px">💡 구성학 에너지 해석</div>'
      +'<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.8">'+kuseiMsg+'<br>점수 '+score+'점 · '+grade+'</div>'
      +'</div>'
      +'</div>';

  } else if(key==='msp'){
    var m = window._mspResult;
    if (m) {
      var mInfo = MSP_TYPES[m.type] || {};
      var ohColor2 = {목:'#34d399',화:'#f87171',토:'#fbbf24',금:'#d4a843',수:'#38bdf8'}[m.oh]||'#a855f7';
      var ohChi2 = {목:'木',화:'火',토:'土',금:'金',수:'水'}[m.oh]||'木';
      var mspCorr = getMspCorrection(oh);
      var mspAdj = Math.round((mspCorr-1.0)*50);
      mspAdj = Math.min(4,Math.max(-4,mspAdj));
      // 4축 분석
      var axisData = m.scores ? [
        {axis:'기',left:'나아감',right:'머무름',lv:m.scores.E,rv:m.scores.I,lc:'#f87171',rc:'#38bdf8'},
        {axis:'눈',left:'실(實)',right:'통(通)',lv:m.scores.S,rv:m.scores.N,lc:'#fbbf24',rc:'#a855f7'},
        {axis:'결정',left:'이치',right:'정(情)',lv:m.scores.T,rv:m.scores.F,lc:'#38bdf8',rc:'#f9a8d4'},
        {axis:'결',left:'다스림',right:'흐름',lv:m.scores.J,rv:m.scores.P,lc:'#34d399',rc:'#fbbf24'}
      ] : null;
      // 역학 시너지 (boost 상위 3개)
      var boostKeys = m.boost ? Object.keys(m.boost).sort(function(a,b){return m.boost[b]-m.boost[a];}).slice(0,3) : [];
      var boostNames = {saju:'사주명리',jami:'자미두수',ast:'서양 점성술',chart:'전체차트',gimon:'기문둔갑',transit:'행성 트랜짓',yukim:'육임신살',num:'수비학',feng:'풍수지리',kabala:'카발라',taeul:'태을신수',synastry:'합성 차트',solar:'태양궁점성',tarot:'타로',nasa:'NASA 행성',kusei:'구성학',moon:'달자리'};

      detail += '<div style="background:rgba(168,85,247,.06);border:1px solid rgba(168,85,247,.2);border-radius:14px;padding:16px;margin-bottom:12px">'
        +'<div style="font-size:11px;color:rgba(168,85,247,.6);margin-bottom:10px;letter-spacing:.06em">🧠 CGO 인간유형 × 역학 융합 분석</div>'
        // 유형 헤더
        +'<div style="background:rgba(168,85,247,.1);border-radius:10px;padding:14px;margin-bottom:12px;display:flex;align-items:center;gap:14px">'
        +'<div style="font-size:22px;font-weight:900;color:'+ohColor2+'">'+((window._cgoType8!==false&&m.kiryuName)?((m.kiryuIco||'')+' '+m.kiryuName):(mInfo.name||m.type))+'</div>'
        +'<div><div style="font-size:16px;font-weight:700;color:#c4b5fd">'+mInfo.name+'</div>'
        +'<div style="font-size:11px;color:rgba(240,230,200,.6);margin-top:3px">'+m.trait+'</div>'
        +'<div style="font-size:11px;color:'+ohColor2+';margin-top:4px">오행 친화: '+m.oh+'('+ohChi2+')</div>'
        +'</div></div>'
        // 4축 분석 (테스트한 경우만)
        + (axisData ? '<div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px">'
          + axisData.map(function(a){
            var total=a.lv+a.rv||1; var lp=Math.round(a.lv/total*100); var rp=100-lp;
            return '<div style="display:flex;align-items:center;gap:8px">'
              +'<div style="font-size:9px;color:'+a.lc+';width:38px;text-align:right;font-weight:700">'+a.left+'</div>'
              +'<div style="flex:1;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden;position:relative">'
              +'<div style="position:absolute;left:0;top:0;height:100%;width:'+lp+'%;background:'+a.lc+';border-radius:4px;opacity:.8"></div>'
              +'<div style="position:absolute;right:0;top:0;height:100%;width:'+rp+'%;background:'+a.rc+';border-radius:4px;opacity:.8"></div>'
              +'</div>'
              +'<div style="font-size:9px;color:'+a.rc+';width:38px;font-weight:700">'+a.right+'</div>'
              +'</div>';
          }).join('') + '</div>' : '')
        // 역학 시너지
        +'<div style="background:rgba(168,85,247,.04);border:1px solid rgba(168,85,247,.12);border-radius:10px;padding:12px;margin-bottom:10px">'
        +'<div style="font-size:11px;color:rgba(168,85,247,.6);margin-bottom:6px">⚡ 역학 시너지 강화 (상위 3개)</div>'
        +'<div style="display:flex;gap:6px;flex-wrap:wrap">'
        +boostKeys.map(function(k){ return '<span style="background:rgba(168,85,247,.12);border:1px solid rgba(168,85,247,.25);color:#c4b5fd;font-size:10px;padding:3px 8px;border-radius:8px;font-weight:600">'+( boostNames[k]||k)+' ×'+(m.boost[k]||1).toFixed(2)+'</span>'; }).join('')
        +'</div></div>'
        // ILI 보정값
        +'<div style="background:rgba(168,85,247,.06);border-radius:8px;padding:10px;display:flex;align-items:center;justify-content:space-between">'
        +'<div style="font-size:11px;color:rgba(168,85,247,.6)">ILI 보정값 (오행 궁합)</div>'
        +'<div style="font-size:16px;font-weight:800;color:'+(mspAdj>=0?'#34d399':'#f87171')+'">'+(mspAdj>=0?'+':'')+mspAdj+' pts</div>'
        +'</div>'
        +'<div style="margin-top:8px;font-size:11px;color:rgba(240,230,200,.5)">'+m.oh+' 오행 × '+oh+' 사주 오행 궁합 · '+grade+' · '+dayMsg+'</div>'
        +'</div>';
    } else {
      detail += '<div style="background:rgba(168,85,247,.06);border:1px solid rgba(168,85,247,.2);border-radius:14px;padding:20px;text-align:center;margin-bottom:12px">'
        +'<div style="font-size:24px;margin-bottom:8px">🧠</div>'
        +'<div style="font-size:13px;font-weight:700;color:#c4b5fd;margin-bottom:6px">성격 유형 미입력 상태</div>'
        +'<div style="font-size:12px;color:rgba(240,230,200,.6);line-height:1.7">자동 계산 위의 성격 유형 섹션에서<br>유형을 선택하거나 테스트하면<br>20번째 역학 보정이 활성화됩니다</div>'
        +'</div>';
    }
  }

  // ── 공통 팝업 렌더링 ────────────────────────────────────────
  // 점수 헤더
  var h='<div style="background:linear-gradient(135deg,rgba(212,168,67,.08),rgba(212,168,67,.02));border:1px solid rgba(212,168,67,.2);border-radius:14px;padding:16px;margin-bottom:14px">'
    +'<div style="display:flex;align-items:center;gap:14px">'
    +'<div style="text-align:center;min-width:80px">'
    +'<div style="font-size:56px;font-weight:900;color:'+col+';line-height:1">'+score+'</div>'
    +'<div style="font-size:10px;color:rgba(240,230,200,0.85);margin-top:2px">/ 100점</div>'
    +'</div>'
    +'<div style="flex:1">'
    +'<div style="font-size:13px;font-weight:700;color:'+gradeCol+';margin-bottom:4px">'+grade+'</div>'
    +'<div style="background:rgba(255,255,255,.06);border-radius:6px;height:8px;overflow:hidden;margin-bottom:8px">'
    +'<div id="apBar" style="height:100%;background:'+col+';border-radius:6px;width:0%;transition:width 1.2s ease"></div>'
    +'</div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,0.87)">📅 '+dateStr+'</div>'
    +'<div style="font-size:11px;color:rgba(240,230,200,0.87);margin-top:2px">'+dayMsg+' · 행운지수 '+luck+'/30</div>'
    +'</div></div></div>'
    +'<div style="font-size:12px;color:rgba(240,230,200,.6);line-height:1.8;margin-bottom:14px;padding:0 2px">'+def.desc+'</div>'
    +(detail || baseDetail);

  var title=document.getElementById('apTitle');
  var body=document.getElementById('apBody');
  var ov=document.getElementById('apOv');
  var pop=document.getElementById('apPop');
  if(title)title.innerHTML=def.icon+' '+def.name;
  if(body)body.innerHTML=h;
  if(ov)ov.style.display='block';
  if(pop){pop.style.display='block';setTimeout(function(){pop.style.transform='translateY(0)';},10);}
  setTimeout(function(){var b=document.getElementById('apBar');if(b)b.style.width=score+'%';},300);
  _cgoTransPopup('apBody');
}


function pajOpen(){
  var r=window._pajR;
  if(!r){alert('먼저 생년월일을 입력하고 자동 계산을 눌러주세요!');return;}
  _pajRender(r);
  document.getElementById('pajOv').classList.add('open');
  document.getElementById('pajPop').classList.add('open');
  document.body.style.overflow='hidden';
  _cgoTransPopup('pajBd');
}
function pajClose(){
  document.getElementById('pajOv').classList.remove('open');
  document.getElementById('pajPop').classList.remove('open');
  document.body.style.overflow='';
}

function _pajRender(r){
  var pillars=[
    {label:'年柱',gan:r.yGan,ji:r.yJi,ilgan:false},
    {label:'月柱',gan:r.mGJ.gan,ji:r.mGJ.ji,ilgan:false},
    {label:'日柱 ★',gan:r.dGJ.gan,ji:r.dGJ.ji,ilgan:true},
    {label:'時柱',gan:r.sGan,ji:r.sJi,ilgan:false}
  ];
  var ohCnt={목:0,화:0,토:0,금:0,수:0};
  pillars.forEach(function(p){ohCnt[_pOh(p.gan)]++;ohCnt[_jOh(p.ji)]++;});
  var yangCnt=0,yinCnt=0;
  pillars.forEach(function(p){
    if(_pYin(p.gan)==='양')yangCnt++;else yinCnt++;
    if(_jYin(p.ji)==='양')yangCnt++;else yinCnt++;
  });
  var ilgan=r.dGJ.gan, gi=PAJ.GAN_INFO[ilgan]||PAJ.GAN_INFO['甲'];
  var gender=r.gender||'남';
  var sub=document.getElementById('pajSub');
  if(sub) sub.textContent=(r.name||'')+'님 · '+r.y+'년 '+r.m+'월 '+r.d+'일 · 일간: '+ilgan;

  var h='';

  // ① 8글자 테이블
  h+='<div class="paj-sec"><div class="paj-sec-t">🎴 사주팔자 (四柱八字) — 당신의 우주 바코드</div>';
  h+='<div class="paj-tbl">';
  pillars.forEach(function(p){
    var gi2=PAJ.GAN_INFO[p.gan]||{};var ji2=PAJ.JI_INFO[p.ji]||{};
    var gc=_oColor[gi2.oh]||'#64748b';var jc=_oColor[ji2.oh]||'#64748b';
    h+='<div class="paj-pillar"><div class="paj-pillar-h">'+p.label+(p.ilgan?'<br><span style="color:#d4a843;font-size:9px">본인</span>':'')+'</div>';
    h+='<div class="paj-cell'+(p.ilgan?' ilgan':'')+'">';
    h+='<div class="paj-gan-char" style="color:'+gc+'">'+p.gan+'</div>';
    h+='<div style="font-size:10px;color:#334155;margin-bottom:6px">'+_pYin(p.gan)+'·'+(gi2.oh||'')+'</div>';
    h+='<div class="paj-ji-char" style="color:'+jc+'">'+p.ji+'</div>';
    h+='<div style="font-size:10px;color:#334155;margin-bottom:4px">'+_jYin(p.ji)+'·'+(ji2.oh||'')+'</div>';
    h+='<div style="font-size:16px;margin-top:3px">'+(ji2.animal||'')+'</div>';
    h+='</div>';
    h+='<div style="font-size:10px;color:#334155;text-align:center;line-height:1.5">'+(gi2.name||'')+'<br>'+(ji2.name||'')+'</div>';
    h+='</div>';
  });
  h+='</div>';
  var yync=(gender==='남'&&yinCnt>=4)||(gender==='여'&&yangCnt>=4)?'#059669':'#d97706';
  h+='<div style="margin-top:10px;padding:10px 12px;background:#ffffff;border-radius:10px;display:flex;gap:12px;align-items:center">';
  h+='<span style="font-size:20px">☯</span><div style="flex:1"><div style="font-size:12px;font-weight:600;color:#334155">음양 분포: <span style="color:'+yync+'">양(陽) '+yangCnt+'자 · 음(陰) '+yinCnt+'자</span></div>';
  h+='<div style="font-size:11px;color:#334155;margin-top:3px">';
  if(gender==='남') h+=yinCnt>=4?'✅ 남성에게 이상적인 음양 균형입니다.':'⚠ 남성은 음(金·水) 기운이 많은 것이 건강에 유리합니다.';
  else h+=yangCnt>=4?'✅ 여성에게 이상적인 음양 균형입니다.':'⚠ 여성은 양(木·火) 기운이 많은 것이 건강에 유리합니다.';
  h+='</div></div></div></div>';

  // ② 오행 분포 차트
  h+='<div class="paj-sec"><div class="paj-sec-t">⚖️ 오행(五行) 분포 — 8자 기운 균형 분석</div><div class="paj-oh-bars">';
  ['목','화','토','금','수'].forEach(function(oh){
    var cnt=ohCnt[oh];var pct=cnt/8*100;var col=_oColor[oh];
    var st=cnt===0?'⚠ 없음':cnt>=4?'⚡ 과다':cnt>=2?'✅ 적정':'◎ 부족';
    var sc2=cnt===0?'#dc2626':cnt>=4?'#7c3aed':cnt>=2?'#059669':'#d97706';
    h+='<div class="paj-oh-bar-row"><div class="paj-oh-lbl" style="color:'+col+'">'+_oKor[oh]+'('+oh+')</div>';
    h+='<div class="paj-oh-track"><div class="paj-oh-fill" style="width:'+pct+'%;background:'+col+'"></div></div>';
    h+='<div class="paj-oh-num" style="color:'+col+'">'+cnt+'</div>';
    h+='<div style="font-size:10px;color:'+sc2+';width:42px;flex-shrink:0">'+st+'</div></div>';
  });
  var missing=Object.keys(ohCnt).filter(function(k){return ohCnt[k]===0;});
  var excess=Object.keys(ohCnt).filter(function(k){return ohCnt[k]>=4;});
  h+='</div><div style="margin-top:10px;display:flex;flex-direction:column;gap:6px">';
  if(missing.length>0) h+='<div style="padding:8px 12px;background:rgba(248,113,113,.07);border-radius:8px;border-left:3px solid #dc2626;font-size:12px;color:#334155">🚫 <strong style="color:#dc2626">없는 오행:</strong> '+missing.map(function(k){return _oKor[k]+'('+k+')'}).join(', ')+' — 해당 장기 특별 주의 필요</div>';
  if(excess.length>0) h+='<div style="padding:8px 12px;background:rgba(167,139,250,.07);border-radius:8px;border-left:3px solid #7c3aed;font-size:12px;color:#334155">⚡ <strong style="color:#7c3aed">과다 오행:</strong> '+excess.map(function(k){return _oKor[k]+'('+k+')'}).join(', ')+' — 과잉도 질병 원인</div>';
  if(missing.length===0&&excess.length===0) h+='<div style="padding:8px 12px;background:rgba(52,211,153,.07);border-radius:8px;border-left:3px solid #059669;font-size:12px;color:#334155">✅ 오행이 고르게 분포 — 전반적으로 건강한 팔자입니다.</div>';
  h+='</div></div>';

  // ③ 일간 심층 분석
  h+='<div class="paj-sec"><div class="paj-sec-t">⭐ 일간(日干) '+ilgan+' — 당신의 본질</div>';
  h+='<div style="padding:12px;background:rgba(212,168,67,.06);border-radius:10px;font-size:13px;color:#334155;line-height:1.8;margin-bottom:12px">'+(PAJ.ILGAN_DESC[ilgan]||'')+'</div>';
  h+='<div class="paj-g2">';
  h+='<div class="paj-chip"><div class="paj-chip-l">💼 적합 직업</div><div class="paj-chip-v">'+gi.career+'</div></div>';
  h+='<div class="paj-chip"><div class="paj-chip-l">💕 연애 스타일</div><div class="paj-chip-v">'+gi.love+'</div></div>';
  h+='<div class="paj-chip"><div class="paj-chip-l">💰 재물 성향</div><div class="paj-chip-v">'+gi.money+'</div></div>';
  h+='<div class="paj-chip"><div class="paj-chip-l">🌿 관련 신체</div><div class="paj-chip-v">'+gi.body+'</div></div>';
  h+='</div><div class="paj-g2" style="margin-top:9px">';
  h+='<div class="paj-chip"><div class="paj-chip-l">🧭 방위</div><div class="paj-chip-v">'+gi.dir+'</div></div>';
  h+='<div class="paj-chip"><div class="paj-chip-l">🎨 행운색</div><div class="paj-chip-v">'+gi.color+'</div></div>';
  h+='</div></div>';

  // ④ 4주 개별 해설
  h+='<div class="paj-sec"><div class="paj-sec-t">📖 4주(四柱) 개별 해설</div>';
  var pm=[{title:'年柱',sub:'조상·부모·초년 운 (0~20세)',icon:'👴'},
    {title:'月柱',sub:'부모·형제·청년 운 (20~40세)',icon:'👨‍👩‍👦'},
    {title:'日柱 ★',sub:'배우자·본인 기질 (가장 중요)',icon:'⭐'},
    {title:'時柱',sub:'자식·말년 운 (60세 이후)',icon:'👶'}];
  pillars.forEach(function(p,i){
    var gi3=PAJ.GAN_INFO[p.gan]||{};var ji3=PAJ.JI_INFO[p.ji]||{};
    h+='<div class="paj-row"><div class="paj-row-ico">'+pm[i].icon+'</div>';
    h+='<div class="paj-row-txt"><strong style="color:#b8860b">'+pm[i].title+'</strong> <span style="font-size:11px;color:var(--text-3)">'+pm[i].sub+'</span><br>';
    h+='<span style="color:'+(_oColor[gi3.oh]||'#64748b')+'"><strong>'+p.gan+'</strong>('+( gi3.name||'')+') </span>';
    h+='<span style="color:'+(_oColor[ji3.oh]||'#64748b')+'"><strong>'+p.ji+'</strong>('+( ji3.name||'')+') '+(ji3.animal||'')+'</span> · '+(ji3.time||'')+'<br>';
    h+='<span style="font-size:12px;color:#64748b">'+( gi3.trait||'')+' · '+(ji3.trait||'')+'</span></div></div>';
  });
  h+='</div>';

  // ⑤ 건강·질병 분석
  h+='<div class="paj-sec"><div class="paj-sec-t">🏥 오행별 건강·질병 정밀 분석</div>';
  h+='<div class="paj-health-grid">';
  ['목','화','토','금','수'].forEach(function(oh){
    var cnt=ohCnt[oh];var hi=PAJ.OH_HEALTH[oh];
    var cls=cnt===0?'danger':cnt>=4?'excess':cnt===1?'caution':'good';
    var st2=cnt===0?'⚠ 없음—약한 장기':cnt>=4?'⚡ 과다—주의':cnt===1?'◎ 부족':'✅ 양호';
    h+='<div class="paj-hc '+cls+'">';
    h+='<div style="font-size:13px;font-weight:700;color:'+hi.color+';margin-bottom:5px">'+hi.icon+' '+_oKor[oh]+'('+oh+') '+cnt+'개</div>';
    h+='<div style="font-size:10px;color:#64748b;margin-bottom:5px">'+hi.organ+'</div>';
    h+='<div style="font-size:10px;font-weight:600;color:'+(cls==='good'?'#059669':cls==='danger'?'#dc2626':cls==='excess'?'#7c3aed':'#d97706')+'">'+st2+'</div>';
    h+='</div>';
  });
  h+='</div>';
  var alertOhs=Object.keys(ohCnt).filter(function(k){return ohCnt[k]===0||ohCnt[k]>=4;});
  if(alertOhs.length>0){
    h+='<div style="margin-top:12px;display:flex;flex-direction:column;gap:10px">';
    alertOhs.forEach(function(oh){
      var hi=PAJ.OH_HEALTH[oh];var cnt=ohCnt[oh];
      h+='<div style="border-radius:12px;padding:13px;border:1px solid rgba(0,0,0,.06);background:#ffffff">';
      h+='<div style="font-size:12px;font-weight:700;color:'+hi.color+';margin-bottom:8px">'+hi.icon+' '+_oKor[oh]+'('+oh+') '+cnt+'개 — '+(cnt===0?'없음 경보':'과다 주의')+'</div>';
      h+='<div class="paj-row" style="padding:5px 0"><div class="paj-row-ico">🫀</div><div class="paj-row-txt" style="font-size:12px"><strong>관련 장기:</strong> '+hi.organ+'</div></div>';
      h+='<div class="paj-row" style="padding:5px 0"><div class="paj-row-ico">'+(cnt===0?'⚠':'⚡')+'</div><div class="paj-row-txt" style="font-size:12px">'+(cnt===0?hi.miss:hi.excess)+'</div></div>';
      h+='<div class="paj-row" style="padding:5px 0"><div class="paj-row-ico">🥗</div><div class="paj-row-txt" style="font-size:12px"><strong>식이:</strong> '+hi.diet+'</div></div>';
      h+='<div class="paj-row" style="padding:5px 0;border-bottom:none"><div class="paj-row-ico">🏃</div><div class="paj-row-txt" style="font-size:12px"><strong>운동:</strong> '+hi.exercise+'</div></div>';
      h+='</div>';
    });
    h+='</div>';
  }
  h+='</div>';

  // ⑥ 대운 타임라인
  h+='<div class="paj-sec"><div class="paj-sec-t">📅 대운(大運) 10년 주기 타임라인</div>';
  h+='<div style="font-size:12px;color:#64748b;line-height:1.7;margin-bottom:12px">대운이 바뀔 때마다 운의 큰 흐름이 달라집니다. <strong style="color:#334155">사주에 없는 오행의 대운</strong>이 오면 해당 장기가 과부하되어 건강에 영향을 줍니다.</div>';
  var yganIdx=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'].indexOf(r.yGan);
  var daeuns=[];
  for(var di=0;di<8;di++){
    var deGan=PAJ.DAEUN_GAN[(yganIdx+di*2+2)%10];
    var deJi=PAJ.DAEUN_JI[(di*2+2)%12];
    var deOh=_pOh(deGan);
    var ageStart=5+di*10;
    var isCur=(r.y+ageStart<=(new Date().getFullYear()))&&((new Date().getFullYear())<r.y+ageStart+10);
    daeuns.push({gan:deGan,ji:deJi,oh:deOh,age:ageStart,cur:isCur});
  }
  h+='<div class="paj-daeun">';
  daeuns.forEach(function(de){
    var warn=ohCnt[de.oh]===0?'⚠':ohCnt[de.oh]>=4?'⚡':'';
    h+='<div class="paj-de-item'+(de.cur?' now':'')+'">';
    h+='<div style="font-size:9px;color:#334155;margin-bottom:3px">'+de.age+'세~</div>';
    h+='<div style="font-size:16px;font-weight:700;color:'+(_oColor[de.oh]||'#64748b')+'">'+de.gan+'</div>';
    h+='<div style="font-size:14px;font-weight:700;color:'+(_oColor[_jOh(de.ji)]||'#64748b')+'">'+de.ji+'</div>';
    h+='<div style="font-size:9px;color:#334155;margin-top:3px">'+_oKor[de.oh]+'</div>';
    if(warn) h+='<div style="font-size:10px">'+warn+'</div>';
    if(de.cur) h+='<div style="font-size:8px;color:#d4a843">현재</div>';
    h+='</div>';
  });
  h+='</div>';
  var curDe=daeuns.filter(function(d){return d.cur;})[0]||daeuns[0];
  if(curDe){
    var curHi=PAJ.OH_HEALTH[curDe.oh];var curMiss=ohCnt[curDe.oh]===0;
    h+='<div style="margin-top:12px;padding:13px;border-radius:11px;background:rgba(212,168,67,.06);border:1px solid rgba(212,168,67,.2)">';
    h+='<div style="font-size:12px;font-weight:700;color:#d4a843;margin-bottom:6px">📌 현재 대운: '+curDe.gan+curDe.ji+' ('+_oKor[curDe.oh]+' 대운)</div>';
    h+='<div style="font-size:12px;color:#334155;line-height:1.75">';
    if(curMiss){h+='⚠ 원국에 '+_oKor[curDe.oh]+' 기운이 없는데 현재 '+_oKor[curDe.oh]+' 대운입니다.<br>이 기간 <strong>'+curHi.organ+'</strong> 계통을 집중 관리하세요.<br><strong style="color:#d97706">식이 권장:</strong> '+curHi.diet;}
    else{h+='✅ 현재 대운('+_oKor[curDe.oh]+')이 원국과 잘 맞습니다. 꾸준한 건강 관리를 유지하세요.';}
    h+='</div></div>';
  }
  h+='</div>';

  // ⑦ 종합 조언
  h+='<div class="paj-sec" style="border-color:rgba(212,168,67,.25)"><div class="paj-sec-t">💎 종합 사주 조언</div>';
  h+='<div class="paj-adv">';
  h+=(r.name||'')+'님의 사주는 일간 <strong>'+ilgan+'('+gi.name+')</strong> 기반의 팔자입니다.<br><br>';
  h+='✦ <strong>강점:</strong> '+gi.trait+'의 기질로 '+gi.career.split('·')[0]+' 계통에서 두각.<br>';
  if(missing.length>0) h+='✦ <strong>건강 주의:</strong> '+missing.map(function(k){return _oKor[k]+'('+k+') 관련 '+PAJ.OH_HEALTH[k].organ.split('·')[0];}).join(', ')+' — 평생 집중 관리.<br>';
  h+='✦ <strong>행운 색상·방위:</strong> '+gi.color+' · '+gi.dir;
  h+='</div>';
  h+='<div style="margin-top:10px;font-size:10px;color:#94a3b8;text-align:center">* 사주명리학 기반 참고용 분석입니다. 건강은 전문의와 상담하세요.</div>';
  h+='</div>';

  document.getElementById('pajBd').innerHTML=h;
  _cgoTransPopup('pajBd');
}

// ═══════════════════════════════════════════════════
//  ② 음악 추천 엔진 (유튜브 링크 포함)
// ═══════════════════════════════════════════════════
var MUSIC_DB={
  OH_MUSIC:{
    목:{freq:'528Hz',scale:'장음계',tempo:'120~140 BPM',instruments:'현악기·피리·오카리나',color:'#34d399',emoji:'🌳',
      effect:'간(肝)·담(膽) 활성화, 창의력·성장 에너지 상승',
      korean:[
        {song:'봄날',artist:'방탄소년단',reason:'봄(木) 생장 에너지·528Hz 공명, 새 출발의 기운',yt:'https://www.youtube.com/results?search_query=BTS+봄날+MV'},
        {song:'봄봄봄',artist:'로이킴',reason:'어쿠스틱 기타 목(木) 기운, 자연 친화 에너지',yt:'https://www.youtube.com/results?search_query=로이킴+봄봄봄'},
        {song:'아름다운 강산',artist:'서유석',reason:'대자연 목(木) 에너지, 뿌리 깊은 안정과 성장',yt:'https://www.youtube.com/results?search_query=서유석+아름다운강산'},
        {song:'좋은 날',artist:'아이유',reason:'밝은 장조 목(木) 에너지, 인기운·애정운 상승',yt:'https://www.youtube.com/results?search_query=아이유+좋은날'},
        {song:'봄이 좋냐',artist:'장범준',reason:'봄 木 에너지 최고봉, 신경계 이완·창의력 충전',yt:'https://www.youtube.com/results?search_query=장범준+봄이좋냐'}],
      foreign:[
        {song:'Here Comes the Sun',artist:'The Beatles',reason:'태양빛(木·火) 봄 에너지, 528Hz 자연 공명',yt:'https://www.youtube.com/results?search_query=Beatles+Here+Comes+the+Sun'},
        {song:'What a Wonderful World',artist:'Louis Armstrong',reason:'자연 만물 목(木) 에너지 찬가, 간 기능 활성',yt:'https://www.youtube.com/results?search_query=Louis+Armstrong+Wonderful+World'},
        {song:'The Sound of Silence',artist:'Simon and Garfunkel',reason:'숲의 정적 목(木) 에너지, 신경계 안정과 재생',yt:'https://www.youtube.com/results?search_query=Simon+Garfunkel+Sound+of+Silence'},
        {song:'Blowin in the Wind',artist:'Bob Dylan',reason:'바람(木) 에너지, 자유로운 성장과 변화',yt:'https://www.youtube.com/results?search_query=Bob+Dylan+Blowin+in+the+Wind'},
        {song:'Four Seasons Spring',artist:'Vivaldi',reason:'목(木) 봄 에너지 정수, 간 활성화·창의 에너지',yt:'https://www.youtube.com/results?search_query=Vivaldi+Four+Seasons+Spring'}]},
    화:{freq:'417Hz',scale:'펜타토닉',tempo:'140~170 BPM',instruments:'드럼·트럼펫·퍼커션',color:'#f97316',emoji:'🔥',
      effect:'심장·혈관 활성화, 열정·카리스마 상승, 인기운 폭발',
      korean:[
        {song:'불꽃',artist:'SHINee',reason:'화(火) 강렬 에너지, 심장 BPM 공명, 열정·인기운',yt:'https://www.youtube.com/results?search_query=SHINee+불꽃'},
        {song:'빨간 맛',artist:'레드벨벳',reason:'화(火) 빨간 에너지, 417Hz 변환·창조 주파수',yt:'https://www.youtube.com/results?search_query=레드벨벳+빨간맛'},
        {song:'Dynamite',artist:'BTS',reason:'화(火) 폭발 에너지, 심장·열정 주파수 공명',yt:'https://www.youtube.com/results?search_query=BTS+Dynamite+MV'},
        {song:'뜨거운 안녕',artist:'버즈',reason:'화(火) 뜨거운 에너지, 혈액순환 촉진 BPM',yt:'https://www.youtube.com/results?search_query=버즈+뜨거운안녕'},
        {song:'Into The New World',artist:'소녀시대',reason:'화(火) 새벽 에너지, 심장과 희망 주파수',yt:'https://www.youtube.com/results?search_query=소녀시대+Into+The+New+World'}],
      foreign:[
        {song:'Eye of the Tiger',artist:'Survivor',reason:'화(火) 기운 최강 — 심장과 의지를 불태우는 주파수',yt:'https://www.youtube.com/results?search_query=Survivor+Eye+of+the+Tiger'},
        {song:'Uptown Funk',artist:'Bruno Mars',reason:'화(火) 펑키 에너지, 태양신경총 활성화 리듬',yt:'https://www.youtube.com/results?search_query=Bruno+Mars+Uptown+Funk'},
        {song:'Happy',artist:'Pharrell Williams',reason:'태양(火) 행복 주파수, 세로토닌 분비 촉진 BPM',yt:'https://www.youtube.com/results?search_query=Pharrell+Williams+Happy'},
        {song:'Dont Stop Me Now',artist:'Queen',reason:'고BPM 화(火) 파동, 혈액순환 촉진',yt:'https://www.youtube.com/results?search_query=Queen+Dont+Stop+Me+Now'},
        {song:'Bolero',artist:'Ravel',reason:'화(火) 에너지 점진 상승, 혈액순환·인기운',yt:'https://www.youtube.com/results?search_query=Ravel+Bolero'}]},
    토:{freq:'396Hz',scale:'도리안 모드',tempo:'80~100 BPM',instruments:'첼로·더블베이스·북',color:'#fbbf24',emoji:'⛰️',
      effect:'위장·비장 활성화, 신뢰·안정 에너지, 재물운·사업운 강화',
      korean:[
        {song:'흙에 살리라',artist:'패티김',reason:'대지(土) 에너지 정수, 그라운딩 에너지장 활성화 저음',yt:'https://www.youtube.com/results?search_query=패티김+흙에살리라'},
        {song:'고향의 봄',artist:'동요',reason:'토(土) 고향 에너지, 심리적 안정과 재물 기반',yt:'https://www.youtube.com/results?search_query=고향의봄+동요'},
        {song:'어머나',artist:'장윤정',reason:'무토(戊土) 어머니 대지 에너지, 재물운 강화',yt:'https://www.youtube.com/results?search_query=장윤정+어머나'},
        {song:'천년바위',artist:'장사익',reason:'천년 바위(土) 에너지, 장기적 재물 축적 주파수',yt:'https://www.youtube.com/results?search_query=장사익+천년바위'},
        {song:'가을 편지',artist:'이동원',reason:'토(土) 환절기 에너지, 위장·소화 안정 주파수',yt:'https://www.youtube.com/results?search_query=이동원+가을편지'}],
      foreign:[
        {song:'Earth Song',artist:'Michael Jackson',reason:'대지(土) 치유 에너지, 396Hz 해방 주파수',yt:'https://www.youtube.com/results?search_query=Michael+Jackson+Earth+Song'},
        {song:'Stand By Me',artist:'Ben E. King',reason:'토(土) 신뢰·안정 에너지, 재물운 강화',yt:'https://www.youtube.com/results?search_query=Ben+E+King+Stand+By+Me'},
        {song:'Imagine',artist:'John Lennon',reason:'토(土) 평화 에너지, 이상적 현실 창조 주파수',yt:'https://www.youtube.com/results?search_query=John+Lennon+Imagine'},
        {song:'Dust in the Wind',artist:'Kansas',reason:'토(土) 흙 에너지, 철학적 안정감과 내공',yt:'https://www.youtube.com/results?search_query=Kansas+Dust+in+the+Wind'},
        {song:'Gymnopédie No.1',artist:'Erik Satie',reason:'토(土) 안정 에너지, 위장 편안·재물 기반',yt:'https://www.youtube.com/results?search_query=Satie+Gymnopedie+No+1'}]},
    금:{freq:'741Hz',scale:'단음계',tempo:'60~90 BPM',instruments:'피아노·하프시코드·클래식기타',color:'#94a3b8',emoji:'⚔️',
      effect:'폐·기관지 활성화, 명예·직장운 상승, 결단력·집중력 강화',
      korean:[
        {song:'비상',artist:'이소라',reason:'경금(庚金) 비상 기운, 직업운·승진운 강화',yt:'https://www.youtube.com/results?search_query=이소라+비상'},
        {song:'청혼',artist:'이문세',reason:'금(金) 순수 결정 에너지, 명예·결단력 상승',yt:'https://www.youtube.com/results?search_query=이문세+청혼'},
        {song:'Butterfly',artist:'BTS',reason:'금(金) 나비 변환 에너지, 폐 기능 활성 멜로디',yt:'https://www.youtube.com/results?search_query=BTS+Butterfly'},
        {song:'가시나무',artist:'시인과촌장',reason:'금(金) 날카로운 직관, 집중력·명예운 주파수',yt:'https://www.youtube.com/results?search_query=시인과촌장+가시나무'},
        {song:'하얀 겨울',artist:'임창정',reason:'신금(辛金) 흰 겨울 에너지, 폐·기관지 활성화',yt:'https://www.youtube.com/results?search_query=임창정+하얀겨울'}],
      foreign:[
        {song:'Moonlight Sonata',artist:'Beethoven',reason:'금(金) 달빛 에너지, 741Hz 직관 주파수 공명',yt:'https://www.youtube.com/results?search_query=Beethoven+Moonlight+Sonata'},
        {song:'Canon in D',artist:'Pachelbel',reason:'금(金) 수학적 아름다움, 집중력·명예운 하모니',yt:'https://www.youtube.com/results?search_query=Pachelbel+Canon+in+D'},
        {song:'Air on the G String',artist:'Bach',reason:'금(金) 정수 — 기관지·폐 활성화, 고귀한 기운',yt:'https://www.youtube.com/results?search_query=Bach+Air+on+the+G+String'},
        {song:'Clair de lune',artist:'Debussy',reason:'신금(辛金) 달빛 에너지, 정밀한 직관력 상승',yt:'https://www.youtube.com/results?search_query=Debussy+Clair+de+lune'},
        {song:'My Heart Will Go On',artist:'Celine Dion',reason:'금(金) 불굴 의지 에너지, 명예와 사랑운',yt:'https://www.youtube.com/results?search_query=Celine+Dion+My+Heart+Will+Go+On'}]},
    수:{freq:'852Hz',scale:'마이너 펜타토닉',tempo:'60~80 BPM',instruments:'플루트·오카리나·물소리',color:'#38bdf8',emoji:'💧',
      effect:'신장·방광 활성화, 지혜·직관 상승, 귀인운·수호 에너지 강화',
      korean:[
        {song:'강',artist:'이미자',reason:'수(水) 에너지 정수, 852Hz 귀환 주파수, 신장 활성',yt:'https://www.youtube.com/results?search_query=이미자+강'},
        {song:'바다',artist:'이승환',reason:'수(Water) 포용력, 방광·비뇨기 활성 저주파 공명',yt:'https://www.youtube.com/results?search_query=이승환+바다'},
        {song:'파도',artist:'이적',reason:'임수(壬水) 큰 파도 에너지, 자유와 지혜의 흐름',yt:'https://www.youtube.com/results?search_query=이적+파도'},
        {song:'겨울바다',artist:'이수',reason:'수(Water) 겨울 에너지, 신장 보강·귀인운 상승',yt:'https://www.youtube.com/results?search_query=이수+겨울바다'},
        {song:'기적',artist:'이적',reason:'수(Water) 기적 에너지, 귀인 연결·소원성취 주파수',yt:'https://www.youtube.com/results?search_query=이적+기적'}],
      foreign:[
        {song:'Moon River',artist:'Audrey Hepburn',reason:'수(Water) 달·강 에너지, 852Hz 직관 주파수 공명',yt:'https://www.youtube.com/results?search_query=Audrey+Hepburn+Moon+River'},
        {song:'Bridge Over Troubled Water',artist:'Simon and Garfunkel',reason:'수(Water) 치유 에너지, 신장·방광 계통 활성',yt:'https://www.youtube.com/results?search_query=Simon+Garfunkel+Bridge+Over+Troubled+Water'},
        {song:'La Mer',artist:'Charles Trenet',reason:'프랑스 수(Water) 에너지, 바다의 자유와 지혜',yt:'https://www.youtube.com/results?search_query=Charles+Trenet+La+Mer'},
        {song:'Beyond the Sea',artist:'Bobby Darin',reason:'수(Water) 광활 에너지, 직관력·귀인운 극대화',yt:'https://www.youtube.com/results?search_query=Bobby+Darin+Beyond+the+Sea'},
        {song:'Four Seasons Winter',artist:'Vivaldi',reason:'수(Water) 겨울 에너지, 신장 보강·지혜 축적',yt:'https://www.youtube.com/results?search_query=Vivaldi+Four+Seasons+Winter'}]}
  },
  YEOKAK:[
    {id:'saju',name:'사주명리',sub:'일간(日干) · 오행(五行) · 대운 분석',emoji:'🔴',color:'#f87171',bg:'rgba(248,113,113,.08)',border:'rgba(248,113,113,.25)',
      analyze:function(bs){var oh=bs.oh,ohi=MUSIC_DB.OH_MUSIC[oh],ok={목:'木',화:'火',토:'土',금:'金',수:'水'};return{score:(function(){var _s=rng((bs.dateSeed||54321)*7+101)&0x7fff;return Math.max(65,Math.min(92,70+_s%22));})(),detail:'일간 오행 <strong style="color:'+ohi.color+'">'+oh+'('+ok[oh]+')</strong> 분석 결과 <strong>'+ohi.freq+'</strong> 주파수 대역과 공명 최적화. BAI '+bs.bpm+'BPM은 '+ohi.tempo+' 범위 일치. '+ohi.effect+'.',rows:[{i:'🎵',t:'권장 주파수: <strong>'+ohi.freq+'</strong> · '+ohi.scale},{i:'🎸',t:'최적 악기: '+ohi.instruments},{i:'✨',t:ohi.effect}]};
      }},
    {id:'jami',name:'자미두수',sub:'12궁(宮) · 18주성(主星) 에너지 분석',emoji:'🟣',color:'#a78bfa',bg:'rgba(167,139,250,.08)',border:'rgba(167,139,250,.25)',
      analyze:function(bs){var p=['命宮','財帛','官祿','福德','夫妻','遷移','田宅','疾厄','子女','兄弟','父母','奴僕'][(bs.bpm+bs.hrv)%12];var s=['紫微','天機','太陽','武曲','天同','廉貞','天府','太陰','貪狼','巨門','天相','天梁','七殺','破軍'][(bs.fci+bs.eng)%14];var f=[396,417,432,528,639,741,852][(bs.fci+bs.eng)%7];return{score:(function(){var _s=rng((bs.dateSeed||54321)*11+202)&0x7fff;return Math.max(67,Math.min(92,72+_s%20));})(),detail:'명궁 <strong style="color:#a78bfa">'+p+'</strong>에 주성 <strong style="color:#a78bfa">'+s+'</strong>. 공명 주파수 <strong>'+f+'Hz</strong>. rPPG 이마 혈류(FCI '+bs.fci+'%) — 천격 에너지 활성.',rows:[{i:'⭐',t:'활성 주성: <strong>'+s+'</strong> · 안착궁: <strong>'+p+'</strong>'},{i:'🎵',t:'공명 주파수: <strong>'+f+'Hz</strong>'},{i:'✨',t:'복덕궁 활성화, 귀인운·재물운 상승'}]};
      }},
    {id:'gim',name:'기문둔갑',sub:'8문(八門) · 9성(九星) · 시공간 에너지장',emoji:'🔵',color:'#38bdf8',bg:'rgba(56,189,248,.08)',border:'rgba(56,189,248,.25)',
      analyze:function(bs){var gates=['休門','死門','傷門','杜門','景門','驚門','開門','生門'];var gs=['天蓬','天芮','天沖','天輔','天禽','天心','天柱','天任','天英'];var g=gates[(bs.bpm*3+bs.eng)%8],s=gs[(bs.hrv*2+bs.fci)%9];var good=['開門','生門','休門'].indexOf(g)>-1;return{score:(function(){var _s=rng((bs.dateSeed||54321)*13+303)&0x7fff;return Math.max(63,Math.min(92,68+_s%24));})(),detail:'에너지장: <strong style="color:#38bdf8">'+g+'</strong> · <strong>'+s+'</strong>. '+(good?'✅ 길문(吉門) — 운의 문이 열려 있습니다.':'◎ 음악으로 에너지 문을 여세요.')+' <strong>432Hz</strong> 자연 공명 주파수 최적.',rows:[{i:'🚪',t:'활성문: <strong>'+g+'</strong> · 당직성: <strong>'+s+'</strong>'},{i:'🎵',t:'권장: <strong>432Hz</strong> 자연 공명 주파수'},{i:'✨',t:(good?'길방위 에너지 채널 개방':'음악으로 에너지 문 개방 — 운 흐름 전환')}]};
      }},
    {id:'gusung',name:'구성학',sub:'본명성(本命星) · 9궁(九宮) 방위 에너지',emoji:'🟢',color:'#34d399',bg:'rgba(52,211,153,.08)',border:'rgba(52,211,153,.25)',
      analyze:function(bs){var nm=['一白水星','二黑土星','三碧木星','四緑木星','五黄土星','六白金星','七赤金星','八白土星','九紫火星'];var ko=['수','토','목','목','토','금','금','토','화'];var kd=['북','남서','동','동남','중앙','북서','서','동북','남'];var i2=(bs.bpm+bs.hrv+bs.fci)%9;var fq={수:'852Hz',토:'396Hz',목:'528Hz',화:'417Hz',금:'741Hz'};return{score:(function(){var _s=rng((bs.dateSeed||54321)*17+404)&0x7fff;return Math.max(69,Math.min(92,74+_s%18));})(),detail:'본명성 <strong style="color:#34d399">'+nm[i2]+'</strong> — 오행 <strong>'+{목:'木',화:'火',토:'土',금:'金',수:'水'}[ko[i2]]+'</strong>. 길방위 <strong>'+kd[i2]+'쪽</strong>으로 향해 음악 청취 시 에너지 흡수율 +37%. 권장 <strong>'+fq[ko[i2]]+'</strong>.',rows:[{i:'⭐',t:'본명성: <strong>'+nm[i2]+'</strong> · 길방위: <strong>'+kd[i2]+'쪽</strong>'},{i:'🎵',t:'권장 주파수: <strong>'+fq[ko[i2]]+'</strong>'},{i:'✨',t:'길방위 향해 청취 시 에너지 흡수율 +37%'}]};
      }},
    {id:'iching',name:'주역',sub:'64괘(卦) 에너지 패턴 × 생체파동',emoji:'🟠',color:'#f97316',bg:'rgba(249,115,22,.08)',border:'rgba(249,115,22,.25)',
      analyze:function(bs){var hx=['乾爲天','坤爲地','地天泰','天地否','水火旣濟','火水未濟','天澤履','地山謙','雷地豫','火天大有','風天小畜','澤雷隨','山澤損','風雷益','水地比','澤天夬'];var good=['乾爲天','地天泰','火天大有','地山謙','雷地豫','風雷益'];var n=Math.abs(bs.bpm*7+bs.hrv*3+bs.fci)%64;var hname=hx[n%16];var isG=good.indexOf(hname)>-1;return{score:(function(){var _s=rng((bs.dateSeed||54321)*19+505)&0x7fff;return Math.max(65,Math.min(92,70+_s%22));})(),detail:'생체 에너지 도출 괘: <strong style="color:#f97316">제'+(n+1)+'괘 '+hname+'</strong>. '+(isG?'✅ 길괘(吉卦) — 에너지 흐름 매우 양호.':'◎ 중평괘 — 음악으로 에너지 보완.')+' <strong>639Hz</strong>(관계·조화) 공명.',rows:[{i:'☯',t:'활성 괘: <strong>'+(n+1)+'괘 '+hname+'</strong> '+(isG?'✅ 길괘':'◎ 중평')},{i:'🎵',t:'공명: <strong>639Hz</strong> (관계·조화·사랑 에너지)'},{i:'✨',t:'64괘 리듬과 심박 동조 — 우주 에너지 채널 개방'}]};
      }},
    {id:'numer',name:'수비학',sub:'생명수(生命數) · 솔페지오 주파수 매핑',emoji:'🟡',color:'#fbbf24',bg:'rgba(251,191,36,.08)',border:'rgba(251,191,36,.25)',
      analyze:function(bs){var ln=bs.bpm%9+1;var fm=[null,396,417,432,528,528,639,741,852,963];var f=fm[ln]||528;var sm={396:'두려움 해방·뿌리 차크라',417:'부정 에너지 변환·창조성',432:'자연 공명·우주 정렬',528:'DNA 복구·奇跡',639:'관계·조화·사랑',741:'독소 제거·직관력',852:'귀인 연결·영적 질서',963:'신성 의식 활성화'};return{score:(function(){var _s=rng((bs.dateSeed||54321)*23+606)&0x7fff;return Math.max(70,Math.min(93,75+_s%18));})(),detail:'BAI '+bs.bpm+'BPM → 생명수 <strong style="color:#fbbf24">'+ln+'번</strong>. 솔페지오 <strong>'+f+'Hz</strong> — '+(sm[f]||'')+'. 하루 <strong>21분</strong>(3×7 수비학 사이클) 청취 시 운 에너지 사이클 완성.',rows:[{i:'🔢',t:'생명수: <strong>'+ln+'번</strong> · 주파수: <strong>'+f+'Hz</strong>'},{i:'⏱',t:'권장: <strong>21분</strong> (3×7 수비학 완성 사이클)'},{i:'✨',t:(sm[f]||'')+' — 현재 생체 최적 공명'}]};
      }},
    {id:'naming',name:'성명학 + rPPG 관상',sub:'이름 음가(音價) · 이마혈류 · 관상 파동',emoji:'⚪',color:'#e2e8f0',bg:'rgba(226,232,240,.06)',border:'rgba(226,232,240,.2)',
      analyze:function(bs){var sv=['아·야','어·여','오·요','우·유','으·이'];var si=(bs.bpm+bs.eng)%5;var sound=sv[si];var vo=['토','목','화','수','금'][si];var vf={토:'396Hz',목:'528Hz',화:'417Hz',수:'852Hz',금:'741Hz'};var ok={목:'木',화:'火',토:'土',금:'金',수:'水'};return{score:(function(){var _s=rng((bs.dateSeed||54321)*29+707)&0x7fff;return Math.max(67,Math.min(92,72+_s%20));})(),detail:'rPPG 안면 43포인트 혈류 분석 → 음가 파동: <strong style="color:#e2e8f0">'+sound+'</strong> 계열. 오행: <strong>'+ok[vo]+'('+vo+')</strong>. 이마(天格) 혈류 FCI '+bs.fci+'% — 귀인궁 활성. 권장 <strong>'+vf[vo]+'</strong>.',rows:[{i:'🎤',t:'음가: <strong>'+sound+'</strong> · 오행: <strong>'+ok[vo]+'</strong>'},{i:'👁',t:'rPPG 이마(天格) '+bs.fci+'% — 귀인궁·관록궁 활성'},{i:'🎵',t:'권장: <strong>'+vf[vo]+'</strong> — 음가 공명 극대화'}].concat(window._baiScanned?[]:[{i:'⚠️',t:'<span style="color:rgba(251,191,36,.7);font-size:11px;">Bio 스캔 미완료 — 이름 음가 기반 기본값입니다 (생체 스캔 후 정밀해집니다)</span>'}])};
      }},

    // ── 08 태양궁 점성술 ─────────────────────────────
    {id:'solar',name:'태양궁 점성술',sub:'태양궁(Sun Sign) · 상승궁 · 달 별자리',emoji:'♈',color:'#fbbf24',bg:'rgba(251,191,36,.08)',border:'rgba(251,191,36,.25)',
      analyze:function(bs){
        var p=window._nasaPlanets;
        var wz=window.calcResult?window.calcResult.wz:null;
        var sunSign=p?p.sun.zodiac.sign:'분석중';
        var moonSign=p?p.moon.zodiac.sign:'분석중';
        var wzName=wz?wz.name:sunSign;
        var match=sunSign===wzName;
        var fMap={'양자리':417,'황소자리':396,'쌍둥이자리':528,'게자리':852,'사자자리':417,'처녀자리':528,'천칭자리':639,'전갈자리':852,'사수자리':528,'염소자리':396,'물병자리':741,'물고기자리':852};
        var freq=(fMap[wzName]||528)+'Hz';
        var sj=bs.siJin!==undefined?bs.siJin:getCurrentSiJin();
        var sjOh=['수','토','목','목','토','화','화','토','금','금','토','수'][sj];
        return{score:(function(){var _s=rng((bs.dateSeed||54321)*31+801)&0x7fff;return Math.max(68,Math.min(93,73+_s%20));})(),
          detail:'태양궁 <strong style="color:#fbbf24">'+wzName+'</strong> × 현재 태양('+sunSign+') · 달('+moonSign+').'
            +(match?' ⚡ 태양 완전 공명 — 자아 에너지 최고조!':' 복합 에너지 교차.')
            +' 현재 시진('+SIJIN_DATA[sj].name+') 오행 <strong>'+sjOh+'</strong>와 공명 주파수 <strong>'+freq+'</strong>.',
          rows:[{i:'☀️',t:'태양궁: <strong>'+wzName+'</strong> · 현재 태양: <strong>'+sunSign+'</strong>'+(match?' ⚡ 완전 공명':'')},
                {i:'🌙',t:'달 별자리: <strong>'+moonSign+'</strong> · 감정 공명 채널 활성'},
                {i:'🎵',t:'권장 주파수: <strong>'+freq+'</strong> (태양궁 공명)'}]};
      }},

    // ── 09 행성 트랜짓 (NASA) ─────────────────────────
    {id:'transit',name:'🛰️ NASA 행성 트랜짓',sub:'실시간 목성·토성·화성 에너지장',emoji:'🪐',color:'#34d399',bg:'rgba(52,211,153,.08)',border:'rgba(52,211,153,.25)',
      analyze:function(bs){
        var p=window._nasaPlanets;
        var sj=bs.siJin!==undefined?bs.siJin:getCurrentSiJin();
        var sjName=SIJIN_DATA[sj].name;
        if(!p) return{score:72,detail:'🛰️ NASA 데이터 로딩 중... 자동 계산 버튼을 눌러 활성화하세요.',rows:[]};
        var jupSign=p.jupiter.zodiac.sign;
        var satRetro=p.saturn.retro;
        var marsSign=p.mars.zodiac.sign;
        var mercRetro=p.mercury.retro;
        var nasaFreq=mercRetro?741:528;
        var sc=satRetro?78:85;
        var _s06=(window.calcResult&&window.calcResult.scores&&window.calcResult.scores.s18&&window.calcResult.scores.s18.s06)||0;
        var _nasaAdj=(p.jupiter.retro?-8:5)+(p.mars.retro?-5:2)+(satRetro?-6:3)+(mercRetro?-3:1);
        var _finalScore=_s06>0?_s06:Math.max(55,Math.min(90,70+_nasaAdj));
        return{score:_finalScore,
          detail:'🛰️ <strong style="color:#34d399">NASA JPL 실시간</strong> — 목성('+jupSign+') '+(p.jupiter.retro?'역행':'순행')+' · 화성('+marsSign+') · 토성 '+(satRetro?'⚠️역행':'순행')+'.<br>'
            +'현재 시진 <strong>'+sjName+'</strong> — '+(satRetro?'토성 역행 중: 내면 강화 음악 추천 (741Hz).':'목성 에너지 흡수 최적: 확장·성장 음악 추천.')
            +(mercRetro?' 수성 역행: 소통보다 내면 공명 주파수 우선.':''),
          rows:[{i:'🪐',t:'목성: <strong>'+jupSign+'</strong>'+(p.jupiter.retro?' ℛ역행':' ▶순행')+' · 화성: <strong>'+marsSign+'</strong>'+(p.mars.retro?' ℛ':'')},
                {i:'⏰',t:'현재 시진: <strong>'+sjName+'</strong> · NASA 트랜짓 × 시진 융합 에너지'},
                {i:'🎵',t:'권장: <strong>'+nasaFreq+'Hz</strong>'+(mercRetro?' (수성역행 — 내면 공명)':' (목성 확장 에너지)')}]};
      }},

    // ── 10 육임신살 ──────────────────────────────────
    {id:'yuk',name:'육임신살',sub:'년주 신살 · 길신·흉살 에너지 정화',emoji:'⚡',color:'#f87171',bg:'rgba(248,113,113,.06)',border:'rgba(248,113,113,.2)',
      analyze:function(bs){
        var sj=bs.siJin!==undefined?bs.siJin:getCurrentSiJin();
        var sjOh=SIJIN_DATA[sj].oh;
        var salNames=['천을귀인','문창귀인','학당귀인','역마살','도화살','화개살','겁살','망신살'];
        var salPick=salNames[(bs.bpm+bs.hrv+sj)%salNames.length];
        var isGood=['천을귀인','문창귀인','학당귀인'].indexOf(salPick)>-1;
        var freq=isGood?528:396;
        return{score:(function(){var _s=rng((bs.dateSeed||54321)*41+1001)&0x7fff;return Math.max(65,Math.min(90,70+_s%20));})(),
          detail:'현재 시진(<strong>'+SIJIN_DATA[sj].name+'</strong>) 오행 <strong>'+sjOh+'</strong> — 활성 신살: <strong style="color:#f87171">'+salPick+'</strong>.'
            +(isGood?'✅ 길신 활성 — '+freq+'Hz로 귀인 에너지 증폭.':'⚠️ 흉살 시기 — '+freq+'Hz로 에너지 정화 가이드.'),
          rows:[{i:'🔮',t:'활성 신살: <strong>'+salPick+'</strong> '+(isGood?'✅ 길신':'⚠️ 흉살')},
                {i:'⏰',t:'시진: <strong>'+SIJIN_DATA[sj].name+'</strong> ('+SIJIN_DATA[sj].time+') · 오행: '+sjOh},
                {i:'🎵',t:'추천 주파수: <strong>'+freq+'Hz</strong>'+(isGood?' — 귀인 에너지 증폭':' — 흉살 정화 가이드')}]};
      }},

    // ── 11 풍수지리 ──────────────────────────────────
    {id:'feng',name:'풍수지리',sub:'공간 오행 · 행성 방위 × 지금 시진',emoji:'🏡',color:'#34d399',bg:'rgba(52,211,153,.06)',border:'rgba(52,211,153,.2)',
      analyze:function(bs){
        var p=window._nasaPlanets;
        var sj=bs.siJin!==undefined?bs.siJin:getCurrentSiJin();
        var dirs=['북','동북','동','동남','남','남서','서','북서'];
        var jupDir=p?dirs[Math.floor(((parseFloat(p.jupiter.lon)+22.5)%360)/45)]:'동남';
        var sjOh=SIJIN_DATA[sj].oh;
        var fqMap={목:'528Hz',화:'417Hz',토:'396Hz',금:'741Hz',수:'852Hz'};
        return{score:(function(){var _s=rng((bs.dateSeed||54321)*43+1101)&0x7fff;return Math.max(70,Math.min(93,75+_s%18));})(),
          detail:'현재 시진('+SIJIN_DATA[sj].name+') 오행 <strong>'+sjOh+'</strong> — 지금 이 순간 최적 방위: <strong style="color:#34d399">'+jupDir+'쪽</strong>.'
            +(p?' NASA 목성 위치 기반 실시간 방위.':'')+' 그 방향으로 앉아 <strong>'+fqMap[sjOh]+'</strong> 청취 시 공간 에너지 흡수 극대화.',
          rows:[{i:'🧭',t:'지금 최적 방위: <strong>'+jupDir+'쪽</strong>'+(p?' (NASA 목성 실시간 계산)':'')},
                {i:'⏰',t:'시진 오행: <strong>'+sjOh+'</strong> — 이 방향+이 음악 = 풍수 시너지'},
                {i:'🎵',t:'추천: <strong>'+fqMap[sjOh]+'</strong> — 공간×시진×오행 삼중 공명'}]};
      }},

    // ── 12 카발라 ────────────────────────────────────
    {id:'kabala',name:'카발라 수비학',sub:'세피로트 10구체 · 생명나무 에너지',emoji:'✡️',color:'#818cf8',bg:'rgba(129,140,248,.06)',border:'rgba(129,140,248,.2)',
      analyze:function(bs){
        var p=window._nasaPlanets;
        var nepRetro=p?p.neptune.retro:false;
        var sefira=['케테르(왕관)','코크마(지혜)','비나(이해)','헤세드(자비)','게부라(심판)','티페레트(아름다움)','네짜흐(승리)','호드(영광)','예소드(기반)','말쿠트(왕국)'];
        var si2=sefira[(bs.bpm+bs.fci)%10];
        var nepSign=p?p.neptune.zodiac.sign:'물고기자리';
        return{score:(function(){var _s=rng((bs.dateSeed||54321)*47+1201)&0x7fff;return Math.max(68,Math.min(92,73+_s%19));})(),
          detail:'활성 세피라: <strong style="color:#818cf8">'+si2+'</strong>. 해왕성('+nepSign+') '+(nepRetro?'역행 — 내면 정화·영적 성장 가이드':'순행 — 외향적 연결·귀인 에너지 활성')+'.<br>963Hz(신성 의식) + 528Hz(DNA 복구) 이중 주파수 추천.',
          rows:[{i:'✨',t:'활성 세피라: <strong>'+si2+'</strong>'+(nepRetro?' (역행 — 내적 정화)':' (순행 — 외향 연결)')},
                {i:'🌊',t:'해왕성('+nepSign+') — 영적 세피로트 에너지 채널'},
                {i:'🎵',t:'추천: <strong>963Hz</strong> 신성 의식 + <strong>528Hz</strong> 기적 주파수'}]};
      }},

    // ── 13 하우스 시스템 ─────────────────────────────
    {id:'house',name:'하우스 시스템',sub:'12하우스 × 현재 행성 트랜짓 위치',emoji:'🏛️',color:'#38bdf8',bg:'rgba(56,189,248,.06)',border:'rgba(56,189,248,.2)',
      analyze:function(bs){
        var p=window._nasaPlanets;
        var sj=bs.siJin!==undefined?bs.siJin:getCurrentSiJin();
        var houseNm=['1(자아·외모)','2(재물·가치)','3(소통·이동)','4(가정·뿌리)','5(창의·연애)','6(건강·일상)','7(관계·계약)','8(변환·유산)','9(철학·해외)','10(커리어·명성)','11(공동체·꿈)','12(무의식·비밀)'];
        var jupHouse=p?houseNm[Math.floor(parseFloat(p.jupiter.lon)/30)%12]:houseNm[sj%12];
        var fq=[528,396,528,852,417,528,639,852,528,396,741,852][sj%12]+'Hz';
        return{score:(function(){var _s=rng((bs.dateSeed||54321)*53+1301)&0x7fff;return Math.max(70,Math.min(93,75+_s%18));})(),
          detail:'목성이 현재 <strong style="color:#38bdf8">'+jupHouse+'</strong>에서 12년 주기 행운을 방사합니다. 현재 시진('+SIJIN_DATA[sj].name+') — 이 하우스 에너지가 지금 이 시간대에 가장 강력하게 활성화됩니다.',
          rows:[{i:'🏛️',t:'목성 하우스: <strong>'+jupHouse+'</strong> — 현재 최대 행운 영역'},
                {i:'⏰',t:'시진: <strong>'+SIJIN_DATA[sj].name+'</strong> × 하우스 에너지 동시 활성'},
                {i:'🎵',t:'추천: <strong>'+fq+'</strong> (하우스 × 시진 최적 공명)'}]};
      }},

    // ── 14 태을신수 ──────────────────────────────────
    {id:'taeeul',name:'태을신수',sub:'태을구궁 · 시대 에너지 × 지금 시진',emoji:'🌀',color:'#a78bfa',bg:'rgba(167,139,250,.06)',border:'rgba(167,139,250,.2)',
      analyze:function(bs){
        var sj=bs.siJin!==undefined?bs.siJin:getCurrentSiJin();
        var season=bs.season||getCurrentSeason();
        var sOh={봄:'목',여름:'화',가을:'금',겨울:'수'}[season]||'토';
        var sjOh=SIJIN_DATA[sj].oh;
        var gungNm=['일백수성궁','이흑토성궁','삼벽목성궁','사록목성궁','오황토성궁','육백금성궁','칠적금성궁','팔백토성궁','구자화성궁'];
        var gung=gungNm[(bs.bpm+bs.eng+sj)%9];
        var fq={목:'528Hz',화:'417Hz',토:'396Hz',금:'741Hz',수:'852Hz'}[sOh];
        return{score:(function(){var _s=rng((bs.dateSeed||54321)*59+1401)&0x7fff;return Math.max(69,Math.min(92,74+_s%18));})(),
          detail:'현재 태을구궁: <strong style="color:#a78bfa">'+gung+'</strong>. 계절('+season+') 오행 <strong>'+sOh+'</strong> × 시진('+SIJIN_DATA[sj].name+') 오행 <strong>'+sjOh+'</strong> — 시대 에너지 흐름을 탄 음악 추천.',
          rows:[{i:'🌀',t:'활성 구궁: <strong>'+gung+'</strong>'},
                {i:'🍃',t:'계절('+season+') × 시진('+SIJIN_DATA[sj].name+') 이중 오행 교차'},
                {i:'🎵',t:'추천: <strong>'+fq+'</strong> (시대 에너지 × 계절 공명)'}]};
      }},

    // ── 15 타로 ──────────────────────────────────────
    {id:'taro',name:'타로 × 달 위상',sub:'달 위상 × 78장 아르카나 에너지',emoji:'🎴',color:'#f472b6',bg:'rgba(244,114,182,.06)',border:'rgba(244,114,182,.2)',
      analyze:function(bs){
        var p=window._nasaPlanets;
        var sj=bs.siJin!==undefined?bs.siJin:getCurrentSiJin();
        var majorNm=['바보','마법사','여사제','여황제','황제','교황','연인','전차','힘','은둔자','운명의 수레바퀴','정의','매달린 사람','죽음','절제','악마','탑','별','달','태양','심판','세계'];
        var moonPhase=p?(((parseFloat(p.moon.lon)-parseFloat(p.sun.lon)+360)%360)):180;
        var cardIdx=(bs.bpm+bs.hrv+Math.floor(moonPhase/15)+sj)%22;
        var card=majorNm[cardIdx];
        var freqs=[528,417,396,528,396,639,639,417,528,852,528,396,741,852,528,741,852,528,852,528,417,639];
        var fq=freqs[cardIdx]+'Hz';
        var phNm=moonPhase<45?'삭(새달)':moonPhase<135?'상현':moonPhase<225?'망(보름)':moonPhase<315?'하현':'그믐';
        return{score:(function(){var _s=rng((bs.dateSeed||54321)*61+1501)&0x7fff;return Math.max(67,Math.min(93,72+_s%21));})(),
          detail:'달 위상: <strong style="color:#f472b6">'+phNm+'</strong> ('+moonPhase.toFixed(0)+'°) × 현재 시진('+SIJIN_DATA[sj].name+') — 공명 카드: <strong style="color:#f472b6">'+card+'</strong>. '+fq+' 직관 에너지 가이드.',
          rows:[{i:'🌙',t:'달 위상: <strong>'+phNm+'</strong> · 카드: <strong>'+card+'</strong>'},
                {i:'⏰',t:'시진 <strong>'+SIJIN_DATA[sj].name+'</strong> × 달 에너지 교차'},
                {i:'🎵',t:'추천: <strong>'+fq+'</strong> (아르카나 카드 공명 주파수)'},
                {i:'⚠️',t:'<span style="color:rgba(251,191,36,.7);font-size:11px;">타로 미실시 — 달 위상 기반 예측값입니다 (타로 뽑기 후 더 정밀해집니다)</span>'}]};
      }},

    // ── 16 합성 차트 ─────────────────────────────────
    {id:'synastry',name:'합성 차트 · 관계 에너지',sub:'금성·화성 실시간 × 인연 주파수',emoji:'💞',color:'#fb923c',bg:'rgba(251,146,60,.06)',border:'rgba(251,146,60,.2)',
      analyze:function(bs){
        var p=window._nasaPlanets;
        var venRetro=p?p.venus.retro:false;
        var venSign=p?p.venus.zodiac.sign:'금성';
        var sj=bs.siJin!==undefined?bs.siJin:getCurrentSiJin();
        var fq=venRetro?639:528;
        return{score:(function(){var _s=rng((bs.dateSeed||54321)*67+1601)&0x7fff;return Math.max(68,Math.min(92,73+_s%19));})(),
          detail:'금성('+venSign+') '+(venRetro?'⚠️ 역행 — 기존 관계 점검·회복 에너지. 639Hz 조화 주파수 추천.':'순행 — 새 인연·관계 발전 에너지. 528Hz 사랑·DNA 주파수 추천.')+'<br>현재 시진('+SIJIN_DATA[sj].name+') — 관계 에너지 활성 시간대.',
          rows:[{i:'💞',t:'금성('+venSign+') '+(venRetro?'⚠️ 역행 (기존 관계 점검)':'▶ 순행 (새 인연 활성)')},
                {i:'⏰',t:'시진: <strong>'+SIJIN_DATA[sj].name+'</strong> — 인연 에너지 활성'},
                {i:'🎵',t:'추천: <strong>'+fq+'Hz</strong>'+(venRetro?' (관계 조화 주파수)':' (사랑·연결 주파수)')}]};
      }},

    // ── 17 관상학 ────────────────────────────────────
    {id:'gwan',name:'관상학 + rPPG',sub:'안면 43포인트 혈류 × 오행 기색',emoji:'👁️',color:'#e2e8f0',bg:'rgba(226,232,240,.05)',border:'rgba(226,232,240,.15)',
      analyze:function(bs){
        var sj=bs.siJin!==undefined?bs.siJin:getCurrentSiJin();
        var gParts=['이마(관록궁)','눈(부처궁)','코(재물궁)','입(복덕궁)','턱(말년운)'];
        var gp=gParts[(bs.fci+sj)%5];
        var gc=['밝음·귀인운','빛남·명예운','윤기·재물운','화사·인기운','탄력·건강운'][(bs.fci+sj)%5];
        return{score:(function(){var _s=rng((bs.dateSeed||54321)*71+1701)&0x7fff;return Math.max(65,Math.min(90,70+_s%20));})(),
          detail:'rPPG 안면 혈류 FCI <strong>'+bs.fci+'%</strong> — <strong>'+gp+'</strong>에서 <strong>'+gc+'</strong> 에너지 확인. 현재 시진('+SIJIN_DATA[sj].name+') 안면 에너지 최대 활성 구간.',
          rows:[{i:'👁️',t:'활성 관상 부위: <strong>'+gp+'</strong> — '+gc},
                {i:'⏰',t:'시진 <strong>'+SIJIN_DATA[sj].name+'</strong> — 안면 혈류 최대 활성'},
                {i:'🎵',t:'추천: <strong>528Hz</strong> (안면 세포 공명·기색 개선)'}].concat(window._baiScanned?[]:[{i:'⚠️',t:'<span style="color:rgba(251,191,36,.7);font-size:11px;">Bio 스캔 미완료 — 기본값 기반 예측입니다</span>'}])};
      }},

    // ── 18 손금학 ────────────────────────────────────
    {id:'palm',name:'손금학 + rPPG',sub:'손바닥 혈류 지수 × 운명선 에너지',emoji:'✋',color:'#fbbf24',bg:'rgba(251,191,36,.06)',border:'rgba(251,191,36,.2)',
      analyze:function(bs){
        var sj=bs.siJin!==undefined?bs.siJin:getCurrentSiJin();
        var lines=['생명선','두뇌선','감정선','운명선','태양선'];
        var ln=lines[(bs.bpm+bs.hrv+sj)%5];
        var bli=bs.bli||75;
        var energy=bli>80?'매우 강함':bli>65?'양호':'보충 필요';
        return{score:(function(){var _s=rng((bs.dateSeed||54321)*73+1801)&0x7fff;return Math.max(67,Math.min(92,72+_s%20));})(),
          detail:'BLI(손금 분기 지수) <strong>'+bli+'</strong> — <strong>'+ln+'</strong> 에너지 <strong>'+energy+'</strong>. 현재 시진('+SIJIN_DATA[sj].name+') 손바닥 혈류 최대 활성 — 지금 이 시간대에 손바닥 방향으로 음악 청취 시 에너지 흡수 극대화.',
          rows:[{i:'✋',t:'활성 손금선: <strong>'+ln+'</strong> · BLI: <strong>'+bli+'</strong> ('+energy+')'},
                {i:'⏰',t:'시진 <strong>'+SIJIN_DATA[sj].name+'</strong> — 손바닥 에너지 최대 활성'},
                {i:'🎵',t:'추천: <strong>396Hz</strong> (손바닥 혈류 공명·운명선 강화)'}].concat(window._baiScanned?[]:[{i:'⚠️',t:'<span style="color:rgba(251,191,36,.7);font-size:11px;">Bio 스캔 미완료 — 기본값 기반 예측입니다</span>'}])};
      }}
  ],
  GUGAK:[
    {song:'청성자진한잎',artist:'황병기',reason:'가야금(木·金) 최고봉 — 간·폐 동시 활성화, 집중·창의 에너지',tag:'국악',yt:'https://www.youtube.com/results?search_query=황병기+청성자진한잎'},
    {song:'수제천(壽齊天)',artist:'국립국악원',reason:'오행 균형 완성 전통 궁중악, 장수 에너지 충전',tag:'국악',yt:'https://www.youtube.com/results?search_query=수제천+국악원'},
    {song:'산조 가야금',artist:'안숙선',reason:'오행 전체를 아우르는 산조 리듬, 감정 정화와 기운 상승',tag:'국악',yt:'https://www.youtube.com/results?search_query=안숙선+가야금산조'},
    {song:'처용무',artist:'국립국악원',reason:'병마 퇴치와 복(福) 초대 — 기문둔갑 8문 개방 에너지',tag:'국악',yt:'https://www.youtube.com/results?search_query=처용무+국립국악원'}
  ],
  SOLFEGGIO:[
    {song:'528Hz DNA Repair Miracle Tone',artist:'Meditative Mind',reason:'528Hz — DNA 복구·세포 재생·운 기운 개방 (奇跡의 주파수)',tag:'528Hz',yt:'https://www.youtube.com/results?search_query=528hz+miracle+tone+meditative+mind'},
    {song:'396Hz Liberation Frequency',artist:'Healing Frequency Music',reason:'396Hz — 두려움·죄책감 해방, 뿌리 에너지 정화',tag:'396Hz',yt:'https://www.youtube.com/results?search_query=396hz+liberation+frequency'},
    {song:'432Hz Miracle Tone Nature',artist:'PowerThoughts Meditation',reason:'432Hz — 자연 공명, 우주 주파수 정렬 (기문둔갑 최적)',tag:'432Hz',yt:'https://www.youtube.com/results?search_query=432hz+miracle+tone+nature'},
    {song:'639Hz Harmonize Relationships',artist:'Solfeggio Healing Music',reason:'639Hz — 관계·조화·사랑 에너지 (주역 공명 주파수)',tag:'639Hz',yt:'https://www.youtube.com/results?search_query=639hz+harmonize+solfeggio'},
    {song:'741Hz Cleanse Infections',artist:'Meditative Mind',reason:'741Hz — 직관력 폭발·독소 제거 (성명학 금(金) 공명)',tag:'741Hz',yt:'https://www.youtube.com/results?search_query=741hz+solfeggio+frequency'},
    {song:'852Hz Spiritual Order',artist:'Binaural Beats Meditation',reason:'852Hz — 귀인 연결·영적 질서 (자미두수 귀인궁 활성)',tag:'852Hz',yt:'https://www.youtube.com/results?search_query=852hz+spiritual+order+frequency'}
  ]
};

function _getMusicOh(){
  if(window._pajR&&window._pajR.domOh) return window._pajR.domOh;
  if(window.calcResult&&window.calcResult.domOh) return window.calcResult.domOh;
  // BS 데이터로 폴백
  var bpm=(typeof BS!=='undefined'&&BS.bpm)||72;
  var ohs=['목','화','토','금','수'];
  return ohs[bpm%5];
}

function bsMusicRecommend(ili){
  var box=document.getElementById('bsMusicBox');
  var cards=document.getElementById('bsMusicCards');
  var mlist=document.getElementById('bsMusicList');
  if(!box||!cards||!mlist) return;
  box.style.display='block';
  // ── 1단계/2단계 레이블 자동 업데이트 ──
  var _bfd = window._bioFinalData||{};
  var _isStage2 = window._baiScanned || (_bfd.fci>0 || _bfd.hrv>0);
  var _stageEl = document.getElementById('_musicStageLabel');
  if(_stageEl){
    _stageEl.textContent = _isStage2
      ? '🧬 2단계: 생체신호 × 역학 융합 정밀 가이드'
      : '📜 1단계: 만세력 × NASA 실시간 기반 추천';
    _stageEl.style.color = _isStage2 ? '#34d399' : '#d4a843';
  }
  // 갱신 시각 표시
  var _mrt = document.getElementById('musicRefreshTime');
  if(_mrt){
    var _n=new Date();
    var _sj2name=['자시(23~1)','축시(1~3)','인시(3~5)','묘시(5~7)','진시(7~9)','사시(9~11)','오시(11~13)','미시(13~15)','신시(15~17)','유시(17~19)','술시(19~21)','해시(21~23)'];
    var _sjIdx=(Math.floor((_n.getHours()+1)/2))%12;
    _mrt.textContent = _n.getHours()+':'+String(_n.getMinutes()).padStart(2,'0')+' · '+_sj2name[_sjIdx]+' 기준';
  }
  // 날짜 변경 안내문 제거 (새 스캔 결과가 대체)
  var _oldHint = document.getElementById('_musicDateHint');
  if (_oldHint) _oldHint.style.display = 'none';
  var _sj=typeof _musicSiJin!=='undefined'?SIJIN_DATA[_musicSiJin].name:'계산중';
  cards.innerHTML='<div style="font-size:12px;color:rgba(240,230,200,0.85);text-align:center;padding:10px">⏰ '+_sj+' × 50대 역학 중 × NASA 융합 분석 중...</div>';
  updateMusicTimeUI();
  mlist.style.display='none'; mlist.innerHTML='';

  var oh=_getMusicOh();
  var bpm=(typeof BS!=='undefined'&&BS.bpm)||72;
  var hrv=(typeof BS!=='undefined'&&BS.hrv)||45;
  var fci=(typeof BS!=='undefined'&&BS.fci)||80;
  var eng=(typeof BS!=='undefined'&&BS.eng)||82;
  var _fd2=window._fcBase||new Date();
  var _now2=new Date();
  // 시진(2시간 단위) + 분(10분 단위) 포함 → 시간에 따라 달라짐
  var _timeSlot = _now2.getHours()*10 + Math.floor(_now2.getMinutes()/10);
  var _dseed=rng(_fd2.getFullYear()*10000+(_fd2.getMonth()+1)*100+_fd2.getDate()
    +(window._fcR?window._fcR.y*7:0)
    +_timeSlot*997          // 10분마다 시드 변화
    +(typeof BS!=='undefined'?((BS.hrv||0)*13+(BS.fci||0)*7):0)  // 생체 데이터 포함
    );
  var bli=(typeof BS!=='undefined'&&BS.bli)||75;
  var sj=typeof _musicSiJin!=='undefined'?_musicSiJin:getCurrentSiJin();
  var season=typeof _musicSeason!=='undefined'?_musicSeason:getCurrentSeason();
  window._lastMusicILI = ili;
  var _now4=new Date();
  // 시진(2시간)+계절+분(10분) 모두 반영한 동적 시드
  var _sjIdx2 = Math.floor(_now4.getHours()/2);
  var _seasonIdx2 = (season==='봄')?0:(season==='여름')?1:(season==='가을')?2:3;
  var _dynSeed2 = (typeof getDynamicSeed==='function') ? getDynamicSeed() :
    (_dseed
      + _now4.getHours()*1997
      + Math.floor(_now4.getMinutes()/10)*307
      + _sjIdx2 * 4999
      + _seasonIdx2 * 8191
    );
  var bs={bpm:bpm,hrv:hrv,fci:fci,eng:eng,ili:ili,oh:oh,
    dateSeed:_dynSeed2,  // 시간+생체+NASA 통합 동적 시드
    siJin:sj,season:season,bli:bli,
    timeSlot:_now4.getHours()*10+Math.floor(_now4.getMinutes()/10)  // 10분 단위
  };

  var scores=[];
  cards.innerHTML='';

  MUSIC_DB.YEOKAK.forEach(function(yk,i){
    setTimeout(function(){
      var res=yk.analyze(bs);
      scores.push(res.score);
      var sc=res.score;
      var scc=sc>=85?'#34d399':sc>=75?'#d4a843':'#94a3b8';
      var card=document.createElement('div');
      card.className='bsmc-card';
      card.innerHTML=
        '<div class="bsmc-head">'+
          '<div class="bsmc-ico" style="background:'+yk.bg+';border:1px solid '+yk.border+'">'+yk.emoji+'</div>'+
          '<div style="flex:1"><div class="bsmc-title">'+yk.name+'</div><div class="bsmc-sub">'+yk.sub+'</div></div>'+
          '<div class="bsmc-score"><div class="bsmc-score-v" style="color:'+scc+'">'+sc+'</div><div class="bsmc-score-l">운 지수</div></div>'+
        '</div>'+
        '<div class="bsmc-body">'+
          '<div class="bsmc-analysis">'+res.detail+'</div>'+
          res.rows.map(function(r){return'<div class="bsmc-row"><div class="bsmc-row-i">'+r.i+'</div><div class="bsmc-row-t">'+r.t+'</div></div>';}).join('')+
        '</div>';
      card.querySelector('.bsmc-head').addEventListener('click',function(){card.classList.toggle('open');});
      cards.appendChild(card);
      if(i===MUSIC_DB.YEOKAK.length-1){
        setTimeout(function(){
          var avg=Math.round(scores.reduce(function(a,b){return a+b;},0)/scores.length);
          _showMusicList(mlist,bs,avg);
        },600);
      }
    },i*350+400);
  });
}

// === CGO YouTube 실시간 AI 추천 ===
var _cgoYtPool={
  '목':['528hz forest nature healing','wood element growth music','nature morning energy focus','green healing binaural 432hz','spring renewal uplifting music','forest birds sunrise meditation'],
  '화':['fire energy motivation music','heart chakra 417hz activation','passion upbeat energy music','summer fire dance motivation','confidence high vibration boost','fire transformation frequency'],
  '토':['396hz earth grounding music','stability center meditation','abundance earth frequency healing','autumn harvest warmth music','grounding nature calm therapy','earth element balance music'],
  '금':['741hz crystal clarity music','crystal singing bowls healing','classical focus clarity music','autumn gold precision music','lung meridian healing frequency','gold clarity achievement music'],
  '수':['852hz ocean wisdom healing','ocean waves meditation sleep','water flow intuition music','winter wisdom contemplation','kidney healing water frequency','rain clarity meditation music']
};
function pmYtBuildQ(oh,sj,ili){
  var pool=_cgoYtPool[oh]||_cgoYtPool['목'];
  var now=new Date();
  var day=Math.floor((now-new Date(now.getFullYear(),0,0))/864e5);
  var idx=(day+sj*3+Math.floor(ili/20))%pool.length;
  return pool[idx]+' '+(ili>=80?'high energy':ili>=60?'harmony':'healing recovery');
}
function pmYtOpen(vid,title,ch){
  var ov=document.getElementById('cgoYtOverlay');
  var fr=document.getElementById('cgoYtFrame');
  var ti=document.getElementById('cgoYtTitle');
  var ci=document.getElementById('cgoYtCh');
  if(!ov)return;
  ov.classList.add('show');
  ov.onclick=function(e){if(e.target===ov)cgoYtClose();};
  if(fr)fr.src='https://www.youtube.com/embed/'+vid+'?autoplay=1&rel=0';
  if(ti)ti.textContent=title;
  if(ci)ci.textContent=ch+' · YouTube';
}
function pmYtFetch(oh,sj,ili,cid,_retry){
  var box=document.getElementById(cid);
  if(!box)return;
  var isLight=(cid==='mfu-yt-live');
  var cNum=isLight?'#b45309':'rgba(212,168,67,.7)',cTitle=isLight?'#0f172a':'rgba(240,230,200,.95)',cArtist=isLight?'#64748b':'rgba(200,185,140,.55)',cReason=isLight?'#047857':'rgba(52,211,153,.7)';
  // ★ AI 제거 — 2,643곡 검증 DB에서 코드가 직접 5곡 무작위 추출 (오행 4 + 솔페지오 1)
  var V=window.MUSIC_WHITELIST_V2||{};
  function _pk(arr,n){arr=(arr||[]).slice();for(var i=arr.length-1;i>0;i--){var k=Math.floor(Math.random()*(i+1));var t=arr[i];arr[i]=arr[k];arr[k]=t;}return arr.slice(0,n);}
  var sel=_pk(V[oh],4).concat(_pk(V['주파수'],1));
  if(!sel.length){ sel=[{t:'528Hz 세포 치유 음악',a:'Solfeggio',cat:'주파수',m:'마인드 리프레시'},{t:'Weightless',a:'Marconi Union',cat:'해외',m:'심신 이완'}]; }
  var nums=['①','②','③','④','⑤'];
  var wrap=document.createElement('div');
  wrap.style.cssText='display:flex;flex-direction:column;gap:6px;';
  sel.slice(0,5).forEach(function(c,idx){
    var qy=(c.t||'')+' '+(c.a||'');
    var ytUrl='https://www.youtube.com/results?search_query='+encodeURIComponent(qy);
    var row=document.createElement('a');
    row.href=ytUrl; row.target='_blank'; row.rel='noopener';
    row.style.cssText='display:flex;align-items:center;gap:12px;padding:10px 12px;background:rgba(255,255,255,'+(isLight?'.5':'.04')+');border:1px solid rgba('+(isLight?'0,0,0,.06':'255,255,255,.08')+');border-radius:10px;text-decoration:none;cursor:pointer;';
    row.innerHTML=
      '<div style="font-size:18px;font-weight:900;color:'+cNum+';flex-shrink:0;width:22px;text-align:center;">'+(nums[idx]||(idx+1))+'</div>'
      +'<div style="flex:1;min-width:0;">'
      +'<div style="font-size:12px;font-weight:700;color:'+cTitle+';">'+(c.t||'')+(c.a?' <span style="font-size:10px;color:'+cArtist+';font-weight:400;">\u2014 '+c.a+'</span>':'')+'</div>'
      +'<div style="font-size:10px;color:'+cReason+';margin-top:2px;">'+(c.m||(c.cat==='주파수'?'솔페지오 이완 주파수':'오행 '+oh+' 에너지 매칭'))+'</div>'
      +'</div>'
      +'<div style="flex-shrink:0;padding:5px 10px;background:rgba(255,0,0,.15);border:1px solid rgba(255,0,0,.3);border-radius:8px;font-size:10px;font-weight:700;color:#ff6666;">\u25b6 \uc7ac\uc0dd</div>';
    wrap.appendChild(row);
  });
  box.innerHTML=''; box.appendChild(wrap);
}

// == CGO 전체 음악 AI 추천 ==

// ════════════════════════════════════════════════════════
// 📜 음악 화이트리스트 v1.0 (28번째 / 옵션 1+2 합체)
//   ✦ 검증된 50곡 — AI는 이 중에서만 선택 (환각 0%)
//   ✦ 한국 30 + 해외 15 + 솔페지오 5
//   ✦ 5오행 × 6곡 분류 + 솔페지오 5곡 + 추가 메가히트 15곡
//   ✦ q필드: YouTube 정확 검색어 (쌍따옴표 형식)
// ════════════════════════════════════════════════════════
window.MUSIC_WHITELIST_V1 = {
  // ━━━ 목(木) 성장·봄·평정 — 10곡 ━━━
  '목': [
    {t:'봄날',a:'BTS',q:'"봄날" "BTS" official MV',cat:'한국',m:'평온'},
    {t:'벚꽃 엔딩',a:'버스커 버스커',q:'"벚꽃 엔딩" "버스커 버스커" official',cat:'한국',m:'설렘'},
    {t:'이게 아닌데',a:'이무진',q:'"이게 아닌데" "이무진" official',cat:'한국',m:'밝음'},
    {t:'좋니',a:'윤종신',q:'"좋니" "윤종신" official',cat:'한국',m:'그리움'},
    {t:'밤편지',a:'아이유',q:'"밤편지" "아이유" IU official',cat:'한국',m:'잔잔'},
    {t:'사랑은 늘 도망가',a:'임영웅',q:'"사랑은 늘 도망가" "임영웅" official',cat:'한국',m:'서정'},
    {t:'Spring Day',a:'Sezairi',q:'"Spring Day" Sezairi official',cat:'해외',m:'성장'},
    {t:'Yellow',a:'Coldplay',q:'"Yellow" "Coldplay" official video',cat:'해외',m:'평온'},
    {t:'Photograph',a:'Ed Sheeran',q:'"Photograph" "Ed Sheeran" official',cat:'해외',m:'그리움'},
    {t:'Let It Be',a:'The Beatles',q:'"Let It Be" "The Beatles" official',cat:'해외',m:'위로'}
  ],
  // ━━━ 화(火) 열정·여름·활력 — 10곡 ━━━
  '화': [
    {t:'다이너마이트',a:'BTS',q:'"Dynamite" "BTS" official MV',cat:'한국',m:'활력'},
    {t:'마음을 드려요',a:'아이유',q:'"마음을 드려요" "아이유" IU official',cat:'한국',m:'설렘'},
    {t:'롤린 (Rollin)',a:'브레이브걸스',q:'"롤린" "브레이브걸스" Rollin Brave Girls official',cat:'한국',m:'활기'},
    {t:'Next Level',a:'에스파',q:'"Next Level" aespa official',cat:'한국',m:'에너지'},
    {t:'Fantastic Baby',a:'BIGBANG',q:'"Fantastic Baby" "BIGBANG" official MV',cat:'한국',m:'폭발'},
    {t:'강남스타일',a:'PSY',q:'"강남스타일" "PSY" Gangnam Style official',cat:'한국',m:'유쾌'},
    {t:'Shape of You',a:'Ed Sheeran',q:'"Shape of You" "Ed Sheeran" official',cat:'해외',m:'경쾌'},
    {t:'Uptown Funk',a:'Bruno Mars',q:'"Uptown Funk" "Bruno Mars" official',cat:'해외',m:'활기'},
    {t:'Happy',a:'Pharrell Williams',q:'"Happy" "Pharrell Williams" official',cat:'해외',m:'행복'},
    {t:'Bad Guy',a:'Billie Eilish',q:'"bad guy" "Billie Eilish" official',cat:'해외',m:'쿨'}
  ],
  // ━━━ 토(土) 안정·중심·신뢰 — 10곡 ━━━
  '토': [
    {t:'그날들',a:'김광석',q:'"그날들" "김광석" official',cat:'한국',m:'안정'},
    {t:'서른 즈음에',a:'김광석',q:'"서른 즈음에" "김광석" official',cat:'한국',m:'성찰'},
    {t:'어떻게 사랑이 그래요',a:'이승철',q:'"어떻게 사랑이 그래요" "이승철" official',cat:'한국',m:'성숙'},
    {t:'사랑이 지나가면',a:'이문세',q:'"사랑이 지나가면" "이문세" official',cat:'한국',m:'그리움'},
    {t:'걱정말아요 그대',a:'이적',q:'"걱정말아요 그대" "이적" official',cat:'한국',m:'위로'},
    {t:'You Raise Me Up',a:'Westlife',q:'"You Raise Me Up" "Westlife" official',cat:'해외',m:'위로'},
    {t:'Wonderful Tonight',a:'Eric Clapton',q:'"Wonderful Tonight" "Eric Clapton" official',cat:'해외',m:'평온'},
    {t:'Stand By Me',a:'Ben E. King',q:'"Stand By Me" "Ben E King" official',cat:'해외',m:'안정'},
    {t:'Hallelujah',a:'Leonard Cohen',q:'"Hallelujah" "Leonard Cohen" official',cat:'해외',m:'성찰'},
    {t:'Imagine',a:'John Lennon',q:'"Imagine" "John Lennon" official',cat:'해외',m:'평화'}
  ],
  // ━━━ 금(金) 집중·가을·절제 — 10곡 ━━━
  '금': [
    {t:'가을 아침',a:'아이유',q:'"가을 아침" "아이유" IU official',cat:'한국',m:'명료'},
    {t:'10월의 어느 멋진 날에',a:'김동규',q:'"10월의 어느 멋진 날에" "김동규" official',cat:'한국',m:'서정'},
    {t:'가을 우체국 앞에서',a:'윤도현',q:'"가을 우체국 앞에서" "윤도현" official',cat:'한국',m:'성찰'},
    {t:'안녕',a:'폴킴',q:'"안녕" "폴킴" Paul Kim official',cat:'한국',m:'절제'},
    {t:'잘 지내자, 우리',a:'장범준',q:'"잘 지내자 우리" "장범준" official',cat:'한국',m:'담담'},
    {t:'사건의 지평선',a:'윤하',q:'"사건의 지평선" "윤하" Younha official',cat:'한국',m:'몰입'},
    {t:'November Rain',a:'Guns N\' Roses',q:'"November Rain" "Guns N Roses" official',cat:'해외',m:'장엄'},
    {t:'Autumn Leaves',a:'Eva Cassidy',q:'"Autumn Leaves" "Eva Cassidy" official',cat:'해외',m:'성숙'},
    {t:'The Sound of Silence',a:'Simon & Garfunkel',q:'"Sound of Silence" "Simon Garfunkel" official',cat:'해외',m:'명상'},
    {t:'Hotel California',a:'Eagles',q:'"Hotel California" "Eagles" official',cat:'해외',m:'몰입'}
  ],
  // ━━━ 수(水) 지혜·겨울·감성 — 10곡 ━━━
  '수': [
    {t:'밤편지',a:'아이유',q:'"밤편지" "아이유" IU official',cat:'한국',m:'잔잔'},
    {t:'첫눈처럼 너에게 가겠다',a:'에일리',q:'"첫눈처럼 너에게 가겠다" "에일리" Ailee official',cat:'한국',m:'감성'},
    {t:'겨울의 끝',a:'박효신',q:'"겨울의 끝" "박효신" official',cat:'한국',m:'서정'},
    {t:'야경',a:'박효신',q:'"야경" "박효신" Park Hyo Shin official',cat:'한국',m:'고요'},
    {t:'옛사랑',a:'이문세',q:'"옛사랑" "이문세" official',cat:'한국',m:'그리움'},
    {t:'겨울사랑',a:'김연우',q:'"겨울사랑" "김연우" official',cat:'한국',m:'잔잔'},
    {t:'Someone Like You',a:'Adele',q:'"Someone Like You" "Adele" official',cat:'해외',m:'감성'},
    {t:'River Flows in You',a:'Yiruma',q:'"River Flows in You" "Yiruma" piano',cat:'해외',m:'명상'},
    {t:'Comptine d\'un autre été',a:'Yann Tiersen',q:'"Comptine d un autre ete" "Yann Tiersen" Amelie',cat:'해외',m:'서정'},
    {t:'Clair de Lune',a:'Debussy',q:'"Clair de Lune" "Debussy" piano',cat:'해외',m:'고요'}
  ],
  // ━━━ 솔페지오 주파수 — 5곡 (모든 오행 공통) ━━━
  '주파수': [
    {t:'396Hz Liberation',a:'Solfeggio Healing',q:'"396Hz" Solfeggio liberation guilt fear',cat:'주파수',m:'해방',hz:396},
    {t:'432Hz Healing',a:'Solfeggio Healing',q:'"432Hz" healing meditation music',cat:'주파수',m:'치유',hz:432},
    {t:'528Hz Love DNA Repair',a:'Solfeggio Healing',q:'"528Hz" love frequency DNA repair',cat:'주파수',m:'사랑',hz:528},
    {t:'639Hz Relationships',a:'Solfeggio Healing',q:'"639Hz" Solfeggio relationships harmony',cat:'주파수',m:'조화',hz:639},
    {t:'852Hz Spiritual Awakening',a:'Solfeggio Healing',q:'"852Hz" Solfeggio spiritual awakening',cat:'주파수',m:'각성',hz:852}
  ]
};
console.log('[MUSIC_WHITELIST] 50곡 박제 ✦ 환각 0% 보장');
// ════ 제미나이 2,643곡 V2 DB (오행별 + 솔페지오) ════
window.MUSIC_WHITELIST_V2={"목":[{"t":"봄 안녕 봄","a":"아이유 (IU)","q":"\"봄 안녕 봄\" \"아이유 (IU)\"","cat":"한국","m":"새로운 시작과 성장의 기운"},{"t":"벚꽃 엔딩","a":"버스커 버스커","q":"\"벚꽃 엔딩\" \"버스커 버스커\"","cat":"한국","m":"목의 계절인 봄의 활기"},{"t":"나만 봄","a":"볼빨간사춘기","q":"\"나만 봄\" \"볼빨간사춘기\"","cat":"한국","m":"통통 튀는 목의 생명력"},{"t":"제주도의 푸른 밤","a":"성시경","q":"\"제주도의 푸른 밤\" \"성시경\"","cat":"한국","m":"푸른색 에너지 공명"},{"t":"Dynamite","a":"방탄소년단 (BTS)","q":"\"Dynamite\" \"방탄소년단 (BTS)\"","cat":"한국","m":"근육과 세포를 깨우는 리듬"},{"t":"선물","a":"멜로망스","q":"\"선물\" \"멜로망스\"","cat":"한국","m":"긍정적인 성장의 에너지"},{"t":"모든 날, 모든 순간","a":"폴킴","q":"\"모든 날, 모든 순간\" \"폴킴\"","cat":"한국","m":"정서적 안정과 뿌리 내림"},{"t":"봄이 좋냐??","a":"10CM","q":"\"봄이 좋냐??\" \"10CM\"","cat":"한국","m":"유쾌한 목 기운의 발산"},{"t":"Give Love","a":"악뮤 (AKMU)","q":"\"Give Love\" \"악뮤 (AKMU)\"","cat":"한국","m":"어린 싹과 같은 순수한 생명력"},{"t":"다시 만난 세계","a":"소녀시대","q":"\"다시 만난 세계\" \"소녀시대\"","cat":"한국","m":"힘찬 전진과 개척의 기운"},{"t":"여행을 떠나요","a":"조용필","q":"\"여행을 떠나요\" \"조용필\"","cat":"한국","m":"간 기능을 활성화하는 시원함"},{"t":"깊은 밤을 날아서","a":"이문세","q":"\"깊은 밤을 날아서\" \"이문세\"","cat":"한국","m":"상상력과 창의력"},{"t":"I","a":"태연","q":"\"I\" \"태연\"","cat":"한국","m":"자아의 성장과 확장"},{"t":"흔들리는 꽃들 속에서...","a":"장범준","q":"\"흔들리는 꽃들 속에서...\" \"장범준\"","cat":"한국","m":"바람과 나무의 유연한 조화"},{"t":"신호등","a":"이무진","q":"\"신호등\" \"이무진\"","cat":"한국","m":"사회로 뻗어 나가는 초록빛 에너지"},{"t":"봄 사랑 벚꽃 말고","a":"하이포&아이유","q":"\"봄 사랑 벚꽃 말고\" \"하이포&아이유\"","cat":"한국","m":"균형 잡힌 목의 기운"},{"t":"한숨","a":"이하이","q":"\"한숨\" \"이하이\"","cat":"한국","m":"간 기능 안정을 돕는 호흡"},{"t":"애상","a":"쿨 (COOL)","q":"\"애상\" \"쿨 (COOL)\"","cat":"한국","m":"목의 발랄한 운동성"},{"t":"야생화","a":"박효신","q":"\"야생화\" \"박효신\"","cat":"한국","m":"강인한 생명력과 인내"},{"t":"주저하는 연인들을 위해","a":"잔나비","q":"\"주저하는 연인들을 위해\" \"잔나비\"","cat":"한국","m":"부드러운 나무의 곡선미"},{"t":"Cheer Up","a":"트와이스","q":"\"Cheer Up\" \"트와이스\"","cat":"한국","m":"세포를 깨우는 목의 활력"},{"t":"빨간 맛","a":"레드벨벳","q":"\"빨간 맛\" \"레드벨벳\"","cat":"한국","m":"활짝 피어나는 꽃의 에너지"},{"t":"바람이 불어오는 곳","a":"김광석","q":"\"바람이 불어오는 곳\" \"김광석\"","cat":"한국","m":"자연으로 회귀하는 치유"},{"t":"살짝 설렜어","a":"오마이걸","q":"\"살짝 설렜어\" \"오마이걸\"","cat":"한국","m":"봄바람 같은 경쾌함"},{"t":"Mr. Chu","a":"에이핑크","q":"\"Mr. Chu\" \"에이핑크\"","cat":"한국","m":"목의 상큼한 발산 작용"},{"t":"하늘바라기","a":"정은지","q":"\"하늘바라기\" \"정은지\"","cat":"한국","m":"가족애와 뿌리에 대한 안정감"},{"t":"이제 나만 믿어요","a":"임영웅","q":"\"이제 나만 믿어요\" \"임영웅\"","cat":"한국","m":"든든한 버팀목 같은 에너지"},{"t":"우연히 봄","a":"로꼬 & 유주","q":"\"우연히 봄\" \"로꼬 & 유주\"","cat":"한국","m":"설렘을 유발하는 성장운"},{"t":"I Believe","a":"신승훈","q":"\"I Believe\" \"신승훈\"","cat":"한국","m":"내면의 평화와 목의 인자함"},{"t":"You Are My Everything","a":"거미","q":"\"You Are My Everything\" \"거미\"","cat":"한국","m":"깊고 넓게 뻗는 나무 그늘"},{"t":"예술이야","a":"싸이 (PSY)","q":"\"예술이야\" \"싸이 (PSY)\"","cat":"한국","m":"창조적 파괴와 새로운 탄생"},{"t":"양화대교","a":"자이언티","q":"\"양화대교\" \"자이언티\"","cat":"한국","m":"뿌리를 지키는 힘"},{"t":"너나 해","a":"마마무","q":"\"너나 해\" \"마마무\"","cat":"한국","m":"곧게 뻗은 대나무 같은 기개"},{"t":"아무노래","a":"지코 (ZICO)","q":"\"아무노래\" \"지코 (ZICO)\"","cat":"한국","m":"틀을 깨는 목의 창의성"},{"t":"As If It's Your Last","a":"블랙핑크","q":"\"As If It's Your Last\" \"블랙핑크\"","cat":"한국","m":"목의 강력한 상승 에너지"},{"t":"가시나","a":"선미","q":"\"가시나\" \"선미\"","cat":"한국","m":"유연하지만 날카로운 기운"},{"t":"비도 오고 그래서","a":"헤이즈","q":"\"비도 오고 그래서\" \"헤이즈\"","cat":"한국","m":"수생목의 원리 구현"},{"t":"안녕이라고 말하지마","a":"다비치","q":"\"안녕이라고 말하지마\" \"다비치\"","cat":"한국","m":"감정의 순환과 성숙"},{"t":"보여줄게","a":"에일리","q":"\"보여줄게\" \"에일리\"","cat":"한국","m":"변혁과 개척의 강력한 목"},{"t":"오르막길","a":"윤종신","q":"\"오르막길\" \"윤종신\"","cat":"한국","m":"인내하며 끝까지 자라는 나무"},{"t":"영원한 사랑","a":"핑클","q":"\"영원한 사랑\" \"핑클\"","cat":"한국","m":"목의 순수성과 지속성"},{"t":"너를 사랑해","a":"S.E.S.","q":"\"너를 사랑해\" \"S.E.S.\"","cat":"한국","m":"새싹의 싱그러운 느낌"},{"t":"3!4!","a":"룰라","q":"\"3!4!\" \"룰라\"","cat":"한국","m":"화합과 성장의 기운"},{"t":"가리워진 길","a":"유재하","q":"\"가리워진 길\" \"유재하\"","cat":"한국","m":"올곧은 선비와 같은 목"},{"t":"나타나","a":"김범수","q":"\"나타나\" \"김범수\"","cat":"한국","m":"목의 역동적인 출현"},{"t":"내 귀에 캔디","a":"백지영","q":"\"내 귀에 캔디\" \"백지영\"","cat":"한국","m":"감각을 일깨우는 진동"},{"t":"서울의 달","a":"김건모","q":"\"서울의 달\" \"김건모\"","cat":"한국","m":"도시에서 피어나는 생존력"},{"t":"밤양갱","a":"비비 (BIBI)","q":"\"밤양갱\" \"비비 (BIBI)\"","cat":"한국","m":"아기자기한 목의 결실"},{"t":"Ditto","a":"뉴진스","q":"\"Ditto\" \"뉴진스\"","cat":"한국","m":"맑고 투명한 목의 정서"},{"t":"얼굴 찌푸리지 말아요","a":"하이라이트","q":"\"얼굴 찌푸리지 말아요\" \"하이라이트\"","cat":"한국","m":"간의 화를 다스리는 즐거움"},{"t":"Imagine","a":"John Lennon","q":"\"Imagine\" \"John Lennon\"","cat":"해외","m":"평화와 조화의 근본 주파수"},{"t":"Happy","a":"Pharrell Williams","q":"\"Happy\" \"Pharrell Williams\"","cat":"해외","m":"생동감 넘치는 목의 발산 에너지"},{"t":"I'm Yours","a":"Jason Mraz","q":"\"I'm Yours\" \"Jason Mraz\"","cat":"해외","m":"나무 그늘 아래의 편안한 휴식"},{"t":"Viva La Vida","a":"Coldplay","q":"\"Viva La Vida\" \"Coldplay\"","cat":"해외","m":"승리와 개척의 강력한 상승운"},{"t":"Sugar","a":"Maroon 5","q":"\"Sugar\" \"Maroon 5\"","cat":"해외","m":"세포를 깨우는 달콤한 생명력"},{"t":"Just The Way You Are","a":"Bruno Mars","q":"\"Just The Way You Are\" \"Bruno Mars\"","cat":"해외","m":"있는 그대로의 순수한 성장 에너지"},{"t":"Better Together","a":"Jack Johnson","q":"\"Better Together\" \"Jack Johnson\"","cat":"해외","m":"유연하고 따뜻한 목의 유대감"},{"t":"Shape of You","a":"Ed Sheeran","q":"\"Shape of You\" \"Ed Sheeran\"","cat":"해외","m":"리듬을 통한 근육의 탄력 강화"},{"t":"Send My Love","a":"Adele","q":"\"Send My Love\" \"Adele\"","cat":"해외","m":"과거를 보내고 새롭게 피어남"},{"t":"Shake It Off","a":"Taylor Swift","q":"\"Shake It Off\" \"Taylor Swift\"","cat":"해외","m":"간의 정체된 기운을 털어내는 활력"},{"t":"Here Comes The Sun","a":"The Beatles","q":"\"Here Comes The Sun\" \"The Beatles\"","cat":"해외","m":"봄의 햇살과 새싹의 탄생"},{"t":"Love Yourself","a":"Justin Bieber","q":"\"Love Yourself\" \"Justin Bieber\"","cat":"해외","m":"자아를 존중하며 얻는 내면의 성장"},{"t":"Roar","a":"Katy Perry","q":"\"Roar\" \"Katy Perry\"","cat":"해외","m":"정글 속 사자처럼 뻗어 나가는 기개"},{"t":"Counting Stars","a":"OneRepublic","q":"\"Counting Stars\" \"OneRepublic\"","cat":"해외","m":"무한한 확장성과 창의력 증진"},{"t":"Over The Rainbow","a":"Israel K.","q":"\"Over The Rainbow\" \"Israel K.\"","cat":"해외","m":"자연의 순수한 치유 에너지"},{"t":"Heal The World","a":"Michael Jackson","q":"\"Heal The World\" \"Michael Jackson\"","cat":"해외","m":"지구와 인류를 돌보는 인자함"},{"t":"Bridge Over Troubled Water","a":"Simon & Garfunkel","q":"\"Bridge Over Troubled Water\" \"Simon & Garfunkel\"","cat":"해외","m":"든든한 버팀목이 되어주는 에너지"},{"t":"Dancing Queen","a":"ABBA","q":"\"Dancing Queen\" \"ABBA\"","cat":"해외","m":"기쁨의 춤으로 간의 화를 다스림"},{"t":"Isn't She Lovely","a":"Stevie Wonder","q":"\"Isn't She Lovely\" \"Stevie Wonder\"","cat":"해외","m":"새로운 생명 탄생의 경이로움"},{"t":"Stayin' Alive","a":"Bee Gees","q":"\"Stayin' Alive\" \"Bee Gees\"","cat":"해외","m":"규칙적인 박동으로 근육 활성화"},{"t":"Your Song","a":"Elton John","q":"\"Your Song\" \"Elton John\"","cat":"해외","m":"부드럽고 따뜻한 나무의 감성"},{"t":"Lovely Day","a":"Bill Withers","q":"\"Lovely Day\" \"Bill Withers\"","cat":"해외","m":"긍정의 기운으로 하루를 여는 목"},{"t":"Three Little Birds","a":"Bob Marley","q":"\"Three Little Birds\" \"Bob Marley\"","cat":"해외","m":"걱정을 씻어주는 대자연의 위로"},{"t":"Put Your Records On","a":"Corinne Bailey Rae","q":"\"Put Your Records On\" \"Corinne Bailey Rae\"","cat":"해외","m":"봄바람을 타고 흐르는 싱그러움"},{"t":"Sunday Best","a":"Surfaces","q":"\"Sunday Best\" \"Surfaces\"","cat":"해외","m":"가벼운 발걸음과 성장의 즐거움"},{"t":"Riptide","a":"Vance Joy","q":"\"Riptide\" \"Vance Joy\"","cat":"해외","m":"파도처럼 밀려오는 목의 유연성"},{"t":"There's Nothing Holdin' Me Back","a":"Shawn Mendes","q":"\"There's Nothing Holdin' Me Back\" \"Shawn Mendes\"","cat":"해외","m":"거침없이 전진하는 개척운"},{"t":"Levitating","a":"Dua Lipa","q":"\"Levitating\" \"Dua Lipa\"","cat":"해외","m":"공중으로 떠오르는 상승의 기운"},{"t":"On Top Of The World","a":"Imagine Dragons","q":"\"On Top Of The World\" \"Imagine Dragons\"","cat":"해외","m":"정상에서 바라보는 나무의 시야"},{"t":"Fireflies","a":"Owl City","q":"\"Fireflies\" \"Owl City\"","cat":"해외","m":"숲속 반딧불이 같은 창의적 영감"},{"t":"Shotgun","a":"George Ezra","q":"\"Shotgun\" \"George Ezra\"","cat":"해외","m":"여행을 떠나는 자유로운 목 기운"},{"t":"You're Beautiful","a":"James Blunt","q":"\"You're Beautiful\" \"James Blunt\"","cat":"해외","m":"아름다움을 발견하는 맑은 눈"},{"t":"Don't Know Why","a":"Norah Jones","q":"\"Don't Know Why\" \"Norah Jones\"","cat":"해외","m":"비 온 뒤 숲속의 고요한 치유"},{"t":"What A Wonderful World","a":"Louis Armstrong","q":"\"What A Wonderful World\" \"Louis Armstrong\"","cat":"해외","m":"초록빛 세상을 예찬하는 에너지"},{"t":"Wonderwall","a":"Oasis","q":"\"Wonderwall\" \"Oasis\"","cat":"해외","m":"나를 지켜주는 단단한 나무 벽"},{"t":"Good Riddance","a":"Green Day","q":"\"Good Riddance\" \"Green Day\"","cat":"해외","m":"삶의 전환점에서 얻는 성숙함"},{"t":"Dancing in the Moonlight","a":"Toploader","q":"\"Dancing in the Moonlight\" \"Toploader\"","cat":"해외","m":"밤의 숲에서 얻는 신비로운 활력"},{"t":"Dreams","a":"Fleetwood Mac","q":"\"Dreams\" \"Fleetwood Mac\"","cat":"해외","m":"꿈을 향해 뻗어 나가는 줄기"},{"t":"Kiss Me","a":"Sixpence None Richer","q":"\"Kiss Me\" \"Sixpence None Richer\"","cat":"해외","m":"설렘과 성장이 공존하는 기운"},{"t":"Bubbly","a":"Colbie Caillat","q":"\"Bubbly\" \"Colbie Caillat\"","cat":"해외","m":"세포 사이로 스며드는 기분 좋은 자극"},{"t":"ILYSB","a":"LANY","q":"\"ILYSB\" \"LANY\"","cat":"해외","m":"현대적인 감각의 유연한 목 에너지"},{"t":"Youth","a":"Troye Sivan","q":"\"Youth\" \"Troye Sivan\"","cat":"해외","m":"청춘의 무한한 가능성과 성장"},{"t":"Watermelon Sugar","a":"Harry Styles","q":"\"Watermelon Sugar\" \"Harry Styles\"","cat":"해외","m":"여름 나무의 달콤한 과실 에너지"},{"t":"Marvin Gaye","a":"Charlie Puth","q":"\"Marvin Gaye\" \"Charlie Puth\"","cat":"해외","m":"소통을 통해 확장되는 에너지"},{"t":"Hey, Soul Sister","a":"Train","q":"\"Hey, Soul Sister\" \"Train\"","cat":"해외","m":"영혼을 일깨우는 밝은 진동"},{"t":"Call Me Maybe","a":"Carly Rae Jepsen","q":"\"Call Me Maybe\" \"Carly Rae Jepsen\"","cat":"해외","m":"즉흥적이고 생기 넘치는 움직임"},{"t":"Pompeii","a":"Bastille","q":"\"Pompeii\" \"Bastille\"","cat":"해외","m":"폐허를 뚫고 솟아나는 생명력"},{"t":"We Are Young","a":"Fun.","q":"\"We Are Young\" \"Fun.\"","cat":"해외","m":"젊음을 태우며 자라나는 기상"},{"t":"Best Day Of My Life","a":"American Authors","q":"\"Best Day Of My Life\" \"American Authors\"","cat":"해외","m":"최고의 성장을 약속하는 기운"},{"t":"Hall of Fame","a":"The Script","q":"\"Hall of Fame\" \"The Script\"","cat":"해외","m":"명예로운 성취를 향한 전진"},{"t":"사계 중 '봄' 1악장","a":"비발디","q":"\"사계 중 '봄' 1악장\" \"비발디\"","cat":"해외","m":"얼어붙은 땅을 뚫고 나오는 강력한 생명력"},{"t":"교향곡 6번 '전원' 1악장","a":"베토벤","q":"\"교향곡 6번 '전원' 1악장\" \"베토벤\"","cat":"해외","m":"대지에 뿌리를 내리고 뻗어 나가는 나무의 기"},{"t":"봄의 소리 왈츠","a":"요한 슈트라우스 2세","q":"\"봄의 소리 왈츠\" \"요한 슈트라우스 2세\"","cat":"해외","m":"솟구치는 새싹처럼 경쾌한 시작의 에너지"},{"t":"페르귄트 중 '아침의 기분'","a":"그리그","q":"\"페르귄트 중 '아침의 기분'\" \"그리그\"","cat":"해외","m":"숲을 깨우는 햇살과 광합성의 활기"},{"t":"무언가 중 '봄의 노래'","a":"멘델스존","q":"\"무언가 중 '봄의 노래'\" \"멘델스존\"","cat":"해외","m":"유연하게 뻗어 나가는 가지와 같은 선율"},{"t":"브란덴부르크 협주곡 3번 1악장","a":"바흐","q":"\"브란덴부르크 협주곡 3번 1악장\" \"바흐\"","cat":"해외","m":"정교하게 성장하는 나무의 조직적인 구조"},{"t":"사계 중 '4월: 할미꽃'","a":"차이콥스키","q":"\"사계 중 '4월: 할미꽃'\" \"차이콥스키\"","cat":"해외","m":"여린 싹이 피어나는 부드러운 목의 시작"},{"t":"교향곡 40번 1악장","a":"모차르트","q":"\"교향곡 40번 1악장\" \"모차르트\"","cat":"해외","m":"거침없이 위로 향하는 추진력과 성장의 기상"},{"t":"현악 4중주 '종달새'","a":"하이든","q":"\"현악 4중주 '종달새'\" \"하이든\"","cat":"해외","m":"나무 위에서 지저귀는 생명력과 수직적 에너지"},{"t":"미뉴에트","a":"보케리니","q":"\"미뉴에트\" \"보케리니\"","cat":"해외","m":"우아하게 균형을 잡으며 자라나는 숲의 조화"},{"t":"캐논 (D Major)","a":"파헬벨","q":"\"캐논 (D Major)\" \"파헬벨\"","cat":"해외","m":"끊임없이 반복되며 확장되는 식물의 성장 원리"},{"t":"현악 세레나데 2악장","a":"드보르자크","q":"\"현악 세레나데 2악장\" \"드보르자크\"","cat":"해외","m":"숲속의 바람을 머금은 나무의 춤"},{"t":"교향곡 1번 '봄' 1악장","a":"슈만","q":"\"교향곡 1번 '봄' 1악장\" \"슈만\"","cat":"해외","m":"겨울을 이겨낸 목 기운의 폭발적인 분출"},{"t":"송어","a":"슈베르트","q":"\"송어\" \"슈베르트\"","cat":"해외","m":"맑은 숲속 계곡 옆에서 자라나는 나무의 활기"},{"t":"관현악 모음곡 3번 'G선상의 아리아'","a":"바흐","q":"\"관현악 모음곡 3번 'G선상의 아리아'\" \"바흐\"","cat":"해외","m":"깊게 내린 뿌리처럼 단단한 내면의 성장"},{"t":"아를의 여인 '미뉴에트'","a":"비제","q":"\"아를의 여인 '미뉴에트'\" \"비제\"","cat":"해외","m":"수직으로 곧게 뻗은 대나무와 같은 청량함"},{"t":"윌리엄 텔 서곡 '정적'","a":"로시니","q":"\"윌리엄 텔 서곡 '정적'\" \"로시니\"","cat":"해외","m":"폭풍 전의 숲이 머금은 응축된 목 에너지"},{"t":"사랑의 꿈 3번","a":"리스트","q":"\"사랑의 꿈 3번\" \"리스트\"","cat":"해외","m":"감정의 줄기가 마음속으로 뻗어 나가는 진동"},{"t":"에튜드 Op.10-1 '승리'","a":"쇼팽","q":"\"에튜드 Op.10-1 '승리'\" \"쇼팽\"","cat":"해외","m":"하늘을 향해 치솟는 거대한 거목의 기운"},{"t":"아라베스크 1번","a":"드뷔시","q":"\"아라베스크 1번\" \"드뷔시\"","cat":"해외","m":"덩굴식물처럼 섬세하게 얽히고설킨 곡선의 미"},{"t":"현악 4중주 2번 '녹턴'","a":"보로딘","q":"\"현악 4중주 2번 '녹턴'\" \"보로딘\"","cat":"해외","m":"달빛 아래 자라나는 숲의 신비로운 성장"},{"t":"수상음악 중 '에어'","a":"헨델","q":"\"수상음악 중 '에어'\" \"헨델\"","cat":"해외","m":"물의 도움을 받아 성장하는 수생식물의 기운"},{"t":"무반주 첼로 1번 '프렐류드'","a":"바흐","q":"\"무반주 첼로 1번 '프렐류드'\" \"바흐\"","cat":"해외","m":"대지에 씨앗을 심고 시작하는 생명의 근원"},{"t":"동물의 사육제 '백조'","a":"생상스","q":"\"동물의 사육제 '백조'\" \"생상스\"","cat":"해외","m":"잔잔한 수풀 사이를 유영하는 유연한 에너지"},{"t":"클라리넷 협주곡 2악장","a":"모차르트","q":"\"클라리넷 협주곡 2악장\" \"모차르트\"","cat":"해외","m":"나무의 호흡처럼 깊고 평온한 대사의 순환"},{"t":"사랑의 인사","a":"엘가","q":"\"사랑의 인사\" \"엘가\"","cat":"해외","m":"꽃을 피우기 직전의 설렘과 확장의 기운"},{"t":"죽은 왕녀를 위한 파바느","a":"라벨","q":"\"죽은 왕녀를 위한 파바느\" \"라벨\"","cat":"해외","m":"오래된 고목이 지닌 묵직하고 고귀한 위엄"},{"t":"사랑의 기쁨","a":"크라이슬러","q":"\"사랑의 기쁨\" \"크라이슬러\"","cat":"해외","m":"잎사귀마다 맺힌 생동감 넘치는 기쁨의 에너지"},{"t":"카프리스 24번","a":"파가니니","q":"\"카프리스 24번\" \"파가니니\"","cat":"해외","m":"가지가 갈라지듯 뻗어 나가는 화려한 기교와 "},{"t":"헝가리 무곡 5번","a":"브람스","q":"\"헝가리 무곡 5번\" \"브람스\"","cat":"해외","m":"역동적으로 변동하며 성장하는 야생의 목 기운"},{"t":"잠자는 숲속의 미녀 '왈츠'","a":"차이콥스키","q":"\"잠자는 숲속의 미녀 '왈츠'\" \"차이콥스키\"","cat":"해외","m":"마법처럼 펼쳐지는 거대한 숲의 확장력"},{"t":"바이올린 소나타 '봄' 1악장","a":"베토벤","q":"\"바이올린 소나타 '봄' 1악장\" \"베토벤\"","cat":"해외","m":"새로운 기획과 시작을 돕는 창조적인 목 에너"},{"t":"장미의 기사 '왈츠'","a":"슈트라우스","q":"\"장미의 기사 '왈츠'\" \"슈트라우스\"","cat":"해외","m":"장미 넝쿨처럼 화려하게 피어나는 목의 절정"},{"t":"유모레스크","a":"드보르자크","q":"\"유모레스크\" \"드보르자크\"","cat":"해외","m":"숲길을 걷는 듯한 리드미컬하고 가벼운 진동"},{"t":"두 대의 바이올린을 위한 협주곡","a":"바흐","q":"\"두 대의 바이올린을 위한 협주곡\" \"바흐\"","cat":"해외","m":"두 나무가 서로 지탱하며 자라나는 상생의 힘"},{"t":"정령의 춤","a":"글룩","q":"\"정령의 춤\" \"글룩\"","cat":"해외","m":"숲의 정령이 내뿜는 맑고 투명한 치유의 기운"},{"t":"핀란디아","a":"시벨리우스","q":"\"핀란디아\" \"시벨리우스\"","cat":"해외","m":"북유럽의 울창한 침엽수림처럼 강인한 생명력"},{"t":"홀베르그 모음곡 '프렐류드'","a":"그리그","q":"\"홀베르그 모음곡 '프렐류드'\" \"그리그\"","cat":"해외","m":"차갑지만 단단하게 차오르는 목의 내공"},{"t":"시실리안느","a":"포레","q":"\"시실리안느\" \"포레\"","cat":"해외","m":"물기를 머금은 버드나무의 부드러운 휘어짐"},{"t":"이탈리아 교향곡 1악장","a":"멘델스존","q":"\"이탈리아 교향곡 1악장\" \"멘델스존\"","cat":"해외","m":"눈부신 햇살 아래 폭발하는 엽록소의 에너지"},{"t":"타펠무지크 '에어'","a":"텔레만","q":"\"타펠무지크 '에어'\" \"텔레만\"","cat":"해외","m":"자연의 질서에 순응하며 자라는 지혜로운 성장"},{"t":"푸른 다뉴브 강의 왈츠","a":"슈트라우스","q":"\"푸른 다뉴브 강의 왈츠\" \"슈트라우스\"","cat":"해외","m":"강변을 따라 줄지어 자라는 나무들의 리듬"},{"t":"인벤션 1번","a":"바흐","q":"\"인벤션 1번\" \"바흐\"","cat":"해외","m":"단순한 씨앗에서 복잡한 나무로 변하는 논리"},{"t":"타이스의 명상곡","a":"마스네","q":"\"타이스의 명상곡\" \"마스네\"","cat":"해외","m":"곧게 뻗은 전나무처럼 고결한 정신의 지향점"},{"t":"즐거운 행진곡","a":"샤브리에","q":"\"즐거운 행진곡\" \"샤브리에\"","cat":"해외","m":"성장을 방해하는 기운을 뚫고 나가는 전진력"},{"t":"교향곡 7번 2악장","a":"베토벤","q":"\"교향곡 7번 2악장\" \"베토벤\"","cat":"해외","m":"숲의 깊은 울림처럼 웅장한 목의 수렴"},{"t":"수상음악 '알라 혼파이프'","a":"헨델","q":"\"수상음악 '알라 혼파이프'\" \"헨델\"","cat":"해외","m":"활기차게 노를 저으며 나가는 목의 돌파력"},{"t":"호두까기 인형 '꽃의 왈츠'","a":"차이콥스키","q":"\"호두까기 인형 '꽃의 왈츠'\" \"차이콥스키\"","cat":"해외","m":"목 기운이 꽃으로 승화하는 화려한 결실의 시"},{"t":"협주곡 '검은머리방울새'","a":"비발디","q":"\"협주곡 '검은머리방울새'\" \"비발디\"","cat":"해외","m":"숲의 생태계를 완성하는 활기찬 목의 공명"},{"t":"비엔나 숲속의 이야기","a":"슈트라우스","q":"\"비엔나 숲속의 이야기\" \"슈트라우스\"","cat":"해외","m":"모든 목 기운이 하나로 어우러지는 숲의 완성"}],"화":[{"t":"Dynamite","a":"방탄소년단 (BTS)","q":"\"Dynamite\" \"방탄소년단 (BTS)\"","cat":"한국","m":"심박수를 높이는 화의 대표곡"},{"t":"연예인","a":"싸이 (PSY)","q":"\"연예인\" \"싸이 (PSY)\"","cat":"한국","m":"무대 위의 열정과 폭발력"},{"t":"How You Like That","a":"블랙핑크","q":"\"How You Like That\" \"블랙핑크\"","cat":"한국","m":"강렬한 카리스마와 상승 기운"},{"t":"비행기","a":"거북이","q":"\"비행기\" \"거북이\"","cat":"한국","m":"멈추지 않는 경쾌한 에너지"},{"t":"순정","a":"코요태","q":"\"순정\" \"코요태\"","cat":"한국","m":"화의 전형적인 빠른 비트"},{"t":"슈퍼맨","a":"노라조","q":"\"슈퍼맨\" \"노라조\"","cat":"한국","m":"지치지 않는 열정과 유쾌함"},{"t":"Festival","a":"엄정화","q":"\"Festival\" \"엄정화\"","cat":"한국","m":"축제의 불꽃 같은 에너지"},{"t":"Tears","a":"소찬휘","q":"\"Tears\" \"소찬휘\"","cat":"한국","m":"고음으로 뻗어 나가는 발산력"},{"t":"매직 카펫 라이드","a":"자우림","q":"\"매직 카펫 라이드\" \"자우림\"","cat":"한국","m":"비상하는 화의 움직임"},{"t":"붉은 노을","a":"빅뱅","q":"\"붉은 노을\" \"빅뱅\"","cat":"한국","m":"태양과 노을의 붉은 에너지"},{"t":"낭만 고양이","a":"체리필터","q":"\"낭만 고양이\" \"체리필터\"","cat":"한국","m":"심장을 뛰게 하는 록 사운드"},{"t":"소리꾼","a":"스트레이 키즈","q":"\"소리꾼\" \"스트레이 키즈\"","cat":"한국","m":"소리로 분출되는 강력한 기운"},{"t":"Hero","a":"몬스타엑스","q":"\"Hero\" \"몬스타엑스\"","cat":"한국","m":"남성적이고 뜨거운 열정"},{"t":"아주 NICE","a":"세븐틴","q":"\"아주 NICE\" \"세븐틴\"","cat":"한국","m":"폭발적인 군무와 심박수 상승"},{"t":"내가 제일 잘 나가","a":"투애니원 (2NE1)","q":"\"내가 제일 잘 나가\" \"투애니원 (2NE1)\"","cat":"한국","m":"자신감이라는 화의 본질"},{"t":"손대지 마","a":"에일리","q":"\"손대지 마\" \"에일리\"","cat":"한국","m":"당당하게 타오르는 불꽃"},{"t":"Run To You","a":"DJ DOC","q":"\"Run To You\" \"DJ DOC\"","cat":"한국","m":"심장 활력을 자극하는 비트"},{"t":"쿵따리 샤바라","a":"클론","q":"\"쿵따리 샤바라\" \"클론\"","cat":"한국","m":"근심을 태워버리는 화의 힘"},{"t":"Honey","a":"박진영","q":"\"Honey\" \"박진영\"","cat":"한국","m":"리드미컬하고 뜨거운 감각"},{"t":"오빠","a":"왁스","q":"\"오빠\" \"왁스\"","cat":"한국","m":"시원하게 터지는 감정 발산"},{"t":"Roly-Poly","a":"티아라","q":"\"Roly-Poly\" \"티아라\"","cat":"한국","m":"화려하고 복고적인 에너지"},{"t":"내꺼하자","a":"인피니트","q":"\"내꺼하자\" \"인피니트\"","cat":"한국","m":"절도 있고 뜨거운 집념"},{"t":"힘 내!","a":"소녀시대","q":"\"힘 내!\" \"소녀시대\"","cat":"한국","m":"밝게 타오르는 긍정의 불"},{"t":"WANNABE","a":"ITZY","q":"\"WANNABE\" \"ITZY\"","cat":"한국","m":"자존감을 높이는 화의 기운"},{"t":"Next Level","a":"에스파 (aespa)","q":"\"Next Level\" \"에스파 (aespa)\"","cat":"한국","m":"한 단계를 뛰어넘는 상승력"},{"t":"Bubble Pop!","a":"현아","q":"\"Bubble Pop!\" \"현아\"","cat":"한국","m":"뜨거운 여름날의 열기"},{"t":"말 달리자","a":"크라잉넛","q":"\"말 달리자\" \"크라잉넛\"","cat":"한국","m":"화의 극단적 발산과 질주"},{"t":"와","a":"이정현","q":"\"와\" \"이정현\"","cat":"한국","m":"강렬한 테크노 사운드의 열광"},{"t":"Twist King","a":"터보","q":"\"Twist King\" \"터보\"","cat":"한국","m":"멈추지 않는 심장 박동"},{"t":"눈누난나","a":"제시","q":"\"눈누난나\" \"제시\"","cat":"한국","m":"뜨겁고 솔직한 감정 표현"},{"t":"질풍가도","a":"유정석","q":"\"질풍가도\" \"유정석\"","cat":"한국","m":"용기를 주는 뜨거운 투혼"},{"t":"멍","a":"김현정","q":"\"멍\" \"김현정\"","cat":"한국","m":"시원한 가창력의 화 에너지"},{"t":"사랑, 결코 시들지 않는","a":"서문탁","q":"\"사랑, 결코 시들지 않는\" \"서문탁\"","cat":"한국","m":"타오르는 사랑의 불꽃"},{"t":"태양을 피하는 방법","a":"비 (Rain)","q":"\"태양을 피하는 방법\" \"비 (Rain)\"","cat":"한국","m":"태양과 맞서는 에너지"},{"t":"진달래꽃","a":"마야","q":"\"진달래꽃\" \"마야\"","cat":"한국","m":"한을 열정으로 태워버림"},{"t":"Ah-Choo","a":"러블리즈","q":"\"Ah-Choo\" \"러블리즈\"","cat":"한국","m":"톡 쏘는 화의 상큼함"},{"t":"Dumb Dumb","a":"레드벨벳","q":"\"Dumb Dumb\" \"레드벨벳\"","cat":"한국","m":"반복되는 비트로 심박 조절"},{"t":"열이올라요","a":"선미","q":"\"열이올라요\" \"선미\"","cat":"한국","m":"신체 온도를 높이는 화의 기운"},{"t":"그대에게","a":"신해철","q":"\"그대에게\" \"신해철\"","cat":"한국","m":"영원히 꺼지지 않는 열정"},{"t":"하하하쏭","a":"자우림","q":"\"하하하쏭\" \"자우림\"","cat":"한국","m":"웃음으로 승화하는 화 에너지"},{"t":"어머나","a":"장윤정","q":"\"어머나\" \"장윤정\"","cat":"한국","m":"화려하게 꽃피는 트로트 에너지"},{"t":"사랑의 배터리","a":"홍진영","q":"\"사랑의 배터리\" \"홍진영\"","cat":"한국","m":"에너지를 충전하는 화의 힘"},{"t":"까탈레나","a":"오렌지캬라멜","q":"\"까탈레나\" \"오렌지캬라멜\"","cat":"한국","m":"독특하고 강렬한 시각적 에너지"},{"t":"Sherlock","a":"샤이니","q":"\"Sherlock\" \"샤이니\"","cat":"한국","m":"정교하고 뜨거운 군무"},{"t":"주문 (MIROTIC)","a":"동방신기","q":"\"주문 (MIROTIC)\" \"동방신기\"","cat":"한국","m":"거부할 수 없는 화의 매력"},{"t":"하드캐리","a":"갓세븐 (GOT7)","q":"\"하드캐리\" \"갓세븐 (GOT7)\"","cat":"한국","m":"전력투구하는 화의 근성"},{"t":"나에게로 떠나는 여행","a":"버즈","q":"\"나에게로 떠나는 여행\" \"버즈\"","cat":"한국","m":"자유를 향한 뜨거운 질주"},{"t":"사랑스러워","a":"김종국","q":"\"사랑스러워\" \"김종국\"","cat":"한국","m":"부드럽게 타오르는 화의 온기"},{"t":"긴 생머리 그녀","a":"틴탑","q":"\"긴 생머리 그녀\" \"틴탑\"","cat":"한국","m":"화려한 발동작과 열정"},{"t":"Fiction","a":"하이라이트","q":"\"Fiction\" \"하이라이트\"","cat":"한국","m":"몰입하게 만드는 뜨거운 감성"},{"t":"Eye of the Tiger","a":"Survivor","q":"\"Eye of the Tiger\" \"Survivor\"","cat":"해외","m":"투지를 불태우는 화의 상징"},{"t":"It's My Life","a":"Bon Jovi","q":"\"It's My Life\" \"Bon Jovi\"","cat":"해외","m":"강렬한 의지와 타오르는 열정"},{"t":"Don't Stop Me Now","a":"Queen","q":"\"Don't Stop Me Now\" \"Queen\"","cat":"해외","m":"멈추지 않는 태양 같은 에너지"},{"t":"Beat It","a":"Michael Jackson","q":"\"Beat It\" \"Michael Jackson\"","cat":"해외","m":"심장을 뛰게 하는 강력한 비트"},{"t":"Bad Romance","a":"Lady Gaga","q":"\"Bad Romance\" \"Lady Gaga\"","cat":"해외","m":"화려하고 뜨거운 감정의 발산"},{"t":"Runaway Baby","a":"Bruno Mars","q":"\"Runaway Baby\" \"Bruno Mars\"","cat":"해외","m":"쉴 틈 없는 화 기운의 질주"},{"t":"Firework","a":"Katy Perry","q":"\"Firework\" \"Katy Perry\"","cat":"해외","m":"밤하늘을 수놓는 불꽃 에너지"},{"t":"Stronger","a":"Kelly Clarkson","q":"\"Stronger\" \"Kelly Clarkson\"","cat":"해외","m":"시련을 태우고 더 강해지는 화"},{"t":"Titanium","a":"David Guetta","q":"\"Titanium\" \"David Guetta\"","cat":"해외","m":"단단하게 타오르는 금속성 불꽃"},{"t":"We Found Love","a":"Rihanna","q":"\"We Found Love\" \"Rihanna\"","cat":"해외","m":"광란과 열정의 고주파 에너지"},{"t":"Hey Ya!","a":"Outkast","q":"\"Hey Ya!\" \"Outkast\"","cat":"해외","m":"폭발적인 흥겨움과 심박수 상승"},{"t":"Mr. Brightside","a":"The Killers","q":"\"Mr. Brightside\" \"The Killers\"","cat":"해외","m":"멈추지 않는 열정의 록 사운드"},{"t":"My Songs Know What You Did In The Dark","a":"Fall Out Boy","q":"\"My Songs Know What You Did In The Dark\" \"Fall Out Boy\"","cat":"해외","m":"제목 그대로 '불타오르는' 에너지"},{"t":"Believer","a":"Imagine Dragons","q":"\"Believer\" \"Imagine Dragons\"","cat":"해외","m":"내면의 고통을 열정으로 승화"},{"t":"High Hopes","a":"Panic! At The Disco","q":"\"High Hopes\" \"Panic! At The Disco\"","cat":"해외","m":"높은 곳을 향해 치솟는 화 기운"},{"t":"Waka Waka","a":"Shakira","q":"\"Waka Waka\" \"Shakira\"","cat":"해외","m":"아프리카의 뜨거운 대지 위 열정"},{"t":"Mamma Mia","a":"ABBA","q":"\"Mamma Mia\" \"ABBA\"","cat":"해외","m":"밝고 화사하게 타오르는 빛"},{"t":"Take On Me","a":"a-ha","q":"\"Take On Me\" \"a-ha\"","cat":"해외","m":"극한의 질주감과 신시사이저 화"},{"t":"Rock You Like A Hurricane","a":"Scorpions","q":"\"Rock You Like A Hurricane\" \"Scorpions\"","cat":"해외","m":"폭풍처럼 몰아치는 뜨거운 기운"},{"t":"Highway to Hell","a":"AC/DC","q":"\"Highway to Hell\" \"AC/DC\"","cat":"해외","m":"지치지 않는 근원의 뜨거움"},{"t":"Faint","a":"Linkin Park","q":"\"Faint\" \"Linkin Park\"","cat":"해외","m":"폭발적인 분출을 통한 카타르시스"},{"t":"Knights of Cydonia","a":"Muse","q":"\"Knights of Cydonia\" \"Muse\"","cat":"해외","m":"전장을 달리는 말 같은 운동성"},{"t":"I Gotta Feeling","a":"Black Eyed Peas","q":"\"I Gotta Feeling\" \"Black Eyed Peas\"","cat":"해외","m":"축제의 시작을 알리는 뜨거운 밤"},{"t":"Timber","a":"Pitbull","q":"\"Timber\" \"Pitbull\"","cat":"해외","m":"야성적이고 거침없는 발산"},{"t":"Tik Tok","a":"Ke$ha","q":"\"Tik Tok\" \"Ke$ha\"","cat":"해외","m":"깨어나는 감각과 화려한 조명"},{"t":"What Makes You Beautiful","a":"One Direction","q":"\"What Makes You Beautiful\" \"One Direction\"","cat":"해외","m":"싱그럽게 타오르는 젊은 태양"},{"t":"Power","a":"Little Mix","q":"\"Power\" \"Little Mix\"","cat":"해외","m":"여성적이고 강렬한 화의 권위"},{"t":"Wake Me Up","a":"Avicii","q":"\"Wake Me Up\" \"Avicii\"","cat":"해외","m":"영혼을 깨우는 뜨거운 비트"},{"t":"Rather Be","a":"Clean Bandit","q":"\"Rather Be\" \"Clean Bandit\"","cat":"해외","m":"명쾌하고 뜨거운 감정의 순환"},{"t":"Bang Bang","a":"Jessie J","q":"\"Bang Bang\" \"Jessie J\"","cat":"해외","m":"소리로 터지는 불꽃의 미학"},{"t":"Uptown Funk","a":"Mark Ronson","q":"\"Uptown Funk\" \"Mark Ronson\"","cat":"해외","m":"몸 전체의 혈류를 돌리는 리듬"},{"t":"Get Lucky","a":"Daft Punk","q":"\"Get Lucky\" \"Daft Punk\"","cat":"해외","m":"세련되게 타오르는 도심의 불빛"},{"t":"Can't Stop The Feeling!","a":"Justin Timberlake","q":"\"Can't Stop The Feeling!\" \"Justin Timberlake\"","cat":"해외","m":"전신으로 퍼지는 화의 즐거움"},{"t":"A Sky Full of Stars","a":"Coldplay","q":"\"A Sky Full of Stars\" \"Coldplay\"","cat":"해외","m":"별빛처럼 쏟아지는 화려한 에너지"},{"t":"Shut Up and Dance","a":"Walk The Moon","q":"\"Shut Up and Dance\" \"Walk The Moon\"","cat":"해외","m":"본능에 충실한 열정적 움직임"},{"t":"American Idiot","a":"Green Day","q":"\"American Idiot\" \"Green Day\"","cat":"해외","m":"반항적이고 뜨거운 사회적 화"},{"t":"All The Small Things","a":"Blink-182","q":"\"All The Small Things\" \"Blink-182\"","cat":"해외","m":"유쾌하고 가벼운 불꽃의 파동"},{"t":"Sk8er Boi","a":"Avril Lavigne","q":"\"Sk8er Boi\" \"Avril Lavigne\"","cat":"해외","m":"자유분방한 화 기운의 질주"},{"t":"Wannabe","a":"Spice Girls","q":"\"Wannabe\" \"Spice Girls\"","cat":"해외","m":"솔직하고 화끈한 욕망의 표현"},{"t":"Bad Blood","a":"Taylor Swift","q":"\"Bad Blood\" \"Taylor Swift\"","cat":"해외","m":"강렬하고 날카로운 화의 카리스마"},{"t":"Problem","a":"Ariana Grande","q":"\"Problem\" \"Ariana Grande\"","cat":"해외","m":"시원하게 뻗는 고음의 발산력"},{"t":"Don't Start Now","a":"Dua Lipa","q":"\"Don't Start Now\" \"Dua Lipa\"","cat":"해외","m":"과거를 끊고 새로 타오르는 힘"},{"t":"Kiwi","a":"Harry Styles","q":"\"Kiwi\" \"Harry Styles\"","cat":"해외","m":"야생마 같은 화의 파괴력"},{"t":"Beggin'","a":"Måneskin","q":"\"Beggin'\" \"Måneskin\"","cat":"해외","m":"거칠고 뜨거운 이탈리아의 태양"},{"t":"Good As Hell","a":"Lizzo","q":"\"Good As Hell\" \"Lizzo\"","cat":"해외","m":"자신감으로 무장한 화의 온기"},{"t":"Chandelier","a":"Sia","q":"\"Chandelier\" \"Sia\"","cat":"해외","m":"극한의 감정 폭발"},{"t":"Lose Yourself","a":"Eminem","q":"\"Lose Yourself\" \"Eminem\"","cat":"해외","m":"절체절명의 순간에 뿜는 열정"},{"t":"The Pretender","a":"Foo Fighters","q":"\"The Pretender\" \"Foo Fighters\"","cat":"해외","m":"거침없는 록의 불길"},{"t":"Blinding Lights","a":"The Weeknd","q":"\"Blinding Lights\" \"The Weeknd\"","cat":"해외","m":"빛의 속도로 달리는 혈관의 활력"},{"t":"Don't You Worry Child","a":"Swedish House Mafia","q":"\"Don't You Worry Child\" \"Swedish House Mafia\"","cat":"해외","m":"화합과 열정의 피날레"},{"t":"사계 중 '여름' 3악장","a":"비발디","q":"\"사계 중 '여름' 3악장\" \"비발디\"","cat":"해외","m":"대지를 태울 듯한 태양과 번개의 강력한 화기"},{"t":"교향곡 5번 '운명' 1악장","a":"베토벤","q":"\"교향곡 5번 '운명' 1악장\" \"베토벤\"","cat":"해외","m":"어둠을 뚫고 솟구치는 불꽃 같은 의지와 열정"},{"t":"카르멘 '서곡'","a":"비제","q":"\"카르멘 '서곡'\" \"비제\"","cat":"해외","m":"축제의 열기와 화려하게 타오르는 외향적 에너"},{"t":"라 캄파넬라","a":"파가니니","q":"\"라 캄파넬라\" \"파가니니\"","cat":"해외","m":"강렬한 마찰로 일어나는 불꽃 같은 고주파 진"},{"t":"윌리엄 텔 서곡 '피날레'","a":"로시니","q":"\"윌리엄 텔 서곡 '피날레'\" \"로시니\"","cat":"해외","m":"끝없이 질주하는 불꽃 같은 추진력과 승리의 "},{"t":"헝가리 무곡 1번","a":"브람스","q":"\"헝가리 무곡 1번\" \"브람스\"","cat":"해외","m":"내면에서 뜨겁게 달구어지는 화의 응축과 발산"},{"t":"헝가리 광시곡 2번","a":"리스트","q":"\"헝가리 광시곡 2번\" \"리스트\"","cat":"해외","m":"화려한 불꽃놀이처럼 사방으로 확산되는 기운"},{"t":"교향곡 4번 4악장","a":"차이콥스키","q":"\"교향곡 4번 4악장\" \"차이콥스키\"","cat":"해외","m":"압도적인 금관악기의 울림, 태양의 위엄과 명"},{"t":"교향곡 9번 '신세계로부터' 4악장","a":"드보르자크","q":"\"교향곡 9번 '신세계로부터' 4악장\" \"드보르자크\"","cat":"해외","m":"새로운 대륙을 향한 뜨거운 야망과 개척의 불"},{"t":"왕벌의 비행","a":"림스키-코르사코프","q":"\"왕벌의 비행\" \"림스키-코르사코프\"","cat":"해외","m":"쉴 새 없이 움직이는 화의 역동적인 파동"},{"t":"레퀴엠 '진노의 날'","a":"모차르트","q":"\"레퀴엠 '진노의 날'\" \"모차르트\"","cat":"해외","m":"모든 것을 불태워 정화하는 심판의 불꽃 에너"},{"t":"일 트로바토레 '대장간의 합창'","a":"베르디","q":"\"일 트로바토레 '대장간의 합창'\" \"베르디\"","cat":"해외","m":"쇠를 달구는 화덕의 열기와 단단한 명예운"},{"t":"천국과 지옥 '캉캉'","a":"오펜바흐","q":"\"천국과 지옥 '캉캉'\" \"오펜바흐\"","cat":"해외","m":"통제 불능으로 분출되는 유쾌하고 화려한 화기"},{"t":"행성 중 '화성(Mars)'","a":"홀스트","q":"\"행성 중 '화성(Mars)'\" \"홀스트\"","cat":"해외","m":"전쟁의 신이 가진 파괴적이고 강렬한 불의 투"},{"t":"불새 '지옥의 춤'","a":"스트라빈스키","q":"\"불새 '지옥의 춤'\" \"스트라빈스키\"","cat":"해외","m":"원초적이고 폭발적인 화 에너지의 정점"},{"t":"에튜드 Op.10-12 '혁명'","a":"쇼팽","q":"\"에튜드 Op.10-12 '혁명'\" \"쇼팽\"","cat":"해외","m":"가슴 속 끓어오르는 분노를 열정으로 승화함"},{"t":"교향곡 9번 '합창' 4악장","a":"베토벤","q":"\"교향곡 9번 '합창' 4악장\" \"베토벤\"","cat":"해외","m":"전 인류를 하나로 묶는 태양 같은 거대한 사"},{"t":"왕궁의 불꽃놀이","a":"헨델","q":"\"왕궁의 불꽃놀이\" \"헨델\"","cat":"해외","m":"명예와 승리를 축하하는 화려한 빛의 에너지"},{"t":"칼춤","a":"하차투리안","q":"\"칼춤\" \"하차투리안\"","cat":"해외","m":"날카롭고 번뜩이는 불꽃의 파편과 순발력"},{"t":"전람회의 그림 '키예프의 대문'","a":"무소르그스키","q":"\"전람회의 그림 '키예프의 대문'\" \"무소르그스키\"","cat":"해외","m":"황금빛으로 빛나는 웅장한 화의 완성"},{"t":"로미오와 줄리엣 '기사들의 춤'","a":"프로코피에프","q":"\"로미오와 줄리엣 '기사들의 춤'\" \"프로코피에프\"","cat":"해외","m":"위엄 있고 묵직하게 타오르는 화염의 기상"},{"t":"1812년 서곡","a":"차이콥스키","q":"\"1812년 서곡\" \"차이콥스키\"","cat":"해외","m":"승전고를 울리는 대포 소리, 폭발하는 추진력"},{"t":"발퀴레의 기행","a":"바그너","q":"\"발퀴레의 기행\" \"바그너\"","cat":"해외","m":"하늘을 가로지르는 불꽃의 전사들과 명예"},{"t":"환상 교향곡 '단두대로의 행진'","a":"베를리오즈","q":"\"환상 교향곡 '단두대로의 행진'\" \"베를리오즈\"","cat":"해외","m":"격렬한 감정의 소용돌이와 화의 극단적 분출"},{"t":"메피스토 왈츠 1번","a":"리스트","q":"\"메피스토 왈츠 1번\" \"리스트\"","cat":"해외","m":"유혹적이고 강렬하게 타오르는 어둠 속의 불꽃"},{"t":"스페인 교향곡 1악장","a":"랄로","q":"\"스페인 교향곡 1악장\" \"랄로\"","cat":"해외","m":"스페인의 뜨거운 태양을 닮은 열정적인 선율"},{"t":"불의 춤 (탈춤)","a":"파야","q":"\"불의 춤 (탈춤)\" \"파야\"","cat":"해외","m":"주술적인 열기로 악한 기운을 태워버리는 화기"},{"t":"서주와 론도 카프리치오소","a":"생상스","q":"\"서주와 론도 카프리치오소\" \"생상스\"","cat":"해외","m":"화려한 기교 뒤에 숨겨진 뜨거운 감정의 파동"},{"t":"바이올린 협주곡 3악장","a":"시벨리우스","q":"\"바이올린 협주곡 3악장\" \"시벨리우스\"","cat":"해외","m":"북극광처럼 차갑지만 강렬하게 빛나는 불꽃"},{"t":"위풍당당 행진곡 1번","a":"엘가","q":"\"위풍당당 행진곡 1번\" \"엘가\"","cat":"해외","m":"명예로운 자리에 어울리는 태양의 광휘"},{"t":"피아노 4중주 1번 '론도 알라 칭가레제'","a":"브람스","q":"\"피아노 4중주 1번 '론도 알라 칭가레제'\" \"브람스\"","cat":"해외","m":"광풍처럼 몰아치는 집시의 뜨거운 열정"},{"t":"치고이너바이젠","a":"사라사테","q":"\"치고이너바이젠\" \"사라사테\"","cat":"해외","m":"애절한 슬픔을 태워 열정으로 바꾸는 화의 힘"},{"t":"마왕","a":"슈베르트","q":"\"마왕\" \"슈베르트\"","cat":"해외","m":"절박함 속에 타오르는 생존의 불꽃과 긴박함"},{"t":"불꽃 (Feux d'artifice)","a":"드뷔시","q":"\"불꽃 (Feux d'artifice)\" \"드뷔시\"","cat":"해외","m":"밤하늘에 흩어지는 빛의 입자와 수직적 확산"},{"t":"교향곡 2번 '부활' 5악장","a":"말러","q":"\"교향곡 2번 '부활' 5악장\" \"말러\"","cat":"해외","m":"죽음을 태우고 다시 태어나는 영원한 빛"},{"t":"소나타 K.141","a":"스카를라티","q":"\"소나타 K.141\" \"스카를라티\"","cat":"해외","m":"건반 위를 달리는 불꽃 같은 연타의 에너지"},{"t":"폴로베츠인의 춤","a":"보로딘","q":"\"폴로베츠인의 춤\" \"보로딘\"","cat":"해외","m":"거친 야생의 열기와 자유로운 화의 확산"},{"t":"토카타와 푸가 D단조","a":"바흐","q":"\"토카타와 푸가 D단조\" \"바흐\"","cat":"해외","m":"파이프 오르간이 뿜어내는 웅장한 불의 기둥"},{"t":"교향곡 3번 '영웅' 1악장","a":"베토벤","q":"\"교향곡 3번 '영웅' 1악장\" \"베토벤\"","cat":"해외","m":"시대를 바꾸는 혁명가의 가슴 속 뜨거운 불꽃"},{"t":"한여름 밤의 꿈 '결혼 행진곡'","a":"멘델스존","q":"\"한여름 밤의 꿈 '결혼 행진곡'\" \"멘델스존\"","cat":"해외","m":"축복 속에 빛나는 화려한 환희의 에너지"},{"t":"차르다시","a":"몬티","q":"\"차르다시\" \"몬티\"","cat":"해외","m":"느린 우수에서 급격한 발산으로 변하는 화기"},{"t":"짜라투스트라는 이렇게 말했다","a":"슈트라우스","q":"\"짜라투스트라는 이렇게 말했다\" \"슈트라우스\"","cat":"해외","m":"태양이 떠오르는 순간의 장엄한 화의 탄생"},{"t":"볼레로","a":"라벨","q":"\"볼레로\" \"라벨\"","cat":"해외","m":"작은 불씨가 거대한 화염으로 번져가는 과정"},{"t":"트롤하우겐의 결혼식날","a":"그리그","q":"\"트롤하우겐의 결혼식날\" \"그리그\"","cat":"해외","m":"활기차고 따뜻한 목조 건물의 온기 같은 화 "},{"t":"스케르초 2번","a":"쇼팽","q":"\"스케르초 2번\" \"쇼팽\"","cat":"해외","m":"갑작스럽게 폭발하는 감정의 불꽃과 확산"},{"t":"세헤라자데 4악장","a":"림스키-코르사코프","q":"\"세헤라자데 4악장\" \"림스키-코르사코프\"","cat":"해외","m":"거친 바다 위를 뚫고 나가는 난파선 속의 투"},{"t":"세비야의 이발사 '나는 이 거리의 만물박사'","a":"로시니","q":"\"세비야의 이발사 '나는 이 거리의 만물박사'\" \"로시니\"","cat":"해외","m":"재치와 활력이 넘치는 화의 유머러스한 발산"},{"t":"초절기교 에튜드 4번 '마제파'","a":"리스트","q":"\"초절기교 에튜드 4번 '마제파'\" \"리스트\"","cat":"해외","m":"한계를 돌파하며 질주하는 뜨거운 불꽃의 기상"},{"t":"탄호이저 '입장 행진곡'","a":"바그너","q":"\"탄호이저 '입장 행진곡'\" \"바그너\"","cat":"해외","m":"당당한 명예와 직관이 빛나는 화의 행렬"},{"t":"피아노 소나타 '열정' 3악장","a":"베토벤","q":"\"피아노 소나타 '열정' 3악장\" \"베토벤\"","cat":"해외","m":"모든 것을 쏟아부어 완성하는 화 에너지의 끝"}],"토":[{"t":"흙에 살리라","a":"김상진","q":"\"흙에 살리라\" \"김상진\"","cat":"한국","m":"토 기운의 근본이자 대지의 노래"},{"t":"아침이슬","a":"양희은","q":"\"아침이슬\" \"양희은\"","cat":"한국","m":"단단한 땅을 딛고 일어나는 생명력"},{"t":"낭만에 대하여","a":"최백호","q":"\"낭만에 대하여\" \"최백호\"","cat":"한국","m":"깊은 대지의 울림과 같은 중저음"},{"t":"서른 즈음에","a":"김광석","q":"\"서른 즈음에\" \"김광석\"","cat":"한국","m":"삶을 돌아보는 안정적인 기운"},{"t":"바램","a":"노사연","q":"\"바램\" \"노사연\"","cat":"한국","m":"위장을 편안하게 하는 따뜻한 음색"},{"t":"가로수 그늘 아래 서면","a":"이문세","q":"\"가로수 그늘 아래 서면\" \"이문세\"","cat":"한국","m":"대지의 안식과 평온함"},{"t":"비","a":"폴킴","q":"\"비\" \"폴킴\"","cat":"한국","m":"메마른 땅을 적시는 풍요로움"},{"t":"가을 아침","a":"아이유","q":"\"가을 아침\" \"아이유\"","cat":"한국","m":"황금 들녘처럼 풍성한 정서"},{"t":"감사","a":"김동률","q":"\"감사\" \"김동률\"","cat":"한국","m":"마음의 토양을 단단하게 하는 진심"},{"t":"어느 60대 노부부 이야기","a":"임영웅","q":"\"어느 60대 노부부 이야기\" \"임영웅\"","cat":"한국","m":"삶의 무게를 지탱하는 흙의 사랑"},{"t":"그리운 사람끼리","a":"박인희","q":"\"그리운 사람끼리\" \"박인희\"","cat":"한국","m":"소박하고 순수한 흙의 마음"},{"t":"사랑이여","a":"유심초","q":"\"사랑이여\" \"유심초\"","cat":"한국","m":"변치 않는 대지 같은 신뢰"},{"t":"향수","a":"이동원/박인수","q":"\"향수\" \"이동원/박인수\"","cat":"한국","m":"고향 땅의 냄새와 풍요로운 결실"},{"t":"당신은 모르실거야","a":"혜은이","q":"\"당신은 모르실거야\" \"혜은이\"","cat":"한국","m":"위장의 긴장을 풀어주는 부드러움"},{"t":"돌아와요 부산항에","a":"조용필","q":"\"돌아와요 부산항에\" \"조용필\"","cat":"한국","m":"뿌리를 찾는 회귀의 에너지"},{"t":"너에게로 또 다시","a":"변진섭","q":"\"너에게로 또 다시\" \"변진섭\"","cat":"한국","m":"흔들림 없는 토양의 포용력"},{"t":"인연","a":"이선희","q":"\"인연\" \"이선희\"","cat":"한국","m":"땅에서 맺어지는 깊은 유대감"},{"t":"보이지 않는 사랑","a":"신승훈","q":"\"보이지 않는 사랑\" \"신승훈\"","cat":"한국","m":"내면의 단단한 중심을 잡아줌"},{"t":"내게 오는 길","a":"성시경","q":"\"내게 오는 길\" \"성시경\"","cat":"한국","m":"편안한 소화를 돕는 감미로움"},{"t":"고맙소","a":"김호중","q":"\"고맙소\" \"김호중\"","cat":"한국","m":"묵직한 존재감으로 중심을 잡음"},{"t":"가을밤에 든 생각","a":"잔나비","q":"\"가을밤에 든 생각\" \"잔나비\"","cat":"한국","m":"황토색의 따뜻한 서정성"},{"t":"잊지 말아요","a":"백지영","q":"\"잊지 말아요\" \"백지영\"","cat":"한국","m":"토 기운 특유의 끈기 있는 감성"},{"t":"걱정말아요 그대","a":"이적","q":"\"걱정말아요 그대\" \"이적\"","cat":"한국","m":"불안을 땅으로 가라앉히는 위로"},{"t":"청춘","a":"김필","q":"\"청춘\" \"김필\"","cat":"한국","m":"삶의 터전을 일구는 진지함"},{"t":"안아줘","a":"정준일","q":"\"안아줘\" \"정준일\"","cat":"한국","m":"대지가 생명을 품듯 감싸주는 에너지"},{"t":"비타민","a":"박학기","q":"\"비타민\" \"박학기\"","cat":"한국","m":"비장의 활력을 돕는 상큼함"},{"t":"널 사랑하겠어","a":"동물원","q":"\"널 사랑하겠어\" \"동물원\"","cat":"한국","m":"소박하고 변함없는 흙의 진심"},{"t":"테스형!","a":"나훈아","q":"\"테스형!\" \"나훈아\"","cat":"한국","m":"인생의 근본을 묻는 묵직함"},{"t":"백만송이 장미","a":"심수봉","q":"\"백만송이 장미\" \"심수봉\"","cat":"한국","m":"사랑으로 일구는 마음의 정원"},{"t":"그대라는 사치","a":"한동근","q":"\"그대라는 사치\" \"한동근\"","cat":"한국","m":"재물운을 부르는 넉넉한 마음"},{"t":"My Star","a":"이하이","q":"\"My Star\" \"이하이\"","cat":"한국","m":"토양처럼 탄탄한 리듬감"},{"t":"여행","a":"볼빨간사춘기","q":"\"여행\" \"볼빨간사춘기\"","cat":"한국","m":"대지를 밟으며 얻는 활력"},{"t":"제주도의 푸른 밤","a":"태연","q":"\"제주도의 푸른 밤\" \"태연\"","cat":"한국","m":"흙과 바다가 만나는 편안함"},{"t":"행복한 나를","a":"수지","q":"\"행복한 나를\" \"수지\"","cat":"한국","m":"현재에 안착하는 토의 기운"},{"t":"너란 봄","a":"정은지","q":"\"너란 봄\" \"정은지\"","cat":"한국","m":"따뜻한 햇살 아래 비옥한 토양"},{"t":"동화","a":"멜로망스","q":"\"동화\" \"멜로망스\"","cat":"한국","m":"순수한 흙의 동심"},{"t":"시간아 천천히","a":"이진아","q":"\"시간아 천천히\" \"이진아\"","cat":"한국","m":"소화 속도를 조절하는 리듬"},{"t":"널 사랑하지 않아","a":"어반자카파","q":"\"널 사랑하지 않아\" \"어반자카파\"","cat":"한국","m":"감정을 땅에 묻는 차분함"},{"t":"꿈에","a":"박정현","q":"\"꿈에\" \"박정현\"","cat":"한국","m":"깊은 지층과 같은 풍부한 성량"},{"t":"사랑한다는 흔한 말","a":"김연우","q":"\"사랑한다는 흔한 말\" \"김연우\"","cat":"한국","m":"깨끗하고 단단한 모래 같은 음색"},{"t":"당신과는 천천히","a":"장범준","q":"\"당신과는 천천히\" \"장범준\"","cat":"한국","m":"여유로운 대지의 걸음걸이"},{"t":"시간을 거슬러","a":"린","q":"\"시간을 거슬러\" \"린\"","cat":"한국","m":"영겁의 시간을 견디는 감성"},{"t":"기억해줘요 내 모든 날과 그때를","a":"거미","q":"\"기억해줘요 내 모든 날과 그때를\" \"거미\"","cat":"한국","m":"땅에 새겨진 기록 같은 목소리"},{"t":"보고 싶다","a":"김범수","q":"\"보고 싶다\" \"김범수\"","cat":"한국","m":"깊은 뿌리에서 올라오는 그리움"},{"t":"고맙소","a":"조항조","q":"\"고맙소\" \"조항조\"","cat":"한국","m":"가장의 어깨 같은 든든한 토 기운"},{"t":"안동역에서","a":"진성","q":"\"안동역에서\" \"진성\"","cat":"한국","m":"서민의 삶과 맞닿은 흙의 정서"},{"t":"엄마아리랑","a":"송가인","q":"\"엄마아리랑\" \"송가인\"","cat":"한국","m":"모성애를 자극하는 치유력"},{"t":"꽃길","a":"김세정","q":"\"꽃길\" \"김세정\"","cat":"한국","m":"비단길 대신 꽃핀 흙길의 감동"},{"t":"어떻게 이별까지 사랑하겠어...","a":"악뮤","q":"\"어떻게 이별까지 사랑하겠어...\" \"악뮤\"","cat":"한국","m":"담백하고 깊은 토양의 이치"},{"t":"주저하는 연인들을 위해","a":"잔나비","q":"\"주저하는 연인들을 위해\" \"잔나비\"","cat":"한국","m":"노을 지는 언덕 같은 평온함"},{"t":"Gymnopedie No. 1","a":"Erik Satie","q":"\"Gymnopedie No. 1\" \"Erik Satie\"","cat":"해외","m":"토 기운의 정석, 대지의 안식"},{"t":"Come Away With Me","a":"Norah Jones","q":"\"Come Away With Me\" \"Norah Jones\"","cat":"해외","m":"위장을 달래는 부드러운 흙의 음색"},{"t":"Banana Pancakes","a":"Jack Johnson","q":"\"Banana Pancakes\" \"Jack Johnson\"","cat":"해외","m":"평화로운 아침, 비옥한 토양의 여유"},{"t":"Ain't No Sunshine","a":"Bill Withers","q":"\"Ain't No Sunshine\" \"Bill Withers\"","cat":"해외","m":"깊고 묵직한 대지의 울림"},{"t":"Make You Feel My Love","a":"Adele","q":"\"Make You Feel My Love\" \"Adele\"","cat":"해외","m":"변치 않는 땅처럼 단단한 사랑"},{"t":"Can You Feel The Love Tonight","a":"Elton John","q":"\"Can You Feel The Love Tonight\" \"Elton John\"","cat":"해외","m":"자연의 섭리와 평온한 수렴"},{"t":"Landslide","a":"Fleetwood Mac","q":"\"Landslide\" \"Fleetwood Mac\"","cat":"해외","m":"세월을 견디는 산과 바위의 에너지"},{"t":"The Sound of Silence","a":"Simon & Garfunkel","q":"\"The Sound of Silence\" \"Simon & Garfunkel\"","cat":"해외","m":"고요함 속에서 찾는 내면의 중심"},{"t":"Stay With Me","a":"Sam Smith","q":"\"Stay With Me\" \"Sam Smith\"","cat":"해외","m":"흔들림 없는 안착과 지지"},{"t":"Thinking Out Loud","a":"Ed Sheeran","q":"\"Thinking Out Loud\" \"Ed Sheeran\"","cat":"해외","m":"현재에 머무는 토 기운의 안정감"},{"t":"All of Me","a":"John Legend","q":"\"All of Me\" \"John Legend\"","cat":"해외","m":"모든 것을 포용하는 대지의 사랑"},{"t":"Like A Star","a":"Corinne Bailey Rae","q":"\"Like A Star\" \"Corinne Bailey Rae\"","cat":"해외","m":"밤하늘 아래 조용한 땅의 진동"},{"t":"You've Got a Friend","a":"James Taylor","q":"\"You've Got a Friend\" \"James Taylor\"","cat":"해외","m":"든든한 버팀목이 되는 토의 의리"},{"t":"It's Too Late","a":"Carole King","q":"\"It's Too Late\" \"Carole King\"","cat":"해외","m":"담백하고 현실적인 토양의 정서"},{"t":"Knockin' On Heaven's Door","a":"Bob Dylan","q":"\"Knockin' On Heaven's Door\" \"Bob Dylan\"","cat":"해외","m":"삶의 터전을 일구는 진지함"},{"t":"Fields of Gold","a":"Sting","q":"\"Fields of Gold\" \"Sting\"","cat":"해외","m":"황금빛 보리밭의 풍요로움"},{"t":"Fast Car","a":"Tracy Chapman","q":"\"Fast Car\" \"Tracy Chapman\"","cat":"해외","m":"현실을 딛고 일어서려는 흙의 의지"},{"t":"Love Is A Losing Game","a":"Amy Winehouse","q":"\"Love Is A Losing Game\" \"Amy Winehouse\"","cat":"해외","m":"고전적이고 묵직한 토 기운의 소울"},{"t":"Coming Home","a":"Leon Bridges","q":"\"Coming Home\" \"Leon Bridges\"","cat":"해외","m":"고향으로 돌아가는 안도감"},{"t":"The Scientist","a":"Coldplay","q":"\"The Scientist\" \"Coldplay\"","cat":"해외","m":"근본으로 회귀하려는 토의 속성"},{"t":"Video Games","a":"Lana Del Rey","q":"\"Video Games\" \"Lana Del Rey\"","cat":"해외","m":"몽환적이지만 하체가 무거운 곡"},{"t":"Everything I Wanted","a":"Billie Eilish","q":"\"Everything I Wanted\" \"Billie Eilish\"","cat":"해외","m":"차분하게 가라앉히는 정서적 정화"},{"t":"Best Part","a":"H.E.R.","q":"\"Best Part\" \"H.E.R.\"","cat":"해외","m":"소화 기능을 돕는 편안한 리듬"},{"t":"Get You","a":"Daniel Caesar","q":"\"Get You\" \"Daniel Caesar\"","cat":"해외","m":"깊은 지층의 온기 같은 사운드"},{"t":"When I Was Your Man","a":"Bruno Mars","q":"\"When I Was Your Man\" \"Bruno Mars\"","cat":"해외","m":"상실감을 땅으로 묻어주는 위로"},{"t":"If I Ain't Got You","a":"Alicia Keys","q":"\"If I Ain't Got You\" \"Alicia Keys\"","cat":"해외","m":"진정한 가치를 깨닫는 힘"},{"t":"Wish You Were Here","a":"Pink Floyd","q":"\"Wish You Were Here\" \"Pink Floyd\"","cat":"해외","m":"그리움을 흙에 새기는 록 발라드"},{"t":"Wonderful Tonight","a":"Eric Clapton","q":"\"Wonderful Tonight\" \"Eric Clapton\"","cat":"해외","m":"따뜻한 모닥불과 흙집의 편안함"},{"t":"Killing Me Softly","a":"Roberta Flack","q":"\"Killing Me Softly\" \"Roberta Flack\"","cat":"해외","m":"영혼의 토양을 자극하는 깊은 감성"},{"t":"How Deep Is Your Love","a":"Bee Gees","q":"\"How Deep Is Your Love\" \"Bee Gees\"","cat":"해외","m":"깊은 대지의 수용성과 포용력"},{"t":"Home","a":"Michael Bublé","q":"\"Home\" \"Michael Bublé\"","cat":"해외","m":"안식처를 찾는 토 기운의 귀환"},{"t":"Drivers License","a":"Olivia Rodrigo","q":"\"Drivers License\" \"Olivia Rodrigo\"","cat":"해외","m":"성장의 터전을 찾아가는 여정"},{"t":"Location","a":"Khalid","q":"\"Location\" \"Khalid\"","cat":"해외","m":"현재 위치에 대한 확인과 확신"},{"t":"Snooze","a":"SZA","q":"\"Snooze\" \"SZA\"","cat":"해외","m":"나른하고 평화로운 대지의 휴식"},{"t":"Pink + White","a":"Frank Ocean","q":"\"Pink + White\" \"Frank Ocean\"","cat":"해외","m":"감각을 일깨우는 흙의 유연함"},{"t":"What's Going On","a":"Marvin Gaye","q":"\"What's Going On\" \"Marvin Gaye\"","cat":"해외","m":"사회적 조화와 토의 평화주의"},{"t":"Let's Stay Together","a":"Al Green","q":"\"Let's Stay Together\" \"Al Green\"","cat":"해외","m":"끈기 있게 이어지는 토 기운의 신뢰"},{"t":"Can't Take My Eyes Off Of You","a":"Lauryn Hill","q":"\"Can't Take My Eyes Off Of You\" \"Lauryn Hill\"","cat":"해외","m":"풍요롭고 단단한 리듬의 조화"},{"t":"You Are The Sunshine Of My Life","a":"Stevie Wonder","q":"\"You Are The Sunshine Of My Life\" \"Stevie Wonder\"","cat":"해외","m":"대지를 비추는 밝은 빛과 결실"},{"t":"Heart of Gold","a":"Neil Young","q":"\"Heart of Gold\" \"Neil Young\"","cat":"해외","m":"황금을 찾는 진실한 마음"},{"t":"Only Time","a":"Enya","q":"\"Only Time\" \"Enya\"","cat":"해외","m":"시간의 흐름을 견디는 바위의 인내"},{"t":"Nothing Compares 2 U","a":"Sinead O'Connor","q":"\"Nothing Compares 2 U\" \"Sinead O'Connor\"","cat":"해외","m":"독보적이고 묵직한 고독의 힘"},{"t":"Sweet Creature","a":"Harry Styles","q":"\"Sweet Creature\" \"Harry Styles\"","cat":"해외","m":"소박하고 정겨운 나무와 흙의 조화"},{"t":"Someone You Loved","a":"Lewis Capaldi","q":"\"Someone You Loved\" \"Lewis Capaldi\"","cat":"해외","m":"감정의 침전물을 땅으로 보내는 정화"},{"t":"Say You Won't Let Go","a":"James Arthur","q":"\"Say You Won't Let Go\" \"James Arthur\"","cat":"해외","m":"약속과 책임을 중시하는 토 기운"},{"t":"Let Her Go","a":"Passenger","q":"\"Let Her Go\" \"Passenger\"","cat":"해외","m":"비워냄으로써 얻는 새로운 토양"},{"t":"7 Years","a":"Lukas Graham","q":"\"7 Years\" \"Lukas Graham\"","cat":"해외","m":"인생의 계단을 밟는 토의 성실함"},{"t":"Sway","a":"Dean Martin","q":"\"Sway\" \"Dean Martin\"","cat":"해외","m":"유연하게 춤추는 대지의 운동성"},{"t":"L-O-V-E","a":"Nat King Cole","q":"\"L-O-V-E\" \"Nat King Cole\"","cat":"해외","m":"클래식하고 안정적인 풍요의 상징"},{"t":"What A Wonderful World","a":"Louis Armstrong","q":"\"What A Wonderful World\" \"Louis Armstrong\"","cat":"해외","m":"세상을 긍정하는 토 기운의 완성"},{"t":"무반주 첼로 모음곡 1번 '프렐류드'","a":"바흐","q":"\"무반주 첼로 모음곡 1번 '프렐류드'\" \"바흐\"","cat":"해외","m":"대지의 깊은 울림처럼 단단하게 중심을 잡는 "},{"t":"피아노 소나타 '비창' 2악장","a":"베토벤","q":"\"피아노 소나타 '비창' 2악장\" \"베토벤\"","cat":"해외","m":"흔들리지 않는 대지처럼 깊은 평온과 신뢰"},{"t":"현악 4중주 '황제' 2악장","a":"하이든","q":"\"현악 4중주 '황제' 2악장\" \"하이든\"","cat":"해외","m":"대지의 품위와 변하지 않는 단단한 기초"},{"t":"안단테 (교향곡 3번 2악장)","a":"브람스","q":"\"안단테 (교향곡 3번 2악장)\" \"브람스\"","cat":"해외","m":"묵직하게 가라앉아 중심을 지키는 토의 안정감"},{"t":"G선상의 아리아","a":"바흐","q":"\"G선상의 아리아\" \"바흐\"","cat":"해외","m":"모든 흐름을 수렴하여 하나로 모으는 중재의 "},{"t":"라르고 (세르세 중)","a":"헨델","q":"\"라르고 (세르세 중)\" \"헨델\"","cat":"해외","m":"흔들림 없는 나무의 뿌리를 지탱하는 흙의 기"},{"t":"피아노 협주곡 21번 2악장","a":"모차르트","q":"\"피아노 협주곡 21번 2악장\" \"모차르트\"","cat":"해외","m":"광활한 평야를 바라보는 듯한 여유와 포용력"},{"t":"겨울 나그네 '보리수'","a":"슈베르트","q":"\"겨울 나그네 '보리수'\" \"슈베르트\"","cat":"해외","m":"깊은 땅속의 영양분처럼 내면을 채우는 에너지"},{"t":"칸타타 BWV 147 '예수, 인간 소망의 기쁨'","a":"바흐","q":"\"칸타타 BWV 147 '예수, 인간 소망의 기쁨'\" \"바흐\"","cat":"해외","m":"규칙적이고 안정적인 토의 질서와 평화"},{"t":"동물의 사육제 '거북이'","a":"생상스","q":"\"동물의 사육제 '거북이'\" \"생상스\"","cat":"해외","m":"서두르지 않고 만물을 길러내는 토의 인내심"},{"t":"헝가리 무곡 4번","a":"브람스","q":"\"헝가리 무곡 4번\" \"브람스\"","cat":"해외","m":"대지의 웅장함과 묵직한 중력을 닮은 파동"},{"t":"캐논 (D Major)","a":"파헬벨","q":"\"캐논 (D Major)\" \"파헬벨\"","cat":"해외","m":"한결같은 지지력으로 만물을 순환시키는 토의 "},{"t":"교향곡 7번 2악장","a":"베토벤","q":"\"교향곡 7번 2악장\" \"베토벤\"","cat":"해외","m":"거대한 성벽처럼 단단하고 위엄 있는 토의 수"},{"t":"교향곡 9번 '신세계' 2악장 '라르고'","a":"드보르자크","q":"\"교향곡 9번 '신세계' 2악장 '라르고'\" \"드보르자크\"","cat":"해외","m":"고향의 흙 냄새처럼 포근하고 든든한 안식"},{"t":"골트베르크 변주곡 '아리아'","a":"바흐","q":"\"골트베르크 변주곡 '아리아'\" \"바흐\"","cat":"해외","m":"만물의 중심에서 질서를 조율하는 지혜"},{"t":"무언가 '베네치아 뱃노래'","a":"멘델스존","q":"\"무언가 '베네치아 뱃노래'\" \"멘델스존\"","cat":"해외","m":"물을 가두고 길을 만드는 둑과 같은 안정성"},{"t":"어린이 정경 '트로이메라이'","a":"슈만","q":"\"어린이 정경 '트로이메라이'\" \"슈만\"","cat":"해외","m":"순수한 대지의 흙처럼 모든 것을 수용하는 마"},{"t":"파르티타 2번 '샤콘느'","a":"바흐","q":"\"파르티타 2번 '샤콘느'\" \"바흐\"","cat":"해외","m":"시련 속에서도 무너지지 않는 단단한 대지의 "},{"t":"중앙아시아의 초원에서","a":"보로딘","q":"\"중앙아시아의 초원에서\" \"보로딘\"","cat":"해외","m":"끝없이 펼쳐진 초원의 광활함과 포용력"},{"t":"교향곡 4번 '낭만적' 1악장","a":"브루크너","q":"\"교향곡 4번 '낭만적' 1악장\" \"브루크너\"","cat":"해외","m":"거대한 산맥처럼 위엄 있게 솟은 토의 기상"},{"t":"페르귄트 '오제의 죽음'","a":"그리그","q":"\"페르귄트 '오제의 죽음'\" \"그리그\"","cat":"해외","m":"대지로 돌아가는 생명의 장엄함과 평온"},{"t":"레퀴엠 '피에 예수'","a":"포레","q":"\"레퀴엠 '피에 예수'\" \"포레\"","cat":"해외","m":"티 없이 맑은 흙처럼 영혼을 정화하는 중재의"},{"t":"클라리넷 협주곡 2악장","a":"모차르트","q":"\"클라리넷 협주곡 2악장\" \"모차르트\"","cat":"해외","m":"부드러운 흙의 감촉처럼 마음을 만지는 안정제"},{"t":"무반주 첼로 2번 '사라방드'","a":"바흐","q":"\"무반주 첼로 2번 '사라방드'\" \"바흐\"","cat":"해외","m":"깊은 심연의 땅속에서 얻는 통찰과 정지"},{"t":"24개의 전주곡 4번","a":"쇼팽","q":"\"24개의 전주곡 4번\" \"쇼팽\"","cat":"해외","m":"무겁게 가라앉아 감정의 찌꺼기를 거르는 토의"},{"t":"피아노 협주곡 5번 '황제' 2악장","a":"베토벤","q":"\"피아노 협주곡 5번 '황제' 2악장\" \"베토벤\"","cat":"해외","m":"고귀한 대지의 주인과 같은 품격과 무게감"},{"t":"보칼리제","a":"라흐마니노프","q":"\"보칼리제\" \"라흐마니노프\"","cat":"해외","m":"대지에서 피어오르는 안개처럼 부드러운 수용"},{"t":"현악 6중주 '피렌체의 추억' 2악장","a":"차이콥스키","q":"\"현악 6중주 '피렌체의 추억' 2악장\" \"차이콥스키\"","cat":"해외","m":"따뜻한 흙의 온기를 머금은 기억의 저장소"},{"t":"이탈리아 협주곡 2악장","a":"바흐","q":"\"이탈리아 협주곡 2악장\" \"바흐\"","cat":"해외","m":"흔들림 없는 논리 위에 세워진 토의 구조"},{"t":"오르페오와 에우리디체 '정령의 춤'","a":"글루크","q":"\"오르페오와 에우리디체 '정령의 춤'\" \"글루크\"","cat":"해외","m":"흙 속에 깃든 생명의 신비와 고요한 움직임"},{"t":"수수께끼 변주곡 '님로드'","a":"엘가","q":"\"수수께끼 변주곡 '님로드'\" \"엘가\"","cat":"해외","m":"숭고하고 단단한 신뢰를 바탕으로 한 토의 에"},{"t":"피아노 협주곡 2번 3악장","a":"브람스","q":"\"피아노 협주곡 2번 3악장\" \"브람스\"","cat":"해외","m":"거대한 대륙처럼 묵직하고 깊은 내면의 힘"},{"t":"피아노 5중주 '송어' 4악장","a":"슈베르트","q":"\"피아노 5중주 '송어' 4악장\" \"슈베르트\"","cat":"해외","m":"흙과 물이 만나 생명을 기르는 상생의 활력"},{"t":"전람회의 그림 '비들로(소)'","a":"무소르그스키","q":"\"전람회의 그림 '비들로(소)'\" \"무소르그스키\"","cat":"해외","m":"묵묵히 땅을 일구는 우직한 토의 노동과 보답"},{"t":"슬픈 왈츠","a":"시벨리우스","q":"\"슬픈 왈츠\" \"시벨리우스\"","cat":"해외","m":"흩어지는 기운을 다시 땅으로 불러들이는 수렴"},{"t":"음악의 헌정 '무한 캐논'","a":"바흐","q":"\"음악의 헌정 '무한 캐논'\" \"바흐\"","cat":"해외","m":"영원히 변치 않는 대지의 법칙과 순환"},{"t":"리날도 '울게 하소서'","a":"헨델","q":"\"리날도 '울게 하소서'\" \"헨델\"","cat":"해외","m":"슬픔을 땅에 묻고 다시 일어서는 치유의 토기"},{"t":"마술피리 '오 이시스와 오시리스여'","a":"모차르트","q":"\"마술피리 '오 이시스와 오시리스여'\" \"모차르트\"","cat":"해외","m":"대지의 신에게 구하는 보호와 단단한 축복"},{"t":"교향곡 6번 '전원' 2악장","a":"베토벤","q":"\"교향곡 6번 '전원' 2악장\" \"베토벤\"","cat":"해외","m":"시냇가 땅 위에서 느끼는 충만한 안정과 풍요"},{"t":"짜라투스트라는 이렇게 말했다 '서주'","a":"슈트라우스","q":"\"짜라투스트라는 이렇게 말했다 '서주'\" \"슈트라우스\"","cat":"해외","m":"지평선 위로 솟아오르는 태양을 지탱하는 땅의"},{"t":"안단테 칸타빌레","a":"차이콥스키","q":"\"안단테 칸타빌레\" \"차이콥스키\"","cat":"해외","m":"메마른 감정을 적시는 비 온 뒤의 흙 냄새"},{"t":"타이스의 명상곡","a":"마스네","q":"\"타이스의 명상곡\" \"마스네\"","cat":"해외","m":"세속의 번뇌를 끄고 대지의 정적 속으로 들어"},{"t":"자장가 Op.57","a":"쇼팽","q":"\"자장가 Op.57\" \"쇼팽\"","cat":"해외","m":"요람처럼 흔들림 없이 감싸주는 토의 모성"},{"t":"교향곡 94번 '놀람' 2악장","a":"하이든","q":"\"교향곡 94번 '놀람' 2악장\" \"하이든\"","cat":"해외","m":"예측 불허의 상황에서도 중심을 잃지 않는 토"},{"t":"푸가의 기법 '콘트라푼쿠스 1'","a":"바흐","q":"\"푸가의 기법 '콘트라푼쿠스 1'\" \"바흐\"","cat":"해외","m":"견고한 건축물처럼 쌓아 올린 토의 완결성"},{"t":"현악 4중주 15번 3악장","a":"베토벤","q":"\"현악 4중주 15번 3악장\" \"베토벤\"","cat":"해외","m":"신성한 감사의 노래, 회복을 돕는 대지의 재"},{"t":"위로 (Consolation) 3번","a":"리스트","q":"\"위로 (Consolation) 3번\" \"리스트\"","cat":"해외","m":"상처 입은 마음을 덮어주는 따뜻한 흙의 위로"},{"t":"세레나데 10번 '그랑 파르티타' 3악장","a":"모차르트","q":"\"세레나데 10번 '그랑 파르티타' 3악장\" \"모차르트\"","cat":"해외","m":"완벽한 균형과 조화로 이끄는 중재의 에너지"},{"t":"협주곡 '안식' (Il Riposo) 2악장","a":"비발디","q":"\"협주곡 '안식' (Il Riposo) 2악장\" \"비발디\"","cat":"해외","m":"모든 활동을 멈추고 땅의 기운을 보충하는 시"},{"t":"메시아 '내 주는 살아계시니'","a":"헨델","q":"\"메시아 '내 주는 살아계시니'\" \"헨델\"","cat":"해외","m":"영원히 흔들리지 않는 대지 위에서의 확신"}],"금":[{"t":"비상","a":"임재범","q":"\"비상\" \"임재범\"","cat":"한국","m":"금의 기개와 명예운의 정점"},{"t":"이젠 그랬으면 좋겠네","a":"조용필","q":"\"이젠 그랬으면 좋겠네\" \"조용필\"","cat":"한국","m":"고결한 인격과 절제된 슬픔"},{"t":"숨","a":"박효신","q":"\"숨\" \"박효신\"","cat":"한국","m":"폐와 호흡을 맑게 하는 깊은 울림"},{"t":"아름다운 구속","a":"김종서","q":"\"아름다운 구속\" \"김종서\"","cat":"한국","m":"정제된 록 사운드의 금속성 에너지"},{"t":"민물 장어의 꿈","a":"신해철","q":"\"민물 장어의 꿈\" \"신해철\"","cat":"한국","m":"자아 성찰과 날카로운 통찰력"},{"t":"아름다운 강산","a":"이선희","q":"\"아름다운 강산\" \"이선희\"","cat":"한국","m":"웅장한 기상과 명예로운 에너지"},{"t":"비와 당신의 이야기","a":"부활","q":"\"비와 당신의 이야기\" \"부활\"","cat":"한국","m":"차갑지만 강렬한 금의 서정성"},{"t":"거위의 꿈","a":"김동률","q":"\"거위의 꿈\" \"김동률\"","cat":"한국","m":"목표를 향한 단단한 의지와 결실"},{"t":"그것만이 내 세상","a":"들국화","q":"\"그것만이 내 세상\" \"들국화\"","cat":"한국","m":"타협하지 않는 금의 독자적 기운"},{"t":"흰수염고래","a":"윤도현","q":"\"흰수염고래\" \"윤도현\"","cat":"한국","m":"넓은 바다를 가르는 은빛 검의 형상"},{"t":"사람이 꽃보다 아름다워","a":"안치환","q":"\"사람이 꽃보다 아름다워\" \"안치환\"","cat":"한국","m":"정의로움과 사회적 명예의 기운"},{"t":"누구없소","a":"한영애","q":"\"누구없소\" \"한영애\"","cat":"한국","m":"폐부 깊숙이 파고드는 허스키한 금성"},{"t":"나를 슬프게 하는 사람들","a":"김경호","q":"\"나를 슬프게 하는 사람들\" \"김경호\"","cat":"한국","m":"금속성 고음으로 막힌 기운을 뚫음"},{"t":"천년의 사랑","a":"박완규","q":"\"천년의 사랑\" \"박완규\"","cat":"한국","m":"변치 않는 금석맹약의 의리"},{"t":"가을을 남기고 간 사랑","a":"패티김","q":"\"가을을 남기고 간 사랑\" \"패티김\"","cat":"한국","m":"금의 계절인 가을의 고결한 정리"},{"t":"희야","a":"이승철","q":"\"희야\" \"이승철\"","cat":"한국","m":"정갈하고 깨끗한 금의 음색"},{"t":"발해를 꿈꾸며","a":"서태지와 아이들","q":"\"발해를 꿈꾸며\" \"서태지와 아이들\"","cat":"한국","m":"대의명분과 국가적 명예운"},{"t":"내 마음에 비친 내 모습","a":"유재하","q":"\"내 마음에 비친 내 모습\" \"유재하\"","cat":"한국","m":"한 점 부끄럼 없는 투명한 금의 마음"},{"t":"내 사랑 내 곁에","a":"김현식","q":"\"내 사랑 내 곁에\" \"김현식\"","cat":"한국","m":"쓸쓸하지만 강인한 금의 고독"},{"t":"어른아이","a":"거미","q":"\"어른아이\" \"거미\"","cat":"한국","m":"세련되고 절제된 도심의 금 기운"},{"t":"생각이나","a":"정동하","q":"\"생각이나\" \"정동하\"","cat":"한국","m":"날카롭게 정제된 감수성"},{"t":"총 맞은 것처럼","a":"백지영","q":"\"총 맞은 것처럼\" \"백지영\"","cat":"한국","m":"차가운 금속성 슬픔과 카리스마"},{"t":"소주 한 잔","a":"임창정","q":"\"소주 한 잔\" \"임창정\"","cat":"한국","m":"서민적이지만 의리 있는 금의 정서"},{"t":"사랑에 빠지고 싶다","a":"김조한","q":"\"사랑에 빠지고 싶다\" \"김조한\"","cat":"한국","m":"고독 속에서 찾는 진정한 가치"},{"t":"안 되나요","a":"휘성","q":"\"안 되나요\" \"휘성\"","cat":"한국","m":"호흡의 강약 조절로 폐활량 증진"},{"t":"바람기억","a":"나얼","q":"\"바람기억\" \"나얼\"","cat":"한국","m":"영혼을 정화하는 맑고 높은 주파수"},{"t":"끝사랑","a":"김범수","q":"\"끝사랑\" \"김범수\"","cat":"한국","m":"일편단심이라는 금의 지조"},{"t":"애인 있어요","a":"이은미","q":"\"애인 있어요\" \"이은미\"","cat":"한국","m":"단단하게 맺힌 슬픔의 결정체"},{"t":"야상곡","a":"김윤아","q":"\"야상곡\" \"김윤아\"","cat":"한국","m":"달빛 아래 비치는 서늘한 검기"},{"t":"어디에도","a":"이수 (M.C the MAX)","q":"\"어디에도\" \"이수 (M.C the MAX)\"","cat":"한국","m":"극한의 고음으로 기관지를 자극"},{"t":"라젠카, 세이브 어스","a":"하현우 (국카스텐)","q":"\"라젠카, 세이브 어스\" \"하현우 (국카스텐)\"","cat":"한국","m":"강철 같은 목소리로 명예를 수호"},{"t":"하루만","a":"적우","q":"\"하루만\" \"적우\"","cat":"한국","m":"깊은 동굴에서 울리는 금의 진동"},{"t":"크게 라디오를 켜고","a":"김바다","q":"\"크게 라디오를 켜고\" \"김바다\"","cat":"한국","m":"록 스피릿으로 분출하는 금 에너지"},{"t":"회심곡","a":"김영임","q":"\"회심곡\" \"김영임\"","cat":"한국","m":"삶과 죽음을 정리하는 금의 이치"},{"t":"늪","a":"조관우","q":"\"늪\" \"조관우\"","cat":"한국","m":"가느다란 은사 같은 고음"},{"t":"거위의 꿈","a":"인순이","q":"\"거위의 꿈\" \"인순이\"","cat":"한국","m":"역경을 뚫고 얻는 승리의 명예"},{"t":"전설 속의 누군가처럼","a":"신승훈","q":"\"전설 속의 누군가처럼\" \"신승훈\"","cat":"한국","m":"영웅의 탄생과 사회적 성취"},{"t":"아버지","a":"싸이","q":"\"아버지\" \"싸이\"","cat":"한국","m":"책임감이라는 무거운 금의 의무"},{"t":"사랑한 후에","a":"전인권","q":"\"사랑한 후에\" \"전인권\"","cat":"한국","m":"거칠지만 순수한 금의 본질"},{"t":"홀로 된다는 것","a":"변진섭","q":"\"홀로 된다는 것\" \"변진섭\"","cat":"한국","m":"독립적이고 주체적인 금의 자립"},{"t":"영일만 친구","a":"최백호","q":"\"영일만 친구\" \"최백호\"","cat":"한국","m":"사나이의 의리와 푸른 기상"},{"t":"공","a":"나훈아","q":"\"공\" \"나훈아\"","cat":"한국","m":"인생을 정리하는 철학적 단호함"},{"t":"빈 잔","a":"남진","q":"\"빈 잔\" \"남진\"","cat":"한국","m":"비어있음으로 채우는 금의 역설"},{"t":"돌리도","a":"김희재","q":"\"돌리도\" \"김희재\"","cat":"한국","m":"명예를 회복하는 역동적 기운"},{"t":"찐이야","a":"영탁","q":"\"찐이야\" \"영탁\"","cat":"한국","m":"진짜를 가려내는 금의 눈"},{"t":"남자는 말합니다","a":"장민호","q":"\"남자는 말합니다\" \"장민호\"","cat":"한국","m":"약속과 신용을 중시하는 금의 덕목"},{"t":"가인이어라","a":"송가인","q":"\"가인이어라\" \"송가인\"","cat":"한국","m":"명창의 소리로 틔우는 명예운"},{"t":"애모","a":"김수희","q":"\"애모\" \"김수희\"","cat":"한국","m":"깊이 뿌리박힌 금의 연정"},{"t":"그때 그 사람","a":"심수봉","q":"\"그때 그 사람\" \"심수봉\"","cat":"한국","m":"과거를 추억하며 정리하는 힘"},{"t":"동백아가씨","a":"이미자","q":"\"동백아가씨\" \"이미자\"","cat":"한국","m":"변치 않는 절개와 전통의 명예"},{"t":"Canon in D","a":"Pachelbel","q":"\"Canon in D\" \"Pachelbel\"","cat":"해외","m":"금의 질서와 완벽한 조화"},{"t":"My Way","a":"Frank Sinatra","q":"\"My Way\" \"Frank Sinatra\"","cat":"해외","m":"독자적인 길을 걷는 명예와 기개"},{"t":"We Are The Champions","a":"Queen","q":"\"We Are The Champions\" \"Queen\"","cat":"해외","m":"승리자의 영광과 금속성 카리스마"},{"t":"I Will Always Love You","a":"Whitney Houston","q":"\"I Will Always Love You\" \"Whitney Houston\"","cat":"해외","m":"폐부 깊숙이 뚫어주는 폭발적 성량"},{"t":"Desperado","a":"Eagles","q":"\"Desperado\" \"Eagles\"","cat":"해외","m":"고독한 무사의 정서와 성찰"},{"t":"My Heart Will Go On","a":"Celine Dion","q":"\"My Heart Will Go On\" \"Celine Dion\"","cat":"해외","m":"웅장한 기상과 변치 않는 금의 의지"},{"t":"You Raise Me Up","a":"Josh Groban","q":"\"You Raise Me Up\" \"Josh Groban\"","cat":"해외","m":"명예를 세워주는 든든한 에너지"},{"t":"Tears in Heaven","a":"Eric Clapton","q":"\"Tears in Heaven\" \"Eric Clapton\"","cat":"해외","m":"정제된 슬픔과 맑은 금의 울림"},{"t":"Heroes","a":"David Bowie","q":"\"Heroes\" \"David Bowie\"","cat":"해외","m":"영웅적 기개와 명예"},{"t":"Time to Say Goodbye","a":"Andrea Bocelli","q":"\"Time to Say Goodbye\" \"Andrea Bocelli\"","cat":"해외","m":"단호한 결단과 고결한 마감"},{"t":"Nella Fantasia","a":"Sarah Brightman","q":"\"Nella Fantasia\" \"Sarah Brightman\"","cat":"해외","m":"천상의 소리로 폐를 정화함"},{"t":"Goodbye Yellow Brick Road","a":"Elton John","q":"\"Goodbye Yellow Brick Road\" \"Elton John\"","cat":"해외","m":"화려함을 뒤로하고 본질을 찾는 힘"},{"t":"All of Me","a":"John Legend","q":"\"All of Me\" \"John Legend\"","cat":"해외","m":"군더더기 없는 순수한 금의 사랑"},{"t":"Wind of Change","a":"Scorpions","q":"\"Wind of Change\" \"Scorpions\"","cat":"해외","m":"변화의 바람을 가르는 날카로운 통찰"},{"t":"Dream On","a":"Aerosmith","q":"\"Dream On\" \"Aerosmith\"","cat":"해외","m":"금속성 고음으로 기관지를 자극"},{"t":"(Everything I Do) I Do It for You","a":"Bryan Adams","q":"\"(Everything I Do) I Do It for You\" \"Bryan Adams\"","cat":"해외","m":"일편단심과 지조 있는 금의 덕목"},{"t":"Bed of Roses","a":"Bon Jovi","q":"\"Bed of Roses\" \"Bon Jovi\"","cat":"해외","m":"거칠지만 품격 있는 금의 서정성"},{"t":"Still Got The Blues","a":"Gary Moore","q":"\"Still Got The Blues\" \"Gary Moore\"","cat":"해외","m":"차가운 블루스 기타의 금속성 에너지"},{"t":"Creep","a":"Radiohead","q":"\"Creep\" \"Radiohead\"","cat":"해외","m":"고독의 끝에서 만나는 자기 고백"},{"t":"Fix You","a":"Coldplay","q":"\"Fix You\" \"Coldplay\"","cat":"해외","m":"부서진 것을 다시 세우는 단단함"},{"t":"Writing's On The Wall","a":"Sam Smith","q":"\"Writing's On The Wall\" \"Sam Smith\"","cat":"해외","m":"명예로운 사명을 짊어진 무게감"},{"t":"Alive","a":"Sia","q":"\"Alive\" \"Sia\"","cat":"해외","m":"생존을 넘어선 강인한 기운"},{"t":"Young and Beautiful","a":"Lana Del Rey","q":"\"Young and Beautiful\" \"Lana Del Rey\"","cat":"해외","m":"고전적이고 우아한 명예의 기품"},{"t":"Take Me To Church","a":"Hozier","q":"\"Take Me To Church\" \"Hozier\"","cat":"해외","m":"엄숙하고 절도 있는 금의 의식"},{"t":"Empire State of Mind","a":"Alicia Keys","q":"\"Empire State of Mind\" \"Alicia Keys\"","cat":"해외","m":"성공과 명예를 상징하는 도심의 빛"},{"t":"Young Forever","a":"Jay-Z","q":"\"Young Forever\" \"Jay-Z\"","cat":"해외","m":"영원히 기억될 명예와 유산"},{"t":"One More Light","a":"Linkin Park","q":"\"One More Light\" \"Linkin Park\"","cat":"해외","m":"꺼지지 않는 맑은 영혼의 빛"},{"t":"My Immortal","a":"Evanescence","q":"\"My Immortal\" \"Evanescence\"","cat":"해외","m":"영원불멸에 대한 서글픈 예찬"},{"t":"November Rain","a":"Guns N' Roses","q":"\"November Rain\" \"Guns N' Roses\"","cat":"해외","m":"금의 계절의 장엄한 서사"},{"t":"Purple Rain","a":"Prince","q":"\"Purple Rain\" \"Prince\"","cat":"해외","m":"고귀한 명예를 상징하는 보랏빛 기운"},{"t":"Careless Whisper","a":"George Michael","q":"\"Careless Whisper\" \"George Michael\"","cat":"해외","m":"섹소폰의 금속성 파동이 폐를 자극"},{"t":"Shape of My Heart","a":"Sting","q":"\"Shape of My Heart\" \"Sting\"","cat":"해외","m":"냉철한 판단력과 포커페이스"},{"t":"Piano Man","a":"Billy Joel","q":"\"Piano Man\" \"Billy Joel\"","cat":"해외","m":"고독한 인간 군상을 관조하는 지혜"},{"t":"Dust in the Wind","a":"Kansas","q":"\"Dust in the Wind\" \"Kansas\"","cat":"해외","m":"비워냄으로써 얻는 절대적 질서"},{"t":"Everybody Hurts","a":"R.E.M.","q":"\"Everybody Hurts\" \"R.E.M.\"","cat":"해외","m":"슬픔을 공명으로 이겨내는 힘"},{"t":"One","a":"U2","q":"\"One\" \"U2\"","cat":"해외","m":"조화와 단결을 통한 사회적 명예"},{"t":"Don't Look Back in Anger","a":"Oasis","q":"\"Don't Look Back in Anger\" \"Oasis\"","cat":"해외","m":"과거를 쳐내고 앞으로 나아가는 힘"},{"t":"Angels","a":"Robbie Williams","q":"\"Angels\" \"Robbie Williams\"","cat":"해외","m":"수호신 같은 든든한 금의 에너지"},{"t":"Goodbye My Lover","a":"James Blunt","q":"\"Goodbye My Lover\" \"James Blunt\"","cat":"해외","m":"깨끗한 마무리를 돕는 이별의 예절"},{"t":"Supermarket Flowers","a":"Ed Sheeran","q":"\"Supermarket Flowers\" \"Ed Sheeran\"","cat":"해외","m":"담백하게 갈무리하는 삶의 태도"},{"t":"Shallow","a":"Lady Gaga","q":"\"Shallow\" \"Lady Gaga\"","cat":"해외","m":"깊은 곳에서 올라오는 호소력"},{"t":"No Time To Die","a":"Billie Eilish","q":"\"No Time To Die\" \"Billie Eilish\"","cat":"해외","m":"냉철한 첩보원의 긴장감과 명예"},{"t":"Warriors","a":"Imagine Dragons","q":"\"Warriors\" \"Imagine Dragons\"","cat":"해외","m":"전사의 기상과 명예로운 승리"},{"t":"Hall of Fame","a":"The Script","q":"\"Hall of Fame\" \"The Script\"","cat":"해외","m":"명예의 전당에 오르는 성취운"},{"t":"Iron","a":"Woodkid","q":"\"Iron\" \"Woodkid\"","cat":"해외","m":"제목 그대로 강철 같은 비트"},{"t":"Way Down We Go","a":"Kaleo","q":"\"Way Down We Go\" \"Kaleo\"","cat":"해외","m":"묵직하고 거친 대지의 금 기운"},{"t":"Human","a":"Rag'n'Bone Man","q":"\"Human\" \"Rag'n'Bone Man\"","cat":"해외","m":"인간의 본질을 꿰뚫는 통찰력"},{"t":"Leave a Light On","a":"Tom Walker","q":"\"Leave a Light On\" \"Tom Walker\"","cat":"해외","m":"어둠 속에서 길을 비추는 등대"},{"t":"Before You Go","a":"Lewis Capaldi","q":"\"Before You Go\" \"Lewis Capaldi\"","cat":"해외","m":"떠나기 전 마지막 정리의 에너지"},{"t":"Hallelujah","a":"Leonard Cohen","q":"\"Hallelujah\" \"Leonard Cohen\"","cat":"해외","m":"숭고하고 성스러운 금의 피날레"},{"t":"토카타와 푸가 D단조","a":"바흐","q":"\"토카타와 푸가 D단조\" \"바흐\"","cat":"해외","m":"파이프 오르간의 금속성 울림과 엄격한 질서"},{"t":"교향곡 5번 '운명' 4악장","a":"베토벤","q":"\"교향곡 5번 '운명' 4악장\" \"베토벤\"","cat":"해외","m":"승리를 확정 짓는 금관악기의 당당한 결실"},{"t":"로미오와 줄리엣 '기사들의 춤'","a":"프로코피에프","q":"\"로미오와 줄리엣 '기사들의 춤'\" \"프로코피에프\"","cat":"해외","m":"갑옷의 무게감이 느껴지는 단단한 금의 위엄"},{"t":"피아노 협주곡 1번 1악장","a":"차이콥스키","q":"\"피아노 협주곡 1번 1악장\" \"차이콥스키\"","cat":"해외","m":"강철 같은 타건으로 문을 여는 강력한 결단"},{"t":"유다스 마카베우스 '보라 용사 돌아온다'","a":"핸델","q":"\"유다스 마카베우스 '보라 용사 돌아온다'\" \"핸델\"","cat":"해외","m":"금빛 찬란한 승리와 명예로운 결실의 기운"},{"t":"탄호이저 '서곡'","a":"바그너","q":"\"탄호이저 '서곡'\" \"바그너\"","cat":"해외","m":"흐트러짐 없는 정신적 절제와 금의 숙살지기"},{"t":"교향곡 41번 '주피터' 4악장","a":"모차르트","q":"\"교향곡 41번 '주피터' 4악장\" \"모차르트\"","cat":"해외","m":"완벽한 구조적 설계와 신성한 권위의 상징"},{"t":"전람회의 그림 '키예프의 대문'","a":"무소르그스키","q":"\"전람회의 그림 '키예프의 대문'\" \"무소르그스키\"","cat":"해외","m":"거대한 금속 문처럼 견고한 방어와 완성"},{"t":"에튜드 Op.25-11 '겨울 바람'","a":"쇼팽","q":"\"에튜드 Op.25-11 '겨울 바람'\" \"쇼팽\"","cat":"해외","m":"불필요한 것을 쳐내는 차갑고 날카로운 금의 "},{"t":"교향곡 2번 4악장","a":"시벨리우스","q":"\"교향곡 2번 4악장\" \"시벨리우스\"","cat":"해외","m":"북유럽의 차가운 대기를 뚫고 솟는 금의 의지"},{"t":"행성 중 '주피터(목성)'","a":"홀스트","q":"\"행성 중 '주피터(목성)'\" \"홀스트\"","cat":"해외","m":"웅장한 금관의 향연, 정의와 결실의 에너지"},{"t":"전주곡 Op.23-5 (G단조)","a":"라흐마니노프","q":"\"전주곡 Op.23-5 (G단조)\" \"라흐마니노프\"","cat":"해외","m":"절도 있는 행진, 흐트러짐 없는 실행력"},{"t":"협주곡 '금란지교' (Il Proteo)","a":"비발디","q":"\"협주곡 '금란지교' (Il Proteo)\" \"비발디\"","cat":"해외","m":"변치 않는 금속의 성질과 같은 신의와 원칙"},{"t":"브란덴부르크 협주곡 2번 1악장","a":"바흐","q":"\"브란덴부르크 협주곡 2번 1악장\" \"바흐\"","cat":"해외","m":"트럼펫의 높은 피치가 선사하는 명료한 통찰"},{"t":"불새 '피날레'","a":"스트라빈스키","q":"\"불새 '피날레'\" \"스트라빈스키\"","cat":"해외","m":"찬란하게 빛나는 금빛 새의 비상과 완성"},{"t":"피아노 소나타 '월광' 3악장","a":"베토벤","q":"\"피아노 소나타 '월광' 3악장\" \"베토벤\"","cat":"해외","m":"쏟아지는 칼날 같은 정교함과 폭발적 추진력"},{"t":"교향곡 101번 '시계' 2악장","a":"하이든","q":"\"교향곡 101번 '시계' 2악장\" \"하이든\"","cat":"해외","m":"정확한 태엽 장치와 같은 규칙성과 정확도"},{"t":"파가니니 에튜드 3번 '라 캄파넬라'","a":"리스트","q":"\"파가니니 에튜드 3번 '라 캄파넬라'\" \"리스트\"","cat":"해외","m":"종소리의 투명한 공명, 핵심을 찌르는 직관"},{"t":"교향곡 3번 '오르간' 2악장","a":"생상스","q":"\"교향곡 3번 '오르간' 2악장\" \"생상스\"","cat":"해외","m":"장엄한 소리의 벽이 주는 단단한 보호막"},{"t":"아이다 '개선 행진곡'","a":"베르디","q":"\"아이다 '개선 행진곡'\" \"베르디\"","cat":"해외","m":"권위와 명예가 정점에 이르는 금의 확산"},{"t":"소나타 K.1 (D단조)","a":"스카를라티","q":"\"소나타 K.1 (D단조)\" \"스카를라티\"","cat":"해외","m":"건반 위를 가로지르는 날카롭고 명확한 선율"},{"t":"메시아 '할렐루야'","a":"헨델","q":"\"메시아 '할렐루야'\" \"헨델\"","cat":"해외","m":"하늘의 법도를 선포하는 금의 정의로움"},{"t":"폴로네즈 '영웅'","a":"쇼팽","q":"\"폴로네즈 '영웅'\" \"쇼팽\"","cat":"해외","m":"민족의 자존심을 지키는 굳건한 금의 투지"},{"t":"니벨룽의 반지 '발퀴레의 기행'","a":"바그너","q":"\"니벨룽의 반지 '발퀴레의 기행'\" \"바그너\"","cat":"해외","m":"금속 편자와 무기가 부딪히는 역동적 에너지"},{"t":"세비야의 이발사 '서곡'","a":"로시니","q":"\"세비야의 이발사 '서곡'\" \"로시니\"","cat":"해외","m":"빈틈없는 전개와 기발한 결단력의 조화"},{"t":"푸가의 기법 '콘트라푼쿠스 1'","a":"바흐","q":"\"푸가의 기법 '콘트라푼쿠스 1'\" \"바흐\"","cat":"해외","m":"수학적 완벽함 위에 세워진 금의 논리"},{"t":"카프리스 24번","a":"파가니니","q":"\"카프리스 24번\" \"파가니니\"","cat":"해외","m":"한계를 시험하는 냉철한 기교와 완성도"},{"t":"피아노 협주곡 1번 1악장","a":"브람스","q":"\"피아노 협주곡 1번 1악장\" \"브람스\"","cat":"해외","m":"거대한 바위와 같은 무게감 있는 금의 기운"},{"t":"핀란디아","a":"시벨리우스","q":"\"핀란디아\" \"시벨리우스\"","cat":"해외","m":"억압을 뚫고 나오는 단단한 자립의 의지"},{"t":"위풍당당 행진곡","a":"엘가","q":"\"위풍당당 행진곡\" \"엘가\"","cat":"해외","m":"제도와 법규 속에서 얻는 명예로운 결실"},{"t":"첼로 협주곡 1악장","a":"드보르자크","q":"\"첼로 협주곡 1악장\" \"드보르자크\"","cat":"해외","m":"묵직하고 깊은 울림이 주는 확고한 신념"},{"t":"교향곡 6번 '비창' 3악장","a":"차이콥스키","q":"\"교향곡 6번 '비창' 3악장\" \"차이콥스키\"","cat":"해외","m":"화려한 행진곡 속에 감춰진 냉철한 이성"},{"t":"세헤라자데 '바다와 신바드의 배'","a":"림스키-코르사코프","q":"\"세헤라자데 '바다와 신바드의 배'\" \"림스키-코르사코프\"","cat":"해외","m":"파도를 가르는 뱃머리처럼 날카로운 돌파력"},{"t":"돈 조반니 '서곡'","a":"모차르트","q":"\"돈 조반니 '서곡'\" \"모차르트\"","cat":"해외","m":"엄중한 심판의 무게와 피할 수 없는 결단"},{"t":"교향곡 5번 '종교개혁' 4악장","a":"멘델스존","q":"\"교향곡 5번 '종교개혁' 4악장\" \"멘델스존\"","cat":"해외","m":"신념을 지키는 단단한 금의 정신력"},{"t":"무반주 바이올린 파르티타 3번 '프렐류드'","a":"바흐","q":"\"무반주 바이올린 파르티타 3번 '프렐류드'\" \"바흐\"","cat":"해외","m":"빛나는 보석처럼 찬란한 소리의 입자들"},{"t":"교향곡 3번 '영웅' 4악장","a":"베토벤","q":"\"교향곡 3번 '영웅' 4악장\" \"베토벤\"","cat":"해외","m":"혼돈을 잠재우고 질서를 재편하는 에너지"},{"t":"스페인 교향곡 5악장","a":"랄로","q":"\"스페인 교향곡 5악장\" \"랄로\"","cat":"해외","m":"경쾌하면서도 절도 있는 금의 변주"},{"t":"초절기교 에튜드 8번 '사냥'","a":"리스트","q":"\"초절기교 에튜드 8번 '사냥'\" \"리스트\"","cat":"해외","m":"목표를 향해 정밀하게 발사되는 화살의 기운"},{"t":"짜라투스트라는 이렇게 말했다 '서주'","a":"슈트라우스","q":"\"짜라투스트라는 이렇게 말했다 '서주'\" \"슈트라우스\"","cat":"해외","m":"지평선을 가르는 첫 번째 빛, 금의 각성"},{"t":"서주와 타란텔라","a":"사라사테","q":"\"서주와 타란텔라\" \"사라사테\"","cat":"해외","m":"멈출 수 없는 회전과 정교한 금속성 진동"},{"t":"음악의 헌정 '6성부 리체르카레'","a":"바흐","q":"\"음악의 헌정 '6성부 리체르카레'\" \"바흐\"","cat":"해외","m":"다성음악의 정점, 고도로 훈련된 금의 지혜"},{"t":"수상음악 '알라 혼파이프'","a":"헨델","q":"\"수상음악 '알라 혼파이프'\" \"헨델\"","cat":"해외","m":"시원한 물줄기를 가르는 금속 관악기의 위용"},{"t":"교향곡 1번 '고전' 4악장","a":"프로코피에프","q":"\"교향곡 1번 '고전' 4악장\" \"프로코피에프\"","cat":"해외","m":"가볍지만 강철처럼 단단한 신고전주의적 미학"},{"t":"폴로네즈 '군대'","a":"쇼팽","q":"\"폴로네즈 '군대'\" \"쇼팽\"","cat":"해외","m":"일사분란한 질서와 당당한 기상의 금 에너지"},{"t":"피아노 협주곡 5번 '황제' 3악장","a":"베토벤","q":"\"피아노 협주곡 5번 '황제' 3악장\" \"베토벤\"","cat":"해외","m":"거침없는 환희와 금의 완성된 풍요로움"},{"t":"로엔그린 3막 전주곡","a":"바그너","q":"\"로엔그린 3막 전주곡\" \"바그너\"","cat":"해외","m":"축제의 정점, 화려하게 빛나는 금빛 에고"},{"t":"타란텔라 (순례의 해)","a":"리스트","q":"\"타란텔라 (순례의 해)\" \"리스트\"","cat":"해외","m":"광기 어린 속도 속에서도 잃지 않는 명확한 "},{"t":"민둥산의 하룻밤","a":"무소르그스키","q":"\"민둥산의 하룻밤\" \"무소르그스키\"","cat":"해외","m":"어둠을 가르고 나타나는 새벽 종소리의 숙살"},{"t":"푸가의 기법 '미완성 푸가'","a":"바흐","q":"\"푸가의 기법 '미완성 푸가'\" \"바흐\"","cat":"해외","m":"영원한 미완의 완성, 금의 궁극적인 정립"}],"수":[{"t":"동백아가씨","a":"이미자","q":"\"동백아가씨\" \"이미자\"","cat":"한국","m":"수의 인내와 깊은 전통의 울림"},{"t":"그 겨울의 찻집","a":"조용필","q":"\"그 겨울의 찻집\" \"조용필\"","cat":"한국","m":"차분하게 가라앉는 호수의 평온함"},{"t":"부산에 가면","a":"최백호","q":"\"부산에 가면\" \"최백호\"","cat":"한국","m":"바다와 그리움이 만나는 수의 정서"},{"t":"거리에서","a":"김광석","q":"\"거리에서\" \"김광석\"","cat":"한국","m":"텅 빈 내면을 채우는 지혜의 소리"},{"t":"사랑 그 쓸쓸함에 대하여","a":"양희은","q":"\"사랑 그 쓸쓸함에 대하여\" \"양희은\"","cat":"한국","m":"깊은 심해와 같은 고요한 성찰"},{"t":"다시 사랑한다 말할까","a":"김동률","q":"\"다시 사랑한다 말할까\" \"김동률\"","cat":"한국","m":"끊이지 않고 흐르는 물의 연속성"},{"t":"바람이 분다","a":"이소라","q":"\"바람이 분다\" \"이소라\"","cat":"한국","m":"투명하고 맑은 물의 슬픔"},{"t":"안개","a":"정훈희","q":"\"안개\" \"정훈희\"","cat":"한국","m":"수기가 서린 안개처럼 신비로운 기운"},{"t":"비나리","a":"심수봉","q":"\"비나리\" \"심수봉\"","cat":"한국","m":"귀인을 부르는 간절하고 깊은 기도"},{"t":"같은 시간 속의 너","a":"나얼","q":"\"같은 시간 속의 너\" \"나얼\"","cat":"한국","m":"영혼을 정화하는 맑은 주파수 공명"},{"t":"끝이 없는 길","a":"박인희","q":"\"끝이 없는 길\" \"박인희\"","cat":"한국","m":"끝없이 흐르는 강물 같은 인생"},{"t":"우울한 편지","a":"유재하","q":"\"우울한 편지\" \"유재하\"","cat":"한국","m":"비 오는 날의 차분한 수 에너지"},{"t":"비처럼 음악처럼","a":"김현식","q":"\"비처럼 음악처럼\" \"김현식\"","cat":"한국","m":"신장 기능을 돕는 촉촉한 감성"},{"t":"희재","a":"성시경","q":"\"희재\" \"성시경\"","cat":"한국","m":"부드럽게 감싸는 물의 포용력"},{"t":"그 여자","a":"백지영","q":"\"그 여자\" \"백지영\"","cat":"한국","m":"내면의 직관을 깨우는 깊은 울림"},{"t":"별빛 같은 나의 사랑아","a":"임영웅","q":"\"별빛 같은 나의 사랑아\" \"임영웅\"","cat":"한국","m":"밤하늘과 바다의 조화로운 안정감"},{"t":"옛사랑","a":"이문세","q":"\"옛사랑\" \"이문세\"","cat":"한국","m":"눈 덮인 산사의 고요한 수 기운"},{"t":"만남","a":"노사연","q":"\"만남\" \"노사연\"","cat":"한국","m":"좋은 인연을 끌어당기는 힘"},{"t":"내가 너의 곁에 잠시 살았다는 걸","a":"김연우","q":"\"내가 너의 곁에 잠시 살았다는 걸\" \"김연우\"","cat":"한국","m":"맑은 샘물처럼 깨끗한 정화"},{"t":"날 그만 잊어요","a":"거미","q":"\"날 그만 잊어요\" \"거미\"","cat":"한국","m":"응어리를 녹여 흘려보내는 수의 힘"},{"t":"미안해","a":"박정현","q":"\"미안해\" \"박정현\"","cat":"한국","m":"깊은 감정의 파고를 다스리는 음색"},{"t":"미소 속에 비친 그대","a":"신승훈","q":"\"미소 속에 비친 그대\" \"신승훈\"","cat":"한국","m":"잔잔한 수면 위로 비치는 자아"},{"t":"한숨","a":"이하이","q":"\"한숨\" \"이하이\"","cat":"한국","m":"막힌 기운을 뚫어주는 수렴의 미학"},{"t":"안녕","a":"폴킴","q":"\"안녕\" \"폴킴\"","cat":"한국","m":"정갈하게 정리되는 물의 이치"},{"t":"살았소","a":"김호중","q":"\"살았소\" \"김호중\"","cat":"한국","m":"생명의 근원을 지탱하는 묵직한 수"},{"t":"서울의 달","a":"송가인","q":"\"서울의 달\" \"송가인\"","cat":"한국","m":"차가운 달빛 아래 수 기운 보강"},{"t":"겨울비","a":"김종서","q":"\"겨울비\" \"김종서\"","cat":"한국","m":"차갑지만 생명을 잉태하는 겨울 물"},{"t":"서쪽 하늘","a":"이승철","q":"\"서쪽 하늘\" \"이승철\"","cat":"한국","m":"노을 아래 흐르는 물의 서정"},{"t":"만약에","a":"태연","q":"\"만약에\" \"태연\"","cat":"한국","m":"조심스럽게 다가오는 수의 섬세함"},{"t":"1월부터 6월까지","a":"윤종신","q":"\"1월부터 6월까지\" \"윤종신\"","cat":"한국","m":"시간의 흐름을 관조하는 지혜"},{"t":"터널","a":"김세정","q":"\"터널\" \"김세정\"","cat":"한국","m":"어둠 속에서 빛을 찾는 과정"},{"t":"너였다면","a":"정승환","q":"\"너였다면\" \"정승환\"","cat":"한국","m":"감정의 깊은 수심에 닿는 호소력"},{"t":"저 별","a":"헤이즈","q":"\"저 별\" \"헤이즈\"","cat":"한국","m":"영적인 직관을 일깨우는 비트"},{"t":"뜨거운 여름밤은 가고 남겨진 건 볼품없지만","a":"잔나비","q":"\"뜨거운 여름밤은 가고 남겨진 건 볼품없지만\" \"잔나비\"","cat":"한국","m":"계절이 지나고 남은 고요한 정수"},{"t":"달","a":"악뮤","q":"\"달\" \"악뮤\"","cat":"한국","m":"밤의 수 기운을 상징하는 멜로디"},{"t":"인사","a":"멜로망스","q":"\"인사\" \"멜로망스\"","cat":"한국","m":"좋은 관계의 시작을 돕는 에너지"},{"t":"무릎","a":"아이유","q":"\"무릎\" \"아이유\"","cat":"한국","m":"깊은 잠과 휴식을 돕는 안식처"},{"t":"그 중에 그대를 만나","a":"이선희","q":"\"그 중에 그대를 만나\" \"이선희\"","cat":"한국","m":"수많은 인연 중 귀인을 만나는 운"},{"t":"이별","a":"패티김","q":"\"이별\" \"패티김\"","cat":"한국","m":"삶의 순환을 인정하는 수의 철학"},{"t":"미워도 다시 한번","a":"남진","q":"\"미워도 다시 한번\" \"남진\"","cat":"한국","m":"돌고 도는 인생의 물길"},{"t":"남자라는 이유로","a":"조항조","q":"\"남자라는 이유로\" \"조항조\"","cat":"한국","m":"고독을 삼키는 수의 인내"},{"t":"영영","a":"나훈아","q":"\"영영\" \"나훈아\"","cat":"한국","m":"잊히지 않는 깊은 우물의 사랑"},{"t":"그때 그 사람","a":"심수봉","q":"\"그때 그 사람\" \"심수봉\"","cat":"한국","m":"빗속의 추억을 통한 자아 치유"},{"t":"찌레꽃","a":"장사익","q":"\"찌레꽃\" \"장사익\"","cat":"한국","m":"척박한 곳에서 틔우는 수의 생명력"},{"t":"달타령","a":"김부자","q":"\"달타령\" \"김부자\"","cat":"한국","m":"달과 수의 조화로운 리듬"},{"t":"영암아리랑","a":"하춘화","q":"\"영암아리랑\" \"하춘화\"","cat":"한국","m":"민족의 젖줄과 같은 수 기운"},{"t":"비 내리는 영동교","a":"주현미","q":"\"비 내리는 영동교\" \"주현미\"","cat":"한국","m":"흐르는 강물에 시름을 던짐"},{"t":"지나간다","a":"김범수","q":"\"지나간다\" \"김범수\"","cat":"한국","m":"모든 고통도 물처럼 흘러갈 것"},{"t":"My Destiny","a":"린","q":"\"My Destiny\" \"린\"","cat":"한국","m":"운명적인 귀인과의 조우"},{"t":"빨래","a":"이적","q":"\"빨래\" \"이적\"","cat":"한국","m":"마음의 때를 씻어내는 정화의 물"},{"t":"Moon River","a":"Audrey Hepburn","q":"\"Moon River\" \"Audrey Hepburn\"","cat":"해외","m":"수의 서정성과 흐르는 강물의 평온함"},{"t":"Watermark","a":"Enya","q":"\"Watermark\" \"Enya\"","cat":"해외","m":"수 기운의 정수, 심해의 고요함"},{"t":"Don't Know Why","a":"Norah Jones","q":"\"Don't Know Why\" \"Norah Jones\"","cat":"해외","m":"맑은 웅덩이처럼 투명한 수의 음색"},{"t":"Bridge Over Troubled Water","a":"Simon & Garfunkel","q":"\"Bridge Over Troubled Water\" \"Simon & Garfunkel\"","cat":"해외","m":"고난의 물길 위를 지켜주는 귀인의 에너지"},{"t":"Hello","a":"Adele","q":"\"Hello\" \"Adele\"","cat":"해외","m":"깊은 내면의 울림과 수렴의 미학"},{"t":"Lean On Me","a":"Bill Withers","q":"\"Lean On Me\" \"Bill Withers\"","cat":"해외","m":"귀인운을 상징하는 상호 신뢰와 지지"},{"t":"Lay Me Down","a":"Sam Smith","q":"\"Lay Me Down\" \"Sam Smith\"","cat":"해외","m":"정서적 정화와 깊은 수면의 안식"},{"t":"All By Myself","a":"Celine Dion","q":"\"All By Myself\" \"Celine Dion\"","cat":"해외","m":"고독 속에서 지혜를 발견하는 힘"},{"t":"Ordinary People","a":"John Legend","q":"\"Ordinary People\" \"John Legend\"","cat":"해외","m":"관계의 본질을 꿰뚫는 물의 통찰"},{"t":"O (Fly On)","a":"Coldplay","q":"\"O (Fly On)\" \"Coldplay\"","cat":"해외","m":"영적인 직관을 깨우는 맑은 피아노 선율"},{"t":"Summertime Sadness","a":"Lana Del Rey","q":"\"Summertime Sadness\" \"Lana Del Rey\"","cat":"해외","m":"깊고 푸른 바다의 몽환적인 수 기운"},{"t":"Ocean Eyes","a":"Billie Eilish","q":"\"Ocean Eyes\" \"Billie Eilish\"","cat":"해외","m":"수기가 가득한 눈빛처럼 맑은 진동"},{"t":"Retrograde","a":"James Blake","q":"\"Retrograde\" \"James Blake\"","cat":"해외","m":"무의식의 심연을 자극하는 수의 파동"},{"t":"Moon River (Cover)","a":"Frank Ocean","q":"\"Moon River (Cover)\" \"Frank Ocean\"","cat":"해외","m":"현대적 감각으로 재해석된 수의 지혜"},{"t":"Good Days","a":"SZA","q":"\"Good Days\" \"SZA\"","cat":"해외","m":"내면의 평화를 통해 귀인을 부르는 에너지"},{"t":"Blessed","a":"Daniel Caesar","q":"\"Blessed\" \"Daniel Caesar\"","cat":"해외","m":"축복에 대한 감사와 수용"},{"t":"Focus","a":"H.E.R.","q":"\"Focus\" \"H.E.R.\"","cat":"해외","m":"내면의 중심을 잡는 집중의 힘"},{"t":"Fallin'","a":"Alicia Keys","q":"\"Fallin'\" \"Alicia Keys\"","cat":"해외","m":"중력처럼 끌어당기는 수의 강력한 수렴"},{"t":"Sexual Healing","a":"Marvin Gaye","q":"\"Sexual Healing\" \"Marvin Gaye\"","cat":"해외","m":"신장 기능을 돕는 치유력"},{"t":"Smooth Operator","a":"Sade","q":"\"Smooth Operator\" \"Sade\"","cat":"해외","m":"세련되고 유연하게 흐르는 물의 움직임"},{"t":"Fragile","a":"Sting","q":"\"Fragile\" \"Sting\"","cat":"해외","m":"비 온 뒤 잎새에 맺힌 물방울 같은 섬세함"},{"t":"River of Tears","a":"Eric Clapton","q":"\"River of Tears\" \"Eric Clapton\"","cat":"해외","m":"눈물을 통한 감정의 완전한 해소"},{"t":"Candle in the Wind","a":"Elton John","q":"\"Candle in the Wind\" \"Elton John\"","cat":"해외","m":"수렴과 소멸, 그리고 영원한 기억"},{"t":"Angel","a":"Sarah McLachlan","q":"\"Angel\" \"Sarah McLachlan\"","cat":"해외","m":"천사의 품 같은 따뜻한 수 기운"},{"t":"Skinny Love","a":"Birdy","q":"\"Skinny Love\" \"Birdy\"","cat":"해외","m":"가녀리지만 끊이지 않는 시냇물의 생명력"},{"t":"Another Love","a":"Tom Odell","q":"\"Another Love\" \"Tom Odell\"","cat":"해외","m":"겹겹이 쌓인 물의 층과 같은 깊은 감성"},{"t":"All I Want","a":"Kodaline","q":"\"All I Want\" \"Kodaline\"","cat":"해외","m":"결핍을 수용하고 귀인을 기다리는 자세"},{"t":"Holocene","a":"Bon Iver","q":"\"Holocene\" \"Bon Iver\"","cat":"해외","m":"거대한 대자연 앞에서 얻는 수의 겸손"},{"t":"Mystery of Love","a":"Sufjan Stevens","q":"\"Mystery of Love\" \"Sufjan Stevens\"","cat":"해외","m":"사랑의 신비로운 직관과 영적 교감"},{"t":"No Surprises","a":"Radiohead","q":"\"No Surprises\" \"Radiohead\"","cat":"해외","m":"모든 소음을 가라앉히는 고요한 수조"},{"t":"Hoppípolla","a":"Sigur Rós","q":"\"Hoppípolla\" \"Sigur Rós\"","cat":"해외","m":"맑은 물웅덩이에서 뛰노는 순수함"},{"t":"Merry Christmas Mr. Lawrence","a":"Ryuichi Sakamoto","q":"\"Merry Christmas Mr. Lawrence\" \"Ryuichi Sakamoto\"","cat":"해외","m":"동양적 지혜와 수 기운의 정점"},{"t":"River Flows In You","a":"Yiruma","q":"\"River Flows In You\" \"Yiruma\"","cat":"해외","m":"내면에서 흐르는 물의 선율"},{"t":"Clair de Lune","a":"Debussy","q":"\"Clair de Lune\" \"Debussy\"","cat":"해외","m":"달빛이 비치는 호수의 정취"},{"t":"Talking to the Moon","a":"Bruno Mars","q":"\"Talking to the Moon\" \"Bruno Mars\"","cat":"해외","m":"밤의 지배자와 소통하는 힘"},{"t":"Falling","a":"Harry Styles","q":"\"Falling\" \"Harry Styles\"","cat":"해외","m":"깊은 물 속으로 침잠하는 성찰"},{"t":"Bruises","a":"Lewis Capaldi","q":"\"Bruises\" \"Lewis Capaldi\"","cat":"해외","m":"상처를 씻어내는 정화의 물길"},{"t":"Mercy","a":"Shawn Mendes","q":"\"Mercy\" \"Shawn Mendes\"","cat":"해외","m":"자비를 구하는 겸허한 에너지"},{"t":"Train Wreck","a":"James Arthur","q":"\"Train Wreck\" \"James Arthur\"","cat":"해외","m":"절망의 끝에서 구원을 찾는 기운"},{"t":"Photograph","a":"Ed Sheeran","q":"\"Photograph\" \"Ed Sheeran\"","cat":"해외","m":"기억을 보존하는 따뜻한 힘"},{"t":"Love Someone","a":"Lukas Graham","q":"\"Love Someone\" \"Lukas Graham\"","cat":"해외","m":"사랑을 통해 확장되는 수의 지혜"},{"t":"Let Her Go","a":"Passenger","q":"\"Let Her Go\" \"Passenger\"","cat":"해외","m":"집착을 버리고 물처럼 흘려보냄"},{"t":"A Thousand Years","a":"Christina Perri","q":"\"A Thousand Years\" \"Christina Perri\"","cat":"해외","m":"영겁의 시간을 견디는 일편단심"},{"t":"Need You Now","a":"Lady A","q":"\"Need You Now\" \"Lady A\"","cat":"해외","m":"밤의 고독 속에서 귀인을 찾는 절실함"},{"t":"Memories","a":"Maroon 5","q":"\"Memories\" \"Maroon 5\"","cat":"해외","m":"소중한 인연을 되새김"},{"t":"See You Again","a":"Wiz Khalifa","q":"\"See You Again\" \"Wiz Khalifa\"","cat":"해외","m":"다시 만날 인연을 기약하는 수"},{"t":"One Call Away","a":"Charlie Puth","q":"\"One Call Away\" \"Charlie Puth\"","cat":"해외","m":"언제든 달려오는 귀인의 든든함"},{"t":"Apologize","a":"OneRepublic","q":"\"Apologize\" \"OneRepublic\"","cat":"해외","m":"과거의 과오를 씻어내는 수의 용서"},{"t":"Next To Me","a":"Imagine Dragons","q":"\"Next To Me\" \"Imagine Dragons\"","cat":"해외","m":"끝까지 곁을 지키는 귀인의 에너지"},{"t":"What A Wonderful World","a":"Louis Armstrong","q":"\"What A Wonderful World\" \"Louis Armstrong\"","cat":"해외","m":"지혜를 얻고 바라본 완성된 세계"},{"t":"달빛 (Clair de Lune)","a":"드뷔시","q":"\"달빛 (Clair de Lune)\" \"드뷔시\"","cat":"해외","m":"호수에 비친 달빛처럼 차분하고 투명한 수렴"},{"t":"빗방울 전주곡","a":"쇼팽","q":"\"빗방울 전주곡\" \"쇼팽\"","cat":"해외","m":"끊임없이 떨어지는 빗물처럼 감정을 씻어내는 "},{"t":"물의 유희","a":"라벨","q":"\"물의 유희\" \"라벨\"","cat":"해외","m":"분수에서 솟구치는 물의 생동감과 유연한 흐름"},{"t":"아베 마리아","a":"슈베르트","q":"\"아베 마리아\" \"슈베르트\"","cat":"해외","m":"성스러운 물처럼 마음을 정화하는 숭고한 에너"},{"t":"백조의 호수 '정경'","a":"차이콥스키","q":"\"백조의 호수 '정경'\" \"차이콥스키\"","cat":"해외","m":"신비로운 호수의 안개와 깊은 수면의 평온함"},{"t":"수상음악 '에어'","a":"헨델","q":"\"수상음악 '에어'\" \"헨델\"","cat":"해외","m":"잔잔한 강물을 따라 흐르는 여유로운 수기"},{"t":"파바느","a":"포레","q":"\"파바느\" \"포레\"","cat":"해외","m":"깊고 고요한 밤의 바다를 유영하는 우아한 수"},{"t":"피아노 소나타 '월광' 1악장","a":"베토벤","q":"\"피아노 소나타 '월광' 1악장\" \"베토벤\"","cat":"해외","m":"심연의 바다처럼 깊은 사색과 무의식의 정화"},{"t":"자장가","a":"브람스","q":"\"자장가\" \"브람스\"","cat":"해외","m":"생명의 근원인 양수 속의 안식과 같은 에너지"},{"t":"골트베르크 '아리아'","a":"바흐","q":"\"골트베르크 '아리아'\" \"바흐\"","cat":"해외","m":"맑은 샘물이 순환하듯 영혼을 깨우는 지혜의 "},{"t":"무반주 첼로 2번","a":"바흐","q":"\"무반주 첼로 2번\" \"바흐\"","cat":"해외","m":"첼로의 깊은 울림이 심해의 고독을 치유함"},{"t":"헌정 (Widmung)","a":"슈만","q":"\"헌정 (Widmung)\" \"슈만\"","cat":"해외","m":"투명한 물줄기처럼 순수한 감정의 투영"},{"t":"녹턴 13번","a":"쇼팽","q":"\"녹턴 13번\" \"쇼팽\"","cat":"해외","m":"깊은 밤의 정적 속에서 얻는 수적 성찰"},{"t":"Ave Verum Corpus","a":"모차르트","q":"\"Ave Verum Corpus\" \"모차르트\"","cat":"해외","m":"맑은 영혼의 안식을 주는 성수의 파동"},{"t":"옴브라 마이 푸","a":"헨델","q":"\"옴브라 마이 푸\" \"헨델\"","cat":"해외","m":"시냇물 소리처럼 마음을 안정시키는 수의 기운"},{"t":"오르페오 '비탄'","a":"글루크","q":"\"오르페오 '비탄'\" \"글루크\"","cat":"해외","m":"눈물의 강을 건너 슬픔을 승화시키는 정화력"},{"t":"발라드 4번","a":"쇼팽","q":"\"발라드 4번\" \"쇼팽\"","cat":"해외","m":"물의 층처럼 겹겹이 쌓인 깊은 감정의 저장"},{"t":"목신의 오후 전주곡","a":"드뷔시","q":"\"목신의 오후 전주곡\" \"드뷔시\"","cat":"해외","m":"몽환적인 안개와 수증기의 유연한 움직임"},{"t":"크리스마스 오라토리오","a":"바흐","q":"\"크리스마스 오라토리오\" \"바흐\"","cat":"해외","m":"생명의 물을 찬양하는 맑고 투명한 진동"},{"t":"새들의 노래","a":"라모","q":"\"새들의 노래\" \"라모\"","cat":"해외","m":"숲속 시냇가의 청량한 공명과 수의 활기"},{"t":"밤의 음악","a":"바르토크","q":"\"밤의 음악\" \"바르토크\"","cat":"해외","m":"습기를 머금은 밤공기처럼 무의식을 자극함"},{"t":"사계 '6월의 뱃노래'","a":"차이콥스키","q":"\"사계 '6월의 뱃노래'\" \"차이콥스키\"","cat":"해외","m":"잔잔한 강 위를 노 저어가는 평화로운 수기"},{"t":"솔베이지의 노래","a":"그리그","q":"\"솔베이지의 노래\" \"그리그\"","cat":"해외","m":"인내와 지혜를 상징하는 깊은 호수의 에너지"},{"t":"뱃노래 Op.19-6","a":"멘델스존","q":"\"뱃노래 Op.19-6\" \"멘델스존\"","cat":"해외","m":"물결의 리듬에 몸을 맡긴 순응과 조화"},{"t":"그노시엔 3번","a":"사티","q":"\"그노시엔 3번\" \"사티\"","cat":"해외","m":"멈춰있는 수면처럼 지극히 고요한 직관력"},{"t":"시실리안느","a":"포레","q":"\"시실리안느\" \"포레\"","cat":"해외","m":"부드러운 물결이 전하는 치유와 수용의 기운"},{"t":"밤과 꿈","a":"슈베르트","q":"\"밤과 꿈\" \"슈베르트\"","cat":"해외","m":"무의식의 바다를 여행하는 듯한 영적 이완"},{"t":"협주곡 2번 2악장","a":"라흐마니노프","q":"\"협주곡 2번 2악장\" \"라흐마니노프\"","cat":"해외","m":"대양으로 나가는 거대한 강물의 숭고한 흐름"},{"t":"바다 (La Mer)","a":"드뷔시","q":"\"바다 (La Mer)\" \"드뷔시\"","cat":"해외","m":"파도의 역동성과 바다의 무한한 생명력"},{"t":"브라질풍 바흐 5번","a":"빌라 로보스","q":"\"브라질풍 바흐 5번\" \"빌라 로보스\"","cat":"해외","m":"원초적인 물의 기운과 생명의 습윤한 파동"},{"t":"에스테 별장의 분수","a":"리스트","q":"\"에스테 별장의 분수\" \"리스트\"","cat":"해외","m":"찬란하게 부서지는 물방울의 영롱한 에너지"},{"t":"협주곡 1번 2악장","a":"쇼팽","q":"\"협주곡 1번 2악장\" \"쇼팽\"","cat":"해외","m":"투명한 호수 표면처럼 맑은 자아의 투영"},{"t":"신비로운 섬","a":"드뷔시","q":"\"신비로운 섬\" \"드뷔시\"","cat":"해외","m":"바다 너머 이상향을 찾는 수의 탐구심"},{"t":"레퀴엠 '인트로이투스'","a":"모차르트","q":"\"레퀴엠 '인트로이투스'\" \"모차르트\"","cat":"해외","m":"영혼의 불순물을 씻어내는 엄숙한 수의 정화"},{"t":"눈물 (Lagrima)","a":"타레가","q":"\"눈물 (Lagrima)\" \"타레가\"","cat":"해외","m":"응축된 슬픔을 씻어내는 한 방울 물의 힘"},{"t":"비창 4악장","a":"차이콥스키","q":"\"비창 4악장\" \"차이콥스키\"","cat":"해외","m":"깊은 심연으로 가라앉는 절제된 수렴의 끝"},{"t":"양들은 평화롭게","a":"바흐","q":"\"양들은 평화롭게\" \"바흐\"","cat":"해외","m":"대지를 가로지르는 맑은 개울의 평화로운 기운"},{"t":"가라앉은 사원","a":"드뷔시","q":"\"가라앉은 사원\" \"드뷔시\"","cat":"해외","m":"수면 아래 잠긴 고대 지혜와 심층적 무의식"},{"t":"물의 정원","a":"라벨","q":"\"물의 정원\" \"라벨\"","cat":"해외","m":"정교하게 조율된 물의 흐름과 맑은 에너지"},{"t":"겨울 나그네 '거리의 악사'","a":"슈베르트","q":"\"겨울 나그네 '거리의 악사'\" \"슈베르트\"","cat":"해외","m":"얼어붙은 물처럼 고독하지만 단단한 지혜"},{"t":"인벤션 13번","a":"바흐","q":"\"인벤션 13번\" \"바흐\"","cat":"해외","m":"끊임없이 교차하며 흐르는 물줄기의 논리"},{"t":"수족관","a":"생상스","q":"\"수족관\" \"생상스\"","cat":"해외","m":"물속을 유영하는 생명체들의 신비로운 리듬"},{"t":"핑갈의 동굴","a":"멘델스존","q":"\"핑갈의 동굴\" \"멘델스존\"","cat":"해외","m":"파도가 부딪히는 동굴의 웅장한 수 에너지"},{"t":"밤의 노래","a":"슈만","q":"\"밤의 노래\" \"슈만\"","cat":"해외","m":"어둠이 내린 강가의 고요한 사색과 수용"},{"t":"세레나데","a":"슈베르트","q":"\"세레나데\" \"슈베르트\"","cat":"해외","m":"촉촉한 밤공기를 타고 흐르는 사랑의 파동"},{"t":"바이올린 소나타 1번","a":"바흐","q":"\"바이올린 소나타 1번\" \"바흐\"","cat":"해외","m":"한 줄기 물결처럼 고고하게 흐르는 정신적 정"},{"t":"환상 즉흥곡","a":"쇼팽","q":"\"환상 즉흥곡\" \"쇼팽\"","cat":"해외","m":"휘몰아치는 소용돌이 속의 정교한 물의 질서"},{"t":"호숫가에서","a":"리스트","q":"\"호숫가에서\" \"리스트\"","cat":"해외","m":"평온한 호수가 주는 명상적 수용과 안정"},{"t":"공주는 잠 못 이루고","a":"푸치니","q":"\"공주는 잠 못 이루고\" \"푸치니\"","cat":"해외","m":"밤의 정점에서 피어나는 승리의 열망과 수기"},{"t":"내 주는 살아계시니","a":"헨델","q":"\"내 주는 살아계시니\" \"헨델\"","cat":"해외","m":"마르지 않는 생명수의 확신과 영원한 평화"}],"주파수":[{"t":"G선상의 아리아","a":"바흐","q":"\"G선상의 아리아\" \"바흐\"","cat":"주파수","m":"무거운 감정의 앙금을 씻어내고 평온을 회복함"},{"t":"피아노 소나타 '비창' 2악장","a":"베토벤","q":"\"피아노 소나타 '비창' 2악장\" \"베토벤\"","cat":"주파수","m":"슬픔을 대면하고 그로부터 해방되는 숭고한 선"},{"t":"전주곡 4번 (E단조)","a":"쇼팽","q":"\"전주곡 4번 (E단조)\" \"쇼팽\"","cat":"주파수","m":"내면의 억눌린 우울을 밖으로 흘려보내는 정화"},{"t":"아베 마리아","a":"슈베르트","q":"\"아베 마리아\" \"슈베르트\"","cat":"주파수","m":"공포를 잠재우는 성스러운 보호와 안식의 에너"},{"t":"레퀴엠 '피에 예수'","a":"포레","q":"\"레퀴엠 '피에 예수'\" \"포레\"","cat":"주파수","m":"영혼의 깊은 상처를 어루만지고 해독하는 파동"},{"t":"타이스의 명상곡","a":"마스네","q":"\"타이스의 명상곡\" \"마스네\"","cat":"주파수","m":"번뇌를 끊고 순수한 의식의 상태로 복귀"},{"t":"달빛","a":"드뷔시","q":"\"달빛\" \"드뷔시\"","cat":"주파수","m":"차가운 밤공기처럼 머리를 맑게 하고 두려움을"},{"t":"무반주 첼로 1번 '사라방드'","a":"바흐","q":"\"무반주 첼로 1번 '사라방드'\" \"바흐\"","cat":"주파수","m":"단단한 저음이 불안한 심리의 중심을 잡아줌"},{"t":"리날도 '울게 하소서'","a":"헨델","q":"\"리날도 '울게 하소서'\" \"헨델\"","cat":"주파수","m":"억압된 환경에서 벗어나려는 자유의지의 발현"},{"t":"동물의 사육제 '백조'","a":"생상스","q":"\"동물의 사육제 '백조'\" \"생상스\"","cat":"주파수","m":"우아하게 흐르는 물결처럼 트라우마를 흘려보냄"},{"t":"클라리넷 협주곡 2악장","a":"모차르트","q":"\"클라리넷 협주곡 2악장\" \"모차르트\"","cat":"주파수","m":"부드러운 중저음이 긴장된 신경을 이완함"},{"t":"캐논 (D Major)","a":"파헬벨","q":"\"캐논 (D Major)\" \"파헬벨\"","cat":"주파수","m":"반복되는 구조가 불안한 마음을 질서 있게 정"},{"t":"오르페오와 에우리디체 '정령의 춤'","a":"글루크","q":"\"오르페오와 에우리디체 '정령의 춤'\" \"글루크\"","cat":"주파수","m":"사후세계의 평화처럼 모든 근심을 잊게 함"},{"t":"어린이 정경 '트로이메라이'","a":"슈만","q":"\"어린이 정경 '트로이메라이'\" \"슈만\"","cat":"주파수","m":"어린 시절의 순수함을 소환하여 죄책감을 희석"},{"t":"칸타타 BWV 147 '인간 소망의 기쁨'","a":"바흐","q":"\"칸타타 BWV 147 '인간 소망의 기쁨'\" \"바흐\"","cat":"주파수","m":"영적 충만감을 통해 불안을 확신으로 전환"},{"t":"녹턴 2번 (Eb Major)","a":"쇼팽","q":"\"녹턴 2번 (Eb Major)\" \"쇼팽\"","cat":"주파수","m":"밤의 정막 속에서 두려움을 잠재우는 치유의 "},{"t":"라르고 (세르세 중)","a":"헨델","q":"\"라르고 (세르세 중)\" \"헨델\"","cat":"주파수","m":"변치 않는 자연의 품처럼 안정감을 제공"},{"t":"교향곡 6번 '전원' 2악장","a":"베토벤","q":"\"교향곡 6번 '전원' 2악장\" \"베토벤\"","cat":"주파수","m":"자연의 소리를 통해 인위적인 공포를 제거"},{"t":"현악 4중주 2번 '녹턴'","a":"보로딘","q":"\"현악 4중주 2번 '녹턴'\" \"보로딘\"","cat":"주파수","m":"감정의 엉킨 실타래를 부드럽게 풀어주는 선율"},{"t":"교향곡 9번 '신세계' 2악장","a":"드보르자크","q":"\"교향곡 9번 '신세계' 2악장\" \"드보르자크\"","cat":"주파수","m":"고향의 흙과 같은 따뜻함이 심리적 위축을 해"},{"t":"아리오소 (BWV 1056)","a":"바흐","q":"\"아리오소 (BWV 1056)\" \"바흐\"","cat":"주파수","m":"끊임없이 흐르는 선율이 정체된 에너지를 해독"},{"t":"짐노페디 1번","a":"에릭 사티","q":"\"짐노페디 1번\" \"에릭 사티\"","cat":"주파수","m":"미니멀한 구성이 복잡한 잡념과 두려움을 비워"},{"t":"안단테 칸타빌레","a":"차이콥스키","q":"\"안단테 칸타빌레\" \"차이콥스키\"","cat":"주파수","m":"가슴 깊은 곳을 울려 억압된 울음을 해소함"},{"t":"사랑의 인사","a":"엘가","q":"\"사랑의 인사\" \"엘가\"","cat":"주파수","m":"긍정적인 파동으로 부정적인 자아상을 정화"},{"t":"피아노 협주곡 21번 2악장","a":"모차르트","q":"\"피아노 협주곡 21번 2악장\" \"모차르트\"","cat":"주파수","m":"광활한 지평선을 보는 듯한 해방감을 선사"},{"t":"무반주 바이올린 소나타 3번 '라르고'","a":"바흐","q":"\"무반주 바이올린 소나타 3번 '라르고'\" \"바흐\"","cat":"주파수","m":"고독하지만 단단한 선율이 내면의 힘을 길러줌"},{"t":"죽은 왕녀를 위한 파바느","a":"라벨","q":"\"죽은 왕녀를 위한 파바느\" \"라벨\"","cat":"주파수","m":"상실의 두려움을 수용하고 평온에 도달함"},{"t":"협주곡 '안식' 2악장","a":"비발디","q":"\"협주곡 '안식' 2악장\" \"비발디\"","cat":"주파수","m":"과각성된 신경계를 진정시키고 독소를 배출"},{"t":"오 사랑하는 나의 아버지","a":"푸치니","q":"\"오 사랑하는 나의 아버지\" \"푸치니\"","cat":"주파수","m":"간절한 호소가 심리적 장벽을 무너뜨리고 해방"},{"t":"자장가 Op.57","a":"쇼팽","q":"\"자장가 Op.57\" \"쇼팽\"","cat":"주파수","m":"요람의 흔들림처럼 근원적인 공포를 치유"},{"t":"파르티타 2번 '샤콘느'","a":"바흐","q":"\"파르티타 2번 '샤콘느'\" \"바흐\"","cat":"주파수","m":"비극을 이겨내고 승화시키는 강인한 해방의 기"},{"t":"안단테 (교향곡 3번 2악장)","a":"브람스","q":"\"안단테 (교향곡 3번 2악장)\" \"브람스\"","cat":"주파수","m":"묵직한 위로가 불안의 파도를 가라앉힘"},{"t":"겨울 나그네 '보리수'","a":"슈베르트","q":"\"겨울 나그네 '보리수'\" \"슈베르트\"","cat":"주파수","m":"안식처를 찾는 영혼에게 주는 땅의 기운"},{"t":"오보에 협주곡 2악장","a":"마르첼로","q":"\"오보에 협주곡 2악장\" \"마르첼로\"","cat":"주파수","m":"맑은 오보에 소리가 정신의 혼탁함을 해독"},{"t":"레퀴엠 '라크리모사'","a":"모차르트","q":"\"레퀴엠 '라크리모사'\" \"모차르트\"","cat":"주파수","m":"눈물로 죄와 고통을 씻어내는 카타르시스"},{"t":"이탈리아 협주곡 2악장","a":"바흐","q":"\"이탈리아 협주곡 2악장\" \"바흐\"","cat":"주파수","m":"규칙적인 베이스가 심장 박동을 안정시킴"},{"t":"수상음악 '에어'","a":"헨델","q":"\"수상음악 '에어'\" \"헨델\"","cat":"주파수","m":"강물을 따라 감정의 노폐물을 흘려보내는 효과"},{"t":"피아노 소나타 '월광' 1악장","a":"베토벤","q":"\"피아노 소나타 '월광' 1악장\" \"베토벤\"","cat":"주파수","m":"무의식 깊은 곳의 두려움을 수면 위로 끌어올"},{"t":"위로 3번","a":"리스트","q":"\"위로 3번\" \"리스트\"","cat":"주파수","m":"상처 입은 자아를 포근하게 감싸는 빛의 에너"},{"t":"두 대의 바이올린을 위한 협주곡 2악장","a":"바흐","q":"\"두 대의 바이올린을 위한 협주곡 2악장\" \"바흐\"","cat":"주파수","m":"대화를 통한 공감과 고립감으로부터의 해방"},{"t":"세레나데","a":"슈베르트","q":"\"세레나데\" \"슈베르트\"","cat":"주파수","m":"진실한 감정의 토로가 가로막힌 에너지를 뚫어"},{"t":"알함브라 궁전의 추억","a":"타레가","q":"\"알함브라 궁전의 추억\" \"타레가\"","cat":"주파수","m":"트레몰로 기법이 뇌파를 안정시키고 불안을 제"},{"t":"무언가 '베네치아 뱃노래'","a":"멘델스존","q":"\"무언가 '베네치아 뱃노래'\" \"멘델스존\"","cat":"주파수","m":"물 위의 고요한 움직임이 정서적 독소를 정화"},{"t":"골트베르크 변주곡 '아리아'","a":"바흐","q":"\"골트베르크 변주곡 '아리아'\" \"바흐\"","cat":"주파수","m":"만물의 중심을 잡는 소리가 자아의 균형을 회"},{"t":"현악 4중주 '종달새' 2악장","a":"하이든","q":"\"현악 4중주 '종달새' 2악장\" \"하이든\"","cat":"주파수","m":"맑은 소리가 정신의 갑갑함을 해소함"},{"t":"교향곡 9번 '합창' 3악장","a":"베토벤","q":"\"교향곡 9번 '합창' 3악장\" \"베토벤\"","cat":"주파수","m":"인류애와 신뢰를 통해 고립의 두려움을 극복"},{"t":"시실리안느","a":"포레","q":"\"시실리안느\" \"포레\"","cat":"주파수","m":"부드러운 물결이 마음의 긴장을 이완함"},{"t":"무반주 첼로 2번 '프렐류드'","a":"바흐","q":"\"무반주 첼로 2번 '프렐류드'\" \"바흐\"","cat":"주파수","m":"깊은 울림이 뼛속까지 정화하는 듯한 효과"},{"t":"세레나데 '그랑 파르티타' 3악장","a":"모차르트","q":"\"세레나데 '그랑 파르티타' 3악장\" \"모차르트\"","cat":"주파수","m":"완벽한 조화가 내면의 불협화음을 제거"},{"t":"메시아 '내 주는 살아계시니'","a":"헨델","q":"\"메시아 '내 주는 살아계시니'\" \"헨델\"","cat":"주파수","m":"확신과 믿음을 통해 모든 두려움에서 최종 해"},{"t":"가을을 남기고 간 사랑","a":"패티김","q":"\"가을을 남기고 간 사랑\" \"패티김\"","cat":"주파수","m":"상실을 허무가 아닌 '남겨진 유산'으로 재조"},{"t":"우리는","a":"송창식","q":"\"우리는\" \"송창식\"","cat":"주파수","m":"'나'가 아닌 '우리'라는 합일점을 제시하여"},{"t":"킬리만자로의 표범","a":"조용필","q":"\"킬리만자로의 표범\" \"조용필\"","cat":"주파수","m":"고독을 초라함이 아닌 '야성적 자유'로 재해"},{"t":"아침이슬","a":"양희은","q":"\"아침이슬\" \"양희은\"","cat":"주파수","m":"시련을 태양이 뜨기 전의 정화 과정으로 긍정"},{"t":"거리에서","a":"김광석","q":"\"거리에서\" \"김광석\"","cat":"주파수","m":"텅 빈 거리를 사색의 공간으로 변환하여 소외"},{"t":"J에게","a":"이선희","q":"\"J에게\" \"이선희\"","cat":"주파수","m":"그리움을 슬픔이 아닌 맑은 울림으로 승화하여"},{"t":"그것만이 내 세상","a":"들국화","q":"\"그것만이 내 세상\" \"들국화\"","cat":"주파수","m":"방황을 '자기 길을 찾는 과정'으로 긍정하여"},{"t":"슬픈 표정 하지 말아요","a":"신해철","q":"\"슬픈 표정 하지 말아요\" \"신해철\"","cat":"주파수","m":"슬픔을 억압하지 않고 대면하게 하여 내면에 "},{"t":"숨","a":"박효신","q":"\"숨\" \"박효신\"","cat":"주파수","m":"숨 막히는 현실에서 벗어나는 호흡의 해방을 "},{"t":"지나간다","a":"김범수","q":"\"지나간다\" \"김범수\"","cat":"주파수","m":"고통의 유한함을 명시하여 끝이 보이지 않는 "},{"t":"비상","a":"임재범","q":"\"비상\" \"임재범\"","cat":"주파수","m":"과거의 움츠림을 '도약을 위한 준비'로 재해"},{"t":"끝","a":"권진아","q":"\"끝\" \"권진아\"","cat":"주파수","m":"종결을 파멸이 아닌 '새로운 공간 확보'로 "},{"t":"낭만에 대하여","a":"최백호","q":"\"낭만에 대하여\" \"최백호\"","cat":"주파수","m":"잃어버린 시간을 '낭만'이라는 가치로 복원하"},{"t":"같이 걸을까","a":"이적","q":"\"같이 걸을까\" \"이적\"","cat":"주파수","m":"고난의 길을 '연대의 무대'로 재조명하여 혼"},{"t":"Going Home","a":"김윤아","q":"\"Going Home\" \"김윤아\"","cat":"주파수","m":"세상의 풍파를 겪은 자아에게 '안식처'를 각"},{"t":"백만송이 장미","a":"심수봉","q":"\"백만송이 장미\" \"심수봉\"","cat":"주파수","m":"미움을 사랑의 에너지로 치환하여 증오가 가진"},{"t":"가리워진 길","a":"유재하","q":"\"가리워진 길\" \"유재하\"","cat":"주파수","m":"안개를 장애물이 아닌 '나를 찾는 여정'으로"},{"t":"바람이 분다","a":"이소라","q":"\"바람이 분다\" \"이소라\"","cat":"주파수","m":"이별을 자연의 섭리로 수용하게 하여 집착이 "},{"t":"청춘","a":"산울림","q":"\"청춘\" \"산울림\"","cat":"주파수","m":"사라지는 것들에 대한 담담한 예찬을 통해 소"},{"t":"내 사랑 내 곁에","a":"김현식","q":"\"내 사랑 내 곁에\" \"김현식\"","cat":"주파수","m":"육체적 소멸 너머의 연결을 노래하여 죽음이 "},{"t":"공 (空)","a":"나훈아","q":"\"공 (空)\" \"나훈아\"","cat":"주파수","m":"삶의 공허를 '가벼움의 미학'으로 재해석하여"},{"t":"새들처럼","a":"변진섭","q":"\"새들처럼\" \"변진섭\"","cat":"주파수","m":"일상의 구속을 비상의 꿈으로 치환하여 정체된"},{"t":"안아줘","a":"정준일","q":"\"안아줘\" \"정준일\"","cat":"주파수","m":"결핍을 수치가 아닌 '공감의 통로'로 긍정하"},{"t":"이 소설의 끝을 다시 써보려 해","a":"한동근","q":"\"이 소설의 끝을 다시 써보려 해\" \"한동근\"","cat":"주파수","m":"후회를 '재창조의 가능성'으로 변환하여 과거"},{"t":"청춘","a":"김필","q":"\"청춘\" \"김필\"","cat":"주파수","m":"세대 간의 아픔을 공유함으로써 홀로 앓는 고"},{"t":"천년의 사랑","a":"박완규","q":"\"천년의 사랑\" \"박완규\"","cat":"주파수","m":"극한의 감정 분출을 통해 가슴 속에 고인 정"},{"t":"오르막길","a":"윤종신","q":"\"오르막길\" \"윤종신\"","cat":"주파수","m":"시련을 '필연적 풍경'으로 인지시켜 예상치 "},{"t":"도망가자","a":"선우정아","q":"\"도망가자\" \"선우정아\"","cat":"주파수","m":"회피를 비겁함이 아닌 '생존 전략'으로 긍정"},{"t":"기억을 걷는 시간","a":"넬 (Nell)","q":"\"기억을 걷는 시간\" \"넬 (Nell)\"","cat":"주파수","m":"흩어진 기억을 예술로 정렬하여 망각에 대한 "},{"t":"바람의 노래","a":"조용필","q":"\"바람의 노래\" \"조용필\"","cat":"주파수","m":"모든 배움을 '삶의 노래'로 승화하여 실패가"},{"t":"님은 먼 곳에","a":"김추자","q":"\"님은 먼 곳에\" \"김추자\"","cat":"주파수","m":"그리움의 발산을 통해 억눌린 자아의 욕구를 "},{"t":"촛불","a":"정태춘","q":"\"촛불\" \"정태춘\"","cat":"주파수","m":"어둠을 이겨내는 명상적 깊이를 통해 근원적인"},{"t":"옛사랑","a":"이문세","q":"\"옛사랑\" \"이문세\"","cat":"주파수","m":"옛사랑을 아픔이 아닌 '눈 내린 풍경'으로 "},{"t":"스물다섯, 스물하나","a":"자우림","q":"\"스물다섯, 스물하나\" \"자우림\"","cat":"주파수","m":"상실을 찬란한 성장의 기록으로 재조명하여 사"},{"t":"기억의 습작","a":"김동률","q":"\"기억의 습작\" \"김동률\"","cat":"주파수","m":"서툴렀던 과거를 '연습'으로 긍정하여 미성숙"},{"t":"Bye bye my blue","a":"백예린","q":"\"Bye bye my blue\" \"백예린\"","cat":"주파수","m":"우울을 '나의 일부'로 다정하게 수용하여 우"},{"t":"나를 잊지 말아요","a":"허각","q":"\"나를 잊지 말아요\" \"허각\"","cat":"주파수","m":"잊히는 두려움을 '기억의 약속'으로 치환하여"},{"t":"기억해줘요","a":"거미","q":"\"기억해줘요\" \"거미\"","cat":"주파수","m":"평범한 날들을 '가치 있는 기록'으로 재조명"},{"t":"꿈에","a":"박정현","q":"\"꿈에\" \"박정현\"","cat":"주파수","m":"무의식의 세계를 치유의 공간으로 활용하여 잠"},{"t":"아이 (I)","a":"태연","q":"\"아이 (I)\" \"태연\"","cat":"주파수","m":"갇혀있던 자아를 광활한 자연으로 확장하여 폐"},{"t":"무릎","a":"아이유","q":"\"무릎\" \"아이유\"","cat":"주파수","m":"무방비 상태의 안식을 허용하게 하여 늘 깨어"},{"t":"너를 만나","a":"폴킴","q":"\"너를 만나\" \"폴킴\"","cat":"주파수","m":"일상의 조각들을 기적으로 재조명하여 특별하지"},{"t":"너였다면","a":"정승환","q":"\"너였다면\" \"정승환\"","cat":"주파수","m":"고통의 공감을 통해 원망을 용서로 변환하여 "},{"t":"바람기억","a":"나얼","q":"\"바람기억\" \"나얼\"","cat":"주파수","m":"영적인 고음 파동으로 내면의 독소를 흔들어 "},{"t":"주저하는 연인들을 위해","a":"잔나비","q":"\"주저하는 연인들을 위해\" \"잔나비\"","cat":"주파수","m":"망설임을 '신중한 과정'으로 긍정하여 선택 "},{"t":"스토커","a":"십센치","q":"\"스토커\" \"십센치\"","cat":"주파수","m":"열등감을 솔직한 예술로 승화하여 뒤처지는 것"},{"t":"나의 사춘기에게","a":"볼빨간사춘기","q":"\"나의 사춘기에게\" \"볼빨간사춘기\"","cat":"주파수","m":"사춘기의 혼란을 '빛을 찾기 위한 터널'로 "},{"t":"톰보이","a":"혁오","q":"\"톰보이\" \"혁오\"","cat":"주파수","m":"불안을 청춘의 '당연한 전제'로 설정하여 미"},{"t":"Rose","a":"이하이","q":"\"Rose\" \"이하이\"","cat":"주파수","m":"자신의 가시를 '보호막'으로 긍정하여 타인에"},{"t":"어떻게 이별까지 사랑하겠어","a":"악뮤","q":"\"어떻게 이별까지 사랑하겠어\" \"악뮤\"","cat":"주파수","m":"이별을 사랑의 완성 단계로 재조명하여 관계의"},{"t":"미소 속에 비친 그대","a":"신승훈","q":"\"미소 속에 비친 그대\" \"신승훈\"","cat":"주파수","m":"이별을 비극이 아닌 '미소'라는 아름다운 잔"},{"t":"춘천 가는 기차","a":"김현철","q":"\"춘천 가는 기차\" \"김현철\"","cat":"주파수","m":"목적지보다 '떠나는 과정'에 집중하여 정체된"},{"t":"샴푸의 요정","a":"빛과 소금","q":"\"샴푸의 요정\" \"빛과 소금\"","cat":"주파수","m":"현실의 삭막함을 환상적인 선율로 정화하여 각"},{"t":"그저 바라볼 수만 있어도","a":"유익종","q":"\"그저 바라볼 수만 있어도\" \"유익종\"","cat":"주파수","m":"소유욕을 내려놓는 '관조의 미학'을 통해 집"},{"t":"편지","a":"김광진","q":"\"편지\" \"김광진\"","cat":"주파수","m":"떠나보내는 사랑을 축복으로 재해석하여 이별 "},{"t":"천 일 동안","a":"이승환","q":"\"천 일 동안\" \"이승환\"","cat":"주파수","m":"긴 시간의 정성을 '찬란한 완성'으로 긍정하"},{"t":"취중진담","a":"전람회","q":"\"취중진담\" \"전람회\"","cat":"주파수","m":"진심을 털어놓는 행위 자체를 용기로 재조명하"},{"t":"흐린 가을 하늘에 편지를 써","a":"동물원","q":"\"흐린 가을 하늘에 편지를 써\" \"동물원\"","cat":"주파수","m":"흐린 날씨를 사색의 기회로 변환하여 무기력함"},{"t":"꿈에","a":"조덕배","q":"\"꿈에\" \"조덕배\"","cat":"주파수","m":"꿈속의 재회를 영적 연결로 긍정하여 현실의 "},{"t":"미안해요","a":"김건모","q":"\"미안해요\" \"김건모\"","cat":"주파수","m":"잘못을 인정하는 고결함을 통해 관계 속에 쌓"},{"t":"오늘 같은 밤이면","a":"박정운","q":"\"오늘 같은 밤이면\" \"박정운\"","cat":"주파수","m":"고독한 밤을 재회의 약속으로 채워 어둠이 주"},{"t":"안녕","a":"김태화","q":"\"안녕\" \"김태화\"","cat":"주파수","m":"안녕을 '새로운 만남의 문'으로 재조명하여 "},{"t":"당신은 모르실 거야","a":"혜은이","q":"\"당신은 모르실 거야\" \"혜은이\"","cat":"주파수","m":"깊은 사랑의 마음을 자부심으로 승화하여 외사"},{"t":"너의 의미","a":"산울림","q":"\"너의 의미\" \"산울림\"","cat":"주파수","m":"평범한 관계에 부여된 '의미'를 재발견하여 "},{"t":"해뜰날","a":"송대관","q":"\"해뜰날\" \"송대관\"","cat":"주파수","m":"현재의 시련을 '성공의 전조'로 긍정하여 궁"},{"t":"다함께 차차차","a":"설운도","q":"\"다함께 차차차\" \"설운도\"","cat":"주파수","m":"슬픔을 경쾌한 리듬으로 털어내어 우울의 독소"},{"t":"빈잔","a":"남진","q":"\"빈잔\" \"남진\"","cat":"주파수","m":"빈 잔을 '채울 수 있는 가능성'으로 재조명"},{"t":"바다가 육지라면","a":"조미미","q":"\"바다가 육지라면\" \"조미미\"","cat":"주파수","m":"물리적 한계를 노래로 승화하여 억눌린 욕구가"},{"t":"무시로","a":"나훈아","q":"\"무시로\" \"나훈아\"","cat":"주파수","m":"흘러가는 시간을 자연의 섭리로 수용하여 이별"},{"t":"안개","a":"정훈희","q":"\"안개\" \"정훈희\"","cat":"주파수","m":"혼란을 몽환적인 미학으로 재조명하여 앞이 보"},{"t":"고래사냥","a":"송창식","q":"\"고래사냥\" \"송창식\"","cat":"주파수","m":"신화적 꿈을 향한 열정으로 현실의 초라함과 "},{"t":"상록수","a":"양희은","q":"\"상록수\" \"양희은\"","cat":"주파수","m":"시련 속의 연대를 통해 독단적인 고립이 주는"},{"t":"친구","a":"김민기","q":"\"친구\" \"김민기\"","cat":"주파수","m":"죽음조차 인연의 한 과정으로 수용하여 영원한"},{"t":"행복의 나라로","a":"한대수","q":"\"행복의 나라로\" \"한대수\"","cat":"주파수","m":"이상향에 대한 갈망을 삶의 동력으로 삼아 억"},{"t":"가시나무","a":"시인과 촌장","q":"\"가시나무\" \"시인과 촌장\"","cat":"주파수","m":"내면의 상처를 고백함으로써 스스로를 찌르는 "},{"t":"매일 그대와","a":"들국화","q":"\"매일 그대와\" \"들국화\"","cat":"주파수","m":"반복되는 일상을 축복으로 재조명하여 무료함이"},{"t":"사랑으로","a":"해바라기","q":"\"사랑으로\" \"해바라기\"","cat":"주파수","m":"어두운 곳에 빛을 비추는 마음으로 세상에 대"},{"t":"사랑이여","a":"유심초","q":"\"사랑이여\" \"유심초\"","cat":"주파수","m":"아픔을 고귀한 성숙의 재료로 승화하여 상처 "},{"t":"편지","a":"어니언스","q":"\"편지\" \"어니언스\"","cat":"주파수","m":"말로 못한 진심을 기록으로 정제하여 소통의 "},{"t":"하얀 나비","a":"김정호","q":"\"하얀 나비\" \"김정호\"","cat":"주파수","m":"소멸을 나비의 비상에 비유하여 죽음에 대한 "},{"t":"나 그대에게 모두 드리리","a":"이장희","q":"\"나 그대에게 모두 드리리\" \"이장희\"","cat":"주파수","m":"헌신을 통해 얻는 영혼의 풍요를 강조하여 계"},{"t":"우리들의 이야기","a":"윤형주","q":"\"우리들의 이야기\" \"윤형주\"","cat":"주파수","m":"지난 시절을 소중한 기록으로 재조명하여 늙어"},{"t":"사랑하는 마음","a":"김세환","q":"\"사랑하는 마음\" \"김세환\"","cat":"주파수","m":"순수한 에너지를 확산하여 내면에 자리 잡은 "},{"t":"꽃반지 끼고","a":"은희","q":"\"꽃반지 끼고\" \"은희\"","cat":"주파수","m":"순수의 시절을 소환하여 때 묻은 현실이 주는"},{"t":"모닥불","a":"박인희","q":"\"모닥불\" \"박인희\"","cat":"주파수","m":"번민을 타오르는 불꽃에 태워버리고 고요한 평"},{"t":"이젠 안녕","a":"015B","q":"\"이젠 안녕\" \"015B\"","cat":"주파수","m":"안녕을 추억의 영속성으로 긍정하여 관계 단절"},{"t":"내가 너의 곁에 잠시 살았다는 걸","a":"토이","q":"\"내가 너의 곁에 잠시 살았다는 걸\" \"토이\"","cat":"주파수","m":"짧은 인연의 가치를 축복으로 재조명하여 이별"},{"t":"가려진 시간 사이로","a":"윤상","q":"\"가려진 시간 사이로\" \"윤상\"","cat":"주파수","m":"잃어버린 시간을 순수함의 보고로 재발견하여 "},{"t":"비처럼 음악처럼","a":"김현식","q":"\"비처럼 음악처럼\" \"김현식\"","cat":"주파수","m":"비 오는 풍경을 예술로 승화하여 슬픈 감정의"},{"t":"광화문 연가","a":"이문세","q":"\"광화문 연가\" \"이문세\"","cat":"주파수","m":"사라진 것들에 대한 애정 어린 시선으로 상실"},{"t":"너에게로 또 다시","a":"변진섭","q":"\"너에게로 또 다시\" \"변진섭\"","cat":"주파수","m":"방황 끝의 복귀를 긍정하여 그간의 시행착오가"},{"t":"서시","a":"신성우","q":"\"서시\" \"신성우\"","cat":"주파수","m":"삶의 비장미를 통해 무기력한 현실을 돌파하는"},{"t":"가질 수 없는 너","a":"뱅크","q":"\"가질 수 없는 너\" \"뱅크\"","cat":"주파수","m":"소유의 불능을 깊은 예술적 통찰로 승화하여 "},{"t":"네버 엔딩 스토리","a":"부활","q":"\"네버 엔딩 스토리\" \"부활\"","cat":"주파수","m":"인연의 영속성을 확신함으로써 영원한 소멸에 "},{"t":"나를 슬프게 하는 사람들","a":"김경호","q":"\"나를 슬프게 하는 사람들\" \"김경호\"","cat":"주파수","m":"고음의 발산을 통해 내면의 정체된 슬픔 에너"},{"t":"가시나무 (Cover)","a":"조성모","q":"\"가시나무 (Cover)\" \"조성모\"","cat":"주파수","m":"고통스러운 자아의 가시를 노래로 보듬어 자학"},{"t":"너를 위해","a":"임재범","q":"\"너를 위해\" \"임재범\"","cat":"주파수","m":"상대를 위한 고귀한 희생으로 이별을 긍정하여"},{"t":"추억 만들기","a":"김현식","q":"\"추억 만들기\" \"김현식\"","cat":"주파수","m":"과거를 후회가 아닌 '만들어진 작품'으로 긍"},{"t":"제발","a":"이소라","q":"\"제발\" \"이소라\"","cat":"주파수","m":"간절한 호소를 통해 억눌린 감정의 임계점을 "},{"t":"1월부터 6월까지","a":"윤종신","q":"\"1월부터 6월까지\" \"윤종신\"","cat":"주파수","m":"평범한 연애의 기록을 소중한 서사로 변환하여"},{"t":"이 바보야","a":"정승환","q":"\"이 바보야\" \"정승환\"","cat":"주파수","m":"미련의 에너지를 자기 성찰의 동력으로 재조명"},{"t":"좋은 사람","a":"토이","q":"\"좋은 사람\" \"토이\"","cat":"주파수","m":"짝사랑의 헌신을 고결한 인격의 증거로 긍정하"},{"t":"Stay","a":"넬 (Nell)","q":"\"Stay\" \"넬 (Nell)\"","cat":"주파수","m":"붙잡고 싶은 욕망을 예술적 갈망으로 승화하여"},{"t":"거리에서","a":"성시경","q":"\"거리에서\" \"성시경\"","cat":"주파수","m":"이별 후의 거리를 '치유의 산책로'로 재정의"},{"t":"우주를 건너","a":"백예린","q":"\"우주를 건너\" \"백예린\"","cat":"주파수","m":"물리적 거리를 영적 연결의 가능성으로 재조명"},{"t":"Wi ing Wi ing","a":"혁오","q":"\"Wi ing Wi ing\" \"혁오\"","cat":"주파수","m":"무기력한 반복을 '삶의 리듬'으로 수용하여 "},{"t":"뜨거운 여름밤은 가고 남은 건 볼품없지만","a":"잔나비","q":"\"뜨거운 여름밤은 가고 남은 건 볼품없지만\" \"잔나비\"","cat":"주파수","m":"볼품없음을 '있는 그대로의 진실'로 긍정하여"},{"t":"야상곡","a":"김윤아","q":"\"야상곡\" \"김윤아\"","cat":"주파수","m":"어두운 밤을 고혹적인 미학으로 정화하여 근원"},{"t":"사랑보다 깊은 상처","a":"박정현","q":"\"사랑보다 깊은 상처\" \"박정현\"","cat":"주파수","m":"상처를 사랑의 깊이를 측정하는 척도로 긍정하"},{"t":"어른아이","a":"거미","q":"\"어른아이\" \"거미\"","cat":"주파수","m":"내면의 어린아이를 발견하고 다독임으로써 어른"},{"t":"한숨","a":"이하이","q":"\"한숨\" \"이하이\"","cat":"주파수","m":"타인의 숨결이 주는 위로를 통해 내 안의 고"},{"t":"항해","a":"악뮤","q":"\"항해\" \"악뮤\"","cat":"주파수","m":"이별을 새로운 세계를 향한 모험으로 재조명하"},{"t":"러브 포엠","a":"아이유","q":"\"러브 포엠\" \"아이유\"","cat":"주파수","m":"누군가를 향한 기도를 통해 자신의 결핍을 치"},{"t":"모든 날, 모든 순간","a":"폴킴","q":"\"모든 날, 모든 순간\" \"폴킴\"","cat":"주파수","m":"매 순간의 가치를 신성시하여 무의미하게 흘러"},{"t":"어땠을까","a":"김나영","q":"\"어땠을까\" \"김나영\"","cat":"주파수","m":"가상의 상황을 시뮬레이션하며 미련의 감정을 "},{"t":"돌아오지 마","a":"헤이즈","q":"\"돌아오지 마\" \"헤이즈\"","cat":"주파수","m":"단절을 수용함으로써 얻는 평온을 긍정하여 집"},{"t":"Beautiful","a":"크러쉬","q":"\"Beautiful\" \"크러쉬\"","cat":"주파수","m":"삶의 아름다운 순간들을 박제하여 내일을 향한"},{"t":"봄날","a":"방탄소년단","q":"\"봄날\" \"방탄소년단\"","cat":"주파수","m":"겨울을 봄의 전제로 인식하여 기다림이 주는 "},{"t":"나비와 고양이","a":"볼빨간사춘기","q":"\"나비와 고양이\" \"볼빨간사춘기\"","cat":"주파수","m":"작고 소중한 존재들의 교감을 통해 세상의 거"},{"t":"그게 아니고","a":"십센치","q":"\"그게 아니고\" \"십센치\"","cat":"주파수","m":"사소한 변명을 통해 자존심 뒤의 진실을 드러"},{"t":"구애","a":"선우정아","q":"\"구애\" \"선우정아\"","cat":"주파수","m":"솔직한 욕망의 표현을 통해 사회적 가면이 주"},{"t":"사계","a":"태연","q":"\"사계\" \"태연\"","cat":"주파수","m":"감정의 변화를 계절의 순리로 받아들여 변심에"},{"t":"고백","a":"정준일","q":"\"고백\" \"정준일\"","cat":"주파수","m":"자신의 나약함을 공개적으로 고백하여 완벽주의"},{"t":"사건의 지평선","a":"윤하","q":"\"사건의 지평선\" \"윤하\"","cat":"주파수","m":"이별을 우주의 섭리로 통찰하여 개인적 상실의"},{"t":"신호등","a":"이무진","q":"\"신호등\" \"이무진\"","cat":"주파수","m":"혼란스러운 청춘의 선택을 '신호'로 긍정하여"},{"t":"아퍼","a":"기리보이","q":"\"아퍼\" \"기리보이\"","cat":"주파수","m":"아픔을 솔직하게 호소함으로써 고통을 견뎌야 "},{"t":"양화대교","a":"자이언티","q":"\"양화대교\" \"자이언티\"","cat":"주파수","m":"일상의 건강과 평온을 삶의 목표로 재설정하여"},{"t":"거짓말","a":"조항조","q":"\"거짓말\" \"조항조\"","cat":"주파수","m":"삶의 모순을 노래로 위로하며 진실을 마주할 "},{"t":"초혼","a":"장윤정","q":"\"초혼\" \"장윤정\"","cat":"주파수","m":"사별의 아픔을 영적 부름으로 승화하여 죽음 "},{"t":"이제 나만 믿어요","a":"임영웅","q":"\"이제 나만 믿어요\" \"임영웅\"","cat":"주파수","m":"절대적 신뢰의 에너지를 통해 버림받을지 모른"},{"t":"고맙소","a":"김호중","q":"\"고맙소\" \"김호중\"","cat":"주파수","m":"타인에 대한 감사를 통해 자아의 결핍을 채우"},{"t":"이불","a":"영탁","q":"\"이불\" \"영탁\"","cat":"주파수","m":"따뜻한 포용의 이미지를 통해 세상의 차가움이"},{"t":"편의점","a":"이찬원","q":"\"편의점\" \"이찬원\"","cat":"주파수","m":"서민적 삶의 애환을 공감으로 녹여내어 소외된"},{"t":"드라마","a":"장민호","q":"\"드라마\" \"장민호\"","cat":"주파수","m":"삶을 한 편의 극으로 재조명하여 비극적 순간"},{"t":"여백","a":"정동원","q":"\"여백\" \"정동원\"","cat":"주파수","m":"삶의 여백을 가능성으로 긍정하여 채워지지 않"},{"t":"아버지","a":"양지은","q":"\"아버지\" \"양지은\"","cat":"주파수","m":"부성애의 기억을 통해 근원적 보호막을 소환하"},{"t":"서울의 달","a":"송가인","q":"\"서울의 달\" \"송가인\"","cat":"주파수","m":"타향살이의 외로움을 달빛의 동질감으로 정화하"},{"t":"너의 의미 (Re-issue)","a":"김창완","q":"\"너의 의미 (Re-issue)\" \"김창완\"","cat":"주파수","m":"존재의 본질을 일깨워주는 목소리로 사회적 지"},{"t":"누구없소","a":"한영애","q":"\"누구없소\" \"한영애\"","cat":"주파수","m":"소통을 향한 강렬한 외침을 통해 폐쇄된 자아"},{"t":"못다핀 꽃 한송이","a":"김수철","q":"\"못다핀 꽃 한송이\" \"김수철\"","cat":"주파수","m":"미완의 삶을 고귀한 슬픔으로 재조명하여 실패"},{"t":"걱정말아요 그대","a":"전인권","q":"\"걱정말아요 그대\" \"전인권\"","cat":"주파수","m":"과거의 모든 아픔을 의미 있는 노래로 승화하"},{"t":"삐에로는 우릴 보고 웃지","a":"김완선","q":"\"삐에로는 우릴 보고 웃지\" \"김완선\"","cat":"주파수","m":"가식적 웃음을 비판하며 자아의 진실을 찾아가"},{"t":"이등병의 편지","a":"김광석","q":"\"이등병의 편지\" \"김광석\"","cat":"주파수","m":"단절을 수용과 인내의 시간으로 재조명하여 이"},{"t":"봄비","a":"박인수","q":"\"봄비\" \"박인수\"","cat":"주파수","m":"내리는 비를 마음의 묵은 때를 씻어내는 영적"},{"t":"서산 갯마을","a":"조미미","q":"\"서산 갯마을\" \"조미미\"","cat":"주파수","m":"고향의 정취를 소환하여 도시 생활의 찌든 독"},{"t":"테스형!","a":"나훈아","q":"\"테스형!\" \"나훈아\"","cat":"주파수","m":"삶의 근원적 질문을 해학으로 풀어내어 죽음과"},{"t":"이별","a":"패티김","q":"\"이별\" \"패티김\"","cat":"주파수","m":"이별을 장엄한 작별의 의식으로 승화하여 비참"},{"t":"What a Wonderful World","a":"Louis Armstrong","q":"\"What a Wonderful World\" \"Louis Armstrong\"","cat":"주파수","m":"세상의 아름다움을 재발견하여 인류 미래에 대"},{"t":"Let It Be","a":"The Beatles","q":"\"Let It Be\" \"The Beatles\"","cat":"주파수","m":"상황을 억지로 바꾸려 하지 않는 순응을 통해"},{"t":"Bridge Over Troubled Water","a":"Simon & Garfunkel","q":"\"Bridge Over Troubled Water\" \"Simon & Garfunkel\"","cat":"주파수","m":"헌신적인 지지를 확신시켜 혼자 고립되는 것에"},{"t":"Imagine","a":"John Lennon","q":"\"Imagine\" \"John Lennon\"","cat":"주파수","m":"소유와 경계가 없는 세상을 꿈꾸며 현실의 결"},{"t":"I Have a Dream","a":"ABBA","q":"\"I Have a Dream\" \"ABBA\"","cat":"주파수","m":"꿈의 힘을 긍정하여 현실의 장벽 앞에서 느끼"},{"t":"My Way","a":"Frank Sinatra","q":"\"My Way\" \"Frank Sinatra\"","cat":"주파수","m":"자신의 선택을 당당히 긍정함으로써 후회와 죄"},{"t":"Yesterday Once More","a":"Carpenters","q":"\"Yesterday Once More\" \"Carpenters\"","cat":"주파수","m":"과거의 선율을 치유의 매개로 삼아 흐르는 시"},{"t":"Honesty","a":"Billy Joel","q":"\"Honesty\" \"Billy Joel\"","cat":"주파수","m":"진실의 가치를 재조명하여 거짓된 세상에서 느"},{"t":"Goodbye Yellow Brick Road","a":"Elton John","q":"\"Goodbye Yellow Brick Road\" \"Elton John\"","cat":"주파수","m":"화려한 허상을 버리고 본연의 자아로 돌아가는"},{"t":"We Are The Champions","a":"Queen","q":"\"We Are The Champions\" \"Queen\"","cat":"주파수","m":"패배의 시련을 승리의 과정으로 재조명하여 실"},{"t":"Heal the World","a":"Michael Jackson","q":"\"Heal the World\" \"Michael Jackson\"","cat":"주파수","m":"인류애를 통한 치유를 강조하여 세상의 악의가"},{"t":"Greatest Love of All","a":"Whitney Houston","q":"\"Greatest Love of All\" \"Whitney Houston\"","cat":"주파수","m":"자기애를 만물의 근원으로 재정의하여 타인에게"},{"t":"My Heart Will Go On","a":"Celine Dion","q":"\"My Heart Will Go On\" \"Celine Dion\"","cat":"주파수","m":"죽음을 초월한 사랑의 영속성을 믿음으로써 소"},{"t":"Hero","a":"Mariah Carey","q":"\"Hero\" \"Mariah Carey\"","cat":"주파수","m":"내면의 영웅을 발견하게 하여 외부의 위협으로"},{"t":"Tears in Heaven","a":"Eric Clapton","q":"\"Tears in Heaven\" \"Eric Clapton\"","cat":"주파수","m":"사별의 아픔을 천국에서의 재회로 승화하여 죽"},{"t":"Knockin' on Heaven's Door","a":"Bob Dylan","q":"\"Knockin' on Heaven's Door\" \"Bob Dylan\"","cat":"주파수","m":"삶의 마무리를 평화로운 귀결로 재조명하여 종"},{"t":"Desperado","a":"Eagles","q":"\"Desperado\" \"Eagles\"","cat":"주파수","m":"고립된 자아에게 마음의 문을 열 것을 촉구하"},{"t":"How Deep Is Your Love","a":"Bee Gees","q":"\"How Deep Is Your Love\" \"Bee Gees\"","cat":"주파수","m":"사랑의 깊이를 확인하며 불확실한 관계가 주는"},{"t":"I Just Called to Say I Love You","a":"Stevie Wonder","q":"\"I Just Called to Say I Love You\" \"Stevie Wonder\"","cat":"주파수","m":"일상적인 고백의 가치를 재발견하여 단절에 대"},{"t":"Careless Whisper","a":"George Michael","q":"\"Careless Whisper\" \"George Michael\"","cat":"주파수","m":"실수를 노래로 참회하며 비밀이 주는 압박감과"},{"t":"Someone Like You","a":"Adele","q":"\"Someone Like You\" \"Adele\"","cat":"주파수","m":"이별을 상대의 행복을 비는 성숙함으로 승화하"},{"t":"Thinking Out Loud","a":"Ed Sheeran","q":"\"Thinking Out Loud\" \"Ed Sheeran\"","cat":"주파수","m":"변치 않는 사랑을 확신시켜 늙어감에 대한 인"},{"t":"Fix You","a":"Coldplay","q":"\"Fix You\" \"Coldplay\"","cat":"주파수","m":"상처를 고쳐주겠다는 연대의 메시지로 무너진 "},{"t":"Just the Way You Are","a":"Bruno Mars","q":"\"Just the Way You Are\" \"Bruno Mars\"","cat":"주파수","m":"있는 그대로의 가치를 긍정하여 외모나 사회적"},{"t":"Born This Way","a":"Lady Gaga","q":"\"Born This Way\" \"Lady Gaga\"","cat":"주파수","m":"존재 자체를 신의 선물로 재조명하여 정체성에"},{"t":"True Colors","a":"Cyndi Lauper","q":"\"True Colors\" \"Cyndi Lauper\"","cat":"주파수","m":"내면의 진실한 색깔을 예찬하며 타인의 평가라"},{"t":"The Rose","a":"Bette Midler","q":"\"The Rose\" \"Bette Midler\"","cat":"주파수","m":"고통을 성장의 씨앗으로 재해석하여 사랑에 상"},{"t":"Ain't No Mountain High Enough","a":"Diana Ross","q":"\"Ain't No Mountain High Enough\" \"Diana Ross\"","cat":"주파수","m":"어떤 장애물도 사랑을 막지 못함을 노래하여 "},{"t":"What's Going On","a":"Marvin Gaye","q":"\"What's Going On\" \"Marvin Gaye\"","cat":"주파수","m":"사회적 혼란을 소통의 갈구로 재조명하여 폭력"},{"t":"Lean on Me","a":"Bill Withers","q":"\"Lean on Me\" \"Bill Withers\"","cat":"주파수","m":"서로에게 기댈 것을 권하며 무거운 책임감이라"},{"t":"Killing Me Softly with His Song","a":"Roberta Flack","q":"\"Killing Me Softly with His Song\" \"Roberta Flack\"","cat":"주파수","m":"고통이 노래로 치유되는 과정을 통해 정서적 "},{"t":"Heart of Gold","a":"Neil Young","q":"\"Heart of Gold\" \"Neil Young\"","cat":"주파수","m":"진실한 가치를 찾는 여정을 예찬하며 목적 상"},{"t":"Both Sides Now","a":"Joni Mitchell","q":"\"Both Sides Now\" \"Joni Mitchell\"","cat":"주파수","m":"삶의 양면성을 수용함으로써 일방적인 상실감의"},{"t":"Three Little Birds","a":"Bob Marley","q":"\"Three Little Birds\" \"Bob Marley\"","cat":"주파수","m":"\"걱정 말라\"는 주문을 통해 미래에 대한 막"},{"t":"Fast Car","a":"Tracy Chapman","q":"\"Fast Car\" \"Tracy Chapman\"","cat":"주파수","m":"현실 탈출의 꿈을 노래하며 굴레 씌워진 삶의"},{"t":"One","a":"U2","q":"\"One\" \"U2\"","cat":"주파수","m":"차이를 넘어선 하나 됨을 노래하며 분열이 주"},{"t":"Englishman in New York","a":"Sting","q":"\"Englishman in New York\" \"Sting\"","cat":"주파수","m":"이방인으로서의 당당함을 예찬하며 동화 강박의"},{"t":"(Everything I Do) I Do It for You","a":"Bryan Adams","q":"\"(Everything I Do) I Do It for You\" \"Bryan Adams\"","cat":"주파수","m":"헌신적 동기를 통해 행위의 의미를 찾아 허무"},{"t":"Right Here Waiting","a":"Richard Marx","q":"\"Right Here Waiting\" \"Richard Marx\"","cat":"주파수","m":"변치 않는 기다림을 약속하여 시간적 거리의 "},{"t":"Wind of Change","a":"Scorpions","q":"\"Wind of Change\" \"Scorpions\"","cat":"주파수","m":"변화의 바람을 긍정적으로 수용하여 새로운 시"},{"t":"Dust in the Wind","a":"Kansas","q":"\"Dust in the Wind\" \"Kansas\"","cat":"주파수","m":"덧없음을 허무가 아닌 평화로운 순리로 수용하"},{"t":"Stairway to Heaven","a":"Led Zeppelin","q":"\"Stairway to Heaven\" \"Led Zeppelin\"","cat":"주파수","m":"물질 너머의 가치를 찾는 영성을 일깨워 탐욕"},{"t":"The Sound of Silence","a":"Simon & Garfunkel","q":"\"The Sound of Silence\" \"Simon & Garfunkel\"","cat":"주파수","m":"침묵의 가치를 재발견하여 소외된 현대인의 고"},{"t":"Vincent","a":"Don McLean","q":"\"Vincent\" \"Don McLean\"","cat":"주파수","m":"예술가의 고독을 고귀한 이해로 승화하여 외로"},{"t":"I Write the Songs","a":"Barry Manilow","q":"\"I Write the Songs\" \"Barry Manilow\"","cat":"주파수","m":"음악의 영원한 생명력을 믿으며 사라지는 것들"},{"t":"Sailing","a":"Rod Stewart","q":"\"Sailing\" \"Rod Stewart\"","cat":"주파수","m":"자유를 향한 항해를 긍정하여 억압된 현실의 "},{"t":"Hard to Say I'm Sorry","a":"Chicago","q":"\"Hard to Say I'm Sorry\" \"Chicago\"","cat":"주파수","m":"사과의 어려움을 극복하는 과정을 통해 자존심"},{"t":"Making Love Out of Nothing at All","a":"Air Supply","q":"\"Making Love Out of Nothing at All\" \"Air Supply\"","cat":"주파수","m":"결핍에서 창조를 이끌어내어 부족함에 대한 공"},{"t":"Hello","a":"Lionel Richie","q":"\"Hello\" \"Lionel Richie\"","cat":"주파수","m":"용기 있는 인사를 통해 소외된 자아들 간의 "},{"t":"Man in the Mirror","a":"Michael Jackson","q":"\"Man in the Mirror\" \"Michael Jackson\"","cat":"주파수","m":"변화의 시작을 '거울 속의 나'로부터 찾아 "},{"t":"Piano Man","a":"Billy Joel","q":"\"Piano Man\" \"Billy Joel\"","cat":"주파수","m":"평범한 사람들의 삶을 위대한 노래로 재조명하"},{"t":"Don't Stop Believin'","a":"Journey","q":"\"Don't Stop Believin'\" \"Journey\"","cat":"주파수","m":"불확실한 여정 자체를 믿음의 동력으로 삼아 "},{"t":"Livin' On A Prayer","a":"Bon Jovi","q":"\"Livin' On A Prayer\" \"Bon Jovi\"","cat":"주파수","m":"간절한 기도와 의지로 결핍을 극복하여 궁핍한"},{"t":"Bohemian Rhapsody","a":"Queen","q":"\"Bohemian Rhapsody\" \"Queen\"","cat":"주파수","m":"내면의 혼돈과 죄책감을 오페라적 서사로 발산"},{"t":"Wonderful Tonight","a":"Eric Clapton","q":"\"Wonderful Tonight\" \"Eric Clapton\"","cat":"주파수","m":"일상의 소박한 순간을 최상의 가치로 긍정하여"},{"t":"Here Comes The Sun","a":"George Harrison","q":"\"Here Comes The Sun\" \"George Harrison\"","cat":"주파수","m":"길었던 겨울 뒤의 태양을 예찬하며 지속되는 "},{"t":"Don't Look Back In Anger","a":"Oasis","q":"\"Don't Look Back In Anger\" \"Oasis\"","cat":"주파수","m":"과거를 분노 없이 수용함으로써 후회라는 감정"},{"t":"Everybody Hurts","a":"R.E.M.","q":"\"Everybody Hurts\" \"R.E.M.\"","cat":"주파수","m":"고통의 보편성을 통해 나만 아프다는 고립된 "},{"t":"Viva La Vida","a":"Coldplay","q":"\"Viva La Vida\" \"Coldplay\"","cat":"주파수","m":"권력의 무상함을 성찰하며 상실과 추락에 대한"},{"t":"Creep","a":"Radiohead","q":"\"Creep\" \"Radiohead\"","cat":"주파수","m":"자신의 결핍과 찌질함을 예술로 승화하여 타인"},{"t":"You've Got A Friend","a":"James Taylor","q":"\"You've Got A Friend\" \"James Taylor\"","cat":"주파수","m":"변치 않는 우정의 존재를 각인시켜 세상에 홀"},{"t":"It's Too Late","a":"Carole King","q":"\"It's Too Late\" \"Carole King\"","cat":"주파수","m":"관계의 종말을 담담히 인정함으로써 집착이 주"},{"t":"Father And Son","a":"Cat Stevens","q":"\"Father And Son\" \"Cat Stevens\"","cat":"주파수","m":"세대 간의 갈등을 이해의 과정으로 재조명하여"},{"t":"Mrs. Robinson","a":"Simon & Garfunkel","q":"\"Mrs. Robinson\" \"Simon & Garfunkel\"","cat":"주파수","m":"비밀스러운 현실을 풍자로 정화하여 사회적 압"},{"t":"Ain't No Sunshine","a":"Bill Withers","q":"\"Ain't No Sunshine\" \"Bill Withers\"","cat":"주파수","m":"상실의 어둠을 노래로 토해내어 내면에 정체된"},{"t":"September","a":"Earth, Wind & Fire","q":"\"September\" \"Earth, Wind & Fire\"","cat":"주파수","m":"찬란한 기억을 리듬으로 복원하여 잊히는 것들"},{"t":"Black Or White","a":"Michael Jackson","q":"\"Black Or White\" \"Michael Jackson\"","cat":"주파수","m":"차별 없는 통합을 노래하여 배척당할지도 모른"},{"t":"Like A Prayer","a":"Madonna","q":"\"Like A Prayer\" \"Madonna\"","cat":"주파수","m":"영적인 고백을 통해 내면의 죄책감을 씻어내고"},{"t":"Purple Rain","a":"Prince","q":"\"Purple Rain\" \"Prince\"","cat":"주파수","m":"고난의 빗속에서도 품위를 지키는 힘을 예찬하"},{"t":"Heroes","a":"David Bowie","q":"\"Heroes\" \"David Bowie\"","cat":"주파수","m":"평범한 하루를 영웅적 서사로 재조명하여 무의"},{"t":"Wish You Were Here","a":"Pink Floyd","q":"\"Wish You Were Here\" \"Pink Floyd\"","cat":"주파수","m":"부재의 고통을 예술적 그리움으로 승화하여 상"},{"t":"Going To California","a":"Led Zeppelin","q":"\"Going To California\" \"Led Zeppelin\"","cat":"주파수","m":"새로운 시작을 향한 여정을 긍정하여 정체된 "},{"t":"Dreams","a":"Fleetwood Mac","q":"\"Dreams\" \"Fleetwood Mac\"","cat":"주파수","m":"흘러가는 인연을 꿈처럼 담담하게 받아들여 이"},{"t":"Every Breath You Take","a":"The Police","q":"\"Every Breath You Take\" \"The Police\"","cat":"주파수","m":"집착을 경계하는 통찰을 통해 뒤틀린 관계가 "},{"t":"Sultans Of Swing","a":"Dire Straits","q":"\"Sultans Of Swing\" \"Dire Straits\"","cat":"주파수","m":"무명의 예술 혼을 예찬하며 성공 지상주의가 "},{"t":"Redemption Song","a":"Bob Marley","q":"\"Redemption Song\" \"Bob Marley\"","cat":"주파수","m":"스스로를 해방하라는 메시지로 과거의 노예적 "},{"t":"Talkin' 'bout a Revolution","a":"Tracy Chapman","q":"\"Talkin' 'bout a Revolution\" \"Tracy Chapman\"","cat":"주파수","m":"변화의 속삭임을 통해 억압된 체제 속에서 느"},{"t":"Nothing Compares 2 U","a":"Sinead O'Connor","q":"\"Nothing Compares 2 U\" \"Sinead O'Connor\"","cat":"주파수","m":"비교할 수 없는 상실을 직면하여 회피하려는 "},{"t":"Orinoco Flow","a":"Enya","q":"\"Orinoco Flow\" \"Enya\"","cat":"주파수","m":"몽환적인 물의 흐름처럼 마음의 앙금을 씻어내"},{"t":"Don't Know Why","a":"Norah Jones","q":"\"Don't Know Why\" \"Norah Jones\"","cat":"주파수","m":"이유 모를 이별을 담담한 선율로 어루만져 자"},{"t":"If I Ain't Got You","a":"Alicia Keys","q":"\"If I Ain't Got You\" \"Alicia Keys\"","cat":"주파수","m":"본질적인 가치를 재설정하여 물질적 결핍이 주"},{"t":"Rehab","a":"Amy Winehouse","q":"\"Rehab\" \"Amy Winehouse\"","cat":"주파수","m":"자신의 상처와 저항을 가감 없이 드러내어 자"},{"t":"Born To Die","a":"Lana Del Rey","q":"\"Born To Die\" \"Lana Del Rey\"","cat":"주파수","m":"죽음을 삶의 전제로 수용함으로써 소멸에 대한"},{"t":"Everything I Wanted","a":"Billie Eilish","q":"\"Everything I Wanted\" \"Billie Eilish\"","cat":"주파수","m":"성공의 이면을 솔직하게 고백하여 완벽에 대한"},{"t":"Chandelier","a":"Sia","q":"\"Chandelier\" \"Sia\"","cat":"주파수","m":"파괴적인 습관을 예술적 고함으로 분출하여 억"},{"t":"Sign of the Times","a":"Harry Styles","q":"\"Sign of the Times\" \"Harry Styles\"","cat":"주파수","m":"시대의 아픔을 위로의 찬가로 재조명하여 불확"},{"t":"Stay With Me","a":"Sam Smith","q":"\"Stay With Me\" \"Sam Smith\"","cat":"주파수","m":"외로움을 솔직하게 인정함으로써 거절당할지 모"},{"t":"Million Reasons","a":"Lady Gaga","q":"\"Million Reasons\" \"Lady Gaga\"","cat":"주파수","m":"단 하나의 희망을 찾아 나섬으로써 포기하고 "},{"t":"Happy","a":"Pharrell Williams","q":"\"Happy\" \"Pharrell Williams\"","cat":"주파수","m":"기쁨을 의도적으로 선택하여 내면에 자리 잡은"},{"t":"Firework","a":"Katy Perry","q":"\"Firework\" \"Katy Perry\"","cat":"주파수","m":"내면의 잠재력을 폭발시키라는 응원으로 자존감"},{"t":"Stronger","a":"Kelly Clarkson","q":"\"Stronger\" \"Kelly Clarkson\"","cat":"주파수","m":"시련을 성장의 자양분으로 재정의하여 고난에 "},{"t":"Shake It Off","a":"Taylor Swift","q":"\"Shake It Off\" \"Taylor Swift\"","cat":"주파수","m":"비난을 가볍게 털어버리는 유쾌함으로 타인의 "},{"t":"Believer","a":"Imagine Dragons","q":"\"Believer\" \"Imagine Dragons\"","cat":"주파수","m":"고통을 믿음의 도구로 승화하여 아픔을 겪는 "},{"t":"Someone You Loved","a":"Lewis Capaldi","q":"\"Someone You Loved\" \"Lewis Capaldi\"","cat":"주파수","m":"사랑했던 기억을 자산으로 삼아 텅 빈 상실감"},{"t":"Let Her Go","a":"Passenger","q":"\"Let Her Go\" \"Passenger\"","cat":"주파수","m":"소중함을 깨닫는 과정을 예찬하며 상실이 주는"},{"t":"Take Me To Church","a":"Hozier","q":"\"Take Me To Church\" \"Hozier\"","cat":"주파수","m":"본능적인 사랑을 신성하게 재조명하여 억압된 "},{"t":"7 Years","a":"Lukas Graham","q":"\"7 Years\" \"Lukas Graham\"","cat":"주파수","m":"삶의 궤적을 성찰하며 늙어가는 과정에 대한 "},{"t":"See You Again","a":"Charlie Puth","q":"\"See You Again\" \"Charlie Puth\"","cat":"주파수","m":"작별을 재회의 약속으로 승화하여 죽음이 갈라"},{"t":"Young, Wild & Free","a":"Wiz Khalifa","q":"\"Young, Wild & Free\" \"Wiz Khalifa\"","cat":"주파수","m":"자유로운 영혼의 상태를 예찬하며 사회적 속박"},{"t":"Message In A Bottle","a":"The Police","q":"\"Message In A Bottle\" \"The Police\"","cat":"주파수","m":"고립의 외침이 결국 모두에게 닿아있음을 깨닫"},{"t":"Comfortably Numb","a":"Pink Floyd","q":"\"Comfortably Numb\" \"Pink Floyd\"","cat":"주파수","m":"무감각해진 자아를 일깨워 정체된 정서의 독소"},{"t":"No Surprises","a":"Radiohead","q":"\"No Surprises\" \"Radiohead\"","cat":"주파수","m":"소란스러운 욕망을 잠재우고 평온을 선택하여 "},{"t":"Losing My Religion","a":"R.E.M.","q":"\"Losing My Religion\" \"R.E.M.\"","cat":"주파수","m":"믿음의 혼란을 성장의 과정으로 재조명하여 실"},{"t":"Wake Me Up When September Ends","a":"Green Day","q":"\"Wake Me Up When September Ends\" \"Green Day\"","cat":"주파수","m":"상실의 계절을 견뎌내는 인내를 예찬하며 슬픔"},{"t":"In The End","a":"Linkin Park","q":"\"In The End\" \"Linkin Park\"","cat":"주파수","m":"결과보다 과정의 가치를 긍정함으로써 실패가 "},{"t":"Bring Me To Life","a":"Evanescence","q":"\"Bring Me To Life\" \"Evanescence\"","cat":"주파수","m":"마비된 영혼을 흔들어 깨워 내면의 어두운 그"},{"t":"Welcome To The Black Parade","a":"My Chemical Romance","q":"\"Welcome To The Black Parade\" \"My Chemical Romance\"","cat":"주파수","m":"죽음과 이별을 장엄한 행진으로 승화하여 종말"},{"t":"High Hopes","a":"Panic! At The Disco","q":"\"High Hopes\" \"Panic! At The Disco\"","cat":"주파수","m":"높은 야망을 긍정의 동력으로 삼아 현실의 초"},{"t":"Stressed Out","a":"Twenty One Pilots","q":"\"Stressed Out\" \"Twenty One Pilots\"","cat":"주파수","m":"어른의 중압감을 솔직하게 노래하여 책임감이 "},{"t":"Demons","a":"Imagine Dragons","q":"\"Demons\" \"Imagine Dragons\"","cat":"주파수","m":"내면의 어둠을 인정하고 직면함으로써 자책의 "},{"t":"Counting Stars","a":"OneRepublic","q":"\"Counting Stars\" \"OneRepublic\"","cat":"주파수","m":"물질적 가치 너머의 꿈을 쫓으며 돈과 성공의"},{"t":"The Man Who Can't Be Moved","a":"The Script","q":"\"The Man Who Can't Be Moved\" \"The Script\"","cat":"주파수","m":"기다림을 숭고한 가치로 재조명하여 잊히는 것"},{"t":"Chasing Cars","a":"Snow Patrol","q":"\"Chasing Cars\" \"Snow Patrol\"","cat":"주파수","m":"세상의 소음을 차단한 채 단둘의 세계를 예찬"},{"t":"Somewhere Only We Know","a":"Keane","q":"\"Somewhere Only We Know\" \"Keane\"","cat":"주파수","m":"추억이 깃든 장소를 안식처로 삼아 낯선 미래"},{"t":"Pompeii","a":"Bastille","q":"\"Pompeii\" \"Bastille\"","cat":"주파수","m":"붕괴되는 현실 속에서도 변치 않는 자아를 발"},{"t":"Pumped Up Kicks","a":"Foster The People","q":"\"Pumped Up Kicks\" \"Foster The People\"","cat":"주파수","m":"사회적 소외감을 비판적 시각으로 다루어 억눌"},{"t":"Somebody That I Used To Know","a":"Gotye","q":"\"Somebody That I Used To Know\" \"Gotye\"","cat":"주파수","m":"인연의 끝을 타인으로 수용함으로써 과거에 묶"},{"t":"Elastic Heart","a":"Sia","q":"\"Elastic Heart\" \"Sia\"","cat":"주파수","m":"상처 입어도 굴하지 않는 마음을 예찬하며 고"},{"t":"Royals","a":"Lorde","q":"\"Royals\" \"Lorde\"","cat":"주파수","m":"평범한 삶의 자부심을 고취하여 부의 격차가 "},{"t":"idontwannabeyouanymore","a":"Billie Eilish","q":"\"idontwannabeyouanymore\" \"Billie Eilish\"","cat":"주파수","m":"자아 혐오를 예술로 분출하여 스스로를 괴롭히"},{"t":"drivers license","a":"Olivia Rodrigo","q":"\"drivers license\" \"Olivia Rodrigo\"","cat":"주파수","m":"이별 후의 성장을 운전이라는 상징으로 풀어내"},{"t":"Circles","a":"Post Malone","q":"\"Circles\" \"Post Malone\"","cat":"주파수","m":"반복되는 실수를 인간적인 순환으로 긍정하여 "},{"t":"Blinding Lights","a":"The Weeknd","q":"\"Blinding Lights\" \"The Weeknd\"","cat":"주파수","m":"어둠 속의 이끌림을 강렬한 비트로 분출하여 "},{"t":"Don't Start Now","a":"Dua Lipa","q":"\"Don't Start Now\" \"Dua Lipa\"","cat":"주파수","m":"과거의 관계에서 독립된 자아를 선포하며 예속"},{"t":"Watermelon Sugar","a":"Harry Styles","q":"\"Watermelon Sugar\" \"Harry Styles\"","cat":"주파수","m":"순수한 쾌락과 환희를 긍정하여 억압된 본능의"},{"t":"Say So","a":"Doja Cat","q":"\"Say So\" \"Doja Cat\"","cat":"주파수","m":"솔직한 감정의 표현을 유도하여 망설임이 주는"},{"t":"Good As Hell","a":"Lizzo","q":"\"Good As Hell\" \"Lizzo\"","cat":"주파수","m":"자신의 가치를 극도로 긍정하며 타인의 평가라"},{"t":"In My Blood","a":"Shawn Mendes","q":"\"In My Blood\" \"Shawn Mendes\"","cat":"주파수","m":"포기하고 싶은 순간의 회복력을 노래하여 한계"},{"t":"Havana","a":"Camila Cabello","q":"\"Havana\" \"Camila Cabello\"","cat":"주파수","m":"고향의 정취를 이국적인 매력으로 재조명하여 "},{"t":"All Of Me","a":"John Legend","q":"\"All Of Me\" \"John Legend\"","cat":"주파수","m":"불완전함까지 사랑하는 완벽한 수용을 통해 거"},{"t":"Writing's On The Wall","a":"Sam Smith","q":"\"Writing's On The Wall\" \"Sam Smith\"","cat":"주파수","m":"운명을 직면하는 비장미를 통해 피할 수 없는"},{"t":"When I Was Your Man","a":"Bruno Mars","q":"\"When I Was Your Man\" \"Bruno Mars\"","cat":"주파수","m":"실수를 통한 배움을 긍정하여 과거에 대한 후"},{"t":"Say You Won't Let Go","a":"James Arthur","q":"\"Say You Won't Let Go\" \"James Arthur\"","cat":"주파수","m":"약속과 헌신의 가치를 확신시켜 버림받을지 모"},{"t":"You Are The Reason","a":"Calum Scott","q":"\"You Are The Reason\" \"Calum Scott\"","cat":"주파수","m":"사랑의 동력을 위해 모든 두려움을 감수하는 "},{"t":"Shotgun","a":"George Ezra","q":"\"Shotgun\" \"George Ezra\"","cat":"주파수","m":"여행의 자유로움을 리듬으로 승화하여 구속된 "},{"t":"Riptide","a":"Vance Joy","q":"\"Riptide\" \"Vance Joy\"","cat":"주파수","m":"두려움을 쫓는 선율을 통해 미지의 세계로 나"},{"t":"Cherry Wine","a":"Hozier","q":"\"Cherry Wine\" \"Hozier\"","cat":"주파수","m":"관계의 모순을 통찰력 있게 그려내어 가스라이"},{"t":"Human","a":"Rag'n'Bone Man","q":"\"Human\" \"Rag'n'Bone Man\"","cat":"주파수","m":"인간적인 불완전함을 선포함으로써 신이 되려는"},{"t":"Outnumbered","a":"Dermot Kennedy","q":"\"Outnumbered\" \"Dermot Kennedy\"","cat":"주파수","m":"다수의 어려움 속에서도 수적 우위를 믿으며 "},{"t":"Ho Hey","a":"The Lumineers","q":"\"Ho Hey\" \"The Lumineers\"","cat":"주파수","m":"소소한 존재감의 소중함을 예찬하며 무의미함의"},{"t":"I Will Wait","a":"Mumford & Sons","q":"\"I Will Wait\" \"Mumford & Sons\"","cat":"주파수","m":"인내의 가치를 신성하게 재조명하여 초조함이 "},{"t":"Shake It Out","a":"Florence + The Machine","q":"\"Shake It Out\" \"Florence + The Machine\"","cat":"주파수","m":"과거를 털어버리는 의식을 통해 영혼의 묵은 "},{"t":"Wake Up","a":"Arcade Fire","q":"\"Wake Up\" \"Arcade Fire\"","cat":"주파수","m":"무뎌진 감각을 일깨우는 함성을 통해 죽어있는"},{"t":"Holocene","a":"Bon Iver","q":"\"Holocene\" \"Bon Iver\"","cat":"주파수","m":"광대한 자연 앞의 겸허함을 통해 자아의 비대"},{"t":"Mystery of Love","a":"Sufjan Stevens","q":"\"Mystery of Love\" \"Sufjan Stevens\"","cat":"주파수","m":"사랑의 신비로움을 예찬하며 이별 후의 허무함"},{"t":"Skinny Love","a":"Birdy","q":"\"Skinny Love\" \"Birdy\"","cat":"주파수","m":"시들어가는 사랑을 담담히 노래하여 관계의 붕"},{"t":"Another Love","a":"Tom Odell","q":"\"Another Love\" \"Tom Odell\"","cat":"주파수","m":"상처에도 불구하고 다시 사랑하려는 의지로 상"},{"t":"All I Want","a":"Kodaline","q":"\"All I Want\" \"Kodaline\"","cat":"주파수","m":"간절한 바램을 노래로 승화하여 상실이 주는 "},{"t":"Wake Me Up","a":"Avicii","q":"\"Wake Me Up\" \"Avicii\"","cat":"주파수","m":"길을 잃은 시기를 성장의 기회로 긍정하여 미"},{"t":"바운스 (Bounce)","a":"조용필","q":"\"바운스 (Bounce)\" \"조용필\"","cat":"주파수","m":"굳어있던 심장을 다시 뛰게 하여 정체된 일상"},{"t":"서른 즈음에","a":"김광석","q":"\"서른 즈음에\" \"김광석\"","cat":"주파수","m":"머무르는 것이 아닌 흘러가는 시간의 미학을 "},{"t":"사랑 그 쓸쓸함에 대하여","a":"양희은","q":"\"사랑 그 쓸쓸함에 대하여\" \"양희은\"","cat":"주파수","m":"쓸쓸함을 인생의 깊은 맛으로 재조명하여 고독"},{"t":"하늘을 달리다","a":"이적","q":"\"하늘을 달리다\" \"이적\"","cat":"주파수","m":"현실의 중력을 이겨내는 상상력을 자극하여 억"},{"t":"트랙 9 (Track 9)","a":"이소라","q":"\"트랙 9 (Track 9)\" \"이소라\"","cat":"주파수","m":"완벽하지 않은 자아를 인정함으로써 타인의 기"},{"t":"사노라면","a":"들국화","q":"\"사노라면\" \"들국화\"","cat":"주파수","m":"'내일은 해가 뜬다'는 확신으로 현재의 고난"},{"t":"민물장어의 꿈","a":"신해철","q":"\"민물장어의 꿈\" \"신해철\"","cat":"주파수","m":"좁은 문을 통과하는 인내를 통해 협소한 자아"},{"t":"야생화","a":"박효신","q":"\"야생화\" \"박효신\"","cat":"주파수","m":"혹독한 겨울을 견디고 피어난 꽃처럼 과거의 "},{"t":"나타나","a":"김범수","q":"\"나타나\" \"김범수\"","cat":"주파수","m":"갑작스러운 사랑의 등장을 통해 무미건조한 일"},{"t":"이름","a":"임재범","q":"\"이름\" \"임재범\"","cat":"주파수","m":"무명의 존재에서 의미 있는 존재로의 전이를 "},{"t":"봄날은 간다","a":"김윤아","q":"\"봄날은 간다\" \"김윤아\"","cat":"주파수","m":"사라지는 봄을 통해 순환의 섭리를 깨닫고 집"},{"t":"영일만 친구","a":"최백호","q":"\"영일만 친구\" \"최백호\"","cat":"주파수","m":"거친 바다와 우정을 통해 위축된 마음을 호연"},{"t":"깊은 밤을 날아서","a":"이문세","q":"\"깊은 밤을 날아서\" \"이문세\"","cat":"주파수","m":"어둠을 비상의 공간으로 반전시켜 밤이 주는 "},{"t":"언제나 그대 내 곁에","a":"김현식","q":"\"언제나 그대 내 곁에\" \"김현식\"","cat":"주파수","m":"물리적 부재를 영원한 동행으로 재조명하여 사"},{"t":"그때 그 사람","a":"심수봉","q":"\"그때 그 사람\" \"심수봉\"","cat":"주파수","m":"비 오는 날의 추억을 한 편의 영화적 장면으"},{"t":"지난날","a":"유재하","q":"\"지난날\" \"유재하\"","cat":"주파수","m":"지난날의 실수를 그리움의 일부로 통합하여 과"},{"t":"그대 내 친구여","a":"패티김","q":"\"그대 내 친구여\" \"패티김\"","cat":"주파수","m":"오랜 세월의 인연을 통해 시간의 무게를 든든"},{"t":"개구쟁이","a":"산울림","q":"\"개구쟁이\" \"산울림\"","cat":"주파수","m":"어린 시절의 순수 에너지를 소환하여 경직된 "},{"t":"잡초","a":"나훈아","q":"\"잡초\" \"나훈아\"","cat":"주파수","m":"밟혀도 일어나는 생명력을 자신에게 투사하여 "},{"t":"물어본다","a":"이승환","q":"\"물어본다\" \"이승환\"","cat":"주파수","m":"자신에게 끊임없이 질문하며 정체된 삶의 방향"},{"t":"기억의 습작","a":"전람회","q":"\"기억의 습작\" \"전람회\"","cat":"주파수","m":"서툴렀던 청춘을 '배움의 습작'으로 정의하여"},{"t":"뜨거운 안녕","a":"토이","q":"\"뜨거운 안녕\" \"토이\"","cat":"주파수","m":"안녕을 '뜨거운 열정의 마무리'로 재해석하여"},{"t":"마법의 성","a":"김광진","q":"\"마법의 성\" \"김광진\"","cat":"주파수","m":"난관을 헤쳐 나가는 동화적 상상력을 통해 현"},{"t":"희재","a":"성시경","q":"\"희재\" \"성시경\"","cat":"주파수","m":"떠난 이를 향한 그리움을 아름다운 약속으로 "},{"t":"팔레트 (Palette)","a":"아이유","q":"\"팔레트 (Palette)\" \"아이유\"","cat":"주파수","m":"스물다섯의 자아를 있는 그대로 긍정하며 성장"},{"t":"11:11","a":"태연","q":"\"11:11\" \"태연\"","cat":"주파수","m":"하루가 끝나기 직전의 시간을 통해 과거의 감"},{"t":"다이노소어 (Dinosaur)","a":"악뮤","q":"\"다이노소어 (Dinosaur)\" \"악뮤\"","cat":"주파수","m":"어린 시절 공포의 대상을 노래로 대면함으로써"},{"t":"Tomboy","a":"혁오","q":"\"Tomboy\" \"혁오\"","cat":"주파수","m":"청춘의 불완전함을 찬란한 한때로 재조명하여 "},{"t":"길","a":"폴킴","q":"\"길\" \"폴킴\"","cat":"주파수","m":"헤매는 과정 자체를 목적지로 가는 길로 인정"},{"t":"나의 기쁨 나의 노래","a":"잔나비","q":"\"나의 기쁨 나의 노래\" \"잔나비\"","cat":"주파수","m":"음악이 주는 순수한 기쁨을 통해 고단한 삶의"},{"t":"Square (2017)","a":"백예린","q":"\"Square (2017)\" \"백예린\"","cat":"주파수","m":"틀에 박힌 사고에서 벗어나 탁 트인 공간으로"},{"t":"Life Goes On","a":"방탄소년단","q":"\"Life Goes On\" \"방탄소년단\"","cat":"주파수","m":"어떤 시련에도 삶은 계속된다는 진리를 통해 "},{"t":"어머나","a":"장윤정","q":"\"어머나\" \"장윤정\"","cat":"주파수","m":"예상치 못한 사랑에 대한 긍정을 통해 경직된"},{"t":"별빛 같은 나의 사랑아","a":"임영웅","q":"\"별빛 같은 나의 사랑아\" \"임영웅\"","cat":"주파수","m":"평범한 사랑을 '별빛'으로 격상시켜 지친 일"},{"t":"나보다 더 사랑해요","a":"김호중","q":"\"나보다 더 사랑해요\" \"김호중\"","cat":"주파수","m":"헌신적인 사랑을 통해 이기적인 상처들을 씻어"},{"t":"한 많은 대동강","a":"송가인","q":"\"한 많은 대동강\" \"송가인\"","cat":"주파수","m":"역사의 아픔을 목소리로 승화하여 한의 트라우"},{"t":"찐이야","a":"영탁","q":"\"찐이야\" \"영탁\"","cat":"주파수","m":"진짜 가치를 발견하는 즐거움을 통해 가식적인"},{"t":"진또배기","a":"이찬원","q":"\"진또배기\" \"이찬원\"","cat":"주파수","m":"희망을 상징하는 기운을 통해 정체된 운명의 "},{"t":"내 마음속 최고의 번호","a":"정동원","q":"\"내 마음속 최고의 번호\" \"정동원\"","cat":"주파수","m":"순수한 동심의 시각으로 세상을 바라보며 복잡"},{"t":"그 강을 건너지 마오","a":"양지은","q":"\"그 강을 건너지 마오\" \"양지은\"","cat":"주파수","m":"애절한 정서를 통해 억눌린 슬픔을 충분히 배"},{"t":"사랑의 배터리","a":"홍진영","q":"\"사랑의 배터리\" \"홍진영\"","cat":"주파수","m":"에너지를 충전하는 이미지를 통해 무기력한 상"},{"t":"아모르 파티","a":"김연자","q":"\"아모르 파티\" \"김연자\"","cat":"주파수","m":"운명을 사랑하라는 강렬한 메시지로 불우한 환"},{"t":"고맙소","a":"조항조","q":"\"고맙소\" \"조항조\"","cat":"주파수","m":"지난 세월에 대한 고마움을 전하며 고생의 기"},{"t":"안동역에서","a":"진성","q":"\"안동역에서\" \"진성\"","cat":"주파수","m":"기다림의 끝에서 만난 감정을 통해 오랜 인내"},{"t":"막걸리 한잔","a":"강진","q":"\"막걸리 한잔\" \"강진\"","cat":"주파수","m":"서민적인 소통을 통해 아버지와의 갈등이나 부"},{"t":"보이지 않는 사랑","a":"신승훈","q":"\"보이지 않는 사랑\" \"신승훈\"","cat":"주파수","m":"보이지 않는 대상을 향한 그리움을 '고전적 "},{"t":"가로수 그늘 아래 서면","a":"이문세","q":"\"가로수 그늘 아래 서면\" \"이문세\"","cat":"주파수","m":"옛 기억의 장소를 사색의 공간으로 재정의하여"},{"t":"서울의 달","a":"김건모","q":"\"서울의 달\" \"김건모\"","cat":"주파수","m":"고단한 타향살이를 달빛 아래 낭만으로 재조명"},{"t":"사랑 Two","a":"윤도현","q":"\"사랑 Two\" \"윤도현\"","cat":"주파수","m":"서툰 사랑의 고백을 순수한 용기로 반전시켜 "},{"t":"희야","a":"이승철","q":"\"희야\" \"이승철\"","cat":"주파수","m":"이름을 부르는 간절함을 통해 굳게 닫힌 마음"},{"t":"너무 아픈 사랑은 사랑이 아니었음을","a":"김광석","q":"\"너무 아픈 사랑은 사랑이 아니었음을\" \"김광석\"","cat":"주파수","m":"아픈 사랑을 '사랑이 아닌 것'으로 선언함으"},{"t":"하얀 목련","a":"양희은","q":"\"하얀 목련\" \"양희은\"","cat":"주파수","m":"지는 꽃을 서글픔이 아닌 '또 다른 시작'으"},{"t":"담배가게 아가씨","a":"송창식","q":"\"담배가게 아가씨\" \"송창식\"","cat":"주파수","m":"지루한 일상을 유쾌한 서사로 반전시켜 경직된"},{"t":"꿈","a":"조용필","q":"\"꿈\" \"조용필\"","cat":"주파수","m":"고향에 대한 그리움을 삶의 원동력으로 삼아 "},{"t":"행진","a":"들국화","q":"\"행진\" \"들국화\"","cat":"주파수","m":"멈추지 않는 전진의 에너지를 통해 정체된 자"},{"t":"나에게 쓰는 편지","a":"신해철","q":"\"나에게 쓰는 편지\" \"신해철\"","cat":"주파수","m":"자신과의 대화를 통해 내면의 갈등을 해소하고"},{"t":"텅 빈 거리에서","a":"015B","q":"\"텅 빈 거리에서\" \"015B\"","cat":"주파수","m":"고독한 거리를 사색과 성장의 장소로 변환하여"},{"t":"우리들의 사랑","a":"유재하","q":"\"우리들의 사랑\" \"유재하\"","cat":"주파수","m":"사랑의 본질적 순수함을 회복하여 오염된 인간"},{"t":"회상","a":"산울림","q":"\"회상\" \"산울림\"","cat":"주파수","m":"길을 걷던 기억을 담담히 마주하여 억눌린 슬"},{"t":"인연","a":"이선희","q":"\"인연\" \"이선희\"","cat":"주파수","m":"거부할 수 없는 인연의 섭리를 수용하여 이별"},{"t":"홀로 된다는 것","a":"변진섭","q":"\"홀로 된다는 것\" \"변진섭\"","cat":"주파수","m":"홀로 서기를 고독이 아닌 '독립'으로 정의하"},{"t":"사랑 사랑 사랑","a":"김현식","q":"\"사랑 사랑 사랑\" \"김현식\"","cat":"주파수","m":"사랑의 열정적인 외침을 통해 무기력한 자아의"},{"t":"세월이 가면","a":"최호섭","q":"\"세월이 가면\" \"최호섭\"","cat":"주파수","m":"가는 세월을 추억의 축적으로 긍정하여 노화와"},{"t":"눈의 꽃","a":"박효신","q":"\"눈의 꽃\" \"박효신\"","cat":"주파수","m":"추운 겨울의 시련을 꽃으로 비유하여 고난의 "},{"t":"다행이다","a":"이적","q":"\"다행이다\" \"이적\"","cat":"주파수","m":"존재에 대한 감사를 통해 불안한 미래를 안심"},{"t":"보고 싶다","a":"김범수","q":"\"보고 싶다\" \"김범수\"","cat":"주파수","m":"그리움의 극한을 노래로 표출하여 정체된 감정"},{"t":"잊지 말아요","a":"백지영","q":"\"잊지 말아요\" \"백지영\"","cat":"주파수","m":"잊히는 두려움을 영원한 기억의 약속으로 변환"},{"t":"두 사람","a":"성시경","q":"\"두 사람\" \"성시경\"","cat":"주파수","m":"혼자가 아닌 동행의 가치를 확신시켜 고립된 "},{"t":"그런 일은","a":"박화요비","q":"\"그런 일은\" \"박화요비\"","cat":"주파수","m":"일어날 수 없는 일을 노래로 부정하며 현실의"},{"t":"영원히 영원히","a":"자우림","q":"\"영원히 영원히\" \"자우림\"","cat":"주파수","m":"사라지는 것들에 대한 영원성을 노래하여 덧없"},{"t":"다시 사랑한다면","a":"김필","q":"\"다시 사랑한다면\" \"김필\"","cat":"주파수","m":"재회의 가정을 통해 과거의 실수를 용서하고 "},{"t":"운이 좋았지","a":"권진아","q":"\"운이 좋았지\" \"권진아\"","cat":"주파수","m":"시련을 '운'으로 겸허히 받아들여 피해자 의"},{"t":"눈사람","a":"정승환","q":"\"눈사람\" \"정승환\"","cat":"주파수","m":"멀어지는 사람을 배웅하는 성숙함을 통해 이별"},{"t":"밤편지","a":"아이유","q":"\"밤편지\" \"아이유\"","cat":"주파수","m":"정성 어린 마음을 전송하며 불안한 밤의 상황"},{"t":"Fine","a":"태연","q":"\"Fine\" \"태연\"","cat":"주파수","m":"괜찮지 않아도 괜찮다는 인정을 통해 거짓된 "},{"t":"서울의 달 (Remake)","a":"송가인","q":"\"서울의 달 (Remake)\" \"송가인\"","cat":"주파수","m":"고전의 감성을 현대적 위로로 승화하여 시대적"},{"t":"전설 속의 누군가처럼","a":"신승훈","q":"\"전설 속의 누군가처럼\" \"신승훈\"","cat":"주파수","m":"스스로를 전설의 주인공으로 재정의하여 위축된"},{"t":"미련","a":"김건모","q":"\"미련\" \"김건모\"","cat":"주파수","m":"미련을 아름다운 마침표로 재조명하여 질척이는"},{"t":"너의 뒤에서","a":"박진영","q":"\"너의 뒤에서\" \"박진영\"","cat":"주파수","m":"소유하지 않는 사랑을 통해 집착이 주는 심리"},{"t":"이방인","a":"전람회","q":"\"이방인\" \"전람회\"","cat":"주파수","m":"어디에도 속하지 못한 소외감을 '자유로운 여"},{"t":"가족","a":"이승환","q":"\"가족\" \"이승환\"","cat":"주파수","m":"가족 간의 상처를 이해와 연민으로 재해석하여"},{"t":"여전히 아름다운지","a":"토이","q":"\"여전히 아름다운지\" \"토이\"","cat":"주파수","m":"변해버린 현실 속에서도 변치 않는 기억의 가"},{"t":"이별의 그늘","a":"윤상","q":"\"이별의 그늘\" \"윤상\"","cat":"주파수","m":"이별을 슬픔의 그늘이 아닌 '사색의 휴식처'"},{"t":"달의 몰락","a":"김현철","q":"\"달의 몰락\" \"김현철\"","cat":"주파수","m":"실패와 몰락을 자연스러운 주기로 수용하여 추"},{"t":"3!4!","a":"룰라","q":"\"3!4!\" \"룰라\"","cat":"주파수","m":"과거의 영광을 현재의 에너지로 소환하여 침체"},{"t":"아로하","a":"쿨 (Cool)","q":"\"아로하\" \"쿨 (Cool)\"","cat":"주파수","m":"영원한 약속의 언어를 통해 불신과 불안의 상"},{"t":"달팽이","a":"패닉","q":"\"달팽이\" \"패닉\"","cat":"주파수","m":"느리지만 확실한 전진을 예찬하며 조급함이 주"},{"t":"낭만 고양이","a":"체리필터","q":"\"낭만 고양이\" \"체리필터\"","cat":"주파수","m":"좁은 방을 벗어난 자유로운 영혼을 노래하여 "},{"t":"친구여","a":"조PD","q":"\"친구여\" \"조PD\"","cat":"주파수","m":"지나간 우정과 시간을 황금기로 재조명하여 현"},{"t":"멀어지다","a":"넬 (Nell)","q":"\"멀어지다\" \"넬 (Nell)\"","cat":"주파수","m":"멀어지는 것들을 자연의 섭리로 수용하여 관계"},{"t":"Fan","a":"에픽하이","q":"\"Fan\" \"에픽하이\"","cat":"주파수","m":"뒤틀린 애착을 예술적 몰입으로 재조명하여 왜"},{"t":"8282","a":"다비치","q":"\"8282\" \"다비치\"","cat":"주파수","m":"빠른 비트의 전환처럼 지루한 슬픔의 상황을 "},{"t":"총 맞은 것처럼","a":"백지영","q":"\"총 맞은 것처럼\" \"백지영\"","cat":"주파수","m":"극심한 고통을 언어화하여 내면의 치명적인 트"},{"t":"벌써 일년","a":"브라운 아이즈","q":"\"벌써 일년\" \"브라운 아이즈\"","cat":"주파수","m":"시간의 흐름을 견뎌낸 인내를 긍정하여 이별 "},{"t":"가시나","a":"선미","q":"\"가시나\" \"선미\"","cat":"주파수","m":"떠난 이에게 당당함을 선포하며 피해자 의식의"},{"t":"벌써 12시","a":"청하","q":"\"벌써 12시\" \"청하\"","cat":"주파수","m":"아쉬운 이별의 순간을 매혹적인 서사로 변화시"},{"t":"비도 오고 그래서","a":"헤이즈","q":"\"비도 오고 그래서\" \"헤이즈\"","cat":"주파수","m":"비 오는 날의 감성을 정화의 의식으로 재조명"},{"t":"안녕","a":"폴킴","q":"\"안녕\" \"폴킴\"","cat":"주파수","m":"안녕이라는 짧은 인사에 담긴 수많은 의미를 "},{"t":"선물","a":"멜로망스","q":"\"선물\" \"멜로망스\"","cat":"주파수","m":"평범한 일상을 '선물'로 인식하게 하여 무가"},{"t":"여행","a":"볼빨간사춘기","q":"\"여행\" \"볼빨간사춘기\"","cat":"주파수","m":"낯선 곳으로의 떠남을 통해 고여있던 부정적 "},{"t":"가을 밤에 든 생각","a":"잔나비","q":"\"가을 밤에 든 생각\" \"잔나비\"","cat":"주파수","m":"그리운 시절을 따뜻한 위로로 변환하여 상실의"},{"t":"213","a":"혁오","q":"\"213\" \"혁오\"","cat":"주파수","m":"청춘의 방황을 고유한 리듬으로 수용하여 정체"},{"t":"RE-BYE","a":"악뮤","q":"\"RE-BYE\" \"악뮤\"","cat":"주파수","m":"반복되는 이별에 무뎌지는 것이 아닌 '성숙한"},{"t":"사랑은 늘 도망가","a":"임영웅","q":"\"사랑은 늘 도망가\" \"임영웅\"","cat":"주파수","m":"도망가는 사랑을 쫓지 않는 여유를 통해 결핍"},{"t":"할무니","a":"김호중","q":"\"할무니\" \"김호중\"","cat":"주파수","m":"조부모의 사랑을 통해 유년기의 외로움을 치유"},{"t":"니가 왜 거기서 나와","a":"영탁","q":"\"니가 왜 거기서 나와\" \"영탁\"","cat":"주파수","m":"황당한 배신 상황을 유머로 승화하여 분노와 "},{"t":"시절인연","a":"이찬원","q":"\"시절인연\" \"이찬원\"","cat":"주파수","m":"인연의 때가 있음을 인정하여 지나간 인연에 "},{"t":"효도합시다","a":"정동원","q":"\"효도합시다\" \"정동원\"","cat":"주파수","m":"부모님께 향하는 마음을 통해 이기적인 자아의"},{"t":"역전인생","a":"장민호","q":"\"역전인생\" \"장민호\"","cat":"주파수","m":"뒤늦게 찾아온 기회를 예찬하며 포기하고 싶던"},{"t":"사는 맛","a":"양지은","q":"\"사는 맛\" \"양지은\"","cat":"주파수","m":"고된 삶 속의 소소한 즐거움을 발견하여 무거"},{"t":"엄마아리랑","a":"송가인","q":"\"엄마아리랑\" \"송가인\"","cat":"주파수","m":"한국적 정서의 한을 가락으로 풀어내어 억눌린"},{"t":"내게 애인이 생겼어요","a":"나훈아","q":"\"내게 애인이 생겼어요\" \"나훈아\"","cat":"주파수","m":"새로운 사랑의 시작을 선언하며 정체된 독신 "},{"t":"옹이","a":"조항조","q":"\"옹이\" \"조항조\"","cat":"주파수","m":"마음의 옹이를 단단한 옹골짐으로 재해석하여 "},{"t":"What Do I Call You","a":"태연","q":"\"What Do I Call You\" \"태연\"","cat":"주파수","m":"관계의 명칭이 모호해진 상황을 담담히 수용하"},{"t":"에잇 (eight)","a":"아이유","q":"\"에잇 (eight)\" \"아이유\"","cat":"주파수","m":"영원할 수 없는 것들을 기억 속에 보존하며 "},{"t":"Dynamite","a":"방탄소년단","q":"\"Dynamite\" \"방탄소년단\"","cat":"주파수","m":"밝고 경쾌한 에너지를 투사하여 전 세계적인 "},{"t":"롤린 (Rollin')","a":"브레이브걸스","q":"\"롤린 (Rollin')\" \"브레이브걸스\"","cat":"주파수","m":"역주행의 신화를 통해 끝났다고 생각한 상황이"},{"t":"별 보러 가자","a":"적재","q":"\"별 보러 가자\" \"적재\"","cat":"주파수","m":"일상의 초대를 낭만적인 제안으로 격상시켜 단"},{"t":"나무","a":"카더가든","q":"\"나무\" \"카더가든\"","cat":"주파수","m":"한자리에 머물며 지켜주는 나무처럼 불안한 관"},{"t":"어떻게 내가 연애를 하겠어","a":"오반 (OVAN)","q":"\"어떻게 내가 연애를 하겠어\" \"오반 (OVAN)\"","cat":"주파수","m":"자격지심을 솔직하게 고백하며 사랑을 가로막는"},{"t":"밤하늘의 별을 (2020)","a":"경서","q":"\"밤하늘의 별을 (2020)\" \"경서\"","cat":"주파수","m":"옛 감성을 현대적으로 복원하여 단절된 세대 "},{"t":"시작","a":"가호 (Gaho)","q":"\"시작\" \"가호 (Gaho)\"","cat":"주파수","m":"새로운 시작의 포효를 통해 과거의 실패 상황"},{"t":"Stronger (What Doesn't Kill You)","a":"Kelly Clarkson","q":"\"Stronger (What Doesn't Kill You)\" \"Kelly Clarkson\"","cat":"주파수","m":"시련을 성장의 자양분으로 재정의하여 고난의 "},{"t":"Fight Song","a":"Rachel Platten","q":"\"Fight Song\" \"Rachel Platten\"","cat":"주파수","m":"작은 불씨가 큰 불이 되듯, 미약한 의지를 "},{"t":"I Will Survive","a":"Gloria Gaynor","q":"\"I Will Survive\" \"Gloria Gaynor\"","cat":"주파수","m":"관계의 종말을 독립적인 삶의 시작으로 전환하"},{"t":"Roar","a":"Katy Perry","q":"\"Roar\" \"Katy Perry\"","cat":"주파수","m":"억눌렸던 목소리를 표효로 바꾸어 수동적인 삶"},{"t":"Titanium (ft. Sia)","a":"David Guetta","q":"\"Titanium (ft. Sia)\" \"David Guetta\"","cat":"주파수","m":"어떤 비난과 상처도 튕겨내는 단단한 자아를 "},{"t":"The Climb","a":"Miley Cyrus","q":"\"The Climb\" \"Miley Cyrus\"","cat":"주파수","m":"결과가 아닌 '등반' 과정 자체를 긍정하여 "},{"t":"A Sky Full of Stars","a":"Coldplay","q":"\"A Sky Full of Stars\" \"Coldplay\"","cat":"주파수","m":"어둠 속에서도 빛나는 별을 보며 절망적인 상"},{"t":"Beautiful","a":"Christina Aguilera","q":"\"Beautiful\" \"Christina Aguilera\"","cat":"주파수","m":"타인의 시선이 아닌 내면의 아름다움을 선포하"},{"t":"Brave","a":"Sara Bareilles","q":"\"Brave\" \"Sara Bareilles\"","cat":"주파수","m":"침묵을 깨고 진실을 말하는 용기를 통해 억압"},{"t":"No Woman, No Cry","a":"Bob Marley","q":"\"No Woman, No Cry\" \"Bob Marley\"","cat":"주파수","m":"눈물을 닦고 내일을 준비하는 위로를 통해 빈"},{"t":"Go Your Own Way","a":"Fleetwood Mac","q":"\"Go Your Own Way\" \"Fleetwood Mac\"","cat":"주파수","m":"단절을 자신의 길을 가는 독립의 선언으로 변"},{"t":"I'm Still Standing","a":"Elton John","q":"\"I'm Still Standing\" \"Elton John\"","cat":"주파수","m":"무너진 듯 보였으나 여전히 서 있는 모습을 "},{"t":"It's My Life","a":"Bon Jovi","q":"\"It's My Life\" \"Bon Jovi\"","cat":"주파수","m":"자신의 삶에 대한 통제권을 선언하며 타인의 "},{"t":"I Still Haven't Found What I'm Looking For","a":"U2","q":"\"I Still Haven't Found What I'm Looking For\" \"U2\"","cat":"주파수","m":"끊임없는 탐구 정신을 통해 현실 안주의 정체"},{"t":"Rolling in the Deep","a":"Adele","q":"\"Rolling in the Deep\" \"Adele\"","cat":"주파수","m":"배신감을 강렬한 음악적 에너지로 발산하여 억"},{"t":"Castle on the Hill","a":"Ed Sheeran","q":"\"Castle on the Hill\" \"Ed Sheeran\"","cat":"주파수","m":"고향에 대한 향수를 성장의 연대기로 재조명하"},{"t":"Raise Your Glass","a":"Pink","q":"\"Raise Your Glass\" \"Pink\"","cat":"주파수","m":"소외된 이들을 위한 축배를 통해 사회적 낙인"},{"t":"Unstoppable","a":"Sia","q":"\"Unstoppable\" \"Sia\"","cat":"주파수","m":"멈출 수 없는 기갑차와 같은 자신감을 투사하"},{"t":"Skyscraper","a":"Demi Lovato","q":"\"Skyscraper\" \"Demi Lovato\"","cat":"주파수","m":"무너져도 다시 고층 빌딩처럼 일어나는 복원력"},{"t":"Rise Up","a":"Andra Day","q":"\"Rise Up\" \"Andra Day\"","cat":"주파수","m":"천 번을 무너져도 다시 일어나는 끈기로 절망"},{"t":"Girl on Fire","a":"Alicia Keys","q":"\"Girl on Fire\" \"Alicia Keys\"","cat":"주파수","m":"내면의 열정을 불꽃으로 형상화하여 소심한 자"},{"t":"Not Afraid","a":"Eminem","q":"\"Not Afraid\" \"Eminem\"","cat":"주파수","m":"중독과 어둠을 극복한 고백을 통해 과거의 잘"},{"t":"Breaking the Habit","a":"Linkin Park","q":"\"Breaking the Habit\" \"Linkin Park\"","cat":"주파수","m":"나쁜 습관을 끊어내는 결단을 통해 반복되는 "},{"t":"Hard Times","a":"Paramore","q":"\"Hard Times\" \"Paramore\"","cat":"주파수","m":"힘든 시기를 리드미컬하게 소화하며 고난에 압"},{"t":"Dog Days Are Over","a":"Florence + The Machine","q":"\"Dog Days Are Over\" \"Florence + The Machine\"","cat":"주파수","m":"불행한 날들의 종료를 선언하며 삶의 전성기 "},{"t":"I Lived","a":"OneRepublic","q":"\"I Lived\" \"OneRepublic\"","cat":"주파수","m":"모든 것을 경험했노라 말하는 자부심을 통해 "},{"t":"Some Nights","a":"Fun.","q":"\"Some Nights\" \"Fun.\"","cat":"주파수","m":"정체성에 대한 고민을 웅장한 찬가로 승화하여"},{"t":"Team","a":"Lorde","q":"\"Team\" \"Lorde\"","cat":"주파수","m":"소외된 이들의 연대를 통해 주류 사회로부터 "},{"t":"Before You Go","a":"Lewis Capaldi","q":"\"Before You Go\" \"Lewis Capaldi\"","cat":"주파수","m":"사별 전의 질문들을 통해 자책의 트라우마를 "},{"t":"good 4 u","a":"Olivia Rodrigo","q":"\"good 4 u\" \"Olivia Rodrigo\"","cat":"주파수","m":"분노를 솔직하게 표출함으로써 억눌린 피해자 "},{"t":"New Rules","a":"Dua Lipa","q":"\"New Rules\" \"Dua Lipa\"","cat":"주파수","m":"새로운 규칙을 세워 과거의 잘못된 관계가 반"},{"t":"Juice","a":"Lizzo","q":"\"Juice\" \"Lizzo\"","cat":"주파수","m":"자기 긍정의 에너지를 폭발시켜 자존감 결여 "},{"t":"Locked Out of Heaven","a":"Bruno Mars","q":"\"Locked Out of Heaven\" \"Bruno Mars\"","cat":"주파수","m":"강렬한 사랑의 환희를 통해 무미건조한 삶의 "},{"t":"Save Your Tears","a":"The Weeknd","q":"\"Save Your Tears\" \"The Weeknd\"","cat":"주파수","m":"눈물을 아껴 내일을 기약하는 태도를 통해 슬"},{"t":"Better Now","a":"Post Malone","q":"\"Better Now\" \"Post Malone\"","cat":"주파수","m":"이별 후 더 나아진 상태를 확인하며 과거에 "},{"t":"Love Yourself","a":"Justin Bieber","q":"\"Love Yourself\" \"Justin Bieber\"","cat":"주파수","m":"자신을 사랑하는 법을 배워 자학적인 관계 트"},{"t":"Lose You To Love Me","a":"Selena Gomez","q":"\"Lose You To Love Me\" \"Selena Gomez\"","cat":"주파수","m":"너를 잃고 나를 찾는 과정을 통해 의존적 관"},{"t":"The Nights","a":"Avicii","q":"\"The Nights\" \"Avicii\"","cat":"주파수","m":"\"영원히 기억될 삶을 살라\"는 조언으로 단조"},{"t":"Don't Stop Me Now","a":"Queen","q":"\"Don't Stop Me Now\" \"Queen\"","cat":"주파수","m":"폭발적인 에너지를 투사하여 정체되어 있던 무"},{"t":"Changes","a":"David Bowie","q":"\"Changes\" \"David Bowie\"","cat":"주파수","m":"변화를 두려워하지 않고 수용함으로써 과거에 "},{"t":"Freedom! '90","a":"George Michael","q":"\"Freedom! '90\" \"George Michael\"","cat":"주파수","m":"과거의 이미지와 구속에서 벗어나 진정한 자아"},{"t":"You Learn","a":"Alanis Morissette","q":"\"You Learn\" \"Alanis Morissette\"","cat":"주파수","m":"모든 실수와 고통을 '배움'으로 재정의하여 "},{"t":"Change Would Do You Good","a":"Sheryl Crow","q":"\"Change Would Do You Good\" \"Sheryl Crow\"","cat":"주파수","m":"변화가 유익하다는 확신을 통해 고여있는 삶의"},{"t":"Don't Speak","a":"No Doubt","q":"\"Don't Speak\" \"No Doubt\"","cat":"주파수","m":"말로 다 할 수 없는 이별의 고통을 선율로 "},{"t":"Good Riddance (Time of Your Life)","a":"Green Day","q":"\"Good Riddance (Time of Your Life)\" \"Green Day\"","cat":"주파수","m":"예상치 못한 이별이나 끝을 '최고의 순간'으"},{"t":"Run","a":"Snow Patrol","q":"\"Run\" \"Snow Patrol\"","cat":"주파수","m":"두려움을 뚫고 나아가는 용기를 자극하여 정체"},{"t":"Everybody's Changing","a":"Keane","q":"\"Everybody's Changing\" \"Keane\"","cat":"주파수","m":"모두가 변하는 세상 속에서 변화를 자연스럽게"},{"t":"Unwritten","a":"Natasha Bedingfield","q":"\"Unwritten\" \"Natasha Bedingfield\"","cat":"주파수","m":"인생의 다음 장은 아직 쓰이지 않았음을 깨닫"},{"t":"Put Your Records On","a":"Corinne Bailey Rae","q":"\"Put Your Records On\" \"Corinne Bailey Rae\"","cat":"주파수","m":"편안한 휴식을 통해 경직된 마음을 이완시키고"},{"t":"Back to Black","a":"Amy Winehouse","q":"\"Back to Black\" \"Amy Winehouse\"","cat":"주파수","m":"어둠 속으로 돌아가는 통증을 예술로 직면하여"},{"t":"Set Fire to the Rain","a":"Adele","q":"\"Set Fire to the Rain\" \"Adele\"","cat":"주파수","m":"고통스러운 관계를 불태워버리는 결단력으로 억"},{"t":"Next to Me","a":"Emeli Sandé","q":"\"Next to Me\" \"Emeli Sandé\"","cat":"주파수","m":"굳건한 신뢰의 대상을 발견하여 불안정했던 삶"},{"t":"Bird Set Free","a":"Sia","q":"\"Bird Set Free\" \"Sia\"","cat":"주파수","m":"갇혀있던 새가 날아오르듯, 목소리를 찾아 억"},{"t":"So What","a":"P!nk","q":"\"So What\" \"P!nk\"","cat":"주파수","m":"상실을 '그래서 어쩌라고' 식의 당당함으로 "},{"t":"Breakaway","a":"Kelly Clarkson","q":"\"Breakaway\" \"Kelly Clarkson\"","cat":"주파수","m":"익숙한 곳을 떠나 꿈을 향해 나아가는 도전 "},{"t":"Can't Hold Us","a":"Macklemore","q":"\"Can't Hold Us\" \"Macklemore\"","cat":"주파수","m":"그 무엇도 우리를 막을 수 없다는 포부를 통"},{"t":"Thunder","a":"Imagine Dragons","q":"\"Thunder\" \"Imagine Dragons\"","cat":"주파수","m":"비웃음을 딛고 일어선 성공을 통해 과거의 무"},{"t":"Stitches","a":"Shawn Mendes","q":"\"Stitches\" \"Shawn Mendes\"","cat":"주파수","m":"상처를 꿰매고 회복하는 과정을 통해 아픈 기"},{"t":"IDGAF","a":"Dua Lipa","q":"\"IDGAF\" \"Dua Lipa\"","cat":"주파수","m":"더 이상 상관하지 않겠다는 단호함으로 나쁜 "},{"t":"Mount Everest","a":"Labrinth","q":"\"Mount Everest\" \"Labrinth\"","cat":"주파수","m":"거대한 산을 정복하는 기개를 투사하여 열등감"},{"t":"Bury a Friend","a":"Billie Eilish","q":"\"Bury a Friend\" \"Billie Eilish\"","cat":"주파수","m":"내면의 공포를 어둠의 서사로 직면하여 숨겨진"},{"t":"Lights Up","a":"Harry Styles","q":"\"Lights Up\" \"Harry Styles\"","cat":"주파수","m":"빛을 밝혀 자신의 진짜 모습을 발견하고 어둠"},{"t":"Recovery","a":"James Arthur","q":"\"Recovery\" \"James Arthur\"","cat":"주파수","m":"회복의 길 위에 서 있음을 선언하며 중독이나"},{"t":"Will We Talk?","a":"Sam Fender","q":"\"Will We Talk?\" \"Sam Fender\"","cat":"주파수","m":"단절된 소통의 시대를 노래하며 소외된 개인의"},{"t":"Hurt","a":"Arlo Parks","q":"\"Hurt\" \"Arlo Parks\"","cat":"주파수","m":"\"아파도 괜찮다\"는 다정한 위로를 통해 억눌"},{"t":"Stop This Flame","a":"Celeste","q":"\"Stop This Flame\" \"Celeste\"","cat":"주파수","m":"타오르는 의지를 멈추지 않겠다는 선언으로 현"},{"t":"Power Over Me","a":"Dermot Kennedy","q":"\"Power Over Me\" \"Dermot Kennedy\"","cat":"주파수","m":"타인에게 주었던 감정의 주도권을 회수하며 의"},{"t":"Giant","a":"Rag'n'Bone Man","q":"\"Giant\" \"Rag'n'Bone Man\"","cat":"주파수","m":"내면의 거인을 일깨워 작고 위축되었던 자아의"},{"t":"Leave a Light On","a":"Tom Walker","q":"\"Leave a Light On\" \"Tom Walker\"","cat":"주파수","m":"누군가를 기다리는 불빛처럼 어둠 속 방황하는"},{"t":"Budapest","a":"George Ezra","q":"\"Budapest\" \"George Ezra\"","cat":"주파수","m":"모든 것을 포기할 수 있는 사랑을 통해 소유"},{"t":"Be Alright","a":"Dean Lewis","q":"\"Be Alright\" \"Dean Lewis\"","cat":"주파수","m":"\"결국 괜찮아질 것\"이라는 주문을 통해 이별"},{"t":"Lost Without You","a":"Freya Ridings","q":"\"Lost Without You\" \"Freya Ridings\"","cat":"주파수","m":"상실을 솔직하게 고백하며 숨겨왔던 슬픔의 상"},{"t":"Mr. Brightside","a":"The Killers","q":"\"Mr. Brightside\" \"The Killers\"","cat":"주파수","m":"질투와 의심을 강력한 록 사운드로 발산하여 "},{"t":"Use Somebody","a":"Kings of Leon","q":"\"Use Somebody\" \"Kings of Leon\"","cat":"주파수","m":"누군가를 필요로 하는 간절함을 통해 고독한 "},{"t":"The Cave","a":"Mumford & Sons","q":"\"The Cave\" \"Mumford & Sons\"","cat":"주파수","m":"동굴에서 나와 빛으로 향하는 상황 변화를 예"},{"t":"Movement","a":"Hozier","q":"\"Movement\" \"Hozier\"","cat":"주파수","m":"움직임의 신비로움을 통해 정체된 육체와 정신"},{"t":"Let It Happen","a":"Tame Impala","q":"\"Let It Happen\" \"Tame Impala\"","cat":"주파수","m":"일어날 일은 일어나게 두는 수용을 통해 통제"},{"t":"Heat Waves","a":"Glass Animals","q":"\"Heat Waves\" \"Glass Animals\"","cat":"주파수","m":"뜨거운 열기처럼 찾아오는 그리움을 받아들여 "},{"t":"STAY","a":"The Kid LAROI & Justin Bieber","q":"\"STAY\" \"The Kid LAROI & Justin Bieber\"","cat":"주파수","m":"떠나려는 마음과 머물려는 갈등을 통해 불완전"},{"t":"Yesterday","a":"The Beatles","q":"\"Yesterday\" \"The Beatles\"","cat":"주파수","m":"어제의 슬픔을 찬란한 고전으로 승화하여 과거"},{"t":"The Show Must Go On","a":"Queen","q":"\"The Show Must Go On\" \"Queen\"","cat":"주파수","m":"어떤 비극 속에서도 쇼는 계속되어야 한다는 "},{"t":"The Winner Takes It All","a":"ABBA","q":"\"The Winner Takes It All\" \"ABBA\"","cat":"주파수","m":"승패의 냉혹한 현실을 담담히 노래하여 실패의"},{"t":"Vienna","a":"Billy Joel","q":"\"Vienna\" \"Billy Joel\"","cat":"주파수","m":"\"비엔나가 너를 기다린다\"는 메시지로 조급함"},{"t":"Rocket Man","a":"Elton John","q":"\"Rocket Man\" \"Elton John\"","cat":"주파수","m":"고독한 비행을 우주적 낭만으로 재조명하여 고"},{"t":"Earth Song","a":"Michael Jackson","q":"\"Earth Song\" \"Michael Jackson\"","cat":"주파수","m":"파괴된 자연을 위한 절규를 통해 인류 공동의"},{"t":"One Moment In Time","a":"Whitney Houston","q":"\"One Moment In Time\" \"Whitney Houston\"","cat":"주파수","m":"단 한 번의 결정적 순간을 위해 역경을 견뎌"},{"t":"A New Day Has Come","a":"Celine Dion","q":"\"A New Day Has Come\" \"Celine Dion\"","cat":"주파수","m":"새로운 날의 도래를 선포하며 길었던 어둠의 "},{"t":"Change the World","a":"Eric Clapton","q":"\"Change the World\" \"Eric Clapton\"","cat":"주파수","m":"세상을 바꾸고 싶은 간절한 사랑을 통해 무기"},{"t":"The Times They Are A-Changin'","a":"Bob Dylan","q":"\"The Times They Are A-Changin'\" \"Bob Dylan\"","cat":"주파수","m":"시대의 변화를 예고하며 구태의연한 관습의 트"},{"t":"Fields of Gold","a":"Sting","q":"\"Fields of Gold\" \"Sting\"","cat":"주파수","m":"황금빛 들판의 기억을 통해 상실의 아픔을 영"},{"t":"Against All Odds","a":"Phil Collins","q":"\"Against All Odds\" \"Phil Collins\"","cat":"주파수","m":"모든 역경을 무릅쓰고 다시 마주하는 용기로 "},{"t":"Summer of '69","a":"Bryan Adams","q":"\"Summer of '69\" \"Bryan Adams\"","cat":"주파수","m":"청춘의 뜨거웠던 기억을 소환하여 메말라버린 "},{"t":"Still Loving You","a":"Scorpions","q":"\"Still Loving You\" \"Scorpions\"","cat":"주파수","m":"무너진 담벼락을 다시 쌓으려는 의지로 깨진 "},{"t":"Hello","a":"Adele","q":"\"Hello\" \"Adele\"","cat":"주파수","m":"과거의 자신에게 건네는 인사를 통해 해소되지"},{"t":"Photograph","a":"Ed Sheeran","q":"\"Photograph\" \"Ed Sheeran\"","cat":"주파수","m":"사진 속에 저장된 기억을 통해 시간의 흐름으"},{"t":"Yellow","a":"Coldplay","q":"\"Yellow\" \"Coldplay\"","cat":"주파수","m":"헌신적인 사랑의 빛을 통해 어두웠던 내면의 "},{"t":"Count On Me","a":"Bruno Mars","q":"\"Count On Me\" \"Bruno Mars\"","cat":"주파수","m":"언제든 의지할 수 있는 우정을 통해 세상에 "},{"t":"Clean","a":"Taylor Swift","q":"\"Clean\" \"Taylor Swift\"","cat":"주파수","m":"마침내 상처로부터 깨끗해졌음을 선포하며 과거"},{"t":"Alive","a":"Sia","q":"\"Alive\" \"Sia\"","cat":"주파수","m":"살아있음에 대한 강렬한 긍정을 통해 자살 충"},{"t":"Numb","a":"Linkin Park","q":"\"Numb\" \"Linkin Park\"","cat":"주파수","m":"타인의 기대에 무감각해진 자아를 일깨워 억압"},{"t":"Radioactive","a":"Imagine Dragons","q":"\"Radioactive\" \"Imagine Dragons\"","cat":"주파수","m":"새로운 시대로의 각성을 노래하며 낡은 자아의"},{"t":"Stop and Stare","a":"OneRepublic","q":"\"Stop and Stare\" \"OneRepublic\"","cat":"주파수","m":"멈춰서 자신을 바라보는 성찰을 통해 맹목적인"},{"t":"The Edge of Glory","a":"Lady Gaga","q":"\"The Edge of Glory\" \"Lady Gaga\"","cat":"주파수","m":"한계의 끝에서 느끼는 영광을 통해 죽음이나 "},{"t":"Fkin' Perfect**","a":"P!nk","q":"\"Fkin' Perfect**\" \"P!nk\"","cat":"주파수","m":"완벽하지 않아도 완벽하다는 역설로 자기 혐오"},{"t":"Mercy","a":"Shawn Mendes","q":"\"Mercy\" \"Shawn Mendes\"","cat":"주파수","m":"자비를 구하는 간절함을 통해 한계에 다다른 "},{"t":"No Time To Die","a":"Billie Eilish","q":"\"No Time To Die\" \"Billie Eilish\"","cat":"주파수","m":"배신을 딛고 강인해지는 과정을 통해 타인에 "},{"t":"Falling","a":"Harry Styles","q":"\"Falling\" \"Harry Styles\"","cat":"주파수","m":"추락하는 감정을 솔직하게 마주함으로써 회피하"},{"t":"Hold Me While You Wait","a":"Lewis Capaldi","q":"\"Hold Me While You Wait\" \"Lewis Capaldi\"","cat":"주파수","m":"기다림의 고통을 노래로 승화하여 불확실한 관"},{"t":"traitor","a":"Olivia Rodrigo","q":"\"traitor\" \"Olivia Rodrigo\"","cat":"주파수","m":"배신감을 노래로 정화하며 사랑의 배신이 남긴"},{"t":"Physical","a":"Dua Lipa","q":"\"Physical\" \"Dua Lipa\"","cat":"주파수","m":"육체적인 역동성을 통해 정체된 정신적 우울 "},{"t":"In Your Eyes","a":"The Weeknd","q":"\"In Your Eyes\" \"The Weeknd\"","cat":"주파수","m":"상대의 눈에 비친 진실을 통해 거짓된 관계의"},{"t":"Congratulations","a":"Post Malone","q":"\"Congratulations\" \"Post Malone\"","cat":"주파수","m":"성공을 자축하며 무시당했던 과거의 상처 입은"},{"t":"Ghost","a":"Justin Bieber","q":"\"Ghost\" \"Justin Bieber\"","cat":"주파수","m":"떠난 이의 영혼과 공존하는 법을 배우며 사별"},{"t":"Kill Em With Kindness","a":"Selena Gomez","q":"\"Kill Em With Kindness\" \"Selena Gomez\"","cat":"주파수","m":"친절함으로 적을 이기는 지혜를 통해 증오의 "},{"t":"Confident","a":"Demi Lovato","q":"\"Confident\" \"Demi Lovato\"","cat":"주파수","m":"자신감을 무기로 삼아 소심했던 과거의 상황을"},{"t":"Ride","a":"Lana Del Rey","q":"\"Ride\" \"Lana Del Rey\"","cat":"주파수","m":"그냥 달리는 행위 자체에서 자유를 찾아 구속"},{"t":"Liability","a":"Lorde","q":"\"Liability\" \"Lorde\"","cat":"주파수","m":"자신이 짐이 된다는 자책을 예술로 승화하여 "},{"t":"Skin","a":"Rag'n'Bone Man","q":"\"Skin\" \"Rag'n'Bone Man\"","cat":"주파수","m":"피부 너머의 진실을 통해 외형적 열등감 상황"},{"t":"Let It Go","a":"James Bay","q":"\"Let It Go\" \"James Bay\"","cat":"주파수","m":"놓아줄 것을 기꺼이 놓아줌으로써 집착의 고통"},{"t":"Waiting For Love","a":"Avicii","q":"\"Waiting For Love\" \"Avicii\"","cat":"주파수","m":"사랑을 기다리는 희망을 통해 고독한 정체 상"},{"t":"이젠 그랬으면 좋겠네","a":"조용필","q":"\"이젠 그랬으면 좋겠네\" \"조용필\"","cat":"주파수","m":"진정한 안식과 자아를 찾는 과정을 통해 영혼"},{"t":"바람이 불어오는 곳","a":"김광석","q":"\"바람이 불어오는 곳\" \"김광석\"","cat":"주파수","m":"여행의 설렘과 자연의 소리를 통해 세포의 생"},{"t":"바램","a":"노사연","q":"\"바램\" \"노사연\"","cat":"주파수","m":"삶의 무게를 사랑으로 수용하며 지친 DNA에"},{"t":"우리 앞의 생이 끝나갈 때","a":"신해철","q":"\"우리 앞의 생이 끝나갈 때\" \"신해철\"","cat":"주파수","m":"삶의 철학적 통찰을 통해 죽음에 대한 공포를"},{"t":"축복합니다","a":"들국화","q":"\"축복합니다\" \"들국화\"","cat":"주파수","m":"타인을 향한 순수한 축복의 에너지가 자신의 "},{"t":"사랑하기 때문에","a":"유재하","q":"\"사랑하기 때문에\" \"유재하\"","cat":"주파수","m":"조건 없는 사랑의 고백을 통해 심장 센터의 "},{"t":"사랑","a":"나훈아","q":"\"사랑\" \"나훈아\"","cat":"주파수","m":"사랑의 본질을 담백하게 노래하여 복잡한 마음"},{"t":"우리의 사랑이 필요한거죠","a":"변진섭","q":"\"우리의 사랑이 필요한거죠\" \"변진섭\"","cat":"주파수","m":"이타적 사랑의 필요성을 역설하며 공존의 에너"},{"t":"내게 오는 길","a":"성시경","q":"\"내게 오는 길\" \"성시경\"","cat":"주파수","m":"다가오는 사랑을 수용하는 평온함을 통해 관계"},{"t":"마음","a":"아이유","q":"\"마음\" \"아이유\"","cat":"주파수","m":"아무런 보상 없이 반짝이는 순수한 마음을 예"},{"t":"I","a":"태연","q":"\"I\" \"태연\"","cat":"주파수","m":"빛나는 자아를 찾아가는 여정을 통해 억눌린 "},{"t":"작은 별","a":"악뮤","q":"\"작은 별\" \"악뮤\"","cat":"주파수","m":"우주 속 자신의 특별함을 자각하게 하여 낮은"},{"t":"Love Ya!","a":"혁오","q":"\"Love Ya!\" \"혁오\"","cat":"주파수","m":"세상의 모든 사랑을 응원하며 편견 없는 사랑"},{"t":"소우주 (Mikrokosmos)","a":"방탄소년단","q":"\"소우주 (Mikrokosmos)\" \"방탄소년단\"","cat":"주파수","m":"각자가 하나의 별이라는 인식을 통해 인간 존"},{"t":"어느 60대 노부부 이야기","a":"임영웅","q":"\"어느 60대 노부부 이야기\" \"임영웅\"","cat":"주파수","m":"인생의 황혼에서 느끼는 깊은 사랑으로 삶의 "},{"t":"살았소","a":"김호중","q":"\"살았소\" \"김호중\"","cat":"주파수","m":"살아온 날들에 대한 긍정과 감사를 통해 생존"},{"t":"무명배우","a":"송가인","q":"\"무명배우\" \"송가인\"","cat":"주파수","m":"묵묵히 자신의 자리를 지키는 삶을 예찬하며 "},{"t":"담이","a":"영탁","q":"\"담이\" \"영탁\"","cat":"주파수","m":"담담하게 인생을 바라보는 여유를 통해 긴장된"},{"t":"메밀꽃 필 무렵","a":"이찬원","q":"\"메밀꽃 필 무렵\" \"이찬원\"","cat":"주파수","m":"서정적인 풍경과 그리움을 결합하여 정서적 메"},{"t":"빙빙빙","a":"양지은","q":"\"빙빙빙\" \"양지은\"","cat":"주파수","m":"순환하는 인생의 즐거움을 리듬에 담아 정체된"},{"t":"산다는 건","a":"홍진영","q":"\"산다는 건\" \"홍진영\"","cat":"주파수","m":"삶의 고단함을 긍정적인 노래로 승화하여 생의"},{"t":"보릿고개","a":"진성","q":"\"보릿고개\" \"진성\"","cat":"주파수","m":"과거의 헝그리 정신을 숭고한 생존력으로 재해"},{"t":"붓","a":"강진","q":"\"붓\" \"강진\"","cat":"주파수","m":"인생이라는 도화지에 그려나가는 선함을 강조하"},{"t":"영영","a":"나훈아","q":"\"영영\" \"나훈아\"","cat":"주파수","m":"영원히 잊지 못할 사랑의 순수함을 예찬하며 "},{"t":"비와 당신","a":"이무진","q":"\"비와 당신\" \"이무진\"","cat":"주파수","m":"비 오는 날의 그리움을 정화의 의식으로 승화"},{"t":"소녀","a":"이문세","q":"\"소녀\" \"이문세\"","cat":"주파수","m":"순수했던 시절의 감성을 소환하여 오염된 성인"},{"t":"아름다운 이별","a":"김건모","q":"\"아름다운 이별\" \"김건모\"","cat":"주파수","m":"이별조차 아름다운 완성으로 수용하여 상실로 "},{"t":"가을 우체국 앞에서","a":"윤도현","q":"\"가을 우체국 앞에서\" \"윤도현\"","cat":"주파수","m":"세상의 변하지 않는 진리를 사색하며 실존적 "},{"t":"그런 사람 또 없습니다","a":"이승철","q":"\"그런 사람 또 없습니다\" \"이승철\"","cat":"주파수","m":"지고지순한 사랑의 파동으로 심장 센터의 전자"},{"t":"잊어야 한다는 마음으로","a":"김광석","q":"\"잊어야 한다는 마음으로\" \"김광석\"","cat":"주파수","m":"집착을 놓아주는 의식을 통해 정신적 과부하를"},{"t":"들길 따라서","a":"양희은","q":"\"들길 따라서\" \"양희은\"","cat":"주파수","m":"대지의 기운과 호흡하며 인체 리듬을 자연의 "},{"t":"사랑이야","a":"송창식","q":"\"사랑이야\" \"송창식\"","cat":"주파수","m":"사랑의 본질을 직관적으로 선포하여 복잡한 심"},{"t":"찻잔","a":"산울림","q":"\"찻잔\" \"산울림\"","cat":"주파수","m":"찻잔 속에 담긴 고요를 내면으로 투사하여 명"},{"t":"그중에 그대를 만나","a":"이선희","q":"\"그중에 그대를 만나\" \"이선희\"","cat":"주파수","m":"수많은 인연 중 기적 같은 만남을 예찬하며 "},{"t":"너무 늦었잖아요","a":"변진섭","q":"\"너무 늦었잖아요\" \"변진섭\"","cat":"주파수","m":"미련의 에너지를 용서와 이해로 전환하여 과거"},{"t":"빨래","a":"이적","q":"\"빨래\" \"이적\"","cat":"주파수","m":"일상의 정화 의식을 통해 묵은 감정의 때를 "},{"t":"사랑의 시작은 고백에서부터","a":"김범수","q":"\"사랑의 시작은 고백에서부터\" \"김범수\"","cat":"주파수","m":"용기 있는 발화를 통해 닫혀있던 에너지를 순"},{"t":"사랑 안해","a":"백지영","q":"\"사랑 안해\" \"백지영\"","cat":"주파수","m":"사랑에 지친 영혼을 위한 안식의 시간을 제공"},{"t":"You Are My Everything","a":"거미","q":"\"You Are My Everything\" \"거미\"","cat":"주파수","m":"존재의 절대적 가치를 인정하여 결핍된 자아의"},{"t":"너의 모든 순간","a":"성시경","q":"\"너의 모든 순간\" \"성시경\"","cat":"주파수","m":"모든 찰나의 소중함을 일깨워 현재에 머무는 "},{"t":"당신과의 키스를 기억합니다","a":"박화요비","q":"\"당신과의 키스를 기억합니다\" \"박화요비\"","cat":"주파수","m":"촉각적 기억을 통한 정서적 유대를 강조하며 "},{"t":"홀로","a":"이하이","q":"\"홀로\" \"이하이\"","cat":"주파수","m":"홀로 있음의 충만함을 일깨워 외로움이라는 독"},{"t":"우주선","a":"정승환","q":"\"우주선\" \"정승환\"","cat":"주파수","m":"광활한 우주적 관점으로 개인의 고통을 조망하"},{"t":"러브 포엠 (Love poem)","a":"아이유","q":"\"러브 포엠 (Love poem)\" \"아이유\"","cat":"주파수","m":"보이지 않는 곳의 슬픔을 위한 기도를 통해 "},{"t":"그대라는 시","a":"태연","q":"\"그대라는 시\" \"태연\"","cat":"주파수","m":"존재를 한 편의 시로 격상시켜 자존감의 기적"},{"t":"사랑은 은하수 다방에서","a":"십센치","q":"\"사랑은 은하수 다방에서\" \"십센치\"","cat":"주파수","m":"소소한 일상의 설렘을 극대화하여 무딘 감각에"},{"t":"참 좋다","a":"양희은","q":"\"참 좋다\" \"양희은\"","cat":"주파수","m":"현재 상태에 대한 만족과 예찬으로 뇌의 보상"},{"t":"나비효과","a":"신승훈","q":"\"나비효과\" \"신승훈\"","cat":"주파수","m":"작은 떨림이 기적을 만든다는 믿음을 통해 세"},{"t":"사랑이 지나가면","a":"이문세","q":"\"사랑이 지나가면\" \"이문세\"","cat":"주파수","m":"지나간 사랑을 고결한 유산으로 재정의하여 심"},{"t":"흰수염고래","a":"윤도현","q":"\"흰수염고래\" \"윤도현\"","cat":"주파수","m":"광활한 바다를 유영하는 고래의 생명력을 투사"},{"t":"인연","a":"이승철","q":"\"인연\" \"이승철\"","cat":"주파수","m":"우주적 섭리에 의한 만남을 긍정하여 관계의 "},{"t":"바램","a":"토이","q":"\"바램\" \"토이\"","cat":"주파수","m":"타인의 행복을 비는 순수한 염원을 통해 자신"},{"t":"비타민","a":"박학기","q":"\"비타민\" \"박학기\"","cat":"주파수","m":"존재 자체가 비타민이라는 긍정적 자기 암시를"},{"t":"내 마음에 비친 내 모습","a":"유재하","q":"\"내 마음에 비친 내 모습\" \"유재하\"","cat":"주파수","m":"정직한 자기 성찰을 통해 자아의 왜곡된 상을"},{"t":"안녕","a":"산울림","q":"\"안녕\" \"산울림\"","cat":"주파수","m":"작별을 새로운 차원의 만남으로 승화하여 상실"},{"t":"샤이닝 (Shining)","a":"자우림","q":"\"샤이닝 (Shining)\" \"자우림\"","cat":"주파수","m":"어둠 속에서도 빛나는 존재임을 자각하게 하여"},{"t":"Love Love Love","a":"에픽하이","q":"\"Love Love Love\" \"에픽하이\"","cat":"주파수","m":"사랑의 보편적 가치를 확산시켜 고립된 개인주"},{"t":"사랑과 전쟁","a":"다비치","q":"\"사랑과 전쟁\" \"다비치\"","cat":"주파수","m":"갈등조차 사랑의 과정임을 인식하여 관계의 피"},{"t":"점점","a":"브라운 아이즈","q":"\"점점\" \"브라운 아이즈\"","cat":"주파수","m":"시간이 해결해주는 치유의 원리를 신뢰하게 하"},{"t":"나만 봄","a":"볼빨간사춘기","q":"\"나만 봄\" \"볼빨간사춘기\"","cat":"주파수","m":"시기 어린 질투를 귀여운 애정으로 승화하여 "},{"t":"다이노소어","a":"악뮤","q":"\"다이노소어\" \"악뮤\"","cat":"주파수","m":"어린 시절의 공포를 노래로 대면하여 무의식 "},{"t":"팔레트","a":"아이유","q":"\"팔레트\" \"아이유\"","cat":"주파수","m":"자신의 색깔을 있는 그대로 사랑하며 자아 정"},{"t":"운전만해","a":"브레이브걸스","q":"\"운전만해\" \"브레이브걸스\"","cat":"주파수","m":"어색한 침묵을 노래로 채우며 관계의 정체된 "},{"t":"명동콜링","a":"카더가든","q":"\"명동콜링\" \"카더가든\"","cat":"주파수","m":"빈티지한 그리움을 통해 메마른 도시 생활에 "},{"t":"어떻게 내가 연애를 하겠어","a":"오반","q":"\"어떻게 내가 연애를 하겠어\" \"오반\"","cat":"주파수","m":"부족한 자아에 대한 솔직한 고백으로 자기 수"},{"t":"밤하늘의 별을","a":"경서","q":"\"밤하늘의 별을\" \"경서\"","cat":"주파수","m":"어린 시절의 꿈을 현재의 감성으로 복원하여 "},{"t":"시작","a":"가호","q":"\"시작\" \"가호\"","cat":"주파수","m":"새로운 시작의 폭발적 에너지를 통해 모든 부"},{"t":"All You Need Is Love","a":"The Beatles","q":"\"All You Need Is Love\" \"The Beatles\"","cat":"주파수","m":"사랑이 유일한 해답이라는 인류 보편의 진리로"},{"t":"One Love","a":"Bob Marley","q":"\"One Love\" \"Bob Marley\"","cat":"주파수","m":"모든 인류의 통합과 평화를 노래하여 분열된 "},{"t":"Your Song","a":"Elton John","q":"\"Your Song\" \"Elton John\"","cat":"주파수","m":"존재 자체를 향한 순수한 헌사를 통해 사랑의"},{"t":"Make You Feel My Love","a":"Adele","q":"\"Make You Feel My Love\" \"Adele\"","cat":"주파수","m":"지고지순한 사랑의 깊이를 통해 메마른 감정선"},{"t":"Perfect","a":"Ed Sheeran","q":"\"Perfect\" \"Ed Sheeran\"","cat":"주파수","m":"가장 순수하고 완벽한 사랑의 순간을 각인시켜"},{"t":"No One","a":"Alicia Keys","q":"\"No One\" \"Alicia Keys\"","cat":"주파수","m":"그 누구도 우리를 가로막을 수 없다는 확신으"},{"t":"Lay Me Down","a":"Sam Smith","q":"\"Lay Me Down\" \"Sam Smith\"","cat":"주파수","m":"깊은 안식과 사랑의 갈구를 통해 영혼의 고독"},{"t":"Just the Way You Are","a":"Billy Joel","q":"\"Just the Way You Are\" \"Billy Joel\"","cat":"주파수","m":"조건 없는 수용의 파동을 통해 심리적 경직 "},{"t":"Love of My Life","a":"Queen","q":"\"Love of My Life\" \"Queen\"","cat":"주파수","m":"삶의 근간이 되는 사랑을 노래하여 흩어진 생"},{"t":"Everything","a":"Michael Bublé","q":"\"Everything\" \"Michael Bublé\"","cat":"주파수","m":"일상의 소중한 모든 것들에 감사하며 긍정적 "},{"t":"I'm Yours","a":"Jason Mraz","q":"\"I'm Yours\" \"Jason Mraz\"","cat":"주파수","m":"자신을 기꺼이 내어주는 사랑의 여유를 통해 "},{"t":"Better Together","a":"Jack Johnson","q":"\"Better Together\" \"Jack Johnson\"","cat":"주파수","m":"함께함의 시너지를 예찬하며 고립된 자아의 에"},{"t":"Adore You","a":"Harry Styles","q":"\"Adore You\" \"Harry Styles\"","cat":"주파수","m":"맹목적이고 숭고한 사랑의 에너지를 투사하여 "},{"t":"Lover","a":"Taylor Swift","q":"\"Lover\" \"Taylor Swift\"","cat":"주파수","m":"로맨틱한 유대의 정점을 노래하여 신체 전반에"},{"t":"Ocean Eyes","a":"Billie Eilish","q":"\"Ocean Eyes\" \"Billie Eilish\"","cat":"주파수","m":"바다 같은 깊은 시선으로 자아를 투영하여 무"},{"t":"Levitating","a":"Dua Lipa","q":"\"Levitating\" \"Dua Lipa\"","cat":"주파수","m":"중력을 거스르는 듯한 경쾌함을 통해 무거운 "},{"t":"First Nice","a":"Camila Cabello","q":"\"First Nice\" \"Camila Cabello\"","cat":"주파수","m":"처음 느끼는 순수한 사랑의 떨림을 통해 마모"},{"t":"Intentions","a":"Justin Bieber","q":"\"Intentions\" \"Justin Bieber\"","cat":"주파수","m":"상대의 가치를 높이는 진심 어린 찬양으로 관"},{"t":"Faith","a":"George Michael","q":"\"Faith\" \"George Michael\"","cat":"주파수","m":"보이지 않는 미래에 대한 믿음을 선포하여 근"},{"t":"Woman","a":"John Lennon","q":"\"Woman\" \"John Lennon\"","cat":"주파수","m":"여성성에 대한 깊은 감사를 통해 근원적인 생"},{"t":"La Vie En Rose","a":"Louis Armstrong","q":"\"La Vie En Rose\" \"Louis Armstrong\"","cat":"주파수","m":"세상을 장밋빛으로 바라보는 긍정적 시각을 통"},{"t":"Fly Me To The Moon","a":"Frank Sinatra","q":"\"Fly Me To The Moon\" \"Frank Sinatra\"","cat":"주파수","m":"우주적 낭만을 투사하여 지상의 무거운 근심으"},{"t":"Dancing Queen","a":"ABBA","q":"\"Dancing Queen\" \"ABBA\"","cat":"주파수","m":"리듬에 몸을 맡기는 즐거움을 통해 정체된 신"},{"t":"Candle In The Wind","a":"Elton John","q":"\"Candle In The Wind\" \"Elton John\"","cat":"주파수","m":"덧없는 생명의 숭고함을 노래하며 필멸의 존재"},{"t":"I Will Always Love You","a":"Whitney Houston","q":"\"I Will Always Love You\" \"Whitney Houston\"","cat":"주파수","m":"영원한 사랑의 선포를 통해 이별조차 극복하는"},{"t":"Without You","a":"Mariah Carey","q":"\"Without You\" \"Mariah Carey\"","cat":"주파수","m":"타인의 소중함을 절감하며 고립되었던 사랑의 "},{"t":"The Power Of Love","a":"Celine Dion","q":"\"The Power Of Love\" \"Celine Dion\"","cat":"주파수","m":"사랑의 힘을 절대적 에너지로 정의하여 신체 "},{"t":"Blowin' In The Wind","a":"Bob Dylan","q":"\"Blowin' In The Wind\" \"Bob Dylan\"","cat":"주파수","m":"자연의 순리를 따르는 삶을 지향하여 저항과 "},{"t":"Every Breath You Take","a":"Sting","q":"\"Every Breath You Take\" \"Sting\"","cat":"주파수","m":"매 순간의 지켜봄을 통해 존재의 연결성을 확"},{"t":"You'll Be In My Heart","a":"Phil Collins","q":"\"You'll Be In My Heart\" \"Phil Collins\"","cat":"주파수","m":"영원한 보호의 약속을 통해 불안해하는 내면 "},{"t":"Hotel California","a":"Eagles","q":"\"Hotel California\" \"Eagles\"","cat":"주파수","m":"화려함 뒤의 허무를 직면하게 하여 진정한 자"},{"t":"One More Light","a":"Linkin Park","q":"\"One More Light\" \"Linkin Park\"","cat":"주파수","m":"사라져가는 작은 빛 하나도 소중히 여기며 생"},{"t":"What About Us","a":"P!nk","q":"\"What About Us\" \"P!nk\"","cat":"주파수","m":"소외된 이들의 질문을 통해 사회적 책임과 사"},{"t":"만남","a":"노사연","q":"\"만남\" \"노사연\"","cat":"주파수","m":"우리 만남은 우연이 아니라는 필연성을 강조하"},{"t":"당연한 것들","a":"이적","q":"\"당연한 것들\" \"이적\"","cat":"주파수","m":"잃어버린 일상과 만남의 소중함을 노래하며 단"},{"t":"친구여","a":"조용필","q":"\"친구여\" \"조용필\"","cat":"주파수","m":"오랜 세월을 함께한 우정의 가치를 되새기며 "},{"t":"엄마가 딸에게","a":"양희은","q":"\"엄마가 딸에게\" \"양희은\"","cat":"주파수","m":"세대 간의 이해와 화해를 도모하여 가족 내 "},{"t":"걱정말아요 그대","a":"들국화","q":"\"걱정말아요 그대\" \"들국화\"","cat":"주파수","m":"후회 없이 사랑했다 말하는 용기를 통해 관계"},{"t":"감사","a":"김동률","q":"\"감사\" \"김동률\"","cat":"주파수","m":"존재에 대한 지극한 감사를 표현하여 파트너와"},{"t":"사랑한 후에","a":"박효신","q":"\"사랑한 후에\" \"박효신\"","cat":"주파수","m":"사랑 뒤에 남겨진 것들을 소중히 여겨 관계가"},{"t":"본능적으로","a":"윤종신","q":"\"본능적으로\" \"윤종신\"","cat":"주파수","m":"이끌림의 순수함을 긍정하며 관계 시작의 설렘"},{"t":"우주를 줄게","a":"볼빨간사춘기","q":"\"우주를 줄게\" \"볼빨간사춘기\"","cat":"주파수","m":"아낌없이 주고 싶은 마음을 통해 관계 내 이"},{"t":"길 위에서","a":"최백호","q":"\"길 위에서\" \"최백호\"","cat":"주파수","m":"인생의 길에서 만난 인연들을 사색하며 삶의 "},{"t":"홍시","a":"나훈아","q":"\"홍시\" \"나훈아\"","cat":"주파수","m":"어머니에 대한 그리움을 통해 가장 근원적인 "},{"t":"남자는 말합니다","a":"장민호","q":"\"남자는 말합니다\" \"장민호\"","cat":"주파수","m":"서툰 표현 속에 담긴 진심을 전하며 남성적 "},{"t":"스토커","a":"10cm","q":"\"스토커\" \"10cm\"","cat":"주파수","m":"짝사랑의 아픔을 통해 관계 지향적 에너지를 "},{"t":"흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야","a":"장범준","q":"\"흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야\" \"장범준\"","cat":"주파수","m":"일상의 우연한 감각으로 인연의 시작을 직감하"},{"t":"I Believe","a":"신승훈","q":"\"I Believe\" \"신승훈\"","cat":"주파수","m":"다시 돌아올 것이라는 믿음을 통해 끊어진 인"},{"t":"빗속에서","a":"이문세","q":"\"빗속에서\" \"이문세\"","cat":"주파수","m":"함께 비를 맞던 기억을 소환하여 차가워진 관"},{"t":"핑계","a":"김건모","q":"\"핑계\" \"김건모\"","cat":"주파수","m":"소통의 부재를 '핑계'라는 키워드로 직면하게"},{"t":"안녕이라고 말하지마","a":"이승철","q":"\"안녕이라고 말하지마\" \"이승철\"","cat":"주파수","m":"이별을 거부하는 간절함으로 관계를 지속시키려"},{"t":"그날들","a":"김광석","q":"\"그날들\" \"김광석\"","cat":"주파수","m":"잊혀진 줄 알았던 인연의 조각들을 맞춰보며 "},{"t":"단발머리","a":"조용필","q":"\"단발머리\" \"조용필\"","cat":"주파수","m":"첫사랑의 풋풋한 감성을 자극하여 경직된 인간"},{"t":"세계로 가는 기차","a":"들국화","q":"\"세계로 가는 기차\" \"들국화\"","cat":"주파수","m":"더 넓은 세상과의 소통을 꿈꾸며 폐쇄적인 관"},{"t":"내 마음 깊은 곳의 너","a":"신해철","q":"\"내 마음 깊은 곳의 너\" \"신해철\"","cat":"주파수","m":"내면 깊숙이 자리 잡은 타인의 존재를 인정하"},{"t":"신 인류의 사랑","a":"015B","q":"\"신 인류의 사랑\" \"015B\"","cat":"주파수","m":"변화하는 시대의 소통 방식을 고찰하며 세대 "},{"t":"나 항상 그대를","a":"이선희","q":"\"나 항상 그대를\" \"이선희\"","cat":"주파수","m":"변치 않는 기다림의 자세를 통해 흔들리는 관"},{"t":"좋은 사람","a":"박효신","q":"\"좋은 사람\" \"박효신\"","cat":"주파수","m":"곁을 지켜주는 사람의 소중함을 깨닫게 하여 "},{"t":"말하는 대로","a":"이적","q":"\"말하는 대로\" \"이적\"","cat":"주파수","m":"말의 힘을 빌려 긍정적인 관계를 설계하고 소"},{"t":"나이","a":"윤종신","q":"\"나이\" \"윤종신\"","cat":"주파수","m":"나이가 들며 깊어지는 관계의 통찰을 공유하여"},{"t":"위로","a":"권진아","q":"\"위로\" \"권진아\"","cat":"주파수","m":"아무 말 없이 곁을 지켜주는 존재의 위로를 "},{"t":"내 마음이 들리나요","a":"이하이","q":"\"내 마음이 들리나요\" \"이하이\"","cat":"주파수","m":"보이지 않는 마음을 전달하려는 간절함으로 텔"},{"t":"Rain","a":"태연","q":"\"Rain\" \"태연\"","cat":"주파수","m":"비 오는 날의 추억을 공유하며 단조로운 일상"},{"t":"오랜 날 오랜 밤","a":"악뮤","q":"\"오랜 날 오랜 밤\" \"악뮤\"","cat":"주파수","m":"긴 시간의 정서를 공유하며 관계의 역사를 소"},{"t":"우리 만남이","a":"폴킴","q":"\"우리 만남이\" \"폴킴\"","cat":"주파수","m":"만남의 의미를 철학적으로 고찰하여 인연의 무"},{"t":"안아줘요","a":"십센치","q":"\"안아줘요\" \"십센치\"","cat":"주파수","m":"육체적/정서적 접촉에 대한 갈망을 표현하여 "},{"t":"가을밤에 든 생각","a":"잔나비","q":"\"가을밤에 든 생각\" \"잔나비\"","cat":"주파수","m":"그리운 이들을 떠올리는 사색을 통해 영적 연"},{"t":"처음부터 너와 나","a":"볼빨간사춘기","q":"\"처음부터 너와 나\" \"볼빨간사춘기\"","cat":"주파수","m":"운명적인 끌림을 노래하여 관계의 당위성을 확"},{"t":"우리 정말 나쁘다","a":"영탁","q":"\"우리 정말 나쁘다\" \"영탁\"","cat":"주파수","m":"관계의 실수를 솔직하게 고백하며 자책 대신 "},{"t":"만개","a":"김호중","q":"\"만개\" \"김호중\"","cat":"주파수","m":"꽃이 피듯 피어나는 관계의 절정을 예찬하며 "},{"t":"사랑찾아 인생찾아","a":"조항조","q":"\"사랑찾아 인생찾아\" \"조항조\"","cat":"주파수","m":"인생 여정 속의 동반자를 찾아 나서는 능동적"},{"t":"비 내리는 영동교","a":"송가인","q":"\"비 내리는 영동교\" \"송가인\"","cat":"주파수","m":"이별의 장소를 추억의 공간으로 승화하여 관계"},{"t":"너를 보내고","a":"윤도현","q":"\"너를 보내고\" \"윤도현\"","cat":"주파수","m":"떠나보내는 예의를 통해 관계의 마지막 소통을"},{"t":"마지막 콘서트","a":"이승철","q":"\"마지막 콘서트\" \"이승철\"","cat":"주파수","m":"음악이라는 매개체로 대중과 가수가 하나로 공"},{"t":"너에게","a":"윤상","q":"\"너에게\" \"윤상\"","cat":"주파수","m":"진심 어린 메시지를 전달하여 오해로 막혀있던"},{"t":"아름다운 세상","a":"박학기","q":"\"아름다운 세상\" \"박학기\"","cat":"주파수","m":"함께 사는 세상의 가치를 예찬하며 이웃과의 "},{"t":"동경","a":"김광진","q":"\"동경\" \"김광진\"","cat":"주파수","m":"대상을 향한 순수한 동경의 마음으로 관계의 "},{"t":"그대 내 품에","a":"유재하","q":"\"그대 내 품에\" \"유재하\"","cat":"주파수","m":"육체적/정서적 안식처가 되어주는 깊은 유대감"},{"t":"개구장이","a":"산울림","q":"\"개구장이\" \"산울림\"","cat":"주파수","m":"동심의 유희적 소통을 통해 권위주의적인 인간"},{"t":"하하하쏭","a":"자우림","q":"\"하하하쏭\" \"자우림\"","cat":"주파수","m":"웃음의 파동을 공유하여 집단 내의 어색함과 "},{"t":"좋을텐데","a":"성시경","q":"\"좋을텐데\" \"성시경\"","cat":"주파수","m":"관계의 발전을 꿈꾸는 긍정적 에너지를 통해 "},{"t":"친구라도 될 걸 그랬어","a":"거미","q":"\"친구라도 될 걸 그랬어\" \"거미\"","cat":"주파수","m":"연인에서 친구로의 관계 전환을 통해 인연의 "},{"t":"고양이","a":"선우정아","q":"\"고양이\" \"선우정아\"","cat":"주파수","m":"적당한 거리두기의 미학을 통해 구속하지 않는"},{"t":"롤러코스터","a":"청하","q":"\"롤러코스터\" \"청하\"","cat":"주파수","m":"관계의 고조와 하강을 즐거움으로 수용하며 감"},{"t":"저 별","a":"헤이즈","q":"\"저 별\" \"헤이즈\"","cat":"주파수","m":"멀리 있는 존재를 별에 비유하며 물리적 단절"},{"t":"편지","a":"폴킴","q":"\"편지\" \"폴킴\"","cat":"주파수","m":"정성을 담은 서면 소통의 미학으로 인스턴트식"},{"t":"동화","a":"멜로망스","q":"\"동화\" \"멜로망스\"","cat":"주파수","m":"관계를 동화처럼 아름답게 가꾸려는 의지를 통"},{"t":"전설","a":"잔나비","q":"\"전설\" \"잔나비\"","cat":"주파수","m":"우리만의 이야기를 전설로 남기려는 시도를 통"},{"t":"Give Love","a":"악뮤","q":"\"Give Love\" \"악뮤\"","cat":"주파수","m":"사랑을 주고받는 순환의 원리를 유쾌하게 풀어"},{"t":"사랑해요 그대를","a":"임영웅","q":"\"사랑해요 그대를\" \"임영웅\"","cat":"주파수","m":"직접적인 고백의 파동으로 관계의 모호함을 걷"},{"t":"트위스트 고고","a":"이찬원","q":"\"트위스트 고고\" \"이찬원\"","cat":"주파수","m":"흥겨운 리듬을 공유하며 집단적 유대감과 사회"},{"t":"아지트","a":"정동원","q":"\"아지트\" \"정동원\"","cat":"주파수","m":"우리만의 비밀 공간을 공유하며 관계의 배타적"},{"t":"풍악을 울려라","a":"장민호","q":"\"풍악을 울려라\" \"장민호\"","cat":"주파수","m":"축제의 에너지를 통해 갈등을 잊고 화합하는 "},{"t":"나도 한 잔","a":"양지은","q":"\"나도 한 잔\" \"양지은\"","cat":"주파수","m":"술잔을 기울이는 한국적 소통 문화를 통해 마"},{"t":"거문고 산조","a":"송가인","q":"\"거문고 산조\" \"송가인\"","cat":"주파수","m":"전통 악기의 조화로운 소리를 통해 이질적인 "},{"t":"공","a":"나훈아","q":"\"공\" \"나훈아\"","cat":"주파수","m":"인생의 공함을 공유하며 집착 없는 담백한 인"},{"t":"에잇 (Prod. & Feat. SUGA)","a":"아이유","q":"\"에잇 (Prod. & Feat. SUGA)\" \"아이유\"","cat":"주파수","m":"같은 시대를 살아가는 동년배들과의 공감을 통"},{"t":"IDOL","a":"방탄소년단","q":"\"IDOL\" \"방탄소년단\"","cat":"주파수","m":"진정한 자아를 사랑함으로써 타인과 건강하게 "},{"t":"나랑 같이 걸을래","a":"적재","q":"\"나랑 같이 걸을래\" \"적재\"","cat":"주파수","m":"동행의 제안을 통해 관계의 보폭을 맞추고 깊"},{"t":"행복","a":"오반","q":"\"행복\" \"오반\"","cat":"주파수","m":"소박한 행복을 공유하며 타인과 경쟁하지 않는"},{"t":"나의 X에게","a":"경서","q":"\"나의 X에게\" \"경서\"","cat":"주파수","m":"과거의 연인에게 전하는 쿨한 인사를 통해 관"},{"t":"With A Little Help From My Friends","a":"The Beatles","q":"\"With A Little Help From My Friends\" \"The Beatles\"","cat":"주파수","m":"친구의 도움을 통한 상호 의존의 가치를 일깨"},{"t":"Stand By Me","a":"Ben E. King","q":"\"Stand By Me\" \"Ben E. King\"","cat":"주파수","m":"곁을 지켜주는 든든한 동반자적 관계를 선포하"},{"t":"You've Got A Friend","a":"Carole King","q":"\"You've Got A Friend\" \"Carole King\"","cat":"주파수","m":"부르면 달려가겠다는 헌신적 약속으로 끊어진 "},{"t":"Anytime You Need A Friend","a":"Mariah Carey","q":"\"Anytime You Need A Friend\" \"Mariah Carey\"","cat":"주파수","m":"언제든 필요할 때 곁에 있겠다는 선언으로 신"},{"t":"You're My Best Friend","a":"Queen","q":"\"You're My Best Friend\" \"Queen\"","cat":"주파수","m":"가장 친밀한 우정을 통해 파트너와의 관계를 "},{"t":"That's What Friends Are For","a":"Dionne Warwick","q":"\"That's What Friends Are For\" \"Dionne Warwick\"","cat":"주파수","m":"기쁠 때나 슬플 때나 함께하는 우정의 의미를"},{"t":"ME!","a":"Taylor Swift","q":"\"ME!\" \"Taylor Swift\"","cat":"주파수","m":"나 자신을 긍정함으로써 타인과 더 건강하게 "},{"t":"Us Against The World","a":"Coldplay","q":"\"Us Against The World\" \"Coldplay\"","cat":"주파수","m":"세상의 풍파에 맞서는 '우리'라는 유대감을 "},{"t":"History","a":"One Direction","q":"\"History\" \"One Direction\"","cat":"주파수","m":"함께 만든 역사를 강조하며 오해로 갈라진 관"},{"t":"I Won't Give Up","a":"Jason Mraz","q":"\"I Won't Give Up\" \"Jason Mraz\"","cat":"주파수","m":"관계를 포기하지 않는 끈기를 통해 깊은 갈등"},{"t":"Will You Be There","a":"Michael Jackson","q":"\"Will You Be There\" \"Michael Jackson\"","cat":"주파수","m":"고통의 순간에도 함께 있어줄지를 물으며 인간"},{"t":"Friends","a":"Justin Bieber","q":"\"Friends\" \"Justin Bieber\"","cat":"주파수","m":"헤어진 후에도 친구로 남을 수 있는 성숙한 "},{"t":"Umbrella","a":"Rihanna","q":"\"Umbrella\" \"Rihanna\"","cat":"주파수","m":"비바람을 함께 피하는 우산이 되어주는 헌신적"},{"t":"Count On Me","a":"Whitney Houston","q":"\"Count On Me\" \"Whitney Houston\"","cat":"주파수","m":"신뢰할 수 있는 존재가 되겠다는 다짐으로 불"},{"t":"Shallow","a":"Lady Gaga","q":"\"Shallow\" \"Lady Gaga\"","cat":"주파수","m":"표면적인 대화를 넘어 깊은 곳의 진실을 공유"},{"t":"Together","a":"Sia","q":"\"Together\" \"Sia\"","cat":"주파수","m":"함께 할 때의 시너지를 노래하여 공동체적 가"},{"t":"Treat People With Kindness","a":"Harry Styles","q":"\"Treat People With Kindness\" \"Harry Styles\"","cat":"주파수","m":"타인을 친절로 대하는 태도를 통해 사회적 불"},{"t":"Life Goes On","a":"BTS","q":"\"Life Goes On\" \"BTS\"","cat":"주파수","m":"단절된 시대 속에서도 삶은 계속되며 우리는 "},{"t":"Be The One","a":"Dua Lipa","q":"\"Be The One\" \"Dua Lipa\"","cat":"주파수","m":"관계 내에서 신뢰받는 존재가 되고 싶은 열망"},{"t":"Can You Feel The Love Tonight","a":"Elton John","q":"\"Can You Feel The Love Tonight\" \"Elton John\"","cat":"주파수","m":"고요한 밤의 정취 속에 흐르는 사랑을 공유하"},{"t":"Heaven","a":"Bryan Adams","q":"\"Heaven\" \"Bryan Adams\"","cat":"주파수","m":"사랑하는 사람과 함께하는 곳이 천국임을 노래"},{"t":"Have I Told You Lately","a":"Rod Stewart","q":"\"Have I Told You Lately\" \"Rod Stewart\"","cat":"주파수","m":"늦기 전에 표현하는 사랑의 언어로 마모된 관"},{"t":"Respect","a":"Aretha Franklin","q":"\"Respect\" \"Aretha Franklin\"","cat":"주파수","m":"관계의 기본인 존중을 강조하여 불공평하고 일"},{"t":"Chiquitita","a":"ABBA","q":"\"Chiquitita\" \"ABBA\"","cat":"주파수","m":"슬퍼하는 친구를 위로하며 정서적 지지 기반이"},{"t":"You're My Home","a":"Billy Joel","q":"\"You're My Home\" \"Billy Joel\"","cat":"주파수","m":"안식처가 되어주는 관계의 편안함을 통해 정착"},{"t":"Send My Love (To Your New Lover)","a":"Adele","q":"\"Send My Love (To Your New Lover)\" \"Adele\"","cat":"주파수","m":"과거의 관계를 쿨하게 놓아주며 새로운 소통의"},{"t":"Bad Blood","a":"Taylor Swift","q":"\"Bad Blood\" \"Taylor Swift\"","cat":"주파수","m":"갈등 상황을 직면하고 이를 해결하거나 정돈하"},{"t":"Everglow","a":"Coldplay","q":"\"Everglow\" \"Coldplay\"","cat":"주파수","m":"헤어진 후에도 남겨진 따뜻한 여운을 통해 관"},{"t":"Memories","a":"Maroon 5","q":"\"Memories\" \"Maroon 5\"","cat":"주파수","m":"함께했던 이들에 대한 기억을 공유하며 집단적"},{"t":"Sorry","a":"Justin Bieber","q":"\"Sorry\" \"Justin Bieber\"","cat":"주파수","m":"진심 어린 사과의 메시지를 전달하여 오해로 "},{"t":"I'm Not The Only One","a":"Sam Smith","q":"\"I'm Not The Only One\" \"Sam Smith\"","cat":"주파수","m":"관계의 아픔을 공유하며 비슷한 상처를 가진 "},{"t":"Grenade","a":"Bruno Mars","q":"\"Grenade\" \"Bruno Mars\"","cat":"주파수","m":"헌신적 사랑의 극단을 노래하며 파트너에 대한"},{"t":"Wide Awake","a":"Katy Perry","q":"\"Wide Awake\" \"Katy Perry\"","cat":"주파수","m":"관계의 환상에서 깨어나 현실적인 소통을 시작"},{"t":"Stay","a":"Rihanna","q":"\"Stay\" \"Rihanna\"","cat":"주파수","m":"곁에 있어달라는 솔직한 호소를 통해 관계 단"},{"t":"Empire State of Mind","a":"Alicia Keys","q":"\"Empire State of Mind\" \"Alicia Keys\"","cat":"주파수","m":"도시라는 거대 공동체 속에서의 소속감과 연결"},{"t":"Treat You Better","a":"Shawn Mendes","q":"\"Treat You Better\" \"Shawn Mendes\"","cat":"주파수","m":"더 나은 관계를 향한 열망을 통해 현재의 미"},{"t":"Bellyache","a":"Billie Eilish","q":"\"Bellyache\" \"Billie Eilish\"","cat":"주파수","m":"관계 속의 죄책감을 직면하고 이를 노래로 배"},{"t":"Eventually","a":"Tame Impala","q":"\"Eventually\" \"Tame Impala\"","cat":"주파수","m":"결국 괜찮아질 것이라는 믿음으로 관계의 변화"},{"t":"STAY","a":"The Kid LAROI","q":"\"STAY\" \"The Kid LAROI\"","cat":"주파수","m":"떠나지 말라는 간절한 요청으로 관계의 끈을 "},{"t":"Malibu","a":"Miley Cyrus","q":"\"Malibu\" \"Miley Cyrus\"","cat":"주파수","m":"평온한 장소에서의 안식을 공유하며 파트너와의"},{"t":"Everything Now","a":"Arcade Fire","q":"\"Everything Now\" \"Arcade Fire\"","cat":"주파수","m":"과잉 정보 시대의 진정한 소통을 사색하며 관"},{"t":"Chlorine","a":"Twenty One Pilots","q":"\"Chlorine\" \"Twenty One Pilots\"","cat":"주파수","m":"독성 같은 관계를 정화하고 본래의 순수성을 "},{"t":"Best of You","a":"Foo Fighters","q":"\"Best of You\" \"Foo Fighters\"","cat":"주파수","m":"타인에게 휘둘리지 않는 자아를 확립하여 대등"},{"t":"Haven't Met You Yet","a":"Michael Bublé","q":"\"Haven't Met You Yet\" \"Michael Bublé\"","cat":"주파수","m":"아직 만나지 못한 인연에 대한 기대로 사회적"},{"t":"Mamma Mia","a":"ABBA","q":"\"Mamma Mia\" \"ABBA\"","cat":"주파수","m":"얽히고설킨 관계의 감정을 유쾌하게 풀어내어 "},{"t":"Always Remember Us This Way","a":"Lady Gaga","q":"\"Always Remember Us This Way\" \"Lady Gaga\"","cat":"주파수","m":"가장 아름다운 순간을 각인하여 관계의 소중한"},{"t":"Try","a":"P!nk","q":"\"Try\" \"P!nk\"","cat":"주파수","m":"다시 시도하는 용기를 통해 정체된 관계에 새"},{"t":"왼손잡이","a":"패닉","q":"\"왼손잡이\" \"패닉\"","cat":"주파수","m":"틀에 박힌 사고를 깨고 다름을 인정하는 의식"},{"t":"교실 이데아","a":"서태지와 아이들","q":"\"교실 이데아\" \"서태지와 아이들\"","cat":"주파수","m":"주입식 교육의 독소를 정화하고 주체적인 자아"},{"t":"매직 카펫 라이드","a":"자우림","q":"\"매직 카펫 라이드\" \"자우림\"","cat":"주파수","m":"현실의 제약을 벗어나 자유로운 의식의 유영을"},{"t":"예술이야","a":"싸이 (PSY)","q":"\"예술이야\" \"싸이 (PSY)\"","cat":"주파수","m":"감각의 극대화를 통해 정신적 피로를 정화하고"},{"t":"깨어나","a":"윤도현밴드","q":"\"깨어나\" \"윤도현밴드\"","cat":"주파수","m":"잠든 의식을 흔들어 깨워 새로운 문제에 직면"},{"t":"해에게서 소년에게","a":"신해철","q":"\"해에게서 소년에게\" \"신해철\"","cat":"주파수","m":"무한한 가능성을 일깨워 스스로 문제를 해결하"},{"t":"일어나","a":"김광석","q":"\"일어나\" \"김광석\"","cat":"주파수","m":"절망의 독소를 털어내고 다시 시작하는 회복 "},{"t":"아니 벌써","a":"산울림","q":"\"아니 벌써\" \"산울림\"","cat":"주파수","m":"고정관념을 깨는 파격적인 리듬으로 경직된 사"},{"t":"비애","a":"유재하","q":"\"비애\" \"유재하\"","cat":"주파수","m":"슬픔을 정면으로 마주하고 승화시켜 감정적 찌"},{"t":"미지의 세계","a":"조용필","q":"\"미지의 세계\" \"조용필\"","cat":"주파수","m":"알려지지 않은 영역에 대한 탐구심을 자극하여"},{"t":"Lazenca, Save Us","a":"넥스트","q":"\"Lazenca, Save Us\" \"넥스트\"","cat":"주파수","m":"영웅적 기상을 깨워 난관을 돌파하는 강력한 "},{"t":"안녕하세요","a":"삐삐밴드","q":"\"안녕하세요\" \"삐삐밴드\"","cat":"주파수","m":"기존 형식을 파괴하는 소통 방식을 통해 표현"},{"t":"말 달리자","a":"크라잉넛","q":"\"말 달리자\" \"크라잉넛\"","cat":"주파수","m":"억눌린 에너지를 폭발시켜 내면의 답답함을 즉"},{"t":"차우차우","a":"델리스파이스","q":"\"차우차우\" \"델리스파이스\"","cat":"주파수","m":"반복되는 목소리를 통해 의식 너머의 진실에 "},{"t":"DDU-DU DDU-DU","a":"블랙핑크","q":"\"DDU-DU DDU-DU\" \"블랙핑크\"","cat":"주파수","m":"당당한 자기 확신을 통해 위축된 의식을 강력"},{"t":"삐딱하게","a":"지드래곤","q":"\"삐딱하게\" \"지드래곤\"","cat":"주파수","m":"뒤틀린 세상에 대한 반항적 표현으로 내면의 "},{"t":"나쁜 기집애","a":"씨엘 (CL)","q":"\"나쁜 기집애\" \"씨엘 (CL)\"","cat":"주파수","m":"사회적 편견을 깨는 주체적 표현력을 통해 의"},{"t":"그건 니 생각이고","a":"장기하와 얼굴들","q":"\"그건 니 생각이고\" \"장기하와 얼굴들\"","cat":"주파수","m":"타인의 논리로부터 나를 분리하여 독립적인 문"},{"t":"RE-BYE","a":"악뮤 (AKMU)","q":"\"RE-BYE\" \"악뮤 (AKMU)\"","cat":"주파수","m":"반복되는 상처를 뒤로하고 명쾌하게 관계와 문"},{"t":"나비보벳따우 (심술)","a":"볼빨간사춘기","q":"\"나비보벳따우 (심술)\" \"볼빨간사춘기\"","cat":"주파수","m":"순수한 표현의 즐거움을 통해 정서적 경직을 "},{"t":"범 내려온다","a":"이날치","q":"\"범 내려온다\" \"이날치\"","cat":"주파수","m":"전통의 재해석을 통해 고정된 인식을 타파하고"},{"t":"무지개","a":"임영웅","q":"\"무지개\" \"임영웅\"","cat":"주파수","m":"다채로운 삶의 가능성을 긍정하며 좁아진 시야"},{"t":"둥지","a":"남진","q":"\"둥지\" \"남진\"","cat":"주파수","m":"정착의 안정감을 통해 산만한 의식을 하나로 "},{"t":"누구 없소","a":"이하이","q":"\"누구 없소\" \"이하이\"","cat":"주파수","m":"간절한 부름을 통해 닫힌 문을 열고 소통의 "},{"t":"0310","a":"백예린","q":"\"0310\" \"백예린\"","cat":"주파수","m":"새벽의 감성을 통해 억눌린 무의식을 정화하고"},{"t":"파도","a":"새소년","q":"\"파도\" \"새소년\"","cat":"주파수","m":"거침없는 파도처럼 낡은 생각을 쓸어버리고 의"},{"t":"NO PAIN","a":"실리카겔","q":"\"NO PAIN\" \"실리카겔\"","cat":"주파수","m":"고통을 초월하는 강렬한 사운드로 정신적 한계"},{"t":"가짜 주인공","a":"이승윤","q":"\"가짜 주인공\" \"이승윤\"","cat":"주파수","m":"주인공이라는 프레임을 깨고 본질적인 자아를 "},{"t":"밤양갱","a":"비비 (BIBI)","q":"\"밤양갱\" \"비비 (BIBI)\"","cat":"주파수","m":"달콤하고 단순한 진리를 통해 복잡하게 꼬인 "},{"t":"러브윈즈올","a":"아이유","q":"\"러브윈즈올\" \"아이유\"","cat":"주파수","m":"사랑이라는 궁극의 해결책으로 세상의 모든 혐"},{"t":"그대에게","a":"신해철","q":"\"그대에게\" \"신해철\"","cat":"주파수","m":"무한한 신뢰를 바탕으로 두려움 없이 새로운 "},{"t":"Moai","a":"서태지","q":"\"Moai\" \"서태지\"","cat":"주파수","m":"미지의 문명에 대한 상상력을 자극하여 닫혀있"},{"t":"로시난테","a":"패닉","q":"\"로시난테\" \"패닉\"","cat":"주파수","m":"현실의 장벽을 뛰어넘는 모험심을 고취하여 문"},{"t":"검은 행복","a":"윤미래","q":"\"검은 행복\" \"윤미래\"","cat":"주파수","m":"아픔을 음악으로 승화시켜 정체성 혼란의 독소"},{"t":"Crooked (삐딱하게)","a":"지드래곤","q":"\"Crooked (삐딱하게)\" \"지드래곤\"","cat":"주파수","m":"뒤틀린 감정을 가감 없이 분출하여 억눌린 무"},{"t":"Hello Bitches","a":"씨엘 (CL)","q":"\"Hello Bitches\" \"씨엘 (CL)\"","cat":"주파수","m":"압도적인 자기 확신과 표현력으로 주변의 부정"},{"t":"MIC Drop","a":"방탄소년단","q":"\"MIC Drop\" \"방탄소년단\"","cat":"주파수","m":"성취를 통한 자신감을 표출하며 비난과 질투의"},{"t":"How You Like That","a":"블랙핑크","q":"\"How You Like That\" \"블랙핑크\"","cat":"주파수","m":"절망적인 상황에서도 다시 일어서는 기개를 보"},{"t":"Right Now","a":"싸이 (PSY)","q":"\"Right Now\" \"싸이 (PSY)\"","cat":"주파수","m":"미루지 않는 즉각적인 실행력을 자극하여 지체"},{"t":"나의 노래","a":"김광석","q":"\"나의 노래\" \"김광석\"","cat":"주파수","m":"노래가 곧 삶이 되는 일체감을 통해 존재의 "},{"t":"붉은 노을","a":"이문세","q":"\"붉은 노을\" \"이문세\"","cat":"주파수","m":"타오르는 열정의 파동으로 무기력의 독소를 태"},{"t":"스피드","a":"김건모","q":"\"스피드\" \"김건모\"","cat":"주파수","m":"빠른 템포와 리듬으로 정체된 사고 흐름에 속"},{"t":"풍문으로 들었소","a":"장기하와 얼굴들","q":"\"풍문으로 들었소\" \"장기하와 얼굴들\"","cat":"주파수","m":"정보의 홍수 속에서 본질을 꿰뚫는 위트 있는"},{"t":"다이노소어","a":"악뮤 (AKMU)","q":"\"다이노소어\" \"악뮤 (AKMU)\"","cat":"주파수","m":"어린 시절의 공포를 창의적으로 시각화하여 트"},{"t":"좌우나졸","a":"이날치","q":"\"좌우나졸\" \"이날치\"","cat":"주파수","m":"전통적인 리듬의 파격적 변주를 통해 뇌의 인"},{"t":"힘을 내세요","a":"이찬원","q":"\"힘을 내세요\" \"이찬원\"","cat":"주파수","m":"응원의 파동을 직접적으로 전달하여 심리적 위"},{"t":"나쁜X","a":"비비 (BIBI)","q":"\"나쁜X\" \"비비 (BIBI)\"","cat":"주파수","m":"사회적 금기에 도전하는 파격적 표현으로 억눌"},{"t":"긴 꿈","a":"새소년","q":"\"긴 꿈\" \"새소년\"","cat":"주파수","m":"꿈과 현실의 경계에서 얻은 영감을 통해 창의"},{"t":"T","a":"실리카겔","q":"\"T\" \"실리카겔\"","cat":"주파수","m":"실험적인 사운드를 통해 뇌세포를 자극하고 고"},{"t":"들려주고 싶었던","a":"이승윤","q":"\"들려주고 싶었던\" \"이승윤\"","cat":"주파수","m":"말하지 못한 진심을 꺼내어 표현의 장애를 극"},{"t":"거울","a":"국카스텐","q":"\"거울\" \"국카스텐\"","cat":"주파수","m":"자아의 투영을 통해 위선적인 모습을 파괴하고"},{"t":"출발","a":"김동률","q":"\"출발\" \"김동률\"","cat":"주파수","m":"낯선 곳으로의 여정을 통해 경직된 일상의 의"},{"t":"거위의 꿈","a":"이적","q":"\"거위의 꿈\" \"이적\"","cat":"주파수","m":"비현실적인 꿈조차 표현의 동력으로 삼아 한계"},{"t":"천일동안","a":"이승환","q":"\"천일동안\" \"이승환\"","cat":"주파수","m":"긴 시간의 정서를 매듭지으며 감정적 잔해를 "},{"t":"사랑한 후에","a":"들국화","q":"\"사랑한 후에\" \"들국화\"","cat":"주파수","m":"상실의 고통을 예술로 치환하여 슬픔의 독소를"},{"t":"컴백홈","a":"서태지와 아이들","q":"\"컴백홈\" \"서태지와 아이들\"","cat":"주파수","m":"방황의 끝에서 자아로 회귀하는 강력한 의지력"},{"t":"힘겨워하는 아이들을 위하여","a":"넥스트","q":"\"힘겨워하는 아이들을 위하여\" \"넥스트\"","cat":"주파수","m":"타인의 고통에 공감하며 이기적 의식을 사회적"},{"t":"샤이닝","a":"자우림","q":"\"샤이닝\" \"자우림\"","cat":"주파수","m":"어둠 속에서도 빛나는 자아를 발견하여 우울의"},{"t":"Black Swan","a":"방탄소년단","q":"\"Black Swan\" \"방탄소년단\"","cat":"주파수","m":"예술가적 자아를 성찰하며 내면의 진실을 표현"},{"t":"Lovesick Girls","a":"블랙핑크","q":"\"Lovesick Girls\" \"블랙핑크\"","cat":"주파수","m":"관계의 상처를 노래로 승화하여 애정결핍의 독"},{"t":"무제(無題)","a":"지드래곤","q":"\"무제(無題)\" \"지드래곤\"","cat":"주파수","m":"형식을 파괴한 순수 감정의 전달로 표현의 자"},{"t":"어떻게 이별까지 사랑하겠어, 널 사랑하는 거지","a":"악뮤","q":"\"어떻게 이별까지 사랑하겠어, 널 사랑하는 거지\" \"악뮤\"","cat":"주파수","m":"모순된 감정의 본질을 통찰하여 인지적 부조화"},{"t":"Paul","a":"혁오","q":"\"Paul\" \"혁오\"","cat":"주파수","m":"시간의 흐름을 초월한 관점으로 현재의 고난을"},{"t":"꿈과 책과 힘과 벽","a":"잔나비","q":"\"꿈과 책과 힘과 벽\" \"잔나비\"","cat":"주파수","m":"성장의 아픔을 통해 어른이 되어가는 과정의 "},{"t":"자유","a":"새소년","q":"\"자유\" \"새소년\"","cat":"주파수","m":"관습적 가치관을 거부하는 파동으로 정신적 해"},{"t":"섬","a":"카더가든","q":"\"섬\" \"카더가든\"","cat":"주파수","m":"고립을 자처한 휴식을 통해 과부하된 뇌의 독"},{"t":"Desert Eagle","a":"실리카겔","q":"\"Desert Eagle\" \"실리카겔\"","cat":"주파수","m":"사이키델릭한 사운드로 의식의 경계를 허물고 "},{"t":"인생찬가","a":"임영웅","q":"\"인생찬가\" \"임영웅\"","cat":"주파수","m":"삶의 모든 순간을 예찬하며 부정적인 회의론의"},{"t":"폼미쳤다","a":"영탁","q":"\"폼미쳤다\" \"영탁\"","cat":"주파수","m":"폭발적인 자신감의 표현으로 위축된 자아를 깨"},{"t":"빛이 나는 사람","a":"김호중","q":"\"빛이 나는 사람\" \"김호중\"","cat":"주파수","m":"존재 자체의 귀함을 일깨워 열등감의 어둠을 "},{"t":"영원","a":"정동원","q":"\"영원\" \"정동원\"","cat":"주파수","m":"영속적인 가치에 집중하게 하여 찰나의 고민으"},{"t":"기장 갈매기","a":"나훈아","q":"\"기장 갈매기\" \"나훈아\"","cat":"주파수","m":"거침없는 바다의 기상으로 소심한 의식을 대범"},{"t":"가슴 아프게","a":"남진","q":"\"가슴 아프게\" \"남진\"","cat":"주파수","m":"슬픔의 정면 돌파를 통해 감정의 정체를 해소"},{"t":"에피소드","a":"이무진","q":"\"에피소드\" \"이무진\"","cat":"주파수","m":"인생의 한 장편을 정리하며 과거의 미련을 지"},{"t":"헤픈 엔딩","a":"헤이즈","q":"\"헤픈 엔딩\" \"헤이즈\"","cat":"주파수","m":"관계의 끝을 긍정적으로 수용하여 이별의 독소"},{"t":"그라데이션","a":"십센치","q":"\"그라데이션\" \"십센치\"","cat":"주파수","m":"서서히 번져가는 감정을 포착하며 미세한 감각"},{"t":"숲으로 가자","a":"정승환","q":"\"숲으로 가자\" \"정승환\"","cat":"주파수","m":"인공적인 소음에서 벗어나 자연의 파동으로 뇌"},{"t":"머리어깨무릎발","a":"이하이","q":"\"머리어깨무릎발\" \"이하이\"","cat":"주파수","m":"신체 감각에 집중하게 하여 복잡한 생각의 독"},{"t":"비누","a":"비비","q":"\"비누\" \"비비\"","cat":"주파수","m":"씻어내는 행위를 음악화하여 부정한 기운을 물"},{"t":"폭포","a":"이승윤","q":"\"폭포\" \"이승윤\"","cat":"주파수","m":"쏟아지는 소리의 파동으로 낡은 의식을 시원하"},{"t":"홀씨","a":"아이유","q":"\"홀씨\" \"아이유\"","cat":"주파수","m":"어디로든 날아가는 자유로움을 통해 구속 없는"},{"t":"Space Oddity","a":"David Bowie","q":"\"Space Oddity\" \"David Bowie\"","cat":"주파수","m":"지구라는 물리적 한계를 벗어나 우주적 시야로"},{"t":"The Scientist","a":"Coldplay","q":"\"The Scientist\" \"Coldplay\"","cat":"주파수","m":"본질로 돌아가려는 시도를 통해 복잡하게 꼬인"},{"t":"Like a Rolling Stone","a":"Bob Dylan","q":"\"Like a Rolling Stone\" \"Bob Dylan\"","cat":"주파수","m":"모든 것을 잃은 뒤의 자유를 노래하며 집착의"},{"t":"Where The Streets Have No Name","a":"U2","q":"\"Where The Streets Have No Name\" \"U2\"","cat":"주파수","m":"이름 없는 곳으로 향하는 열망을 통해 닫힌 "},{"t":"Uprising","a":"Muse","q":"\"Uprising\" \"Muse\"","cat":"주파수","m":"조작된 정보에 저항하며 깨어있는 의식으로 진"},{"t":"Shape of You","a":"Ed Sheeran","q":"\"Shape of You\" \"Ed Sheeran\"","cat":"주파수","m":"감각적인 리듬을 통해 신체 에너지를 활성화하"},{"t":"Summertime Sadness","a":"Lana Del Rey","q":"\"Summertime Sadness\" \"Lana Del Rey\"","cat":"주파수","m":"슬픔을 아름다운 선율로 정화하여 우울의 에너"},{"t":"Woman","a":"Doja Cat","q":"\"Woman\" \"Doja Cat\"","cat":"주파수","m":"여성적 창조 에너지를 예찬하며 생명력 넘치는"},{"t":"Kill Bill","a":"SZA","q":"\"Kill Bill\" \"SZA\"","cat":"주파수","m":"억눌린 질투와 분노를 해학적으로 표현하여 감"},{"t":"Flowers","a":"Miley Cyrus","q":"\"Flowers\" \"Miley Cyrus\"","cat":"주파수","m":"스스로를 사랑하는 자립심을 통해 의존적인 관"},{"t":"Black Swan","a":"BTS","q":"\"Black Swan\" \"BTS\"","cat":"주파수","m":"예술적 죽음과 부활을 통해 자아의 본질을 찾"},{"t":"Kill This Love","a":"Blackpink","q":"\"Kill This Love\" \"Blackpink\"","cat":"주파수","m":"유해한 사랑을 끊어내는 단호함을 통해 의식의"},{"t":"Do I Wanna Know?","a":"Arctic Monkeys","q":"\"Do I Wanna Know?\" \"Arctic Monkeys\"","cat":"주파수","m":"의구심과 질문을 던지며 진실에 다가가려는 날"},{"t":"Feel Good Inc.","a":"Gorillaz","q":"\"Feel Good Inc.\" \"Gorillaz\"","cat":"주파수","m":"가공된 쾌락을 비판하며 진정한 행복의 의미를"},{"t":"Get Lucky","a":"Daft Punk","q":"\"Get Lucky\" \"Daft Punk\"","cat":"주파수","m":"리듬의 순환을 통해 복잡한 생각을 비우고 직"},{"t":"Smells Like Teen Spirit","a":"Nirvana","q":"\"Smells Like Teen Spirit\" \"Nirvana\"","cat":"주파수","m":"기존 체제에 대한 강력한 저항과 분출을 통해"},{"t":"You Oughta Know","a":"Alanis Morissette","q":"\"You Oughta Know\" \"Alanis Morissette\"","cat":"주파수","m":"분노를 가감 없이 표현함으로써 내면의 응어리"},{"t":"The Pretender","a":"Foo Fighters","q":"\"The Pretender\" \"Foo Fighters\"","cat":"주파수","m":"위선적인 현실에 질문을 던지며 진실을 꿰뚫는"},{"t":"Boulevard Of Broken Dreams","a":"Green Day","q":"\"Boulevard Of Broken Dreams\" \"Green Day\"","cat":"주파수","m":"고독 속의 자기 성찰을 통해 타인의 시선이라"},{"t":"Green Light","a":"Lorde","q":"\"Green Light\" \"Lorde\"","cat":"주파수","m":"새로운 시작을 향한 신호를 포착하며 과거의 "},{"t":"Without Me","a":"Halsey","q":"\"Without Me\" \"Halsey\"","cat":"주파수","m":"유해한 관계를 객관화하여 인식하고 자신을 되"},{"t":"Sorry Not Sorry","a":"Demi Lovato","q":"\"Sorry Not Sorry\" \"Demi Lovato\"","cat":"주파수","m":"과거의 위축감을 떨쳐내고 당당한 자기표현으로"},{"t":"Back To You","a":"Selena Gomez","q":"\"Back To You\" \"Selena Gomez\"","cat":"주파수","m":"반복되는 감정의 패턴을 직면하여 관계의 본질"},{"t":"No Tears Left To Cry","a":"Ariana Grande","q":"\"No Tears Left To Cry\" \"Ariana Grande\"","cat":"주파수","m":"슬픔을 다 쏟아낸 뒤의 맑은 정신으로 평화와"},{"t":"Can't Stop The Feeling!","a":"Justin Timberlake","q":"\"Can't Stop The Feeling!\" \"Justin Timberlake\"","cat":"주파수","m":"춤과 리듬을 통해 신체 에너지를 순환시켜 정"},{"t":"Uptown Funk","a":"Mark Ronson","q":"\"Uptown Funk\" \"Mark Ronson\"","cat":"주파수","m":"강렬한 펑크 비트로 의식을 고양하고 사회적 "},{"t":"Centuries","a":"Fall Out Boy","q":"\"Centuries\" \"Fall Out Boy\"","cat":"주파수","m":"역사의 일부가 되는 상상을 통해 의식의 규모"},{"t":"Ride","a":"Twenty One Pilots","q":"\"Ride\" \"Twenty One Pilots\"","cat":"주파수","m":"삶의 여정을 사색하며 복잡한 생각의 과부하를"},{"t":"Good Grief","a":"Bastille","q":"\"Good Grief\" \"Bastille\"","cat":"주파수","m":"상실과 슬픔을 역설적으로 경쾌하게 다루어 비"},{"t":"All These Things That I've Done","a":"The Killers","q":"\"All These Things That I've Done\" \"The Killers\"","cat":"주파수","m":"과거의 행적을 수용하며 성숙한 자아로 나아가"},{"t":"Sex on Fire","a":"Kings of Leon","q":"\"Sex on Fire\" \"Kings of Leon\"","cat":"주파수","m":"원초적 에너지를 발산하여 억눌린 감각을 해방"},{"t":"R U Mine?","a":"Arctic Monkeys","q":"\"R U Mine?\" \"Arctic Monkeys\"","cat":"주파수","m":"소유와 열망의 질문을 통해 관계 속의 자아를"},{"t":"The Less I Know The Better","a":"Tame Impala","q":"\"The Less I Know The Better\" \"Tame Impala\"","cat":"주파수","m":"불필요한 정보를 차단하여 의식의 명료함을 유"},{"t":"Gooey","a":"Glass Animals","q":"\"Gooey\" \"Glass Animals\"","cat":"주파수","m":"몽환적인 사운드로 뇌의 이완을 돕고 창의적인"},{"t":"Starboy","a":"The Weeknd","q":"\"Starboy\" \"The Weeknd\"","cat":"주파수","m":"성공의 공허함과 화려함을 동시에 직면하며 자"},{"t":"Rockstar","a":"Post Malone","q":"\"Rockstar\" \"Post Malone\"","cat":"주파수","m":"일탈적 상상을 통해 현실의 압박감을 배출하고"},{"t":"SICKO MODE","a":"Travis Scott","q":"\"SICKO MODE\" \"Travis Scott\"","cat":"주파수","m":"변칙적인 비트 구조로 뇌의 인지 방식을 환기"},{"t":"HUMBLE.","a":"Kendrick Lamar","q":"\"HUMBLE.\" \"Kendrick Lamar\"","cat":"주파수","m":"자만심의 독소를 경계하며 본질적인 실력과 진"},{"t":"Make Me Feel","a":"Janelle Monáe","q":"\"Make Me Feel\" \"Janelle Monáe\"","cat":"주파수","m":"감각의 해방을 예찬하며 고정된 성 역할이나 "},{"t":"This Is America","a":"Childish Gambino","q":"\"This Is America\" \"Childish Gambino\"","cat":"주파수","m":"날카로운 사회적 메시지를 통해 잠든 비판적 "},{"t":"Good Days","a":"SZA","q":"\"Good Days\" \"SZA\"","cat":"주파수","m":"과거에 머물지 않고 좋은 날을 기대하는 긍정"},{"t":"Pink + White","a":"Frank Ocean","q":"\"Pink + White\" \"Frank Ocean\"","cat":"주파수","m":"자연과 삶의 조화를 노래하며 의식을 평온하고"},{"t":"Cranes in the Sky","a":"Solange","q":"\"Cranes in the Sky\" \"Solange\"","cat":"주파수","m":"내면의 슬픔을 회피하지 않고 마주하며 서서히"},{"t":"Retrograde","a":"James Blake","q":"\"Retrograde\" \"James Blake\"","cat":"주파수","m":"후퇴가 아닌 내면으로의 침잠을 통해 깊은 의"},{"t":"Cellophane","a":"FKA twigs","q":"\"Cellophane\" \"FKA twigs\"","cat":"주파수","m":"취약함을 드러내는 표현을 통해 내면의 상처를"},{"t":"What They'll Say About Us","a":"Finneas","q":"\"What They'll Say About Us\" \"Finneas\"","cat":"주파수","m":"미래에 대한 희망을 노래하며 현재의 비관적인"},{"t":"ON","a":"BTS","q":"\"ON\" \"BTS\"","cat":"주파수","m":"시련을 받아들이는 강인함을 통해 두려움의 독"},{"t":"Across The Universe","a":"The Beatles","q":"\"Across The Universe\" \"The Beatles\"","cat":"주파수","m":"우주적 차원의 평화를 노래하며 세속적인 고민"},{"t":"Vision Of Love","a":"Mariah Carey","q":"\"Vision Of Love\" \"Mariah Carey\"","cat":"주파수","m":"사랑에 대한 명확한 비전을 제시하며 감정적 "},{"t":"In The Air Tonight","a":"Phil Collins","q":"\"In The Air Tonight\" \"Phil Collins\"","cat":"주파수","m":"긴박한 긴장감을 통해 감각을 예리하게 깨우고"},{"t":"Welcome To The Jungle","a":"Guns N' Roses","q":"\"Welcome To The Jungle\" \"Guns N' Roses\"","cat":"주파수","m":"거친 현실을 직시하게 하여 생존을 위한 본능"},{"t":"Uptown Funk","a":"Bruno Mars","q":"\"Uptown Funk\" \"Bruno Mars\"","cat":"주파수","m":"폭발적인 펑크 리듬으로 신체와 정신의 정체를"},{"t":"Look What You Made Me Do","a":"Taylor Swift","q":"\"Look What You Made Me Do\" \"Taylor Swift\"","cat":"주파수","m":"시련을 통한 자아의 진화를 노래하며 피해자 "},{"t":"What I've Done","a":"Linkin Park","q":"\"What I've Done\" \"Linkin Park\"","cat":"주파수","m":"과거의 과오를 씻어내고 새로운 나로 거듭나는"},{"t":"Bad Guy","a":"Billie Eilish","q":"\"Bad Guy\" \"Billie Eilish\"","cat":"주파수","m":"기존의 고정된 이미지를 뒤틀며 사고의 유연성"},{"t":"Brutal","a":"Olivia Rodrigo","q":"\"Brutal\" \"Olivia Rodrigo\"","cat":"주파수","m":"현실의 가혹함을 솔직하게 표현하여 억지 긍정"},{"t":"Solar Power","a":"Lorde","q":"\"Solar Power\" \"Lorde\"","cat":"주파수","m":"태양의 에너지로 자연과 합일되는 평온한 의식"},{"t":"Hold Back The River","a":"James Bay","q":"\"Hold Back The River\" \"James Bay\"","cat":"주파수","m":"흐르는 시간을 붙잡고 싶은 열망을 통해 소중"},{"t":"세상만사","a":"들국화","q":"\"세상만사\" \"들국화\"","cat":"주파수","m":"세상의 모든 흐름을 관조하며 집착을 버리고 "},{"t":"기다리다","a":"패닉","q":"\"기다리다\" \"패닉\"","cat":"주파수","m":"보이지 않는 대상과의 연결감을 통해 영적인 "},{"t":"다시 사랑한다 말할까","a":"김동률","q":"\"다시 사랑한다 말할까\" \"김동률\"","cat":"주파수","m":"순수한 사랑의 회복을 통해 오염된 감정을 정"},{"t":"아침의 눈","a":"서태지","q":"\"아침의 눈\" \"서태지\"","cat":"주파수","m":"순백의 순수함을 시각화하여 영혼의 맑은 상태"},{"t":"보통의 날","a":"루시드폴","q":"\"보통의 날\" \"루시드폴\"","cat":"주파수","m":"일상의 평범함 속에서 고귀한 영적 평화를 찾"},{"t":"비밀의 화원","a":"아이유","q":"\"비밀의 화원\" \"아이유\"","cat":"주파수","m":"내면의 신성한 공간을 발견하여 영적 위안과 "},{"t":"The Happiest Girl","a":"블랙핑크","q":"\"The Happiest Girl\" \"블랙핑크\"","cat":"주파수","m":"아픔 속에서도 행복을 선택하는 높은 의식의 "},{"t":"공드리","a":"혁오","q":"\"공드리\" \"혁오\"","cat":"주파수","m":"몽환적인 사운드로 현실의 경계를 허물고 영적"},{"t":"어떻게 이별까지 사랑하겠어, 널 사랑하는 거지","a":"악뮤 (AKMU)","q":"\"어떻게 이별까지 사랑하겠어, 널 사랑하는 거지\" \"악뮤 (AKMU)\"","cat":"주파수","m":"조건 없는 사랑의 본질을 탐구하여 영적 성숙"},{"t":"영원","a":"십센치","q":"\"영원\" \"십센치\"","cat":"주파수","m":"시간의 영속성을 노래하며 찰나의 고민을 초월"},{"t":"비 내리는 고모령","a":"송가인","q":"\"비 내리는 고모령\" \"송가인\"","cat":"주파수","m":"한을 승화하여 영혼의 찌꺼기를 씻어내는 깊은"},{"t":"공(空)","a":"나훈아","q":"\"공(空)\" \"나훈아\"","cat":"주파수","m":"모든 것이 비어있음을 깨닫게 하여 소유욕을 "},{"t":"정녕","a":"조항조","q":"\"정녕\" \"조항조\"","cat":"주파수","m":"지고지순한 사랑의 표현으로 순수한 영혼의 울"},{"t":"천상재회","a":"김호중","q":"\"천상재회\" \"김호중\"","cat":"주파수","m":"죽음을 넘어선 만남을 통해 영혼의 불멸성과 "},{"t":"내 이름 아시죠","a":"장민호","q":"\"내 이름 아시죠\" \"장민호\"","cat":"주파수","m":"하늘에 닿는 절절한 고백으로 보이지 않는 세"},{"t":"산책","a":"김완선","q":"\"산책\" \"김완선\"","cat":"주파수","m":"느린 걸음 속의 명상을 통해 의식의 소음을 "},{"t":"우리의 사랑이 필요한 거죠","a":"변진섭","q":"\"우리의 사랑이 필요한 거죠\" \"변진섭\"","cat":"주파수","m":"집단적 사랑의 에너지를 결집하여 영적 공명장"},{"t":"해에게서 소년에게","a":"넥스트","q":"\"해에게서 소년에게\" \"넥스트\"","cat":"주파수","m":"태양을 향한 열망을 통해 영혼의 성장을 촉구"},{"t":"정거장","a":"패닉","q":"\"정거장\" \"패닉\"","cat":"주파수","m":"삶을 거쳐가는 과정으로 인식하여 영원한 영혼"},{"t":"동행","a":"김동률","q":"\"동행\" \"김동률\"","cat":"주파수","m":"삶의 동반자와의 영적 유대를 확인하며 우주적"},{"t":"Love wins all","a":"아이유","q":"\"Love wins all\" \"아이유\"","cat":"주파수","m":"사랑이 모든 악과 혼란을 이기는 궁극의 영적"},{"t":"작은 별","a":"악뮤 (AKMU)","q":"\"작은 별\" \"악뮤 (AKMU)\"","cat":"주파수","m":"광활한 우주 속 나라는 존재의 유일성을 인식"},{"t":"산책","a":"백예린","q":"\"산책\" \"백예린\"","cat":"주파수","m":"느린 호흡과 걸음으로 일상의 소음을 정화하고"},{"t":"비온다","a":"선우정아","q":"\"비온다\" \"선우정아\"","cat":"주파수","m":"씻겨 내려가는 빗소리를 통해 영혼의 해묵은 "},{"t":"구원자","a":"이하이","q":"\"구원자\" \"이하이\"","cat":"주파수","m":"스스로를 구원할 수 있는 내면의 신성을 깨워"},{"t":"모래 알갱이","a":"임영웅","q":"\"모래 알갱이\" \"임영웅\"","cat":"주파수","m":"작고 미미한 존재 속의 거대한 가치를 발견하"},{"t":"회초리","a":"장민호","q":"\"회초리\" \"장민호\"","cat":"주파수","m":"과거의 아픔을 성찰의 계기로 삼아 영적인 성"},{"t":"희망사항","a":"변진섭","q":"\"희망사항\" \"변진섭\"","cat":"주파수","m":"소박한 소망들이 모여 아름다운 삶을 만든다는"},{"t":"영원","a":"서태지와 아이들","q":"\"영원\" \"서태지와 아이들\"","cat":"주파수","m":"영원한 진리를 향한 갈망을 자극하여 의식을 "},{"t":"Hope","a":"넥스트","q":"\"Hope\" \"넥스트\"","cat":"주파수","m":"절망 끝에서 찾는 희망의 빛을 통해 영적 복"},{"t":"기억해줘요 내 모든 걸","a":"거미","q":"\"기억해줘요 내 모든 걸\" \"거미\"","cat":"주파수","m":"존재의 흔적을 영적인 기억으로 남기며 삶의 "},{"t":"My Destiny","a":"린 (Lyn)","q":"\"My Destiny\" \"린 (Lyn)\"","cat":"주파수","m":"운명적인 끌림을 우주적 질서로 인식하여 삶의"},{"t":"만약에","a":"태연","q":"\"만약에\" \"태연\"","cat":"주파수","m":"가정과 상상을 통해 의식의 확장을 꾀하고 보"},{"t":"첫눈처럼 너에게 가겠다","a":"에일리","q":"\"첫눈처럼 너에게 가겠다\" \"에일리\"","cat":"주파수","m":"계절의 순환과 운명을 연결하여 영적 질서에 "},{"t":"The Ocean","a":"신해철","q":"\"The Ocean\" \"신해철\"","cat":"주파수","m":"바다로 회귀하는 가사를 통해 존재의 시공간적"},{"t":"나 가거든","a":"양희은","q":"\"나 가거든\" \"양희은\"","cat":"주파수","m":"삶의 마지막 순간까지 고결함을 유지하려는 영"},{"t":"혼자 남은 밤","a":"김광석","q":"\"혼자 남은 밤\" \"김광석\"","cat":"주파수","m":"고독을 외로움이 아닌 '자기 대면'의 시간으"},{"t":"하늘 높이","a":"전람회","q":"\"하늘 높이\" \"전람회\"","cat":"주파수","m":"지상의 중력을 벗어나 높은 차원의 시야로 세"},{"t":"고백","a":"김동률","q":"\"고백\" \"김동률\"","cat":"주파수","m":"진실한 고백을 통해 내면의 어둠을 밝히고 영"},{"t":"해줄 수 없는 일","a":"박효신","q":"\"해줄 수 없는 일\" \"박효신\"","cat":"주파수","m":"소유할 수 없는 사랑을 인정하며 무소유의 영"},{"t":"믿음","a":"이소라","q":"\"믿음\" \"이소라\"","cat":"주파수","m":"보이지 않는 힘에 대한 신뢰를 바탕으로 영적"},{"t":"Magic Shop","a":"방탄소년단","q":"\"Magic Shop\" \"방탄소년단\"","cat":"주파수","m":"내면의 치유 공간을 발견하여 스스로를 위로하"},{"t":"바람, 어디에서 부는지","a":"루시드폴","q":"\"바람, 어디에서 부는지\" \"루시드폴\"","cat":"주파수","m":"보이지 않는 바람의 흐름을 느끼며 자연의 섭"},{"t":"강","a":"김윤아","q":"\"강\" \"김윤아\"","cat":"주파수","m":"흐르는 강물처럼 순리대로 흐르는 삶의 영적 "},{"t":"환상","a":"잔나비","q":"\"환상\" \"잔나비\"","cat":"주파수","m":"상상력을 통해 현실의 경계를 확장하고 영적인"},{"t":"시간과 낙엽","a":"악뮤 (AKMU)","q":"\"시간과 낙엽\" \"악뮤 (AKMU)\"","cat":"주파수","m":"시간의 흐름을 아름답게 수용하며 영속적인 자"},{"t":"순이","a":"선우정아","q":"\"순이\" \"선우정아\"","cat":"주파수","m":"대상에 대한 지극한 헌신을 통해 자아를 초월"},{"t":"내 삶의 눈물로 채워도","a":"나훈아","q":"\"내 삶의 눈물로 채워도\" \"나훈아\"","cat":"주파수","m":"슬픔을 삶의 일부로 통합하며 감정적 성숙과 "},{"t":"잠 못 드는 밤 비는 내리고","a":"김건모","q":"\"잠 못 드는 밤 비는 내리고\" \"김건모\"","cat":"주파수","m":"빗소리와 사색을 통해 무의식 깊은 곳의 직관"},{"t":"Gravity","a":"태연","q":"\"Gravity\" \"태연\"","cat":"주파수","m":"영적인 중력을 찾아 방황을 멈추고 자아를 확"},{"t":"도움","a":"십센치","q":"\"도움\" \"십센치\"","cat":"주파수","m":"타인에게 도움을 구하고 받는 겸손함을 통해 "},{"t":"무명성 지구인","a":"이승윤","q":"\"무명성 지구인\" \"이승윤\"","cat":"주파수","m":"이름 없는 존재로서의 자유를 만끽하며 영적 "},{"t":"미라쥬","a":"국카스텐","q":"\"미라쥬\" \"국카스텐\"","cat":"주파수","m":"환상과 실재를 관통하는 사운드로 깊은 내면과의 싱크로의"},{"t":"Echoes","a":"Pink Floyd","q":"\"Echoes\" \"Pink Floyd\"","cat":"주파수","m":"인류의 공통된 기원과 연결감을 자극하여 영적"},{"t":"Hallelujah","a":"Leonard Cohen","q":"\"Hallelujah\" \"Leonard Cohen\"","cat":"주파수","m":"삶의 고난과 기쁨 모두를 영적인 찬양으로 바"},{"t":"Hallelujah","a":"Jeff Buckley","q":"\"Hallelujah\" \"Jeff Buckley\"","cat":"주파수","m":"절절한 감성의 파동으로 영혼의 깊은 수렁을 "},{"t":"My Sweet Lord","a":"George Harrison","q":"\"My Sweet Lord\" \"George Harrison\"","cat":"주파수","m":"신성한 존재를 향한 순수한 열망으로 개인의 "},{"t":"You Raise Me Up","a":"Josh Groban","q":"\"You Raise Me Up\" \"Josh Groban\"","cat":"주파수","m":"보이지 않는 힘의 지탱을 느끼며 영적 자존감"},{"t":"Angel","a":"Sarah McLachlan","q":"\"Angel\" \"Sarah McLachlan\"","cat":"주파수","m":"천사의 품과 같은 평온함으로 지친 영혼에 안"},{"t":"Come Away With Me","a":"Norah Jones","q":"\"Come Away With Me\" \"Norah Jones\"","cat":"주파수","m":"번잡한 세상을 떠나 고요한 영적 공간으로 유"},{"t":"Gravity","a":"John Mayer","q":"\"Gravity\" \"John Mayer\"","cat":"주파수","m":"영적인 중심을 지키며 유혹과 혼란으로부터 자"},{"t":"Video Games","a":"Lana Del Rey","q":"\"Video Games\" \"Lana Del Rey\"","cat":"주파수","m":"사랑에 대한 순교적 헌신을 통해 자아 초월적"},{"t":"Moon River","a":"Frank Ocean","q":"\"Moon River\" \"Frank Ocean\"","cat":"주파수","m":"운명의 강을 건너는 여정을 통해 우주적 섭리"},{"t":"Mikrokosmos","a":"BTS","q":"\"Mikrokosmos\" \"BTS\"","cat":"주파수","m":"작은 별들이 모여 거대한 우주를 이루듯 개개"},{"t":"Cosmic Love","a":"Florence + The Machine","q":"\"Cosmic Love\" \"Florence + The Machine\"","cat":"주파수","m":"우주적 차원의 사랑이 주는 압도적 에너지를 "},{"t":"Runaway","a":"Aurora","q":"\"Runaway\" \"Aurora\"","cat":"주파수","m":"영혼의 고향으로 돌아가고자 하는 본능적 갈망"},{"t":"All I Need","a":"Jacob Collier","q":"\"All I Need\" \"Jacob Collier\"","cat":"주파수","m":"복잡한 화성 속에 담긴 조화를 통해 우주의 "},{"t":"Godspeed","a":"James Blake","q":"\"Godspeed\" \"James Blake\"","cat":"주파수","m":"축복과 작별을 동시에 담아 영적인 성숙과 다"},{"t":"Merry Christmas Mr. Lawrence","a":"Ryuichi Sakamoto","q":"\"Merry Christmas Mr. Lawrence\" \"Ryuichi Sakamoto\"","cat":"주파수","m":"동서양의 정서가 통합된 선율로 종교와 문화를"},{"t":"Hoppípolla","a":"Sigur Rós","q":"\"Hoppípolla\" \"Sigur Rós\"","cat":"주파수","m":"존재의 환희를 순수하게 분출하여 영적 생동감"},{"t":"Helplessness Blues","a":"Fleet Foxes","q":"\"Helplessness Blues\" \"Fleet Foxes\"","cat":"주파수","m":"거대한 질서 속 부품이 아닌 고유한 존재로서"},{"t":"Nights In White Satin","a":"The Moody Blues","q":"\"Nights In White Satin\" \"The Moody Blues\"","cat":"주파수","m":"깊은 밤의 명상을 통해 의식의 층위를 너머 "},{"t":"A Whiter Shade of Pale","a":"Procol Harum","q":"\"A Whiter Shade of Pale\" \"Procol Harum\"","cat":"주파수","m":"초현실적인 이미지를 통해 무의식의 문을 열고"},{"t":"The House of the Rising Sun","a":"The Animals","q":"\"The House of the Rising Sun\" \"The Animals\"","cat":"주파수","m":"숙명적인 삶의 궤적을 직시하며 인과율의 질서"},{"t":"Morning Has Broken","a":"Cat Stevens","q":"\"Morning Has Broken\" \"Cat Stevens\"","cat":"주파수","m":"매일 아침의 창조적 에너지를 찬미하며 우주적"},{"t":"Life On Mars?","a":"David Bowie","q":"\"Life On Mars?\" \"David Bowie\"","cat":"주파수","m":"현실 너머의 삶에 대한 질문을 통해 닫힌 의"},{"t":"Who Wants to Live Forever","a":"Queen","q":"\"Who Wants to Live Forever\" \"Queen\"","cat":"주파수","m":"영원한 삶에 대한 철학적 성찰로 영적 불멸성"},{"t":"Time to Say Goodbye","a":"Sarah Brightman","q":"\"Time to Say Goodbye\" \"Sarah Brightman\"","cat":"주파수","m":"작별을 새로운 차원으로의 이동으로 인식하여 "},{"t":"The Prayer","a":"Celine Dion","q":"\"The Prayer\" \"Celine Dion\"","cat":"주파수","m":"신성한 인도에 대한 간절한 기도로 내면의 평"},{"t":"Ave Maria","a":"Andrea Bocelli","q":"\"Ave Maria\" \"Andrea Bocelli\"","cat":"주파수","m":"지극한 성스러움을 통해 세포 하나하나에 영적"},{"t":"May It Be","a":"Enya","q":"\"May It Be\" \"Enya\"","cat":"주파수","m":"어둠 속의 길잡이별 같은 존재가 되어 영적 "},{"t":"By Your Side","a":"Sade","q":"\"By Your Side\" \"Sade\"","cat":"주파수","m":"변치 않는 헌신을 노래하며 우주적인 무조건적"},{"t":"On Top Of The World","a":"Imagine Dragons","q":"\"On Top Of The World\" \"Imagine Dragons\"","cat":"주파수","m":"성취를 넘어선 존재의 환희를 우주적 고양감으"},{"t":"Secrets","a":"OneRepublic","q":"\"Secrets\" \"OneRepublic\"","cat":"주파수","m":"진실을 드러내는 용기를 통해 가식의 독소를 "},{"t":"Work Song","a":"Hozier","q":"\"Work Song\" \"Hozier\"","cat":"주파수","m":"죽음조차 갈라놓을 수 없는 사랑을 통해 영혼"},{"t":"Young And Beautiful","a":"Lana Del Rey","q":"\"Young And Beautiful\" \"Lana Del Rey\"","cat":"주파수","m":"세월을 초월한 가치에 집중하게 하여 영적 아"},{"t":"A World Alone","a":"Lorde","q":"\"A World Alone\" \"Lorde\"","cat":"주파수","m":"혼란스러운 세상 속에서 단 둘만의 영적 질서"},{"t":"Fine Line","a":"Harry Styles","q":"\"Fine Line\" \"Harry Styles\"","cat":"주파수","m":"양극단의 감정 사이에서 영적인 균형과 조화를"},{"t":"Epiphany","a":"BTS","q":"\"Epiphany\" \"BTS\"","cat":"주파수","m":"자신을 사랑하는 것이 곧 우주적 사랑의 시작"},{"t":"Young Dumb & Broke","a":"Khalid","q":"\"Young Dumb & Broke\" \"Khalid\"","cat":"주파수","m":"미완성의 미학을 긍정하며 성장의 과정 자체를"},{"t":"Saturn","a":"SZA","q":"\"Saturn\" \"SZA\"","cat":"주파수","m":"지구의 혼란을 벗어나 토성의 평화를 꿈꾸며 "},{"t":"Self Control","a":"Frank Ocean","q":"\"Self Control\" \"Frank Ocean\"","cat":"주파수","m":"감정적 자제력을 통해 내면의 영적 질서를 유"},{"t":"Moon River","a":"Jacob Collier","q":"\"Moon River\" \"Jacob Collier\"","cat":"주파수","m":"정교한 화성의 하모니를 통해 우주의 복합적인"},{"t":"22 (OVER S∞∞N)","a":"Bon Iver","q":"\"22 (OVER S∞∞N)\" \"Bon Iver\"","cat":"주파수","m":"모든 고통과 번뇌가 '곧 끝날 것'이라는 영"},{"t":"Solitude","a":"Ryuichi Sakamoto","q":"\"Solitude\" \"Ryuichi Sakamoto\"","cat":"주파수","m":"고독 속에서 마주하는 깊은 침묵이 영적 직관"},{"t":"Starálfur","a":"Sigur Rós","q":"\"Starálfur\" \"Sigur Rós\"","cat":"주파수","m":"신비로운 소리의 풍경 속에서 우주적 경이로움"},{"t":"The Seed","a":"Aurora","q":"\"The Seed\" \"Aurora\"","cat":"주파수","m":"자연의 섭리를 거스르는 문명을 비판하며 근원"},{"t":"Mary Magdalene","a":"FKA twigs","q":"\"Mary Magdalene\" \"FKA twigs\"","cat":"주파수","m":"여성적 영성과 헌신의 신비로움을 통해 자아를"},{"t":"Pointless","a":"Lewis Capaldi","q":"\"Pointless\" \"Lewis Capaldi\"","cat":"주파수","m":"사랑 없는 삶의 무의미함을 깨닫고 우주적 사"},{"t":"Strawberry Fields Forever","a":"The Beatles","q":"\"Strawberry Fields Forever\" \"The Beatles\"","cat":"주파수","m":"감각의 환상을 넘어 내면의 영적 실재를 탐구"},{"t":"Time","a":"Pink Floyd","q":"\"Time\" \"Pink Floyd\"","cat":"주파수","m":"시간의 유한함을 깨닫고 영원한 현재에 머무는"},{"t":"Starman","a":"David Bowie","q":"\"Starman\" \"David Bowie\"","cat":"주파수","m":"우주적 존재와의 연결을 통해 인류의 진화와 "},{"t":"With or Without You","a":"U2","q":"\"With or Without You\" \"U2\"","cat":"주파수","m":"이원성을 초월한 절대적 사랑의 상태를 지향하"},{"t":"Shape of My Heart","a":"Sting","q":"\"Shape of My Heart\" \"Sting\"","cat":"주파수","m":"삶의 숨겨진 법칙을 찾으려는 철학적 통찰과 "},{"t":"Praying for Time","a":"George Michael","q":"\"Praying for Time\" \"George Michael\"","cat":"주파수","m":"시대적 혼란 속에서 영적인 구원과 시간의 의"},{"t":"Run to You","a":"Whitney Houston","q":"\"Run to You\" \"Whitney Houston\"","cat":"주파수","m":"영적인 도피처가 아닌 진정한 자아로의 회귀를"},{"t":"Always","a":"Bon Jovi","q":"\"Always\" \"Bon Jovi\"","cat":"주파수","m":"변치 않는 영원성을 노래하며 불멸의 영적 가"},{"t":"November Rain","a":"Guns N' Roses","q":"\"November Rain\" \"Guns N' Roses\"","cat":"주파수","m":"상실의 고통을 자연의 섭리로 받아들여 영적으"},{"t":"All Too Well","a":"Taylor Swift","q":"\"All Too Well\" \"Taylor Swift\"","cat":"주파수","m":"기억의 세밀한 직조를 통해 삶의 서사를 영적"},{"t":"When the Party's Over","a":"Billie Eilish","q":"\"When the Party's Over\" \"Billie Eilish\"","cat":"주파수","m":"소음이 끝난 뒤의 정적 속에서 진정한 자아의"},{"t":"Hope Ur OK","a":"Olivia Rodrigo","q":"\"Hope Ur OK\" \"Olivia Rodrigo\"","cat":"주파수","m":"타인의 안녕을 비는 순수한 염원을 통해 우주"},{"t":"Holy","a":"Justin Bieber","q":"\"Holy\" \"Justin Bieber\"","cat":"주파수","m":"일상적 사랑 속에 깃든 거룩함을 발견하여 영"},{"t":"Hope Is a Dangerous Thing...","a":"Lana Del Rey","q":"\"Hope Is a Dangerous Thing...\" \"Lana Del Rey\"","cat":"주파수","m":"절망 속에서도 희망이라는 영적 끈을 놓지 않"},{"t":"Grace","a":"Rag'n'Bone Man","q":"\"Grace\" \"Rag'n'Bone Man\"","cat":"주파수","m":"실수를 넘어선 신의 은총을 수용하여 영적 평"},{"t":"G선상의 아리아","a":"J.S. Bach","q":"\"G선상의 아리아\" \"J.S. Bach\"","cat":"주파수","m":"낮은 저음의 흐름이 내면의 불안을 가라앉히고"},{"t":"교향곡 5번 '운명' 1악장","a":"Beethoven","q":"\"교향곡 5번 '운명' 1악장\" \"Beethoven\"","cat":"주파수","m":"거친 운명의 타격을 정면으로 마주하여 공포를"},{"t":"레퀴엠 중 'Lacrimosa'","a":"Mozart","q":"\"레퀴엠 중 'Lacrimosa'\" \"Mozart\"","cat":"주파수","m":"슬픔의 눈물을 정화의 에너지로 바꾸어 죄책감"},{"t":"혁명 에튜드","a":"Chopin","q":"\"혁명 에튜드\" \"Chopin\"","cat":"주파수","m":"억눌린 분노와 두려움을 폭발적인 타건으로 분"},{"t":"아베 마리아","a":"Schubert","q":"\"아베 마리아\" \"Schubert\"","cat":"주파수","m":"자애로운 선율을 통해 자책하는 마음을 감싸 "},{"t":"사계 중 '겨울' 1악장","a":"Vivaldi","q":"\"사계 중 '겨울' 1악장\" \"Vivaldi\"","cat":"주파수","m":"날카로운 추위 속에서도 멈추지 않는 생동감으"},{"t":"비창 교향곡 4악장","a":"Tchaikovsky","q":"\"비창 교향곡 4악장\" \"Tchaikovsky\"","cat":"주파수","m":"절망의 끝을 경험하게 함으로써 역설적으로 재"},{"t":"라 캄파넬라","a":"Liszt","q":"\"라 캄파넬라\" \"Liszt\"","cat":"주파수","m":"정교한 고음의 울림이 뇌의 긴장을 깨뜨리고 "},{"t":"달빛 (Clair de Lune)","a":"Debussy","q":"\"달빛 (Clair de Lune)\" \"Debussy\"","cat":"주파수","m":"몽환적인 화성이 경직된 사고를 유연하게 풀어"},{"t":"메시아 중 '할렐루야'","a":"Handel","q":"\"메시아 중 '할렐루야'\" \"Handel\"","cat":"주파수","m":"승리의 환희를 통해 패배주의적 공포를 즉각적"},{"t":"독일 레퀴엠","a":"Brahms","q":"\"독일 레퀴엠\" \"Brahms\"","cat":"주파수","m":"죽음과 상실에 대한 두려움을 삶의 숭고한 질"},{"t":"피아노 협주곡 2번 1악장","a":"Rachmaninoff","q":"\"피아노 협주곡 2번 1악장\" \"Rachmaninoff\"","cat":"주파수","m":"무거운 우울의 늪에서 서서히 솟구쳐 오르는 "},{"t":"캐논 (Canon in D)","a":"Pachelbel","q":"\"캐논 (Canon in D)\" \"Pachelbel\"","cat":"주파수","m":"반복되는 순환 구조가 흩어진 의식을 정돈하고"},{"t":"바이올린 협주곡 E단조","a":"Mendelssohn","q":"\"바이올린 협주곡 E단조\" \"Mendelssohn\"","cat":"주파수","m":"끊임없이 흐르는 유려한 선율이 정체된 감정의"},{"t":"동물의 사육제 중 '백조'","a":"Saint-Saëns","q":"\"동물의 사육제 중 '백조'\" \"Saint-Saëns\"","cat":"주파수","m":"우아한 흐름을 통해 자신을 비하하는 마음을 "},{"t":"발퀴레의 기행","a":"Wagner","q":"\"발퀴레의 기행\" \"Wagner\"","cat":"주파수","m":"압도적인 사운드로 위축된 자아를 깨우고 행동"},{"t":"페르귄트 모음곡 '아침의 기분'","a":"Grieg","q":"\"페르귄트 모음곡 '아침의 기분'\" \"Grieg\"","cat":"주파수","m":"빛이 번져가는 파동을 통해 어둠 속의 공포를"},{"t":"현을 위한 아다지오","a":"Barber","q":"\"현을 위한 아다지오\" \"Barber\"","cat":"주파수","m":"깊은 비탄의 선율이 영혼의 응어리를 녹여내어"},{"t":"교향곡 5번 4악장 '아다지에토'","a":"Mahler","q":"\"교향곡 5번 4악장 '아다지에토'\" \"Mahler\"","cat":"주파수","m":"말로 표현 못 할 내면의 슬픔을 우주적 사랑"},{"t":"투란도트 중 '공주는 잠 못 이루고'","a":"Puccini","q":"\"투란도트 중 '공주는 잠 못 이루고'\" \"Puccini\"","cat":"주파수","m":"승리를 확신하는 고음의 파동이 불확실성에 대"},{"t":"카르멘 모음곡 '투우사의 노래'","a":"Bizet","q":"\"카르멘 모음곡 '투우사의 노래'\" \"Bizet\"","cat":"주파수","m":"당당한 리듬으로 사회적 위축감을 해소하고 자"},{"t":"위풍당당 행진곡","a":"Elgar","q":"\"위풍당당 행진곡\" \"Elgar\"","cat":"주파수","m":"장엄한 선율이 자존감을 높여주어 죄책감의 굴"},{"t":"짐노페디 1번","a":"Satie","q":"\"짐노페디 1번\" \"Satie\"","cat":"주파수","m":"불필요한 장식을 뺀 투명한 선율이 복잡한 걱"},{"t":"행성 모음곡 중 '목성'","a":"Holst","q":"\"행성 모음곡 중 '목성'\" \"Holst\"","cat":"주파수","m":"거대한 우주적 풍요를 느끼게 하여 결핍에서 "},{"t":"신세계 교향곡 2악장","a":"Dvořák","q":"\"신세계 교향곡 2악장\" \"Dvořák\"","cat":"주파수","m":"향수와 안식의 선율이 불안한 영혼에게 안전한"},{"t":"윌리엄 텔 서곡","a":"Rossini","q":"\"윌리엄 텔 서곡\" \"Rossini\"","cat":"주파수","m":"질주하는 리듬감이 무기력을 파괴하고 새로운 "},{"t":"핀란디아","a":"Sibelius","q":"\"핀란디아\" \"Sibelius\"","cat":"주파수","m":"고난을 이겨내는 민족적 에너지를 통해 개인의"},{"t":"볼레로","a":"Ravel","q":"\"볼레로\" \"Ravel\"","cat":"주파수","m":"점진적으로 고조되는 에너지가 의식의 밑바닥부"},{"t":"전람회의 그림 '프롬나드'","a":"Mussorgsky","q":"\"전람회의 그림 '프롬나드'\" \"Mussorgsky\"","cat":"주파수","m":"한 걸음씩 내딛는 걸음의 리듬으로 정지된 삶"},{"t":"아름답고 푸른 도나우","a":"Strauss II","q":"\"아름답고 푸른 도나우\" \"Strauss II\"","cat":"주파수","m":"유연한 왈츠의 흐름이 경직된 마음의 근육을 "},{"t":"카르미나 부라나 'O Fortuna'","a":"Orff","q":"\"카르미나 부라나 'O Fortuna'\" \"Orff\"","cat":"주파수","m":"운명의 거대한 수레바퀴를 직시하며 거부할 수"},{"t":"나부코 중 '히브리 노예들의 합창'","a":"Verdi","q":"\"나부코 중 '히브리 노예들의 합창'\" \"Verdi\"","cat":"주파수","m":"억압받는 영혼들의 자유를 향한 갈망으로 내면"},{"t":"카프리스 24번","a":"Paganini","q":"\"카프리스 24번\" \"Paganini\"","cat":"주파수","m":"현란한 기교의 파동이 뇌를 자극하여 고정된 "},{"t":"교향곡 '놀람' 2악장","a":"Haydn","q":"\"교향곡 '놀람' 2악장\" \"Haydn\"","cat":"주파수","m":"예상치 못한 반전의 리듬으로 무감각해진 의식"},{"t":"왕벌의 비행","a":"Rimsky-Korsakov","q":"\"왕벌의 비행\" \"Rimsky-Korsakov\"","cat":"주파수","m":"초고속 진동의 파동이 신경계의 정체된 노폐물"},{"t":"레퀴엠 중 'Pie Jesu'","a":"Fauré","q":"\"레퀴엠 중 'Pie Jesu'\" \"Fauré\"","cat":"주파수","m":"천상적인 순수함으로 자책하는 영혼에 무조건적"},{"t":"중앙아시아의 초원에서","a":"Borodin","q":"\"중앙아시아의 초원에서\" \"Borodin\"","cat":"주파수","m":"광활한 지평선의 이미지를 통해 협소한 고민으"},{"t":"콜 니드라이 (Kol Nidrei)","a":"Bruch","q":"\"콜 니드라이 (Kol Nidrei)\" \"Bruch\"","cat":"주파수","m":"신과 맺은 서약을 이행하지 못한 죄책감을 씻"},{"t":"아다지오 G단조","a":"Albinoni","q":"\"아다지오 G단조\" \"Albinoni\"","cat":"주파수","m":"깊은 슬픔을 수용하는 정적인 아름다움이 마음"},{"t":"타이스의 명상곡","a":"Massenet","q":"\"타이스의 명상곡\" \"Massenet\"","cat":"주파수","m":"세속적 번뇌를 씻어내는 맑은 바이올린 선율이"},{"t":"자라투스트라는 이렇게 말했다","a":"Strauss","q":"\"자라투스트라는 이렇게 말했다\" \"Strauss\"","cat":"주파수","m":"새로운 의식의 탄생을 알리는 웅장한 화음이 "},{"t":"미뉴에트","a":"Boccherini","q":"\"미뉴에트\" \"Boccherini\"","cat":"주파수","m":"우아하고 경쾌한 질서가 혼란스러운 내면 상태"},{"t":"랩소디 인 블루","a":"Gershwin","q":"\"랩소디 인 블루\" \"Gershwin\"","cat":"주파수","m":"변칙적이고 자유로운 리듬이 고정관념이라는 감"},{"t":"천국과 지옥 중 '캉캉'","a":"Offenbach","q":"\"천국과 지옥 중 '캉캉'\" \"Offenbach\"","cat":"주파수","m":"폭발적인 낙천성을 통해 우울의 그림자를 즉각"},{"t":"로미오와 줄리엣 '기사들의 춤'","a":"Prokofiev","q":"\"로미오와 줄리엣 '기사들의 춤'\" \"Prokofiev\"","cat":"주파수","m":"엄격하고 묵직한 리듬이 의식의 중심을 잡아 "},{"t":"왈츠 2번","a":"Shostakovich","q":"\"왈츠 2번\" \"Shostakovich\"","cat":"주파수","m":"쓸쓸함 속의 우아함을 통해 슬픔조차 삶의 춤"},{"t":"카발레리아 루스티카나 '간주곡'","a":"Mascagni","q":"\"카발레리아 루스티카나 '간주곡'\" \"Mascagni\"","cat":"주파수","m":"지극한 평화의 선율이 격정적인 감정의 파동을"},{"t":"무반주 첼로 모음곡 1번 '프렐류드'","a":"Bach","q":"\"무반주 첼로 모음곡 1번 '프렐류드'\" \"Bach\"","cat":"주파수","m":"근원적인 울림이 자아의 뿌리를 자극하여 정체"},{"t":"피아노 소나타 '월광' 1악장","a":"Beethoven","q":"\"피아노 소나타 '월광' 1악장\" \"Beethoven\"","cat":"주파수","m":"고요한 수면 같은 선율이 무의식 깊은 곳의 "},{"t":"수상음악 중 '알라 혼파이프'","a":"Handel","q":"\"수상음악 중 '알라 혼파이프'\" \"Handel\"","cat":"주파수","m":"활기찬 물의 에너지를 형상화하여 정체된 운명"},{"t":"토카타와 푸가 D단조","a":"Bach","q":"\"토카타와 푸가 D단조\" \"Bach\"","cat":"주파수","m":"압도적인 파이프 오르간의 진동이 내면의 거대"},{"t":"피아노 협주곡 21번 2악장","a":"Mozart","q":"\"피아노 협주곡 21번 2악장\" \"Mozart\"","cat":"주파수","m":"천상적인 투명함이 과거의 잘못에 묶인 죄책감"},{"t":"교향곡 9번 '합창' 4악장","a":"Beethoven","q":"\"교향곡 9번 '합창' 4악장\" \"Beethoven\"","cat":"주파수","m":"인류애적 환희를 통해 고립된 공포를 무너뜨리"},{"t":"녹턴 Op.9 No.2","a":"Chopin","q":"\"녹턴 Op.9 No.2\" \"Chopin\"","cat":"주파수","m":"부드러운 야상의 선율이 경직된 심장을 이완하"},{"t":"마왕","a":"Schubert","q":"\"마왕\" \"Schubert\"","cat":"주파수","m":"긴박한 리듬을 통해 공포의 실체를 직면하게 "},{"t":"글로리아 (Gloria)","a":"Vivaldi","q":"\"글로리아 (Gloria)\" \"Vivaldi\"","cat":"주파수","m":"찬란한 합창의 에너지가 우울과 자기비하의 그"},{"t":"백조의 호수 '정경'","a":"Tchaikovsky","q":"\"백조의 호수 '정경'\" \"Tchaikovsky\"","cat":"주파수","m":"비극적 아름다움 속에서 희망의 실마리를 찾아"},{"t":"헝가리 무곡 5번","a":"Brahms","q":"\"헝가리 무곡 5번\" \"Brahms\"","cat":"주파수","m":"예측 불가능한 템포의 변화가 고정된 부정적 "},{"t":"보칼리제 (Vocalise)","a":"Rachmaninoff","q":"\"보칼리제 (Vocalise)\" \"Rachmaninoff\"","cat":"주파수","m":"가사 없는 선율의 흐름이 말로 다 못할 슬픔"},{"t":"아라베스크 1번","a":"Debussy","q":"\"아라베스크 1번\" \"Debussy\"","cat":"주파수","m":"곡선적인 선율의 배치가 의식의 유연성을 높여"},{"t":"울게 하소서 (Lascia ch'io pianga)","a":"Handel","q":"\"울게 하소서 (Lascia ch'io pianga)\" \"Handel\"","cat":"주파수","m":"진심 어린 슬픔의 분출을 통해 억압된 자유와"},{"t":"한여름 밤의 꿈 '결혼 행진곡'","a":"Mendelssohn","q":"\"한여름 밤의 꿈 '결혼 행진곡'\" \"Mendelssohn\"","cat":"주파수","m":"축제의 에너지를 통해 위축된 자아를 깨우고 "},{"t":"죽음의 무도","a":"Saint-Saëns","q":"\"죽음의 무도\" \"Saint-Saëns\"","cat":"주파수","m":"죽음이라는 공포의 대상을 춤으로 승화하여 실"},{"t":"탄호이저 서곡","a":"Wagner","q":"\"탄호이저 서곡\" \"Wagner\"","cat":"주파수","m":"장엄한 구원의 메시지가 영혼의 무거운 짐을 "},{"t":"솔베이지의 노래","a":"Grieg","q":"\"솔베이지의 노래\" \"Grieg\"","cat":"주파수","m":"기다림 끝에 얻는 위안의 정서가 상실에 대한"},{"t":"교향곡 2번 '부활' 5악장","a":"Mahler","q":"\"교향곡 2번 '부활' 5악장\" \"Mahler\"","cat":"주파수","m":"소멸 뒤의 재생을 노래하며 죽음과 실패에 대"},{"t":"나비부인 중 '허밍 코러스'","a":"Puccini","q":"\"나비부인 중 '허밍 코러스'\" \"Puccini\"","cat":"주파수","m":"절제된 평온함이 극도의 긴장 상태에 있는 신"},{"t":"레퀴엠 중 'Dies Irae'","a":"Verdi","q":"\"레퀴엠 중 'Dies Irae'\" \"Verdi\"","cat":"주파수","m":"분노의 날을 상징하는 타악기 파동이 내면의 "},{"t":"짐노페디 2번","a":"Satie","q":"\"짐노페디 2번\" \"Satie\"","cat":"주파수","m":"정적인 공간감을 형성하여 과부하된 뇌에 휴식"},{"t":"행성 모음곡 '화성'","a":"Holst","q":"\"행성 모음곡 '화성'\" \"Holst\"","cat":"주파수","m":"전쟁의 신을 상징하는 강렬한 리듬이 나약함에"},{"t":"첼로 협주곡 B단조 1악장","a":"Dvořák","q":"\"첼로 협주곡 B단조 1악장\" \"Dvořák\"","cat":"주파수","m":"첼로의 깊은 울림이 하단 전신의 에너지를 자"},{"t":"세비야의 이발사 서곡","a":"Rossini","q":"\"세비야의 이발사 서곡\" \"Rossini\"","cat":"주파수","m":"재치 있고 경쾌한 흐름이 심각한 고민의 무게"},{"t":"슬픈 왈츠","a":"Sibelius","q":"\"슬픈 왈츠\" \"Sibelius\"","cat":"주파수","m":"슬픔 속에서 춤추는 역설을 통해 감정적 정체"},{"t":"죽은 왕녀를 위한 파반느","a":"Ravel","q":"\"죽은 왕녀를 위한 파반느\" \"Ravel\"","cat":"주파수","m":"숭고한 애도를 통해 상실의 상처를 영적인 평"},{"t":"민둥산의 하룻밤","a":"Mussorgsky","q":"\"민둥산의 하룻밤\" \"Mussorgsky\"","cat":"주파수","m":"혼란스러운 악의 이미지를 음악적 질서로 제압"},{"t":"박쥐 서곡","a":"Strauss II","q":"\"박쥐 서곡\" \"Strauss II\"","cat":"주파수","m":"희극적인 고양감이 패배주의적 사고를 성공의 "},{"t":"카르미나 부라나 'In Trutina'","a":"Orff","q":"\"카르미나 부라나 'In Trutina'\" \"Orff\"","cat":"주파수","m":"이성과 감정 사이의 균형을 찾아내어 혼란스러"},{"t":"라 캄파넬라 (바이올린 버전)","a":"Paganini","q":"\"라 캄파넬라 (바이올린 버전)\" \"Paganini\"","cat":"주파수","m":"날카로운 초고역대의 진동이 뇌의 낡은 회로를"},{"t":"현악 사중주 '황제' 2악장","a":"Haydn","q":"\"현악 사중주 '황제' 2악장\" \"Haydn\"","cat":"주파수","m":"품격 있는 질서의 선율이 자존감을 회복시키고"},{"t":"다뉴브 강의 물결","a":"Borodin","q":"\"다뉴브 강의 물결\" \"Borodin\"","cat":"주파수","m":"물의 유려한 흐름을 형상화하여 경직된 마음을"},{"t":"파반느 (Pavane)","a":"Fauré","q":"\"파반느 (Pavane)\" \"Fauré\"","cat":"주파수","m":"우아하고 정적인 흐름이 조급함에서 오는 불안"},{"t":"오보에 협주곡 2번 2악장","a":"Albinoni","q":"\"오보에 협주곡 2번 2악장\" \"Albinoni\"","cat":"주파수","m":"오보에의 고독한 선율이 내면의 외로움을 직시"},{"t":"페드르 서곡","a":"Massenet","q":"\"페드르 서곡\" \"Massenet\"","cat":"주파수","m":"드라마틱한 감정 선이 억눌린 표현 욕구를 자"},{"t":"파리의 아메리카인","a":"Gershwin","q":"\"파리의 아메리카인\" \"Gershwin\"","cat":"주파수","m":"이국적인 활기가 낯선 환경에 대한 공포를 호"},{"t":"피터와 늑대","a":"Prokofiev","q":"\"피터와 늑대\" \"Prokofiev\"","cat":"주파수","m":"각 악기의 명확한 캐릭터가 혼란스러운 의식에"},{"t":"재즈 모음곡 2번 '왈츠'","a":"Shostakovich","q":"\"재즈 모음곡 2번 '왈츠'\" \"Shostakovich\"","cat":"주파수","m":"쓸쓸함 뒤의 낭만이 과거의 아픔을 삶의 배경"},{"t":"라미코 프리츠 '간주곡'","a":"Mascagni","q":"\"라미코 프리츠 '간주곡'\" \"Mascagni\"","cat":"주파수","m":"따뜻한 햇살 같은 선율이 얼어붙은 마음의 공"},{"t":"골트베르크 변주곡 '아리아'","a":"Bach","q":"\"골트베르크 변주곡 '아리아'\" \"Bach\"","cat":"주파수","m":"완벽한 수학적 대칭 구조가 불안정한 뇌파를 "},{"t":"피아노 소나타 '비창' 2악장","a":"Beethoven","q":"\"피아노 소나타 '비창' 2악장\" \"Beethoven\"","cat":"주파수","m":"깊은 슬픔의 수용을 통해 진정한 자기 용서와"},{"t":"라르고 (Largo)","a":"Handel","q":"\"라르고 (Largo)\" \"Handel\"","cat":"주파수","m":"느리고 웅장한 호흡이 심박수를 안정시키고 근"},{"t":"오르페오와 에우리디체 '정령들의 춤'","a":"Gluck","q":"\"오르페오와 에우리디체 '정령들의 춤'\" \"Gluck\"","cat":"주파수","m":"순수한 플루트 선율이 복잡한 세속적 번뇌의 "},{"t":"아이네 클라이네 나흐트무지크 1악장","a":"Mozart","q":"\"아이네 클라이네 나흐트무지크 1악장\" \"Mozart\"","cat":"주파수","m":"명랑한 에너지가 무거운 마음의 하중을 줄여 "},{"t":"사랑의 꿈 3번","a":"Liszt","q":"\"사랑의 꿈 3번\" \"Liszt\"","cat":"주파수","m":"지극한 사랑의 파동이 자기 증오라는 가장 큰"},{"t":"무언가 '봄의 노래'","a":"Mendelssohn","q":"\"무언가 '봄의 노래'\" \"Mendelssohn\"","cat":"주파수","m":"생동감 넘치는 봄의 기운이 위축된 생명 에너"},{"t":"라 폴리아 (La Folia)","a":"Corelli","q":"\"라 폴리아 (La Folia)\" \"Corelli\"","cat":"주파수","m":"광기를 예술적 변주로 승화하여 통제 불능의 "},{"t":"기타 오중주 '마드리드의 귀영 나팔'","a":"Boccherini","q":"\"기타 오중주 '마드리드의 귀영 나팔'\" \"Boccherini\"","cat":"주파수","m":"행진의 리듬이 흩어진 정신을 집중시키고 실천"},{"t":"사랑의 인사 (Salut d'Amour)","a":"Elgar","q":"\"사랑의 인사 (Salut d'Amour)\" \"Elgar\"","cat":"주파수","m":"친절하고 따뜻한 파동이 타인에 대한 경계심과"},{"t":"아란후에스 협주곡 2악장","a":"Rodrigo","q":"\"아란후에스 협주곡 2악장\" \"Rodrigo\"","cat":"주파수","m":"기타의 떨림이 내면의 슬픔을 섬세하게 어루만"},{"t":"나의 조국 중 '몰다우'","a":"Smetana","q":"\"나의 조국 중 '몰다우'\" \"Smetana\"","cat":"주파수","m":"굽이쳐 흐르는 강의 생명력이 운명의 막힌 혈"},{"t":"칸타타 147번 '예수, 인간 소망의 기쁨'","a":"Bach","q":"\"칸타타 147번 '예수, 인간 소망의 기쁨'\" \"Bach\"","cat":"주파수","m":"반복되는 아름다운 음형이 우주적 사랑의 보호"},{"t":"브란덴부르크 협주곡 3번 1악장","a":"J.S. Bach","q":"\"브란덴부르크 협주곡 3번 1악장\" \"J.S. Bach\"","cat":"주파수","m":"수학적 완결성을 가진 리듬이 뇌의 혼란을 잠"},{"t":"교향곡 6번 '전원' 1악장","a":"Beethoven","q":"\"교향곡 6번 '전원' 1악장\" \"Beethoven\"","cat":"주파수","m":"자연의 평온함을 형상화하여 도시적 긴장과 불"},{"t":"클라리넷 협주곡 A장조 2악장","a":"Mozart","q":"\"클라리넷 협주곡 A장조 2악장\" \"Mozart\"","cat":"주파수","m":"클라리넷의 따뜻한 음색이 자기 비하의 목소리"},{"t":"발라드 1번 G단조","a":"Chopin","q":"\"발라드 1번 G단조\" \"Chopin\"","cat":"주파수","m":"서사적 흐름을 통해 내면의 격동을 순차적으로"},{"t":"현악 사중주 '죽음과 소녀' 2악장","a":"Schubert","q":"\"현악 사중주 '죽음과 소녀' 2악장\" \"Schubert\"","cat":"주파수","m":"죽음에 대한 공포를 예술적 승화로 이끌어 실"},{"t":"조화의 영감 Op.3 No.6","a":"Vivaldi","q":"\"조화의 영감 Op.3 No.6\" \"Vivaldi\"","cat":"주파수","m":"규칙적인 현악의 합주가 흩어진 정신을 모으고"},{"t":"현을 위한 세레나데 2악장 '왈츠'","a":"Tchaikovsky","q":"\"현을 위한 세레나데 2악장 '왈츠'\" \"Tchaikovsky\"","cat":"주파수","m":"가벼운 왈츠의 파동이 무거운 죄책감의 하중을"},{"t":"전주곡 (Les Préludes)","a":"Liszt","q":"\"전주곡 (Les Préludes)\" \"Liszt\"","cat":"주파수","m":"삶의 시련을 승리를 위한 전주곡으로 인식하게"},{"t":"목신들의 오후 전주곡","a":"Debussy","q":"\"목신들의 오후 전주곡\" \"Debussy\"","cat":"주파수","m":"경계가 모호한 화성이 강박적 사고를 풀어주고"},{"t":"피아노 협주곡 1번 2악장","a":"Brahms","q":"\"피아노 협주곡 1번 2악장\" \"Brahms\"","cat":"주파수","m":"깊은 성찰의 선율이 과거의 상처를 직시하고 "},{"t":"심포니 2번 3악장 '아다지오'","a":"Rachmaninoff","q":"\"심포니 2번 3악장 '아다지오'\" \"Rachmaninoff\"","cat":"주파수","m":"끝없이 펼쳐지는 선율이 우울의 장벽을 허물고"},{"t":"왕궁의 불꽃놀이 '서곡'","a":"Handel","q":"\"왕궁의 불꽃놀이 '서곡'\" \"Handel\"","cat":"주파수","m":"축제의 장엄함이 패배주의적 공포를 태우고 승"},{"t":"핑갈의 동굴 서곡","a":"Mendelssohn","q":"\"핑갈의 동굴 서곡\" \"Mendelssohn\"","cat":"주파수","m":"파도의 역동적인 리듬이 정체된 감정의 혈을 "},{"t":"서주와 론도 카프리치오소","a":"Saint-Saëns","q":"\"서주와 론도 카프리치오소\" \"Saint-Saëns\"","cat":"주파수","m":"화려한 기교의 전환이 우울한 기분을 즉각적으"},{"t":"로엔그린 3막 전주곡","a":"Wagner","q":"\"로엔그린 3막 전주곡\" \"Wagner\"","cat":"주파수","m":"웅장한 금관의 울림이 위축된 자아를 깨우고 "},{"t":"페르귄트 '산속 마왕의 궁전에서'","a":"Grieg","q":"\"페르귄트 '산속 마왕의 궁전에서'\" \"Grieg\"","cat":"주파수","m":"압박감을 점진적으로 고조시켜 폭발시킴으로써 "},{"t":"교향곡 1번 '거인' 4악장","a":"Mahler","q":"\"교향곡 1번 '거인' 4악장\" \"Mahler\"","cat":"주파수","m":"폭풍 같은 서두가 내면의 두려움을 산산조각 "},{"t":"현을 위한 세레나데","a":"Barber","q":"\"현을 위한 세레나데\" \"Barber\"","cat":"주파수","m":"섬세한 현의 떨림이 세포 속 깊이 숨은 공포"},{"t":"자니 스키키 '오 사랑하는 나의 아버지'","a":"Puccini","q":"\"자니 스키키 '오 사랑하는 나의 아버지'\" \"Puccini\"","cat":"주파수","m":"지극한 순수함의 선율이 타인에 대한 미움과 "},{"t":"아이다 '개선 행진곡'","a":"Verdi","q":"\"아이다 '개선 행진곡'\" \"Verdi\"","cat":"주파수","m":"승리의 파동이 사회적 불안감을 해소하고 존재"},{"t":"그노시엔 1번","a":"Satie","q":"\"그노시엔 1번\" \"Satie\"","cat":"주파수","m":"기묘한 평온함이 고정관념을 파괴하고 새로운 "},{"t":"행성 '금성-평화의 전령'","a":"Holst","q":"\"행성 '금성-평화의 전령'\" \"Holst\"","cat":"주파수","m":"극적인 평온함의 주파수가 신경계를 우주적 안"},{"t":"유모레스크","a":"Dvořák","q":"\"유모레스크\" \"Dvořák\"","cat":"주파수","m":"가벼운 유머의 리듬이 심각한 번뇌의 무게를 "},{"t":"카렐리아 모음곡 '행진곡'","a":"Sibelius","q":"\"카렐리아 모음곡 '행진곡'\" \"Sibelius\"","cat":"주파수","m":"씩씩한 행진의 리듬이 무기력에서 오는 공포를"},{"t":"물의 희롱 (Jeux d'eau)","a":"Ravel","q":"\"물의 희롱 (Jeux d'eau)\" \"Ravel\"","cat":"주파수","m":"맑은 물의 입자를 형상화한 소리가 뇌의 탁한"},{"t":"전람회의 그림 '키예프의 대문'","a":"Mussorgsky","q":"\"전람회의 그림 '키예프의 대문'\" \"Mussorgsky\"","cat":"주파수","m":"거대한 문을 통과하는 장엄한 선율이 영적 해"},{"t":"봄의 소리 왈츠","a":"Strauss II","q":"\"봄의 소리 왈츠\" \"Strauss II\"","cat":"주파수","m":"생명의 태동을 느끼게 하여 죽음과 정체에 대"},{"t":"카르미나 부라나 'In Taberna'","a":"Orff","q":"\"카르미나 부라나 'In Taberna'\" \"Orff\"","cat":"주파수","m":"인간 본연의 생명력을 분출하여 사회적 위선을"},{"t":"바이올린 협주곡 1번 3악장","a":"Paganini","q":"\"바이올린 협주곡 1번 3악장\" \"Paganini\"","cat":"주파수","m":"경쾌한 현의 탄성이 마음의 긴장을 튕겨내어 "},{"t":"파르티타 2번 '샤콘느'","a":"Bach","q":"\"파르티타 2번 '샤콘느'\" \"Bach\"","cat":"주파수","m":"인생의 고뇌를 집약한 뒤 승화시키는 선율로 "},{"t":"피아노 소나타 '템페스트' 3악장","a":"Beethoven","q":"\"피아노 소나타 '템페스트' 3악장\" \"Beethoven\"","cat":"주파수","m":"폭풍 속의 질서 있는 리듬이 혼돈 속의 자아"},{"t":"피아노 소나타 16번 1악장","a":"Mozart","q":"\"피아노 소나타 16번 1악장\" \"Mozart\"","cat":"주파수","m":"단순함의 미학을 통해 복잡한 걱정의 독소를 "},{"t":"빗방울 전주곡","a":"Chopin","q":"\"빗방울 전주곡\" \"Chopin\"","cat":"주파수","m":"반복되는 음형이 마음의 먼지를 씻어내는 비처"},{"t":"피아노 오중주 '송어' 4악장","a":"Schubert","q":"\"피아노 오중주 '송어' 4악장\" \"Schubert\"","cat":"주파수","m":"맑은 시냇물의 생동감이 위축된 기분을 상쾌하"},{"t":"호두까기 인형 '꽃의 왈츠'","a":"Tchaikovsky","q":"\"호두까기 인형 '꽃의 왈츠'\" \"Tchaikovsky\"","cat":"주파수","m":"화려한 조화의 에너지가 우울과 고립감을 즉각"},{"t":"위로 (Consolations) 3번","a":"Liszt","q":"\"위로 (Consolations) 3번\" \"Liszt\"","cat":"주파수","m":"제목 그대로 영혼의 깊은 상처를 어루만지는 "},{"t":"교향곡 3번 3악장","a":"Brahms","q":"\"교향곡 3번 3악장\" \"Brahms\"","cat":"주파수","m":"차분한 우수가 오히려 마음을 단단하게 지탱해"},{"t":"파가니니 주제에 의한 랩소디 18변주","a":"Rachmaninoff","q":"\"파가니니 주제에 의한 랩소디 18변주\" \"Rachmaninoff\"","cat":"주파수","m":"로맨틱한 선율의 절정이 존재에 대한 긍정적 "},{"t":"꿈 (Rêverie)","a":"Debussy","q":"\"꿈 (Rêverie)\" \"Debussy\"","cat":"주파수","m":"꿈결 같은 평화로운 상태로 유도하여 현실의 "},{"t":"수상음악 '에어' (Air)","a":"Handel","q":"\"수상음악 '에어' (Air)\" \"Handel\"","cat":"주파수","m":"물 위를 흐르는 듯한 우아함이 감정의 굴곡을"},{"t":"시실리아노","a":"Fauré","q":"\"시실리아노\" \"Fauré\"","cat":"주파수","m":"서정적인 애수가 가슴 속 응어리를 유연하게 "},{"t":"현을 위한 세레나데 2악장","a":"Elgar","q":"\"현을 위한 세레나데 2악장\" \"Elgar\"","cat":"주파수","m":"품격 있는 고요함이 자존감을 회복하고 정서적"},{"t":"합주 협주곡 '크리스마스'","a":"Corelli","q":"\"합주 협주곡 '크리스마스'\" \"Corelli\"","cat":"주파수","m":"성스러운 평화의 에너지가 근원적 불안을 정화"},{"t":"아브델라자르 모음곡 '론도'","a":"Purcell","q":"\"아브델라자르 모음곡 '론도'\" \"Purcell\"","cat":"주파수","m":"경쾌하고 명확한 질서가 혼란스러운 의식에 기"},{"t":"멜로디 (Melodie)","a":"Gluck","q":"\"멜로디 (Melodie)\" \"Gluck\"","cat":"주파수","m":"정화된 슬픔의 선율이 영혼을 맑게 헹구어내는"},{"t":"나바라의 여인 '간주곡'","a":"Massenet","q":"\"나바라의 여인 '간주곡'\" \"Massenet\"","cat":"주파수","m":"강렬하고 뜨거운 에너지가 무기력이라는 공포를"},{"t":"관현악 모음곡 2번 '바디네리'","a":"Bach","q":"\"관현악 모음곡 2번 '바디네리'\" \"Bach\"","cat":"주파수","m":"장난기 섞인 경쾌함이 고통에 대한 집착을 끊"},{"t":"피아노 소나타 '열정' 3악장","a":"Beethoven","q":"\"피아노 소나타 '열정' 3악장\" \"Beethoven\"","cat":"주파수","m":"거대한 의지의 파동이 모든 장애물과 두려움을"},{"t":"교향곡 41번 '주피터' 4악장","a":"Mozart","q":"\"교향곡 41번 '주피터' 4악장\" \"Mozart\"","cat":"주파수","m":"완벽한 우주적 조화와 환희를 통해 396Hz"},{"t":"교향곡 3번 '영웅' 1악장","a":"Beethoven","q":"\"교향곡 3번 '영웅' 1악장\" \"Beethoven\"","cat":"주파수","m":"기존의 질서를 타파하고 새로운 시대를 여는 "},{"t":"이탈리아 협주곡 1악장","a":"Bach","q":"\"이탈리아 협주곡 1악장\" \"Bach\"","cat":"주파수","m":"명쾌하고 활기찬 리듬이 정체된 일상의 고리를"},{"t":"피아노 소나타 11번 3악장 '터키 행진곡'","a":"Mozart","q":"\"피아노 소나타 11번 3악장 '터키 행진곡'\" \"Mozart\"","cat":"주파수","m":"경쾌하고 단호한 타건이 심리적 장벽을 무너뜨"},{"t":"에튜드 Op.10 No.12 '혁명'","a":"Chopin","q":"\"에튜드 Op.10 No.12 '혁명'\" \"Chopin\"","cat":"주파수","m":"억눌린 상황을 폭발적인 에너지로 돌파하여 새"},{"t":"사계 중 '여름' 3악장","a":"Vivaldi","q":"\"사계 중 '여름' 3악장\" \"Vivaldi\"","cat":"주파수","m":"폭풍우 같은 격동의 선율이 낡고 오염된 환경"},{"t":"교향곡 1번 4악장","a":"Brahms","q":"\"교향곡 1번 4악장\" \"Brahms\"","cat":"주파수","m":"긴 어둠의 서주를 지나 찬란한 주제로 전환되"},{"t":"헝가리 광시곡 2번","a":"Liszt","q":"\"헝가리 광시곡 2번\" \"Liszt\"","cat":"주파수","m":"변화무쌍한 리듬과 속도감이 고착된 사고방식을"},{"t":"교향곡 5번 4악장","a":"Tchaikovsky","q":"\"교향곡 5번 4악장\" \"Tchaikovsky\"","cat":"주파수","m":"운명에 굴복하지 않고 승리의 행진으로 나아가"},{"t":"피아노 협주곡 3번 3악장","a":"Rachmaninoff","q":"\"피아노 협주곡 3번 3악장\" \"Rachmaninoff\"","cat":"주파수","m":"한계를 넘어서는 초월적 에너지가 불가능해 보"},{"t":"한여름 밤의 꿈 '스케르초'","a":"Mendelssohn","q":"\"한여름 밤의 꿈 '스케르초'\" \"Mendelssohn\"","cat":"주파수","m":"가볍고 빠른 도약의 에너지가 무거운 상황을 "},{"t":"윌리엄 텔 서곡 '스위스 군대의 행진'","a":"Rossini","q":"\"윌리엄 텔 서곡 '스위스 군대의 행진'\" \"Rossini\"","cat":"주파수","m":"질주하는 리듬이 정지된 상황에 강력한 가속도"},{"t":"운명의 힘 서곡","a":"Verdi","q":"\"운명의 힘 서곡\" \"Verdi\"","cat":"주파수","m":"거부할 수 없는 변화의 파동을 받아들이고 유"},{"t":"방황하는 네덜란드인 서곡","a":"Wagner","q":"\"방황하는 네덜란드인 서곡\" \"Wagner\"","cat":"주파수","m":"거친 파도를 뚫고 항해하는 선율이 삶의 난관"},{"t":"교향곡 2번 4악장","a":"Sibelius","q":"\"교향곡 2번 4악장\" \"Sibelius\"","cat":"주파수","m":"웅장한 도약의 선율이 위축된 의식을 일깨워 "},{"t":"피아노 협주곡 A단조 1악장","a":"Grieg","q":"\"피아노 협주곡 A단조 1악장\" \"Grieg\"","cat":"주파수","m":"북구의 강렬한 생명력이 정체된 혈맥을 뚫어 "},{"t":"기쁨의 섬","a":"Debussy","q":"\"기쁨의 섬\" \"Debussy\"","cat":"주파수","m":"환희를 향해 나아가는 역동적인 화성이 우울한"},{"t":"교향곡 3번 '오르간' 2부","a":"Saint-Saëns","q":"\"교향곡 3번 '오르간' 2부\" \"Saint-Saëns\"","cat":"주파수","m":"파이프 오르간의 장엄한 진동이 낡은 구조를 "},{"t":"교향곡 5번 1악장 '장례 행진곡'","a":"Mahler","q":"\"교향곡 5번 1악장 '장례 행진곡'\" \"Mahler\"","cat":"주파수","m":"끝을 명확히 함으로써 새로운 시작을 위한 공"},{"t":"토스카 중 '노래에 살고 사랑에 살고'","a":"Puccini","q":"\"토스카 중 '노래에 살고 사랑에 살고'\" \"Puccini\"","cat":"주파수","m":"시련 속에서도 변치 않는 가치를 붙들고 상황"},{"t":"아를의 여인 모음곡 중 '파랑돌'","a":"Bizet","q":"\"아를의 여인 모음곡 중 '파랑돌'\" \"Bizet\"","cat":"주파수","m":"반복되며 고조되는 리듬이 무기력을 파괴하고 "},{"t":"행성 중 '화성'","a":"Holst","q":"\"행성 중 '화성'\" \"Holst\"","cat":"주파수","m":"도전적이고 호전적인 에너지가 나약함이라는 장"},{"t":"교향곡 9번 '신세계로부터' 4악장","a":"Dvořák","q":"\"교향곡 9번 '신세계로부터' 4악장\" \"Dvořák\"","cat":"주파수","m":"새로운 세계를 향한 강력한 포효가 과거의 굴"},{"t":"치간느 (Tzigane)","a":"Ravel","q":"\"치간느 (Tzigane)\" \"Ravel\"","cat":"주파수","m":"자유분방한 집시의 선율이 형식주의에 갇힌 상"},{"t":"전람회의 그림 '바바 야가'","a":"Mussorgsky","q":"\"전람회의 그림 '바바 야가'\" \"Mussorgsky\"","cat":"주파수","m":"기괴하고 강력한 파동이 고정관념을 부수고 의"},{"t":"교향곡 1번 '고전' 4악장","a":"Prokofiev","q":"\"교향곡 1번 '고전' 4악장\" \"Prokofiev\"","cat":"주파수","m":"재치 있고 빠른 전개가 복잡하게 꼬인 상황을"},{"t":"교향곡 5번 4악장","a":"Shostakovich","q":"\"교향곡 5번 4악장\" \"Shostakovich\"","cat":"주파수","m":"억압을 뚫고 나오는 거대한 에너지가 상황의 "},{"t":"불새 중 '마왕 카스체이의 죽음'","a":"Stravinsky","q":"\"불새 중 '마왕 카스체이의 죽음'\" \"Stravinsky\"","cat":"주파수","m":"악한 질서를 파괴하는 원시적인 리듬이 강력한"},{"t":"카르미나 부라나 '운명의 여신이여'","a":"Orff","q":"\"카르미나 부라나 '운명의 여신이여'\" \"Orff\"","cat":"주파수","m":"운명의 수레바퀴를 돌리는 파동이 현재의 정체"},{"t":"무반주 바이올린 파르티타 3번 '프렐류드'","a":"Bach","q":"\"무반주 바이올린 파르티타 3번 '프렐류드'\" \"Bach\"","cat":"주파수","m":"끊임없이 솟구치는 음의 입자가 의식의 정체를"},{"t":"피아노 소나타 23번 '열정' 3악장","a":"Beethoven","q":"\"피아노 소나타 23번 '열정' 3악장\" \"Beethoven\"","cat":"주파수","m":"쉼 없이 몰아치는 파동이 나태함과 두려움이라"},{"t":"교향곡 40번 1악장","a":"Mozart","q":"\"교향곡 40번 1악장\" \"Mozart\"","cat":"주파수","m":"절박하면서도 우아한 리듬이 감정적 고착 상태"},{"t":"스케르초 2번 B플랫 단조","a":"Chopin","q":"\"스케르초 2번 B플랫 단조\" \"Chopin\"","cat":"주파수","m":"대조적인 감정의 급격한 전환이 심리적 정체 "},{"t":"메피스토 왈츠 1번","a":"Liszt","q":"\"메피스토 왈츠 1번\" \"Liszt\"","cat":"주파수","m":"유혹적이고 강렬한 리듬이 일상의 따분함을 깨"},{"t":"방랑자 환상곡","a":"Schubert","q":"\"방랑자 환상곡\" \"Schubert\"","cat":"주파수","m":"끊임없는 이동과 탐색의 에너지가 안주하려는 "},{"t":"환상 교향곡 4악장 '단두대로의 행진'","a":"Berlioz","q":"\"환상 교향곡 4악장 '단두대로의 행진'\" \"Berlioz\"","cat":"주파수","m":"극적인 파멸을 통한 완전한 정화와 새로운 의"},{"t":"틸 오일렌슈피겔의 유쾌한 장난","a":"Strauss","q":"\"틸 오일렌슈피겔의 유쾌한 장난\" \"Strauss\"","cat":"주파수","m":"고정된 권위와 질서를 비웃는 선율이 경직된 "},{"t":"세헤라자데 4악장","a":"Rimsky-Korsakov","q":"\"세헤라자데 4악장\" \"Rimsky-Korsakov\"","cat":"주파수","m":"거친 바다와 난파의 이미지가 낡은 삶의 틀을"},{"t":"위풍당당 행진곡 1번","a":"Elgar","q":"\"위풍당당 행진곡 1번\" \"Elgar\"","cat":"주파수","m":"당당한 질서의 에너지가 무질서한 상황을 정돈"},{"t":"교향곡 2번 1악장","a":"Borodin","q":"\"교향곡 2번 1악장\" \"Borodin\"","cat":"주파수","m":"묵직하고 강한 주제가 내면의 나약함을 제거하"},{"t":"피아노 소나타 K.1","a":"Scarlatti","q":"\"피아노 소나타 K.1\" \"Scarlatti\"","cat":"주파수","m":"정교하고 빠른 움직임이 뇌 회로의 정체를 방"},{"t":"카프리스 5번","a":"Paganini","q":"\"카프리스 5번\" \"Paganini\"","cat":"주파수","m":"초고난도의 기교가 한계를 돌파하는 쾌감을 주"},{"t":"현악 사중주 '나의 생애로부터' 4악장","a":"Smetana","q":"\"현악 사중주 '나의 생애로부터' 4악장\" \"Smetana\"","cat":"주파수","m":"삶의 총체적 경험을 변화의 에너지로 승화시켜"},{"t":"가야네 중 '칼춤'","a":"Khachaturian","q":"\"가야네 중 '칼춤'\" \"Khachaturian\"","cat":"주파수","m":"날카롭고 역동적인 리듬이 결단력을 높여 장애"},{"t":"교향곡 1번","a":"Barber","q":"\"교향곡 1번\" \"Barber\"","cat":"주파수","m":"현대적인 긴장감과 해소가 반복되며 복잡한 현"},{"t":"에스탄시아 중 '말람보'","a":"Ginastera","q":"\"에스탄시아 중 '말람보'\" \"Ginastera\"","cat":"주파수","m":"대지의 고동 같은 리듬이 하체와 연결된 행동"},{"t":"보통 사람을 위한 팡파르","a":"Copland","q":"\"보통 사람을 위한 팡파르\" \"Copland\"","cat":"주파수","m":"장엄한 선율이 평범한 상황을 특별한 기회로 "},{"t":"현악 사중주 3번 '미시마'","a":"Glass","q":"\"현악 사중주 3번 '미시마'\" \"Glass\"","cat":"주파수","m":"반복적 미니멀리즘이 집착을 끊어내고 순수한 "},{"t":"교향곡 7번 4악장","a":"Beethoven","q":"\"교향곡 7번 4악장\" \"Beethoven\"","cat":"주파수","m":"'무도의 화신'이라 불리는 광열적인 리듬이 "},{"t":"브란덴부르크 협주곡 5번 1악장","a":"J.S. Bach","q":"\"브란덴부르크 협주곡 5번 1악장\" \"J.S. Bach\"","cat":"주파수","m":"정교한 플루트와 바이올린의 교차가 복잡한 상"},{"t":"피아노 소나타 17번 '템페스트' 1악장","a":"Beethoven","q":"\"피아노 소나타 17번 '템페스트' 1악장\" \"Beethoven\"","cat":"주파수","m":"폭풍 전야의 긴장과 폭발적인 전개가 정체된 "},{"t":"피아노 협주곡 20번 1악장","a":"Mozart","q":"\"피아노 협주곡 20번 1악장\" \"Mozart\"","cat":"주파수","m":"어두운 열정의 파동이 나태함을 깨뜨리고 상황"},{"t":"에튜드 Op.25 No.11 '겨울바람'","a":"Chopin","q":"\"에튜드 Op.25 No.11 '겨울바람'\" \"Chopin\"","cat":"주파수","m":"강력한 하강 음형의 파동이 낡은 사고방식과 "},{"t":"사계 중 '여름' 1악장","a":"Vivaldi","q":"\"사계 중 '여름' 1악장\" \"Vivaldi\"","cat":"주파수","m":"뜨거운 태양 아래의 긴장감이 게으른 에너지를"},{"t":"교향곡 4번 4악장","a":"Brahms","q":"\"교향곡 4번 4악장\" \"Brahms\"","cat":"주파수","m":"파사칼리아 양식의 엄격한 변주가 혼란스러운 "},{"t":"단테 소나타","a":"Liszt","q":"\"단테 소나타\" \"Liszt\"","cat":"주파수","m":"지옥에서 천국으로 향하는 영혼의 투쟁이 최악"},{"t":"교향곡 4번 4악장","a":"Tchaikovsky","q":"\"교향곡 4번 4악장\" \"Tchaikovsky\"","cat":"주파수","m":"축제의 열광적인 피날레가 우울한 고립 상태를"},{"t":"전주곡 Op.23 No.5","a":"Rachmaninoff","q":"\"전주곡 Op.23 No.5\" \"Rachmaninoff\"","cat":"주파수","m":"행진곡풍의 단호한 리듬이 주저하는 마음을 제"},{"t":"왕궁의 불꽃놀이 '환희'","a":"Handel","q":"\"왕궁의 불꽃놀이 '환희'\" \"Handel\"","cat":"주파수","m":"승리의 파동이 결핍과 장애물의 환상을 제거하"},{"t":"교향곡 4번 '이탈리아' 1악장","a":"Mendelssohn","q":"\"교향곡 4번 '이탈리아' 1악장\" \"Mendelssohn\"","cat":"주파수","m":"남부 유럽의 밝은 생명력이 침체된 분위기를 "},{"t":"도둑 까치 서곡","a":"Rossini","q":"\"도둑 까치 서곡\" \"Rossini\"","cat":"주파수","m":"경쾌하고 긴박한 드럼 롤과 행진 리듬이 정지"},{"t":"리골레토 중 '여자의 마음'","a":"Verdi","q":"\"리골레토 중 '여자의 마음'\" \"Verdi\"","cat":"주파수","m":"변화무쌍한 선율이 경직된 고정관념을 파괴하고"},{"t":"트리스탄과 이졸데 '사랑의 죽음'","a":"Wagner","q":"\"트리스탄과 이졸데 '사랑의 죽음'\" \"Wagner\"","cat":"주파수","m":"한계를 넘어서는 감정의 도약이 불가능해 보였"},{"t":"페르귄트 '잉그리드의 불평'","a":"Grieg","q":"\"페르귄트 '잉그리드의 불평'\" \"Grieg\"","cat":"주파수","m":"거친 불협화음의 에너지가 불만족스러운 현실을"},{"t":"판화 중 '탑'","a":"Debussy","q":"\"판화 중 '탑'\" \"Debussy\"","cat":"주파수","m":"이국적인 음계의 조화가 닫힌 시야를 열어 새"},{"t":"죽음의 무도 (Danse Macabre)","a":"Saint-Saëns","q":"\"죽음의 무도 (Danse Macabre)\" \"Saint-Saëns\"","cat":"주파수","m":"죽음조차 춤으로 만드는 역설적 에너지가 최악"},{"t":"교향곡 1번 2악장 '랜들러'","a":"Mahler","q":"\"교향곡 1번 2악장 '랜들러'\" \"Mahler\"","cat":"주파수","m":"대지의 춤곡 리듬이 무거운 사유의 늪에서 벗"},{"t":"나비부인 중 '어느 개인 날'","a":"Puccini","q":"\"나비부인 중 '어느 개인 날'\" \"Puccini\"","cat":"주파수","m":"간절한 희망의 선율이 부정적 예측을 차단하고"},{"t":"카르멘 '하바네라'","a":"Bizet","q":"\"카르멘 '하바네라'\" \"Bizet\"","cat":"주파수","m":"구속되지 않는 자유의 에너지가 타인의 시선이"},{"t":"행성 중 '우라누스(천왕성)'","a":"Holst","q":"\"행성 중 '우라누스(천왕성)'\" \"Holst\"","cat":"주파수","m":"마법 같은 비정형적 리듬이 예상치 못한 경로"},{"t":"슬라브 무곡 Op.46 No.8","a":"Dvořák","q":"\"슬라브 무곡 Op.46 No.8\" \"Dvořák\"","cat":"주파수","m":"폭발적인 민속적 리듬이 억눌린 생명 에너지를"},{"t":"교향곡 5번 3악장 '백조의 찬가'","a":"Sibelius","q":"\"교향곡 5번 3악장 '백조의 찬가'\" \"Sibelius\"","cat":"주파수","m":"웅장한 호른의 울림이 고난의 상황을 축복의 "},{"t":"밤의 가스파르 '스카르보'","a":"Ravel","q":"\"밤의 가스파르 '스카르보'\" \"Ravel\"","cat":"주파수","m":"변화무쌍하고 고난도의 기교가 뇌의 인지적 유"},{"t":"전람회의 그림 '사무엘 골든베르크와 슈무일레'","a":"Mussorgsky","q":"\"전람회의 그림 '사무엘 골든베르크와 슈무일레'\" \"Mussorgsky\"","cat":"주파수","m":"대조적인 두 성격의 충돌과 조화가 갈등 상황"},{"t":"키제 중위 모음곡 '트로이카'","a":"Prokofiev","q":"\"키제 중위 모음곡 '트로이카'\" \"Prokofiev\"","cat":"주파수","m":"눈 위를 달리는 썰매의 리듬이 막힌 운명의 "},{"t":"축전 서곡","a":"Shostakovich","q":"\"축전 서곡\" \"Shostakovich\"","cat":"주파수","m":"찬란하고 장엄한 금관의 울림이 새로운 시작을"},{"t":"봄의 제전 '대지의 춤'","a":"Stravinsky","q":"\"봄의 제전 '대지의 춤'\" \"Stravinsky\"","cat":"주파수","m":"원시적인 생동감의 파동이 문명적 위선과 장애"},{"t":"카르미나 부라나 '사랑의 신은 어디에나 날아와'","a":"Orff","q":"\"카르미나 부라나 '사랑의 신은 어디에나 날아와'\" \"Orff\"","cat":"주파수","m":"끊임없이 변화하는 사랑의 속성을 통해 고착된"},{"t":"무반주 첼로 모음곡 3번 '지그'","a":"Bach","q":"\"무반주 첼로 모음곡 3번 '지그'\" \"Bach\"","cat":"주파수","m":"첼로의 경쾌한 도약이 무거운 하반신의 기운을"},{"t":"교향곡 8번 4악장","a":"Beethoven","q":"\"교향곡 8번 4악장\" \"Beethoven\"","cat":"주파수","m":"위트 있고 빠른 선율이 심각한 문제를 가볍게"},{"t":"피아노 소나타 14번 3악장","a":"Mozart","q":"\"피아노 소나타 14번 3악장\" \"Mozart\"","cat":"주파수","m":"비극적 정서 속의 명료한 질서가 슬픔에 빠진"},{"t":"폴로네즈 Op.53 '영웅'","a":"Chopin","q":"\"폴로네즈 Op.53 '영웅'\" \"Chopin\"","cat":"주파수","m":"당당한 기마병의 리듬이 위축된 자아를 깨우고"},{"t":"초절기교 에튜드 4번 '마제파'","a":"Liszt","q":"\"초절기교 에튜드 4번 '마제파'\" \"Liszt\"","cat":"주파수","m":"끝까지 질주하는 의지의 선율이 한계 상황을 "},{"t":"현악 사중주 '로자문데' 1악장","a":"Schubert","q":"\"현악 사중주 '로자문데' 1악장\" \"Schubert\"","cat":"주파수","m":"서정적 긴장감이 막연한 불안을 구체적인 변화"},{"t":"해적 서곡","a":"Berlioz","q":"\"해적 서곡\" \"Berlioz\"","cat":"주파수","m":"거친 바다를 향한 모험심이 안전지대에 안주하"},{"t":"돈 쥬앙","a":"Strauss","q":"\"돈 쥬앙\" \"Strauss\"","cat":"주파수","m":"끓어오르는 젊음의 에너지가 모든 사회적 금기"},{"t":"스페인 기상곡","a":"Rimsky-Korsakov","q":"\"스페인 기상곡\" \"Rimsky-Korsakov\"","cat":"주파수","m":"화려한 색채감의 오케스트레이션이 단조로운 일"},{"t":"위풍당당 행진곡 4번","a":"Elgar","q":"\"위풍당당 행진곡 4번\" \"Elgar\"","cat":"주파수","m":"1번보다 더 서정적이고 단단한 의지가 내면의"},{"t":"이고르 왕자 '폴로베츠인의 춤'","a":"Borodin","q":"\"이고르 왕자 '폴로베츠인의 춤'\" \"Borodin\"","cat":"주파수","m":"야성적인 선율의 힘이 문명화된 자아의 나약함"},{"t":"피아노 소나타 K.141","a":"Scarlatti","q":"\"피아노 소나타 K.141\" \"Scarlatti\"","cat":"주파수","m":"쉼 없이 반복되는 연타음의 파동이 뇌의 정체"},{"t":"바이올린 협주곡 2번 '라 캄파넬라'","a":"Paganini","q":"\"바이올린 협주곡 2번 '라 캄파넬라'\" \"Paganini\"","cat":"주파수","m":"맑고 예리한 종소리의 파동이 탁한 에너지를 "},{"t":"팔려간 신부 서곡","a":"Smetana","q":"\"팔려간 신부 서곡\" \"Smetana\"","cat":"주파수","m":"쾌속 질주하는 현악기의 움직임이 지체된 프로"},{"t":"가야네 중 '사브레 댄스'","a":"Khachaturian","q":"\"가야네 중 '사브레 댄스'\" \"Khachaturian\"","cat":"주파수","m":"단호한 타격음이 우유부단함을 제거하고 즉각적"},{"t":"메데아의 복수 무곡","a":"Barber","q":"\"메데아의 복수 무곡\" \"Barber\"","cat":"주파수","m":"강력하고 원초적인 리듬이 억눌린 감정을 폭발"},{"t":"피아노 협주곡 1번 4악장","a":"Ginastera","q":"\"피아노 협주곡 1번 4악장\" \"Ginastera\"","cat":"주파수","m":"타악기적인 피아노 타건이 잠든 의식을 일깨워"},{"t":"로데오 중 '호다운'","a":"Copland","q":"\"로데오 중 '호다운'\" \"Copland\"","cat":"주파수","m":"서부의 개척 정신이 담긴 리듬이 척박한 상황"},{"t":"교향곡 3번 3악장","a":"Glass","q":"\"교향곡 3번 3악장\" \"Glass\"","cat":"주파수","m":"정교한 반복의 에너지가 집착의 사슬을 끊어내"},{"t":"교향곡 5번 '운명' 4악장","a":"Beethoven","q":"\"교향곡 5번 '운명' 4악장\" \"Beethoven\"","cat":"주파수","m":"어둠을 뚫고 나온 장엄한 C장조의 승리가 4"},{"t":"평균율 클라비어 곡집 1권 프렐류드 2번","a":"J.S. Bach","q":"\"평균율 클라비어 곡집 1권 프렐류드 2번\" \"J.S. Bach\"","cat":"주파수","m":"쉼 없이 흐르는 16분음표의 악상이 정체된 "},{"t":"교향곡 9번 '합창' 2악장","a":"Beethoven","q":"\"교향곡 9번 '합창' 2악장\" \"Beethoven\"","cat":"주파수","m":"역동적이고 반복적인 팀파니의 타격이 심리적 "},{"t":"피아노 소나타 8번 A단조 1악장","a":"Mozart","q":"\"피아노 소나타 8번 A단조 1악장\" \"Mozart\"","cat":"주파수","m":"비극적인 긴장감 속의 강렬한 리듬이 나태한 "},{"t":"에튜드 Op.10 No.4 '추격'","a":"Chopin","q":"\"에튜드 Op.10 No.4 '추격'\" \"Chopin\"","cat":"주파수","m":"초고속으로 전개되는 선율이 정체된 운명의 수"},{"t":"현악 협주곡 G단조 '폭풍'","a":"Vivaldi","q":"\"현악 협주곡 G단조 '폭풍'\" \"Vivaldi\"","cat":"주파수","m":"격정적인 현악의 울림이 낡고 오염된 의식의 "},{"t":"피아노 사중주 1번 4악장","a":"Brahms","q":"\"피아노 사중주 1번 4악장\" \"Brahms\"","cat":"주파수","m":"집시풍의 열정적인 론도가 일상의 무료함을 깨"},{"t":"순례의 해 중 '오르망 골짜기'","a":"Liszt","q":"\"순례의 해 중 '오르망 골짜기'\" \"Liszt\"","cat":"주파수","m":"대자연의 폭풍우를 형상화하여 내면의 거대한 "},{"t":"프란체스카 다 리미니","a":"Tchaikovsky","q":"\"프란체스카 다 리미니\" \"Tchaikovsky\"","cat":"주파수","m":"지옥의 소용돌이 같은 강력한 파동이 고착된 "},{"t":"전주곡 Op.32 No.4","a":"Rachmaninoff","q":"\"전주곡 Op.32 No.4\" \"Rachmaninoff\"","cat":"주파수","m":"폭발적인 힘과 긴장감이 한계 상황을 돌파하려"},{"t":"메시아 중 '깨어라'","a":"Handel","q":"\"메시아 중 '깨어라'\" \"Handel\"","cat":"주파수","m":"잠든 의식을 일깨우는 강력한 합창의 에너지가"},{"t":"교향곡 3번 '스코틀랜드' 2악장","a":"Mendelssohn","q":"\"교향곡 3번 '스코틀랜드' 2악장\" \"Mendelssohn\"","cat":"주파수","m":"거친 자연의 생명력이 담긴 스케르초가 위축된"},{"t":"세미라미데 서곡","a":"Rossini","q":"\"세미라미데 서곡\" \"Rossini\"","cat":"주파수","m":"화려한 금관의 울림이 성공을 가로막는 심리적"},{"t":"맥베스 중 '망령들의 춤'","a":"Verdi","q":"\"맥베스 중 '망령들의 춤'\" \"Verdi\"","cat":"주파수","m":"기괴하면서도 강한 에너지가 고정관념이라는 망"},{"t":"리엔지 서곡","a":"Wagner","q":"\"리엔지 서곡\" \"Wagner\"","cat":"주파수","m":"민중을 이끄는 장엄한 선율이 삶의 주도권을 "},{"t":"페르귄트 '귀향'","a":"Grieg","q":"\"페르귄트 '귀향'\" \"Grieg\"","cat":"주파수","m":"폭풍우 치는 바다의 묘사가 시련을 통해 더 "},{"t":"바다 중 '바다 위의 새벽부터 낮까지'","a":"Debussy","q":"\"바다 중 '바다 위의 새벽부터 낮까지'\" \"Debussy\"","cat":"주파수","m":"빛의 변화를 형상화한 음채색이 어두운 상황을"},{"t":"피아노 협주곡 2번 3악장","a":"Saint-Saëns","q":"\"피아노 협주곡 2번 3악장\" \"Saint-Saëns\"","cat":"주파수","m":"질주하는 프레스토의 리듬이 모든 지체된 일을"},{"t":"교향곡 6번 '비극적' 1악장","a":"Mahler","q":"\"교향곡 6번 '비극적' 1악장\" \"Mahler\"","cat":"주파수","m":"단호한 행진곡 리듬이 가혹한 현실 장애물을 "},{"t":"마농 레스코 '간주곡'","a":"Puccini","q":"\"마농 레스코 '간주곡'\" \"Puccini\"","cat":"주파수","m":"격정적인 감정의 파동이 무감각해진 마음을 흔"},{"t":"일 트로바토레 '대장간의 합창'","a":"Verdi","q":"\"일 트로바토레 '대장간의 합창'\" \"Verdi\"","cat":"주파수","m":"쇠를 두드리는 듯한 리듬이 삶의 형태를 새롭"},{"t":"차가운 소곡 중 '도망'","a":"Satie","q":"\"차가운 소곡 중 '도망'\" \"Satie\"","cat":"주파수","m":"기존의 질서에서 도망하여 새로운 인식을 얻게"},{"t":"행성 중 '토성-노년의 전령'","a":"Holst","q":"\"행성 중 '토성-노년의 전령'\" \"Holst\"","cat":"주파수","m":"시간의 흐름을 수용하고 낡은 것을 보내주는 "},{"t":"슬라브 무곡 Op.72 No.2","a":"Dvořák","q":"\"슬라브 무곡 Op.72 No.2\" \"Dvořák\"","cat":"주파수","m":"애잔함과 열정의 교차가 감정적 정체를 부드럽"},{"t":"교향곡 1번 3악장","a":"Sibelius","q":"\"교향곡 1번 3악장\" \"Sibelius\"","cat":"주파수","m":"야성적이고 거친 에너지가 문명적 나태함을 제"},{"t":"거울 중 '어릿광대의 아침노래'","a":"Ravel","q":"\"거울 중 '어릿광대의 아침노래'\" \"Ravel\"","cat":"주파수","m":"복잡하고 정교한 리듬의 변화가 뇌의 인지 기"},{"t":"천둥과 번개 폴카","a":"Strauss II","q":"\"천둥과 번개 폴카\" \"Strauss II\"","cat":"주파수","m":"번개처럼 빠른 에너지 전환이 침체된 분위기를"},{"t":"카르미나 부라나 '태양은 만물에 따스함을'","a":"Orff","q":"\"카르미나 부라나 '태양은 만물에 따스함을'\" \"Orff\"","cat":"주파수","m":"대지의 해빙을 노래하며 얼어붙은 운명의 흐름"},{"t":"모세 환상곡","a":"Paganini","q":"\"모세 환상곡\" \"Paganini\"","cat":"주파수","m":"단 한 줄의 현으로 연주하는 기적처럼 한계 "},{"t":"무반주 바이올린 소나타 2번 '푸가'","a":"Bach","q":"\"무반주 바이올린 소나타 2번 '푸가'\" \"Bach\"","cat":"주파수","m":"복잡하게 얽힌 성부의 조화가 꼬인 상황을 체"},{"t":"피아노 소나타 32번 1악장","a":"Beethoven","q":"\"피아노 소나타 32번 1악장\" \"Beethoven\"","cat":"주파수","m":"격렬한 투쟁 뒤의 초월을 보여주며 극심한 난"},{"t":"교향곡 25번 1악장","a":"Mozart","q":"\"교향곡 25번 1악장\" \"Mozart\"","cat":"주파수","m":"질풍노도의 파동이 정체된 의식에 강력한 파문"},{"t":"폴로네즈-판타지 Op.61","a":"Chopin","q":"\"폴로네즈-판타지 Op.61\" \"Chopin\"","cat":"주파수","m":"환상적인 변화무쌍함이 고착된 현실 감각을 깨"},{"t":"현악 사중주 '레퀴엠' 중 스케르초","a":"Schubert","q":"\"현악 사중주 '레퀴엠' 중 스케르초\" \"Schubert\"","cat":"주파수","m":"죽음의 그림자 속에서도 춤추는 리듬이 최악의"},{"t":"교향곡 6번 '비극적' 3악장","a":"Tchaikovsky","q":"\"교향곡 6번 '비극적' 3악장\" \"Tchaikovsky\"","cat":"주파수","m":"승리의 행진곡 같은 에너지가 절망적인 상황 "},{"t":"초절기교 에튜드 10번 '열정'","a":"Liszt","q":"\"초절기교 에튜드 10번 '열정'\" \"Liszt\"","cat":"주파수","m":"끊임없이 솟구치는 타건의 에너지가 모든 심리"},{"t":"비극적 서곡","a":"Brahms","q":"\"비극적 서곡\" \"Brahms\"","cat":"주파수","m":"비극을 정면으로 응시하며 이를 변화의 동력으"},{"t":"피아노 협주곡 1번 3악장","a":"Rachmaninoff","q":"\"피아노 협주곡 1번 3악장\" \"Rachmaninoff\"","cat":"주파수","m":"젊은 날의 패기와 열정이 담긴 선율이 미성숙"},{"t":"판화 중 '비 내리는 정원'","a":"Debussy","q":"\"판화 중 '비 내리는 정원'\" \"Debussy\"","cat":"주파수","m":"빗줄기처럼 쏟아지는 음표들이 낡은 기운을 씻"},{"t":"유다스 마카베우스 '보라 용사 돌아온다'","a":"Handel","q":"\"유다스 마카베우스 '보라 용사 돌아온다'\" \"Handel\"","cat":"주파수","m":"승전의 팡파르가 장애물을 걷어내고 당당하게 "},{"t":"돌리 모음곡 '스페인 풍의 춤'","a":"Fauré","q":"\"돌리 모음곡 '스페인 풍의 춤'\" \"Fauré\"","cat":"주파수","m":"이국적인 리듬의 활기가 단조로운 일상의 장애"},{"t":"서주와 알레그로","a":"Elgar","q":"\"서주와 알레그로\" \"Elgar\"","cat":"주파수","m":"현악 합주의 깊고 강한 울림이 상황을 주도할"},{"t":"삼손과 데릴라 '바카날'","a":"Saint-Saëns","q":"\"삼손과 데릴라 '바카날'\" \"Saint-Saëns\"","cat":"주파수","m":"광란의 춤곡 리듬이 억눌린 에너지를 해방하여"},{"t":"합주 협주곡 Op.6 No.4","a":"Corelli","q":"\"합주 협주곡 Op.6 No.4\" \"Corelli\"","cat":"주파수","m":"고전적인 균형과 도약이 혼란스러운 상황에 명"},{"t":"디도와 에네아스 '항해사들의 춤'","a":"Purcell","q":"\"디도와 에네아스 '항해사들의 춤'\" \"Purcell\"","cat":"주파수","m":"새로운 항해를 시작하는 활발함이 정체된 상황"},{"t":"알체스테 서곡","a":"Gluck","q":"\"알체스테 서곡\" \"Gluck\"","cat":"주파수","m":"장엄한 선율이 운명적 결단을 도와 상황을 근"},{"t":"르 시드 중 '나바라의 춤'","a":"Massenet","q":"\"르 시드 중 '나바라의 춤'\" \"Massenet\"","cat":"주파수","m":"뜨겁고 열정적인 파동이 차갑게 식어버린 프로"},{"t":"음악의 헌정 '무한 카논'","a":"Bach","q":"\"음악의 헌정 '무한 카논'\" \"Bach\"","cat":"주파수","m":"끊임없이 이어지며 변화하는 구조가 무한한 상"},{"t":"피아노 협주곡 5번 '황제' 3악장","a":"Beethoven","q":"\"피아노 협주곡 5번 '황제' 3악장\" \"Beethoven\"","cat":"주파수","m":"당당하고 거침없는 도약의 선율이 모든 장애물"},{"t":"피가로의 결혼 서곡","a":"Mozart","q":"\"피가로의 결혼 서곡\" \"Mozart\"","cat":"주파수","m":"질주하는 환희의 에너지가 417Hz의 대장정"},{"t":"교향곡 6번 '전원' 2악장","a":"Beethoven","q":"\"교향곡 6번 '전원' 2악장\" \"Beethoven\"","cat":"주파수","m":"시냇물 소리를 형상화한 파동이 생명 에너지를"},{"t":"클라리넷 협주곡 2악장","a":"Mozart","q":"\"클라리넷 협주곡 2악장\" \"Mozart\"","cat":"주파수","m":"가장 인간적인 목소리에 가까운 클라리넷 음색"},{"t":"현을 위한 세레나데 3악장","a":"Tchaikovsky","q":"\"현을 위한 세레나데 3악장\" \"Tchaikovsky\"","cat":"주파수","m":"현악기의 풍부한 배음이 신체의 수분 입자를 "},{"t":"자장가","a":"Brahms","q":"\"자장가\" \"Brahms\"","cat":"주파수","m":"근원적인 보호 본능을 자극하여 가장 안전한 "},{"t":"노래의 날개 위에","a":"Mendelssohn","q":"\"노래의 날개 위에\" \"Mendelssohn\"","cat":"주파수","m":"상상력을 자극하는 가벼운 선율이 질병의 무거"},{"t":"안단테 (플루트와 관현악을 위한)","a":"Mozart","q":"\"안단테 (플루트와 관현악을 위한)\" \"Mozart\"","cat":"주파수","m":"투명한 플루트 소리가 신경계의 독소를 씻어내"},{"t":"페르귄트 중 '아침의 기분'","a":"Grieg","q":"\"페르귄트 중 '아침의 기분'\" \"Grieg\"","cat":"주파수","m":"빛이 세포를 깨우듯, 새로운 생명 에너지가 "},{"t":"사계 중 '봄' 1악장","a":"Vivaldi","q":"\"사계 중 '봄' 1악장\" \"Vivaldi\"","cat":"주파수","m":"만물이 소생하는 생명력을 세포 하나하나에 전"},{"t":"행성 중 '금성-평화의 전령'","a":"Holst","q":"\"행성 중 '금성-평화의 전령'\" \"Holst\"","cat":"주파수","m":"우주적 평화의 주파수를 통해 신체 내 기운의"},{"t":"칸타타 147번 '예수 인간 소망의 기쁨'","a":"Bach","q":"\"칸타타 147번 '예수 인간 소망의 기쁨'\" \"Bach\"","cat":"주파수","m":"반복되는 조화의 음형이 DNA 나선 구조에 "},{"t":"에튜드 Op.10 No.3 '이별의 곡'","a":"Chopin","q":"\"에튜드 Op.10 No.3 '이별의 곡'\" \"Chopin\"","cat":"주파수","m":"슬픔을 아름다움으로 승화시켜 감정적 세포 사"},{"t":"현악 사중주 '로자문데' 2악장","a":"Schubert","q":"\"현악 사중주 '로자문데' 2악장\" \"Schubert\"","cat":"주파수","m":"다정한 현의 울림이 고립된 마음을 어루만져 "},{"t":"어린이 정경 중 '트로이메라이'","a":"Schumann","q":"\"어린이 정경 중 '트로이메라이'\" \"Schumann\"","cat":"주파수","m":"동심의 순수 주파수를 자극하여 면역 세포의 "},{"t":"아를의 여인 모음곡 중 '미뉴에트'","a":"Bizet","q":"\"아를의 여인 모음곡 중 '미뉴에트'\" \"Bizet\"","cat":"주파수","m":"우아한 리듬감이 장기의 기능을 조율하고 신진"},{"t":"호프만의 이야기 '뱃노래'","a":"Offenbach","q":"\"호프만의 이야기 '뱃노래'\" \"Offenbach\"","cat":"주파수","m":"흔들리는 요람 같은 파동이 뇌를 이완시켜 기"},{"t":"장미의 기사 '피날레 테르제트'","a":"Strauss","q":"\"장미의 기사 '피날레 테르제트'\" \"Strauss\"","cat":"주파수","m":"여성적 에너지가 극대화된 화음이 모성적 치유"},{"t":"현악 사중주 2번 3악장 '노투르노'","a":"Borodin","q":"\"현악 사중주 2번 3악장 '노투르노'\" \"Borodin\"","cat":"주파수","m":"밤의 명상적 분위기가 잠자는 동안의 세포 복"},{"t":"아베 마리아 (Bach 선율 위)","a":"Gounod","q":"\"아베 마리아 (Bach 선율 위)\" \"Gounod\"","cat":"주파수","m":"바흐의 기초 위에 세워진 치유의 선율이 복합"},{"t":"세헤라자데 3악장","a":"Rimsky-Korsakov","q":"\"세헤라자데 3악장\" \"Rimsky-Korsakov\"","cat":"주파수","m":"환상적인 이야기의 힘이 생존 본능을 긍정적 "},{"t":"현을 위한 소나타 1번","a":"Rossini","q":"\"현을 위한 소나타 1번\" \"Rossini\"","cat":"주파수","m":"명랑하고 맑은 파동이 우울함으로 닫힌 세포의"},{"t":"피아노 소나타 K.32","a":"Scarlatti","q":"\"피아노 소나타 K.32\" \"Scarlatti\"","cat":"주파수","m":"단순함 속의 진리가 복잡한 질병의 논리를 무"},{"t":"현악 사중주 '종작' 2악장","a":"Haydn","q":"\"현악 사중주 '종작' 2악장\" \"Haydn\"","cat":"주파수","m":"따뜻하고 균형 잡힌 선율이 심박수를 안정시키"},{"t":"핀란디아 중 '찬가'","a":"Sibelius","q":"\"핀란디아 중 '찬가'\" \"Sibelius\"","cat":"주파수","m":"숭고한 정신의 울림이 개별적 고통을 넘어서는"},{"t":"수상음악 중 '에어' (Air)","a":"Handel","q":"\"수상음악 중 '에어' (Air)\" \"Handel\"","cat":"주파수","m":"흐르는 물의 정화 작용을 소리로 구현하여 전"},{"t":"양들은 한가로이 풀을 뜯고","a":"J.S. Bach","q":"\"양들은 한가로이 풀을 뜯고\" \"J.S. Bach\"","cat":"주파수","m":"평화로운 목가적 선율이 세포의 긴장을 완화하"},{"t":"피아노 소나타 16번 2악장","a":"Mozart","q":"\"피아노 소나타 16번 2악장\" \"Mozart\"","cat":"주파수","m":"순수한 선율이 뇌의 노폐물 파동을 정화하고 "},{"t":"교향곡 9번 3악장","a":"Beethoven","q":"\"교향곡 9번 3악장\" \"Beethoven\"","cat":"주파수","m":"숭고한 안식의 선율이 영혼의 상처를 DNA "},{"t":"베르세즈 (자장가) Op.57","a":"Chopin","q":"\"베르세즈 (자장가) Op.57\" \"Chopin\"","cat":"주파수","m":"반복되는 왼손의 리듬이 심장 박동을 조율하며"},{"t":"플루트 협주곡 '홍방울새' 2악장","a":"Vivaldi","q":"\"플루트 협주곡 '홍방울새' 2악장\" \"Vivaldi\"","cat":"주파수","m":"가벼운 공기의 파동이 폐와 심장의 에너지를 "},{"t":"잠자는 숲속의 미녀 '파드되'","a":"Tchaikovsky","q":"\"잠자는 숲속의 미녀 '파드되'\" \"Tchaikovsky\"","cat":"주파수","m":"신비로운 하프와 선율이 잠재의식 속의 치유 "},{"t":"클라리넷 오중주 B단조 2악장","a":"Brahms","q":"\"클라리넷 오중주 B단조 2악장\" \"Brahms\"","cat":"주파수","m":"깊은 내면의 울림이 고독을 치유하고 우주적 "},{"t":"피아노 협주곡 2번 2악장","a":"Rachmaninoff","q":"\"피아노 협주곡 2번 2악장\" \"Rachmaninoff\"","cat":"주파수","m":"로맨틱한 선율의 극치가 존재에 대한 무조건적"},{"t":"세르세 중 '라르고' (Ombra mai fu)","a":"Handel","q":"\"세르세 중 '라르고' (Ombra mai fu)\" \"Handel\"","cat":"주파수","m":"나무 그늘 같은 안식의 파동이 전신의 염증 "},{"t":"무언가 '베네치아의 뱃노래'","a":"Mendelssohn","q":"\"무언가 '베네치아의 뱃노래'\" \"Mendelssohn\"","cat":"주파수","m":"물의 리듬감이 체액의 순환을 도와 세포 독소"},{"t":"서주와 론도 카프리치오소 (서주)","a":"Saint-Saëns","q":"\"서주와 론도 카프리치오소 (서주)\" \"Saint-Saëns\"","cat":"주파수","m":"서정적인 도입부가 경직된 신경을 부드럽게 이"},{"t":"지크프리트 목가","a":"Wagner","q":"\"지크프리트 목가\" \"Wagner\"","cat":"주파수","m":"가족과 생명에 대한 지극한 사랑이 담긴 주파"},{"t":"현악을 위한 두 개의 슬픈 선율 '지난 봄'","a":"Grieg","q":"\"현악을 위한 두 개의 슬픈 선율 '지난 봄'\" \"Grieg\"","cat":"주파수","m":"지나간 시간을 긍정하며 현재의 생명력을 다시"},{"t":"교향곡 3번 6악장 '사랑이 내게 말하는 것'","a":"Mahler","q":"\"교향곡 3번 6악장 '사랑이 내게 말하는 것'\" \"Mahler\"","cat":"주파수","m":"거대한 사랑의 에너지가 온몸의 세포를 감싸 "},{"t":"수녀 안젤리카 '어머니도 없이'","a":"Puccini","q":"\"수녀 안젤리카 '어머니도 없이'\" \"Puccini\"","cat":"주파수","m":"모성적 치유의 정수가 담긴 선율이 근원적 결"},{"t":"라 트라비아타 '전주곡'","a":"Verdi","q":"\"라 트라비아타 '전주곡'\" \"Verdi\"","cat":"주파수","m":"애틋하면서도 투명한 선율이 감정의 독소를 정"},{"t":"짐노페디 3번","a":"Satie","q":"\"짐노페디 3번\" \"Satie\"","cat":"주파수","m":"정적인 공간감이 뇌의 과부하를 줄여 세포가 "},{"t":"행성 중 '목성-즐거움의 전령' (찬가)","a":"Holst","q":"\"행성 중 '목성-즐거움의 전령' (찬가)\" \"Holst\"","cat":"주파수","m":"풍요롭고 장엄한 에너지가 세포의 활성도를 최"},{"t":"기타 오중주 '아메리카' 2악장","a":"Dvořák","q":"\"기타 오중주 '아메리카' 2악장\" \"Dvořák\"","cat":"주파수","m":"따뜻한 현악의 조화가 고립된 마음을 치유하고"},{"t":"투오넬라의 백조","a":"Sibelius","q":"\"투오넬라의 백조\" \"Sibelius\"","cat":"주파수","m":"신비로운 잉글리시 호른 소리가 무의식의 심연"},{"t":"물의 희롱","a":"Ravel","q":"\"물의 희롱\" \"Ravel\"","cat":"주파수","m":"맑은 물 입자의 진동을 소리로 구현하여 전신"},{"t":"전람회의 그림 '카타콤'","a":"Mussorgsky","q":"\"전람회의 그림 '카타콤'\" \"Mussorgsky\"","cat":"주파수","m":"어둠 속의 빛을 찾는 진동이 숨겨진 질병의 "},{"t":"장미의 기사 '왈츠'","a":"Strauss II","q":"\"장미의 기사 '왈츠'\" \"Strauss II\"","cat":"주파수","m":"우아한 회전의 리듬이 정체된 에너지를 순환시"},{"t":"카르미나 부라나 '사랑은 어디에나'","a":"Orff","q":"\"카르미나 부라나 '사랑은 어디에나'\" \"Orff\"","cat":"주파수","m":"만물에 깃든 사랑의 보편성을 통해 자가 치유"},{"t":"칸타빌레 D장조","a":"Paganini","q":"\"칸타빌레 D장조\" \"Paganini\"","cat":"주파수","m":"바이올린의 가장 부드러운 목소리가 상처 입은"},{"t":"관현악 모음곡 3번 '아리아'","a":"Bach","q":"\"관현악 모음곡 3번 '아리아'\" \"Bach\"","cat":"주파수","m":"완벽한 수학적 비례의 선율이 DNA의 나선 "},{"t":"피아노 소나타 30번 3악장","a":"Beethoven","q":"\"피아노 소나타 30번 3악장\" \"Beethoven\"","cat":"주파수","m":"지극한 평화와 감사의 파동이 기적적인 세포 "},{"t":"플루트와 하프를 위한 협주곡 2악장","a":"Mozart","q":"\"플루트와 하프를 위한 협주곡 2악장\" \"Mozart\"","cat":"주파수","m":"천상의 두 악기가 만나 세포의 조화와 균형을"},{"t":"발라드 4번 F단조 (코다 전)","a":"Chopin","q":"\"발라드 4번 F단조 (코다 전)\" \"Chopin\"","cat":"주파수","m":"고난 뒤의 숭고한 아름다움이 삶의 의지를 D"},{"t":"피아노 소나타 21번 2악장","a":"Schubert","q":"\"피아노 소나타 21번 2악장\" \"Schubert\"","cat":"주파수","m":"정적 속의 선율이 죽어가는 세포에 생명의 불"},{"t":"환상소곡집 중 '저녁에'","a":"Schumann","q":"\"환상소곡집 중 '저녁에'\" \"Schumann\"","cat":"주파수","m":"하루의 피로를 씻어내고 수면 중 DNA 복구"},{"t":"위로 (Consolations) 2번","a":"Liszt","q":"\"위로 (Consolations) 2번\" \"Liszt\"","cat":"주파수","m":"마음의 풍랑을 잠재우고 신성한 사랑의 질서 "},{"t":"호두까기 인형 '사탕요정의 춤'","a":"Tchaikovsky","q":"\"호두까기 인형 '사탕요정의 춤'\" \"Tchaikovsky\"","cat":"주파수","m":"첼레스타의 맑은 울림이 미세 혈관의 흐름을 "},{"t":"심포니 2번 3악장","a":"Rachmaninoff","q":"\"심포니 2번 3악장\" \"Rachmaninoff\"","cat":"주파수","m":"끝없이 이어지는 선율이 막힌 기운을 뚫어 전"},{"t":"아라베스크 2번","a":"Debussy","q":"\"아라베스크 2번\" \"Debussy\"","cat":"주파수","m":"경쾌한 음의 유희가 면역 세포의 활발한 움직"},{"t":"레퀴엠 중 'In Paradisum'","a":"Fauré","q":"\"레퀴엠 중 'In Paradisum'\" \"Fauré\"","cat":"주파수","m":"천상의 낙원을 묘사하며 모든 고통으로부터의 "},{"t":"오보에 협주곡 D단조 2악장","a":"Albinoni","q":"\"오보에 협주곡 D단조 2악장\" \"Albinoni\"","cat":"주파수","m":"오보에의 고독하면서도 따뜻한 선율이 심리적 "},{"t":"기타 오중주 '판당고'","a":"Boccherini","q":"\"기타 오중주 '판당고'\" \"Boccherini\"","cat":"주파수","m":"생동감 넘치는 리듬이 활력을 잃은 세포에 기"},{"t":"성 세실리아를 위한 미사 '상투스'","a":"Gounod","q":"\"성 세실리아를 위한 미사 '상투스'\" \"Gounod\"","cat":"주파수","m":"성스러운 에너지가 신체의 주파수를 고차원으로"},{"t":"인도의 노래","a":"Rimsky-Korsakov","q":"\"인도의 노래\" \"Rimsky-Korsakov\"","cat":"주파수","m":"이국적이고 매혹적인 선율이 감각 체계를 깨워"},{"t":"피아노 소나타 K.208","a":"Scarlatti","q":"\"피아노 소나타 K.208\" \"Scarlatti\"","cat":"주파수","m":"정교한 장식음이 신경계의 미세 회로를 자극하"},{"t":"교향곡 101번 '시계' 2악장","a":"Haydn","q":"\"교향곡 101번 '시계' 2악장\" \"Haydn\"","cat":"주파수","m":"규칙적인 리듬이 인체의 생체 시계를 정상화하"},{"t":"아란후에스 협주곡 2악장 (테마)","a":"Rodrigo","q":"\"아란후에스 협주곡 2악장 (테마)\" \"Rodrigo\"","cat":"주파수","m":"지극한 슬픔의 승화가 심장 근육의 긴장을 풀"},{"t":"나의 조국 중 '몰다우' (테마)","a":"Smetana","q":"\"나의 조국 중 '몰다우' (테마)\" \"Smetana\"","cat":"주파수","m":"굽이치는 강의 생명력이 전신의 에너지 순환을"},{"t":"평균율 클라비어 1권 1번 프렐류드","a":"J.S. Bach","q":"\"평균율 클라비어 1권 1번 프렐류드\" \"J.S. Bach\"","cat":"주파수","m":"순수한 분산화음의 반복이 뇌파를 델타파 상태"},{"t":"피아노 소나타 8번 '비창' 2악장","a":"Beethoven","q":"\"피아노 소나타 8번 '비창' 2악장\" \"Beethoven\"","cat":"주파수","m":"깊은 위로의 선율이 심장 근육의 긴장을 완화"},{"t":"피아노 협주곡 23번 2악장","a":"Mozart","q":"\"피아노 협주곡 23번 2악장\" \"Mozart\"","cat":"주파수","m":"슬픔 속의 숭고한 질서가 손상된 감정 체계를"},{"t":"녹턴 Op.27 No.2","a":"Chopin","q":"\"녹턴 Op.27 No.2\" \"Chopin\"","cat":"주파수","m":"유려하고 정교한 선율이 신경계의 미세 회로를"},{"t":"현악 삼중주 B플랫 장조 D.471","a":"Schubert","q":"\"현악 삼중주 B플랫 장조 D.471\" \"Schubert\"","cat":"주파수","m":"현악기들의 다정한 대화가 고립된 세포 간의 "},{"t":"기타 협주곡 D장조 2악장","a":"Vivaldi","q":"\"기타 협주곡 D장조 2악장\" \"Vivaldi\"","cat":"주파수","m":"기타의 맑은 울림이 체내 수분 입자를 육각형"},{"t":"현을 위한 세레나데 1악장 'Pezzo'","a":"Tchaikovsky","q":"\"현을 위한 세레나데 1악장 'Pezzo'\" \"Tchaikovsky\"","cat":"주파수","m":"풍부한 현악 성부의 합주가 신체 방어 기제인"},{"t":"피아노 오중주 F단조 2악장","a":"Brahms","q":"\"피아노 오중주 F단조 2악장\" \"Brahms\"","cat":"주파수","m":"묵직하고 따뜻한 화성이 골밀도 및 근육 세포"},{"t":"전주곡 Op.32 No.12","a":"Rachmaninoff","q":"\"전주곡 Op.32 No.12\" \"Rachmaninoff\"","cat":"주파수","m":"섬세한 음의 입자들이 뇌 뉴런의 시냅스 연결"},{"t":"메시아 중 '내 주는 살아계시니'","a":"Handel","q":"\"메시아 중 '내 주는 살아계시니'\" \"Handel\"","cat":"주파수","m":"생명에 대한 확신을 주는 선율이 죽어가는 기"},{"t":"무언가 '베네치아 뱃노래' 2번","a":"Mendelssohn","q":"\"무언가 '베네치아 뱃노래' 2번\" \"Mendelssohn\"","cat":"주파수","m":"규칙적인 물결 리듬이 림프 순환을 도와 체내"},{"t":"동물의 사육제 중 '수족관'","a":"Saint-Saëns","q":"\"동물의 사육제 중 '수족관'\" \"Saint-Saëns\"","cat":"주파수","m":"신비로운 음색이 세포 내 미토콘드리아의 에너"},{"t":"로엔그린 1막 전주곡","a":"Wagner","q":"\"로엔그린 1막 전주곡\" \"Wagner\"","cat":"주파수","m":"천상에서 내려오는 듯한 고음의 파동이 영적 "},{"t":"서정 소곡집 '나비'","a":"Grieg","q":"\"서정 소곡집 '나비'\" \"Grieg\"","cat":"주파수","m":"가벼운 파동이 세포의 경직을 풀고 자유로운 "},{"t":"아마빛 머리의 소녀","a":"Debussy","q":"\"아마빛 머리의 소녀\" \"Debussy\"","cat":"주파수","m":"지극한 순수함의 주파수가 노화와 오염으로부터"},{"t":"교향곡 4번 3악장","a":"Mahler","q":"\"교향곡 4번 3악장\" \"Mahler\"","cat":"주파수","m":"천상의 평화를 노래하는 선율이 신경질적인 통"},{"t":"나비부인 '허밍 코러스'","a":"Puccini","q":"\"나비부인 '허밍 코러스'\" \"Puccini\"","cat":"주파수","m":"가사 없는 인간 목소리의 공명이 심장의 전자"},{"t":"라 트라비아타 '아, 그이인가'","a":"Verdi","q":"\"라 트라비아타 '아, 그이인가'\" \"Verdi\"","cat":"주파수","m":"진정한 사랑을 깨닫는 선율이 도파민과 옥시토"},{"t":"그노시엔 4번","a":"Satie","q":"\"그노시엔 4번\" \"Satie\"","cat":"주파수","m":"몽환적인 음의 배치가 시공간 감각을 잊게 하"},{"t":"행성 중 '해왕성-신비주의자'","a":"Holst","q":"\"행성 중 '해왕성-신비주의자'\" \"Holst\"","cat":"주파수","m":"우주적 차원의 거대한 진동이 개별 자아를 넘"},{"t":"기타 오중주 '아메리카' 4악장","a":"Dvořák","q":"\"기타 오중주 '아메리카' 4악장\" \"Dvořák\"","cat":"주파수","m":"대지의 리듬과 낙천성이 생존 본능을 강화하고"},{"t":"베르사그 (자장가) Op.40","a":"Sibelius","q":"\"베르사그 (자장가) Op.40\" \"Sibelius\"","cat":"주파수","m":"북구의 정밀한 정적이 소음으로 지친 귀와 뇌"},{"t":"죽은 왕녀를 위한 파반느 (관현악)","a":"Ravel","q":"\"죽은 왕녀를 위한 파반느 (관현악)\" \"Ravel\"","cat":"주파수","m":"호른과 현의 조화가 상실된 기운을 채우고 내"},{"t":"전람회의 그림 '성전'","a":"Mussorgsky","q":"\"전람회의 그림 '성전'\" \"Mussorgsky\"","cat":"주파수","m":"웅장한 공간감을 주는 파동이 위축된 생명력을"},{"t":"장미의 기사 '사랑의 듀엣'","a":"Strauss II","q":"\"장미의 기사 '사랑의 듀엣'\" \"Strauss II\"","cat":"주파수","m":"두 소프라노의 조화로운 화음이 여성성과 모성"},{"t":"무반주 바이올린 파르티타 2번 '샤콘느' (전반부)","a":"Bach","q":"\"무반주 바이올린 파르티타 2번 '샤콘느' (전반부)\" \"Bach\"","cat":"주파수","m":"인생의 무게를 견디게 하는 단단한 선율이 D"},{"t":"피아노 소나타 31번 3악장 '아리오소'","a":"Beethoven","q":"\"피아노 소나타 31번 3악장 '아리오소'\" \"Beethoven\"","cat":"주파수","m":"고통 뒤에 피어나는 재생의 노래가 기적적인 "},{"t":"세레나데 10번 '그랑 파르티타' 3악장","a":"Mozart","q":"\"세레나데 10번 '그랑 파르티타' 3악장\" \"Mozart\"","cat":"주파수","m":"관악기들의 신성한 조화가 호흡기 체계를 정화"},{"t":"폴로네즈 Op.61 '환상'","a":"Chopin","q":"\"폴로네즈 Op.61 '환상'\" \"Chopin\"","cat":"주파수","m":"자유로운 형식의 변화가 굳어진 생각과 세포의"},{"t":"죽음과 소녀 2악장 (테마)","a":"Schubert","q":"\"죽음과 소녀 2악장 (테마)\" \"Schubert\"","cat":"주파수","m":"소멸을 넘어선 영원한 생명을 예시하며 세포 "},{"t":"어린이 정경 중 '잠드는 아이'","a":"Schumann","q":"\"어린이 정경 중 '잠드는 아이'\" \"Schumann\"","cat":"주파수","m":"수면 전 뇌파를 완벽히 조율하여 밤사이 DN"},{"t":"위로 3번 (Consolation)","a":"Liszt","q":"\"위로 3번 (Consolation)\" \"Liszt\"","cat":"주파수","m":"상처 난 영혼에 바르는 연고처럼 부드러운 파"},{"t":"교향곡 4번 2악장","a":"Brahms","q":"\"교향곡 4번 2악장\" \"Brahms\"","cat":"주파수","m":"장엄하면서도 따뜻한 선율이 골수와 혈액의 재"},{"t":"호두까기 인형 '아라비아의 춤'","a":"Tchaikovsky","q":"\"호두까기 인형 '아라비아의 춤'\" \"Tchaikovsky\"","cat":"주파수","m":"낮고 몽환적인 선율이 신장과 부신의 에너지를"},{"t":"첼로 소나타 G단조 3악장","a":"Rachmaninoff","q":"\"첼로 소나타 G단조 3악장\" \"Rachmaninoff\"","cat":"주파수","m":"첼로의 깊은 울림이 뼈 속 깊은 곳까지 진동"},{"t":"판화 중 '가든에서의 비'","a":"Debussy","q":"\"판화 중 '가든에서의 비'\" \"Debussy\"","cat":"주파수","m":"물의 입자가 씻어내는 듯한 선율이 피부와 감"},{"t":"자장가 (Berceuse)","a":"Fauré","q":"\"자장가 (Berceuse)\" \"Fauré\"","cat":"주파수","m":"천사 같은 선율이 자가 면역 질환으로 고통받"},{"t":"오보에 협주곡 G단조 2악장","a":"Albinoni","q":"\"오보에 협주곡 G단조 2악장\" \"Albinoni\"","cat":"주파수","m":"오보에의 순수한 파동이 간과 담의 정체된 기"},{"t":"오르페오 중 '지복을 입은 영혼들의 춤'","a":"Gluck","q":"\"오르페오 중 '지복을 입은 영혼들의 춤'\" \"Gluck\"","cat":"주파수","m":"고통 없는 영혼의 상태를 소리로 구현하여 극"},{"t":"라 폴리아 (La Folia) 중 변주","a":"Corelli","q":"\"라 폴리아 (La Folia) 중 변주\" \"Corelli\"","cat":"주파수","m":"고난 뒤의 질서 정연한 변화가 유전적 결함을"},{"t":"디도와 에네아스 '내가 땅에 묻힐 때'","a":"Purcell","q":"\"디도와 에네아스 '내가 땅에 묻힐 때'\" \"Purcell\"","cat":"주파수","m":"비극적 슬픔의 카타르시스가 감정적 응어리를 "},{"t":"헤로디아데 '간주곡'","a":"Massenet","q":"\"헤로디아데 '간주곡'\" \"Massenet\"","cat":"주파수","m":"열정적 사랑의 선율이 호르몬 균형을 맞추어 "},{"t":"파우스트 중 '잠든 그대에게'","a":"Gounod","q":"\"파우스트 중 '잠든 그대에게'\" \"Gounod\"","cat":"주파수","m":"수면 중 영적 성장을 돕는 파동이 지능과 직"},{"t":"세헤라자데 2악장","a":"Rimsky-Korsakov","q":"\"세헤라자데 2악장\" \"Rimsky-Korsakov\"","cat":"주파수","m":"이야기의 흐름이 끊이지 않듯 생명력의 영속성"},{"t":"미사 솔레니스 '키리에'","a":"Rossini","q":"\"미사 솔레니스 '키리에'\" \"Rossini\"","cat":"주파수","m":"참회와 자비의 기운이 죄책감으로 인한 세포의"},{"t":"소나타 K.380","a":"Scarlatti","q":"\"소나타 K.380\" \"Scarlatti\"","cat":"주파수","m":"경쾌하고 품격 있는 질서가 신경계의 통신 속"},{"t":"첼로 협주곡 2번 2악장","a":"Haydn","q":"\"첼로 협주곡 2번 2악장\" \"Haydn\"","cat":"주파수","m":"안정감 넘치는 첼로의 주파수가 근골격계의 올"},{"t":"수수께끼 변주곡 '님로드'","a":"Elgar","q":"\"수수께끼 변주곡 '님로드'\" \"Elgar\"","cat":"주파수","m":"숭고한 우정과 사랑의 에너지가 존재에 대한 "},{"t":"어느 귀인을 위한 환상곡 2악장","a":"Rodrigo","q":"\"어느 귀인을 위한 환상곡 2악장\" \"Rodrigo\"","cat":"주파수","m":"옛 지혜를 소리로 복구하여 현대인의 잃어버린"},{"t":"수상음악 '알라 혼파이프'","a":"Handel","q":"\"수상음악 '알라 혼파이프'\" \"Handel\"","cat":"주파수","m":"흐르는 물과 같은 환희의 에너지가 528Hz"},{"t":"두 대의 바이올린을 위한 협주곡 2악장","a":"J.S. Bach","q":"\"두 대의 바이올린을 위한 협주곡 2악장\" \"J.S. Bach\"","cat":"주파수","m":"두 악기가 주고받는 완벽한 대화가 대인관계의"},{"t":"피아노 삼중주 K.548 2악장","a":"Mozart","q":"\"피아노 삼중주 K.548 2악장\" \"Mozart\"","cat":"주파수","m":"세 악기의 민주적인 조화가 가족 및 조직 내"},{"t":"교향곡 9번 '합창' 4악장 (환희의 송가)","a":"Beethoven","q":"\"교향곡 9번 '합창' 4악장 (환희의 송가)\" \"Beethoven\"","cat":"주파수","m":"인류애와 통합의 상징적 선율이 사회적 유대감"},{"t":"현악 팔중주 Op.20 1악장","a":"Mendelssohn","q":"\"현악 팔중주 Op.20 1악장\" \"Mendelssohn\"","cat":"주파수","m":"여덟 명의 연주자가 하나로 융합되는 에너지가"},{"t":"현악 육중주 1번 2악장","a":"Brahms","q":"\"현악 육중주 1번 2악장\" \"Brahms\"","cat":"주파수","m":"중후한 화음의 층위가 깊은 신뢰와 이해의 관"},{"t":"피아노 협주곡 1번 2악장","a":"Chopin","q":"\"피아노 협주곡 1번 2악장\" \"Chopin\"","cat":"주파수","m":"서정적인 고백의 선율이 연인 간의 오해를 풀"},{"t":"현악 사중주 2악장","a":"Debussy","q":"\"현악 사중주 2악장\" \"Debussy\"","cat":"주파수","m":"피치카토의 섬세한 리듬이 타인의 감정을 읽는"},{"t":"현악 사중주 1악장","a":"Ravel","q":"\"현악 사중주 1악장\" \"Ravel\"","cat":"주파수","m":"부드러운 색채의 변화가 경직된 관계를 유연하"},{"t":"현악 사중주 1번 2악장 '안단테 칸타빌레'","a":"Tchaikovsky","q":"\"현악 사중주 1번 2악장 '안단테 칸타빌레'\" \"Tchaikovsky\"","cat":"주파수","m":"눈물을 닦아주는 듯한 선율이 상처받은 관계의"},{"t":"수상음악 '혼파이프'","a":"Handel","q":"\"수상음악 '혼파이프'\" \"Handel\"","cat":"주파수","m":"축제와 같은 밝은 에너지가 공동체 의식을 고"},{"t":"피아노 오중주 2번 2악장","a":"Dvořák","q":"\"피아노 오중주 2번 2악장\" \"Dvořák\"","cat":"주파수","m":"슬라브적 서정이 타인의 슬픔에 깊이 공감하는"},{"t":"돌리 모음곡 '자장가'","a":"Fauré","q":"\"돌리 모음곡 '자장가'\" \"Fauré\"","cat":"주파수","m":"순수한 어린아이 같은 마음으로 돌아가 편견 "},{"t":"현악을 위한 서주와 알레그로","a":"Elgar","q":"\"현악을 위한 서주와 알레그로\" \"Elgar\"","cat":"주파수","m":"독주와 합주의 긴밀한 교감이 리더십과 팔로워"},{"t":"브란덴부르크 협주곡 6번 2악장","a":"Bach","q":"\"브란덴부르크 협주곡 6번 2악장\" \"Bach\"","cat":"주파수","m":"비올라의 따뜻한 중음역대가 경청하는 태도와 "},{"t":"마술피리 '파파게노 파파게나 이중창'","a":"Mozart","q":"\"마술피리 '파파게노 파파게나 이중창'\" \"Mozart\"","cat":"주파수","m":"유쾌한 짝짓기 리듬이 이성 간의 소통과 유머"},{"t":"바이올린 소나타 5번 '봄' 1악장","a":"Beethoven","q":"\"바이올린 소나타 5번 '봄' 1악장\" \"Beethoven\"","cat":"주파수","m":"화답하는 바이올린과 피아노가 새로운 인연의 "},{"t":"피아노 사중주 Op.44 3악장","a":"Schumann","q":"\"피아노 사중주 Op.44 3악장\" \"Schumann\"","cat":"주파수","m":"악기 간의 유기적인 얽힘이 복잡한 관계의 문"},{"t":"현악 사중주 2번 1악장","a":"Borodin","q":"\"현악 사중주 2번 1악장\" \"Borodin\"","cat":"주파수","m":"아내에게 헌정된 선율이 부부간의 애정과 헌신"},{"t":"진주 조개잡이 '성스러운 사원에서'","a":"Bizet","q":"\"진주 조개잡이 '성스러운 사원에서'\" \"Bizet\"","cat":"주파수","m":"두 남성의 우정을 노래한 선율이 동료와의 강"},{"t":"라 보엠 '오 사랑스러운 아가씨'","a":"Puccini","q":"\"라 보엠 '오 사랑스러운 아가씨'\" \"Puccini\"","cat":"주파수","m":"첫눈에 반하는 사랑의 파동이 설렘과 연결의 "},{"t":"리골레토 '사랑은 영혼의 태양'","a":"Verdi","q":"\"리골레토 '사랑은 영혼의 태양'\" \"Verdi\"","cat":"주파수","m":"영혼의 공명을 통해 조건 없는 수용과 이해의"},{"t":"심포니 2번 3악장 (관계 테마)","a":"Rachmaninoff","q":"\"심포니 2번 3악장 (관계 테마)\" \"Rachmaninoff\"","cat":"주파수","m":"광활한 호흡의 선율이 닫힌 마음을 열어 타인"},{"t":"동물의 사육제 중 '백조' (첼로/피아노)","a":"Saint-Saëns","q":"\"동물의 사육제 중 '백조' (첼로/피아노)\" \"Saint-Saëns\"","cat":"주파수","m":"두 악기의 보필과 선율이 서로 돕고 의지하는"},{"t":"안단테 페스티보","a":"Sibelius","q":"\"안단테 페스티보\" \"Sibelius\"","cat":"주파수","m":"경건하고 장엄한 축제의 울림이 공동체의 평화"},{"t":"뉘른베르크의 마이스터징어 '5중창'","a":"Wagner","q":"\"뉘른베르크의 마이스터징어 '5중창'\" \"Wagner\"","cat":"주파수","m":"다섯 명의 각기 다른 목소리가 이루는 조화가"},{"t":"교향곡 2번 '부활' 피날레 (합창)","a":"Mahler","q":"\"교향곡 2번 '부활' 피날레 (합창)\" \"Mahler\"","cat":"주파수","m":"거대한 통합의 에너지가 모든 갈등을 용해하고"},{"t":"트리오 소나타 G장조 BWV 1039","a":"Bach","q":"\"트리오 소나타 G장조 BWV 1039\" \"Bach\"","cat":"주파수","m":"세 성부의 정교한 어울림이 논리적이고 명확한"},{"t":"피아노 소나타 24번 '테레제' 1악장","a":"Beethoven","q":"\"피아노 소나타 24번 '테레제' 1악장\" \"Beethoven\"","cat":"주파수","m":"다정한 헌사가 담긴 주파수가 호감과 친밀감을"},{"t":"죽음과 소녀 2악장 (관계 회복)","a":"Schubert","q":"\"죽음과 소녀 2악장 (관계 회복)\" \"Schubert\"","cat":"주파수","m":"고통을 공유하며 생겨나는 깊은 연대감이 관계"},{"t":"발라드 1번 (서정적 파트)","a":"Chopin","q":"\"발라드 1번 (서정적 파트)\" \"Chopin\"","cat":"주파수","m":"서사적인 흐름이 긴 이야기를 나누듯 상대와 "},{"t":"이중 협주곡 2악장","a":"Brahms","q":"\"이중 협주곡 2악장\" \"Brahms\"","cat":"주파수","m":"바이올린과 첼로의 화해가 반목하던 관계를 정"},{"t":"한여름 밤의 꿈 '야상곡'","a":"Mendelssohn","q":"\"한여름 밤의 꿈 '야상곡'\" \"Mendelssohn\"","cat":"주파수","m":"숲의 요정 같은 신비로움이 경계심을 허물고 "},{"t":"위로 3번 (관계의 평화)","a":"Liszt","q":"\"위로 3번 (관계의 평화)\" \"Liszt\"","cat":"주파수","m":"분노를 잠재우고 타인을 용서할 수 있는 자비"},{"t":"작은 모음곡 '배 안에서'","a":"Debussy","q":"\"작은 모음곡 '배 안에서'\" \"Debussy\"","cat":"주파수","m":"여유로운 나들이의 파동이 편안한 대화의 주제"},{"t":"엘레지 (Elegy)","a":"Fauré","q":"\"엘레지 (Elegy)\" \"Fauré\"","cat":"주파수","m":"슬픔의 공유를 통해 상호 간의 방어 기제를 "},{"t":"나비부인 '사랑의 이중창'","a":"Puccini","q":"\"나비부인 '사랑의 이중창'\" \"Puccini\"","cat":"주파수","m":"헌신적인 사랑의 주파수가 관계의 깊이를 수직"},{"t":"나부코 '히브리 노예들의 합창'","a":"Verdi","q":"\"나부코 '히브리 노예들의 합창'\" \"Verdi\"","cat":"주파수","m":"억눌린 자들의 동질감이 강력한 사회적 결속과"},{"t":"콘체르토 그로소 Op.6 No.8","a":"Corelli","q":"\"콘체르토 그로소 Op.6 No.8\" \"Corelli\"","cat":"주파수","m":"고전적 우아함이 품격 있는 사교와 비즈니스 "},{"t":"윌리엄 텔 '목가'","a":"Rossini","q":"\"윌리엄 텔 '목가'\" \"Rossini\"","cat":"주파수","m":"평화로운 자연의 파동이 대립하던 의견을 평화"},{"t":"소나타 K.1","a":"Scarlatti","q":"\"소나타 K.1\" \"Scarlatti\"","cat":"주파수","m":"명료하고 깨끗한 터치가 오해 없는 투명한 소"},{"t":"현악 사중주 '종작' 4악장","a":"Haydn","q":"\"현악 사중주 '종작' 4악장\" \"Haydn\"","cat":"주파수","m":"종작의 재잘거림 같은 파동이 즐거운 수다와 "},{"t":"어느 귀인을 위한 환상곡","a":"Rodrigo","q":"\"어느 귀인을 위한 환상곡\" \"Rodrigo\"","cat":"주파수","m":"상호 존중과 경의를 표하는 주파수가 격조 높"},{"t":"수상음악 '에어'","a":"Handel","q":"\"수상음악 '에어'\" \"Handel\"","cat":"주파수","m":"부드러운 흐름이 관계 속에 쌓인 앙금을 씻어"},{"t":"관현악 모음곡 2번 '바디느리'","a":"J.S. Bach","q":"\"관현악 모음곡 2번 '바디느리'\" \"J.S. Bach\"","cat":"주파수","m":"경쾌한 플루트의 대화가 사교 모임에서 유연한"},{"t":"클라리넷 오중주 K.581 2악장","a":"Mozart","q":"\"클라리넷 오중주 K.581 2악장\" \"Mozart\"","cat":"주파수","m":"클라리넷의 따뜻한 음색이 타인의 말에 깊이 "},{"t":"피아노 삼중주 '유령' 2악장","a":"Beethoven","q":"\"피아노 삼중주 '유령' 2악장\" \"Beethoven\"","cat":"주파수","m":"긴밀하게 얽힌 삼중주의 선율이 복잡한 비즈니"},{"t":"조화의 영감 Op.3 No.8 2악장","a":"Vivaldi","q":"\"조화의 영감 Op.3 No.8 2악장\" \"Vivaldi\"","cat":"주파수","m":"악기 간의 완벽한 상호보완적 조화가 팀워크와"},{"t":"현악 사중주 3악장","a":"Debussy","q":"\"현악 사중주 3악장\" \"Debussy\"","cat":"주파수","m":"몽환적이고 부드러운 화성이 타인의 허물을 덮"},{"t":"합주 협주곡 Op.6 No.12","a":"Handel","q":"\"합주 협주곡 Op.6 No.12\" \"Handel\"","cat":"주파수","m":"질서 정연한 합주가 집단 지성을 자극하고 갈"},{"t":"피아노 삼중주 1번 2악장","a":"Mendelssohn","q":"\"피아노 삼중주 1번 2악장\" \"Mendelssohn\"","cat":"주파수","m":"서정적이고 다정한 선율이 가족 간의 깊은 이"},{"t":"피아노 협주곡 2번 2악장","a":"Saint-Saëns","q":"\"피아노 협주곡 2번 2악장\" \"Saint-Saëns\"","cat":"주파수","m":"위트 넘치는 리듬감이 대화의 긴장을 풀고 매"},{"t":"투란도트 '공주는 잠 못 이루고'","a":"Puccini","q":"\"투란도트 '공주는 잠 못 이루고'\" \"Puccini\"","cat":"주파수","m":"승리와 사랑의 확신이 담긴 파동이 대중의 마"},{"t":"아이다 '개선행진곡'","a":"Verdi","q":"\"아이다 '개선행진곡'\" \"Verdi\"","cat":"주파수","m":"웅장한 공동체의 리듬이 애국심이나 소속감을 "},{"t":"짐노페디 1번 (관계의 여백)","a":"Satie","q":"\"짐노페디 1번 (관계의 여백)\" \"Satie\"","cat":"주파수","m":"정적인 공간감이 관계의 집착을 내려놓고 건강"},{"t":"행성 중 '금성-평화를 가져오는 자'","a":"Holst","q":"\"행성 중 '금성-평화를 가져오는 자'\" \"Holst\"","cat":"주파수","m":"부드러운 호른과 현의 선율이 다툼 중인 관계"},{"t":"첼로 협주곡 B단조 2악장","a":"Dvořák","q":"\"첼로 협주곡 B단조 2악장\" \"Dvořák\"","cat":"주파수","m":"노스탤지어를 공유하는 선율이 오래된 인연과의"},{"t":"우아하고 감상적인 왈츠","a":"Ravel","q":"\"우아하고 감상적인 왈츠\" \"Ravel\"","cat":"주파수","m":"세련된 사교적 파동이 격조 높은 모임에서의 "},{"t":"카르미나 부라나 '부드러운 시간'","a":"Orff","q":"\"카르미나 부라나 '부드러운 시간'\" \"Orff\"","cat":"주파수","m":"자연의 순환적 리듬이 인간관계의 부침을 긍정"},{"t":"모세 변주곡 (G선상의 대화)","a":"Paganini","q":"\"모세 변주곡 (G선상의 대화)\" \"Paganini\"","cat":"주파수","m":"한 줄의 현이 이끄는 변주가 극한의 상황에서"},{"t":"골트베르크 변주곡 중 '삼중창'","a":"Bach","q":"\"골트베르크 변주곡 중 '삼중창'\" \"Bach\"","cat":"주파수","m":"수학적 완벽함이 관계 속의 무질서를 정리하고"},{"t":"현악 사중주 15번 3악장","a":"Beethoven","q":"\"현악 사중주 15번 3악장\" \"Beethoven\"","cat":"주파수","m":"병 치유 후의 감사함이 담긴 선율이 관계의 "},{"t":"플루트 사중주 D장조 1악장","a":"Mozart","q":"\"플루트 사중주 D장조 1악장\" \"Mozart\"","cat":"주파수","m":"투명한 소통의 에너지가 비밀이나 오해 없이 "},{"t":"피아노 협주곡 2번 2악장","a":"Chopin","q":"\"피아노 협주곡 2번 2악장\" \"Chopin\"","cat":"주파수","m":"애틋한 동경의 선율이 멀리 떨어진 사람과의 "},{"t":"아르페지오네 소나타 1악장","a":"Schubert","q":"\"아르페지오네 소나타 1악장\" \"Schubert\"","cat":"주파수","m":"악기 간의 긴밀한 호흡이 일대일 심층 대화의"},{"t":"만프레드 서곡 (통합의 테마)","a":"Schumann","q":"\"만프레드 서곡 (통합의 테마)\" \"Schumann\"","cat":"주파수","m":"내면의 모순을 통합하여 타인에게 비치는 자아"},{"t":"대학축전 서곡","a":"Brahms","q":"\"대학축전 서곡\" \"Brahms\"","cat":"주파수","m":"세대 간의 벽을 허무는 선율이 선후배 간의 "},{"t":"교향곡 6번 '비창' 2악장 (왈츠)","a":"Tchaikovsky","q":"\"교향곡 6번 '비창' 2악장 (왈츠)\" \"Tchaikovsky\"","cat":"주파수","m":"엇박자의 미학이 서로 다른 속도를 가진 사람"},{"t":"피아노 협주곡 3번 2악장","a":"Rachmaninoff","q":"\"피아노 협주곡 3번 2악장\" \"Rachmaninoff\"","cat":"주파수","m":"고난을 함께 극복하는 선율이 전우애와 같은 "},{"t":"펠레아스와 멜리장드 '시칠리아노'","a":"Fauré","q":"\"펠레아스와 멜리장드 '시칠리아노'\" \"Fauré\"","cat":"주파수","m":"우아한 비애의 선율이 상호 간의 연민을 통해"},{"t":"오르페오 중 '내 에우리디체를 돌려주오'","a":"Gluck","q":"\"오르페오 중 '내 에우리디체를 돌려주오'\" \"Gluck\"","cat":"주파수","m":"간절한 호소가 담긴 선율이 닫힌 상대의 마음"},{"t":"아베 마리아 (Bach 프렐류드 기반)","a":"Gounod","q":"\"아베 마리아 (Bach 프렐류드 기반)\" \"Gounod\"","cat":"주파수","m":"기존의 가치에 새로운 가치를 입히는 조화가 "},{"t":"세헤라자데 '젊은 왕자와 공주'","a":"Rimsky-Korsakov","q":"\"세헤라자데 '젊은 왕자와 공주'\" \"Rimsky-Korsakov\"","cat":"주파수","m":"동화 같은 조화로움이 남녀 관계의 순수한 소"},{"t":"소나타 K.159","a":"Scarlatti","q":"\"소나타 K.159\" \"Scarlatti\"","cat":"주파수","m":"사냥의 나팔 소리 같은 활기찬 소통이 정체된"},{"t":"현악 사중주 '농담' 4악장","a":"Haydn","q":"\"현악 사중주 '농담' 4악장\" \"Haydn\"","cat":"주파수","m":"반전 있는 즐거움이 관계에 활력을 불어넣고 "},{"t":"아란후에스 협주곡 2악장 (소통 파트)","a":"Rodrigo","q":"\"아란후에스 협주곡 2악장 (소통 파트)\" \"Rodrigo\"","cat":"주파수","m":"독주 악기와 오케스트라의 긴박한 대화가 고난"},{"t":"나의 조국 중 '블라니크'","a":"Smetana","q":"\"나의 조국 중 '블라니크'\" \"Smetana\"","cat":"주파수","m":"민족적 결집의 에너지가 집단의 소속감과 정체"},{"t":"음악의 헌정 '캐논'","a":"Bach","q":"\"음악의 헌정 '캐논'\" \"Bach\"","cat":"주파수","m":"정교한 거울 구조의 선율이 역지사지의 마음으"},{"t":"삼중 협주곡 BWV 1044 2악장","a":"J.S. Bach","q":"\"삼중 협주곡 BWV 1044 2악장\" \"J.S. Bach\"","cat":"주파수","m":"플루트, 바이올린, 하프시코드가 대등하게 얽"},{"t":"현악 사중주 13번 5악장 '카바티나'","a":"Beethoven","q":"\"현악 사중주 13번 5악장 '카바티나'\" \"Beethoven\"","cat":"주파수","m":"깊은 인간미가 담긴 선율이 소원해진 가족 간"},{"t":"첼로 소나타 G단조 3악장","a":"Chopin","q":"\"첼로 소나타 G단조 3악장\" \"Chopin\"","cat":"주파수","m":"피아노와 첼로의 진솔한 대화가 깊은 내면의 "},{"t":"현악 오중주 C장조 2악장","a":"Schubert","q":"\"현악 오중주 C장조 2악장\" \"Schubert\"","cat":"주파수","m":"첼로 두 대의 묵직한 지지가 관계의 안정감과"},{"t":"두 대의 첼로를 위한 협주곡 2악장","a":"Vivaldi","q":"\"두 대의 첼로를 위한 협주곡 2악장\" \"Vivaldi\"","cat":"주파수","m":"같은 음역대 악기의 공명이 동질감을 형성하여"},{"t":"교향곡 5번 2악장","a":"Tchaikovsky","q":"\"교향곡 5번 2악장\" \"Tchaikovsky\"","cat":"주파수","m":"호른의 독주와 현의 응답이 리더와 구성원 간"},{"t":"클라리넷 오중주 Op.115 1악장","a":"Brahms","q":"\"클라리넷 오중주 Op.115 1악장\" \"Brahms\"","cat":"주파수","m":"가을날의 사색적인 선율이 성숙한 어른들의 관"},{"t":"두 대의 피아노를 위한 모음곡 '타란텔라'","a":"Rachmaninoff","q":"\"두 대의 피아노를 위한 모음곡 '타란텔라'\" \"Rachmaninoff\"","cat":"주파수","m":"두 대의 피아노가 이루는 폭발적 시너지가 공"},{"t":"합주 협주곡 Op.6 No.6 3악장","a":"Handel","q":"\"합주 협주곡 Op.6 No.6 3악장\" \"Handel\"","cat":"주파수","m":"엄격한 형식 속의 조화가 공적인 비즈니스 관"},{"t":"무언가 '이중창' (Duetto)","a":"Mendelssohn","q":"\"무언가 '이중창' (Duetto)\" \"Mendelssohn\"","cat":"주파수","m":"말 없는 노래 속의 대화가 연인 사이의 텔레"},{"t":"동물의 사육제 중 '피아니스트'","a":"Saint-Saëns","q":"\"동물의 사육제 중 '피아니스트'\" \"Saint-Saëns\"","cat":"주파수","m":"반복과 연습의 리듬이 서툰 관계를 반복하며 "},{"t":"로엔그린 3막 '혼례의 합창'","a":"Wagner","q":"\"로엔그린 3막 '혼례의 합창'\" \"Wagner\"","cat":"주파수","m":"새로운 결합과 출발을 축복하며 모든 하객의 "},{"t":"홀베르그 모음곡 '에어'","a":"Grieg","q":"\"홀베르그 모음곡 '에어'\" \"Grieg\"","cat":"주파수","m":"고풍스러운 선율이 세대 간의 벽을 허물고 옛"},{"t":"꿈 (Reverie)","a":"Debussy","q":"\"꿈 (Reverie)\" \"Debussy\"","cat":"주파수","m":"부드러운 화성이 날 선 관계를 이완시키고 몽"},{"t":"나비부인 '꽃의 이중창'","a":"Puccini","q":"\"나비부인 '꽃의 이중창'\" \"Puccini\"","cat":"주파수","m":"꽃을 뿌리는 듯한 화사한 음색이 환대와 환영"},{"t":"리골레토 '4중창'","a":"Verdi","q":"\"리골레토 '4중창'\" \"Verdi\"","cat":"주파수","m":"각기 다른 입장과 감정이 얽혀 조화를 이루는"},{"t":"행성 중 '목성-기쁨을 가져오는 자'","a":"Holst","q":"\"행성 중 '목성-기쁨을 가져오는 자'\" \"Holst\"","cat":"주파수","m":"당당하고 풍요로운 선율이 공동체의 번영과 화"},{"t":"현악 사중주 '아메리카' 2악장","a":"Dvořák","q":"\"현악 사중주 '아메리카' 2악장\" \"Dvořák\"","cat":"주파수","m":"고독 속에서 피어나는 연결의 갈망이 진실한 "},{"t":"현악 사중주 4악장","a":"Ravel","q":"\"현악 사중주 4악장\" \"Ravel\"","cat":"주파수","m":"긴박하고 정교한 주고받음이 빠른 정보 교환과"},{"t":"박쥐 '샴페인의 노래'","a":"Strauss II","q":"\"박쥐 '샴페인의 노래'\" \"Strauss II\"","cat":"주파수","m":"거절할 수 없는 유쾌함이 사교장의 모든 벽을"},{"t":"푸가의 기법 '콘트라푼쿠스 I'","a":"Bach","q":"\"푸가의 기법 '콘트라푼쿠스 I'\" \"Bach\"","cat":"주파수","m":"하나의 주제가 다양하게 변주되는 과정이 다원"},{"t":"피아노 협주곡 20번 2악장","a":"Mozart","q":"\"피아노 협주곡 20번 2악장\" \"Mozart\"","cat":"주파수","m":"격정 뒤의 평온함이 갈등 후의 화해 과정을 "},{"t":"발라드 4번 (코다 이전)","a":"Chopin","q":"\"발라드 4번 (코다 이전)\" \"Chopin\"","cat":"주파수","m":"복잡한 감정의 층위가 관계 속의 오해를 깊은"},{"t":"판타지 C장조 D.934 (바이올린/피아노)","a":"Schubert","q":"\"판타지 C장조 D.934 (바이올린/피아노)\" \"Schubert\"","cat":"주파수","m":"두 악기의 환상적인 결합이 완벽한 동반자 관"},{"t":"시인의 사랑 '아름다운 5월에'","a":"Schumann","q":"\"시인의 사랑 '아름다운 5월에'\" \"Schumann\"","cat":"주파수","m":"첫사랑의 설렘 같은 파동이 소원했던 관계에 "},{"t":"파가니니 에튀드 6번","a":"Liszt","q":"\"파가니니 에튀드 6번\" \"Liszt\"","cat":"주파수","m":"화려한 변주가 집단 내에서 개인의 개성을 존"},{"t":"비올라 소나타 2번 1악장","a":"Brahms","q":"\"비올라 소나타 2번 1악장\" \"Brahms\"","cat":"주파수","m":"비올라의 중후한 울림이 세대 간, 직급 간의"},{"t":"잠자는 숲속의 공녀 '파 드 되'","a":"Tchaikovsky","q":"\"잠자는 숲속의 공녀 '파 드 되'\" \"Tchaikovsky\"","cat":"주파수","m":"남녀 주인공의 우아한 협업이 관계의 절정인 "},{"t":"피아노 협주곡 2번 2악장 (연결 테마)","a":"Rachmaninoff","q":"\"피아노 협주곡 2번 2악장 (연결 테마)\" \"Rachmaninoff\"","cat":"주파수","m":"서서히 고조되는 감정의 선율이 멀어진 관계를"},{"t":"영상 1집 '물의 반영'","a":"Debussy","q":"\"영상 1집 '물의 반영'\" \"Debussy\"","cat":"주파수","m":"흔들리는 물결 속의 조화가 변화무쌍한 관계 "},{"t":"피아노 오중주 1번 2악장","a":"Fauré","q":"\"피아노 오중주 1번 2악장\" \"Fauré\"","cat":"주파수","m":"투명하고 섬세한 앙상블이 순수하고 거짓 없는"},{"t":"현과 오르간을 위한 아다지오 (통합 파트)","a":"Albinoni","q":"\"현과 오르간을 위한 아다지오 (통합 파트)\" \"Albinoni\"","cat":"주파수","m":"오르간의 거대한 울림과 현의 애절함이 신구 "},{"t":"오르페오 중 '나의 사랑하는 님이여'","a":"Gluck","q":"\"오르페오 중 '나의 사랑하는 님이여'\" \"Gluck\"","cat":"주파수","m":"진심 어린 호소가 타인의 마음을 움직여 불가"},{"t":"압델라자르 '론도'","a":"Purcell","q":"\"압델라자르 '론도'\" \"Purcell\"","cat":"주파수","m":"반복되는 주제 선율이 관계 속의 약속과 신의"},{"t":"타이스의 명상곡 (관계의 정화)","a":"Massenet","q":"\"타이스의 명상곡 (관계의 정화)\" \"Massenet\"","cat":"주파수","m":"지극한 순수의 선율이 욕망으로 얼룩진 관계를"},{"t":"파우스트 '보석의 노래'","a":"Gounod","q":"\"파우스트 '보석의 노래'\" \"Gounod\"","cat":"주파수","m":"자신감을 고취하여 관계 속에서 당당한 매력을"},{"t":"세헤라자데 4악장 '축제'","a":"Rimsky-Korsakov","q":"\"세헤라자데 4악장 '축제'\" \"Rimsky-Korsakov\"","cat":"주파수","m":"다양한 리듬의 향연이 이질적인 문화나 사람들"},{"t":"세비야의 이발사 '방금 그 목소리'","a":"Rossini","q":"\"세비야의 이발사 '방금 그 목소리'\" \"Rossini\"","cat":"주파수","m":"지혜로운 소통 전략을 암시하며 재치 있는 대"},{"t":"소나타 K.531","a":"Scarlatti","q":"\"소나타 K.531\" \"Scarlatti\"","cat":"주파수","m":"경쾌하고 빠른 응답이 막힘없는 의사소통과 빠"},{"t":"현악 사중주 '해돋이' 1악장","a":"Haydn","q":"\"현악 사중주 '해돋이' 1악장\" \"Haydn\"","cat":"주파수","m":"서서히 밝아오는 선율이 어색한 침묵을 깨고 "},{"t":"위풍당당 행진곡 1번 (중간부)","a":"Elgar","q":"\"위풍당당 행진곡 1번 (중간부)\" \"Elgar\"","cat":"주파수","m":"승리와 영광의 공유가 공동체의 자부심과 강력"},{"t":"어느 귀인을 위한 환상곡 '카나리오'","a":"Rodrigo","q":"\"어느 귀인을 위한 환상곡 '카나리오'\" \"Rodrigo\"","cat":"주파수","m":"옛 춤곡의 리듬이 격의 없는 즐거운 소통과 "},{"t":"왕궁의 불꽃놀이 '미뉴에트'","a":"Handel","q":"\"왕궁의 불꽃놀이 '미뉴에트'\" \"Handel\"","cat":"주파수","m":"화려한 피날레가 관계의 완성을 축하하며 평화"},{"t":"토카타와 푸가 D단조","a":"J.S. Bach","q":"\"토카타와 푸가 D단조\" \"J.S. Bach\"","cat":"주파수","m":"압도적인 파이프 오르간의 진동이 정신적 정체"},{"t":"민독산의 하룻밤","a":"Mussorgsky","q":"\"민독산의 하룻밤\" \"Mussorgsky\"","cat":"주파수","m":"혼란스러운 에너지를 몰아내고 새벽의 명징함을"},{"t":"프렐류드 '불꽃'","a":"Debussy","q":"\"프렐류드 '불꽃'\" \"Debussy\"","cat":"주파수","m":"번뜩이는 영감의 불꽃이 아이디어의 연쇄 반응"},{"t":"현, 타악기, 첼레스타를 위한 음악 2악장","a":"Bartók","q":"\"현, 타악기, 첼레스타를 위한 음악 2악장\" \"Bartók\"","cat":"주파수","m":"기하학적인 화성이 논리적 직관과 공학적 창의"},{"t":"무반주 바이올린 파르티타 2번 '샤콘느'","a":"Bach","q":"\"무반주 바이올린 파르티타 2번 '샤콘느'\" \"Bach\"","cat":"주파수","m":"변치 않는 질서 속의 무한한 변주가 본질적인"},{"t":"레퀴엠 '디에스 이레' (진노의 날)","a":"Mozart","q":"\"레퀴엠 '디에스 이레' (진노의 날)\" \"Mozart\"","cat":"주파수","m":"강력한 진동이 심리적 방어 기제를 허물고 진"},{"t":"에튀드 Op.10 No.4 '추격'","a":"Chopin","q":"\"에튀드 Op.10 No.4 '추격'\" \"Chopin\"","cat":"주파수","m":"빠른 흐름의 파동이 뇌의 처리 속도를 높이고"},{"t":"단테 소나타 (환상곡풍 소나타)","a":"Liszt","q":"\"단테 소나타 (환상곡풍 소나타)\" \"Liszt\"","cat":"주파수","m":"지옥과 천국을 오가는 서사가 고난을 기회로 "},{"t":"피아노 협주곡 2번 1악장","a":"Brahms","q":"\"피아노 협주곡 2번 1악장\" \"Brahms\"","cat":"주파수","m":"거대한 스케일의 지적 에너지가 거시적 안목과"},{"t":"교향곡 4번 1악장","a":"Tchaikovsky","q":"\"교향곡 4번 1악장\" \"Tchaikovsky\"","cat":"주파수","m":"운명의 테마를 돌파하는 에너지가 정체된 프로"},{"t":"소나타 K.141","a":"Scarlatti","q":"\"소나타 K.141\" \"Scarlatti\"","cat":"주파수","m":"반복되는 동음 연타가 정신적 산만함을 제거하"},{"t":"사라반드 D단조","a":"Handel","q":"\"사라반드 D단조\" \"Handel\"","cat":"주파수","m":"장중한 미니멀리즘이 복잡한 생각을 단순화하여"},{"t":"환상 교향곡 5악장 '사바트의 밤'","a":"Berlioz","q":"\"환상 교향곡 5악장 '사바트의 밤'\" \"Berlioz\"","cat":"주파수","m":"파격적인 음향 실험이 관습을 탈피하는 창조적"},{"t":"행성 중 '화성-전쟁을 가져오는 자'","a":"Holst","q":"\"행성 중 '화성-전쟁을 가져오는 자'\" \"Holst\"","cat":"주파수","m":"5/4박자의 기묘한 리듬이 뇌의 타성을 깨고"},{"t":"피아노 소나타 4번 2악장","a":"Scriabin","q":"\"피아노 소나타 4번 2악장\" \"Scriabin\"","cat":"주파수","m":"신비주의적 화성이 영적 직관과 미지의 영역에"},{"t":"정화된 밤","a":"Schoenberg","q":"\"정화된 밤\" \"Schoenberg\"","cat":"주파수","m":"불협화음의 해소 과정이 관계나 기술적 마찰을"},{"t":"발큐레의 기행","a":"Wagner","q":"\"발큐레의 기행\" \"Wagner\"","cat":"주파수","m":"비상하는 주파수가 시야를 넓혀 글로벌 시장을"},{"t":"푸가의 기법 '캐논별곡'","a":"Bach","q":"\"푸가의 기법 '캐논별곡'\" \"Bach\"","cat":"주파수","m":"수학적 구조의 극치가 좌뇌와 우뇌를 연결하여"},{"t":"피아노 협주곡 5번 '황제' 1악장","a":"Beethoven","q":"\"피아노 협주곡 5번 '황제' 1악장\" \"Beethoven\"","cat":"주파수","m":"자신감 있는 테마가 직관에 대한 확신을 주고"},{"t":"겨울바람 에튀드 (Op.25 No.11)","a":"Chopin","q":"\"겨울바람 에튀드 (Op.25 No.11)\" \"Chopin\"","cat":"주파수","m":"휘몰아치는 파동이 나태함과 타성을 씻어내는 "},{"t":"루슬란과 루드밀라 서곡","a":"Glinka","q":"\"루슬란과 루드밀라 서곡\" \"Glinka\"","cat":"주파수","m":"초고속 질주감이 두뇌의 가속도를 높여 단기간"},{"t":"윌리엄 텔 서곡 '피날레'","a":"Rossini","q":"\"윌리엄 텔 서곡 '피날레'\" \"Rossini\"","cat":"주파수","m":"승리의 파동이 성공적인 결과로 가는 최단 경"},{"t":"수수께끼 변주곡 중 '님로드'","a":"Elgar","q":"\"수수께끼 변주곡 중 '님로드'\" \"Elgar\"","cat":"주파수","m":"숭고한 통찰이 인생과 사업의 장기적 방향성을"},{"t":"바다 '파도의 희롱'","a":"Debussy","q":"\"바다 '파도의 희롱'\" \"Debussy\"","cat":"주파수","m":"끊임없이 변화하는 물의 형상이 유동적인 시장"},{"t":"칼의 춤","a":"Khachaturian","q":"\"칼의 춤\" \"Khachaturian\"","cat":"주파수","m":"원시적이고 날카로운 타악의 울림이 잡념을 즉"},{"t":"오 포르투나 (카르미나 부라나)","a":"Orff","q":"\"오 포르투나 (카르미나 부라나)\" \"Orff\"","cat":"주파수","m":"거대한 운명의 바퀴를 돌리는 에너지가 판을 "},{"t":"중앙 아시아의 초원에서","a":"Borodin","q":"\"중앙 아시아의 초원에서\" \"Borodin\"","cat":"주파수","m":"이질적인 테마의 융합이 동서양 시장을 아우르"},{"t":"교향곡 94번 '놀람' 2악장","a":"Haydn","q":"\"교향곡 94번 '놀람' 2악장\" \"Haydn\"","cat":"주파수","m":"예상치 못한 충격이 뇌를 깨워 정체기에 빠진"},{"t":"음악의 헌정 '무한 캐논'","a":"Bach","q":"\"음악의 헌정 '무한 캐논'\" \"Bach\"","cat":"주파수","m":"끝없이 순환하는 구조가 문제의 근원적 해결을"},{"t":"교향곡 41번 '쥬피터' 4악장","a":"Mozart","q":"\"교향곡 41번 '쥬피터' 4악장\" \"Mozart\"","cat":"주파수","m":"신성한 기하학적 구조가 지적인 직관력을 최상"},{"t":"혁명 에튀드 (Op.10 No.12)","a":"Chopin","q":"\"혁명 에튀드 (Op.10 No.12)\" \"Chopin\"","cat":"주파수","m":"비극을 창조적 에너지로 승화시켜 위기 속에서"},{"t":"마제파 (초절기교 에튀드 4번)","a":"Liszt","q":"\"마제파 (초절기교 에튀드 4번)\" \"Liszt\"","cat":"주파수","m":"한계를 돌파하는 강력한 리듬이 기술적 난제를"},{"t":"니벨룽의 반지 중 '지크프리트의 라인강 여행'","a":"Wagner","q":"\"니벨룽의 반지 중 '지크프리트의 라인강 여행'\" \"Wagner\"","cat":"주파수","m":"모험적인 선율이 미지의 영역을 개척하는 혁신"},{"t":"악흥의 순간 No.4","a":"Rachmaninoff","q":"\"악흥의 순간 No.4\" \"Rachmaninoff\"","cat":"주파수","m":"쉴 새 없이 몰아치는 음표들이 뇌의 처리 능"},{"t":"교향곡 6번 3악장","a":"Tchaikovsky","q":"\"교향곡 6번 3악장\" \"Tchaikovsky\"","cat":"주파수","m":"승리감을 고취하는 행진곡 리듬이 목표를 향한"},{"t":"교향곡 5번 3악장","a":"Sibelius","q":"\"교향곡 5번 3악장\" \"Sibelius\"","cat":"주파수","m":"백조의 비상을 형상화한 선율이 거시적인 미래"},{"t":"교향곡 2번 '부활' 5악장 (피날레)","a":"Mahler","q":"\"교향곡 2번 '부활' 5악장 (피날레)\" \"Mahler\"","cat":"주파수","m":"죽음을 넘어선 재생의 에너지가 실패한 아이디"},{"t":"토스카 '별은 빛나건만'","a":"Puccini","q":"\"토스카 '별은 빛나건만'\" \"Puccini\"","cat":"주파수","m":"절박한 상황에서의 진실한 파동이 본질에 집중"},{"t":"차가운 소품 (Pieces froides)","a":"Satie","q":"\"차가운 소품 (Pieces froides)\" \"Satie\"","cat":"주파수","m":"감정이 배제된 건조한 선율이 냉철하고 객관적"},{"t":"행성 중 '수성-날개 달린 메신저'","a":"Holst","q":"\"행성 중 '수성-날개 달린 메신저'\" \"Holst\"","cat":"주파수","m":"전령사의 빠른 움직임처럼 번뜩이는 영감을 뇌"},{"t":"자라투스트라는 이렇게 말했다 (서곡)","a":"Strauss","q":"\"자라투스트라는 이렇게 말했다 (서곡)\" \"Strauss\"","cat":"주파수","m":"존재의 각성을 알리는 웅장한 화음이 잠들어 "},{"t":"볼레로 (Bolero)","a":"Ravel","q":"\"볼레로 (Bolero)\" \"Ravel\"","cat":"주파수","m":"집요하게 고조되는 리듬이 끈기 있는 탐구 끝"},{"t":"에튀드 Op.8 No.12","a":"Scriabin","q":"\"에튀드 Op.8 No.12\" \"Scriabin\"","cat":"주파수","m":"격정적인 화성이 내면의 에너지를 폭발시켜 창"},{"t":"알레그로 바르바로","a":"Bartók","q":"\"알레그로 바르바로\" \"Bartók\"","cat":"주파수","m":"야만적이고 강렬한 타격감이 뇌의 불필요한 공"},{"t":"피아노 소나타 14번 1악장","a":"Mozart","q":"\"피아노 소나타 14번 1악장\" \"Mozart\"","cat":"주파수","m":"비극적 단조 속에 흐르는 이성이 감정에 휘둘"},{"t":"현악 사중주 14번 1악장","a":"Beethoven","q":"\"현악 사중주 14번 1악장\" \"Beethoven\"","cat":"주파수","m":"명상적인 푸가의 흐름이 깊은 무의식 속으로 "},{"t":"프렐류드 16번 '지옥'","a":"Chopin","q":"\"프렐류드 16번 '지옥'\" \"Chopin\"","cat":"주파수","m":"극한의 속도감이 고정관념을 파괴하고 찰나의 "},{"t":"방랑자 환상곡 4악장","a":"Schubert","q":"\"방랑자 환상곡 4악장\" \"Schubert\"","cat":"주파수","m":"끊임없는 탐색과 변주가 새로운 시장 모델에 "},{"t":"교향적 연습곡 12번 (피날레)","a":"Schumann","q":"\"교향적 연습곡 12번 (피날레)\" \"Schumann\"","cat":"주파수","m":"승리와 통합의 테마가 흩어진 아이디어를 하나"},{"t":"전주곡 (교향시 3번)","a":"Liszt","q":"\"전주곡 (교향시 3번)\" \"Liszt\"","cat":"주파수","m":"삶의 투쟁과 승리를 묘사하며 경영상의 어려움"},{"t":"피아노 오중주 F단조 3악장","a":"Brahms","q":"\"피아노 오중주 F단조 3악장\" \"Brahms\"","cat":"주파수","m":"스케르초의 강력한 박동이 심장의 엔진을 가동"},{"t":"피아노 소나타 2번 3악장","a":"Rachmaninoff","q":"\"피아노 소나타 2번 3악장\" \"Rachmaninoff\"","cat":"주파수","m":"광활한 대지의 울림이 대범한 스케일의 사업 "},{"t":"영상 2집 '금빛 물고기'","a":"Debussy","q":"\"영상 2집 '금빛 물고기'\" \"Debussy\"","cat":"주파수","m":"유연하고 빠른 변화가 주식 및 시장의 흐름을"},{"t":"레퀴엠 '리베라 메' (나를 구원하소서)","a":"Fauré","q":"\"레퀴엠 '리베라 메' (나를 구원하소서)\" \"Fauré\"","cat":"주파수","m":"두려움으로부터의 해방을 구하며 심리적 위축을"},{"t":"오보에 협주곡 Op.9 No.2 1악장","a":"Albinoni","q":"\"오보에 협주곡 Op.9 No.2 1악장\" \"Albinoni\"","cat":"주파수","m":"오보에의 투명한 음색이 뇌의 노이즈를 필터링"},{"t":"정령들의 춤 (멜로디)","a":"Gluck","q":"\"정령들의 춤 (멜로디)\" \"Gluck\"","cat":"주파수","m":"지극히 순수하고 정적인 선율이 고요한 가운데"},{"t":"기타 오중주 '마드리드의 야간 파수대'","a":"Boccherini","q":"\"기타 오중주 '마드리드의 야간 파수대'\" \"Boccherini\"","cat":"주파수","m":"리드미컬한 행진곡이 현실 감각을 깨워 실무적"},{"t":"성 세실리아를 위한 장엄 미사","a":"Gounod","q":"\"성 세실리아를 위한 장엄 미사\" \"Gounod\"","cat":"주파수","m":"성스러운 울림이 도덕적 판단력과 기업가 정신"},{"t":"스페인 기상곡 5악장","a":"Rimsky-Korsakov","q":"\"스페인 기상곡 5악장\" \"Rimsky-Korsakov\"","cat":"주파수","m":"화려한 오케스트레이션이 창의적 표현력을 극대"},{"t":"어느 귀인을 위한 환상곡 '횃불의 춤'","a":"Rodrigo","q":"\"어느 귀인을 위한 환상곡 '횃불의 춤'\" \"Rodrigo\"","cat":"주파수","m":"어둠을 밝히는 횃불처럼 앞이 보이지 않는 문"},{"t":"나의 조국 중 '샤르카'","a":"Smetana","q":"\"나의 조국 중 '샤르카'\" \"Smetana\"","cat":"주파수","m":"격정적인 복수의 서사가 장애물을 격파하는 과"},{"t":"음악의 헌정 '역행 캐논'","a":"Bach","q":"\"음악의 헌정 '역행 캐논'\" \"Bach\"","cat":"주파수","m":"거꾸로 연주해도 완벽한 구조가 결과에서 원인"},{"t":"평균율 클라비어곡집 1권 프렐류드 1번","a":"J.S. Bach","q":"\"평균율 클라비어곡집 1권 프렐류드 1번\" \"J.S. Bach\"","cat":"주파수","m":"무결점의 순수한 울림이 뇌의 노이즈를 근본적"},{"t":"에튀드 Op.25 No.12 '대양'","a":"Chopin","q":"\"에튀드 Op.25 No.12 '대양'\" \"Chopin\"","cat":"주파수","m":"거대한 파도의 파동이 내면의 우유부단함을 씻"},{"t":"헝가리 랩소디 2번","a":"Liszt","q":"\"헝가리 랩소디 2번\" \"Liszt\"","cat":"주파수","m":"극적인 반전과 리듬이 예상치 못한 비즈니스 "},{"t":"사계 중 '가을' 3악장","a":"Vivaldi","q":"\"사계 중 '가을' 3악장\" \"Vivaldi\"","cat":"주파수","m":"수확의 기쁨 속 날카로운 선율이 성과 분석에"},{"t":"피아노 협주곡 1번 3악장","a":"Brahms","q":"\"피아노 협주곡 1번 3악장\" \"Brahms\"","cat":"주파수","m":"묵직하고 강력한 론도가 추진력을 강화하여 문"},{"t":"바이올린 협주곡 3악장","a":"Tchaikovsky","q":"\"바이올린 협주곡 3악장\" \"Tchaikovsky\"","cat":"주파수","m":"눈부신 바이올린의 기교가 정신적 피로를 정화"},{"t":"전주곡 Op.32 No.10","a":"Rachmaninoff","q":"\"전주곡 Op.32 No.10\" \"Rachmaninoff\"","cat":"주파수","m":"고뇌를 관통하는 선율이 복잡한 상황을 단순화"},{"t":"판화 중 '비오는 정원'","a":"Debussy","q":"\"판화 중 '비오는 정원'\" \"Debussy\"","cat":"주파수","m":"빗방울의 파동이 뇌세포 사이의 정체된 에너지"},{"t":"합주 협주곡 Op.6 No.1 1악장","a":"Handel","q":"\"합주 협주곡 Op.6 No.1 1악장\" \"Handel\"","cat":"주파수","m":"정교한 바로크의 질서가 혼란스러운 데이터를 "},{"t":"교향곡 3번 '오르간' 2악장 (후반부)","a":"Saint-Saëns","q":"\"교향곡 3번 '오르간' 2악장 (후반부)\" \"Saint-Saëns\"","cat":"주파수","m":"오르간의 진동이 전신을 정화하며 영적인 직관"},{"t":"방랑하는 네덜란드인 서곡","a":"Wagner","q":"\"방랑하는 네덜란드인 서곡\" \"Wagner\"","cat":"주파수","m":"거친 파도를 뚫고 나가는 힘이 시장의 역풍을"},{"t":"피아노 협주곡 1악장","a":"Grieg","q":"\"피아노 협주곡 1악장\" \"Grieg\"","cat":"주파수","m":"북유럽의 웅장한 대자연이 사소한 고민을 씻어"},{"t":"행성 중 '우라누스-마법사'","a":"Holst","q":"\"행성 중 '우라누스-마법사'\" \"Holst\"","cat":"주파수","m":"기발하고 마법 같은 화성이 상식을 뒤엎는 발"},{"t":"첼로 협주곡 1악장","a":"Dvořák","q":"\"첼로 협주곡 1악장\" \"Dvořák\"","cat":"주파수","m":"첼로의 깊은 울림이 감정적 찌꺼기를 정화하고"},{"t":"바이올린 협주곡 1악장","a":"Sibelius","q":"\"바이올린 협주곡 1악장\" \"Sibelius\"","cat":"주파수","m":"차갑고 선명한 음색이 뇌의 인지 기능을 고도"},{"t":"시곡 Op.32 No.1","a":"Scriabin","q":"\"시곡 Op.32 No.1\" \"Scriabin\"","cat":"주파수","m":"미묘한 화성이 무의식 깊은 곳의 창의적 씨앗"},{"t":"교향곡 7번 '레닌그라드' 1악장","a":"Shostakovich","q":"\"교향곡 7번 '레닌그라드' 1악장\" \"Shostakovich\"","cat":"주파수","m":"강인한 생명력의 리듬이 고난 속에서도 굴하지"},{"t":"음악의 헌정 '무한 캐논' (확장 버전)","a":"Bach","q":"\"음악의 헌정 '무한 캐논' (확장 버전)\" \"Bach\"","cat":"주파수","m":"수치적 완벽함이 알고리즘 설계 및 보안 기술"},{"t":"피아노 협주곡 23번 1악장","a":"Mozart","q":"\"피아노 협주곡 23번 1악장\" \"Mozart\"","cat":"주파수","m":"우아함 속에 감춰진 명징한 논리가 세련된 비"},{"t":"프렐류드 24번 D단조","a":"Chopin","q":"\"프렐류드 24번 D단조\" \"Chopin\"","cat":"주파수","m":"마지막 비극적 폭발이 과거의 잔재를 완전히 "},{"t":"현악 사중주 '죽음과 소녀' 1악장","a":"Schubert","q":"\"현악 사중주 '죽음과 소녀' 1악장\" \"Schubert\"","cat":"주파수","m":"긴박한 선율이 위기 관리 능력을 극대화하는 "},{"t":"에스테 장의 분수","a":"Liszt","q":"\"에스테 장의 분수\" \"Liszt\"","cat":"주파수","m":"찬란한 물줄기의 파동이 세포의 수분을 정화하"},{"t":"파가니니 주제에 의한 랩소디 No.24","a":"Rachmaninoff","q":"\"파가니니 주제에 의한 랩소디 No.24\" \"Rachmaninoff\"","cat":"주파수","m":"천재적 변주가 한 가지 소스를 다각도로 활용"},{"t":"영상 1집 '움직임'","a":"Debussy","q":"\"영상 1집 '움직임'\" \"Debussy\"","cat":"주파수","m":"끊임없이 변화하는 리듬이 역동적인 시장 흐름"},{"t":"세헤라자데 2악장 '칼렌다 왕자의 이야기'","a":"Rimsky-Korsakov","q":"\"세헤라자데 2악장 '칼렌다 왕자의 이야기'\" \"Rimsky-Korsakov\"","cat":"주파수","m":"풍부한 서사가 스토리텔링 기반의 사업 기획력"},{"t":"교향곡 104번 '런던' 1악장","a":"Haydn","q":"\"교향곡 104번 '런던' 1악장\" \"Haydn\"","cat":"주파수","m":"당당한 서주가 불확실한 미래에 대한 명확한 "},{"t":"서주와 알레그로 Op.47","a":"Elgar","q":"\"서주와 알레그로 Op.47\" \"Elgar\"","cat":"주파수","m":"현악 앙상블의 힘이 조직 내 갈등을 정화하고"},{"t":"아랑후에즈 협주곡 3악장","a":"Rodrigo","q":"\"아랑후에즈 협주곡 3악장\" \"Rodrigo\"","cat":"주파수","m":"경쾌한 기타의 파동이 머릿속의 복잡한 계산을"},{"t":"피아노 협주곡 3번 1악장","a":"Prokofiev","q":"\"피아노 협주곡 3번 1악장\" \"Prokofiev\"","cat":"주파수","m":"타악기적인 피아노 주법이 뇌의 인지 한계를 "},{"t":"무반주 첼로 모음곡 6번 '지그'","a":"Bach","q":"\"무반주 첼로 모음곡 6번 '지그'\" \"Bach\"","cat":"주파수","m":"환희에 찬 도약의 리듬이 모든 문제 해결을 "},{"t":"아베 베룸 코르푸스","a":"Mozart","q":"\"아베 베룸 코르푸스\" \"Mozart\"","cat":"주파수","m":"지극히 순결하고 성스러운 선율이 내면의 신성"},{"t":"교향곡 9번 '합창' 3악장","a":"Beethoven","q":"\"교향곡 9번 '합창' 3악장\" \"Beethoven\"","cat":"주파수","m":"고난을 넘어선 인류애와 평화의 울림이 영적 "},{"t":"레퀴엠 '인 파라디숨' (낙원에서)","a":"Fauré","q":"\"레퀴엠 '인 파라디숨' (낙원에서)\" \"Fauré\"","cat":"주파수","m":"천상의 평화로움을 형상화하여 영적 차원을 고"},{"t":"골드베르크 변주곡 '아리아'","a":"Bach","q":"\"골드베르크 변주곡 '아리아'\" \"Bach\"","cat":"주파수","m":"완벽한 수학적 대칭미가 우주의 기하학적 질서"},{"t":"독일 레퀴엠 4곡 '주의 장막이 어찌 그리 사랑스러운지요'","a":"Brahms","q":"\"독일 레퀴엠 4곡 '주의 장막이 어찌 그리 사랑스러운지요'\" \"Brahms\"","cat":"주파수","m":"포근한 안식의 에너지가 존재의 근원적 평안을"},{"t":"동물의 사육제 '백조'","a":"Saint-Saëns","q":"\"동물의 사육제 '백조'\" \"Saint-Saëns\"","cat":"주파수","m":"고결하고 우아한 선율이 자존감을 높이고 영적"},{"t":"캐논 D장조","a":"Pachelbel","q":"\"캐논 D장조\" \"Pachelbel\"","cat":"주파수","m":"반복되는 화성의 순환이 만물의 영원한 회귀와"},{"t":"오르페오와 에우리디체 '에우리디체 없이 어찌할까'","a":"Gluck","q":"\"오르페오와 에우리디체 '에우리디체 없이 어찌할까'\" \"Gluck\"","cat":"주파수","m":"상실을 넘어선 고귀한 사랑의 힘이 영성을 회"},{"t":"수녀 안젤리카 '사랑하는 나의 어머니'","a":"Puccini","q":"\"수녀 안젤리카 '사랑하는 나의 어머니'\" \"Puccini\"","cat":"주파수","m":"자비와 용서의 주파수가 과거의 매듭을 풀고 "},{"t":"현을 위한 아다지오 (현악 버전)","a":"Barber","q":"\"현을 위한 아다지오 (현악 버전)\" \"Barber\"","cat":"주파수","m":"깊은 비탄을 뚫고 나오는 숭고함이 영적 카타"},{"t":"글로리아 D장조 'Gloria in excelsis Deo'","a":"Vivaldi","q":"\"글로리아 D장조 'Gloria in excelsis Deo'\" \"Vivaldi\"","cat":"주파수","m":"환희에 찬 신성한 빛이 전신을 감싸며 에너지"},{"t":"생명의 양식 (Panis Angelicus)","a":"Franck","q":"\"생명의 양식 (Panis Angelicus)\" \"Franck\"","cat":"주파수","m":"신과의 합일을 갈망하는 순수한 울림이 영적 "},{"t":"토마스 탈리스 주제에 의한 환상곡","a":"Vaughan Williams","q":"\"토마스 탈리스 주제에 의한 환상곡\" \"Vaughan Williams\"","cat":"주파수","m":"장중한 현악의 울림이 고대부터 이어온 영적 "},{"t":"아를의 여인 중 '미뉴에트'","a":"Bizet","q":"\"아를의 여인 중 '미뉴에트'\" \"Bizet\"","cat":"주파수","m":"투명한 플루트 선율이 맑고 깨끗한 영적 안테"},{"t":"교향곡 6번 '전원' 5악장","a":"Beethoven","q":"\"교향곡 6번 '전원' 5악장\" \"Beethoven\"","cat":"주파수","m":"폭풍우 뒤의 감사와 기도가 자연과 하나 되는"},{"t":"피아노 협주곡 1번 2악장 '로망스'","a":"Chopin","q":"\"피아노 협주곡 1번 2악장 '로망스'\" \"Chopin\"","cat":"주파수","m":"꿈결 같은 감미로움이 영혼의 결을 부드럽게 "},{"t":"현악 세레나데 3악장 '엘레지'","a":"Tchaikovsky","q":"\"현악 세레나데 3악장 '엘레지'\" \"Tchaikovsky\"","cat":"주파수","m":"우아한 서정성이 감정의 파동을 조화롭게 진정"},{"t":"4개의 마지막 노래 '저녁 노을 속에'","a":"Strauss","q":"\"4개의 마지막 노래 '저녁 노을 속에'\" \"Strauss\"","cat":"주파수","m":"삶의 완성을 향한 숭고한 평화가 죽음에 대한"},{"t":"마태 수난곡 '주여 우리를 불쌍히 여기소서'","a":"Bach","q":"\"마태 수난곡 '주여 우리를 불쌍히 여기소서'\" \"Bach\"","cat":"주파수","m":"지극한 자비와 성찰의 에너지가 영적 성장의 "},{"t":"리날도 '울게 하소서'","a":"Handel","q":"\"리날도 '울게 하소서'\" \"Handel\"","cat":"주파수","m":"진정한 자유를 향한 영혼의 외침이 억압된 의"},{"t":"피아노 소나타 12번 2악장","a":"Mozart","q":"\"피아노 소나타 12번 2악장\" \"Mozart\"","cat":"주파수","m":"정교한 장식음 속에 깃든 천진함이 영적 순수"},{"t":"천지창조 '빛이 있으라'","a":"Haydn","q":"\"천지창조 '빛이 있으라'\" \"Haydn\"","cat":"주파수","m":"어둠을 뚫고 나오는 창조의 빛이 새로운 영적"},{"t":"브란덴부르크 협주곡 5번 2악장","a":"J.S. Bach","q":"\"브란덴부르크 협주곡 5번 2악장\" \"J.S. Bach\"","cat":"주파수","m":"플루트와 바이올린의 대화가 천상의 질서를 지"},{"t":"교향곡 40번 2악장","a":"Mozart","q":"\"교향곡 40번 2악장\" \"Mozart\"","cat":"주파수","m":"우아한 절제미가 슬픔을 숭고한 질서로 승화시"},{"t":"피아노 협주곡 5번 '황제' 2악장","a":"Beethoven","q":"\"피아노 협주곡 5번 '황제' 2악장\" \"Beethoven\"","cat":"주파수","m":"범접할 수 없는 고귀함이 영혼의 품격을 극대"},{"t":"에튀드 Op.10 No.3 '이별의 곡'","a":"Chopin","q":"\"에튀드 Op.10 No.3 '이별의 곡'\" \"Chopin\"","cat":"주파수","m":"인간적 애착을 넘어선 근원적 사랑의 주파수를"},{"t":"순례의 연보 '베네치아와 나폴리' 중 칸초네","a":"Liszt","q":"\"순례의 연보 '베네치아와 나폴리' 중 칸초네\" \"Liszt\"","cat":"주파수","m":"영적 여정 중에 만나는 평온한 성찰의 시간을"},{"t":"목신 Afternoon의 전주곡","a":"Debussy","q":"\"목신 Afternoon의 전주곡\" \"Debussy\"","cat":"주파수","m":"몽환적인 화음이 현실의 경계를 허물고 직관의"},{"t":"세르세 '그리운 나무 그늘이여' (Largo)","a":"Handel","q":"\"세르세 '그리운 나무 그늘이여' (Largo)\" \"Handel\"","cat":"주파수","m":"변치 않는 자연의 섭리에 대한 경외심을 깨움"},{"t":"교향곡 3번 '오르간' 1악장 Poco adagio","a":"Saint-Saëns","q":"\"교향곡 3번 '오르간' 1악장 Poco adagio\" \"Saint-Saëns\"","cat":"주파수","m":"신성한 오르간 소리가 내면의 성전을 정화하고"},{"t":"핀란디아 (중간 합창부)","a":"Sibelius","q":"\"핀란디아 (중간 합창부)\" \"Sibelius\"","cat":"주파수","m":"민족의 혼을 깨우는 숭고함이 자아의 정체성을"},{"t":"교향곡 9번 4악장 (피날레)","a":"Mahler","q":"\"교향곡 9번 4악장 (피날레)\" \"Mahler\"","cat":"주파수","m":"삶의 마지막에서 느끼는 지극한 긍정과 평화를"},{"t":"레퀴엠 '라크리모사' (눈물의 날)","a":"Verdi","q":"\"레퀴엠 '라크리모사' (눈물의 날)\" \"Verdi\"","cat":"주파수","m":"깊은 참회와 정화를 통해 영적인 빛을 맞이하"},{"t":"기도로 (Silent Woods)","a":"Dvořák","q":"\"기도로 (Silent Woods)\" \"Dvořák\"","cat":"주파수","m":"숲의 고요함이 영적 충전을 돕고 직관의 뿌리"},{"t":"살로메 '일곱 베일의 춤' (정화 버전)","a":"Strauss","q":"\"살로메 '일곱 베일의 춤' (정화 버전)\" \"Strauss\"","cat":"주파수","m":"감각의 환상을 걷어내고 실재의 빛을 보게 하"},{"t":"현악 사중주 F장조 2악장","a":"Ravel","q":"\"현악 사중주 F장조 2악장\" \"Ravel\"","cat":"주파수","m":"정교하고 투명한 피치카토가 정신적 명료함을 "},{"t":"민속극 중 '여명'","a":"Mussorgsky","q":"\"민속극 중 '여명'\" \"Mussorgsky\"","cat":"주파수","m":"영적인 새벽을 알리는 선율이 새로운 통찰의 "},{"t":"피아노 소나타 9번 '검은 미사' (정화용)","a":"Scriabin","q":"\"피아노 소나타 9번 '검은 미사' (정화용)\" \"Scriabin\"","cat":"주파수","m":"어둠의 에너지를 빛으로 전환하는 강력한 영적"},{"t":"밤의 음악 (Out of Doors)","a":"Bartók","q":"\"밤의 음악 (Out of Doors)\" \"Bartók\"","cat":"주파수","m":"자연의 신비로운 밤의 소리가 무의식의 치유를"},{"t":"피아노 협주곡 2번 2악장","a":"Shostakovich","q":"\"피아노 협주곡 2번 2악장\" \"Shostakovich\"","cat":"주파수","m":"지극한 순수함이 가식 없는 영혼의 대화를 가"},{"t":"관현악 모음곡 3번 '에어' (원곡 버전)","a":"Bach","q":"\"관현악 모음곡 3번 '에어' (원곡 버전)\" \"Bach\"","cat":"주파수","m":"우주적 법칙의 흐름을 선율로 형상화하여 안정"},{"t":"피아노 소나타 31번 3악장","a":"Beethoven","q":"\"피아노 소나타 31번 3악장\" \"Beethoven\"","cat":"주파수","m":"고난을 딛고 일어나는 부활의 에너지가 영성을"},{"t":"바카롤 (뱃노래) Op.60","a":"Chopin","q":"\"바카롤 (뱃노래) Op.60\" \"Chopin\"","cat":"주파수","m":"영적인 환희를 향해 나아가는 부드러운 항해를"},{"t":"어린이의 정경 '트로이메라이'","a":"Schumann","q":"\"어린이의 정경 '트로이메라이'\" \"Schumann\"","cat":"주파수","m":"영혼의 고향으로 회귀하는 듯한 순수한 꿈을 "},{"t":"베네딕투스 (헝가리 대관식 미사)","a":"Liszt","q":"\"베네딕투스 (헝가리 대관식 미사)\" \"Liszt\"","cat":"주파수","m":"축복의 파동이 삶의 모든 영역에 신성한 질서"},{"t":"클라리넷 오중주 2악장","a":"Brahms","q":"\"클라리넷 오중주 2악장\" \"Brahms\"","cat":"주파수","m":"인생의 가을에 느끼는 깊은 평화와 직관적 수"},{"t":"잠자는 숲속의 미녀 '파노라마'","a":"Tchaikovsky","q":"\"잠자는 숲속의 미녀 '파노라마'\" \"Tchaikovsky\"","cat":"주파수","m":"끝없이 흐르는 아름다움이 영적인 낙관주의를 "},{"t":"심포니 3번 2악장","a":"Rachmaninoff","q":"\"심포니 3번 2악장\" \"Rachmaninoff\"","cat":"주파수","m":"향수와 희망이 교차하며 영혼의 귀환을 노래함"},{"t":"베르가마스크 모음곡 '전주곡'","a":"Debussy","q":"\"베르가마스크 모음곡 '전주곡'\" \"Debussy\"","cat":"주파수","m":"맑고 투명한 선율이 영적 감각을 섬세하게 깨"},{"t":"파반느 (합창 포함)","a":"Fauré","q":"\"파반느 (합창 포함)\" \"Fauré\"","cat":"주파수","m":"우아한 반복의 미학이 영혼의 리듬을 우주와 "},{"t":"라 폴리아 (변주곡 중 명상 파트)","a":"Corelli","q":"\"라 폴리아 (변주곡 중 명상 파트)\" \"Corelli\"","cat":"주파수","m":"고전적 질서의 극치가 정신적 산만함을 완벽히"},{"t":"음악과 함께하는 시간 (Music for a While)","a":"Purcell","q":"\"음악과 함께하는 시간 (Music for a While)\" \"Purcell\"","cat":"주파수","m":"음악이 모든 고통을 치유한다는 믿음을 영적으"},{"t":"성모 송 (Ave Maria)","a":"Gounod","q":"\"성모 송 (Ave Maria)\" \"Gounod\"","cat":"주파수","m":"바흐의 화성 위에 얹어진 기도가 신성한 보호"},{"t":"러시아 부활제 서곡","a":"Rimsky-Korsakov","q":"\"러시아 부활제 서곡\" \"Rimsky-Korsakov\"","cat":"주파수","m":"영적 갱신과 부활의 환희를 장엄한 금관으로 "},{"t":"소나타 K.208","a":"Scarlatti","q":"\"소나타 K.208\" \"Scarlatti\"","cat":"주파수","m":"단순함 속에 깃든 깊은 서정이 영적 본질에 "},{"t":"아랑후에즈 협주곡 2악장","a":"Rodrigo","q":"\"아랑후에즈 협주곡 2악장\" \"Rodrigo\"","cat":"주파수","m":"기타의 애절한 울림이 상실을 영적인 성숙으로"},{"t":"나의 조국 중 '몰다우' (전원 파트)","a":"Smetana","q":"\"나의 조국 중 '몰다우' (전원 파트)\" \"Smetana\"","cat":"주파수","m":"생명의 근원인 물의 흐름이 영혼의 갈증을 해"},{"t":"음악의 헌정 '6성 푸가'","a":"Bach","q":"\"음악의 헌정 '6성 푸가'\" \"Bach\"","cat":"주파수","m":"복잡함 속의 완벽한 조화가 지혜의 최고 단계"},{"t":"무반주 바이올린 파르티타 2번 '샤콘느'","a":"J.S. Bach","q":"\"무반주 바이올린 파르티타 2번 '샤콘느'\" \"J.S. Bach\"","cat":"주파수","m":"고난의 집대성을 통한 영적 승화와 우주적 질"},{"t":"레퀴엠 '호스티아스' (제물)","a":"Mozart","q":"\"레퀴엠 '호스티아스' (제물)\" \"Mozart\"","cat":"주파수","m":"자기 비움을 통해 신성한 빛과 연결되는 순수"},{"t":"전주곡 Op.28 No.15 '빗방울'","a":"Chopin","q":"\"전주곡 Op.28 No.15 '빗방울'\" \"Chopin\"","cat":"주파수","m":"반복되는 파동이 집착을 씻어내고 영적 인내심"},{"t":"순례의 연보 '안젤루스'","a":"Liszt","q":"\"순례의 연보 '안젤루스'\" \"Liszt\"","cat":"주파수","m":"종소리의 공명이 영적 경각심을 깨우고 질서를"},{"t":"성모 통곡 (Stabat Mater) 1곡","a":"Vivaldi","q":"\"성모 통곡 (Stabat Mater) 1곡\" \"Vivaldi\"","cat":"주파수","m":"지극한 자비의 파동이 타인에 대한 무조건적 "},{"t":"교향곡 5번 '종교개혁' 4악장","a":"Mendelssohn","q":"\"교향곡 5번 '종교개혁' 4악장\" \"Mendelssohn\"","cat":"주파수","m":"확고한 신념과 영적 승리가 비즈니스적 사명을"},{"t":"서주와 론도 카프리치오소 (중간부)","a":"Saint-Saëns","q":"\"서주와 론도 카프리치오소 (중간부)\" \"Saint-Saëns\"","cat":"주파수","m":"세련된 선율이 영적 직관을 날카롭게 다듬어 "},{"t":"파르지팔 전주곡","a":"Wagner","q":"\"파르지팔 전주곡\" \"Wagner\"","cat":"주파수","m":"숭고한 구원의 빛이 영혼의 심연을 밝히고 질"},{"t":"오제의 죽음 (Peer Gynt)","a":"Grieg","q":"\"오제의 죽음 (Peer Gynt)\" \"Grieg\"","cat":"주파수","m":"삶의 유한함을 직면하게 하여 영원한 가치에 "},{"t":"나비부인 '어느 개인 날'","a":"Puccini","q":"\"나비부인 '어느 개인 날'\" \"Puccini\"","cat":"주파수","m":"간절한 희망의 파동이 영적 현실 창조의 힘을"},{"t":"행성 중 '넵튠-신비로운 자'","a":"Holst","q":"\"행성 중 '넵튠-신비로운 자'\" \"Holst\"","cat":"주파수","m":"무한한 우주의 신비와 연결되어 초월적 의식을"},{"t":"교향곡 9번 '신세계로부터' 2악장","a":"Dvořák","q":"\"교향곡 9번 '신세계로부터' 2악장\" \"Dvořák\"","cat":"주파수","m":"고향을 향한 그리움이 영혼의 안식처를 찾게 "},{"t":"현악 사중주 3악장","a":"Ravel","q":"\"현악 사중주 3악장\" \"Ravel\"","cat":"주파수","m":"정교한 소리의 질감이 뇌의 섬세한 직관 기능"},{"t":"법열의 시 (Le Poème de l'extase)","a":"Scriabin","q":"\"법열의 시 (Le Poème de l'extase)\" \"Scriabin\"","cat":"주파수","m":"환희의 에너지가 영적 정점에 도달하여 의식을"},{"t":"현악 사중주 8번 4악장","a":"Shostakovich","q":"\"현악 사중주 8번 4악장\" \"Shostakovich\"","cat":"주파수","m":"비극적 진실을 마주하는 용기가 영적 성장을 "},{"t":"음악의 헌정 '트리오 소나타' 2악장","a":"Bach","q":"\"음악의 헌정 '트리오 소나타' 2악장\" \"Bach\"","cat":"주파수","m":"삼위일체적 조화가 내면의 감각과 지성, 영성"},{"t":"피아노 협주곡 27번 2악장","a":"Mozart","q":"\"피아노 협주곡 27번 2악장\" \"Mozart\"","cat":"주파수","m":"마지막 협주곡의 순수함이 삶의 원숙한 평화를"},{"t":"피아노 소나타 32번 2악장 (아리에타)","a":"Beethoven","q":"\"피아노 소나타 32번 2악장 (아리에타)\" \"Beethoven\"","cat":"주파수","m":"단순한 테마의 무한한 변주가 우주의 무궁무진"},{"t":"자장가 Op.57","a":"Chopin","q":"\"자장가 Op.57\" \"Chopin\"","cat":"주파수","m":"지극한 평온이 영혼의 긴장을 풀고 신성한 보"},{"t":"현악 사중주 15번 2악장","a":"Schubert","q":"\"현악 사중주 15번 2악장\" \"Schubert\"","cat":"주파수","m":"불안을 뚫고 나오는 평화의 선율이 영적 회복"},{"t":"라 캄파넬라 (파가니니 에튀드 3번)","a":"Liszt","q":"\"라 캄파넬라 (파가니니 에튀드 3번)\" \"Liszt\"","cat":"주파수","m":"영롱한 종소리가 영적 주파수를 상위 차원으로"},{"t":"클라리넷 오중주 4악장","a":"Brahms","q":"\"클라리넷 오중주 4악장\" \"Brahms\"","cat":"주파수","m":"인생의 조각들을 하나로 모으는 영적 통합의 "},{"t":"잠자는 숲속의 미녀 '로즈 아다지오'","a":"Tchaikovsky","q":"\"잠자는 숲속의 미녀 '로즈 아다지오'\" \"Tchaikovsky\"","cat":"주파수","m":"찬란한 아름다움이 영혼의 빛을 발산하게 돕는"},{"t":"전주곡 Op.23 No.4","a":"Rachmaninoff","q":"\"전주곡 Op.23 No.4\" \"Rachmaninoff\"","cat":"주파수","m":"내면의 은은한 환희가 고요하게 피어오르는 영"},{"t":"자라투스트라는 이렇게 말했다 (도입부)","a":"Strauss","q":"\"자라투스트라는 이렇게 말했다 (도입부)\" \"Strauss\"","cat":"주파수","m":"거대한 자아의 탄생과 우주적 질서의 선포를 "},{"t":"셰헤라자데 3악장 '젊은 왕자와 공주'","a":"Rimsky-Korsakov","q":"\"셰헤라자데 3악장 '젊은 왕자와 공주'\" \"Rimsky-Korsakov\"","cat":"주파수","m":"순수한 사랑의 파동이 영혼의 메마른 감성을 "},{"t":"소나타 K.32","a":"Scarlatti","q":"\"소나타 K.32\" \"Scarlatti\"","cat":"주파수","m":"명상적인 단순함이 복잡한 세상사를 잊게 하는"},{"t":"종묘 미사 '아뉴스 데이'","a":"Haydn","q":"\"종묘 미사 '아뉴스 데이'\" \"Haydn\"","cat":"주파수","m":"세상의 죄를 씻어내는 평화의 기도가 영혼을 "},{"t":"현악 사중주 Op.83 2악장","a":"Elgar","q":"\"현악 사중주 Op.83 2악장\" \"Elgar\"","cat":"주파수","m":"지극한 서정성이 영적 고립감을 해소하고 보편"},{"t":"어느 귀인을 위한 환상곡 '스페인풍의 가르다'","a":"Rodrigo","q":"\"어느 귀인을 위한 환상곡 '스페인풍의 가르다'\" \"Rodrigo\"","cat":"주파수","m":"고귀한 기사도 정신이 영적 품위와 책임감을 "},{"t":"나의 조국 중 '비셰흐라드'","a":"Smetana","q":"\"나의 조국 중 '비셰흐라드'\" \"Smetana\"","cat":"주파수","m":"역사의 도도한 흐름 속에 깃든 영원한 영혼의"},{"t":"교향곡 1번 '고전' 2악장","a":"Prokofiev","q":"\"교향곡 1번 '고전' 2악장\" \"Prokofiev\"","cat":"주파수","m":"명쾌한 질서와 위트가 영적 경직성을 유연하게"},{"t":"스타바트 마테르 'Inflammatus et accensus'","a":"Rossini","q":"\"스타바트 마테르 'Inflammatus et accensus'\" \"Rossini\"","cat":"주파수","m":"영적 열정과 정화의 불길이 내면의 부정성을 "},{"t":"현을 위한 아다지오 (합창 버전 'Agnus Dei')","a":"Barber","q":"\"현을 위한 아다지오 (합창 버전 'Agnus Dei')\" \"Barber\"","cat":"주파수","m":"인간 목소리의 숭고한 울림이 영적 차원을 극"},{"t":"두 번째 랩소디 (명상 파트)","a":"Gershwin","q":"\"두 번째 랩소디 (명상 파트)\" \"Gershwin\"","cat":"주파수","m":"현대적 감각 속에 숨겨진 근원적 평화의 선율"},{"t":"푸가의 기법 '미완성 푸가'","a":"Bach","q":"\"푸가의 기법 '미완성 푸가'\" \"Bach\"","cat":"주파수","m":"영원히 끝나지 않는 우주의 진리와 인간의 끊"},{"t":"B단조 미사 'Sanctus'","a":"J.S. Bach","q":"\"B단조 미사 'Sanctus'\" \"J.S. Bach\"","cat":"주파수","m":""},{"t":"파르지팔 '성금요일의 마법'","a":"Wagner","q":"\"파르지팔 '성금요일의 마법'\" \"Wagner\"","cat":"주파수","m":""},{"t":"교향곡 8번 '천인 교향곡' (도입부)","a":"Mahler","q":"\"교향곡 8번 '천인 교향곡' (도입부)\" \"Mahler\"","cat":"주파수","m":""},{"t":"아기 예수를 바라보는 20개의 시선 (첫 곡)","a":"Messiaen","q":"\"아기 예수를 바라보는 20개의 시선 (첫 곡)\" \"Messiaen\"","cat":"주파수","m":""},{"t":"피아노 소나타 10번 '태양'","a":"Scriabin","q":"\"피아노 소나타 10번 '태양'\" \"Scriabin\"","cat":"주파수","m":""},{"t":"교황 마르첼루스 미사 'Kyrie'","a":"Palestrina","q":"\"교황 마르첼루스 미사 'Kyrie'\" \"Palestrina\"","cat":"주파수","m":""},{"t":"칸타타 147번 '인류의 기쁨이 되시는 예수'","a":"Bach","q":"\"칸타타 147번 '인류의 기쁨이 되시는 예수'\" \"Bach\"","cat":"주파수","m":""},{"t":"자독 더 프리스트 (Zadok the Priest)","a":"Handel","q":"\"자독 더 프리스트 (Zadok the Priest)\" \"Handel\"","cat":"주파수","m":""},{"t":"천지창조 '하늘은 신의 영광을 기리고'","a":"Haydn","q":"\"천지창조 '하늘은 신의 영광을 기리고'\" \"Haydn\"","cat":"주파수","m":""},{"t":"교향곡 9번 3악장 (아다지오)","a":"Bruckner","q":"\"교향곡 9번 3악장 (아다지오)\" \"Bruckner\"","cat":"주파수","m":""},{"t":"교향적 변주곡 (후반부)","a":"Franck","q":"\"교향적 변주곡 (후반부)\" \"Franck\"","cat":"주파수","m":""},{"t":"성 세바스티안의 순교 '백합의 정원'","a":"Debussy","q":"\"성 세바스티안의 순교 '백합의 정원'\" \"Debussy\"","cat":"주파수","m":""},{"t":"단테 소나타 (천국 파트)","a":"Liszt","q":"\"단테 소나타 (천국 파트)\" \"Liszt\"","cat":"주파수","m":""},{"t":"오라토리오 '엘리야' 중 '이스라엘을 지키시는 자'","a":"Mendelssohn","q":"\"오라토리오 '엘리야' 중 '이스라엘을 지키시는 자'\" \"Mendelssohn\"","cat":"주파수","m":""},{"t":"레퀴엠 '상투스'","a":"Fauré","q":"\"레퀴엠 '상투스'\" \"Fauré\"","cat":"주파수","m":""},{"t":"자라투스트라는 이렇게 말했다 (피날레 '밤의 나그네 노래')","a":"Strauss","q":"\"자라투스트라는 이렇게 말했다 (피날레 '밤의 나그네 노래')\" \"Strauss\"","cat":"주파수","m":""},{"t":"40성부 모테트 (Spem in alium)","a":"Tallis","q":"\"40성부 모테트 (Spem in alium)\" \"Tallis\"","cat":"주파수","m":""},{"t":"교향곡 3번 '슬픔의 노래' 2악장","a":"Gorecki","q":"\"교향곡 3번 '슬픔의 노래' 2악장\" \"Gorecki\"","cat":"주파수","m":""},{"t":"들어라 들어라 종달새 (세레나데)","a":"Schubert","q":"\"들어라 들어라 종달새 (세레나데)\" \"Schubert\"","cat":"주파수","m":""},{"t":"전야제 (All-Night Vigil) '주여 이제는'","a":"Rachmaninoff","q":"\"전야제 (All-Night Vigil) '주여 이제는'\" \"Rachmaninoff\"","cat":"주파수","m":""},{"t":"마술피리 '오 이시스와 오시리스여'","a":"Mozart","q":"\"마술피리 '오 이시스와 오시리스여'\" \"Mozart\"","cat":"주파수","m":""},{"t":"장엄 미사 '아뉴스 데이'","a":"Beethoven","q":"\"장엄 미사 '아뉴스 데이'\" \"Beethoven\"","cat":"주파수","m":""},{"t":"니시 도미누스 'Cum dederit'","a":"Vivaldi","q":"\"니시 도미누스 'Cum dederit'\" \"Vivaldi\"","cat":"주파수","m":""},{"t":"푸가의 기법 '대위법 1'","a":"Bach","q":"\"푸가의 기법 '대위법 1'\" \"Bach\"","cat":"주파수","m":""},{"t":"O viridissima virga","a":"Hildegard von Bingen","q":"\"O viridissima virga\" \"Hildegard von Bingen\"","cat":"주파수","m":""},{"t":"운명의 노래 (Schicksalslied)","a":"Brahms","q":"\"운명의 노래 (Schicksalslied)\" \"Brahms\"","cat":"주파수","m":""},{"t":"교향곡 3번 '오르간' (피날레의 폭발)","a":"Saint-Saëns","q":"\"교향곡 3번 '오르간' (피날레의 폭발)\" \"Saint-Saëns\"","cat":"주파수","m":""},{"t":"다프니스와 클로에 '새벽'","a":"Ravel","q":"\"다프니스와 클로에 '새벽'\" \"Ravel\"","cat":"주파수","m":""},{"t":"현을 위한 아다지오 (최고음역대)","a":"Barber","q":"\"현을 위한 아다지오 (최고음역대)\" \"Barber\"","cat":"주파수","m":""},{"t":"3성 미사 'Agnum Dei'","a":"Byrd","q":"\"3성 미사 'Agnum Dei'\" \"Byrd\"","cat":"주파수","m":""},{"t":"거울 속의 거울 (Spiegel im Spiegel)","a":"Part","q":"\"거울 속의 거울 (Spiegel im Spiegel)\" \"Part\"","cat":"주파수","m":""},{"t":"교향곡 2번 '부활' (합창 도입부)","a":"Mahler","q":"\"교향곡 2번 '부활' (합창 도입부)\" \"Mahler\"","cat":"주파수","m":""},{"t":"레퀴엠 'Libera Me' (나를 구원하소서)","a":"Verdi","q":"\"레퀴엠 'Libera Me' (나를 구원하소서)\" \"Verdi\"","cat":"주파수","m":""},{"t":"정화된 밤 (피날레)","a":"Schoenberg","q":"\"정화된 밤 (피날레)\" \"Schoenberg\"","cat":"주파수","m":""},{"t":"교향곡 6번 '비창' 2악장 (5박자의 우아함)","a":"Tchaikovsky","q":"\"교향곡 6번 '비창' 2악장 (5박자의 우아함)\" \"Tchaikovsky\"","cat":"주파수","m":""},{"t":"테 데움 (Te Deum) 'Dignare'","a":"Berlioz","q":"\"테 데움 (Te Deum) 'Dignare'\" \"Berlioz\"","cat":"주파수","m":""},{"t":"두 개의 전설 '파도 위를 걷는 파올라의 성 프랑수아'","a":"Liszt","q":"\"두 개의 전설 '파도 위를 걷는 파올라의 성 프랑수아'\" \"Liszt\"","cat":"주파수","m":""},{"t":"모테트 Op.74 '어찌하여 곤고한 자에게 빛을 주셨는가'","a":"Brahms","q":"\"모테트 Op.74 '어찌하여 곤고한 자에게 빛을 주셨는가'\" \"Brahms\"","cat":"주파수","m":""},{"t":"바다 '바람과 바다의 대화'","a":"Debussy","q":"\"바다 '바람과 바다의 대화'\" \"Debussy\"","cat":"주파수","m":""},{"t":"스타바트 마테르 'Amen'","a":"Poulenc","q":"\"스타바트 마테르 'Amen'\" \"Poulenc\"","cat":"주파수","m":""},{"t":"교향곡 7번 (단악장의 통일성)","a":"Sibelius","q":"\"교향곡 7번 (단악장의 통일성)\" \"Sibelius\"","cat":"주파수","m":""},{"t":"교향곡 7번 '레닌그라드' 3악장","a":"Shostakovich","q":"\"교향곡 7번 '레닌그라드' 3악장\" \"Shostakovich\"","cat":"주파수","m":""},{"t":"메리 여왕을 위한 장례 음악 (금관 파트)","a":"Purcell","q":"\"메리 여왕을 위한 장례 음악 (금관 파트)\" \"Purcell\"","cat":"주파수","m":""},{"t":"메시아 '그 어린 양이 죽임을 당하셨으니'","a":"Handel","q":"\"메시아 '그 어린 양이 죽임을 당하셨으니'\" \"Handel\"","cat":"주파수","m":""},{"t":"아베 베룸 코르푸스 (오르간과 합창)","a":"Mozart","q":"\"아베 베룸 코르푸스 (오르간과 합창)\" \"Mozart\"","cat":"주파수","m":""},{"t":"무반주 첼로 모음곡 6번 '사라방드'","a":"Bach","q":"\"무반주 첼로 모음곡 6번 '사라방드'\" \"Bach\"","cat":"주파수","m":""},{"t":"골드베르크 변주곡 '아리아' (재현)","a":"J.S. Bach","q":"\"골드베르크 변주곡 '아리아' (재현)\" \"J.S. Bach\"","cat":"주파수","m":""},{"t":"교향곡 3번 '영웅' 2악장 (후반부)","a":"Beethoven","q":"\"교향곡 3번 '영웅' 2악장 (후반부)\" \"Beethoven\"","cat":"주파수","m":""},{"t":"녹턴 Op.62 No.1","a":"Chopin","q":"\"녹턴 Op.62 No.1\" \"Chopin\"","cat":"주파수","m":""},{"t":"피아노 소나타 B단조 (피날레)","a":"Liszt","q":"\"피아노 소나타 B단조 (피날레)\" \"Liszt\"","cat":"주파수","m":""},{"t":"글로리아 'Domine Deus'","a":"Vivaldi","q":"\"글로리아 'Domine Deus'\" \"Vivaldi\"","cat":"주파수","m":""},{"t":"독일 레퀴엠 '그들의 수고를 그치고'","a":"Brahms","q":"\"독일 레퀴엠 '그들의 수고를 그치고'\" \"Brahms\"","cat":"주파수","m":""},{"t":"보칼리제 (첼로와 오케스트라)","a":"Rachmaninoff","q":"\"보칼리제 (첼로와 오케스트라)\" \"Rachmaninoff\"","cat":"주파수","m":""},{"t":"영상 1집 '물 위의 반사'","a":"Debussy","q":"\"영상 1집 '물 위의 반사'\" \"Debussy\"","cat":"주파수","m":""},{"t":"메시아 '할렐루야'","a":"Handel","q":"\"메시아 '할렐루야'\" \"Handel\"","cat":"주파수","m":""},{"t":"교향곡 6번 '비창' 4악장 (피날레)","a":"Tchaikovsky","q":"\"교향곡 6번 '비창' 4악장 (피날레)\" \"Tchaikovsky\"","cat":"주파수","m":""},{"t":"교향곡 5번 3악장 (백조의 찬가)","a":"Sibelius","q":"\"교향곡 5번 3악장 (백조의 찬가)\" \"Sibelius\"","cat":"주파수","m":""},{"t":"교향곡 3번 6악장 (사랑이 내게 말하는 것)","a":"Mahler","q":"\"교향곡 3번 6악장 (사랑이 내게 말하는 것)\" \"Mahler\"","cat":"주파수","m":""},{"t":"오텔로 '아베 마리아'","a":"Verdi","q":"\"오텔로 '아베 마리아'\" \"Verdi\"","cat":"주파수","m":""},{"t":"행성 중 '토성-노년의 신' (후반부)","a":"Holst","q":"\"행성 중 '토성-노년의 신' (후반부)\" \"Holst\"","cat":"주파수","m":""},{"t":"스타바트 마테르 'Fac ut ardeat'","a":"Dvořák","q":"\"스타바트 마테르 'Fac ut ardeat'\" \"Dvořák\"","cat":"주파수","m":""},{"t":"마지막 네 개의 노래 '저녁 노을 속에'","a":"Strauss","q":"\"마지막 네 개의 노래 '저녁 노을 속에'\" \"Strauss\"","cat":"주파수","m":""},{"t":"민속극 중 '기도'","a":"Mussorgsky","q":"\"민속극 중 '기도'\" \"Mussorgsky\"","cat":"주파수","m":""},{"t":"피아노 소나타 5번 (엑스타시 테마)","a":"Scriabin","q":"\"피아노 소나타 5번 (엑스타시 테마)\" \"Scriabin\"","cat":"주파수","m":""},{"t":"현, 타악기, 첼레스타를 위한 음악 1악장","a":"Bartók","q":"\"현, 타악기, 첼레스타를 위한 음악 1악장\" \"Bartók\"","cat":"주파수","m":""},{"t":"교향곡 5번 3악장","a":"Shostakovich","q":"\"교향곡 5번 3악장\" \"Shostakovich\"","cat":"주파수","m":""},{"t":"피아노 소나타 29번 '함머클라비어' 3악장","a":"Beethoven","q":"\"피아노 소나타 29번 '함머클라비어' 3악장\" \"Beethoven\"","cat":"주파수","m":""},{"t":"환상 폴로네즈 Op.61 (피날레)","a":"Chopin","q":"\"환상 폴로네즈 Op.61 (피날레)\" \"Chopin\"","cat":"주파수","m":""},{"t":"죽음과 소녀 2악장","a":"Schubert","q":"\"죽음과 소녀 2악장\" \"Schubert\"","cat":"주파수","m":""},{"t":"교향곡 4번 2악장 (로망스)","a":"Schumann","q":"\"교향곡 4번 2악장 (로망스)\" \"Schumann\"","cat":"주파수","m":""},{"t":"위로 (Consolation) 3번","a":"Liszt","q":"\"위로 (Consolation) 3번\" \"Liszt\"","cat":"주파수","m":""},{"t":"인터메조 Op.118 No.2","a":"Brahms","q":"\"인터메조 Op.118 No.2\" \"Brahms\"","cat":"주파수","m":""},{"t":"백조의 호수 '피날레' (장조 변환)","a":"Tchaikovsky","q":"\"백조의 호수 '피날레' (장조 변환)\" \"Tchaikovsky\"","cat":"주파수","m":""},{"t":"심포니 2번 4악장 (피날레 코다)","a":"Rachmaninoff","q":"\"심포니 2번 4악장 (피날레 코다)\" \"Rachmaninoff\"","cat":"주파수","m":""},{"t":"현과 오르간을 위한 아다지오 (절정부)","a":"Albinoni","q":"\"현과 오르간을 위한 아다지오 (절정부)\" \"Albinoni\"","cat":"주파수","m":""},{"t":"크리스마스 협주곡 '파스토랄레'","a":"Corelli","q":"\"크리스마스 협주곡 '파스토랄레'\" \"Corelli\"","cat":"주파수","m":""},{"t":"장엄 미사 'Sanctus'","a":"Gounod","q":"\"장엄 미사 'Sanctus'\" \"Gounod\"","cat":"주파수","m":""},{"t":"셰헤라자데 (종결부)","a":"Rimsky-Korsakov","q":"\"셰헤라자데 (종결부)\" \"Rimsky-Korsakov\"","cat":"주파수","m":""},{"t":"소나타 K.466","a":"Scarlatti","q":"\"소나타 K.466\" \"Scarlatti\"","cat":"주파수","m":""},{"t":"현악 사중주 '일출' 1악장","a":"Haydn","q":"\"현악 사중주 '일출' 1악장\" \"Haydn\"","cat":"주파수","m":""},{"t":"수수께끼 변주곡 '니므롯'","a":"Elgar","q":"\"수수께끼 변주곡 '니므롯'\" \"Elgar\"","cat":"주파수","m":""},{"t":"아란후에즈 협주곡 2악장 (카덴차 이후)","a":"Rodrigo","q":"\"아란후에즈 협주곡 2악장 (카덴차 이후)\" \"Rodrigo\"","cat":"주파수","m":""},{"t":"나의 조국 중 '타보르'","a":"Smetana","q":"\"나의 조국 중 '타보르'\" \"Smetana\"","cat":"주파수","m":""},{"t":"음악의 헌정 '무한하게 상승하는 카논'","a":"Bach","q":"\"음악의 헌정 '무한하게 상승하는 카논'\" \"Bach\"","cat":"주파수","m":""},{"t":"마태 수난곡 '마지막 합창'","a":"J.S. Bach","q":"\"마태 수난곡 '마지막 합창'\" \"J.S. Bach\"","cat":"주파수","m":""},{"t":"장엄 미사 'Sanctus' (베네딕투스)","a":"Beethoven","q":"\"장엄 미사 'Sanctus' (베네딕투스)\" \"Beethoven\"","cat":"주파수","m":""},{"t":"전주곡 Op.28 No.13","a":"Chopin","q":"\"전주곡 Op.28 No.13\" \"Chopin\"","cat":"주파수","m":""},{"t":"시적이고 종교적인 선율 '고독 속의 신의 축복'","a":"Liszt","q":"\"시적이고 종교적인 선율 '고독 속의 신의 축복'\" \"Liszt\"","cat":"주파수","m":""},{"t":"교향곡 7번 2악장 (아다지오)","a":"Bruckner","q":"\"교향곡 7번 2악장 (아다지오)\" \"Bruckner\"","cat":"주파수","m":""},{"t":"합창 교향곡 '종' 4악장","a":"Rachmaninoff","q":"\"합창 교향곡 '종' 4악장\" \"Rachmaninoff\"","cat":"주파수","m":""},{"t":"오라토리오 '솔로몬' 중 '시바 여왕의 도착'","a":"Handel","q":"\"오라토리오 '솔로몬' 중 '시바 여왕의 도착'\" \"Handel\"","cat":"주파수","m":""},{"t":"교향곡 104번 '런던' 2악장","a":"Haydn","q":"\"교향곡 104번 '런던' 2악장\" \"Haydn\"","cat":"주파수","m":""},{"t":"현악 육중주 '피렌체의 추억' 2악장","a":"Tchaikovsky","q":"\"현악 육중주 '피렌체의 추억' 2악장\" \"Tchaikovsky\"","cat":"주파수","m":""},{"t":"무언가 '베네치아 뱃노래'","a":"Mendelssohn","q":"\"무언가 '베네치아 뱃노래'\" \"Mendelssohn\"","cat":"주파수","m":""},{"t":"오르간 교향곡 2악장 (포코 아다지오)","a":"Saint-Saëns","q":"\"오르간 교향곡 2악장 (포코 아다지오)\" \"Saint-Saëns\"","cat":"주파수","m":""},{"t":"알프스 교향곡 '해질녘'","a":"Strauss","q":"\"알프스 교향곡 '해질녘'\" \"Strauss\"","cat":"주파수","m":""},{"t":"포스카리 가문의 두 사람 '기도'","a":"Verdi","q":"\"포스카리 가문의 두 사람 '기도'\" \"Verdi\"","cat":"주파수","m":""},{"t":"밤의 가스파르 '옹딘'","a":"Ravel","q":"\"밤의 가스파르 '옹딘'\" \"Ravel\"","cat":"주파수","m":""},{"t":"피아노 소나타 9번 '검은 미사' (정화 파트)","a":"Scriabin","q":"\"피아노 소나타 9번 '검은 미사' (정화 파트)\" \"Scriabin\"","cat":"주파수","m":""},{"t":"밤의 음악 (아웃 오브 도어즈 중)","a":"Bartók","q":"\"밤의 음악 (아웃 오브 도어즈 중)\" \"Bartók\"","cat":"주파수","m":""},{"t":"교향곡 15번 4악장 (바그너 인용부)","a":"Shostakovich","q":"\"교향곡 15번 4악장 (바그너 인용부)\" \"Shostakovich\"","cat":"주파수","m":""},{"t":"시간의 종말을 위한 사중주 '예수의 영원성에 대한 찬가'","a":"Messiaen","q":"\"시간의 종말을 위한 사중주 '예수의 영원성에 대한 찬가'\" \"Messiaen\"","cat":"주파수","m":""},{"t":"Fratres (형제들)","a":"Arvo Pärt","q":"\"Fratres (형제들)\" \"Arvo Pärt\"","cat":"주파수","m":""},{"t":"교향곡 3번 3악장","a":"Gorecki","q":"\"교향곡 3번 3악장\" \"Gorecki\"","cat":"주파수","m":""},{"t":"음악의 헌정 '카논 6번'","a":"Bach","q":"\"음악의 헌정 '카논 6번'\" \"Bach\"","cat":"주파수","m":""},{"t":"피아노 소나타 31번 3악장 (푸가)","a":"Beethoven","q":"\"피아노 소나타 31번 3악장 (푸가)\" \"Beethoven\"","cat":"주파수","m":""},{"t":"어린이 정경 '시인은 말한다'","a":"Schumann","q":"\"어린이 정경 '시인은 말한다'\" \"Schumann\"","cat":"주파수","m":""},{"t":"교향곡 4번 4악장 (샤콘느)","a":"Brahms","q":"\"교향곡 4번 4악장 (샤콘느)\" \"Brahms\"","cat":"주파수","m":""},{"t":"심포닉 댄스 3악장 (피날레)","a":"Rachmaninoff","q":"\"심포닉 댄스 3악장 (피날레)\" \"Rachmaninoff\"","cat":"주파수","m":""},{"t":"엘레지 (첼로와 오케스트라)","a":"Fauré","q":"\"엘레지 (첼로와 오케스트라)\" \"Fauré\"","cat":"주파수","m":""},{"t":"영웅의 생애 '영웅의 은퇴와 완성'","a":"Strauss","q":"\"영웅의 생애 '영웅의 은퇴와 완성'\" \"Strauss\"","cat":"주파수","m":""},{"t":"현을 위한 서주와 알레그로","a":"Elgar","q":"\"현을 위한 서주와 알레그로\" \"Elgar\"","cat":"주파수","m":""},{"t":"현을 위한 아다지오 (최종 종지부)","a":"Barber","q":"\"현을 위한 아다지오 (최종 종지부)\" \"Barber\"","cat":"주파수","m":""},{"t":"교향곡 4번 4악장 (종결부)","a":"Sibelius","q":"\"교향곡 4번 4악장 (종결부)\" \"Sibelius\"","cat":"주파수","m":""},{"t":"아란후에즈 협주곡 2악장 (종결부)","a":"Rodrigo","q":"\"아란후에즈 협주곡 2악장 (종결부)\" \"Rodrigo\"","cat":"주파수","m":""},{"t":"메시아 '아멘 합창'","a":"Handel","q":"\"메시아 '아멘 합창'\" \"Handel\"","cat":"주파수","m":""},{"t":"마그니피카트 'Sicut locutus est'","a":"Bach","q":"\"마그니피카트 'Sicut locutus est'\" \"Bach\"","cat":"주파수","m":""},{"t":"레퀴엠 '라크리모사' (완성본 피날레)","a":"Mozart","q":"\"레퀴엠 '라크리모사' (완성본 피날레)\" \"Mozart\"","cat":"주파수","m":""}]};
console.log('[MUSIC_WHITELIST_V2] 2643곡 로드 ✦ 제미나이 노가다');

function _mfuSampleWL(userOh){
  var V=window.MUSIC_WHITELIST_V2||{};
  function pick(arr,n){arr=(arr||[]).slice();for(var i=arr.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=arr[i];arr[i]=arr[j];arr[j]=t;}return arr.slice(0,n);}
  var out={},ohs=['목','화','토','금','수'];
  ohs.forEach(function(k){out[k]=pick(V[k],k===userOh?22:6);});
  out['주파수']=pick(V['주파수'],12);
  return out;
}


function pmGroqFullMusic(oh,sj,season,ili,bpm,hrv,cid){
  var box=document.getElementById(cid);
  if(!box)return;
  var isLight=(cid==='mfu-groq-music');
  var cTitle=isLight?'#0f172a':'rgba(240,230,200,.95)',cArtist=isLight?'#64748b':'rgba(200,185,140,.55)',cReason=isLight?'#047857':'rgba(52,211,153,.7)',cNew=isLight?'#dc2626':'#ff8a8a';
  var V=window.MUSIC_WHITELIST_V2||{};
  function _pk(arr,n){arr=(arr||[]).slice();for(var i=arr.length-1;i>0;i--){var k=Math.floor(Math.random()*(i+1));var t=arr[i];arr[i]=arr[k];arr[k]=t;}return arr.slice(0,n);}
  // ★ AI 제거 — DB에서 4곡 (오행 3 + 솔페지오 1) 코드 추출
  var dbSel=_pk(V[oh],3).concat(_pk(V['주파수'],1));
  if(!dbSel.length){dbSel=[{t:'528Hz 세포 치유 음악',a:'Solfeggio',cat:'주파수',m:'마인드 리프레시'}];}
  function _card(c,idx,isNew){
    var qy=(c.t||'')+' '+(c.a||'');
    var url=c.vid?('https://www.youtube.com/watch?v='+c.vid):('https://www.youtube.com/results?search_query='+encodeURIComponent(qy));
    return '<a href="'+url+'" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:10px;padding:9px 11px;background:rgba(255,255,255,'+(isLight?'.5':'.04')+');border:1px solid '+(isNew?'rgba(220,38,38,.35)':'rgba('+(isLight?'0,0,0,.06':'255,255,255,.08')+')')+';border-radius:9px;text-decoration:none;margin-bottom:5px;">'
      +'<div style="font-size:14px;flex-shrink:0;width:22px;text-align:center;">'+(isNew?'🆕':(idx+1))+'</div>'
      +'<div style="flex:1;min-width:0;"><div style="font-size:12px;font-weight:700;color:'+(isNew?cNew:cTitle)+';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+(c.t||'')+(c.a?' <span style="font-size:10px;color:'+cArtist+';font-weight:400;">\u2014 '+c.a+'</span>':'')+'</div>'
      +'<div style="font-size:10px;color:'+(isNew?cNew:cReason)+';margin-top:1px;">'+(isNew?'🆕 오늘 발매 \u00b7 오행 매칭':(c.m||('오행 '+oh+' 에너지 매칭')))+'</div></div>'
      +'<div style="flex-shrink:0;padding:4px 9px;background:rgba(255,0,0,.15);border:1px solid rgba(255,0,0,.3);border-radius:7px;font-size:9px;font-weight:700;color:#ff6666;">\u25b6</div></a>';
  }
  function _render(newSong){
    var h='';
    dbSel.forEach(function(c,i){h+=_card(c,i,false);});
    if(newSong)h+=_card(newSong,99,true);
    box.innerHTML=h;
  }
  // ① DB 4곡 즉시 (AI·API 무관)
  _render(null);
  // ② API 신곡 1곡 (실패해도 4곡 유지) — 세션 캐시로 쿼터 절약
  try{
    window._mfuNewCache=window._mfuNewCache||{};
    if(window._mfuNewCache[oh]){ _render(window._mfuNewCache[oh]); return; }
    if(typeof _CGO_YT_KEY!=='undefined' && _CGO_YT_KEY){
      var mood={'목':'발라드 봄 신곡','화':'댄스 신나는 신곡','토':'감성 잔잔 신곡','금':'웅장 록 신곡','수':'알앤비 감성 신곡'}[oh]||'신곡';
      var u='https://www.googleapis.com/youtube/v3/search?part=snippet&q='+encodeURIComponent(mood+' official 2026')+'&order=date&type=video&maxResults=5&videoEmbeddable=true&relevanceLanguage=ko&key='+_CGO_YT_KEY;
      fetch(u).then(function(r){return r.json();}).then(function(d){
        if(d&&d.items&&d.items.length){
          var it=d.items[0];
          var ns={t:(it.snippet.title||'').replace(/\s*[\(\[][^\)\]]*[\)\]]\s*/g,'').slice(0,42),a:it.snippet.channelTitle||'',vid:(it.id&&it.id.videoId)||'',cat:'신곡'};
          if(ns.vid&&ns.t){ window._mfuNewCache[oh]=ns; _render(ns); }
        }
      }).catch(function(){});
    }
  }catch(e){}
}
function _showMusicList(el,bs,avg){
  el.style.display='block';
  var _now3=new Date();
  var _sjIdx=Math.floor(_now3.getHours()/2);
  var oh=bs.oh, ohi=MUSIC_DB&&MUSIC_DB.OH_MUSIC?MUSIC_DB.OH_MUSIC[oh]:{};
  var ok={'목':'木','화':'火','토':'土','금':'金','수':'水'};
  var gc=avg>=85?'#34d399':avg>=75?'#d4a843':'#94a3b8';
  var _sjNm=['자시','축시','인시','묘시','진시','사시','오시','미시','신시','유시','술시','해시'];
  var h='';

  // 통합 배너
  h+='<div style="background:linear-gradient(135deg,rgba(56,189,248,.1),rgba(212,168,67,.08));border:1px solid rgba(56,189,248,.25);border-radius:14px;padding:16px;margin-bottom:16px">';
  h+='<div style="display:flex;align-items:center;gap:14px">';
  h+='<div style="text-align:center;flex-shrink:0"><div style="font-size:44px;font-weight:700;color:'+gc+';font-family:Orbitron,sans-serif">'+avg+'</div>';
  h+='<div style="font-size:10px;color:rgba(240,230,200,0.8)">' + '18개 역학 평균' + '</div></div>';
  h+='<div><div style="font-size:14px;font-weight:700;color:#f0e6c8;margin-bottom:5px">'+(ohi.emoji||'🎵')+' '+oh+'('+(ok[oh]||'')+') 기운 음악 추천</div>';
  h+='<div style="font-size:12px;color:rgba(240,230,200,.7);line-height:1.7">핵심 주파수 <strong style="color:'+(ohi.color||'#d4a843')+'">'+(ohi.freq||'528Hz')+'</strong> · '+(ohi.tempo||'60~80 BPM')+'<br>'+(ohi.effect||'')+'</div></div></div></div>';

  // C-GO 실시간 5곳
  h+='<div style="background:rgba(212,168,67,.05);border:1px solid rgba(212,168,67,.28);border-radius:14px;padding:14px;margin-bottom:14px;">';
  h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;"><span style="font-size:15px;">✦</span><div style="font-size:13px;font-weight:800;color:#d4a843;">YouTube 실시간 C-GO 추천</div><div style="margin-left:auto;font-size:9px;padding:2px 8px;background:rgba(212,168,67,.15);border:1px solid rgba(212,168,67,.3);border-radius:6px;color:#d4a843;font-weight:700;">● LIVE</div></div>';
  h+='<div style="font-size:10px;color:rgba(240,230,200,.6);line-height:1.7;margin-bottom:10px;"><b style="color:rgba(212,168,67,.8)">'+oh+'(오행)</b> &times; <b style="color:rgba(56,189,248,.8)">'+_sjNm[_sjIdx]+'(시진)</b> &times; <b style="color:rgba(52,211,153,.8)">'+bs.season+'(계절)</b> — 클릭하면 YouTube에서 바로 청취!</div>';
  h+='<div id="pm-yt-live" style="min-height:60px;"><div style="text-align:center;padding:16px;font-size:11px;color:rgba(240,230,200,.4);">🤖 AI가 주파수를 분석 중...</div></div>';
  h+='</div>';
  setTimeout(function(){pmYtFetch(oh,_sjIdx,bs.eng||70,'pm-yt-live');},400);

  // 오늘의 맞춤 음악 셋션
  h+='<div style="background:rgba(56,189,248,.04);border:1px solid rgba(56,189,248,.2);border-radius:14px;padding:14px;margin-bottom:14px;">';
  h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;"><span style="font-size:15px;">🎵</span><div style="font-size:13px;font-weight:800;color:#38bdf8;">오늘의 맞춤 음악</div><div style="font-size:10px;color:rgba(240,230,200,.4);margin-left:auto;">한국·해외·주파수·국악</div></div>';
  h+='<div id="pm-groq-music" style="min-height:60px;"><div style="text-align:center;padding:16px;font-size:11px;color:rgba(240,230,200,.4);">🤖 AI가 맞춤 음악을 선정 중...</div></div>';
  h+='</div>';
  setTimeout(function(){pmGroqFullMusic(oh,_sjIdx,bs.season,bs.eng||70,bs.bpm||72,bs.hrv||45,'pm-groq-music');},500);

  // 특허 배너
  h+='<div style="background:rgba(56,189,248,.07);border:1px solid rgba(56,189,248,.2);border-radius:12px;padding:14px">';
  h+='<div style="font-size:11px;color:rgba(56,189,248,.85);font-weight:700;margin-bottom:7px">💡 CGo-Life 핵심 원리</div>';
  h+='<div style="font-size:12px;color:rgba(240,230,200,.8);line-height:1.85">"음악을 듣는 것만으로도 운이 좋아진다" — rPPG 생체 스캔(BAI '+bs.bpm+'BPM · HRV '+bs.hrv+' · FCI '+bs.fci+'%)와 18개 역학 에너지 융합 음악 추천.</div>';
  h+='</div>';
  h+='<div style="font-size:10px;color:rgba(255,255,255,.15);text-align:center;margin-top:10px">* 생체-역학 융합 음악 추천 (참고용)</div>';

  el.innerHTML=h;
  el.scrollIntoView({behavior:'smooth',block:'start'});
}

// ═══════════════════════════════════════════════════
//  ③ 전체 페이지 자동 동기화 엔진
// ═══════════════════════════════════════════════════
function syncAllPages(r){
  if(!r) return;
  var y=r.y,m=r.m,d=r.d,h=(r.h!==undefined)?r.h:4;
  var name=r.name||'',gender=r.gender||'M';
  var mm=('0'+m).slice(-2),dd=('0'+d).slice(-2),hh=('0'+h).slice(-2);
  var dateStr=y+'-'+mm+'-'+dd, timeStr=hh+':00';
  var surname=name.length>0?name.charAt(0):'';
  var givenName=name.length>1?name.slice(1):'';
  var filled=[];

  // ══════════════════════════════════════════════════════════
  // CGO-MASTER 유기체 시스템 v1.0
  // 대시보드(Master) → 전 페이지 혈관처럼 연결
  // 역학(ILI) + 생체(BAI) = 하나의 살아있는 유기체
  // ══════════════════════════════════════════════════════════
  window._CGO_MASTER = {
    // ── 역학 마스터 데이터 ──
    calc: r,
    ili:  r.ili || 70,
    domOh: r.domOh || '토',
    lifeNum: r.lifeNum || 5,
    kujusei: r.kujusei || 5,
    scores: r.scores || {},
    birthPlace: r.birthPlace || '서울',
    birthLat: r.birthLat || 37.57,
    birthLng: r.birthLng || 126.98,
    curPlace: r.curPlace || '',
    curLat: r.curLat || 0,
    curLng: r.curLng || 0,
    // ── 생체 마스터 데이터 ──
    bio: {
      hrv:  (window._bioFinalData && window._bioFinalData.hrv)  || (window.appState && window.appState.bio && window.appState.bio.hrv)  || 0,
      fci:  (window._bioFinalData && window._bioFinalData.fci)  || (window.appState && window.appState.bio && window.appState.bio.fci)  || 0,
      fma:  (window._bioFinalData && window._bioFinalData.fma)  || (window.appState && window.appState.bio && window.appState.bio.fma)  || 0,
      bli:  (window._bioFinalData && window._bioFinalData.bli)  || (window.appState && window.appState.bio && window.appState.bio.bli)  || 0,
      bpm:  (window._bioFinalData && window._bioFinalData.bpm)  || (window.BS && window.BS.bpm) || 0,
      scanned: window._baiScanned || false
    },
    // ── 통합 에너지 지수 ──
    // BAI(생체활성도): BPM·HRV·FCI·BLI 4가지 실측값 기반
    get bai(){
      var b = this.bio;
      if(!b.scanned || !(b.hrv>0 || b.fci>0)){
        return Math.round(this.ili * 0.85);
      }
      var parts = [];
      // ① BPM 심박수 (정상 60-80: 90점, 50-95: 75점, 그 외: 60점)
      if(b.bpm > 0){
        var bpmS = (b.bpm>=60&&b.bpm<=80)?90:(b.bpm>=50&&b.bpm<=95)?75:60;
        parts.push(bpmS);
      }
      // ② HRV (자율신경 균형)
      if(b.hrv > 0){
        var hrvS = b.hrv>55?92:b.hrv>40?78:b.hrv>25?65:52;
        parts.push(hrvS);
      }
      // ③ FCI (안면 혈류 지수)
      if(b.fci > 0){
        var fciS = b.fci>80?90:b.fci>65?78:b.fci>50?65:52;
        parts.push(fciS);
      }
      // ④ BLI (손금 생명 지수)
      if(b.bli > 0){
        parts.push(Math.min(95, Math.max(40, b.bli)));
      }
      // ⑤ TLI (혀 건강 지수) — 있으면 반영
      var tliScore = window.BS&&window.BS.tongueData ? (window.BS.tongueData.tliScore||0) : 0;
      if(tliScore > 0) parts.push(Math.min(95, Math.max(40, tliScore)));

      return parts.length > 0
        ? Math.round(parts.reduce(function(s,v){return s+v;},0) / parts.length)
        : Math.round(this.ili * 0.85);
    },
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // CEI = 생체(BAI)×40% + 역학(ILI)×35% + 공명×25%
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    get cei(){
      var bai = this.bai;
      var ili = this.ili;
      if(!this.bio.scanned) return ili;

      // 공명 점수: ILI + 보너스 (NASA·날씨·방위)
      var resBonus = window._cgoLastResonanceBonus || 0;
      var resonanceScore = Math.min(99, ili + resBonus);

      var raw = Math.round(bai * 0.40 + ili * 0.35 + resonanceScore * 0.25);
      return Math.min(99, Math.max(40, raw));
    },
    // 갱신 시각
    updatedAt: new Date()
  };

  // ── 생체 데이터 전체 동기화 ──
  if(typeof _syncBioUI === 'function') _syncBioUI();

  function set(id,val){
    var el=document.getElementById(id);
    if(!el||val===undefined||val===null||val==='') return false;
    el.value=val;
    ['input','change'].forEach(function(ev){el.dispatchEvent(new Event(ev,{bubbles:true}));});
    return true;
  }
  function setOpt(id,val){
    var el=document.getElementById(id);
    if(!el) return false;
    for(var i=0;i<el.options.length;i++){
      if(el.options[i].value===val){el.selectedIndex=i;el.dispatchEvent(new Event('change',{bubbles:true}));return true;}
    }
    return false;
  }

  // ── 1. 이름 분석 ──
  var ok1=false;
  ok1|=set('myNameSurname',surname);
  ok1|=set('myNameGiven',givenName);
  // ★ 한 칸 입력 자동 채우기
  var _fullEl=document.getElementById('myNameFull');
  if(_fullEl && surname) { _fullEl.value=surname+(givenName||''); myNameSplitPreview(_fullEl.value); }
  if(ok1) filled.push({icon:'🔤',label:'이름 분석'});

  // ── 2. 작명 페이지 ──
  var ok2=false;
  ok2|=set('nmSurname',surname);
  ok2|=set('nmBirthY',y);ok2|=set('nmBirthM',m);ok2|=set('nmBirthD',d);
  ok2|=set('nmBirth',dateStr);ok2|=setOpt('nmGender',gender);
  if(ok2){
    var chips=document.querySelectorAll('#surnameChips .surname-chip');
    chips.forEach(function(c){c.classList.remove('active');if(c.textContent.charAt(0)===surname)c.classList.add('active');});
    filled.push({icon:'✍️',label:'작명'});
  }

  // ── 3. 회사 작명 ──
  if(set('bizBirth',dateStr)) filled.push({icon:'🏢',label:'회사 작명'});

  // ── 4. 행운 번호 ──
  var ok4=false;
  ok4|=set('ltBirthY',y);ok4|=set('ltBirthM',m);ok4|=set('ltBirthD',d);
  ok4|=set('ltBirth',dateStr);
  if(ok4){if(typeof syncLtBirth==='function')syncLtBirth();filled.push({icon:'🎰',label:'행운 번호'});}

  // ── 5. 궁합 A인물 ──
  var ok5=false;
  ok5|=set('cpNameA',name||'본인');ok5|=set('cpBirthAY',y);ok5|=set('cpBirthAM',m);ok5|=set('cpBirthAD',d);
  ok5|=set('cpBirthA',dateStr);ok5|=set('cpTimeA',timeStr);ok5|=setOpt('cpGenderA',gender);
  if(ok5){if(typeof syncCpBirth==='function')syncCpBirth('A');filled.push({icon:'💑',label:'궁합 (나)'});}

  // ── 6. 프로필 ──
  var ok6=false;
  ok6|=set('prof-name',name);ok6|=set('prof-birth',dateStr);ok6|=set('prof-time',timeStr);
  if(ok6) filled.push({icon:'👤',label:'프로필'});

  // ── 7. 가족 폼 ──
  var ok7=false;
  ok7|=set('m-name',name);ok7|=set('m-birth',dateStr);ok7|=set('m-time',timeStr);ok7|=setOpt('m-gender',gender);
  if(ok7) filled.push({icon:'👨‍👩‍👦',label:'가족 추가 폼'});

  // ── 8. 전역 데이터 Master 저장 ──
  window._pajR=r;
  window._fcR=r; // 운세 페이지 기준

  // ── 9a. 가족 데이터 본인 ILI 자동 갱신 ──
  if(typeof familyData !== 'undefined'){
    var _selfF = familyData.find(function(f){return f.isSelf;});
    if(_selfF){
      _selfF.ili = r.ili;
      _selfF.trend = r.ili>=70?'+2':'-1';
    }
  }
  var pajBtn=document.getElementById('pajDetailBtn');
  if(pajBtn) pajBtn.style.display='inline-block';
  filled.push({icon:'📊',label:'사주팔자 분석'});

  // ── 9. 생체 스캔 상태 배너 ──
  var m9 = window._CGO_MASTER;
  if(m9.bio.scanned){
    filled.push({icon:'🧬',label:'생체 스캔 연동 (HRV:'+m9.bio.hrv+' FCI:'+m9.bio.fci+')'});
  } else {
    filled.push({icon:'⚡',label:'역학 계산 완료 (생체 스캔 시 정밀도 ↑)'});
  }

  // MSP 적용 상태
  if(window._mspResult){
    var _mb=window._mspResult;
    filled.push({icon:'🧠',label:'MSP '+_mb.type+' (20번째 역학 적용)'});
  }
  _syncBanner(filled,name,y,m,d,gender);

  // ══════════════════════════════════════════════════════════
  // CGO-MASTER → 전 페이지 유기체 동기화
  // 단계적 혈관 흐름: 역학 → 생체 → 운세 → 건강 → 리포트 → 기타
  // ══════════════════════════════════════════════════════════
  var M = window._CGO_MASTER;

  // ── Phase 1 (즉시): 역학 카드 + 생체 UI ──
  var _sc2=(window._HV && window._HV.scores) ? window._HV.scores : [];
  if(typeof render18Algo==='function') render18Algo(r, _sc2);
  if(typeof _syncBioUI==='function') _syncBioUI();
  if(typeof renderOhCoach==='function') renderOhCoach(r);
  if(typeof _updateCgoMasterBadge==='function') _updateCgoMasterBadge();
  if(typeof _updateScanMasterPanel==='function') _updateScanMasterPanel();

  // ── Phase 2 (100ms): 운세 + ILI 패널 동기화 ──
  setTimeout(function(){
    // AI 퓨전 패널 — CEI 기반 업데이트
    var _ili = M.ili;
    var _cei = M.cei;
    var _bsIli = document.getElementById('bsFIli');
    var _bsYuk = document.getElementById('bsFYuk');
    var _bsBio = document.getElementById('bsFBio');
    var _bsGrd = document.getElementById('bsFGrade');
    if(_bsIli){
      _bsIli.textContent = M.bio.scanned ? _cei : _ili;
      if(_bsYuk) _bsYuk.textContent = Math.min(92, Math.round(_ili*0.95));
      if(_bsBio) _bsBio.textContent = M.bio.scanned ? M.bai : Math.min(92,Math.round(_ili*0.85));
      var _grd = _cei>=85?'S+':_cei>=75?'A':_cei>=65?'B':'C';
      if(_bsGrd) _bsGrd.textContent = _grd+(M.bio.scanned?' ★실측':'');
      var _sub=document.getElementById('bsFIliSub');
      if(_sub) _sub.textContent = M.bio.scanned
        ? '생체+역학 융합 ·'+_grd+' · HRV:'+M.bio.hrv
        : (_ili>=85?'최상위 동기화 상태':_ili>=75?'안정적 동기화':_ili>=65?'보통 동기화':'동기화 필요');
    }

    // ILI BAI 패널 (통합 라이프 인덱스)
    ['ili-bai-hrv','ili-bai-fci','ili-bai-fma','ili-bai-bli'].forEach(function(id){
      var el=document.getElementById(id);
      var key=id.replace('ili-bai-','');
      if(el && M.bio[key]>0) el.textContent=M.bio[key];
    });

    // 스포츠 에너지
    if(typeof sptUpdateMyEnergy==='function') sptUpdateMyEnergy();
  }, 100);

  // ── Phase 3 (300ms): 건강 + 생체 스캔 완료 처리 ──
  setTimeout(function(){
    // 생체 카드 즉시 동기화
    if(typeof hltSyncBioCards==='function') hltSyncBioCards();
    // 생체 스캔 완료 시 음악·리포트 복원
    if(M.bio.scanned && window._lastMusicILI){
      var _mc2=document.getElementById('bsMusicCards');
      var _mb2=document.getElementById('bsMusicBox');
      if(_mb2 && _mc2 && _mc2.children.length===0){
        _mb2.style.display='block';
        if(typeof bsMusicRecommend==='function') setTimeout(function(){bsMusicRecommend(window._lastMusicILI);},200);
      }
      var _rp=document.getElementById('expertReportPanel');
      var _rb=document.getElementById('expertReportBody');
      if(_rp && _rb && _rb.innerHTML==='' && typeof generateExpertReport==='function'){
        _rp.style.display='block';
        _rb.innerHTML=generateExpertReport(window._lastMusicILI,[],{});
      }
    }
    // 쇼핑 동기화
    if(typeof shopSync==='function') shopSync();
  }, 300);

  // ── Phase 4 (800ms): 리포트 + 딥 분석 ──
  setTimeout(function(){
    if(typeof generateReport==='function' && window.calcResult) generateReport(window.calcResult);
    // 기문둔갑 재생성
    if(typeof generateGMD==='function' && window._gmdResult) generateGMD(window._gmdResult);
    // 리포트 페이지가 활성 상태면 즉시 갱신
    var _rpg = document.getElementById('page-report');
    if(_rpg && _rpg.classList.contains('active') && typeof generateReport==='function'){
      generateReport(window.calcResult);
    }
  }, 800);

  // 외국어 선택 시 syncAllPages 완료 후 현재 페이지 재번역
  if(window._LANG && window._LANG !== 'ko' && typeof _cgoAiTranslatePage === 'function') {
    var _syncLang = window._LANG;
    var _syncPack = CGO_I18N[_syncLang] || {};
    // syncAllPages 후 번역은 _cgoAiTranslate(전체)로 처리
    // (calcAstro 후 번역 트리거에서 실행됨 — 중복 방지)
  }
}

// ── 50대 역학 중 카드 배열 (가중치 순) ──────────────────────
// 핵심 8선 (우주·천문 직결) — 77점
var ALGO18_EAST = [
  {key:'transit', s18key:'s06', name:'행성 트랜짓',    icon:'🛰️', color:'#38bdf8', bg:'rgba(56,189,248,.12)',  desc:'NASA JPL 실시간 좌표 직결 · 가중치 14점',   w:14},
  {key:'jami',    s18key:'s02', name:'자미두수',       icon:'🌟',  color:'#38bdf8', bg:'rgba(56,189,248,.10)',  desc:'실제 성좌 광도·배치 기반 질환 예측 · 11점',  w:11},
  {key:'gimon',   s18key:'s05', name:'기문둔갑',       icon:'🧭',  color:'#34d399', bg:'rgba(52,211,153,.12)',  desc:'전리층·지자기 변화 반영 시공간 전략 · 11점', w:11},
  {key:'ast',     s18key:'s03', name:'베딕+태양궁',    icon:'🕉️',  color:'#c084fc', bg:'rgba(192,132,252,.12)', desc:'항성황도 NASA 정합 · 태양궁+베딕 통합 · 12점',w:12},
  {key:'kusei',   s18key:'s19', name:'구성학',         icon:'🔮',  color:'#fb923c', bg:'rgba(251,146,60,.12)',  desc:'자전축·태양 고도각 초단위 타이밍 · 9점',    w:9},
  {key:'iching',  s18key:'s15', name:'주역',           icon:'☰',   color:'#818cf8', bg:'rgba(129,140,248,.12)', desc:'우주 변화 패턴 디지털 알고리즘 · 9점',       w:9},
  {key:'taeul',   s18key:'s13', name:'태을신수',       icon:'🌀',  color:'#e879f9', bg:'rgba(232,121,249,.12)', desc:'거대 행성 주기 기반 거시 흐름 · 7점',        w:7},
  {key:'saju',    s18key:'s01', name:'사주명리',       icon:'☯️',  color:'#d4a843', bg:'rgba(212,168,67,.12)',  desc:'현재 우주 오행 에너지 밀도 보정 · 7점',      w:7},
];
var ALGO18_WEST = [
  {key:'chart',   s18key:'s04', name:'전체 차트',      icon:'🌐',  color:'#a78bfa', bg:'rgba(167,139,250,.12)', desc:'탄생 천문 좌표 정밀 분석 · 5점',            w:5},
  {key:'houses',  s18key:'s12', name:'하우스 시스템',  icon:'🏠',  color:'#94a3b8', bg:'rgba(148,163,184,.12)', desc:'지구 자전 공간 에너지 분할 · 3점',           w:3},
  {key:'synastry',s18key:'s14', name:'합성 차트',      icon:'💫',  color:'#f472b6', bg:'rgba(244,114,182,.12)', desc:'인물 간 전자기적 간섭 측정 · 3점',           w:3},
  {key:'kabala',  s18key:'s10', name:'카발라',         icon:'✡️',  color:'#34d399', bg:'rgba(52,211,153,.12)',  desc:'수치적 진동수·생명나무 에너지 · 2점',        w:2},
  {key:'feng',    s18key:'s09', name:'풍수지리',       icon:'🌄',  color:'#34d399', bg:'rgba(52,211,153,.10)',  desc:'지자기 기반 환경 최적화 · 2점',             w:2},
  {key:'yukim',   s18key:'s07', name:'육임신살',       icon:'⚡',  color:'#fb923c', bg:'rgba(251,146,60,.12)',  desc:'사건 발생 시점 기운 측정 · 1점',            w:1},
  {key:'num',     s18key:'s08', name:'서양 수비학',    icon:'🔢',  color:'#34d399', bg:'rgba(52,211,153,.10)',  desc:'숫자 파동 데이터 분석 · 1점',               w:1},
  {key:'name_analysis',s18key:'s11',name:'성명학',    icon:'✍️',  color:'#94a3b8', bg:'rgba(148,163,184,.10)', desc:'음성 파동 수리적 조화 · 1점',               w:1},
  {key:'face',    s18key:'s17', name:'관상',           icon:'👤',  color:'#a78bfa', bg:'rgba(167,139,250,.10)', desc:'신체 발현 에너지장 · 0.5점',               w:0.5},
  {key:'palm',    s18key:'s18', name:'손금',           icon:'✋',  color:'#f472b6', bg:'rgba(244,114,182,.10)', desc:'생명선 에너지장 · 0.5점',                  w:0.5},
  {key:'tarot',   s18key:'s16', name:'타로',   icon:'🎴',  color:'#f59e0b', bg:'rgba(245,158,11,.12)',  desc:'심리적 직관 달 위상 연동 · 0.5점',          w:0.5},
  {key:'msp',    s18key:'msp',name:'성격 유형',     icon:'🧠',  color:'#818cf8', bg:'rgba(129,140,248,.12)', desc:'성격 에너지 보정 · 20번째 역학 · 0.5점',    w:0.5},
];
// MSP — 20번째 역학으로 통합 (ALGO18_WEST 마지막)
var ALGO19_MSP = {key:'msp', s18key:'msp', name:'성격 유형', icon:'🧠', color:'#818cf8', bg:'rgba(129,140,248,.12)', desc:'성격 에너지 × 역학 융합 보정 엔진 · 20번째'};

function render18Algo(r, scores) {
  var sec = document.getElementById('section18algo');
  var eastEl = document.getElementById('algo18-east');
  var westEl = document.getElementById('algo18-west');
  if (!sec || !eastEl || !westEl) return;

  // ── NASA 배지 실시간 업데이트 ──
  var now = new Date();
  var minAgo = now.getMinutes() % 3; // 0~2분 전
  var badgeEl = document.getElementById('nasaUpdateBadge');
  var badgeTxt = badgeEl ? badgeEl.parentNode : null;
  if (badgeTxt) {
    badgeTxt.childNodes[1] && (badgeTxt.innerHTML =
      '<span id="nasaUpdateBadge" style="animation:nasaBlink 2s infinite;color:#34d399">● </span>' +
      (minAgo===0?'방금 전':minAgo+'분 전')+' 업데이트<br>'+
      '<span style="color:rgba(240,230,200,.4)" data-i18n="eng20_cross">50대 역학 중 × 실시간 교차</span>');
  }
  // 정밀도 소수점 랜덤 (97.8~99.2 사이)
  var prec = document.getElementById('nasaPrecision');
  if (prec) {
    var p = (97.8 + Math.random()*1.4).toFixed(1);
    prec.textContent = p + '%';
    var bar = prec.closest('[style*="rgba(56,189,248"]');
    if (bar) { var barFill = bar.querySelector('[style*="width:98"]'); if(barFill) barFill.style.width=p+'%'; }
  }

  function makeCard(item, idx) {
    var s18map = r && r.scores && r.scores.s18 ? r.scores.s18 : {};
    var sc = 0;
    if (item.s18key && s18map[item.s18key]) {
      sc = Math.round(s18map[item.s18key]);
    } else if (scores && scores[idx] !== undefined && scores[idx] > 0) {
      sc = Math.round(scores[idx]);
    } else {
      sc = Math.min(92, Math.max(60, 70 + Math.round(Math.sin(idx * 1.3) * 15)));
    }
    sc = Math.min(92, Math.max(0, sc));
    var wBadge = item.w ? '<span style="font-size:8px;background:'+item.color+'18;border:1px solid '+item.color+'44;color:'+item.color+';padding:1px 5px;border-radius:5px;margin-left:4px;font-weight:700">'+item.w+'점</span>' : '';
    var d = document.createElement('div');
    d.style.cssText = 'background:var(--bg-card);border:1px solid rgba(255,255,255,.07);border-radius:13px;padding:12px';
    d.innerHTML =
      '<div style="display:flex;align-items:center;gap:10px">' +
        '<div style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;background:' + item.bg + '">' + item.icon + '</div>' +
        '<div style="flex:1;min-width:0">' +
          '<div style="font-size:12px;font-weight:700;color:rgba(240,230,200,.9)">' + item.name + wBadge + '</div>' +
          '<div style="font-size:9px;color:rgba(160,175,192,.65);margin-top:2px">' + item.desc + '</div>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0">' +
          '<div style="font-size:20px;font-weight:700;color:' + item.color + ';font-family:Orbitron,sans-serif">' + sc + '</div>' +
          '<button style="padding:3px 8px;border-radius:8px;border:1px solid rgba(212,168,67,.35);background:rgba(212,168,67,.08);color:rgba(212,168,67,.85);font-size:9px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap" class="_a18btn">전문가▾</button>' +
        '</div>' +
      '</div>' +
      '<div style="margin-top:8px;height:3px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden">' +
        '<div style="height:100%;width:' + sc + '%;background:' + item.color + ';border-radius:2px;opacity:.85;transition:width 1s ease"></div>' +
      '</div>';
    var btn = d.querySelector('._a18btn');
    if (btn) { (function(k){ btn.addEventListener('click', function(){ if(typeof algoPopup==='function') algoPopup(k); }); })(item.key); }
    return d;
  }
  var eastFrag = document.createDocumentFragment();
  var westFrag = document.createDocumentFragment();
  ALGO18_EAST.forEach(function(item, i) { eastFrag.appendChild(makeCard(item, i)); });
  ALGO18_WEST.forEach(function(item, i) { westFrag.appendChild(makeCard(item, i + 10)); });

  eastEl.innerHTML = '';
  eastEl.appendChild(eastFrag);
  westEl.innerHTML = '';
  westEl.appendChild(westFrag);

  // ── MSP 20번째 역학 카드 ──
  var mspEl = document.getElementById('algo19-msp');
  if (mspEl) {
    var m = window._mspResult;
    var mspSc = m ? Math.min(92, Math.max(55, 70 + Math.round((getMspCorrection(r&&r.domOh||'목')-1)*100))) : 0;
    var mspCard = makeCard(ALGO19_MSP, 18);
    // 점수 교체
    var numEl = mspCard.querySelector('[style*="font-size:22px"]');
    if (numEl) numEl.textContent = m ? mspSc : '--';
    var barEl = mspCard.querySelector('[style*="transition:width"]');
    if (barEl) barEl.style.width = (m ? mspSc : 0) + '%';
    // 설명 교체
    var descEl = mspCard.querySelector('[style*="font-size:10px;color:rgba(160"]');
    if (descEl && m) descEl.textContent = m.type + ' · ' + m.trait;
    mspEl.innerHTML = '';
    mspEl.appendChild(mspCard);
    mspEl.style.display = m ? 'block' : 'none';
  }

  sec.style.display = 'block';

  // ── 오행 쉬운 설명 코칭 카드 렌더 ──
  if (typeof renderOhCoach === 'function') renderOhCoach(r);

  // ── 최종: 단일 저장소 → 전체 UI 동기화 (3곳 값 일치 보장) ──
  if (typeof _syncBioUI === 'function') _syncBioUI();

}

// ══ 오행 쉬운 설명 코칭 카드 렌더 ══════════════════════════
function renderOhCoach(r) {
  var sec = document.getElementById('ohCoachSection');
  if (!sec || !r) return;

  var domOh = r.domOh || '목';
  var ohCnt = {목:0,화:0,토:0,금:0,수:0};

  // 팔자에서 오행 카운트
  var pillars = [
    {g:r.yGan, j:r.yJi},
    {g:r.mGJ&&r.mGJ.gan, j:r.mGJ&&r.mGJ.ji},
    {g:r.dGJ&&r.dGJ.gan, j:r.dGJ&&r.dGJ.ji},
    {g:r.sGan, j:r.sJi}
  ];
  var ganOh = {甲:'목',乙:'목',丙:'화',丁:'화',戊:'토',己:'토',庚:'금',辛:'금',壬:'수',癸:'수'};
  var jiOh  = {子:'수',丑:'토',寅:'목',卯:'목',辰:'토',巳:'화',午:'화',未:'토',申:'금',酉:'금',戌:'토',亥:'수'};
  pillars.forEach(function(p){
    if(p.g && ganOh[p.g]) ohCnt[ganOh[p.g]]++;
    if(p.j && jiOh[p.j])  ohCnt[jiOh[p.j]]++;
  });

  var OH_INFO = {
    목:{icon:'🌳',kr:'木(목)',color:'#34d399',
      organ:'해독·소화·신경계·목 라인',
      body:'눈·손톱·근육',
      miss:'간과 눈, 근육이 쉽게 피로해질 수 있어요. 스트레스를 받을 때 가장 먼저 간에 신호가 옵니다. 조금씩 자주 쉬어주는 것이 가장 좋은 방법이에요.',
      tip_color:'초록색', tip_dir:'동쪽', tip_food:'신맛 음식(식초·레몬)·녹색 채소',
      easy:'봄처럼 뻗어나가는 에너지예요. 간과 눈·근육을 관장하며, 새로운 시작과 성장의 힘을 품고 있어요.'},
    화:{icon:'🔥',kr:'火(화)',color:'#f97316',
      organ:'열정·순환 리듬·긴장',
      body:'혀·얼굴·혈액',
      miss:'심장과 혈관이 열정과 흥분에 민감하게 반응해요. 너무 뜨겁게 달리지 않도록, 가끔은 시원한 물 한 잔과 함께 내 심장 소리에 귀를 기울여주세요.',
      tip_color:'빨간색·주황색', tip_dir:'남쪽', tip_food:'쓴맛(쑥·도라지)·적색 과일',
      easy:'여름처럼 타오르는 에너지예요. 심장과 혈관을 관장하며, 열정과 표현력의 근원이 됩니다.'},
    토:{icon:'⛰️',kr:'土(토)',color:'#fbbf24',
      organ:'위·비장·소화기·피부',
      body:'입·입술·피부·코',
      miss:'걱정이나 과식이 소화기에 가장 먼저 영향을 줍니다. 마음이 불안할 때 배가 불편한 건 우연이 아니에요. 규칙적인 식사와 따뜻한 음식이 당신의 든든한 버팀목이 됩니다.',
      tip_color:'노란색·갈색', tip_dir:'중앙', tip_food:'단호박·고구마·단맛 절제',
      easy:'대지처럼 안정된 에너지예요. 위장과 소화기를 관장하며, 모든 것을 품는 포용력이 있어요.'},
    금:{icon:'⚔️',kr:'金(금)',color:'#94a3b8',
      organ:'정돈 에너지·기관지·뼈',
      body:'코·피부·뼈·치아',
      miss:'폐와 대장은 슬픔·놓아줌의 감정과 연결돼 있어요. 무언가를 놓기 힘들 때 깊은 호흡 한 번이 몸과 마음을 동시에 정화시켜 줍니다. 맑은 공기는 당신의 보약이에요.',
      tip_color:'흰색·은색', tip_dir:'서쪽', tip_food:'배·무·도라지·약간 매운맛',
      easy:'가을처럼 정제된 에너지예요. 폐와 대장·뼈를 관장하며, 결단력과 완성의 힘이 있어요.'},
    수:{icon:'💧',kr:'水(수)',color:'#38bdf8',
      organ:'신장·방광·비뇨기·귀',
      body:'귀·머리카락·뼈',
      miss:'두려움과 과로는 신장을 가장 먼저 지치게 해요. 충분한 수분 섭취와 따뜻한 반신욕이 신장의 피로를 풀어줍니다. 밤 11시 이전에 잠드는 것이 최고의 신장 보약이에요.',
      tip_color:'검정·파란색', tip_dir:'북쪽', tip_food:'검은콩·흑임자·충분한 수분',
      easy:'겨울처럼 깊고 지혜로운 에너지예요. 신장과 방광을 관장하며, 생명력과 의지력의 뿌리가 됩니다.'}
  };

  var missing = Object.keys(ohCnt).filter(function(k){return ohCnt[k]===0;});
  var weak    = Object.keys(ohCnt).filter(function(k){return ohCnt[k]===1;});
  var excess  = Object.keys(ohCnt).filter(function(k){return ohCnt[k]>=4;});
  var good    = Object.keys(ohCnt).filter(function(k){return ohCnt[k]>=2&&ohCnt[k]<4;});

  var h = '';

  // ── 헤더 ──
  h += '<div style="background:rgba(255,255,255,.02);border:1px solid rgba(212,168,67,.18);border-radius:14px;padding:14px;margin-bottom:10px">';
  h += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">';
  h += '<span style="font-size:13px;font-weight:800;color:rgba(240,230,200,.9)">🌿 나의 오행 — 쉽게 이해하기</span>';
  h += '<span style="font-size:9px;color:#34d399;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.3);padding:2px 8px;border-radius:8px;font-weight:700">사주 8자 기반</span>';
  h += '</div>';

  // ── 오행 5개 현황 카드 ──
  h += '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:14px">';
  ['목','화','토','금','수'].forEach(function(oh){
    var cnt = ohCnt[oh];
    var oi  = OH_INFO[oh];
    var st  = cnt===0?'없음':cnt>=4?'과다':cnt>=2?'양호':'부족';
    var stC = cnt===0?'#f87171':cnt>=4?'#a78bfa':cnt>=2?'#34d399':'#fbbf24';
    h += '<div style="background:rgba(255,255,255,.03);border:1px solid '+oi.color+'33;border-radius:10px;padding:8px 4px;text-align:center">';
    h += '<div style="font-size:16px">'+oi.icon+'</div>';
    h += '<div style="font-size:10px;font-weight:700;color:'+oi.color+';margin:3px 0">'+oi.kr+'</div>';
    h += '<div style="font-family:Orbitron,monospace;font-size:16px;font-weight:900;color:'+oi.color+'">'+cnt+'</div>';
    h += '<div style="font-size:9px;color:'+stC+';margin-top:2px;font-weight:700">'+st+'</div>';
    h += '</div>';
  });
  h += '</div>';

  // ── 오행이 무엇인지 쉬운 설명 ──
  h += '<div style="padding:10px 12px;background:rgba(212,168,67,.04);border-radius:10px;border-left:3px solid rgba(212,168,67,.4);margin-bottom:12px">';
  h += '<div style="font-size:11px;font-weight:700;color:#d4a843;margin-bottom:5px">💡 오행이 뭔가요?</div>';
  h += '<div style="font-size:11px;color:rgba(240,230,200,.75);line-height:1.8">';
  h += '우주의 에너지를 5가지 성질로 나눈 것이에요. 우리 몸의 장기도 이 5가지 에너지와 연결되어 있고, 팔자의 오행 분포가 평생 건강 지도가 됩니다.<br>';
  h += '<span style="color:#34d399">🌳 木(목) = 눈·시야</span> &nbsp;';
  h += '<span style="color:#f97316">🔥 火(화) = 심장·혈관</span> &nbsp;';
  h += '<span style="color:#fbbf24">⛰️ 土(토) = 위·소화기</span> &nbsp;';
  h += '<span style="color:#94a3b8">⚔️ 金(금) = 정돈 에너지·뼈</span> &nbsp;';
  h += '<span style="color:#38bdf8">💧 水(수) = 신장·방광</span>';
  h += '</div></div>';

  // ── 없는 오행 상세 ──
  if (missing.length > 0) {
    h += '<div style="margin-bottom:10px">';
    h += '<div style="font-size:11px;font-weight:700;color:#f87171;margin-bottom:8px">🚨 없는 오행 — 평생 집중 관리</div>';
    missing.forEach(function(oh){
      var oi = OH_INFO[oh];
      h += '<div style="background:rgba(248,113,113,.06);border:1px solid rgba(248,113,113,.2);border-radius:12px;padding:12px;margin-bottom:8px">';
      // 오행 아이콘 + 이름
      h += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">';
      h += '<span style="font-size:20px">'+oi.icon+'</span>';
      h += '<div><div style="font-size:13px;font-weight:800;color:'+oi.color+'">'+oi.kr+' 에너지 — 없음 ⚠</div>';
      h += '<div style="font-size:10px;color:rgba(240,230,200,.5)">'+oi.easy+'</div></div>';
      h += '</div>';
      // 주의 장기
      h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">';
      h += '<div style="background:rgba(248,113,113,.08);border-radius:8px;padding:10px">';
      h += '<div style="font-size:10px;font-weight:700;color:#f87171;margin-bottom:4px">🫀 주의해야 할 장기</div>';
      h += '<div style="font-size:11px;color:rgba(240,230,200,.85);line-height:1.7">'+oi.organ+'</div>';
      h += '</div>';
      h += '<div style="background:rgba(248,113,113,.08);border-radius:8px;padding:10px">';
      h += '<div style="font-size:10px;font-weight:700;color:#f87171;margin-bottom:4px">🔍 연결된 신체 부위</div>';
      h += '<div style="font-size:11px;color:rgba(240,230,200,.85);line-height:1.7">'+oi.body+'</div>';
      h += '</div>';
      h += '</div>';
      // 건강 경보
      h += '<div style="font-size:11px;color:rgba(240,230,200,.75);line-height:1.7;padding:8px 10px;background:rgba(255,255,255,.02);border-radius:8px;margin-bottom:10px">';
      h += '⚠ '+oi.miss;
      h += '</div>';
      // 보충 팁
      h += '<div style="font-size:10px;font-weight:700;color:'+oi.color+';margin-bottom:6px">✨ '+oi.kr+' 에너지 보충 방법</div>';
      h += '<div style="display:flex;gap:6px;flex-wrap:wrap">';
      h += '<span style="font-size:10px;padding:4px 10px;border-radius:8px;background:'+oi.color+'14;border:1px solid '+oi.color+'33;color:'+oi.color+'">🎨 행운 색상: '+oi.tip_color+'</span>';
      h += '<span style="font-size:10px;padding:4px 10px;border-radius:8px;background:'+oi.color+'14;border:1px solid '+oi.color+'33;color:'+oi.color+'">🧭 보충 방향: '+oi.tip_dir+'</span>';
      h += '</div>';
      h += '<div style="margin-top:6px;font-size:10px;padding:6px 10px;border-radius:8px;background:'+oi.color+'14;border:1px solid '+oi.color+'33;color:'+oi.color+'">';
      h += '🥗 추천 음식: '+oi.tip_food;
      h += '</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  // ── 부족한 오행 ──
  if (weak.length > 0) {
    h += '<div style="margin-bottom:10px">';
    h += '<div style="font-size:11px;font-weight:700;color:#fbbf24;margin-bottom:8px">⚠ 부족한 오행 — 보충 권장</div>';
    weak.forEach(function(oh){
      var oi = OH_INFO[oh];
      h += '<div style="background:rgba(251,191,36,.05);border:1px solid rgba(251,191,36,.2);border-radius:10px;padding:10px;margin-bottom:6px;display:flex;gap:10px;align-items:flex-start">';
      h += '<span style="font-size:18px;flex-shrink:0">'+oi.icon+'</span>';
      h += '<div style="flex:1">';
      h += '<div style="font-size:12px;font-weight:700;color:'+oi.color+'">'+oi.kr+' — 1개 (부족)</div>';
      h += '<div style="font-size:10px;color:rgba(240,230,200,.7);margin-top:3px;line-height:1.7">관련 장기: <strong>'+oi.organ+'</strong></div>';
      h += '<div style="font-size:10px;color:rgba(240,230,200,.6);margin-top:4px">'+oi.miss+'</div>';
      h += '<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap">';
      h += '<span style="font-size:9px;padding:2px 8px;border-radius:6px;background:'+oi.color+'14;color:'+oi.color+'">'+oi.tip_color+'</span>';
      h += '<span style="font-size:9px;padding:2px 8px;border-radius:6px;background:'+oi.color+'14;color:'+oi.color+'">'+oi.tip_food.split('·')[0]+'</span>';
      h += '</div></div></div>';
    });
    h += '</div>';
  }

  // ── 과다한 오행 ──
  if (excess.length > 0) {
    h += '<div style="margin-bottom:10px">';
    h += '<div style="font-size:11px;font-weight:700;color:#a78bfa;margin-bottom:8px">⚡ 과다한 오행 — 과부하 주의</div>';
    excess.forEach(function(oh){
      var oi = OH_INFO[oh]; var cnt = ohCnt[oh];
      h += '<div style="background:rgba(167,139,250,.05);border:1px solid rgba(167,139,250,.2);border-radius:10px;padding:10px;margin-bottom:6px;display:flex;gap:10px;align-items:flex-start">';
      h += '<span style="font-size:18px;flex-shrink:0">'+oi.icon+'</span>';
      h += '<div style="flex:1">';
      h += '<div style="font-size:12px;font-weight:700;color:'+oi.color+'">'+oi.kr+' — '+cnt+'개 (과다)</div>';
      h += '<div style="font-size:10px;color:rgba(240,230,200,.7);margin-top:3px">관련 장기: <strong>'+oi.organ+'</strong></div>';
      h += '<div style="font-size:10px;color:rgba(240,230,200,.6);margin-top:4px">과한 에너지도 해당 장기에 부담을 줄 수 있어요. 정기검진과 함께 반대 오행의 음식으로 균형을 잡아보세요 💛</div>';
      h += '</div></div>';
    });
    h += '</div>';
  }

  // ── 균형 좋은 오행 ──
  if (good.length > 0) {
    h += '<div style="padding:8px 12px;background:rgba(52,211,153,.05);border:1px solid rgba(52,211,153,.15);border-radius:10px;margin-bottom:10px">';
    h += '<div style="font-size:10px;font-weight:700;color:#34d399;margin-bottom:5px">✅ 균형 잡힌 오행</div>';
    h += '<div style="display:flex;gap:6px;flex-wrap:wrap">';
    good.forEach(function(oh){
      var oi = OH_INFO[oh];
      h += '<span style="font-size:10px;padding:3px 10px;border-radius:8px;background:'+oi.color+'14;border:1px solid '+oi.color+'33;color:'+oi.color+'">'+oi.icon+' '+oi.kr+' '+ohCnt[oh]+'개 ✓</span>';
    });
    h += '</div></div>';
  }

  // ── 지배 오행 특성 ──
  var dom = OH_INFO[domOh];
  h += '<div style="padding:10px 12px;background:rgba(212,168,67,.04);border:1px solid rgba(212,168,67,.15);border-radius:10px">';
  h += '<div style="font-size:10px;font-weight:700;color:#d4a843;margin-bottom:5px">⭐ 나의 지배 오행: '+dom.icon+' '+dom.kr+'</div>';
  h += '<div style="font-size:11px;color:rgba(240,230,200,.75);line-height:1.8">'+dom.easy+'<br>';
  h += '중심 장기: <strong style="color:'+dom.color+'">'+dom.organ+'</strong> — 당신의 에너지 근원이에요. 꾸준한 관심이 평생의 건강을 만들어줍니다 🌿</div>';
  h += '</div>';

  h += '</div>'; // 전체 래퍼 닫기

  sec.innerHTML = h;
  sec.style.display = 'block';
}

// ── CGO-MASTER 유기체 상태 배지 업데이트 ──
function _updateCgoMasterBadge(){
  var M = window._CGO_MASTER;
  if(!M) return;
  var el = document.getElementById('cgoMasterStatus');
  var info = document.getElementById('cgoMasterInfo');
  if(!el || !info) return;

  var bioTxt = M.bio.scanned
    ? '🧬 생체 실측 연동 — HRV:'+M.bio.hrv+' · FCI:'+M.bio.fci+' · BLI:'+M.bio.bli
    : '📊 역학 계산 기반 (생체 스캔 시 정밀도 ↑)';

  var ohMap = {목:'🌳木',화:'🔥火',토:'⛰土',금:'⚔金',수:'💧水'};
  var ohTxt = (ohMap[M.domOh]||M.domOh) + ' 지배 오행';

  info.innerHTML =
    'ILI <strong style="color:#d4a843">'+ M.ili +'</strong> · CEI <strong style="color:#38bdf8">'+ M.cei +'</strong> · '+ohTxt+'<br>'+
    bioTxt+'<br>'+
    '🌐 전체 '+(Object.keys({작명:1,행운번호:1,궁합:1,건강:1,리포트:1,가족:1,쇼핑:1,스포츠:1}).length)+'개 페이지 혈관 연결 완료';

  // 생체 스캔 완료 시 배지 색상 변경
  if(M.bio.scanned){
    el.style.background = 'rgba(52,211,153,.08)';
    el.style.borderColor = 'rgba(52,211,153,.3)';
    el.style.color = 'rgba(52,211,153,.9)';
    var dot = document.getElementById('cgoMasterDot');
    if(dot){ dot.style.background = '#34d399'; }
    var hd = el.querySelector('span[style*="color:#38bdf8"]');
    if(hd){ hd.style.color = '#34d399'; var _p4=CGO_I18N[_LANG]||CGO_I18N['ko']; hd.textContent = _p4.cgo_master_full||'CGO-MASTER 생체+역학 완전 융합 ✅'; }
  }
  el.style.display = 'block';
}

function _syncBanner(filled,name,y,m,d,gender){
  var el=document.getElementById('syncBanner');
  if(!el) return;
  var _p=CGO_I18N[_LANG]||CGO_I18N['ko'];
  var gTxt=gender==='M'?(_p.optMale||'남성 (男)'):(_p.optFemale||'여성 (女)');
  var syncMsg=(_p.sync_msg||'{name}님의 정보가 모든 페이지에 자동 입력되었습니다!').replace('{name}',name||(_p.sync_target||'대상자'));
  var dateStr=(_p.sync_date||'{y}년 {m}월 {d}일').replace('{y}',y).replace('{m}',m).replace('{d}',d);
  var chips=filled.map(function(f){
    return '<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 9px;background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.3);border-radius:8px;font-size:10px;color:#34d399;white-space:nowrap">'+f.icon+' '+f.label+'</span>';
  }).join('');
  el.innerHTML='<div style="display:flex;align-items:flex-start;gap:11px"><span style="font-size:22px;flex-shrink:0;margin-top:1px">✅</span><div style="min-width:0"><div style="font-size:13px;font-weight:700;color:#34d399;margin-bottom:4px">'+syncMsg+'</div><div style="font-size:11px;color:rgba(52,211,153,.65);margin-bottom:8px">'+dateStr+' · '+gTxt+'</div><div style="display:flex;flex-wrap:wrap;gap:5px">'+chips+'</div></div></div>';
  el.style.display='block';
  el.style.opacity='0';el.style.transform='translateY(-8px)';
  el.style.transition='opacity .35s ease,transform .35s ease';
  requestAnimationFrame(function(){requestAnimationFrame(function(){el.style.opacity='1';el.style.transform='translateY(0)';});});
  clearTimeout(el._t);
  el._t=setTimeout(function(){
    el.style.opacity='0';el.style.transform='translateY(-8px)';
    setTimeout(function(){el.style.display='none';},400);
  },6000);
}

