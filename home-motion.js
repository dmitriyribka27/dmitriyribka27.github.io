(()=>{'use strict';
const motion=matchMedia('(prefers-reduced-motion: reduce)');
if(motion.matches||!('IntersectionObserver' in window)||!Element.prototype.animate)return;
const running=new Set();
const play=(el,delay=0,y=20,scale=1)=>{const a=el.animate([{opacity:0,transform:'translateY('+y+'px) scale('+scale+')'},{opacity:1,transform:'none'}],{duration:550,delay,easing:'cubic-bezier(.22,.61,.36,1)',fill:'backwards'});running.add(a);a.onfinish=a.oncancel=()=>running.delete(a)};
const hero=document.querySelector('.hero h1');
if(hero){for(const node of [...hero.childNodes]){if(node.nodeType===3&&node.textContent.trim()){const span=document.createElement('span');span.textContent=node.textContent;span.style.display='inline-block';node.replaceWith(span)}}[...hero.children].filter(x=>x.tagName!=='BR').forEach((el,i)=>{el.style.display='inline-block';play(el,70+i*90,16)})}
document.querySelectorAll('.header .wordmark,.header .nav,.header .language-switcher').forEach((el,i)=>play(el,i*70,6));
document.querySelectorAll('.hero-desc,.hero .actions,.hero-pricing,.hero-foot').forEach((el,i)=>play(el,300+i*80,14));
const groups=[['.section-top',0],['.section-head',0],['.service-list .service',80],['.work-grid .work-card',90],['.about-picture,.about-copy',80],['.steps li',80],['.contact-panel',0]];
const delays=new Map();
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const el=entry.target;observer.unobserve(el);play(el,delays.get(el)||0,el.matches('.work-card')?12:22,el.matches('.work-card')?.97:1)}},{threshold:0.08});
for(const [selector,step] of groups){document.querySelectorAll(selector).forEach((el,i)=>{delays.set(el,Math.min(i*step,240));observer.observe(el)})}
const stop=()=>{observer.disconnect();for(const a of running)a.cancel();running.clear()};
if(motion.addEventListener)motion.addEventListener('change',e=>{if(e.matches)stop()});else if(motion.addListener)motion.addListener(e=>{if(e.matches)stop()});
})();