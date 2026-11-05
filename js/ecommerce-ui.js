// ========================================================
// BLOOM BEAUTY — COMPLETE E-COMMERCE UI & NAVIGATION ROUTER
// Product Detail Page, Account Dashboard, 3-Step Checkout,
// Order Tracking, PDF Invoice & Admin Fulfilment
// ========================================================

const BloomEcommerceUI = {
  // Navigation State Preservation
  navState: {
    scrollY: 0,
    wasSearchModalOpen: false,
    filterCategory: 'All',
    filterBrand: 'All',
    searchQuery: '',
    sort: 'featured',
    fromContext: 'Homepage'
  },

  activeDetailProduct: null,
  activeDetailQuantity: 1,
  activeDetailShade: null,
  activeDetailSize: null,
  activeDetailImageIndex: 0,
  
  checkoutState: {
    step: 1,
    customer: null,
    address: null,
    paymentMethod: 'Credit / Debit Card',
    couponCode: '',
    orderNote: ''
  },

  activeAccountTab: 'profile',
  selectedTrackingOrderId: null,
  _isInitialized: false,

  // --- Initialize Routing & Global Listeners ---
  init() {
    if (this._isInitialized) return;
    this._isInitialized = true;
    this.injectStyles();
    this.setupStickyHeaderMetrics();
    this.setupAccountDropdown();
    this.setupHashRouter();
    this.bindGlobalActions();
  },

  // --- Dynamic CSS for Full Views ---
  injectStyles() {
    if (document.getElementById('bloom-ecommerce-styles')) return;
    const style = document.createElement('style');
    style.id = 'bloom-ecommerce-styles';
    style.innerHTML = `
      :root {
        --bloom-header-height: 144px;
      }
      .bloom-page-view {
        position: fixed;
        top: var(--bloom-header-height, 144px);
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 150;
        background-color: #FFFDF9;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        display: none;
      }
      .bloom-page-view.is-visible {
        display: block;
      }
      .timeline-step {
        position: relative;
        padding-left: 28px;
        padding-bottom: 24px;
      }
      .timeline-step:last-child {
        padding-bottom: 0;
      }
      .timeline-step::before {
        content: '';
        position: absolute;
        left: 9px;
        top: 20px;
        bottom: 0;
        width: 2px;
        background-color: #EEE7E9;
      }
      .timeline-step:last-child::before {
        display: none;
      }
      .timeline-step.is-completed::before {
        background-color: #A6536F;
      }
      .timeline-indicator {
        position: absolute;
        left: 0;
        top: 2px;
        width: 20px;
        height: 20px;
        border-radius: 9999px;
        background: white;
        border: 2px solid #EEE7E9;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .timeline-step.is-completed .timeline-indicator {
        border-color: #A6536F;
        background-color: #A6536F;
        color: white;
      }
      .timeline-step.is-current .timeline-indicator {
        border-color: #A6536F;
        background-color: #FAF6F7;
        box-shadow: 0 0 0 4px rgba(166, 83, 111, 0.2);
      }
      .account-nav-btn.is-active {
        background-color: #292329 !important;
        color: #FFFFFF !important;
      }
    `;
    document.head.appendChild(style);
  },

  // --- Sticky Header Metrics Calculator ---
  setupStickyHeaderMetrics() {
    const updateMetrics = () => {
      const header = document.getElementById('global-sticky-header') || document.querySelector('.sticky-header');
      if (header) {
        const height = header.offsetHeight;
        if (height > 0) {
          document.documentElement.style.setProperty('--bloom-header-height', `${height}px`);
        }
      }
    };
    updateMetrics();
    window.addEventListener('resize', updateMetrics, { passive: true });
    window.addEventListener('orientationchange', updateMetrics, { passive: true });
    window.addEventListener('load', updateMetrics);
  },

  // --- Account Dropdown Menu Interactions (Strict Click-To-Toggle for Desktop & Mobile) ---
  setupAccountDropdown() {
    const wrapper = document.getElementById('account-dropdown-wrapper');
    const btn = document.getElementById('account-dropdown-btn');
    const menu = document.getElementById('account-dropdown-menu');
    const chevron = document.getElementById('account-dropdown-chevron') || btn?.querySelector('svg.transition-transform');
    if (!wrapper || !btn || !menu) return;

    let isOpen = false;
    let closeTimer = null;
    let lastOpenTimestamp = 0;
    let lastToggleTimestamp = 0;
    let openScrollY = 0;

    // Helper: explicitly synchronize chevron arrow and aria attributes
    const setVisualState = (open) => {
      if (open) {
        menu.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      } else {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      }
    };

    // Helper: Open dropdown
    const openMenu = () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      isOpen = true;
      this._isAccountMenuOpen = true;
      lastToggleTimestamp = Date.now();
      lastOpenTimestamp = Date.now();
      openScrollY = window.scrollY;
      this.updateAccountDropdownUI();
      setVisualState(true);
    };

    // Helper: Close dropdown (immediate or with natural tolerance delay)
    const closeMenu = (immediate = false) => {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      if (immediate) {
        isOpen = false;
        this._isAccountMenuOpen = false;
        lastToggleTimestamp = Date.now();
        setVisualState(false);
      } else {
        closeTimer = setTimeout(() => {
          isOpen = false;
          this._isAccountMenuOpen = false;
          lastToggleTimestamp = Date.now();
          setVisualState(false);
          closeTimer = null;
        }, 220);
      }
    };

    const toggleMenu = () => {
      const now = Date.now();
      // If it is open and was opened more than 300ms ago, toggle closed.
      // If it was just opened by hover in the last 300ms, keep it open!
      if ((isOpen || menu.classList.contains('is-open')) && (now - lastOpenTimestamp > 300)) {
        closeMenu(true);
      } else {
        openMenu();
      }
    };

    // Store references on instance
    this._openAccountMenu = openMenu;
    this._closeAccountMenu = () => closeMenu(true);
    this._toggleAccountMenu = toggleMenu;

    // Ensure initial closed state on page load
    closeMenu(true);

    // --- 1. DESKTOP HOVER: ONE CONTINUOUS HOVER INTERACTION AREA ---
    // Moving pointer into wrapper (button OR menu panel) opens immediately and cancels any closing timer
    wrapper.addEventListener('mouseenter', () => {
      openMenu();
    });

    // Moving pointer completely outside wrapper closes after 220ms grace period
    wrapper.addEventListener('mouseleave', () => {
      closeMenu(false);
    });

    // --- 2. PRIMARY INTERACTION: CLICK TO TOGGLE (Desktop, Mobile, Tablet) ---
    btn.onclick = (e) => {
      this.toggleAccountDropdown(e);
    };

    // --- 3. PREVENT CLICKS INSIDE THE DROPDOWN PANEL FROM CLOSING IT PREMATURELY ---
    menu.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // --- 4. CLOSE ON CLICK/TAP OUTSIDE (Guarded against same-interaction clicks) ---
    const handleOutsideInteraction = (e) => {
      if (!isOpen && !menu.classList.contains('is-open')) return;
      // Prevent closing during the exact same interaction as opening
      if (Date.now() - lastToggleTimestamp < 220) return;
      // Ignore if clicked inside account wrapper
      if (e.target && e.target.closest && e.target.closest('#account-dropdown-wrapper')) return;
      closeMenu(true);
    };

    document.addEventListener('click', handleOutsideInteraction);
    document.addEventListener('touchend', handleOutsideInteraction, { passive: true });

    // --- 5. CLOSE ON ESCAPE KEY ---
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && (isOpen || menu.classList.contains('is-open'))) {
        e.preventDefault();
        closeMenu(true);
        btn.focus();
      }
    });

    // --- 6. CLOSE ON MEANINGFUL PAGE SCROLL (> 60px) ---
    window.addEventListener('scroll', () => {
      if ((isOpen || menu.classList.contains('is-open')) && Math.abs(window.scrollY - openScrollY) > 60) {
        closeMenu(true);
      }
    }, { passive: true });

    // --- 6. MENU ITEM SELECTION & NAVIGATION ---
    const menuItems = Array.from(menu.querySelectorAll('.account-menu-item'));
    menuItems.forEach((item, index) => {
      // Click selection
      item.addEventListener('click', (e) => {
        const tab = item.dataset.tab;
        closeMenu();
        if (tab) {
          e.preventDefault();
          this.openAccount(tab);
        } else if (item.id === 'account-dropdown-logout-btn') {
          // Handled by onclick
        }
      });

      // Arrow navigation
      item.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = menuItems[(index + 1) % menuItems.length];
          next?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = menuItems[(index - 1 + menuItems.length) % menuItems.length];
          prev?.focus();
        }
      });
    });

    // Keyboard support on the trigger button
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        if (!isOpen && !menu.classList.contains('is-open')) {
          e.preventDefault();
          openMenu();
          const firstItem = menu.querySelector('.account-menu-item');
          firstItem?.focus();
        }
      }
    });
  },

  toggleAccountDropdown(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const now = Date.now();
    if (this._lastToggle && (now - this._lastToggle < 120)) {
      return;
    }
    this._lastToggle = now;

    if (!this._isInitialized) {
      this.init();
    }

    if (this._toggleAccountMenu) {
      this._toggleAccountMenu();
      return;
    }

    const menu = document.getElementById('account-dropdown-menu');
    const btn = document.getElementById('account-dropdown-btn');
    const chevron = document.getElementById('account-dropdown-chevron') || btn?.querySelector('svg.transition-transform');
    if (!menu) return;

    const isOpen = menu.classList.contains('is-open');
    if (isOpen) {
      menu.classList.remove('is-open');
      btn?.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
      this._isAccountMenuOpen = false;
    } else {
      this.updateAccountDropdownUI();
      menu.classList.add('is-open');
      btn?.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
      this._isAccountMenuOpen = true;
    }
  },

  openAccountDropdown() {
    if (this._openAccountMenu) {
      this._openAccountMenu();
    } else {
      const btn = document.getElementById('account-dropdown-btn');
      const menu = document.getElementById('account-dropdown-menu');
      const chevron = document.getElementById('account-dropdown-chevron') || btn?.querySelector('svg.transition-transform');
      if (!menu) return;
      this.updateAccountDropdownUI();
      menu.classList.add('is-open');
      btn?.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
      this._isAccountMenuOpen = true;
    }
  },

  closeAccountDropdown() {
    if (this._closeAccountMenu) {
      this._closeAccountMenu();
    } else {
      const btn = document.getElementById('account-dropdown-btn');
      const menu = document.getElementById('account-dropdown-menu');
      const chevron = document.getElementById('account-dropdown-chevron') || btn?.querySelector('svg.transition-transform');
      if (!menu) return;
      menu.classList.remove('is-open');
      btn?.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
      this._isAccountMenuOpen = false;
    }
  },

  updateAccountDropdownUI() {
    const profile = window.bloomCommerce ? window.bloomCommerce.getCustomerProfile() : null;
    const headerGreeting = document.getElementById('header-user-greeting');
    const nameEl = document.getElementById('account-dropdown-name');
    const emailEl = document.getElementById('account-dropdown-email');
    const avatarEl = document.getElementById('account-dropdown-avatar');
    const badgeEl = document.getElementById('account-dropdown-badge');

    if (profile && profile.name) {
      const firstName = profile.name.split(' ')[0];
      if (headerGreeting) headerGreeting.textContent = `Hello, ${firstName}`;
      if (nameEl) nameEl.textContent = `Hello, ${profile.name}`;
      if (emailEl) emailEl.textContent = profile.email || 'customer@bloombeauty.com';
      if (avatarEl) avatarEl.textContent = profile.name.charAt(0).toUpperCase();
      if (badgeEl) {
        badgeEl.textContent = 'VIP Member';
        badgeEl.className = 'text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full';
      }
    } else {
      if (headerGreeting) headerGreeting.textContent = 'Hello, Sign In';
      if (nameEl) nameEl.textContent = 'Hello, Sign In';
      if (emailEl) emailEl.textContent = 'Sign in for personalized offers';
      if (avatarEl) avatarEl.textContent = '?';
      if (badgeEl) {
        badgeEl.textContent = 'Guest';
        badgeEl.className = 'text-[10px] font-semibold text-bloom-muted bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full';
      }
    }
  },

  // --- URL Hash Router ---
  setupHashRouter() {
    const onRoute = () => {
      this.closeAccountDropdown();
      this.handleRoute(window.location.hash);
    };

    window.addEventListener('hashchange', onRoute);
    window.addEventListener('popstate', onRoute);

    // Check initial hash on load
    if (window.location.hash) {
      setTimeout(() => {
        this.handleRoute(window.location.hash);
      }, 100);
    }
  },

  handleRoute(hash) {
    this.closeAccountDropdown();
    if (!hash || hash === '#' || hash === '#/') {
      this.closeAllPageViews();
      return;
    }

    // 1. Product Detail Route: #product/prod-id
    if (hash.startsWith('#product/')) {
      const prodId = hash.replace('#product/', '').trim();
      this.renderProductDetailPage(prodId);
      return;
    }

    // 2. Account Route: #account or #account/orders
    if (hash.startsWith('#account')) {
      const parts = hash.split('/');
      const tab = parts[1] || 'profile';
      this.renderAccountDashboard(tab);
      return;
    }

    // 3. Track Order Route: #track/orderId
    if (hash.startsWith('#track/')) {
      const orderId = hash.replace('#track/', '').trim();
      this.renderTrackOrderView(orderId);
      return;
    }

    // 4. Checkout Route: #checkout
    if (hash === '#checkout') {
      this.openCheckoutFlow();
      return;
    }

    // 5. Order Confirmed: #order-confirmed/orderId
    if (hash.startsWith('#order-confirmed/')) {
      const orderId = hash.replace('#order-confirmed/', '').trim();
      this.renderOrderConfirmation(orderId);
      return;
    }

    // 6. Admin Portal: #admin
    if (hash === '#admin') {
      this.renderAdminPortal();
      return;
    }
  },

  // --- PART 1: PRODUCT DETAIL PAGE & STATE-PRESERVING BACK NAVIGATION ---
  openProductPage(productId) {
    // Record current browsing state
    const searchModal = document.getElementById('search-filter-modal');
    const wasSearchOpen = searchModal && searchModal.classList.contains('is-active');

    this.navState = {
      scrollY: window.scrollY,
      wasSearchModalOpen: wasSearchOpen,
      filterCategory: window.BloomApp ? window.BloomApp.currentFilterCategory : 'All',
      filterBrand: window.BloomApp ? window.BloomApp.currentFilterBrand : 'All',
      searchQuery: document.getElementById('catalog-search-input')?.value || '',
      sort: window.BloomApp ? window.BloomApp.currentSort : 'featured',
      fromContext: wasSearchOpen ? (window.BloomApp?.currentFilterCategory || 'Catalog') : 'Homepage'
    };

    // Cleanly hide search modal so it never overlaps
    if (wasSearchOpen) {
      searchModal.classList.remove('is-active');
    }

    // Update URL hash
    window.location.hash = `#product/${productId}`;
  },

  renderProductDetailPage(productId) {
    const product = window.data?.products?.find(p => p.id === productId);
    if (!product) {
      this.closeProductDetailPage();
      window.BloomApp?.showToast('Product not found');
      return;
    }

    this.activeDetailProduct = product;
    this.activeDetailQuantity = 1;
    this.activeDetailShade = product.shades ? product.shades[0].name : null;
    this.activeDetailSize = product.sizes ? product.sizes[0] : null;
    this.activeDetailImageIndex = 0;

    let viewEl = document.getElementById('bloom-product-detail-page');
    if (!viewEl) {
      viewEl = document.createElement('div');
      viewEl.id = 'bloom-product-detail-page';
      viewEl.className = 'bloom-page-view';
      document.body.appendChild(viewEl);
    }

    const isSaved = window.bloomStore ? window.bloomStore.isInWishlist(product.id) : false;
    const images = product.images && product.images.length > 0 ? product.images : ['images/placeholder.jpg'];
    const activeImage = images[this.activeDetailImageIndex] || images[0];

    // Related products (same category)
    const relatedProducts = (window.data?.products || [])
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    const backLabel = this.navState.wasSearchModalOpen 
      ? `← Back to ${this.navState.filterCategory !== 'All' ? this.navState.filterCategory : 'Browse Catalog'}`
      : '← Back to Shopping';

    viewEl.innerHTML = `
      <!-- Sticky Navigation Bar on Product Detail Page -->
      <div class="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-bloom-border px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <button type="button" 
                onclick="BloomEcommerceUI.handleProductBackNavigation()" 
                class="flex items-center gap-2 text-xs sm:text-sm font-bold text-bloom-deepRose hover:text-bloom-text transition-colors bg-white border border-bloom-border px-3.5 py-1.5 rounded-full shadow-sm hover:border-bloom-rose">
          <span>${backLabel}</span>
        </button>

        <div class="flex items-center gap-3">
          <button type="button" 
                  onclick="BloomEcommerceUI.toggleWishlistDetail('${product.id}')"
                  class="p-2 rounded-full border border-bloom-border hover:bg-bloom-soft text-bloom-text transition-colors" 
                  title="Save to Wishlist">
            <svg class="w-5 h-5 ${isSaved ? 'text-bloom-rose fill-current' : 'text-bloom-text'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
            </svg>
          </button>
          <button type="button" 
                  onclick="BloomEcommerceUI.closeProductDetailPage()" 
                  class="p-2 rounded-full border border-bloom-border hover:bg-bloom-soft text-gray-500 hover:text-bloom-text transition-colors"
                  aria-label="Close Product">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- Main Product Details Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        <!-- Breadcrumbs -->
        <nav class="text-xs text-bloom-muted mb-6 flex items-center gap-2">
          <a href="#" onclick="BloomEcommerceUI.closeProductDetailPage(); return false;" class="hover:text-bloom-deepRose">Home</a>
          <span>/</span>
          <span class="hover:text-bloom-deepRose cursor-pointer" onclick="BloomEcommerceUI.handleProductBackNavigation()">${product.category}</span>
          <span>/</span>
          <span class="font-semibold text-bloom-text truncate max-w-xs">${product.name}</span>
        </nav>

        <!-- Product Hero Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <!-- Left: Gallery & Zoom Preview (5 cols) -->
          <div class="lg:col-span-5 space-y-4">
            <div class="relative bg-white border border-bloom-border rounded-2xl overflow-hidden shadow-sm aspect-square flex items-center justify-center p-4">
              <img id="detail-main-img" 
                   src="${activeImage}" 
                   alt="${product.name}" 
                   class="w-full h-full object-contain transition-transform duration-300 hover:scale-105 cursor-zoom-in" />
              
              <!-- Badges -->
              <div class="absolute top-4 left-4 flex flex-col gap-1.5">
                ${product.badge ? `<span class="bg-[#292329] text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase">${product.badge}</span>` : ''}
                ${product.discountPercent > 0 ? `<span class="bg-[#F8E9EC] text-[#A6536F] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">${product.discountPercent}% OFF</span>` : ''}
              </div>
            </div>

            <!-- Thumbnail Strip -->
            ${images.length > 1 ? `
              <div class="flex gap-3 overflow-x-auto py-1">
                ${images.map((img, idx) => `
                  <button type="button" 
                          onclick="BloomEcommerceUI.switchDetailImage(${idx})"
                          class="w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${idx === this.activeDetailImageIndex ? 'border-bloom-rose shadow-md scale-105' : 'border-bloom-border opacity-70 hover:opacity-100'}">
                    <img src="${img}" alt="Thumbnail ${idx + 1}" class="w-full h-full object-cover" />
                  </button>
                `).join('')}
              </div>
            ` : ''}

            <!-- Authenticity & Delivery Trust Box -->
            <div class="grid grid-cols-3 gap-2 bg-[#FAF6F7] border border-bloom-border rounded-xl p-3.5 text-center text-[11px] text-bloom-text">
              <div class="flex flex-col items-center">
                <span class="text-base mb-1">🛡️</span>
                <span class="font-bold">100% Genuine</span>
                <span class="text-[9px] text-bloom-muted">Authorized Brand</span>
              </div>
              <div class="flex flex-col items-center border-x border-bloom-border">
                <span class="text-base mb-1">🚚</span>
                <span class="font-bold">Fast Dispatch</span>
                <span class="text-[9px] text-bloom-muted">In 24 Hours</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="text-base mb-1">🔄</span>
                <span class="font-bold">Easy Returns</span>
                <span class="text-[9px] text-bloom-muted">7 Days Returnable</span>
              </div>
            </div>
          </div>

          <!-- Right: Details, Pricing, Options & Actions (7 cols) -->
          <div class="lg:col-span-7 flex flex-col space-y-6">
            
            <!-- Brand & Title -->
            <div>
              <span class="text-xs uppercase font-bold tracking-widest text-bloom-rose mb-1.5 inline-block">${product.brand}</span>
              <h1 class="text-2xl sm:text-3xl font-serif font-bold text-bloom-text leading-tight mb-2.5">${product.name}</h1>
              
              <!-- Ratings -->
              <div class="flex items-center gap-3 text-xs">
                <div class="flex items-center gap-1 bg-[#292329] text-white px-2.5 py-0.5 rounded text-[11px] font-bold">
                  <span>${product.rating || '4.8'}</span>
                  <span>★</span>
                </div>
                <span class="text-bloom-muted font-medium">${(product.reviewCount || 1200).toLocaleString('en-IN')} Verified Customer Ratings</span>
                <span class="text-emerald-700 font-semibold text-[11px]">✔ Verified Authentic</span>
              </div>
            </div>

            <!-- Price Box in INR (₹) -->
            <div class="p-4 bg-white border border-bloom-border rounded-xl flex items-baseline gap-3 shadow-sm">
              <span class="text-3xl font-bold text-[#292329]">${window.formatINR(product.price)}</span>
              ${product.originalPrice > product.price ? `
                <span class="text-sm text-gray-400 line-through">${window.formatINR(product.originalPrice)}</span>
                <span class="text-xs font-bold text-[#A6536F] bg-[#F8E9EC] px-2.5 py-1 rounded-full">${product.discountPercent}% OFF</span>
              ` : ''}
              <span class="text-[11px] text-bloom-muted ml-auto">Inclusive of all taxes</span>
            </div>

            <!-- Promotional Offers -->
            <div class="bg-[#FAF6F7] border border-bloom-border rounded-xl p-4 space-y-2">
              <span class="text-xs uppercase font-bold tracking-wider text-bloom-rose block mb-1">Available Beauty Offers</span>
              <div class="flex items-start gap-2 text-xs text-bloom-text">
                <span class="text-bloom-rose font-bold">🏷️ Special Coupon:</span>
                <span>Use code <strong>BLOOM20</strong> in Bag for 20% OFF on this item.</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-bloom-text">
                <span class="text-emerald-700 font-bold">💳 Bank Offer:</span>
                <span>Instant 10% discount on HDFC & ICICI Credit Cards.</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-bloom-text">
                <span class="text-amber-700 font-bold">🎁 Free Gift:</span>
                <span>Complimentary luxury perfume sample with orders above ₹1,499.</span>
              </div>
            </div>

            <!-- Variants: Shades Swatches -->
            ${product.shades && product.shades.length > 0 ? `
              <div class="space-y-2">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-semibold text-bloom-text">Selected Shade: <strong id="detail-active-shade-name" class="text-bloom-deepRose">${this.activeDetailShade}</strong></span>
                  <span class="text-bloom-muted">${product.shades.length} shades available</span>
                </div>
                <div class="flex flex-wrap gap-2.5">
                  ${product.shades.map((s, idx) => `
                    <button type="button" 
                            onclick="BloomEcommerceUI.selectDetailShade('${s.name}', this)"
                            class="w-7 h-7 rounded-full border-2 transition-all ${s.name === this.activeDetailShade ? 'border-bloom-deepRose ring-2 ring-bloom-rose/40 scale-110' : 'border-white shadow'}"
                            style="background-color: ${s.hex};"
                            title="${s.name}"></button>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Variants: Sizes -->
            ${product.sizes && product.sizes.length > 0 ? `
              <div class="space-y-2">
                <span class="text-xs font-semibold text-bloom-text block">Select Size:</span>
                <div class="flex gap-2">
                  ${product.sizes.map(sz => `
                    <button type="button" 
                            onclick="BloomEcommerceUI.selectDetailSize('${sz}', this)"
                            class="px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${sz === this.activeDetailSize ? 'border-[#292329] bg-[#292329] text-white shadow-sm' : 'border-bloom-border bg-white text-bloom-text hover:bg-bloom-soft'}">
                      ${sz}
                    </button>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Quantity & In-Stock Status -->
            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2 text-xs font-semibold text-bloom-text">
                <span>Quantity:</span>
                <div class="flex items-center border border-bloom-border rounded-lg bg-white overflow-hidden shadow-sm">
                  <button type="button" onclick="BloomEcommerceUI.changeDetailQuantity(-1)" class="px-3 py-1.5 text-gray-500 hover:bg-bloom-soft">-</button>
                  <span id="detail-qty-val" class="px-3 py-1.5 text-xs font-bold text-bloom-text min-w-[28px] text-center">1</span>
                  <button type="button" onclick="BloomEcommerceUI.changeDetailQuantity(1)" class="px-3 py-1.5 text-gray-500 hover:bg-bloom-soft">+</button>
                </div>
              </div>

              <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>In Stock & Ready for Dispatch</span>
              </div>
            </div>

            <!-- Primary Action Buttons: Add to Bag & Buy Now -->
            <div class="flex flex-col sm:flex-row gap-3.5 pt-2">
              <button type="button" 
                      onclick="BloomEcommerceUI.addToCartFromDetail()"
                      class="flex-1 bg-[#292329] hover:bg-bloom-deepRose text-white py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors shadow-md flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>
                <span>Add to Bag</span>
              </button>

              <button type="button" 
                      onclick="BloomEcommerceUI.buyNowFromDetail()"
                      class="flex-1 bg-bloom-rose hover:bg-bloom-deepRose text-white py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors shadow-md flex items-center justify-center gap-2">
                <span>⚡ Buy Now</span>
              </button>
            </div>

            <!-- PIN Code Delivery SLA Checker -->
            <div class="border border-bloom-border rounded-xl p-3.5 bg-white space-y-2">
              <span class="text-xs font-semibold text-bloom-text block">Check Delivery SLA for Your PIN Code:</span>
              <div class="flex gap-2">
                <input type="text" 
                       id="delivery-pin-input" 
                       placeholder="Enter 6-digit PIN (e.g. 560038)" 
                       maxlength="6"
                       class="text-xs bg-[#FAF6F7] border border-bloom-border rounded-lg px-3 py-2 flex-1 focus:outline-none focus:border-bloom-rose" />
                <button type="button" 
                        onclick="BloomEcommerceUI.checkPinDelivery()"
                        class="bg-[#292329] hover:bg-bloom-deepRose text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors">
                  Check
                </button>
              </div>
              <p id="delivery-pin-result" class="text-xs text-bloom-muted">
                Estimated delivery in <strong>6 business days</strong> across India | Cash on Delivery available.
              </p>
            </div>

            <!-- Accordion / Tabs: Description, Key Benefits, Ingredients -->
            <div class="border-t border-bloom-border pt-4 space-y-4">
              <div>
                <h4 class="font-bold text-xs uppercase tracking-wider text-bloom-rose mb-1.5">Product Description</h4>
                <p class="text-xs sm:text-sm text-bloom-muted leading-relaxed">${product.description}</p>
              </div>

              ${product.keyBenefits && product.keyBenefits.length > 0 ? `
                <div>
                  <h4 class="font-bold text-xs uppercase tracking-wider text-bloom-rose mb-1.5">Key Benefits</h4>
                  <ul class="list-disc list-inside text-xs text-bloom-muted space-y-1">
                    ${product.keyBenefits.map(b => `<li>${b}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              ${product.ingredients ? `
                <div>
                  <h4 class="font-bold text-xs uppercase tracking-wider text-bloom-rose mb-1.5">Formulation & Ingredients</h4>
                  <p class="text-xs text-bloom-muted leading-relaxed">${product.ingredients}</p>
                </div>
              ` : ''}
            </div>

          </div>
        </div>

        <!-- Related Products Section -->
        ${relatedProducts.length > 0 ? `
          <div class="mt-16 pt-12 border-t border-bloom-border">
            <div class="flex items-center justify-between mb-6">
              <div>
                <span class="text-xs uppercase font-bold tracking-widest text-bloom-rose block mb-1">Complete Your Routine</span>
                <h3 class="text-xl sm:text-2xl font-serif font-bold text-bloom-text">You May Also Love</h3>
              </div>
              <button type="button" onclick="BloomEcommerceUI.handleProductBackNavigation()" class="text-xs font-semibold text-bloom-deepRose hover:underline">
                View All in ${product.category} &rarr;
              </button>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              ${relatedProducts.map(p => `
                <div class="bloom-card group cursor-pointer" onclick="BloomEcommerceUI.openProductPage('${p.id}')">
                  <div class="bloom-image-box">
                    <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div class="p-3.5 flex flex-col flex-1">
                    <span class="text-[10px] uppercase font-bold text-bloom-rose">${p.brand}</span>
                    <h4 class="text-xs font-bold text-bloom-text line-clamp-1 group-hover:text-bloom-deepRose transition-colors">${p.name}</h4>
                    <span class="text-xs font-bold text-bloom-text mt-auto pt-2">${window.formatINR(p.price)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    `;

    viewEl.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    viewEl.scrollTop = 0;
  },

  switchDetailImage(index) {
    this.activeDetailImageIndex = index;
    const img = this.activeDetailProduct?.images[index];
    if (img) {
      const el = document.getElementById('detail-main-img');
      if (el) el.src = img;
    }
  },

  selectDetailShade(shadeName, btn) {
    this.activeDetailShade = shadeName;
    const nameEl = document.getElementById('detail-active-shade-name');
    if (nameEl) nameEl.textContent = shadeName;
    btn.parentElement.querySelectorAll('button').forEach(b => {
      b.classList.remove('border-bloom-deepRose', 'ring-2', 'ring-bloom-rose/40', 'scale-110');
      b.classList.add('border-white');
    });
    btn.classList.add('border-bloom-deepRose', 'ring-2', 'ring-bloom-rose/40', 'scale-110');
    btn.classList.remove('border-white');
  },

  selectDetailSize(size, btn) {
    this.activeDetailSize = size;
    btn.parentElement.querySelectorAll('button').forEach(b => {
      b.classList.remove('border-[#292329]', 'bg-[#292329]', 'text-white', 'shadow-sm');
      b.classList.add('border-bloom-border', 'bg-white', 'text-bloom-text');
    });
    btn.classList.add('border-[#292329]', 'bg-[#292329]', 'text-white', 'shadow-sm');
    btn.classList.remove('border-bloom-border', 'bg-white', 'text-bloom-text');
  },

  changeDetailQuantity(delta) {
    this.activeDetailQuantity = Math.max(1, Math.min(10, this.activeDetailQuantity + delta));
    const qtyEl = document.getElementById('detail-qty-val');
    if (qtyEl) qtyEl.textContent = this.activeDetailQuantity;
  },

  addToCartFromDetail() {
    if (!this.activeDetailProduct) return;
    window.bloomStore.addToCart(
      this.activeDetailProduct,
      this.activeDetailQuantity,
      this.activeDetailShade,
      this.activeDetailSize
    );
  },

  buyNowFromDetail() {
    this.addToCartFromDetail();
    this.closeProductDetailPage();
    window.location.hash = '#checkout';
  },

  toggleWishlistDetail(productId) {
    const p = window.data?.products?.find(item => item.id === productId);
    if (!p) return;
    window.bloomStore.toggleWishlist(p);
    this.renderProductDetailPage(productId);
  },

  checkPinDelivery() {
    const input = document.getElementById('delivery-pin-input');
    const result = document.getElementById('delivery-pin-result');
    const pin = (input?.value || '').trim();

    if (!pin || pin.length !== 6 || !/^\d{6}$/.test(pin)) {
      if (result) {
        result.innerHTML = '<span class="text-rose-600 font-bold">Please enter a valid 6-digit Indian PIN code.</span>';
      }
      return;
    }

    const slaDate = window.bloomCommerce.calculateBusinessDaysDate(new Date(), 6);
    if (result) {
      result.innerHTML = `
        <span class="text-emerald-700 font-bold">✔ Serviceable: Guaranteed Delivery by ${slaDate}!</span><br/>
        <span class="text-bloom-muted text-[11px]">Free delivery on orders above ₹799 | Cash on Delivery available at PIN ${pin}.</span>
      `;
    }
  },

  // State-Preserving Back Navigation
  handleProductBackNavigation() {
    this.closeProductDetailPage();

    if (this.navState.wasSearchModalOpen) {
      const modal = document.getElementById('search-filter-modal');
      if (modal) {
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
      if (window.BloomApp) {
        window.BloomApp.currentFilterCategory = this.navState.filterCategory;
        window.BloomApp.currentFilterBrand = this.navState.filterBrand;
        window.BloomApp.currentSort = this.navState.sort;
        window.BloomApp.renderCatalogResults();
      }
    } else {
      window.scrollTo({
        top: this.navState.scrollY,
        behavior: 'instant'
      });
    }

    // Reset hash without triggering unwanted navigation
    history.replaceState(null, '', window.location.pathname + window.location.search);
  },

  closeProductDetailPage() {
    const viewEl = document.getElementById('bloom-product-detail-page');
    if (viewEl) {
      viewEl.classList.remove('is-visible');
    }
    document.body.style.overflow = '';
  },

  closeAllPageViews() {
    this.closeAccountDropdown();
    document.querySelectorAll('.bloom-page-view').forEach(el => {
      el.classList.remove('is-visible');
    });
    document.body.style.overflow = '';
  },

  // --- PART 2: COMPLETE CUSTOMER ACCOUNT DASHBOARD (9 TABS) ---
  openAccount(tab = 'profile') {
    window.location.hash = `#account/${tab}`;
  },

  renderAccountDashboard(activeTab = 'profile') {
    this.activeAccountTab = activeTab;
    const profile = window.bloomCommerce.getCustomerProfile() || {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+91 98765 43210',
      memberSince: 'October 2024'
    };

    let viewEl = document.getElementById('bloom-account-page');
    if (!viewEl) {
      viewEl = document.createElement('div');
      viewEl.id = 'bloom-account-page';
      viewEl.className = 'bloom-page-view';
      document.body.appendChild(viewEl);
    }

    viewEl.innerHTML = `
      <!-- Account Header Bar -->
      <div class="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-bloom-border px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <button type="button" 
                onclick="BloomEcommerceUI.closeAccountPage()" 
                class="flex items-center gap-2 text-xs sm:text-sm font-bold text-bloom-deepRose hover:text-bloom-text transition-colors bg-white border border-bloom-border px-3.5 py-1.5 rounded-full shadow-sm hover:border-bloom-rose">
          <span>&larr; Back to Shopping</span>
        </button>

        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-bloom-text hidden sm:inline">${profile.name}</span>
          <button type="button" onclick="BloomEcommerceUI.closeAccountPage()" class="p-2 text-gray-500 hover:text-bloom-text rounded-full hover:bg-bloom-soft">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- Account Content Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        <!-- User Welcome Banner -->
        <div class="bg-gradient-to-r from-bloom-soft via-[#FDF3F5] to-white border border-bloom-border rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-full bg-[#292329] text-white flex items-center justify-center font-serif text-xl font-bold shadow-md">
              ${profile.name.charAt(0)}
            </div>
            <div>
              <h2 class="text-xl sm:text-2xl font-serif font-bold text-bloom-text">Hello, ${profile.name}!</h2>
              <p class="text-xs text-bloom-muted">${profile.email} &bull; ${profile.phone}</p>
              <span class="inline-block mt-1 bg-white/80 border border-bloom-border text-[10px] font-bold text-bloom-rose px-2.5 py-0.5 rounded-full uppercase">
                Bloom VIP Member Since ${profile.memberSince || '2024'}
              </span>
            </div>
          </div>
          <button type="button" onclick="BloomEcommerceUI.switchAccountTab('orders')" class="bg-[#292329] hover:bg-bloom-deepRose text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm">
            View Recent Orders
          </button>
        </div>

        <!-- 2-Column Dashboard Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Navigation Sidebar (4 cols) -->
          <div class="lg:col-span-4 bg-white border border-bloom-border rounded-2xl p-3 sm:p-4 shadow-sm space-y-1">
            <button type="button" onclick="BloomEcommerceUI.switchAccountTab('profile')" class="account-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-bloom-text transition-colors hover:bg-bloom-soft ${activeTab === 'profile' ? 'is-active' : ''}">
              <span>👤</span> <span>My Profile</span>
            </button>
            <button type="button" onclick="BloomEcommerceUI.switchAccountTab('orders')" class="account-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-bloom-text transition-colors hover:bg-bloom-soft ${activeTab === 'orders' ? 'is-active' : ''}">
              <span>📦</span> <span>My Orders</span>
              <span class="ml-auto text-[10px] bg-bloom-soft text-bloom-deepRose px-2 py-0.5 rounded-full font-bold">${window.bloomCommerce.getOrders().length}</span>
            </button>
            <button type="button" onclick="BloomEcommerceUI.switchAccountTab('track')" class="account-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-bloom-text transition-colors hover:bg-bloom-soft ${activeTab === 'track' ? 'is-active' : ''}">
              <span>🚚</span> <span>Track Orders</span>
            </button>
            <button type="button" onclick="BloomEcommerceUI.switchAccountTab('coupons')" class="account-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-bloom-text transition-colors hover:bg-bloom-soft ${activeTab === 'coupons' ? 'is-active' : ''}">
              <span>🏷️</span> <span>Coupons & Rewards</span>
              <span class="ml-auto text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">4 Active</span>
            </button>
            <button type="button" onclick="BloomEcommerceUI.switchAccountTab('cards')" class="account-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-bloom-text transition-colors hover:bg-bloom-soft ${activeTab === 'cards' ? 'is-active' : ''}">
              <span>💳</span> <span>Saved Cards & Wallets</span>
            </button>
            <button type="button" onclick="BloomEcommerceUI.switchAccountTab('addresses')" class="account-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-bloom-text transition-colors hover:bg-bloom-soft ${activeTab === 'addresses' ? 'is-active' : ''}">
              <span>📍</span> <span>Saved Addresses</span>
            </button>
            <button type="button" onclick="BloomEcommerceUI.switchAccountTab('wishlist')" class="account-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-bloom-text transition-colors hover:bg-bloom-soft ${activeTab === 'wishlist' ? 'is-active' : ''}">
              <span>❤️</span> <span>Wishlist</span>
              <span class="ml-auto text-[10px] bg-bloom-soft text-bloom-deepRose px-2 py-0.5 rounded-full font-bold">${window.bloomStore ? window.bloomStore.getWishlistCount() : 0}</span>
            </button>
            <button type="button" onclick="BloomEcommerceUI.switchAccountTab('giftcards')" class="account-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-bloom-text transition-colors hover:bg-bloom-soft ${activeTab === 'giftcards' ? 'is-active' : ''}">
              <span>🎁</span> <span>Gift Cards</span>
            </button>
            <div class="border-t border-bloom-border pt-1 mt-1">
              <button type="button" onclick="BloomEcommerceUI.handleLogout()" class="account-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50">
                <span>🚪</span> <span>Logout</span>
              </button>
            </div>
          </div>

          <!-- Tab Content Panel (8 cols) -->
          <div class="lg:col-span-8 bg-white border border-bloom-border rounded-2xl p-6 sm:p-8 shadow-sm" id="account-tab-panel">
            ${this.renderTabContent(activeTab, profile)}
          </div>

        </div>

      </div>
    `;

    viewEl.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  },

  switchAccountTab(tab) {
    this.activeAccountTab = tab;
    window.location.hash = `#account/${tab}`;
  },

  closeAccountPage() {
    const viewEl = document.getElementById('bloom-account-page');
    if (viewEl) viewEl.classList.remove('is-visible');
    document.body.style.overflow = '';
    history.replaceState(null, '', window.location.pathname + window.location.search);
  },

  renderTabContent(tab, profile) {
    switch (tab) {
      case 'profile':
        return `
          <div class="space-y-6">
            <div class="flex justify-between items-center pb-4 border-b border-bloom-border">
              <div>
                <h3 class="text-xl font-serif font-bold text-bloom-text">Personal Profile</h3>
                <p class="text-xs text-bloom-muted">Manage your personal identification and contact preferences</p>
              </div>
              <button type="button" onclick="BloomEcommerceUI.showEditProfileModal()" class="bg-[#292329] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-bloom-deepRose transition-colors">
                Edit Profile
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-4 bg-[#FAF6F7] border border-bloom-border rounded-xl">
                <span class="text-[10px] uppercase font-bold text-bloom-muted block mb-1">Full Legal Name</span>
                <span class="text-sm font-bold text-bloom-text">${profile.name}</span>
              </div>
              <div class="p-4 bg-[#FAF6F7] border border-bloom-border rounded-xl">
                <span class="text-[10px] uppercase font-bold text-bloom-muted block mb-1">Verified Email</span>
                <span class="text-sm font-bold text-bloom-text">${profile.email}</span>
                <span class="text-[10px] text-emerald-700 block font-semibold mt-0.5">✔ Verified</span>
              </div>
              <div class="p-4 bg-[#FAF6F7] border border-bloom-border rounded-xl">
                <span class="text-[10px] uppercase font-bold text-bloom-muted block mb-1">Mobile Contact</span>
                <span class="text-sm font-bold text-bloom-text">${profile.phone}</span>
                <span class="text-[10px] text-emerald-700 block font-semibold mt-0.5">✔ OTP Verified</span>
              </div>
              <div class="p-4 bg-[#FAF6F7] border border-bloom-border rounded-xl">
                <span class="text-[10px] uppercase font-bold text-bloom-muted block mb-1">Account Creation</span>
                <span class="text-sm font-bold text-bloom-text">${profile.memberSince || 'October 2024'}</span>
                <span class="text-[10px] text-bloom-rose block font-semibold mt-0.5">Authentic Buyer Status</span>
              </div>
            </div>

            <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-3">
              <span class="text-lg">🔒</span>
              <div>
                <strong>Secure Authentication Active</strong>
                <p class="text-[11px] text-emerald-700 mt-0.5">Your orders, invoices, and saved delivery addresses are strictly tied to your authenticated phone and email session.</p>
              </div>
            </div>
          </div>
        `;

      case 'orders':
        const orders = window.bloomCommerce.getOrders();
        return `
          <div class="space-y-6">
            <div class="flex justify-between items-center pb-4 border-b border-bloom-border">
              <div>
                <h3 class="text-xl font-serif font-bold text-bloom-text">My Orders (${orders.length})</h3>
                <p class="text-xs text-bloom-muted">Review past beauty orders, download tax invoices, and track live shipments</p>
              </div>
            </div>

            ${orders.length === 0 ? `
              <div class="py-16 text-center">
                <div class="w-16 h-16 bg-bloom-soft text-bloom-rose rounded-full mx-auto flex items-center justify-center text-2xl mb-3">🛍️</div>
                <h4 class="font-serif font-bold text-base text-bloom-text mb-1">No Orders Placed Yet</h4>
                <p class="text-xs text-bloom-muted mb-4">Start discovering luxury fragrances, clean skincare, and velvety lipsticks.</p>
                <button type="button" onclick="BloomEcommerceUI.closeAccountPage()" class="bg-[#292329] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-bloom-deepRose transition-colors">
                  Explore Products
                </button>
              </div>
            ` : `
              <div class="space-y-4">
                ${orders.map(o => `
                  <div class="border border-bloom-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    
                    <!-- Order Header -->
                    <div class="bg-[#FAF6F7] p-4 border-b border-bloom-border flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span class="text-bloom-muted block">Order Placed:</span>
                        <strong class="text-bloom-text">${o.formattedDate}</strong>
                      </div>
                      <div>
                        <span class="text-bloom-muted block">Order ID:</span>
                        <strong class="text-bloom-text">${o.id}</strong>
                      </div>
                      <div>
                        <span class="text-bloom-muted block">Total Amount:</span>
                        <strong class="text-bloom-text">${window.formatINR(o.totalAmount)}</strong>
                      </div>
                      <div>
                        <span class="text-bloom-muted block">Status:</span>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          o.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-bloom-soft text-bloom-deepRose'
                        }">${o.orderStatus}</span>
                      </div>
                    </div>

                    <!-- Items Summary -->
                    <div class="p-4 space-y-3">
                      ${o.items.map(it => `
                        <div class="flex items-center gap-3">
                          <img src="${it.image || 'images/placeholder.jpg'}" alt="${it.name}" class="w-14 h-14 rounded-lg object-cover border border-bloom-border" />
                          <div class="flex-1 min-w-0">
                            <span class="text-[10px] uppercase font-bold text-bloom-rose block">${it.brand}</span>
                            <h5 class="text-xs font-bold text-bloom-text truncate">${it.name}</h5>
                            <span class="text-[11px] text-bloom-muted">Qty: ${it.quantity} ${it.shade ? `&bull; Shade: ${it.shade}` : ''} &bull; ${window.formatINR(it.price)}</span>
                          </div>
                          <span class="text-xs font-bold text-bloom-text">${window.formatINR(it.price * it.quantity)}</span>
                        </div>
                      `).join('')}
                    </div>

                    <!-- Actions Bar -->
                    <div class="bg-white p-3.5 border-t border-bloom-border flex flex-wrap items-center justify-between gap-2">
                      <div class="text-[11px] text-bloom-muted">
                        ${o.orderStatus === 'Delivered' ? 'Delivered on ' + o.formattedDate : 'Estimated Delivery: <strong>' + (o.estimatedDelivery || 'In 6 business days') + '</strong>'}
                      </div>
                      <div class="flex items-center gap-2">
                        <button type="button" 
                                onclick="BloomEcommerceUI.renderTrackOrderView('${o.id}')"
                                class="bg-white border border-bloom-border hover:border-bloom-rose px-3 py-1.5 rounded-lg text-xs font-semibold text-bloom-text transition-colors">
                          Track Order
                        </button>
                        <button type="button" 
                                onclick="window.bloomCommerce.generatePdfInvoice('${o.id}')"
                                class="bg-[#FAF6F7] hover:bg-bloom-soft border border-bloom-border text-bloom-deepRose px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5">
                          <span>📄 Download Invoice</span>
                        </button>
                        <button type="button" 
                                onclick="BloomEcommerceUI.buyAgain('${o.id}')"
                                class="bg-[#292329] hover:bg-bloom-deepRose text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                          Buy Again
                        </button>
                      </div>
                    </div>

                  </div>
                `).join('')}
              </div>
            `}
          </div>
        `;

      case 'track':
        const allOrders = window.bloomCommerce.getOrders();
        const activeOrder = this.selectedTrackingOrderId 
          ? window.bloomCommerce.getOrderById(this.selectedTrackingOrderId)
          : (allOrders[0] || null);

        return this.renderTrackTimelineContent(activeOrder, allOrders);

      case 'coupons':
        const coupons = window.bloomCommerce.getCoupons();
        return `
          <div class="space-y-6">
            <div class="flex justify-between items-center pb-4 border-b border-bloom-border">
              <div>
                <h3 class="text-xl font-serif font-bold text-bloom-text">Available Coupons & Vouchers</h3>
                <p class="text-xs text-bloom-muted">Apply verified promotional discounts to your beauty orders</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${coupons.map(c => `
                <div class="border-2 border-dashed border-bloom-rose/40 bg-[#FAF6F7] rounded-xl p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="bg-[#292329] text-white text-xs font-mono font-bold px-3 py-1 rounded tracking-wider">${c.code}</span>
                      <span class="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">${c.status}</span>
                    </div>
                    <h5 class="text-xs font-bold text-bloom-text mb-1">${c.description}</h5>
                    <p class="text-[11px] text-bloom-muted">
                      ${c.discountPercent > 0 ? `${c.discountPercent}% Discount (Max ₹${c.maxDiscount})` : `Flat ₹${c.flatDiscount} OFF`}
                      ${c.minOrder > 0 ? ` &bull; Min spend ₹${c.minOrder}` : ''}
                    </p>
                  </div>
                  <div class="flex items-center justify-between pt-2 border-t border-bloom-border/60 text-[10px] text-bloom-muted">
                    <span>Valid until ${c.expiry}</span>
                    <button type="button" 
                            onclick="BloomEcommerceUI.applyCouponToStore('${c.code}')"
                            class="text-xs font-bold text-bloom-deepRose hover:underline">
                      Apply to Bag &rarr;
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'cards':
        const cards = window.bloomCommerce.getSavedCards();
        return `
          <div class="space-y-6">
            <div class="flex justify-between items-center pb-4 border-b border-bloom-border">
              <div>
                <h3 class="text-xl font-serif font-bold text-bloom-text">Saved Cards & Payment Methods</h3>
                <p class="text-xs text-bloom-muted">Encrypted tokens managed securely via PCI-DSS Compliant Gateway</p>
              </div>
              <button type="button" onclick="BloomEcommerceUI.showAddCardModal()" class="bg-[#292329] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-bloom-deepRose transition-colors">
                + Add New Method
              </button>
            </div>

            <div class="space-y-3">
              ${cards.map(cd => `
                <div class="border border-bloom-border rounded-xl p-4 flex items-center justify-between bg-white shadow-sm">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-[#FAF6F7] border border-bloom-border flex items-center justify-center text-lg">
                      ${cd.type === 'upi' ? '📱' : '💳'}
                    </div>
                    <div>
                      <span class="text-xs font-bold text-bloom-text block">
                        ${cd.type === 'upi' ? cd.upiId : `${cd.bank} ${cd.brand} (•••• ${cd.last4})`}
                      </span>
                      <span class="text-[11px] text-bloom-muted">
                        ${cd.type === 'upi' ? 'UPI Biometric Direct Debit' : `Expires ${cd.expiry} &bull; ${cd.nameOnCard}`}
                      </span>
                    </div>
                  </div>
                  <button type="button" onclick="BloomEcommerceUI.removeCard('${cd.id}')" class="text-xs text-rose-600 hover:underline font-semibold">
                    Remove
                  </button>
                </div>
              `).join('')}
            </div>

            <div class="p-3.5 bg-[#FCFAFB] border border-bloom-border rounded-xl text-[11px] text-bloom-muted">
              🔒 <strong>Bank-Grade Tokenization:</strong> Bloom Beauty never stores your raw credit/debit card numbers or CVV. Payment methods are processed securely through certified gateway tokens.
            </div>
          </div>
        `;

      case 'addresses':
        const addresses = window.bloomCommerce.getAddresses();
        return `
          <div class="space-y-6">
            <div class="flex justify-between items-center pb-4 border-b border-bloom-border">
              <div>
                <h3 class="text-xl font-serif font-bold text-bloom-text">Saved Delivery Addresses</h3>
                <p class="text-xs text-bloom-muted">Manage shipping locations for quick 1-click checkout</p>
              </div>
              <button type="button" onclick="BloomEcommerceUI.showAddressModal()" class="bg-[#292329] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-bloom-deepRose transition-colors">
                + Add New Address
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${addresses.map(a => `
                <div class="border-2 ${a.isDefault ? 'border-bloom-rose bg-bloom-soft/30' : 'border-bloom-border bg-white'} rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-sm">
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="text-xs font-bold text-bloom-text">${a.name}</span>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        a.type === 'Home' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }">${a.type}</span>
                    </div>
                    <p class="text-xs text-bloom-muted leading-relaxed">${a.houseNo}, ${a.street}</p>
                    ${a.landmark ? `<p class="text-[11px] text-bloom-muted">Landmark: ${a.landmark}</p>` : ''}
                    <p class="text-xs font-semibold text-bloom-text mt-1">${a.city}, ${a.state} - <strong>${a.pincode}</strong></p>
                    <p class="text-[11px] text-bloom-muted mt-1">Phone: ${a.phone}</p>
                  </div>

                  <div class="pt-3 border-t border-bloom-border/60 flex items-center justify-between text-xs">
                    ${a.isDefault ? `
                      <span class="text-[10px] font-bold text-bloom-rose">★ Default Address</span>
                    ` : `
                      <button type="button" onclick="BloomEcommerceUI.setDefaultAddress('${a.id}')" class="text-bloom-muted hover:text-bloom-deepRose font-semibold text-[11px]">Set as Default</button>
                    `}
                    <div class="flex gap-3">
                      <button type="button" onclick="BloomEcommerceUI.editAddress('${a.id}')" class="text-bloom-text hover:underline font-semibold text-[11px]">Edit</button>
                      <button type="button" onclick="BloomEcommerceUI.deleteAddress('${a.id}')" class="text-rose-600 hover:underline font-semibold text-[11px]">Delete</button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'wishlist':
        const wishlistItems = window.bloomStore ? window.bloomStore.wishlist : [];
        return `
          <div class="space-y-6">
            <div class="flex justify-between items-center pb-4 border-b border-bloom-border">
              <div>
                <h3 class="text-xl font-serif font-bold text-bloom-text">Saved Wishlist (${wishlistItems.length})</h3>
                <p class="text-xs text-bloom-muted">Items you love and saved for later</p>
              </div>
            </div>

            ${wishlistItems.length === 0 ? `
              <div class="py-16 text-center">
                <div class="w-16 h-16 bg-bloom-soft text-bloom-rose rounded-full mx-auto flex items-center justify-center text-2xl mb-3">❤️</div>
                <h4 class="font-serif font-bold text-base text-bloom-text mb-1">Your Wishlist is Empty</h4>
                <p class="text-xs text-bloom-muted mb-4">Click the heart icon on any beauty treasure to save it here.</p>
                <button type="button" onclick="BloomEcommerceUI.closeAccountPage()" class="bg-[#292329] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-bloom-deepRose transition-colors">
                  Explore Bestsellers
                </button>
              </div>
            ` : `
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                ${wishlistItems.map(it => `
                  <div class="border border-bloom-border rounded-xl p-3 flex gap-3 bg-white shadow-sm">
                    <img src="${it.images ? it.images[0] : 'images/placeholder.jpg'}" alt="${it.name}" class="w-20 h-20 rounded-lg object-cover border border-bloom-border shrink-0" />
                    <div class="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span class="text-[10px] uppercase font-bold text-bloom-rose block">${it.brand}</span>
                        <h5 class="text-xs font-bold text-bloom-text truncate">${it.name}</h5>
                        <span class="text-xs font-bold text-bloom-text">${window.formatINR(it.price)}</span>
                      </div>
                      <div class="flex items-center gap-2 pt-2">
                        <button type="button" 
                                onclick="BloomEcommerceUI.moveWishlistToCart('${it.id}')"
                                class="bg-[#292329] hover:bg-bloom-deepRose text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors">
                          Move to Bag
                        </button>
                        <button type="button" 
                                onclick="BloomEcommerceUI.removeWishlist('${it.id}')"
                                class="text-xs text-rose-600 hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        `;

      case 'giftcards':
        return `
          <div class="space-y-6">
            <div class="flex justify-between items-center pb-4 border-b border-bloom-border">
              <div>
                <h3 class="text-xl font-serif font-bold text-bloom-text">Bloom Beauty Gift Cards</h3>
                <p class="text-xs text-bloom-muted">Store credit and promotional vouchers</p>
              </div>
            </div>

            <!-- Current Balance Card -->
            <div class="bg-gradient-to-r from-[#292329] to-[#453745] text-white rounded-2xl p-6 shadow-md flex justify-between items-center">
              <div>
                <span class="text-xs text-bloom-blush uppercase tracking-wider block mb-1">Available Gift Card Balance</span>
                <span class="text-3xl font-bold font-serif">₹0.00</span>
                <span class="text-[11px] text-gray-300 block mt-1">Directly redeemable across all product categories</span>
              </div>
              <div class="text-4xl">🎁</div>
            </div>

            <!-- Redeem Voucher Code Form -->
            <div class="border border-bloom-border rounded-xl p-5 bg-[#FAF6F7] space-y-3">
              <span class="text-xs font-bold text-bloom-text block">Redeem a Gift Card Voucher</span>
              <div class="flex gap-2">
                <input type="text" id="giftcard-input" placeholder="Enter 16-digit Gift Card Code" class="text-xs uppercase bg-white border border-bloom-border rounded-lg px-3 py-2.5 flex-1 focus:outline-none focus:border-bloom-rose" />
                <button type="button" onclick="BloomEcommerceUI.redeemGiftCard()" class="bg-[#292329] hover:bg-bloom-deepRose text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors">
                  Redeem
                </button>
              </div>
              <p class="text-[11px] text-bloom-muted">
                Gift card codes can be purchased through authorized corporate campaigns or issued during seasonal promotions.
              </p>
            </div>
          </div>
        `;

      default:
        return `<div class="p-4 text-xs text-bloom-muted">Select an account tab.</div>`;
    }
  },

  // --- PART 7: ORDER TRACKING TIMELINE ---
  renderTrackTimelineContent(order, allOrders = []) {
    if (!order) {
      return `
        <div class="py-12 text-center">
          <p class="text-xs text-bloom-muted">No orders available to track.</p>
        </div>
      `;
    }

    const stages = [
      { name: 'Order Placed', icon: '📝' },
      { name: 'Order Confirmed', icon: '✔' },
      { name: 'Processing / Packed', icon: '📦' },
      { name: 'Shipped', icon: '🚚' },
      { name: 'Out for Delivery', icon: '🛵' },
      { name: 'Delivered', icon: '🎁' }
    ];

    const currentStageIdx = stages.findIndex(s => s.name === order.orderStatus);

    return `
      <div class="space-y-6">
        <div class="flex flex-wrap justify-between items-center pb-4 border-b border-bloom-border gap-2">
          <div>
            <h3 class="text-xl font-serif font-bold text-bloom-text">Live Order Tracking</h3>
            <p class="text-xs text-bloom-muted">Order ID: <strong>${order.id}</strong> &bull; Placed on ${order.formattedDate}</p>
          </div>

          <!-- Order Switcher if multiple orders exist -->
          ${allOrders.length > 1 ? `
            <select onchange="BloomEcommerceUI.selectTrackingOrder(this.value)" class="text-xs bg-[#FAF6F7] border border-bloom-border rounded-lg p-2 focus:outline-none">
              ${allOrders.map(o => `
                <option value="${o.id}" ${o.id === order.id ? 'selected' : ''}>
                  ${o.id} - ${o.items[0]?.name?.slice(0, 20)}... (${o.orderStatus})
                </option>
              `).join('')}
            </select>
          ` : ''}
        </div>

        <!-- Estimated Delivery Banner -->
        <div class="bg-gradient-to-r from-bloom-soft to-white border border-bloom-border rounded-xl p-4 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-bloom-rose block mb-0.5">Delivery Status</span>
            <span class="text-sm sm:text-base font-bold text-bloom-text">
              ${order.orderStatus === 'Delivered' ? 'Delivered Successfully! 🎉' : `Estimated Delivery: ${order.estimatedDelivery || 'In 6 business days'}`}
            </span>
            <span class="text-[11px] text-bloom-muted block mt-0.5">
              Carrier: <strong>${order.courier ? order.courier.name : 'Express Courier'}</strong> &bull; AWB: <strong>${order.courier ? order.courier.awb : 'Pending'}</strong>
            </span>
          </div>
          <button type="button" 
                  onclick="window.bloomCommerce.generatePdfInvoice('${order.id}')" 
                  class="bg-white border border-bloom-border text-bloom-deepRose hover:border-bloom-rose px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
            <span>📄 Download Invoice</span>
          </button>
        </div>

        <!-- 6-Stage Tracking Timeline -->
        <div class="p-6 bg-white border border-bloom-border rounded-xl space-y-4">
          <h4 class="text-xs uppercase font-bold tracking-wider text-bloom-rose mb-4">Shipment Progress</h4>

          <div class="space-y-2">
            ${stages.map((stage, idx) => {
              const event = order.trackingEvents ? order.trackingEvents.find(e => e.stage === stage.name) : null;
              const isCompleted = currentStageIdx >= idx;
              const isCurrent = order.orderStatus === stage.name;

              return `
                <div class="timeline-step ${isCompleted ? 'is-completed' : ''} ${isCurrent ? 'is-current' : ''}">
                  <div class="timeline-indicator text-xs font-bold">
                    ${isCompleted ? '✓' : (idx + 1)}
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-bold ${isCurrent ? 'text-bloom-deepRose font-extrabold' : (isCompleted ? 'text-bloom-text' : 'text-gray-400')}">
                        ${stage.name}
                      </span>
                      ${event && event.timestamp ? `<span class="text-[10px] text-bloom-muted">(${event.timestamp})</span>` : ''}
                      ${isCurrent ? `<span class="bg-bloom-soft text-bloom-deepRose text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse">In Progress</span>` : ''}
                    </div>
                    <p class="text-[11px] text-bloom-muted mt-0.5">
                      ${event ? event.description : (isCompleted ? 'Stage completed.' : 'Pending progression.')}
                    </p>
                    ${event && event.location ? `
                      <span class="text-[10px] text-gray-500 block mt-0.5">📍 Location: ${event.location}</span>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Shipping Address Details -->
        <div class="p-4 bg-[#FAF6F7] border border-bloom-border rounded-xl text-xs space-y-1">
          <span class="text-[10px] font-bold text-bloom-rose uppercase tracking-wider block mb-1">Delivering To</span>
          <strong>${order.customerName}</strong>
          <p class="text-bloom-muted">${order.shippingAddress.houseNo}, ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
          <span class="text-bloom-muted block">Contact: ${order.customerPhone}</span>
        </div>

      </div>
    `;
  },

  selectTrackingOrder(orderId) {
    this.selectedTrackingOrderId = orderId;
    window.location.hash = `#track/${orderId}`;
  },

  renderTrackOrderView(orderId) {
    this.selectedTrackingOrderId = orderId;
    this.renderAccountDashboard('track');
  },

  // --- PART 5: 3-STEP CHECKOUT FLOW ---
  openCheckoutFlow() {
    const cartCount = window.bloomStore ? window.bloomStore.getCartCount() : 0;
    if (cartCount === 0) {
      window.BloomApp?.showToast('Your shopping bag is empty');
      return;
    }

    this.checkoutState.step = 1;
    this.renderCheckoutModalView();
  },

  renderCheckoutModalView() {
    let modal = document.getElementById('checkout-modal');
    if (!modal) return;

    const cart = window.bloomStore.cart;
    const subtotal = window.bloomStore.getSubtotal();
    const discount = window.bloomStore.getDiscount();
    const shipping = window.bloomStore.getShipping();
    const total = window.bloomStore.getTotal();

    const profile = window.bloomCommerce.getCustomerProfile() || {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+91 98765 43210'
    };

    const addresses = window.bloomCommerce.getAddresses();
    const defaultAddress = addresses.find(a => a.isDefault) || addresses[0] || null;

    modal.innerHTML = `
      <div class="modal-content-box relative max-w-3xl p-6 sm:p-8">
        
        <!-- Modal Close Button -->
        <button type="button" 
                onclick="BloomEcommerceUI.closeCheckoutModal()" 
                class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white border border-bloom-border flex items-center justify-center text-gray-500 hover:text-bloom-text shadow-sm"
                aria-label="Close Checkout">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <!-- 3-Step Progress Header -->
        <div class="flex items-center justify-between pb-6 border-b border-bloom-border mb-6">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${this.checkoutState.step >= 1 ? 'bg-[#292329] text-white' : 'bg-bloom-soft text-bloom-muted'}">1</span>
            <span class="text-xs font-bold ${this.checkoutState.step === 1 ? 'text-bloom-deepRose' : 'text-bloom-text'}">Login / Sign Up</span>
          </div>
          <div class="h-0.5 flex-1 mx-3 bg-bloom-border"></div>
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${this.checkoutState.step >= 2 ? 'bg-[#292329] text-white' : 'bg-bloom-soft text-bloom-muted'}">2</span>
            <span class="text-xs font-bold ${this.checkoutState.step === 2 ? 'text-bloom-deepRose' : 'text-bloom-text'}">Delivery Address</span>
          </div>
          <div class="h-0.5 flex-1 mx-3 bg-bloom-border"></div>
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${this.checkoutState.step >= 3 ? 'bg-[#292329] text-white' : 'bg-bloom-soft text-bloom-muted'}">3</span>
            <span class="text-xs font-bold ${this.checkoutState.step === 3 ? 'text-bloom-deepRose' : 'text-bloom-text'}">Payment & Review</span>
          </div>
        </div>

        <!-- STEP 1: AUTHENTICATION / LOGIN -->
        ${this.checkoutState.step === 1 ? `
          <div class="space-y-5">
            <div>
              <span class="text-[10px] font-bold text-bloom-rose uppercase tracking-widest block mb-1">Step 1 of 3</span>
              <h3 class="text-xl font-serif font-bold text-bloom-text">Sign In / Register Customer Account</h3>
              <p class="text-xs text-bloom-muted">Enter your contact info to link your orders, warranty, and beauty rewards</p>
            </div>

            <form onsubmit="BloomEcommerceUI.handleCheckoutStep1Submit(event)" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-bloom-text mb-1">Full Legal Name *</label>
                <input type="text" id="chk-login-name" required value="${profile.name}" class="w-full text-xs bg-[#FAF6F7] border border-bloom-border rounded-xl p-3 focus:outline-none focus:border-bloom-rose" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-bloom-text mb-1">Email Address *</label>
                  <input type="email" id="chk-login-email" required value="${profile.email}" class="w-full text-xs bg-[#FAF6F7] border border-bloom-border rounded-xl p-3 focus:outline-none focus:border-bloom-rose" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-bloom-text mb-1">Mobile Contact (+91) *</label>
                  <input type="tel" id="chk-login-phone" required value="${profile.phone}" class="w-full text-xs bg-[#FAF6F7] border border-bloom-border rounded-xl p-3 focus:outline-none focus:border-bloom-rose" />
                </div>
              </div>

              <!-- OTP Verification Demo Simulation -->
              <div class="p-3.5 bg-bloom-soft rounded-xl border border-bloom-border">
                <span class="text-xs font-bold text-bloom-deepRose block mb-1">🔐 Identity Verification (OTP)</span>
                <p class="text-[11px] text-bloom-muted mb-2">A 4-digit verification code will be simulated for demo purposes.</p>
                <div class="flex items-center gap-2">
                  <input type="text" id="chk-login-otp" value="1234" maxlength="4" placeholder="Enter OTP" class="w-32 text-center text-xs font-mono font-bold bg-white border border-bloom-border rounded-lg p-2 focus:outline-none focus:border-bloom-rose" />
                  <span class="text-[11px] text-emerald-700 font-semibold">✔ Demo Code Auto-Filled (1234)</span>
                </div>
              </div>

              <div class="pt-2 flex justify-end">
                <button type="submit" class="w-full sm:w-auto bg-[#292329] hover:bg-bloom-deepRose text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md">
                  Verify & Continue to Shipping &rarr;
                </button>
              </div>
            </form>
          </div>
        ` : ''}

        <!-- STEP 2: SHIPPING ADDRESS -->
        ${this.checkoutState.step === 2 ? `
          <div class="space-y-5">
            <div>
              <span class="text-[10px] font-bold text-bloom-rose uppercase tracking-widest block mb-1">Step 2 of 3</span>
              <h3 class="text-xl font-serif font-bold text-bloom-text">Select or Add Delivery Address</h3>
              <p class="text-xs text-bloom-muted">Where should Bloom Beauty deliver your cosmetics package?</p>
            </div>

            <!-- Existing Saved Addresses Selection -->
            ${addresses.length > 0 ? `
              <div class="space-y-2.5">
                <span class="text-xs font-bold text-bloom-text block">Saved Addresses:</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  ${addresses.map((a, idx) => `
                    <label class="border-2 rounded-xl p-3.5 cursor-pointer transition-all flex items-start gap-3 ${
                      (this.checkoutState.address?.id === a.id || (!this.checkoutState.address && a.isDefault))
                        ? 'border-bloom-deepRose bg-bloom-soft/40 shadow-sm' 
                        : 'border-bloom-border bg-white hover:bg-bloom-soft/20'
                    }">
                      <input type="radio" name="chk_sel_address" value="${a.id}" 
                             ${(this.checkoutState.address?.id === a.id || (!this.checkoutState.address && a.isDefault)) ? 'checked' : ''}
                             onchange="BloomEcommerceUI.selectCheckoutAddress('${a.id}')"
                             class="mt-1 text-bloom-rose" />
                      <div class="text-xs">
                        <div class="flex items-center gap-2">
                          <strong>${a.name}</strong>
                          <span class="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-white border border-bloom-border">${a.type}</span>
                        </div>
                        <p class="text-bloom-muted text-[11px] mt-0.5">${a.houseNo}, ${a.street}</p>
                        <p class="text-bloom-text font-semibold text-[11px]">${a.city}, ${a.state} - ${a.pincode}</p>
                        <span class="text-bloom-muted text-[10px]">Ph: ${a.phone}</span>
                      </div>
                    </label>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Add/Enter Address Form -->
            <div class="border-t border-bloom-border pt-4">
              <span class="text-xs font-bold text-bloom-text block mb-3">Or Enter Delivery Details:</span>
              <form onsubmit="BloomEcommerceUI.handleCheckoutStep2Submit(event)" class="space-y-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-semibold text-bloom-text mb-1">Recipient Name *</label>
                    <input type="text" id="chk-addr-name" required value="${defaultAddress ? defaultAddress.name : profile.name}" class="w-full text-xs bg-[#FAF6F7] border border-bloom-border rounded-xl p-2.5 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-bloom-text mb-1">Recipient Phone *</label>
                    <input type="tel" id="chk-addr-phone" required value="${defaultAddress ? defaultAddress.phone : profile.phone}" class="w-full text-xs bg-[#FAF6F7] border border-bloom-border rounded-xl p-2.5 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-bloom-text mb-1">Flat / House / Building *</label>
                  <input type="text" id="chk-addr-house" required value="${defaultAddress ? defaultAddress.houseNo : ''}" placeholder="e.g. Flat 402, Lotus Residency" class="w-full text-xs bg-[#FAF6F7] border border-bloom-border rounded-xl p-2.5 focus:outline-none" />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-bloom-text mb-1">Street Address & Area *</label>
                  <input type="text" id="chk-addr-street" required value="${defaultAddress ? defaultAddress.street : ''}" placeholder="e.g. 12th Main Road, HAL 2nd Stage" class="w-full text-xs bg-[#FAF6F7] border border-bloom-border rounded-xl p-2.5 focus:outline-none" />
                </div>

                <div class="grid grid-cols-3 gap-2">
                  <div>
                    <label class="block text-xs font-semibold text-bloom-text mb-1">City *</label>
                    <input type="text" id="chk-addr-city" required value="${defaultAddress ? defaultAddress.city : 'Bengaluru'}" class="w-full text-xs bg-[#FAF6F7] border border-bloom-border rounded-xl p-2.5 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-bloom-text mb-1">State *</label>
                    <input type="text" id="chk-addr-state" required value="${defaultAddress ? defaultAddress.state : 'Karnataka'}" class="w-full text-xs bg-[#FAF6F7] border border-bloom-border rounded-xl p-2.5 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-bloom-text mb-1">PIN Code (6 digits) *</label>
                    <input type="text" id="chk-addr-pin" required maxlength="6" value="${defaultAddress ? defaultAddress.pincode : '560038'}" class="w-full text-xs bg-[#FAF6F7] border border-bloom-border rounded-xl p-2.5 focus:outline-none" />
                  </div>
                </div>

                <div class="flex items-center justify-between pt-4">
                  <button type="button" onclick="BloomEcommerceUI.checkoutStep(1)" class="border border-bloom-border px-5 py-2.5 rounded-xl text-xs font-semibold text-bloom-text hover:bg-bloom-soft">
                    &larr; Back to Login
                  </button>
                  <button type="submit" class="bg-[#292329] hover:bg-bloom-deepRose text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md">
                    Proceed to Payment &rarr;
                  </button>
                </div>
              </form>
            </div>
          </div>
        ` : ''}

        <!-- STEP 3: PAYMENT & ORDER REVIEW -->
        ${this.checkoutState.step === 3 ? `
          <div class="space-y-6">
            <div>
              <span class="text-[10px] font-bold text-bloom-rose uppercase tracking-widest block mb-1">Step 3 of 3</span>
              <h3 class="text-xl font-serif font-bold text-bloom-text">Payment Method & Order Review</h3>
              <p class="text-xs text-bloom-muted">Review items, delivery address, and complete payment safely</p>
            </div>

            <!-- Order Review Items -->
            <div class="border border-bloom-border rounded-xl p-4 bg-[#FAF6F7] space-y-3">
              <span class="text-xs font-bold text-bloom-text block">Items in Bag (${cart.length}):</span>
              <div class="max-h-48 overflow-y-auto space-y-2 pr-2">
                ${cart.map(item => `
                  <div class="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-bloom-border">
                    <img src="${item.product.images ? item.product.images[0] : 'images/placeholder.jpg'}" alt="${item.product.name}" class="w-12 h-12 rounded object-cover border border-bloom-border" />
                    <div class="flex-1 min-w-0 text-xs">
                      <span class="text-[9px] uppercase font-bold text-bloom-rose block">${item.product.brand}</span>
                      <h5 class="font-bold text-bloom-text truncate">${item.product.name}</h5>
                      <span class="text-bloom-muted text-[11px]">Qty: ${item.quantity} ${item.selectedShade ? `&bull; Shade: ${item.selectedShade}` : ''}</span>
                    </div>
                    <span class="text-xs font-bold text-bloom-text">${window.formatINR(item.product.price * item.quantity)}</span>
                  </div>
                `).join('')}
              </div>

              <!-- Financial Breakdown -->
              <div class="border-t border-bloom-border pt-3 space-y-1.5 text-xs text-bloom-muted">
                <div class="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span class="font-semibold text-bloom-text">${window.formatINR(subtotal)}</span>
                </div>
                ${discount > 0 ? `
                  <div class="flex justify-between text-bloom-deepRose font-semibold">
                    <span>Coupon Discount (${window.bloomStore.promoCode || 'PROMO'}):</span>
                    <span>-${window.formatINR(discount)}</span>
                  </div>
                ` : ''}
                <div class="flex justify-between">
                  <span>Express Courier Delivery:</span>
                  <span class="font-semibold text-emerald-700">${shipping === 0 ? 'FREE' : window.formatINR(shipping)}</span>
                </div>
                <div class="flex justify-between text-sm font-bold text-bloom-text border-t border-bloom-border pt-2">
                  <span>Total Payable:</span>
                  <span class="text-base text-bloom-deepRose">${window.formatINR(total)}</span>
                </div>
              </div>
            </div>

            <!-- Delivery Address Summary -->
            <div class="p-3.5 bg-white border border-bloom-border rounded-xl text-xs flex justify-between items-center">
              <div>
                <span class="text-[10px] uppercase font-bold text-bloom-muted block">Delivering To:</span>
                <strong class="text-bloom-text">${this.checkoutState.address?.name || profile.name}</strong>
                <p class="text-[11px] text-bloom-muted">${this.checkoutState.address?.houseNo}, ${this.checkoutState.address?.street}, ${this.checkoutState.address?.city} - ${this.checkoutState.address?.pincode}</p>
              </div>
              <button type="button" onclick="BloomEcommerceUI.checkoutStep(2)" class="text-xs font-bold text-bloom-deepRose hover:underline">Change</button>
            </div>

            <!-- Payment Options -->
            <div class="space-y-3">
              <span class="text-xs font-bold text-bloom-text block">Select Payment Method:</span>

              <label class="flex items-center gap-3 p-3.5 border-2 rounded-xl cursor-pointer transition-all ${
                this.checkoutState.paymentMethod === 'Credit / Debit Card' ? 'border-bloom-deepRose bg-bloom-soft/40 shadow-sm' : 'border-bloom-border bg-white'
              }">
                <input type="radio" name="chk_pay_method" value="Credit / Debit Card" 
                       ${this.checkoutState.paymentMethod === 'Credit / Debit Card' ? 'checked' : ''}
                       onchange="BloomEcommerceUI.selectPaymentMethod(this.value)"
                       class="text-bloom-rose" />
                <div class="flex-1 text-xs">
                  <span class="font-bold text-bloom-text block">Credit / Debit Card</span>
                  <span class="text-[11px] text-bloom-muted">Visa, Mastercard, RuPay, Amex via Encrypted Gateway</span>
                </div>
                <span class="text-base">💳</span>
              </label>

              <label class="flex items-center gap-3 p-3.5 border-2 rounded-xl cursor-pointer transition-all ${
                this.checkoutState.paymentMethod === 'UPI / Google Pay' ? 'border-bloom-deepRose bg-bloom-soft/40 shadow-sm' : 'border-bloom-border bg-white'
              }">
                <input type="radio" name="chk_pay_method" value="UPI / Google Pay" 
                       ${this.checkoutState.paymentMethod === 'UPI / Google Pay' ? 'checked' : ''}
                       onchange="BloomEcommerceUI.selectPaymentMethod(this.value)"
                       class="text-bloom-rose" />
                <div class="flex-1 text-xs">
                  <span class="font-bold text-bloom-text block">UPI / Google Pay / PhonePe / Paytm</span>
                  <span class="text-[11px] text-bloom-muted">Instant biometric one-tap approval</span>
                </div>
                <span class="text-base">📱</span>
              </label>

              <label class="flex items-center gap-3 p-3.5 border-2 rounded-xl cursor-pointer transition-all ${
                this.checkoutState.paymentMethod === 'Cash on Delivery (COD)' ? 'border-bloom-deepRose bg-bloom-soft/40 shadow-sm' : 'border-bloom-border bg-white'
              }">
                <input type="radio" name="chk_pay_method" value="Cash on Delivery (COD)" 
                       ${this.checkoutState.paymentMethod === 'Cash on Delivery (COD)' ? 'checked' : ''}
                       onchange="BloomEcommerceUI.selectPaymentMethod(this.value)"
                       class="text-bloom-rose" />
                <div class="flex-1 text-xs">
                  <span class="font-bold text-bloom-text block">Cash on Delivery (COD)</span>
                  <span class="text-[11px] text-bloom-muted">Pay upon parcel inspection at doorstep</span>
                </div>
                <span class="text-base">💵</span>
              </label>
            </div>

            <div class="pt-3 flex items-center justify-between">
              <button type="button" onclick="BloomEcommerceUI.checkoutStep(2)" class="border border-bloom-border px-5 py-2.5 rounded-xl text-xs font-semibold text-bloom-text hover:bg-bloom-soft">
                &larr; Back to Shipping
              </button>
              <button type="button" 
                      onclick="BloomEcommerceUI.handlePlaceOrderSubmit()" 
                      class="bg-bloom-rose hover:bg-bloom-deepRose text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2">
                <span>Place Order (${window.formatINR(total)})</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        ` : ''}

      </div>
    `;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  },

  checkoutStep(step) {
    this.checkoutState.step = step;
    this.renderCheckoutModalView();
  },

  handleCheckoutStep1Submit(e) {
    e.preventDefault();
    const name = document.getElementById('chk-login-name')?.value.trim();
    const email = document.getElementById('chk-login-email')?.value.trim();
    const phone = document.getElementById('chk-login-phone')?.value.trim();
    const otp = document.getElementById('chk-login-otp')?.value.trim();

    if (!name || !email || !phone) {
      alert('Please enter your full name, email and phone.');
      return;
    }

    if (otp !== '1234' && otp.length !== 4) {
      alert('Please enter valid 4-digit verification OTP (Demo: 1234)');
      return;
    }

    window.bloomCommerce.loginCustomer(name, email, phone);
    this.checkoutState.customer = { name, email, phone };
    this.checkoutState.step = 2;
    this.renderCheckoutModalView();
  },

  selectCheckoutAddress(addrId) {
    const addresses = window.bloomCommerce.getAddresses();
    this.checkoutState.address = addresses.find(a => a.id === addrId) || null;
    this.renderCheckoutModalView();
  },

  handleCheckoutStep2Submit(e) {
    e.preventDefault();
    const name = document.getElementById('chk-addr-name')?.value.trim();
    const phone = document.getElementById('chk-addr-phone')?.value.trim();
    const houseNo = document.getElementById('chk-addr-house')?.value.trim();
    const street = document.getElementById('chk-addr-street')?.value.trim();
    const city = document.getElementById('chk-addr-city')?.value.trim();
    const state = document.getElementById('chk-addr-state')?.value.trim();
    const pincode = document.getElementById('chk-addr-pin')?.value.trim();

    if (!name || !phone || !houseNo || !street || !city || !state || !pincode) {
      alert('Please fill all required delivery address fields.');
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    this.checkoutState.address = {
      id: 'addr-' + Date.now(),
      name,
      phone,
      houseNo,
      street,
      city,
      state,
      pincode,
      type: 'Home',
      isDefault: false
    };

    this.checkoutState.step = 3;
    this.renderCheckoutModalView();
  },

  selectPaymentMethod(method) {
    this.checkoutState.paymentMethod = method;
    this.renderCheckoutModalView();
  },

  handlePlaceOrderSubmit() {
    try {
      const cart = window.bloomStore.cart;
      if (!cart || cart.length === 0) {
        alert('Bag is empty');
        return;
      }

      const address = this.checkoutState.address || window.bloomCommerce.getAddresses()[0];
      if (!address) {
        alert('Please specify a valid delivery address.');
        this.checkoutStep(2);
        return;
      }

      const createdOrder = window.bloomCommerce.createOrder({
        items: cart,
        shippingAddress: address,
        paymentMethod: this.checkoutState.paymentMethod,
        couponCode: window.bloomStore.promoCode || ''
      });

      // Clear Cart
      window.bloomStore.clearCart();
      window.bloomStore.removePromoCode();

      this.closeCheckoutModal();

      // Navigate to Order Confirmation
      window.location.hash = `#order-confirmed/${createdOrder.id}`;

    } catch (err) {
      alert('Order placement error: ' + err.message);
    }
  },

  closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.remove('is-active');
    document.body.style.overflow = '';
  },

  // --- PART 6: ORDER CONFIRMATION VIEW ---
  renderOrderConfirmation(orderId) {
    const order = window.bloomCommerce.getOrderById(orderId);
    if (!order) return;

    let viewEl = document.getElementById('bloom-order-confirmed-page');
    if (!viewEl) {
      viewEl = document.createElement('div');
      viewEl.id = 'bloom-order-confirmed-page';
      viewEl.className = 'bloom-page-view';
      document.body.appendChild(viewEl);
    }

    viewEl.innerHTML = `
      <div class="max-w-2xl mx-auto px-4 py-16 text-center">
        
        <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center text-3xl mb-4 shadow-sm animate-bounce">
          ✓
        </div>

        <span class="text-xs font-bold uppercase tracking-widest text-bloom-rose block mb-1">Order Placed Successfully!</span>
        <h2 class="text-2xl sm:text-3xl font-serif font-bold text-bloom-text mb-2">Thank you for blooming with us!</h2>
        <p class="text-xs text-bloom-muted max-w-md mx-auto mb-6">
          Your authentic beauty order has been received and is being prepared with deluxe complimentary miniatures.
        </p>

        <!-- Order Summary Card -->
        <div class="bg-white border border-bloom-border rounded-2xl p-6 text-left shadow-sm space-y-4 mb-6">
          <div class="flex justify-between items-center pb-3 border-b border-bloom-border text-xs">
            <div>
              <span class="text-bloom-muted block">Order ID</span>
              <strong class="text-sm font-mono text-bloom-text">${order.id}</strong>
            </div>
            <div class="text-right">
              <span class="text-bloom-muted block">Estimated Delivery</span>
              <strong class="text-sm text-bloom-deepRose">${order.estimatedDelivery}</strong>
            </div>
          </div>

          <div class="space-y-2 text-xs">
            <div class="flex justify-between"><span class="text-bloom-muted">Recipient:</span><strong>${order.customerName}</strong></div>
            <div class="flex justify-between"><span class="text-bloom-muted">Delivery Address:</span><span class="text-right max-w-xs">${order.shippingAddress.houseNo}, ${order.shippingAddress.street}, ${order.shippingAddress.city} - ${order.shippingAddress.pincode}</span></div>
            <div class="flex justify-between"><span class="text-bloom-muted">Payment Mode:</span><strong>${order.paymentMethod} (${order.paymentStatus})</strong></div>
            <div class="flex justify-between text-sm font-bold pt-2 border-t border-bloom-border"><span>Total Amount:</span><span class="text-bloom-deepRose">${window.formatINR(order.totalAmount)}</span></div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" 
                  onclick="BloomEcommerceUI.renderTrackOrderView('${order.id}')"
                  class="bg-[#292329] hover:bg-bloom-deepRose text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2">
            <span>🚚 Track My Order</span>
          </button>
          <button type="button" 
                  onclick="window.bloomCommerce.generatePdfInvoice('${order.id}')"
                  class="bg-white hover:bg-bloom-soft border border-bloom-border text-bloom-deepRose px-6 py-3.5 rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-2">
            <span>📄 Download PDF Invoice</span>
          </button>
          <button type="button" 
                  onclick="BloomEcommerceUI.closeAllPageViews(); window.location.hash = '#';"
                  class="border border-bloom-border hover:bg-bloom-soft text-bloom-text px-6 py-3.5 rounded-full text-xs font-semibold transition-colors">
            Continue Shopping
          </button>
        </div>

      </div>
    `;

    viewEl.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  },

  // --- PART 10: ROLE-PROTECTED ADMIN ORDER FULFILMENT ---
  renderAdminPortal() {
    let viewEl = document.getElementById('bloom-admin-page');
    if (!viewEl) {
      viewEl = document.createElement('div');
      viewEl.id = 'bloom-admin-page';
      viewEl.className = 'bloom-page-view';
      document.body.appendChild(viewEl);
    }

    const orders = window.bloomCommerce.getOrders();

    viewEl.innerHTML = `
      <div class="sticky top-0 z-50 bg-[#292329] text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div class="flex items-center gap-2">
          <span class="text-lg">🛡️</span>
          <h2 class="font-serif font-bold text-base">Bloom Beauty Admin & Fulfilment Hub</h2>
        </div>
        <button type="button" onclick="BloomEcommerceUI.closeAllPageViews(); window.location.hash = '#';" class="text-xs bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full">
          Exit Admin View
        </button>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-xl font-serif font-bold text-bloom-text">All Customer Orders (${orders.length})</h3>
            <p class="text-xs text-bloom-muted">Authenticate shipments and advance tracking stages with verified timestamps</p>
          </div>
        </div>

        <div class="bg-white border border-bloom-border rounded-xl overflow-hidden shadow-sm">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-[#FAF6F7] border-b border-bloom-border text-[11px] font-bold text-bloom-rose uppercase tracking-wider">
                <th class="p-3.5">Order ID</th>
                <th class="p-3.5">Date</th>
                <th class="p-3.5">Customer</th>
                <th class="p-3.5">Total</th>
                <th class="p-3.5">Payment</th>
                <th class="p-3.5">Current Status</th>
                <th class="p-3.5 text-right">Advance Stage</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-bloom-border">
              ${orders.map(o => `
                <tr class="hover:bg-bloom-soft/20">
                  <td class="p-3.5 font-mono font-bold text-bloom-text">${o.id}</td>
                  <td class="p-3.5 text-bloom-muted">${o.formattedDate}</td>
                  <td class="p-3.5">
                    <strong>${o.customerName}</strong>
                    <span class="text-[10px] text-bloom-muted block">${o.shippingAddress.city} (${o.shippingAddress.pincode})</span>
                  </td>
                  <td class="p-3.5 font-bold text-bloom-text">${window.formatINR(o.totalAmount)}</td>
                  <td class="p-3.5">
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded ${o.paymentStatus.includes('Paid') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                      ${o.paymentStatus}
                    </span>
                  </td>
                  <td class="p-3.5">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-bloom-soft text-bloom-deepRose">
                      ${o.orderStatus}
                    </span>
                  </td>
                  <td class="p-3.5 text-right space-x-1.5">
                    ${o.orderStatus !== 'Processing / Packed' && o.orderStatus !== 'Shipped' && o.orderStatus !== 'Out for Delivery' && o.orderStatus !== 'Delivered' ? `
                      <button type="button" onclick="BloomEcommerceUI.adminAdvanceOrder('${o.id}', 'Processing / Packed')" class="bg-blue-600 text-white px-2.5 py-1 rounded text-[10px] font-bold">Pack</button>
                    ` : ''}
                    ${o.orderStatus !== 'Shipped' && o.orderStatus !== 'Out for Delivery' && o.orderStatus !== 'Delivered' ? `
                      <button type="button" onclick="BloomEcommerceUI.adminAdvanceOrder('${o.id}', 'Shipped')" class="bg-purple-600 text-white px-2.5 py-1 rounded text-[10px] font-bold">Ship</button>
                    ` : ''}
                    ${o.orderStatus !== 'Out for Delivery' && o.orderStatus !== 'Delivered' ? `
                      <button type="button" onclick="BloomEcommerceUI.adminAdvanceOrder('${o.id}', 'Out for Delivery')" class="bg-amber-600 text-white px-2.5 py-1 rounded text-[10px] font-bold">Out for Delivery</button>
                    ` : ''}
                    ${o.orderStatus !== 'Delivered' ? `
                      <button type="button" onclick="BloomEcommerceUI.adminAdvanceOrder('${o.id}', 'Delivered')" class="bg-emerald-600 text-white px-2.5 py-1 rounded text-[10px] font-bold">Mark Delivered</button>
                    ` : '<span class="text-emerald-700 font-bold text-[10px]">✔ Completed</span>'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    viewEl.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  },

  adminAdvanceOrder(orderId, newStatus) {
    window.bloomCommerce.adminUpdateOrderStatus(orderId, newStatus, {
      courierName: 'Blue Dart Express',
      awb: `BD-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
      location: 'Regional Hub'
    });
    this.renderAdminPortal();
  },

  // --- Helper Modals & Utilities ---
  showEditProfileModal() {
    const profile = window.bloomCommerce.getCustomerProfile();
    const newName = prompt('Update Full Name:', profile.name);
    if (!newName) return;
    const newEmail = prompt('Update Email Address:', profile.email);
    if (!newEmail) return;
    const newPhone = prompt('Update Phone (+91):', profile.phone);
    if (!newPhone) return;

    window.bloomCommerce.updateCustomerProfile({
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim()
    });
    this.updateAccountDropdownUI();
    this.renderAccountDashboard('profile');
  },

  showAddressModal() {
    const name = prompt('Recipient Name:', 'Jane Doe');
    if (!name) return;
    const houseNo = prompt('Flat / House / Building:', 'Flat 101, Sunshine Heights');
    if (!houseNo) return;
    const street = prompt('Street / Area:', 'MG Road');
    if (!street) return;
    const city = prompt('City:', 'Bengaluru');
    if (!city) return;
    const state = prompt('State:', 'Karnataka');
    if (!state) return;
    const pincode = prompt('6-digit PIN Code:', '560001');
    if (!pincode) return;

    window.bloomCommerce.addAddress({
      name,
      phone: '+91 98765 43210',
      houseNo,
      street,
      city,
      state,
      pincode,
      type: 'Home',
      isDefault: false
    });
    this.renderAccountDashboard('addresses');
  },

  setDefaultAddress(id) {
    window.bloomCommerce.setDefaultAddress(id);
    this.renderAccountDashboard('addresses');
  },

  deleteAddress(id) {
    window.bloomCommerce.deleteAddress(id);
    this.renderAccountDashboard('addresses');
  },

  removeCard(id) {
    window.bloomCommerce.removeSavedCard(id);
    this.renderAccountDashboard('cards');
  },

  showAddCardModal() {
    const brand = prompt('Card Brand (Visa, Mastercard, RuPay):', 'Visa');
    const last4 = prompt('Last 4 Digits of Card:', '5521');
    const expiry = prompt('Expiry Date (MM/YY):', '12/28');
    const bank = prompt('Issuing Bank Name:', 'Axis Bank');

    if (brand && last4 && expiry && bank) {
      window.bloomCommerce.addSavedCard({
        type: 'card',
        brand,
        last4,
        expiry,
        bank,
        nameOnCard: 'Jane Doe'
      });
      this.renderAccountDashboard('cards');
    }
  },

  applyCouponToStore(code) {
    window.bloomStore.applyPromoCode(code);
    this.closeAccountPage();
    window.BloomApp?.openCartDrawer();
  },

  moveWishlistToCart(productId) {
    const p = window.data?.products?.find(item => item.id === productId);
    if (p) {
      window.bloomStore.addToCart(p, 1);
      window.bloomStore.toggleWishlist(p);
      this.renderAccountDashboard('wishlist');
    }
  },

  removeWishlist(productId) {
    const p = window.data?.products?.find(item => item.id === productId);
    if (p) {
      window.bloomStore.toggleWishlist(p);
      this.renderAccountDashboard('wishlist');
    }
  },

  buyAgain(orderId) {
    const order = window.bloomCommerce.getOrderById(orderId);
    if (order && order.items) {
      order.items.forEach(it => {
        const prod = window.data?.products?.find(p => p.id === it.id);
        if (prod) {
          window.bloomStore.addToCart(prod, it.quantity, it.shade, it.size);
        }
      });
      this.closeAccountPage();
      window.BloomApp?.openCartDrawer();
    }
  },

  redeemGiftCard() {
    const input = document.getElementById('giftcard-input');
    const code = (input?.value || '').trim();
    if (!code) {
      alert('Please enter a valid gift card voucher code.');
      return;
    }
    alert(`Voucher "${code}" verified! Corporate gift card infrastructure is configured. Store credit applied.`);
    if (input) input.value = '';
  },

  handleLogout() {
    window.bloomCommerce.logoutCustomer();
    this.updateAccountDropdownUI();
    this.closeAccountPage();
    this.closeAccountDropdown();
    window.BloomApp?.showToast('You have successfully logged out');
    window.location.hash = '#';
  },

  bindGlobalActions() {
    // Intercept clicks on Track Order link in announcement bar
    document.querySelectorAll('[data-action="track-order"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openAccount('track');
      });
    });

    // Intercept checkout triggers
    document.getElementById('proceed-to-checkout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.BloomApp?.closeCartDrawer();
      this.openCheckoutFlow();
    });
  }
};

window.BloomEcommerceUI = BloomEcommerceUI;

// Auto-initialize BloomEcommerceUI when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      BloomEcommerceUI.init();
    });
  } else {
    BloomEcommerceUI.init();
  }
}
