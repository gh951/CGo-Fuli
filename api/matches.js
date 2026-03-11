// CGo-Fuli × 오늘의 경기 프록시
// Vercel 서버사이드 → TheSportsDB API 호출 (CORS 없음)
// 배포 위치: /api/matches.js

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=1800'); // 30분 캐시
  if (req.method === 'OPTIONS') return res.status(200).end();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const fmt = d => d.toISOString().slice(0, 10);

  try {
    // 오늘 + 내일 Soccer 경기 동시 조회
    const [r1, r2] = await Promise.all([
      fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${fmt(today)}&s=Soccer`),
      fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${fmt(tomorrow)}&s=Soccer`),
    ]);
    const [d1, d2] = await Promise.all([r1.json(), r2.json()]);

    const all = [...(d1.events || []), ...(d2.events || [])];

    // 유럽·한국 주요 리그 필터
    const keepLeagues = [
      'UEFA Champions League', 'UEFA Europa League', 'UEFA Conference League',
      'English Premier League', 'Spanish La Liga', 'German Bundesliga',
      'Italian Serie A', 'French Ligue 1', 'Dutch Eredivisie',
      'K League 1', 'K League 2', 'Portuguese Primeira Liga', 'Scottish Premiership',
    ];
    const leagueKoMap = {
      'UEFA Champions League': 'UCL',
      'UEFA Europa League': 'UEL',
      'UEFA Conference League': 'UECL',
      'English Premier League': 'EPL',
      'Spanish La Liga': '라리가',
      'German Bundesliga': '분데스',
      'Italian Serie A': '세리에A',
      'French Ligue 1': '리그앙',
      'Dutch Eredivisie': '에레디',
      'K League 1': 'K리그1',
      'K League 2': 'K리그2',
      'Portuguese Primeira Liga': '프리메이라',
      'Scottish Premiership': '스코틀랜드',
    };

    const filtered = all.filter(e =>
      keepLeagues.some(l => (e.strLeague || '').includes(l.split(' ')[0]))
    );

    const matches = filtered.slice(0, 16).map(e => {
      // UTC → KST
      let timeStr = '—';
      if (e.strTime && e.strTime.length >= 5) {
        const hh = (parseInt(e.strTime.slice(0,2), 10) + 9) % 24;
        const mm = e.strTime.slice(3, 5);
        timeStr = `${String(hh).padStart(2,'0')}:${mm}`;
      }
      const leagueKo = leagueKoMap[e.strLeague] || e.strLeague || '';
      return {
        a: e.strHomeTeam || '',
        b: e.strAwayTeam || '',
        league: leagueKo,
        time: timeStr,
        date: e.dateEvent || fmt(today),
        idEvent: e.idEvent || '',
      };
    });

    return res.status(200).json({ matches, date: fmt(today), count: matches.length, source: 'thesportsdb' });

  } catch (e) {
    return res.status(200).json({ matches: [], date: fmt(today), count: 0, source: 'error', error: e.message });
  }
}
