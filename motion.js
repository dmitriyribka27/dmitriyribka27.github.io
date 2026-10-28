(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progressBar = document.querySelector('.reading-progress-bar');
  const chapterJump = document.querySelector('[data-chapter-jump]');
  const chapterCount = document.querySelector('[data-chapter-count]');
  const chapterLabel = document.querySelector('[data-chapter-label]');

  const chapters = [
    ['top', 'НАЧАЛО'],
    ['problems', 'ЗАДАЧИ'],
    ['projects', 'ПРОЕКТЫ'],
    ['services', 'УСЛУГИ'],
    ['approach', 'ПОДХОД'],
    ['about', 'ОБО МНЕ'],
    ['design', 'ДИЗАЙН'],
    ['contact', 'СВЯЗЬ'],
  ].map(([id, label]) => ({ element: document.getElementById(id), id, label }))
    .filter(chapter => chapter.element);

  let scrollFrame = 0;
  const updateScrollState = () => {
    scrollFrame = 0;
    const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    if (progressBar) progressBar.style.transform = `scaleX(${progress})`;

    if (!chapterJump || !chapters.length) return;
    const boundary = window.innerHeight * 0.38;
    let activeIndex = 0;
    for (let index = 0; index < chapters.length; index += 1) {
      if (chapters[index].element.getBoundingClientRect().top <= boundary) activeIndex = index;
    }
    const nextIndex = activeIndex === chapters.length - 1 ? 0 : activeIndex + 1;
    const next = chapters[nextIndex];
    const isReturn = nextIndex === 0;
    chapterJump.href = `#${next.id}`;
    chapterJump.setAttribute('aria-label', isReturn ? 'Вернуться к началу страницы' : `Следующий раздел: ${next.label.toLowerCase()}`);
    if (chapterCount) chapterCount.innerHTML = `${String(activeIndex).padStart(2, '0')} <small>/ ${String(chapters.length - 1).padStart(2, '0')}</small>`;
    if (chapterLabel) chapterLabel.textContent = isReturn ? 'ВЕРНУТЬСЯ НАВЕРХ' : `ДАЛЬШЕ: ${next.label}`;
    const arrow = chapterJump.querySelector('.chapter-jump-arrow');
    if (arrow) arrow.textContent = isReturn ? '↑' : '↓';
  };
  const scheduleScrollState = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollState);
  };
  window.addEventListener('scroll', scheduleScrollState, { passive: true });
  window.addEventListener('resize', scheduleScrollState, { passive: true });
  updateScrollState();

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll([
      '.section-heading', '.project-card', '.projects-end', '.service-item',
      '.approach-header', '.approach-steps > div', '.about-layout',
      '.design-teaser-copy', '.design-teaser-visual',
      '.contact > h2', '.contact > p:not(.contact-note)', '.contact > .button',
      '.case-hero', '.case-showcase', '.case-explainer-grid',
      '.portfolio-page-intro', '.digital-hero-display', '.design-hero-collage',
      '.capability-grid > article', '.design-feature-card', '.design-case-tile',
      '.design-result-note', '.design-category-card', '.design-process-grid',
      '.portfolio-next-copy',
      '.problem-section h2', '.problem-card', '.proof-heading',
      '.services-v3 h2', '.services-v3-list article',
      '.approach-v3 h2', '.approach-v3-grid > div',
      '.about-v3-grid', '.design-v3-layout',
      '.contact-v3 h2', '.contact-v3 > p', '.contact-v3-actions',
    ].join(','));
    revealTargets.forEach(element => element.setAttribute('data-reveal', ''));
    root.classList.add('motion-active');
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -5% 0px' });
    revealTargets.forEach(element => observer.observe(element));
  }

  const art = document.querySelector('.hero-art');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!art || reducedMotion || !finePointer) return;

  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  const renderDepth = () => {
    pointerFrame = 0;
    art.style.setProperty('--front-x', `${(pointerX * 18).toFixed(2)}px`);
    art.style.setProperty('--front-y', `${(pointerY * 14).toFixed(2)}px`);
    art.style.setProperty('--back-x', `${(-pointerX * 10).toFixed(2)}px`);
    art.style.setProperty('--back-y', `${(-pointerY * 8).toFixed(2)}px`);
  };
  art.addEventListener('pointermove', event => {
    const rect = art.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderDepth);
  }, { passive: true });
  art.addEventListener('pointerleave', () => {
    pointerX = 0;
    pointerY = 0;
    if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderDepth);
  });
})();
