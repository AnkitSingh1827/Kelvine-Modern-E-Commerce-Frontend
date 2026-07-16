# Kelvine — Modern E-Commerce Frontend

![Kelvine Banner](https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80)

**Kelvine** is a fully functional, highly responsive, and modern front-end e-commerce web application. Built entirely with vanilla web technologies (HTML5, CSS3, and JavaScript) to ensure lightning-fast performance without the bloat of heavy frameworks. 

## ✨ Key Features

- **Storefront & Catalog:** Dynamic product rendering showcasing a modern fashion collection.
- **Product Filtering & Sorting:** Fully functional shop page with interactive price range sliders (INR), category filtering, and sorting (price low-high, featured, etc.).
- **Shopping Cart System:** Persistent shopping cart built using browser `localStorage`. Add, remove, and update quantities seamlessly.
- **Wishlist Functionality:** Save your favorite products to a wishlist, remembered across browsing sessions.
- **Dynamic Content rendering:** Clean, reusable JavaScript logic for UI components.
- **Responsive Design:** A mobile-first approach ensuring a flawless UI on desktops, tablets, and smartphones. Includes an intuitive mobile hamburger navigation.
- **Beautiful UI/UX:** 
  - Sticky navbars with scroll effects.
  - Interactive toast notifications for cart and wishlist actions.
  - Smooth reveal-on-scroll animations.
  - Modern, minimalist aesthetic tailored for luxury/slow fashion brands.
- **Complete Page Layouts:** Includes Home, Shop, Product Details, Blog, About Us, and Contact forms with basic validation.

<img width="1898" height="867" alt="Screenshot 2026-07-16 190720" src="https://github.com/user-attachments/assets/2bf0adb1-eb3b-4759-8d4a-bfec61dd4f55" />
<img width="1896" height="862" alt="Screenshot 2026-07-16 190746" src="https://github.com/user-attachments/assets/519ee251-30d1-4dab-ace5-1131c8415fd2" />
<img width="1895" height="862" alt="Screenshot 2026-07-16 190813" src="https://github.com/user-attachments/assets/3042ed0d-6de1-4371-b229-56f07ff19b72" />

## 🛠️ Technology Stack

No external CSS or JavaScript frameworks were used.
- **HTML5:** Semantic architecture and structures.
- **CSS3:** Custom properties (CSS Variables), Flexbox, CSS Grid, and custom animations.
- **Vanilla JavaScript (ES6+):** Module-like architecture for handling state (Cart, Wishlist, Product rendering) and DOM manipulation. LocalStorage API for data persistence.

## 📂 Project Structure

```text
Kelvine/
├── index.html        # Homepage with hero section, featured products, and categories
├── shop.html         # Full catalog with filtering sidebar and list/grid views
├── product.html      # Individual product details, image gallery, and tabbed info
├── blog.html         # Articles and style journal entries
├── about.html        # Brand story, team, and company values
├── contact.html      # Contact form with JS validation and FAQ accordion
├── css/
│   ├── style.css     # Global styles, variables, typography, and site-wide components
│   ├── shop.css      # Specific layout logic for the shop filters and grids
│   └── product.css   # Specific styles for product galleries and tabs
├── js/
│   ├── products.js   # Centralized product database and HTML card generator
│   ├── cart.js       # Cart and Wishlist state management + Toast UI handling
│   ├── shop.js       # Filtering, sorting, and pagination logic
│   ├── product.js    # Single product view logic (gallery swap, qty selector)
│   └── main.js       # Global scripts (navbar states, scroll observer, mobile menu)
└── images/
    └── placeholder.svg # Fallback SVG image for broken links
```

## 🚀 Getting Started

Since this is a vanilla frontend application, there are no build steps, package managers, or compilers required.

1. **Clone or Download the Repository:**
   Download the project files to your local machine.
   
2. **Open the App:**
   Simply double-click on `index.html` to open it in your default web browser.

   *Alternatively, for the best experience (to prevent any strict CORS policies when dealing with local module loading), open it via a local development server:*
   - If using **VS Code**, install the "Live Server" extension, right-click `index.html`, and select *Open with Live Server*.
   - Or use Python: run `python -m http.server 8000` in the root directory and visit `http://localhost:8000` in your browser.

## 📝 Configuration & Data

All product data is statically served via a JavaScript objects array. To modify the products, descriptions, or prices:
- Open `js/products.js` 
- Locate the `KELVINE_PRODUCTS` array.
- Edit the JSON-like objects to add or remove products. (Prices are formatted dynamically for Indian Rupees `₹`).

## 🔮 Future Enhancements (Roadmap)

While the frontend is complete, the following points can turn this into a production-ready full-stack application:
- **Backend API Integration:** Move `KELVINE_PRODUCTS` to a database (MongoDB/PostgreSQL) and serve data via Node.js/Express.
- **Authentication:** Implement User Login/Signup to tie carts and wishlists to specific accounts rather than device LocalStorage.
- **Checkout Gateway:** Create a checkout flow integrating Stripe or Razorpay APIs to handle real transactions. 

## ⚖️ License
This project is open source and available under the [MIT License](LICENSE).
