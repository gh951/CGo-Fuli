// ══════════════════════════════════════════════════════════════════
//  /api/news  —  진짜 기사만 가져오는 문
//
//  왜 이 파일이 있는가
//    AI 는 인터넷을 보지 못한다. 「신문 기준으로 출처를 밝혀라」 하면
//    없는 기사와 없는 링크를 지어낸다. 실존하는 언론사 이름을 도용한
//    허위 기사가 되므로, 출처를 안 밝히는 것보다 더 위험하다.
//
//    그래서 순서를 뒤집는다.
//      ① 우리가 먼저 실제 기사 제목을 가져온다  ← 이 파일
//      ② 그것만 AI 에게 넘긴다
//      ③ AI 는 준 것 밖으로 나가지 못한다
//
//  쓰는 곳:  Google News RSS — 열쇠가 필요 없고, 항목마다 언론사가 붙는다.
//            언어·나라를 주소로 고를 수 있어 20개 언어를 그대로 받는다.
//
//  앱이 보내는 것   { lang:'ko', topic:'business'|'world', n:8 }
//  돌려주는 것      { items:[{title, source, link, at}], topic, lang, cachedAt }
// ══════════════════════════════════════════════════════════════════

// 언어 → Google News 의 hl / gl / ceid
const LOCALE = {
  ko:['ko','KR','KR:ko'],      en:['en-US','US','US:en'],   ja:['ja','JP','JP:ja'],
  zh:['zh-CN','CN','CN:zh-Hans'], zh_HK:['zh-HK','HK','HK:zh-Hant'],
  ru:['ru','RU','RU:ru'],      es:['es','ES','ES:es'],      fr:['fr','FR','FR:fr'],
  de:['de','DE','DE:de'],      pt:['pt-BR','BR','BR:pt-419'], it:['it','IT','IT:it'],
  nl:['nl','NL','NL:nl'],      vi:['vi','VN','VN:vi'],      th:['th','TH','TH:th'],
  id:['id','ID','ID:id'],      ms:['ms-MY','MY','MY:ms'],   tl:['en-PH','PH','PH:en'],
  tr:['tr','TR','TR:tr'],      hi:['hi','IN','IN:hi'],      ar:['ar','EG','EG:ar']
};

const TOPIC = { business: 'BUSINESS', world: 'WORLD' };

// 같은 언어·주제는 15분 동안 다시 받지 않는다.
// 손님 백 명이 같은 15분에 들어와도 바깥에는 한 번만 나간다.
const cache = new Map();          // 'lang|topic' → { at, items }
const TTL = 15 * 60 * 1000;

function unescapeXml(s) {
  return String(s || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '')       // 제목에 섞여 오는 태그를 떤다
    .replace(/\s+/g, ' ')
    .trim();
}

// RSS 를 손으로 읽는다 — 이 한 가지 모양만 읽으면 되니 꾸러미를 들이지 않는다
function parseRss(xml, limit) {
  const out = [];
  const items = String(xml).split(/<item\b/).slice(1);
  for (const raw of items) {
    if (out.length >= limit) break;
    const g = (tag) => {
      const m = raw.match(new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)<\\/' + tag + '>'));
      return m ? unescapeXml(m[1]) : '';
    };
    let title = g('title');
    const link = g('link');
    const at = g('pubDate');
    let source = g('source');

    // Google News 는 제목 끝에 " - 언론사" 를 붙인다. 갈라서 출처로 옮긴다.
    if (!source) {
      const cut = title.lastIndexOf(' - ');
      if (cut > 12) { source = title.slice(cut + 3).trim(); title = title.slice(0, cut).trim(); }
    } else {
      const tail = ' - ' + source;
      if (title.endsWith(tail)) title = title.slice(0, -tail.length).trim();
    }

    if (!title || title.length < 8) continue;
    out.push({ title, source: source || '', link, at });
  }
  return out;
}

export default async function handler(req, res) {
  const q = req.method === 'POST' ? (req.body || {}) : (req.query || {});
  const lang = LOCALE[q.lang] ? q.lang : 'en';
  const topic = TOPIC[q.topic] ? q.topic : 'business';
  const n = Math.max(3, Math.min(parseInt(q.n, 10) || 8, 12));

  const key = lang + '|' + topic;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) {
    return res.status(200).json({
      items: hit.items.slice(0, n), topic, lang, cachedAt: hit.at, cached: true
    });
  }

  const [hl, gl, ceid] = LOCALE[lang];
  const url = 'https://news.google.com/rss/headlines/section/topic/' + TOPIC[topic]
            + '?hl=' + hl + '&gl=' + gl + '&ceid=' + encodeURIComponent(ceid);

  try {
    const r = await fetch(url, {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; CGO-FULI/1.0)' }
    });
    if (!r.ok) throw new Error('rss ' + r.status);
    const items = parseRss(await r.text(), 12);

    if (!items.length) throw new Error('empty');

    cache.set(key, { at: Date.now(), items });
    if (cache.size > 80) cache.clear();

    // 앱이 화면에 그대로 띄울 수 있도록 제목·언론사·링크를 있는 그대로 돌려준다.
    // 요약하지 않는다 — 요약하면 그 말의 책임이 우리에게 온다.
    return res.status(200).json({ items: items.slice(0, n), topic, lang, cachedAt: Date.now() });
  } catch (e) {
    // 못 받아 오면 빈 손으로 돌려준다. 지어내지 않는다.
    // 앱은 빈 손이면 그 갈래를 조용히 끈다.
    return res.status(200).json({ items: [], topic, lang, error: String(e && e.message || e) });
  }
}
