// CGo-Fuli × 오늘의 경기 프록시 v4
// 여러 소스 자동 폭포수(Waterfall) 방식 - 키 불필요

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=1800');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // KST 기준 오늘/내일
  const nowKST = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const todayKST = nowKST.toISOString().slice(0, 10);
  const tomorrowKST = new Date(nowKST.getTime() + 86400000).toISOString().slice(0, 10);
  const yesterdayKST = new Date(nowKST.getTime() - 86400000).toISOString().slice(0, 10);

  const leagueKoMap = {
    'UEFA Champions League': 'UCL', 'UEFA Europa League': 'UEL',
    'UEFA Conference League': 'UECL', 'English Premier League': 'EPL',
    'Spanish La Liga': '라리가', 'German Bundesliga': '분데스',
    'Italian Serie A': '세리에A', 'French Ligue 1': '리그앙',
    'K League 1': 'K리그1', 'K League 2': 'K리그2',
    'Dutch Eredivisie': '에레디', 'Portuguese Primeira Liga': '프리메이라',
  };
  const keepKeywords = ['Champions','Europa','Conference','Premier League',
    'La Liga','Bundesliga','Serie A','Ligue 1','K League','Eredivisie','Primeira'];

  function utcToKST(utcStr) {
    if (!utcStr) return '—';
    try {
      const d = new Date(utcStr);
      const kst = new Date(d.getTime() + 9 * 3600000);
      return String(kst.getUTCHours()).padStart(2,'0') + ':' + String(kst.getUTCMinutes()).padStart(2,'0');
    } catch(e) { return '—'; }
  }

  // ── 소스 1: TheSportsDB (무료, 3일치 시도) ───────────────
  async function tryTheSportsDB() {
    const dates = [yesterdayKST, todayKST, tomorrowKST];
    const results = await Promise.all(
      dates.map(d => fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${d}&s=Soccer`)
        .then(r => r.json()).catch(() => ({events:[]})))
    );
    const all = results.flatMap(r => r.events || []);
    const filtered = all.filter(e => keepKeywords.some(k => (e.strLeague||'').includes(k)));
    if (filtered.length === 0) throw new Error('no data');
    return filtered.slice(0,16).map(e => ({
      a: e.strHomeTeam||'', b: e.strAwayTeam||'',
      league: leagueKoMap[e.strLeague] || e.strLeague || '',
      time: e.strTime ? (() => {
        const hh=(parseInt(e.strTime.slice(0,2),10)+9)%24;
        return String(hh).padStart(2,'0')+':'+e.strTime.slice(3,5);
      })() : '—',
      date: e.dateEvent || todayKST,
    }));
  }

  // ── 소스 2: football-data.org (무료 기본) ────────────────
  async function tryFootballData() {
    const url = `https://api.football-data.org/v4/matches?dateFrom=${yesterdayKST}&dateTo=${tomorrowKST}`;
    const r = await fetch(url);
    const data = await r.json();
    const keepCodes = ['CL','EL','EC','PL','PD','BL1','SA','FL1'];
    const codeMap = {'CL':'UCL','EL':'UEL','EC':'UECL','PL':'EPL','PD':'라리가','BL1':'분데스','SA':'세리에A','FL1':'리그앙'};
    const filtered = (data.matches||[]).filter(m => keepCodes.includes(m.competition?.code));
    if (filtered.length === 0) throw new Error('no data');
    return filtered.slice(0,16).map(m => ({
      a: m.homeTeam?.shortName || m.homeTeam?.name || '',
      b: m.awayTeam?.shortName || m.awayTeam?.name || '',
      league: codeMap[m.competition?.code] || '',
      time: utcToKST(m.utcDate),
      date: m.utcDate ? new Date(new Date(m.utcDate).getTime()+9*3600000).toISOString().slice(0,10) : todayKST,
    }));
  }

  // ── 소스 3: ESPN 공개 API (키 없음) ─────────────────────
  async function tryESPN() {
    const competitions = [
      {code:'uefa.champions', name:'UCL'},
      {code:'eng.1', name:'EPL'},
      {code:'esp.1', name:'라리가'},
      {code:'ger.1', name:'분데스'},
      {code:'ita.1', name:'세리에A'},
      {code:'fra.1', name:'리그앙'},
    ];
    const results = await Promise.all(
      competitions.map(comp =>
        fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${comp.code}/scoreboard?dates=${todayKST.replace(/-/g,'')}`)
          .then(r => r.json())
          .then(d => (d.events||[]).map(e => {
            const comp2 = e.competitions?.[0];
            const home = comp2?.competitors?.find(c=>c.homeAway==='home');
            const away = comp2?.competitors?.find(c=>c.homeAway==='away');
            const dateStr = e.date ? utcToKST(e.date) : '—';
            return {
              a: home?.team?.shortDisplayName || home?.team?.displayName || '',
              b: away?.team?.shortDisplayName || away?.team?.displayName || '',
              league: comp.name, time: dateStr, date: todayKST,
            };
          }))
          .catch(() => [])
      )
    );
    const all = results.flat().filter(m => m.a && m.b);
    if (all.length === 0) throw new Error('no data');
    return all;
  }

  // ── 폭포수 실행 ──────────────────────────────────────────
  const sources = [
    { name: 'ESPN',           fn: tryESPN },
    { name: 'TheSportsDB',    fn: tryTheSportsDB },
    { name: 'football-data',  fn: tryFootballData },
  ];

  for (const source of sources) {
    try {
      const matches = await source.fn();
      if (matches && matches.length > 0) {
        return res.status(200).json({
          matches, date: todayKST, count: matches.length, source: source.name
        });
      }
    } catch(e) {
      console.log(`[${source.name}] 실패:`, e.message);
    }
  }

  // 모두 실패
  return res.status(200).json({ matches:[], date:todayKST, count:0, source:'all-failed' });
}
