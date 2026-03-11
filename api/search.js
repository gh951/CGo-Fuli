// CGo-Fuli × 스포츠 데이터 프록시 v3
// 1차: TheSportsDB (무료, CORS OK) → 실시간 경기 일정/결과
// 2차: Wikipedia 한/영 검색 → 전적/역사
// 배포 위치: /api/search.js

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error:'Method Not Allowed'});

  const { query } = req.body || {};
  if (!query) return res.status(400).json({error:'query required'});

  // ── 쿼리 의도 분류 ─────────────────────────────────────
  const isSchedule  = /일정|경기|오늘|내일|이번주|다음주|언제|몇시|schedule|fixture/i.test(query);
  const isResult    = /결과|스코어|이겼|졌|비겼|몇대몇|outcome|result/i.test(query);
  const isStanding  = /순위|standings|table|몇위/i.test(query);
  const isH2H       = /전적|통산|맞대결|head.to.head/i.test(query);

  // ── 팀/리그명 영어 변환 ────────────────────────────────
  const leagueMap = {
    '챔피언스리그': 'UEFA Champions League',
    'UEFA 챔피언스리그': 'UEFA Champions League',
    'UCL': 'UEFA Champions League',
    '유로파리그': 'UEFA Europa League',
    '프리미어리그': 'English Premier League',
    'EPL': 'English Premier League',
    '라리가': 'Spanish La Liga',
    '분데스리가': 'German Bundesliga',
    '세리에A': 'Italian Serie A',
    '리그앙': 'French Ligue 1',
  };
  const teamMap = {
    '레버쿠젠':'Bayer Leverkusen', '아스날':'Arsenal',
    '맨유':'Manchester United', '맨체스터 유나이티드':'Manchester United',
    '맨시티':'Manchester City', '맨체스터 시티':'Manchester City',
    '첼시':'Chelsea', '리버풀':'Liverpool', '토트넘':'Tottenham Hotspur',
    '바르셀로나':'Barcelona', '레알마드리드':'Real Madrid',
    '레알 마드리드':'Real Madrid', '바이에른':'Bayern Munich',
    '바이에른 뮌헨':'Bayern Munich', '도르트문트':'Borussia Dortmund',
    '파리 생제르망':'Paris Saint-Germain', 'PSG':'Paris Saint-Germain',
    '유벤투스':'Juventus', '인터밀란':'Inter Milan', 'AC밀란':'AC Milan',
    '아틀레티코':'Atletico Madrid', '포르투':'FC Porto', '벤피카':'Benfica',
    '셀틱':'Celtic', '레인저스':'Rangers', '아약스':'Ajax',
  };

  // 영어 쿼리 변환
  let engQuery = query;
  Object.entries(leagueMap).forEach(([k,v]) => { engQuery = engQuery.replace(new RegExp(k,'g'), v); });
  Object.entries(teamMap).forEach(([k,v]) => { engQuery = engQuery.replace(new RegExp(k,'g'), v); });
  engQuery = engQuery
    .replace(/일정|경기 일정/g, 'fixtures schedule')
    .replace(/전적/g, 'head to head record')
    .replace(/순위/g, 'standings')
    .replace(/내일/g, 'tomorrow')
    .replace(/이번주/g, 'this week')
    .replace(/다음주/g, 'next week');

  // ── 날짜 계산 ──────────────────────────────────────────
  const now = new Date();
  const todayStr = now.toISOString().slice(0,10);
  const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate()+1);
  const tomorrowStr = tomorrow.toISOString().slice(0,10);
  const nextWeek = new Date(now); nextWeek.setDate(nextWeek.getDate()+7);
  const nextWeekStr = nextWeek.toISOString().slice(0,10);

  // ── TheSportsDB 리그 ID 매핑 ───────────────────────────
  const LEAGUE_IDS = {
    'UEFA Champions League': '493',
    'UEFA Europa League': '531',
    'English Premier League': '4328',
    'Spanish La Liga': '4335',
    'German Bundesliga': '4331',
    'Italian Serie A': '4332',
    'French Ligue 1': '4334',
  };

  // 쿼리에서 리그 감지
  let detectedLeague = null;
  for (const [ko, en] of Object.entries(leagueMap)) {
    if (query.includes(ko) || query.includes(en)) {
      detectedLeague = en;
      break;
    }
  }
  // 기본값: 경기 일정 질문이면 UCL
  if (!detectedLeague && (isSchedule || isResult)) {
    detectedLeague = 'UEFA Champions League';
  }

  const results = [];
  let source = 'none';

  try {
    // ══ 1단계: TheSportsDB - 실시간 경기 일정/결과 ══════
    if (isSchedule || isResult) {
      const dateTarget = query.includes('내일') ? tomorrowStr : todayStr;
      const dateEnd = (query.includes('이번주') || query.includes('다음주'))
        ? nextWeekStr : (query.includes('내일') ? tomorrowStr : todayStr);

      // 날짜별 전체 경기 조회
      const urls = [];
      // 오늘~내일 경기 조회
      const d1 = new Date(dateTarget);
      for (let i=0; i<=7; i++) {
        const d = new Date(d1); d.setDate(d.getDate()+i);
        const ds = d.toISOString().slice(0,10);
        urls.push(`https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${ds}&s=Soccer`);
        if (i >= (query.includes('이번주')||query.includes('다음주') ? 6 : 1)) break;
      }

      const fetches = await Promise.allSettled(urls.map(u => fetch(u).then(r=>r.json())));
      const allEvents = [];
      fetches.forEach(f => {
        if (f.status==='fulfilled' && f.value && f.value.events) {
          allEvents.push(...f.value.events);
        }
      });

      // 유럽 주요 리그 필터
      const euroLeagues = ['UEFA','Premier League','La Liga','Bundesliga','Serie A','Ligue 1',
        'Champions','Europa','Champions League'];
      const filtered = allEvents.filter(e => {
        const league = (e.strLeague||'');
        return euroLeagues.some(l => league.includes(l));
      });

      // 리그별 필터 (특정 리그 요청 시)
      const targetEvents = detectedLeague
        ? filtered.filter(e => (e.strLeague||'').includes(
            detectedLeague.replace('UEFA ','').replace(' League','').split(' ')[0]
          ))
        : filtered;

      if (targetEvents.length > 0) {
        // 날짜·시간순 정렬
        targetEvents.sort((a,b) => (a.dateEvent+a.strTime) > (b.dateEvent+b.strTime) ? 1 : -1);

        let schedText = `📅 ${detectedLeague||'유럽 축구'} 경기 일정 (${dateTarget} 기준)\n\n`;
        // 날짜별 그룹핑
        const byDate = {};
        targetEvents.slice(0,20).forEach(e => {
          const d = e.dateEvent || '날짜미정';
          if (!byDate[d]) byDate[d] = [];
          // KST 변환 (UTC+9)
          let timeStr = e.strTime ? e.strTime.slice(0,5) : '시간미정';
          if (timeStr !== '시간미정') {
            const [hh, mm] = timeStr.split(':').map(Number);
            const kst = (hh + 9) % 24;
            timeStr = `${String(kst).padStart(2,'0')}:${String(mm).padStart(2,'0')} KST`;
          }
          byDate[d].push(`  ${e.strHomeTeam} vs ${e.strAwayTeam}  ${timeStr}`);
        });

        Object.entries(byDate).forEach(([date, games]) => {
          // 날짜 한국어 포맷
          const dt = new Date(date);
          const dow = ['일','월','화','수','목','금','토'][dt.getDay()];
          schedText += `【${date} (${dow})】\n`;
          schedText += games.join('\n') + '\n\n';
        });

        results.push(schedText.trim());
        source = 'thesportsdb_live';
      }
    }

    // ══ 2단계: Wikipedia 한/영 검색 (전적/역사) ══════════
    if (isH2H || results.length === 0) {
      const [koR, enR] = await Promise.allSettled([
        wikiSearchLang(query, 'ko'),
        wikiSearchLang(engQuery, 'en'),
      ]);
      if (koR.status==='fulfilled' && koR.value) results.push(koR.value);
      if (enR.status==='fulfilled' && enR.value) results.push('[EN] '+enR.value);
      if (results.length > 0 && source === 'none') source = 'wikipedia';
    }

  } catch(e) {
    console.error('Search error:', e.message);
  }

  return res.status(200).json({
    results: results.join('\n\n---\n\n'),
    source,
    today: todayStr,
    detectedLeague,
  });
}

async function wikiSearchLang(query, lang) {
  try {
    const base = `https://${lang}.wikipedia.org`;
    const sr = await fetch(`${base}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=3&format=json&origin=*`);
    const sd = await sr.json();
    const pages = (sd.query&&sd.query.search)||[];
    if (!pages.length) return '';
    const er = await fetch(`${base}/api/rest_v1/page/summary/${encodeURIComponent(pages[0].title)}`);
    const ed = await er.json();
    const extract = ed.extract ? ed.extract.slice(0,600) : '';
    const snippets = pages.slice(0,2).map(p=>p.title+': '+p.snippet.replace(/<[^>]+>/g,'')).join('\n');
    return extract || snippets;
  } catch(e) { return ''; }
}
