# HANDOFF — Dmitriy Rybka Portfolio

> Краткий рабочий контекст для следующего чата/разработчика. Читать перед изменениями. Обновлять **в том же коммите или сразу после каждого изменения сайта**. Это служебный файл, не контент сайта.

## ОБЩИЙ КОНТЕКСТ

- **Главная — прежние изменения:** локализация RU/EN/KA, переключатель языка, страницы услуг и оформление интерактивных карточек уже реализованы; подробности прежнего релиза заменены новым разделом «ПОСЛЕДНЕЕ».\n
- **SEO этап 2 (2026-11-13):** обновлены статические `title`, `meta description`, `og:title`, `og:description`, `twitter:title`, `twitter:description` на `index.html`, `digital.html`, `design.html`. Акцент: сайты/PWA/автоматизация, реальные digital-кейсы и графический дизайн без географического ограничения. Разметка, вёрстка, JS, мобильная и ПК-версии не менялись. IndexNow: пользователь отправил 4 URL, все HTTP 200; Google Search Console и Bing Webmaster подключены. Отдельные RU/EN/KA URL пока не реализованы; не ставить `hreflang` без отдельных адресов.

- **SEO (2026-11-13):** на `index.html`, `digital.html`, `design.html`, `privacy.html` установлены уникальные статические title/description, canonical, robots, Open Graph/Twitter; на главной JSON-LD Person. Созданы `robots.txt` и `sitemap.xml` с 4 каноническими URL. Переключение RU/EN/KA остаётся на одном URL через JavaScript: отдельная индексация языков — будущий этап. Не обещать позиции в выдаче; потребуется Google Search Console.

- **DESIGN кейс №2 — Кафе Кимбап:** два оригинальных PNG `assets/design/kimbap-1.png` (листовка) и `assets/design/kimbap-2.png` (меню), загружены из чата через Drive → GitHub Blob. В `design.html` изображения стоят рядом с `object-fit:contain`, скруглением 20px и общей графитовой подложкой. Подпись кратко описывает разработку макета и подготовку к печати.

- **DESIGN (2026-11-12):** страница перестроена под 6 самостоятельных карточек-кейсов: вертикальная лента на смартфонах, горизонтальная на ПК с колесом/стрелками/перетаскиванием полосы и индикатором прогресса. Код: `design.html`, новый `design.css`, новый `design.js`. Сейчас только заглушки для картинок/описаний; заменить реальными материалами после получения от пользователя. Старые галереи и lightbox со страницы удалены; главная и DIGITAL не затронуты.


- **Репозиторий:** `dmitriyribka27/dmitriyribka27.github.io`, публикация GitHub Pages: https://dmitriyribka27.github.io/ . Рабочая ветка по умолчанию — `main` (проверять перед записью).
- **Назначение:** персональное портфолио и получение заказов на сайты, PWA, автоматизацию и дизайн.
- **Страницы:** `index.html` (главная), `digital.html` (проекты), `design.html` (дизайн), `privacy.html` (политика). Общие стили: `brand-site.css`; общие JS-эффекты: `brand-site.js`; данные Digital: `digital-data.js`. Прежде чем менять архитектуру, проверить фактические HTML/CSS/JS и подключения.
- **Стиль:** тёмный графит, белый и кислотный лайм `#E5FF36`; Manrope, Onest, IBM Plex Mono. Умеренная фоновая сетка, мягкое свечение, чистая типографика. Мобильный Safari/iPhone — приоритет. Никаких бессмысленных подписей вида «01 / WEB», рекламных клише, загромождения и горизонтальной прокрутки. Не генерировать картинки без прямой просьбы — визуальные эффекты и мокапы можно делать кодом в самом сайте.
- **Главная:** услуги, переходы Digital/Design, блок «Привет, я Дима» с фотографией, процесс работы, Telegram и WhatsApp. Сохранять согласованные тексты и CTA.
- **Digital:** интерактивные вкладки DO IT, SL OPS, MONO, КАДР, Тихая бухта; первый — DO IT. Свайпы и вкладки переключают проекты без перезагрузки. Данные проектов отделены от отображения. DO IT оформлен с мокапами/реальными экранами, анимированными карточками хаоса, голосовой дорожкой, схемой командной работы и техническими блоками. Не менять остальные проекты без задачи.
- **Главная, анимация чтения:** `brand-site.js` и `brand-site.css` подсвечивают буквы поочерёдно в «Привет, я Дима» с учётом видимости и `prefers-reduced-motion`.
- **SL OPS:** отдельная анимированная презентация в `renderOps()` (`digital.js`) с процессами склада/производства/финансов и галереей 9:16. Изображения в `assets/digital/ops-*.webp`; сохранён шаблон переключения проектов.
- **Изображения SL OPS (2026-11-12):** три WebP `ops-home`, `ops-finance`, `ops-production` подготовлены пользователем; порядок Главная → Финансы → Производство. Ранее архив `ops-screens-update.zip` передан пользователю для ручной загрузки файлов; статус загрузки в GitHub не подтверждён.
- **SL OPS галерея:** `renderOps()` и `#panel-ops` показывают 3 экрана 9:16 одновременно в одном ряду без карусели; изображения `assets/digital/ops-{home,finance,production}.webp` должны быть загружены пользователем.
- **Тихая бухта:** `bay-showcase.js` и `bay-showcase.css`, игровая презентация. Hero — пять контурных кошачьих мордочек (уши, глаза, нос, усы, без хвостов), яхта и три анимированные волны на фирменной сетке; дополнительные кольца и маршрутные линии удалены; дублирующий контактный блок отсутствует.
- **Контакты:** Telegram https://t.me/ribka_27, WhatsApp https://wa.me/995568997063; в футере ссылка на `privacy.html`.
- **Рабочие правила:** вносить изменения непосредственно в GitHub; сохранять существующие функции и данные; проверять изменения по исходникам и по возможности на опубликованном сайте, **не заявлять, что проверено на iPhone, без реального теста**. После каждого релиза кратко сообщать, что изменено, что проверить и какие остались ограничения.
- **Правило обновления этого файла:** всегда ровно два смысловых блока — «ОБЩИЙ КОНТЕКСТ» и «ПОСЛЕДНЕЕ». При следующем изменении сначала сжать предыдущее «ПОСЛЕДНЕЕ» до 1–2 предложений и добавить по смыслу в «ОБЩИЙ КОНТЕКСТ» (без накопления подробного журнала), затем полностью заменить «ПОСЛЕДНЕЕ» новым изменением: дата, файлы, суть, проверка/риски. Не перезаписывать контекст без необходимости.
- **MONO:** `renderMono()` даёт отдельную анимированную презентацию, 3 изображения 9:16 в ряд с заглушками до загрузки. Блока «Моя работа» нет по требованию. Лишние плашки технологического стека у OPS и MONO удалены (коммит `481ec86a`). Галерея ссылается на `mono-home.png`, `mono-planning.png`, `mono-converter.png` в `assets/digital/` (коммит `8d217c9`; проверить наличие файлов).
- **Согласованные последние изменения:** верхние подписи MONO и КАДР в стиле OPS (IBM Plex Mono, лаймовые мигающие точки); оформление остальных вкладок не менять без запроса.
- **КАДР:** отдельный `renderKadr()` с анимациями, расчётом, галереей 3 PNG 9:16 и WhatsApp CTA. Изображения `assets/digital/kadr-{catalog,calculator,materials}.png` пользователь загружает вручную (коммиты `0be25f4`, `601b5f6`); до загрузки заглушки.

- **Прямая загрузка изображений через GitHub (обнаружен доступный способ, сквозной бинарный upload ещё НЕ проверен на практике):** не просить пользователя вручную загружать PNG/JPEG/WebP, пока не проверены доступные инструменты. Файлы, присланные в чат, сначала получить в исходных байтах через доступные вложения/контейнер; НЕ использовать скриншот интерфейса ChatGPT вместо оригинала. Проверить фактический размер, формат, расширение и желаемый путь в репозитории по исходному коду сайта. GitHub connector поддерживает `mcp__GitHub__create_blob({repository_full_name,content:<base64 bytes>,encoding:"base64"})`, затем `create_tree` (элемент `path`, `mode:"100644"`, `type:"blob"`, `sha`; с `base_tree_sha` текущего коммита), `create_commit` (`tree_sha`, `parent_sha`) и `update_ref` (`branch_name:"main"`, `sha`, без force, после сверки текущего HEAD). Следовать актуальной схеме инструментов и проверять результат каждого шага. Для картинок нельзя использовать `create_file/update_file`: они рассчитаны на UTF-8 текст. Если доступен только текстовый путь к вложению или Base64 невозможно безопасно передать в connector, честно сообщить об ограничении, не заявлять о загрузке. После коммита убедиться, что изображение реально доступно по `assets/...` и HTML/CSS/JS указывает на **точное имя и регистр** файла; при необходимости обновить путь в коде, не ломая другие проекты. Учитывать кэш GitHub Pages/Safari и давать пользователю прямую ссылку на страницу для проверки. Если изображение нужно только разместить, НЕ генерировать новое и НЕ перерисовывать его по собственной инициативе.
- **Как получать новые картинки от пользователя:** пользователь готовит изображения и ТЗ для раздела DESIGN; следующему чату нужно сначала открыть репозиторий и этот файл, прочитать `design.html`, CSS/JS и структуру `assets/`, затем принять готовые изображения как исходники и попробовать прямую публикацию через GitHub connector. Приоритет — самостоятельная работа разработчика с репозиторием, а не инструкции пользователю по ручной загрузке.

- **CognitioVerum / кейс №1:** 4 PNG в `assets/design/cognitioverum-{1,2,3,4}.png`; на DESIGN единая графитовая подложка у карточки, без подложек и рамок каждого изображения, фото с радиусом 20px. Исходники загружены напрямую через мост `sediment://` → Google Drive `upload_file` → `fetch` Base64 → GitHub `create_blob/tree/commit/update_ref`.

- **DESIGN:** desktop-кейсы шириной до 760px, мобильная вертикальная лента; у CognitioVerum отдельная сетка 4 изображений.
- **DESIGN кейс №2:** «Кафе Кимбап», два PNG `assets/design/kimbap-{1,2}.png`, меню и листовка без обрезки, общая подложка и радиус 20px. Последняя публикация кейса `03464f5`.
- **DESIGN исправление CSS:** устранён буквальный `\\n` между правилами мобильной версии CognitioVerum (`be6cf9e`); визуальная проверка на iPhone остаётся открытой.
- **DESIGN кейс №3:** AI-фотосессия для заведений Сочи, четыре оригинальных PNG `assets/design/sochi-ai-food-{1,2,3,4}.png`; сетка 2×2, скругления 20px, изображения для Яндекс Карт, 2ГИС и приложений доставки. Коммит `f6860eb`.
- **DESIGN кейс №4:** «Кофейня Кромка», визитка с двух сторон (`assets/design/kromka-1.png`, `kromka-2.png`) и флаер (`kromka-3.png`), коммит `257d9ca`. Первоначальная компоновка на iPhone была несбалансированной.
- **DESIGN Кромка — итерация 1:** по скриншоту уменьшены визитки и расширен флаер, но это нарушило выравнивание высот и не устранило угловатые края самих PNG (коммит `1925417`).
- **DESIGN Кромка — пропорции:** две визитки выровнены по общей высоте флаера; прозрачная кайма обрезается через `clip-path:inset(3% 2.5% round ...)`. Коммит `096d602`.
- **DESIGN Кромка — скругление 35px:** исключение для трёх PNG, первоначально использован `clip-path:inset(3% 2.5% round 35px)` (коммит `6897886`), но на iPhone углы оставались срезанными.
- **DESIGN Кромка — неудачная попытка:** `clip-path:inset(6% 6% round 35px)` вместе с `height:100%` и `object-fit:cover` привели к огромным обрезанным визиткам, перекрывающим подпись на iPhone (коммит `3293773`). Не повторять.
- **DESIGN Кромка:** после восстановления естественных пропорций (`6b98d9f`) пользователь подтвердил, что сетка и расположение идеальны, но в исходных PNG заметен белый контур по краям. Не менять расположение.
- **DESIGN Кромка — финальная корректировка:** в коммите `df3dd5c` скрыта встроенная белая кайма PNG через контейнеры с `overflow:hidden`, радиусом 20px и масштабированием изображений на 6.5%; расположение не менялось.
- **DESIGN кейс №5:** «Цветочная мастерская Дико», двусторонняя листовка, `assets/design/diko-{1,2}.jpg`, две вертикальные стороны рядом, радиус 20px (коммит `3095b3e`).
- **DESIGN кейс №6 удалён:** теперь на странице ровно пять завершённых кейсов, счётчик 01/05; `design.js` вычисляет число карточек автоматически (коммит `a2c8d7a`).
- **DESIGN редактура (2026-11-13):** согласованные описания всех пяти кейсов, вступления и CTA внесены дословно; мобильная подсказка прокрутки удалена (коммит `883af47`).
- **DESIGN Motion 1.0 (2026-11-13):** мобильное однократное появление кейсов и тонкие разделители с лаймовыми маркерами, с поддержкой reduced motion (коммит b2daa6b).
- **DIGITAL / Тихая бухта (2026-11-13):** три настоящих JPEG-скриншота (остров, ратуша, маяк), адаптивная галерея с увеличением по нажатию (коммит `1d203fd`).
- **DIGITAL / DO IT (2026-11-13):** убрана крупная декоративная звезда hero; остальная верстка сохранена.
- **Политика конфиденциальности (2026-11-13):** исправлены ссылки Telegram; коммиты `e9d5338` и `c7c6ed6`.
- **Privacy Notice 1.0 (2026-11-13):** общая информационная плашка, localStorage-флаг закрытия, обновлённая политика (коммит `6deac3a`).
- **Переключатель языка, подготовка (2026-11-13):** заменена Telegram-стрелка в шапке всех страниц, коммит `96b7047`.
- **Переключатель языка (2026-11-13):** флаговая лаймовая кнопка и меню 🇺🇸/🇬🇪; коммит `7f11cb7`. Пока тексты не переключаются.
- **I18N этап 1 (2026-11-13):** аудит исходников, `I18N_PLAN.md`, коммит `f1d829e`.
- **I18N этап 2 (2026-11-13):** RU/EN/KA главной страницы, коммит `c699f53`; словари и `i18n.js`.
- **I18N этап 3 (2026-11-13):** Design RU/EN/KA, коммит `d2abe9c`.
- **Digital i18n (2026-11-13):** RU/EN/KA подключены для `digital.html`, словари `digital` в `locales/en.js` и `locales/ka.js`; динамические панели переводятся через MutationObserver после рендера. Коммит `9ef80ca`.
- **DO IT локализация:** словарь Digital дополнен переводами заголовков, диалогов, кнопок, схем, текстов CSS-мокапов и экранов, которые создаёт `digital.js`; `i18n.js` переводит текст новых DOM-узлов. Растровые скриншоты приложения не локализуются этим механизмом.
- **DO IT интерактивный блок «Моя работа»:** описание `data.doit.contribution` и все четыре подробных состояния имеют EN/KA переводы; JS подставляет переводы непосредственно при клике, не полагаясь на MutationObserver для изменения textContent.
- **SL OPS локализация:** EN/KA переводы четырёх карточек функций, единиц кг и финального слогана добавлены в словари; перевод DOM при создании панелей выполняет `i18n.js`.
- **SEO, этап 1 (2026-11-13):** обновлены метаданные четырёх HTML-страниц; добавлены robots.txt и sitemap.xml. Google Search Console подтвердил владение, Google проиндексировал страницы; Bing успешно распознал 4 URL sitemap и подтвердил возможность индексации страниц. Не добавлять hreflang до отдельных языковых URL.

- **GA4 (2026-11-13):** Google Analytics 4 ID `G-76533XR7NF` установлен в `<head>` всех 6 HTML-страниц (главная, Digital, Design, Privacy RU/EN/KA) через официальный `gtag/js` и `gtag('config',...)`. Пользовательский скрин показывал некорректный для G-ID путь `gtm.js`, поэтому применён правильный `gtag/js`. Политика конфиденциальности RU/EN/KA обновлена для раскрытия аналитики. Визуальный контент и стили не менялись. Проверить Realtime в GA4 и наличие единственного тега на странице.
- **GA4 события (2026-11-13):** в `brand-site.js` добавлен делегированный обработчик `contact_click` для Telegram/WhatsApp/email (параметры `contact_method`, `contact_placement`, `page_path`), а `contact_navigation` учитывается отдельно и не является заявкой. Все 6 HTML-страниц загружают `brand-site.js?v=6`; тексты и дизайн не менялись.
- **GA4 contact events (2026-11-13):** делегированное событие `contact_click` в `brand-site.js`, счётчик переходов не является заявкой.
- **SERVICES 1.0 (2026-11-14):** `services.html`, `services.css`, цены из листа «Прайс», пункт меню, sitemap, SEO. Контактный блок первоначально был компактным с одной кнопкой WhatsApp.
- **SERVICES CTA v1.1 (2026-11-14):** контактная панель страницы услуг повторяет дизайн CTA Design с двумя действующими контактными ссылками.
- **SERVICES cards v1.2 (2026-11-14):** семь услуг оформлены отдельными графитовыми карточками с краткими описаниями и тегами состава работ.
- **SERVICES v1.3 (2026-11-14):** семь карточек с вертикальными тематическими мини-плашками; графический дизайн также оформлен отдельной карточкой.
- **SERVICES v1.4 (2026-11-14):** восемь тематических SVG-контуров на карточках услуг и дизайна; исправлено подчёркивание стрелки ссылки на Design.
- **SERVICES v1.5 (2026-11-15):** мягкое свечение и пульсация старых контуров; заменены в v1.6 на содержательные SVG-сцены.
- **SERVICES v1.6 (2026-11-15):** восемь детальных тематических SVG с анимацией отдельных деталей, поддержка reduced motion. В v1.7 уточнены два неудачных сюжета.
- **SERVICES v1.7:** SVG многостраничного сайта и доработки заменены на понятные интерфейсные сюжеты.
- **SERVICES v1.8:** удалены крупные курсоры из первых двух SVG, добавлены анимации интерфейса и навигации.

- **Главная (2026-11-15):** под CTA добавлена локализованная RU/EN/KA ссылка на цены (`services.html`), стили `.hero-pricing` в `brand-site.css`.

- **Услуги (2026-11-15):** в `services.css` исправлено наложение SVG и цен на ПК при масштабировании; цена и иллюстрация разделены по ячейкам CSS Grid (коммит `25135dc9`).

- **Design DARIUS (2026-11-15):** первый кейс с двумя WebP, дизайн и печать 100 сертификатов через КАДР; CognitioVerum перемещён на второе место, всего шесть кейсов, RU/EN/KA.\n\n- **DARIUS (2026-11-15):** мобильная сетка исправлена: изображения вертикально с gap 8px, без растянутых строк.\n\n- **DARIUS:** ПК-компоновка с изображениями слева и текстом справа.

- **DESIGN:** семь проектов, восемь товарных WebP, фильтры и галерея; пользователь подтвердил загрузку фото и текстов.

- **DESIGN (2026-11-24):** компактный каталог с квадратными обложками и диалогами проектов утверждён пользователем.

- **Главная (2026-11-24):** отдельный home-motion.js, анимации появления и прокрутки, reduced motion.

- **Главная:** усилена бегущая подсветка текста «Обо мне», обводка 0.65px, мягкое свечение.

- **Главная:** исправлена прокрутка на iPhone, пользователь подтвердил плавность.

## ПОСЛЕДНЕЕ

- **2026-11-25:** Services configurator v1: services-config.json из актуального листа «Прайс» (26 услуг, 108 видимых привязок допов), services-configurator.js/css, services.html. Поддержка из T, разовые/месячные суммы, количество, языки, корзина дизайна, копирование, мессенджеры, GA4. По запросу скрыты; индивидуальная оценка не суммируется. Ограничения: описания из таблицы RU, EN названия, KA интерфейс без полного перевода каталога; условные пересечения объёма требуют согласования, браузерный тест не проводился. Проверить iPhone, расчёт, копирование и ссылки.

- **2026-11-25, configurator v2:** compact options, collapsed scope and limits, inline info, quantity from zero, direct language addition, switches, optional collapsed comment. Support remains opt-in; drafts retained until reset. No catalogue price changes. JS syntax checked, browser test pending.

- **2026-11-25, configurator v3:** focus on heading instead of close button; independent modal details (bottom sheet on mobile, centered desktop), no layout shifts; public JSON wording addressed to visitor as Вы, prices and rules unchanged. Source sheet not edited. JS syntax checked; browser verification pending.

- **2026-11-25, configurator v4:** shorter customer-facing names and selected descriptions, no internal billing codes in edited copy, unified support toggle with info, price/unit combined in details, compact footer and reset link, preserve disclosure state on same-size rerender. Public JSON only; prices unchanged. JS syntax checked; browser test pending.

- **2026-11-25, catalogue copy v5:** reviewed all 26 base services and 64 unique add-ons (108 bindings); simplified Russian public descriptions, names and limits; removed redundant price references and internal jargon. Verified price, unit, payment, model, support and dependency fields unchanged. Public JSON only; source sheet and translations unchanged. Browser test pending.

- **2026-11-25, services catalogue v6:** 26 square cards, category filters, 2 mobile / 3 desktop / 4 wide columns, static CSS cover compositions (not generated photos), old inline SVG rows removed, card opens existing configurator. Design cards seed the shared design basket; calculator and JSON unchanged. Static fallback prices remain in HTML. RU/EN summaries, KA catalogue content still partial. JS syntax checked; real browser test pending.

- **Catalogue v8:** hide QR-S01/02/03 from public grid and HTML fallback (23 cards); keep linked support data and totals. Linked support options render below toggle, removed from order on disable. CSS arrows and top-aligned grid. Syntax checked; Safari verification pending.

- Desktop configurator polish: explicitly center messenger and copy button labels using flex; dark thin body scrollbar; CSS cache v6. Browser verification pending.

- Customer copy pass: clarified monthly QR/site checks and technical terms in service JSON; all non-copy fields verified unchanged. Removed repeated monthly units in info panels. Google Sheets source not edited; browser test pending.

- Refined QR and website maintenance descriptions: monthly technical checks, not merely checking whether a page opens. Pricing and scope limits retained.

- **2026-11-25, configurator v9 QA:** compared live price sheet and JSON: 26 base records, 134 active add-on bindings, 108 visible; 26 request-only bindings intentionally omitted. Prices, units, payment, model, dependencies and support match; public copy preserved. Added pure services-rules.js, base language validation and common alias deduplication, overlap guard for menu layout/content, explicit discuss controls, CRM form condition and messenger fallback copy. Added tests/services.test.cjs; 11 pure rule checks passed in JS execution; browser/Safari and full EN/KA copy still pending. No sheet changes or images.

- **2026-11-25, configurator v10 localization:** added EN/KA catalogue translations keyed by service/add-on code, translated units and modal copy; verified coverage of 26 base records, 64 unique visible add-ons and all units. Original Russian JSON and pricing unchanged. Browser and native Georgian proofreading pending.

- **2026-11-25, catalogue covers:** verified all 23 uploaded WebP names in assets/services against visible service IDs; connected square images via lowercase service code, empty decorative alt, first four eager and remaining lazy, async decoding, existing CSS fallback on image error. Grid, filters, prices and order logic unchanged. Cache versions: catalogue CSS v3, configurator JS v12. Browser/Safari verification pending.
