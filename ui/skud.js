document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('.skud-page [role="tablist"]').forEach(list=>{
  const tabs=[...list.querySelectorAll('[role="tab"]')];
  function select(index,focus=false){
   tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;document.getElementById(tab.getAttribute('aria-controls')).hidden=i!==index;});
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
 const form=document.getElementById('skud-request');
 function showDemo(){
  if(!form.reportValidity())return;
  const status=document.getElementById('skud-status');
  status.hidden=false;status.textContent='Это демонстрационная форма. Запрос не отправлен, данные не сохраняются.';
 }
 document.getElementById('skud-send').addEventListener('click',showDemo);
 form.addEventListener('submit',e=>{e.preventDefault();showDemo();});
});
