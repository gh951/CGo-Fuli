/* FULI 입구 게이트 — index.html 에 <script src="mufe-gate.js"></script> 한 줄로 링크 */
(function(){
  document.body.insertAdjacentHTML("beforeend", "<div id=\"mufeGate\" class=\"mg-overlay\">\n  <div class=\"mg-card\">\n    <div class=\"mg-logo\">FULI</div>\n    <div class=\"mg-title\">입구</div>\n\n    <!-- ① 단어 회전 -->\n    <div id=\"mgStep1\">\n      <div class=\"mg-sub\">도는 단어 하나를 잡으세요</div>\n      <div class=\"mg-word-box\"><span class=\"mg-word\" id=\"mgWord\">발급 중…</span></div>\n      <button class=\"mg-stop\" id=\"mgStopBtn\" type=\"button\">잡기 ✋</button>\n    </div>\n\n    <!-- ② 이미지 격자 (100장 중 4장 순서) -->\n    <div id=\"mgStep2\" style=\"display:none\">\n      <div class=\"mg-sub\">그림을 <b>순서대로 4장</b> 누르세요</div>\n      <div class=\"mg-seqlabel\" id=\"mgSeqLabel\">선택: 0 / 4</div>\n      <div class=\"mg-grid\" id=\"mgGrid\"></div>\n      <button class=\"mg-clear\" id=\"mgClearBtn\" type=\"button\">초기화</button>\n    </div>\n\n    <!-- ③ 비밀번호 -->\n    <div id=\"mgStep3\" style=\"display:none\">\n      <div class=\"mg-sub\">잡은 단어 · <b id=\"mgCaught\"></b></div>\n      <input type=\"password\" id=\"mgPass\" class=\"mg-input\" placeholder=\"비밀번호\" autocomplete=\"off\" />\n      <button class=\"mg-enter\" id=\"mgEnterBtn\" type=\"button\">들어가기</button>\n      <div class=\"mg-retry\" id=\"mgRetryBtn\">처음부터</div>\n    </div>\n\n    <div class=\"mg-msg\" id=\"mgMsg\"></div>\n    <div class=\"mg-pqbadge\" id=\"mgPqBadge\"></div>\n  </div>\n</div>\n\n<style>\n  .mg-overlay{ position:fixed; inset:0; z-index:99999; display:flex; align-items:center; justify-content:center;\n    background:radial-gradient(circle at 50% 30%, #0d1b2a 0%, #060d16 70%, #03070d 100%);\n    font-family:'Pretendard','Apple SD Gothic Neo',system-ui,sans-serif; }\n  .mg-card{ width:min(380px,90vw); padding:30px 26px 24px; background:rgba(16,28,44,.74); backdrop-filter:blur(14px);\n    border:1px solid rgba(94,234,212,.18); border-radius:22px; box-shadow:0 20px 60px rgba(0,0,0,.5); text-align:center; color:#e6f1f5; }\n  .mg-logo{ font-size:13px; letter-spacing:4px; color:#5eead4; font-weight:700; }\n  .mg-title{ font-size:26px; font-weight:800; margin:2px 0 18px; }\n  .mg-sub{ font-size:13px; color:#9fb3c0; margin-bottom:16px; line-height:1.5; }\n  .mg-sub b{ color:#5eead4; }\n  .mg-word-box{ height:92px; display:flex; align-items:center; justify-content:center; border:1px solid rgba(94,234,212,.22);\n    border-radius:16px; background:rgba(8,16,26,.6); margin-bottom:16px; overflow:hidden; }\n  .mg-word{ font-size:36px; font-weight:800; color:#5eead4; }\n  .mg-stop,.mg-enter{ width:100%; padding:15px; border:none; border-radius:14px; font-size:17px; font-weight:700; cursor:pointer; transition:transform .08s, filter .2s; }\n  .mg-stop{ background:linear-gradient(135deg,#14b8a6,#0ea5e9); color:#fff; }\n  .mg-enter{ background:linear-gradient(135deg,#5eead4,#22d3ee); color:#03131a; font-weight:800; }\n  .mg-stop:active,.mg-enter:active{ transform:scale(.97); }\n\n  .mg-seqlabel{ font-size:12px; color:#9fb3c0; margin-bottom:8px; }\n  .mg-grid{ display:grid; grid-template-columns:repeat(10,1fr); gap:3px; max-height:260px; overflow-y:auto;\n    padding:5px; background:rgba(0,0,0,.25); border-radius:10px; margin-bottom:12px; }\n  .mg-cell{ position:relative; aspect-ratio:1/1; border-radius:5px; overflow:hidden; cursor:pointer; background:#1e293b; outline:2px solid transparent; transition:outline .12s; }\n  .mg-cell img{ width:100%; height:100%; object-fit:cover; display:block; }\n  .mg-cell.on{ outline:2px solid #5eead4; }\n  .mg-cell .ord{ position:absolute; top:1px; right:2px; font-size:10px; font-weight:800; color:#03131a; background:#5eead4; border-radius:50%; width:15px; height:15px; line-height:15px; text-align:center; }\n  .mg-clear{ font-size:12px; padding:6px 14px; border-radius:9px; border:1px solid rgba(148,163,184,.4); background:rgba(148,163,184,.12); color:#cbd5e1; cursor:pointer; }\n\n  .mg-caught b{ color:#5eead4; font-size:18px; }\n  .mg-input{ width:100%; box-sizing:border-box; padding:14px 16px; margin:14px 0; border:1px solid rgba(159,179,192,.3);\n    border-radius:12px; background:rgba(8,16,26,.6); color:#e6f1f5; font-size:16px; text-align:center; letter-spacing:2px; }\n  .mg-input:focus{ outline:none; border-color:#5eead4; }\n  .mg-retry{ margin-top:14px; font-size:13px; color:#7d93a1; cursor:pointer; text-decoration:underline; }\n  .mg-msg{ margin-top:14px; font-size:13px; min-height:18px; color:#fbbf77; line-height:1.5; }\n  .mg-pqbadge{ margin-top:12px; font-size:11px; letter-spacing:1px; color:#5eead4; opacity:.75; }\n</style>");
})();

(function(){
  const API_BASE = '';
  const ROT_MS = 90;
  const IMG_COUNT = 100;                                  // 그림 장수
  const IMG_PICK  = 4;                                    // 순서대로 고를 장수
  const IMG_DIRS  = ['/무폐 이미지/', '/images/'];        // 폴더 후보 (무페와 동일)
  const IMG_EXTS  = ['.png', '.png.jpeg', '.jpeg', '.jpg'];// 확장자 후보 자동 폴백
  const $ = id => document.getElementById(id);

  let challengeId=null, words=[], caughtWord=null, rotTimer=null, idx=0, demo=false;
  let clientSk=null, ss=null, seq=[];

  const toB64 = u => { let s=''; for(let i=0;i<u.length;i++) s+=String.fromCharCode(u[i]); return btoa(s); };
  const fromB64 = b => Uint8Array.from(atob(b), c=>c.charCodeAt(0));
  function imgCands(i){ const n=String(i).padStart(3,'0'); const out=[]; IMG_DIRS.forEach(d=>IMG_EXTS.forEach(e=>out.push(d+'chaos-'+n+e))); return out; }

  function genClientPk(){
    clientSk=null;
    try{ if(window.MufePQ&&window.MufePQ.ml_kem768){ const {publicKey,secretKey}=window.MufePQ.ml_kem768.keygen(); clientSk=secretKey; return toB64(publicKey);} }catch(e){}
    return null;
  }

  async function mgLoad(){
    $('mgMsg').textContent=''; $('mgWord').textContent='발급 중…';
    $('mgStep1').style.display='block'; $('mgStep2').style.display='none'; $('mgStep3').style.display='none';
    seq=[]; ss=null;
    const clientPk = genClientPk();
    try{
      const res = await fetch(API_BASE+'/api/challenge',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({clientPk})});
      const d = await res.json();
      challengeId=d.challengeId||null; words=d.words||d.rotationWords||[];
      if(!words.length) throw new Error('no words');
      if(d.ct && clientSk && window.MufePQ){ try{ ss=window.MufePQ.ml_kem768.decapsulate(fromB64(d.ct), clientSk); }catch(e){ ss=null; } }
      demo=false; $('mgPqBadge').textContent = ss ? '🔒 양자내성 보호 (ML-KEM-768)' : '';
    }catch(e){ demo=true; challengeId=null; ss=null; words=['사랑','하늘','바다','구름','별빛','노을','바람','이슬']; $('mgPqBadge').textContent=''; }
    startRotate();
  }

  function startRotate(){ caughtWord=null; idx=0; clearInterval(rotTimer);
    rotTimer=setInterval(()=>{ idx=(idx+1)%words.length; $('mgWord').textContent=words[idx]; }, ROT_MS); }

  function doStop(){
    clearInterval(rotTimer); caughtWord=words[idx];
    $('mgCaught').textContent=caughtWord;
    $('mgStep1').style.display='none'; $('mgStep2').style.display='block';
    buildGrid();
  }

  function buildGrid(){
    const grid=$('mgGrid');
    if(grid.childElementCount) { updateSeqUI(); return; }
    for(let i=0;i<IMG_COUNT;i++){
      const cands=imgCands(i);
      const cell=document.createElement('div'); cell.className='mg-cell'; cell.dataset.i=i;
      const img=document.createElement('img'); img.loading='lazy'; img.dataset.ci='0'; img.src=cands[0];
      img.onerror=function(){ let ci=+this.dataset.ci+1; if(ci<cands.length){ this.dataset.ci=ci; this.src=cands[ci]; } else { this.style.opacity=.25; } };
      cell.appendChild(img);
      cell.addEventListener('click', ()=>pickCell(i, cell));
      grid.appendChild(cell);
    }
    updateSeqUI();
  }

  function pickCell(i, cell){
    if(cell.classList.contains('on')) return;       // 같은 칸 중복 방지
    if(seq.length>=IMG_PICK) return;
    seq.push(i); cell.classList.add('on');
    const o=document.createElement('span'); o.className='ord'; o.textContent=seq.length; cell.appendChild(o);
    updateSeqUI();
    if(seq.length===IMG_PICK){
      setTimeout(()=>{ $('mgStep2').style.display='none'; $('mgStep3').style.display='block'; setTimeout(()=>$('mgPass').focus(),200); }, 300);
    }
  }

  function updateSeqUI(){ $('mgSeqLabel').textContent = '선택: '+seq.length+' / '+IMG_PICK; }

  function clearSeq(){
    seq=[];
    $('mgGrid').querySelectorAll('.mg-cell.on').forEach(c=>{ c.classList.remove('on'); const o=c.querySelector('.ord'); if(o)o.remove(); });
    updateSeqUI();
  }

  function doRestart(){ $('mgMsg').textContent=''; $('mgPass').value=''; mgLoad(); }

  async function aesEncrypt(ssBytes, plain){
    const key=await crypto.subtle.importKey('raw', ssBytes, {name:'AES-GCM'}, false, ['encrypt']);
    const iv=crypto.getRandomValues(new Uint8Array(12));
    const full=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv}, key, new TextEncoder().encode(plain)));
    return { iv:toB64(iv), data:toB64(full.slice(0,full.length-16)), tag:toB64(full.slice(full.length-16)) };
  }

  async function doSubmit(){
    const pass=$('mgPass').value.trim();
    if(!pass){ $('mgMsg').textContent='비밀번호를 입력하세요'; return; }
    if(seq.length!==IMG_PICK){ $('mgMsg').textContent='그림을 '+IMG_PICK+'장 선택하세요'; return; }
    if(demo){ $('mgMsg').textContent='미리보기 모드 · 서버를 올리면 실제 검증됩니다'; return; }

    let userToken=null; try{ userToken=localStorage.getItem('fuli_user_token'); }catch(e){}
    if(!userToken){ $('mgMsg').textContent='먼저 비밀번호 등록이 필요합니다 (등록 화면은 다음 단계)'; return; }

    const answer = pass + caughtWord;            // joined-after
    const imageSeq = seq.join('-');              // 예 "3-47-12-88"
    $('mgMsg').textContent='확인 중…';
    try{
      const body = { userToken, challengeId, caughtWord };
      if(ss){ body.encAnswer = await aesEncrypt(ss, JSON.stringify({ answer, imageSeq })); }  // 양자
      else  { body.answer = answer; body.imageSeq = imageSeq; }                                // 평문 폴백
      const r = await fetch(API_BASE+'/api/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const d = await r.json();
      if(d.status==='success'||d.status==='real'){ if(d.token){ try{localStorage.setItem('fuli_session',d.token);}catch(e){} } passOK(); }
      else { $('mgMsg').textContent='맞지 않습니다 · 처음부터 다시'; setTimeout(doRestart, 1300); }
    }catch(e){ $('mgMsg').textContent='연결 오류 · 다시 시도해주세요'; }
  }

  function passOK(){ $('mufeGate').style.display='none'; if(typeof window.onMufeGatePass==='function') window.onMufeGatePass(); }

  $('mgStopBtn').addEventListener('click', doStop);
  $('mgClearBtn').addEventListener('click', clearSeq);
  $('mgEnterBtn').addEventListener('click', doSubmit);
  $('mgRetryBtn').addEventListener('click', doRestart);
  $('mgPass').addEventListener('keydown', e=>{ if(e.key==='Enter') doSubmit(); });

  if(document.readyState!=='loading') mgLoad();
  else document.addEventListener('DOMContentLoaded', mgLoad);
})();
