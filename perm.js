/* ══ 권한 관리 ══
   위치: 앱 들어올 때 한 번만 묻고 값을 보관해 재사용한다.
   카메라: 카메라 기능에 들어갈 때 한 번만 묻고, 기능 페이지를 벗어나면 즉시 끈다. */
(function(){
  'use strict';

/* ★ 기능을 나가면 모두 꺼지고 처음으로 돌아간다 (합의 규칙 · 전체 기능 공통).
   결과를 만드는 종료 함수는 부르지 않는다 — 반쪽 데이터로 결과가 만들어지기 때문. */
window.cgoResetFeatures = function(){
  /* 1) 카메라 — 취소 함수만 부른다 (결과를 만드는 종료 함수는 절대 부르지 않는다)
        새 기능을 만들면 그 기능의 '취소' 함수 이름을 아래 목록에 넣는다 */
  ['foodCamStop','musicStop','sviCancel','_c24Cancel','c39Stop','scStop','iqCamStop','rmaiScanStop','rmaiArStop','rppgArStop','eyeCancelMeasure','eyeStopMeasure','cgoSleepStopAll','cgoAccCamClose'].forEach(function(fn){
    try{ if(typeof window[fn] === 'function') window[fn](); }catch(e){}
  });
  try{ if(window._cgoStopAllCams) window._cgoStopAllCams(); }catch(e){}
  try{
    Array.prototype.forEach.call(document.querySelectorAll('video'), function(v){
      if(v.srcObject){
        try{ v.srcObject.getTracks().forEach(function(t){ t.stop(); }); }catch(e){}
        v.srcObject = null;
      }
    });
  }catch(e){}
  /* 2) 떠 있는 것을 종류 가리지 않고 모두 닫는다 — 팝업 안의 팝업까지 */
  try{
    Array.prototype.forEach.call(document.querySelectorAll('div[id]'), function(el){
      if(!/Pop$|Popup$|-pop$|Overlay$|-overlay$/.test(el.id)) return;
      if(getComputedStyle(el).position !== 'fixed') return;
      el.style.display = 'none';
      if(el.classList) el.classList.remove('on','active','show','open');
    });
    Array.prototype.forEach.call(document.querySelectorAll('.modal.on,.popup.on,.fsp.on'),
      function(e){ e.classList.remove('on'); });
  }catch(e){}
  /* 3) 펼친 것을 접고, 고른 것을 지운다 */
  try{
    Array.prototype.forEach.call(document.querySelectorAll('[id^="scFold-"]'), function(el){
      if(/-arrow$/.test(el.id)){ el.textContent = '▼'; return; }
      el.style.display = 'none';
    });
    Array.prototype.forEach.call(document.querySelectorAll('[id^="fold-"]'),
      function(el){ el.style.display = 'none'; });
  }catch(e){}
  try{
    window._scAreaCur = null; window._scStepCur = null;
    window._c39CareCur = null; window._iqRun = null;
  }catch(e){}
  /* 4) 스크롤 맨 위 */
  try{
    Array.prototype.forEach.call(document.querySelectorAll('.page'), function(p){ p.scrollTop = 0; });
    Array.prototype.forEach.call(document.querySelectorAll('div[id]'), function(el){
      if(/Pop$|Popup$|-pop$/.test(el.id)) el.scrollTop = 0;
    });
    window.scrollTo(0,0);
    var c = document.querySelector('.content'); if(c) c.scrollTop = 0;
  }catch(e){}
  /* 5) 팝업이 잠갔던 스크롤을 되돌린다 */
  try{ document.body.style.overflow = ''; document.documentElement.style.overflow = ''; }catch(e){}
};


  /* ── 카메라 기능이 있는 페이지 ──
     새 기능을 만들면 여기에 페이지 id 를 넣는다 (넣지 않으면 나갈 때 카메라가 살아 남는다) */
  var CAM_PAGES = ['food','svi','rppg-ar','c24','c39','scalp','iq','c44-eye','c41','acc-cam','vision','iq'];

  /* ── 켜져 있는 카메라 목록 ── */
  var live = [];
  window._cgoCamStreams = live;

  var md = navigator.mediaDevices;
  if(md && md.getUserMedia){
    var orig = md.getUserMedia.bind(md);
    md.getUserMedia = function(c){
      return orig(c).then(function(stream){
        /* 카메라가 켜진 동안에만 상단 바를 맨 위로 — 관문 위에 뜨지 않게 */
        try{ document.documentElement.classList.add('cgo-cam'); }catch(e){}
        live.push(stream);
        stream.getTracks().forEach(function(t){
          t.addEventListener('ended', function(){
            var i = live.indexOf(stream); if(i >= 0) live.splice(i, 1);
          });
        });
        return stream;
      });
    };
  }

  /* ── 카메라 전부 끄기 ── */
  window._cgoStopAllCams = function(){
    try{ document.documentElement.classList.remove('cgo-cam'); }catch(e){}
    var n = 0;
    live.slice().forEach(function(s){
      try{ s.getTracks().forEach(function(t){ t.stop(); n++; }); }catch(e){}
    });
    live.length = 0;
    /* 화면에 붙어 있던 영상도 떼어낸다 */
    try{
      Array.prototype.forEach.call(document.querySelectorAll('video'), function(v){
        if(v.srcObject){
          try{ v.srcObject.getTracks().forEach(function(t){ t.stop(); }); }catch(e){}
          v.srcObject = null;
        }
      });
    }catch(e){}
    /* 기능별 '취소' 함수만 부른다 — 결과를 계산해 저장하는 종료 함수는 부르지 않는다 */
    ['eyeCancelMeasure','eyeCamStop','_c24Cancel','c39Stop','scStop','iqCamStop','cgoAccCamClose'].forEach(function(fn){
      try{ if(typeof window[fn] === 'function') window[fn](); }catch(e){}
    });
    return n;
  };

  /* ── 페이지를 벗어나면 자동으로 끈다 ── */
  function hookGoPage(){
    if(typeof window.cgoGoPage !== 'function' || window.cgoGoPage.__permWrapped) return false;
    var inner = window.cgoGoPage;
    var wrapped = function(page){
      try{
        if(CAM_PAGES.indexOf(String(page)) < 0) window._cgoStopAllCams();
      }catch(e){}
      /* ★ 보던 페이지를 기억한다 — 폰이 카메라를 켜다 메모리를 회수해
         화면을 다시 불러오면 대시보드로 튕겼다. */
      try{ sessionStorage.setItem('cgo_page', String(page)); }catch(e){}
      var r = inner.apply(this, arguments);
      /* ★ 특허 장치가 숨은 페이지를 재워 두는데, 다시 열 때 깨우지 않으면
         높이가 0으로 남아 화면이 비어(검게) 보였다. 열자마자 깨운다. */
      try{
        var el = document.getElementById('page-' + page);
        if(el){
          el.classList.remove('cgo-rest');
          el.style.contentVisibility = 'visible';
          el.style.containIntrinsicSize = '';
          /* ★특허 — 안쪽까지 다 깨우면 배치 셈이 한 덩이로 몰린다.
             페이지 자체만 깨우고, 안쪽은 관찰기가 화면에 들어올 때 깨운다 */
          try{ if(window.cgoResetFeatures) cgoResetFeatures(); }catch(e){}
          /* ★ 스크롤은 .content 가 쥐고 있다. 페이지만 0으로 돌려선 소용이 없어
             앞 화면에서 내려둔 만큼 제목이 헤더 뒤로 숨은 것처럼 보였다. */
          try{
            var sc = document.querySelector('.content');
            if(sc){ sc.scrollTop = 0; }
          }catch(e){}
          [0, 60, 240].forEach(function(d){
            setTimeout(function(){
              try{ if(window.cgoCullScan) cgoCullScan(el); }catch(e){}
            }, d);
          });
        }
      }catch(e){}
      return r;
    };
    wrapped.__permWrapped = true;
    window.cgoGoPage = wrapped;
    return true;
  }
  [0, 300, 1200, 3000].forEach(function(d){ setTimeout(hookGoPage, d); });

  /* 뒤로가기·탭 이동으로 화면을 떠날 때도 끈다 */
  window.addEventListener('pagehide', function(e){ if(e && e.persisted) return; try{ window._cgoStopAllCams(); }catch(e2){} });
  /* 화면이 잠깐 가려지는 것(권한 창, 알림창, 2초 앱 전환)으로는 끄지 않는다.
     12초 넘게 진짜로 뒤로 물러난 뒤에만 끈다 — 즉시 끄면 권한 허용 직후 카메라가 죽었다. */
  var hideTimer = null;
  document.addEventListener('visibilitychange', function(){
    if(document.visibilityState === 'hidden'){
      if(hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(function(){
        hideTimer = null;
        try{ window._cgoStopAllCams(); }catch(e){}
      }, 12000);
    } else if(hideTimer){
      clearTimeout(hideTimer); hideTimer = null;
    }
  });

  /* ★ 인앱 브라우저(카톡 등)에서 크롬으로 내보내던 장치를 없앴다.
     구 CGO는 카톡 안에서 카메라가 그대로 열렸다 — 막힌다는 전제가 틀렸고,
     내보내는 순간 주소가 새로 열려 대문부터 다시 시작하는 것이 튕김의 원인이었다. */

/* ── 위치: 한 번만 묻고 보관한다 ── */
  var GEO_KEY = 'cgo_geo_pos';
  function saved(){
    try{ return JSON.parse(localStorage.getItem(GEO_KEY) || 'null'); }catch(e){ return null; }
  }
  function fresh(p){ return p && p.t && (Date.now() - p.t) < 86400000 * 7; }

  var geo = navigator.geolocation;
  if(geo && geo.getCurrentPosition){
    var origGet = geo.getCurrentPosition.bind(geo);
    geo.getCurrentPosition = function(ok, err, opt){
      var p = saved();
      if(fresh(p)){
        try{ ok({coords:{latitude:p.lat, longitude:p.lng, accuracy:p.acc || 3000}, timestamp:p.t}); }catch(e){}
        return;
      }
      return origGet(function(pos){
        try{
          localStorage.setItem(GEO_KEY, JSON.stringify({
            lat: pos.coords.latitude, lng: pos.coords.longitude,
            acc: pos.coords.accuracy, t: Date.now()
          }));
        }catch(e){}
        try{ ok(pos); }catch(e){}
      }, err, opt);
    };

    /* 앱에 들어올 때 한 번 — 이미 보관된 값이 있으면 묻지 않는다 */
    function askOnce(){
      if(fresh(saved())) return;
      try{ geo.getCurrentPosition(function(){}, function(){}, {timeout:12000, maximumAge:600000}); }catch(e){}
    }
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', function(){ setTimeout(askOnce, 1800); });
    } else {
      setTimeout(askOnce, 1800);
    }
  }
})();
