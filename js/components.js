// ========================================================
// BLOOM BEAUTY — UI COMPONENT RENDERERS (INR ₹)
// ========================================================

if (typeof window.formatINR !== 'function') {
  window.formatINR = function(amount) {
    if (typeof amount !== 'number') amount = Number(amount) || 0;
    return '₹' + Math.round(amount).toLocaleString('en-IN');
  };
}

window.BloomComponents = {
  // Star rating helper
  renderRating(rating, count) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let starsHtml = '';
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHtml += `<svg class="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
      } else if (i === fullStars && hasHalf) {
        starsHtml += `<svg class="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
      } else {
        starsHtml += `<svg class="w-3.5 h-3.5 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
      }
    }

    return `
      <div class="flex items-center gap-1.5 text-xs text-[#777078]">
        <div class="flex items-center">${starsHtml}</div>
        <span class="font-medium text-[#292329]">${rating.toFixed(1)}</span>
        <span>(${count > 1000 ? (count / 1000).toFixed(1) + 'k' : count})</span>
      </div>
    `;
  },

  // Badge class helper
  getBadgeClass(badge) {
    switch (badge) {
      case 'BESTSELLER': return 'bloom-badge-bestseller';
      case 'NEW ARRIVAL': case 'NEW LAUNCH': return 'bloom-badge-new';
      case 'LIMITED OFFER': case 'HOT DEAL': return 'bloom-badge-deal';
      case 'BEST VALUE': case 'MEGA VALUE': return 'bloom-badge-value';
      default: return 'bg-gray-800 text-white';
    }
  },

  // CRITICAL PRODUCT CARD COMPONENT
  renderProductCard(product) {
    const isSaved = window.bloomStore ? window.bloomStore.isInWishlist(product.id) : false;
    const primaryImg = product.images[0];
    const secondaryImg = product.images[1] || primaryImg;

    // Optional shades preview
    let shadesHtml = '';
    if (product.shades && product.shades.length > 0) {
      const dots = product.shades.slice(0, 4).map(s => `
        <span class="shade-dot" style="background-color: ${s.hex}" title="${s.name}"></span>
      `).join('');
      const moreCount = product.shades.length > 4 ? `<span class="text-[10px] text-[#777078] font-medium">+${product.shades.length - 4}</span>` : '';
      shadesHtml = `<div class="flex items-center gap-1.5 mt-2">${dots}${moreCount}</div>`;
    }

    return `
      <div class="bloom-card group" data-product-id="${product.id}">
        <!-- Image Box -->
        <div class="bloom-image-box cursor-pointer" data-action="view-details" data-id="${product.id}">
          <img src="${primaryImg}" alt="${product.name}" class="bloom-img-primary w-full h-full object-cover" loading="lazy" />
          <img src="${secondaryImg}" alt="${product.name} alternate view" class="bloom-img-secondary w-full h-full object-cover" loading="lazy" />

          <!-- Promotional Badge -->
          ${product.badge ? `<span class="bloom-badge ${this.getBadgeClass(product.badge)}">${product.badge}</span>` : ''}

          <!-- Wishlist Heart Button -->
          <button type="button" 
                  class="bloom-wishlist-toggle ${isSaved ? 'is-active' : ''}" 
                  data-action="wishlist" onclick="event.stopPropagation();" 
                  data-id="${product.id}"
                  aria-label="Save to Wishlist"
                  title="${isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}">
            <svg class="w-4 h-4" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
            </svg>
          </button>

          <!-- Quick Action Buttons -->
          <div class="bloom-quick-actions">
            <button type="button" 
                    class="flex-1 bg-[#292329] hover:bg-[#A6536F] text-[#FFFDF9] py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    data-action="quick-add" onclick="event.stopPropagation();" 
                    data-id="${product.id}">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
              </svg>
              Quick Add
            </button>
            <button type="button" 
                    class="bg-white hover:bg-[#F8E9EC] text-[#292329] p-2 rounded-lg border border-[#EEE7E9] text-xs font-medium transition-colors"
                    data-action="quick-view" onclick="event.stopPropagation();" 
                    data-id="${product.id}"
                    aria-label="Quick View"
                    title="Quick View">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-3.5 flex flex-col flex-1 cursor-pointer" data-action="view-details" data-id="${product.id}">
          <!-- Brand Name -->
          <div class="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#C98498] mb-1">
            <span>${product.brand}</span>
            ${product.dealLabel ? `<span class="text-[#A6536F] font-bold lowercase tracking-normal text-[10px] bg-[#F8E9EC] px-1.5 py-0.5 rounded">${product.dealLabel}</span>` : ''}
          </div>

          <!-- Product Title -->
          <h3 class="text-sm font-medium text-[#292329] line-clamp-2 leading-snug group-hover:text-[#A6536F] transition-colors mb-2">
            ${product.name}
          </h3>

          <!-- Ratings -->
          <div class="mb-2.5">
            ${this.renderRating(product.rating, product.reviewCount)}
          </div>

          <!-- Shades Preview -->
          ${shadesHtml}

          <!-- Price & Discount in INR -->
          <div class="mt-auto pt-2 flex items-baseline gap-2 border-t border-[#FAF6F7]">
            <span class="text-base font-bold text-[#292329]">${window.formatINR(product.price)}</span>
            ${product.originalPrice > product.price ? `
              <span class="text-xs text-[#777078] line-through">${window.formatINR(product.originalPrice)}</span>
              <span class="text-xs font-bold text-[#A6536F] ml-auto">${product.discountPercent}% OFF</span>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },

  // Category Grid Card (Explore Your Beauty Essentials Showcase)
  renderCategoryCard(cat) {
    // Curated pastel badge themes with high-contrast readable typography
    const badgeThemes = {
      'makeup': {
        bg: '#FCE8ED', // Blush Pink
        text: '#7A2840',
        border: '#F3C4D0'
      },
      'skincare': {
        bg: '#FFF8E7', // Dewy Cream
        text: '#6E4F18',
        border: '#F7E5BD'
      },
      'haircare': {
        bg: '#FDF2E9', // Warm Champagne
        text: '#7A4016',
        border: '#F6D8C0'
      },
      'bath-body': {
        bg: '#F3EBF9', // Soft Lavender
        text: '#552773',
        border: '#E0D0EE'
      },
      'fragrance': {
        bg: '#FBE9ED', // Rose Quartz
        text: '#782338',
        border: '#F5C7D2'
      },
      'nail-care': {
        bg: '#F7E9F4', // Pale Lilac
        text: '#6E2260',
        border: '#ECCCE5'
      },
      'beauty-tools': {
        bg: '#EBF7F2', // Pale Mint
        text: '#1E5740',
        border: '#CDE9DC'
      }
    };

    const theme = badgeThemes[cat.id] || {
      bg: '#F8E9EC',
      text: '#A6536F',
      border: '#EEE7E9'
    };

    // Format badge text in bold uppercase e.g. "240+ PRODUCTS"
    const badgeText = (cat.itemCount || '100+ Products').toUpperCase();

    return `
      <div class="category-card group w-[160px] sm:w-[175px] md:w-[190px] lg:w-full shrink-0 snap-start lg:shrink"
           data-action="filter-category" 
           data-category="${cat.name}"
           role="button"
           tabindex="0"
           aria-label="Browse ${cat.name} Collection (${badgeText})">
        
        <!-- Category Background Image -->
        <div class="category-card-bg">
          <img src="${cat.image}" 
               alt="${cat.name}" 
               loading="lazy" />
        </div>

        <!-- Subtle Dark Gradient Overlay (Clear on top, rich contrast on bottom) -->
        <div class="category-card-gradient"></div>
        
        <!-- Category Text & Button Content -->
        <div class="category-card-content">
          <!-- 1. Product Count Pill Badge -->
          <span class="category-pill-badge" 
                style="background-color: ${theme.bg} !important; color: ${theme.text} !important; border: 1px solid ${theme.border} !important;">
            ${badgeText}
          </span>

          <!-- 2. Category Title -->
          <h3 class="category-card-title">${cat.name}</h3>

          <!-- 3. Category Description -->
          <p class="category-card-desc">${cat.tagline}</p>

          <!-- 4. Shop Now Button -->
          <div class="category-shop-now-btn">
            <span>Shop Now</span>
            <svg class="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </div>
        </div>

      </div>
    `;
  },

    // Brand Tile Card
  renderBrandCard(brand) {
    return `
      <div class="brand-card group flex flex-col justify-between" data-action="filter-brand" data-brand="${brand.name}">
        <div class="flex flex-col items-center text-center w-full">
          <span class="text-[10px] uppercase font-bold tracking-widest text-[#C98498] bg-[#F8E9EC] px-3 py-1 rounded-full mb-3 inline-block">${brand.category}</span>
          <h4 class="text-base sm:text-lg font-serif font-bold text-[#292329] group-hover:text-[#A6536F] transition-colors mb-2 tracking-tight">${brand.name}</h4>
          <p class="text-xs text-[#777078] leading-relaxed line-clamp-2 max-w-[280px] mb-4">${brand.desc}</p>
        </div>
        <div class="mt-auto pt-3 border-t border-bloom-border/50 w-full flex justify-center">
          <span class="text-xs font-semibold text-[#A6536F] group-hover:text-[#292329] inline-flex items-center gap-1.5 transition-all group-hover:translate-x-1">
            Explore Brand
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
            </svg>
          </span>
        </div>
      </div>
    `;
  },

  // Editorial Curated Collection Card
  renderEditorialCard(col) {
    return `
      <div class="relative group rounded-xl overflow-hidden border border-[#EEE7E9] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
           data-action="filter-category" 
           data-category="${col.category}">
        <div class="aspect-[16/10] overflow-hidden relative">
          <img src="${col.image}" 
               alt="${col.title}" 
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
               loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
          
          <div class="absolute top-4 left-4">
            <span class="bg-white/90 backdrop-blur-sm text-[#292329] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded uppercase">
              ${col.badge}
            </span>
          </div>

          <div class="absolute bottom-4 left-4 right-4 text-white">
            <h3 class="font-serif text-lg md:text-xl font-bold mb-1 text-white group-hover:text-[#F3D2DA] transition-colors">${col.title}</h3>
            <p class="text-xs md:text-sm text-white/85 line-clamp-1 mb-2.5">${col.subtitle}</p>
            <span class="inline-flex items-center text-xs font-bold text-[#FFFDF9] bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg group-hover:bg-[#C98498] transition-colors">
              ${col.ctaText}
              <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    `;
  },

  // Cart Drawer Item
  renderCartItem(item) {
    const { product, quantity, selectedShade, selectedSize } = item;
    return `
      <div class="flex gap-3 py-3.5 border-b border-[#EEE7E9] last:border-b-0">
        <img src="${product.images[0]}" alt="${product.name}" class="w-20 h-20 object-contain rounded-lg bg-[#FAF6F7] border border-[#EEE7E9] flex-shrink-0 p-1" />
        <div class="flex-1 min-w-0">
          <span class="text-[10px] font-bold text-[#C98498] uppercase tracking-wider block">${product.brand}</span>
          <h4 class="text-xs font-medium text-[#292329] truncate mb-1">${product.name}</h4>
          ${selectedShade ? `<span class="inline-block text-[11px] text-[#777078] bg-[#F8E9EC] px-1.5 py-0.5 rounded mb-1.5">Shade: ${selectedShade}</span>` : ''}
          ${selectedSize ? `<span class="inline-block text-[11px] text-[#777078] bg-[#F8E9EC] px-1.5 py-0.5 rounded mb-1.5">Size: ${selectedSize}</span>` : ''}
          
          <div class="flex items-center justify-between mt-1">
            <!-- Quantity control -->
            <div class="flex items-center border border-[#EEE7E9] rounded-lg bg-white">
              <button type="button" 
                      class="px-2 py-0.5 text-xs text-[#292329] hover:bg-[#F8E9EC] rounded-l-lg transition-colors"
                      data-action="qty-decrease" 
                      data-id="${product.id}" 
                      data-shade="${selectedShade || ''}">-</button>
              <span class="px-2.5 py-0.5 text-xs font-semibold text-[#292329]">${quantity}</span>
              <button type="button" 
                      class="px-2 py-0.5 text-xs text-[#292329] hover:bg-[#F8E9EC] rounded-r-lg transition-colors"
                      data-action="qty-increase" 
                      data-id="${product.id}" 
                      data-shade="${selectedShade || ''}">+</button>
            </div>

            <!-- Price in INR -->
            <div class="text-right">
              <span class="text-xs font-bold text-[#292329]">${window.formatINR(product.price * quantity)}</span>
            </div>

            <!-- Remove Button -->
            <button type="button" 
                    class="text-[#777078] hover:text-[#C0392B] p-1 transition-colors"
                    data-action="remove-cart-item" 
                    data-id="${product.id}" 
                    data-shade="${selectedShade || ''}"
                    title="Remove item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
