(() => {
'use strict';
const data = window.DIGITAL_PROJECTS;
const ids = ['doit','ops','mono','kadr','bay'];
const stage = document.getElementById('project-stage');
const tabs = [...document.querySelectorAll('#project-tabs [role="tab"]')];
const panels = ids.map(id => document.getElementById('panel-' + id));
if (!data || !stage || panels.some(x => !x)) return;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const escapeHtml = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const title = (text,tag='h3') => '<'+tag+'>'+escapeHtml(text)+'</'+tag+'>';
const chips = items => '<div class="tech-chips">'+items.map(x=>'<span>'+escapeHtml(x)+'</span>').join('')+'</div>';
const feature = f => '<article class="feature-item"><span class="feature-icon" aria-hidden="true">'+escapeHtml(f.icon)+'</span><h4>'+escapeHtml(f.title)+'</h4><p>'+escapeHtml(f.text)+'</p></article>';
const workflow = list => '<div class="workflow">'+list.map(x=>'<div><strong>'+escapeHtml(x.title)+'</strong><span>'+escapeHtml(x.text)+'</span></div>').join('')+'</div>';
function demo(obj){
const rows = obj.rows || [];
return '<div class="device-demo" role="img" aria-label="'+escapeHtml(obj.label||'Схематичная иллюстрация интерфейса')+'"><div class="demo-dots"><i></i><i></i><i></i></div><h5>'+escapeHtml(obj.heading||'Приложение')+'</h5><div class="demo-label">Обзор</div><div class="demo-line short"></div>'+rows.map((x,i)=>'<div class="demo-card '+(i===1?'highlight':'')+'">'+escapeHtml(x)+'</div>').join('')+'<div class="demo-bottom"></div></div>';
}
function mediaCard(obj){
if(obj.kind==='image'&&obj.src){
 const alt=escapeHtml(obj.title);
 return '<button class="media-box" type="button" data-preview="'+escapeHtml(obj.src)+'" aria-label="Увеличить: '+alt+'"><img src="'+escapeHtml(obj.src)+'" alt="'+alt+'" loading="lazy"><span class="media-caption">'+alt+'</span><span class="media-disclaimer">'+escapeHtml(obj.detail||'')+'</span></button>';
}
return '<figure class="media-box"><div class="visual-stage">'+demo({heading:obj.heading,rows:obj.rows,label:obj.detail})+'</div><figcaption>'+escapeHtml(obj.title)+'<span class="media-disclaimer">'+escapeHtml(obj.detail||'Иллюстрация, не скриншот')+'</span></figcaption></figure>';
}
function highlighted(source){
 // The code comes from a local checked-in source file; escape before syntax markup.
 const pattern=/(\b(?:const|await|if|throw|return)\b|\b(?:extractCommandActions|Error)\b|'[^']*')/g;
 return source.split(pattern).map(part=>{
 const escaped=escapeHtml(part);
 if(/^(const|await|if|throw|return)$/.test(part))return '<span class="kw">'+escaped+'</span>';
 if(/^(extractCommandActions|Error)$/.test(part))return '<span class="fn">'+escaped+'</span>';
 if(part.startsWith("'"))return '<span class="str">'+escaped+'</span>';
 return escaped;
 }).join('');
}
function render(project,id){
 const visual=project.visual?.type==='image'
   ?'<img src="'+escapeHtml(project.visual.src)+'" alt="'+escapeHtml(project.visual.alt)+'" loading="eager">'
   :demo(project.visual||{});
 const note=project.visual?.label?'<span class="visual-note">'+escapeHtml(project.visual.label)+'</span>':'';
 const media=project.media?.length?'<section class="project-block"><div class="block-lead"><div>'+title('Экраны и интерфейс')+'</div><p>Посмотрите, как устроены основные разделы проекта.</p></div><div class="media-grid">'+project.media.map(mediaCard).join('')+'</div></section>':'';
 const code=project.code?'<section class="project-block"><div class="block-lead"><div>'+title('Фрагмент реализации')+'</div><p>Пример из исходного кода проекта.</p></div><div class="code-card"><div class="code-card-head">'+escapeHtml(project.codeTitle)+'</div><pre tabindex="0" aria-label="Фрагмент исходного кода"><code>'+highlighted(project.code)+'</code></pre></div><p class="note-line">'+escapeHtml(project.codeNote||'')+'</p></section>':'';
 const additional=project.extra?'<div class="additional-project"><strong>'+escapeHtml(project.extra.title)+'</strong><p>'+escapeHtml(project.extra.text)+'</p></div>':'';
 const html='<div class="presentation"><section class="project-hero"><div><p class="hero-role">'+escapeHtml(project.role)+'</p>'+title(project.title,'h2')+'<p class="lede">'+escapeHtml(project.lead)+'</p><div class="facts">'+project.facts.map(x=>'<span class="fact">'+escapeHtml(x)+'</span>').join('')+'</div></div><div class="visual-stage">'+visual+note+'</div></section>'
 +'<section class="project-block"><div class="block-lead"><div>'+title('Задачи продукта')+'</div><p>Проблемы и ситуации, для которых разрабатывался проект.</p></div><div class="problem-grid">'+project.problems.map(feature).join('')+'</div></section>'
 +'<section class="project-block"><div class="block-lead"><div>'+title('Как используется')+'</div><p>Основные пользовательские сценарии.</p></div>'+workflow(project.scenarios)+'</section>'
 +'<section class="project-block"><div class="block-lead"><div>'+title('Основные функции')+'</div><p>Реализованные возможности и текущие направления разработки, согласно описанию проекта.</p></div><div class="feature-grid">'+project.features.map(feature).join('')+'</div></section>'
 +media
 +'<section class="project-block"><div class="block-lead"><div>'+title('Технологии и архитектура')+'</div><p>Технический фундамент и ключевые инженерные решения.</p></div><div class="tech-layout"><div>'+chips(project.tech)+'</div><ul class="tech-list">'+project.architecture.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ul></div></section>'
 +code
 +'<div class="project-ending"><strong>'+escapeHtml(project.ending)+'</strong>'+additional+'</div></div>';
 document.getElementById('panel-'+id).innerHTML=html;
}
ids.forEach(id=>render(data[id],id));
let active=0;
let scrollTimer=0;
let switching=false;
let observer=null;
const nav=document.getElementById('project-navigation');
const clamp = n => Math.max(0,Math.min(ids.length-1,n));
function fit(){
 const current=panels[active];if(!current)return;
 stage.style.height=Math.ceil(current.scrollHeight)+'px';
}
function mark(index){
 index=clamp(index);
 active=index;
 tabs.forEach((tab,i)=>{
 const selected=i===index;
 tab.setAttribute('aria-selected',String(selected));
 tab.tabIndex=selected?0:-1;
 if(selected)tab.scrollIntoView({block:'nearest',inline:'nearest',behavior:reduced.matches?'instant':'smooth'});
 });
 panels.forEach((panel,i)=>{
 const hidden=i!==index;
 panel.setAttribute('aria-hidden',String(hidden));
 panel.inert=hidden;
 });
 fit();
}
function projectTop(){
 const navTop=nav.getBoundingClientRect().top + window.scrollY;
 return Math.max(0,navTop-5);
}
function select(index,focus=false){
 index=clamp(index);
 switching=true;
 // Immediately expose the destination panel so scrollIntoView, size and assistive tech work.
 mark(index);
 const dest=panels[index].offsetLeft;
 stage.scrollTo({left:dest,behavior:reduced.matches?'instant':'smooth'});
 if(focus)tabs[index].focus({preventScroll:true});
 window.scrollTo({top:projectTop(),behavior:reduced.matches?'instant':'smooth'});
 window.clearTimeout(scrollTimer);
 scrollTimer=window.setTimeout(()=>{switching=false;mark(Math.round(stage.scrollLeft/Math.max(stage.clientWidth,1)));},reduced.matches?80:500);
}
tabs.forEach((tab,i)=>{
 tab.addEventListener('click',()=>select(i));
 tab.addEventListener('keydown',e=>{
 const current=active;
 let next=null;
 if(e.key==='ArrowRight')next=(current+1)%ids.length;
 if(e.key==='ArrowLeft')next=(current+ids.length-1)%ids.length;
 if(e.key==='Home')next=0;
 if(e.key==='End')next=ids.length-1;
 if(next!==null){e.preventDefault();select(next,true);}
 });
});
let lastScroll=0;
stage.addEventListener('scroll',()=>{
 const next=clamp(Math.round(stage.scrollLeft/Math.max(stage.clientWidth,1)));
 if(next!==active){mark(next);lastScroll=Date.now();}
 window.clearTimeout(scrollTimer);
 scrollTimer=window.setTimeout(()=>{
  const settled=clamp(Math.round(stage.scrollLeft/Math.max(stage.clientWidth,1)));
  if(settled!==active){mark(settled);}
  if(!switching && Date.now()-lastScroll<1200)window.scrollTo({top:projectTop(),behavior:reduced.matches?'instant':'smooth'});
  switching=false;fit();
 },180);
},{passive:true});
const resize=()=>{stage.scrollLeft=panels[active].offsetLeft;fit();};
window.addEventListener('resize',resize);
window.addEventListener('load',resize,{once:true});
const images=[...document.querySelectorAll('.project-panel img')];
images.forEach(img=>img.addEventListener('load',fit,{once:true}));
mark(0);stage.scrollLeft=0;fit();
// Simple accessible full-image preview, limited to actual files.
const lightbox=document.getElementById('digital-lightbox');
const closeBtn=lightbox.querySelector('.lightbox-close');
let lastFocus=null;
document.addEventListener('click',e=>{
 const btn=e.target.closest('[data-preview]');
 if(!btn)return;
 lastFocus=btn;lightbox.querySelector('img').src=btn.dataset.preview;
 lightbox.querySelector('img').alt=btn.getAttribute('aria-label')||'Изображение';
 lightbox.hidden=false;closeBtn.focus();
});
function closePreview(){lightbox.hidden=true;lightbox.querySelector('img').removeAttribute('src');lastFocus?.focus();}
closeBtn.addEventListener('click',closePreview);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closePreview();});
document.addEventListener('keydown',e=>{if(!lightbox.hidden && e.key==='Escape')closePreview();});
})();
