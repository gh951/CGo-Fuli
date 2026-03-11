// CGo-Fuli × 오늘의 경기 프록시 v3
// football-data.org 무료 API (CORS 없음, 키 불필요 기본tier)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=1800');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // KST 기준 오늘
  const nowKST = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const todayKST = nowKST.toISOString().slice(0, 10);
  const tomorrowKST = new Date(nowKST.getTime() + 86400000).toISOString().slice(0, 10);

  const leagueKoMap = {
    'CL':  'UCL',   'EL': 'UEL',   'EC': 'UECL',
    'PL':  'EPL',   'PD': '라리가', 'BL1': '분데스',
    'SA':  '세리에A','FL1': '리그앙','DED': '에레디',
    'PPL': '프리메이라', 'CLI': '코파리베르타',
  };

  // football-data.org 무료 API (경기 날짜 범위 조회)
  const API_KEY = ''; // 무료 tier: 키 없이도 일부 가능, 있으면 더 좋음
  const headers = API_KEY ? { 'X-Auth-Token': API_KEY } : {};

  try {
    // 오늘~내일 UEFA/주요리그 경기 조회
    const url = `https://api.football-data.org/v4/matches?dateFrom=${todayKST}&dateTo=${tomorrowKST}`;
    const r = await fetch(url, { headers });
    const data = await r.json();

    const allMatches = data.matches || [];

    // 주요 리그만 필터
    const keepCodes = ['CL','EL','EC','PL','PD','BL1','SA','FL1'];
    const filtered = allMatches.filter(m =>
      keepCodes.includes(m.competition?.code)
    );

    const matches = filtered.slice(0, 16).map(m => {
      // UTC → KST
      let timeStr = '—';
      if (m.utcDate) {
        const d = new Date(m.utcDate);
        const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
        const hh = String(kst.getUTCHours()).padStart(2, '0');
        const mm = String(kst.getUTCMinutes()).padStart(2, '0');
        timeStr = `${hh}:${mm}`;
      }
      const leagueKo = leagueKoMap[m.competition?.code] || m.competition?.name || '';
      return {
        a: m.homeTeam?.shortName || m.homeTeam?.name || '',
        b: m.awayTeam?.shortName || m.awayTeam?.name || '',
        league: leagueKo,
        time: timeStr,
        date: m.utcDate ? new Date(new Date(m.utcDate).getTime() + 9*3600000).toISOString().slice(0,10) : todayKST,
      };
    });

    return res.status(200).json({
      matches,
      date: todayKST,
      count: matches.length,
      source: 'football-data.org',
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
