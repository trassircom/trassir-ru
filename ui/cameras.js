document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('request-preview');
  const form = document.getElementById('camera-request');
  const status = document.getElementById('request-status');
  button.addEventListener('click', () => {
    if (!form.reportValidity()) return;
    status.hidden = false;
    status.textContent = 'Это первая версия формы: отправка заявок пока не подключена. Введённые данные никуда не отправлены.';
  });
});
