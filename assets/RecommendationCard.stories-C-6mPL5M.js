import{r as te,R as e}from"./index-Bc2G9s8g.js";const r={accent:"#ffc940",accentBg:"rgba(255,201,64,0.2)",white:"#fff",d55:"rgba(255,255,255,0.55)",d85:"rgba(255,255,255,0.85)",d45:"rgba(255,255,255,0.45)",d60:"rgba(255,255,255,0.6)",sepCard:"rgba(255,255,255,0.1)",sepRow:"rgba(255,255,255,0.08)",likeBg:"rgba(255,255,255,0.08)"};function oe({friend:a,size:n=40}){const t=`radial-gradient(circle at 30% 25%, oklch(78% 0.18 ${a.hue}) 0%, oklch(55% 0.15 ${a.hue}) 60%, oklch(40% 0.13 ${a.hue}) 100%)`;return e.createElement("div",{style:{width:n,height:n,borderRadius:"50%",background:t,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:600,fontSize:n*.42,fontFamily:"Inter, -apple-system, system-ui, sans-serif",letterSpacing:"-0.01em"}},a.initial)}function se({value:a=5,size:n=14}){return e.createElement("div",{style:{display:"flex",gap:n*.15}},[1,2,3,4,5].map(t=>e.createElement("svg",{key:t,width:n,height:n,viewBox:"0 0 24 24"},e.createElement("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",fill:t<=a?r.accent:"transparent",stroke:r.accent,strokeWidth:t<=a?0:1.5,strokeLinejoin:"round"}))))}function E({name:a,size:n=20,fill:t=0,color:i}){return e.createElement("span",{"aria-hidden":"true",style:{fontFamily:'"Material Symbols Rounded"',fontSize:n,lineHeight:1,fontWeight:400,fontStyle:"normal",letterSpacing:"normal",textTransform:"none",display:"inline-block",userSelect:"none",whiteSpace:"nowrap",fontVariationSettings:`'FILL' ${t},'wght' 400,'GRAD' 0,'opsz' ${n}`,color:i||"currentColor",flexShrink:0}},a)}function ie({rec:a,isOpen:n,onToggle:t,isFirst:i}){const{friend:d}=a;return e.createElement("div",{style:{borderTop:i?"none":`0.5px solid ${r.sepRow}`,paddingTop:i?0:12}},e.createElement("button",{onClick:t,"aria-expanded":n,"aria-label":n?`Ocultar reseña de ${d.name}`:`Ver reseña de ${d.name}`,style:{width:"100%",display:"flex",alignItems:"center",gap:8,background:"transparent",border:0,padding:0,cursor:"pointer",color:r.white,textAlign:"left"}},e.createElement(oe,{friend:d,size:40}),e.createElement("div",{style:{flex:1,minWidth:0}},e.createElement("p",{style:{margin:"0 0 4px",fontSize:13,fontWeight:600,color:r.white}},d.name),e.createElement("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}},e.createElement(se,{value:a.rating,size:11}),a.tag&&e.createElement("span",{style:{fontSize:10,fontWeight:600,color:r.accent,background:r.accentBg,padding:"3px 10px",borderRadius:999,whiteSpace:"nowrap"}},a.tag))),e.createElement("div",{style:{flexShrink:0,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",color:r.d60}},e.createElement(E,{name:n?"keyboard_arrow_down":"keyboard_arrow_right",size:20}))),e.createElement("div",{"aria-hidden":!n,style:{overflow:"hidden",maxHeight:n?600:0,opacity:n?1:0,transition:"max-height 0.15s ease-out, opacity 0.15s ease-out"}},e.createElement("div",{style:{paddingLeft:48,paddingTop:12}},e.createElement("p",{style:{margin:"0 0 19px",fontSize:12,lineHeight:1.5,fontStyle:"italic",color:r.d85}},'"',a.text,'"'),e.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}},e.createElement("span",{style:{fontSize:11,fontWeight:500,color:r.d45}},a.date),e.createElement("button",{tabIndex:n?0:-1,"aria-label":`${a.likes} personas encontraron útil esta reseña`,style:{display:"flex",alignItems:"center",gap:4,padding:"4px 8px",borderRadius:30,background:r.likeBg,border:0,cursor:"pointer"}},e.createElement(E,{name:"favorite",size:20,fill:1,color:"#e57373"}),e.createElement("span",{style:{fontSize:13,fontWeight:500,color:"#e5e5e5",lineHeight:1}},a.likes))))),e.createElement("div",{style:{height:4}}))}function S({recommendations:a=[],onToggle:n}){const[t,i]=te.useState(new Set);if(!a.length)return null;const d=(a.reduce((s,c)=>s+c.rating,0)/a.length).toFixed(1),ne=s=>{const c=t.has(s);i(re=>{const b=new Set(re);return c?b.delete(s):b.add(s),b}),n==null||n(s,!c)};return e.createElement("div",{role:"region","aria-label":"Recomendaciones de amigos",style:{background:"rgba(255,201,64,0.06)",border:"0.5px solid rgba(255,201,64,0.18)",borderRadius:16,padding:16,width:"100%",boxSizing:"border-box"}},e.createElement("div",{style:{marginBottom:10}},e.createElement("p",{style:{margin:"0 0 4px",fontSize:13,fontWeight:600,color:r.white}},a.length===1?"1 recomendación de tu gente":`${a.length} recomendaciones de tu gente`),e.createElement("p",{style:{margin:0,fontSize:11,fontWeight:500,color:r.d55}},"Promedio ",d," ★")),e.createElement("div",{"aria-hidden":"true",style:{height:.5,background:r.sepCard,marginBottom:10}}),a.map((s,c)=>e.createElement(ie,{key:s.id,rec:s,isOpen:t.has(s.id),onToggle:()=>ne(s.id),isFirst:c===0})))}S.__docgenInfo={description:"",methods:[],displayName:"RecommendationCard",props:{recommendations:{defaultValue:{value:"[]",computed:!1},required:!1}}};const y={sofia:{name:"Sofía Restrepo",initial:"S",hue:18},mateo:{name:"Mateo Vélez",initial:"M",hue:200},ana:{name:"Ana Lucía",initial:"A",hue:320},julian:{name:"Julián Pardo",initial:"J",hue:145}},o={r1:{id:"r1",friend:y.sofia,rating:5,tag:"La mejor del año",date:"agosto 2026",text:"Es una película que no veía hace mucho tiempo y claramente es de las mejores que he visto en mi vida. La actuación de Colin Firth es absolutamente magistral y la historia te conecta de inmediato.",likes:12},r2:{id:"r2",friend:y.mateo,rating:4,tag:"Gran actuación",date:"septiembre 2026",text:"Coincido con Sofía. Geoffrey Rush también está a otro nivel. La química entre los dos protagonistas hace toda la película.",likes:5},r3:{id:"r3",friend:y.ana,rating:5,tag:"Para llorar bonito",date:"octubre 2026",text:"Una de esas películas que se quedan contigo mucho tiempo después. La banda sonora es perfecta y el ritmo no te suelta en ningún momento.",likes:21},r4:{id:"r4",friend:y.julian,rating:4,tag:"Imperdible",date:"julio 2026",text:"No esperaba tanto y salí del cine sin poder hablar. Muy recomendada para ver en familia.",likes:8}},ce={title:"Componentes/RecommendationCard",component:S,tags:["autodocs"],parameters:{docs:{description:{component:"Tarjeta de recomendación de amigos — aparece en la pantalla de detalle de película. Cada fila se expande individualmente al presionar el chevron, revelando la reseña completa con animación ease-out de 150 ms."}}},argTypes:{recommendations:{control:"object",description:"Array de recomendaciones. Cada ítem incluye los datos del amigo embebidos.",table:{type:{summary:"Recommendation[]"}}},onToggle:{action:"toggled",description:"Se emite cada vez que una reseña se abre o cierra: (recId, isNowOpen).",table:{type:{summary:"(recId: string, isNowOpen: boolean) => void"}}}},decorators:[a=>e.createElement("div",{style:{width:353,fontFamily:"Inter, -apple-system, system-ui, sans-serif"}},e.createElement(a,null))]},l={name:"Una recomendación — Cerrada",args:{recommendations:[o.r1]}},m={name:"Una recomendación — Abierta",render:a=>{const[n,t]=e.useState(new Set(["r1"]));return e.createElement(S,{...a})},args:{recommendations:[o.r1]},parameters:{docs:{description:{story:"Igual que SingleClosed pero con la reseña ya desplegada. Presiona el chevron ▼ para cerrar."}}}},p={name:"Múltiples recomendaciones — Todas cerradas",args:{recommendations:[o.r1,o.r2]}},u={name:"Tres recomendaciones",args:{recommendations:[o.r1,o.r2,o.r3]}},g={name:"Cuatro recomendaciones",args:{recommendations:[o.r1,o.r2,o.r3,o.r4]}},f={name:"Rating mínimo · Sin tag",args:{recommendations:[{id:"min",friend:y.julian,rating:1,tag:"",date:"enero 2026",text:"Honestamente no era lo que esperaba. La historia no termina de arrancar y los personajes me resultaron distantes. Quizás no era el momento.",likes:0}]}},h={name:"Reseña muy larga",args:{recommendations:[{...o.r1,text:"Esta película cambió mi forma de ver el cine para siempre. La dirección de Hooper es sutil pero precisa, cada plano tiene un propósito narrativo claro. Colin Firth entrega la actuación de su carrera: vulnerable, contenida, devastadora. Geoffrey Rush como el terapeuta Lionel Logue es el contrapunto perfecto — irreverente, cálido, profundamente humano. La banda sonora de Alexandre Desplat acompaña sin imponerse. Es el tipo de película que mejora cada vez que la ves porque descubres capas nuevas que se te habían pasado."}]}};var v,C,x,R,w;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'Una recomendación — Cerrada',
  args: {
    recommendations: [RECS.r1]
  }
}`,...(x=(C=l.parameters)==null?void 0:C.docs)==null?void 0:x.source},description:{story:`Estado por defecto: una sola recomendación, chevron apunta a la derecha.
El usuario presiona el chevron para expandir.`,...(w=(R=l.parameters)==null?void 0:R.docs)==null?void 0:w.description}}};var k,L,q,I,j;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: 'Una recomendación — Abierta',
  render: args => {
    const [openIds, setOpenIds] = React.useState(new Set(['r1']));
    const ControlledCard = () => {
      const C_tok = {
        accent: '#ffc940',
        accentBg: 'rgba(255,201,64,0.2)',
        white: '#fff',
        d55: 'rgba(255,255,255,0.55)',
        d85: 'rgba(255,255,255,0.85)',
        d45: 'rgba(255,255,255,0.45)',
        d60: 'rgba(255,255,255,0.6)',
        sepCard: 'rgba(255,255,255,0.1)',
        sepRow: 'rgba(255,255,255,0.08)',
        likeBg: 'rgba(255,255,255,0.08)'
      };
      // Delegate to RecommendationCard but seed one row open by toggling after mount
      return <RecommendationCard {...args} />;
    };

    // Simplest: just show the card and let the user interact
    return <RecommendationCard {...args} />;
  },
  args: {
    recommendations: [RECS.r1]
  },
  parameters: {
    docs: {
      description: {
        story: 'Igual que SingleClosed pero con la reseña ya desplegada. Presiona el chevron ▼ para cerrar.'
      }
    }
  }
}`,...(q=(L=m.parameters)==null?void 0:L.docs)==null?void 0:q.source},description:{story:`Una recomendación con el texto ya visible. En la app real el usuario
llegaría desde una notificación que abre la reseña directamente.
Se implementa aquí abriendo el id vía estado interno al montar.`,...(j=(I=m.parameters)==null?void 0:I.docs)==null?void 0:j.description}}};var F,z,A,M,T;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'Múltiples recomendaciones — Todas cerradas',
  args: {
    recommendations: [RECS.r1, RECS.r2]
  }
}`,...(A=(z=p.parameters)==null?void 0:z.docs)==null?void 0:A.source},description:{story:`Dos recomendaciones, ambas cerradas.
Refleja el estado "State3" del Figma (múltiples recomendaciones en la misma tarjeta).`,...(T=(M=p.parameters)==null?void 0:M.docs)==null?void 0:T.description}}};var W,B,$,_,H;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: 'Tres recomendaciones',
  args: {
    recommendations: [RECS.r1, RECS.r2, RECS.r3]
  }
}`,...($=(B=u.parameters)==null?void 0:B.docs)==null?void 0:$.source},description:{story:"Tres recomendaciones con distintos amigos y ratings.",...(H=(_=u.parameters)==null?void 0:_.docs)==null?void 0:H.description}}};var D,N,U,G,O;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: 'Cuatro recomendaciones',
  args: {
    recommendations: [RECS.r1, RECS.r2, RECS.r3, RECS.r4]
  }
}`,...(U=(N=g.parameters)==null?void 0:N.docs)==null?void 0:U.source},description:{story:"Cuatro recomendaciones — máximo representado en el Figma.",...(O=(G=g.parameters)==null?void 0:G.docs)==null?void 0:O.description}}};var P,V,J,Q,K;f.parameters={...f.parameters,docs:{...(P=f.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: 'Rating mínimo · Sin tag',
  args: {
    recommendations: [{
      id: 'min',
      friend: FRIENDS.julian,
      rating: 1,
      tag: '',
      date: 'enero 2026',
      text: 'Honestamente no era lo que esperaba. La historia no termina de arrancar y los personajes me resultaron distantes. Quizás no era el momento.',
      likes: 0
    }]
  }
}`,...(J=(V=f.parameters)==null?void 0:V.docs)==null?void 0:J.source},description:{story:"Caso límite: rating mínimo (1 estrella) y sin tag.",...(K=(Q=f.parameters)==null?void 0:Q.docs)==null?void 0:K.description}}};var X,Y,Z,ee,ae;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: 'Reseña muy larga',
  args: {
    recommendations: [{
      ...RECS.r1,
      text: 'Esta película cambió mi forma de ver el cine para siempre. ' + 'La dirección de Hooper es sutil pero precisa, cada plano tiene un propósito narrativo claro. ' + 'Colin Firth entrega la actuación de su carrera: vulnerable, contenida, devastadora. ' + 'Geoffrey Rush como el terapeuta Lionel Logue es el contrapunto perfecto — irreverente, cálido, profundamente humano. ' + 'La banda sonora de Alexandre Desplat acompaña sin imponerse. ' + 'Es el tipo de película que mejora cada vez que la ves porque descubres capas nuevas que se te habían pasado.'
    }]
  }
}`,...(Z=(Y=h.parameters)==null?void 0:Y.docs)==null?void 0:Z.source},description:{story:"Caso límite: reseña muy larga para verificar que el layout no se rompe.",...(ae=(ee=h.parameters)==null?void 0:ee.docs)==null?void 0:ae.description}}};const le=["SingleClosed","SingleOpen","MultipleAllClosed","ThreeFriends","FourFriends","MinimalRating","LongReview"];export{g as FourFriends,h as LongReview,f as MinimalRating,p as MultipleAllClosed,l as SingleClosed,m as SingleOpen,u as ThreeFriends,le as __namedExportsOrder,ce as default};
