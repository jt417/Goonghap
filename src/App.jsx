import { useState } from "react";

const YEARS = [2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];

const SEUN_META = [
  { season: "🌤️ 초여름", direction: "확산(드러내기)", pivot: null },
  { season: "☀️ 한여름", direction: "확산(드러내기)", pivot: "⭐ 한여름 정점 (낮이 가장 긴 날)" },
  { season: "🌅 늦여름", direction: "확산→축적 전환", pivot: null },
  { season: "🍂 초가을", direction: "축적(내실 다지기)", pivot: null },
  { season: "🍁 중가을", direction: "축적(내실 다지기)", pivot: "⭐ 밤낮 같은 날 (가을 전환점)" },
  { season: "🌾 늦가을", direction: "축적(내실 다지기)", pivot: null },
  { season: "❄️ 초겨울", direction: "축적(내실 다지기)", pivot: null },
  { season: "⛄ 한겨울", direction: "축적(방어)", pivot: "⭐ 밤이 가장 긴 날 (바닥→반등 시작)" },
  { season: "🌫️ 늦겨울", direction: "축적→확산 준비", pivot: null },
  { season: "🌱 초봄", direction: "확산(드러내기)", pivot: null },
  { season: "🌸 중봄", direction: "확산(드러내기)", pivot: "⭐ 밤낮 같은 날 (봄 전환점)" },
];

const SOCIAL = [
  { icon: "🌤️", title: "세상의 계절: 초여름", body: "경기가 활발해지고, 새로운 도전에 순풍이 부는 시기입니다.", warn: null },
  { icon: "☀️", title: "세상의 계절: 한여름 ★", body: "세상 전체가 '드러내고 나누라'는 에너지입니다. 1년 중 가장 밝고 뜨거운 시기처럼, 무언가를 세상에 보여주기에 가장 좋은 해입니다.", warn: "⏰ 6/21~7/7 주의: 여름→가을로 바뀌기 시작하는 전환기. 이직·큰 계약 등 중요한 결정은 7월 7일 이후로 미루는 게 안전합니다." },
  { icon: "🌅", title: "세상의 계절: 늦여름", body: "뜨거웠던 분위기가 서서히 식기 시작합니다. 상반기에 마무리하고 하반기엔 차분히 정리하는 분위기.", warn: null },
  { icon: "🍂", title: "세상의 계절: 초가을", body: "사회 전체가 '수확하고 정리하자'는 분위기. 벌어놓은 것을 챙기고, 새로운 투자는 신중해야 합니다.", warn: null },
  { icon: "🍁", title: "세상의 계절: 중가을", body: "밤낮 길이가 같아지는 추분처럼, 사회 분위기가 확 바뀌는 전환점입니다. 호황에서 불황으로 넘어가는 경계.", warn: "⏰ 9월 하순 주의: 분위기가 급변할 수 있습니다." },
  { icon: "🌾", title: "세상의 계절: 늦가을", body: "경기 하락이 빨라집니다. 현금을 넉넉히 확보해두는 것이 좋습니다.", warn: null },
  { icon: "❄️", title: "세상의 계절: 초겨울 ⚠️", body: "경기 침체가 시작됩니다. 12년 주기로 반복되는 '겨울'의 입구.", warn: "⏰ 이 해부터 현금 비중을 높여야 합니다." },
  { icon: "⛄", title: "세상의 계절: 한겨울 ⚠️⚠️", body: "12년마다 반복되는 경제 위기 구간. 1997 IMF, 2008 금융위기, 2020 코로나가 모두 이 시기였습니다. 가장 추운 밤이지만, 이 순간부터 다시 낮이 길어지기 시작합니다.", warn: "⏰ 12월 하순: 위기의 정점이자 반등의 시작. 바닥에서 기회를 잡는 안목이 필요합니다." },
  { icon: "🌫️", title: "세상의 계절: 늦겨울", body: "아직 춥지만 봄 기운이 조금씩 느껴집니다. 좋은 자산이나 인재를 싸게 확보할 수 있는 시기.", warn: null },
  { icon: "🌱", title: "세상의 계절: 초봄! ★", body: "겨울이 끝나고 봄이 옵니다! 12년 주기의 반등이 시작되어 새출발·확장에 사회적 순풍이 붑니다.", warn: null },
  { icon: "🌸", title: "세상의 계절: 중봄", body: "성장이 가속되는 봄의 절정. 도전과 확장에 유리한 시기.", warn: "⏰ 3월 하순: 계절 전환점으로 분위기가 급변할 수 있습니다." },
];

const data = {
  jt: {
    name: "이정택", emoji: "⚔️", color: "#1e3a5f",
    sub: "강철·도끼의 기질 | 겨울에 태어나 불이 필요한 사주",
    trad: [3,2,4,0,-1,2,0,-3,1,3,2],
    pai: [3,5,4,3,1,5,3,-1,2,4,4],
    tradNotes: [
      "재물운과 직장운이 함께 들어오는 좋은 해입니다. 안정적으로 돈이 들어오고, 사회적 인정도 따릅니다.",
      "사회적 압박이 강하게 오는 해. 바쁘고 치열하지만 성과도 있습니다. 다만 여러 방향에서 요구가 몰려 에너지 소모가 큽니다. 겨울 사주에 불이 와서 따뜻해지는 면(좋음)과, 그 불이 너무 세서 부담되는 면(힘듦)이 공존합니다.",
      "★ 10년 중 가장 좋은 해! '질서가 지식을 도와주는' 이상적인 조합. 방향을 잡고 자격이나 전문성을 확립하기에 최적.",
      "기존에 잘 돌아가던 시스템에 브레이크가 걸리는 느낌. 새로운 방법이 필요하지만, 기존 방식을 고집하면 성과가 줄어듭니다. 변화를 받아들여야 하는 해.",
      "큰 변동의 해. 직장·거처·관계에서 예상치 못한 변화가 올 수 있습니다. 인생의 큰 전환기와 겹쳐 이중으로 불안정. 무리한 도전보다 정리에 집중.",
      "새로운 10년이 시작되는 해! 좋은 기운(따뜻한 불)이 10년간 함께하는 대운이 시작됩니다. 다만 첫 해는 적응기라 격변 속에서 방향을 잡아가는 시기.",
      "같은 패턴이 반복되어 답답함을 느끼는 해. 큰 발전보다는 현상 유지. 에너지를 아끼고 내실을 다지세요.",
      "⚠️ 10년 중 가장 어려운 해. 체력 소모·감정 기복·재물 유출에 주의. 사회적 경기 침체와 겹칩니다. 다만 대운의 보호가 있어 치명적이진 않습니다.",
      "어려운 시기 이후의 회복기. 날카로웠던 마음이 안정을 되찾고, 차분히 실력을 쌓는 해.",
      "재물 기회가 강하게 오는 해. 사주에 필요한 에너지가 세운으로 완성되어, 그동안 쌓은 것이 돈으로 바뀌기 시작합니다.",
      "안정적인 재물운이지만, 주체성이 흐려질 수 있는 해. 남의 의견에 끌려가지 말고 자기 결정을 지키는 것이 중요합니다.",
    ],
    paiNotes: [
      "🌍 세상이 활기차게 움직이는 초여름 에너지.\n\n⚔️ 강철이 불에 달궈지기 시작하는 시기 — 본격적인 단련의 준비 단계입니다.\n\n💡 할 일: 팀을 구성하고, 사업의 기초를 설계하세요. 아직 드러낼 때는 아니고, 뿌리를 내릴 때입니다.\n\n📌 적극적으로 사람을 만나고 네트워크를 구축하기 좋은 해입니다.",
      "🌍 세상 전체가 '보여주고 나눠라'는 에너지! 1년 중 가장 밝은 시기.\n\n⚔️ 강철이 뜨거운 불을 만나 날카로운 도구로 단련되는 해! 옛말에 '불을 만나면 날카로워진다'고 했는데, 바로 올해입니다. 10년 중 최고의 기회!\n\n💡 할 일: 상반기에 제품 런칭·브랜딩·콘텐츠를 전면에 내세우세요. 하반기에는 내실과 기술 개발에 집중.\n\n⏰ 6/21~7/7 주의: 여름 정점 직후 전환기. 큰 결정은 7/7 이후로.\n\n📌 경쟁에 정면 승부하기 좋은 해. 미디어 노출에 유리합니다.",
      "🌍 사회의 열기가 식기 시작.\n\n⚔️ 단련된 강철을 마무리로 다듬는 시기. 이 해가 인생의 전반부와 후반부를 가르는 분기점(만 39세)입니다.\n\n💡 할 일: '이 방향으로 간다!'는 큰 결단의 해. 사업 모델과 팀 구조를 확정하세요.\n\n📌 이제 드러내기보다 축적하기로 방향이 바뀝니다.",
      "🌍 사회가 조정기에 들어섬.\n\n⚔️ 강철이 가을(자기 본래 계절)에 가까워지며 힘을 회복합니다. 기존 방식을 점검하고 새로운 학습법을 도입하세요.\n\n💡 할 일: 특허·IP 확보, 기술 개발 심화에 집중.\n\n📌 전문성을 깊이 쌓는 시간입니다.",
      "🌍 사회 분위기가 확 바뀌는 전환점.\n\n⚔️ 강철의 날이 가장 날카로운 계절이지만, 인생의 큰 전환기와 겹쳐 힘이 분산됩니다.\n\n💡 할 일: 지금까지 이룬 것을 정리·수확. 다음 10년의 방향을 설계. 큰 변화는 자제.\n\n⏰ 9월 하순 전후: 분위기 급변 주의.",
      "🌍 사회적으로는 하락기이지만, 개인적으로는 새로운 10년의 시작!\n\n⚔️ ★ 드디어 10년간 '태양(큰 불)'이 함께하는 시기가 시작됩니다! 겨울에 태어난 강철에 가장 필요했던 따뜻한 불이 10년간 곁에 있게 됩니다.\n\n💡 할 일: 사회가 어려울 때 오히려 준비하는 것이 전략. 대담한 비전을 세우세요.\n\n📌 이 해에 세운 방향이 향후 10년을 좌우합니다.",
      "🌍 ⚠️ 12년 주기 경기 침체 시작.\n\n⚔️ 쉬고 있는 강철. 같은 패턴이 반복되어 답답하지만, 에너지를 모아두는 시기입니다.\n\n💡 할 일: 확장보다 내실! 2032년에 올 경기 한파에 대비해 반드시 현금을 넉넉히 확보하세요.\n\n📌 안전자산 비중을 높이고, 지출을 줄이세요.",
      "🌍 ⚠️⚠️ 12년 주기 경제 바닥.\n\n⚔️ 가장 차가운 겨울. 체력·재물 소모 주의. 하지만 '밤이 가장 긴 날'은 곧 낮이 길어지기 시작하는 날이기도 합니다.\n\n💡 할 일: 방어가 최우선! 현금 확보. 바닥에서 좋은 자산·인재를 싸게 확보할 기회를 노리세요.\n\n📌 살아남는 것이 이기는 것입니다.",
      "🌍 아직 춥지만 봄 기운이 슬슬 느껴집니다.\n\n⚔️ 에너지 축적 마무리. 봄을 향한 준비를 시작하세요.\n\n💡 할 일: 2032년 바닥에서 확보한 것들을 정리. 다음 봄의 청사진을 완성하세요.",
      "🌍 ★ 봄이 왔습니다! 12년 주기 반등 시작!\n\n⚔️ ★ 겨울을 지나온 강철이 다시 쓰일 곳을 만남! 10년간 함께하는 태양 아래, 봄나무가 자라기 시작합니다.\n\n💡 할 일: 공격적 확장! 투자 집행, 새 사업 런칭, 시장 점유율 확대.\n\n📌 겨울에 축적한 힘을 봄에 터뜨리세요.",
      "🌍 봄의 절정. 사회 성장이 가속됩니다.\n\n⚔️ 재물이 풍성한 계절.\n\n💡 할 일: 성장의 과실을 수확. 좋은 파트너와 협업하기 좋은 해.\n\n⏰ 3월 하순: 계절 전환점, 분위기 급변 가능.",
    ],
  },
  jy: {
    name: "이주연", emoji: "💎", color: "#6d28d9",
    sub: "보석·바늘의 기질 | 가을에 태어나 이미 빛나고 있는 사주",
    trad: [1,1,2,3,4,1,0,-3,1,2,-1],
    pai: [3,4,3,3,4,3,3,-1,2,4,3],
    tradNotes: [
      "재물이 움직이지만 피로감이 있는 해. 같은 패턴이 반복되면서 지침을 느낄 수 있습니다.",
      "직장·사회적 압박이 두 배로 오는 해. 바쁘고 인정은 받지만 체력·정신적 부담이 큽니다. 원래 균형이 좋은 사주에 불이 너무 많이 들어오는 느낌.",
      "어려운 상황이 지식·학문을 통해 해결되는 해. 인생의 큰 전환기와 겹치지만 방향은 긍정적.",
      "★ 새로운 10년 대운 시작! 자기 힘이 강해지고 안정감이 생기는 해. 전문성을 기반으로 커리어를 재설계하기 좋습니다.",
      "★★ 10년 중 가장 좋은 해! 보석이 맑은 가을 하늘에서 가장 빛나는 순간. 자격 취득·승진·전문가 인정에 최적. 이 해의 성과가 향후 10년의 기반.",
      "자기 에너지가 넘치지만, 너무 완벽을 추구하면 주변이 지칠 수 있습니다. 적절히 내려놓는 연습이 필요한 해.",
      "같은 패턴이 반복되어 답답한 해. 큰 발전보다 현상 유지. 확장보다 내실.",
      "⚠️ 10년 중 가장 어려운 해. 에너지가 과도하게 빠져나가 체력·감정 소모가 큽니다. 다만 원래 균형이 좋은 사주라 정택님보다는 버팁니다.",
      "어려운 시기 이후 회복기. 안정감이 돌아오고, 차분히 다음을 준비하는 해.",
      "안정적 재물 기회! 다만 대운 전환기와 겹쳐 직장·환경에 변동이 있을 수 있습니다.",
      "새 대운 적응기. 여름의 더운 에너지가 보석에게 부담. 무리한 확장보다 안정적으로.",
    ],
    paiNotes: [
      "🌍 세상이 활기차게 움직이는 초여름.\n\n💎 보석이 따뜻한 빛을 받아 빛나기 시작합니다.\n\n💡 할 일: 전문 분야에서 자신을 알리기 시작하세요. 자격증·포트폴리오 정리하기 좋은 해.\n\n📌 드러내기를 시작하는 해입니다.",
      "🌍 세상 전체가 '보여주고 나눠라'는 에너지!\n\n💎 ★ 강렬한 태양빛 아래 보석이 눈부시게 빛나는 해! 다만 너무 강한 열은 보석을 상하게 할 수 있어, 쉬는 시간도 필요합니다.\n\n💡 할 일: 상반기에 전문성을 적극 노출! 강의·세미나·SNS 활동. 하반기에 내면 충전.\n\n⏰ 6/21~7/7 주의: 큰 결정은 이후로.\n\n📌 네트워킹·자신을 알리는 활동에 최적인 해.",
      "🌍 사회의 열기가 식기 시작.\n\n💎 보석이 안정을 되찾는 시기. 인생의 큰 전환기와 겹쳐 내면에서 변화가 일어납니다.\n\n💡 할 일: 새로운 방향을 설계하세요.\n\n📌 확산에서 축적으로 방향이 바뀌는 해.",
      "🌍 사회가 조정기에 들어감.\n\n💎 ★ 보석이 가을(자기 본래 계절)에 가까워지며 빛이 살아납니다! 10년간 좋은 에너지가 함께하는 새 대운이 시작됩니다.\n\n💡 할 일: 전문성을 기반으로 커리어를 새로 설계하기 딱 좋은 시기.\n\n📌 내실을 다지면서 전문성을 키우세요.",
      "🌍 사회 분위기 전환점.\n\n💎 ★★ 맑은 가을 하늘에서 보석이 가장 빛나는 순간! '혼자 가을을 즐긴다'는 옛말이 딱 맞는 해. 10년 중 자기 능력이 최고조!\n\n💡 할 일: 자격 취득, 승진, 전문가로서 인정받기에 최적. 이 해의 성과가 다음 10년의 기반이 됩니다.\n\n⏰ 9월 하순: 분위기 급변 가능.\n\n📌 전문성의 정점. 놓치지 마세요!",
      "🌍 사회 하락기 시작.\n\n💎 자기 에너지가 넘치지만, 너무 완벽주의에 빠지지 않도록 주의.\n\n💡 할 일: 적절히 내려놓는 연습. 사회 하락기에 맞춰 방어 준비 시작.\n\n📌 내실 다지기 + 현금 확보 시작.",
      "🌍 ⚠️ 12년 주기 경기 침체 시작.\n\n💎 같은 패턴이 반복되어 답답하지만, '익숙한 것의 심화'라고 생각하세요.\n\n💡 할 일: 2032년 한파에 대비해 현금을 넉넉히 확보하세요.\n\n📌 확장보다 내실. 전문성 심화.",
      "🌍 ⚠️⚠️ 12년 주기 경제 바닥.\n\n💎 차가운 물에 잠기는 보석. 에너지 소모가 크지만, 원래 균형이 좋은 사주라 견딜 수 있습니다.\n\n💡 할 일: 방어가 최우선! 전문성이라는 무기가 이 겨울을 견디게 해줍니다.\n\n📌 살아남으면 다음 봄이 반드시 옵니다.",
      "🌍 아직 춥지만 봄 기운이 슬슬.\n\n💎 안정감이 돌아옵니다.\n\n💡 할 일: 2032년 위기에서 배운 것을 정리하고, 봄 준비를 시작하세요.",
      "🌍 ★ 봄이 왔습니다! 12년 주기 반등!\n\n💎 봄 흙 속에서 보석이 드러나기 시작합니다. 다만 대운 전환기와 겹쳐 변화도 함께 옵니다.\n\n💡 할 일: 봄의 순풍을 타되, 무리하지 않으면서 성장하세요.\n\n📌 변화 속의 기회. 재물 기회를 잡되 보수적으로.",
      "🌍 봄의 절정. 사회 성장 가속.\n\n💎 봄은 나무의 계절이고, 보석에게 나무는 '재물'입니다.\n\n💡 할 일: 안정적 기반 위에서 점진적 성장. 새 대운 적응기라 무리한 확장은 자제.\n\n⏰ 3월 하순: 분위기 급변 가능.",
    ],
  },
};

const sColor = (s) => s>=4?"#059669":s>=2?"#2563eb":s>=0?"#6b7280":s>=-1?"#d97706":"#dc2626";
const sBg = (s) => s>=4?"#ecfdf5":s>=2?"#eff6ff":s>=0?"#f9fafb":s>=-1?"#fffbeb":"#fef2f2";
const sLabel = (s) => s>=4?"아주 좋음":s>=2?"좋음":s>=0?"보통":s>=-1?"주의":"어려움";
const sEmoji = (s) => s>=4?"\uD83D\uDD25":s>=2?"\u2600\uFE0F":s>=0?"\u2601\uFE0F":s>=-1?"\uD83C\uDF27\uFE0F":"\u26C8\uFE0F";

function ChartLine({values,color,sel,onSel}){
  const w=760,h=160,px=40,maxV=5;
  const pts=values.map((v,i)=>({x:px+(i/(values.length-1))*(w-px*2),y:h/2-(v/maxV)*(h/2-20)}));
  return(<g>
    <polyline points={pts.map(p=>`${p.x},${p.y}`).join(" ")} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" opacity={0.4}/>
    {pts.map((p,i)=>(<g key={i} onClick={()=>onSel(i)} style={{cursor:"pointer"}}>
      <circle cx={p.x} cy={p.y} r={sel===i?16:10} fill={sel===i?color:"white"} stroke={sColor(values[i])} strokeWidth={2.5}/>
      <text x={p.x} y={p.y+5} textAnchor="middle" fontSize={sel===i?12:10} fontWeight={700} fill={sel===i?"white":sColor(values[i])}>{sEmoji(values[i])}</text>
    </g>))}
  </g>);
}

function Person({pk}){
  const d=data[pk];
  const[sel,setSel]=useState(null);
  const w=760,h=160,px=40;
  const soc=sel!==null?SOCIAL[sel]:null;
  const sm=sel!==null?SEUN_META[sel]:null;
  return(
    <div style={{background:"white",borderRadius:20,padding:"20px 20px 16px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #e5e7eb",marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{width:48,height:48,borderRadius:14,background:d.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{d.emoji}</div>
        <div><div style={{fontWeight:800,fontSize:18,color:"#111827"}}>{d.name}</div><div style={{fontSize:12,color:"#6b7280",lineHeight:1.4}}>{d.sub}</div></div>
      </div>
      <svg viewBox={`0 0 ${w} ${h+32}`} style={{width:"100%",height:h+32}}>
        <line x1={px} y1={h/2} x2={w-px} y2={h/2} stroke="#e5e7eb" strokeWidth={1} strokeDasharray="4,4"/>
        <text x={12} y={30} fontSize={8} fill="#9ca3af">좋음</text>
        <text x={12} y={h-10} fontSize={8} fill="#9ca3af">주의</text>
        <ChartLine values={d.trad} color="#d97706" sel={sel} onSel={i=>setSel(sel===i?null:i)}/>
        <ChartLine values={d.pai} color="#2563eb" sel={sel} onSel={i=>setSel(sel===i?null:i)}/>
        {YEARS.map((y,i)=>{const x=px+(i/(YEARS.length-1))*(w-px*2);return<text key={y} x={x} y={h+16} textAnchor="middle" fontSize={10} fontWeight={sel===i?700:400} fill={sel===i?"#111827":"#9ca3af"}>{y}</text>;})}
      </svg>
      <div style={{display:"flex",gap:16,justifyContent:"center",marginBottom:sel!==null?12:0}}>
        <div style={{display:"flex",alignItems:"center",gap:4,fontSize:12}}><span style={{width:18,height:4,background:"#d97706",borderRadius:2,display:"inline-block"}}/><span style={{color:"#92400e",fontWeight:600}}>전통 사주이론</span></div>
        <div style={{display:"flex",alignItems:"center",gap:4,fontSize:12}}><span style={{width:18,height:4,background:"#2563eb",borderRadius:2,display:"inline-block"}}/><span style={{color:"#1d4ed8",fontWeight:600}}>파이 이론</span></div>
      </div>
      {sel!==null&&(
        <div style={{background:"#f9fafb",borderRadius:16,padding:16,border:"1px solid #e5e7eb"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"}}>
            <span style={{fontSize:22}}>{sEmoji(d.pai[sel])}</span>
            <span style={{fontWeight:800,fontSize:17,color:"#111827"}}>{YEARS[sel]}년</span>
            {sm&&<span style={{fontSize:11,padding:"3px 10px",borderRadius:8,background:"#e0f2fe",color:"#0369a1"}}>{sm.season}</span>}
            {sm&&<span style={{fontSize:11,padding:"3px 10px",borderRadius:8,background:sm.direction.includes("확산")?"#fef3c7":"#e0e7ff",color:sm.direction.includes("확산")?"#92400e":"#3730a3"}}>{sm.direction}</span>}
            {sm?.pivot&&<span style={{fontSize:10,padding:"3px 8px",borderRadius:8,background:"#fecaca",color:"#991b1b"}}>{sm.pivot}</span>}
          </div>
          {soc&&(
            <div style={{marginBottom:10,padding:"12px 14px",background:"#f0fdf4",borderRadius:12,borderLeft:"4px solid #22c55e"}}>
              <div style={{fontSize:13,fontWeight:700,color:"#15803d",marginBottom:4}}>{soc.icon} {soc.title}</div>
              <div style={{fontSize:13,color:"#374151",lineHeight:1.7}}>{soc.body}</div>
              {soc.warn&&<div style={{fontSize:12.5,color:"#dc2626",marginTop:6,fontWeight:600,lineHeight:1.5}}>{soc.warn}</div>}
            </div>
          )}
          <div style={{display:"grid",gap:10}}>
            <div style={{padding:"12px 14px",background:"white",borderRadius:12,borderLeft:"4px solid #d97706"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                <span style={{fontSize:12,fontWeight:700,color:"#92400e"}}>📜 전통 사주이론의 판단</span>
                <span style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:sBg(d.trad[sel]),color:sColor(d.trad[sel]),fontWeight:700}}>{sLabel(d.trad[sel])}</span>
              </div>
              <div style={{fontSize:13,color:"#374151",lineHeight:1.8}}>{d.tradNotes[sel]}</div>
            </div>
            <div style={{padding:"12px 14px",background:"white",borderRadius:12,borderLeft:"4px solid #2563eb"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                <span style={{fontSize:12,fontWeight:700,color:"#1d4ed8"}}>🥧 파이 이론의 판단</span>
                <span style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:sBg(d.pai[sel]),color:sColor(d.pai[sel]),fontWeight:700}}>{sLabel(d.pai[sel])}</span>
              </div>
              <div style={{fontSize:13,color:"#374151",lineHeight:1.8,whiteSpace:"pre-line"}}>{d.paiNotes[sel]}</div>
            </div>
          </div>
          {Math.abs(d.trad[sel]-d.pai[sel])>=2&&(
            <div style={{marginTop:8,padding:"10px 14px",background:"#fef3c7",borderRadius:10,border:"1px solid #fcd34d"}}>
              <div style={{fontSize:12,color:"#92400e",lineHeight:1.6}}>
                <strong>💡 두 이론의 시각이 다릅니다.</strong>{" "}
                {d.pai[sel]>d.trad[sel]?"파이 이론은 '세상의 흐름'과 '계절적 균형'을 추가로 봐서 더 긍정적입니다. 전통 이론은 사주 내부의 충돌을 더 엄격하게 평가합니다.":"전통 이론이 사주 내부의 조화를 더 높이 평가합니다."}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App(){
  return(
    <div style={{maxWidth:860,margin:"0 auto",padding:"16px 12px",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans KR',sans-serif"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:14,color:"#6b7280",marginBottom:4}}>HANI by YMDT</div>
        <h1 style={{fontSize:22,fontWeight:900,color:"#111827",margin:"0 0 4px",lineHeight:1.3}}>앞으로 10년, 나의 운세 흐름</h1>
        <p style={{fontSize:13,color:"#9ca3af",margin:0}}>2025~2035 · 전통 사주이론 vs 파이 이론 비교</p>
        <p style={{fontSize:12,color:"#b0b0b0",margin:"8px 0 0"}}>그래프의 점을 클릭하면 그 해의 상세 분석을 볼 수 있어요</p>
      </div>
      <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:20}}>
        {[{s:4,e:"\uD83D\uDD25",l:"아주 좋음"},{s:2,e:"\u2600\uFE0F",l:"좋음"},{s:0,e:"\u2601\uFE0F",l:"보통"},{s:-1,e:"\uD83C\uDF27\uFE0F",l:"주의"},{s:-3,e:"\u26C8\uFE0F",l:"어려움"}].map(({s,e,l})=>(
          <div key={l} style={{display:"flex",alignItems:"center",gap:3,fontSize:12,color:"#6b7280"}}><span>{e}</span>{l}</div>
        ))}
      </div>
      <Person pk="jt"/>
      <Person pk="jy"/>
      <div style={{background:"#f8fafc",borderRadius:14,padding:16,border:"1px solid #e2e8f0",fontSize:13,color:"#475569",lineHeight:1.8}}>
        <div style={{fontWeight:700,marginBottom:6,color:"#334155"}}>📖 이 분석은 이렇게 만들어졌어요</div>
        <div><strong>전통 사주이론</strong>은 수천 년간 축적된 고전을 바탕으로, 사주 내부의 오행 균형과 충돌을 분석합니다.</div>
        <div style={{marginTop:6}}><strong>파이 이론</strong>은 고전의 핵심(절기·계절)을 현대적으로 재해석하여, '세상의 흐름' 안에서 '내 강점을 어떻게 쓸 것인가'에 초점을 맞춥니다.</div>
        <div style={{marginTop:6,color:"#94a3b8",fontSize:12}}>두 이론은 서로 보완적입니다. 전통 이론이 '정밀 진단'이라면, 파이 이론은 '실천 가이드'입니다.</div>
      </div>
    </div>
  );
}
