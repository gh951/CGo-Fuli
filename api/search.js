// CGo-Fuli × 스포츠 검색 프록시
// Vercel 서버사이드에서 Brave Search API 호출 → CORS 문제 없음
// 배포 위치: /api/search.js

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error:'Method Not Allowed'});

  const { query } = req.body || {};
  if (!query) return res.status(400).json({error:'query required'});

  // Brave Search API (무료 2000회/월)
  // 키 발급: https://api.search.brave.com/app/keys
  const BRAVE_KEY = process.env.BRAVE_SEARCH_KEY || '';

  if (!BRAVE_KEY) {
    // 키 없으면 Wikipedia 검색으로 폴백 (완전 무료)
    return wikiSearch(query, res);
  }

  try {
    const url = 'https://api.search.brave.com/res/v1/web/search?q='
      + encodeURIComponent(query)
      + '&count=5&lang=ko&country=KR&text_decorations=false';

    const r = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': BRAVE_KEY
      }
    });
    const data = await r.json();

    // 결과 텍스트 수집
    const snippets = [];
    if (data.web && data.web.results) {
      data.web.results.slice(0, 4).forEach(item => {
        if (item.description) snippets.push(item.title + ': ' + item.description);
      });
    }
    if (data.infobox && data.infobox.description) {
      snippets.unshift(data.infobox.description);
    }

    return res.status(200).json({ results: snippets.join('\n\n'), source: 'brave' });

  } catch (e) {
    return wikiSearch(query, res);
  }
}

// Wikipedia 검색 폴백 (키 불필요, 완전 무료)
async function wikiSearch(query, res) {
  try {
    // 1) Wikipedia 검색
    const searchUrl = 'https://ko.wikipedia.org/w/api.php?action=query&list=search'
      + '&srsearch=' + encodeURIComponent(query)
      + '&srlimit=3&format=json&origin=*';
    const sr = await fetch(searchUrl);
    const sd = await sr.json();
    const pages = (sd.query && sd.query.search) || [];

    if (pages.length === 0) {
      // 영어 Wikipedia 시도
      const enUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search'
        + '&srsearch=' + encodeURIComponent(query)
        + '&srlimit=3&format=json&origin=*';
      const enr = await fetch(enUrl);
      const end = await enr.json();
      const enPages = (end.query && end.query.search) || [];
      if (enPages.length === 0) return res.status(200).json({ results: '', source: 'none' });

      const snippets = enPages.map(p => p.title + ': ' + p.snippet.replace(/<[^>]+>/g,''));
      return res.status(200).json({ results: snippets.join('\n\n'), source: 'wikipedia_en' });
    }

    // 2) 첫 번째 결과 전문 가져오기
    const title = pages[0].title;
    const extractUrl = 'https://ko.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title);
    const er = await fetch(extractUrl);
    const ed = await er.json();
    const extract = ed.extract || pages.map(p => p.title + ': ' + p.snippet.replace(/<[^>]+>/g,'')).join('\n');

    return res.status(200).json({ results: extract, source: 'wikipedia_ko' });

  } catch(e) {
    return res.status(200).json({ results: '', source: 'error', error: e.message });
  }
}
