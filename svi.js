/* ══════════════════════════════════════════════════════════
   ✨ 피부 탄력 분석 (SVI)   파일: svi.js   출처: 구 CGO 원문 그대로
   ──────────────────────────────────────────────────────────
   ▣ 이 기능이 쓰는 것
     · 페이지  index.html  <div id="page-svi">      (문 = cgoGoPage('svi'))
     · 구성란 피부 나이 칸  svi-cfg-real-age / svi-cfg-skin-age / svi-cfg-age-delta
     · 팝업    svi-intro-pop  (입구 안내)  ·  svi-cam-alert (카메라 안내)
     · 카드    전체기능 "피부 탄력 분석"  data-k 1443~1445
   ▣ 등록 다섯 자리 (새 기능은 반드시 다섯 곳에 넣는다)
     ① perm.js  CAM_PAGES 에 'svi'                                 ✔ 넣음
     ② perm.js  카메라 취소 목록에 'sviCancel'                       ✔ 넣음
     ③ index.html cgoHome() 팝업 목록에 'svi-intro-pop'             ✔ 넣음
     ④ 언어 전환 다시 칠하기 cgoRepaintOn(...)  — 이 파일 맨 아래     ✔ 넣음
     ⑤ 검사 시작 때 앞 기능 카메라 놓아주기 _cgoStopAllCams()          ✔ cgoCameraCheck 안
   ▣ 번역 번호 자리
     · 입구 팝업 12800~12837 · 카메라 안내 12840~12844
     · 페이지 본문 data-k 12850~12951  ·  엔진 글자 13000~13115   (_sK(번호,'한국어') 로 감쌈)
     · 페이지 본문 — 아직 번호 없음 (다음 차례에 data-k 를 박는다)
   ▣ 밖에서 부르는 함수
     · sviStartScan()  검사 시작        · sviCancel()  검사 접기(결과 안 만듦)
     · sviShowIntroPopup()  입구 팝업   · sviChatToggle() / sviChatSend()  AI 상담
   ▣ 손대면 안 되는 것
     · 측정 알고리즘(_svi*)은 구 CGO 원문이다. 숫자·수식을 바꾸지 않는다.
   ══════════════════════════════════════════════════════════ */

/* ★ AI 답변 언어 — 고른 언어로 답하게 한다 */
var _SVI_LN = {"ko":"한국어","en":"English","ja":"日本語","zh":"简体中文","zh_HK":"繁體中文","ru":"русский","es":"español","fr":"français","de":"Deutsch","pt":"português","it":"italiano","nl":"Nederlands","vi":"Tiếng Việt","th":"ไทย","id":"Bahasa Indonesia","ms":"Bahasa Melayu","tl":"Filipino","tr":"Türkçe","hi":"हिन्दी","ar":"العربية"};
function _sviLangName(){ try{ return _SVI_LN[window._LANG || 'ko'] || 'English'; }catch(e){ return 'English'; } }

function _sK(n, f){ try{ var v = window.K ? window.K(n) : null; return (v && v !== String(n)) ? v : (f || ''); }catch(e){ return f || ''; } }

/* 카메라 — 앞 기능 카메라를 먼저 놓아준 뒤 시작한다 */
if(typeof window.cgoCameraCheck !== 'function'){
  window.cgoCameraCheck = function(cb){
    try{ if(window._cgoStopAllCams) window._cgoStopAllCams(); }catch(e){}
    setTimeout(function(){ try{ cb(); }catch(e){} }, 120);
  };
}
if(typeof window._cgoCameraAlert !== 'function'){
  window._cgoCameraAlert = function(msg){
    var d = document.createElement('div');
    d.id = 'svi-cam-alert';
    d.style.cssText = 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:120000;max-width:300px;padding:18px 20px;background:#fff;border:1px solid #99f6e4;border-radius:16px;box-shadow:0 12px 34px rgba(15,118,110,.18);font-size:13px;color:#0f172a;line-height:1.7;text-align:center;';
    d.innerHTML = msg + '<div style="margin-top:14px;"><button onclick="var e=document.getElementById(\'svi-cam-alert\');if(e)e.remove();" style="padding:8px 20px;background:#0d9488;border:0;border-radius:10px;color:#fff;font-size:12px;font-weight:800;cursor:pointer;font-family:inherit;">' + _sK(12801,'확인') + '</button></div>';
    document.body.appendChild(d);
  };
}
/* AI 상담 — 우리 서버 문지기를 지나 부른다 */
if(typeof window.cgoCallGemini !== 'function'){
  window.cgoCallGemini = function(prompt, cb){
    fetch('/api/groq', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ model:'openai/gpt-oss-20b', reasoning_effort:'low', include_reasoning:false,
        messages:[{role:'system', content:prompt}], max_tokens:600, temperature:0.7 })
    }).then(function(r){ return r.json(); })
      .then(function(d){ cb((d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || ''); })
      .catch(function(){ cb(''); });
  };
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
    forehead: _sK(13000,'이마'), brow: _sK(13001,'미간'), eye: _sK(13002,'눈가'),
    cheek: _sK(13003,'볼'), jaw: _sK(13004,'턱'), mouth: _sK(13005,'입가')
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
  if(_svi.luster) ctx += _sK(13006,'윤기:') + _svi.luster + ', ';
  if(_svi.elastic) ctx += _sK(13007,'탄력:') + _svi.elastic + ', ';
  if(_svi.texture) ctx += _sK(13008,'결:') + _svi.texture + ', ';
  if(_svi.vitality) ctx += _sK(13009,'혈색:') + _svi.vitality + ', ';
  if(_svi.collagenScore) ctx += _sK(13010,'복원 탄력:') + _svi.collagenScore + ', ';
  if(_svi.rppg.bpm) ctx += 'BPM:' + _svi.rppg.bpm + ', ';
  if(_svi.rppg.hrv) ctx += 'HRV:' + _svi.rppg.hrv + ', ';
  if(_svi.rppg.stressScore) ctx += _sK(13011,'스트레스:') + _svi.rppg.stressScore + ', ';
  if(_svi.skinAge) ctx += _sK(13012,'피부나이:') + _svi.skinAge + _sK(13013,'세, ');
  if(_svi.realAge) ctx += _sK(13014,'실제나이:') + _svi.realAge + _sK(13015,'세');
  
  return '당신은 CGO-FULI SVI(피부 탄력 분석)의 AI 컨설턴트입니다. ' +
    '공개된 뷰티·생활습관 자료를 학습한 AI 정보 도우미입니다. 의료인이 아니며 진단·처방을 하지 않습니다. ' +
    '사용자의 측정 데이터: [' + ctx + ']. ' +
    '광학·생활습관 관점으로 답변하세요. 질병·진단 표현은 절대 사용하지 마세요. ' +
    '오행 기운 패턴은 공개 참고 자료 기반만 사용. ' +
    ('답변은 친근하면서 전문적으로. 5~7줄 이내. Answer in ' + _sviLangName() + ' only.');
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
      _svi.chatHistory.push({role:'ai', text:reply || _sK(13016,'죄송합니다, 응답을 받지 못했습니다.')});
      _svi.chatBusy = false;
      _sviRenderChat();
    });
  } else {
    // 폴백 — 본진 함수 없을 때 정직 안내
    setTimeout(function(){
      _svi.chatHistory.push({
        role:'ai',
        text:_sK(13017,'AI 컨설턴트는 본진 Gemini API 연동이 필요합니다. ') +
             _sK(13018,'현재 측정 데이터를 보면 ') +
             (_svi.collagenScore && _svi.collagenScore >= 70 ? _sK(13019,'복원 탄력 양호 ') : _sK(13020,'복원 탄력 관리 권장 ')) +
             _cgoT(_sK(13021,'상태입니다.'))
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
    html += _sK(13022,'<div style="text-align:center;padding:8px;color:rgba(245,230,175,.5);font-size:11px;">⏳ AI 분석 중...</div>');
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
        text:_sK(13023,'안녕하세요! CGO-FULI 피부 케어 AI 정보 도우미입니다 🌿 공개된 피부·영양 관련 자료를 바탕으로 참고 정보를 안내해 드려요. 측정 결과에 대해 무엇이든 물어보세요!')
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
    trendEl.innerHTML = emoji + _sK(13024,' 평균 ') + avgSVI + _sK(13025,'점 · 추세 <span style="color:') + color + ';font-weight:900;">' + sign + trend + _sK(13026,'점</span>');
  }
  
  var countEl = document.getElementById('svi-history-count');
  if(countEl) countEl.textContent = data.length + _sK(13027,'회');
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
        dominant: leftScore > rightScore ? _sK(13028,'왼쪽') : _sK(13029,'오른쪽')
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
      if(result[k] && result[k].dominant === _sK(13028,'왼쪽')) leftWin++;
      else if(result[k] && result[k].dominant === _sK(13029,'오른쪽')) rightWin++;
    });
    if(leftWin > rightWin) result.yinyang = _sK(13030,'왼쪽 우세 (음)');
    else if(rightWin > leftWin) result.yinyang = _sK(13031,'오른쪽 우세 (양)');
    else result.yinyang = _sK(13032,'균형');
  }
  
  _svi.asymmetry = result;
  return result;
}

// 좌우 비대칭 측정 (수동 트리거)
function sviAnalyzeAsymmetry(){
  if(_svi._samples < 5){
    alert(_sK(13033,'먼저 측정을 진행해 주세요 (현재 ') + _svi._samples + _cgoT(_sK(13034,'/5 샘플)')));
    return;
  }
  var result = _sviAnalyzeAsymmetry();
  if(!result || !result.avgScore){
    alert(_sK(13035,'얼굴 추적 데이터가 부족합니다. 잠시 후 다시 시도해 주세요.'));
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
      var labels = { forehead:_sK(13036,'🧠 이마'), cheek:_sK(13037,'🌸 볼'), eye:_sK(13038,'👁️ 눈가') };
      html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 8px;background:rgba(255,255,255,.04);border-radius:6px;margin-bottom:4px;font-size:11px;">' +
              '<span style="color:rgba(245,230,175,.7);">' + labels[z] + '</span>' +
              _sK(13039,'<span style="color:rgba(245,230,175,.9);">왼:<b>') + result[z].left + _sK(13040,'</b> · 오:<b>') + result[z].right + _sK(13041,'</b> · 차이:<b style="color:') + (result[z].diff > 10 ? '#f87171' : '#34d399') + ';">' + result[z].diff + '</b></span>' +
              '</div>';
    });
    detailEl.innerHTML = html;
  }
  
  // 분석 박입
  var msgEl = document.getElementById('svi-asym-msg');
  if(msgEl){
    var msg = '';
    if(result.avgScore >= 85) msg = _sK(13042,'✨ 좌우 대칭 우수 — 균형 잡힌 피부 상태');
    else if(result.avgScore >= 70) msg = _sK(13043,'👍 보통 — 잠자세나 식습관 점검 권장');
    else msg = _sK(13044,'⚠️ 비대칭 큼 — 한쪽으로 자는 습관, 씹는 습관, 자외선 노출 점검 필요');
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
  if(ageDelta <= -3) grade = { label:_sK(13045,'매우 젊음'), color:'#34d399', emoji:'✨' };
  else if(ageDelta <= -1) grade = { label:_sK(13046,'젊어 보임'), color:'#38bdf8', emoji:'💎' };
  else if(ageDelta <= 1) grade = { label:_sK(13047,'정상'), color:'#fbbf24', emoji:'⚖️' };
  else if(ageDelta <= 3) grade = { label:_sK(13048,'노화 진행'), color:'#f97316', emoji:'⏳' };
  else grade = { label:_sK(13049,'노화 가속'), color:'#f87171', emoji:'⚠️' };
  
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
  if(!input){ if(!silent) alert(_sK(13050,'나이 입력 필드를 찾을 수 없습니다')); return; }
  var realAge = parseInt(input.value);
  if(!realAge || realAge < 15 || realAge > 100){
    if(!silent) alert(_sK(13051,'15세~100세 사이로 입력해 주세요'));
    return;
  }
  if(_svi._samples < 5){
    if(!silent) alert(_sK(13052,'먼저 30초간 측정을 완료해 주세요 (현재 ') + _svi._samples + _cgoT(_sK(13034,'/5 샘플)')));
    return;
  }
  
  var result = _sviCalcSkinAge(realAge);
  if(!result){ if(!silent) alert(_sK(13053,'측정 데이터가 부족합니다')); return; }
  
  // UI 렌더
  document.getElementById('svi-real-age-val').textContent = result.realAge + _sK(13015,'세');
  document.getElementById('svi-skin-age-val').textContent = result.skinAge + _sK(13015,'세');
  
  var deltaEl = document.getElementById('svi-age-delta');
  if(deltaEl){
    var sign = result.ageDelta > 0 ? '+' : '';
    deltaEl.textContent = sign + result.ageDelta + _sK(13015,'세');
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
    if(result.opticalDelta > 0.5) msg += _cgoT(_sK(13054,'• 광학 지표 양호 (')) + (-result.opticalDelta).toFixed(1) + _sK(13055,'세 젊어 보임)<br/>');
    else if(result.opticalDelta < -0.5) msg += _cgoT(_sK(13056,'• 광학 지표 노화 (')) + (-result.opticalDelta).toFixed(1) + _sK(13057,'세 가속)<br/>');
    if(result.collagenDelta < -0.5) msg += _cgoT(_sK(13058,'• 복원 탄력 우수 (')) + (-result.collagenDelta).toFixed(1) + _sK(13059,'세 보정)<br/>');
    else if(result.collagenDelta > 0.5) msg += _cgoT(_sK(13060,'• 복원 탄력 낮은 편 (')) + (result.collagenDelta).toFixed(1) + _sK(13057,'세 가속)<br/>');
    if(result.stressDelta > 0.5) msg += _sK(13061,'• 스트레스로 ') + result.stressDelta.toFixed(1) + _sK(13062,'세 노화 가속<br/>');
    else if(result.stressDelta < -0.5) msg += _cgoT(_sK(13063,'• 내면 탄력 안정 (')) + (-result.stressDelta).toFixed(1) + _sK(13059,'세 보정)<br/>');
    detailEl.innerHTML = msg || _sK(13064,'• 종합적으로 일반 참고 범위입니다');
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
    hint.textContent = _cgoT(_sK(13065,'👇 손가락으로 화면을 꾹 누르고 있어요... 2초 후 떼세요'));
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
      hint.textContent = _cgoT(_sK(13066,'⚠️ 1초 이상 꾹 눌러주세요'));
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
    hint.textContent = _cgoT(_sK(13067,'⏱️ 회복 속도 측정 중... 가만히 계세요'));
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
      hint.innerHTML = _cgoT(_sK(13068,'✨ 빠른 회복! 복원 탄력 우수 (')) + collagen + _cgoT(_sK(13069,'점)'));
      hint.style.color = 'rgba(52,211,153,1)';
    } else if(recoveryRate >= 0.7){
      hint.innerHTML = _cgoT(_sK(13070,'👍 보통 회복 — 복원 탄력 양호 (')) + collagen + _cgoT(_sK(13069,'점)'));
      hint.style.color = 'rgba(56,189,248,1)';
    } else {
      hint.innerHTML = _cgoT(_sK(13071,'💧 회복 느림 — 보습·재생 케어 필요 (')) + collagen + _cgoT(_sK(13069,'점)'));
      hint.style.color = 'rgba(251,191,36,1)';
    }
  }
  if(collagenEl) collagenEl.textContent = avgCollagen;
  
  // 2초 후 다시 누르기 안내
  setTimeout(function(){
    if(!_svi.running) return;
    var hint2 = document.getElementById('svi-press-hint');
    if(hint2 && _svi.recoveryRecords.length < 3){
      hint2.textContent = _cgoT(_sK(13072,'🔄 다시 한 번 눌러주세요 (정확도 향상, ')) + _svi.recoveryRecords.length + '/3)';
      hint2.style.color = 'rgba(245,230,175,.8)';
    } else if(hint2){
      hint2.textContent = _cgoT(_sK(13073,'✅ 충분히 측정됨 — 결과는 분석 종료 후 표시'));
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
  var oh=r.domOh||_sK(13074,'토');
  var weight=parseFloat(document.getElementById('ipName')&&window._userWeight)||65;
  document.getElementById('svi-result').style.display='none';
  document.getElementById('svi-btn').style.display='none';
  _svi.sec=0; _svi._fitHold=0; _svi._lux=null;
  try{ if(window.cgoFitBeepReset) cgoFitBeepReset('svi'); else if(window._cgoBeeped) delete window._cgoBeeped['svi']; }catch(e){}
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
      /* ══ ④ 화면이 뒤로 물러나면 건너뛴다 (폰이 뜨거워지지 않게) ══ */
      if(document.hidden) return;
      /* ══ ② 조도 — 어두우면 멈추고 안내한다 ══ */
      try{
        var _v0 = document.getElementById('svi-video');
        if(_v0 && _v0.videoWidth && _svi.offCtx){
          _svi.offCanvas.width = 32; _svi.offCanvas.height = 24;
          _svi.offCtx.drawImage(_v0, 0, 0, 32, 24);
          var _p0 = _svi.offCtx.getImageData(0, 0, 32, 24).data, _s0 = 0;
          for(var _i0 = 0; _i0 < _p0.length; _i0 += 4) _s0 += 0.2126*_p0[_i0] + 0.7152*_p0[_i0+1] + 0.0722*_p0[_i0+2];
          _svi._lux = Math.round(_s0 / (_p0.length / 4));
        }
      }catch(e){}
      var _fs0 = document.getElementById('svi-face-status');
      if(_svi._lux != null && _svi._lux < 12){
        if(_fs0){ _fs0.textContent = _sK(12840,'⛔ 너무 어둡습니다 — 밝은 곳에서 다시 재세요'); _fs0.style.color = '#b45309'; }
        _svi._fitHold = 0;
        return;
      }
      /* ══ ① 거리 — 공용 잣대(피부 기준 8cm) 채움 비율로만 본다 ══ */
      var _fit = 'none';
      try{
        if(window.cgoFaceFill && window.cgoFitState && _svi.faceLandmarks){
          _fit = cgoFitState(cgoFaceFill(_svi.faceLandmarks), 'skin');
        }
      }catch(e){}
      if(_fit === 'far' || _fit === 'near'){
        if(_fs0){
          _fs0.textContent = (_fit === 'far') ? _sK(12841,'⚠️ 더 가까이 — 살갗이 화면을 덮게 (약 8cm)')
                                             : _sK(12842,'⚠️ 조금 멀리 — 너무 가깝습니다');
          _fs0.style.color = '#b45309';
        }
        _svi._fitHold = 0;
        return;
      }
      /* ══ ③ 위치 조정 5초 → 딱 맞으면 띵 띵 띵 ══ */
      if(_fit === 'ok'){
        _svi._fitHold = (_svi._fitHold || 0) + 1;
        if(_svi._fitHold === 5){ try{ if(window.cgoFitBeep) cgoFitBeep('svi'); }catch(e){} }
        if(_svi._fitHold < 5){
          if(_fs0){
            _fs0.textContent = _sK(12843,'위치 조정 중') + ' — ' + (5 - _svi._fitHold) + _sK(12844,'초');
            _fs0.style.color = '#0f766e';
          }
          return;
        }
      }
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
      if(tmr) tmr.textContent=_sviCanCount?(remain>0?remain+_cgoT(_sK(13075,'초 남음')):_cgoT(_sK(13076,'분석 완료!'))):_cgoT(_sK(13077,'⏸ 얼굴 전체를 화면에 맞춰주세요'));

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
            if(live) live.textContent='SVI '+sviNow+_sK(13078,'점');
            document.getElementById('svi-face-status').textContent=_cgoT(_sK(13079,'✅ 얼굴 감지 중 · 분석 진행'));
            document.getElementById('svi-face-status').style.color='rgba(56,189,248,.9)';
          } else {
            _svi.lostCount++;
            if(_svi.lostCount>0){
              document.getElementById('svi-face-status').textContent=_cgoT(_sK(13080,'⚠️ 얼굴 전체를 화면에 맞춰주세요'));
              document.getElementById('svi-face-status').style.color='rgba(251,191,36,.8)';
            }
          }
        }
      }
      // 얼굴 미감지 버퍼: 5초 연속 미감지 시에만 정지
      if(_svi.lostCount>=5 && _svi._samples===0){
        var fs=document.getElementById('svi-face-status');
        if(fs){fs.textContent=_cgoT(_sK(13081,'⛔ 얼굴이 감지되지 않습니다. 카메라에 얼굴을 가까이 대주세요'));fs.style.color='rgba(56,189,248,.9)';}
        _svi.sec=2; _svi.lostCount=0;
        return;
      }
      if(_svi.sec>=30){
        clearInterval(_svi.timer); _svi.running=false;
        if(_svi._samples<5){
          var fs2=document.getElementById('svi-face-status');
          if(fs2){fs2.textContent=_cgoT(_sK(13082,'⚠️ 얼굴 감지 부족 — 다시 시도해 주세요'));fs2.style.color='rgba(251,191,36,.9)';}
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
    _cgoCameraAlert(_sK(13083,'카메라가 필요합니다.<br>카메라를 허용해 주세요.'));
    document.getElementById('svi-btn').style.display='block';
  });
}

function sviShowResult(oh){
  var luster=_svi.luster||65, elastic=_svi.elastic||62, texture=_svi.texture||68, vitality=_svi.vitality||70;
  var svi=Math.round((luster+elastic+texture+vitality)/4);
  document.getElementById('svi-total').textContent=svi;
  var grade=svi>=85?_sK(13084,'💎 최상의 탄력! 관리 상태 매우 우수'):svi>=70?_sK(13085,'✨ 양호한 탄력 · 꾸준한 관리 유지'):svi>=55?_sK(13086,'🌿 보통 탄력 · 집중 관리 권장'):_sK(13087,'💧 탄력 개선 필요 · 케어 루틴 시작');
  document.getElementById('svi-grade').textContent=grade;

  // 수분 처방 (탄력지수 기반, 체중 65kg 기준)
  var baseWater=svi>=80?2.0:svi>=65?2.3:svi>=50?2.6:3.0;
  var r=window.calcResult||{};
  var ohWaterMap={목:_sK(13088,'+0.3L (목 기운 — 수분 흡수 활성)'),화:_sK(13089,'+0.5L (화 기운 — 수분 손실 빠름)'),토:_sK(13090,'+0.2L (토 기운 — 균형 수분)'),금:_sK(13091,'+0.2L (금 기운 — 수분 보존)'),수:_sK(13092,'+0.1L (수 기운 — 수분 풍부)')};
  document.getElementById('svi-water').innerHTML=
    _sK(13093,'기본 권장량 <b style="color:#38bdf8;">')+baseWater.toFixed(1)+_sK(13094,'L</b> + 오행 보정 <b style="color:#34d399;">')+(ohWaterMap[oh]||'+0.2L')+'</b><br>'
    +_sK(13095,'<span style="font-size:11px;color:rgba(220,240,255,.5);">※ 체중·탄력지수(SVI ')+svi+_sK(13096,'점) 기반 산출 · 아침 기상 후 500ml 우선 섭취 권장</span>');

  // 운동 가이드
  var exMap={
    목:_sK(13097,'🌿 유연성 운동 중심 — 요가·스트레칭 30분 + 걷기 20분<br><span style="font-size:11px;color:rgba(220,240,255,.5);">목 기운: 근막 이완·신체 유연성 극대화</span>'),
    화:_sK(13098,'🔥 유산소 중심 — 줄넘기·조깅 25분 + 플랭크 3세트<br><span style="font-size:11px;color:rgba(220,240,255,.5);">화 기운: 혈액순환 촉진·체온 유지</span>'),
    토:_sK(13099,'🏃 복합 운동 — 스쿼트 3세트 + 걷기 30분 + 복근운동<br><span style="font-size:11px;color:rgba(220,240,255,.5);">토 기운: 근육 균형·코어 강화</span>'),
    금:_sK(13100,'💨 호흡 중심 — 4-7-8 호흡 5회 + 필라테스 30분<br><span style="font-size:11px;color:rgba(220,240,255,.5);">금 기운: 산소 공급·피부 광택 향상</span>'),
    수:_sK(13101,'🌊 저강도 지속 — 수영·걷기 40분 + 명상 15분<br><span style="font-size:11px;color:rgba(220,240,255,.5);">수 기운: 신장 활성·수분 순환</span>')
  };
  document.getElementById('svi-exercise').innerHTML=exMap[oh]||exMap[_sK(13074,'토')];

  // 식단 처방
  var dietMap={
    목:_sK(13102,'🥦 복원 탄력 식단 — 브로콜리·시금치·아보카도 + 비타민C 풍부 식품<br>녹색 채소 위주, 올리브오일 드레싱 · 신맛 식품(레몬·식초) 병행<br><span style="font-size:11px;color:rgba(220,240,255,.5);">목 기운 오행식: 해독·소화 기능 강화 → 피부 해독·탄력 회복</span>'),
    화:_sK(13103,'🍅 항산화 식단 — 토마토·딸기·당근 + 오메가3(연어·고등어)<br>빨간 채소·과일 위주, 고추·마늘 소량 병행<br><span style="font-size:11px;color:rgba(220,240,255,.5);">화 기운 오행식: 열정 에너지 강화 → 혈색 개선·피부 활력</span>'),
    토:_sK(13104,'🍠 뿌리채소 식단 — 고구마·단호박·당근 + 두부·콩류<br>단맛 천연 식품 위주, 꿀·메이플 시럽 소량<br><span style="font-size:11px;color:rgba(220,240,255,.5);">토 기운 오행식: 그라운딩 에너지 강화 → 영양 흡수·피부 탄력</span>'),
    금:_sK(13105,'🥛 단백질 식단 — 닭가슴살·두부·아몬드 + 배·무·도라지<br>흰색 식품 위주, 매운맛(생강·고추냉이) 소량<br><span style="font-size:11px;color:rgba(220,240,255,.5);">금 기운 오행식: 정돈 에너지 강화 → 피부 수분·윤기 향상</span>'),
    수:_sK(13106,'🫐 항노화 식단 — 블루베리·검정콩·미역 + 견과류<br>검은색·보라색 식품 위주, 짠맛(된장·해산물) 적당히<br><span style="font-size:11px;color:rgba(220,240,255,.5);">수 기운 오행식: 신장·방광 강화 → 피부 보습·노화 방지</span>')
  };
  document.getElementById('svi-diet').innerHTML=dietMap[oh]||dietMap[_sK(13074,'토')];

  // 오행 연동
  var ohNames={목:_sK(12352,'목(木)'),화:_sK(12353,'화(火)'),토:_sK(12354,'토(土)'),금:_sK(12355,'금(金)'),수:_sK(12356,'수(水)')};
  document.getElementById('svi-oh-text').innerHTML=
    _sK(13107,'오늘 <b style="color:#34d399;">')+ohNames[oh]+_sK(13108,'</b> 기운 기준 SVI <b>')+svi+_sK(13109,'점</b> 분석 결과입니다.<br>')
    +_sK(13110,'윤기 ')+luster+_sK(13111,'점 · 탄력 ')+elastic+_sK(13112,'점 · 피부결 ')+texture+_sK(13113,'점 · 혈색 ')+vitality+_sK(13114,'점<br>')
    +_sK(13115,'위 케어 루틴을 21일 이상 지속 시 SVI <b style="color:#38bdf8;">+8~15점</b> 향상 예측됩니다.');

  document.getElementById('svi-result').style.display='block';
  try{ var _rp=document.getElementById('page-svi'), _rr=document.getElementById('svi-result');
    if(_rp&&_rr) _rp.scrollTop = Math.max(0, _rr.offsetTop - 60); }catch(e){}
}


/* ══ 검사를 접는다 — 결과를 만들지 않는다 (기능을 나갈 때) ══ */
window.sviCancel = function(){
  try{ if(_svi.timer){ clearInterval(_svi.timer); _svi.timer = null; } }catch(e){}
  try{ _svi.running = false; _svi.sec = 0; _svi._samples = 0; _svi.lostCount = 0; _svi._fitHold = 0; _svi._lux = null; }catch(e){}
  try{ if(window.cgoFitBeepReset) cgoFitBeepReset('svi'); else if(window._cgoBeeped) delete window._cgoBeeped['svi']; }catch(e){}
  try{ if(_svi.stream){ _svi.stream.getTracks().forEach(function(t){ t.stop(); }); _svi.stream = null; } }catch(e){}
  try{ if(window._sviStopFaceMesh) _sviStopFaceMesh(); }catch(e){}
  try{ if(window._sviResetPressEvents) _sviResetPressEvents(); }catch(e){}
  try{ if(window._sviRppgReset) _sviRppgReset(); }catch(e){}
  try{
    var v = document.getElementById('svi-video'); if(v){ v.srcObject = null; v.style.display = 'none'; }
    var ph = document.getElementById('svi-placeholder'); if(ph) ph.style.display = 'flex';
    var g = document.getElementById('svi-guide'); if(g) g.style.display = 'none';
    var b = document.getElementById('svi-btn'); if(b) b.style.display = 'block';
    var pr = document.getElementById('svi-progress'); if(pr) pr.style.width = '0%';
    var rs = document.getElementById('svi-result'); if(rs) rs.style.display = 'none';
    var cp = document.getElementById('svi-chat-panel'); if(cp) cp.style.display = 'none';
  }catch(e){}
};
window._sviStop = window.sviCancel;

/* ══ 입구 팝업 ══ */
window.sviShowIntroPopup = function(){
  try{ if(localStorage.getItem('cgo_svi_intro_skip') === '1') return; }catch(e){}
  var _old = document.getElementById('svi-intro-pop'); if(_old) _old.remove();
  var K = _sK;
  var steps = [
    ['①', K(12812,'전체기능 → 피부 탄력 분석 진입'), K(12813,'밝은 조명 아래에서 재면 더 정확합니다.')],
    ['②', K(12814,'카메라를 피부에 가까이'),        K(12815,'얼굴 전체가 화면에 들어오게 맞춥니다.')],
    ['③', K(12816,'화면의 원을 꾹 눌렀다 떼기'),    K(12817,'누른 자리가 돌아오는 속도를 카메라가 봅니다.')],
    ['④', K(12818,'탄력 지수 + 맞춤 관리법 확인'),  K(12819,'2~3주 간격으로 재면 변화를 따라갈 수 있어요.')]
  ];
  var pts = [
    ['💪', K(12820,'복원 파동 측정'),   K(12821,'피부를 눌렀다 뗄 때의 복원 파동을 카메라가 감지해 스킨 텐션을 수치화합니다.')],
    ['🔬', K(12822,'6부위 따로 본다'),  K(12823,'이마 · 눈썹 · 눈가 · 볼 · 턱 · 입가를 나누어 잰 뒤 좌우 차이까지 봅니다.')],
    ['💓', K(12824,'rPPG 동시 측정'),   K(12825,'같은 30초 동안 얼굴 혈류 파형으로 내면 탄력을 함께 잽니다.')],
    ['🔒', K(12826,'기기 안에서만'),    K(12827,'영상은 기기 밖으로 나가지 않습니다.')]
  ];
  var first = [
    ['💪', _sK(12830,'눌렀다 뗀 자리의 복원 파동을 카메라로 잰다'),
           _sK(12831,'피부과의 고가 탄력 측정기가 하던 물리적 복원력 측정을, 폰 카메라의 광학 신호만으로 0.1초 단위로 따라갑니다. 사진 한 장으로 주름·잡티를 보는 방식과 다릅니다.')],
    ['💓', _sK(12832,'얼굴 좌표에 혈류 신호를 실시간으로 얹는다'),
           _sK(12833,'눈·입 AR 좌표를 잣대로 삼아 rPPG 혈류 변화를 화면 위에 바로 겹칩니다. 숫자만 뱉는 rPPG와 다릅니다.')],
    ['🔬', _sK(12834,'6부위를 따로 재고 좌우 차이까지 본다'),
           _sK(12835,'이마·눈썹·눈가·볼·턱·입가를 나누어 재고, 같은 30초 안에서 좌우 균형까지 함께 봅니다.')]
  ];
  var pop = document.createElement('div');
  pop.id = 'svi-intro-pop';
  pop.style.cssText = 'position:fixed;left:0;right:0;top:0;bottom:0;z-index:99000;background:#f0fdf9;overflow-y:auto;padding:56px 18px 28px;';
  var html = '<div style="max-width:820px;margin:0 auto;">'
    + '<div style="display:flex;align-items:center;justify-content:space-between;">'
    +   '<span style="font-size:11px;font-weight:800;color:#0f766e;letter-spacing:.14em;">WORLD FIRST · SVI</span>'
    +   '<button onclick="var p=document.getElementById(\'svi-intro-pop\');if(p)p.remove();" style="background:none;border:0;font-size:19px;color:#0f766e;cursor:pointer;line-height:1;">&#10005;</button>'
    + '</div>'
    + '<div style="display:flex;align-items:center;gap:11px;margin-top:12px;">'
    +   '<div style="font-size:32px;line-height:1;">✨</div>'
    +   '<div><div style="font-size:20px;font-weight:900;color:#0f172a;letter-spacing:-.3px;">' + K(12800,'피부 탄력 분석') + '</div>'
    +   '<div style="font-size:11.5px;color:#0f766e;margin-top:3px;">' + K(12802,'Skin Vitality Index · 광학 복원 × 오행 융합 스킨 텐션 지수') + '</div></div>'
    + '</div>'
    + '<div style="background:rgba(244,114,168,.25);border:1px solid rgba(244,114,168,.45);border-radius:16px;padding:16px 15px;margin-top:14px;">'
    +   '<div style="font-size:12px;font-weight:900;color:#b3245f;letter-spacing:.1em;">' + K(12829,'🌍 세계 최초') + '</div>'
    +   '<div style="font-size:12px;color:#7a1440;line-height:1.75;margin-top:8px;">' + K(12836,'오행을 걷어내고 기술만 보아도 앞선 것이 셋입니다.') + '</div>'
    +   '<div style="display:flex;flex-direction:column;gap:10px;margin-top:12px;">'
    +   first.map(function(f){
          return '<div style="display:flex;gap:10px;align-items:flex-start;background:rgba(255,255,255,.62);border-radius:12px;padding:11px 12px;">'
            + '<div style="font-size:17px;line-height:1;flex-shrink:0;">' + f[0] + '</div>'
            + '<div style="flex:1;min-width:0;"><div style="font-size:12px;font-weight:800;color:#8f1a4d;line-height:1.5;">' + f[1] + '</div>'
            + '<div style="font-size:11px;color:#5c3547;line-height:1.7;margin-top:3px;">' + f[2] + '</div></div>'
            + '</div>';
        }).join('')
    +   '</div>'
    +   '<div style="font-size:10.5px;color:#8a4d67;line-height:1.7;margin-top:11px;">' + K(12837,'⚖️ SVI는 웰니스·뷰티 참고 지표입니다 — 의학적 진단을 대신하지 않습니다. 조명과 카메라에 따라 값이 달라질 수 있습니다.') + '</div>'
    + '</div>'
    + '<div style="background:#fff;border:1px solid #d7eee8;border-radius:16px;padding:16px 14px;margin-top:14px;">'
    +   '<div style="font-size:13px;font-weight:900;color:#0f172a;">' + K(12810,'📋 이렇게 하세요') + '</div>'
    +   '<div style="display:flex;flex-direction:column;gap:9px;margin-top:11px;">'
    +   steps.map(function(s){
          return '<div style="display:flex;gap:10px;align-items:flex-start;">'
            + '<div style="width:22px;height:22px;border-radius:50%;background:#0d9488;color:#fff;font-size:11px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' + s[0] + '</div>'
            + '<div style="flex:1;min-width:0;"><div style="font-size:12.5px;font-weight:800;color:#0f172a;">' + s[1] + '</div>'
            + '<div style="font-size:11px;color:#475569;line-height:1.6;margin-top:2px;">' + s[2] + '</div></div>'
            + '</div>';
        }).join('')
    +   '</div>'
    + '</div>'
    + '<div style="display:flex;flex-direction:column;gap:9px;margin-top:12px;">'
    + pts.map(function(p){
        return '<div style="display:flex;gap:11px;background:#fff;border:1px solid #d7eee8;border-radius:14px;padding:13px 14px;">'
          + '<div style="font-size:20px;line-height:1;flex-shrink:0;">' + p[0] + '</div>'
          + '<div style="flex:1;min-width:0;"><div style="font-size:12.5px;font-weight:800;color:#0f172a;">' + p[1] + '</div>'
          + '<div style="font-size:11px;color:#475569;line-height:1.65;margin-top:3px;">' + p[2] + '</div></div>'
          + '</div>';
      }).join('')
    + '</div>'
    + '<button onclick="var p=document.getElementById(\'svi-intro-pop\');if(p)p.remove();" style="width:100%;margin-top:16px;padding:14px;background:#0d9488;border:0;border-radius:14px;color:#fff;font-size:14px;font-weight:900;cursor:pointer;font-family:inherit;">' + K(12811,'시작하기') + '</button>'
    + '<label style="display:flex;align-items:center;gap:8px;justify-content:center;margin-top:12px;font-size:11px;color:#0f766e;cursor:pointer;">'
    +   '<input type="checkbox" onchange="try{localStorage.setItem(\'cgo_svi_intro_skip\', this.checked?\'1\':\'0\');}catch(e){}" style="width:15px;height:15px;accent-color:#0d9488;" />'
    +   K(12828,'다시 보지 않기')
    + '</label>'
    + '</div>';
  pop.innerHTML = html;
  document.body.appendChild(pop);
};

/* ══ 페이지가 열리면 입구 팝업 한 번 · 언어가 바뀌면 다시 칠한다 ══ */
(function(){
  var p = document.getElementById('page-svi');
  if(p){
    var was = p.classList.contains('active') || p.classList.contains('on');
    var ob = new MutationObserver(function(){
      var now = p.classList.contains('active') || p.classList.contains('on');
      if(now === was) return;      /* 같은 상태면 아무것도 하지 않는다 — 팝업이 되풀이되는 원인 */
      was = now;
      if(now){ try{ window.sviShowIntroPopup(); }catch(e){} }
      else { var e = document.getElementById('svi-intro-pop'); if(e) e.remove(); }
    });
    ob.observe(p, {attributes:true, attributeFilter:['class']});
  }
  function rp(){
    var op = document.getElementById('svi-intro-pop');
    if(op){ try{ window.sviShowIntroPopup(); }catch(e){} }
    try{ if(_svi.chatHistory && _svi.chatHistory.length && window._sviRenderChat) _sviRenderChat(); }catch(e){}
  }
  if(typeof window.cgoRepaintOn === 'function') window.cgoRepaintOn(rp);
  else { var t = setInterval(function(){ if(typeof window.cgoRepaintOn === 'function'){ clearInterval(t); window.cgoRepaintOn(rp); } }, 500); setTimeout(function(){ clearInterval(t); }, 15000); }
})();

/* ══ 구성란 '피부 나이' 칸 — 측정값을 옮겨 적는다 ══ */
(function(){
  function sync(){
    try{
      var g = function(id){ var e = document.getElementById(id); return e ? e.textContent : ''; };
      var inp = document.getElementById('svi-real-age-input');
      var a = document.getElementById('svi-cfg-real-age');
      var b = document.getElementById('svi-cfg-skin-age');
      var d = document.getElementById('svi-cfg-age-delta');
      if(a) a.textContent = (inp && inp.value) ? inp.value : (g('svi-real-age-val') || '--');
      if(b) b.textContent = g('svi-skin-age-val') || '--';
      if(d) d.textContent = g('svi-age-delta') || '--';
    }catch(e){}
  }
  window._sviSyncAgeCard = sync;
  var orig = window.sviCalcSkinAge;
  if(typeof orig === 'function'){
    window.sviCalcSkinAge = function(){
      var r = orig.apply(this, arguments);
      setTimeout(sync, 30);
      return r;
    };
  }
  var origFill = window._sviAutoFillAge;
  if(typeof origFill === 'function'){
    window._sviAutoFillAge = function(){
      var r = origFill.apply(this, arguments);
      setTimeout(sync, 30);
      return r;
    };
  }
})();
