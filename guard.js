/* ══ 소스 가림막 (MUFE 기준) ══
   완전히 못 보게 막을 수는 없다 — 웹은 원래 열려 있다. 정직하게 말한다.
   다만 지나가는 사람이 쉽게 들추지 못하게 하고, 들추면 기록을 남긴다.

   여기서 도는 것은 이벤트를 듣는 일뿐이다. 계산이 없으므로 속도에 영향 없다. */
(function(){
  'use strict';

  var ON = true;   /* 개발 중에는 window._cgoGuardOff = true 로 끌 수 있다 */
  try{ if(window._cgoGuardOff) ON = false; }catch(e){}
  if(!ON) return;

  function note(what){
    try{ if(window.cgoNote) window.cgoNote('[가림막] ' + what); }catch(e){}
  }

  /* ① 오른쪽 눌러 소스 보기 — 막는다 (초시계는 복사를 써야 하므로 남긴다) */
  document.addEventListener('contextmenu', function(e){
    var t = e.target;
    while(t && t !== document.body){
      if(t.id === 'spd') return;                 /* 초시계는 그대로 */
      if(t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
      t = t.parentElement;
    }
    e.preventDefault();
    note('오른쪽 누름');
  }, true);

  /* ② 소스 보기·저장 단축키 — 막는다 */
  document.addEventListener('keydown', function(e){
    var k = (e.key || '').toLowerCase();
    var ctrl = e.ctrlKey || e.metaKey;
    if(k === 'f12'
      || (ctrl && e.shiftKey && (k === 'i' || k === 'j' || k === 'c'))
      || (ctrl && (k === 'u' || k === 's'))){
      e.preventDefault();
      note('단축키 ' + (ctrl ? 'Ctrl+' : '') + (e.shiftKey ? 'Shift+' : '') + k);
      return false;
    }
  }, true);

  /* ③ 글자 끌어 담기 — 막는다 (입력칸과 결과 글은 그대로) */
  document.addEventListener('selectstart', function(e){
    var t = e.target;
    if(!t || !t.tagName) return;
    if(t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
    if(t.isContentEditable) return;
    /* 결과·리포트는 사용자가 복사할 수 있어야 한다 */
    var p = t;
    while(p && p !== document.body){
      if(p.id && /Result|result|Report|report|Body|body/.test(p.id)) return;
      p = p.parentElement;
    }
    e.preventDefault();
  }, true);

  /* ④ 끌어 옮기기 — 막는다 */
  document.addEventListener('dragstart', function(e){ e.preventDefault(); }, true);

  /* ⑤ 개발자 창이 열렸는지 살핀다 — 열리면 기록만 남긴다 (앱을 멈추지 않는다) */
  (function(){
    var seen = false;
    setInterval(function(){
      var wide = (window.outerWidth - window.innerWidth) > 220;
      var tall = (window.outerHeight - window.innerHeight) > 220;
      var open = wide || tall;
      if(open && !seen){ seen = true; note('개발자 창 열림'); }
      else if(!open && seen){ seen = false; }
    }, 2000);
  })();

  /* ⑥ 콘솔에 남기는 한 줄 — 호기심으로 여는 사람에게 */
  try{
    setTimeout(function(){
      console.log('%c CGO-FULI ', 'background:#0d9488;color:#fff;font-weight:900;padding:4px 10px;border-radius:4px');
      console.log('%c 이 앱의 보안은 MUFE 로 지켜집니다. 여기 붙여넣는 글은 당신의 자료를 위험하게 만들 수 있습니다.',
                  'color:#b45309;font-size:12px');
    }, 1500);
  }catch(e){}
})();

/* ══ 미끼 카드 (Honey-Card) ══
   MUFE 의 미끼 파일 발상을 CGO 에 맞게 옮긴다.
   MUFE 는 가짜 파일 900개를 화면에 그렸다 — 시연이었다.
   여기서는 안 보이는 카드 세 장을 진짜로 심는다.
   진짜 사용자는 절대 못 누른다 — 화면에 없으니까.
   소스를 뒤져 카드 목록을 읽은 사람만 발견한다. 오탐이 0인 이유다.

   평소에는 한 줄도 돌지 않는다 — 눌렸을 때만 깨어난다. 속도에 영향 없다. */
(function(){
  'use strict';

  var BAIT = ['cgo-premium-unlock','cgo-master-panel','cgo-api-config'];

  /* 미끼 자리 — 진짜 열쇠는 조각나 흩어져 있고, 이것은 가짜다 */
  try{
    if(!localStorage.getItem('cgo_master_key')){
      localStorage.setItem('cgo_master_key',
        'sk-cgo-' + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2));
    }
  }catch(e){}

  function trap(what){
    /* 잡았다는 것을 알리지 않는다 — MUFE 의 모토: 막지 않고 바보로 만든다 */
    try{
      var n = parseInt(localStorage.getItem('cgo_trap_count') || '0') + 1;
      localStorage.setItem('cgo_trap_count', n);
      localStorage.setItem('cgo_trap_last', new Date().toISOString());
      localStorage.setItem('cgo_trap_what', what);
    }catch(e){}
    try{ if(window.cgoNote) window.cgoNote('[미끼] ' + what + ' 물림'); }catch(e){}
    if(window.cgoAbyss) window.cgoAbyss();
  }

  /* ── 연산지옥 — 통과한 것처럼 보이고 99%에서 영원히 헛돈다 ── */
  window.cgoAbyss = function(){
    if(document.getElementById('cgoAbyss')) return;
    var d = document.createElement('div');
    d.id = 'cgoAbyss';
    d.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#f0fdf9;'
      + 'display:flex;align-items:center;justify-content:center;padding:24px;';
    d.innerHTML =
      '<div style="width:100%;max-width:420px;text-align:center;">'
      + '<div style="font-size:34px;line-height:1">🔓</div>'
      + '<div style="font-size:16px;font-weight:900;color:#0f766e;margin-top:12px;">'
      + '정답입니다. 통과 — 다음 단계로</div>'
      + '<div style="font-size:11.5px;color:#475569;margin-top:8px;line-height:1.7;">'
      + '권한을 확인하고 있습니다. 창을 닫지 마세요.</div>'
      + '<div style="height:8px;border-radius:999px;background:#e2e8f0;margin-top:18px;overflow:hidden;">'
      + '<div id="cgoAbyssBar" style="height:100%;width:0%;background:linear-gradient(90deg,#0d9488,#14b8a6);"></div></div>'
      + '<div id="cgoAbyssPct" style="font-size:11px;color:#64748b;margin-top:9px;font-family:ui-monospace,monospace;">검증 0.0%</div>'
      + '</div>';
    document.body.appendChild(d);
    document.body.style.overflow = 'hidden';

    /* 99%로 수렴하며 영원히 닿지 않는다 — 계산은 가볍다 */
    var p = 0;
    setInterval(function(){
      p = p + (99 - p) * 0.04;
      var bar = document.getElementById('cgoAbyssBar');
      var pct = document.getElementById('cgoAbyssPct');
      if(bar) bar.style.width = p.toFixed(1) + '%';
      if(pct) pct.textContent = '검증 ' + p.toFixed(1) + '% (예상 ' + Math.floor((100-p)*13) + '초)';
    }, 500);
  };

  /* ── 미끼 카드를 심는다 — 화면에 안 보이게 ── */
  function plant(){
    var host = document.querySelector('.fdash-grid') || document.getElementById('cgosec7');
    if(!host || host.getAttribute('data-bait')) return false;
    host.setAttribute('data-bait','1');
    BAIT.forEach(function(id){
      var el = document.createElement('div');
      el.id = id;
      el.className = 'fdash-card';
      el.setAttribute('data-feature', id);
      /* 눈에 안 보이고 자리도 차지하지 않는다 */
      el.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:auto;'
        + 'left:-9999px;overflow:hidden;';
      el.innerHTML = '<div class="fdash-ico">🔑</div>'
        + '<div class="fdash-ttl">Premium Unlock</div>'
        + '<div class="fdash-desc">master access</div>';
      el.onclick = function(e){ e.stopPropagation(); trap(id); };
      host.appendChild(el);
    });
    return true;
  }
  [1200, 3000, 6000].forEach(function(d){ setTimeout(plant, d); });

  /* 미끼 열쇠를 읽어 쓰려는 시도 — 잡는다 */
  try{
    var of = window.fetch;
    if(of){
      window.fetch = function(u, o){
        try{
          var body = (o && typeof o.body === 'string') ? o.body : '';
          if(body.indexOf('sk-cgo-') >= 0){ trap('미끼 열쇠 사용'); }
        }catch(e){}
        return of.apply(this, arguments);
      };
    }
  }catch(e){}

  /* 물린 기록 — 콘솔에서 확인용 */
  window.cgoTrapState = function(){
    try{
      return { 물린횟수: localStorage.getItem('cgo_trap_count') || '0',
               마지막: localStorage.getItem('cgo_trap_last') || '없음',
               무엇: localStorage.getItem('cgo_trap_what') || '없음',
               심은미끼: BAIT.length + '장 (화면에 안 보임)' };
    }catch(e){ return {}; }
  };
})();
