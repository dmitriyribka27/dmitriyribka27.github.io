(() => {
 const track=document.querySelector('#design-track');
 if(!track)return;
 const cards=[...track.querySelectorAll('.design-case')];
 const prev=document.querySelector('#design-prev');
 const next=document.querySelector('#design-next');
 const current=document.querySelector('#design-current');
 const progress=document.querySelector('.design-progress');
 const fill=document.querySelector('#design-progress-fill');
 const desktop=window.matchMedia('(min-width:768px)');
 const reduced=window.matchMedia('(prefers-reduced-motion:reduce)');
 // Reveal cards only on mobile; keep them visible if observation is unsupported.
 if('IntersectionObserver' in window && !reduced.matches){
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
   }
  },{threshold:0.08,rootMargin:'0px 0px 35px 0px'});
  cards.forEach(card=>observer.observe(card));
  track.classList.add('design-motion-ready');
  // Desktop cards must never be hidden when switching from a narrow viewport.
  const revealAll=()=>{if(desktop.matches){cards.forEach(card=>card.classList.add('is-visible'));observer.disconnect()}};
  desktop.addEventListener?.('change',revealAll);
  revealAll();
 }
 const selected=()=>{const left=track.scrollLeft;let index=0;let distance=Infinity;cards.forEach((card,i)=>{const delta=Math.abs(card.offsetLeft-cards[0].offsetLeft-left);if(delta<distance){index=i;distance=delta}});return index};
 const update=()=>{const i=selected();current.textContent=String(i+1).padStart(2,'0');progress.setAttribute('aria-valuenow',String(i+1));fill.style.width=((i+1)/cards.length*100)+'%';prev.disabled=i===0;next.disabled=i===cards.length-1};
 const go=(i)=>{const target=cards[Math.max(0,Math.min(cards.length-1,i))];track.scrollTo({left:target.offsetLeft-cards[0].offsetLeft,behavior:reduced.matches?'instant':'smooth'});};
 prev.addEventListener('click',()=>go(selected()-1));
 next.addEventListener('click',()=>go(selected()+1));
 track.addEventListener('keydown',e=>{if(!desktop.matches)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(selected()+(e.key==='ArrowRight'?1:-1));}});
 track.addEventListener('wheel',e=>{if(!desktop.matches)return;const delta=Math.abs(e.deltaY)>Math.abs(e.deltaX)?e.deltaY:e.deltaX;const max=track.scrollWidth-track.clientWidth;if((delta>0&&track.scrollLeft>=max-2)||(delta<0&&track.scrollLeft<=2))return;if(e.cancelable)e.preventDefault();track.scrollLeft+=delta;},{passive:false});
 let pointer=null;
 track.addEventListener('pointerdown',e=>{if(!desktop.matches||e.pointerType==='touch'||e.button!==0)return;pointer={x:e.clientX,left:track.scrollLeft,moved:false};});
 track.addEventListener('pointermove',e=>{if(!pointer)return;const d=e.clientX-pointer.x;if(Math.abs(d)>6){pointer.moved=true;track.scrollLeft=pointer.left-d;}});
 const clear=()=>{pointer=null};
 track.addEventListener('pointerup',clear);track.addEventListener('pointercancel',clear);track.addEventListener('pointerleave',clear);
 let queued=false;track.addEventListener('scroll',()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;update()})},{passive:true});
 window.addEventListener('resize',update);
 update();
})();