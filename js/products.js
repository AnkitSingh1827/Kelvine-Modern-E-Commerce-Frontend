/**
 * KELVINE - Product Data & Shared Data
 * Central data store for all products displayed across the site
 */

const KELVINE_PRODUCTS = [
  {
    id: 1,
    name: 'Linen Structured Blazer',
    category: 'Tops',
    price: 10799,
    originalPrice: 15799,
    badge: 'sale',
    badgeText: 'Sale',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
      'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80'
    ],
    description: 'A timeless linen blazer with a structured silhouette. Perfect for office or weekend wear. Made with premium Italian linen fabric that breathes well and maintains its shape throughout the day.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#1a1a2e', '#c2a47a', '#e8927c'],
    tags: ['blazer', 'office', 'summer', 'linen'],
    featured: true,
    inStock: true
  },
  {
    id: 2,
    name: 'Pleated Midi Dress',
    category: 'Dresses',
    price: 7499,
    originalPrice: null,
    badge: 'new',
    badgeText: 'New',
    rating: 4.9,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    ],
    description: 'Effortlessly elegant pleated midi dress with a flattering A-line silhouette. Crafted from lightweight satin-feel fabric that drapes beautifully for any occasion.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#f5e6d3', '#9b89b4', '#e8927c'],
    tags: ['dress', 'midi', 'elegant', 'satin'],
    featured: true,
    inStock: true
  },
  {
    id: 3,
    name: 'Wide Leg Trousers',
    category: 'Bottoms',
    price: 6249,
    originalPrice: 8299,
    badge: 'sale',
    badgeText: 'Sale',
    rating: 4.7,
    reviews: 212,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    ],
    description: 'Chic wide-leg trousers with a high-rise waist. The flowing silhouette creates an elongating effect that flatters all body types.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a2e', '#e8e8e0', '#c2a47a'],
    tags: ['trousers', 'wide-leg', 'casual'],
    featured: true,
    inStock: true
  },
  {
    id: 4,
    name: 'Cashmere Knit Sweater',
    category: 'Tops',
    price: 12499,
    originalPrice: null,
    badge: 'hot',
    badgeText: 'Hot',
    rating: 4.9,
    reviews: 308,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
    ],
    description: 'Luxuriously soft cashmere sweater in a relaxed fit. Perfect for layering or wearing as a statement piece during cooler months.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#c2a47a', '#f5e6d3', '#9b89b4'],
    tags: ['cashmere', 'knitwear', 'luxury', 'winter'],
    featured: true,
    inStock: true
  },
  {
    id: 5,
    name: 'Silk Slip Skirt',
    category: 'Bottoms',
    price: 5399,
    originalPrice: 7099,
    badge: 'sale',
    badgeText: 'Sale',
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80',
    ],
    description: 'Sleek silk-feel slip skirt with a bias cut for effortless sophisticated dressing. Features an elegant slit and elastic waistband.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#f5e6d3', '#9b89b4', '#1a1a2e'],
    tags: ['silk', 'skirt', 'evening', 'slip'],
    featured: false,
    inStock: true
  },
  {
    id: 6,
    name: 'Oversized Denim Jacket',
    category: 'Outerwear',
    price: 9149,
    originalPrice: null,
    badge: 'new',
    badgeText: 'New',
    rating: 4.8,
    reviews: 93,
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&q=80',
    ],
    description: 'Classic oversized denim jacket with a vintage-inspired wash. A wardrobe staple that pairs effortlessly with any outfit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#5b7fa6', '#1a1a2e'],
    tags: ['denim', 'jacket', 'casual', 'vintage'],
    featured: false,
    inStock: true
  },
  {
    id: 7,
    name: 'Floral Wrap Dress',
    category: 'Dresses',
    price: 6649,
    originalPrice: 9149,
    badge: 'sale',
    badgeText: '27% Off',
    rating: 4.7,
    reviews: 201,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
    ],
    description: 'Romantic floral wrap dress with a V-neckline and adjustable waist tie. The lightweight fabric makes it ideal for warm weather.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#e8927c', '#f5e6d3'],
    tags: ['dress', 'floral', 'summer', 'romantic'],
    featured: false,
    inStock: true
  },
  {
    id: 8,
    name: 'Crop Knit Cardigan',
    category: 'Tops',
    price: 4999,
    originalPrice: null,
    badge: null,
    badgeText: null,
    rating: 4.5,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    ],
    description: 'Cozy cropped cardigan with button-front closure. A cute layering piece that pairs well with high-waisted bottoms.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#f5e6d3', '#e8e8e0', '#9b89b4'],
    tags: ['cardigan', 'knitwear', 'casual', 'autumn'],
    featured: false,
    inStock: true
  },
  {
    id: 9,
    name: 'Tailored Trench Coat',
    category: 'Outerwear',
    price: 20799,
    originalPrice: 29099,
    badge: 'sale',
    badgeText: 'Sale',
    rating: 4.9,
    reviews: 445,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    ],
    description: 'Classic tailored trench coat crafted from water-resistant fabric. Double-breasted with a belted waist for a timeless, flattering silhouette.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#c2a47a', '#1a1a2e'],
    tags: ['coat', 'trench', 'classic', 'outerwear'],
    featured: false,
    inStock: true
  },
  {
    id: 10,
    name: 'Ribbed Mock-Neck Top',
    category: 'Tops',
    price: 3329,
    originalPrice: null,
    badge: null,
    badgeText: null,
    rating: 4.6,
    reviews: 132,
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80',
    ],
    description: 'Stretchy ribbed mock-neck top in a fitted silhouette. A versatile everyday essential that can be dressed up or down.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a2e', '#f5e6d3', '#e8927c'],
    tags: ['top', 'basics', 'ribbed', 'versatile'],
    featured: false,
    inStock: true
  },
  {
    id: 11,
    name: 'Satin Blouse',
    category: 'Tops',
    price: 4569,
    originalPrice: 6249,
    badge: 'sale',
    badgeText: 'Sale',
    rating: 4.5,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80',
    ],
    description: 'Luxurious satin blouse with a relaxed fit and subtle sheen. Dress it up with tailored trousers or dress it down with jeans.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#f5e6d3', '#9b89b4', '#e8e8e0'],
    tags: ['blouse', 'satin', 'elegant'],
    featured: false,
    inStock: true
  },
  {
    id: 12,
    name: 'Knit Co-ord Set',
    category: 'Sets',
    price: 9979,
    originalPrice: null,
    badge: 'new',
    badgeText: 'New',
    rating: 4.8,
    reviews: 41,
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80',
    ],
    description: 'Matching knit crop top and skirt co-ord set. Effortlessly chic ensemble that works for multiple occasions.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#e8927c', '#f5e6d3'],
    tags: ['co-ord', 'set', 'knit', 'matching'],
    featured: false,
    inStock: true
  }
];

/* Helper: get product by id */
function getProductById(id) {
  return KELVINE_PRODUCTS.find(p => p.id === Number(id));
}

/* Helper: get featured products */
function getFeaturedProducts() {
  return KELVINE_PRODUCTS.filter(p => p.featured);
}

/* Helper: render a product card HTML string */
function renderProductCard(product, linkToDetail = true) {
  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const badgeHtml = product.badge
    ? `<span class="badge badge-${product.badge}">${product.badgeText}</span>`
    : '';

  const originalHtml = product.originalPrice
    ? `<span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>`
    : '';

  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
  const detailHref = linkToDetail ? `product.html?id=${product.id}` : '#';

  return `
    <div class="product-card reveal" data-product-id="${product.id}">
      <div class="product-img-wrap">
        <a href="${detailHref}">
          <img src="${product.image}" alt="${product.name}"
               loading="lazy"
               onerror="this.src='https://picsum.photos/400/530?random=${product.id}'">
        </a>
        <div class="product-badges">
          ${badgeHtml}
        </div>
        <div class="product-actions">
          <button class="product-action-btn"
                  data-wishlist="${product.id}"
                  onclick="toggleWishlist(${product.id}, '${product.name}')"
                  title="Add to wishlist"
                  aria-label="Wishlist">
            ${typeof isWishlisted === 'function' && isWishlisted(product.id) ? '❤️' : '🤍'}
          </button>
          <a href="${detailHref}" class="product-action-btn" title="Quick view" aria-label="View">👁️</a>
        </div>
        <button class="product-add-btn"
                onclick="addToCart({
                  id: ${product.id},
                  name: '${product.name.replace(/'/g, "\\'")}',
                  price: ${product.price},
                  image: '${product.image}',
                  category: '${product.category}',
                  size: 'M'
                })">
          Add to Cart
        </button>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <a href="${detailHref}">
          <div class="product-name">${product.name}</div>
        </a>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span>${product.rating} (${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
          ${originalHtml}
          ${discountPct ? `<span class="badge badge-sale">-${discountPct}%</span>` : ''}
        </div>
      </div>
    </div>
  `;
}
