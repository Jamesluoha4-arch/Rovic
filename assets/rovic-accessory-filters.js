(() => {
  const validCategories = () => new Set([...document.querySelectorAll('[data-accessory-category-button]')].map(button => button.dataset.accessoryCategoryButton));

  const selectedCategory = () => {
    const category = new URL(window.location.href).searchParams.get('category')?.toLowerCase() || 'all';
    return validCategories().has(category) ? category : 'all';
  };

  const syncControls = (category) => {
    document.querySelectorAll('[data-accessory-categories]').forEach((group) => {
      const input = group.querySelector('input[name="category"]');
      if (input) input.value = category === 'all' ? '' : category;
      group.querySelectorAll('[data-accessory-category-button]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.accessoryCategoryButton === category));
      });
    });
  };

  const updateCounts = (count) => {
    const productCount = document.getElementById('ProductCount');
    if (productCount) productCount.textContent = `${count} ${count === 1 ? 'product' : 'products'}`;
    document.querySelectorAll('results-count').forEach((result) => { result.textContent = count; });
  };

  const pendingGrids = new WeakMap();
  const loadPartsPages = (grid) => {
    if (pendingGrids.has(grid)) return pendingGrids.get(grid);
    const task = (async () => {
      const pages = Number(grid.dataset.pages);
      const current = Number(grid.dataset.page);
      const batches = [];
      for (let page = 1; page <= pages; page += 1) {
        if (page === current) { batches.push([...grid.children]); continue; }
        const url = new URL(window.location.href);
        url.searchParams.set('section_id', grid.dataset.sectionId);
        url.searchParams.set('page', page);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Unable to load Parts');
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        const nextGrid = doc.querySelector('[data-parts-grid]');
        if (!nextGrid) throw new Error('Missing Parts grid');
        batches.push([...nextGrid.children]);
      }
      if (!grid.isConnected) return;
      if (pages > 1) grid.replaceChildren(...batches.flat());
      grid.closest('#ProductGridContainer').querySelectorAll('.pagination, infinite-scroll').forEach(el => { el.hidden = true; });
    })();
    pendingGrids.set(grid, task);
    task.catch(() => pendingGrids.delete(grid));
    return task;
  };

  let revision = 0;
  const applyCategory = async () => {
    const run = ++revision;
    const partsGrid = document.querySelector('[data-parts-grid]');
    if (partsGrid) {
      partsGrid.setAttribute('aria-busy', 'true');
      try { await loadPartsPages(partsGrid); }
      catch (error) {
        let message = document.querySelector('[data-parts-error]');
        if (!message) {
          message = document.createElement('p');
          message.dataset.partsError = '';
          message.setAttribute('role', 'alert');
          partsGrid.before(message);
        }
        message.textContent = 'Unable to load all parts. Please select a category to try again.';
        return;
      } finally { partsGrid.removeAttribute('aria-busy'); }
      if (run !== revision || !partsGrid.isConnected) return;
      document.querySelector('[data-parts-error]')?.remove();
    }
    const category = selectedCategory();
    const cards = [...document.querySelectorAll('#ProductGridContainer .product-card[data-accessory-category]')];
    let count = 0;

    cards.forEach((card) => {
      const visible = category === 'all' || card.dataset.accessoryCategory.split(/\s+/).includes(category);
      card.hidden = !visible;
      if (visible) count += 1;
    });

    const emptyState = document.querySelector('.rovic-accessory-empty');
    if (emptyState) emptyState.hidden = count !== 0;
    const grid = document.querySelector('#ProductGridContainer motion-list');
    if (grid) grid.hidden = count === 0;
    syncControls(category);
    updateCounts(count);
  };

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-accessory-category-button]');
    if (!button) return;

    const category = button.dataset.accessoryCategoryButton;
    const url = new URL(window.location.href);
    if (category === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', category);
    url.searchParams.delete('page');
    history.pushState({}, '', url);
    applyCategory();
    document.getElementById('ProductGridContainer')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });

  document.addEventListener('collection:reloaded', applyCategory);
  window.addEventListener('popstate', applyCategory);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyCategory);
  else applyCategory();
})();
