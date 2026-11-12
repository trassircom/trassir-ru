(() => {
  function init() {
    const header = document.getElementById('site-header');
    if (!header) return;
    const triggers = [...header.querySelectorAll('.tr-nav-trigger')];
    let active = null;
    function close(restoreFocus = false) {
      if (!active) return;
      const trigger = active;
      document.getElementById(trigger.getAttribute('aria-controls')).hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      active = null;
      if (restoreFocus) trigger.focus();
    }
    function open(trigger) {
      if (active === trigger) return;
      close();
      active = trigger;
      document.getElementById(trigger.getAttribute('aria-controls')).hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
    }
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => active === trigger ? close() : open(trigger));
      trigger.addEventListener('keydown', event => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        event.preventDefault();
        open(trigger);
        const links = [...document.getElementById(trigger.getAttribute('aria-controls')).querySelectorAll('a[href]')];
        (event.key === 'ArrowUp' ? links.at(-1) : links[0])?.focus();
      });
    });
    document.addEventListener('click', event => {
      if (!header.contains(event.target)) close();
      else if (event.target.closest('a[href]')) close();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && active) { event.preventDefault(); close(true); }
    });
    header.addEventListener('focusout', event => {
      if (event.relatedTarget && !header.contains(event.relatedTarget)) close();
    });
    window.addEventListener('pageshow', () => close());
    // Keep anchor targets clear of the header, including wrapped mobile rows.
    const measure = () => document.documentElement.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
    new ResizeObserver(measure).observe(header);
    measure();
  }
  document.addEventListener('click', e => {
    const unavailable = e.target.closest('[data-demo-unavailable],a[aria-disabled=true],button[aria-disabled=true]');
    if (unavailable) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  document.addEventListener('submit', e => { e.preventDefault(); e.stopImmediatePropagation(); }, true);
  document.addEventListener('DOMContentLoaded', init);
})();
