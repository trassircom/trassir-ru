(() => {
  const form = document.getElementById('psim-request');
  if (!form) return;
  const phone = form.elements.namedItem('phone');
  const checkPhone = () => {
    const digits = phone.value.replace(/\D/g, '');
    phone.setCustomValidity(digits.length >= 10 && digits.length <= 15 ? '' : 'Введите номер телефона: от 10 до 15 цифр.');
  };
  phone.addEventListener('input', checkPhone);
  const showDemo = () => {
    checkPhone();
    if (!form.reportValidity()) return;
    const status = document.getElementById('psim-status');
    status.hidden = false;
    status.textContent = 'Демонстрационный режим: запрос не отправлен, данные не сохраняются.';
  };
  // Window capture runs before the shared menu's legacy submit guard.
  // Both clicking the button and pressing Enter reach the same local demo.
  window.addEventListener('submit', event => {
    if (event.target !== form) return;
    event.preventDefault();
    showDemo();
  }, true);
  form.querySelector('button[type="submit"]').addEventListener('click', checkPhone);
})();
