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

  // Keep the product option picker in sync when a variant image thumbnail is selected.
  document.addEventListener('click', event => {
    const thumbnail = event.target.closest('media-gallery .product__thumbnail[data-media-id]');
    if (!thumbnail) return;

    const gallery = thumbnail.closest('media-gallery');
    const formId = gallery?.getAttribute('form');
    if (!formId) return;

    const productInfo = Array.from(document.querySelectorAll('product-info')).find(info => info.getAttribute('form') === formId);
    const picker = productInfo?.querySelector('variant-picker');
    const variantData = picker?.querySelector('[data-variants]')?.textContent;
    if (!picker || !variantData) return;

    let variants;
    try {
      variants = JSON.parse(variantData);
    }
    catch (_error) {
      return;
    }

    const mediaId = Number(thumbnail.dataset.mediaId);
    const matches = variants.filter(variant => Number(variant.featured_media?.id) === mediaId);
    if (!matches.length) return;

    const containers = Array.from(picker.querySelectorAll('select, fieldset'));
    const currentValues = containers.map(container => {
      if (container.tagName === 'SELECT') return container.value;
      return container.querySelector('input:checked')?.value;
    });
    const score = variant => variant.options.reduce((total, value, index) => total + (value === currentValues[index] ? 1 : 0), 0);
    const variant = matches
      .slice()
      .sort((a, b) => Number(b.available) - Number(a.available) || score(b) - score(a))[0];
    if (!variant) return;

    let changedInput = null;
    containers.forEach((container, index) => {
      const value = variant.options[index];
      if (value == null) return;

      if (container.tagName === 'SELECT') {
        const changed = container.value !== value;
        Array.from(container.options).forEach(option => option.toggleAttribute('selected', option.value === value));
        container.value = value;
        if (changed && !changedInput) changedInput = container;
        return;
      }

      const input = Array.from(container.querySelectorAll('input[type="radio"]')).find(radio => radio.value === value);
      if (!input) return;
      const changed = !input.checked;
      input.checked = true;
      const selectedLabel = container.querySelector('.form__label .font-medium');
      if (selectedLabel) selectedLabel.textContent = value;
      if (changed && !changedInput) changedInput = input;
    });

    changedInput?.dispatchEvent(new Event('change', { bubbles: true }));
  });

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
