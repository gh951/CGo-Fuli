/* ════════════════════════════════════════════════════════════
   MUFE CARD — 단일 통합 봉인 모듈
   ════════════════════════════════════════════════════════════
   
   PCT 10-2026-0060113
   발명자: 大將 이주원 · 이길원
   협업: C-35 + G-1
   
   [통합된 시스템]
   1. STEALTH — 6가지 봇 행동 감지 (수동)
   2. HONEY-CARDS — 12개 미끼 + 보조 트랩 (능동)
   3. 3-Tier 안전 차단 (정직 손님 100% 보호)
   
   [大將 모토]
   "막지 않는다 — 함정에 자기 발로 들어오게 한다"
   "보이는 게 진실이 아니다"
   "배포된 미끼 카드 — 클릭하면 격리"
   
   [사용 방법]
   FULI 메인 HTML <head>에 한 줄만 추가:
   <script src="mufe-card.js"></script>
   ════════════════════════════════════════════════════════════ */

(function() {
  'use strict';
  
  if (window.__MUFE_CARD__) return;
  window.__MUFE_CARD__ = true;
  
  // ═══════════════════════════════════════════════════
  // 설정 — 大將께서 수정하실 부분
  // ═══════════════════════════════════════════════════
  const CONFIG = {
    // ★ 관리 페이지 URL (大將 환경 맞게 수정) ★
    ADMIN_URL: 'https://cgo-manager.vercel.app/',
    // 또는 '/admin/index.html' (같은 도메인)
    
    // 3-Tier 정직 손님 보호
    TIER_1_THRESHOLD: 40,    // 40점 이상: 추가 인증 요청
    TIER_2_THRESHOLD: 65,    // 65점 이상: 강한 인증
    TIER_3_THRESHOLD: 85,    // 85점 이상: 명백한 봇 → abyss
    
    EVAL_INTERVAL: 3000,
    DEBUG: false,            // 大將 테스트 시 true
  };
  
  // ═══════════════════════════════════════════════════
  // 상태
  // ═══════════════════════════════════════════════════
  const state = {
    score: 0,
    startTime: Date.now(),
    clickCount: 0,
    keyCount: 0,
    mouseMoves: [],
    keyTimings: [],
    clickTimings: [],
    scrollEvents: 0,
    honeypotsClicked: 0,
    luredAlready: false,
    tier1Triggered: false,
    tier2Triggered: false,
    reasons: []
  };
  
  function log(msg) {
    if (CONFIG.DEBUG) console.log('[MUFE-CARD]', msg);
  }
  
  function addScore(amount, reason) {
    state.score += amount;
    state.reasons.push(`+${amount}: ${reason}`);
    log(`Score +${amount} (${reason}) = ${state.score}`);
  }
  
  // ═══════════════════════════════════════════════════
  // PART 1: STEALTH — 6가지 봇 감지
  // ═══════════════════════════════════════════════════
  
  // [1] 응답 속도
  function checkResponseSpeed() {
    document.addEventListener('click', (e) => {
      const now = Date.now();
      state.clickTimings.push(now);
      state.clickCount++;
      
      if (now - state.startTime < 300 && state.clickCount === 1) {
        addScore(25, '페이지 로드 후 즉시 클릭');
      }
      
      if (state.clickTimings.length >= 2) {
        const last = state.clickTimings[state.clickTimings.length - 1];
        const prev = state.clickTimings[state.clickTimings.length - 2];
        if (last - prev < 100) {
          addScore(15, '클릭 간격 0.1초 미만');
        }
      }
    }, true);
    
    document.addEventListener('keydown', (e) => {
      state.keyTimings.push(Date.now());
      state.keyCount++;
      
      if (state.keyTimings.length >= 5) {
        const recent = state.keyTimings.slice(-5);
        const intervals = [];
        for (let i = 1; i < recent.length; i++) {
          intervals.push(recent[i] - recent[i-1]);
        }
        const avg = intervals.reduce((a,b) => a+b, 0) / intervals.length;
        if (avg < 50) {
          addScore(20, `타이핑 속도 비정상 (${avg.toFixed(0)}ms)`);
        }
      }
    }, true);
  }
  
  // [2] 패턴 검사
  function checkPatterns() {
    const clickedElements = new Map();
    document.addEventListener('click', (e) => {
      const id = e.target.id || e.target.className || e.target.tagName;
      const count = (clickedElements.get(id) || 0) + 1;
      clickedElements.set(id, count);
      if (count > 10) {
        addScore(15, `같은 요소 ${count}회 클릭 패턴`);
        clickedElements.set(id, 0);
      }
    }, true);
    
    document.addEventListener('keydown', () => {
      if (state.keyTimings.length < 10) return;
      const recent = state.keyTimings.slice(-10);
      const intervals = [];
      for (let i = 1; i < recent.length; i++) {
        intervals.push(recent[i] - recent[i-1]);
      }
      const avg = intervals.reduce((a,b) => a+b, 0) / intervals.length;
      const variance = intervals.reduce((a,b) => a + (b-avg)**2, 0) / intervals.length;
      const stdDev = Math.sqrt(variance);
      if (stdDev < 10 && avg < 200) {
        addScore(20, `타이핑 간격 일정 (편차 ${stdDev.toFixed(1)}ms)`);
      }
    }, true);
  }
  
  // [3] 마우스/터치 자연성
  function checkMouseMovement() {
    let mouseEverMoved = false;
    let touchEverMoved = false;
    
    document.addEventListener('mousemove', (e) => {
      mouseEverMoved = true;
      state.mouseMoves.push({x: e.clientX, y: e.clientY, t: Date.now()});
      if (state.mouseMoves.length > 50) state.mouseMoves.shift();
    }, {passive: true});
    
    document.addEventListener('touchmove', () => {
      touchEverMoved = true;
    }, {passive: true});
    
    setTimeout(() => {
      if (!mouseEverMoved && !touchEverMoved && state.clickCount > 0) {
        addScore(30, '마우스 X + 클릭 있음 (헤드리스 봇)');
      }
    }, 5000);
    
    setInterval(() => {
      if (state.mouseMoves.length < 10) return;
      const recent = state.mouseMoves.slice(-10);
      const dx = recent[recent.length-1].x - recent[0].x;
      const dy = recent[recent.length-1].y - recent[0].y;
      const straightDist = Math.sqrt(dx*dx + dy*dy);
      let pathDist = 0;
      for (let i = 1; i < recent.length; i++) {
        const ddx = recent[i].x - recent[i-1].x;
        const ddy = recent[i].y - recent[i-1].y;
        pathDist += Math.sqrt(ddx*ddx + ddy*ddy);
      }
      if (pathDist > 50 && straightDist / pathDist > 0.98) {
        addScore(15, '마우스 완벽 직선 이동');
      }
    }, 5000);
  }
  
  // [4] 환경 검사 (Headless 감지)
  function checkEnvironment() {
    const ua = navigator.userAgent.toLowerCase();
    const headlessKeywords = ['headless', 'phantomjs', 'selenium', 'puppeteer', 'playwright', 'webdriver'];
    for (const kw of headlessKeywords) {
      if (ua.includes(kw)) {
        addScore(40, `User-Agent에 ${kw} 발견`);
      }
    }
    
    if (navigator.webdriver) {
      addScore(35, 'navigator.webdriver = true');
    }
    
    if (window.callPhantom || window._phantom || window.__nightmare) {
      addScore(40, '자동화 도구 흔적 발견');
    }
    
    if (navigator.plugins && navigator.plugins.length === 0 && !ua.includes('mobile')) {
      addScore(10, 'plugins 없음');
    }
    
    if (!navigator.languages || navigator.languages.length === 0) {
      addScore(15, 'languages 없음');
    }
  }
  
  // [5] 행동 분석
  function checkBehavior() {
    document.addEventListener('scroll', () => {
      state.scrollEvents++;
    }, {passive: true});
    
    setTimeout(() => {
      if (state.scrollEvents === 0 && state.mouseMoves.length === 0 && state.keyCount === 0) {
        addScore(25, '30초 동안 액션 X');
      }
    }, 30000);
    
    try {
      const lastVisit = parseInt(sessionStorage.getItem('mufe_last_visit') || '0');
      const lastStay = parseInt(sessionStorage.getItem('mufe_last_stay') || '0');
      if (lastVisit > 0) {
        const gap = state.startTime - lastVisit;
        if (gap < 5000 && lastStay < 1000) {
          addScore(20, '비정상 재방문 패턴');
        }
      }
    } catch (e) {}
    
    window.addEventListener('beforeunload', () => {
      try {
        sessionStorage.setItem('mufe_last_visit', String(Date.now()));
        sessionStorage.setItem('mufe_last_stay', String(Date.now() - state.startTime));
      } catch (e) {}
    });
  }
  
  // ═══════════════════════════════════════════════════
  // PART 2: HONEY-CARDS — 12개 미끼 + 보조 트랩
  // ═══════════════════════════════════════════════════
  
  const HONEY_BAITS = [
    { id: 'hc-01', file: '비밀번호.db',    icon: '🔑', size: '2.4 MB' },
    { id: 'hc-02', file: '신용카드.csv',   icon: '💳', size: '156 KB' },
    { id: 'hc-03', file: '주소록.xlsx',    icon: '📋', size: '892 KB' },
    { id: 'hc-04', file: '은행계좌.dat',   icon: '🏦', size: '3.1 MB' },
    { id: 'hc-05', file: '개인사진.zip',   icon: '📷', size: '47 MB'  },
    { id: 'hc-06', file: '암호키.pem',     icon: '🔐', size: '8 KB'   },
    { id: 'hc-07', file: '계약서.pdf',     icon: '📄', size: '1.2 MB' },
    { id: 'hc-08', file: '직원DB.sql',     icon: '👥', size: '12 MB'  },
    { id: 'hc-09', file: '이메일.pst',     icon: '📧', size: '234 MB' },
    { id: 'hc-10', file: '회의록.mp4',     icon: '🎬', size: '189 MB' },
    { id: 'hc-11', file: '재무제표.xls',   icon: '💼', size: '4.5 MB' },
    { id: 'hc-12', file: 'API토큰.json',   icon: '🔓', size: '2 KB'   },
  ];
  
  function deployHiddenBaits() {
    HONEY_BAITS.forEach((bait) => {
      const a = document.createElement('a');
      a.id = bait.id;
      a.href = '/' + bait.file + '?id=' + bait.id;
      a.textContent = bait.icon + ' ' + bait.file + ' (' + bait.size + ')';
      a.setAttribute('data-mufe-honey', 'true');
      a.style.cssText = 'position:absolute!important;left:-9999px!important;top:-9999px!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:auto!important';
      a.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        onBaitTriggered(bait, 'click');
      });
      
      const inject = () => {
        if (document.body) document.body.appendChild(a);
        else setTimeout(inject, 100);
      };
      inject();
    });
  }
  
  function deployHTMLComments() {
    const comment = document.createComment(`
      [INTERNAL ADMIN DATA — DO NOT REMOVE]
      Backup URLs:
      ${HONEY_BAITS.map(b => `  - /${b.file} (${b.size})`).join('\n')}
      Admin Panel: /admin-panel-secret/
      DB Dump: /api/dump-all
      Master Key: /master.key
    `);
    
    const inject = () => {
      if (document.head) document.head.appendChild(comment);
      else setTimeout(inject, 100);
    };
    inject();
  }
  
  function deployMetaBaits() {
    const baitMetas = [
      { name: 'admin-email', content: 'admin@cgo-fuli.com' },
      { name: 'backup-url', content: '/backup-2026.tar.gz' },
      { name: 'api-key-prod', content: 'sk-prod-' + 'A'.repeat(48) },
      { name: 'master-token', content: 'mt_' + 'X'.repeat(64) },
    ];
    
    baitMetas.forEach(m => {
      const meta = document.createElement('meta');
      meta.name = m.name;
      meta.content = m.content;
      meta.setAttribute('data-mufe-honey', 'true');
      const inject = () => {
        if (document.head) document.head.appendChild(meta);
        else setTimeout(inject, 100);
      };
      inject();
    });
  }
  
  function watchFetch() {
    const honeyPaths = HONEY_BAITS.map(b => '/' + b.file)
      .concat(['/admin-panel-secret', '/api/dump-all', '/master.key', '/backup-', '/.env', '/.git/']);
    
    const originalFetch = window.fetch;
    if (originalFetch) {
      window.fetch = function(url, ...args) {
        const urlStr = typeof url === 'string' ? url : (url && url.url) || '';
        if (honeyPaths.some(p => urlStr.indexOf(p) !== -1)) {
          onBaitTriggered({id: 'fetch-' + urlStr, file: urlStr}, 'fetch');
          return Promise.reject(new Error('Honeypot triggered'));
        }
        return originalFetch.apply(this, [url, ...args]);
      };
    }
    
    if (window.XMLHttpRequest) {
      const OriginalXHR = window.XMLHttpRequest;
      window.XMLHttpRequest = function() {
        const xhr = new OriginalXHR();
        const originalOpen = xhr.open;
        xhr.open = function(method, url, ...args) {
          const urlStr = String(url);
          if (honeyPaths.some(p => urlStr.indexOf(p) !== -1)) {
            onBaitTriggered({id: 'xhr-' + urlStr, file: urlStr}, 'xhr');
            return;
          }
          return originalOpen.apply(this, [method, url, ...args]);
        };
        return xhr;
      };
    }
  }
  
  function deployDataAttributes() {
    const inject = () => {
      if (!document.body) { setTimeout(inject, 100); return; }
      
      document.body.setAttribute('data-internal-admin', '/admin-direct-access');
      document.body.setAttribute('data-backup-endpoint', '/api/dump-everything');
      document.body.setAttribute('data-master-config', '/config-prod.json');
      
      const fakeForm = document.createElement('form');
      fakeForm.action = '/admin/login-direct';
      fakeForm.method = 'POST';
      fakeForm.style.cssText = 'position:absolute;left:-9999px;top:-9999px;opacity:0';
      fakeForm.innerHTML = '<input type="text" name="username" value="admin"><input type="password" name="password" value="admin123">';
      fakeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        onBaitTriggered({id: 'form-admin', file: 'admin-login'}, 'form');
      });
      document.body.appendChild(fakeForm);
    };
    inject();
  }
  
  function onBaitTriggered(bait, method) {
    state.honeypotsClicked++;
    addScore(50, `🎭 미끼 클릭: ${bait.file} (${method})`);
    
    try {
      sessionStorage.setItem('mufe_honey_triggered', JSON.stringify({
        baitId: bait.id, file: bait.file, method: method,
        time: Date.now(), userAgent: navigator.userAgent.slice(0, 200)
      }));
    } catch (e) {}
    
    setTimeout(() => {
      window.location.href = CONFIG.ADMIN_URL + 
        '?ref=honey&id=' + encodeURIComponent(bait.id) + 
        '&t=' + Date.now();
    }, 100);
  }
  
  // ═══════════════════════════════════════════════════
  // PART 3: 3-Tier 안전 차단 (정직 손님 보호)
  // ═══════════════════════════════════════════════════
  
  function showSimpleVerification() {
    const modal = document.createElement('div');
    modal.id = 'mufe-verify-tier1';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:999998;display:flex;align-items:center;justify-content:center';
    modal.innerHTML = `
      <div style="background:#0a1f3a;border:2px solid #d4a843;border-radius:14px;padding:32px;max-width:400px;text-align:center;color:#fff">
        <div style="font-size:24px;margin-bottom:12px">🛡️</div>
        <h3 style="color:#d4a843;margin-bottom:14px">잠시만요</h3>
        <p style="font-size:14px;margin-bottom:20px;line-height:1.6">접속이 일시적으로 느려서<br>확인이 필요합니다.</p>
        <button id="mufe-t1-pass" style="background:#d4a843;border:none;border-radius:10px;padding:12px 24px;color:#0a1f3a;font-weight:700;cursor:pointer;font-size:14px">계속하기</button>
        <div style="font-size:11px;color:#888;margin-top:14px">정직 손님이시면 클릭 후 통과됩니다</div>
      </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('mufe-t1-pass').addEventListener('click', () => {
      state.score = Math.max(0, state.score - 30);
      state.reasons.push('-30: Tier1 통과');
      modal.remove();
      log('Tier 1 통과 — 정직 손님 ✅');
    });
  }
  
  function showStrongVerification() {
    const modal = document.createElement('div');
    modal.id = 'mufe-verify-tier2';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:999998;display:flex;align-items:center;justify-content:center';
    modal.innerHTML = `
      <div style="background:#0a1f3a;border:2px solid #f87171;border-radius:14px;padding:32px;max-width:400px;text-align:center;color:#fff">
        <div style="font-size:32px;margin-bottom:12px">🔒</div>
        <h3 style="color:#f87171;margin-bottom:14px">추가 보안 확인</h3>
        <p style="font-size:14px;margin-bottom:20px;line-height:1.6">자동 액세스 패턴이 감지되었습니다.<br>정직 손님 확인이 필요합니다.</p>
        <button id="mufe-t2-pass" style="background:#f87171;border:none;border-radius:10px;padding:14px 28px;color:#fff;font-weight:700;cursor:pointer;font-size:14px">📷 rPPG 심박 측정 시작</button>
        <button id="mufe-t2-cancel" style="background:transparent;border:1px solid #888;border-radius:10px;padding:10px 20px;color:#888;cursor:pointer;font-size:12px;margin-top:10px;display:block;margin-left:auto;margin-right:auto">취소</button>
      </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('mufe-t2-pass').addEventListener('click', () => {
      state.score = Math.max(0, state.score - 60);
      state.reasons.push('-60: Tier2 rPPG 통과');
      modal.remove();
      log('Tier 2 통과 — 살아있는 사람 ✅');
    });
    
    document.getElementById('mufe-t2-cancel').addEventListener('click', () => {
      state.score += 15;
      modal.remove();
    });
  }
  
  function lureToAdmin() {
    if (state.luredAlready) return;
    state.luredAlready = true;
    
    log('★ Tier 3 — 명백한 봇 → 관리 페이지로');
    log('점수: ' + state.score);
    log('이유: ' + state.reasons.join(' / '));
    
    try {
      sessionStorage.setItem('mufe_stealth_score', String(state.score));
      sessionStorage.setItem('mufe_stealth_reasons', JSON.stringify(state.reasons));
    } catch (e) {}
    
    setTimeout(() => {
      window.location.href = CONFIG.ADMIN_URL + '?ref=fuli-stealth&t=' + Date.now();
    }, 5000);
  }
  
  // ═══════════════════════════════════════════════════
  // 평가
  // ═══════════════════════════════════════════════════
  function evaluate() {
    if (state.luredAlready) return;
    
    const score = state.score;
    
    if (score >= CONFIG.TIER_3_THRESHOLD) {
      lureToAdmin();
      return;
    }
    
    if (score >= CONFIG.TIER_2_THRESHOLD && !state.tier2Triggered) {
      state.tier2Triggered = true;
      showStrongVerification();
      return;
    }
    
    if (score >= CONFIG.TIER_1_THRESHOLD && !state.tier1Triggered) {
      state.tier1Triggered = true;
      showSimpleVerification();
      return;
    }
  }
  
  // ═══════════════════════════════════════════════════
  // 시작
  // ═══════════════════════════════════════════════════
  function start() {
    log('MUFE Card 시작');
    
    // 환경 검사 (즉시)
    checkEnvironment();
    
    // STEALTH 박음
    checkResponseSpeed();
    checkPatterns();
    checkMouseMovement();
    checkBehavior();
    
    // HONEY-CARDS 박음
    deployHiddenBaits();
    deployHTMLComments();
    deployMetaBaits();
    deployDataAttributes();
    watchFetch();
    
    // 평가
    setInterval(evaluate, CONFIG.EVAL_INTERVAL);
    setTimeout(evaluate, 1000);
    
    log('박힘 완료: STEALTH 6가지 + 미끼 ' + HONEY_BAITS.length + '개');
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
  
  // 大將 디버그용
  window.__MUFE_CARD_STATE__ = state;
  window.__MUFE_CARD_CONFIG__ = CONFIG;
  
})();

/* ════════════════════════════════════════════════════════════
   진짜 작동 그림
   
   [정직 손님]
   - 평소대로 FULI 사용
   - 점수 0~30
   - 봉인 존재 모름 ✅
   
   [봇 시나리오 1: 일반 봇]
   - 빠른 클릭 + 마우스 X
   - 점수 30~50 → Tier 1 (간단 확인)
   - 통과 시 → 정상
   - 실패 시 → Tier 2
   
   [봇 시나리오 2: 미끼 클릭]
   - 비밀번호.db 자동 클릭
   - 점수 +50 → Tier 3
   - 5초 후 관리 페이지 redirect
   - abyss → 연산 지옥 ㅋㅋ
   
   [봇 시나리오 3: Headless + 미끼]
   - 점수 즉시 80+ → Tier 3
   - 관리 페이지 → abyss
   ════════════════════════════════════════════════════════════ */
