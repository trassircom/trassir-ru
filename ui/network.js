document.addEventListener('DOMContentLoaded',()=>{
 const form=document.getElementById('network-request');
 const show=()=>{if(!form.reportValidity())return;const status=document.getElementById('network-status');status.hidden=false;status.textContent='Это демонстрационная форма. Запрос не отправлен, данные не сохраняются.';};
 document.getElementById('network-send').addEventListener('click',show);
 form.addEventListener('submit',e=>{e.preventDefault();show();});
});
