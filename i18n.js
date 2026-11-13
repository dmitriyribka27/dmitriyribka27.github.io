// Homepage localization. Other pages stay Russian until their complete dictionaries are ready.
(()=>{
'use strict';
const supported=['ru','en','ka'];
const key='portfolio-language-v1';
const isHome=location.pathname==='/'||/\/(?:index\.html)?$/.test(location.pathname);
const isDesign=/\/design\.html$/.test(location.pathname);
const isDigital=/\/digital\.html$/.test(location.pathname);
const localizedPage=isHome||isDesign||isDigital;
let preferred='ru';
try{const saved=localStorage.getItem(key);if(supported.includes(saved))preferred=saved}catch(_e){}
const active=localizedPage?preferred:'ru';
const dict=window.PORTFOLIO_LOCALES?.[active]||window.PORTFOLIO_LOCALES?.ru;
if(!dict)return;
window.PORTFOLIO_I18N={language:active,preferred,notice:dict.notice,isDesign,isDigital,localizedPage,choose(lang){if(!supported.includes(lang))return;try{localStorage.setItem(key,lang)}catch(_e){}if(localizedPage)location.reload()},isHome};
document.documentElement.lang=active;
if(isHome||isDesign||isDigital){
 const root=document.querySelector('main');
 if(root){const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);for(const node of nodes){const raw=node.nodeValue;const trimmed=raw.trim();const translated=(isDesign?dict.design?.[trimmed]??dict.home?.[trimmed]:isDigital?dict.digital?.[trimmed]??dict.home?.[trimmed]:dict.home?.[trimmed]);if(translated!==undefined&&translated!==trimmed)node.nodeValue=raw.replace(trimmed,translated)}}
 document.querySelectorAll('.nav a,.footer a,.footer span').forEach(el=>{const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{const t=n.nodeValue.trim();if(dict.home[t]&&dict.home[t]!==t)n.nodeValue=n.nodeValue.replace(t,dict.home[t])})});
 document.title=isDesign?dict.designMeta.title:isDigital?dict.digitalMeta.title:dict.meta.title;
 const description=document.querySelector('meta[name="description"]');if(description)description.content=isDesign?dict.designMeta.description:isDigital?dict.digitalMeta.description:dict.meta.description;
 if(isDesign||isDigital){document.querySelectorAll('[aria-label],[alt]').forEach(el=>{for(const attr of ['aria-label','alt','title']){const value=el.getAttribute(attr);const translated=(isDesign?dict.designAttrs?.[value]:dict.digital?.[value])??dict.sharedAttrs?.[value];if(value&&translated)el.setAttribute(attr,translated)}})}
 else {const portrait=document.querySelector('.about-picture img');if(portrait)portrait.alt=dict.meta.alt;}
}
if(isDigital&&active!=='ru'){
 const translations=dict.digital||{};
 const translate=(root)=>{if(!root)return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);for(const node of nodes){const raw=node.nodeValue;const key=raw.trim();const target=translations[key]??dict.home?.[key];if(target!==undefined&&target!==key)node.nodeValue=raw.replace(key,target)}root.querySelectorAll?.('[aria-label],[alt],[title]').forEach(el=>{for(const attr of ['aria-label','alt','title']){const value=el.getAttribute(attr);const target=translations[value];if(target)el.setAttribute(attr,target)}})};
 const stage=document.getElementById('project-stage');
 if(stage){const observer=new MutationObserver(records=>{for(const r of records){for(const n of r.addedNodes){if(n.nodeType===1)translate(n)}}});observer.observe(stage,{childList:true,subtree:true});}
}
const flags={ru:'🇷🇺',en:'🇺🇸',ka:'🇬🇪'};
const root=document.querySelector('.language-switcher');
if(root){const flag=root.querySelector('.language-trigger-flag');if(flag)flag.textContent=flags[active];const trigger=root.querySelector('.language-trigger');if(trigger)trigger.setAttribute('aria-label',dict.notice.pick);
 const menuLabel=root.querySelector('.language-menu');if(menuLabel)menuLabel.setAttribute('aria-label',active==='en'?'Other languages':active==='ka'?'სხვა ენები':'Другие языки');
 const menu=root.querySelector('.language-menu');if(menu){menu.innerHTML='';for(const lang of supported.filter(x=>x!==active)){
 const button=document.createElement('button');button.type='button';button.className='language-option';button.dataset.lang=lang;button.setAttribute('aria-label',lang==='en'?'English':lang==='ka'?'ქართული':'Русский');const span=document.createElement('span');span.setAttribute('aria-hidden','true');span.textContent=flags[lang];button.append(span);menu.append(button)} }
}
})();
