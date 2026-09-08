// ══════════════════════════════════════════════════════════════
//  /api/matches  —  오늘의 경기 한 자리
//
//  앱이 부르는 모양      /api/matches?tz=Asia%2FSeoul
//  앱이 기다리는 답      { matches: [...] }  (API-Sports 원본 그대로 중계)
//
//  ★ 왜 서버를 거치나 — API-Sports 는 브라우저 직접 호출을 CORS로 막는다.
//    열쇠도 서버에만 두고, 여기서 대신 불러 그대로 돌려준다.
//
//  ★ 60초 기억 — 같은 날짜는 여러 손님이 눌러도 밖으로는 드물게 나간다.
// ══════════════════════════════════════════════════════════════

const API_KEY = process.env.API_SPORTS_KEY || 'a2b817796a2948f1345add5506099cda';

const CACHE = new Map();
const TTL = 60 * 1000;

function cacheGet(k) {
  const hit = CACHE.get(k);
  if (!hit) return null;
  if (Date.now() - hit.at > TTL) { CACHE.delete(k); return null; }
  return hit.v;
}
function cacheSet(k, v) {
  CACHE.set(k, { v, at: Date.now() });
  if (CACHE.size > 100) {
    const first = CACHE.keys().next().value;
    CACHE.delete(first);
  }
}

async function askFootball(date, tz) {
  const url = 'https://v3.football.api-sports.io/fixtures?date=' + encodeURIComponent(date)
    + '&timezone=' + encodeURIComponent(tz);
  const r = await fetch(url, { headers: { 'x-apisports-key': API_KEY } });
  if (!r.ok) return [];
  const j = await r.json();
  const out = (j && j.response) || [];
  return out.map(m => ({
    league: (m.league && m.league.name) || '',
    leagueId: (m.league && m.league.id) || 0,
    country: (m.league && m.league.country) || '',
    a: (m.teams && m.teams.home && m.teams.home.name) || '',
    b: (m.teams && m.teams.away && m.teams.away.name) || '',
    aScore: (m.goals && m.goals.home) != null ? m.goals.home : null,
    bScore: (m.goals && m.goals.away) != null ? m.goals.away : null,
    status: (m.fixture && m.fixture.status && m.fixture.status.short) || '',
    date: (m.fixture && m.fixture.date) || '',
    type: 'soccer'
  }));
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  try {
    const q = req.query || {};
    const tz = String(q.tz || 'Asia/Seoul').trim();
    const today = new Date().toISOString().slice(0, 10);

    const key = today + '|' + tz;
    const hit = cacheGet(key);
    if (hit) return res.status(200).json(hit);

    const matches = await askFootball(today, tz);
    const out = { matches };
    cacheSet(key, out);
    return res.status(200).json(out);

  } catch (e) {
    return res.status(200).json({ matches: [], error: String((e && e.message) || e) });
  }
};
