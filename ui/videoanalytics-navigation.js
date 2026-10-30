(() => {
  function init() {
    const header = document.querySelector('.demo-header');
    const nav = header.querySelector('.demo-nav');
    const toggle = header.querySelector('.demo-toggle');
    const backdrop = header.querySelector('.demo-backdrop');
    function setOpen(open, restoreFocus = false) {
      nav.hidden = !open;
      backdrop.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('demo-menu-open', open);
      if (!open && restoreFocus) toggle.focus();
    }
    toggle.addEventListener('click', () => setOpen(nav.hidden));
    backdrop.addEventListener('click', () => setOpen(false, true));
    nav.addEventListener('click', e => {
      if (e.target.closest('a[href]')) setOpen(false);
    });
    document.addEventListener('click', e => {
      if (!nav.hidden && !header.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !nav.hidden) {
        e.preventDefault();
        setOpen(false, true);
      }
    });
    header.addEventListener('focusout', e => {
      if (!nav.hidden && e.relatedTarget && !header.contains(e.relatedTarget)) setOpen(false);
    });
    window.addEventListener('pageshow', e => { if (e.persisted) setOpen(false); });
  }
  document.addEventListener('click', e => {
    const unavailable = e.target.closest('[data-demo-unavailable],a[aria-disabled=true]');
    if (unavailable) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  document.addEventListener('submit', e => { e.preventDefault(); }, true);
  document.addEventListener('DOMContentLoaded', init);
})();
