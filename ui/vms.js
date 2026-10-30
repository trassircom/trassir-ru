(() => {
  const form = document.getElementById('vms-request');
  if (!form) return;
  const phone = form.elements.namedItem('phone');
  const validatePhone = () => {
    const digits = phone.value.replace(/\D/g, '');
    phone.setCustomValidity(digits.length >= 10 && digits.length <= 15 ? '' : 'Введите номер телефона: от 10 до 15 цифр.');
  };
  phone.addEventListener('input', validatePhone);
  form.querySelector('button[type="submit"]').addEventListener('click', validatePhone);
  // Run before the shared navigation's document-level submit guard.
  window.addEventListener('submit', event => {
    if (event.target !== form) return;
    event.preventDefault();
    validatePhone();
    if (!form.reportValidity()) return;
    const status = document.getElementById('vms-status');
    status.hidden = false;
    status.textContent = 'Демонстрационный режим: запрос не отправлен, данные не сохраняются.';
  }, true);
})();
