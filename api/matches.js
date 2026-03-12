// CGo-Fuli × 오늘의 경기 프록시 v7
// API-Football 실시간 + 글로벌 타임존 자동 최적화

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=1800');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const API_KEY = 'd687daf8d309411965927954eb397e7f';

  // 클라이언트 타임존 수신 (없으면 Asia/Seoul 기본)
  const clientTZ = req.query.tz || 'Asia/Seoul';

  // 클라이언트 타임존 기준 오늘 날짜 계산
  const nowLocal = new Date(new Date().toLocaleString('en-US', { timeZone: clientTZ }));
  const todayStr = nowLocal.getFullYear() + '-'
    + String(nowLocal.getMonth()+1).padStart(2,'0') + '-'
    + String(nowLocal.getDate()).padStart(2,'0');

  // UTC→클라이언트 타임존 시간 변환
  function toLocalTime(utcStr) {
    if (!utcStr) return '—';
    try {
      const d = new Date(utcStr);
      const local = new Date(d.toLocaleString('en-US', { timeZone: clientTZ }));
      return String(local.getHours()).padStart(2,'0') + ':' + String(local.getMinutes()).padStart(2,'0');
    } catch(e) { return '—'; }
  }

  const leagueMap = {
    2:'UCL', 3:'UEL', 848:'UECL',
    39:'EPL', 140:'라리가', 78:'분데스',
    135:'세리에A', 61:'리그앙', 88:'에레디',
    94:'프리메이라', 292:'K리그1', 293:'K리그2',
  };
  const keepIds = Object.keys(leagueMap).map(Number);

  const teamKoMap = {
    'Bayer Leverkusen':'레버쿠젠','Arsenal':'아스널',
    'Real Madrid':'레알 마드리드','Manchester City':'맨시티',
    'Paris Saint Germain':'파리 생제르맹','Chelsea':'첼시',
    'Bodo/Glimt':'보되/글림트','Sporting CP':'스포르팅 CP',
    'Barcelona':'바르셀로나','Atletico Madrid':'아틀레티코',
    'Bayern Munich':'바이에른','Borussia Dortmund':'도르트문트',
    'Inter Milan':'인터밀란','Liverpool':'리버풀',
    'Manchester United':'맨유','Tottenham Hotspur':'토트넘',
    'AC Milan':'AC밀란','Juventus':'유벤투스','Napoli':'나폴리',
    'Porto':'포르투','Benfica':'벤피카','Ajax':'아약스',
    'PSV Eindhoven':'PSV','Sevilla':'세비야',
    'Real Sociedad':'레알 소시에다드','Monaco':'모나코',
    'RB Leipzig':'RB 라이프치히','Eintracht Frankfurt':'프랑크푸르트',
    'Roma':'AS 로마','Lazio':'라치오','Fiorentina':'피오렌티나',
    'Marseille':'마르세유','Lyon':'리옹',
    'Jeonbuk Hyundai':'전북 현대','Ulsan HD':'울산 HD',
    'Incheon United':'인천 유나이티드','Seoul':'서울 FC',
    'Pohang Steelers':'포항 스틸러스',
  };
  function toKo(name){ return teamKoMap[name] || name; }

  try {
    const r = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${todayStr}&timezone=${encodeURIComponent(clientTZ)}`,
      { headers: { 'x-apisports-key': API_KEY } }
    );
    const data = await r.json();

    if (data.errors && Object.keys(data.errors).length > 0)
      throw new Error(JSON.stringify(data.errors));

    const fixtures = (data.response || []).filter(f => keepIds.includes(f.league?.id));
    if (fixtures.length === 0)
      return res.status(200).json({ matches:[], date:todayStr, count:0, source:'api-football', tz:clientTZ, note:'오늘 주요리그 경기 없음' });

    // TheSportsDB 로고
    const logoCache = {};
    const uniqueTeams = [...new Set(fixtures.flatMap(f=>[f.teams?.home?.name,f.teams?.away?.name]).filter(Boolean))];
    await Promise.all(uniqueTeams.slice(0,12).map(async name => {
      try {
        const lr = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(name)}`);
        const ld = await lr.json();
        const team = ld.teams?.[0];
        if (team?.strTeamBadge) { logoCache[name]=team.strTeamBadge; logoCache[toKo(name)]=team.strTeamBadge; }
      } catch(e) {}
    }));

    const matches = fixtures.slice(0,16).map(f => {
      const homeEn = f.teams?.home?.name||'';
      const awayEn = f.teams?.away?.name||'';
      return {
        a: toKo(homeEn), b: toKo(awayEn),
        league: leagueMap[f.league?.id] || f.league?.name || '',
        time: toLocalTime(f.fixture?.date),   // 클라이언트 로컬 시간
        timeUTC: f.fixture?.date || '',
        date: todayStr,
        aLogo: logoCache[homeEn]||f.teams?.home?.logo||'',
        bLogo: logoCache[awayEn]||f.teams?.away?.logo||'',
        aGoals: f.goals?.home ?? null,
        bGoals: f.goals?.away ?? null,
        status: f.fixture?.status?.short || 'NS',
        fixtureId: f.fixture?.id || '',
      };
    });

    return res.status(200).json({ matches, date:todayStr, count:matches.length, source:'api-football', tz:clientTZ });

  } catch(e) {
    return res.status(200).json({ matches:[], date:todayStr, count:0, source:'error', error:e.message, tz:clientTZ });
  }
}
