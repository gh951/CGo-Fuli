/* ══ 나의 IQ — 문제 은행 · 도형 생성 (구 CGO 원문 그대로) ══
   도형은 함수가 SVG로 그린다. 도면을 넣을 때 자리가 맞도록 원문을 한 글자도 바꾸지 않았다. */
function _iqMxRand(p){ var g=_iqMxBlank(); for(var i=0;i<3;i++)for(var j=0;j<3;j++) g[i][j]=(Math.random()<(p||0.45))?1:0; return g; }

function _iqMxXor(a,b){ var g=_iqMxBlank(); for(var i=0;i<3;i++)for(var j=0;j<3;j++) g[i][j]=a[i][j]^b[i][j]; return g; }

function _iqMxCount(g){ var c=0; for(var i=0;i<3;i++)for(var j=0;j<3;j++) c+=g[i][j]; return c; }

function _iqMxRot(g){ var r=_iqMxBlank(); for(var i=0;i<3;i++)for(var j=0;j<3;j++) r[j][2-i]=g[i][j]; return r; }

function _iqMxBlank(){ return [[0,0,0],[0,0,0],[0,0,0]]; }

function _iqMxShift(g){ var n=_iqMxBlank(); for(var i=0;i<3;i++)for(var j=0;j<3;j++) n[i][(j+1)%3]=g[i][j]; return n; }

function _iqMxClone(g){ return g.map(function(r){return r.slice();}); }

function _iqMxGen(){
      var t=Math.floor(Math.random()*4), M=[[],[],[]], rule='', r, i, j;
      if(t===0){ for(r=0;r<3;r++){ var c1=_iqMxRand(0.5),c2=_iqMxRand(0.5); M[r]=[c1,c2,_iqMxXor(c1,c2)]; } rule='XOR'; }
      else if(t===1){ for(r=0;r<3;r++){ var b=_iqMxRand(0.4); if(_iqMxCount(b)<2){b[0][0]=1;b[1][2]=1;} var g2=_iqMxRot(b); M[r]=[b,g2,_iqMxRot(g2)]; } rule='회전'; }
      else if(t===2){ for(r=0;r<3;r++){ var a1=_iqMxRand(0.3),a2=_iqMxRand(0.3),a3=_iqMxBlank(); for(i=0;i<3;i++)for(j=0;j<3;j++) a3[i][j]=(a1[i][j]||a2[i][j])?1:0; M[r]=[a1,a2,a3]; } rule='누적'; }
      else { for(r=0;r<3;r++){ var s1=_iqMxRand(0.35),s2=_iqMxShift(s1); M[r]=[s1,s2,_iqMxShift(s2)]; } rule='이동'; }
      return { M:M, answer:M[2][2], rule:rule };
    }

function _iqMxSvg(g, size, missing){
      var s=size/3, r='<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'">';
      r+='<rect x="0.75" y="0.75" width="'+(size-1.5)+'" height="'+(size-1.5)+'" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>';
      if(missing){ r+='<text x="'+(size/2)+'" y="'+(size/2+8)+'" text-anchor="middle" font-size="24" fill="#d4a843" font-weight="800">?</text>'; }
      else { for(var i=0;i<3;i++)for(var j=0;j<3;j++){ var on=g[i][j]; r+='<rect x="'+(j*s+1.5)+'" y="'+(i*s+1.5)+'" width="'+(s-3)+'" height="'+(s-3)+'" rx="1.5" fill="'+(on?'#334155':'#eef2f7')+'" stroke="'+(on?'#1e293b':'#b8c4d2')+'" stroke-width="1"/>'; } }
      return r+'</svg>';
    }

function _iqMxDistract(ans){
      var outs=[ans], tries=0, i, k;
      function mut(g){ var n=_iqMxClone(g); var a=Math.floor(Math.random()*3),b=Math.floor(Math.random()*3); n[a][b]=n[a][b]?0:1; return n; }
      while(outs.length<8 && tries<400){ tries++; var cand=Math.random()<0.5?mut(ans):(Math.random()<0.5?_iqMxRot(ans):_iqMxRand(0.45)); if(_iqMxCount(cand)===0) continue; var dup=false; for(k=0;k<outs.length;k++) if(_iqMxEq(outs[k],cand)) dup=true; if(dup) continue; outs.push(cand); }
      while(outs.length<8) outs.push(_iqMxRand(0.5));
      for(i=outs.length-1;i>0;i--){ k=Math.floor(Math.random()*(i+1)); var tmp=outs[i]; outs[i]=outs[k]; outs[k]=tmp; }
      return outs;
    }

function _iqMxEq(a,b){ for(var i=0;i<3;i++)for(var j=0;j<3;j++) if(a[i][j]!==b[i][j]) return false; return true; }

var _cgo36PatternAnswers = {
  'p001': { a:0, c:['더 큰 검정 원','작은 검정 원','검정 사각형','세 개의 작은 원'] },
  'p002': { a:1, c:['원','사각형','삼각형','별'] },
  'p003': { a:0, c:['검정 원','흰 원','반반 원','별'] },
  'p004': { a:2, c:['네 개','세 개','다섯 개','여섯 개'] },
  'p005': { a:0, c:['위쪽 화살표','오른쪽 화살표','아래쪽 화살표','대각선 화살표'] },
  'p006': { a:2, c:['전체 원','반쪽 원','아주 작은 조각','사분의 일 조각'] },
  'p007': { a:0, c:['원·사각·삼각 결합된 도형','원 하나','삼각형 하나','빈 칸'] },
  'p008': { a:1, c:['좌측 아래','중앙','우측 위','우측 아래'] },
  'p009': { a:2, c:['세 겹 도형','네 겹 도형','다섯 겹 도형','두 겹 도형'] },
  'p010': { a:2, c:['네 개','여섯 개','다섯 개','여덟 개'] },
  'p011': { a:0, c:['아주 작은 점','중간 사각형','패널 가득 사각형','원래 크기'] },
  'p012': { a:1, c:['위쪽 삼각형','아래쪽 삼각형','오른쪽 삼각형','왼쪽 삼각형'] },
  'p013': { a:0, c:['검정 원','흰 원','사각형','삼각형'] },
  'p014': { a:0, c:['가장 두꺼운 외곽선 원','가장 얇은 외곽선 원','속이 채워진 원','외곽선 없음'] },
  'p015': { a:2, c:['짧은 점선','없음','더 긴 점선','직선'] },
  'p016': { a:0, c:['검정 원','흰 원','회색 원','연한 회색 원'] },
  'p017': { a:1, c:['여덟 개','열여섯 개','서른두 개','열두 개'] },
  'p018': { a:2, c:['속 채워진 원','외곽선만 있는 원','사라진 점','두꺼운 외곽선'] },
  'p019': { a:0, c:['원 세 개','사각 세 개','원 두 개','사각 네 개'] },
  'p020': { a:0, c:['오른쪽 향한 꺾인 선','왼쪽 향한 꺾인 선','위쪽 향한 꺾인 선','아래쪽 향한 꺾인 선'] },
  'p021': { a:2, c:['원+삼각','원+삼각+사각','원+삼각+사각+마름모+별','별 하나'] },
  'p022': { a:1, c:['삼각형','꼭짓점 많은 별','사각형','오각별'] },
  'p023': { a:0, c:['빈 격자로 리셋','다섯 개 검정','중앙만 검정','대각선 검정'] },
  'p024': { a:0, c:['빈 격자로 리셋','다섯 개 검정','중앙만 검정','대각선 검정'] },
  'p025': { a:0, c:['열여섯 분할 원','반쪽 원','꽉 채운 검정 원','빈 원'] },
  'p026': { a:0, c:['다섯 개 점','세 개 점','여섯 개 점','없음'] },
  'p027': { a:0, c:['완전히 합쳐진 한 원','멀어진 두 원','떨어진 두 원','세 원'] },
  'p028': { a:0, c:['위쪽 화살표','오른쪽 화살표','아래쪽 화살표','왼쪽 화살표'] },
  'p029': { a:0, c:['패널 가득 채운 긴 직사각형','정사각형','세로 직사각형','원'] },
  'p030': { a:2, c:['평면','선','움직이는 입체','점'] },
  'p031': { a:1, c:['열여덟 개 점','열다섯 개 점','열여섯 개 점','열두 개 점'] },
  'p032': { a:0, c:['다섯 겹 사각형','세 겹 사각형','꽉 채운 사각형','외곽선만'] },
  'p033': { a:0, c:['위쪽 향한 검정 삼각형','위쪽 향한 흰 삼각형','아래쪽 향한 검정 삼각형','아래쪽 향한 흰 삼각형'] },
  'p034': { a:0, c:['패널 끝까지 닿는 가장 긴 막대','중간 막대','가장 짧은 막대','없음'] },
  'p035': { a:0, c:['좌측 위','중앙','우측 위','좌측 아래'] },
  'p036': { a:0, c:['열여섯 분할 원','꽉 채운 검정 원','반쪽 원','네 분할 원'] },
  'p037': { a:0, c:['열다섯 개 점 (5층 피라미드)','열 개 점','열두 개 점','스무 개 점'] },
  'p038': { a:0, c:['중간·중간 크기 두 원','크고 큰 두 원','작고 작은 두 원','한 원만'] },
  'p039': { a:0, c:['사라지거나 매우 작은 사각형','두 사각형','세 사각형','큰 사각형'] },
  'p040': { a:0, c:['왼쪽이 검정인 반쪽 원','오른쪽이 검정인 반쪽 원','위가 검정인 반쪽 원','아래가 검정인 반쪽 원'] },
  'p041': { a:0, c:['완전히 합쳐진 한 원','다시 멀어진 두 원','세 원','없음'] },
  'p042': { a:0, c:['남쪽 화살표 (아래)','북쪽 화살표 (위)','동쪽 화살표 (오른쪽)','서쪽 화살표 (왼쪽)'] },
  'p043': { a:0, c:['다섯 개 가로선','네 개 가로선','여섯 개 가로선','세 개 가로선'] },
  'p044': { a:0, c:['아주 좁은 삼각형/세로선','넓은 삼각형','직사각형','없음'] },
  'p045': { a:0, c:['패널 꼭대기','중앙','패널 바닥','사라짐'] },
  'p046': { a:0, c:['모든 변이 점선인 사각형','완전한 사각형','세 변만 깨진 사각형','두꺼운 외곽선'] },
  'p047': { a:0, c:['완전히 검정으로 채워진 사각형','75% 채워진 사각형','반쯤 채워진 사각형','빈 사각형'] },
  'p048': { a:0, c:['다섯 개 검정점 (X 완성)','네 개','여섯 개','세 개'] },
  'p049': { a:0, c:['육각형','칠각형','오각형','원'] },
  'p050': { a:0, c:['완전히 검정인 위쪽 삼각형','흰 위쪽 삼각형','검정 왼쪽 삼각형','흰 아래쪽 삼각형'] },
  'p051': { a:0, c:['패널 끝까지 닿는 가장 긴 그림자','짧은 그림자','없음','반대 방향 그림자'] },
  'p052': { a:0, c:['네 꼭짓점 모두 점','세 꼭짓점에 점','두 꼭짓점에 점','점 없음'] },
  'p053': { a:0, c:['얇은 외곽선 원','두꺼운 외곽선 원','속이 채워진 원','없음'] },
  'p054': { a:0, c:['가로 줄무늬','세로 줄무늬','대각선 줄무늬','격자'] },
  'p055': { a:0, c:['흰 구멍 없는 솔리드 검정 사각형','좌측 위에 흰 구멍','우측 위에 흰 구멍','중앙에 흰 구멍'] },
  'p056': { a:0, c:['중앙 점 + 네 개 동심원','다섯 개 동심원','세 개 동심원','없음'] },
  'p057': { a:0, c:['양 끝으로 분리된 두 반원','한 원','세 반원','다시 합쳐진 원'] },
  'p058': { a:0, c:['5×5 = 25개 격자','6×6 = 36개 격자','4×4 = 16개 격자','동일한 격자'] },
  'p059': { a:0, c:['사라지거나 매우 작은 점','다시 큰 원','중간 크기 원','반대로 커진 원'] },
  'p060': { a:0, c:['다섯 개 삼각형 (오각 배치)','여섯 개 삼각형','네 개 그대로','세 개'] },
  'p061': { a:0, c:['위·아래 화살표','왼쪽·오른쪽 화살표','대각선 화살표','반대 대각선'] },
  'p062': { a:0, c:['패널 가득 채운 긴 타원','원','세로 타원','작아진 원'] },
  'p063': { a:0, c:['역V자 (가운데가 김)','모두 같은 막대','오름차순','내림차순'] },
  'p064': { a:0, c:['위쪽 향한 삼각형','오른쪽 향한 삼각형','왼쪽 향한 삼각형','아래쪽 향한 삼각형'] },
  'p065': { a:0, c:['완전한 사각형 (네 변 모두)','세 변만 있음','두 변만 있음','선 없음'] },
  'p066': { a:0, c:['사각형·원 순서','원·사각형 순서','원 두 개','사각 두 개'] },
  'p067': { a:0, c:['패널 전체가 검정','얇은 선','없음','다시 얇아진 선'] },
  'p068': { a:0, c:['아래 향한 화살표 + 네 개 잔상','위 화살표 + 잔상','오른쪽 화살표 + 잔상','잔상 없음'] },
  'p069': { a:0, c:['오각별 또는 별','원','삼각형','사각형'] },
  'p070': { a:0, c:['가로 직사각형','세로 직사각형','정사각형','원'] },
  'p071': { a:0, c:['완전한 원','정사각형','약간 둥근 사각형','직사각형'] },
  'p072': { a:0, c:['시계 방향 화살표','반시계 방향 화살표','직선 화살표','없음'] },
  'p073': { a:0, c:['패널 가득 채운 긴 가로선','점','짧은 선','세로선'] },
  'p074': { a:0, c:['네 개 모두 흰 원','네 개 모두 검정 원','반반','사라짐'] },
  'p075': { a:0, c:['우측 아래 그림자','좌측 위 그림자','그림자 없음','반대 방향 그림자'] },
  'p076': { a:0, c:['큰 원 + 네 개 작은 위성','큰 원 + 세 개 위성','큰 원만','다섯 개 같은 크기'] },
  'p077': { a:0, c:['모든 변에 점 (다섯 개)','세 변에 점','두 변에 점','중앙만'] },
  'p078': { a:0, c:['마름모 또는 별','원','사각형','직선'] },
  'p079': { a:0, c:['패널 가득 가장 두꺼운 화살표','얇은 화살표','없음','반대 방향'] },
  'p080': { a:0, c:['중앙에 다섯 번째 점','네 개 그대로','세 개','없음'] },
  'p081': { a:0, c:['세로 배치 세 점','대각선 배치','가로 배치','없음'] },
  'p082': { a:0, c:['복잡한 결합 패턴','솔리드 검정','빈 원','단순 점'] },
  'p083': { a:0, c:['완전히 겹친 한 사각형','두 사각형 분리','세 사각형','없음'] },
  'p084': { a:0, c:['외곽선만 남거나 사라짐','속이 꽉 찬 검정','작은 검정점','두꺼운 외곽선'] },
  'p085': { a:0, c:['네 변 모두 물결','세 변만 물결','직사각형','완전한 원'] },
  'p086': { a:0, c:['더 적은 점 또는 사라짐','더 많은 점','솔리드 원','격자 패턴'] },
  'p087': { a:0, c:['+ 모양 (중앙 + 사방)','X자 그대로','꽉 찬 격자','빈 격자'] },
  'p088': { a:0, c:['거의 완전히 겹친 한 원','다시 분리된 두 원','세 원','두 원 멀리'] },
  'p089': { a:0, c:['열여섯 개 가지 나무','여덟 개 가지','없음','두 개 가지'] },
  'p090': { a:0, c:['오른쪽 가로','왼쪽 가로','수직','대각'] },
  'p091': { a:0, c:['중간·중간 크기 두 원','크고 큰 두 원','작고 작은 두 원','한 원만'] },
  'p092': { a:0, c:['더 오른쪽으로 기울어진 진자','수직 진자','왼쪽으로 기울어진 진자','수평 진자'] },
  'p093': { a:0, c:['오른쪽 가로','왼쪽 가로','수직','대각'] },
  'p094': { a:0, c:['열여섯 개 점','열두 개 점','여덟 개 그대로','네 개'] },
  'p095': { a:0, c:['작은 흰 위쪽 삼각형','큰 검정 위쪽 삼각형','중간 왼쪽 삼각형','아래쪽 삼각형'] },
  'p096': { a:0, c:['다섯 개 흰점','네 개 그대로','여섯 개','세 개'] },
  'p097': { a:0, c:['완전히 검정인 사각형','외곽선만','3/4 검정','반반'] },
  'p098': { a:0, c:['한 점으로 완전히 합쳐짐','여러 점 흩어짐','두 그룹','세 그룹'] },
  'p099': { a:0, c:['네 개 모두 검정','세 개만 검정','두 개만 검정','모두 흰색'] },
  'p100': { a:0, c:['다섯 개 가장 큰 검정 원이 일렬로','네 개 그대로','세 개','없음'] }
}

var _cgo36SpatialAnswers = {
  's001': { a:0, c:['양면 모두 흰색인 큐브','양면 검정 큐브','양면 점 무늬 큐브','양면 줄무늬 큐브'] },
  's002': { a:0, c:['더 복잡한 무늬 (격자+점 결합)','솔리드 검정','빈 윗면','체스보드'] },
  's003': { a:0, c:['완전히 합체된 한 큐브','두 큐브 분리','세 큐브','없음'] },
  's004': { a:0, c:['다시 조립된 큐브','완전한 평면','반쪽 큐브','분열된 큐브'] },
  's005': { a:0, c:['다섯 겹 중첩 큐브','세 겹','두 겹','외곽선만'] },
  's006': { a:0, c:['다른 각도로 회전한 큐브','원래 정면','구체','평면'] },
  's007': { a:0, c:['여덟 개 이상 큰 큐브 구조','다섯 개','네 개 그대로','한 개'] },
  's008': { a:0, c:['뚜껑이 완전히 분리되어 떠있음','뚜껑 닫힘','반쯤 열림','없음'] },
  's009': { a:0, c:['처음 패턴으로 복귀 (점·줄)','점·점 무늬','솔리드 검정','체크무늬'] },
  's010': { a:0, c:['완전히 납작한 평면 (2D 마름모)','다시 정육면체','반쪽','구체'] },
  's011': { a:0, c:['회전 다음 단계 큐브','흰 큐브','솔리드 검정','체스보드'] },
  's012': { a:0, c:['완전히 둥글어진 구체','정육면체','반쪽','평면'] },
  's013': { a:0, c:['아주 작은 큐브 여러 개로 분열','정육면체 그대로','두 큐브','없음'] },
  's014': { a:0, c:['두 큐브가 더 멀리 회전·분리','다시 합체','세 큐브','없음'] },
  's015': { a:0, c:['모든 꼭짓점이 선으로 연결된 큐브','내부 선 없음','세 개 선','외부 모서리만'] },
  's016': { a:0, c:['더 큰 큐브','작은 큐브','같은 크기','사라짐'] },
  's017': { a:0, c:['완전히 검정으로 가득 찬 6각형','흰 큐브','반쪽 검정','빈 외곽선'] },
  's018': { a:0, c:['패널 가득 채운 가장 긴 직육면체','정육면체','반쪽','구체'] },
  's019': { a:0, c:['두 반쪽이 완전히 멀리 분리됨','다시 합체','세 조각','한 큐브'] },
  's020': { a:0, c:['더 큰 큐브 그룹 (여덟 개 이상)','세 개 그대로','한 큐브','없음'] },
  's021': { a:0, c:['여섯 개 점 (주사위 6)','일곱 개 점','다섯 개 그대로','네 개'] },
  's022': { a:0, c:['검정 큐브','흰 큐브','반반','패턴 큐브'] },
  's023': { a:0, c:['패널 끝까지 닿는 가장 긴 그림자','짧은 그림자','없음','반대 방향'] },
  's024': { a:0, c:['열여섯 개 큐브 군집','네 개 그대로','두 개','한 개'] },
  's025': { a:0, c:['5x5 체스보드 무늬 큐브','3x3 그대로','솔리드','외곽선만'] },
  's026': { a:0, c:['두 큐브가 완전히 합쳐진 모습','두 큐브 분리','세 큐브','없음'] },
  's027': { a:0, c:['완전한 구체 (공 모양)','정육면체','반쪽','평면'] },
  's028': { a:0, c:['선/와이어프레임만 남거나 사라짐','꽉 찬 큐브','반쪽','두꺼운 면'] },
  's029': { a:0, c:['큐브 (다시 사각 입체)','구','피라미드','원기둥'] },
  's030': { a:0, c:['더 큰 검정 큐브 군집 (8개 이상)','네 개 그대로','두 개','없음'] }
}

function _iqMxQuestion(){
      var gen=_iqMxGen(), CELL=(typeof window!=='undefined'&&window.innerWidth<500?36:46), r, c, k;
      var html='<div style="display:grid;grid-template-columns:repeat(3,'+CELL+'px);gap:9px;justify-content:center;background:#eef4f8;padding:12px;border:1px solid #cbd5e1;border-radius:10px;width:max-content;margin:10px auto;">';
      for(r=0;r<3;r++)for(c=0;c<3;c++){ html+='<div>'+_iqMxSvg(gen.M[r][c],CELL,(r===2&&c===2))+'</div>'; }
      html+='</div>';
      var opts=_iqMxDistract(gen.answer), optSvgs=[], ansIdx=0;
      for(k=0;k<opts.length;k++){ optSvgs.push(_iqMxSvg(opts[k],50,false)); if(_iqMxEq(opts[k],gen.answer)) ansIdx=k; }
      return { domain:'패턴 인식', isMatrix:true, q:'다음 도형에서 ? 자리에 들어갈 것을 고르세요'+html, opts:optSvgs, answer:ansIdx };
    }

function _cgo36BuildPatternPool(){
  // 다양한 텍스트 패턴 (이미지 로딩 실패 시 자동 사용)
  var fallbacks = [
    { p:'○ → ● → ○○ → ●● → ?', c:['○○○','●●●','●○●','○●○'], a:1 },
    { p:'△ → ▲ → △△ → ▲▲ → ?', c:['△△△','▲▲▲','△▲△','▲△▲'], a:1 },
    { p:'■ □ ■ □ ■ ?', c:['■','□','■■','□□'], a:1 },
    { p:'● ●● ●●● ●●●● ?', c:['●●','●●●●●','●●●●●●','●'], a:1 },
    { p:'↑ → ↓ ← ?', c:['↑','→','↓','↗'], a:0 },
    { p:'◐ ◑ ◐ ◑ ?', c:['◐','◑','◓','◒'], a:0 },
    { p:'1 2 4 8 16 ?', c:['24','32','30','28'], a:1 },
    { p:'A C E G ?', c:['H','I','J','K'], a:1 },
    { p:'⬡ ⬢ ⬡ ⬢ ?', c:['⬡','⬢','⬣','◇'], a:0 },
    { p:'▶ ▼ ◀ ▲ ?', c:['▶','▼','◀','▲'], a:0 }
  ];
  var pool = [];
  for(var i=1; i<=100; i++){
    var num = String(i).padStart(3,'0');
    var pid = 'p'+num;
    var fb = fallbacks[i % fallbacks.length];
    // C-36 V1.1 - 정답 매핑 우선 사용, 없으면 텍스트 폴백
    var realAns = _cgo36PatternAnswers[pid];
    pool.push({
      q: '다음 도형 시퀀스에서 빈 칸에 들어갈 것은?',
      image: 'pattern-images/'+pid+'.jpeg',
      pattern: fb.p,                                       // 이미지 실패 시 텍스트 폴백
      choices: realAns ? realAns.c : fb.c,                 // V1.1 - 130개 실제 정답 박입
      answer: realAns ? realAns.a : fb.a,                  // V1.1 - 大將 Flow 도형 매칭
      domain: 'pattern',
      _pid: pid
    });
  }
  return pool;
}

function _cgo36BuildSpatialPool(){
  var fallbacks = [
    { p:'🧊 → 🧊 회전', c:['90°','180°','270°','360°'], a:0 },
    { p:'⬢ → 거울 ?', c:['⬡','⬢','⬣','◇'], a:1 },
    { p:'▲ 90° 회전 →', c:['▶','◀','▼','▲'], a:0 },
    { p:'◯ + □ 합체 = ?', c:['◯','□','◯□','◐'], a:2 },
    { p:'정육면체 펼침 → ?', c:['╋','┳','┻','╂'], a:0 },
    { p:'블록 쌓기 1→2→4→?', c:['6','7','8','9'], a:2 }
  ];
  var pool = [];
  for(var i=1; i<=30; i++){
    var num = String(i).padStart(3,'0');
    var sid = 's'+num;
    var fb = fallbacks[i % fallbacks.length];
    // C-36 V1.1 - 정답 매핑 우선 사용
    var realAns = _cgo36SpatialAnswers[sid];
    pool.push({
      q: '다음 입체 도형의 규칙을 찾으세요',
      image: 'spatial-images/'+sid+'.jpeg',
      pattern: fb.p,
      choices: realAns ? realAns.c : fb.c,                 // V1.1 - 30개 실제 정답
      answer: realAns ? realAns.a : fb.a,                  // V1.1 - 大將 3D 큐브 매칭
      domain: 'spatial',
      _sid: sid
    });
  }
  return pool;
}

function _iqBuildMatrixQuestions(n){ var out=[]; for(var i=0;i<n;i++) out.push(_iqMxQuestion()); return out; }

function _iqShuffleOpts(choices, ans){
    var pairs=(choices||[]).map(function(ch,i){ return {ch:ch, c:(i===ans)}; });
    for(var i=pairs.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=pairs[i]; pairs[i]=pairs[j]; pairs[j]=t; }
    var opts=[], a=0;
    for(var k=0;k<pairs.length;k++){ opts.push(pairs[k].ch); if(pairs[k].c) a=k; }
    return {opts:opts, answer:a};
  }

function _iqBuildQuestions(tier){
      if(tier==='mensa'){ return _iqBuildMatrixQuestions(35); }  // C-61: 멘사형 순수 매트릭스 35
      var counts = {
        quick:     { pattern: 5, spatial: 3, verbal: 6, numeric: 6, memory: 5 },  // 25
        standard:  { pattern: 7, spatial: 5, verbal: 8, numeric: 8, memory: 7 },  // 35
        formal:    { pattern: 12, spatial: 8, verbal: 10, numeric: 10, memory: 10 }, // 50
        precision: { pattern: 10, spatial: 8, verbal: 9, numeric: 9, memory: 9 }, // 45 (+매트릭스35=80)
        combo:     { spatial: 8, verbal: 9, numeric: 9, memory: 9 } // 35 다영역 (+ 매트릭스 35 = 70)
      };
      var c = counts[tier] || counts.quick;
      var domainEmoji = { pattern:'🔷 패턴 인식', spatial:'🧊 공간 추론', verbal:'📖 언어 능력', numeric:'🔢 수리 논리', memory:'🧠 작업 기억' };
      var out = [];
      Object.keys(c).forEach(function(d){
        var pool = (Q_POOL[d] || []).slice();
        // 셔플
        for(var i=pool.length-1; i>0; i--){
          var j = Math.floor(Math.random() * (i+1));
          var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
        }
        var take = Math.min(c[d], pool.length);
        for(var k=0; k<take; k++){
          var q = pool[k];
          var _sh = _iqShuffleOpts(q.choices, q.answer);
          out.push({
            q: q.q,
            opts: _sh.opts,
            answer: _sh.answer,
            domain: domainEmoji[d],
            image: q.image || null,         // 원본 상대 경로 그대로 (cgo36ImgFail 4경로 폴백 박제)
            pattern: q.pattern || null,
            _pid: q._pid || null,            // 패턴 ID (폴백 시 필요)
            _sid: q._sid || null             // 공간 ID (폴백 시 필요)
          });
        }
      });
      if(tier==='combo' || tier==='precision'){ out = out.concat(_iqBuildMatrixQuestions(35)); for(var _s=out.length-1;_s>0;_s--){ var _r=Math.floor(Math.random()*(_s+1)); var _tt=out[_s]; out[_s]=out[_r]; out[_r]=_tt; } }  // C-61: 종합 = 다영역35 + 매트릭스35 = 70
      return out;
    }

var Q_POOL = {
  pattern: _cgo36BuildPatternPool(),  // 100개
  spatial: _cgo36BuildSpatialPool(),  // 30개
  verbal: [
    { q:'다음 단어 중 의미가 다른 하나는?', choices:['소나무','참나무','장미','전나무'], answer:2, domain:'verbal' },
    { q:'반의어를 고르세요: "확장"', choices:['팽창','축소','증가','확대'], answer:1, domain:'verbal' },
    { q:'유추: 새 : 하늘 = 물고기 : ?', choices:['땅','바다','산','집'], answer:1, domain:'verbal' },
    { q:'유의어를 고르세요: "신중하다"', choices:['경솔하다','조심스럽다','빠르다','늦다'], answer:1, domain:'verbal' },
    { q:'유추: 손 : 장갑 = 발 : ?', choices:['양말','신발','구두','버선'], answer:1, domain:'verbal' },
    { q:'의미가 가장 가까운 단어는: "탁월하다"', choices:['평범하다','뛰어나다','부족하다','보통이다'], answer:1, domain:'verbal' },
    { q:'다음 중 의미가 다른 하나는?', choices:['기쁨','즐거움','행복','슬픔'], answer:3, domain:'verbal' },
    { q:'유추: 부분 : 전체 = 한 그루 : ?', choices:['나무','숲','잎','뿌리'], answer:1, domain:'verbal' },
    { q:'유추: 의사 : 병원 = 교사 : ?', choices:['집','학교','책','연필'], answer:1, domain:'verbal' },
    { q:'유추: 더위 : 여름 = 추위 : ?', choices:['봄','가을','겨울','계절'], answer:2, domain:'verbal' },
    { q:'유추: 책 : 읽다 = 음식 : ?', choices:['보다','먹다','자다','달리다'], answer:1, domain:'verbal' },
    { q:'다음 중 가장 다른 하나는?', choices:['빨강','파랑','노랑','사각형'], answer:3, domain:'verbal' },
    { q:'유의어: "거대하다"와 가장 가까운 것은?', choices:['작다','크다','얇다','짧다'], answer:1, domain:'verbal' },
    { q:'유추: 시작 : 끝 = 출발 : ?', choices:['도착','이동','경로','길'], answer:0, domain:'verbal' },
    { q:'다음 중 의미 관계가 다른 하나는?', choices:['낮:밤','크다:작다','뜨겁다:차갑다','책:공책'], answer:3, domain:'verbal' }
  ],
  numeric: [
    { q:'수열의 다음 숫자는? 2, 4, 8, 16, ?', choices:['24','32','30','28'], answer:1, domain:'numeric' },
    { q:'규칙을 찾아: 1, 1, 2, 3, 5, ?', choices:['7','8','9','10'], answer:1, domain:'numeric' },
    { q:'3의 5제곱은?', choices:['125','243','81','729'], answer:1, domain:'numeric' },
    { q:'다음 비율: 2:5 = 8:?', choices:['16','20','25','40'], answer:1, domain:'numeric' },
    { q:'평균을 구하시오: 10, 20, 30, 40', choices:['20','25','30','35'], answer:1, domain:'numeric' },
    { q:'규칙: 100 → 50 → 25 → ?', choices:['12','12.5','15','20'], answer:1, domain:'numeric' },
    { q:'1+2+3+...+10 = ?', choices:['45','50','55','60'], answer:2, domain:'numeric' },
    { q:'7×8 = ?', choices:['54','55','56','63'], answer:2, domain:'numeric' },
    { q:'다음 수열: 3, 6, 12, 24, ?', choices:['36','48','60','72'], answer:1, domain:'numeric' },
    { q:'25%는 분수로?', choices:['1/2','1/3','1/4','1/5'], answer:2, domain:'numeric' },
    { q:'수열: 2, 6, 12, 20, 30, ?', choices:['38','40','42','44'], answer:2, domain:'numeric' },
    { q:'규칙: 1, 4, 9, 16, ?', choices:['20','25','24','30'], answer:1, domain:'numeric' },
    { q:'다음 중 소수(prime)인 것은?', choices:['9','15','17','21'], answer:2, domain:'numeric' },
    { q:'사과 3개에 2,400원. 사과 5개는?', choices:['3,600','4,000','4,200','4,500'], answer:1, domain:'numeric' },
    { q:'수열: 1, 3, 7, 15, ?', choices:['23','27','31','35'], answer:2, domain:'numeric' }
  ],
  memory: [
    { q:'다음 숫자열을 기억하세요: 7, 3, 9, 1, 5 — 세 번째 숫자는?', choices:['7','9','3','1'], answer:1, domain:'memory' },
    { q:'순서: 빨강-파랑-노랑-초록 — 두 번째 색깔은?', choices:['빨강','파랑','노랑','초록'], answer:1, domain:'memory' },
    { q:'A-D-G-J-M — 다음 글자는?', choices:['N','O','P','Q'], answer:2, domain:'memory' },
    { q:'다음 패턴: ●○●○● — 6번째는?', choices:['●','○','◐','◑'], answer:1, domain:'memory' },
    { q:'역순으로 답하세요: 2, 5, 8, 11 의 역순 첫 번째는?', choices:['2','5','11','8'], answer:2, domain:'memory' },
    { q:'단어 순서: 사과-바나나-포도-수박 — 세 번째 단어는?', choices:['사과','바나나','포도','수박'], answer:2, domain:'memory' },
    { q:'숫자열 4, 8, 15, 16, 23, 42 — 네 번째 숫자는?', choices:['15','16','23','42'], answer:1, domain:'memory' },
    { q:'요일 순서: 월-화-수-목-금 — 네 번째 요일은?', choices:['수','목','금','토'], answer:1, domain:'memory' },
    { q:'알파벳: B-E-H-K — 다음은? (3씩 증가)', choices:['L','M','N','O'], answer:2, domain:'memory' },
    { q:'순서 기억: 5-10-15-20-25 — 역순 두 번째는?', choices:['20','15','10','5'], answer:0, domain:'memory' },
    { q:'숫자열 9, 2, 7, 4, 6 — 다섯 번째는?', choices:['9','7','4','6'], answer:3, domain:'memory' },
    { q:'순서: 봄-여름-가을-겨울 — 세 번째 계절은?', choices:['봄','여름','가을','겨울'], answer:2, domain:'memory' },
    { q:'패턴: △□○△□○ — 8번째는?', choices:['△','□','○','◇'], answer:1, domain:'memory' },
    { q:'알파벳 역순: Z-Y-X-W — 다음은?', choices:['U','V','T','S'], answer:1, domain:'memory' },
    { q:'단어 순서: 산-바다-강-호수-들판 — 역순 두 번째는?', choices:['호수','강','바다','산'], answer:0, domain:'memory' }
  ]
};


/* ══ 검사 진행 ══ */
window._iqRun = null;

window.iqBegin = function(level){
  /* 앞 기능(건강·두피 등)이 카메라를 쥐고 있으면 IQ 카메라가 열리지 않는다 — 먼저 놓아준다 */
  try{ if(window._cgoStopAllCams) window._cgoStopAllCams(); }catch(e){}
  try{ window._iqStream = null; }catch(e){}
  var tier = ({25:'quick',35:'mensa',351:'standard',50:'formal',80:'precision'})[level] || 'quick';
  var qs;
  try{ qs = _iqBuildQuestions(tier); }catch(e){ qs = []; }
  if(!qs || !qs.length) return;
  window._iqRun = { tier:tier, qs:qs, at:0, answers:[], t0:Date.now(), tq:Date.now() };
  var pop = document.getElementById('iqTestPop');
  if(pop){ pop.style.display='block'; pop.scrollTop=0; }
  /* 문제를 푸는 동안 카메라가 함께 돈다 — 인지 건강과 같은 방식 */
  try{ iqCamStart(); }catch(e){}
  iqRender();
};

/* ★ 문제·보기 글자를 고른 언어로 바꾼다 — iq-tr.js 의 표를 쓴다 */
function _iqLang(){ try{ return (window.CGO_T && CGO_T.cur && CGO_T.cur()) || 'ko'; }catch(e){ return 'ko'; } }
function _iqT(s){
  if(typeof s !== 'string' || !s) return s;
  var L = _iqLang();
  if(L === 'ko' || !window.IQ_TR || !window.IQ_TR[L]) return s;
  var v = window.IQ_TR[L][s];
  return v || s;
}

function _k(n, f){ try{ var v=window.K&&window.K(n); return (v&&v!==String(n))?v:f; }catch(e){ return f; } }

window.iqRender = function(){
  var s = window._iqRun; if(!s) return;
  var q = s.qs[s.at];
  if(!q){ iqFinish(); return; }
  /* ★ 카메라를 문제 위에 둔다 — 문제를 푸는 동안 rPPG로 함께 본다 */
  try{ iqCamEnsure(); }catch(e){}
  var head = document.getElementById('iqTestHead');
  var body = document.getElementById('iqTestBody');
  if(!head || !body) return;

  var pct = Math.round((s.at / s.qs.length) * 100);
  head.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">'
    + '<span style="font-size:12px;font-weight:900;color:#0f766e;">' + _iqTr(q.domainLabel || q.domain || '') + '</span>'
    + '<span style="font-size:11px;color:#64748b;">' + (s.at+1) + ' / ' + s.qs.length + '</span></div>'
    + '<div style="height:6px;border-radius:999px;background:#e2e8f0;margin-top:8px;overflow:hidden;">'
    + '<div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#0d9488,#14b8a6);transition:width .25s;"></div></div>';

  var isSvg = /^\s*<svg/i.test(String(q.q || ''));
  /* ★ 도형 그림 — pattern-images/p001.jpeg … 100장.
     못 불러오면 글자 도형(pattern)으로 조용히 떨어진다. */
  var imgHtml = '';
  if(q.image){
    imgHtml = '<img src="' + q.image + '" alt="" '
      + 'style="max-width:100%;height:auto;display:block;margin:0 auto;border-radius:10px;" '
      + 'onerror="this.style.display=\'none\';var t=this.nextElementSibling;if(t)t.style.display=\'block\';">'
      + '<div style="display:none;font-size:22px;font-weight:800;color:#0f172a;text-align:center;'
      + 'letter-spacing:.12em;line-height:1.8;">' + (q.pattern || '') + '</div>';
  }
  body.innerHTML =
    '<div style="background:#fff;border:1px solid #d7eee8;border-radius:16px;padding:14px;margin-top:11px;'
    + (imgHtml ? 'display:flex;align-items:center;gap:12px;' : '') + '">'
    + (imgHtml ? '<div style="flex:1;min-width:0;">' : '')
    + (isSvg
        ? '<div style="display:flex;justify-content:center;">' + q.q + '</div>'
        : '<div style="font-size:13.5px;font-weight:800;color:#0f172a;line-height:1.6;text-wrap:pretty;">' + _iqTr(q.q) + '</div>')
    + (imgHtml ? '</div>' : '')
    + (imgHtml ? '<div style="flex:none;width:44%;max-width:190px;">' + imgHtml + '</div>' : '')
    + '</div>'
    + '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:12px;">'
    + q.opts.map(function(o, i){
        var svg = /^\s*<svg/i.test(String(o));
        return '<button type="button" onclick="iqAnswer(' + i + ')" '
          + 'style="padding:' + (svg ? '14px 8px' : '16px 12px') + ';border-radius:14px;border:1.5px solid #d7eee8;'
          + 'background:#fff;cursor:pointer;font-family:inherit;text-align:' + (svg ? 'center' : 'left') + ';'
          + 'min-height:56px;display:flex;align-items:center;justify-content:' + (svg ? 'center' : 'flex-start') + ';gap:9px;">'
          + '<span style="flex:none;width:22px;height:22px;border-radius:999px;background:#f0fdf9;color:#0f766e;'
          + 'font-size:11px;font-weight:900;display:inline-flex;align-items:center;justify-content:center;">'
          + String.fromCharCode(65+i) + '</span>'
          + '<span style="flex:1;min-width:0;font-size:' + (svg ? '13px' : '13.5px') + ';color:#0f172a;font-weight:700;'
          + 'line-height:1.5;overflow-wrap:anywhere;">' + _iqTr(o) + '</span></button>';
      }).join('')
    + '</div>';
  s.tq = Date.now();
};

window.iqAnswer = function(i){
  var s = window._iqRun; if(!s) return;
  var q = s.qs[s.at];
  s.answers.push({ i:i, ok:(i === q.answer), ms:(Date.now() - s.tq), domain:q.domain });
  s.at++;
  iqRender();
};

window.iqFinish = function(){
  var s = window._iqRun; if(!s) return;
  try{ iqCamStop(); }catch(e){}
  var right = s.answers.filter(function(a){ return a.ok; }).length;
  var total = s.qs.length;
  var rate = total ? right / total : 0;
  var avgMs = s.answers.length
    ? Math.round(s.answers.reduce(function(t,a){ return t + a.ms; }, 0) / s.answers.length) : 0;
  /* 점수는 정답률로 잡고, 반응 속도로 살짝 다듬는다 */
  var score = Math.round(70 + rate * 60 + Math.max(-5, Math.min(5, (6000 - avgMs) / 1200)));

  var byDom = {};
  s.answers.forEach(function(a){
    if(!byDom[a.domain]) byDom[a.domain] = { n:0, ok:0 };
    byDom[a.domain].n++; if(a.ok) byDom[a.domain].ok++;
  });
  var label = { pattern:_k(9702,'패턴 인식'), spatial:_k(9703,'공간 추론'),
                verbal:_k(9704,'언어 능력'), numeric:_k(9705,'수리 논리'), memory:_k(9706,'작업 기억') };

  var body = document.getElementById('iqTestBody');
  /* ★ 카메라를 문제 위에 둔다 — 문제를 푸는 동안 rPPG로 함께 본다 */
  try{ iqCamEnsure(); }catch(e){}
  var head = document.getElementById('iqTestHead');
  if(head) head.innerHTML = '<div style="font-size:12px;font-weight:900;color:#0f766e;">' + _k(9720,'검사 결과') + '</div>';
  if(!body) return;
  body.innerHTML =
    '<div style="background:#fff;border:1px solid #d7eee8;border-radius:18px;padding:22px 16px;margin-top:13px;text-align:center;">'
    + '<div style="font-size:11px;color:#64748b;font-weight:700;">' + _k(9721,'추정 점수') + '</div>'
    + '<div style="font-size:44px;font-weight:900;color:#0f766e;line-height:1.1;margin-top:4px;">' + score + '</div>'
    + '<div style="font-size:11px;color:#475569;margin-top:6px;">'
    + _k(9722,'정답') + ' ' + right + '/' + total + ' · ' + _k(9723,'평균 반응') + ' ' + (avgMs/1000).toFixed(1) + 's</div></div>'
    + '<div style="background:#fff;border:1px solid #d7eee8;border-radius:16px;padding:15px 16px;margin-top:11px;">'
    + '<div style="font-size:12.5px;font-weight:900;color:#0f766e;">' + _k(9724,'영역별 결과') + '</div>'
    + Object.keys(byDom).map(function(d){
        var v = byDom[d], p = Math.round(v.ok / v.n * 100);
        return '<div style="margin-top:11px;">'
          + '<div style="display:flex;justify-content:space-between;font-size:11.5px;font-weight:700;color:#0f172a;">'
          + '<span>' + (label[d] || d) + '</span><span style="color:#0f766e;">' + v.ok + '/' + v.n + '</span></div>'
          + '<div style="height:7px;border-radius:999px;background:#e2e8f0;margin-top:5px;overflow:hidden;">'
          + '<div style="height:100%;width:' + p + '%;background:#14b8a6;"></div></div></div>';
      }).join('')
    + '</div>'
    + '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:13px 14px;margin-top:11px;">'
    + '<div style="font-size:10.5px;color:#64748b;line-height:1.75;">' + _k(9711,'') + '</div></div>'
    + '<button type="button" onclick="iqTestClose()" style="width:100%;margin-top:14px;padding:15px;border:0;'
    + 'border-radius:999px;background:#0f172a;color:#fff;font-size:14px;font-weight:900;cursor:pointer;font-family:inherit;">'
    + _k(9725,'✓ 닫기') + '</button>';
};

window.iqTestClose = function(){
  try{ iqCamStop(); }catch(e){}
  var p = document.getElementById('iqTestPop');
  if(p) p.style.display = 'none';
  window._iqRun = null;
};


/* ══ 검사 중 카메라 — 문제 위에 붙여 둔다 ══ */
window.iqCamEnsure = function(){
  /* ★ 카메라는 팝업 위쪽에 붙박이로 하나만 둔다 (인지 건강과 같은 구조).
     예전엔 여기서 또 하나를 만들어 문항을 아래로 밀어냈다. */
};;

window.iqCamStop = function(){
  try{
    if(window._iqStream){ window._iqStream.getTracks().forEach(function(t){ t.stop(); }); window._iqStream = null; }
  }catch(e){}
  var v = document.getElementById('iq-video'); if(v) v.srcObject = null;
  var host = document.getElementById('iqCamHost');
  if(host){ host.innerHTML = ''; host.setAttribute('data-on','0'); }
};


/* ══ 문제·보기 번역 — 원문을 열쇠로 찾아 바꾼다 ══
   문제는 도형 생성 함수가 만들어 내므로 자리 번호를 심을 수 없다.
   그래서 원문 글자를 그대로 열쇠로 쓰고, 사전에 있으면 갈아 넣는다. */
window._iqTr = function(t){
  if(!t || typeof t !== 'string') return t;
  if(/^\s*<svg/i.test(t)) return t;            /* 도형은 그대로 */
  try{
    var L = (window.CGO_T && CGO_T.cur && CGO_T.cur()) || 'ko';
    if(L === 'ko') return t;
    var D = window.IQ_TR && window.IQ_TR[L];
    if(D && D[t]) return D[t];
  }catch(e){}
  return t;
};

/* ══ IQ — 카메라 (문제를 푸는 동안 함께 돈다) ══ */
window.iqCamStart = function(){
  var v = document.getElementById('iq-video'), idle = document.getElementById('iq-idle');
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
  navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:640},height:{ideal:480},frameRate:{ideal:30}}})
    .catch(function(){ return navigator.mediaDevices.getUserMedia({video:true}); })
    .then(function(s){
      window._iqStream = s;
      if(v){ v.srcObject = s; v.play().catch(function(){}); }
      if(idle) idle.style.display = 'none';
    })
    .catch(function(){});
};
window.iqCamStop = function(){
  try{
    var s = window._iqStream;
    if(s){ s.getTracks().forEach(function(t){ t.stop(); }); window._iqStream = null; }
  }catch(e){}
  var v = document.getElementById('iq-video'); if(v) v.srcObject = null;
  var idle = document.getElementById('iq-idle'); if(idle) idle.style.display = 'flex';
};

/* ★ 검사 중에 언어를 바꾸면 그 자리에서 문제를 다시 그린다.
   앞서는 한 번 그린 뒤 다시 그리지 않아, 언어를 바꿔도 앞 언어가 남았다. */
(function(){
  function redraw(){
    if(!window._iqRun) return;
    var p=document.getElementById('iqTestPop');
    if(!p || getComputedStyle(p).display==='none') return;
    try{ iqRender(); }catch(e){}
  }
  if(window.cgoRepaintOn) cgoRepaintOn(redraw);
  else [300,1200,3000].forEach(function(d){ setTimeout(function(){ if(window.cgoRepaintOn) cgoRepaintOn(redraw); }, d); });
})();
