/**
 * KELVINE - Main Application Script
 * Navbar, scroll effects, hero animations, featured products, newsletter
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Active Nav Link Highlighting ─────────────────────────────────────────
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Navbar scroll effect ─────────────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // call once on load
  }

  // ── Hamburger menu ────────────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // ── Intersection Observer for scroll animations ───────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Render Featured Products on Home Page ────────────────────────────────
  const featuredGrid = document.getElementById('featured-products-grid');
  if (featuredGrid && typeof KELVINE_PRODUCTS !== 'undefined') {
    const featured = getFeaturedProducts();
    featuredGrid.innerHTML = featured.map(p => renderProductCard(p)).join('');

    // Re-observe newly rendered cards
    featuredGrid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ── Product Tabs ──────────────────────────────────────────────────────────
  const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.tab;
        const grid = document.getElementById('featured-products-grid');
        if (!grid) return;

        let products;
        if (filter === 'all') {
          products = getFeaturedProducts();
        } else {
          products = KELVINE_PRODUCTS.filter(p =>
            p.category.toLowerCase() === filter.toLowerCase()
          ).slice(0, 8);
          if (products.length === 0) products = getFeaturedProducts();
        }

        grid.innerHTML = products.map(p => renderProductCard(p)).join('');
        grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      });
    });
  }

  // ── Newsletter Form ───────────────────────────────────────────────────────
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      const email = input?.value.trim();
      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address.', 'warning');
        return;
      }
      showToast(`You're subscribed! Check your inbox 📧`, 'success');
      if (input) input.value = '';
    });
  }

  // ── Marquee duplication for seamless loop ─────────────────────────────────
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.innerHTML += marqueeTrack.innerHTML;
  }

  // ── Hero CTA smooth scroll ────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.getElementById(anchor.getAttribute('href').slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Back to Top button ────────────────────────────────────────────────────
  createBackToTop();

});

// ── Back to Top utility ───────────────────────────────────────────────────────
function createBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.innerHTML = '↑';
  btn.title = 'Back to top';
  btn.setAttribute('aria-label', 'Back to top');
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'var(--color-accent)',
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: '700',
    boxShadow: 'var(--shadow-md)',
    cursor: 'pointer',
    border: 'none',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '999',
    transition: 'var(--transition)',
    fontFamily: 'var(--font-body)'
  });

  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
