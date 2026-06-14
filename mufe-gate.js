/* FULI 입구 게이트 (mufe-gate.js) — 등록(비번 만들기)+로그인 통합. index.html 옆 루트에 둘 것. */
(function(){
  if(document.getElementById("mufeGate")) return;
  var __html=`<div id="mufeGate" class="mg-overlay">
  <div class="mg-card">
    <div class="mg-logo">FULI</div>
    <div class="mg-title">입구</div>

    <!-- 0) 선택 -->
    <div id="mgStep0">
      <div class="mg-sub">처음이면 비번을 만들고, 있으면 시작하세요</div>
      <button class="mg-enter" id="mgBtnReg" type="button" style="margin-bottom:10px">🆕 비번 만들기 (처음)</button>
      <button class="mg-stop" id="mgBtnLogin" type="button">🚀 시작하기</button>
    </div>

    <!-- R1) 등록: 비번 -->
    <div id="mgRegPass" style="display:none">
      <div class="mg-sub">쓸 <b>비밀번호</b>를 정하세요</div>
      <input type="password" id="mgRegPassInput" class="mg-input" placeholder="비밀번호 (8자 이상 권장)" autocomplete="off" />
      <button class="mg-enter" id="mgRegPassNext" type="button">다음 — 그림 고르기 ▸</button>
      <div class="mg-retry" id="mgRegBack1">◂ 뒤로</div>
    </div>

    <!-- R2) 등록: 그림 4장 -->
    <div id="mgRegGrid" style="display:none">
      <div class="mg-sub">기억할 그림을 <b>순서대로 4장</b> 누르세요</div>
      <div class="mg-seqlabel" id="mgRegSeqLabel">선택: 0 / 4</div>
      <div class="mg-grid" id="mgRegGridEl"></div>
      <button class="mg-clear" id="mgRegClear" type="button">초기화</button>
      <button class="mg-enter" id="mgRegDone" type="button" style="margin-top:10px" disabled>비번 만들기 완료</button>
    </div>

    <!-- 1) 로그인: 단어 -->
    <div id="mgStep1" style="display:none">
      <div class="mg-sub">도는 단어 하나를 잡으세요</div>
      <div class="mg-word-box"><span class="mg-word" id="mgWord">발급 중…</span></div>
      <button class="mg-stop" id="mgStopBtn" type="button">잡기 ✋</button>
    </div>

    <!-- 2) 로그인: 그림 4장 -->
    <div id="mgStep2" style="display:none">
      <div class="mg-sub">그림을 <b>순서대로 4장</b> 누르세요</div>
      <div class="mg-seqlabel" id="mgSeqLabel">선택: 0 / 4</div>
      <div class="mg-grid" id="mgGrid"></div>
      <button class="mg-clear" id="mgClearBtn" type="button">초기화</button>
    </div>

    <!-- 3) 로그인: 비번 -->
    <div id="mgStep3" style="display:none">
      <div class="mg-sub">잡은 단어 · <b id="mgCaught"></b></div>
      <input type="password" id="mgPass" class="mg-input" placeholder="비밀번호" autocomplete="off" />
      <button class="mg-enter" id="mgEnterBtn" type="button">들어가기</button>
      <div class="mg-retry" id="mgRetryBtn">처음부터</div>
    </div>

    <div class="mg-msg" id="mgMsg"></div>
    <div class="mg-pqbadge" id="mgPqBadge"></div>
  </div>
</div>

<style>
  .mg-overlay{ position:fixed; inset:0; z-index:99999; display:flex; align-items:center; justify-content:center;
    background:radial-gradient(circle at 50% 30%, #0d1b2a 0%, #060d16 70%, #03070d 100%);
    font-family:'Pretendard','Apple SD Gothic Neo',system-ui,sans-serif; }
  .mg-card{ width:min(380px,90vw); padding:30px 26px 24px; background:rgba(16,28,44,.74); backdrop-filter:blur(14px);
    border:1px solid rgba(94,234,212,.18); border-radius:22px; box-shadow:0 20px 60px rgba(0,0,0,.5); text-align:center; color:#e6f1f5; }
  .mg-logo{ font-size:13px; letter-spacing:4px; color:#5eead4; font-weight:700; }
  .mg-title{ font-size:26px; font-weight:800; margin:2px 0 18px; }
  .mg-sub{ font-size:13px; color:#9fb3c0; margin-bottom:16px; line-height:1.5; }
  .mg-sub b{ color:#5eead4; }
  .mg-word-box{ height:92px; display:flex; align-items:center; justify-content:center; border:1px solid rgba(94,234,212,.22);
    border-radius:16px; background:rgba(8,16,26,.6); margin-bottom:16px; overflow:hidden; }
  .mg-word{ font-size:36px; font-weight:800; color:#5eead4; }
  .mg-stop,.mg-enter{ width:100%; padding:15px; border:none; border-radius:14px; font-size:17px; font-weight:700; cursor:pointer; transition:transform .08s, filter .2s; }
  .mg-stop{ background:linear-gradient(135deg,#14b8a6,#0ea5e9); color:#fff; }
  .mg-enter{ background:linear-gradient(135deg,#5eead4,#22d3ee); color:#03131a; font-weight:800; }
  .mg-enter:disabled{ filter:grayscale(.6) brightness(.7); cursor:not-allowed; }
  .mg-stop:active,.mg-enter:active{ transform:scale(.97); }

  .mg-seqlabel{ font-size:12px; color:#9fb3c0; margin-bottom:8px; }
  .mg-grid{ display:grid; grid-template-columns:repeat(10,1fr); gap:3px; max-height:260px; overflow-y:auto;
    padding:5px; background:rgba(0,0,0,.25); border-radius:10px; margin-bottom:12px; }
  .mg-cell{ position:relative; aspect-ratio:1/1; border-radius:5px; overflow:hidden; cursor:pointer; background:#1e293b; outline:2px solid transparent; transition:outline .12s; }
  .mg-cell img{ width:100%; height:100%; object-fit:cover; display:block; }
  .mg-cell.on{ outline:2px solid #5eead4; }
  .mg-cell .ord{ position:absolute; top:1px; right:2px; font-size:10px; font-weight:800; color:#03131a; background:#5eead4; border-radius:50%; width:15px; height:15px; line-height:15px; text-align:center; }
  .mg-clear{ font-size:12px; padding:6px 14px; border-radius:9px; border:1px solid rgba(148,163,184,.4); background:rgba(148,163,184,.12); color:#cbd5e1; cursor:pointer; }

  .mg-caught b{ color:#5eead4; font-size:18px; }
  .mg-input{ width:100%; box-sizing:border-box; padding:14px 16px; margin:14px 0; border:1px solid rgba(159,179,192,.3);
    border-radius:12px; background:rgba(8,16,26,.6); color:#e6f1f5; font-size:16px; text-align:center; letter-spacing:2px; }
  .mg-input:focus{ outline:none; border-color:#5eead4; }
  .mg-retry{ margin-top:14px; font-size:13px; color:#7d93a1; cursor:pointer; text-decoration:underline; }
  .mg-msg{ margin-top:14px; font-size:13px; min-height:18px; color:#fbbf77; line-height:1.5; }
  .mg-pqbadge{ margin-top:12px; font-size:11px; letter-spacing:1px; color:#5eead4; opacity:.75; }
</style>`;
  document.body.insertAdjacentHTML("beforeend", __html);

(function(){
  const API_BASE = '';
  const ROT_MS = 90;
  const IMG_COUNT = 100, IMG_PICK = 4;
  const IMG_DIRS = ['/무폐 이미지/', '/images/'];
  const IMG_EXTS = ['.png', '.png.jpeg', '.jpeg', '.jpg'];
  const FORMAT = 'joined-after';
  const $ = id => document.getElementById(id);

  let challengeId=null, words=[], caughtWord=null, rotTimer=null, idx=0, demo=false;
  let clientSk=null, ss=null, seq=[], regSeq=[], regPass='';

  const toB64 = u => { let s=''; for(let i=0;i<u.length;i++) s+=String.fromCharCode(u[i]); return btoa(s); };
  const fromB64 = b => Uint8Array.from(atob(b), c=>c.charCodeAt(0));
  function imgCands(i){ const n=String(i).padStart(3,'0'); const out=[]; IMG_DIRS.forEach(d=>IMG_EXTS.forEach(e=>out.push(d+'chaos-'+n+e))); return out; }
  function show(id){ ['mgStep0','mgRegPass','mgRegGrid','mgStep1','mgStep2','mgStep3'].forEach(s=>{ $(s).style.display = (s===id?'block':'none'); }); }

  // ===== 격자 만들기 (공용) =====
  function buildGrid(gridEl, seqArr, labelEl, doneBtn){
    if(gridEl.childElementCount){ return; }
    for(let i=0;i<IMG_COUNT;i++){
      const cands=imgCands(i);
      const cell=document.createElement('div'); cell.className='mg-cell'; cell.dataset.i=i;
      const img=document.createElement('img'); img.loading='lazy'; img.dataset.ci='0'; img.src=cands[0];
      img.onerror=function(){ let ci=+this.dataset.ci+1; if(ci<cands.length){ this.dataset.ci=ci; this.src=cands[ci]; } else { this.style.opacity=.25; } };
      cell.appendChild(img);
      cell.addEventListener('click', ()=>pickCell(i, cell, seqArr, labelEl, doneBtn));
      gridEl.appendChild(cell);
    }
  }
  function pickCell(i, cell, seqArr, labelEl, doneBtn){
    if(cell.classList.contains('on')) return;
    if(seqArr.length>=IMG_PICK) return;
    seqArr.push(i); cell.classList.add('on');
    const o=document.createElement('span'); o.className='ord'; o.textContent=seqArr.length; cell.appendChild(o);
    labelEl.textContent = '선택: '+seqArr.length+' / '+IMG_PICK;
    if(doneBtn && seqArr.length===IMG_PICK){ doneBtn.disabled=false; }
    if(!doneBtn && seqArr.length===IMG_PICK){ // 로그인 격자 → 비번 단계로
      setTimeout(()=>{ show('mgStep3'); setTimeout(()=>$('mgPass').focus(),200); }, 300);
    }
  }
  function clearGrid(gridEl, seqArr, labelEl, doneBtn){
    seqArr.length=0;
    gridEl.querySelectorAll('.mg-cell.on').forEach(c=>{ c.classList.remove('on'); const o=c.querySelector('.ord'); if(o)o.remove(); });
    labelEl.textContent = '선택: 0 / '+IMG_PICK;
    if(doneBtn) doneBtn.disabled=true;
  }

  // ===== 등록 =====
  function startReg(){ regPass=''; regSeq.length=0; $('mgRegPassInput').value=''; $('mgMsg').textContent=''; show('mgRegPass'); }
  function regPassNext(){
    const p=$('mgRegPassInput').value.trim();
    if(p.length<4){ $('mgMsg').textContent='비밀번호를 4자 이상 입력하세요'; return; }
    regPass=p; $('mgMsg').textContent='';
    show('mgRegGrid'); buildGrid($('mgRegGridEl'), regSeq, $('mgRegSeqLabel'), $('mgRegDone'));
  }
  async function regDone(){
    if(regSeq.length!==IMG_PICK){ $('mgMsg').textContent='그림을 4장 고르세요'; return; }
    $('mgMsg').textContent='등록 중…';
    try{
      const r=await fetch(API_BASE+'/api/register',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ passcode:regPass, imageSeq:regSeq.join('-'), format:FORMAT })});
      const d=await r.json();
      if(d.status==='success' && d.token){
        try{ localStorage.setItem('fuli_user_token', d.token); }catch(e){}
        $('mgMsg').textContent='✅ 비번을 만들었어요! 이제 시작하세요.';
        setTimeout(()=>{ show('mgStep0'); $('mgMsg').textContent=''; }, 1400);
      } else {
        $('mgMsg').textContent='등록 실패 — 서버 설정(KV·SECRET)을 확인하세요';
      }
    }catch(e){ $('mgMsg').textContent='연결 오류 — 잠시 후 다시'; }
  }

  // ===== 로그인 =====
  function genClientPk(){
    clientSk=null;
    try{ if(window.MufePQ&&window.MufePQ.ml_kem768){ const {publicKey,secretKey}=window.MufePQ.ml_kem768.keygen(); clientSk=secretKey; return toB64(publicKey);} }catch(e){}
    return null;
  }
  async function startLogin(){
    let userToken=null; try{ userToken=localStorage.getItem('fuli_user_token'); }catch(e){}
    if(!userToken){ $('mgMsg').textContent='먼저 "비번 만들기"로 비번을 정하세요'; return; }
    $('mgMsg').textContent=''; seq.length=0; ss=null;
    show('mgStep1'); $('mgWord').textContent='발급 중…';
    const clientPk=genClientPk();
    try{
      const res=await fetch(API_BASE+'/api/challenge',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({clientPk})});
      const d=await res.json();
      challengeId=d.challengeId||null; words=d.words||d.rotationWords||[];
      if(!words.length) throw new Error('no words');
      if(d.ct && clientSk && window.MufePQ){ try{ ss=window.MufePQ.ml_kem768.decapsulate(fromB64(d.ct), clientSk); }catch(e){ ss=null; } }
      demo=false; $('mgPqBadge').textContent = ss ? '🔒 양자내성 보호 (ML-KEM-768)' : '';
    }catch(e){ demo=true; challengeId=null; ss=null; words=['사랑','하늘','바다','구름','별빛','노을','바람','이슬']; $('mgPqBadge').textContent=''; }
    startRotate();
  }
  function startRotate(){ caughtWord=null; idx=0; clearInterval(rotTimer);
    rotTimer=setInterval(()=>{ idx=(idx+1)%words.length; $('mgWord').textContent=words[idx]; }, ROT_MS); }
  function doStop(){ clearInterval(rotTimer); caughtWord=words[idx]; $('mgCaught').textContent=caughtWord;
    show('mgStep2'); buildGrid($('mgGrid'), seq, $('mgSeqLabel'), null); }
  function doRestart(){ $('mgMsg').textContent=''; $('mgPass').value=''; clearGrid($('mgGrid'),seq,$('mgSeqLabel'),null); startLogin(); }

  async function aesEncrypt(ssBytes, plain){
    const key=await crypto.subtle.importKey('raw', ssBytes, {name:'AES-GCM'}, false, ['encrypt']);
    const iv=crypto.getRandomValues(new Uint8Array(12));
    const full=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv}, key, new TextEncoder().encode(plain)));
    return { iv:toB64(iv), data:toB64(full.slice(0,full.length-16)), tag:toB64(full.slice(full.length-16)) };
  }
  async function doSubmit(){
    const pass=$('mgPass').value.trim();
    if(!pass){ $('mgMsg').textContent='비밀번호를 입력하세요'; return; }
    if(seq.length!==IMG_PICK){ $('mgMsg').textContent='그림을 4장 선택하세요'; return; }
    let userToken=null; try{ userToken=localStorage.getItem('fuli_user_token'); }catch(e){}
    if(!userToken){ $('mgMsg').textContent='먼저 비번을 만드세요'; return; }
    const answer=pass+caughtWord, imageSeq=seq.join('-');
    $('mgMsg').textContent='확인 중…';
    try{
      const body={ userToken, challengeId, caughtWord };
      if(ss){ body.encAnswer = await aesEncrypt(ss, JSON.stringify({answer, imageSeq})); }
      else  { body.answer=answer; body.imageSeq=imageSeq; }
      const r=await fetch(API_BASE+'/api/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const d=await r.json();
      if(d.status==='success'||d.status==='real'){ if(d.token){ try{localStorage.setItem('fuli_session',d.token);}catch(e){} } passOK(); }
      else { $('mgMsg').textContent='맞지 않습니다 · 처음부터 다시'; setTimeout(doRestart,1300); }
    }catch(e){ $('mgMsg').textContent='연결 오류 · 다시'; }
  }
  function passOK(){ $('mufeGate').style.display='none'; if(typeof window.onMufeGatePass==='function') window.onMufeGatePass(); }

  // ===== 이벤트 =====
  $('mgBtnReg').addEventListener('click', startReg);
  $('mgBtnLogin').addEventListener('click', startLogin);
  $('mgRegPassNext').addEventListener('click', regPassNext);
  $('mgRegBack1').addEventListener('click', ()=>{ show('mgStep0'); $('mgMsg').textContent=''; });
  $('mgRegClear').addEventListener('click', ()=>clearGrid($('mgRegGridEl'),regSeq,$('mgRegSeqLabel'),$('mgRegDone')));
  $('mgRegDone').addEventListener('click', regDone);
  $('mgRegPassInput').addEventListener('keydown', e=>{ if(e.key==='Enter') regPassNext(); });
  $('mgStopBtn').addEventListener('click', doStop);
  $('mgClearBtn').addEventListener('click', ()=>clearGrid($('mgGrid'),seq,$('mgSeqLabel'),null));
  $('mgEnterBtn').addEventListener('click', doSubmit);
  $('mgRetryBtn').addEventListener('click', doRestart);
  $('mgPass').addEventListener('keydown', e=>{ if(e.key==='Enter') doSubmit(); });

  show('mgStep0');
})();

})();
