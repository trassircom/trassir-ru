// Homepage v1 only. Selection previews a product; the separate link navigates.
document.addEventListener('DOMContentLoaded', () => {
  const explorer = document.querySelector('.home-page .hv-explorer');
  if (!explorer) return;
  const controls = [...explorer.querySelectorAll('[data-eco-product]')];
  const picker = explorer.querySelector('#hv-product-select');
  const image = explorer.querySelector('#hv-product-image');
  const imageLink = explorer.querySelector('.hv-product-enlarge');
  const panel = explorer.querySelector('#eco-details');
  const show = control => {
    if (!control) return;
    const key = control.dataset.ecoProduct;
    const template = explorer.querySelector('#eco-content-' + key);
    const title = template.content.querySelector('h4').textContent;
    explorer.querySelector('#eco-title').textContent = title;
    explorer.querySelector('#eco-description').textContent = template.content.querySelector('p').textContent;
    explorer.querySelector('.eco-detail-link').href = control.dataset.productHref;
    image.src = control.dataset.productImage;
    image.alt = title + ' — TRASSIR';
    imageLink.href = control.dataset.productImage;
    imageLink.setAttribute('aria-label', 'Открыть изображение: ' + title);
    controls.forEach(item => {
      const selected = item === control;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    picker.value = key;
    panel.hidden = false;
  };
  controls.forEach((control, index) => {
    control.addEventListener('click', () => show(control));
    control.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % controls.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + controls.length) % controls.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = controls.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      show(controls[next]);
      controls[next].focus();
    });
  });
  picker.addEventListener('change', () => show(controls.find(item => item.dataset.ecoProduct === picker.value)));
  show(controls.find(item => item.getAttribute('aria-pressed') === 'true') || controls[0]);
});

// Explicit local validation and an honest demo notice. No network or submission.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('home-request');
  if (!form) return;
  const fields = [...form.querySelectorAll('input')];
  const status = document.getElementById('home-request-status');
  const validate = field => {
    const value = field.value.trim();
    let message = '';
    if (!value) message = { name: 'Введите имя.', phone: 'Введите телефон.', email: 'Введите email.' }[field.name];
    else if (field.name === 'email' && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || field.validity?.typeMismatch)) message = 'Укажите email в формате name@company.ru.';
    else if (field.name === 'phone' && !/^[+()\d\s.\-]+$/.test(value)) message = 'Используйте цифры и знаки + ( ) — в номере телефона.';
    else if (field.name === 'phone' && (value.replace(/\D/g, '').length < 7 || value.replace(/\D/g, '').length > 15)) message = 'Проверьте номер телефона: от 7 до 15 цифр.';
    const error = document.getElementById(field.id + '-error');
    field.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
    error.hidden = !message;
    return !message;
  };
  const check = () => {
    status.hidden = true;
    const invalid = fields.filter(field => !validate(field));
    if (invalid.length) {
      invalid[0].focus();
      status.textContent = 'Проверьте отмеченные поля. Данные не отправлены.';
      status.hidden = false;
      return;
    }
    status.textContent = 'Это демонстрационная форма: отправка заявок пока не подключена. Введённые данные никуда не отправлены.';
    status.hidden = false;
  };
  fields.forEach(field => {
    field.addEventListener('blur', () => { if (field.value || field.hasAttribute('aria-invalid')) validate(field); });
    field.addEventListener('input', () => {
      status.hidden = true;
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
    });
    field.addEventListener('keydown', event => {
      if (event.key === 'Enter') { event.preventDefault(); check(); }
    });
  });
  form.addEventListener('submit', event => { event.preventDefault(); check(); });
  document.getElementById('home-request-button').addEventListener('click', check);
});

// Keep focus inside the open homepage menu; the shared script handles closing.
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.home-page .demo-header');
  if (!header) return;
  const toggle = header.querySelector('.demo-toggle');
  const menu = header.querySelector('.demo-nav');
  header.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (link && !menu.hidden && !menu.contains(link)) toggle.click();
  });
  header.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || menu.hidden) return;
    const links = [...menu.querySelectorAll('a[href]')];
    const last = links[links.length - 1];
    if (event.shiftKey && event.target === toggle) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && event.target === last) { event.preventDefault(); toggle.focus(); }
  });
});
