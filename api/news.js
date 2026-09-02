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


// ══════════════════════════════════════════════════════════════════
//  종목 뉴스의 「기운」 — 받아온 제목의 낱말로 오행을 셈한다.
//  AI 를 부르지 않는다. 값 0원이고, 지어낼 여지도 없다.
// ══════════════════════════════════════════════════════════════════
const MOOD_KW = {
  // 오행    올림 낱말                                          내림 낱말
  화: { up:['급등','상승','신고가','호재','수주','흑자','최대','돌파','surge','soar','jump','record','beat','rally'],
        dn:['급락','하락','악재','적자','손실','plunge','slump','drop','miss','loss'] },
  목: { up:['성장','확장','신제품','투자','증설','진출','launch','expand','growth','invest','partnership'],
        dn:['철수','중단','지연','delay','halt','withdraw'] },
  금: { up:['배당','자사주','인수','합병','계약','수출','dividend','buyback','acquire','merger','contract'],
        dn:['매각','감자','규제','제재','sell-off','fine','sanction','probe'] },
  수: { up:['자금','유동','증자','상장','조달','funding','raise','ipo','liquidity'],
        dn:['부채','자금난','유출','debt','outflow','default'] },
  토: { up:['안정','유지','견조','steady','stable','hold','maintain'],
        dn:['부진','정체','약세','weak','stagnant','flat'] }
};
const MOOD_FACE = {
  화: { emoji:'🔥', label:'뜨거움',  color:'#f87171', el:'화(火) 기운', msg:'열기가 있는 화(火) 기운입니다. 오르내림이 클 수 있습니다.' },
  목: { emoji:'🌤️', label:'갬',      color:'#34d399', el:'목(木) 기운', msg:'완만한 긍정 흐름의 목(木) 기운입니다.' },
  금: { emoji:'⚔️', label:'맑음',    color:'#60a5fa', el:'금(金) 기운', msg:'다져지는 금(金) 기운입니다. 형태가 잡히는 흐름입니다.' },
  수: { emoji:'💧', label:'흐림',    color:'#38bdf8', el:'수(水) 기운', msg:'자금이 도는 수(水) 기운입니다. 흐름을 살피십시오.' },
  토: { emoji:'⛅', label:'잔잔함',  color:'#a3a3a3', el:'토(土) 기운', msg:'뚜렷한 뉴스 기운이 잡히지 않습니다. 관망의 토(土) 기운입니다.' }
};

function moodOf(items) {
  const text = items.map(function(x){ return x.title; }).join(' ').toLowerCase();
  let best = '토', bestScore = 0;
  for (const oh of Object.keys(MOOD_KW)) {
    let s = 0;
    for (const w of MOOD_KW[oh].up) if (text.includes(w.toLowerCase())) s += 1;
    for (const w of MOOD_KW[oh].dn) if (text.includes(w.toLowerCase())) s -= 1;
    if (Math.abs(s) > Math.abs(bestScore)) { bestScore = s; best = oh; }
  }
  if (bestScore === 0) best = '토';
  const f = MOOD_FACE[best];
  return {
    weather: f.emoji, weatherLabel: f.label, element: f.el,
    color: f.color, message: f.msg,
    disclaimer: '뉴스 기운은 헤드라인 키워드 기반 참고용이며, 투자 권유가 아닙니다.'
  };
}

export default async function handler(req, res) {
  const q = req.method === 'POST' ? (req.body || {}) : (req.query || {});
  const lang = LOCALE[q.lang] ? q.lang : 'en';
  const topic = TOPIC[q.topic] ? q.topic : 'business';
  const n = Math.max(3, Math.min(parseInt(q.n, 10) || 8, 12));

  const qq = String(q.q || '').trim().slice(0, 80);      // 종목 뉴스용 검색말
  const key = qq ? ('q|' + lang + '|' + qq) : (lang + '|' + topic);
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) {
    const _i = hit.items.slice(0, n);
    return res.status(200).json(Object.assign({
      ok: true, items: _i, headlines: _i.slice(0, 3), topic, lang, cachedAt: hit.at, cached: true
    }, moodOf(_i)));
  }

  const [hl, gl0, ceid] = LOCALE[lang];
  const gl = String(q.gl || gl0).toUpperCase().slice(0, 2) || gl0;
  const tail = '&hl=' + hl + '&gl=' + gl + '&ceid=' + encodeURIComponent(ceid);

  /* ★ 두 갈래로 나가 본다 — 주제 섹션이 막히면 검색 RSS 로 대체한다.
     구글이 섹션 주소를 조이는 때가 있어, 한 갈래만 두면 통째로 빈 손이 된다. */
  const urls = qq
    ? ['https://news.google.com/rss/search?q=' + encodeURIComponent(qq) + tail]
    : ['https://news.google.com/rss/headlines/section/topic/' + TOPIC[topic] + '?' + tail.slice(1),
       'https://news.google.com/rss/search?q=' + encodeURIComponent(topic === 'world' ? 'world news' : 'business economy') + tail];

  try {
    let items = [], last = '';
    for (const url of urls) {
      try {
        const r = await fetch(url, {
          headers: { 'user-agent': 'Mozilla/5.0 (compatible; CGO-FULI/1.0)' }
        });
        if (!r.ok) { last = 'rss ' + r.status; continue; }
        items = parseRss(await r.text(), 12);
        if (items.length) break;
        last = 'empty';
      } catch (e2) { last = String(e2 && e2.message || e2); }
    }
    if (!items.length) throw new Error(last || 'empty');

    cache.set(key, { at: Date.now(), items });
    if (cache.size > 80) cache.clear();

    // 앱이 화면에 그대로 띄울 수 있도록 제목·언론사·링크를 있는 그대로 돌려준다.
    // 요약하지 않는다 — 요약하면 그 말의 책임이 우리에게 온다.
    const out = items.slice(0, n);
    return res.status(200).json(Object.assign({
      ok: true, items: out, headlines: out.slice(0, 3), topic, lang, cachedAt: Date.now()
    }, moodOf(out)));
  } catch (e) {
    // 못 받아 오면 빈 손으로 돌려준다. 지어내지 않는다.
    // 앱은 빈 손이면 그 갈래를 조용히 끈다.
    return res.status(200).json({ ok: false, items: [], topic, lang, error: String(e && e.message || e) });
  }
}
