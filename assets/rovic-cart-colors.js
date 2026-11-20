(() => {
  if (window.rovicCartColors) return;
  window.rovicCartColors = true;
  const key = value => value.trim().toLowerCase().replace(/[\/-]/g, ' ').replace(/\s+/g, ' ');
  let queued = false;
  function apply() {
    const root = document.querySelector('[data-cart-color-collection]');
    if (!root) return;
    const selected = new Set(new URL(location.href).searchParams.getAll('cart_color').filter(Boolean).map(key));
    const cards = [...root.querySelectorAll('#ProductGridContainer .product-card[data-cart-color-values]')];
    const colors = new Map();
    let visible = 0;
    for (const card of cards) {
      let values;
      try { values = JSON.parse(card.dataset.cartColorValues); } catch { continue; }
      for (const entry of values) {
        const id = key(entry.value);
        if (!colors.has(id)) colors.set(id, {...entry, count: 0});
        colors.get(id).count++;
      }
      const show = !selected.size || values.some(entry => selected.has(key(entry.value)));
      if (card.hidden === show) card.hidden = !show;
      if (show) visible++;
    }
    for (const holder of root.querySelectorAll('[data-cart-color-buttons]')) {
      const signature = JSON.stringify([[...selected], [...colors]]);
      if (holder.dataset.signature === signature) continue;
      holder.dataset.signature = signature;
      holder.replaceChildren();
      const clear = document.createElement('button');
      clear.type = 'button'; clear.dataset.cartColorClear = '';
      clear.className = 'reversed-link text-sm'; clear.textContent = 'Clear colours'; clear.hidden = !selected.size;
      holder.append(clear);
      for (const [id, entry] of [...colors].sort(([a],[b]) => a.localeCompare(b))) {
        const button = document.createElement('button');
        button.type = 'button'; button.dataset.cartColor = id;
        button.setAttribute('aria-pressed', String(selected.has(id)));
        button.className = 'rovic-colour-filter-button';
        const swatch = document.createElement('span');
        swatch.className = 'color-swatch with-image relative'; swatch.style.cssText = entry.style;
        swatch.setAttribute('aria-hidden','true');
        const label = document.createElement('span'); label.textContent = entry.value.replace(/\s+/g,' ');
        const count = document.createElement('span'); count.className = 'text-opacity'; count.textContent = `(${entry.count})`;
        button.append(swatch,label,count); holder.append(button);
      }
    }
    for (const input of root.querySelectorAll('[data-cart-color-param]')) {
      // One hidden field per selected value keeps colour choices during native facet reloads.
      const form = input.form;
      input.disabled = true;
      const signature = [...selected].join('|');
      if (form.dataset.cartColorSelection === signature) continue;
      form.dataset.cartColorSelection = signature;
      form.querySelectorAll('[data-cart-color-selected]').forEach(el=>el.remove());
      for (const value of selected) {
        const field=document.createElement('input'); field.type='hidden'; field.name='cart_color'; field.value=value; field.dataset.cartColorSelected=''; form.append(field);
      }
    }
    const grid=root.querySelector('#ProductGridContainer');
    if (!grid) return;
    let status=grid.querySelector('[data-cart-color-status]');
    if (!status) { status=document.createElement('p'); status.dataset.cartColorStatus=''; status.setAttribute('role','status'); status.className='text-sm'; grid.prepend(status); }
    const message=selected.size ? `${visible} ${visible===1?'cart':'carts'} matching selected colours${visible?'':'. Clear colours to see all carts.'}` : '';
    if(status.textContent!==message)status.textContent=message;
    if(status.hidden === !!message)status.hidden=!message;
    root.querySelectorAll('.rovic-cart-demo').forEach(el=>{if(el.hidden !== !!selected.size)el.hidden=!!selected.size;});
  }
  function schedule() { if(queued)return; queued=true; requestAnimationFrame(()=>{queued=false;apply();}); }
  document.addEventListener('click', event => {
    const button=event.target.closest('[data-cart-color], [data-cart-color-clear]');
    if(!button)return;
    event.preventDefault();
    const url=new URL(location.href);
    const values=new Set(url.searchParams.getAll('cart_color').map(key));
    if(button.hasAttribute('data-cart-color-clear'))values.clear();
    else if(values.has(button.dataset.cartColor))values.delete(button.dataset.cartColor);
    else values.add(button.dataset.cartColor);
    url.searchParams.delete('cart_color');
    values.forEach(value=>url.searchParams.append('cart_color',value));
    history.pushState({},'',url); apply();
  });
  window.addEventListener('popstate',schedule);
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  schedule();
})();
