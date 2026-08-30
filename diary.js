/* ══ 스스로 남기는 기록 ══
   콘솔을 볼 수 없는 곳(폰)에서 무슨 일이 있었는지 앱이 직접 적어 둔다.
   보는 방법: 상단 CGO 로고를 3번 빠르게 누른다. */
(function(){
  'use strict';
  var KEY = 'cgo_diary';
  var MAX = 60;

  function now(){
    var d = new Date();
    function p(n){ return (n<10?'0':'')+n; }
    return p(d.getHours())+':'+p(d.getMinutes())+':'+p(d.getSeconds());
  }
  function read(){
    try{ return JSON.parse(localStorage.getItem(KEY) || '[]'); }catch(e){ return []; }
  }
  function write(list){
    try{ localStorage.setItem(KEY, JSON.stringify(list.slice(-MAX))); }catch(e){}
  }
  function log(what){
    var list = read();
    list.push(now() + '  ' + what);
    write(list);
  }
  window.cgoNote = log;

  /* ── 무엇을 적는가 ── */
  log('화면 열림 · 주소 ' + (location.hash || '(없음)'));

  try{
    var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    if(nav && nav.type === 'reload') log('폰이 화면을 다시 불러왔습니다 (새로고침)');
    else if(nav && nav.type === 'back_forward') log('뒤로/앞으로 돌아왔습니다');
  }catch(e){}

  setTimeout(function(){
    var ent = document.getElementById('entSplash');
    var open = ent && getComputedStyle(ent).display !== 'none';
    log(open ? '대문이 떴습니다' : '대문을 건너뛰었습니다');
    try{
      log('기억: 세션=' + (sessionStorage.getItem('cgo_ent')||'없음')
        + ' · 하루=' + (localStorage.getItem('cgo_ent_day')||'없음')
        + ' · 보던 페이지=' + (sessionStorage.getItem('cgo_page')||'없음'));
    }catch(e){}
  }, 1200);

  /* 카메라가 켜지고 꺼지는 순간 */
  try{
    var md = navigator.mediaDevices;
    if(md && md.getUserMedia){
      var orig = md.getUserMedia.bind(md);
      md.getUserMedia = function(c){
        log('카메라를 켜려고 합니다');
        return orig(c).then(function(s){ log('카메라 켜짐'); return s; })
          .catch(function(e){ log('카메라 실패 — ' + (e && e.name)); throw e; });
      };
    }
  }catch(e){}

  document.addEventListener('visibilitychange', function(){
    log(document.visibilityState === 'hidden' ? '화면이 가려졌습니다' : '화면이 돌아왔습니다');
  });
  window.addEventListener('pagehide', function(){ log('화면을 떠납니다'); });
  window.addEventListener('error', function(e){
    log('오류 — ' + String((e && e.message) || '').slice(0, 90));
  });

  /* ── 보여주기 ── */
  window.cgoDiary = function(){
    var old = document.getElementById('cgoDiaryPop');
    if(old){ old.remove(); return; }
    var list = read();
    var box = document.createElement('div');
    box.id = 'cgoDiaryPop';
    box.style.cssText = 'position:fixed;inset:0;z-index:2147483646;background:rgba(2,20,16,.92);'
      + 'display:flex;align-items:center;justify-content:center;padding:18px;';
    box.innerHTML =
      '<div style="width:100%;max-width:460px;max-height:80vh;display:flex;flex-direction:column;'
      + 'background:#f0fdf9;border:1px solid #99f6e4;border-radius:18px;overflow:hidden;">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 15px;border-bottom:1px solid #d7eee8;">'
      + '<span style="font-size:14px;font-weight:900;color:#0f766e;">📋 앱이 남긴 기록</span>'
      + '<span style="font-size:10.5px;color:#64748b;">' + list.length + '줄</span></div>'
      + '<div style="flex:1;overflow-y:auto;padding:12px 14px;font-size:11px;line-height:1.85;color:#334155;'
      + 'white-space:pre-wrap;word-break:break-all;font-family:ui-monospace,monospace;">'
      + (list.length ? list.join('\n') : '아직 기록이 없습니다') + '</div>'
      + '<div style="display:flex;gap:8px;padding:12px 14px;border-top:1px solid #d7eee8;">'
      + '<button id="cgoDiaryCopy" style="flex:2;padding:12px;border:0;border-radius:11px;background:#0f172a;color:#fff;font-size:12.5px;font-weight:800;cursor:pointer;font-family:inherit;">복사하기</button>'
      + '<button id="cgoDiaryClear" style="flex:1;padding:12px;border:1px solid #cbd5e1;border-radius:11px;background:#fff;color:#475569;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit;">지우기</button>'
      + '<button id="cgoDiaryClose" style="flex:1;padding:12px;border:1px solid #cbd5e1;border-radius:11px;background:#fff;color:#475569;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit;">닫기</button>'
      + '</div></div>';
    document.body.appendChild(box);
    box.querySelector('#cgoDiaryClose').onclick = function(){ box.remove(); };
    box.querySelector('#cgoDiaryClear').onclick = function(){ write([]); box.remove(); };
    box.querySelector('#cgoDiaryCopy').onclick = function(){
      var t = read().join('\n');
      var btn = box.querySelector('#cgoDiaryCopy');
      function ok(){ btn.textContent = '복사했습니다'; }
      try{
        if(navigator.clipboard) navigator.clipboard.writeText(t).then(ok, fallback);
        else fallback();
      }catch(e){ fallback(); }
      function fallback(){
        var ta = document.createElement('textarea');
        ta.value = t; ta.style.cssText = 'position:fixed;top:-9999px';
        document.body.appendChild(ta); ta.select();
        try{ document.execCommand('copy'); ok(); }catch(e2){}
        ta.remove();
      }
    };
  };

  /* 로고를 3번 빠르게 누르면 열린다 */
  function bind(){
    var img = document.querySelector('#nasaMiniBar img');
    if(!img || img.__diaryBound) return false;
    img.__diaryBound = true;
    var taps = 0, timer = null;
    img.addEventListener('click', function(e){
      taps++;
      if(timer) clearTimeout(timer);
      if(taps >= 3){ taps = 0; e.preventDefault(); e.stopPropagation(); window.cgoDiary(); return; }
      timer = setTimeout(function(){ taps = 0; }, 700);
    }, true);
    return true;
  }
  [0, 500, 1500, 3000].forEach(function(d){ setTimeout(bind, d); });
})();
