/* ══ 인지 건강 셀프 체크 — 문항 은행 (구 CGO 원문 그대로) ══
   약식 10 · 중식 20(10+10) · 고식 50(10+10+30) */
var DEM_QUESTIONS_LIGHT = [
      { id: 1, type: 'time',   q: '올해는 몇 년도인가요?', opts: ['2024년', '2025년', '2026년', '2027년'], answer: 2 },
      { id: 2, type: 'time',   q: '지금은 무슨 계절인가요?', opts: ['봄', '여름', '가을', '겨울'], answer: 0 },
      { id: 3, type: 'place',  q: '주로 잠을 자는 곳은 어디인가요?', opts: ['집', '병원', '학교', '공원'], answer: 0 },
      { id: 4, type: 'memo',   q: '다음 사물 3가지를 외워주세요: 🍎 사과 · 🚗 자동차 · 🎩 모자', opts: ['외웠습니다 (다음 →)'], answer: 0, memo: ['사과', '자동차', '모자'] },
      { id: 5, type: 'calc',   q: '100 - 7 = ?', opts: ['90', '91', '93', '95'], answer: 2 },
      { id: 6, type: 'calc',   q: '방금 답한 93 - 7 = ?', opts: ['83', '85', '86', '87'], answer: 2 },
      { id: 7, type: 'lang',   q: '이 그림은 무엇인가요? ⏰', opts: ['신호등', '시계', '카메라', '나침반'], answer: 1 },
      { id: 8, type: 'lang',   q: '이 그림은 무엇인가요? ✂️', opts: ['가위', '칼', '못', '망치'], answer: 0 },
      { id: 9, type: 'recall', q: '4번에서 외웠던 3가지 사물 중 과일은?', opts: ['모자', '자동차', '사과', '의자'], answer: 2 },
      { id: 10, type: 'space', q: '🔺🔻 두 삼각형이 겹친 모양과 같은 것은?', opts: ['✡️ 별', '⬢ 육각형', '◯ 원', '⬛ 사각형'], answer: 0 }
    ];;

var DEM_QUESTIONS_MID_ADD = [
      { id: 11, type: 'fluent', q: '다음 중 동물이 아닌 것은?', opts: ['호랑이', '사과', '코끼리', '강아지'], answer: 1 },
      { id: 12, type: 'rev',    q: '5 - 2 - 9 를 거꾸로 입력하면?', opts: ['9-5-2', '9-2-5', '5-9-2', '2-5-9'], answer: 1 },
      { id: 13, type: 'rev',    q: '3 - 8 - 1 - 6 을 거꾸로 입력하면?', opts: ['6-1-8-3', '6-8-1-3', '3-1-8-6', '8-3-1-6'], answer: 0 },
      { id: 14, type: 'mirror', q: '거울에 비친 시계가 9시. 실제 시간은?', opts: ['3시', '6시', '9시', '12시'], answer: 0 },
      { id: 15, type: 'reason', q: '오렌지 - 바나나 - 사과 ... 다음은?', opts: ['수박', '자동차', '의자', '책상'], answer: 0 },
      { id: 16, type: 'pair',   q: '뒤집힌 카드 4장에서 같은 그림 2장 짝짓기는?', opts: ['주의력 분할', '단순 기억', '추론', '계산'], answer: 0 },
      { id: 17, type: 'seq',    q: '1→가→2→나→3→다 ... 다음은?', opts: ['4-라', '라-4', '4-마', '5-라'], answer: 0 },
      { id: 18, type: 'word',   q: '"불을 끄는 붉은색 자동차"는?', opts: ['구급차', '소방차', '경찰차', '청소차'], answer: 1 },
      { id: 19, type: 'recall', q: '4번에서 외웠던 사물 중 탈것은?', opts: ['모자', '자동차', '사과', '비행기'], answer: 1 },
      { id: 20, type: 'meta',   q: '본 검사를 시작할 때 봤던 페이지 이름은?', opts: ['두피 케어', '인지 건강 셀프 체크', '웰니스 리포트', 'IQ 측정'], answer: 1 }
    ];;

var DEM_QUESTIONS_HIGH_ADD = [
      // 21~30 스트룹 인지 간섭
      { id: 21, type: 'stroop', q: '<span style="color:red;font-size:36px;font-weight:900;">초록</span><br/>글자의 색은?', opts: ['빨강', '초록', '파랑', '노랑'], answer: 0 },
      { id: 22, type: 'stroop', q: '<span style="color:blue;font-size:36px;font-weight:900;">빨강</span><br/>글자의 색은?', opts: ['빨강', '초록', '파랑', '노랑'], answer: 2 },
      { id: 23, type: 'stroop', q: '<span style="color:#f59e0b;font-size:36px;font-weight:900;">파랑</span><br/>글자의 색은?', opts: ['빨강', '초록', '파랑', '노랑'], answer: 3 },
      { id: 24, type: 'stroop', q: '<span style="color:green;font-size:36px;font-weight:900;">노랑</span><br/>글자의 색은?', opts: ['빨강', '초록', '파랑', '노랑'], answer: 1 },
      { id: 25, type: 'stroop', q: '<span style="color:red;font-size:36px;font-weight:900;">파랑</span><br/>글자의 색은?', opts: ['빨강', '초록', '파랑', '노랑'], answer: 0 },
      { id: 26, type: 'stroop', q: '<span style="color:blue;font-size:36px;font-weight:900;">노랑</span><br/>글자의 색은?', opts: ['빨강', '초록', '파랑', '노랑'], answer: 2 },
      { id: 27, type: 'stroop', q: '<span style="color:#f59e0b;font-size:36px;font-weight:900;">초록</span><br/>글자의 색은?', opts: ['빨강', '초록', '파랑', '노랑'], answer: 3 },
      { id: 28, type: 'stroop', q: '<span style="color:green;font-size:36px;font-weight:900;">빨강</span><br/>글자의 색은?', opts: ['빨강', '초록', '파랑', '노랑'], answer: 1 },
      { id: 29, type: 'stroop', q: '<span style="color:red;font-size:36px;font-weight:900;">노랑</span><br/>글자의 색은?', opts: ['빨강', '초록', '파랑', '노랑'], answer: 0 },
      { id: 30, type: 'stroop', q: '<span style="color:blue;font-size:36px;font-weight:900;">초록</span><br/>글자의 색은?', opts: ['빨강', '초록', '파랑', '노랑'], answer: 2 },
      // 31~40 길찾기 / 시공간
      { id: 31, type: 'maze',   q: '1→2→3→4→5 순서대로 누르려면 첫 번째는?', opts: ['1', '2', '3', '5'], answer: 0 },
      { id: 32, type: 'maze',   q: '도형 패턴: ◯△□◯△□◯△ ... 다음은?', opts: ['◯', '△', '□', '✕'], answer: 2 },
      { id: 33, type: 'maze',   q: '시계 방향: 12시 → 3시 → 6시 → ? ', opts: ['9시', '12시', '7시', '4시'], answer: 0 },
      { id: 34, type: 'maze',   q: '북쪽 → 동쪽 → 남쪽 → ? (시계방향)', opts: ['서쪽', '북쪽', '남동쪽', '동쪽'], answer: 0 },
      { id: 35, type: 'maze',   q: '직사각형의 모서리는 몇 개?', opts: ['3개', '4개', '5개', '6개'], answer: 1 },
      { id: 36, type: 'maze',   q: '주사위 마주보는 면 합은 항상?', opts: ['5', '6', '7', '8'], answer: 2 },
      { id: 37, type: 'maze',   q: '↑ → ↓ ← ... 다음 방향은?', opts: ['↑', '→', '↓', '←'], answer: 0 },
      { id: 38, type: 'maze',   q: '★★☆★★☆★★ ... 다음은?', opts: ['★', '☆', '◯', '✕'], answer: 1 },
      { id: 39, type: 'maze',   q: '1 - 1 - 2 - 3 - 5 - 8 - ? (피보나치)', opts: ['11', '13', '15', '21'], answer: 1 },
      { id: 40, type: 'maze',   q: '거꾸로 알파벳: Z Y X W ... 다음은?', opts: ['U', 'V', 'T', 'S'], answer: 1 },
      // 41~48 이야기 회상
      { id: 41, type: 'story', q: '"70세 김씨는 오늘 아침 자전거를 타고 시장에 가서 고등어와 두부를 샀습니다."<br/>이 문장에서 김씨의 나이는?', opts: ['60세', '70세', '80세', '90세'], answer: 1 },
      { id: 42, type: 'story', q: '김씨가 시장에 갈 때 탄 교통수단은?', opts: ['자동차', '버스', '자전거', '지하철'], answer: 2 },
      { id: 43, type: 'story', q: '김씨가 시장에서 산 첫 번째 물건은?', opts: ['두부', '고등어', '오징어', '계란'], answer: 1 },
      { id: 44, type: 'story', q: '김씨가 시장에서 산 두 번째 물건은?', opts: ['두부', '두유', '두루치기', '두건'], answer: 0 },
      { id: 45, type: 'calc',  q: '이야기 중간 계산: 24 + 18 = ?', opts: ['40', '42', '44', '46'], answer: 1 },
      { id: 46, type: 'calc',  q: '계산: 50 - 15 = ?', opts: ['25', '30', '35', '40'], answer: 2 },
      { id: 47, type: 'story', q: '김씨가 시장에 간 시간은?', opts: ['아침', '점심', '저녁', '밤'], answer: 0 },
      { id: 48, type: 'story', q: '김씨가 산 물건은 총 몇 가지?', opts: ['1가지', '2가지', '3가지', '4가지'], answer: 1 },
      // 49~50 회복기 (쉬운 문제)
      { id: 49, type: 'easy', q: '하루는 몇 시간인가요?', opts: ['12시간', '24시간', '36시간', '48시간'], answer: 1 },
      { id: 50, type: 'easy', q: '일주일은 며칠인가요?', opts: ['5일', '6일', '7일', '10일'], answer: 2 }
    ];;

window._c39Run = null;

function _ck(n, f){ try{ var v=window.K&&window.K(n); return (v&&v!==String(n))?v:f; }catch(e){ return f; } }

window.c39Begin = function(course){
  var qs = DEM_QUESTIONS_LIGHT.slice();
  if(course >= 20) qs = qs.concat(DEM_QUESTIONS_MID_ADD);
  if(course >= 50) qs = qs.concat(DEM_QUESTIONS_HIGH_ADD);
  window._c39Run = { qs:qs, at:0, answers:[], t0:Date.now(), tq:Date.now() };
  var pop = document.getElementById('c39TestPop');
  if(pop){ pop.style.display='block'; pop.scrollTop=0; }
  /* 문항을 푸는 동안 카메라가 함께 돈다 — 구 CGO와 같은 방식 */
  try{ if(window.c39Start) c39Start(); }catch(e){}
  c39RenderQ();
};

window.c39RenderQ = function(){
  var s = window._c39Run; if(!s) return;
  var q = s.qs[s.at];
  if(!q){ c39FinishQ(); return; }
  var head = document.getElementById('c39TestHead');
  var body = document.getElementById('c39TestBody');
  if(!head || !body) return;

  var pct = Math.round((s.at / s.qs.length) * 100);
  var TYPE = { time:_ck(9800,'시간'), place:_ck(9801,'장소'), memo:_ck(9802,'기억'),
               calc:_ck(9803,'계산'), lang:_ck(9804,'언어'), recall:_ck(9805,'회상'),
               visuo:_ck(9806,'시공간'), exec:_ck(9807,'판단') };
  head.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">'
    + '<span style="font-size:12px;font-weight:900;color:#0f766e;">' + (TYPE[q.type] || '') + '</span>'
    + '<span style="font-size:11px;color:#64748b;">' + (s.at+1) + ' / ' + s.qs.length + '</span></div>'
    + '<div style="height:6px;border-radius:999px;background:#e2e8f0;margin-top:8px;overflow:hidden;">'
    + '<div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#0d9488,#14b8a6);transition:width .25s;"></div></div>';

  body.innerHTML =
    '<div style="background:#fff;border:1px solid #d7eee8;border-radius:16px;padding:18px 16px;margin-top:13px;">'
    + '<div style="font-size:15px;font-weight:800;color:#0f172a;line-height:1.7;text-wrap:pretty;">' + q.q + '</div></div>'
    + '<div style="display:grid;grid-template-columns:' + (q.opts.length <= 2 ? '1fr' : 'repeat(2,minmax(0,1fr))') + ';gap:9px;margin-top:12px;">'
    + q.opts.map(function(o, i){
        return '<button type="button" onclick="c39AnswerQ(' + i + ')" '
          + 'style="padding:16px 12px;border-radius:14px;border:1.5px solid #d7eee8;background:#fff;'
          + 'cursor:pointer;font-family:inherit;text-align:left;min-height:56px;display:flex;align-items:center;gap:9px;">'
          + '<span style="flex:none;width:22px;height:22px;border-radius:999px;background:#f0fdf9;color:#0f766e;'
          + 'font-size:11px;font-weight:900;display:inline-flex;align-items:center;justify-content:center;">'
          + String.fromCharCode(65+i) + '</span>'
          + '<span style="flex:1;min-width:0;font-size:14px;color:#0f172a;font-weight:700;line-height:1.5;'
          + 'overflow-wrap:anywhere;">' + o + '</span></button>';
      }).join('')
    + '</div>';
  s.tq = Date.now();
};

window.c39AnswerQ = function(i){
  var s = window._c39Run; if(!s) return;
  var q = s.qs[s.at];
  s.answers.push({ i:i, ok:(i === q.answer), ms:(Date.now() - s.tq), type:q.type });
  s.at++;
  c39RenderQ();
};

window.c39FinishQ = function(){
  var s = window._c39Run; if(!s) return;
  try{ if(window.c39Stop) c39Stop(); }catch(e){}
  var right = s.answers.filter(function(a){ return a.ok; }).length;
  var total = s.qs.length;
  var pct = total ? Math.round(right / total * 100) : 0;
  var avgMs = s.answers.length
    ? Math.round(s.answers.reduce(function(t,a){ return t + a.ms; }, 0) / s.answers.length) : 0;

  var byType = {};
  s.answers.forEach(function(a){
    if(!byType[a.type]) byType[a.type] = { n:0, ok:0 };
    byType[a.type].n++; if(a.ok) byType[a.type].ok++;
  });
  var TYPE = { time:_ck(9800,'시간'), place:_ck(9801,'장소'), memo:_ck(9802,'기억'),
               calc:_ck(9803,'계산'), lang:_ck(9804,'언어'), recall:_ck(9805,'회상'),
               visuo:_ck(9806,'시공간'), exec:_ck(9807,'판단') };

  var head = document.getElementById('c39TestHead');
  var body = document.getElementById('c39TestBody');
  if(head) head.innerHTML = '<div style="font-size:12px;font-weight:900;color:#0f766e;">' + _ck(9720,'검사 결과') + '</div>';
  if(!body) return;
  body.innerHTML =
    '<div style="background:#fff;border:1px solid #d7eee8;border-radius:18px;padding:22px 16px;margin-top:13px;text-align:center;">'
    + '<div style="font-size:11px;color:#64748b;font-weight:700;">' + _ck(9810,'인지 점수') + '</div>'
    + '<div style="font-size:44px;font-weight:900;color:#0f766e;line-height:1.1;margin-top:4px;">' + pct + '</div>'
    + '<div style="font-size:11px;color:#475569;margin-top:6px;">'
    + _ck(9722,'정답') + ' ' + right + '/' + total + ' · ' + _ck(9723,'평균 반응') + ' ' + (avgMs/1000).toFixed(1) + 's</div></div>'
    + '<div style="background:#fff;border:1px solid #d7eee8;border-radius:16px;padding:15px 16px;margin-top:11px;">'
    + '<div style="font-size:12.5px;font-weight:900;color:#0f766e;">' + _ck(9724,'영역별 결과') + '</div>'
    + Object.keys(byType).map(function(t){
        var v = byType[t], p = Math.round(v.ok / v.n * 100);
        return '<div style="margin-top:11px;">'
          + '<div style="display:flex;justify-content:space-between;font-size:11.5px;font-weight:700;color:#0f172a;">'
          + '<span>' + (TYPE[t] || t) + '</span><span style="color:#0f766e;">' + v.ok + '/' + v.n + '</span></div>'
          + '<div style="height:7px;border-radius:999px;background:#e2e8f0;margin-top:5px;overflow:hidden;">'
          + '<div style="height:100%;width:' + p + '%;background:#14b8a6;"></div></div></div>';
      }).join('')
    + '</div>'
    + '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:13px 14px;margin-top:11px;">'
    + '<div style="font-size:10.5px;color:#64748b;line-height:1.75;">' + _ck(8818,'') + '</div></div>'
    + '<button type="button" onclick="c39TestClose()" style="width:100%;margin-top:14px;padding:15px;border:0;'
    + 'border-radius:999px;background:#0f172a;color:#fff;font-size:14px;font-weight:900;cursor:pointer;font-family:inherit;">'
    + _ck(9725,'✓ 닫기') + '</button>'
    + '<button type="button" onclick="c39Chat()" style="width:100%;margin-top:9px;padding:15px;border:1.5px solid #bfdbfe;'
    + 'border-radius:999px;background:#eff6ff;color:#1d4ed8;font-size:14px;font-weight:900;cursor:pointer;font-family:inherit;">'
    + _ck(8904,'🤖 AI 상담') + '</button>';
};

window.c39TestClose = function(){
  try{ if(window.c39Stop) c39Stop(); }catch(e){}
  var p = document.getElementById('c39TestPop');
  if(p) p.style.display = 'none';
  window._c39Run = null;
};

/* 인지 건강 AI 상담 — 건강 밸런스와 같은 창을 쓴다 */
window.c39Chat = function(){
  try{
    window._cgoChatFeature = 'c39';
    if(window.c24Chat) c24Chat();
  }catch(e){}
};

/* ★ 검사 중 언어 전환 — 그 자리에서 다시 그린다 */
(function(){
  function redraw(){
    if(!window._c39Run) return;
    var p=document.getElementById('c39TestPop');
    if(!p || getComputedStyle(p).display==='none') return;
    try{ c39RenderQ(); }catch(e){}
  }
  if(window.cgoRepaintOn) cgoRepaintOn(redraw);
  else [300,1200,3000].forEach(function(d){ setTimeout(function(){ if(window.cgoRepaintOn) cgoRepaintOn(redraw); }, d); });
})();
