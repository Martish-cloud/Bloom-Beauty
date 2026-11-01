# 🌸 Bloom Beauty

> *"Your Beauty. Your Confidence. Your Bloom."*

**Bloom Beauty** is an exclusive, luxury e-commerce platform dedicated to women's cosmetics, skincare, haircare, and personal beauty rituals. Inspired by modern, world-class beauty shopping destinations like Nykaa, Bloom Beauty delivers a clean, intuitive, and elevated shopping experience with an original visual identity, warm ivory aesthetics, soft blush-pink accents, and fluid micro-animations.

---

## ✨ Features & Highlights

### 1. Multi-Level Navigation & Mega Menus
- **Top Announcement Bar**: Rotating promotional messages highlighting free express shipping, gift samples, and authentic brand sourcing.
- **Header**: Refined typography branding, real-time live search with instant product thumbnails & brand suggestions, account portal, wishlist badge counter, and cart indicator.
- **Mega Menus**: Organized multi-column dropdowns for Makeup, Skincare, Haircare, Bath & Body, Fragrance, Nail Care, and Beauty Tools with featured product spotlights.
- **Sticky Elevation**: Subtle backdrop-blur sticky header that elevates smoothly on scroll.

### 2. Campaign Hero Section
- Dynamic multi-slide campaign carousel featuring high-resolution editorial photography.
- Campaign headlines, category tags, dual CTA buttons (*Shop Lipsticks*, *Discover Burgundy Glow*, etc.).
- Auto-advancing slides with pause-on-hover, custom pill pagination, and manual arrow controls.

### 3. Shop by Category ("Explore Your Beauty Essentials")
- Visual category cards featuring high-impact photography and product counts.
- Responsive grid with hover scale effects and direct filtering links.

### 4. "More Beauty, Better Value" (Critical Hover Experience)
- Dedicated horizontal product carousel.
- **Signature Product Card Hover Interaction**:
  - `transform: translateY(-4px)` elevation with natural cubic-bezier easing.
  - Soft ambient box shadow.
  - Smooth secondary image crossfade.
  - Slide-up **Quick Add** and **Quick View** buttons.
  - Wishlist floating heart toggle with instant badge counter update.
  - Interactive shade swatches preview.

### 5. "More Savings Ahead" & Promotional Banners
- Curated promotional section with discount badges (`BESTSELLER`, `NEW ARRIVAL`, `LIMITED OFFER`, `BEST VALUE`).
- High-impact editorial promotional banners between sections (up to 40% off, combo savings).

### 6. "Our Popular Brands" Showcase
- Authentic brand directory featuring 24+ world-renowned beauty brands:
  - **Makeup**: Maybelline New York, L'Oréal Paris, MAC Cosmetics, Huda Beauty, NYX Professional Makeup, Lakmé, Colorbar, Swiss Beauty, Kay Beauty, e.l.f. Cosmetics.
  - **Skincare**: The Ordinary, Cetaphil, Neutrogena, CeraVe, Minimalist, Mamaearth, Dot & Key, Plum, The Derma Co.
  - **Haircare**: Olaplex, L'Oréal Professionnel, Schwarzkopf, TRESemmé, Matrix.
- Real-time tabbed filtering (*All*, *Makeup*, *Skincare*, *Haircare*) with brand cards.

### 7. Product Detail Experience (Modal & Dedicated View)
- Large image gallery with multiple thumbnail angles and interactive zoom lens.
- Brand header, ratings, and verified customer reviews tab.
- Visual clickable shade swatches with hex color previews.
- Size selector (*30ml*, *50ml*, *100ml*).
- Quantity adjuster, **Add to Bag**, and **Buy Now** actions.
- Postal code delivery checker with automated express shipping estimator.
- Ingredient transparency, application ritual instructions, and "You May Also Like" recommendations.

### 8. Full Shopping Functionality
- **Slide-Over Cart Drawer**:
  - Live **Free Shipping Progress Tracker** (calculates remaining amount to qualify for free shipping).
  - Quantity controls (`+` / `-`) and item removal.
  - Coupon code engine (try `BLOOM10` for 10% off or `GLOW20` for 20% off).
  - Itemized subtotal, discount, shipping, and total calculation.
  - Persistent state saved to `localStorage`.
- **Wishlist Drawer**:
  - Persistent wishlist with one-click **Move to Bag** action.
- **Interactive Checkout Flow**:
  - Step 1: Shipping and delivery address.
  - Step 2: Payment method selection (Card, Apple Pay, PayPal, Cash on Delivery).
  - Step 3: Order Confirmation with generated order reference number (e.g. `BLM-492018`).

### 9. Comprehensive Footer
- 4 organized columns: Shop, Customer Care, About Bloom Beauty, and Secure Shopping.
- VIP Beauty Insider newsletter subscription form with immediate validation.
- Accepted payment provider badges and authenticity guarantee.

---

## 🎨 Design System & Color Palette

| Token | Hex Code | Usage |
|---|---|---|
| **Primary Background** | `#FFFDF9` | Warm ivory canvas |
| **Secondary Background** | `#F8E9EC` | Soft blush pink accents |
| **Primary Accent** | `#DDA6B3` | Blush rose details |
| **Secondary Accent** | `#C98498` | Dusty rose headers & badges |
| **Deep Rose** | `#A6536F` | Active states & primary buttons |
| **Plum Black** | `#292329` | High-contrast typography & CTA |
| **Muted Text** | `#777078` | Secondary labels & descriptions |
| **Borders** | `#EEE7E9` | Clean subtle borders |
| **Gold / Champagne** | `#C5A880` | Rating stars & luxury tags |

**Typography**:
- **Headings**: *Playfair Display* (Editorial Serif)
- **Body & UI**: *Plus Jakarta Sans* (Modern Clean Sans-Serif)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Martish-cloud/Bloom-Beauty.git
   cd Bloom-Beauty
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📁 Project Architecture

```
Bloom Beauty/
├── index.html             # Semantic HTML5 entry point & structured SEO
├── server.js              # Lightweight zero-dependency HTTP server
├── package.json           # Project manifest and scripts
├── .gitignore             # Git ignore configurations
├── Docs/                  # Project assets & media
├── public/                # Static public assets
│   └── images/            # Product & campaign imagery
└── src/
    ├── css/
    │   └── styles.css     # Bloom Beauty Design System & Animation tokens
    ├── js/
    │   ├── data.js        # 24+ authentic products, 24 brands, categories, reviews
    │   ├── state.js       # Persistent cart, wishlist, promo codes (localStorage)
    │   ├── components.js  # Card, modal, drawer, and rating UI renderers
    │   └── app.js         # Main application controller, event delegation, search
    └── types/             # TypeScript definitions
```

---

## 🛡️ License & Authenticity

This project was developed exclusively as a premium women's cosmetics & skincare e-commerce platform for Bloom Beauty.
All product information and images are used for demonstration and educational purposes.
