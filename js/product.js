/**
 * KELVINE - Product Detail Page Script
 * Handles gallery, size selection, quantity, add to cart, tabs, reviews
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Load product from URL param ───────────────────────────────────────────
  const params  = new URLSearchParams(location.search);
  const id      = Number(params.get('id')) || 1;
  const product = getProductById(id);

  if (!product) {
    document.getElementById('product-detail-content').innerHTML = `
      <p style="text-align:center;padding:5rem;color:var(--color-text-muted)">
        Product not found. <a href="shop.html" style="color:var(--color-accent)">Back to shop</a>
      </p>`;
    return;
  }

  // ── Populate page title & breadcrumb ──────────────────────────────────────
  document.title = `${product.name} — Kelvine`;

  const breadcrumbName  = document.getElementById('breadcrumb-product-name');
  const detailCategory  = document.getElementById('detail-category');
  const detailTitle     = document.getElementById('detail-title');
  const detailRating    = document.getElementById('detail-rating');
  const detailRatingCnt = document.getElementById('detail-rating-count');
  const detailPriceCur  = document.getElementById('detail-price-current');
  const detailPriceOrig = document.getElementById('detail-price-original');
  const detailDiscount  = document.getElementById('detail-price-discount');
  const detailDesc      = document.getElementById('detail-description');

  if (breadcrumbName)  breadcrumbName.textContent = product.name;
  if (detailCategory)  detailCategory.textContent = product.category;
  if (detailTitle)     detailTitle.textContent = product.name;
  if (detailRating)    detailRating.innerHTML = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating)) + ` ${product.rating}`;
  if (detailRatingCnt) detailRatingCnt.textContent = `(${product.reviews} reviews)`;
  if (detailPriceCur)  detailPriceCur.textContent = `₹${product.price.toLocaleString('en-IN')}`;
  if (detailDesc)      detailDesc.textContent = product.description;

  if (detailPriceOrig && product.originalPrice) {
    detailPriceOrig.textContent = `₹${product.originalPrice.toLocaleString('en-IN')}`;
    detailPriceOrig.style.display = 'inline';
  }

  if (detailDiscount && product.originalPrice) {
    const pct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    detailDiscount.textContent = `Save ${pct}%`;
    detailDiscount.style.display = 'inline';
  }

  // ── Gallery ───────────────────────────────────────────────────────────────
  const mainImg       = document.getElementById('gallery-main-img');
  const thumbsWrapper = document.getElementById('gallery-thumbs');

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  let currentImgIdx = 0;

  function setMainImage(idx) {
    currentImgIdx = idx;
    if (mainImg) mainImg.src = images[idx] || product.image;
    document.querySelectorAll('.gallery-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === idx);
    });
  }

  if (thumbsWrapper) {
    thumbsWrapper.innerHTML = images.map((img, i) => `
      <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="setGalleryImage(${i})">
        <img src="${img}" alt="${product.name} view ${i + 1}" loading="lazy"
             onerror="this.src='https://picsum.photos/400/530?random=${product.id + i}'">
      </div>
    `).join('');
  }

  window.setGalleryImage = setMainImage;

  // Gallery navigation arrows
  document.getElementById('gallery-prev')?.addEventListener('click', () => {
    setMainImage((currentImgIdx - 1 + images.length) % images.length);
  });

  document.getElementById('gallery-next')?.addEventListener('click', () => {
    setMainImage((currentImgIdx + 1) % images.length);
  });

  // Set initial image
  if (mainImg) {
    mainImg.src = images[0] || product.image;
    mainImg.alt = product.name;
  }

  // ── Color swatches ─────────────────────────────────────────────────────────
  const colorWrap = document.getElementById('color-options');
  if (colorWrap && product.colors) {
    colorWrap.innerHTML = product.colors.map((c, i) => `
      <div class="color-swatch ${i === 0 ? 'active' : ''}"
           style="background:${c}"
           title="${c}"
           data-color="${c}"
           onclick="selectColor(this)">
      </div>
    `).join('');
  }

  window.selectColor = function(el) {
    document.querySelectorAll('#color-options .color-swatch').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
  };

  // ── Size selection ─────────────────────────────────────────────────────────
  let selectedSize = product.sizes ? product.sizes[1] || product.sizes[0] : 'M';
  const sizeContainer = document.getElementById('size-options');

  if (sizeContainer && product.sizes) {
    sizeContainer.innerHTML = product.sizes.map(sz => `
      <button class="size-option ${sz === selectedSize ? 'selected' : ''}"
              data-size="${sz}"
              onclick="selectSize('${sz}')">
        ${sz}
      </button>
    `).join('');
  }

  window.selectSize = function(size) {
    selectedSize = size;
    document.querySelectorAll('#size-options .size-option').forEach(b => {
      b.classList.toggle('selected', b.dataset.size === size);
    });
  };

  // ── Quantity control ───────────────────────────────────────────────────────
  let qty = 1;
  const qtyInput = document.getElementById('qty-input');
  if (qtyInput) qtyInput.value = qty;

  document.getElementById('qty-minus')?.addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    if (qtyInput) qtyInput.value = qty;
  });

  document.getElementById('qty-plus')?.addEventListener('click', () => {
    qty = Math.min(10, qty + 1);
    if (qtyInput) qtyInput.value = qty;
  });

  qtyInput?.addEventListener('change', () => {
    qty = Math.max(1, Math.min(10, Number(qtyInput.value) || 1));
    qtyInput.value = qty;
  });

  // ── Add to Cart ────────────────────────────────────────────────────────────
  document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
    addToCart({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      image:    product.image,
      category: product.category,
      size:     selectedSize,
      qty
    });
    openCart();
  });

  // ── Buy Now ───────────────────────────────────────────────────────────────
  document.getElementById('buy-now-btn')?.addEventListener('click', () => {
    addToCart({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      image:    product.image,
      category: product.category,
      size:     selectedSize,
      qty
    });
    showToast('Redirecting to checkout... 🎉', 'success');
  });

  // ── Wishlist ───────────────────────────────────────────────────────────────
  const wishlistBtn = document.getElementById('wishlist-btn');
  if (wishlistBtn) {
    wishlistBtn.classList.toggle('active', isWishlisted(product.id));
    wishlistBtn.addEventListener('click', () => {
      toggleWishlist(product.id, product.name);
      wishlistBtn.classList.toggle('active', isWishlisted(product.id));
      wishlistBtn.textContent = isWishlisted(product.id) ? '❤️' : '🤍';
    });
  }

  // ── Product Tabs ───────────────────────────────────────────────────────────
  document.querySelectorAll('.product-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.product-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.product-tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`)?.classList.add('active');
    });
  });

  // ── Related products ───────────────────────────────────────────────────────
  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid) {
    const related = KELVINE_PRODUCTS
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4);

    const fallback = KELVINE_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
    const toRender = related.length >= 2 ? related : fallback;

    relatedGrid.innerHTML = toRender.map(p => renderProductCard(p)).join('');

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });

    relatedGrid.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }
});
