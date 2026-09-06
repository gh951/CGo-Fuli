function _sk(n, f){ try{ var v = window.K && window.K(n); return (v && v !== String(n)) ? v : f; }catch(e){ return f; } }
/* 좋은 수면 — 구 CGO 원본 엔진 그대로 */

(function(){
  'use strict';
  function $(id){ return document.getElementById(id); }
  function show(id){
    var sc=document.querySelectorAll('#page-cgo-sleep .slp-screen');
    for(var i=0;i<sc.length;i++) sc[i].classList.remove('on');
    var el=$(id); if(el) el.classList.add('on');
    var w=$('page-cgo-sleep'); if(w) w.scrollTop=0;
  }
  var beforeData=null, afterData=null;
  function slpRppgShow(name){
    var ids=['intro','measure','breath','result'];
    for(var i=0;i<ids.length;i++){ var e=$('slp-rppg-'+ids[i]); if(e) e.style.display=(ids[i]===name)?'block':'none'; }
  }
  window.cgoSlpGoMeasure=function(){ var a=$('slp-acc-rppg'); if(a) a.open=true; slpRppgShow('intro'); var el=$('slp-acc-rppg'); if(el) setTimeout(function(){try{el.scrollIntoView({behavior:'smooth',block:'start'});}catch(e){}},90); };
  window.cgoSlpAccToggle=function(which,open){
    if(open){
      if(which==='self'){ if(!$('slp-self-q') || !$('slp-self-q').innerHTML.trim()) cgoSlpSelfCheck(); }
      else if(which==='data'){ cgoSlpData(); }
      else if(which==='sound'){ if(typeof cgoSlpSoundInit==='function') cgoSlpSoundInit(); }
      else if(which==='guide'){ cgoSlpGtab('ex'); }
      else if(which==='rppg'){ slpRppgShow('intro'); }
      var el=$('slp-acc-'+which);
      if(el){ try{ if(window.CGO_T) CGO_T.paint(el); }catch(e){}
              setTimeout(function(){ try{el.scrollIntoView({behavior:'smooth',block:'start'});}catch(e){} },90); }
    } else {
      if(which==='rppg'){ stopBreath(); stopCam(); if(vitalsInt){clearInterval(vitalsInt);vitalsInt=null;} if(measureInt){clearInterval(measureInt);measureInt=null;} slpRppgShow('intro'); }
      else if(which==='guide'){ try{ if(window.speechSynthesis) speechSynthesis.cancel(); }catch(e){} }
    }
  };

  window.cgoSlpIntro=function(){ var p=$('sleep-intro-pop'); if(p){ p.style.display='block'; p.scrollTop=0; } };
  window.cgoSlpIntroClose=function(){
    var p=$('sleep-intro-pop'); if(p) p.style.display='none';
    var c=$('slp-intro-chk');
    if(c && c.checked){ try{ localStorage.setItem('sleep_intro_seen_v7','1'); }catch(e){} }
  };
  window.cgoSlpGuide=function(){ var a=$('slp-acc-guide'); if(a) a.open=true; cgoSlpGtab('ex'); };
  window.cgoSlpGtab=function(name){
    var tabs=['ex','ac','fd','wm','hp'];
    for(var i=0;i<tabs.length;i++){
      var b=$('slp-gt-'+tabs[i]); if(b) b.classList.toggle('sel', tabs[i]===name);
      var s=$('slp-gs-'+tabs[i]); if(s) s.classList.toggle('on', tabs[i]===name);
    }
    var w=$('page-cgo-sleep'); if(w) w.scrollTop=0;
  };
  window.cgoSlpHypno=function(){
    if(!('speechSynthesis' in window)){ alert(_sk(11425,'이 기기는 음성 낭독을 지원하지 않아요. 글을 천천히 따라 읽어보세요.')); return; }
    try{ speechSynthesis.cancel();
      var txt=_sk(11500,'천천히 눈을 감고, 지금 귀로 들어오는 소리에만 마음을 얹습니다. 눈가와 이마의 힘이 스르르 풀립니다. 목과 어깨의 힘을 툭 내려놓습니다. 코로 천천히 숨을 채우고, 잠시 멈췄다가, 입으로 길게 내쉽니다. 숨이 나갈 때마다 낮의 긴장이 함께 빠져나갑니다. 지금 나는 가장 안전하고 고요한 곳에 있습니다. 오늘 하루는 충분했고, 내일 아침 나는 한결 가볍게 눈을 뜹니다. 이 소리들이 나를 편안한 잠으로 데려갑니다. 그대로, 잠에 듭니다.');
      var u=new SpeechSynthesisUtterance(txt); u.lang='ko-KR'; u.rate=0.82; u.pitch=0.95; u.volume=0.9;
      speechSynthesis.speak(u);
    }catch(e){}
  };

  window.cgoSleepOpen=function(){
    stopBreath(); stopCam();
    var ds=document.querySelectorAll('#page-cgo-sleep .slp-acc'); for(var i=0;i<ds.length;i++) ds[i].open=false;
    var p=$('page-cgo-sleep'); if(p){ p.style.display='block'; p.scrollTop=0; try{ if(window.CGO_T) CGO_T.paint(p); }catch(e){} }
    var seen=null; try{ seen=localStorage.getItem('sleep_intro_seen_v7'); }catch(e){}
    if(!seen) cgoSlpIntro();
  };
  window.cgoSleepClose=function(){
    stopBreath(); stopCam(); stopSound(); try{if(window.speechSynthesis)speechSynthesis.cancel();}catch(e){}
    if(vitalsInt){ clearInterval(vitalsInt); vitalsInt=null; }
    if(measureInt){ clearInterval(measureInt); measureInt=null; }
    var p=$('page-cgo-sleep'); if(p) p.style.display='none';
  };

  var _slpR={ running:false, stream:null, offCanvas:null, offCtx:null, rafId:null, rppg:null };
  function resetRppg(){
    _slpR.rppg={ rawR:[],rawG:[],rawB:[], chromSignal:[], filteredSignal:[],
      bpB:[0.19701,0,-0.19701], bpA:[1,-1.53077,0.60556], bpZ:[0,0],
      sampleRate:30, peaks:[], rriList:[], bpm:null, hrv:null, sdnn:null, stressScore:null, sampleCount:0 };
  }
  function _slpSample(){
    if(!_slpR.running || !_slpR.offCtx) return;
    var v=$('slp-video'); if(!v || !v.videoWidth) return;
    try{
      _slpR.offCtx.drawImage(v, 0,0, v.videoWidth, v.videoHeight, 0,0, 64,48);
      var px=_slpR.offCtx.getImageData(0,0,64,48).data;
      var rS=0,gS=0,bS=0,cnt=0;
      for(var i=0;i<px.length;i+=4){
        var r=px[i],g=px[i+1],b=px[i+2];
        if(r>60&&g>40&&b>20&&r>g&&r>b){ rS+=r;gS+=g;bS+=b;cnt++; }
      }
      if(cnt<50) return;
      var R=_slpR.rppg;
      R.rawR.push(rS/cnt); R.rawG.push(gS/cnt); R.rawB.push(bS/cnt); R.sampleCount++;
      if(R.rawR.length>300){ R.rawR.shift(); R.rawG.shift(); R.rawB.shift(); }
      if(R.rawR.length>=30) _slpChrom();
    }catch(e){}
  }
  function _slpChrom(){
    var R=_slpR.rppg, n=R.rawR.length; if(n<30) return;
    var w=Math.min(n,30);
    var rS=R.rawR.slice(-w), gS=R.rawG.slice(-w), bS=R.rawB.slice(-w);
    function mean(a){ return a.reduce(function(x,y){return x+y;},0)/a.length; }
    var rM=mean(rS),gM=mean(gS),bM=mean(bS);
    if(rM<1||gM<1||bM<1) return;
    var rN=rS.map(function(v){return v/rM-1;}), gN=gS.map(function(v){return v/gM-1;}), bN=bS.map(function(v){return v/bM-1;});
    var X=[],Y=[];
    for(var i=0;i<w;i++){ X.push(3*rN[i]-2*gN[i]); Y.push(1.5*rN[i]+gN[i]-1.5*bN[i]); }
    function std(a){ var m=mean(a),v=0; a.forEach(function(x){v+=(x-m)*(x-m);}); return Math.sqrt(v/a.length); }
    var sX=std(X),sY=std(Y), alpha=sY>0.001?sX/sY:1;
    var chrom=X.map(function(x,i){return x-alpha*Y[i];});
    R.chromSignal.push(chrom[chrom.length-1]);
    if(R.chromSignal.length>300) R.chromSignal.shift();
    _slpFilter();
  }
  function _slpFilter(){
    var R=_slpR.rppg, sig=R.chromSignal; if(sig.length<3) return;
    var b=R.bpB,a=R.bpA,z=R.bpZ, x=sig[sig.length-1];
    var y=b[0]*x+z[0];
    z[0]=b[1]*x-a[1]*y+z[1];
    z[1]=b[2]*x-a[2]*y;
    R.filteredSignal.push(y);
    if(R.filteredSignal.length>300) R.filteredSignal.shift();
  }
  function _slpPeaks(){
    var sig=_slpR.rppg.filteredSignal; if(sig.length<60) return [];
    var peaks=[], minDist=12;
    for(var i=2;i<sig.length-2;i++){
      if(sig[i]>sig[i-1]&&sig[i]>sig[i+1]&&sig[i]>sig[i-2]&&sig[i]>sig[i+2]&&sig[i]>0.0001){
        if(peaks.length===0||(i-peaks[peaks.length-1])>=minDist) peaks.push(i);
      }
    }
    return peaks;
  }
  function _slpVitals(){
    var R=_slpR.rppg, peaks=_slpPeaks(); if(peaks.length<4) return;
    R.peaks=peaks;
    var rri=[];
    for(var i=1;i<peaks.length;i++){
      var dt=(peaks[i]-peaks[i-1])*(1000/R.sampleRate);
      if(dt>333&&dt<1500) rri.push(dt);
    }
    if(rri.length<2) return;
    R.rriList=rri;
    var avg=rri.reduce(function(a,b){return a+b;},0)/rri.length;
    R.bpm=Math.round(60000/avg);
    var sq=0; for(var j=1;j<rri.length;j++){ var d=rri[j]-rri[j-1]; sq+=d*d; }
    R.hrv=Math.round(Math.sqrt(sq/(rri.length-1)));
    if(rri.length>=3){ var vr=0; rri.forEach(function(x){vr+=(x-avg)*(x-avg);}); R.sdnn=Math.round(Math.sqrt(vr/rri.length)); }
    if(R.hrv!==null){ var hn=Math.max(0,Math.min(1,(R.hrv-10)/70)); R.stressScore=Math.round((1-hn)*100); }
  }
  function startCam(cb){
    var v=$('slp-video');
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){ if(cb)cb(false); return; }
    navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:320,height:240}}).then(function(s){
      _slpR.stream=s; v.srcObject=s; var pr=v.play(); if(pr&&pr.catch)pr.catch(function(){});
      _slpR.offCanvas=document.createElement('canvas'); _slpR.offCanvas.width=64; _slpR.offCanvas.height=48;
      _slpR.offCtx=_slpR.offCanvas.getContext('2d',{willReadFrequently:true});
      _slpR.running=true; camLoop();
      if(cb)cb(true);
    }).catch(function(e){ if(cb)cb(false); });
  }
  function camLoop(){ if(!_slpR.running) return; _slpSample(); _slpR.rafId=requestAnimationFrame(camLoop); }
  function stopCam(){
    _slpR.running=false;
    if(_slpR.rafId){ cancelAnimationFrame(_slpR.rafId); _slpR.rafId=null; }
    if(_slpR.stream){ _slpR.stream.getTracks().forEach(function(t){ try{t.stop();}catch(e){} }); _slpR.stream=null; }
    var v=$('slp-video'); if(v) v.srcObject=null;
  }

  var vitalsInt=null, measureInt=null;
  window.cgoSlpMeasure=function(){
    beforeData=null; afterData=null; resetRppg();
    slpRppgShow('measure');
    $('slp-m-bpm').textContent='--'; $('slp-m-hrv').textContent='--';
    $('slp-qual-bar').style.width='0'; $('slp-measure-msg').textContent=_sk(11414,'신호 잡는 중…');
    startCam(function(ok){
      if(!ok){
        $('slp-measure-msg').textContent=_sk(11415,'카메라를 쓸 수 없어요. 호흡만 진행할게요.');
        setTimeout(function(){ cgoSlpStart(4); },1600); return;
      }
      var t=40; $('slp-m-count').textContent=t;
      if(vitalsInt) clearInterval(vitalsInt);
      vitalsInt=setInterval(function(){
        _slpVitals(); var R=_slpR.rppg;
        if(R.bpm) $('slp-m-bpm').textContent=R.bpm;
        if(R.hrv!==null) $('slp-m-hrv').textContent=R.hrv;
        var q=Math.min(100, Math.round(R.filteredSignal.length/2));
        $('slp-qual-bar').style.width=q+'%';
        if(R.bpm) $('slp-measure-msg').textContent=_sk(11416,'측정 중… 가만히 계세요');
      },1500);
      if(measureInt) clearInterval(measureInt);
      measureInt=setInterval(function(){
        t--; $('slp-m-count').textContent=Math.max(t,0);
        if(t<=0){ clearInterval(measureInt); measureInt=null; finishMeasure(); }
      },1000);
    });
  };
  function finishMeasure(){
    if(vitalsInt){ clearInterval(vitalsInt); vitalsInt=null; }
    _slpVitals(); var R=_slpR.rppg;
    if(R.bpm && R.rriList && R.rriList.length>=3){ beforeData={bpm:R.bpm,hrv:R.hrv,stress:R.stressScore}; }
    else { beforeData=null; }
    var cyc=4;
    if(beforeData && beforeData.stress!=null){ cyc = beforeData.stress>=60?6 : (beforeData.stress>=35?4:3); }
    if(!beforeData) stopCam();
    cgoSlpStart(cyc);
  }
  window.cgoSlpSkipMeasure=function(){
    if(vitalsInt){clearInterval(vitalsInt);vitalsInt=null;}
    if(measureInt){clearInterval(measureInt);measureInt=null;}
    beforeData=null; stopCam(); cgoSlpStart(4);
  };

  var bPhases=[{t:_sk(11417,'들이쉬세요'),d:4,s:1.5},{t:_sk(11418,'잠시 멈추세요'),d:7,s:1.5},{t:_sk(11419,'천천히 내쉬세요'),d:8,s:0.72}];
  var bCycles=4,bCur=0,bPhase=0,bTimer=null,bCountInt=null,bRunning=false;
  window.cgoSlpStart=function(cycles){
    bCycles=cycles||4; bCur=0; bPhase=0; bRunning=true;
    slpRppgShow('breath');
    var t=$('slp-cyc-total'); if(t) t.textContent=bCycles;
    var bb=$('slp-breath-bpm'); if(bb) bb.textContent=_slpR.running?_sk(11420,'측정 계속 중 💓'):'';
    if(_slpR.running && !vitalsInt){
      vitalsInt=setInterval(function(){ _slpVitals(); var bb2=$('slp-breath-bpm'); if(bb2&&_slpR.rppg.bpm) bb2.textContent=_sk(11501,'실시간 심박 ')+_slpR.rppg.bpm+' bpm 💓'; },1500);
    }
    runPhase();
  };
  function runPhase(){
    if(!bRunning) return;
    if(bCur>=bCycles){ finishBreath(); return; }
    var ph=bPhases[bPhase], circle=$('slp-circle');
    if(circle){ circle.style.transition='transform '+ph.d+'s ease-in-out'; void circle.offsetWidth; circle.style.transform='scale('+ph.s+')'; }
    var pe=$('slp-phase'); if(pe) pe.textContent=ph.t;
    var ne=$('slp-cyc-now'); if(ne) ne.textContent=(bCur+1);
    var rem=ph.d, ce=$('slp-count'); if(ce) ce.textContent=rem;
    if(bCountInt) clearInterval(bCountInt);
    bCountInt=setInterval(function(){ rem--; var c=$('slp-count'); if(c) c.textContent=Math.max(rem,0); if(rem<=0) clearInterval(bCountInt); },1000);
    bTimer=setTimeout(function(){ bPhase++; if(bPhase>=bPhases.length){ bPhase=0; bCur++; } runPhase(); }, ph.d*1000);
  }
  function stopBreath(){ bRunning=false; if(bTimer){clearTimeout(bTimer);bTimer=null;} if(bCountInt){clearInterval(bCountInt);bCountInt=null;} }
  function finishBreath(){ cgoSlpAfterBreath(); }
  window.cgoSlpAfterBreath=function(){
    stopBreath();
    if(vitalsInt){ clearInterval(vitalsInt); vitalsInt=null; }
    if(_slpR.running){
      _slpVitals(); var R=_slpR.rppg;
      if(R.bpm && R.rriList && R.rriList.length>=3){ afterData={bpm:R.bpm,hrv:R.hrv,stress:R.stressScore}; } else { afterData=null; }
      stopCam();
    }
    showResult();
  };
  function showResult(){
    slpRppgShow('result');
    var el=$('slp-result-body');
    try{ var rd=afterData||beforeData; if(rd) localStorage.setItem('cgo_sleep_rppg', JSON.stringify({t:Date.now(),bpm:rd.bpm,hrv:rd.hrv,stress:rd.stress})); }catch(e){}
    if(beforeData && afterData){
      var dB=beforeData.bpm-afterData.bpm;
      var hOk=(beforeData.hrv!=null && afterData.hrv!=null);
      var html='<div class="slp-rcard"><div class="slp-rrow"><span>'+_sk(11460,'활력 박자')+'</span><b>'+beforeData.bpm+' → '+afterData.bpm+' bpm</b></div>';
      if(hOk) html+='<div class="slp-rrow"><span>'+_sk(11461,'내면 탄력 안정도')+'</span><b>'+beforeData.hrv+' → '+afterData.hrv+' </b></div>';
      html+='</div>';
      var msg;
      if(dB>=2 || (hOk && afterData.hrv>beforeData.hrv)) msg=_sk(11422,'호흡 후 심박이 내려가고 내면 탄력성이 안정됐어요. 몸이 이완된 좋은 신호예요. 🌙');
      else if(dB<=-3) msg=_sk(11423,'아직 긴장이 남아있어요. 사운드를 들으며 한 번 더 천천히 이완해보세요.');
      else msg=_sk(11424,'변화가 크진 않았어요. 편한 사운드와 함께 충분히 쉬어가세요.');
      el.innerHTML=html+'<p class="slp-rmsg">'+msg+'</p>';
    } else {
      el.innerHTML='<p class="slp-rmsg">'+_sk(11462,'생체 신호를 충분히 잡지 못했어요(조명·움직임 영향). 그래도 4-7-8 호흡과 사운드는 그대로 이완에 도움이 돼요. 🌙')+'</p>';
    }
  }

  var AC=null,master=null,nodes=[],sleepTimer=null;
  function ensureAC(){
    if(!AC){ var C=window.AudioContext||window.webkitAudioContext; if(!C) return false; AC=new C(); master=AC.createGain(); master.gain.value=0.6; master.connect(AC.destination); }
    if(AC.state==='suspended'){ try{AC.resume();}catch(e){} }
    return true;
  }
  function makeNoise(){
    var len=Math.floor(AC.sampleRate*4), buf=AC.createBuffer(1,len,AC.sampleRate), d=buf.getChannelData(0), last=0;
    for(var i=0;i<len;i++){ var w=Math.random()*2-1; last=(last+0.02*w)/1.02; d[i]=last*3.2; }
    var src=AC.createBufferSource(); src.buffer=buf; src.loop=true; return src;
  }
  function makeColorNoise(type){
    var len=Math.floor(AC.sampleRate*4), buf=AC.createBuffer(1,len,AC.sampleRate), d=buf.getChannelData(0), i;
    if(type==='white'){ for(i=0;i<len;i++) d[i]=(Math.random()*2-1)*0.5; }
    else if(type==='pink'){
      var b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
      for(i=0;i<len;i++){ var w=Math.random()*2-1;
        b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759; b2=0.96900*b2+w*0.1538520;
        b3=0.86650*b3+w*0.3104856; b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980;
        d[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11; b6=w*0.115926; }
    } else { var last=0; for(i=0;i<len;i++){ var ww=Math.random()*2-1; last=(last+0.02*ww)/1.02; d[i]=last*3.2; } }
    var src=AC.createBufferSource(); src.buffer=buf; src.loop=true; return src;
  }
  function vol(){ return ($('slp-vol')?+$('slp-vol').value:60)/100; }
  function clearSndSel(){
    var bs=document.querySelectorAll('#slp-acc-sound .slp-snd, #slp-acc-sound .slp-theme, #slp-acc-sound .slp-nat');
    for(var i=0;i<bs.length;i++) bs[i].classList.remove('sel');
  }
  function stopSound(){
    for(var i=0;i<nodes.length;i++){ try{ if(nodes[i].stop) nodes[i].stop(); }catch(e){} try{ nodes[i].disconnect(); }catch(e){} }
    nodes=[]; if(sleepTimer){ clearTimeout(sleepTimer); sleepTimer=null; }
  }
  window.cgoSlpToSound=function(){ var a=$('slp-acc-sound'); if(a) a.open=true; };
  window.cgoSlpSoundInit=function(){
    if($('slp-nat-grid') && !$('slp-nat-grid').innerHTML) cgoSlpNatTab('brown');
    var rec=$('slp-rec'); if(!rec) return;
    if(beforeData && beforeData.stress!=null){
      var s=beforeData.stress, t, nm;
      if(s>=60){ t='t2'; nm=_sk(11426,'🌧️ 밤비의 기적'); }
      else if(s>=35){ t='t1'; nm=_sk(11427,'🌌 우주 기저의 휴식'); }
      else { t='t3'; nm=_sk(11428,'🍃 대나무숲의 속삭임'); }
      rec.style.display='block';
      rec.innerHTML='⭐ <b>'+_sk(11463,'내 측정 기반 추천')+'</b> · 긴장도 <b>'+s+'</b> → <b>'+nm+'</b><br><span style="color:#999;font-size:11px;">'+_sk(11465,'사람마다 맞는 주파수는 달라요 — 참고만 하고 끌리는 걸 고르세요.')+'</span>';
      var tb=$('slp-th-'+t); if(tb) tb.classList.add('rec');
    } else {
      rec.style.display='block';
      rec.innerHTML='<span style="color:#888;">'+_sk(11466,'사람마다 잘 맞는 소리가 달라요. 여러 테마를 들어보고 가장 편안한 것을 고르세요. (측정하고 오면 맞춤 추천을 드려요)')+'</span>';/*★C-63: b태그 분리로 번역 미매칭 → 한 덩어리로 통합*/
    }
  };
  window.cgoSlpToMusic=function(){ cgoSleepClose(); if(typeof cgoGoPage==='function') cgoGoPage('music-v2'); };
  /* ── 6가지 프리미엄 테마 (솔페지오+컬러노이즈+선택적 바이노럴 레이어드) ── */
  var THEMES={
    t1:{sol:432, noise:'white', ng:0.10, lp:520, bin:3,  swell:0,    swR:0.12},
    t2:{sol:528, noise:'brown', ng:0.42, lp:0,   bin:0,  swell:0.18, swR:0.10},
    t3:{sol:396, noise:'pink',  ng:0.30, lp:0,   bin:0,  swell:0.45, swR:0.13},
    t4:{sol:741, noise:'pink',  ng:0.26, lp:0,   bin:0,  swell:0.30, swR:0.55},
    t5:{sol:639, noise:'brown', ng:0.40, lp:0,   bin:0,  swell:0.55, swR:0.07},
    t6:{sol:963, noise:'brown', ng:0.32, lp:760, bin:0,  swell:0.20, swR:0.09, bowl:true}
  };
  window.cgoSlpTheme=function(id){
    var p=THEMES[id]; if(!p) return;
    if(!ensureAC()) return; stopSound(); clearSndSel();
    var b=$('slp-th-'+id); if(b) b.classList.add('sel');
    if(master) master.gain.value=vol();
    // 솔페지오 톤
    var o=AC.createOscillator(); o.type='sine'; o.frequency.value=p.sol;
    var og=AC.createGain(); og.gain.value=0.055; o.connect(og); og.connect(master); o.start(); nodes.push(o,og);
    // 싱잉볼 배음 (고산의 정묵)
    if(p.bowl){ var o2=AC.createOscillator(); o2.type='sine'; o2.frequency.value=p.sol*1.5;
      var o2g=AC.createGain(); o2g.gain.value=0.022; o2.connect(o2g); o2g.connect(master); o2.start(); nodes.push(o2,o2g); }
    // 컬러 노이즈
    var src=makeColorNoise(p.noise), ng=AC.createGain(); ng.gain.value=p.ng;
    if(p.lp){ var f=AC.createBiquadFilter(); f.type='lowpass'; f.frequency.value=p.lp; src.connect(f); f.connect(ng); nodes.push(f); }
    else { src.connect(ng); }
    ng.connect(master); src.start(); nodes.push(src,ng);
    // 스웰(파도·바람·불꽃 흔들림)
    if(p.swell){ var lfo=AC.createOscillator(); lfo.type='sine'; lfo.frequency.value=p.swR;
      var lg=AC.createGain(); lg.gain.value=p.ng*p.swell; lfo.connect(lg); lg.connect(ng.gain); lfo.start(); nodes.push(lfo,lg); }
    // 바이노럴 (이어폰 필요 테마)
    if(p.bin && AC.createStereoPanner){
      var bL=AC.createOscillator(); bL.type='sine'; bL.frequency.value=140;
      var bR=AC.createOscillator(); bR.type='sine'; bR.frequency.value=140+p.bin;
      var pL=AC.createStereoPanner(); pL.pan.value=-1; var pR=AC.createStereoPanner(); pR.pan.value=1;
      var bg=AC.createGain(); bg.gain.value=0.04;
      bL.connect(pL); pL.connect(bg); bR.connect(pR); pR.connect(bg); bg.connect(master);
      bL.start(); bR.start(); nodes.push(bL,bR,pL,pR,bg);
    }
  };
  window.cgoSlpStopSnd=function(){ stopSound(); clearSndSel(); var b=$('slp-snd-off'); if(b) b.classList.add('sel'); };
  window.cgoSlpNoise=function(type){
    if(!ensureAC()) return; stopSound(); clearSndSel();
    var b=$('slp-snd-'+type); if(b) b.classList.add('sel');
    if(master) master.gain.value=vol();
    var src=makeColorNoise(type), g=AC.createGain();
    g.gain.value = type==='white'?0.16:(type==='pink'?0.32:0.42);
    src.connect(g); g.connect(master); src.start(); nodes.push(src,g);
  };
  window.cgoSlpBinaural=function(beat){
    if(!ensureAC()) return; stopSound(); clearSndSel();
    var b=$('slp-bin-'+beat); if(b) b.classList.add('sel');
    if(master) master.gain.value=vol();
    try{
      var base=140, oL=AC.createOscillator(); oL.type='sine'; oL.frequency.value=base;
      var oR=AC.createOscillator(); oR.type='sine'; oR.frequency.value=base+beat;
      var g=AC.createGain(); g.gain.value=0.055;
      if(AC.createStereoPanner){ var pL=AC.createStereoPanner(); pL.pan.value=-1; var pR=AC.createStereoPanner(); pR.pan.value=1;
        oL.connect(pL); pL.connect(g); oR.connect(pR); pR.connect(g); nodes.push(pL,pR); }
      else { var mg=AC.createChannelMerger(2); oL.connect(mg,0,0); oR.connect(mg,0,1); mg.connect(g); nodes.push(mg); }
      g.connect(master); oL.start(); oR.start(); nodes.push(oL,oR,g);
      var rec=$('slp-rec'); if(rec){ rec.style.display='block'; rec.innerHTML=_sk(11509,'🎧 바이노럴은 <b>이어폰/헤드폰을 껴야</b> 효과가 나요(좌·우 귀 주파수 차이로 뇌가 ')+beat+'Hz 파동을 인식). <span style="color:#999;font-size:11px;">근거는 제한적이니 편하게 느껴질 때만.</span>'; }
    }catch(e){}
  };
  window.cgoSlpSound=function(kind){
    if(!ensureAC()) return; stopSound(); clearSndSel();
    var b=$('slp-snd-'+kind); if(b) b.classList.add('sel');
    if(master) master.gain.value=(($('slp-vol')?+$('slp-vol').value:60)/100);
    var src=makeNoise(), filt=AC.createBiquadFilter(), g2=AC.createGain();
    if(kind==='rain'){ filt.type='lowpass'; filt.frequency.value=1200; g2.gain.value=0.45; }
    else if(kind==='stream'){ filt.type='bandpass'; filt.frequency.value=950; filt.Q.value=0.5; g2.gain.value=0.5; }
    else if(kind==='wind'){
      filt.type='lowpass'; filt.frequency.value=520; g2.gain.value=0.55;
      var wl=AC.createOscillator(); wl.type='sine'; wl.frequency.value=0.08;
      var wg=AC.createGain(); wg.gain.value=260; wl.connect(wg); wg.connect(filt.frequency); wl.start(); nodes.push(wl);
    } else { return; }
    src.connect(filt); filt.connect(g2); g2.connect(master); src.start(); nodes.push(src,filt,g2);
  };
  window.cgoSlpSol=function(hz){
    if(!ensureAC()) return; stopSound(); clearSndSel();
    var b=$('slp-sol-'+hz); if(b) b.classList.add('sel');
    if(master) master.gain.value=(($('slp-vol')?+$('slp-vol').value:60)/100);
    var o=AC.createOscillator(); o.type='sine'; o.frequency.value=hz;
    var g=AC.createGain(); g.gain.value=0.09;
    var lfo=AC.createOscillator(); lfo.type='sine'; lfo.frequency.value=0.1;
    var lg=AC.createGain(); lg.gain.value=0.03; lfo.connect(lg); lg.connect(g.gain);
    o.connect(g); g.connect(master); o.start(); lfo.start(); nodes.push(o,lfo,g);
  };
  /* ── 자연음 50 라이브러리 (4대 스펙트럼 실시간 합성) ── */
  function bq(type,freq,q){ var f=AC.createBiquadFilter(); f.type=type; f.frequency.value=freq; if(q)f.Q.value=q; return f; }
  function bqPeak(freq,q,g){ var f=AC.createBiquadFilter(); f.type='peaking'; f.frequency.value=freq; f.Q.value=q||1; f.gain.value=g||5; return f; }
  function playNature(cat,p){
    if(!ensureAC()) return; stopSound();
    if(master) master.gain.value=vol();
    var base = cat==='white'?'white':(cat==='brown'?'brown':'pink');
    var src=makeColorNoise(base), prev=src;
    function add(f){ prev.connect(f); prev=f; nodes.push(f); }
    var baseVol = cat==='brown'?0.42:(cat==='pink'?0.30:(cat==='green'?0.34:0.17));
    if(cat==='brown'){ add(bq('lowpass', p.lp||260, 0.7)); if(p.cf) add(bqPeak(p.cf,0.8,5)); }
    else if(cat==='pink'){ add(bq('lowpass', 2600, 0.7)); if(p.cf) add(bqPeak(p.cf, 0.9, 6)); }
    else if(cat==='green'){ add(bq('bandpass', p.cf||500, p.q||1.0)); }
    else { add(bq('highpass', p.hp||2500, 0.7)); if(p.cf) add(bqPeak(p.cf, p.q||1.0, 7)); }
    var g=AC.createGain(); g.gain.value=baseVol; prev.connect(g); g.connect(master);
    src.start(); nodes.push(src,g);
    if(p.mr){ var lfo=AC.createOscillator(); lfo.type='sine'; lfo.frequency.value=p.mr;
      var lg=AC.createGain(); lg.gain.value=baseVol*(p.md||0.3); lfo.connect(lg); lg.connect(g.gain); lfo.start(); nodes.push(lfo,lg); }
  }
  function NATURE_(){ return {
    brown:[
      ['🏠',_sk(11400,'처마 낙수'),{lp:240,mr:0.8,md:0.5}],['⛺',_sk(11401,'텐트 빗소리'),{lp:280}],['🌊',_sk(11402,'심해 파도'),{lp:220,mr:0.07,md:0.6}],
      ['🧊',_sk(11403,'빙하 울림'),{lp:180,mr:0.04,md:0.4}],['🚣',_sk(11404,'뱃전 물소리'),{lp:260,mr:0.25,md:0.4}],['🐈',_sk(11405,'고양이 골골송'),{lp:200,mr:9,md:0.5}],
      ['🌋',_sk(11406,'화산 진동음'),{lp:160,mr:0.03,md:0.3}],['🛖',_sk(11407,'온돌 열수축'),{lp:230,mr:0.5,md:0.2}],['🛏️',_sk(11408,'이불 속 먹먹한 저음'),{lp:190}],
      ['🌫️',_sk(11409,'안개 강 물결'),{lp:250,mr:0.12,md:0.4}],['❄️',_sk(11410,'얼음 호수 물소리'),{lp:210,mr:0.15,md:0.3}],['🪨',_sk(11411,'암석 틈 바람'),{lp:270,mr:0.1,md:0.4}],
      ['🧣',_sk(11412,'굴뚝 바람'),{lp:200,mr:0.09,md:0.5}],['🪟',_sk(11413,'목조 창 바람'),{lp:240,mr:0.08,md:0.4}]
    ],
    pink:[
      ['🍁',_sk(11512,'단풍잎 소나기'),{cf:500}],['🏞️',_sk(11513,'계곡 시냇물'),{cf:800,mr:0.6,md:0.25}],['🌲',_sk(11514,'침엽수림 바람'),{cf:400,mr:0.1,md:0.5}],
      ['🎋',_sk(11515,'대나무 잎 마찰'),{cf:600,mr:0.2,md:0.4}],['🍂',_sk(11516,'낙엽 구르는 소리'),{cf:700,mr:0.4,md:0.4}],['🌾',_sk(11517,'억새밭'),{cf:450,mr:0.12,md:0.5}],
      ['🌧️',_sk(11518,'보리밭 가을비'),{cf:350}],['🏜️',_sk(11519,'사구 바람'),{cf:550,mr:0.09,md:0.5}],['🌸',_sk(11520,'꽃잎 미풍'),{cf:300,mr:0.15,md:0.4}],
      ['🐑',_sk(11521,'양떼 목장 바람'),{cf:500,mr:0.11,md:0.4}],['🌾',_sk(11522,'볏짚 바람'),{cf:420,mr:0.1,md:0.4}],['☁️',_sk(11523,'구름 대기 진동'),{cf:280,mr:0.05,md:0.3}],
      ['⛲',_sk(11524,'오아시스 샘물'),{cf:750,mr:0.5,md:0.3}],['🌼',_sk(11525,'봄 과수원 미풍'),{cf:330,mr:0.13,md:0.4}]
    ],
    green:[
      ['🪵',_sk(11526,'장작 타닥불'),{cf:500,q:0.9,mr:6,md:0.5}],['🔥',_sk(11527,'숯 잦아듦'),{cf:450,q:1,mr:0.3,md:0.4}],['🚶',_sk(11528,'흙길 발자국'),{cf:520,q:1,mr:1.2,md:0.5}],
      ['💧',_sk(11529,'연꽃잎 이슬'),{cf:480,q:1.2,mr:0.7,md:0.4}],['🌫️',_sk(11530,'안개 강 울림'),{cf:500,q:1,mr:0.1,md:0.3}],['💨',_sk(11531,'문틈 미풍'),{cf:530,q:0.9,mr:0.12,md:0.4}],
      ['🪑',_sk(11532,'오두막 가구 수축음'),{cf:460,q:1.1,mr:0.4,md:0.3}],['🟤',_sk(11533,'진흙 빗방울'),{cf:490,q:1,mr:0.8,md:0.4}],['🪵',_sk(11534,'마른 가지 부러짐'),{cf:510,q:1,mr:0.2,md:0.3}],
      ['🐄',_sk(11535,'소 목방울'),{cf:550,q:1.2,mr:0.5,md:0.3}],['🦌',_sk(11536,'숲 동물 발소리'),{cf:470,q:1,mr:0.9,md:0.4}]
    ],
    white:[
      ['🏖️',_sk(11470,'자갈 파도'),{hp:2500,cf:3500,mr:0.1,md:0.4}],['🕳️',_sk(11471,'동굴 물방울'),{hp:2000,cf:2500,mr:0.6,md:0.5}],['🪶',_sk(11472,'딱따구리'),{hp:1800,cf:2200,mr:3,md:0.5}],
      ['🦗',_sk(11473,'풀벌레'),{hp:3500,cf:4500}],['🎐',_sk(11474,'산사 풍경'),{hp:3000,cf:6000,mr:0.4,md:0.4}],['🌨️',_sk(11475,'함박눈 정묵'),{hp:5000,cf:7500}],
      ['🧊',_sk(11476,'고드름 물방울'),{hp:2500,cf:3000,mr:0.7,md:0.4}],['🐚',_sk(11477,'조개껍데기 파도'),{hp:3500,cf:5500,mr:0.12,md:0.4}],['🐦',_sk(11478,'새벽 산새'),{hp:3000,cf:4500,mr:0.5,md:0.4}],
      ['🧊',_sk(11479,'빙하 균열'),{hp:4000,cf:6500,mr:0.08,md:0.3}],['🔔',_sk(11480,'싱잉볼 잔향'),{hp:1500,cf:2000,mr:0.05,md:0.2}]
    ]
  }; }
  function _NAT_DESC(){ return {
    brown:_sk(11452,'초저음 영역 · 돌발 소음을 밑바닥에서 덮어 깊은 잠·통잠 유지에 좋아요.'),
    pink:_sk(11537,'중저음 1/f 영역 · 가장 편안하게 들려 잠들 때 좋고 잡생각을 부드럽게 지워요.'),
    green:_sk(11538,'500Hz 따뜻한 중심 대역 · 포근한 안정감으로 불안·외로움에 좋아요.'),
    white:_sk(11481,'청량한 고음 영역 · 주의를 분산해 "자야 한다"는 강박을 풀고 소음을 차단해요.')
  }; }
  window.cgoSlpNatTab=function(cat){
  try{ window._slpNatTab = cat; }catch(_){}
    var ts=document.querySelectorAll('.slp-nat-tabs button');
    for(var i=0;i<ts.length;i++) ts[i].classList.toggle('sel', ts[i].getAttribute('data-c')===cat);
    var dd=$('slp-nat-desc'); if(dd) dd.textContent=_NAT_DESC()[cat]||'';
    var grid=$('slp-nat-grid'); if(!grid) return;
    var arr=NATURE_()[cat]||[], h='';
    for(var j=0;j<arr.length;j++) h+='<button class="slp-nat" id="slp-nat-'+cat+'-'+j+'" onclick="cgoSlpNat(\''+cat+'\','+j+')"><span class="ne">'+arr[j][0]+'</span>'+arr[j][1]+'</button>';
    grid.innerHTML=h;
  };
  window.cgoSlpNat=function(cat,idx){
    clearSndSel();
    var ns=document.querySelectorAll('.slp-nat'); for(var i=0;i<ns.length;i++) ns[i].classList.remove('sel');
    var b=$('slp-nat-'+cat+'-'+idx); if(b) b.classList.add('sel');
    var item=NATURE_()[cat] && NATURE_()[cat][idx]; if(item) playNature(cat, item[2]);
  };
  window.cgoSlpVol=function(v){ if(master) master.gain.value=(+v)/100; };
  window.cgoSlpTimer=function(min){
    var ids=[0,15,30,60];
    for(var i=0;i<ids.length;i++){ var b=$('slp-tmr-'+ids[i]); if(b) b.classList.toggle('sel', ids[i]===min); }
    if(sleepTimer){ clearTimeout(sleepTimer); sleepTimer=null; }
    if(!min||!AC) return;
    sleepTimer=setTimeout(function(){ try{ if(master&&AC) master.gain.linearRampToValueAtTime(0,AC.currentTime+10); }catch(e){} setTimeout(stopSound,10500); }, min*60000);
  };

  function _SC_SEV(){ return [_sk(11539,'없음'),_sk(11540,'약간'),_sk(11541,'보통'),_sk(11542,'심함'),_sk(11543,'매우 심함')]; }
  function _SC_SAT(){ return [_sk(11544,'매우 만족'),_sk(11545,'만족'),_sk(11541,'보통'),_sk(11546,'불만족'),_sk(11547,'매우 불만족')]; }
  function _SC_Q(){ return [_sk(11548,'매우 좋음'),_sk(11549,'좋음'),_sk(11541,'보통'),_sk(11550,'나쁨'),_sk(11551,'매우 나쁨')]; }
  // 각 문항 = [질문, 보기('n5'=0~4 숫자 / 배열=라벨), 영역태그]
  function _SQ(){ return [
   {hd:_sk(11720,'🕒 PART 1 · 수면 패턴·시간'),leg:_sk(11553,'0 없음 · 1 약간 · 2 보통 · 3 심함 · 4 매우심함'),items:[
     [_sk(11554,'잠들기가 얼마나 어려운가요? (입면 장애)'),_SC_SEV(),'isi'],
     [_sk(11555,'잠든 뒤 자주 깨나요? (수면 유지)'),_SC_SEV(),'isi'],
     [_sk(11556,'새벽에 너무 일찍 깨서 다시 못 자나요? (조기 각성)'),_SC_SEV(),'isi'],
     [_sk(11557,'현재 수면 패턴에 얼마나 만족하나요?'),_SC_SAT(),'isi'],
     [_sk(11558,'수면 문제가 낮 생활(피로·집중·기억)을 방해하나요?'),_SC_SEV(),'isi'],
     [_sk(11559,'수면 문제가 남에게 드러난다고 느끼나요?'),_SC_SEV(),'isi'],
     [_sk(11560,'수면 문제로 얼마나 걱정·괴로운가요?'),_SC_SEV(),'isi'],
     [_sk(11561,'불 끄고 누운 뒤 잠들기까지 보통 얼마나 걸리나요?'),[_sk(11562,'15분 이내'),_sk(11563,'15–30분'),_sk(11564,'30–60분'),_sk(11565,'1시간 이상'),_sk(11566,'거의 못 잠')],null],
     [_sk(11567,'하룻밤 실제 수면 시간은?'),[_sk(11568,'7시간+'),_sk(11569,'6–7시간'),_sk(11570,'5–6시간'),_sk(11571,'4–5시간'),_sk(11572,'4시간 미만')],null],
     [_sk(11573,'누우면 오히려 정신이 또렷해지는 과각성이 있나요?'),'n5',null],
     [_sk(11574,'못 잔 것 같은데 시간이 훌쩍 가 있는 괴리감이 있나요?'),'n5',null],
     [_sk(11575,'주말·휴일에 2시간 이상 몰아서 자나요?'),'n5','circ'],
     [_sk(11576,'낮에 나도 모르게 순간 졸음(미세수면)이 오나요?'),'n5',null],
     [_sk(11577,'아침에 일어나도 30분 이상 멍하고 무겁나요?'),'n5',null],
     [_sk(11578,'7시간 자도 낮에 만성 피로·두통이 있나요?'),'n5',null]
   ]},
   {hd:_sk(11579,_sk(11721,'🌬️ PART 2 · 호흡·코골이')),leg:_sk(11580,'0 전혀 · 1 가끔 · 2 자주 · 3 거의매일 · 4 항상'),items:[
     [_sk(11581,'방이 울릴 만큼 코를 골거나 불규칙하게 끊긴다는 말을 듣나요?'),'n5','apnea'],
     [_sk(11582,'자다 숨이 멎었다가 "컥" 하고 깨나요?'),'n5','apnea'],
     [_sk(11583,'기도가 막혀 기침·헛기침으로 깨나요?'),'n5','apnea'],
     [_sk(11584,'아침에 입·목이 바짝 말라 있나요? (구강호흡)'),'n5','apnea'],
     [_sk(11585,'자다 속쓰림이나 목 이물감으로 깨나요?'),'n5',null],
     [_sk(11586,'똑바로 누우면 답답해 옆으로 누워야 편한가요?'),'n5','apnea'],
     [_sk(11587,'코가 막혀 입으로 숨 쉬나요?'),'n5','apnea'],
     [_sk(11588,'코골이나 숨 멈춤으로 가족이 걱정한 적 있나요?'),'n5','apnea'],
     [_sk(11589,'아침마다 둔한 편두통이 있나요?'),'n5',null],
     [_sk(11590,'코가 자주 막혀 숨쉬기가 힘든가요?'),'n5',null],
     [_sk(11591,'자면서 침을 많이 흘려 베개가 젖나요?'),'n5',null],
     [_sk(11592,'체중·목둘레 증가로 누우면 숨길이 좁아지는 느낌?'),'n5','apnea'],
     [_sk(11593,'숨막히는 질식성 악몽을 주기적으로 꾸나요?'),'n5',null],
     [_sk(11594,'낮에 목소리가 쉽게 가라앉거나 목 이물감이 있나요?'),'n5',null],
     [_sk(11595,'잘 때 호흡이 불편해 자주 자세를 바꾸나요?'),'n5','apnea']
   ]},
   {hd:_sk(11596,_sk(11722,'🌡️ PART 3 · 심장 활력·체온')),leg:_sk(11580,'0 전혀 · 1 가끔 · 2 자주 · 3 거의매일 · 4 항상'),items:[
     [_sk(11597,'방이 적정 온도인데도 식은땀으로 잠옷·이불이 젖나요?'),'n5',null],
     [_sk(11598,'누우면 손발이 얼음장처럼 차가워 긴장되나요?'),'n5',null],
     [_sk(11599,'누우면 심장 박동이 귀에 쿵쿵 크게 들리나요?'),'n5',null],
     [_sk(11600,'화장실 때문에 밤에 2회 이상 완전히 깨나요?'),'n5',null],
     [_sk(11601,'저녁 이후 머리가 무겁고 눈이 충혈되나요?'),'n5',null],
     [_sk(11602,'한밤중 갑자기 한기로 떨다 깨나요?'),'n5',null],
     [_sk(11603,'가슴 중앙이 답답·압박되는 느낌이 자주 있나요?'),'n5',null],
     [_sk(11604,'누웠을 때 맥이 불규칙하게 뛰는 두근거림이 있나요?'),'n5',null],
     [_sk(11605,'아침에 일어날 때 핑 돌고 어지러운가요?'),'n5',null],
     [_sk(11606,'스트레스로 밤에 몸에서 열이 올라 뒤척이나요?'),'n5',null],
     [_sk(11607,'카페인·술 없이도 야간에 목말라 깨나요?'),'n5',null],
     [_sk(11608,'아침마다 얼굴·손발이 붓나요?'),'n5',null],
     [_sk(11609,'작은 자극·온도 변화에도 쉽게 잠을 설치나요?'),'n5',null],
     [_sk(11610,'낮에도 심박수가 잘 안 떨어지고 계속 높은가요?'),'n5',null]
   ]},
   {hd:_sk(11611,_sk(11723,'🧠 PART 4 · 정신신경·운동')),leg:_sk(11580,'0 전혀 · 1 가끔 · 2 자주 · 3 거의매일 · 4 항상'),items:[
     [_sk(11612,'밤에 다리 안쪽에 벌레 기는 듯한 불쾌감이 있나요?'),'n5','rls'],
     [_sk(11613,'다리를 움직이고 싶은 강한 충동이 있나요?'),'n5','rls'],
     [_sk(11614,'자면서 다리를 주기적으로 차서 이불이 흐트러지나요?'),'n5','rls'],
     [_sk(11615,'아침에 턱·치아가 뻐근한가요? (이갈이)'),'n5',null],
     [_sk(11616,'꿈대로 주먹질·과격한 잠꼬대를 하나요? (REM행동)'),'n5',null],
     [_sk(11617,'잠들 때 몸이 움찔해 깜짝 깨나요? (수면놀람)'),'n5',null],
     [_sk(11618,'의식은 깼는데 몸이 안 움직이는 가위눌림이 있나요?'),'n5',null],
     [_sk(11619,'자다 일어나 서성이는 등 기억 못 하는 행동이 있나요?'),'n5',null],
     [_sk(11620,'손발 끝이 찌릿·저려서 깨나요?'),'n5',null],
     [_sk(11621,'누우면 귀에서 "웅—" 이명·박동음이 들리나요?'),'n5',null],
     [_sk(11622,'아침에 목·어깨가 돌처럼 굳어 있나요?'),'n5',null],
     [_sk(11623,'허리 통증으로 자세를 수십 번 바꾸나요?'),'n5',null],
     [_sk(11624,'눈꺼풀 떨림 등 안면 경련이 동반되나요?'),'n5',null],
     [_sk(11625,'베개에 머리를 대면 어지럼·회전감이 있나요?'),'n5',null]
   ]},
   {hd:_sk(11626,_sk(11724,'🎭 PART 5 · 스트레스·기분')),leg:_sk(11580,'0 전혀 · 1 가끔 · 2 자주 · 3 거의매일 · 4 항상'),items:[
     [_sk(11627,'낮의 불쾌한 일이 누우면 생생히 재생되나요?'),'n5',null],
     [_sk(11628,'사소한 말·자극에도 감정이 크게 흔들리나요?'),'n5',null],
     [_sk(11629,'밤 11시 이후 자극적 야식 충동이 있나요?'),'n5',null],
     [_sk(11630,'"못 자면 큰일"이라는 수면 강박·불안이 있나요?'),'n5',null],
     [_sk(11631,'추락·쫓김 등 생생한 악몽을 주 3회 이상 꾸나요?'),'n5',null],
     [_sk(11632,'아침에 눈뜨자마자 무기력하고 마음이 가라앉나요?'),'n5','mood'],
     [_sk(11633,'수면 부족으로 입술물집·구내염이 잦나요?'),'n5',null],
     [_sk(11634,'스트레스로 피부가 가려워 긁다 깨나요?'),'n5',null],
     [_sk(11635,'잠 못 잔 날 두뇌가 멈춘 듯 멍한가요? (브레인포그)'),'n5',null],
     [_sk(11636,'요즘 지속적으로 기분이 가라앉고 흥미가 줄었나요?'),'n5','mood'],
     [_sk(11637,'잠 문제로 일상이 버거워 도움이 필요하다고 느끼나요?'),'n5','mood'],
     [_sk(11638,'낮에 졸려 운전·작업 중 위험을 느낀 적 있나요?'),'n5',null],
     [_sk(11639,'감정 기복으로 대인관계가 힘들어졌나요?'),'n5','mood']
   ]},
   {hd:_sk(11640,_sk(11725,'🧭 PART 6 · 생체리듬·환경')),leg:_sk(11580,'0 전혀 · 1 가끔 · 2 자주 · 3 거의매일 · 4 항상'),items:[
     [_sk(11641,'작은 빛(불빛·가로등)만 있어도 잠이 깨나요?'),'n5',null],
     [_sk(11642,'밤 10시 이후 1시간+ 화면·블루라이트에 노출되나요?'),'n5','circ'],
     [_sk(11643,'교대근무·야근으로 수면시간이 매주 바뀌나요?'),'n5','circ'],
     [_sk(11644,'밤 9시 이후 고강도 운동을 하나요?'),'n5',null],
     [_sk(11645,'아침에 자연광을 바로 쬐지 못하는 환경인가요?'),'n5','circ'],
     [_sk(11646,'시차 적응이 일주일 이상 오래 걸리나요?'),'n5','circ'],
     [_sk(11647,'밤 9시 이후 카페인(커피·녹차·에너지드링크)을 먹나요?'),'n5',null],
     [_sk(11648,'베개·매트리스가 목·허리에 안 맞아 불편한가요?'),'n5',null],
     [_sk(11649,'동거인·반려동물 움직임에 깨나요?'),'n5',null],
     [_sk(11650,'자기 직전 뜨거운 목욕으로 몸이 달궈진 채 눕나요?'),'n5',null],
     [_sk(11651,'특정 계절에 수면 리듬이 통째로 무너지나요?'),'n5',null],
     [_sk(11652,'침실 소음(차·가전·층간)이 지속되나요?'),'n5',null],
     [_sk(11653,'술을 마셔야 잠들고 몇 시간 뒤 깨나요?'),'n5',null],
     [_sk(11654,'밤 9시 이후 늦은 식사로 속이 부대끼나요?'),'n5',null],
     [_sk(11655,'침실이 너무 건조(40%↓)하거나 습한가요?'),'n5',null],
     [_sk(11656,'잠드는 시간이 매일 1–2시간씩 밀리나요?'),'n5','circ'],
     [_sk(11657,'새벽 2–3시 전엔 도저히 잠이 안 오나요? (수면위상지연)'),'n5','circ']
   ]},
   {hd:_sk(11658,_sk(11726,'💊 PART 7 · 약물·종합')),leg:_sk(11580,'0 전혀 · 1 가끔 · 2 자주 · 3 거의매일 · 4 항상'),items:[
     [_sk(11659,'최근 한 달 수면을 돕는 약을 복용했나요?'),'n5',null],
     [_sk(11660,'수면 보조 제품을 직접 사서 드시나요?'),'n5',null],
     [_sk(11661,'낮 각성을 위해 카페인 3잔 이상 필수인가요?'),'n5',null],
     [_sk(11662,'영상·OTT를 켜놓아야 잠드나요?'),'n5',null],
     [_sk(11663,'잠 못 이룰 때 속쓰림이나 배 불편감이 함께 있나요?'),'n5',null],
     [_sk(11664,'아침에 편두통·어지럼이 잦나요?'),'n5',null],
     [_sk(11665,'잠들려고 누우면 머릿속 생각이 안 멈추나요?'),'n5',null],
     [_sk(11666,'낮에 졸려 카페인·낮잠을 오후에 자주 하나요?'),'n5',null],
     [_sk(11667,'잠자리에 누워 휴대폰을 오래 보나요?'),'n5',null],
     [_sk(11668,'최근 2주 수면이 더 나빠졌나요?'),'n5',null],
     [_sk(11669,'지난 한 달 전반적 수면의 질은?'),_SC_Q(),null],
     [_sk(11670,'낮 동안 체감하는 활력 수준은?'),[_sk(11671,'아주 높음'),_sk(11672,'높음'),_sk(11541,'보통'),_sk(11673,'낮음'),_sk(11674,'매우 낮음')],null]
   ]}
  ]; }
  /* ★ 문항은 그릴 때마다 새로 만든다 — 한 번 굳으면 언어를 바꿔도 그대로 남는다 */
  function _flat(){ var q=_SQ(), o=[]; for(var p=0;p<q.length;p++) for(var i=0;i<q[p].items.length;i++) o.push(q[p].items[i]); return o; }
  var TOTALQ=_flat().length, sAns={};
  Object.defineProperty(window,'_slpSQ',{get:_SQ});
  window.cgoSlpSelfCheck=function(){
    sAns={}; _slpScored=false;
    var h='<div class="slp-badge">SLEEP SELF-CHECK · '+TOTALQ+'</div><h2 class="slp-h">'+_sk(11675,'수면 자가 점검')+'</h2><p class="slp-sub" style="margin-bottom:4px;">'+(_sk(11676,'자가 보고 기반 '))+TOTALQ+(_sk(11677,'문항.'))+'<br>'+_sk(11678,'최근 2~4주를 기준으로 1번부터 차례로 체크하세요.')+'</p>';
    var n=0;
    for(var p=0;p<_SQ().length;p++){
      h+='<div class="slp-qpart">'+_SQ()[p].hd+'<span class="leg">'+_SQ()[p].leg+'</span></div>';
      for(var i=0;i<_SQ()[p].items.length;i++){
        n++; var it=_SQ()[p].items[i]; var opts=(it[1]==='n5')?['0','1','2','3','4']:it[1]; var num=(it[1]==='n5');
        h+='<div class="slp-q" id="slp-q-'+n+'"><div class="slp-q-t">'+n+'. '+it[0]+'</div><div class="slp-q-opts '+(num?'numrow':'labrow')+'">';
        for(var o=0;o<opts.length;o++) h+='<button class="'+(num?'num':'')+'" onclick="__slpAns('+n+','+o+',this)">'+(num?opts[o]:opts[o])+'</button>';
        h+='</div></div>';
      }
    }
    h+='<div id="slp-q-warn" class="slp-q-warn"></div><button class="slp-btn" style="margin-top:16px;" onclick="cgoSlpScore()">'+_sk(11679,'결과 보기 →')+'</button><button class="slp-btn2" onclick="cgoSleepOpen()">'+_sk(11721,'처음으로')+'</button>';
    var ac=$('slp-acc-self'); if(ac) ac.open=true;
    $('slp-self-q').innerHTML='<div class="slp-q-wrap">'+h+'</div>';
  };
  window.__slpAns=function(n,val,btn){
    sAns[n]=val;
    var bs=btn.parentNode.querySelectorAll('button');
    for(var i=0;i<bs.length;i++) bs[i].classList.remove('sel');
    btn.classList.add('sel');
    var q=$('slp-q-'+n); if(q) q.classList.add('done');
    /* ★ 100번째 답이 들어오면 스스로 셈한다 — 한 번만. 답을 고치면 「결과 보기」로 다시 */
    var c=0,k; for(k in sAns) c++;
    if(c>=TOTALQ && !_slpScored){ _slpScored=true; setTimeout(function(){ cgoSlpScore(true); },250); }
  };
  var _slpScored=false;
  /* 언어를 바꿔 다시 그린 뒤, 상자(sAns)에 든 답을 버튼에 다시 표시한다 */
  window.__slpRemark=function(){
    for(var n in sAns){ var q=$('slp-q-'+n); if(!q) continue;
      var bs=q.querySelectorAll('.slp-q-opts button'); var b=bs[sAns[n]];
      if(b){ for(var i=0;i<bs.length;i++) bs[i].classList.remove('sel'); b.classList.add('sel'); q.classList.add('done'); } }
  };
  Object.defineProperty(window,'_slpAns',{get:function(){ return sAns; }, set:function(v){ sAns=v||{}; }});
  window.cgoSlpScore=function(auto){
  try{ window._slpDone = true; }catch(_){}
    var answered=0,k; for(k in sAns) answered++;
    var w=$('slp-q-warn');
    if(answered<TOTALQ && !auto){
      if(w){ w.style.display='block';
        w.innerHTML=_sk(11680,'아직 <b>')+(TOTALQ-answered)+'</b>문항이 비어 있어요. 그래도 결과를 보려면 버튼을 한 번 더 누르세요.';
        if(!w._armed){ w._armed=true; return; } }
    }
    var isi=0,apnea=0,rls=0,circ=0,mood=0,mq=0,total=0;
    for(var n=1;n<=TOTALQ;n++){ var v=sAns[n]||0, dom=_flat()[n-1][2]; total+=v;
      if(dom==='isi')isi+=v; else if(dom==='apnea')apnea+=v; else if(dom==='rls')rls+=v; else if(dom==='circ')circ+=v; else if(dom==='mood'){mood+=v;mq++;} }
    var bi = isi<=7?0 : isi<=14?1 : isi<=21?2 : 3;              /* 등급 0~3 (글자는 그릴 때 그 언어로) */
    var pct=Math.round(total/(TOTALQ*4)*100);
    var bu = pct<20?0 : pct<40?1 : pct<60?2 : 3;                 /* 종합 부담 0~3 */
    var flags=[]; if(apnea>=8) flags.push('apnea'); if(rls>=5) flags.push('rls'); if(circ>=8) flags.push('circ');
    var ma = mq? Math.round(mood/mq*100)/100 : 0;
    var chk={t:Date.now(),isi:isi,bi:bi,pct:pct,bu:bu,flags:flags,ma:ma,apnea:apnea,rls:rls,circ:circ,total:total,n:TOTALQ,
             /* 지난 판과 같은 이름도 함께(다른 화면이 읽을 수 있게) */
             band:_SLP_BAND()[bi][0], burden:_SLP_BURDEN()[bu]};
    try{ localStorage.setItem('cgo_sleep_check', JSON.stringify(chk)); }catch(e){}
    _slpScored=true;
    /* 문항 판 밑에 완료 줄만 남기고, 결과는 「나의 수면 데이터」 하나로 */
    if(w){ w.style.display='block'; w.innerHTML=_sk(23803,'✅ 100문항 완료 — 결과는 아래 「나의 수면 데이터」에 있어요.'); w._armed=false; }
    var as=$('slp-acc-self'); if(as) as.open=false;   /* 자가 점검 접기(배타 아코디언 미지원 기기 대비) */
    cgoSlpData();
    var ad=$('slp-acc-data'); if(ad){ ad.open=true; setTimeout(function(){ try{ ad.scrollIntoView({behavior:'smooth',block:'start'}); }catch(e){} },120); }
  };
  function _SLP_BAND(){ return [
    [_sk(11681,'고른 편'),'#5a9a6b',_sk(11682,'수면 결이 대체로 고른 편이에요. 지금 리듬을 유지하세요.')],
    [_sk(11683,'약간 뒤척임'),'#d4a843',_sk(11684,'약간의 과각성이 보여요. 취침 전 4-7-8 호흡과 사운드 이완을 꾸준히 해보세요.')],
    [_sk(11685,'자주 뒤척임'),'#d98a3b',_sk(11686,'수면이 일상에 영향을 주는 편이에요. 수면 습관을 정비하고, 오래가면 전문기관 상담을 권해요.')],
    [_sk(11687,'많이 뒤척임'),'#c0553b',_sk(11688,'수면 부담이 상당히 큰 편이에요. 전문기관에서 상담을 받아보시길 권해요.')] ]; }
  function _SLP_BURDEN(){ return [_sk(11696,'양호'),_sk(11697,'주의'),_sk(11698,'상당'),_sk(11672,'높음')]; }
  function _SLP_FLAG(){ return {
    apnea:[_sk(11689,'🌬️ 호흡·코골이 부담'),_sk(11690,'코골이·호흡 끊김·구강건조 항목이 여러 개 높아요. 오래가면 전문기관에서 상담을 받아보세요.')],
    rls:[_sk(11691,'🦵 다리 불편감'),_sk(11692,'다리 불쾌감·잦은 움직임이 있어요. 오래가면 전문기관에서 상담을 받아보세요.')],
    circ:[_sk(11693,'🧭 생체리듬 교란'),_sk(11694,'잠드는 시간이 밀리고 불규칙해요. 아침 햇빛 쬐기와 일정한 기상이 가장 도움이 돼요.')] }; }
  function _SLP_THNM(){ return {t1:'🌌 '+_sk(11247,'우주 기저의 휴식'),t2:'🌧️ '+_sk(11250,'밤비의 기적'),t3:'🍃 '+_sk(11253,'대나무숲의 속삭임'),
    t4:'🔥 '+_sk(11256,'모닥불과 무의식'),t5:'🌊 '+_sk(11259,'고요한 심해의 기억'),t6:'🏔️ '+_sk(11262,'고산의 정묵')}; }
  /* ★ 사운드 추천은 코드가 셈한다(AI 에 맡기지 않는다 — 값 0원·지어내기 없음) */
  function _slpRec(chk,rppg){
    var st=(rppg&&rppg.stress!=null)?rppg.stress:null;
    var th = chk.apnea>=8?'t1' : chk.ma>=2?'t5' : (chk.isi>=15||st>=60)?'t2' : 't3';
    var sol = (chk.isi>=15||st>=60)?396 : chk.ma>=2?639 : chk.circ>=8?417 : 528;
    var bin = chk.isi>=15?2:4;
    var tmr = chk.isi>=15?60:30;
    return {th:th,sol:sol,bin:bin,tmr:tmr};
  }
  window._slpRecNow=function(){ var c=null,r=null; try{c=JSON.parse(localStorage.getItem('cgo_sleep_check'));}catch(e){} try{r=JSON.parse(localStorage.getItem('cgo_sleep_rppg'));}catch(e){} return c?_slpRec(c,r):null; };
  window.cgoSlpRecPlay=function(kind,v){
    cgoSlpToSound();
    if(kind==='th') cgoSlpTheme(v); else if(kind==='sol') cgoSlpSol(+v); else if(kind==='bin') cgoSlpBinaural(+v);
    var r=_slpRecNow(); if(r) cgoSlpTimer(r.tmr);
  };
  window.cgoSlpData=function(){
    var h='<div class="slp-badge">MY SLEEP DATA</div><h2 class="slp-h">'+_sk(11710,'나의 수면 데이터')+'</h2><p class="slp-sub" style="margin-bottom:14px;">'+_sk(11711,'기기 안에서만 모은 최근 기록이에요.')+'<br>'+_sk(11712,'(저장 제로 · 서버 0 · 외부 전송 없음)')+'</p>';
    var chk=null,rppg=null; try{chk=JSON.parse(localStorage.getItem('cgo_sleep_check'));}catch(e){} try{rppg=JSON.parse(localStorage.getItem('cgo_sleep_rppg'));}catch(e){}
    function ago(t){ var d=Math.floor((Date.now()-t)/86400000); return d<=0?_sk(11703,'오늘'):d+_sk(11704,'일 전'); }
    var B=_SLP_BAND(), BU=_SLP_BURDEN(), FL=_SLP_FLAG(), TN=_SLP_THNM();
    var hasNew = chk && chk.bi!=null;
    var band = chk ? (hasNew? B[chk.bi][0] : chk.band) : '';
    var burden = chk ? (hasNew? BU[chk.bu] : chk.burden) : '';
    var flagNames = chk ? (hasNew? chk.flags.map(function(f){ return FL[f]?FL[f][0]:f; }) : (chk.flags||[])) : [];
    if(chk){ h+='<div class="slp-rcard"><div class="slp-rrow"><span>'+_sk(11713,'최근 자가점검')+'</span><b>'+ago(chk.t)+'</b></div><div class="slp-rrow"><span>'+_sk(11714,'수면 부담 지수')+'</span><b'+(hasNew?' style="color:'+B[chk.bi][1]+'"':'')+'>'+chk.isi+'/28 · '+band+'</b></div><div class="slp-rrow"><span>'+_sk(11715,'종합 부담')+'</span><b>'+chk.pct+'% · '+burden+'</b></div>'+(flagNames.length?'<div class="slp-rrow"><span>'+_sk(23805,'신호')+'</span><b>'+flagNames.join(', ')+'</b></div>':'')+'</div>'; }
    else { h+='<div class="slp-empty">'+_sk(11717,'아직 자가점검 기록이 없어요.')+'<button class="slp-acc-btn" style="margin-top:10px;" onclick="cgoSlpSelfCheck()">'+_sk(11718,'100문항 점검 시작 →')+'</button></div>'; }
    if(rppg){ h+='<div class="slp-rcard"><div class="slp-rrow"><span>'+_sk(11719,'최근 측정')+'</span><b>'+ago(rppg.t)+'</b></div>'+(rppg.bpm?'<div class="slp-rrow"><span>'+_sk(11460,'활력 박자')+'</span><b>'+rppg.bpm+' bpm</b></div>':'')+(rppg.hrv!=null?'<div class="slp-rrow"><span>'+_sk(11461,'내면 탄력 안정도')+'</span><b>'+rppg.hrv+' </b></div>':'')+(rppg.stress!=null?'<div class="slp-rrow"><span>'+_sk(11464,'긴장도')+'</span><b>'+rppg.stress+'</b></div>':'')+'</div>'; }
    /* ── 결과 요약 (점검을 마쳤을 때만) ── */
    if(hasNew){
      h+='<div class="slp-badge" style="margin-top:6px;">RESULT</div><h2 class="slp-h" style="font-size:18px;">'+_sk(23804,'수면 자가 점검 결과')+'</h2>';
      h+='<p class="slp-rmsg">'+B[chk.bi][2]+'</p>';
      if(chk.flags.length){ h+='<div class="slp-flags">'; chk.flags.forEach(function(f){ if(FL[f]) h+='<div class="slp-flag"><b>'+FL[f][0]+'</b><span>'+FL[f][1]+'</span></div>'; }); h+='</div>'; }
      if(chk.ma>=2.5) h+='<div class="slp-flag mood"><b>'+_sk(23806,'💛 마음 돌봄')+'</b><span>'+_sk(11695,'요즘 기분이 가라앉고 버거운 신호가 보여요. 수면과 마음은 깊이 연결돼 있어요. 혼자 견디지 말고 가까운 사람이나 정신건강 전문가와 이야기 나눠보시길 권해요.')+'</span></div>';
      /* 맞춤 사운드 — 코드가 셈한 추천, 누르면 바로 켠다 */
      var r=_slpRec(chk,rppg);
      h+='<div class="slp-rrec"><b>'+_sk(23807,'🎵 맞춤 수면 사운드 · 점수와 측정값으로 셈한 추천이에요')+'</b>';
      h+='<div class="slp-rec-row"><span>'+_sk(23824,'테마')+' · <b>'+TN[r.th]+'</b></span><button class="slp-rec-btn" onclick="cgoSlpRecPlay(\'th\',\''+r.th+'\')">'+_sk(23808,'▶ 지금 켜기')+'</button></div>';
      h+='<div class="slp-rec-row"><span>'+_sk(23809,'솔페지오')+' · <b>'+r.sol+'Hz</b></span><button class="slp-rec-btn" onclick="cgoSlpRecPlay(\'sol\','+r.sol+')">'+_sk(23808,'▶ 지금 켜기')+'</button></div>';
      h+='<div class="slp-rec-row"><span>'+_sk(23810,'바이노럴 (이어폰 필요)')+' · <b>'+r.bin+'Hz</b></span><button class="slp-rec-btn" onclick="cgoSlpRecPlay(\'bin\','+r.bin+')">'+_sk(23808,'▶ 지금 켜기')+'</button></div>';
      h+='<div class="slp-rec-row"><span>'+_sk(23811,'타이머')+' · <b>'+r.tmr+_sk(23812,'분')+'</b></span></div>';
      h+='<span style="color:#999;font-size:11px;">'+_sk(11465,'사람마다 맞는 주파수는 달라요 — 참고만 하고 끌리는 걸 고르세요.')+'</span></div>';
      /* AI 상담사 */
      h+='<div class="slp-ai"><div class="slp-ai-h">'+_sk(23813,'🤖 수면 AI 상담사')+'</div><p class="slp-ai-sub">'+_sk(23814,'점수·측정값을 바탕으로 웰니스 범주 안에서만 이야기해요. 진단·치료가 아니에요.')+'</p>';
      h+='<div id="slp-ai-log"></div>';
      h+='<button class="slp-btn" style="margin-top:8px;" onclick="cgoSlpAI()">'+_sk(23815,'🤖 내 결과 읽어 주기')+'</button>';
      h+='<div class="slp-ai-in"><input id="slp-ai-in" type="text" placeholder="'+_sk(23816,'궁금한 점을 물어보세요…').replace(/"/g,'&quot;')+'" onkeydown="if(event.key===\'Enter\')cgoSlpAI(this.value)"><button onclick="cgoSlpAI(document.getElementById(\'slp-ai-in\').value)">'+_sk(23817,'보내기')+'</button></div></div>';
      h+='<button class="slp-btn2" onclick="cgoSlpSelfCheck();var a=document.getElementById(\'slp-acc-self\');if(a){a.open=true;}">'+_sk(23821,'🔄 다시 점검하기')+'</button>';
    }
    h+='<button class="slp-btn2" onclick="cgoSleepOpen()">'+_sk(11721,'처음으로')+'</button><p class="slp-note">'+_sk(11722,'기록은 이 기기의 브라우저에만 저장되며 언제든 사라질 수 있어요. 참고용이며 의료 데이터가 아닙니다.')+'</p>';
    var ad=$('slp-acc-data'); if(ad) ad.open=true;
    $('slp-data-host').innerHTML='<div class="slp-q-wrap slp-result-wide">'+h+'</div>';
    /* 지난 대화가 있으면 되살린다 */
    var lg=$('slp-ai-log'); if(lg && _slpAiHist.length){ _slpAiHist.forEach(function(m){ _slpAiBubble(m.role==='user'?'me':'ai', m.content); }); }
  };

  /* ══ 🤖 수면 AI 상담사 — 점수(코드가 셈) + 수면 rPPG + 건강 밸런스(있을 때만) 를 담아 기본 등급으로 ══ */
  var _slpAiHist=[];
  function _slpAiBubble(who,txt){
    var lg=$('slp-ai-log'); if(!lg) return null;
    var d=document.createElement('div'); d.className='slp-ai-b '+who; d.textContent=txt; lg.appendChild(d);
    try{ d.scrollIntoView({behavior:'smooth',block:'nearest'}); }catch(e){}
    return d;
  }
  function _slpAiContext(){
    var chk=null,rppg=null; try{chk=JSON.parse(localStorage.getItem('cgo_sleep_check'));}catch(e){} try{rppg=JSON.parse(localStorage.getItem('cgo_sleep_rppg'));}catch(e){}
    if(!chk || chk.bi==null) return null;
    var B=_SLP_BAND(), FL=_SLP_FLAG(), TN=_SLP_THNM(), r=_slpRec(chk,rppg);
    var lines=['[수면 자가 점검 · 100문항 · 자가 보고]',
      '수면 부담 지수(ISI 7문항): '+chk.isi+'/28 → '+B[chk.bi][0],
      '종합 부담: '+chk.pct+'%', '호흡 영역 합: '+chk.apnea+' · 다리 영역 합: '+chk.rls+' · 생체리듬 영역 합: '+chk.circ+' · 기분 영역 평균: '+chk.ma+'/4',
      '신호: '+(chk.flags.length? chk.flags.map(function(f){return FL[f][0];}).join(', ') : '없음')];
    if(rppg && rppg.bpm) lines.push('[수면 rPPG 40초 관찰값] 심박 '+rppg.bpm+' bpm · HRV(RMSSD) '+(rppg.hrv!=null?rppg.hrv:'—')+' · 긴장도 '+(rppg.stress!=null?rppg.stress:'—')+'/100');
    else lines.push('[수면 rPPG] 측정값 없음 — 아직 재지 않았음을 그대로 말할 것');
    var bs=null; try{ bs=(window._c24 && window._c24.lastResult) || null; }catch(e){}
    if(bs){ var t=''; try{ t=JSON.stringify(bs); if(t.length>900) t=t.slice(0,900)+'…'; }catch(e){ t=''; } if(t) lines.push('[나의 건강 밸런스 6부위 관찰값] '+t); }
    else lines.push('[나의 건강 밸런스] 측정값 없음 — 아직 재지 않았음을 그대로 말할 것');
    lines.push('[앱이 셈한 추천 사운드] 테마 '+TN[r.th]+' · 솔페지오 '+r.sol+'Hz · 바이노럴 '+r.bin+'Hz · 타이머 '+r.tmr+'분 — 이 네 가지는 화면에 단추로 이미 있으니 그 이유를 짧게 풀어 주고 다른 주파수를 새로 짓지 말 것');
    return lines.join('\n');
  }
  window.cgoSlpAI=function(q){
    q=(q||'').trim();
    var ctx=_slpAiContext();
    if(!ctx){ _slpAiBubble('ai',_sk(23820,'먼저 100문항 자가 점검을 마쳐 주세요.')); return; }
    var inp=$('slp-ai-in'); if(inp) inp.value='';
    var user = q || '내 수면 자가 점검 결과와 관찰값을 읽고, 오늘 밤 잠들기 전 생활 습관 두세 가지와 추천 사운드의 이유를 짧게 알려 주세요.';
    if(q) _slpAiBubble('me',q);
    var wait=_slpAiBubble('ai',_sk(23823,'생각 중…'));
    var sys='당신은 CGO-FULI 「수면」 기능의 AI 상담사입니다. 아래 자료는 사용자의 수면 자가 점검 점수(자가 보고)와 카메라 rPPG 심박·HRV 관찰값입니다. '
      +'웰니스 범주 안에서만, 잠·빛·카페인·호흡·소리 같은 생활 습관 이야기까지만 상담합니다. 없는 측정값은 없다고 정직하게 말합니다.\n\n'+ctx;
    var msgs=[{role:'system',content:sys}];
    _slpAiHist.slice(-6).forEach(function(m){ msgs.push(m); });
    msgs.push({role:'user',content:user});
    fetch('/api/groq',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'openai/gpt-oss-20b',reasoning_effort:'low',include_reasoning:false,messages:msgs,max_tokens:520,temperature:0.5})})
      .then(function(r){ return r.json(); })
      .then(function(d){ var a=(d&&d.choices&&d.choices[0]&&d.choices[0].message)?d.choices[0].message.content:''; if(!a) a=_sk(16155,'잠시 후 다시 시도해 주세요.');
        if(wait) wait.textContent=a; _slpAiHist.push({role:'user',content:user},{role:'assistant',content:a}); if(_slpAiHist.length>10) _slpAiHist=_slpAiHist.slice(-10); })
      .catch(function(){ if(wait) wait.textContent=_sk(16155,'잠시 후 다시 시도해 주세요.'); });
  };
})();


/* ══ 언어가 바뀌면 그려 둔 화면을 다시 칠한다 ══
   자연음 목록·자가점검·결과는 JS가 글자를 박아 넣으므로 사전만 바뀌면 옛 언어로 남는다.
   공용 장치가 아직 없을 수 있어 여러 번 나누어 등록을 시도한다. */
(function(){
  function repaint(){
    var pg = document.getElementById('page-cgo-sleep');
    if(!pg || getComputedStyle(pg).display === 'none') return;
    try{ if(window.CGO_T) CGO_T.paint(pg); }catch(e){}
    try{ var rc = document.getElementById('slp-rec');
         if(window.cgoSlpSoundInit && rc && rc.innerHTML) cgoSlpSoundInit(); }catch(e){}
    try{ var dv = document.getElementById('slp-acc-data');
         if(window.cgoSlpData && dv && dv.open) cgoSlpData(); }catch(e){}
    try{ if(window.cgoSlpNatTab && window._slpNatTab != null) cgoSlpNatTab(window._slpNatTab); }catch(e){}
    /* 자가점검 — 고른 답을 안고 다시 그린 뒤 그대로 되돌린다 (답이 지워지지 않는다) */
    try{
      var q = document.getElementById('slp-self-q');
      if(window.cgoSlpSelfCheck && q && q.innerHTML && q.innerHTML.length > 200){
        /* 답은 상자(_slpAns)에 번호로 들어 있다 — 다시 그린 뒤 상자를 되돌리고 버튼에 표시만 다시 붙인다 */
        var keep = window._slpAns || {}, kc = 0, kk; for(kk in keep) kc++;
        cgoSlpSelfCheck();
        window._slpAns = keep;
        if(window.__slpRemark) __slpRemark();
        var warn = document.getElementById('slp-q-warn');
        if(warn && kc >= 100){ warn.style.display='block'; warn.innerHTML=_sk(23803,'✅ 100문항 완료 — 결과는 아래 「나의 수면 데이터」에 있어요.'); }
      }
    }catch(e){}
  }
  var done = false;
  function tryHook(){
    if(done) return;
    if(window.cgoRepaintOn){ window.cgoRepaintOn(repaint); done = true; }
  }
  [0, 200, 800, 2000, 4000].forEach(function(d){ setTimeout(tryHook, d); });
  /* 마지막 안전장치 — 공용 장치가 끝내 없으면 언어 함수를 직접 감싼다 */
  setTimeout(function(){
    if(done || !window.CGO_T || CGO_T.__slpWrap) return;
    var orig = CGO_T.set;
    CGO_T.set = function(){ var r = orig.apply(this, arguments); setTimeout(repaint, 70); return r; };
    CGO_T.__slpWrap = true; done = true;
  }, 5000);
})();
