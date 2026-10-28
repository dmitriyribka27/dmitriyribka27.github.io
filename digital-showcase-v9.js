/* Four independent, synthetic demonstrations. No external data is read or sent. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  // OPS — test-data order filtering.
  const orderButtons = $$('[data-order-filter]');
  const orderCards = $$('[data-order-state]');
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const active = button.dataset.orderFilter;
      orderButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      orderCards.forEach((card) => {
        card.hidden = active !== 'all' && card.dataset.orderState !== active;
      });
    });
  });

  // MONO — a deliberately single-currency example, not banking software.
  const monoInputs = {
    balance: $('#mono-balance-input'),
    reserve: $('#mono-reserve-input'),
    bills: $('#mono-bills-input'),
  };
  const maxInput = 10000000;
  const getAmount = (element) => {
    if (!element) return 0;
    const value = Number(element.value);
    return Number.isFinite(value) ? Math.min(maxInput, Math.max(0, value)) : 0;
  };
  const money = (value) => new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value) + ' $';
  function renderMono() {
    const total = getAmount(monoInputs.balance);
    const reserved = getAmount(monoInputs.reserve);
    const bills = getAmount(monoInputs.bills);
    const free = Math.max(0, total - reserved - bills);
    const percent = total > 0 ? Math.round(free / total * 100) : 0;
    $('#mono-total').textContent = money(total);
    $('#mono-reserved-row').textContent = '−' + money(reserved);
    $('#mono-obligations-row').textContent = '−' + money(bills);
    $('#mono-available').textContent = money(free);
    $('#mono-percent').textContent = percent + '%';
    $('.dg-mono-dial').style.background =
      'conic-gradient(#b4f665 0 ' + percent + '%, #5a806e ' + percent + '% 100%)';
  }
  Object.values(monoInputs).forEach((input) => input?.addEventListener('input', renderMono));
  $('#mono-reset')?.addEventListener('click', () => {
    monoInputs.balance.value = 2400;
    monoInputs.reserve.value = 400;
    monoInputs.bills.value = 250;
    renderMono();
  });
  if (Object.values(monoInputs).every(Boolean)) renderMono();

  // BASE — XP is derived from checked tasks, never incremented on every click.
  const quests = $$('.dg-quest');
  function renderBase() {
    const checked = quests.filter((quest) => quest.checked);
    const totalXp = checked.reduce((sum, quest) => sum + Number(quest.dataset.xp || 0), 0);
    $('#base-xp').textContent = String(totalXp);
    $('#base-progress-bar').style.width = Math.min(totalXp, 100) + '%';
    $('#base-quest-count').textContent = checked.length + ' из ' + quests.length + ' квестов выполнено';
  }
  quests.forEach((quest) => quest.addEventListener('change', renderBase));
  $('#base-reset')?.addEventListener('click', () => {
    quests.forEach((quest) => { quest.checked = false; });
    renderBase();
  });
  if (quests.length) renderBase();

  // Quiet Bay — the artwork is concept art, not a screenshot of the game.
  const bayLocations = Object.freeze({
    cafe: {
      image: 'assets/digital/bay-cafe.webp',
      title: 'Кофейня Рыжего',
      description: 'Тёплое место для остановки, встреч и разговоров. У каждого кота на острове есть своё дело.',
      alt: 'Концепт-иллюстрация кофейни Рыжего',
    },
    library: {
      image: 'assets/digital/bay-library.webp',
      title: 'Книжная лавка Цитеры',
      description: 'Полки с книгами, тихий свет и отдельные маленькие истории, которые можно открыть во время прогулки.',
      alt: 'Концепт-иллюстрация книжной лавки Цитеры',
    },
    restaurant: {
      image: 'assets/digital/bay-restaurant.webp',
      title: 'Ресторан Беллы',
      description: 'Здесь работает мини-игра с приготовлением блюд: рецепты, ингредиенты, рабочие смены и награда.',
      alt: 'Концепт-иллюстрация ресторана',
    },
    night: {
      image: 'assets/digital/bay-night.webp',
      title: 'Остров после заката',
      description: 'Мир меняет настроение от времени суток: это влияет на визуальное восприятие привычных мест.',
      alt: 'Ночная концепт-иллюстрация островного мира',
    },
  });
  $$('[data-bay-location]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = bayLocations[button.dataset.bayLocation];
      if (!value) return;
      $$('[data-bay-location]').forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      const image = $('#bay-location-image');
      image.src = value.image;
      image.alt = value.alt;
      $('#bay-location-title').textContent = value.title;
      $('#bay-location-description').textContent = value.description;
    });
  });

  // Enlarge the same curated product view used in the gallery.
  const lightbox = $('#dg-lightbox');
  const lightboxImage = $('#dg-lightbox-image');
  const lightboxCrop = $('#dg-lightbox-crop');
  const lightboxCaption = $('#dg-lightbox-caption');
  const closeButton = $('#dg-lightbox-close');
  let lightboxTrigger = null;
  $$('[data-dg-image]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!lightbox || !lightboxImage || typeof lightbox.showModal !== 'function') return;
      const sourceCrop = trigger.querySelector('.dg-shot-crop');
      if (lightboxCrop && sourceCrop) lightboxCrop.className = sourceCrop.className;
      lightboxImage.src = trigger.dataset.dgImage;
      lightboxImage.alt = trigger.querySelector('img')?.alt || '';
      lightboxCaption.textContent = trigger.dataset.dgCaption || '';
      lightboxTrigger = trigger;
      lightbox.showModal();
    });
  });
  closeButton?.addEventListener('click', () => lightbox?.close());
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox?.addEventListener('close', () => {
    lightboxTrigger?.focus();
  });
})();
