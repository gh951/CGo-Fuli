// ══════════════════════════════════════════════════════════════════
//  CGO 주파수 뮤직  v2.0  — 서브 홈페이지 구조
//  위성 × 생체 × 역학 × 주파수 · 세계 최초 AI 치료 음악
//  View-Only Active · Strict Destroy
// ══════════════════════════════════════════════════════════════════
(function (global) {
  'use strict';

  // ── 슬롯 데이터 ──────────────────────────────────────────────────
  const SLOT_DATA = {
    key:        { label:'조성/음계', emoji:'🎵', items:['C Major','C# Major','D Major','D# Major','E Major','F Major','F# Major','G Major','G# Major','A Major','A# Major','B Major','C Minor','C# Minor','D Minor','D# Minor','E Minor','F Minor','F# Minor','G Minor','G# Minor','A Minor','A# Minor','B Minor'] },
    time:       { label:'박자',     emoji:'⏱', items:['4/4','3/4','6/8','12/8','2/4','5/4','7/8','9/8'] },
    genre:      { label:'장르',     emoji:'🎭', items:['샹송(Chanson)','칸소네(Canzone)','국악','앰비언트','팝','발라드','재즈','보사노바','플라멩코','켈틱','아프로비트','인도 라가','아랍 마캄','탱고','힐링'] },
    vocal:      { label:'보컬',     emoji:'🎤', items:['남성(Male)','여성(Female)','혼성(Duet)','무보컬(BGM)','어린이','합창(Choir)'] },
    instrument: { label:'세계 악기', emoji:'🪕', items:['가야금(한국)','해금(한국)','아코디언(프랑스)','만돌린(이탈리아)','우드(중동)','칼림바(아프리카)','팬플루트(안데스)','시타르(인도)','케나(페루)','딤베(서아프리카)','비파(중국)','사미센(일본)','두둑(아르메니아)','오카리나','하프','첼로'] }
  };

  const FREQ_OPTIONS = [
    { hz:432,  label:'432Hz',  desc:'자연 공명·안정',  color:'#f59e0b' },
    { hz:528,  label:'528Hz',  desc:'DNA 회복·사랑',    color:'#10b981' },
    { hz:7.83, label:'슈만공명', desc:'지구 뇌파 동조', color:'#3b82f6' },
    { hz:0,    label:'OFF',    desc:'순수 음악',         color:'#6b7280' }
  ];

  // ── NOTE → 주파수 맵 (Web Audio API용) ──────────────────────────
  const NOTE_FREQ = { C:261.63,'C#':277.18,D:293.66,'D#':311.13,E:329.63,F:349.23,'F#':369.99,G:392,'G#':415.3,A:440,'A#':466.16,B:493.88 };

  // ── CSS ─────────────────────────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('cgo-music-css-v2')) return;
    const s = document.createElement('style');
    s.id = 'cgo-music-css-v2';
    s.textContent = `
/* ─── 루트 래퍼 ─── */
#cgo-music-root{font-family:'Segoe UI','Apple SD Gothic Neo',sans-serif;background:#06000f;color:#e8d5ff;min-height:100vh;position:relative;overflow-x:hidden;padding-bottom:90px;}

/* ─── 상단 헤더 바 ─── */
.cgo-mhdr{position:sticky;top:0;z-index:100;background:rgba(6,0,15,.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(168,85,247,.2);display:flex;align-items:center;padding:0 14px;height:52px;gap:10px;}
.cgo-mhdr-back{width:36px;height:36px;border-radius:10px;background:rgba(168,85,247,.12);border:1px solid rgba(168,85,247,.3);display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;color:#c084fc;flex-shrink:0;}
.cgo-mhdr-logo{display:flex;align-items:center;gap:8px;flex:1;}
.cgo-mhdr-logo-ico{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#7c3aed,#a855f7);display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 0 12px rgba(168,85,247,.45);}
.cgo-mhdr-title{font-size:15px;font-weight:800;color:#f0e6ff;letter-spacing:.01em;}
.cgo-mhdr-sub{font-size:9.5px;color:#a78bfa;margin-top:1px;}
.cgo-mhdr-badge{font-size:9px;background:linear-gradient(135deg,#7c3aed,#a855f7);border-radius:999px;padding:2px 8px;color:#fff;font-weight:700;flex-shrink:0;}

/* ─── 탭 네비 ─── */
.cgo-mtabs{display:flex;background:rgba(10,0,25,.8);border-bottom:1px solid rgba(168,85,247,.15);overflow-x:auto;scrollbar-width:none;}
.cgo-mtabs::-webkit-scrollbar{display:none;}
.cgo-mtab{flex:1;min-width:72px;padding:10px 4px 8px;text-align:center;font-size:11px;font-weight:700;color:#7c6fa8;cursor:pointer;border-bottom:2px solid transparent;transition:color .2s,border-color .2s;white-space:nowrap;}
.cgo-mtab.active{color:#c084fc;border-bottom-color:#a855f7;}
.cgo-mtab-ico{font-size:17px;display:block;margin-bottom:2px;}

/* ─── 히어로 섹션 ─── */
.cgo-mhero{position:relative;overflow:hidden;padding:32px 16px 24px;text-align:center;background:linear-gradient(180deg,#0f0028 0%,#06000f 100%);}
.cgo-mhero-canvas{position:absolute;inset:0;pointer-events:none;}
.cgo-mhero-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.35);border-radius:999px;padding:4px 14px;font-size:10.5px;color:#c084fc;font-weight:700;margin-bottom:14px;position:relative;}
.cgo-mhero-tag::before{content:'';width:7px;height:7px;border-radius:50%;background:#a855f7;animation:cgoPulse 1.8s ease-in-out infinite;}
@keyframes cgoPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}
.cgo-mhero-h1{font-size:clamp(20px,5.5vw,28px);font-weight:900;line-height:1.25;margin:0 0 8px;position:relative;}
.cgo-mhero-h1 span{background:linear-gradient(90deg,#c084fc,#f0abfc,#818cf8,#c084fc);background-size:200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:cgoGrad 4s linear infinite;}
@keyframes cgoGrad{0%{background-position:0%}100%{background-position:200%}}
.cgo-mhero-desc{font-size:12px;color:#9d8ec4;line-height:1.6;position:relative;margin:0 auto;max-width:280px;}
.cgo-mhero-chips{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:16px;position:relative;}
.cgo-mhero-chip{font-size:10px;padding:4px 12px;border-radius:999px;border:1px solid;font-weight:600;}

/* ─── 섹션 공통 ─── */
.cgo-msec{padding:20px 14px 4px;}
.cgo-msec-title{font-size:13px;font-weight:800;color:#c084fc;margin:0 0 12px;display:flex;align-items:center;gap:6px;}
.cgo-msec-title::before{content:'';width:4px;height:16px;border-radius:2px;background:linear-gradient(180deg,#a855f7,#7c3aed);}

/* ─── 추첨통 슬롯 ─── */
.cgo-slot-grid{display:flex;flex-direction:column;gap:8px;}
.cgo-slot-row{background:rgba(20,5,40,.7);border:1px solid rgba(168,85,247,.2);border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:border-color .2s,background .2s;}
.cgo-slot-row:active{background:rgba(30,8,60,.9);}
.cgo-slot-row-label{font-size:11px;color:#9d8ec4;width:68px;flex-shrink:0;line-height:1.4;}
.cgo-slot-row-label b{display:block;font-size:12.5px;color:#d8b4fe;font-weight:700;}
.cgo-slot-canvas-wrap{flex:1;height:42px;overflow:hidden;border-radius:8px;background:rgba(10,0,21,.6);}
.cgo-slot-canvas-wrap canvas{width:100%;height:42px;}
.cgo-slot-row-val{font-size:11px;font-weight:700;color:#f0abfc;width:90px;text-align:right;flex-shrink:0;line-height:1.3;}

/* ─── 스핀 버튼 ─── */
.cgo-spin-wrap{padding:14px 14px 4px;display:flex;gap:8px;}
.cgo-spin-btn{flex:1;padding:14px;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;color:#fff;font-size:15px;font-weight:800;cursor:pointer;letter-spacing:.04em;box-shadow:0 4px 20px rgba(168,85,247,.4);transition:transform .15s,box-shadow .15s;font-family:inherit;}
.cgo-spin-btn:active{transform:scale(.97);box-shadow:0 2px 10px rgba(168,85,247,.3);}
.cgo-spin-btn:disabled{opacity:.5;cursor:not-allowed;}
.cgo-play-btn{width:52px;height:52px;border-radius:14px;background:rgba(168,85,247,.15);border:1.5px solid rgba(168,85,247,.4);color:#c084fc;font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s;}
.cgo-play-btn:active{background:rgba(168,85,247,.3);}

/* ─── 주파수 선택 ─── */
.cgo-freq-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;}
.cgo-freq-btn{border-radius:12px;padding:10px 4px;background:rgba(20,5,40,.7);border:1.5px solid rgba(100,60,180,.25);color:#9d8ec4;font-size:10px;font-weight:700;cursor:pointer;text-align:center;transition:all .2s;line-height:1.35;font-family:inherit;}
.cgo-freq-btn b{display:block;font-size:12.5px;margin-bottom:2px;}
.cgo-freq-btn.active{border-color:currentColor;background:rgba(20,5,40,.95);box-shadow:0 0 10px currentColor;}

/* ─── 상태 / 결과 ─── */
.cgo-status{min-height:28px;padding:0 14px;font-size:12px;color:#a78bfa;text-align:center;}
.cgo-result-card{background:linear-gradient(135deg,rgba(20,5,40,.9),rgba(30,8,60,.85));border:1px solid rgba(168,85,247,.3);border-radius:16px;padding:16px;margin:0 14px;}
.cgo-result-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}
.cgo-result-tag{font-size:10.5px;padding:3px 10px;border-radius:999px;background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.35);color:#d8b4fe;font-weight:600;}

/* ─── 생성 버튼 ─── */
.cgo-gen-wrap{padding:14px;}
.cgo-gen-btn{width:100%;padding:16px;border-radius:16px;background:linear-gradient(135deg,#6d28d9,#7c3aed,#a855f7);border:none;color:#fff;font-size:16px;font-weight:800;cursor:pointer;letter-spacing:.04em;box-shadow:0 6px 24px rgba(168,85,247,.45);position:relative;overflow:hidden;font-family:inherit;transition:transform .15s;}
.cgo-gen-btn::before{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);animation:cgoShine 2.5s ease-in-out infinite;}
@keyframes cgoShine{0%{left:-100%}60%,100%{left:120%}}
.cgo-gen-btn:active{transform:scale(.98);}
.cgo-gen-btn:disabled{opacity:.5;cursor:not-allowed;}

/* ─── 차트 섹션 ─── */
.cgo-chart-list{display:flex;flex-direction:column;gap:8px;}
.cgo-chart-item{background:rgba(20,5,40,.7);border:1px solid rgba(168,85,247,.15);border-radius:12px;padding:11px 12px;display:flex;align-items:center;gap:10px;cursor:pointer;}
.cgo-chart-rank{font-family:monospace;font-size:13px;font-weight:900;color:#7c3aed;width:22px;flex-shrink:0;text-align:center;}
.cgo-chart-thumb{width:38px;height:38px;border-radius:9px;background:linear-gradient(135deg,#1a003a,#3b0080);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.cgo-chart-info{flex:1;min-width:0;}
.cgo-chart-name{font-size:12.5px;font-weight:700;color:#e8d5ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.cgo-chart-meta{font-size:10px;color:#7c6fa8;margin-top:2px;}
.cgo-chart-hz{font-size:10.5px;font-weight:700;color:#a855f7;flex-shrink:0;}

/* ─── 하단 플레이어 ─── */
.cgo-player{position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(8,0,20,.96);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-top:1px solid rgba(168,85,247,.25);padding:10px 14px;display:none;}
.cgo-player.visible{display:flex;align-items:center;gap:10px;}
.cgo-player-thumb{width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,#3b0080,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;box-shadow:0 0 12px rgba(168,85,247,.4);}
.cgo-player-info{flex:1;min-width:0;}
.cgo-player-title{font-size:12px;font-weight:700;color:#f0e6ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.cgo-player-sub{font-size:10px;color:#9d8ec4;margin-top:1px;}
.cgo-player-progress{height:3px;background:rgba(168,85,247,.2);border-radius:2px;margin-top:5px;position:relative;overflow:hidden;}
.cgo-player-bar{height:100%;background:linear-gradient(90deg,#7c3aed,#a855f7);border-radius:2px;width:0%;transition:width .3s linear;}
.cgo-player-btns{display:flex;gap:6px;flex-shrink:0;}
.cgo-player-btn{width:38px;height:38px;border-radius:10px;background:rgba(168,85,247,.12);border:1px solid rgba(168,85,247,.3);color:#c084fc;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.cgo-player-btn.main{background:linear-gradient(135deg,#7c3aed,#a855f7);border-color:transparent;color:#fff;width:42px;height:42px;border-radius:12px;}

/* ─── 프리셋 ─── */
.cgo-preset-bar{display:flex;gap:7px;overflow-x:auto;scrollbar-width:none;padding:0 14px 4px;}
.cgo-preset-bar::-webkit-scrollbar{display:none;}
.cgo-preset-chip{flex-shrink:0;padding:6px 12px;border-radius:999px;background:rgba(168,85,247,.12);border:1px solid rgba(168,85,247,.3);color:#c084fc;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;}
.cgo-preset-save{flex-shrink:0;padding:6px 12px;border-radius:999px;background:transparent;border:1px solid rgba(168,85,247,.2);color:#7c6fa8;font-size:11px;cursor:pointer;font-family:inherit;}
`;
    document.head.appendChild(s);
  }

  // ── 더미 차트 데이터 ─────────────────────────────────────────────
  const DEMO_CHART = [
    { rank:1, emoji:'🌿', name:'432Hz 자연 치유 · C Major 앰비언트', meta:'가야금 · 무보컬', hz:'432Hz' },
    { rank:2, emoji:'💫', name:'528Hz DNA 회복 · G Minor 발라드',    meta:'칼림바 · 여성',  hz:'528Hz' },
    { rank:3, emoji:'🌊', name:'슈만공명 지구 동조 · A Major 재즈',  meta:'두둑 · 혼성',    hz:'7.83Hz' },
    { rank:4, emoji:'🎋', name:'힐링 국악 · E Minor 4/4',            meta:'해금 · 남성',    hz:'432Hz' },
    { rank:5, emoji:'🌺', name:'보사노바 F Major 528Hz',              meta:'팬플루트 · 여성', hz:'528Hz' },
  ];

  // ════════════════════════════════════════════════════════════════
  class FrequencyMusicModule {
    constructor(container) {
      this.container = container;
      this.root = null;

      // 배경 canvas
      this.bgCanvas = null;
      this.bgCtx = null;
      this.bgAnimId = null;

      // 슬롯
      this.slotKeys = Object.keys(SLOT_DATA);
      this.selected = {};
      this.slotAnimIds = {};
      this.slotCanvases = {};
      this.slotCtxs = {};
      this.slotPositions = {};
      this.slotTargets = {};
      this.isSpinning = false;
      this.slotKeys.forEach(k => {
        const items = SLOT_DATA[k].items;
        this.selected[k] = items[Math.floor(Math.random() * items.length)];
        this.slotPositions[k] = 0;
        this.slotTargets[k] = 0;
      });

      this.selectedFreq = 432;
      this.presets = this._loadPresets();
      this.particles = [];

      // Web Audio
      this.audioCtx = null;
      this.oscNodes = [];
      this.gainNode = null;
      this.healOsc = null;
      this.healGain = null;
      this.isPlaying = false;
      this.playTimerId = null;
      this.playProgress = 0;

      // 현재 탭
      this.activeTab = 'make';

      // resize 바인딩
      this._onResize = () => this._resizeBg();
    }

    // ── init ────────────────────────────────────────────────────
    init() {
      injectCSS();
      this._buildDOM();
      this._startBgCanvas();
      this._renderPresets();
      this._renderChart();
      this._updateResult();
    }

    // ── DOM 빌드 ────────────────────────────────────────────────
    _buildDOM() {
      this.root = document.createElement('div');
      this.root.id = 'cgo-music-root';
      this.container.appendChild(this.root);

      // ─ 헤더 ─
      const hdr = document.createElement('header');
      hdr.className = 'cgo-mhdr';
      hdr.innerHTML = `
        <div class="cgo-mhdr-back" id="cgo-mhdr-back">‹</div>
        <div class="cgo-mhdr-logo">
          <div class="cgo-mhdr-logo-ico">🎵</div>
          <div>
            <div class="cgo-mhdr-title">CGO 주파수 뮤직</div>
            <div class="cgo-mhdr-sub">위성 × 생체 × 역학 × 주파수</div>
          </div>
        </div>
        <div class="cgo-mhdr-badge">세계 최초</div>
      `;
      this.root.appendChild(hdr);
      hdr.querySelector('#cgo-mhdr-back').addEventListener('click', () => {
        if (typeof global.cgoGoPage === 'function') global.cgoGoPage('home');
      });

      // ─ 탭 ─
      const tabs = document.createElement('nav');
      tabs.className = 'cgo-mtabs';
      tabs.innerHTML = `
        <div class="cgo-mtab active" data-tab="make"><span class="cgo-mtab-ico">🎰</span>추첨통</div>
        <div class="cgo-mtab" data-tab="chart"><span class="cgo-mtab-ico">📊</span>차트</div>
        <div class="cgo-mtab" data-tab="freq"><span class="cgo-mtab-ico">🌊</span>주파수</div>
        <div class="cgo-mtab" data-tab="preset"><span class="cgo-mtab-ico">⭐</span>프리셋</div>
      `;
      this.root.appendChild(tabs);
      tabs.querySelectorAll('.cgo-mtab').forEach(t => {
        t.addEventListener('click', () => this._switchTab(t.dataset.tab));
      });
      this.tabsEl = tabs;

      // ─ 히어로 ─
      const hero = document.createElement('section');
      hero.className = 'cgo-mhero';
      hero.innerHTML = `
        <canvas class="cgo-mhero-canvas" id="cgo-bg-canvas"></canvas>
        <div class="cgo-mhero-tag">🛰️ CGO-FULI · 세계 최초</div>
        <h2 class="cgo-mhero-h1"><span>위성×생체×역학×주파수</span></h2>
        <p class="cgo-mhero-desc">당신의 사주·생체 데이터와 위성 주파수를 결합해<br>세상에 없던 나만의 치료 음악을 만듭니다</p>
        <div class="cgo-mhero-chips">
          <span class="cgo-mhero-chip" style="color:#f59e0b;border-color:rgba(245,158,11,.4);">432Hz</span>
          <span class="cgo-mhero-chip" style="color:#10b981;border-color:rgba(16,185,129,.4);">528Hz</span>
          <span class="cgo-mhero-chip" style="color:#3b82f6;border-color:rgba(59,130,246,.4);">슈만공명</span>
          <span class="cgo-mhero-chip" style="color:#a855f7;border-color:rgba(168,85,247,.4);">하루 1회·10원</span>
        </div>
      `;
      this.root.appendChild(hero);
      this.bgCanvas = hero.querySelector('#cgo-bg-canvas');
      this.bgCtx = this.bgCanvas.getContext('2d');
      this._resizeBg();
      window.addEventListener('resize', this._onResize);

      // ─ 탭 콘텐츠 패널들 ─
      this.panels = {};
      ['make','chart','freq','preset'].forEach(tab => {
        const panel = document.createElement('div');
        panel.id = `cgo-panel-${tab}`;
        panel.style.display = tab === 'make' ? 'block' : 'none';
        this.root.appendChild(panel);
        this.panels[tab] = panel;
      });

      this._buildMakePanel();
      this._buildFreqPanel();
      this._buildPresetPanel();

      // ─ 하단 플레이어 ─
      const player = document.createElement('div');
      player.className = 'cgo-player';
      player.id = 'cgo-player';
      player.innerHTML = `
        <div class="cgo-player-thumb" id="cgo-player-thumb">🎵</div>
        <div class="cgo-player-info">
          <div class="cgo-player-title" id="cgo-player-title">CGO 주파수 음악</div>
          <div class="cgo-player-sub" id="cgo-player-sub">432Hz · C Major</div>
          <div class="cgo-player-progress"><div class="cgo-player-bar" id="cgo-player-bar"></div></div>
        </div>
        <div class="cgo-player-btns">
          <button class="cgo-player-btn main" id="cgo-player-play">▶</button>
          <button class="cgo-player-btn" id="cgo-player-stop">■</button>
        </div>
      `;
      this.root.appendChild(player);
      this.playerEl = player;
      player.querySelector('#cgo-player-play').addEventListener('click', () => this._togglePlay());
      player.querySelector('#cgo-player-stop').addEventListener('click', () => this._stopAudio());
    }

    // ── 추첨통 패널 ─────────────────────────────────────────────
    _buildMakePanel() {
      const p = this.panels.make;

      // 섹션: 슬롯
      const slotSec = document.createElement('div');
      slotSec.className = 'cgo-msec';
      slotSec.innerHTML = '<div class="cgo-msec-title">🎰 슬롯 추첨통</div>';
      const grid = document.createElement('div');
      grid.className = 'cgo-slot-grid';
      slotSec.appendChild(grid);
      p.appendChild(slotSec);

      this.slotKeys.forEach(k => {
        const info = SLOT_DATA[k];
        const row = document.createElement('div');
        row.className = 'cgo-slot-row';
        row.innerHTML = `
          <div class="cgo-slot-row-label"><b>${info.emoji} ${info.label}</b></div>
          <div class="cgo-slot-canvas-wrap"><canvas id="cgo-sc-${k}"></canvas></div>
          <div class="cgo-slot-row-val" id="cgo-val-${k}">${this.selected[k]}</div>
        `;
        row.addEventListener('click', () => { if (!this.isSpinning) this._spinOne(k); });
        grid.appendChild(row);

        const canvas = row.querySelector(`#cgo-sc-${k}`);
        this.slotCanvases[k] = canvas;
        this.slotCtxs[k] = canvas.getContext('2d');
        this._resizeSlot(k);
        this._drawSlot(k, 0);
      });

      // 스핀 + 플레이 버튼
      const spinWrap = document.createElement('div');
      spinWrap.className = 'cgo-spin-wrap';
      spinWrap.innerHTML = `
        <button class="cgo-spin-btn" id="cgo-spin-btn">🎰 SPIN · 추첨</button>
        <button class="cgo-play-btn" id="cgo-quick-play" title="미리 듣기">▶</button>
      `;
      p.appendChild(spinWrap);
      spinWrap.querySelector('#cgo-spin-btn').addEventListener('click', () => this._spinAll());
      spinWrap.querySelector('#cgo-quick-play').addEventListener('click', () => this._quickPlay());

      // 상태
      const statusEl = document.createElement('p');
      statusEl.className = 'cgo-status';
      statusEl.id = 'cgo-status';
      p.appendChild(statusEl);

      // 결과 카드
      const resSec = document.createElement('div');
      resSec.className = 'cgo-msec';
      resSec.innerHTML = '<div class="cgo-msec-title">🎼 선택된 조합</div>';
      const resCard = document.createElement('div');
      resCard.className = 'cgo-result-card';
      resCard.id = 'cgo-result-card';
      resSec.appendChild(resCard);
      p.appendChild(resSec);

      // 주파수 빠른 선택 (make 탭 안)
      const fqSec = document.createElement('div');
      fqSec.className = 'cgo-msec';
      fqSec.innerHTML = '<div class="cgo-msec-title">🌊 치료 주파수</div>';
      const fqGrid = document.createElement('div');
      fqGrid.className = 'cgo-freq-grid';
      fqGrid.id = 'cgo-fq-make';
      FREQ_OPTIONS.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'cgo-freq-btn' + (opt.hz === this.selectedFreq ? ' active' : '');
        btn.style.color = opt.color;
        btn.dataset.hz = opt.hz;
        btn.innerHTML = `<b>${opt.label}</b>${opt.desc}`;
        btn.addEventListener('click', () => this._selectFreq(opt.hz));
        fqGrid.appendChild(btn);
      });
      fqSec.appendChild(fqGrid);
      p.appendChild(fqSec);

      // 생성 버튼
      const genWrap = document.createElement('div');
      genWrap.className = 'cgo-gen-wrap';
      genWrap.innerHTML = `<button class="cgo-gen-btn" id="cgo-gen-btn">✨ AI 음악 생성하기 · 하루 1회 10원</button>`;
      p.appendChild(genWrap);
      genWrap.querySelector('#cgo-gen-btn').addEventListener('click', () => this._onGenerate());
    }

    // ── 주파수 패널 ─────────────────────────────────────────────
    _buildFreqPanel() {
      const p = this.panels.freq;
      p.innerHTML = `
        <div class="cgo-msec">
          <div class="cgo-msec-title">🌊 치료 주파수 안내</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.3);border-radius:14px;padding:16px;">
              <div style="font-size:14px;font-weight:800;color:#f59e0b;">432Hz — 자연 공명</div>
              <div style="font-size:11.5px;color:#9d8ec4;margin-top:6px;line-height:1.6;">자연의 진동수. 심신 안정·스트레스 해소·집중력 향상. 귀에 부드럽고 자연스럽게 느껴지는 주파수.</div>
            </div>
            <div style="background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.3);border-radius:14px;padding:16px;">
              <div style="font-size:14px;font-weight:800;color:#10b981;">528Hz — DNA 회복</div>
              <div style="font-size:11.5px;color:#9d8ec4;margin-top:6px;line-height:1.6;">솔페지오 주파수. 세포 재생·면역력 강화·사랑과 치유의 주파수라 불림. 아침 명상에 적합.</div>
            </div>
            <div style="background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.3);border-radius:14px;padding:16px;">
              <div style="font-size:14px;font-weight:800;color:#3b82f6;">7.83Hz — 슈만공명</div>
              <div style="font-size:11.5px;color:#9d8ec4;margin-top:6px;line-height:1.6;">지구 자기장의 기본 주파수. 뇌파(알파파) 동조·수면 유도·불안 감소. CGO 위성 데이터와 연동.</div>
            </div>
            <div style="background:rgba(107,114,128,.1);border:1px solid rgba(107,114,128,.3);border-radius:14px;padding:16px;">
              <div style="font-size:14px;font-weight:800;color:#9ca3af;">OFF — 순수 음악</div>
              <div style="font-size:11.5px;color:#9d8ec4;margin-top:6px;line-height:1.6;">치료 주파수 없이 선택한 조성·장르·악기만으로 순수하게 즐기는 음악 모드.</div>
            </div>
          </div>
        </div>
      `;
    }

    // ── 프리셋 패널 ─────────────────────────────────────────────
    _buildPresetPanel() {
      const p = this.panels.preset;
      p.innerHTML = `<div class="cgo-msec"><div class="cgo-msec-title">⭐ 저장된 조합</div><div id="cgo-preset-list"></div></div>`;
    }

    // ── 차트 렌더 ───────────────────────────────────────────────
    _renderChart() {
      const p = this.panels.chart;
      const sec = document.createElement('div');
      sec.className = 'cgo-msec';
      sec.innerHTML = '<div class="cgo-msec-title">📊 주파수 음악 차트 TOP 5</div>';
      const list = document.createElement('div');
      list.className = 'cgo-chart-list';
      DEMO_CHART.forEach(item => {
        const el = document.createElement('div');
        el.className = 'cgo-chart-item';
        el.innerHTML = `
          <div class="cgo-chart-rank">${item.rank}</div>
          <div class="cgo-chart-thumb">${item.emoji}</div>
          <div class="cgo-chart-info">
            <div class="cgo-chart-name">${item.name}</div>
            <div class="cgo-chart-meta">${item.meta}</div>
          </div>
          <div class="cgo-chart-hz">${item.hz}</div>
        `;
        el.addEventListener('click', () => this._setStatus('🎵 ' + item.name + ' 준비 중…'));
        list.appendChild(el);
      });
      sec.appendChild(list);
      p.appendChild(sec);

      // 안내
      const notice = document.createElement('div');
      notice.style.cssText = 'margin:12px 14px;padding:14px;background:rgba(20,5,40,.7);border:1px solid rgba(168,85,247,.2);border-radius:12px;font-size:11px;color:#7c6fa8;line-height:1.7;';
      notice.innerHTML = '📌 직원 3인이 하루 50곡씩 제작 중 · 목표 10,000곡 달성 후 유저 업로드 차트 오픈<br>사용자 업로드 시 저작권 <b style="color:#c084fc">사용자 95% · CGO 5%</b>';
      p.appendChild(notice);
    }

    // ── 탭 전환 ─────────────────────────────────────────────────
    _switchTab(tab) {
      this.activeTab = tab;
      this.tabsEl.querySelectorAll('.cgo-mtab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tab);
      });
      Object.keys(this.panels).forEach(k => {
        this.panels[k].style.display = k === tab ? 'block' : 'none';
      });
    }

    // ── 슬롯 그리기 ─────────────────────────────────────────────
    _resizeBg() {
      if (!this.bgCanvas) return;
      this.bgCanvas.width  = this.bgCanvas.offsetWidth  || window.innerWidth;
      this.bgCanvas.height = this.bgCanvas.offsetHeight || 200;
    }
    _resizeSlot(k) {
      const c = this.slotCanvases[k]; if (!c) return;
      c.width  = c.parentElement.offsetWidth  || 160;
      c.height = 42;
    }
    _drawSlot(k, scrollY) {
      const c = this.slotCanvases[k]; const ctx = this.slotCtxs[k];
      if (!ctx || !c) return;
      const W = c.width, H = c.height;
      const items = SLOT_DATA[k].items;
      const ITEM_H = H;
      ctx.clearRect(0, 0, W, H);
      const grad = ctx.createLinearGradient(0,0,0,H);
      grad.addColorStop(0,'rgba(10,0,21,.95)');
      grad.addColorStop(.5,'rgba(30,0,60,.8)');
      grad.addColorStop(1,'rgba(10,0,21,.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,W,H);
      const totalH = items.length * ITEM_H;
      const offsetY = -(scrollY % totalH);
      ctx.save();
      ctx.rect(0,0,W,H); ctx.clip();
      for (let rep = -1; rep <= 1; rep++) {
        items.forEach((item, i) => {
          const y = offsetY + (i + rep * items.length) * ITEM_H;
          if (y > H || y + ITEM_H < 0) return;
          const cx = y + ITEM_H/2;
          const dist = Math.abs(cx - H/2) / (H/2);
          const alpha = Math.max(0.15, 1 - dist * 1.5);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = dist < 0.2 ? '#f0abfc' : '#a78bfa';
          ctx.font = `${dist < 0.2 ? 'bold ' : ''}${Math.max(9, 11 - dist*3)}px 'Apple SD Gothic Neo',sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.length > 12 ? item.slice(0,11)+'…' : item, W/2, cx);
        });
      }
      ctx.restore();
    }

    // ── 배경 파티클 ─────────────────────────────────────────────
    _startBgCanvas() {
      const initP = () => {
        if (!this.bgCanvas) return;
        const n = Math.floor(this.bgCanvas.width * 0.06);
        this.particles = Array.from({length: n}, () => this._newParticle());
      };
      initP();
      const loop = () => {
        if (!this.bgCtx || !this.bgCanvas) return;
        const W = this.bgCanvas.width, H = this.bgCanvas.height;
        this.bgCtx.clearRect(0,0,W,H);
        this.particles.forEach(p => {
          p.y -= p.vy; p.x += p.vx;
          if (p.y < 0 || p.x < 0 || p.x > W) Object.assign(p, this._newParticle());
          this.bgCtx.globalAlpha = p.a;
          this.bgCtx.fillStyle = p.c;
          this.bgCtx.beginPath();
          this.bgCtx.arc(p.x, p.y, p.r, 0, Math.PI*2);
          this.bgCtx.fill();
        });
        this.bgAnimId = requestAnimationFrame(loop);
      };
      this.bgAnimId = requestAnimationFrame(loop);
    }
    _newParticle() {
      const W = this.bgCanvas ? this.bgCanvas.width : 300;
      const H = this.bgCanvas ? this.bgCanvas.height : 200;
      const colors = ['#a855f7','#c084fc','#818cf8','#f0abfc','#7c3aed'];
      return { x:Math.random()*W, y:H+5, r:Math.random()*2+.5, vy:Math.random()*.6+.2, vx:(Math.random()-.5)*.3, a:Math.random()*.45+.1, c:colors[Math.floor(Math.random()*colors.length)] };
    }

    // ── 스핀 ────────────────────────────────────────────────────
    _spinAll() {
      if (this.isSpinning) return;
      this.isSpinning = true;
      const spinBtn = this.root.querySelector('#cgo-spin-btn');
      if (spinBtn) { spinBtn.disabled = true; spinBtn.textContent = '⏳ 추첨 중…'; }
      let done = 0;
      this.slotKeys.forEach((k, i) => {
        setTimeout(() => {
          this._spinOne(k, () => {
            done++;
            if (done === this.slotKeys.length) {
              this.isSpinning = false;
              if (spinBtn) { spinBtn.disabled = false; spinBtn.textContent = '🎰 SPIN · 추첨'; }
              this._updateResult();
              this._setStatus('✨ 추첨 완료! 음악 생성 버튼을 눌러보세요.');
            }
          });
        }, i * 120);
      });
    }
    _spinOne(k, onDone) {
      const items = SLOT_DATA[k].items;
      const targetIdx = Math.floor(Math.random() * items.length);
      this.selected[k] = items[targetIdx];
      const ITEM_H = 42;
      const spinRounds = 3 + Math.random() * 2;
      const startPos = this.slotPositions[k];
      const endPos = targetIdx * ITEM_H + spinRounds * items.length * ITEM_H;
      const dur = 900 + Math.random() * 400;
      const t0 = performance.now();
      const animate = (now) => {
        const elapsed = now - t0;
        const t = Math.min(elapsed / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const pos = startPos + (endPos - startPos) * ease;
        this.slotPositions[k] = pos;
        this._drawSlot(k, pos);
        if (t < 1) {
          this.slotAnimIds[k] = requestAnimationFrame(animate);
        } else {
          this.slotPositions[k] = targetIdx * ITEM_H;
          this._drawSlot(k, targetIdx * ITEM_H);
          const valEl = this.root.querySelector(`#cgo-val-${k}`);
          if (valEl) valEl.textContent = this.selected[k];
          this.slotAnimIds[k] = null;
          if (onDone) onDone();
        }
      };
      if (this.slotAnimIds[k]) cancelAnimationFrame(this.slotAnimIds[k]);
      this.slotAnimIds[k] = requestAnimationFrame(animate);
    }

    // ── 결과 카드 업데이트 ───────────────────────────────────────
    _updateResult() {
      const card = this.root.querySelector('#cgo-result-card');
      if (!card) return;
      const freqOpt = FREQ_OPTIONS.find(f => f.hz === this.selectedFreq) || FREQ_OPTIONS[3];
      card.innerHTML = `
        <div style="font-size:12px;color:#9d8ec4;margin-bottom:8px;">현재 선택</div>
        <div class="cgo-result-tags">
          ${this.slotKeys.map(k => `<span class="cgo-result-tag">${SLOT_DATA[k].emoji} ${this.selected[k]}</span>`).join('')}
          <span class="cgo-result-tag" style="color:${freqOpt.color};border-color:${freqOpt.color}40;">🌊 ${freqOpt.label}</span>
        </div>
      `;
    }

    // ── 주파수 선택 ─────────────────────────────────────────────
    _selectFreq(hz) {
      this.selectedFreq = hz;
      this.root.querySelectorAll('.cgo-freq-btn').forEach(b => {
        b.classList.toggle('active', Number(b.dataset.hz) === hz);
      });
      this._updateResult();
      const freqOpt = FREQ_OPTIONS.find(f => f.hz === hz);
      if (freqOpt) this._setStatus('🌊 ' + freqOpt.label + ' · ' + freqOpt.desc + ' 선택됨');
    }

    // ── Web Audio: 미리 듣기 ────────────────────────────────────
    _quickPlay() {
      if (this.isPlaying) { this._stopAudio(); return; }
      this._startAudio();
    }
    _togglePlay() {
      if (this.isPlaying) this._stopAudio(); else this._startAudio();
    }
    _startAudio() {
      try {
        if (!this.audioCtx) {
          this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        // 기존 노드 정리
        this._cleanAudioNodes();

        const ctx = this.audioCtx;
        this.gainNode = ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 1.2);
        this.gainNode.connect(ctx.destination);

        // 조성에 따른 기본 주파수
        const keyName = this.selected.key || 'A Major';
        const noteName = keyName.split(' ')[0];
        const baseHz = NOTE_FREQ[noteName] || 440;
        const isMinor = keyName.includes('Minor');

        // 장르에 따른 화음 구성
        const intervals = isMinor
          ? [1, 1.189, 1.498, 1.782, 2]         // 단조: 루트·단3도·5도·단7도·옥타브
          : [1, 1.260, 1.498, 1.888, 2];         // 장조: 루트·장3도·5도·장7도·옥타브

        intervals.forEach((ratio, i) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = i === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(baseHz * ratio, ctx.currentTime);
          oscGain.gain.setValueAtTime(i === 0 ? 0.6 : 0.15 - i * 0.02, ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(this.gainNode);
          osc.start();
          this.oscNodes.push({ osc, gain: oscGain });
        });

        // 치료 주파수 오버레이
        if (this.selectedFreq > 0) {
          const hz = this.selectedFreq;
          this.healOsc  = ctx.createOscillator();
          this.healGain = ctx.createGain();
          this.healOsc.type = 'sine';
          this.healOsc.frequency.setValueAtTime(hz < 50 ? 100 + hz : hz, ctx.currentTime);
          this.healGain.gain.setValueAtTime(hz < 50 ? 0.04 : 0.08, ctx.currentTime);
          this.healOsc.connect(this.healGain);
          this.healGain.connect(ctx.destination);
          this.healOsc.start();
        }

        this.isPlaying = true;
        this._updatePlayerUI(true);
        this._setStatus('🎵 미리 듣기 중… (' + (this.selected.key || '') + ' · ' + (FREQ_OPTIONS.find(f=>f.hz===this.selectedFreq)||{label:'OFF'}).label + ')');

        // 30초 후 자동 페이드아웃
        this.playTimerId = setTimeout(() => this._stopAudio(), 30000);

        // 진행바
        this.playProgress = 0;
        const startTime = Date.now();
        const barEl = this.root.querySelector('#cgo-player-bar');
        const barTick = () => {
          if (!this.isPlaying || !barEl) return;
          this.playProgress = Math.min((Date.now() - startTime) / 30000, 1);
          barEl.style.width = (this.playProgress * 100) + '%';
          if (this.playProgress < 1) requestAnimationFrame(barTick);
        };
        requestAnimationFrame(barTick);

      } catch(e) {
        this._setStatus('⚠️ 오디오 시작 실패: ' + e.message);
        console.error('[CGO-MUSIC] Audio Error:', e);
      }
    }
    _stopAudio() {
      clearTimeout(this.playTimerId);
      this._cleanAudioNodes();
      this.isPlaying = false;
      this._updatePlayerUI(false);
      this._setStatus('⏹ 정지됨');
      const barEl = this.root && this.root.querySelector('#cgo-player-bar');
      if (barEl) barEl.style.width = '0%';
    }
    _cleanAudioNodes() {
      this.oscNodes.forEach(n => { try { n.osc.stop(); n.osc.disconnect(); n.gain.disconnect(); } catch(e){} });
      this.oscNodes = [];
      if (this.healOsc)  { try { this.healOsc.stop();  this.healOsc.disconnect();  } catch(e){} this.healOsc = null; }
      if (this.healGain) { try { this.healGain.disconnect(); } catch(e){} this.healGain = null; }
      if (this.gainNode) { try { this.gainNode.disconnect(); } catch(e){} this.gainNode = null; }
    }
    _updatePlayerUI(playing) {
      const playerEl = this.root && this.root.querySelector('#cgo-player');
      if (!playerEl) return;
      if (playing) {
        playerEl.classList.add('visible');
        const titleEl = playerEl.querySelector('#cgo-player-title');
        const subEl   = playerEl.querySelector('#cgo-player-sub');
        const playBtn = playerEl.querySelector('#cgo-player-play');
        const freqOpt = FREQ_OPTIONS.find(f => f.hz === this.selectedFreq) || {label:'OFF'};
        if (titleEl) titleEl.textContent = `${this.selected.genre || ''} · ${this.selected.key || ''}`;
        if (subEl)   subEl.textContent   = `${freqOpt.label} · ${this.selected.instrument || ''}`;
        if (playBtn) playBtn.textContent = '⏸';
      } else {
        const playBtn = playerEl.querySelector('#cgo-player-play');
        if (playBtn) playBtn.textContent = '▶';
      }
    }

    // ── AI 음악 생성 ────────────────────────────────────────────
    _onGenerate() {
      const combo = { key:this.selected.key, time:this.selected.time, genre:this.selected.genre, vocal:this.selected.vocal, instrument:this.selected.instrument, freq:this.selectedFreq };
      this._setStatus('🤖 AI 음악 생성 요청 중…');
      const genBtn = this.root && this.root.querySelector('#cgo-gen-btn');
      if (genBtn) { genBtn.disabled = true; genBtn.textContent = '⏳ 생성 중…'; }
      if (typeof this.onGenerate === 'function') {
        this.onGenerate(combo);
      } else {
        // 데모: 미리 듣기 + 상태 메시지
        this._startAudio();
        setTimeout(() => {
          this._setStatus('✅ AI 음악 생성 완료! (데모 — Groq 연동 후 실제 MIDI 출력)');
          if (genBtn) { genBtn.disabled = false; genBtn.textContent = '✨ AI 음악 생성하기 · 하루 1회 10원'; }
        }, 2000);
      }
    }

    // ── 프리셋 ──────────────────────────────────────────────────
    _loadPresets() {
      try { return JSON.parse(localStorage.getItem('cgo_music_presets') || '[]'); } catch(e){ return []; }
    }
    _savePreset() {
      const label = `${this.selected.genre} · ${this.selected.key}`;
      const p = { label, selected:{...this.selected}, freq:this.selectedFreq, ts:Date.now() };
      this.presets.unshift(p);
      if (this.presets.length > 10) this.presets.length = 10;
      try { localStorage.setItem('cgo_music_presets', JSON.stringify(this.presets)); } catch(e){}
      this._renderPresets();
      this._setStatus('💾 프리셋 저장됨: ' + label);
    }
    _renderPresets() {
      const listEl = this.root && this.root.querySelector('#cgo-preset-list');
      if (!listEl) return;
      listEl.innerHTML = '';
      if (!this.presets.length) {
        listEl.innerHTML = '<p style="font-size:12px;color:#7c6fa8;padding:0 14px;">저장된 조합이 없습니다.<br>추첨통에서 조합을 만들고 저장해보세요.</p>';
        return;
      }
      const bar = document.createElement('div');
      bar.className = 'cgo-preset-bar';
      this.presets.forEach(p => {
        const chip = document.createElement('button');
        chip.className = 'cgo-preset-chip';
        chip.textContent = '⭐ ' + p.label;
        chip.addEventListener('click', () => {
          Object.assign(this.selected, p.selected);
          this.selectedFreq = p.freq || 0;
          this._selectFreq(this.selectedFreq);
          this.slotKeys.forEach(k => {
            const valEl = this.root.querySelector(`#cgo-val-${k}`);
            if (valEl) valEl.textContent = this.selected[k];
          });
          this._updateResult();
          this._setStatus('⭐ 프리셋 불러옴: ' + p.label);
          this._switchTab('make');
        });
        bar.appendChild(chip);
      });
      const saveBtn = document.createElement('button');
      saveBtn.className = 'cgo-preset-save';
      saveBtn.textContent = '+ 현재 조합 저장';
      saveBtn.addEventListener('click', () => this._savePreset());
      bar.appendChild(saveBtn);
      listEl.appendChild(bar);
    }

    // ── 상태 텍스트 ─────────────────────────────────────────────
    _setStatus(msg) {
      const el = this.root && this.root.querySelector('#cgo-status');
      if (el) el.textContent = msg;
    }

    // ── Destroy (탭 이탈 시 메모리 100% 해제) ───────────────────
    destroy() {
      // 1. 오디오 완전 정리
      clearTimeout(this.playTimerId);
      this._cleanAudioNodes();
      if (this.audioCtx) {
        try { this.audioCtx.close(); } catch(e){}
        this.audioCtx = null;
      }
      this.isPlaying = false;

      // 2. 배경 파티클 중단
      if (this.bgAnimId) { cancelAnimationFrame(this.bgAnimId); this.bgAnimId = null; }

      // 3. 슬롯 애니메이션 중단
      this.slotKeys.forEach(k => {
        if (this.slotAnimIds[k]) { cancelAnimationFrame(this.slotAnimIds[k]); this.slotAnimIds[k] = null; }
        if (this.slotCtxs[k] && this.slotCanvases[k]) {
          try { this.slotCtxs[k].clearRect(0,0,this.slotCanvases[k].width,this.slotCanvases[k].height); } catch(e){}
        }
        this.slotCanvases[k] = null;
        this.slotCtxs[k] = null;
      });

      // 4. 배경 Canvas
      if (this.bgCtx && this.bgCanvas) {
        try { this.bgCtx.clearRect(0,0,this.bgCanvas.width,this.bgCanvas.height); } catch(e){}
      }
      this.bgCanvas = null; this.bgCtx = null;

      // 5. resize 리스너 제거
      if (this._onResize) { window.removeEventListener('resize', this._onResize); this._onResize = null; }

      // 6. DOM 제거
      if (this.root && this.root.parentNode) { this.root.parentNode.removeChild(this.root); }
      this.root = null;
      this.particles = [];

      console.log('[Destroy] CGO 주파수 뮤직 메모리 완전 정화됨 ✅');
    }
  }

  global.CGOMusicModule = FrequencyMusicModule;
}(typeof window !== 'undefined' ? window : global));
