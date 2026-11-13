// Privacy page language navigation. brand-site.js owns menu open/close.
(()=>{
'use strict';
const pages={ru:'privacy.html',en:'privacy-en.html',ka:'privacy-ka.html'};
const flags={ru:'🇷🇺',en:'🇺🇸',ka:'🇬🇪'};
const labels={ru:'Русский',en:'English',ka:'ქართული'};
const current=location.pathname.endsWith('privacy-en.html')?'en':location.pathname.endsWith('privacy-ka.html')?'ka':'ru';
let preferred=current;
try{preferred=localStorage.getItem('portfolio-language-v1')||current}catch(_){}
if(current==='ru'&&pages[preferred]&&preferred!=='ru'){location.replace(pages[preferred]);return;}
const root=document.querySelector('.language-switcher');
if(!root)return;
const menu=root.querySelector('.language-menu');
const flag=root.querySelector('.language-trigger-flag');
if(flag)flag.textContent=flags[current];
if(menu){
menu.replaceChildren();
for(const lang of Object.keys(pages)){
if(lang===current)continue;
const button=document.createElement('button');
button.className='language-option';
button.type='button';
button.dataset.lang=lang;
button.setAttribute('aria-label',labels[lang]);
button.title=labels[lang];
const span=document.createElement('span');
span.setAttribute('aria-hidden','true');
span.textContent=flags[lang];
button.append(span);
menu.append(button);
}
menu.addEventListener('click',event=>{
const button=event.target.closest('[data-lang]');
if(!button)return;
const lang=button.dataset.lang;
if(!pages[lang])return;
try{localStorage.setItem('portfolio-language-v1',lang)}catch(_){}
location.href=pages[lang];
});
}
})();