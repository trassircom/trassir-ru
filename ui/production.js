document.addEventListener('DOMContentLoaded',()=>{
 const dialog=document.getElementById('tour-dialog');
 const open=document.getElementById('open-tour');
 const close=()=>dialog.close();
 open.addEventListener('click',()=>dialog.showModal());
 dialog.querySelector('.dialog-close').addEventListener('click',close);
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
 dialog.addEventListener('close',()=>open.focus());
 document.getElementById('send-tour').addEventListener('click',()=>{
  if(!document.getElementById('production-request').reportValidity())return;
  const status=document.getElementById('tour-status');
  status.textContent='Это демонстрационная форма. Заявка не отправлена: запись на экскурсию пока не подключена.';
  status.hidden=false;
 });
});
