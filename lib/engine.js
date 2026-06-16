'use strict';
/* गीता reader engine — vanilla core mounted by the React client component.
   Data: /data/index.json (chapter meta) + /data/chapter-NN.json (canonical schema, lazy). */

const PAL = {
1:{bg:'#2b2b2e',ink:'#e8e4dc',mut:'rgba(232,228,220,.52)',acc:'#9a938a',fop:.5,
 fx:[{w:'130vmax',h:'46vmax',x:'-20%',y:'52%',r:'50%',g:'radial-gradient(ellipse at 50% 50%, rgba(120,118,124,.5), transparent 70%)'},
     {w:'110vmax',h:'38vmax',x:'12%',y:'18%',r:'50%',g:'radial-gradient(ellipse at 50% 50%, rgba(90,88,96,.42), transparent 70%)'}]},
2:{bg:'#f4efe4',ink:'#2a2723',mut:'rgba(42,39,35,.5)',acc:'#b06a2c',fop:.6,
 fx:[{w:'80vmax',h:'80vmax',x:'14%',y:'46%',r:'50%',g:'radial-gradient(circle, rgba(222,150,70,.5), rgba(222,150,70,.12) 45%, transparent 68%)'}]},
3:{bg:'#efe2d0',ink:'#33291f',mut:'rgba(51,41,31,.5)',acc:'#a4502e',fop:.55,
 fx:[{w:'95vmax',h:'95vmax',x:'34%',y:'-8%',r:'50%',g:'radial-gradient(circle, transparent 34%, rgba(164,80,46,.4) 46%, rgba(164,80,46,.1) 58%, transparent 70%)'}]},
4:{bg:'#2e2418',ink:'#f0e6d2',mut:'rgba(240,230,210,.5)',acc:'#d99a2b',fop:.6,
 fx:[{w:'70vmax',h:'70vmax',x:'-12%',y:'30%',r:'50%',g:'radial-gradient(circle, rgba(217,154,43,.65) 0%, rgba(217,154,43,.18) 32%, transparent 62%)'}]},
5:{bg:'#e9ead8',ink:'#2c3026',mut:'rgba(44,48,38,.5)',acc:'#6f7d5c',fop:.55,
 fx:[{w:'56vmax',h:'56vmax',x:'-4%',y:'26%',r:'50%',g:'radial-gradient(circle, rgba(111,125,92,.42), transparent 66%)'},
     {w:'56vmax',h:'56vmax',x:'48%',y:'26%',r:'50%',g:'radial-gradient(circle, rgba(111,125,92,.42), transparent 66%)'}]},
6:{bg:'#23252e',ink:'#dfe0e8',mut:'rgba(223,224,232,.5)',acc:'#8b93b8',fop:.55,
 fx:[{w:'58vmax',h:'58vmax',x:'21%',y:'8%',r:'50%',g:'radial-gradient(circle, rgba(139,147,184,.5), rgba(139,147,184,.12) 42%, transparent 66%)'}]},
7:{bg:'#dfe9e6',ink:'#1f3331',mut:'rgba(31,51,49,.5)',acc:'#3f7d74',fop:.55,
 fx:[{w:'140vmax',h:'30vmax',x:'-20%',y:'22%',r:'50%',g:'radial-gradient(ellipse, rgba(63,125,116,.4), transparent 70%)'},
     {w:'140vmax',h:'30vmax',x:'-10%',y:'52%',r:'50%',g:'radial-gradient(ellipse, rgba(63,125,116,.3), transparent 70%)'},
     {w:'140vmax',h:'30vmax',x:'-26%',y:'76%',r:'50%',g:'radial-gradient(ellipse, rgba(63,125,116,.22), transparent 70%)'}]},
8:{bg:'#2a2433',ink:'#e6dfee',mut:'rgba(230,223,238,.5)',acc:'#a98fc9',fop:.55,
 fx:[{w:'130vmax',h:'34vmax',x:'-6%',y:'-4%',r:'50%',rot:'-24deg',g:'radial-gradient(ellipse, rgba(169,143,201,.5), transparent 68%)'}]},
9:{bg:'#1f2a44',ink:'#e9e6da',mut:'rgba(233,230,218,.5)',acc:'#d4af5a',fop:.55,
 fx:[{w:'150vmax',h:'70vmax',x:'-26%',y:'40%',r:'50%',g:'radial-gradient(ellipse, rgba(70,90,140,.5), transparent 70%)'},
     {w:'34vmax',h:'34vmax',x:'58%',y:'6%',r:'50%',g:'radial-gradient(circle, rgba(212,175,90,.5), transparent 62%)'}]},
10:{bg:'#21303a',ink:'#e3ecee',mut:'rgba(227,236,238,.5)',acc:'#56b3a9',fop:.55,
 fx:[{w:'26vmax',h:'26vmax',x:'8%',y:'12%',r:'50%',g:'radial-gradient(circle, rgba(86,179,169,.5), transparent 64%)'},
     {w:'18vmax',h:'18vmax',x:'62%',y:'26%',r:'50%',g:'radial-gradient(circle, rgba(201,164,74,.45), transparent 64%)'},
     {w:'22vmax',h:'22vmax',x:'30%',y:'58%',r:'50%',g:'radial-gradient(circle, rgba(86,179,169,.4), transparent 64%)'},
     {w:'14vmax',h:'14vmax',x:'74%',y:'68%',r:'50%',g:'radial-gradient(circle, rgba(201,164,74,.4), transparent 64%)'}]},
11:{bg:'#14110e',ink:'#f0e7d4',mut:'rgba(240,231,212,.5)',acc:'#e0a830',fop:.7,
 fx:[{w:'120vmax',h:'120vmax',x:'50%',y:'50%',cc:1,r:'50%',g:'radial-gradient(circle, transparent 30%, rgba(224,168,48,.55) 39%, rgba(224,168,48,.1) 47%, transparent 58%)'},
     {w:'40vmax',h:'40vmax',x:'50%',y:'50%',cc:1,r:'50%',g:'radial-gradient(circle, rgba(224,168,48,.25), transparent 60%)'}]},
12:{bg:'#f3e7e2',ink:'#3a2a28',mut:'rgba(58,42,40,.5)',acc:'#b65e4e',fop:.55,
 fx:[{w:'72vmax',h:'72vmax',x:'50%',y:'46%',cc:1,r:'50%',g:'radial-gradient(circle, rgba(182,94,78,.42), rgba(182,94,78,.1) 42%, transparent 66%)'}]},
13:{bg:'#efeadd',ink:'#322e26',mut:'rgba(50,46,38,.5)',acc:'#7d7257',fop:.55,
 fx:[{w:'110vmax',h:'60vmax',x:'-12%',y:'34%',r:'14%',g:'radial-gradient(ellipse, rgba(125,114,87,.34), transparent 72%)'},
     {w:'10vmax',h:'10vmax',x:'66%',y:'24%',r:'50%',g:'radial-gradient(circle, rgba(217,176,90,.7), transparent 60%)'}]},
14:{bg:'#e8e4da',ink:'#2e2b26',mut:'rgba(46,43,38,.5)',acc:'#8a8175',fop:.55,
 fx:[{w:'150vmax',h:'24vmax',x:'-20%',y:'10%',r:'50%',g:'radial-gradient(ellipse, rgba(222,205,150,.55), transparent 72%)'},
     {w:'150vmax',h:'24vmax',x:'-20%',y:'42%',r:'50%',g:'radial-gradient(ellipse, rgba(201,139,90,.45), transparent 72%)'},
     {w:'150vmax',h:'24vmax',x:'-20%',y:'74%',r:'50%',g:'radial-gradient(ellipse, rgba(74,68,62,.5), transparent 72%)'}]},
15:{bg:'#1e2a23',ink:'#e5e8dd',mut:'rgba(229,232,221,.5)',acc:'#c9a44a',fop:.55,
 fx:[{w:'60vmax',h:'90vmax',x:'24%',y:'-30%',r:'50%',g:'radial-gradient(ellipse at 50% 18%, rgba(201,164,74,.55), rgba(201,164,74,.12) 46%, transparent 70%)'}]},
16:{bg:'#ece7db',ink:'#2c2924',mut:'rgba(44,41,36,.5)',acc:'#6b6353',fop:.55,
 fx:[{w:'70vmax',h:'140vmax',x:'-16%',y:'-20%',r:'50%',g:'radial-gradient(ellipse, rgba(245,238,218,.85), transparent 70%)'},
     {w:'70vmax',h:'140vmax',x:'56%',y:'-20%',r:'50%',g:'radial-gradient(ellipse, rgba(72,66,58,.4), transparent 70%)'}]},
17:{bg:'#ece3d3',ink:'#322c24',mut:'rgba(50,44,36,.5)',acc:'#a4502e',fop:.55,
 fx:[{w:'24vmax',h:'24vmax',x:'50%',y:'14%',cc:1,r:'50%',g:'radial-gradient(circle, rgba(222,205,150,.6), transparent 62%)'},
     {w:'24vmax',h:'24vmax',x:'50%',y:'44%',cc:1,r:'50%',g:'radial-gradient(circle, rgba(164,80,46,.45), transparent 62%)'},
     {w:'24vmax',h:'24vmax',x:'50%',y:'74%',cc:1,r:'50%',g:'radial-gradient(circle, rgba(74,68,62,.45), transparent 62%)'}]},
18:{bg:'#faf6ec',ink:'#2b2722',mut:'rgba(43,39,34,.5)',acc:'#b08a32',fop:.6,
 fx:[{w:'160vmax',h:'8vmax',x:'-30%',y:'66%',r:'50%',g:'radial-gradient(ellipse, rgba(201,164,74,.65), rgba(201,164,74,.12) 55%, transparent 75%)'}]},
};

const DN='०१२३४५६७८९';
const dn=n=>String(n).split('').map(d=>DN[+d]??d).join('');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');

export async function mountGita(root){
  root.innerHTML=`
  <div id="bg"><div class="flayer" id="fA"><div class="fxwrap"></div></div><div class="flayer" id="fB"><div class="fxwrap"></div></div></div>
  <div id="grain"></div><div id="pbar"></div>
  <main id="feed" aria-label="Bhagavad Gita"></main>
  <button id="plabel" aria-label="open chapter index"></button>
  <div id="xp" aria-modal="true"><div class="handle"></div><div class="inner" id="xpinner"></div></div>
  <div id="ix"><div class="inner"><h3>अष्टादश अध्यायाः · eighteen chapters</h3><div id="ixrows"></div></div></div>
  <div id="veil"></div>`;
  const $=s=>root.querySelector(s);

  const META=await fetch('/data/index.json').then(r=>r.json());
  const chData=new Map(); // chapter -> verses[]
  const pending=new Map();
  function ensureChapter(c){
    if(chData.has(c))return Promise.resolve(chData.get(c));
    if(pending.has(c))return pending.get(c);
    const p=fetch(`/data/chapter-${String(c).padStart(2,'0')}.json`)
      .then(r=>r.json()).then(j=>{chData.set(c,j.verses);pending.delete(c);return j.verses});
    pending.set(c,p);return p;
  }

  const SEC=[];
  META.forEach(m=>{
    for(let i=0;i<m.verses_count;i++)SEC.push({t:'v',c:m.chapter,i,m});
    SEC.push({t:'ce',c:m.chapter,m});
  });
  SEC.push({t:'fin'});
  const N=SEC.length;
  const chStart={};META.forEach(m=>{chStart[m.chapter]=SEC.findIndex(s=>s.t==='v'&&s.c===m.chapter)});

  const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},
               set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
  let firstRun=!store.get('gita-pos');
  let readSet=new Set(JSON.parse(store.get('gita-read')||'[]'));

  const feed=$('#feed');
  feed.innerHTML=SEC.map((s,i)=>`<section class="s" data-i="${i}"></section>`).join('');
  const secEls=feed.children;

  function verseHTML(s,v){
    const sp=v.speaker?`<div class="speaker">${esc(v.speaker)}</div>`:'';
    const hint=(s.c===1&&v.verse===1&&firstRun)?`<div class="hint">tap the verse to unfold its meaning</div>`:'';
    return `<div class="card" data-act="open">
      <button class="ref" data-act="index">अध्याय ${dn(s.c)} · श्लोक ${dn(v.verse)}</button>
      ${sp}<div class="dev">${esc(v.devanagari)}</div>
      <div class="iast">${esc(v.transliteration)}</div>
      <div class="ess">${esc(v.essence)}</div></div>${hint}`;
  }
  function ceHTML(s){
    const m=s.m;
    const qs=m.reflections.map((q,i)=>`<div class="q"><b>${dn(i+1)}</b><span>${esc(q)}</span></div>`).join('');
    const nxt=s.c<18?`<div class="next">स्वस्ति · swipe up — अध्याय ${dn(s.c+1)}</div>`:`<div class="next">स्वस्ति · swipe up</div>`;
    return `<div class="ce"><div class="chno">॥ अध्याय ${dn(s.c)} सम्पूर्ण ॥</div>
      <h2>${esc(m.name)}</h2><div class="chmean">${esc(m.transliteration)} · ${esc(m.meaning)}</div>
      <div class="teach">${esc(m.teaching)}</div>${m.key_verses?`<div class="kv">सारश्लोकाः · ${esc(m.key_verses)}</div>`:''}<div class="rline"></div>${qs}${nxt}</div>`;
  }
  const finHTML=()=>`<div class="card colo"><div class="dev">॥ इति श्रीमद्भगवद्गीता ॥</div>
    <div class="sub">aṣṭādaśa adhyāyāḥ · sapta-śata ślokāḥ<br>hari oṁ tat sat</div></div>`;

  function fill(i){
    const el=secEls[i];if(!el||el.dataset.live)return;
    const s=SEC[i];
    if(s.t==='fin'){el.innerHTML=finHTML();el.dataset.live=1;return}
    if(s.t==='ce'){el.innerHTML=ceHTML(s);el.dataset.live=1;return}
    const vs=chData.get(s.c);
    if(vs){el.innerHTML=verseHTML(s,vs[s.i]);el.dataset.live=1}
    else{
      el.innerHTML=`<div class="card"><div class="ref">अध्याय ${dn(s.c)} · श्लोक ${dn(s.i+1)}</div><div class="iast">…</div></div>`;
      el.dataset.live=1;el.dataset.stub=1;
      ensureChapter(s.c).then(()=>{if(el.dataset.stub){delete el.dataset.live;delete el.dataset.stub;if(live.has(i))fill(i)}});
    }
  }
  function clearSec(i){const el=secEls[i];if(el&&el.dataset.live){el.innerHTML='';delete el.dataset.live;delete el.dataset.stub}}
  const live=new Set();
  function windowAt(i){
    const lo=Math.max(0,i-6),hi=Math.min(N-1,i+6);
    for(const j of [...live])if(j<lo||j>hi){clearSec(j);live.delete(j)}
    for(let j=lo;j<=hi;j++)if(!live.has(j)){fill(j);live.add(j)}
  }

  const bg=$('#bg'),layers=[$('#fA'),$('#fB')];let activeL=0,curCh=0;
  const formHTML=p=>p.fx.map(f=>{
    const tx=f.cc?'translate(-50%,-50%)':'';const rot=f.rot?` rotate(${f.rot})`:'';
    return `<div class="fx" style="width:${f.w};height:${f.h};left:${f.x};top:${f.y};border-radius:${f.r};background:${f.g};transform:${tx}${rot}"></div>`}).join('');
  function paletteTo(c,instant){
    if(c===curCh)return;curCh=c;
    const p=PAL[c],r=document.documentElement.style;
    r.setProperty('--bg',p.bg);r.setProperty('--ink',p.ink);r.setProperty('--mut',p.mut);
    r.setProperty('--acc',p.acc);r.setProperty('--fop',p.fop);
    document.querySelector('meta[name=theme-color]')?.setAttribute('content',p.bg);
    const nxt=layers[1-activeL],cur=layers[activeL];
    nxt.querySelector('.fxwrap').innerHTML=formHTML(p);
    nxt.classList.add('on');cur.classList.remove('on');activeL=1-activeL;
  }

  let idx=-1,H=feed.clientHeight;
  const chProgress=s=>s.t==='v'?(s.i+1)/s.m.verses_count:1;
  const labelFor=s=>s.t==='fin'?'॥ ॐ तत्सत् ॥':s.t==='ce'?`अध्याय ${dn(s.c)} · सम्पूर्ण`:`अध्याय ${dn(s.c)} · श्लोक ${dn(s.i+1)} / ${dn(s.m.verses_count)}`;
  function setIdx(i,save=true){
    if(i===idx||i<0||i>=N||Number.isNaN(i))return;
    idx=i;const s=SEC[i];
    windowAt(i);
    paletteTo(s.t==='fin'?18:s.c);
    bg.classList.toggle('resolved',s.t==='ce'||s.t==='fin');
    $('#pbar').style.width=(chProgress(s)*100)+'%';
    $('#plabel').textContent=labelFor(s);
    if(s.t==='ce'&&!readSet.has(s.c)){readSet.add(s.c);store.set('gita-read',JSON.stringify([...readSet]))}
    if(save)store.set('gita-pos',JSON.stringify({i}));
  }

  let raf=0;
  feed.addEventListener('scroll',()=>{
    if(raf)return;
    raf=requestAnimationFrame(()=>{
      raf=0;if(!H){H=feed.clientHeight;if(!H)return}
      const t=feed.scrollTop,i=Math.round(t/H);
      setIdx(i);
      const s=SEC[Math.min(Math.max(i,0),N-1)];
      if(s&&s.t==='v'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
        const f=((t/H)-chStart[s.c])/s.m.verses_count;
        const w=layers[activeL].querySelector('.fxwrap');
        if(w)w.style.transform=`translateY(${(f-.5)*4}%) rotate(${(f-.5)*2}deg)`;
      }
    });
  });
  addEventListener('resize',()=>{H=feed.clientHeight;feed.scrollTop=idx*H});

  const xp=$('#xp'),xpinner=$('#xpinner');let xpOpen=false;
  async function openXP(s,x,y){
    const vs=await ensureChapter(s.c);const v=vs[s.i];
    let h=`<button class="ref">अध्याय ${dn(s.c)} · श्लोक ${dn(v.verse)}</button>`;
    if(v.speaker)h+=`<div class="speaker">${esc(v.speaker)}</div>`;
    h+=`<div class="dev">${esc(v.devanagari)}</div><div class="iast">${esc(v.transliteration)}</div>`;
    h+=`<div class="xsec"><div class="xlab">अनुवाद · translation</div><div class="xbody">${esc(v.translation)}</div></div>`;
    if(v.anvaya)h+=`<div class="xsec"><div class="xlab">अन्वय · word by word</div><table class="anv">`+
      v.anvaya.map(a=>`<tr><td>${esc(a.word)}</td><td>${esc(a.meaning)}</td></tr>`).join('')+`</table></div>`;
    if(v.explanation)h+=`<div class="xsec"><div class="xlab">व्याख्या · the teaching</div><div class="xbody">${esc(v.explanation)}</div></div>`;
    if(v.connection)h+=`<div class="xsec"><div class="xlab">सम्बन्ध · the thread</div><div class="xnote">${esc(v.connection)}</div></div>`;
    if(v.schools_note)h+=`<div class="xsec"><div class="xlab">दृष्टिभेद · ways of seeing</div><div class="xnote">${esc(v.schools_note)}</div></div>`;
    if(v.reflection)h+=`<div class="xsec"><div class="xlab">भावना · take it inward</div><div class="xnote bh">${esc(v.reflection)}</div></div>`;
    if(v.background)h+=`<div class="xsec"><div class="xlab">प्रसङ्ग · the background</div><div class="xnote">${esc(v.background)}</div></div>`;
    h+=`<div class="xend">॥</div>`;
    xpinner.innerHTML=h;
    xp.style.setProperty('--cx',x+'px');xp.style.setProperty('--cy',y+'px');
    xp.scrollTop=0;xp.classList.add('show');xpOpen=true;
    requestAnimationFrame(()=>requestAnimationFrame(()=>xp.classList.add('open')));
  }
  function closeXP(){if(!xpOpen)return;xpOpen=false;xp.classList.remove('open');
    setTimeout(()=>{if(!xpOpen)xp.classList.remove('show')},620)}
  let xtY=0,xtS=0,xMoved=false;
  xp.addEventListener('touchstart',e=>{xtY=e.touches[0].clientY;xtS=xp.scrollTop;xMoved=false},{passive:true});
  xp.addEventListener('touchmove',e=>{const dy=e.touches[0].clientY-xtY;
    if(Math.abs(dy)>8)xMoved=true;if(xtS<=0&&dy>72)closeXP()},{passive:true});
  xp.addEventListener('click',()=>{if(!xMoved)closeXP()});

  const ix=$('#ix'),ixrows=$('#ixrows');let ixOpen=false;
  function renderIX(){
    const curC=SEC[idx]?.c||1;
    ixrows.innerHTML=META.map(m=>`
      <button class="ixrow ${m.chapter===curC?'cur':''}" data-c="${m.chapter}">
        <span class="no">${dn(m.chapter)}</span>
        <span class="nm">${esc(m.name)}<small>${esc(m.meaning)} · ${dn(m.verses_count)} श्लोकाः</small></span>
        <span class="dot ${readSet.has(m.chapter)?'read':''}"></span></button>`).join('');
  }
  function openIX(){renderIX();ix.classList.add('show');ixOpen=true;
    requestAnimationFrame(()=>requestAnimationFrame(()=>ix.classList.add('open')))}
  function closeIX(){if(!ixOpen)return;ixOpen=false;ix.classList.remove('open');
    setTimeout(()=>{if(!ixOpen)ix.classList.remove('show')},420)}
  ix.addEventListener('click',e=>{
    const r=e.target.closest('.ixrow');
    if(!r){closeIX();return}
    closeIX();jumpTo(chStart[+r.dataset.c]);
  });
  function jumpTo(i){
    const veil=$('#veil');veil.classList.add('on');
    setTimeout(()=>{feed.scrollTop=i*H;setIdx(i);
      setTimeout(()=>veil.classList.remove('on'),120)},360);
  }

  feed.addEventListener('click',e=>{
    const act=e.target.closest('[data-act]');if(!act)return;
    if(act.dataset.act==='index'){e.stopPropagation();openIX();return}
    if(act.dataset.act==='open'){
      const sec=e.target.closest('section.s');
      const s=SEC[+(sec?sec.dataset.i:idx)];
      if(s&&s.t==='v')openXP(s,e.clientX,e.clientY);
    }
  });
  $('#plabel').addEventListener('click',openIX);
  addEventListener('keydown',e=>{
    if(e.key==='Escape'){closeXP();closeIX();return}
    if(xpOpen||ixOpen)return;
    if(['ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();feed.scrollTo({top:(idx+1)*H,behavior:'smooth'})}
    if(['ArrowUp','PageUp'].includes(e.key)){e.preventDefault();feed.scrollTo({top:(idx-1)*H,behavior:'smooth'})}
    if(e.key==='Enter'){const s=SEC[idx];if(s&&s.t==='v')openXP(s,innerWidth/2,innerHeight/2)}
  });

  let start=0;
  try{const p=JSON.parse(store.get('gita-pos'));if(p&&p.i>=0&&p.i<N)start=p.i}catch(e){}
  const s0=SEC[start];
  await ensureChapter(s0.t==='fin'?18:s0.c);
  H=feed.clientHeight;
  paletteTo(s0.t==='fin'?18:s0.c,true);
  setIdx(start,false);
  if(start>0)feed.scrollTop=start*H;
}
