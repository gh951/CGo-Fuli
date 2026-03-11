// CGo-Fuli × 오늘의 경기 프록시 v2
// Vercel 서버사이드 → TheSportsDB API (CORS 없음)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=900'); // 15분 캐시
  if (req.method === 'OPTIONS') return res.status(200).end();

  // KST 기준 오늘 날짜 (UTC+9)
  const nowKST = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const todayKST = nowKST.toISOString().slice(0, 10);

  const tomorrow = new Date(nowKST);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKST = tomorrow.toISOString().slice(0, 10);

  const yesterday = new Date(nowKST);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKST = yesterday.toISOString().slice(0, 10);

  // 어제~내일 3일치 조회 (경기 없는 날 대비)
  const dates = [yesterdayKST, todayKST, tomorrowKST];

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
    'Scottish Premiership': '스코틀랜드',
    'Portuguese Primeira Liga': '프리메이라',
  };

  const keepKeywords = [
    'Champions', 'Europa', 'Conference',
    'Premier League', 'La Liga', 'Bundesliga',
    'Serie A', 'Ligue 1', 'K League', 'Eredivisie', 'Primeira', 'Scottish'
  ];

  try {
    const results = await Promise.all(
      dates.map(d =>
        fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${d}&s=Soccer`)
          .then(r => r.json())
          .catch(() => ({ events: [] }))
      )
    );

    const all = results.flatMap(r => r.events || []);

    const filtered = all.filter(e =>
      keepKeywords.some(k => (e.strLeague || '').includes(k))
    );

    // 오늘 KST 기준으로 아직 안 끝난 경기 우선 정렬
    const matches = filtered.slice(0, 16).map(e => {
      let timeStr = '—';
      if (e.strTime && e.strTime.length >= 5) {
        const hh = (parseInt(e.strTime.slice(0, 2), 10) + 9) % 24;
        const mm = e.strTime.slice(3, 5);
        timeStr = `${String(hh).padStart(2, '0')}:${mm}`;
      }
      const leagueKo = leagueKoMap[e.strLeague] || e.strLeague || '';
      return {
        a: e.strHomeTeam || '',
        b: e.strAwayTeam || '',
        league: leagueKo,
        time: timeStr,
        date: e.dateEvent || todayKST,
      };
    });

    return res.status(200).json({
      matches,
      date: todayKST,
      count: matches.length,
      source: 'thesportsdb',
      queried: dates,
    });

  } catch (e) {
    return res.status(200).json({
      matches: [],
      date: todayKST,
      count: 0,
      source: 'error',
      error: e.message
    });
  }
}
