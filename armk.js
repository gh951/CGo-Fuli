/* ══ AR 화면 글자 — 번호 사전에서 가져온다 ══ */
window._aK = function(n, f){
  try{ var v = window.K ? window.K(n) : null; return (v && v !== String(n)) ? v : (f || ''); }
  catch(e){ return f || ''; }
};

/* ════════════════════════════════════════════════════════════
   💄 AR 메이크업 — 구 CGO 원본 엔진 그대로
   ① 소개 팝업 ② 스캔·색 라이브러리·AR 렌더 ③ AI 상담
   ════════════════════════════════════════════════════════════ */

    // ★ 페이지 활성화 감지 → 첫 인사 자동 + 진입 팝업
    (function(){
      var p = document.getElementById('page-rppg-ar');
      if(!p) return;

      // 진입 팝업 박제
      window.rmaiShowIntroPopup = function(){
    try { if(localStorage.getItem('cgo_rmai_intro_skip') === '1') return; } catch(e){}
    if(document.getElementById('rmai-intro-pop')) return;
    function K(n,f){ try{ var v=window.K&&window.K(n); return (v&&v!==String(n))?v:f; }catch(e){ return f; } }

    var pop = document.createElement('div');
    pop.id = 'rmai-intro-pop';
    pop.style.cssText = 'position:fixed;left:0;right:0;top:0;bottom:0;z-index:31000;background:#f0fdf9;overflow-y:auto;padding:56px 18px 28px;';

    var steps = [
      ['①', K(12002,'화장 전 사진 한 장'),      K(12003,'분석의 시작점이 됩니다.')],
      ['②', K(12004,'30초 스캔'),               K(12005,'화장 흡수와 피부 톤을 봅니다.')],
      ['③', K(12006,'AR 실시간 미리보기'),      K(12007,'600색을 얼굴에 바로 얹어 봅니다.')],
      ['④', K(12008,'AI 상담'),                 K(12009,'상황에 맞는 색을 물어보세요.')]
    ];
    var pts = [
      ['🎯', K(12010,'잔상 없는 실시간'),   K(12011,'고개를 크게 흔들어도 색이 따라옵니다. 세계 최초로 잔상을 없앤 기술입니다.')],
      ['🎨', K(12012,'600색 라이브러리'),   K(12013,'일반 데일리와 명품 럭셔리 · 립·볼·아이·베이스·헤어')],
      ['💗', K(12014,'화장 흡수 분석'),     K(12015,'카메라 광학 신호로 화장이 얼마나 자리 잡았는지 봅니다.')],
      ['🔒', K(12016,'기기 안에서만'),      K(12017,'영상은 기기 밖으로 나가지 않습니다.')]
    ];

    var html = ''
      + '<div style="max-width:820px;margin:0 auto;">'
      /* 머리 */
      + '<div style="display:flex;align-items:center;justify-content:space-between;">'
      +   '<span style="font-size:11px;font-weight:800;color:#0f766e;letter-spacing:.14em;">FULI BEAUTY</span>'
      +   '<button onclick="var p=document.getElementById(\'rmai-intro-pop\');if(p)p.remove();" '
      +     'style="background:none;border:0;font-size:19px;color:#0f766e;cursor:pointer;line-height:1;">&#10005;</button>'
      + '</div>'
      + '<div style="display:flex;align-items:center;gap:11px;margin-top:12px;">'
      +   '<div style="font-size:32px;line-height:1;">🎨</div>'
      +   '<div><div style="font-size:20px;font-weight:900;color:#0f172a;letter-spacing:-.3px;">' + K(12000,'AR 메이크업') + '</div>'
      +   '<div style="font-size:11.5px;color:#0f766e;margin-top:3px;">' + K(12001,'잔상 없는 실시간 AR · 600색 라이브러리') + '</div></div>'
      + '</div>'
      /* 사용법 */
      + '<div style="background:#fff;border:1px solid #d7eee8;border-radius:16px;padding:16px 14px;margin-top:14px;">'
      +   '<div style="font-size:13px;font-weight:900;color:#0f172a;">' + K(12020,'📋 이렇게 하세요') + '</div>'
      +   '<div style="display:flex;flex-direction:column;gap:9px;margin-top:11px;">'
      +   steps.map(function(s){
            return '<div style="display:flex;gap:10px;align-items:flex-start;">'
              + '<div style="width:22px;height:22px;border-radius:50%;background:#0d9488;color:#fff;font-size:11px;'
              + 'font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' + s[0] + '</div>'
              + '<div style="flex:1;min-width:0;"><div style="font-size:12.5px;font-weight:800;color:#0f172a;">' + s[1] + '</div>'
              + '<div style="font-size:11px;color:#475569;margin-top:2px;line-height:1.6;">' + s[2] + '</div></div></div>';
          }).join('')
      +   '</div></div>'
      /* 무엇이 다른가 */
      + '<div style="background:#fff;border:1px solid #d7eee8;border-radius:16px;padding:16px 14px;margin-top:11px;">'
      +   '<div style="font-size:13px;font-weight:900;color:#0f172a;">' + K(12021,'✨ 무엇이 다른가') + '</div>'
      +   '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:11px;">'
      +   pts.map(function(p){
            return '<div style="padding:12px 10px;border-radius:13px;background:#f0fdf9;border:1px solid #99f6e4;min-width:0;">'
              + '<div style="font-size:19px;line-height:1;">' + p[0] + '</div>'
              + '<div style="font-size:12px;font-weight:900;color:#0f766e;margin-top:6px;line-height:1.35;">' + p[1] + '</div>'
              + '<div style="font-size:10px;color:#475569;margin-top:4px;line-height:1.6;overflow-wrap:anywhere;">' + p[2] + '</div></div>';
          }).join('')
      +   '</div></div>'
      /* 솔직한 안내 */
      + '<div style="background:#f0fdf9;border:1px solid #99f6e4;border-radius:14px;padding:13px 14px;margin-top:11px;">'
      +   '<div style="font-size:12px;font-weight:900;color:#0f766e;">' + K(12022,'🏆 CGO의 자랑') + '</div>'
      +   '<div style="font-size:10.5px;color:#475569;margin-top:6px;line-height:1.75;">'
      +   K(12023,'화면 색은 기기마다 다르게 보입니다. 실제 제품 색과 차이가 있을 수 있으며, 참고용 미리보기입니다.') + '</div></div>'
      /* 오늘 안 보기 + 시작 */
      + '<label style="display:flex;align-items:center;justify-content:center;gap:7px;margin-top:14px;cursor:pointer;">'
      +   '<input type="checkbox" id="rmai-intro-skip" style="width:15px;height:15px;accent-color:#0d9488;">'
      +   '<span style="font-size:12px;color:#64748b;">' + K(12024,'오늘 하루 보지 않기') + '</span></label>'
      + '<button onclick="(function(){var cb=document.getElementById(\'rmai-intro-skip\');'
      +   'if(cb&&cb.checked){try{localStorage.setItem(\'cgo_rmai_intro_skip\',\'1\');}catch(e){}}'
      +   'var p=document.getElementById(\'rmai-intro-pop\');if(p)p.remove();})()" '
      +   'style="width:100%;margin-top:12px;padding:15px;border:0;border-radius:999px;background:#0f172a;'
      +   'color:#fff;font-size:14px;font-weight:900;cursor:pointer;font-family:inherit;">'
      +   K(12025,'🎨 시작하기') + '</button>'
      + '</div>';

    pop.innerHTML = html;
    document.body.appendChild(pop);
    try{ if(window.CGO_T) CGO_T.paint(pop); }catch(e){}
  };


      var p = document.getElementById('page-rppg-ar');
      if(!p) return;
      function tryGreet(){
        if(p.classList.contains('active')){
          // ★ 정보 입력 검증 — 미입력 시 차단 + 대시보드로 이동
          /* 정보 입력 관문 제거 */
          // ★ 즉시 호출 — setTimeout 제거 (본 페이지 깜빡임 방지, yeogi 패턴)
          rmaiShowIntroPopup();
          // CGO 챗 인사는 약간 후 (팝업이 떠 있을 때 배경)
          if(typeof rmaiChatGreet === 'function'){
            /* 자동 열림 제거 */
          }
          return true;
        }
        return false;
      }
      if(!tryGreet()){
        var ob = new MutationObserver(function(){
          if(tryGreet()) ob.disconnect();
        });
        ob.observe(p, {attributes:true, attributeFilter:['class']});
      }
    })();
  

/* ── ② AR 스캔·렌더 엔진 ── */

// ══ MAI - 화장 흡수 분석 ══
var _mai = { running:false, timer:null, sec:0, stream:null, offCanvas:null, offCtx:null, lostCount:0 };
var _maiColors = {
  목: {
    lip:  [{c:'#FF6B9D',n:'로즈핑크'},{c:'#E8A87C',n:'코랄베이지'},{c:'#C9A96E',n:'테라코타'},{c:'#FF8C69',n:'살몬코랄'},{c:'#D4778A',n:'더스티로즈'},{c:'#B5541B',n:'번트오렌지'},{c:'#E07B54',n:'피치코랄'},{c:'#C85250',n:'딥로즈'}],
    cheek:[{c:'#FFB7C5',n:'베이비핑크'},{c:'#FFAA80',n:'피치'},{c:'#F4A7B9',n:'로즈'},{c:'#FFD1A9',n:'아프리코트'},{c:'#E8B4A0',n:'누드코랄'},{c:'#F9C6C9',n:'소프트핑크'}],
    eye:  [{c:'#8B4513',n:'초코브라운'},{c:'#556B2F',n:'올리브그린'},{c:'#4A7C59',n:'포레스트'},{c:'#8FBC8F',n:'세이지그린'},{c:'#6B8E23',n:'모스그린'}],
    base: [{c:'#F5DEB3',n:'웜아이보리'},{c:'#DEB887',n:'버프베이지'},{c:'#D2B48C',n:'탄'},{c:'#C4A882',n:'웜베이지'}]
  },
  화: {
    lip:  [{c:'#DC143C',n:'크림슨레드'},{c:'#FF0000',n:'퓨어레드'},{c:'#C41E3A',n:'카디널레드'},{c:'#B22222',n:'파이어브릭'},{c:'#FF4500',n:'오렌지레드'},{c:'#E34234',n:'버밀리언'},{c:'#FF6347',n:'토마토레드'},{c:'#CD5C5C',n:'인디안레드'}],
    cheek:[{c:'#FF7F7F',n:'라이트코랄'},{c:'#FA8072',n:'살몬'},{c:'#FF6B6B',n:'코랄레드'},{c:'#E88080',n:'소프트레드'},{c:'#FFB6C1',n:'라이트핑크'},{c:'#FF9999',n:'핑크'}],
    eye:  [{c:'#8B0000',n:'다크레드'},{c:'#A0522D',n:'시에나'},{c:'#800020',n:'버건디'},{c:'#722F37',n:'와인'},{c:'#4A0404',n:'딥레드'}],
    base: [{c:'#FFE4E1',n:'미스티로즈'},{c:'#FFDAB9',n:'피치퍼프'},{c:'#FFD700',n:'골드틴트'},{c:'#F0E68C',n:'카키베이지'}]
  },
  토: {
    lip:  [{c:'#D4A843',n:'골드베이지'},{c:'#C9956C',n:'카멜'},{c:'#B87333',n:'카퍼'},{c:'#A0785A',n:'모카브라운'},{c:'#C8A96E',n:'허니누드'},{c:'#D2691E',n:'초콜렛'},{c:'#CD853F',n:'페루'},{c:'#8B6914',n:'다크골드'}],
    cheek:[{c:'#F5DEB3',n:'위트'},{c:'#DEB887',n:'버프'},{c:'#D2B48C',n:'탄핑크'},{c:'#C4A882',n:'샌드'},{c:'#E8C99A',n:'누드베이지'},{c:'#F0D090',n:'웜옐로우'}],
    eye:  [{c:'#8B4513',n:'새들브라운'},{c:'#6B3A2A',n:'다크테라코타'},{c:'#A0522D',n:'시에나'},{c:'#704214',n:'세피아'},{c:'#5C4827',n:'다크모카'}],
    base: [{c:'#FFF8DC',n:'코른실크'},{c:'#FAEBD7',n:'앤틱화이트'},{c:'#F5F5DC',n:'베이지'},{c:'#FAF0E6',n:'리넨'}]
  },
  금: {
    lip:  [{c:'#E8E8E8',n:'누드화이트'},{c:'#C0C0C0',n:'실버누드'},{c:'#D4C5B0',n:'그레이지'},{c:'#B8B8B8',n:'쿨그레이'},{c:'#E0D5C8',n:'웜베이지'},{c:'#A8A8A8',n:'미디엄그레이'},{c:'#F0EBE3',n:'오이스터'},{c:'#D6CFC7',n:'그레이베이지'}],
    cheek:[{c:'#E8E8E8',n:'펄화이트'},{c:'#D0D0D0',n:'실버핑크'},{c:'#C8BEB2',n:'그레이지핑크'},{c:'#DDD5CC',n:'쿨베이지'},{c:'#E5DDD5',n:'오이스터핑크'},{c:'#F0E8E0',n:'소프트베이지'}],
    eye:  [{c:'#808080',n:'미디엄그레이'},{c:'#A9A9A9',n:'다크그레이'},{c:'#696969',n:'딤그레이'},{c:'#708090',n:'슬레이트그레이'},{c:'#2F4F4F',n:'다크슬레이트'}],
    base: [{c:'#F8F8FF',n:'고스트화이트'},{c:'#F0F0F0',n:'쿨화이트'},{c:'#E8E8E8',n:'실버화이트'},{c:'#DCDCDC',n:'게인스보로'}]
  },
  수: {
    lip:  [{c:'#4B0082',n:'인디고'},{c:'#6A0DAD',n:'퍼플'},{c:'#800080',n:'마젠타퍼플'},{c:'#8B008B',n:'다크마젠타'},{c:'#9400D3',n:'다크바이올렛'},{c:'#702963',n:'비잔틴'},{c:'#7B2D8B',n:'딥퍼플'},{c:'#4B0082',n:'로얄퍼플'}],
    cheek:[{c:'#DDA0DD',n:'플럼'},{c:'#EE82EE',n:'바이올렛핑크'},{c:'#DA70D6',n:'오키드'},{c:'#C71585',n:'미디엄바이올렛'},{c:'#FF69B4',n:'핫핑크'},{c:'#DB7093',n:'페일바이올렛레드'}],
    eye:  [{c:'#191970',n:'미드나잇블루'},{c:'#003153',n:'프러시안블루'},{c:'#4B0082',n:'인디고'},{c:'#36013F',n:'딥퍼플'},{c:'#2C0040',n:'다크퍼플'}],
    base: [{c:'#E6E6FA',n:'라벤더'},{c:'#D8BFD8',n:'씨슬'},{c:'#DDA0DD',n:'플럼화이트'},{c:'#C8A8D8',n:'소프트퍼플'}]
  }
};


// ★ 카메라 권한 전역 상태 관리 (한 번만 요청)
var _cgoCameraGranted = false;
var _cgoCameraAlertShown = false;

// ★ 앱 시작 시 카메라 자동 요청 비활성화 (사용자가 직접 스캔 버튼 클릭 시에만 실행)
// window.addEventListener('load', function(){ ... });

// ★ 공통 카메라 권한 체크 (이미 허용됐으면 바로 실행)
function cgoCameraCheck(onGranted, opts){
  // ★ 방안 B 박입 — opts.constraints 지정 시 stream을 stop 안 하고 콜백에 전달
  // 호출자가 같은 stream 재사용 → getUserMedia 1번만 (권한 팝업 1번)
  opts = opts || {};
  if(_cgoCameraGranted && !opts.constraints){
    onGranted();
    return;
  }
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    _cgoCameraAlert('이 브라우저는 카메라를 지원하지 않습니다.');
    return;
  }
  // constraints 지정되면 그대로 사용 (stream 재사용 모드), 아니면 video:true 후 stop (기존 동작)
  var constraints = opts.constraints || {video:true};
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function(s){
      _cgoCameraGranted = true;
      if(opts.constraints){
        // ★ stream 재사용 모드 — stop 하지 않고 콜백에 전달
        onGranted(s);
      } else {
        // 기존 모드 — 권한만 확인하고 stop
        s.getTracks().forEach(function(t){t.stop();});
        onGranted();
      }
    })
    .catch(function(){
      _cgoCameraGranted = false;
      if(!_cgoCameraAlertShown){
        _cgoCameraAlertShown = true;
        _cgoCameraAlert('카메라 접근이 거부됐습니다.<br><br>브라우저 주소창 옆 🔒 클릭<br>→ 카메라 → <b style="color:#34d399;">허용</b>으로 변경해 주세요.');
      }
    });
}

function _cgoCameraAlert(msg){
  if(document.getElementById('_cgoCamAlertBox')) return;
  var t = document.createElement('div');
  t.id = '_cgoCamAlertBox';
  t.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(10,22,40,.97);border:1.5px solid rgba(244,114,182,.5);border-radius:20px;padding:24px 28px;z-index:99999;text-align:center;max-width:300px;width:90%;';
  t.innerHTML = '<div style="font-size:28px;margin-bottom:10px;">📷</div>'
    + '<div style="font-size:14px;font-weight:900;color:#f472b6;margin-bottom:8px;">카메라 허용 필요</div>'
    + '<div style="font-size:12px;color:rgba(240,220,255,.8);line-height:1.7;margin-bottom:16px;">'+msg+'</div>'
    + '<button onclick="this.parentNode.remove();_cgoCameraAlertShown=false;" style="padding:10px 24px;background:linear-gradient(135deg,#f472b6,#a855f7);border:none;border-radius:10px;color:#fff;font-size:13px;font-weight:900;cursor:pointer;" data-i18n="confirm">확인</button>';
  document.body.appendChild(t);
}
// ★ MAI Before 사진 촬영
var _maiBeforeData = null;

// ═══════════════════════════════════════════════════
// ★ 핀셋 ㊲㊳ — CGO rPPG AR 메이크업 진짜 구현
//   FaceMesh 468 랜드마크 + 입술 영역 색 적용 + 캡처
//   28명 클로드가 박제한 @mediapipe/face_mesh CDN 활용 (line 63299)
// ═══════════════════════════════════════════════════

// ★ AR 전역 상태 (4 카테고리 + 팔레트 전환 + 강도 조절)
var _rmaiAr = {
  running: false,
  stream: null,
  video: null,
  canvas: null,
  ctx: null,
  faceMesh: null,
  currentColor: null,
  currentCategory: 'lip',
  currentPalette: 'oheng',  // 'oheng' (사주) | 'rainbow' (무지개 7색)
  appliedColors: { lip:null, cheek:null, eye:null, base:null },
  intensity: { lip:0.55, cheek:0.20, eye:0.35, base:0.35 }, // 카테고리별 alpha (0~1)
  cardMode: 'daily',      // ★ 600색 카드 모드: 'daily' | 'luxury' | 'oheng' (현실 우선)
  cardExpanded: { daily:true, luxury:false, oheng:false }, // 카드 펼침 상태
  pickerCollapsed: false, // ★ 색상 패널 접힘 상태 (캡처 편의)
  faceSlim: 0,            // ㊺ 얼굴 슬림 강도 (0~50)
  eyeBigger: 0,           // ㊺ 눈 키우기 강도 (0~50)
  frameCount: 0,
  lastResults: null
};


/* ★ 색 이름 20개 언어 — 낱말 사전 조합 */
var _ACNM = {"빨강":[12500],"다크 브라운":[12501,12502],"초콜릿 브라운":[12503,12502],"애쉬 브라운":[12504,12502],"모카 브라운":[12505,12502],"카라멜":[12506],"허니 브라운":[12507,12502],"라이트 베이지":[12508,12509],"애쉬 그레이":[12504,12510],"와인 레드":[12511,12512],"체리 레드":[12513,12512],"코퍼 오렌지":[12514,12515],"로즈 골드":[12516,12517],"애쉬 핑크":[12504,12518],"라벤더":[12519],"애쉬 블루":[12504,12520],"민트 그린":[12521,12522],"플래티넘 블론드":[12523,12524],"실버 애쉬":[12525,12504],"주황":[12526],"노랑":[12527],"초록":[12528],"파랑":[12529],"남색":[12530],"보라":[12531],"MLBB 누드":[12532,12533],"데일리 코랄":[12534,12535],"딥 베리":[12536,12537],"클래식 레드":[12538,12512],"로즈 핑크":[12516,12518],"페일 누드":[12539,12533],"딥 와인":[12536,12511],"벨벳 레드":[12540,12512],"피치 핑크":[12541,12518],"블러드 오렌지":[12542,12515],"시나몬 누드":[12543,12533],"베리 플럼":[12537,12544],"드라이 로즈":[12545,12516],"테라코타":[12546],"블러쉬 핑크":[12547,12518],"레드 와인":[12512,12511],"썬셋 코랄":[12548,12535],"딥 로즈":[12536,12516],"머스타드 누드":[12549,12533],"페일 베리":[12539,12537],"스파이시 레드":[12550,12512],"베이지 누드":[12509,12533],"베리 와인":[12537,12511],"더스티 핑크":[12551,12518],"토마토 레드":[12552,12512],"프렌치 누드":[12553,12533],"클래식 핑크":[12538,12518],"다크 베리":[12501,12537],"코코아 누드":[12554,12533],"민트 누드":[12521,12533],"벽돌 레드":[12555,12512],"로즈우드":[12556],"산호 핑크":[12557,12518],"블러디 메리":[12558,12559],"페일 살구":[12539,12560],"블러쉬 누드":[12547,12533],"딥 코랄":[12536,12535],"스칼렛":[12561],"밀크 티 누드":[12562,12563,12533],"캔디 핑크":[12564,12518],"베리 누드":[12537,12533],"딥 컨피던스":[12536,12565],"블러쉬 코랄":[12547,12535],"라이트 와인":[12508,12511],"레드 벨벳":[12512,12540],"페일 모카":[12539,12505],"블러드 우드":[12542,12566],"페일 매트":[12539,12567],"썬셋 글로우":[12548,12568],"데일리 피치":[12534,12541],"러브 핑크":[12569,12518],"블러쉬 로즈":[12547,12516],"코랄 글로우":[12535,12568],"페일 로즈":[12539,12516],"살구 블러쉬":[12560,12547],"드라이 피치":[12545,12541],"썬 키스 피치":[12570,12571,12541],"쿨 핑크":[12572,12518],"민트 로즈":[12521,12516],"피치 글로우":[12541,12568],"페일 살몬":[12539,12573],"로즈 누드":[12516,12533],"블러쉬 자몽":[12547,12574],"페일 피치":[12539,12541],"섀도 핑크":[12575,12518],"베이지 블러쉬":[12509,12547],"썬셋 핑크":[12548,12518],"쿨 코랄":[12572,12535],"블러드 로즈":[12542,12516],"페일 라즈베리":[12539,12576],"민트 블러쉬":[12521,12547],"키스 핑크":[12571,12518],"아일랜드 코랄":[12577,12535],"페일 코코아":[12539,12554],"블러쉬 매트":[12547,12567],"와인 글로우":[12511,12568],"스파이시 피치":[12550,12541],"러브 매트":[12569,12567],"블러쉬 베이지":[12547,12509],"페일 마젠타":[12539,12578],"드림 로즈":[12579,12516],"페일 자몽":[12539,12574],"블러쉬 우디":[12547,12580],"캔디 코랄":[12564,12535],"스위티 핑크":[12581,12518],"코랄 매트":[12535,12567],"와인 블러쉬":[12511,12547],"드라이 베리":[12545,12537],"페일 진주":[12539,12582],"데일리 누드":[12534,12533],"블러쉬 골드":[12547,12517],"페일 로즈우드":[12539,12556],"드림 피치":[12579,12541],"블러쉬 머스타드":[12547,12549],"페일 글로우":[12539,12568],"데일리 브라운":[12534,12502],"스모키 그레이":[12583,12510],"네추럴 누드":[12584,12533],"딥 브라운":[12536,12502],"골든 브론즈":[12585,12586],"카키 매트":[12587,12567],"페일 베이지":[12539,12509],"데일리 골드":[12534,12517],"러스트 매트":[12588,12567],"코퍼 시머":[12514,12589],"페일 핑크":[12539,12518],"스모키 블루":[12583,12520],"다크 그린":[12501,12522],"페일 라일락":[12539,12590],"페일 그레이":[12539,12510],"골든 시머":[12585,12589],"다크 차콜":[12501,12591],"페일 골드":[12539,12517],"데일리 카키":[12534,12587],"다크 머스타드":[12501,12549],"페일 인디고":[12539,12592],"네추럴 베이지":[12584,12509],"스모키 퍼플":[12583,12593],"데일리 코퍼":[12534,12514],"블랙 매트":[12594,12567],"페일 옐로우":[12539,12595],"딥 그린":[12536,12522],"스모키 카멜":[12583,12596],"페일 토프":[12539,12597],"네추럴 모카":[12584,12505],"스모키 인디고":[12583,12592],"다크 카키":[12501,12587],"네추럴 골드":[12584,12517],"스모키 와인":[12583,12511],"데일리 시머":[12534,12589],"페일 카멜":[12539,12596],"다크 코코아":[12501,12554],"블러쉬 토프":[12547,12597],"스모키 차콜":[12583,12591],"데일리 매트":[12534,12567],"네추럴 브론즈":[12584,12586],"페일 아이보리":[12539,12598],"데일리 베이지":[12534,12509],"밀키 베이지":[12599,12509],"골든 베이지":[12585,12509],"네추럴 토프":[12584,12597],"데일리 카멜":[12534,12596],"페일 새틴":[12539,12600],"바닐라 크림":[12601,12602],"네추럴 글로우":[12584,12568],"밀키 글로우":[12599,12568],"네추럴 살구":[12584,12560],"블러쉬 글로우":[12547,12568],"데일리 새틴":[12534,12600],"밀크 글로우":[12562,12568],"페일 라이트":[12539,12508],"페일 시머":[12539,12589],"데일리 글로우":[12534,12568],"밀크 누드":[12562,12533],"페일 캐러멜":[12539,12603],"네추럴 아이보리":[12584,12598],"밀크 매트":[12562,12567],"페일 미스트":[12539,12604],"네추럴 새틴":[12584,12600],"페일 핑크누드":[12539,12518,12533],"데일리 핑크":[12534,12518],"페일 메이블":[12539,12605],"밀크 베이지":[12562,12509],"네추럴 페일":[12584,12539],"블러쉬 살구":[12547,12560],"데일리 라이트":[12534,12508],"木·딥에메랄드":[12606,12536,12607],"木·포레스트":[12606,12608],"木·민트":[12606,12521],"木·세이지":[12606,12609],"木·올리브":[12606,12610],"火·정통퓨어레드":[12611,12612,12613,12512],"火·체리블러드":[12611,12513,12542],"火·진주홍":[12611,12614],"火·코랄핑크":[12611,12535,12518],"火·플래밍로즈":[12611,12615,12516],"土·골든앰버":[12616,12585,12617],"土·머스타드":[12616,12549],"土·해니브라운":[12616,12618,12502],"土·테라코타":[12616,12546],"土·구릿빛":[12616,12619],"金·누드베이지":[12620,12533,12509],"金·샤이펄":[12620,12621,12622],"金·플래티넘":[12620,12523],"金·캐러멜":[12620,12603],"金·라이트골드":[12620,12508,12517],"水·다크초콜릿":[12623,12501,12503],"水·블랙체리":[12623,12594,12513],"水·미드나잇":[12623,12624],"水·딥와인":[12623,12536,12511],"水·블러디퍼플":[12623,12558,12593],"木·민트블러쉬":[12606,12521,12547],"木·세이지글로우":[12606,12609,12568],"木·페일아쿠아":[12606,12539,12625],"木·라이트민트":[12606,12508,12521],"木·연두빛":[12606,12626],"火·정통핑크":[12611,12612,12518],"火·체리로즈":[12611,12513,12516],"火·코랄피치":[12611,12535,12541],"火·플래밍코랄":[12611,12615,12535],"土·살구피치":[12616,12560,12541],"土·골든피치":[12616,12585,12541],"土·구릿빛블러쉬":[12616,12619,12547],"土·캐러멜글로우":[12616,12603,12568],"金·누드피치":[12620,12533,12541],"金·페일베이지":[12620,12539,12509],"金·아이보리누드":[12620,12598,12533],"金·샴페인글로우":[12620,12627,12568],"金·페일핑크":[12620,12539,12518],"水·잉크퍼플":[12623,12628,12593],"水·딥보이올렛":[12623,12536,12629],"水·플럼블러쉬":[12623,12544,12547],"水·블루베리":[12623,12630],"水·미드나잇플럼":[12623,12624,12544],"木·포레스트섀도":[12606,12608,12575],"木·다크그린":[12606,12501,12522],"木·올리브섀도":[12606,12610,12575],"木·세이지스모키":[12606,12609,12583],"火·딥와인섀도":[12611,12536,12511,12575],"火·번트오렌지":[12611,12631,12515],"火·체리브라운":[12611,12513,12502],"火·러스트":[12611,12588],"火·딥레드":[12611,12536,12512],"土·골든브론즈":[12616,12585,12586],"土·캐러멜":[12616,12603],"土·머스타드섀도":[12616,12549,12575],"土·앰버스모키":[12616,12617,12583],"土·번트골드":[12616,12631,12517],"金·뉴드샤이펄":[12620,12632,12621,12622],"金·샤이샴페인":[12620,12621,12627],"金·실버화이트":[12620,12525,12633],"水·잉크블랙":[12623,12628,12594],"水·차콜":[12623,12591],"水·딥네이비":[12623,12536,12634],"水·블랙플럼":[12623,12594,12544],"木·민트누드":[12606,12521,12533],"木·페일세이지":[12606,12539,12609],"木·아쿠아미스트":[12606,12625,12604],"木·연두라이트":[12606,12635,12508],"木·민트화이트":[12606,12521,12633],"火·핑크누드":[12611,12518,12533],"火·페일코랄":[12611,12539,12535],"火·살몬크림":[12611,12573,12602],"火·로즈누드":[12611,12516,12533],"火·페일핑크":[12611,12539,12518],"土·살구누드":[12616,12560,12533],"土·페일베이지":[12616,12539,12509],"土·아이보리크림":[12616,12598,12602],"土·골든크림":[12616,12585,12602],"土·캐러멜라이트":[12616,12603,12508],"金·뉴드아이보리":[12620,12632,12598],"金·뮤트누드":[12620,12636,12533],"金·플래티넘크림":[12620,12523,12602],"水·라벤더누드":[12623,12519,12533],"水·페일바이올렛":[12623,12539,12637],"水·라일락미스트":[12623,12590,12604],"水·뮤트퍼플":[12623,12636,12593],"水·페일플럼":[12623,12539,12544]};
function _aCN(n){
  try{
    var L = window._LANG || 'ko';
    if(L === 'ko') return n;
    var ks = _ACNM[n]; if(!ks) return n;
    var parts = ks.map(function(k){ return _aK(k, ''); }).filter(function(v){ return !!v; });
    if(!parts.length) return n;
    var cjk = parts.some(function(p){ return /[\u3040-\u30ff\u4e00-\u9fff\u0e00-\u0e7f]/.test(p); });
    return parts.join(cjk ? '' : ' ');
  }catch(e){ return n; }
}

// ★ 무지개 7색 라이브러리 (빨주노초파남보 — 모든 카테고리 공통)
var _rmaiArRainbowSet = [
  {n:'빨강', c:'#dc2626',
  hair: [
    {n:'다크 브라운', c:'#3b2418'},{n:'초콜릿 브라운', c:'#4a2c1d'},{n:'애쉬 브라운', c:'#5a4a42'},
    {n:'모카 브라운', c:'#6b4a35'},{n:'카라멜', c:'#8a5a30'},{n:'허니 브라운', c:'#9c6b3c'},
    {n:'라이트 베이지', c:'#b08a5e'},{n:'애쉬 그레이', c:'#6e6a68'},{n:'와인 레드', c:'#6e1420'},
    {n:'체리 레드', c:'#9c1c28'},{n:'코퍼 오렌지', c:'#b45a20'},{n:'로즈 골드', c:'#c07a6a'},
    {n:'애쉬 핑크', c:'#b06a78'},{n:'라벤더', c:'#8a6ea8'},{n:'애쉬 블루', c:'#3c5a7a'},
    {n:'민트 그린', c:'#3c7a68'},{n:'플래티넘 블론드', c:'#d8c8a8'},{n:'실버 애쉬', c:'#a8a8ac'}
  ]
},
  {n:'주황', c:'#f97316'},
  {n:'노랑', c:'#eab308'},
  {n:'초록', c:'#16a34a'},
  {n:'파랑', c:'#2563eb'},
  {n:'남색', c:'#1e3a8a'},
  {n:'보라', c:'#9333ea'}
];

// ★ CGO-FULI CGO — 세계 최대 600색 메이크업 라이브러리
// 오행 100 (보너스) + 일반 200 + 명품 300 (현실 500)
var _rmaiArColorLibrary = {
  daily: {
    lip: [
        {n:'MLBB 누드', c:'#c98575'},
        {n:'데일리 코랄', c:'#e57373'},
        {n:'딥 베리', c:'#a52a2a'},
        {n:'클래식 레드', c:'#dc2626'},
        {n:'로즈 핑크', c:'#f06292'},
        {n:'페일 누드', c:'#deb887'},
        {n:'딥 와인', c:'#8b0000'},
        {n:'벨벳 레드', c:'#b22222'},
        {n:'피치 핑크', c:'#ff7f7f'},
        {n:'블러드 오렌지', c:'#dd5544'},
        {n:'시나몬 누드', c:'#a0522d'},
        {n:'베리 플럼', c:'#673147'},
        {n:'드라이 로즈', c:'#c08081'},
        {n:'테라코타', c:'#cc6633'},
        {n:'블러쉬 핑크', c:'#fb7185'},
        {n:'레드 와인', c:'#722f37'},
        {n:'썬셋 코랄', c:'#ff7849'},
        {n:'딥 로즈', c:'#c41e3a'},
        {n:'머스타드 누드', c:'#bdb76b'},
        {n:'페일 베리', c:'#9f5980'},
        {n:'스파이시 레드', c:'#b71c1c'},
        {n:'베이지 누드', c:'#c49a6c'},
        {n:'베리 와인', c:'#5d1f5d'},
        {n:'더스티 핑크', c:'#d4a5a5'},
        {n:'토마토 레드', c:'#ff6347'},
        {n:'프렌치 누드', c:'#e6b89c'},
        {n:'클래식 핑크', c:'#ff69b4'},
        {n:'다크 베리', c:'#581845'},
        {n:'코코아 누드', c:'#8b4513'},
        {n:'민트 누드', c:'#9c9b7a'},
        {n:'벽돌 레드', c:'#7c2d12'},
        {n:'로즈우드', c:'#65000b'},
        {n:'산호 핑크', c:'#ff6f61'},
        {n:'블러디 메리', c:'#990000'},
        {n:'페일 살구', c:'#fbceb1'},
        {n:'블러쉬 누드', c:'#e9967a'},
        {n:'딥 코랄', c:'#f08080'},
        {n:'스칼렛', c:'#ff2400'},
        {n:'밀크 티 누드', c:'#d2b48c'},
        {n:'드라이 로즈', c:'#9f4156'},
        {n:'캔디 핑크', c:'#e75480'},
        {n:'베리 누드', c:'#5c4033'},
        {n:'딥 컨피던스', c:'#420d09'},
        {n:'블러쉬 코랄', c:'#ff7575'},
        {n:'라이트 와인', c:'#722f37'},
        {n:'레드 벨벳', c:'#8b1a1a'},
        {n:'페일 모카', c:'#967117'},
        {n:'블러드 우드', c:'#7c0a02'},
        {n:'페일 매트', c:'#bdb76b'},
        {n:'썬셋 글로우', c:'#ff8c69'}
      ],
    cheek: [
        {n:'데일리 피치', c:'#fdba74'},
        {n:'러브 핑크', c:'#fb7185'},
        {n:'블러쉬 로즈', c:'#f9a8d4'},
        {n:'코랄 글로우', c:'#ff7f50'},
        {n:'페일 로즈', c:'#ffb6c1'},
        {n:'살구 블러쉬', c:'#ffa07a'},
        {n:'드라이 피치', c:'#daa520'},
        {n:'블러드 오렌지', c:'#ff4500'},
        {n:'딥 코랄', c:'#cd5c5c'},
        {n:'썬 키스 피치', c:'#ff8c69'},
        {n:'쿨 핑크', c:'#ff69b4'},
        {n:'민트 로즈', c:'#ffc0cb'},
        {n:'피치 글로우', c:'#ff7777'},
        {n:'페일 살몬', c:'#fa8072'},
        {n:'로즈 누드', c:'#d2691e'},
        {n:'블러쉬 자몽', c:'#fd5e53'},
        {n:'페일 피치', c:'#ffdab9'},
        {n:'섀도 핑크', c:'#d8919c'},
        {n:'드라이 로즈', c:'#bc8f8f'},
        {n:'베이지 블러쉬', c:'#deb887'},
        {n:'썬셋 핑크', c:'#ff7e79'},
        {n:'쿨 코랄', c:'#ff6f61'},
        {n:'블러드 로즈', c:'#c41e3a'},
        {n:'페일 라즈베리', c:'#e30b5d'},
        {n:'민트 블러쉬', c:'#98ff98'},
        {n:'키스 핑크', c:'#ff85a2'},
        {n:'아일랜드 코랄', c:'#ff8c69'},
        {n:'페일 코코아', c:'#cd853f'},
        {n:'블러쉬 매트', c:'#d2b48c'},
        {n:'와인 글로우', c:'#b97a57'},
        {n:'스파이시 피치', c:'#ff6347'},
        {n:'러브 매트', c:'#ffadad'},
        {n:'블러쉬 베이지', c:'#e6c9a8'},
        {n:'페일 마젠타', c:'#ff77ff'},
        {n:'드림 로즈', c:'#ffb3ba'},
        {n:'페일 자몽', c:'#ff8c00'},
        {n:'블러쉬 우디', c:'#a0522d'},
        {n:'캔디 코랄', c:'#ff8674'},
        {n:'스위티 핑크', c:'#ffb7c5'},
        {n:'페일 살구', c:'#fdbb84'},
        {n:'코랄 매트', c:'#e9967a'},
        {n:'와인 블러쉬', c:'#883333'},
        {n:'드라이 베리', c:'#722f37'},
        {n:'페일 진주', c:'#fce4ec'},
        {n:'데일리 누드', c:'#d4a5a5'},
        {n:'블러쉬 골드', c:'#ffd700'},
        {n:'페일 로즈우드', c:'#bc8f8f'},
        {n:'드림 피치', c:'#ffcba4'},
        {n:'블러쉬 머스타드', c:'#ffdb58'},
        {n:'페일 글로우', c:'#f8b195'}
      ],
    eye: [
        {n:'데일리 브라운', c:'#7a5a48'},
        {n:'스모키 그레이', c:'#374151'},
        {n:'네추럴 누드', c:'#a08068'},
        {n:'딥 브라운', c:'#451a03'},
        {n:'골든 브론즈', c:'#b8860b'},
        {n:'카키 매트', c:'#556b2f'},
        {n:'페일 베이지', c:'#e7d2bb'},
        {n:'데일리 골드', c:'#daa520'},
        {n:'러스트 매트', c:'#b7410e'},
        {n:'코퍼 시머', c:'#b87333'},
        {n:'페일 핑크', c:'#ffb6c1'},
        {n:'스모키 블루', c:'#1e3a8a'},
        {n:'다크 그린', c:'#14532d'},
        {n:'페일 라일락', c:'#c4b5fd'},
        {n:'딥 와인', c:'#722f37'},
        {n:'페일 그레이', c:'#9ca3af'},
        {n:'골든 시머', c:'#ffd700'},
        {n:'다크 차콜', c:'#1f2937'},
        {n:'페일 골드', c:'#eee8aa'},
        {n:'블러쉬 누드', c:'#d4a574'},
        {n:'페일 모카', c:'#a87b53'},
        {n:'데일리 카키', c:'#3d4a1f'},
        {n:'다크 머스타드', c:'#8b6914'},
        {n:'페일 인디고', c:'#4b0082'},
        {n:'네추럴 베이지', c:'#cdb38b'},
        {n:'스모키 퍼플', c:'#581c87'},
        {n:'데일리 코퍼', c:'#cb6d51'},
        {n:'블랙 매트', c:'#0c0a09'},
        {n:'페일 옐로우', c:'#fff8dc'},
        {n:'딥 그린', c:'#1a2e05'},
        {n:'페일 로즈', c:'#ffc0cb'},
        {n:'스모키 카멜', c:'#a0522d'},
        {n:'다크 베리', c:'#5d0f3e'},
        {n:'페일 토프', c:'#a78060'},
        {n:'블러쉬 골드', c:'#daa520'},
        {n:'네추럴 모카', c:'#6f4e37'},
        {n:'스모키 인디고', c:'#3730a3'},
        {n:'페일 누드', c:'#e7d2bb'},
        {n:'다크 카키', c:'#3c4421'},
        {n:'페일 베리', c:'#9f5980'},
        {n:'네추럴 골드', c:'#c5a572'},
        {n:'스모키 와인', c:'#5d1f5d'},
        {n:'데일리 시머', c:'#d6c5a3'},
        {n:'페일 카멜', c:'#c19a6b'},
        {n:'다크 코코아', c:'#3b1810'},
        {n:'블러쉬 토프', c:'#967117'},
        {n:'스모키 차콜', c:'#1c1917'},
        {n:'페일 살구', c:'#fdbb84'},
        {n:'데일리 매트', c:'#8b7355'},
        {n:'네추럴 브론즈', c:'#cd7f32'}
      ],
    base: [
        {n:'페일 아이보리', c:'#fffff0'},
        {n:'데일리 베이지', c:'#f5e6d3'},
        {n:'네추럴 누드', c:'#e6c9a8'},
        {n:'페일 핑크', c:'#fce4ec'},
        {n:'밀키 베이지', c:'#f5deb3'},
        {n:'페일 살몬', c:'#ffa07a'},
        {n:'골든 베이지', c:'#deb887'},
        {n:'데일리 누드', c:'#ddbea9'},
        {n:'페일 골드', c:'#fef08a'},
        {n:'네추럴 토프', c:'#a78060'},
        {n:'페일 모카', c:'#a87b53'},
        {n:'데일리 카멜', c:'#c19a6b'},
        {n:'블러쉬 베이지', c:'#e9c9a4'},
        {n:'밀크 티 누드', c:'#d2b48c'},
        {n:'페일 새틴', c:'#fffaf0'},
        {n:'바닐라 크림', c:'#f3e5ab'},
        {n:'페일 코코아', c:'#cd853f'},
        {n:'네추럴 글로우', c:'#ffe4e1'},
        {n:'페일 매트', c:'#bdb76b'},
        {n:'밀키 글로우', c:'#fef9e7'},
        {n:'데일리 매트', c:'#dccca3'},
        {n:'페일 베이지', c:'#f5f5dc'},
        {n:'네추럴 살구', c:'#fbceb1'},
        {n:'블러쉬 글로우', c:'#ffe4c4'},
        {n:'페일 누드', c:'#e9d8a6'},
        {n:'데일리 새틴', c:'#fffacd'},
        {n:'밀크 글로우', c:'#f0e68c'},
        {n:'페일 라이트', c:'#fff8dc'},
        {n:'네추럴 모카', c:'#cdb38b'},
        {n:'페일 시머', c:'#f5deb3'},
        {n:'데일리 글로우', c:'#ffe5b4'},
        {n:'밀크 누드', c:'#fffff0'},
        {n:'페일 캐러멜', c:'#daa520'},
        {n:'네추럴 아이보리', c:'#fafafa'},
        {n:'페일 살구', c:'#fbb04c'},
        {n:'블러쉬 누드', c:'#ddbea9'},
        {n:'데일리 베이지', c:'#deb887'},
        {n:'페일 토프', c:'#967117'},
        {n:'밀크 매트', c:'#f0e68c'},
        {n:'페일 미스트', c:'#fffafa'},
        {n:'네추럴 새틴', c:'#fdf5e6'},
        {n:'페일 핑크누드', c:'#fde4d3'},
        {n:'블러쉬 매트', c:'#e9c9a4'},
        {n:'데일리 핑크', c:'#fde4d3'},
        {n:'페일 메이블', c:'#deb3b3'},
        {n:'밀크 베이지', c:'#f5e1b1'},
        {n:'네추럴 페일', c:'#fae8e0'},
        {n:'페일 글로우', c:'#fff8dc'},
        {n:'블러쉬 살구', c:'#ffbf80'},
        {n:'데일리 라이트', c:'#faebd7'}
      ]
  ,
  hair: [
    {n:'다크 브라운', c:'#3b2418'},{n:'초콜릿 브라운', c:'#4a2c1d'},{n:'애쉬 브라운', c:'#5a4a42'},
    {n:'모카 브라운', c:'#6b4a35'},{n:'카라멜', c:'#8a5a30'},{n:'허니 브라운', c:'#9c6b3c'},
    {n:'라이트 베이지', c:'#b08a5e'},{n:'애쉬 그레이', c:'#6e6a68'},{n:'와인 레드', c:'#6e1420'},
    {n:'체리 레드', c:'#9c1c28'},{n:'코퍼 오렌지', c:'#b45a20'},{n:'로즈 골드', c:'#c07a6a'},
    {n:'애쉬 핑크', c:'#b06a78'},{n:'라벤더', c:'#8a6ea8'},{n:'애쉬 블루', c:'#3c5a7a'},
    {n:'민트 그린', c:'#3c7a68'},{n:'플래티넘 블론드', c:'#d8c8a8'},{n:'실버 애쉬', c:'#a8a8ac'}
  ]
  },
  luxury: {
    lip: [
        {n:'CHANEL Rouge Allure 99 Pirate', c:'#a8141a'},
        {n:'CHANEL Rouge Coco 482 Rose Malicieux', c:'#c2657f'},
        {n:'CHANEL Rouge Allure Velvet 38 La Fascinante', c:'#9d2336'},
        {n:'CHANEL Rouge Coco Bloom 138', c:'#dc4768'},
        {n:'CHANEL Rouge Allure 96 Excentrique', c:'#5a1828'},
        {n:'CHANEL Rouge Coco 442 Dimitri', c:'#964b48'},
        {n:'CHANEL Rouge Allure 174 Rouge Angelique', c:'#a4485a'},
        {n:'CHANEL Les Beiges Healthy Glow 11', c:'#c4807c'},
        {n:'CHANEL Rouge Coco 472 Experimental', c:'#a83552'},
        {n:'CHANEL Rouge Allure Velvet 51 La Bouleversante', c:'#923238'},
        {n:'CHANEL Rouge Coco Flash 96 Phenomene', c:'#9c1f30'},
        {n:'CHANEL Rouge Coco 444 Gabrielle', c:'#882a3a'},
        {n:'DIOR Rouge 999 Velvet', c:'#c8161d'},
        {n:'DIOR Rouge 720 Icone', c:'#9c2a3a'},
        {n:'DIOR Lip Glow 001', c:'#e6878a'},
        {n:'DIOR Addict Stellar Shine 976', c:'#a23448'},
        {n:'DIOR Rouge 080 Red Smile', c:'#bd1830'},
        {n:'DIOR Rouge 100 Nude Look', c:'#c69584'},
        {n:'DIOR Rouge 366 Forever Hopeful', c:'#c46474'},
        {n:'DIOR Rouge 558 Grace', c:'#b34e58'},
        {n:'DIOR Lip Glow 015 Cherry', c:'#c75065'},
        {n:'DIOR Forever Liquid 999', c:'#a8141c'},
        {n:'DIOR Rouge 760 Favorite', c:'#a93952'},
        {n:'DIOR Rouge 028 Vintage Pink', c:'#c66a78'},
        {n:'YSL Rouge Pur 1966 Rouge Libre', c:'#9d2336'},
        {n:'YSL Rouge Pur 21 Rouge Paradoxe', c:'#c8112c'},
        {n:'YSL Tatouage Couture 16 Nude Emblem', c:'#a45e3f'},
        {n:'YSL Rouge Pur 70 Le Nu', c:'#b07060'},
        {n:'YSL Rouge Volupte Shine 86', c:'#c4485e'},
        {n:'YSL The Slim 21 Rouge Paradoxe', c:'#9e2638'},
        {n:'YSL Rouge Pur 153 Chili Provocation', c:'#a9292e'},
        {n:'YSL Vinyl Cream 401 Rouge Tatouage', c:'#8d1c2a'},
        {n:'YSL Rouge Pur 102 Bare Burgundy', c:'#7a2030'},
        {n:'YSL Tatouage Couture 25 Nude Adversary', c:'#9d6953'},
        {n:'YSL Rouge Pur 7 Le Fuchsia', c:'#b13660'},
        {n:'YSL Rouge Volupte Shine 44 Nude Lavalliere', c:'#a8634c'},
        {n:'MAC Ruby Woo', c:'#bf1730'},
        {n:'MAC Velvet Teddy', c:'#b07560'},
        {n:'MAC Russian Red', c:'#9e1b2e'},
        {n:'MAC Diva', c:'#621323'},
        {n:'MAC Whirl', c:'#a96f5e'},
        {n:'MAC Mehr', c:'#a85a6b'},
        {n:'MAC Chili', c:'#9c3322'},
        {n:'MAC Twig', c:'#a06458'},
        {n:'MAC Cherish', c:'#a47e62'},
        {n:'MAC Mocha', c:'#a57862'},
        {n:'MAC Lady Danger', c:'#d8311c'},
        {n:'MAC Heroine', c:'#7c2d80'},
        {n:'TOM FORD Cherry Lush', c:'#8b1c2c'},
        {n:'TOM FORD Indian Rose', c:'#a64e6c'},
        {n:'TOM FORD Black Dahlia', c:'#5e0d1a'},
        {n:'TOM FORD Casablanca', c:'#b87466'},
        {n:'TOM FORD Scarlet Rouge', c:'#a3142a'},
        {n:'TOM FORD Negligee', c:'#cc8a8e'},
        {n:'TOM FORD Spanish Pink', c:'#c66875'},
        {n:'TOM FORD True Coral', c:'#d44d3e'},
        {n:'TOM FORD Pussycat', c:'#a86a6e'},
        {n:'GIVENCHY Le Rouge Carmin', c:'#b91c1c'},
        {n:'GIVENCHY Le Rose Perfecto', c:'#e09a9c'},
        {n:'GIVENCHY Rouge Interdit 28', c:'#9e2143'},
        {n:'GIVENCHY Le Rouge 209 Rouge Egerie', c:'#a82238'},
        {n:'GIVENCHY Le Rouge 333 L\'Interdit', c:'#a3334c'},
        {n:'HERA Rouge Holic 277', c:'#c66666'},
        {n:'HERA Sensual Spicy 232', c:'#a04141'},
        {n:'HERA Sensual Nude 425', c:'#bd8c7a'},
        {n:'HERA Sensual Powder Matte 363', c:'#a5544c'},
        {n:'HERA Original Stay 433', c:'#a93e54'},
        {n:'LANCÔME L\'Absolu Rouge 196', c:'#9c3148'},
        {n:'LANCÔME L\'Absolu Rouge 397', c:'#7c2a3a'},
        {n:'LANCÔME L\'Absolu Cream 525', c:'#a1697e'},
        {n:'LANCÔME L\'Absolu Mademoiselle 202', c:'#c87d80'},
        {n:'ESTÉE LAUDER Rebellious Rose', c:'#b8324e'},
        {n:'ESTÉE LAUDER Pure Color 333', c:'#922c41'},
        {n:'ESTÉE LAUDER Envy 420 Rebellious Rose', c:'#a73e58'},
        {n:'ESTÉE LAUDER Pure Color 122 Naked Truth', c:'#c0826d'}
      ],
    cheek: [
        {n:'NARS Orgasm Peach Coral', c:'#e69582'},
        {n:'NARS Deep Throat', c:'#e8a5a8'},
        {n:'NARS Sin', c:'#9c5267'},
        {n:'NARS Liberte', c:'#c97b6f'},
        {n:'NARS Madly', c:'#b85e6c'},
        {n:'NARS Outlaw', c:'#9e3e4a'},
        {n:'NARS Gilda', c:'#cf7064'},
        {n:'NARS Torrid', c:'#c46f5a'},
        {n:'NARS Luster', c:'#d28b6e'},
        {n:'NARS Amour', c:'#d57778'},
        {n:'MAC Melba Soft Coral', c:'#f5a583'},
        {n:'MAC Peaches', c:'#e89978'},
        {n:'MAC Fleur Power', c:'#dc8090'},
        {n:'MAC Mocha', c:'#9d6c5a'},
        {n:'MAC Coppertone', c:'#a86346'},
        {n:'MAC Pinch Me', c:'#cd6e58'},
        {n:'MAC Style', c:'#c8826e'},
        {n:'MAC Margin', c:'#bf6f5e'},
        {n:'BENEFIT Dandelion Pink', c:'#f5b8c1'},
        {n:'BENEFIT Rockateur Rose-Gold', c:'#c87a7e'},
        {n:'BENEFIT Galifornia', c:'#e39481'},
        {n:'BENEFIT Coralista Coral', c:'#d96c5a'},
        {n:'BENEFIT Sugarbomb', c:'#e0856a'},
        {n:'BENEFIT Bella Bamba', c:'#cd5c5c'},
        {n:'BENEFIT Hoola Bronze', c:'#a07561'},
        {n:'BENEFIT Thrrrob', c:'#c8485e'},
        {n:'DIOR Rosy Glow 001', c:'#f0a0a8'},
        {n:'DIOR Rosy Glow 012 Rosewood', c:'#c98897'},
        {n:'DIOR Backstage Rosy Glow 015 Cherry', c:'#c25867'},
        {n:'DIOR Backstage Glow Face 001', c:'#e7a796'},
        {n:'DIOR Rosy Glow 004 Coral', c:'#e88475'},
        {n:'DIOR Diorblush 829 Miss Bloom', c:'#c4707a'},
        {n:'DIOR Diorblush 941 Pink Glory', c:'#dc8e92'},
        {n:'DIOR Diorblush 999', c:'#c84e5a'},
        {n:'CHANEL Joues Tweed Pink', c:'#eeb2b8'},
        {n:'CHANEL Joues Contraste 71 Malice', c:'#c87a87'},
        {n:'CHANEL Joues Contraste 64 Pink Explosion', c:'#e0859e'},
        {n:'CHANEL Joues Contraste 72 Rose Initiale', c:'#deb2a8'},
        {n:'CHANEL Joues Contraste 320 Rouge Profond', c:'#a04256'},
        {n:'CHANEL Joues Contraste 200 Caresse', c:'#cf887e'},
        {n:'CHANEL Joues Contraste 03 Brume D\'Or', c:'#c08066'},
        {n:'HOURGLASS Diffused Heat', c:'#e89090'},
        {n:'HOURGLASS Mood Exposure', c:'#c66c6c'},
        {n:'HOURGLASS Ambient Lighting Mood Light', c:'#deb8b3'},
        {n:'HOURGLASS Ethereal Light', c:'#e4c4ac'},
        {n:'HOURGLASS Radiant Magenta', c:'#c45479'},
        {n:'HOURGLASS Ambient Strobe', c:'#ddb097'},
        {n:'HOURGLASS Brilliant Nude', c:'#cf8c75'},
        {n:'TOM FORD Frantic Pink', c:'#e6829a'},
        {n:'TOM FORD Wicked Coral', c:'#d96e5a'},
        {n:'TOM FORD Love Lust', c:'#c44862'},
        {n:'TOM FORD Inhibition', c:'#cd7a6e'},
        {n:'TOM FORD Gratuitous', c:'#a86056'},
        {n:'CHARLOTTE Pillow Talk Blush', c:'#deb29c'},
        {n:'CHARLOTTE Love Glow', c:'#dc8e85'},
        {n:'CHARLOTTE Sex on Fire', c:'#b2675f'},
        {n:'CHARLOTTE Cheek to Chic Pillowtalk', c:'#d7a995'},
        {n:'CHARLOTTE Walk of No Shame Blush', c:'#c47a72'},
        {n:'GIVENCHY Prisme Libre 1 Mousseline', c:'#e8b7a8'},
        {n:'GIVENCHY Prisme Libre 4 Mousseline', c:'#c97e6c'},
        {n:'GIVENCHY Prisme Blush 02 Spirit', c:'#dc8e85'},
        {n:'GIVENCHY Prisme Blush 06 Romantica', c:'#dd9999'},
        {n:'YSL Touche Eclat Blush 7', c:'#cc6b67'},
        {n:'YSL Touche Eclat Blush 4', c:'#e08580'},
        {n:'YSL Touche Eclat Blush 9', c:'#d68672'},
        {n:'GIORGIO ARMANI Cheek Fabric 504', c:'#dc6877'},
        {n:'GIORGIO ARMANI Cheek Fabric 506', c:'#d9938e'},
        {n:'GIORGIO ARMANI Cheek Fabric 508', c:'#a86056'},
        {n:'LANCÔME Blush Subtil 376 Power Pink', c:'#ea8285'},
        {n:'LANCÔME Blush Subtil 350 Rose Romantique', c:'#dc99a0'},
        {n:'LANCÔME Blush Subtil 02 Rose Sable', c:'#cd8a85'},
        {n:'ESTÉE LAUDER Pure Color 110 Lover\'s Blush', c:'#d68987'},
        {n:'ESTÉE LAUDER Bronze Goddess Blush', c:'#c47261'}
      ],
    eye: [
        {n:'CHARLOTTE Pillow Talk Eyes', c:'#7d4e57'},
        {n:'CHARLOTTE The Dolce Vita', c:'#5e2e2f'},
        {n:'CHARLOTTE The Bella Sofia', c:'#7f3d1b'},
        {n:'CHARLOTTE Walk of Shame Eyes', c:'#8b3b3b'},
        {n:'CHARLOTTE Stars in Your Eyes', c:'#5a3e3c'},
        {n:'CHARLOTTE Smokey Eye Beauty', c:'#4a3e35'},
        {n:'CHARLOTTE Pillow Talk Dreams', c:'#a17567'},
        {n:'CHARLOTTE Copper Charge', c:'#a96838'},
        {n:'CHARLOTTE Queen of Glow', c:'#9c6a4a'},
        {n:'CHARLOTTE The Sophisticate', c:'#7a4a3e'},
        {n:'URBAN DECAY Naked Half Baked', c:'#876848'},
        {n:'URBAN DECAY Naked Smog', c:'#7c5236'},
        {n:'URBAN DECAY Naked Buck', c:'#5a3a25'},
        {n:'URBAN DECAY Naked Toasted', c:'#9a7459'},
        {n:'URBAN DECAY Naked Sin', c:'#bfa089'},
        {n:'URBAN DECAY Naked Hustle', c:'#9c6e44'},
        {n:'URBAN DECAY Naked Tease', c:'#cd9774'},
        {n:'URBAN DECAY Naked Sidecar', c:'#7e503f'},
        {n:'URBAN DECAY Naked Foxy', c:'#bb9477'},
        {n:'URBAN DECAY Naked Snakebite', c:'#6e4626'},
        {n:'MAC Soft Brown', c:'#7a5a48'},
        {n:'MAC Brown Script', c:'#5e3e2c'},
        {n:'MAC All That Glitters', c:'#b29575'},
        {n:'MAC Naked Lunch', c:'#d2b48c'},
        {n:'MAC Carbon', c:'#1c1917'},
        {n:'MAC Woodwinked', c:'#9a6c48'},
        {n:'MAC Saddle', c:'#7c4e3a'},
        {n:'MAC Embark', c:'#5e3e2c'},
        {n:'DIOR 5 Couleurs Bronze', c:'#8b6b3d'},
        {n:'DIOR 5 Couleurs Soft Cashmere', c:'#a07a5b'},
        {n:'DIOR Mono Lustrous Smoky', c:'#3d2b21'},
        {n:'DIOR Backstage Bronze Glow', c:'#b08358'},
        {n:'DIOR 5 Couleurs 689 Mitzah', c:'#7a4a36'},
        {n:'DIOR 5 Couleurs 689 Spice', c:'#a06a4a'},
        {n:'DIOR Mono Lustrous Bronze', c:'#9c6a4a'},
        {n:'TOM FORD Body Heat', c:'#6d3f2c'},
        {n:'TOM FORD Nude Dip', c:'#a07861'},
        {n:'TOM FORD Honeymoon', c:'#9c7e5a'},
        {n:'TOM FORD Cocoa Mirage', c:'#5e3c2a'},
        {n:'TOM FORD Burnished Amber', c:'#a56838'},
        {n:'TOM FORD Disco Dust', c:'#a08056'},
        {n:'TOM FORD Insolent Rose', c:'#9c5466'},
        {n:'PAT McGRATH Astral Smoke', c:'#3d3a4a'},
        {n:'PAT McGRATH MTHRSHP Subliminal', c:'#7b5a3c'},
        {n:'PAT McGRATH Bronze Seduction', c:'#9c6e44'},
        {n:'PAT McGRATH Divine Rose', c:'#8a3a4f'},
        {n:'PAT McGRATH Mothership Sublime', c:'#7c5236'},
        {n:'STILA Kitten Champagne', c:'#a08068'},
        {n:'STILA Magnificent Metals Comex Copper', c:'#a56833'},
        {n:'STILA Bronze Bronze Smoke', c:'#6e4928'},
        {n:'STILA Glitter & Glow Diamond Dust', c:'#cdb38b'},
        {n:'STILA Magnificent Metals Smoky Storm', c:'#5e4e4a'},
        {n:'CHANEL Les Beiges Bronze', c:'#9a6f4a'},
        {n:'CHANEL Ombre Première Memory', c:'#5a4a3e'},
        {n:'CHANEL Ombre Essentielle Bronze', c:'#7e5b3a'},
        {n:'CHANEL Ombre Première 24 Talpa', c:'#7c685c'},
        {n:'CHANEL Stylo Yeux 88 Noir Intense', c:'#1a1a1a'},
        {n:'YSL Couture Cap Ferrat', c:'#9d6e4a'},
        {n:'YSL Couture Lumieres Saharienne', c:'#bf935c'},
        {n:'YSL Couture Saharienne', c:'#7c5028'},
        {n:'YSL Mascara Volume Effet 01', c:'#1a1c1a'},
        {n:'YSL Couture Mini 410 Suede', c:'#a07b58'},
        {n:'GIVENCHY Prisme Libre 7 Quatuor', c:'#5a3e34'},
        {n:'GIVENCHY Le Prisme Eyes Bronze', c:'#7d5236'},
        {n:'GIVENCHY Eye Quartet 06', c:'#7e5a44'},
        {n:'GIVENCHY Eye Quartet 07', c:'#6c4836'},
        {n:'GIORGIO ARMANI Eyes to Kill 7', c:'#5a4030'},
        {n:'GIORGIO ARMANI Eye Tint 12 Gold Ashes', c:'#a07e4e'},
        {n:'GIORGIO ARMANI Eye Tint 21 Coffee', c:'#5e3e2c'},
        {n:'GIORGIO ARMANI Eyes to Kill 24', c:'#956e54'},
        {n:'LANCÔME Hypnose Bronze', c:'#7a4e2e'},
        {n:'LANCÔME Color Design Espresso', c:'#4a2e1c'},
        {n:'LANCÔME Ombre Hypnose 03', c:'#8c6748'},
        {n:'LANCÔME Ombre Hypnose 06', c:'#5a3e34'},
        {n:'ESTÉE LAUDER Pure Color Cocoa Plum', c:'#5d3a3a'},
        {n:'ESTÉE LAUDER Wild Earth', c:'#7c5a3a'},
        {n:'ESTÉE LAUDER Pure Color 16 Slate', c:'#5e5a55'},
        {n:'ESTÉE LAUDER Pure Color 22 Hot Cinnamon', c:'#9c5e36'},
        {n:'NARS Dual-Intensity Lysithea', c:'#a07c5a'},
        {n:'NARS Hardwired Sehnsucht', c:'#3d2820'}
      ],
    base: [
        {n:'ESTÉE LAUDER Double Wear Ivory', c:'#f3d4ba'},
        {n:'ESTÉE LAUDER Double Wear Beige', c:'#e6c0a0'},
        {n:'ESTÉE LAUDER Double Wear Bone', c:'#f1d2b3'},
        {n:'ESTÉE LAUDER Futurist Aqua Brilliance', c:'#f0d9c3'},
        {n:'ESTÉE LAUDER Double Wear 1N1 Ivory Nude', c:'#f0d2b0'},
        {n:'ESTÉE LAUDER Double Wear 2C0 Cool Vanilla', c:'#eccaa6'},
        {n:'ESTÉE LAUDER Double Wear 3W1 Tawny', c:'#cd9c70'},
        {n:'ESTÉE LAUDER Double Wear 4N1 Shell Beige', c:'#cfa074'},
        {n:'ESTÉE LAUDER Futurist Awakening 1N1', c:'#eed5b8'},
        {n:'ESTÉE LAUDER Double Wear Stay-in-Place', c:'#e6c9a8'},
        {n:'LANCÔME Teint Idole 220 Buff', c:'#eecaa6'},
        {n:'LANCÔME Teint Idole 360 Bisque', c:'#d8a880'},
        {n:'LANCÔME Teint Idole 410 Bisque', c:'#c69570'},
        {n:'LANCÔME Renergie Lift Foundation', c:'#e3c1a0'},
        {n:'LANCÔME Teint Idole 240 Bisque', c:'#e3c1a0'},
        {n:'LANCÔME Teint Idole 200 Buff', c:'#f0d2b0'},
        {n:'LANCÔME Teint Idole 460 Suede', c:'#a87655'},
        {n:'LANCÔME Teint Miracle 02 Lys Rose', c:'#ebc8a4'},
        {n:'LANCÔME Teint Idole 145 Ivoire', c:'#f3d4ba'},
        {n:'LANCÔME Teint Miracle 04 Beige Nature', c:'#deba8a'},
        {n:'NARS Sheer Glow Mont Blanc', c:'#f5dcc4'},
        {n:'NARS Sheer Glow Deauville', c:'#e8c9a8'},
        {n:'NARS Sheer Glow Punjab', c:'#cb9970'},
        {n:'NARS Natural Radiant Cadiz', c:'#b48060'},
        {n:'NARS Sheer Glow Santa Fe', c:'#c69570'},
        {n:'NARS Light Reflecting Foundation Mont Blanc', c:'#f0d2b0'},
        {n:'NARS Natural Radiant Stromboli', c:'#d8a880'},
        {n:'NARS Sheer Glow Vienna', c:'#ebc8a4'},
        {n:'HERA Black Cushion 21N', c:'#e8c5a0'},
        {n:'HERA Black Cushion 23N', c:'#d5ac84'},
        {n:'HERA UV Mist Cushion C21', c:'#ebc8a4'},
        {n:'HERA Glow Lasting Foundation', c:'#e3c0a0'},
        {n:'HERA Age Reverse Foundation 21', c:'#e8c5a0'},
        {n:'HERA Age Reverse 23', c:'#d8b08a'},
        {n:'HERA Black Cushion 17N', c:'#f0d8be'},
        {n:'HERA Sensual Powder Foundation 21', c:'#e6c2a0'},
        {n:'GIORGIO ARMANI Luminous 4.5', c:'#e6b890'},
        {n:'GIORGIO ARMANI Luminous 5.5', c:'#d8a578'},
        {n:'GIORGIO ARMANI Power Fabric 4', c:'#e0b18a'},
        {n:'GIORGIO ARMANI Maestro 4', c:'#dca785'},
        {n:'GIORGIO ARMANI Luminous 3.5', c:'#ebc8a4'},
        {n:'GIORGIO ARMANI Power Fabric 6', c:'#b88562'},
        {n:'GIORGIO ARMANI Neo Nude 4', c:'#dab084'},
        {n:'CHANEL Vitalumière 22 Beige', c:'#eac9a2'},
        {n:'CHANEL Vitalumière 30 Cendré', c:'#d6ad88'},
        {n:'CHANEL Les Beiges N22', c:'#e6c4a0'},
        {n:'CHANEL Sublimage Le Teint', c:'#deb78f'},
        {n:'CHANEL Ultra Le Teint B30', c:'#e0b58a'},
        {n:'CHANEL Les Beiges Healthy Glow B40', c:'#d8a880'},
        {n:'CHANEL Vitalumière Aqua 30', c:'#dcb38a'},
        {n:'CLINIQUE Even Better 18 Sand', c:'#dcb591'},
        {n:'CLINIQUE Even Better 26 Cashew', c:'#bf8e62'},
        {n:'CLINIQUE Beyond Perfecting 06 Ivory', c:'#eecaa6'},
        {n:'CLINIQUE Anti-Blemish Solutions', c:'#e3bf95'},
        {n:'CLINIQUE Even Better Glow 04', c:'#e0c0a0'},
        {n:'CLINIQUE Stay-Matte Oil-Free 02', c:'#e8c8a4'},
        {n:'DIOR Forever 1.5N', c:'#ebcaa3'},
        {n:'DIOR Forever 3N', c:'#d6ad7e'},
        {n:'DIOR Backstage Face Glow 0N', c:'#f5d6b5'},
        {n:'DIOR Capture Totale Foundation', c:'#e4be90'},
        {n:'DIOR Forever Skin Glow 2N', c:'#e6c2a0'},
        {n:'DIOR Forever Matte 3N', c:'#d8b08a'},
        {n:'YSL Touche Éclat B20 Ivory', c:'#f0d4b3'},
        {n:'YSL Touche Éclat B30 Almond', c:'#d9b288'},
        {n:'YSL All Hours Foundation B40', c:'#c69560'},
        {n:'YSL Encre De Peau BR30', c:'#dcb58c'},
        {n:'YSL Touche Éclat Foundation B50', c:'#b88562'},
        {n:'TOM FORD Traceless 0.5 Porcelain', c:'#f1d6b8'},
        {n:'TOM FORD Traceless 2.5 Linen', c:'#e3c39c'},
        {n:'TOM FORD Shade and Illuminate', c:'#deb78c'},
        {n:'TOM FORD Traceless 4.5 Bisque', c:'#c69570'},
        {n:'GIVENCHY Teint Couture 1 Porcelain', c:'#f0d2b0'},
        {n:'GIVENCHY Teint Couture 4 Beige', c:'#d9b58a'},
        {n:'GIVENCHY Prisme Libre Loose Powder', c:'#e8caa4'},
        {n:'MAC Studio Fix NW20', c:'#e2bc92'},
        {n:'MAC Studio Fix NC30', c:'#cea076'},
        {n:'MAC Pro Longwear NW18', c:'#e9c3a0'},
        {n:'CHARLOTTE Magic Foundation 04', c:'#e3bd92'},
        {n:'PAT McGRATH Skin Fetish Sublime', c:'#dcb38a'},
        {n:'HOURGLASS Vanish Seamless 4 Light', c:'#e6c5a0'},
        {n:'HOURGLASS Vanish Stick 5 Linen', c:'#d6ab80'},
        {n:'BENEFIT Hello Happy Soft Blur', c:'#ebcaa6'}
      ]
  ,
  hair: [
    {n:'다크 브라운', c:'#3b2418'},{n:'초콜릿 브라운', c:'#4a2c1d'},{n:'애쉬 브라운', c:'#5a4a42'},
    {n:'모카 브라운', c:'#6b4a35'},{n:'카라멜', c:'#8a5a30'},{n:'허니 브라운', c:'#9c6b3c'},
    {n:'라이트 베이지', c:'#b08a5e'},{n:'애쉬 그레이', c:'#6e6a68'},{n:'와인 레드', c:'#6e1420'},
    {n:'체리 레드', c:'#9c1c28'},{n:'코퍼 오렌지', c:'#b45a20'},{n:'로즈 골드', c:'#c07a6a'},
    {n:'애쉬 핑크', c:'#b06a78'},{n:'라벤더', c:'#8a6ea8'},{n:'애쉬 블루', c:'#3c5a7a'},
    {n:'민트 그린', c:'#3c7a68'},{n:'플래티넘 블론드', c:'#d8c8a8'},{n:'실버 애쉬', c:'#a8a8ac'}
  ]
  },
  oheng: {
    lip: [
        {n:'木·딥에메랄드', c:'#0f5132'},
        {n:'木·포레스트', c:'#15803d'},
        {n:'木·민트', c:'#10b981'},
        {n:'木·세이지', c:'#65a30d'},
        {n:'木·올리브', c:'#84cc16'},
        {n:'火·정통퓨어레드', c:'#dc2626'},
        {n:'火·체리블러드', c:'#b91c1c'},
        {n:'火·진주홍', c:'#ef4444'},
        {n:'火·코랄핑크', c:'#fb7185'},
        {n:'火·플래밍로즈', c:'#e11d48'},
        {n:'土·골든앰버', c:'#ca8a04'},
        {n:'土·머스타드', c:'#a16207'},
        {n:'土·해니브라운', c:'#92400e'},
        {n:'土·테라코타', c:'#c2410c'},
        {n:'土·구릿빛', c:'#b45309'},
        {n:'金·누드베이지', c:'#e7d2bb'},
        {n:'金·샤이펄', c:'#f3e8d8'},
        {n:'金·플래티넘', c:'#d6c5a3'},
        {n:'金·캐러멜', c:'#a87b53'},
        {n:'金·라이트골드', c:'#d4a574'},
        {n:'水·다크초콜릿', c:'#451a03'},
        {n:'水·블랙체리', c:'#3f0e0a'},
        {n:'水·미드나잇', c:'#1e1b4b'},
        {n:'水·딥와인', c:'#7f1d1d'},
        {n:'水·블러디퍼플', c:'#581c87'}
      ],
    cheek: [
        {n:'木·민트블러쉬', c:'#a7f3d0'},
        {n:'木·세이지글로우', c:'#bbf7d0'},
        {n:'木·페일아쿠아', c:'#cffafe'},
        {n:'木·라이트민트', c:'#d1fae5'},
        {n:'木·연두빛', c:'#d9f99d'},
        {n:'火·정통핑크', c:'#f9a8d4'},
        {n:'火·체리로즈', c:'#fb7185'},
        {n:'火·코랄피치', c:'#fdba74'},
        {n:'火·코랄피치', c:'#fb923c'},
        {n:'火·플래밍코랄', c:'#f87171'},
        {n:'土·살구피치', c:'#fdba74'},
        {n:'土·골든피치', c:'#fcd34d'},
        {n:'土·구릿빛블러쉬', c:'#b45309'},
        {n:'土·테라코타', c:'#ea580c'},
        {n:'土·캐러멜글로우', c:'#d97706'},
        {n:'金·누드피치', c:'#fed7aa'},
        {n:'金·페일베이지', c:'#fef3c7'},
        {n:'金·아이보리누드', c:'#fef9c3'},
        {n:'金·샴페인글로우', c:'#fef08a'},
        {n:'金·페일핑크', c:'#fce7f3'},
        {n:'水·잉크퍼플', c:'#7c3aed'},
        {n:'水·딥보이올렛', c:'#581c87'},
        {n:'水·플럼블러쉬', c:'#a21caf'},
        {n:'水·블루베리', c:'#3730a3'},
        {n:'水·미드나잇플럼', c:'#4c1d95'}
      ],
    eye: [
        {n:'木·딥에메랄드', c:'#064e3b'},
        {n:'木·포레스트섀도', c:'#14532d'},
        {n:'木·다크그린', c:'#15803d'},
        {n:'木·올리브섀도', c:'#365314'},
        {n:'木·세이지스모키', c:'#3f6212'},
        {n:'火·딥와인섀도', c:'#881337'},
        {n:'火·번트오렌지', c:'#9a3412'},
        {n:'火·체리브라운', c:'#7c2d12'},
        {n:'火·러스트', c:'#92400e'},
        {n:'火·딥레드', c:'#7f1d1d'},
        {n:'土·골든브론즈', c:'#78350f'},
        {n:'土·캐러멜', c:'#92400e'},
        {n:'土·머스타드섀도', c:'#854d0e'},
        {n:'土·앰버스모키', c:'#713f12'},
        {n:'土·번트골드', c:'#a16207'},
        {n:'金·뉴드샤이펄', c:'#a87b53'},
        {n:'金·샤이샴페인', c:'#d6c5a3'},
        {n:'金·라이트골드', c:'#fbbf24'},
        {n:'金·플래티넘', c:'#e7e5e4'},
        {n:'金·실버화이트', c:'#f5f5f4'},
        {n:'水·미드나잇', c:'#0c0a09'},
        {n:'水·잉크블랙', c:'#020617'},
        {n:'水·차콜', c:'#1c1917'},
        {n:'水·딥네이비', c:'#172554'},
        {n:'水·블랙플럼', c:'#3b0764'}
      ],
    base: [
        {n:'木·민트누드', c:'#d1fae5'},
        {n:'木·페일세이지', c:'#dcfce7'},
        {n:'木·아쿠아미스트', c:'#cffafe'},
        {n:'木·연두라이트', c:'#ecfccb'},
        {n:'木·민트화이트', c:'#f0fdf4'},
        {n:'火·핑크누드', c:'#fecaca'},
        {n:'火·페일코랄', c:'#fed7aa'},
        {n:'火·살몬크림', c:'#fee2e2'},
        {n:'火·로즈누드', c:'#fda4af'},
        {n:'火·페일핑크', c:'#fce7f3'},
        {n:'土·살구누드', c:'#fed7aa'},
        {n:'土·페일베이지', c:'#fef3c7'},
        {n:'土·아이보리크림', c:'#fefce8'},
        {n:'土·골든크림', c:'#fef08a'},
        {n:'土·캐러멜라이트', c:'#fcd34d'},
        {n:'金·뉴드아이보리', c:'#fffbeb'},
        {n:'金·페일베이지', c:'#f5f5f4'},
        {n:'金·뮤트누드', c:'#fafaf9'},
        {n:'金·샴페인글로우', c:'#f3f4f6'},
        {n:'金·플래티넘크림', c:'#e7e5e4'},
        {n:'水·라벤더누드', c:'#ddd6fe'},
        {n:'水·페일바이올렛', c:'#e9d5ff'},
        {n:'水·라일락미스트', c:'#f3e8ff'},
        {n:'水·뮤트퍼플', c:'#ede9fe'},
        {n:'水·페일플럼', c:'#fae8ff'}
      ]
  }
};
// ★ 사주 추천 모드 — 글로벌 명품 화장품 실제 색상 매칭 (28색)
//   각 카테고리에 맞는 명품 브랜드 컬러 (립=샤넬·디올·맥 / 볼=나스·맥 / 아이=디올·로레알 / 베이스=에스티로더·랑콤)
var _rmaiArOhengSet = {
  lip: [  // 💋 글로벌 명품 립스틱 베스트셀러 색상
    {n:'CHANEL Rouge Allure 99 Pirate', c:'#a8141a'},
    {n:'DIOR Rouge 999 Velvet', c:'#c8161d'},
    {n:'YSL Rouge Pur 1966', c:'#9d2336'},
    {n:'MAC Ruby Woo', c:'#bf1730'},
    {n:'TOM FORD Cherry Lush', c:'#8b1c2c'},
    {n:'GIVENCHY Le Rouge Carmin', c:'#b91c1c'},
    {n:'HERA Rosy Nude', c:'#c66666'}
  ],
  cheek: [  // 🌸 글로벌 명품 블러셔 베스트셀러
    {n:'NARS Orgasm Peach Coral', c:'#e69582'},
    {n:'MAC Melba Soft Coral', c:'#f5a583'},
    {n:'BENEFIT Dandelion Pink', c:'#f5b8c1'},
    {n:'DIOR Rosy Glow 001', c:'#f0a0a8'},
    {n:'CHANEL Joues Tweed Pink', c:'#eeb2b8'},
    {n:'HOURGLASS Diffused Heat', c:'#e89090'},
    {n:'MILANI Luminoso Peach', c:'#f4a98e'}
  ],
  eye: [  // 👁️ 글로벌 명품 아이섀도 베스트셀러
    {n:'CHARLOTTE Pillow Talk', c:'#7d4e57'},
    {n:'URBAN DECAY Naked Half Baked', c:'#876848'},
    {n:'MAC Soft Brown', c:'#7a5a48'},
    {n:'DIOR 5 Couleurs Bronze', c:'#8b6b3d'},
    {n:'TOM FORD Body Heat', c:'#6d3f2c'},
    {n:'PAT McGRATH Astral Smoke', c:'#3d3a4a'},
    {n:'STILA Kitten Champagne', c:'#a08068'}
  ],
  base: [  // 🫧 글로벌 명품 베이스/파운데이션 톤
    {n:'ESTÉE LAUDER Double Wear Ivory', c:'#f3d4ba'},
    {n:'LANCÔME Teint Idole 220 Buff', c:'#eecaa6'},
    {n:'NARS Sheer Glow Mont Blanc', c:'#f5dcc4'},
    {n:'HERA Black Cushion 21N', c:'#e8c5a0'},
    {n:'GIORGIO ARMANI Luminous 4.5', c:'#e6b890'},
    {n:'CHANEL Vitalumière 22 Beige', c:'#eac9a2'},
    {n:'CLINIQUE Even Better 18 Sand', c:'#dcb591'}
  ]
,
  hair: [
    // 💇 데일리 — 자연스러운 톤
    {n:'다크 브라운', c:'#3b2418'},
    {n:'초콜릿 브라운', c:'#4a2c1d'},
    {n:'애쉬 브라운', c:'#5a4a42'},
    {n:'모카 브라운', c:'#6b4a35'},
    {n:'카라멜', c:'#8a5a30'},
    {n:'허니 브라운', c:'#9c6b3c'},
    {n:'라이트 베이지', c:'#b08a5e'},
    {n:'애쉬 그레이', c:'#6e6a68'},
    // 💇 컬러 — 물들이는 색
    {n:'와인 레드', c:'#6e1420'},
    {n:'체리 레드', c:'#9c1c28'},
    {n:'코퍼 오렌지', c:'#b45a20'},
    {n:'로즈 골드', c:'#c07a6a'},
    {n:'애쉬 핑크', c:'#b06a78'},
    {n:'라벤더', c:'#8a6ea8'},
    {n:'애쉬 블루', c:'#3c5a7a'},
    {n:'민트 그린', c:'#3c7a68'},
    {n:'플래티넘 블론드', c:'#d8c8a8'},
    {n:'실버 애쉬', c:'#a8a8ac'}
  ]
};

// ★ MediaPipe FaceMesh 입술 외곽 (20개 — 시계방향)
var _rmaiArLipsOuter = [
  61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291,
  375, 321, 405, 314, 17, 84, 181, 91, 146
];

// ★ 볼 영역 (왼/오 각각 — 타원형 외곽)
var _rmaiArCheekLeft = [116, 117, 118, 119, 100, 142, 36, 50, 207, 213];
var _rmaiArCheekRight = [345, 346, 347, 348, 329, 371, 266, 280, 427, 433];

// ★ 눈꺼풀 영역 — 윗눈꺼풀만 (대칭 검증된 MediaPipe 공식 인덱스)
//   왼쪽: 눈 위 라인 + 눈썹 아래 라인 (9점 대칭)
var _rmaiArEyeLeft = [33, 246, 161, 160, 159, 158, 157, 173, 133, 55, 65, 52, 53, 46];
//   오른쪽: 거울 인덱스 (왼쪽과 정확히 대칭 — MediaPipe 공식 매핑)
var _rmaiArEyeRight = [263, 466, 388, 387, 386, 385, 384, 398, 362, 285, 295, 282, 283, 276];

// ★ 얼굴 외곽 (베이스 톤용 — 입술/눈 영역 제외하고 전체 적용)
var _rmaiArFaceOval = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109];

// ═══════════════════════════════════════════════════
// 구버전 호환 — rppgArStart (이미 박제된 곳에서 호출되면)
// ═══════════════════════════════════════════════════
window.rppgArStart = function(){
  if(typeof window.rmaiArStart==='function') return window.rmaiArStart();
};

// ═══════════════════════════════════════════════════
// ★ rmai-* 진짜 작동 함수 박제
//   기존 mai* 함수 코드 복제 + ID rmai-*로 매핑
//   _maiColors / _maiCalcAvgBrightness 는 공유 (전역 utility)
// ═══════════════════════════════════════════════════

// 별도 상태 변수 (기존 _mai와 충돌 없음)
var _rmaiBeforeData = null;
var _rmai = { running:false, timer:null, sec:0, stream:null, offCanvas:null, offCtx:null, lostCount:0, uni:0, glow:0, cover:0, moist:0, _samples:0 };

window.rmaiCaptureBeforePhoto = function(){
  // ★ 방안 B 박입 — cgoCameraCheck에 constraints 전달 → stream 재사용 → 권한 1번만
  cgoCameraCheck(function(stream){
    Promise.resolve(stream).then(function(stream){
      var v = document.createElement('video');
      v.srcObject = stream;
      v.autoplay = true;
      v.playsInline = true;
      v.muted = true;

      var popup = document.createElement('div');
      popup.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:20px;';
      popup.innerHTML = '<div style="font-size:14px;font-weight:800;color:#f472b6;">📸 화장 전 촬영</div>'
        + '<div style="font-size:11px;color:rgba(240,220,255,.6);">얼굴을 화면 중앙에 맞추고 촬영하세요</div>';
      /* ★ C-63: 동적 팝업 즉시 번역 */
      try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(popup); }catch(e){}
      var vWrap = document.createElement('div');
      vWrap.style.cssText = 'width:280px;border-radius:16px;overflow:hidden;border:2px solid rgba(244,114,182,.5);';
      vWrap.appendChild(v);
      popup.appendChild(vWrap);

      var btnRow = document.createElement('div');
      btnRow.style.cssText = 'display:flex;gap:12px;width:280px;';

      var captureBtn = document.createElement('button');
      captureBtn.style.cssText = 'flex:1;padding:14px;background:linear-gradient(135deg,#f472b6,#a855f7);border:none;border-radius:12px;color:#fff;font-size:14px;font-weight:800;cursor:pointer;';
      captureBtn.textContent = _cgoT(_aK(12302));
      captureBtn.onclick = function(){
        var canvas = document.createElement('canvas');
        canvas.width = 320; canvas.height = 240;
        var ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(v, 0, 0, 320, 240);
        _rmaiBeforeData = {
          imageData: ctx.getImageData(0, 0, 320, 240),
          dataURL: canvas.toDataURL('image/jpeg', 0.8)
        };
        stream.getTracks().forEach(function(t){t.stop();});
        document.body.removeChild(popup);

        var beforeImg = document.getElementById('rmai-before-img');
        var beforePh = document.getElementById('rmai-before-placeholder');
        var beforeOk = document.getElementById('rmai-before-ok');
        if(beforeImg){ beforeImg.src = _rmaiBeforeData.dataURL; beforeImg.style.display='block'; }
        if(beforePh) beforePh.style.display = 'none';
        if(beforeOk) beforeOk.style.display = 'block';

        var step2 = document.getElementById('rmai-step2-badge');
        if(step2){ step2.style.background='linear-gradient(135deg,rgba(168,85,247,.3),rgba(244,114,182,.2))'; step2.style.borderColor='#a855f7'; step2.style.color='#a855f7'; }

        var captureBtn2 = document.getElementById('rmai-capture-btn');
        if(captureBtn2){ captureBtn2.textContent = _cgoT(_aK(12303));
          /* ★ C-63: textContent 대입 후 즉시 번역 */
          try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(captureBtn2); }catch(e){} }

        var status = document.getElementById('rmai-face-status');
        if(status){ status.textContent = _cgoT(_aK(12304));
          /* ★ C-63: textContent 대입 후 즉시 번역 */
          try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(status); }catch(e){} }

        // ★ CGO hook
        if(typeof rmaiChatSay === 'function') rmaiChatSay('before-captured');
      };

      var cancelBtn = document.createElement('button');
      cancelBtn.style.cssText = 'flex:1;padding:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);border-radius:12px;color:rgba(255,255,255,.6);font-size:14px;font-weight:700;cursor:pointer;';
      cancelBtn.textContent = _cgoT(_aK(12305));
      /* ★ C-63: 문구 통일 + 즉시 번역 */
      try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(cancelBtn); }catch(e){}
      cancelBtn.onclick = function(){
        stream.getTracks().forEach(function(t){t.stop();});
        document.body.removeChild(popup);
      };

      btnRow.appendChild(captureBtn);
      btnRow.appendChild(cancelBtn);
      popup.appendChild(btnRow);
      document.body.appendChild(popup);
    })
    .catch(function(){ _cgoCameraAlert(_aK(12306)); });
  }, {constraints:{video:{facingMode:'user',width:320,height:240}}});
};

window.rmaiStartScan = function(){
  if(!_rmaiBeforeData){
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(10,22,40,.97);border:1.5px solid rgba(244,114,182,.5);border-radius:20px;padding:24px 28px;z-index:99999;text-align:center;max-width:300px;width:90%;';
    t.innerHTML = '<div style="font-size:28px;margin-bottom:10px;">📸</div>'
      + '<div style="font-size:14px;font-weight:900;color:#f472b6;margin-bottom:8px;">화장 전 사진이 없어요!</div>'
      + '<div style="font-size:12px;color:rgba(240,220,255,.8);line-height:1.7;margin-bottom:16px;">먼저 화장 전 촬영하기 버튼으로<br>맨얼굴을 찍어주세요 😊</div>'
      + '<button onclick="this.parentNode.remove()" style="padding:10px 24px;background:linear-gradient(135deg,#f472b6,#a855f7);border:none;border-radius:10px;color:#fff;font-size:13px;font-weight:900;cursor:pointer;">확인</button>';
    document.body.appendChild(t);
    /* ★ C-63: 동적 팝업 즉시 번역 */
    try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(t); }catch(e){}
    return;
  }
  cgoCameraCheck(function(){
    _rmaiStartScanCore();
  });
};

function _rmaiStartScanCore(){
  var r = window.calcResult||{};
  var oh = r.domOh||'토';
  var resEl = document.getElementById('rmai-result');
  var btnEl = document.getElementById('rmai-btn');
  if(resEl) resEl.style.display='none';
  if(btnEl) btnEl.style.display='none';
  _rmai.sec=0; _rmai.uni=0; _rmai.glow=0; _rmai.cover=0; _rmai.moist=0; _rmai._samples=0; _rmai.lostCount=0;

  navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:320,height:240}})
  .then(function(stream){
    _rmai.stream=stream;
    var v=document.getElementById('rmai-video');
    var ph=document.getElementById('rmai-placeholder');
    var guide=document.getElementById('rmai-guide');
    if(v){ v.srcObject=stream; v.style.display='block'; }
    if(ph) ph.style.display='none';
    if(guide) guide.style.display='block';
    /* ★ C-63: 카메라 켜지면 닫기 버튼 노출 */
    var _scb=document.getElementById('rmai-scan-close-btn'); if(_scb) _scb.style.display='block';
    _rmai.offCanvas=document.createElement('canvas');
    _rmai.offCtx=_rmai.offCanvas.getContext('2d', { willReadFrequently: true });
    _rmai.running=true;
    _rmai.timer=setInterval(function(){
      var prg=document.getElementById('rmai-progress');
      var tmr=document.getElementById('rmai-timer');
      var live=document.getElementById('rmai-score-live');
      var canCount=(_rmai.lostCount===0);
      if(canCount) _rmai.sec++;
      var remain=30-_rmai.sec;
      if(prg) prg.style.width=(_rmai.sec/30*100)+'%';
      if(tmr){ /* ★ C-63: '3초 남음'은 숫자 조립 → 단위를 언어별로 */
        var _su=_aK(12307); try{ if(window._LANG&&window._LANG!=='ko'){ var _dd=LANG_DICTIONARY[window._LANG]; if(_dd&&_dd[_aK(12307)]) _su=_dd[_aK(12307)]; } }catch(e){}
        tmr.textContent=canCount?(remain>0?remain+_su:_aK(12308)):_aK(12309);
        try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(tmr); }catch(e){} }

      var v2=document.getElementById('rmai-video');
      if(v2&&v2.videoWidth&&_rmai.offCtx){
        _rmai.offCanvas.width=64;_rmai.offCanvas.height=48;
        _rmai.offCtx.drawImage(v2,0,0,64,48);
        var px=_rmai.offCtx.getImageData(0,0,64,48).data;
        var rS=0,gS=0,bS=0,cnt=0;
        var vals=[];
        var skinPixCount=0;  // ★ 피부 픽셀 카운트 (책상·옷 거부)
        for(var i=0;i<px.length;i+=4){
          var pr=px[i], pg=px[i+1], pb=px[i+2];
          rS+=pr; gS+=pg; bS+=pb; cnt++; vals.push(pg);
          // 피부 픽셀 적정 조건 (얼굴 통과 + 책상 거부)
          if(pr>80 && pg>50 && pb>30 && pr>pg && pg>pb && (pr-pg)>=8){
            skinPixCount++;
          }
        }
        if(cnt){
          var r2=rS/cnt,g2=gS/cnt,b2=bS/cnt;
          var mx=Math.max(r2,g2,b2),mn=Math.min(r2,g2,b2);
          var s=mx>0?(mx-mn)/mx:0;
          var l=(mx+mn)/2/255;
          // ★ 피부 픽셀 비율 25% 이상 (적정 수준)
          var skinRatio = skinPixCount / cnt;
          // ★ 평균 RGB 기반 isSkin (원래 + R-G 차이 조건만 추가)
          // 원래 작동하던 조건 + 책상 거부 (R-G 차이만 살짝)
          var isSkin=(r2>60 && g2>40 && b2>20 && r2>g2 && r2>b2 && s>0.1 && s<0.75 && (r2-g2)>=5);
          if(isSkin){
            _rmai.lostCount=0;
            _rmai._samples++;
            var mean=g2; var vr=0;
            vals.forEach(function(v){vr+=Math.pow(v-mean,2);});
            vr=Math.sqrt(vr/vals.length);
            var uni=Math.round(Math.max(30,Math.min(98,100-vr*0.8)));
            var glow=Math.round(Math.max(30,Math.min(98,l*120)));
            var rg=Math.abs(r2-g2);
            var cover=Math.round(Math.max(30,Math.min(98,100-rg*0.6)));
            var moist=Math.round(Math.max(30,Math.min(98,s*150)));
            _rmai.uni=Math.round((_rmai.uni*(_rmai._samples-1)+uni)/_rmai._samples);
            _rmai.glow=Math.round((_rmai.glow*(_rmai._samples-1)+glow)/_rmai._samples);
            _rmai.cover=Math.round((_rmai.cover*(_rmai._samples-1)+cover)/_rmai._samples);
            _rmai.moist=Math.round((_rmai.moist*(_rmai._samples-1)+moist)/_rmai._samples);
            var uniEl=document.getElementById('rmai-uni'); if(uniEl) uniEl.textContent=_rmai.uni;
            var glowEl=document.getElementById('rmai-glow'); if(glowEl) glowEl.textContent=_rmai.glow;
            var coverEl=document.getElementById('rmai-cover'); if(coverEl) coverEl.textContent=_rmai.cover;
            var moistEl=document.getElementById('rmai-moist'); if(moistEl) moistEl.textContent=_rmai.moist;
            var maiNow=Math.round((_rmai.uni+_rmai.glow+_rmai.cover+_rmai.moist)/4);
            if(live) live.textContent='MAI '+maiNow+'점';
            var fs=document.getElementById('rmai-face-status');
            if(fs){ fs.textContent=_cgoT(_aK(12310)); fs.style.color='rgba(244,114,182,.9)'; }
          } else {
            _rmai.lostCount++;
            if(_rmai.lostCount>0){
              var fs=document.getElementById('rmai-face-status');
              if(fs){ fs.textContent=_cgoT(_aK(12311)); fs.style.color='rgba(251,191,36,.8)';
                try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(fs); }catch(e){} }
            }
          }
        }
      }
      if(_rmai.lostCount>=5 && _rmai._samples===0){
        var fs=document.getElementById('rmai-face-status');
        if(fs){ fs.textContent=_cgoT(_aK(12312)); fs.style.color='rgba(248,113,113,.9)'; }
        _rmai.sec=2; _rmai.lostCount=0;
        return;
      }
      if(_rmai.sec>=30){
        clearInterval(_rmai.timer); _rmai.running=false;
        if(_rmai._samples<5){
          var fs2=document.getElementById('rmai-face-status');
          if(fs2){ fs2.textContent=_cgoT(_aK(12313)); fs2.style.color='rgba(251,191,36,.9)'; }
          if(_rmai.stream){_rmai.stream.getTracks().forEach(function(t){t.stop();});}
          var v3=document.getElementById('rmai-video'); if(v3) v3.style.display='none';
          var ph3=document.getElementById('rmai-placeholder'); if(ph3) ph3.style.display='flex';
          var g3=document.getElementById('rmai-guide'); if(g3) g3.style.display='none';
          var b3=document.getElementById('rmai-btn'); if(b3) b3.style.display='block';
          var prg2=document.getElementById('rmai-progress'); if(prg2) prg2.style.width='0%';
          return;
        }
        if(_rmai.stream){_rmai.stream.getTracks().forEach(function(t){t.stop();});}
        var v4=document.getElementById('rmai-video'); if(v4) v4.style.display='none';
        var ph4=document.getElementById('rmai-placeholder'); if(ph4) ph4.style.display='flex';
        var g4=document.getElementById('rmai-guide'); if(g4) g4.style.display='none';
        rmaiShowResult(oh);
        var b4=document.getElementById('rmai-btn'); if(b4) b4.style.display='block';
      }
    },1000);
  }).catch(function(){
    _cgoCameraAlert('카메라가 필요합니다.<br>카메라를 허용해 주세요.');
    var b5=document.getElementById('rmai-btn'); if(b5) b5.style.display='block';
  });
}

function rmaiShowResult(oh){
  var uni=_rmai.uni||65, glow=_rmai.glow||68, cover=_rmai.cover||62, moist=_rmai.moist||70;

  var changeText = '';
  if(_rmaiBeforeData && typeof _maiCalcAvgBrightness === 'function'){
    var beforeAvg = _maiCalcAvgBrightness(_rmaiBeforeData.imageData);
    var afterAvg = (uni + glow) / 2;
    var diffPct = Math.abs(afterAvg - beforeAvg) / 255 * 100;

    if(diffPct < 3){
      var t = document.createElement('div');
      t.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(10,22,40,.97);border:1.5px solid rgba(251,191,36,.5);border-radius:20px;padding:24px 28px;z-index:99999;text-align:center;max-width:300px;width:90%;';
      t.innerHTML = '<div style="font-size:28px;margin-bottom:10px;">⚠️</div>'
        + '<div style="font-size:14px;font-weight:900;color:#fbbf24;margin-bottom:8px;">화장 전후 차이가 없어요!</div>'
        + '<div style="font-size:12px;color:rgba(240,220,255,.8);line-height:1.7;margin-bottom:16px;">메이크업 후 다시 측정해 주세요.<br>Before와 After의 차이가 있어야<br>정확한 분석이 가능합니다 😊</div>'
        + '<button onclick="this.parentNode.remove()" style="padding:10px 24px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border:none;border-radius:10px;color:#000;font-size:13px;font-weight:900;cursor:pointer;">다시 측정하기</button>';
      document.body.appendChild(t);
    /* ★ C-63: 동적 팝업 즉시 번역 */
    try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(t); }catch(e){}
      return;
    }

    var bonus = Math.min(15, Math.round(diffPct * 0.8));
    changeText = '📊 화장 전 대비 +'+bonus+'pt 피부 변화 감지';
    uni = Math.min(100, uni + Math.round(bonus * 0.4));
    glow = Math.min(100, glow + Math.round(bonus * 0.6));
  }

  var mai=Math.round((uni+glow+cover+moist)/4);
  var totalEl=document.getElementById('rmai-total'); if(totalEl) totalEl.textContent=mai;
  var grade=mai>=85?'💫 완벽한 흡수! 오늘 피부 컨디션 최상':mai>=70?'✨ 양호한 흡수 · 촉촉한 베이스 유지':mai>=55?'🌸 보통 흡수 · 수분 보충 권장':'💧 흡수 개선 필요 · 피부 준비 단계 점검';
  if(changeText) grade = grade + '<br><span style="font-size:11px;color:rgba(52,211,153,.8);">'+changeText+'</span>';
  var gradeEl=document.getElementById('rmai-grade');
  if(gradeEl){ gradeEl.textContent=''; gradeEl.innerHTML=grade; }

  var colors=(typeof _maiColors !== 'undefined' && _maiColors[oh]) ? _maiColors[oh] : (typeof _maiColors !== 'undefined' ? _maiColors['토'] : null);
  var ohNames={목:'목(木) — 봄의 생명력',화:'화(火) — 여름의 열정',토:'토(土) — 대지의 안정',금:'금(金) — 가을의 순수',수:'수(水) — 겨울의 깊이'};

  function renderCols(containerId, colorArr, catKey){
    var el=document.getElementById(containerId);
    if(!el || !colorArr) return;
    el.innerHTML=colorArr.map(function(col){
      return '<div onclick="if(typeof rmaiArSetCategory===\'function\')rmaiArSetCategory(\''+catKey+'\');rmaiArApplyColor(\''+col.c+'\',null);if(!_rmaiAr.running) rmaiArStart();" style="display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;">'
        +'<div style="width:36px;height:36px;border-radius:50%;background:'+col.c+';border:2px solid rgba(0,0,0,.08);box-shadow:0 2px 8px rgba(0,0,0,.15);transition:transform .2s;" onmouseover="this.style.transform=\'scale(1.15)\'" onmouseout="this.style.transform=\'scale(1)\'"></div>'
        +'<div style="font-size:8px;color:#888;text-align:center;width:42px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;">'+col.n+'</div>'
        +'</div>';
    }).join('');
  }
  if(colors){
    // ★ 옛날 박지 4개 컬러 그리드 제거 — 600색 라이브러리(_rmaiArInitColorPicker)로 통합
  }

  var ohTextEl=document.getElementById('rmai-oh-text');
  if(ohTextEl){
    ohTextEl.innerHTML='<b style="color:#be185d;">'+ohNames[oh]+'</b> '+_aK(12357)+'<br>'
      +'MAI <b>'+mai+'점</b> 기준, 위 추천 컬러를 활용하면 에너지 공명 지수가 <b style="color:#be185d;">+'+(Math.round((mai-50)*0.15))+'pt</b> 상승합니다.<br>'
      +'피부 균일도 '+uni+'점 · 화사함 '+glow+'점 · 커버율 '+cover+'점 · 촉촉함 '+moist+'점';
  }

  var resEl2=document.getElementById('rmai-result');
  if(resEl2) resEl2.style.display='block';

  // ═══════════════════════════════════════════════════
  // ★ ㊻ FULI Age — 세계 최초 사주 + rPPG + FaceAge 융합
  //   기반: Nature Communications 2026.04.28 (FaceAge / FAR 연구)
  //   우리 식: 4지표 + 사주 가중치 → 추정 생체나이 + 시계열 에이지 리듬
  // ═══════════════════════════════════════════════════
  if(typeof _rmaiCalcFuliAge === 'function'){
    // ★ 정보 입력에서 *출생 연도* 가져와 정확한 만 나이 계산
    var realAge = 35; // fallback
    if(window.calcResult && window.calcResult.y){
      var birthYear = parseInt(window.calcResult.y);
      if(birthYear && birthYear > 1900 && birthYear < 2100){
        var nowYear = new Date().getFullYear();
        realAge = nowYear - birthYear;
      }
    }
    var fuliAgeData = _rmaiCalcFuliAge(realAge, uni, glow, cover, moist, oh, mai);
    _rmaiSaveFuliAgeRecord(fuliAgeData);
    _rmaiRenderFuliAgeCard(fuliAgeData);
  }

  // ★ CGO hook — 분석 결과 알림 (FULI Age 포함)
  if(typeof rmaiChatSay === 'function'){
    rmaiChatSay('analysis-done', {mai:mai, oh:oh, uni:uni, glow:glow, cover:cover, moist:moist});
  }
}

// ═══════════════════════════════════════════════════
// ★ ㊻ FULI Age — 알고리즘 + 시계열 추적 (~150라인)
// ═══════════════════════════════════════════════════

// 일반 한국인 평균 4지표 (연령대별 기준값) — 우리 큐레이션
var _rmaiAgeBaseline = {
  20: { uni:78, glow:75, cover:55, moist:75 },
  30: { uni:72, glow:68, cover:55, moist:65 },
  40: { uni:65, glow:60, cover:55, moist:55 },
  50: { uni:58, glow:53, cover:55, moist:48 },
  60: { uni:50, glow:45, cover:55, moist:40 },
  70: { uni:42, glow:38, cover:55, moist:35 }
};

// 사주 오행 가중치 (목=빠른 에이지 리듬 vs 수=느린 노화)
var _rmaiOhAgeWeight = {목:1.05, 화:1.10, 토:1.00, 금:0.95, 수:0.92};

// 보간 함수 — 정확한 나이의 baseline 산출
function _rmaiInterpolateBaseline(age){
  var ages = [20,30,40,50,60,70];
  if(age <= 20) return _rmaiAgeBaseline[20];
  if(age >= 70) return _rmaiAgeBaseline[70];
  for(var i=0; i<ages.length-1; i++){
    if(age >= ages[i] && age < ages[i+1]){
      var t = (age - ages[i]) / 10;
      var b1 = _rmaiAgeBaseline[ages[i]];
      var b2 = _rmaiAgeBaseline[ages[i+1]];
      return {
        uni:   Math.round(b1.uni   + (b2.uni   - b1.uni)   * t),
        glow:  Math.round(b1.glow  + (b2.glow  - b1.glow)  * t),
        cover: Math.round(b1.cover + (b2.cover - b1.cover) * t),
        moist: Math.round(b1.moist + (b2.moist - b1.moist) * t)
      };
    }
  }
  return _rmaiAgeBaseline[40];
}

// ★ FULI Age 계산 — 4지표 + 사주 → 추정 생체나이
window._rmaiCalcFuliAge = function(realAge, uni, glow, cover, moist, oh, mai){
  // 1. 실제 나이 baseline
  var base = _rmaiInterpolateBaseline(realAge);
  // 2. 측정값 vs baseline 편차 (양수=젊어 보임, 음수=늙어 보임)
  var diffUni   = uni   - base.uni;
  var diffGlow  = glow  - base.glow;
  var diffMoist = moist - base.moist;
  // cover는 보정 — 화장에 따른 차이라 가중치 작게
  // 가중치: 화사함 > 촉촉함 > 균일도 (노화 가장 잘 드러나는 순)
  var diffScore = (diffGlow * 0.40 + diffMoist * 0.35 + diffUni * 0.25);
  // 3. 점수 → 나이 편차 (10점 = 약 5살)
  var ageDelta = -diffScore / 2;
  // 4. 사주 가중치 적용
  var ohW = _rmaiOhAgeWeight[oh] || 1.0;
  ageDelta = ageDelta * ohW;
  // 5. FULI Age = 실제 나이 + 편차
  var fuliAge = Math.round((realAge + ageDelta) * 10) / 10;
  // 6. FAD (안면 연령 편차) — 양수=빨리 노화, 음수=느린 노화
  var fad = Math.round(ageDelta * 10) / 10;

  return {
    realAge: realAge,
    fuliAge: fuliAge,
    fad: fad,
    oh: oh,
    mai: mai,
    indicators: { uni:uni, glow:glow, cover:cover, moist:moist },
    baseline: base,
    timestamp: Date.now(),
    date: new Date().toISOString().slice(0,10)
  };
};

// ★ 시계열 저장 (localStorage)
window._rmaiSaveFuliAgeRecord = function(data){
  try {
    var key = 'cgo_fuli_age_history';
    var raw = localStorage.getItem(key);
    var arr = raw ? JSON.parse(raw) : [];
    arr.push({
      ts: data.timestamp,
      date: data.date,
      age: data.fuliAge,
      fad: data.fad,
      mai: data.mai,
      oh: data.oh,
      uni: data.indicators.uni,
      glow: data.indicators.glow,
      cover: data.indicators.cover,
      moist: data.indicators.moist
    });
    // 최근 100개만 보관
    if(arr.length > 100) arr = arr.slice(-100);
    localStorage.setItem(key, JSON.stringify(arr));
  } catch(e){ console.warn('[FULI Age] storage fail:', e); }
};

// ★ FAR 계산 — 시계열 측정 → 에이지 리듬 (실시간 vs 평균)
window._rmaiCalcFAR = function(){
  try {
    var raw = localStorage.getItem('cgo_fuli_age_history');
    if(!raw) return null;
    var arr = JSON.parse(raw);
    if(arr.length < 2) return { count: arr.length, far: null, message: '시계열 추적 시작 — 다음 측정 시 에이지 리듬 산출' };

    // 첫 측정 vs 최신 측정
    var first = arr[0];
    var latest = arr[arr.length - 1];
    var daysDiff = (latest.ts - first.ts) / (1000 * 60 * 60 * 24);
    if(daysDiff < 1) daysDiff = 1; // 같은 날 측정 보호

    var ageDiff = latest.age - first.age;
    // FAR = 1년당 추가 노화 (실제 1년 = 1살. 우리 추정이 더 빠르면 +)
    var farPerYear = (ageDiff / daysDiff) * 365;
    var farPercent = Math.round((farPerYear / 1) * 100); // 1.4 → 140% (40% 빠름)

    return {
      count: arr.length,
      first: first,
      latest: latest,
      daysDiff: Math.round(daysDiff * 10) / 10,
      ageDiff: Math.round(ageDiff * 10) / 10,
      farPerYear: Math.round(farPerYear * 100) / 100,
      farPercent: farPercent,
      message: ageDiff > 0
        ? '에이지 리듬 ' + farPercent + '% (일반 100% 기준)'
        : '에이지 리듬 안정적 — 좋은 추세'
    };
  } catch(e){ return null; }
};

// ★ FULI Age 결과 카드 렌더링
window._rmaiRenderFuliAgeCard = function(data){
  var container = document.getElementById('rmai-fuli-age-card');
  if(!container){
    // 카드 없으면 새로 박제 (rmai-result 안에)
    var resultArea = document.getElementById('rmai-result');
    if(!resultArea) return;
    container = document.createElement('div');
    container.id = 'rmai-fuli-age-card';
    container.style.cssText = 'background:linear-gradient(135deg,#0a1428,#1e1b4b);border:1px solid rgba(168,85,247,.4);border-radius:16px;padding:16px 18px;margin-top:14px;color:#fff;';
    resultArea.appendChild(container);
  }

  var fad = data.fad;
  var fadColor = fad > 3 ? '#f87171' : fad > 0 ? '#fbbf24' : fad > -3 ? '#86efac' : '#60a5fa';
  var fadIcon = fad > 3 ? '⚠️' : fad > 0 ? '⏳' : fad > -3 ? '✨' : '💎';
  var fadLabel = fad > 3 ? '노화 가속' : fad > 0 ? '평균 약간 빠름' : fad > -3 ? '평균 수준' : '젊음 유지';

  var far = _rmaiCalcFAR();
  var farHtml = '';
  if(far){
    if(far.count < 2){
      farHtml = '<div style="margin-top:10px;padding:8px 10px;background:rgba(255,255,255,.04);border-radius:8px;font-size:10px;color:rgba(255,255,255,.5);">📈 '+far.message+'</div>';
    } else {
      var farColor = far.farPercent > 130 ? '#f87171' : far.farPercent > 105 ? '#fbbf24' : far.farPercent > 90 ? '#86efac' : '#60a5fa';
      farHtml = '<div style="margin-top:10px;padding:10px 12px;background:rgba(168,85,247,.08);border:1px solid rgba(168,85,247,.2);border-radius:10px;">'
        + '<div style="font-size:9px;font-weight:800;color:#a78bfa;letter-spacing:.06em;margin-bottom:6px;">📈 FAR · 안면 에이지 리듬 (시계열 '+far.count+'회)</div>'
        + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">'
        +   '<span style="font-size:11px;color:rgba(255,255,255,.7);">'+far.daysDiff+'일간 추적 결과</span>'
        +   '<span style="font-size:14px;font-weight:900;color:'+farColor+';">'+far.farPercent+'%</span>'
        + '</div>'
        + '<div style="font-size:10px;color:rgba(255,255,255,.55);">'+far.message+'</div>'
        + '</div>';
    }
  }

  container.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">'
    +   '<div>'
    +     '<div style="font-size:9px;font-weight:800;color:#a78bfa;letter-spacing:.18em;">WORLD FIRST · FULI AGE</div>'
    +     '<div style="font-size:13px;font-weight:900;color:#fff;margin-top:2px;">에이지 리듬 + 사주 융합 분석</div>'
    +   '</div>'
    +   '<span style="font-size:10px;color:rgba(168,85,247,.7);background:rgba(168,85,247,.1);padding:3px 8px;border-radius:6px;">Nature 2026 응용</span>'
    + '</div>'
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">'
    +   '<div style="padding:12px;background:rgba(255,255,255,.05);border-radius:10px;">'
    +     '<div style="font-size:9px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:2px;">실제 나이</div>'
    +     '<div style="font-size:24px;font-weight:900;color:#fff;">'+data.realAge+'<span style="font-size:11px;font-weight:600;color:rgba(255,255,255,.5);"> 세</span></div>'
    +   '</div>'
    +   '<div style="padding:12px;background:rgba(168,85,247,.1);border:1px solid rgba(168,85,247,.3);border-radius:10px;">'
    +     '<div style="font-size:9px;font-weight:700;color:#a78bfa;margin-bottom:2px;">FULI Age (추정)</div>'
    +     '<div style="font-size:24px;font-weight:900;color:#fff;">'+data.fuliAge+'<span style="font-size:11px;font-weight:600;color:rgba(255,255,255,.5);"> 세</span></div>'
    +   '</div>'
    + '</div>'
    + '<div style="padding:10px 12px;background:rgba(255,255,255,.03);border-left:3px solid '+fadColor+';border-radius:8px;">'
    +   '<div style="display:flex;justify-content:space-between;align-items:center;">'
    +     '<span style="font-size:10px;font-weight:800;color:rgba(255,255,255,.6);">FAD · 안면 연령 편차</span>'
    +     '<span style="font-size:14px;font-weight:900;color:'+fadColor+';">'+fadIcon+' '+(fad>0?'+':'')+fad+'</span>'
    +   '</div>'
    +   '<div style="font-size:9px;color:rgba(255,255,255,.5);margin-top:2px;">'+fadLabel+'</div>'
    + '</div>'
    + farHtml
    + '<div style="margin-top:10px;padding:8px 10px;background:rgba(248,113,113,.05);border:1px solid rgba(248,113,113,.15);border-radius:8px;">'
    +   '<div style="font-size:8px;font-weight:800;color:#f87171;margin-bottom:2px;">📌 정직 안내</div>'
    +   '<div style="font-size:9px;color:rgba(255,255,255,.5);line-height:1.6;">참고 자료입니다. 의료 진단 X. 매일 측정 시 시계열 에이지 리듬(FAR)을 추적할 수 있습니다.</div>'
    + '</div>';
};

// ═══════════════════════════════════════════════════
// ★ rmaiArStart — AR 메이크업 시작 (FaceMesh 468)
// ═══════════════════════════════════════════════════
window.rmaiArStart = function(){
  if(_rmaiAr.running){ return; }
  cgoCameraCheck(function(){
    _rmaiArStartCore();
  });
};

function _rmaiArStartCore(){
  // ★ AR 영역 활성화 (display:none → block) + 스크롤 + 시작 버튼 숨김
  var arSection = document.getElementById('rmai-ar-section');
  if(arSection){
    arSection.style.display = 'block';
    setTimeout(function(){ arSection.scrollIntoView({behavior:'smooth', block:'start'}); }, 100);
  }
  var arStartBtn = document.getElementById('rmai-ar-start-btn');
  if(arStartBtn) arStartBtn.style.display = 'none';

  var video = document.getElementById('rmai-ar-video');
  var canvas = document.getElementById('rmai-ar-canvas');
  var placeholder = document.getElementById('rmai-ar-placeholder');
  var status = document.getElementById('rmai-ar-status');
  var stopBtn = document.getElementById('rmai-ar-stop-btn');

  if(!video || !canvas){
    alert(_aK(12314));
    return;
  }

  // 색 picker 자동 박제
  _rmaiArInitColorPicker();

  // 카메라 스트림
  navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:640,height:480}})
    .then(function(stream){
      _rmaiAr.stream = stream;
      _rmaiAr.video = video;
      _rmaiAr.canvas = canvas;
      _rmaiAr.ctx = canvas.getContext('2d', { willReadFrequently: true });

      video.srcObject = stream;
      video.style.display = 'block';
      canvas.style.display = 'block';
      if(placeholder) placeholder.style.display = 'none';
      if(status){
        status.style.display = 'block';
        status.textContent = _cgoT(_aK(12315));
        status.style.background = 'rgba(0,0,0,.65)';
      }
      if(stopBtn) stopBtn.style.display = 'block';

      video.onloadedmetadata = function(){
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        _rmaiArInitFaceMesh();
      };
    })
    .catch(function(err){
      _cgoCameraAlert('AR 카메라를 열 수 없습니다.<br>'+(err && err.message?err.message:''));
    });
}

function _rmaiArInitFaceMesh(retryCount){
  retryCount = retryCount || 0;
  var status = document.getElementById('rmai-ar-status');

  // FaceMesh 라이브러리 체크 (재시도 + 동적 CDN 로드)
  if(typeof FaceMesh === 'undefined'){
    // 첫 시도에 CDN script를 *동적으로 추가* (페이지 로드 시 안 된 경우 대비)
    if(retryCount === 0 && !document.querySelector('script[data-rmai-facemesh]')){
      if(status){ status.textContent = _cgoT(_aK(12316)); status.style.background = 'rgba(251,191,36,.85)'; }
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js';
      s.setAttribute('data-rmai-facemesh', '1');
      s.crossOrigin = 'anonymous';
      document.head.appendChild(s);
    }

    if(retryCount < 60){ // 6초 (100ms × 60) 까지 재시도
      if(status && retryCount % 5 === 0){
        var dots = '.'.repeat((retryCount/5) % 4 + 1);
        status.textContent = _cgoT(_aK(12317))+dots;
      }
      setTimeout(function(){ _rmaiArInitFaceMesh(retryCount + 1); }, 100);
      return;
    }

    // 6초 후에도 미로드 → 명시적 에러
    if(status){
      status.textContent = _cgoT(_aK(12318));
      status.style.background = 'rgba(239,68,68,.85)';
    }
    console.error('[rmaiAr] FaceMesh CDN load timeout (6s)');
    return;
  }

  // FaceMesh 로드 OK → 초기화
  try {
    _rmaiAr.faceMesh = new FaceMesh({
      locateFile: function(file){
        return 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/'+file;
      }
    });

    _rmaiAr.faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    _rmaiAr.faceMesh.onResults(_rmaiArOnResults);

    if(status){
      status.textContent = _cgoT(_aK(12319));
      status.style.background = 'rgba(34,197,94,.85)';
    }

    _rmaiAr.running = true;
    _rmaiAr.frameCount = 0;
    _rmaiArProcessFrame();

    // ★ CGO hook — AR 시작 알림
    if(typeof rmaiChatSay === 'function') rmaiChatSay('ar-started');
  } catch(e){
    if(status){
      status.textContent = _cgoT(_aK(12320));
      status.style.background = 'rgba(239,68,68,.85)';
    }
    console.error('[rmaiAr] FaceMesh init error:', e);
  }
}

function _rmaiArProcessFrame(){
  if(!_rmaiAr.running) return;
  if(!_rmaiAr.video || _rmaiAr.video.readyState < 2){
    requestAnimationFrame(_rmaiArProcessFrame);
    return;
  }

  try {
    _rmaiAr.faceMesh.send({image: _rmaiAr.video}).then(function(){
      if(_rmaiAr.running) requestAnimationFrame(_rmaiArProcessFrame);
    }).catch(function(err){
      console.error('[rmaiAr] frame error:', err);
      if(_rmaiAr.running) requestAnimationFrame(_rmaiArProcessFrame);
    });
  } catch(e){
    console.error('[rmaiAr] send error:', e);
    if(_rmaiAr.running) requestAnimationFrame(_rmaiArProcessFrame);
  }
}


/* ════ AR 메이크업 HSL·물광·글로우 (메신저 이식) ════ */


function ensureRmaiInit(){
    if(typeof _rmaiAr === 'undefined'){ setTimeout(ensureRmaiInit, 300); return; }

    // ★ 메신저는 명품(luxury) 카드 모드 기본 — 오행은 보너스 토글
    if(!_rmaiAr.cardMode) _rmaiAr.cardMode = 'luxury';
    if(!_rmaiAr.cardExpanded) _rmaiAr.cardExpanded = {oheng:false, daily:false, luxury:true};
    if(!_rmaiAr.glossLevel) _rmaiAr.glossLevel = 0;

    console.log('[c42] _rmaiAr 초기화 보강:', _rmaiAr.cardMode, _rmaiAr.currentPalette);
  }
function hslToHex(h, s, l){
    s /= 100; l /= 100;
    var c = (1 - Math.abs(2*l-1)) * s;
    var x = c * (1 - Math.abs((h/60)%2 - 1));
    var m = l - c/2;
    var r, g, b;
    if(h<60){ r=c; g=x; b=0; }
    else if(h<120){ r=x; g=c; b=0; }
    else if(h<180){ r=0; g=c; b=x; }
    else if(h<240){ r=0; g=x; b=c; }
    else if(h<300){ r=x; g=0; b=c; }
    else { r=c; g=0; b=x; }
    var toHex = function(v){ return ('0'+Math.round((v+m)*255).toString(16)).slice(-2); };
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }
makeupApplyHslColor = function(){
    var hex = document.getElementById('svi-hsl-hex-m').textContent;
    if(typeof window.rmaiArApplyColor === 'function'){
      window.rmaiArApplyColor(hex, null);
    }
  }
makeupUpdateGloss = function(){
    var v = +document.getElementById('svi-gloss-bar-m').value;
    document.getElementById('svi-gloss-val-m').textContent = v + '%';
    if(typeof _rmaiAr !== 'undefined'){
      _rmaiAr.glossLevel = v / 100;
    }
  }
makeupUpdateHsl = function(){
    var h = +document.getElementById('svi-hue-bar-m').value;
    var s = +document.getElementById('svi-sat-bar-m').value;
    var l = +document.getElementById('svi-light-bar-m').value;
    document.getElementById('svi-hue-val-m').textContent = h + '°';
    document.getElementById('svi-sat-val-m').textContent = s + '%';
    document.getElementById('svi-light-val-m').textContent = l + '%';
    // HSL → HEX
    var hex = hslToHex(h, s, l);
    document.getElementById('svi-hsl-preview-m').style.background = hex;
    document.getElementById('svi-hsl-hex-m').textContent = hex.toUpperCase();
  }
syncSlidersToCategory = function(catKey){
    if(typeof _rmaiAr === 'undefined') return;
    catKey = catKey || _rmaiAr.currentCategory || 'base';

    // 물광 슬라이더 값 갱신
    var glossBar = document.getElementById('svi-gloss-bar-m');
    var glossVal = document.getElementById('svi-gloss-val-m');
    if(glossBar && _rmaiAr.glossByCategory){
      var g = Math.round((_rmaiAr.glossByCategory[catKey] || 0) * 100);
      glossBar.value = g;
      if(glossVal) glossVal.textContent = g + '%';
      // 현재 카테고리 표시 라벨 추가
      _rmaiAr.glossLevel = _rmaiAr.glossByCategory[catKey];
    }

    // HSL 슬라이더 값 갱신
    var hueBar = document.getElementById('svi-hue-bar-m');
    var satBar = document.getElementById('svi-sat-bar-m');
    var lightBar = document.getElementById('svi-light-bar-m');
    if(hueBar && _rmaiAr.hslByCategory){
      var hsl = _rmaiAr.hslByCategory[catKey] || {h:0, s:80, l:50};
      hueBar.value = hsl.h;
      satBar.value = hsl.s;
      lightBar.value = hsl.l;
      document.getElementById('svi-hue-val-m').textContent = hsl.h + '°';
      document.getElementById('svi-sat-val-m').textContent = hsl.s + '%';
      document.getElementById('svi-light-val-m').textContent = hsl.l + '%';
      // 미리보기 갱신
      if(typeof window.makeupUpdateHsl === 'function') window.makeupUpdateHsl();
    }

    // 화장 강도 슬라이더 값 갱신 (핀셋 수정 — 카테고리별 보존)
    var intBar = document.getElementById('svi-intensity-bar-m');
    var intVal = document.getElementById('svi-intensity-val-m');
    if(intBar && _rmaiAr.intensity){
      var iv = Math.round((_rmaiAr.intensity[catKey] || 0.5) * 100);
      intBar.value = iv;
      if(intVal) intVal.textContent = iv + '%';
    }
  }
toHex = function(v){ return ('0'+Math.round((v+m)*255).toString(16)).slice(-2); }
function wrapRmaiStart(){
    if(typeof window.rmaiArStart !== 'function'){ setTimeout(wrapRmaiStart, 300); return; }
    if(window._rmaiArStartWrapped) return;
    var orig = window.rmaiArStart;
    window.rmaiArStart = function(){
      orig.apply(this, arguments);
      setTimeout(tryFresnelHook, 1000);
    };
    window._rmaiArStartWrapped = true;
    console.log('[c42] rmaiArStart wrapped — 시작 후 물광 자동 hook');
  }
try{window.ensureRmaiInit=ensureRmaiInit;}catch(e){}
try{window.hslToHex=hslToHex;}catch(e){}
try{window.makeupApplyHslColor=makeupApplyHslColor;}catch(e){}
try{window.makeupUpdateGloss=makeupUpdateGloss;}catch(e){}
try{window.makeupUpdateHsl=makeupUpdateHsl;}catch(e){}
try{window.syncSlidersToCategory=syncSlidersToCategory;}catch(e){}
try{window.toHex=toHex;}catch(e){}
try{window.wrapRmaiStart=wrapRmaiStart;}catch(e){}


/* ══ 물광 Fresnel 워터글로우 본체 (메신저 이식) ══ */
if(!window._fresnelT0){ window._fresnelT0 = Date.now()/1000; }
window.drawFresnelWaterGlow = function(ctx, canvas, landmarks, glossLevel){
    if(!ctx || !canvas || !landmarks || glossLevel <= 0) return;

    // ─── BS 측정값 → 셰이더 uniform 변수 ───
    var bpm = (typeof BS !== 'undefined' && BS.bpm) ? BS.bpm : 75;
    var hrv = (typeof BS !== 'undefined' && BS.hrv) ? BS.hrv : 40;
    var bpmHz = bpm / 60;
    var t = (Date.now() / 1000) - window._fresnelT0;
    var pulse = 0.95 + 0.05 * Math.sin(2 * Math.PI * (bpmHz/2.5) * t);  // ★ 진폭 0.05 (3배↓) + 주기 2.5배↓ — 깜박깜박 제거
    var glossiness = 0.4 + Math.min(1, hrv / 80) * 0.6;

    // ═══ MediaPipe FaceMesh 얼굴 윤곽 36점 (FACE_OVAL) ═══
    var FACE_OVAL = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288,
                     397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136,
                     172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109];

    ctx.save();

    // ─── ① 얼굴 영역 클리핑 (배경에 광 새지 않게) ───
    ctx.beginPath();
    var first = true;
    for(var i=0; i<FACE_OVAL.length; i++){
      var lmO = landmarks[FACE_OVAL[i]];
      if(!lmO) continue;
      var ox = lmO.x * canvas.width;
      var oy = lmO.y * canvas.height;
      if(first){ ctx.moveTo(ox, oy); first = false; }
      else ctx.lineTo(ox, oy);
    }
    ctx.closePath();
    ctx.clip();

    // ─── ② 얼굴 전체 큰 radial grad (부드러운 광택 베이스) ───
    //   박입 87 — A) 피부톤 샘플링 후 그 색 + 밝기 ↑ (옐로 베이스 보정)
    //          B) screen → soft-light (어두운 부위 보호)
    //          D) 강도 ↓ (0.32 → 0.18)
    //
    // 피부톤 샘플링: 코 양옆 + 볼 중심 RGB 평균 → 살색 보존
    var skinTone = (function(){
      // 캐시 (10프레임마다 갱신)
      if(!window._skinSampleCache) window._skinSampleCache = {ts:0, color:null};
      var now = Date.now();
      if(window._skinSampleCache.color && now - window._skinSampleCache.ts < 333){
        return window._skinSampleCache.color;
      }
      try{
        // 코 옆 + 볼 중심 4점 픽셀 샘플링
        var samplePoints = [landmarks[50], landmarks[280], landmarks[117], landmarks[346]];
        var rSum=0, gSum=0, bSum=0, n=0;
        for(var sp=0; sp<samplePoints.length; sp++){
          var pt = samplePoints[sp];
          if(!pt) continue;
          var px = Math.round(pt.x * canvas.width);
          var py = Math.round(pt.y * canvas.height);
          if(px<0 || py<0 || px>=canvas.width || py>=canvas.height) continue;
          var pix = ctx.getImageData(px, py, 1, 1).data;
          rSum += pix[0]; gSum += pix[1]; bSum += pix[2]; n++;
        }
        if(n === 0) return {r:255, g:240, b:220};  // 기본 살색
        // 평균 + 밝기 1.2배 (광택 표현)
        var r = Math.min(255, Math.round(rSum/n * 1.18));
        var g = Math.min(255, Math.round(gSum/n * 1.15));
        var b = Math.min(255, Math.round(bSum/n * 1.10));
        var c = {r:r, g:g, b:b};
        window._skinSampleCache = {ts:now, color:c};
        return c;
      } catch(e){
        return {r:255, g:240, b:220};
      }
    })();
    var skinColor = skinTone.r + ',' + skinTone.g + ',' + skinTone.b;

    ctx.globalCompositeOperation = 'soft-light';  // ★ 박입 87B — screen → soft-light
    var noseCenter = landmarks[1];
    var foreheadTop = landmarks[10];
    var chinBottom = landmarks[152];
    if(noseCenter && foreheadTop && chinBottom){
      var cx = noseCenter.x * canvas.width;
      var cy = noseCenter.y * canvas.height;
      var faceH = Math.abs((chinBottom.y - foreheadTop.y) * canvas.height);
      var baseAlpha = glossLevel * glossiness * pulse * 0.18;  // ★ 박입 87D — 0.32 → 0.18
      var gradBase = ctx.createRadialGradient(cx, cy*0.92, 0, cx, cy, faceH * 0.75);
      gradBase.addColorStop(0,    'rgba(' + skinColor + ',' + baseAlpha + ')');
      gradBase.addColorStop(0.45, 'rgba(' + skinColor + ',' + (baseAlpha*0.55) + ')');
      gradBase.addColorStop(1,    'rgba(' + skinColor + ',0)');
      ctx.fillStyle = gradBase;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // ─── ③ 12 핵심 highlight (N·V 프레넬 cross product) ───
    //   박입 87 — composite 'screen' 으로 highlight 만 살림 (베이스는 soft-light)
    ctx.globalCompositeOperation = 'screen';
    var glowAreas = [
      {c: 117, n1: 50,  n2: 187, r: 48},   // 좌측 광대
      {c: 346, n1: 280, n2: 411, r: 48},   // 우측 광대
      {c: 50,  n1: 117, n2: 36,  r: 36},   // 광대-볼 좌
      {c: 280, n1: 346, n2: 266, r: 36},   // 광대-볼 우
      {c: 6,   n1: 197, n2: 4,   r: 30},   // 콧대 중
      {c: 4,   n1: 1,   n2: 19,  r: 24},   // 코끝
      {c: 10,  n1: 338, n2: 109, r: 40},   // 이마 중앙
      {c: 67,  n1: 109, n2: 103, r: 30},   // 이마 좌
      {c: 297, n1: 338, n2: 332, r: 30},   // 이마 우
      {c: 0,   n1: 13,  n2: 17,  r: 24},   // 윗입술
      {c: 17,  n1: 314, n2: 84,  r: 22},   // 아랫입술
      {c: 175, n1: 152, n2: 199, r: 28}    // 턱 중앙
    ];

    glowAreas.forEach(function(area){
      var p0 = landmarks[area.c];
      var p1 = landmarks[area.n1];
      var p2 = landmarks[area.n2];
      if(!p0 || !p1 || !p2) return;

      // Cross product 법선
      var v1x = p1.x - p0.x, v1y = p1.y - p0.y, v1z = (p1.z || 0) - (p0.z || 0);
      var v2x = p2.x - p0.x, v2y = p2.y - p0.y, v2z = (p2.z || 0) - (p0.z || 0);
      var nx = v1y * v2z - v1z * v2y;
      var ny = v1z * v2x - v1x * v2z;
      var nz = v1x * v2y - v1y * v2x;
      var len = Math.sqrt(nx*nx + ny*ny + nz*nz);
      if(len < 0.0001) return;
      var Nz = Math.abs(nz / len);

      // 프레넬 pow(1-N·V, 3)
      var fresnel = Math.pow(1.0 - Nz, 3.0);
      var intensity = fresnel * glossiness * pulse * glossLevel;
      var alpha = Math.min(1, intensity * 0.7);  // ★ 박입 87D — 1.6 → 0.7
      if(alpha < 0.015) return;

      var x = p0.x * canvas.width;
      var y = p0.y * canvas.height;
      var grad = ctx.createRadialGradient(x, y, 0, x, y, area.r);
      // ★ 박입 87A — 중심은 살색-밝게, 가장자리는 살색-자연
      grad.addColorStop(0,    'rgba(255,253,247,' + alpha + ')');
      grad.addColorStop(0.45, 'rgba(' + skinColor + ',' + (alpha*0.5) + ')');
      grad.addColorStop(1,    'rgba(' + skinColor + ',0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, area.r, 0, Math.PI*2);
      ctx.fill();
    });

    ctx.restore();
  }
try{window.drawFresnelWaterGlow=window.drawFresnelWaterGlow;}catch(e){}

/* ★ C-63 청구항 2 — 제2영역(이마) 광학 신호 추출 + 명세서 파이프라인
   명세서 준거: 색차 정규화(CHROM) → 대역통과(0.7~3Hz 버터워스) → BPM/HRV
   _c24 전역과 섞이지 않도록 AR 전용 독립 상태(_rmaiSig)를 사용한다. */
window._rmaiSig = {
  rawR:[], rawG:[], rawB:[], prevR:0, prevG:0, lumaEMA:0,
  bpB:[0.19701, 0, -0.19701],          /* 명세서 청구항 7 계수 */
  bpA:[1, -1.53077, 0.60556],
  bpZ:[0,0], sig:[], t0:0, bpm:0, hrv:0
};
function _rmaiSigFilter(x){
  var S=window._rmaiSig, b=S.bpB, a=S.bpA, z=S.bpZ;
  var w = x - a[1]*z[0] - a[2]*z[1];
  var y = b[0]*w + b[2]*z[1];
  z[1]=z[0]; z[0]=w;
  return y;
}
function _rmaiArSampleRppg(ctx, canvas, landmarks){
  var S = window._rmaiSig;
  if(!S.t0) S.t0 = performance.now();

  /* 제2영역: 이마 중심 (미간 위) — 랜드마크 9(미간), 10(정수리쪽), 151(미간 위) */
  var p9 = landmarks[9], p10 = landmarks[10], p151 = landmarks[151];
  var pl = landmarks[234], pr = landmarks[454];   /* 얼굴 폭 */
  if(!(p9 && p10 && p151 && pl && pr)) return;

  var W = canvas.width, H = canvas.height;
  var faceW = Math.abs(pr.x - pl.x) * W;
  if(faceW < 40) return;                           /* 명세서 110-i(a): 너무 작으면 무효 */

  var cx = p9.x * W;
  var browY = p151.y * H, topY = p10.y * H;
  var fH = Math.abs(browY - topY);
  if(fH < 6) return;

  var rw = faceW * 0.34, rh = fH * 0.5;
  var rx = cx - rw/2, ry = browY - fH*0.82;
  rx = Math.max(0, Math.min(rx, W-4)); ry = Math.max(0, Math.min(ry, H-4));
  rw = Math.max(4, Math.min(rw, W-rx)); rh = Math.max(4, Math.min(rh, H-ry));

  /* 아직 색을 칠하기 전 → 순수 광학 신호 */
  var img;
  try{ img = ctx.getImageData(rx|0, ry|0, rw|0, rh|0); }catch(e){ return; }
  var d = img.data, rS=0, gS=0, bS=0, n=0;
  for(var i=0; i<d.length; i+=4){
    var r=d[i], g=d[i+1], b=d[i+2];
    /* 피부 화소만 (명세서: R>G, G>B, 밝기 범위) */
    if(!(r>g && g>b && (r-g)>10)) continue;
    var br=(r+g+b)/3; if(br<60 || br>245) continue;
    rS+=r; gS+=g; bS+=b; n++;
  }
  if(n < 30) return;                               /* 명세서 청구항 8: 화소 부족 시 중단 */
  var R=rS/n, G=gS/n, B=bS/n;

  /* ① 환경(조명) 정규화 — luma EMA */
  var lum = 0.299*R + 0.587*G + 0.114*B;
  if(lum > 1){
    if(!S.lumaEMA) S.lumaEMA = lum;
    else S.lumaEMA = S.lumaEMA*0.97 + lum*0.03;
    var k = S.lumaEMA / lum;
    if(k>0.5 && k<2.0){ R*=k; G*=k; B*=k; }
  }

  S.rawR.push(R); S.rawG.push(G); S.rawB.push(B);
  var len = S.rawR.length;
  if(len < 2) return;
  var wSize = Math.min(len, 30);
  var rSl=S.rawR.slice(-wSize), gSl=S.rawG.slice(-wSize), bSl=S.rawB.slice(-wSize);
  function mean(a){ var t=0; for(var i2=0;i2<a.length;i2++) t+=a[i2]; return t/a.length; }
  function std(a){ var m=mean(a),t=0; for(var i2=0;i2<a.length;i2++){var dd=a[i2]-m; t+=dd*dd;} return Math.sqrt(t/a.length)||0.0001; }
  var rM=mean(rSl), gM=mean(gSl), bM=mean(bSl);
  if(rM<1||gM<1||bM<1) return;

  /* ④ 동작 잡음 게이트 (명세서 110-i(d)) */
  if(S.prevR>0 && (Math.abs(R-S.prevR)/rM > 0.15 || Math.abs(G-S.prevG)/gM > 0.15)){
    S.prevR=R; S.prevG=G; return;
  }
  S.prevR=R; S.prevG=G;

  /* ② 색차 정규화 (명세서 청구항 7: CHROM) */
  var xs=[], ys=[];
  for(var i3=0;i3<wSize;i3++){
    xs.push(3*(rSl[i3]/rM) - 2*(gSl[i3]/gM));
    ys.push(1.5*(rSl[i3]/rM) + (gSl[i3]/gM) - 1.5*(bSl[i3]/bM));
  }
  var alpha = std(xs)/std(ys);
  var Xs = 3*(R/rM) - 2*(G/gM);
  var Ys = 1.5*(R/rM) + (G/gM) - 1.5*(B/bM);

  /* ③ 대역통과 (명세서 청구항 7: 0.7~3Hz 버터워스) */
  var sig = _rmaiSigFilter(Xs - alpha*Ys);
  S.sig.push({ t:(performance.now()-S.t0)/1000, x:sig });
  if(S.sig.length > 900) S.sig.shift();
  if(S.rawR.length > 900){ S.rawR.shift(); S.rawG.shift(); S.rawB.shift(); }

  /* BPM/HRV — 3초 이상 누적 시, 1초마다 갱신 */
  if(S.sig.length >= 90 && S.sig.length % 30 === 0){
    var v = _rmaiCalcVitals();
    if(v){ S.bpm = v.bpm; S.hrv = v.hrv; _rmaiArUpdateVitalsUI(v); }
  }
  /* 제2영역 시각 표시 (측정 중 표식) */
  _rmaiAr._rppgBox = { x:rx, y:ry, w:rw, h:rh };
}
function _rmaiCalcVitals(){
  var S=window._rmaiSig, arr=S.sig.slice(-300);
  if(arr.length < 90) return null;
  var xs=arr.map(function(o){return o.x;});
  var m=0; for(var i=0;i<xs.length;i++) m+=xs[i]; m/=xs.length;
  var det=xs.map(function(v){return v-m;});
  var sd=0; for(var i2=0;i2<det.length;i2++) sd+=det[i2]*det[i2];
  sd=Math.sqrt(sd/det.length)||0.0001;
  var thr=sd*0.3, minGap=0.33, last=-1, WIN=3, peaks=[];
  for(var i3=WIN;i3<det.length-WIN;i3++){
    if(det[i3] < thr) continue;
    var ok=true;
    for(var w=1;w<=WIN;w++){ if(det[i3]<det[i3-w] || det[i3]<det[i3+w]){ ok=false; break; } }
    if(!ok) continue;
    var pt=arr[i3].t;
    if(pt-last < minGap) continue;
    peaks.push(pt); last=pt;
  }
  if(peaks.length < 2) return null;
  var iv=[]; for(var i4=1;i4<peaks.length;i4++) iv.push((peaks[i4]-peaks[i4-1])*1000);
  var avg=0; for(var i5=0;i5<iv.length;i5++) avg+=iv[i5]; avg/=iv.length;
  var bpm = avg>0 ? 60000/avg : 0;
  // ★ 특허 스펙트럼 BPM 융합
  if(bpm > 0 && window._cgoSpectrumBPM){
    var _spec = _cgoSpectrumBPM(det, 30);
    if(_spec && _spec.snr > 1.5 && _spec.bpm >= 40 && _spec.bpm <= 180){
      bpm = Math.round(_spec.bpm*0.6 + bpm*0.4);
    }
  }
  if(bpm<40 || bpm>180) return null;                /* 정직 가드 */
  var hrv=0;
  if(iv.length>2){
    var t=0; for(var i6=1;i6<iv.length;i6++){ var dd=iv[i6]-iv[i6-1]; t+=dd*dd; }
    hrv=Math.sqrt(t/(iv.length-1));
    if(hrv<2 || hrv>300) hrv=0;
  }
  // ★ 특허 스펙트럼 LF/HF (자율신경 균형)
  if(hrv > 0 && window._cgoSpectrumLFHF){
    var _hs = _cgoSpectrumLFHF(iv);
    if(_hs && window._rmai) window._rmai.lfhf = _hs.lfhf;
  }
  return { bpm:Math.round(bpm), hrv:Math.round(hrv) };
}
function _rmaiArUpdateVitalsUI(v){
  try{
    var el=document.getElementById('rmai-ar-vitals');
    if(!el) return;
    el.style.display='block';
    el.innerHTML = '<span style="color:#f472b6;">💓 '+v.bpm+'</span>'
                 + '<span style="color:rgba(255,255,255,.45);"></span>'
                 + (v.hrv>0 ? '<span style="color:#a78bfa;margin-left:10px;">🧠 '+v.hrv+'</span><span style="color:rgba(255,255,255,.45);"> </span>' : '');
  }catch(e){}
}
window._rmaiSigReset = function(){
  var S=window._rmaiSig;
  S.rawR=[]; S.rawG=[]; S.rawB=[]; S.prevR=0; S.prevG=0;
  S.lumaEMA=0; S.bpZ=[0,0]; S.sig=[]; S.t0=0; S.bpm=0; S.hrv=0;
};

function _rmaiArOnResults(results){
  var ctx = _rmaiAr.ctx;
  var canvas = _rmaiAr.canvas;
  if(!ctx || !canvas) return;

  _rmaiAr.lastResults = results;

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0){
    var landmarks = results.multiFaceLandmarks[0];

    // 원본 영상 그대로 그림
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    /* ★ C-63 — 특허 명세서(INP26-126) 청구항 2 구현: 영역 분리부(118)
       ─────────────────────────────────────────────────────────────
       "제1영역에 적용되는 색상 변조가 제2영역의 광학 신호 추출에 미치는
        광학적 간섭을 차단하도록 ... 매 프레임 동적으로 상호 배타적으로 격리"

       · 제1영역 (AR 색상 변조): 입술·볼·눈  → _rmaiArDrawLip/Cheek/Eye
       · 제2영역 (광학 신호 추출): 이마 중심 → 아래 rPPG 샘플링
       · 순서가 핵심: 원본 프레임을 그린 '직후, 색을 칠하기 전'에 이마를 읽는다.
         → 색상 합성의 영향을 받지 아니한 순수 광학 신호(명세서 도 4)

       ⚠️ 베이스(얼굴 전체)를 켜면 이마도 칠해지므로, 아래 _rmaiArDrawBase 호출 시
          이마를 제외(제2영역 보호)한다.
       원복: window._cgoArRppgV2 = false */
    if(window._cgoArRppgV2 !== false){
      try{ _rmaiArSampleRppg(ctx, canvas, landmarks); }catch(e){}
    }

    var ac = _rmaiAr.appliedColors;

    // 1. 베이스 (가장 먼저 — 다른 색이 위에 덮음)
    if(ac.base) _rmaiArDrawBase(ctx, canvas, landmarks, ac.base);
    // 2. 볼
    if(ac.cheek){
      _rmaiArDrawCheek(ctx, canvas, landmarks, _rmaiArCheekLeft, ac.cheek);
      _rmaiArDrawCheek(ctx, canvas, landmarks, _rmaiArCheekRight, ac.cheek);
    }
    // 3. 아이
    if(ac.eye){
      _rmaiArDrawEye(ctx, canvas, landmarks, _rmaiArEyeLeft, ac.eye);
      _rmaiArDrawEye(ctx, canvas, landmarks, _rmaiArEyeRight, ac.eye);
    }
    // 4. 립 (가장 위)
    if(ac.lip) _rmaiArDrawLip(ctx, canvas, landmarks, ac.lip);

    // ★ 물광(Fresnel 워터글로우) — 메신저 본체 이식
    try {
      var _gl = (typeof _rmaiAr !== 'undefined' && typeof _rmaiAr.glossLevel === 'number') ? _rmaiAr.glossLevel : 0.5;
      if(_gl > 0 && window.drawFresnelWaterGlow){
        if(!window._fresnelT0) window._fresnelT0 = Date.now()/1000;
        window.drawFresnelWaterGlow(ctx, canvas, landmarks, _gl);
      }
    } catch(e){}

    // 5. ★ 박입 58 — 헤어 (메인 파이프라인 직결, wrap chain 우회)
    //    구글 AI 진단: 두 페이지 입구 + 41 wrap chain → silently fail
    //    fix: _rmaiArOnResults 본체에 직접 박입 (캔버스 clear 후 즉시 적용)
    //    좌표: 글로벌 표준 — landmark 10 (이마 탑) 기준, 얼굴 높이의 0.6 위로 확장
    if(ac.hair && window._rmaiHairOn){   /* ★ 헤어 잠시 끔 — _rmaiHairOn=true 로 되살림 */
      try {
        window._inj58Stats = window._inj58Stats || {frameCount:0, paintCount:0};
        window._inj58Stats.frameCount++;

        // ★ 박입 60 — 좌표 정밀 보정 (천장 떠다님 fix)
        //   진단: 박입 59 가 lm10 (이마 탑) 위로 0.6 확장했는데 영상이 실제로는 더 작아서 천장 잡음
        //   해법: face oval 의 minY 기준 + 위로 0.3 만 확장 (정수리 잡고 천장은 피함)
        //         그리고 아래로 +0.05 확장 (앞머리 추가 보장)
        var FACE_OVAL = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397,
                         365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58,
                         132, 93, 234, 127, 162, 21, 54, 103, 67, 109];
        var ovalMinX = canvas.width, ovalMaxX = 0;
        var ovalMinY = canvas.height, ovalMaxY = 0;
        for(var oi = 0; oi < FACE_OVAL.length; oi++){
          var lmO = landmarks[FACE_OVAL[oi]];
          if(!lmO) continue;
          var lx = lmO.x * canvas.width;
          var ly = lmO.y * canvas.height;
          if(lx < ovalMinX) ovalMinX = lx;
          if(lx > ovalMaxX) ovalMaxX = lx;
          if(ly < ovalMinY) ovalMinY = ly;
          if(ly > ovalMaxY) ovalMaxY = ly;
        }
        if(ovalMaxX > ovalMinX && ovalMaxY > ovalMinY){
          var faceH = ovalMaxY - ovalMinY;
          var faceW = ovalMaxX - ovalMinX;

          // ★ 박입 69 — 좌우 영역 확장 (옆머리 잡기)
          //   파트너님 진단: 옆머리 짧아서 안 잡힘
          //   0.30 → 0.45 좌우 확장, 1.6 → 1.9 가로
          /* ★ 위로 0.65배는 벽까지 덮어 네모 자국을 만들었다 — 0.42배로 좁힌다 */
              var hairY = Math.max(0, Math.floor(ovalMinY - faceH * 0.42));
          var hairH = Math.floor(faceH * 0.95);
          var hairX = Math.max(0, Math.floor(ovalMinX - faceW * 0.26));
          var hairW = Math.floor(faceW * 1.52);
          hairW = Math.min(canvas.width - hairX, hairW);
          hairH = Math.min(canvas.height - hairY, hairH);

          if(hairW > 10 && hairH > 10){
            window._inj58Stats.lastRegion = {x:hairX, y:hairY, w:hairW, h:hairH};

            try{ if(window.rmaiNanoFeed) rmaiNanoFeed(ctx, hairX, hairY, hairW, hairH); }catch(_e){}
            var hairImgData = ctx.getImageData(hairX, hairY, hairW, hairH);
            var hairData = hairImgData.data;

            // 헤어 색 분해
            var hexH = ac.hair;
            var tintR = parseInt(hexH.substr(1,2), 16);
            var tintG = parseInt(hexH.substr(3,2), 16);
            var tintB = parseInt(hexH.substr(5,2), 16);

            var hairInt = (_rmaiAr.intensity && _rmaiAr.intensity.hair !== undefined) ? _rmaiAr.intensity.hair : 0.75;
            var painted = 0;

            // ★ 박입 72 — 박입 71 의 오버 fix dial back
            //   박입 71 (6개 landmark 평균) → 코쪽 점 포함되어 머리 영역까지 보호됨
            //   복구: lm10 (이마 탑) + lm151 (이마 정중앙) 2개만 — 코 제외
            var foreheadLms = [10, 151];
            var foreheadYSum = 0, foreheadYCount = 0;
            for(var fli = 0; fli < foreheadLms.length; fli++){
              var flm = landmarks[foreheadLms[fli]];
              if(flm){
                foreheadYSum += flm.y * canvas.height;
                foreheadYCount++;
              }
            }
            var foreheadY = foreheadYCount > 0 ? (foreheadYSum / foreheadYCount) : ovalMinY;
            // ★ 박입 72 — 마진 -8 → -3 (덜 빡빡, 머리 영역 보호 안 함)
            var foreheadInRegion = foreheadY - hairY - 3;

            // ★ 박입 62 — Gaussian 감쇄 중심 (영역 중앙 약간 위)
            var gaussCx = hairW / 2;
            var gaussCy = hairH * 0.45;
            // ★ 박입 63 — sigma 0.55 → 0.35 (도넛 안개 제거, 정수리만 컴팩트)
            var gaussSigma = Math.min(hairW, hairH) * 0.35;

            /* ★ 머리는 이마에서 위로 이어져 있다 — 끊기면 그 위는 벽이다.
               세로줄마다 위로 훑어 머리 꼭대기를 찾는다. 벽 무늬에 속지 않는다. */
            /* ★ 얼굴 윤곽 안은 절대 머리가 아니다 — 그늘진 뺨·이마가 머리로 칠해졌다.
               얼굴 타원의 줄별 좌우 끝을 미리 구해 그 안을 통째로 막는다. */
            var faceL = new Int16Array(hairH), faceR = new Int16Array(hairH);
            for(var fy = 0; fy < hairH; fy++){ faceL[fy] = 32000; faceR[fy] = -1; }
            for(var oi2 = 0; oi2 < FACE_OVAL.length; oi2++){
              var p1 = landmarks[FACE_OVAL[oi2]];
              var p2 = landmarks[FACE_OVAL[(oi2 + 1) % FACE_OVAL.length]];
              if(!p1 || !p2) continue;
              var x1 = p1.x * canvas.width - hairX, y1 = p1.y * canvas.height - hairY;
              var x2 = p2.x * canvas.width - hairX, y2 = p2.y * canvas.height - hairY;
              var stepsN = Math.max(1, Math.ceil(Math.abs(y2 - y1)));
              for(var t = 0; t <= stepsN; t++){
                var yy = Math.round(y1 + (y2 - y1) * t / stepsN);
                if(yy < 0 || yy >= hairH) continue;
                var xx = Math.round(x1 + (x2 - x1) * t / stepsN);
                if(xx < faceL[yy]) faceL[yy] = xx;
                if(xx > faceR[yy]) faceR[yy] = xx;
              }
            }

            /* ★ 앞 프레임 확률을 기억해 섞는다 — 조명이 흔들려도 경계가 눌어붙는다.
               구글이 말한 '프레임 사이 일관성' 을 우리 방식으로 넣는다. */
            var pkey = hairW + 'x' + hairH;
            if(!window._rmaiHairPrev || window._rmaiHairPrevKey !== pkey){
              window._rmaiHairPrev = new Float32Array(hairW * hairH);
              window._rmaiHairPrevKey = pkey;
            }
            var prevP = window._rmaiHairPrev;

            var colTop = new Int16Array(hairW);
            var faceCx0 = (ovalMinX + ovalMaxX) / 2 - hairX;
            for(var cx = 0; cx < hairW; cx++){
              var cn = Math.abs(cx - faceCx0) / (faceW * 0.5);
              var drop = Math.max(0, Math.min(1, (cn - 0.62) / 0.38));
              var startY = Math.min(hairH - 1, Math.floor(foreheadInRegion - faceH * 0.06 + faceH * 0.52 * drop));
              if(startY < 0){ colTop[cx] = hairH; continue; }
              var gap = 0, top = startY;
              for(var cy = startY; cy >= 0; cy--){
                var ci = (cy * hairW + cx) * 4;
                var cl = 0.2126*hairData[ci] + 0.7152*hairData[ci+1] + 0.0722*hairData[ci+2];
                if(cl < 172){ gap = 0; top = cy; }
                else { gap++; if(gap > 5) break; }
              }
              colTop[cx] = top;
            }

            if(true){
              for(var hi = 0; hi < hairData.length; hi += 4){
                var pixelIdx = hi / 4;
                var px = pixelIdx % hairW;
                var py = Math.floor(pixelIdx / hairW);

                // ★ 박입 69 — 수평 균등 + 수직 Gaussian (양옆 머리 잡기)
                //   파트너님 통찰: "픽셀의 등분화" — 가운데만 진하고 양옆 약한 문제 해결
                //   수평 (X): 거의 균등 (sigma 매우 크게 — 가장자리 살짝 페이드)
                //   수직 (Y): 기존 Gaussian (정수리 ~ 이마 자연 감쇄)
                var dx = px - gaussCx;
                var dy = py - gaussCy;
                var sigmaX = hairW * 0.55;   // 가로 — 매우 크게 (양옆 균등)
                var sigmaY = hairH * 0.32;   // 세로 — Gaussian 자연 감쇄
                var attenX = Math.exp(-(dx*dx) / (2 * sigmaX * sigmaX));
                var attenY = Math.exp(-(dy*dy) / (2 * sigmaY * sigmaY));
                var gaussAttenuation = attenX * attenY;
                if(gaussAttenuation <= 0.012) continue;

                var hr = hairData[hi], hg = hairData[hi+1], hb = hairData[hi+2];
                var hlum = 0.2126*hr + 0.7152*hg + 0.0722*hb;
                if(hlum > 232) continue;   /* ★ 180 은 흰머리를 통째로 버렸다 */

                // ★ 박입 73 — 박입 71/72 사이 균형점 (이마 침범 막되 머리 안 깎음)
                //   휘도 108 (박입 71 105 와 72 112 의 중간)
                //   R-B 95 (박입 71 100 과 72 85 의 중간)
                var isInForeheadZone = (py >= foreheadInRegion - 5);
                if(isInForeheadZone && hlum >= 108){
                  var isSkinTone = (hr > hg - 6) && (hg > hb - 6) && (hr - hb < 95);
                  if(isSkinTone) continue;
                }

                // ★ 박입 71 — 박입 70 한정 알파 폐기 (진짜 머리카락 가닥 보존)
                //   대신 이마 보호 강화로 침범 fix
                //   머리카락 가닥은 우리 차별점 — 깎으면 손해

                // 인종 통합 머리카락 판정
                var rbDiff = hr - hb;
                var isBlondOrGinger = (hr > 140 && hg > 110 && hb < 100 && rbDiff > 55);
                var isWhiteHair = (hlum > 175 && Math.abs(hr-hg) < 12 && Math.abs(hg-hb) < 12);
                var isDarkHair = hlum < 110;

                /* ★ 머리 영토(돔) 안인지 먼저 본다 — 안이면 흰머리도 머리로 본다.
                   벽 거르개를 돔 안에까지 걸었더니 새치·흰머리가 함께 걸러졌다. */
                var faceCxL = (ovalMinX + ovalMaxX) / 2 - hairX;
                var outXR = Math.abs(px - faceCxL) / (faceW * 0.68);
                /* ★ 이마 차단은 가운데만 — 옆머리는 이마선보다 아래까지 내려온다.
                   가로 전체를 같은 높이로 자르니 양옆 흰머리가 통째로 빠졌다. */
                var cxN = Math.abs(px - ((ovalMinX + ovalMaxX) / 2 - hairX)) / (faceW * 0.5);
                var sideDrop = Math.max(0, Math.min(1, (cxN - 0.62) / 0.38));
                var hairlineY = foreheadInRegion - faceH * 0.06 + faceH * 0.52 * sideDrop;
                var inDome = (outXR <= 1.0) && (py <= hairlineY);

                var mxC = Math.max(hr, hg, hb), mnC = Math.min(hr, hg, hb);
                var satC = mxC - mnC;

                /* ★ 확률 경계 — 0/1 로 자르면 가닥 사이가 톱니가 된다 */
                var hairProb;
                if(isBlondOrGinger) hairProb = 1;
                else if(hlum <= 90) hairProb = 1;
                else if(hlum < 145) hairProb = 0.35 + (145 - hlum) / 55 * 0.65;
                else if(inDome && satC < 42 && hlum < 235){
                  /* ★ 흰머리와 벽은 밝기·색이 같다 — 결(무늬)로 가른다.
                     머리카락은 가닥이 있어 옆 화소와 밝기가 크게 다르고,
                     벽은 밋밋해 거의 같다. 이것이 사진의 네모 자국을 만든 원인이었다. */
                  var tx = 0;
                  if(px + 3 < hairW){
                    var n1 = (pixelIdx + 3) * 4;
                    tx = Math.max(tx, Math.abs(hlum - (0.2126*hairData[n1] + 0.7152*hairData[n1+1] + 0.0722*hairData[n1+2])));
                  }
                  if(py + 3 < hairH){
                    var n2 = (pixelIdx + hairW * 3) * 4;
                    tx = Math.max(tx, Math.abs(hlum - (0.2126*hairData[n2] + 0.7152*hairData[n2+1] + 0.0722*hairData[n2+2])));
                  }
                  /* 결이 뚜렷하면 머리, 밋밋하면 벽 */
                  hairProb = (tx >= 14) ? 1.0 : (tx >= 6 ? (tx - 6) / 8 : 0);
                }
                else hairProb = 0;

                /* ★ 벽 차단 — 돔 밖으로 나갈수록 급히 죽인다 */
                if(outXR > 1) hairProb *= Math.max(0, 1 - (outXR - 1) * 1.4);
                /* 돔 밖의 밋밋한 회색은 벽으로 본다 */
                if(!inDome && hlum > 95 && satC < 12) hairProb *= 0.15;
                /* ★ 이마 아래는 좌표로 잘라낸다 — 색과 무관하게 막는다 */
                if(py > hairlineY){
                  var below = (py - hairlineY) / Math.max(6, faceH * 0.05);
                  hairProb *= Math.max(0, 1 - below);
                }
                /* 그 줄의 머리 꼭대기보다 위는 벽이다 */
                if(py < colTop[px]) continue;
                if(py < colTop[px]){ prevP[pixelIdx] *= 0.5; continue; }   /* 꼭대기 위는 벽 */
                /* ★ 얼굴 윤곽 안이면 머리가 아니다 — 안쪽으로 3화소 여유 */
                if(faceR[py] >= 0 && px > faceL[py] + 3 && px < faceR[py] - 3){ prevP[pixelIdx] = 0; continue; }
                /* ★ 외톨이 점 제거 — 머리카락은 뭉쳐 있다. 혼자 떨어진 점은 벽·피부다.
                   이웃 넷 중 둘 이상이 어두워야 인정한다. */
                if(px >= 2 && py >= 2 && px < hairW - 2 && py < hairH - 2){
                  var nb = 0;
                  var o1 = (pixelIdx - 2) * 4, o2 = (pixelIdx + 2) * 4;
                  var o3 = (pixelIdx - hairW * 2) * 4, o4 = (pixelIdx + hairW * 2) * 4;
                  if(0.2126*hairData[o1] + 0.7152*hairData[o1+1] + 0.0722*hairData[o1+2] < 178) nb++;
                  if(0.2126*hairData[o2] + 0.7152*hairData[o2+1] + 0.0722*hairData[o2+2] < 178) nb++;
                  if(0.2126*hairData[o3] + 0.7152*hairData[o3+1] + 0.0722*hairData[o3+2] < 178) nb++;
                  if(0.2126*hairData[o4] + 0.7152*hairData[o4+1] + 0.0722*hairData[o4+2] < 178) nb++;
                  if(nb <= 1) continue;
                  if(nb === 2) hairProb *= 0.5;
                }
                /* ★ 나노점 rPPG — 맥박치면 피부다. 머리로 세지 않는다.
                   피부를 찾아 그 바깥을 남기는 방식이라 벽 무늬에도 안 속는다. */
                try{
                  var sk = window.rmaiNanoSkin ? rmaiNanoSkin(px, py) : -1;
                  if(sk >= 0) hairProb *= Math.max(0, 1 - sk * 1.15);
                }catch(_e){}
                /* ★ 앞 프레임과 섞는다 — 70:30. 경계가 떨리지 않고 눌어붙는다 */
                var pi0 = pixelIdx;
                hairProb = prevP[pi0] * 0.62 + hairProb * 0.38;
                prevP[pi0] = hairProb;
                if(hairProb <= 0.04) continue;

                // ★ 박입 68 — 슬라이더 dynamic 시스템 (C-44 죽이게 진짜 100% 동작)
                //   hairInt 0~0.85 → 정규화 sliderRatio 0~1 → 3개 파라미터 동시 dynamic 제어
                //   slider 0   = 머리 그대로 (lift 0.6, additive 0.20, alpha 0.55)
                //   slider 50  = 자연 와인빛 (lift 1.4, additive 0.52, alpha 0.78)
                //   slider 100 = 비비드 핫핑크 (lift 2.2, additive 0.85, alpha 1.00) ★ 진짜 100%
                var sliderRatio = Math.min(1.0, hairInt / 0.85);  // 0~1 정규화
                var DYN_LIFT_K     = 0.6  + (1.6  * sliderRatio);   // 0.6 ~ 2.2
                var DYN_ADD        = 0.20 + (0.65 * sliderRatio);   // 0.20 ~ 0.85
                var DYN_ALPHA_CAP  = 0.55 + (0.45 * sliderRatio);   // 0.55 ~ 1.00

                // Lift (흑발 → 색조 자리)
                var workR = hr, workG = hg, workB = hb;
                if(hlum < 110){
                  var darkness = (110 - hlum) / 110;
                  var lift = 1 + darkness * (190/Math.max(hlum,1) - 1) * DYN_LIFT_K * 0.45;
                  workR = Math.min(255, hr * lift);
                  workG = Math.min(255, hg * lift);
                  workB = Math.min(255, hb * lift);
                }

                // multiplicative blend (텍스처 보존)
                /* ★ 밝기·결 보존 — 원래 밝기를 그대로 두고 색조만 갈아끼운다.
                   억지로 밝히고 색을 덮으니 결이 뭉개져 헬멧처럼 보였다.
                   물감의 밝기를 그 화소의 밝기에 맞춰 옮긴다. */
                var tLum = 0.2126*tintR + 0.7152*tintG + 0.0722*tintB;
                var wLum = 0.2126*workR + 0.7152*workG + 0.0722*workB;
                var kRatio = wLum / Math.max(1, tLum);
                kRatio = Math.max(0.35, Math.min(2.4, kRatio));
                var multR = Math.min(255, tintR * kRatio);
                var multG = Math.min(255, tintG * kRatio);
                var multB = Math.min(255, tintB * kRatio);

                // Additive (흑발에 색 더 진하게)
                if(hlum < 80){
                  var darkBoost = (1 - hlum/80);
                  multR = multR * (1 - DYN_ADD) + tintR * DYN_ADD * darkBoost;
                  multG = multG * (1 - DYN_ADD) + tintG * DYN_ADD * darkBoost;
                  multB = multB * (1 - DYN_ADD) + tintB * DYN_ADD * darkBoost;
                }

                // alpha (dynamic cap — slider 100 = 진짜 1.0)
                /* ★ 밝은 머리(흰머리·새치)도 색이 실리게 한다.
                   (180-hlum)/180 만 쓰면 흰머리는 무게가 0 이 되어 물들지 않았다. */
                var hairWeight = 1;   /* ★ 그림자 완전 제거 — 밝기와 무관하게 고르게 */
                /* ★ 확률을 그대로 투명도에 곱한다 — 가닥 사이 반투명이 살아난다 */
                /* ★ 인공 그림자(가우스) 제거 — 네모를 감추려던 것인데
                   돔·결·확률 셋이 경계를 잡으므로 얼룩만 남겼다.
                   경계 바깥 가장자리에만 살짝 남겨 부드럽게 끝나게 한다. */
                /* ★ 테두리 12화소만 서서히 — 안쪽은 100% 그대로.
                   네모 선이 드러나던 것을 없애되, 얼룩은 만들지 않는다. */
                var edgeD = Math.min(px, py, hairW - 1 - px, hairH - 1 - py);
                var edgeFade = Math.min(1, edgeD / 12);
                var alpha = Math.min(DYN_ALPHA_CAP, hairInt * Math.pow(hairWeight, 0.5) * edgeFade * hairProb);

                hairData[hi]   = Math.round(hr * (1 - alpha) + multR * alpha);
                hairData[hi+1] = Math.round(hg * (1 - alpha) + multG * alpha);
                hairData[hi+2] = Math.round(hb * (1 - alpha) + multB * alpha);
                painted++;
              }
              ctx.putImageData(hairImgData, hairX, hairY);
              window._inj58Stats.paintCount = painted;

              // 박입 53 진단 박스 호환 (stats 공유)
              window._inj51Stats = window._inj51Stats || {};
              window._inj51Stats.frameCount = window._inj58Stats.frameCount;
              window._inj51Stats.paintCount = painted;
              window._inj51Stats.lastRegion = window._inj58Stats.lastRegion;
            }
          }
        }
      } catch(eh){
        window._inj58Stats = window._inj58Stats || {};
        window._inj58Stats.lastError = eh.message;
      }
    }

    // ★ C-42 — 빨간 478점 시각화 제거 (사용자 요청 — 사진 보기 흉함)
    // 원본 cgo-fuli 디버그용 코드. 메신저에서는 숨김.
    // landmarks 478점 추적은 그대로 — 시각화만 제거.

    _rmaiAr.frameCount++;
    if(_rmaiAr.frameCount % 30 === 0){
      var status = document.getElementById('rmai-ar-status');
      if(status){
        var applied = [];
        if(ac.lip) applied.push('립');
        if(ac.cheek) applied.push('볼');
        if(ac.eye) applied.push('아이');
        if(ac.base) applied.push('베이스');
        status.textContent = _cgoT(_aK(12321)) + (applied.length ? applied.join('·')+' 적용' : _aK(12322));
        status.style.background = 'rgba(34,197,94,.85)';
      }
    }
  } else {
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    var status = document.getElementById('rmai-ar-status');
    if(status){
      status.textContent = _cgoT(_aK(12323));
      /* ★ C-63: textContent 대입 후 즉시 번역 */
      try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(status); }catch(e){}
      status.style.background = 'rgba(251,191,36,.85)';
    }
  }

  ctx.restore();
}

// ═══════════════════════════════════════════════════
// ㊻ WebGL Displacement Map Warping — 진짜 픽셀 변형 (재박제)
// ═══════════════════════════════════════════════════
// Triangulation 폐기. 4-vertex quad + fragment shader가 *각 픽셀의 원본 좌표*를 계산.
// 모든 픽셀에 대해 부드러운 변형. 결과: 자연스러운 슬림 + 눈 키우기.

var _rmaiArWebGL = {
  canvas: null,
  gl: null,
  program: null,
  videoTexture: null,
  posBuf: null,
  uniforms: null,
  initFailed: false
};

function _rmaiArInitWebGL(parentCanvas){
  if(_rmaiArWebGL.gl || _rmaiArWebGL.initFailed) return _rmaiArWebGL.gl;

  try {
    var c = document.createElement('canvas');
    c.width = parentCanvas.width;
    c.height = parentCanvas.height;
    var gl = c.getContext('webgl', {alpha: false, premultipliedAlpha: false, preserveDrawingBuffer: true});
    if(!gl){
      console.warn('[rmaiAr WebGL] not supported');
      _rmaiArWebGL.initFailed = true;
      return null;
    }

    // === Vertex Shader — 단순 quad ===
    var vsSrc = [
      'attribute vec2 a_position;',
      'varying vec2 v_uv;',
      'void main(){',
      '  gl_Position = vec4(a_position, 0.0, 1.0);',
      '  v_uv = (a_position + 1.0) * 0.5;',
      '  v_uv.y = 1.0 - v_uv.y;',
      '}'
    ].join('\n');

    // === Fragment Shader — Displacement Map (각 픽셀이 원본의 어디서 가져올지) ===
    var fsSrc = [
      'precision mediump float;',
      'varying vec2 v_uv;',
      'uniform sampler2D u_image;',
      'uniform vec2 u_faceCenter;',
      'uniform float u_faceRadius;',
      'uniform vec2 u_leftEye;',
      'uniform vec2 u_rightEye;',
      'uniform float u_slim;',
      'uniform float u_eyeBig;',
      '',
      'void main(){',
      '  vec2 srcUV = v_uv;',
      '',
      '  // 얼굴 슬림: 출력 픽셀의 원본 위치를 *바깥*으로 → 시각적 슬림',
      '  vec2 toFace = srcUV - u_faceCenter;',
      '  float distToFace = length(toFace);',
      '  if(u_slim > 0.0 && distToFace < u_faceRadius * 1.6){',
      '    float falloff = 1.0 - smoothstep(0.0, u_faceRadius * 1.6, distToFace);',
      '    falloff = falloff * falloff;',
      '    srcUV = u_faceCenter + toFace * (1.0 + u_slim * 0.18 * falloff);',
      '  }',
      '',
      '  // 눈 키우기: 눈 주변 픽셀을 *눈 중심으로 끌어옴* → 시각적 확대',
      '  if(u_eyeBig > 0.0){',
      '    float eyeR = u_faceRadius * 0.45;',
      '    vec2 toLE = srcUV - u_leftEye;',
      '    float distLE = length(toLE);',
      '    if(distLE < eyeR){',
      '      float falloff = 1.0 - distLE / eyeR;',
      '      falloff = falloff * falloff * falloff;',
      '      srcUV = u_leftEye + toLE * (1.0 - u_eyeBig * 0.30 * falloff);',
      '    }',
      '    vec2 toRE = srcUV - u_rightEye;',
      '    float distRE = length(toRE);',
      '    if(distRE < eyeR){',
      '      float falloff = 1.0 - distRE / eyeR;',
      '      falloff = falloff * falloff * falloff;',
      '      srcUV = u_rightEye + toRE * (1.0 - u_eyeBig * 0.30 * falloff);',
      '    }',
      '  }',
      '',
      '  srcUV = clamp(srcUV, vec2(0.0), vec2(1.0));',
      '  gl_FragColor = texture2D(u_image, srcUV);',
      '}'
    ].join('\n');

    function compileShader(src, type){
      var sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if(!gl.getShaderParameter(sh, gl.COMPILE_STATUS)){
        console.error('[rmaiAr WebGL] shader compile error:', gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    }
    var vs = compileShader(vsSrc, gl.VERTEX_SHADER);
    var fs = compileShader(fsSrc, gl.FRAGMENT_SHADER);
    if(!vs || !fs){ _rmaiArWebGL.initFailed = true; return null; }

    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
      console.error('[rmaiAr WebGL] link error:', gl.getProgramInfoLog(program));
      _rmaiArWebGL.initFailed = true;
      return null;
    }

    _rmaiArWebGL.canvas = c;
    _rmaiArWebGL.gl = gl;
    _rmaiArWebGL.program = program;

    _rmaiArWebGL.posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, _rmaiArWebGL.posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
       1, -1,  1,  1,  -1, 1
    ]), gl.STATIC_DRAW);

    _rmaiArWebGL.videoTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, _rmaiArWebGL.videoTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    _rmaiArWebGL.uniforms = {
      image: gl.getUniformLocation(program, 'u_image'),
      faceCenter: gl.getUniformLocation(program, 'u_faceCenter'),
      faceRadius: gl.getUniformLocation(program, 'u_faceRadius'),
      leftEye: gl.getUniformLocation(program, 'u_leftEye'),
      rightEye: gl.getUniformLocation(program, 'u_rightEye'),
      slim: gl.getUniformLocation(program, 'u_slim'),
      eyeBig: gl.getUniformLocation(program, 'u_eyeBig')
    };

    return gl;
  } catch(e){
    console.error('[rmaiAr WebGL] init error:', e);
    _rmaiArWebGL.initFailed = true;
    return null;
  }
}

function _rmaiArDrawWarpedImage(ctx, canvas, image, landmarks){
  var slim = _rmaiAr.faceSlim / 100;
  var eyeBig = _rmaiAr.eyeBigger / 100;

  if(slim <= 0 && eyeBig <= 0){
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return;
  }

  var gl = _rmaiArInitWebGL(canvas);
  if(!gl){
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return;
  }

  if(_rmaiArWebGL.canvas.width !== canvas.width || _rmaiArWebGL.canvas.height !== canvas.height){
    _rmaiArWebGL.canvas.width = canvas.width;
    _rmaiArWebGL.canvas.height = canvas.height;
  }

  var nose = landmarks[1];
  var leftCheek = landmarks[234];
  var rightCheek = landmarks[454];
  var leftEye = landmarks[33];
  var rightEye = landmarks[263];
  if(!nose || !leftCheek || !rightCheek || !leftEye || !rightEye){
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return;
  }

  var faceHalfW = Math.abs(rightCheek.x - leftCheek.x) / 2;

  try {
    gl.viewport(0, 0, _rmaiArWebGL.canvas.width, _rmaiArWebGL.canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(_rmaiArWebGL.program);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, _rmaiArWebGL.videoTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(_rmaiArWebGL.uniforms.image, 0);

    gl.uniform2f(_rmaiArWebGL.uniforms.faceCenter, nose.x, nose.y);
    gl.uniform1f(_rmaiArWebGL.uniforms.faceRadius, faceHalfW);
    gl.uniform2f(_rmaiArWebGL.uniforms.leftEye, leftEye.x, leftEye.y);
    gl.uniform2f(_rmaiArWebGL.uniforms.rightEye, rightEye.x, rightEye.y);
    gl.uniform1f(_rmaiArWebGL.uniforms.slim, slim);
    gl.uniform1f(_rmaiArWebGL.uniforms.eyeBig, eyeBig);

    gl.bindBuffer(gl.ARRAY_BUFFER, _rmaiArWebGL.posBuf);
    var posLoc = gl.getAttribLocation(_rmaiArWebGL.program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    ctx.drawImage(_rmaiArWebGL.canvas, 0, 0, canvas.width, canvas.height);
  } catch(e){
    console.error('[rmaiAr WebGL] render error:', e);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
}

// ★ 얼굴 변형 적용 함수 (외부 호출용)
window.rmaiArSetFaceSlim = function(val){
  _rmaiAr.faceSlim = parseFloat(val) || 0;
};
window.rmaiArSetEyeBigger = function(val){
  _rmaiAr.eyeBigger = parseFloat(val) || 0;
};

// ═══════════════════════════════════════════════════
// 4 카테고리 색 적용 helper 함수들
// ═══════════════════════════════════════════════════

// ★ 립 — multiply 블렌드 (강도 동적)
function _rmaiArDrawLip(ctx, canvas, landmarks, color){
  ctx.beginPath();
  _rmaiArLipsOuter.forEach(function(idx, i){
    var lm = landmarks[idx];
    if(!lm) return;
    var x = lm.x * canvas.width;
    var y = lm.y * canvas.height;
    if(i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.globalCompositeOperation = 'multiply';
  ctx.globalAlpha = _rmaiAr.intensity.lip;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
}

// ★ 볼 — 부드러운 원형 그라디언트 (자연스러운 페이딩)
function _rmaiArDrawCheek(ctx, canvas, landmarks, indices, color){
  // 인덱스 영역의 중심점 계산
  var cx = 0, cy = 0, count = 0;
  indices.forEach(function(idx){
    var lm = landmarks[idx];
    if(!lm) return;
    cx += lm.x * canvas.width;
    cy += lm.y * canvas.height;
    count++;
  });
  if(count === 0) return;
  cx /= count; cy /= count;

  // 반경 = 얼굴 높이의 1/7 (이전 1/4보다 훨씬 작음 — 자연스러움)
  var nose = landmarks[1];
  var chin = landmarks[152];
  var faceH = nose && chin ? Math.abs((chin.y - nose.y) * canvas.height) : 60;
  var radius = Math.max(15, faceH / 6);

  // 부드러운 원형 그라디언트 — 가운데도 진하지 않게, 가장자리 자연스럽게 페이드
  var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  grad.addColorStop(0, color);
  grad.addColorStop(0.4, color);
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.globalCompositeOperation = 'multiply';
  ctx.globalAlpha = _rmaiAr.intensity.cheek;
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
}

// ★ 아이 (눈꺼풀) — 가우시안 블러 페더링 (가장자리 부드럽게 — 자연스러움)
function _rmaiArDrawEye(ctx, canvas, landmarks, indices, color){
  // 임시 캔버스 재사용 (성능)
  if(!_rmaiAr.eyeOffscreen){
    _rmaiAr.eyeOffscreen = document.createElement('canvas');
  }
  var off = _rmaiAr.eyeOffscreen;
  if(off.width !== canvas.width || off.height !== canvas.height){
    off.width = canvas.width;
    off.height = canvas.height;
  }
  var oCtx = off.getContext('2d', { willReadFrequently: true });
  oCtx.clearRect(0, 0, off.width, off.height);

  // 다각형 채우기 (임시 캔버스에)
  oCtx.beginPath();
  indices.forEach(function(idx, i){
    var lm = landmarks[idx];
    if(!lm) return;
    var x = lm.x * canvas.width;
    var y = lm.y * canvas.height;
    if(i === 0) oCtx.moveTo(x, y);
    else oCtx.lineTo(x, y);
  });
  oCtx.closePath();
  oCtx.fillStyle = color;
  oCtx.fill();

  // 메인 캔버스에 *가우시안 블러 5px* + multiply 합성 → 가장자리 부드러움
  ctx.save();
  ctx.filter = 'blur(5px)';
  ctx.globalCompositeOperation = 'multiply';
  ctx.globalAlpha = _rmaiAr.intensity.eye;
  ctx.drawImage(off, 0, 0);
  ctx.restore();
}

// ★ 베이스 (전체 얼굴 톤) — soft-light 블렌드 (자연스러운 피부톤)
function _rmaiArDrawBase(ctx, canvas, landmarks, color){
  ctx.beginPath();
  _rmaiArFaceOval.forEach(function(idx, i){
    var lm = landmarks[idx];
    if(!lm) return;
    var x = lm.x * canvas.width;
    var y = lm.y * canvas.height;
    if(i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  /* ★ C-63 청구항 2: 제2영역(이마) 배타 격리 —
     베이스는 얼굴 전체(_rmaiArFaceOval)를 칠하므로 이마도 오염된다.
     이마 사각형을 클리핑에서 제외하여 광학 신호 추출 영역을 보호한다. */
  if(window._cgoArRppgV2 !== false && _rmaiAr._rppgBox){
    var _b = _rmaiAr._rppgBox;
    ctx.rect(_b.x + _b.w, _b.y, -_b.w, _b.h);   /* 역방향 → evenodd 구멍 */
  }
  ctx.globalCompositeOperation = 'soft-light';
  ctx.globalAlpha = _rmaiAr.intensity.base;
  ctx.fillStyle = color;
  /* ★ C-63: evenodd 규칙이라야 위에서 추가한 역방향 사각형이 '구멍'이 된다.
     (기본 nonzero 규칙에서는 구멍이 생기지 않아 이마가 그대로 칠해짐) */
  if(window._cgoArRppgV2 !== false && _rmaiAr._rppgBox) ctx.fill('evenodd');
  else ctx.fill();
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
}

// ═══════════════════════════════════════════════════
// ★ 색 picker UI — 4 카테고리 + 팔레트 전환 + 강도 슬라이더 (하이브리드)
// ═══════════════════════════════════════════════════
function _rmaiArInitColorPicker(){
  var picker = document.getElementById('rmai-ar-color-picker');
  if(!picker) return;

  var r = window.calcResult || {};
  var oh = r.domOh || '토';
  var ohNames = {목:_aK(12352),화:_aK(12353),토:_aK(12354),금:_aK(12355),수:_aK(12356)};
  var pal = (typeof _maiColors !== 'undefined' && _maiColors[oh]) ? _maiColors[oh] : null;

  if(!pal){
    picker.innerHTML = '<div style="font-size:11px;color:#888;text-align:center;padding:12px;">'+_aK(12350)+'</div>';
    return;
  }

  // ★ 600색 — 현재 카드 모드에 따라 라이브러리 선택
  var currentCardLib = _rmaiArColorLibrary[_rmaiAr.cardMode || 'oheng'] || _rmaiArOhengSet;
  
  // ★ 4 카테고리 탭 (현재 카드 모드의 색상 사용)
  var cats = [
    {key:'lip',   icon:'💋', name:_aK(12338), pal: currentCardLib.lip,   subtitle:_aK(12342)},
    {key:'cheek', icon:'🌸', name:_aK(12339), pal: currentCardLib.cheek, subtitle:_aK(12343)},
    {key:'eye',   icon:'👁️', name:_aK(12340), pal: currentCardLib.eye,   subtitle:_aK(12324)},
    {key:'base',  icon:'🫧', name:_aK(12341), pal: currentCardLib.base,  subtitle:_aK(12325)}
  ];

  // 카테고리 탭 — 5개 한 줄 (헤어 포함)
  var tabsHtml = '<div style="display:flex;gap:4px;margin-bottom:10px;background:#f3f4f6;padding:4px;border-radius:12px;">';
  cats.forEach(function(c){
    var active = (c.key === _rmaiAr.currentCategory);
    var bg = active ? '#fff' : 'transparent';
    var color = active ? '#1a1408' : '#888';
    var shadow = active ? 'box-shadow:0 1px 4px rgba(0,0,0,.08);' : '';
    var weight = active ? '900' : '700';
    tabsHtml += '<button onclick="rmaiArSetCategory(\''+c.key+'\')" style="flex:1;padding:9px 4px;background:'+bg+';border:none;border-radius:8px;color:'+color+';font-size:11px;font-weight:'+weight+';cursor:pointer;font-family:inherit;'+shadow+'transition:all .2s;">'
      +c.icon+' '+c.name+'</button>';
  });
  tabsHtml += '</div>';

  // ★ 600색 3카드 시스템 (오행 / 일반 / 명품)
  var cardModes = [
    {key:'daily', icon:'🌿', name:_aK(12326), desc:_aK(12327)},
    {key:'luxury', icon:'💎', name:_aK(12328), desc:_aK(12329)},
    {key:'oheng', icon:'📜', name:_aK(12330), desc:_aK(12331)}
  ];
  var cardModeUI = '<div style="margin-bottom:14px;">';
  cardModeUI += '<div style="font-size:10px;color:#888;margin-bottom:6px;font-weight:700;">'+_aK(12335)+'</div>';
  cardModeUI += '<div style="display:flex;gap:4px;">';
  cardModes.forEach(function(cm){
    var active = (_rmaiAr.cardMode === cm.key);
    var bgGrad = active ? (cm.key==='oheng'?'linear-gradient(135deg,#fbbf24,#f59e0b)':cm.key==='daily'?'linear-gradient(135deg,#34d399,#10b981)':'linear-gradient(135deg,#a855f7,#7c3aed)') : '#f3f4f6';
    var txtColor = active ? '#fff' : '#666';
    var weight = active ? '900' : '700';
    var shadow = active ? 'box-shadow:0 2px 6px rgba(0,0,0,.15);' : '';
    cardModeUI += '<button onclick="rmaiArSetCardMode(\''+cm.key+'\')" style="flex:1;padding:8px 4px;background:'+bgGrad+';border:none;border-radius:9px;color:'+txtColor+';font-size:10px;font-weight:'+weight+';cursor:pointer;font-family:inherit;'+shadow+'transition:all .2s;">'+cm.icon+' '+cm.name+'</button>';
  });
  cardModeUI += '</div>';
  cardModeUI += '<div style="margin-top:6px;font-size:9px;color:#999;text-align:center;line-height:1.5;">'+_aK(12336)+'</div>';
  cardModeUI += '</div>';
  
  // ★ 팔레트 전환 탭 (사주 / 무지개)
  var paletteToggle = '<div style="display:flex;gap:6px;margin-bottom:12px;">';
  var palOhActive = (_rmaiAr.currentPalette === 'oheng');
  var palRbActive = (_rmaiAr.currentPalette === 'rainbow');
  paletteToggle += '<button onclick="rmaiArSetPalette(\'oheng\')" style="flex:1;padding:6px 8px;background:'+(palOhActive?'linear-gradient(135deg,#fbbf24,#f59e0b)':'#f3f4f6')+';border:none;border-radius:8px;color:'+(palOhActive?'#1a1408':'#888')+';font-size:10px;font-weight:'+(palOhActive?'900':'700')+';cursor:pointer;font-family:inherit;">🎨 '+_aK(12337)+' ('+(ohNames[oh]||oh)+')</button>';
  paletteToggle += '<button onclick="rmaiArSetPalette(\'rainbow\')" style="flex:1;padding:6px 8px;background:'+(palRbActive?'linear-gradient(90deg,#dc2626,#f97316,#eab308,#16a34a,#2563eb,#9333ea)':'#f3f4f6')+';border:none;border-radius:8px;color:'+(palRbActive?'#fff':'#888')+';font-size:10px;font-weight:'+(palRbActive?'900':'700')+';cursor:pointer;font-family:inherit;text-shadow:'+(palRbActive?'0 1px 2px rgba(0,0,0,.4)':'none')+';">'+_aK(12332)+'</button>';
  paletteToggle += '</div>';

  // 현재 카테고리 + 현재 팔레트에 따른 색 배열
  var currentCat = cats.find(function(c){ return c.key === _rmaiAr.currentCategory; }) || cats[0];

  // 현재 카테고리 + 현재 팔레트에 따른 색 배열 (4 카테고리만)
  var currentColors = (_rmaiAr.currentPalette === 'rainbow') ? _rmaiArRainbowSet : (currentCat.pal || []);
  var appliedHex = _rmaiAr.appliedColors[currentCat.key];
  var paletteLabel = (_rmaiAr.currentPalette === 'rainbow') ? _aK(12332) : (currentCat.icon + ' ' + currentCat.subtitle + ' — ' + _aK(12337) + ' ' + (ohNames[oh]||oh) + ' · ' + _aK(12351));

  var swatchHtml = '<div style="font-size:11px;font-weight:800;color:#1a1408;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between;">'
    + '<span>'+paletteLabel+'</span>'
    + '<span style="font-size:9px;font-weight:700;color:#888;">'+_aK(12334)+'</span>'
    + '</div>'
    + '<div style="display:flex;flex-wrap:wrap;gap:8px;">';

  currentColors.forEach(function(c){
    var isApplied = (appliedHex === c.c);
    var ringColor = isApplied ? '#fbbf24' : 'rgba(0,0,0,.08)';
    var ringWidth = isApplied ? '3px' : '2.5px';
    var scale = isApplied ? 'scale(1.15)' : 'scale(1)';
    swatchHtml += '<button onclick="rmaiArApplyColor(\'' + c.c + '\',this)" style="display:flex;flex-direction:column;align-items:center;gap:3px;background:none;border:none;cursor:pointer;padding:0;font-family:inherit;">'
      +   '<div style="width:38px;height:38px;border-radius:50%;background:' + c.c + ';border:'+ringWidth+' solid '+ringColor+';box-shadow:0 2px 6px rgba(0,0,0,.15);transition:transform .2s,border-color .2s;transform:'+scale+';" data-rmai-swatch="1"></div>'
      +   '<div style="font-size:8px;color:#666;text-align:center;width:42px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+_aCN(c.n)+'</div>'
      + '</button>';
  });
  swatchHtml += '</div>';

  // ★ 강도 슬라이더 (현재 카테고리)
  var maxIntensity = (currentCat.key === 'base') ? 0.7 : 0.85;
  var curIntensity = _rmaiAr.intensity[currentCat.key];
  var pct = Math.round(curIntensity / maxIntensity * 100);
  var sliderHtml = '<div style="margin-top:14px;padding:12px;background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;">'
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">'
    + '<span style="font-size:11px;font-weight:800;color:#581c87;">⚙️ '+currentCat.name+' '+_aK(12346)+'</span>'
    + '<span id="rmai-ar-intensity-pct" style="font-size:11px;font-weight:900;color:#7c3aed;">'+pct+'%</span>'
    + '</div>'
    + '<input type="range" id="rmai-ar-intensity-slider" min="0" max="100" value="'+pct+'" oninput="rmaiArSetIntensity(this.value)" style="width:100%;height:6px;-webkit-appearance:none;appearance:none;background:linear-gradient(90deg,#e9d5ff,#a855f7);border-radius:3px;outline:none;cursor:pointer;" />'
    + '<div style="display:flex;justify-content:space-between;font-size:9px;color:#888;margin-top:4px;"><span>'+_aK(12344)+'</span><span>'+_aK(12345)+'</span></div>'
    + '</div>';

  var clearBtn = '<button onclick="rmaiArApplyColor(null,null)" style="margin-top:10px;width:100%;padding:8px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:8px;font-size:11px;font-weight:700;color:#666;cursor:pointer;font-family:inherit;">✕ '+currentCat.name+' '+_aK(12347)+'</button>';

  // ★ C 박입 — 색상 패널 접기 토글 + 적용 색 미니 미리보기
  var applied = _rmaiAr.appliedColors;
  var miniPreview = '';
  ['lip','cheek','eye','base'].forEach(function(cat){
    if(applied[cat]){
      var icon = cat==='lip'?'💋':cat==='cheek'?'🌸':cat==='eye'?'👁️':'🫧';
      miniPreview += '<span style="display:inline-flex;align-items:center;gap:3px;padding:3px 7px;background:rgba(255,255,255,.7);border-radius:8px;font-size:10px;color:#444;"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:'+applied[cat]+';border:1px solid rgba(0,0,0,.1);"></span>'+icon+'</span>';
    }
  });
  if(!miniPreview) miniPreview = '<span style="font-size:10px;color:#999;">'+_aK(12333)+'</span>';
  
  var toggleBtn = '<button onclick="rmaiArTogglePicker()" style="width:100%;padding:10px 14px;background:linear-gradient(135deg,#fef3c7,#fde68a);border:1px solid #fbbf24;border-radius:12px;color:#92400e;font-size:12px;font-weight:800;cursor:pointer;font-family:inherit;margin-bottom:'+(_rmaiAr.pickerCollapsed?'0':'12px')+';display:flex;align-items:center;justify-content:space-between;gap:8px;">'
    +'<span style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">🎨 '+(_rmaiAr.pickerCollapsed?_aK(12349):_aK(12348))+' '+miniPreview+'</span>'
    +'<span style="font-size:14px;">'+(_rmaiAr.pickerCollapsed?'▼':'▲')+'</span>'
    +'</button>';
  
  if(_rmaiAr.pickerCollapsed){
    // ★ 접힌 상태 — 토글 버튼만 표시 (캡처 즉시 가능)
    picker.innerHTML = toggleBtn;
    try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(picker); }catch(e){}
  } else {
    // ★ 펼친 상태 — 토글 버튼 + 전체 컬러 패널
    picker.innerHTML = toggleBtn + cardModeUI + tabsHtml + paletteToggle + swatchHtml + sliderHtml + clearBtn;
    /* ★ C-63: 600색 라이브러리·카테고리 즉시 번역 */
    try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(picker); }catch(e){}
  }
}

// ★ 카테고리 전환 (4 카테고리만)
window.rmaiArSetCategory = function(catKey){
      if(typeof _rmaiAr === 'undefined') return;

      // ★ 박입 44: scrSkinage 활성 시 base 강제 (피부 전용 페이지)
      try {
        var scrSkinage = document.getElementById('scrSkinage');
        if(scrSkinage && scrSkinage.classList.contains('active')){
          catKey = 'base';  // 피부 페이지 → base 만
        }
      } catch(e){}

      _rmaiAr.currentCategory = catKey;  // ★ 그대로
      if(typeof _rmaiArInitColorPicker === 'function'){
        try { _rmaiArInitColorPicker(); } catch(e){}
      }
      // ★ 박입 43 — 카테고리별 slider 자동 동기
      if(typeof window.syncSlidersToCategory === 'function'){
        setTimeout(function(){ window.syncSlidersToCategory(catKey); }, 50);
      }
      // 카테고리 버튼 시각 강조
      var picker = document.getElementById('rmai-ar-color-picker');
      if(picker){
        var btns = picker.querySelectorAll('button[onclick*="rmaiArSetCategory"]');
        btns.forEach(function(b){
          var on = b.getAttribute('onclick') || '';
          if(on.indexOf("'" + catKey + "'") > -1){
            b.style.background = 'linear-gradient(135deg,#fbbf24,#f59e0b)';
            b.style.color = '#1a1408';
            b.style.fontWeight = '900';
          } else {
            b.style.background = '#f3f4f6';
            b.style.color = '#888';
            b.style.fontWeight = '700';
          }
        });
      }
    };

// ★ 팔레트 전환 (사주 ↔ 무지개)
window.rmaiArSetPalette = function(palKey){
  if(['oheng','rainbow'].indexOf(palKey) < 0) return;
  _rmaiAr.currentPalette = palKey;
  _rmaiArInitColorPicker();
}

// ★ 600색 카드 모드 전환 (오행 / 일반 / 명품)
window.rmaiArSetCardMode = function(cardKey){
  if(['oheng','daily','luxury'].indexOf(cardKey) < 0) return;
  _rmaiAr.cardMode = cardKey;
  // 선택한 카드 펼치기 + 다른 카드 접기
  _rmaiAr.cardExpanded = {oheng:false, daily:false, luxury:false};
  _rmaiAr.cardExpanded[cardKey] = true;
  _rmaiArInitColorPicker();
}

// ★ 카드 토글 (펼치고 접기)
window.rmaiArToggleCard = function(cardKey){
  if(['oheng','daily','luxury'].indexOf(cardKey) < 0) return;
  _rmaiAr.cardExpanded[cardKey] = !_rmaiAr.cardExpanded[cardKey];
  _rmaiArInitColorPicker();
}

// ★ 색상 패널 전체 접기/펼치기 (캡처 편의 — 대장님 통찰)
window.rmaiArTogglePicker = function(){
  _rmaiAr.pickerCollapsed = !_rmaiAr.pickerCollapsed;
  _rmaiArInitColorPicker();
};

// ★ 강도 조절 (슬라이더 0~100 → alpha 동적 매핑)
window.rmaiArSetIntensity = function(val){
  var cat = _rmaiAr.currentCategory;
  var maxIntensity = (cat === 'base') ? 0.7 : 0.85;
  var alpha = (parseFloat(val) || 0) / 100 * maxIntensity;
  _rmaiAr.intensity[cat] = alpha;
  // 표시 갱신 (전체 picker 재렌더 안 함 — 슬라이더 끊김 방지)
  var pctEl = document.getElementById('rmai-ar-intensity-pct');
  if(pctEl) pctEl.textContent = val + '%';
};

// ★ 색 적용 — 현재 카테고리에 저장
window.rmaiArApplyColor = function(hexColor, btnEl){
      if(typeof _rmaiAr === 'undefined') return;
      var cat = _rmaiAr.currentCategory || 'base';
      _rmaiAr.appliedColors = _rmaiAr.appliedColors || {};
      _rmaiAr.appliedColors[cat] = hexColor;  // ★ 현재 카테고리에 정확히 박음
      _rmaiAr.currentColor = hexColor;

      // ★ HEX → HSL 변환 후 미세 색상 슬라이더 강제 동기
      try {
        if(hexColor && hexColor.charAt(0)==='#' && hexColor.length===7){
          var R = parseInt(hexColor.substr(1,2),16)/255;
          var G = parseInt(hexColor.substr(3,2),16)/255;
          var B = parseInt(hexColor.substr(5,2),16)/255;
          var mx = Math.max(R,G,B), mn = Math.min(R,G,B);
          var H, S, L = (mx+mn)/2;
          if(mx===mn){ H=0; S=0; }
          else {
            var d = mx-mn;
            S = L>0.5 ? d/(2-mx-mn) : d/(mx+mn);
            if(mx===R) H = ((G-B)/d + (G<B?6:0));
            else if(mx===G) H = ((B-R)/d + 2);
            else H = ((R-G)/d + 4);
            H /= 6;
          }
          var Hd = Math.round(H*360), Sp = Math.round(S*100), Lp = Math.round(L*100);
          var hueBar = document.getElementById('svi-hue-bar-m');
          var satBar = document.getElementById('svi-sat-bar-m');
          var lightBar = document.getElementById('svi-light-bar-m');
          if(hueBar && satBar && lightBar){
            hueBar.value = Hd; satBar.value = Sp; lightBar.value = Lp;
            // 라벨 직접 갱신 (makeupUpdateHsl 의존 X)
            var hueVal = document.getElementById('svi-hue-val-m');
            var satVal = document.getElementById('svi-sat-val-m');
            var lightVal = document.getElementById('svi-light-val-m');
            if(hueVal) hueVal.textContent = Hd + '°';
            if(satVal) satVal.textContent = Sp + '%';
            if(lightVal) lightVal.textContent = Lp + '%';
            // ★ 박입 50 핵심 — 현재색 박스 + HEX 표시 직접 갱신 (hslToHex scope 의존 X)
            var preview = document.getElementById('svi-hsl-preview-m');
            var hexBox = document.getElementById('svi-hsl-hex-m');
            if(preview) preview.style.background = hexColor;
            if(hexBox) hexBox.textContent = hexColor.toUpperCase();
            // hslByCategory 자동 저장 (makeupUpdateHsl override 가 처리)
            if(typeof window.makeupUpdateHsl === 'function'){
              try { window.makeupUpdateHsl(); } catch(e){}
            }
          }
        }
      } catch(e){}

      // ★ 박입 50 핵심 — picker 강제 새로고침 (선택 표시 gold ring 출력)
      try {
        if(typeof window._rmaiArInitColorPicker === 'function'){
          window._rmaiArInitColorPicker();
        } else if(typeof _rmaiArInitColorPicker === 'function'){
          _rmaiArInitColorPicker();
        }
      } catch(e){}
    };

// ═══════════════════════════════════════════════════
// ★ C-63 rmaiScanStop — 화장 후 스캔 카메라 닫기 (페이지 유지 · 카메라만 접힘)
window.rmaiScanStop = function(){
  try{
    if(typeof _rmai !== 'undefined'){
      _rmai.running = false;
      if(_rmai.timer){ clearInterval(_rmai.timer); _rmai.timer=null; }
      if(_rmai.stream){ _rmai.stream.getTracks().forEach(function(t){ t.stop(); }); _rmai.stream=null; }
    }
    var v=document.getElementById('rmai-video');
    if(v){ v.style.display='none'; v.srcObject=null; }
    var ph=document.getElementById('rmai-placeholder'); if(ph) ph.style.display='flex';
    var g=document.getElementById('rmai-guide'); if(g) g.style.display='none';
    var b=document.getElementById('rmai-btn'); if(b) b.style.display='block';
    var prg=document.getElementById('rmai-progress'); if(prg) prg.style.width='0%';
    var cb=document.getElementById('rmai-scan-close-btn'); if(cb) cb.style.display='none';
    var tmr=document.getElementById('rmai-timer'); if(tmr) tmr.textContent='';
  }catch(e){}
};

// ★ rmaiArStop — AR 정지
// ═══════════════════════════════════════════════════
window.rmaiArStop = function(){
  _rmaiAr.running = false;
  if(_rmaiAr.stream){
    _rmaiAr.stream.getTracks().forEach(function(t){t.stop();});
    _rmaiAr.stream = null;
  }
  var video = document.getElementById('rmai-ar-video');
  var canvas = document.getElementById('rmai-ar-canvas');
  var placeholder = document.getElementById('rmai-ar-placeholder');
  var status = document.getElementById('rmai-ar-status');
  var stopBtn = document.getElementById('rmai-ar-stop-btn');
  var arSection = document.getElementById('rmai-ar-section');
  var arStartBtn = document.getElementById('rmai-ar-start-btn');
  if(video){ video.style.display='none'; video.srcObject=null; }
  if(canvas) canvas.style.display='none';
  if(placeholder) placeholder.style.display='flex';
  if(status) status.style.display='none';
  if(stopBtn) stopBtn.style.display='none';
  if(arSection) arSection.style.display='none';
  if(arStartBtn) arStartBtn.style.display='block';
  _rmaiAr.currentColor = null;
  _rmaiAr.appliedColors = { lip:null, cheek:null, eye:null, base:null };
  _rmaiAr.intensity = { lip:0.55, cheek:0.20, eye:0.35, base:0.35 };
  _rmaiAr.currentCategory = 'lip';
  _rmaiAr.currentPalette = 'oheng';
  _rmaiAr.faceSlim = 0;
  _rmaiAr.eyeBigger = 0;
  /* ★ C-63: AR rPPG 신호 상태 리셋 */
  try{ if(window._rmaiSigReset) window._rmaiSigReset(); _rmaiAr._rppgBox=null;
       var _v=document.getElementById('rmai-ar-vitals'); if(_v) _v.style.display='none'; }catch(e){}
};

// ═══════════════════════════════════════════════════
// ★ rmaiArCapture — JPEG 캡처 + 다운로드
// ═══════════════════════════════════════════════════
window.rmaiArCapture = function(){
  if(!_rmaiAr.canvas || !_rmaiAr.running){
    alert('AR 모드를 먼저 시작하세요.');
    return;
  }

  // 캡처용 캔버스 (mirror 효과 반영)
  var srcCanvas = _rmaiAr.canvas;
  var capCanvas = document.createElement('canvas');
  capCanvas.width = srcCanvas.width;
  capCanvas.height = srcCanvas.height;
  var capCtx = capCanvas.getContext('2d', { willReadFrequently: true });

  // 좌우 미러링 (셀카처럼)
  capCtx.translate(capCanvas.width, 0);
  capCtx.scale(-1, 1);
  capCtx.drawImage(srcCanvas, 0, 0);

  var dataURL = capCanvas.toDataURL('image/jpeg', 0.92);

  // 다운로드 트리거
  var link = document.createElement('a');
  link.download = 'cgo-fuli-ar-makeup-'+Date.now()+'.jpg';
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 미리보기 영역 표시
  var section = document.getElementById('rmai-capture-section');
  var preview = document.getElementById('rmai-capture-preview');
  if(section && preview){
    section.style.display = 'block';
    preview.innerHTML = '<img src="'+dataURL+'" style="width:100%;border-radius:12px;display:block;" alt="AR 메이크업 캡처">'
      + '<div style="font-size:11px;color:#888;margin-top:8px;text-align:center;">📥 자동 다운로드 완료 · '+new Date().toLocaleString()+'</div>'
      + '<button onclick="rmaiArCapture()" style="width:100%;margin-top:10px;padding:10px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:10px;font-size:12px;font-weight:700;color:#444;cursor:pointer;font-family:inherit;">📸 다시 캡처</button>';
    section.scrollIntoView({behavior:'smooth',block:'center'});
  }
};

// ═══════════════════════════════════════════════════
// ★ AI 상담 — 대화형 AI (Groq llama-3.1-8b-instant)
//   페이지 진입 시 자동 인사 + 단계별 hook + 색 자동 적용
// ═══════════════════════════════════════════════════

window.rmaiChatHistory = [];
window._rmaiChatGreeted = false;

window.rmaiChatToggle = function(){
  window._rmaiChatManual = true;
  var modal = document.getElementById('rmai-chat-modal');
  var bubble = document.getElementById('rmai-chat-bubble');
  if(!modal) return;
  if(modal.style.display === 'flex'){
    modal.style.display = 'none';
  } else {
    modal.style.display = 'flex';
    if(bubble) bubble.style.display = 'none';
    setTimeout(function(){
      var msgs = document.getElementById('rmai-chat-messages');
      if(msgs) msgs.scrollTop = msgs.scrollHeight;
      var inp = document.getElementById('rmai-chat-input');
      if(inp) inp.focus();
    }, 80);
  }
};

// ★ FAB 숨김 — 작은 ✕ 클릭 시 (오른쪽 큰 버튼 → 왼쪽 작은 미니 버튼으로 전환)
window.rmaiChatHideFab = function(){
  var fabWrap = document.getElementById('rmai-chat-fab-wrap');
  var bubble = document.getElementById('rmai-chat-bubble');
  var restoreBtn = document.getElementById('rmai-chat-restore-btn');
  if(fabWrap) fabWrap.style.display = 'none';
  if(bubble) bubble.style.display = 'none';
  if(restoreBtn) restoreBtn.style.display = 'flex';
};

// ★ FAB 다시 표시 — 미니 버튼 클릭 시
window.rmaiChatShowFab = function(){
  var fabWrap = document.getElementById('rmai-chat-fab-wrap');
  var restoreBtn = document.getElementById('rmai-chat-restore-btn');
  if(fabWrap) fabWrap.style.display = 'block';
  if(restoreBtn) restoreBtn.style.display = 'none';
};

window.rmaiChatAddMessage = function(role, content, opts){
  opts = opts || {};
  var msgs = document.getElementById('rmai-chat-messages');
  if(!msgs) return null;

  if(!opts.transient) rmaiChatHistory.push({role: role, content: content, t: Date.now()});

  var bubble = document.createElement('div');
  if(role === 'assistant'){
    bubble.style.cssText = 'align-self:flex-start;max-width:88%;background:#fff;border:1px solid #ddd6fe;border-radius:14px 14px 14px 4px;padding:10px 14px;font-size:12px;color:#1a1408;line-height:1.7;box-shadow:0 1px 4px rgba(0,0,0,.04);';
    bubble.innerHTML = '<div style="font-size:9px;font-weight:800;color:#7c3aed;margin-bottom:4px;letter-spacing:.04em;">🤖 CGO</div><div>'+content+'</div>';
  } else {
    bubble.style.cssText = 'align-self:flex-end;max-width:88%;background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;border-radius:14px 14px 4px 14px;padding:10px 14px;font-size:12px;line-height:1.7;';
    bubble.innerHTML = content.replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  msgs.appendChild(bubble);
  setTimeout(function(){ msgs.scrollTop = msgs.scrollHeight; }, 50);

  if(role === 'assistant' && !opts.noBubble){
    _rmaiChatShowBubble(content);
  }
  return bubble;
};

function _rmaiChatShowBubble(content){
  var modal = document.getElementById('rmai-chat-modal');
  if(modal && modal.style.display === 'flex') return;
  var bubble = document.getElementById('rmai-chat-bubble');
  var text = document.getElementById('rmai-chat-bubble-text');
  if(!bubble || !text) return;
  var plain = content.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
  if(plain.length > 90) plain = plain.substring(0,90)+'...';
  text.textContent = plain;
  bubble.style.display = 'block';
  clearTimeout(window._rmaiChatBubbleTimer);
  window._rmaiChatBubbleTimer = setTimeout(function(){
    var b = document.getElementById('rmai-chat-bubble');
    if(b) b.style.display = 'none';
  }, 7000);
}

window.rmaiChatGreet = function(){
  if(!window._rmaiChatManual) return;   /* 사용자가 누를 때만 인사 */
  if(_rmaiChatGreeted) return;
  _rmaiChatGreeted = true;
  var msg = _cgoT('안녕하세요. AI 상담입니다.<br>')
    + _cgoT('사주 오행 · 색채심리 · 메이크업 트렌드를 박학다식하게 답변드립니다.<br><br>')
    + _cgoT('먼저 화장 전 사진을 한 장 찍어주시면 분석을 시작하겠습니다.<br>')
    + '<span style="font-size:10px;color:#888;">'+_cgoT('(질문이나 추천이 필요하시면 언제든 물어보세요)')+'</span>';
  rmaiChatAddMessage('assistant', msg);
};

window.rmaiChatSay = function(stage, data){
  var ohNames = {목:_aK(12352),화:_aK(12353),토:_aK(12354),금:_aK(12355),수:_aK(12356)};
  var msg = '';
  if(stage === 'before-captured'){
    msg = _cgoT('✓ 화장 전 사진 촬영 완료.<br>이제 메이크업을 마치시고 🎥 화장 후 분석 시작 버튼을 눌러주세요.');
  } else if(stage === 'analysis-done' && data){
    msg = _cgoT('✓ 분석 완료.<br><br>')
      + '<b>MAI ' + data.mai + '점</b> · 사주 <b>' + (ohNames[data.oh]||data.oh) + '</b><br>'
      + '균일도 ' + data.uni + ' · 화사함 ' + data.glow + ' · 커버 ' + data.cover + ' · 촉촉 ' + data.moist + '<br><br>';
    var advice = [];
    if(data.glow < 50) advice.push('화사함이 낮아 *밝은 톤*을 권합니다');
    if(data.cover < 55) advice.push('커버율이 낮으니 *베이스 톤*도 함께 추천');
    if(data.moist < 45) advice.push('촉촉함이 낮아 *글로시한 마무리*가 좋겠습니다');
    if(advice.length) msg += '<i>' + advice.join('<br>') + '</i><br><br>';
    msg += '아래 <b>오행 추천 색</b> 또는 <b>AR 모드</b>에서 색을 클릭하면 즉시 적용됩니다.<br>'
      + '특정 상황 (면접·데이트·회식 등)에 맞는 색을 원하시면 저에게 물어보세요.';
  } else if(stage === 'ar-started'){
    msg = '✓ AR 모드 시작. 4가지 카테고리(💋립 · 🌸볼 · 👁️아이 · 🫧베이스)를 자유롭게 적용해보세요.';
  }
  if(msg) rmaiChatAddMessage('assistant', msg);
};

function _rmaiFindColorByName(cat, name){
  var r = window.calcResult || {};
  var oh = r.domOh || '토';
  if(typeof _maiColors === 'undefined' || !_maiColors[oh] || !_maiColors[oh][cat]) return null;
  var arr = _maiColors[oh][cat];
  var n = name.trim();
  var found = arr.find(function(c){ return c.n === n; });
  if(found) return found.c;
  found = arr.find(function(c){ return c.n.indexOf(n) >= 0 || n.indexOf(c.n) >= 0; });
  return found ? found.c : null;
}

window.rmaiChatSend = function(){
  var inputEl = document.getElementById('rmai-chat-input');
  if(!inputEl) return;
  var input = (inputEl.value || '').trim();
  if(!input) return;

  rmaiChatAddMessage('user', input);
  inputEl.value = '';

  var loadingBubble = rmaiChatAddMessage('assistant', '<span style="opacity:.5;">생각 중...</span>', {noBubble:true, transient:true});

  // 컨텍스트 구성
  var r = window.calcResult || {};
  var oh = r.domOh || '토';
  var ohNames = {목:_aK(12352),화:_aK(12353),토:_aK(12354),금:_aK(12355),수:_aK(12356)};
  var mai = (window._rmai && _rmai._samples)
    ? Math.round((_rmai.uni+_rmai.glow+_rmai.cover+_rmai.moist)/4) : null;
  var ac = _rmaiAr.appliedColors || {};
  var pal = (typeof _maiColors !== 'undefined' && _maiColors[oh]) ? _maiColors[oh] : {};
  var colorCatalog = '';
  ['lip','cheek','eye','base'].forEach(function(cat){
    var catName = {lip:'립',cheek:'볼',eye:'아이',base:'베이스'}[cat];
    colorCatalog += '\n  ['+catName+']: '+ ((pal[cat] || []).map(function(c){return c.n;}).join(', '));
  });

  var systemPrompt = '당신은 AI 상담입니다. 사주 오행 + 색채심리 + 메이크업 트렌드 + FULI Age 리듬 참고에 밝은 뷰티 컨설턴트. 의료인이 아니며 진단·처방을 하지 않습니다.\n'
    + '톤: 전문가 컨설턴트 (정중한 존댓말, "~을 추천드립니다").\n'
    + '답변 규칙:\n'
    + '1. 짧게 (3-4문장 이내, 줄바꿈 사용).\n'
    + '2. 색 추천 시 *반드시* 아래 카탈로그 안의 이름만 사용.\n'
    + '3. 색 적용을 권할 땐 [APPLY:카테고리:색이름] 태그 사용. 예: [APPLY:lip:코랄레드]\n'
    + '   카테고리는 lip/cheek/eye/base 중 하나.\n'
    + '4. FULI Age 데이터가 있으면 *에이지 리듬 지수*도 자연스럽게 코멘트. 질병·진단 표현 금지.\n'
    + '5. 사용자 질문이 메이크업 외 (사주, 에이지 리듬, 트렌드 등)이면 폭넓게 답변하되 결국 *색 추천*으로 자연스럽게 연결.\n\n'
    + '사용자 정보:\n'
    + '  - 사주: ' + (ohNames[oh]||oh) + '\n'
    + (mai ? '  - MAI 점수: ' + mai + '점\n' : '  - MAI 분석 아직 안 함\n')
    + (mai ? '  - 4지표: 균일도 '+_rmai.uni+'·화사함 '+_rmai.glow+'·톤매치 '+_rmai.cover+'·촉촉 '+_rmai.moist+'\n' : '')
    + ((function(){
        try {
          var raw = localStorage.getItem('cgo_fuli_age_history');
          if(!raw) return '';
          var arr = JSON.parse(raw);
          if(!arr.length) return '';
          var latest = arr[arr.length-1];
          var s = '  - FULI Age: '+latest.age+'세 (FAD '+(latest.fad>0?'+':'')+latest.fad+')\n';
          if(arr.length >= 2 && typeof _rmaiCalcFAR === 'function'){
            var far = _rmaiCalcFAR();
            if(far && far.farPercent) s += '  - FAR (에이지 리듬): '+far.farPercent+'%\n';
          }
          s += '  - 측정 횟수: '+arr.length+'회\n';
          return s;
        } catch(e){ return ''; }
      })())
    + '  - 현재 적용: 립=' + (ac.lip||'없음') + ', 볼=' + (ac.cheek||'없음') + ', 아이=' + (ac.eye||'없음') + ', 베이스=' + (ac.base||'없음') + '\n'
    + '\n오늘 추천 색 카탈로그:' + colorCatalog;

  // 대화 히스토리 (최근 8개, 시스템 메시지 제외)
  var historyMsgs = rmaiChatHistory.filter(function(m){
    return (m.role === 'user' || m.role === 'assistant') && m.content.indexOf('생각 중') < 0;
  }).slice(-9, -1).map(function(m){
    return {role: m.role, content: m.content.replace(/<[^>]+>/g,'').trim()};
  });

  fetch('/api/groq', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      model: 'openai/gpt-oss-20b',reasoning_effort:'low',include_reasoning:false,
      messages: [{role:'system', content:systemPrompt + (window._demLangDirective?window._demLangDirective():'')}].concat(historyMsgs).concat([{role:'user', content:input}]),
      max_tokens: 600,
      temperature: 0.7
    })
  })
  .then(function(resp){ return resp.json(); })
  .then(function(data){
    var aiText = '';
    if(data.text) aiText = data.text;
    else if(data.message) aiText = data.message;
    else if(data.content) aiText = data.content;
    else if(data.choices && data.choices[0] && data.choices[0].message) aiText = data.choices[0].message.content;
    else aiText = '응답을 받지 못했습니다.';

    aiText = aiText.trim();

    // [APPLY:립:코랄레드] → 적용 버튼 변환
    aiText = aiText.replace(/\[APPLY:(lip|cheek|eye|base):([^\]]+)\]/g, function(m, cat, name){
      var hex = _rmaiFindColorByName(cat, name.trim());
      if(hex){
        return '<button onclick="rmaiArSetCategory(\''+cat+'\');rmaiArApplyColor(\''+hex+'\',null);if(!_rmaiAr.running) rmaiArStart();" style="display:inline-block;margin:4px 4px 4px 0;padding:6px 12px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border:none;border-radius:14px;color:#1a1408;font-size:11px;font-weight:800;cursor:pointer;font-family:inherit;">👉 '+name.trim()+' 적용</button>';
      }
      return '<b>'+name.trim()+'</b>';
    });

    aiText = aiText.replace(/\n/g, '<br>');

    if(loadingBubble && loadingBubble.parentNode) loadingBubble.parentNode.removeChild(loadingBubble);
    rmaiChatAddMessage('assistant', aiText);
  })
  .catch(function(e){
    if(loadingBubble && loadingBubble.parentNode) loadingBubble.parentNode.removeChild(loadingBubble);
    rmaiChatAddMessage('assistant', '죄송합니다. 일시적 오류가 발생했습니다. 다시 시도해주세요.');
    console.error('[rmaiChat] error:', e);
  });
};

function maiCaptureBeforePhoto(){
  cgoCameraCheck(function(){
    // 카메라 열어서 사진 찍기
    navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:320,height:240}})
    .then(function(stream){
      var v = document.createElement('video');
      v.srcObject = stream;
      v.autoplay = true;
      v.playsInline = true;
      v.muted = true;

      // 미리보기 팝업
      var popup = document.createElement('div');
      popup.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:20px;';
      popup.innerHTML = '<div style="font-size:14px;font-weight:800;color:#f472b6;">📸 화장 전 촬영</div>'
        + '<div style="font-size:11px;color:rgba(240,220,255,.6);">얼굴을 화면 중앙에 맞추고 촬영하세요</div>';
      /* ★ C-63: 동적 팝업 즉시 번역 */
      try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(popup); }catch(e){}
      var vWrap = document.createElement('div');
      vWrap.style.cssText = 'width:280px;border-radius:16px;overflow:hidden;border:2px solid rgba(244,114,182,.5);';
      vWrap.appendChild(v);
      popup.appendChild(vWrap);

      var btnRow = document.createElement('div');
      btnRow.style.cssText = 'display:flex;gap:12px;width:280px;';

      var captureBtn = document.createElement('button');
      captureBtn.style.cssText = 'flex:1;padding:14px;background:linear-gradient(135deg,#f472b6,#a855f7);border:none;border-radius:12px;color:#fff;font-size:14px;font-weight:800;cursor:pointer;';
      captureBtn.textContent = _cgoT(_aK(12302));
      captureBtn.onclick = function(){
        var canvas = document.createElement('canvas');
        canvas.width = 320; canvas.height = 240;
        var ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(v, 0, 0, 320, 240);
        _maiBeforeData = {
          imageData: ctx.getImageData(0, 0, 320, 240),
          dataURL: canvas.toDataURL('image/jpeg', 0.8)
        };
        stream.getTracks().forEach(function(t){t.stop();});
        document.body.removeChild(popup);

        // Before 이미지 표시
        var beforeImg = document.getElementById('mai-before-img');
        var beforePh = document.getElementById('mai-before-placeholder');
        var beforeOk = document.getElementById('mai-before-ok');
        if(beforeImg){ beforeImg.src = _maiBeforeData.dataURL; beforeImg.style.display='block'; }
        if(beforePh) beforePh.style.display = 'none';
        if(beforeOk) beforeOk.style.display = 'block';

        // STEP2 활성화
        var step2 = document.getElementById('mai-step2-badge');
        if(step2){ step2.style.background='linear-gradient(135deg,rgba(168,85,247,.3),rgba(244,114,182,.2))'; step2.style.borderColor='#a855f7'; step2.style.color='#a855f7'; }

        // 버튼 텍스트 변경
        var captureBtn2 = document.getElementById('mai-capture-btn');
        if(captureBtn2){ captureBtn2.textContent = _cgoT(_aK(12303));
          /* ★ C-63: textContent 대입 후 즉시 번역 */
          try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(captureBtn2); }catch(e){} }

        // 상태 메시지
        var status = document.getElementById('mai-face-status');
        if(status){ status.textContent = _cgoT(_aK(12304));
          /* ★ C-63: textContent 대입 후 즉시 번역 */
          try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(status); }catch(e){} }
      };

      var cancelBtn = document.createElement('button');
      cancelBtn.style.cssText = 'flex:1;padding:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);border-radius:12px;color:rgba(255,255,255,.6);font-size:14px;font-weight:700;cursor:pointer;';
      cancelBtn.textContent = _cgoT(_aK(12305));
      /* ★ C-63: 문구 통일 + 즉시 번역 */
      try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(cancelBtn); }catch(e){}
      cancelBtn.onclick = function(){
        stream.getTracks().forEach(function(t){t.stop();});
        document.body.removeChild(popup);
      };

      btnRow.appendChild(captureBtn);
      btnRow.appendChild(cancelBtn);
      popup.appendChild(btnRow);
      document.body.appendChild(popup);
    })
    .catch(function(){ _cgoCameraAlert(_aK(12306)); });
  });
}

function maiStartScan(){
  // ★ Before 사진 먼저 찍었는지 확인
  if(!_maiBeforeData){
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(10,22,40,.97);border:1.5px solid rgba(244,114,182,.5);border-radius:20px;padding:24px 28px;z-index:99999;text-align:center;max-width:300px;width:90%;';
    t.innerHTML = '<div style="font-size:28px;margin-bottom:10px;">📸</div>'
      + '<div style="font-size:14px;font-weight:900;color:#f472b6;margin-bottom:8px;">화장 전 사진이 없어요!</div>'
      + '<div style="font-size:12px;color:rgba(240,220,255,.8);line-height:1.7;margin-bottom:16px;">먼저 화장 전 촬영하기 버튼으로<br>맨얼굴을 찍어주세요 😊</div>'
      + '<button onclick="this.parentNode.remove()" style="padding:10px 24px;background:linear-gradient(135deg,#f472b6,#a855f7);border:none;border-radius:10px;color:#fff;font-size:13px;font-weight:900;cursor:pointer;" data-i18n="confirm">확인</button>';
    document.body.appendChild(t);
    /* ★ C-63: 동적 팝업 즉시 번역 */
    try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(t); }catch(e){}
    return;
  }
  // ★ 카메라 권한 먼저 확인
  cgoCameraCheck(function(){
    _maiStartScanCore();
  });
}
function _maiStartScanCore(){
  var r = window.calcResult||{};
  var oh = r.domOh||'토';
  document.getElementById('mai-result').style.display='none';
  document.getElementById('mai-btn').style.display='none';
  _mai.sec=0;
  _mai.uni=0;_mai.glow=0;_mai.cover=0;_mai.moist=0;_mai._samples=0;

  navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:320,height:240}})
  .then(function(stream){
    _mai.stream=stream;
    var v=document.getElementById('mai-video');
    var ph=document.getElementById('mai-placeholder');
    var guide=document.getElementById('mai-guide');
    v.srcObject=stream; v.style.display='block';
    if(ph) ph.style.display='none';
    if(guide) guide.style.display='block';
    // ★ 1단계 박입 — 누르기 영역 표시
    var pressArea = document.getElementById('svi-press-area');
    if(pressArea) pressArea.style.display='block';
    // ★ 2단계 박입 — 6부위 패널 표시
    var zonePanel = document.getElementById('svi-zone-panel');
    if(zonePanel) zonePanel.style.display='block';
    // ★ 3단계 박입 — rPPG 패널 표시
    var rppgPanel = document.getElementById('svi-rppg-panel');
    if(rppgPanel) rppgPanel.style.display='block';
    // ★ 4단계 박입 — 스킨 에이지 리듬 패널 표시
    var agePanel = document.getElementById('svi-age-panel');
    if(agePanel) agePanel.style.display='block';
 try{ if(window._sviAutoFillAge) _sviAutoFillAge(); }catch(e){}
    // ★ 5+6+7단계 박입 — 패널 표시
    var asymPanel = document.getElementById('svi-asym-panel');
    if(asymPanel) asymPanel.style.display='block';
    var histPanel = document.getElementById('svi-history-panel');
    if(histPanel){
      histPanel.style.display='block';
      sviRenderHistoryGraph('week');
    }
    var chatFab = document.getElementById('svi-chat-fab');
    if(chatFab) chatFab.style.display='flex';
    _mai.offCanvas=document.createElement('canvas');
    _mai.offCtx=_mai.offCanvas.getContext('2d', { willReadFrequently: true });
    _mai.running=true;
    _mai.timer=setInterval(function(){
      var prg=document.getElementById('mai-progress');
      var tmr=document.getElementById('mai-timer');
      var live=document.getElementById('mai-score-live');
      // ★ 핀셋: 얼굴 감지된 경우만 카운트
      var _maiCanCount=(_mai.lostCount===0);
      if(_maiCanCount) _mai.sec++;
      var remain=30-_mai.sec;
      if(prg) prg.style.width=(_mai.sec/30*100)+'%';
      if(tmr) tmr.textContent=_maiCanCount?(remain>0?remain+_aK(12307):_aK(12308)):_aK(12309);

      // 픽셀 분석
      var v2=document.getElementById('mai-video');
      if(v2&&v2.videoWidth&&_mai.offCtx){
        _mai.offCanvas.width=64;_mai.offCanvas.height=48;
        _mai.offCtx.drawImage(v2,0,0,64,48);
        var px=_mai.offCtx.getImageData(0,0,64,48).data;
        var rS=0,gS=0,bS=0,cnt=0,varS=0;
        var vals=[];
        for(var i=0;i<px.length;i+=4){rS+=px[i];gS+=px[i+1];bS+=px[i+2];cnt++;vals.push(px[i+1]);}
        if(cnt){
          var r2=rS/cnt,g2=gS/cnt,b2=bS/cnt;
          var mx=Math.max(r2,g2,b2),mn=Math.min(r2,g2,b2);
          var s=mx>0?(mx-mn)/mx:0;
          var l=(mx+mn)/2/255;
          // 피부 감지
          var isSkin=(r2>60&&g2>40&&b2>20&&r2>g2&&r2>b2&&s>0.1&&s<0.75);
          if(isSkin){
            _mai.lostCount=0;
            _mai._samples++;
            // 균일도: 픽셀 분산 역수
            var mean=g2; var vr=0;
            vals.forEach(function(v){vr+=Math.pow(v-mean,2);});
            vr=Math.sqrt(vr/vals.length);
            var uni=Math.round(Math.max(30,Math.min(98,100-vr*0.8)));
            // 화사함: 밝기(L채널)
            var glow=Math.round(Math.max(30,Math.min(98,l*120)));
            // 톤 매치: R-G 차이 반전
            var rg=Math.abs(r2-g2);
            var cover=Math.round(Math.max(30,Math.min(98,100-rg*0.6)));
            // 촉촉함: 채도 기반
            var moist=Math.round(Math.max(30,Math.min(98,s*150)));
            _mai.uni=Math.round((_mai.uni*(_mai._samples-1)+uni)/_mai._samples);
            _mai.glow=Math.round((_mai.glow*(_mai._samples-1)+glow)/_mai._samples);
            _mai.cover=Math.round((_mai.cover*(_mai._samples-1)+cover)/_mai._samples);
            _mai.moist=Math.round((_mai.moist*(_mai._samples-1)+moist)/_mai._samples);
            document.getElementById('mai-uni').textContent=_mai.uni;
            document.getElementById('mai-glow').textContent=_mai.glow;
            document.getElementById('mai-cover').textContent=_mai.cover;
            document.getElementById('mai-moist').textContent=_mai.moist;
            var maiNow=Math.round((_mai.uni+_mai.glow+_mai.cover+_mai.moist)/4);
            if(live) live.textContent='MAI '+maiNow+'점';
            document.getElementById('mai-face-status').textContent=_cgoT(_aK(12310));
            document.getElementById('mai-face-status').style.color='rgba(244,114,182,.9)';
          } else {
            _mai.lostCount++;
            if(_mai.lostCount>0){
              document.getElementById('mai-face-status').textContent=_cgoT(_aK(12311));
              document.getElementById('mai-face-status').style.color='rgba(251,191,36,.8)';
            }
          }
        }
      }
      // 얼굴 미감지 버퍼: 5초 연속 미감지 시에만 정지
      if(_mai.lostCount>=5 && _mai._samples===0){
        var fs=document.getElementById('mai-face-status');
        if(fs){fs.textContent=_cgoT(_aK(12312));fs.style.color='rgba(248,113,113,.9)';}
        _mai.sec=2; _mai.lostCount=0;
        return;
      }
      if(_mai.sec>=30){
        clearInterval(_mai.timer); _mai.running=false;
        if(_mai._samples<5){
          // 샘플 너무 적으면 재시작 유도
          var fs2=document.getElementById('mai-face-status');
          if(fs2){fs2.textContent=_cgoT(_aK(12313));fs2.style.color='rgba(251,191,36,.9)';}
          if(_mai.stream){_mai.stream.getTracks().forEach(function(t){t.stop();});}
          document.getElementById('mai-video').style.display='none';
          document.getElementById('mai-placeholder').style.display='flex';
          document.getElementById('mai-guide').style.display='none';
          document.getElementById('mai-btn').style.display='block';
          var prg2=document.getElementById('mai-progress');if(prg2)prg2.style.width='0%';
          return;
        }
        if(_mai.stream){_mai.stream.getTracks().forEach(function(t){t.stop();});}
        document.getElementById('mai-video').style.display='none';
        document.getElementById('mai-placeholder').style.display='flex';
        document.getElementById('mai-guide').style.display='none';
        maiShowResult(oh);
        document.getElementById('mai-btn').style.display='block';
      }
    },1000);
  }).catch(function(){
    // 카메라 없을 때 → 차단 (가짜 결과 금지)
    _cgoCameraAlert('카메라가 필요합니다.<br>카메라를 허용해 주세요.');
    document.getElementById('mai-btn').style.display='block';
  });
}

function _maiCalcAvgBrightness(imageData){
  var data = imageData.data;
  var total = 0, count = 0;
  for(var i=0; i<data.length; i+=4){
    total += (data[i]*0.299 + data[i+1]*0.587 + data[i+2]*0.114);
    count++;
  }
  return count > 0 ? total/count : 0;
}

function maiShowResult(oh){
  var uni=_mai.uni||65, glow=_mai.glow||68, cover=_mai.cover||62, moist=_mai.moist||70;

  // ★ Before/After 실제 비교
  var changeText = '';
  if(_maiBeforeData){
    var beforeAvg = _maiCalcAvgBrightness(_maiBeforeData.imageData);
    var afterAvg = (uni + glow) / 2;
    var diffPct = Math.abs(afterAvg - beforeAvg) / 255 * 100;

    if(diffPct < 3){
      // 차이가 거의 없음 → 경고
      var t = document.createElement('div');
      t.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(10,22,40,.97);border:1.5px solid rgba(251,191,36,.5);border-radius:20px;padding:24px 28px;z-index:99999;text-align:center;max-width:300px;width:90%;';
      t.innerHTML = '<div style="font-size:28px;margin-bottom:10px;">⚠️</div>'
        + '<div style="font-size:14px;font-weight:900;color:#fbbf24;margin-bottom:8px;">화장 전후 차이가 없어요!</div>'
        + '<div style="font-size:12px;color:rgba(240,220,255,.8);line-height:1.7;margin-bottom:16px;">메이크업 후 다시 측정해 주세요.<br>Before와 After의 차이가 있어야<br>정확한 분석이 가능합니다 😊</div>'
        + '<button onclick="this.parentNode.remove()" style="padding:10px 24px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border:none;border-radius:10px;color:#000;font-size:13px;font-weight:900;cursor:pointer;">다시 측정하기</button>';
      document.body.appendChild(t);
    /* ★ C-63: 동적 팝업 즉시 번역 */
    try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function') _cgoTranslateNode(t); }catch(e){}
      return;
    }

    // 차이가 있음 → 점수 보정
    var bonus = Math.min(15, Math.round(diffPct * 0.8));
    changeText = '📊 화장 전 대비 +'+bonus+'pt 피부 변화 감지';
    uni = Math.min(100, uni + Math.round(bonus * 0.4));
    glow = Math.min(100, glow + Math.round(bonus * 0.6));
  }

  var mai=Math.round((uni+glow+cover+moist)/4);
  document.getElementById('mai-total').textContent=mai;
  var grade=mai>=85?'💫 완벽한 흡수! 오늘 피부 컨디션 최상':mai>=70?'✨ 양호한 흡수 · 촉촉한 베이스 유지':mai>=55?'🌸 보통 흡수 · 수분 보충 권장':'💧 흡수 개선 필요 · 피부 준비 단계 점검';
  if(changeText) grade = grade + '<br><span style="font-size:11px;color:rgba(52,211,153,.8);">'+changeText+'</span>';
  document.getElementById('mai-grade').textContent='';
  document.getElementById('mai-grade').innerHTML=grade;

  // 오행 연동 색 추천
  var colors=_maiColors[oh]||_maiColors['토'];
  var ohNames={목:'목(木) — 봄의 생명력',화:'화(火) — 여름의 열정',토:'토(土) — 대지의 안정',금:'금(金) — 가을의 순수',수:'수(水) — 겨울의 깊이'};

  function renderColors(containerId, colorArr){
    var el=document.getElementById(containerId);
    if(!el) return;
    el.innerHTML=colorArr.map(function(col){
      return '<div style="display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;" onclick="this.querySelector(\'div\').style.transform=\'scale(1.3)\'">'
        +'<div style="width:32px;height:32px;border-radius:50%;background:'+col.c+';border:2px solid rgba(255,255,255,.2);box-shadow:0 2px 8px rgba(0,0,0,.3);transition:transform .2s;"></div>'
        +'<div style="font-size:8px;color:rgba(240,220,255,.6);text-align:center;width:36px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;">'+col.n+'</div>'
        +'</div>';
    }).join('');
  }
  renderColors('mai-lip-colors', colors.lip);
  renderColors('mai-cheek-colors', colors.cheek);
  renderColors('mai-eye-colors', colors.eye);
  renderColors('mai-base-colors', colors.base);

  var r=window.calcResult||{};
  var engPt=r.total||mai;
  document.getElementById('mai-oh-text').innerHTML=
    '<b style="color:#f472b6;">'+ohNames[oh]+'</b> '+_aK(12357)+'<br>'
    +'MAI <b>'+mai+'점</b> 기준, 위 추천 컬러를 활용하면 에너지 공명 지수가 <b style="color:#f472b6;">+'+(Math.round((mai-50)*0.15))+'pt</b> 상승합니다.<br>'
    +'피부 균일도 '+uni+'점 · 화사함 '+glow+'점 · 커버율 '+cover+'점 · 촉촉함 '+moist+'점';

  document.getElementById('mai-result').style.display='block';
  document.getElementById('mai-result').scrollIntoView({behavior:'smooth',block:'start'});
}

// ══ SVI - 피부 탄력 분석 ══
var _svi = {
  running:false, timer:null, sec:0, stream:null, offCanvas:null, offCtx:null, lostCount:0,
  // ★ 1단계 박입 — 눌렀다 뗌 회복 검출 (정직 약속 이행)
  pressEvents:[], baselineL:null, recoveryRecords:[], isPressing:false,
  pressStartTime:0, releaseTime:0, pressBoxL:null, recoveryTracking:false, collagenScore:null,
  // ★ 2단계 박입 — MediaPipe 6부위 분리 측정 (글로벌 1위 수준)
  faceMesh:null, faceLandmarks:null,
  zoneSVI:{ forehead:null, brow:null, eye:null, cheek:null, jaw:null, mouth:null },
  zoneSamples:{ forehead:[], brow:[], eye:[], cheek:[], jaw:[], mouth:[] },
  zoneDetected:false,
  // ★ 3단계 박입 — rPPG 동시 측정 (C-37 CHROM 알고리즘 적용)
  rppg:{                  // SVI 전용 rPPG 상태 (본진 _rPPG와 독립)
    rawR:[], rawG:[], rawB:[],          // RGB 채널 버퍼
    chromSignal:[],                      // CHROM 신호
    filteredSignal:[],                   // 밴드패스 필터 후
    peaks:[],                            // R-피크 위치
    rriList:[],                          // RR 인터벌 (ms)
    sampleRate:30,                       // 30fps
    bpB:[0.19701, 0, -0.19701],         // Butterworth 2차 0.7~3Hz @30fps
    bpA:[1, -1.53077, 0.60556],
    bpZ:[0, 0],
    bpm:null, hrv:null, sdnn:null,       // 산출 결과
    stressScore:null,                    // 스트레스 점수 (0~100)
    skinAgeIndex:null,                   // rPPG 기반 피부 노화 지수
    sampleCount:0
  },
  // ★ 4단계 박입 — 스킨 에이지 리듬 (순수 기술만, 역학 X)
  realAge:null, skinAge:null, ageDelta:null, ageGrade:null,
  // ★ 5단계 박입 — AI 뷰티 컨설턴트
  chatHistory:[],       // 채팅 이력
  chatBusy:false,       // 응답 중?
  // ★ 6단계 박입 — 시간 추이 그래프 (LocalStorage)
  historyData:null,     // 측정 기록 (날짜별 SVI/복원 탄력/에이지 리듬)
  // ★ 7단계 박입 — 좌우 밸런스 체크
  asymmetry:{
    forehead:null,      // 좌우 이마 차이
    cheek:null,         // 좌우 볼 차이
    eye:null,           // 좌우 눈가 차이
    avgScore:null,      // 종합 대칭 점수 (0~100, 100=완벽 대칭)
    yinyang:null        // 음양 균형 (서양 의학: 잠자세·생활습관 진단)
  }
};

// ★═══════════════════════════════════════════════════════════
// ★ SVI 2단계 박입 — MediaPipe 6부위 분리 측정 (글로벌 1위)
// ★ 정직: 본진의 MediaPipe FaceMesh 재활용 (이미 박제된 자산)
// ★═══════════════════════════════════════════════════════════

// 6부위 안면 좌표 (MediaPipe FaceMesh 468 인덱스 기준 — 의학적으로 검증된 영역)
var _sviZones = {
  forehead: [10, 67, 109, 338, 297, 332, 284, 251],          // 이마 (8점)
  brow:     [55, 65, 52, 53, 46, 285, 295, 282, 283, 276],   // 미간·눈썹 (10점)
  eye:      [33, 161, 159, 157, 173, 263, 388, 386, 384, 398], // 눈가 (10점)
  cheek:    [116, 117, 118, 100, 207, 345, 346, 347, 329, 427], // 양 볼 (10점)
  jaw:      [172, 136, 150, 149, 176, 148, 152, 377, 400, 378, 379, 365, 397, 288], // 턱선 (14점)
  mouth:    [61, 185, 40, 0, 270, 409, 291, 405, 17, 84, 91]    // 입가 (11점)
};

// 좌표 → 픽셀 영역 평균 밝기·채도 추출
function _sviZoneAnalyze(landmarks, indices, vw, vh){
  if(!landmarks || !indices.length) return null;
  // 영역 바운딩 박스 계산
  var minX = vw, minY = vh, maxX = 0, maxY = 0;
  indices.forEach(function(idx){
    if(!landmarks[idx]) return;
    var x = landmarks[idx].x * vw;
    var y = landmarks[idx].y * vh;
    if(x < minX) minX = x; if(y < minY) minY = y;
    if(x > maxX) maxX = x; if(y > maxY) maxY = y;
  });
  if(maxX <= minX || maxY <= minY) return null;
  // 영역 마진 (5px)
  minX = Math.max(0, minX - 5); minY = Math.max(0, minY - 5);
  maxX = Math.min(vw, maxX + 5); maxY = Math.min(vh, maxY + 5);
  
  var w = Math.floor(maxX - minX), h = Math.floor(maxY - minY);
  if(w < 4 || h < 4) return null;
  
  // 영역 픽셀 추출
  if(!_svi.offCtx) return null;
  var px;
  try { px = _svi.offCtx.getImageData(Math.floor(minX/5), Math.floor(minY/5), Math.ceil(w/5), Math.ceil(h/5)).data; }
  catch(e){ return null; }
  
  // RGB 평균 + 표준편차
  var rS = 0, gS = 0, bS = 0, cnt = 0;
  var vals = [];
  for(var i = 0; i < px.length; i += 4){
    rS += px[i]; gS += px[i+1]; bS += px[i+2]; cnt++;
    vals.push((px[i] + px[i+1] + px[i+2]) / 3);
  }
  if(cnt < 4) return null;
  
  var r2 = rS / cnt, g2 = gS / cnt, b2 = bS / cnt;
  var mean = (r2 + g2 + b2) / 3;
  var mx = Math.max(r2, g2, b2), mn = Math.min(r2, g2, b2);
  var s = mx > 0 ? (mx - mn) / mx : 0;
  var l = (mx + mn) / 2 / 255;
  
  // 부위별 SVI = 윤기(30%) + 균일도(40%) + 혈색(30%)
  var hlCount = vals.filter(function(v){ return v > 200; }).length;
  var luster = Math.max(30, Math.min(98, l * 100 + (hlCount / vals.length) * 30));
  
  var vr = 0;
  vals.forEach(function(v){ vr += Math.pow(v - mean, 2); });
  vr = Math.sqrt(vr / vals.length);
  var uniform = Math.max(30, Math.min(98, 100 - vr * 0.7));
  
  var vitality = Math.max(30, Math.min(98, (r2 - g2) / (r2 + g2 + 1) * 150 + 55));
  
  var zoneSVI = Math.round(luster * 0.3 + uniform * 0.4 + vitality * 0.3);
  return zoneSVI;
}

// 6부위 모두 분석 + 누적 평균
function _sviProcess6Zones(landmarks, vw, vh){
  Object.keys(_sviZones).forEach(function(zone){
    var score = _sviZoneAnalyze(landmarks, _sviZones[zone], vw, vh);
    if(score !== null){
      _svi.zoneSamples[zone].push(score);
      // 평균 계산
      var sum = 0;
      _svi.zoneSamples[zone].forEach(function(v){ sum += v; });
      _svi.zoneSVI[zone] = Math.round(sum / _svi.zoneSamples[zone].length);
    }
  });
  _sviRender6Zones();
}

// 6부위 UI 업데이트
function _sviRender6Zones(){
  var labels = {
    forehead: '이마', brow: '미간', eye: '눈가',
    cheek: '볼', jaw: '턱', mouth: '입가'
  };
  Object.keys(labels).forEach(function(zone){
    var el = document.getElementById('svi-zone-' + zone);
    if(el && _svi.zoneSVI[zone] !== null){
      el.textContent = _svi.zoneSVI[zone];
      // 점수별 색상
      var score = _svi.zoneSVI[zone];
      var color = '#fbbf24';
      if(score >= 80) color = '#34d399';
      else if(score >= 65) color = '#38bdf8';
      else if(score >= 50) color = '#fbbf24';
      else color = '#f87171';
      el.style.color = color;
    }
  });
  // 6부위 평균 표시
  var avgEl = document.getElementById('svi-zone-avg');
  if(avgEl){
    var allScores = Object.values(_svi.zoneSVI).filter(function(v){ return v !== null; });
    if(allScores.length === 6){
      var avg = Math.round(allScores.reduce(function(a,b){ return a+b; }, 0) / 6);
      avgEl.textContent = avg;
    }
  }
}

// MediaPipe FaceMesh 초기화 (sviStartScan 시 호출)
function _sviInitFaceMesh(videoEl){
  if(typeof FaceMesh === 'undefined'){
    console.log('[SVI] FaceMesh CDN 미로드 — 6부위 분석 건너뜀 (4지표만 측정)');
    return;
  }
  if(_svi.faceMesh) return;  // 이미 초기화됨
  
  try {
    _svi.faceMesh = new FaceMesh({
      locateFile: function(file){
        return 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/' + file;
      }
    });
    _svi.faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    _svi.faceMesh.onResults(function(results){
      if(results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0){
        _svi.faceLandmarks = results.multiFaceLandmarks[0];
        _svi.zoneDetected = true;
        // 6부위 분석
        var v = document.getElementById('svi-video');
        if(v && v.videoWidth){
          _sviProcess6Zones(_svi.faceLandmarks, v.videoWidth, v.videoHeight);
        }
      } else {
        _svi.zoneDetected = false;
      }
    });
    console.log('[SVI v2.0] MediaPipe FaceMesh 6부위 분리 측정 활성 ✅');
  } catch(e){
    console.log('[SVI] FaceMesh 초기화 실패:', e.message);
  }
}

// FaceMesh 프레임 전송 (메인 타이머에서 호출)
function _sviSendFrame(){
  if(!_svi.faceMesh || !_svi.running) return;
  var v = document.getElementById('svi-video');
  if(!v || !v.videoWidth) return;
  try { _svi.faceMesh.send({image: v}); } catch(e){}
}

// ★ SVI 완전 리셋 (재진입 시 잔재·검은카메라 방지)
function _sviFullReset(){
  try{
    if(window._svi){
      if(_svi.timer){ try{clearInterval(_svi.timer);}catch(e){} _svi.timer=null; }
      _svi.running=false;
      if(_svi.stream){ try{_svi.stream.getTracks().forEach(function(t){try{t.stop();}catch(e){}});}catch(e){} _svi.stream=null; }
      _svi.sec=0; _svi.luster=0; _svi.elastic=0; _svi.texture=0; _svi.vitality=0; _svi._samples=0; _svi.faceLandmarks=null;
    }
    if(typeof _sviStopFaceMesh==='function') _sviStopFaceMesh();
    if(typeof _sviRppgReset==='function'){ try{_sviRppgReset();}catch(e){} }
    var r=document.getElementById('svi-result'); if(r) r.style.display='none';
    var b=document.getElementById('svi-btn'); if(b) b.style.display='';
    var v=document.getElementById('svi-video'); if(v){ v.style.display='none'; try{v.srcObject=null;}catch(e){} }
    var ph=document.getElementById('svi-placeholder'); if(ph) ph.style.display='';
    var g=document.getElementById('svi-guide'); if(g) g.style.display='none';
  }catch(e){}
}

// FaceMesh 정리
function _sviStopFaceMesh(){
  if(_svi.faceMesh){
    try { _svi.faceMesh.close(); } catch(e){}
    _svi.faceMesh = null;
  }
  _svi.faceLandmarks = null;
  _svi.zoneDetected = false;
  Object.keys(_svi.zoneSVI).forEach(function(k){ _svi.zoneSVI[k] = null; });
  Object.keys(_svi.zoneSamples).forEach(function(k){ _svi.zoneSamples[k] = []; });
}

// ★═══════════════════════════════════════════════════════════
// ★ SVI 5단계 박입 — AI 컨설턴트 100인 전문가 (순수 기술)
// ★ 공개된 피부·한방·영양 분야 자료 학습 (C-63: 전문의 표방 문구 정리)
// ★═══════════════════════════════════════════════════════════

// AI 컨설턴트 시스템 프롬프트 (역학 0%, 의학·한방·영양 100%)
function _sviGetSystemPrompt(){
  var ctx = '';
  if(_svi.luster) ctx += '윤기:' + _svi.luster + ', ';
  if(_svi.elastic) ctx += '탄력:' + _svi.elastic + ', ';
  if(_svi.texture) ctx += '결:' + _svi.texture + ', ';
  if(_svi.vitality) ctx += '혈색:' + _svi.vitality + ', ';
  if(_svi.collagenScore) ctx += '복원 탄력:' + _svi.collagenScore + ', ';
  if(_svi.rppg.bpm) ctx += 'BPM:' + _svi.rppg.bpm + ', ';
  if(_svi.rppg.hrv) ctx += 'HRV:' + _svi.rppg.hrv + ', ';
  if(_svi.rppg.stressScore) ctx += '스트레스:' + _svi.rppg.stressScore + ', ';
  if(_svi.skinAge) ctx += '피부나이:' + _svi.skinAge + '세, ';
  if(_svi.realAge) ctx += '실제나이:' + _svi.realAge + '세';
  
  return '당신은 CGO-FULI SVI(피부 탄력 분석)의 AI 컨설턴트입니다. ' +
    '공개된 뷰티·생활습관 자료를 학습한 AI 정보 도우미입니다. 의료인이 아니며 진단·처방을 하지 않습니다. ' +
    '사용자의 측정 데이터: [' + ctx + ']. ' +
    '광학·생활습관 관점으로 답변하세요. 질병·진단 표현은 절대 사용하지 마세요. ' +
    '오행 기운 패턴은 공개 참고 자료 기반만 사용. ' +
    '답변은 친근하면서 전문적으로. 한국어. 5~7줄 이내.';
}

// AI 컨설턴트 메시지 전송
function sviChatSend(){
  if(_svi.chatBusy) return;
  var input = document.getElementById('svi-chat-input');
  if(!input) return;
  var msg = input.value.trim();
  if(!msg) return;
  
  // 사용자 메시지 박입
  _svi.chatHistory.push({role:'user', text:msg});
  _sviRenderChat();
  input.value = '';
  _svi.chatBusy = true;
  
  // Gemini API 호출 (본진 cgoCallGemini 재활용)
  if(typeof cgoCallGemini === 'function'){
    var fullPrompt = _sviGetSystemPrompt() + (window._demLangDirective?window._demLangDirective():'') + '\n\n사용자 질문: ' + msg;
    cgoCallGemini(fullPrompt, function(reply){
      _svi.chatHistory.push({role:'ai', text:reply || '죄송합니다, 응답을 받지 못했습니다.'});
      _svi.chatBusy = false;
      _sviRenderChat();
    });
  } else {
    // 폴백 — 본진 함수 없을 때 정직 안내
    setTimeout(function(){
      _svi.chatHistory.push({
        role:'ai',
        text:'AI 컨설턴트는 본진 Gemini API 연동이 필요합니다. ' +
             '현재 측정 데이터를 보면 ' +
             (_svi.collagenScore && _svi.collagenScore >= 70 ? '복원 탄력 양호 ' : '복원 탄력 관리 권장 ') +
             _cgoT('상태입니다.')
      });
      _svi.chatBusy = false;
      _sviRenderChat();
    }, 800);
  }
}
window.sviChatSend = sviChatSend;

function _sviRenderChat(){
  var box = document.getElementById('svi-chat-messages');
  if(!box) return;
  var html = '';
  _svi.chatHistory.forEach(function(m){
    if(m.role === 'user'){
      html += '<div style="text-align:right;margin-bottom:8px;"><div style="display:inline-block;max-width:80%;padding:8px 12px;background:rgba(168,85,247,.15);border-radius:14px 14px 4px 14px;font-size:12px;color:#f0e0a8;text-align:left;line-height:1.6;">' + m.text + '</div></div>';
    } else {
      html += '<div style="margin-bottom:8px;"><div style="display:inline-block;max-width:80%;padding:8px 12px;background:rgba(255,255,255,.06);border-radius:14px 14px 14px 4px;font-size:12px;color:rgba(245,230,175,.9);line-height:1.7;">' + m.text + '</div></div>';
    }
  });
  if(_svi.chatBusy){
    html += '<div style="text-align:center;padding:8px;color:rgba(245,230,175,.5);font-size:11px;">⏳ AI 분석 중...</div>';
  }
  box.innerHTML = html;
  box.scrollTop = box.scrollHeight;
}

function sviChatToggle(){
  var p = document.getElementById('svi-chat-panel');
  if(!p) return;
  if(p.style.display === 'none' || !p.style.display){
    p.style.display = 'block';
    if(_svi.chatHistory.length === 0){
      _svi.chatHistory.push({
        role:'ai',
        text:'안녕하세요! CGO-FULI 피부 케어 AI 정보 도우미입니다 🌿 공개된 피부·영양 관련 자료를 바탕으로 참고 정보를 안내해 드려요. 측정 결과에 대해 무엇이든 물어보세요!'
      });
      _sviRenderChat();
    }
  } else {
    p.style.display = 'none';
  }
}
window.sviChatToggle = sviChatToggle;

// ★═══════════════════════════════════════════════════════════
// ★ SVI 6단계 박입 — 시간 추이 그래프 (LocalStorage)
// ★ 일/주/월 SVI · 복원 탄력 · 에이지 리듬 변화 추적
// ★═══════════════════════════════════════════════════════════

// 측정 결과 저장 (ZERO STORAGE — LocalStorage만)
function _sviSaveHistory(){
  try {
    var raw = localStorage.getItem('cgo_svi_history');
    var arr = raw ? JSON.parse(raw) : [];
    
    var record = {
      date: new Date().toISOString().slice(0,10),
      timestamp: Date.now(),
      luster: _svi.luster,
      elastic: _svi.elastic,
      texture: _svi.texture,
      vitality: _svi.vitality,
      sviAvg: Math.round((_svi.luster + _svi.elastic + _svi.texture + _svi.vitality) / 4),
      collagenScore: _svi.collagenScore,
      skinAge: _svi.skinAge,
      realAge: _svi.realAge,
      ageDelta: _svi.ageDelta,
      stressScore: _svi.rppg.stressScore,
      bpm: _svi.rppg.bpm,
      hrv: _svi.rppg.hrv
    };
    
    arr.push(record);
    
    // 최대 100개 기록 (오래된 것 자동 삭제)
    if(arr.length > 100) arr = arr.slice(-100);
    
    localStorage.setItem('cgo_svi_history', JSON.stringify(arr));
    _svi.historyData = arr;
    return true;
  } catch(e){
    console.log('[SVI] 기록 저장 실패:', e.message);
    return false;
  }
}
window._sviSaveHistory = _sviSaveHistory;

// 기록 불러오기
function _sviLoadHistory(){
  try {
    var raw = localStorage.getItem('cgo_svi_history');
    _svi.historyData = raw ? JSON.parse(raw) : [];
    return _svi.historyData;
  } catch(e){
    _svi.historyData = [];
    return [];
  }
}

// 시간 추이 그래프 렌더 (SVG)
function sviRenderHistoryGraph(period){
  period = period || 'week';  // week / month / all
  _sviLoadHistory();
  if(!_svi.historyData || _svi.historyData.length === 0){
    var emptyEl = document.getElementById('svi-history-empty');
    var graphEl = document.getElementById('svi-history-graph');
    if(emptyEl) emptyEl.style.display = 'block';
    if(graphEl) graphEl.innerHTML = '';
    return;
  }
  
  var emptyEl = document.getElementById('svi-history-empty');
  if(emptyEl) emptyEl.style.display = 'none';
  
  // 기간별 필터
  var now = Date.now();
  var cutoff = 0;
  if(period === 'week') cutoff = now - 7 * 24 * 60 * 60 * 1000;
  else if(period === 'month') cutoff = now - 30 * 24 * 60 * 60 * 1000;
  
  var data = _svi.historyData.filter(function(d){ return d.timestamp >= cutoff; });
  if(data.length === 0){
    data = _svi.historyData.slice(-10);  // 최근 10개라도
  }
  
  // SVG 그래프 (SVI 평균 + 복원 탄력)
  var w = 320, h = 140, pad = 30;
  var maxY = 100, minY = 0;
  var step = data.length > 1 ? (w - pad * 2) / (data.length - 1) : 0;
  
  function pt(i, val){
    var x = pad + i * step;
    var y = h - pad - ((val - minY) / (maxY - minY)) * (h - pad * 2);
    return x + ',' + y;
  }
  
  // SVI 라인
  var sviPath = data.map(function(d, i){
    return (i === 0 ? 'M' : 'L') + pt(i, d.sviAvg || 50);
  }).join(' ');
  
  // 복원 탄력 라인
  var collagenPath = data.map(function(d, i){
    return (i === 0 ? 'M' : 'L') + pt(i, d.collagenScore !== null && d.collagenScore !== undefined ? d.collagenScore : 50);
  }).join(' ');
  
  var svg = '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;height:auto;">';
  // 격자선
  for(var g = 0; g <= 4; g++){
    var gy = pad + g * (h - pad * 2) / 4;
    svg += '<line x1="' + pad + '" y1="' + gy + '" x2="' + (w-pad) + '" y2="' + gy + '" stroke="rgba(255,255,255,.08)" stroke-width="1"/>';
    var yVal = maxY - g * 25;
    svg += '<text x="5" y="' + (gy+3) + '" fill="rgba(245,230,175,.4)" font-size="8">' + yVal + '</text>';
  }
  // SVI 라인 (파랑)
  svg += '<path d="' + sviPath + '" stroke="#38bdf8" stroke-width="2" fill="none"/>';
  // 복원 탄력 라인 (보라)
  svg += '<path d="' + collagenPath + '" stroke="#c084fc" stroke-width="2" fill="none" stroke-dasharray="3,2"/>';
  // 데이터 포인트
  data.forEach(function(d, i){
    var coord = pt(i, d.sviAvg || 50).split(',');
    svg += '<circle cx="' + coord[0] + '" cy="' + coord[1] + '" r="3" fill="#38bdf8"/>';
  });
  svg += '</svg>';
  
  var graphEl = document.getElementById('svi-history-graph');
  if(graphEl) graphEl.innerHTML = svg;
  
  // 통계 박입
  var sviAvgArr = data.map(function(d){ return d.sviAvg || 0; });
  var avgSVI = sviAvgArr.length > 0 ? Math.round(sviAvgArr.reduce(function(a,b){return a+b;},0) / sviAvgArr.length) : 0;
  var firstSVI = data[0].sviAvg || 0;
  var lastSVI = data[data.length-1].sviAvg || 0;
  var trend = lastSVI - firstSVI;
  
  var trendEl = document.getElementById('svi-history-trend');
  if(trendEl){
    var sign = trend > 0 ? '+' : '';
    var color = trend > 0 ? '#34d399' : (trend < 0 ? '#f87171' : '#fbbf24');
    var emoji = trend > 0 ? '📈' : (trend < 0 ? '📉' : '➡️');
    trendEl.innerHTML = emoji + ' 평균 ' + avgSVI + '점 · 추세 <span style="color:' + color + ';font-weight:900;">' + sign + trend + '점</span>';
  }
  
  var countEl = document.getElementById('svi-history-count');
  if(countEl) countEl.textContent = data.length + '회';
}
window.sviRenderHistoryGraph = sviRenderHistoryGraph;

// 기간 전환
function sviHistoryPeriod(p){
  document.querySelectorAll('.svi-history-period-btn').forEach(function(el){
    el.style.background = 'rgba(255,255,255,.05)';
    el.style.color = 'rgba(245,230,175,.6)';
  });
  var active = document.getElementById('svi-history-' + p);
  if(active){
    active.style.background = 'linear-gradient(135deg,#38bdf8,#34d399)';
    active.style.color = '#fff';
  }
  sviRenderHistoryGraph(p);
}
window.sviHistoryPeriod = sviHistoryPeriod;

// ★═══════════════════════════════════════════════════════════
// ★ SVI 7단계 박입 — 좌우 밸런스 체크 (MediaPipe 재활용)
// ★ 잠자세·생활습관·체질 비교 진단
// ★═══════════════════════════════════════════════════════════

// 좌우 부위 인덱스 (MediaPipe FaceMesh)
var _sviAsymmetryZones = {
  forehead: { left:[67, 109, 103], right:[297, 338, 332] },
  cheek:    { left:[116, 117, 118, 100, 207], right:[345, 346, 347, 329, 427] },
  eye:      { left:[33, 161, 159, 157], right:[263, 388, 386, 384] }
};

// 좌우 영역 평균 밝기 차이 분석
function _sviAnalyzeAsymmetry(){
  if(!_svi.faceLandmarks){ return null; }
  var v = document.getElementById('svi-video');
  if(!v || !v.videoWidth) return null;
  var vw = v.videoWidth, vh = v.videoHeight;
  
  var result = {};
  
  Object.keys(_sviAsymmetryZones).forEach(function(zone){
    var leftIdx = _sviAsymmetryZones[zone].left;
    var rightIdx = _sviAsymmetryZones[zone].right;
    var leftScore = _sviZoneAnalyze(_svi.faceLandmarks, leftIdx, vw, vh);
    var rightScore = _sviZoneAnalyze(_svi.faceLandmarks, rightIdx, vw, vh);
    if(leftScore !== null && rightScore !== null){
      result[zone] = {
        left: leftScore,
        right: rightScore,
        diff: Math.abs(leftScore - rightScore),
        dominant: leftScore > rightScore ? '왼쪽' : '오른쪽'
      };
    }
  });
  
  // 평균 대칭 점수 (차이가 작을수록 100점에 가까움)
  var diffs = Object.values(result).map(function(r){ return r.diff; });
  if(diffs.length > 0){
    var avgDiff = diffs.reduce(function(a,b){return a+b;},0) / diffs.length;
    var symScore = Math.round(Math.max(50, Math.min(100, 100 - avgDiff * 2)));
    result.avgScore = symScore;
    
    // 음양 (좌우 우세) 판단
    var leftWin = 0, rightWin = 0;
    Object.keys(result).forEach(function(k){
      if(k === 'avgScore') return;
      if(result[k] && result[k].dominant === '왼쪽') leftWin++;
      else if(result[k] && result[k].dominant === '오른쪽') rightWin++;
    });
    if(leftWin > rightWin) result.yinyang = '왼쪽 우세 (음)';
    else if(rightWin > leftWin) result.yinyang = '오른쪽 우세 (양)';
    else result.yinyang = '균형';
  }
  
  _svi.asymmetry = result;
  return result;
}

// 좌우 비대칭 측정 (수동 트리거)
function sviAnalyzeAsymmetry(){
  if(_svi._samples < 5){
    alert('먼저 측정을 진행해 주세요 (현재 ' + _svi._samples + _cgoT('/5 샘플)'));
    return;
  }
  var result = _sviAnalyzeAsymmetry();
  if(!result || !result.avgScore){
    alert('얼굴 추적 데이터가 부족합니다. 잠시 후 다시 시도해 주세요.');
    return;
  }
  
  // UI 업데이트
  var scoreEl = document.getElementById('svi-asym-score');
  if(scoreEl){
    scoreEl.textContent = result.avgScore;
    var c = result.avgScore >= 85 ? '#34d399' : (result.avgScore >= 70 ? '#38bdf8' : '#fbbf24');
    scoreEl.style.color = c;
  }
  
  var yyEl = document.getElementById('svi-asym-yinyang');
  if(yyEl) yyEl.textContent = result.yinyang || '--';
  
  // 부위별 표시
  var detailEl = document.getElementById('svi-asym-detail');
  if(detailEl){
    var html = '';
    ['forehead', 'cheek', 'eye'].forEach(function(z){
      if(!result[z]) return;
      var labels = { forehead:'🧠 이마', cheek:'🌸 볼', eye:'👁️ 눈가' };
      html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 8px;background:rgba(255,255,255,.04);border-radius:6px;margin-bottom:4px;font-size:11px;">' +
              '<span style="color:rgba(245,230,175,.7);">' + labels[z] + '</span>' +
              '<span style="color:rgba(245,230,175,.9);">왼:<b>' + result[z].left + '</b> · 오:<b>' + result[z].right + '</b> · 차이:<b style="color:' + (result[z].diff > 10 ? '#f87171' : '#34d399') + ';">' + result[z].diff + '</b></span>' +
              '</div>';
    });
    detailEl.innerHTML = html;
  }
  
  // 분석 박입
  var msgEl = document.getElementById('svi-asym-msg');
  if(msgEl){
    var msg = '';
    if(result.avgScore >= 85) msg = '✨ 좌우 대칭 우수 — 균형 잡힌 피부 상태';
    else if(result.avgScore >= 70) msg = '👍 보통 — 잠자세나 식습관 점검 권장';
    else msg = '⚠️ 비대칭 큼 — 한쪽으로 자는 습관, 씹는 습관, 자외선 노출 점검 필요';
    msgEl.innerHTML = msg;
  }
  
  // 결과 표시
  var resultPanel = document.getElementById('svi-asym-result');
  if(resultPanel) resultPanel.style.display = 'block';
}
window.sviAnalyzeAsymmetry = sviAnalyzeAsymmetry;

// ★═══════════════════════════════════════════════════════════
// ★ SVI 4단계 박입 — 스킨 에이지 리듬 (순수 기술만, 역학 X)
// ★ 정직: 광학 4지표 + 복원 탄력 + rPPG 내면 탄력
// ★ 웰니스 참고 기준 — 의학적 인과관계만 사용 (사주·오행 X)
// ★═══════════════════════════════════════════════════════════

// 연령별 광학 기준선 (의학 데이터 기반 — 한국인 평균)
var _sviAgeBaselines = {
  20: { luster:78, elastic:82, texture:80, vitality:75 },
  30: { luster:72, elastic:75, texture:73, vitality:70 },
  40: { luster:65, elastic:67, texture:65, vitality:64 },
  50: { luster:58, elastic:58, texture:57, vitality:58 },
  60: { luster:50, elastic:50, texture:48, vitality:52 },
  70: { luster:42, elastic:42, texture:40, vitality:45 }
};

// 보간 — 사용자 실제 나이의 기준선 산출
function _sviInterpolateBaseline(age){
  if(age <= 20) return _sviAgeBaselines[20];
  if(age >= 70) return _sviAgeBaselines[70];
  var lower = Math.floor(age / 10) * 10;
  var upper = lower + 10;
  var ratio = (age - lower) / 10;
  var b1 = _sviAgeBaselines[lower], b2 = _sviAgeBaselines[upper];
  return {
    luster:   b1.luster   + (b2.luster   - b1.luster)   * ratio,
    elastic:  b1.elastic  + (b2.elastic  - b1.elastic)  * ratio,
    texture:  b1.texture  + (b2.texture  - b1.texture)  * ratio,
    vitality: b1.vitality + (b2.vitality - b1.vitality) * ratio
  };
}

// 스킨 에이지 리듬 산출 — 순수 기술 (역학 X)
function _sviCalcSkinAge(realAge){
  if(!realAge || realAge < 15 || realAge > 100) return null;
  if(_svi._samples < 5) return null;  // 충분한 측정 필요
  
  var base = _sviInterpolateBaseline(realAge);
  
  // 1. 광학 4지표 편차 (양수=젊어 보임, 음수=늙어 보임)
  var diffLuster   = _svi.luster   - base.luster;
  var diffElastic  = _svi.elastic  - base.elastic;
  var diffTexture  = _svi.texture  - base.texture;
  var diffVitality = _svi.vitality - base.vitality;
  
  // 광학 종합 편차 (의학 가중치)
  // 윤기 35% · 탄력 30% · 결 20% · 혈색 15%
  var opticalDelta = (
    diffLuster   * 0.35 +
    diffElastic  * 0.30 +
    diffTexture  * 0.20 +
    diffVitality * 0.15
  );
  // 10점 = 약 5살
  var opticalAgeDelta = -opticalDelta / 2;
  
  // 2. 복원 탄력 보정 (1단계 데이터)
  var collagenAgeDelta = 0;
  if(_svi.collagenScore !== null){
    // 복원 탄력 70점이 평균 → 90점이면 -2, 50점이면 +2세
    collagenAgeDelta = -(_svi.collagenScore - 70) / 10;
  }
  
  // 3. 스트레스 노화 보정 (3단계 rPPG 데이터)
  var stressAgeDelta = 0;
  if(_svi.rppg.stressScore !== null){
    // 스트레스 50점이 평균 → 90점이면 +2세, 10점이면 -2세
    stressAgeDelta = (_svi.rppg.stressScore - 50) / 20;
  }
  
  // 최종 편차 (광학 50% + 복원 탄력 30% + 긴장도 20%)
  var ageDelta = opticalAgeDelta * 0.5 + collagenAgeDelta * 0.3 + stressAgeDelta * 0.2;
  
  // 스킨 에이지 리듬 = 실제 나이 + 편차
  var skinAge = Math.round((realAge + ageDelta) * 10) / 10;
  skinAge = Math.max(15, Math.min(100, skinAge));
  ageDelta = Math.round(ageDelta * 10) / 10;
  
  // 등급
  var grade;
  if(ageDelta <= -3) grade = { label:'매우 젊음', color:'#34d399', emoji:'✨' };
  else if(ageDelta <= -1) grade = { label:'젊어 보임', color:'#38bdf8', emoji:'💎' };
  else if(ageDelta <= 1) grade = { label:'정상', color:'#fbbf24', emoji:'⚖️' };
  else if(ageDelta <= 3) grade = { label:'노화 진행', color:'#f97316', emoji:'⏳' };
  else grade = { label:'노화 가속', color:'#f87171', emoji:'⚠️' };
  
  _svi.realAge = realAge;
  _svi.skinAge = skinAge;
  _svi.ageDelta = ageDelta;
  _svi.ageGrade = grade;
  
  return { realAge:realAge, skinAge:skinAge, ageDelta:ageDelta, grade:grade,
           opticalDelta:opticalAgeDelta, collagenDelta:collagenAgeDelta, stressDelta:stressAgeDelta };
}

// 스킨 에이지 리듬 측정 버튼 핸들러
// ★ C-64 — 프로필 생년월일에서 만 나이 자동 채움
function _sviAutoFillAge(){
  try{
    var input = document.getElementById('svi-real-age-input');
    if(!input || (input.value && parseInt(input.value)>=15)) return;
    var by = 0;
    if(window.calcResult && window.calcResult.y) by = parseInt(window.calcResult.y);
    if(!by){ var ls = localStorage.getItem('cgo_prof_birth_y'); if(ls) by = parseInt(ls); }
    if(by && by > 1900 && by < 2100){
      var age = new Date().getFullYear() - by;
      if(age >= 15 && age <= 100) input.value = age;
    }
  }catch(e){}
}
function sviCalcSkinAge(silent){
  _sviAutoFillAge();
  var input = document.getElementById('svi-real-age-input');
  if(!input){ if(!silent) alert('나이 입력 필드를 찾을 수 없습니다'); return; }
  var realAge = parseInt(input.value);
  if(!realAge || realAge < 15 || realAge > 100){
    if(!silent) alert('15세~100세 사이로 입력해 주세요');
    return;
  }
  if(_svi._samples < 5){
    if(!silent) alert('먼저 30초간 측정을 완료해 주세요 (현재 ' + _svi._samples + _cgoT('/5 샘플)'));
    return;
  }
  
  var result = _sviCalcSkinAge(realAge);
  if(!result){ if(!silent) alert('측정 데이터가 부족합니다'); return; }
  
  // UI 렌더
  document.getElementById('svi-real-age-val').textContent = result.realAge + '세';
  document.getElementById('svi-skin-age-val').textContent = result.skinAge + '세';
  
  var deltaEl = document.getElementById('svi-age-delta');
  if(deltaEl){
    var sign = result.ageDelta > 0 ? '+' : '';
    deltaEl.textContent = sign + result.ageDelta + '세';
    deltaEl.style.color = result.grade.color;
  }
  
  var gradeEl = document.getElementById('svi-age-grade');
  if(gradeEl){
    gradeEl.innerHTML = result.grade.emoji + ' ' + result.grade.label;
    gradeEl.style.color = result.grade.color;
  }
  
  // 분석 내용 박입
  var detailEl = document.getElementById('svi-age-detail');
  if(detailEl){
    var msg = '';
    if(result.opticalDelta > 0.5) msg += _cgoT('• 광학 지표 양호 (') + (-result.opticalDelta).toFixed(1) + '세 젊어 보임)<br/>';
    else if(result.opticalDelta < -0.5) msg += _cgoT('• 광학 지표 노화 (') + (-result.opticalDelta).toFixed(1) + '세 가속)<br/>';
    if(result.collagenDelta < -0.5) msg += _cgoT('• 복원 탄력 우수 (') + (-result.collagenDelta).toFixed(1) + '세 보정)<br/>';
    else if(result.collagenDelta > 0.5) msg += _cgoT('• 복원 탄력 낮은 편 (') + (result.collagenDelta).toFixed(1) + '세 가속)<br/>';
    if(result.stressDelta > 0.5) msg += '• 스트레스로 ' + result.stressDelta.toFixed(1) + '세 노화 가속<br/>';
    else if(result.stressDelta < -0.5) msg += _cgoT('• 내면 탄력 안정 (') + (-result.stressDelta).toFixed(1) + '세 보정)<br/>';
    detailEl.innerHTML = msg || '• 종합적으로 일반 참고 범위입니다';
  }
  
  // 결과 패널 표시
  var resultPanel = document.getElementById('svi-age-result');
  if(resultPanel) resultPanel.style.display = 'block';
}
window.sviCalcSkinAge = sviCalcSkinAge;

// ★═══════════════════════════════════════════════════════════
// ★ SVI 3단계 박입 — rPPG 동시 측정 (C-37 CHROM 알고리즘)
// ★ 정직: 본진 _rPPG와 독립된 SVI 전용 모듈 (충돌 0%)
// ★ "스트레스 → 피부 노화" 인과관계 박입
// ★═══════════════════════════════════════════════════════════

// 매 프레임 RGB 샘플링 (svi-video 안면 영역)
function _sviRppgSample(){
  if(!_svi.running || !_svi.offCtx || !_svi.offCanvas) return;
  var v = document.getElementById('svi-video');
  if(!v || !v.videoWidth) return;
  
  try {
    // 6부위 측정 중이면 볼 영역 우선 사용 (혈류 가장 풍부)
    var px = _svi.offCtx.getImageData(0, 0, 64, 48).data;
    var rS = 0, gS = 0, bS = 0, cnt = 0;
    for(var i = 0; i < px.length; i += 4){
      // isSkin 필터링 (얼굴 픽셀만)
      var r = px[i], g = px[i+1], b = px[i+2];
      if(r > 60 && g > 40 && b > 20 && r > g && r > b){
        rS += r; gS += g; bS += b; cnt++;
      }
    }
    if(cnt < 50) return;  // 충분한 피부 픽셀이 있어야 함
    
    var rM = rS / cnt, gM = gS / cnt, bM = bS / cnt;
    _svi.rppg.rawR.push(rM);
    _svi.rppg.rawG.push(gM);
    _svi.rppg.rawB.push(bM);
    _svi.rppg.sampleCount++;
    
    // 버퍼 관리 — 최대 300샘플 (10초 @30fps)
    if(_svi.rppg.rawR.length > 300){
      _svi.rppg.rawR.shift();
      _svi.rppg.rawG.shift();
      _svi.rppg.rawB.shift();
    }
    
    // 30샘플 이상 모이면 CHROM 업데이트
    if(_svi.rppg.rawR.length >= 30){
      _sviRppgChromUpdate();
    }
  } catch(e){}
}

// CHROM 알고리즘 — De Haan 2013 기반 (C-37과 동일 방식)
function _sviRppgChromUpdate(){
  var n = _svi.rppg.rawR.length;
  if(n < 30) return;
  
  // 윈도우: 최근 30샘플
  var wSize = Math.min(n, 30);
  var rS = _svi.rppg.rawR.slice(-wSize);
  var gS = _svi.rppg.rawG.slice(-wSize);
  var bS = _svi.rppg.rawB.slice(-wSize);
  
  function mean(arr){ return arr.reduce(function(a,b){ return a+b; }, 0) / arr.length; }
  var rM = mean(rS), gM = mean(gS), bM = mean(bS);
  if(rM < 1 || gM < 1 || bM < 1) return;
  
  // 정규화 (DC 성분 제거)
  var rN = rS.map(function(v){ return v/rM - 1; });
  var gN = gS.map(function(v){ return v/gM - 1; });
  var bN = bS.map(function(v){ return v/bM - 1; });
  
  // CHROM 신호 = 3R - 2G   vs   1.5R + G - 1.5B (De Haan)
  var X = [], Y = [];
  for(var i = 0; i < wSize; i++){
    X.push(3 * rN[i] - 2 * gN[i]);
    Y.push(1.5 * rN[i] + gN[i] - 1.5 * bN[i]);
  }
  
  // 표준편차 비율로 알파 계산
  function std(arr){
    var m = mean(arr);
    var v = 0;
    arr.forEach(function(x){ v += (x-m)*(x-m); });
    return Math.sqrt(v/arr.length);
  }
  var sX = std(X), sY = std(Y);
  var alpha = sY > 0.001 ? sX / sY : 1;
  
  // 최종 CHROM 신호
  var chrom = X.map(function(x, i){ return x - alpha * Y[i]; });
  
  // 가장 최근 값만 추가
  _svi.rppg.chromSignal.push(chrom[chrom.length - 1]);
  if(_svi.rppg.chromSignal.length > 300) _svi.rppg.chromSignal.shift();
  
  // 밴드패스 필터 적용 (Butterworth 2차)
  _sviRppgFilter();
}

// 밴드패스 필터 — Butterworth 2차 (0.7~3Hz @ 30fps)
function _sviRppgFilter(){
  var sig = _svi.rppg.chromSignal;
  if(sig.length < 3) return;
  
  var b = _svi.rppg.bpB, a = _svi.rppg.bpA, z = _svi.rppg.bpZ;
  var x = sig[sig.length - 1];
  var y = b[0] * x + z[0];
  z[0] = b[1] * x - a[1] * y + z[1];
  z[1] = b[2] * x - a[2] * y;
  
  _svi.rppg.filteredSignal.push(y);
  if(_svi.rppg.filteredSignal.length > 300) _svi.rppg.filteredSignal.shift();
}

// R-피크 검출 (간이 — 윈도우 최대값 + 최소 간격)
function _sviRppgDetectPeaks(){
  var sig = _svi.rppg.filteredSignal;
  if(sig.length < 60) return [];
  
  var peaks = [];
  var minDist = 12;  // 최소 간격 (12샘플 @30fps = 400ms = 150 BPM 한계)
  
  for(var i = 2; i < sig.length - 2; i++){
    if(sig[i] > sig[i-1] && sig[i] > sig[i+1] && sig[i] > sig[i-2] && sig[i] > sig[i+2]){
      // 양수이고 임계값 이상
      if(sig[i] > 0.0001){
        // 이전 피크와 최소 거리 확인
        if(peaks.length === 0 || (i - peaks[peaks.length - 1]) >= minDist){
          peaks.push(i);
        }
      }
    }
  }
  return peaks;
}

// BPM + HRV 산출
// ★ C-64 특허 스펙트럼 모듈 — rPPG 신호 FFT (스펙트럼 BPM + SNR)
function _sviRppgSpectrum(){
  var sig = _svi.rppg.filteredSignal;
  if(!sig || sig.length < 64) return null;
  var N = sig.length, fs = _svi.rppg.sampleRate || 30;
  // 평균 제거 + Hann 윈도우
  var m = 0, i; for(i=0;i<N;i++) m += sig[i]; m /= N;
  var w = new Array(N);
  for(i=0;i<N;i++){ var hann = 0.5 - 0.5*Math.cos(2*Math.PI*i/(N-1)); w[i] = (sig[i]-m)*hann; }
  // 0.7~3Hz 대역 직접 DFT (Goertzel식 · 미세 bin)
  var fMin=0.7, fMax=3.0, df=0.02;
  var bestF=0, bestP=0, totalP=0, cnt=0;
  for(var f=fMin; f<=fMax+1e-9; f+=df){
    var re=0, im=0, wn=2*Math.PI*f/fs;
    for(var n=0;n<N;n++){ re += w[n]*Math.cos(wn*n); im -= w[n]*Math.sin(wn*n); }
    var p = re*re + im*im;
    totalP += p; cnt++;
    if(p > bestP){ bestP = p; bestF = f; }
  }
  var meanP = cnt>0 ? totalP/cnt : 1;
  var snr = meanP>0 ? bestP/meanP : 0;
  return { bpm: Math.round(bestF*60), snr: snr, peakFreq: bestF };
}
// ★ C-64 특허 스펙트럼 모듈 — RR 타코그램 FFT (LF/HF 자율신경)
function _sviHrvSpectrum(rri){
  if(!rri || rri.length < 8) return null;
  var t=[0], i; for(i=0;i<rri.length;i++) t.push(t[i]+rri[i]);
  var totalT = t[t.length-1]/1000;
  if(totalT < 20) return null; // LF 대역엔 ~20초 필요
  var fs=4, M=Math.floor(totalT*fs), rs=new Array(M);
  for(var k=0;k<M;k++){
    var tk = k/fs*1000, idx=0;
    while(idx<rri.length-1 && t[idx+1]<tk) idx++;
    rs[k]=rri[idx];
  }
  var mm=0; for(i=0;i<M;i++) mm+=rs[i]; mm/=M;
  var LF=0, HF=0;
  for(var f=0.04; f<=0.4+1e-9; f+=0.01){
    var re=0, im=0, wn=2*Math.PI*f/fs;
    for(var n=0;n<M;n++){ var v=rs[n]-mm; re += v*Math.cos(wn*n); im -= v*Math.sin(wn*n); }
    var p = re*re + im*im;
    if(f < 0.15) LF += p; else HF += p;
  }
  var lfhf = HF>0 ? LF/HF : 0;
  return { lf:LF, hf:HF, lfhf: Math.round(lfhf*100)/100 };
}
function _sviRppgCalcVitals(){
  var peaks = _sviRppgDetectPeaks();
  if(peaks.length < 4) return;
  _svi.rppg.peaks = peaks;
  
  // RR 인터벌 (ms)
  var rri = [];
  for(var i = 1; i < peaks.length; i++){
    var dt = (peaks[i] - peaks[i-1]) * (1000 / _svi.rppg.sampleRate);
    if(dt > 333 && dt < 1500) rri.push(dt);  // 40~180 BPM
  }
  if(rri.length < 2) return;
  _svi.rppg.rriList = rri;
  
  // 평균 BPM
  var avgRRI = rri.reduce(function(a,b){return a+b;}, 0) / rri.length;
  _svi.rppg.bpm = Math.round(60000 / avgRRI);
  // ★ 특허 스펙트럼 BPM 융합 — 주파수영역 최고점 (노이즈 강건)
  var _spec = _sviRppgSpectrum();
  if(_spec && _spec.snr > 1.5 && _spec.bpm >= 40 && _spec.bpm <= 180){
    _svi.rppg.specBpm = _spec.bpm;
    _svi.rppg.snr = Math.round(_spec.snr*10)/10;
    _svi.rppg.bpm = Math.round(_spec.bpm*0.6 + _svi.rppg.bpm*0.4);
  }
  
  // RMSSD (시간영역 HRV)
  if(rri.length >= 2){
    var sumSq = 0;
    for(var j = 1; j < rri.length; j++){
      var d = rri[j] - rri[j-1];
      sumSq += d * d;
    }
    _svi.rppg.hrv = Math.round(Math.sqrt(sumSq / (rri.length - 1)));
  }
  
  // SDNN
  if(rri.length >= 3){
    var mRRI = avgRRI;
    var vr = 0;
    rri.forEach(function(x){ vr += (x - mRRI) * (x - mRRI); });
    _svi.rppg.sdnn = Math.round(Math.sqrt(vr / rri.length));
  }
  
  // ★ 스트레스 점수 (HRV 기반):
  //   RMSSD 높음 = 부교감신경 활성 = 낮은 스트레스 (0)
  //   RMSSD 낮음 = 교감신경 항진 = 높은 스트레스 (100)
  if(_svi.rppg.hrv !== null){
    // 일반적 RMSSD: 20~80ms (20이하 스트레스, 50이상 좋음)
    var hrvNorm = Math.max(0, Math.min(1, (_svi.rppg.hrv - 10) / 70));
    _svi.rppg.stressScore = Math.round((1 - hrvNorm) * 100);
  }
  // ★ 특허 스펙트럼 LF/HF 융합 — 주파수영역 HRV (자율신경 균형)
  var _hs = _sviHrvSpectrum(rri);
  if(_hs && _svi.rppg.stressScore !== null){
    _svi.rppg.lfhf = _hs.lfhf;
    var _lfhfStress = Math.max(0, Math.min(100, Math.round((_hs.lfhf - 0.5)/2.5*100)));
    _svi.rppg.stressScore = Math.round(_svi.rppg.stressScore*0.6 + _lfhfStress*0.4);
  }
  
  // ★ 피부 노화 지수 (스트레스 × BPM 가중):
  //   높은 긴장 + 빠른 활력 박자 = 피부 회복 리듬 저하
  if(_svi.rppg.stressScore !== null && _svi.rppg.bpm !== null){
    // BPM 70이 기준 (70 이상이면 가중)
    var bpmFactor = Math.max(0, Math.min(1, (_svi.rppg.bpm - 60) / 50));
    // 노화 지수 = 스트레스 70% + BPM 30%
    _svi.rppg.skinAgeIndex = Math.round(
      _svi.rppg.stressScore * 0.7 + bpmFactor * 100 * 0.3
    );
  }
  
  // UI 업데이트
  _sviRenderRppg();
}

// rPPG UI 업데이트
function _sviRenderRppg(){
  var bpmEl = document.getElementById('svi-rppg-bpm');
  var hrvEl = document.getElementById('svi-rppg-hrv');
  var stressEl = document.getElementById('svi-rppg-stress');
  var ageEl = document.getElementById('svi-rppg-age');
  
  if(bpmEl && _svi.rppg.bpm !== null) bpmEl.textContent = _svi.rppg.bpm;
  if(hrvEl && _svi.rppg.hrv !== null) hrvEl.textContent = _svi.rppg.hrv;
  
  if(stressEl && _svi.rppg.stressScore !== null){
    stressEl.textContent = _svi.rppg.stressScore;
    var s = _svi.rppg.stressScore;
    if(s < 30){ stressEl.style.color = '#34d399'; }
    else if(s < 60){ stressEl.style.color = '#38bdf8'; }
    else if(s < 80){ stressEl.style.color = '#fbbf24'; }
    else { stressEl.style.color = '#f87171'; }
  }
  
  if(ageEl && _svi.rppg.skinAgeIndex !== null){
    ageEl.textContent = _svi.rppg.skinAgeIndex;
    var a = _svi.rppg.skinAgeIndex;
    if(a < 30){ ageEl.style.color = '#34d399'; }
    else if(a < 60){ ageEl.style.color = '#38bdf8'; }
    else if(a < 80){ ageEl.style.color = '#fbbf24'; }
    else { ageEl.style.color = '#f87171'; }
  }
}

// rPPG 정리
function _sviRppgReset(){
  _svi.rppg.rawR = []; _svi.rppg.rawG = []; _svi.rppg.rawB = [];
  _svi.rppg.chromSignal = []; _svi.rppg.filteredSignal = [];
  _svi.rppg.peaks = []; _svi.rppg.rriList = [];
  _svi.rppg.bpZ = [0, 0];
  _svi.rppg.bpm = null; _svi.rppg.hrv = null; _svi.rppg.sdnn = null;
  _svi.rppg.stressScore = null; _svi.rppg.skinAgeIndex = null;
  _svi.rppg.sampleCount = 0;
}

// ★═══════════════════════════════════════════════════════════
// ★ SVI 1단계 박입 — 눌렀다 뗌 회복 검출 (정직 약속 이행)
// ★ 헌법 v2.0: ZERO STORAGE · ZERO SERVER · 정직 100%
// ★ 박지된 약속: "피부를 눌렀다 뗄 때 복원 파동 = 복원 탄력"
// ★═══════════════════════════════════════════════════════════

// 사용자가 화면을 누른 순간 — 베이스라인 캡처
function _sviOnPressStart(ev){
  if(!_svi.running || _svi.isPressing) return;
  if(ev && ev.preventDefault) ev.preventDefault();
  _svi.isPressing = true;
  _svi.pressStartTime = Date.now();
  _svi.recoveryTracking = false;
  
  // 누르기 직전 평균 밝기 캡처 (베이스라인)
  if(_svi.offCtx && _svi.offCanvas){
    var px = _svi.offCtx.getImageData(0,0,64,48).data;
    var sum = 0, cnt = 0;
    for(var i = 0; i < px.length; i += 4){
      sum += (px[i] + px[i+1] + px[i+2]) / 3;
      cnt++;
    }
    _svi.baselineL = cnt > 0 ? sum / cnt : null;
  }
  
  // UI 피드백 — 회복 측정 시작 안내
  var hint = document.getElementById('svi-press-hint');
  if(hint){
    hint.textContent = _cgoT('👇 손가락으로 화면을 꾹 누르고 있어요... 2초 후 떼세요');
    hint.style.color = 'rgba(56,189,248,1)';
  }
}

// 사용자가 손가락을 뗀 순간 — 회복 추적 시작
function _sviOnPressEnd(ev){
  if(!_svi.running || !_svi.isPressing) return;
  if(ev && ev.preventDefault) ev.preventDefault();
  _svi.isPressing = false;
  _svi.releaseTime = Date.now();
  
  var pressDuration = _svi.releaseTime - _svi.pressStartTime;
  
  // 너무 짧게 누른 경우 (300ms 미만) → 무시
  if(pressDuration < 300){
    var hint = document.getElementById('svi-press-hint');
    if(hint){
      hint.textContent = _cgoT('⚠️ 1초 이상 꾹 눌러주세요');
      hint.style.color = 'rgba(251,191,36,.9)';
    }
    return;
  }
  
  // 뗀 직후 평균 밝기 캡처 (압박 직후 = 가장 창백한 상태)
  if(_svi.offCtx && _svi.offCanvas){
    var px = _svi.offCtx.getImageData(0,0,64,48).data;
    var sum = 0, cnt = 0;
    for(var i = 0; i < px.length; i += 4){
      sum += (px[i] + px[i+1] + px[i+2]) / 3;
      cnt++;
    }
    _svi.pressBoxL = cnt > 0 ? sum / cnt : null;
  }
  
  // 회복 추적 시작 (3초간 추적)
  _svi.recoveryTracking = true;
  _svi.recoveryStartTime = _svi.releaseTime;
  
  var hint = document.getElementById('svi-press-hint');
  if(hint){
    hint.textContent = _cgoT('⏱️ 회복 속도 측정 중... 가만히 계세요');
    hint.style.color = 'rgba(56,189,248,1)';
  }
  
  // 3초 후 회복 분석 종료
  setTimeout(function(){
    if(!_svi.recoveryTracking) return;
    _svi.recoveryTracking = false;
    _sviAnalyzeRecovery();
  }, 3000);
}

// 회복 분석 — 색이 돌아오는 시간 = 복원 탄력 지수
function _sviAnalyzeRecovery(){
  if(!_svi.offCtx || _svi.baselineL === null || _svi.pressBoxL === null) return;
  
  // 현재 밝기 측정
  var px = _svi.offCtx.getImageData(0,0,64,48).data;
  var sum = 0, cnt = 0;
  for(var i = 0; i < px.length; i += 4){
    sum += (px[i] + px[i+1] + px[i+2]) / 3;
    cnt++;
  }
  var currentL = cnt > 0 ? sum / cnt : _svi.pressBoxL;
  
  // 회복률 계산: (현재 - 압박직후) / (베이스 - 압박직후)
  // 1.0 = 완전 회복, 0.0 = 회복 안 됨
  var deltaTotal = _svi.baselineL - _svi.pressBoxL;
  var deltaNow = currentL - _svi.pressBoxL;
  var recoveryRate = Math.abs(deltaTotal) < 1 ? 1 : Math.max(0, Math.min(1, deltaNow / deltaTotal));
  
  // 복원 탄력 점수 (0~100):
  //   젊은 피부 = 빠른 회복 (3초 안에 100% 회복) → 90+ 점
  //   노화 피부 = 느린 회복 (3초 후 50% 회복) → 50점대
  var collagen = Math.round(Math.max(30, Math.min(98, 30 + recoveryRate * 68)));
  
  // 기록 저장 (여러 번 누르면 평균)
  _svi.recoveryRecords.push({
    rate: recoveryRate,
    collagen: collagen,
    timestamp: Date.now()
  });
  
  // 평균 복원 탄력 점수
  var avgCollagen = 0;
  _svi.recoveryRecords.forEach(function(r){ avgCollagen += r.collagen; });
  avgCollagen = Math.round(avgCollagen / _svi.recoveryRecords.length);
  _svi.collagenScore = avgCollagen;
  
  // UI 업데이트
  var hint = document.getElementById('svi-press-hint');
  var collagenEl = document.getElementById('svi-collagen');
  if(hint){
    if(recoveryRate >= 0.9){
      hint.innerHTML = _cgoT('✨ 빠른 회복! 복원 탄력 우수 (') + collagen + _cgoT('점)');
      hint.style.color = 'rgba(52,211,153,1)';
    } else if(recoveryRate >= 0.7){
      hint.innerHTML = _cgoT('👍 보통 회복 — 복원 탄력 양호 (') + collagen + _cgoT('점)');
      hint.style.color = 'rgba(56,189,248,1)';
    } else {
      hint.innerHTML = _cgoT('💧 회복 느림 — 보습·재생 케어 필요 (') + collagen + _cgoT('점)');
      hint.style.color = 'rgba(251,191,36,1)';
    }
  }
  if(collagenEl) collagenEl.textContent = avgCollagen;
  
  // 2초 후 다시 누르기 안내
  setTimeout(function(){
    if(!_svi.running) return;
    var hint2 = document.getElementById('svi-press-hint');
    if(hint2 && _svi.recoveryRecords.length < 3){
      hint2.textContent = _cgoT('🔄 다시 한 번 눌러주세요 (정확도 향상, ') + _svi.recoveryRecords.length + '/3)';
      hint2.style.color = 'rgba(245,230,175,.8)';
    } else if(hint2){
      hint2.textContent = _cgoT('✅ 충분히 측정됨 — 결과는 분석 종료 후 표시');
      hint2.style.color = 'rgba(52,211,153,1)';
    }
  }, 2000);
}

// 회복 검출 이벤트 바인딩 (sviStartScan 시작 시 호출)
function _sviBindPressEvents(){
  var area = document.getElementById('svi-press-area');
  if(!area || area.__sviBound) return;
  area.__sviBound = true;
  
  // 모바일 (Touch)
  area.addEventListener('touchstart', _sviOnPressStart, {passive:false});
  area.addEventListener('touchend', _sviOnPressEnd, {passive:false});
  area.addEventListener('touchcancel', _sviOnPressEnd, {passive:false});
  
  // PC (Mouse) — 테스트용
  area.addEventListener('mousedown', _sviOnPressStart);
  area.addEventListener('mouseup', _sviOnPressEnd);
  area.addEventListener('mouseleave', function(ev){
    if(_svi.isPressing) _sviOnPressEnd(ev);
  });
}

// 회복 검출 정리 (분석 종료 시)
function _sviResetPressEvents(){
  _svi.pressEvents = [];
  _svi.recoveryRecords = [];
  _svi.baselineL = null;
  _svi.pressBoxL = null;
  _svi.isPressing = false;
  _svi.recoveryTracking = false;
  _svi.collagenScore = null;
}

function sviStartScan(){
  // ★ 카메라 권한 먼저 확인
  cgoCameraCheck(function(){
    _sviResetPressEvents();
    _sviStopFaceMesh();
    _sviRppgReset();  // ★ 3단계 — rPPG 초기화
    _sviStartScanCore();
    setTimeout(function(){
      _sviBindPressEvents();
      var v = document.getElementById('svi-video');
      if(v){ _sviInitFaceMesh(v); }
    }, 500);
  });
}
function _sviStartScanCore(){
  var r=window.calcResult||{};
  var oh=r.domOh||'토';
  var weight=parseFloat(document.getElementById('ipName')&&window._userWeight)||65;
  document.getElementById('svi-result').style.display='none';
  document.getElementById('svi-btn').style.display='none';
  _svi.sec=0;
  _svi.luster=0;_svi.elastic=0;_svi.texture=0;_svi.vitality=0;_svi._samples=0;
  // ★ C-64 — 패널 즉시 표시 (카메라 연결 전에도 보이게 · 피부나이 포함)
  ['svi-press-area','svi-zone-panel','svi-rppg-panel','svi-age-panel','svi-asym-panel'].forEach(function(_id){ var _el=document.getElementById(_id); if(_el) _el.style.display='block'; });
  try{ if(window._sviAutoFillAge) _sviAutoFillAge(); }catch(e){}

  navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:320,height:240}})
  .then(function(stream){
    _svi.stream=stream;
    var v=document.getElementById('svi-video');
    var ph=document.getElementById('svi-placeholder');
    var guide=document.getElementById('svi-guide');
    v.srcObject=stream; v.style.display='block';
    if(ph) ph.style.display='none';
    if(guide) guide.style.display='block';
 // ★ C-64 — SVI 패널 표시 (피부나이 포함 · 원래 makeup 스캔에 잘못 있던 것 복원)
 var _svPress=document.getElementById('svi-press-area'); if(_svPress) _svPress.style.display='block';
 var _svZone=document.getElementById('svi-zone-panel'); if(_svZone) _svZone.style.display='block';
 var _svRppg=document.getElementById('svi-rppg-panel'); if(_svRppg) _svRppg.style.display='block';
 var _svAge=document.getElementById('svi-age-panel'); if(_svAge) _svAge.style.display='block';
 try{ if(window._sviAutoFillAge) _sviAutoFillAge(); }catch(e){}
 var _svAsym=document.getElementById('svi-asym-panel'); if(_svAsym) _svAsym.style.display='block';
 _svi.offCanvas=document.createElement('canvas');
    _svi.offCtx=_svi.offCanvas.getContext('2d', { willReadFrequently: true });
    _svi.running=true;
    _svi.timer=setInterval(function(){
      // ★ 2단계 — MediaPipe 6부위 분석을 위한 프레임 전송
      _sviSendFrame();
      // ★ 3단계 — rPPG 매 프레임 RGB 샘플링 + 2초마다 vitals 계산
      _sviRppgSample();
      if(_svi.sec % 2 === 0 && _svi.rppg.filteredSignal.length >= 60){
        _sviRppgCalcVitals();
      }
      var prg=document.getElementById('svi-progress');
      var tmr=document.getElementById('svi-timer');
      var live=document.getElementById('svi-score-live');
      // ★ 핀셋: 얼굴 감지된 경우만 카운트
      var _sviCanCount=(_svi.lostCount===0);
      if(_sviCanCount) _svi.sec++;
      var remain=30-_svi.sec;
      if(prg) prg.style.width=(_svi.sec/30*100)+'%';
      if(tmr) tmr.textContent=_sviCanCount?(remain>0?remain+_cgoT(_aK(12307)):_cgoT(_aK(12308))):_cgoT(_aK(12309));

      var v2=document.getElementById('svi-video');
      if(v2&&v2.videoWidth&&_svi.offCtx){
        _svi.offCanvas.width=64;_svi.offCanvas.height=48;
        _svi.offCtx.drawImage(v2,0,0,64,48);
        var px=_svi.offCtx.getImageData(0,0,64,48).data;
        var rS=0,gS=0,bS=0,cnt=0;
        var vals=[];
        for(var i=0;i<px.length;i+=4){rS+=px[i];gS+=px[i+1];bS+=px[i+2];cnt++;vals.push((px[i]+px[i+1]+px[i+2])/3);}
        if(cnt){
          var r2=rS/cnt,g2=gS/cnt,b2=bS/cnt;
          var mx=Math.max(r2,g2,b2),mn=Math.min(r2,g2,b2);
          var s=mx>0?(mx-mn)/mx:0;
          var l=(mx+mn)/2/255;
          var isSkin=(r2>60&&g2>40&&b2>20&&r2>g2&&r2>b2&&s>0.1&&s<0.75);
          if(isSkin){
            _svi.lostCount=0;
            _svi._samples++; if(_svi._samples>=5 && (_svi._samples%3===0 || _svi._samples===5)){ try{ sviCalcSkinAge(true); }catch(e){} }
            // 윤기: 밝기 + 하이라이트 픽셀 비율
            var hlCount=vals.filter(function(v){return v>200;}).length;
            var luster=Math.round(Math.max(30,Math.min(98,l*100+hlCount/vals.length*30)));
            // 탄력: 채도 균일성 (높을수록 좋음)
            var mean=g2; var vr=0;
            vals.forEach(function(v){vr+=Math.pow(v-mean,2);});
            vr=Math.sqrt(vr/vals.length);
            var elastic=Math.round(Math.max(30,Math.min(98,100-vr*0.7)));
            // 피부결: 픽셀 표준편차 역수
            var texture=Math.round(Math.max(30,Math.min(98,100-vr*0.5)));
            // 생기 활력: R채널 혈색 지수
            var vitality=Math.round(Math.max(30,Math.min(98,(r2-g2)/(r2+g2+1)*150+55)));
            _svi.luster=Math.round((_svi.luster*(_svi._samples-1)+luster)/_svi._samples);
            _svi.elastic=Math.round((_svi.elastic*(_svi._samples-1)+elastic)/_svi._samples);
            _svi.texture=Math.round((_svi.texture*(_svi._samples-1)+texture)/_svi._samples);
            _svi.vitality=Math.round((_svi.vitality*(_svi._samples-1)+vitality)/_svi._samples);
            document.getElementById('svi-luster').textContent=_svi.luster;
            document.getElementById('svi-elastic').textContent=_svi.elastic;
            document.getElementById('svi-texture').textContent=_svi.texture;
            document.getElementById('svi-vitality').textContent=_svi.vitality;
            var sviNow=Math.round((_svi.luster+_svi.elastic+_svi.texture+_svi.vitality)/4);
            if(live) live.textContent='SVI '+sviNow+'점';
            document.getElementById('svi-face-status').textContent=_cgoT(_aK(12310));
            document.getElementById('svi-face-status').style.color='rgba(56,189,248,.9)';
          } else {
            _svi.lostCount++;
            if(_svi.lostCount>0){
              document.getElementById('svi-face-status').textContent=_cgoT(_aK(12311));
              document.getElementById('svi-face-status').style.color='rgba(251,191,36,.8)';
            }
          }
        }
      }
      // 얼굴 미감지 버퍼: 5초 연속 미감지 시에만 정지
      if(_svi.lostCount>=5 && _svi._samples===0){
        var fs=document.getElementById('svi-face-status');
        if(fs){fs.textContent=_cgoT(_aK(12312));fs.style.color='rgba(56,189,248,.9)';}
        _svi.sec=2; _svi.lostCount=0;
        return;
      }
      if(_svi.sec>=30){
        clearInterval(_svi.timer); _svi.running=false;
        if(_svi._samples<5){
          var fs2=document.getElementById('svi-face-status');
          if(fs2){fs2.textContent=_cgoT(_aK(12313));fs2.style.color='rgba(251,191,36,.9)';}
          if(_svi.stream){_svi.stream.getTracks().forEach(function(t){t.stop();});}
          document.getElementById('svi-video').style.display='none';
          document.getElementById('svi-placeholder').style.display='flex';
          document.getElementById('svi-guide').style.display='none';
          document.getElementById('svi-btn').style.display='block';
          var prg2=document.getElementById('svi-progress');if(prg2)prg2.style.width='0%';
          return;
        }
        if(_svi.stream){_svi.stream.getTracks().forEach(function(t){t.stop();});}
        document.getElementById('svi-video').style.display='none';
        document.getElementById('svi-placeholder').style.display='flex';
        document.getElementById('svi-guide').style.display='none';
        sviShowResult(oh);
        document.getElementById('svi-btn').style.display='block';
      }
    },1000);
  }).catch(function(){
    _cgoCameraAlert('카메라가 필요합니다.<br>카메라를 허용해 주세요.');
    document.getElementById('svi-btn').style.display='block';
  });
}

function sviShowResult(oh){
  var luster=_svi.luster||65, elastic=_svi.elastic||62, texture=_svi.texture||68, vitality=_svi.vitality||70;
  var svi=Math.round((luster+elastic+texture+vitality)/4);
  document.getElementById('svi-total').textContent=svi;
  var grade=svi>=85?'💎 최상의 탄력! 관리 상태 매우 우수':svi>=70?'✨ 양호한 탄력 · 꾸준한 관리 유지':svi>=55?'🌿 보통 탄력 · 집중 관리 권장':'💧 탄력 개선 필요 · 케어 루틴 시작';
  document.getElementById('svi-grade').textContent=grade;

  // 수분 처방 (탄력지수 기반, 체중 65kg 기준)
  var baseWater=svi>=80?2.0:svi>=65?2.3:svi>=50?2.6:3.0;
  var r=window.calcResult||{};
  var ohWaterMap={목:'+0.3L (목 기운 — 수분 흡수 활성)',화:'+0.5L (화 기운 — 수분 손실 빠름)',토:'+0.2L (토 기운 — 균형 수분)',금:'+0.2L (금 기운 — 수분 보존)',수:'+0.1L (수 기운 — 수분 풍부)'};
  document.getElementById('svi-water').innerHTML=
    '기본 권장량 <b style="color:#38bdf8;">'+baseWater.toFixed(1)+'L</b> + 오행 보정 <b style="color:#34d399;">'+(ohWaterMap[oh]||'+0.2L')+'</b><br>'
    +'<span style="font-size:11px;color:rgba(220,240,255,.5);">※ 체중·탄력지수(SVI '+svi+'점) 기반 산출 · 아침 기상 후 500ml 우선 섭취 권장</span>';

  // 운동 가이드
  var exMap={
    목:'🌿 유연성 운동 중심 — 요가·스트레칭 30분 + 걷기 20분<br><span style="font-size:11px;color:rgba(220,240,255,.5);">목 기운: 근막 이완·신체 유연성 극대화</span>',
    화:'🔥 유산소 중심 — 줄넘기·조깅 25분 + 플랭크 3세트<br><span style="font-size:11px;color:rgba(220,240,255,.5);">화 기운: 혈액순환 촉진·체온 유지</span>',
    토:'🏃 복합 운동 — 스쿼트 3세트 + 걷기 30분 + 복근운동<br><span style="font-size:11px;color:rgba(220,240,255,.5);">토 기운: 근육 균형·코어 강화</span>',
    금:'💨 호흡 중심 — 4-7-8 호흡 5회 + 필라테스 30분<br><span style="font-size:11px;color:rgba(220,240,255,.5);">금 기운: 산소 공급·피부 광택 향상</span>',
    수:'🌊 저강도 지속 — 수영·걷기 40분 + 명상 15분<br><span style="font-size:11px;color:rgba(220,240,255,.5);">수 기운: 신장 활성·수분 순환</span>'
  };
  document.getElementById('svi-exercise').innerHTML=exMap[oh]||exMap['토'];

  // 식단 처방
  var dietMap={
    목:'🥦 복원 탄력 식단 — 브로콜리·시금치·아보카도 + 비타민C 풍부 식품<br>녹색 채소 위주, 올리브오일 드레싱 · 신맛 식품(레몬·식초) 병행<br><span style="font-size:11px;color:rgba(220,240,255,.5);">목 기운 오행식: 해독·소화 기능 강화 → 피부 해독·탄력 회복</span>',
    화:'🍅 항산화 식단 — 토마토·딸기·당근 + 오메가3(연어·고등어)<br>빨간 채소·과일 위주, 고추·마늘 소량 병행<br><span style="font-size:11px;color:rgba(220,240,255,.5);">화 기운 오행식: 열정 에너지 강화 → 혈색 개선·피부 활력</span>',
    토:'🍠 뿌리채소 식단 — 고구마·단호박·당근 + 두부·콩류<br>단맛 천연 식품 위주, 꿀·메이플 시럽 소량<br><span style="font-size:11px;color:rgba(220,240,255,.5);">토 기운 오행식: 그라운딩 에너지 강화 → 영양 흡수·피부 탄력</span>',
    금:'🥛 단백질 식단 — 닭가슴살·두부·아몬드 + 배·무·도라지<br>흰색 식품 위주, 매운맛(생강·고추냉이) 소량<br><span style="font-size:11px;color:rgba(220,240,255,.5);">금 기운 오행식: 정돈 에너지 강화 → 피부 수분·윤기 향상</span>',
    수:'🫐 항노화 식단 — 블루베리·검정콩·미역 + 견과류<br>검은색·보라색 식품 위주, 짠맛(된장·해산물) 적당히<br><span style="font-size:11px;color:rgba(220,240,255,.5);">수 기운 오행식: 신장·방광 강화 → 피부 보습·노화 방지</span>'
  };
  document.getElementById('svi-diet').innerHTML=dietMap[oh]||dietMap['토'];

  // 오행 연동
  var ohNames={목:'목(木)',화:'화(火)',토:'토(土)',금:'금(金)',수:'수(水)'};
  document.getElementById('svi-oh-text').innerHTML=
    '<b style="color:#34d399;">'+ohNames[oh]+'</b> '+_aK(12358)+' <b>'+svi+'</b> 분석 결과입니다.<br>'
    +'윤기 '+luster+'점 · 탄력 '+elastic+'점 · 피부결 '+texture+'점 · 혈색 '+vitality+'점<br>'
    +'위 케어 루틴을 21일 이상 지속 시 SVI <b style="color:#38bdf8;">+8~15점</b> 향상 예측됩니다.';

  document.getElementById('svi-result').style.display='block';
  document.getElementById('svi-result').scrollIntoView({behavior:'smooth',block:'start'});
}


/* ══ 나노점 rPPG 피부 지도 — 파트너님 발상 ══
   머리카락을 찾지 않는다. 피부를 찾아 그 바깥을 남긴다.
   피부는 혈류 때문에 초록 채널이 미세하게 맥박치고, 머리카락·벽·옷은 치지 않는다.
   화소마다 보지 않고 6화소 간격 점만 본다 — 계산이 1/36 이다. */
(function(){
  var STEP = 6;            /* 점 간격 */
  var KEEP = 30;           /* 1초치 (30프레임) */
  var buf = null, W = 0, H = 0, idx = 0, filled = 0;
  window._rmaiSkinMap = null;   /* 0~1 · 클수록 피부 */

  window.rmaiNanoFeed = function(ctx, x, y, w, h){
    try{
      var gw = Math.max(1, Math.floor(w / STEP));
      var gh = Math.max(1, Math.floor(h / STEP));
      if(!buf || W !== gw || H !== gh){
        W = gw; H = gh; idx = 0; filled = 0;
        buf = new Uint8ClampedArray(W * H * KEEP);
        window._rmaiSkinMap = new Float32Array(W * H);
      }
      var img = ctx.getImageData(x, y, w, h).data;
      var base = idx * W * H;
      for(var gy = 0; gy < H; gy++){
        for(var gx = 0; gx < W; gx++){
          var sx = gx * STEP + (STEP >> 1);
          var sy = gy * STEP + (STEP >> 1);
          var p = (sy * w + sx) * 4;
          /* 초록 채널 — 혈류가 가장 잘 드러난다 */
          buf[base + gy * W + gx] = img[p + 1];
        }
      }
      idx = (idx + 1) % KEEP;
      if(filled < KEEP) filled++;
      if(filled < 12) return;   /* 아직 못 쌓았으면 판단하지 않는다 */

      /* 점마다 1초치 흔들림을 본다 — 맥박이 있으면 흔들리고, 벽은 잠잠하다 */
      var map = window._rmaiSkinMap;
      for(var i = 0; i < W * H; i++){
        var mean = 0, n = filled;
        for(var k = 0; k < n; k++) mean += buf[k * W * H + i];
        mean /= n;
        var v = 0, cross = 0, prev = 0;
        for(var k2 = 0; k2 < n; k2++){
          var d = buf[k2 * W * H + i] - mean;
          v += d * d;
          if(k2 && prev * d < 0) cross++;
          prev = d;
        }
        v = Math.sqrt(v / n);
        /* 맥박: 흔들림이 있고(0.4~6) 오르내림이 사람 심박 범위(0.7~3Hz) */
        var hz = (cross / 2) / (n / 30);
        var live = (v >= 0.4 && v <= 6 && hz >= 0.6 && hz <= 3.2) ? 1 : 0;
        /* 천천히 따라간다 — 한 프레임에 흔들리지 않게 */
        map[i] = map[i] * 0.85 + live * 0.15;
      }
    }catch(e){}
  };

  /* 그 자리가 피부인가 (0~1) */
  window.rmaiNanoSkin = function(px, py){
    var m = window._rmaiSkinMap;
    if(!m || !W) return -1;                 /* 아직 모른다 */
    var gx = Math.min(W - 1, Math.max(0, Math.floor(px / STEP)));
    var gy = Math.min(H - 1, Math.max(0, Math.floor(py / STEP)));
    return m[gy * W + gx];
  };
})();


/* ══ 언어가 바뀌면 AR 화면을 다시 칠한다 ══
   입구 팝업은 JS가 글자를 박아 넣으므로 사전만 바뀌면 옛 언어로 남는다. */
(function(){
  function repaint(){
    try{
      var pop = document.getElementById('rmai-intro-pop');
      if(pop){ pop.remove(); if(window.rmaiShowIntroPopup) rmaiShowIntroPopup(); }
    }catch(e){}
    try{
      var pg = document.getElementById('page-rppg-ar');
      if(pg && getComputedStyle(pg).display !== 'none' && window.CGO_T) CGO_T.paint(pg);
    }catch(e){}
    try{ if(window.rmaiArRenderPalette) rmaiArRenderPalette(); }catch(e){}
  }
  var done = false;
  function hook(){ if(done) return; if(window.cgoRepaintOn){ cgoRepaintOn(repaint); done = true; } }
  [0,200,800,2000,4000].forEach(function(d){ setTimeout(hook, d); });
  setTimeout(function(){
    if(done || !window.CGO_T || CGO_T.__armkWrap) return;
    var orig = CGO_T.set;
    CGO_T.set = function(){ var r = orig.apply(this, arguments); setTimeout(repaint, 70); return r; };
    CGO_T.__armkWrap = true; done = true;
  }, 5000);
})();

/* ★ 언어 전환 → 색 패널이 그려져 있으면 다시 칠한다 */
var _ACN_REPAINT = 1;
(function(){
  function rp(){
    try{
      var p = document.getElementById('rmai-ar-color-picker');
      if(p && p.innerHTML && typeof _rmaiArInitColorPicker === 'function') _rmaiArInitColorPicker();
    }catch(e){}
  }
  if(typeof window.cgoRepaintOn === 'function') window.cgoRepaintOn(rp);
  else { var t = setInterval(function(){ if(typeof window.cgoRepaintOn === 'function'){ clearInterval(t); window.cgoRepaintOn(rp); } }, 500); setTimeout(function(){ clearInterval(t); }, 15000); }
})();
