// ══════════════════════════════════════════════════════════════════
//  CGO 주파수 뮤직  v2.1  — 서브 홈페이지 구조 + 20개국어 번역
//  위성 × 생체 × 역학 × 주파수 · 세계 최초 AI 치료 음악
//  View-Only Active · Strict Destroy
//  번역 키: 24042 ~ 24075
// ══════════════════════════════════════════════════════════════════
(function (global) {
  'use strict';

  // ── 번역 헬퍼 (dash6 딕셔너리 사용) ───────────────────────────
  // index.html의 cgoT() 함수를 사용하거나, 없으면 한국어 폴백
  function t(key) {
    if (typeof global.cgoT === 'function') return global.cgoT(key);
    // 폴백: 한국어 하드코딩 (dash6 로드 전 or 독립 실행 시)
    const KO = {
      24042:'CGO 주파수 뮤직', 24043:'위성 × 생체 × 역학 × 주파수',
      24044:'세계 최초 AI 치료 음악', 24045:'추첨통', 24046:'차트',
      24047:'주파수', 24048:'프리셋', 24049:'조성/음계', 24050:'박자',
      24051:'장르', 24052:'보컬', 24053:'세계 악기', 24054:'🎲 추첨 시작',
      24055:'✨ AI로 음악 생성', 24056:'자연 공명 · 안정', 24057:'DNA 회복 · 사랑',
      24058:'지구 뇌파 동조', 24059:'슈만공명', 24060:'순수 음악',
      24061:'힐링 주파수', 24062:'인기 차트 TOP 5', 24063:'내 프리셋',
      24064:'프리셋 저장', 24065:'하루 1회 · 10원', 24066:'● LIVE AI 생성 중',
      24067:'생성 완료! 재생해보세요', 24068:'현재 설정', 24069:'432Hz 자연 공명의 신비',
      24070:'528Hz DNA 회복 주파수', 24071:'7.83Hz 슈만공명 · 지구의 맥박',
      24072:'프리셋 이름', 24073:'저장된 프리셋 없음', 24074:'프리셋 최대 10개',
      24075:'뒤로'
    };
    return KO[key] || String(key);
  }

  // ── 슬롯 데이터 ──────────────────────────────────────────────────
  // ── 템포 데이터 (250단계 연속 슬라이더) ─────────────────────────
  // 슬라이더: 0~249 → BPM 50~140 연속 매핑
  const TEMPO_MIN_BPM = 50;
  const TEMPO_MAX_BPM = 140;
  const TEMPO_STEPS_COUNT = 250; // 0~249
  // 슬라이더 값 → BPM
  function sliderToBpm(v) {
    return Math.round(TEMPO_MIN_BPM + (v / (TEMPO_STEPS_COUNT - 1)) * (TEMPO_MAX_BPM - TEMPO_MIN_BPM));
  }
  // BPM → 슬라이더 값
  function bpmToSlider(bpm) {
    return Math.round((bpm - TEMPO_MIN_BPM) / (TEMPO_MAX_BPM - TEMPO_MIN_BPM) * (TEMPO_STEPS_COUNT - 1));
  }
  // BPM → 단계 정보 (5구간)
  const TEMPO_STAGES = [
    { bpmMax:57,  name:'아주 느리게', nameEn:'Largo',   desc:'명상 · 깊은 힐링 · 432/528Hz 최적', color:'#6366f1', dot:'#818cf8' },
    { bpmMax:70,  name:'느리게',     nameEn:'Adagio',  desc:'차분 · 감성적인 발라드 · 샹송',      color:'#3b82f6', dot:'#60a5fa' },
    { bpmMax:95,  name:'보통',       nameEn:'Andante', desc:'대중적 · 편안하게 듣기 좋은 스탠다드', color:'#10b981', dot:'#34d399' },
    { bpmMax:125, name:'빠르게',     nameEn:'Allegro', desc:'리드미컬 · 경쾌한 분위기',            color:'#f59e0b', dot:'#fcd34d' },
    { bpmMax:140, name:'아주 빠르게', nameEn:'Presto',  desc:'에너지 · 드라이브감 있는 고속',       color:'#ef4444', dot:'#f87171' }
  ];
  function bpmToStage(bpm) {
    for (const s of TEMPO_STAGES) { if (bpm <= s.bpmMax) return s; }
    return TEMPO_STAGES[TEMPO_STAGES.length - 1];
  }
  // 5개 틱의 슬라이더 위치 (%)
  const TEMPO_TICK_BPMS = [50, 60, 80, 110, 140];
  // 기본값: Andante 80BPM
  const TEMPO_DEFAULT_BPM = 80;
  const TEMPO_DEFAULT_SLIDER = bpmToSlider(TEMPO_DEFAULT_BPM);

  // ── 전 세계 장르 아카이브 (구글 파트너 제공) ──────────────────
  // 나중에 국기 이미지 추가 예정 — flag 필드에 실제 이미지 URL 삽입
  const GENRE_GROUPS = [
    {
      group: '🌍 유럽',
      color: '#3b82f6',
      genres: [
        { id:'chanson',   flag:'🇫🇷', name:'샹송',      nameEn:'Chanson',         country:'프랑스',       desc:'아코디언 선율과 서정적 보컬 · 파리의 낭만과 인생의 애환', bpmRange:[60,90],  wave:'sine'     },
        { id:'canzone',   flag:'🇮🇹', name:'칸소네',     nameEn:'Canzone',          country:'이탈리아',      desc:'만돌린과 풍부한 성량 · 밝고 열정적인 지중해 감성',       bpmRange:[70,100], wave:'triangle' },
        { id:'flamenco',  flag:'🇪🇸', name:'플라멩코',   nameEn:'Flamenco',         country:'스페인',       desc:'기타 리듬과 열정적 박수 · 집시 문화의 즉흥 정열',        bpmRange:[110,140],wave:'sawtooth' },
        { id:'celtic',    flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', name:'켈틱',      nameEn:'Celtic',           country:'아일랜드/스코틀랜드', desc:'휘슬·하프·바이올린 · 안개 낀 초원의 치유 에너지',     bpmRange:[80,120], wave:'triangle' },
      ]
    },
    {
      group: '🌏 아시아',
      color: '#f59e0b',
      genres: [
        { id:'gugak',     flag:'🇰🇷', name:'국악',       nameEn:'Korean Traditional', country:'한국',       desc:'가야금과 해금의 오음계 · 한(恨)과 흥의 깊은 명상',      bpmRange:[50,90],  wave:'sine'     },
        { id:'raga',      flag:'🇮🇳', name:'인도 라가',   nameEn:'Indian Raga',       country:'인도',        desc:'시타르의 벤드 기법 · 차크라를 깨우는 영적 진동',         bpmRange:[60,110], wave:'sine'     },
        { id:'chinese',   flag:'🇨🇳', name:'중국 전통',   nameEn:'Chinese Traditional',country:'중국',       desc:'비파의 청량한 음색 · 산수화 같은 동양적 풍류',           bpmRange:[60,100], wave:'sine'     },
        { id:'japanese',  flag:'🇯🇵', name:'일본 전통',   nameEn:'Japanese Traditional',country:'일본',      desc:'사미센의 절제된 선율 · 선(Zen) 앰비언트 고요함',         bpmRange:[50,80],  wave:'sine'     },
      ]
    },
    {
      group: '🌎 아메리카·아프리카',
      color: '#10b981',
      genres: [
        { id:'bossanova', flag:'🇧🇷', name:'보사노바',    nameEn:'Bossa Nova',       country:'브라질',       desc:'삼바 리듬의 나른한 재해석 · 파도 소리 같은 여유',        bpmRange:[80,110], wave:'triangle' },
        { id:'afrobeat',  flag:'🌍', name:'아프로비트',   nameEn:'Afrobeat',         country:'서아프리카',    desc:'타악기·재즈·펑크 결합 · 원초적 생명력의 리듬 테라피',   bpmRange:[100,130],wave:'sawtooth' },
        { id:'andean',    flag:'🇵🇪', name:'안데스',      nameEn:'Andean/Quechua',   country:'페루/안데스',   desc:'팬플루트·케나의 구슬픈 선율 · 영혼을 정화하는 고요함',   bpmRange:[60,90],  wave:'sine'     },
        { id:'tango',     flag:'🇦🇷', name:'탱고',        nameEn:'Tango',            country:'아르헨티나',    desc:'반도네온의 반음계 선율 · 긴장과 이완의 열정 드라마',     bpmRange:[100,130],wave:'triangle' },
        { id:'maqam',     flag:'🕌',  name:'아랍 마캄',   nameEn:'Arabian Maqam',    country:'중동',         desc:'우드(Oud)의 깊은 울림 · 미분음의 사막 밤 몽환',          bpmRange:[60,100], wave:'sine'     },
      ]
    },
    {
      group: '✨ 현대·힐링',
      color: '#a855f7',
      genres: [
        { id:'ambient',   flag:'🌌', name:'앰비언트',    nameEn:'Ambient',           country:'글로벌',       desc:'패드 신디와 백색소음 · 심장박동을 안정시키는 수면·명상', bpmRange:[50,70],  wave:'sine'     },
        { id:'pop',       flag:'🎤', name:'팝·발라드',   nameEn:'Pop & Ballad',      country:'글로벌',       desc:'친숙한 코드 진행 · 누구나 흥얼거리며 치유받는 대중성',   bpmRange:[80,120], wave:'triangle' },
        { id:'jazz',      flag:'🎷', name:'재즈',        nameEn:'Jazz',              country:'미국/글로벌',   desc:'스윙 리듬과 즉흥 화성 · 도시적 세련됨과 감성 치유',      bpmRange:[80,120], wave:'triangle' },
        { id:'healing',   flag:'💚', name:'힐링',        nameEn:'Healing',           country:'글로벌',       desc:'순수 치료 주파수 중심 · CGO 고유의 과학적 힐링 사운드',  bpmRange:[50,80],  wave:'sine'     },
      ]
    }
  ];
  // flat 배열 (id → genre 빠른 조회용)
  const GENRE_MAP = {};
  GENRE_GROUPS.forEach(g => g.genres.forEach(genre => { GENRE_MAP[genre.id] = genre; }));

  // ══════════════════════════════════════════════════════════════════
  //  INSTRUMENT_DATA — 100개 글로벌 악기 마스터 데이터셋
  //  Gemini × Claude 협업 제작 | CGO FULI v2.9
  //  GM 번호: MIDI General MIDI 0-127 (N/A=에스닉 확장)
  // ══════════════════════════════════════════════════════════════════
  const INSTRUMENT_DATA = [
    // ① 건반/오르간 (1~24)
    { id:1,  ko:'그랜드 피아노',     en:'Acoustic Grand Piano', gm:0,   cat:'건반',  region:'서양',       emoji:'🎹', genres:['클래식','재즈','발라드'] },
    { id:2,  ko:'브라이트 피아노',   en:'Bright Acoustic Piano', gm:1,  cat:'건반',  region:'서양',       emoji:'🎹', genres:['팝','록'] },
    { id:3,  ko:'전기 그랜드',       en:'Electric Grand Piano',  gm:2,  cat:'건반',  region:'서양',       emoji:'🎹', genres:['팝','R&B'] },
    { id:4,  ko:'혼키통크 피아노',   en:'Honky-tonk Piano',      gm:3,  cat:'건반',  region:'서양',       emoji:'🎹', genres:['레트로','컨트리'] },
    { id:5,  ko:'로즈 일렉 피아노',  en:'Electric Piano (Rhodes)',gm:4, cat:'건반',  region:'서양',       emoji:'🎹', genres:['재즈','R&B','로파이'] },
    { id:6,  ko:'처디 일렉 피아노',  en:'Electric Piano 2',      gm:5,  cat:'건반',  region:'서양',       emoji:'🎹', genres:['재즈','퓨전'] },
    { id:7,  ko:'하프시코드',        en:'Harpsichord',           gm:6,  cat:'건반',  region:'서양',       emoji:'🎼', genres:['바로크','중세'] },
    { id:8,  ko:'클라비넷',          en:'Clavinet',              gm:7,  cat:'건반',  region:'서양',       emoji:'🎹', genres:['펑크','블루스'] },
    { id:9,  ko:'첼레스타',          en:'Celesta',               gm:8,  cat:'건반',  region:'서양',       emoji:'✨', genres:['클래식','뉴에이지'] },
    { id:10, ko:'글록켄슈필',        en:'Glockenspiel',          gm:9,  cat:'건반',  region:'서양',       emoji:'🔔', genres:['캐럴','동화풍'] },
    { id:11, ko:'뮤직 박스',         en:'Music Box',             gm:10, cat:'건반',  region:'서양',       emoji:'🎶', genres:['앰비언트','발라드'] },
    { id:12, ko:'비브라폰',          en:'Vibraphone',            gm:11, cat:'건반',  region:'서양',       emoji:'🎵', genres:['재즈','룸바'] },
    { id:13, ko:'마림바',            en:'Marimba',               gm:12, cat:'건반',  region:'아프리카/서양',emoji:'🪵',genres:['월드뮤직','라틴'] },
    { id:14, ko:'실로폰',            en:'Xylophone',             gm:13, cat:'건반',  region:'서양',       emoji:'🪵', genres:['클래식','오케스트라'] },
    { id:15, ko:'관악 벨',           en:'Tubular Bells',         gm:14, cat:'건반',  region:'서양',       emoji:'⛪', genres:['시네마틱','오케스트라'] },
    { id:16, ko:'덜시머',            en:'Dulcimer',              gm:15, cat:'건반',  region:'서양/중동',  emoji:'🪕', genres:['포크','중세풍'] },
    { id:17, ko:'드로우바 오르간',   en:'Drawbar Organ',         gm:16, cat:'오르간', region:'서양',       emoji:'⛪', genres:['재즈','록','가스펠'] },
    { id:18, ko:'퍼커시브 오르간',   en:'Percussive Organ',      gm:17, cat:'오르간', region:'서양',       emoji:'🎹', genres:['록','팝'] },
    { id:19, ko:'록 오르간',         en:'Rock Organ',            gm:18, cat:'오르간', region:'서양',       emoji:'🎸', genres:['하드록','팝'] },
    { id:20, ko:'교회 오르간',       en:'Church Organ',          gm:19, cat:'오르간', region:'서양',       emoji:'⛪', genres:['클래식','찬송가','고딕'] },
    { id:21, ko:'리드 오르간',       en:'Reed Organ',            gm:20, cat:'오르간', region:'서양',       emoji:'🪗', genres:['포크','찬송가'] },
    { id:22, ko:'아코디언',          en:'Accordion',             gm:21, cat:'오르간', region:'유럽',       emoji:'🪗', genres:['샹송','폴카','탱고'] },
    { id:23, ko:'하모니카',          en:'Harmonica',             gm:22, cat:'오르간', region:'서양',       emoji:'🪗', genres:['블루스','포크','컨트리'] },
    { id:24, ko:'반도네온',          en:'Tango Accordion',       gm:23, cat:'오르간', region:'아르헨티나', emoji:'🪗', genres:['탱고','월드뮤직'] },
    // ② 기타/베이스 (25~40)
    { id:25, ko:'나일론 기타',       en:'Acoustic Guitar (nylon)',gm:24, cat:'기타',  region:'서양',       emoji:'🎸', genres:['클래식','보사노바','플라멩코'] },
    { id:26, ko:'스틸 기타',         en:'Acoustic Guitar (steel)',gm:25, cat:'기타',  region:'서양',       emoji:'🎸', genres:['포크','팝','컨트리'] },
    { id:27, ko:'재즈 기타',         en:'Electric Guitar (jazz)', gm:26, cat:'기타',  region:'서양',       emoji:'🎸', genres:['재즈','라운지'] },
    { id:28, ko:'클린 기타',         en:'Electric Guitar (clean)',gm:27, cat:'기타',  region:'서양',       emoji:'🎸', genres:['팝','펑크'] },
    { id:29, ko:'뮤트 기타',         en:'Electric Guitar (muted)',gm:28, cat:'기타',  region:'서양',       emoji:'🎸', genres:['펑크','팝'] },
    { id:30, ko:'오버드라이브 기타', en:'Overdriven Guitar',     gm:29, cat:'기타',  region:'서양',       emoji:'🎸', genres:['록','하드록'] },
    { id:31, ko:'디스토션 기타',     en:'Distortion Guitar',     gm:30, cat:'기타',  region:'서양',       emoji:'🎸', genres:['헤비메탈','록'] },
    { id:32, ko:'기타 하모닉스',     en:'Guitar harmonics',      gm:31, cat:'기타',  region:'서양',       emoji:'🎸', genres:['앰비언트','록'] },
    { id:33, ko:'어쿠스틱 베이스',   en:'Acoustic Bass',         gm:32, cat:'베이스', region:'서양',       emoji:'🎻', genres:['재즈','포크'] },
    { id:34, ko:'일렉 베이스(핑거)', en:'Electric Bass (finger)', gm:33, cat:'베이스', region:'서양',       emoji:'🎸', genres:['팝','록','재즈'] },
    { id:35, ko:'일렉 베이스(피크)', en:'Electric Bass (pick)',   gm:34, cat:'베이스', region:'서양',       emoji:'🎸', genres:['록','펑크'] },
    { id:36, ko:'프렛리스 베이스',   en:'Fretless Bass',         gm:35, cat:'베이스', region:'서양',       emoji:'🎸', genres:['재즈 퓨전','발라드'] },
    { id:37, ko:'슬랩 베이스 1',     en:'Slap Bass 1',           gm:36, cat:'베이스', region:'서양',       emoji:'🎸', genres:['펑크','댄스'] },
    { id:38, ko:'슬랩 베이스 2',     en:'Slap Bass 2',           gm:37, cat:'베이스', region:'서양',       emoji:'🎸', genres:['펑크','그루브'] },
    { id:39, ko:'신스 베이스 1',     en:'Synth Bass 1',          gm:38, cat:'베이스', region:'서양',       emoji:'🎹', genres:['일렉트로닉','댄스'] },
    { id:40, ko:'신스 베이스 2',     en:'Synth Bass 2',          gm:39, cat:'베이스', region:'서양',       emoji:'🎹', genres:['신스웨이브','힙합'] },
    // ③ 현악기 (41~56)
    { id:41, ko:'바이올린',          en:'Violin',                gm:40, cat:'현악',  region:'서양',       emoji:'🎻', genres:['클래식','발라드','켈틱'] },
    { id:42, ko:'비올라',            en:'Viola',                 gm:41, cat:'현악',  region:'서양',       emoji:'🎻', genres:['클래식','실내악'] },
    { id:43, ko:'첼로',              en:'Cello',                 gm:42, cat:'현악',  region:'서양',       emoji:'🎻', genres:['클래식','시네마틱','발라드'] },
    { id:44, ko:'콘트라베이스',      en:'Contrabass',            gm:43, cat:'현악',  region:'서양',       emoji:'🎻', genres:['오케스트라','재즈'] },
    { id:45, ko:'트레몰로 스트링',   en:'Tremolo Strings',       gm:44, cat:'현악',  region:'서양',       emoji:'🎻', genres:['시네마틱','긴장감'] },
    { id:46, ko:'피치카토 스트링',   en:'Pizzicato Strings',     gm:45, cat:'현악',  region:'서양',       emoji:'🎻', genres:['클래식','경쾌한 팝'] },
    { id:47, ko:'오케스트라 하프',   en:'Orchestral Harp',       gm:46, cat:'현악',  region:'서양',       emoji:'🎼', genres:['뉴에이지','판타지'] },
    { id:48, ko:'팀파니',            en:'Timpani',               gm:47, cat:'현악',  region:'서양',       emoji:'🥁', genres:['오케스트라','웅장한 곡'] },
    { id:49, ko:'현악 앙상블 1',     en:'String Ensemble 1',     gm:48, cat:'현악',  region:'서양',       emoji:'🎻', genres:['발라드','오케스트라'] },
    { id:50, ko:'현악 앙상블 2',     en:'String Ensemble 2',     gm:49, cat:'현악',  region:'서양',       emoji:'🎹', genres:['뉴에이지','팝'] },
    { id:51, ko:'신스 스트링 1',     en:'SynthStrings 1',        gm:50, cat:'현악',  region:'서양',       emoji:'🎹', genres:['일렉트로닉','팝'] },
    { id:52, ko:'신스 스트링 2',     en:'SynthStrings 2',        gm:51, cat:'현악',  region:'서양',       emoji:'🎹', genres:['앰비언트','발라드'] },
    { id:53, ko:'합창단 콰이어',     en:'Choir Aahs',            gm:52, cat:'현악',  region:'서양',       emoji:'🗣️', genres:['오케스트라','뉴에이지'] },
    { id:54, ko:'보이스 오스',       en:'Voice Oohs',            gm:53, cat:'현악',  region:'서양',       emoji:'🗣️', genres:['앰비언트','뉴에이지'] },
    { id:55, ko:'신스 보이스',       en:'Synth Voice',           gm:54, cat:'현악',  region:'서양',       emoji:'🤖', genres:['일렉트로닉','팝'] },
    { id:56, ko:'오케스트라 히트',   en:'Orchestra Hit',         gm:55, cat:'현악',  region:'서양',       emoji:'💥', genres:['힙합','웅장한 도입부'] },
    // ④ 관악기/브라스 (57~72)
    { id:57, ko:'트럼펫',            en:'Trumpet',               gm:56, cat:'관악',  region:'서양',       emoji:'🎺', genres:['재즈','클래식','팝 브라스'] },
    { id:58, ko:'트롬본',            en:'Trombone',              gm:57, cat:'관악',  region:'서양',       emoji:'🎺', genres:['재즈','빅밴드','클래식'] },
    { id:59, ko:'투바',              en:'Tuba',                  gm:58, cat:'관악',  region:'서양',       emoji:'📯', genres:['오케스트라','행진곡'] },
    { id:60, ko:'뮤트 트럼펫',       en:'Muted Trumpet',         gm:59, cat:'관악',  region:'서양',       emoji:'🎺', genres:['재즈','느와르'] },
    { id:61, ko:'프렌치 호른',       en:'French Horn',           gm:60, cat:'관악',  region:'서양',       emoji:'📯', genres:['시네마틱','클래식'] },
    { id:62, ko:'브라스 섹션',       en:'Brass Section',         gm:61, cat:'관악',  region:'서양',       emoji:'🎺', genres:['펑크','팝','재즈'] },
    { id:63, ko:'신스 브라스 1',     en:'Synth Brass 1',         gm:62, cat:'관악',  region:'서양',       emoji:'🎹', genres:['80년대 레트로','신스팝'] },
    { id:64, ko:'신스 브라스 2',     en:'Synth Brass 2',         gm:63, cat:'관악',  region:'서양',       emoji:'🎹', genres:['일렉트로닉','EDM'] },
    { id:65, ko:'소프라노 색소폰',   en:'Soprano Sax',           gm:64, cat:'관악',  region:'서양',       emoji:'🎷', genres:['재즈','뉴에이지'] },
    { id:66, ko:'알토 색소폰',       en:'Alto Sax',              gm:65, cat:'관악',  region:'서양',       emoji:'🎷', genres:['재즈','발라드','R&B'] },
    { id:67, ko:'테너 색소폰',       en:'Tenor Sax',             gm:66, cat:'관악',  region:'서양',       emoji:'🎷', genres:['재즈','블루스','팝'] },
    { id:68, ko:'바리톤 색소폰',     en:'Baritone Sax',          gm:67, cat:'관악',  region:'서양',       emoji:'🎷', genres:['재즈 빅밴드','펑크'] },
    { id:69, ko:'오보에',            en:'Oboe',                  gm:68, cat:'관악',  region:'서양',       emoji:'🪵', genres:['클래식','목가적 뉴에이지'] },
    { id:70, ko:'잉글리시 호른',     en:'English Horn',          gm:69, cat:'관악',  region:'서양',       emoji:'🪵', genres:['클래식','서정적 발라드'] },
    { id:71, ko:'바순',              en:'Bassoon',               gm:70, cat:'관악',  region:'서양',       emoji:'🪵', genres:['클래식','오케스트라'] },
    { id:72, ko:'클라리넷',          en:'Clarinet',              gm:71, cat:'관악',  region:'서양',       emoji:'🪵', genres:['클래식','재즈'] },
    // ⑤ 플루트/에스닉 (73~90)
    { id:73, ko:'피콜로',            en:'Piccolo',               gm:72, cat:'플루트', region:'서양',       emoji:'🌬️', genres:['오케스트라','행진곡'] },
    { id:74, ko:'플루트',            en:'Flute',                 gm:73, cat:'플루트', region:'서양',       emoji:'🌬️', genres:['클래식','뉴에이지','발라드'] },
    { id:75, ko:'리코더',            en:'Recorder',              gm:74, cat:'플루트', region:'서양',       emoji:'🪈', genres:['교육용','중세풍 포크'] },
    { id:76, ko:'팬플루트',          en:'Pan Flute',             gm:75, cat:'플루트', region:'남미/서양',  emoji:'🪈', genres:['안데스 음악','뉴에이지'] },
    { id:77, ko:'블로운 보틀',       en:'Blown Bottle',          gm:76, cat:'플루트', region:'서양',       emoji:'🍾', genres:['실험적','앰비언트'] },
    { id:78, ko:'샤쿠하치',          en:'Shakuhachi',            gm:77, cat:'플루트', region:'동양(일본)', emoji:'🎋', genres:['선 명상','앰비언트'] },
    { id:79, ko:'휘슬',              en:'Whistle',               gm:78, cat:'플루트', region:'서양/켈틱',  emoji:'🌬️', genres:['켈틱 포크','아이리시'] },
    { id:80, ko:'오카리나',          en:'Ocarina',               gm:79, cat:'플루트', region:'서양',       emoji:'🪈', genres:['게임 음악','포크','뉴에이지'] },
    { id:81, ko:'시타르',            en:'Sitar',                 gm:104,cat:'에스닉', region:'동양(인도)', emoji:'🪕', genres:['인도 라가','월드뮤직'] },
    { id:82, ko:'벤조',              en:'Banjo',                 gm:105,cat:'에스닉', region:'서양(미국)', emoji:'🪕', genres:['컨트리','블루그래스','포크'] },
    { id:83, ko:'샤미센',            en:'Shamisen',              gm:106,cat:'에스닉', region:'동양(일본)', emoji:'🎸', genres:['일본 전통','현대 퓨전'] },
    { id:84, ko:'코토',              en:'Koto',                  gm:107,cat:'에스닉', region:'동양(일본)', emoji:'🎸', genres:['일본 전통','명상 앰비언트'] },
    { id:85, ko:'칼림바',            en:'Kalimba',               gm:108,cat:'에스닉', region:'아프리카',   emoji:'🎹', genres:['아프리카 민속','로파이','힐링'] },
    { id:86, ko:'백파이프',          en:'Bagpipe',               gm:109,cat:'에스닉', region:'유럽(스코틀랜드)',emoji:'🏴',genres:['켈틱','스코틀랜드 전통'] },
    { id:87, ko:'피들',              en:'Fiddle',                gm:110,cat:'에스닉', region:'유럽(아일랜드)',emoji:'🎻',genres:['켈틱 댄스','컨트리'] },
    { id:88, ko:'샤나이',            en:'Shanai',                gm:111,cat:'에스닉', region:'동양(인도)', emoji:'🎺', genres:['인도 전통 축제'] },
    { id:89, ko:'팅클 벨',           en:'Tinkle Bell',           gm:112,cat:'에스닉', region:'서양',       emoji:'🔔', genres:['크리스마스','동화풍'] },
    { id:90, ko:'아고고',            en:'Agogo',                 gm:113,cat:'에스닉', region:'아프리카/라틴',emoji:'🔔',genres:['삼바','라틴 퍼커션'] },
    // ⑥ 타악기/에스닉 확장 (91~100)
    { id:91, ko:'스틸 드럼',         en:'Steel Drums',           gm:114,cat:'타악',   region:'카리브해',   emoji:'🛢️', genres:['레게','칼립소','트로피컬'] },
    { id:92, ko:'우드블록',          en:'Woodblock',             gm:115,cat:'타악',   region:'서양/글로벌',emoji:'🪵', genres:['타악 리듬','민속 타악'] },
    { id:93, ko:'타이코 드럼',       en:'Taiko Drum',            gm:116,cat:'타악',   region:'동양(일본)', emoji:'🥁', genres:['시네마틱','웅장한 전투'] },
    // ⑥-에스닉 확장 (94~100, GM 없음 → 최근사 GM 매핑)
    { id:94, ko:'가야금',            en:'Gayageum',              gm:107,cat:'한국',   region:'동양(한국)', emoji:'🇰🇷', genres:['국악','퓨전 힐링','앰비언트'] },
    { id:95, ko:'해금',              en:'Haegeum',               gm:110,cat:'한국',   region:'동양(한국)', emoji:'🇰🇷', genres:['국악 발라드','애절한 시네마틱'] },
    { id:96, ko:'고쟁',              en:'Guzheng',               gm:107,cat:'중국',   region:'동양(중국)', emoji:'🇨🇳', genres:['중국 전통','앰비언트 뉴에이지'] },
    { id:97, ko:'우드 (루트)',        en:'Oud',                   gm:104,cat:'중동',   region:'중동',       emoji:'🪕', genres:['아랍 마캄','오리엔탈 앰비언트'] },
    { id:98, ko:'두둑',              en:'Duduk',                 gm:69, cat:'중동',   region:'중동/유럽',  emoji:'🌬️', genres:['깊은 영혼의 선율','시네마틱'] },
    { id:99, ko:'코라',              en:'Kora',                  gm:24, cat:'아프리카',region:'아프리카',   emoji:'🪕', genres:['서아프리카 월드뮤직','힐링'] },
    { id:100,ko:'디저리두',          en:'Didgeridoo',            gm:76, cat:'오세아니아',region:'오세아니아',emoji:'🪵',genres:['호주 원주민','저주파 힐링','슈만공명'] },
  ];

  // 카테고리 그룹 (UI 필터용)
  const INSTR_CATS = ['전체','건반','오르간','기타','베이스','현악','관악','플루트','에스닉','타악','한국','중국','중동','아프리카','오세아니아'];

  // 악기 ID별 미리듣기 음계 — 각 악기의 특징적인 음역
  const INSTR_PREVIEW_NOTE = {
    // 건반: 도레미파솔라시도 차례로 올라감
    1:'C4', 2:'D4', 3:'E4', 4:'F4', 5:'G4', 6:'A4', 7:'B4', 8:'C5',
    9:'E5', 10:'G5', 11:'A5', 12:'D5', 13:'F5', 14:'C6', 15:'G4', 16:'A4',
    // 오르간: 낮은 음역 (C3~A3)
    17:'C3', 18:'E3', 19:'G3', 20:'C3', 21:'F3', 22:'A3', 23:'G3', 24:'D3',
    // 기타: 개방현 음역
    25:'E3', 26:'A3', 27:'D4', 28:'G3', 29:'B3', 30:'E4', 31:'A2', 32:'E5',
    // 베이스: 저음역
    33:'E2', 34:'A2', 35:'D2', 36:'G2', 37:'C2', 38:'F2', 39:'A1', 40:'D2',
    // 현악기
    41:'A4', 42:'D4', 43:'C3', 44:'G2', 45:'E4', 46:'A3', 47:'G4', 48:'C2',
    49:'E4', 50:'G4', 51:'A4', 52:'C5', 53:'E4', 54:'G4', 55:'C5', 56:'C3',
    // 금관/목관
    57:'G4', 58:'Bb3', 59:'F2', 60:'D4', 61:'C4', 62:'F4', 63:'A4', 64:'G4',
    65:'D5', 66:'G4', 67:'C4', 68:'Bb3', 69:'A4', 70:'G4', 71:'C3', 72:'E4',
    // 플루트/에스닉
    73:'D6', 74:'G5', 75:'C5', 76:'A4', 77:'F4', 78:'D5', 79:'G5', 80:'E5',
    81:'D4', 82:'G3', 83:'A3', 84:'D4', 85:'C5', 86:'G3', 87:'D4', 88:'A3',
    89:'C6', 90:'D5', 91:'G4', 92:'C5', 93:'G3',
    // 한국/아시아/중동
    94:'D4', 95:'A4', 96:'G4', 97:'D4', 98:'A3', 99:'G4', 100:'C2',
  };

  // SLOT_DATA — 추첨통 랜덤 슬롯: 조성/음계만 (보컬·악기는 독립 카드 선택)
  const SLOT_DATA = {
    key: { label:'조성/음계', labelKey:24049, emoji:'🎵', items:['C Major','C# Major','D Major','D# Major','E Major','F Major','F# Major','G Major','G# Major','A Major','A# Major','B Major','C Minor','C# Minor','D Minor','D# Minor','E Minor','F Minor','F# Minor','G Minor','G# Minor','A Minor','A# Minor','B Minor'] }
  };

  // 보컬 선택 데이터 (독립 카드)
  const VOCAL_OPTIONS = [
    { id:'male',   emoji:'👨', label:'남성',   desc:'Male · 두텁고 깊은 울림',       color:'#60a5fa' },
    { id:'female', emoji:'👩', label:'여성',   desc:'Female · 맑고 섬세한 음색',     color:'#f472b6' },
    { id:'duet',   emoji:'👫', label:'혼성',   desc:'Duet · 남녀 하모니',            color:'#a78bfa' },
    { id:'bgm',    emoji:'🎵', label:'무보컬', desc:'BGM · 순수 기악 연주',          color:'#34d399' },
    { id:'child',  emoji:'👶', label:'어린이', desc:'Child · 동심 어린 맑은 목소리', color:'#fbbf24' },
    { id:'choir',  emoji:'🎭', label:'합창',   desc:'Choir · 웅장한 합창단',         color:'#f97316' },
  ];

  // ── 200-주파수 마스터 군집 데이터 ────────────────────────────────
  const FREQ_CLUSTERS = [
    {
      id: 'c1', emoji: '🧠', label: '뇌파 동조',
      desc: '집중·수면·스트레스 해소 / 0.1~40Hz 마인드 컨트롤',
      items: [
        { hz:'0.1Hz', ico:'🌙', desc:'극저주파 · 엔돌핀 분비 · 내장 안정' },
        { hz:'0.5Hz', ico:'💤', desc:'델타파 · 세포 재생 · 면역력 강화' },
        { hz:'0.8Hz', ico:'🔄', desc:'뇌하수체 자극 · 생체 리듬 초기화' },
        { hz:'1.0Hz', ico:'🌊', desc:'깊은 무의식 · 호르몬 균형' },
        { hz:'1.5Hz', ico:'🌿', desc:'성장 호르몬 HGH · 피로 회복' },
        { hz:'2.0Hz', ico:'🕊️', desc:'신경계 안정 · 만성 통증 완화' },
        { hz:'2.5Hz', ico:'😌', desc:'엔도르핀 · 코르티솔 감소' },
        { hz:'3.0Hz', ico:'🛌', desc:'NREM 수면 유도 · 뇌 휴식' },
        { hz:'3.4Hz', ico:'💭', desc:'REM 안정 · 꿈 심리 치유' },
        { hz:'4.0Hz', ico:'✨', desc:'세타파 진입 · 감정 정화 · 기억 정돈' },
        { hz:'4.5Hz', ico:'🔮', desc:'영적 통찰 · 자아 성찰' },
        { hz:'5.0Hz', ico:'📡', desc:'직관력 향상 · 세타파 명상' },
        { hz:'5.5Hz', ico:'🌸', desc:'내면의 평화 · 상상력 증폭' },
        { hz:'6.0Hz', ico:'🧬', desc:'장기 기억 저장 · 시냅스 활성화' },
        { hz:'6.3Hz', ico:'🎯', desc:'불안 해소 · 감정 균형 회복' },
        { hz:'7.83Hz', ico:'🌍', desc:'슈만공명 · 지구 뇌파 동조 · 접지 효과' },
        { hz:'8.0Hz', ico:'📚', desc:'학습 능력 극대화 · 정보 흡수' },
        { hz:'8.3Hz', ico:'💡', desc:'시각화 향상 · 창의 아이디어' },
        { hz:'9.0Hz', ico:'🌌', desc:'의식·무의식 경계 · 영감' },
        { hz:'10.0Hz', ico:'⭐', desc:'알파파 황금률 · 기억력 · 스트레스 해소' },
        { hz:'10.5Hz', ico:'🛡️', desc:'면역 시스템 자극 · 치유 에너지' },
        { hz:'11.0Hz', ico:'🔆', desc:'이완 속 각성 · 명확한 의식' },
        { hz:'12.0Hz', ico:'📖', desc:'차분한 집중 · 독서·학업 최적화' },
        { hz:'13.0Hz', ico:'🏃', desc:'활기찬 일상 · 저강도 베타파' },
        { hz:'14.0Hz', ico:'🧩', desc:'문제 해결 · 논리적 사고' },
        { hz:'18.0Hz', ico:'💻', desc:'주간 집중 · 업무·코딩 몰입' },
        { hz:'20.0Hz', ico:'⚡', desc:'에너지 활성화 · 졸음 방지' },
        { hz:'25.0Hz', ico:'🏋️', desc:'운동 지구력 · 퍼포먼스 향상' },
        { hz:'30.0Hz', ico:'🎯', desc:'고강도 집중 · 멀티태스킹' },
        { hz:'35.0Hz', ico:'🔥', desc:'신경계 고속 활성화 · 대뇌 자극' },
        { hz:'40.0Hz', ico:'🧠', desc:'감마파 · 초고도 집중 · 치매 예방' },
      ]
    },
    {
      id: 'c2', emoji: '🔬', label: '솔페지오',
      desc: '고대 솔페지오 · DNA 회복 · 차크라 각성 / 174~963Hz',
      items: [
        { hz:'174Hz', ico:'🦶', desc:'천연 마취제 · 통증 완화 · 안전감' },
        { hz:'285Hz', ico:'🔮', desc:'조직 재생 · 피부·뼈 회복 · 오라 보호' },
        { hz:'396Hz', ico:'🗝️', desc:'해방 · 두려움·죄책감 제거' },
        { hz:'417Hz', ico:'🌀', desc:'변화 · 트라우마 클렌징 · 부정성 타파' },
        { hz:'432Hz', ico:'💛', desc:'우주의 심장 · 자연 공명 · 힐링 표준' },
        { hz:'528Hz', ico:'💚', desc:'DNA 회복 · 기적 창조 · 무조건적 사랑' },
        { hz:'639Hz', ico:'🤝', desc:'관계 회복 · 소통 증진 · 유대감 강화' },
        { hz:'741Hz', ico:'👁️', desc:'직관 각성 · 독소 배출 · 문제 해결력' },
        { hz:'852Hz', ico:'🌟', desc:'영적 질서 · 고차원 의식 연결' },
        { hz:'963Hz', ico:'👑', desc:'송과선 활성화 · 우주적 의식 합일' },
        { hz:'111Hz', ico:'🎭', desc:'엔도르핀 · 뇌세포 자극 · 카타르시스' },
        { hz:'222Hz', ico:'☯️', desc:'균형과 조화 · 음양 조율' },
        { hz:'333Hz', ico:'🔱', desc:'삼위일체 · 영혼·육체·정신 통합' },
        { hz:'444Hz', ico:'😇', desc:'천상의 가이드 · 두려움 소멸' },
        { hz:'555Hz', ico:'🚀', desc:'변화 가속화 · 새로운 시작 에너지' },
        { hz:'666Hz', ico:'⚖️', desc:'물질·정신 조화 · 현실 균형점' },
        { hz:'777Hz', ico:'🍀', desc:'행운 · 영적 성장 · 직관 극대화' },
        { hz:'888Hz', ico:'💰', desc:'풍요 · 무한 에너지 · 금전적 풍요' },
        { hz:'999Hz', ico:'🕊️', desc:'완성·해탈 · 영혼 정화 · 사이클 마무리' },
      ]
    },
    {
      id: 'c3', emoji: '🪐', label: '코스믹·행성',
      desc: '우주 천체 주파수 · 행성 에너지 지구 음계 환산',
      items: [
        { hz:'126.22Hz', ico:'☀️', desc:'태양 · 생명력 · 자아실현 · 리더십' },
        { hz:'136.10Hz', ico:'🕉️', desc:'옴(Om)/지구공전 · 요가·명상 기본' },
        { hz:'141.27Hz', ico:'☿️', desc:'수성 · 지적 능력 · 언어·커뮤니케이션' },
        { hz:'172.06Hz', ico:'🌀', desc:'플라톤의 해 · 정신 명료함 · 카르마 정화' },
        { hz:'183.58Hz', ico:'♃', desc:'목성 · 행운·확장 · 낙관·성공 에너지' },
        { hz:'194.18Hz', ico:'🌏', desc:'지구 자전 · 그라운딩 · 생체 시계 조율' },
        { hz:'210.42Hz', ico:'🌙', desc:'달 · 감정 정화 · 여성성 · 무의식 탐구' },
        { hz:'221.23Hz', ico:'♀️', desc:'금성 · 사랑·미적 감각 · 예술적 영감' },
        { hz:'227.43Hz', ico:'♄', desc:'토성 · 인내·집중 · 책임감·구조적 사고' },
        { hz:'241.56Hz', ico:'♂️', desc:'화성 · 열정·용기 · 신체 에너지·추진력' },
        { hz:'272.20Hz', ico:'⚡', desc:'천왕성 · 혁신·돌파구 · 변화 수용' },
        { hz:'281.20Hz', ico:'🌊', desc:'해왕성 · 영감·예술 감수성 · 꿈 현실화' },
        { hz:'289.44Hz', ico:'🔥', desc:'명왕성 · 대변혁 · 새로운 자아 탄생' },
        { hz:'147.85Hz', ico:'🌕', desc:'달 공전 궤도 · 감정 기복 완화 · 평정' },
      ]
    },
    {
      id: 'c4', emoji: '🫀', label: '인체 장기',
      desc: '바이오소닉스 · 장기 고유 진동수 · 자연 치유력 유도',
      items: [
        { hz:'72.0Hz', ico:'🫄', desc:'대장 활성화 · 소화기 노폐물 배출' },
        { hz:'80.0Hz', ico:'🫁', desc:'폐·호흡기 정화 · 깊은 호흡 유도' },
        { hz:'90.0Hz', ico:'🍽️', desc:'위장·췌장 자극 · 대사 능력 촉진' },
        { hz:'100.0Hz', ico:'🫀', desc:'심장 안정 · 혈액순환 · 정서적 안정' },
        { hz:'110.0Hz', ico:'🟤', desc:'간 기능 회복 · 피로 해독 지원' },
        { hz:'120.0Hz', ico:'💧', desc:'신장·방광 정화 · 체내 수분 밸런스' },
        { hz:'130.0Hz', ico:'🦋', desc:'갑상선 호르몬 균형 · 신진대사 조절' },
        { hz:'140.0Hz', ico:'🛡️', desc:'면역 세포 활성화 · 림프 순환 촉진' },
        { hz:'150.0Hz', ico:'🦴', desc:'척추·골격 자극 · 자세 교정 · 근육 이완' },
        { hz:'160.0Hz', ico:'👁️', desc:'시신경·안구 피로 회복 · 시력 보호' },
        { hz:'200.0Hz', ico:'⚡', desc:'전신 세포막 진동 · 생체 에너지 재충전' },
        { hz:'250.0Hz', ico:'✨', desc:'피부 탄력 회복 · 항노화 세션' },
      ]
    },
    {
      id: 'c5', emoji: '🧘‍♀️', label: '차크라 7',
      desc: '인체 7 에너지 센터 · 생명력과 영적 각성 유도',
      items: [
        { hz:'194.18Hz', ico:'🔴', desc:'1차 뿌리차크라 · 생존·안전·그라운딩' },
        { hz:'210.42Hz', ico:'🟠', desc:'2차 천골차크라 · 창의력·감정 표현' },
        { hz:'126.22Hz', ico:'🟡', desc:'3차 태양신경총 · 자신감·의지력·에너지' },
        { hz:'136.10Hz', ico:'💚', desc:'4차 심장차크라 · 사랑·용서·연민' },
        { hz:'141.27Hz', ico:'🩵', desc:'5차 목차크라 · 소통·표현력·목소리' },
        { hz:'221.23Hz', ico:'💜', desc:'6차 제3의 눈 · 직관·통찰·지혜' },
        { hz:'172.06Hz', ico:'🔮', desc:'7차 정수리차크라 · 우주 합일·영적 깨달음' },
      ]
    },
    {
      id: 'c6', emoji: '🌿', label: '자연 테라피',
      desc: '백색·컬러 소음 결합 자연 사운드 · 심신 안정',
      items: [
        { hz:'핑크 노이즈', ico:'🌧️', desc:'깊은 수면 유도 · 빗소리 같은 포근함' },
        { hz:'브라운 노이즈', ico:'🌊', desc:'폭포수 저음 · ADHD 집중 · 불안 차단' },
        { hz:'그린 노이즈', ico:'🌲', desc:'숲속 바람 · 심장 안정 · 자연 회복력' },
        { hz:'블루 노이즈', ico:'💙', desc:'고음 정화 · 소음 보완 · 날카로운 산뜻함' },
        { hz:'바이올렛 노이즈', ico:'💜', desc:'이명 완화 · 신경계 자극 치료' },
        { hz:'해변 파도', ico:'🏖️', desc:'0.2Hz 파도 진동 · 세로토닌 분비' },
        { hz:'시냇물 소리', ico:'🏞️', desc:'알파파 유도 · 스트레스 이완' },
        { hz:'봄비 소리', ico:'☔', desc:'감성 안정 · 우울증 완화 · 멜랑콜리 해소' },
        { hz:'모닥불 소리', ico:'🔥', desc:'심리적 포근함 · 외로움 해소 · 아늑한 휴식' },
        { hz:'귀뚜라미 소리', ico:'🦗', desc:'여름밤 정취 · 깊은 수면 유도' },
        { hz:'새소리 오케스트라', ico:'🐦', desc:'아침 활력 · 도파민 분비 자극' },
        { hz:'천둥 저주파', ico:'⛈️', desc:'웅장한 저음 · 잡념 제거 · 딥슬립' },
        { hz:'고래의 노래', ico:'🐳', desc:'해양 저주파 공명 · 심해 같은 평온함' },
        { hz:'돌고래 초음파', ico:'🐬', desc:'뇌파 정화 · 긍정 에너지 충전' },
        { hz:'대초원 바람', ico:'🌾', desc:'몽골풍 앰비언트 · 광활한 해방감' },
        { hz:'티베트 사원 종', ico:'🔔', desc:'탁한 기운 정화 · 정신 번쩍 · 고주파 클렌징' },
      ]
    },
    {
      id: 'c7', emoji: '🎯', label: '목적별 100가지',
      desc: '상황·감정·업무·신체·영성 맞춤 마이크로 주파수 아카이브',
      subcats: [
        {
          label: '📚 학습·업무 몰입 (101~115)',
          items: [
            { hz:'14.1Hz', ico:'📝', desc:'시험 전 긴장 완화 · 순발력 극대화' },
            { hz:'15.0Hz', ico:'🗣️', desc:'장시간 암기 · 단어 외우기 최적화' },
            { hz:'16.0Hz', ico:'🎧', desc:'외국어 리스닝 · 발음 교정 집중' },
            { hz:'17.3Hz', ico:'📐', desc:'수학·논리 문제 해결 능력 촉진' },
            { hz:'19.0Hz', ico:'💬', desc:'브레인스토밍 · 아이디어 회의 활성화' },
            { hz:'21.0Hz', ico:'✍️', desc:'글쓰기·창작·카피라이팅 몰입' },
            { hz:'22.5Hz', ico:'🖥️', desc:'코딩·디버깅 집중 상태 유지' },
            { hz:'24.0Hz', ico:'⏱️', desc:'마감 직전 초고속 업무 처리' },
            { hz:'26.0Hz', ico:'🎤', desc:'프레젠테이션 전 자신감 충전' },
            { hz:'28.0Hz', ico:'☕', desc:'반복 업무 졸음 방지 · 각성' },
            { hz:'32.0Hz', ico:'📊', desc:'데이터 분석·통계 작업 몰입' },
            { hz:'36.0Hz', ico:'🔀', desc:'멀티태스킹 조율 · 우선순위 정립' },
            { hz:'38.0Hz', ico:'👑', desc:'리더십·결단력 강화 · 대뇌 자극' },
            { hz:'12.5Hz', ico:'📚', desc:'스터디 알파파 · 독서실 백색소음 대체' },
            { hz:'10.8Hz', ico:'📋', desc:'서류 검토·결재 처리 · 차분한 마인드' },
          ]
        },
        {
          label: '😴 수면·휴식 (116~130)',
          items: [
            { hz:'1.2Hz', ico:'🌑', desc:'불면증 극복 · 강제 딥슬립 유도' },
            { hz:'2.2Hz', ico:'😰', desc:'가위눌림 방지 · 신경 안정' },
            { hz:'3.2Hz', ico:'⏰', desc:'5분 만에 잠드는 수면 진입' },
            { hz:'3.6Hz', ico:'🌈', desc:'악몽 방지 · 평안한 무의식 유지' },
            { hz:'4.2Hz', ico:'🌅', desc:'상쾌한 기상 · 렘수면 마무리' },
            { hz:'2.8Hz', ico:'🌙', desc:'야간 교대 근무자 생체 리듬 보호' },
            { hz:'3.8Hz', ico:'✈️', desc:'시차 적응 · 멜라토닌 분비 촉진' },
            { hz:'1.8Hz', ico:'🌌', desc:'암흑 명상 수면 · 백색소음 결합형' },
            { hz:'2.5Hz', ico:'👶', desc:'갓난아이·반려동물 안정 슬립 주파수' },
            { hz:'4.8Hz', ico:'⚡', desc:'파워냅 20분 · 최대 피로 회복' },
            { hz:'3.5Hz', ico:'💚', desc:'숙면 중 자가 치유 극대화' },
            { hz:'2.0Hz', ico:'😤', desc:'코골이 완화 · 호흡 안정 세션' },
            { hz:'1.5Hz', ico:'🧠', desc:'과로 뇌의 완전한 다운타임 제공' },
            { hz:'4.0Hz', ico:'⏰', desc:'기상 직전 뇌를 서서히 깨우는 알람' },
            { hz:'3.1Hz', ico:'🗂️', desc:'수면 중 기억 통합 프로세스 지원' },
          ]
        },
        {
          label: '💙 감정 치유·멘탈 (131~150)',
          items: [
            { hz:'432+396Hz', ico:'😔', desc:'우울증 초기 완화 · 슬픔 극복' },
            { hz:'528+417Hz', ico:'💔', desc:'이별 상처 치유 · 미련 끊어내기' },
            { hz:'639+528Hz', ico:'💖', desc:'자존감 회복 · 스스로 사랑하기' },
            { hz:'174+285Hz', ico:'😡', desc:'분노 조절 · 즉각 진정 세션' },
            { hz:'7.83+432Hz', ico:'😰', desc:'공황발작 초기 안정 · 사회적 불안' },
            { hz:'396+741Hz', ico:'🛡️', desc:'타인 비판으로부터 상처받은 마음 보호' },
            { hz:'417+852Hz', ico:'⏰', desc:'과거 후회·죄책감에서 현재 집중' },
            { hz:'528+963Hz', ico:'🔥', desc:'번아웃 극복 · 영혼의 재충전' },
            { hz:'285+639Hz', ico:'🤗', desc:'외로움·고립감 달래는 따뜻한 위로' },
            { hz:'174+432Hz', ico:'💪', desc:'만성 피로·무기력증 탈출 부스터' },
            { hz:'396+528Hz', ico:'🌱', desc:'질투심 정화 · 마음의 여유 찾기' },
            { hz:'417+741Hz', ico:'🎯', desc:'강박·완벽주의 스트레스 내려놓기' },
            { hz:'639+852Hz', ico:'👥', desc:'대인기피 마음 치유 · 관계 상처 회복' },
            { hz:'741+963Hz', ico:'🌊', desc:'영적 성장통 · 권태기·슬럼프 극복' },
            { hz:'432+528Hz', ico:'☀️', desc:'매일 아침 긍정 에너지 모닝 세션' },
            { hz:'3.0+432Hz', ico:'🌆', desc:'퇴근길 지친 심신 힐링 아로마 공명' },
            { hz:'7.83+528Hz', ico:'🧘', desc:'주말 명상·요가 세션' },
            { hz:'174+396Hz', ico:'🎒', desc:'마음의 짐 내려놓기 디톡스' },
            { hz:'285+417Hz', ico:'🌸', desc:'갈등 직후 앙금 씻어내기' },
            { hz:'639+963Hz', ico:'🌍', desc:'지구촌 평화 · 자비·사랑 명상' },
          ]
        },
        {
          label: '💼 비즈니스·영성 (151~200)',
          items: [
            { hz:'174+528Hz', ico:'🦴', desc:'관절·근육통 완화 마사지 공명' },
            { hz:'285+528Hz', ico:'🏥', desc:'수술 후 회복 · 상처 치유 지원' },
            { hz:'432+7.83Hz', ico:'💓', desc:'혈압 안정 · 맥박수 정상화' },
            { hz:'100+528Hz', ico:'🍽️', desc:'소화 불량·체한 완화 복부 힐링' },
            { hz:'110+432Hz', ico:'🤕', desc:'두통·편두통 완화 · 뇌혈류 안정' },
            { hz:'40+528Hz', ico:'💼', desc:'중요 계약·협상 전 초고도 집중' },
            { hz:'183.58+528Hz', ico:'🌟', desc:'사업 번창 · 매출 상승 · 행운 유도' },
            { hz:'126.22+432Hz', ico:'👑', desc:'리더 카리스마 · 프로젝트 성공' },
            { hz:'888+528Hz', ico:'💰', desc:'재정적 풍요 · 금전적 안정 마인드셋' },
            { hz:'20+432Hz', ico:'🚀', desc:'출근길 활력 충전 · 비즈니스 마인드' },
            { hz:'963+852Hz', ico:'👁️', desc:'제3의 눈 완전 개방 · 직관 극대화' },
            { hz:'528+963Hz', ico:'🌌', desc:'우주적 사랑·자비 에너지 체험' },
            { hz:'432+963Hz', ico:'🎵', desc:'천상계와 지상 자연의 완전한 조화' },
            { hz:'7.83+963Hz', ico:'🌐', desc:'지구와 우주 의식 연결 · 코스믹 그라운딩' },
            { hz:'136.10+963Hz', ico:'🧘', desc:'고난도 명상 삼매(Samadhi) 진입' },
            { hz:'172.06+852Hz', ico:'♾️', desc:'카르마 정화 · 이번 생 카르마 해소' },
            { hz:'210.42+639Hz', ico:'🌙', desc:'달 에너지 · 여성성 · 내면의 신성 안식' },
            { hz:'221.23+528Hz', ico:'📚', desc:'아카식 레코드 접근 · 전생 지혜 탐구' },
            { hz:'289.44+963Hz', ico:'🦋', desc:'영혼의 대전환 · 새로운 차원 도약' },
            { hz:'111+963Hz', ico:'😇', desc:'뇌세포 이완 · 황홀한 명상 카타르시스' },
            { hz:'222+432Hz', ico:'🔥', desc:'쌍둥이 불꽃(Twin Flame) 에너지 공명' },
            { hz:'333+528Hz', ico:'천사', desc:'마스터 넘버 · 고차원 천사와 교신' },
            { hz:'444+852Hz', ico:'🛡️', desc:'영적 보호막 · 어두운 에너지 차단' },
            { hz:'777+963Hz', ico:'🍀', desc:'행운·영적 지혜 · 인생의 진리 깨달음' },
            { hz:'999+963Hz', ico:'🕊️', desc:'모든 번뇌 소멸 · 완전한 해탈과 평화' },
          ]
        }
      ]
    }
  ];

  const FREQ_OPTIONS = [
    { hz:432,  label:'432Hz',       descKey:24056, desc:'자연 공명·안정',  color:'#f59e0b' },
    { hz:528,  label:'528Hz',       descKey:24057, desc:'DNA 회복·사랑',    color:'#10b981' },
    { hz:7.83, labelKey:24059, label:'슈만공명', descKey:24058, desc:'지구 뇌파 동조', color:'#3b82f6' },
    { hz:0,    label:'OFF',         descKey:24060, desc:'순수 음악',         color:'#6b7280' }
  ];

  // ── NOTE → 주파수 맵 (Web Audio API용) ──────────────────────────
  const NOTE_FREQ = { C:261.63,'C#':277.18,D:293.66,'D#':311.13,E:329.63,F:349.23,'F#':369.99,G:392,'G#':415.3,A:440,'A#':466.16,B:493.88 };

  // ── Soundfont-Player (GM 악기 실제 사운드) ───────────────────────
  // CDN: gleitz/midi-js-soundfonts (GitHub Pages) — 서버리스, 무료
  // 로딩 전략: 악기 선택 시 lazy-load, AudioContext 공유
  const SF_BASE = 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/';
  const SF_NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

  // GM 번호 → soundfont 파일명 매핑
  function gmToSfName(gm) {
    const names = [
      'acoustic_grand_piano','bright_acoustic_piano','electric_grand_piano','honkytonk_piano',
      'electric_piano_1','electric_piano_2','harpsichord','clavinet',
      'celesta','glockenspiel','music_box','vibraphone',
      'marimba','xylophone','tubular_bells','dulcimer',
      'drawbar_organ','percussive_organ','rock_organ','church_organ',
      'reed_organ','accordion','harmonica','tango_accordion',
      'acoustic_guitar_nylon','acoustic_guitar_steel','electric_guitar_jazz','electric_guitar_clean',
      'electric_guitar_muted','overdriven_guitar','distortion_guitar','guitar_harmonics',
      'acoustic_bass','electric_bass_finger','electric_bass_pick','fretless_bass',
      'slap_bass_1','slap_bass_2','synth_bass_1','synth_bass_2',
      'violin','viola','cello','contrabass',
      'tremolo_strings','pizzicato_strings','orchestral_harp','timpani',
      'string_ensemble_1','string_ensemble_2','synthstrings_1','synthstrings_2',
      'choir_aahs','voice_oohs','synth_voice','orchestra_hit',
      'trumpet','trombone','tuba','muted_trumpet',
      'french_horn','brass_section','synth_brass_1','synth_brass_2',
      'soprano_sax','alto_sax','tenor_sax','baritone_sax',
      'oboe','english_horn','bassoon','clarinet',
      'piccolo','flute','recorder','pan_flute',
      'blown_bottle','shakuhachi','whistle','ocarina',
      'lead_1_square','lead_2_sawtooth','lead_3_calliope','lead_4_chiff',
      'lead_5_charang','lead_6_voice','lead_7_fifths','lead_8_bass_lead',
      'pad_1_new_age','pad_2_warm','pad_3_polysynth','pad_4_choir',
      'pad_5_bowed','pad_6_metallic','pad_7_halo','pad_8_sweep',
      'fx_1_rain','fx_2_soundtrack','fx_3_crystal','fx_4_atmosphere',
      'fx_5_brightness','fx_6_goblins','fx_7_echoes','fx_8_sci_fi',
      'sitar','banjo','shamisen','koto',
      'kalimba','bag_pipe','fiddle','shanai',
      'tinkle_bell','agogo','steel_drums','woodblock',
      'taiko_drum','melodic_tom','synth_drum','reverse_cymbal',
      'guitar_fret_noise','breath_noise','seashore','bird_tweet',
      'telephone_ring','helicopter','applause','gunshot'
    ];
    return names[gm] || 'acoustic_grand_piano';
  }

  // 캐시: { sfName: { [note]: AudioBuffer } }
  const sfCache = {};
  // 로딩 중 promise 캐시
  const sfLoading = {};

  // 단일 AudioContext (글로벌 공유)
  let sfAudioCtx = null;
  function getSfCtx() {
    try {
      if (!sfAudioCtx || sfAudioCtx.state === 'closed') {
        sfAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      // suspended 상태면 resume() — 브라우저 autoplay 정책 대응
      if (sfAudioCtx.state === 'suspended') {
        sfAudioCtx.resume().catch(()=>{});
      }
    } catch(e) {
      console.warn('[CGO-SF] AudioContext 생성 실패:', e.message);
      return null;
    }
    return sfAudioCtx;
  }
  // 사용자 제스처 시 AudioContext 미리 언락 (클릭/터치 이벤트에 연결)
  function unlockAudioCtx() {
    try {
      const ctx = getSfCtx();
      if (ctx && ctx.state === 'suspended') ctx.resume().catch(()=>{});
    } catch(e) {}
  }

  // 메트로놈 클릭음 (accent=1박 강조)
  function playMetroClick(accent = false) {
    try {
      const ctx = getSfCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const freq = accent ? 1200 : 800;
      const vol  = accent ? 0.55 : 0.35;
      const osc  = ctx.createOscillator();
      const g    = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.04);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(vol, now + 0.003);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(now); osc.stop(now + 0.09);
    } catch(e) {}
  }

  // Base64 데이터URI → ArrayBuffer
  function b64ToArrayBuffer(b64) {
    const bin = atob(b64);
    const buf = new ArrayBuffer(bin.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < bin.length; i++) view[i] = bin.charCodeAt(i);
    return buf;
  }

  // soundfont JSON 로드 + 캐싱
  async function loadSoundfont(gm) {
    const sfName = gmToSfName(gm);
    if (sfCache[sfName]) return sfCache[sfName];
    if (sfLoading[sfName]) return sfLoading[sfName];

    sfLoading[sfName] = (async () => {
      try {
        const url = `${SF_BASE}${sfName}-mp3.js`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('fetch fail');
        const text = await res.text();
        // midi-js-soundfonts 형식: MIDI.Soundfont.xxx = { "C4": "data:audio/mp3;base64,..." }
        const match = text.match(/=\s*(\{[\s\S]*?\})\s*;?\s*$/);
        if (!match) throw new Error('parse fail');
        const raw = JSON.parse(match[1]);
        const ctx = getSfCtx();
        const buffers = {};
        await Promise.all(Object.entries(raw).map(async ([note, dataUri]) => {
          try {
            const b64 = dataUri.split(',')[1];
            const ab = b64ToArrayBuffer(b64);
            buffers[note] = await ctx.decodeAudioData(ab);
          } catch(e) {}
        }));
        sfCache[sfName] = buffers;
        return buffers;
      } catch(e) {
        console.warn('[CGO-SF] 로드 실패:', sfName, e.message);
        sfCache[sfName] = {};
        return {};
      }
    })();

    return sfLoading[sfName];
  }

  // ── 악기별 고유 합성음 엔진 (soundfont 없을 때 Web Audio API) ──────
  // 각 악기 카테고리마다 완전히 다른 음색을 합성
  // 노트명 → 주파수 변환 (예: 'C4'=261.63, 'A4'=440, 'D5'=587.33)
  function noteNameToHz(noteName) {
    const NOTE_MAP = { 'C':0,'C#':1,'Db':1,'D':2,'D#':3,'Eb':3,'E':4,'F':5,'F#':6,'Gb':6,'G':7,'G#':8,'Ab':8,'A':9,'A#':10,'Bb':10,'B':11 };
    if (!noteName) return 261.63;
    const m = noteName.match(/^([A-G][b#]?)(\d)$/);
    if (!m) return 261.63;
    const semi = NOTE_MAP[m[1]];
    const oct  = parseInt(m[2]);
    if (semi === undefined) return 261.63;
    // A4 = 440Hz, MIDI note = (oct+1)*12 + semi, A4 = MIDI 69
    const midi = (oct + 1) * 12 + semi;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function playOscFallback(gm, duration = 1.2, volumeGain = 0.65, noteName = null) {
    try {
      const ctx = getSfCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      // ── 악기 카테고리 판별 ──
      const isPiano    = gm <= 7;
      const isChrome   = (gm >= 8 && gm <= 15);   // 첼레스타·글로켄슈필·비브라폰
      const isOrgan    = (gm >= 16 && gm <= 23);
      const isGuitar   = (gm >= 24 && gm <= 31);
      const isBass     = (gm >= 32 && gm <= 39);
      const isString   = (gm >= 40 && gm <= 51);
      const isEnsemble = (gm >= 48 && gm <= 55);
      const isWoodwind = (gm >= 64 && gm <= 79);
      const isBrass    = (gm >= 56 && gm <= 63);
      const isPad      = (gm >= 88 && gm <= 95);
      const isEthnic   = (gm >= 104 && gm <= 111) || (gm >= 94 && gm <= 103);
      const isPerc     = (gm >= 112 && gm <= 127);
      const isSax      = (gm >= 64 && gm <= 67);

      // ── 기본 주파수: noteName 있으면 정확히, 없으면 카테고리 기본값 ──
      let baseFreq;
      if (noteName) {
        baseFreq = noteNameToHz(noteName);
      } else {
        const C4 = 261.63, C3 = 130.81, C2 = 65.41;
        baseFreq = isBass ? C2 : isPerc ? 110 : isEthnic ? 293.66 : C4;
      }

      // ── 헬퍼: 오실레이터 하나 생성 ──
      const makeOsc = (type, freq, vol, attack, decay, sustainRatio = 0.3) => {
        const osc = ctx.createOscillator();
        const g   = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(vol, now + attack);
        g.gain.setValueAtTime(vol * sustainRatio, now + attack + decay);
        g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration + 0.05);
        return { osc, g };
      };

      // ── 피아노: 빠른 어택 + 긴 서스테인 + 배음 ──
      if (isPiano) {
        makeOsc('triangle', baseFreq,       volumeGain * 0.7, 0.005, 0.05, 0.4);
        makeOsc('triangle', baseFreq * 2,   volumeGain * 0.3, 0.008, 0.03, 0.2);
        makeOsc('triangle', baseFreq * 3,   volumeGain * 0.15, 0.01, 0.02, 0.1);
        // 피아노 특유의 짧은 클릭 노이즈
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.02, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
        const n = ctx.createBufferSource(); n.buffer = buf;
        const ng = ctx.createGain(); ng.gain.setValueAtTime(volumeGain * 0.15, now);
        n.connect(ng); ng.connect(ctx.destination); n.start(now);
      }
      // ── 크로마틱 타악기(첼레스타·글로켄슈필·마림바): 맑은 벨 음 ──
      else if (isChrome) {
        // FM 합성으로 금속성 벨
        const carrier = ctx.createOscillator();
        const modulator = ctx.createOscillator();
        const modGain = ctx.createGain();
        const masterGain = ctx.createGain();
        carrier.type = 'sine'; carrier.frequency.setValueAtTime(baseFreq, now);
        modulator.type = 'sine'; modulator.frequency.setValueAtTime(baseFreq * 3.5, now);
        modGain.gain.setValueAtTime(baseFreq * 8, now);
        modGain.gain.exponentialRampToValueAtTime(baseFreq * 0.1, now + 0.3);
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(volumeGain, now + 0.003);
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.5);
        modulator.connect(modGain); modGain.connect(carrier.frequency);
        carrier.connect(masterGain); masterGain.connect(ctx.destination);
        carrier.start(now); carrier.stop(now + duration * 1.5);
        modulator.start(now); modulator.stop(now + duration * 1.5);
      }
      // ── 오르간: 지속하는 배음 복합 ──
      else if (isOrgan) {
        const drawbars = [1, 2, 3, 4, 5, 6, 8];
        drawbars.forEach((h, i) => {
          const vol = volumeGain * [0.6,0.4,0.3,0.2,0.15,0.1,0.08][i] || 0.05;
          makeOsc('sine', baseFreq * h, vol, 0.015, 0.01, 0.9); // 지속
        });
      }
      // ── 기타: 빠른 피치 내림 + 감쇠 (플럭 소리) ──
      else if (isGuitar) {
        const osc = ctx.createOscillator();
        const g   = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.998, now + 0.05);
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(volumeGain * 0.8, now + 0.003);
        g.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.7);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(now); osc.stop(now + duration);
        // 보디 공명
        makeOsc('triangle', baseFreq * 0.5, volumeGain * 0.25, 0.005, 0.02, 0.3);
      }
      // ── 베이스: 깊고 두꺼운 저음 ──
      else if (isBass) {
        makeOsc('sawtooth', baseFreq,     volumeGain * 0.7, 0.01, 0.05, 0.6);
        makeOsc('square',   baseFreq * 2, volumeGain * 0.2, 0.01, 0.03, 0.4);
        // 서브 베이스
        makeOsc('sine', baseFreq * 0.5, volumeGain * 0.3, 0.02, 0.1, 0.7);
      }
      // ── 현악기: 비브라토 + 보우(활) 느낌 ──
      else if (isString) {
        const osc = ctx.createOscillator();
        const g   = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(baseFreq, now);
        // 비브라토 (~5.5Hz)
        const vib = ctx.createOscillator();
        const vibG = ctx.createGain();
        vib.type = 'sine'; vib.frequency.setValueAtTime(5.5, now);
        vibG.gain.setValueAtTime(0, now);
        vibG.gain.linearRampToValueAtTime(baseFreq * 0.012, now + 0.3); // 비브라토 서서히 증가
        vib.connect(vibG); vibG.connect(osc.frequency);
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(volumeGain * 0.65, now + 0.08); // 보우 어택
        g.gain.setValueAtTime(volumeGain * 0.55, now + 0.2);
        g.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(now); osc.stop(now + duration);
        vib.start(now); vib.stop(now + duration);
        // 고배음 (현 색깔)
        makeOsc('sawtooth', baseFreq * 2, volumeGain * 0.2, 0.1, 0.05, 0.3);
      }
      // ── 금관악기: 빠른 어택 + 배음 풍부 ──
      else if (isBrass) {
        makeOsc('sawtooth', baseFreq,     volumeGain * 0.6, 0.02, 0.05, 0.7);
        makeOsc('sawtooth', baseFreq * 2, volumeGain * 0.3, 0.025, 0.05, 0.5);
        makeOsc('sawtooth', baseFreq * 3, volumeGain * 0.15, 0.03, 0.04, 0.3);
        // 브라스 특유의 "lip buzz" 느낌
        makeOsc('square', baseFreq * 0.5, volumeGain * 0.15, 0.01, 0.08, 0.4);
      }
      // ── 목관악기/플루트/색소폰: 숨소리 + 순음 ──
      else if (isWoodwind || isSax) {
        // 브레스 노이즈
        const bufLen = Math.floor(ctx.sampleRate * duration);
        const noiseB = ctx.createBuffer(1, bufLen, ctx.sampleRate);
        const nd = noiseB.getChannelData(0);
        for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
        const noiseS = ctx.createBufferSource(); noiseS.buffer = noiseB;
        const bpf = ctx.createBiquadFilter();
        bpf.type = 'bandpass'; bpf.frequency.setValueAtTime(baseFreq * 4, now); bpf.Q.value = 2;
        const noiseG = ctx.createGain();
        noiseG.gain.setValueAtTime(0, now);
        noiseG.gain.linearRampToValueAtTime(volumeGain * 0.12, now + 0.06);
        noiseG.gain.exponentialRampToValueAtTime(0.001, now + duration);
        noiseS.connect(bpf); bpf.connect(noiseG); noiseG.connect(ctx.destination);
        noiseS.start(now); noiseS.stop(now + duration);
        // 메인 톤
        const isFlute = (gm >= 73 && gm <= 75);
        makeOsc(isFlute ? 'sine' : 'triangle', baseFreq,     volumeGain * 0.55, 0.04, 0.06, 0.75);
        makeOsc('sine', baseFreq * 2, volumeGain * (isSax ? 0.25 : 0.1), 0.05, 0.05, 0.5);
        if (isSax) makeOsc('triangle', baseFreq * 3, volumeGain * 0.1, 0.05, 0.04, 0.3);
      }
      // ── 패드/앰비언트: 느린 어택 + 스윕 ──
      else if (isPad) {
        makeOsc('sine',     baseFreq,         volumeGain * 0.5,  0.3, 0.2, 0.8);
        makeOsc('sine',     baseFreq * 1.005, volumeGain * 0.4,  0.35, 0.2, 0.8); // 약간 디튠
        makeOsc('triangle', baseFreq * 2,     volumeGain * 0.2,  0.4, 0.2, 0.6);
        makeOsc('triangle', baseFreq * 0.5,   volumeGain * 0.15, 0.5, 0.2, 0.7);
      }
      // ── 에스닉 악기: 가야금/시타르/타블라 등 개성 있는 합성 ──
      else if (isEthnic) {
        // 풍성한 플럭+감쇠 (가야금·시타르·코토 느낌)
        const pluckOsc = ctx.createOscillator();
        const pluckG = ctx.createGain();
        pluckOsc.type = 'sawtooth';
        pluckOsc.frequency.setValueAtTime(baseFreq, now);
        // 피치 빠른 감쇠 (플럭 특성)
        pluckOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.97, now + 0.1);
        pluckG.gain.setValueAtTime(0, now);
        pluckG.gain.linearRampToValueAtTime(volumeGain, now + 0.004);
        pluckG.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.8);
        pluckOsc.connect(pluckG); pluckG.connect(ctx.destination);
        pluckOsc.start(now); pluckOsc.stop(now + duration);
        // 공명 배음
        makeOsc('triangle', baseFreq * 2, volumeGain * 0.3, 0.01, 0.05, 0.2);
        makeOsc('sine',     baseFreq * 3, volumeGain * 0.15, 0.015, 0.04, 0.15);
        // 에스닉 특유의 미세 비브라토
        const vibEth = ctx.createOscillator();
        const vibEthG = ctx.createGain();
        vibEth.type = 'sine'; vibEth.frequency.setValueAtTime(7, now);
        vibEthG.gain.setValueAtTime(baseFreq * 0.008, now);
        vibEth.connect(vibEthG); vibEthG.connect(pluckOsc.frequency);
        vibEth.start(now); vibEth.stop(now + duration);
      }
      // ── 타악기: 노이즈 버스트 + 피치 드롭 ──
      else if (isPerc) {
        // 킥 드럼 느낌: 빠른 피치 드롭
        const kickOsc = ctx.createOscillator();
        const kickG   = ctx.createGain();
        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(baseFreq * 3, now);
        kickOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + 0.12);
        kickG.gain.setValueAtTime(0, now);
        kickG.gain.linearRampToValueAtTime(volumeGain, now + 0.003);
        kickG.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        kickOsc.connect(kickG); kickG.connect(ctx.destination);
        kickOsc.start(now); kickOsc.stop(now + 0.4);
        // 스네어 노이즈
        const snBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.18), ctx.sampleRate);
        const snD = snBuf.getChannelData(0);
        for (let i = 0; i < snD.length; i++) snD[i] = (Math.random() * 2 - 1) * (1 - i / snD.length);
        const snS = ctx.createBufferSource(); snS.buffer = snBuf;
        const snG = ctx.createGain(); snG.gain.setValueAtTime(volumeGain * 0.6, now);
        snS.connect(snG); snG.connect(ctx.destination); snS.start(now);
      }
      // ── 기본 폴백 (분류 안 됨) ──
      else {
        makeOsc('triangle', baseFreq,       volumeGain * 0.6, 0.02, 0.08, 0.5);
        makeOsc('sine',     baseFreq * 2,   volumeGain * 0.25, 0.02, 0.06, 0.3);
        makeOsc('sine',     baseFreq * 0.5, volumeGain * 0.2,  0.03, 0.1,  0.4);
      }
    } catch(e) {
      console.warn('[CGO-SF] 폴백 오실레이터 실패:', e.message);
    }
  }

  // 특정 GM 악기로 노트 재생 — 즉시 오실레이터 먼저, soundfont는 백그라운드 프리로드
  async function playSfNote(gm, noteName, duration = 1.2, volumeGain = 0.7) {
    // ① AudioContext 언락 (autoplay 정책)
    try {
      const ctx = getSfCtx();
      if (!ctx) { playOscFallback(gm, duration, volumeGain, noteName); return; }
      if (ctx.state === 'suspended') await ctx.resume();
    } catch(e) {}

    // ② 즉시 오실레이터로 소리 냄 (지연 없음!) — noteName으로 정확한 음계
    playOscFallback(gm, duration, volumeGain, noteName);

    // ③ soundfont 캐시가 이미 있으면 더 풍부한 소리도 겹쳐 재생
    if (gm >= 94) return; // 에스닉은 사운드폰트 없음
    const sfName = gmToSfName(gm);
    if (sfCache[sfName] && Object.keys(sfCache[sfName]).length) {
      // 캐시 히트 — soundfont 버퍼 추가 재생 (오실레이터 위에 레이어)
      try {
        const buffers = sfCache[sfName];
        const ctx = getSfCtx();
        if (!ctx) return;
        const key = buffers[noteName] ? noteName
          : buffers[noteName + '4'] ? noteName + '4'
          : Object.keys(buffers)[0];
        if (key && buffers[key]) {
          const src = ctx.createBufferSource();
          src.buffer = buffers[key];
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(volumeGain * 0.6, ctx.currentTime); // 오실레이터와 혼합
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
          src.connect(gain); gain.connect(ctx.destination);
          src.start(ctx.currentTime); src.stop(ctx.currentTime + duration);
        }
      } catch(e) {}
    } else {
      // 캐시 미스 — 백그라운드에서 조용히 프리로드 (다음 클릭 때 즉시 사용 가능)
      loadSoundfont(gm).catch(()=>{});
    }
  }

  // 코드 진행 재생 (선택된 악기 조합으로 짧은 시연)
  async function playSfChord(gmList, keyName, durationEach = 0.8) {
    // keyName 예: 'C Major', 'A Minor'
    const root = keyName ? keyName.split(' ')[0] : 'C';
    const isMinor = keyName && keyName.includes('Minor');
    // 트라이어드 노트 (C4 기준)
    const majorScale = ['C4','E4','G4','C5'];
    const minorScale = ['C4','D#4','G4','C5'];
    const notes = isMinor ? minorScale : majorScale;
    // 루트 이조
    const rootIdx = SF_NOTE_NAMES.indexOf(root);
    const shiftedNotes = notes.map(n => {
      const nm = n.replace(/[0-9]/g,'');
      const oct = parseInt(n.replace(/[^0-9]/g,''));
      const base = SF_NOTE_NAMES.indexOf(nm);
      const shifted = (base + rootIdx) % 12;
      const newOct = oct + Math.floor((base + rootIdx) / 12);
      return SF_NOTE_NAMES[shifted] + newOct;
    });

    // 최대 4개 악기만 동시에 (성능)
    const gmSlice = gmList.slice(0, 4);
    await Promise.all(gmSlice.map((gm, i) =>
      playSfNote(gm, shiftedNotes[i % shiftedNotes.length], durationEach, 0.6)
    ));
  }

  // ── CSS ─────────────────────────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('cgo-music-css-v2')) return;
    const s = document.createElement('style');
    s.id = 'cgo-music-css-v2';
    s.textContent = `
/* ─── 루트 래퍼 ─── */
/* 중앙 정렬: index.html의 .page 좌우 패딩을 상쇄하고 콘텐츠를 중앙에 배치 */
#page-music{padding:0!important;margin:0!important;}
#cgo-music-mount{width:100%;max-width:100%;margin:0;padding:0;}
#cgo-music-root{font-family:'Segoe UI','Apple SD Gothic Neo',sans-serif;background:#06000f;color:#e8d5ff;min-height:100vh;position:relative;overflow-x:hidden;padding-bottom:90px;width:100%;margin:0 auto;box-sizing:border-box;}

/* ─── 상단 헤더 바 ─── */
.cgo-mhdr{position:sticky;top:0;z-index:100;background:rgba(6,0,15,.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(168,85,247,.2);display:flex;align-items:center;padding:0 14px;height:52px;gap:10px;}
.cgo-mhdr-back{width:36px;height:36px;border-radius:10px;background:rgba(168,85,247,.12);border:1px solid rgba(168,85,247,.3);display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;color:#c084fc;flex-shrink:0;}
.cgo-mhdr-logo{display:flex;align-items:center;gap:8px;flex:1;}
.cgo-mhdr-logo-ico{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#7c3aed,#a855f7);display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 0 12px rgba(168,85,247,.45);}
.cgo-mhdr-title{font-size:15px;font-weight:800;color:#f0e6ff;letter-spacing:.01em;}
.cgo-mhdr-sub{font-size:9.5px;color:#a78bfa;margin-top:1px;}
.cgo-mhdr-badge{font-size:9px;background:linear-gradient(135deg,#7c3aed,#a855f7);border-radius:999px;padding:2px 8px;color:#fff;font-weight:700;flex-shrink:0;}

/* ─── 탭 네비 ─── */
.cgo-mtabs{display:flex;background:rgba(10,0,25,.8);border-bottom:1px solid rgba(168,85,247,.15);overflow-x:auto;scrollbar-width:none;}
.cgo-mtabs::-webkit-scrollbar{display:none;}
.cgo-mtab{flex:1;min-width:72px;padding:10px 4px 8px;text-align:center;font-size:11px;font-weight:700;color:#7c6fa8;cursor:pointer;border-bottom:2px solid transparent;transition:color .2s,border-color .2s;white-space:nowrap;}
.cgo-mtab.active{color:#c084fc;border-bottom-color:#a855f7;}
.cgo-mtab-ico{font-size:17px;display:block;margin-bottom:2px;}

/* ─── 히어로 섹션 ─── */
.cgo-mhero{position:relative;overflow:hidden;padding:32px 16px 24px;text-align:center;background:linear-gradient(180deg,#0f0028 0%,#06000f 100%);}
.cgo-mhero-canvas{position:absolute;inset:0;pointer-events:none;}
.cgo-mhero-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.35);border-radius:999px;padding:4px 14px;font-size:10.5px;color:#c084fc;font-weight:700;margin-bottom:14px;position:relative;}
.cgo-mhero-tag::before{content:'';width:7px;height:7px;border-radius:50%;background:#a855f7;animation:cgoPulse 1.8s ease-in-out infinite;}
@keyframes cgoPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}
.cgo-mhero-h1{font-size:clamp(20px,5.5vw,28px);font-weight:900;line-height:1.25;margin:0 0 8px;position:relative;}
.cgo-mhero-h1 span{background:linear-gradient(90deg,#c084fc,#f0abfc,#818cf8,#c084fc);background-size:200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:cgoGrad 4s linear infinite;}
@keyframes cgoGrad{0%{background-position:0%}100%{background-position:200%}}
.cgo-mhero-desc{font-size:12px;color:#9d8ec4;line-height:1.6;position:relative;margin:0 auto;max-width:280px;}
.cgo-mhero-chips{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:16px;position:relative;}
.cgo-mhero-chip{font-size:10px;padding:4px 12px;border-radius:999px;border:1px solid;font-weight:600;}
/* ─── 히어로 인라인 플레이어 (Suno 스타일) ─── */
.cgo-mhero-player{margin-top:18px;position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:340px;margin-left:auto;margin-right:auto;}
.cgo-hp-controls{display:flex;align-items:center;gap:18px;}
.cgo-hp-btn{background:none;border:none;color:rgba(255,255,255,.55);font-size:18px;cursor:pointer;padding:4px;line-height:1;transition:color .15s,transform .1s;font-family:inherit;}
.cgo-hp-btn:hover{color:#fff;transform:scale(1.15);}
.cgo-hp-btn:active{transform:scale(.93);}
.cgo-hp-play{width:44px;height:44px;border-radius:50%!important;background:rgba(255,255,255,.18)!important;backdrop-filter:blur(8px);border:1.5px solid rgba(255,255,255,.35)!important;color:#fff!important;font-size:17px!important;display:flex;align-items:center;justify-content:center;transition:background .18s,transform .1s!important;}
.cgo-hp-play:hover{background:rgba(255,255,255,.3)!important;}
.cgo-hp-play.active{background:linear-gradient(135deg,rgba(13,148,136,.9),rgba(20,184,166,.8))!important;border-color:rgba(20,184,166,.6)!important;}
.cgo-hp-btn.on{color:#14b8a6;}
.cgo-hp-progress-row{display:flex;align-items:center;gap:8px;width:100%;}
.cgo-hp-time{font-size:11px;font-weight:700;color:rgba(255,255,255,.5);font-variant-numeric:tabular-nums;min-width:30px;text-align:center;}
.cgo-hp-bar-wrap{flex:1;cursor:pointer;padding:6px 0;position:relative;}
.cgo-hp-bar-track{height:3px;background:rgba(255,255,255,.18);border-radius:2px;position:relative;}
.cgo-hp-bar-fill{height:100%;background:rgba(255,255,255,.8);border-radius:2px;width:0%;transition:width .25s linear;}
.cgo-hp-bar-dot{width:12px;height:12px;border-radius:50%;background:#fff;position:absolute;top:50%;transform:translate(-50%,-50%);left:0%;box-shadow:0 0 6px rgba(255,255,255,.6);transition:left .25s linear;opacity:0;}
.cgo-hp-bar-wrap:hover .cgo-hp-bar-dot{opacity:1;}
.cgo-hp-bar-wrap:hover .cgo-hp-bar-track{height:4px;}

/* ─── 섹션 공통 ─── */
.cgo-msec{padding:20px 14px 4px;}
.cgo-msec-title{font-size:13px;font-weight:800;color:#c084fc;margin:0 0 12px;display:flex;align-items:center;gap:6px;}
.cgo-msec-title::before{content:'';width:4px;height:16px;border-radius:2px;background:linear-gradient(180deg,#a855f7,#7c3aed);}

/* ─── 추첨통 슬롯 ─── */
.cgo-slot-grid{display:flex;flex-direction:column;gap:8px;}
.cgo-slot-row{background:rgba(20,5,40,.7);border:1px solid rgba(168,85,247,.2);border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:border-color .25s,background .25s,box-shadow .25s;}
.cgo-slot-row:hover{border-color:rgba(168,85,247,.55);background:rgba(30,8,60,.85);box-shadow:0 0 14px rgba(168,85,247,.18);}
.cgo-slot-row:active{background:rgba(30,8,60,.9);}
.cgo-slot-row-label{font-size:11px;color:#c4b5e8;width:68px;flex-shrink:0;line-height:1.4;font-weight:600;}
.cgo-slot-row-label b{display:block;font-size:12.5px;color:#e8d5ff;font-weight:800;}
.cgo-slot-canvas-wrap{flex:1;height:42px;overflow:hidden;border-radius:8px;background:rgba(10,0,21,.6);}
.cgo-slot-canvas-wrap canvas{width:100%;height:42px;}
.cgo-slot-row-val{font-size:11px;font-weight:800;color:#f5d0fe;width:90px;text-align:right;flex-shrink:0;line-height:1.3;transition:color .2s,text-shadow .2s;}
.cgo-slot-row:hover .cgo-slot-row-val{color:#fff;text-shadow:0 0 10px rgba(240,171,252,.7);}

/* ─── 박자(템포) 레인보우 바 ─── */
.cgo-tempo-wrap{background:rgba(20,5,40,.7);border:1px solid rgba(168,85,247,.2);border-radius:14px;padding:14px 14px 16px;cursor:default;}
.cgo-tempo-label{font-size:11px;color:#c4b5e8;margin-bottom:10px;display:flex;align-items:center;gap:6px;font-weight:700;}
.cgo-tempo-label b{font-size:12.5px;color:#e8d5ff;font-weight:800;}
.cgo-tempo-rainbow{position:relative;padding-top:28px;margin-bottom:4px;}
/* BPM 말풍선 — 썸 위에 떠있음 */
.cgo-tempo-bubble{position:absolute;top:0;transform:translateX(-50%);background:rgba(168,85,247,.95);color:#fff;font-size:11px;font-weight:800;font-variant-numeric:tabular-nums;padding:2px 7px;border-radius:6px;pointer-events:none;white-space:nowrap;transition:left .05s;box-shadow:0 2px 8px rgba(0,0,0,.4);}
.cgo-tempo-bubble::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:rgba(168,85,247,.95);}
.cgo-tempo-rainbow input[type=range]{
  width:100%;height:12px;border-radius:6px;outline:none;border:none;cursor:pointer;
  -webkit-appearance:none;appearance:none;
  touch-action:pan-x;
  background:linear-gradient(to right,
    #6366f1 0%,
    #3b82f6 22%,
    #10b981 50%,
    #f59e0b 77%,
    #ef4444 100%
  );
  box-shadow:0 0 10px rgba(168,85,247,.35);
}
.cgo-tempo-rainbow input[type=range]::-webkit-slider-thumb{
  -webkit-appearance:none;width:34px;height:34px;border-radius:50%;
  background:#fff;border:3px solid #a855f7;
  box-shadow:0 0 18px rgba(168,85,247,.85),0 2px 10px rgba(0,0,0,.5);
  cursor:pointer;transition:transform .1s,box-shadow .1s;
  /* 클릭 영역 보장 */
  -webkit-tap-highlight-color:transparent;
}
.cgo-tempo-rainbow input[type=range]::-webkit-slider-thumb:hover{
  box-shadow:0 0 24px rgba(168,85,247,1),0 0 0 6px rgba(168,85,247,.18),0 2px 10px rgba(0,0,0,.5);
}
.cgo-tempo-rainbow input[type=range]::-webkit-slider-thumb:active{
  transform:scale(1.15);
  box-shadow:0 0 28px rgba(168,85,247,1),0 0 0 10px rgba(168,85,247,.22),0 2px 10px rgba(0,0,0,.5);
}
.cgo-tempo-rainbow input[type=range]::-moz-range-thumb{
  width:34px;height:34px;border-radius:50%;border:3px solid #a855f7;
  background:#fff;box-shadow:0 0 18px rgba(168,85,247,.85);cursor:pointer;
}
/* 틱 마커 (5개 고정 위치) */
.cgo-tempo-ticks{position:relative;height:28px;margin-top:4px;margin-bottom:6px;}
.cgo-tempo-tick{position:absolute;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;}
.cgo-tempo-tick-dot{width:5px;height:5px;border-radius:50%;transition:transform .2s,box-shadow .2s;}
.cgo-tempo-tick-name{font-size:9.5px;font-weight:800;color:#c4b5e8;transition:color .2s,text-shadow .2s;white-space:nowrap;text-align:center;line-height:1.2;}
.cgo-tempo-tick:hover .cgo-tempo-tick-name{color:#fff;text-shadow:0 0 8px rgba(192,132,252,.8);}
.cgo-tempo-tick.active .cgo-tempo-tick-name{color:#f5d0fe;text-shadow:0 0 10px rgba(245,208,254,.6);}
.cgo-tempo-tick.active .cgo-tempo-tick-dot{transform:scale(1.6);box-shadow:0 0 6px currentColor;}
/* 메트로놈 안내 문구 */
.cgo-metro-hint{display:flex;align-items:center;gap:5px;font-size:10.5px;color:#a78bca;font-weight:600;text-align:center;justify-content:center;padding:5px 8px 3px;letter-spacing:-.01em;opacity:.85;}
.cgo-metro-hint-icon{font-size:13px;flex-shrink:0;animation:cgo-metro-pulse 1.6s ease-in-out infinite;}
@keyframes cgo-metro-pulse{0%,100%{opacity:.6;transform:scale(1);}50%{opacity:1;transform:scale(1.18);}}
/* 하단 정보 카드 */
.cgo-tempo-display{display:flex;align-items:center;justify-content:space-between;background:rgba(10,0,21,.6);border-radius:10px;padding:10px 14px;margin-top:6px;}
.cgo-tempo-bpm{font-size:26px;font-weight:900;font-variant-numeric:tabular-nums;line-height:1;}
.cgo-tempo-bpm-unit{font-size:12px;font-weight:700;color:#c4b5e8;margin-left:3px;}
.cgo-tempo-info{text-align:right;}
.cgo-tempo-info-name{font-size:13px;font-weight:800;}
.cgo-tempo-info-en{font-size:10.5px;color:#c4b5e8;font-weight:700;margin-top:1px;}
.cgo-tempo-info-desc{font-size:10.5px;color:#d4c4f0;font-weight:600;margin-top:3px;max-width:160px;line-height:1.4;}

/* ─── 스핀 버튼 ─── */
.cgo-spin-wrap{padding:14px 14px 4px;display:flex;gap:8px;}
.cgo-spin-btn{flex:1;padding:14px;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;color:#fff;font-size:15px;font-weight:800;cursor:pointer;letter-spacing:.04em;box-shadow:0 4px 20px rgba(168,85,247,.4);transition:transform .15s,box-shadow .15s;font-family:inherit;}
.cgo-spin-btn:hover{box-shadow:0 4px 28px rgba(168,85,247,.65);transform:translateY(-1px);}
.cgo-spin-btn:active{transform:scale(.97);box-shadow:0 2px 10px rgba(168,85,247,.3);}
.cgo-spin-btn:disabled{opacity:.5;cursor:not-allowed;}
.cgo-play-btn{width:52px;height:52px;border-radius:14px;background:rgba(168,85,247,.15);border:1.5px solid rgba(168,85,247,.4);color:#e9d5ff;font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,box-shadow .2s,color .2s;}
.cgo-play-btn:hover{background:rgba(168,85,247,.3);color:#fff;box-shadow:0 0 16px rgba(168,85,247,.5);}
.cgo-play-btn:active{background:rgba(168,85,247,.35);}

/* ─── 주파수 선택 ─── */
.cgo-freq-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;}
.cgo-freq-btn{border-radius:12px;padding:10px 4px;background:rgba(20,5,40,.7);border:1.5px solid rgba(100,60,180,.25);color:#d4c4f0;font-size:10px;font-weight:700;cursor:pointer;text-align:center;transition:all .2s;line-height:1.35;font-family:inherit;}
.cgo-freq-btn b{display:block;font-size:12.5px;margin-bottom:2px;font-weight:900;}
.cgo-freq-btn:hover{color:#fff;border-color:currentColor;background:rgba(30,8,60,.85);text-shadow:0 0 8px currentColor;}
.cgo-freq-btn.active{border-color:currentColor;background:rgba(20,5,40,.95);box-shadow:0 0 12px currentColor;color:#fff;}

/* ─── 상태 / 결과 ─── */
.cgo-status{min-height:28px;padding:0 14px;font-size:12px;font-weight:700;color:#c084fc;text-align:center;}
.cgo-result-card{background:linear-gradient(135deg,rgba(20,5,40,.9),rgba(30,8,60,.85));border:1px solid rgba(168,85,247,.3);border-radius:16px;padding:16px;margin:0 14px;}
.cgo-result-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}
.cgo-result-tag{font-size:10.5px;padding:3px 10px;border-radius:999px;background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.35);color:#e8d5ff;font-weight:700;transition:background .2s,color .2s,text-shadow .2s;}
.cgo-result-tag:hover{background:rgba(168,85,247,.3);color:#fff;text-shadow:0 0 8px rgba(168,85,247,.6);}

/* ─── 생성 버튼 ─── */
.cgo-gen-wrap{padding:14px;}
.cgo-gen-btn{width:100%;padding:16px;border-radius:16px;background:linear-gradient(135deg,#6d28d9,#7c3aed,#a855f7);border:none;color:#fff;font-size:16px;font-weight:800;cursor:pointer;letter-spacing:.04em;box-shadow:0 6px 24px rgba(168,85,247,.45);position:relative;overflow:hidden;font-family:inherit;transition:transform .15s,box-shadow .15s;}
.cgo-gen-btn:hover{box-shadow:0 8px 32px rgba(168,85,247,.7);transform:translateY(-1px);}
.cgo-gen-btn::before{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);animation:cgoShine 2.5s ease-in-out infinite;}
@keyframes cgoShine{0%{left:-100%}60%,100%{left:120%}}
.cgo-gen-btn:active{transform:scale(.98);}
.cgo-gen-btn:disabled{opacity:.5;cursor:not-allowed;}

/* ─── 차트 섹션 ─── */
.cgo-chart-list{display:flex;flex-direction:column;gap:8px;}
.cgo-chart-item{background:rgba(20,5,40,.7);border:1px solid rgba(168,85,247,.15);border-radius:12px;padding:11px 12px;display:flex;align-items:center;gap:10px;cursor:pointer;transition:border-color .2s,background .2s,box-shadow .2s;}
.cgo-chart-item:hover{border-color:rgba(168,85,247,.45);background:rgba(30,8,60,.85);box-shadow:0 0 14px rgba(168,85,247,.15);}
.cgo-chart-rank{font-family:monospace;font-size:13px;font-weight:900;color:#a855f7;width:22px;flex-shrink:0;text-align:center;}
.cgo-chart-thumb{width:38px;height:38px;border-radius:9px;background:linear-gradient(135deg,#1a003a,#3b0080);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.cgo-chart-info{flex:1;min-width:0;}
.cgo-chart-name{font-size:12.5px;font-weight:800;color:#f0e6ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .2s,text-shadow .2s;}
.cgo-chart-item:hover .cgo-chart-name{color:#fff;text-shadow:0 0 10px rgba(168,85,247,.5);}
.cgo-chart-meta{font-size:10.5px;color:#c4b5e8;font-weight:600;margin-top:2px;}
.cgo-chart-hz{font-size:11px;font-weight:800;color:#c084fc;flex-shrink:0;}

/* ─── 하단 플레이어 ─── */
.cgo-player{position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(8,0,20,.96);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-top:1px solid rgba(168,85,247,.25);padding:10px 14px;display:none;}
.cgo-player.visible{display:flex;align-items:center;gap:10px;}
.cgo-player-thumb{width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,#3b0080,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;box-shadow:0 0 12px rgba(168,85,247,.4);}
.cgo-player-info{flex:1;min-width:0;}
.cgo-player-title{font-size:12px;font-weight:800;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.cgo-player-sub{font-size:10.5px;color:#c4b5e8;font-weight:700;margin-top:1px;}
.cgo-player-progress{height:3px;background:rgba(168,85,247,.2);border-radius:2px;margin-top:5px;position:relative;overflow:hidden;}
.cgo-player-bar{height:100%;background:linear-gradient(90deg,#7c3aed,#a855f7);border-radius:2px;width:0%;transition:width .3s linear;}
.cgo-player-btns{display:flex;gap:6px;flex-shrink:0;}
.cgo-player-btn{width:38px;height:38px;border-radius:10px;background:rgba(168,85,247,.12);border:1px solid rgba(168,85,247,.3);color:#e9d5ff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s,color .2s;}
.cgo-player-btn:hover{background:rgba(168,85,247,.3);color:#fff;}
.cgo-player-btn.main{background:linear-gradient(135deg,#7c3aed,#a855f7);border-color:transparent;color:#fff;width:42px;height:42px;border-radius:12px;}

/* ─── 장르 선택 카드 ─── */
.cgo-genre-sec{padding:20px 14px 4px;}
.cgo-genre-group{margin-bottom:14px;}
.cgo-genre-group-title{font-size:11px;font-weight:800;color:#d4c4f0;margin-bottom:8px;display:flex;align-items:center;gap:6px;padding:0 2px;}
.cgo-genre-group-line{flex:1;height:1px;background:rgba(168,85,247,.18);}
.cgo-genre-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;}
.cgo-genre-card{background:rgba(20,5,40,.7);border:1.5px solid rgba(100,60,180,.2);border-radius:12px;padding:10px 11px;cursor:pointer;transition:border-color .18s,background .18s,transform .12s,box-shadow .18s;position:relative;overflow:hidden;-webkit-tap-highlight-color:transparent;}
.cgo-genre-card:hover{border-color:rgba(168,85,247,.45);background:rgba(30,8,60,.85);box-shadow:0 0 14px rgba(168,85,247,.15);}
.cgo-genre-card:active{transform:scale(.97);}
.cgo-genre-card.selected{border-color:var(--gc);background:rgba(30,8,60,.9);box-shadow:0 0 14px color-mix(in srgb, var(--gc) 35%, transparent);}
.cgo-genre-card.selected::before{content:'✓';position:absolute;top:6px;right:8px;font-size:10px;font-weight:900;color:var(--gc);}
.cgo-genre-flag{font-size:20px;line-height:1;margin-bottom:5px;}
.cgo-genre-name{font-size:12px;font-weight:800;color:#fff;line-height:1.2;}
.cgo-genre-en{font-size:9.5px;color:#c4b5e8;font-weight:700;margin-top:1px;}
.cgo-genre-country{font-size:9px;color:#c4b5e8;font-weight:600;margin-top:2px;}
.cgo-genre-desc{font-size:9px;color:#d4c4f0;font-weight:600;margin-top:5px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;transition:color .15s,text-shadow .15s;}
.cgo-genre-card:hover .cgo-genre-desc{color:#fff;text-shadow:0 0 8px rgba(220,180,255,.6);}
/* 선택 카운터 배지 */
.cgo-genre-counter{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:700;color:#e9d5ff;background:rgba(168,85,247,.18);border:1px solid rgba(168,85,247,.4);border-radius:999px;padding:3px 10px;margin-bottom:10px;}
.cgo-genre-counter-num{font-size:13px;font-weight:900;color:#fff;font-variant-numeric:tabular-nums;text-shadow:0 0 8px rgba(240,171,252,.5);}
.cgo-genre-hint{font-size:10px;color:#c4b5e8;font-weight:600;}

/* ─── 프리셋 ─── */
.cgo-preset-bar{display:flex;gap:7px;overflow-x:auto;scrollbar-width:none;padding:0 14px 4px;}
.cgo-preset-bar::-webkit-scrollbar{display:none;}
.cgo-preset-chip{flex-shrink:0;padding:6px 12px;border-radius:999px;background:rgba(168,85,247,.18);border:1px solid rgba(168,85,247,.4);color:#e9d5ff;font-size:11px;font-weight:800;cursor:pointer;font-family:inherit;transition:all .15s;}
.cgo-preset-chip:hover{color:#fff;background:rgba(168,85,247,.3);border-color:#a855f7;box-shadow:0 0 10px rgba(168,85,247,.35);text-shadow:0 0 8px rgba(240,171,252,.5);}
.cgo-preset-save{flex-shrink:0;padding:6px 12px;border-radius:999px;background:transparent;border:1px solid rgba(168,85,247,.3);color:#c4b5e8;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s;}
.cgo-preset-save:hover{color:#fff;border-color:rgba(168,85,247,.6);text-shadow:0 0 8px rgba(220,180,255,.5);}

/* ─── 200Hz 마스터 가이드 ─── */
.cgo-fmaster-wrap{padding:16px 14px 4px;}
.cgo-fmaster-title{font-size:13px;font-weight:800;color:#e9d5ff;margin:0 0 10px;display:flex;align-items:center;gap:6px;}
.cgo-fmaster-title::before{content:'';width:4px;height:16px;border-radius:2px;background:linear-gradient(180deg,#a855f7,#7c3aed);}
/* 대표 4개 */
.cgo-fmaster-top{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px;}
.cgo-fmaster-hero{border-radius:12px;padding:10px 6px;background:rgba(20,5,40,.8);border:2px solid rgba(100,60,180,.25);cursor:pointer;text-align:center;transition:all .18s;-webkit-tap-highlight-color:transparent;}
.cgo-fmaster-hero:hover{border-color:rgba(168,85,247,.5);background:rgba(30,8,60,.9);box-shadow:0 0 12px rgba(168,85,247,.25);}
.cgo-fmaster-hero:active{transform:scale(.95);}
.cgo-fmaster-hero.active{border-color:var(--fh-c);background:rgba(30,8,60,.95);box-shadow:0 0 14px color-mix(in srgb,var(--fh-c) 35%,transparent);}
.cgo-fmaster-hero-ico{font-size:18px;display:block;margin-bottom:4px;}
.cgo-fmaster-hero-hz{font-size:11px;font-weight:900;color:#f5d0fe;display:block;line-height:1.2;transition:color .15s,text-shadow .15s;}
.cgo-fmaster-hero:hover .cgo-fmaster-hero-hz{color:#fff;text-shadow:0 0 10px rgba(240,171,252,.7);}
.cgo-fmaster-hero-desc{font-size:8.5px;color:#c4b5e8;font-weight:600;margin-top:3px;line-height:1.4;transition:color .15s,text-shadow .15s;}
.cgo-fmaster-hero:hover .cgo-fmaster-hero-desc{color:#fff;text-shadow:0 0 8px rgba(220,180,255,.5);}
/* 구분선 */
.cgo-fmaster-divider{display:flex;align-items:center;gap:8px;margin:4px 0 10px;}
.cgo-fmaster-divider-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,.4),transparent);}
.cgo-fmaster-divider-txt{font-size:9.5px;font-weight:800;color:#c084fc;white-space:nowrap;text-shadow:0 0 6px rgba(192,132,252,.4);}
/* 군집 탭 */
.cgo-fmaster-tabs{display:flex;gap:5px;overflow-x:auto;scrollbar-width:none;margin-bottom:8px;padding-bottom:2px;}
.cgo-fmaster-tabs::-webkit-scrollbar{display:none;}
.cgo-fmaster-tab{flex-shrink:0;padding:5px 10px;border-radius:999px;background:rgba(20,5,40,.7);border:1.5px solid rgba(100,60,180,.25);color:#c4b5e8;font-size:10px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .18s;font-family:inherit;}
.cgo-fmaster-tab:hover{color:#fff;border-color:rgba(168,85,247,.5);text-shadow:0 0 8px rgba(220,180,255,.5);}
.cgo-fmaster-tab.active{background:rgba(30,8,60,.95);border-color:#a855f7;color:#fff;box-shadow:0 0 8px rgba(168,85,247,.3);text-shadow:0 0 8px rgba(240,171,252,.4);}
/* 군집 패널 */
.cgo-fmaster-panel{display:none;}
.cgo-fmaster-panel.active{display:block;}
.cgo-fmaster-panel-desc{font-size:10px;color:#c4b5e8;font-weight:600;margin-bottom:8px;line-height:1.5;padding:0 2px;}
/* 주파수 카드 그리드 */
.cgo-fmaster-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:5px;max-height:200px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(168,85,247,.3) transparent;padding-right:2px;}
.cgo-fmaster-grid::-webkit-scrollbar{width:3px;}
.cgo-fmaster-grid::-webkit-scrollbar-thumb{background:rgba(168,85,247,.35);border-radius:2px;}
.cgo-fmaster-card{border-radius:9px;padding:8px 9px;background:rgba(20,5,40,.7);border:1.5px solid rgba(100,60,180,.18);cursor:pointer;transition:all .15s;-webkit-tap-highlight-color:transparent;display:flex;align-items:flex-start;gap:6px;}
.cgo-fmaster-card:hover{background:rgba(30,8,60,.9);border-color:rgba(168,85,247,.45);box-shadow:0 0 8px rgba(168,85,247,.2);}
.cgo-fmaster-card:active{transform:scale(.96);}
.cgo-fmaster-card.active{border-color:#a855f7;background:rgba(30,8,60,.9);box-shadow:0 0 8px rgba(168,85,247,.3);}
.cgo-fmaster-card-ico{font-size:14px;flex-shrink:0;line-height:1;margin-top:1px;}
.cgo-fmaster-card-body{min-width:0;}
.cgo-fmaster-card-hz{font-size:10.5px;font-weight:900;color:#f5d0fe;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .15s,text-shadow .15s;}
.cgo-fmaster-card:hover .cgo-fmaster-card-hz{color:#fff;text-shadow:0 0 10px rgba(240,171,252,.7);}
.cgo-fmaster-card-desc{font-size:8.5px;color:#c4b5e8;font-weight:600;margin-top:2px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;transition:color .15s,text-shadow .15s;}
.cgo-fmaster-card:hover .cgo-fmaster-card-desc{color:#fff;text-shadow:0 0 7px rgba(220,180,255,.5);}
/* 군집7 서브카테고리 */
.cgo-fmaster-subcat{font-size:9.5px;font-weight:800;color:#e9d5ff;margin:8px 0 4px;padding:4px 8px;background:rgba(168,85,247,.12);border-radius:6px;border-left:3px solid #a855f7;}

/* ─── 아코디언 섹션 ─── */
.cgo-acc{margin:0 0 6px;border-radius:14px;overflow:hidden;border:1.5px solid rgba(100,60,180,.2);background:rgba(15,4,35,.6);}
.cgo-acc-hdr{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;cursor:pointer;user-select:none;transition:background .15s;}
.cgo-acc-hdr:hover{background:rgba(168,85,247,.08);}
.cgo-acc-hdr.open{background:rgba(168,85,247,.1);border-bottom:1px solid rgba(168,85,247,.2);}
.cgo-acc-title{font-size:13px;font-weight:800;color:#e9d5ff;}
.cgo-acc-hdr.open .cgo-acc-title{color:#fff;text-shadow:0 0 8px rgba(240,171,252,.3);}
.cgo-acc-arrow{font-size:10px;color:#c4b5e8;transition:color .15s;}
.cgo-acc-hdr.open .cgo-acc-arrow{color:#c084fc;}
.cgo-acc-body{padding:12px 0 4px;}

/* ─── 악기 선택 그리드 ─── */
.cgo-instr-filter{display:flex;flex-wrap:wrap;gap:4px;padding:0 14px 10px;}
.cgo-instr-filter-btn{padding:3px 9px;border-radius:20px;border:1px solid rgba(168,85,247,.3);background:rgba(30,10,60,.6);color:#c4b5e8;font-size:10.5px;font-weight:700;cursor:pointer;transition:all .15s;}
.cgo-instr-filter-btn.active{background:rgba(168,85,247,.35);border-color:#a855f7;color:#fff;}
.cgo-instr-info{display:flex;align-items:center;justify-content:space-between;padding:0 14px 8px;font-size:11px;color:#9d8ec8;}
.cgo-instr-info b{color:#c084fc;}
.cgo-instr-preset-bar{display:flex;flex-wrap:wrap;gap:4px;padding:0 14px 10px;}
.cgo-instr-preset-btn{padding:4px 10px;border-radius:20px;border:1.5px solid rgba(168,85,247,.4);background:rgba(20,5,45,.8);color:#e9d5ff;font-size:11px;font-weight:700;cursor:pointer;transition:all .15s;}
.cgo-instr-preset-btn:hover{background:rgba(168,85,247,.25);border-color:#c084fc;}
.cgo-instr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding:0 14px 8px;max-height:260px;overflow-y:auto;}
.cgo-instr-card{display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 6px;border-radius:10px;border:1.5px solid rgba(100,60,180,.2);background:rgba(15,4,35,.7);cursor:pointer;transition:all .2s;user-select:none;-webkit-tap-highlight-color:rgba(168,85,247,.2);touch-action:manipulation;min-height:56px;justify-content:center;}
.cgo-instr-card:hover,.cgo-instr-card:active{border-color:rgba(168,85,247,.5);background:rgba(30,8,60,.8);}
.cgo-instr-card.selected{border-color:#a855f7;background:rgba(168,85,247,.2);box-shadow:0 0 8px rgba(168,85,247,.3);}
.cgo-instr-card.disabled{opacity:.35;cursor:not-allowed;pointer-events:none;}
.cgo-instr-emoji{font-size:20px;line-height:1;pointer-events:none;}
.cgo-instr-name{font-size:9.5px;font-weight:800;color:#e9d5ff;text-align:center;line-height:1.2;pointer-events:none;}
.cgo-instr-region{font-size:8.5px;color:#9d8ec8;text-align:center;}
.cgo-instr-selected-list{padding:0 14px 8px;min-height:28px;}
.cgo-instr-selected-chips{display:flex;flex-wrap:wrap;gap:4px;}
.cgo-instr-chip{display:flex;align-items:center;gap:4px;padding:3px 8px;border-radius:14px;background:rgba(168,85,247,.25);border:1px solid rgba(168,85,247,.5);font-size:10px;color:#e9d5ff;font-weight:700;}
.cgo-instr-chip-del{cursor:pointer;color:#c084fc;font-size:11px;line-height:1;}
.cgo-instr-chip-del:hover{color:#f0abfc;}

/* ─── 음악 편집 탭 ─── */
.cgo-edit-notice{display:flex;gap:12px;align-items:flex-start;background:rgba(20,5,40,.7);border:1px solid rgba(168,85,247,.25);border-radius:14px;padding:14px;margin-bottom:14px;}
.cgo-edit-notice-ico{font-size:28px;flex-shrink:0;}
.cgo-edit-notice-txt{font-size:11px;color:#d4c4f0;font-weight:600;line-height:1.7;}
.cgo-edit-notice-txt b{color:#fff;font-size:12px;}
.cgo-edit-steps{display:flex;flex-direction:column;gap:8px;margin-bottom:16px;}
.cgo-edit-step{display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(20,5,40,.6);border:1px solid rgba(100,60,180,.2);border-radius:10px;}
.cgo-edit-step-num{width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;font-size:11px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 8px rgba(168,85,247,.3);}
.cgo-edit-step-txt{font-size:11px;color:#d4c4f0;font-weight:600;line-height:1.5;}
.cgo-edit-step-txt b{color:#fff;}
.cgo-edit-score-placeholder{background:rgba(10,2,25,.8);border:1px solid rgba(100,60,180,.25);border-radius:14px;padding:20px 16px 12px;text-align:center;}
.cgo-edit-score-staff{position:relative;height:80px;background:repeating-linear-gradient(180deg,transparent 0,transparent 13px,rgba(168,85,247,.18) 13px,rgba(168,85,247,.18) 14px) center/100% 70px no-repeat;margin-bottom:10px;}
.cgo-edit-score-clef{position:absolute;left:6px;top:50%;transform:translateY(-50%);font-size:42px;color:rgba(192,132,252,.6);line-height:1;}
.cgo-edit-score-lines{position:absolute;inset:0;}
.cgo-edit-score-note{position:absolute;font-size:22px;color:#c084fc;opacity:.7;text-shadow:0 0 8px rgba(192,132,252,.5);}
.cgo-edit-score-label{font-size:10px;color:#7c6fa8;font-weight:600;}

/* ─── 다운로드 탭 ─── */
.cgo-dl-info{font-size:11.5px;color:#d4c4f0;font-weight:600;line-height:1.7;margin-bottom:14px;padding:12px 14px;background:rgba(20,5,40,.6);border:1px solid rgba(168,85,247,.2);border-radius:12px;}
.cgo-dl-cards{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;}
.cgo-dl-card{background:rgba(20,5,40,.8);border:1.5px solid rgba(100,60,180,.25);border-radius:14px;padding:14px 12px;text-align:center;transition:all .18s;}
.cgo-dl-card:hover{border-color:rgba(168,85,247,.5);box-shadow:0 0 12px rgba(168,85,247,.2);}
.cgo-dl-card-ico{font-size:28px;margin-bottom:6px;}
.cgo-dl-card-label{font-size:12px;font-weight:800;color:#fff;margin-bottom:4px;}
.cgo-dl-card-desc{font-size:10px;color:#c4b5e8;font-weight:600;line-height:1.5;margin-bottom:10px;}
.cgo-dl-btn{width:100%;padding:8px 0;border-radius:999px;background:rgba(168,85,247,.2);border:1.5px solid rgba(168,85,247,.4);color:#e9d5ff;font-size:11px;font-weight:800;cursor:pointer;font-family:inherit;transition:all .15s;}
.cgo-dl-btn:hover{background:rgba(168,85,247,.35);color:#fff;box-shadow:0 0 10px rgba(168,85,247,.3);text-shadow:0 0 8px rgba(240,171,252,.4);}
.cgo-dl-btn.pdf{background:linear-gradient(135deg,rgba(124,58,237,.3),rgba(168,85,247,.2));border-color:rgba(168,85,247,.5);}
.cgo-dl-btn.pdf:hover{background:linear-gradient(135deg,rgba(124,58,237,.5),rgba(168,85,247,.4));box-shadow:0 0 14px rgba(168,85,247,.35);}
/* PDF 리포트 미리보기 */
.cgo-dl-report-preview{background:rgba(255,255,255,.03);border:1px solid rgba(168,85,247,.2);border-radius:14px;overflow:hidden;}
.cgo-dl-report-hdr{background:linear-gradient(135deg,rgba(124,58,237,.3),rgba(168,85,247,.15));padding:12px 14px;border-bottom:1px solid rgba(168,85,247,.2);}
.cgo-dl-report-title{font-size:12px;font-weight:800;color:#fff;margin-bottom:2px;}
.cgo-dl-report-sub{font-size:10px;color:#c4b5e8;font-weight:600;}
.cgo-dl-report-body{padding:12px 14px;}
.cgo-dl-report-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(168,85,247,.08);}
.cgo-dl-report-k{font-size:10px;color:#c4b5e8;font-weight:700;}
.cgo-dl-report-v{font-size:10.5px;color:#fff;font-weight:800;text-align:right;}
.cgo-dl-report-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,.3),transparent);margin:10px 0;}
.cgo-dl-report-analysis{font-size:10.5px;color:#d4c4f0;font-weight:600;line-height:1.8;}
.cgo-dl-report-analysis b{color:#fff;}
.cgo-dl-report-footer{padding:10px 14px;background:rgba(10,2,25,.5);font-size:9.5px;color:#7c6fa8;font-weight:600;text-align:center;border-top:1px solid rgba(168,85,247,.12);}
`;
    document.head.appendChild(s);
  }

  // ── 더미 차트 데이터 ─────────────────────────────────────────────
  const DEMO_CHART = [
    { rank:1, emoji:'🌿', name:'432Hz 자연 치유 · C Major 앰비언트', meta:'가야금 · 무보컬', hz:'432Hz' },
    { rank:2, emoji:'💫', name:'528Hz DNA 회복 · G Minor 발라드',    meta:'칼림바 · 여성',  hz:'528Hz' },
    { rank:3, emoji:'🌊', name:'슈만공명 지구 동조 · A Major 재즈',  meta:'두둑 · 혼성',    hz:'7.83Hz' },
    { rank:4, emoji:'🎋', name:'힐링 국악 · E Minor 4/4',            meta:'해금 · 남성',    hz:'432Hz' },
    { rank:5, emoji:'🌺', name:'보사노바 F Major 528Hz',              meta:'팬플루트 · 여성', hz:'528Hz' },
  ];

  // ════════════════════════════════════════════════════════════════
  class FrequencyMusicModule {
    constructor(container) {
      this.container = container;
      this.root = null;
      this._pageObs = null;  // MutationObserver 참조 (destroy/재init 시 정리)

      // 배경 canvas
      this.bgCanvas = null;
      this.bgCtx = null;
      this.bgAnimId = null;

      // 슬롯
      this.slotKeys = Object.keys(SLOT_DATA);
      this.selected = {};
      this.slotAnimIds = {};
      this.slotCanvases = {};
      this.slotCtxs = {};
      this.slotPositions = {};
      this.slotTargets = {};
      this.isSpinning = false;
      this.slotKeys.forEach(k => {
        const items = SLOT_DATA[k].items;
        this.selected[k] = items[Math.floor(Math.random() * items.length)];
        this.slotPositions[k] = 0;
        this.slotTargets[k] = 0;
      });

      this.selected.vocal = 'bgm';               // 보컬 기본값: 무보컬(BGM)
      this.tempoBpm = TEMPO_DEFAULT_BPM;
      this.selectedGenres = new Set(['ambient']); // 기본 선택: 앰비언트
      this.selectedFreq = 432;
      this.selectedInstrIds = new Set();          // 선택된 악기 ID Set (최대 12개)
      this.presets = this._loadPresets();
      this.particles = [];

      // Web Audio
      this.audioCtx = null;
      this.oscNodes = [];
      this.gainNode = null;
      this.healOsc = null;
      this.healGain = null;
      this.isPlaying = false;
      this.playTimerId = null;
      this.playProgress = 0;

      // 현재 탭
      this.activeTab = 'freq';

      // BPM 리듬 엔진
      this.rhythmTimerId = null;
      this.beatCount = 0;
      this.rhythmGain = null;

      // resize 바인딩
      this._onResize = () => this._resizeBg();
    }

    // ── init ────────────────────────────────────────────────────
    init() {
      // ─────────────────────────────────────────────────────────────
      // 재진입 안전 (idempotent) — _cgoPageSnap이 DOM을 리셋한 뒤
      // index.html이 init()을 다시 호출할 수 있음.
      // 이전 상태(애니메이션, 팝업, observer)를 먼저 정리.
      // ─────────────────────────────────────────────────────────────
      // 기존 bgCanvas 애니메이션 정리
      if (this.bgAnimId) {
        cancelAnimationFrame(this.bgAnimId);
        this.bgAnimId = null;
      }
      // 기존 MutationObserver 정리
      if (this._pageObs) {
        try { this._pageObs.disconnect(); } catch(e) {}
        this._pageObs = null;
      }
      // 기존 팝업 제거 (DOM 리셋 후 재init 시 이미 사라져 있지만 혹시 남아있을 경우 대비)
      const oldPop = document.getElementById('cgo-music-intro-pop');
      if (oldPop) { try { oldPop.remove(); } catch(e) {} }

      // ─────────────────────────────────────────────────────────────
      // 잔상(ghost) 완전 차단 전략
      // 팝업을 document.body에 즉시 삽입 → z-index:29000 fixed 전체화면
      // ─────────────────────────────────────────────────────────────
      this._buildIntroPopup();   // ← 반드시 맨 처음 (동기 실행)

      // CSS · DOM 뼈대 (동기)
      injectCSS();
      this._buildDOM();

      // 나머지는 브라우저 유휴 시간에 순차 실행 (보이는 것만 살린다)
      const idle = window.requestIdleCallback
        ? (fn, ms) => requestIdleCallback(fn, { timeout: ms })
        : (fn, ms) => setTimeout(fn, ms);

      idle(() => this._startBgCanvas(), 200);
      idle(() => this._updateResult(),  400);
      idle(() => this._watchMusicPage(), 600);
    }

    // ── 뮤직 탭 재진입 감지 → 팝업 재표시 ─────────────────────
    _watchMusicPage() {
      const pageEl = this.container.closest('[id^="page-"]')
                  || this.container.closest('.page')
                  || this.container.parentElement;
      if (!pageEl) return;

      // 현재 실제 visibility 기준으로 초기화
      // (init() 호출 시점에 페이지는 이미 visible 상태)
      const checkVisible = () => {
        const s = window.getComputedStyle(pageEl);
        return s.display !== 'none' && s.visibility !== 'hidden' && pageEl.classList.contains('active');
      };
      let _wasHidden = !checkVisible(); // 현재 보이고 있으면 false

      const obs = new MutationObserver(() => {
        const isVisible = checkVisible();

        if (isVisible && _wasHidden) {
          // ★ 다른 탭에 갔다가 뮤직으로 돌아온 경우만 팝업 재표시
          _wasHidden = false;
          if (!this.bgAnimId) this._startBgCanvas();
          // 기존 팝업 제거 후 새로 표시
          const old = document.getElementById('cgo-music-intro-pop');
          if (old) { try { old.remove(); } catch(e) {} }
          setTimeout(() => this._buildIntroPopup(), 60);

        } else if (!isVisible && !_wasHidden) {
          // 페이지가 숨겨짐 → 다음 진입 시 팝업 표시 준비
          _wasHidden = true;
          if (this.bgAnimId) {
            cancelAnimationFrame(this.bgAnimId);
            this.bgAnimId = null;
          }
        }
      });

      this._pageObs = obs;
      obs.observe(pageEl, { attributes: true, attributeFilter: ['style', 'class'] });
    }

    // ── 입구 팝업 — _cgoFDIntro 표준 팝업 함수 사용 ─────────────
    // index.html의 모든 페이지가 동일 함수로 팝업을 만든다.
    // position:fixed + top:var(--hdrH,56px) → 헤더 아래 전체화면, 치우침 없음.
    // 오늘 하루 보지 않기 = 체크박스, 로고 클릭 = 대시보드 이동 모두 내장됨.
    _buildIntroPopup() {
      // ── 오늘 하루 보지 않기 체크 (값 '1' 형식 — _cgoFDIntro 호환) ──
      const SKIP_KEY = 'cgo_music_intro_v2';
      try { if (localStorage.getItem(SKIP_KEY) === '1') return; } catch(e) {}

      // 중복 방지
      if (document.getElementById('cgo-music-intro-pop')) return;

      // ── _cgoFDIntro 표준 함수로 팝업 생성 ──
      // 없으면 최대 10회 재시도 (index.html이 아직 파싱 중일 때 대비)
      const cfg = {
        id:       'cgo-music-intro-pop',
        skipKey:  SKIP_KEY,
        __force:  true,   // skipKey 체크를 함수 내부가 아닌 위에서 이미 했으므로 강제 표시
        accent:   '#0d9488',
        accent2:  '#14b8a6',
        ico:      '🎵',
        badge:    '🌊 세계 최초 AI 치유 음악 생성기',
        title:    'CGO 주파수 뮤직',
        subtitle: '위성 × 생체 × 역학 × 힐링 주파수 × 100가지 글로벌 악기',
        summary:  'CGO FULI(미래 도서관)의 음악 모듈입니다. 힐링 주파수(432Hz · 528Hz · 7.83Hz)와 100가지 글로벌 악기를 AI가 자동 조합하여 나만의 치유 사운드를 만들어 드립니다. 악기 카드를 클릭하면 실제 사운드를 바로 미리 들을 수 있습니다 🔊',
        howtoLabel: '🗂️ 4단계 사용 순서',
        howto: [
          '🌊 STEP 1 — 주파수 탭 (첫 번째 탭)|화면 상단의 🌊 주파수 탭을 누르면 힐링 주파수 선택 화면이 나옵니다. 432Hz(안정·평화), 528Hz(사랑·치유), 7.83Hz(슈만공명), 순수음악 중 나의 목적에 맞는 주파수 카드를 탭하여 선택하세요. 선택된 카드가 강조 표시됩니다. ✅ 반드시 이 단계부터 시작해야 합니다!',
          '🎰 STEP 2 — 추첨통 탭 (두 번째 탭)|🎰 추첨통 탭을 누르면 6가지 아코디언 메뉴가 있습니다. ① 🎵 악기 선택 — 카드를 탭하면 소리 미리 듣기 + 선택, ② 🎤 보컬 선택 — 원하는 보컬 스타일 카드 탭, ③ 🎼 박자 — 슬라이더로 BPM(속도) 조절, ④ 🎰 추첨통 — [🎲 추첨통] 버튼으로 조성/음계 랜덤 추첨, ⑤ 🌍 장르 선택 — 국가별 장르 선택 가능. 설정 완료 후 하단의 ✨ AI로 음악 생성 버튼을 누르면 음악이 만들어집니다!',
          '🎼 STEP 3 — 음악 편집 탭 (세 번째 탭)|🎼 음악 편집 탭은 AI 악보 편집 기능을 준비 중입니다. 현재는 생성된 음악의 악보 구성을 미리 보며 전체 흐름을 확인할 수 있습니다. 향후 음표·박자·화음을 직접 수정하는 기능이 추가될 예정입니다. 하단 플레이어의 ▶ 재생 버튼으로 생성된 음악을 지금 바로 들어볼 수 있습니다.',
          '⬇️ STEP 4 — 다운로드 탭 (네 번째 탭)|⬇️ 다운로드 탭에서 완성된 음악을 내 기기에 저장합니다. [⬇ MP3 다운로드] — 생성된 힐링 음악을 MP3 파일로 저장, [📥 PDF 리포트 생성] — 선택한 주파수·악기·힐링 효과를 종합 분석한 PDF 리포트 생성. ⚠️ 보관 기능이 없으므로 생성 직후 바로 다운로드하세요!'
        ],
        howto2Label: '🌊 힐링 주파수 가이드',
        howto2: [
          '432Hz 자연 공명|안정 · 평화 · 편안함 — 자연의 리듬과 공명하는 주파수. 불안할 때, 잠들기 전, 명상할 때 추천',
          '528Hz DNA 회복|사랑 · 치유 · 재생 — 세포 재생에 관여한다고 알려진 주파수. 몸과 마음의 회복이 필요할 때 추천',
          '7.83Hz 슈만공명|지구 뇌파 동조 — 지구 전자기장의 고유 주파수. 집중력 향상, 깊은 명상, 접지 효과',
          '순수음악|힐링 주파수 없이 순수 악기 연주만 즐기기 — 128 GM 악기 + 세계 에스닉 악기 7종 사용 가능'
        ],
        tip: '악기 카드를 탭하면 실제 사운드를 즉시 미리 들을 수 있습니다 🔊 · 저작권은 사용자에게 있으며 상업적 이용이 가능합니다 (발생 수익의 5%는 CGO에 귀속)',
        note: '힐링 주파수는 과학적으로 검증된 의료 효과를 주장하지 않습니다. 심신 안정을 위한 음악 감상 용도로 활용하세요.',
        btnLabel: '🎵 CGO 뮤직 시작하기',
        launch: ''   // 버튼 클릭 시 팝업 닫기만 (launch 없으면 _cgoFDIntro가 remove만 함)
      };

      const _injectPromptBox = () => {
        const pop = document.getElementById('cgo-music-intro-pop');
        if (!pop) return;
        // summary 카드 바로 다음에 스마트 프롬프트 박스 삽입
        const summaryEl = pop.querySelector('div[style*="border-radius:12px"]');
        if (!summaryEl || pop.querySelector('#cgo-smart-prompt-box')) return;

        const ac = '#0d9488';
        const promptBox = document.createElement('div');
        promptBox.id = 'cgo-smart-prompt-box';
        promptBox.style.cssText = 'background:linear-gradient(135deg,rgba(13,148,136,.08),rgba(20,184,166,.05));border:1.5px solid rgba(13,148,136,.35);border-radius:14px;padding:15px 14px 14px;margin-bottom:13px;';
        promptBox.innerHTML = `
          <div style="font-size:11px;font-weight:800;color:#0d9488;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
            <span style="font-size:15px;">💬</span>
            <span>스마트 프롬프트 — 말 한마디로 뚝딱!</span>
          </div>
          <div style="font-size:10.5px;color:#475569;line-height:1.6;margin-bottom:10px;">
            원하는 분위기를 자유롭게 적으면 AI가 주파수·악기·박자를 자동 세팅해 드립니다.
          </div>
          <textarea id="cgo-prompt-input" rows="2" placeholder="예) 비 오는 밤, 마음을 차분하게 가라앉혀 주는 몽환적인 국악 힐링 곡"
            style="width:100%;box-sizing:border-box;background:#fff;border:1.5px solid rgba(13,148,136,.3);border-radius:10px;padding:11px 12px;font-size:12px;color:#0f172a;line-height:1.65;resize:none;font-family:inherit;outline:none;transition:border-color .15s;"
            onfocus="this.style.borderColor='#0d9488'" onblur="this.style.borderColor='rgba(13,148,136,.3)'"></textarea>
          <button id="cgo-prompt-go-btn"
            style="margin-top:9px;width:100%;padding:12px;background:linear-gradient(135deg,#0d9488,#14b8a6);border:none;border-radius:11px;color:#fff;font-size:13px;font-weight:900;cursor:pointer;font-family:inherit;letter-spacing:.01em;"
            >✨ 이 분위기로 시작하기</button>
        `;

        // summary 다음에 삽입
        summaryEl.parentNode.insertBefore(promptBox, summaryEl.nextSibling);

        // 버튼 클릭 → 추후 파싱 엔진 연결 자리 (현재는 팝업 닫기 + 추첨통 탭 이동)
        promptBox.querySelector('#cgo-prompt-go-btn').addEventListener('click', () => {
          const txt = (document.getElementById('cgo-prompt-input') || {}).value || '';
          // 스마트 프롬프트 텍스트를 모듈 인스턴스에 전달
          try {
            const mod = window._cgoMusicMod || window.CGO_MUSIC;
            if (mod && typeof mod._applySmartPrompt === 'function') {
              mod._applySmartPrompt(txt);
            }
          } catch(e) {}
          // 오늘 하루 보지 않기 체크 반영
          try {
            const cb = document.getElementById('cgo-music-intro-pop-skip');
            if (cb && cb.checked) localStorage.setItem(SKIP_KEY, '1');
          } catch(e) {}
          pop.remove();
          // 추첨통 탭으로 자동 이동 (프롬프트 입력한 경우)
          if (txt.trim()) {
            setTimeout(() => {
              try {
                const mod = window._cgoMusicMod || window.CGO_MUSIC;
                if (mod && typeof mod._switchTab === 'function') mod._switchTab('make');
              } catch(e) {}
            }, 80);
          }
        });
      };

      if (typeof window._cgoFDIntro === 'function') {
        window._cgoFDIntro(cfg);
        // 팝업 DOM이 body에 붙은 직후 프롬프트 박스 주입
        requestAnimationFrame(() => _injectPromptBox());
      } else {
        // 폴백: 최대 10회 × 200ms 재시도
        let _tries = 0;
        const _retry = setInterval(() => {
          _tries++;
          if (typeof window._cgoFDIntro === 'function') {
            clearInterval(_retry);
            if (!document.getElementById('cgo-music-intro-pop')) {
              window._cgoFDIntro(cfg);
              requestAnimationFrame(() => _injectPromptBox());
            }
          } else if (_tries >= 10) {
            clearInterval(_retry);
            console.warn('[CGO-MUSIC] _cgoFDIntro 함수를 찾을 수 없습니다.');
          }
        }, 200);
      }
    }

    // ── DOM 빌드 ────────────────────────────────────────────────
    _buildDOM() {
      // 재init 시 기존 root가 container에 남아있을 경우 제거
      const existingRoot = this.container.querySelector('#cgo-music-root');
      if (existingRoot) { try { existingRoot.remove(); } catch(e) {} }

      this.root = document.createElement('div');
      this.root.id = 'cgo-music-root';
      this.container.appendChild(this.root);

      // ─ 헤더 ─
      const hdr = document.createElement('header');
      hdr.className = 'cgo-mhdr';
      hdr.innerHTML = `
        <div class="cgo-mhdr-back" id="cgo-mhdr-back">‹</div>
        <div class="cgo-mhdr-logo">
          <div class="cgo-mhdr-logo-ico">🎵</div>
          <div>
            <div class="cgo-mhdr-title" data-k="24042">${t(24042)}</div>
            <div class="cgo-mhdr-sub" data-k="24043">${t(24043)}</div>
          </div>
        </div>
        <div class="cgo-mhdr-badge" data-k="24044">${t(24044)}</div>
      `;
      this.root.appendChild(hdr);
      hdr.querySelector('#cgo-mhdr-back').addEventListener('click', () => {
        const nav = window.cgoGoPage || (typeof global !== 'undefined' && global.cgoGoPage);
        if (typeof nav === 'function') {
          try { nav('dashboard'); } catch(e) {
            const btn = document.querySelector('[onclick*="dashboard"]');
            if (btn) btn.click();
          }
        }
      });

      // ─ 탭 ─
      const tabs = document.createElement('nav');
      tabs.className = 'cgo-mtabs';
      tabs.innerHTML = `
        <div class="cgo-mtab active" data-tab="freq"><span class="cgo-mtab-ico">🌊</span><span data-k="24047">${t(24047)}</span></div>
        <div class="cgo-mtab" data-tab="make"><span class="cgo-mtab-ico">🎰</span><span data-k="24045">${t(24045)}</span></div>
        <div class="cgo-mtab" data-tab="edit"><span class="cgo-mtab-ico">🎼</span><span>음악 편집</span></div>
        <div class="cgo-mtab" data-tab="download"><span class="cgo-mtab-ico">⬇️</span><span>다운로드</span></div>
      `;
      this.root.appendChild(tabs);
      tabs.querySelectorAll('.cgo-mtab').forEach(t => {
        t.addEventListener('click', () => { if (typeof window._spd2Mark === 'function') window._spd2Mark('music'); this._switchTab(t.dataset.tab); });
      });
      this.tabsEl = tabs;

      // ─ 히어로 ─
      const hero = document.createElement('section');
      hero.className = 'cgo-mhero';
      hero.innerHTML = `
        <canvas class="cgo-mhero-canvas" id="cgo-bg-canvas"></canvas>
        <div class="cgo-mhero-tag">🛰️ CGO-FULI · <span data-k="24044">${t(24044)}</span></div>
        <h2 class="cgo-mhero-h1"><span data-k="24043">${t(24043)}</span></h2>
        <p class="cgo-mhero-desc" data-k="24044">${t(24044)}</p>
        <div class="cgo-mhero-player" id="cgo-hero-player">
          <div class="cgo-hp-controls">
            <button class="cgo-hp-btn" id="cgo-hp-shuffle" title="셔플">⇄</button>
            <button class="cgo-hp-btn" id="cgo-hp-prev" title="이전">⏮</button>
            <button class="cgo-hp-btn cgo-hp-play" id="cgo-hp-play" title="재생/일시정지">▶</button>
            <button class="cgo-hp-btn" id="cgo-hp-next" title="다음">⏭</button>
            <button class="cgo-hp-btn" id="cgo-hp-repeat" title="반복">↺</button>
          </div>
          <div class="cgo-hp-progress-row">
            <span class="cgo-hp-time" id="cgo-hp-cur">0:00</span>
            <div class="cgo-hp-bar-wrap" id="cgo-hp-bar-wrap">
              <div class="cgo-hp-bar-track">
                <div class="cgo-hp-bar-fill" id="cgo-hp-bar-fill"></div>
                <div class="cgo-hp-bar-dot" id="cgo-hp-bar-dot"></div>
              </div>
            </div>
            <span class="cgo-hp-time" id="cgo-hp-dur">0:00</span>
          </div>
        </div>
      `;
      this.root.appendChild(hero);
      this.bgCanvas = hero.querySelector('#cgo-bg-canvas');
      this.bgCtx = this.bgCanvas.getContext('2d');
      this._resizeBg();
      window.addEventListener('resize', this._onResize);

      // ─ 히어로 플레이어 버튼 이벤트 ─
      this._heroShuffle  = false;
      this._heroRepeat   = false;
      const hpPlay    = hero.querySelector('#cgo-hp-play');
      const hpPrev    = hero.querySelector('#cgo-hp-prev');
      const hpNext    = hero.querySelector('#cgo-hp-next');
      const hpShuffle = hero.querySelector('#cgo-hp-shuffle');
      const hpRepeat  = hero.querySelector('#cgo-hp-repeat');
      const hpBarWrap = hero.querySelector('#cgo-hp-bar-wrap');

      hpPlay.addEventListener('click', () => {
        unlockAudioCtx(); // 🔓 히어로 플레이어 클릭 시 AudioContext 언락
        this._togglePlay();
        hpPlay.classList.toggle('active', !!this.isPlaying);
        hpPlay.textContent = this.isPlaying ? '⏸' : '▶';
      });
      hpPrev.addEventListener('click', () => { this._stopAudio(); this._syncHeroPlayer(0); });
      hpNext.addEventListener('click', () => { this._stopAudio(); this._syncHeroPlayer(0); });
      hpShuffle.addEventListener('click', () => {
        this._heroShuffle = !this._heroShuffle;
        hpShuffle.classList.toggle('on', this._heroShuffle);
        hpShuffle.style.color = this._heroShuffle ? '#14b8a6' : '';
      });
      hpRepeat.addEventListener('click', () => {
        this._heroRepeat = !this._heroRepeat;
        hpRepeat.classList.toggle('on', this._heroRepeat);
        hpRepeat.style.color = this._heroRepeat ? '#14b8a6' : '';
      });
      // 프로그레스바 클릭으로 탐색
      hpBarWrap.addEventListener('click', (e) => {
        const rect = hpBarWrap.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this._seekAudio && this._seekAudio(ratio);
        this._syncHeroPlayer(ratio);
      });
      this._hpPlayBtn = hpPlay;
      this._hpBarFill = hero.querySelector('#cgo-hp-bar-fill');
      this._hpBarDot  = hero.querySelector('#cgo-hp-bar-dot');
      this._hpCurEl   = hero.querySelector('#cgo-hp-cur');
      this._hpDurEl   = hero.querySelector('#cgo-hp-dur');

      // ─ 탭 콘텐츠 패널들 (빈 껍데기만 생성) ─
      // 보이는 것만 살린다: 첫 탭(freq)만 즉시 빌드, 나머지는 클릭 시 lazy 빌드
      this.panels = {};
      this._panelBuilt = {};  // 탭별 빌드 여부 추적
      ['freq','make','chart','preset','edit','download'].forEach(tab => {
        const panel = document.createElement('div');
        panel.id = `cgo-panel-${tab}`;
        panel.style.display = tab === 'freq' ? 'block' : 'none';
        this.root.appendChild(panel);
        this.panels[tab] = panel;
      });

      // 첫 화면에 보이는 freq 탭만 즉시 빌드
      this._buildFreqPanel();
      this._panelBuilt['freq'] = true;

      // ─ 하단 플레이어 ─
      const player = document.createElement('div');
      player.className = 'cgo-player';
      player.id = 'cgo-player';
      player.innerHTML = `
        <div class="cgo-player-thumb" id="cgo-player-thumb">🎵</div>
        <div class="cgo-player-info">
          <div class="cgo-player-title" id="cgo-player-title">CGO 주파수 음악</div>
          <div class="cgo-player-sub" id="cgo-player-sub">432Hz · C Major</div>
          <div class="cgo-player-progress"><div class="cgo-player-bar" id="cgo-player-bar"></div></div>
        </div>
        <div class="cgo-player-btns">
          <button class="cgo-player-btn main" id="cgo-player-play">▶</button>
          <button class="cgo-player-btn" id="cgo-player-stop">■</button>
        </div>
      `;
      this.root.appendChild(player);
      this.playerEl = player;
      player.querySelector('#cgo-player-play').addEventListener('click', () => { unlockAudioCtx(); this._togglePlay(); });
      player.querySelector('#cgo-player-stop').addEventListener('click', () => { unlockAudioCtx(); this._stopAudio(); });
    }

    // ── 추첨통 패널 ─────────────────────────────────────────────
    _buildMakePanel() {
      const p = this.panels.make;

      // ── 아코디언 헬퍼: 각 섹션 독립 토글 ──────────────────────
      const mkAccordion = (emoji, title, bodyBuilder, openByDefault = false) => {
        const wrap = document.createElement('div');
        wrap.className = 'cgo-acc';

        const hdr = document.createElement('div');
        hdr.className = 'cgo-acc-hdr' + (openByDefault ? ' open' : '');
        hdr.innerHTML = `<span class="cgo-acc-title">${emoji} ${title}</span><span class="cgo-acc-arrow">${openByDefault ? '▲' : '▼'}</span>`;

        const body = document.createElement('div');
        body.className = 'cgo-acc-body';
        body.style.display = openByDefault ? 'block' : 'none';

        bodyBuilder(body);

        hdr.addEventListener('click', () => {
          if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
          const isOpen = body.style.display !== 'none';
          body.style.display = isOpen ? 'none' : 'block';
          hdr.classList.toggle('open', !isOpen);
          hdr.querySelector('.cgo-acc-arrow').textContent = isOpen ? '▼' : '▲';
        });

        wrap.appendChild(hdr);
        wrap.appendChild(body);
        return wrap;
      };

      // ① 장르 (기본 닫힘) — 악기 선택 위로 이동
      p.appendChild(mkAccordion('🌍', t(24051), (body) => {
        body.appendChild(this._buildGenreSection());
      }, false));

      // ② 악기 (기본 닫힘)
      p.appendChild(mkAccordion('🎵', '악기 선택', (body) => {
        this._buildInstrumentSection(body);
      }, false));

      // ③ 보컬 선택 (기본 닫힘)
      p.appendChild(mkAccordion('🎤', '보컬 선택', (body) => {
        this._buildVocalSection(body);
      }, false));

      // ④ 박자 (기본 닫힘)
      p.appendChild(mkAccordion('🎼', t(24050), (body) => {
        body.appendChild(this._buildTempoBar());
      }, false));

      // ⑤ 추첨통 슬롯 — 🎲 조성/음계 랜덤 (기본 닫힘)
      p.appendChild(mkAccordion('🎰', t(24045), (body) => {
        const grid = document.createElement('div');
        grid.className = 'cgo-slot-grid';
        body.appendChild(grid);

        this.slotKeys.forEach(k => {
          const info = SLOT_DATA[k];
          const row = document.createElement('div');
          row.className = 'cgo-slot-row';
          row.innerHTML = `
            <div class="cgo-slot-row-label"><b>${info.emoji} <span data-k="${info.labelKey}">${t(info.labelKey)}</span></b></div>
            <div class="cgo-slot-canvas-wrap"><canvas id="cgo-sc-${k}"></canvas></div>
            <div class="cgo-slot-row-val" id="cgo-val-${k}">${this.selected[k]}</div>
          `;
          row.addEventListener('click', () => { if (!this.isSpinning) this._spinOne(k); });
          grid.appendChild(row);

          const canvas = row.querySelector(`#cgo-sc-${k}`);
          this.slotCanvases[k] = canvas;
          this.slotCtxs[k] = canvas.getContext('2d');
          this._resizeSlot(k);
          this._drawSlot(k, 0);
        });

        // 스핀 + 플레이 버튼
        const spinWrap = document.createElement('div');
        spinWrap.className = 'cgo-spin-wrap';
        spinWrap.innerHTML = `
          <button class="cgo-spin-btn" id="cgo-spin-btn" data-k="24054">🎲 ${t(24045)}</button>
          <button class="cgo-play-btn" id="cgo-quick-play" title="▶">▶</button>
        `;
        body.appendChild(spinWrap);
        spinWrap.querySelector('#cgo-spin-btn').addEventListener('click', () => { if (typeof window._spd2Mark === 'function') window._spd2Mark('music'); unlockAudioCtx(); this._spinAll(); });
        spinWrap.querySelector('#cgo-quick-play').addEventListener('click', () => { if (typeof window._spd2Mark === 'function') window._spd2Mark('music'); unlockAudioCtx(); this._quickPlay(); });
      }, false));

      // ── 💬 스마트 프롬프트 카드 (추첨통 아코디언 바로 아래 · 독립 카드) ──
      const promptCard = document.createElement('div');
      promptCard.id = 'cgo-make-prompt-card';
      // 팝업과 동일한 라이트 스타일 (테두리형 카드)
      promptCard.style.cssText = [
        'margin:10px 0 2px;',
        'background:linear-gradient(135deg,rgba(13,148,136,.08),rgba(20,184,166,.05));',
        'border:1.5px solid rgba(13,148,136,.35);',
        'border-radius:14px;',
        'padding:15px 14px 14px;',
        'box-sizing:border-box;',
      ].join('');
      promptCard.innerHTML = `
        <!-- 헤더 라벨 (팝업과 동일) -->
        <div style="font-size:11px;font-weight:800;color:#0d9488;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
          <span style="font-size:15px;">💬</span>
          <span>스마트 프롬프트 — 말 한마디로 뚝딱!</span>
        </div>

        <!-- 현재 설정 칩 영역 -->
        <div id="cgo-prompt-chips-wrap" style="margin-bottom:9px;display:flex;flex-wrap:wrap;gap:5px;min-height:20px;">
          <span id="cgo-prompt-chips-placeholder" style="font-size:10px;color:#64748b;font-style:italic;">설정을 선택하면 여기에 표시됩니다</span>
        </div>

        <!-- 설명 텍스트 (팝업과 동일) -->
        <div style="font-size:10.5px;color:#475569;line-height:1.6;margin-bottom:10px;">
          원하는 분위기를 자유롭게 적으면 AI가 주파수·악기·박자를 자동 세팅해 드립니다.
        </div>

        <!-- 입력 textarea (팝업과 동일 라이트 스타일) -->
        <textarea id="cgo-make-prompt-input" rows="2"
          placeholder="예) 비 오는 밤, 마음을 차분하게 가라앉혀 주는 몽환적인 국악 힐링 곡"
          style="width:100%;box-sizing:border-box;background:#fff;border:1.5px solid rgba(13,148,136,.3);border-radius:10px;padding:11px 12px;font-size:12px;color:#0f172a;line-height:1.65;resize:none;font-family:inherit;outline:none;transition:border-color .15s;"></textarea>

        <!-- 적용 버튼 (팝업과 동일) -->
        <button id="cgo-make-prompt-btn"
          style="margin-top:9px;width:100%;padding:12px;background:linear-gradient(135deg,#0d9488,#14b8a6);border:none;border-radius:11px;color:#fff;font-size:13px;font-weight:900;cursor:pointer;font-family:inherit;letter-spacing:.01em;box-shadow:0 3px 12px rgba(13,148,136,.35);transition:opacity .15s;">
          ✨ 이 분위기로 시작하기
        </button>
      `;

      // textarea 포커스 효과
      const ta = promptCard.querySelector('#cgo-make-prompt-input');
      ta.addEventListener('focus', () => { ta.style.borderColor = '#0d9488'; });
      ta.addEventListener('blur',  () => { ta.style.borderColor = 'rgba(13,148,136,.3)'; });

      p.appendChild(promptCard);

      // ── 현재 설정 칩 실시간 업데이트 ─────────────────────────────
      const chipsWrap = promptCard.querySelector('#cgo-prompt-chips-wrap');
      const chipsPlaceholder = promptCard.querySelector('#cgo-prompt-chips-placeholder');
      const CHIP_STYLES = {
        freq:  'background:rgba(139,92,246,.15);color:#7c3aed;border:1px solid rgba(139,92,246,.3);',
        bpm:   'background:rgba(245,158,11,.12);color:#b45309;border:1px solid rgba(245,158,11,.3);',
        instr: 'background:rgba(59,130,246,.12);color:#1d4ed8;border:1px solid rgba(59,130,246,.3);',
        vocal: 'background:rgba(236,72,153,.12);color:#be185d;border:1px solid rgba(236,72,153,.3);',
        genre: 'background:rgba(16,185,129,.12);color:#065f46;border:1px solid rgba(16,185,129,.3);',
      };
      const mkChip = (label, type) =>
        `<span style="font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;${CHIP_STYLES[type]||CHIP_STYLES.genre}">${label}</span>`;

      const showSummary = () => {
        try {
          let chips = [];
          const freq = String(this.selectedFreq);
          if (freq === '432')    chips.push(mkChip('🌿 432Hz 자연공명', 'freq'));
          else if (freq === '528') chips.push(mkChip('💚 528Hz DNA회복', 'freq'));
          else if (freq === '783' || freq === '7.83') chips.push(mkChip('🌍 7.83Hz 슈만공명', 'freq'));
          else if (freq === 'pure') chips.push(mkChip('🎵 순수음악', 'freq'));
          else if (freq && freq !== '0') chips.push(mkChip(`${freq}Hz`, 'freq'));

          if (this.tempoBpm) {
            const tl = this.tempoBpm < 70 ? '느리게' : this.tempoBpm < 100 ? '보통' : this.tempoBpm < 130 ? '빠르게' : '매우 빠르게';
            chips.push(mkChip(`🥁 ${tl} ${this.tempoBpm}BPM`, 'bpm'));
          }
          if (this.selected) {
            if (this.selected.key) chips.push(mkChip(`🎼 ${this.selected.key}`, 'instr'));
            if (this.selected.instrument && this.selected.instrument !== '없음') chips.push(mkChip(`🎸 ${this.selected.instrument}`, 'instr'));
            if (this.selected.vocal && this.selected.vocal !== '없음') chips.push(mkChip(`🎤 ${this.selected.vocal}`, 'vocal'));
          }
          if (this._selectedGenreIds && this._selectedGenreIds.size > 0) {
            [...this._selectedGenreIds].slice(0, 3).forEach(g => chips.push(mkChip(`🌍 ${g}`, 'genre')));
          }

          if (chips.length > 0) {
            chipsPlaceholder.style.display = 'none';
            // 기존 칩 제거 후 새로 삽입
            chipsWrap.querySelectorAll('span.cgo-chip').forEach(el => el.remove());
            chips.forEach(h => {
              const sp = document.createElement('span');
              sp.className = 'cgo-chip';
              sp.innerHTML = h;
              chipsWrap.appendChild(sp.firstElementChild || sp);
            });
            // innerHTML 방식으로 교체 (더 안정적)
            const placeholder = chipsWrap.querySelector('#cgo-prompt-chips-placeholder');
            if (placeholder) placeholder.style.display = 'none';
            chipsWrap.innerHTML = chips.join('');
          } else {
            chipsWrap.innerHTML = '<span id="cgo-prompt-chips-placeholder" style="font-size:10px;color:#64748b;font-style:italic;">설정을 선택하면 여기에 표시됩니다</span>';
          }
        } catch(e) {}
      };

      // 즉시 실행 + _updateResult 후킹으로 변경 감지
      showSummary();
      const _origUpdateResult = this._updateResult;
      this._updateResult = function() {
        if (_origUpdateResult) _origUpdateResult.call(this);
        try { showSummary(); } catch(e) {}
      };

      // 버튼 클릭 → 스마트 프롬프트 적용
      promptCard.querySelector('#cgo-make-prompt-btn').addEventListener('click', () => {
        if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
        const txt = ta.value.trim();
        if (txt && typeof this._applySmartPrompt === 'function') {
          this._applySmartPrompt(txt);
          const btn = promptCard.querySelector('#cgo-make-prompt-btn');
          btn.textContent = '✅ 적용 완료!';
          btn.style.background = 'linear-gradient(135deg,#059669,#10b981)';
          setTimeout(() => {
            btn.textContent = '✨ 이 분위기로 시작하기';
            btn.style.background = 'linear-gradient(135deg,#0d9488,#14b8a6)';
          }, 1800);
        } else if (!txt) {
          ta.style.borderColor = '#f87171';
          ta.focus();
          setTimeout(() => { ta.style.borderColor = 'rgba(13,148,136,.3)'; }, 1500);
        }
      });

      // ⑥ 현재 설정 결과 카드 (기본 닫힘)
      p.appendChild(mkAccordion('🎼', t(24068), (body) => {
        const resCard = document.createElement('div');
        resCard.className = 'cgo-result-card';
        resCard.id = 'cgo-result-card';
        body.appendChild(resCard);
      }, false));

      // 상태
      const statusEl = document.createElement('p');
      statusEl.className = 'cgo-status';
      statusEl.id = 'cgo-status';
      p.appendChild(statusEl);

      // 생성 버튼 (항상 표시)
      const genWrap = document.createElement('div');
      genWrap.className = 'cgo-gen-wrap';
      genWrap.innerHTML = `<button class="cgo-gen-btn" id="cgo-gen-btn" data-k="24055">${t(24055)} · ${t(24065)}</button>`;
      p.appendChild(genWrap);
      genWrap.querySelector('#cgo-gen-btn').addEventListener('click', () => this._onGenerate());
    }

    // ── 보컬 선택 섹션 (독립 카드 선택) ─────────────────────────
    _buildVocalSection(body) {
      const grid = document.createElement('div');
      grid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:0 14px 10px;';
      body.appendChild(grid);

      const render = () => {
        grid.innerHTML = '';
        VOCAL_OPTIONS.forEach(opt => {
          const card = document.createElement('div');
          const isSel = this.selected.vocal === opt.id;
          card.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 6px;border-radius:12px;border:1.5px solid ${isSel ? opt.color : 'rgba(100,60,180,.2)'};background:${isSel ? 'rgba(168,85,247,.2)' : 'rgba(15,4,35,.7)'};cursor:pointer;transition:all .2s;${isSel ? `box-shadow:0 0 10px ${opt.color}40;` : ''}`;
          card.innerHTML = `
            <span style="font-size:22px">${opt.emoji}</span>
            <span style="font-size:11px;font-weight:800;color:${isSel ? '#fff' : '#e9d5ff'}">${opt.label}</span>
            <span style="font-size:9px;color:${isSel ? opt.color : '#9d8ec8'};text-align:center;line-height:1.3">${opt.desc}</span>
          `;
          card.addEventListener('click', () => {
            if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
            this.selected.vocal = opt.id;
            render();
            this._updateResult && this._updateResult();
          });
          grid.appendChild(card);
        });
      };
      render();
    }

    // ── 악기 선택 섹션 (추첨통 탭 첫 번째 아코디언) ─────────────
    _buildInstrumentSection(body) {
      // 선택된 악기 IDs (최대 12개)
      if (!this.selectedInstrIds) this.selectedInstrIds = new Set();
      const MAX_INSTR = 12;

      // 편성 프리셋
      const presets = [
        { label:'🎸 솔로 1',      ids:[1]       },
        { label:'🎹 듀엣 2',      ids:[1,41]    },
        { label:'🎻 챔버 4',      ids:[1,41,43,57]  },
        { label:'🎷 앙상블 8',    ids:[1,41,43,57,65,74,47,48] },
        { label:'🌍 글로벌',      ids:[94,95,81,78,85,76,98,99] },
        { label:'♻️ 초기화',     ids:[]        },
      ];

      // 현재 필터 카테고리
      let activeCat = '전체';

      // ── 상단: 편성 프리셋 버튼 ──────────────────────────────
      const presetBar = document.createElement('div');
      presetBar.className = 'cgo-instr-preset-bar';
      presets.forEach(pr => {
        const btn = document.createElement('button');
        btn.className = 'cgo-instr-preset-btn';
        btn.textContent = pr.label;
        btn.addEventListener('click', () => {
          if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
          this.selectedInstrIds.clear();
          pr.ids.forEach(id => this.selectedInstrIds.add(id));
          renderGrid();
          renderSelected();
          updateInfo();
        });
        presetBar.appendChild(btn);
      });
      body.appendChild(presetBar);

      // ── 카테고리 필터 탭 ─────────────────────────────────
      const filterBar = document.createElement('div');
      filterBar.className = 'cgo-instr-filter';
      INSTR_CATS.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'cgo-instr-filter-btn' + (cat === '전체' ? ' active' : '');
        btn.textContent = cat;
        btn.addEventListener('click', () => {
          if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
          activeCat = cat;
          filterBar.querySelectorAll('.cgo-instr-filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderGrid();
        });
        filterBar.appendChild(btn);
      });
      body.appendChild(filterBar);

      // ── 선택 정보 줄 ─────────────────────────────────────
      const infoEl = document.createElement('div');
      infoEl.className = 'cgo-instr-info';
      body.appendChild(infoEl);

      function updateInfo() {
        const n = this.selectedInstrIds ? this.selectedInstrIds.size : 0;
        infoEl.innerHTML = `선택 <b>${n}</b> / ${MAX_INSTR}개 · 클릭으로 선택/해제`;
      }
      updateInfo = updateInfo.bind(this);

      // ── 악기 카드 그리드 ─────────────────────────────────
      const grid = document.createElement('div');
      grid.className = 'cgo-instr-grid';
      body.appendChild(grid);

      const renderGrid = () => {
        grid.innerHTML = '';
        const list = activeCat === '전체'
          ? INSTRUMENT_DATA
          : INSTRUMENT_DATA.filter(ins => ins.cat === activeCat);
        list.forEach(ins => {
          const card = document.createElement('div');
          const isSel = this.selectedInstrIds.has(ins.id);
          const maxed = this.selectedInstrIds.size >= MAX_INSTR && !isSel;
          card.className = 'cgo-instr-card' + (isSel ? ' selected' : '') + (maxed ? ' disabled' : '');
          card.innerHTML = `
            <span class="cgo-instr-emoji">${ins.emoji}</span>
            <span class="cgo-instr-name">${ins.ko}</span>
            <span class="cgo-instr-region">${ins.region}</span>
          `;
          card.title = `${ins.en} | GM:${ins.gm} | ${ins.genres.join(', ')}`;
          if (!maxed) {
            // pointerdown: 마우스/터치 모두 즉시 반응 (click 보다 빠름)
            const handleInstrTap = (e) => {
              if (e.type === 'pointerdown') e.preventDefault(); // 모바일 더블탭 방지
              if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
              unlockAudioCtx(); // 🔓 AudioContext 언락 (제스처 직후)
              const wasSelected = this.selectedInstrIds.has(ins.id);
              if (wasSelected) {
                this.selectedInstrIds.delete(ins.id);
              } else {
                if (this.selectedInstrIds.size >= MAX_INSTR) return;
                this.selectedInstrIds.add(ins.id);
                // 🔊 즉시 소리 — 악기마다 다른 특징적 음계 (INSTR_PREVIEW_NOTE)
                const noteToPlay = INSTR_PREVIEW_NOTE[ins.id] || 'C4';
                playSfNote(ins.gm, noteToPlay, 1.5, 0.65).catch(()=>{});
              }
              renderGrid();
              renderSelected();
              updateInfo();
              const names = [...this.selectedInstrIds].map(id => {
                const f = INSTRUMENT_DATA.find(x=>x.id===id);
                return f ? f.ko : '';
              }).filter(Boolean);
              this.selected.instrument = names.slice(0,3).join(', ') || '없음';
              this._updateResult && this._updateResult();
            };
            card.addEventListener('pointerdown', handleInstrTap);
          }
          grid.appendChild(card);
        });
      };

      // ── 선택된 악기 칩 목록 ──────────────────────────────
      const selectedList = document.createElement('div');
      selectedList.className = 'cgo-instr-selected-list';
      body.appendChild(selectedList);

      const renderSelected = () => {
        const chips = document.createElement('div');
        chips.className = 'cgo-instr-selected-chips';
        if (!this.selectedInstrIds.size) {
          chips.innerHTML = `<span style="font-size:11px;color:#7c6fa8;">선택된 악기 없음 · 위 카드를 클릭하세요</span>`;
        } else {
          [...this.selectedInstrIds].forEach(id => {
            const ins = INSTRUMENT_DATA.find(x=>x.id===id);
            if (!ins) return;
            const chip = document.createElement('span');
            chip.className = 'cgo-instr-chip';
            chip.innerHTML = `${ins.emoji} ${ins.ko}<span class="cgo-instr-chip-del" title="제거">✕</span>`;
            chip.querySelector('.cgo-instr-chip-del').addEventListener('click', () => {
              this.selectedInstrIds.delete(id);
              renderGrid();
              renderSelected();
              updateInfo();
            });
            chips.appendChild(chip);
          });
        }
        selectedList.innerHTML = '';
        selectedList.appendChild(chips);
      };

      renderGrid();
      renderSelected();
      updateInfo();
    }

    // ── 200-주파수 마스터 가이드 섹션 (군집 탭+카드만) ────────────
    // freq 탭의 4개 카드 아래에 배치됨
    _buildFreqMasterSection() {
      const wrap = document.createElement('div');
      wrap.className = 'cgo-fmaster-wrap';

      // ── 군집 탭 ──────────────────────────────────────────────
      const tabBar = document.createElement('div');
      tabBar.className = 'cgo-fmaster-tabs';
      const panelContainer = document.createElement('div');
      let activeCluster = 'c1';

      FREQ_CLUSTERS.forEach((cluster, ci) => {
        // 탭 버튼
        const tab = document.createElement('button');
        tab.className = 'cgo-fmaster-tab' + (ci === 0 ? ' active' : '');
        tab.dataset.cid = cluster.id;
        tab.textContent = `${cluster.emoji} ${cluster.label}`;
        tab.addEventListener('click', () => {
          if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
          tabBar.querySelectorAll('.cgo-fmaster-tab').forEach(t => t.classList.remove('active'));
          panelContainer.querySelectorAll('.cgo-fmaster-panel').forEach(p => p.classList.remove('active'));
          tab.classList.add('active');
          panelContainer.querySelector(`#cgo-fcp-${cluster.id}`).classList.add('active');
          activeCluster = cluster.id;
        });
        tabBar.appendChild(tab);

        // 패널
        const panel = document.createElement('div');
        panel.className = 'cgo-fmaster-panel' + (ci === 0 ? ' active' : '');
        panel.id = `cgo-fcp-${cluster.id}`;

        const pdesc = document.createElement('div');
        pdesc.className = 'cgo-fmaster-panel-desc';
        pdesc.textContent = cluster.desc;
        panel.appendChild(pdesc);

        // 군집 7: 서브카테고리 구조
        if (cluster.subcats) {
          cluster.subcats.forEach(sub => {
            const subLabel = document.createElement('div');
            subLabel.className = 'cgo-fmaster-subcat';
            subLabel.textContent = sub.label;
            panel.appendChild(subLabel);

            const grid = document.createElement('div');
            grid.className = 'cgo-fmaster-grid';
            sub.items.forEach(item => {
              grid.appendChild(this._makeFmasterCard(item));
            });
            panel.appendChild(grid);
          });
        } else {
          const grid = document.createElement('div');
          grid.className = 'cgo-fmaster-grid';
          cluster.items.forEach(item => {
            grid.appendChild(this._makeFmasterCard(item));
          });
          panel.appendChild(grid);
        }

        panelContainer.appendChild(panel);
      });

      wrap.appendChild(tabBar);
      wrap.appendChild(panelContainer);

      this._fmasterWrap = wrap;
      return wrap;
    }

    // ── 주파수 마스터 카드 생성 헬퍼 ──────────────────────────────
    _makeFmasterCard(item) {
      const card = document.createElement('div');
      card.className = 'cgo-fmaster-card';
      // 현재 선택된 것과 숫자 비교 (hz 문자열이면 첫 숫자 파싱)
      const numHz = parseFloat(item.hz);
      const isActive = !isNaN(numHz) && numHz === this.selectedFreq;
      if (isActive) card.classList.add('active');
      card.innerHTML = `<div class="cgo-fmaster-card-ico">${item.ico}</div><div class="cgo-fmaster-card-body"><div class="cgo-fmaster-card-hz">${item.hz}</div><div class="cgo-fmaster-card-desc">${item.desc}</div></div>`;
      card.addEventListener('click', () => {
        if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
        // 숫자 Hz만 선택 가능 (노이즈 타입은 레이블로 구분)
        if (!isNaN(numHz)) {
          this._selectFreq(numHz);
          // 대표 4개 버튼 상태도 업데이트
          const heroGrid = document.getElementById('cgo-freq-hero4');
          if (heroGrid) {
            heroGrid.querySelectorAll('.cgo-fmaster-hero').forEach(b => {
              const match = Number(b.dataset.fhz) === numHz;
              b.classList.toggle('active', match);
              // 색상 초기화
              const color = match ? b.querySelector('.cgo-fmaster-hero-hz').style.color : '';
              b.style.borderColor = color;
            });
          }
        } else {
          // 자연 소리는 OFF(0)로 설정 + 레이블 표시
          this._selectFreq(0);
          this._setStatus(`🌿 ${item.hz} 선택됨`);
        }
        // 카드 active 토글 (현재 패널 안)
        const panel = card.closest('.cgo-fmaster-panel');
        if (panel) panel.querySelectorAll('.cgo-fmaster-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
      return card;
    }

    // ── 장르 선택 카드 섹션 ─────────────────────────────────────
    _buildGenreSection() {
      const sec = document.createElement('div');
      sec.className = 'cgo-genre-sec';

      // 헤더 + 선택 카운터
      const hdr = document.createElement('div');
      hdr.className = 'cgo-msec-title';
      hdr.style.marginBottom = '8px';
      hdr.innerHTML = `🎭 <span data-k="24051">${t(24051)}</span>`;
      sec.appendChild(hdr);

      // 카운터 배지
      const counterWrap = document.createElement('div');
      counterWrap.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;';
      const counter = document.createElement('div');
      counter.className = 'cgo-genre-counter';
      counter.id = 'cgo-genre-counter';
      counter.innerHTML = `<span class="cgo-genre-counter-num" id="cgo-genre-count">${this.selectedGenres.size}</span> / 10 선택됨`;
      const hint = document.createElement('div');
      hint.className = 'cgo-genre-hint';
      hint.textContent = '최대 10개 믹서 가능';
      counterWrap.appendChild(counter);
      counterWrap.appendChild(hint);
      sec.appendChild(counterWrap);

      // 대륙별 그룹 렌더
      GENRE_GROUPS.forEach(group => {
        const groupEl = document.createElement('div');
        groupEl.className = 'cgo-genre-group';

        // 그룹 타이틀
        const titleEl = document.createElement('div');
        titleEl.className = 'cgo-genre-group-title';
        titleEl.innerHTML = `<span style="color:${group.color};">${group.group}</span><div class="cgo-genre-group-line"></div>`;
        groupEl.appendChild(titleEl);

        // 카드 그리드
        const grid = document.createElement('div');
        grid.className = 'cgo-genre-grid';
        group.genres.forEach(genre => {
          const card = document.createElement('div');
          card.className = 'cgo-genre-card' + (this.selectedGenres.has(genre.id) ? ' selected' : '');
          card.style.setProperty('--gc', group.color);
          card.dataset.gid = genre.id;
          card.innerHTML = `
            <div class="cgo-genre-flag">${genre.flag}</div>
            <div class="cgo-genre-name">${genre.name}</div>
            <div class="cgo-genre-en">${genre.nameEn}</div>
            <div class="cgo-genre-country">📍 ${genre.country}</div>
            <div class="cgo-genre-desc">${genre.desc}</div>
          `;
          card.addEventListener('click', () => { if (typeof window._spd2Mark === 'function') window._spd2Mark('music'); this._toggleGenre(genre.id, group.color); });
          grid.appendChild(card);
        });
        groupEl.appendChild(grid);
        sec.appendChild(groupEl);
      });

      this._genreSec = sec;
      return sec;
    }

    // ── 장르 토글 (최대 10개) ────────────────────────────────────
    _toggleGenre(id, groupColor) {
      if (this.selectedGenres.has(id)) {
        // 마지막 하나는 해제 불가
        if (this.selectedGenres.size <= 1) {
          this._setStatus('⚠️ 최소 1개 장르는 선택되어야 합니다.');
          return;
        }
        this.selectedGenres.delete(id);
      } else {
        if (this.selectedGenres.size >= 10) {
          this._setStatus('⚠️ 최대 10개까지 믹서할 수 있습니다.');
          return;
        }
        this.selectedGenres.add(id);
      }
      // 카드 UI 업데이트
      if (this._genreSec) {
        this._genreSec.querySelectorAll('.cgo-genre-card').forEach(card => {
          const gid = card.dataset.gid;
          const grp = GENRE_GROUPS.find(g => g.genres.find(x => x.id === gid));
          const gc = grp ? grp.color : '#a855f7';
          card.style.setProperty('--gc', gc);
          card.classList.toggle('selected', this.selectedGenres.has(gid));
        });
      }
      // 카운터 업데이트
      const countEl = this.root && this.root.querySelector('#cgo-genre-count');
      if (countEl) countEl.textContent = this.selectedGenres.size;
      // 결과 카드 업데이트
      this._updateResult();
    }

    // ── 박자 레인보우 바 빌드 (250단계 연속) ───────────────────
    _buildTempoBar() {
      const wrap = document.createElement('div');
      wrap.className = 'cgo-tempo-wrap';

      // 라벨
      const lbl = document.createElement('div');
      lbl.className = 'cgo-tempo-label';
      lbl.innerHTML = `<b>🥁 <span data-k="24050">${t(24050)}</span></b>`;
      wrap.appendChild(lbl);

      // 슬라이더 영역 (말풍선 + range 입력)
      const rainbowDiv = document.createElement('div');
      rainbowDiv.className = 'cgo-tempo-rainbow';

      // BPM 말풍선 (썸 위에 표시)
      const bubble = document.createElement('div');
      bubble.className = 'cgo-tempo-bubble';
      bubble.id = 'cgo-tempo-bubble';
      bubble.textContent = this.tempoBpm + ' BPM';
      rainbowDiv.appendChild(bubble);

      // 슬라이더: 0~249 (250단계)
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = '0';
      slider.max = String(TEMPO_STEPS_COUNT - 1);
      slider.step = '1';
      slider.value = String(bpmToSlider(this.tempoBpm));
      rainbowDiv.appendChild(slider);
      wrap.appendChild(rainbowDiv);

      // 5개 틱 마커 (절대 위치)
      const ticksDiv = document.createElement('div');
      ticksDiv.className = 'cgo-tempo-ticks';
      ticksDiv.id = 'cgo-tempo-ticks';
      TEMPO_TICK_BPMS.forEach(bpm => {
        const pct = ((bpm - TEMPO_MIN_BPM) / (TEMPO_MAX_BPM - TEMPO_MIN_BPM) * 100).toFixed(2);
        const stage = bpmToStage(bpm);
        const isActive = this.tempoBpm === bpm;
        const tick = document.createElement('div');
        tick.className = 'cgo-tempo-tick' + (isActive ? ' active' : '');
        tick.dataset.bpm = String(bpm);
        tick.style.left = pct + '%';
        tick.innerHTML = `
          <div class="cgo-tempo-tick-dot" style="background:${stage.dot};color:${stage.dot};"></div>
          <div class="cgo-tempo-tick-name">${stage.name}<br><span style="color:#6b7280;font-size:8px;">${stage.nameEn}</span></div>
        `;
        tick.addEventListener('click', () => {
          if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
          unlockAudioCtx();
          this._onTempoChange(bpm);
          // 틱 클릭 시 해당 BPM으로 4박 미리듣기
          let _tb = 0;
          const _tms = Math.round(60000 / bpm);
          playMetroClick(true); _tb = 1;
          const _tid = setInterval(() => {
            if (_tb >= 4) { clearInterval(_tid); return; }
            playMetroClick(_tb % 4 === 0); _tb++;
          }, _tms);
        });
        ticksDiv.appendChild(tick);
      });
      wrap.appendChild(ticksDiv);

      // 메트로놈 안내 문구
      const hintDiv = document.createElement('div');
      hintDiv.className = 'cgo-metro-hint';
      hintDiv.innerHTML = `<span class="cgo-metro-hint-icon">🎵</span><span>흰 버튼을 누르고 있으면 메트로놈 소리로 속도를 체감할 수 있어요</span>`;
      wrap.appendChild(hintDiv);

      // 하단 정보 카드
      const dispDiv = document.createElement('div');
      dispDiv.className = 'cgo-tempo-display';
      dispDiv.id = 'cgo-tempo-display';
      dispDiv.innerHTML = this._tempoDisplayHTML(this.tempoBpm);
      wrap.appendChild(dispDiv);

      // ── 메트로놈 클릭 엔진 ──────────────────────────────────────
      // 슬라이더 드래그 중 BPM에 맞춰 딸깍 소리 (딜레이 0)
      let _metroTimer = null;
      let _metroLastBpm = 0;
      let _metroActive = false;

      let _clickBeat = 0;
      let _metroRafId = null; // requestAnimationFrame 기반 정밀 타이머
      let _metroNextTime = 0; // 다음 클릭 예정 시각 (AudioContext 시간)

      // Web Audio Clock 기반 메트로놈 — setInterval보다 훨씬 정밀
      const _scheduleMetro = () => {
        if (!_metroActive) return;
        try {
          const ctx = getSfCtx();
          if (!ctx) return;
          const now = ctx.currentTime;
          const intervalSec = 60 / _metroLastBpm;

          // 다음 0.1초 안에 울려야 할 클릭음을 미리 스케줄
          while (_metroNextTime < now + 0.1) {
            if (_metroNextTime >= now - 0.01) { // 너무 과거는 스킵
              const isAccent = (_clickBeat % 4 === 0);
              // Web Audio로 정확한 시각에 예약
              const freq = isAccent ? 1200 : 800;
              const vol  = isAccent ? 0.55 : 0.35;
              const osc  = ctx.createOscillator();
              const g    = ctx.createGain();
              osc.type = 'sine';
              const t = Math.max(_metroNextTime, now);
              osc.frequency.setValueAtTime(freq, t);
              osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t + 0.04);
              g.gain.setValueAtTime(0, t);
              g.gain.linearRampToValueAtTime(vol, t + 0.003);
              g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
              osc.connect(g); g.connect(ctx.destination);
              osc.start(t); osc.stop(t + 0.09);
            }
            _metroNextTime += intervalSec;
            _clickBeat++;
          }
        } catch(e) {}
        _metroRafId = requestAnimationFrame(_scheduleMetro);
      };

      const _startMetro = (bpm) => {
        // 기존 스케줄 정리
        if (_metroRafId) { cancelAnimationFrame(_metroRafId); _metroRafId = null; }
        _metroLastBpm = bpm;
        _clickBeat = 0;
        // AudioContext 언락 + 즉시 첫 클릭
        try {
          const ctx = getSfCtx();
          if (ctx) {
            ctx.resume().then(() => {
              _metroNextTime = ctx.currentTime; // 지금 당장부터 시작
              _metroActive = true;
              _scheduleMetro();
            }).catch(() => {
              _metroNextTime = (getSfCtx() || {currentTime:0}).currentTime;
              _metroActive = true;
              _scheduleMetro();
            });
          }
        } catch(e) {}
      };

      const _restartMetroIfChanged = (bpm) => {
        if (Math.abs(bpm - _metroLastBpm) >= 2) {
          // BPM 바뀌면 간격만 갱신 (beat 카운터는 유지)
          _metroLastBpm = bpm;
          // 다음 클릭 예정 시각을 현재 기준으로 재조정
          try {
            const ctx = getSfCtx();
            if (ctx) _metroNextTime = ctx.currentTime + (60 / bpm) * 0.5;
          } catch(e) {}
        }
      };

      const _stopMetro = () => {
        _metroActive = false;
        if (_metroRafId) { cancelAnimationFrame(_metroRafId); _metroRafId = null; }
        _clickBeat = 0;
      };

      // 슬라이더 thumb 누르는 즉시 메트로놈 시작
      slider.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); // 버블링 차단
        _metroActive = false; // 기존 정리
        _startMetro(this.tempoBpm);
      });

      slider.addEventListener('input', () => {
        const bpm = sliderToBpm(parseInt(slider.value, 10));
        this.tempoBpm = bpm;
        this._updateTempoBubble(slider, bubble, bpm);
        this._updateTempoTicks(ticksDiv, bpm);
        this._updateTempoDisplayLive(dispDiv, bpm);
        // BPM 바뀌면 속도 즉시 반영
        if (_metroActive) _restartMetroIfChanged(bpm);
      });

      // 손 떼면 메트로놈 멈추고 확정
      const _onSliderRelease = () => {
        _stopMetro();
        const bpm = sliderToBpm(parseInt(slider.value, 10));
        this.tempoBpm = bpm;
        dispDiv.innerHTML = this._tempoDisplayHTML(bpm);
        this._updateResult();
        this._applyBpmToAudio();
      };
      slider.addEventListener('pointerup',     _onSliderRelease);
      slider.addEventListener('pointercancel', _onSliderRelease);

      slider.addEventListener('change', () => {
        if (!_metroActive) {
          const bpm = sliderToBpm(parseInt(slider.value, 10));
          this.tempoBpm = bpm;
          dispDiv.innerHTML = this._tempoDisplayHTML(bpm);
          this._updateResult();
          this._applyBpmToAudio();
        }
      });

      // 초기 말풍선 위치
      requestAnimationFrame(() => this._updateTempoBubble(slider, bubble, this.tempoBpm));

      this._tempoSlider = slider;
      this._tempoBubble = bubble;
      this._tempoTicksEl = ticksDiv;
      this._tempoDispEl = dispDiv;

      return wrap;
    }

    // 말풍선 위치 계산 (썸 중앙 기준)
    _updateTempoBubble(slider, bubble, bpm) {
      if (!slider || !bubble) return;
      const min = parseInt(slider.min, 10);
      const max = parseInt(slider.max, 10);
      const val = bpmToSlider(bpm);
      const pct = (val - min) / (max - min);
      const thumbW = 26;
      const trackW = slider.offsetWidth || slider.parentElement.offsetWidth || 200;
      const left = pct * (trackW - thumbW) + thumbW / 2;
      bubble.style.left = left + 'px';
      bubble.textContent = bpm + ' BPM';
      const stage = bpmToStage(bpm);
      bubble.style.background = stage.color;
      bubble.style.setProperty('--bc', stage.color);
      // 말풍선 꼬리 색상도 업데이트
      bubble.style.cssText = `
        position:absolute;top:0;transform:translateX(-50%);
        background:${stage.color};color:#fff;
        font-size:11px;font-weight:800;font-variant-numeric:tabular-nums;
        padding:2px 7px;border-radius:6px;pointer-events:none;white-space:nowrap;
        left:${left}px;box-shadow:0 2px 8px rgba(0,0,0,.4);
      `;
    }

    // 드래그 중 카드 실시간(색상+BPM 숫자) 업데이트
    _updateTempoDisplayLive(dispDiv, bpm) {
      if (!dispDiv) return;
      const stage = bpmToStage(bpm);
      const bpmEl = dispDiv.querySelector('.cgo-tempo-bpm');
      if (bpmEl) {
        bpmEl.style.color = stage.color;
        const numNode = bpmEl.childNodes[0];
        if (numNode && numNode.nodeType === Node.TEXT_NODE) numNode.textContent = bpm;
        else bpmEl.innerHTML = bpm + `<span class="cgo-tempo-bpm-unit">BPM</span>`;
      }
      const nameEl = dispDiv.querySelector('.cgo-tempo-info-name');
      if (nameEl) { nameEl.textContent = stage.name; nameEl.style.color = stage.dot; }
      const enEl = dispDiv.querySelector('.cgo-tempo-info-en');
      if (enEl) enEl.textContent = stage.nameEn;
    }

    // 틱 active 상태 업데이트
    _updateTempoTicks(ticksDiv, bpm) {
      if (!ticksDiv) return;
      const stage = bpmToStage(bpm);
      ticksDiv.querySelectorAll('.cgo-tempo-tick').forEach(el => {
        const tb = parseInt(el.dataset.bpm, 10);
        const ts = bpmToStage(tb);
        const isActive = ts.name === stage.name;
        el.classList.toggle('active', isActive);
      });
    }

    _tempoDisplayHTML(bpm) {
      const stage = bpmToStage(bpm);
      return `
        <div>
          <div class="cgo-tempo-bpm" style="color:${stage.color};">${bpm}<span class="cgo-tempo-bpm-unit">BPM</span></div>
        </div>
        <div class="cgo-tempo-info">
          <div class="cgo-tempo-info-name" style="color:${stage.dot};">${stage.name}</div>
          <div class="cgo-tempo-info-en">${stage.nameEn}</div>
          <div class="cgo-tempo-info-desc">${stage.desc}</div>
        </div>
      `;
    }

    _onTempoChange(bpm) {
      this.tempoBpm = bpm;
      if (this._tempoSlider) this._tempoSlider.value = String(bpmToSlider(bpm));
      if (this._tempoBubble && this._tempoSlider) {
        this._updateTempoBubble(this._tempoSlider, this._tempoBubble, bpm);
      }
      if (this._tempoTicksEl) this._updateTempoTicks(this._tempoTicksEl, bpm);
      if (this._tempoDispEl) this._tempoDispEl.innerHTML = this._tempoDisplayHTML(bpm);
      this._updateResult();
      this._applyBpmToAudio();   // 재생 중이면 리듬 즉시 갱신
    }

    // ── 주파수 패널 ─────────────────────────────────────────────
    _buildFreqPanel() {
      const p = this.panels.freq;

      // ── 대표 4개 카드 ─────────────────────────────────────────
      const top = document.createElement('div');
      top.className = 'cgo-msec';
      top.innerHTML = `<div class="cgo-msec-title">🌊 <span data-k="24061">${t(24061)}</span></div>`;
      const HERO4 = [
        { hz:432,  color:'#f59e0b', titleKey:24069, descKey:24056, title:t(24069), desc:t(24056) },
        { hz:528,  color:'#10b981', titleKey:24070, descKey:24057, title:t(24070), desc:t(24057) },
        { hz:7.83, color:'#3b82f6', titleKey:24071, descKey:24058, title:t(24071), desc:t(24058) },
        { hz:0,    color:'#9ca3af', title:'OFF — ' + t(24060), desc:t(24060) },
      ];
      const hero4Wrap = document.createElement('div');
      hero4Wrap.style.cssText = 'display:flex;flex-direction:column;gap:10px;';
      hero4Wrap.id = 'cgo-freq-hero4';
      HERO4.forEach(hf => {
        const card = document.createElement('div');
        card.style.cssText = `background:${hf.color}1a;border:2px solid ${hf.color}4d;border-radius:14px;padding:16px;cursor:pointer;transition:border-color .2s,background .2s;`;
        card.dataset.fhz = hf.hz;
        if (this.selectedFreq === hf.hz) {
          card.style.borderColor = hf.color;
          card.style.background = hf.color + '33';
        }
        card.innerHTML = `<div style="font-size:14px;font-weight:800;color:${hf.color};">${hf.title}</div><div style="font-size:11.5px;color:#9d8ec4;margin-top:6px;line-height:1.6;">${hf.desc}</div>`;
        card.addEventListener('click', () => {
          if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
          this._selectFreq(hf.hz);
          hero4Wrap.querySelectorAll('[data-fhz]').forEach(c => {
            const isThis = Number(c.dataset.fhz) === hf.hz;
            c.style.borderColor = isThis ? hf.color : hf.color + '4d';
            c.style.background  = isThis ? hf.color + '33' : hf.color + '1a';
          });
        });
        hero4Wrap.appendChild(card);
      });
      top.appendChild(hero4Wrap);
      p.appendChild(top);

      // ── 현재 설정 미리보기 (freq 탭 내 결과 카드) ───────────────
      const freqResultSec = document.createElement('div');
      freqResultSec.className = 'cgo-msec';
      freqResultSec.style.cssText = 'margin-top:10px;';
      freqResultSec.innerHTML = `<div class="cgo-msec-title" style="font-size:11px;">⚡ 현재 설정 미리보기</div>`;
      const freqResultCard = document.createElement('div');
      freqResultCard.className = 'cgo-result-card';
      freqResultSec.appendChild(freqResultCard);
      p.appendChild(freqResultSec);
      // 즉시 채우기
      setTimeout(() => this._updateResult(), 0);

      // ── 구분선 ───────────────────────────────────────────────
      const div = document.createElement('div');
      div.className = 'cgo-fmaster-divider';
      div.style.cssText = 'margin:4px 14px 0;';
      div.innerHTML = '<div class="cgo-fmaster-divider-line"></div><div class="cgo-fmaster-divider-txt">✦ 200가지 세부 주파수 선택 ✦</div><div class="cgo-fmaster-divider-line"></div>';
      p.appendChild(div);

      // ── 200가지 마스터 가이드 ─────────────────────────────────
      p.appendChild(this._buildFreqMasterSection());
    }

    // ── 프리셋 패널 ─────────────────────────────────────────────
    _buildPresetPanel() {
      const p = this.panels.preset;
      p.innerHTML = `<div class="cgo-msec"><div class="cgo-msec-title">⭐ <span data-k="24063">${t(24063)}</span></div><div id="cgo-preset-list"></div></div>`;
    }

    // ── 음악 편집 패널 ──────────────────────────────────────────
    _buildEditPanel() {
      const p = this.panels.edit;
      if (p.querySelector('#cgo-score-editor')) return; // 이미 빌드됨

      // ── VexFlow 로드 ─────────────────────────────────────────────
      const _loadVexFlow = (cb) => {
        if (window.Vex) { cb(); return; }
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/vexflow/4.2.2/vexflow.js';
        s.onload = cb;
        s.onerror = () => { console.warn('VexFlow 로드 실패'); };
        document.head.appendChild(s);
      };

      // ── 편집기 상태 ──────────────────────────────────────────────
      const state = {
        notes: [], // [{pitch:'C4', duration:'q', selected:false}, ...]
        bpm: this.tempoBpm || 80,
        timeNum: 4, timeDen: 4,
        selectedIdx: -1,
        playing: false,
        playTimer: null,
        playIdx: 0,
      };

      // 기본 샘플 노트 (CGO 현재 설정 기반)
      const _defaultNotes = () => {
        const scale = {
          'C장조':['C4','D4','E4','F4','G4','A4','B4','C5'],
          'G장조':['G4','A4','B4','C5','D5','E5','F#5','G5'],
          'Am단조':['A4','B4','C5','D5','E5','F5','G5','A5'],
          'D장조':['D4','E4','F#4','G4','A4','B4','C#5','D5'],
        };
        const sel = this.selected && this.selected.key;
        const arr = scale[sel] || scale['C장조'];
        return arr.slice(0,8).map((p,i) => ({
          pitch: p,
          duration: i % 4 === 3 ? 'h' : 'q',
          selected: false
        }));
      };
      state.notes = _defaultNotes();

      // ── UI 빌드 ──────────────────────────────────────────────────
      p.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.id = 'cgo-score-editor';
      wrap.style.cssText = 'display:flex;flex-direction:column;gap:12px;padding:12px 2px;';

      // 제목 + 업로드 버튼
      wrap.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding:0 2px;">
          <div style="font-size:13px;font-weight:900;color:#c084fc;display:flex;align-items:center;gap:6px;">
            <span>🎼</span><span>악보 편집기</span>
            <span style="font-size:9px;background:rgba(168,85,247,.2);color:#a855f7;padding:2px 7px;border-radius:20px;font-weight:700;">BETA</span>
          </div>
          <label id="cgo-midi-upload-label" style="display:flex;align-items:center;gap:5px;padding:7px 12px;background:rgba(168,85,247,.15);border:1.5px solid rgba(168,85,247,.4);border-radius:20px;cursor:pointer;font-size:11px;font-weight:700;color:#c084fc;">
            <span>📂</span><span>MIDI 업로드</span>
            <input id="cgo-midi-file" type="file" accept=".mid,.midi" style="display:none;">
          </label>
        </div>

        <!-- 툴바 -->
        <div id="cgo-score-toolbar" style="display:flex;gap:6px;flex-wrap:wrap;padding:8px 10px;background:rgba(10,2,25,.6);border-radius:12px;border:1px solid rgba(168,85,247,.15);">
          <div style="display:flex;align-items:center;gap:4px;margin-right:4px;">
            <span style="font-size:10px;color:#7c6fa8;font-weight:600;">BPM</span>
            <input id="cgo-score-bpm" type="number" min="40" max="200" value="${state.bpm}"
              style="width:52px;background:rgba(20,5,40,.8);border:1px solid rgba(168,85,247,.3);border-radius:6px;color:#c084fc;font-size:12px;font-weight:700;padding:4px 6px;text-align:center;font-family:inherit;">
          </div>
          <button class="cgo-score-tool-btn" data-dur="w" title="온음표">𝅝</button>
          <button class="cgo-score-tool-btn" data-dur="h" title="2분음표">𝅗𝅥</button>
          <button class="cgo-score-tool-btn active" data-dur="q" title="4분음표">♩</button>
          <button class="cgo-score-tool-btn" data-dur="8" title="8분음표">♪</button>
          <button class="cgo-score-tool-btn" data-dur="16" title="16분음표">𝅘𝅥𝅯</button>
          <div style="width:1px;background:rgba(168,85,247,.2);margin:0 2px;"></div>
          <button id="cgo-score-del" title="선택 노트 삭제" style="padding:5px 10px;background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);border-radius:7px;color:#f87171;font-size:12px;cursor:pointer;font-weight:700;">✕ 삭제</button>
          <button id="cgo-score-clear" title="전체 초기화" style="padding:5px 10px;background:rgba(100,60,180,.1);border:1px solid rgba(168,85,247,.2);border-radius:7px;color:#9d8ec8;font-size:11px;cursor:pointer;font-weight:700;">초기화</button>
        </div>

        <!-- 건반 + 악보 영역 -->
        <div style="display:flex;gap:0;overflow:hidden;border-radius:12px;border:1px solid rgba(168,85,247,.2);">
          <!-- 피아노 건반 (음 입력용) -->
          <div id="cgo-score-keys" style="display:flex;flex-direction:column;background:rgba(10,2,25,.9);border-right:1px solid rgba(168,85,247,.15);padding:8px 0;min-width:64px;"></div>
          <!-- 악보 캔버스 -->
          <div id="cgo-score-canvas-wrap" style="flex:1;overflow-x:auto;background:rgba(5,0,15,.95);min-height:180px;"></div>
        </div>

        <!-- 재생 컨트롤 -->
        <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(10,2,25,.7);border-radius:12px;border:1px solid rgba(168,85,247,.15);">
          <button id="cgo-score-play" style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px rgba(168,85,247,.4);">▶</button>
          <button id="cgo-score-stop" style="width:36px;height:36px;border-radius:50%;background:rgba(100,60,180,.2);border:1px solid rgba(168,85,247,.3);color:#9d8ec8;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;">⏹</button>
          <div id="cgo-score-playbar" style="flex:1;height:4px;background:rgba(168,85,247,.15);border-radius:2px;overflow:hidden;">
            <div id="cgo-score-playfill" style="height:100%;width:0%;background:linear-gradient(90deg,#7c3aed,#a855f7);transition:width .1s;"></div>
          </div>
          <span id="cgo-score-playtime" style="font-size:10px;color:#7c6fa8;font-weight:600;min-width:36px;text-align:right;">0:00</span>
          <!-- 악기 선택 -->
          <select id="cgo-score-instr" style="background:rgba(20,5,40,.8);border:1px solid rgba(168,85,247,.3);border-radius:8px;color:#c084fc;font-size:11px;padding:5px 8px;font-family:inherit;max-width:110px;">
            <option value="0">🎹 피아노</option>
            <option value="24">🎸 기타</option>
            <option value="40">🎻 바이올린</option>
            <option value="56">🎺 트럼펫</option>
            <option value="73">🪈 플루트</option>
            <option value="107">🪕 가야금(코토)</option>
          </select>
        </div>

        <!-- 다운로드 버튼 -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button id="cgo-score-dl-midi" style="flex:1;padding:11px;background:rgba(168,85,247,.15);border:1.5px solid rgba(168,85,247,.35);border-radius:11px;color:#c084fc;font-size:12px;font-weight:800;cursor:pointer;">⬇ MIDI</button>
          <button id="cgo-score-dl-xml" style="flex:1;padding:11px;background:rgba(59,130,246,.12);border:1.5px solid rgba(59,130,246,.35);border-radius:11px;color:#93c5fd;font-size:12px;font-weight:800;cursor:pointer;">📄 MusicXML</button>
          <button id="cgo-score-dl-img" style="flex:1;padding:11px;background:rgba(20,184,166,.1);border:1.5px solid rgba(20,184,166,.3);border-radius:11px;color:#5eead4;font-size:12px;font-weight:800;cursor:pointer;">🖼 악보 PNG</button>
        </div>

        <!-- Basic Pitch 베타 -->
        <div style="padding:12px 14px;background:rgba(245,158,11,.05);border:1.5px dashed rgba(245,158,11,.3);border-radius:12px;">
          <div style="font-size:11px;font-weight:800;color:#fbbf24;margin-bottom:6px;display:flex;align-items:center;gap:5px;">
            <span>🤖</span><span>MP3 → 악보 자동 변환</span>
            <span style="font-size:9px;background:rgba(245,158,11,.15);padding:2px 6px;border-radius:10px;">베타</span>
          </div>
          <div style="font-size:10px;color:#a78bca;margin-bottom:8px;line-height:1.6;">AI가 MP3/WAV 파일을 분석해 자동으로 악보를 생성합니다. 브라우저에서 처리 — 서버 전송 없음.</div>
          <label style="display:flex;align-items:center;gap:6px;padding:8px 12px;background:rgba(245,158,11,.1);border-radius:9px;cursor:pointer;font-size:11px;color:#fbbf24;font-weight:700;">
            <span>📁</span><span>MP3/WAV 파일 선택하기</span>
            <input id="cgo-bp-file" type="file" accept=".mp3,.wav,.ogg" style="display:none;">
          </label>
          <div id="cgo-bp-status" style="font-size:10px;color:#7c6fa8;margin-top:6px;display:none;"></div>
        </div>
      `;
      p.appendChild(wrap);

      // ── 스타일 추가 ──────────────────────────────────────────────
      if (!document.getElementById('cgo-score-style')) {
        const st = document.createElement('style');
        st.id = 'cgo-score-style';
        st.textContent = `
          .cgo-score-tool-btn{padding:5px 9px;background:rgba(100,60,180,.1);border:1px solid rgba(168,85,247,.2);border-radius:7px;color:#9d8ec8;font-size:14px;cursor:pointer;font-weight:700;transition:all .15s;}
          .cgo-score-tool-btn:hover,.cgo-score-tool-btn.active{background:rgba(168,85,247,.25);border-color:rgba(168,85,247,.5);color:#c084fc;}
          .cgo-score-key{display:flex;align-items:center;justify-content:flex-end;padding-right:6px;height:22px;font-size:9.5px;font-weight:700;cursor:pointer;border-radius:0 4px 4px 0;margin:1px 0;transition:background .1s;color:#9d8ec8;}
          .cgo-score-key:hover{background:rgba(168,85,247,.25);color:#c084fc;}
          .cgo-score-key.black{background:rgba(30,10,60,.8);color:#7c6fa8;}
          .cgo-score-key.black:hover{background:rgba(168,85,247,.3);}
          #cgo-score-canvas-wrap svg{display:block;}
          .cgo-score-note-sel rect{fill:rgba(168,85,247,.3)!important;}
        `;
        document.head.appendChild(st);
      }

      // ── 건반 UI 생성 (C5~C4, 흰건반만 표시) ─────────────────────
      const PITCH_NAMES = ['C5','B4','A4','G4','F4','E4','D4','C4'];
      const keysEl = wrap.querySelector('#cgo-score-keys');
      PITCH_NAMES.forEach(pitch => {
        const k = document.createElement('div');
        k.className = 'cgo-score-key';
        k.textContent = pitch;
        k.dataset.pitch = pitch;
        k.addEventListener('click', () => _addNote(pitch));
        keysEl.appendChild(k);
      });

      // ── 현재 선택 음표 지속시간 ──────────────────────────────────
      let currentDur = 'q';
      wrap.querySelectorAll('.cgo-score-tool-btn[data-dur]').forEach(btn => {
        btn.addEventListener('click', () => {
          wrap.querySelectorAll('.cgo-score-tool-btn[data-dur]').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentDur = btn.dataset.dur;
          // 선택된 노트 지속시간 변경
          if (state.selectedIdx >= 0) {
            state.notes[state.selectedIdx].duration = currentDur;
            _renderScore();
          }
        });
      });

      // ── BPM 변경 ─────────────────────────────────────────────────
      wrap.querySelector('#cgo-score-bpm').addEventListener('change', e => {
        state.bpm = Math.max(40, Math.min(200, parseInt(e.target.value) || 80));
      });

      // ── 노트 추가 ─────────────────────────────────────────────────
      const _addNote = (pitch) => {
        if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
        state.notes.push({ pitch, duration: currentDur, selected: false });
        state.selectedIdx = state.notes.length - 1;
        _renderScore();
      };

      // ── 노트 삭제 ─────────────────────────────────────────────────
      wrap.querySelector('#cgo-score-del').addEventListener('click', () => {
        if (state.selectedIdx >= 0) {
          state.notes.splice(state.selectedIdx, 1);
          state.selectedIdx = Math.min(state.selectedIdx, state.notes.length - 1);
          _renderScore();
        }
      });

      // ── 초기화 ───────────────────────────────────────────────────
      wrap.querySelector('#cgo-score-clear').addEventListener('click', () => {
        state.notes = _defaultNotes();
        state.selectedIdx = -1;
        _renderScore();
      });

      // ── VexFlow 악보 렌더링 ──────────────────────────────────────
      const canvasWrap = wrap.querySelector('#cgo-score-canvas-wrap');
      const _renderScore = () => {
        _loadVexFlow(() => {
          try {
            const VF = window.Vex.Flow;
            canvasWrap.innerHTML = '';
            const W = Math.max(canvasWrap.offsetWidth || 320, state.notes.length * 55 + 80);
            const renderer = new VF.Renderer(canvasWrap, VF.Renderer.Backends.SVG);
            renderer.resize(W, 160);
            const context = renderer.getContext();
            context.setFont('Arial', 10);
            // 스타브
            const stave = new VF.Stave(10, 20, W - 20);
            stave.addClef('treble').addTimeSignature(`${state.timeNum}/${state.timeDen}`);
            stave.setContext(context).draw();
            // 노트 변환
            const vfNotes = state.notes.map((n, i) => {
              const parts = n.pitch.match(/^([A-G]#?)(\d)$/) || [];
              const noteName = parts[1] ? parts[1].toLowerCase() : 'c';
              const octave = parts[2] || '4';
              const vn = new VF.StaveNote({
                clef: 'treble',
                keys: [`${noteName}/${octave}`],
                duration: n.duration
              });
              if (i === state.selectedIdx) {
                vn.setStyle({ fillStyle: '#c084fc', strokeStyle: '#c084fc' });
              }
              if (noteName.includes('#')) vn.addModifier(new VF.Accidental('#'), 0);
              return vn;
            });
            if (vfNotes.length > 0) {
              const voice = new VF.Voice({ num_beats: state.timeNum, beat_value: state.timeDen }).setMode(VF.Voice.Mode.SOFT);
              voice.addTickables(vfNotes);
              new VF.Formatter().joinVoices([voice]).format([voice], W - 80);
              voice.draw(context, stave);
            }
            // 노트 클릭 선택 (VexFlow 4.x: vf-stavenote 또는 g.vf-stavenote)
            const noteEls = canvasWrap.querySelectorAll('.vf-stavenote, g[class*="stavenote"]');
            noteEls.forEach((el, i) => {
              el.style.cursor = 'pointer';
              el.addEventListener('click', (ev) => {
                ev.stopPropagation();
                state.selectedIdx = i;
                _renderScore();
              });
            });
          } catch(e) {
            canvasWrap.innerHTML = `<div style="padding:20px;color:#7c6fa8;font-size:11px;">악보 로딩 중... (${e.message})</div>`;
          }
        });
      };

      // ── 재생 (Web Audio API) ──────────────────────────────────────
      const NOTE_FREQ = {
        'C4':261.63,'D4':293.66,'E4':329.63,'F4':349.23,'G4':392.00,'A4':440.00,'B4':493.88,
        'C5':523.25,'D5':587.33,'E5':659.25,'F5':698.46,'G5':783.99,'A5':880.00,'B5':987.77,
        'F#4':369.99,'C#4':277.18,'G#4':415.30,'A#4':466.16,'D#4':311.13,
        'F#5':739.99,'C#5':554.37
      };
      const DUR_BEATS = { 'w':4, 'h':2, 'q':1, '8':0.5, '16':0.25 };

      const _stopPlay = () => {
        state.playing = false;
        state.playIdx = 0;
        if (state.playTimer) { clearTimeout(state.playTimer); state.playTimer = null; }
        wrap.querySelector('#cgo-score-play').textContent = '▶';
        wrap.querySelector('#cgo-score-playfill').style.width = '0%';
        wrap.querySelector('#cgo-score-playtime').textContent = '0:00';
      };

      wrap.querySelector('#cgo-score-stop').addEventListener('click', _stopPlay);

      wrap.querySelector('#cgo-score-play').addEventListener('click', () => {
        if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
        if (state.playing) { _stopPlay(); return; }
        if (state.notes.length === 0) return;
        unlockAudioCtx();
        state.playing = true;
        state.playIdx = 0;
        wrap.querySelector('#cgo-score-play').textContent = '⏸';
        const totalBeats = state.notes.reduce((s, n) => s + (DUR_BEATS[n.duration] || 1), 0);
        const secPerBeat = 60 / state.bpm;
        const totalSec = totalBeats * secPerBeat;
        const startTime = performance.now();
        const _tick = () => {
          if (!state.playing || state.playIdx >= state.notes.length) { _stopPlay(); return; }
          const n = state.notes[state.playIdx];
          const freq = NOTE_FREQ[n.pitch] || 440;
          const dur = (DUR_BEATS[n.duration] || 1) * secPerBeat;
          // 오실레이터로 소리
          try {
            const ctx = getSfCtx();
            if (ctx) {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain); gain.connect(ctx.destination);
              osc.frequency.value = freq;
              osc.type = 'triangle';
              gain.gain.setValueAtTime(0.4, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur * 0.9);
              osc.start(ctx.currentTime);
              osc.stop(ctx.currentTime + dur);
            }
          } catch(e) {}
          // 재생 표시
          state.selectedIdx = state.playIdx;
          _renderScore();
          const elapsed = (performance.now() - startTime) / 1000;
          const pct = Math.min(100, (elapsed / totalSec) * 100);
          wrap.querySelector('#cgo-score-playfill').style.width = pct + '%';
          const mins = Math.floor(elapsed / 60);
          const secs = Math.floor(elapsed % 60);
          wrap.querySelector('#cgo-score-playtime').textContent = `${mins}:${secs.toString().padStart(2,'0')}`;
          state.playIdx++;
          state.playTimer = setTimeout(_tick, dur * 1000);
        };
        _tick();
      });

      // ── MIDI 업로드 파싱 ─────────────────────────────────────────
      wrap.querySelector('#cgo-midi-file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const bytes = new Uint8Array(ev.target.result);
            const parsed = _parseMidi(bytes);
            if (parsed && parsed.length > 0) {
              state.notes = parsed.slice(0, 64); // 최대 64노트
              state.selectedIdx = -1;
              _renderScore();
              const label = wrap.querySelector('#cgo-midi-upload-label span:last-child');
              if (label) label.textContent = file.name.slice(0, 16) + (file.name.length > 16 ? '…' : '');
            }
          } catch(err) {
            console.warn('MIDI 파싱 오류:', err);
          }
        };
        reader.readAsArrayBuffer(file);
      });

      // ── 간단한 MIDI 파서 ─────────────────────────────────────────
      const _parseMidi = (bytes) => {
        // MIDI 헤더 확인
        if (bytes[0]!==0x4D||bytes[1]!==0x54||bytes[2]!==0x68||bytes[3]!==0x64) return null;
        const MIDI_NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
        const midiToPitch = (n) => MIDI_NOTES[n % 12] + Math.floor(n / 12 - 1);
        const notes = [];
        let i = 8; // 헤더 스킵
        while (i < bytes.length - 8) {
          // 트랙 찾기
          if (bytes[i]===0x4D&&bytes[i+1]===0x54&&bytes[i+2]===0x72&&bytes[i+3]===0x6B) {
            const tLen = (bytes[i+4]<<24)|(bytes[i+5]<<16)|(bytes[i+6]<<8)|bytes[i+7];
            const tEnd = i + 8 + tLen;
            i += 8;
            while (i < tEnd && notes.length < 64) {
              // 델타 타임 스킵
              while (i < tEnd && (bytes[i] & 0x80)) i++;
              i++;
              if (i >= tEnd) break;
              const evt = bytes[i++];
              if ((evt & 0xF0) === 0x90 && i + 1 < tEnd) {
                const note = bytes[i++];
                const vel = bytes[i++];
                if (vel > 0 && note >= 48 && note <= 84) {
                  notes.push({ pitch: midiToPitch(note), duration: 'q', selected: false });
                }
              } else if ((evt & 0xF0) === 0x80 && i + 1 < tEnd) { i += 2; }
              else if (evt === 0xFF && i + 1 < tEnd) { const l = bytes[i+1]; i += 2 + l; }
              else if (i < tEnd) { i++; }
            }
            i = tEnd;
          } else { i++; }
        }
        return notes;
      };

      // ── MIDI 내보내기 ────────────────────────────────────────────
      wrap.querySelector('#cgo-score-dl-midi').addEventListener('click', () => {
        if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
        try {
          const MIDI_NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
          const pitchToMidi = (p) => {
            const m = p.match(/^([A-G]#?)(\d)$/);
            if (!m) return 60;
            const idx = MIDI_NOTES.indexOf(m[1]);
            return (parseInt(m[2]) + 1) * 12 + idx;
          };
          const DUR_TICKS = { 'w':480*4,'h':480*2,'q':480,'8':240,'16':120 };
          const bytes = [];
          const wr2 = (n) => { bytes.push((n>>8)&0xFF, n&0xFF); };
          const wr4 = (n) => { bytes.push((n>>24)&0xFF,(n>>16)&0xFF,(n>>8)&0xFF,n&0xFF); };
          // 헤더
          [0x4D,0x54,0x68,0x64].forEach(b=>bytes.push(b));
          wr4(6); wr2(0); wr2(1); wr2(480);
          // 트랙
          const track = [];
          const wrv = (n) => { if(n<128){track.push(n);}else if(n<16384){track.push(0x80|(n>>7),n&0x7F);}else{track.push(0x80|((n>>14)&0x7F),0x80|((n>>7)&0x7F),n&0x7F);} };
          // 템포
          track.push(0x00,0xFF,0x51,0x03);
          const uspb = Math.round(60000000/state.bpm);
          track.push((uspb>>16)&0xFF,(uspb>>8)&0xFF,uspb&0xFF);
          state.notes.forEach(n => {
            const midi = pitchToMidi(n.pitch);
            const ticks = DUR_TICKS[n.duration] || 480;
            wrv(0); track.push(0x90,midi,80);
            wrv(ticks); track.push(0x80,midi,0);
          });
          track.push(0x00,0xFF,0x2F,0x00);
          [0x4D,0x54,0x72,0x6B].forEach(b=>bytes.push(b));
          wr4(track.length); track.forEach(b=>bytes.push(b));
          const blob = new Blob([new Uint8Array(bytes)], {type:'audio/midi'});
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = 'cgo-music.mid'; a.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch(e) { console.warn('MIDI 내보내기 오류:', e); }
      });

      // ── MusicXML 내보내기 ─────────────────────────────────────────
      wrap.querySelector('#cgo-score-dl-xml').addEventListener('click', () => {
        if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
        try {
          // 음표 지속시간 → MusicXML duration/type 변환
          const DUR_XML = {
            'w':  { type: 'whole',   div: 4 },
            'h':  { type: 'half',    div: 2 },
            'q':  { type: 'quarter', div: 1 },
            '8':  { type: 'eighth',  div: 0.5 },
            '16': { type: '16th',    div: 0.25 },
          };
          const DIVISIONS = 4; // 4분음표 = 4 division
          const BPM = state.bpm || 80;
          const TIME_NUM = state.timeNum || 4;
          const TIME_DEN = state.timeDen || 4;

          // 음표 → step/octave/alter 분해
          const parsePitch = (pitch) => {
            const m = pitch.match(/^([A-G])(#?)(\d)$/);
            if (!m) return { step:'C', octave:4, alter:0 };
            return { step: m[1], octave: parseInt(m[3]), alter: m[2] === '#' ? 1 : 0 };
          };

          // 마디 분할 (4분음표 기준 TIME_NUM 개당 1마디)
          const BEATS_PER_MEASURE = TIME_NUM;
          const measures = [];
          let curMeasure = [];
          let curBeats = 0;
          state.notes.forEach(n => {
            const beats = DUR_BEATS[n.duration] || 1;
            if (curBeats + beats > BEATS_PER_MEASURE && curMeasure.length > 0) {
              measures.push(curMeasure);
              curMeasure = [];
              curBeats = 0;
            }
            curMeasure.push(n);
            curBeats += beats;
          });
          if (curMeasure.length > 0) measures.push(curMeasure);

          // XML 생성
          let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN"
  "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <work><work-title>CGO Music Score</work-title></work>
  <identification>
    <encoding>
      <software>CGO Music Editor</software>
      <encoding-date>${new Date().toISOString().slice(0,10)}</encoding-date>
    </encoding>
  </identification>
  <part-list>
    <score-part id="P1">
      <part-name>Music</part-name>
    </score-part>
  </part-list>
  <part id="P1">
`;
          measures.forEach((mnotes, mi) => {
            xml += `    <measure number="${mi + 1}">\n`;
            if (mi === 0) {
              xml += `      <attributes>
        <divisions>${DIVISIONS}</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>${TIME_NUM}</beats><beat-type>${TIME_DEN}</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>\n`;
              xml += `      <direction placement="above">
        <direction-type>
          <metronome parentheses="no">
            <beat-unit>quarter</beat-unit>
            <per-minute>${BPM}</per-minute>
          </metronome>
        </direction-type>
      </direction>\n`;
            }
            mnotes.forEach(n => {
              const { step, octave, alter } = parsePitch(n.pitch);
              const dur = DUR_XML[n.duration] || DUR_XML['q'];
              const divVal = Math.round(DIVISIONS * dur.div);
              xml += `      <note>
        <pitch>
          <step>${step}</step>
          ${alter ? `<alter>${alter}</alter>` : ''}
          <octave>${octave}</octave>
        </pitch>
        <duration>${divVal}</duration>
        <type>${dur.type}</type>
      </note>\n`;
            });
            xml += `    </measure>\n`;
          });
          xml += `  </part>\n</score-partwise>`;

          const blob = new Blob([xml], { type: 'application/vnd.recordare.musicxml+xml' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = 'cgo-music.musicxml'; a.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch(e) { console.warn('MusicXML 내보내기 오류:', e); }
      });

      // ── 악보 이미지 저장 ─────────────────────────────────────────
      wrap.querySelector('#cgo-score-dl-img').addEventListener('click', () => {
        if (typeof window._spd2Mark === 'function') window._spd2Mark('music');
        const svg = canvasWrap.querySelector('svg');
        if (!svg) return;
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const scale = 2;
        canvas.width = svg.viewBox.baseVal.width * scale || 600;
        canvas.height = svg.viewBox.baseVal.height * scale || 200;
        const ctx2 = canvas.getContext('2d');
        ctx2.fillStyle = '#ffffff';
        ctx2.fillRect(0, 0, canvas.width, canvas.height);
        const img = new Image();
        img.onload = () => {
          ctx2.drawImage(img, 0, 0, canvas.width, canvas.height);
          const a = document.createElement('a');
          a.href = canvas.toDataURL('image/png');
          a.download = 'cgo-score.png'; a.click();
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
      });

      // ── Basic Pitch 베타 (MP3 → MIDI) ────────────────────────────
      wrap.querySelector('#cgo-bp-file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const statusEl = wrap.querySelector('#cgo-bp-status');
        statusEl.style.display = 'block';
        statusEl.textContent = '🔄 AI 분석 중... (브라우저에서 처리 중)';
        _runBasicPitch(file, statusEl);
      });

      const _runBasicPitch = async (file, statusEl) => {
        // ── 외부 CDN 없이 완전 자체 구현 피치 감지 (YIN + AMDF 하이브리드) ──
        // Basic Pitch ESM은 CSP/iframe 환경에서 dynamic import() 차단됨 → 자체 알고리즘 사용

        // ① YIN 알고리즘 — 단일 프레임 피치 추정 (τ기반 자기상관)
        const yinPitch = (buf, sampleRate, minHz = 50, maxHz = 1500) => {
          const N = buf.length;
          const tauMin = Math.floor(sampleRate / maxHz);
          const tauMax = Math.min(Math.floor(sampleRate / minHz), Math.floor(N / 2) - 1);
          if (tauMax <= tauMin) return 0;

          // 차분 함수 d(τ)
          const d = new Float32Array(tauMax + 1);
          for (let tau = 1; tau <= tauMax; tau++) {
            for (let j = 0; j < tauMax; j++) {
              const diff = buf[j] - buf[j + tau];
              d[tau] += diff * diff;
            }
          }
          // CMNDF (누적 평균 정규화)
          const cmndf = new Float32Array(tauMax + 1);
          cmndf[0] = 1;
          let runSum = 0;
          for (let tau = 1; tau <= tauMax; tau++) {
            runSum += d[tau];
            cmndf[tau] = runSum > 0 ? d[tau] * tau / runSum : 1;
          }
          // 첫 번째 최소값 (임계값 0.12 이하)
          let tau = tauMin;
          while (tau < tauMax && cmndf[tau] >= 0.12) tau++;
          // 지역 최소 탐색
          while (tau + 1 < tauMax && cmndf[tau + 1] < cmndf[tau]) tau++;
          // RMS 에너지 체크 (무음 필터링)
          let rms = 0;
          for (let i = 0; i < N; i++) rms += buf[i] * buf[i];
          rms = Math.sqrt(rms / N);
          if (rms < 0.01 || cmndf[tau] > 0.35) return 0;
          // 포물선 보간
          if (tau > 0 && tau < tauMax) {
            const s0 = cmndf[tau - 1], s1 = cmndf[tau], s2 = cmndf[tau + 1];
            const denom = 2 * (2 * s1 - s0 - s2);
            if (Math.abs(denom) > 1e-8) tau += (s0 - s2) / denom;
          }
          return tau > 0 ? sampleRate / tau : 0;
        };

        // ② Hz → MIDI 번호
        const hzToMidi = (hz) => hz > 0 ? Math.round(69 + 12 * Math.log2(hz / 440)) : -1;

        // ③ MIDI → 음표 이름 (옥타브 포함)
        const MIDI_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
        const midiToName = (midi) => midi >= 0 ? MIDI_NAMES[midi % 12] + Math.floor(midi / 12 - 1) : null;

        // ④ 온셋 감지 (에너지 급등 → 새 음표 시작)
        const detectOnsets = (frames, hopSec, minGapSec = 0.08) => {
          const onsets = [];
          let lastOnset = -99;
          for (let i = 1; i < frames.length; i++) {
            const energy = frames[i].hz > 0 ? 1 : 0;
            const prevEnergy = frames[i-1].hz > 0 ? 1 : 0;
            const t = i * hopSec;
            if (energy && (!prevEnergy || (t - lastOnset) > minGapSec)) {
              // 에너지 flux 기반 온셋
              const flux = frames[i].rms - (frames[i-1].rms || 0);
              if (flux > 0.02 && (t - lastOnset) > minGapSec) {
                onsets.push(i);
                lastOnset = t;
              }
            }
          }
          return onsets;
        };

        try {
          statusEl.textContent = '🔄 오디오 디코딩 중...';
          await new Promise(r => setTimeout(r, 30)); // UI 업데이트 기회

          const arrayBuffer = await file.arrayBuffer();
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

          // 모노 다운믹스 (좌+우 평균)
          const SR = audioBuffer.sampleRate;
          const ch0 = audioBuffer.getChannelData(0);
          const ch1 = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : ch0;
          const mono = new Float32Array(ch0.length);
          for (let i = 0; i < mono.length; i++) mono[i] = (ch0[i] + ch1[i]) * 0.5;

          // 분석 파라미터
          const FRAME_SIZE = 2048;   // ~46ms @ 44100Hz
          const HOP_SIZE   = 512;    // ~11.6ms hop (4배 오버랩)
          const hopSec = HOP_SIZE / SR;
          const totalFrames = Math.floor((mono.length - FRAME_SIZE) / HOP_SIZE);

          statusEl.textContent = `🎵 피치 분석 중... 0%`;
          await new Promise(r => setTimeout(r, 30));

          // 프레임별 피치+RMS 추출
          const frames = [];
          const UPDATE_EVERY = Math.max(1, Math.floor(totalFrames / 20)); // 5%마다 UI 갱신
          for (let fi = 0; fi < totalFrames; fi++) {
            const start = fi * HOP_SIZE;
            const frame = mono.subarray(start, start + FRAME_SIZE);

            // RMS
            let rms = 0;
            for (let s = 0; s < frame.length; s++) rms += frame[s] * frame[s];
            rms = Math.sqrt(rms / frame.length);

            const hz = yinPitch(frame, SR);
            const midi = hzToMidi(hz);
            frames.push({ hz, midi, rms, t: start / SR });

            if (fi % UPDATE_EVERY === 0) {
              statusEl.textContent = `🎵 피치 분석 중... ${Math.round(fi / totalFrames * 70)}%`;
              await new Promise(r => setTimeout(r, 0)); // 이벤트 루프 양보
            }
          }

          statusEl.textContent = '🎶 음표 추출 중... 80%';
          await new Promise(r => setTimeout(r, 30));

          // 프레임 → 온셋/음표 그룹화
          // 에너지 flux 기반 온셋 후보
          const notes = [];
          let i = 0;
          while (i < frames.length) {
            if (frames[i].hz <= 0 || frames[i].midi < 36 || frames[i].midi > 96) { i++; continue; }
            // 같은 음 계속되는 구간 묶기
            const startMidi = frames[i].midi;
            const startT = frames[i].t;
            let j = i + 1;
            let midiVotes = { [startMidi]: 1 };
            while (j < frames.length) {
              const fm = frames[j];
              if (fm.hz <= 0) break; // 묵음 → 음표 종료
              const semDiff = Math.abs(fm.midi - startMidi);
              if (semDiff > 2) break; // 2반음 이상 차이 → 새 음표
              midiVotes[fm.midi] = (midiVotes[fm.midi] || 0) + 1;
              j++;
            }
            const durSec = (j - i) * hopSec;
            if (durSec >= 0.07) { // 70ms 미만 제거 (노이즈)
              // 최빈값 midi 선택
              const bestMidi = parseInt(Object.entries(midiVotes).sort((a,b) => b[1]-a[1])[0][0]);
              const name = midiToName(bestMidi);
              if (name) {
                const dur = durSec < 0.25 ? '8' : durSec < 0.55 ? 'q' : durSec < 1.1 ? 'h' : 'w';
                notes.push({ pitch: name, duration: dur, selected: false });
              }
            }
            i = j > i ? j : i + 1; // 진행 보장
          }

          audioCtx.close();

          statusEl.textContent = '✨ 변환 완료! 100%';
          await new Promise(r => setTimeout(r, 100));

          if (notes.length > 0) {
            state.notes = notes.slice(0, 48);
            state.selectedIdx = -1;
            _renderScore();
            statusEl.textContent = `✅ ${state.notes.length}개 음표 변환 완료! (자체 AI 분석)`;
          } else {
            statusEl.textContent = '⚠️ 음표를 감지하지 못했습니다. 멜로디가 명확한 파일을 사용해주세요.';
          }
        } catch(err) {
          statusEl.textContent = `⚠️ 변환 실패: ${err.message}`;
        }
      };

      // ── 초기 렌더링 ──────────────────────────────────────────────
      setTimeout(() => _renderScore(), 100);
    }

    // ── 다운로드 패널 ────────────────────────────────────────────
    _buildDownloadPanel() {
      const p = this.panels.download;
      p.innerHTML = `
        <div class="cgo-msec">
          <div class="cgo-msec-title">⬇️ 다운로드 &amp; PDF 리포트</div>
          <div class="cgo-dl-info">
            음악 생성 후 최종 분석 리포트를 PDF로 다운로드하세요.<br>
            <span style="color:#c4b5e8;font-size:10px;">보관 기능 없음 · 생성 즉시 다운로드 권장</span>
          </div>
          <div class="cgo-dl-cards">
            <div class="cgo-dl-card" id="cgo-dl-mp3">
              <div class="cgo-dl-card-ico">🎵</div>
              <div class="cgo-dl-card-label">MP3 음악 파일</div>
              <div class="cgo-dl-card-desc">생성된 힐링 음악을 MP3로 저장</div>
              <button class="cgo-dl-btn" onclick="this.closest('.cgo-dl-card').style.opacity='.5'">⬇ MP3 다운로드</button>
            </div>
            <div class="cgo-dl-card" id="cgo-dl-pdf">
              <div class="cgo-dl-card-ico">📄</div>
              <div class="cgo-dl-card-label">PDF 분석 리포트</div>
              <div class="cgo-dl-card-desc">주파수 · 악보 · 힐링 효과 종합 분석</div>
              <button class="cgo-dl-btn pdf" id="cgo-dl-pdf-btn">📥 PDF 리포트 생성</button>
            </div>
          </div>
          <div class="cgo-dl-report-preview" id="cgo-dl-report">
            <div class="cgo-dl-report-hdr">
              <div class="cgo-dl-report-title">🎵 CGO 주파수 뮤직 — 음악 분석 리포트</div>
              <div class="cgo-dl-report-sub" id="cgo-dl-report-date"></div>
            </div>
            <div class="cgo-dl-report-body" id="cgo-dl-report-body">
              <div class="cgo-dl-report-row"><span class="cgo-dl-report-k">선택 주파수</span><span class="cgo-dl-report-v" id="cgo-rpt-freq">432Hz</span></div>
              <div class="cgo-dl-report-row"><span class="cgo-dl-report-k">힐링 효과</span><span class="cgo-dl-report-v">자연 공명 · 세포 재생 · 안정감</span></div>
              <div class="cgo-dl-report-row"><span class="cgo-dl-report-k">BPM</span><span class="cgo-dl-report-v" id="cgo-rpt-bpm">—</span></div>
              <div class="cgo-dl-report-row"><span class="cgo-dl-report-k">장르 믹스</span><span class="cgo-dl-report-v" id="cgo-rpt-genre">—</span></div>
              <div class="cgo-dl-report-row"><span class="cgo-dl-report-k">조성/음계</span><span class="cgo-dl-report-v" id="cgo-rpt-key">—</span></div>
              <div class="cgo-dl-report-row"><span class="cgo-dl-report-k">보컬</span><span class="cgo-dl-report-v" id="cgo-rpt-vocal">—</span></div>
              <div class="cgo-dl-report-row"><span class="cgo-dl-report-k">악기</span><span class="cgo-dl-report-v" id="cgo-rpt-inst">—</span></div>
              <div class="cgo-dl-report-divider"></div>
              <div class="cgo-dl-report-analysis">
                <b>AI 힐링 분석</b><br>
                선택하신 <span id="cgo-rpt-freq2">432Hz</span> 주파수는 자연 공명 주파수로,
                뇌파를 알파파(8~13Hz) 상태로 유도하여 깊은 이완과 창의력 증진에 효과적입니다.
                CGO 위성 × 생체 × 역학 데이터와 결합된 이 음악은 개인 맞춤형 힐링을 제공합니다.
              </div>
            </div>
            <div class="cgo-dl-report-footer">
              🛰️ CGO-FULI · 세계 최초 AI 치료 음악 · 하루 1회 10원
            </div>
          </div>
        </div>
      `;
      // 날짜 삽입
      const d = new Date();
      const el = p.querySelector('#cgo-dl-report-date');
      if (el) el.textContent = d.toLocaleDateString('ko-KR', {year:'numeric',month:'long',day:'numeric'}) + ' 생성';
      // PDF 버튼 (미구현 - 안내)
      const pdfBtn = p.querySelector('#cgo-dl-pdf-btn');
      if (pdfBtn) pdfBtn.addEventListener('click', () => {
        this._updateReportFields();
        this._setStatus('📄 PDF 리포트 준비 중… (Stage 4 구현 예정)');
      });
    }

    // ── 리포트 필드 갱신 ────────────────────────────────────────
    _updateReportFields() {
      const set = (id, v) => { const el = this.root && this.root.querySelector(id); if(el) el.textContent = v; };
      set('#cgo-rpt-freq', this.selectedFreq ? this.selectedFreq + 'Hz' : '—');
      set('#cgo-rpt-freq2', this.selectedFreq ? this.selectedFreq + 'Hz' : '—');
      set('#cgo-rpt-bpm', this.tempoBpm + ' BPM');
      set('#cgo-rpt-genre', [...this.selectedGenres].join(', ') || '—');
      const keyRow = this.selected['key']; set('#cgo-rpt-key', keyRow ? keyRow.label : '—');
      const vocalRow = this.selected['vocal']; set('#cgo-rpt-vocal', vocalRow ? vocalRow.label : '—');
      const instRow = this.selected['instrument']; set('#cgo-rpt-inst', instRow ? instRow.label : '—');
    }

    // ── 차트 렌더 ───────────────────────────────────────────────
    _renderChart() {
      const p = this.panels.chart;
      const sec = document.createElement('div');
      sec.className = 'cgo-msec';
      sec.innerHTML = `<div class="cgo-msec-title">📊 <span data-k="24062">${t(24062)}</span></div>`;
      const list = document.createElement('div');
      list.className = 'cgo-chart-list';
      DEMO_CHART.forEach(item => {
        const el = document.createElement('div');
        el.className = 'cgo-chart-item';
        el.innerHTML = `
          <div class="cgo-chart-rank">${item.rank}</div>
          <div class="cgo-chart-thumb">${item.emoji}</div>
          <div class="cgo-chart-info">
            <div class="cgo-chart-name">${item.name}</div>
            <div class="cgo-chart-meta">${item.meta}</div>
          </div>
          <div class="cgo-chart-hz">${item.hz}</div>
        `;
        el.addEventListener('click', () => this._setStatus('🎵 ' + item.name + ' 준비 중…'));
        list.appendChild(el);
      });
      sec.appendChild(list);
      p.appendChild(sec);

      // 안내
      const notice = document.createElement('div');
      notice.style.cssText = 'margin:12px 14px;padding:14px;background:rgba(20,5,40,.7);border:1px solid rgba(168,85,247,.2);border-radius:12px;font-size:11px;color:#7c6fa8;line-height:1.7;';
      notice.innerHTML = '📌 직원 3인이 하루 50곡씩 제작 중 · 목표 10,000곡 달성 후 유저 업로드 차트 오픈<br>사용자 업로드 시 저작권 <b style="color:#c084fc">사용자 95% · CGO 5%</b>';
      p.appendChild(notice);
    }

    // ── 탭 전환 (보이는 것만 살린다 — lazy 빌드) ───────────────────
    _switchTab(tab) {
      // 편집 탭 이탈 시 재생 중이면 정지 (CGO strict destroy 원칙)
      if (this.activeTab === 'edit' && tab !== 'edit') {
        const stopBtn = this.panels.edit && this.panels.edit.querySelector('#cgo-score-stop');
        if (stopBtn) stopBtn.click();
      }
      this.activeTab = tab;
      this.tabsEl.querySelectorAll('.cgo-mtab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tab);
      });
      Object.keys(this.panels).forEach(k => {
        this.panels[k].style.display = k === tab ? 'block' : 'none';
      });

      // 해당 탭이 처음 열리는 경우에만 빌드 (lazy)
      if (!this._panelBuilt[tab]) {
        this._panelBuilt[tab] = true;
        if (tab === 'make')     this._buildMakePanel();
        if (tab === 'chart')    this._renderChart();
        if (tab === 'preset')   { this._buildPresetPanel(); this._renderPresets(); }
        if (tab === 'edit')     this._buildEditPanel();
        if (tab === 'download') this._buildDownloadPanel();
        this._updateResult();
      }
    }

    // ── 슬롯 그리기 ─────────────────────────────────────────────
    _resizeBg() {
      if (!this.bgCanvas) return;
      this.bgCanvas.width  = this.bgCanvas.offsetWidth  || window.innerWidth;
      this.bgCanvas.height = this.bgCanvas.offsetHeight || 200;
    }
    _resizeSlot(k) {
      const c = this.slotCanvases[k]; if (!c) return;
      c.width  = c.parentElement.offsetWidth  || 160;
      c.height = 42;
    }
    _drawSlot(k, scrollY) {
      const c = this.slotCanvases[k]; const ctx = this.slotCtxs[k];
      if (!ctx || !c) return;
      const W = c.width, H = c.height;
      const items = SLOT_DATA[k].items;
      const ITEM_H = H;
      ctx.clearRect(0, 0, W, H);
      const grad = ctx.createLinearGradient(0,0,0,H);
      grad.addColorStop(0,'rgba(10,0,21,.95)');
      grad.addColorStop(.5,'rgba(30,0,60,.8)');
      grad.addColorStop(1,'rgba(10,0,21,.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,W,H);
      const totalH = items.length * ITEM_H;
      const offsetY = -(scrollY % totalH);
      ctx.save();
      ctx.rect(0,0,W,H); ctx.clip();
      for (let rep = -1; rep <= 1; rep++) {
        items.forEach((item, i) => {
          const y = offsetY + (i + rep * items.length) * ITEM_H;
          if (y > H || y + ITEM_H < 0) return;
          const cx = y + ITEM_H/2;
          const dist = Math.abs(cx - H/2) / (H/2);
          const alpha = Math.max(0.15, 1 - dist * 1.5);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = dist < 0.2 ? '#f0abfc' : '#a78bfa';
          ctx.font = `${dist < 0.2 ? 'bold ' : ''}${Math.max(9, 11 - dist*3)}px 'Apple SD Gothic Neo',sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.length > 12 ? item.slice(0,11)+'…' : item, W/2, cx);
        });
      }
      ctx.restore();
    }

    // ── 배경 파티클 ─────────────────────────────────────────────
    _startBgCanvas() {
      const initP = () => {
        if (!this.bgCanvas) return;
        const n = Math.floor(this.bgCanvas.width * 0.06);
        this.particles = Array.from({length: n}, () => this._newParticle());
      };
      initP();
      const loop = () => {
        if (!this.bgCtx || !this.bgCanvas) return;
        const W = this.bgCanvas.width, H = this.bgCanvas.height;
        this.bgCtx.clearRect(0,0,W,H);
        this.particles.forEach(p => {
          p.y -= p.vy; p.x += p.vx;
          if (p.y < 0 || p.x < 0 || p.x > W) Object.assign(p, this._newParticle());
          this.bgCtx.globalAlpha = p.a;
          this.bgCtx.fillStyle = p.c;
          this.bgCtx.beginPath();
          this.bgCtx.arc(p.x, p.y, p.r, 0, Math.PI*2);
          this.bgCtx.fill();
        });
        this.bgAnimId = requestAnimationFrame(loop);
      };
      this.bgAnimId = requestAnimationFrame(loop);
    }
    _newParticle() {
      const W = this.bgCanvas ? this.bgCanvas.width : 300;
      const H = this.bgCanvas ? this.bgCanvas.height : 200;
      const colors = ['#a855f7','#c084fc','#818cf8','#f0abfc','#7c3aed'];
      return { x:Math.random()*W, y:H+5, r:Math.random()*2+.5, vy:Math.random()*.6+.2, vx:(Math.random()-.5)*.3, a:Math.random()*.45+.1, c:colors[Math.floor(Math.random()*colors.length)] };
    }

    // ── 스핀 ────────────────────────────────────────────────────
    _spinAll() {
      if (this.isSpinning) return;
      this.isSpinning = true;
      const spinBtn = this.root.querySelector('#cgo-spin-btn');
      if (spinBtn) { spinBtn.disabled = true; spinBtn.textContent = '⏳…'; }
      let done = 0;
      this.slotKeys.forEach((k, i) => {
        setTimeout(() => {
          this._spinOne(k, () => {
            done++;
            if (done === this.slotKeys.length) {
              this.isSpinning = false;
              if (spinBtn) { spinBtn.disabled = false; spinBtn.textContent = t(24054); }
              this._updateResult();
              this._setStatus('✨ 추첨 완료! 음악 생성 버튼을 눌러보세요.');
            }
          });
        }, i * 120);
      });
    }
    _spinOne(k, onDone) {
      const items = SLOT_DATA[k].items;
      const targetIdx = Math.floor(Math.random() * items.length);
      this.selected[k] = items[targetIdx];
      const ITEM_H = 42;
      const spinRounds = 3 + Math.random() * 2;
      const startPos = this.slotPositions[k];
      const endPos = targetIdx * ITEM_H + spinRounds * items.length * ITEM_H;
      const dur = 900 + Math.random() * 400;
      const t0 = performance.now();
      const animate = (now) => {
        const elapsed = now - t0;
        const t = Math.min(elapsed / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const pos = startPos + (endPos - startPos) * ease;
        this.slotPositions[k] = pos;
        this._drawSlot(k, pos);
        if (t < 1) {
          this.slotAnimIds[k] = requestAnimationFrame(animate);
        } else {
          this.slotPositions[k] = targetIdx * ITEM_H;
          this._drawSlot(k, targetIdx * ITEM_H);
          const valEl = this.root.querySelector(`#cgo-val-${k}`);
          if (valEl) valEl.textContent = this.selected[k];
          this.slotAnimIds[k] = null;
          if (onDone) onDone();
        }
      };
      if (this.slotAnimIds[k]) cancelAnimationFrame(this.slotAnimIds[k]);
      this.slotAnimIds[k] = requestAnimationFrame(animate);
    }

    // ── 결과 카드 업데이트 ───────────────────────────────────────
    _updateResult() {
      // 결과 카드는 여러 곳에 있을 수 있음 (freq 탭 + make 탭)
      const cards = this.root.querySelectorAll('.cgo-result-card');
      if (!cards.length) return;
      const freqOpt = FREQ_OPTIONS.find(f => f.hz === this.selectedFreq) || FREQ_OPTIONS[3];
      const tempo = bpmToStage(this.tempoBpm);
      // 선택된 장르 태그
      const genreTags = [...this.selectedGenres].map(id => {
        const genre = GENRE_MAP[id];
        if (!genre) return '';
        const grp = GENRE_GROUPS.find(g => g.genres.find(x => x.id === id));
        const gc = grp ? grp.color : '#a855f7';
        return `<span class="cgo-result-tag" style="color:${gc};border-color:${gc}40;">${genre.flag} ${genre.name}</span>`;
      }).join('');
      const html = `
        <div style="font-size:12px;color:#9d8ec4;margin-bottom:8px;" data-k="24068">${t(24068)}</div>
        <div class="cgo-result-tags">
          <span class="cgo-result-tag" style="color:${tempo.color};border-color:${tempo.color}40;">🥁 ${tempo.name} ${this.tempoBpm}BPM</span>
          ${genreTags}
          ${this.slotKeys.map(k => `<span class="cgo-result-tag">${SLOT_DATA[k].emoji} ${this.selected[k]}</span>`).join('')}
          ${(() => { const v = VOCAL_OPTIONS.find(o => o.id === this.selected.vocal); return v ? `<span class="cgo-result-tag" style="color:${v.color};border-color:${v.color}40;">${v.emoji} ${v.label}</span>` : ''; })()}
          ${this.selectedInstrIds.size ? `<span class="cgo-result-tag">🎸 악기 ${this.selectedInstrIds.size}개</span>` : ''}
          <span class="cgo-result-tag" style="color:${freqOpt.color};border-color:${freqOpt.color}40;">🌊 ${freqOpt.label}</span>
        </div>
      `;
      // 모든 결과 카드(freq 탭 + make 탭 등) 동시 업데이트
      cards.forEach(c => { c.innerHTML = html; });
    }

    // ── 주파수 선택 ─────────────────────────────────────────────
    _selectFreq(hz) {
      this.selectedFreq = hz;
      this.root.querySelectorAll('.cgo-freq-btn').forEach(b => {
        b.classList.toggle('active', Number(b.dataset.hz) === hz);
      });
      this._updateResult();
      const freqOpt = FREQ_OPTIONS.find(f => f.hz === hz);
      if (freqOpt) this._setStatus('🌊 ' + freqOpt.label + ' · ' + freqOpt.desc + ' 선택됨');
    }

    // ── Web Audio: 미리 듣기 ────────────────────────────────────
    _quickPlay() {
      if (this.isPlaying) { this._stopAudio(); return; }
      this._startAudio();
    }
    _togglePlay() {
      if (this.isPlaying) this._stopAudio(); else this._startAudio();
    }
    _startAudio() {
      try {
        if (!this.audioCtx || this.audioCtx.state === 'closed') {
          this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume().catch(()=>{});

        // 기존 노드 정리
        this._cleanAudioNodes();

        const ctx = this.audioCtx;

        // ── 마스터 게인 (페이드인) ──
        this.gainNode = ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 1.5);
        this.gainNode.connect(ctx.destination);

        // ── 리듬 게인 (BPM 펄스용 별도 게인) ──
        this.rhythmGain = ctx.createGain();
        this.rhythmGain.gain.setValueAtTime(1.0, ctx.currentTime);
        this.rhythmGain.connect(this.gainNode);

        // ── 조성 분석 ──
        const keyName = this.selected.key || 'A Major';
        const noteName = keyName.split(' ')[0];
        const baseHz = NOTE_FREQ[noteName] || 440;
        const isMinor = keyName.includes('Minor');

        // ── 장르에 따른 파형 선택 ──
        const genre = this.selected.genre || '';
        const useWave = genre.includes('재즈') || genre.includes('보사') ? 'sine'
          : genre.includes('국악') || genre.includes('힐링') ? 'sine'
          : 'triangle';

        // ── 화음 구성 (장/단조) ──
        const intervals = isMinor
          ? [1, 1.189, 1.498, 1.782, 2]
          : [1, 1.260, 1.498, 1.888, 2];

        intervals.forEach((ratio, i) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = i === 0 ? 'sine' : useWave;
          osc.frequency.setValueAtTime(baseHz * ratio, ctx.currentTime);
          oscGain.gain.setValueAtTime(i === 0 ? 0.55 : Math.max(0.03, 0.14 - i * 0.025), ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(this.rhythmGain);
          osc.start();
          this.oscNodes.push({ osc, gain: oscGain });
        });

        // ── 치료 주파수 오버레이 ──
        if (this.selectedFreq > 0) {
          const hz = this.selectedFreq;
          this.healOsc  = ctx.createOscillator();
          this.healGain = ctx.createGain();
          this.healOsc.type = 'sine';
          this.healOsc.frequency.setValueAtTime(hz < 50 ? 100 + hz : hz, ctx.currentTime);
          this.healGain.gain.setValueAtTime(hz < 50 ? 0.04 : 0.07, ctx.currentTime);
          this.healOsc.connect(this.healGain);
          this.healGain.connect(ctx.destination);
          this.healOsc.start();
        }

        // ── BPM 리듬 펄스 엔진 시작 ──
        this.beatCount = 0;
        this._startRhythmPulse();

        this.isPlaying = true;
        this._updatePlayerUI(true);
        const freqLabel = (FREQ_OPTIONS.find(f => f.hz === this.selectedFreq) || {label:'OFF'}).label;
        const stage = bpmToStage(this.tempoBpm);
        this._setStatus(`🎵 ${this.tempoBpm}BPM · ${stage.name} · ${keyName} · ${freqLabel}`);

        // 30초 후 자동 페이드아웃
        this.playTimerId = setTimeout(() => this._stopAudio(), 30000);

        // 진행바
        this.playProgress = 0;
        const startTime = Date.now();
        const barEl = this.root && this.root.querySelector('#cgo-player-bar');
        const TOTAL = 30; // 30초
        const barTick = () => {
          if (!this.isPlaying || !barEl) return;
          this.playProgress = Math.min((Date.now() - startTime) / (TOTAL * 1000), 1);
          barEl.style.width = (this.playProgress * 100) + '%';
          // 히어로 플레이어 싱크
          this._syncHeroPlayer(this.playProgress, Date.now() - startTime, TOTAL * 1000);
          if (this.playProgress < 1) requestAnimationFrame(barTick);
        };
        requestAnimationFrame(barTick);

      } catch(e) {
        this._setStatus('⚠️ 오디오 시작 실패: ' + e.message);
        console.error('[CGO-MUSIC] Audio Error:', e);
      }
    }

    // ── BPM 리듬 펄스 엔진 ──────────────────────────────────────
    // Web Audio API의 GainNode envelope를 이용해 BPM에 맞는 박자감 구현
    // 재생 중 tempoBpm 변경 시 즉각 반응
    _startRhythmPulse() {
      if (!this.audioCtx || !this.rhythmGain) return;
      clearTimeout(this.rhythmTimerId);

      const tick = () => {
        if (!this.isPlaying || !this.audioCtx || !this.rhythmGain) return;

        const bpm = this.tempoBpm;
        const beatMs = (60 / bpm) * 1000;          // 한 박자 시간 (ms)
        const ctx = this.audioCtx;
        const g = this.rhythmGain.gain;
        const now = ctx.currentTime;

        // 박자 엑센트: 첫 박(강박) vs 나머지
        const isStrong = (this.beatCount % 4 === 0);  // 4/4박자 기준 강박
        const peakGain = isStrong ? 1.0 : 0.65;
        const attackMs = Math.min(beatMs * 0.04, 15);  // 빠른 어택 (BPM 연동)
        const decayMs  = beatMs * 0.55;                // 디케이 (박자 안에서 자연 감쇠)

        // Envelope: 빠르게 올리고 → 디케이
        g.cancelScheduledValues(now);
        g.setValueAtTime(0.35, now);
        g.linearRampToValueAtTime(peakGain, now + attackMs / 1000);
        g.exponentialRampToValueAtTime(0.35, now + decayMs / 1000);

        this.beatCount++;

        // 다음 박자 스케줄 (BPM이 바뀌어도 즉시 반영)
        this.rhythmTimerId = setTimeout(tick, beatMs);
      };

      tick();
    }

    // 슬라이더 BPM 변경 시 실시간 반영
    _applyBpmToAudio() {
      if (!this.isPlaying) return;
      // 리듬 펄스는 tempoBpm을 직접 읽으므로 타이머만 리셋
      clearTimeout(this.rhythmTimerId);
      this.beatCount = 0;
      this._startRhythmPulse();
      const stage = bpmToStage(this.tempoBpm);
      this._setStatus(`🎵 ${this.tempoBpm}BPM · ${stage.name} · ${this.selected.key || ''}`);
    }
    _stopAudio() {
      clearTimeout(this.playTimerId);
      this._cleanAudioNodes();
      this.isPlaying = false;
      this._updatePlayerUI(false);
      this._setStatus('⏹ 정지됨');
      const barEl = this.root && this.root.querySelector('#cgo-player-bar');
      if (barEl) barEl.style.width = '0%';
      // 히어로 플레이어 리셋
      this._syncHeroPlayer(0, 0, 0);
      if (this._hpPlayBtn) { this._hpPlayBtn.textContent = '▶'; this._hpPlayBtn.classList.remove('active'); }
    }
    _cleanAudioNodes() {
      // 리듬 타이머 먼저 정지
      clearTimeout(this.rhythmTimerId);
      this.rhythmTimerId = null;
      this.beatCount = 0;
      // 오실레이터 전부 정리
      this.oscNodes.forEach(n => { try { n.osc.stop(); n.osc.disconnect(); n.gain.disconnect(); } catch(e){} });
      this.oscNodes = [];
      if (this.healOsc)   { try { this.healOsc.stop();  this.healOsc.disconnect();  } catch(e){} this.healOsc = null; }
      if (this.healGain)  { try { this.healGain.disconnect(); } catch(e){} this.healGain = null; }
      if (this.rhythmGain){ try { this.rhythmGain.disconnect(); } catch(e){} this.rhythmGain = null; }
      if (this.gainNode)  { try { this.gainNode.disconnect(); } catch(e){} this.gainNode = null; }
    }
    _updatePlayerUI(playing) {
      const playerEl = this.root && this.root.querySelector('#cgo-player');
      if (!playerEl) return;
      if (playing) {
        playerEl.classList.add('visible');
        const titleEl = playerEl.querySelector('#cgo-player-title');
        const subEl   = playerEl.querySelector('#cgo-player-sub');
        const playBtn = playerEl.querySelector('#cgo-player-play');
        const freqOpt = FREQ_OPTIONS.find(f => f.hz === this.selectedFreq) || {label:'OFF'};
        if (titleEl) titleEl.textContent = `${this.selected.genre || ''} · ${this.selected.key || ''}`;
        if (subEl)   subEl.textContent   = `${freqOpt.label} · ${this.selected.instrument || ''}`;
        if (playBtn) playBtn.textContent = '⏸';
      } else {
        const playBtn = playerEl.querySelector('#cgo-player-play');
        if (playBtn) playBtn.textContent = '▶';
      }
      // 히어로 플레이어 재생 버튼 상태 싱크
      if (this._hpPlayBtn) {
        this._hpPlayBtn.textContent = playing ? '⏸' : '▶';
        this._hpPlayBtn.classList.toggle('active', !!playing);
      }
    }

    // ── 히어로 플레이어 싱크 ────────────────────────────────────
    _syncHeroPlayer(ratio, elapsedMs, totalMs) {
      try {
        if (this._hpBarFill) this._hpBarFill.style.width = (ratio * 100) + '%';
        if (this._hpBarDot)  this._hpBarDot.style.left   = (ratio * 100) + '%';
        if (this._hpCurEl && elapsedMs !== undefined) {
          const s = Math.floor((elapsedMs || 0) / 1000);
          this._hpCurEl.textContent = `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
        }
        if (this._hpDurEl && totalMs !== undefined && totalMs > 0) {
          const s = Math.floor(totalMs / 1000);
          this._hpDurEl.textContent = `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
        }
      } catch(e) {}
    }

    // ── AI 음악 생성 ────────────────────────────────────────────
    _onGenerate() {
      const tempoStage = bpmToStage(this.tempoBpm);
      const genreList = [...this.selectedGenres].map(id => GENRE_MAP[id]).filter(Boolean);
      // 선택된 악기 GM 번호 목록
      const instrGmList = [...this.selectedInstrIds].map(id => {
        const ins = INSTRUMENT_DATA.find(x => x.id === id);
        return ins ? ins.gm : null;
      }).filter(v => v !== null);

      const combo = {
        key: this.selected.key, bpm: this.tempoBpm,
        tempoName: tempoStage.name, tempoNameEn: tempoStage.nameEn,
        genres: genreList.map(g=>g.nameEn), genresMix: genreList.length > 1,
        vocal: this.selected.vocal,
        instrument: this.selected.instrument,
        instrGmList,
        freq: this.selectedFreq
      };

      this._setStatus(t(24066));
      const genBtn = this.root && this.root.querySelector('#cgo-gen-btn');
      if (genBtn) { genBtn.disabled = true; genBtn.textContent = '⏳ ' + t(24066); }

      if (typeof this.onGenerate === 'function') {
        this.onGenerate(combo);
      } else {
        // 🎵 데모: soundfont 코드 + 힐링 오실레이터 동시 재생
        const keyName = this.selected.key || 'C Major';
        if (instrGmList.length > 0) {
          // 선택 악기로 코드 미리듣기
          playSfChord(instrGmList, keyName, 1.5).catch(()=>{});
          this._setStatus(`🎵 ${instrGmList.length}개 악기 · ${keyName} · ${tempoStage.name}`);
        } else {
          // 악기 미선택 시 기본 피아노(GM 0)로
          playSfChord([0], keyName, 1.5).catch(()=>{});
        }
        // 힐링 주파수 오실레이터도 함께
        this._startAudio();
        setTimeout(() => {
          this._setStatus('✅ ' + t(24067));
          if (genBtn) { genBtn.disabled = false; genBtn.textContent = t(24055) + ' · ' + t(24065); }
        }, 2500);
      }
    }

    // ── 프리셋 ──────────────────────────────────────────────────
    _loadPresets() {
      try { return JSON.parse(localStorage.getItem('cgo_music_presets') || '[]'); } catch(e){ return []; }
    }
    _savePreset() {
      const label = `${this.selected.genre} · ${this.selected.key}`;
      const p = { label, selected:{...this.selected}, freq:this.selectedFreq, ts:Date.now() };
      this.presets.unshift(p);
      if (this.presets.length > 10) this.presets.length = 10;
      try { localStorage.setItem('cgo_music_presets', JSON.stringify(this.presets)); } catch(e){}
      this._renderPresets();
      this._setStatus('💾 프리셋 저장됨: ' + label);
    }
    _renderPresets() {
      const listEl = this.root && this.root.querySelector('#cgo-preset-list');
      if (!listEl) return;
      listEl.innerHTML = '';
      if (!this.presets.length) {
        listEl.innerHTML = `<p style="font-size:12px;color:#7c6fa8;padding:0 14px;" data-k="24073">${t(24073)}</p>`;
        return;
      }
      const bar = document.createElement('div');
      bar.className = 'cgo-preset-bar';
      this.presets.forEach(p => {
        const chip = document.createElement('button');
        chip.className = 'cgo-preset-chip';
        chip.textContent = '⭐ ' + p.label;
        chip.addEventListener('click', () => {
          Object.assign(this.selected, p.selected);
          this.selectedFreq = p.freq || 0;
          this._selectFreq(this.selectedFreq);
          this.slotKeys.forEach(k => {
            const valEl = this.root.querySelector(`#cgo-val-${k}`);
            if (valEl) valEl.textContent = this.selected[k];
          });
          this._updateResult();
          this._setStatus('⭐ 프리셋 불러옴: ' + p.label);
          this._switchTab('freq');
        });
        bar.appendChild(chip);
      });
      const saveBtn = document.createElement('button');
      saveBtn.className = 'cgo-preset-save';
      saveBtn.setAttribute('data-k', '24064');
      saveBtn.textContent = '+ ' + t(24064);
      saveBtn.addEventListener('click', () => this._savePreset());
      bar.appendChild(saveBtn);
      listEl.appendChild(bar);
    }

    // ── 상태 텍스트 ─────────────────────────────────────────────
    _setStatus(msg) {
      const el = this.root && this.root.querySelector('#cgo-status');
      if (el) el.textContent = msg;
    }

    // ── 스마트 프롬프트 파싱 & 자동 세팅 ────────────────────────
    // 자연어 문장 → 감성 키워드 분석 → 주파수/악기/BPM 자동 세팅
    _applySmartPrompt(txt) {
      if (!txt || !txt.trim()) return;
      const t = txt.toLowerCase();

      // ① 주파수 매핑 ─────────────────────────────────────────────
      // 감성/시간대/상황 키워드 → 힐링 주파수 자동 선택
      let freqId = '432'; // 기본값: 432Hz 자연 공명
      if (/집중|공부|업무|작업|브레인|뇌파|지구|접지|grounding|슈만|7\.83/i.test(t)) {
        freqId = '783';  // 7.83Hz 슈만공명
      } else if (/치유|회복|사랑|재생|dna|528|세포|힐링|상처|위로|회복|치료/i.test(t)) {
        freqId = '528';  // 528Hz DNA 회복
      } else if (/순수|연주|악기만|힐링없이|클래식/i.test(t)) {
        freqId = 'pure'; // 순수 음악
      } else {
        freqId = '432';  // 432Hz: 안정·명상·수면·차분
      }
      // 주파수 카드 클릭 시뮬레이션
      try {
        const freqCard = this.root && this.root.querySelector(`[data-freq="${freqId}"]`);
        if (freqCard) freqCard.click();
        else {
          // data-freq 셀렉터 없으면 this.selectedFreq 직접 세팅
          this.selectedFreq = freqId;
          this._updateResult && this._updateResult();
        }
      } catch(e) {}

      // ② BPM 매핑 ────────────────────────────────────────────────
      // 분위기/시간/에너지 키워드 → BPM 자동 세팅
      let bpm = 72; // 기본 Adagio(차분)
      if (/명상|수면|잠|깊은|고요|조용|느린|Largo|아주 느리/i.test(t)) {
        bpm = 55;   // Largo: 명상·깊은 힐링
      } else if (/차분|안정|저녁|밤|늦은|몽환|느긋|Adagio/i.test(t)) {
        bpm = 65;   // Adagio: 차분·감성
      } else if (/보통|편안|카페|일상|Andante/i.test(t)) {
        bpm = 82;   // Andante: 편안한 스탠다드
      } else if (/경쾌|활기|리듬|Allegro|빠른|신나/i.test(t)) {
        bpm = 112;  // Allegro: 경쾌·리드미컬
      } else if (/에너지|드라이브|빠르게|Presto|강렬/i.test(t)) {
        bpm = 132;  // Presto: 고에너지
      }
      try {
        this.selectedBpm = bpm;
        // 슬라이더 UI 업데이트
        const sliderEl = this.root && this.root.querySelector('.cgo-tempo-slider, input[type="range"]');
        if (sliderEl) {
          sliderEl.value = bpmToSlider(bpm);
          sliderEl.dispatchEvent(new Event('input'));
        }
      } catch(e) {}

      // ③ 장르/악기 힌트 저장 (추첨통 탭 빌드 후 하이라이트용)
      // 키워드 → 장르 ID 매핑
      const GENRE_MAP = [
        { re:/국악|가야금|해금|판소리|한국/i,       id:'gugak'    },
        { re:/샹송|프랑스|아코디언/i,               id:'chanson'  },
        { re:/플라멩코|스페인|집시/i,               id:'flamenco' },
        { re:/켈틱|아일랜드|스코틀랜드|하프/i,      id:'celtic'   },
        { re:/보사노바|브라질|삼바/i,               id:'bossanova'},
        { re:/아프로|아프리카|타악기/i,             id:'afrobeat' },
        { re:/인도|라가|시타르|차크라/i,            id:'raga'     },
        { re:/중국|비파|얼후/i,                     id:'chinese'  },
        { re:/일본|사미센|샤쿠하치|선(Zen)?/i,      id:'japanese' },
        { re:/탱고|아르헨티나|반도네온/i,           id:'tango'    },
        { re:/안데스|페루|팬플루트|케나/i,          id:'andean'   },
        { re:/아랍|중동|우드|마캄/i,               id:'maqam'    },
        { re:/힐링|치유|앰비언트|명상음악/i,        id:'healing'  },
        { re:/뉴에이지|피아노|현대/i,              id:'newage'   },
      ];
      this._promptGenreHint = null;
      for (const g of GENRE_MAP) {
        if (g.re.test(t)) { this._promptGenreHint = g.id; break; }
      }

      // ④ 추첨통 탭 이동 후 슬롯 자동 스핀 ──────────────────────
      this._switchTab('make');
      // make 패널이 빌드된 후 스핀 실행
      setTimeout(() => {
        try {
          // 조성/음계 추첨통 자동 스핀
          if (typeof this._spinAll === 'function') this._spinAll();
          // 장르 힌트가 있으면 해당 장르 카드 하이라이트
          if (this._promptGenreHint) {
            const gCard = this.root && this.root.querySelector(`[data-genre="${this._promptGenreHint}"]`);
            if (gCard) {
              gCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              gCard.style.boxShadow = '0 0 0 2.5px #0d9488, 0 0 12px rgba(13,148,136,.4)';
              setTimeout(() => { try { gCard.style.boxShadow = ''; } catch(e) {} }, 2500);
            }
          }
        } catch(e) {}
      }, 350);

      // ⑤ 상태바 메시지
      try {
        const statusEl = this.root && this.root.querySelector('#cgo-status');
        if (statusEl) {
          statusEl.textContent = `✨ 스마트 프롬프트 적용됨 — ${bpm}BPM · ${freqId === '783' ? '7.83Hz 슈만공명' : freqId === '528' ? '528Hz DNA회복' : freqId === 'pure' ? '순수음악' : '432Hz 자연공명'}`;
        }
      } catch(e) {}
    }

    // ── Destroy (탭 이탈 시 메모리 100% 해제) ───────────────────
    destroy() {
      // 1. 오디오 완전 정리
      clearTimeout(this.playTimerId);
      this._cleanAudioNodes();
      if (this.audioCtx) {
        try { this.audioCtx.close(); } catch(e){}
        this.audioCtx = null;
      }
      this.isPlaying = false;

      // 2. 배경 파티클 중단
      if (this.bgAnimId) { cancelAnimationFrame(this.bgAnimId); this.bgAnimId = null; }

      // 3. 슬롯 애니메이션 중단
      this.slotKeys.forEach(k => {
        if (this.slotAnimIds[k]) { cancelAnimationFrame(this.slotAnimIds[k]); this.slotAnimIds[k] = null; }
        if (this.slotCtxs[k] && this.slotCanvases[k]) {
          try { this.slotCtxs[k].clearRect(0,0,this.slotCanvases[k].width,this.slotCanvases[k].height); } catch(e){}
        }
        this.slotCanvases[k] = null;
        this.slotCtxs[k] = null;
      });

      // 4. 배경 Canvas
      if (this.bgCtx && this.bgCanvas) {
        try { this.bgCtx.clearRect(0,0,this.bgCanvas.width,this.bgCanvas.height); } catch(e){}
      }
      this.bgCanvas = null; this.bgCtx = null;

      // 5. resize 리스너 제거
      if (this._onResize) { window.removeEventListener('resize', this._onResize); this._onResize = null; }

      // 5-b. MutationObserver 정리
      if (this._pageObs) { try { this._pageObs.disconnect(); } catch(e){} this._pageObs = null; }

      // 6. DOM 제거
      if (this.root && this.root.parentNode) { this.root.parentNode.removeChild(this.root); }
      this.root = null;
      this.particles = [];

      // 7. Soundfont AudioContext 정리 (모듈 종료 시)
      if (sfAudioCtx && sfAudioCtx.state !== 'closed') {
        try { sfAudioCtx.close(); } catch(e){}
        sfAudioCtx = null;
      }

      console.log('[Destroy] CGO 주파수 뮤직 메모리 완전 정화됨 ✅');
    }
  }

  global.CGOMusicModule = FrequencyMusicModule;

  // ── 첫 사용자 상호작용 시 주요 soundfont 프리로드 ───────────────
  // 피아노(0), 바이올린(40), 나일론기타(24), 플루트(73) — 가장 자주 쓰는 악기
  const PRELOAD_GMS = [0, 24, 40, 73];
  let _sfPreloaded = false;
  function _preloadCommonSoundfonts() {
    if (_sfPreloaded) return;
    _sfPreloaded = true;
    // AudioContext를 먼저 언락 후 프리로드
    setTimeout(() => {
      try { getSfCtx(); } catch(e) {}
      PRELOAD_GMS.forEach(gm => loadSoundfont(gm).catch(()=>{}));
    }, 500);
  }
  // 첫 pointerdown/click/keydown 때 프리로드 시작
  if (typeof document !== 'undefined') {
    const _onFirstInteract = () => {
      _preloadCommonSoundfonts();
      document.removeEventListener('pointerdown', _onFirstInteract, true);
      document.removeEventListener('keydown', _onFirstInteract, true);
    };
    document.addEventListener('pointerdown', _onFirstInteract, { capture: true, once: true });
    document.addEventListener('keydown', _onFirstInteract, { capture: true, once: true });
  }

}(typeof window !== 'undefined' ? window : global));
