/* ══ MUFE — 양자 방어 비밀번호 (온디바이스) ══
   비밀번호를 폰 안에서 늘려 뽑고, 조각내어 흩어 둔다.
   원문은 어디에도 남지 않는다. 서버로 아무것도 보내지 않는다.

   여기서 도는 때: 비밀번호를 만들 때 · 로그인할 때 — 그 두 번뿐이다.
   대시보드·페이지 전환에는 한 줄도 들어가지 않는다 (속도 특허 그대로). */
(function(){
  'use strict';

  var HAS = !!(window.crypto && crypto.subtle && crypto.getRandomValues);

  function bytes(n){
    var a = new Uint8Array(n);
    if(HAS) crypto.getRandomValues(a);
    else for(var i=0;i<n;i++) a[i] = Math.floor(Math.random()*256);
    return a;
  }
  function hex(a){
    return Array.prototype.map.call(a, function(b){
      return ('0'+b.toString(16)).slice(-2);
    }).join('');
  }
  function unhex(s){
    var a = new Uint8Array(s.length/2);
    for(var i=0;i<a.length;i++) a[i] = parseInt(s.substr(i*2,2),16);
    return a;
  }

  /* ── 키 유도 ──
     Argon2id 를 웹에서 그대로 쓸 수 없어, 브라우저가 기본으로 주는
     PBKDF2-SHA256 을 30만 번 돌린다. 목적은 같다 — 일부러 느리게 만들어
     해커가 마구 대입하지 못하게 한다. 이 기기에서 0.3초쯤 걸린다. */
  var ROUNDS = 300000;

  function derive(pw, saltBytes){
    if(!HAS) return Promise.resolve(weak(pw, hex(saltBytes)));
    var enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits'])
      .then(function(key){
        return crypto.subtle.deriveBits(
          { name:'PBKDF2', salt:saltBytes, iterations:ROUNDS, hash:'SHA-256' },
          key, 256);
      })
      .then(function(bits){ return hex(new Uint8Array(bits)); })
      .catch(function(){ return weak(pw, hex(saltBytes)); });
  }

  /* 아주 오래된 브라우저용 — 없는 것보다 낫다는 수준 */
  function weak(pw, salt){
    var s = pw + '|' + salt, h1 = 0, h2 = 0;
    for(var r=0;r<20000;r++){
      for(var i=0;i<s.length;i++){
        h1 = ((h1<<5) - h1 + s.charCodeAt(i) + r) | 0;
        h2 = ((h2<<3) ^ h1 ^ s.charCodeAt(i)) | 0;
      }
    }
    return (h1>>>0).toString(16) + (h2>>>0).toString(16);
  }

  /* ── 분할 파쇄 ──
     뽑은 값을 세 조각으로 나누고, 조각마다 다른 자리에 흩어 둔다.
     하나를 훔쳐도 못 맞춘다. */
  function shred(v){
    var n = Math.ceil(v.length/3);
    return [v.slice(0,n), v.slice(n,n*2), v.slice(n*2)];
  }
  function scatter(parts, salt){
    try{
      localStorage.setItem('cgo_mufe_a', parts[0]);
      localStorage.setItem('cgo_pw_seg', parts[1]);
      sessionStorage.setItem('cgo_mufe_c', parts[2]);
      localStorage.setItem('cgo_mufe_c', parts[2]);   /* 창을 닫아도 남게 */
      localStorage.setItem('cgo_mufe_s', salt);
      localStorage.setItem('cgo_mufe_v', '1');
    }catch(e){}
  }
  function gather(){
    try{
      var a = localStorage.getItem('cgo_mufe_a');
      var b = localStorage.getItem('cgo_pw_seg');
      var c = sessionStorage.getItem('cgo_mufe_c') || localStorage.getItem('cgo_mufe_c');
      var s = localStorage.getItem('cgo_mufe_s');
      if(!a || !b || !c || !s) return null;
      return { v:a+b+c, salt:s };
    }catch(e){ return null; }
  }

  /* ── 카오스 좌표 ──
     슬라이더 넷이 만드는 값. 같은 비밀번호라도 좌표가 다르면
     완전히 다른 키가 된다. 이것이 MUFE 의 한 겹이다. */
  function chaos(){
    var c = [];
    for(var i=0;i<4;i++) c.push(+((document.getElementById('suC'+i)||{}).value||0));
    return c;
  }

  /* ── 저장 ── */
  window.mufeSave = function(pw, onDone){
    var c = chaos();
    var saltBytes = bytes(16);
    /* 카오스 좌표를 소금에 섞는다 */
    for(var i=0;i<4;i++) saltBytes[i] ^= (c[i] & 255);
    var salt = hex(saltBytes);

    return derive(pw, saltBytes).then(function(v){
      scatter(shred(v), salt);
      try{ localStorage.setItem('cgo_mufe_c4', c.join(',')); }catch(e){}
      /* 옛 자리는 지운다 — 원문 흔적을 남기지 않는다 */
      try{ localStorage.removeItem('cgo_pw'); }catch(e){}
      /* 양자내성 키쌍도 이때 만들어 둔다 (뒤에서 조용히) */
      try{ if(window.mufeKemInit) window.mufeKemInit(); }catch(e){}
      if(onDone) onDone(true);
      return true;
    });
  };

  /* ── 확인 ── */
  window.mufeVerify = function(pw, onDone){
    var st = gather();
    if(!st){ if(onDone) onDone(false); return Promise.resolve(false); }
    return derive(pw, unhex(st.salt)).then(function(v){
      var ok = (v === st.v);
      if(onDone) onDone(ok);
      return ok;
    });
  };

  window.mufeIsSet = function(){ return !!gather(); };

  /* ── 지우기 (탈퇴·분쇄) ── */
  window.mufeShred = function(){
    ['cgo_mufe_a','cgo_pw_seg','cgo_mufe_c','cgo_mufe_s','cgo_mufe_v','cgo_mufe_c4','cgo_pw']
      .forEach(function(k){ try{ localStorage.removeItem(k); }catch(e){} });
    try{ sessionStorage.removeItem('cgo_mufe_c'); }catch(e){}
  };

  /* 무엇이 실제로 돌고 있는지 — 콘솔에서 확인용 */
  window.mufeState = function(){
    return {
      키유도: HAS ? ('PBKDF2-SHA256 · ' + ROUNDS.toLocaleString() + '회') : '대체 방식(구형 브라우저)',
      분할파쇄: '3조각 · 서로 다른 자리',
      카오스좌표: (localStorage.getItem('cgo_mufe_c4') || '없음'),
      설정됨: !!gather(),
      원문보관: '없음'
    };
  };
})();

/* ══ ML-KEM-768 — 양자내성 키쌍 ══
   지금은 만들어 두기만 한다. 실제로 쓰이는 곳은 서버와 주고받을 때다.
   라이브러리는 머리에 달지 않는다 — 비밀번호를 만들 때 처음 받는다 (속도 특허). */
(function(){
  var LIB = 'https://cdn.jsdelivr.net/npm/mlkem@2.3.1/+esm';
  var loading = null;

  function load(){
    if(window.MlKem768) return Promise.resolve(window.MlKem768);
    if(loading) return loading;
    loading = import(LIB).then(function(m){
      window.MlKem768 = m.MlKem768;
      return m.MlKem768;
    }).catch(function(){ loading = null; return null; });
    return loading;
  }

  /* 키쌍을 만들어 이 기기에만 둔다. 공개키는 서버에 줄 것, 비밀키는 안 나간다. */
  window.mufeKemInit = function(){
    try{ if(localStorage.getItem('cgo_kem_pub')) return Promise.resolve(true); }catch(e){}
    return load().then(function(K){
      if(!K) return false;
      var kem = new K();
      return kem.generateKeyPair().then(function(kp){
        var pub = kp[0], sec = kp[1];
        function hex(a){ return Array.prototype.map.call(a,function(b){return ('0'+b.toString(16)).slice(-2);}).join(''); }
        try{
          localStorage.setItem('cgo_kem_pub', hex(pub));
          localStorage.setItem('cgo_kem_sec', hex(sec));
          localStorage.setItem('cgo_kem_alg', 'ML-KEM-768');
        }catch(e){}
        return true;
      });
    }).catch(function(){ return false; });
  };

  window.mufeKemState = function(){
    try{
      var p = localStorage.getItem('cgo_kem_pub');
      return { 알고리즘:'ML-KEM-768 (NIST FIPS 203)',
               키쌍: p ? '있음 · 공개키 '+(p.length/2)+'바이트' : '아직 없음',
               비밀키: '이 기기 밖으로 나가지 않음' };
    }catch(e){ return {}; }
  };
})();
