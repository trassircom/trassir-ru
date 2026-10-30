document.addEventListener('DOMContentLoaded',()=>{
 const form=document.getElementById('cms-request');
 const show=()=>{if(!form.reportValidity())return;const status=document.getElementById('cms-status');status.hidden=false;status.textContent='Это демонстрационная форма. Запрос не отправлен, данные не сохраняются.';};
 document.getElementById('cms-send').addEventListener('click',show);
 form.addEventListener('submit',e=>{e.preventDefault();show();});
});
