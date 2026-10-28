(() => {
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('#mobile-nav');
  if (menuButton && mobileNav) {
    const closeMenu = () => {
      mobileNav.hidden = true;
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Открыть меню');
    };
    menuButton.addEventListener('click', () => {
      const willOpen = mobileNav.hidden;
      mobileNav.hidden = !willOpen;
      menuButton.setAttribute('aria-expanded', String(willOpen));
      menuButton.setAttribute('aria-label', willOpen ? 'Закрыть меню' : 'Открыть меню');
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !mobileNav.hidden) {
        closeMenu();
        menuButton.focus();
      }
    });
  }

  const reveal = document.querySelector('[data-contact-reveal]');
  const note = document.querySelector('#contact-note');
  if (reveal && note) reveal.addEventListener('click', () => { note.hidden = false; note.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); });

  const monoCase = document.getElementById('mono-case');
  const bayCase = document.getElementById('bay-case');
  const shkryumCase = document.getElementById('shkryum-case');
  if (monoCase && bayCase && shkryumCase) {
    const requested = new URLSearchParams(window.location.search).get('id');
    const active = requested === 'bay' || requested === 'shkryum' ? requested : 'mono';
    monoCase.hidden = active !== 'mono';
    bayCase.hidden = active !== 'bay';
    shkryumCase.hidden = active !== 'shkryum';
    const titles = { mono: 'MONO Finance', bay: 'Тихая бухта', shkryum: 'Пасека Шкрюм' };
    document.title = `${titles[active]} — Дмитрий Рыбка`;
  }

  const features = {
    accounts: { label: 'СЧЕТА И ВАЛЮТЫ', value: '4 счёта', detail: 'USD · GEL · RUB — условные данные', bars: [34, 66, 48, 85, 55, 72] },
    reserves: { label: 'ДОСТУПНО К ТРАТАМ', value: '$1,750', detail: 'После учёта запланированных резервов', bars: [41, 58, 48, 78, 60, 88] },
    input: { label: 'БЫСТРЫЙ ВВОД', value: 'Кофе 12 GEL', detail: 'Пример записи обычным текстом', bars: [45, 52, 74, 40, 63, 82] },
    analytics: { label: 'АНАЛИТИКА РАСХОДОВ', value: '₾ 1,285', detail: 'Пример суммы трат за период', bars: [76, 42, 61, 49, 86, 66] }
  };
  const featureButtons = document.querySelectorAll('[data-feature]');
  const screenLabel = document.querySelector('[data-screen-label]');
  const screenValue = document.querySelector('[data-screen-value]');
  const screenDetail = document.querySelector('[data-screen-detail]');
  const bars = document.querySelectorAll('[data-chart-bars] span');
  if (featureButtons.length && screenLabel && screenValue && screenDetail) {
    featureButtons.forEach(button => button.addEventListener('click', () => {
      const f = features[button.dataset.feature];
      if (!f) return;
      featureButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      screenLabel.textContent = f.label;
      screenValue.textContent = f.value;
      screenDetail.textContent = f.detail;
      bars.forEach((bar, i) => { bar.style.height = `${f.bars[i]}%`; });
    }));
  }
})();
