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


function renderOps(){
 const p=data.ops;
 const screens=[
  {name:'Главная',file:'assets/digital/ops-home.webp',hint:'Обзор смены, заказов и показателей'},
  {name:'Финансы',file:'assets/digital/ops-finance.webp',hint:'Маржа, затраты и движение средств'},
  {name:'Производство',file:'assets/digital/ops-production.webp',hint:'Выпуск продукции и расход сырья'}
 ];
 const icon=(type)=>({
  stock:'<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 5v10l9 5 9-5V7M12 12v10"/>',
  factory:'<path d="M3 21V9l6 4V9l6 4V4h6v17H3Zm4-4h2m4 0h2m3 0h1"/>',
  money:'<ellipse cx="12" cy="6" rx="9" ry="3"/><path d="M3 6v12c0 4 18 4 18 0V6M3 12c0 4 18 4 18 0"/>',
  check:'<path d="M4 12l5 5L20 6"/>',
  flow:'<path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"/>',
  scale:'<path d="M12 3v17M4 7h16M6 7l-3 7h6L6 7Zm12 0-3 7h6l-3-7ZM8 21h8"/>'
 }[type]||'');
 const svg=(type)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+icon(type)+'</svg>';
 const tiles=[
  {type:'stock',title:'Склад',text:'Приёмка, остатки, движение и инвентаризация.'},
  {type:'factory',title:'Производство',text:'Выпуск, рецептуры, потери и себестоимость.'},
  {type:'money',title:'Финансы',text:'Выручка, расходы, маржа и денежные операции.'}
 ];
 const steps=tiles.map((x,i)=>'<div class="ops-flow-item"><span class="ops-flow-icon">'+svg(x.type)+'</span><strong>'+x.title+'</strong><p>'+x.text+'</p><span class="ops-flow-sequence" aria-hidden="true">'+(i===2?'✓':'→')+'</span></div>').join('');
 const slides=screens.map((item,i)=>'<li class="ops-slide" id="ops-shot-'+i+'"><div class="ops-shot-frame"><img src="'+escapeHtml(item.file)+'" alt="'+escapeHtml(item.name+' — интерфейс SEA LIVERY OPS')+'" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add(\'ops-missing\')"><div class="ops-shot-placeholder"><span>'+svg(i===0?'stock':i===1?'factory':'money')+'</span><strong>Место для скриншота</strong><small>'+escapeHtml(item.name)+'</small></div></div><div class="ops-shot-caption"><strong>'+escapeHtml(item.name)+'</strong><span>'+escapeHtml(item.hint)+'</span></div></li>').join('');
 const info=[
  ['Двойной учёт','Штуки и килограммы внутри товарной карточки.'],
  ['История операций','Поступления, списания, инвентаризация и производство.'],
  ['Проверка остатков','Фактическое количество и причины расхождений.'],
  ['Расчёт выпуска','Исходное сырьё, выход, потери и упаковка.']
 ].map((x,i)=>'<article class="ops-feature"><span>'+svg(['scale','flow','check','factory'][i])+'</span><h4>'+x[0]+'</h4><p>'+x[1]+'</p></article>').join('');
 document.getElementById('panel-ops').innerHTML=
 '<div class="ops-page"><section class="ops-intro"><div class="ops-eyebrow"><span class="ops-live-dot"></span> Управление операциями</div><div class="ops-intro-main"><div><h2>SEA LIVERY <em>OPS.</em></h2><p>'+escapeHtml(p.lead)+'</p></div><div class="ops-hero-mark" aria-hidden="true">'+svg('flow')+'<span>OPS</span></div></div><div class="ops-flow" aria-label="Связанные процессы: склад, производство и финансы">'+steps+'</div></section>'+
 '<section class="ops-section"><div class="ops-heading"><h3>Где теряется <em>точность.</em></h3><p>Склад работает с весом и количеством, производство — с выходом и потерями, финансы — с себестоимостью. Эти данные связаны между собой.</p></div><div class="ops-problems">'+p.problems.map((x,i)=>'<article><span class="ops-problem-index">0'+(i+1)+'</span><h4>'+escapeHtml(x.title)+'</h4><p>'+escapeHtml(x.text)+'</p></article>').join('')+'</div></section>'+
 '<section class="ops-section"><div class="ops-heading"><h3>Сырьё. Выпуск. <em>Остаток.</em></h3><p>Пример движения партии: количество уменьшается при переработке, а на выходе появляется готовая продукция.</p></div><div class="ops-production"><div class="ops-production-top"><span>Демонстрация расчёта</span><span class="ops-production-icon">'+svg('factory')+'</span></div><div class="ops-production-metrics"><div><small>Исходное сырьё</small><strong>1,500 <span>кг</span></strong></div><div class="ops-production-arrow" aria-hidden="true">→</div><div><small>Готовая продукция</small><strong>1,200 <span>кг</span></strong></div></div><div class="ops-loss"><span>Технологические потери</span><strong>0,300 <span>кг</span></strong></div><div class="ops-mass-bar" role="img" aria-label="Из 1,5 кг сырья получается 1,2 кг продукции и 0,3 кг потерь"><span></span><i></i></div><div class="ops-production-foot"><span><i class="ops-key ops-key-good"></i> Выход 80%</span><span><i class="ops-key ops-key-loss"></i> Потери 20%</span></div><p>Цифры иллюстрируют принцип расчёта, а не фактическую производственную партию.</p></div></section>'+
 '<section class="ops-section"><div class="ops-heading"><h3>Что умеет <em>система.</em></h3><p>Функции, с которыми сотрудники работают в течение смены.</p></div><div class="ops-features">'+info+'</div></section>'+
 '<section class="ops-section ops-gallery-section"><div class="ops-heading"><h3>Рабочие <em>экраны.</em></h3><p>Главная, финансы и производство — три ключевых экрана системы.</p></div><div class="ops-gallery"><ul class="ops-slides" id="ops-slides" aria-label="Скриншоты SEA LIVERY OPS">'+slides+'</ul></div></section>'+
 '<section class="ops-section"><div class="ops-heading"><h3>Моя работа над <em>OPS.</em></h3><p>'+escapeHtml(p.contribution)+'</p></div><div class="ops-contribution"><div><span>'+svg('stock')+'</span><strong>Учёт склада</strong><p>Номенклатура, движения, двойные единицы, инвентаризация.</p></div><div><span>'+svg('factory')+'</span><strong>Производственные расчёты</strong><p>Выход продукции, нормы, потери и себестоимость.</p></div><div><span>'+svg('money')+'</span><strong>Финансовая структура</strong><p>Показатели смены, денежные операции и контроль затрат.</p></div></div></section>'+
 '<section class="ops-section"><div class="ops-heading"><h3>Техническая <em>основа.</em></h3><p>PWA с бизнес-логикой для связанных операций.</p></div><div class="ops-architecture">'+p.architecture.map((t,i)=>'<div><span>'+svg(['flow','factory','scale'][i])+'</span><p>'+escapeHtml(t)+'</p></div>').join('')+'</div></section>'+
 '<div class="ops-ending"><span class="ops-ending-symbol" aria-hidden="true">'+svg('flow')+'</span><h3>Учёт начинается<br>с <em>точного движения.</em></h3><p>'+escapeHtml(p.ending)+'</p></div></div>';

}


function renderMono(){
 const p=data.mono;
 const icon=(name)=>{
  const paths={
   wallet:'<rect x="3" y="6" width="18" height="15" rx="3"/><path d="M3 10h18M7 6V4h12v2"/><path d="M16 15h2"/>',
   arrows:'<path d="M4 8h16m-5-5 5 5-5 5M20 17H4m5-5-5 5 5 5"/>',
   globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 4-5 14 0 18m0-18c5 4 5 14 0 18"/>',
   check:'<path d="m4 12 5 5L20 6"/>',
   lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
   bolt:'<path d="m13 2-9 11h7l-1 9 10-12h-7l0-8Z"/>'
  };
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[name]+'</svg>';
 };
 const scenarios=[
  ['Расход','Покупка или оплата списывает сумму с выбранного счёта.','−','expense'],
  ['Доход','Поступление увеличивает баланс нужного счёта.','+','income'],
  ['Перевод','Перемещение денег между счетами без повторного дохода.','↔','transfer']
 ];
 const gallery=[
  ['Главная','assets/digital/mono-home.png'],
  ['Планирование','assets/digital/mono-planning.png'],
  ['Конвертер валют','assets/digital/mono-converter.png']
 ];
 const screens=gallery.map((item,i)=>'<figure class="mono-shot"><div class="mono-shot-frame"><div class="mono-shot-placeholder" aria-hidden="true"><span>'+icon(['wallet','bolt','globe'][i])+'</span><strong>'+escapeHtml(item[0])+'</strong><small>Место для скриншота</small></div><img src="'+escapeHtml(item[1])+'" alt="MONO Finance — '+escapeHtml(item[0])+'" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add(\'mono-no-image\')" onload="this.parentElement.classList.add(\'mono-has-image\')"></div><figcaption>'+escapeHtml(item[0])+'</figcaption></figure>').join('');
 const cards=scenarios.map(s=>'<article class="mono-action '+s[3]+'"><span class="mono-action-sign">'+s[2]+'</span><h4>'+s[0]+'</h4><p>'+s[1]+'</p></article>').join('');
 const html='<div class="mono-page">'+
 '<section class="mono-intro"><div class="mono-kicker"><span class="mono-breath" aria-hidden="true"></span>Личные финансы в одном приложении</div><div class="mono-hero"><div class="mono-hero-copy"><h2>MONO<span>.</span><br><em>Финансы под рукой.</em></h2><p>'+escapeHtml(p.lead)+'</p></div><div class="mono-orbit" aria-hidden="true"><div class="mono-orbit-ring mono-orbit-one"></div><div class="mono-orbit-ring mono-orbit-two"></div><div class="mono-orbit-center">'+icon('wallet')+'</div><span class="mono-orbit-currency a">₾</span><span class="mono-orbit-currency b">$</span><span class="mono-orbit-currency c">₽</span></div></div></section>'+
 '<section class="mono-section"><div class="mono-heading"><h3>Записывать операции.<br><em>Видеть свои деньги.</em></h3><p>Главный экран собран вокруг повседневных действий: быстро внести операцию, пересчитать валюту и проверить остатки.</p></div><div class="mono-quick"><div class="mono-quick-top"><span>'+icon('bolt')+'</span><strong>Быстрая запись</strong><span class="mono-pulse-dot"></span></div><div class="mono-quick-actions"><span>Расход <i>−</i></span><span>Доход <i>+</i></span><span>Перевод <i>↔</i></span></div></div><div class="mono-actions">'+cards+'</div></section>'+
 '<section class="mono-section"><div class="mono-heading"><h3>Три валюты.<br><em>Один понятный обзор.</em></h3><p>Деньги могут храниться в разных валютах и на разных счетах. MONO показывает их отдельно, а конвертер помогает быстро сравнить суммы.</p></div><div class="mono-converter"><div class="mono-converter-title">'+icon('globe')+'<strong>Конвертер валют</strong><span>Пример пересчёта</span></div><div class="mono-converter-row"><div><small>Исходная сумма</small><strong>100,00</strong></div><b>USD</b></div><div class="mono-converter-motion" aria-hidden="true"><span></span><span>↓</span><span></span></div><div class="mono-converter-row result"><div><small>В другой валюте</small><strong>≈ 258,30</strong></div><b>GEL</b></div><p>Курс приведён для иллюстрации интерфейса. Реальный пересчёт зависит от установленного курса.</p></div><div class="mono-accounts"><div><span>'+icon('wallet')+'</span><strong>Отдельные счета</strong><p>Банковские счета и наличные сохраняют собственные балансы.</p></div><div><span>'+icon('arrows')+'</span><strong>Переводы между счетами</strong><p>Операция отражается сразу на двух балансах.</p></div></div></section>'+
 '<section class="mono-section"><div class="mono-heading"><h3>Экраны <em>MONO.</em></h3><p>Три экрана приложения: главная, планирование и конвертер валют. Все изображения расположены рядом.</p></div><div class="mono-screens">'+screens+'</div></section>'+
 '<section class="mono-section"><div class="mono-heading"><h3>Как устроено <em>приложение.</em></h3><p>MONO устанавливается на iPhone как веб-приложение. Основные финансовые записи хранятся локально на устройстве.</p></div><div class="mono-tech"><div><span>'+icon('bolt')+'</span><strong>Быстрый ввод</strong><p>Операции добавляются прямо из основного интерфейса.</p></div><div><span>'+icon('wallet')+'</span><strong>Раздельные балансы</strong><p>Счета и валюты учитываются независимо.</p></div><div><span>'+icon('lock')+'</span><strong>Локальные данные</strong><p>Для базового учёта не нужен отдельный сервер.</p></div></div></section>'+
 '<div class="mono-finish"><div class="mono-finish-mark" aria-hidden="true">'+icon('wallet')+'</div><h3>Быстрее записать.<br><em>Проще разобраться.</em></h3><p>'+escapeHtml(p.ending)+'</p></div>'+
 '</div>';
 document.getElementById('panel-mono').innerHTML=html;
}


function renderKadr(){
 const p=data.kadr;
 const svg=(name)=>{
  const paths={
   print:'<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6zM17 12h1"/>',
   photo:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1.5"/><path d="m4 18 5-5 3 3 3-4 5 6"/>',
   layers:'<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5"/>',
   calculator:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h2m4 0h2m-8 4h2m4 0h2m-8 4h2m4 0h2"/>',
   check:'<path d="m4 12 5 5L20 6"/>',
   scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 8.5 21 21M8.5 15.5 21 3"/>',
   arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>'
  };
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[name]+'</svg>';
 };
 const gallery=[
  {name:'Каталог',src:'assets/digital/kadr-catalog.png',icon:'layers'},
  {name:'Калькулятор',src:'assets/digital/kadr-calculator.png',icon:'calculator'},
  {name:'Материалы',src:'assets/digital/kadr-materials.png',icon:'photo'}
 ];
 const screens=gallery.map((item,i)=>'<figure class="kadr-shot"><div class="kadr-shot-frame"><div class="kadr-shot-placeholder" aria-hidden="true"><span>'+svg(item.icon)+'</span><strong>'+escapeHtml(item.name)+'</strong><small>Место для скриншота</small></div><img src="'+escapeHtml(item.src)+'" loading="lazy" alt="КАДР — '+escapeHtml(item.name)+'" onload="this.parentElement.classList.add(\'kadr-has-image\')" onerror="this.hidden=true;this.parentElement.classList.add(\'kadr-no-image\')"></div><figcaption>'+escapeHtml(item.name)+'</figcaption></figure>').join('');
 const steps=[
  {icon:'layers',title:'Каталог',text:'Выбор услуги и тиража.'},
  {icon:'calculator',title:'Расчёт',text:'Материалы, стоимость и скидка.'},
  {icon:'check',title:'Цена заказа',text:'Итог для клиента и затраты.'}
 ];
 const flow=steps.map((x,i)=>'<article class="kadr-flow-step"><span class="kadr-flow-icon">'+svg(x.icon)+'</span><div><strong>'+x.title+'</strong><p>'+x.text+'</p></div>'+(i<2?'<span class="kadr-flow-arrow" aria-hidden="true">'+svg('arrow')+'</span>':'')+'</article>').join('');
 document.getElementById('panel-kadr').innerHTML=
 '<div class="kadr-page"><section class="kadr-hero"><div class="kadr-eyebrow"><span class="kadr-eyebrow-dot"></span> Калькулятор для печатного проекта</div><div class="kadr-hero-layout"><div><h2>КАДР<span>.</span><br><em>Цена под контролем.</em></h2><p>'+escapeHtml(p.lead)+'</p></div><div class="kadr-hero-art" aria-hidden="true"><div class="kadr-art-sheet sheet-back"><span></span><span></span></div><div class="kadr-art-sheet sheet-front"><div class="kadr-art-photo"><span class="kadr-art-sun"></span><span class="kadr-art-mountain"></span></div><span class="kadr-art-line"></span><span class="kadr-art-line short"></span></div><div class="kadr-art-sticker">КАДР</div></div></div></section>'+
 '<section class="kadr-section"><div class="kadr-heading"><h3>От изделия<br>к <em>готовой цене.</em></h3><p>Печать зависит от формата, материала, количества и обработки. Калькулятор собирает параметры заказа в одном месте.</p></div><div class="kadr-flow" aria-label="Порядок расчёта: каталог, расчёт, цена">'+flow+'</div><div class="kadr-cost-demo" aria-label="Демонстрация расчёта заказа"><div class="kadr-cost-header"><span>'+svg('calculator')+'</span><div><strong>Пример расчёта</strong><small>Фото 10×15 · 20 штук</small></div><span class="kadr-cost-indicator" aria-hidden="true"></span></div><div class="kadr-cost-meter"><span class="kadr-cost-fill"></span></div><div class="kadr-cost-results"><div><small>Количество</small><strong>20 шт.</strong></div><div><small>Цена за штуку</small><strong>0,50 ₾</strong></div><div class="kadr-cost-total"><small>Стоимость заказа</small><strong>10,00 ₾</strong></div></div><p>Пример по базовому прайсу без дополнительных услуг.</p></div></section>'+
 '<section class="kadr-section"><div class="kadr-heading"><h3>Что рассчитывает <em>КАДР.</em></h3><p>Параметры, которые влияют на стоимость заказа.</p></div><div class="kadr-feature-grid"><article><span>'+svg('layers')+'</span><h4>Позиции прайса</h4><p>Фото, полароиды, стикеры, визитки и другие изделия.</p></article><article><span>'+svg('photo')+'</span><h4>Материалы</h4><p>Бумага, расход чернил и другие прямые затраты.</p></article><article><span>'+svg('calculator')+'</span><h4>Тираж и скидки</h4><p>Пересчёт общей цены при изменении количества и скидки.</p></article><article><span>'+svg('scissors')+'</span><h4>Дополнительная работа</h4><p>Дизайн, обработка и другие услуги в расчёте заказа.</p></article></div></section>'+
 '<section class="kadr-section"><div class="kadr-heading"><h3>Три экрана <em>системы.</em></h3><p>Каталог услуг, калькулятор заказа и материалы.</p></div><div class="kadr-screens">'+screens+'</div></section>'+
 '<section class="kadr-section"><div class="kadr-heading"><h3>Как устроен <em>расчёт.</em></h3><p>Параметры заказа связаны между собой. Изменение материала, тиража или скидки влияет на итоговую стоимость.</p></div><div class="kadr-logic"><div><span>'+svg('layers')+'</span><strong>Услуга и формат</strong><p>Выбираются из каталога.</p></div><div><span>'+svg('photo')+'</span><strong>Расход материалов</strong><p>Учитывается в себестоимости.</p></div><div><span>'+svg('calculator')+'</span><strong>Итог заказа</strong><p>Цена и прямые затраты пересчитываются.</p></div></div></section>'+
 '<section class="kadr-section kadr-story"><div class="kadr-story-mark" aria-hidden="true">'+svg('print')+'</div><div><p class="kadr-story-eyebrow">Печать в Батуми</p><h3>КАДР — наш <em>семейный проект.</em></h3><p>Мы с женой развиваем в Батуми проект по печати фотографий, стикеров и полиграфии для малого бизнеса. Калькулятор помогает рассчитывать стоимость заказов и работать с прайсом.</p><a class="kadr-print-cta" href="https://wa.me/995568997063" target="_blank" rel="noopener noreferrer">Обратиться за печатью <span aria-hidden="true">→</span></a></div></section>'+
 '<div class="kadr-finish"><span aria-hidden="true">'+svg('print')+'</span><h3>Точный расчёт.<br><em>Понятная цена.</em></h3></div></div>';
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
'<section class="di-hero"><div class="di-hero-copy"><h2>DO <span>IT.</span></h2><h3>Твоё <em>время.</em><br>Твои правила.</h3><p>'+escapeHtml(data.doit.lead)+'</p></div>',
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

ids.forEach(id=>id==='doit'?renderDoit():id==='ops'?renderOps():id==='mono'?renderMono():id==='kadr'?renderKadr():render(data[id],id));

/* Contribution explorer: lightweight, fully client-side and keyboard accessible. */
const localizedDoitText=(value)=>{const lang=window.PORTFOLIO_I18N?.language||'ru';return window.PORTFOLIO_LOCALES?.[lang]?.digital?.[value]||value;};
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
   label.textContent=localizedDoitText(contributionTitles[index]);
   detail.textContent=localizedDoitText(contributions[index]);
   count.textContent=localizedDoitText((index+1)+' из '+controls.length);
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
