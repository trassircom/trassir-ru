document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('.ecosystem-map').forEach(map=>{
 const panel=map.querySelector('.eco-details'), controls=[...map.querySelectorAll('[data-eco-product]')]; let active=null, pointerType="";
 const show=control=>{const fragment=map.querySelector('#eco-content-'+control.dataset.ecoProduct).content;map.querySelector('#eco-title').textContent=fragment.querySelector('h4').textContent;map.querySelector('#eco-description').textContent=fragment.querySelector('p').textContent;map.querySelector('.eco-detail-link').href=control.getAttribute('href');controls.forEach(c=>c.classList.toggle('is-active',c===control));active=control;panel.hidden=false;};
 controls.forEach(control=>{control.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')show(control)});control.addEventListener('pointerdown',event=>{pointerType=event.pointerType});control.addEventListener('focus',()=>{if(pointerType!=='touch'&&pointerType!=='pen')show(control)});control.addEventListener('click',event=>{if((event.pointerType==='touch'||event.pointerType==='pen')&&(active!==control||panel.hidden)){event.preventDefault();show(control)}})});
 const hide=()=>{panel.hidden=true;controls.forEach(c=>c.classList.remove('is-active'));};
 map.querySelector('.eco-close').addEventListener('click',()=>{if(active)active.focus();hide()});
 map.addEventListener('keydown',event=>{pointerType='';if(event.key==='Escape'){if(active)active.focus();hide()}});
 });
});
