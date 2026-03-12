// CGo-Fuli × 오늘의 경기 프록시 v5
// API-Football (무료 100req/일) + TheSportsDB 팀 로고

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=1800');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const API_KEY = 'd687daf8d309411965927954eb397e7f';

  // KST 기준 오늘 날짜
  const nowKST = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const todayKST = nowKST.toISOString().slice(0, 10);

  // 리그 ID → 한국어 매핑 (API-Football 기준)
  const leagueMap = {
    2:   'UCL',      3:   'UEL',      848: 'UECL',
    39:  'EPL',      140: '라리가',   78:  '분데스',
    135: '세리에A',  61:  '리그앙',   88:  '에레디',
    94:  '프리메이라', 292: 'K리그1',  293: 'K리그2',
  };
  const keepLeagueIds = Object.keys(leagueMap).map(Number);

  function utcToKST(utcStr) {
    if (!utcStr) return '—';
    try {
      const d = new Date(utcStr);
      const kst = new Date(d.getTime() + 9 * 3600000);
      return String(kst.getUTCHours()).padStart(2,'0') + ':' + String(kst.getUTCMinutes()).padStart(2,'0');
    } catch(e) { return '—'; }
  }

  try {
    // ── API-Football: 오늘 경기 조회 ─────────────────────
    const fixtureUrl = `https://v3.football.api-sports.io/fixtures?date=${todayKST}&timezone=Asia/Seoul`;
    const r = await fetch(fixtureUrl, {
      headers: {
        'x-apisports-key': API_KEY,
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      }
    });
    const data = await r.json();

    // API 에러 체크
    if (data.errors && Object.keys(data.errors).length > 0) {
      throw new Error(JSON.stringify(data.errors));
    }

    const fixtures = (data.response || []).filter(f =>
      keepLeagueIds.includes(f.league?.id)
    );

    if (fixtures.length === 0) {
      return res.status(200).json({
        matches: [], date: todayKST, count: 0,
        source: 'api-football', note: '오늘 주요리그 경기 없음'
      });
    }

    // ── TheSportsDB: 팀 로고 조회 ─────────────────────────
    // 팀명 목록 수집
    const teamNames = [];
    fixtures.forEach(f => {
      teamNames.push(f.teams?.home?.name);
      teamNames.push(f.teams?.away?.name);
    });

    // TheSportsDB에서 로고 일괄 조회 (팀명 기반)
    const logoCache = {};
    await Promise.all(
      [...new Set(teamNames)].slice(0, 20).map(async name => {
        if (!name) return;
        try {
          const lr = await fetch(
            `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(name)}`
          );
          const ld = await lr.json();
          const team = ld.teams?.[0];
          if (team?.strTeamBadge) logoCache[name] = team.strTeamBadge;
        } catch(e) {}
      })
    );

    // ── 결과 조합 ─────────────────────────────────────────
    const matches = fixtures.slice(0, 16).map(f => {
      const homeName = f.teams?.home?.name || '';
      const awayName = f.teams?.away?.name || '';
      const leagueKo = leagueMap[f.league?.id] || f.league?.name || '';
      const kickoff = utcToKST(f.fixture?.date);

      // 실시간 스코어
      const homeGoals = f.goals?.home;
      const awayGoals = f.goals?.away;
      const status = f.fixture?.status?.short || 'NS'; // NS=미시작, 1H/2H=진행중, FT=종료

      return {
        a: homeName,
        b: awayName,
        league: leagueKo,
        time: kickoff,
        date: todayKST,
        // 추가 데이터
        aLogo: logoCache[homeName] || '',
        bLogo: logoCache[awayName] || '',
        aGoals: homeGoals !== null && homeGoals !== undefined ? homeGoals : null,
        bGoals: awayGoals !== null && awayGoals !== undefined ? awayGoals : null,
        status: status,
        fixtureId: f.fixture?.id || '',
        leagueId: f.league?.id || '',
        leagueLogo: f.league?.logo || '',
      };
    });

    return res.status(200).json({
      matches,
      date: todayKST,
      count: matches.length,
      source: 'api-football',
      remaining: data.response ? `${100 - (data.parameters?.length||0)}/100` : '?',
    });

  } catch(e) {
    return res.status(200).json({
      matches: [], date: todayKST, count: 0,
      source: 'error', error: e.message
    });
  }
}
