const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'digital.html', 'design.html', 'project.html'];
const source = name => fs.readFileSync(path.join(root, name), 'utf8');

test('all local links, anchors, scripts and stylesheet references resolve', () => {
  for (const page of pages) {
    const content = source(page);
    const references = [...content.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)].map(match => match[1]);
    for (const reference of references) {
      if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;
      const url = new URL(reference, `https://example.test/${page}`);
      const target = decodeURIComponent(url.pathname).replace(/^\//, '') || 'index.html';
      const localFile = path.join(root, target);
      assert.ok(fs.existsSync(localFile), `${page} contains missing reference: ${reference}`);
      if (url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        assert.ok(new RegExp(`\\bid=["']${id}["']`).test(source(target)), `${page} targets missing anchor: ${reference}`);
      }
    }
  }
});

test('MONO is consistently a completed product and public demonstrations are separated from personal data', () => {
  for (const page of ['index.html', 'digital.html', 'project.html']) {
    const content = source(page);
    assert.match(content, /MONO Finance/);
    assert.doesNotMatch(content, /В публичной версии здесь появятся настоящие экраны|Полный доступ к демоверсии добавим/);
  }
  assert.match(source('digital.html'), /ГОТОВОЕ И РАБОТАЮЩЕЕ PWA/);
  assert.match(source('project.html'), /Полностью разработанное и работающее PWA/);
  assert.match(source('project.html'), /ПУБЛИЧНАЯ ДЕМОНСТРАЦИЯ.*УСЛОВНЫХ ДАННЫХ/);
});

test('services and commercial experience are first-class, honest parts of the portfolio', () => {
  const home = source('index.html');
  const digital = source('digital.html');
  assert.match(home, /Сайты<br \/>для бизнеса/);
  assert.match(home, /Веб-приложения<br \/>и автоматизация/);
  assert.ok(home.indexOf('id="services"') < home.indexOf('id="projects"'));
  assert.match(home, /операционный директор/i);
  assert.match(home, /Sea Livery/);
  assert.match(home, /WordPress/);
  assert.match(home, /Поддержк|поддержк/);
  assert.match(digital, /Пасека Шкрюм/);
  assert.match(source('project.html'), /Типографическое представление проекта. Это не скриншот/);
  assert.doesNotMatch(home, /Sea Delivery|сервис доставки Sea Livery/);
});

test('home demo still works in markup and the secondary MONO demo remains accessible', () => {
  const home = source('index.html');
  assert.match(home, /data-demo-input="orders"/);
  assert.match(home, /data-demo-result="breakEven"/);
  assert.match(home, /<details class="mono-more-demo">/);
  assert.match(home, /data-mono-calculator/);
});

test('public pages have metadata and basic accessible media', () => {
  for (const page of pages) {
    const html = source(page);
    assert.match(html, /<meta name="description"/);
    assert.match(html, /<meta property="og:image"/);
    const images = html.match(/<img\b[^>]*>/g) || [];
    for (const img of images) assert.match(img, /\balt=["']/, `${page} has image without alt text`);
  }
  assert.match(source('digital-showcase-v9.js'), /lightboxTrigger\?\.focus\(\)/);
  assert.match(source('app.js'), /event\.key === 'Escape'/);
});
