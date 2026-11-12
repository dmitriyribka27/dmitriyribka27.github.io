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
const heroPhone=(type)=>{
const today=type==='today';
const items=today?[
 ['Разобрать запросы','10:00 · 30 мин',''],
 ['Подготовить презентацию','11:30 · 1 ч','done'],
 ['Созвон с командой','15:00 · 45 мин',''],
 ['Составить план на неделю','17:00 · 30 мин',''],
]:[
 ['Планирование дня','10:00–10:30',''],
 ['Работа над задачами','12:00–13:00','active'],
 ['Встреча с командой','15:00–15:45','']
];
return '<div class="di-hero-device '+(today?'di-hero-device-today':'di-hero-device-calendar')+'">'+
'<div class="di-device-rim"><div class="di-device-screen">'+
'<div class="di-device-status" aria-label="9:41, сотовая связь, Wi-Fi, заряд батареи"><span class="di-status-time">9:41</span><span class="di-device-island"></span><span class="di-status-icons" aria-hidden="true"><span class="di-cellular"><i></i><i></i><i></i><i></i></span><svg class="di-status-wifi" viewBox="0 0 18 14"><path d="M1 4.2Q9 -2.2 17 4.2M4 7.4Q9 3.4 14 7.4M7 10.5Q9 9 11 10.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="12" r="1.4" fill="currentColor"/></svg><span class="di-battery"><span class="di-battery-fill"></span></span></span></div>'+
'<div class="di-device-brand"><b>DO IT</b><span class="di-device-symbol">'+(today?'◌':'✦')+'</span></div>'+
'<h4>'+(today?'Сегодня':'Календарь')+'</h4>'+
(today?'<div class="di-device-sub">Пятница, 13 ноября <span>3 из 5 задач</span></div><div class="di-progress"><span></span></div>':
'<div class="di-weekdays"><span>Пн<small>9</small></span><span>Вт<small>10</small></span><span>Ср<small>11</small></span><span class="current">Чт<small>12</small></span><span>Пт<small>13</small></span></div>')+
'<div class="di-device-list">'+items.map(([label,meta,mode])=>'<div class="di-device-task '+mode+'"><span class="di-device-check">'+(mode==='done'?'✓':'')+'</span><div><strong>'+label+'</strong><small>'+meta+'</small></div></div>').join('')+'</div>'+
'<div class="di-device-bottom"><span>⌂</span><span>▦</span><span>✧</span><span>♙</span></div><div class="di-device-home"></div></div></div></div>'
};
const calendarStagePhone=()=>{
const rows=[
 ['09:00','Планирование','10:00–10:30',''],
 ['11:00','Встреча с командой','12:00–12:45',''],
 ['14:00','Работа над проектом','15:00–16:00','focus'],
 ['17:00','Свободное окно','17:00–18:00','free']
];
return '<div class="di-calendar-device" role="img" aria-label="Макет календаря DO IT: неделя ноября, планирование, встреча, работа над проектом и свободное время">'+
'<div class="di-device-rim"><div class="di-device-screen">'+
'<div class="di-device-status"><span class="di-status-time">9:41</span><span class="di-device-island"></span><span class="di-status-icons" aria-hidden="true"><span class="di-cellular"><i></i><i></i><i></i><i></i></span><svg class="di-status-wifi" viewBox="0 0 18 14"><path d="M1 4.2Q9 -2.2 17 4.2M4 7.4Q9 3.4 14 7.4M7 10.5Q9 9 11 10.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="12" r="1.4" fill="currentColor"/></svg><span class="di-battery"><span class="di-battery-fill"></span></span></span></div>'+
'<div class="di-calendar-header"><span>‹</span><strong>Ноябрь</strong><span class="di-calendar-header-action">▦</span></div>'+
'<div class="di-calendar-week"><span>Пн<b>9</b></span><span>Вт<b>10</b></span><span>Ср<b>11</b></span><span class="selected">Чт<b>12</b></span><span>Пт<b>13</b></span><span>Сб<b>14</b></span><span>Вс<b>15</b></span></div>'+
'<div class="di-calendar-summary"><span>Четверг, 12 ноября</span><span>3 события</span></div>'+
'<div class="di-calendar-timeline">'+rows.map(([time,label,meta,mode])=>'<div class="di-calendar-timeline-row"><time>'+time+'</time><div class="di-calendar-event '+mode+'"><strong>'+label+'</strong><small>'+meta+'</small></div></div>').join('')+'</div>'+
'<div class="di-device-bottom"><span>⌂</span><span class="selected">▦</span><span>✧</span><span>♙</span></div><div class="di-device-home"></div></div></div></div>'
};
const showcasePhone=(kind)=>{
const titleText=kind==='today'?'Сегодня':kind==='calendar'?'Календарь':'Ассистент';
const icon=kind==='today'?'⌂':kind==='calendar'?'▦':'✧';
const status='<div class="di-showcase-status"><span>9:41</span><span class="di-showcase-island"></span><span class="di-showcase-signal" aria-hidden="true"><i></i><i></i><i></i><i></i></span><svg viewBox="0 0 18 14" aria-hidden="true"><path d="M1 4Q9 -2 17 4M4 7Q9 3 14 7M7 10Q9 9 11 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/></svg><span class="di-showcase-battery"><i></i></span></div>';
const nav='<div class="di-showcase-nav"><span class="'+(kind==='today'?'active':'')+'">⌂</span><span class="'+(kind==='calendar'?'active':'')+'">▦</span><span class="'+(kind==='assistant'?'active':'')+'">✧</span></div><span class="di-showcase-home"></span>';
const task=(name,time,mode='')=>'<div class="di-showcase-task '+mode+'"><span class="di-showcase-check">'+(mode==='done'?'✓':'')+'</span><div><strong>'+name+'</strong><small>'+time+'</small></div></div>';
let body='';
if(kind==='today'){
body='<div class="di-showcase-date">Четверг, 12 ноября</div><div class="di-showcase-progress"><span>2 из 4 задач</span><b>50%</b></div><div class="di-showcase-progress-line"><i></i></div>'+
'<div class="di-showcase-subhead">Мои задачи <b>＋</b></div>'+
task('Разобрать запросы','10:00 · 30 мин','done')+
task('Подготовить план','До 12:00','highlight')+
task('Созвон с командой','15:00 · 45 мин')+
task('Проверить отчёт','До 18:00')+
'<div class="di-showcase-tip"><span>✦</span> Сегодня ещё 2 задачи</div>';
}else if(kind==='calendar'){
body='<div class="di-showcase-month"><span>‹</span><strong>Ноябрь</strong><span>▦</span></div>'+
'<div class="di-showcase-days"><span>Пн<b>9</b></span><span>Вт<b>10</b></span><span>Ср<b>11</b></span><span class="current">Чт<b>12</b></span><span>Пт<b>13</b></span></div>'+
'<div class="di-showcase-subhead">Расписание <b>＋</b></div>'+
'<div class="di-showcase-events"><div><time>10:00</time><section><strong>Планирование</strong><small>10:00–10:30</small></section></div><div><time>12:00</time><section class="selected"><strong>Работа над задачами</strong><small>12:00–13:30</small></section></div><div><time>15:00</time><section><strong>Встреча</strong><small>15:00–15:45</small></section></div></div>'+
'<div class="di-showcase-free">17:00 · Свободное окно</div>';
}else{
body='<div class="di-showcase-assistant-label"><span>✦</span> План на сегодня</div>'+
'<div class="di-showcase-chat user">Помоги распределить задачи на день.</div>'+
'<div class="di-showcase-chat assistant"><span>✦</span><div>Предлагаю такой порядок:</div></div>'+
'<div class="di-showcase-suggest"><div><b>10:00</b><span>Разобрать запросы</span></div><div><b>12:00</b><span>Подготовить план</span></div><div><b>15:00</b><span>Созвон с командой</span></div></div>'+
'<div class="di-showcase-apply">✓ Подтвердить план</div>'+
'<div class="di-showcase-compose"><span>Написать...</span><b>➤</b></div>';
}
return '<div class="di-showcase-phone di-showcase-'+kind+'" role="img" aria-label="Иллюстрация экрана DO IT: '+titleText+'"><div class="di-showcase-rim"><div class="di-showcase-glass">'+status+'<header class="di-showcase-brand"><span>DO IT</span><b>✦</b></header><h4>'+titleText+'</h4>'+body+nav+'</div></div></div>';
};
const parts=[
'<div class="di-page">',
'<section class="di-hero"><span class="di-star di-hero-star" aria-hidden="true"></span><div class="di-hero-copy"><h2>DO <span>IT.</span></h2><h3>Твоё <em>время.</em><br>Твои правила.</h3><p>'+escapeHtml(data.doit.lead)+'</p></div>',
'<div class="di-hero-art">',
heroPhone('today'),
heroPhone('calendar'),
'<div class="di-wave" aria-hidden="true"></div></div></section>',
'<section class="di-section"><div class="di-head"><h3>Задач много.<br>Порядка <em>мало.</em></h3><p>'+escapeHtml(data.doit.problems[0].text)+'</p></div><div class="di-floating-tasks"><svg class="di-task-connector" viewBox="0 0 700 340" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="di-connect-grad" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a6bd26"/><stop offset=".5" stop-color="#e5ff36"/><stop offset="1" stop-color="#a8b7a4"/></linearGradient></defs><path d="M155 56 C365 20 400 110 513 135 S510 210 340 238 S240 284 530 296" fill="none" stroke="url(#di-connect-grad)" stroke-width="3" stroke-linecap="round"/><path class="di-task-pulse" d="M155 56 C365 20 400 110 513 135 S510 210 340 238 S240 284 530 296" fill="none" stroke="#f7ffc0" stroke-width="4" stroke-linecap="round"/></svg><div class="di-float-card a">Позвонить клиенту</div><div class="di-float-card b">Проект до пятницы</div><div class="di-float-card c">Встреча в 14:30</div><div class="di-float-card d">Не забыть оплатить</div></div><p class="di-statement">Планирование становится отдельной работой.</p></section>',
'<section class="di-section"><div class="di-head"><h3>Одна мысль.<br><em>Три задачи.</em></h3><p>'+escapeHtml(data.doit.features[4].text)+'</p></div><div class="di-voice"><span class="di-microphone">♩</span><span class="di-equalizer" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div><blockquote class="di-quote">«Завтра в 12 встреча с Русланом, до пятницы закончить презентацию, вечером позвонить Белле»</blockquote><div class="di-flow-arrow">↓</div><div class="di-task-list"><div>✓ <span>Встреча с Русланом — завтра в 12:00</span></div><div>✓ <span>Закончить презентацию — до пятницы</span></div><div>✓ <span>Позвонить Белле — вечером</span></div></div><p class="di-statement">Из одной фразы — готовый список действий.</p></section>',
'<section class="di-section"><div class="di-head"><h3>Контекст.<br><em>Подтверждение.</em></h3><p>'+escapeHtml(data.doit.features[3].text)+'</p></div><div class="di-dialogue"><div class="di-bubble di-user-bubble">Подготовить отчёт в четверг в 15:00</div><div class="di-bubble di-agent-bubble"><span class="di-star di-mini-star" aria-hidden="true"></span><span>На это время назначена встреча. Перенести работу над отчётом на 17:00?</span></div><div class="di-confirm"><span>Подтвердить</span><span>Изменить</span></div></div></section>',
'<section class="di-section"><div class="di-head"><h3>Время под <em>контролем.</em></h3><p>'+escapeHtml(data.doit.problems[1].text)+'</p></div><div class="di-calendar-stage">',
calendarStagePhone(),
'<div class="di-calendar-lines" aria-hidden="true"></div></div><p class="di-statement">Планируй работу. Учитывай свободное время.</p></section>',
'<section class="di-section"><div class="di-head"><h3>Одна команда.<br><em>Общий план.</em></h3><p>'+escapeHtml(data.doit.problems[2].text)+'</p></div><div class="di-workflow-demo" aria-label="Схема работы команды: руководитель назначает задачу, исполнитель выполняет, руководитель принимает результат"><div class="di-team"><div class="di-team-project"><span class="di-team-project-symbol" aria-hidden="true">↗</span><strong>Проект<br>«Запуск»</strong><div class="di-workflow-task"><span class="di-workflow-task-title">Подготовить запуск</span><span class="di-workflow-task-check" aria-hidden="true">✓</span></div></div><div class="di-team-roles"><div class="di-workflow-role di-workflow-role-assign"><b>Руководитель</b><span>Назначает</span><span class="di-workflow-role-status" aria-hidden="true">✓</span></div><div class="di-workflow-role di-workflow-role-execute"><b>Исполнитель</b><span>Выполняет</span><span class="di-workflow-role-status" aria-hidden="true">✓</span></div><div class="di-workflow-role di-workflow-role-accept"><b>Руководитель</b><span>Принимает</span><span class="di-workflow-role-status" aria-hidden="true">✓</span></div></div></div><div class="di-result di-workflow-result"><span class="di-workflow-result-icon" aria-hidden="true">✓</span><span>Результат принят</span></div></div></section>',
'<section class="di-section di-contribution"><div class="di-head"><h3>Моя работа над проектом</h3><p>'+escapeHtml(data.doit.contribution)+'</p></div><div class="di-contrib-interactive" aria-label="Направления моей работы"><div class="di-contrib-steps"><button class="di-contrib-step is-active" type="button" data-contrib-index="0" aria-pressed="true"><span class="di-contrib-step-icon"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 10h18M8 4v6M8 14h4m-4 3h8"/></svg></span><span>Проектирование</span><i aria-hidden="true"></i></button><button class="di-contrib-step" type="button" data-contrib-index="1" aria-pressed="false"><span class="di-contrib-step-icon"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 8h8M8 12h8M8 16h5"/><circle cx="18" cy="17" r="1" fill="currentColor" stroke="none"/></svg></span><span>Интерфейсы и сценарии</span><i aria-hidden="true"></i></button><button class="di-contrib-step" type="button" data-contrib-index="2" aria-pressed="false"><span class="di-contrib-step-icon"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/></svg></span><span>Данные и доступ</span><i aria-hidden="true"></i></button><button class="di-contrib-step" type="button" data-contrib-index="3" aria-pressed="false"><span class="di-contrib-step-icon"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 2.6 6.7L21 11l-6.4 2.3L12 20l-2.6-6.7L3 11l6.4-2.3L12 2Z"/><path d="M19 17v5m-2.5-2.5h5"/></svg></span><span>AI-команды</span><i aria-hidden="true"></i></button></div><div class="di-contrib-detail" role="status" aria-live="polite"><div class="di-contrib-detail-top"><span class="di-contrib-detail-label">Проектирование</span><span class="di-contrib-detail-counter">1 из 4</span></div><p class="di-contrib-detail-text">Спроектировал структуру веб-приложения и взаимосвязь основных модулей.</p><div class="di-contrib-progress" aria-hidden="true"><span></span></div></div></div></section>',
'<section class="di-section"><div class="di-head"><h3>Инженерная <em>часть.</em></h3><p>PostgreSQL, серверные проверки доступа и отдельная обработка пользовательских команд.</p></div><div class="di-tech-grid"><div class="di-tech-card"><span class="di-tech-icon"><svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><rect x="4" y="2.5" width="16" height="19" rx="3"/><path d="M10 18h4"/></svg></span><b>Клиент</b><span>PWA и JavaScript</span></div><div class="di-tech-card"><span class="di-tech-icon"><svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 8l-3 4 3 4m8-8 3 4-3 4M13.5 7l-3 10"/></svg></span><b>Серверная логика</b><span>Supabase Edge Functions</span></div><div class="di-tech-card"><span class="di-tech-icon"><svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/></svg></span><b>База данных</b><span>PostgreSQL</span></div><div class="di-tech-card"><span class="di-tech-icon"><svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M8 4L3 12l5 8M16 4l5 8-5 8M10 16l4-8"/><circle cx="12" cy="12" r="1"/></svg></span><b>Разработка</b><span>GitHub и Cloudflare Pages</span></div></div><ul class="tech-list di-architecture-list">'+data.doit.architecture.map(item=>'<li>'+escapeHtml(item)+'</li>').join('')+'</ul><div class="code-card di-code"><div class="code-card-head">supabase/functions/ai-command/index.ts</div><pre tabindex="0" aria-label="Фрагмент кода"><code>',
highlighted(data.doit.code),
'</code></pre></div><p class="di-note">Фрагмент реального исходного кода: проверка сообщения перед разбором команды.</p></section>',
'<section class="di-section"><div class="di-head"><h3>Сложное внутри.<br><em>Простое снаружи.</em></h3><p>Задачи, календарь и ассистент связаны общей навигацией.</p></div><div class="di-three-phones di-real-screens">',
'<img src="assets/digital/doit-screen-today.webp" alt="DO IT — экран Сегодня: задачи, прогресс и анализ дня" loading="lazy" decoding="async">',
'<img src="assets/digital/doit-screen-calendar.webp" alt="DO IT — экран Календарь: расписание, встречи и события" loading="lazy" decoding="async">',
'<img src="assets/digital/doit-screen-assistant.webp" alt="DO IT — экран Ассистент: планирование задач в чате" loading="lazy" decoding="async">',
'</div><p class="di-note">Экраны приложения DO IT.</p></section>',
'<section class="di-ending"><h3>'+escapeHtml(data.doit.ending)+'</h3><div class="di-infinity di-infinity-flow" aria-hidden="true"><svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg" focusable="false"><defs><linearGradient id="doit-infinity-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5ff36"/><stop offset="48%" stop-color="#f6ff9b"/><stop offset="100%" stop-color="#b6d817"/></linearGradient></defs><path class="di-infinity-glow" d="M300 130 C212 39 153 28 90 63 C0 114 55 229 155 214 C220 204 255 156 300 130 C366 78 418 40 479 52 C579 70 570 202 480 216 C407 227 351 175 300 130 Z"/><path class="di-infinity-line" d="M300 130 C212 39 153 28 90 63 C0 114 55 229 155 214 C220 204 255 156 300 130 C366 78 418 40 479 52 C579 70 570 202 480 216 C407 227 351 175 300 130 Z"/></svg></div><p>DO IT.</p></section>',
'</div>'
];

document.getElementById('panel-doit').innerHTML=parts.join('');


}

ids.forEach(id=>id==='doit'?renderDoit():render(data[id],id));

/* Contribution explorer: lightweight, fully client-side and keyboard accessible. */
const contribution=document.querySelector('#panel-doit .di-contribution');
if(contribution){
 const controls=[...contribution.querySelectorAll('.di-contrib-step')];
 const label=contribution.querySelector('.di-contrib-detail-label');
 const detail=contribution.querySelector('.di-contrib-detail-text');
 const count=contribution.querySelector('.di-contrib-detail-counter');
 const progress=contribution.querySelector('.di-contrib-progress span');
 const contributions=["Спроектировал структуру веб-приложения и взаимосвязь основных модулей.","Продумал пользовательские сценарии и интерфейсы для личной и командной работы.","Разработал логику управления задачами, интеграцию с Supabase и проверки доступа.","Проработал обработку AI-команд с подтверждением действий перед изменением данных."];
 const contributionTitles=["Проектирование","Интерфейсы и сценарии","Данные и доступ","AI-команды"];
 controls.forEach((control,index)=>{
  control.addEventListener('click',()=>{
   controls.forEach((item,i)=>{item.classList.toggle('is-active',i===index);item.setAttribute('aria-pressed',String(i===index));});
   label.textContent=contributionTitles[index];
   detail.textContent=contributions[index];
   count.textContent=(index+1)+' из '+controls.length;
   progress.style.width=((index+1)/controls.length*100)+'%';
  });
 });
}

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
