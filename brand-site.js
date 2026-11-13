document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{const dialog=document.querySelector('.lightbox');if(!dialog)return;const image=dialog.querySelector('img');image.src=button.dataset.lightbox;image.alt=button.querySelector('img')?.alt||'Работа';dialog.classList.add('open');dialog.setAttribute('aria-hidden','false');dialog.querySelector('button').focus()}));
const close=()=>{const dialog=document.querySelector('.lightbox');if(!dialog)return;dialog.classList.remove('open');dialog.setAttribute('aria-hidden','true');dialog.querySelector('img').removeAttribute('src')};
document.querySelector('.lightbox button')?.addEventListener('click',close);
document.querySelector('.lightbox')?.addEventListener('click',event=>{if(event.target.classList.contains('lightbox'))close()});
document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});


// Gentle reading-speed highlight in the About section. Original text remains
// available to assistive technology; the visual characters are decorative.
(()=>{
  const root=document.querySelector('.about-copy');
  if(!root||!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const paragraphs=[...root.querySelectorAll(':scope > p')];
  if(!paragraphs.length)return;
  const steps=[];
  const pause=12; // ~1.1s between paragraphs at 90ms per step
  paragraphs.forEach((paragraph,pi)=>{
    const original=paragraph.textContent;
    paragraph.setAttribute('aria-label',original);
    function splitText(node){
      const holder=document.createDocumentFragment();
      const parts=node.nodeValue.match(/\s+|[^\s]+/gu)||[];
      for(const part of parts){
        if(/^\s+$/u.test(part)){holder.append(document.createTextNode(part));continue}
        const word=document.createElement('span');word.className='reading-word';
        for(const character of [...part]){
          const letter=document.createElement('span');
          letter.className='reading-char';
          letter.textContent=character;
          word.append(letter);
          steps.push(letter);
        }
        holder.append(word);
      }
      node.replaceWith(holder);
    }
    function descend(el){
      for(const child of [...el.childNodes]){
        if(child.nodeType===Node.TEXT_NODE)splitText(child);
        else if(child.nodeType===Node.ELEMENT_NODE)descend(child);
      }
    }
    descend(paragraph);
    paragraph.querySelectorAll('.reading-word').forEach(word=>word.setAttribute('aria-hidden','true'));
    if(pi<paragraphs.length-1)for(let i=0;i<pause;i++)steps.push(null);
  });
  let position=0,visible=false,ticker=null,previous=[];
  const radius=5;
  function tick(){
    for(const letter of previous)letter.classList.remove('reading-lit');
    previous=[];
    for(let delta=-radius;delta<=radius;delta++){
      const letter=steps[(position+delta)%steps.length];
      if(letter){letter.classList.add('reading-lit');previous.push(letter)}
    }
    position=(position+1)%steps.length;
  }
  const observer=new IntersectionObserver(entries=>{
    visible=entries[0].isIntersecting;
    if(visible&&!ticker){tick();ticker=window.setInterval(tick,90)}
    else if(!visible&&ticker){window.clearInterval(ticker);ticker=null;previous.forEach(letter=>letter.classList.remove('reading-lit'));previous=[]}
  },{threshold:0.08});
  observer.observe(root);
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  motion.addEventListener?.('change',event=>{
    if(event.matches){if(ticker)window.clearInterval(ticker);ticker=null;observer.disconnect();previous.forEach(letter=>letter.classList.remove('reading-lit'))}
  });
})();


// Informational privacy notice: no consent is requested or implied.
(()=>{
  const key='portfolio-privacy-notice-dismissed-v1';
  try{if(window.localStorage.getItem(key)==='1')return}catch(_error){}
  const notice=document.createElement('aside');
  notice.className='privacy-notice';
  const t=window.PORTFOLIO_I18N?.notice||{title:'Привет! Хорошего дня.',body:'Мы не используем cookies для рекламы и отслеживания посетителей.',policy:'Политика конфиденциальности',ok:'Понятно, спасибо!',close:'Закрыть уведомление',label:'Информация о конфиденциальности'};
  notice.setAttribute('aria-label',t.label);
  notice.innerHTML='<div class="privacy-notice-icon" aria-hidden="true">🍪</div><div class="privacy-notice-copy"><strong></strong><p></p><a href="privacy.html"></a></div><button class="privacy-notice-close" type="button">×</button><button class="privacy-notice-ok" type="button"></button>';
  notice.querySelector('strong').textContent=t.title;
  notice.querySelector('p').textContent=t.body;
  notice.querySelector('a').textContent=t.policy;
  notice.querySelector('.privacy-notice-close').setAttribute('aria-label',t.close);
  notice.querySelector('.privacy-notice-ok').textContent=t.ok;
  const dismiss=()=>{
    notice.classList.remove('privacy-notice-visible');
    try{window.localStorage.setItem(key,'1')}catch(_error){}
    window.setTimeout(()=>notice.remove(),350);
  };
  notice.querySelector('.privacy-notice-close').addEventListener('click',dismiss);
  notice.querySelector('.privacy-notice-ok').addEventListener('click',dismiss);
  document.body.append(notice);
  window.requestAnimationFrame(()=>window.requestAnimationFrame(()=>notice.classList.add('privacy-notice-visible')));
})();


// Flag-only language picker; language switching is active on the homepage.
(()=>{
  const root=document.querySelector('.language-switcher');
  if(!root)return;
  const trigger=root.querySelector('.language-trigger');
  const menu=root.querySelector('.language-menu');
  const setOpen=open=>{menu.hidden=!open;trigger.setAttribute('aria-expanded',String(open))};
  trigger.addEventListener('click',event=>{event.stopPropagation();setOpen(menu.hidden)});
  menu.addEventListener('click',event=>{const button=event.target.closest('[data-lang]');if(!button)return;setOpen(false);if(window.PORTFOLIO_I18N?.localizedPage)window.PORTFOLIO_I18N.choose(button.dataset.lang)});
  document.addEventListener('click',event=>{if(!root.contains(event.target))setOpen(false)});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){setOpen(false);trigger.focus()}});
})();


// Fixed scroll-to-top control, shared across every portfolio page.
(()=>{
  const button=document.createElement('button');
  button.type='button';
  button.className='scroll-to-top';
  button.setAttribute('aria-label',({ru:'Наверх',en:'Back to top',ka:'ზემოთ დაბრუნება'})[document.documentElement.lang]||'Back to top');
  button.setAttribute('title',button.getAttribute('aria-label'));
  button.innerHTML='<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 14 7-7 7 7"/></svg>';
  const update=()=>{const visible=window.scrollY>320;button.classList.toggle('is-visible',visible);button.tabIndex=visible?0:-1;button.setAttribute('aria-hidden',String(!visible));};
  button.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
  window.addEventListener('scroll',update,{passive:true});
  document.body.append(button);
  update();
})();
