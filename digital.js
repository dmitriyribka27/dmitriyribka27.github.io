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
 const media=project.media?.length?'<section class="project-block"><div class="block-lead"><div>'+title('Экраны и интерфейс')+'</div><p>Интерфейсы и рабочие экраны.</p></div><div class="media-grid">'+project.media.map(mediaCard).join('')+'</div></section>':'';
 const code=project.code?'<section class="project-block"><div class="block-lead"><div>'+title('Фрагмент реализации')+'</div><p>Пример из исходного кода проекта.</p></div><div class="code-card"><div class="code-card-head">'+escapeHtml(project.codeTitle)+'</div><pre tabindex="0" aria-label="Фрагмент исходного кода"><code>'+highlighted(project.code)+'</code></pre></div><p class="note-line">'+escapeHtml(project.codeNote||'')+'</p></section>':'';
 const additional=project.extra?'<div class="additional-project"><strong>'+escapeHtml(project.extra.title)+'</strong><p>'+escapeHtml(project.extra.text)+'</p></div>':'';
 const html='<div class="presentation"><section class="project-hero"><div>'+(project.role?'<p class="hero-role">'+escapeHtml(project.role)+'</p>':'')+''+title(project.title,'h2')+'<p class="lede">'+escapeHtml(project.lead)+'</p>'+(project.facts?.length?'<div class="facts">'+project.facts.map(x=>'<span class="fact">'+escapeHtml(x)+'</span>').join('')+'</div>':'')+'</div><div class="visual-stage">'+visual+note+'</div></section>'
 +'<section class="project-block"><div class="block-lead"><div>'+title('Задачи продукта')+'</div><p>Проблемы и ситуации, для которых разрабатывался проект.</p></div><div class="problem-grid">'+project.problems.map(feature).join('')+'</div></section>'
 +'<section class="project-block"><div class="block-lead"><div>'+title('Как используется')+'</div><p>Основные пользовательские сценарии.</p></div>'+workflow(project.scenarios)+'</section>'
 +'<section class="project-block"><div class="block-lead"><div>'+title('Основные функции')+'</div><p>Основные возможности приложения.</p></div><div class="feature-grid">'+project.features.map(feature).join('')+'</div></section>'
 +media
 +'<section class="project-block"><div class="block-lead"><div>'+title('Технологии и архитектура')+'</div><p>Технический фундамент и ключевые инженерные решения.</p></div><div class="tech-layout"><div>'+chips(project.tech)+'</div><ul class="tech-list">'+project.architecture.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ul></div></section>'
 +code
 +'<div class="project-ending"><strong>'+escapeHtml(project.ending)+'</strong>'+additional+'</div></div>';
 document.getElementById('panel-'+id).innerHTML=html;
}

function renderDoit(){
const screen=(heading,rows,extra='')=>'<div class="di-screen '+extra+'"><div class="di-island"></div><div class="di-screen-top"><b>DO IT</b><span>✦</span></div><h4>'+heading+'</h4>'+rows.map((row,i)=>'<div class="di-screen-item '+(i===1?'chosen':'')+'"><i></i><span>'+row+'</span></div>').join('')+'<div class="di-screen-nav">⌂　　 ▦　　 ✧</div></div>';
const parts=[
'<div class="di-page">',
'<section class="di-hero"><span class="di-star di-hero-star" aria-hidden="true"></span><div class="di-hero-copy"><h2>DO <span>IT.</span></h2><h3>Твоё <em>время.</em><br>Твои правила.</h3><p>Планировщик для задач, встреч и договорённостей. Собирает их в понятное расписание.</p></div>',
'<div class="di-hero-art">',
screen('Сегодня',['Разобрать запросы','Подготовить план','Созвон с командой'],'di-phone-back'),
screen('Календарь',['10:00 Планирование','12:00 Задачи','15:00 Встреча'],'di-phone-front'),
'<div class="di-wave" aria-hidden="true"></div></div></section>',
'<section class="di-section"><div class="di-head"><h3>Задач много.<br>Порядка <em>мало.</em></h3><p>Заметки, календарь, переписки и идеи оказываются в разных местах.</p></div><div class="di-floating-tasks"><svg class="di-task-connector" viewBox="0 0 700 340" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="di-connect-grad" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a6bd26"/><stop offset=".5" stop-color="#e5ff36"/><stop offset="1" stop-color="#a8b7a4"/></linearGradient></defs><path d="M155 56 C365 20 400 110 513 135 S510 210 340 238 S240 284 530 296" fill="none" stroke="url(#di-connect-grad)" stroke-width="3" stroke-linecap="round"/><path class="di-task-pulse" d="M155 56 C365 20 400 110 513 135 S510 210 340 238 S240 284 530 296" fill="none" stroke="#f7ffc0" stroke-width="4" stroke-linecap="round"/></svg><div class="di-float-card a">Позвонить клиенту</div><div class="di-float-card b">Проект до пятницы</div><div class="di-float-card c">Встреча в 14:30</div><div class="di-float-card d">Не забыть оплатить</div></div><p class="di-statement">Планирование становится отдельной работой.</p></section>',
'<section class="di-section"><div class="di-head"><h3>Одна мысль.<br><em>Три задачи.</em></h3><p>Разбор голосового запроса на действия с датами и сроками.</p></div><div class="di-voice"><span class="di-microphone">♩</span><span class="di-equalizer" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div><blockquote class="di-quote">«Завтра в 12 встреча с Русланом, до пятницы закончить презентацию, вечером позвонить Белле»</blockquote><div class="di-flow-arrow">↓</div><div class="di-task-list"><div>✓ <span>Встреча с Русланом — завтра в 12:00</span></div><div>✓ <span>Закончить презентацию — до пятницы</span></div><div>✓ <span>Позвонить Белле — вечером</span></div></div><p class="di-statement">Из одной фразы — готовый список действий.</p></section>',
'<section class="di-section"><div class="di-head"><h3>Контекст.<br><em>Подтверждение.</em></h3><p>Перед изменением данных система показывает предлагаемое действие. Решение остаётся за пользователем.</p></div><div class="di-dialogue"><div class="di-bubble di-user-bubble">Подготовить отчёт в четверг в 15:00</div><div class="di-bubble di-agent-bubble"><span class="di-star di-mini-star" aria-hidden="true"></span><span>На это время назначена встреча. Перенести работу над отчётом на 17:00?</span></div><div class="di-confirm"><span>Подтвердить</span><span>Изменить</span></div></div></section>',
'<section class="di-section"><div class="di-head"><h3>Время под <em>контролем.</em></h3><p>Задачи и события видны в расписании. Время работы можно планировать отдельно от срока выполнения.</p></div><div class="di-calendar-stage">',
screen('Ноябрь',['10:00 Планирование','12:00 Встреча','15:00 Работа над проектом','17:00 Свободное время'],'di-calendar-phone'),
'<div class="di-calendar-lines" aria-hidden="true"></div></div><p class="di-statement">Планируй работу. Учитывай свободное время.</p></section>',
'<section class="di-section"><div class="di-head"><h3>Одна команда.<br><em>Общий план.</em></h3><p>Роли, поручения и проверка результата в едином рабочем пространстве.</p></div><div class="di-team"><div class="di-team-project"><span>↗</span><strong>Проект<br>«Запуск»</strong></div><div class="di-team-roles"><div><b>Руководитель</b><span>Назначает</span></div><div><b>Исполнитель</b><span>Выполняет</span></div><div><b>Руководитель</b><span>Принимает</span></div></div></div><div class="di-result">✓　Результат принят</div></section>',
'<section class="di-section"><div class="di-head"><h3>Инженерная <em>часть.</em></h3><p>PostgreSQL, серверные проверки доступа и отдельная обработка пользовательских команд.</p></div><div class="di-tech-grid"><div><b>Клиент</b><span>PWA и JavaScript</span></div><div><b>Серверная логика</b><span>Supabase Edge Functions</span></div><div><b>База данных</b><span>PostgreSQL</span></div><div><b>Разработка</b><span>GitHub и Cloudflare Pages</span></div></div><div class="code-card di-code"><div class="code-card-head">supabase/functions/ai-command/index.ts</div><pre tabindex="0" aria-label="Фрагмент кода"><code>',
highlighted(data.doit.code),
'</code></pre></div><p class="di-note">Фрагмент реального исходного кода: проверка сообщения перед разбором команды.</p></section>',
'<section class="di-section"><div class="di-head"><h3>Сложное внутри.<br><em>Простое снаружи.</em></h3><p>Задачи, календарь и ассистент связаны общей навигацией.</p></div><div class="di-three-phones">',
screen('Сегодня',['Разобрать запросы','Подготовить план','Созвон с командой']),
screen('Календарь',['10:00 Стендап','12:00 Задачи','15:00 Демо']),
screen('Ассистент',['Собери план дня','Предложение готово','Подтвердить действие']),
'</div><p class="di-note">Иллюстрации интерфейса, не фактические скриншоты.</p></section>',
'<section class="di-ending"><h3>Меньше хаоса.<br><em>Больше действия.</em></h3><div class="di-infinity" aria-hidden="true"><i></i><i></i></div><p>DO IT.</p></section>',
'</div>'
];

document.getElementById('panel-doit').innerHTML=parts.join('');
// Optional pixel-faithful assets exported from the approved presentation.
// The CSS fallback remains functional until the corresponding files are available.
[
 ['.di-hero-art','assets/digital/doit-phones.webp'],
 ['.di-calendar-stage','assets/digital/doit-calendar.webp'],
 ['.di-three-phones','assets/digital/doit-phones.webp'],
 ['.di-infinity','assets/digital/doit-infinity.webp']
].forEach(([selector,url])=>{
 const el=document.querySelector('#panel-doit '+selector);
 if(!el)return;
 const img=new Image();
 img.onload=()=>el.classList.add('di-has-asset');
 img.src=url;
});

}

ids.forEach(id=>id==='doit'?renderDoit():render(data[id],id));
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
