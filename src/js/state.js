// ========================================================
// BLOOM BEAUTY — APPLICATION STATE & PERSISTENCE
// ========================================================

class BloomStore {
  constructor() {
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.promoCode = localStorage.getItem('bloom_promo') || null;
    this.promoDiscountPercent = this.promoCode === 'GLOW20' ? 20 : this.promoCode === 'BLOOM10' ? 10 : 0;
    this.subscribers = [];
  }

  loadCart() {
    try {
      const data = localStorage.getItem('bloom_cart_v1');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('bloom_cart_v1', JSON.stringify(this.cart));
    } catch (e) {}
    this.notify();
  }

  loadWishlist() {
    try {
      const data = localStorage.getItem('bloom_wishlist_v1');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem('bloom_wishlist_v1', JSON.stringify(this.wishlist));
    } catch (e) {}
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(cb => cb(this));
  }

  // --- Cart Actions ---
  addToCart(product, quantity = 1, shade = null, size = null) {
    const existingIndex = this.cart.findIndex(
      item => item.product.id === product.id &&
              item.selectedShade === shade &&
              item.selectedSize === size
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        product,
        quantity,
        selectedShade: shade || (product.shades ? product.shades[0].name : null),
        selectedSize: size || (product.sizes ? product.sizes[0] : null)
      });
    }

    this.saveCart();
    window.BloomApp?.showToast(`Added "${product.name.slice(0, 24)}..." to Bag 🛍️`);
  }

  updateQuantity(productId, shade, newQty) {
    if (newQty <= 0) {
      this.removeFromCart(productId, shade);
      return;
    }
    const item = this.cart.find(
      i => i.product.id === productId && i.selectedShade === shade
    );
    if (item) {
      item.quantity = newQty;
      this.saveCart();
    }
  }

  removeFromCart(productId, shade) {
    this.cart = this.cart.filter(
      i => !(i.product.id === productId && i.selectedShade === shade)
    );
    this.saveCart();
    window.BloomApp?.showToast('Item removed from Bag');
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal() {
    return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  getDiscount() {
    const subtotal = this.getSubtotal();
    return (subtotal * this.promoDiscountPercent) / 100;
  }

  getShipping() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 35 ? 0 : 5.99;
  }

  getTotal() {
    return Math.max(0, this.getSubtotal() - this.getDiscount() + this.getShipping());
  }

  applyPromoCode(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'GLOW20') {
      this.promoCode = 'GLOW20';
      this.promoDiscountPercent = 20;
      localStorage.setItem('bloom_promo', 'GLOW20');
      this.notify();
      return { success: true, message: '20% OFF applied successfully!' };
    } else if (cleanCode === 'BLOOM10') {
      this.promoCode = 'BLOOM10';
      this.promoDiscountPercent = 10;
      localStorage.setItem('bloom_promo', 'BLOOM10');
      this.notify();
      return { success: true, message: '10% OFF applied successfully!' };
    }
    return { success: false, message: 'Invalid code. Try "BLOOM10" or "GLOW20"' };
  }

  removePromoCode() {
    this.promoCode = null;
    this.promoDiscountPercent = 0;
    localStorage.removeItem('bloom_promo');
    this.notify();
  }

  // --- Wishlist Actions ---
  toggleWishlist(product) {
    const index = this.wishlist.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.saveWishlist();
      window.BloomApp?.showToast(`Removed from Wishlist`);
      return false;
    } else {
      this.wishlist.push(product);
      this.saveWishlist();
      window.BloomApp?.showToast(`Saved to Wishlist ❤️`);
      return true;
    }
  }

  isInWishlist(productId) {
    return this.wishlist.some(item => item.id === productId);
  }

  getWishlistCount() {
    return this.wishlist.length;
  }
}

window.bloomStore = new BloomStore();
