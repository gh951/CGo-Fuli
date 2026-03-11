// CGo-Fuli × NASA JPL Horizons 프록시
// Vercel Serverless Function — /api/planets
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const BODIES = {
    sun:     {id:'10',  name:'태양',   sym:'☀',  color:'#fbbf24',en:'Sun'    },
    moon:    {id:'301', name:'달',     sym:'🌙', color:'#94a3b8',en:'Moon'   },
    mercury: {id:'199', name:'수성',   sym:'☿',  color:'#6ee7b7',en:'Mercury'},
    venus:   {id:'299', name:'금성',   sym:'♀',  color:'#f9a8d4',en:'Venus'  },
    mars:    {id:'499', name:'화성',   sym:'♂',  color:'#f87171',en:'Mars'   },
    jupiter: {id:'599', name:'목성',   sym:'♃',  color:'#fbbf24',en:'Jupiter'},
    saturn:  {id:'699', name:'토성',   sym:'♄',  color:'#94a3b8',en:'Saturn' },
    uranus:  {id:'799', name:'천왕성', sym:'♅',  color:'#38bdf8',en:'Uranus' },
    neptune: {id:'899', name:'해왕성', sym:'♆',  color:'#818cf8',en:'Neptune'},
  };
  const ZS = ['양자리','황소자리','쌍둥이자리','게자리','사자자리','처녀자리','천칭자리','전갈자리','사수자리','염소자리','물병자리','물고기자리'];
  const ZY = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

  const pad = n => String(n).padStart(2,'0');
  const fmtDate = d => `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;

  function zodiac(lon) {
    const n=((lon%360)+360)%360, i=Math.floor(n/30);
    return {sign:ZS[i],sym:ZY[i],idx:i,deg:(n%30).toFixed(1),lon:n.toFixed(2)};
  }

  // Horizons API: 황도 경도(col31) 단일 시점 조회
  async function horizons(id, start, stop) {
    const p = new URLSearchParams({
      format:'json', COMMAND:`'${id}'`, OBJ_DATA:'NO',
      MAKE_EPHEM:'YES', EPHEM_TYPE:'OBSERVER', CENTER:'500@399',
      START_TIME:`'${start}'`, STOP_TIME:`'${stop}'`,
      STEP_SIZE:'1m', QUANTITIES:'31'
    });
    const r = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?${p}`,
      {});
    if(!r.ok) throw new Error(`HTTP ${r.status}`);
    const j = await r.json();
    const raw = j.result||'';
    const s=raw.indexOf('$$SOE'), e=raw.indexOf('$$EOE');
    if(s<0||e<0) throw new Error('no SOE/EOE');
    const line = raw.slice(s+5,e).trim().split('\n')[0];
    const lon = parseFloat(line.trim().split(/\s+/).pop());
    if(isNaN(lon)) throw new Error('parse fail');
    return lon;
  }

  // 역행: 2시간 전후 경도 비교
  async function isRetro(id, now) {
    const t1 = new Date(now-7200000), t2 = new Date(now+7200000);
    const p = new URLSearchParams({
      format:'json', COMMAND:`'${id}'`, OBJ_DATA:'NO',
      MAKE_EPHEM:'YES', EPHEM_TYPE:'OBSERVER', CENTER:'500@399',
      START_TIME:`'${fmtDate(t1)}'`, STOP_TIME:`'${fmtDate(t2)}'`,
      STEP_SIZE:'4h', QUANTITIES:'31'
    });
    const r = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?${p}`,
      {});
    if(!r.ok) return false;
    const j = await r.json();
    const raw = j.result||'';
    const s=raw.indexOf('$$SOE'), e=raw.indexOf('$$EOE');
    if(s<0||e<0) return false;
    const lines = raw.slice(s+5,e).trim().split('\n').filter(l=>l.trim());
    if(lines.length<2) return false;
    const l1 = parseFloat(lines[0].trim().split(/\s+/).pop());
    const l2 = parseFloat(lines[lines.length-1].trim().split(/\s+/).pop());
    let diff = l2-l1; if(diff>180)diff-=360; if(diff<-180)diff+=360;
    return diff < 0;
  }

  // VSOP87 폴백
  function vsop(key) {
    const now=new Date();
    const jd=(now.getTime()/86400000)+2440587.5;
    const T=(jd-2451545)/36525;
    const PI=Math.PI, sin=Math.sin;
    const f={
      sun: ()=>{const M=(357.52911+35999.05029*T)*PI/180; return 280.46646+36000.76983*T+(1.914602-0.004817*T)*sin(M)+0.019993*sin(2*M);},
      moon:()=>{const Mm=(134.9634+477198.8676*T)*PI/180,D=(297.8502+445267.1115*T)*PI/180,F=(93.2721+483202.0175*T)*PI/180,M=(357.5291+35999.0503*T)*PI/180; return 218.3165+481267.8813*T+6.2888*sin(Mm)+1.274*sin(2*D-Mm)+0.6583*sin(2*D)-0.1851*sin(M)-0.1143*sin(2*F);},
      mercury:()=>252.2509+149474.0722*T,
      venus:  ()=>181.9798+58519.2130*T,
      mars:   ()=>355.4330+19141.6964*T,
      jupiter:()=>34.3515+3036.3027*T,
      saturn: ()=>50.0775+1223.5110*T,
      uranus: ()=>314.0550+429.8640*T,
      neptune:()=>304.3486+219.8553*T,
    };
    return (((f[key]?f[key]():0)%360)+360)%360;
  }

  const now = new Date();
  const nowMs = now.getTime();
  const start = fmtDate(now);
  const stop  = fmtDate(new Date(nowMs+60000));
  const keys  = Object.keys(BODIES);

  try {
    // 전체 병렬 조회
    const [lonRes, retroRes] = await Promise.all([
      Promise.allSettled(keys.map(k => horizons(BODIES[k].id, start, stop))),
      Promise.allSettled(
        keys.filter(k=>k!=='sun'&&k!=='moon')
            .map(k => isRetro(BODIES[k].id, nowMs))
      )
    ]);

    const retroMap = {};
    const retroKeys = keys.filter(k=>k!=='sun'&&k!=='moon');
    retroKeys.forEach((k,i)=>{ retroMap[k]=retroRes[i].status==='fulfilled'?retroRes[i].value:false; });

    const planets={}, sourceCount={jpl:0,vsop:0};
    keys.forEach((k,i)=>{
      let lon, src;
      if(lonRes[i].status==='fulfilled'){
        lon=lonRes[i].value; src='NASA_JPL'; sourceCount.jpl++;
      } else {
        lon=vsop(k); src='VSOP87'; sourceCount.vsop++;
      }
      planets[k]={
        body:BODIES[k], lon:lon.toFixed(2), zodiac:zodiac(lon),
        retro:retroMap[k]||false, source:src,
        ts:now.toISOString(), jd:(nowMs/86400000+2440587.5).toFixed(5)
      };
    });

    // 달 위상
    const mlon=parseFloat(planets.moon.lon), slon=parseFloat(planets.sun.lon);
    const pAngle=((mlon-slon)%360+360)%360;
    const phNames=['신월','초승달','상현달','보름달 전','보름달','보름달 후','하현달','그믐달'];

    return res.status(200).json({
      ok:true,
      source: sourceCount.jpl>=7 ? 'NASA_JPL_Horizons' : sourceCount.jpl>0 ? 'HYBRID' : 'VSOP87_FALLBACK',
      jpl_count: sourceCount.jpl,
      vsop_count: sourceCount.vsop,
      timestamp: now.toISOString(),
      jd: (nowMs/86400000+2440587.5).toFixed(5),
      planets,
      moon_phase:{angle:pAngle.toFixed(1), name:phNames[Math.floor(pAngle/45)%8], idx:Math.floor(pAngle/45)%8}
    });

  } catch(err) {
    // 전체 폴백
    const planets={};
    keys.forEach(k=>{
      const lon=vsop(k);
      planets[k]={body:BODIES[k],lon:lon.toFixed(2),zodiac:zodiac(lon),retro:false,source:'VSOP87',ts:now.toISOString(),jd:(nowMs/86400000+2440587.5).toFixed(5)};
    });
    return res.status(200).json({ok:true, source:'VSOP87_FALLBACK', error:err.message, timestamp:now.toISOString(), planets});
  }
}
