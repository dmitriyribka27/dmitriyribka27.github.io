// Privacy page: preserve language selection and navigate between translated legal texts.
(()=>{
const pages={ru:'privacy.html',en:'privacy-en.html',ka:'privacy-ka.html'};
const current=location.pathname.endsWith('privacy-en.html')?'en':location.pathname.endsWith('privacy-ka.html')?'ka':'ru';
let preferred=current;
try{preferred=localStorage.getItem('portfolio-language-v1')||current}catch(_){}
if(current==='ru'&&pages[preferred]&&preferred!=='ru'){location.replace(pages[preferred]);return;}
document.querySelectorAll('.language-option').forEach(button=>{
button.addEventListener('click',()=>{const lang=button.dataset.lang;if(!pages[lang])return;try{localStorage.setItem('portfolio-language-v1',lang)}catch(_){}location.href=pages[lang];});
});
const trigger=document.querySelector('.language-trigger');
if(trigger)trigger.addEventListener('click',()=>{const menu=document.getElementById('site-language-menu');if(menu)menu.hidden=!menu.hidden;});
})();
