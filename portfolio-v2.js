(() => {
  const dialog = document.getElementById('design-lightbox');
  if (!dialog) return;

  const image = dialog.querySelector('[data-lightbox-image]');
  const caption = dialog.querySelector('[data-lightbox-caption]');
  const closeButton = dialog.querySelector('[data-lightbox-close]');
  const previous = dialog.querySelector('[data-lightbox-prev]');
  const next = dialog.querySelector('[data-lightbox-next]');
  const counter = dialog.querySelector('[data-lightbox-count]');
  const works = Array.from(document.querySelectorAll('[data-lightbox-src]'));
  let lastTrigger = null;
  let activeIndex = 0;

  function showWork(index) {
    if (!works.length) return;
    activeIndex = (index + works.length) % works.length;
    const work = works[activeIndex];
    image.src = work.dataset.lightboxSrc;
    image.alt = work.dataset.lightboxCaption || 'Дизайн-работа';
    caption.textContent = work.dataset.lightboxCaption || 'Работа';
    if (counter) counter.textContent = `${activeIndex + 1} / ${works.length}`;
  }

  works.forEach((button, index) => {
    button.addEventListener('click', () => {
      lastTrigger = button;
      showWork(index);
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else window.location.href = image.src;
    });
  });

  previous?.addEventListener('click', () => showWork(activeIndex - 1));
  next?.addEventListener('click', () => showWork(activeIndex + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showWork(activeIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showWork(activeIndex + 1); }
  });
  closeButton?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    lastTrigger?.focus();
  });
})();
