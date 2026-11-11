document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{const dialog=document.querySelector('.lightbox');if(!dialog)return;const image=dialog.querySelector('img');image.src=button.dataset.lightbox;image.alt=button.querySelector('img')?.alt||'Работа';dialog.classList.add('open');dialog.setAttribute('aria-hidden','false');dialog.querySelector('button').focus()}));
const close=()=>{const dialog=document.querySelector('.lightbox');if(!dialog)return;dialog.classList.remove('open');dialog.setAttribute('aria-hidden','true');dialog.querySelector('img').removeAttribute('src')};
document.querySelector('.lightbox button')?.addEventListener('click',close);
document.querySelector('.lightbox')?.addEventListener('click',event=>{if(event.target.classList.contains('lightbox'))close()});
document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
