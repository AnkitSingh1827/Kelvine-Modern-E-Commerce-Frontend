/**
 * KELVINE - Shop Page Script
 * Handles filtering, sorting, search, pagination, view toggle
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── State ──────────────────────────────────────────────────────────────────
  let state = {
    products: [...KELVINE_PRODUCTS],
    filtered: [...KELVINE_PRODUCTS],
    category: 'all',
    sort: 'featured',
    search: '',
    maxPrice: 30000,
    page: 1,
    perPage: 9,
    view: 'grid'
  };

  // ── DOM refs ───────────────────────────────────────────────────────────────
  const grid         = document.getElementById('shop-products-grid');
  const resultsCount = document.getElementById('results-count');
  const sortSelect   = document.getElementById('sort-select');
  const searchInput  = document.getElementById('sidebar-search');
  const priceSlider  = document.getElementById('price-slider');
  const priceMax     = document.getElementById('price-max');
  const paginationEl = document.getElementById('pagination');
  const gridViewBtn  = document.getElementById('grid-view');
  const listViewBtn  = document.getElementById('list-view');
  const filterToggle = document.getElementById('filter-toggle');
  const sidebar      = document.getElementById('shop-sidebar');

  // ── Category filters ───────────────────────────────────────────────────────
  document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      state.category = item.dataset.category;
      state.page = 1;
      applyFilters();
    });
  });

  // ── Sort ───────────────────────────────────────────────────────────────────
  sortSelect?.addEventListener('change', () => {
    state.sort = sortSelect.value;
    applyFilters();
  });

  // ── Search ─────────────────────────────────────────────────────────────────
  let searchTimer;
  searchInput?.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.search = searchInput.value.trim().toLowerCase();
      state.page = 1;
      applyFilters();
    }, 350);
  });

  // ── Price slider ───────────────────────────────────────────────────────────
  priceSlider?.addEventListener('input', () => {
    state.maxPrice = Number(priceSlider.value);
    if (priceMax) priceMax.textContent = `₹${Number(priceSlider.value).toLocaleString('en-IN')}`;
    state.page = 1;
    applyFilters();
  });

  // ── Size chips ─────────────────────────────────────────────────────────────
  document.querySelectorAll('.size-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      applyFilters();
    });
  });

  // ── Color swatches ─────────────────────────────────────────────────────────
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatch.classList.toggle('active');
    });
  });

  // ── Clear Filters ──────────────────────────────────────────────────────────
  document.getElementById('clear-filters')?.addEventListener('click', () => {
    state.category = 'all';
    state.search   = '';
    state.maxPrice = 30000;
    state.sort     = 'featured';
    state.page     = 1;
    if (searchInput)  searchInput.value = '';
    if (priceSlider)  { priceSlider.value = 30000; }
    if (priceMax)     priceMax.textContent = '₹30,000';
    if (sortSelect)   sortSelect.value = 'featured';
    document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
    document.querySelector('.category-item[data-category="all"]')?.classList.add('active');
    document.querySelectorAll('.size-chip').forEach(c => c.classList.remove('active'));
    applyFilters();
  });

  // ── View Toggle ────────────────────────────────────────────────────────────
  gridViewBtn?.addEventListener('click', () => {
    state.view = 'grid';
    gridViewBtn.classList.add('active');
    listViewBtn?.classList.remove('active');
    grid?.classList.remove('list-view');
  });

  listViewBtn?.addEventListener('click', () => {
    state.view = 'list';
    listViewBtn.classList.add('active');
    gridViewBtn?.classList.remove('active');
    grid?.classList.add('list-view');
  });

  // ── Filter toggle (mobile) ─────────────────────────────────────────────────
  filterToggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
  });

  // ── Apply Filters & Sort ───────────────────────────────────────────────────
  function applyFilters() {
    let results = [...state.products];

    // Category
    if (state.category !== 'all') {
      results = results.filter(p =>
        p.category.toLowerCase() === state.category.toLowerCase()
      );
    }

    // Search
    if (state.search) {
      results = results.filter(p =>
        p.name.toLowerCase().includes(state.search) ||
        p.category.toLowerCase().includes(state.search) ||
        p.tags.some(t => t.includes(state.search))
      );
    }

    // Price
    results = results.filter(p => p.price <= state.maxPrice);

    // Active sizes
    const activeSizes = [...document.querySelectorAll('.size-chip.active')].map(c => c.dataset.size);
    if (activeSizes.length) {
      results = results.filter(p => activeSizes.some(s => p.sizes.includes(s)));
    }

    // Sort
    switch (state.sort) {
      case 'price-asc':  results.sort((a, b) => a.price - b.price); break;
      case 'price-desc': results.sort((a, b) => b.price - a.price); break;
      case 'rating':     results.sort((a, b) => b.rating - a.rating); break;
      case 'newest':     results.sort((a, b) => b.id - a.id); break;
      default: break; // featured — keep original order
    }

    state.filtered = results;
    renderProducts();
    renderPagination();
  }

  // ── Render Products ────────────────────────────────────────────────────────
  function renderProducts() {
    if (!grid) return;

    const start = (state.page - 1) * state.perPage;
    const end   = start + state.perPage;
    const page  = state.filtered.slice(start, end);

    if (resultsCount) {
      resultsCount.innerHTML = `Showing <strong>${page.length}</strong> of <strong>${state.filtered.length}</strong> products`;
    }

    if (page.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:4rem 0; color:var(--color-text-muted);">
          <div style="font-size:3rem;margin-bottom:1rem;">🔍</div>
          <p style="font-size:1rem;">No products found. Try adjusting your filters.</p>
        </div>`;
      return;
    }

    grid.innerHTML = page.map(p => renderProductCard(p)).join('');

    // Re-apply list view class if needed
    if (state.view === 'list') grid.classList.add('list-view');

    // Trigger scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ── Render Pagination ──────────────────────────────────────────────────────
  function renderPagination() {
    if (!paginationEl) return;

    const totalPages = Math.ceil(state.filtered.length / state.perPage);
    if (totalPages <= 1) { paginationEl.innerHTML = ''; return; }

    let html = '';

    // Prev
    html += `<button class="page-btn" ${state.page === 1 ? 'disabled' : ''} onclick="goToPage(${state.page - 1})">‹</button>`;

    for (let i = 1; i <= totalPages; i++) {
      if (totalPages > 7 && i > 2 && i < totalPages - 1 && Math.abs(i - state.page) > 1) {
        if (i === 3 || i === totalPages - 2) html += `<span style="padding:0 0.5rem;color:var(--color-text-muted)">…</span>`;
        continue;
      }
      html += `<button class="page-btn ${i === state.page ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }

    // Next
    html += `<button class="page-btn" ${state.page === totalPages ? 'disabled' : ''} onclick="goToPage(${state.page + 1})">›</button>`;

    paginationEl.innerHTML = html;
  }

  // ── Go to page (global so onclick can call it) ─────────────────────────────
  window.goToPage = function(page) {
    const totalPages = Math.ceil(state.filtered.length / state.perPage);
    if (page < 1 || page > totalPages) return;
    state.page = page;
    renderProducts();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Initial render ─────────────────────────────────────────────────────────
  applyFilters();
});
