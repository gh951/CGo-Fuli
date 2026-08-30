/* ══ 위성·날씨·지자기 — 구 CGO 원문 그대로 (무료·키없음) ══ */
(function(){
var env = {
    solarWind: {speed:400, density:5, bt:5, bz:0, status:'loading'},
    kp:        {value:1, status:'loading'},
    weather:   {temp:15, humidity:60, pressure:1013, wind:3, status:'loading'},
    loaded: false
  };

  function _check() {
    if(env.solarWind.status!=='loading' && env.kp.status!=='loading' && env.weather.status!=='loading') {
      env.loaded = true;
      window._cgoEnvData = env;
      window._cgoEnvDataTs = Date.now();
    }
  }

  /* ★ C-63: 외부 API 타임아웃 — NOAA(미국 정부 서버)는 한국에서 수십 초 걸리는 경우가 있고,
     그 동안 브라우저 탭 로딩 스피너가 계속 돈다(앱은 이미 떠 있는데 '로딩 중'으로 보임).
     8초 안에 응답 없으면 중단하고 폴백값 사용(이미 기본값 있음). 기능 손실 없음. */
  function _cgoFetchT(url, ms){
    ms = ms || 8000;
    if(typeof AbortController === 'undefined') return fetch(url);
    var ac = new AbortController();
    var t = setTimeout(function(){ try{ ac.abort(); }catch(e){} }, ms);
    return fetch(url, {signal: ac.signal}).then(function(r){ clearTimeout(t); return r; },
                                              function(e){ clearTimeout(t); throw e; });
  }

  // ① NOAA 태양풍 실시간 (무료·키없음)
  _cgoFetchT('https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json')
    .then(function(r){ return r.json(); })
    .then(function(d){
      var last = d[d.length-1] || {};
      env.solarWind = {
        speed:   parseFloat(last.proton_speed)   || 400,
        density: parseFloat(last.proton_density) || 5,
        bt:      parseFloat(last.bt)             || 5,
        bz:      parseFloat(last.bz_gsm)         || 0,
        status:  'live'
      };
      _check();
    })
    .catch(function(){ env.solarWind.status='fallback'; _check(); });

  // ② NOAA 지자기 Kp 지수 (무료·키없음)
  _cgoFetchT('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json')
    .then(function(r){ return r.json(); })
    .then(function(d){
      var last = d[d.length-1] || {};
      env.kp = { value: parseFloat(last.kp_index)||1, status:'live' };
      _check();
    })
    .catch(function(){ env.kp.status='fallback'; _check(); });

  // ③ Open-Meteo 기상 (무료·키없음·위치기반)
  function _fetchWeather(lat, lon) {
    _cgoFetchT('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon
      +'&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m')
      .then(function(r){ return r.json(); })
      .then(function(d){
        var c = d.current || {};
        env.weather = {
          temp:     c.temperature_2m        || 15,
          humidity: c.relative_humidity_2m  || 60,
          pressure: c.surface_pressure      || 1013,
          wind:     c.wind_speed_10m        || 3,
          status:   'live'
        };
        _check();
      })
      .catch(function(){ env.weather.status='fallback'; _check(); });
  }
  // ★ 위치 우선순위:
  // 1순위: 정보 입력의 현재 위치 좌표 (ipCurLat/ipCurLng)
  // 2순위: GPS 실시간 위치
  // 3순위: calcResult 좌표
  // 4순위: 서울 기본값

  function _getBestLocation(callback) {
    // 1순위: 정보 입력 현재 위치
    var curLat = parseFloat((document.getElementById('ipCurLat')||{}).value) ||
                 window._selectedCurLat || 0;
    var curLng = parseFloat((document.getElementById('ipCurLng')||{}).value) ||
                 window._selectedCurLng || 0;
    if(curLat && curLng) {
      callback(curLat, curLng, '현재위치');
      return;
    }
    // 2순위: calcResult 좌표
    var r = window.calcResult;
    if(r && r.curLat && r.curLng) {
      callback(r.curLat, r.curLng, '현재위치(계산)');
      return;
    }
    if(r && r.birthLat && r.birthLng) {
      callback(r.birthLat, r.birthLng, '출생지');
      return;
    }
    // 3순위: GPS
    cgoGetLocation(function(pos) {
      if(pos) {
        callback(pos.coords.latitude, pos.coords.longitude, 'GPS');
      } else {
        // 4순위: 서울 기본값
        callback(37.5665, 126.9780, '서울(기본)');
      }
    });
  }
  try{ _getBestLocation(function(la,lo){ _fetchWeather(la,lo); }); }catch(e){ _fetchWeather(37.5665,126.9780); }
})();

/* ══ 화면에 값 채우기 — 대시보드 위성·날씨·나침반 ══ */
(function(){
  function put(id, v){ var el=document.getElementById(id); if(el && v!=null) el.textContent=v; }
  function paint(){
    var d = window._cgoEnvData;
    if(!d) return;
    if(d.weather && d.weather.status==='live'){
      put('cgoWeatherTempBar', Math.round(d.weather.temp)+'°C');
      put('cgoWeatherHumBar', Math.round(d.weather.humidity)+'%');
      put('cgoWeatherHumBar', Math.round(d.weather.humidity)+'%');
    }
    /* 위성 — 국제우주정거장 궤도값 (고도·속도는 상수, 좌표는 계산) */
    var t = Date.now()/1000;
    var lat = (Math.sin(t/2700) * 51.6).toFixed(1);
    var lng = (((t/5400*360) % 360) - 180).toFixed(1);
    put('cgoSatAlt', '408km');
        put('cgoSatVel', '7.66km/s');
        put('cgoSatLat', lat+'°N '+lng+'°E');
      }
  [1500, 4000].forEach(function(ms){ setTimeout(paint, ms); });
  setInterval(paint, 20000);

  /* 나침반 — 폰이 허락하면 실제 방위 */
  function compass(){
    function show(deg){
      var d = Math.round(deg);
            var e2 = document.getElementById('cgoCompassDegBar');
      if(e2) e2.textContent = d + '°';
    }
    function on(ev){
      var deg = ev.webkitCompassHeading != null ? ev.webkitCompassHeading
              : (ev.alpha != null ? 360 - ev.alpha : null);
      if(deg != null) show(deg);
    }
    try{
      if(window.DeviceOrientationEvent){
        window.addEventListener('deviceorientationabsolute', on, true);
        window.addEventListener('deviceorientation', on, true);
      }
    }catch(e){}
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', compass);
  else compass();
})();

/* ══ AI 상담에 함께 보낼 환경 요약 ══ */
window.cgoEnvBrief = function(){
  var d = window._cgoEnvData;
  if(!d || !d.loaded) return '';
  var p = [];
  if(d.weather && d.weather.status==='live')
    p.push('기온 '+Math.round(d.weather.temp)+'℃ · 습도 '+Math.round(d.weather.humidity)+'% · 기압 '+Math.round(d.weather.pressure)+'hPa');
  if(d.kp && d.kp.status==='live') p.push('지자기 Kp '+d.kp.value);
  if(d.solarWind && d.solarWind.status==='live')
    p.push('태양풍 '+Math.round(d.solarWind.speed)+'km/s');
  return p.join(' / ');
};
