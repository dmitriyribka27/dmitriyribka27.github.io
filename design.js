(() => {
 'use strict';
 const track=document.querySelector('#design-track');
 if(!track)return;
 const cards=[...track.querySelectorAll('.design-case')];
 const desktop=window.matchMedia('(min-width:768px)');
 const reduced=window.matchMedia('(prefers-reduced-motion:reduce)');
 // Mobile-only case reveals. Desktop always displays the complete vertical gallery.
 if('IntersectionObserver' in window && !reduced.matches){
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
   }
  },{threshold:0.08,rootMargin:'0px 0px 35px 0px'});
  cards.forEach(card=>observer.observe(card));
  track.classList.add('design-motion-ready');
  const revealAll=()=>{if(desktop.matches){cards.forEach(card=>card.classList.add('is-visible'));observer.disconnect()}};
  desktop.addEventListener?.('change',revealAll);
  revealAll();
 }
})();
