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

  // SLOT_DATA — genre 제거 (장르는 카드 선택기로 대체)
  const SLOT_DATA = {
    key:        { label:'조성/음계', labelKey:24049, emoji:'🎵', items:['C Major','C# Major','D Major','D# Major','E Major','F Major','F# Major','G Major','G# Major','A Major','A# Major','B Major','C Minor','C# Minor','D Minor','D# Minor','E Minor','F Minor','F# Minor','G Minor','G# Minor','A Minor','A# Minor','B Minor'] },
    vocal:      { label:'보컬',     labelKey:24052, emoji:'🎤', items:['남성(Male)','여성(Female)','혼성(Duet)','무보컬(BGM)','어린이','합창(Choir)'] },
    instrument: { label:'세계 악기', labelKey:24053, emoji:'🪕', items:['가야금(한국)','해금(한국)','아코디언(프랑스)','만돌린(이탈리아)','우드(중동)','칼림바(아프리카)','팬플루트(안데스)','시타르(인도)','케나(페루)','딤베(서아프리카)','비파(중국)','사미센(일본)','두둑(아르메니아)','오카리나','하프','첼로'] }
  };

  const FREQ_OPTIONS = [
    { hz:432,  label:'432Hz',       descKey:24056, desc:'자연 공명·안정',  color:'#f59e0b' },
    { hz:528,  label:'528Hz',       descKey:24057, desc:'DNA 회복·사랑',    color:'#10b981' },
    { hz:7.83, labelKey:24059, label:'슈만공명', descKey:24058, desc:'지구 뇌파 동조', color:'#3b82f6' },
    { hz:0,    label:'OFF',         descKey:24060, desc:'순수 음악',         color:'#6b7280' }
  ];

  // ── NOTE → 주파수 맵 (Web Audio API용) ──────────────────────────
  const NOTE_FREQ = { C:261.63,'C#':277.18,D:293.66,'D#':311.13,E:329.63,F:349.23,'F#':369.99,G:392,'G#':415.3,A:440,'A#':466.16,B:493.88 };

  // ── CSS ─────────────────────────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('cgo-music-css-v2')) return;
    const s = document.createElement('style');
    s.id = 'cgo-music-css-v2';
    s.textContent = `
/* ─── 루트 래퍼 ─── */
#cgo-music-root{font-family:'Segoe UI','Apple SD Gothic Neo',sans-serif;background:#06000f;color:#e8d5ff;min-height:100vh;position:relative;overflow-x:hidden;padding-bottom:90px;}

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

/* ─── 섹션 공통 ─── */
.cgo-msec{padding:20px 14px 4px;}
.cgo-msec-title{font-size:13px;font-weight:800;color:#c084fc;margin:0 0 12px;display:flex;align-items:center;gap:6px;}
.cgo-msec-title::before{content:'';width:4px;height:16px;border-radius:2px;background:linear-gradient(180deg,#a855f7,#7c3aed);}

/* ─── 추첨통 슬롯 ─── */
.cgo-slot-grid{display:flex;flex-direction:column;gap:8px;}
.cgo-slot-row{background:rgba(20,5,40,.7);border:1px solid rgba(168,85,247,.2);border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:border-color .2s,background .2s;}
.cgo-slot-row:active{background:rgba(30,8,60,.9);}
.cgo-slot-row-label{font-size:11px;color:#9d8ec4;width:68px;flex-shrink:0;line-height:1.4;}
.cgo-slot-row-label b{display:block;font-size:12.5px;color:#d8b4fe;font-weight:700;}
.cgo-slot-canvas-wrap{flex:1;height:42px;overflow:hidden;border-radius:8px;background:rgba(10,0,21,.6);}
.cgo-slot-canvas-wrap canvas{width:100%;height:42px;}
.cgo-slot-row-val{font-size:11px;font-weight:700;color:#f0abfc;width:90px;text-align:right;flex-shrink:0;line-height:1.3;}

/* ─── 박자(템포) 레인보우 바 ─── */
.cgo-tempo-wrap{background:rgba(20,5,40,.7);border:1px solid rgba(168,85,247,.2);border-radius:14px;padding:14px 14px 16px;cursor:default;}
.cgo-tempo-label{font-size:11px;color:#9d8ec4;margin-bottom:10px;display:flex;align-items:center;gap:6px;}
.cgo-tempo-label b{font-size:12.5px;color:#d8b4fe;font-weight:700;}
.cgo-tempo-rainbow{position:relative;padding-top:28px;margin-bottom:4px;}
/* BPM 말풍선 — 썸 위에 떠있음 */
.cgo-tempo-bubble{position:absolute;top:0;transform:translateX(-50%);background:rgba(168,85,247,.95);color:#fff;font-size:11px;font-weight:800;font-variant-numeric:tabular-nums;padding:2px 7px;border-radius:6px;pointer-events:none;white-space:nowrap;transition:left .05s;box-shadow:0 2px 8px rgba(0,0,0,.4);}
.cgo-tempo-bubble::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:rgba(168,85,247,.95);}
.cgo-tempo-rainbow input[type=range]{
  width:100%;height:12px;border-radius:6px;outline:none;border:none;cursor:pointer;
  -webkit-appearance:none;appearance:none;
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
  -webkit-appearance:none;width:26px;height:26px;border-radius:50%;
  background:#fff;border:3px solid #a855f7;
  box-shadow:0 0 14px rgba(168,85,247,.7),0 2px 8px rgba(0,0,0,.5);
  cursor:pointer;transition:transform .1s;
}
.cgo-tempo-rainbow input[type=range]::-webkit-slider-thumb:active{transform:scale(1.2);}
.cgo-tempo-rainbow input[type=range]::-moz-range-thumb{
  width:26px;height:26px;border-radius:50%;
  background:#fff;border:3px solid #a855f7;
  box-shadow:0 0 14px rgba(168,85,247,.7);cursor:pointer;
}
/* 틱 마커 (5개 고정 위치) */
.cgo-tempo-ticks{position:relative;height:28px;margin-top:4px;margin-bottom:6px;}
.cgo-tempo-tick{position:absolute;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;}
.cgo-tempo-tick-dot{width:5px;height:5px;border-radius:50%;transition:transform .2s,box-shadow .2s;}
.cgo-tempo-tick-name{font-size:9px;font-weight:700;color:#7c6fa8;transition:color .2s;white-space:nowrap;text-align:center;line-height:1.2;}
.cgo-tempo-tick.active .cgo-tempo-tick-name{color:#f0abfc;}
.cgo-tempo-tick.active .cgo-tempo-tick-dot{transform:scale(1.6);box-shadow:0 0 6px currentColor;}
/* 하단 정보 카드 */
.cgo-tempo-display{display:flex;align-items:center;justify-content:space-between;background:rgba(10,0,21,.6);border-radius:10px;padding:10px 14px;margin-top:6px;}
.cgo-tempo-bpm{font-size:26px;font-weight:900;font-variant-numeric:tabular-nums;line-height:1;}
.cgo-tempo-bpm-unit{font-size:12px;font-weight:500;color:#9d8ec4;margin-left:3px;}
.cgo-tempo-info{text-align:right;}
.cgo-tempo-info-name{font-size:13px;font-weight:800;}
.cgo-tempo-info-en{font-size:10px;color:#7c6fa8;margin-top:1px;}
.cgo-tempo-info-desc{font-size:10px;color:#9d8ec4;margin-top:3px;max-width:160px;line-height:1.4;}

/* ─── 스핀 버튼 ─── */
.cgo-spin-wrap{padding:14px 14px 4px;display:flex;gap:8px;}
.cgo-spin-btn{flex:1;padding:14px;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;color:#fff;font-size:15px;font-weight:800;cursor:pointer;letter-spacing:.04em;box-shadow:0 4px 20px rgba(168,85,247,.4);transition:transform .15s,box-shadow .15s;font-family:inherit;}
.cgo-spin-btn:active{transform:scale(.97);box-shadow:0 2px 10px rgba(168,85,247,.3);}
.cgo-spin-btn:disabled{opacity:.5;cursor:not-allowed;}
.cgo-play-btn{width:52px;height:52px;border-radius:14px;background:rgba(168,85,247,.15);border:1.5px solid rgba(168,85,247,.4);color:#c084fc;font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s;}
.cgo-play-btn:active{background:rgba(168,85,247,.3);}

/* ─── 주파수 선택 ─── */
.cgo-freq-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;}
.cgo-freq-btn{border-radius:12px;padding:10px 4px;background:rgba(20,5,40,.7);border:1.5px solid rgba(100,60,180,.25);color:#9d8ec4;font-size:10px;font-weight:700;cursor:pointer;text-align:center;transition:all .2s;line-height:1.35;font-family:inherit;}
.cgo-freq-btn b{display:block;font-size:12.5px;margin-bottom:2px;}
.cgo-freq-btn.active{border-color:currentColor;background:rgba(20,5,40,.95);box-shadow:0 0 10px currentColor;}

/* ─── 상태 / 결과 ─── */
.cgo-status{min-height:28px;padding:0 14px;font-size:12px;color:#a78bfa;text-align:center;}
.cgo-result-card{background:linear-gradient(135deg,rgba(20,5,40,.9),rgba(30,8,60,.85));border:1px solid rgba(168,85,247,.3);border-radius:16px;padding:16px;margin:0 14px;}
.cgo-result-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}
.cgo-result-tag{font-size:10.5px;padding:3px 10px;border-radius:999px;background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.35);color:#d8b4fe;font-weight:600;}

/* ─── 생성 버튼 ─── */
.cgo-gen-wrap{padding:14px;}
.cgo-gen-btn{width:100%;padding:16px;border-radius:16px;background:linear-gradient(135deg,#6d28d9,#7c3aed,#a855f7);border:none;color:#fff;font-size:16px;font-weight:800;cursor:pointer;letter-spacing:.04em;box-shadow:0 6px 24px rgba(168,85,247,.45);position:relative;overflow:hidden;font-family:inherit;transition:transform .15s;}
.cgo-gen-btn::before{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);animation:cgoShine 2.5s ease-in-out infinite;}
@keyframes cgoShine{0%{left:-100%}60%,100%{left:120%}}
.cgo-gen-btn:active{transform:scale(.98);}
.cgo-gen-btn:disabled{opacity:.5;cursor:not-allowed;}

/* ─── 차트 섹션 ─── */
.cgo-chart-list{display:flex;flex-direction:column;gap:8px;}
.cgo-chart-item{background:rgba(20,5,40,.7);border:1px solid rgba(168,85,247,.15);border-radius:12px;padding:11px 12px;display:flex;align-items:center;gap:10px;cursor:pointer;}
.cgo-chart-rank{font-family:monospace;font-size:13px;font-weight:900;color:#7c3aed;width:22px;flex-shrink:0;text-align:center;}
.cgo-chart-thumb{width:38px;height:38px;border-radius:9px;background:linear-gradient(135deg,#1a003a,#3b0080);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.cgo-chart-info{flex:1;min-width:0;}
.cgo-chart-name{font-size:12.5px;font-weight:700;color:#e8d5ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.cgo-chart-meta{font-size:10px;color:#7c6fa8;margin-top:2px;}
.cgo-chart-hz{font-size:10.5px;font-weight:700;color:#a855f7;flex-shrink:0;}

/* ─── 하단 플레이어 ─── */
.cgo-player{position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(8,0,20,.96);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-top:1px solid rgba(168,85,247,.25);padding:10px 14px;display:none;}
.cgo-player.visible{display:flex;align-items:center;gap:10px;}
.cgo-player-thumb{width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,#3b0080,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;box-shadow:0 0 12px rgba(168,85,247,.4);}
.cgo-player-info{flex:1;min-width:0;}
.cgo-player-title{font-size:12px;font-weight:700;color:#f0e6ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.cgo-player-sub{font-size:10px;color:#9d8ec4;margin-top:1px;}
.cgo-player-progress{height:3px;background:rgba(168,85,247,.2);border-radius:2px;margin-top:5px;position:relative;overflow:hidden;}
.cgo-player-bar{height:100%;background:linear-gradient(90deg,#7c3aed,#a855f7);border-radius:2px;width:0%;transition:width .3s linear;}
.cgo-player-btns{display:flex;gap:6px;flex-shrink:0;}
.cgo-player-btn{width:38px;height:38px;border-radius:10px;background:rgba(168,85,247,.12);border:1px solid rgba(168,85,247,.3);color:#c084fc;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.cgo-player-btn.main{background:linear-gradient(135deg,#7c3aed,#a855f7);border-color:transparent;color:#fff;width:42px;height:42px;border-radius:12px;}

/* ─── 장르 선택 카드 ─── */
.cgo-genre-sec{padding:20px 14px 4px;}
.cgo-genre-group{margin-bottom:14px;}
.cgo-genre-group-title{font-size:11px;font-weight:800;color:#9d8ec4;margin-bottom:8px;display:flex;align-items:center;gap:6px;padding:0 2px;}
.cgo-genre-group-line{flex:1;height:1px;background:rgba(168,85,247,.12);}
.cgo-genre-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;}
.cgo-genre-card{background:rgba(20,5,40,.7);border:1.5px solid rgba(100,60,180,.2);border-radius:12px;padding:10px 11px;cursor:pointer;transition:border-color .18s,background .18s,transform .12s;position:relative;overflow:hidden;-webkit-tap-highlight-color:transparent;}
.cgo-genre-card:active{transform:scale(.97);}
.cgo-genre-card.selected{border-color:var(--gc);background:rgba(30,8,60,.9);box-shadow:0 0 12px color-mix(in srgb, var(--gc) 30%, transparent);}
.cgo-genre-card.selected::before{content:'✓';position:absolute;top:6px;right:8px;font-size:10px;font-weight:900;color:var(--gc);}
.cgo-genre-flag{font-size:20px;line-height:1;margin-bottom:5px;}
.cgo-genre-name{font-size:12px;font-weight:800;color:#e8d5ff;line-height:1.2;}
.cgo-genre-en{font-size:9.5px;color:#7c6fa8;margin-top:1px;}
.cgo-genre-country{font-size:9px;color:#6b7280;margin-top:2px;}
.cgo-genre-desc{font-size:9px;color:#9d8ec4;margin-top:5px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
/* 선택 카운터 배지 */
.cgo-genre-counter{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:700;color:#c084fc;background:rgba(168,85,247,.12);border:1px solid rgba(168,85,247,.25);border-radius:999px;padding:3px 10px;margin-bottom:10px;}
.cgo-genre-counter-num{font-size:13px;font-weight:900;color:#f0abfc;font-variant-numeric:tabular-nums;}
.cgo-genre-hint{font-size:10px;color:#6b7280;}

/* ─── 프리셋 ─── */
.cgo-preset-bar{display:flex;gap:7px;overflow-x:auto;scrollbar-width:none;padding:0 14px 4px;}
.cgo-preset-bar::-webkit-scrollbar{display:none;}
.cgo-preset-chip{flex-shrink:0;padding:6px 12px;border-radius:999px;background:rgba(168,85,247,.12);border:1px solid rgba(168,85,247,.3);color:#c084fc;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;}
.cgo-preset-save{flex-shrink:0;padding:6px 12px;border-radius:999px;background:transparent;border:1px solid rgba(168,85,247,.2);color:#7c6fa8;font-size:11px;cursor:pointer;font-family:inherit;}
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

      this.tempoBpm = TEMPO_DEFAULT_BPM;
      this.selectedGenres = new Set(['ambient']); // 기본 선택: 앰비언트
      this.selectedFreq = 432;
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
      this.activeTab = 'make';

      // BPM 리듬 엔진
      this.rhythmTimerId = null;
      this.beatCount = 0;
      this.rhythmGain = null;

      // resize 바인딩
      this._onResize = () => this._resizeBg();
    }

    // ── init ────────────────────────────────────────────────────
    init() {
      injectCSS();
      this._buildDOM();
      this._startBgCanvas();
      this._renderPresets();
      this._renderChart();
      this._updateResult();
    }

    // ── DOM 빌드 ────────────────────────────────────────────────
    _buildDOM() {
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
        if (typeof global.cgoGoPage === 'function') global.cgoGoPage('home');
      });

      // ─ 탭 ─
      const tabs = document.createElement('nav');
      tabs.className = 'cgo-mtabs';
      tabs.innerHTML = `
        <div class="cgo-mtab active" data-tab="make"><span class="cgo-mtab-ico">🎰</span><span data-k="24045">${t(24045)}</span></div>
        <div class="cgo-mtab" data-tab="chart"><span class="cgo-mtab-ico">📊</span><span data-k="24046">${t(24046)}</span></div>
        <div class="cgo-mtab" data-tab="freq"><span class="cgo-mtab-ico">🌊</span><span data-k="24047">${t(24047)}</span></div>
        <div class="cgo-mtab" data-tab="preset"><span class="cgo-mtab-ico">⭐</span><span data-k="24048">${t(24048)}</span></div>
      `;
      this.root.appendChild(tabs);
      tabs.querySelectorAll('.cgo-mtab').forEach(t => {
        t.addEventListener('click', () => this._switchTab(t.dataset.tab));
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
        <div class="cgo-mhero-chips">
          <span class="cgo-mhero-chip" style="color:#f59e0b;border-color:rgba(245,158,11,.4);">432Hz</span>
          <span class="cgo-mhero-chip" style="color:#10b981;border-color:rgba(16,185,129,.4);">528Hz</span>
          <span class="cgo-mhero-chip" style="color:#3b82f6;border-color:rgba(59,130,246,.4);" data-k="24059">${t(24059)}</span>
          <span class="cgo-mhero-chip" style="color:#a855f7;border-color:rgba(168,85,247,.4);" data-k="24065">${t(24065)}</span>
        </div>
      `;
      this.root.appendChild(hero);
      this.bgCanvas = hero.querySelector('#cgo-bg-canvas');
      this.bgCtx = this.bgCanvas.getContext('2d');
      this._resizeBg();
      window.addEventListener('resize', this._onResize);

      // ─ 탭 콘텐츠 패널들 ─
      this.panels = {};
      ['make','chart','freq','preset'].forEach(tab => {
        const panel = document.createElement('div');
        panel.id = `cgo-panel-${tab}`;
        panel.style.display = tab === 'make' ? 'block' : 'none';
        this.root.appendChild(panel);
        this.panels[tab] = panel;
      });

      this._buildMakePanel();
      this._buildFreqPanel();
      this._buildPresetPanel();

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
      player.querySelector('#cgo-player-play').addEventListener('click', () => this._togglePlay());
      player.querySelector('#cgo-player-stop').addEventListener('click', () => this._stopAudio());
    }

    // ── 추첨통 패널 ─────────────────────────────────────────────
    _buildMakePanel() {
      const p = this.panels.make;

      // 섹션: 박자(템포) 레인보우 바 — 추첨통 앞에 배치
      const tempoSec = document.createElement('div');
      tempoSec.className = 'cgo-msec';
      tempoSec.innerHTML = `<div class="cgo-msec-title">🎼 <span data-k="24050">${t(24050)}</span></div>`;
      tempoSec.appendChild(this._buildTempoBar());
      p.appendChild(tempoSec);

      // 섹션: 슬롯
      const slotSec = document.createElement('div');
      slotSec.className = 'cgo-msec';
      slotSec.innerHTML = `<div class="cgo-msec-title">🎰 <span data-k="24045">${t(24045)}</span></div>`;
      const grid = document.createElement('div');
      grid.className = 'cgo-slot-grid';
      slotSec.appendChild(grid);
      p.appendChild(slotSec);

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
      p.appendChild(spinWrap);
      spinWrap.querySelector('#cgo-spin-btn').addEventListener('click', () => this._spinAll());
      spinWrap.querySelector('#cgo-quick-play').addEventListener('click', () => this._quickPlay());

      // 섹션: 장르 선택 카드 (슬롯 다음, 결과 카드 위)
      p.appendChild(this._buildGenreSection());

      // 상태
      const statusEl = document.createElement('p');
      statusEl.className = 'cgo-status';
      statusEl.id = 'cgo-status';
      p.appendChild(statusEl);

      // 결과 카드
      const resSec = document.createElement('div');
      resSec.className = 'cgo-msec';
      resSec.innerHTML = `<div class="cgo-msec-title">🎼 <span data-k="24068">${t(24068)}</span></div>`;
      const resCard = document.createElement('div');
      resCard.className = 'cgo-result-card';
      resCard.id = 'cgo-result-card';
      resSec.appendChild(resCard);
      p.appendChild(resSec);

      // 주파수 빠른 선택 (make 탭 안)
      const fqSec = document.createElement('div');
      fqSec.className = 'cgo-msec';
      fqSec.innerHTML = `<div class="cgo-msec-title">🌊 <span data-k="24061">${t(24061)}</span></div>`;
      const fqGrid = document.createElement('div');
      fqGrid.className = 'cgo-freq-grid';
      fqGrid.id = 'cgo-fq-make';
      FREQ_OPTIONS.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'cgo-freq-btn' + (opt.hz === this.selectedFreq ? ' active' : '');
        btn.style.color = opt.color;
        btn.dataset.hz = opt.hz;
        const lbl = opt.labelKey ? t(opt.labelKey) : opt.label;
        const dsc = opt.descKey  ? t(opt.descKey)  : opt.desc;
        btn.innerHTML = `<b>${lbl}</b>${dsc}`;
        btn.addEventListener('click', () => this._selectFreq(opt.hz));
        fqGrid.appendChild(btn);
      });
      fqSec.appendChild(fqGrid);
      p.appendChild(fqSec);

      // 생성 버튼
      const genWrap = document.createElement('div');
      genWrap.className = 'cgo-gen-wrap';
      genWrap.innerHTML = `<button class="cgo-gen-btn" id="cgo-gen-btn" data-k="24055">${t(24055)} · ${t(24065)}</button>`;
      p.appendChild(genWrap);
      genWrap.querySelector('#cgo-gen-btn').addEventListener('click', () => this._onGenerate());
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
          card.addEventListener('click', () => this._toggleGenre(genre.id, group.color));
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
          this._onTempoChange(bpm);
        });
        ticksDiv.appendChild(tick);
      });
      wrap.appendChild(ticksDiv);

      // 하단 정보 카드
      const dispDiv = document.createElement('div');
      dispDiv.className = 'cgo-tempo-display';
      dispDiv.id = 'cgo-tempo-display';
      dispDiv.innerHTML = this._tempoDisplayHTML(this.tempoBpm);
      wrap.appendChild(dispDiv);

      // 슬라이더 이벤트: 드래그 중에는 말풍선만, 놓으면 카드 업데이트
      slider.addEventListener('input', () => {
        const bpm = sliderToBpm(parseInt(slider.value, 10));
        this.tempoBpm = bpm;
        this._updateTempoBubble(slider, bubble, bpm);
        this._updateTempoTicks(ticksDiv, bpm);
        // 드래그 중: 카드 색상만 실시간 업데이트 (부드럽게)
        this._updateTempoDisplayLive(dispDiv, bpm);
      });
      slider.addEventListener('change', () => {
        // 손 뗐을 때: 전체 카드 + 결과 카드 업데이트 + 오디오 BPM 즉시 반영
        const bpm = sliderToBpm(parseInt(slider.value, 10));
        this.tempoBpm = bpm;
        dispDiv.innerHTML = this._tempoDisplayHTML(bpm);
        this._updateResult();
        this._applyBpmToAudio();   // 재생 중이면 리듬 즉시 갱신
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
      p.innerHTML = `
        <div class="cgo-msec">
          <div class="cgo-msec-title">🌊 <span data-k="24061">${t(24061)}</span></div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.3);border-radius:14px;padding:16px;">
              <div style="font-size:14px;font-weight:800;color:#f59e0b;" data-k="24069">${t(24069)}</div>
              <div style="font-size:11.5px;color:#9d8ec4;margin-top:6px;line-height:1.6;" data-k="24056">${t(24056)}</div>
            </div>
            <div style="background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.3);border-radius:14px;padding:16px;">
              <div style="font-size:14px;font-weight:800;color:#10b981;" data-k="24070">${t(24070)}</div>
              <div style="font-size:11.5px;color:#9d8ec4;margin-top:6px;line-height:1.6;" data-k="24057">${t(24057)}</div>
            </div>
            <div style="background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.3);border-radius:14px;padding:16px;">
              <div style="font-size:14px;font-weight:800;color:#3b82f6;" data-k="24071">${t(24071)}</div>
              <div style="font-size:11.5px;color:#9d8ec4;margin-top:6px;line-height:1.6;" data-k="24058">${t(24058)}</div>
            </div>
            <div style="background:rgba(107,114,128,.1);border:1px solid rgba(107,114,128,.3);border-radius:14px;padding:16px;">
              <div style="font-size:14px;font-weight:800;color:#9ca3af;">OFF — <span data-k="24060">${t(24060)}</span></div>
              <div style="font-size:11.5px;color:#9d8ec4;margin-top:6px;line-height:1.6;" data-k="24060">${t(24060)}</div>
            </div>
          </div>
        </div>
      `;
    }

    // ── 프리셋 패널 ─────────────────────────────────────────────
    _buildPresetPanel() {
      const p = this.panels.preset;
      p.innerHTML = `<div class="cgo-msec"><div class="cgo-msec-title">⭐ <span data-k="24063">${t(24063)}</span></div><div id="cgo-preset-list"></div></div>`;
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

    // ── 탭 전환 ─────────────────────────────────────────────────
    _switchTab(tab) {
      this.activeTab = tab;
      this.tabsEl.querySelectorAll('.cgo-mtab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tab);
      });
      Object.keys(this.panels).forEach(k => {
        this.panels[k].style.display = k === tab ? 'block' : 'none';
      });
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
      const card = this.root.querySelector('#cgo-result-card');
      if (!card) return;
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
      card.innerHTML = `
        <div style="font-size:12px;color:#9d8ec4;margin-bottom:8px;" data-k="24068">${t(24068)}</div>
        <div class="cgo-result-tags">
          <span class="cgo-result-tag" style="color:${tempo.color};border-color:${tempo.color}40;">🥁 ${tempo.name} ${this.tempoBpm}BPM</span>
          ${genreTags}
          ${this.slotKeys.map(k => `<span class="cgo-result-tag">${SLOT_DATA[k].emoji} ${this.selected[k]}</span>`).join('')}
          <span class="cgo-result-tag" style="color:${freqOpt.color};border-color:${freqOpt.color}40;">🌊 ${freqOpt.label}</span>
        </div>
      `;
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
        if (!this.audioCtx) {
          this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

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
        const barTick = () => {
          if (!this.isPlaying || !barEl) return;
          this.playProgress = Math.min((Date.now() - startTime) / 30000, 1);
          barEl.style.width = (this.playProgress * 100) + '%';
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
    }

    // ── AI 음악 생성 ────────────────────────────────────────────
    _onGenerate() {
      const tempoStage = bpmToStage(this.tempoBpm);
      const genreList = [...this.selectedGenres].map(id => GENRE_MAP[id]).filter(Boolean);
      const combo = { key:this.selected.key, bpm:this.tempoBpm, tempoName:tempoStage.name, tempoNameEn:tempoStage.nameEn, genres:genreList.map(g=>g.nameEn), genresMix:genreList.length > 1, vocal:this.selected.vocal, instrument:this.selected.instrument, freq:this.selectedFreq };
      this._setStatus(t(24066));
      const genBtn = this.root && this.root.querySelector('#cgo-gen-btn');
      if (genBtn) { genBtn.disabled = true; genBtn.textContent = '⏳ ' + t(24066); }
      if (typeof this.onGenerate === 'function') {
        this.onGenerate(combo);
      } else {
        // 데모: 미리 듣기 + 상태 메시지
        this._startAudio();
        setTimeout(() => {
          this._setStatus('✅ ' + t(24067));
          if (genBtn) { genBtn.disabled = false; genBtn.textContent = t(24055) + ' · ' + t(24065); }
        }, 2000);
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
          this._switchTab('make');
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

      // 6. DOM 제거
      if (this.root && this.root.parentNode) { this.root.parentNode.removeChild(this.root); }
      this.root = null;
      this.particles = [];

      console.log('[Destroy] CGO 주파수 뮤직 메모리 완전 정화됨 ✅');
    }
  }

  global.CGOMusicModule = FrequencyMusicModule;
}(typeof window !== 'undefined' ? window : global));
