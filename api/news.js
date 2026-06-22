// ─────────────────────────────────────────────────────────────
// api/news.js · CGO-FULI 뉴스 오행 날씨 (무료 RSS + 키워드 판정)
// ─────────────────────────────────────────────────────────────
// 구조(정직): Google News RSS(무료·다국어) 헤드라인을 가져와
//   간단한 키워드 규칙으로 "오행 날씨"를 판정합니다. 비용 0원, AI 미사용.
//   → 키워드 기반이라 "대략의 분위기"이며, 투자 권유가 아닙니다.
// 프론트 호출: /api/news?q=삼성전자&lang=ko&gl=KR
// CORS 회피 위해 반드시 서버(/api)에서 RSS를 가져옵니다.
// ─────────────────────────────────────────────────────────────

var _cache = global.__newsCache || (global.__newsCache = new Map());
var TTL = 20 * 60 * 1000; // 20분 캐싱 (뉴스라 짧게)

// 긍정/부정 키워드 (한국어 + 영어 — 글로벌 종목 대응)
var POS = ['상승','급등','호조','신고가','강세','돌파','최고','호실적','흑자','성장','반등','수혜','기대','순항','개선','확대','수주','계약','승인','출시','신제품','목표가상향','rally','surge','gain','rise','jump','beat','high','growth','soar','rebound','upgrade','boost','profit','record','win','approve','strong'];
var NEG = ['하락','급락','약세','우려','부진','손실','적자','경고','감소','축소','리콜','소송','조사','제재','부도','위기','폭락','하향','매도','충격','목표가하향','감원','구조조정','plunge','fall','drop','loss','warn','cut','decline','slump','crash','sink','downgrade','probe','lawsuit','risk','weak','miss','recall','layoff'];

function decodeEntities(s){
  return String(s).replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&apos;/g,"'")
    .replace(/&#(\d+);/g,function(_,n){return String.fromCharCode(parseInt(n,10));});
}
function clean(s){ return decodeEntities(String(s).replace(/<!\[CDATA\[|\]\]>/g,'').trim()); }

function parseRss(xml, limit){
  var items=[], re=/<item>([\s\S]*?)<\/item>/g, m;
  while((m=re.exec(xml)) && items.length<limit){
    var block=m[1];
    var t=clean((block.match(/<title>([\s\S]*?)<\/title>/)||[])[1]||'');
    var l=clean((block.match(/<link>([\s\S]*?)<\/link>/)||[])[1]||'');
    var src=clean((block.match(/<source[^>]*>([\s\S]*?)<\/source>/)||[])[1]||'');
    if(t) items.push({title:t, link:l, source:src});
  }
  return items;
}

function scoreHeadlines(items){
  var pos=0, neg=0;
  items.forEach(function(it){
    var low=it.title.toLowerCase();
    POS.forEach(function(w){ if(low.indexOf(w.toLowerCase())>=0) pos++; });
    NEG.forEach(function(w){ if(low.indexOf(w.toLowerCase())>=0) neg++; });
  });
  return {pos:pos, neg:neg, net:pos-neg};
}

function weatherOf(net, total){
  if(total===0) return {icon:'⛅', label:'잔잔함', elem:'토(土) 기운', color:'#94a3b8', msg:'뚜렷한 뉴스 기운이 잡히지 않습니다. 관망의 토 기운입니다.'};
  if(net>=3)  return {icon:'☀️', label:'맑음', elem:'화(火) 기운 충만', color:'#f87171', msg:'긍정 헤드라인이 많은 상승 기운입니다. 다만 과열은 경계하세요.'};
  if(net>=1)  return {icon:'🌤️', label:'갬',  elem:'목(木) 기운', color:'#34d399', msg:'완만한 긍정 흐름의 목 기운입니다.'};
  if(net<=-3) return {icon:'🌧️', label:'비',  elem:'수(水) 기운 과다', color:'#60a5fa', msg:'부정 헤드라인이 많은 하강 기운입니다. 신중함이 권장됩니다.'};
  if(net<=-1) return {icon:'🌥️', label:'흐림', elem:'금(金) 기운', color:'#cbd5e1', msg:'다소 무거운 흐름의 금 기운입니다.'};
  return {icon:'⛅', label:'보통', elem:'토(土) 기운', color:'#94a3b8', msg:'긍정과 부정이 균형을 이루는 토 기운입니다.'};
}

export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, OPTIONS');
  if(req.method==='OPTIONS'){ res.status(200).end(); return; }

  var q=(req.query.q||'').toString().trim();
  var lang=(req.query.lang||'ko').toString().trim();
  var gl=(req.query.gl||'KR').toString().trim().toUpperCase();
  if(!q){ res.status(200).json({ok:false, reason:'NO_QUERY', msg:'검색어가 없습니다.'}); return; }

  var ckey=q+'|'+lang+'|'+gl;
  var hit=_cache.get(ckey);
  if(hit && (Date.now()-hit.t)<TTL){ res.status(200).json(Object.assign({cached:true},hit.v)); return; }

  var out=null;
  try{
    var url='https://news.google.com/rss/search?q='+encodeURIComponent(q)
      +'&hl='+encodeURIComponent(lang)+'&gl='+encodeURIComponent(gl)
      +'&ceid='+encodeURIComponent(gl+':'+lang);
    var r=await fetch(url, {headers:{'User-Agent':'Mozilla/5.0'}});
    if(r.ok){
      var xml=await r.text();
      var items=parseRss(xml, 8);
      if(items.length){
        var sc=scoreHeadlines(items);
        var w=weatherOf(sc.net, sc.pos+sc.neg);
        out={ ok:true, query:q,
          weather:w.icon, weatherLabel:w.label, element:w.elem, color:w.color, message:w.msg,
          pos:sc.pos, neg:sc.neg,
          headlines: items.slice(0,3),
          source:'google_news_rss',
          disclaimer:'뉴스 기운은 헤드라인 키워드 기반 참고용이며, 투자 권유가 아닙니다.' };
      }
    }
  }catch(e){}

  if(!out){ res.status(200).json({ok:false, reason:'NO_NEWS', msg:'뉴스를 찾지 못했습니다.'}); return; }
  _cache.set(ckey,{t:Date.now(),v:out});
  if(_cache.size>1000){ var k0=_cache.keys().next().value; _cache.delete(k0); }
  res.status(200).json(out);
}
