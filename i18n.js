// Homepage localization. Other pages stay Russian until their complete dictionaries are ready.
(()=>{
'use strict';
const supported=['ru','en','ka'];
const key='portfolio-language-v1';
const isHome=location.pathname==='/'||/\/(?:index\.html)?$/.test(location.pathname);
let preferred='ru';
try{const saved=localStorage.getItem(key);if(supported.includes(saved))preferred=saved}catch(_e){}
const active=isHome?preferred:'ru';
const dict=window.PORTFOLIO_LOCALES?.[active]||window.PORTFOLIO_LOCALES?.ru;
if(!dict)return;
window.PORTFOLIO_I18N={language:active,preferred,notice:dict.notice,choose(lang){if(!supported.includes(lang))return;try{localStorage.setItem(key,lang)}catch(_e){}if(isHome)location.reload();else location.assign('index.html')},isHome};
document.documentElement.lang=active;
if(isHome){
 const root=document.querySelector('main');
 if(root){const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);for(const node of nodes){const raw=node.nodeValue;const trimmed=raw.trim();const translated=dict.home[trimmed];if(translated!==undefined&&translated!==trimmed)node.nodeValue=raw.replace(trimmed,translated)}}
 document.querySelectorAll('.nav a,.footer a,.footer span').forEach(el=>{const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{const t=n.nodeValue.trim();if(dict.home[t]&&dict.home[t]!==t)n.nodeValue=n.nodeValue.replace(t,dict.home[t])})});
 document.title=dict.meta.title;
 const description=document.querySelector('meta[name="description"]');if(description)description.content=dict.meta.description;
 const portrait=document.querySelector('.about-picture img');if(portrait)portrait.alt=dict.meta.alt;
}
const flags={ru:'🇷🇺',en:'🇺🇸',ka:'🇬🇪'};
const root=document.querySelector('.language-switcher');
if(root){const flag=root.querySelector('.language-trigger-flag');if(flag)flag.textContent=flags[active];const trigger=root.querySelector('.language-trigger');if(trigger)trigger.setAttribute('aria-label',dict.notice.pick);
 const menu=root.querySelector('.language-menu');if(menu){menu.innerHTML='';for(const lang of supported.filter(x=>x!==active)){
 const button=document.createElement('button');button.type='button';button.className='language-option';button.dataset.lang=lang;button.setAttribute('aria-label',lang==='en'?'English':lang==='ka'?'ქართული':'Русский');const span=document.createElement('span');span.setAttribute('aria-hidden','true');span.textContent=flags[lang];button.append(span);menu.append(button)} }
}
})();
