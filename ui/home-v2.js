document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('.home-v2 [role="tablist"]').forEach(list=>{
  const tabs=[...list.querySelectorAll('[role="tab"]')];
  function select(index,focus=false){
   tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;const panel=document.getElementById(tab.getAttribute('aria-controls'));panel.hidden=i!==index;panel.inert=i!==index;});
   if(focus)tabs[index].focus();
  }
  tabs.forEach((tab,i)=>{
   tab.addEventListener('click',()=>select(i));
   tab.addEventListener('keydown',e=>{
    let next=i;
    if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%tabs.length;
    else if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i+tabs.length-1)%tabs.length;
    else if(e.key==='Home')next=0;
    else if(e.key==='End')next=tabs.length-1;
    else return;
    e.preventDefault();select(next,true);
   });
  });
 });
 const form=document.getElementById('v2-request');
 function showDemo(){
  if(!form.reportValidity())return;
  const status=document.getElementById('v2-request-status');
  status.hidden=false;status.textContent='Это демонстрационная форма. Запрос не отправлен, данные не сохраняются.';
 }
 document.getElementById('v2-request-button').addEventListener('click',showDemo);
 form.addEventListener('submit',e=>{e.preventDefault();showDemo();});
});
