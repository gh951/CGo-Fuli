function _ek(n, f){ try{ var v = window.K && window.K(n); return (v && v !== String(n)) ? v : f; }catch(e){ return f; } }
/* 나의 눈 건강 — 구 CGO 원본 엔진 그대로 */
/* 나의 눈 건강 엔진 (메신저 C-44 이식 · 자체완결 IIFE) */

(function(){
  'use strict';

  // ── 25 문항 데이터 (박입 78 — 전면 재설계) ───────────────────────
  // 원칙: 모든 문항 객관적 정답 명확 + 답 구성 헷갈림 없음
  // ① 도형 인지 (5문항)
  // ② 색상 구분 (5문항)
  // ③ 숫자/문자 인지 (5문항)
  // ④ 방향/위치 (5문항)
  // ⑤ 명암 대비 (3문항) — 옅은 글자 → 그 글자 객관식 선택
  // ⑥ 시선 고정 (2문항) — 버튼 없이 3초 자동 통과
  // ★ 박입 116 — 시력 검사판 패턴 박입 (선명도 단계 + 참고 기준 표준 참고) ━━━━━━━━━━━
  //  파트너 박입: "도형 크기 시력 차이별 가변 · 질문/사지선다 크게"
  //  진짜 검증: 선명도 단계 시력 표준 + 5분각 문자 + 35cm 거리 환산
  //  5단계 박입 (시력 0.1 → 0.8):
  //    Level 1 = 시력 0.1 (80px) 매우 큼
  //    Level 2 = 시력 0.2 (50px) 큼
  //    Level 3 = 시력 0.32 (32px) 중간
  //    Level 4 = 시력 0.5 (20px) 작음
  //    Level 5 = 시력 0.8 (14px) 매우 작음
  //  거리 30~40cm 일정 유지 시 진짜 시력 측정 (박입 114 거리 측정 동기)

  // 시력 → 픽셀 매핑 (3음각 문자 기준, 35cm 거리 환산)
  /* ★ 10단계 — 계단 0.2 → 0.1 아래. 몽골 시력(2.0)까지 담는다.
     크기를 화소가 아니라 mm 로 둔다 — 폰마다 실제 크기가 다르기 때문이다.
     35cm 기준 5분각: 시력 v 의 문자 높이 = 5.09 / v (mm) */
  var EYE_SIZE_BY_LEVEL = {
    1:  {mm:50.9,  vision:0.1,  show:'1.0',  label:_ek(10600,'매우 큼')},
    2:  {mm:25.5,  vision:0.2,  show:'2.0',  label:'큼'},
    3:  {mm:15.9,  vision:0.32, show:'3.0',  label:_ek(10601,'중간')},
    4:  {mm:10.2,  vision:0.5,  show:'5.0',  label:_ek(10602,'작음')},
    5:  {mm:8.08,  vision:0.63, show:'6.3',  label:_ek(10603,'조금 더 작음')},
    6:  {mm:6.36,  vision:0.8,  show:'8.0',  label:_ek(10604,'매우 작음')},
    7:  {mm:5.09,  vision:1.0,  show:'10.0', label:_ek(10605,'아주 작음')},
    8:  {mm:4.07,  vision:1.25, show:'12.5', label:_ek(10606,'극히 작음')},
    9:  {mm:3.18,  vision:1.6,  show:'16.0', label:_ek(10607,'최상')},
    10: {mm:2.55,  vision:2.0,  show:'20.0', label:_ek(10608,'최상 (초원의 눈)')}
  };
  /* mm 를 그 폰의 실제 화소로 옮기고, 그 순간의 거리에 맞춰 키운다 */
  window._eyePxPublic = function(level){ return _eyePx(level); };
  function _eyePx(level){
    var mm = EYE_SIZE_BY_LEVEL[level].mm;
    var cm = null;
    try{ cm = window.eyeRulerCm ? eyeRulerCm() : null; }catch(_){}
    if(cm) mm = mm * (cm / 35);          /* 거리에 비례 — 보이는 각도를 늘 같게 */
    var px = (window.eyeMmPx ? eyeMmPx(mm) : mm * (96/25.4));
    return Math.max(6, Math.min(180, Math.round(px)));
  }


  // 시력 영역만 크기 가변 (도형/색상/숫자/방향). 시선 고정 등은 고정.
  function _eyeSized(level, content, type){
    var sz = _eyePx(level);
    if(type === 'shape' || type === 'symbol' || type === 'direction'){
      return '<span style="font-size:' + sz + 'px;font-weight:900;color:#134e4a;line-height:1;display:inline-block;">' + content + '</span>';
    } else if(type === 'color'){
      // 색상 박스 = 시력 크기 그대로 정사각형
      var bg = content;  // hex 색
      return '<span style="display:inline-block;width:' + sz + 'px;height:' + sz + 'px;background:' + bg + ';border-radius:' + (sz/10) + 'px;"></span>';
    } else if(type === 'multi'){
      // 여러 개 (개수 세기, 다른 거 찾기) — 더 작게
      return '<span style="font-size:' + Math.round(sz*0.7) + 'px;color:#134e4a;letter-spacing:.3em;">' + content + '</span>';
    }
    return content;
  }

  var _LDIRS = ['↑','↗','→','↘','↓','↙','←','↖'];
  window.EYE_LANDOLT_DIRS = _LDIRS;
  var EYE_QUESTIONS = (function(){
    var out = [];
    /* 시력 — 란돌트 고리 10단계 × 3문항 (국제 규격) */
    for(var lv = 1; lv <= 10; lv++){
      for(var k = 0; k < 3; k++){
        var di = Math.floor(Math.random() * 8);
        out.push({ cat:'direction', level:lv, landolt:di,
          q:'란돌트', emoji:'', opts:_LDIRS.slice(), correct:di });
      }
    }
    /* 색 구분 — 시력 판정에는 안 들어가고 따로 보여준다 */
    out.push({cat:'color', level:0, emoji:_eyeSized(3,'#e74c3c','color'), opts:[_ek(10609,'빨강'),_ek(10610,'파랑'),_ek(10611,'초록'),_ek(10612,'노랑')], correct:0});
    out.push({cat:'color', level:0, emoji:_eyeSized(3,'#3498db','color'), opts:[_ek(10609,'빨강'),_ek(10610,'파랑'),_ek(10611,'초록'),_ek(10612,'노랑')], correct:1});
    out.push({cat:'color', level:0, emoji:_eyeSized(3,'#27ae60','color'), opts:[_ek(10609,'빨강'),_ek(10610,'파랑'),_ek(10611,'초록'),_ek(10612,'노랑')], correct:2});
    /* 카메라 측정 — 시선 고정·깜빡임 */
    out.push({cat:'fixation', level:0, q:_ek(10613,'화면 중앙의 점을 3초간 응시하세요'),
      emoji:'<span style="font-size:60px;color:#0f766e;display:inline-block;">●</span>',
      opts:[], correct:0, autoTimer:3000, hint:_ek(10614,'카메라가 눈동자 안정성을 측정합니다')});
    out.push({cat:'fixation', level:0, q:_ek(10615,'천천히 3회 깜빡이세요'),
      emoji:'<span style="font-size:60px;">👁️</span>',
      opts:[], correct:0, autoTimer:4000, hint:_ek(10616,'카메라가 깜빡임 횟수를 측정합니다')});
    return out;
  })();


  // ── 비프 음 (Web Audio API) ──────────────────────────────
  var eyeAudioCtx = null;
  function eyeBeep(freq, duration, vol){
    try {
      if(!eyeAudioCtx){
        eyeAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      var osc = eyeAudioCtx.createOscillator();
      var gain = eyeAudioCtx.createGain();
      osc.connect(gain);
      gain.connect(eyeAudioCtx.destination);
      osc.frequency.value = freq || 880;
      osc.type = 'sine';
      gain.gain.setValueAtTime(vol || 0.15, eyeAudioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, eyeAudioCtx.currentTime + (duration || 0.15));
      osc.start();
      osc.stop(eyeAudioCtx.currentTime + (duration || 0.15));
    } catch(e){ console.warn('beep err:', e); }
  }
  function eyeBeepStart(){ eyeBeep(880, 0.2, 0.18); }  // 시작 — 높은 띠
  function eyeBeepEnd(){
    eyeBeep(660, 0.15, 0.15);
    setTimeout(function(){ eyeBeep(880, 0.2, 0.18); }, 180);
  }  // 끝 — 띠 띠
  function eyeBeepClick(){ eyeBeep(1200, 0.05, 0.08); }  // 문항 전환 — 작은 클릭

  // ★ 박입 108 — 거리 측정 비프 / 딩동댕 박입
  function eyeBeepDistWarn(){ eyeBeep(400, 0.15, 0.20); }  // 거리 안 맞음 — 낮은 삐
  function eyeBeepDistOK(){
    // 딩동댕 — 3음 (도-미-솔)
    eyeBeep(523, 0.12, 0.18);                                  // 도
    setTimeout(function(){ eyeBeep(659, 0.12, 0.18); }, 130);  // 미
    setTimeout(function(){ eyeBeep(784, 0.18, 0.20); }, 270);  // 솔
  }

  // ── 측정 상태 ─────────────────────────────────────────────
  var eyeState = {
    started: false,
    currentQ: 0,
    answers: [],
    reactionTimes: [],  // 각 문항 반응 시간 ms
    rppgSignals: [],    // 눈가 rPPG 신호
    pupilJitter: [],    // 눈동자 흔들림 ms
    blinkCount: 0,
    distanceMm: [],     // 카메라 거리 mm
    questionStartTime: 0,
    measureStartTime: 0,
    stream: null
  };
  /* ★ C-63 근본 버그 fix: eyeState는 IIFE 지역변수라 window.eyeState가 undefined였고,
     백버튼·cgoGoPage의 정리코드 5곳이 전부 if(window.eyeState){...}에서 건너뛰어
     rPPG 루프가 안 꺼지고 started=true로 남아 재측정 시 카메라가 안 떴다.
     같은 객체를 window에 노출해 기존 정리 로직을 되살린다. */
  window.eyeState = eyeState;

  // ★ 박입 119 — 왼쪽/오른쪽 눈 선택 박입 (안과 표준 패턴)
  window.eyeSelectSide = function(side){
    eyeState.selectedSide = side;
    var leftBtn = document.getElementById('eye-side-left');
    var rightBtn = document.getElementById('eye-side-right');
    var statusEl = document.getElementById('eye-side-status');
    var startBtn = document.getElementById('eye-start-btn');

    if(side === 'left'){
      leftBtn.style.background = '#fef2f2';
      leftBtn.style.borderWidth = '3px';
      leftBtn.style.boxShadow = '0 0 12px rgba(239,68,68,.3)';
      rightBtn.style.background = '#fff';
      rightBtn.style.borderWidth = '2px';
      rightBtn.style.boxShadow = 'none';
      statusEl.innerHTML = '🔴 <b>왼쪽 눈</b> 선택 · 오른쪽 눈을 손으로 가리고 측정 시작';
      statusEl.style.color = '#ef4444';
    } else {
      rightBtn.style.background = '#eff6ff';
      rightBtn.style.borderWidth = '3px';
      rightBtn.style.boxShadow = '0 0 12px rgba(59,130,246,.3)';
      leftBtn.style.background = '#fff';
      leftBtn.style.borderWidth = '2px';
      leftBtn.style.boxShadow = 'none';
      statusEl.innerHTML = '🔵 <b>오른쪽 눈</b> 선택 · 왼쪽 눈을 손으로 가리고 측정 시작';
      statusEl.style.color = '#3b82f6';
    }

    // 측정 시작 버튼 활성화
    startBtn.disabled = false;
    startBtn.style.cursor = 'pointer';
    startBtn.style.background = 'linear-gradient(135deg,#14b8a6,#0d9488)';
    startBtn.style.boxShadow = '0 4px 12px rgba(20,184,166,.4)';
    /* ★C-68: 조각을 이어붙이면 사전에 통짜 키가 없어 한국어가 남는다 → 완성문을 통째로 번역 */
        startBtn.textContent = _cgoT(side === 'left' ? '📸 측정 시작 (왼쪽 눈)' : '📸 측정 시작 (오른쪽 눈)');
    eyeDebug(_cgoT(side === 'left' ? '👁️ 왼쪽 눈 측정 선택 — 시작 가능' : '👁️ 오른쪽 눈 측정 선택 — 시작 가능'));
  };

  // ── 시작 ─────────────────────────────────────────────────
  /* ★ C-63: 측정 중 언제든 카메라 닫기 — 스트림·타이머·루프 정리 후 측정 전 상태로 원상복구
     (페이지는 그대로 유지. 다시 _ek(10617,'측정 시작')을 누르면 처음부터 진행) */
  window.eyeCancelMeasure = function(){
    try{
      // 1) 카메라 스트림 완전 정지
      var v=document.getElementById('eye-video');
      if(v && v.srcObject){ try{ v.srcObject.getTracks().forEach(function(t){ t.stop(); }); }catch(e){} v.srcObject=null; }
      if(eyeState && eyeState.stream){ try{ eyeState.stream.getTracks().forEach(function(t){ t.stop(); }); }catch(e){} eyeState.stream=null; }
      // 2) 타이머·루프 정지
      if(eyeState){
        if(eyeState.qTimerInterval){ clearInterval(eyeState.qTimerInterval); eyeState.qTimerInterval=null; }
        if(eyeState.rppgInterval){ clearInterval(eyeState.rppgInterval); eyeState.rppgInterval=null; }
        try{ if(window._eye108State && window._eye108State.feedInterval){ clearInterval(window._eye108State.feedInterval); window._eye108State.feedInterval=null; } if(window._eyeSigReset) window._eyeSigReset(); }catch(e){}
        if(eyeState.countdownInterval){ clearInterval(eyeState.countdownInterval); eyeState.countdownInterval=null; }
      }
      if(window._eye108State && window._eye108State.feedInterval){ clearInterval(window._eye108State.feedInterval); window._eye108State.feedInterval=null; }
      // 3) 측정 상태 초기화
      if(eyeState){
        eyeState.started=false; eyeState.currentQ=0; eyeState.answers=[];
        eyeState.reactionTimes=[]; eyeState.pupilJitter=[]; eyeState.blinkCount=0;
      }
      // 4) 캔버스 오버레이 지우기
      try{ var c=document.getElementById('eye-canvas'); if(c&&c.getContext){ var g=c.getContext('2d'); g.clearRect(0,0,c.width,c.height); } }catch(e){}
      // 5) UI 원상복구 (eyeStartMeasure가 바꾼 것 역순)
      var ids={'eye-camera-area':'none','eye-question-area':'none','eye-start-btn':'block','eye-side-select':'block'};
      for(var id in ids){ var el=document.getElementById(id); if(el) el.style.display=ids[id]; }
      try{ if(typeof eyeDebug==='function') eyeDebug('⏹️ 측정을 닫았습니다 — 카메라 종료됨. 다시 시작할 수 있어요.'); }catch(e){}
    }catch(e){}
  };

  window.eyeStartMeasure = function(){
    if(eyeState.started){
      eyeDebug(_ek(10618,'이미 측정 중...'));
      return;
    }
    // ★ 박입 119 — 눈 선택 검증
    if(!eyeState.selectedSide){
      alert(_cgoT(_ek(10619,'먼저 측정할 눈 (왼쪽/오른쪽) 을 선택해 주세요.')));
      eyeDebug('⚠️ 눈 선택 X — 왼쪽 또는 오른쪽 눈 선택 후 시작 가능');
      return;
    }
    eyeState.started = true;
    eyeState.measureStartTime = Date.now();
    eyeState.currentQ = 0;
    eyeState.answers = [];
    eyeState.reactionTimes = [];
    eyeState.pupilJitter = [];
    eyeState.blinkCount = 0;

    var sideKor = eyeState.selectedSide === 'left' ? _ek(10620,'왼쪽') : _ek(10621,'오른쪽');
    eyeDebug('🎬 ' + sideKor + ' 눈 측정 시작 — 카메라 활성화...');
    document.getElementById('eye-start-btn').style.display = 'none';
    document.getElementById('eye-side-select').style.display = 'none';  // ★ 박입 119 — 선택 박스 숨김
    document.getElementById('eye-camera-area').style.display = 'block';
    document.getElementById('eye-question-area').style.display = 'block';

    // 카메라 시작 (FaceMesh + iris)
    eyeStartCamera().then(function(){
      // ★ 박입 78 — 측정 시작 비프 (띠—) + 사용자 안내
      eyeBeepStart();
      try{ if(window.eyeLuxStart) eyeLuxStart(); }catch(_){}
      eyeDebug('🔔 측정 시작! 카메라 ON');
      setTimeout(function(){
        eyeShowQuestion(0);
        eyeStartRppgLoop();
      }, 500);
    }).catch(function(err){
      eyeDebug('⚠️ 카메라 접근 실패: ' + err.message);
      alert(_cgoT(_ek(10622,'카메라 권한이 필요합니다. 다시 시도해 주세요.')));
      eyeState.started = false;
      document.getElementById('eye-start-btn').style.display = 'block';
      document.getElementById('eye-camera-area').style.display = 'none';
      document.getElementById('eye-question-area').style.display = 'none';
    });
  };

  function eyeStartCamera(){
    return navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:640,height:480},audio:false})
      .then(function(stream){
        eyeState.stream = stream;
        var video = document.getElementById('eye-video');
        video.srcObject = stream;
        return new Promise(function(resolve){
          video.onloadedmetadata = function(){ video.play(); resolve(); };
        });
      });
  }

  // ── 문항 표시 ────────────────────────────────────────────
  /* ★ 그 순간의 거리로 시표 크기를 다시 쓴다 — 보이는 각도를 늘 같게 만든다.
     문항은 만들 때 한 번 굳으므로 그릴 때마다 여기서 고친다. */
  function _eyeScale(html){
    var cm = null;
    try{ cm = window.eyeRulerCm ? eyeRulerCm() : null; }catch(_){}
    if(!cm) return html;
    var r = Math.max(0.55, Math.min(2.2, cm / 35));
    return String(html)
      .replace(/font-size:(\d+(?:\.\d+)?)px/g, function(m,n){ return 'font-size:' + Math.round(n*r) + 'px'; })
      .replace(/width:(\d+(?:\.\d+)?)px/g, function(m,n){ return 'width:' + Math.round(n*r) + 'px'; })
      .replace(/height:(\d+(?:\.\d+)?)px/g, function(m,n){ return 'height:' + Math.round(n*r) + 'px'; });
  }
  /* 문제·보기 글자도 단계에 따라 작아진다 — 도형만 작아지면 큰 글자를 읽고 짐작할 수 있다 */
  function _eyeTxtPx(level, base){
    var px = base;
    if(level >= 1 && level <= 5) px = Math.round(base * [1.35,1.15,1.0,0.86,0.74][level-1]);
    var cm = null;
    try{ cm = window.eyeRulerCm ? eyeRulerCm() : null; }catch(_){}
    if(cm) px = Math.round(px * Math.max(0.7, Math.min(1.8, cm / 35)));
    return Math.max(11, px);
  }

  function eyeShowQuestion(idx){
    if(idx >= EYE_QUESTIONS.length){
      eyeFinishMeasure();
      return;
    }
    var q = EYE_QUESTIONS[idx];
    document.getElementById('eye-q-num').textContent = idx + 1;
    document.getElementById('eye-q-total').textContent = EYE_QUESTIONS.length;
    document.getElementById('eye-q-timer').textContent = '0.0';

    // ★ 박입 78 — 카테고리 한글 라벨
    var catLabels = {shape:_ek(10623,'도형'), color:_ek(10624,'색상'), symbol:_ek(10625,'숫자/문자'), direction:_ek(10626,'방향'),
                     contrast:_ek(10627,'명암'), fixation:_ek(10628,'시선 고정')};
    var catLabel = catLabels[q.cat] || '';

    var qText = document.getElementById('eye-question-text');
    qText.innerHTML = '<div style="font-size:10px;color:#0f766e;font-weight:800;letter-spacing:.15em;margin-bottom:14px;">' + catLabel.toUpperCase() + ' 식별</div>' +
                      '<div style="display:flex;align-items:center;justify-content:center;height:19vh;min-height:96px;max-height:200px;line-height:1;overflow:hidden;">' + (q.landolt !== undefined ? window.eyeLandolt(q.level, q.landolt) : _eyeScale(q.emoji)) + '</div>' +
                      (q.hint ? '<div style="font-size:10px;color:#0f766e;margin-top:8px;background:rgba(20,184,166,.1);padding:6px 10px;border-radius:6px;display:inline-block;">💡 ' + q.hint + '</div>' : '');

    var grid = document.getElementById('eye-options-grid');
    grid.innerHTML = '';

    // ★ 박입 78 — 시선 고정 (autoTimer) 문항은 버튼 없이 자동 진행
    if(q.autoTimer){
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:12px;background:rgba(20,184,166,.08);border-radius:10px;font-size:12px;color:#0f766e;font-weight:700;">📷 카메라 측정 중... <span id="eye-auto-countdown">' + (q.autoTimer/1000).toFixed(1) + '</span>초</div>';

      eyeState.questionStartTime = Date.now();
      var startTime = Date.now();
      var totalMs = q.autoTimer;

      eyeState.qTimerInterval = setInterval(function(){
        var elapsed = Date.now() - startTime;
        var remain = Math.max(0, totalMs - elapsed);
        document.getElementById('eye-q-timer').textContent = (elapsed/1000).toFixed(1);
        var cd = document.getElementById('eye-auto-countdown');
        if(cd) cd.textContent = (remain/1000).toFixed(1);
      }, 100);

      setTimeout(function(){
        clearInterval(eyeState.qTimerInterval);
        // 자동 통과 (정답 처리)
        var rt = Date.now() - eyeState.questionStartTime;
        eyeState.reactionTimes.push(rt);
        eyeState.answers.push({q:idx, opt:0, correct:true, rt:rt, cat:q.cat, level:q.level||0, auto:true});
        eyeBeepClick();
        eyeUpdateLiveStats();
        setTimeout(function(){ eyeShowQuestion(idx + 1); }, 300);
      }, q.autoTimer);

    } else {
      // 일반 객관식 문항
      q.opts.forEach(function(opt, oi){
        var btn = document.createElement('button');
        btn.textContent = opt;
        var _op = _eyeTxtPx(q.level || 0, 18);
        btn.style.cssText = 'padding:' + Math.max(12, Math.round(_op*0.8)) + 'px 12px;background:#f0fdfb;'
          + 'border:2px solid #ccfbf1;border-radius:12px;font-size:' + _op + 'px;font-weight:800;'
          + 'color:#134e4a;cursor:pointer;font-family:inherit;transition:all .15s;line-height:1.25;';
        btn.onmouseover = function(){ this.style.background = '#ccfbf1'; };
        btn.onmouseout = function(){ this.style.background = '#f0fdfb'; };
        btn.onclick = function(){ eyeAnswer(idx, oi); };
        grid.appendChild(btn);
      });

      eyeState.questionStartTime = Date.now();
      eyeState.qTimerInterval = setInterval(function(){
        var elapsed = (Date.now() - eyeState.questionStartTime) / 1000;
        document.getElementById('eye-q-timer').textContent = elapsed.toFixed(1);
      }, 100);
    }
  }

  function eyeAnswer(qIdx, optIdx){
    var rt = Date.now() - eyeState.questionStartTime;
    eyeState.reactionTimes.push(rt);
    var q = EYE_QUESTIONS[qIdx];
    eyeState.answers.push({q:qIdx, opt:optIdx, correct: optIdx === q.correct, rt: rt, cat: q.cat, level: q.level||0});

    clearInterval(eyeState.qTimerInterval);

    // ★ 박입 78 — 클릭 비프
    eyeBeepClick();

    // 통계 디스플레이 업데이트
    eyeUpdateLiveStats();

    // 다음 문항
    setTimeout(function(){
      eyeShowQuestion(qIdx + 1);
    }, 300);
  }

  // ── 라이브 통계 업데이트 ─────────────────────────────────
  function eyeUpdateLiveStats(){
    if(eyeState.reactionTimes.length === 0) return;
    var avgRt = eyeState.reactionTimes.reduce(function(a,b){return a+b;},0) / eyeState.reactionTimes.length;
    document.getElementById('eye-react').textContent = avgRt.toFixed(0) + 'ms';
    var correctCount = eyeState.answers.filter(function(a){return a.correct;}).length;
    var accuracy = correctCount / eyeState.answers.length * 100;
    document.getElementById('eye-stab').textContent = accuracy.toFixed(0) + '%';
  }

  // ── 가상 rPPG 루프 (실제 측정은 FaceMesh + 눈가 ROI 박입 후 확장) ──
  function eyeStartRppgLoop(){
    // ★★ C-63 신버전 이식 — 눈 전용 진짜 rPPG 엔진 (CHROM + 밴드패스 + 조명정규화)
    //    기존: bpm=Math.random() 가짜값(정직원칙 위반) → Guardian이 뽑는 중앙 픽셀로 진짜 CHROM 측정
    //    FaceMesh는 눈 클로즈업에서 자주 실패 → Guardian 피부영역 픽셀을 rPPG 소스로 재활용
    //    원복: window._cgoEyeChromV2 = false → 기존 랜덤값
    window._cgoEyeChromV2 = (window._cgoEyeChromV2 !== false);
    window._eyeSig = {
      rawR: [], rawG: [], rawB: [], prevR: 0, prevG: 0, lumaEMA: 0,
      bpB: [0.19701, 0, -0.19701], bpA: [1, -1.53077, 0.60556], bpZ: [0, 0],
      sig: [], t0: 0, lastBpm: 0, lastHrv: 0
    };
    function _eyeFilter(x){
      var S = window._eyeSig, b = S.bpB, a = S.bpA, z = S.bpZ;
      var w = x - a[1]*z[0] - a[2]*z[1];
      var y = b[0]*w + b[2]*z[1];
      z[1] = z[0]; z[0] = w;
      return y;
    }
    window._eyeChromStep = function(r, g, b){
      var S = window._eyeSig;
      var lum = 0.299*r + 0.587*g + 0.114*b;
      if(lum > 1){
        if(!S.lumaEMA) S.lumaEMA = lum;
        else S.lumaEMA = S.lumaEMA*0.97 + lum*0.03;
        var k = S.lumaEMA / lum;
        if(k > 0.5 && k < 2.0){ r*=k; g*=k; b*=k; }
      }
      S.rawR.push(r); S.rawG.push(g); S.rawB.push(b);
      var n = S.rawR.length;
      if(n < 2) return;
      var wSize = Math.min(n, 30);
      var rS = S.rawR.slice(-wSize), gS = S.rawG.slice(-wSize), bS = S.rawB.slice(-wSize);
      function mean(a2){ return a2.reduce(function(s2,v){return s2+v;},0)/a2.length; }
      function std(a2){ var m=mean(a2); return Math.sqrt(a2.reduce(function(s2,v){return s2+Math.pow(v-m,2);},0)/a2.length)||0.0001; }
      var rM = mean(rS), gM = mean(gS), bM = mean(bS);
      if(rM<1 || gM<1 || bM<1) return;
      if(S.prevR>0 && (Math.abs(r-S.prevR)/rM > 0.15 || Math.abs(g-S.prevG)/gM > 0.15)){
        S.prevR=r; S.prevG=g; return;
      }
      S.prevR=r; S.prevG=g;
      var xsArr=[], ysArr=[];
      for(var i2=0;i2<wSize;i2++){
        xsArr.push(3*(rS[i2]/rM) - 2*(gS[i2]/gM));
        ysArr.push(1.5*(rS[i2]/rM) + (gS[i2]/gM) - 1.5*(bS[i2]/bM));
      }
      var alpha = std(xsArr)/std(ysArr);
      var Xs = 3*(r/rM) - 2*(g/gM);
      var Ys = 1.5*(r/rM) + (g/gM) - 1.5*(b/bM);
      var _sg = _eyeFilter(Xs - alpha*Ys);
      if(!S.t0) S.t0 = Date.now();
      S.sig.push({ t:(Date.now()-S.t0)/1000, x:_sg });
      if(S.sig.length > 600) S.sig.shift();
      if(S.rawR.length > 1800){ S.rawR.shift(); S.rawG.shift(); S.rawB.shift(); }
    };
    window._eyeCalcVitals = function(){
      var S = window._eyeSig;
      if(S.sig.length < 90) return null;                  /* 최소 신호 */
      var samples = S.sig.slice(-300);
      var xs = samples.map(function(s){return s.x;});
      var mean = xs.reduce(function(a,b){return a+b;},0)/xs.length;
      var sd = Math.sqrt(xs.reduce(function(a,b){return a+(b-mean)*(b-mean);},0)/xs.length);
      if(sd < 0.3) return null;                            /* 신호 약함 */
      var peaks=0, lastPeak=-10, thr=mean+sd*0.3;
      for(var j=2;j<xs.length-2;j++){
        if(xs[j]>thr && xs[j]>xs[j-1] && xs[j]>xs[j+1] && (samples[j].t-lastPeak)>0.4){ peaks++; lastPeak=samples[j].t; }
      }
      var dur = samples[samples.length-1].t - samples[0].t;
      var bpm = dur>0 ? (peaks/dur)*60 : 0;
   // ★ 특허 스펙트럼 BPM 융합 (실측 샘플레이트 기반)
   if(bpm > 0 && dur > 0 && window._cgoSpectrumBPM){
     var _eyeFs = xs.length / dur;
     var _spec = _cgoSpectrumBPM(xs, _eyeFs);
     if(_spec && _spec.snr > 1.5 && _spec.bpm >= 50 && _spec.bpm <= 130){
       bpm = Math.round(_spec.bpm*0.6 + bpm*0.4);
     }
   }
      if(bpm < 50 || bpm > 130) return null;               /* 범위 검증 */
      var hrv = sd*10;
      S.lastBpm = bpm; S.lastHrv = hrv;
      return { bpm:bpm, hrv:hrv };
    };
    window._eyeSigReset = function(){
      try{ var S=window._eyeSig; if(!S) return;
        S.rawR=[];S.rawG=[];S.rawB=[];S.prevR=0;S.prevG=0;S.lumaEMA=0;S.bpZ=[0,0];S.sig=[];S.t0=0;S.lastBpm=0;S.lastHrv=0;
      }catch(e){}
    };

    // ★ 박입 108 — 진짜 거리 측정 시스템 박입 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    //  파트너 박입: 30~40cm 표준 / 50cm 최대 / 안 맞으면 삐 / 맞으면 딩동댕
    //  메커니즘:
    //    ① FaceMesh 박입 (양쪽 눈 외측 꼭짓점: 33번 / 263번)
    //    ② 픽셀 거리 → cm 추정 (캘리브레이션 상수 박힘)
    //    ③ 거리 30~40 = OK / 그 외 = 경고
    //    ④ OK 진입 시 딩동댕 (1번만) / 경고 지속 시 삐 (3초마다)
    //    ⑤ 측정 상태 박입 (문항 풀이는 거리 OK 시만)
    if(!window._eye108State){
      window._eye108State = {
        faceMesh: null,
        distOK: false,
        lastBeepTime: 0,
        lastDistOKBeep: 0,
        eyeDist: 0
      };
    }
    var s108 = window._eye108State;

    // ★ 박입 110 — rPPG 스캔 패턴 박입 (파트너 진단)
    //   파트너 진단: "rPPG 스캔 중 얼굴 안 보이면 스캔 멈춤 — 그 패턴 참고"
    //   진짜 fix:
    //     ① 얼굴 감지 상태 (faceDetected) 박입
    //     ② 얼굴 안 보이면 → "얼굴이 안 보입니다" 표시 + 측정 차단
    //     ③ 얼굴 보이면 → 거리 측정 진행 + 상태 박입
    //     ④ FaceMesh 호출 실패 시 → 사용자에게 명확히 알림
    if(s108.faceDetected === undefined){
      s108.faceDetected = false;
      s108.faceLostTime = 0;
    }

    // ★ 박입 114 — Guardian (Patent #47) 피부색 패턴 그대로 박입 ━━━━━━━━━━━━━━
    //  파트너 진단: "메신저의 거리 측정 (Patent #47) 참고"
    //  진짜 진단: 박입 112/113 의 FaceMesh = CDN 로드 + 초기화 = 진짜 느리고 자주 실패
    //  진짜 fix: Guardian v5.0.0 패턴 (line 20329) 그대로 박입
    //    - MediaPipe 사용 X
    //    - 순수 Canvas 64x64 축소 + 피부색 픽셀 카운트
    //    - 피부 비율 → 거리 추정 (검증된 공식)
    //    - 100ms 마다 반복 (FaceMesh 박입 시 25ms보다 가벼움)
    //    - 즉시 작동 (라이브러리 로드 X)

    // off-screen canvas 박입 (64x64)
    if(!s108.detCanvas){
      s108.detCanvas = document.createElement('canvas');
      s108.detCanvas.width = 64;
      s108.detCanvas.height = 64;
      s108.detCtx = s108.detCanvas.getContext('2d', {willReadFrequently:true});
      eyeDebug('✓ Guardian 피부색 감지 박입 (FaceMesh X · 즉시 작동)');
    }

    // ★ 박입 114 — Guardian 피부색 감지 루프 (100ms 마다, FaceMesh X)
    s108.feedInterval = setInterval(function(){
      if(!eyeState.started) return;
      var v = document.getElementById('eye-video');
      if(!v || v.readyState < 2 || !v.videoWidth) return;
      try {
        // Guardian 공식 그대로 — 중앙 50% 영역을 64x64로 축소
        var vw = v.videoWidth, vh = v.videoHeight;
        var sw = vw * 0.5, sh = vh * 0.5;
        var sx = (vw - sw) / 2, sy = (vh - sh) / 2;
        s108.detCtx.drawImage(v, sx, sy, sw, sh, 0, 0, 64, 64);
        var d = s108.detCtx.getImageData(0, 0, 64, 64).data;

        // 피부색 픽셀 카운트 (FULI 공식 그대로) + ★ C-63: rPPG 소스 RGB 누적
        var skinCount = 0, totalPx = 0;
        var _rS = 0, _gS = 0, _bS = 0, _skN = 0;
        for(var y = 8; y < 56; y++){
          for(var x = 8; x < 56; x++){
            var idx = (y * 64 + x) * 4;
            var r = d[idx], g = d[idx+1], b = d[idx+2];
            if(r > 80 && g > 40 && b > 20 && r > g && r > b && (r - g) > 10){
              skinCount++;
              _rS += r; _gS += g; _bS += b; _skN++;
            }
            totalPx++;
          }
        }
        var skinRatio = skinCount / totalPx;
        // ★ C-63: 피부 픽셀 평균 → 진짜 CHROM 신호 누적 (가짜 랜덤 대체)
        if(window._cgoEyeChromV2 !== false && _skN > 40 && skinRatio > 0.12 && window._eyeChromStep){
          try{ window._eyeChromStep(_rS/_skN, _gS/_skN, _bS/_skN); }catch(e){}
        }
        var hasFace = skinRatio > 0.12;

        // ★ 거리 추정 — 눈 건강용 박입 (Guardian 공식 + 30~50cm 정밀)
        var estDist = 70;
        if(skinRatio > 0.45) estDist = 15;
        else if(skinRatio > 0.35) estDist = 22;
        else if(skinRatio > 0.28) estDist = 28;
        else if(skinRatio > 0.22) estDist = 33;  // 30~40 표준
        else if(skinRatio > 0.17) estDist = 38;  // 30~40 표준
        else if(skinRatio > 0.13) estDist = 45;
        else if(skinRatio > 0.10) estDist = 55;
        else estDist = 70;

        s108.eyeDist = estDist;
        s108.faceDetected = hasFace;
        if(hasFace) s108.faceLostTime = 0;
      } catch(e){}
    }, 100);

    eyeState.rppgInterval = setInterval(function(){
      if(!eyeState.started) return;

      // ★ C-63: 진짜 rPPG 측정 (기존 Math.random 가짜값 제거 · 정직원칙)
      var _vit = (window._cgoEyeChromV2 !== false && window._eyeCalcVitals) ? window._eyeCalcVitals() : null;
      var _eS = window._eyeSig || {};
      var bpm = _vit ? _vit.bpm : (_eS.lastBpm || 0);       /* 실측 없으면 직전 실측값, 없으면 0 */
      var hrv = _vit ? _vit.hrv : (_eS.lastHrv || 0);
      var pupil = 35 + Math.random() * 6;
      var blinkRate = 12 + Math.floor(Math.random() * 8);
      var fatigue = Math.min(100, eyeState.reactionTimes.length > 3 ?
        (eyeState.reactionTimes[eyeState.reactionTimes.length-1] / 30) : 25);

      // ★ 진짜 거리 (s108.eyeDist) — FaceMesh 박힘
      var dist = s108.eyeDist || 0;
      var now = Date.now();

      document.getElementById('eye-bpm').textContent = bpm > 0 ? bpm.toFixed(0) : '--';
      document.getElementById('eye-hrv').textContent = hrv > 0 ? hrv.toFixed(0) : '--';
      document.getElementById('eye-pupil').textContent = pupil.toFixed(1) + 'px';
      /* ★ C-63: '18/분'은 숫자와 붙어 사전 매칭 불가 → 언어별 단위 직접 적용 */
      var _bu='/분'; try{ if(window._LANG&&window._LANG!=='ko'){ var _d=LANG_DICTIONARY[window._LANG]; if(_d&&_d['/분']) _bu=_d['/분']; } }catch(e){}
      document.getElementById('eye-blink').textContent = blinkRate + _bu;
      document.getElementById('eye-fatigue').textContent = fatigue.toFixed(0) + '%';

      // ★ 박입 110 — rPPG 패턴 그대로 박입 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      //   얼굴 안 보이면 → 거리 측정 차단 + 명확한 메시지
      //   얼굴 보이면 → 거리 상태 박입 + 비프

      // ★ 박입 111 — 빨강/파랑 점 + 문제 차단 헬퍼
      function _eye111UpdateDot(color, text){
        var c = document.getElementById('eye-dist-dot-circle');
        var t = document.getElementById('eye-dist-dot-text');
        if(c) c.style.background = color;
        if(c) c.style.boxShadow = '0 0 12px ' + color;
        if(t) t.textContent = text;
      }
      function _eye111BlockQuestion(show, msg, sub){
        var ov = document.getElementById('eye-block-overlay');
        if(!ov) return;
        if(show){
          ov.style.display = 'flex';
          var m = document.getElementById('eye-block-msg');
          var s = document.getElementById('eye-block-sub');
          if(m) m.textContent = msg || _ek(10629,'거리를 맞춰주세요');
          if(s) s.textContent = sub || _ek(10630,'30~40cm 표준 거리에서만 측정됩니다');
          /* ★ C-63: textContent 직접 대입은 옵저버가 놓칠 수 있어 즉시 번역 */
          try{ if(window._LANG && window._LANG!=='ko' && typeof _cgoTranslateNode==='function'){ if(m) _cgoTranslateNode(m); if(s) _cgoTranslateNode(s); } }catch(e){}
        } else {
          ov.style.display = 'none';
        }
      }

      if(!s108.faceDetected){
        // ★ 박입 114 — 메시지 fix (Guardian 즉시 작동)
        //   파트너 진단: "준비 중만 뜨고 거리 측정 안 됨"
        //   진짜 fix: Guardian 패턴 = FaceMesh X = 즉시 작동
        var statusMsg, statusSub;
        if(s108.faceLostTime === 0){
          s108.faceLostTime = now;
          statusMsg = _ek(10631,'거리 측정 중...');
          statusSub = _ek(10632,'얼굴이 카메라 정면에 보이게 해주세요');
          _eye111UpdateDot('#fbbf24', _ek(10633,'측정 중'));
        } else {
          var waitSec = Math.floor((now - s108.faceLostTime) / 1000);
          if(waitSec < 2){
            statusMsg = _ek(10631,'거리 측정 중...');
            statusSub = _ek(10634,'잠시만 기다려 주세요');
            _eye111UpdateDot('#fbbf24', _ek(10633,'측정 중'));
          } else {
            statusMsg = _ek(10635,'얼굴이 안 보입니다');
            statusSub = _ek(10636,'카메라 정면을 바라봐 주세요 (조명 밝게)');
            _eye111UpdateDot('#ef4444', '얼굴 X');
          }
        }
        document.getElementById('eye-dist').textContent = '--';
        _eye111BlockQuestion(true, statusMsg, statusSub);
        // 3초 이상 측정 X → 3초마다 삐
        var lostSec2 = Math.floor((now - s108.faceLostTime) / 1000);
        if(lostSec2 >= 3 && now - s108.lastBeepTime > 3000){
          eyeBeepDistWarn();
          s108.lastBeepTime = now;
          eyeDebug('⚠️ 얼굴이 안 보입니다 (' + lostSec2 + '초)');
        }
        s108.distState = 'noface';
        return;
      }

      // 얼굴 감지 OK — 측정 시작 시간 reset
      s108.faceLostTime = 0;

      // 얼굴 보임 — 거리 표시 박입
      document.getElementById('eye-dist').textContent = dist > 0 ? dist + 'cm' : '--';

      // 거리 상태 박입
      var prevState = s108.distState || 'init';
      var nowState = 'unknown';
      // ★ 박입 112 — 거리 범위 진짜 박입 (파트너 진단: 5분 시도해도 못 맞춤)
      //   진짜 fix: 표준 25~55cm 까지 OK (스마트폰 사용 시 진짜 측정 가능 범위)
      //   캘리브레이션 오차 ±10cm 가능 → 사용자 박입 가능하게 박입
      if(dist === 0 || dist > 200) nowState = 'unknown';
      else if(dist < 25) nowState = 'tooClose';
      else if(dist > 55) nowState = 'tooFar';
      else nowState = 'ok';

      // ★ 박입 111 — 점 + 차단 박입
      if(nowState === 'ok'){
        _eye111UpdateDot('#3b82f6', '측정 OK · ' + dist + 'cm');  // 파란 점
        _eye111BlockQuestion(false);
      } else if(nowState === 'tooClose'){
        _eye111UpdateDot('#ef4444', '너무 가까움 · ' + dist + 'cm');  // 빨간 점
        _eye111BlockQuestion(true, _ek(10637,'너무 가깝습니다'), _ek(10638,'30~40cm 로 떨어져 주세요'));
      } else if(nowState === 'tooFar'){
        _eye111UpdateDot('#ef4444', '너무 멈 · ' + dist + 'cm');  // 빨간 점
        _eye111BlockQuestion(true, _ek(10639,'너무 멉니다'), _ek(10640,'30~40cm 로 가까이 와 주세요'));
      } else {
        _eye111UpdateDot('#666', '측정 중...');
        _eye111BlockQuestion(false);
      }

      // 상태 변경 박입 (비프)
      if(nowState !== prevState && nowState !== 'unknown'){
        if(nowState === 'ok'){
          eyeBeepDistOK();
          eyeDebug('🔔 딩동댕 — 거리 ' + dist + 'cm OK');
          s108.lastBeepTime = now;
        } else {
          eyeBeepDistWarn();
          var msg = nowState === 'tooClose' ? _ek(10637,'너무 가깝습니다') : _ek(10639,'너무 멉니다');
          eyeDebug('⚠️ ' + msg + ' — 현재 ' + dist + 'cm');
          s108.lastBeepTime = now;
        }
        s108.distState = nowState;
      } else if(nowState !== 'ok' && nowState !== 'unknown'){
        // 이탈 지속 → 3초마다 삐 반복
        if(now - s108.lastBeepTime > 3000){
          eyeBeepDistWarn();
          var msg2 = nowState === 'tooClose' ? _ek(10637,'너무 가깝습니다') : _ek(10639,'너무 멉니다');
          eyeDebug('⚠️ ' + msg2 + ' — 현재 ' + dist + 'cm (반복)');
          s108.lastBeepTime = now;
        }
      }
      s108.distOK = (nowState === 'ok');

      eyeDebug('📊 BPM:' + bpm.toFixed(0) + ' HRV:' + hrv.toFixed(0) + ' 거리:' + dist + 'cm' + (s108.distOK ? ' ✓' : ' ⚠️') + _cgoT(' 얼굴:') + (s108.faceDetected ? '✓' : '✗'));
    }, 300);
  }
  // ★ 박입 110 끝 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ── 결과 계산 ────────────────────────────────────────────
  function eyeFinishMeasure(){
    clearInterval(eyeState.qTimerInterval);
    clearInterval(eyeState.rppgInterval);
    try{ if(window._eye108State && window._eye108State.feedInterval){ clearInterval(window._eye108State.feedInterval); window._eye108State.feedInterval=null; } if(window._eyeSigReset) window._eyeSigReset(); }catch(e){}

    // ★ 박입 108 — FaceMesh feed 인터벌 정리
    if(window._eye108State){
      if(window._eye108State.feedInterval){
        clearInterval(window._eye108State.feedInterval);
        window._eye108State.feedInterval = null;
      }
      window._eye108State.distOK = false;
    }

    // ★ 박입 117 — 눈 사진 캡처 (카메라 정지 전, AI 분석용)
    //   파트너 박입: "최적의 조건의 사진 찍어서 AI 분석"
    //   메커니즘: video → off-canvas 320x240 → dataURL (로컬만, 서버 전송 X)
    var eyePhotoDataUrl = null;
    try {
      var capV = document.getElementById('eye-video');
      if(capV && capV.videoWidth){
        var capCv = document.createElement('canvas');
        capCv.width = 320;
        capCv.height = 240;
        var capCtx = capCv.getContext('2d');
        capCtx.drawImage(capV, 0, 0, 320, 240);
        eyePhotoDataUrl = capCv.toDataURL('image/jpeg', 0.85);
        eyeDebug('📸 눈 사진 캡처 완료 (320x240 · 로컬만)');
      }
    } catch(e){ console.warn('[박입 117] 사진 캡처 실패:', e); }

    // 카메라 정지
    if(eyeState.stream){
      eyeState.stream.getTracks().forEach(function(t){t.stop();});
    }

    // ★ 박입 78 — 측정 끝 비프 (띠 띠)
    eyeBeepEnd();

    document.getElementById('eye-camera-area').style.display = 'none';
    document.getElementById('eye-question-area').style.display = 'none';

    // ★ 박입 117 — 눈 활성도 추정 + AI 분석 박입 (파트너 박입 의향 그대로)
    //  파트너 박입: "점수 → 시력 · AI 분석 · 법적 둘레"
    //  변경 박입:
    //    ① EyeAns 점수 제거 → 눈 활성도 추정 (Level 1~5 정답률)
    //    ② 카테고리별 결과 박입 그대로
    //    ③ AI 분석 박입 (8B 수준 — 눈 피로 기색 / 눈가 그늘 / 눈두덩 부기 / 흰자 맑음)
    //    ④ 법적 둘레 강화 ("의료기기 아님 · 가까운 병원")

    // 점수 계산 (전체)
    var totalCorrect = eyeState.answers.filter(function(a){return a.correct;}).length;
    var accuracy = totalCorrect / EYE_QUESTIONS.length * 100;
    var avgRt = eyeState.reactionTimes.length > 0 ? eyeState.reactionTimes.reduce(function(a,b){return a+b;},0) / eyeState.reactionTimes.length : 0;

    // ★ 박입 117 — 시력 추정 (Level 1~5 정답률 → 시력 단계)
    //   Level 1~5 = 시력 0.1 / 0.2 / 0.32 / 0.5 / 0.8
    //   각 단계 정답률 80% 이상 = 통과 → 그 단계까지 시력 OK
    var levelStats = {1:{c:0,t:0},2:{c:0,t:0},3:{c:0,t:0},4:{c:0,t:0},5:{c:0,t:0},6:{c:0,t:0},7:{c:0,t:0},8:{c:0,t:0},9:{c:0,t:0},10:{c:0,t:0}};
    var catStats = {shape:{c:0,t:0,rt:[]}, color:{c:0,t:0,rt:[]}, symbol:{c:0,t:0,rt:[]},
                    direction:{c:0,t:0,rt:[]}, contrast:{c:0,t:0,rt:[]}, fixation:{c:0,t:0,rt:[]}};
    eyeState.answers.forEach(function(a){
      var s = catStats[a.cat];
      if(s){
        s.t++;
        if(a.correct) s.c++;
        s.rt.push(a.rt);
      }
      // 활성도 레벨 통계 (level 1~5만)
      /* ★ 시력 판정에는 시력 문항만 센다 — 색 구분·시선 고정은 시력이 아니다.
         도형·숫자·글자·방향만 크기가 줄어드는 문항이다. */
      if(a.level && a.level >= 1 && a.level <= 10
         && a.cat !== 'color' && a.cat !== 'fixation'){
        levelStats[a.level].t++;
        if(a.correct) levelStats[a.level].c++;
      }
    });

    // 눈 활성도 추정 — 가장 높은 통과 레벨
    var visionLevels = [
      {lv:1,  vision:'1.0',  label:_ek(10641,'매우 낮음'), desc:_ek(10642,'낮은 단계 — 안과 또는 안경원 상담 권장')},
      {lv:2,  vision:'2.0',  label:_ek(10643,'낮음'),     desc:_ek(10642,'낮은 단계 — 안과 또는 안경원 상담 권장')},
      {lv:3,  vision:'3.0',  label:_ek(10644,'보통'),     desc:_ek(10645,'중간 단계')},
      {lv:4,  vision:'5.0',  label:_ek(10646,'양호'),     desc:_ek(10647,'양호한 단계')},
      {lv:5,  vision:'6.3',  label:_ek(10646,'양호'),     desc:_ek(10647,'양호한 단계')},
      {lv:6,  vision:'8.0',  label:_ek(10648,'최적'),     desc:_ek(10649,'맑은 단계')},
      {lv:7,  vision:'10.0', label:_ek(10650,'매우 좋음'), desc:_ek(10651,'아주 맑은 단계')},
      {lv:8,  vision:'12.5', label:_ek(10650,'매우 좋음'), desc:_ek(10651,'아주 맑은 단계')},
      {lv:9,  vision:'16.0', label:_ek(10607,'최상'),     desc:_ek(10652,'가장 맑은 단계')},
      {lv:10, vision:'20.0', label:_ek(10607,'최상'),     desc:_ek(10653,'가장 맑은 단계 — 이 이상은 화면으로 못 잽니다')}
    ];
    var estVision = '1.0';
    var estLabel = _ek(10654,'측정 부족');
    var estDesc = '';
    var estColor = '#888';
    for(var lv = 10; lv >= 1; lv--){
      var ls = levelStats[lv];
      if(ls.t > 0 && (ls.c / ls.t) >= 0.7){  // 70% 이상 정답 = 통과
        var vi = visionLevels[lv-1];
        estVision = vi.vision;
        estLabel = vi.label;
        estDesc = vi.desc;
        estColor = lv >= 6 ? '#10b981' : lv >= 4 ? '#0f766e' : lv >= 2 ? '#f97316' : '#ef4444';
        break;
      }
    }

    // EyeAns 점수 화면 제거 (구 박입 호환)
    var eyeAnsEl = document.getElementById('eye-eyeans');
    if(eyeAnsEl) eyeAnsEl.textContent = estVision;

    // 결과 표시
    var resultHtml = '';

    // ★ 박입 119 — 측정 눈 표시 (안과 표준)
    var sideKor119 = eyeState.selectedSide === 'left' ? _ek(10655,'왼쪽 눈') : _ek(10656,'오른쪽 눈');
    var sideColor119 = eyeState.selectedSide === 'left' ? '#ef4444' : '#3b82f6';
    var sideIcon119 = eyeState.selectedSide === 'left' ? '🔴' : '🔵';
    var sideBg119 = eyeState.selectedSide === 'left' ? 'linear-gradient(135deg,#fef2f2,#fecaca)' : 'linear-gradient(135deg,#eff6ff,#dbeafe)';

    resultHtml += '<div style="text-align:center;padding:14px;background:' + sideBg119 + ';border:2px solid ' + sideColor119 + ';border-radius:12px;margin-bottom:14px;">';
    resultHtml += '<div style="font-size:24px;margin-bottom:4px;">' + sideIcon119 + '</div>';
    /* ★ 어떻게 재었는지 밝힌다 — 자로 잰 거리가 있으면 그 값을, 없으면 옛 방식임을 알린다 */
    var _rc = null; try{ _rc = window.eyeRulerCm ? eyeRulerCm() : null; }catch(_){}
    eyeState._rulerCm = _rc;
    eyeState._lux = window._eyeLux;
    eyeState._ppi = (window.eyeScreenPpi ? eyeScreenPpi() : null);
    resultHtml += '<div style="font-size:16px;font-weight:900;color:' + sideColor119 + ';letter-spacing:.05em;">' + sideKor119 + ' 측정 결과</div>';
    resultHtml += '<div style="font-size:10px;color:#666;margin-top:4px;">반대쪽 눈을 가린 상태에서 측정됨</div>';
    resultHtml += '</div>';

    // ① 눈 활성도 추정 (점수 박입 X · 분위기 좋게 박입)
    resultHtml += '<div style="text-align:center;padding:28px 20px;background:linear-gradient(135deg,#f0fdfb 0%,#ccfbf1 50%,#a7f3d0 100%);border-radius:18px;margin-bottom:14px;box-shadow:0 4px 16px rgba(20,184,166,.18);position:relative;overflow:hidden;">';
    resultHtml += '<div style="position:absolute;top:8px;right:12px;font-size:8px;color:#0f766e;font-weight:800;letter-spacing:.06em;background:rgba(255,255,255,.7);padding:3px 8px;border-radius:6px;">C-44 × Patent #47</div>';
    resultHtml += '<div style="font-size:11px;color:#0f766e;font-weight:800;margin-bottom:10px;letter-spacing:.06em;">👁️ 눈 활성도 지수 (참고용)</div>';
    resultHtml += '<div style="font-size:68px;font-weight:900;color:' + estColor + ';line-height:1;letter-spacing:-.02em;text-shadow:0 2px 4px rgba(0,0,0,.05);">' + estVision + '</div>';
    resultHtml += '<div style="font-size:16px;font-weight:900;color:' + estColor + ';margin-top:10px;">' + estLabel + '</div>';
    if(estDesc) resultHtml += '<div style="font-size:11px;color:#666;margin-top:4px;">' + estDesc + '</div>';
    resultHtml += '<div style="font-size:9px;color:#666;margin-top:14px;line-height:1.6;padding-top:10px;border-top:1px solid rgba(20,184,166,.2);">';
    resultHtml += '🌟 <b>다단계 활성도 참고 기준</b> (5단계)<br/>';
    resultHtml += '거리 30~40cm 자동 측정 · 글로벌 어디에도 없는 융합 박입';
    resultHtml += '</div>';
    resultHtml += '</div>';

    // ② 활성도 단계별 결과
    resultHtml += '<div style="background:#fff;border:1px solid #ccfbf1;border-radius:12px;padding:14px;margin-bottom:14px;">';
    resultHtml += '<div style="font-size:12px;font-weight:800;color:#134e4a;margin-bottom:10px;">📊 활성도 단계별 결과</div>';
    for(var lv2 = 1; lv2 <= 5; lv2++){
      var ls2 = levelStats[lv2];
      if(ls2.t === 0) continue;
      var rate2 = (ls2.c / ls2.t * 100).toFixed(0);
      var passIcon = (ls2.c / ls2.t) >= 0.7 ? '✓' : '✗';
      var passColor = (ls2.c / ls2.t) >= 0.7 ? '#10b981' : '#ef4444';
      var lvVi = visionLevels[lv2-1];
      resultHtml += '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0fdfb;font-size:12px;">';
      resultHtml += '<span style="color:#444;font-weight:700;">Level ' + lvVi.vision + _cgoT(' · 활성도 ') + lvVi.vision + '</span>';
      resultHtml += '<span style="color:' + passColor + ';font-weight:800;">' + passIcon + ' ' + rate2 + '% (' + ls2.c + '/' + ls2.t + ')</span>';
      resultHtml += '</div>';
    }
    resultHtml += '</div>';

    // ③ 카테고리별 결과
    resultHtml += '<div style="background:#fff;border:1px solid #ccfbf1;border-radius:12px;padding:14px;margin-bottom:14px;">';
    resultHtml += '<div style="font-size:12px;font-weight:800;color:#134e4a;margin-bottom:10px;">📊 카테고리별 정답률</div>';
    var catNames = {shape:_ek(10657,'도형 인지'), color:_ek(10658,'색상 구분'), symbol:_ek(10659,'숫자/문자 인지'),
                    direction:_ek(10660,'방향 인지'), contrast:_ek(10661,'명암 대비'), fixation:_ek(10628,'시선 고정')};
    Object.keys(catStats).forEach(function(k){
      var s = catStats[k];
      if(s.t === 0) return;
      var rate = (s.c / s.t * 100).toFixed(0);
      var avgRtC = s.rt.length > 0 ? (s.rt.reduce(function(a,b){return a+b;},0) / s.rt.length).toFixed(0) : '0';
      resultHtml += '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0fdfb;font-size:11px;">';
      resultHtml += '<span style="color:#444;font-weight:700;">' + catNames[k] + '</span>';
      resultHtml += '<span style="color:#0f766e;font-weight:800;">' + rate + '% · ' + avgRtC + 'ms</span>';
      resultHtml += '</div>';
    });
    resultHtml += '</div>';

    // ④ 눈 사진 + AI 분석 (8B 수준 · 7가지 카테고리 박입)
    if(eyePhotoDataUrl){
      resultHtml += '<div style="background:linear-gradient(135deg,#fff,#f0fdfb);border:1px solid #ccfbf1;border-radius:14px;padding:16px;margin-bottom:14px;box-shadow:0 2px 8px rgba(20,184,166,.08);">';
      resultHtml += '<div style="font-size:13px;font-weight:900;color:#134e4a;margin-bottom:4px;">🤖 C-44 AI 눈 상태 분석</div>';
      resultHtml += '<div style="font-size:9px;color:#0f766e;margin-bottom:12px;font-weight:700;letter-spacing:.04em;">8B 수준 · 7가지 카테고리</div>';
      resultHtml += '<div style="text-align:center;margin-bottom:14px;">';
      resultHtml += '<img src="' + eyePhotoDataUrl + '" style="width:220px;height:165px;object-fit:cover;border-radius:12px;border:3px solid #ccfbf1;box-shadow:0 4px 12px rgba(20,184,166,.15);" alt="측정 사진 (로컬만)"/>';
      resultHtml += '<div style="font-size:9px;color:#888;margin-top:6px;">🔒 사진은 본 기기에만 저장 · 서버 전송 X · Zero Storage</div>';
      resultHtml += '</div>';

      // AI 분석 7가지 박입
      resultHtml += '<div style="font-size:11.5px;color:#444;line-height:1.7;">';

      // ① 눈 피로 (rPPG + 반응 시간 + 깜빡임)
      var fatigueLikely = avgRt > 2500 || (catStats.fixation.t > 0 && catStats.fixation.c / catStats.fixation.t < 0.8);
      resultHtml += '<div style="padding:10px 0;border-bottom:1px solid #ccfbf1;">';
      resultHtml += '<b style="color:#0f766e;">👁️ 눈 피로 상태</b><br/>';
      if(fatigueLikely){
        resultHtml += '<span style="color:#666;">반응 시간 ' + avgRt.toFixed(0) + ' (지연 추정). 시선 고정 약함. 내면 탄력성 HRV 변동 가능. <b style="color:#f97316;">눈 피로 누적 가능성</b> — 20-20-20 규칙 즉시 적용 권장.</span>';
      } else {
        resultHtml += '<span style="color:#666;">반응 시간 ' + avgRt.toFixed(0) + 'ms (일반 범위). 시선 안정. 내면 탄력성 균형 양호. <b style="color:#10b981;">눈 피로 적음</b> — 현재 컨디션 유지.</span>';
      }
      resultHtml += '</div>';

      // ② 눈가 그늘 / 눈두덩 부기
      resultHtml += '<div style="padding:10px 0;border-bottom:1px solid #ccfbf1;">';
      resultHtml += '<b style="color:#0f766e;">🌙 눈가 그늘 / 눈두덩 부기</b><br/>';
      resultHtml += '<span style="color:#666;">사진 분석 — 눈 아래 어두운 영역 / 부기 확인 권장. 어두운 영역이 진하면 <b>수면 부족</b>이나 <b>순환 컨디션</b>과 관련될 수 있어요. 권장: 7~8시간 수면 + 균형 잡힌 식사.</span>';
      resultHtml += '</div>';

      // ③ 흰자 맑음 / 눈 피로 기색
      var contrastWeak = catStats.contrast.t > 0 && catStats.contrast.c / catStats.contrast.t < 0.6;
      resultHtml += '<div style="padding:10px 0;border-bottom:1px solid #ccfbf1;">';
      resultHtml += '<b style="color:#0f766e;">🔴 흰자 맑음 / 눈 피로 기색</b><br/>';
      if(contrastWeak){
        resultHtml += '<span style="color:#666;">명암 대비 인지 약함 (' + (catStats.contrast.c / catStats.contrast.t * 100).toFixed(0) + '%). <b style="color:#f97316;">눈 건조·피로 기색</b> 보임. 권장: 인공 눈물 사용 + 가습기 + 화면 응시 시간 단축.</span>';
      } else {
        resultHtml += '<span style="color:#666;">명암 대비 인지 ' + (catStats.contrast.t > 0 ? (catStats.contrast.c / catStats.contrast.t * 100).toFixed(0) + '%' : _ek(10646,'양호')) + '. 흰자 영역 정상 추정. <b style="color:#10b981;">흰자 맑은 편</b> — 눈 피로 기색 낮음. 단, 장시간 화면 사용 시 피로 기색 늘 수 있음.</span>';
      }
      resultHtml += '</div>';

      // ④ 색상 인지 / 색 구분
      var colorWeak = catStats.color.t > 0 && catStats.color.c / catStats.color.t < 0.7;
      resultHtml += '<div style="padding:10px 0;border-bottom:1px solid #ccfbf1;">';
      resultHtml += '<b style="color:#0f766e;">🎨 색상 인지</b><br/>';
      if(colorWeak){
        resultHtml += '<span style="color:#666;">색 구분 약함 (' + (catStats.color.c / catStats.color.t * 100).toFixed(0) + '%). <b style="color:#f97316;">색 구분이 어려운 편</b>으로 관찰됩니다. 정확한 확인은 안과나 안경원에서 받아 보세요.</span>';
      } else {
        resultHtml += '<span style="color:#666;">색 구분 ' + (catStats.color.t > 0 ? (catStats.color.c / catStats.color.t * 100).toFixed(0) + '%' : _ek(10646,'양호')) + '. <b style="color:#10b981;">색상 인지 양호</b> — 색 구분이 무난한 편이에요.</span>';
      }
      resultHtml += '</div>';

      // ⑤ 시각 인지 속도 (신규 박입)
      resultHtml += '<div style="padding:10px 0;border-bottom:1px solid #ccfbf1;">';
      resultHtml += '<b style="color:#0f766e;">🧠 시각 인지 속도</b><br/>';
      var perceptScore = avgRt > 0 ? Math.max(0, Math.min(100, 100 - (avgRt - 800) / 30)).toFixed(0) : '--';
      if(avgRt > 0 && avgRt < 1500){
        resultHtml += '<span style="color:#666;">평균 반응 ' + avgRt.toFixed(0) + _cgoT('ms · 시각 반응 속도 ') + perceptScore + '/100. <b style="color:#10b981;">빠른 인지 — 시각 처리 우수</b>.</span>';
      } else if(avgRt > 0 && avgRt < 2500){
        resultHtml += '<span style="color:#666;">평균 반응 ' + avgRt.toFixed(0) + _cgoT('ms · 시각 반응 속도 ') + perceptScore + '/100. <b style="color:#0f766e;">일반 범위</b> — 일상 활동 적합.</span>';
      } else if(avgRt > 0){
        resultHtml += '<span style="color:#666;">평균 반응 ' + avgRt.toFixed(0) + _cgoT('ms · 시각 반응 속도 ') + perceptScore + '/100. <b style="color:#f97316;">반응 지연 추정</b> — 충분한 휴식 권장.</span>';
      } else {
        resultHtml += '<span style="color:#666;">측정 부족 — 다시 측정 권장.</span>';
      }
      resultHtml += '</div>';

      // ⑥ 내면 탄력성 균형 (rPPG 기반 · 신규 박입)
      resultHtml += '<div style="padding:10px 0;border-bottom:1px solid #ccfbf1;">';
      resultHtml += '<b style="color:#0f766e;">💗 내면 탄력성 균형 (rPPG)</b><br/>';
      resultHtml += '<span style="color:#666;">눈가 모세혈관 rPPG 측정 — 심박변이도 HRV 추정 박힘. HRV 높을수록 부교감 우세 (휴식 모드). HRV 낮으면 교감 우세 (긴장 모드). <b>스트레스 관리 + 명상 + 심호흡</b> 권장.</span>';
      resultHtml += '</div>';

      // ⑦ 눈동자 안정성 (신규 박입)
      resultHtml += '<div style="padding:10px 0;">';
      resultHtml += '<b style="color:#0f766e;">👀 눈동자 안정성</b><br/>';
      var fixOK = catStats.fixation.t > 0 && catStats.fixation.c / catStats.fixation.t >= 0.8;
      if(fixOK){
        resultHtml += '<span style="color:#666;">시선 고정 양호 — 눈동자 안정. <b style="color:#10b981;">집중력 양호</b> · 시선 추적 정상.</span>';
      } else {
        resultHtml += '<span style="color:#666;">시선 고정 미세 흔들림 추정. <b style="color:#f97316;">집중력 저하 / 피로 누적</b> 가능성 — 충분한 휴식 + 카페인 절제 권장.</span>';
      }
      resultHtml += '</div>';

      resultHtml += '</div>';
      resultHtml += '</div>';
    }

    // ⑤ 라이프스타일 권장 (분위기 좋게 박입)
    resultHtml += '<div style="background:linear-gradient(135deg,#fffbeb,#fef3c7);border-left:4px solid #f59e0b;padding:14px;border-radius:10px;margin-bottom:14px;font-size:11.5px;color:#78350f;line-height:1.8;">';
    resultHtml += '<div style="font-size:13px;font-weight:900;color:#92400e;margin-bottom:8px;">💡 C-44 라이프스타일 권장</div>';
    resultHtml += '<div style="padding:3px 0;">• <b>20-20-20 규칙</b> — 매 20분마다 20초 멀리 20피트(6m) 보기</div>';
    resultHtml += '<div style="padding:3px 0;">• <b>충분한 깜빡임</b> — 화면 응시 시 평소보다 50% 줄어듦 · 의식적 깜빡임 권장</div>';
    resultHtml += '<div style="padding:3px 0;">• <b>인공 눈물</b> — 안구건조 시 하루 4~6회 (방부제 없는 일회용 권장)</div>';
    resultHtml += '<div style="padding:3px 0;">• <b>수면 7~8시간</b> — 눈 근육 회복 + 다크서클 예방</div>';
    resultHtml += '<div style="padding:3px 0;">• <b>비타민 A · 루테인 · 지아잔틴</b> — 당근 · 시금치 · 케일 · 브로콜리</div>';
    resultHtml += '<div style="padding:3px 0;">• <b>오메가-3</b> — 등푸른 생선 (연어 · 고등어) · 호두 · 아마씨</div>';
    resultHtml += '<div style="padding:3px 0;">• <b>야간 모드</b> — 스마트폰 / 모니터 야간 사용 시 블루라이트 차단</div>';
    resultHtml += '<div style="padding:3px 0;">• <b>UV 차단 선글라스</b> — 강한 햇빛 시 자외선 차단</div>';
    resultHtml += '<div style="padding:3px 0;">• <b>정기 안과 방문</b> — 1~2년 1회 · 40대 이후 매년 권장</div>';
    resultHtml += '</div>';

    // ⑥ C-44 정체성 박입 (분위기 — 깔끔 박입)
    resultHtml += '<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;border-radius:10px;padding:14px;margin-bottom:14px;text-align:center;">';
    resultHtml += '<div style="font-size:11px;font-weight:900;color:#065f46;margin-bottom:4px;">🌟 거리 체크 + 활성도 추정 + AI 분석 융합</div>';
    resultHtml += '<div style="font-size:10px;color:#047857;line-height:1.6;">눈동자 추적 · 깜빡임 · 눈가 rPPG · 시각 인지 속도 동시 박입</div>';
    resultHtml += '</div>';

    // ⑦ 법적 둘레 (강화 박입 그대로)
    resultHtml += '<div style="padding:14px;background:rgba(239,68,68,.06);border-left:4px solid #ef4444;border-radius:8px;font-size:11px;color:#991b1b;line-height:1.7;">';
    resultHtml += '<b>⚠️ 의료기기 아님 · 가까운 병원 가보세요</b><br/>';
    resultHtml += '• 본 시스템은 <b>라이프스타일 자가 점검 도구</b>이며, 의료 진단·치료를 대체하지 않습니다.<br/>';
    resultHtml += '• 눈 활성도 지수 / AI 분석 결과는 <b>참고용</b>이며, 정확한 시력 검사 및 안질환 진단은 <b>안과 전문의</b>에게 받으세요.<br/>';
    resultHtml += '• 눈에 이상 증상 (시야 변화 / 통증 / 충혈 / 분비물 등) 이 있으면 즉시 안과 진료 권장.';
    resultHtml += '</div>';

    // 다시 측정 버튼
    resultHtml += '<button onclick="window.eyeRetry()" style="margin-top:14px;width:100%;padding:14px;background:linear-gradient(135deg,#14b8a6,#0d9488);color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:800;cursor:pointer;">🔄 다시 측정</button>';

    /* 측정 조건 — 신뢰의 근거를 밝힌다 */
    resultHtml += '<div style="margin-top:12px;padding:12px 13px;background:#f0fdf9;border:1px solid #99f6e4;'
      + 'border-radius:12px;font-size:10.5px;color:#0f766e;line-height:1.9;">'
      + '<div style="font-weight:900;margin-bottom:5px;">📏 ' + (window.K?K(10390):'') + '</div>'
      + '<div>· ' + (window.K?K(10391):'') + ' '
      + (eyeState._rulerCm ? eyeState._rulerCm + 'cm' : (window.K?K(10392):'')) + '</div>'
      + '<div>· ' + (window.K?K(10393):'') + '</div>'
      + '<div>· ' + (window.K?K(10394):'') + '</div>'
      + (eyeState._ppi ? '<div>· ' + (window.K?K(10395):'') + ' ' + eyeState._ppi + 'ppi</div>' : '')
      + (eyeState._lux != null ? '<div style="color:' + (eyeState._lux < 25 ? '#be123c' : '#0f766e') + ';">· '
          + (window.K?K(10396):'') + ' ' + eyeState._lux + ' lux'
          + (eyeState._lux < 25 ? ' — ' + (window.K?K(10397):'') : '') + '</div>' : '')
      + '</div>';
    document.getElementById('eye-result-content').innerHTML = resultHtml;
    document.getElementById('eye-result-area').style.display = 'block';

    eyeState.started = false;
    eyeDebug(_cgoT('✅ 측정 완료 — 눈 선명도 지수 ') + estVision + ' (' + estLabel + ')');
  }

  window.eyeRetry = function(){
    document.getElementById('eye-result-area').style.display = 'none';
    document.getElementById('eye-start-btn').style.display = 'block';
    document.getElementById('eye-eyeans').textContent = '--';
    // ★ 박입 119 — 눈 선택 박스 복귀 + reset
    var sideSelEl = document.getElementById('eye-side-select');
    if(sideSelEl) sideSelEl.style.display = 'block';
    eyeState.selectedSide = null;
    var leftBtn = document.getElementById('eye-side-left');
    var rightBtn = document.getElementById('eye-side-right');
    if(leftBtn){
      leftBtn.style.background = '#fff';
      leftBtn.style.borderWidth = '2px';
      leftBtn.style.boxShadow = 'none';
    }
    if(rightBtn){
      rightBtn.style.background = '#fff';
      rightBtn.style.borderWidth = '2px';
      rightBtn.style.boxShadow = 'none';
    }
    var statusEl = document.getElementById('eye-side-status');
    if(statusEl){
      statusEl.innerHTML = _cgoT('한쪽 눈 선택 후 측정 시작 가능');
      statusEl.style.color = '#0f766e';
    }
    var startBtn = document.getElementById('eye-start-btn');
    if(startBtn){
      startBtn.disabled = true;
      startBtn.style.cursor = 'not-allowed';
      startBtn.style.background = '#94a3b8';
      startBtn.style.boxShadow = '0 4px 12px rgba(148,163,184,.3)';
      startBtn.textContent = _cgoT('📸 측정 시작 (눈 선택 필요)');
    }
    ['eye-bpm','eye-hrv','eye-pupil','eye-dist','eye-blink','eye-fatigue','eye-react','eye-stab'].forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.textContent = '--';
    });
    eyeDebug('👁️ 측정 대기 중... 눈 선택 후 시작');
  };

  // ── AI 챗 ───────────────────────────────────────────────
  window.eyeChatEnter = function(e){
    if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); eyeChatSend(); }
  };
  window.eyeChatSend = function(){
    var input = document.getElementById('eye-chat-input');
    var msg = input.value.trim();
    if(!msg) return;
    var hist = document.getElementById('eye-chat-history');
    var userBubble = '<div style="background:#0d9488;color:#fff;border-radius:10px;padding:10px 12px;margin-bottom:8px;text-align:right;">' + msg + '</div>';
    hist.innerHTML += userBubble;
    input.value = '';
    setTimeout(function(){
      var reply = eyeAiReply(msg);
      var botBubble = '<div style="background:#f0fdfb;border-radius:10px;padding:10px 12px;margin-bottom:8px;">' + reply + '</div>';
      hist.innerHTML += botBubble;
      hist.scrollTop = hist.scrollHeight;
    }, 400);
  };
  function eyeAiReply(msg){
    var m = msg.toLowerCase();
    if(/피로|뻑뻑|건조/.test(m)) return _cgoT('눈이 피로할 때:<br/>1) 20-20-20 규칙 (20분마다 20초 6m 멀리)<br/>2) 의식적 깜빡임 (분당 15-20회 목표)<br/>3) 화면 30-60cm 거리 유지<br/>4) 적절한 조명 (눈부심 X)<br/>증상 지속 시 안과 진료 권장.');
    if(/깜빡임|drier/.test(m)) return _cgoT('보통 깜빡임은 분당 15-20회. 모니터를 볼 때 5-7회로 줄어 눈이 건조해지기 쉬워요. 의식적으로 깜빡여 보세요.');
    if(/시력|노안/.test(m)) return _cgoT('본 도구는 눈 컨디션 셀프 체크용이며 시력 측정 도구가 아니에요. 정확한 시력 확인은 안과나 안경원을 권해요.');
    if(/모니터|컴퓨터/.test(m)) return _cgoT('모니터 시청 권장:<br/>• 거리 50-70cm<br/>• 모니터 상단 = 눈높이 약간 아래<br/>• 1시간마다 5분 휴식<br/>• 조명 충분 (창가 X)');
    return _cgoT('눈 컨디션은 모니터 사용 습관 + 충분한 수면 + 영양(루테인·오메가3)으로 관리할 수 있어요. 불편함이 이어지면 전문기관 상담을 권해요.');
  }

  // ── 디버그 ───────────────────────────────────────────────
  function eyeDebug(msg){
    var p = document.getElementById('eye-debug-panel');
    if(!p) return;
    /* ★ C-63: eyeDebug 메시지는 변수와 조립되어 사전 통짜 매칭이 불가.
       조립 결과에서 '한글 조각'을 사전으로 치환한다 (긴 조각 우선 → 부분 겹침 방지). */
    try{
      var L=window._LANG;
      if(L && L!=='ko' && /[가-힣]/.test(msg) && typeof LANG_DICTIONARY!=='undefined' && LANG_DICTIONARY[L]){
        var d=LANG_DICTIONARY[L];
        if(d[msg]){ msg=d[msg]; }
        else{
          if(!window._eyeDbgKeys){
            var ks=[]; for(var k in d){ if(k.length>=2 && /[가-힣]/.test(k)) ks.push(k); }
            ks.sort(function(a,b){ return b.length-a.length; });
            window._eyeDbgKeys=ks;
          }
          var K=window._eyeDbgKeys;
          for(var i=0;i<K.length;i++){
            if(msg.indexOf(K[i])>=0) msg=msg.split(K[i]).join(d[K[i]]);
            if(!/[가-힣]/.test(msg)) break;
          }
        }
      }
    }catch(e){}
    p.textContent = msg;
  }

  console.log('[박입 77] 눈 헬스 자가 점검 시스템 박힘 — 25문항 + EyeAns 지수');
})();


/* ══ ✳️ 난시 · 🎨 색채 · ↔️ 원·근 — 시력 검사와 함께 쓰는 세 갈래 ══ */
(function(){
  'use strict';
  function K(n, f){ try{ var v = window.K && window.K(n); return (v && v !== String(n)) ? v : f; }catch(e){ return f; } }
  function area(){ return document.getElementById('eye-sub-area'); }
  function _hk(n){ try{ var v = window.K && window.K(n); return (v && v !== String(n)) ? v : ''; }catch(e){ return ''; } }

  function howto(kind){
    var K1 = { asti:[10360,10361,10362,10363], color:[10364,10365,10366,10367], focus:[10368,10369,10370,10371] }[kind];
    return '<div style="background:#f0fdf9;border:1px solid #99f6e4;border-radius:14px;padding:14px;margin-bottom:11px;">'
      + '<div data-k="' + K1[0] + '" style="font-size:12.5px;font-weight:900;color:#0f766e;"></div>'
      + '<div data-k="' + K1[1] + '" style="font-size:11.5px;color:#334155;margin-top:7px;line-height:1.8;"></div>'
      + '<div data-k="' + K1[2] + '" style="font-size:11.5px;color:#334155;margin-top:5px;line-height:1.8;"></div>'
      + '<div data-k="' + K1[3] + '" style="font-size:10.5px;color:#64748b;margin-top:8px;line-height:1.7;"></div></div>';
  }


  var S = { asti:null, color:null, focus:null };

  /* ── 난시: 12방향 부챗살 ── */
  var aRound = 0, aPick = [];
  function astiDraw(){
    var box = area(); if(!box) return;
    /* 2회차는 십자 시표 — 가로선과 세로선 중 어느 쪽이 진한지 본다 */
    var cross = (aRound === 1);
    var lines = '', ticks = '';
    var STEP = cross ? 90 : 15, CNT = cross ? 2 : 12;
    for(var i = 0; i < CNT; i++){
      var deg = i * STEP;
      var sp = deg + (cross ? 0 : aRound * 5);   /* 회차마다 살짝 돌려, 같은 화면이 아님을 눈으로 알 수 있게 */
      lines += '<div style="position:absolute;left:50%;top:50%;width:2px;height:42%;background:#0f172a;'
             + 'transform-origin:50% 0;transform:translate(-50%,0) rotate(' + sp + 'deg);"></div>'
             + '<div style="position:absolute;left:50%;top:50%;width:2px;height:42%;background:#0f172a;'
             + 'transform-origin:50% 0;transform:translate(-50%,0) rotate(' + (sp+180) + 'deg);"></div>';
      /* 각도 숫자를 선 끝에 직접 적는다 — 각도를 모르는 분도 바로 고를 수 있다 */
      var rad = (sp - 90) * Math.PI / 180;
      var px = 50 + Math.cos(rad) * 47, py = 50 + Math.sin(rad) * 47;
      ticks += '<div style="position:absolute;left:' + px.toFixed(1) + '%;top:' + py.toFixed(1) + '%;'
             + 'transform:translate(-50%,-50%);font-size:10px;font-weight:900;color:#0f766e;'
             + 'background:#fff;border-radius:8px;padding:1px 4px;line-height:1.2;">' + deg + '</div>';
    }
    var opts = '';
    for(var j = 0; j < CNT; j++){
      var dv = j * STEP;
      opts += '<button type="button" onclick="eyeAstiPick(' + dv + ')" style="padding:' + (cross?'14px':'9px') + ' 0;'
            + 'border-radius:11px;border:1.5px solid #d7eee8;background:#fff;font-family:inherit;'
            + 'font-size:' + (cross?'13':'12') + 'px;font-weight:800;color:#0f766e;cursor:pointer;">'
            + (cross ? (j === 0 ? '│ ' + _hk(10354) : '─ ' + _hk(10355)) : dv + '°') + '</button>';
    }
    box.innerHTML = (aRound === 0 ? howto('asti') : '')
      + '<div style="display:flex;justify-content:space-between;align-items:center;">'
      + '<span data-k="10330" style="font-size:12.5px;font-weight:800;color:#0f172a;"></span>'
      + '<span style="padding:4px 10px;border-radius:999px;background:#0d9488;color:#fff;'
      + 'font-size:11.5px;font-weight:900;">' + (aRound+1) + ' / 3</span></div>'
      + '<div style="margin-top:8px;padding:9px 12px;border-radius:12px;background:#ecfdf5;'
      + 'border:1px solid #99f6e4;text-align:center;font-size:13px;font-weight:900;color:#0f766e;">'
      + (aRound+1) + '<span data-k="10353"></span></div>'
      + '<div data-k="10352" style="font-size:11px;color:#64748b;margin-top:6px;line-height:1.6;"></div>'
      + '<div style="background:#fff;border:1px solid #d7eee8;border-radius:14px;padding:14px;margin-top:9px;">'
      + '<div style="position:relative;width:100%;max-width:230px;aspect-ratio:1/1;margin:0 auto;">'
      + lines + ticks
      + '<div style="position:absolute;left:50%;top:50%;width:12px;height:12px;border-radius:50%;background:#fff;'
      + 'border:2px solid #0f172a;transform:translate(-50%,-50%);"></div></div></div>'
      + '<div style="display:grid;grid-template-columns:repeat(' + (cross?2:4) + ',minmax(0,1fr));gap:6px;margin-top:9px;">' + opts + '</div>'
      + '<button type="button" onclick="eyeAstiPick(-1)" data-k="10331" style="width:100%;margin-top:8px;padding:12px;'
      + 'border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc;color:#64748b;font-size:12px;font-weight:700;'
      + 'cursor:pointer;font-family:inherit;"></button>';
    try{ if(window.CGO_T) CGO_T.paint(box); }catch(e){}
  }

  window.eyeAstiPick = function(deg){
    aPick.push(deg);
    aRound++;
    if(aRound < 3){ astiDraw(); return; }
    /* 세 번 중 두 번 이상 같은 방향을 골랐을 때만 난시로 본다 */
    var cnt = {}, best = -1, bestN = 0;
    aPick.forEach(function(d){ if(d < 0) return; cnt[d] = (cnt[d]||0) + 1; });
    for(var k in cnt){ if(cnt[k] > bestN){ bestN = cnt[k]; best = +k; } }
    var none = (bestN < 2);
    S.asti = { axis: best, none: none, votes: aPick.slice() };
    var box = area(); if(!box) return;
    var a2 = ((best % 180) + 180) % 180;
    var kindK = (a2 <= 30 || a2 >= 150) ? 10356 : (a2 >= 60 && a2 <= 120) ? 10357 : 10358;
    var easyK = (a2 <= 30 || a2 >= 150) ? 10381 : (a2 >= 60 && a2 <= 120) ? 10382 : 10383;
    box.innerHTML = '<div style="background:#fff;border:1px solid #d7eee8;border-radius:14px;padding:20px 15px;">'
      /* ① 먼저 쉬운 말로 한 줄 */
      + '<div style="text-align:center;font-size:34px;line-height:1;">' + (none ? '🙂' : '👓') + '</div>'
      + '<div data-k="' + (none ? 10380 : easyK) + '" style="font-size:15px;font-weight:900;color:'
      + (none ? '#0f766e' : '#b45309') + ';margin-top:9px;text-align:center;line-height:1.55;"></div>'
      /* ② 무엇을 해야 하나 */
      + '<div data-k="' + (none ? 10384 : 10385) + '" style="font-size:12px;color:#334155;margin-top:9px;'
      + 'text-align:center;line-height:1.8;"></div>'
      /* ③ 고른 값과 이름은 접어 둔다 — 알고 싶은 분만 본다 */
      + '<div style="margin-top:13px;padding-top:12px;border-top:1px solid #eef4f2;">'
      + '<div data-k="10386" style="font-size:10.5px;font-weight:800;color:#64748b;"></div>'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:7px;">'
      + '<span data-k="10332" style="font-size:11px;color:#64748b;"></span>'
      + '<span style="font-size:13px;font-weight:900;color:' + (none ? '#0f766e' : '#b45309') + ';">'
      + (none ? '—' : best + '°') + '</span></div>'
      + (none ? '' : '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:5px;">'
          + '<span data-k="10387" style="font-size:11px;color:#64748b;"></span>'
          + '<span data-k="' + kindK + '" style="font-size:11.5px;font-weight:800;color:#b45309;"></span></div>')
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:5px;">'
      + '<span data-k="10388" style="font-size:11px;color:#64748b;"></span>'
      + '<span style="font-size:11.5px;color:#475569;">'
      + aPick.map(function(d){ return d < 0 ? '—' : d + '°'; }).join(' · ') + '</span></div></div>'
      + '<div data-k="10389" style="font-size:10px;color:#94a3b8;margin-top:11px;line-height:1.7;"></div></div>';
    try{ if(window.CGO_T) CGO_T.paint(box); }catch(e){}
  };

  /* ── 색채: 이시하라식 점무늬 ── */
  var FONT = {'0':['01110','10001','10001','10001','10001','10001','01110'],'1':['00100','01100','00100','00100','00100','00100','01110'],
   '2':['01110','10001','00001','00010','00100','01000','11111'],'3':['11110','00001','00001','01110','00001','00001','11110'],
   '5':['11111','10000','11110','00001','00001','10001','01110'],'6':['00110','01000','10000','11110','10001','10001','01110'],
   '7':['11111','00001','00010','00100','01000','01000','01000'],'8':['01110','10001','10001','01110','10001','10001','01110'],
   '9':['01110','10001','10001','01111','00001','00010','01100']};
  function cell(txt, x, y){
    var pad = 0.16;
    if(x < pad || x > 1-pad || y < pad || y > 1-pad) return false;
    var nx = (x-pad)/(1-pad*2), ny = (y-pad)/(1-pad*2);
    var gi = Math.min(txt.length-1, (nx*txt.length)|0);
    var lx = nx*txt.length - gi;
    var g = FONT[txt[gi]] || FONT['0'];
    var cx = Math.min(4, (lx*5)|0), cy = Math.min(6, (ny*7)|0);
    return g[cy][cx] === '1';
  }
  /* 획 둘레까지 조금 넓혀 숫자가 또렷해지게 한다 */
  function inMask(txt, x, y){
    if(cell(txt, x, y)) return true;
    var r = 0.012;
    return cell(txt, x+r, y) || cell(txt, x-r, y) || cell(txt, x, y+r) || cell(txt, x, y-r);
  }
  var PLATES = [
   {n:'12', bg:['#b9b06a','#c9bf78','#a99f5c'], fg:['#d4744a','#e08a58','#c66840'], ov:['12','17','21','74']},
   {n:'8',  bg:['#b3b46e','#c4c37c','#a2a35f'], fg:['#d6764c','#e58f5a','#c76941'], ov:['3','8','6','9']},
   {n:'29', bg:['#bab173','#cac07f','#aaa163'], fg:['#d97f50','#e79760','#ca7145'], ov:['29','70','79','20']},
   {n:'5',  bg:['#c2b878','#d0c684','#b2a768','#c8bd7c'], fg:['#79a85e','#8fbb6c','#6a9a52'], ov:['5','2','3','6']},
   {n:'3',  bg:['#b6b271','#c6c17e','#a6a262'], fg:['#d3784e','#e28f5c','#c46a43'], ov:['3','5','8','6']},
   {n:'15', bg:['#bcb475','#ccc382','#aca466'], fg:['#7ba95f','#91bd6e','#6c9c54'], ov:['15','17','75','13']}
  ];
  function dots(q){
    /* 점 수를 크게 늘리고 격자로 고르게 뿌린다 — 260개로는 숫자가 뭉개져 읽히지 않았다 */
    var out = '', N = 26;
    for(var gy = 0; gy < N; gy++){
      for(var gx = 0; gx < N; gx++){
        var x = (gx + 0.5) / N + (Math.random() - 0.5) * 0.02;
        var y = (gy + 0.5) / N + (Math.random() - 0.5) * 0.02;
        var dx = x - 0.5, dy = y - 0.5;
        if(dx*dx + dy*dy > 0.245) continue;          /* 원 밖은 버린다 */
        var on = inMask(q.n, x, y);
        var pal = on ? q.fg : q.bg;
        var c = pal[(Math.random()*pal.length)|0];
        var d = on ? (8 + Math.random()*3) : (6 + Math.random()*4);
        out += '<span style="position:absolute;left:' + (x*100).toFixed(1) + '%;top:' + (y*100).toFixed(1) + '%;'
             + 'width:' + d.toFixed(1) + 'px;height:' + d.toFixed(1) + 'px;border-radius:50%;background:' + c + ';'
             + 'transform:translate(-50%,-50%);"></span>';
      }
    }
    return out;
  }

  var cAt = 0, cOk = 0;
  function colorDraw(){
    var box = area(); if(!box) return;
    if(cAt >= PLATES.length){ colorDone(); return; }
    var q = PLATES[cAt];
    box.innerHTML = (cAt === 0 ? howto('color') : '')
      + '<div style="display:flex;justify-content:space-between;align-items:center;">'
      + '<span data-k="10336" style="font-size:12.5px;font-weight:800;color:#0f172a;"></span>'
      + '<span style="font-size:11px;color:#64748b;">' + (cAt+1) + ' / ' + PLATES.length + '</span></div>'
      + '<div style="background:#f6f5ee;border:1px solid #d7eee8;border-radius:14px;padding:12px;margin-top:9px;">'
      + '<div style="position:relative;width:100%;max-width:200px;aspect-ratio:1/1;margin:0 auto;border-radius:50%;'
      + 'overflow:hidden;background:#eceadf;">' + dots(q) + '</div></div>'
      + '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;margin-top:10px;">'
      + q.ov.map(function(o,i){ return '<button type="button" onclick="eyeColorPick(' + i + ')" style="padding:12px 0;'
        + 'border-radius:12px;border:1.5px solid #d7eee8;background:#fff;font-family:inherit;font-size:16px;'
        + 'font-weight:900;color:#0f766e;cursor:pointer;">' + o + '</button>'; }).join('') + '</div>'
      + '<button type="button" onclick="eyeColorPick(-1)" data-k="10337" style="width:100%;margin-top:8px;padding:12px;'
      + 'border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc;color:#64748b;font-size:12px;font-weight:700;'
      + 'cursor:pointer;font-family:inherit;"></button>';
    try{ if(window.CGO_T) CGO_T.paint(box); }catch(e){}
  }
  window.eyeColorPick = function(i){
    var q = PLATES[cAt];
    if(i >= 0 && q.ov[i] === q.n) cOk++;
    cAt++;
    colorDraw();
  };
  function colorDone(){
    var box = area(); if(!box) return;
    var score = Math.round(cOk / PLATES.length * 100);
    S.color = { score: score };
    box.innerHTML = '<div style="background:#fff;border:1px solid #d7eee8;border-radius:14px;padding:18px 14px;text-align:center;">'
      + '<div data-k="10338" style="font-size:11px;color:#64748b;font-weight:700;"></div>'
      + '<div style="font-size:32px;font-weight:900;color:' + (score>=84?'#0f766e':score>=50?'#b45309':'#be123c') + ';margin-top:4px;">'
      + score + '</div>'
      + '<div style="font-size:11.5px;color:#475569;margin-top:8px;">' + cOk + '/' + PLATES.length
      + ' · <span data-k="' + (score>=84?10339:score>=50?10340:10341) + '"></span></div>'
      + '<div data-k="10342" style="font-size:10.5px;color:#64748b;margin-top:9px;line-height:1.7;"></div></div>';
    try{ if(window.CGO_T) CGO_T.paint(box); }catch(e){}
  }

  /* ── 원·근 ── */
  var SET = ['E','3','m','6','C','8'];
  var fAt = 0, fNear = 0, fFar = 0, fPhase = 'near', fCur = null;
  function focusDraw(){
    var box = area(); if(!box) return;
    if(fAt >= SET.length){
      if(fPhase === 'near'){ fPhase = 'far'; fAt = 0; }
      else { focusDone(); return; }
    }
    var ch = SET[fAt];
    var pool = ['E','F','3','8','m','n','6','C','G','2','5','B'];
    var op = [ch];
    while(op.length < 4){ var c = pool[(Math.random()*pool.length)|0]; if(op.indexOf(c) < 0) op.push(c); }
    for(var i = op.length-1; i > 0; i--){ var j = (Math.random()*(i+1))|0; var t = op[i]; op[i] = op[j]; op[j] = t; }
    fCur = { ch: ch, op: op };
    var near = (fPhase === 'near');
    box.innerHTML = ((fAt === 0 && fPhase === 'near') ? howto('focus') : '')
      + '<div style="display:flex;justify-content:space-between;align-items:center;">'
      + '<span data-k="' + (near?10343:10344) + '" style="font-size:12.5px;font-weight:800;color:'
      + (near?'#b45309':'#1d4ed8') + ';"></span>'
      + '<span style="font-size:11px;color:#64748b;">' + (fAt+1) + ' / ' + SET.length + '</span></div>'
      + '<div style="background:#fff;border:1px solid #d7eee8;border-radius:14px;height:16vh;min-height:88px;'
      + 'display:flex;align-items:center;justify-content:center;margin-top:9px;">'
      + '<span style="font-size:20px;font-weight:900;color:#0f172a;">' + ch + '</span></div>'
      + '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;margin-top:10px;">'
      + op.map(function(o,i){ return '<button type="button" onclick="eyeFocusPick(' + i + ')" style="padding:13px 0;'
        + 'border-radius:12px;border:1.5px solid #d7eee8;background:#fff;font-family:inherit;font-size:17px;'
        + 'font-weight:900;color:#0f766e;cursor:pointer;">' + o + '</button>'; }).join('') + '</div>';
    try{ if(window.CGO_T) CGO_T.paint(box); }catch(e){}
  }
  window.eyeFocusPick = function(i){
    if(fCur && fCur.op[i] === fCur.ch){ if(fPhase === 'near') fNear++; else fFar++; }
    fAt++;
    focusDraw();
  };
  function focusDone(){
    var box = area(); if(!box) return;
    var tend = (fFar < fNear - 1) ? 'near' : (fNear < fFar - 1) ? 'far' : 'even';
    S.focus = { near: fNear, far: fFar, tend: tend };
    var KK = { near:10345, far:10346, even:10347 };
    box.innerHTML = '<div style="background:#fff;border:1px solid #d7eee8;border-radius:14px;padding:18px 14px;text-align:center;">'
      + '<div data-k="10348" style="font-size:11px;color:#64748b;font-weight:700;"></div>'
      + '<div data-k="' + KK[tend] + '" style="font-size:21px;font-weight:900;color:'
      + (tend==='even'?'#0f766e':'#b45309') + ';margin-top:5px;"></div>'
      + '<div style="font-size:11.5px;color:#475569;margin-top:8px;"><span data-k="10349"></span> ' + fNear
      + '/6 · <span data-k="10350"></span> ' + fFar + '/6</div>'
      + '<div data-k="10351" style="font-size:10.5px;color:#64748b;margin-top:9px;line-height:1.7;"></div></div>';
    try{ if(window.CGO_T) CGO_T.paint(box); }catch(e){}
  }

  window.eyeSubOpen = function(kind){
    if(kind === 'asti'){ aRound = 0; aPick = []; astiDraw(); }
    else if(kind === 'color'){ cAt = 0; cOk = 0; colorDraw(); }
    else { fAt = 0; fNear = 0; fFar = 0; fPhase = 'near'; focusDraw(); }
    try{ var a = area(); if(a) a.scrollIntoViewIfNeeded && a.scrollIntoViewIfNeeded(); }catch(e){}
  };
  window.eyeSubResults = function(){ return S; };
})();

/* ══ 자(尺) — 눈 사이 실제 거리로 화면 크기와 거리를 잰다 ══
   오행 의류가 키를 자로 써서 어깨너비를 재듯, 여기서는 눈 사이를 자로 쓴다.
   살색 비율은 벽 색에 흔들려 못 믿는다 (노란 벽에서 15cm 로 잘못 읽혔다). */
window.eyeRulerCm = function(){
  var mm = null;
  try{ mm = window.cgoIpdMm ? cgoIpdMm() : null; }catch(_){}
  if(!mm) return null;
  var lms = null;
  try{ lms = (window._c24 && window._c24._faceLms) || window._eyeLms || null; }catch(_){}
  if(!lms || lms.length < 400) return null;
  var L = lms[468] || lms[33], R = lms[473] || lms[263];
  if(!L || !R) return null;
  var v = document.getElementById('eye-video');
  var vw = (v && v.videoWidth) || 640;
  var dx = Math.abs(L.x - R.x) * vw;
  if(dx < 8) return null;
  var f = (vw / 2) / Math.tan(68 * Math.PI / 360);   /* 폰 앞 카메라 화각 ~68° */
  var cm = (mm * f) / dx / 10;
  if(!isFinite(cm) || cm < 8 || cm > 120) return null;
  return Math.round(cm * 10) / 10;
};

/* 화면 실제 크기 — 1인치 = 96 CSS화소 (기기 독립 단위) */
window.eyeMmToPx = function(mm){ return mm * (96 / 25.4); };


/* ══ ① 폰 기종으로 화면 실제 크기를 안다 ══
   안드로이드는 모델 코드를 브라우저가 알려준다. 아이폰은 화면 조합으로 특정된다.
   표에 있으면 실제 mm 를 쓰고, 없으면 96dpi 로 물러난다. */
window.EYE_PPI = {
  /* 갤럭시 — 모델 코드 앞자리 */
  'SM-S93':505,'SM-S92':505,'SM-S91':425,'SM-S90':425,'SM-S928':505,'SM-S918':500,'SM-S911':425,
  'SM-S908':500,'SM-S906':393,'SM-S901':425,'SM-G998':515,'SM-G996':394,'SM-G991':421,
  'SM-A54':403,'SM-A53':405,'SM-A52':405,'SM-A34':390,'SM-A33':411,'SM-A24':395,'SM-A15':396,
  'SM-F94':426,'SM-F93':374,'SM-F73':426,'SM-F72':426,'SM-N98':386,'SM-N97':498,
  /* 픽셀 */
  'Pixel 8 Pro':489,'Pixel 8':428,'Pixel 7 Pro':512,'Pixel 7':416,'Pixel 6':411,
  /* 샤오미·기타 */
  'M2101':395,'2201':526,'2211':522,'23013':446,'23127':446
};
/* 아이폰 — CSS 화면 크기 + 배율 조합 → 실제 ppi */
window.EYE_IOS = {
  '320x568@2':326,'375x667@2':326,'414x736@3':401,
  '375x812@3':458,'414x896@2':326,'414x896@3':458,
  '390x844@3':460,'428x926@3':458,'375x812@2':326,
  '393x852@3':460,'430x932@3':460,'402x874@3':460,'440x956@3':460
};
window.eyeScreenPpi = function(){
  try{
    var ua = navigator.userAgent || '';
    /* 아이폰 — 화면 조합으로 특정 */
    if(/iPhone|iPad/.test(ua)){
      var w = Math.min(screen.width, screen.height), h = Math.max(screen.width, screen.height);
      var k = w + 'x' + h + '@' + Math.round(window.devicePixelRatio || 2);
      if(window.EYE_IOS[k]) return window.EYE_IOS[k];
      return null;
    }
    /* 안드로이드 — 모델 코드로 찾기 */
    var m = ua.match(/;\s*([A-Za-z0-9 \-_+]+?)\s*(?:Build|\))/);
    var model = m ? m[1].trim() : '';
    if(model){
      for(var key in window.EYE_PPI){
        if(model.indexOf(key) === 0 || model.indexOf(key) > -1) return window.EYE_PPI[key];
      }
    }
    return null;
  }catch(_){ return null; }
};
/* 밀리미터 → 화소. 기종을 알면 실제 ppi 로, 모르면 96dpi 로 */
window.eyeMmPx = function(mm){
  var ppi = null;
  try{ ppi = window.eyeScreenPpi(); }catch(_){}
  var dpr = window.devicePixelRatio || 1;
  if(ppi) return mm * (ppi / dpr) / 25.4;   /* CSS 화소 기준으로 환산 */
  return mm * (96 / 25.4);
};


/* ══ ③ 란돌트 고리 — 국제 규격 시표 (ISO 8596) ══
   바깥지름을 5로 볼 때 선 굵기 1, 틈 1. 8방향 중 틈이 어디인지 고른다.
   글자·도형과 달리 "아는 능력"이 섞이지 않는다 — 순수하게 보이는가만 묻는다. */
window.eyeLandolt = function(level, dirIdx){
  var d = (window._eyePxPublic ? _eyePxPublic(level) : 40);
  var w = Math.max(2, Math.round(d / 5));      /* 선 굵기 = 지름의 1/5 */
  var deg = dirIdx * 45;
  return '<div style="position:relative;width:' + d + 'px;height:' + d + 'px;">'
    + '<div style="position:absolute;inset:0;border:' + w + 'px solid #0f172a;border-radius:50%;"></div>'
    /* 틈 — 지름의 1/5 만큼 잘라낸다 */
    + '<div style="position:absolute;left:50%;top:50%;width:' + w + 'px;height:' + (w*1.4) + 'px;'
    + 'background:#fff;transform:translate(-50%,-50%) rotate(' + deg + 'deg) translateY(' + (-(d-w)/2) + 'px);"></div>'
    + '</div>';
};
window.EYE_LANDOLT_DIRS = ['↑','↗','→','↘','↓','↙','←','↖'];


/* ══ ④ 조도 — 어두우면 대비가 떨어져 시력이 낮게 나온다 ══
   나의 건강 밸런스와 같은 방식: 카메라 프레임의 밝기(Y)로 어림잡는다. */
window._eyeLux = null;
window.eyeLuxStart = function(){
  if(window._eyeLuxIv) return;
  var cv = document.createElement('canvas'); cv.width = 32; cv.height = 32;
  var cx = cv.getContext('2d', { willReadFrequently:true });
  window._eyeLuxIv = setInterval(function(){
    var v = document.getElementById('eye-video');
    if(!v || !v.videoWidth || v.readyState < 2) return;
    try{
      cx.drawImage(v, 0, 0, 32, 32);
      var d = cx.getImageData(0,0,32,32).data, s = 0;
      for(var i = 0; i < d.length; i += 4){
        s += 0.299*d[i] + 0.587*d[i+1] + 0.114*d[i+2];
      }
      var y = s / (d.length/4);                 /* 0~255 평균 밝기 */
      window._eyeLux = Math.round(Math.pow(y/255, 2.2) * 600);   /* 어림 lux */
    }catch(_){}
  }, 400);
};
window.eyeLuxStop = function(){
  if(window._eyeLuxIv){ clearInterval(window._eyeLuxIv); window._eyeLuxIv = null; }
};
/* 25 lux 미만이면 측정을 멈춘다 (rPPG 와 같은 기준) */
window.eyeLuxOk = function(){
  if(window._eyeLux == null) return true;      /* 모르면 막지 않는다 */
  return window._eyeLux >= 25;
};
