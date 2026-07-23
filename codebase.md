# .data/stocks.db

This is a binary file of the type: Binary

# .gitignore

```
# Nuxt dev/build outputs
.output
.data
.nuxt
.nitro
.cache
dist

# Node dependencies
node_modules

# Logs
logs
*.log

# Misc
.DS_Store
.fleet
.idea

# Local env files
.env
.env.*
!.env.example

# Ignore codebase markdown files
codebase_*.md

```

# .node-version

```
22.19.0

```

# .output/nitro.json

```json
{
  "date": "2026-07-22T18:05:04.702Z",
  "preset": "node-server",
  "framework": {
    "name": "nuxt",
    "version": "4.5.0"
  },
  "versions": {
    "nitro": "2.13.4"
  },
  "commands": {
    "preview": "node server/index.mjs"
  },
  "config": {}
}
```

# .output/public/_nuxt/B0M4vlZc.js

```js
import{F as e,M as t,c as n,d as r}from"./BWlekpQc.js";import{t as i}from"#entry";var a={},o={class:`min-h-screen bg-gray-950 text-gray-100 antialiased`},s={class:`border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm`},c={class:`mx-auto flex h-16 max-w-5xl items-center justify-between px-6`},l={class:`mx-auto max-w-5xl px-6 py-10`};function u(i,a){return t(),r(`div`,o,[n(`header`,s,[n(`div`,c,[a[0]||=n(`h1`,{class:`text-lg font-semibold tracking-tight text-white`},` StockPick `,-1),e(i.$slots,`header-actions`)])]),n(`main`,l,[e(i.$slots,`default`)])])}var d=i(a,[[`render`,u]]);export{d as default};
```

# .output/public/_nuxt/BEGRh-5H.js

```js
import{G as e,M as t,P as n,Q as r,R as i,V as a,_t as o,c as s,d as c,g as l,gt as u,h as d,j as f,l as p,m,mt as h,q as g,r as _,s as v,u as y,v as b}from"./BWlekpQc.js";import{f as x,p as S,s as C}from"#entry";var w=Object.assign(b({__name:`SmartValue`,props:{value:{},type:{default:`percent`},currency:{default:`USD`},colored:{type:Boolean,default:!0},invertColor:{type:Boolean,default:!1},digits:{default:1},prefix:{default:``},suffix:{default:``}},setup(e){let n=e,i=v(()=>{if(n.value===null||n.value===void 0||isNaN(n.value))return`N/A`;if(n.type===`percent`){let e=n.value*100,t=e>0?`+`:``;return`${n.prefix}${t}${e.toFixed(n.digits)}%${n.suffix}`}if(n.type===`mos`){let e=n.value>=0?`+`:``;return`${n.prefix}${e}${n.value.toFixed(n.digits)}%${n.suffix}`}if(n.type===`currency`)try{let e=n.currency.toUpperCase()===`GBP`||n.currency===`GBP`?`GBP`:n.currency.toUpperCase();return`${n.prefix}${new Intl.NumberFormat(`fr-FR`,{style:`currency`,currency:e,maximumFractionDigits:n.digits??2}).format(n.value)}${n.suffix}`}catch{return`${n.prefix}${n.value.toFixed(2)} ${n.currency}${n.suffix}`}return`${n.prefix}${n.value.toLocaleString(`fr-FR`,{maximumFractionDigits:n.digits})}${n.suffix}`}),a=v(()=>{if(!n.colored||n.value===null||n.value===void 0||isNaN(n.value))return`text-gray-200`;let e=n.value,t=e>0;return e===0?`text-gray-300`:n.invertColor?t?`text-rose-400`:`text-emerald-400`:t?`text-emerald-400`:`text-rose-400`});return(e,n)=>(t(),c(`span`,{class:h([`font-mono font-semibold`,r(a)])},o(r(i)),3))}}),{__name:`SmartValue`});function T(e){let{revenueTTM:t,sharesOutstanding:n,growthMode:r,growth:i,growthY1:a,growthY2:o,growthY3:s,growthY4:c,growthY5:l,margin:u,targetMultiple:d,discountRate:f,currentPrice:p}=e,m=0,h=0;r===`explicit`?(m=t*(1+a)*(1+o)*(1+s)*(1+c)*(1+l),h=t>0&&m>0?(m/t)**(1/5)-1:0):(m=t*(1+i)**5,h=i);let g=m*u,_=g*d,v=n>0?_/n:0,y=v/(1+f)**5,b=y===0?0:(y-p)/y*100;return{revenue5Y:m,equivalentCAGR:h,earnings5Y:g,eps5Y:n>0?g/n:0,targetPrice5Y:v,fairValue:y,marginOfSafety:b}}function E(e){let t=T(e),n=e.riskSpread,r,i;return e.growthMode===`explicit`?(r={...e,growthY1:e.growthY1*(1-n),growthY2:e.growthY2*(1-n),growthY3:e.growthY3*(1-n),growthY4:e.growthY4*(1-n),growthY5:e.growthY5*(1-n),targetMultiple:e.targetMultiple*(1-n)},i={...e,growthY1:e.growthY1*(1+n),growthY2:e.growthY2*(1+n),growthY3:e.growthY3*(1+n),growthY4:e.growthY4*(1+n),growthY5:e.growthY5*(1+n),targetMultiple:e.targetMultiple*(1+n)}):(r={...e,growth:e.growth*(1-n),targetMultiple:e.targetMultiple*(1-n)},i={...e,growth:e.growth*(1+n),targetMultiple:e.targetMultiple*(1+n)}),{bear:T(r),base:t,bull:T(i)}}function D(e){let{currentPrice:t,discountRate:n,sharesOutstanding:r,targetMultiple:i,margin:a,revenueTTM:o,growthMode:s,growthY1:c}=e,l=t*(1+n)**5,u=l*r,d=i>0?u/i:0,f=a===0?0:d/a;if(s===`explicit`){let e=o*(1+c),t=e>0&&f>0?(f/e)**(1/4)-1:0;return{targetPrice5YMarket:l,earnings5YMarket:d,revenue5YMarket:f,impliedGrowth:t,impliedGrowthY2Y5:t}}else return{targetPrice5YMarket:l,earnings5YMarket:d,revenue5YMarket:f,impliedGrowth:o>0&&f>0?(f/o)**(1/5)-1:0}}var O={class:`valuation-card group space-y-4`},k={class:`flex items-center justify-between border-b border-gray-800 pb-3`},ee={class:`flex items-center gap-1 rounded-lg bg-gray-950 p-1 border border-gray-800`},te={class:`flex flex-wrap items-center justify-between gap-2.5`},ne={class:`flex items-center gap-2.5`},re={class:`ticker-badge`},ie={class:`truncate text-base font-semibold text-white`},ae={class:`rounded bg-gray-800 px-2 py-0.5 font-mono text-[10px] text-gray-300 border border-gray-700`},oe={class:`rounded bg-indigo-500/10 px-2 py-0.5 font-mono text-[10px] text-indigo-400 border border-indigo-500/20`},se={key:0,class:`flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-950/40 px-3 py-2 text-xs font-medium text-amber-300 shadow-sm`},ce={key:1,class:`space-y-6`},le={class:`metrics-grid`},ue={class:`metric-cell`},de={class:`metric-value text-white`},fe={class:`metric-cell`},pe={class:`metric-value text-gray-200`},me={class:`metric-cell`},he={class:`metric-value text-gray-200`},ge={class:`fair-value-section space-y-4`},_e={class:`flex items-end justify-between gap-4`},ve={class:`mt-1 flex items-baseline gap-2`},ye={class:`text-3xl font-bold tracking-tight text-white`},be={class:`text-right`},xe={class:`mt-1 font-mono text-lg font-semibold text-gray-300`},Se={class:`space-y-1.5 pt-2`},Ce={class:`relative h-5 w-full overflow-hidden text-xs font-mono font-bold`},we=[`title`],Te=[`title`],Ee=[`title`],De=[`title`],Oe={class:`relative h-8 w-full rounded-xl border border-gray-800 bg-gray-950/90 overflow-hidden`},ke=[`title`],Ae=[`title`],je=[`title`],Me=[`title`],Ne=[`title`],Pe=[`title`],Fe=[`title`],Ie={class:`flex flex-wrap items-center justify-between text-[10px] text-gray-400 pt-0.5 font-medium`},Le={class:`flex items-center gap-1`},Re={class:`flex items-center gap-1 text-white font-semibold`},ze={class:`flex items-center gap-1`},Be={class:`grid grid-cols-3 gap-3`},Ve={class:`scenario-cell scenario-cell--bear`},He={class:`scenario-label text-red-400/70`},Ue={class:`scenario-value`},We={class:`scenario-cell scenario-cell--base`},Ge={class:`scenario-value text-white`},Ke={class:`scenario-cell scenario-cell--bull`},qe={class:`scenario-label text-emerald-400/70`},Je={class:`scenario-value`},Ye={class:`reverse-dcf-section`},Xe={key:0,class:`text-sm text-gray-300 leading-relaxed`},Ze={class:`font-semibold text-white`},Qe={key:1,class:`text-sm text-gray-300 leading-relaxed`},$e={class:`mt-3 grid grid-cols-3 gap-3 text-center`},et={class:`font-mono text-xs font-semibold text-gray-300 mt-0.5`},tt={class:`font-mono text-xs font-semibold text-gray-300 mt-0.5`},nt={class:`font-mono text-xs font-semibold text-gray-300 mt-0.5`},rt={class:`space-y-4 pt-1`},it={class:`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-800/80 pb-3`},at={class:`inline-flex rounded-lg bg-gray-950 p-1 border border-gray-800`},ot={class:`space-y-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4`},st={class:`flex items-center justify-between`},ct={class:`text-xs font-semibold text-emerald-400 uppercase tracking-wider`},lt={class:`flex items-center gap-2`},ut={key:0,class:`source-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/20`},dt={key:1,class:`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30`},ft={key:0,class:`slider-group`},pt={class:`slider-header`},mt={class:`grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1`},ht={class:`flex items-center justify-between`},gt={class:`text-xs font-semibold text-gray-300`},_t={class:`space-y-1`},vt={class:`relative flex items-center rounded-lg border border-gray-800 bg-gray-900 px-2.5 py-1.5 focus-within:border-emerald-500`},yt=[`value`,`onInput`],bt={class:`ml-1 select-none font-mono text-xs font-semibold text-gray-500 shrink-0`},xt={key:1,class:`pt-1 space-y-1`},St={class:`font-mono text-xs font-bold text-white`},Ct={class:`rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 shadow-md`},wt={class:`grid grid-cols-1 sm:grid-cols-2 gap-4 text-center`},Tt={class:`font-mono text-2xl font-extrabold text-white mt-1`},Et={class:`mt-1`},Dt={class:`slider-group`},Ot={class:`slider-header`},kt={class:`flex items-center gap-2 flex-wrap`},At={key:0,class:`source-pill bg-sky-500/10 text-sky-400 border-sky-500/20`},jt={key:1,class:`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30`},Mt={class:`slider-value text-sky-400`},Nt={class:`slider-group`},Pt={class:`slider-header`},Ft={class:`flex items-center gap-2 flex-wrap`},It={key:0,class:`source-pill bg-violet-500/10 text-violet-400 border-violet-500/20`},Lt={key:1,class:`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30`},Rt={class:`slider-value text-violet-400`},zt={class:`slider-group`},Bt={class:`slider-header`},Vt={class:`slider-group rounded-xl border border-indigo-500/20 bg-indigo-950/10 p-4 space-y-2`},Ht={class:`slider-header`},Ut={class:`flex items-center gap-2 flex-wrap`},Wt={class:`source-pill bg-indigo-500/10 text-indigo-400 border-indigo-500/20`},Gt={class:`slider-value text-indigo-400`},Kt={key:2,class:`space-y-6`},qt={class:`grid grid-cols-1 md:grid-cols-2 gap-4`},Jt={class:`rounded-xl border border-gray-800 bg-gray-950/60 p-4 space-y-3`},Yt={class:`space-y-2 text-xs`},Xt={class:`flex justify-between py-1 border-b border-gray-850`},Zt={class:`font-mono font-bold text-white`},Qt={class:`flex justify-between py-1 border-b border-gray-850`},$t={class:`font-mono font-semibold text-gray-200`},en={class:`flex justify-between py-1 border-b border-gray-850`},tn={class:`font-mono font-semibold text-gray-200`},nn={class:`flex justify-between py-1 border-b border-gray-850`},rn={class:`font-mono font-semibold text-gray-200`},an={class:`flex justify-between py-1`},on={class:`font-mono font-semibold text-indigo-400`},sn={class:`rounded-xl border border-gray-800 bg-gray-950/60 p-4 space-y-3`},cn={class:`space-y-2 text-xs`},ln={key:0,class:`flex justify-between py-1 border-b border-gray-850`},un={class:`font-mono font-bold text-purple-300`},dn={class:`flex justify-between py-1 border-b border-gray-850`},fn={class:`flex items-center gap-1.5 font-mono`},pn={class:`font-bold text-white`},mn={class:`flex justify-between py-1 border-b border-gray-850`},hn={class:`flex items-center gap-1.5 font-mono`},gn={class:`font-bold text-white`},_n={key:1,class:`flex justify-between py-1 border-b border-gray-850`},vn={class:`font-mono font-bold text-purple-300`},yn={class:`flex justify-between py-1 border-b border-gray-850`},bn={class:`flex justify-between py-1`},xn={class:`font-mono font-semibold text-gray-200`},Sn={class:`rounded-xl border border-gray-800 bg-gray-950/80 p-4 space-y-4`},Cn={key:0,class:`space-y-4`},wn={class:`space-y-2`},Tn={class:`flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider`},En={class:`font-mono text-white`},Dn={class:`w-full text-left text-xs text-gray-300 border border-gray-800 rounded-lg overflow-hidden`},On={class:`divide-y divide-gray-850`},kn={class:`px-3 py-2 font-mono`},An={class:`px-3 py-2`},jn={key:0,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30`},Mn={key:1,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30`},Nn={key:2,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-red-500/20 text-red-400`},Pn={key:3,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-gray-800 text-gray-500`},Fn={class:`px-3 py-2 text-gray-400`},In={class:`space-y-2`},Ln={class:`flex items-center justify-between text-xs font-bold text-sky-400 uppercase tracking-wider`},Rn={class:`font-mono text-white`},zn={class:`w-full text-left text-xs text-gray-300 border border-gray-800 rounded-lg overflow-hidden`},Bn={class:`divide-y divide-gray-850`},Vn={class:`px-3 py-2 font-mono`},Hn={class:`px-3 py-2`},Un={key:0,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30`},Wn={key:1,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-sky-500/20 text-sky-400 border border-sky-500/30`},Gn={key:2,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-red-500/20 text-red-400`},Kn={key:3,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-gray-800 text-gray-500`},qn={class:`px-3 py-2 text-gray-400`},Jn={class:`space-y-2`},Yn={class:`flex items-center justify-between text-xs font-bold text-violet-400 uppercase tracking-wider`},Xn={class:`font-mono text-white`},Zn={class:`w-full text-left text-xs text-gray-300 border border-gray-800 rounded-lg overflow-hidden`},Qn={class:`divide-y divide-gray-850`},$n={class:`px-3 py-2 font-mono`},er={class:`px-3 py-2`},tr={key:0,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30`},nr={key:1,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-violet-500/20 text-violet-400 border border-violet-500/30`},rr={key:2,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-red-500/20 text-red-400`},ir={key:3,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-gray-800 text-gray-500`},ar={class:`px-3 py-2 text-gray-400`},or={key:0,class:`space-y-2`},sr={class:`flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider`},cr={class:`font-mono text-white`},lr={class:`w-full text-left text-xs text-gray-300 border border-gray-800 rounded-lg overflow-hidden`},ur={class:`divide-y divide-gray-850`},dr={class:`px-3 py-2 font-mono`},fr={class:`px-3 py-2`},pr={key:0,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30`},mr={key:1,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30`},hr={key:2,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-red-500/20 text-red-400`},gr={key:3,class:`rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-gray-800 text-gray-500`},_r={class:`px-3 py-2 text-gray-400`},vr={key:1,class:`text-xs text-gray-500 py-4 text-center`},A=Object.assign(b({__name:`ValuationCard`,props:{stock:{}},emits:[`update`,`delete`],setup(f,{emit:b}){let S=f,C=b,T=g(`valuation`),A=g(S.stock.growth_mode||`cagr`),j=g(S.stock.projected_growth??.1),M=g(S.stock.growth_y1??.1),N=g(S.stock.growth_y2??.1),P=g(S.stock.growth_y3??.1),F=g(S.stock.growth_y4??.1),I=g(S.stock.growth_y5??.1),L=g(S.stock.projected_margin??.2),R=g(S.stock.target_multiple??20),z=g(S.stock.discount_rate??.1),B=g(S.stock.risk_spread??.2);i(()=>S.stock,e=>{A.value=e.growth_mode||`cagr`,j.value=e.projected_growth??.1,M.value=e.growth_y1??.1,N.value=e.growth_y2??.1,P.value=e.growth_y3??.1,F.value=e.growth_y4??.1,I.value=e.growth_y5??.1,L.value=e.projected_margin??.2,R.value=e.target_multiple??20,z.value=e.discount_rate??.1,B.value=e.risk_spread??.2});let V=v(()=>{if(!S.stock.audit_data)return null;if(typeof S.stock.audit_data==`string`)try{return JSON.parse(S.stock.audit_data)}catch{return null}return S.stock.audit_data}),H=v(()=>V.value?[V.value.growth,V.value.margin,V.value.pe,V.value.discount_rate].some(e=>e?.candidates?.some(e=>e.status===`fallback`)):!1),yr=v(()=>V.value?.growth?.candidates?.some(e=>e.status===`fallback`)??!1),br=v(()=>V.value?.margin?.candidates?.some(e=>e.status===`fallback`)??!1),xr=v(()=>V.value?.pe?.candidates?.some(e=>e.status===`fallback`)??!1),Sr=v(()=>!S.stock.analyst_target_price||!S.stock.current_price?null:S.stock.analyst_target_price/S.stock.current_price-1),Cr=v(()=>!S.stock.analyst_target_median||!S.stock.current_price?null:S.stock.analyst_target_median/S.stock.current_price-1),wr=v(()=>({currentPrice:S.stock.current_price??0,revenueTTM:S.stock.revenue_ttm??0,sharesOutstanding:S.stock.shares_outstanding??0,growthMode:A.value,growth:j.value,growthY1:M.value,growthY2:N.value,growthY3:P.value,growthY4:F.value,growthY5:I.value,marginType:`net_income`,margin:L.value,targetMultiple:R.value,discountRate:z.value,riskSpread:B.value})),U=v(()=>E(wr.value)),W=v(()=>D(wr.value)),G=v(()=>U.value.base.marginOfSafety),Tr=v(()=>U.value.base.fairValue),Er=v(()=>{let e=G.value;return e>15?{label:`Sous-évaluée`,class:`bg-emerald-500/15 text-emerald-400 border-emerald-500/30`}:e>=0?{label:`Fair Value`,class:`bg-amber-500/15 text-amber-400 border-amber-500/30`}:{label:`Surévaluée`,class:`bg-red-500/15 text-red-400 border-red-500/30`}}),K=v(()=>{let e=U.value.bear.fairValue,t=U.value.base.fairValue,n=U.value.bull.fairValue,r=S.stock.current_price??0,i=S.stock.analyst_target_low,a=S.stock.analyst_target_price,o=S.stock.analyst_target_high,s=[e,t,n,r,i,a,o].filter(e=>e!==null&&!isNaN(e)&&e>0);if(s.length===0)return{bearPos:0,basePos:50,bullPos:100,pricePos:50,lowPos:null,meanPos:null,highPos:null,bearVal:0,baseVal:0,bullVal:0,priceVal:0,lowVal:null,meanVal:null,highVal:null};let c=Math.min(...s)*.9,l=Math.max(...s)*1.1-c;if(l<=0)return{bearPos:0,basePos:50,bullPos:100,pricePos:50,lowPos:null,meanPos:null,highPos:null,bearVal:e,baseVal:t,bullVal:n,priceVal:r,lowVal:i,meanVal:a,highVal:o};let u=e=>e!==null&&e>0?Math.max(0,Math.min(100,(e-c)/l*100)):null;return{bearPos:u(e),basePos:u(t),bullPos:u(n),pricePos:u(r),lowPos:u(i),meanPos:u(a),highPos:u(o),bearVal:e,baseVal:t,bullVal:n,priceVal:r,lowVal:i,meanVal:a,highVal:o}}),q=v(()=>{let e=S.stock.revenue_ttm??0;return e>=1e9?{label:`B`,divisor:1e9}:e>=1e6?{label:`M`,divisor:1e6}:{label:`K`,divisor:1e3}}),Dr=v(()=>{let e=(S.stock.currency||`USD`).toUpperCase();return e===`EUR`?`€`:e===`USD`?`$`:e===`GBP`||e===`GBP`?`£`:e}),J=v(()=>{let e=S.stock.revenue_ttm??0;if(A.value===`cagr`){let t=j.value,n=e*(1+t),r=n*(1+t),i=r*(1+t),a=i*(1+t);return[n,r,i,a,a*(1+t)]}else{let t=e*(1+M.value),n=t*(1+N.value),r=n*(1+P.value),i=r*(1+F.value);return[t,n,r,i,i*(1+I.value)]}});function Or(e){return A.value===`cagr`?j.value:e===1?M.value:e===2?N.value:e===3?P.value:e===4?F.value:I.value}function kr(e){let t=J.value[e-1]??0;return Number((t/q.value.divisor).toFixed(2))}function Y(e){return!e||isNaN(e)?`N/A`:`${(e/q.value.divisor).toFixed(2)} ${q.value.label} ${Dr.value}`}function Ar(e,t){if(A.value===`cagr`)return;let n=parseFloat(t);if(isNaN(n)||n<=0)return;let r=n*q.value.divisor,i=S.stock.revenue_ttm??0,a=i;if(a=e===1?i:J.value[e-2],a>0){let t=r/a-1;e===1?M.value=t:e===2?N.value=t:e===3?P.value=t:e===4?F.value=t:e===5&&(I.value=t)}}let X=null;function jr(){X&&clearTimeout(X),X=setTimeout(()=>{let e={...S.stock,growth_mode:A.value,projected_growth:j.value,growth_y1:M.value,growth_y2:N.value,growth_y3:P.value,growth_y4:F.value,growth_y5:I.value,revenue_y1:J.value[0],revenue_y2:J.value[1],revenue_y3:J.value[2],revenue_y4:J.value[3],revenue_y5:J.value[4],margin_type:`net_income`,projected_margin:L.value,target_multiple:R.value,discount_rate:z.value,risk_spread:B.value};C(`update`,e)},800)}i([A,j,M,N,P,F,I,L,R,z,B],()=>{jr()});function Z(e){if(e==null)return`N/A`;let t=S.stock.currency||`USD`;try{let n=t.toUpperCase()===`GBP`||t===`GBP`?`GBP`:t.toUpperCase();return new Intl.NumberFormat(`fr-FR`,{style:`currency`,currency:n,maximumFractionDigits:2}).format(e)}catch{return`${e.toFixed(2)} ${t}`}}function Q(e){return e==null?`N/A`:e>=0xe8d4a51000?`${(e/0xe8d4a51000).toFixed(2)} T`:e>=1e9?`${(e/1e9).toFixed(2)} B`:e>=1e6?`${(e/1e6).toFixed(2)} M`:e.toLocaleString(`fr-FR`)}function $(e){return e==null?`N/A`:`${(e*100).toFixed(1)}%`}return(i,g)=>{let v=w;return t(),c(`div`,O,[s(`div`,k,[s(`div`,ee,[s(`button`,{type:`button`,class:h([`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition`,r(T)===`valuation`?`bg-emerald-600 text-white shadow`:`text-gray-400 hover:text-white`]),onClick:g[0]||=e=>T.value=`valuation`},[...g[15]||=[s(`svg`,{class:`h-3.5 w-3.5`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`2`},[s(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z`})],-1),d(` Valorisation & Simulation `,-1)]],2),s(`button`,{type:`button`,class:h([`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition`,r(T)===`sourcing`?`bg-indigo-600 text-white shadow`:`text-gray-400 hover:text-white`]),onClick:g[1]||=e=>T.value=`sourcing`},[...g[16]||=[s(`svg`,{class:`h-3.5 w-3.5`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`2`},[s(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10`})],-1),d(` Sourcing & Cascade d'Audit `,-1)]],2)]),s(`button`,{type:`button`,class:`shrink-0 rounded-lg p-2 text-gray-600 transition hover:bg-red-950/50 hover:text-red-400`,title:`Supprimer l'action`,onClick:g[2]||=e=>C(`delete`,f.stock.id,f.stock.ticker)},[...g[17]||=[s(`svg`,{class:`h-4.5 w-4.5`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`1.5`},[s(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16`})],-1)]])]),s(`div`,te,[s(`div`,ne,[s(`span`,re,o(f.stock.ticker),1),s(`h3`,ie,o(f.stock.name||f.stock.ticker),1),s(`span`,ae,o(f.stock.currency||`USD`),1),s(`span`,oe,` Bêta: `+o(f.stock.beta??1),1)]),s(`span`,{class:h([`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold`,r(Er).class])},o(r(Er).label),3)]),r(H)?(t(),c(`div`,se,[...g[18]||=[s(`svg`,{class:`h-4 w-4 shrink-0 text-amber-400`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`2`},[s(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z`})],-1),s(`span`,null,`⚠️ Certaines données de marché sont absentes chez Yahoo. Des valeurs par défaut ont été appliquées.`,-1)]])):y(``,!0),r(T)===`valuation`?(t(),c(`div`,ce,[s(`div`,le,[s(`div`,ue,[g[19]||=s(`span`,{class:`metric-label`},`Prix Actuel`,-1),s(`span`,de,o(Z(f.stock.current_price??0)),1)]),s(`div`,fe,[g[20]||=s(`span`,{class:`metric-label`},`CA TTM`,-1),s(`span`,pe,o(Q(f.stock.revenue_ttm)),1)]),s(`div`,me,[g[21]||=s(`span`,{class:`metric-label`},`Shares`,-1),s(`span`,he,o(Q(f.stock.shares_outstanding)),1)])]),s(`div`,ge,[s(`div`,_e,[s(`div`,null,[g[22]||=s(`span`,{class:`text-xs font-medium uppercase tracking-wider text-gray-500`},`Fair Value (Base Case)`,-1),s(`div`,ve,[s(`span`,ye,o(Z(r(Tr))),1),l(v,{value:r(G),type:`mos`,class:`text-sm font-bold`,suffix:` MoS`},null,8,[`value`])])]),s(`div`,be,[g[23]||=s(`span`,{class:`text-xs font-medium uppercase tracking-wider text-gray-500`},`Prix Cible 5Y`,-1),s(`p`,xe,o(Z(r(U).base.targetPrice5Y)),1)])]),s(`div`,Se,[s(`div`,Ce,[r(K).lowPos===null?y(``,!0):(t(),c(`span`,{key:0,class:`absolute -translate-x-1/2 z-10 rounded px-1 py-0.2 text-[9px] bg-purple-900 text-purple-200 border border-purple-500/50 shadow-sm`,style:u({left:`${r(K).lowPos}%`}),title:`Wall St Low: ${Z(r(K).lowVal)}`},` L `,12,we)),r(K).meanPos===null?y(``,!0):(t(),c(`span`,{key:1,class:`absolute -translate-x-1/2 z-10 rounded px-1 py-0.2 text-[9px] bg-sky-900 text-sky-200 border border-sky-500/50 shadow-sm`,style:u({left:`${r(K).meanPos}%`}),title:`Wall St Moyen: ${Z(r(K).meanVal)}`},` Moy `,12,Te)),r(K).highPos===null?y(``,!0):(t(),c(`span`,{key:2,class:`absolute -translate-x-1/2 z-10 rounded px-1 py-0.2 text-[9px] bg-purple-900 text-purple-200 border border-purple-500/50 shadow-sm`,style:u({left:`${r(K).highPos}%`}),title:`Wall St High: ${Z(r(K).highVal)}`},` H `,12,Ee)),s(`span`,{class:`absolute -translate-x-1/2 z-30 rounded px-1 py-0.2 text-[9px] bg-white text-gray-950 font-black shadow-md border border-white`,style:u({left:`${r(K).pricePos}%`}),title:`Prix Actuel P: ${Z(r(K).priceVal)}`},` P `,12,De)]),s(`div`,Oe,[s(`div`,{class:`absolute top-0 bottom-0 bg-gradient-to-r from-red-500/15 via-amber-500/15 to-emerald-500/15`,style:u({left:`${r(K).bearPos}%`,width:`${r(K).bullPos-r(K).bearPos}%`})},null,4),r(K).lowPos===null?y(``,!0):(t(),c(`div`,{key:0,class:`absolute top-0 bottom-0 w-0.5 bg-purple-400/80 z-10`,style:u({left:`${r(K).lowPos}%`}),title:`Wall St Low: ${Z(r(K).lowVal)}`},null,12,ke)),r(K).meanPos===null?y(``,!0):(t(),c(`div`,{key:1,class:`absolute top-0 bottom-0 w-0.5 bg-sky-400 z-10`,style:u({left:`${r(K).meanPos}%`}),title:`Wall St Moyen: ${Z(r(K).meanVal)}`},null,12,Ae)),r(K).highPos===null?y(``,!0):(t(),c(`div`,{key:2,class:`absolute top-0 bottom-0 w-0.5 bg-purple-400/80 z-10`,style:u({left:`${r(K).highPos}%`}),title:`Wall St High: ${Z(r(K).highVal)}`},null,12,je)),s(`div`,{class:`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-red-400 border border-gray-950 z-20`,style:u({left:`${r(K).bearPos}%`}),title:`Bear Case: ${Z(r(K).bearVal)}`},null,12,Me),s(`div`,{class:`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-amber-400 border-2 border-gray-950 z-20 shadow-md`,style:u({left:`${r(K).basePos}%`}),title:`Fair Value (Base Case): ${Z(r(K).baseVal)}`},null,12,Ne),s(`div`,{class:`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-gray-950 z-20`,style:u({left:`${r(K).bullPos}%`}),title:`Bull Case: ${Z(r(K).bullVal)}`},null,12,Pe),s(`div`,{class:`absolute top-0 bottom-0 w-1 bg-white z-30 shadow-md -translate-x-1/2`,style:u({left:`${r(K).pricePos}%`}),title:`Prix Actuel P: ${Z(r(K).priceVal)}`},null,12,Fe)]),s(`div`,Ie,[s(`span`,Le,[g[24]||=s(`span`,{class:`h-2 w-2 rounded-full bg-red-400`},null,-1),d(` Bear: `+o(Z(r(K).bearVal)),1)]),s(`span`,Re,[g[25]||=s(`span`,{class:`h-2.5 w-2.5 rounded-full bg-amber-400`},null,-1),d(` Fair Value: `+o(Z(r(K).baseVal)),1)]),s(`span`,ze,[g[26]||=s(`span`,{class:`h-2 w-2 rounded-full bg-emerald-400`},null,-1),d(` Bull: `+o(Z(r(K).bullVal)),1)])])])]),s(`div`,Be,[s(`div`,Ve,[s(`span`,He,`Bear Case (-`+o($(r(B)))+`)`,1),s(`span`,Ue,o(Z(r(U).bear.fairValue)),1),l(v,{value:r(U).bear.marginOfSafety,type:`mos`,class:`text-xs`},null,8,[`value`])]),s(`div`,We,[g[27]||=s(`span`,{class:`scenario-label text-amber-400/70`},`Base Case`,-1),s(`span`,Ge,o(Z(r(U).base.fairValue)),1),l(v,{value:r(U).base.marginOfSafety,type:`mos`,class:`text-xs`},null,8,[`value`])]),s(`div`,Ke,[s(`span`,qe,`Bull Case (+`+o($(r(B)))+`)`,1),s(`span`,Je,o(Z(r(U).bull.fairValue)),1),l(v,{value:r(U).bull.marginOfSafety,type:`mos`,class:`text-xs`},null,8,[`value`])])]),s(`div`,Ye,[g[37]||=m(`<div class="flex items-center gap-2 mb-2"><div class="h-5 w-5 rounded-md bg-indigo-500/15 flex items-center justify-center"><svg class="h-3 w-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg></div><span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Reverse DCF</span></div>`,1),r(A)===`cagr`?(t(),c(`p`,Xe,[g[28]||=d(` Le marché anticipe une croissance du CA de `,-1),l(v,{value:r(W).impliedGrowth,type:`percent`,suffix:`/an`},null,8,[`value`]),g[29]||=d(` sur 5 ans pour justifier le cours actuel de `,-1),s(`span`,Ze,o(Z(f.stock.current_price??0)),1),g[30]||=d(`. `,-1)])):(t(),c(`p`,Qe,[g[31]||=d(` En conservant g₁ à `,-1),l(v,{value:r(M),type:`percent`},null,8,[`value`]),g[32]||=d(`, le marché exige une croissance moyenne de `,-1),l(v,{value:r(W).impliedGrowthY2Y5??0,type:`percent`,suffix:`/an`},null,8,[`value`]),g[33]||=d(` sur les années 2 à 5 pour justifier le cours actuel. `,-1)])),s(`div`,$e,[s(`div`,null,[g[34]||=s(`span`,{class:`text-[10px] text-gray-500 uppercase`},`CA Requis 5Y`,-1),s(`p`,et,o(Q(r(W).revenue5YMarket)),1)]),s(`div`,null,[g[35]||=s(`span`,{class:`text-[10px] text-gray-500 uppercase`},`Earnings Requis`,-1),s(`p`,tt,o(Q(r(W).earnings5YMarket)),1)]),s(`div`,null,[g[36]||=s(`span`,{class:`text-[10px] text-gray-500 uppercase`},`Prix Cible 5Y`,-1),s(`p`,nt,o(Z(r(W).targetPrice5YMarket)),1)])])]),s(`div`,rt,[s(`div`,it,[g[38]||=s(`h4`,{class:`text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-2`},[s(`svg`,{class:`h-3.5 w-3.5 text-gray-500`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`2`},[s(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4`})]),d(` Hypothèses de Valorisation `)],-1),s(`div`,at,[s(`button`,{type:`button`,class:h([`px-3 py-1 text-xs font-medium rounded-md transition`,r(A)===`cagr`?`bg-gray-800 text-white shadow-sm font-semibold`:`text-gray-400 hover:text-white`]),onClick:g[3]||=e=>A.value=`cagr`},` Mode Lissé (CAGR) `,2),s(`button`,{type:`button`,class:h([`px-3 py-1 text-xs font-medium rounded-md transition`,r(A)===`explicit`?`bg-emerald-600 text-white shadow-sm font-semibold`:`text-gray-400 hover:text-white`]),onClick:g[4]||=e=>A.value=`explicit`},` Mode Sur-Mesure (5 Ans) `,2)])]),s(`div`,ot,[s(`div`,st,[s(`span`,ct,o(r(A)===`cagr`?`Trajectory & Projection CA (Mode Lissé)`:`Trajectoire Sur-Mesure sur 5 Ans`),1),s(`div`,lt,[f.stock.growth_source?(t(),c(`span`,ut,o(f.stock.growth_source),1)):y(``,!0),r(yr)?(t(),c(`span`,dt,` [⚠️ DEFAULT] `)):y(``,!0)])]),r(A)===`cagr`?(t(),c(`div`,ft,[s(`div`,pt,[g[39]||=s(`label`,{class:`slider-label`},`Croissance CA / an (CAGR 5Y)`,-1),l(v,{value:r(j),type:`percent`},null,8,[`value`])]),a(s(`input`,{"onUpdate:modelValue":g[5]||=t=>e(j)?j.value=t:null,type:`range`,min:`-0.3`,max:`1.0`,step:`0.005`,class:`slider slider--emerald`},null,512),[[x,r(j),void 0,{number:!0}]]),g[40]||=s(`div`,{class:`slider-bounds`},[s(`span`,null,`-30%`),s(`span`,null,`100%`)],-1)])):y(``,!0),s(`div`,mt,[(t(),c(_,null,n(5,n=>s(`div`,{key:n,class:`rounded-xl border border-gray-800 bg-gray-950/80 p-3 space-y-2`},[s(`div`,ht,[s(`span`,gt,`An `+o(n)+` `+o(n===1?`(NTM)`:``),1),l(v,{value:Or(n),type:`percent`,class:`text-xs`},null,8,[`value`])]),r(A)===`explicit`?(t(),c(_,{key:0},[n===1?a((t(),c(`input`,{key:0,"onUpdate:modelValue":g[6]||=t=>e(M)?M.value=t:null,type:`range`,min:`-0.3`,max:`3.0`,step:`0.005`,class:`slider slider--emerald my-1`},null,512)),[[x,r(M),void 0,{number:!0}]]):n===2?a((t(),c(`input`,{key:1,"onUpdate:modelValue":g[7]||=t=>e(N)?N.value=t:null,type:`range`,min:`-0.3`,max:`1.5`,step:`0.005`,class:`slider slider--emerald my-1`},null,512)),[[x,r(N),void 0,{number:!0}]]):n===3?a((t(),c(`input`,{key:2,"onUpdate:modelValue":g[8]||=t=>e(P)?P.value=t:null,type:`range`,min:`-0.3`,max:`1.0`,step:`0.005`,class:`slider slider--emerald my-1`},null,512)),[[x,r(P),void 0,{number:!0}]]):n===4?a((t(),c(`input`,{key:3,"onUpdate:modelValue":g[9]||=t=>e(F)?F.value=t:null,type:`range`,min:`-0.3`,max:`0.8`,step:`0.005`,class:`slider slider--emerald my-1`},null,512)),[[x,r(F),void 0,{number:!0}]]):a((t(),c(`input`,{key:4,"onUpdate:modelValue":g[10]||=t=>e(I)?I.value=t:null,type:`range`,min:`-0.3`,max:`0.6`,step:`0.005`,class:`slider slider--emerald my-1`},null,512)),[[x,r(I),void 0,{number:!0}]]),s(`div`,_t,[g[41]||=s(`label`,{class:`text-[10px] font-medium uppercase tracking-wider text-gray-500`},` CA Projeté `,-1),s(`div`,vt,[s(`input`,{value:kr(n),type:`number`,step:`0.1`,class:`w-full bg-transparent font-mono text-xs font-bold text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`,onInput:e=>Ar(n,e.target.value)},null,40,yt),s(`span`,bt,o(r(q).label)+` `+o(r(Dr)),1)])])],64)):(t(),c(`div`,xt,[g[42]||=s(`span`,{class:`text-[10px] font-medium uppercase tracking-wider text-gray-500`},` CA Projeté `,-1),s(`div`,St,o(Y(r(J)[n-1])),1)]))])),64))]),s(`div`,Ct,[s(`div`,wt,[s(`div`,null,[g[43]||=s(`span`,{class:`text-xs font-semibold uppercase tracking-wider text-emerald-400`},` 🎯 Chiffre d'Affaires Final Cible (An 5) `,-1),s(`p`,Tt,o(Y(r(J)[4])),1)]),s(`div`,null,[g[44]||=s(`span`,{class:`text-xs font-semibold uppercase tracking-wider text-emerald-400`},` 📈 CAGR Équivalent Lissé `,-1),s(`p`,Et,[l(v,{value:r(U).base.equivalentCAGR,type:`percent`,class:`text-2xl font-extrabold`,suffix:`/an`},null,8,[`value`])])])])])]),s(`div`,Dt,[s(`div`,Ot,[s(`div`,kt,[g[45]||=s(`label`,{class:`slider-label`},`Marge Nette Cible (%)`,-1),f.stock.margin_source?(t(),c(`span`,At,o(f.stock.margin_source),1)):y(``,!0),r(br)?(t(),c(`span`,jt,` [⚠️ DEFAULT] `)):y(``,!0)]),s(`span`,Mt,o($(r(L))),1)]),a(s(`input`,{"onUpdate:modelValue":g[11]||=t=>e(L)?L.value=t:null,type:`range`,min:`0`,max:`0.8`,step:`0.005`,class:`slider slider--sky`},null,512),[[x,r(L),void 0,{number:!0}]]),g[46]||=s(`div`,{class:`slider-bounds`},[s(`span`,null,`0%`),s(`span`,null,`80%`)],-1)]),s(`div`,Nt,[s(`div`,Pt,[s(`div`,Ft,[g[47]||=s(`label`,{class:`slider-label`},`Multiple de Sortie (P/E)`,-1),f.stock.pe_source?(t(),c(`span`,It,o(f.stock.pe_source),1)):y(``,!0),r(xr)?(t(),c(`span`,Lt,` [⚠️ DEFAULT] `)):y(``,!0)]),s(`span`,Rt,o(r(R).toFixed(1))+`x`,1)]),a(s(`input`,{"onUpdate:modelValue":g[12]||=t=>e(R)?R.value=t:null,type:`range`,min:`5`,max:`120`,step:`0.5`,class:`slider slider--violet`},null,512),[[x,r(R),void 0,{number:!0}]]),g[48]||=s(`div`,{class:`slider-bounds`},[s(`span`,null,`5x`),s(`span`,null,`120x`)],-1)]),s(`div`,zt,[s(`div`,Bt,[g[49]||=s(`label`,{class:`slider-label`},`Taux d'Actualisation`,-1),l(v,{value:r(z),type:`percent`,class:`text-amber-400`,colored:!1},null,8,[`value`])]),a(s(`input`,{"onUpdate:modelValue":g[13]||=t=>e(z)?z.value=t:null,type:`range`,min:`0.05`,max:`0.15`,step:`0.005`,class:`slider slider--amber`},null,512),[[x,r(z),void 0,{number:!0}]]),g[50]||=s(`div`,{class:`slider-bounds`},[s(`span`,null,`5.0%`),s(`span`,null,`15.0%`)],-1)]),s(`div`,Vt,[s(`div`,Ht,[s(`div`,Ut,[g[51]||=s(`label`,{class:`slider-label text-indigo-300 font-semibold`},`Incertitude & Risque Bear / Bull (±%)`,-1),s(`span`,Wt,` Basé sur Bêta (`+o(f.stock.beta??1)+`) `,1)]),s(`span`,Gt,`±`+o($(r(B))),1)]),a(s(`input`,{"onUpdate:modelValue":g[14]||=t=>e(B)?B.value=t:null,type:`range`,min:`0.10`,max:`0.25`,step:`0.01`,class:`slider slider--violet`},null,512),[[x,r(B),void 0,{number:!0}]]),g[52]||=s(`div`,{class:`slider-bounds`},[s(`span`,null,`±10% (Stable)`),s(`span`,null,`±25% (Amorti Bêta)`)],-1)])])])):(t(),c(`div`,Kt,[s(`div`,qt,[s(`div`,Jt,[g[58]||=s(`h4`,{class:`text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-2`},` 📊 Données de Marché (Yahoo Finance) `,-1),s(`div`,Yt,[s(`div`,Xt,[g[53]||=s(`span`,{class:`text-gray-400`},`Market Cap :`,-1),s(`span`,Zt,o(Q(f.stock.market_cap)),1)]),s(`div`,Qt,[g[54]||=s(`span`,{class:`text-gray-400`},`P/E Trailing TTM :`,-1),s(`span`,$t,o(f.stock.pe_trailing_raw?`${f.stock.pe_trailing_raw.toFixed(1)}x`:`N/A`),1)]),s(`div`,en,[g[55]||=s(`span`,{class:`text-gray-400`},`P/E Forward Consensus :`,-1),s(`span`,tn,o(f.stock.pe_forward_raw?`${f.stock.pe_forward_raw.toFixed(1)}x`:`N/A`),1)]),s(`div`,nn,[g[56]||=s(`span`,{class:`text-gray-400`},`Marge Nette TTM :`,-1),s(`span`,rn,o($(f.stock.margin_net_raw)),1)]),s(`div`,an,[g[57]||=s(`span`,{class:`text-gray-400`},`Bêta Yahoo (Spread Volatilité) :`,-1),s(`span`,on,o(f.stock.beta??1)+` (±`+o($(f.stock.risk_spread))+`)`,1)])])]),s(`div`,sn,[g[65]||=s(`h4`,{class:`text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2`},` 🎯 Consensus Wall Street (Analystes) `,-1),s(`div`,cn,[f.stock.analyst_target_low?(t(),c(`div`,ln,[g[59]||=s(`span`,{class:`text-gray-400`},`Prix Cible Min (Low) :`,-1),s(`span`,un,o(Z(f.stock.analyst_target_low)),1)])):y(``,!0),s(`div`,dn,[g[60]||=s(`span`,{class:`text-gray-400`},`Prix Cible Moyen (Mean 12M) :`,-1),s(`div`,fn,[s(`span`,pn,o(Z(f.stock.analyst_target_price)),1),r(Sr)===null?y(``,!0):(t(),p(v,{key:0,value:r(Sr),type:`percent`,prefix:`(`,suffix:`)`},null,8,[`value`]))])]),s(`div`,mn,[g[61]||=s(`span`,{class:`text-gray-400`},`Prix Cible Médian (12M) :`,-1),s(`div`,hn,[s(`span`,gn,o(Z(f.stock.analyst_target_median)),1),r(Cr)===null?y(``,!0):(t(),p(v,{key:0,value:r(Cr),type:`percent`,prefix:`(`,suffix:`)`},null,8,[`value`]))])]),f.stock.analyst_target_high?(t(),c(`div`,_n,[g[62]||=s(`span`,{class:`text-gray-400`},`Prix Cible Max (High) :`,-1),s(`span`,vn,o(Z(f.stock.analyst_target_high)),1)])):y(``,!0),s(`div`,yn,[g[63]||=s(`span`,{class:`text-gray-400`},`Consensus Croissance CA NTM :`,-1),l(v,{value:f.stock.analyst_growth_estimate,type:`percent`},null,8,[`value`])]),s(`div`,bn,[g[64]||=s(`span`,{class:`text-gray-400`},`Nombre d'Analystes :`,-1),s(`span`,xn,o(f.stock.analyst_count??`N/A`),1)])])])]),s(`div`,Sn,[g[74]||=s(`h4`,{class:`text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-2`},` 🔍 Cascade d'Audit (Transparence des Fallbacks & Guardrails) `,-1),r(V)?(t(),c(`div`,Cn,[s(`div`,wn,[s(`div`,Tn,[g[66]||=s(`span`,null,`1. Cascade Croissance (g)`,-1),s(`span`,En,`Retenu : `+o($(r(V).growth.selected)),1)]),s(`table`,Dn,[g[67]||=s(`thead`,{class:`bg-gray-900 text-[10px] text-gray-500 uppercase`},[s(`tr`,null,[s(`th`,{class:`px-3 py-1.5`},`Candidat`),s(`th`,{class:`px-3 py-1.5`},`Valeur Brut`),s(`th`,{class:`px-3 py-1.5`},`Statut`),s(`th`,{class:`px-3 py-1.5`},`Explication`)])],-1),s(`tbody`,On,[(t(!0),c(_,null,n(r(V).growth.candidates,e=>(t(),c(`tr`,{key:e.name,class:h(e.status===`selected`?`bg-emerald-950/20`:e.status===`fallback`?`bg-amber-950/20`:``)},[s(`td`,{class:h([`px-3 py-2 font-medium`,e.status===`selected`?`text-white`:e.status===`fallback`?`text-amber-300 font-bold`:`text-gray-500 line-through`])},o(e.name),3),s(`td`,kn,o(e.value===null?`N/A`:$(e.value)),1),s(`td`,An,[e.status===`fallback`?(t(),c(`span`,jn,` [⚠️ DEFAULT] `)):e.status===`selected`?(t(),c(`span`,Mn,` [✓] Selected `)):e.status===`rejected`?(t(),c(`span`,Nn,` [✗] Rejected `)):(t(),c(`span`,Pn,` [x] Ignored `))]),s(`td`,Fn,o(e.note),1)],2))),128))])])]),s(`div`,In,[s(`div`,Ln,[g[68]||=s(`span`,null,`2. Cascade Marge Nette (m)`,-1),s(`span`,Rn,`Retenu : `+o($(r(V).margin.selected)),1)]),s(`table`,zn,[g[69]||=s(`thead`,{class:`bg-gray-900 text-[10px] text-gray-500 uppercase`},[s(`tr`,null,[s(`th`,{class:`px-3 py-1.5`},`Candidat`),s(`th`,{class:`px-3 py-1.5`},`Valeur Brut`),s(`th`,{class:`px-3 py-1.5`},`Statut`),s(`th`,{class:`px-3 py-1.5`},`Explication`)])],-1),s(`tbody`,Bn,[(t(!0),c(_,null,n(r(V).margin.candidates,e=>(t(),c(`tr`,{key:e.name,class:h(e.status===`selected`?`bg-sky-950/20`:e.status===`fallback`?`bg-amber-950/20`:``)},[s(`td`,{class:h([`px-3 py-2 font-medium`,e.status===`selected`?`text-white`:e.status===`fallback`?`text-amber-300 font-bold`:`text-gray-500 line-through`])},o(e.name),3),s(`td`,Vn,o(e.value===null?`N/A`:$(e.value)),1),s(`td`,Hn,[e.status===`fallback`?(t(),c(`span`,Un,` [⚠️ DEFAULT] `)):e.status===`selected`?(t(),c(`span`,Wn,` [✓] Selected `)):e.status===`rejected`?(t(),c(`span`,Gn,` [✗] Rejected `)):(t(),c(`span`,Kn,` [x] Ignored `))]),s(`td`,qn,o(e.note),1)],2))),128))])])]),s(`div`,Jn,[s(`div`,Yn,[g[70]||=s(`span`,null,`3. Cascade Multiple Exit (P/E)`,-1),s(`span`,Xn,`Retenu : `+o(r(V).pe.selected.toFixed(1))+`x`,1)]),s(`table`,Zn,[g[71]||=s(`thead`,{class:`bg-gray-900 text-[10px] text-gray-500 uppercase`},[s(`tr`,null,[s(`th`,{class:`px-3 py-1.5`},`Candidat`),s(`th`,{class:`px-3 py-1.5`},`Valeur Brut`),s(`th`,{class:`px-3 py-1.5`},`Statut`),s(`th`,{class:`px-3 py-1.5`},`Explication`)])],-1),s(`tbody`,Qn,[(t(!0),c(_,null,n(r(V).pe.candidates,e=>(t(),c(`tr`,{key:e.name,class:h(e.status===`selected`?`bg-violet-950/20`:e.status===`fallback`?`bg-amber-950/20`:``)},[s(`td`,{class:h([`px-3 py-2 font-medium`,e.status===`selected`?`text-white`:e.status===`fallback`?`text-amber-300 font-bold`:`text-gray-500 line-through`])},o(e.name),3),s(`td`,$n,o(e.value===null?`N/A`:`${e.value.toFixed(1)}x`),1),s(`td`,er,[e.status===`fallback`?(t(),c(`span`,tr,` [⚠️ DEFAULT] `)):e.status===`selected`?(t(),c(`span`,nr,` [✓] Selected `)):e.status===`rejected`?(t(),c(`span`,rr,` [✗] Rejected `)):(t(),c(`span`,ir,` [x] Ignored `))]),s(`td`,ar,o(e.note),1)],2))),128))])])]),r(V).discount_rate?(t(),c(`div`,or,[s(`div`,sr,[g[72]||=s(`span`,null,`4. Cascade Taux d'Actualisation (r)`,-1),s(`span`,cr,`Retenu : `+o($(r(V).discount_rate.selected)),1)]),s(`table`,lr,[g[73]||=s(`thead`,{class:`bg-gray-900 text-[10px] text-gray-500 uppercase`},[s(`tr`,null,[s(`th`,{class:`px-3 py-1.5`},`Candidat`),s(`th`,{class:`px-3 py-1.5`},`Valeur Brut`),s(`th`,{class:`px-3 py-1.5`},`Statut`),s(`th`,{class:`px-3 py-1.5`},`Explication`)])],-1),s(`tbody`,ur,[(t(!0),c(_,null,n(r(V).discount_rate.candidates,e=>(t(),c(`tr`,{key:e.name,class:h(e.status===`selected`||e.status===`fallback`?`bg-amber-950/20`:``)},[s(`td`,{class:h([`px-3 py-2 font-medium`,e.status===`selected`?`text-white`:e.status===`fallback`?`text-amber-300 font-bold`:`text-gray-500 line-through`])},o(e.name),3),s(`td`,dr,o(e.value===null?`N/A`:$(e.value)),1),s(`td`,fr,[e.status===`fallback`?(t(),c(`span`,pr,` [⚠️ DEFAULT] `)):e.status===`selected`?(t(),c(`span`,mr,` [✓] Selected `)):e.status===`rejected`?(t(),c(`span`,hr,` [✗] Rejected `)):(t(),c(`span`,gr,` [x] Ignored `))]),s(`td`,_r,o(e.note),1)],2))),128))])])])):y(``,!0)])):(t(),c(`div`,vr,` Aucune donnée de cascade d'audit enregistrée pour cette action. Effectuez à nouveau la recherche du ticker pour régénérer l'audit trail. `))])]))])}}}),{__name:`ValuationCard`}),j={class:`space-y-8`},M={class:`rounded-xl border border-gray-800 bg-gray-950/60 p-6 space-y-4 shadow-xl backdrop-blur`},N=[`disabled`],P=[`disabled`],F={key:0,class:`h-4 w-4 animate-spin text-white`,viewBox:`0 0 24 24`,fill:`none`},I={key:0,class:`rounded-lg border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-300`},L={key:1,class:`rounded-lg border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300`},R={class:`space-y-4`},z={class:`flex items-center justify-between`},B={class:`text-lg font-semibold text-white`},V={key:0,class:`py-12 text-center text-sm text-gray-500`},H={key:1,class:`rounded-xl border border-dashed border-gray-800 p-12 text-center text-sm text-gray-500`},yr={key:2,class:`grid gap-6`},br=b({__name:`index`,setup(i){let l=g(``),u=g(!1),m=g(null),h=g(null),v=g([]),b=g(!0),w=g({}),T=async()=>{b.value=!0;try{let e=await C(`/api/stocks`);v.value=e||[],e.forEach(async e=>{if(!w.value[e.ticker])try{let t=await C(`/api/stock/${encodeURIComponent(e.ticker)}`);w.value[e.ticker]={growth_source:t.growth_source,margin_source:t.margin_source,pe_source:t.pe_source}}catch{}})}catch(e){console.error(`Erreur chargement stocks SQLite:`,e)}finally{b.value=!1}};f(()=>{T()});let E=async()=>{let e=l.value.trim().toUpperCase();if(e){u.value=!0,m.value=null,h.value=null;try{let t=await C(`/api/stock/${encodeURIComponent(e)}`);w.value[t.ticker]={growth_source:t.growth_source,margin_source:t.margin_source,pe_source:t.pe_source};let n=v.value.find(e=>e.ticker===t.ticker),r=await C(`/api/stocks`,{method:`POST`,body:{ticker:t.ticker,name:t.name,currency:t.currency??`USD`,current_price:t.current_price,revenue_ttm:t.revenue_ttm,shares_outstanding:t.shares_outstanding,beta:t.beta??1,fetched_at:t.fetched_at,growth_mode:n?.growth_mode??t.growth_mode,projected_growth:n?.projected_growth??t.default_growth,growth_y1:n?.growth_y1??t.growth_y1,growth_y2:n?.growth_y2??t.growth_y2,growth_y3:n?.growth_y3??t.growth_y3,growth_y4:n?.growth_y4??t.growth_y4,growth_y5:n?.growth_y5??t.growth_y5,margin_type:`net_income`,projected_margin:n?.projected_margin??t.default_margin,target_multiple:n?.target_multiple??t.default_target_multiple??20,discount_rate:n?.discount_rate??t.default_discount_rate,risk_spread:n?.risk_spread??t.default_risk_spread??.2,market_cap:t.market_cap,pe_trailing_raw:t.pe_trailing_raw,pe_forward_raw:t.pe_forward_raw,margin_gross_raw:t.margin_gross_raw,margin_operating_raw:t.margin_operating_raw,margin_net_raw:t.margin_net_raw,margin_fcf_raw:t.margin_fcf_raw,total_cash:t.total_cash,total_debt:t.total_debt,free_cash_flow_raw:t.free_cash_flow_raw,analyst_target_price:t.analyst_target_price,analyst_target_median:t.analyst_target_median,analyst_target_low:t.analyst_target_low,analyst_target_high:t.analyst_target_high,analyst_growth_estimate:t.analyst_growth_estimate,analyst_count:t.analyst_count,audit_data:t.audit_data}});h.value=`${r.ticker} (${r.name}) — enregistré en SQLite local avec Audit Trail.`,l.value=``,await T()}catch(e){m.value=e.data?.statusMessage||e.message||`Impossible d'ajouter ce ticker.`}finally{u.value=!1}}},D=e=>{let t=w.value[e.ticker];return t?{...e,growth_source:t.growth_source,margin_source:t.margin_source,pe_source:t.pe_source}:e},O=async e=>{try{let t=await C(`/api/stocks/${e.id}`,{method:`PUT`,body:{currency:e.currency,beta:Number(e.beta),growth_mode:e.growth_mode,projected_growth:Number(e.projected_growth),growth_y1:Number(e.growth_y1),growth_y2:Number(e.growth_y2),growth_y3:Number(e.growth_y3),growth_y4:Number(e.growth_y4),growth_y5:Number(e.growth_y5),revenue_y1:e.revenue_y1===null?null:Number(e.revenue_y1),revenue_y2:e.revenue_y2===null?null:Number(e.revenue_y2),revenue_y3:e.revenue_y3===null?null:Number(e.revenue_y3),revenue_y4:e.revenue_y4===null?null:Number(e.revenue_y4),revenue_y5:e.revenue_y5===null?null:Number(e.revenue_y5),margin_type:`net_income`,projected_margin:Number(e.projected_margin),target_multiple:Number(e.target_multiple),discount_rate:Number(e.discount_rate),risk_spread:Number(e.risk_spread)}}),n=v.value.findIndex(t=>t.id===e.id);n!==-1&&(v.value[n]={...v.value[n],...t})}catch(e){console.error(`Erreur mise à jour hypothèses SQLite:`,e)}},k=async(e,t)=>{if(confirm(`Supprimer ${t} de votre base locale ?`))try{await C(`/api/stocks/${e}`,{method:`DELETE`}),v.value=v.value.filter(t=>t.id!==e)}catch(e){console.error(`Erreur suppression:`,e)}};return(i,f)=>{let g=A;return t(),c(`div`,j,[f[3]||=s(`div`,{class:`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-800 pb-6`},[s(`div`,null,[s(`h1`,{class:`text-2xl font-bold tracking-tight text-white`},` Moteur de Valorisation & Pricing `),s(`p`,{class:`text-sm text-gray-400`},[d(` Base de données : `),s(`span`,{class:`font-medium text-emerald-400`},`SQLite Local (.data/stocks.db)`)])])],-1),s(`div`,M,[f[2]||=s(`h2`,{class:`text-base font-semibold text-white`},` 🔍 Rechercher & Analyser un Ticker `,-1),s(`form`,{class:`flex flex-col sm:flex-row gap-3`,onSubmit:S(E,[`prevent`])},[a(s(`input`,{"onUpdate:modelValue":f[0]||=t=>e(l)?l.value=t:null,type:`text`,placeholder:`Ex: AAPL, ASML, NVDA, NBIS, TTE.PA...`,class:`flex-1 rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500`,disabled:r(u)},null,8,N),[[x,r(l)]]),s(`button`,{type:`submit`,class:`inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500 focus:outline-none disabled:opacity-50`,disabled:r(u)||!r(l).trim()},[r(u)?(t(),c(`svg`,F,[...f[1]||=[s(`circle`,{class:`opacity-25`,cx:`12`,cy:`12`,r:`10`,stroke:`currentColor`,"stroke-width":`4`},null,-1),s(`path`,{class:`opacity-75`,fill:`currentColor`,d:`M4 12a8 8 0 018-8v8H4z`},null,-1)]])):y(``,!0),s(`span`,null,o(r(u)?`Analyse...`:`Analyser / Ajouter`),1)],8,P)],32),r(m)?(t(),c(`div`,I,o(r(m)),1)):y(``,!0),r(h)?(t(),c(`div`,L,o(r(h)),1)):y(``,!0)]),s(`div`,R,[s(`div`,z,[s(`h2`,B,` Actions Enregistrées (`+o(r(v).length)+`) `,1)]),r(b)?(t(),c(`div`,V,` Chargement des données... `)):r(v).length===0?(t(),c(`div`,H,` Aucune action enregistrée en SQLite. Utilisez la barre de recherche ci-dessus pour commencer. `)):(t(),c(`div`,yr,[(t(!0),c(_,null,n(r(v),e=>(t(),p(g,{key:e.id,stock:D(e),onUpdate:O,onDelete:k},null,8,[`stock`]))),128))]))])])}}});export{br as default};
```

# .output/public/_nuxt/BGVrjGLA.js

```js
import{M as e,c as t,d as n,v as r}from"./BWlekpQc.js";import{l as i}from"#entry";import{t as a}from"./CNs_Ozdc.js";var o={class:`flex min-h-screen items-center justify-center bg-gray-950 text-gray-400`},s=r({__name:`login`,setup(r){return a({layout:!1}),i(`/`),(r,i)=>(e(),n(`div`,o,[...i[0]||=[t(`p`,{class:`text-sm`},`Redirection vers le tableau de bord local…`,-1)]]))}});export{s as default};
```

# .output/public/_nuxt/BIjnivpp.js

```js
String.fromCharCode;var e=/#/g,t=/&/g,n=/\//g,r=/=/g,i=/\?/g,a=/\+/g,o=/%5e/gi,s=/%60/gi,c=/%7c/gi,l=/%20/gi,u=/%2f/gi,d=/%252f/gi;function f(e){return encodeURI(``+e).replace(c,`|`)}function p(r){return f(typeof r==`string`?r:JSON.stringify(r)).replace(a,`%2B`).replace(l,`+`).replace(e,`%23`).replace(t,`%26`).replace(s,"`").replace(o,`^`).replace(n,`%2F`)}function m(e){return p(e).replace(r,`%3D`)}function h(n){return f(n).replace(e,`%23`).replace(i,`%3F`).replace(d,`%2F`).replace(t,`%26`).replace(a,`%2B`)}function g(e=``){try{return decodeURIComponent(``+e)}catch{return``+e}}function _(e){return g(e.replace(u,`%252F`))}function v(e){return g(e.replace(a,` `))}function y(e){return g(e.replace(a,` `))}function b(e=``){let t=Object.create(null);e[0]===`?`&&(e=e.slice(1));for(let n of e.split(`&`)){let e=n.match(/([^=]+)=?(.*)/)||[];if(e.length<2)continue;let r=v(e[1]);if(r===`__proto__`||r===`constructor`)continue;let i=y(e[2]||``);t[r]===void 0?t[r]=i:Array.isArray(t[r])?t[r].push(i):t[r]=[t[r],i]}return t}function x(e,t){return(typeof t==`number`||typeof t==`boolean`)&&(t=String(t)),t?Array.isArray(t)?t.map(t=>`${m(e)}=${p(t)}`).join(`&`):`${m(e)}=${p(t)}`:m(e)}function S(e){return Object.keys(e).filter(t=>e[t]!==void 0).map(t=>x(t,e[t])).filter(Boolean).join(`&`)}var C=/^[\s\w\0+.-]{2,}:([/\\]{1,2})/,w=/^[\s\w\0+.-]{2,}:([/\\]{2})?/,T=/^([/\\]\s*){2,}[^/\\]/,E=/^[\s\0]*(blob|data|javascript|vbscript):$/i,D=/\/$|\/\?|\/#/,O=/^\.?\//;function k(e,t={}){return typeof t==`boolean`&&(t={acceptRelative:t}),t.strict?C.test(e):w.test(e)||(t.acceptRelative?T.test(e):!1)}function A(e){return!!e&&E.test(e)}function j(e=``,t){return t?D.test(e):e.endsWith(`/`)}function M(e=``,t){if(!t)return(j(e)?e.slice(0,-1):e)||`/`;if(!j(e,!0))return e||`/`;let n=e,r=``,i=e.indexOf(`#`);i!==-1&&(n=e.slice(0,i),r=e.slice(i));let[a,...o]=n.split(`?`);return((a.endsWith(`/`)?a.slice(0,-1):a)||`/`)+(o.length>0?`?${o.join(`?`)}`:``)+r}function N(e=``,t){if(!t)return e.endsWith(`/`)?e:e+`/`;if(j(e,!0))return e||`/`;let n=e,r=``,i=e.indexOf(`#`);if(i!==-1&&(n=e.slice(0,i),r=e.slice(i),!n))return r;let[a,...o]=n.split(`?`);return a+`/`+(o.length>0?`?${o.join(`?`)}`:``)+r}function P(e,t){if(L(t)||k(e))return e;let n=M(t);if(e.startsWith(n)){let t=e[n.length];if(!t||t===`/`||t===`?`)return e}return z(n,e)}function F(e,t){if(L(t))return e;let n=M(t);if(!e.startsWith(n))return e;let r=e[n.length];return r&&r!==`/`&&r!==`?`?e:`/`+e.slice(n.length).replace(/^\/+/,``)}function I(e,t){let n=U(e);return n.search=S({...b(n.search),...t}),G(n)}function L(e){return!e||e===`/`}function R(e){return e&&e!==`/`}function z(e,...t){let n=e||``;for(let e of t.filter(e=>R(e)))if(n){let t=e.replace(O,``);n=N(n)+t}else n=e;return n}function B(...e){let t=/\/(?!\/)/,n=e.filter(Boolean),r=[],i=0;for(let e of n)if(!(!e||e===`/`)){for(let[n,a]of e.split(t).entries())if(!(!a||a===`.`)){if(a===`..`){if(r.length===1&&k(r[0]))continue;r.pop(),i--;continue}if(n===1&&r[r.length-1]?.endsWith(`:/`)){r[r.length-1]+=`/`+a;continue}r.push(a),i++}}let a=r.join(`/`);return i>=0?n[0]?.startsWith(`/`)&&!a.startsWith(`/`)?a=`/`+a:n[0]?.startsWith(`./`)&&!a.startsWith(`./`)&&(a=`./`+a):a=`../`.repeat(-1*i)+a,n[n.length-1]?.endsWith(`/`)&&!a.endsWith(`/`)&&(a+=`/`),a}function V(e,t){return g(M(e))===g(M(t))}var H=Symbol.for(`ufo:protocolRelative`);function U(e=``,t){let n=e.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);if(n){let[,e,t=``]=n;return{protocol:e.toLowerCase(),pathname:t,href:e+t,auth:``,host:``,search:``,hash:``}}if(!k(e,{acceptRelative:!0}))return t?U(t+e):W(e);let[,r=``,i,a=``]=e.replace(/\\/g,`/`).match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/)||[],[,o=``,s=``]=a.match(/([^#/?]*)(.*)?/)||[];r===`file:`&&(s=s.replace(/\/(?=[A-Za-z]:)/,``));let{pathname:c,search:l,hash:u}=W(s);return{protocol:r.toLowerCase(),auth:i?i.slice(0,Math.max(0,i.length-1)):``,host:o,pathname:c,search:l,hash:u,[H]:!r}}function W(e=``){let[t=``,n=``,r=``]=(e.match(/([^#?]*)(\?[^#]*)?(#.*)?/)||[]).splice(1);return{pathname:t,search:n,hash:r}}function G(e){let t=e.pathname||``,n=e.search?(e.search.startsWith(`?`)?``:`?`)+e.search:``,r=e.hash||``,i=e.auth?e.auth+`@`:``,a=e.host||``;return(e.protocol||e[H]?(e.protocol||``)+`//`:``)+i+a+t+n+r}export{A as a,b as c,I as d,N as f,V as i,U as l,M as m,h as n,B as o,F as p,k as r,z as s,_ as t,P as u};
```

# .output/public/_nuxt/Bp_tvWCv.js

```js
import{M as e,c as t,d as n,v as r}from"./BWlekpQc.js";import{l as i}from"#entry";import{t as a}from"./CNs_Ozdc.js";var o={class:`flex min-h-screen items-center justify-center bg-gray-950 text-gray-400`},s=r({__name:`confirm`,setup(r){return a({layout:!1}),i(`/`),(r,i)=>(e(),n(`div`,o,[...i[0]||=[t(`p`,{class:`text-sm`},`Redirection vers le tableau de bord local…`,-1)]]))}});export{s as default};
```

# .output/public/_nuxt/builds/latest.json

```json
{"id":"4120831a-0615-436c-be4d-62114a3785a0","timestamp":1784743494801}
```

# .output/public/_nuxt/builds/meta/4120831a-0615-436c-be4d-62114a3785a0.json

```json
{"id":"4120831a-0615-436c-be4d-62114a3785a0","timestamp":1784743494801,"prerendered":[]}
```

# .output/public/_nuxt/BWlekpQc.js

```js
function e(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var t={},n=[],r=()=>{},i=()=>!1,a=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),o=e=>e.startsWith(`onUpdate:`),s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>S(e)===`[object Map]`,p=e=>S(e)===`[object Set]`,m=e=>S(e)===`[object Date]`,h=e=>S(e)===`[object RegExp]`,g=e=>typeof e==`function`,_=e=>typeof e==`string`,v=e=>typeof e==`symbol`,y=e=>typeof e==`object`&&!!e,b=e=>(y(e)||g(e))&&g(e.then)&&g(e.catch),x=Object.prototype.toString,S=e=>x.call(e),C=e=>S(e).slice(8,-1),w=e=>S(e)===`[object Object]`,T=e=>_(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,E=e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),D=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},ee=/-\w/g,O=D(e=>e.replace(ee,e=>e.slice(1).toUpperCase())),te=/\B([A-Z])/g,ne=D(e=>e.replace(te,`-$1`).toLowerCase()),re=D(e=>e.charAt(0).toUpperCase()+e.slice(1)),ie=D(e=>e?`on${re(e)}`:``),k=(e,t)=>!Object.is(e,t),A=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},ae=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},oe=e=>{let t=parseFloat(e);return isNaN(t)?e:t},se=e=>{let t=_(e)?Number(e):NaN;return isNaN(t)?e:t},ce,le=()=>ce||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function ue(e){if(d(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=_(r)?me(r):ue(r);if(i)for(let e in i)t[e]=i[e]}return t}else if(_(e)||y(e))return e}var de=/;(?![^(]*\))/g,fe=/:([^]+)/,pe=/\/\*[^]*?\*\//g;function me(e){let t={};return e.replace(pe,``).split(de).forEach(e=>{if(e){let n=e.split(fe);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function he(e){let t=``;if(_(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){let r=he(e[n]);r&&(t+=r+` `)}else if(y(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}function ge(e){if(!e)return null;let{class:t,style:n}=e;return t&&!_(t)&&(e.class=he(t)),n&&(e.style=ue(n)),e}var _e=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,ve=e(_e);_e+``;function ye(e){return!!e||e===``}function be(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=xe(e[r],t[r]);return n}function xe(e,t){if(e===t)return!0;let n=m(e),r=m(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=v(e),r=v(t),n||r)return e===t;if(n=d(e),r=d(t),n||r)return n&&r?be(e,t):!1;if(n=y(e),r=y(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!xe(e[n],t[n]))return!1}}return String(e)===String(t)}var Se=e=>!!(e&&e.__v_isRef===!0),Ce=e=>_(e)?e:e==null?``:d(e)||y(e)&&(e.toString===x||!g(e.toString))?Se(e)?Ce(e.value):JSON.stringify(e,we,2):String(e),we=(e,t)=>Se(t)?we(e,t.value):f(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[Te(t,r)+` =>`]=n,e),{})}:p(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Te(e))}:v(t)?Te(t):y(t)&&!d(t)&&!w(t)?String(t):t,Te=(e,t=``)=>v(e)?`Symbol(${e.description??t})`:e,j,Ee=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&j&&(j.active?(this.parent=j,this.index=(j.scopes||=[]).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}let n=this.effects.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}}run(e){if(this._active){let t=j;try{return j=this,e()}finally{j=t}}}on(){++this._on===1&&(this.prevScope=j,j=this)}off(){if(this._on>0&&--this._on===0){if(j===this)j=this.prevScope;else{let e=j;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){let e=this.scopes.slice();for(t=0,n=e.length;t<n;t++)e[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function De(e){return new Ee(e)}function Oe(){return j}var M,ke=new WeakSet,Ae=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,j&&(j.active?j.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ke.has(this)&&(ke.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Pe(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ke(this),Le(this);let e=M,t=N;M=this,N=!0;try{return this.fn()}finally{Re(this),M=e,N=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Ve(e);this.deps=this.depsTail=void 0,Ke(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ke.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ze(this)&&this.run()}get dirty(){return ze(this)}},je=0,Me,Ne;function Pe(e,t=!1){if(e.flags|=8,t){e.next=Ne,Ne=e;return}e.next=Me,Me=e}function Fe(){je++}function Ie(){if(--je>0)return;if(Ne){let e=Ne;for(Ne=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;Me;){let t=Me;for(Me=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function Le(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Re(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Ve(r),He(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function ze(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Be(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Be(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===qe)||(e.globalVersion=qe,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!ze(e))))return;e.flags|=2;let t=e.dep,n=M,r=N;M=e,N=!0;try{Le(e);let n=e.fn(e._value);(t.version===0||k(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{M=n,N=r,Re(e),e.flags&=-3}}function Ve(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Ve(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function He(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var N=!0,Ue=[];function We(){Ue.push(N),N=!1}function Ge(){let e=Ue.pop();N=e===void 0||e}function Ke(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=M;M=void 0;try{t()}finally{M=e}}}var qe=0,Je=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},Ye=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!M||!N||M===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==M)t=this.activeLink=new Je(M,this),M.deps?(t.prevDep=M.depsTail,M.depsTail.nextDep=t,M.depsTail=t):M.deps=M.depsTail=t,Xe(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=M.depsTail,t.nextDep=void 0,M.depsTail.nextDep=t,M.depsTail=t,M.deps===t&&(M.deps=e)}return t}trigger(e){this.version++,qe++,this.notify(e)}notify(e){Fe();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Ie()}}};function Xe(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Xe(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Ze=new WeakMap,Qe=Symbol(``),$e=Symbol(``),et=Symbol(``);function P(e,t,n){if(N&&M){let t=Ze.get(e);t||Ze.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new Ye),r.map=t,r.key=n),r.track()}}function tt(e,t,n,r,i,a){let o=Ze.get(e);if(!o){qe++;return}let s=e=>{e&&e.trigger()};if(Fe(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&T(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===et||!v(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(et)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(Qe)),f(e)&&s(o.get($e)));break;case`delete`:i||(s(o.get(Qe)),f(e)&&s(o.get($e)));break;case`set`:f(e)&&s(o.get(Qe));break}}Ie()}function nt(e,t){let n=Ze.get(e);return n&&n.get(t)}function rt(e){let t=I(e);return t===e?t:(P(t,`iterate`,et),F(e)?t:t.map(L))}function it(e){return P(e=I(e),`iterate`,et),e}function at(e,t){return Vt(e)?Wt(Bt(e)?L(t):t):L(t)}var ot={__proto__:null,[Symbol.iterator](){return st(this,Symbol.iterator,e=>at(this,e))},concat(...e){return rt(this).concat(...e.map(e=>d(e)?rt(e):e))},entries(){return st(this,`entries`,e=>(e[1]=at(this,e[1]),e))},every(e,t){return lt(this,`every`,e,t,void 0,arguments)},filter(e,t){return lt(this,`filter`,e,t,e=>e.map(e=>at(this,e)),arguments)},find(e,t){return lt(this,`find`,e,t,e=>at(this,e),arguments)},findIndex(e,t){return lt(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return lt(this,`findLast`,e,t,e=>at(this,e),arguments)},findLastIndex(e,t){return lt(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return lt(this,`forEach`,e,t,void 0,arguments)},includes(...e){return dt(this,`includes`,e)},indexOf(...e){return dt(this,`indexOf`,e)},join(e){return rt(this).join(e)},lastIndexOf(...e){return dt(this,`lastIndexOf`,e)},map(e,t){return lt(this,`map`,e,t,void 0,arguments)},pop(){return ft(this,`pop`)},push(...e){return ft(this,`push`,e)},reduce(e,...t){return ut(this,`reduce`,e,t)},reduceRight(e,...t){return ut(this,`reduceRight`,e,t)},shift(){return ft(this,`shift`)},some(e,t){return lt(this,`some`,e,t,void 0,arguments)},splice(...e){return ft(this,`splice`,e)},toReversed(){return rt(this).toReversed()},toSorted(e){return rt(this).toSorted(e)},toSpliced(...e){return rt(this).toSpliced(...e)},unshift(...e){return ft(this,`unshift`,e)},values(){return st(this,`values`,e=>at(this,e))}};function st(e,t,n){let r=it(e),i=r[t]();return r!==e&&!F(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var ct=Array.prototype;function lt(e,t,n,r,i,a){let o=it(e),s=o!==e&&!F(e),c=o[t];if(c!==ct[t]){let t=c.apply(e,a);return s?L(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,at(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function ut(e,t,n,r){let i=it(e),a=i!==e&&!F(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=at(e,t)),n.call(this,t,at(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?at(e,c):c}function dt(e,t,n){let r=I(e);P(r,`iterate`,et);let i=r[t](...n);return(i===-1||i===!1)&&Ht(n[0])?(n[0]=I(n[0]),r[t](...n)):i}function ft(e,t,n=[]){We(),Fe();let r=I(e)[t].apply(e,n);return Ie(),Ge(),r}var pt=e(`__proto__,__v_isRef,__isVue`),mt=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(v));function ht(e){v(e)||(e=String(e));let t=I(this);return P(t,`has`,e),t.hasOwnProperty(e)}var gt=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Pt:Nt:i?Mt:jt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=ot[t]))return e;if(t===`hasOwnProperty`)return ht}let o=Reflect.get(e,t,R(e)?e:n);if((v(t)?mt.has(t):pt(t))||(r||P(e,`get`,t),i))return o;if(R(o)){let e=a&&T(t)?o:o.value;return r&&y(e)?Rt(e):e}return y(o)?r?Rt(o):It(o):o}},_t=class extends gt{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&T(t);if(!this._isShallow){let e=Vt(i);if(!F(n)&&!Vt(n)&&(i=I(i),n=I(n)),!a&&R(i)&&!R(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,R(e)?e:r);return e===I(r)&&s&&(o?k(n,i)&&tt(e,`set`,t,n,i):tt(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&tt(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!v(t)||!mt.has(t))&&P(e,`has`,t),n}ownKeys(e){return P(e,`iterate`,d(e)?`length`:Qe),Reflect.ownKeys(e)}},vt=class extends gt{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},yt=new _t,bt=new vt,xt=new _t(!0),St=e=>e,Ct=e=>Reflect.getPrototypeOf(e);function wt(e,t,n){return function(...r){let i=this.__v_raw,a=I(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?St:t?Wt:L;return!t&&P(a,`iterate`,l?$e:Qe),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function Tt(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function Et(e,t){let n={get(n){let r=this.__v_raw,i=I(r),a=I(n);e||(k(n,a)&&P(i,`get`,n),P(i,`get`,a));let{has:o}=Ct(i),s=t?St:e?Wt:L;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&P(I(t),`iterate`,Qe),t.size},has(t){let n=this.__v_raw,r=I(n),i=I(t);return e||(k(t,i)&&P(r,`has`,t),P(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=I(a),s=t?St:e?Wt:L;return!e&&P(o,`iterate`,Qe),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:Tt(`add`),set:Tt(`set`),delete:Tt(`delete`),clear:Tt(`clear`)}:{add(e){let n=I(this),r=Ct(n),i=I(e),a=!t&&!F(e)&&!Vt(e)?i:e;return r.has.call(n,a)||k(e,a)&&r.has.call(n,e)||k(i,a)&&r.has.call(n,i)||(n.add(a),tt(n,`add`,a,a)),this},set(e,n){!t&&!F(n)&&!Vt(n)&&(n=I(n));let r=I(this),{has:i,get:a}=Ct(r),o=i.call(r,e);o||=(e=I(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?k(n,s)&&tt(r,`set`,e,n,s):tt(r,`add`,e,n),this},delete(e){let t=I(this),{has:n,get:r}=Ct(t),i=n.call(t,e);i||=(e=I(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&tt(t,`delete`,e,void 0,a),o},clear(){let e=I(this),t=e.size!==0,n=e.clear();return t&&tt(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=wt(r,e,t)}),n}function Dt(e,t){let n=Et(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}var Ot={get:Dt(!1,!1)},kt={get:Dt(!1,!0)},At={get:Dt(!0,!1)},jt=new WeakMap,Mt=new WeakMap,Nt=new WeakMap,Pt=new WeakMap;function Ft(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function It(e){return Vt(e)?e:zt(e,!1,yt,Ot,jt)}function Lt(e){return zt(e,!1,xt,kt,Mt)}function Rt(e){return zt(e,!0,bt,At,Nt)}function zt(e,t,n,r,i){if(!y(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let a=i.get(e);if(a)return a;let o=Ft(C(e));if(o===0)return e;let s=new Proxy(e,o===2?r:n);return i.set(e,s),s}function Bt(e){return Vt(e)?Bt(e.__v_raw):!!(e&&e.__v_isReactive)}function Vt(e){return!!(e&&e.__v_isReadonly)}function F(e){return!!(e&&e.__v_isShallow)}function Ht(e){return e?!!e.__v_raw:!1}function I(e){let t=e&&e.__v_raw;return t?I(t):e}function Ut(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&ae(e,`__v_skip`,!0),e}var L=e=>y(e)?It(e):e,Wt=e=>y(e)?Rt(e):e;function R(e){return e?e.__v_isRef===!0:!1}function Gt(e){return qt(e,!1)}function Kt(e){return qt(e,!0)}function qt(e,t){return R(e)?e:new Jt(e,t)}var Jt=class{constructor(e,t){this.dep=new Ye,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:I(e),this._value=t?e:L(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||F(e)||Vt(e);e=n?e:I(e),k(e,t)&&(this._rawValue=e,this._value=n?e:L(e),this.dep.trigger())}};function Yt(e){return R(e)?e.value:e}function Xt(e){return g(e)?e():Yt(e)}var Zt={get:(e,t,n)=>t===`__v_raw`?e:Yt(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return R(i)&&!R(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Qt(e){return Bt(e)?e:new Proxy(e,Zt)}var $t=class{constructor(e,t,n){this._object=e,this._defaultValue=n,this.__v_isRef=!0,this._value=void 0,this._key=v(t)?t:String(t),this._raw=I(e);let r=!0,i=e;if(!d(e)||v(this._key)||!T(this._key))do r=!Ht(i)||F(i);while(r&&(i=i.__v_raw));this._shallow=r}get value(){let e=this._object[this._key];return this._shallow&&(e=Yt(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&R(this._raw[this._key])){let t=this._object[this._key];if(R(t)){t.value=e;return}}this._object[this._key]=e}get dep(){return nt(this._raw,this._key)}},en=class{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}};function tn(e,t,n){return R(e)?e:g(e)?new en(e):y(e)&&arguments.length>1?nn(e,t,n):Gt(e)}function nn(e,t,n){return new $t(e,t,n)}var rn=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Ye(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=qe-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&M!==this)return Pe(this,!0),!0}get value(){let e=this.dep.track();return Be(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function an(e,t,n=!1){let r,i;return g(e)?r=e:(r=e.get,i=e.set),new rn(r,i,n)}var on={},sn=new WeakMap,cn=void 0;function ln(e,t=!1,n=cn){if(n){let t=sn.get(n);t||sn.set(n,t=[]),t.push(e)}}function un(e,n,i=t){let{immediate:a,deep:o,once:s,scheduler:l,augmentJob:u,call:f}=i,p=e=>o?e:F(e)||o===!1||o===0?dn(e,1):dn(e),m,h,_,v,y=!1,b=!1;if(R(e)?(h=()=>e.value,y=F(e)):Bt(e)?(h=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>Bt(e)||F(e)),h=()=>e.map(e=>{if(R(e))return e.value;if(Bt(e))return p(e);if(g(e))return f?f(e,2):e()})):h=g(e)?n?f?()=>f(e,2):e:()=>{if(_){We();try{_()}finally{Ge()}}let t=cn;cn=m;try{return f?f(e,3,[v]):e(v)}finally{cn=t}}:r,n&&o){let e=h,t=o===!0?1/0:o;h=()=>dn(e(),t)}let x=Oe(),S=()=>{m.stop(),x&&x.active&&c(x.effects,m)};if(s&&n){let e=n;n=(...t)=>{let n=e(...t);return S(),n}}let C=b?Array(e.length).fill(on):on,w=e=>{if(!(!(m.flags&1)||!m.dirty&&!e))if(n){let t=m.run();if(e||o||y||(b?t.some((e,t)=>k(e,C[t])):k(t,C))){_&&_();let e=cn;cn=m;try{let e=[t,C===on?void 0:b&&C[0]===on?[]:C,v];C=t,f?f(n,3,e):n(...e)}finally{cn=e}}}else m.run()};return u&&u(w),m=new Ae(h),m.scheduler=l?()=>l(w,!1):w,v=e=>ln(e,!1,m),_=m.onStop=()=>{let e=sn.get(m);if(e){if(f)f(e,4);else for(let t of e)t();sn.delete(m)}},n?a?w(!0):C=m.run():l?l(w.bind(null,!0),!0):m.run(),S.pause=m.pause.bind(m),S.resume=m.resume.bind(m),S.stop=S,S}function dn(e,t=1/0,n){if(t<=0||!y(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,R(e))dn(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)dn(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{dn(e,t,n)});else if(w(e)){for(let r in e)dn(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&dn(e[r],t,n)}return e}function fn(e,t,n,r){try{return r?e(...r):e()}catch(e){pn(e,t,n)}}function z(e,t,n,r){if(g(e)){let i=fn(e,t,n,r);return i&&b(i)&&i.catch(e=>{pn(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push(z(e[a],t,n,r));return i}}function pn(e,n,r,i=!0){let a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||t;if(n){let t=n.parent,i=n.proxy,a=`https://vuejs.org/error-reference/#runtime-${r}`;for(;t;){let n=t.ec;if(n){for(let t=0;t<n.length;t++)if(n[t](e,i,a)===!1)return}t=t.parent}if(o){We(),fn(o,null,10,[e,i,a]),Ge();return}}mn(e,r,a,i,s)}function mn(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var B=[],hn=-1,gn=[],_n=null,vn=0,yn=Promise.resolve(),bn=null;function xn(e){let t=bn||yn;return e?t.then(this?e.bind(this):e):t}function Sn(e){let t=hn+1,n=B.length;for(;t<n;){let r=t+n>>>1,i=B[r],a=On(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function Cn(e){if(!(e.flags&1)){let t=On(e),n=B[B.length-1];!n||!(e.flags&2)&&t>=On(n)?B.push(e):B.splice(Sn(t),0,e),e.flags|=1,wn()}}function wn(){bn||=yn.then(kn)}function Tn(e){d(e)?gn.push(...e):_n&&e.id===-1?_n.splice(vn+1,0,e):e.flags&1||(gn.push(e),e.flags|=1),wn()}function En(e,t,n=hn+1){for(;n<B.length;n++){let t=B[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;B.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function Dn(e){if(gn.length){let e=[...new Set(gn)].sort((e,t)=>On(e)-On(t));if(gn.length=0,_n){_n.push(...e);return}for(_n=e,vn=0;vn<_n.length;vn++){let e=_n[vn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}_n=null,vn=0}}var On=e=>e.id==null?e.flags&2?-1:1/0:e.id;function kn(e){try{for(hn=0;hn<B.length;hn++){let e=B[hn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),fn(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;hn<B.length;hn++){let e=B[hn];e&&(e.flags&=-2)}hn=-1,B.length=0,Dn(e),bn=null,(B.length||gn.length)&&kn(e)}}var V=null,An=null;function jn(e){let t=V;return V=e,An=e&&e.type.__scopeId||null,t}function Mn(e,t=V,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&Ia(-1);let i=jn(t),a=Ma.length,o;try{o=e(...n)}finally{for(let e=Ma.length;e>a;e--)Pa();jn(i),r._d&&Ia(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function Nn(e,n){if(V===null)return e;let r=vo(V),i=e.dirs||=[];for(let e=0;e<n.length;e++){let[a,o,s,c=t]=n[e];a&&(g(a)&&(a={mounted:a,updated:a}),a.deep&&dn(o),i.push({dir:a,instance:r,value:o,oldValue:void 0,arg:s,modifiers:c}))}return e}function Pn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(We(),z(c,n,8,[e.el,s,e,t]),Ge())}}function Fn(e,t){if($){let n=$.provides,r=$.parent&&$.parent.provides;r===n&&(n=$.provides=Object.create(r)),n[e]=t}}function In(e,t,n=!1){let r=no();if(r||Oi){let i=Oi?Oi._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&g(t)?t.call(r&&r.proxy):t}}function Ln(){return!!(no()||Oi)}var Rn=Symbol.for(`v-scx`),zn=()=>In(Rn);function Bn(e,t){return Hn(e,null,t)}function Vn(e,t,n){return Hn(e,t,n)}function Hn(e,n,i=t){let{immediate:a,deep:o,flush:c,once:l}=i,u=s({},i),d=n&&a||!n&&c!==`post`,f;if(co){if(c===`sync`){let e=zn();f=e.__watcherHandles||=[]}else if(!d){let e=()=>{};return e.stop=r,e.resume=r,e.pause=r,e}}let p=$;u.call=(e,t,n)=>z(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{G(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():Cn(e)}),u.augmentJob=e=>{n&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=un(e,n,u);return co&&(f?f.push(h):d&&h()),h}function Un(e,t,n){let r=this.proxy,i=_(e)?e.includes(`.`)?Wn(r,e):()=>r[e]:e.bind(r,r),a;g(t)?a=t:(a=t.handler,n=t);let o=ao(this),s=Hn(i,a.bind(r),n);return o(),s}function Wn(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var Gn=Symbol(`_vte`),Kn=e=>e.__isTeleport,H=Symbol(`_leaveCb`),qn=Symbol(`_enterCb`);function Jn(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Hr(()=>{e.isMounted=!0}),Gr(()=>{e.isUnmounting=!0}),e}var U=[Function,Array],Yn={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:U,onEnter:U,onAfterEnter:U,onEnterCancelled:U,onBeforeLeave:U,onLeave:U,onAfterLeave:U,onLeaveCancelled:U,onBeforeAppear:U,onAppear:U,onAfterAppear:U,onAppearCancelled:U},Xn=e=>{let t=e.subTree;return t.component?Xn(t.component):t},Zn={name:`BaseTransition`,props:Yn,setup(e,{slots:t}){let n=no(),r=Jn();return()=>{let i=t.default&&ar(t.default(),!0),a=i&&i.length?Qn(i):n.subTree?Ya():void 0;if(!a)return;let o=I(e),{mode:s}=o;if(r.isLeaving)return nr(a);let c=rr(a);if(!c)return nr(a);let l=tr(c,o,r,n,e=>l=e);c.type!==q&&ir(c,l);let u=n.subTree&&rr(n.subTree);if(u&&u.type!==q&&!Y(u,c)&&Xn(n).type!==q){let e=tr(u,o,r,n);if(ir(u,e),s===`out-in`&&c.type!==q)return r.isLeaving=!0,e.afterLeave=()=>{r.isLeaving=!1,n.job.flags&8||n.update(),delete e.afterLeave,u=void 0},nr(a);s===`in-out`&&c.type!==q?e.delayLeave=(e,t,n)=>{let i=er(r,u);i[String(u.key)]=u,e[H]=()=>{t(),e[H]=void 0,delete l.delayedLeave,u=void 0},l.delayedLeave=()=>{n(),delete l.delayedLeave,u=void 0}}:u=void 0}else u&&=void 0;return a}}};function Qn(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==q){t=n;break}}return t}var $n=Zn;function er(e,t){let{leavingVNodes:n}=e,r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function tr(e,t,n,r,i){let{appear:a,mode:o,persisted:s=!1,onBeforeEnter:c,onEnter:l,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:p,onLeave:m,onAfterLeave:h,onLeaveCancelled:g,onBeforeAppear:_,onAppear:v,onAfterAppear:y,onAppearCancelled:b}=t,x=String(e.key),S=er(n,e),C=(e,t)=>{e&&z(e,r,9,t)},w=(e,t)=>{let n=t[1];C(e,t),d(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n()},T={mode:o,persisted:s,beforeEnter(t){let r=c;if(!n.isMounted)if(a)r=_||c;else return;t[H]&&t[H](!0);let i=S[x];i&&Y(e,i)&&i.el[H]&&i.el[H](),C(r,[t])},enter(t){if(S[x]===e)return;let r=l,i=u,o=f;if(!n.isMounted)if(a)r=v||l,i=y||u,o=b||f;else return;let s=!1;t[qn]=e=>{s||(s=!0,C(e?o:i,[t]),T.delayedLeave&&T.delayedLeave(),t[qn]=void 0)};let c=t[qn].bind(null,!1);r?w(r,[t,c]):c()},leave(t,r){let i=String(e.key);if(t[qn]&&t[qn](!0),n.isUnmounting)return r();C(p,[t]);let a=!1;t[H]=n=>{a||(a=!0,r(),C(n?g:h,[t]),t[H]=void 0,S[i]===e&&delete S[i])};let o=t[H].bind(null,!1);S[i]=e,m?w(m,[t,o]):o()},clone(e){let a=tr(e,t,n,r,i);return i&&i(a),a}};return T}function nr(e){if(Ar(e))return e=Ka(e),e.children=null,e}function rr(e){if(!Ar(e))return Kn(e.type)&&e.children?Qn(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&g(n.default))return n.default()}}function ir(e,t){e.shapeFlag&6&&e.component?(e.transition=t,ir(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function ar(e,t=!1,n){let r=[],i=0;for(let a=0;a<e.length;a++){let o=e[a],s=n==null?o.key:String(n)+String(o.key==null?a:o.key);o.type===K?(o.patchFlag&128&&i++,r=r.concat(ar(o.children,t,s))):(t||o.type!==q)&&r.push(s==null?o:Ka(o,{key:s}))}if(i>1)for(let e=0;e<r.length;e++)r[e].patchFlag=-2;return r}function or(e,t){return g(e)?s({name:e.name},t,{setup:e}):e}function sr(e){e.ids=[e.ids[0]+e.ids[2]+++`-`,0,0]}function cr(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var lr=new WeakMap;function ur(e,n,r,a,o=!1){if(d(e)){e.forEach((e,t)=>ur(e,n&&(d(n)?n[t]:n),r,a,o));return}if(Dr(a)&&!o){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&ur(e,n,r,a.component.subTree);return}let s=a.shapeFlag&4?vo(a.component):a.el,l=o?null:s,{i:f,r:p}=e,m=n&&n.r,h=f.refs===t?f.refs={}:f.refs,v=f.setupState,y=I(v),b=v===t?i:e=>!cr(h,e)&&u(y,e),x=(e,t)=>!(t&&cr(h,t));if(m!=null&&m!==p){if(dr(n),_(m))h[m]=null,b(m)&&(v[m]=null);else if(R(m)){let e=n;x(m,e.k)&&(m.value=null),e.k&&(h[e.k]=null)}}if(g(p))fn(p,f,12,[l,h]);else{let t=_(p),n=R(p);if(t||n){let i=()=>{if(e.f){let n=t?b(p)?v[p]:h[p]:x(p)||!e.k?p.value:h[e.k];if(o)d(n)&&c(n,s);else if(d(n))n.includes(s)||n.push(s);else if(t)h[p]=[s],b(p)&&(v[p]=h[p]);else{let t=[s];x(p,e.k)&&(p.value=t),e.k&&(h[e.k]=t)}}else t?(h[p]=l,b(p)&&(v[p]=l)):n&&(x(p,e.k)&&(p.value=l),e.k&&(h[e.k]=l))};if(l){let t=()=>{i(),lr.delete(e)};t.id=-1,lr.set(e,t),G(t,r)}else dr(e),i()}}}function dr(e){let t=lr.get(e);t&&(t.flags|=8,lr.delete(e))}var fr=!1,pr=()=>{fr||=(console.error(`Hydration completed but contains mismatches.`),!0)},mr=e=>e.namespaceURI.includes(`svg`)&&e.tagName!==`foreignObject`,hr=e=>e.namespaceURI.includes(`MathML`),gr=e=>{if(e.nodeType===1){if(mr(e))return`svg`;if(hr(e))return`mathml`}},_r=e=>e.nodeType===8;function vr(e){let{mt:t,p:n,o:{patchProp:r,createText:i,nextSibling:o,parentNode:s,remove:c,insert:l,createComment:u}}=e,d=(e,t)=>{if(!t.hasChildNodes()){n(null,e,t),Dn(),t._vnode=e;return}f(t.firstChild,e,null,null,null),Dn(),t._vnode=e},f=(n,r,a,c,u,d=!1)=>{d||=!!r.dynamicChildren;let b=_r(n)&&n.data===`[`,x=()=>g(n,r,a,c,u,b),{type:S,ref:C,shapeFlag:w,patchFlag:T}=r,E=n.nodeType;r.el=n,T===-2&&(d=!1,r.dynamicChildren=null);let D=null;switch(S){case Aa:E===3?(n.data!==r.children&&(pr(),n.data=r.children),D=o(n)):r.children===``?(l(r.el=i(``),s(n),n),D=n):D=x();break;case q:y(n)?(D=o(n),v(r.el=n.content.firstChild,n,a)):D=E!==8||b?x():o(n);break;case ja:if(b&&(n=o(n),E=n.nodeType),E===1||E===3){D=n;let e=!r.children.length;for(let t=0;t<r.staticCount;t++)e&&(r.children+=D.nodeType===1?D.outerHTML:D.data),t===r.staticCount-1&&(r.anchor=D),D=o(D);return b?o(D):D}else x();break;case K:D=b?h(n,r,a,c,u,d):x();break;default:if(w&1)D=(E!==1||r.type.toLowerCase()!==n.tagName.toLowerCase())&&!y(n)?x():p(n,r,a,c,u,d);else if(w&6){r.slotScopeIds=u;let e=s(n);if(D=b?_(n):_r(n)&&n.data===`teleport start`?_(n,n.data,`teleport end`):o(n),t(r,e,null,a,c,gr(e),d),Dr(r)&&!r.type.__asyncResolved){let t;b?(t=X(K),t.anchor=D?D.previousSibling:e.lastChild):t=n.nodeType===3?qa(``):X(`div`),t.el=n,r.component.subTree=t}}else w&64?D=E===8?r.type.hydrate(n,r,a,c,u,d,e,m):x():w&128&&(D=r.type.hydrate(n,r,a,c,gr(s(n)),u,d,e,f))}return C!=null&&ur(C,null,c,r),D},p=(e,t,n,i,o,s)=>{s||=!!t.dynamicChildren;let{type:l,dynamicProps:u,props:d,patchFlag:f,shapeFlag:p,dirs:h,transition:g}=t,_=l===`input`||l===`option`,b=!!u;if(_||b||f!==-1){h&&Pn(t,null,n,`created`);let l=!1;if(y(e)){l=da(null,g)&&n&&n.vnode.props&&n.vnode.props.appear;let r=e.content.firstChild;if(l){let e=r.getAttribute(`class`);e&&(r.$cls=e),g.beforeEnter(r)}v(r,e,n),t.el=e=r}if(p&16&&!(d&&(d.innerHTML||d.textContent))){let r=m(e.firstChild,t,e,n,i,o,s);for(r&&!xr(e,1)&&pr();r;){let e=r;r=r.nextSibling,c(e)}}else if(p&8){let n=t.children;n[0]===`
`&&(e.tagName===`PRE`||e.tagName===`TEXTAREA`)&&(n=n.slice(1));let{textContent:r}=e;r!==n&&r!==n.replace(/\r\n|\r/g,`
`)&&(xr(e,0)||pr(),e.textContent=t.children)}if(d){if(_||b||!s||f&48){let t=e.tagName.includes(`-`),i=e.namespaceURI.includes(`svg`)?`svg`:e.namespaceURI.includes(`MathML`)?`mathml`:void 0;for(let o in d)(_&&(o.endsWith(`value`)||o===`indeterminate`)||a(o)&&!E(o)||o[0]===`.`||t&&!E(o)||u&&u.includes(o))&&r(e,o,null,d[o],i,n)}else if(d.onClick)r(e,`onClick`,null,d.onClick,void 0,n);else if(f&4&&Bt(d.style))for(let e in d.style)d.style[e]}let x;(x=d&&d.onVnodeBeforeMount)&&Q(x,n,t),h&&Pn(t,null,n,`beforeMount`),((x=d&&d.onVnodeMounted)||h||l)&&Da(()=>{x&&Q(x,n,t),l&&g.enter(e),h&&Pn(t,null,n,`mounted`)},i)}return e.nextSibling},m=(e,t,r,a,s,c,u)=>{u||=!!t.dynamicChildren;let d=t.children,p=d.length,m=!1;for(let t=0;t<p;t++){let h=u?d[t]:d[t]=Z(d[t]),g=h.type===Aa;e?(g&&!u&&t+1<p&&Z(d[t+1]).type===Aa&&(l(i(e.data.slice(h.children.length)),r,o(e)),e.data=h.children),e=f(e,h,a,s,c,u)):g&&!h.children?l(h.el=i(``),r):(m||(m=!0,xr(r,1)||pr()),n(null,h,r,null,a,s,gr(r),c))}return e},h=(e,t,n,r,i,a)=>{let{slotScopeIds:c}=t;c&&(i=i?i.concat(c):c);let d=s(e),f=m(o(e),t,d,n,r,i,a);return f&&_r(f)&&f.data===`]`?o(t.anchor=f):(pr(),l(t.anchor=u(`]`),d,f),f)},g=(e,t,r,i,a,l)=>{if(Cr(e,t)||pr(),t.el=null,l){let t=_(e);for(;;){let n=o(e);if(n&&n!==t)c(n);else break}}let u=o(e),d=s(e);return c(e),n(null,t,d,u,r,i,gr(d),a),r&&(r.vnode.el=t.el,Vi(r,t.el)),u},_=(e,t=`[`,n=`]`)=>{let r=0;for(;e;)if(e=o(e),e&&_r(e)&&(e.data===t&&r++,e.data===n)){if(r===0)return o(e);r--}return e},v=(e,t,n)=>{let r=t.parentNode;r&&r.replaceChild(e,t);let i=n;for(;i;)i.vnode.el===t&&(i.vnode.el=i.subTree.el=e),i=i.parent},y=e=>e.nodeType===1&&e.tagName===`TEMPLATE`;return[d,f]}var yr=`data-allow-mismatch`,br={0:`text`,1:`children`,2:`class`,3:`style`,4:`attribute`};function xr(e,t){if(t===0||t===1)for(;e&&!e.hasAttribute(yr);)e=e.parentElement;return Sr(e&&e.getAttribute(yr),t)}function Sr(e,t){if(e==null)return!1;if(e===``)return!0;{let n=e.split(`,`);return t===0&&n.includes(`children`)?!0:n.includes(br[t])}}function Cr(e,t){return xr(e.parentElement,1)||wr(e)||Tr(t)}function wr(e){return e.nodeType===1&&Sr(e.getAttribute(yr),1)}function Tr({props:e}){let t=e&&e[yr];return typeof t==`string`&&Sr(t,1)}le().requestIdleCallback,le().cancelIdleCallback;function Er(e,t){if(_r(e)&&e.data===`[`){let n=1,r=e.nextSibling;for(;r;){if(r.nodeType===1){if(t(r)===!1)break}else if(_r(r))if(r.data===`]`){if(--n===0)break}else r.data===`[`&&n++;r=r.nextSibling}}else t(e)}var Dr=e=>!!e.type.__asyncLoader;function Or(e){g(e)&&(e={loader:e});let{loader:t,loadingComponent:n,errorComponent:r,delay:i=200,hydrate:a,timeout:o,suspensible:s=!0,onError:c}=e,l=null,u,d=0,f=()=>(d++,l=null,p()),p=()=>{let e;return l||(e=l=t().catch(e=>{if(e=e instanceof Error?e:Error(String(e)),c)return new Promise((t,n)=>{c(e,()=>t(f()),()=>n(e),d+1)});throw e}).then(t=>e!==l&&l?l:(t&&(t.__esModule||t[Symbol.toStringTag]===`Module`)&&(t=t.default),u=t,t)))};return or({name:`AsyncComponentWrapper`,__asyncLoader:p,__asyncHydrate(e,t,n){let r=e.isConnected,i=!1;(t.bu||=[]).push(()=>i=!0);let o=()=>{i||!e.parentNode||r&&!e.isConnected||n()},s=a?()=>{let n=a(o,t=>Er(e,t));n&&(t.bum||=[]).push(n)}:o;u?s():p().then(()=>!t.isUnmounted&&s())},get __asyncResolved(){return u},setup(){let e=$;if(sr(e),u)return()=>kr(u,e);let t=t=>{l=null,pn(t,e,13,!r)};if(s&&e.suspense||co)return p().then(t=>()=>kr(t,e)).catch(e=>(t(e),()=>r?X(r,{error:e}):null));let a=Gt(!1),c=Gt(),d=Gt(!!i),f,m;return Kr(()=>{f!=null&&clearTimeout(f),m!=null&&clearTimeout(m)}),i&&(m=setTimeout(()=>{e.isUnmounted||(d.value=!1)},i)),o!=null&&(f=setTimeout(()=>{if(!e.isUnmounted&&!a.value&&!c.value){let e=Error(`Async component timed out after ${o}ms.`);t(e),c.value=e}},o)),p().then(()=>{e.isUnmounted||(a.value=!0,e.parent&&Ar(e.parent.vnode)&&e.parent.update())}).catch(n=>{if(e.isUnmounted){l=null;return}t(n),c.value=n}),()=>{if(a.value&&u)return kr(u,e);if(c.value&&r)return X(r,{error:c.value});if(n&&!d.value)return kr(n,e)}}})}function kr(e,t){let{ref:n,props:r,children:i,ce:a}=t.vnode,o=X(e,r,i);return o.ref=n,o.ce=a,delete t.vnode.ce,o}var Ar=e=>e.type.__isKeepAlive,jr={name:`KeepAlive`,__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){let n=no(),r=n.ctx;if(!r.renderer)return()=>{let e=t.default&&t.default();return e&&e.length===1?e[0]:e};let i=new Map,a=new Set,o=null,s=n.suspense,{renderer:{p:c,m:l,um:u,o:{createElement:d}}}=r,f=d(`div`);r.activate=(e,t,n,r,i)=>{let a=e.component;l(e,t,n,0,s),c(a.vnode,e,t,n,a,s,r,e.slotScopeIds,i),G(()=>{a.isDeactivated=!1,a.a&&A(a.a);let t=e.props&&e.props.onVnodeMounted;t&&Q(t,a.parent,e)},s)},r.deactivate=e=>{let t=e.component;ha(t.m),ha(t.a),l(e,f,null,1,s),G(()=>{t.da&&A(t.da);let n=e.props&&e.props.onVnodeUnmounted;n&&Q(n,t.parent,e),t.isDeactivated=!0},s)};function p(e){Lr(e),u(e,n,s,!0)}function m(e){i.forEach((t,n)=>{let r=yo(Dr(t)?t.type.__asyncResolved||{}:t.type);r&&!e(r)&&h(n)})}function h(e){let t=i.get(e);t&&(!o||!Y(t,o))?p(t):o&&Lr(o),i.delete(e),a.delete(e)}Vn(()=>[e.include,e.exclude],([e,t])=>{e&&m(t=>Mr(e,t)),t&&m(e=>!Mr(t,e))},{flush:`post`,deep:!0});let g=null,_=()=>{g!=null&&(_a(n.subTree.type)?G(()=>{i.set(g,Rr(n.subTree))},n.subTree.suspense):i.set(g,Rr(n.subTree)))};return Hr(_),Wr(_),Gr(()=>{i.forEach(e=>{let{subTree:t,suspense:r}=n,i=Rr(t);if(e.type===i.type&&e.key===i.key){Lr(i);let e=i.component.da;e&&G(e,r);return}p(e)})}),()=>{if(g=null,!t.default)return o=null;let n=t.default(),r=n[0];if(n.length>1)return o=null,n;if(!Ba(r)||!(r.shapeFlag&4)&&!(r.shapeFlag&128))return o=null,r;let s=Rr(r);if(s.type===q)return o=null,s;let c=s.type,l=yo(Dr(s)?s.type.__asyncResolved||{}:c),{include:u,exclude:d,max:f}=e;if(u&&(!l||!Mr(u,l))||d&&l&&Mr(d,l))return s.shapeFlag&=-257,o=s,r;let p=s.key==null?c:s.key,m=i.get(p);return s.el&&(s=Ka(s),r.shapeFlag&128&&(r.ssContent=s)),g=p,m?(s.el=m.el,s.component=m.component,s.transition&&ir(s,s.transition),s.shapeFlag|=512,a.delete(p),a.add(p)):(a.add(p),f&&a.size>parseInt(f,10)&&h(a.values().next().value)),s.shapeFlag|=256,o=s,_a(r.type)?r:s}}};function Mr(e,t){return d(e)?e.some(e=>Mr(e,t)):_(e)?e.split(`,`).includes(t):h(e)?(e.lastIndex=0,e.test(t)):!1}function Nr(e,t){Fr(e,`a`,t)}function Pr(e,t){Fr(e,`da`,t)}function Fr(e,t,n=$){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(zr(t,r,n),n){let e=n.parent;for(;e&&e.parent;)Ar(e.parent.vnode)&&Ir(r,t,n,e),e=e.parent}}function Ir(e,t,n,r){let i=zr(t,e,r,!0);Kr(()=>{c(r[t],i)},n)}function Lr(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function Rr(e){return e.shapeFlag&128?e.ssContent:e}function zr(e,t,n=$,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{We();let i=ao(n),a=z(t,n,e,r);return i(),Ge(),a};return r?i.unshift(a):i.push(a),a}}var Br=e=>(t,n=$)=>{(!co||e===`sp`)&&zr(e,(...e)=>t(...e),n)},Vr=Br(`bm`),Hr=Br(`m`),Ur=Br(`bu`),Wr=Br(`u`),Gr=Br(`bum`),Kr=Br(`um`),qr=Br(`sp`),Jr=Br(`rtg`),Yr=Br(`rtc`);function Xr(e,t=$){zr(`ec`,e,t)}var Zr=`components`;function Qr(e,t){return ti(Zr,e,!0,t)||e}var $r=Symbol.for(`v-ndc`);function ei(e){return _(e)?ti(Zr,e,!1)||e:e||$r}function ti(e,t,n=!0,r=!1){let i=V||$;if(i){let n=i.type;if(e===Zr){let e=yo(n,!1);if(e&&(e===t||e===O(t)||e===re(O(t))))return n}let a=ni(i[e]||n[e],t)||ni(i.appContext[e],t);return!a&&r?n:a}}function ni(e,t){return e&&(e[t]||e[O(t)]||e[re(O(t))])}function ri(e,t,n,r){let i,a=n&&n[r],o=d(e);if(o||_(e)){let n=o&&Bt(e),r=!1,s=!1;n&&(r=!F(e),s=Vt(e),e=it(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?Wt(L(e[n])):L(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}else if(y(e))if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}else i=[];return n&&(n[r]=i),i}function ii(e,t,n={},r,i,a){if(V.ce||V.parent&&Dr(V.parent)&&V.parent.ce){let e=a!=null&&n.key==null?s({},n,{key:a}):n,i=Object.keys(e).length>0;return t!=="default"&&(e.name=t),Na(),za(K,null,[X(`slot`,e,r&&r())],i?-2:64)}let o=e[t];o&&o._c&&(o._d=!1);let c=Ma.length;Na();let l;try{let i=o&&ai(o(n)),s=n.key||a||i&&i.key;l=za(K,{key:(s&&!v(s)?s:`_${t}`)+(!i&&r?`_fb`:``)},i||(r?r():[]),i&&e._===1?64:-2)}catch(e){for(let e=Ma.length;e>c;e--)Pa();throw e}finally{o&&o._c&&(o._d=!0)}return!i&&l.scopeId&&(l.slotScopeIds=[l.scopeId+`-s`]),l}function ai(e){return e.some(e=>!Ba(e)||!(e.type===q||e.type===K&&!ai(e.children)))?e:null}var oi=e=>e?so(e)?vo(e):oi(e.parent):null,si=s(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>oi(e.parent),$root:e=>oi(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>gi(e),$forceUpdate:e=>e.f||=()=>{Cn(e.update)},$nextTick:e=>e.n||=xn.bind(e.proxy),$watch:e=>Un.bind(e)}),ci=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),li={get({_:e},n){if(n===`__v_skip`)return!0;let{ctx:r,setupState:i,data:a,props:o,accessCache:s,type:c,appContext:l}=e;if(n[0]!==`$`){let e=s[n];if(e!==void 0)switch(e){case 1:return i[n];case 2:return a[n];case 4:return r[n];case 3:return o[n]}else if(ci(i,n))return s[n]=1,i[n];else if(a!==t&&u(a,n))return s[n]=2,a[n];else if(u(o,n))return s[n]=3,o[n];else if(r!==t&&u(r,n))return s[n]=4,r[n];else di&&(s[n]=0)}let d=si[n],f,p;if(d)return n===`$attrs`&&P(e.attrs,`get`,``),d(e);if((f=c.__cssModules)&&(f=f[n]))return f;if(r!==t&&u(r,n))return s[n]=4,r[n];if(p=l.config.globalProperties,u(p,n))return p[n]},set({_:e},n,r){let{data:i,setupState:a,ctx:o}=e;return ci(a,n)?(a[n]=r,!0):i!==t&&u(i,n)?(i[n]=r,!0):u(e.props,n)||n[0]===`$`&&n.slice(1)in e?!1:(o[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:i,appContext:a,props:o,type:s}},c){let l;return!!(r[c]||e!==t&&c[0]!==`$`&&u(e,c)||ci(n,c)||u(o,c)||u(i,c)||u(si,c)||u(a.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?u(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function ui(e){return d(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var di=!0;function fi(e){let t=gi(e),n=e.proxy,i=e.ctx;di=!1,t.beforeCreate&&mi(t.beforeCreate,e,`bc`);let{data:a,computed:o,methods:s,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:h,updated:_,activated:v,deactivated:b,beforeDestroy:x,beforeUnmount:S,destroyed:C,unmounted:w,render:T,renderTracked:E,renderTriggered:D,errorCaptured:ee,serverPrefetch:O,expose:te,inheritAttrs:ne,components:re,directives:ie,filters:k}=t;if(u&&pi(u,i,null),s)for(let e in s){let t=s[e];g(t)&&(i[e]=t.bind(n))}if(a){let t=a.call(n,n);y(t)&&(e.data=It(t))}if(di=!0,o)for(let e in o){let t=o[e],a=xo({get:g(t)?t.bind(n,n):g(t.get)?t.get.bind(n,n):r,set:!g(t)&&g(t.set)?t.set.bind(n):r});Object.defineProperty(i,e,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(let e in c)hi(c[e],i,n,e);if(l){let e=g(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{Fn(t,e[t])})}f&&mi(f,e,`c`);function A(e,t){d(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(A(Vr,p),A(Hr,m),A(Ur,h),A(Wr,_),A(Nr,v),A(Pr,b),A(Xr,ee),A(Yr,E),A(Jr,D),A(Gr,S),A(Kr,w),A(qr,O),d(te))if(te.length){let t=e.exposed||={};te.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={};T&&e.render===r&&(e.render=T),ne!=null&&(e.inheritAttrs=ne),re&&(e.components=re),ie&&(e.directives=ie),O&&sr(e)}function pi(e,t,n=r){d(e)&&(e=xi(e));for(let n in e){let r=e[n],i;i=y(r)?`default`in r?In(r.from||n,r.default,!0):In(r.from||n):In(r),R(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function mi(e,t,n){z(d(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function hi(e,t,n,r){let i=r.includes(`.`)?Wn(n,r):()=>n[r];if(_(e)){let n=t[e];g(n)&&Vn(i,n)}else if(g(e))Vn(i,e.bind(n));else if(y(e))if(d(e))e.forEach(e=>hi(e,t,n,r));else{let r=g(e.handler)?e.handler.bind(n):t[e.handler];g(r)&&Vn(i,r,e)}}function gi(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>_i(c,e,o,!0)),_i(c,t,o)),y(t)&&a.set(t,c),c}function _i(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&_i(e,a,n,!0),i&&i.forEach(t=>_i(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=vi[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var vi={data:yi,props:Ci,emits:Ci,methods:Si,computed:Si,beforeCreate:W,created:W,beforeMount:W,mounted:W,beforeUpdate:W,updated:W,beforeDestroy:W,beforeUnmount:W,destroyed:W,unmounted:W,activated:W,deactivated:W,errorCaptured:W,serverPrefetch:W,components:Si,directives:Si,watch:wi,provide:yi,inject:bi};function yi(e,t){return t?e?function(){return s(g(e)?e.call(this,this):e,g(t)?t.call(this,this):t)}:t:e}function bi(e,t){return Si(xi(e),xi(t))}function xi(e){if(d(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function W(e,t){return e?[...new Set([].concat(e,t))]:t}function Si(e,t){return e?s(Object.create(null),e,t):t}function Ci(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:s(Object.create(null),ui(e),ui(t??{})):t}function wi(e,t){if(!e)return t;if(!t)return e;let n=s(Object.create(null),e);for(let r in t)n[r]=W(e[r],t[r]);return n}function Ti(){return{app:null,config:{isNativeTag:i,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Ei=0;function Di(e,t){return function(n,r=null){g(n)||(n=s({},n)),r!=null&&!y(r)&&(r=null);let i=Ti(),a=new WeakSet,o=[],c=!1,l=i.app={_uid:Ei++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:Co,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&g(e.install)?(a.add(e),e.install(l,...t)):g(e)&&(a.add(e),e(l,...t))),l},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),l},component(e,t){return t?(i.components[e]=t,l):i.components[e]},directive(e,t){return t?(i.directives[e]=t,l):i.directives[e]},mount(a,o,s){if(!c){let u=l._ceVNode||X(n,r);return u.appContext=i,s===!0?s=`svg`:s===!1&&(s=void 0),o&&t?t(u,a):e(u,a,s),c=!0,l._container=a,a.__vue_app__=l,vo(u.component)}},onUnmount(e){o.push(e)},unmount(){c&&(z(o,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return i.provides[e]=t,l},runWithContext(e){let t=Oi;Oi=l;try{return e()}finally{Oi=t}}};return l}}var Oi=null,ki=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${O(t)}Modifiers`]||e[`${ne(t)}Modifiers`];function Ai(e,n,...r){if(e.isUnmounted)return;let i=e.vnode.props||t,a=r,o=n.startsWith(`update:`),s=o&&ki(i,n.slice(7));s&&(s.trim&&(a=r.map(e=>_(e)?e.trim():e)),s.number&&(a=r.map(oe)));let c,l=i[c=ie(n)]||i[c=ie(O(n))];!l&&o&&(l=i[c=ie(ne(n))]),l&&z(l,e,6,a);let u=i[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,z(u,e,6,a)}}var ji=new WeakMap;function Mi(e,t,n=!1){let r=n?ji:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},c=!1;if(!g(e)){let r=e=>{let n=Mi(e,t,!0);n&&(c=!0,s(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!c?(y(e)&&r.set(e,null),null):(d(a)?a.forEach(e=>o[e]=null):s(o,a),y(e)&&r.set(e,o),o)}function Ni(e,t){return!e||!a(t)?!1:(t=t.slice(2),t=t===`Once`?t:t.replace(/Once$/,``),u(e,t[0].toLowerCase()+t.slice(1))||u(e,ne(t))||u(e,t))}function Pi(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:s,attrs:c,emit:l,render:u,renderCache:d,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=jn(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=Z(u.call(t,e,d,f,m,p,h)),y=c}else{let e=t;v=Z(e.length>1?e(f,{attrs:c,slots:s,emit:l}):e(f,null)),y=t.props?c:Ii(c)}}catch(t){Ma.length=0,pn(t,e,1),v=X(q)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(o)&&(y=Li(y,a)),b=Ka(b,y,!1,!0))}return n.dirs&&(b=Ka(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&ir(b,n.transition),v=b,jn(_),v}function Fi(e,t=!0){let n;for(let t=0;t<e.length;t++){let r=e[t];if(Ba(r)){if(r.type!==q||r.children===`v-if`){if(n)return;n=r}}else return}return n}var Ii=e=>{let t;for(let n in e)(n===`class`||n===`style`||a(n))&&((t||={})[n]=e[n]);return t},Li=(e,t)=>{let n={};for(let r in e)(!o(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Ri(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?zi(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(Bi(o,r,n)&&!Ni(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?!o||zi(r,o,l):!!o;return!1}function zi(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(Bi(t,e,a)&&!Ni(n,a))return!0}return!1}function Bi(e,t,n){let r=e[n],i=t[n];return n===`style`&&y(r)&&y(i)?!xe(r,i):r!==i}function Vi({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var Hi={},Ui=()=>Object.create(Hi),Wi=e=>Object.getPrototypeOf(e)===Hi;function Gi(e,t,n,r=!1){let i={},a=Ui();e.propsDefaults=Object.create(null),qi(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);n?e.props=r?i:Lt(i):e.type.props?e.props=i:e.props=a,e.attrs=a}function Ki(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=I(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(Ni(e.emitsOptions,o))continue;let d=t[o];if(c)if(u(a,o))d!==a[o]&&(a[o]=d,l=!0);else{let t=O(o);i[t]=Ji(c,s,t,d,e,!1)}else d!==a[o]&&(a[o]=d,l=!0)}}}else{qi(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!u(t,a)&&((r=ne(a))===a||!u(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=Ji(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!u(t,e))&&(delete a[e],l=!0)}l&&tt(e.attrs,`set`,``)}function qi(e,n,r,i){let[a,o]=e.propsOptions,s=!1,c;if(n)for(let t in n){if(E(t))continue;let l=n[t],d;a&&u(a,d=O(t))?!o||!o.includes(d)?r[d]=l:(c||={})[d]=l:Ni(e.emitsOptions,t)||(!(t in i)||l!==i[t])&&(i[t]=l,s=!0)}if(o){let n=I(r),i=c||t;for(let t=0;t<o.length;t++){let s=o[t];r[s]=Ji(a,n,s,i[s],e,!u(i,s))}}return s}function Ji(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=u(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&g(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=ao(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===ne(n))&&(r=!0))}return r}var Yi=new WeakMap;function Xi(e,r,i=!1){let a=i?Yi:r.propsCache,o=a.get(e);if(o)return o;let c=e.props,l={},f=[],p=!1;if(!g(e)){let t=e=>{p=!0;let[t,n]=Xi(e,r,!0);s(l,t),n&&f.push(...n)};!i&&r.mixins.length&&r.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!p)return y(e)&&a.set(e,n),n;if(d(c))for(let e=0;e<c.length;e++){let n=O(c[e]);Zi(n)&&(l[n]=t)}else if(c)for(let e in c){let t=O(e);if(Zi(t)){let n=c[e],r=l[t]=d(n)||g(n)?{type:n}:s({},n),i=r.type,a=!1,o=!0;if(d(i))for(let e=0;e<i.length;++e){let t=i[e],n=g(t)&&t.name;if(n===`Boolean`){a=!0;break}else n===`String`&&(o=!1)}else a=g(i)&&i.name===`Boolean`;r[0]=a,r[1]=o,(a||u(r,`default`))&&f.push(t)}}let m=[l,f];return y(e)&&a.set(e,m),m}function Zi(e){return e[0]!==`$`&&!E(e)}var Qi=e=>e===`_`||e===`_ctx`||e===`$stable`,$i=e=>d(e)?e.map(Z):[Z(e)],ea=(e,t,n)=>{if(t._n)return t;let r=Mn((...e)=>$i(t(...e)),n);return r._c=!1,r},ta=(e,t,n)=>{let r=e._ctx;for(let n in e){if(Qi(n))continue;let i=e[n];if(g(i))t[n]=ea(n,i,r);else if(i!=null){let e=$i(i);t[n]=()=>e}}},na=(e,t)=>{let n=$i(t);e.slots.default=()=>n},ra=(e,t,n)=>{for(let r in t)(n||!Qi(r))&&(e[r]=t[r])},ia=(e,t,n)=>{let r=e.slots=Ui();if(e.vnode.shapeFlag&32){let e=t._;e?(ra(r,t,n),n&&ae(r,`_`,e,!0)):ta(t,r)}else t&&na(e,t)},aa=(e,n,r)=>{let{vnode:i,slots:a}=e,o=!0,s=t;if(i.shapeFlag&32){let e=n._;e?r&&e===1?o=!1:ra(a,n,r):(o=!n.$stable,ta(n,a)),s=n}else n&&(na(e,n),s={default:1});if(o)for(let e in a)!Qi(e)&&s[e]==null&&delete a[e]},G=Da;function oa(e){return ca(e)}function sa(e){return ca(e,vr)}function ca(e,i){let a=le();a.__VUE__=!0;let{insert:o,remove:s,patchProp:c,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=r,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,s=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Y(e,t)&&(r=ve(e),pe(e,i,a,!0),e=null),t.patchFlag===-2&&(c=!1,t.dynamicChildren=null);let{type:l,ref:u,shapeFlag:d}=t;switch(l){case Aa:y(e,t,n,r);break;case q:b(e,t,n,r);break;case ja:e??x(t,n,r,o);break;case K:re(e,t,n,r,i,a,o,s,c);break;default:d&1?w(e,t,n,r,i,a,o,s,c):d&6?ie(e,t,n,r,i,a,o,s,c):(d&64||d&128)&&l.process(e,t,n,r,i,a,o,s,c,xe)}u!=null&&i?ur(u,e&&e.ref,a,t||e,!t):u==null&&e&&e.ref!=null&&ur(e.ref,null,a,e,!0)},y=(e,t,n,r)=>{if(e==null)o(t.el=u(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,r)=>{e==null?o(t.el=d(t.children||``),n,r):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=h(e),o(e,n,r),e=i;o(t,n,r)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),s(e),e=n;s(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)T(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),O(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},T=(e,t,n,r,i,a,s,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,a,m&&m.is,m),h&8?p(d,e.children):h&16&&ee(e.children,d,null,r,i,la(e,a),s,u),_&&Pn(e,null,r,`created`),D(d,e,e.scopeId,s,r),m){for(let e in m)e!==`value`&&!E(e)&&c(d,e,null,m[e],a,r);`value`in m&&c(d,`value`,null,m.value,a),(f=m.onVnodeBeforeMount)&&Q(f,r,e)}_&&Pn(e,null,r,`beforeMount`);let v=da(i,g);v&&g.beforeEnter(d),o(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&G(()=>{try{f&&Q(f,r,e),v&&g.enter(d),_&&Pn(e,null,r,`mounted`)}finally{}},i)},D=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||_a(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;D(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},ee=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++){let c=e[l]=s?Xa(e[l]):Z(e[l]);v(null,c,t,n,r,i,a,o,s)}},O=(e,n,r,i,a,o,s)=>{let l=n.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=n;u|=e.patchFlag&16;let m=e.props||t,h=n.props||t,g;if(r&&ua(r,!1),(g=h.onVnodeBeforeUpdate)&&Q(g,r,n,e),f&&Pn(n,e,r,`beforeUpdate`),r&&ua(r,!0),d&&(!e.dynamicChildren||e.dynamicChildren.length!==d.length)&&(u=0,s=!1,d=null),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?te(e.dynamicChildren,d,l,r,i,la(n,a),o):s||ce(e,n,l,null,r,i,la(n,a),o,!1),u>0){if(u&16)ne(l,m,h,r,a);else if(u&2&&m.class!==h.class&&c(l,`class`,null,h.class,a),u&4&&c(l,`style`,m.style,h.style,a),u&8){let e=n.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t],i=m[n],o=h[n];(o!==i||n===`value`)&&c(l,n,i,o,a,r)}}u&1&&e.children!==n.children&&p(l,n.children)}else!s&&d==null&&ne(l,m,h,r,a);((g=h.onVnodeUpdated)||f)&&G(()=>{g&&Q(g,r,n,e),f&&Pn(n,e,r,`updated`)},i)},te=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s],u=c.el&&(c.type===K||!Y(c,l)||c.shapeFlag&198)?m(c.el):n;v(c,l,u,null,r,i,a,o,!0)}},ne=(e,n,r,i,a)=>{if(n!==r){if(n!==t)for(let t in n)!E(t)&&!(t in r)&&c(e,t,n[t],null,a,i);for(let t in r){if(E(t))continue;let o=r[t],s=n[t];o!==s&&t!==`value`&&c(e,t,s,o,a,i)}`value`in r&&c(e,`value`,n.value,r.value,a)}},re=(e,t,n,r,i,a,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(o(d,n,r),o(f,n,r),ee(t.children||[],n,f,i,a,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(te(e.dynamicChildren,m,n,i,a,s,c),(t.key!=null||i&&t===i.subTree)&&fa(e,t,!0)):ce(e,t,n,f,i,a,s,c,l)},ie=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):k(t,n,r,i,a,o,c):ae(e,t,c)},k=(e,t,n,r,i,a,o)=>{let s=e.component=to(e,r,i);if(Ar(e)&&(s.ctx.renderer=xe),lo(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,oe,o),!e.el){let r=s.subTree=X(q);b(null,r,t,n),e.placeholder=r.el}}else oe(s,e,t,n,i,a,o)},ae=(e,t,n)=>{let r=t.component=e.component;if(Ri(e,t,n))if(r.asyncDep&&!r.asyncResolved){se(r,t,n);return}else r.next=t,r.update();else t.el=e.el,r.vnode=t},oe=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=ma(e);if(n){t&&(t.el=c.el,se(e,t,o)),n.asyncDep.then(()=>{G(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;ua(e,!1),t?(t.el=c.el,se(e,t,o)):t=c,n&&A(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&Q(d,s,t,c),ua(e,!0);let f=Pi(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),ve(p),e,i,a),t.el=f.el,u===null&&Vi(e,f.el),r&&G(r,i),(d=t.props&&t.props.onVnodeUpdated)&&G(()=>Q(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=Dr(t);if(ua(e,!1),l&&A(l),!m&&(o=c&&c.onVnodeBeforeMount)&&Q(o,d,t),ua(e,!0),s&&Ce){let t=()=>{e.subTree=Pi(e),Ce(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=Pi(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&G(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;G(()=>Q(o,d,e),i)}(t.shapeFlag&256||d&&Dr(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&G(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new Ae(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>Cn(u),ua(e,!0),l()},se=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,Ki(e,t.props,r,n),aa(e,t.children,n),We(),En(e),Ge()},ce=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){de(l,d,n,r,i,a,o,s,c);return}else if(f&256){ue(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&_e(l,i,a),d!==l&&p(n,d)):u&16?m&16?de(l,d,n,r,i,a,o,s,c):_e(l,i,a,!0):(u&8&&p(n,``),m&16&&ee(d,n,r,i,a,o,s,c))},ue=(e,t,r,i,a,o,s,c,l)=>{e||=n,t||=n;let u=e.length,d=t.length,f=Math.min(u,d),p;for(p=0;p<f;p++){let n=t[p]=l?Xa(t[p]):Z(t[p]);v(e[p],n,r,null,a,o,s,c,l)}u>d?_e(e,a,o,!0,!1,f):ee(t,r,i,a,o,s,c,l,f)},de=(e,t,r,i,a,o,s,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let n=e[u],i=t[u]=l?Xa(t[u]):Z(t[u]);if(Y(n,i))v(n,i,r,null,a,o,s,c,l);else break;u++}for(;u<=f&&u<=p;){let n=e[f],i=t[p]=l?Xa(t[p]):Z(t[p]);if(Y(n,i))v(n,i,r,null,a,o,s,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,n=e<d?t[e].el:i;for(;u<=p;)v(null,t[u]=l?Xa(t[u]):Z(t[u]),r,n,a,o,s,c,l),u++}}else if(u>p)for(;u<=f;)pe(e[u],a,o,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?Xa(t[u]):Z(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let n=e[u];if(y>=b){pe(n,a,o,!0);continue}let i;if(n.key!=null)i=g.get(n.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&Y(n,t[_])){i=_;break}i===void 0?pe(n,a,o,!0):(C[i-h]=u+1,i>=S?S=i:x=!0,v(n,t[i],r,null,a,o,s,c,l),y++)}let w=x?pa(C):n;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,n=t[e],f=t[e+1],p=e+1<d?f.el||ga(f):i;C[u]===0?v(null,n,r,p,a,o,s,c,l):x&&(_<0||u!==w[_]?fe(n,r,p,2):_--)}}},fe=(e,t,n,r,i=null)=>{let{el:a,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){fe(e.component.subTree,t,n,r);return}if(d&128){e.suspense.move(t,n,r);return}if(d&64){c.move(e,t,n,xe);return}if(c===K){o(a,t,n);for(let e=0;e<u.length;e++)fe(u[e],t,n,r);o(e.anchor,t,n);return}if(c===ja){S(e,t,n);return}if(r!==2&&d&1&&l)if(r===0)l.persisted&&!a[H]?o(a,t,n):(l.beforeEnter(a),o(a,t,n),G(()=>l.enter(a),i));else{let{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?s(a):o(a,t,n)},d=()=>{let e=a._isLeaving||!!a[H];a._isLeaving&&a[H](!0),l.persisted&&!e?u():r(a,()=>{u(),c&&c()})};i?i(a,u,d):d()}else o(a,t,n)},pe=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if(d===-2&&(i=!1),s!=null&&(We(),ur(s,null,n,e,!0),Ge()),p!=null&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!Dr(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&Q(_,t,e),u&6)ge(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&Pn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,xe,r):l&&!l.hasOnce&&(a!==K||d>0&&d&64)?_e(l,t,n,!1,!0):(a===K&&d&384||!i&&u&16)&&_e(c,t,n),r&&me(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&G(()=>{_&&Q(_,t,e),h&&Pn(e,null,t,`unmounted`),v&&(e.el=null)},n)},me=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===K){he(n,r);return}if(t===ja){C(e);return}let a=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(e.shapeFlag&1&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,o=()=>t(n,a);r?r(e.el,a,o):o()}else a()},he=(e,t)=>{let n;for(;e!==t;)n=h(e),s(e),e=n;s(t)},ge=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;ha(c),ha(l),r&&A(r),i.stop(),a&&(a.flags|=8,pe(o,e,t,n)),s&&G(s,t),G(()=>{e.isUnmounted=!0},t)},_e=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)pe(e[o],t,n,r,i)},ve=e=>{if(e.shapeFlag&6)return ve(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[Gn];return n?h(n):t},ye=!1,be=(e,t,n)=>{let r;e==null?t._vnode&&(pe(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ye||=(ye=!0,En(r),Dn(),!1)},xe={p:v,um:pe,m:fe,r:me,mt:k,mc:ee,pc:ce,pbc:te,n:ve,o:e},Se,Ce;return i&&([Se,Ce]=i(xe)),{render:be,hydrate:Se,createApp:Di(be,Se)}}function la({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function ua({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function da(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function fa(e,t,n=!1){let r=e.children,i=t.children;if(d(r)&&d(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=Xa(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&fa(t,a)),a.type===Aa&&(a.patchFlag===-1&&(a=i[e]=Xa(a)),a.el=t.el),a.type===q&&!a.el&&(a.el=t.el)}}function pa(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-->0;)n[a]=o,o=t[o];return n}function ma(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:ma(t)}function ha(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function ga(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?ga(t.subTree):null}var _a=e=>e.__isSuspense,va=0,ya={name:`Suspense`,__isSuspense:!0,process(e,t,n,r,i,a,o,s,c,l){if(e==null)xa(t,n,r,i,a,o,s,c,l);else{if(a&&a.deps>0&&!e.suspense.isInFallback){t.suspense=e.suspense,t.suspense.vnode=t,t.el=e.el;return}Sa(e,t,n,r,i,o,s,c,l)}},hydrate:wa,normalize:Ta};function ba(e,t){let n=e.props&&e.props[t];g(n)&&n()}function xa(e,t,n,r,i,a,o,s,c){let{p:l,o:{createElement:u}}=c,d=u(`div`),f=e.suspense=Ca(e,i,r,t,d,n,a,o,s,c);l(null,f.pendingBranch=e.ssContent,d,null,r,f,a,o),f.deps>0?(ba(e,`onPending`),ba(e,`onFallback`),l(null,e.ssFallback,t,n,r,null,a,o),Oa(f,e.ssFallback)):f.resolve(!1,!0)}function Sa(e,t,n,r,i,a,o,s,{p:c,um:l,o:{createElement:u}}){let d=t.suspense=e.suspense;d.vnode=t,t.el=e.el;let f=t.ssContent,p=t.ssFallback,{activeBranch:m,pendingBranch:h,isInFallback:g,isHydrating:_}=d;if(h)d.pendingBranch=f,Y(h,f)?(c(h,f,d.hiddenContainer,null,i,d,a,o,s),d.deps<=0?d.resolve():g&&(_||(c(m,p,n,r,i,null,a,o,s),Oa(d,p)))):(d.pendingId=va++,_?(d.isHydrating=!1,d.activeBranch=h):l(h,i,d),d.deps=0,d.effects.length=0,d.hiddenContainer=u(`div`),g?(c(null,f,d.hiddenContainer,null,i,d,a,o,s),d.deps<=0?d.resolve():(c(m,p,n,r,i,null,a,o,s),Oa(d,p))):m&&Y(m,f)?(c(m,f,n,r,i,d,a,o,s),d.resolve(!0)):(c(null,f,d.hiddenContainer,null,i,d,a,o,s),d.deps<=0&&d.resolve()));else if(m&&Y(m,f))c(m,f,n,r,i,d,a,o,s),Oa(d,f);else if(ba(t,`onPending`),d.pendingBranch=f,f.shapeFlag&512?d.pendingId=f.component.suspenseId:d.pendingId=va++,c(null,f,d.hiddenContainer,null,i,d,a,o,s),d.deps<=0)d.resolve();else{let{timeout:e,pendingId:t}=d;e>0?setTimeout(()=>{d.pendingId===t&&d.fallback(p)},e):e===0&&d.fallback(p)}}function Ca(e,t,n,r,i,a,o,s,c,l,u=!1){let{p:d,m:f,um:p,n:m,o:{parentNode:h,remove:g}}=l,_,v=ka(e);v&&t&&t.pendingBranch&&(_=t.pendingId,t.deps++);let y=e.props?se(e.props.timeout):void 0,b=a,x={vnode:e,parent:t,parentComponent:n,namespace:o,container:r,hiddenContainer:i,deps:0,pendingId:va++,timeout:typeof y==`number`?y:-1,activeBranch:null,isFallbackMountPending:!1,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1,n=!1){let{vnode:r,activeBranch:i,pendingBranch:o,pendingId:s,effects:c,parentComponent:l,container:u,isInFallback:d}=x,g=!1;if(x.isHydrating)x.isHydrating=!1;else if(!e){g=i&&o.transition&&o.transition.mode===`out-in`;let e=!1;g&&(i.transition.afterLeave=()=>{s===x.pendingId&&(f(o,u,a===b&&!e?m(i):a,0),Tn(c),d&&r.ssFallback&&(r.ssFallback.el=null))}),i&&!x.isFallbackMountPending&&(h(i.el)===u&&(a=m(i),e=!0),p(i,l,x,!0),!g&&d&&r.ssFallback&&G(()=>r.ssFallback.el=null,x)),g||f(o,u,a,0)}x.isFallbackMountPending=!1,Oa(x,o),x.pendingBranch=null,x.isInFallback=!1;let y=x.parent,S=!1;for(;y;){if(y.pendingBranch){y.effects.push(...c),S=!0;break}y=y.parent}!S&&!g&&Tn(c),x.effects=[],v&&t&&t.pendingBranch&&_===t.pendingId&&(t.deps--,t.deps===0&&!n&&t.resolve()),ba(r,`onResolve`)},fallback(e){if(!x.pendingBranch)return;let{vnode:t,activeBranch:n,parentComponent:r,container:i,namespace:a}=x;ba(t,`onFallback`);let o=m(n),l=()=>{x.isFallbackMountPending=!1,x.isInFallback&&(d(null,e,i,o,r,null,a,s,c),Oa(x,e))},u=e.transition&&e.transition.mode===`out-in`;u&&(x.isFallbackMountPending=!0,n.transition.afterLeave=l),x.isInFallback=!0,p(n,r,null,!0),u||l()},move(e,t,n){x.activeBranch&&f(x.activeBranch,e,t,n),x.container=e},next(){return x.activeBranch&&m(x.activeBranch)},registerDep(e,t,n){let r=!!x.pendingBranch;r&&x.deps++;let i=e.vnode.el;e.asyncDep.catch(t=>{pn(t,e,0)}).then(a=>{if(e.isUnmounted||x.isUnmounted||x.pendingId!==e.suspenseId)return;oo(),e.asyncResolved=!0;let{vnode:s}=e;fo(e,a,!1),i&&(s.el=i);let c=!i&&e.subTree.el;t(e,s,h(i||e.subTree.el),i?null:m(e.subTree),x,o,n),c&&(s.placeholder=null,g(c)),Vi(e,s.el),r&&--x.deps===0&&x.resolve()})},unmount(e,t){x.isUnmounted=!0,x.activeBranch&&p(x.activeBranch,n,e,t),x.pendingBranch&&p(x.pendingBranch,n,e,t)}};return x}function wa(e,t,n,r,i,a,o,s,c){let l=t.suspense=Ca(t,r,n,e.parentNode,document.createElement(`div`),null,i,a,o,s,!0),u=c(e,l.pendingBranch=t.ssContent,n,l,a,o);return l.deps===0&&l.resolve(!1,!0),u}function Ta(e){let{shapeFlag:t,children:n}=e,r=t&32;e.ssContent=Ea(r?n.default:n),e.ssFallback=r?Ea(n.fallback):X(q)}function Ea(e){let t;if(g(e)){let n=Fa&&e._c;n&&(e._d=!1,Na()),e=e(),n&&(e._d=!0,t=J,Pa())}return d(e)&&(e=Fi(e)),e=Z(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(t=>t!==e)),e}function Da(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):Tn(e)}function Oa(e,t){e.activeBranch=t;let{vnode:n,parentComponent:r}=e,i=t.el;for(;!i&&t.component;)t=t.component.subTree,i=t.el;n.el=i,r&&r.subTree===n&&(r.vnode.el=i,Vi(r,i))}function ka(e){let t=e.props&&e.props.suspensible;return t!=null&&t!==!1}var K=Symbol.for(`v-fgt`),Aa=Symbol.for(`v-txt`),q=Symbol.for(`v-cmt`),ja=Symbol.for(`v-stc`),Ma=[],J=null;function Na(e=!1){Ma.push(J=e?null:[])}function Pa(){Ma.pop(),J=Ma[Ma.length-1]||null}var Fa=1;function Ia(e,t=!1){Fa+=e,e<0&&J&&t&&(J.hasOnce=!0)}function La(e){return e.dynamicChildren=Fa>0?J||n:null,Pa(),Fa>0&&J&&J.push(e),e}function Ra(e,t,n,r,i,a){return La(Ua(e,t,n,r,i,a,!0))}function za(e,t,n,r,i){return La(X(e,t,n,r,i,!0))}function Ba(e){return e?e.__v_isVNode===!0:!1}function Y(e,t){return e.type===t.type&&e.key===t.key}var Va=({key:e})=>e??null,Ha=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:_(e)||R(e)||g(e)?{i:V,r:e,k:t,f:!!n}:e);function Ua(e,t=null,n=null,r=0,i=null,a=e===K?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Va(t),ref:t&&Ha(t),scopeId:An,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:V};return s?(Za(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=_(n)?8:16),Fa>0&&!o&&J&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&J.push(c),c}var X=Wa;function Wa(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===$r)&&(e=q),Ba(e)){let r=Ka(e,t,!0);return n&&Za(r,n),Fa>0&&!a&&J&&(r.shapeFlag&6?J[J.indexOf(e)]=r:J.push(r)),r.patchFlag=-2,r}if(bo(e)&&(e=e.__vccOpts),t){t=Ga(t);let{class:e,style:n}=t;e&&!_(e)&&(t.class=he(e)),y(n)&&(Ht(n)&&!d(n)&&(n=s({},n)),t.style=ue(n))}let o=_(e)?1:_a(e)?128:Kn(e)?64:y(e)?4:g(e)?2:0;return Ua(e,t,n,r,i,o,a,!0)}function Ga(e){return e?Ht(e)||Wi(e)?s({},e):e:null}function Ka(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?Qa(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Va(l),ref:t&&t.ref?n&&a?d(a)?a.concat(Ha(t)):[a,Ha(t)]:Ha(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==K?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Ka(e.ssContent),ssFallback:e.ssFallback&&Ka(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&ir(u,c.clone(u)),u}function qa(e=` `,t=0){return X(Aa,null,e,t)}function Ja(e,t){let n=X(ja,null,e);return n.staticCount=t,n}function Ya(e=``,t=!1){return t?(Na(),za(q,null,e)):X(q,null,e)}function Z(e){return e==null||typeof e==`boolean`?X(q):d(e)?X(K,null,e.slice()):Ba(e)?Xa(e):X(Aa,null,String(e))}function Xa(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Ka(e)}function Za(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(d(t))n=16;else if(typeof t==`object`)if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),Za(e,n()),n._c&&(n._d=!0));return}else{n=32;let r=t._;!r&&!Wi(t)?t._ctx=V:r===3&&V&&(V.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else if(g(t)){if(r&65){Za(e,{default:t});return}t={default:t,_ctx:V},n=32}else t=String(t),r&64?(n=16,t=[qa(t)]):n=8;e.children=t,e.shapeFlag|=n}function Qa(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=he([t.class,r.class]));else if(e===`style`)t.style=ue([t.style,r.style]);else if(a(e)){let n=t[e],i=r[e];i&&n!==i&&!(d(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!o(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function Q(e,t,n,r=null){z(e,t,7,[n,r])}var $a=Ti(),eo=0;function to(e,n,r){let i=e.type,a=(n?n.appContext:e.appContext)||$a,o={uid:eo++,vnode:e,type:i,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Ee(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Xi(i,a),emitsOptions:Mi(i,a),emit:null,emitted:null,propsDefaults:t,inheritAttrs:i.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=Ai.bind(null,o),e.ce&&e.ce(o),o}var $=null,no=()=>$||V,ro,io;{let e=le(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};ro=t(`__VUE_INSTANCE_SETTERS__`,e=>$=e),io=t(`__VUE_SSR_SETTERS__`,e=>co=e)}var ao=e=>{let t=$;return ro(e),e.scope.on(),()=>{e.scope.off(),ro(t)}},oo=()=>{$&&$.scope.off(),ro(null)};function so(e){return e.vnode.shapeFlag&4}var co=!1;function lo(e,t=!1,n=!1){t&&io(t);let{props:r,children:i}=e.vnode,a=so(e);Gi(e,r,a,t),ia(e,i,n||t);let o=a?uo(e,t):void 0;return t&&io(!1),o}function uo(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,li);let{setup:r}=n;if(r){We();let n=e.setupContext=r.length>1?_o(e):null,i=ao(e),a=fn(r,e,0,[e.props,n]),o=b(a);if(Ge(),i(),(o||e.sp)&&!Dr(e)&&sr(e),o){if(a.then(oo,oo),t)return a.then(n=>{fo(e,n,t)}).catch(t=>{pn(t,e,0)});e.asyncDep=a}else fo(e,a,t)}else ho(e,t)}function fo(e,t,n){g(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:y(t)&&(e.setupState=Qt(t)),ho(e,n)}var po,mo;function ho(e,t,n){let i=e.type;if(!e.render){if(!t&&po&&!i.render){let t=i.template||gi(e).template;if(t){let{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:a,compilerOptions:o}=i;i.render=po(t,s(s({isCustomElement:n,delimiters:a},r),o))}}e.render=i.render||r,mo&&mo(e)}{let t=ao(e);We();try{fi(e)}finally{Ge(),t()}}}var go={get(e,t){return P(e,`get`,``),e[t]}};function _o(e){return{attrs:new Proxy(e.attrs,go),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function vo(e){return e.exposed?e.exposeProxy||=new Proxy(Qt(Ut(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in si)return si[n](e)},has(e,t){return t in e||t in si}}):e.proxy}function yo(e,t=!0){return g(e)?e.displayName||e.name:e.name||t&&e.__name}function bo(e){return g(e)&&`__vccOpts`in e}var xo=(e,t)=>an(e,t,co);function So(e,t,n){try{Ia(-1);let r=arguments.length;return r===2?y(t)&&!d(t)?Ba(t)?X(e,null,[t]):X(e,t):X(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Ba(n)&&(n=[n]),X(e,t,n))}finally{Ia(1)}}var Co=`3.5.40`;export{O as $,Xr as A,Mn as B,In as C,Nr as D,xn as E,ii as F,R as G,De as H,Qr as I,Lt as J,It as K,ei as L,Na as M,Fn as N,Gr as O,ri as P,Yt as Q,Vn as R,Ln as S,Qa as T,Oe as U,Nn as V,Vt as W,tn as X,Kt as Y,Xt as Z,Or as _,Ce as _t,ya as a,d as at,Ga as b,Ua as c,y as ct,Ra as d,_ as dt,re as et,sa as f,v as ft,X as g,ue as gt,qa as h,ge as ht,jr as i,A as it,Hr as j,Pr as k,za as l,a as lt,Ja as m,he as mt,Yn as n,ne as nt,z as o,g as ot,oa as p,oe as pt,Gt as q,K as r,ye as rt,xo as s,o as st,$n as t,s as tt,Ya as u,ve as ut,or as v,se as vt,Ba as w,So as x,no as y,Bn as z};
```

# .output/public/_nuxt/CBklhXOc.js

```js
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Bp_tvWCv.js","./BWlekpQc.js","./CNs_Ozdc.js","./BGVrjGLA.js","./BEGRh-5H.js","./B0M4vlZc.js","./oAaAuq3K.js","./ttQ_F7QN.js","./BIjnivpp.js","./error-404.DjFB7pgG.css","./CQiHN3Or.js","./error-500.BG9pmads.css"])))=>i.map(i=>d[i]);
import{_ as e,a as t,c as n,d as r,f as i,g as a,h as o,i as s,m as c,n as l,o as u,p as d,r as f,t as p,u as m}from"./ttQ_F7QN.js";import{$ as h,A as g,B as _,C as v,D as y,E as b,G as x,J as S,K as C,L as w,M as T,N as E,O as D,Q as O,R as ee,S as te,T as ne,U as re,W as ie,X as ae,Y as oe,Z as se,_ as k,a as ce,at as le,b as ue,ct as de,d as fe,dt as A,et as pe,f as me,ft as j,g as he,ht as ge,i as _e,it as ve,k as ye,l as M,lt as be,n as xe,nt as Se,o as Ce,ot as we,p as Te,pt as Ee,q as De,r as Oe,rt as ke,s as N,st as Ae,t as je,tt as Me,u as Ne,ut as Pe,v as P,vt as Fe,w as Ie,x as F,y as Le,z as Re}from"./BWlekpQc.js";import{a as ze,c as Be,d as Ve,i as He,l as Ue,n as We,o as Ge,p as Ke,r as qe,s as Je,t as Ye,u as Xe}from"./BIjnivpp.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var Ze=void 0,Qe=typeof window<`u`&&window.trustedTypes;if(Qe)try{Ze=Qe.createPolicy(`vue`,{createHTML:e=>e})}catch{}var $e=Ze?e=>Ze.createHTML(e):e=>e,et=`http://www.w3.org/2000/svg`,tt=`http://www.w3.org/1998/Math/MathML`,I=typeof document<`u`?document:null,nt=I&&I.createElement(`template`),rt={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?I.createElementNS(et,e):t===`mathml`?I.createElementNS(tt,e):n?I.createElement(e,{is:n}):I.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>I.createTextNode(e),createComment:e=>I.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>I.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===a||!(i=i.nextSibling)););else{nt.innerHTML=$e(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=nt.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},L=`transition`,it=`animation`,at=Symbol(`_vtc`),ot={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},st=Me({},xe,ot),ct=(e=>(e.displayName=`Transition`,e.props=st,e))((e,{slots:t})=>F(je,ut(e),t)),R=(e,t=[])=>{le(e)?e.forEach(e=>e(...t)):e&&e(...t)},lt=e=>e?le(e)?e.some(e=>e.length>1):e.length>1:!1;function ut(e){let t={};for(let n in e)n in ot||(t[n]=e[n]);if(e.css===!1)return t;let{name:n=`v`,type:r,duration:i,enterFromClass:a=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:s=`${n}-enter-to`,appearFromClass:c=a,appearActiveClass:l=o,appearToClass:u=s,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:p=`${n}-leave-to`}=e,m=dt(i),h=m&&m[0],g=m&&m[1],{onBeforeEnter:_,onEnter:v,onEnterCancelled:y,onLeave:b,onLeaveCancelled:x,onBeforeAppear:S=_,onAppear:C=v,onAppearCancelled:w=y}=t,T=(e,t,n,r)=>{e._enterCancelled=r,B(e,t?u:s),B(e,t?l:o),n&&n()},E=(e,t)=>{e._isLeaving=!1,B(e,d),B(e,p),B(e,f),t&&t()},D=e=>(t,n)=>{let i=e?C:v,o=()=>T(t,e,n);R(i,[t,o]),pt(()=>{B(t,e?c:a),z(t,e?u:s),lt(i)||ht(t,r,h,o)})};return Me(t,{onBeforeEnter(e){R(_,[e]),z(e,a),z(e,o)},onBeforeAppear(e){R(S,[e]),z(e,c),z(e,l)},onEnter:D(!1),onAppear:D(!0),onLeave(e,t){e._isLeaving=!0;let n=()=>E(e,t);z(e,d),e._enterCancelled?(z(e,f),yt(e)):(yt(e),z(e,f)),pt(()=>{e._isLeaving&&(B(e,d),z(e,p),lt(b)||ht(e,r,g,n))}),R(b,[e,n])},onEnterCancelled(e){T(e,!1,void 0,!0),R(y,[e])},onAppearCancelled(e){T(e,!0,void 0,!0),R(w,[e])},onLeaveCancelled(e){E(e),R(x,[e])}})}function dt(e){if(e==null)return null;if(de(e))return[ft(e.enter),ft(e.leave)];{let t=ft(e);return[t,t]}}function ft(e){return Fe(e)}function z(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[at]||(e[at]=new Set)).add(t)}function B(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));let n=e[at];n&&(n.delete(t),n.size||(e[at]=void 0))}function pt(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var mt=0;function ht(e,t,n,r){let i=e._endId=++mt,a=()=>{i===e._endId&&r()};if(n!=null)return setTimeout(a,n);let{type:o,timeout:s,propCount:c}=gt(e,t);if(!o)return r();let l=o+`end`,u=0,d=()=>{e.removeEventListener(l,f),a()},f=t=>{t.target===e&&++u>=c&&d()};setTimeout(()=>{u<c&&d()},s+1),e.addEventListener(l,f)}function gt(e,t){let n=window.getComputedStyle(e),r=e=>(n[e]||``).split(`, `),i=r(`${L}Delay`),a=r(`${L}Duration`),o=_t(i,a),s=r(`${it}Delay`),c=r(`${it}Duration`),l=_t(s,c),u=null,d=0,f=0;t===L?o>0&&(u=L,d=o,f=a.length):t===it?l>0&&(u=it,d=l,f=c.length):(d=Math.max(o,l),u=d>0?o>l?L:it:null,f=u?u===L?a.length:c.length:0);let p=u===L&&/\b(?:transform|all)(?:,|$)/.test(r(`${L}Property`).toString());return{type:u,timeout:d,propCount:f,hasTransform:p}}function _t(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((t,n)=>vt(t)+vt(e[n])))}function vt(e){return e===`auto`?0:Number(e.slice(0,-1).replace(`,`,`.`))*1e3}function yt(e){return(e?e.ownerDocument:document).body.offsetHeight}function bt(e,t,n){let r=e[at];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var xt=Symbol(`_vod`),St=Symbol(`_vsh`),Ct=Symbol(``),wt=/(?:^|;)\s*display\s*:/;function Tt(e,t,n){let r=e.style,i=A(n),a=!1;if(n&&!i){if(t)if(A(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??Dt(r,t,``)}else for(let e in t)n[e]??Dt(r,e,``);for(let i in n){i===`display`&&(a=!0);let o=n[i];o==null?Dt(r,i,``):jt(e,i,!A(t)&&t?t[i]:void 0,o)||Dt(r,i,o)}}else if(i){if(t!==n){let e=r[Ct];e&&(n+=`;`+e),r.cssText=n,a=wt.test(n)}}else t&&e.removeAttribute(`style`);xt in e&&(e[xt]=a?r.display:``,e[St]&&(r.display=`none`))}var Et=/\s*!important$/;function Dt(e,t,n){if(le(n))n.forEach(n=>Dt(e,t,n));else if(n??=``,t.startsWith(`--`))e.setProperty(t,n);else{let r=At(e,t);Et.test(n)?e.setProperty(Se(r),n.replace(Et,``),`important`):e[r]=n}}var Ot=[`Webkit`,`Moz`,`ms`],kt={};function At(e,t){let n=kt[t];if(n)return n;let r=h(t);if(r!==`filter`&&r in e)return kt[t]=r;r=pe(r);for(let n=0;n<Ot.length;n++){let i=Ot[n]+r;if(i in e)return kt[t]=i}return t}function jt(e,t,n,r){return e.tagName===`TEXTAREA`&&(t===`width`||t===`height`)&&A(r)&&n===r}var Mt=`http://www.w3.org/1999/xlink`;function Nt(e,t,n,r,i,a=Pe(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(Mt,t.slice(6,t.length)):e.setAttributeNS(Mt,t,n):n==null||a&&!ke(n)?e.removeAttribute(t):e.setAttribute(t,a?``:j(n)?String(n):n)}function Pt(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?$e(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=ke(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function V(e,t,n,r){e.addEventListener(t,n,r)}function Ft(e,t,n,r){e.removeEventListener(t,n,r)}var It=Symbol(`_vei`);function Lt(e,t,n,r,i=null){let a=e[It]||(e[It]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=Bt(t);r?V(e,n,a[t]=Wt(r,i),s):o&&(Ft(e,n,o,s),a[t]=void 0)}}var Rt=/(Once|Passive|Capture)$/,zt=/^on:?(?:Once|Passive|Capture)$/;function Bt(e){let t,n;for(;(n=e.match(Rt))&&!zt.test(e);)t||={},e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===`:`?e.slice(3):Se(e.slice(2)),t]}var Vt=0,Ht=Promise.resolve(),Ut=()=>Vt||=(Ht.then(()=>Vt=0),Date.now());function Wt(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;let r=n.value;if(le(r)){let n=e.stopImmediatePropagation;e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0};let i=r.slice(),a=[e];for(let n=0;n<i.length&&!e._stopped;n++){let e=i[n];e&&Ce(e,t,5,a)}}else Ce(r,t,5,[e])};return n.value=e,n.attached=Ut(),n}var Gt=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Kt=(e,t,n,r,i,a)=>{let o=i===`svg`;t===`class`?bt(e,r,o):t===`style`?Tt(e,n,r):be(t)?Ae(t)||Lt(e,t,n,r,a):(t[0]===`.`?(t=t.slice(1),!0):t[0]===`^`?(t=t.slice(1),!1):qt(e,t,r,o))?(Pt(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&Nt(e,t,r,o,a,t!==`value`)):e._isVueCE&&(Jt(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!A(r)))?Pt(e,h(t),r,a,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),Nt(e,t,r,o))};function qt(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&Gt(t)&&we(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return Gt(t)&&A(n)?!1:t in e}function Jt(e,t){let n=e._def.props;if(!n)return!1;let r=h(t);return Array.isArray(n)?n.some(e=>h(e)===r):Object.keys(n).some(e=>h(e)===r)}var Yt=e=>{let t=e.props[`onUpdate:modelValue`]||!1;return le(t)?e=>ve(t,e):t};function Xt(e){e.target.composing=!0}function Zt(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event(`input`)))}var Qt=Symbol(`_assign`);function $t(e,t,n){return t&&(e=e.trim()),n&&(e=Ee(e)),e}var en={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e[Qt]=Yt(i);let a=r||i.props&&i.props.type===`number`;V(e,t?`change`:`input`,t=>{t.target.composing||e[Qt]($t(e.value,n,a))}),(n||a)&&V(e,`change`,()=>{e.value=$t(e.value,n,a)}),t||(V(e,`compositionstart`,Xt),V(e,`compositionend`,Zt),V(e,`change`,Zt))},mounted(e,{value:t}){e.value=t??``},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:a}},o){if(e[Qt]=Yt(o),e.composing)return;let s=(a||e.type===`number`)&&!/^0\d/.test(e.value)?Ee(e.value):e.value,c=t??``;if(s===c)return;let l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!==`range`&&(r&&t===n||i&&e.value.trim()===c)||(e.value=c)}},tn=[`ctrl`,`shift`,`alt`,`meta`],nn={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>`button`in e&&e.button!==0,middle:e=>`button`in e&&e.button!==1,right:e=>`button`in e&&e.button!==2,exact:(e,t)=>tn.some(n=>e[`${n}Key`]&&!t.includes(n))},rn=(e,t)=>{if(!e)return e;let n=e._withMods||={},r=t.join(`.`);return n[r]||(n[r]=((n,...r)=>{for(let e=0;e<t.length;e++){let r=nn[t[e]];if(r&&r(n,t))return}return e(n,...r)}))},an=Me({patchProp:Kt},rt),on,sn=!1;function cn(){return on||=Te(an)}function ln(){return on=sn?on:me(an),sn=!0,on}var un=((...e)=>{let t=cn().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=pn(e);if(!r)return;let i=t._component;!we(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,fn(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t}),dn=((...e)=>{let t=ln().createApp(...e),{mount:n}=t;return t.mount=e=>{let t=pn(e);if(t)return n(t,!0,fn(t))},t});function fn(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function pn(e){return A(e)?document.querySelector(e):e}var mn=/bot\b|chrome-lighthouse|facebookexternalhit|google\b/i;function hn(e){return mn.test(e)}import.meta.url.replace(/\/app\/.*$/,`/`);var gn=Symbol(`layout-meta`),_n=Symbol(`layout`),H=Symbol(`route`),vn=e({docsBase:o,reporters:a});function yn(e){if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return t!==null&&t!==Object.prototype&&Object.getPrototypeOf(t)!==null||Symbol.iterator in e?!1:Symbol.toStringTag in e?Object.prototype.toString.call(e)===`[object Module]`:!0}function bn(e,t,n=`.`,r){if(!yn(t))return bn(e,{},n,r);let i={...t};for(let t of Object.keys(e)){if(t===`__proto__`||t===`constructor`)continue;let a=e[t];a!=null&&(r&&r(i,t,a,n)||(Array.isArray(a)&&Array.isArray(i[t])?i[t]=[...a,...i[t]]:yn(a)&&yn(i[t])?i[t]=bn(a,i[t],(n?`${n}.`:``)+t.toString(),r):i[t]=a))}return i}function xn(e){return(...t)=>t.reduce((t,n)=>bn(t,n,``,e),{})}var Sn=xn(),Cn=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,wn=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,Tn=/^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;function En(e,t){if(e===`__proto__`||e===`constructor`&&t&&typeof t==`object`&&`prototype`in t){Dn(e);return}return t}function Dn(e){console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`)}function On(e,t={}){if(typeof e!=`string`)return e;if(e[0]===`"`&&e[e.length-1]===`"`&&e.indexOf(`\\`)===-1)return e.slice(1,-1);let n=e.trim();if(n.length<=9)switch(n.toLowerCase()){case`true`:return!0;case`false`:return!1;case`undefined`:return;case`null`:return null;case`nan`:return NaN;case`infinity`:return 1/0;case`-infinity`:return-1/0}if(!Tn.test(e)){if(t.strict)throw SyntaxError(`[destr] Invalid JSON`);return e}try{if(Cn.test(e)||wn.test(e)){if(t.strict)throw Error(`[destr] Possible prototype pollution`);return JSON.parse(e,En)}return JSON.parse(e)}catch(n){if(t.strict)throw n;return e}}function kn(e,t){try{return t in e}catch{return!1}}var An=class extends Error{static __h3_error__=!0;statusCode=500;fatal=!1;unhandled=!1;statusMessage;data;cause;constructor(e,t={}){super(e,t),t.cause&&!this.cause&&(this.cause=t.cause)}toJSON(){let e={message:this.message,statusCode:Fn(this.statusCode,500)};return this.statusMessage&&(e.statusMessage=Pn(this.statusMessage)),this.data!==void 0&&(e.data=this.data),e}};function jn(e){if(typeof e==`string`)return new An(e);if(Mn(e))return e;let t=new An(e.message??e.statusMessage??``,{cause:e.cause||e});if(kn(e,`stack`))try{Object.defineProperty(t,"stack",{get(){return e.stack}})}catch{try{t.stack=e.stack}catch{}}if(e.data&&(t.data=e.data),e.statusCode?t.statusCode=Fn(e.statusCode,t.statusCode):e.status&&(t.statusCode=Fn(e.status,t.statusCode)),e.statusMessage?t.statusMessage=e.statusMessage:e.statusText&&(t.statusMessage=e.statusText),t.statusMessage){let e=t.statusMessage;Pn(t.statusMessage)!==e&&console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.")}return e.fatal!==void 0&&(t.fatal=e.fatal),e.unhandled!==void 0&&(t.unhandled=e.unhandled),t}function Mn(e){return e?.constructor?.__h3_error__===!0}var Nn=/[^\u0009\u0020-\u007E]/g;function Pn(e=``){return e.replace(Nn,``)}function Fn(e,t=200){return!e||(typeof e==`string`&&(e=Number.parseInt(e,10)),e<100||e>999)?t:e}globalThis.Headers,globalThis.Response;var U=()=>s()?.$router,In=(()=>te()?v(H,s()._route):s()._route);function Ln(e){return e}var Rn=()=>{try{if(s()._processingMiddleware)return!0}catch{return!1}return!1},zn=(e,t)=>{e||=`/`;let n=typeof e==`string`?e:`path`in e?Bn(e):U().resolve(e).href;if(t?.open){let{protocol:e}=new URL(n,window.location.href);if(e&&ze(e))throw vn.NUXT_E2002({toPath:n,protocol:e});let{target:r=`_blank`,windowFeatures:i={}}=t.open,a=[];for(let[e,t]of Object.entries(i))t!==void 0&&a.push(`${e.toLowerCase()}=${t}`);return open(n,r,a.join(`, `)),Promise.resolve()}let r=qe(n,{acceptRelative:!0}),i=t?.external||r;if(i){if(!t?.external)throw vn.NUXT_E2001({toPath:n});let{protocol:e}=new URL(n,window.location.href);if(e&&ze(e))throw vn.NUXT_E2002({toPath:n,protocol:e})}let a=Rn();if(!i&&a){if(t?.replace){if(typeof e==`string`){let{pathname:t,search:n,hash:r}=Ue(e);return{path:t,...n&&{query:Be(n)},...r&&{hash:r},replace:!0}}return{...e,replace:!0}}return e}let o=U(),c=s();if(i)return c._scope.stop(),t?.replace?location.replace(n):location.href=n,a?c.isHydrating?new Promise(()=>{}):!1:Promise.resolve();let l=typeof e==`string`?Vn(e):e;return t?.replace?o.replace(l):o.push(l)};function Bn(e){return Ve(e.path||``,e.query||{})+(e.hash||``)}function Vn(e){let t=Ue(e);return We(Ye(t.pathname))+t.search+t.hash}var Hn=`__nuxt_error`,Un=()=>ae(s().payload,`error`),Wn=e=>{let t=W(e);try{let e=Un();s().hooks.callHook(`app:error`,t),e.value||=t}catch{throw t}return t},Gn=(e,t)=>{let n=e.callHook(`app:error`,W(t));return c.NUXT_E1012({userAgent:navigator.userAgent,cause:t}),n},Kn=async(e,t)=>{if(hn(navigator.userAgent)){await Gn(e,t);return}await e.runWithContext(()=>Wn(t))},qn=async(e={})=>{let t=s(),n=Un();t.callHook(`app:error:cleared`,e),e.redirect&&await U().replace(e.redirect),n.value=void 0},Jn=e=>!!e&&typeof e==`object`&&`__nuxt_error`in e,W=e=>{typeof e!=`string`&&e.statusText&&(e.message??=e.statusText);let t=jn(e);return Object.defineProperty(t,Hn,{value:!0,configurable:!1,writable:!1}),Object.defineProperty(t,"status",{get:()=>t.statusCode,configurable:!0}),Object.defineProperty(t,"statusText",{get:()=>t.statusMessage,configurable:!0}),t},Yn=class extends Error{constructor(e,t){super(e,t),this.name=`FetchError`,t?.cause&&!this.cause&&(this.cause=t.cause)}};function Xn(e){let t=e.error?.message||e.error?.toString()||``,n=e.request?.method||e.options?.method||`GET`,r=e.request?.url||String(e.request)||`/`,i=new Yn(`${`[${n}] ${JSON.stringify(r)}`}: ${e.response?`${e.response.status} ${e.response.statusText}`:`<no response>`}${t?` ${t}`:``}`,e.error?{cause:e.error}:void 0);for(let t of[`request`,`options`,`response`])Object.defineProperty(i,t,{get(){return e[t]}});for(let[t,n]of[[`data`,`_data`],[`status`,`status`],[`statusCode`,`status`],[`statusText`,`statusText`],[`statusMessage`,`statusText`]])Object.defineProperty(i,t,{get(){return e.response&&e.response[n]}});return i}var Zn=new Set(Object.freeze([`PATCH`,`POST`,`PUT`,`DELETE`]));function Qn(e=`GET`){return Zn.has(e.toUpperCase())}function $n(e){if(e===void 0)return!1;let t=typeof e;return t===`string`||t===`number`||t===`boolean`||t===null?!0:t===`object`?Array.isArray(e)?!0:e.buffer||e instanceof FormData||e instanceof URLSearchParams?!1:e.constructor&&e.constructor.name===`Object`||typeof e.toJSON==`function`:!1}var er=new Set([`image/svg`,`application/xml`,`application/xhtml`,`application/html`]),tr=/^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;function nr(e=``){if(!e)return`json`;let t=e.split(`;`).shift()||``;return tr.test(t)?`json`:t===`text/event-stream`?`stream`:er.has(t)||t.startsWith(`text/`)?`text`:`blob`}function rr(e,t,n,r){let i=ir(t?.headers??e?.headers,n?.headers,r),a;return(n?.query||n?.params||t?.params||t?.query)&&(a={...n?.params,...n?.query,...t?.params,...t?.query}),{...n,...t,query:a,params:a,headers:i}}function ir(e,t,n){if(!t)return new n(e);let r=new n(t);if(e)for(let[t,i]of Symbol.iterator in e||Array.isArray(e)?e:new n(e))r.set(t,i);return r}async function ar(e,t){if(t)if(Array.isArray(t))for(let n of t)await n(e);else await t(e)}var or=new Set([408,409,425,429,500,502,503,504]),sr=new Set([101,204,205,304]);function cr(e={}){let{fetch:t=globalThis.fetch,Headers:n=globalThis.Headers,AbortController:r=globalThis.AbortController}=e;async function i(e){let t=e.error&&e.error.name===`AbortError`&&!e.options.timeout||!1;if(e.options.retry!==!1&&!t){let t;t=typeof e.options.retry==`number`?e.options.retry:+!Qn(e.options.method);let n=e.response&&e.response.status||500;if(t>0&&(Array.isArray(e.options.retryStatusCodes)?e.options.retryStatusCodes.includes(n):or.has(n))){let n=typeof e.options.retryDelay==`function`?e.options.retryDelay(e):e.options.retryDelay||0;return n>0&&await new Promise(e=>setTimeout(e,n)),a(e.request,{...e.options,retry:t-1})}}let n=Xn(e);throw Error.captureStackTrace&&Error.captureStackTrace(n,a),n}let a=async function(a,o={}){let s={request:a,options:rr(a,o,e.defaults,n),response:void 0,error:void 0};if(s.options.method&&(s.options.method=s.options.method.toUpperCase()),s.options.onRequest&&(await ar(s,s.options.onRequest),s.options.headers instanceof n||(s.options.headers=new n(s.options.headers||{}))),typeof s.request==`string`&&(s.options.baseURL&&(s.request=Xe(s.request,s.options.baseURL)),s.options.query&&(s.request=Ve(s.request,s.options.query),delete s.options.query),`query`in s.options&&delete s.options.query,`params`in s.options&&delete s.options.params),s.options.body&&Qn(s.options.method))if($n(s.options.body)){let e=s.options.headers.get(`content-type`);typeof s.options.body!=`string`&&(s.options.body=e===`application/x-www-form-urlencoded`?new URLSearchParams(s.options.body).toString():JSON.stringify(s.options.body)),e||s.options.headers.set(`content-type`,`application/json`),s.options.headers.has(`accept`)||s.options.headers.set(`accept`,`application/json`)}else(`pipeTo`in s.options.body&&typeof s.options.body.pipeTo==`function`||typeof s.options.body.pipe==`function`)&&(`duplex`in s.options||(s.options.duplex=`half`));let c;if(!s.options.signal&&s.options.timeout){let e=new r;c=setTimeout(()=>{let t=Error(`[TimeoutError]: The operation was aborted due to timeout`);t.name=`TimeoutError`,t.code=23,e.abort(t)},s.options.timeout),s.options.signal=e.signal}try{s.response=await t(s.request,s.options)}catch(e){return s.error=e,s.options.onRequestError&&await ar(s,s.options.onRequestError),await i(s)}finally{c&&clearTimeout(c)}if((s.response.body||s.response._bodyInit)&&!sr.has(s.response.status)&&s.options.method!==`HEAD`){let e=(s.options.parseResponse?`json`:s.options.responseType)||nr(s.response.headers.get(`content-type`)||``);switch(e){case`json`:{let e=await s.response.text(),t=s.options.parseResponse||On;s.response._data=t(e);break}case`stream`:s.response._data=s.response.body||s.response._bodyInit;break;default:s.response._data=await s.response[e]()}}return s.options.onResponse&&await ar(s,s.options.onResponse),!s.options.ignoreResponseError&&s.response.status>=400&&s.response.status<600?(s.options.onResponseError&&await ar(s,s.options.onResponseError),await i(s)):s.response},o=async function(e,t){return(await a(e,t))._data};return o.raw=a,o.native=(...e)=>t(...e),o.create=(t={},n={})=>cr({...e,...n,defaults:{...e.defaults,...n.defaults,...t}}),o}var lr=(function(){if(typeof globalThis<`u`)return globalThis;if(typeof self<`u`)return self;if(typeof window<`u`)return window;if(typeof global<`u`)return global;throw Error(`unable to locate global object`)})(),ur=lr.fetch?(...e)=>lr.fetch(...e):()=>Promise.reject(Error(`[ofetch] global.fetch is not supported!`)),dr=lr.Headers,fr=lr.AbortController,pr=cr({fetch:ur,Headers:dr,AbortController:fr}),mr=()=>window?.__NUXT__?.config||window?.useNuxtApp?.().payload?.config,hr=()=>mr().app,gr=()=>hr().baseURL,_r=()=>hr().buildAssetsDir,vr=(...e)=>Ge(yr(),_r(),...e),yr=(...e)=>{let t=hr(),n=t.cdnURL||t.baseURL;return e.length?Ge(n,...e):n};globalThis.__buildAssetsURL=vr,globalThis.__publicAssetsURL=yr,globalThis.$fetch||(globalThis.$fetch=pr.create({baseURL:gr()}));var br=globalThis.$fetch;`global`in globalThis||(globalThis.global=globalThis);var xr=e({docsBase:o,reporters:a});function Sr(e,t){return t&&typeof e==`function`&&(e.key=t),e}var Cr=/\\/g,wr=/</g,Tr=/"/g,Er=/%\w+(?:\.\w+)?/g,Dr=`%separator`;function Or(e,t,n=!1){let r;if(t===`s`||t===`pageTitle`)r=e.pageTitle;else if(t.includes(`.`)){let n=t.indexOf(`.`);r=e[t.substring(0,n)]?.[t.substring(n+1)]}else r=e[t];if(r!==void 0)return n?(r||``).replace(Cr,`\\\\`).replace(wr,`\\u003C`).replace(Tr,`\\"`):r||``}function kr(e,t,n,r=!1){if(typeof e!=`string`||!e.includes(`%`))return e;let i=e;try{i=decodeURI(e)}catch{}let a=i.match(Er);if(!a)return e;let o=e.includes(Dr);return e=e.replace(Er,e=>{if(e===Dr||!a.includes(e))return e;let n=Or(t,e.slice(1),r);return n===void 0?e:n}).trim(),o&&(e=e.split(Dr).map(e=>e.trim()).filter(e=>e!==``).join(n?` ${n} `:` `)),e}var Ar=(e,t)=>e._w===t._w?e._p-t._p:e._w-t._w,jr=e=>e.includes(`:key`)?e:e.split(`:`).join(`:key:`),Mr=Sr({key:`aliasSorting`,hooks:{"tags:resolve":e=>{let t=!1;for(let n of e.tags){let r=n.tagPriority;if(!r)continue;let i=String(r);if(i.startsWith(`before:`)){let r=jr(i.slice(7)),a=e.tagMap.get(r);a&&(typeof a.tagPriority==`number`&&(n.tagPriority=a.tagPriority),n._p=a._p-1,t=!0)}else if(i.startsWith(`after:`)){let r=jr(i.slice(6)),a=e.tagMap.get(r);a&&(typeof a.tagPriority==`number`&&(n.tagPriority=a.tagPriority),n._p=a._p+1,t=!0)}}t&&(e.tags=e.tags.sort(Ar))}}}),Nr=Sr({key:`deprecations`,hooks:{"entries:normalize":({tags:e})=>{for(let t of e)t.props.children&&(t.innerHTML=t.props.children,delete t.props.children),t.props.hid&&(t.key=t.props.hid,delete t.props.hid),t.props.vmid&&(t.key=t.props.vmid,delete t.props.vmid),`body`in t.props&&(t.props.body&&(t.tagPosition=`bodyClose`),delete t.props.body),t.props.renderPriority!=null&&(t.tagPriority=t.props.renderPriority,delete t.props.renderPriority)}}});function Pr(e){return typeof e?.then==`function`}function Fr(e){if(typeof e==`function`)return e;if(Pr(e))return Promise.resolve(e).then(Fr);if(Array.isArray(e)){let t=e.map(Fr);return t.some(Pr)?Promise.all(t):e}if(e?.constructor===Object){let t=Object.keys(e),n=t.map(t=>Fr(e[t]));if(n.some(Pr))return Promise.all(n).then(e=>Object.fromEntries(t.map((t,n)=>[t,e[n]])))}return e}var Ir=Sr(e=>{let t=new WeakMap;return{key:`promises`,hooks:{"entries:resolve":n=>{for(let r=n.entries.length-1;r>=0;r--){let i=n.entries[r],a=i.input;if(t.get(i)===a){n.entries.splice(r,1);continue}let o=Fr(a);if(!Pr(o)){t.delete(i);continue}t.set(i,a),n.entries.splice(r,1),Promise.resolve(o).then(n=>{t.get(i)===a&&(t.delete(i),i.input=n,delete i._tags,e.invalidate?.())},()=>{t.get(i)===a&&t.delete(i)})}}}}},`promises`),Lr={meta:`content`,link:`href`,htmlAttrs:`lang`},Rr=[`innerHTML`,`textContent`],zr=Sr(e=>({key:`template-params`,hooks:{"tags:resolve":({tagMap:t,tags:n})=>{let r=t.get(`templateParams`)?.props||{},i=r.separator||`|`;delete r.separator,r.pageTitle=kr(r.pageTitle||e._title||``,r,i);for(let e of n){if(e.processTemplateParams===!1)continue;let t=Lr[e.tag];if(t&&typeof e.props[t]==`string`)e.props[t]=kr(e.props[t],r,i);else if(e.processTemplateParams||e.tag===`titleTemplate`||e.tag===`title`)for(let t of Rr)typeof e[t]==`string`&&(e[t]=kr(e[t],r,i,e.tag===`script`&&typeof e.props.type==`string`&&e.props.type.endsWith(`json`)))}e._templateParams=r,e._separator=i},"tags:afterResolve":({tagMap:t})=>{let n=t.get(`title`);n?.textContent&&n.processTemplateParams!==!1&&(n.textContent=kr(n.textContent,e._templateParams,e._separator))}}}),`template-params`),Br=new Set([`link`,`style`,`script`,`noscript`]),Vr=new Set([`title`,`titleTemplate`,`script`,`style`,`noscript`]),Hr=new Set([`base`,`meta`,`link`,`style`,`script`,`noscript`]),Ur=new Set([`title`,`base`,`htmlAttrs`,`bodyAttrs`,`meta`,`link`,`style`,`script`,`noscript`]),Wr=new Set([`base`,`title`,`titleTemplate`,`bodyAttrs`,`htmlAttrs`,`templateParams`]),Gr=new Set([`key`,`tagPosition`,`tagPriority`,`tagDuplicateStrategy`,`innerHTML`,`textContent`,`processTemplateParams`]),Kr=new Set([`templateParams`,`htmlAttrs`,`bodyAttrs`]),qr=new Set([`theme-color`,`google-site-verification`,`og`,`article`,`book`,`profile`,`twitter`,`author`]),Jr={critical:-8,high:-1,low:2};function Yr(e){return e===`__proto__`||e===`constructor`||e===`prototype`}function Xr(e){let t=new d;for(let n in e||{})t.hook(n,e[n]);return t}function G(e,t,n){if(e.hooks?._hooks?.[t]?.length)return e.hooks?.callHook(t,n)}var Zr=/^(?:viewport|description|keywords|robots)$/,Qr=[`name`,`property`,`http-equiv`];function $r(e){let t=e.indexOf(`:`);if(t===-1)return!1;let n=e.indexOf(`:`,t+1);return qr.has(e.slice(t+1,n===-1?e.length:n))}function ei(e){let{props:t,tag:n,key:r}=e;if(Wr.has(n))return n;if(n===`link`){if(t.rel===`canonical`)return`canonical`;if(t.rel===`alternate`&&t.hreflang)return`alternate:${t.hreflang}`}if(t.charset)return`charset`;if(n===`meta`)for(let e of Qr){let n=t[e];if(n!==void 0)return`meta:${n}${(typeof n!=`string`||!n.includes(`:`))&&!Zr.test(n)&&r?`:key:${r}`:``}`}return r?`${n}:key:${r}`:t.id?`${n}:id:${t.id}`:n===`link`&&t.rel&&t.href?`link:${t.rel}:${t.href}`:Vr.has(n)&&(e.textContent||e.innerHTML)?`${n}:content:${e.textContent||e.innerHTML}`:void 0}function ti(e){let t=e._h||e._d||e.textContent||e.innerHTML;if(t)return t;let n=Object.keys(e.props).sort(),r=`${e.tag}:`,i=``;for(let t of n)r+=`${i}${t}:${String(e.props[t])}`,i=`,`;return r}function ni(e,t,n){if(n===`_resolver`)return e;typeof e==`function`&&(!n||n!==`titleTemplate`&&!n.startsWith(`on`))&&(e=e());let r=t?t(n,e):e;if(Array.isArray(r)){let e;for(let n=0;n<r.length;n++){let i=ni(r[n],t);e?e[n]=i:i!==r[n]&&(e=r.slice(0,n),e[n]=i)}return e||r}if(r?.constructor===Object){let e;for(let n in r){let i=Yr(n),a=i?void 0:ni(r[n],t,n);if(!e&&(i||a!==r[n])){e={};for(let t in r){if(t===n)break;e[t]=r[t]}}e&&!i&&(e[n]=a)}return e||r}return r}var ri=/[\s"'<>/=\x00-\x1F\x7F]/;function ii(e,t){let n=e===`style`,r=n?new Map:new Set,i=e=>{if(e)if(n){let t=e.indexOf(`:`);t>0&&r.set(e.slice(0,t).trim(),e.slice(t+1).trim())}else e.split(` `).forEach(e=>e&&r.add(e))};if(typeof t==`string`)(n?t.split(`;`):[t]).forEach(i);else if(Array.isArray(t))t.forEach(i);else if(t&&typeof t==`object`)for(let e in t){let a=t[e];a&&a!==`false`&&(n?r.set(e.trim(),String(a)):i(e))}return r}function ai(e,t){if(e.props=e.props||{},!t)return e;if(e.tag===`templateParams`)return e.props=t,e;let n=Hr.has(e.tag)||e.tag===`htmlAttrs`||e.tag===`bodyAttrs`;for(let r in t){if(Yr(r))continue;let i=r.startsWith(`data-`),a=n&&!Gr.has(r),o=a&&!i?r.toLowerCase():r;if(a&&(!o||ri.test(o)))continue;let s=t[r];if(s===null)e.props[o]=null;else if(r===`class`||r===`style`)e.props[r]=ii(r,s);else if(Gr.has(r))if((r===`textContent`||r===`innerHTML`)&&typeof s==`object`){let n=t.type||`application/json`;(n.endsWith(`json`)||n===`speculationrules`||n===`importmap`)&&(e.props.type=t.type=n,e[r]=JSON.stringify(s))}else e[r]=s;else if(s!==void 0){let t=String(s),n=e.tag===`meta`&&o===`content`;e.props[o]=t===`true`||t===``?i||n?t:!0:!s&&i&&t===`false`?`false`:s}}return e}function oi(e,t){let n;return t.length&&(n=(e,n)=>{for(let r=0;r<t.length;r++)n=t[r](e,n);return n},e=n(void 0,e)),ni(e,n)}function si(e,t){let n=ai({tag:e,props:{}},typeof t==`object`&&typeof t!=`function`?t:{[e===`script`||e===`noscript`||e===`style`?`innerHTML`:`textContent`]:t});if(n.key&&Br.has(n.tag)&&(n.props[`data-hid`]=n._h=n.key),n.tag===`script`&&typeof n.innerHTML==`object`&&(n.innerHTML=JSON.stringify(n.innerHTML),n.props.type=n.props.type||`application/json`),Array.isArray(n.props.content)){let e=[];for(let t of n.props.content)e.push({...n,props:{...n.props,content:t}});return e}return n}function ci(e,t){if(Array.isArray(t))for(let n of t)e.push(n);else e.push(t)}function li(e,t){if(!e)return[];typeof e==`function`&&(e=e()),e=oi(e,t);let n=[];for(let t in e){let r=e[t];if(r!==void 0)if(Array.isArray(r))for(let e of r)ci(n,si(t,e));else ci(n,si(t,r))}return n}var ui=/</g,di=/<\/script/g,fi=(e,t)=>e._w===t._w?e._p-t._p:e._w-t._w,pi=()=>100;function mi(e){for(let t in e)return!1;return!0}var hi=/^tags:|:render/;function gi(e,t){let n=(t[`entries:resolve`]?.length||0)+(t[`entries:normalize`]?.length||0);if(e._h!==n){e._h=n;for(let t of e.entries.values())delete t._tags}}function _i(e){for(let t=0;t<e.length;t++){let n=e[t],r={...n.props};r.class instanceof Set&&(r.class=new Set(r.class)),r.style instanceof Map&&(r.style=new Map(r.style)),e[t]={...n,props:r}}}function vi(e,t){let n=e.tags,r=0;for(let t of e.tagMap.values())if(Array.isArray(t))for(let e of t)n[r++]=e;else n[r++]=t;n.length=r,t&&n.sort(fi)}function yi(e){let t=!1;for(let n of e.tags.sort(fi)){let r=n._d||ti(n);if(!r)continue;let i=e.tagMap.get(r);if(!i){e.tagMap.set(r,n);continue}if((n.tagDuplicateStrategy||(Kr.has(n.tag)?`merge`:null)||(n.key&&n.key===i.key?`merge`:null))===`merge`){let t={...i.props};for(let e in n.props)t[e]=e===`style`?new Map([...i.props.style||new Map,...n.props[e]]):e===`class`?new Set([...i.props.class||[],...n.props[e]]):n.props[e];e.tagMap.set(r,{...n,props:t})}else n._p>>10==i._p>>10&&n.tag===`meta`&&$r(r)?(e.tagMap.set(r,Object.assign([...Array.isArray(i)?i:[i],n],n)),t=!0):(n._w===i._w?n._p>i._p:n._w<i._w)&&e.tagMap.set(r,n)}return t}function bi(e,t){let n=e.tagMap.get(`title`),r=e.tagMap.get(`titleTemplate`);if(t._title=n?.textContent,!r)return;let i=r.textContent;if(t._titleTemplate=i,!i)return;let a=typeof i==`function`?i(n?.textContent):i;typeof a==`string`&&!t.plugins.has(`template-params`)&&(a=a.replace(`%s`,n?.textContent||``)),n?a===null?e.tagMap.delete(`title`):e.tagMap.set(`title`,{...n,textContent:a}):e.tagMap.set(`titleTemplate`,{...r,tag:`title`,textContent:a})}function xi(e){let t=0;for(let n of e){let{innerHTML:r,tag:i,props:a}=n;if(!(!Ur.has(i)||mi(a)&&!r&&!n.textContent)&&!(i===`meta`&&!a.content&&!a[`http-equiv`]&&!a.charset)){if(i===`script`&&(r||n.textContent)){let e=String(a.type),t=e.endsWith(`json`)||e===`importmap`||e===`speculationrules`,i=e=>t?(typeof e==`string`?e:JSON.stringify(e)).replace(ui,`\\u003C`):typeof e==`string`?e.replace(di,`<\\/script`):e;n={...n},r&&(n.innerHTML=i(r)),n.textContent&&=i(n.textContent),n._d=ei(n)}e[t++]=n}}return e.length=t,e}function Si(e,t){let n=t?.tagWeight??e.resolvedOptions._tagWeight??pi,r={tagMap:new Map,tags:[]},i=e.hooks?._hooks||{};gi(e,i);for(let t of e.entries.values())t._pending!==void 0&&(t.input=t._pending,delete t._pending,delete t._tags,delete t._precomputedTags);let a;(i[`entries:resolve`]?.length||i[`entries:normalize`]?.length)&&(a=[...e.entries.values()],i[`entries:resolve`]?.length&&G(e,`entries:resolve`,{entries:a,...r})),gi(e,i);for(let t of a||e.entries.values()){let a=t._tags;if(!a)if(t._precomputedTags&&n===e.resolvedOptions._tagWeight&&!i[`entries:normalize`]?.length&&!i[`entries:resolve`]?.length&&(!t.options||mi(t.options)))a=t._precomputedTags;else{if(a=li(t.input,e.resolvedOptions.propResolvers||[]),t.options&&!mi(t.options))for(let e of a)Object.assign(e,t.options);if(i[`entries:normalize`]?.length){let n={tags:a,entry:t};G(e,`entries:normalize`,n),a=n.tags}for(let e=0;e<a.length;e++){let r=a[e];r._w=n(r),r._p=(t._i<<10)+e,r._d=ei(r),r._d||(r._h=ti(r))}t._tags=a}r.tags.push(...a)}for(let e in i)if(i[e]?.length&&hi.test(e)){_i(r.tags);break}let o=yi(r);return bi(r,e),vi(r,o),G(e,`tags:beforeResolve`,r),G(e,`tags:resolve`,r),G(e,`tags:afterResolve`,r),xi(r.tags)}var Ci=`usehead`;function wi(){if(te()){let e=v(Ci);if(e)return e}throw Error(`useHead() was called without provide context, ensure you call it through the setup() function.`)}function Ti(e){return{install(t){t.config.globalProperties.$unhead=e,t.config.globalProperties.$head=e,t.provide(Ci,e)}}.install}var Ei=Object.assign((e,t)=>x(t)?se(t):t,{_static:!0});function Di(e,t={}){let n=t.head||wi();return n.ssr?n.push(e||{},t):Oi(n,e,t)}function Oi(e,t,n={}){let r=re();if(r&&!r.active)return{patch(){},dispose(){},_i:-1};let i=De(!1);if(n.onRendered&&r){let e=n.onRendered;n={...n,onRendered:t=>r.run(()=>e(t))}}let a;return Re(()=>{let r=i.value?{}:ni(t,Ei);a?a.patch(r):a=e.push(r,n)}),Le()&&(D(()=>{a.dispose()}),ye(()=>{i.value=!0}),y(()=>{i.value=!1})),a}function ki(e,t){if(typeof t==`function`&&t.key&&e.plugins.has(t.key))return;let n=typeof t==`function`?t(e):t,r=n.key||String(e.plugins.size+1);if(!e.plugins.get(r)){e.plugins.set(r,n);for(let t in n.hooks||{})e.hooks?.hook(t,n.hooks[t])}}function Ai(e,t={}){let n=!t.document,r=new Map,i={_entryCount:1,_h:0,plugins:new Map,resolvedOptions:t,ssr:n,entries:r,hooks:void 0,render:()=>e(i),use:e=>ki(i,e),push(e,t){let a=t?._index??i._entryCount++,o=t?{...t}:{};delete o.head,delete o.onRendered,delete o._index;let s={_i:a,input:e,options:o};return r.set(a,s),{_i:a,dispose(){r.delete(a)},patch(e){n?(s.input=e,delete s._tags):s._pending=e,r.has(a)||r.set(a,s)}}}};return t.init?.forEach(e=>e&&i.push(e)),i}function ji(e){let t=e||s();return t.ssrContext?.head||t.runWithContext(()=>{if(te()){let e=v(`usehead`);if(!e)throw xr.NUXT_E6001();return e}})}function Mi(e,t={}){return Di(e,{head:t.head||ji(t.nuxt),...t})}var Ni=e({docsBase:o,reporters:a}),Pi=e({docsBase:o,reporters:a}),Fi=(e,t)=>[],Ii=e=>Sn({},...Fi(``,typeof e==`string`?e.toLowerCase():e).map(e=>e.data).reverse()),Li=`modulepreload`,Ri=function(e,t){return new URL(e,t).href},zi={},Bi=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=Ri(t,n),t=s(t),t in zi)return;zi[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Li,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Vi=br,Hi=Ii,Ui;function Wi(){let e;return e=Vi(vr(`builds/meta/${t().app.buildId}.json`),{responseType:`json`}).then(e=>{if(!e||typeof e!=`object`||!Array.isArray(e.prerendered))throw Pi.NUXT_E5004();return e}),Ui=e,e.catch(t=>{Ui===e&&(Ui=void 0),Pi.NUXT_E5002({cause:t})}),e}function Gi(){return Ui||Wi()}function Ki(e){let t=typeof e==`string`?e:e.path;try{return Hi(t.toLowerCase())}catch(e){return Pi.NUXT_E5003({path:t,cause:e}),{}}}var qi=2**32-1,Ji=qi-1;function Yi(e){return!(!Number.isInteger(e)||e<0||e>Ji)}function Xi(e){return!(!Number.isInteger(e)||e<0||e>qi)}function Zi(e){return Uint8Array.fromBase64(e).buffer}function Qi(e){return Uint8Array.from(Buffer.from(e,`base64`)).buffer}function $i(e){let t=atob(e),n=t.length,r=new Uint8Array(n);for(let e=0;e<n;e++)r[e]=t.charCodeAt(e);return r.buffer}var ea=typeof Uint8Array.fromBase64==`function`,ta=typeof process==`object`&&process.versions?.node!==void 0,na=ea?Zi:ta?Qi:$i;function ra(e,t){return ia(JSON.parse(e),t)}function ia(e,t){if(typeof e==`number`)return a(e,!0);if(!Array.isArray(e)||e.length===0)throw Error(`Invalid input`);let n=e,r=Array(n.length),i=null;function a(e,o=!1){if(e===-1)return;if(e===-3)return NaN;if(e===-4)return 1/0;if(e===-5)return-1/0;if(e===-6)return-0;if(o||typeof e!=`number`)throw Error(`Invalid input`);if(e in r)return r[e];let s=n[e];if(!s||typeof s!=`object`)r[e]=s;else if(Array.isArray(s))if(typeof s[0]==`string`){let o=s[0],c=t&&Object.hasOwn(t,o)?t[o]:void 0;if(c){let t=s[1];if(typeof t!=`number`&&(t=n.push(s[1])-1),Object.hasOwn(r,t))return r[e]=c(r[t]);if(i??=new Set,i.has(t))throw Error(`Invalid circular reference`);return i.add(t),r[e]=c(a(t)),i.delete(t),r[e]}switch(o){case`Date`:r[e]=new Date(s[1]);break;case`Set`:let t=new Set;r[e]=t;for(let e=1;e<s.length;e+=1)t.add(a(s[e]));break;case`Map`:let i=new Map;r[e]=i;for(let e=1;e<s.length;e+=2)i.set(a(s[e]),a(s[e+1]));break;case`RegExp`:r[e]=new RegExp(s[1],s[2]);break;case`Object`:{let t=s[1];if(typeof n[t]==`object`&&n[t][0]!==`BigInt`)throw Error(`Invalid input`);r[e]=Object(a(t));break}case`BigInt`:r[e]=BigInt(s[1]);break;case`null`:let c=Object.create(null);r[e]=c;for(let e=1;e<s.length;e+=2){if(s[e]===`__proto__`)throw Error("Cannot parse an object with a `__proto__` property");c[s[e]]=a(s[e+1])}break;case`Int8Array`:case`Uint8Array`:case`Uint8ClampedArray`:case`Int16Array`:case`Uint16Array`:case`Float16Array`:case`Int32Array`:case`Uint32Array`:case`Float32Array`:case`Float64Array`:case`BigInt64Array`:case`BigUint64Array`:case`DataView`:{if(n[s[1]][0]!==`ArrayBuffer`)throw Error(`Invalid data`);let t=globalThis[o],i=a(s[1]);r[e]=s[2]===void 0?new t(i):new t(i,s[2],s[3]);break}case`ArrayBuffer`:{let t=s[1];if(typeof t!=`string`)throw Error(`Invalid ArrayBuffer encoding`);let n=na(t);r[e]=n;break}case`Temporal.Duration`:case`Temporal.Instant`:case`Temporal.PlainDate`:case`Temporal.PlainTime`:case`Temporal.PlainDateTime`:case`Temporal.PlainMonthDay`:case`Temporal.PlainYearMonth`:case`Temporal.ZonedDateTime`:{let t=o.slice(9);r[e]=Temporal[t].from(s[1]);break}case`URL`:{let t=new URL(s[1]);r[e]=t;break}case`URLSearchParams`:{let t=new URLSearchParams(s[1]);r[e]=t;break}default:throw Error(`Unknown type ${o}`)}}else if(s[0]===-7){let t=s[1];if(!Xi(t))throw Error(`Invalid input`);let n=[];r[e]=n,n[Ji]=void 0,delete n[Ji];for(let e=2;e<s.length;e+=2){let r=s[e];if(!Yi(r)||r>=t)throw Error(`Invalid input`);n[r]=a(s[e+1])}n.length=t}else{let t=Array(s.length);r[e]=t;for(let e=0;e<s.length;e+=1){let n=s[e];n!==-2&&(t[e]=a(n))}}else{let t={};r[e]=t;for(let e of Object.keys(s)){if(e===`__proto__`)throw Error("Cannot parse an object with a `__proto__` property");let n=s[e];t[e]=a(n)}}return r[e]}return a(0)}async function aa(e,t={}){return null}async function oa(e){return null}var K=null;async function sa(){if(K)return K;let e=document.getElementById(`__NUXT_DATA__`);if(!e)return{};let t=await ca(e.textContent||``),n=e.dataset.src?await oa(e.dataset.src):void 0;return K={...t,...n,...window.__NUXT__},K.config?.public&&(K.config.public=C(K.config.public)),K}async function ca(e){return await ra(e,s()._payloadRevivers)}function la(e,t){s()._payloadRevivers[e]=t}function ua(e){try{return JSON.parse(e)}catch{return e}}var da=[[`NuxtError`,e=>W(e)],[`EmptyShallowRef`,e=>oe(e===`_`?void 0:e===`0n`?BigInt(0):ua(e))],[`EmptyRef`,e=>De(e===`_`?void 0:e===`0n`?BigInt(0):ua(e))],[`ShallowRef`,e=>oe(e)],[`ShallowReactive`,e=>S(e)],[`Ref`,e=>De(e)],[`Reactive`,e=>C(e)]],fa=f({name:`nuxt:revive-payload:client`,order:-30,async setup(e){let t,n;for(let[e,t]of da)la(e,t);Object.assign(e.payload,([t,n]=i(()=>e.runWithContext(sa)),t=await t,n(),t)),delete window.__NUXT__}},1);function pa(e,t){t.push(u),e.vueApp.use(t);let n=!0,r=()=>{n=!1,t.render()};t.hooks?.hook(`dom:beforeRender`,e=>{e.shouldRender=!n}),e.hooks.hook(`page:start`,()=>{n=!0}),e.hooks.hook(`page:finish`,()=>{e.isHydrating||r()}),e.hooks.hook(`app:error`,r),e.hooks.hook(`app:suspense:resolve`,r);let i=t.push.bind(t);t.push=((t,n)=>{let r=i(t,n),a=r.dispose.bind(r);return r.dispose=()=>{let t=e[`~transitionPromise`];t?t.finally(a):a()},r})}function ma(e,t,n){let r=e.push,i=e;return i.ssr=!1,i.hooks=t,i.dirty=!!i.dirty,i.use=e=>ki(i,e),i.render=()=>n(i),i.invalidate=()=>{for(let e of i.entries.values())delete e._tags;i.dirty=!0,t.callHook(`entries:updated`,i)},i.push=(n,a)=>{let o=a?.onRendered?t.hook(`dom:rendered`,a.onRendered):void 0,s=r(n,a),c=e.entries.get(s._i);return c&&(c._o=n),i.dirty=!0,t.callHook(`entries:updated`,i),{_i:s._i,patch(e){s.patch(e),i.dirty=!0,t.callHook(`entries:updated`,i)},dispose(){o?.(),e.entries.has(s._i)&&(s.dispose(),i.invalidate())}}},t.hook(`entries:updated`,()=>{i.render()}),i}var ha=/\s+/;function ga(e={}){return t=>ba(t,e)}function _a(e){for(let t of e.entries.values())if(t._pending!==void 0)return!0;return!1}function va(e){for(let t in e._s)e._s[t]();for(let t in e._p)e._p[t]();e._s={},e._p={},e._e.clear(),e._l.clear()}function ya(e,t){let n={_d:t,_t:t.title,_e:new Map([[`htmlAttrs`,t.documentElement],[`bodyAttrs`,t.body]]),_p:{},_s:{},_l:new Map};for(let e of[...t.body.children,...t.head.children]){let t=e.tagName.toLowerCase();if(!Hr.has(t))continue;let r={innerHTML:e.innerHTML};for(let t of e.getAttributeNames())r[t]=e.getAttribute(t);let i=ai({tag:t,props:{}},r);i.key=e.getAttribute(`data-hid`)||void 0;let a=ei(i)||ti(i),o=a,s=1;for(;n._e.has(o);)o=`${a}:${s++}`;n._e.set(o,e)}for(let t of e.entries.values())if(t._o!==void 0){let e=t._o;for(let t of[`bodyAttrs`,`htmlAttrs`]){let r=e[t]?.class;if(typeof r==`string`){let e=n._e.get(t);for(let i of r.split(ha))i&&(n._p[`${t}:attr:class:${i}`]=()=>e.classList.remove(i))}}}return n}function ba(e,t={}){let n=t.document||e.resolvedOptions.document,r=e._dom,i=!!r&&r._d!==n;if(!n||!i&&!e.dirty&&!_a(e)||e._du)return!1;let a=n.defaultView;e._du=!0;let o=!1;try{let r=function(e,t,n,r){let i=`${e}:${t}`;d._s[i]=!r&&d._p[i]||n,delete d._p[i]},i=function(e){let t=d._p[e];return delete d._p[e],t},s=function(e,t,n,i,a,o){let s=`event:${t}`,c=`${e}:${s}`,l=d._l.get(c);if(l&&l[0]===o&&l[1]===n&&l[2]===i){r(e,s,l[4]);return}l?.[4]();let u=`data-${t}`,f=(e=>i.call(a,e)),p=()=>{o.removeEventListener(n,f),a.getAttribute(u)===``&&a.removeAttribute(u),d._l.get(c)?.[3]===f&&d._l.delete(c)};o.addEventListener(n,f),d._l.set(c,[o,n,i,f,p]),a.setAttribute(u,``),r(e,s,p,!0)},c=function({id:e,$el:t,tag:n}){let o=n.tag.endsWith(`Attrs`);if(d._e.set(e,t),!o){let a=n.textContent;a!=null&&a!==``&&(a!==t.textContent&&(t.textContent=a),r(e,`text`,()=>{t.textContent===a&&(t.textContent=``)},!0));let o=n.innerHTML;o!=null&&o!==``&&(o!==t.innerHTML&&(t.innerHTML=o),r(e,`html`,()=>{t.innerHTML===o&&(t.innerHTML=``)},!0));let s=`${e}:el`;d._s[s]=i(s)||(()=>{t?.remove(),d._e.delete(e)})}for(let r in n.props){let o=n.props[r];if(r[0]===`o`&&r[1]===`n`&&typeof o==`function`){let i=r.slice(2);t?.dataset?.[`${r}fired`]&&o.call(t,new((a?.Event)||Event)(i)),s(e,r,i,o,t,n.tag===`bodyAttrs`&&a?a:t);continue}let c=`${e}:attr:${r}`;if(r===`class`&&o)for(let e of o){let n=`${c}:${e}`;d._s[n]=i(n)||(()=>t.classList.remove(e)),t.classList.contains(e)||t.classList.add(e)}else if(r===`style`&&o)for(let[e,n]of o){let r=`${c}:${e}`;d._s[r]=i(r)||(()=>t.style.removeProperty(e)),t.style.setProperty(e,n)}else o!==!1&&o!==null&&(t.getAttribute(r)!==o&&t.setAttribute(r,o===!0?``:String(o)),d._s[c]=i(c)||(()=>t.removeAttribute(r)))}},l={shouldRender:!0,tags:[]};if(G(e,`dom:beforeRender`,l),!l.shouldRender)return!1;let u=e._dom;u?._d!==n&&(u&&va(u),u=void 0),u?u._p=u._s:u=ya(e,n),u._s={};let d=u,f=[],p={};e.dirty=!1;let m=Si(e,t.tagWeight?{tagWeight:t.tagWeight}:void 0),h=[],g={};for(let e of m){let t=g[e._d]||0,i=(t?`${e._d}:${t}`:e._d)||e._h,a={tag:e,id:i,shouldRender:!0};if(e.tag===`meta`&&e._d&&$r(e._d)&&(g[e._d]=t+1),h.push(a),e.tag===`title`){n.title=e.textContent,r(`title`,``,()=>n.title=d._t);continue}a.$el=d._e.get(i),a.$el?c(a):Hr.has(e.tag)&&f.push(a)}for(let e of f)e.$el=n.createElement(e.tag.tag),c(e),(p[e.tag.tagPosition||`head`]??=n.createDocumentFragment()).appendChild(e.$el);p.head&&n.head.appendChild(p.head),p.bodyOpen&&n.body.insertBefore(p.bodyOpen,n.body.firstChild),p.bodyClose&&n.body.appendChild(p.bodyClose);for(let e in d._p)d._p[e]();e._dom=d,o=!0,G(e,`dom:rendered`,{renders:h})}catch(t){throw e.dirty=!0,t}finally{e._du=!1}return o&&(e.dirty||_a(e))&&ba(e,t),o}var xa=e=>typeof e.tagPriority==`number`?e.tagPriority:100+(Jr[e.tagPriority]||0);function Sa(e={}){e.document=e.document||(typeof window<`u`?document:void 0);let t=e.render||ga({document:e.document}),n=ma(Ai(t,{document:e.document,propResolvers:e.propResolvers,_tagWeight:xa,init:[]}),Xr(e.hooks),t);return e.plugins?.forEach(e=>n.use(e)),e.init?.forEach(e=>e&&n.push(e)),n}function Ca(e={}){let t=ga(),n,r=0;return n=Sa({render:()=>{let e=++r;setTimeout(()=>{e===r&&t(n)},0)},...e}),n.install=Ti(n),n}var wa={disableDefaults:!0,plugins:[Nr,Ir,zr,Mr]},Ta=f({name:`nuxt:head`,enforce:`pre`,setup(e){pa(e,Ca(wa))}}),Ea=/(:\w+)\([^)]+\)/g,Da=/(:\w+)[?+*]/g,Oa=/:\w+/g,ka=(e,t)=>t.path.replace(Ea,`$1`).replace(Da,`$1`).replace(Oa,t=>e.params[t.slice(1)]?.toString()||``),Aa=(e,t)=>{let n=e.route.matched.find(t=>t.components?.default===e.Component.type),r=t??n?.meta.key??(n&&ka(e.route,n));return typeof r==`function`?r(e.route):r},ja=(e,t)=>({default:()=>e?F(_e,e===!0?{}:e,t):t});function Ma(e){return Array.isArray(e)?e:[e]}function Na(e){return typeof e==`object`||`displayName`in e||`props`in e||`__vccOpts`in e}function Pa(e){return e.__esModule||e[Symbol.toStringTag]===`Module`||e.default&&Na(e.default)}var q=Object.assign;function Fa(e,t){let n={};for(let r in t){let i=t[r];n[r]=J(i)?i.map(e):e(i)}return n}var Ia=()=>{},J=Array.isArray;function La(e,t){let n={};for(let r in e)n[r]=r in t?t[r]:e[r];return n}var Ra=Symbol(``);function za(e,t){return q(Error(),{type:e,[Ra]:!0},t)}function Y(e,t){return e instanceof Error&&Ra in e&&(t==null||!!(e.type&t))}var Ba=Symbol(``),Va=Symbol(``),Ha=Symbol(``),Ua=Symbol(``),Wa=Symbol(``);function Ga(e){return v(Ua)}var Ka=typeof document<`u`,qa=/#/g,Ja=/&/g,Ya=/\//g,Xa=/=/g,Za=/\?/g,Qa=/\+/g,$a=/%5B/g,eo=/%5D/g,to=/%5E/g,no=/%60/g,ro=/%7B/g,io=/%7C/g,ao=/%7D/g,oo=/%20/g;function so(e){return e==null?``:encodeURI(``+e).replace(io,`|`).replace($a,`[`).replace(eo,`]`)}function co(e){return so(e).replace(ro,`{`).replace(ao,`}`).replace(to,`^`)}function lo(e){return so(e).replace(Qa,`%2B`).replace(oo,`+`).replace(qa,`%23`).replace(Ja,`%26`).replace(no,"`").replace(ro,`{`).replace(ao,`}`).replace(to,`^`)}function uo(e){return lo(e).replace(Xa,`%3D`)}function fo(e){return so(e).replace(qa,`%23`).replace(Za,`%3F`)}function po(e){return fo(e).replace(Ya,`%2F`)}function mo(e){if(e==null)return null;try{return decodeURIComponent(``+e)}catch{}return``+e}var ho=/\/$/,go=e=>e.replace(ho,``);function _o(e,t,n=`/`){let r,i={},a=``,o=``,s=t.indexOf(`#`),c=t.indexOf(`?`);return c=s>=0&&c>s?-1:c,c>=0&&(r=t.slice(0,c),a=t.slice(c,s>0?s:t.length),i=e(a.slice(1))),s>=0&&(r||=t.slice(0,s),o=t.slice(s,t.length)),r=To(r??t,n),{fullPath:r+a+o,path:r,query:i,hash:mo(o)}}function vo(e,t){let n=t.query?e(t.query):``;return t.path+(n&&`?`)+n+(t.hash||``)}function yo(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||`/`}function bo(e,t,n){let r=t.matched.length-1,i=n.matched.length-1;return r>-1&&r===i&&xo(t.matched[r],n.matched[i])&&So(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function xo(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function So(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var n in e)if(!Co(e[n],t[n]))return!1;return!0}function Co(e,t){return J(e)?wo(e,t):J(t)?wo(t,e):(e&&e.valueOf())===(t&&t.valueOf())}function wo(e,t){return J(t)?e.length===t.length&&e.every((e,n)=>e===t[n]):e.length===1&&e[0]===t}function To(e,t){if(e.startsWith(`/`))return e;if(!e)return t;let n=t.split(`/`),r=e.split(`/`),i=r[r.length-1];(i===`..`||i===`.`)&&r.push(``);let a=n.length-1,o,s;for(o=0;o<r.length;o++)if(s=r[o],s!==`.`)if(s===`..`)a>1&&a--;else break;return n.slice(0,a).join(`/`)+`/`+r.slice(o).join(`/`)}var X={path:`/`,name:void 0,params:{},query:{},hash:``,fullPath:`/`,matched:[],meta:{},redirectedFrom:void 0};function Eo(e){if(!e)if(Ka){let t=document.querySelector(`base`);e=t&&t.getAttribute(`href`)||`/`,e=e.replace(/^\w+:\/\/[^/]+/,``)}else e=`/`;return e[0]!==`/`&&e[0]!==`#`&&(e=`/`+e),go(e)}var Do=/^[^#]+#/;function Oo(e,t){return e.replace(Do,`#`)+t}function ko(e,t){let n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}var Ao=()=>({left:window.scrollX,top:window.scrollY});function jo(e){let t;if(`el`in e){let n=e.el,r=typeof n==`string`&&n.startsWith(`#`),i=typeof n==`string`?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;t=ko(i,e)}else t=e;`scrollBehavior`in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left==null?window.scrollX:t.left,t.top==null?window.scrollY:t.top)}function Mo(e,t){return(history.state?history.state.position-t:-1)+e}var No=new Map;function Po(e,t){No.set(e,t)}function Fo(e){let t=No.get(e);return No.delete(e),t}function Io(e){return typeof e==`string`||e&&typeof e==`object`}function Lo(e){return typeof e==`string`||typeof e==`symbol`}function Ro(e){let t={};if(e===``||e===`?`)return t;let n=(e[0]===`?`?e.slice(1):e).split(`&`);for(let e=0;e<n.length;++e){let r=n[e].replace(Qa,` `),i=r.indexOf(`=`),a=mo(i<0?r:r.slice(0,i)),o=i<0?null:mo(r.slice(i+1));if(a in t){let e=t[a];J(e)||(e=t[a]=[e]),e.push(o)}else t[a]=o}return t}function zo(e){let t=``;for(let n in e){let r=e[n];if(n=uo(n),r==null){r!==void 0&&(t+=(t.length?`&`:``)+n);continue}(J(r)?r.map(e=>e&&lo(e)):[r&&lo(r)]).forEach(e=>{e!==void 0&&(t+=(t.length?`&`:``)+n,e!=null&&(t+=`=`+e))})}return t}function Bo(e){let t={};for(let n in e){let r=e[n];r!==void 0&&(t[n]=J(r)?r.map(e=>e==null?null:``+e):r==null?r:``+r)}return t}function Vo(){let e=[];function t(t){return e.push(t),()=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Z(e,t,n,r,i,a=e=>e()){let o=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise((s,c)=>{let l=e=>{e===!1?c(za(4,{from:n,to:t})):e instanceof Error?c(e):Io(e)?c(za(2,{from:t,to:e})):(o&&r.enterCallbacks[i]===o&&typeof e==`function`&&o.push(e),s())},u=a(()=>e.call(r&&r.instances[i],t,n,l)),d=Promise.resolve(u);e.length<3&&(d=d.then(l)),d.catch(e=>c(e))})}function Ho(e,t,n,r,i=e=>e()){let a=[];for(let o of e)for(let e in o.components){let s=o.components[e];if(!(t!==`beforeRouteEnter`&&!o.instances[e]))if(Na(s)){let c=(s.__vccOpts||s)[t];c&&a.push(Z(c,n,r,o,e,i))}else{let c=s();a.push(()=>c.then(a=>{if(!a)throw Error(`Couldn't resolve component "${e}" at "${o.path}"`);let s=Pa(a)?a.default:a;o.mods[e]=a,o.components[e]=s;let c=(s.__vccOpts||s)[t];return c&&Z(c,n,r,o,e,i)()}))}}return a}function Uo(e,t){let n=[],r=[],i=[],a=Math.max(t.matched.length,e.matched.length);for(let o=0;o<a;o++){let a=t.matched[o];a&&(e.matched.find(e=>xo(e,a))?r.push(a):n.push(a));let s=e.matched[o];s&&(t.matched.find(e=>xo(e,s))||i.push(s))}return[n,r,i]}var Wo=()=>location.protocol+`//`+location.host;function Go(e,t){let{pathname:n,search:r,hash:i}=t,a=e.indexOf(`#`);if(a>-1){let t=i.includes(e.slice(a))?e.slice(a).length:1,n=i.slice(t);return n[0]!==`/`&&(n=`/`+n),yo(n,``)}return yo(n,e)+r+i}function Ko(e,t,n,r){let i=[],a=[],o=null,s=({state:a})=>{let s=Go(e,location),c=n.value,l=t.value,u=0;if(a){if(n.value=s,t.value=a,o&&o===c){o=null;return}u=l?a.position-l.position:0}else r(s);i.forEach(e=>{e(n.value,c,{delta:u,type:`pop`,direction:u?u>0?`forward`:`back`:``})})};function c(){o=n.value}function l(e){i.push(e);let t=()=>{let t=i.indexOf(e);t>-1&&i.splice(t,1)};return a.push(t),t}function u(){if(document.visibilityState===`hidden`){let{history:e}=window;if(!e.state)return;e.replaceState(q({},e.state,{scroll:Ao()}),``)}}function d(){for(let e of a)e();a=[],window.removeEventListener(`popstate`,s),window.removeEventListener(`pagehide`,u),document.removeEventListener(`visibilitychange`,u)}return window.addEventListener(`popstate`,s),window.addEventListener(`pagehide`,u),document.addEventListener(`visibilitychange`,u),{pauseListeners:c,listen:l,destroy:d}}function qo(e,t,n,r=!1,i=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:i?Ao():null}}function Jo(e){let{history:t,location:n}=window,r={value:Go(e,n)},i={value:t.state};i.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function a(r,a,o){let s=e.indexOf(`#`),c=s>-1?(n.host&&document.querySelector(`base`)?e:e.slice(s))+r:Wo()+e+r;try{t[o?`replaceState`:`pushState`](a,``,c),i.value=a}catch(e){console.error(e),n[o?`replace`:`assign`](c)}}function o(e,n){a(e,q({},t.state,qo(i.value.back,e,i.value.forward,!0),n,{position:i.value.position}),!0),r.value=e}function s(e,n){let o=q({},i.value,t.state,{forward:e,scroll:Ao()});a(o.current,o,!0),a(e,q({},qo(r.value,e,null),{position:o.position+1},n),!1),r.value=e}return{location:r,state:i,push:s,replace:o}}function Yo(e){e=Eo(e);let t=Jo(e),n=Ko(e,t.state,t.location,t.replace);function r(e,t=!0){t||n.pauseListeners(),history.go(e)}let i=q({location:``,base:e,go:r,createHref:Oo.bind(null,e)},t,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>t.state.value}),i}var Xo={type:0,value:``},Zo=/[a-zA-Z0-9_]/;function Qo(e){if(!e)return[[]];if(e===`/`)return[[Xo]];if(!e.startsWith(`/`))throw Error(`Invalid path "${e}"`);function t(e){throw Error(`ERR (${n})/"${l}": ${e}`)}let n=0,r=n,i=[],a;function o(){a&&i.push(a),a=[]}let s=0,c,l=``,u=``;function d(){l&&=(n===0?a.push({type:0,value:l}):n===1||n===2||n===3?(a.length>1&&(c===`*`||c===`+`)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:l,regexp:u,repeatable:c===`*`||c===`+`,optional:c===`*`||c===`?`})):t(`Invalid state to consume buffer`),``)}function f(){l+=c}for(;s<e.length;)switch(c=e[s++],n){case 0:c===`\\`?(r=n,n=4):c===`/`?(l&&d(),o()):c===`:`?(d(),n=1):f();break;case 4:f(),n=r;break;case 1:c===`(`?n=2:Zo.test(c)?f():(d(),n=0,c!==`*`&&c!==`?`&&c!==`+`&&s--);break;case 2:c===`)`?u[u.length-1]==`\\`?u=u.slice(0,-1)+c:n=3:u+=c;break;case 3:d(),n=0,c!==`*`&&c!==`?`&&c!==`+`&&s--,u=``;break;default:t(`Unknown state`);break}return n===2&&t(`Unfinished custom RegExp for param "${l}"`),d(),o(),i}var $o=`[^/]+?`,es={sensitive:!1,strict:!1,start:!0,end:!0},ts=/[.+*?^${}()[\]/\\]/g;function ns(e,t){let n=q({},es,t),r=[],i=n.start?`^`:``,a=[];for(let t of e){let e=t.length?[]:[90];n.strict&&!t.length&&(i+=`/`);for(let r=0;r<t.length;r++){let o=t[r],s=40+(n.sensitive?.25:0);if(o.type===0)r||(i+=`/`),i+=o.value.replace(ts,`\\$&`),s+=40;else if(o.type===1){let{value:e,repeatable:n,optional:c,regexp:l}=o;a.push({name:e,repeatable:n,optional:c});let u=l||$o;if(u!==$o){s+=10;try{RegExp(`(${u})`)}catch(t){throw Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let d=n?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;r||(d=c&&t.length<2?`(?:/${d})`:`/`+d),c&&(d+=`?`),i+=d,s+=20,c&&(s+=-8),n&&(s+=-20),u===`.*`&&(s+=-50)}e.push(s)}r.push(e)}if(n.strict&&n.end){let e=r.length-1;r[e][r[e].length-1]+=.7000000000000001}n.strict||(i+=`/?`),n.end?i+=`$`:n.strict&&!i.endsWith(`/`)&&(i+=`(?:/|$)`);let o=new RegExp(i,n.sensitive?``:`i`);function s(e){let t=e.match(o),n={};if(!t)return null;for(let e=1;e<t.length;e++){let r=t[e]||``,i=a[e-1];n[i.name]=r&&i.repeatable?r.split(`/`):r}return n}function c(t){let n=``,r=!1;for(let i of e){(!r||!n.endsWith(`/`))&&(n+=`/`),r=!1;for(let e of i)if(e.type===0)n+=e.value;else if(e.type===1){let{value:a,repeatable:o,optional:s}=e,c=a in t?t[a]:``;if(J(c)&&!o)throw Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);let l=J(c)?c.join(`/`):c;if(!l)if(s)i.length<2&&(n.endsWith(`/`)?n=n.slice(0,-1):r=!0);else throw Error(`Missing required param "${a}"`);n+=l}}return n||`/`}return{re:o,score:r,keys:a,parse:s,stringify:c}}function rs(e,t){let n=0;for(;n<e.length&&n<t.length;){let r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function is(e,t){let n=0,r=e.score,i=t.score;for(;n<r.length&&n<i.length;){let e=rs(r[n],i[n]);if(e)return e;n++}if(Math.abs(i.length-r.length)===1){if(as(r))return 1;if(as(i))return-1}return i.length-r.length}function as(e){let t=e[e.length-1];return e.length>0&&t[t.length-1]<0}var os={strict:!1,end:!0,sensitive:!1};function ss(e,t,n){let r=q(ns(Qo(e.path),n),{record:e,parent:t,children:[],alias:[]});return t&&!r.record.aliasOf==!t.record.aliasOf&&t.children.push(r),r}function cs(e,t){let n=[],r=new Map;t=La(os,t);function i(e){return r.get(e)}function a(e,n,r){let i=!r,s=us(e);s.aliasOf=r&&r.record;let l=La(t,e),u=[s];if(`alias`in e){let t=typeof e.alias==`string`?[e.alias]:e.alias;for(let e of t)u.push(us(q({},s,{components:r?r.record.components:s.components,path:e,aliasOf:r?r.record:s})))}let d,f;for(let t of u){let{path:u}=t;if(n&&u[0]!==`/`){let e=n.record.path,r=e[e.length-1]===`/`?``:`/`;t.path=n.record.path+(u&&r+u)}if(d=ss(t,n,l),r?r.alias.push(d):(f||=d,f!==d&&f.alias.push(d),i&&e.name&&!fs(d)&&o(e.name)),gs(d)&&c(d),s.children){let e=s.children;for(let t=0;t<e.length;t++)a(e[t],d,r&&r.children[t])}r||=d}return f?()=>{o(f)}:Ia}function o(e){if(Lo(e)){let t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(o),t.alias.forEach(o))}else{let t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(o),e.alias.forEach(o))}}function s(){return n}function c(e){let t=ms(e,n);n.splice(t,0,e),e.record.name&&!fs(e)&&r.set(e.record.name,e)}function l(e,t){let i,a={},o,s;if(`name`in e&&e.name){if(i=r.get(e.name),!i)throw za(1,{location:e});s=i.record.name,a=q(ls(t.params,i.keys.filter(e=>!e.optional).concat(i.parent?i.parent.keys.filter(e=>e.optional):[]).map(e=>e.name)),e.params&&ls(e.params,i.keys.map(e=>e.name))),o=i.stringify(a)}else if(e.path!=null)o=e.path,i=n.find(e=>e.re.test(o)),i&&(a=i.parse(o),s=i.record.name,i.keys.forEach(e=>{e.optional&&!a[e.name]&&delete a[e.name]}));else{if(i=t.name?r.get(t.name):n.find(e=>e.re.test(t.path)),!i)throw za(1,{location:e,currentLocation:t});s=i.record.name,a=q({},t.params,e.params),o=i.stringify(a)}let c=[],l=i;for(;l;)c.unshift(l.record),l=l.parent;return{name:s,path:o,params:a,matched:c,meta:ps(c)}}e.forEach(e=>a(e));function u(){n.length=0,r.clear()}return{addRoute:a,resolve:l,removeRoute:o,clearRoutes:u,getRoutes:s,getRecordMatcher:i}}function ls(e,t){let n={};for(let r of t)r in e&&(n[r]=e[r]);return n}function us(e){let t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:ds(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:`components`in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function ds(e){let t={},n=e.props||!1;if(`component`in e)t.default=n;else for(let r in e.components)t[r]=typeof n==`object`?n[r]:n;return t}function fs(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function ps(e){return e.reduce((e,t)=>q(e,t.meta),{})}function ms(e,t){let n=0,r=t.length;for(;n!==r;){let i=n+r>>1;is(e,t[i])<0?r=i:n=i+1}let i=hs(e);return i&&(r=t.lastIndexOf(i,r-1)),r}function hs(e){let t=e;for(;t=t.parent;)if(gs(t)&&is(e,t)===0)return t}function gs({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function _s(e){let t=v(Ha),n=v(Ua),r=N(()=>{let n=O(e.to);return t.resolve(n)}),i=N(()=>{let{matched:e}=r.value,{length:t}=e,i=e[t-1],a=n.matched;if(!i||!a.length)return-1;let o=a.findIndex(xo.bind(null,i));if(o>-1)return o;let s=Ss(e[t-2]);return t>1&&Ss(i)===s&&a[a.length-1].path!==s?a.findIndex(xo.bind(null,e[t-2])):o}),a=N(()=>i.value>-1&&xs(n.params,r.value.params)),o=N(()=>i.value>-1&&i.value===n.matched.length-1&&So(n.params,r.value.params));function s(n={}){if(bs(n)){let n=t[O(e.replace)?`replace`:`push`](O(e.to)).catch(Ia);return e.viewTransition&&typeof document<`u`&&`startViewTransition`in document&&document.startViewTransition(()=>n),n}return Promise.resolve()}return{route:r,href:N(()=>r.value.href),isActive:a,isExactActive:o,navigate:s}}function vs(e){return e.length===1?e[0]:e}var ys=P({name:`RouterLink`,compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:`page`},viewTransition:Boolean},useLink:_s,setup(e,{slots:t}){let n=C(_s(e)),{options:r}=v(Ha),i=N(()=>({[Cs(e.activeClass,r.linkActiveClass,`router-link-active`)]:n.isActive,[Cs(e.exactActiveClass,r.linkExactActiveClass,`router-link-exact-active`)]:n.isExactActive}));return()=>{let r=t.default&&vs(t.default(n));return e.custom?r:F(`a`,{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},r)}}});function bs(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){let t=e.currentTarget.getAttribute(`target`);if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function xs(e,t){for(let n in t){let r=t[n],i=e[n];if(typeof r==`string`){if(r!==i)return!1}else if(!J(i)||i.length!==r.length||r.some((e,t)=>e.valueOf()!==i[t].valueOf()))return!1}return!0}function Ss(e){return e?e.aliasOf?e.aliasOf.path:e.path:``}var Cs=(e,t,n)=>e??t??n,ws=P({name:`RouterView`,inheritAttrs:!1,props:{name:{type:String,default:`default`},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){let r=v(Wa),i=N(()=>e.route||r.value),a=v(Va,0),o=N(()=>{let e=O(a),{matched:t}=i.value,n;for(;(n=t[e])&&!n.components;)e++;return e}),s=N(()=>i.value.matched[o.value]);E(Va,N(()=>o.value+1)),E(Ba,s),E(Wa,i);let c=De();return ee(()=>[c.value,s.value,e.name],([e,t,n],[r,i,a])=>{t&&(t.instances[n]=e,i&&i!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=i.leaveGuards),t.updateGuards.size||(t.updateGuards=i.updateGuards))),e&&t&&(!i||!xo(t,i)||!r)&&(t.enterCallbacks[n]||[]).forEach(t=>t(e))},{flush:`post`}),()=>{let r=i.value,a=e.name,o=s.value,l=o&&o.components[a];if(!l)return Ts(n.default,{Component:l,route:r});let u=o.props[a],d=F(l,q({},u?u===!0?r.params:typeof u==`function`?u(r):u:null,t,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(o.instances[a]=null)},ref:c}));return Ts(n.default,{Component:d,route:r})||d}}});function Ts(e,t){if(!e)return null;let n=e(t);return n.length===1?n[0]:n}var Es=ws;function Ds(e){let t=cs(e.routes,e),n=e.parseQuery||Ro,r=e.stringifyQuery||zo,i=e.history,a=Vo(),o=Vo(),s=Vo(),c=oe(X),l=X;Ka&&e.scrollBehavior&&`scrollRestoration`in history&&(history.scrollRestoration=`manual`);let u=Fa.bind(null,e=>``+e),d=Fa.bind(null,po),f=Fa.bind(null,mo);function p(e,n){let r,i;return Lo(e)?(r=t.getRecordMatcher(e),i=n):i=e,t.addRoute(i,r)}function m(e){let n=t.getRecordMatcher(e);n&&t.removeRoute(n)}function h(){return t.getRoutes().map(e=>e.record)}function g(e){return!!t.getRecordMatcher(e)}function _(e,a){if(a=q({},a||c.value),typeof e==`string`){let r=_o(n,e,a.path),o=t.resolve({path:r.path},a),s=i.createHref(r.fullPath);return q(r,o,{params:f(o.params),redirectedFrom:void 0,href:s})}let o;if(e.path!=null)o=q({},e,{path:_o(n,e.path,a.path).path});else{let t=q({},e.params);for(let e in t)t[e]??delete t[e];o=q({},e,{params:d(t)}),a.params=d(a.params)}let s=t.resolve(o,a),l=e.hash||``;s.params=u(f(s.params));let p=vo(r,q({},e,{hash:co(l),path:s.path})),m=i.createHref(p);return q({fullPath:p,hash:l,query:r===zo?Bo(e.query):e.query||{}},s,{redirectedFrom:void 0,href:m})}function v(e){return typeof e==`string`?_o(n,e,c.value.path):q({},e)}function y(e,t){if(l!==e)return za(8,{from:t,to:e})}function x(e){return T(e)}function C(e){return x(q(v(e),{replace:!0}))}function w(e,t){let n=e.matched[e.matched.length-1];if(n&&n.redirect){let{redirect:r}=n,i=typeof r==`function`?r(e,t):r;return typeof i==`string`&&(i=i.includes(`?`)||i.includes(`#`)?i=v(i):{path:i},i.params={}),q({query:e.query,hash:e.hash,params:i.path==null?e.params:{}},i)}}function T(e,t){let n=l=_(e),i=c.value,a=e.state,o=e.force,s=e.replace===!0,u=w(n,i);if(u)return T(q(v(u),{state:typeof u==`object`?q({},a,u.state):a,force:o,replace:s}),t||n);let d=n;d.redirectedFrom=t;let f;return!o&&bo(r,i,n)&&(f=za(16,{to:d,from:i}),de(i,i,!0,!1)),(f?Promise.resolve(f):ee(d,i)).catch(e=>Y(e)?Y(e,2)?e:ue(e):ce(e,d,i)).then(e=>{if(e){if(Y(e,2))return T(q({replace:s},v(e.to),{state:typeof e.to==`object`?q({},a,e.to.state):a,force:o}),t||d)}else e=ne(d,i,!0,s,a);return te(d,i,e),e})}function E(e,t){let n=y(e,t);return n?Promise.reject(n):Promise.resolve()}function D(e){let t=pe.values().next().value;return t&&typeof t.runWithContext==`function`?t.runWithContext(e):e()}function ee(e,t){let n,[r,i,s]=Uo(e,t);n=Ho(r.reverse(),`beforeRouteLeave`,e,t);for(let i of r)i.leaveGuards.forEach(r=>{n.push(Z(r,e,t))});let c=E.bind(null,e,t);return n.push(c),j(n).then(()=>{n=[];for(let r of a.list())n.push(Z(r,e,t));return n.push(c),j(n)}).then(()=>{n=Ho(i,`beforeRouteUpdate`,e,t);for(let r of i)r.updateGuards.forEach(r=>{n.push(Z(r,e,t))});return n.push(c),j(n)}).then(()=>{n=[];for(let r of s)if(r.beforeEnter)if(J(r.beforeEnter))for(let i of r.beforeEnter)n.push(Z(i,e,t));else n.push(Z(r.beforeEnter,e,t));return n.push(c),j(n)}).then(()=>(e.matched.forEach(e=>e.enterCallbacks={}),n=Ho(s,`beforeRouteEnter`,e,t,D),n.push(c),j(n))).then(()=>{n=[];for(let r of o.list())n.push(Z(r,e,t));return n.push(c),j(n)}).catch(e=>Y(e,8)?e:Promise.reject(e))}function te(e,t,n){s.list().forEach(r=>D(()=>r(e,t,n)))}function ne(e,t,n,r,a){let o=y(e,t);if(o)return o;let s=t===X,l=Ka?history.state:{};n&&(r||s?i.replace(e.fullPath,q({scroll:s&&l&&l.scroll},a)):i.push(e.fullPath,a)),c.value=e,de(e,t,n,s),ue()}let re;function ie(){re||=i.listen((e,t,n)=>{if(!me.listening)return;let r=_(e),a=w(r,me.currentRoute.value);if(a){T(q(a,{replace:!0,force:!0}),r).catch(Ia);return}l=r;let o=c.value;Ka&&Po(Mo(o.fullPath,n.delta),Ao()),ee(r,o).catch(e=>Y(e,12)?e:Y(e,2)?(T(q(v(e.to),{force:!0}),r).then(e=>{Y(e,20)&&!n.delta&&n.type===`pop`&&i.go(-1,!1)}).catch(Ia),Promise.reject()):(n.delta&&i.go(-n.delta,!1),ce(e,r,o))).then(e=>{e||=ne(r,o,!1),e&&(n.delta&&!Y(e,8)?i.go(-n.delta,!1):n.type===`pop`&&Y(e,20)&&i.go(-1,!1)),te(r,o,e)}).catch(Ia)})}let ae=Vo(),se=Vo(),k;function ce(e,t,n){ue(e);let r=se.list();return r.length?r.forEach(r=>r(e,t,n)):console.error(e),Promise.reject(e)}function le(){return k&&c.value!==X?Promise.resolve():new Promise((e,t)=>{ae.add([e,t])})}function ue(e){return k||(k=!e,ie(),ae.list().forEach(([t,n])=>e?n(e):t()),ae.reset()),e}function de(t,n,r,i){let{scrollBehavior:a}=e;if(!Ka||!a)return Promise.resolve();let o=!r&&Fo(Mo(t.fullPath,0))||(i||!r)&&history.state&&history.state.scroll||null;return b().then(()=>a(t,n,o)).then(e=>t===c.value&&e&&jo(e)).catch(e=>t===c.value&&ce(e,t,n))}let fe=e=>i.go(e),A,pe=new Set,me={currentRoute:c,listening:!0,addRoute:p,removeRoute:m,clearRoutes:t.clearRoutes,hasRoute:g,getRoutes:h,resolve:_,options:e,push:x,replace:C,go:fe,back:()=>fe(-1),forward:()=>fe(1),beforeEach:a.add,beforeResolve:o.add,afterEach:s.add,onError:se.add,isReady:le,install(e){e.component(`RouterLink`,ys),e.component(`RouterView`,Es),e.config.globalProperties.$router=me,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>O(c)}),Ka&&!A&&c.value===X&&(A=!0,x(i.location).catch(e=>{}));let t={};for(let e in X)Object.defineProperty(t,e,{get:()=>c.value[e],enumerable:!0});e.provide(Ha,me),e.provide(Ua,S(t)),e.provide(Wa,c);let n=e.unmount;pe.add(e),e.unmount=function(){pe.delete(e),pe.size<1&&(l=X,re&&re(),re=null,c.value=X,A=!1,k=!1),n()}}};function j(e){return e.reduce((e,t)=>e.then(()=>D(t)),Promise.resolve())}return me}var Os=(e,t)=>({default:()=>e?F(ct,e===!0?{}:e,t):t.default?.()}),ks=/(:\w+)\([^)]+\)/g,As=/(:\w+)[?+*]/g,js=/:\w+/g;function Ms(e){let t=e?.meta.key??e.path.replace(ks,`$1`).replace(As,`$1`).replace(js,t=>e.params[t.slice(1)]?.toString()||``);return typeof t==`function`?t(e):t}function Ns(e,t){return e===t||t===X?!1:Ms(e)!==Ms(t)||!e.matched.every((e,n)=>e.components&&e.components.default===t.matched[n]?.components?.default)}function Ps(e){return Array.isArray(e)?e:[e]}function Fs(e){let t=[];for(let n of e)n&&t.push({...n,onAfterLeave:n.onAfterLeave?Ps(n.onAfterLeave):void 0,onBeforeLeave:n.onBeforeLeave?Ps(n.onBeforeLeave):void 0});return Sn(...t)}var Is={scrollBehavior(e,t,n){let r=s(),i=U().options?.scrollBehaviorType??`auto`;return e.path.replace(/\/$/,``)===t.path.replace(/\/$/,``)?t.hash&&!e.hash?n??{left:0,top:0}:e.hash?{el:e.hash,top:Ls(e.hash),behavior:i}:!1:(typeof e.meta.scrollToTop==`function`?e.meta.scrollToTop(e,t):e.meta.scrollToTop)===!1?!1:t===X?Rs(e,t,n,i):new Promise(a=>{let o=()=>{requestAnimationFrame(()=>a(Rs(e,t,n,i)))};r.hooks.hookOnce(`page:loading:end`,()=>{let e=r[`~transitionPromise`];e?e.then(o):o()})})}};function Ls(e){try{let t=document.querySelector(e);if(t)return(Number.parseFloat(getComputedStyle(t).scrollMarginTop)||0)+(Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||0)}catch{}return 0}function Rs(e,t,n,r){return n||(e.hash?{el:e.hash,top:Ls(e.hash),behavior:Ns(e,t)?r:`instant`}:{left:0,top:0})}var Q={hashMode:!1,scrollBehaviorType:`auto`,...Is},zs=[Ln(async e=>{let t,n;if(!e.meta?.validate)return;let r=([t,n]=i(()=>Promise.resolve(e.meta.validate(e))),t=await t,n(),t);if(r!==!0)return W({fatal:!0,status:r&&(r.status||r.statusCode)||404,statusText:r&&(r.statusText||r.statusMessage)||`Page Not Found: ${e.fullPath}`,data:{path:e.fullPath}})},1),Ln(e=>{let t=Ki({path:e.path});if(t.redirect){let n=t.redirect.includes(`#`)?t.redirect:t.redirect+e.hash;return qe(n,{acceptRelative:!0})?(window.location.href=n,!1):n}})],Bs={},Vs=[{name:`confirm`,path:`/confirm`,meta:{layout:!1},component:()=>Bi(()=>import(`./Bp_tvWCv.js`),__vite__mapDeps([0,1,2]),import.meta.url)},{name:`login`,path:`/login`,meta:{layout:!1},component:()=>Bi(()=>import(`./BGVrjGLA.js`),__vite__mapDeps([3,1,2]),import.meta.url)},{name:`index`,path:`/`,component:()=>Bi(()=>import(`./BEGRh-5H.js`),__vite__mapDeps([4,1]),import.meta.url)}];function Hs(e,t,n){let{pathname:r,search:i,hash:a}=t,o=e.indexOf(`#`);if(o>-1){let t=a.includes(e.slice(o))?e.slice(o).length:1,n=a.slice(t);return n[0]!==`/`&&(n=`/`+n),Ke(n,``)}let s=Ke(r,e),c=!n||He(s,n)?s:n;return c+(c.includes(`?`)?``:i)+a}var Us=f({name:`nuxt:router`,enforce:`pre`,async setup(e){let n,r,a=t().app.baseURL,o=Q.history?.(a)??Yo(a),s=Q.routes?([n,r]=i(()=>Q.routes(Vs)),n=await n,r(),n)??Vs:Vs,c,l=Ds({...Q,scrollBehavior:(e,t,n)=>{if(t===X){c=n;return}if(Q.scrollBehavior){if(l.options.scrollBehavior=Q.scrollBehavior,`scrollRestoration`in window.history){let e=l.beforeEach(()=>{e(),window.history.scrollRestoration=`manual`})}return Q.scrollBehavior(e,X,c||n)}},history:o,routes:s});`scrollRestoration`in window.history&&(window.history.scrollRestoration=`auto`),e.vueApp.use(l);let u=oe(l.currentRoute.value);l.afterEach((e,t)=>{u.value=t}),Object.defineProperty(e.vueApp.config.globalProperties,"previousRoute",{get:()=>u.value});let d=Hs(a,window.location,e.payload.path),f=oe(l.currentRoute.value),p=()=>{f.value=l.currentRoute.value};l.afterEach((e,t)=>{let n=e.matched.at(-1)?.components?.default,r=t.matched.at(-1)?.components?.default;if(n===r){Aa({route:e,Component:{type:n}})===Aa({route:t,Component:{type:r}})&&p();return}e.matched.length<t.matched.length&&e.matched.every((e,n)=>e.components?.default===t.matched[n]?.components?.default)&&p()});let m={sync:p};for(let e in f.value)Object.defineProperty(m,e,{get:()=>f.value[e],enumerable:!0});e._route=S(m),e._middleware||={global:[],named:{}};let h=Un();l.afterEach(async(t,n,r)=>{delete e._processingMiddleware,!e.isHydrating&&h.value&&await e.runWithContext(qn),r&&await e.callHook(`page:loading:end`)});try{[n,r]=i(()=>l.isReady()),await n,r()}catch(t){[n,r]=i(()=>Kn(e,t)),await n,r()}let g=d===l.currentRoute.value.fullPath?l.currentRoute.value:l.resolve(d),_=l.currentRoute.value.fullPath,v=e.isHydrating&&e.payload.prerenderedAt&&e.payload.path&&d!==e.payload.path&&He(l.currentRoute.value.path,e.payload.path);p();function y(t){!e.isHydrating&&t.fullPath!==Hs(a,window.location)&&o.push(t.fullPath)}let b=e.payload.state._layout;return l.beforeEach(async(t,n)=>{await e.callHook(`page:loading:start`),t.meta=C(t.meta),e.isHydrating&&b&&!ie(t.meta.layout)&&(t.meta.layout=b),e._processingMiddleware=!0;{let r=new Set([...zs,...e._middleware.global]);for(let e of t.matched){let t=e.meta.middleware;if(t)for(let e of Ma(t))r.add(e)}let i=Ki({path:t.path});if(i.appMiddleware)for(let e in i.appMiddleware)i.appMiddleware[e]?r.add(e):r.delete(e);for(let i of r){let r=typeof i==`string`?e._middleware.named[i]||await Bs[i]?.().then(e=>e.default||e):i;if(!r)throw vn.NUXT_E2004({entry:String(i),validMiddleware:void 0});try{let i=await e.runWithContext(()=>r(t,n));if(!e.payload.serverRendered&&e.isHydrating&&(i===!1||i instanceof Error)){let t=i||W({status:404,statusText:`Page Not Found: ${d}`});return await e.runWithContext(()=>Wn(t)),!1}if(i===!0)continue;if(i===!1)return i;if(i)return Jn(i)&&i.fatal&&(await e.runWithContext(()=>Wn(i)),y(t)),i}catch(n){let r=W(n);return r.fatal&&(await e.runWithContext(()=>Wn(r)),y(t)),r}}}}),l.onError(async()=>{delete e._processingMiddleware,await e.callHook(`page:loading:end`)}),l.afterEach(t=>{if(t.matched.length===0&&!h.value)return e.runWithContext(()=>Wn(W({status:404,fatal:!1,statusText:`Page not found: ${t.fullPath}`,data:{path:t.fullPath}})))}),e.hooks.hookOnce(`app:created`,async()=>{try{if(`name`in g&&(g.name=void 0),l.currentRoute.value.fullPath===_)if(v){let t=l.resolve(e.payload.path);`name`in t&&(t.name=void 0),await l.replace({...t,force:!0});let n=()=>{e[`~restoreDeferredRoute`]&&(e[`~restoreDeferredRoute`]=void 0,l.currentRoute.value=l.resolve(d),p(),l.replace({...g,force:!0}).catch(()=>{}))};e[`~restoreDeferredRoute`]=n,e.hooks.hookOnce(`app:suspense:resolve`,n)}else await l.replace({...g,force:!0});l.options.scrollBehavior=Q.scrollBehavior}catch(t){await Kn(e,t)}}),{provide:{router:l}}}},1),Ws=globalThis.requestIdleCallback||(e=>{let t=Date.now(),n={didTimeout:!1,timeRemaining:()=>Math.max(0,50-(Date.now()-t))};return setTimeout(()=>{e(n)},1)}),Gs=globalThis.cancelIdleCallback||(e=>{clearTimeout(e)}),Ks=e=>{let t=s();t.isHydrating?t.hooks.hookOnce(`app:suspense:resolve`,()=>{Ws(()=>e())}):Ws(()=>e())},qs=f({name:`nuxt:payload`,setup(e){let t=new Set;U().beforeResolve(async(n,r)=>{if(n.path===r.path)return;let i=await aa(n.path);if(i){for(let n of t)delete e.static.data[n];for(let n in i.data)n in e.static.data||t.add(n),e.static.data[n]=i.data[n]}}),Ks(()=>{e.hooks.hook(`link:prefetch`,async e=>{let{hostname:t,pathname:n}=new URL(e,window.location.href);t===window.location.hostname&&await aa(e).catch(()=>{Ni.NUXT_E7003({url:e})})}),navigator.connection?.effectiveType!==`slow-2g`&&setTimeout(Gi,1e3)})}}),Js=f(()=>{let e=U();Ks(()=>{e.beforeResolve(async()=>{await new Promise(e=>{setTimeout(e,100),requestAnimationFrame(()=>{setTimeout(e,0)})})})})}),Ys=f(e=>{let t;async function n(){let r;try{r=await Gi()}catch(e){let t=e;if(!(`status`in t&&(t.status===404||t.status===403)))throw t}t&&clearTimeout(t),t=setTimeout(n,m);try{let n=await br(vr(`builds/latest.json`)+`?${Date.now()}`);n.id!==r?.id&&(e.hooks.callHook(`app:manifest:update`,n),t&&clearTimeout(t))}catch{}}Ks(()=>{t=setTimeout(n,m)})});function Xs(e={}){let t=e.path||window.location.pathname,n=new URL(t,window.location.href);if(n.host!==window.location.host)throw vn.NUXT_E2010({path:t});if(n.protocol&&ze(n.protocol))throw vn.NUXT_E2002({toPath:t,protocol:n.protocol});let r={};try{r=JSON.parse(sessionStorage.getItem(`nuxt:reload`)||`{}`)}catch{}if(e.force||r?.path!==t||r?.expires<Date.now()){try{sessionStorage.setItem(`nuxt:reload`,JSON.stringify({path:t,expires:Date.now()+(e.ttl??1e4)}))}catch{}if(e.persistState)try{sessionStorage.setItem(`nuxt:reload:state`,JSON.stringify({state:s().payload.state}))}catch{}window.location.pathname===t?window.location.reload():window.location.href=t}}var Zs=f({name:`nuxt:chunk-reload-crawler`,setup(e){let t=!0;e.hooks.hookOnce(`app:suspense:resolve`,()=>{t=!1}),e.hook(`app:chunkError`,()=>{t&&hn(navigator.userAgent)&&Xs()})}}),Qs=f({name:`nuxt:chunk-reload`,setup(e){let n=U(),r=t(),i=new Set;n.beforeEach(()=>{i.clear()}),e.hook(`app:chunkError`,({error:e})=>{i.add(e)});function a(e){Xs({path:Je(r.app.baseURL,e.fullPath),persistState:!0})}e.hook(`app:manifest:update`,()=>{n.beforeResolve(a)}),n.onError((e,t)=>{i.has(e)&&a(t)})}}),$s=f({name:`nuxt:global-components`}),$={default:k(()=>Bi(()=>import(`./B0M4vlZc.js`).then(e=>e.default||e),__vite__mapDeps([5,1]),import.meta.url))};function ec(e){if(e?.__asyncLoader&&!e.__asyncResolved)return e.__asyncLoader()}async function tc(e,t=U()){let{path:n,matched:r}=t.resolve(e);if(!r.length||(t._routePreloaded||=new Set,t._routePreloaded.has(n)))return;let i=t._preloadPromises||=[];if(i.length>4)return Promise.all(i).then(()=>tc(e,t));t._routePreloaded.add(n);for(let e of r){let t=e.components?.default;if(typeof t!=`function`)continue;let n=Promise.resolve(t()).catch(()=>{}).finally(()=>i.splice(i.indexOf(n),1));i.push(n)}await Promise.all(i)}var nc=[fa,Ta,Us,qs,Js,Ys,Zs,Qs,$s,f({name:`nuxt:prefetch`,setup(e){let t=U();e.hooks.hook(`app:mounted`,()=>{t.beforeEach(async e=>{let t=e?.meta?.layout;t&&typeof $[t]==`function`&&await $[t]()})}),e.hooks.hook(`link:prefetch`,e=>{if(qe(e))return;let n=t.resolve(e);if(!n)return;let r=n.meta.layout,i=Ma(n.meta.middleware).filter(e=>typeof e==`string`);for(let e of i){let t=Bs[e];typeof t==`function`&&t()}typeof r==`string`&&r in $&&ec($[r])})}})],rc=(e=`RouteProvider`)=>P({name:e,props:{route:{type:Object,required:!0},vnode:Object,vnodeRef:Object,renderKey:String,trackRootNodes:Boolean},setup(e){let t=e.renderKey,n=e.route,r={};for(let i in e.route)Object.defineProperty(r,i,{get:()=>t===e.renderKey?e.route[i]:n[i],enumerable:!0});return E(H,S(r)),()=>e.vnode?F(e.vnode,{ref:e.vnodeRef}):e.vnode}}),ic=rc(),ac=new WeakMap,oc=P({name:`NuxtPage`,inheritAttrs:!1,props:{name:{type:String},transition:{type:[Boolean,Object],default:void 0},keepalive:{type:[Boolean,Object],default:void 0},route:{type:Object},pageKey:{type:[Function,String],default:null}},setup(e,{attrs:t,slots:n,expose:r}){let i=s(),a=De(),o=v(H,null),c=new Set,l;r({pageRef:a});let u=v(gn,null),d,f=i.deferHydration(),p=!1,m=!1,h,g=0;if(i.isHydrating){let e=i.hooks.hookOnce(`app:error`,f),t=U().beforeEach(()=>{e(),t()})}e.pageKey&&ee(()=>e.pageKey,(e,t)=>{e!==t&&i.callHook(`page:loading:start`)});let _=!1;{let e=U().beforeResolve(()=>{_=!1});D(()=>{e(),f()})}return()=>F(Es,{name:e.name,route:e.route,...t},{default:lc(t=>{let r=sc(o,t.route,t.Component),s=o&&o.matched.length===t.route.matched.length;if(!t.Component){if(d&&!s&&!dc(d))return d;f();return}if(d&&u&&!dc(d)&&!u.isCurrent(t.route))return d;if(r&&o&&(!u||u?.isCurrent(o)))return(s||d)&&!dc(d)?d:null;let v=Aa(t,e.pageKey),y=cc(o,t.route,t.Component);!i.isHydrating&&l===v&&!y&&b(()=>{_||(_=!0,i.callHook(`page:loading:end`))}),p&&l!==v&&m&&g++,l=v;let x=!!(e.transition??t.route.meta.pageTransition??!1),S=x&&Fs([e.transition,t.route.meta.pageTransition,!1,{onAfterLeave(){i[`~transitionFinish`]?.(),delete i[`~transitionFinish`],delete i[`~transitionPromise`],i.callHook(`page:transition:finish`,t.Component)}}]),C=e.keepalive??t.route.meta.keepalive??!1,w=t.Component.type,T=w.name||w.__name;t.route.meta.keepalive&&T&&c.add(T);let E;if(c.size>0&&e.keepalive==null&&(!C||typeof C==`object`&&C&&C.include)){let e=typeof C==`object`&&C?{...C}:{},t=e.include?Array.isArray(e.include)?e.include:[e.include]:[];E={...e,include:Array.from(new Set([...t,...c]))}}else E=C;return d=Os(x&&S,ja(E,F(ce,{key:g,suspensible:!0,onPending:()=>{p=!0,x&&!i[`~transitionPromise`]&&(i[`~transitionPromise`]=new Promise(e=>{i[`~transitionFinish`]=e})),h=i.callHook(`page:start`,t.Component)},onResolve:async()=>{p=!1,m=!0,i.isHydrating&&i[`~restoreDeferredRoute`]?.();try{await b(),i._route.sync?.(),await h,await i.callHook(`page:finish`,t.Component),!_&&!y&&(_=!0,await i.callHook(`page:loading:end`))}finally{f()}}},{default:()=>{let e={key:v||void 0,vnode:n.default?uc(n.default,t):t.Component,route:t.route,renderKey:v||void 0,trackRootNodes:x,vnodeRef:a};if(!E)return F(ic,e);let r=w,i=ac.get(r);return i||(i=rc(T),ac.set(r,i)),F(i,e)}}))).default(),d})})}});function sc(e,t,n){if(!e)return!1;let r=t.matched.findIndex(e=>e.components?.default===n?.type);if(r===-1)return!1;let i=t.matched.slice(0,r).filter(e=>e.components?.default);if(!i.length)return!1;let a=e.matched.filter(e=>e.components?.default);return i.some((e,t)=>e.components?.default!==a[t]?.components?.default)||n&&Aa({route:t,Component:n})!==Aa({route:e,Component:n})}function cc(e,t,n){return e?t.matched.findIndex(e=>e.components?.default===n?.type)<t.matched.length-1:!1}function lc(e){let t=(t=>{let n=e(t);return Array.isArray(n)?n:n==null||!Ie(n)?[Ne()]:[n]});return t._n=!0,t}function uc(e,t){let n=e(t);return n.length===1?F(n[0]):F(Oe,void 0,n)}function dc(e){return!!e&&(!!e.suspense?.isUnmounted||!!e.component?.isUnmounted)}var fc=Ii;function pc(e,t){return O(t)??e?.meta.layout??fc(e?.path??`/`).appLayout??`default`}var mc=P({name:`LayoutLoader`,inheritAttrs:!1,props:{name:String,layoutProps:Object},setup(e,t){return()=>F($[e.name],e.layoutProps,t.slots)}}),hc=P({name:`NuxtLayout`,inheritAttrs:!1,props:{name:{type:[String,Boolean,Object],default:null},fallback:{type:[String,Object],default:null}},setup(e,t){let n=s(),r=v(H),i=!r||r===In()?Ga():r,a=N(()=>{let t=pc(i,e.name);return t&&!(t in $)&&e.fallback&&(t=O(e.fallback)),t});E(_n,a);let o=oe();t.expose({layoutRef:o});let c=n.deferHydration();if(n.isHydrating){let e=n.hooks.hookOnce(`app:error`,c),t=U().beforeEach(()=>{e(),t()})}let l;return()=>{let r=!!a.value&&a.value in $&&!!(i?.meta.layoutTransition??!1),s=r&&Fs([i?.meta.layoutTransition,!1,{onBeforeLeave(){n[`~transitionPromise`]=new Promise(e=>{n[`~transitionFinish`]=e})},onAfterLeave(){n[`~transitionFinish`]?.(),delete n[`~transitionFinish`],delete n[`~transitionPromise`]}}]),u=l;return l=a.value,Os(s,{default:()=>F(ce,{suspensible:!0,onResolve:async()=>{await b(c)}},{default:()=>F(gc,{layoutProps:ne(t.attrs,i.meta.layoutProps??{},{ref:o}),key:a.value||void 0,name:a.value,shouldProvide:!e.name,isRenderingNewLayout:e=>e!==u&&e===a.value,hasTransition:r},t.slots)})}).default()}}}),gc=P({name:`NuxtLayoutProvider`,inheritAttrs:!1,props:{name:{type:[String,Boolean]},layoutProps:{type:Object},hasTransition:{type:Boolean},shouldProvide:{type:Boolean},isRenderingNewLayout:{type:Function,required:!0}},setup(e,t){let n=e.name;e.shouldProvide&&E(gn,{isCurrent:e=>n===!1||n===pc(e)});let r=v(H),i=r&&r===In(),a=v(gn,null);if(i){let t=Ga(),n={};for(let i in t){let o=i;Object.defineProperty(n,o,{enumerable:!0,get:()=>e.isRenderingNewLayout(e.name)&&(!a||a.isCurrent(t))?t[o]:r[o]})}E(H,S(n))}return()=>!n||typeof n==`string`&&!(n in $)?t.slots.default?.():F(mc,{key:n,layoutProps:e.layoutProps,name:n},t.slots)}}),_c=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},vc={};function yc(e,t){let n=oc,r=hc;return T(),M(r,null,{default:_(()=>[he(n)]),_:1})}var bc=_c(vc,[[`render`,yc]]),xc={__name:`nuxt-error-page`,props:{error:Object},setup(e){let t=e.error,n=Number(t.statusCode||500),r=n===404,i=t.statusMessage??(r?`Page Not Found`:`Internal Server Error`),a=t.message||t.toString(),o=k(()=>Bi(()=>import(`./oAaAuq3K.js`),__vite__mapDeps([6,7,1,8,9]),import.meta.url)),s=k(()=>Bi(()=>import(`./CQiHN3Or.js`),__vite__mapDeps([10,1,11]),import.meta.url)),c=r?o:s;return(e,t)=>(T(),M(O(c),ge(ue({status:O(n),statusText:O(i),statusCode:O(n),statusMessage:O(i),description:O(a),stack:O(void 0)})),null,16))}},Sc=()=>null,Cc={key:0},wc={__name:`nuxt-root`,setup(e){let t=s(),n=t.deferHydration();if(t.isHydrating){let e=t.hooks.hookOnce(`app:error`,n),r=U().beforeEach(()=>{e(),r()})}window.location.pathname,E(H,In()),t.hooks.callHookWith(e=>e.map(e=>e()),`vue:setup`,[]);let r=Un();function i(e,n,r){let i=t.vueApp.config.errorHandler;if(i&&!i.__nuxt_default)try{i(e,n,r)}catch(e){console.error("[nuxt] Error in `app.config.errorHandler`",e)}}return g((e,n,r)=>{if(t.hooks.callHook(`vue:error`,e,n,r)?.catch(e=>console.error("[nuxt] Error in `vue:error` hook",e)),hn(navigator.userAgent))return Gn(t,e),!1;if(Jn(e)&&(e.fatal||e.unhandled))return t.runWithContext(()=>Wn(e)),i(e,n,r),!1}),(e,t)=>(T(),M(ce,{onResolve:O(n)},{default:_(()=>[O(!1)?(T(),fe(`div`,Cc)):O(r)?(T(),M(O(xc),{key:1,error:O(r)},null,8,[`error`])):O(!1)?(T(),M(O(Sc),{key:2,context:O(!1)},null,8,[`context`])):O(!1)?(T(),M(w(O(!1)),{key:3})):(T(),M(O(bc),{key:4}))]),_:1},8,[`onResolve`]))}},Tc;{let e;Tc=async function(){if(e)return e;let t=!!(window.__NUXT__?.serverRendered??document.getElementById(`__NUXT_DATA__`)?.dataset.ssr===`true`),i=t?dn(wc):un(wc),a=l({vueApp:i});async function o(e){await a.callHook(`app:error`,e),a.payload.error||=W(e)}o.__nuxt_default=!0,i.config.errorHandler=o,a.hook(`app:suspense:resolve`,()=>{i.config.errorHandler===o&&(i.config.errorHandler=void 0)}),!t&&n.id&&a.hook(`app:suspense:resolve`,()=>{document.getElementById(n.id)?.remove()});try{await p(a,nc)}catch(e){o(e)}try{await a.hooks.callHook(`app:created`,i),await a.hooks.callHook(`app:beforeMount`,i),i.mount(r),await a.hooks.callHook(`app:mounted`,i),await b()}catch(e){o(e)}return i},e=Tc().catch(e=>{throw c.NUXT_E1009({cause:e}),e})}export{Ws as a,Vn as c,U as d,en as f,Gs as i,zn as l,tc as n,Mi as o,rn as p,Ks as r,br as s,_c as t,Bn as u};
```

# .output/public/_nuxt/CNs_Ozdc.js

```js
var e=e=>{};export{e as t};
```

# .output/public/_nuxt/CQiHN3Or.js

```js
import{M as e,_t as t,c as n,d as r}from"./BWlekpQc.js";import{o as i,t as a}from"#entry";var o={class:`antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide`},s={class:`max-w-520px text-center`},c=[`textContent`],l=[`textContent`],u=[`textContent`],d=a({__name:`error-500`,props:{appName:{type:String,default:`Nuxt`},status:{type:Number,default:500},statusText:{type:String,default:`Internal server error`},description:{type:String,default:`This page is temporarily unavailable.`},refresh:{type:String,default:`Refresh this page`}},setup(a){let d=a;return i({title:`${d.status} - ${d.statusText} | ${d.appName}`,script:[{innerHTML:`!function(){let e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(let e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(let t of e)if("childList"===t.type)for(let e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;let r=function(e){let r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();`}],style:[{innerHTML:`*,:after,:before{box-sizing:border-box;border-style:solid;border-width:0;border-color:var(--un-default-border-color,#e5e7eb)}:after,:before{--un-content:""}html{-webkit-text-size-adjust:100%;tab-size:4;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 #0000;--un-ring-shadow:0 0 #0000;--un-shadow-inset: ;--un-shadow:0 0 #0000;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:#93c5fd80;--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }`}]}),(i,d)=>(e(),r(`div`,o,[n(`div`,s,[n(`h1`,{class:`font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]`,textContent:t(a.status)},null,8,c),n(`h2`,{class:`font-semibold mb-2 sm:text-3xl text-2xl`,textContent:t(a.statusText)},null,8,l),n(`p`,{class:`mb-4 px-2 text-[#64748B] text-md`,textContent:t(a.description)},null,8,u)])]))}},[[`__scopeId`,`data-v-e51fa8ac`]]);export{d as default};
```

# .output/public/_nuxt/entry.CCFoIGny.css

```css
/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,::backdrop,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-space-y-reverse:0;--tw-divide-y-reverse:0;--tw-border-style:solid;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-duration:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-outline-style:solid}}}@layer theme{:host,:root{--font-sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-red-300:oklch(80.8% .114 19.571);--color-red-400:oklch(70.4% .191 22.216);--color-red-500:oklch(63.7% .237 25.331);--color-red-950:oklch(25.8% .092 26.042);--color-amber-300:oklch(87.9% .169 91.605);--color-amber-400:oklch(82.8% .189 84.429);--color-amber-500:oklch(76.9% .188 70.08);--color-amber-950:oklch(27.9% .077 45.635);--color-emerald-300:oklch(84.5% .143 164.978);--color-emerald-400:oklch(76.5% .177 163.223);--color-emerald-500:oklch(69.6% .17 162.48);--color-emerald-600:oklch(59.6% .145 163.225);--color-emerald-950:oklch(26.2% .051 172.552);--color-sky-200:oklch(90.1% .058 230.902);--color-sky-400:oklch(74.6% .16 232.661);--color-sky-500:oklch(68.5% .169 237.323);--color-sky-900:oklch(39.1% .09 240.876);--color-sky-950:oklch(29.3% .066 243.157);--color-indigo-300:oklch(78.5% .115 274.713);--color-indigo-400:oklch(67.3% .182 276.935);--color-indigo-500:oklch(58.5% .233 277.117);--color-indigo-600:oklch(51.1% .262 276.966);--color-indigo-950:oklch(25.7% .09 281.288);--color-violet-400:oklch(70.2% .183 293.541);--color-violet-500:oklch(60.6% .25 292.717);--color-violet-950:oklch(28.3% .141 291.089);--color-purple-200:oklch(90.2% .063 306.703);--color-purple-300:oklch(82.7% .119 306.383);--color-purple-400:oklch(71.4% .203 305.504);--color-purple-500:oklch(62.7% .265 303.9);--color-purple-900:oklch(38.1% .176 304.987);--color-rose-400:oklch(71.2% .194 13.428);--color-gray-100:oklch(96.7% .003 264.542);--color-gray-200:oklch(92.8% .006 264.531);--color-gray-300:oklch(87.2% .01 258.338);--color-gray-400:oklch(70.7% .022 261.325);--color-gray-500:oklch(55.1% .027 264.364);--color-gray-600:oklch(44.6% .03 256.802);--color-gray-700:oklch(37.3% .034 259.733);--color-gray-800:oklch(27.8% .033 256.848);--color-gray-900:oklch(21% .034 264.665);--color-gray-950:oklch(13% .028 261.692);--color-white:#fff;--spacing:.25rem;--container-5xl:64rem;--text-xs:.75rem;--text-xs--line-height:1.33333;--text-sm:.875rem;--text-sm--line-height:1.42857;--text-base:1rem;--text-base--line-height:1.5;--text-lg:1.125rem;--text-lg--line-height:1.55556;--text-2xl:1.5rem;--text-2xl--line-height:1.33333;--text-3xl:1.875rem;--text-3xl--line-height:1.2;--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--font-weight-extrabold:800;--font-weight-black:900;--tracking-tight:-.025em;--tracking-wider:.05em;--leading-relaxed:1.625;--radius-md:.375rem;--radius-lg:.5rem;--radius-xl:.75rem;--radius-2xl:1rem;--animate-spin:spin 1s linear infinite;--blur-sm:8px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,::backdrop,:after,:before{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}:host,html{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}menu,ol,ul{list-style:none}audio,canvas,embed,iframe,img,object,svg,video{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,optgroup,select,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.absolute{position:absolute}.relative{position:relative}.top-0{top:0}.top-1\/2{top:50%}.bottom-0{bottom:0}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.mx-auto{margin-inline:auto}.my-1{margin-block:var(--spacing)}.mt-0\.5{margin-top:calc(var(--spacing)*.5)}.mt-1{margin-top:var(--spacing)}.mt-3{margin-top:calc(var(--spacing)*3)}.mb-2{margin-bottom:calc(var(--spacing)*2)}.ml-1{margin-left:var(--spacing)}.flex{display:flex}.grid{display:grid}.inline-flex{display:inline-flex}.h-2{height:calc(var(--spacing)*2)}.h-2\.5{height:calc(var(--spacing)*2.5)}.h-3{height:calc(var(--spacing)*3)}.h-3\.5{height:calc(var(--spacing)*3.5)}.h-4{height:calc(var(--spacing)*4)}.h-4\.5{height:calc(var(--spacing)*4.5)}.h-5{height:calc(var(--spacing)*5)}.h-8{height:calc(var(--spacing)*8)}.h-16{height:calc(var(--spacing)*16)}.min-h-screen{min-height:100vh}.w-0\.5{width:calc(var(--spacing)*.5)}.w-1{width:var(--spacing)}.w-2{width:calc(var(--spacing)*2)}.w-2\.5{width:calc(var(--spacing)*2.5)}.w-3{width:calc(var(--spacing)*3)}.w-3\.5{width:calc(var(--spacing)*3.5)}.w-4{width:calc(var(--spacing)*4)}.w-4\.5{width:calc(var(--spacing)*4.5)}.w-5{width:calc(var(--spacing)*5)}.w-full{width:100%}.max-w-5xl{max-width:var(--container-5xl)}.flex-1{flex:1}.shrink-0{flex-shrink:0}.-translate-x-1\/2{--tw-translate-x:-50%}.-translate-x-1\/2,.-translate-y-1\/2{translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-1\/2{--tw-translate-y:-50%}.animate-spin{animation:var(--animate-spin)}.\[appearance\:textfield\]{appearance:textfield}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-baseline{align-items:baseline}.items-center{align-items:center}.items-end{align-items:flex-end}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-1{gap:var(--spacing)}.gap-1\.5{gap:calc(var(--spacing)*1.5)}.gap-2{gap:calc(var(--spacing)*2)}.gap-2\.5{gap:calc(var(--spacing)*2.5)}.gap-3{gap:calc(var(--spacing)*3)}.gap-4{gap:calc(var(--spacing)*4)}.gap-6{gap:calc(var(--spacing)*6)}:where(.space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(var(--spacing)*var(--tw-space-y-reverse));margin-block-end:calc(var(--spacing)*(1 - var(--tw-space-y-reverse)))}:where(.space-y-1\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(var(--spacing)*1.5*var(--tw-space-y-reverse));margin-block-end:calc(var(--spacing)*1.5*(1 - var(--tw-space-y-reverse)))}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(var(--spacing)*2*var(--tw-space-y-reverse));margin-block-end:calc(var(--spacing)*2*(1 - var(--tw-space-y-reverse)))}:where(.space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(var(--spacing)*3*var(--tw-space-y-reverse));margin-block-end:calc(var(--spacing)*3*(1 - var(--tw-space-y-reverse)))}:where(.space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(var(--spacing)*4*var(--tw-space-y-reverse));margin-block-end:calc(var(--spacing)*4*(1 - var(--tw-space-y-reverse)))}:where(.space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(var(--spacing)*6*var(--tw-space-y-reverse));margin-block-end:calc(var(--spacing)*6*(1 - var(--tw-space-y-reverse)))}:where(.space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(var(--spacing)*8*var(--tw-space-y-reverse));margin-block-end:calc(var(--spacing)*8*(1 - var(--tw-space-y-reverse)))}:where(.divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px*var(--tw-divide-y-reverse));border-bottom-width:calc(1px*(1 - var(--tw-divide-y-reverse)))}.truncate{text-overflow:ellipsis;white-space:nowrap}.overflow-hidden,.truncate{overflow:hidden}.rounded{border-radius:.25rem}.rounded-full{border-radius:2147483647px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-2{border-style:var(--tw-border-style);border-width:2px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-dashed{--tw-border-style:dashed;border-style:dashed}.border-amber-500\/30{border-color:#f99c004d}@supports (color:color-mix(in lab,red,red)){.border-amber-500\/30{border-color:color-mix(in oklab,var(--color-amber-500) 30%,transparent)}}.border-emerald-500\/20{border-color:#00bb7f33}@supports (color:color-mix(in lab,red,red)){.border-emerald-500\/20{border-color:color-mix(in oklab,var(--color-emerald-500) 20%,transparent)}}.border-emerald-500\/30{border-color:#00bb7f4d}@supports (color:color-mix(in lab,red,red)){.border-emerald-500\/30{border-color:color-mix(in oklab,var(--color-emerald-500) 30%,transparent)}}.border-gray-700{border-color:var(--color-gray-700)}.border-gray-800{border-color:var(--color-gray-800)}.border-gray-800\/80{border-color:#1e2939cc}@supports (color:color-mix(in lab,red,red)){.border-gray-800\/80{border-color:color-mix(in oklab,var(--color-gray-800) 80%,transparent)}}.border-gray-950{border-color:var(--color-gray-950)}.border-indigo-500\/20{border-color:#625fff33}@supports (color:color-mix(in lab,red,red)){.border-indigo-500\/20{border-color:color-mix(in oklab,var(--color-indigo-500) 20%,transparent)}}.border-purple-500\/50{border-color:#ac4bff80}@supports (color:color-mix(in lab,red,red)){.border-purple-500\/50{border-color:color-mix(in oklab,var(--color-purple-500) 50%,transparent)}}.border-red-500\/30{border-color:#fb2c364d}@supports (color:color-mix(in lab,red,red)){.border-red-500\/30{border-color:color-mix(in oklab,var(--color-red-500) 30%,transparent)}}.border-sky-500\/20{border-color:#00a5ef33}@supports (color:color-mix(in lab,red,red)){.border-sky-500\/20{border-color:color-mix(in oklab,var(--color-sky-500) 20%,transparent)}}.border-sky-500\/30{border-color:#00a5ef4d}@supports (color:color-mix(in lab,red,red)){.border-sky-500\/30{border-color:color-mix(in oklab,var(--color-sky-500) 30%,transparent)}}.border-sky-500\/50{border-color:#00a5ef80}@supports (color:color-mix(in lab,red,red)){.border-sky-500\/50{border-color:color-mix(in oklab,var(--color-sky-500) 50%,transparent)}}.border-violet-500\/20{border-color:#8d54ff33}@supports (color:color-mix(in lab,red,red)){.border-violet-500\/20{border-color:color-mix(in oklab,var(--color-violet-500) 20%,transparent)}}.border-violet-500\/30{border-color:#8d54ff4d}@supports (color:color-mix(in lab,red,red)){.border-violet-500\/30{border-color:color-mix(in oklab,var(--color-violet-500) 30%,transparent)}}.border-white{border-color:var(--color-white)}.bg-amber-400{background-color:var(--color-amber-400)}.bg-amber-500\/15{background-color:#f99c0026}@supports (color:color-mix(in lab,red,red)){.bg-amber-500\/15{background-color:color-mix(in oklab,var(--color-amber-500) 15%,transparent)}}.bg-amber-500\/20{background-color:#f99c0033}@supports (color:color-mix(in lab,red,red)){.bg-amber-500\/20{background-color:color-mix(in oklab,var(--color-amber-500) 20%,transparent)}}.bg-amber-950\/20{background-color:#46190133}@supports (color:color-mix(in lab,red,red)){.bg-amber-950\/20{background-color:color-mix(in oklab,var(--color-amber-950) 20%,transparent)}}.bg-amber-950\/40{background-color:#46190166}@supports (color:color-mix(in lab,red,red)){.bg-amber-950\/40{background-color:color-mix(in oklab,var(--color-amber-950) 40%,transparent)}}.bg-emerald-400{background-color:var(--color-emerald-400)}.bg-emerald-500\/10{background-color:#00bb7f1a}@supports (color:color-mix(in lab,red,red)){.bg-emerald-500\/10{background-color:color-mix(in oklab,var(--color-emerald-500) 10%,transparent)}}.bg-emerald-500\/15{background-color:#00bb7f26}@supports (color:color-mix(in lab,red,red)){.bg-emerald-500\/15{background-color:color-mix(in oklab,var(--color-emerald-500) 15%,transparent)}}.bg-emerald-500\/20{background-color:#00bb7f33}@supports (color:color-mix(in lab,red,red)){.bg-emerald-500\/20{background-color:color-mix(in oklab,var(--color-emerald-500) 20%,transparent)}}.bg-emerald-600{background-color:var(--color-emerald-600)}.bg-emerald-950\/10{background-color:#002c221a}@supports (color:color-mix(in lab,red,red)){.bg-emerald-950\/10{background-color:color-mix(in oklab,var(--color-emerald-950) 10%,transparent)}}.bg-emerald-950\/20{background-color:#002c2233}@supports (color:color-mix(in lab,red,red)){.bg-emerald-950\/20{background-color:color-mix(in oklab,var(--color-emerald-950) 20%,transparent)}}.bg-emerald-950\/40{background-color:#002c2266}@supports (color:color-mix(in lab,red,red)){.bg-emerald-950\/40{background-color:color-mix(in oklab,var(--color-emerald-950) 40%,transparent)}}.bg-gray-800{background-color:var(--color-gray-800)}.bg-gray-900{background-color:var(--color-gray-900)}.bg-gray-950{background-color:var(--color-gray-950)}.bg-gray-950\/60{background-color:#03071299}@supports (color:color-mix(in lab,red,red)){.bg-gray-950\/60{background-color:color-mix(in oklab,var(--color-gray-950) 60%,transparent)}}.bg-gray-950\/80{background-color:#030712cc}@supports (color:color-mix(in lab,red,red)){.bg-gray-950\/80{background-color:color-mix(in oklab,var(--color-gray-950) 80%,transparent)}}.bg-gray-950\/90{background-color:#030712e6}@supports (color:color-mix(in lab,red,red)){.bg-gray-950\/90{background-color:color-mix(in oklab,var(--color-gray-950) 90%,transparent)}}.bg-indigo-500\/10{background-color:#625fff1a}@supports (color:color-mix(in lab,red,red)){.bg-indigo-500\/10{background-color:color-mix(in oklab,var(--color-indigo-500) 10%,transparent)}}.bg-indigo-500\/15{background-color:#625fff26}@supports (color:color-mix(in lab,red,red)){.bg-indigo-500\/15{background-color:color-mix(in oklab,var(--color-indigo-500) 15%,transparent)}}.bg-indigo-600{background-color:var(--color-indigo-600)}.bg-indigo-950\/10{background-color:#1e1a4d1a}@supports (color:color-mix(in lab,red,red)){.bg-indigo-950\/10{background-color:color-mix(in oklab,var(--color-indigo-950) 10%,transparent)}}.bg-purple-400\/80{background-color:#c07effcc}@supports (color:color-mix(in lab,red,red)){.bg-purple-400\/80{background-color:color-mix(in oklab,var(--color-purple-400) 80%,transparent)}}.bg-purple-900{background-color:var(--color-purple-900)}.bg-red-400{background-color:var(--color-red-400)}.bg-red-500\/15{background-color:#fb2c3626}@supports (color:color-mix(in lab,red,red)){.bg-red-500\/15{background-color:color-mix(in oklab,var(--color-red-500) 15%,transparent)}}.bg-red-500\/20{background-color:#fb2c3633}@supports (color:color-mix(in lab,red,red)){.bg-red-500\/20{background-color:color-mix(in oklab,var(--color-red-500) 20%,transparent)}}.bg-red-950\/40{background-color:#46080966}@supports (color:color-mix(in lab,red,red)){.bg-red-950\/40{background-color:color-mix(in oklab,var(--color-red-950) 40%,transparent)}}.bg-sky-400{background-color:var(--color-sky-400)}.bg-sky-500\/10{background-color:#00a5ef1a}@supports (color:color-mix(in lab,red,red)){.bg-sky-500\/10{background-color:color-mix(in oklab,var(--color-sky-500) 10%,transparent)}}.bg-sky-500\/20{background-color:#00a5ef33}@supports (color:color-mix(in lab,red,red)){.bg-sky-500\/20{background-color:color-mix(in oklab,var(--color-sky-500) 20%,transparent)}}.bg-sky-900{background-color:var(--color-sky-900)}.bg-sky-950\/20{background-color:#052f4a33}@supports (color:color-mix(in lab,red,red)){.bg-sky-950\/20{background-color:color-mix(in oklab,var(--color-sky-950) 20%,transparent)}}.bg-transparent{background-color:#0000}.bg-violet-500\/10{background-color:#8d54ff1a}@supports (color:color-mix(in lab,red,red)){.bg-violet-500\/10{background-color:color-mix(in oklab,var(--color-violet-500) 10%,transparent)}}.bg-violet-500\/20{background-color:#8d54ff33}@supports (color:color-mix(in lab,red,red)){.bg-violet-500\/20{background-color:color-mix(in oklab,var(--color-violet-500) 20%,transparent)}}.bg-violet-950\/20{background-color:#2f0d6833}@supports (color:color-mix(in lab,red,red)){.bg-violet-950\/20{background-color:color-mix(in oklab,var(--color-violet-950) 20%,transparent)}}.bg-white{background-color:var(--color-white)}.bg-gradient-to-r{--tw-gradient-position:to right in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.from-red-500\/15{--tw-gradient-from:#fb2c3626}@supports (color:color-mix(in lab,red,red)){.from-red-500\/15{--tw-gradient-from:color-mix(in oklab,var(--color-red-500) 15%,transparent)}}.from-red-500\/15{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from) var(--tw-gradient-from-position),var(--tw-gradient-to) var(--tw-gradient-to-position))}.via-amber-500\/15{--tw-gradient-via:#f99c0026}@supports (color:color-mix(in lab,red,red)){.via-amber-500\/15{--tw-gradient-via:color-mix(in oklab,var(--color-amber-500) 15%,transparent)}}.via-amber-500\/15{--tw-gradient-via-stops:var(--tw-gradient-position),var(--tw-gradient-from) var(--tw-gradient-from-position),var(--tw-gradient-via) var(--tw-gradient-via-position),var(--tw-gradient-to) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-via-stops)}.to-emerald-500\/15{--tw-gradient-to:#00bb7f26}@supports (color:color-mix(in lab,red,red)){.to-emerald-500\/15{--tw-gradient-to:color-mix(in oklab,var(--color-emerald-500) 15%,transparent)}}.to-emerald-500\/15{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from) var(--tw-gradient-from-position),var(--tw-gradient-to) var(--tw-gradient-to-position))}.p-1{padding:var(--spacing)}.p-2{padding:calc(var(--spacing)*2)}.p-3{padding:calc(var(--spacing)*3)}.p-4{padding:calc(var(--spacing)*4)}.p-6{padding:calc(var(--spacing)*6)}.p-12{padding:calc(var(--spacing)*12)}.px-1{padding-inline:var(--spacing)}.px-1\.5{padding-inline:calc(var(--spacing)*1.5)}.px-2{padding-inline:calc(var(--spacing)*2)}.px-2\.5{padding-inline:calc(var(--spacing)*2.5)}.px-3{padding-inline:calc(var(--spacing)*3)}.px-4{padding-inline:calc(var(--spacing)*4)}.px-5{padding-inline:calc(var(--spacing)*5)}.px-6{padding-inline:calc(var(--spacing)*6)}.py-0\.5{padding-block:calc(var(--spacing)*.5)}.py-1{padding-block:var(--spacing)}.py-1\.5{padding-block:calc(var(--spacing)*1.5)}.py-2{padding-block:calc(var(--spacing)*2)}.py-2\.5{padding-block:calc(var(--spacing)*2.5)}.py-4{padding-block:calc(var(--spacing)*4)}.py-10{padding-block:calc(var(--spacing)*10)}.py-12{padding-block:calc(var(--spacing)*12)}.pt-0\.5{padding-top:calc(var(--spacing)*.5)}.pt-1{padding-top:var(--spacing)}.pt-2{padding-top:calc(var(--spacing)*2)}.pb-3{padding-bottom:calc(var(--spacing)*3)}.pb-6{padding-bottom:calc(var(--spacing)*6)}.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}.font-mono{font-family:var(--font-mono)}.text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}.text-3xl{font-size:var(--text-3xl);line-height:var(--tw-leading,var(--text-3xl--line-height))}.text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\[9px\]{font-size:9px}.text-\[10px\]{font-size:10px}.text-\[11px\]{font-size:11px}.leading-relaxed{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.font-black{--tw-font-weight:var(--font-weight-black);font-weight:var(--font-weight-black)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-extrabold{--tw-font-weight:var(--font-weight-extrabold);font-weight:var(--font-weight-extrabold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-tight{--tw-tracking:var(--tracking-tight);letter-spacing:var(--tracking-tight)}.tracking-wider{--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider)}.text-amber-300{color:var(--color-amber-300)}.text-amber-400{color:var(--color-amber-400)}.text-amber-400\/70{color:#fcbb00b3}@supports (color:color-mix(in lab,red,red)){.text-amber-400\/70{color:color-mix(in oklab,var(--color-amber-400) 70%,transparent)}}.text-emerald-300{color:var(--color-emerald-300)}.text-emerald-400{color:var(--color-emerald-400)}.text-emerald-400\/70{color:#00d294b3}@supports (color:color-mix(in lab,red,red)){.text-emerald-400\/70{color:color-mix(in oklab,var(--color-emerald-400) 70%,transparent)}}.text-gray-100{color:var(--color-gray-100)}.text-gray-200{color:var(--color-gray-200)}.text-gray-300{color:var(--color-gray-300)}.text-gray-400{color:var(--color-gray-400)}.text-gray-500{color:var(--color-gray-500)}.text-gray-600{color:var(--color-gray-600)}.text-gray-950{color:var(--color-gray-950)}.text-indigo-300{color:var(--color-indigo-300)}.text-indigo-400{color:var(--color-indigo-400)}.text-purple-200{color:var(--color-purple-200)}.text-purple-300{color:var(--color-purple-300)}.text-red-300{color:var(--color-red-300)}.text-red-400{color:var(--color-red-400)}.text-red-400\/70{color:#ff6568b3}@supports (color:color-mix(in lab,red,red)){.text-red-400\/70{color:color-mix(in oklab,var(--color-red-400) 70%,transparent)}}.text-rose-400{color:var(--color-rose-400)}.text-sky-200{color:var(--color-sky-200)}.text-sky-400{color:var(--color-sky-400)}.text-violet-400{color:var(--color-violet-400)}.text-white{color:var(--color-white)}.uppercase{text-transform:uppercase}.line-through{text-decoration-line:line-through}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.placeholder-gray-500::placeholder{color:var(--color-gray-500)}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a)}.shadow,.shadow-md{box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a)}.shadow-sm,.shadow-xl{box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a),0 8px 10px -6px var(--tw-shadow-color,#0000001a)}.backdrop-blur{--tw-backdrop-blur:blur(8px)}.backdrop-blur,.backdrop-blur-sm{-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-blur-sm{--tw-backdrop-blur:blur(var(--blur-sm))}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.outline-none{--tw-outline-style:none;outline-style:none}.select-none{-webkit-user-select:none;user-select:none}.focus-within\:border-emerald-500:focus-within{border-color:var(--color-emerald-500)}@media (hover:hover){.hover\:bg-emerald-500:hover{background-color:var(--color-emerald-500)}.hover\:bg-red-950\/50:hover{background-color:#46080980}@supports (color:color-mix(in lab,red,red)){.hover\:bg-red-950\/50:hover{background-color:color-mix(in oklab,var(--color-red-950) 50%,transparent)}}.hover\:text-red-400:hover{color:var(--color-red-400)}.hover\:text-white:hover{color:var(--color-white)}}.focus\:border-emerald-500:focus{border-color:var(--color-emerald-500)}.focus\:ring-1:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\:ring-emerald-500:focus{--tw-ring-color:var(--color-emerald-500)}.focus\:outline-none:focus{--tw-outline-style:none;outline-style:none}.disabled\:opacity-50:disabled{opacity:.5}@media (width>=40rem){.sm\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.sm\:flex-row{flex-direction:row}.sm\:items-center{align-items:center}.sm\:justify-between{justify-content:space-between}}@media (width>=48rem){.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}.\[\&\:\:-webkit-inner-spin-button\]\:appearance-none::-webkit-inner-spin-button{appearance:none}.\[\&\:\:-webkit-outer-spin-button\]\:appearance-none::-webkit-outer-spin-button{appearance:none}}:where(.valuation-card>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(var(--spacing)*6*var(--tw-space-y-reverse));margin-block-end:calc(var(--spacing)*6*(1 - var(--tw-space-y-reverse)))}.valuation-card{border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:var(--color-gray-800);background-color:#10182866}@supports (color:color-mix(in lab,red,red)){.valuation-card{background-color:color-mix(in oklab,var(--color-gray-900) 40%,transparent)}}.valuation-card{padding:calc(var(--spacing)*6);--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a),0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);--tw-backdrop-blur:blur(var(--blur-sm));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration));--tw-duration:.3s;transition-duration:.3s}@media (hover:hover){.valuation-card:hover{border-color:#364153cc}@supports (color:color-mix(in lab,red,red)){.valuation-card:hover{border-color:color-mix(in oklab,var(--color-gray-700) 80%,transparent)}}.valuation-card:hover{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a),0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}}.ticker-badge{border-radius:var(--radius-md);border-style:var(--tw-border-style);border-width:1px;border-color:#00bb7f33}@supports (color:color-mix(in lab,red,red)){.ticker-badge{border-color:color-mix(in oklab,var(--color-emerald-500) 20%,transparent)}}.ticker-badge{background-color:#00bb7f1a}@supports (color:color-mix(in lab,red,red)){.ticker-badge{background-color:color-mix(in oklab,var(--color-emerald-500) 10%,transparent)}}.ticker-badge{padding-inline:calc(var(--spacing)*2.5);padding-block:var(--spacing);font-family:var(--font-mono);font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold);color:var(--color-emerald-400)}.source-pill{border-radius:var(--radius-md);border-style:var(--tw-border-style);padding-inline:calc(var(--spacing)*2);padding-block:calc(var(--spacing)*.5);--tw-font-weight:var(--font-weight-medium);font-size:10px;font-weight:var(--font-weight-medium);--tw-tracking:var(--tracking-tight);letter-spacing:var(--tracking-tight);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration));border-width:1px;align-items:center;display:inline-flex}@media (hover:hover){.source-pill:hover{opacity:.9}}.metrics-grid{gap:calc(var(--spacing)*4);border-radius:var(--radius-xl);border-style:var(--tw-border-style);border-width:1px;border-color:#1e2939cc;grid-template-columns:repeat(3,minmax(0,1fr));display:grid}@supports (color:color-mix(in lab,red,red)){.metrics-grid{border-color:color-mix(in oklab,var(--color-gray-800) 80%,transparent)}}.metrics-grid{background-color:#030712cc}@supports (color:color-mix(in lab,red,red)){.metrics-grid{background-color:color-mix(in oklab,var(--color-gray-950) 80%,transparent)}}.metrics-grid{padding:calc(var(--spacing)*4);text-align:center}.metric-cell{gap:var(--spacing);flex-direction:column;display:flex}.metric-label{--tw-font-weight:var(--font-weight-medium);font-size:11px;font-weight:var(--font-weight-medium);--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider);color:var(--color-gray-500);text-transform:uppercase}.metric-value{font-family:var(--font-mono);font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold);color:var(--color-gray-200)}.fair-value-section{border-radius:var(--radius-xl);border-style:var(--tw-border-style);border-width:1px;border-color:#1e293999}@supports (color:color-mix(in lab,red,red)){.fair-value-section{border-color:color-mix(in oklab,var(--color-gray-800) 60%,transparent)}}.fair-value-section{--tw-gradient-position:to bottom right in oklab;background-image:linear-gradient(var(--tw-gradient-stops));--tw-gradient-from:#101828cc}@supports (color:color-mix(in lab,red,red)){.fair-value-section{--tw-gradient-from:color-mix(in oklab,var(--color-gray-900) 80%,transparent)}}.fair-value-section{--tw-gradient-to:#030712cc}@supports (color:color-mix(in lab,red,red)){.fair-value-section{--tw-gradient-to:color-mix(in oklab,var(--color-gray-950) 80%,transparent)}}.fair-value-section{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from) var(--tw-gradient-from-position),var(--tw-gradient-to) var(--tw-gradient-to-position));padding:calc(var(--spacing)*5)}.gauge-track{height:calc(var(--spacing)*2.5);background-color:#1e2939cc;border-radius:2147483647px;width:100%;position:relative;overflow:visible}@supports (color:color-mix(in lab,red,red)){.gauge-track{background-color:color-mix(in oklab,var(--color-gray-800) 80%,transparent)}}.gauge-fill{opacity:.35;background:linear-gradient(90deg,#f87171,#fbbf24 50%,#34d399);border-radius:2147483647px;height:100%;position:absolute;top:0}.gauge-marker{z-index:10;--tw-translate-x:-50%;--tw-translate-y:-50%;translate:var(--tw-translate-x) var(--tw-translate-y);position:absolute;top:50%}.gauge-marker-dot{height:calc(var(--spacing)*3.5);width:calc(var(--spacing)*3.5);border-style:var(--tw-border-style);border-width:2px;border-color:var(--color-gray-900);--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);border-radius:2147483647px}.gauge-price{z-index:20;--tw-translate-x:-50%;translate:var(--tw-translate-x) var(--tw-translate-y);position:absolute;top:50%;transform:translate(-50%)translateY(-50%)}.gauge-price-line{height:calc(var(--spacing)*6);width:calc(var(--spacing)*.5);background-color:#ffffffe6;border-radius:2147483647px;margin-inline:auto}@supports (color:color-mix(in lab,red,red)){.gauge-price-line{background-color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.gauge-price-line{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);margin-top:-6px}.gauge-price-label{margin-top:calc(var(--spacing)*.5);text-align:center;--tw-font-weight:var(--font-weight-bold);font-size:9px;font-weight:var(--font-weight-bold);color:#fffc}@supports (color:color-mix(in lab,red,red)){.gauge-price-label{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.gauge-price-label{-webkit-user-select:none;user-select:none}.scenario-cell{align-items:center;gap:calc(var(--spacing)*.5);border-radius:var(--radius-xl);border-style:var(--tw-border-style);border-width:1px;border-color:#1e293999;flex-direction:column;display:flex}@supports (color:color-mix(in lab,red,red)){.scenario-cell{border-color:color-mix(in oklab,var(--color-gray-800) 60%,transparent)}}.scenario-cell{background-color:#03071299}@supports (color:color-mix(in lab,red,red)){.scenario-cell{background-color:color-mix(in oklab,var(--color-gray-950) 60%,transparent)}}.scenario-cell{padding:calc(var(--spacing)*3)}.scenario-label{--tw-font-weight:var(--font-weight-semibold);font-size:10px;font-weight:var(--font-weight-semibold);--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider);text-transform:uppercase}.scenario-value{font-family:var(--font-mono);font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold);color:var(--color-gray-200)}.scenario-mos{--tw-font-weight:var(--font-weight-semibold);font-size:10px;font-weight:var(--font-weight-semibold)}.reverse-dcf-section{border-radius:var(--radius-xl);border-style:var(--tw-border-style);border-width:1px;border-color:#625fff26}@supports (color:color-mix(in lab,red,red)){.reverse-dcf-section{border-color:color-mix(in oklab,var(--color-indigo-500) 15%,transparent)}}.reverse-dcf-section{background-color:#1e1a4d1a}@supports (color:color-mix(in lab,red,red)){.reverse-dcf-section{background-color:color-mix(in oklab,var(--color-indigo-950) 10%,transparent)}}.reverse-dcf-section{padding:calc(var(--spacing)*4)}:where(.slider-group>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(var(--spacing)*1.5*var(--tw-space-y-reverse));margin-block-end:calc(var(--spacing)*1.5*(1 - var(--tw-space-y-reverse)))}.slider-header{justify-content:space-between;align-items:center;display:flex}.slider-label{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height));--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium);color:var(--color-gray-400)}.slider-value{font-family:var(--font-mono);font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold);--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.slider-bounds{color:var(--color-gray-600);justify-content:space-between;font-size:10px;display:flex}.slider{cursor:pointer;appearance:none;background-color:#0000;width:100%;height:6px}.slider::-webkit-slider-runnable-track{height:calc(var(--spacing)*1.5);background-color:var(--color-gray-800);border-radius:2147483647px}.slider::-webkit-slider-thumb{height:calc(var(--spacing)*4);width:calc(var(--spacing)*4);cursor:grab;appearance:none;border-style:var(--tw-border-style);border-width:2px;border-color:var(--color-gray-900);--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);border-radius:2147483647px;margin-top:-5px;transition:transform .15s,box-shadow .15s}.slider::-webkit-slider-thumb:hover{transform:scale(1.2)}.slider::-webkit-slider-thumb:active{cursor:grabbing;transform:scale(1.1)}.slider::-moz-range-track{height:calc(var(--spacing)*1.5);--tw-border-style:none;background-color:var(--color-gray-800);border-style:none;border-radius:2147483647px}.slider::-moz-range-thumb{height:calc(var(--spacing)*4);width:calc(var(--spacing)*4);cursor:grab;border-style:var(--tw-border-style);border-width:2px;border-color:var(--color-gray-900);--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);border-radius:2147483647px;transition:transform .15s,box-shadow .15s}.slider::-moz-range-thumb:hover{transform:scale(1.2)}.slider--emerald::-webkit-slider-thumb{background-color:var(--color-emerald-400);box-shadow:0 0 8px #34d39966}.slider--emerald::-moz-range-thumb{background-color:var(--color-emerald-400);box-shadow:0 0 8px #34d39966}.slider--sky::-webkit-slider-thumb{background-color:var(--color-sky-400);box-shadow:0 0 8px #38bdf866}.slider--sky::-moz-range-thumb{background-color:var(--color-sky-400);box-shadow:0 0 8px #38bdf866}.slider--violet::-webkit-slider-thumb{background-color:var(--color-violet-400);box-shadow:0 0 8px #a78bfa66}.slider--violet::-moz-range-thumb{background-color:var(--color-violet-400);box-shadow:0 0 8px #a78bfa66}.slider--amber::-webkit-slider-thumb{background-color:var(--color-amber-400);box-shadow:0 0 8px #fbbf2466}.slider--amber::-moz-range-thumb{background-color:var(--color-amber-400);box-shadow:0 0 8px #fbbf2466}.slider:focus-visible::-webkit-slider-thumb{outline-style:var(--tw-outline-style);outline-offset:2px;outline-width:2px;outline-color:var(--color-white)}.slider:focus-visible::-moz-range-thumb{outline-style:var(--tw-outline-style);outline-offset:2px;outline-width:2px;outline-color:var(--color-white)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(1turn)}}

```

# .output/public/_nuxt/error-404.DjFB7pgG.css

```css
.grid[data-v-70769455]{display:grid}.mb-2[data-v-70769455]{margin-bottom:.5rem}.mb-4[data-v-70769455]{margin-bottom:1rem}.max-w-520px[data-v-70769455]{max-width:520px}.min-h-screen[data-v-70769455]{min-height:100vh}.w-full[data-v-70769455]{width:100%}.flex[data-v-70769455]{display:flex}.place-content-center[data-v-70769455]{place-content:center}.items-center[data-v-70769455]{align-items:center}.justify-center[data-v-70769455]{justify-content:center}.overflow-hidden[data-v-70769455]{overflow:hidden}.bg-white[data-v-70769455]{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2[data-v-70769455]{padding-left:.5rem;padding-right:.5rem}.text-center[data-v-70769455]{text-align:center}.text-\[80px\][data-v-70769455]{font-size:80px}.text-2xl[data-v-70769455]{font-size:1.5rem;line-height:2rem}.text-sm[data-v-70769455]{font-size:.875rem;line-height:1.25rem}.text-\[\#020420\][data-v-70769455]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\[\#64748B\][data-v-70769455]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.hover\:text-\[\#00DC82\][data-v-70769455]:hover{--un-text-opacity:1;color:rgb(0 220 130/var(--un-text-opacity))}.font-medium[data-v-70769455]{font-weight:500}.font-semibold[data-v-70769455]{font-weight:600}.leading-none[data-v-70769455]{line-height:1}.tracking-wide[data-v-70769455]{letter-spacing:.025em}.font-sans[data-v-70769455]{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums[data-v-70769455]{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.underline[data-v-70769455]{text-decoration-line:underline}.underline-offset-3[data-v-70769455]{text-underline-offset:3px}.antialiased[data-v-70769455]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\:bg-\[\#020420\][data-v-70769455]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\:text-white[data-v-70769455]{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (width>=640px){.sm\:text-\[110px\][data-v-70769455]{font-size:110px}.sm\:text-3xl[data-v-70769455]{font-size:1.875rem;line-height:2.25rem}}

```

# .output/public/_nuxt/error-500.BG9pmads.css

```css
.grid[data-v-e51fa8ac]{display:grid}.mb-2[data-v-e51fa8ac]{margin-bottom:.5rem}.mb-4[data-v-e51fa8ac]{margin-bottom:1rem}.max-w-520px[data-v-e51fa8ac]{max-width:520px}.min-h-screen[data-v-e51fa8ac]{min-height:100vh}.place-content-center[data-v-e51fa8ac]{place-content:center}.overflow-hidden[data-v-e51fa8ac]{overflow:hidden}.bg-white[data-v-e51fa8ac]{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2[data-v-e51fa8ac]{padding-left:.5rem;padding-right:.5rem}.text-center[data-v-e51fa8ac]{text-align:center}.text-\[80px\][data-v-e51fa8ac]{font-size:80px}.text-2xl[data-v-e51fa8ac]{font-size:1.5rem;line-height:2rem}.text-\[\#020420\][data-v-e51fa8ac]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\[\#64748B\][data-v-e51fa8ac]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold[data-v-e51fa8ac]{font-weight:600}.leading-none[data-v-e51fa8ac]{line-height:1}.tracking-wide[data-v-e51fa8ac]{letter-spacing:.025em}.font-sans[data-v-e51fa8ac]{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums[data-v-e51fa8ac]{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased[data-v-e51fa8ac]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\:bg-\[\#020420\][data-v-e51fa8ac]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\:text-white[data-v-e51fa8ac]{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (width>=640px){.sm\:text-\[110px\][data-v-e51fa8ac]{font-size:110px}.sm\:text-3xl[data-v-e51fa8ac]{font-size:1.875rem;line-height:2.25rem}}

```

# .output/public/_nuxt/oAaAuq3K.js

```js
import{a as e,i as t,l as n}from"./ttQ_F7QN.js";import{B as r,I as i,M as a,O as o,Q as s,Y as c,_t as l,c as u,d,g as f,h as p,j as m,q as h,s as g,v as _,x as v}from"./BWlekpQc.js";import{a as y,c as b,f as x,m as S,r as C,s as w}from"./BIjnivpp.js";import{a as T,c as E,d as D,i as O,l as k,n as A,o as j,r as M,t as N,u as P}from"#entry";var F=(...e)=>e.find(e=>e!==void 0);function I(e){let t=e.replace(/[\u0000-\u001F\s]+/g,``);for(;t.toLowerCase().startsWith(`view-source:`);)t=t.slice(12);let n=t.indexOf(`:`);return n>0&&y(t.slice(0,n+1))?null:e}function L(n){let r=n.componentName||`NuxtLink`;function a(e){return typeof e==`string`&&e.startsWith(`#`)}function l(e,t,r){let i=r??n.trailingSlash;if(!e||i!==`append`&&i!==`remove`)return e;if(typeof e==`string`)return z(e,i);let a=`path`in e&&e.path!==void 0?e.path:t(e).path;return{...e,name:void 0,path:z(a,i)}}function u(t){let r=D(),o=e(),c=g(()=>!!s(t.target)&&s(t.target)!==`_self`),u=g(()=>{let e=s(t.to)||s(t.href)||``;return typeof e==`string`&&C(e,{acceptRelative:!0})}),d=i(`RouterLink`),f=d&&typeof d!=`string`?d.useLink:void 0,p=g(()=>{if(s(t.external))return!0;let e=s(t.to)||s(t.href)||``;return typeof e==`object`?!1:e===``||u.value}),m=g(()=>{let e=s(t.to)||s(t.href)||``;return p.value?e:l(e,r.resolve,s(t.trailingSlash))}),h=p.value?void 0:f?.({...t,to:m,viewTransition:s(t.viewTransition)}),_=g(()=>{let e=s(t.trailingSlash)??n.trailingSlash;if(!m.value||u.value||a(m.value)){let e=m.value;return typeof e==`string`?I(e):e}if(p.value){let t=typeof m.value==`object`&&`path`in m.value?P(m.value):m.value,n=typeof t==`object`?r.resolve(t).href:t,i=typeof n==`string`?I(n):n;return i===null?null:z(i,e)}return typeof m.value==`object`?r.resolve(m.value)?.href??null:z(w(o.app.baseURL,m.value),e)});return{to:m,hasTarget:c,isAbsoluteUrl:u,isExternal:p,href:_,isActive:h?.isActive??g(()=>m.value===r.currentRoute.value.path),isExactActive:h?.isExactActive??g(()=>m.value===r.currentRoute.value.path),route:h?.route??g(()=>r.resolve(m.value)),async navigate(e){_.value!==null&&await k(_.value,{replace:s(t.replace),external:p.value||c.value})}}}return _({name:r,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},prefetchOn:{type:[String,Object],default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1},trailingSlash:{type:String,default:void 0,required:!1}},useLink:u,setup(e,{slots:r}){let s=D(),{to:l,href:d,navigate:f,isExternal:p,hasTarget:g,isAbsoluteUrl:_}=u(e),y=c(!1),x=h(null),S=t=>{x.value=e.custom?t?.$el?.nextElementSibling:t?.$el};function C(t){return!!(!y.value&&(typeof e.prefetchOn==`string`?e.prefetchOn===t:e.prefetchOn?.[t]??n.prefetchOn?.[t])&&(e.prefetch??n.prefetch)!==!1&&e.noPrefetch!==!0&&e.target!==`_blank`&&!H())}async function w(e=t()){if(y.value||d.value===null)return;y.value=!0;let n=typeof l.value==`string`?l.value:p.value?P(l.value):s.resolve(l.value).fullPath,r=p.value?new URL(n,window.location.href).href:n;await Promise.all([e.hooks.callHook(`link:prefetch`,r)?.catch(()=>{}),!p.value&&!g.value&&A(l.value,s).catch(()=>{})])}if(!e.custom&&C(`visibility`)){let e=t(),n,r=null;m(()=>{let t=B();M(()=>{n=T(()=>{x?.value?.tagName&&(r=t.observe(x.value,async()=>{r?.(),r=null,await w(e)}))})})}),o(()=>{n&&O(n),r?.(),r=null})}return()=>{let t=e.target||null,o=F(e.noRel?``:e.rel,n.externalRelAttribute,_.value||g.value?`noopener noreferrer`:``)||null,c=e=>({href:d.value,navigate:f,get route(){if(!d.value)return;let e=new URL(d.value,window.location.href);return{path:e.pathname,fullPath:e.pathname,get query(){return b(e.search)},hash:e.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:d.value}},rel:o,target:t,isExternal:p.value||g.value,isActive:!1,isExactActive:!1,...e,prefetch:w,prefetched:y.value,shouldPrefetch:C});if(!p.value&&!g.value&&!a(l.value)){let t={ref:S,to:l.value,activeClass:e.activeClass||n.activeClass,exactActiveClass:e.exactActiveClass||n.exactActiveClass,replace:e.replace,ariaCurrentValue:e.ariaCurrentValue,custom:e.custom};return e.custom||(C(`interaction`)&&(t.onPointerenter=w.bind(null,void 0),t.onFocus=w.bind(null,void 0)),y.value&&(t.class=e.prefetchedClass||n.prefetchedClass),t.rel=e.rel||void 0),v(i(`RouterLink`),t,e.custom&&r.default?{default:e=>r.default(c(e))}:r.default)}return e.custom?r.default?r.default(c()):null:v(`a`,{ref:x,href:d.value||null,rel:o,target:t,onClick:async t=>{if(!(p.value||g.value)){t.preventDefault();try{let t=E(d.value??``);return await(e.replace?s.replace(t):s.push(t))}finally{if(a(l.value)){let e=l.value.slice(1),t=e;try{t=decodeURIComponent(e)}catch{}document.getElementById(t)?.focus()}}}}},r.default?.())}}})}var R=L(n);function z(e,t){let n=t===`append`?x:S;return C(e)&&!e.startsWith(`http`)?e:n(e,!0)}function B(){let e=t();if(e._observer)return e._observer;let n=null,r=new Map;return e._observer={observe:(e,t)=>(n||=new IntersectionObserver(e=>{for(let t of e){let e=r.get(t.target);(t.isIntersecting||t.intersectionRatio>0)&&e&&e()}}),r.set(e,t),n.observe(e),()=>{r.delete(e),n?.unobserve(e),r.size===0&&(n?.disconnect(),n=null)})}}var V=/2g/;function H(){let e=navigator.connection;return!!(e&&(e.saveData||V.test(e.effectiveType)))}var U={class:`antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide`},W={class:`max-w-520px text-center`},G=[`textContent`],K=[`textContent`],q=[`textContent`],J={class:`flex items-center justify-center w-full`},Y=N({__name:`error-404`,props:{appName:{type:String,default:`Nuxt`},status:{type:Number,default:404},statusText:{type:String,default:`Page not found`},description:{type:String,default:`Sorry, the page you are looking for could not be found.`},backHome:{type:String,default:`Go back home`}},setup(e){let t=e;return j({title:`${t.status} - ${t.statusText} | ${t.appName}`,script:[{innerHTML:`!function(){let e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(let e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(let t of e)if("childList"===t.type)for(let e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;let r=function(e){let r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();`}],style:[{innerHTML:`*,:after,:before{box-sizing:border-box;border-style:solid;border-width:0;border-color:var(--un-default-border-color,#e5e7eb)}:after,:before{--un-content:""}html{-webkit-text-size-adjust:100%;tab-size:4;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 #0000;--un-ring-shadow:0 0 #0000;--un-shadow-inset: ;--un-shadow:0 0 #0000;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:#93c5fd80;--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }`}]}),(t,n)=>{let i=R;return a(),d(`div`,U,[u(`div`,W,[u(`h1`,{class:`font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]`,textContent:l(e.status)},null,8,G),u(`h2`,{class:`font-semibold mb-2 sm:text-3xl text-2xl`,textContent:l(e.statusText)},null,8,K),u(`p`,{class:`mb-4 px-2 text-[#64748B] text-md`,textContent:l(e.description)},null,8,q),u(`div`,J,[f(i,{to:`/`,class:`font-medium hover:text-[#00DC82] text-sm underline underline-offset-3`},{default:r(()=>[p(l(e.backHome),1)]),_:1})])])])}}},[[`__scopeId`,`data-v-70769455`]]);export{Y as default};
```

# .output/public/_nuxt/ttQ_F7QN.js

```js
import{H as e,J as t,K as n,S as r,U as i,y as a}from"./BWlekpQc.js";var o=Error.captureStackTrace,s=class e extends Error{name;code;docs;fix;sources;get why(){return this.message}constructor(t,n=e){super(t.why,{cause:t.cause}),this.code=this.name=t.code,this.fix=t.fix,this.docs=t.docs,this.sources=t.sources,o?.(this,n)}toJSON(){return{name:this.name,why:this.why,fix:this.fix,docs:this.docs,sources:this.sources,cause:this.cause,stack:this.stack}}};function c(e,t){return typeof e==`string`?`${e}/${t.toLowerCase()}`:e?.(t)}function l(e={}){let{docsBase:t,reporters:n=[]}=e;return new Proxy({},{get(e,r){if(typeof r!=`string`)return;let i=(e={},a={})=>{let o=c(t,r),l=new s({code:r,why:o??``,docs:o,cause:e.cause,sources:e.sources},i);for(let e of n)e(l,a);return l};return i}})}function u(e){return`https://nuxt.com/docs/4.x/errors/${e.replace(`NUXT_`,``).toLowerCase()}`}var d=[e=>{console.error(`[${e.name}]`)}],f=l({docsBase:u,reporters:d});function p(e,t={},n){for(let r in e){let i=e[r],a=n?`${n}:${r}`:r;typeof i==`object`&&i?p(i,t,a):typeof i==`function`&&(t[a]=i)}return t}var m=(()=>{if(console.createTask)return console.createTask;let e={run:e=>e()};return()=>e})();function h(e,t,n,r){for(let i=n;i<e.length;i+=1)try{let n=r?r.run(()=>e[i](...t)):e[i](...t);if(n&&typeof n.then==`function`)return Promise.resolve(n).then(()=>h(e,t,i+1,r))}catch(e){return Promise.reject(e)}}function g(e,t,n){if(e.length>0)return h(e,t,0,m(n))}function _(e,t,n){if(e.length>0){let r=m(n);return Promise.all(e.map(e=>r.run(()=>e(...t))))}}function v(e,t){for(let n of[...e])n(t)}var y=class{_hooks;_before;_after;_deprecatedHooks;_deprecatedMessages;constructor(){this._hooks={},this._before=void 0,this._after=void 0,this._deprecatedMessages=void 0,this._deprecatedHooks={},this.hook=this.hook.bind(this),this.callHook=this.callHook.bind(this),this.callHookWith=this.callHookWith.bind(this)}hook(e,t,n={}){if(!e||typeof t!=`function`)return()=>{};let r=e,i;for(;this._deprecatedHooks[e];)i=this._deprecatedHooks[e],e=i.to;if(i&&!n.allowDeprecated){let e=i.message;e||=`${r} hook has been deprecated`+(i.to?`, please use ${i.to}`:``),this._deprecatedMessages||=new Set,this._deprecatedMessages.has(e)||(console.warn(e),this._deprecatedMessages.add(e))}if(!t.name)try{Object.defineProperty(t,"name",{get:()=>`_`+e.replace(/\W+/g,`_`)+`_hook_cb`,configurable:!0})}catch{}return this._hooks[e]=this._hooks[e]||[],this._hooks[e].push(t),()=>{t&&=(this.removeHook(e,t),void 0)}}hookOnce(e,t){let n,r=(...e)=>(typeof n==`function`&&n(),n=void 0,r=void 0,t(...e));return n=this.hook(e,r),n}removeHook(e,t){let n=this._hooks[e];if(n){let r=n.indexOf(t);r!==-1&&n.splice(r,1),n.length===0&&(this._hooks[e]=void 0)}}clearHook(e){this._hooks[e]=void 0}deprecateHook(e,t){this._deprecatedHooks[e]=typeof t==`string`?{to:t}:t;let n=this._hooks[e]||[];this._hooks[e]=void 0;for(let t of n)this.hook(e,t)}deprecateHooks(e){for(let t in e)this.deprecateHook(t,e[t])}addHooks(e){let t=p(e),n=Object.keys(t).map(e=>this.hook(e,t[e]));return()=>{for(let e of n)e();n.length=0}}removeHooks(e){let t=p(e);for(let e in t)this.removeHook(e,t[e])}removeAllHooks(){this._hooks={}}callHook(e,...t){return this.callHookWith(g,e,t)}callHookParallel(e,...t){return this.callHookWith(_,e,t)}callHookWith(e,t,n){let r=this._before||this._after?{name:t,args:n,context:{}}:void 0;this._before&&v(this._before,r);let i=e(this._hooks[t]?[...this._hooks[t]]:[],n,t);return i instanceof Promise?i.finally(()=>{this._after&&r&&v(this._after,r)}):(this._after&&r&&v(this._after,r),i)}beforeEach(e){return this._before=this._before||[],this._before.push(e),()=>{if(this._before!==void 0){let t=this._before.indexOf(e);t!==-1&&this._before.splice(t,1)}}}afterEach(e){return this._after=this._after||[],this._after.push(e),()=>{if(this._after!==void 0){let t=this._after.indexOf(e);t!==-1&&this._after.splice(t,1)}}}};function b(){return new y}var x=class{_hooks;constructor(){this._hooks={}}hook(e,t){return!e||typeof t!=`function`?()=>{}:(this._hooks[e]=this._hooks[e]||[],this._hooks[e].push(t),()=>{t&&=(this.removeHook(e,t),void 0)})}removeHook(e,t){let n=this._hooks[e];if(n){let r=n.indexOf(t);r!==-1&&n.splice(r,1),n.length===0&&(this._hooks[e]=void 0)}}callHook(e,...t){let n=this._hooks[e];if(!(!n||n.length===0))return h(n,t,0)}};function S(){return globalThis.AsyncLocalStorage||globalThis.process?.getBuiltinModule?.(`node:async_hooks`)?.AsyncLocalStorage}function C(e={}){let t,n=!1,r=e=>{if(t&&t!==e)throw Error(`Context conflict`)},i;if(e.asyncContext){let t=e.AsyncLocalStorage||S();t?i=new t:console.warn("[unctx] `AsyncLocalStorage` is not provided.")}let a=e=>i&&typeof e==`object`&&e?{__unctx_weak:new WeakRef(e)}:e,o=e=>e&&e.__unctx_weak?e.__unctx_weak.deref():e,s=()=>{if(i){let e=i.getStore();if(e!==void 0)return o(e)}return t};return{use:()=>{let e=s();if(e===void 0)throw Error(`Context is not available`);return e},tryUse:()=>s(),set:(e,i)=>{i||r(e),t=e,n=!0},unset:()=>{t=void 0,n=!1},call:(e,o)=>{r(e),t=e;try{return i?i.run(a(e),o):o()}finally{n||(t=void 0)}},async callAsync(e,r){t=e;let o=()=>{t=e},s=()=>t===e?o:void 0;A.add(s);try{let o=i?i.run(a(e),r):r();return n||(t=void 0),await o}finally{A.delete(s)}}}}function w(e={}){let t={};return{get(n,r={}){return t[n]||(t[n]=C({...e,...r})),t[n]}}}var T=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof global<`u`?global:typeof window<`u`?window:{},E=`__unctx__`,D=T[E]||(T[E]=w()),O=(e,t={})=>D.get(e,t),k=`__unctx_async_handlers__`,A=T[k]||(T[k]=new Set);function j(e){let t=[];for(let e of A){let n=e();n&&t.push(n)}let n=()=>{for(let e of t)e()},r=e();return r&&typeof r==`object`&&`catch`in r&&(r=r.catch(e=>{throw n(),e})),[r,n]}var M={meta:[{name:`viewport`,content:`width=device-width, initial-scale=1`},{charset:`utf-8`}],link:[],style:[],script:[],noscript:[]},N={id:`__nuxt-loader`},P={componentName:`NuxtLink`,prefetch:!0,prefetchOn:{visibility:!0}},F=`#__nuxt`,I=`nuxt-app`,L=36e5,R=`vite:preloadError`;function z(e=`nuxt-app`){return O(e,{asyncContext:!1})}var B=`__nuxt_plugin`;function V(r){let a=0,o={_id:r.id||`nuxt-app`,_scope:e(),provide:void 0,versions:{get nuxt(){return`4.5.0`},get vue(){return o.vueApp.version}},payload:t({...r.ssrContext?.payload||{},data:t({}),state:n({}),once:new Set,_errors:t({})}),static:{data:{}},runWithContext(e){return o._scope.active&&!i()?o._scope.run(()=>G(o,e)):G(o,e)},isHydrating:!0,deferHydration(){if(!o.isHydrating)return()=>{};a++;let e=!1;return()=>{if(!e&&(e=!0,a--,a===0))return o.isHydrating=!1,o.callHook(`app:suspense:resolve`)}},_asyncDataPromises:{},_asyncData:t({}),_state:t({}),_payloadRevivers:{},...r};{let e=window.__NUXT__;if(e)for(let t in e)switch(t){case`data`:case`state`:case`_errors`:Object.assign(o.payload[t],e[t]);break;default:o.payload[t]=e[t]}}o.hooks=b(),o.hook=o.hooks.hook;{let e=o.hooks.callHook;o.hooks.callHook=(t,...n)=>Promise.resolve().then(()=>e(t,...n))}o.callHook=o.hooks.callHook,o.provide=(e,t)=>{let n=`$`+e;Y(o,n,t),Y(o.vueApp.config.globalProperties,n,t)},Y(o.vueApp,`$nuxt`,o),Y(o.vueApp.config.globalProperties,`$nuxt`,o);{window.addEventListener(R,e=>{o.callHook(`app:chunkError`,{error:e.payload}),e.payload?.message?.includes(`Unable to preload CSS`)&&e.preventDefault()}),window.useNuxtApp||=q;let e=o.hook(`app:error`,(...e)=>{f.NUXT_E1005({cause:e.length>1?e:e[0]})});o.hook(`app:mounted`,e)}let s=o.payload.config;return o.provide(`config`,s),o}async function H(e,t){if(typeof t==`function`){let{provide:n}=await e.runWithContext(()=>t(e))||{};if(n&&typeof n==`object`)for(let t in n)e.provide(t,n[t])}}async function U(e,t){let n;for(let r of t)try{await H(e,r)}catch(t){if(!e.payload.error)throw t;n||=t}if(n)throw e.payload.error||n}function W(e){if(typeof e==`function`)return e;let t=e._name||e.name;return delete e.name,Object.assign(e.setup||(()=>{}),e,{[B]:!0,_name:t})}function G(e,t,n){return z(e._id).set(e),e.vueApp.runWithContext(()=>n?t(...n):t())}function K(e){let t;return r()&&(t=a()?.appContext.app.$nuxt),t||=z(e).tryUse(),t||null}function q(e){let t=K(e);if(!t)throw f.NUXT_E1001();return t}function J(e){return q().$config}function Y(e,t,n){Object.defineProperty(e,t,{get:()=>n})}export{l as _,J as a,N as c,F as d,j as f,d as g,u as h,q as i,P as l,f as m,V as n,M as o,x as p,W as r,I as s,U as t,L as u};
```

# .output/public/favicon.ico

This is a binary file of the type: Binary

# .output/public/robots.txt

```txt
User-Agent: *
Disallow:

```

# .output/server/chunks/_/db.mjs

```mjs
import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

let _db = null;
function getDb() {
  if (!_db) {
    const dataDir = path.resolve(process.cwd(), ".data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, "stocks.db");
    _db = new Database(dbPath);
    _db.pragma("journal_mode = WAL");
    _db.exec(`
      CREATE TABLE IF NOT EXISTS stocks (
        id TEXT PRIMARY KEY,
        ticker TEXT UNIQUE NOT NULL,
        name TEXT,
        currency TEXT DEFAULT 'USD',
        current_price REAL,
        revenue_ttm REAL,
        shares_outstanding REAL,
        beta REAL DEFAULT 1.0,
        fetched_at TEXT,
        status TEXT DEFAULT 'research',
        margin_type TEXT DEFAULT 'net_income',
        growth_mode TEXT DEFAULT 'cagr',
        projected_growth REAL DEFAULT 0.10,
        growth_y1 REAL DEFAULT 0.10,
        growth_y2 REAL DEFAULT 0.10,
        growth_y3 REAL DEFAULT 0.10,
        growth_y4 REAL DEFAULT 0.10,
        growth_y5 REAL DEFAULT 0.10,
        revenue_y1 REAL,
        revenue_y2 REAL,
        revenue_y3 REAL,
        revenue_y4 REAL,
        revenue_y5 REAL,
        projected_margin REAL DEFAULT 0.20,
        target_multiple REAL DEFAULT 20.0,
        discount_rate REAL DEFAULT 0.10,
        risk_spread REAL DEFAULT 0.20,
        market_cap REAL,
        pe_trailing_raw REAL,
        pe_forward_raw REAL,
        margin_gross_raw REAL,
        margin_operating_raw REAL,
        margin_net_raw REAL,
        margin_fcf_raw REAL,
        total_cash REAL,
        total_debt REAL,
        free_cash_flow_raw REAL,
        analyst_target_price REAL,
        analyst_target_median REAL,
        analyst_target_low REAL,
        analyst_target_high REAL,
        analyst_growth_estimate REAL,
        analyst_count INTEGER,
        audit_data TEXT,
        thesis TEXT,
        created_at TEXT,
        updated_at TEXT
      );
    `);
    const safeAddColumn = (col, def) => {
      try {
        _db == null ? void 0 : _db.exec(`ALTER TABLE stocks ADD COLUMN ${col} ${def}`);
      } catch {
      }
    };
    safeAddColumn("currency", "TEXT DEFAULT 'USD'");
    safeAddColumn("beta", "REAL DEFAULT 1.0");
    safeAddColumn("margin_type", "TEXT DEFAULT 'net_income'");
    safeAddColumn("growth_mode", "TEXT DEFAULT 'cagr'");
    safeAddColumn("growth_y1", "REAL DEFAULT 0.10");
    safeAddColumn("growth_y2", "REAL DEFAULT 0.10");
    safeAddColumn("growth_y3", "REAL DEFAULT 0.10");
    safeAddColumn("growth_y4", "REAL DEFAULT 0.10");
    safeAddColumn("growth_y5", "REAL DEFAULT 0.10");
    safeAddColumn("revenue_y1", "REAL");
    safeAddColumn("revenue_y2", "REAL");
    safeAddColumn("revenue_y3", "REAL");
    safeAddColumn("revenue_y4", "REAL");
    safeAddColumn("revenue_y5", "REAL");
    safeAddColumn("target_multiple", "REAL DEFAULT 20.0");
    safeAddColumn("risk_spread", "REAL DEFAULT 0.20");
    safeAddColumn("market_cap", "REAL");
    safeAddColumn("pe_trailing_raw", "REAL");
    safeAddColumn("pe_forward_raw", "REAL");
    safeAddColumn("margin_gross_raw", "REAL");
    safeAddColumn("margin_operating_raw", "REAL");
    safeAddColumn("margin_net_raw", "REAL");
    safeAddColumn("margin_fcf_raw", "REAL");
    safeAddColumn("total_cash", "REAL");
    safeAddColumn("total_debt", "REAL");
    safeAddColumn("free_cash_flow_raw", "REAL");
    safeAddColumn("analyst_target_price", "REAL");
    safeAddColumn("analyst_target_median", "REAL");
    safeAddColumn("analyst_target_low", "REAL");
    safeAddColumn("analyst_target_high", "REAL");
    safeAddColumn("analyst_growth_estimate", "REAL");
    safeAddColumn("analyst_count", "INTEGER");
    safeAddColumn("audit_data", "TEXT");
  }
  return _db;
}

export { getDb as g };
//# sourceMappingURL=db.mjs.map

```

# .output/server/chunks/_/db.mjs.map

```map
{"version":3,"file":"db.mjs","sources":["../../../../server/utils/db.ts"],"names":[],"mappings":";;;;AAIA,IAAI,GAAA,GAAgC,IAAA;AAE7B,SAAS,KAAA,GAA2B;AACzC,EAAA,IAAI,CAAC,GAAA,EAAK;AACR,IAAA,MAAM,UAAU,IAAA,CAAK,OAAA,CAAQ,OAAA,CAAQ,GAAA,IAAO,OAAO,CAAA;AACnD,IAAA,IAAI,CAAC,EAAA,CAAG,UAAA,CAAW,OAAO,CAAA,EAAG;AAC3B,MAAA,EAAA,CAAG,SAAA,CAAU,OAAA,EAAS,EAAE,SAAA,EAAW,MAAM,CAAA;AAAA,IAC3C;AAEA,IAAA,MAAM,MAAA,GAAS,IAAA,CAAK,IAAA,CAAK,OAAA,EAAS,WAAW,CAAA;AAC7C,IAAA,GAAA,GAAM,IAAI,SAAS,MAAM,CAAA;AACzB,IAAA,GAAA,CAAI,OAAO,oBAAoB,CAAA;AAE/B,IAAA,GAAA,CAAI,IAAA,CAAK;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA,IAAA,CAkDR,CAAA;AAGD,IAAA,MAAM,aAAA,GAAgB,CAAC,GAAA,EAAa,GAAA,KAAgB;AAClD,MAAA,IAAI;AACF,QAAA,GAAA,IAAA,IAAA,GAAA,KAAA,CAAA,GAAA,GAAA,CAAK,IAAA,CAAK,CAAA,8BAAA,EAAiC,GAAG,CAAA,CAAA,EAAI,GAAG,CAAA,CAAA,CAAA;AAAA,MACvD,CAAA,CAAA,MAAQ;AAAA,MAAC;AAAA,IACX,CAAA;AAEA,IAAA,aAAA,CAAc,YAAY,oBAAoB,CAAA;AAC9C,IAAA,aAAA,CAAc,QAAQ,kBAAkB,CAAA;AACxC,IAAA,aAAA,CAAc,eAAe,2BAA2B,CAAA;AACxD,IAAA,aAAA,CAAc,eAAe,qBAAqB,CAAA;AAClD,IAAA,aAAA,CAAc,aAAa,mBAAmB,CAAA;AAC9C,IAAA,aAAA,CAAc,aAAa,mBAAmB,CAAA;AAC9C,IAAA,aAAA,CAAc,aAAa,mBAAmB,CAAA;AAC9C,IAAA,aAAA,CAAc,aAAa,mBAAmB,CAAA;AAC9C,IAAA,aAAA,CAAc,aAAa,mBAAmB,CAAA;AAC9C,IAAA,aAAA,CAAc,cAAc,MAAM,CAAA;AAClC,IAAA,aAAA,CAAc,cAAc,MAAM,CAAA;AAClC,IAAA,aAAA,CAAc,cAAc,MAAM,CAAA;AAClC,IAAA,aAAA,CAAc,cAAc,MAAM,CAAA;AAClC,IAAA,aAAA,CAAc,cAAc,MAAM,CAAA;AAClC,IAAA,aAAA,CAAc,mBAAmB,mBAAmB,CAAA;AACpD,IAAA,aAAA,CAAc,eAAe,mBAAmB,CAAA;AAChD,IAAA,aAAA,CAAc,cAAc,MAAM,CAAA;AAClC,IAAA,aAAA,CAAc,mBAAmB,MAAM,CAAA;AACvC,IAAA,aAAA,CAAc,kBAAkB,MAAM,CAAA;AACtC,IAAA,aAAA,CAAc,oBAAoB,MAAM,CAAA;AACxC,IAAA,aAAA,CAAc,wBAAwB,MAAM,CAAA;AAC5C,IAAA,aAAA,CAAc,kBAAkB,MAAM,CAAA;AACtC,IAAA,aAAA,CAAc,kBAAkB,MAAM,CAAA;AACtC,IAAA,aAAA,CAAc,cAAc,MAAM,CAAA;AAClC,IAAA,aAAA,CAAc,cAAc,MAAM,CAAA;AAClC,IAAA,aAAA,CAAc,sBAAsB,MAAM,CAAA;AAC1C,IAAA,aAAA,CAAc,wBAAwB,MAAM,CAAA;AAC5C,IAAA,aAAA,CAAc,yBAAyB,MAAM,CAAA;AAC7C,IAAA,aAAA,CAAc,sBAAsB,MAAM,CAAA;AAC1C,IAAA,aAAA,CAAc,uBAAuB,MAAM,CAAA;AAC3C,IAAA,aAAA,CAAc,2BAA2B,MAAM,CAAA;AAC/C,IAAA,aAAA,CAAc,iBAAiB,SAAS,CAAA;AACxC,IAAA,aAAA,CAAc,cAAc,MAAM,CAAA;AAAA,EACpC;AAEA,EAAA,OAAO,GAAA;AACT;;;;"}
```

# .output/server/chunks/_/error-500.mjs

```mjs
import { escapeHtml } from '@vue/shared';

//#region src/runtime/templates/error-500.ts
const _messages = {
	"appName": "Nuxt",
	"status": 500,
	"statusText": "Internal server error",
	"description": "This page is temporarily unavailable.",
	"refresh": "Refresh this page"
};
const template = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1,minimum-scale=1\" name=\"viewport\"><script>!function(){let e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(let e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(let t of e)if(\"childList\"===t.type)for(let e of t.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;let r=function(e){let r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),\"use-credentials\"===e.crossOrigin?r.credentials=\"include\":\"anonymous\"===e.crossOrigin?r.credentials=\"omit\":r.credentials=\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{box-sizing:border-box;border-style:solid;border-width:0;border-color:var(--un-default-border-color,#e5e7eb)}:after,:before{--un-content:\"\"}html{-webkit-text-size-adjust:100%;tab-size:4;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 #0000;--un-ring-shadow:0 0 #0000;--un-shadow-inset: ;--un-shadow:0 0 #0000;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:#93c5fd80;--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (width>=640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class=\"antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide\"><div class=\"max-w-520px text-center\"><h1 class=\"font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]\">" + escapeHtml(messages.status) + "</h1><h2 class=\"font-semibold mb-2 sm:text-3xl text-2xl\">" + escapeHtml(messages.statusText) + "</h2><p class=\"mb-4 px-2 text-[#64748B] text-md\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

export { template };
//# sourceMappingURL=error-500.mjs.map

```

# .output/server/chunks/_/error-500.mjs.map

```map
{"version":3,"file":"error-500.mjs","sources":["../../../../node_modules/@nuxt/nitro-server/dist/runtime/templates/error-500.mjs"],"names":[],"mappings":"","x_google_ignoreList":[0]}
```

# .output/server/chunks/nitro/nitro.mjs

```mjs
import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length).replace(/^\/+/, "");
  return "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = { ...defaults };
  for (const key of Object.keys(baseObject)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c=class{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c.prototype,i$1.prototype),Object.assign(c.prototype,l$1.prototype),c}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _rawReqUrl = event.node.req.url || "/";
    const _reqPath = _decodePath(event._path || _rawReqUrl);
    event._path = _reqPath;
    const _needsRawUrl = _reqPath !== _rawReqUrl;
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _needsRawUrl ? layer.route.length > 1 ? _rawReqUrl.slice(layer.route.length) || "/" : _rawReqUrl : _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function _decodePath(url) {
  const qIndex = url.indexOf("?");
  const path = qIndex === -1 ? url : url.slice(0, qIndex);
  const query = qIndex === -1 ? "" : url.slice(qIndex);
  const decodedPath = path.includes("%25") ? decodePath(path.replace(/%25/g, "%2525")) : decodePath(path);
  return decodedPath + query;
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$1=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "4120831a-0615-436c-be4d-62114a3785a0",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {}
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$1({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$1({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

//#region src/runtime/utils/error.ts
/**
* Nitro internal functions extracted from https://github.com/nitrojs/nitro/blob/v2/src/runtime/internal/utils.ts
*/
function isJsonRequest(event) {
	if (hasReqHeader(event, "accept", "text/html")) return false;
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

//#region src/runtime/handlers/error.ts
var error_default = async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) return;
	const defaultRes = await defaultHandler(error, event, { json: true });
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	const errorObject = defaultRes.body;
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	const reqHeaders = getRequestHeaders(event);
	const res = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"] ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) return;
	if (!res) {
		const { template } = await import('../_/error-500.mjs');
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	return send(event, html);
};

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [error_default, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const plugins = [
  
];

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2026-07-22T18:04:59.091Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"18-j8OIsL9qGDmNZ+lHhp2tyH4XtaE\"",
    "mtime": "2026-07-22T18:04:59.091Z",
    "size": 24,
    "path": "../public/robots.txt"
  },
  "/_nuxt/B0M4vlZc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"261-Lk8xCOpr4wtCGxcuPRGF5UVZmUQ\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 609,
    "path": "../public/_nuxt/B0M4vlZc.js"
  },
  "/_nuxt/BGVrjGLA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18f-OY+7iZOKzw8N6shqg9xyXRag3w4\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 399,
    "path": "../public/_nuxt/BGVrjGLA.js"
  },
  "/_nuxt/BEGRh-5H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b93d-wX1pJSkCRNi7nx9HHDEECoWnGfY\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 47421,
    "path": "../public/_nuxt/BEGRh-5H.js"
  },
  "/_nuxt/BIjnivpp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10fd-QgrARlSjnaISyg4aovcCG4fbtQs\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 4349,
    "path": "../public/_nuxt/BIjnivpp.js"
  },
  "/_nuxt/BWlekpQc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"120aa-s4W/kDFaMN9HKxoewcqwBSZtxJc\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 73898,
    "path": "../public/_nuxt/BWlekpQc.js"
  },
  "/_nuxt/Bp_tvWCv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"191-WlMitybUejKltL382HMGsGVrnYg\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 401,
    "path": "../public/_nuxt/Bp_tvWCv.js"
  },
  "/_nuxt/CBklhXOc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15e66-aGFUcPRKjLGWQyxpvf6W/7ciEDs\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 89702,
    "path": "../public/_nuxt/CBklhXOc.js"
  },
  "/_nuxt/CNs_Ozdc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b-1MHUJYdBtOvbvPMaiQxDXp3lHyw\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 27,
    "path": "../public/_nuxt/CNs_Ozdc.js"
  },
  "/_nuxt/CQiHN3Or.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d4e-BVBOK8HeKB7fuBrj+GJ7nOZiiyk\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 3406,
    "path": "../public/_nuxt/CQiHN3Or.js"
  },
  "/_nuxt/entry.CCFoIGny.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b39c-vH80jxJD98PO3sCmOttH7AMMktg\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 45980,
    "path": "../public/_nuxt/entry.CCFoIGny.css"
  },
  "/_nuxt/error-404.DjFB7pgG.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"97d-YnhaO1Owij5UL/QAPJTOO9/ADjw\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 2429,
    "path": "../public/_nuxt/error-404.DjFB7pgG.css"
  },
  "/_nuxt/error-500.BG9pmads.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"772-cy8i6KChroS+UBFHL4bmyNFMXac\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 1906,
    "path": "../public/_nuxt/error-500.BG9pmads.css"
  },
  "/_nuxt/oAaAuq3K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24c6-l6nfCxlAWkI+DLDY+4G8C6HPhX4\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 9414,
    "path": "../public/_nuxt/oAaAuq3K.js"
  },
  "/_nuxt/ttQ_F7QN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2064-GhMOFv4U2gx6AekpoP+s8IvF+mk\"",
    "mtime": "2026-07-22T18:04:59.086Z",
    "size": 8292,
    "path": "../public/_nuxt/ttQ_F7QN.js"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-x4M9HmOmso8hq/FnLOZpXWKdnK4\"",
    "mtime": "2026-07-22T18:04:59.076Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/4120831a-0615-436c-be4d-62114a3785a0.json": {
    "type": "application/json",
    "etag": "\"58-QW4V22aC0PsTf+7XTCYPfPI8mG0\"",
    "mtime": "2026-07-22T18:04:59.069Z",
    "size": 88,
    "path": "../public/_nuxt/builds/meta/4120831a-0615-436c-be4d-62114a3785a0.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
const _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const relative = function(from, to) {
  const _from = resolve(from).replace(_ROOT_FOLDER_RE, "$1").split("/");
  const _to = resolve(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
  if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) {
    return _to.join("/");
  }
  const _fromCopy = [..._from];
  for (const segment of _fromCopy) {
    if (_to[0] !== segment) {
      break;
    }
    _from.shift();
    _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _QMgDj7 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _SxA8c9 = defineEventHandler(() => {});

const _lazy_GkhHyG = () => import('../routes/api/stock/_ticker_.get.mjs');
const _lazy_VXvBy0 = () => import('../routes/api/stocks/_id_.delete.mjs');
const _lazy_nnBXJ0 = () => import('../routes/api/stocks/_id_.put.mjs');
const _lazy_MCJlMy = () => import('../routes/api/index.get.mjs');
const _lazy_iYjSQ6 = () => import('../routes/api/index.post.mjs');
const _lazy_WzK6wA = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _QMgDj7, lazy: false, middleware: true, method: undefined },
  { route: '/api/stock/:ticker', handler: _lazy_GkhHyG, lazy: true, middleware: false, method: "get" },
  { route: '/api/stocks/:id', handler: _lazy_VXvBy0, lazy: true, middleware: false, method: "delete" },
  { route: '/api/stocks/:id', handler: _lazy_nnBXJ0, lazy: true, middleware: false, method: "put" },
  { route: '/api/stocks', handler: _lazy_MCJlMy, lazy: true, middleware: false, method: "get" },
  { route: '/api/stocks', handler: _lazy_iYjSQ6, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_WzK6wA, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_WzK6wA, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch as $, nodeServer as A, defineRenderHandler as a, getQuery as b, createError$1 as c, defineEventHandler as d, encodePath as e, destr as f, getRouterParam as g, getRouteRules as h, relative as i, joinRelativeURL as j, joinURL as k, getResponseStatusText as l, getResponseStatus as m, useNitroApp as n, hasProtocol as o, defu as p, parseURL as q, readBody as r, sanitizeStatusCode as s, decodePath as t, useRuntimeConfig as u, isScriptProtocol as v, withQuery as w, parseQuery as x, withTrailingSlash as y, withoutTrailingSlash as z };
//# sourceMappingURL=nitro.mjs.map

```

# .output/server/chunks/nitro/nitro.mjs.map

```map
{"version":3,"file":"nitro.mjs","sources":["../../../../node_modules/destr/dist/index.mjs","../../../../node_modules/ufo/dist/index.mjs","../../../../node_modules/radix3/dist/index.mjs","../../../../node_modules/defu/dist/defu.mjs","../../../../node_modules/node-mock-http/dist/index.mjs","../../../../node_modules/h3/dist/index.mjs","../../../../node_modules/nitropack/node_modules/hookable/dist/index.mjs","../../../../node_modules/node-fetch-native/dist/native.mjs","../../../../node_modules/ofetch/dist/shared/ofetch.CWycOUEr.mjs","../../../../node_modules/ofetch/dist/node.mjs","../../../../node_modules/unstorage/dist/shared/unstorage.zVDD2mZo.mjs","../../../../node_modules/unstorage/dist/index.mjs","../../../../node_modules/unstorage/drivers/utils/index.mjs","../../../../node_modules/unstorage/drivers/utils/node-fs.mjs","../../../../node_modules/unstorage/drivers/fs-lite.mjs","../../../../node_modules/nitropack/dist/runtime/internal/storage.mjs","../../../../node_modules/ohash/dist/crypto/node/index.mjs","../../../../node_modules/nitropack/dist/runtime/internal/hash.mjs","../../../../node_modules/nitropack/dist/runtime/internal/cache.mjs","../../../../node_modules/klona/dist/index.mjs","../../../../node_modules/scule/dist/index.mjs","../../../../node_modules/nitropack/dist/runtime/internal/utils.env.mjs","../../../../node_modules/nitropack/dist/runtime/internal/config.mjs","../../../../node_modules/nitropack/node_modules/unctx/dist/index.mjs","../../../../node_modules/nitropack/dist/runtime/internal/context.mjs","../../../../node_modules/nitropack/dist/runtime/internal/route-rules-utils.mjs","../../../../node_modules/nitropack/dist/runtime/internal/route-rules.mjs","../../../../node_modules/nitropack/dist/runtime/internal/utils.mjs","../../../../node_modules/@nuxt/nitro-server/dist/runtime/utils/error.mjs","../../../../node_modules/@nuxt/nitro-server/dist/runtime/handlers/error.mjs","../../../../node_modules/nitropack/dist/runtime/internal/error/utils.mjs","../../../../node_modules/nitropack/dist/runtime/internal/error/prod.mjs","../../../../node_modules/pathe/dist/shared/pathe.M-eThtNZ.mjs","../../../../node_modules/nitropack/dist/runtime/internal/static.mjs","../../../../node_modules/nitropack/dist/runtime/internal/app.mjs","../../../../node_modules/nitropack/dist/runtime/internal/renderer.mjs","../../../../node_modules/nitropack/dist/runtime/internal/lib/http-graceful-shutdown.mjs","../../../../node_modules/nitropack/dist/runtime/internal/shutdown.mjs","../../../../node_modules/nitropack/dist/presets/node/runtime/node-server.mjs"],"names":["getQuery","createRouter","f","h","i","l","createError","mergeHeaders","s","nodeFetch","Headers","Headers$1","AbortController$1","normalizeKey","defineDriver","DRIVER_NAME","dirname","fsPromises","resolve","fsp","_inlineAppConfig","createRadixRouter","nitroApp","callNodeRequestHandler","fetchNodeRequestHandler","gracefulShutdown","HttpsServer","HttpServer"],"mappings":"","x_google_ignoreList":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38]}
```

# .output/server/chunks/routes/api/index.get.mjs

```mjs
import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { g as getDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'better-sqlite3';

const index_get = defineEventHandler(() => {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM stocks ORDER BY created_at DESC").all();
  return rows.map((r) => {
    if (r.audit_data && typeof r.audit_data === "string") {
      try {
        r.audit_data = JSON.parse(r.audit_data);
      } catch {
      }
    }
    return r;
  });
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map

```

# .output/server/chunks/routes/api/index.get.mjs.map

```map
{"version":3,"file":"index.get.mjs","sources":["../../../../../server/api/stocks/index.get.ts"],"names":[],"mappings":";;;;;;;;;;;;AAEA,kBAAA,mBAAA,MAAA;AACA,EAAA,MAAA,KAAA,KAAA,EAAA;AACA,EAAA,MAAA,IAAA,GAAA,EAAA,CAAA,OAAA,CAAA,+CAAA,EAAA,GAAA,EAAA;AACA,EAAA,OAAA,IAAA,CAAA,GAAA,CAAA,CAAA,CAAA,KAAA;AACA,IAAA,IAAA,CAAA,CAAA,UAAA,IAAA,OAAA,CAAA,CAAA,eAAA,QAAA,EAAA;AACA,MAAA,IAAA;AACA,QAAA,CAAA,CAAA,UAAA,GAAA,IAAA,CAAA,KAAA,CAAA,CAAA,CAAA,UAAA,CAAA;AAAA,MACA,CAAA,CAAA,MAAA;AAAA,MAAA;AAAA,IACA;AACA,IAAA,OAAA,CAAA;AAAA,EACA,CAAA,CAAA;AACA,CAAA,CAAA;;;;"}
```

# .output/server/chunks/routes/api/index.post.mjs

```mjs
import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { randomUUID } from 'node:crypto';
import { g as getDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'better-sqlite3';

const index_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga;
  const body = await readBody(event);
  if (!body || !body.ticker) {
    throw createError({
      statusCode: 400,
      statusMessage: "Ticker est requis"
    });
  }
  const db = getDb();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const ticker = String(body.ticker).trim().toUpperCase();
  const existing = db.prepare("SELECT * FROM stocks WHERE ticker = ?").get(ticker);
  const auditDataStr = body.audit_data ? typeof body.audit_data === "string" ? body.audit_data : JSON.stringify(body.audit_data) : null;
  if (existing) {
    const stmt = db.prepare(`
      UPDATE stocks SET
        name = ?,
        currency = ?,
        current_price = ?,
        revenue_ttm = ?,
        shares_outstanding = ?,
        beta = ?,
        fetched_at = ?,
        growth_mode = ?,
        projected_growth = ?,
        growth_y1 = ?,
        growth_y2 = ?,
        growth_y3 = ?,
        growth_y4 = ?,
        growth_y5 = ?,
        revenue_y1 = ?,
        revenue_y2 = ?,
        revenue_y3 = ?,
        revenue_y4 = ?,
        revenue_y5 = ?,
        margin_type = ?,
        projected_margin = ?,
        target_multiple = ?,
        discount_rate = ?,
        risk_spread = ?,
        market_cap = ?,
        pe_trailing_raw = ?,
        pe_forward_raw = ?,
        margin_gross_raw = ?,
        margin_operating_raw = ?,
        margin_net_raw = ?,
        margin_fcf_raw = ?,
        total_cash = ?,
        total_debt = ?,
        free_cash_flow_raw = ?,
        analyst_target_price = ?,
        analyst_target_median = ?,
        analyst_target_low = ?,
        analyst_target_high = ?,
        analyst_growth_estimate = ?,
        analyst_count = ?,
        audit_data = ?,
        updated_at = ?
      WHERE ticker = ?
    `);
    stmt.run(
      (_a = body.name) != null ? _a : existing.name,
      (_c = (_b = body.currency) != null ? _b : existing.currency) != null ? _c : "USD",
      (_d = body.current_price) != null ? _d : existing.current_price,
      (_e = body.revenue_ttm) != null ? _e : existing.revenue_ttm,
      (_f = body.shares_outstanding) != null ? _f : existing.shares_outstanding,
      (_h = (_g = body.beta) != null ? _g : existing.beta) != null ? _h : 1,
      (_i = body.fetched_at) != null ? _i : now,
      (_j = body.growth_mode) != null ? _j : existing.growth_mode,
      (_k = body.projected_growth) != null ? _k : existing.projected_growth,
      (_l = body.growth_y1) != null ? _l : existing.growth_y1,
      (_m = body.growth_y2) != null ? _m : existing.growth_y2,
      (_n = body.growth_y3) != null ? _n : existing.growth_y3,
      (_o = body.growth_y4) != null ? _o : existing.growth_y4,
      (_p = body.growth_y5) != null ? _p : existing.growth_y5,
      (_q = body.revenue_y1) != null ? _q : existing.revenue_y1,
      (_r = body.revenue_y2) != null ? _r : existing.revenue_y2,
      (_s = body.revenue_y3) != null ? _s : existing.revenue_y3,
      (_t = body.revenue_y4) != null ? _t : existing.revenue_y4,
      (_u = body.revenue_y5) != null ? _u : existing.revenue_y5,
      (_w = (_v = body.margin_type) != null ? _v : existing.margin_type) != null ? _w : "net_income",
      (_x = body.projected_margin) != null ? _x : existing.projected_margin,
      (_z = (_y = body.target_multiple) != null ? _y : existing.target_multiple) != null ? _z : 20,
      (_A = body.discount_rate) != null ? _A : existing.discount_rate,
      (_C = (_B = body.risk_spread) != null ? _B : existing.risk_spread) != null ? _C : 0.2,
      (_D = body.market_cap) != null ? _D : existing.market_cap,
      (_E = body.pe_trailing_raw) != null ? _E : existing.pe_trailing_raw,
      (_F = body.pe_forward_raw) != null ? _F : existing.pe_forward_raw,
      (_G = body.margin_gross_raw) != null ? _G : existing.margin_gross_raw,
      (_H = body.margin_operating_raw) != null ? _H : existing.margin_operating_raw,
      (_I = body.margin_net_raw) != null ? _I : existing.margin_net_raw,
      (_J = body.margin_fcf_raw) != null ? _J : existing.margin_fcf_raw,
      (_K = body.total_cash) != null ? _K : existing.total_cash,
      (_L = body.total_debt) != null ? _L : existing.total_debt,
      (_M = body.free_cash_flow_raw) != null ? _M : existing.free_cash_flow_raw,
      (_N = body.analyst_target_price) != null ? _N : existing.analyst_target_price,
      (_O = body.analyst_target_median) != null ? _O : existing.analyst_target_median,
      (_P = body.analyst_target_low) != null ? _P : existing.analyst_target_low,
      (_Q = body.analyst_target_high) != null ? _Q : existing.analyst_target_high,
      (_R = body.analyst_growth_estimate) != null ? _R : existing.analyst_growth_estimate,
      (_S = body.analyst_count) != null ? _S : existing.analyst_count,
      auditDataStr != null ? auditDataStr : existing.audit_data,
      now,
      ticker
    );
    const updatedRow = db.prepare("SELECT * FROM stocks WHERE ticker = ?").get(ticker);
    if (updatedRow && updatedRow.audit_data && typeof updatedRow.audit_data === "string") {
      try {
        updatedRow.audit_data = JSON.parse(updatedRow.audit_data);
      } catch {
      }
    }
    return updatedRow;
  } else {
    const id = randomUUID();
    const stmt = db.prepare(`
      INSERT INTO stocks (
        id, ticker, name, currency, current_price, revenue_ttm, shares_outstanding,
        beta, fetched_at, status, margin_type, growth_mode, projected_growth,
        growth_y1, growth_y2, growth_y3, growth_y4, growth_y5,
        revenue_y1, revenue_y2, revenue_y3, revenue_y4, revenue_y5,
        projected_margin, target_multiple, discount_rate, risk_spread,
        market_cap, pe_trailing_raw, pe_forward_raw, margin_gross_raw, margin_operating_raw,
        margin_net_raw, margin_fcf_raw, total_cash, total_debt, free_cash_flow_raw,
        analyst_target_price, analyst_target_median, analyst_target_low, analyst_target_high, analyst_growth_estimate, analyst_count, audit_data, thesis, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);
    stmt.run(
      id,
      ticker,
      (_T = body.name) != null ? _T : ticker,
      (_U = body.currency) != null ? _U : "USD",
      (_V = body.current_price) != null ? _V : null,
      (_W = body.revenue_ttm) != null ? _W : null,
      (_X = body.shares_outstanding) != null ? _X : null,
      (_Y = body.beta) != null ? _Y : 1,
      (_Z = body.fetched_at) != null ? _Z : now,
      (__ = body.status) != null ? __ : "research",
      (_$ = body.margin_type) != null ? _$ : "net_income",
      (_aa = body.growth_mode) != null ? _aa : "cagr",
      (_ba = body.projected_growth) != null ? _ba : 0.1,
      (_ca = body.growth_y1) != null ? _ca : 0.1,
      (_da = body.growth_y2) != null ? _da : 0.1,
      (_ea = body.growth_y3) != null ? _ea : 0.1,
      (_fa = body.growth_y4) != null ? _fa : 0.1,
      (_ga = body.growth_y5) != null ? _ga : 0.1,
      (_ha = body.revenue_y1) != null ? _ha : null,
      (_ia = body.revenue_y2) != null ? _ia : null,
      (_ja = body.revenue_y3) != null ? _ja : null,
      (_ka = body.revenue_y4) != null ? _ka : null,
      (_la = body.revenue_y5) != null ? _la : null,
      (_ma = body.projected_margin) != null ? _ma : 0.2,
      (_na = body.target_multiple) != null ? _na : 20,
      (_oa = body.discount_rate) != null ? _oa : 0.1,
      (_pa = body.risk_spread) != null ? _pa : 0.2,
      (_qa = body.market_cap) != null ? _qa : null,
      (_ra = body.pe_trailing_raw) != null ? _ra : null,
      (_sa = body.pe_forward_raw) != null ? _sa : null,
      (_ta = body.margin_gross_raw) != null ? _ta : null,
      (_ua = body.margin_operating_raw) != null ? _ua : null,
      (_va = body.margin_net_raw) != null ? _va : null,
      (_wa = body.margin_fcf_raw) != null ? _wa : null,
      (_xa = body.total_cash) != null ? _xa : null,
      (_ya = body.total_debt) != null ? _ya : null,
      (_za = body.free_cash_flow_raw) != null ? _za : null,
      (_Aa = body.analyst_target_price) != null ? _Aa : null,
      (_Ba = body.analyst_target_median) != null ? _Ba : null,
      (_Ca = body.analyst_target_low) != null ? _Ca : null,
      (_Da = body.analyst_target_high) != null ? _Da : null,
      (_Ea = body.analyst_growth_estimate) != null ? _Ea : null,
      (_Fa = body.analyst_count) != null ? _Fa : null,
      auditDataStr != null ? auditDataStr : null,
      (_Ga = body.thesis) != null ? _Ga : null,
      now,
      now
    );
    const newRow = db.prepare("SELECT * FROM stocks WHERE id = ?").get(id);
    if (newRow && newRow.audit_data && typeof newRow.audit_data === "string") {
      try {
        newRow.audit_data = JSON.parse(newRow.audit_data);
      } catch {
      }
    }
    return newRow;
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map

```

# .output/server/chunks/routes/api/index.post.mjs.map

```map
{"version":3,"file":"index.post.mjs","sources":["../../../../../server/api/stocks/index.post.ts"],"names":[],"mappings":";;;;;;;;;;;;AAGA,mBAAA,kBAAA,CAAA,OAAA,KAAA,KAAA;;AACA,EAAA,MAAA,IAAA,GAAA,MAAA,QAAA,CAAA,KAAA,CAAA;AAEA,EAAA,IAAA,CAAA,IAAA,IAAA,CAAA,IAAA,CAAA,MAAA,EAAA;AACA,IAAA,MAAA,WAAA,CAAA;AAAA,MACA,UAAA,EAAA,GAAA;AAAA,MACA,aAAA,EAAA;AAAA,KACA,CAAA;AAAA,EACA;AAEA,EAAA,MAAA,KAAA,KAAA,EAAA;AACA,EAAA,MAAA,GAAA,GAAA,iBAAA,IAAA,IAAA,EAAA,EAAA,WAAA,EAAA;AACA,EAAA,MAAA,SAAA,MAAA,CAAA,IAAA,CAAA,MAAA,CAAA,CAAA,IAAA,GAAA,WAAA,EAAA;AAEA,EAAA,MAAA,WAAA,EAAA,CAAA,OAAA,CAAA,uCAAA,CAAA,CAAA,IAAA,MAAA,CAAA;AACA,EAAA,MAAA,YAAA,GAAA,IAAA,CAAA,UAAA,GAAA,OAAA,IAAA,CAAA,UAAA,KAAA,QAAA,GAAA,IAAA,CAAA,UAAA,GAAA,IAAA,CAAA,SAAA,CAAA,IAAA,CAAA,UAAA,CAAA,GAAA,IAAA;AAEA,EAAA,IAAA,QAAA,EAAA;AACA,IAAA,MAAA,IAAA,GAAA,GAAA,OAAA,CAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA,IAAA,CA6CA,CAAA;AAEA,IAAA,IAAA,CAAA,GAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,IAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,IAAA;AAAA,MAAA,CACA,EAAA,GAAA,CAAA,EAAA,GAAA,IAAA,CAAA,QAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,aAAA,IAAA,GAAA,EAAA,GAAA,KAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,aAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,aAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,WAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,WAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,kBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,kBAAA;AAAA,MAAA,CACA,EAAA,GAAA,CAAA,EAAA,GAAA,IAAA,CAAA,IAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA,IAAA,GAAA,EAAA,GAAA,CAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,eAAA,IAAA,GAAA,EAAA,GAAA,GAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,WAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,WAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,gBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,gBAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,MAAA,CACA,EAAA,GAAA,CAAA,EAAA,GAAA,IAAA,CAAA,WAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,gBAAA,IAAA,GAAA,EAAA,GAAA,YAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,gBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,gBAAA;AAAA,MAAA,CACA,EAAA,GAAA,CAAA,EAAA,GAAA,IAAA,CAAA,eAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,oBAAA,IAAA,GAAA,EAAA,GAAA,EAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,aAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,aAAA;AAAA,MAAA,CACA,EAAA,GAAA,CAAA,EAAA,GAAA,IAAA,CAAA,WAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,gBAAA,IAAA,GAAA,EAAA,GAAA,GAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,eAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,eAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,cAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,cAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,gBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,gBAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,oBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,oBAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,cAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,cAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,cAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,cAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,kBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,kBAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,oBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,oBAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,qBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,qBAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,kBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,kBAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,mBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,mBAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,uBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,uBAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,aAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,aAAA;AAAA,MACA,sCAAA,QAAA,CAAA,UAAA;AAAA,MACA,GAAA;AAAA,MACA;AAAA,KACA;AAEA,IAAA,MAAA,aAAA,EAAA,CAAA,OAAA,CAAA,uCAAA,CAAA,CAAA,IAAA,MAAA,CAAA;AACA,IAAA,IAAA,cAAA,UAAA,CAAA,UAAA,IAAA,OAAA,UAAA,CAAA,eAAA,QAAA,EAAA;AACA,MAAA,IAAA;AAAA,QAAA,UAAA,CAAA,UAAA,GAAA,IAAA,CAAA,KAAA,CAAA,UAAA,CAAA,UAAA,CAAA;AAAA,MAAA,CAAA,CAAA,MAAA;AAAA,MAAA;AAAA,IACA;AACA,IAAA,OAAA,UAAA;AAAA,EACA,CAAA,MAAA;AACA,IAAA,MAAA,KAAA,UAAA,EAAA;AACA,IAAA,MAAA,IAAA,GAAA,GAAA,OAAA,CAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA,IAAA,CAoBA,CAAA;AAEA,IAAA,IAAA,CAAA,GAAA;AAAA,MACA,EAAA;AAAA,MACA,MAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,SAAA,IAAA,GAAA,EAAA,GAAA,MAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,aAAA,IAAA,GAAA,EAAA,GAAA,KAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,kBAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,gBAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,uBAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,SAAA,IAAA,GAAA,EAAA,GAAA,CAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,eAAA,IAAA,GAAA,EAAA,GAAA,GAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,WAAA,IAAA,GAAA,EAAA,GAAA,UAAA;AAAA,MAAA,CACA,EAAA,GAAA,IAAA,CAAA,gBAAA,IAAA,GAAA,EAAA,GAAA,YAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,gBAAA,IAAA,GAAA,GAAA,GAAA,MAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,qBAAA,IAAA,GAAA,GAAA,GAAA,GAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,cAAA,IAAA,GAAA,GAAA,GAAA,GAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,cAAA,IAAA,GAAA,GAAA,GAAA,GAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,cAAA,IAAA,GAAA,GAAA,GAAA,GAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,cAAA,IAAA,GAAA,GAAA,GAAA,GAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,cAAA,IAAA,GAAA,GAAA,GAAA,GAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,eAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,eAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,eAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,eAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,eAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,qBAAA,IAAA,GAAA,GAAA,GAAA,GAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,oBAAA,IAAA,GAAA,GAAA,GAAA,EAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,kBAAA,IAAA,GAAA,GAAA,GAAA,GAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,gBAAA,IAAA,GAAA,GAAA,GAAA,GAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,eAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,oBAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,mBAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,qBAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,yBAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,mBAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,mBAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,eAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,eAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,uBAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,yBAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,0BAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,uBAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,wBAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,4BAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,kBAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MACA,YAAA,IAAA,IAAA,GAAA,YAAA,GAAA,IAAA;AAAA,MAAA,CACA,GAAA,GAAA,IAAA,CAAA,WAAA,IAAA,GAAA,GAAA,GAAA,IAAA;AAAA,MACA,GAAA;AAAA,MACA;AAAA,KACA;AAEA,IAAA,MAAA,SAAA,EAAA,CAAA,OAAA,CAAA,mCAAA,CAAA,CAAA,IAAA,EAAA,CAAA;AACA,IAAA,IAAA,UAAA,MAAA,CAAA,UAAA,IAAA,OAAA,MAAA,CAAA,eAAA,QAAA,EAAA;AACA,MAAA,IAAA;AAAA,QAAA,MAAA,CAAA,UAAA,GAAA,IAAA,CAAA,KAAA,CAAA,MAAA,CAAA,UAAA,CAAA;AAAA,MAAA,CAAA,CAAA,MAAA;AAAA,MAAA;AAAA,IACA;AACA,IAAA,OAAA,MAAA;AAAA,EACA;AACA,CAAA,CAAA;;;;"}
```

# .output/server/chunks/routes/api/stock/_ticker_.get.mjs

```mjs
import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import YahooFinance from 'yahoo-finance2';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
const _ticker__get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G;
  const tickerParam = getRouterParam(event, "ticker");
  if (!tickerParam || typeof tickerParam !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Le param\xE8tre ticker est requis"
    });
  }
  const ticker = tickerParam.trim().toUpperCase();
  try {
    let quote = null;
    try {
      quote = await yahooFinance.quote(ticker);
    } catch (err) {
      console.warn(`[YahooFinance] Quote fetch failed for ${ticker}:`, (err == null ? void 0 : err.message) || err);
    }
    if (!quote || !quote.shortName && !quote.longName && !quote.regularMarketPrice) {
      throw createError({
        statusCode: 404,
        statusMessage: `Ticker '${ticker}' non trouv\xE9 ou donn\xE9es indisponibles`
      });
    }
    let summary = null;
    try {
      summary = await yahooFinance.quoteSummary(ticker, {
        modules: ["earningsTrend", "financialData", "summaryDetail", "defaultKeyStatistics"]
      });
    } catch (err) {
      console.warn(`[YahooFinance] QuoteSummary fetch failed for ${ticker}:`, (err == null ? void 0 : err.message) || err);
      summary = {};
    }
    const name = quote.shortName || quote.longName || ticker;
    const currentPrice = (_a = quote.regularMarketPrice) != null ? _a : null;
    const financialData = (summary == null ? void 0 : summary.financialData) || {};
    const summaryDetail = (summary == null ? void 0 : summary.summaryDetail) || {};
    const keyStats = (summary == null ? void 0 : summary.defaultKeyStatistics) || {};
    const earningsTrend = ((_b = summary == null ? void 0 : summary.earningsTrend) == null ? void 0 : _b.trend) || [];
    const revenueTTM = (_c = financialData.totalRevenue) != null ? _c : null;
    const sharesOutstanding = (_e = (_d = keyStats.sharesOutstanding) != null ? _d : quote.sharesOutstanding) != null ? _e : null;
    const currency = quote.currency || summaryDetail.currency || "USD";
    const rawBeta = (_g = (_f = summaryDetail.beta) != null ? _f : keyStats.beta) != null ? _g : 1;
    const beta = typeof rawBeta === "number" && isFinite(rawBeta) && rawBeta > 0 ? parseFloat(rawBeta.toFixed(2)) : 1;
    const defaultRiskSpread = parseFloat(clamp(0.1 + 0.05 * beta, 0.1, 0.25).toFixed(2));
    const marketCap = (_i = (_h = quote.marketCap) != null ? _h : summaryDetail.marketCap) != null ? _i : null;
    const peTrailingRaw = (_l = (_k = (_j = summaryDetail.trailingPE) != null ? _j : quote.trailingPE) != null ? _k : keyStats.trailingPE) != null ? _l : null;
    const peForwardRaw = (_o = (_n = (_m = summaryDetail.forwardPE) != null ? _m : keyStats.forwardPE) != null ? _n : quote.forwardPE) != null ? _o : null;
    const marginGrossRaw = (_p = financialData.grossMargins) != null ? _p : null;
    const marginOperatingRaw = (_q = financialData.operatingMargins) != null ? _q : null;
    const marginNetRaw = (_s = (_r = keyStats.profitMargins) != null ? _r : financialData.profitMargins) != null ? _s : null;
    const freeCashFlowRaw = (_t = financialData.freeCashflow) != null ? _t : null;
    const marginFcfRaw = revenueTTM && freeCashFlowRaw && revenueTTM > 0 ? freeCashFlowRaw / revenueTTM : null;
    const totalCash = (_u = financialData.totalCash) != null ? _u : null;
    const totalDebt = (_v = financialData.totalDebt) != null ? _v : null;
    const targetLowPrice = (_x = (_w = financialData.targetLowPrice) != null ? _w : summaryDetail.targetLowPrice) != null ? _x : null;
    const targetMedianPrice = (_z = (_y = financialData.targetMedianPrice) != null ? _y : summaryDetail.targetMedianPrice) != null ? _z : null;
    const targetMeanPrice = (_B = (_A = financialData.targetMeanPrice) != null ? _A : summaryDetail.targetMeanPrice) != null ? _B : null;
    const targetHighPrice = (_D = (_C = financialData.targetHighPrice) != null ? _C : summaryDetail.targetHighPrice) != null ? _D : null;
    const analystCount = (_F = (_E = financialData.numberOfAnalystOpinions) != null ? _E : keyStats.numberOfAnalystOpinions) != null ? _F : null;
    const targetMeanPotential = currentPrice && targetMeanPrice ? targetMeanPrice / currentPrice - 1 : null;
    const targetMedianPotential = currentPrice && targetMedianPrice ? targetMedianPrice / currentPrice - 1 : null;
    const trend1y = earningsTrend.find((t) => t.period === "+1y");
    const ntmRevenueGrowth = (_G = trend1y == null ? void 0 : trend1y.revenueEstimate) == null ? void 0 : _G.growth;
    const ttmRevenueGrowth = financialData.revenueGrowth;
    const validNTM = typeof ntmRevenueGrowth === "number" && isFinite(ntmRevenueGrowth) && ntmRevenueGrowth !== 0 ? ntmRevenueGrowth : null;
    const validTTM = typeof ttmRevenueGrowth === "number" && isFinite(ttmRevenueGrowth) && ttmRevenueGrowth !== 0 ? ttmRevenueGrowth : null;
    let selectedGrowth = 0.1;
    let growthSource = "Fallback Mod\xE8le Standard (10%)";
    let growthMode = "cagr";
    let g1 = 0.1, g2 = 0.1, g3 = 0.1, g4 = 0.1, g5 = 0.1;
    const growthCandidates = [];
    if (validNTM !== null) {
      selectedGrowth = validNTM;
      growthSource = "Consensus Analystes CA (+1Y NTM)";
      growthCandidates.push({
        name: "Consensus CA (+1Y NTM)",
        value: parseFloat(validNTM.toFixed(4)),
        status: "selected",
        note: "Consensus Analystes CA (+1Y NTM)"
      });
      growthCandidates.push({
        name: "Historique CA TTM R\xE9alis\xE9",
        value: validTTM !== null ? parseFloat(validTTM.toFixed(4)) : null,
        status: "ignored",
        note: "Non requis"
      });
      growthCandidates.push({
        name: "Fallback Standard (10%)",
        value: 0.1,
        status: "ignored",
        note: "Non requis"
      });
    } else if (validTTM !== null) {
      selectedGrowth = clamp(validTTM, -0.5, 0.8);
      growthSource = "Historique CA TTM R\xE9alis\xE9";
      growthCandidates.push({
        name: "Consensus CA (+1Y NTM)",
        value: null,
        status: "rejected",
        note: "Non disponible"
      });
      growthCandidates.push({
        name: "Historique CA TTM R\xE9alis\xE9",
        value: parseFloat(validTTM.toFixed(4)),
        status: "selected",
        note: "Historique CA TTM R\xE9alis\xE9"
      });
      growthCandidates.push({
        name: "Fallback Standard (10%)",
        value: 0.1,
        status: "ignored",
        note: "Non requis"
      });
    } else {
      selectedGrowth = 0.1;
      growthSource = "Fallback Mod\xE8le Standard (10%)";
      growthCandidates.push({
        name: "Consensus CA (+1Y NTM)",
        value: null,
        status: "rejected",
        note: "Non disponible"
      });
      growthCandidates.push({
        name: "Historique CA TTM R\xE9alis\xE9",
        value: null,
        status: "rejected",
        note: "Non disponible"
      });
      growthCandidates.push({
        name: "Fallback Standard (10%)",
        value: 0.1,
        status: "fallback",
        note: "\u26A0\uFE0F Valeur par d\xE9faut : 10.0%"
      });
    }
    g1 = selectedGrowth;
    if (selectedGrowth > 0.2) {
      growthMode = "explicit";
      g2 = parseFloat((0.5 * selectedGrowth).toFixed(4));
      g3 = 0.3;
      g4 = 0.2;
      g5 = 0.15;
      growthSource = `Consensus > 20% (${(selectedGrowth * 100).toFixed(0)}%) -> Mode Sur-Mesure`;
    } else {
      growthMode = "cagr";
      g2 = selectedGrowth;
      g3 = selectedGrowth;
      g4 = selectedGrowth;
      g5 = selectedGrowth;
    }
    let selectedMargin = 0.15;
    let marginSource = "Fallback Mod\xE8le Standard (15%)";
    const marginCandidates = [];
    if (typeof marginNetRaw === "number" && isFinite(marginNetRaw) && marginNetRaw > 0) {
      selectedMargin = clamp(marginNetRaw, 0.01, 0.8);
      marginSource = "Marge Nette TTM R\xE9elle";
      marginCandidates.push({
        name: "Marge Nette TTM R\xE9elle",
        value: parseFloat(marginNetRaw.toFixed(4)),
        status: "selected",
        note: "Marge Nette TTM R\xE9elle"
      });
      marginCandidates.push({
        name: "Fallback Standard (15%)",
        value: 0.15,
        status: "ignored",
        note: "Non requis"
      });
    } else {
      selectedMargin = 0.15;
      marginSource = "Fallback Mod\xE8le Standard (15%)";
      marginCandidates.push({
        name: "Marge Nette TTM R\xE9elle",
        value: marginNetRaw !== null ? parseFloat(marginNetRaw.toFixed(4)) : null,
        status: "rejected",
        note: "Rejet\xE9 : Non disponible ou n\xE9gatif"
      });
      marginCandidates.push({
        name: "Fallback Standard (15%)",
        value: 0.15,
        status: "fallback",
        note: "\u26A0\uFE0F Bo\xEEte d\xE9ficitaire : Marge par d\xE9faut \xE0 15.0%"
      });
    }
    let selectedPE = 20;
    let peSource = "Multiple par D\xE9faut (20.0x)";
    const peCandidates = [];
    if (typeof peForwardRaw === "number" && isFinite(peForwardRaw) && peForwardRaw > 0) {
      selectedPE = clamp(peForwardRaw, 5, 120);
      peSource = "Consensus Forward P/E";
      peCandidates.push({
        name: "Forward P/E",
        value: parseFloat(peForwardRaw.toFixed(2)),
        status: "selected",
        note: "Consensus Forward P/E"
      });
      peCandidates.push({
        name: "Trailing P/E",
        value: peTrailingRaw !== null ? parseFloat(peTrailingRaw.toFixed(2)) : null,
        status: "ignored",
        note: "Non requis"
      });
      peCandidates.push({
        name: "Multiple par D\xE9faut (20.0x)",
        value: 20,
        status: "ignored",
        note: "Non requis"
      });
    } else if (typeof peTrailingRaw === "number" && isFinite(peTrailingRaw) && peTrailingRaw > 0) {
      selectedPE = clamp(peTrailingRaw, 5, 120);
      peSource = "P/E Trailing TTM";
      peCandidates.push({
        name: "Forward P/E",
        value: null,
        status: "rejected",
        note: "Non disponible"
      });
      peCandidates.push({
        name: "Trailing P/E",
        value: parseFloat(peTrailingRaw.toFixed(2)),
        status: "selected",
        note: "P/E Trailing TTM"
      });
      peCandidates.push({
        name: "Multiple par D\xE9faut (20.0x)",
        value: 20,
        status: "ignored",
        note: "Non requis"
      });
    } else {
      selectedPE = 20;
      peSource = "Multiple par D\xE9faut (20.0x)";
      peCandidates.push({
        name: "Forward P/E",
        value: null,
        status: "rejected",
        note: "Non disponible"
      });
      peCandidates.push({
        name: "Trailing P/E",
        value: peTrailingRaw !== null ? parseFloat(peTrailingRaw.toFixed(2)) : null,
        status: "rejected",
        note: "Rejet\xE9 : B\xE9n\xE9fice N\xE9gatif ou non disponible"
      });
      peCandidates.push({
        name: "Multiple par D\xE9faut (20.0x)",
        value: 20,
        status: "fallback",
        note: "\u26A0\uFE0F Bo\xEEte non rentable / P/E absent : Multiple par d\xE9faut \xE0 20.0x"
      });
    }
    const rawKe = 0.04 + 0.05 * beta;
    const selectedDiscountRate = parseFloat(clamp(rawKe, 0.06, 0.135).toFixed(4));
    const discountCandidates = [];
    if (rawKe > 0.135) {
      discountCandidates.push({
        name: "CAPM Brut (4.0% + Beta \xD7 5.0%)",
        value: parseFloat(rawKe.toFixed(4)),
        status: "rejected",
        note: `Sup\xE9rieur au plafond maximum guardrail (13.5%)`
      });
      discountCandidates.push({
        name: "Taux Actualisation Plafonn\xE9 (Cap 13.5%)",
        value: 0.135,
        status: "selected",
        note: "Brid\xE9 par le Cap Maximum Guardrail (13.5%)"
      });
    } else if (rawKe < 0.06) {
      discountCandidates.push({
        name: "CAPM Brut (4.0% + Beta \xD7 5.0%)",
        value: parseFloat(rawKe.toFixed(4)),
        status: "rejected",
        note: `Inf\xE9rieur au plancher minimum guardrail (6.0%)`
      });
      discountCandidates.push({
        name: "Taux Actualisation Planch\xE9 (Floor 6.0%)",
        value: 0.06,
        status: "selected",
        note: "Brid\xE9 par le Floor Minimum Guardrail (6.0%)"
      });
    } else {
      discountCandidates.push({
        name: "CAPM Brut (4.0% + Beta \xD7 5.0%)",
        value: parseFloat(rawKe.toFixed(4)),
        status: "selected",
        note: "CAPM appliqu\xE9 tel quel (entre 6.0% et 13.5%)"
      });
    }
    const auditData = {
      growth: {
        selected: parseFloat(selectedGrowth.toFixed(4)),
        candidates: growthCandidates
      },
      margin: {
        selected: parseFloat(selectedMargin.toFixed(4)),
        candidates: marginCandidates
      },
      pe: {
        selected: parseFloat(selectedPE.toFixed(2)),
        candidates: peCandidates
      },
      discount_rate: {
        selected: selectedDiscountRate,
        candidates: discountCandidates
      }
    };
    return {
      ticker,
      name,
      currency,
      current_price: currentPrice,
      revenue_ttm: revenueTTM,
      shares_outstanding: sharesOutstanding,
      beta,
      fetched_at: (/* @__PURE__ */ new Date()).toISOString(),
      growth_mode: growthMode,
      default_growth: parseFloat(selectedGrowth.toFixed(4)),
      growth_y1: parseFloat(g1.toFixed(4)),
      growth_y2: parseFloat(g2.toFixed(4)),
      growth_y3: parseFloat(g3.toFixed(4)),
      growth_y4: parseFloat(g4.toFixed(4)),
      growth_y5: parseFloat(g5.toFixed(4)),
      growth_source: growthSource,
      default_margin_type: "net_income",
      default_margin: parseFloat(selectedMargin.toFixed(4)),
      margin_source: marginSource,
      default_target_multiple: parseFloat(selectedPE.toFixed(2)),
      pe_source: peSource,
      default_discount_rate: selectedDiscountRate,
      default_risk_spread: defaultRiskSpread,
      market_cap: marketCap,
      pe_trailing_raw: peTrailingRaw,
      pe_forward_raw: peForwardRaw,
      margin_gross_raw: marginGrossRaw,
      margin_operating_raw: marginOperatingRaw,
      margin_net_raw: marginNetRaw,
      margin_fcf_raw: marginFcfRaw,
      total_cash: totalCash,
      total_debt: totalDebt,
      free_cash_flow_raw: freeCashFlowRaw,
      analyst_target_low: targetLowPrice,
      analyst_target_median: targetMedianPrice,
      analyst_target_price: targetMeanPrice,
      analyst_target_high: targetHighPrice,
      analyst_target_mean_potential: targetMeanPotential,
      analyst_target_median_potential: targetMedianPotential,
      analyst_growth_estimate: validNTM != null ? validNTM : validTTM,
      analyst_count: analystCount,
      audit_data: auditData
    };
  } catch (error) {
    if (error && typeof error === "object" && error.statusCode && error.statusMessage && !error.response) {
      throw error;
    }
    const statusCode = typeof (error == null ? void 0 : error.statusCode) === "number" && error.statusCode >= 400 && error.statusCode < 600 ? error.statusCode : 404;
    const statusMessage = (error == null ? void 0 : error.statusMessage) || (error == null ? void 0 : error.message) || `Impossible de r\xE9cup\xE9rer les donn\xE9es pour le ticker '${ticker}'`;
    throw createError({
      statusCode,
      statusMessage: String(statusMessage)
    });
  }
});

export { _ticker__get as default };
//# sourceMappingURL=_ticker_.get.mjs.map

```

# .output/server/chunks/routes/api/stock/_ticker_.get.mjs.map

```map
{"version":3,"file":"_ticker_.get.mjs","sources":["../../../../../../server/api/stock/[ticker].get.ts"],"names":[],"mappings":";;;;;;;;;;;AAEA,MAAA,YAAA,GAAA,IAAA,YAAA,CAAA,EAAA,iBAAA,CAAA,aAAA,GAAA,CAAA;AAEA,SAAA,KAAA,CAAA,KAAA,EAAA,GAAA,EAAA,GAAA,EAAA;AACA,EAAA,OAAA,KAAA,GAAA,CAAA,GAAA,EAAA,KAAA,GAAA,CAAA,GAAA,EAAA,KAAA,CAAA,CAAA;AACA;AAEA,qBAAA,kBAAA,CAAA,OAAA,KAAA,KAAA;;AACA,EAAA,MAAA,WAAA,GAAA,cAAA,CAAA,KAAA,EAAA,QAAA,CAAA;AAEA,EAAA,IAAA,CAAA,WAAA,IAAA,OAAA,WAAA,KAAA,QAAA,EAAA;AACA,IAAA,MAAA,WAAA,CAAA;AAAA,MACA,UAAA,EAAA,GAAA;AAAA,MACA,aAAA,EAAA;AAAA,KACA,CAAA;AAAA,EACA;AAEA,EAAA,MAAA,MAAA,GAAA,WAAA,CAAA,IAAA,EAAA,CAAA,WAAA,EAAA;AAEA,EAAA,IAAA;AACA,IAAA,IAAA,KAAA,GAAA,IAAA;AACA,IAAA,IAAA;AACA,MAAA,KAAA,GAAA,MAAA,YAAA,CAAA,KAAA,CAAA,MAAA,CAAA;AAAA,IACA,SAAA,GAAA,EAAA;AACA,MAAA,OAAA,CAAA,KAAA,CAAA,sCAAA,EAAA,MAAA,CAAA,CAAA,CAAA,EAAA,CAAA,GAAA,IAAA,IAAA,GAAA,KAAA,CAAA,GAAA,GAAA,CAAA,YAAA,GAAA,CAAA;AAAA,IACA;AAEA,IAAA,IAAA,CAAA,KAAA,IAAA,CAAA,KAAA,CAAA,SAAA,IAAA,CAAA,KAAA,CAAA,QAAA,IAAA,CAAA,KAAA,CAAA,kBAAA,EAAA;AACA,MAAA,MAAA,WAAA,CAAA;AAAA,QACA,UAAA,EAAA,GAAA;AAAA,QACA,aAAA,EAAA,WAAA,MAAA,CAAA,2CAAA;AAAA,OACA,CAAA;AAAA,IACA;AAEA,IAAA,IAAA,OAAA,GAAA,IAAA;AACA,IAAA,IAAA;AACA,MAAA,OAAA,GAAA,MAAA,YAAA,CAAA,YAAA,CAAA,MAAA,EAAA;AAAA,QACA,OAAA,EAAA,CAAA,eAAA,EAAA,eAAA,EAAA,iBAAA,sBAAA;AAAA,OACA,CAAA;AAAA,IACA,SAAA,GAAA,EAAA;AACA,MAAA,OAAA,CAAA,KAAA,CAAA,6CAAA,EAAA,MAAA,CAAA,CAAA,CAAA,EAAA,CAAA,GAAA,IAAA,IAAA,GAAA,KAAA,CAAA,GAAA,GAAA,CAAA,YAAA,GAAA,CAAA;AACA,MAAA,OAAA,GAAA,EAAA;AAAA,IACA;AAEA,IAAA,MAAA,IAAA,GAAA,KAAA,CAAA,SAAA,IAAA,KAAA,CAAA,QAAA,IAAA,MAAA;AACA,IAAA,MAAA,YAAA,GAAA,CAAA,EAAA,GAAA,KAAA,CAAA,kBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AAEA,IAAA,MAAA,aAAA,GAAA,CAAA,OAAA,IAAA,IAAA,GAAA,KAAA,CAAA,GAAA,OAAA,CAAA,aAAA,KAAA,EAAA;AACA,IAAA,MAAA,aAAA,GAAA,CAAA,OAAA,IAAA,IAAA,GAAA,KAAA,CAAA,GAAA,OAAA,CAAA,aAAA,KAAA,EAAA;AACA,IAAA,MAAA,QAAA,GAAA,CAAA,OAAA,IAAA,IAAA,GAAA,KAAA,CAAA,GAAA,OAAA,CAAA,oBAAA,KAAA,EAAA;AACA,IAAA,MAAA,aAAA,GAAA,CAAA,CAAA,EAAA,GAAA,OAAA,IAAA,IAAA,GAAA,KAAA,CAAA,GAAA,OAAA,CAAA,aAAA,KAAA,IAAA,GAAA,KAAA,CAAA,GAAA,EAAA,CAAA,UAAA,EAAA;AAEA,IAAA,MAAA,UAAA,GAAA,CAAA,EAAA,GAAA,aAAA,CAAA,YAAA,KAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,qBAAA,EAAA,GAAA,CAAA,EAAA,GAAA,QAAA,CAAA,iBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,KAAA,CAAA,sBAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,QAAA,GAAA,KAAA,CAAA,QAAA,IAAA,aAAA,CAAA,QAAA,IAAA,KAAA;AAEA,IAAA,MAAA,WAAA,EAAA,GAAA,CAAA,EAAA,GAAA,aAAA,CAAA,IAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA,IAAA,GAAA,EAAA,GAAA,CAAA;AACA,IAAA,MAAA,IAAA,GAAA,OAAA,OAAA,KAAA,QAAA,IAAA,SAAA,OAAA,CAAA,IAAA,OAAA,GAAA,CAAA,GAAA,UAAA,CAAA,OAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA,GAAA,CAAA;AAEA,IAAA,MAAA,iBAAA,GAAA,UAAA,CAAA,KAAA,CAAA,GAAA,GAAA,IAAA,GAAA,IAAA,EAAA,GAAA,EAAA,IAAA,CAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAGA,IAAA,MAAA,aAAA,EAAA,GAAA,CAAA,EAAA,GAAA,KAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,aAAA,CAAA,cAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,aAAA,GAAA,CAAA,+BAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,MAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,YAAA,GAAA,CAAA,+BAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,SAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,KAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,cAAA,GAAA,CAAA,EAAA,GAAA,aAAA,CAAA,YAAA,KAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,kBAAA,GAAA,CAAA,EAAA,GAAA,aAAA,CAAA,gBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,gBAAA,EAAA,GAAA,CAAA,EAAA,GAAA,QAAA,CAAA,aAAA,KAAA,IAAA,GAAA,EAAA,GAAA,aAAA,CAAA,kBAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,eAAA,GAAA,CAAA,EAAA,GAAA,aAAA,CAAA,YAAA,KAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,eAAA,UAAA,IAAA,eAAA,IAAA,UAAA,GAAA,CAAA,GAAA,kBAAA,UAAA,GAAA,IAAA;AACA,IAAA,MAAA,SAAA,GAAA,CAAA,EAAA,GAAA,aAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,SAAA,GAAA,CAAA,EAAA,GAAA,aAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AAGA,IAAA,MAAA,kBAAA,EAAA,GAAA,CAAA,EAAA,GAAA,aAAA,CAAA,cAAA,KAAA,IAAA,GAAA,EAAA,GAAA,aAAA,CAAA,mBAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,qBAAA,EAAA,GAAA,CAAA,EAAA,GAAA,aAAA,CAAA,iBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,aAAA,CAAA,sBAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,mBAAA,EAAA,GAAA,CAAA,EAAA,GAAA,aAAA,CAAA,eAAA,KAAA,IAAA,GAAA,EAAA,GAAA,aAAA,CAAA,oBAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,mBAAA,EAAA,GAAA,CAAA,EAAA,GAAA,aAAA,CAAA,eAAA,KAAA,IAAA,GAAA,EAAA,GAAA,aAAA,CAAA,oBAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AACA,IAAA,MAAA,gBAAA,EAAA,GAAA,CAAA,EAAA,GAAA,aAAA,CAAA,uBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,4BAAA,IAAA,GAAA,EAAA,GAAA,IAAA;AAEA,IAAA,MAAA,mBAAA,GAAA,YAAA,IAAA,eAAA,GAAA,eAAA,GAAA,eAAA,CAAA,GAAA,IAAA;AACA,IAAA,MAAA,qBAAA,GAAA,YAAA,IAAA,iBAAA,GAAA,iBAAA,GAAA,eAAA,CAAA,GAAA,IAAA;AAKA,IAAA,MAAA,UAAA,aAAA,CAAA,IAAA,CAAA,CAAA,CAAA,KAAA,CAAA,CAAA,WAAA,KAAA,CAAA;AACA,IAAA,MAAA,gBAAA,GAAA,CAAA,EAAA,GAAA,OAAA,IAAA,IAAA,GAAA,KAAA,CAAA,GAAA,OAAA,CAAA,eAAA,KAAA,IAAA,GAAA,KAAA,CAAA,GAAA,EAAA,CAAA,MAAA;AACA,IAAA,MAAA,mBAAA,aAAA,CAAA,aAAA;AAEA,IAAA,MAAA,QAAA,GAAA,OAAA,gBAAA,KAAA,QAAA,IAAA,SAAA,gBAAA,CAAA,IAAA,gBAAA,KAAA,CAAA,GAAA,gBAAA,GAAA,IAAA;AACA,IAAA,MAAA,QAAA,GAAA,OAAA,gBAAA,KAAA,QAAA,IAAA,SAAA,gBAAA,CAAA,IAAA,gBAAA,KAAA,CAAA,GAAA,gBAAA,GAAA,IAAA;AAEA,IAAA,IAAA,cAAA,GAAA,GAAA;AACA,IAAA,IAAA,YAAA,GAAA,mCAAA;AACA,IAAA,IAAA,UAAA,GAAA,MAAA;AACA,IAAA,IAAA,EAAA,GAAA,KAAA,EAAA,GAAA,GAAA,EAAA,KAAA,GAAA,EAAA,EAAA,GAAA,KAAA,EAAA,GAAA,GAAA;AAEA,IAAA,MAAA,mBAAA,EAAA;AAEA,IAAA,IAAA,aAAA,IAAA,EAAA;AACA,MAAA,cAAA,GAAA,QAAA;AACA,MAAA,YAAA,GAAA,kCAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,wBAAA;AAAA,QACA,KAAA,EAAA,UAAA,CAAA,QAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,iCAAA;AAAA,QACA,KAAA,EAAA,aAAA,IAAA,GAAA,UAAA,CAAA,SAAA,OAAA,CAAA,CAAA,CAAA,CAAA,GAAA,IAAA;AAAA,QACA,MAAA,EAAA,SAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,yBAAA;AAAA,QACA,KAAA,EAAA,GAAA;AAAA,QACA,MAAA,EAAA,SAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AAAA,IACA,CAAA,MAAA,IAAA,aAAA,IAAA,EAAA;AACA,MAAA,cAAA,GAAA,KAAA,CAAA,QAAA,EAAA,CAAA,GAAA,EAAA,GAAA,CAAA;AACA,MAAA,YAAA,GAAA,iCAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,wBAAA;AAAA,QACA,KAAA,EAAA,IAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,iCAAA;AAAA,QACA,KAAA,EAAA,UAAA,CAAA,QAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,yBAAA;AAAA,QACA,KAAA,EAAA,GAAA;AAAA,QACA,MAAA,EAAA,SAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AAAA,IACA,CAAA,MAAA;AACA,MAAA,cAAA,GAAA,GAAA;AACA,MAAA,YAAA,GAAA,mCAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,wBAAA;AAAA,QACA,KAAA,EAAA,IAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,iCAAA;AAAA,QACA,KAAA,EAAA,IAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,yBAAA;AAAA,QACA,KAAA,EAAA,GAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AAAA,IACA;AAEA,IAAA,EAAA,GAAA,cAAA;AACA,IAAA,IAAA,iBAAA,GAAA,EAAA;AACA,MAAA,UAAA,GAAA,UAAA;AACA,MAAA,EAAA,GAAA,UAAA,CAAA,CAAA,GAAA,GAAA,cAAA,EAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AACA,MAAA,EAAA,GAAA,GAAA;AACA,MAAA,EAAA,GAAA,GAAA;AACA,MAAA,EAAA,GAAA,IAAA;AACA,MAAA,YAAA,GAAA,CAAA,iBAAA,EAAA,CAAA,cAAA,GAAA,GAAA,EAAA,OAAA,CAAA,CAAA,CAAA,CAAA,qBAAA,CAAA;AAAA,IACA,CAAA,MAAA;AACA,MAAA,UAAA,GAAA,MAAA;AACA,MAAA,EAAA,GAAA,cAAA;AACA,MAAA,EAAA,GAAA,cAAA;AACA,MAAA,EAAA,GAAA,cAAA;AACA,MAAA,EAAA,GAAA,cAAA;AAAA,IACA;AAKA,IAAA,IAAA,cAAA,GAAA,IAAA;AACA,IAAA,IAAA,YAAA,GAAA,mCAAA;AACA,IAAA,MAAA,mBAAA,EAAA;AAEA,IAAA,IAAA,OAAA,YAAA,KAAA,QAAA,IAAA,SAAA,YAAA,CAAA,IAAA,eAAA,CAAA,EAAA;AACA,MAAA,cAAA,GAAA,KAAA,CAAA,YAAA,EAAA,IAAA,EAAA,GAAA,CAAA;AACA,MAAA,YAAA,GAAA,2BAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,2BAAA;AAAA,QACA,KAAA,EAAA,UAAA,CAAA,YAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,yBAAA;AAAA,QACA,KAAA,EAAA,IAAA;AAAA,QACA,MAAA,EAAA,SAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AAAA,IACA,CAAA,MAAA;AACA,MAAA,cAAA,GAAA,IAAA;AACA,MAAA,YAAA,GAAA,mCAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,2BAAA;AAAA,QACA,KAAA,EAAA,iBAAA,IAAA,GAAA,UAAA,CAAA,aAAA,OAAA,CAAA,CAAA,CAAA,CAAA,GAAA,IAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,gBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,yBAAA;AAAA,QACA,KAAA,EAAA,IAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AAAA,IACA;AAKA,IAAA,IAAA,UAAA,GAAA,EAAA;AACA,IAAA,IAAA,QAAA,GAAA,gCAAA;AACA,IAAA,MAAA,eAAA,EAAA;AAEA,IAAA,IAAA,OAAA,YAAA,KAAA,QAAA,IAAA,SAAA,YAAA,CAAA,IAAA,eAAA,CAAA,EAAA;AACA,MAAA,UAAA,GAAA,KAAA,CAAA,YAAA,EAAA,CAAA,EAAA,GAAA,CAAA;AACA,MAAA,QAAA,GAAA,uBAAA;AACA,MAAA,YAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,aAAA;AAAA,QACA,KAAA,EAAA,UAAA,CAAA,YAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,YAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,cAAA;AAAA,QACA,KAAA,EAAA,kBAAA,IAAA,GAAA,UAAA,CAAA,cAAA,OAAA,CAAA,CAAA,CAAA,CAAA,GAAA,IAAA;AAAA,QACA,MAAA,EAAA,SAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,YAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,gCAAA;AAAA,QACA,KAAA,EAAA,EAAA;AAAA,QACA,MAAA,EAAA,SAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AAAA,IACA,CAAA,MAAA,IAAA,OAAA,aAAA,KAAA,QAAA,IAAA,SAAA,aAAA,CAAA,IAAA,gBAAA,CAAA,EAAA;AACA,MAAA,UAAA,GAAA,KAAA,CAAA,aAAA,EAAA,CAAA,EAAA,GAAA,CAAA;AACA,MAAA,QAAA,GAAA,kBAAA;AACA,MAAA,YAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,aAAA;AAAA,QACA,KAAA,EAAA,IAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,YAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,cAAA;AAAA,QACA,KAAA,EAAA,UAAA,CAAA,aAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,YAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,gCAAA;AAAA,QACA,KAAA,EAAA,EAAA;AAAA,QACA,MAAA,EAAA,SAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AAAA,IACA,CAAA,MAAA;AACA,MAAA,UAAA,GAAA,EAAA;AACA,MAAA,QAAA,GAAA,gCAAA;AACA,MAAA,YAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,aAAA;AAAA,QACA,KAAA,EAAA,IAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,YAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,cAAA;AAAA,QACA,KAAA,EAAA,kBAAA,IAAA,GAAA,UAAA,CAAA,cAAA,OAAA,CAAA,CAAA,CAAA,CAAA,GAAA,IAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AACA,MAAA,YAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,gCAAA;AAAA,QACA,KAAA,EAAA,EAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AAAA,IACA;AAKA,IAAA,MAAA,KAAA,GAAA,OAAA,IAAA,GAAA,IAAA;AACA,IAAA,MAAA,oBAAA,GAAA,WAAA,KAAA,CAAA,KAAA,EAAA,MAAA,KAAA,CAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AACA,IAAA,MAAA,qBAAA,EAAA;AAEA,IAAA,IAAA,QAAA,KAAA,EAAA;AACA,MAAA,kBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,mCAAA;AAAA,QACA,KAAA,EAAA,UAAA,CAAA,KAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA,CAAA,iDAAA;AAAA,OACA,CAAA;AACA,MAAA,kBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,4CAAA;AAAA,QACA,KAAA,EAAA,KAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AAAA,IACA,CAAA,MAAA,IAAA,QAAA,IAAA,EAAA;AACA,MAAA,kBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,mCAAA;AAAA,QACA,KAAA,EAAA,UAAA,CAAA,KAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA,CAAA,iDAAA;AAAA,OACA,CAAA;AACA,MAAA,kBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,4CAAA;AAAA,QACA,KAAA,EAAA,IAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AAAA,IACA,CAAA,MAAA;AACA,MAAA,kBAAA,CAAA,IAAA,CAAA;AAAA,QACA,IAAA,EAAA,mCAAA;AAAA,QACA,KAAA,EAAA,UAAA,CAAA,KAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,QACA,MAAA,EAAA,UAAA;AAAA,QACA,IAAA,EAAA;AAAA,OACA,CAAA;AAAA,IACA;AAEA,IAAA,MAAA,SAAA,GAAA;AAAA,MACA,MAAA,EAAA;AAAA,QACA,QAAA,EAAA,UAAA,CAAA,cAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,QACA,UAAA,EAAA;AAAA,OACA;AAAA,MACA,MAAA,EAAA;AAAA,QACA,QAAA,EAAA,UAAA,CAAA,cAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,QACA,UAAA,EAAA;AAAA,OACA;AAAA,MACA,EAAA,EAAA;AAAA,QACA,QAAA,EAAA,UAAA,CAAA,UAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,QACA,UAAA,EAAA;AAAA,OACA;AAAA,MACA,aAAA,EAAA;AAAA,QACA,QAAA,EAAA,oBAAA;AAAA,QACA,UAAA,EAAA;AAAA;AACA,KACA;AAEA,IAAA,OAAA;AAAA,MACA,MAAA;AAAA,MACA,IAAA;AAAA,MACA,QAAA;AAAA,MACA,aAAA,EAAA,YAAA;AAAA,MACA,WAAA,EAAA,UAAA;AAAA,MACA,kBAAA,EAAA,iBAAA;AAAA,MACA,IAAA;AAAA,MACA,UAAA,EAAA,iBAAA,IAAA,IAAA,EAAA,EAAA,WAAA,EAAA;AAAA,MACA,WAAA,EAAA,UAAA;AAAA,MACA,cAAA,EAAA,UAAA,CAAA,cAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,MACA,SAAA,EAAA,UAAA,CAAA,EAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,MACA,SAAA,EAAA,UAAA,CAAA,EAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,MACA,SAAA,EAAA,UAAA,CAAA,EAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,MACA,SAAA,EAAA,UAAA,CAAA,EAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,MACA,SAAA,EAAA,UAAA,CAAA,EAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,MACA,aAAA,EAAA,YAAA;AAAA,MACA,mBAAA,EAAA,YAAA;AAAA,MACA,cAAA,EAAA,UAAA,CAAA,cAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,MACA,aAAA,EAAA,YAAA;AAAA,MACA,uBAAA,EAAA,UAAA,CAAA,UAAA,CAAA,OAAA,CAAA,CAAA,CAAA,CAAA;AAAA,MACA,SAAA,EAAA,QAAA;AAAA,MACA,qBAAA,EAAA,oBAAA;AAAA,MACA,mBAAA,EAAA,iBAAA;AAAA,MACA,UAAA,EAAA,SAAA;AAAA,MACA,eAAA,EAAA,aAAA;AAAA,MACA,cAAA,EAAA,YAAA;AAAA,MACA,gBAAA,EAAA,cAAA;AAAA,MACA,oBAAA,EAAA,kBAAA;AAAA,MACA,cAAA,EAAA,YAAA;AAAA,MACA,cAAA,EAAA,YAAA;AAAA,MACA,UAAA,EAAA,SAAA;AAAA,MACA,UAAA,EAAA,SAAA;AAAA,MACA,kBAAA,EAAA,eAAA;AAAA,MACA,kBAAA,EAAA,cAAA;AAAA,MACA,qBAAA,EAAA,iBAAA;AAAA,MACA,oBAAA,EAAA,eAAA;AAAA,MACA,mBAAA,EAAA,eAAA;AAAA,MACA,6BAAA,EAAA,mBAAA;AAAA,MACA,+BAAA,EAAA,qBAAA;AAAA,MACA,yBAAA,QAAA,IAAA,IAAA,GAAA,QAAA,GAAA,QAAA;AAAA,MACA,aAAA,EAAA,YAAA;AAAA,MACA,UAAA,EAAA;AAAA,KACA;AAAA,EACA,SAAA,KAAA,EAAA;AACA,IAAA,IAAA,KAAA,IAAA,OAAA,KAAA,KAAA,QAAA,IAAA,KAAA,CAAA,cAAA,KAAA,CAAA,aAAA,IAAA,CAAA,KAAA,CAAA,QAAA,EAAA;AACA,MAAA,MAAA,KAAA;AAAA,IACA;AAEA,IAAA,MAAA,UAAA,GAAA,QAAA,KAAA,IAAA,IAAA,GAAA,MAAA,GAAA,KAAA,CAAA,UAAA,CAAA,KAAA,QAAA,IAAA,KAAA,CAAA,UAAA,IAAA,GAAA,IAAA,KAAA,CAAA,UAAA,GAAA,GAAA,GACA,KAAA,CAAA,UAAA,GACA,GAAA;AAEA,IAAA,MAAA,iBAAA,KAAA,IAAA,IAAA,GAAA,MAAA,GAAA,KAAA,CAAA,aAAA,MAAA,KAAA,IAAA,IAAA,GAAA,MAAA,GAAA,KAAA,CAAA,OAAA,CAAA,IAAA,gEAAA,MAAA,CAAA,CAAA,CAAA;AAEA,IAAA,MAAA,WAAA,CAAA;AAAA,MACA,UAAA;AAAA,MACA,aAAA,EAAA,OAAA,aAAA;AAAA,KACA,CAAA;AAAA,EACA;AACA,CAAA,CAAA;;;;"}
```

# .output/server/chunks/routes/api/stocks/_id_.delete.mjs

```mjs
import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { g as getDb } from '../../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'better-sqlite3';

const _id__delete = defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID requis"
    });
  }
  const db = getDb();
  const result = db.prepare("DELETE FROM stocks WHERE id = ?").run(id);
  if (result.changes === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Stock non trouv\xE9"
    });
  }
  return { success: true, id };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map

```

# .output/server/chunks/routes/api/stocks/_id_.delete.mjs.map

```map
{"version":3,"file":"_id_.delete.mjs","sources":["../../../../../../server/api/stocks/[id].delete.ts"],"names":[],"mappings":";;;;;;;;;;;;AAEA,oBAAA,kBAAA,CAAA,CAAA,KAAA,KAAA;AACA,EAAA,MAAA,EAAA,GAAA,cAAA,CAAA,KAAA,EAAA,IAAA,CAAA;AACA,EAAA,IAAA,CAAA,EAAA,EAAA;AACA,IAAA,MAAA,WAAA,CAAA;AAAA,MACA,UAAA,EAAA,GAAA;AAAA,MACA,aAAA,EAAA;AAAA,KACA,CAAA;AAAA,EACA;AAEA,EAAA,MAAA,KAAA,KAAA,EAAA;AACA,EAAA,MAAA,SAAA,EAAA,CAAA,OAAA,CAAA,iCAAA,CAAA,CAAA,IAAA,EAAA,CAAA;AAEA,EAAA,IAAA,MAAA,CAAA,YAAA,CAAA,EAAA;AACA,IAAA,MAAA,WAAA,CAAA;AAAA,MACA,UAAA,EAAA,GAAA;AAAA,MACA,aAAA,EAAA;AAAA,KACA,CAAA;AAAA,EACA;AAEA,EAAA,OAAA,EAAA,OAAA,EAAA,IAAA,EAAA,EAAA,EAAA;AACA,CAAA,CAAA;;;;"}
```

# .output/server/chunks/routes/api/stocks/_id_.put.mjs

```mjs
import { d as defineEventHandler, g as getRouterParam, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { g as getDb } from '../../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'better-sqlite3';

const _id__put = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID requis"
    });
  }
  const body = await readBody(event);
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Corps de requ\xEAte requis"
    });
  }
  const db = getDb();
  const existing = db.prepare("SELECT * FROM stocks WHERE id = ?").get(id);
  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: "Stock non trouv\xE9"
    });
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const stmt = db.prepare(`
    UPDATE stocks SET
      currency = ?,
      beta = ?,
      growth_mode = ?,
      projected_growth = ?,
      growth_y1 = ?,
      growth_y2 = ?,
      growth_y3 = ?,
      growth_y4 = ?,
      growth_y5 = ?,
      revenue_y1 = ?,
      revenue_y2 = ?,
      revenue_y3 = ?,
      revenue_y4 = ?,
      revenue_y5 = ?,
      margin_type = ?,
      projected_margin = ?,
      target_multiple = ?,
      discount_rate = ?,
      risk_spread = ?,
      thesis = ?,
      status = ?,
      updated_at = ?
    WHERE id = ?
  `);
  stmt.run(
    (_b = (_a = body.currency) != null ? _a : existing.currency) != null ? _b : "USD",
    (_d = (_c = body.beta) != null ? _c : existing.beta) != null ? _d : 1,
    (_e = body.growth_mode) != null ? _e : existing.growth_mode,
    (_f = body.projected_growth) != null ? _f : existing.projected_growth,
    (_g = body.growth_y1) != null ? _g : existing.growth_y1,
    (_h = body.growth_y2) != null ? _h : existing.growth_y2,
    (_i = body.growth_y3) != null ? _i : existing.growth_y3,
    (_j = body.growth_y4) != null ? _j : existing.growth_y4,
    (_k = body.growth_y5) != null ? _k : existing.growth_y5,
    (_l = body.revenue_y1) != null ? _l : existing.revenue_y1,
    (_m = body.revenue_y2) != null ? _m : existing.revenue_y2,
    (_n = body.revenue_y3) != null ? _n : existing.revenue_y3,
    (_o = body.revenue_y4) != null ? _o : existing.revenue_y4,
    (_p = body.revenue_y5) != null ? _p : existing.revenue_y5,
    (_q = body.margin_type) != null ? _q : existing.margin_type,
    (_r = body.projected_margin) != null ? _r : existing.projected_margin,
    (_s = body.target_multiple) != null ? _s : existing.target_multiple,
    (_t = body.discount_rate) != null ? _t : existing.discount_rate,
    (_u = body.risk_spread) != null ? _u : existing.risk_spread,
    (_v = body.thesis) != null ? _v : existing.thesis,
    (_w = body.status) != null ? _w : existing.status,
    now,
    id
  );
  return db.prepare("SELECT * FROM stocks WHERE id = ?").get(id);
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map

```

# .output/server/chunks/routes/api/stocks/_id_.put.mjs.map

```map
{"version":3,"file":"_id_.put.mjs","sources":["../../../../../../server/api/stocks/[id].put.ts"],"names":[],"mappings":";;;;;;;;;;;;AAEA,iBAAA,kBAAA,CAAA,OAAA,KAAA,KAAA;;AACA,EAAA,MAAA,EAAA,GAAA,cAAA,CAAA,KAAA,EAAA,IAAA,CAAA;AACA,EAAA,IAAA,CAAA,EAAA,EAAA;AACA,IAAA,MAAA,WAAA,CAAA;AAAA,MACA,UAAA,EAAA,GAAA;AAAA,MACA,aAAA,EAAA;AAAA,KACA,CAAA;AAAA,EACA;AAEA,EAAA,MAAA,IAAA,GAAA,MAAA,QAAA,CAAA,KAAA,CAAA;AACA,EAAA,IAAA,CAAA,IAAA,EAAA;AACA,IAAA,MAAA,WAAA,CAAA;AAAA,MACA,UAAA,EAAA,GAAA;AAAA,MACA,aAAA,EAAA;AAAA,KACA,CAAA;AAAA,EACA;AAEA,EAAA,MAAA,KAAA,KAAA,EAAA;AACA,EAAA,MAAA,WAAA,EAAA,CAAA,OAAA,CAAA,mCAAA,CAAA,CAAA,IAAA,EAAA,CAAA;AACA,EAAA,IAAA,CAAA,QAAA,EAAA;AACA,IAAA,MAAA,WAAA,CAAA;AAAA,MACA,UAAA,EAAA,GAAA;AAAA,MACA,aAAA,EAAA;AAAA,KACA,CAAA;AAAA,EACA;AAEA,EAAA,MAAA,GAAA,GAAA,iBAAA,IAAA,IAAA,EAAA,EAAA,WAAA,EAAA;AACA,EAAA,MAAA,IAAA,GAAA,GAAA,OAAA,CAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA,EAAA,CAyBA,CAAA;AAEA,EAAA,IAAA,CAAA,GAAA;AAAA,IAAA,CACA,EAAA,GAAA,CAAA,EAAA,GAAA,IAAA,CAAA,QAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,aAAA,IAAA,GAAA,EAAA,GAAA,KAAA;AAAA,IAAA,CACA,EAAA,GAAA,CAAA,EAAA,GAAA,IAAA,CAAA,IAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA,IAAA,GAAA,EAAA,GAAA,CAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,WAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,WAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,gBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,gBAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,SAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,SAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,UAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,UAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,WAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,WAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,gBAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,gBAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,eAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,eAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,aAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,aAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,WAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,WAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,MAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,MAAA;AAAA,IAAA,CACA,EAAA,GAAA,IAAA,CAAA,MAAA,KAAA,IAAA,GAAA,EAAA,GAAA,QAAA,CAAA,MAAA;AAAA,IACA,GAAA;AAAA,IACA;AAAA,GACA;AAEA,EAAA,OAAA,EAAA,CAAA,OAAA,CAAA,mCAAA,CAAA,CAAA,IAAA,EAAA,CAAA;AACA,CAAA,CAAA;;;;"}
```

# .output/server/chunks/routes/renderer.mjs

```mjs
import { u as useRuntimeConfig, e as encodePath, j as joinRelativeURL, a as defineRenderHandler, b as getQuery, c as createError, f as destr, h as getRouteRules, i as relative, k as joinURL, l as getResponseStatusText, m as getResponseStatus, n as useNitroApp } from '../nitro/nitro.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'unhead/server';
import { hasInjectionContext, inject, isRef, toValue } from 'vue';
import { DeprecationsPlugin } from 'unhead/legacy';
import { PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'unhead/plugins';
import { defineDiagnostics, createConsoleReporter } from 'nostics';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'vue-bundle-renderer/runtime';
import { renderToString } from 'vue/server-renderer';
import { stringify, uneval } from 'devalue';

/**
* E8xxx
* Nitro server runtime (SSR rendering / dev server) diagnostics.
*/
const docsBase = (code) => `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
const serverDiagnostics = /* #__PURE__ */ defineDiagnostics({
	docsBase,
	reporters: [/* @__PURE__ */ createConsoleReporter(void 0)],
	codes: {
		NUXT_E8001: {
			why: (p) => `\`render:html\` mutated \`body\`/\`bodyAppend\` while streaming (\`${p.path}\`). These fields are silently dropped because the body is about to stream.`,
			fix: "Use the `render:html:close` hook instead.",
			docs: false
		},
		NUXT_E8002: {
			why: (p) => `SSR streaming committed the response before render completed (\`${p.path}\`). The following mutations did not reach the client and were dropped:\n  - ${p.mutations}`,
			fix: (p) => `Move the mutation into a plugin (which runs before the shell is flushed), or opt this route out of streaming with \`routeRules: { '${p.path}': { streaming: false } }\` or the \`render:route\` hook.`,
			docs: false
		},
		NUXT_E8003: {
			why: (p) => `Failed to stringify dev server logs.${p.error ? ` Received \`${p.error}\`.` : ""}`,
			fix: "You can define your own reducer/reviver for rich types following the instructions in `https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload`.",
			docs: false
		},
		NUXT_E8004: {
			why: "The server bundle is not available.",
			fix: "Ensure the Nuxt build completed successfully and the server entry was emitted by your builder.",
			docs: false
		}
	}
});

const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;
const NUXT_SSR_STREAMING = false;

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function injectHead() {
  if (hasInjectionContext()) {
    const instance = inject(headSymbol);
    if (instance)
      return instance;
  }
  throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

const VueResolver = /* @__PURE__ */ Object.assign(
  (_, value) => isRef(value) ? toValue(value) : value,
  // identity for plain non-reactive values, so the SSR default init entry
  // keeps its precomputed fast path (see unhead/server createHead)
  { _static: true }
);

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const legacyPlugins = [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin];

const unheadOptions = {
  disableDefaults: true,
  plugins: legacyPlugins,
};

function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) return encodePath(path);
	return encodePath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function createSSRContext(event) {
	const url = encodeEventPath(event.path);
	const ssrContext = {
		url,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: void 0,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: /* @__PURE__ */ new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

//#region src/runtime/utils/paths.ts
function baseURL() {
	return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

//#region src/runtime/utils/renderer/cache.ts
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) res = fn().catch((err) => {
			res = null;
			throw err;
		});
		return res;
	};
}

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

//#region src/runtime/utils/renderer/build-files.ts
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('../virtual/entry.mjs').then(function (n) { return n.f; }).then((r) => r.default || r);
const getPrecomputedDependencies = () => import('../virtual/precomputed.mjs').then((r) => "default" in r ? r.default : r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) throw serverDiagnostics.NUXT_E8004();
	const renderer = createRenderer(createSSRApp, {
		precomputed: await getPrecomputedDependencies(),
		manifest: void 0,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = await getPrecomputedDependencies();
	const spaTemplate = await import('../virtual/_virtual_spa-template.mjs').then((r) => r.template).catch(() => "").then((r) => {
		{
			const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
			const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
			return APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG + (r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "");
		}
	});
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: void 0,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= /* @__PURE__ */ new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => import('../virtual/styles.mjs').then((r) => r.default || r));

//#region src/runtime/utils/renderer/inline-styles.ts
async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = /* @__PURE__ */ new Set();
	const promises = [];
	for (const mod of usedModules) if (mod in styleMap && styleMap[mod]) promises.push(styleMap[mod]());
	for (const styles of await Promise.all(promises)) for (const style of styles) inlinedStyles.add(style);
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

function renderPayloadJsonScript(opts) {
	const payload = {
		"type": "application/json",
		"innerHTML": opts.data ? encodeForwardSlashes(stringify(opts.data, opts.ssrContext["~payloadReducers"])) : "",
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	payload.id = "__NUXT_DATA__";
	if (opts.src) payload["data-src"] = opts.src;
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}
/**
* Encode forward slashes as unicode escape sequences to prevent
* Google from treating them as internal links and trying to crawl them.
* @see https://github.com/nuxt/nuxt/issues/24175
*/
function encodeForwardSlashes(str) {
	return str.replaceAll("/", "\\u002F");
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

const entryIds = [];

const entryFileName = "CBklhXOc.js";

//#region src/runtime/handlers/renderer.ts
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
let entryPath;
const handler = defineRenderHandler((event) => {
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) throw createError({
		status: 404,
		statusText: "Page Not Found: /__nuxt_error",
		message: "Page Not Found: /__nuxt_error"
	});
	return renderRoute(event, ssrError);
});
async function renderRoute(event, ssrError) {
	const nitroApp = useNitroApp();
	const ssrContext = createSSRContext(event);
	ssrContext.head.push(appHead);
	if (ssrError) {
		const status = ssrError.status || ssrError.statusCode;
		if (status) ssrError.status = ssrError.statusCode = Number.parseInt(status);
		if (typeof ssrError.data === "string") try {
			ssrError.data = destr(ssrError.data);
		} catch {}
		setSSRError(ssrContext, ssrError);
	}
	const routeOptions = getRouteRules(event);
	if (routeOptions.ssr === false) ssrContext.noSSR = true;
	!ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	const renderer = await getRenderer(ssrContext);
	for (const id of entryIds) ssrContext.modules.add(id);
	const canStream = NUXT_SSR_STREAMING;
	const renderRouteContext = {
		canStream,
		prefersStream: false
	};
	await nitroApp.hooks.callHook("render:route", renderRouteContext, { event });
	const _rendered = await (renderer.renderToString(ssrContext)).catch(async (error) => {
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") return {};
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	const inlinedStyles = !ssrContext["~renderResponse"] && !ssrContext._renderResponse && true ? await renderInlineStyles(ssrContext.modules ?? []) : [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	if (ssrContext.payload?.error && !ssrError) throw ssrContext.payload.error;
	const NO_SCRIPTS = routeOptions.noScripts;
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	if (!NO_SCRIPTS) {
		let path = entryPath;
		if (!path) {
			path = buildAssetsURL(entryFileName);
			if (ssrContext.runtimeConfig.app.cdnURL || /^(?:\/|\.+\/)/.test(path)) entryPath = path;
			else {
				path = relative(event.path.replace(/\/[^/]+$/, "/"), joinURL("/", path));
				if (!/^(?:\/|\.+\/)/.test(path)) path = `./${path}`;
			}
		}
		ssrContext.head.push({ script: [{
			type: "importmap",
			innerHTML: { imports: { "#entry": path } }
		}] });
	}
	if (inlinedStyles.length) ssrContext.head.push({ style: inlinedStyles });
	const link = [];
	for (const resource of Object.values(styles)) {
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) ssrContext.head.push({ link });
	if (!NO_SCRIPTS) {
		const dependencyOptions = ssrContext["~lazyHydratedModules"]?.size ? { exclude: ssrContext["~lazyHydratedModules"] } : void 0;
		ssrContext.head.push({ link: getPreloadLinks(ssrContext, renderer.rendererContext, dependencyOptions) });
		ssrContext.head.push({ link: getPrefetchLinks(ssrContext, renderer.rendererContext, dependencyOptions) });
		ssrContext.head.push({ script: renderPayloadJsonScript({
			ssrContext,
			data: stripInlineOnlyPayloadFields(ssrContext.payload)
		})   }, {
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			tagPosition,
			crossorigin: ""
		})) });
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [_rendered.html, APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
}
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) result.push(chunk);
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) return "";
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
function stripInlineOnlyPayloadFields(payload) {
	if (!payload.prefetchLinks) return payload;
	const { prefetchLinks: _, ...rest } = payload;
	return rest;
}

const renderer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: handler
}, Symbol.toStringTag, { value: 'Module' }));

export { VueResolver as V, baseURL as b, headSymbol as h, injectHead as i, renderer as r };
//# sourceMappingURL=renderer.mjs.map

```

# .output/server/chunks/routes/renderer.mjs.map

```map
{"version":3,"file":"renderer.mjs","sources":["../../../../node_modules/@nuxt/nitro-server/dist/runtime/diagnostics.mjs","../../../../node_modules/@unhead/vue/dist/shared/vue.DKb5ZKVl.mjs","../../../../node_modules/@unhead/vue/dist/shared/vue.D2XR8FqS.mjs","../../../../node_modules/@unhead/vue/dist/server.mjs","../../../../node_modules/@unhead/vue/dist/legacy.mjs","../../../../node_modules/@nuxt/nitro-server/dist/runtime/utils/renderer/app.mjs","../../../../node_modules/@nuxt/nitro-server/dist/runtime/utils/paths.mjs","../../../../node_modules/@nuxt/nitro-server/dist/runtime/utils/renderer/cache.mjs","../../../../node_modules/@nuxt/nitro-server/dist/runtime/utils/renderer/build-files.mjs","../../../../node_modules/@nuxt/nitro-server/dist/runtime/utils/renderer/inline-styles.mjs","../../../../node_modules/@nuxt/nitro-server/dist/runtime/utils/renderer/payload.mjs","../../../../node_modules/@nuxt/nitro-server/dist/runtime/handlers/renderer.mjs"],"names":["getQuery$1"],"mappings":"","x_google_ignoreList":[0,1,2,3,4,5,6,7,8,9,10,11]}
```

# .output/server/chunks/virtual/_virtual_spa-template.mjs

```mjs
const template = "";

export { template };
//# sourceMappingURL=_virtual_spa-template.mjs.map

```

# .output/server/chunks/virtual/_virtual_spa-template.mjs.map

```map
{"version":3,"file":"_virtual_spa-template.mjs","sources":[],"names":[],"mappings":";;;;"}
```

# .output/server/chunks/virtual/entry.mjs

```mjs
import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineProdDiagnostics } from 'nostics';
import { ansiFormatter } from 'nostics/formatters/ansi';
import { getCurrentScope, ref, watchEffect, getCurrentInstance, onBeforeUnmount, onDeactivated, onActivated, shallowReactive, reactive, effectScope, hasInjectionContext, createApp, provide, onErrorCaptured, onServerPrefetch, unref, createVNode, resolveDynamicComponent, inject, defineAsyncComponent, mergeProps, toRef, shallowRef, isReadonly, defineComponent, h, computed, useSSRContext, isRef, isShallow, isReactive, toRaw, isVNode, createCommentVNode, withCtx, Suspense, nextTick, Fragment } from 'vue';
import { c as createError, $ as $fetch, o as hasProtocol, k as joinURL, p as defu, w as withQuery, s as sanitizeStatusCode, q as parseURL, e as encodePath, t as decodePath, v as isScriptProtocol } from '../nitro/nitro.mjs';
import { i as injectHead$1, V as VueResolver, b as baseURL, h as headSymbol } from '../routes/renderer.mjs';
import { createMemoryHistory, createRouter, START_LOCATION, useRoute, RouterView } from 'vue-router';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import { walkResolver } from 'unhead/utils';

function useHead(input, options = {}) {
  const head = options.head || injectHead$1();
  return head.ssr ? head.push(input || {}, options) : clientUseHead(head, input, options);
}
function clientUseHead(head, input, options = {}) {
  const scope = getCurrentScope();
  if (scope && !scope.active) {
    return { patch() {
    }, dispose() {
    }, _i: -1 };
  }
  const deactivated = ref(false);
  if (options.onRendered && scope) {
    const _onRendered = options.onRendered;
    options = { ...options, onRendered: (ctx) => scope.run(() => _onRendered(ctx)) };
  }
  let entry;
  watchEffect(() => {
    const i = deactivated.value ? {} : walkResolver(input, VueResolver);
    if (entry) {
      entry.patch(i);
    } else {
      entry = head.push(i, options);
    }
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}

function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}

function _getAsyncLocalStorage() {
	return globalThis.AsyncLocalStorage || globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
}
function createContext(opts = {}) {
	let currentInstance;
	let isSingleton = false;
	const checkConflict = (instance) => {
		if (currentInstance && currentInstance !== instance) throw new Error("Context conflict");
	};
	let als;
	if (opts.asyncContext) {
		const _AsyncLocalStorage = opts.AsyncLocalStorage || _getAsyncLocalStorage();
		if (_AsyncLocalStorage) als = new _AsyncLocalStorage();
		else console.warn("[unctx] `AsyncLocalStorage` is not provided.");
	}
	const _wrapInstance = (instance) => als && instance !== null && typeof instance === "object" ? { __unctx_weak: new WeakRef(instance) } : instance;
	const _unwrapInstance = (store) => store && store.__unctx_weak ? store.__unctx_weak.deref() : store;
	const _getCurrentInstance = () => {
		if (als) {
			const store = als.getStore();
			if (store !== void 0) return _unwrapInstance(store);
		}
		return currentInstance;
	};
	return {
		use: () => {
			const _instance = _getCurrentInstance();
			if (_instance === void 0) throw new Error("Context is not available");
			return _instance;
		},
		tryUse: () => {
			return _getCurrentInstance();
		},
		set: (instance, replace) => {
			if (!replace) checkConflict(instance);
			currentInstance = instance;
			isSingleton = true;
		},
		unset: () => {
			currentInstance = void 0;
			isSingleton = false;
		},
		call: (instance, callback) => {
			checkConflict(instance);
			currentInstance = instance;
			try {
				return als ? als.run(_wrapInstance(instance), callback) : callback();
			} finally {
				if (!isSingleton) currentInstance = void 0;
			}
		},
		async callAsync(instance, callback) {
			currentInstance = instance;
			const onRestore = () => {
				currentInstance = instance;
			};
			const onLeave = () => currentInstance === instance ? onRestore : void 0;
			asyncHandlers.add(onLeave);
			try {
				const r = als ? als.run(_wrapInstance(instance), callback) : callback();
				if (!isSingleton) currentInstance = void 0;
				return await r;
			} finally {
				asyncHandlers.delete(onLeave);
			}
		}
	};
}
function createNamespace(defaultOpts = {}) {
	const contexts = {};
	return { get(key, opts = {}) {
		if (!contexts[key]) contexts[key] = createContext({
			...defaultOpts,
			...opts
		});
		return contexts[key];
	} };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
	const restores = [];
	for (const leaveHandler of asyncHandlers) {
		const restore = leaveHandler();
		if (restore) restores.push(restore);
	}
	const restore = () => {
		for (const restore of restores) restore();
	};
	let awaitable = function_();
	if (awaitable && typeof awaitable === "object" && "catch" in awaitable) awaitable = awaitable.catch((error) => {
		restore();
		throw error;
	});
	return [awaitable, restore];
}

//#region node_modules/nuxt/dist/app/diagnostics/_shared.js
/**
* Shared configuration for the runtime (E<N>xxx) diagnostics catalogs.
*
* Catalogs are split by domain and imported directly where used (no barrel),
* so the browser bundle only pulls in the codes a module references. Pair the
* pure-call annotations on each `defineDiagnostics()` with dev-guarded,
* statement-level report calls so report-only diagnostics strip from production.
*
* Codes are stable, fully-qualified `NUXT_E<NNNN>` identifiers. Codes with a
* dedicated docs page resolve a `see:` URL via {@link docsBase}; the rest opt
* out with `docs: false`.
*/
function docsBase(code) {
	return `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
}
var ansi = (open, close) => (s) => `\x1B[${open}m${s}\x1B[${close}m`;
ansiFormatter({
	red: ansi(31, 39),
	yellow: ansi(33, 39),
	cyan: ansi(36, 39),
	gray: ansi(90, 39),
	bold: ansi(1, 22),
	dim: ansi(2, 22)
});
var prodReporter = (diagnostic) => {
	console.error(`[${diagnostic.name}]`);
};
var prodReporters = [prodReporter];
//#endregion
//#region node_modules/nuxt/dist/app/diagnostics/core.js
/**
* E1xxx
* Core / Nuxt-instance / lifecycle runtime diagnostics.
*/
var appDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt.config.mjs
var nuxtLinkDefaults = {
	"componentName": "NuxtLink"};
//#endregion
//#region node_modules/nuxt/dist/app/nuxt.js
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext(id, { asyncContext: false });
}
var NuxtPluginIndicator = "__nuxt_plugin";
/** @since 3.0.0 */
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		versions: {
			get nuxt() {
				return "4.5.0";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: {},
		_asyncData: shallowReactive({}),
		_state: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const contextCaller = async function(hooks, args) {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
/** @since 3.0.0 */
async function applyPlugin(nuxtApp, plugin) {
	if (typeof plugin === "function") {
		const run = () => nuxtApp.runWithContext(() => plugin(nuxtApp));
		const { provide } = await run() || {};
		if (provide && typeof provide === "object") for (const key in provide) nuxtApp.provide(key, provide[key]);
	}
}
/** @since 3.0.0 */
async function applyPlugins(nuxtApp, plugins) {
	let error;
	for (const plugin of plugins) try {
		await applyPlugin(nuxtApp, plugin);
	} catch (e) {
		if (!nuxtApp.payload.error) throw e;
		error ||= e;
	}
	if (error) throw nuxtApp.payload.error || error;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin) {
	if (typeof plugin === "function") return plugin;
	const _name = plugin._name || plugin.name;
	delete plugin.name;
	return Object.assign(plugin.setup || (() => {}), plugin, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
/**
* Ensures that the setup function passed in has access to the Nuxt instance via `useNuxtApp`.
* @param nuxt A Nuxt instance
* @param setup The function to call
* @since 3.0.0
*/
function callWithNuxt(nuxt, setup, args) {
	const fn = () => setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw appDiagnostics.NUXT_E1001();
	return nuxtAppInstance;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}

//#region node_modules/nuxt/dist/app/utils.js
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
//#endregion
//#region node_modules/nuxt/dist/app/components/injections.js
var LayoutMetaSymbol = Symbol("layout-meta");
var LayoutSymbol = Symbol("layout");
var PageRouteSymbol = Symbol("route");
//#endregion
//#region node_modules/nuxt/dist/app/diagnostics/navigation.js
/**
* E2xxx
* Navigation / routing / middleware runtime diagnostics.
*/
var navigationDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/nuxt/dist/app/composables/router.js
/** @since 3.0.0 */
var useRouter = () => {
	return useNuxtApp()?.$router;
};
/** @since 3.0.0 */
var useRoute$1 = (() => {
	if (hasInjectionContext()) return inject(PageRouteSymbol, useNuxtApp()._route);
	return useNuxtApp()._route;
});
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
/** @since 3.0.0 */
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
var HTML_ATTR_ENCODE_MAP = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;"
};
function encodeForHtmlAttr(value) {
	return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
/**
* A helper that aids in programmatic navigation within your Nuxt application.
*
* Can be called on the server and on the client, within pages, route middleware, plugins, and more.
* @param {RouteLocationRaw | undefined | null} [to] - The route to navigate to. Accepts a route object, string path, `undefined`, or `null`. Defaults to '/'.
* @param {NavigateToOptions} [options] - Optional customization for controlling the behavior of the navigation.
* @returns {Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw} The navigation result, which varies depending on context and options.
* @see https://nuxt.com/docs/4.x/api/utils/navigate-to
* @since 3.0.0
*/
var navigateTo = (to, options) => {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw navigationDiagnostics.NUXT_E2001({ toPath });
		const { protocol } = new URL(toPath, "http://localhost");
		if (protocol && isScriptProtocol(protocol)) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		const location = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedHeader = encodeURL(location, isExternalHost);
			const encodedLoc = encodeForHtmlAttr(encodedHeader);
			nuxtApp.ssrContext["~renderResponse"] = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		};
		if (!isExternal && inMiddleware) {
			router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._scope.stop();
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
	return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
/**
* @internal
*/
function resolveRouteObject(to) {
	return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
/**
* @internal
*/
function encodeURL(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname.replace(/^\/{2,}/, "/") + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
/**
* Encode the pathname of a route location string. Ensures decoded paths like
* `/café` are percent-encoded to match vue-router's encoded route records.
* Already-encoded paths are not double-encoded.
* @internal
*/
function encodeRoutePath(url) {
	const parsed = parseURL(url);
	return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
//#endregion
//#region node_modules/nuxt/dist/app/composables/error.js
var NUXT_ERROR_SIGNATURE = "__nuxt_error";
/** @since 3.0.0 */
var useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
/** @since 3.0.0 */
var showError = (error) => {
	const nuxtError = createError$1(error);
	try {
		const error = /* @__PURE__ */ useError();
		error.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
/**
* Show the error page unless the current client is a crawler, in which case the
* bot receives the already server-rendered HTML instead (#32137, #35338).
*
* @internal
*/
var _showErrorUnlessCrawler = async (nuxtApp, error) => {
	await nuxtApp.runWithContext(() => showError(error));
};
/** @since 3.0.0 */
var isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
/** @since 3.0.0 */
var createError$1 = (error) => {
	if (typeof error !== "string" && error.statusText) error.message ??= error.statusText;
	const nuxtError = createError(error);
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	Object.defineProperty(nuxtError, "status", {
		get: () => nuxtError.statusCode,
		configurable: true
	});
	Object.defineProperty(nuxtError, "statusText", {
		get: () => nuxtError.statusMessage,
		configurable: true
	});
	return nuxtError;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Ffetch.mjs
if (!globalThis.$fetch) globalThis.$fetch = $fetch.create({ baseURL: baseURL() });
var $fetch$1 = globalThis.$fetch;
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fglobal-polyfills.mjs
if (!("global" in globalThis)) globalThis.global = globalThis;
//#endregion
//#region node_modules/nuxt/dist/head/runtime/island-head.js
/**
* No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
* augmentations on the same head are unaffected.
*/
function freezeHead(head) {
	const realPush = head.push;
	head.push = () => ({
		dispose: () => {},
		patch: () => {},
		_i: 0
	});
	return () => {
		head.push = realPush;
	};
}
//#endregion
//#region node_modules/nuxt/dist/head/runtime/plugins/unhead.server.js
var plugin$2 = defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		if (nuxtApp.ssrContext.islandContext) {
			const unfreeze = freezeHead(head);
			nuxtApp.hooks.hookOnce("app:created", unfreeze);
		}
		nuxtApp.vueApp.use(head);
	}
});
//#endregion
//#region node_modules/nuxt/dist/pages/runtime/utils.js
var ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
var interpolatePath = (route, match) => {
	return match.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => route.params[r.slice(1)]?.toString() || "");
};
var generateRouteKey$1 = (routeProps, override) => {
	const matchedRoute = routeProps.route.matched.find((m) => m.components?.default === routeProps.Component.type);
	const source = matchedRoute?.meta.key ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
	return typeof source === "function" ? source(routeProps.route) : source;
};
/** @since 3.9.0 */
function toArray$1(value) {
	return Array.isArray(value) ? value : [value];
}
//#endregion
//#region node_modules/nuxt/dist/app/components/utils.js
/**
* Internal utility
* @private
*/
var _wrapInTransition = (props, children) => {
	return { default: () => children.default?.() };
};
var ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
	const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
	return typeof source === "function" ? source(route) : source;
}
/**
* Utility used within router guards
* return true if the route has been changed with a page change during navigation
*/
function isChangingPage(to, from) {
	if (to === from || from === START_LOCATION) return false;
	if (generateRouteKey(to) !== generateRouteKey(from)) return true;
	if (to.matched.every((comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default)) return false;
	return true;
}
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
/**
* Internal utility
* @private
*/
function _mergeTransitionProps(routeProps) {
	const _props = [];
	for (const prop of routeProps) {
		if (!prop) continue;
		_props.push({
			...prop,
			onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0,
			onBeforeLeave: prop.onBeforeLeave ? toArray(prop.onBeforeLeave) : void 0
		});
	}
	return defu(..._props);
}
//#endregion
//#region node_modules/nuxt/dist/pages/runtime/router.options.js
var router_options_default = { scrollBehavior(to, from, savedPosition) {
	const nuxtApp = useNuxtApp();
	const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
	if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
		if (from.hash && !to.hash) return savedPosition ?? {
			left: 0,
			top: 0
		};
		if (to.hash) return {
			el: to.hash,
			top: _getHashElementScrollMarginTop(to.hash),
			behavior: hashScrollBehaviour
		};
		return false;
	}
	if ((typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop) === false) return false;
	if (from === START_LOCATION) return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
	return new Promise((resolve) => {
		const doScroll = () => {
			requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
		};
		nuxtApp.hooks.hookOnce("page:loading:end", () => {
			const transitionPromise = nuxtApp["~transitionPromise"];
			if (transitionPromise) transitionPromise.then(doScroll);
			else doScroll();
		});
	});
} };
function _getHashElementScrollMarginTop(selector) {
	try {
		const elem = (void 0).querySelector(selector);
		if (elem) return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
	} catch {}
	return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
	if (savedPosition) return savedPosition;
	if (to.hash) return {
		el: to.hash,
		top: _getHashElementScrollMarginTop(to.hash),
		behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
	};
	return {
		left: 0,
		top: 0
	};
}
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default = {
	hashMode: false,
	scrollBehaviorType: "auto",
	...router_options_default
};
Object.assign(Object.create(null), {});
var pageIslandRoutes = Object.assign(Object.create(null), {});
//#endregion
//#region node_modules/nuxt/dist/pages/runtime/validate.js
var middleware$1 = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
	let __temp, __restore;
	if (!to.meta?.validate) return;
	const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
	if (result === true) return;
	return createError$1({
		fatal: false,
		status: result && (result.status || result.statusCode) || 404,
		statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
		data: { path: to.fullPath }
	});
});
//#endregion
//#region node_modules/nuxt/dist/app/diagnostics/manifest.js
/**
* E5xxx
* App manifest / route-rules runtime diagnostics.
*/
var manifestDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froute-rules.mjs
var matcher = (m, p) => {
	return [];
};
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default = (path) => defu({}, ...matcher("", typeof path === "string" ? path.toLowerCase() : path).map((r) => r.data).reverse());
//#endregion
//#region node_modules/nuxt/dist/app/composables/manifest.js
var routeRulesMatcher$1 = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default;
function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	try {
		return routeRulesMatcher$1(path.toLowerCase());
	} catch (e) {
		manifestDiagnostics.NUXT_E5003({
			path,
			cause: e
		});
		return {};
	}
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fmiddleware.mjs
var globalMiddleware = [middleware$1, /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {})];
var namedMiddleware = {};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froutes.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default = [
	{
		name: "confirm",
		path: "/confirm",
		meta: { layout: false },
		component: () => import('../build/confirm-DDTSapWI.mjs')
	},
	{
		name: "login",
		path: "/login",
		meta: { layout: false },
		component: () => import('../build/login-DYwU1OIk.mjs')
	},
	{
		name: "index",
		path: "/",
		component: () => import('../build/pages-BD_c2QB6.mjs')
	}
];
//#endregion
//#region node_modules/nuxt/dist/pages/runtime/plugins/router.js
var plugin$1 = defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	async setup(nuxtApp) {
		let __temp, __restore;
		let routerBase = useRuntimeConfig().app.baseURL;
		const history = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.history?.(routerBase) ?? createMemoryHistory(routerBase);
		const routes = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes ? ([__temp, __restore] = executeAsync(() => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default)), __temp = await __temp, __restore(), __temp) ?? virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default : virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default;
		let startPosition;
		const router = createRouter({
			...virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default,
			scrollBehavior: (to, from, savedPosition) => {
				if (from === START_LOCATION) {
					startPosition = savedPosition;
					return;
				}
				if (virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior) {
					router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
					if ("scrollRestoration" in (void 0).history) {
						const unsub = router.beforeEach(() => {
							unsub();
							(void 0).history.scrollRestoration = "manual";
						});
					}
					return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
				}
			},
			history,
			routes
		});
		nuxtApp.vueApp.use(router);
		const previousRoute = shallowRef(router.currentRoute.value);
		router.afterEach((_to, from) => {
			previousRoute.value = from;
		});
		Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", { get: () => previousRoute.value });
		const initialURL = nuxtApp.ssrContext.url;
		const _route = shallowRef(router.currentRoute.value);
		const syncCurrentRoute = () => {
			_route.value = router.currentRoute.value;
		};
		router.afterEach((to, from) => {
			const lastTo = to.matched.at(-1)?.components?.default;
			const lastFrom = from.matched.at(-1)?.components?.default;
			if (lastTo === lastFrom) {
				if (generateRouteKey$1({
					route: to,
					Component: { type: lastTo }
				}) === generateRouteKey$1({
					route: from,
					Component: { type: lastFrom }
				})) syncCurrentRoute();
				return;
			}
			if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) syncCurrentRoute();
		});
		const route = { sync: syncCurrentRoute };
		for (const key in _route.value) Object.defineProperty(route, key, {
			get: () => _route.value[key],
			enumerable: true
		});
		nuxtApp._route = shallowReactive(route);
		nuxtApp._middleware ||= {
			global: [],
			named: {}
		};
		const error = /* @__PURE__ */ useError();
		const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
		if (!nuxtApp.ssrContext?.islandContext || isServerPage) router.afterEach(async (to, _from, failure) => {
			delete nuxtApp._processingMiddleware;
			if (failure) await nuxtApp.callHook("page:loading:end");
			if (failure?.type === 4) return;
			if (to.redirectedFrom && to.fullPath !== initialURL) await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
		});
		try {
			[__temp, __restore] = executeAsync(() => router.push(initialURL)), __temp = await __temp, __restore();
			[__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
		} catch (error) {
			[__temp, __restore] = executeAsync(() => _showErrorUnlessCrawler(nuxtApp, error)), await __temp, __restore();
		}
		const resolvedInitialRoute = router.currentRoute.value;
		syncCurrentRoute();
		if (nuxtApp.ssrContext?.islandContext && !isServerPage) return { provide: { router } };
		const initialLayout = nuxtApp.payload.state._layout;
		router.beforeEach(async (to, from) => {
			await nuxtApp.callHook("page:loading:start");
			to.meta = reactive(to.meta);
			if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) to.meta.layout = initialLayout;
			nuxtApp._processingMiddleware = true;
			if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
				const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
				for (const component of to.matched) {
					const componentMiddleware = component.meta.middleware;
					if (!componentMiddleware) continue;
					for (const entry of toArray$1(componentMiddleware)) middlewareEntries.add(entry);
				}
				const routeRules = getRouteRules({ path: to.path });
				if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) if (routeRules.appMiddleware[key]) middlewareEntries.add(key);
				else middlewareEntries.delete(key);
				for (const entry of middlewareEntries) {
					const middleware = typeof entry === "string" ? nuxtApp._middleware.named[entry] || await namedMiddleware[entry]?.().then((r) => r.default || r) : entry;
					if (!middleware) throw navigationDiagnostics.NUXT_E2004({
						entry: String(entry),
						validMiddleware: void 0
					});
					try {
						const result = await nuxtApp.runWithContext(() => middleware(to, from));
						if (result === false || result instanceof Error) {
							const error = result || createError$1({
								status: 404,
								statusText: `Page Not Found: ${initialURL}`
							});
							await nuxtApp.runWithContext(() => showError(error));
							return false;
						}
						if (result === true) continue;
						if (result === false) return result;
						if (result) {
							if (isNuxtError(result) && result.fatal) await nuxtApp.runWithContext(() => showError(result));
							return result;
						}
					} catch (err) {
						const error = createError$1(err);
						if (error.fatal) await nuxtApp.runWithContext(() => showError(error));
						return error;
					}
				}
			}
		});
		if (isServerPage) router.beforeResolve((to) => {
			const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
			const actual = to.matched.find((m) => (m.components?.default)?.__nuxt_island)?.components?.default;
			if (!expected || expected !== actual?.__nuxt_island) {
				nuxtApp.ssrContext["~renderResponse"] = {
					statusCode: 400,
					statusMessage: "Invalid island request path"
				};
				return false;
			}
		});
		router.onError(async () => {
			delete nuxtApp._processingMiddleware;
			await nuxtApp.callHook("page:loading:end");
		});
		router.afterEach((to) => {
			if (to.matched.length === 0 && !error.value) return nuxtApp.runWithContext(() => showError(createError$1({
				status: 404,
				fatal: false,
				statusText: `Page not found: ${to.fullPath}`,
				data: { path: to.fullPath }
			})));
		});
		nuxtApp.hooks.hookOnce("app:created", async () => {
			try {
				if ("name" in resolvedInitialRoute) resolvedInitialRoute.name = void 0;
				await router.replace({
					...resolvedInitialRoute,
					force: true
				});
				router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
			} catch (error) {
				await _showErrorUnlessCrawler(nuxtApp, error);
			}
		});
		return { provide: { router } };
	}
});
//#endregion
//#region node_modules/nuxt/dist/app/diagnostics/head.js
/**
* E6xxx
* Head / unhead runtime diagnostics.
*/
var unheadDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/nuxt/dist/head/runtime/composables.js
/**
* Injects the head client from the Nuxt context or Vue inject.
*/
function injectHead(nuxtApp) {
	const nuxt = nuxtApp || useNuxtApp();
	return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
		if (hasInjectionContext()) {
			const head = inject(headSymbol);
			if (!head) throw unheadDiagnostics.NUXT_E6001();
			return head;
		}
	});
}
function useHead$1(input, options = {}) {
	return useHead(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}
//#endregion
//#region node_modules/nuxt/dist/app/composables/payload.js
/**
* This is an experimental function for configuring passing rich data from server -> client.
* @since 3.4.0
*/
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
}
//#endregion
//#region node_modules/nuxt/dist/app/plugins/revive-payload.server.js
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isRef(data) && data.value],
	["Reactive", (data) => isReactive(data) && toRaw(data)]
];
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fplugins.server.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default = [
	plugin$2,
	plugin$1,
	/* @__PURE__ */ defineNuxtPlugin({
		name: "nuxt:revive-payload:server",
		setup() {
			for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
		}
	}),
	defineNuxtPlugin({ name: "nuxt:global-components" })
];
//#endregion
//#region node_modules/nuxt/dist/app/composables/layout.js
var routeRulesMatcher = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default;
function resolveLayoutName(route, name) {
	return unref(name) ?? route?.meta.layout ?? routeRulesMatcher(route?.path ?? "/").appLayout ?? "default";
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Flayouts.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default = { default: defineAsyncComponent(() => import('../build/default-Btys5Kwc.mjs').then((m) => m.default || m)) };
//#endregion
//#region node_modules/nuxt/dist/app/components/nuxt-layout.js
var LayoutLoader = defineComponent({
	name: "LayoutLoader",
	inheritAttrs: false,
	props: {
		name: String,
		layoutProps: Object
	},
	setup(props, context) {
		return () => h(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default[props.name], props.layoutProps, context.slots);
	}
});
var nuxt_layout_default = defineComponent({
	name: "NuxtLayout",
	inheritAttrs: false,
	props: {
		name: {
			type: [
				String,
				Boolean,
				Object
			],
			default: null
		},
		fallback: {
			type: [String, Object],
			default: null
		}
	},
	setup(props, context) {
		const nuxtApp = useNuxtApp();
		const injectedRoute = inject(PageRouteSymbol);
		const route = !injectedRoute || injectedRoute === useRoute$1() ? useRoute() : injectedRoute;
		const layout = computed(() => {
			let layout = resolveLayoutName(route, props.name);
			if (layout && !(layout in virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default)) {
				if (props.fallback) layout = unref(props.fallback);
			}
			return layout;
		});
		provide(LayoutSymbol, layout);
		const layoutRef = shallowRef();
		context.expose({ layoutRef });
		const done = nuxtApp.deferHydration();
		let lastLayout;
		return () => {
			const hasTransition = !!layout.value && layout.value in virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default && !!(route?.meta.layoutTransition ?? false);
			const transitionProps = hasTransition && _mergeTransitionProps([
				route?.meta.layoutTransition,
				false,
				{
					onBeforeLeave() {
						nuxtApp["~transitionPromise"] = new Promise((resolve) => {
							nuxtApp["~transitionFinish"] = resolve;
						});
					},
					onAfterLeave() {
						nuxtApp["~transitionFinish"]?.();
						delete nuxtApp["~transitionFinish"];
						delete nuxtApp["~transitionPromise"];
					}
				}
			]);
			const previouslyRenderedLayout = lastLayout;
			lastLayout = layout.value;
			return _wrapInTransition(transitionProps, { default: () => h(Suspense, {
				suspensible: true,
				onResolve: async () => {
					await nextTick(done);
				}
			}, { default: () => h(LayoutProvider, {
				layoutProps: mergeProps(context.attrs, route.meta.layoutProps ?? {}, { ref: layoutRef }),
				key: layout.value || void 0,
				name: layout.value,
				shouldProvide: !props.name,
				isRenderingNewLayout: (name) => {
					return name !== previouslyRenderedLayout && name === layout.value;
				},
				hasTransition
			}, context.slots) }) }).default();
		};
	}
});
var LayoutProvider = defineComponent({
	name: "NuxtLayoutProvider",
	inheritAttrs: false,
	props: {
		name: { type: [String, Boolean] },
		layoutProps: { type: Object },
		hasTransition: { type: Boolean },
		shouldProvide: { type: Boolean },
		isRenderingNewLayout: {
			type: Function,
			required: true
		}
	},
	setup(props, context) {
		const name = props.name;
		if (props.shouldProvide) provide(LayoutMetaSymbol, { isCurrent: (route) => name === false || name === resolveLayoutName(route) });
		const injectedRoute = inject(PageRouteSymbol);
		const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute$1();
		const enclosingLayout = inject(LayoutMetaSymbol, null);
		if (isNotWithinNuxtPage) {
			const vueRouterRoute = useRoute();
			const reactiveChildRoute = {};
			for (const _key in vueRouterRoute) {
				const key = _key;
				Object.defineProperty(reactiveChildRoute, key, {
					enumerable: true,
					get: () => {
						return props.isRenderingNewLayout(props.name) && (!enclosingLayout || enclosingLayout.isCurrent(vueRouterRoute)) ? vueRouterRoute[key] : injectedRoute[key];
					}
				});
			}
			provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
		}
		return () => {
			if (!name || typeof name === "string" && !(name in virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default)) return context.slots.default?.();
			return h(LayoutLoader, {
				key: name,
				layoutProps: props.layoutProps,
				name
			}, context.slots);
		};
	}
});
//#endregion
//#region node_modules/nuxt/dist/app/components/route-provider.js
var defineRouteProvider = (name = "RouteProvider") => defineComponent({
	name,
	props: {
		route: {
			type: Object,
			required: true
		},
		vnode: Object,
		vnodeRef: Object,
		renderKey: String,
		trackRootNodes: Boolean
	},
	setup(props) {
		const previousKey = props.renderKey;
		const previousRoute = props.route;
		const route = {};
		for (const key in props.route) Object.defineProperty(route, key, {
			get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
			enumerable: true
		});
		provide(PageRouteSymbol, shallowReactive(route));
		return () => {
			if (!props.vnode) return props.vnode;
			return h(props.vnode, { ref: props.vnodeRef });
		};
	}
});
var RouteProvider = defineRouteProvider();
//#endregion
//#region node_modules/nuxt/dist/pages/runtime/page.js
var page_default = defineComponent({
	name: "NuxtPage",
	inheritAttrs: false,
	props: {
		name: { type: String },
		transition: {
			type: [Boolean, Object],
			default: void 0
		},
		keepalive: {
			type: [Boolean, Object],
			default: void 0
		},
		route: { type: Object },
		pageKey: {
			type: [Function, String],
			default: null
		}
	},
	setup(props, { attrs, slots, expose }) {
		const nuxtApp = useNuxtApp();
		const pageRef = ref();
		inject(PageRouteSymbol, null);
		expose({ pageRef });
		inject(LayoutMetaSymbol, null);
		nuxtApp.deferHydration();
		return () => {
			return h(RouterView, {
				name: props.name,
				route: props.route,
				...attrs
			}, { default: markStableSlot((routeProps) => {
				return h(Suspense, { suspensible: true }, { default() {
					return h(RouteProvider, {
						vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
						route: routeProps.route,
						vnodeRef: pageRef
					});
				} });
			}) });
		};
	}
});
function markStableSlot(fn) {
	const wrapped = ((routeProps) => {
		const result = fn(routeProps);
		if (Array.isArray(result)) return result;
		if (result == null || !isVNode(result)) return [createCommentVNode()];
		return [result];
	});
	wrapped._n = true;
	return wrapped;
}
function normalizeSlot(slot, data) {
	const slotContent = slot(data);
	return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region app/app.vue
var _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	const _component_NuxtLayout = nuxt_layout_default;
	const _component_NuxtPage = page_default;
	_push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent, _scopeId));
			else return [createVNode(_component_NuxtPage)];
		}),
		_: 1
	}, _parent));
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region node_modules/nuxt/dist/app/components/nuxt-error-page.vue
var _sfc_main$1 = {
	__name: "nuxt-error-page",
	__ssrInlineRender: true,
	props: { error: Object },
	setup(__props) {
		const _error = __props.error;
		const status = Number(_error.statusCode || 500);
		const is404 = status === 404;
		const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
		const description = _error.message || _error.toString();
		const stack = void 0;
		const _Error404 = defineAsyncComponent(() => import('../build/error-404-BEWSXgNU.mjs'));
		const _Error = defineAsyncComponent(() => import('../build/error-500-B-0dffc5.mjs'));
		const ErrorTemplate = is404 ? _Error404 : _Error;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({
				status: unref(status),
				statusText: unref(statusText),
				statusCode: unref(status),
				statusMessage: unref(statusText),
				description: unref(description),
				stack: unref(stack)
			}, _attrs), null, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fisland-renderer.mjs
var IslandRenderer = () => null;
//#endregion
//#region node_modules/nuxt/dist/app/components/nuxt-root.vue
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute$1());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
		const error = /* @__PURE__ */ useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		function invokeAppErrorHandler(err, target, info) {
			const errorHandler = nuxtApp.vueApp.config.errorHandler;
			if (errorHandler && !errorHandler.__nuxt_default) try {
				errorHandler(err, target, info);
			} catch (handlerError) {
				console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
			}
		}
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(err));
				onServerPrefetch(() => p);
				invokeAppErrorHandler(err, target, info);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				},
				_: 1
			});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
//#region node_modules/nuxt/dist/app/entry.js
var entry$1 = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(_sfc_main);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createError$1(error);
	}
	if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) throw new Error("skipping render");
	return vueApp;
};
var entry_default = ((ssrContext) => entry$1(ssrContext));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: entry_default
}, Symbol.toStringTag, { value: 'Module' }));

export { $fetch$1 as $, _plugin_vue_export_helper_default as _, useRouter as a, useRuntimeConfig as b, useNuxtApp as c, nuxtLinkDefaults as d, encodeRoutePath as e, entry as f, navigateTo as n, resolveRouteObject as r, useHead$1 as u };
//# sourceMappingURL=entry.mjs.map

```

# .output/server/chunks/virtual/entry.mjs.map

```map
{"version":3,"file":"entry.mjs","sources":["../../../../node_modules/@unhead/vue/dist/shared/vue.6FLi74du.mjs","../../../../node_modules/hookable/dist/index.mjs","../../../../node_modules/unctx/dist/index.mjs","../../../../node_modules/.cache/nuxt/.nuxt/dist/server/_nuxt/nuxt-B1ii49By.js","../../../../node_modules/.cache/nuxt/.nuxt/dist/server/server.mjs"],"names":["injectHead","START_LOCATION$1","entry"],"mappings":"","x_google_ignoreList":[0,1,2,3,4]}
```

# .output/server/chunks/virtual/precomputed.mjs

```mjs
const client_precomputed = ((h,j,k,m,o,q,u,x)=>({dependencies:{"_BWlekpQc.js":{scripts:{},styles:{},preload:{"_BWlekpQc.js":h={resourceType:"script",module:true,prefetch:true,preload:true,file:"BWlekpQc.js",name:"runtime-core.esm-bundler"}},prefetch:{}},"_ttQ_F7QN.js":{scripts:{},styles:{},preload:{"_ttQ_F7QN.js":j={resourceType:"script",module:true,prefetch:true,preload:true,file:"ttQ_F7QN.js",name:"nuxt",imports:["_BWlekpQc.js"]},"_BWlekpQc.js":h},prefetch:{}},"_BIjnivpp.js":{scripts:{},styles:{},preload:{"_BIjnivpp.js":k={resourceType:"script",module:true,prefetch:true,preload:true,file:"BIjnivpp.js",name:"dist"}},prefetch:{}},"layouts/default.vue":{scripts:{},styles:{},preload:{"layouts/default.vue":m={resourceType:"script",module:true,prefetch:true,preload:true,file:"B0M4vlZc.js",name:"default",src:"layouts/default.vue",isDynamicEntry:true,imports:["_BWlekpQc.js","../node_modules/nuxt/dist/app/entry.js"]},"_BWlekpQc.js":h},prefetch:{}},"../node_modules/nuxt/dist/app/components/error-500.vue":{scripts:{},styles:{},preload:{"../node_modules/nuxt/dist/app/components/error-500.vue":o={resourceType:"script",module:true,prefetch:true,preload:true,file:"CQiHN3Or.js",name:"error-500",src:"../node_modules/nuxt/dist/app/components/error-500.vue",isDynamicEntry:true,imports:["_BWlekpQc.js","../node_modules/nuxt/dist/app/entry.js"],css:[]},"_BWlekpQc.js":h},prefetch:{}},"../node_modules/nuxt/dist/app/entry.js":{scripts:{"../node_modules/nuxt/dist/app/entry.js":q={resourceType:"script",module:true,prefetch:true,preload:true,file:"CBklhXOc.js",name:"entry",src:"../node_modules/nuxt/dist/app/entry.js",isEntry:true,imports:["_ttQ_F7QN.js","_BWlekpQc.js","_BIjnivpp.js"],dynamicImports:["layouts/default.vue","../node_modules/nuxt/dist/app/components/error-404.vue","../node_modules/nuxt/dist/app/components/error-500.vue"],css:["entry.CCFoIGny.css"]}},styles:{"entry.CCFoIGny.css":u={file:"entry.CCFoIGny.css",resourceType:"style",prefetch:true,preload:true}},preload:{"../node_modules/nuxt/dist/app/entry.js":q,"entry.CCFoIGny.css":u,"_ttQ_F7QN.js":j,"_BWlekpQc.js":h,"_BIjnivpp.js":k},prefetch:{"entry.CCFoIGny.css":u,"layouts/default.vue":m,"_BWlekpQc.js":h,"../node_modules/nuxt/dist/app/components/error-500.vue":o}},"../node_modules/nuxt/dist/app/components/error-404.vue":{scripts:{},styles:{"entry.CCFoIGny.css":u},preload:{"../node_modules/nuxt/dist/app/components/error-404.vue":{resourceType:"script",module:true,prefetch:true,preload:true,file:"oAaAuq3K.js",name:"error-404",src:"../node_modules/nuxt/dist/app/components/error-404.vue",isDynamicEntry:true,imports:["_ttQ_F7QN.js","_BWlekpQc.js","_BIjnivpp.js","../node_modules/nuxt/dist/app/entry.js"],css:[]},"_ttQ_F7QN.js":j,"_BWlekpQc.js":h,"_BIjnivpp.js":k,"../node_modules/nuxt/dist/app/entry.js":q,"entry.CCFoIGny.css":u},prefetch:{"entry.CCFoIGny.css":u,"layouts/default.vue":m,"_BWlekpQc.js":h,"../node_modules/nuxt/dist/app/components/error-500.vue":o}},"error-404.DjFB7pgG.css":{scripts:{},styles:{},preload:{"error-404.DjFB7pgG.css":{file:"error-404.DjFB7pgG.css",resourceType:"style",prefetch:true,preload:true}},prefetch:{}},"error-500.BG9pmads.css":{scripts:{},styles:{},preload:{"error-500.BG9pmads.css":{file:"error-500.BG9pmads.css",resourceType:"style",prefetch:true,preload:true}},prefetch:{}},"entry.CCFoIGny.css":{scripts:{},styles:{},preload:{"entry.CCFoIGny.css":u},prefetch:{}},"_CNs_Ozdc.js":{scripts:{},styles:{},preload:{"_CNs_Ozdc.js":x={resourceType:"script",module:true,prefetch:true,preload:true,file:"CNs_Ozdc.js",name:"composables"}},prefetch:{}},"pages/confirm.vue":{scripts:{},styles:{"entry.CCFoIGny.css":u},preload:{"pages/confirm.vue":{resourceType:"script",module:true,prefetch:true,preload:true,file:"Bp_tvWCv.js",name:"confirm",src:"pages/confirm.vue",isDynamicEntry:true,imports:["_BWlekpQc.js","../node_modules/nuxt/dist/app/entry.js","_CNs_Ozdc.js"]},"_BWlekpQc.js":h,"../node_modules/nuxt/dist/app/entry.js":q,"entry.CCFoIGny.css":u,"_ttQ_F7QN.js":j,"_BIjnivpp.js":k,"_CNs_Ozdc.js":x},prefetch:{"entry.CCFoIGny.css":u,"layouts/default.vue":m,"_BWlekpQc.js":h,"../node_modules/nuxt/dist/app/components/error-500.vue":o}},"pages/index.vue":{scripts:{},styles:{"entry.CCFoIGny.css":u},preload:{"pages/index.vue":{resourceType:"script",module:true,prefetch:true,preload:true,file:"BEGRh-5H.js",name:"pages",src:"pages/index.vue",isDynamicEntry:true,imports:["_BWlekpQc.js","../node_modules/nuxt/dist/app/entry.js"]},"_BWlekpQc.js":h,"../node_modules/nuxt/dist/app/entry.js":q,"entry.CCFoIGny.css":u,"_ttQ_F7QN.js":j,"_BIjnivpp.js":k},prefetch:{"entry.CCFoIGny.css":u,"layouts/default.vue":m,"_BWlekpQc.js":h,"../node_modules/nuxt/dist/app/components/error-500.vue":o}},"pages/login.vue":{scripts:{},styles:{"entry.CCFoIGny.css":u},preload:{"pages/login.vue":{resourceType:"script",module:true,prefetch:true,preload:true,file:"BGVrjGLA.js",name:"login",src:"pages/login.vue",isDynamicEntry:true,imports:["_BWlekpQc.js","../node_modules/nuxt/dist/app/entry.js","_CNs_Ozdc.js"]},"_BWlekpQc.js":h,"../node_modules/nuxt/dist/app/entry.js":q,"entry.CCFoIGny.css":u,"_ttQ_F7QN.js":j,"_BIjnivpp.js":k,"_CNs_Ozdc.js":x},prefetch:{"entry.CCFoIGny.css":u,"layouts/default.vue":m,"_BWlekpQc.js":h,"../node_modules/nuxt/dist/app/components/error-500.vue":o}}},entrypoints:["../node_modules/nuxt/dist/app/entry.js"],modules:{"../node_modules/nuxt/dist/app/components/error-404.vue":{file:"oAaAuq3K.js",resourceType:"script",mimeType:void 0,module:true},"error-404.DjFB7pgG.css":{file:"error-404.DjFB7pgG.css",resourceType:"style",mimeType:void 0,module:void 0},"../node_modules/nuxt/dist/app/components/error-500.vue":{file:"CQiHN3Or.js",resourceType:"script",mimeType:void 0,module:true},"error-500.BG9pmads.css":{file:"error-500.BG9pmads.css",resourceType:"style",mimeType:void 0,module:void 0},"../node_modules/nuxt/dist/app/entry.js":{file:"CBklhXOc.js",resourceType:"script",mimeType:void 0,module:true},"entry.CCFoIGny.css":{file:"entry.CCFoIGny.css",resourceType:"style",mimeType:void 0,module:void 0},"_BIjnivpp.js":{file:"BIjnivpp.js",resourceType:"script",mimeType:void 0,module:true},"_BWlekpQc.js":{file:"BWlekpQc.js",resourceType:"script",mimeType:void 0,module:true},"_CNs_Ozdc.js":{file:"CNs_Ozdc.js",resourceType:"script",mimeType:void 0,module:true},"_ttQ_F7QN.js":{file:"ttQ_F7QN.js",resourceType:"script",mimeType:void 0,module:true},"layouts/default.vue":{file:"B0M4vlZc.js",resourceType:"script",mimeType:void 0,module:true},"pages/confirm.vue":{file:"Bp_tvWCv.js",resourceType:"script",mimeType:void 0,module:true},"pages/index.vue":{file:"BEGRh-5H.js",resourceType:"script",mimeType:void 0,module:true},"pages/login.vue":{file:"BGVrjGLA.js",resourceType:"script",mimeType:void 0,module:true}}}))();

export { client_precomputed as default };
//# sourceMappingURL=precomputed.mjs.map

```

# .output/server/chunks/virtual/precomputed.mjs.map

```map
{"version":3,"file":"precomputed.mjs","sources":["../../../../node_modules/.cache/nuxt/.nuxt/dist/server/client.precomputed.mjs"],"names":[],"mappings":"","x_google_ignoreList":[0]}
```

# .output/server/chunks/virtual/styles.mjs

```mjs
const interopDefault = r => r.default || r || [];
const styles = {
  "../node_modules/nuxt/dist/app/components/error-404.vue": () => import('../build/error-404-styles.CMKixN0I.mjs').then(interopDefault),
  "../node_modules/nuxt/dist/app/components/error-500.vue": () => import('../build/error-500-styles.ClZS4Tbf.mjs').then(interopDefault)
};

export { styles as default };
//# sourceMappingURL=styles.mjs.map

```

# .output/server/chunks/virtual/styles.mjs.map

```map
{"version":3,"file":"styles.mjs","sources":["../../../../node_modules/.cache/nuxt/.nuxt/dist/server/styles.mjs"],"names":[],"mappings":"","x_google_ignoreList":[0]}
```

# .output/server/index.mjs

```mjs
import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import 'node:http';
import 'node:https';
export { A as default } from './chunks/nitro/nitro.mjs';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
//# sourceMappingURL=index.mjs.map

```

# .output/server/index.mjs.map

```map
{"version":3,"file":"index.mjs","sources":[],"names":[],"mappings":";;;;;;;;"}
```

# .output/server/package.json

```json
{
  "name": "stock-picking-anlysis-prod",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "dependencies": {
    "@babel/parser": "7.29.7",
    "@vue/compiler-core": "3.5.40",
    "@vue/compiler-dom": "3.5.40",
    "@vue/compiler-ssr": "3.5.40",
    "@vue/devtools-api": "8.1.5",
    "@vue/devtools-kit": "8.1.5",
    "@vue/devtools-shared": "8.1.5",
    "@vue/reactivity": "3.5.40",
    "@vue/runtime-core": "3.5.40",
    "@vue/runtime-dom": "3.5.40",
    "@vue/server-renderer": "3.5.40",
    "@vue/shared": "3.5.40",
    "better-sqlite3": "13.0.1",
    "birpc": "2.9.0",
    "devalue": "5.8.2",
    "entities": "7.0.1",
    "estree-walker": "2.0.2",
    "hookable": "6.1.1",
    "nostics": "1.2.0",
    "perfect-debounce": "2.1.0",
    "source-map-js": "1.2.1",
    "tldts": "7.4.9",
    "tough-cookie": "6.0.2",
    "ufo": "1.6.4",
    "unhead": "3.2.2",
    "vue": "3.5.40",
    "vue-bundle-renderer": "2.3.1",
    "vue-router": "5.2.0",
    "yahoo-finance2": "4.0.0"
  }
}
```

# app/app.vue

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

```

# app/assets/css/main.css

```css
@import "tailwindcss";

/* ═══════════════════════════════════════════
   Valuation Card
   ═══════════════════════════════════════════ */

.valuation-card {
  @apply rounded-2xl border border-gray-800 bg-gray-900/40 p-6 space-y-6 shadow-lg backdrop-blur-sm;
  @apply transition-all duration-300 hover:border-gray-700/80 hover:shadow-xl;
}

.ticker-badge {
  @apply rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-sm font-bold text-emerald-400 border border-emerald-500/20;
}

.source-pill {
  @apply inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium border tracking-tight transition-opacity hover:opacity-90;
}

/* ═══════════════════════════════════════════
   Metrics Grid
   ═══════════════════════════════════════════ */

.metrics-grid {
  @apply grid grid-cols-3 gap-4 rounded-xl bg-gray-950/80 p-4 text-center border border-gray-800/80;
}

.metric-cell {
  @apply flex flex-col gap-1;
}

.metric-label {
  @apply text-[11px] font-medium uppercase tracking-wider text-gray-500;
}

.metric-value {
  @apply font-mono text-sm font-bold text-gray-200;
}

/* ═══════════════════════════════════════════
   Fair Value Section
   ═══════════════════════════════════════════ */

.fair-value-section {
  @apply rounded-xl border border-gray-800/60 bg-gradient-to-br from-gray-900/80 to-gray-950/80 p-5;
}

/* ═══════════════════════════════════════════
   Gauge
   ═══════════════════════════════════════════ */

.gauge-track {
  @apply relative h-2.5 w-full rounded-full bg-gray-800/80 overflow-visible;
}

.gauge-fill {
  @apply absolute top-0 h-full rounded-full;
  background: linear-gradient(90deg, #f87171 0%, #fbbf24 50%, #34d399 100%);
  opacity: 0.35;
}

.gauge-marker {
  @apply absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10;
}

.gauge-marker-dot {
  @apply h-3.5 w-3.5 rounded-full border-2 border-gray-900 shadow-md;
}

.gauge-price {
  @apply absolute top-1/2 -translate-x-1/2 z-20;
  transform: translateX(-50%) translateY(-50%);
}

.gauge-price-line {
  @apply w-0.5 h-6 bg-white/90 rounded-full mx-auto shadow-sm;
  margin-top: -6px;
}

.gauge-price-label {
  @apply text-[9px] font-bold text-white/80 text-center mt-0.5 select-none;
}

/* ═══════════════════════════════════════════
   Scenario Cells
   ═══════════════════════════════════════════ */

.scenario-cell {
  @apply flex flex-col items-center gap-0.5 rounded-xl border border-gray-800/60 bg-gray-950/60 p-3;
}

.scenario-label {
  @apply text-[10px] font-semibold uppercase tracking-wider;
}

.scenario-value {
  @apply font-mono text-sm font-bold text-gray-200;
}

.scenario-mos {
  @apply text-[10px] font-semibold;
}

/* ═══════════════════════════════════════════
   Reverse DCF Section
   ═══════════════════════════════════════════ */

.reverse-dcf-section {
  @apply rounded-xl border border-indigo-500/15 bg-indigo-950/10 p-4;
}

/* ═══════════════════════════════════════════
   Sliders
   ═══════════════════════════════════════════ */

.slider-group {
  @apply space-y-1.5;
}

.slider-header {
  @apply flex items-center justify-between;
}

.slider-label {
  @apply text-xs font-medium text-gray-400;
}

.slider-value {
  @apply font-mono text-sm font-bold tabular-nums;
}

.slider-bounds {
  @apply flex justify-between text-[10px] text-gray-600;
}

/* Base slider reset & styling */
.slider {
  @apply w-full cursor-pointer appearance-none bg-transparent;
  height: 6px;
}

.slider::-webkit-slider-runnable-track {
  @apply h-1.5 rounded-full bg-gray-800;
}

.slider::-webkit-slider-thumb {
  @apply appearance-none h-4 w-4 rounded-full border-2 border-gray-900 shadow-md cursor-grab;
  margin-top: -5px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.slider::-webkit-slider-thumb:active {
  cursor: grabbing;
  transform: scale(1.1);
}

.slider::-moz-range-track {
  @apply h-1.5 rounded-full bg-gray-800 border-none;
}

.slider::-moz-range-thumb {
  @apply h-4 w-4 rounded-full border-2 border-gray-900 shadow-md cursor-grab;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.2);
}

/* Slider color variants */
.slider--emerald::-webkit-slider-thumb {
  @apply bg-emerald-400;
  box-shadow: 0 0 8px rgba(52, 211, 153, 0.4);
}
.slider--emerald::-moz-range-thumb {
  @apply bg-emerald-400;
  box-shadow: 0 0 8px rgba(52, 211, 153, 0.4);
}

.slider--sky::-webkit-slider-thumb {
  @apply bg-sky-400;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
}
.slider--sky::-moz-range-thumb {
  @apply bg-sky-400;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
}

.slider--violet::-webkit-slider-thumb {
  @apply bg-violet-400;
  box-shadow: 0 0 8px rgba(167, 139, 250, 0.4);
}
.slider--violet::-moz-range-thumb {
  @apply bg-violet-400;
  box-shadow: 0 0 8px rgba(167, 139, 250, 0.4);
}

.slider--amber::-webkit-slider-thumb {
  @apply bg-amber-400;
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
}
.slider--amber::-moz-range-thumb {
  @apply bg-amber-400;
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
}

/* Focus ring for accessibility */
.slider:focus-visible::-webkit-slider-thumb {
  @apply outline-2 outline-offset-2 outline-white;
}

.slider:focus-visible::-moz-range-thumb {
  @apply outline-2 outline-offset-2 outline-white;
}

```

# app/components/SmartValue.vue

```vue
<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: number | null | undefined
  type?: 'percent' | 'currency' | 'number' | 'mos'
  currency?: string
  colored?: boolean
  invertColor?: boolean
  digits?: number
  prefix?: string
  suffix?: string
}>(), {
  type: 'percent',
  currency: 'USD',
  colored: true,
  invertColor: false,
  digits: 1,
  prefix: '',
  suffix: '',
})

const formattedText = computed(() => {
  if (props.value === null || props.value === undefined || isNaN(props.value)) return 'N/A'

  if (props.type === 'percent') {
    const val = props.value * 100
    const sign = val > 0 ? '+' : ''
    return `${props.prefix}${sign}${val.toFixed(props.digits)}%${props.suffix}`
  }

  if (props.type === 'mos') {
    const sign = props.value >= 0 ? '+' : ''
    return `${props.prefix}${sign}${props.value.toFixed(props.digits)}%${props.suffix}`
  }

  if (props.type === 'currency') {
    try {
      const code = props.currency.toUpperCase() === 'GBP' || props.currency === 'GBP' ? 'GBP' : props.currency.toUpperCase()
      return `${props.prefix}${new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: code,
        maximumFractionDigits: props.digits ?? 2,
      }).format(props.value)}${props.suffix}`
    } catch {
      return `${props.prefix}${props.value.toFixed(2)} ${props.currency}${props.suffix}`
    }
  }

  return `${props.prefix}${props.value.toLocaleString('fr-FR', { maximumFractionDigits: props.digits })}${props.suffix}`
})

const colorClass = computed(() => {
  if (!props.colored || props.value === null || props.value === undefined || isNaN(props.value)) {
    return 'text-gray-200'
  }

  const numericVal = props.value
  const isPositive = numericVal > 0
  const isZero = numericVal === 0

  if (isZero) return 'text-gray-300'

  if (props.invertColor) {
    return isPositive ? 'text-rose-400' : 'text-emerald-400'
  }
  return isPositive ? 'text-emerald-400' : 'text-rose-400'
})
</script>

<template>
  <span :class="['font-mono font-semibold', colorClass]">
    {{ formattedText }}
  </span>
</template>

```

# app/components/ValuationCard.vue

```vue
<script setup lang="ts">
import type { Stock, GrowthMode, AuditData } from '~/types/database.types'
import {
  computeScenarios,
  computeReverseDCF,
  type ValuationInputs,
  type ScenarioResults,
  type ReverseDCFResult,
} from '~/utils/valuation'

const props = defineProps<{
  stock: Stock
}>()

const emit = defineEmits<{
  update: [stock: Stock]
  delete: [id: string, ticker: string]
}>()

const activeTab = ref<'valuation' | 'sourcing'>('valuation')

const growthMode = ref<GrowthMode>(props.stock.growth_mode || 'cagr')
const growth = ref(props.stock.projected_growth ?? 0.10)
const growthY1 = ref(props.stock.growth_y1 ?? 0.10)
const growthY2 = ref(props.stock.growth_y2 ?? 0.10)
const growthY3 = ref(props.stock.growth_y3 ?? 0.10)
const growthY4 = ref(props.stock.growth_y4 ?? 0.10)
const growthY5 = ref(props.stock.growth_y5 ?? 0.10)
const margin = ref(props.stock.projected_margin ?? 0.20)
const targetMultiple = ref(props.stock.target_multiple ?? 20.0)
const discountRate = ref(props.stock.discount_rate ?? 0.10)
const riskSpread = ref(props.stock.risk_spread ?? 0.20)

watch(() => props.stock, (newStock) => {
  growthMode.value = newStock.growth_mode || 'cagr'
  growth.value = newStock.projected_growth ?? 0.10
  growthY1.value = newStock.growth_y1 ?? 0.10
  growthY2.value = newStock.growth_y2 ?? 0.10
  growthY3.value = newStock.growth_y3 ?? 0.10
  growthY4.value = newStock.growth_y4 ?? 0.10
  growthY5.value = newStock.growth_y5 ?? 0.10
  margin.value = newStock.projected_margin ?? 0.20
  targetMultiple.value = newStock.target_multiple ?? 20.0
  discountRate.value = newStock.discount_rate ?? 0.10
  riskSpread.value = newStock.risk_spread ?? 0.20
})

const parsedAuditData = computed<AuditData | null>(() => {
  if (!props.stock.audit_data) return null
  if (typeof props.stock.audit_data === 'string') {
    try {
      return JSON.parse(props.stock.audit_data)
    } catch {
      return null
    }
  }
  return props.stock.audit_data as AuditData
})

const hasFallback = computed(() => {
  if (!parsedAuditData.value) return false
  const categories = [parsedAuditData.value.growth, parsedAuditData.value.margin, parsedAuditData.value.pe, parsedAuditData.value.discount_rate]
  return categories.some(cat => cat?.candidates?.some(c => c.status === 'fallback'))
})

const isGrowthFallback = computed(() => {
  return parsedAuditData.value?.growth?.candidates?.some(c => c.status === 'fallback') ?? false
})

const isMarginFallback = computed(() => {
  return parsedAuditData.value?.margin?.candidates?.some(c => c.status === 'fallback') ?? false
})

const isPEFallback = computed(() => {
  return parsedAuditData.value?.pe?.candidates?.some(c => c.status === 'fallback') ?? false
})

const meanPotential = computed(() => {
  if (!props.stock.analyst_target_price || !props.stock.current_price) return null
  return (props.stock.analyst_target_price / props.stock.current_price) - 1
})

const medianPotential = computed(() => {
  if (!props.stock.analyst_target_median || !props.stock.current_price) return null
  return (props.stock.analyst_target_median / props.stock.current_price) - 1
})

const valuationInputs = computed<ValuationInputs>(() => ({
  currentPrice: props.stock.current_price ?? 0,
  revenueTTM: props.stock.revenue_ttm ?? 0,
  sharesOutstanding: props.stock.shares_outstanding ?? 0,
  growthMode: growthMode.value,
  growth: growth.value,
  growthY1: growthY1.value,
  growthY2: growthY2.value,
  growthY3: growthY3.value,
  growthY4: growthY4.value,
  growthY5: growthY5.value,
  marginType: 'net_income',
  margin: margin.value,
  targetMultiple: targetMultiple.value,
  discountRate: discountRate.value,
  riskSpread: riskSpread.value,
}))

const scenarios = computed<ScenarioResults>(() => computeScenarios(valuationInputs.value))
const reverseDCF = computed<ReverseDCFResult>(() => computeReverseDCF(valuationInputs.value))

const marginOfSafety = computed(() => scenarios.value.base.marginOfSafety)
const fairValue = computed(() => scenarios.value.base.fairValue)

const badgeConfig = computed(() => {
  const mos = marginOfSafety.value
  if (mos > 15) return { label: 'Sous-évaluée', class: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' }
  if (mos >= 0) return { label: 'Fair Value', class: 'bg-amber-500/15 text-amber-400 border-amber-500/30' }
  return { label: 'Surévaluée', class: 'bg-red-500/15 text-red-400 border-red-500/30' }
})

// Unified Gauge Data incorporating Model Scenarios + Wall Street Targets (L, Moy, H) + P
const unifiedGaugeData = computed(() => {
  const bear = scenarios.value.bear.fairValue
  const base = scenarios.value.base.fairValue
  const bull = scenarios.value.bull.fairValue
  const price = props.stock.current_price ?? 0

  const low = props.stock.analyst_target_low
  const mean = props.stock.analyst_target_price
  const high = props.stock.analyst_target_high

  const allVals = [bear, base, bull, price, low, mean, high].filter((v): v is number => v !== null && !isNaN(v) && v > 0)
  
  if (allVals.length === 0) {
    return { bearPos: 0, basePos: 50, bullPos: 100, pricePos: 50, lowPos: null, meanPos: null, highPos: null, bearVal: 0, baseVal: 0, bullVal: 0, priceVal: 0, lowVal: null, meanVal: null, highVal: null }
  }

  const min = Math.min(...allVals) * 0.90
  const max = Math.max(...allVals) * 1.10
  const range = max - min

  if (range <= 0) {
    return { bearPos: 0, basePos: 50, bullPos: 100, pricePos: 50, lowPos: null, meanPos: null, highPos: null, bearVal: bear, baseVal: base, bullVal: bull, priceVal: price, lowVal: low, meanVal: mean, highVal: high }
  }

  const getPos = (val: number | null) => (val !== null && val > 0) ? Math.max(0, Math.min(100, ((val - min) / range) * 100)) : null

  return {
    bearPos: getPos(bear)!,
    basePos: getPos(base)!,
    bullPos: getPos(bull)!,
    pricePos: getPos(price)!,
    lowPos: getPos(low),
    meanPos: getPos(mean),
    highPos: getPos(high),
    bearVal: bear,
    baseVal: base,
    bullVal: bull,
    priceVal: price,
    lowVal: low,
    meanVal: mean,
    highVal: high,
  }
})

// Configuration d'échelle (M / B / K) pour le CA
const scaleConfig = computed(() => {
  const r0 = props.stock.revenue_ttm ?? 0
  if (r0 >= 1e9) return { label: 'B', divisor: 1e9 }
  if (r0 >= 1e6) return { label: 'M', divisor: 1e6 }
  return { label: 'K', divisor: 1e3 }
})

const currencySymbol = computed(() => {
  const code = (props.stock.currency || 'USD').toUpperCase()
  if (code === 'EUR') return '€'
  if (code === 'USD') return '$'
  if (code === 'GBP' || code === 'GBP') return '£'
  return code
})

// Calcul bidirectionnel des CA bruts par année selon le mode actif
const yearRevenues = computed(() => {
  const r0 = props.stock.revenue_ttm ?? 0
  if (growthMode.value === 'cagr') {
    const g = growth.value
    const r1 = r0 * (1 + g)
    const r2 = r1 * (1 + g)
    const r3 = r2 * (1 + g)
    const r4 = r3 * (1 + g)
    const r5 = r4 * (1 + g)
    return [r1, r2, r3, r4, r5]
  } else {
    const r1 = r0 * (1 + growthY1.value)
    const r2 = r1 * (1 + growthY2.value)
    const r3 = r2 * (1 + growthY3.value)
    const r4 = r3 * (1 + growthY4.value)
    const r5 = r4 * (1 + growthY5.value)
    return [r1, r2, r3, r4, r5]
  }
})

function getYearGrowth(yearIndex: number): number {
  if (growthMode.value === 'cagr') {
    return growth.value
  }
  if (yearIndex === 1) return growthY1.value
  if (yearIndex === 2) return growthY2.value
  if (yearIndex === 3) return growthY3.value
  if (yearIndex === 4) return growthY4.value
  return growthY5.value
}

function getScaledRevenue(yearIndex: number): number {
  const raw = yearRevenues.value[yearIndex - 1] ?? 0
  return Number((raw / scaleConfig.value.divisor).toFixed(2))
}

function formatScaledRevenue(rawAmount: number): string {
  if (!rawAmount || isNaN(rawAmount)) return 'N/A'
  const scaled = rawAmount / scaleConfig.value.divisor
  return `${scaled.toFixed(2)} ${scaleConfig.value.label} ${currencySymbol.value}`
}

function updateGrowthFromScaledRevenue(yearIndex: number, newScaledValStr: string) {
  if (growthMode.value === 'cagr') return

  const newScaledVal = parseFloat(newScaledValStr)
  if (isNaN(newScaledVal) || newScaledVal <= 0) return

  const newRawRev = newScaledVal * scaleConfig.value.divisor
  const r0 = props.stock.revenue_ttm ?? 0
  let prevRev = r0
  if (yearIndex === 1) prevRev = r0
  else prevRev = yearRevenues.value[yearIndex - 2]

  if (prevRev > 0) {
    const calcGrowth = (newRawRev / prevRev) - 1
    if (yearIndex === 1) growthY1.value = calcGrowth
    else if (yearIndex === 2) growthY2.value = calcGrowth
    else if (yearIndex === 3) growthY3.value = calcGrowth
    else if (yearIndex === 4) growthY4.value = calcGrowth
    else if (yearIndex === 5) growthY5.value = calcGrowth
  }
}

let saveTimeout: ReturnType<typeof setTimeout> | null = null

function debouncedSave() {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    const updated: Stock = {
      ...props.stock,
      growth_mode: growthMode.value,
      projected_growth: growth.value,
      growth_y1: growthY1.value,
      growth_y2: growthY2.value,
      growth_y3: growthY3.value,
      growth_y4: growthY4.value,
      growth_y5: growthY5.value,
      revenue_y1: yearRevenues.value[0],
      revenue_y2: yearRevenues.value[1],
      revenue_y3: yearRevenues.value[2],
      revenue_y4: yearRevenues.value[3],
      revenue_y5: yearRevenues.value[4],
      margin_type: 'net_income',
      projected_margin: margin.value,
      target_multiple: targetMultiple.value,
      discount_rate: discountRate.value,
      risk_spread: riskSpread.value,
    }
    emit('update', updated)
  }, 800)
}

watch([growthMode, growth, growthY1, growthY2, growthY3, growthY4, growthY5, margin, targetMultiple, discountRate, riskSpread], () => {
  debouncedSave()
})

function formatMoney(num: number | null): string {
  if (num === null || num === undefined) return 'N/A'
  const currencyCode = props.stock.currency || 'USD'
  try {
    const code = currencyCode.toUpperCase() === 'GBP' || currencyCode === 'GBP' ? 'GBP' : currencyCode.toUpperCase()
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 2,
    }).format(num)
  } catch {
    return `${num.toFixed(2)} ${currencyCode}`
  }
}

function formatLargeNumber(num: number | null): string {
  if (num === null || num === undefined) return 'N/A'
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)} T`
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)} B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)} M`
  return num.toLocaleString('fr-FR')
}

function formatPercent(num: number | null): string {
  if (num === null || num === undefined) return 'N/A'
  return `${(num * 100).toFixed(1)}%`
}
</script>

<template>
  <div class="valuation-card group space-y-4">
    <!-- Navigation par Onglets -->
    <div class="flex items-center justify-between border-b border-gray-800 pb-3">
      <div class="flex items-center gap-1 rounded-lg bg-gray-950 p-1 border border-gray-800">
        <button
          type="button"
          class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition"
          :class="activeTab === 'valuation' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'"
          @click="activeTab = 'valuation'"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Valorisation & Simulation
        </button>
        <button
          type="button"
          class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition"
          :class="activeTab === 'sourcing' ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'"
          @click="activeTab = 'sourcing'"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Sourcing & Cascade d'Audit
        </button>
      </div>

      <button
        type="button"
        class="shrink-0 rounded-lg p-2 text-gray-600 transition hover:bg-red-950/50 hover:text-red-400"
        title="Supprimer l'action"
        @click="emit('delete', stock.id, stock.ticker)"
      >
        <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>

    <!-- Header Ticker Info -->
    <div class="flex flex-wrap items-center justify-between gap-2.5">
      <div class="flex items-center gap-2.5">
        <span class="ticker-badge">
          {{ stock.ticker }}
        </span>
        <h3 class="truncate text-base font-semibold text-white">
          {{ stock.name || stock.ticker }}
        </h3>
        <span class="rounded bg-gray-800 px-2 py-0.5 font-mono text-[10px] text-gray-300 border border-gray-700">
          {{ stock.currency || 'USD' }}
        </span>
        <span class="rounded bg-indigo-500/10 px-2 py-0.5 font-mono text-[10px] text-indigo-400 border border-indigo-500/20">
          Bêta: {{ stock.beta ?? 1.0 }}
        </span>
      </div>
      <span
        class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold"
        :class="badgeConfig.class"
      >
        {{ badgeConfig.label }}
      </span>
    </div>

    <!-- Bannière d'avertissement fallback sous le header -->
    <div
      v-if="hasFallback"
      class="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-950/40 px-3 py-2 text-xs font-medium text-amber-300 shadow-sm"
    >
      <svg class="h-4 w-4 shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>⚠️ Certaines données de marché sont absentes chez Yahoo. Des valeurs par défaut ont été appliquées.</span>
    </div>

    <!-- VUE 1 : VALORISATION & SIMULATION -->
    <div v-if="activeTab === 'valuation'" class="space-y-6">
      <!-- Métriques Brutes Clefs (Règle Stricte : Neutre Blanc/Gris) -->
      <div class="metrics-grid">
        <div class="metric-cell">
          <span class="metric-label">Prix Actuel</span>
          <span class="metric-value text-white">{{ formatMoney(stock.current_price ?? 0) }}</span>
        </div>
        <div class="metric-cell">
          <span class="metric-label">CA TTM</span>
          <span class="metric-value text-gray-200">{{ formatLargeNumber(stock.revenue_ttm) }}</span>
        </div>
        <div class="metric-cell">
          <span class="metric-label">Shares</span>
          <span class="metric-value text-gray-200">{{ formatLargeNumber(stock.shares_outstanding) }}</span>
        </div>
      </div>

      <!-- Fair Value & Marge de Sécurité avec Jauge Unifiée (L, Moy, H, P) -->
      <div class="fair-value-section space-y-4">
        <div class="flex items-end justify-between gap-4">
          <div>
            <span class="text-xs font-medium uppercase tracking-wider text-gray-500">Fair Value (Base Case)</span>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-3xl font-bold tracking-tight text-white">{{ formatMoney(fairValue) }}</span>
              <SmartValue :value="marginOfSafety" type="mos" class="text-sm font-bold" suffix=" MoS" />
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs font-medium uppercase tracking-wider text-gray-500">Prix Cible 5Y</span>
            <p class="mt-1 font-mono text-lg font-semibold text-gray-300">{{ formatMoney(scenarios.base.targetPrice5Y) }}</p>
          </div>
        </div>

        <!-- INITIALES COMPACTES AU-DESSUS DU GRAPHIQUE (L, Moy, H, P) -->
        <div class="space-y-1.5 pt-2">
          <!-- Bandeau Supérieur des Initiales Alignées -->
          <div class="relative h-5 w-full overflow-hidden text-xs font-mono font-bold">
            <!-- Wall Street Low (L) -->
            <span
              v-if="unifiedGaugeData.lowPos !== null"
              class="absolute -translate-x-1/2 z-10 rounded px-1 py-0.2 text-[9px] bg-purple-900 text-purple-200 border border-purple-500/50 shadow-sm"
              :style="{ left: `${unifiedGaugeData.lowPos}%` }"
              :title="`Wall St Low: ${formatMoney(unifiedGaugeData.lowVal)}`"
            >
              L
            </span>

            <!-- Wall Street Mean (Moy) -->
            <span
              v-if="unifiedGaugeData.meanPos !== null"
              class="absolute -translate-x-1/2 z-10 rounded px-1 py-0.2 text-[9px] bg-sky-900 text-sky-200 border border-sky-500/50 shadow-sm"
              :style="{ left: `${unifiedGaugeData.meanPos}%` }"
              :title="`Wall St Moyen: ${formatMoney(unifiedGaugeData.meanVal)}`"
            >
              Moy
            </span>

            <!-- Wall Street High (H) -->
            <span
              v-if="unifiedGaugeData.highPos !== null"
              class="absolute -translate-x-1/2 z-10 rounded px-1 py-0.2 text-[9px] bg-purple-900 text-purple-200 border border-purple-500/50 shadow-sm"
              :style="{ left: `${unifiedGaugeData.highPos}%` }"
              :title="`Wall St High: ${formatMoney(unifiedGaugeData.highVal)}`"
            >
              H
            </span>

            <!-- Badge P (Prix Actuel Blanc) -->
            <span
              class="absolute -translate-x-1/2 z-30 rounded px-1 py-0.2 text-[9px] bg-white text-gray-950 font-black shadow-md border border-white"
              :style="{ left: `${unifiedGaugeData.pricePos}%` }"
              :title="`Prix Actuel P: ${formatMoney(unifiedGaugeData.priceVal)}`"
            >
              P
            </span>
          </div>

          <!-- PISTE GRAPHIQUE (TRACK ET LIGNES REPERES) -->
          <div class="relative h-8 w-full rounded-xl border border-gray-800 bg-gray-950/90 overflow-hidden">
            <!-- Zone d'Incertitude Modèle (Bear-Bull) -->
            <div
              class="absolute top-0 bottom-0 bg-gradient-to-r from-red-500/15 via-amber-500/15 to-emerald-500/15"
              :style="{
                left: `${unifiedGaugeData.bearPos}%`,
                width: `${unifiedGaugeData.bullPos - unifiedGaugeData.bearPos}%`,
              }"
            />

            <!-- Wall Street Markers (Lignes verticales) -->
            <div
              v-if="unifiedGaugeData.lowPos !== null"
              class="absolute top-0 bottom-0 w-0.5 bg-purple-400/80 z-10"
              :style="{ left: `${unifiedGaugeData.lowPos}%` }"
              :title="`Wall St Low: ${formatMoney(unifiedGaugeData.lowVal)}`"
            />
            <div
              v-if="unifiedGaugeData.meanPos !== null"
              class="absolute top-0 bottom-0 w-0.5 bg-sky-400 z-10"
              :style="{ left: `${unifiedGaugeData.meanPos}%` }"
              :title="`Wall St Moyen: ${formatMoney(unifiedGaugeData.meanVal)}`"
            />
            <div
              v-if="unifiedGaugeData.highPos !== null"
              class="absolute top-0 bottom-0 w-0.5 bg-purple-400/80 z-10"
              :style="{ left: `${unifiedGaugeData.highPos}%` }"
              :title="`Wall St High: ${formatMoney(unifiedGaugeData.highVal)}`"
            />

            <!-- Repères Modèle StockPick (Bear / Base / Bull Dots) -->
            <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-red-400 border border-gray-950 z-20" :style="{ left: `${unifiedGaugeData.bearPos}%` }" :title="`Bear Case: ${formatMoney(unifiedGaugeData.bearVal)}`" />
            <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-amber-400 border-2 border-gray-950 z-20 shadow-md" :style="{ left: `${unifiedGaugeData.basePos}%` }" :title="`Fair Value (Base Case): ${formatMoney(unifiedGaugeData.baseVal)}`" />
            <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-gray-950 z-20" :style="{ left: `${unifiedGaugeData.bullPos}%` }" :title="`Bull Case: ${formatMoney(unifiedGaugeData.bullVal)}`" />

            <!-- Marker Prix Actuel P (Ligne Blanche) -->
            <div
              class="absolute top-0 bottom-0 w-1 bg-white z-30 shadow-md -translate-x-1/2"
              :style="{ left: `${unifiedGaugeData.pricePos}%` }"
              :title="`Prix Actuel P: ${formatMoney(unifiedGaugeData.priceVal)}`"
            />
          </div>

          <!-- Légende synthétique sous la jauge -->
          <div class="flex flex-wrap items-center justify-between text-[10px] text-gray-400 pt-0.5 font-medium">
            <span class="flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-red-400" /> Bear: {{ formatMoney(unifiedGaugeData.bearVal) }}</span>
            <span class="flex items-center gap-1 text-white font-semibold"><span class="h-2.5 w-2.5 rounded-full bg-amber-400" /> Fair Value: {{ formatMoney(unifiedGaugeData.baseVal) }}</span>
            <span class="flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-emerald-400" /> Bull: {{ formatMoney(unifiedGaugeData.bullVal) }}</span>
          </div>
        </div>
      </div>

      <!-- Scénarios détaillés -->
      <div class="grid grid-cols-3 gap-3">
        <div class="scenario-cell scenario-cell--bear">
          <span class="scenario-label text-red-400/70">Bear Case (-{{ formatPercent(riskSpread) }})</span>
          <span class="scenario-value">{{ formatMoney(scenarios.bear.fairValue) }}</span>
          <SmartValue :value="scenarios.bear.marginOfSafety" type="mos" class="text-xs" />
        </div>
        <div class="scenario-cell scenario-cell--base">
          <span class="scenario-label text-amber-400/70">Base Case</span>
          <span class="scenario-value text-white">{{ formatMoney(scenarios.base.fairValue) }}</span>
          <SmartValue :value="scenarios.base.marginOfSafety" type="mos" class="text-xs" />
        </div>
        <div class="scenario-cell scenario-cell--bull">
          <span class="scenario-label text-emerald-400/70">Bull Case (+{{ formatPercent(riskSpread) }})</span>
          <span class="scenario-value">{{ formatMoney(scenarios.bull.fairValue) }}</span>
          <SmartValue :value="scenarios.bull.marginOfSafety" type="mos" class="text-xs" />
        </div>
      </div>

      <!-- Reverse DCF -->
      <div class="reverse-dcf-section">
        <div class="flex items-center gap-2 mb-2">
          <div class="h-5 w-5 rounded-md bg-indigo-500/15 flex items-center justify-center">
            <svg class="h-3 w-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Reverse DCF</span>
        </div>

        <p v-if="growthMode === 'cagr'" class="text-sm text-gray-300 leading-relaxed">
          Le marché anticipe une croissance du CA de
          <SmartValue :value="reverseDCF.impliedGrowth" type="percent" suffix="/an" />
          sur 5 ans pour justifier le cours actuel de
          <span class="font-semibold text-white">{{ formatMoney(stock.current_price ?? 0) }}</span>.
        </p>

        <p v-else class="text-sm text-gray-300 leading-relaxed">
          En conservant g₁ à <SmartValue :value="growthY1" type="percent" />, le marché exige une croissance moyenne de
          <SmartValue :value="reverseDCF.impliedGrowthY2Y5 ?? 0" type="percent" suffix="/an" />
          sur les années 2 à 5 pour justifier le cours actuel.
        </p>

        <div class="mt-3 grid grid-cols-3 gap-3 text-center">
          <div>
            <span class="text-[10px] text-gray-500 uppercase">CA Requis 5Y</span>
            <p class="font-mono text-xs font-semibold text-gray-300 mt-0.5">{{ formatLargeNumber(reverseDCF.revenue5YMarket) }}</p>
          </div>
          <div>
            <span class="text-[10px] text-gray-500 uppercase">Earnings Requis</span>
            <p class="font-mono text-xs font-semibold text-gray-300 mt-0.5">{{ formatLargeNumber(reverseDCF.earnings5YMarket) }}</p>
          </div>
          <div>
            <span class="text-[10px] text-gray-500 uppercase">Prix Cible 5Y</span>
            <p class="font-mono text-xs font-semibold text-gray-300 mt-0.5">{{ formatMoney(reverseDCF.targetPrice5YMarket) }}</p>
          </div>
        </div>
      </div>

      <!-- Sliders Réactifs & Selector de Mode -->
      <div class="space-y-4 pt-1">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-800/80 pb-3">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-2">
            <svg class="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Hypothèses de Valorisation
          </h4>

          <div class="inline-flex rounded-lg bg-gray-950 p-1 border border-gray-800">
            <button
              type="button"
              class="px-3 py-1 text-xs font-medium rounded-md transition"
              :class="growthMode === 'cagr' ? 'bg-gray-800 text-white shadow-sm font-semibold' : 'text-gray-400 hover:text-white'"
              @click="growthMode = 'cagr'"
            >
              Mode Lissé (CAGR)
            </button>
            <button
              type="button"
              class="px-3 py-1 text-xs font-medium rounded-md transition"
              :class="growthMode === 'explicit' ? 'bg-emerald-600 text-white shadow-sm font-semibold' : 'text-gray-400 hover:text-white'"
              @click="growthMode = 'explicit'"
            >
              Mode Sur-Mesure (5 Ans)
            </button>
          </div>
        </div>

        <!-- SECTION HYPOTHÈSES CA (TOUJOURS VISIBLE AVEC PROJECTION DYNAMIQUE) -->
        <div class="space-y-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
          <!-- Header Source & Badge Fallback -->
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {{ growthMode === 'cagr' ? 'Trajectory & Projection CA (Mode Lissé)' : 'Trajectoire Sur-Mesure sur 5 Ans' }}
            </span>
            <div class="flex items-center gap-2">
              <span v-if="stock.growth_source" class="source-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                {{ stock.growth_source }}
              </span>
              <span v-if="isGrowthFallback" class="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                [⚠️ DEFAULT]
              </span>
            </div>
          </div>

          <!-- Mode Lissé : Slider Unique Principal -->
          <div v-if="growthMode === 'cagr'" class="slider-group">
            <div class="slider-header">
              <label class="slider-label">Croissance CA / an (CAGR 5Y)</label>
              <SmartValue :value="growth" type="percent" />
            </div>
            <input
              v-model.number="growth"
              type="range"
              min="-0.3"
              max="1.0"
              step="0.005"
              class="slider slider--emerald"
            >
            <div class="slider-bounds">
              <span>-30%</span>
              <span>100%</span>
            </div>
          </div>

          <!-- Aperçu / Modification des 5 Années (Toujours Visible) -->
          <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
            <div v-for="i in 5" :key="i" class="rounded-xl border border-gray-800 bg-gray-950/80 p-3 space-y-2">
              <!-- Header Année & Badge % SmartValue -->
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-gray-300">An {{ i }} {{ i === 1 ? '(NTM)' : '' }}</span>
                <SmartValue :value="getYearGrowth(i)" type="percent" class="text-xs" />
              </div>

              <!-- Mode Sur-Mesure : Slider Individuel -->
              <template v-if="growthMode === 'explicit'">
                <input
                  v-if="i === 1"
                  v-model.number="growthY1"
                  type="range"
                  min="-0.3"
                  max="3.0"
                  step="0.005"
                  class="slider slider--emerald my-1"
                >
                <input
                  v-else-if="i === 2"
                  v-model.number="growthY2"
                  type="range"
                  min="-0.3"
                  max="1.5"
                  step="0.005"
                  class="slider slider--emerald my-1"
                >
                <input
                  v-else-if="i === 3"
                  v-model.number="growthY3"
                  type="range"
                  min="-0.3"
                  max="1.0"
                  step="0.005"
                  class="slider slider--emerald my-1"
                >
                <input
                  v-else-if="i === 4"
                  v-model.number="growthY4"
                  type="range"
                  min="-0.3"
                  max="0.8"
                  step="0.005"
                  class="slider slider--emerald my-1"
                >
                <input
                  v-else
                  v-model.number="growthY5"
                  type="range"
                  min="-0.3"
                  max="0.6"
                  step="0.005"
                  class="slider slider--emerald my-1"
                >

                <!-- Input CA Scalé (Éditable en Mode Sur-Mesure) -->
                <div class="space-y-1">
                  <label class="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                    CA Projeté
                  </label>
                  <div class="relative flex items-center rounded-lg border border-gray-800 bg-gray-900 px-2.5 py-1.5 focus-within:border-emerald-500">
                    <input
                      :value="getScaledRevenue(i)"
                      type="number"
                      step="0.1"
                      class="w-full bg-transparent font-mono text-xs font-bold text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      @input="updateGrowthFromScaledRevenue(i, ($event.target as HTMLInputElement).value)"
                    >
                    <span class="ml-1 select-none font-mono text-xs font-semibold text-gray-500 shrink-0">
                      {{ scaleConfig.label }} {{ currencySymbol }}
                    </span>
                  </div>
                </div>
              </template>

              <!-- Mode Lissé : Read-only Scaled Revenue Display -->
              <template v-else>
                <div class="pt-1 space-y-1">
                  <span class="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                    CA Projeté
                  </span>
                  <div class="font-mono text-xs font-bold text-white">
                    {{ formatScaledRevenue(yearRevenues[i - 1]) }}
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- Bannière de Synthèse Unifiée (Footer de la Carte CA) -->
          <div class="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 shadow-md">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div>
                <span class="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  🎯 Chiffre d'Affaires Final Cible (An 5)
                </span>
                <p class="font-mono text-2xl font-extrabold text-white mt-1">
                  {{ formatScaledRevenue(yearRevenues[4]) }}
                </p>
              </div>
              <div>
                <span class="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  📈 CAGR Équivalent Lissé
                </span>
                <p class="mt-1">
                  <SmartValue :value="scenarios.base.equivalentCAGR" type="percent" class="text-2xl font-extrabold" suffix="/an" />
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Marge Nette Cible (%) - Slider jusqu'à 80% (0.80) -->
        <div class="slider-group">
          <div class="slider-header">
            <div class="flex items-center gap-2 flex-wrap">
              <label class="slider-label">Marge Nette Cible (%)</label>
              <span v-if="stock.margin_source" class="source-pill bg-sky-500/10 text-sky-400 border-sky-500/20">
                {{ stock.margin_source }}
              </span>
              <span v-if="isMarginFallback" class="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                [⚠️ DEFAULT]
              </span>
            </div>
            <span class="slider-value text-sky-400">{{ formatPercent(margin) }}</span>
          </div>
          <input
            v-model.number="margin"
            type="range"
            min="0"
            max="0.8"
            step="0.005"
            class="slider slider--sky"
          >
          <div class="slider-bounds">
            <span>0%</span>
            <span>80%</span>
          </div>
        </div>

        <!-- Multiple de Sortie (P/E) -->
        <div class="slider-group">
          <div class="slider-header">
            <div class="flex items-center gap-2 flex-wrap">
              <label class="slider-label">Multiple de Sortie (P/E)</label>
              <span v-if="stock.pe_source" class="source-pill bg-violet-500/10 text-violet-400 border-violet-500/20">
                {{ stock.pe_source }}
              </span>
              <span v-if="isPEFallback" class="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                [⚠️ DEFAULT]
              </span>
            </div>
            <span class="slider-value text-violet-400">{{ targetMultiple.toFixed(1) }}x</span>
          </div>
          <input
            v-model.number="targetMultiple"
            type="range"
            min="5"
            max="120"
            step="0.5"
            class="slider slider--violet"
          >
          <div class="slider-bounds">
            <span>5x</span>
            <span>120x</span>
          </div>
        </div>

        <!-- Taux actualisation (Plage 5.0% - 15.0%) -->
        <div class="slider-group">
          <div class="slider-header">
            <label class="slider-label">Taux d'Actualisation</label>
            <SmartValue :value="discountRate" type="percent" class="text-amber-400" :colored="false" />
          </div>
          <input
            v-model.number="discountRate"
            type="range"
            min="0.05"
            max="0.15"
            step="0.005"
            class="slider slider--amber"
          >
          <div class="slider-bounds">
            <span>5.0%</span>
            <span>15.0%</span>
          </div>
        </div>

        <!-- Contrôle de Risque / Volatilité (risk_spread) -->
        <div class="slider-group rounded-xl border border-indigo-500/20 bg-indigo-950/10 p-4 space-y-2">
          <div class="slider-header">
            <div class="flex items-center gap-2 flex-wrap">
              <label class="slider-label text-indigo-300 font-semibold">Incertitude & Risque Bear / Bull (±%)</label>
              <span class="source-pill bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                Basé sur Bêta ({{ stock.beta ?? 1.0 }})
              </span>
            </div>
            <span class="slider-value text-indigo-400">±{{ formatPercent(riskSpread) }}</span>
          </div>
          <input
            v-model.number="riskSpread"
            type="range"
            min="0.10"
            max="0.25"
            step="0.01"
            class="slider slider--violet"
          >
          <div class="slider-bounds">
            <span>±10% (Stable)</span>
            <span>±25% (Amorti Bêta)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- VUE 2 : SOURCING & CASCADE D'AUDIT -->
    <div v-else class="space-y-6">
      <!-- Panneau Supérieur : Ancrages & Benchmark (2 Colonnes) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Colonne 1 : Données de Marché (Yahoo) [GAUCHE - Métriques Brutes Neutres] -->
        <div class="rounded-xl border border-gray-800 bg-gray-950/60 p-4 space-y-3">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            📊 Données de Marché (Yahoo Finance)
          </h4>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between py-1 border-b border-gray-850">
              <span class="text-gray-400">Market Cap :</span>
              <span class="font-mono font-bold text-white">{{ formatLargeNumber(stock.market_cap) }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-gray-850">
              <span class="text-gray-400">P/E Trailing TTM :</span>
              <span class="font-mono font-semibold text-gray-200">{{ stock.pe_trailing_raw ? `${stock.pe_trailing_raw.toFixed(1)}x` : 'N/A' }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-gray-850">
              <span class="text-gray-400">P/E Forward Consensus :</span>
              <span class="font-mono font-semibold text-gray-200">{{ stock.pe_forward_raw ? `${stock.pe_forward_raw.toFixed(1)}x` : 'N/A' }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-gray-850">
              <span class="text-gray-400">Marge Nette TTM :</span>
              <span class="font-mono font-semibold text-gray-200">{{ formatPercent(stock.margin_net_raw) }}</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-gray-400">Bêta Yahoo (Spread Volatilité) :</span>
              <span class="font-mono font-semibold text-indigo-400">{{ stock.beta ?? 1.0 }} (±{{ formatPercent(stock.risk_spread) }})</span>
            </div>
          </div>
        </div>

        <!-- Colonne 2 : Consensus Wall Street [DROITE - Fourchette Complète & Directionnels] -->
        <div class="rounded-xl border border-gray-800 bg-gray-950/60 p-4 space-y-3">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            🎯 Consensus Wall Street (Analystes)
          </h4>
          <div class="space-y-2 text-xs">
            <!-- Prix Cible Min -->
            <div v-if="stock.analyst_target_low" class="flex justify-between py-1 border-b border-gray-850">
              <span class="text-gray-400">Prix Cible Min (Low) :</span>
              <span class="font-mono font-bold text-purple-300">{{ formatMoney(stock.analyst_target_low) }}</span>
            </div>

            <!-- Prix Cible Moyen -->
            <div class="flex justify-between py-1 border-b border-gray-850">
              <span class="text-gray-400">Prix Cible Moyen (Mean 12M) :</span>
              <div class="flex items-center gap-1.5 font-mono">
                <span class="font-bold text-white">{{ formatMoney(stock.analyst_target_price) }}</span>
                <SmartValue v-if="meanPotential !== null" :value="meanPotential" type="percent" prefix="(" suffix=")" />
              </div>
            </div>

            <!-- Prix Cible Médian -->
            <div class="flex justify-between py-1 border-b border-gray-850">
              <span class="text-gray-400">Prix Cible Médian (12M) :</span>
              <div class="flex items-center gap-1.5 font-mono">
                <span class="font-bold text-white">{{ formatMoney(stock.analyst_target_median) }}</span>
                <SmartValue v-if="medianPotential !== null" :value="medianPotential" type="percent" prefix="(" suffix=")" />
              </div>
            </div>

            <!-- Prix Cible Max -->
            <div v-if="stock.analyst_target_high" class="flex justify-between py-1 border-b border-gray-850">
              <span class="text-gray-400">Prix Cible Max (High) :</span>
              <span class="font-mono font-bold text-purple-300">{{ formatMoney(stock.analyst_target_high) }}</span>
            </div>

            <!-- Consensus Croissance CA NTM -->
            <div class="flex justify-between py-1 border-b border-gray-850">
              <span class="text-gray-400">Consensus Croissance CA NTM :</span>
              <SmartValue :value="stock.analyst_growth_estimate" type="percent" />
            </div>

            <!-- Nombre d'Analystes -->
            <div class="flex justify-between py-1">
              <span class="text-gray-400">Nombre d'Analystes :</span>
              <span class="font-mono font-semibold text-gray-200">{{ stock.analyst_count ?? 'N/A' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Panneau Inférieur : Cascade d'Audit (Transparence Fallbacks) -->
      <div class="rounded-xl border border-gray-800 bg-gray-950/80 p-4 space-y-4">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-2">
          🔍 Cascade d'Audit (Transparence des Fallbacks & Guardrails)
        </h4>

        <div v-if="parsedAuditData" class="space-y-4">
          <!-- Cascade Croissance -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <span>1. Cascade Croissance (g)</span>
              <span class="font-mono text-white">Retenu : {{ formatPercent(parsedAuditData.growth.selected) }}</span>
            </div>
            <table class="w-full text-left text-xs text-gray-300 border border-gray-800 rounded-lg overflow-hidden">
              <thead class="bg-gray-900 text-[10px] text-gray-500 uppercase">
                <tr>
                  <th class="px-3 py-1.5">Candidat</th>
                  <th class="px-3 py-1.5">Valeur Brut</th>
                  <th class="px-3 py-1.5">Statut</th>
                  <th class="px-3 py-1.5">Explication</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-850">
                <tr v-for="c in parsedAuditData.growth.candidates" :key="c.name" :class="c.status === 'selected' ? 'bg-emerald-950/20' : c.status === 'fallback' ? 'bg-amber-950/20' : ''">
                  <td class="px-3 py-2 font-medium" :class="c.status === 'selected' ? 'text-white' : c.status === 'fallback' ? 'text-amber-300 font-bold' : 'text-gray-500 line-through'">{{ c.name }}</td>
                  <td class="px-3 py-2 font-mono">{{ c.value !== null ? formatPercent(c.value) : 'N/A' }}</td>
                  <td class="px-3 py-2">
                    <span v-if="c.status === 'fallback'" class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      [⚠️ DEFAULT]
                    </span>
                    <span v-else-if="c.status === 'selected'" class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      [✓] Selected
                    </span>
                    <span v-else-if="c.status === 'rejected'" class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-red-500/20 text-red-400">
                      [✗] Rejected
                    </span>
                    <span v-else class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-gray-800 text-gray-500">
                      [x] Ignored
                    </span>
                  </td>
                  <td class="px-3 py-2 text-gray-400">{{ c.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Cascade Marge -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs font-bold text-sky-400 uppercase tracking-wider">
              <span>2. Cascade Marge Nette (m)</span>
              <span class="font-mono text-white">Retenu : {{ formatPercent(parsedAuditData.margin.selected) }}</span>
            </div>
            <table class="w-full text-left text-xs text-gray-300 border border-gray-800 rounded-lg overflow-hidden">
              <thead class="bg-gray-900 text-[10px] text-gray-500 uppercase">
                <tr>
                  <th class="px-3 py-1.5">Candidat</th>
                  <th class="px-3 py-1.5">Valeur Brut</th>
                  <th class="px-3 py-1.5">Statut</th>
                  <th class="px-3 py-1.5">Explication</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-850">
                <tr v-for="c in parsedAuditData.margin.candidates" :key="c.name" :class="c.status === 'selected' ? 'bg-sky-950/20' : c.status === 'fallback' ? 'bg-amber-950/20' : ''">
                  <td class="px-3 py-2 font-medium" :class="c.status === 'selected' ? 'text-white' : c.status === 'fallback' ? 'text-amber-300 font-bold' : 'text-gray-500 line-through'">{{ c.name }}</td>
                  <td class="px-3 py-2 font-mono">{{ c.value !== null ? formatPercent(c.value) : 'N/A' }}</td>
                  <td class="px-3 py-2">
                    <span v-if="c.status === 'fallback'" class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      [⚠️ DEFAULT]
                    </span>
                    <span v-else-if="c.status === 'selected'" class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      [✓] Selected
                    </span>
                    <span v-else-if="c.status === 'rejected'" class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-red-500/20 text-red-400">
                      [✗] Rejected
                    </span>
                    <span v-else class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-gray-800 text-gray-500">
                      [x] Ignored
                    </span>
                  </td>
                  <td class="px-3 py-2 text-gray-400">{{ c.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Cascade PE -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs font-bold text-violet-400 uppercase tracking-wider">
              <span>3. Cascade Multiple Exit (P/E)</span>
              <span class="font-mono text-white">Retenu : {{ parsedAuditData.pe.selected.toFixed(1) }}x</span>
            </div>
            <table class="w-full text-left text-xs text-gray-300 border border-gray-800 rounded-lg overflow-hidden">
              <thead class="bg-gray-900 text-[10px] text-gray-500 uppercase">
                <tr>
                  <th class="px-3 py-1.5">Candidat</th>
                  <th class="px-3 py-1.5">Valeur Brut</th>
                  <th class="px-3 py-1.5">Statut</th>
                  <th class="px-3 py-1.5">Explication</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-850">
                <tr v-for="c in parsedAuditData.pe.candidates" :key="c.name" :class="c.status === 'selected' ? 'bg-violet-950/20' : c.status === 'fallback' ? 'bg-amber-950/20' : ''">
                  <td class="px-3 py-2 font-medium" :class="c.status === 'selected' ? 'text-white' : c.status === 'fallback' ? 'text-amber-300 font-bold' : 'text-gray-500 line-through'">{{ c.name }}</td>
                  <td class="px-3 py-2 font-mono">{{ c.value !== null ? `${c.value.toFixed(1)}x` : 'N/A' }}</td>
                  <td class="px-3 py-2">
                    <span v-if="c.status === 'fallback'" class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      [⚠️ DEFAULT]
                    </span>
                    <span v-else-if="c.status === 'selected'" class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-violet-500/20 text-violet-400 border border-violet-500/30">
                      [✓] Selected
                    </span>
                    <span v-else-if="c.status === 'rejected'" class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-red-500/20 text-red-400">
                      [✗] Rejected
                    </span>
                    <span v-else class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-gray-800 text-gray-500">
                      [x] Ignored
                    </span>
                  </td>
                  <td class="px-3 py-2 text-gray-400">{{ c.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Cascade Taux d'Actualisation (r) -->
          <div v-if="parsedAuditData.discount_rate" class="space-y-2">
            <div class="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider">
              <span>4. Cascade Taux d'Actualisation (r)</span>
              <span class="font-mono text-white">Retenu : {{ formatPercent(parsedAuditData.discount_rate.selected) }}</span>
            </div>
            <table class="w-full text-left text-xs text-gray-300 border border-gray-800 rounded-lg overflow-hidden">
              <thead class="bg-gray-900 text-[10px] text-gray-500 uppercase">
                <tr>
                  <th class="px-3 py-1.5">Candidat</th>
                  <th class="px-3 py-1.5">Valeur Brut</th>
                  <th class="px-3 py-1.5">Statut</th>
                  <th class="px-3 py-1.5">Explication</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-850">
                <tr v-for="c in parsedAuditData.discount_rate.candidates" :key="c.name" :class="c.status === 'selected' ? 'bg-amber-950/20' : c.status === 'fallback' ? 'bg-amber-950/20' : ''">
                  <td class="px-3 py-2 font-medium" :class="c.status === 'selected' ? 'text-white' : c.status === 'fallback' ? 'text-amber-300 font-bold' : 'text-gray-500 line-through'">{{ c.name }}</td>
                  <td class="px-3 py-2 font-mono">{{ c.value !== null ? formatPercent(c.value) : 'N/A' }}</td>
                  <td class="px-3 py-2">
                    <span v-if="c.status === 'fallback'" class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      [⚠️ DEFAULT]
                    </span>
                    <span v-else-if="c.status === 'selected'" class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      [✓] Selected
                    </span>
                    <span v-else-if="c.status === 'rejected'" class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-red-500/20 text-red-400">
                      [✗] Rejected
                    </span>
                    <span v-else class="rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-gray-800 text-gray-500">
                      [x] Ignored
                    </span>
                  </td>
                  <td class="px-3 py-2 text-gray-400">{{ c.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else class="text-xs text-gray-500 py-4 text-center">
          Aucune donnée de cascade d'audit enregistrée pour cette action. Effectuez à nouveau la recherche du ticker pour régénérer l'audit trail.
        </div>
      </div>
    </div>
  </div>
</template>

```

# app/layouts/default.vue

```vue
<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 antialiased">
    <header class="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
      <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <h1 class="text-lg font-semibold tracking-tight text-white">
          StockPick
        </h1>
        <slot name="header-actions" />
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <slot />
    </main>
  </div>
</template>

```

# app/pages/confirm.vue

```vue
<script setup lang="ts">
definePageMeta({
  layout: false,
})

navigateTo('/')
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
    <p class="text-sm">Redirection vers le tableau de bord local…</p>
  </div>
</template>

```

# app/pages/index.vue

```vue
<script setup lang="ts">
import type { Stock } from '~/types/database.types'

const searchTicker = ref('')
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const stocks = ref<Stock[]>([])
const isFetchingStocks = ref(true)

const sourcesMap = ref<Record<string, { growth_source?: string; margin_source?: string; pe_source?: string }>>({})

const fetchStocks = async () => {
  isFetchingStocks.value = true
  try {
    const data = await $fetch<Stock[]>('/api/stocks')
    stocks.value = data || []

    // Background prefetch source indicators for existing stocks
    data.forEach(async (s) => {
      if (!sourcesMap.value[s.ticker]) {
        try {
          const apiData = await $fetch<{
            growth_source?: string
            margin_source?: string
            pe_source?: string
          }>(`/api/stock/${encodeURIComponent(s.ticker)}`)
          sourcesMap.value[s.ticker] = {
            growth_source: apiData.growth_source,
            margin_source: apiData.margin_source,
            pe_source: apiData.pe_source,
          }
        } catch {
          // Ignorer les erreurs d'arrière-plan
        }
      }
    })
  } catch (err: any) {
    console.error('Erreur chargement stocks SQLite:', err)
  } finally {
    isFetchingStocks.value = false
  }
}

onMounted(() => {
  fetchStocks()
})

const analyzeAndAddStock = async () => {
  const ticker = searchTicker.value.trim().toUpperCase()
  if (!ticker) return

  isLoading.value = true
  errorMessage.value = null
  successMessage.value = null

  try {
    // 1. Fetch Nitro API Yahoo Finance
    const stockData = await $fetch<{
      ticker: string
      name: string
      currency: string
      current_price: number | null
      revenue_ttm: number | null
      shares_outstanding: number | null
      beta: number
      fetched_at: string
      growth_mode: 'cagr' | 'explicit'
      default_growth: number
      growth_y1: number
      growth_y2: number
      growth_y3: number
      growth_y4: number
      growth_y5: number
      growth_source: string
      default_margin_type: 'net_income' | 'fcf'
      default_margin: number
      margin_source: string
      default_target_multiple: number
      pe_source: string
      default_discount_rate: number
      default_risk_spread: number
      market_cap: number | null
      pe_trailing_raw: number | null
      pe_forward_raw: number | null
      margin_gross_raw: number | null
      margin_operating_raw: number | null
      margin_net_raw: number | null
      margin_fcf_raw: number | null
      total_cash: number | null
      total_debt: number | null
      free_cash_flow_raw: number | null
      analyst_target_low: number | null
      analyst_target_median: number | null
      analyst_target_price: number | null
      analyst_target_high: number | null
      analyst_growth_estimate: number | null
      analyst_count: number | null
      audit_data: any
    }>(`/api/stock/${encodeURIComponent(ticker)}`)

    sourcesMap.value[stockData.ticker] = {
      growth_source: stockData.growth_source,
      margin_source: stockData.margin_source,
      pe_source: stockData.pe_source,
    }

    const existing = stocks.value.find(s => s.ticker === stockData.ticker)

    // 2. POST to SQLite local
    const saved = await $fetch<Stock>('/api/stocks', {
      method: 'POST',
      body: {
        ticker: stockData.ticker,
        name: stockData.name,
        currency: stockData.currency ?? 'USD',
        current_price: stockData.current_price,
        revenue_ttm: stockData.revenue_ttm,
        shares_outstanding: stockData.shares_outstanding,
        beta: stockData.beta ?? 1.0,
        fetched_at: stockData.fetched_at,
        growth_mode: existing?.growth_mode ?? stockData.growth_mode,
        projected_growth: existing?.projected_growth ?? stockData.default_growth,
        growth_y1: existing?.growth_y1 ?? stockData.growth_y1,
        growth_y2: existing?.growth_y2 ?? stockData.growth_y2,
        growth_y3: existing?.growth_y3 ?? stockData.growth_y3,
        growth_y4: existing?.growth_y4 ?? stockData.growth_y4,
        growth_y5: existing?.growth_y5 ?? stockData.growth_y5,
        margin_type: 'net_income',
        projected_margin: existing?.projected_margin ?? stockData.default_margin,
        target_multiple: existing?.target_multiple ?? stockData.default_target_multiple ?? 20.0,
        discount_rate: existing?.discount_rate ?? stockData.default_discount_rate,
        risk_spread: existing?.risk_spread ?? stockData.default_risk_spread ?? 0.20,
        market_cap: stockData.market_cap,
        pe_trailing_raw: stockData.pe_trailing_raw,
        pe_forward_raw: stockData.pe_forward_raw,
        margin_gross_raw: stockData.margin_gross_raw,
        margin_operating_raw: stockData.margin_operating_raw,
        margin_net_raw: stockData.margin_net_raw,
        margin_fcf_raw: stockData.margin_fcf_raw,
        total_cash: stockData.total_cash,
        total_debt: stockData.total_debt,
        free_cash_flow_raw: stockData.free_cash_flow_raw,
        analyst_target_price: stockData.analyst_target_price,
        analyst_target_median: stockData.analyst_target_median,
        analyst_target_low: stockData.analyst_target_low,
        analyst_target_high: stockData.analyst_target_high,
        analyst_growth_estimate: stockData.analyst_growth_estimate,
        analyst_count: stockData.analyst_count,
        audit_data: stockData.audit_data,
      },
    })

    successMessage.value = `${saved.ticker} (${saved.name}) — enregistré en SQLite local avec Audit Trail.`
    searchTicker.value = ''
    await fetchStocks()
  } catch (err: any) {
    errorMessage.value = err.data?.statusMessage || err.message || 'Impossible d\'ajouter ce ticker.'
  } finally {
    isLoading.value = false
  }
}

const getEnrichedStock = (stock: Stock): Stock => {
  const sources = sourcesMap.value[stock.ticker]
  if (!sources) return stock
  return {
    ...stock,
    growth_source: sources.growth_source,
    margin_source: sources.margin_source,
    pe_source: sources.pe_source,
  }
}

const updateStockHypotheses = async (stock: Stock) => {
  try {
    const updated = await $fetch<Stock>(`/api/stocks/${stock.id}`, {
      method: 'PUT',
      body: {
        currency: stock.currency,
        beta: Number(stock.beta),
        growth_mode: stock.growth_mode,
        projected_growth: Number(stock.projected_growth),
        growth_y1: Number(stock.growth_y1),
        growth_y2: Number(stock.growth_y2),
        growth_y3: Number(stock.growth_y3),
        growth_y4: Number(stock.growth_y4),
        growth_y5: Number(stock.growth_y5),
        revenue_y1: stock.revenue_y1 !== null ? Number(stock.revenue_y1) : null,
        revenue_y2: stock.revenue_y2 !== null ? Number(stock.revenue_y2) : null,
        revenue_y3: stock.revenue_y3 !== null ? Number(stock.revenue_y3) : null,
        revenue_y4: stock.revenue_y4 !== null ? Number(stock.revenue_y4) : null,
        revenue_y5: stock.revenue_y5 !== null ? Number(stock.revenue_y5) : null,
        margin_type: 'net_income',
        projected_margin: Number(stock.projected_margin),
        target_multiple: Number(stock.target_multiple),
        discount_rate: Number(stock.discount_rate),
        risk_spread: Number(stock.risk_spread),
      },
    })

    const idx = stocks.value.findIndex(s => s.id === stock.id)
    if (idx !== -1) {
      stocks.value[idx] = { ...stocks.value[idx], ...updated }
    }
  } catch (err: any) {
    console.error('Erreur mise à jour hypothèses SQLite:', err)
  }
}

const deleteStock = async (id: string, ticker: string) => {
  if (!confirm(`Supprimer ${ticker} de votre base locale ?`)) return
  try {
    await $fetch(`/api/stocks/${id}`, { method: 'DELETE' })
    stocks.value = stocks.value.filter(s => s.id !== id)
  } catch (err: any) {
    console.error('Erreur suppression:', err)
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-800 pb-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white">
          Moteur de Valorisation & Pricing
        </h1>
        <p class="text-sm text-gray-400">
          Base de données : <span class="font-medium text-emerald-400">SQLite Local (.data/stocks.db)</span>
        </p>
      </div>
    </div>

    <!-- Barre de recherche -->
    <div class="rounded-xl border border-gray-800 bg-gray-950/60 p-6 space-y-4 shadow-xl backdrop-blur">
      <h2 class="text-base font-semibold text-white">
        🔍 Rechercher & Analyser un Ticker
      </h2>
      <form class="flex flex-col sm:flex-row gap-3" @submit.prevent="analyzeAndAddStock">
        <input
          v-model="searchTicker"
          type="text"
          placeholder="Ex: AAPL, ASML, NVDA, NBIS, TTE.PA..."
          class="flex-1 rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          :disabled="isLoading"
        >
        <button
          type="submit"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500 focus:outline-none disabled:opacity-50"
          :disabled="isLoading || !searchTicker.trim()"
        >
          <svg v-if="isLoading" class="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>{{ isLoading ? 'Analyse...' : 'Analyser / Ajouter' }}</span>
        </button>
      </form>

      <div v-if="errorMessage" class="rounded-lg border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-300">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="rounded-lg border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300">
        {{ successMessage }}
      </div>
    </div>

    <!-- Liste des stocks -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-white">
          Actions Enregistrées ({{ stocks.length }})
        </h2>
      </div>

      <div v-if="isFetchingStocks" class="py-12 text-center text-sm text-gray-500">
        Chargement des données...
      </div>

      <div v-else-if="stocks.length === 0" class="rounded-xl border border-dashed border-gray-800 p-12 text-center text-sm text-gray-500">
        Aucune action enregistrée en SQLite. Utilisez la barre de recherche ci-dessus pour commencer.
      </div>

      <div v-else class="grid gap-6">
        <ValuationCard
          v-for="stock in stocks"
          :key="stock.id"
          :stock="getEnrichedStock(stock)"
          @update="updateStockHypotheses"
          @delete="deleteStock"
        />
      </div>
    </div>
  </div>
</template>

```

# app/pages/login.vue

```vue
<script setup lang="ts">
definePageMeta({
  layout: false,
})

navigateTo('/')
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
    <p class="text-sm">Redirection vers le tableau de bord local…</p>
  </div>
</template>

```

# app/types/database.types.ts

```ts
export type StockStatus = 'research' | 'watchlist' | 'portfolio'
export type GrowthMode = 'cagr' | 'explicit'
export type MarginType = 'net_income' | 'fcf'

export interface AuditCandidate {
  name: string
  value: number | null
  status: 'selected' | 'rejected' | 'ignored' | 'fallback'
  note: string
}

export interface AuditCategory {
  selected: number
  candidates: AuditCandidate[]
}

export interface AuditData {
  growth: AuditCategory
  margin: AuditCategory
  pe: AuditCategory
  discount_rate?: AuditCategory
}

export interface Stock {
  id: string
  ticker: string
  name: string | null
  currency: string
  current_price: number | null
  revenue_ttm: number | null
  shares_outstanding: number | null
  beta: number
  fetched_at: string
  status: StockStatus
  margin_type: MarginType
  growth_mode: GrowthMode
  projected_growth: number
  growth_y1: number
  growth_y2: number
  growth_y3: number
  growth_y4: number
  growth_y5: number
  revenue_y1: number | null
  revenue_y2: number | null
  revenue_y3: number | null
  revenue_y4: number | null
  revenue_y5: number | null
  projected_margin: number
  target_multiple: number
  discount_rate: number
  risk_spread: number
  market_cap: number | null
  pe_trailing_raw: number | null
  pe_forward_raw: number | null
  margin_gross_raw: number | null
  margin_operating_raw: number | null
  margin_net_raw: number | null
  margin_fcf_raw: number | null
  total_cash: number | null
  total_debt: number | null
  free_cash_flow_raw: number | null
  analyst_target_price: number | null
  analyst_target_median?: number | null
  analyst_target_low?: number | null
  analyst_target_high?: number | null
  analyst_growth_estimate: number | null
  analyst_count?: number | null
  audit_data?: AuditData | string | null
  thesis: string | null
  created_at: string
  updated_at: string
  growth_source?: string
  margin_source?: string
  pe_source?: string
}

```

# app/utils/valuation.ts

```ts
export type GrowthMode = 'cagr' | 'explicit'
export type MarginType = 'net_income' | 'fcf'

export interface ValuationInputs {
  currentPrice: number
  revenueTTM: number
  sharesOutstanding: number
  growthMode: GrowthMode
  growth: number
  growthY1: number
  growthY2: number
  growthY3: number
  growthY4: number
  growthY5: number
  marginType: MarginType
  margin: number
  targetMultiple: number
  discountRate: number
  riskSpread: number
}

export interface ValuationResult {
  revenue5Y: number
  equivalentCAGR: number
  earnings5Y: number
  eps5Y: number
  targetPrice5Y: number
  fairValue: number
  marginOfSafety: number
}

export interface ScenarioResults {
  bear: ValuationResult
  base: ValuationResult
  bull: ValuationResult
}

export interface ReverseDCFResult {
  targetPrice5YMarket: number
  earnings5YMarket: number
  revenue5YMarket: number
  impliedGrowth: number
  impliedGrowthY2Y5?: number
}

export function computeValuation(inputs: ValuationInputs): ValuationResult {
  const {
    revenueTTM,
    sharesOutstanding,
    growthMode,
    growth,
    growthY1,
    growthY2,
    growthY3,
    growthY4,
    growthY5,
    margin,
    targetMultiple,
    discountRate,
    currentPrice,
  } = inputs

  let revenue5Y = 0
  let equivalentCAGR = 0

  if (growthMode === 'explicit') {
    revenue5Y = revenueTTM
      * (1 + growthY1)
      * (1 + growthY2)
      * (1 + growthY3)
      * (1 + growthY4)
      * (1 + growthY5)

    equivalentCAGR = revenueTTM > 0 && revenue5Y > 0
      ? Math.pow(revenue5Y / revenueTTM, 1 / 5) - 1
      : 0
  } else {
    revenue5Y = revenueTTM * Math.pow(1 + growth, 5)
    equivalentCAGR = growth
  }

  const earnings5Y = revenue5Y * margin
  const marketCap5Y = earnings5Y * targetMultiple
  const targetPrice5Y = sharesOutstanding > 0 ? marketCap5Y / sharesOutstanding : 0
  const fairValue = targetPrice5Y / Math.pow(1 + discountRate, 5)
  const marginOfSafety = fairValue !== 0
    ? ((fairValue - currentPrice) / fairValue) * 100
    : 0

  return {
    revenue5Y,
    equivalentCAGR,
    earnings5Y,
    eps5Y: sharesOutstanding > 0 ? earnings5Y / sharesOutstanding : 0,
    targetPrice5Y,
    fairValue,
    marginOfSafety,
  }
}

export function computeScenarios(inputs: ValuationInputs): ScenarioResults {
  const base = computeValuation(inputs)
  const spread = inputs.riskSpread

  let bearInputs: ValuationInputs
  let bullInputs: ValuationInputs

  if (inputs.growthMode === 'explicit') {
    bearInputs = {
      ...inputs,
      growthY1: inputs.growthY1 * (1 - spread),
      growthY2: inputs.growthY2 * (1 - spread),
      growthY3: inputs.growthY3 * (1 - spread),
      growthY4: inputs.growthY4 * (1 - spread),
      growthY5: inputs.growthY5 * (1 - spread),
      targetMultiple: inputs.targetMultiple * (1 - spread),
    }

    bullInputs = {
      ...inputs,
      growthY1: inputs.growthY1 * (1 + spread),
      growthY2: inputs.growthY2 * (1 + spread),
      growthY3: inputs.growthY3 * (1 + spread),
      growthY4: inputs.growthY4 * (1 + spread),
      growthY5: inputs.growthY5 * (1 + spread),
      targetMultiple: inputs.targetMultiple * (1 + spread),
    }
  } else {
    bearInputs = {
      ...inputs,
      growth: inputs.growth * (1 - spread),
      targetMultiple: inputs.targetMultiple * (1 - spread),
    }

    bullInputs = {
      ...inputs,
      growth: inputs.growth * (1 + spread),
      targetMultiple: inputs.targetMultiple * (1 + spread),
    }
  }

  return {
    bear: computeValuation(bearInputs),
    base,
    bull: computeValuation(bullInputs),
  }
}

export function computeReverseDCF(inputs: ValuationInputs): ReverseDCFResult {
  const { currentPrice, discountRate, sharesOutstanding, targetMultiple, margin, revenueTTM, growthMode, growthY1 } = inputs

  const targetPrice5YMarket = currentPrice * Math.pow(1 + discountRate, 5)
  const marketCap5Y = targetPrice5YMarket * sharesOutstanding
  const earnings5YMarket = targetMultiple > 0 ? marketCap5Y / targetMultiple : 0
  const revenue5YMarket = margin !== 0 ? earnings5YMarket / margin : 0

  if (growthMode === 'explicit') {
    const revY1 = revenueTTM * (1 + growthY1)
    const impliedGrowthY2Y5 = revY1 > 0 && revenue5YMarket > 0
      ? Math.pow(revenue5YMarket / revY1, 1 / 4) - 1
      : 0

    return {
      targetPrice5YMarket,
      earnings5YMarket,
      revenue5YMarket,
      impliedGrowth: impliedGrowthY2Y5,
      impliedGrowthY2Y5,
    }
  } else {
    const impliedGrowth = revenueTTM > 0 && revenue5YMarket > 0
      ? Math.pow(revenue5YMarket / revenueTTM, 1 / 5) - 1
      : 0

    return {
      targetPrice5YMarket,
      earnings5YMarket,
      revenue5YMarket,
      impliedGrowth,
    }
  }
}

```

# codebase_tree.md

```md
.
├── app
│   ├── app.vue
│   ├── assets
│   │   └── css
│   │       └── main.css
│   ├── components
│   │   ├── SmartValue.vue
│   │   └── ValuationCard.vue
│   ├── layouts
│   │   └── default.vue
│   ├── pages
│   │   ├── confirm.vue
│   │   ├── index.vue
│   │   └── login.vue
│   ├── types
│   │   └── database.types.ts
│   └── utils
│       └── valuation.ts
├── codebase.md
├── codebase_tree.md
├── nuxt.config.ts
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   └── robots.txt
├── README.md
├── scripts
│   └── test-yahoo.ts
├── server
│   ├── api
│   │   ├── stock
│   │   │   └── [ticker].get.ts
│   │   └── stocks
│   │       ├── [id].delete.ts
│   │       ├── [id].put.ts
│   │       ├── index.get.ts
│   │       └── index.post.ts
│   └── utils
│       └── db.ts
├── supabase
│   └── migrations
│       └── 20260722_create_stocks.sql
└── tsconfig.json

18 directories, 27 files

```

# nuxt.config.ts

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  modules: [],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },
})

```

# package.json

```json
{
  "name": "stock-picking-anlysis",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "test:yahoo": "tsx scripts/test-yahoo.ts"
  },
  "dependencies": {
    "better-sqlite3": "^13.0.1",
    "nuxt": "^4.5.0",
    "vue": "^3.5.40",
    "vue-router": "^5.2.0"
  },
  "devDependencies": {
    "@nuxtjs/supabase": "^2.0.9",
    "@tailwindcss/vite": "^4.3.3",
    "@types/better-sqlite3": "^7.6.13",
    "tailwindcss": "^4.3.3",
    "tsx": "^4.23.1",
    "yahoo-finance2": "^4.0.0"
  }
}

```

# public/favicon.ico

This is a binary file of the type: Binary

# public/robots.txt

```txt
User-Agent: *
Disallow:

```

# README.md

```md
# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

\`\`\`bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
\`\`\`

## Development Server

Start the development server on `http://localhost:3000`:

\`\`\`bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
\`\`\`

## Production

Build the application for production:

\`\`\`bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
\`\`\`

Locally preview production build:

\`\`\`bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
\`\`\`

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

```

# scripts/test-yahoo.ts

```ts
import YahooFinance from 'yahoo-finance2'

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

async function testFetch(ticker: string) {
  console.log(`\n🔍 Fetching data for: ${ticker}...\n`)

  try {
    // 1. Données de marché rapides
    const quote = await yahooFinance.quote(ticker)

    // 2. Données fondamentales poussées
    const summary = await yahooFinance.quoteSummary(ticker, {
      modules: ['financialData', 'defaultKeyStatistics', 'summaryDetail'],
    })

    console.log('--- 📊 METRIQUES DE MARCHE (Quote) ---')
    console.log({
      nom: quote.shortName || quote.longName,
      prix: quote.regularMarketPrice,
      devise: quote.currency,
      marketCap: quote.marketCap,
      perTrailing: quote.trailingPE,
      perForward: quote.forwardPE,
    })

    console.log('\n--- 🏛️ SANTÉ ET MARGES (FinancialData & Stats) ---')
    console.log({
      margeBrute: summary.financialData?.grossMargins,
      margeOp: summary.financialData?.operatingMargins,
      roe: summary.financialData?.returnOnEquity,
      fcf: summary.financialData?.freeCashflow,
      croissanceCA: summary.financialData?.revenueGrowth,
      detteTotale: summary.financialData?.totalDebt,
      priceToBook: summary.defaultKeyStatistics?.priceToBook,
      evToEbitda: summary.defaultKeyStatistics?.enterpriseToEbitda,
    })
  } catch (err) {
    console.error('❌ Erreur de fetch :', err)
  }
}

const tickers = process.argv.slice(2).length > 0 ? process.argv.slice(2) : ['ASML', 'NVDA', 'TTE.PA']

for (const ticker of tickers) {
  await testFetch(ticker)
}

```

# server/api/stock/[ticker].get.ts

```ts
import YahooFinance from 'yahoo-finance2'

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export default defineEventHandler(async (event) => {
  const tickerParam = getRouterParam(event, 'ticker')

  if (!tickerParam || typeof tickerParam !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le paramètre ticker est requis',
    })
  }

  const ticker = tickerParam.trim().toUpperCase()

  try {
    let quote: any = null
    try {
      quote = await yahooFinance.quote(ticker)
    } catch (err: any) {
      console.warn(`[YahooFinance] Quote fetch failed for ${ticker}:`, err?.message || err)
    }

    if (!quote || (!quote.shortName && !quote.longName && !quote.regularMarketPrice)) {
      throw createError({
        statusCode: 404,
        statusMessage: `Ticker '${ticker}' non trouvé ou données indisponibles`,
      })
    }

    let summary: any = null
    try {
      summary = await yahooFinance.quoteSummary(ticker, {
        modules: ['earningsTrend', 'financialData', 'summaryDetail', 'defaultKeyStatistics'],
      })
    } catch (err: any) {
      console.warn(`[YahooFinance] QuoteSummary fetch failed for ${ticker}:`, err?.message || err)
      summary = {}
    }

    const name = quote.shortName || quote.longName || ticker
    const currentPrice = quote.regularMarketPrice ?? null

    const financialData = summary?.financialData || {}
    const summaryDetail = summary?.summaryDetail || {}
    const keyStats = summary?.defaultKeyStatistics || {}
    const earningsTrend = summary?.earningsTrend?.trend || []

    const revenueTTM = financialData.totalRevenue ?? null
    const sharesOutstanding = keyStats.sharesOutstanding ?? quote.sharesOutstanding ?? null
    const currency = quote.currency || summaryDetail.currency || 'USD'

    const rawBeta = summaryDetail.beta ?? keyStats.beta ?? 1.0
    const beta = typeof rawBeta === 'number' && isFinite(rawBeta) && rawBeta > 0 ? parseFloat(rawBeta.toFixed(2)) : 1.0
    // Formule amortie du spread de risque Bêta (Solution 1) : Clamp(0.10 + 0.05 * beta, 0.10, 0.25)
    const defaultRiskSpread = parseFloat(clamp(0.10 + 0.05 * beta, 0.10, 0.25).toFixed(2))

    // Raw control metrics & Wall Street benchmark
    const marketCap = quote.marketCap ?? summaryDetail.marketCap ?? null
    const peTrailingRaw = summaryDetail.trailingPE ?? quote.trailingPE ?? keyStats.trailingPE ?? null
    const peForwardRaw = summaryDetail.forwardPE ?? keyStats.forwardPE ?? quote.forwardPE ?? null
    const marginGrossRaw = financialData.grossMargins ?? null
    const marginOperatingRaw = financialData.operatingMargins ?? null
    const marginNetRaw = keyStats.profitMargins ?? financialData.profitMargins ?? null
    const freeCashFlowRaw = financialData.freeCashflow ?? null
    const marginFcfRaw = (revenueTTM && freeCashFlowRaw && revenueTTM > 0) ? (freeCashFlowRaw / revenueTTM) : null
    const totalCash = financialData.totalCash ?? null
    const totalDebt = financialData.totalDebt ?? null

    // Target Prices (Low, Median, Mean, High)
    const targetLowPrice = financialData.targetLowPrice ?? summaryDetail.targetLowPrice ?? null
    const targetMedianPrice = financialData.targetMedianPrice ?? summaryDetail.targetMedianPrice ?? null
    const targetMeanPrice = financialData.targetMeanPrice ?? summaryDetail.targetMeanPrice ?? null
    const targetHighPrice = financialData.targetHighPrice ?? summaryDetail.targetHighPrice ?? null
    const analystCount = financialData.numberOfAnalystOpinions ?? keyStats.numberOfAnalystOpinions ?? null

    const targetMeanPotential = (currentPrice && targetMeanPrice) ? (targetMeanPrice / currentPrice) - 1 : null
    const targetMedianPotential = (currentPrice && targetMedianPrice) ? (targetMedianPrice / currentPrice) - 1 : null

    // -------------------------------------------------------------
    // CASCADE 1 : CROISSANCE (g) - PARSING CA EXPLICITE
    // -------------------------------------------------------------
    const trend1y = earningsTrend.find((t: any) => t.period === '+1y')
    const ntmRevenueGrowth = trend1y?.revenueEstimate?.growth
    const ttmRevenueGrowth = financialData.revenueGrowth

    const validNTM = typeof ntmRevenueGrowth === 'number' && isFinite(ntmRevenueGrowth) && ntmRevenueGrowth !== 0 ? ntmRevenueGrowth : null
    const validTTM = typeof ttmRevenueGrowth === 'number' && isFinite(ttmRevenueGrowth) && ttmRevenueGrowth !== 0 ? ttmRevenueGrowth : null

    let selectedGrowth = 0.10
    let growthSource = 'Fallback Modèle Standard (10%)'
    let growthMode: 'cagr' | 'explicit' = 'cagr'
    let g1 = 0.10, g2 = 0.10, g3 = 0.10, g4 = 0.10, g5 = 0.10

    const growthCandidates: any[] = []

    if (validNTM !== null) {
      selectedGrowth = validNTM
      growthSource = 'Consensus Analystes CA (+1Y NTM)'
      growthCandidates.push({
        name: 'Consensus CA (+1Y NTM)',
        value: parseFloat(validNTM.toFixed(4)),
        status: 'selected',
        note: 'Consensus Analystes CA (+1Y NTM)',
      })
      growthCandidates.push({
        name: 'Historique CA TTM Réalisé',
        value: validTTM !== null ? parseFloat(validTTM.toFixed(4)) : null,
        status: 'ignored',
        note: 'Non requis',
      })
      growthCandidates.push({
        name: 'Fallback Standard (10%)',
        value: 0.10,
        status: 'ignored',
        note: 'Non requis',
      })
    } else if (validTTM !== null) {
      selectedGrowth = clamp(validTTM, -0.5, 0.8)
      growthSource = 'Historique CA TTM Réalisé'
      growthCandidates.push({
        name: 'Consensus CA (+1Y NTM)',
        value: null,
        status: 'rejected',
        note: 'Non disponible',
      })
      growthCandidates.push({
        name: 'Historique CA TTM Réalisé',
        value: parseFloat(validTTM.toFixed(4)),
        status: 'selected',
        note: 'Historique CA TTM Réalisé',
      })
      growthCandidates.push({
        name: 'Fallback Standard (10%)',
        value: 0.10,
        status: 'ignored',
        note: 'Non requis',
      })
    } else {
      selectedGrowth = 0.10
      growthSource = 'Fallback Modèle Standard (10%)'
      growthCandidates.push({
        name: 'Consensus CA (+1Y NTM)',
        value: null,
        status: 'rejected',
        note: 'Non disponible',
      })
      growthCandidates.push({
        name: 'Historique CA TTM Réalisé',
        value: null,
        status: 'rejected',
        note: 'Non disponible',
      })
      growthCandidates.push({
        name: 'Fallback Standard (10%)',
        value: 0.10,
        status: 'fallback',
        note: '⚠️ Valeur par défaut : 10.0%',
      })
    }

    g1 = selectedGrowth
    if (selectedGrowth > 0.20) {
      growthMode = 'explicit'
      g2 = parseFloat((0.50 * selectedGrowth).toFixed(4))
      g3 = 0.30
      g4 = 0.20
      g5 = 0.15
      growthSource = `Consensus > 20% (${(selectedGrowth * 100).toFixed(0)}%) -> Mode Sur-Mesure`
    } else {
      growthMode = 'cagr'
      g2 = selectedGrowth
      g3 = selectedGrowth
      g4 = selectedGrowth
      g5 = selectedGrowth
    }

    // -------------------------------------------------------------
    // CASCADE 2 : MARGE NETTE (m) - PARSING defaultKeyStatistics
    // -------------------------------------------------------------
    let selectedMargin = 0.15
    let marginSource = 'Fallback Modèle Standard (15%)'
    const marginCandidates: any[] = []

    if (typeof marginNetRaw === 'number' && isFinite(marginNetRaw) && marginNetRaw > 0) {
      selectedMargin = clamp(marginNetRaw, 0.01, 0.80)
      marginSource = 'Marge Nette TTM Réelle'
      marginCandidates.push({
        name: 'Marge Nette TTM Réelle',
        value: parseFloat(marginNetRaw.toFixed(4)),
        status: 'selected',
        note: 'Marge Nette TTM Réelle',
      })
      marginCandidates.push({
        name: 'Fallback Standard (15%)',
        value: 0.15,
        status: 'ignored',
        note: 'Non requis',
      })
    } else {
      selectedMargin = 0.15
      marginSource = 'Fallback Modèle Standard (15%)'
      marginCandidates.push({
        name: 'Marge Nette TTM Réelle',
        value: marginNetRaw !== null ? parseFloat(marginNetRaw.toFixed(4)) : null,
        status: 'rejected',
        note: 'Rejeté : Non disponible ou négatif',
      })
      marginCandidates.push({
        name: 'Fallback Standard (15%)',
        value: 0.15,
        status: 'fallback',
        note: '⚠️ Boîte déficitaire : Marge par défaut à 15.0%',
      })
    }

    // -------------------------------------------------------------
    // CASCADE 3 : MULTIPLE EXIT (P/E) - PARSING summaryDetail
    // -------------------------------------------------------------
    let selectedPE = 20.0
    let peSource = 'Multiple par Défaut (20.0x)'
    const peCandidates: any[] = []

    if (typeof peForwardRaw === 'number' && isFinite(peForwardRaw) && peForwardRaw > 0) {
      selectedPE = clamp(peForwardRaw, 5, 120)
      peSource = 'Consensus Forward P/E'
      peCandidates.push({
        name: 'Forward P/E',
        value: parseFloat(peForwardRaw.toFixed(2)),
        status: 'selected',
        note: 'Consensus Forward P/E',
      })
      peCandidates.push({
        name: 'Trailing P/E',
        value: peTrailingRaw !== null ? parseFloat(peTrailingRaw.toFixed(2)) : null,
        status: 'ignored',
        note: 'Non requis',
      })
      peCandidates.push({
        name: 'Multiple par Défaut (20.0x)',
        value: 20.0,
        status: 'ignored',
        note: 'Non requis',
      })
    } else if (typeof peTrailingRaw === 'number' && isFinite(peTrailingRaw) && peTrailingRaw > 0) {
      selectedPE = clamp(peTrailingRaw, 5, 120)
      peSource = 'P/E Trailing TTM'
      peCandidates.push({
        name: 'Forward P/E',
        value: null,
        status: 'rejected',
        note: 'Non disponible',
      })
      peCandidates.push({
        name: 'Trailing P/E',
        value: parseFloat(peTrailingRaw.toFixed(2)),
        status: 'selected',
        note: 'P/E Trailing TTM',
      })
      peCandidates.push({
        name: 'Multiple par Défaut (20.0x)',
        value: 20.0,
        status: 'ignored',
        note: 'Non requis',
      })
    } else {
      selectedPE = 20.0
      peSource = 'Multiple par Défaut (20.0x)'
      peCandidates.push({
        name: 'Forward P/E',
        value: null,
        status: 'rejected',
        note: 'Non disponible',
      })
      peCandidates.push({
        name: 'Trailing P/E',
        value: peTrailingRaw !== null ? parseFloat(peTrailingRaw.toFixed(2)) : null,
        status: 'rejected',
        note: 'Rejeté : Bénéfice Négatif ou non disponible',
      })
      peCandidates.push({
        name: 'Multiple par Défaut (20.0x)',
        value: 20.0,
        status: 'fallback',
        note: '⚠️ Boîte non rentable / P/E absent : Multiple par défaut à 20.0x',
      })
    }

    // -------------------------------------------------------------
    // CASCADE 4 : TAUX D'ACTUALISATION (r) - CAPM / MEDAF (CLAMP 6.0% - 13.5%)
    // -------------------------------------------------------------
    const rawKe = 0.04 + 0.05 * beta
    const selectedDiscountRate = parseFloat(clamp(rawKe, 0.060, 0.135).toFixed(4))
    const discountCandidates: any[] = []

    if (rawKe > 0.135) {
      discountCandidates.push({
        name: 'CAPM Brut (4.0% + Beta × 5.0%)',
        value: parseFloat(rawKe.toFixed(4)),
        status: 'rejected',
        note: `Supérieur au plafond maximum guardrail (13.5%)`,
      })
      discountCandidates.push({
        name: 'Taux Actualisation Plafonné (Cap 13.5%)',
        value: 0.135,
        status: 'selected',
        note: 'Bridé par le Cap Maximum Guardrail (13.5%)',
      })
    } else if (rawKe < 0.060) {
      discountCandidates.push({
        name: 'CAPM Brut (4.0% + Beta × 5.0%)',
        value: parseFloat(rawKe.toFixed(4)),
        status: 'rejected',
        note: `Inférieur au plancher minimum guardrail (6.0%)`,
      })
      discountCandidates.push({
        name: 'Taux Actualisation Planché (Floor 6.0%)',
        value: 0.060,
        status: 'selected',
        note: 'Bridé par le Floor Minimum Guardrail (6.0%)',
      })
    } else {
      discountCandidates.push({
        name: 'CAPM Brut (4.0% + Beta × 5.0%)',
        value: parseFloat(rawKe.toFixed(4)),
        status: 'selected',
        note: 'CAPM appliqué tel quel (entre 6.0% et 13.5%)',
      })
    }

    const auditData = {
      growth: {
        selected: parseFloat(selectedGrowth.toFixed(4)),
        candidates: growthCandidates,
      },
      margin: {
        selected: parseFloat(selectedMargin.toFixed(4)),
        candidates: marginCandidates,
      },
      pe: {
        selected: parseFloat(selectedPE.toFixed(2)),
        candidates: peCandidates,
      },
      discount_rate: {
        selected: selectedDiscountRate,
        candidates: discountCandidates,
      },
    }

    return {
      ticker,
      name,
      currency,
      current_price: currentPrice,
      revenue_ttm: revenueTTM,
      shares_outstanding: sharesOutstanding,
      beta,
      fetched_at: new Date().toISOString(),
      growth_mode: growthMode,
      default_growth: parseFloat(selectedGrowth.toFixed(4)),
      growth_y1: parseFloat(g1.toFixed(4)),
      growth_y2: parseFloat(g2.toFixed(4)),
      growth_y3: parseFloat(g3.toFixed(4)),
      growth_y4: parseFloat(g4.toFixed(4)),
      growth_y5: parseFloat(g5.toFixed(4)),
      growth_source: growthSource,
      default_margin_type: 'net_income',
      default_margin: parseFloat(selectedMargin.toFixed(4)),
      margin_source: marginSource,
      default_target_multiple: parseFloat(selectedPE.toFixed(2)),
      pe_source: peSource,
      default_discount_rate: selectedDiscountRate,
      default_risk_spread: defaultRiskSpread,
      market_cap: marketCap,
      pe_trailing_raw: peTrailingRaw,
      pe_forward_raw: peForwardRaw,
      margin_gross_raw: marginGrossRaw,
      margin_operating_raw: marginOperatingRaw,
      margin_net_raw: marginNetRaw,
      margin_fcf_raw: marginFcfRaw,
      total_cash: totalCash,
      total_debt: totalDebt,
      free_cash_flow_raw: freeCashFlowRaw,
      analyst_target_low: targetLowPrice,
      analyst_target_median: targetMedianPrice,
      analyst_target_price: targetMeanPrice,
      analyst_target_high: targetHighPrice,
      analyst_target_mean_potential: targetMeanPotential,
      analyst_target_median_potential: targetMedianPotential,
      analyst_growth_estimate: validNTM ?? validTTM,
      analyst_count: analystCount,
      audit_data: auditData,
    }
  } catch (error: any) {
    if (error && typeof error === 'object' && error.statusCode && error.statusMessage && !error.response) {
      throw error
    }

    const statusCode = typeof error?.statusCode === 'number' && error.statusCode >= 400 && error.statusCode < 600
      ? error.statusCode
      : 404

    const statusMessage = error?.statusMessage || error?.message || `Impossible de récupérer les données pour le ticker '${ticker}'`

    throw createError({
      statusCode,
      statusMessage: String(statusMessage),
    })
  }
})

```

# server/api/stocks/[id].delete.ts

```ts
import { getDb } from '../../utils/db'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID requis',
    })
  }

  const db = getDb()
  const result = db.prepare('DELETE FROM stocks WHERE id = ?').run(id)

  if (result.changes === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Stock non trouvé',
    })
  }

  return { success: true, id }
})

```

# server/api/stocks/[id].put.ts

```ts
import { getDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID requis',
    })
  }

  const body = await readBody(event)
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Corps de requête requis',
    })
  }

  const db = getDb()
  const existing = db.prepare('SELECT * FROM stocks WHERE id = ?').get(id) as any
  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Stock non trouvé',
    })
  }

  const now = new Date().toISOString()
  const stmt = db.prepare(`
    UPDATE stocks SET
      currency = ?,
      beta = ?,
      growth_mode = ?,
      projected_growth = ?,
      growth_y1 = ?,
      growth_y2 = ?,
      growth_y3 = ?,
      growth_y4 = ?,
      growth_y5 = ?,
      revenue_y1 = ?,
      revenue_y2 = ?,
      revenue_y3 = ?,
      revenue_y4 = ?,
      revenue_y5 = ?,
      margin_type = ?,
      projected_margin = ?,
      target_multiple = ?,
      discount_rate = ?,
      risk_spread = ?,
      thesis = ?,
      status = ?,
      updated_at = ?
    WHERE id = ?
  `)

  stmt.run(
    body.currency ?? existing.currency ?? 'USD',
    body.beta ?? existing.beta ?? 1.0,
    body.growth_mode ?? existing.growth_mode,
    body.projected_growth ?? existing.projected_growth,
    body.growth_y1 ?? existing.growth_y1,
    body.growth_y2 ?? existing.growth_y2,
    body.growth_y3 ?? existing.growth_y3,
    body.growth_y4 ?? existing.growth_y4,
    body.growth_y5 ?? existing.growth_y5,
    body.revenue_y1 ?? existing.revenue_y1,
    body.revenue_y2 ?? existing.revenue_y2,
    body.revenue_y3 ?? existing.revenue_y3,
    body.revenue_y4 ?? existing.revenue_y4,
    body.revenue_y5 ?? existing.revenue_y5,
    body.margin_type ?? existing.margin_type,
    body.projected_margin ?? existing.projected_margin,
    body.target_multiple ?? existing.target_multiple,
    body.discount_rate ?? existing.discount_rate,
    body.risk_spread ?? existing.risk_spread,
    body.thesis ?? existing.thesis,
    body.status ?? existing.status,
    now,
    id
  )

  return db.prepare('SELECT * FROM stocks WHERE id = ?').get(id)
})

```

# server/api/stocks/index.get.ts

```ts
import { getDb } from '../../utils/db'

export default defineEventHandler(() => {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM stocks ORDER BY created_at DESC').all() as any[]
  return rows.map((r) => {
    if (r.audit_data && typeof r.audit_data === 'string') {
      try {
        r.audit_data = JSON.parse(r.audit_data)
      } catch {}
    }
    return r
  })
})

```

# server/api/stocks/index.post.ts

```ts
import { randomUUID } from 'node:crypto'
import { getDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.ticker) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ticker est requis',
    })
  }

  const db = getDb()
  const now = new Date().toISOString()
  const ticker = String(body.ticker).trim().toUpperCase()

  const existing = db.prepare('SELECT * FROM stocks WHERE ticker = ?').get(ticker) as any
  const auditDataStr = body.audit_data ? (typeof body.audit_data === 'string' ? body.audit_data : JSON.stringify(body.audit_data)) : null

  if (existing) {
    const stmt = db.prepare(`
      UPDATE stocks SET
        name = ?,
        currency = ?,
        current_price = ?,
        revenue_ttm = ?,
        shares_outstanding = ?,
        beta = ?,
        fetched_at = ?,
        growth_mode = ?,
        projected_growth = ?,
        growth_y1 = ?,
        growth_y2 = ?,
        growth_y3 = ?,
        growth_y4 = ?,
        growth_y5 = ?,
        revenue_y1 = ?,
        revenue_y2 = ?,
        revenue_y3 = ?,
        revenue_y4 = ?,
        revenue_y5 = ?,
        margin_type = ?,
        projected_margin = ?,
        target_multiple = ?,
        discount_rate = ?,
        risk_spread = ?,
        market_cap = ?,
        pe_trailing_raw = ?,
        pe_forward_raw = ?,
        margin_gross_raw = ?,
        margin_operating_raw = ?,
        margin_net_raw = ?,
        margin_fcf_raw = ?,
        total_cash = ?,
        total_debt = ?,
        free_cash_flow_raw = ?,
        analyst_target_price = ?,
        analyst_target_median = ?,
        analyst_target_low = ?,
        analyst_target_high = ?,
        analyst_growth_estimate = ?,
        analyst_count = ?,
        audit_data = ?,
        updated_at = ?
      WHERE ticker = ?
    `)

    stmt.run(
      body.name ?? existing.name,
      body.currency ?? existing.currency ?? 'USD',
      body.current_price ?? existing.current_price,
      body.revenue_ttm ?? existing.revenue_ttm,
      body.shares_outstanding ?? existing.shares_outstanding,
      body.beta ?? existing.beta ?? 1.0,
      body.fetched_at ?? now,
      body.growth_mode ?? existing.growth_mode,
      body.projected_growth ?? existing.projected_growth,
      body.growth_y1 ?? existing.growth_y1,
      body.growth_y2 ?? existing.growth_y2,
      body.growth_y3 ?? existing.growth_y3,
      body.growth_y4 ?? existing.growth_y4,
      body.growth_y5 ?? existing.growth_y5,
      body.revenue_y1 ?? existing.revenue_y1,
      body.revenue_y2 ?? existing.revenue_y2,
      body.revenue_y3 ?? existing.revenue_y3,
      body.revenue_y4 ?? existing.revenue_y4,
      body.revenue_y5 ?? existing.revenue_y5,
      body.margin_type ?? existing.margin_type ?? 'net_income',
      body.projected_margin ?? existing.projected_margin,
      body.target_multiple ?? existing.target_multiple ?? 20.0,
      body.discount_rate ?? existing.discount_rate,
      body.risk_spread ?? existing.risk_spread ?? 0.20,
      body.market_cap ?? existing.market_cap,
      body.pe_trailing_raw ?? existing.pe_trailing_raw,
      body.pe_forward_raw ?? existing.pe_forward_raw,
      body.margin_gross_raw ?? existing.margin_gross_raw,
      body.margin_operating_raw ?? existing.margin_operating_raw,
      body.margin_net_raw ?? existing.margin_net_raw,
      body.margin_fcf_raw ?? existing.margin_fcf_raw,
      body.total_cash ?? existing.total_cash,
      body.total_debt ?? existing.total_debt,
      body.free_cash_flow_raw ?? existing.free_cash_flow_raw,
      body.analyst_target_price ?? existing.analyst_target_price,
      body.analyst_target_median ?? existing.analyst_target_median,
      body.analyst_target_low ?? existing.analyst_target_low,
      body.analyst_target_high ?? existing.analyst_target_high,
      body.analyst_growth_estimate ?? existing.analyst_growth_estimate,
      body.analyst_count ?? existing.analyst_count,
      auditDataStr ?? existing.audit_data,
      now,
      ticker
    )

    const updatedRow = db.prepare('SELECT * FROM stocks WHERE ticker = ?').get(ticker) as any
    if (updatedRow && updatedRow.audit_data && typeof updatedRow.audit_data === 'string') {
      try { updatedRow.audit_data = JSON.parse(updatedRow.audit_data) } catch {}
    }
    return updatedRow
  } else {
    const id = randomUUID()
    const stmt = db.prepare(`
      INSERT INTO stocks (
        id, ticker, name, currency, current_price, revenue_ttm, shares_outstanding,
        beta, fetched_at, status, margin_type, growth_mode, projected_growth,
        growth_y1, growth_y2, growth_y3, growth_y4, growth_y5,
        revenue_y1, revenue_y2, revenue_y3, revenue_y4, revenue_y5,
        projected_margin, target_multiple, discount_rate, risk_spread,
        market_cap, pe_trailing_raw, pe_forward_raw, margin_gross_raw, margin_operating_raw,
        margin_net_raw, margin_fcf_raw, total_cash, total_debt, free_cash_flow_raw,
        analyst_target_price, analyst_target_median, analyst_target_low, analyst_target_high, analyst_growth_estimate, analyst_count, audit_data, thesis, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `)

    stmt.run(
      id,
      ticker,
      body.name ?? ticker,
      body.currency ?? 'USD',
      body.current_price ?? null,
      body.revenue_ttm ?? null,
      body.shares_outstanding ?? null,
      body.beta ?? 1.0,
      body.fetched_at ?? now,
      body.status ?? 'research',
      body.margin_type ?? 'net_income',
      body.growth_mode ?? 'cagr',
      body.projected_growth ?? 0.10,
      body.growth_y1 ?? 0.10,
      body.growth_y2 ?? 0.10,
      body.growth_y3 ?? 0.10,
      body.growth_y4 ?? 0.10,
      body.growth_y5 ?? 0.10,
      body.revenue_y1 ?? null,
      body.revenue_y2 ?? null,
      body.revenue_y3 ?? null,
      body.revenue_y4 ?? null,
      body.revenue_y5 ?? null,
      body.projected_margin ?? 0.20,
      body.target_multiple ?? 20.0,
      body.discount_rate ?? 0.10,
      body.risk_spread ?? 0.20,
      body.market_cap ?? null,
      body.pe_trailing_raw ?? null,
      body.pe_forward_raw ?? null,
      body.margin_gross_raw ?? null,
      body.margin_operating_raw ?? null,
      body.margin_net_raw ?? null,
      body.margin_fcf_raw ?? null,
      body.total_cash ?? null,
      body.total_debt ?? null,
      body.free_cash_flow_raw ?? null,
      body.analyst_target_price ?? null,
      body.analyst_target_median ?? null,
      body.analyst_target_low ?? null,
      body.analyst_target_high ?? null,
      body.analyst_growth_estimate ?? null,
      body.analyst_count ?? null,
      auditDataStr ?? null,
      body.thesis ?? null,
      now,
      now
    )

    const newRow = db.prepare('SELECT * FROM stocks WHERE id = ?').get(id) as any
    if (newRow && newRow.audit_data && typeof newRow.audit_data === 'string') {
      try { newRow.audit_data = JSON.parse(newRow.audit_data) } catch {}
    }
    return newRow
  }
})

```

# server/utils/db.ts

```ts
import fs from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'

let _db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!_db) {
    const dataDir = path.resolve(process.cwd(), '.data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    const dbPath = path.join(dataDir, 'stocks.db')
    _db = new Database(dbPath)
    _db.pragma('journal_mode = WAL')

    _db.exec(`
      CREATE TABLE IF NOT EXISTS stocks (
        id TEXT PRIMARY KEY,
        ticker TEXT UNIQUE NOT NULL,
        name TEXT,
        currency TEXT DEFAULT 'USD',
        current_price REAL,
        revenue_ttm REAL,
        shares_outstanding REAL,
        beta REAL DEFAULT 1.0,
        fetched_at TEXT,
        status TEXT DEFAULT 'research',
        margin_type TEXT DEFAULT 'net_income',
        growth_mode TEXT DEFAULT 'cagr',
        projected_growth REAL DEFAULT 0.10,
        growth_y1 REAL DEFAULT 0.10,
        growth_y2 REAL DEFAULT 0.10,
        growth_y3 REAL DEFAULT 0.10,
        growth_y4 REAL DEFAULT 0.10,
        growth_y5 REAL DEFAULT 0.10,
        revenue_y1 REAL,
        revenue_y2 REAL,
        revenue_y3 REAL,
        revenue_y4 REAL,
        revenue_y5 REAL,
        projected_margin REAL DEFAULT 0.20,
        target_multiple REAL DEFAULT 20.0,
        discount_rate REAL DEFAULT 0.10,
        risk_spread REAL DEFAULT 0.20,
        market_cap REAL,
        pe_trailing_raw REAL,
        pe_forward_raw REAL,
        margin_gross_raw REAL,
        margin_operating_raw REAL,
        margin_net_raw REAL,
        margin_fcf_raw REAL,
        total_cash REAL,
        total_debt REAL,
        free_cash_flow_raw REAL,
        analyst_target_price REAL,
        analyst_target_median REAL,
        analyst_target_low REAL,
        analyst_target_high REAL,
        analyst_growth_estimate REAL,
        analyst_count INTEGER,
        audit_data TEXT,
        thesis TEXT,
        created_at TEXT,
        updated_at TEXT
      );
    `)

    // Safe migrations for existing SQLite database files
    const safeAddColumn = (col: string, def: string) => {
      try {
        _db?.exec(`ALTER TABLE stocks ADD COLUMN ${col} ${def}`)
      } catch {}
    }

    safeAddColumn('currency', "TEXT DEFAULT 'USD'")
    safeAddColumn('beta', 'REAL DEFAULT 1.0')
    safeAddColumn('margin_type', "TEXT DEFAULT 'net_income'")
    safeAddColumn('growth_mode', "TEXT DEFAULT 'cagr'")
    safeAddColumn('growth_y1', 'REAL DEFAULT 0.10')
    safeAddColumn('growth_y2', 'REAL DEFAULT 0.10')
    safeAddColumn('growth_y3', 'REAL DEFAULT 0.10')
    safeAddColumn('growth_y4', 'REAL DEFAULT 0.10')
    safeAddColumn('growth_y5', 'REAL DEFAULT 0.10')
    safeAddColumn('revenue_y1', 'REAL')
    safeAddColumn('revenue_y2', 'REAL')
    safeAddColumn('revenue_y3', 'REAL')
    safeAddColumn('revenue_y4', 'REAL')
    safeAddColumn('revenue_y5', 'REAL')
    safeAddColumn('target_multiple', 'REAL DEFAULT 20.0')
    safeAddColumn('risk_spread', 'REAL DEFAULT 0.20')
    safeAddColumn('market_cap', 'REAL')
    safeAddColumn('pe_trailing_raw', 'REAL')
    safeAddColumn('pe_forward_raw', 'REAL')
    safeAddColumn('margin_gross_raw', 'REAL')
    safeAddColumn('margin_operating_raw', 'REAL')
    safeAddColumn('margin_net_raw', 'REAL')
    safeAddColumn('margin_fcf_raw', 'REAL')
    safeAddColumn('total_cash', 'REAL')
    safeAddColumn('total_debt', 'REAL')
    safeAddColumn('free_cash_flow_raw', 'REAL')
    safeAddColumn('analyst_target_price', 'REAL')
    safeAddColumn('analyst_target_median', 'REAL')
    safeAddColumn('analyst_target_low', 'REAL')
    safeAddColumn('analyst_target_high', 'REAL')
    safeAddColumn('analyst_growth_estimate', 'REAL')
    safeAddColumn('analyst_count', 'INTEGER')
    safeAddColumn('audit_data', 'TEXT')
  }

  return _db
}

```

# supabase/migrations/20260722_create_stocks.sql

```sql
-- Create stock_status enum
CREATE TYPE public.stock_status AS ENUM ('research', 'watchlist', 'portfolio');

-- Create public.stocks table
CREATE TABLE public.stocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    ticker TEXT NOT NULL,
    name TEXT,
    current_price NUMERIC,
    revenue_ttm NUMERIC,
    shares_outstanding NUMERIC,
    fetched_at TIMESTAMPTZ DEFAULT NOW(),
    status public.stock_status NOT NULL DEFAULT 'research',
    projected_growth NUMERIC NOT NULL DEFAULT 0.10,
    projected_margin NUMERIC NOT NULL DEFAULT 0.20,
    target_pe NUMERIC NOT NULL DEFAULT 20,
    discount_rate NUMERIC NOT NULL DEFAULT 0.10,
    thesis TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT stocks_user_id_ticker_key UNIQUE (user_id, ticker)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.stocks ENABLE ROW LEVEL SECURITY;

-- Policies for RLS
CREATE POLICY "Users can manage their own stocks"
    ON public.stocks
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

```

# tsconfig.json

```json
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "files": [],
  "references": [
    {
      "path": "./.nuxt/tsconfig.app.json"
    },
    {
      "path": "./.nuxt/tsconfig.server.json"
    },
    {
      "path": "./.nuxt/tsconfig.shared.json"
    },
    {
      "path": "./.nuxt/tsconfig.node.json"
    }
  ]
}

```

