// ========================================================
// BLOOM BEAUTY — MAIN APPLICATION LOGIC & CONTROLLER
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  const store = window.bloomStore;
  const data = window.BloomData;
  const comp = window.BloomComponents;

  // Global App Namespace
  window.BloomApp = {
    currentHeroSlide: 0,
    heroTimer: null,
    searchDebounce: null,
    activeDetailProduct: null,
    selectedShadeIndex: 0,
    selectedDetailSize: null,
    detailQuantity: 1,

    init() {
      this.renderAllSections();
      this.initHeroCarousel();
      this.initAnnouncementBar();
      this.initEventListeners();
      this.initStickyHeader();
      this.updateBadges();

      // Subscribe to store changes to re-render cart & wishlist badges
      store.subscribe(() => {
        this.updateBadges();
        this.renderCartDrawer();
        this.renderWishlistModal();
      });
    },

    // --- Announcement bar ---
    initAnnouncementBar() {
      const container = document.getElementById('announcement-text');
      if (!container) return;
      let index = 0;
      setInterval(() => {
        index = (index + 1) % data.announcements.length;
        container.style.opacity = '0';
        setTimeout(() => {
          container.textContent = data.announcements[index];
          container.style.opacity = '1';
        }, 300);
      }, 4500);
    },

    // --- Sticky Header ---
    initStickyHeader() {
      const header = document.querySelector('.sticky-header');
      if (!header) return;
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    },

    // --- Hero Carousel ---
    initHeroCarousel() {
      const slides = document.querySelectorAll('.hero-slide');
      const dots = document.querySelectorAll('.hero-dot');
      if (!slides.length) return;

      const setSlide = (idx) => {
        this.currentHeroSlide = (idx + slides.length) % slides.length;
        slides.forEach((s, i) => {
          s.classList.toggle('is-active', i === this.currentHeroSlide);
        });
        dots.forEach((d, i) => {
          d.classList.toggle('bg-[#292329]', i === this.currentHeroSlide);
          d.classList.toggle('bg-gray-300', i !== this.currentHeroSlide);
          d.classList.toggle('w-7', i === this.currentHeroSlide);
          d.classList.toggle('w-2.5', i !== this.currentHeroSlide);
        });
      };

      const startAutoplay = () => {
        this.heroTimer = setInterval(() => {
          setSlide(this.currentHeroSlide + 1);
        }, 5500);
      };

      const pauseAutoplay = () => {
        if (this.heroTimer) clearInterval(this.heroTimer);
      };

      document.getElementById('hero-prev')?.addEventListener('click', () => {
        pauseAutoplay();
        setSlide(this.currentHeroSlide - 1);
        startAutoplay();
      });

      document.getElementById('hero-next')?.addEventListener('click', () => {
        pauseAutoplay();
        setSlide(this.currentHeroSlide + 1);
        startAutoplay();
      });

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          pauseAutoplay();
          setSlide(idx);
          startAutoplay();
        });
      });

      const heroContainer = document.getElementById('hero-carousel');
      heroContainer?.addEventListener('mouseenter', pauseAutoplay);
      heroContainer?.addEventListener('mouseleave', startAutoplay);

      startAutoplay();
    },

    // --- Render All Homepage Sections ---
    renderAllSections() {
      // 1. Categories Grid
      const catContainer = document.getElementById('category-grid');
      if (catContainer) {
        catContainer.innerHTML = data.categories.map(c => comp.renderCategoryCard(c)).join('');
      }

      // 2. More Beauty, Better Value (Section 6)
      const valueContainer = document.getElementById('value-products-track');
      if (valueContainer) {
        const valueProducts = data.products.filter(p => p.isFeaturedValue);
        valueContainer.innerHTML = valueProducts.map(p => comp.renderProductCard(p)).join('');
      }

      // 3. More Savings Ahead (Section 7)
      const savingsContainer = document.getElementById('savings-products-track');
      if (savingsContainer) {
        const savingsProducts = data.products.filter(p => p.isSavingsDeal || p.discountPercent >= 25);
        savingsContainer.innerHTML = savingsProducts.map(p => comp.renderProductCard(p)).join('');
      }

      // 4. Beauty Bestsellers (Section 8)
      const bestsellersContainer = document.getElementById('bestseller-products-track');
      if (bestsellersContainer) {
        const bestsellers = data.products.filter(p => p.isBestseller);
        bestsellersContainer.innerHTML = bestsellers.map(p => comp.renderProductCard(p)).join('');
      }

      // 5. New Arrivals (Section 9)
      const newArrivalsContainer = document.getElementById('new-arrivals-products-track');
      if (newArrivalsContainer) {
        const newArrivals = data.products.filter(p => p.isNewArrival);
        newArrivalsContainer.innerHTML = newArrivals.map(p => comp.renderProductCard(p)).join('');
      }

      // 6. Popular Brands (Section 10)
      this.renderBrandShowcase('All');

      // 7. Editorial Collections (Section 11)
      const editorialContainer = document.getElementById('editorial-grid');
      if (editorialContainer) {
        editorialContainer.innerHTML = data.editorialCollections.map(c => comp.renderEditorialCard(c)).join('');
      }
    },

    // --- Brand Showcase with Tabs ---
    renderBrandShowcase(category = 'All') {
      const container = document.getElementById('brands-grid');
      if (!container) return;

      const filtered = category === 'All' 
        ? data.brands 
        : data.brands.filter(b => b.category === category);

      container.innerHTML = filtered.map(b => comp.renderBrandCard(b)).join('');
    },

    // --- Badges Update (Cart & Wishlist Count) ---
    updateBadges() {
      const cartCount = store.getCartCount();
      const wishlistCount = store.getWishlistCount();

      document.querySelectorAll('.cart-badge').forEach(el => {
        el.textContent = cartCount;
        el.classList.toggle('hidden', cartCount === 0);
      });

      document.querySelectorAll('.wishlist-badge').forEach(el => {
        el.textContent = wishlistCount;
        el.classList.toggle('hidden', wishlistCount === 0);
      });

      document.querySelectorAll('.cart-subtotal-display').forEach(el => {
        el.textContent = window.formatINR(store.getSubtotal());
      });
    },

    // --- Toast Notifications ---
    showToast(message) {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast-message';
      toast.innerHTML = `
        <svg class="w-4 h-4 text-[#C98498] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="flex-1 text-xs font-medium">${message}</span>
      `;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => toast.remove(), 250);
      }, 3000);
    },

    // --- Horizontal Carousels Scrolling ---
    scrollTrack(trackId, direction = 'right') {
      const track = document.getElementById(trackId);
      if (!track) return;
      const scrollAmount = track.clientWidth * 0.75;
      track.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    },

    // --- Cart Drawer Controls ---
    openCart() {
      document.getElementById('cart-drawer')?.classList.add('is-open');
      document.getElementById('cart-backdrop')?.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      this.renderCartDrawer();
    },

    closeCart() {
      document.getElementById('cart-drawer')?.classList.remove('is-open');
      document.getElementById('cart-backdrop')?.classList.remove('is-active');
      document.body.style.overflow = '';
    },

    renderCartDrawer() {
      const itemsList = document.getElementById('cart-items-list');
      const emptyState = document.getElementById('cart-empty-state');
      const footer = document.getElementById('cart-footer');
      if (!itemsList) return;

      if (store.cart.length === 0) {
        itemsList.innerHTML = '';
        emptyState?.classList.remove('hidden');
        footer?.classList.add('hidden');
      } else {
        emptyState?.classList.add('hidden');
        footer?.classList.remove('hidden');
        itemsList.innerHTML = store.cart.map(item => comp.renderCartItem(item)).join('');
      }

      // Calculations
      const subtotal = store.getSubtotal();
      const discount = store.getDiscount();
      const shipping = store.getShipping();
      const total = store.getTotal();

      document.getElementById('cart-subtotal').textContent = window.formatINR(subtotal);
      document.getElementById('cart-discount').textContent = `-${window.formatINR(discount)}`;
      document.getElementById('cart-shipping').textContent = shipping === 0 ? 'FREE' : window.formatINR(shipping);
      document.getElementById('cart-total').textContent = window.formatINR(total);

      // Free shipping progress bar (target: ₹799)
      const freeShippingThreshold = 799;
      const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
      const remaining = Math.max(0, freeShippingThreshold - subtotal);

      const progressBar = document.getElementById('shipping-progress-bar');
      const progressText = document.getElementById('shipping-progress-text');
      if (progressBar) progressBar.style.width = `${progressPercent}%`;
      if (progressText) {
        if (remaining <= 0) {
          progressText.innerHTML = `🎉 <strong>Congratulations!</strong> You unlocked <strong>FREE Express Shipping</strong>!`;
        } else {
          progressText.innerHTML = `Add <strong>${window.formatINR(remaining)}</strong> more to get <strong>FREE Express Shipping</strong>!`;
        }
      }

      // Active Promo Code Badge
      const promoDisplay = document.getElementById('applied-promo-tag');
      if (promoDisplay) {
        if (store.promoCode) {
          promoDisplay.innerHTML = `
            <div class="flex items-center justify-between text-xs bg-[#F8E9EC] text-[#A6536F] px-2.5 py-1 rounded">
              <span>Code <strong>${store.promoCode}</strong> applied (-${store.promoDiscountPercent}%)</span>
              <button type="button" class="text-xs hover:underline font-bold" data-action="remove-promo">Remove</button>
            </div>
          `;
          promoDisplay.classList.remove('hidden');
        } else {
          promoDisplay.classList.add('hidden');
          promoDisplay.innerHTML = '';
        }
      }
    },

    // --- Wishlist Modal ---
    openWishlist() {
      document.getElementById('wishlist-modal')?.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      this.renderWishlistModal();
    },

    closeWishlist() {
      document.getElementById('wishlist-modal')?.classList.remove('is-active');
      document.body.style.overflow = '';
    },

    renderWishlistModal() {
      const container = document.getElementById('wishlist-items-list');
      const emptyState = document.getElementById('wishlist-empty-state');
      if (!container) return;

      if (store.wishlist.length === 0) {
        container.innerHTML = '';
        emptyState?.classList.remove('hidden');
      } else {
        emptyState?.classList.add('hidden');
        container.innerHTML = store.wishlist.map(p => `
          <div class="flex items-center gap-4 py-3.5 border-b border-[#EEE7E9] last:border-b-0">
            <img src="${p.images[0]}" alt="${p.name}" class="w-16 h-16 object-cover rounded-lg bg-[#FAF6F7] border border-[#EEE7E9]" />
            <div class="flex-1 min-w-0">
              <span class="text-[10px] uppercase font-bold text-[#C98498] block">${p.brand}</span>
              <h4 class="text-xs font-semibold text-[#292329] truncate">${p.name}</h4>
              <span class="text-xs font-bold text-[#292329] mt-0.5 block">${window.formatINR(p.price)}</span>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" 
                      class="bg-[#292329] hover:bg-[#A6536F] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      data-action="wishlist-move-to-bag" 
                      data-id="${p.id}">
                Move to Bag
              </button>
              <button type="button" 
                      class="text-gray-400 hover:text-red-500 p-1.5"
                      data-action="wishlist" 
                      data-id="${p.id}"
                      title="Remove">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        `).join('');
      }
    },

    // --- Quick View Modal ---
    openQuickView(productId) {
      const product = data.products.find(p => p.id === productId);
      if (!product) return;

      const modal = document.getElementById('quickview-modal');
      const content = document.getElementById('quickview-content');
      if (!modal || !content) return;

      let shadesHtml = '';
      if (product.shades && product.shades.length > 0) {
        shadesHtml = `
          <div class="mb-4">
            <label class="text-xs font-semibold text-[#777078] block mb-1.5">Selected Shade: <span id="qv-shade-name" class="text-[#292329]">${product.shades[0].name}</span></label>
            <div class="flex flex-wrap gap-2">
              ${product.shades.map((s, idx) => `
                <button type="button" 
                        class="shade-dot ${idx === 0 ? 'is-selected' : ''}" 
                        style="background-color: ${s.hex}" 
                        data-action="qv-select-shade" 
                        data-name="${s.name}"></button>
              `).join('')}
            </div>
          </div>
        `;
      }

      content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div class="rounded-xl overflow-hidden bg-[#FAF6F7] border border-[#EEE7E9] aspect-square">
            <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover" />
          </div>
          <div class="flex flex-col justify-center">
            <span class="text-xs font-bold uppercase tracking-widest text-[#C98498] mb-1">${product.brand}</span>
            <h3 class="text-xl font-serif font-bold text-[#292329] mb-2 leading-tight">${product.name}</h3>
            <div class="mb-3">${comp.renderRating(product.rating, product.reviewCount)}</div>
            <div class="flex items-baseline gap-3 mb-4">
              <span class="text-2xl font-bold text-[#292329]">${window.formatINR(product.price)}</span>
              ${product.originalPrice > product.price ? `
                <span class="text-sm text-gray-400 line-through">${window.formatINR(product.originalPrice)}</span>
                <span class="text-xs font-bold text-[#A6536F] bg-[#F8E9EC] px-2 py-0.5 rounded">${product.discountPercent}% OFF</span>
              ` : ''}
            </div>
            <p class="text-xs text-[#777078] leading-relaxed mb-4">${product.description}</p>
            ${shadesHtml}
            <div class="flex gap-3 mt-4">
              <button type="button" 
                      class="flex-1 bg-[#292329] hover:bg-[#A6536F] text-[#FFFDF9] py-3 px-4 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                      data-action="qv-add-to-bag" 
                      data-id="${product.id}">
                Add to Bag
              </button>
              <button type="button" 
                      class="bg-[#F8E9EC] hover:bg-[#F3D2DA] text-[#292329] px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                      data-action="view-details" 
                      data-id="${product.id}">
                Full Details
              </button>
            </div>
          </div>
        </div>
      `;

      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    },

    closeQuickView() {
      document.getElementById('quickview-modal')?.classList.remove('is-active');
      document.body.style.overflow = '';
    },

    // --- Product Detail Page / Full Modal (Section 13) ---
    openProductDetail(productId) {
      const product = data.products.find(p => p.id === productId);
      if (!product) return;

      this.activeDetailProduct = product;
      this.selectedShadeIndex = 0;
      this.selectedDetailSize = product.sizes ? product.sizes[0] : null;
      this.detailQuantity = 1;

      const modal = document.getElementById('product-detail-modal');
      const content = document.getElementById('product-detail-content');
      if (!modal || !content) return;

      // Close quick view if open
      this.closeQuickView();

      const isSaved = store.isInWishlist(product.id);
      const reviews = data.reviews[product.id] || [];

      // Shades Swatches
      let shadesHtml = '';
      if (product.shades && product.shades.length > 0) {
        shadesHtml = `
          <div class="mb-5">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-[#777078]">Shade: <strong id="detail-active-shade" class="text-[#292329]">${product.shades[0].name}</strong></span>
              <span class="text-[11px] text-[#A6536F] font-semibold">${product.shades.length} Available Shades</span>
            </div>
            <div class="flex flex-wrap gap-2.5">
              ${product.shades.map((s, idx) => `
                <button type="button" 
                        class="shade-dot ${idx === 0 ? 'is-selected' : ''}" 
                        style="background-color: ${s.hex}; width: 22px; height: 22px;" 
                        data-action="detail-select-shade" 
                        data-index="${idx}"
                        data-name="${s.name}"
                        title="${s.name}"></button>
              `).join('')}
            </div>
          </div>
        `;
      }

      // Sizes Selector
      let sizesHtml = '';
      if (product.sizes && product.sizes.length > 0) {
        sizesHtml = `
          <div class="mb-5">
            <span class="text-xs font-semibold text-[#777078] block mb-2">Select Size:</span>
            <div class="flex gap-2">
              ${product.sizes.map((sz, idx) => `
                <button type="button" 
                        class="px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${idx === 0 ? 'border-[#292329] bg-[#292329] text-white' : 'border-[#EEE7E9] bg-white text-[#292329] hover:bg-[#F8E9EC]'}"
                        data-action="detail-select-size" 
                        data-size="${sz}">
                  ${sz}
                </button>
              `).join('')}
            </div>
          </div>
        `;
      }

      // Related Products
      const related = data.products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

      content.innerHTML = `
        <div class="p-6 md:p-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            <!-- Left: Gallery with Zoom -->
            <div class="lg:col-span-6">
              <div class="flex flex-col-reverse md:flex-row gap-4">
                <!-- Thumbnails -->
                <div class="flex md:flex-col gap-2.5 overflow-x-auto md:w-20 flex-shrink-0">
                  ${product.images.map((img, idx) => `
                    <button type="button" 
                            class="w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${idx === 0 ? 'border-[#C98498]' : 'border-transparent opacity-70 hover:opacity-100'}"
                            data-action="detail-thumbnail" 
                            data-src="${img}">
                      <img src="${img}" alt="${product.name}" class="w-full h-full object-cover" />
                    </button>
                  `).join('')}
                </div>

                <!-- Main Zoomable Image -->
                <div class="zoom-container flex-1 rounded-2xl overflow-hidden bg-[#FAF6F7] border border-[#EEE7E9] aspect-square relative">
                  <img id="detail-main-img" src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover" />
                  ${product.badge ? `<span class="bloom-badge ${comp.getBadgeClass(product.badge)}">${product.badge}</span>` : ''}
                </div>
              </div>
            </div>

            <!-- Right: Product Information & Buying Options -->
            <div class="lg:col-span-6 flex flex-col">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold uppercase tracking-widest text-[#C98498] bg-[#F8E9EC] px-2.5 py-1 rounded">${product.brand}</span>
                <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span> In Stock & Ready to Ship
                </span>
              </div>

              <h1 class="text-2xl md:text-3xl font-serif font-bold text-[#292329] mb-3 leading-snug">${product.name}</h1>
              
              <div class="flex items-center gap-4 mb-4 pb-4 border-b border-[#EEE7E9]">
                ${comp.renderRating(product.rating, product.reviewCount)}
                <span class="text-xs text-[#777078]">•</span>
                <span class="text-xs text-[#777078]">Category: <strong>${product.category}</strong> (${product.subcategory})</span>
              </div>

              <!-- Price Box -->
              <div class="flex items-baseline gap-3 mb-5">
                <span class="text-3xl font-bold text-[#292329]">${window.formatINR(product.price)}</span>
                ${product.originalPrice > product.price ? `
                  <span class="text-base text-gray-400 line-through">${window.formatINR(product.originalPrice)}</span>
                  <span class="text-xs font-bold text-[#A6536F] bg-[#F8E9EC] px-2.5 py-1 rounded">Save ${product.discountPercent}%</span>
                ` : ''}
              </div>

              ${shadesHtml}
              ${sizesHtml}

              <!-- Quantity & CTA Actions -->
              <div class="flex flex-col sm:flex-row gap-3.5 mb-6">
                <!-- Quantity Counter -->
                <div class="flex items-center border border-[#EEE7E9] rounded-xl bg-white px-2 py-1 h-12 w-32 justify-between">
                  <button type="button" class="px-2 py-1 text-sm font-bold text-[#292329] hover:text-[#A6536F]" id="detail-qty-minus">-</button>
                  <span class="text-sm font-bold text-[#292329]" id="detail-qty-value">1</span>
                  <button type="button" class="px-2 py-1 text-sm font-bold text-[#292329] hover:text-[#A6536F]" id="detail-qty-plus">+</button>
                </div>

                <!-- Add to Bag -->
                <button type="button" 
                        class="flex-1 bg-[#292329] hover:bg-[#A6536F] text-[#FFFDF9] py-3.5 px-6 rounded-xl text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm"
                        id="detail-add-bag-btn">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                  </svg>
                  Add to Bag
                </button>

                <!-- Buy Now -->
                <button type="button" 
                        class="bg-[#F8E9EC] hover:bg-[#F3D2DA] text-[#A6536F] py-3.5 px-6 rounded-xl text-sm font-semibold transition-colors"
                        id="detail-buy-now-btn">
                  Buy Now
                </button>

                <!-- Wishlist Heart -->
                <button type="button" 
                        class="w-12 h-12 rounded-xl border border-[#EEE7E9] flex items-center justify-center text-[#777078] hover:text-[#D93856] transition-colors ${isSaved ? 'text-[#D93856] fill-[#D93856]' : ''}"
                        data-action="wishlist" 
                        data-id="${product.id}"
                        title="Save to Wishlist">
                  <svg class="w-5 h-5" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                  </svg>
                </button>
              </div>

              <!-- Delivery Checker -->
              <div class="bg-[#FAF6F7] border border-[#EEE7E9] rounded-xl p-4 mb-4">
                <span class="text-xs font-bold text-[#292329] block mb-1 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-[#C98498]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.948c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75"/>
                  </svg>
                  Delivery Options & Postal Code Check
                </span>
                <div class="flex gap-2 mt-2">
                  <input type="text" id="delivery-pincode" placeholder="Enter Zip/Postal Code (e.g. 10001)" class="text-xs bg-white border border-[#EEE7E9] rounded-lg px-3 py-2 flex-1 focus:outline-none focus:border-[#C98498]" />
                  <button type="button" id="delivery-check-btn" class="text-xs font-semibold bg-[#292329] text-white px-3.5 py-2 rounded-lg hover:bg-[#A6536F] transition-colors">Check</button>
                </div>
                <div id="delivery-status-msg" class="text-xs text-gray-500 mt-2">Free standard shipping on orders over ₹799. Express delivery available.</div>
              </div>

              <!-- Guarantee Badges -->
              <div class="grid grid-cols-3 gap-2 text-center text-[11px] text-[#777078] pt-2">
                <div class="p-2 rounded bg-white border border-[#EEE7E9]">
                  <span class="block font-bold text-[#292329]">100% Authentic</span>
                  Direct from Brand
                </div>
                <div class="p-2 rounded bg-white border border-[#EEE7E9]">
                  <span class="block font-bold text-[#292329]">Easy Returns</span>
                  15-Day Policy
                </div>
                <div class="p-2 rounded bg-white border border-[#EEE7E9]">
                  <span class="block font-bold text-[#292329]">Cruelty Free</span>
                  Ethically Sourced
                </div>
              </div>
            </div>
          </div>

          <!-- Product Details Tabs -->
          <div class="border-t border-[#EEE7E9] pt-8 mb-10">
            <div class="flex border-b border-[#EEE7E9] gap-6 text-sm font-semibold mb-6 overflow-x-auto">
              <button type="button" class="detail-tab-btn pb-3 border-b-2 border-[#292329] text-[#292329]" data-tab="desc">Description & Benefits</button>
              <button type="button" class="detail-tab-btn pb-3 border-b-2 border-transparent text-[#777078] hover:text-[#292329]" data-tab="ingredients">Ingredients</button>
              <button type="button" class="detail-tab-btn pb-3 border-b-2 border-transparent text-[#777078] hover:text-[#292329]" data-tab="how-to-use">How to Use</button>
              <button type="button" class="detail-tab-btn pb-3 border-b-2 border-transparent text-[#777078] hover:text-[#292329]" data-tab="reviews">Customer Reviews (${product.reviewCount})</button>
            </div>

            <!-- Tab 1: Description -->
            <div id="tab-content-desc" class="detail-tab-pane text-sm text-[#777078] leading-relaxed">
              <p class="mb-4 text-base text-[#292329] font-serif">${product.description}</p>
              ${product.keyBenefits ? `
                <h4 class="text-xs font-bold uppercase tracking-wider text-[#292329] mb-2.5">Key Benefits:</h4>
                <ul class="list-disc list-inside space-y-1.5 text-xs text-[#292329] mb-4">
                  ${product.keyBenefits.map(b => `<li>${b}</li>`).join('')}
                </ul>
              ` : ''}
            </div>

            <!-- Tab 2: Ingredients -->
            <div id="tab-content-ingredients" class="detail-tab-pane hidden text-xs text-[#777078] leading-relaxed">
              <p class="bg-[#FAF6F7] p-4 rounded-xl border border-[#EEE7E9] font-mono text-[11px]">${product.ingredients}</p>
            </div>

            <!-- Tab 3: How to Use -->
            <div id="tab-content-how-to-use" class="detail-tab-pane hidden text-sm text-[#777078] leading-relaxed">
              <div class="bg-[#FAF6F7] p-5 rounded-xl border border-[#EEE7E9]">
                <h4 class="text-xs font-bold uppercase tracking-wider text-[#292329] mb-2">Application Ritual:</h4>
                <p class="text-xs text-[#292329]">${product.howToUse}</p>
              </div>
            </div>

            <!-- Tab 4: Customer Reviews -->
            <div id="tab-content-reviews" class="detail-tab-pane hidden">
              <div class="space-y-4">
                ${reviews.length > 0 ? reviews.map(r => `
                  <div class="border border-[#EEE7E9] rounded-xl p-4 bg-white">
                    <div class="flex items-center justify-between mb-1.5">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-[#292329]">${r.author}</span>
                        ${r.verified ? `<span class="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium">Verified Buyer</span>` : ''}
                      </div>
                      <span class="text-[11px] text-[#777078]">${r.date}</span>
                    </div>
                    <div class="mb-2">${comp.renderRating(r.rating, 0)}</div>
                    <h5 class="text-xs font-bold text-[#292329] mb-1">${r.title}</h5>
                    <p class="text-xs text-[#777078] leading-relaxed">${r.comment}</p>
                  </div>
                `).join('') : `
                  <p class="text-xs text-[#777078]">No written reviews yet for this product. Be the first to review!</p>
                `}
              </div>
            </div>
          </div>

          <!-- Similar Products Carousel -->
          ${related.length > 0 ? `
            <div class="border-t border-[#EEE7E9] pt-8">
              <h3 class="text-xl font-serif font-bold text-[#292329] mb-4">You May Also Like</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${related.map(p => comp.renderProductCard(p)).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;

      // Event listener for quantity minus/plus in detail modal
      document.getElementById('detail-qty-minus')?.addEventListener('click', () => {
        if (this.detailQuantity > 1) {
          this.detailQuantity--;
          document.getElementById('detail-qty-value').textContent = this.detailQuantity;
        }
      });

      document.getElementById('detail-qty-plus')?.addEventListener('click', () => {
        this.detailQuantity++;
        document.getElementById('detail-qty-value').textContent = this.detailQuantity;
      });

      // Add to Bag Button
      document.getElementById('detail-add-bag-btn')?.addEventListener('click', () => {
        const shade = product.shades ? product.shades[this.selectedShadeIndex]?.name : null;
        store.addToCart(product, this.detailQuantity, shade, this.selectedDetailSize);
        this.openCart();
      });

      // Buy Now Button
      document.getElementById('detail-buy-now-btn')?.addEventListener('click', () => {
        const shade = product.shades ? product.shades[this.selectedShadeIndex]?.name : null;
        store.addToCart(product, this.detailQuantity, shade, this.selectedDetailSize);
        this.closeProductDetail();
        this.openCheckoutModal();
      });

      // Pincode checker
      document.getElementById('delivery-check-btn')?.addEventListener('click', () => {
        const pin = document.getElementById('delivery-pincode')?.value.trim();
        const msg = document.getElementById('delivery-status-msg');
        if (!pin) {
          msg.textContent = 'Please enter a valid postal code.';
          msg.className = 'text-xs text-red-500 mt-2';
        } else {
          msg.innerHTML = `✅ Express Delivery available for <strong>${pin}</strong>. Estimated arrival: <strong>2-3 Business Days</strong> with Free Shipping!`;
          msg.className = 'text-xs text-emerald-700 mt-2 font-medium';
        }
      });

      // Tab switcher
      const tabBtns = content.querySelectorAll('.detail-tab-btn');
      const tabPanes = content.querySelectorAll('.detail-tab-pane');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const tab = btn.dataset.tab;
          tabBtns.forEach(b => {
            b.classList.toggle('border-[#292329]', b === btn);
            b.classList.toggle('text-[#292329]', b === btn);
            b.classList.toggle('border-transparent', b !== btn);
            b.classList.toggle('text-[#777078]', b !== btn);
          });
          tabPanes.forEach(p => {
            p.classList.toggle('hidden', p.id !== `tab-content-${tab}`);
          });
        });
      });

      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    },

    closeProductDetail() {
      document.getElementById('product-detail-modal')?.classList.remove('is-active');
      document.body.style.overflow = '';
    },

    // --- Search & Autocomplete (Section 15) ---
    handleSearchInput(query) {
      const dropdown = document.getElementById('search-dropdown');
      const resultsContainer = document.getElementById('search-suggestions-list');
      if (!dropdown || !resultsContainer) return;

      const cleanQuery = (query || '').trim().toLowerCase();
      if (!cleanQuery) {
        dropdown.classList.remove('is-open');
        return;
      }

      // Filter products
      const matches = data.products.filter(p => 
        p.name.toLowerCase().includes(cleanQuery) ||
        p.brand.toLowerCase().includes(cleanQuery) ||
        p.category.toLowerCase().includes(cleanQuery) ||
        p.subcategory.toLowerCase().includes(cleanQuery)
      ).slice(0, 5);

      // Filter brands
      const brandMatches = data.brands.filter(b => 
        b.name.toLowerCase().includes(cleanQuery)
      ).slice(0, 3);

      if (matches.length === 0 && brandMatches.length === 0) {
        resultsContainer.innerHTML = `
          <div class="p-6 text-center text-xs text-[#777078]">
            No beauty products found matching "<strong>${query}</strong>". Try searching for "Lipstick", "Serum", or "Olaplex".
          </div>
        `;
      } else {
        let html = '';

        if (brandMatches.length > 0) {
          html += `
            <div class="p-3 border-b border-[#EEE7E9] bg-[#FAF6F7]">
              <span class="text-[10px] uppercase font-bold tracking-wider text-[#777078] block mb-2">Matching Brands</span>
              <div class="flex flex-wrap gap-2">
                ${brandMatches.map(b => `
                  <button type="button" 
                          class="bg-white border border-[#EEE7E9] px-2.5 py-1 rounded-lg text-xs font-semibold text-[#292329] hover:border-[#C98498] transition-colors"
                          data-action="filter-brand" 
                          data-brand="${b.name}">
                    ${b.name}
                  </button>
                `).join('')}
              </div>
            </div>
          `;
        }

        html += `
          <div class="p-2">
            <span class="text-[10px] uppercase font-bold tracking-wider text-[#777078] block px-3 py-1.5">Products (${matches.length})</span>
            ${matches.map(p => `
              <div class="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#FAF6F7] cursor-pointer transition-colors"
                   data-action="view-details" 
                   data-id="${p.id}">
                <img src="${p.images[0]}" alt="${p.name}" class="w-12 h-12 rounded object-cover border border-[#EEE7E9]" />
                <div class="flex-1 min-w-0">
                  <span class="text-[10px] uppercase font-bold text-[#C98498] block">${p.brand}</span>
                  <h4 class="text-xs font-semibold text-[#292329] truncate">${p.name}</h4>
                  <span class="text-xs font-bold text-[#292329]">${window.formatINR(p.price)}</span>
                </div>
                <button type="button" 
                        class="text-xs font-semibold text-[#A6536F] hover:underline"
                        data-action="quick-add" 
                        data-id="${p.id}">
                  Add
                </button>
              </div>
            `).join('')}
          </div>
        `;

        resultsContainer.innerHTML = html;
      }

      dropdown.classList.add('is-open');
    },

    // --- Search Modal View for Full Catalog Browsing & Filters ---
    openSearchModal(initialCategory = null, initialBrand = null) {
      const modal = document.getElementById('search-filter-modal');
      const resultsContainer = document.getElementById('catalog-results-grid');
      if (!modal || !resultsContainer) return;

      this.currentFilterCategory = initialCategory;
      this.currentFilterBrand = initialBrand;
      this.currentSort = 'featured';

      this.renderCatalogResults();

      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    },

    closeSearchModal() {
      document.getElementById('search-filter-modal')?.classList.remove('is-active');
      document.body.style.overflow = '';
    },

    renderCatalogResults() {
      const container = document.getElementById('catalog-results-grid');
      const countEl = document.getElementById('catalog-count');
      if (!container) return;

      let list = [...data.products];

      // Filter by category
      if (this.currentFilterCategory && this.currentFilterCategory !== 'All') {
        list = list.filter(p => p.category.toLowerCase() === this.currentFilterCategory.toLowerCase());
      }

      // Filter by brand
      if (this.currentFilterBrand && this.currentFilterBrand !== 'All') {
        list = list.filter(p => p.brand.toLowerCase() === this.currentFilterBrand.toLowerCase());
      }

      // Sort
      if (this.currentSort === 'price-low') {
        list.sort((a, b) => a.price - b.price);
      } else if (this.currentSort === 'price-high') {
        list.sort((a, b) => b.price - a.price);
      } else if (this.currentSort === 'rating') {
        list.sort((a, b) => b.rating - a.rating);
      } else if (this.currentSort === 'newest') {
        list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      }

      if (countEl) countEl.textContent = `${list.length} Products Found`;

      if (list.length === 0) {
        container.innerHTML = `
          <div class="col-span-full py-12 text-center text-xs text-[#777078]">
            No products match the selected criteria. Try resetting filters.
          </div>
        `;
      } else {
        container.innerHTML = list.map(p => comp.renderProductCard(p)).join('');
      }
    },

    // --- Checkout Flow (Section 14) ---
    openCheckoutModal() {
      if (store.cart.length === 0) {
        this.showToast('Your Bag is empty!');
        return;
      }
      this.closeCart();
      const modal = document.getElementById('checkout-modal');
      if (!modal) return;
      this.renderCheckoutStep(1);
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    },

    closeCheckoutModal() {
      document.getElementById('checkout-modal')?.classList.remove('is-active');
      document.body.style.overflow = '';
    },

    renderCheckoutStep(step) {
      const step1 = document.getElementById('checkout-step-1');
      const step2 = document.getElementById('checkout-step-2');
      const step3 = document.getElementById('checkout-step-3');

      step1?.classList.toggle('hidden', step !== 1);
      step2?.classList.toggle('hidden', step !== 2);
      step3?.classList.toggle('hidden', step !== 3);

      // Update summary sidebar in checkout
      const total = store.getTotal();
      const subtotal = store.getSubtotal();
      const discount = store.getDiscount();

      document.querySelectorAll('.checkout-subtotal-val').forEach(el => el.textContent = window.formatINR(subtotal));
      document.querySelectorAll('.checkout-discount-val').forEach(el => el.textContent = `-${window.formatINR(discount)}`);
      document.querySelectorAll('.checkout-total-val').forEach(el => el.textContent = window.formatINR(total));
    },

    completeOrder() {
      const orderId = 'BLM-' + Math.floor(100000 + Math.random() * 900000);
      document.getElementById('confirmed-order-id').textContent = orderId;
      this.renderCheckoutStep(3);
      store.clearCart();
      this.showToast(`Order Confirmed! Ref: ${orderId} 🎉`);
    },

    // --- Mobile Drawer ---
    openMobileDrawer() {
      document.getElementById('mobile-drawer')?.classList.add('is-open');
      document.getElementById('mobile-drawer-backdrop')?.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    },

    closeMobileDrawer() {
      document.getElementById('mobile-drawer')?.classList.remove('is-open');
      document.getElementById('mobile-drawer-backdrop')?.classList.remove('is-active');
      document.body.style.overflow = '';
    },

    // --- Global Event Listeners ---
    initEventListeners() {
      // Delegated clicks across entire document
      document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;
        const id = target.dataset.id;

        // Quick Add to Bag
        if (action === 'quick-add') {
          e.stopPropagation();
          const product = data.products.find(p => p.id === id);
          if (product) {
            store.addToCart(product, 1);
          }
        }

        // Quick View Modal
        else if (action === 'quick-view') {
          e.stopPropagation();
          this.openQuickView(id);
        }

        // View Full Details Modal
        else if (action === 'view-details') {
          this.openProductDetail(id);
        }

        // Wishlist Toggle
        else if (action === 'wishlist') {
          e.stopPropagation();
          const product = data.products.find(p => p.id === id);
          if (product) {
            const added = store.toggleWishlist(product);
            target.classList.toggle('is-active', added);
            const svg = target.querySelector('svg');
            if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none');
          }
        }

        // Move to Bag from Wishlist
        else if (action === 'wishlist-move-to-bag') {
          const product = data.products.find(p => p.id === id);
          if (product) {
            store.addToCart(product, 1);
            store.toggleWishlist(product);
          }
        }

        // Filter Category
        else if (action === 'filter-category') {
          const cat = target.dataset.category;
          this.openSearchModal(cat, null);
        }

        // Filter Brand
        else if (action === 'filter-brand') {
          const brand = target.dataset.brand;
          this.openSearchModal(null, brand);
        }

        // Cart Item Quantity
        else if (action === 'qty-increase') {
          const shade = target.dataset.shade;
          const currentItem = store.cart.find(i => i.product.id === id && (i.selectedShade || '') === shade);
          if (currentItem) store.updateQuantity(id, currentItem.selectedShade, currentItem.quantity + 1);
        }
        else if (action === 'qty-decrease') {
          const shade = target.dataset.shade;
          const currentItem = store.cart.find(i => i.product.id === id && (i.selectedShade || '') === shade);
          if (currentItem) store.updateQuantity(id, currentItem.selectedShade, currentItem.quantity - 1);
        }
        else if (action === 'remove-cart-item') {
          const shade = target.dataset.shade;
          const currentItem = store.cart.find(i => i.product.id === id && (i.selectedShade || '') === shade);
          if (currentItem) store.removeFromCart(id, currentItem.selectedShade);
        }

        // Promo Code Removal
        else if (action === 'remove-promo') {
          store.removePromoCode();
        }

        // Detail Thumbnail Selector
        else if (action === 'detail-thumbnail') {
          const src = target.dataset.src;
          const mainImg = document.getElementById('detail-main-img');
          if (mainImg) mainImg.src = src;
          document.querySelectorAll('[data-action="detail-thumbnail"]').forEach(btn => {
            btn.classList.toggle('border-[#C98498]', btn === target);
            btn.classList.toggle('border-transparent', btn !== target);
            btn.classList.toggle('opacity-70', btn !== target);
          });
        }

        // Detail Shade Selection
        else if (action === 'detail-select-shade') {
          this.selectedShadeIndex = parseInt(target.dataset.index, 10);
          const name = target.dataset.name;
          const label = document.getElementById('detail-active-shade');
          if (label) label.textContent = name;
          document.querySelectorAll('[data-action="detail-select-shade"]').forEach(btn => {
            btn.classList.toggle('is-selected', btn === target);
          });
        }

        // Detail Size Selection
        else if (action === 'detail-select-size') {
          this.selectedDetailSize = target.dataset.size;
          document.querySelectorAll('[data-action="detail-select-size"]').forEach(btn => {
            btn.classList.toggle('border-[#292329]', btn === target);
            btn.classList.toggle('bg-[#292329]', btn === target);
            btn.classList.toggle('text-white', btn === target);
            btn.classList.toggle('border-[#EEE7E9]', btn !== target);
            btn.classList.toggle('bg-white', btn !== target);
            btn.classList.toggle('text-[#292329]', btn !== target);
          });
        }

        // Quick View Shade Selection
        else if (action === 'qv-select-shade') {
          const name = target.dataset.name;
          document.getElementById('qv-shade-name').textContent = name;
          document.querySelectorAll('[data-action="qv-select-shade"]').forEach(b => {
            b.classList.toggle('is-selected', b === target);
          });
        }

        // Quick View Add to Bag
        else if (action === 'qv-add-to-bag') {
          const product = data.products.find(p => p.id === id);
          const shadeName = document.getElementById('qv-shade-name')?.textContent;
          if (product) {
            store.addToCart(product, 1, shadeName);
            this.closeQuickView();
            this.openCart();
          }
        }
      });

      // Carousel Buttons
      document.getElementById('value-scroll-left')?.addEventListener('click', () => this.scrollTrack('value-products-track', 'left'));
      document.getElementById('value-scroll-right')?.addEventListener('click', () => this.scrollTrack('value-products-track', 'right'));

      document.getElementById('savings-scroll-left')?.addEventListener('click', () => this.scrollTrack('savings-products-track', 'left'));
      document.getElementById('savings-scroll-right')?.addEventListener('click', () => this.scrollTrack('savings-products-track', 'right'));

      document.getElementById('bestseller-scroll-left')?.addEventListener('click', () => this.scrollTrack('bestseller-products-track', 'left'));
      document.getElementById('bestseller-scroll-right')?.addEventListener('click', () => this.scrollTrack('bestseller-products-track', 'right'));

      document.getElementById('new-arrivals-scroll-left')?.addEventListener('click', () => this.scrollTrack('new-arrivals-products-track', 'left'));
      document.getElementById('new-arrivals-scroll-right')?.addEventListener('click', () => this.scrollTrack('new-arrivals-products-track', 'right'));

      // Cart Drawer Open/Close
      document.querySelectorAll('.open-cart-btn').forEach(b => b.addEventListener('click', () => this.openCart()));
      document.getElementById('close-cart-btn')?.addEventListener('click', () => this.closeCart());
      document.getElementById('cart-backdrop')?.addEventListener('click', () => this.closeCart());

      // Wishlist Modal Open/Close
      document.querySelectorAll('.open-wishlist-btn').forEach(b => b.addEventListener('click', () => this.openWishlist()));
      document.getElementById('close-wishlist-btn')?.addEventListener('click', () => this.closeWishlist());
      document.getElementById('wishlist-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'wishlist-modal') this.closeWishlist();
      });

      // Quick View Close
      document.getElementById('close-quickview-btn')?.addEventListener('click', () => this.closeQuickView());
      document.getElementById('quickview-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'quickview-modal') this.closeQuickView();
      });

      // Product Detail Modal Close
      document.getElementById('close-detail-btn')?.addEventListener('click', () => this.closeProductDetail());
      document.getElementById('product-detail-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'product-detail-modal') this.closeProductDetail();
      });

      // Promo Code Form in Cart
      document.getElementById('apply-promo-btn')?.addEventListener('click', () => {
        const input = document.getElementById('promo-input');
        const code = input?.value.trim();
        const result = store.applyPromoCode(code);
        this.showToast(result.message);
        if (result.success && input) input.value = '';
      });

      // Checkout Button in Cart Drawer
      document.getElementById('proceed-to-checkout-btn')?.addEventListener('click', () => {
        this.openCheckoutModal();
      });

      // Checkout Steps
      document.getElementById('checkout-step1-btn')?.addEventListener('click', () => {
        const name = document.getElementById('checkout-name')?.value.trim();
        const email = document.getElementById('checkout-email')?.value.trim();
        const address = document.getElementById('checkout-address')?.value.trim();
        if (!name || !email || !address) {
          this.showToast('Please complete name, email and shipping address');
          return;
        }
        this.renderCheckoutStep(2);
      });

      document.getElementById('checkout-back-step1')?.addEventListener('click', () => this.renderCheckoutStep(1));
      document.getElementById('checkout-pay-btn')?.addEventListener('click', () => this.completeOrder());
      document.getElementById('close-checkout-btn')?.addEventListener('click', () => this.closeCheckoutModal());
      document.getElementById('checkout-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'checkout-modal') this.closeCheckoutModal();
      });

      // Search Input Auto-suggestions
      const searchInput = document.getElementById('main-search-input');
      searchInput?.addEventListener('input', (e) => {
        clearTimeout(this.searchDebounce);
        this.searchDebounce = setTimeout(() => {
          this.handleSearchInput(e.target.value);
        }, 180);
      });

      searchInput?.addEventListener('focus', (e) => {
        if (e.target.value.trim()) this.handleSearchInput(e.target.value);
      });

      // Close search dropdown on click outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#search-container')) {
          document.getElementById('search-dropdown')?.classList.remove('is-open');
        }
      });

      // Catalog Search / Filter Modal
      document.querySelectorAll('.open-catalog-btn').forEach(btn => {
        btn.addEventListener('click', () => this.openSearchModal());
      });

      document.getElementById('close-catalog-btn')?.addEventListener('click', () => this.closeSearchModal());
      document.getElementById('search-filter-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'search-filter-modal') this.closeSearchModal();
      });

      // Catalog Filters (Category & Sort)
      document.getElementById('catalog-category-select')?.addEventListener('change', (e) => {
        this.currentFilterCategory = e.target.value;
        this.renderCatalogResults();
      });

      document.getElementById('catalog-sort-select')?.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderCatalogResults();
      });

      // Brand Filter Tabs in Section 10
      document.querySelectorAll('.brand-tab-btn').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('.brand-tab-btn').forEach(t => {
            t.classList.remove('bg-[#292329]', 'text-white');
            t.classList.add('bg-white', 'text-[#292329]');
          });
          tab.classList.add('bg-[#292329]', 'text-white');
          tab.classList.remove('bg-white', 'text-[#292329]');
          this.renderBrandShowcase(tab.dataset.category);
        });
      });

      // Mobile Drawer Toggle
      document.getElementById('mobile-menu-trigger')?.addEventListener('click', () => this.openMobileDrawer());
      document.getElementById('mobile-nav-shop-btn')?.addEventListener('click', () => this.openMobileDrawer());
      document.getElementById('close-mobile-drawer')?.addEventListener('click', () => this.closeMobileDrawer());
      document.getElementById('mobile-drawer-backdrop')?.addEventListener('click', () => this.closeMobileDrawer());

      // Global Keyboard Accessibility (Escape to close modals/drawers)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeCart();
          this.closeWishlist();
          this.closeQuickView();
          this.closeProductDetail();
          this.closeCheckoutModal();
          this.closeSearchModal();
          this.closeMobileDrawer();
          document.getElementById('search-dropdown')?.classList.remove('is-open');
        }
      });

      // Newsletter Form
      document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('newsletter-email');
        if (input && input.value.trim()) {
          this.showToast('Thank you for subscribing to Bloom Beauty! 🌸 Check your inbox for 15% off.');
          input.value = '';
        }
      });

      // Order Tracking Modal
      document.querySelectorAll('[data-action="track-order"]').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          const orderNum = prompt('Enter your Bloom Beauty Order Number (e.g. BLM-738291):', 'BLM-492810');
          if (orderNum) {
            alert(`Order ${orderNum.toUpperCase()} Status:\n\n📦 In Transit with Express Courier\nEstimated Delivery: In 2 Business Days\nTracking: 1Z9999999999999999`);
          }
        });
      });
    }
  };

  window.BloomApp.init();
});
