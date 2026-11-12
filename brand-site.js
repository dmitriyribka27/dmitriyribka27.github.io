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
