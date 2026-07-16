/**
 * KELVINE - Cart Management Module
 * Handles all cart operations: add, remove, update quantity, persist to localStorage
 */

// ── Cart State ──────────────────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('kelvine_cart')) || [];

// ── Persist helpers ──────────────────────────────────────────────────────────
function saveCart() {
  localStorage.setItem('kelvine_cart', JSON.stringify(cart));
}

// ── Core Cart Operations ─────────────────────────────────────────────────────

/**
 * Add an item to the cart (or increment if exists)
 * @param {Object} product - { id, name, price, image, category, size, qty }
 */
function addToCart(product) {
  const key = `${product.id}-${product.size}`;
  const existing = cart.find(i => i.key === key);

  if (existing) {
    existing.qty = Math.min(existing.qty + (product.qty || 1), 10);
  } else {
    cart.push({ ...product, key, qty: product.qty || 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`"${product.name}" added to cart 🛍️`, 'success');
}

/**
 * Remove an item by cart key
 * @param {string} key
 */
function removeFromCart(key) {
  const idx = cart.findIndex(i => i.key === key);
  if (idx !== -1) {
    showToast(`"${cart[idx].name}" removed from cart`, 'warning');
    cart.splice(idx, 1);
    saveCart();
    updateCartUI();
    renderCartItems();
  }
}

/**
 * Update the quantity of an item
 * @param {string} key
 * @param {number} delta - positive or negative integer
 */
function updateQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;

  item.qty = Math.max(1, Math.min(item.qty + delta, 10));
  saveCart();
  updateCartUI();
  renderCartItems();
}

/**
 * Get the cart total (sum of price × qty)
 */
function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

/**
 * Get total item count in cart
 */
function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

// ── UI Updates ───────────────────────────────────────────────────────────────

/**
 * Update the cart badge count and subtotal display everywhere
 */
function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  // Update all cart count badges
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count === 0 ? 'none' : 'flex';
  });

  // Update subtotal
  document.querySelectorAll('.cart-total-amount').forEach(el => {
    el.textContent = `₹${total.toLocaleString('en-IN')}`;
  });
}

/**
 * Render cart items into the sidebar
 */
function renderCartItems() {
  const container = document.getElementById('cart-items-list');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <a href="shop.html" class="btn btn-outline-accent" style="margin-top:1rem">
          Start Shopping
        </a>
      </div>`;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-key="${item.key}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img"
           onerror="this.src='images/placeholder.svg'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-variant">Size: ${item.size || 'M'} · ${item.category || 'Clothing'}</div>
        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQty('${item.key}', -1)" aria-label="Decrease">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${item.key}', 1)" aria-label="Increase">+</button>
          <button class="remove-item" onclick="removeFromCart('${item.key}')" aria-label="Remove">✕</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ── Cart Sidebar Toggle ──────────────────────────────────────────────────────

function openCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (sidebar) sidebar.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
  updateCartUI();
}

function closeCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Toast Notification ───────────────────────────────────────────────────────

/**
 * Show a toast message
 * @param {string} message
 * @param {string} type - 'success' | 'warning' | 'error'
 */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', warning: '⚠️', error: '❌' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || '✅'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto-remove after 3s
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ── Wishlist ─────────────────────────────────────────────────────────────────
let wishlist = JSON.parse(localStorage.getItem('kelvine_wishlist')) || [];

function toggleWishlist(productId, productName) {
  const idx = wishlist.indexOf(productId);
  if (idx === -1) {
    wishlist.push(productId);
    showToast(`"${productName}" added to wishlist ❤️`, 'success');
  } else {
    wishlist.splice(idx, 1);
    showToast(`"${productName}" removed from wishlist`, 'warning');
  }
  localStorage.setItem('kelvine_wishlist', JSON.stringify(wishlist));
  updateWishlistButtons(productId);
}

function isWishlisted(productId) {
  return wishlist.includes(productId);
}

function updateWishlistButtons(productId) {
  document.querySelectorAll(`[data-wishlist="${productId}"]`).forEach(btn => {
    btn.classList.toggle('active', isWishlisted(productId));
    btn.title = isWishlisted(productId) ? 'Remove from wishlist' : 'Add to wishlist';
  });
}

// ── Initialize ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();

  // Cart toggle buttons
  document.querySelectorAll('[data-cart-open]').forEach(btn => {
    btn.addEventListener('click', openCart);
  });

  // Close cart
  document.getElementById('close-cart')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

  // Checkout button
  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'warning');
      return;
    }
    showToast('Redirecting to checkout... 🎉', 'success');
    setTimeout(() => closeCart(), 1000);
  });
});
