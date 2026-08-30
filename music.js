/* ══════════════════════════════════════════════════════════
   🎵 나의 주파수 음악 — 붙임 장치만
   본체(팝업·페이지·엔진)는 index.html 안에 구 CGO 원문 그대로 있다. 손대지 않는다.
   ──────────────────────────────────────────────────────────
   · 페이지  <div id="page-music-v2">   문 = cgoGoPage('music-v2')
   · 팝업    pm-intro-pop  (구 CGO 원문 감시자가 열고 닫는다)
   · 등록    perm.js 취소목록(musicStop) · cgoHome 팝업목록 · cgoRepaintOn
   ══════════════════════════════════════════════════════════ */

window.musicStop = function(){
  try{ document.querySelectorAll('#page-music-v2 audio, #page-music-v2 video').forEach(function(a){ try{ a.pause(); a.currentTime = 0; }catch(e){} }); }catch(e){}
  try{ if(window._mfuAudio){ _mfuAudio.pause(); _mfuAudio = null; } }catch(e){}
  try{ document.querySelectorAll('#page-music-v2 iframe').forEach(function(f){ f.src = 'about:blank'; }); }catch(e){}
};

(function(){
  var p = document.getElementById('page-music-v2');
  if(p){
    var was = p.classList.contains('active');
    new MutationObserver(function(){
      var now = p.classList.contains('active');
      if(now === was) return;
      was = now;
      if(!now){ try{ window.musicStop(); }catch(e){} }
    }).observe(p, {attributes:true, attributeFilter:['class']});
  }
  function rp(){
    try{ if(typeof mfuRenderTracks === 'function' && document.getElementById('mfu-tracks') && document.getElementById('mfu-tracks').innerHTML) mfuRenderTracks(); }catch(e){}
  }
  if(typeof window.cgoRepaintOn === 'function') window.cgoRepaintOn(rp);
  else { var t = setInterval(function(){ if(typeof window.cgoRepaintOn === 'function'){ clearInterval(t); window.cgoRepaintOn(rp); } }, 500); setTimeout(function(){ clearInterval(t); }, 15000); }
})();

/* ★ 입구 팝업을 화면 맨 바깥(body)으로 옮긴다
   신 앱에서 팝업이 .content 안에 들어가 있어, 페이지 내용이 팝업 위에 얹히고
   손가락이 팝업 대신 뒤 페이지를 잡았다. 구 CGO 에서는 이 상자 밖에 있었다. */
(function(){
  function lift(){
    var p = document.getElementById('pm-intro-pop');
    if(p && p.parentElement !== document.body){ try{ document.body.appendChild(p); }catch(e){} }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', lift);
  else lift();
  setTimeout(lift, 900);
})();
