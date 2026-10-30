document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('partner-request');
  const status = document.getElementById('partner-request-status');
  document.getElementById('partner-request-button').addEventListener('click', () => {
    if (!form.reportValidity()) return;
    status.hidden = false;
    status.textContent = 'Это демонстрационная форма: отправка заявок пока не подключена. Данные не отправлены. Чтобы обсудить участие, напишите на order@trassir.com.';
  });

  // Progressively enhance the full content: without JS every article remains visible.
  const tools = document.querySelector('.partner-tools');
  const panels = [...tools.querySelectorAll('article')];
  const list = document.createElement('div');
  list.className = 'partner-tool-tabs';
  list.setAttribute('role','tablist');
  list.setAttribute('aria-label','Инструменты программы');
  const tabs = panels.map((panel, i) => {
    const button = document.createElement('button');
    button.type = 'button'; button.id = `partner-tool-tab-${i}`;
    button.setAttribute('role','tab');
    button.setAttribute('aria-controls',`partner-tool-panel-${i}`);
    const number = document.createElement('span');
    number.textContent = `0${i+1}`; number.setAttribute('aria-hidden','true');
    button.append(number, document.createTextNode(panel.querySelector('h3').textContent));
    panel.id = `partner-tool-panel-${i}`;
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-labelledby',button.id);
    panel.tabIndex = 0;
    list.append(button);
    return button;
  });
  function select(index, focus = false) {
    tabs.forEach((tab,i) => {
      tab.setAttribute('aria-selected',String(i===index));
      tab.tabIndex = i===index ? 0 : -1;
      panels[i].hidden = i!==index;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab,i) => {
    tab.addEventListener('click',()=>select(i));
    tab.addEventListener('keydown',e=>{
      let next = i;
      if (e.key==='ArrowDown'||e.key==='ArrowRight') next=(i+1)%tabs.length;
      else if(e.key==='ArrowUp'||e.key==='ArrowLeft') next=(i+tabs.length-1)%tabs.length;
      else if(e.key==='Home') next=0;
      else if(e.key==='End') next=tabs.length-1;
      else return;
      e.preventDefault(); select(next,true);
    });
  });
  tools.prepend(list); tools.classList.add('is-tabbed'); select(0);

});
