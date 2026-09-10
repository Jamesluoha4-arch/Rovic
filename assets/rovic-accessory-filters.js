(() => {
  const validCategories = new Set(['all', 'bag', 'wheel', 'umbrella', 'cover', 'brush', 'seat', 'bottle']);

  const selectedCategory = () => {
    const category = new URL(window.location.href).searchParams.get('category')?.toLowerCase() || 'all';
    return validCategories.has(category) ? category : 'all';
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

  const applyCategory = () => {
    const category = selectedCategory();
    const cards = [...document.querySelectorAll('#ProductGridContainer .product-card[data-accessory-category]')];
    let count = 0;

    cards.forEach((card) => {
      const visible = category === 'all' || card.dataset.accessoryCategory === category;
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
    document.getElementById('ProductGridContainer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.addEventListener('collection:reloaded', applyCategory);
  window.addEventListener('popstate', applyCategory);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyCategory);
  else applyCategory();
})();
