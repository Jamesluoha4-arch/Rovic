(() => {
  // Native touch scrolling remains intact; mouse drags suppress only the following click.
  let drag;
  let suppressClick = false;
  document.addEventListener('pointerdown', event => {
    suppressClick = false;
    const slider = event.target.closest('slider-element');
    if (!slider || event.pointerType !== 'mouse' || event.button !== 0 || slider.scrollWidth <= slider.clientWidth + 1 || event.target.closest('button,input,select,textarea')) return;
    drag = { slider, id: event.pointerId, x: event.clientX, scroll: slider.scrollLeft, moved: false };
  });
  document.addEventListener('dragstart', event => { if (drag) event.preventDefault(); });
  document.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) < 6) return;
    if (!drag.moved) { drag.moved = true; drag.slider.classList.add('rovic-dragging'); drag.slider.setPointerCapture(drag.id); }
    event.preventDefault();
    drag.slider.scrollLeft = drag.scroll - dx;
  }, { passive: false });
  const finish = () => {
    if (!drag) return;
    suppressClick = drag.moved;
    drag.slider.classList.remove('rovic-dragging');
    if (drag.slider.hasPointerCapture(drag.id)) drag.slider.releasePointerCapture(drag.id);
    drag = null;
  };
  document.addEventListener('pointerup', finish);
  document.addEventListener('pointercancel', finish);
  window.addEventListener('blur', finish);
  document.addEventListener('click', event => {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault(); event.stopImmediatePropagation();
  }, true);

  // Measure the selected thumbnail edge, including gaps, instead of using inventory.
  const update = () => document.querySelectorAll('.rovic-color-progress').forEach(bar => {
    const field = bar.closest('fieldset');
    const input = field.querySelector('input:checked');
    const label = input && Array.from(field.querySelectorAll('label')).find(label => label.htmlFor === input.id);
    if (!label) return;
    const edge = label.getBoundingClientRect().right - bar.getBoundingClientRect().left;
    bar.style.setProperty('--selection-width', `${Math.max(0, Math.min(bar.clientWidth, edge))}px`);
  });
  let queued = false;
  const schedule = () => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; update(); }); };
  document.addEventListener('change', schedule);
  document.addEventListener('scroll', schedule, true);
  window.addEventListener('resize', schedule);
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  schedule();
})();
