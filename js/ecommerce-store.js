// ========================================================
// BLOOM BEAUTY — COMPLETE E-COMMERCE DATA & COMMERCE STORE
// Auth, Persistent Orders, Coupons, Tracking & PDF Invoices
// ========================================================

class BloomCommerceStore {
  constructor() {
    this.initStorage();
  }

  // --- Storage Initialization ---
  initStorage() {
    // 1. Current Customer Profile
    let storedProfile = null;
    try {
      storedProfile = JSON.parse(localStorage.getItem('bloom_customer_profile') || 'null');
    } catch (e) {}

    if (!storedProfile || storedProfile.name === 'Jane Doe' || storedProfile.email === 'jane.doe@example.com' || (storedProfile.email && storedProfile.email.includes('example.com'))) {
      const defaultUser = {
        id: 'cust-ankita-mehta',
        name: 'Ankita Mehta',
        email: 'ankitamehta06@gmail.com',
        phone: '+91 98765 43210',
        memberSince: 'October 2024',
        isAuthenticated: true
      };
      localStorage.setItem('bloom_customer_profile', JSON.stringify(defaultUser));
    }

    // 2. Saved Addresses
    let storedAddresses = null;
    try {
      storedAddresses = JSON.parse(localStorage.getItem('bloom_customer_addresses') || 'null');
    } catch (e) {}

    if (!storedAddresses || storedAddresses.some(a => a.name === 'Jane Doe')) {
      const defaultAddresses = [
        {
          id: 'addr-1',
          name: 'Ankita Mehta',
          phone: '+91 98765 43210',
          houseNo: 'Flat 402, Lotus Residency',
          street: '12th Main Road, HAL 2nd Stage, Indiranagar',
          landmark: 'Near Club House',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
          type: 'Home',
          isDefault: true
        },
        {
          id: 'addr-2',
          name: 'Ankita Mehta',
          phone: '+91 98765 43210',
          houseNo: 'Tech Park One, 5th Floor, Tower B',
          street: 'Outer Ring Road, Kadubeesanahalli',
          landmark: 'Opposite Central Mall',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560103',
          type: 'Work',
          isDefault: false
        }
      ];
      localStorage.setItem('bloom_customer_addresses', JSON.stringify(defaultAddresses));
    }

    // 3. Saved Cards / Payment Methods (Tokenized only - no raw card numbers/CVV)
    let storedCards = null;
    try {
      storedCards = JSON.parse(localStorage.getItem('bloom_saved_cards') || 'null');
    } catch (e) {}

    if (!storedCards || storedCards.some(c => c.nameOnCard === 'Jane Doe' || (c.upiId && c.upiId.includes('jane.doe')))) {
      const defaultCards = [
        {
          id: 'card-1',
          type: 'card',
          brand: 'Visa',
          last4: '4242',
          expiry: '08/28',
          bank: 'HDFC Bank',
          nameOnCard: 'Ankita Mehta'
        },
        {
          id: 'card-2',
          type: 'card',
          brand: 'Mastercard',
          last4: '8891',
          expiry: '11/27',
          bank: 'ICICI Bank',
          nameOnCard: 'Ankita Mehta'
        },
        {
          id: 'card-3',
          type: 'upi',
          brand: 'UPI',
          upiId: 'ankita.mehta@okhdfcbank',
          bank: 'Google Pay'
        }
      ];
      localStorage.setItem('bloom_saved_cards', JSON.stringify(defaultCards));
    }

    // 4. Coupons Master
    if (!localStorage.getItem('bloom_coupons_list')) {
      const defaultCoupons = [
        {
          code: 'BLOOM20',
          discountPercent: 20,
          flatDiscount: 0,
          minOrder: 999,
          maxDiscount: 1000,
          description: 'Get 20% OFF on all premium beauty essentials',
          expiry: '31 Dec 2026',
          status: 'Active'
        },
        {
          code: 'BLOOM30',
          discountPercent: 30,
          flatDiscount: 0,
          minOrder: 1999,
          maxDiscount: 1500,
          description: 'Mega Glow: 30% OFF on luxury orders above ₹1,999',
          expiry: '31 Dec 2026',
          status: 'Active'
        },
        {
          code: 'WELCOME10',
          discountPercent: 10,
          flatDiscount: 0,
          minOrder: 0,
          maxDiscount: 500,
          description: 'Special welcome treat: 10% OFF on your order',
          expiry: '31 Dec 2026',
          status: 'Active'
        },
        {
          code: 'FLAT500',
          discountPercent: 0,
          flatDiscount: 500,
          minOrder: 2499,
          maxDiscount: 500,
          description: 'Flat ₹500 OFF on festive skincare & fragrance sets',
          expiry: '31 Dec 2026',
          status: 'Active'
        }
      ];
      localStorage.setItem('bloom_coupons_list', JSON.stringify(defaultCoupons));
    }

    // 5. Seed Existing Orders for Customer History
    let storedOrders = null;
    try {
      storedOrders = JSON.parse(localStorage.getItem('bloom_customer_orders') || 'null');
    } catch (e) {}

    if (!storedOrders || storedOrders.some(o => o.customerName === 'Jane Doe' || (o.customerEmail && o.customerEmail.includes('example.com')))) {
      const seedOrders = [
        {
          id: 'BB-2026-78412',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          formattedDate: this.formatDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
          customerId: 'cust-ankita-mehta',
          customerName: 'Ankita Mehta',
          customerEmail: 'ankitamehta06@gmail.com',
          customerPhone: '+91 98765 43210',
          shippingAddress: {
            name: 'Ankita Mehta',
            phone: '+91 98765 43210',
            houseNo: 'Flat 402, Lotus Residency',
            street: '12th Main Road, HAL 2nd Stage, Indiranagar',
            landmark: 'Near Club House',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560038',
            type: 'Home'
          },
          items: [
            {
              id: 'prod-chanel-coco-mademoiselle',
              name: 'Coco Mademoiselle Eau De Parfum Intense',
              brand: 'Chanel Paris',
              price: 4899,
              originalPrice: 5800,
              quantity: 1,
              shade: null,
              size: '100ml',
              image: 'Docs/Fragance/Chanel Coco Mademoiselle on Pink Satin.png'
            }
          ],
          subtotal: 4899,
          couponCode: 'BLOOM10',
          discountAmount: 490,
          shippingFee: 0,
          taxAmount: 672,
          totalAmount: 4409,
          paymentMethod: 'UPI / Google Pay',
          paymentStatus: 'Paid Online',
          orderStatus: 'Shipped',
          courier: {
            name: 'Blue Dart Express',
            awb: 'BD-89213401IN',
            trackingUrl: 'https://www.bluedart.com'
          },
          estimatedDelivery: this.calculateBusinessDaysDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), 6),
          trackingEvents: [
            {
              stage: 'Order Placed',
              status: 'Completed',
              timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
              description: 'Order placed successfully. Payment verified via UPI.',
              location: 'Bengaluru Hub'
            },
            {
              stage: 'Order Confirmed',
              status: 'Completed',
              timestamp: new Date(Date.now() - 2.8 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
              description: 'Order confirmed and verified by Bloom Beauty partner.',
              location: 'Bengaluru Fulfillment Center'
            },
            {
              stage: 'Processing / Packed',
              status: 'Completed',
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
              description: 'Item safely packaged in signature satin padded box with sample miniatures.',
              location: 'Bengaluru Fulfillment Center'
            },
            {
              stage: 'Shipped',
              status: 'Current',
              timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
              description: 'Handed over to Blue Dart Express. AWB: BD-89213401IN in transit to delivery station.',
              location: 'Indiranagar Hub'
            },
            {
              stage: 'Out for Delivery',
              status: 'Pending',
              timestamp: null,
              description: 'Package will be dispatched with local courier agent.',
              location: 'Bengaluru Central Station'
            },
            {
              stage: 'Delivered',
              status: 'Pending',
              timestamp: null,
              description: 'Package delivered to recipient upon OTP/signature.',
              location: 'Destination'
            }
          ]
        },
        {
          id: 'BB-2026-65109',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          formattedDate: this.formatDate(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)),
          customerId: 'cust-ankita-mehta',
          customerName: 'Ankita Mehta',
          customerEmail: 'ankitamehta06@gmail.com',
          customerPhone: '+91 98765 43210',
          shippingAddress: {
            name: 'Ankita Mehta',
            phone: '+91 98765 43210',
            houseNo: 'Tech Park One, 5th Floor',
            street: 'Outer Ring Road, Kadubeesanahalli',
            landmark: 'Opposite Central Mall',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560103',
            type: 'Work'
          },
          items: [
            {
              id: 'prod-maybelline-burgundy-glow',
              name: 'Color Sensational Ultimatte Slim Lipstick',
              brand: 'Maybelline New York',
              price: 649,
              originalPrice: 799,
              quantity: 2,
              shade: 'More Berry',
              size: null,
              image: 'Docs/Lipsticks/Maybelline New York Color Sensational Ultimatte Slim Lipstick.png'
            }
          ],
          subtotal: 1298,
          couponCode: 'WELCOME10',
          discountAmount: 130,
          shippingFee: 0,
          taxAmount: 178,
          totalAmount: 1168,
          paymentMethod: 'Credit Card',
          paymentStatus: 'Paid Online',
          orderStatus: 'Delivered',
          courier: {
            name: 'Delhivery Surface',
            awb: 'DL-729014528',
            trackingUrl: 'https://www.delhivery.com'
          },
          estimatedDelivery: this.calculateBusinessDaysDate(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), 6),
          trackingEvents: [
            {
              stage: 'Order Placed',
              status: 'Completed',
              timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
              description: 'Order placed and paid online.',
              location: 'Bengaluru Hub'
            },
            {
              stage: 'Order Confirmed',
              status: 'Completed',
              timestamp: new Date(Date.now() - 9.8 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
              description: 'Verified by Bloom Beauty Partner.',
              location: 'Warehouse 4'
            },
            {
              stage: 'Processing / Packed',
              status: 'Completed',
              timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
              description: 'Packed with tamper-evident seal.',
              location: 'Fulfillment Center'
            },
            {
              stage: 'Shipped',
              status: 'Completed',
              timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
              description: 'Dispatched via Delhivery Surface. AWB: DL-729014528',
              location: 'Transit Station'
            },
            {
              stage: 'Out for Delivery',
              status: 'Completed',
              timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
              description: 'Out for delivery with courier agent.',
              location: 'Kadubeesanahalli Branch'
            },
            {
              stage: 'Delivered',
              status: 'Current',
              timestamp: new Date(Date.now() - 5.5 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
              description: 'Delivered to recipient. Package received in good condition.',
              location: 'Bengaluru'
            }
          ]
        }
      ];
      localStorage.setItem('bloom_customer_orders', JSON.stringify(seedOrders));
    }
  }

  // --- Date & SLA Helpers ---
  formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  // 6 Business Days SLA calculation (skipping Sundays)
  calculateBusinessDaysDate(startDate, businessDays = 6) {
    let count = 0;
    const current = new Date(startDate);
    while (count < businessDays) {
      current.setDate(current.getDate() + 1);
      // Skip Sunday (0)
      if (current.getDay() !== 0) {
        count++;
      }
    }
    return new Intl.DateTimeFormat('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(current);
  }

  // --- Customer Profile & Auth ---
  getCustomerProfile() {
    try {
      const data = localStorage.getItem('bloom_customer_profile');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  updateCustomerProfile(updates) {
    const current = this.getCustomerProfile() || {};
    const updated = { ...current, ...updates };
    localStorage.setItem('bloom_customer_profile', JSON.stringify(updated));
    return updated;
  }

  loginCustomer(name, email, phone) {
    const profile = {
      id: 'cust-' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      memberSince: this.formatDate(new Date()),
      isAuthenticated: true
    };
    localStorage.setItem('bloom_customer_profile', JSON.stringify(profile));
    return profile;
  }

  logoutCustomer() {
    const profile = this.getCustomerProfile();
    if (profile) {
      profile.isAuthenticated = false;
      localStorage.setItem('bloom_customer_profile', JSON.stringify(profile));
    }
  }

  // --- Addresses ---
  getAddresses() {
    try {
      const data = localStorage.getItem('bloom_customer_addresses');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveAddresses(addresses) {
    localStorage.setItem('bloom_customer_addresses', JSON.stringify(addresses));
  }

  addAddress(addressData) {
    const addresses = this.getAddresses();
    if (addressData.isDefault || addresses.length === 0) {
      addresses.forEach(a => a.isDefault = false);
      addressData.isDefault = true;
    }
    const newAddress = {
      ...addressData,
      id: 'addr-' + Date.now()
    };
    addresses.unshift(newAddress);
    this.saveAddresses(addresses);
    return newAddress;
  }

  updateAddress(id, updatedData) {
    const addresses = this.getAddresses();
    const index = addresses.findIndex(a => a.id === id);
    if (index > -1) {
      if (updatedData.isDefault) {
        addresses.forEach(a => a.isDefault = false);
      }
      addresses[index] = { ...addresses[index], ...updatedData };
      this.saveAddresses(addresses);
      return addresses[index];
    }
    return null;
  }

  deleteAddress(id) {
    let addresses = this.getAddresses();
    addresses = addresses.filter(a => a.id !== id);
    if (addresses.length > 0 && !addresses.some(a => a.isDefault)) {
      addresses[0].isDefault = true;
    }
    this.saveAddresses(addresses);
    return addresses;
  }

  setDefaultAddress(id) {
    const addresses = this.getAddresses();
    addresses.forEach(a => {
      a.isDefault = a.id === id;
    });
    this.saveAddresses(addresses);
    return addresses;
  }

  // --- Saved Cards / Wallets ---
  getSavedCards() {
    try {
      const data = localStorage.getItem('bloom_saved_cards');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  removeSavedCard(id) {
    let cards = this.getSavedCards();
    cards = cards.filter(c => c.id !== id);
    localStorage.setItem('bloom_saved_cards', JSON.stringify(cards));
    return cards;
  }

  addSavedCard(cardData) {
    const cards = this.getSavedCards();
    const newCard = {
      ...cardData,
      id: 'card-' + Date.now()
    };
    cards.push(newCard);
    localStorage.setItem('bloom_saved_cards', JSON.stringify(cards));
    return newCard;
  }

  // --- Coupons ---
  getCoupons() {
    try {
      const data = localStorage.getItem('bloom_coupons_list');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  validateCoupon(code, cartSubtotal) {
    const clean = (code || '').trim().toUpperCase();
    const coupons = this.getCoupons();
    const coupon = coupons.find(c => c.code === clean);

    if (!coupon) {
      return {
        valid: false,
        message: `Coupon code "${clean}" is not recognized. Try BLOOM20 or BLOOM30.`
      };
    }

    if (cartSubtotal < coupon.minOrder) {
      return {
        valid: false,
        message: `Code "${coupon.code}" requires a minimum cart value of ₹${coupon.minOrder}. Current: ₹${cartSubtotal}.`
      };
    }

    let discount = 0;
    if (coupon.discountPercent > 0) {
      discount = Math.round((cartSubtotal * coupon.discountPercent) / 100);
      if (coupon.maxDiscount > 0) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    } else if (coupon.flatDiscount > 0) {
      discount = Math.min(coupon.flatDiscount, cartSubtotal);
    }

    return {
      valid: true,
      coupon,
      discount,
      message: `Coupon "${coupon.code}" applied! You saved ₹${discount}.`
    };
  }

  // --- Orders ---
  getOrders() {
    try {
      const data = localStorage.getItem('bloom_customer_orders');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  getOrderById(orderId) {
    const orders = this.getOrders();
    return orders.find(o => o.id === orderId) || null;
  }

  createOrder({ items, shippingAddress, paymentMethod, couponCode, note = '' }) {
    if (!items || items.length === 0) {
      throw new Error('Cannot create order with an empty cart');
    }

    const profile = this.getCustomerProfile() || {
      id: 'cust-guest',
      name: shippingAddress.name,
      email: shippingAddress.email || 'guest@bloombeauty.com',
      phone: shippingAddress.phone
    };

    // Recalculate authoritative subtotal
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    // Validate coupon authoritatively
    let discountAmount = 0;
    let validatedCoupon = null;
    if (couponCode) {
      const couponCheck = this.validateCoupon(couponCode, subtotal);
      if (couponCheck.valid) {
        discountAmount = couponCheck.discount;
        validatedCoupon = couponCheck.coupon.code;
      }
    }

    // Shipping calculation
    const shippingFee = subtotal >= 799 ? 0 : 99;
    
    // Tax calculation (18% GST included)
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const taxAmount = Math.round((taxableAmount * 18) / 118);
    const totalAmount = Math.max(0, taxableAmount + shippingFee);

    // Generate Unique Order ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `BB-2026-${randomSuffix}`;

    const now = new Date();
    const estimatedDelivery = this.calculateBusinessDaysDate(now, 6);

    // Initial 6-stage timeline
    const trackingEvents = [
      {
        stage: 'Order Placed',
        status: 'Completed',
        timestamp: now.toLocaleString('en-IN'),
        description: `Order successfully placed. Payment method: ${paymentMethod}.`,
        location: 'Online Store'
      },
      {
        stage: 'Order Confirmed',
        status: 'Completed',
        timestamp: new Date(now.getTime() + 2 * 60 * 1000).toLocaleString('en-IN'),
        description: 'Order confirmed and verified with Bloom Beauty warehouse.',
        location: 'Fulfillment Hub'
      },
      {
        stage: 'Processing / Packed',
        status: 'Current',
        timestamp: null,
        description: 'Beauty specialists are carefully packaging your items with protective wraps.',
        location: 'Bengaluru Central Facility'
      },
      {
        stage: 'Shipped',
        status: 'Pending',
        timestamp: null,
        description: 'Package will be assigned to express courier partner.',
        location: 'In Transit'
      },
      {
        stage: 'Out for Delivery',
        status: 'Pending',
        timestamp: null,
        description: 'Courier agent will arrive at delivery destination.',
        location: shippingAddress.city || 'Local Delivery Station'
      },
      {
        stage: 'Delivered',
        status: 'Pending',
        timestamp: null,
        description: 'Package delivered safely to recipient.',
        location: 'Destination'
      }
    ];

    const isCod = paymentMethod.toLowerCase().includes('cash on delivery') || paymentMethod === 'COD';

    const newOrder = {
      id: orderId,
      date: now.toISOString(),
      formattedDate: this.formatDate(now),
      customerId: profile.id,
      customerName: shippingAddress.name,
      customerEmail: profile.email || shippingAddress.email || 'customer@bloombeauty.com',
      customerPhone: shippingAddress.phone,
      shippingAddress: { ...shippingAddress },
      billingAddress: { ...shippingAddress },
      items: items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        price: item.product.price,
        originalPrice: item.product.originalPrice || item.product.price,
        quantity: item.quantity,
        shade: item.selectedShade || null,
        size: item.selectedSize || null,
        image: item.product.images ? item.product.images[0] : ''
      })),
      subtotal,
      couponCode: validatedCoupon,
      discountAmount,
      shippingFee,
      taxAmount,
      totalAmount,
      paymentMethod,
      paymentStatus: isCod ? 'Pending (Cash on Delivery)' : 'Paid Online',
      orderStatus: 'Order Confirmed',
      courier: {
        name: 'Blue Dart Express (Assigned)',
        awb: `BD-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
        trackingUrl: 'https://www.bluedart.com'
      },
      estimatedDelivery,
      trackingEvents,
      note
    };

    const orders = this.getOrders();
    orders.unshift(newOrder);
    localStorage.setItem('bloom_customer_orders', JSON.stringify(orders));

    return newOrder;
  }

  // --- Admin Status Advancement (Authentic Updates Only) ---
  adminUpdateOrderStatus(orderId, newStatus, courierData = {}) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return null;

    order.orderStatus = newStatus;
    const nowStr = new Date().toLocaleString('en-IN');

    // Update tracking events safely
    const stages = [
      'Order Placed',
      'Order Confirmed',
      'Processing / Packed',
      'Shipped',
      'Out for Delivery',
      'Delivered'
    ];

    const currentIdx = stages.indexOf(newStatus);
    if (currentIdx > -1) {
      stages.forEach((stageName, idx) => {
        let ev = order.trackingEvents.find(e => e.stage === stageName);
        if (!ev) {
          ev = { stage: stageName, status: 'Pending', timestamp: null, description: '', location: '' };
          order.trackingEvents.push(ev);
        }

        if (idx < currentIdx) {
          ev.status = 'Completed';
          if (!ev.timestamp) ev.timestamp = nowStr;
        } else if (idx === currentIdx) {
          ev.status = 'Current';
          ev.timestamp = nowStr;
          if (newStatus === 'Processing / Packed') {
            ev.description = 'Inspected by quality audit, packaged in shockproof satin box with skincare samples.';
          } else if (newStatus === 'Shipped') {
            order.courier = {
              name: courierData.courierName || 'Blue Dart Express',
              awb: courierData.awb || `BD-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
              trackingUrl: 'https://www.bluedart.com'
            };
            ev.description = `Handed over to ${order.courier.name}. Tracking AWB: ${order.courier.awb}`;
            ev.location = courierData.location || 'Bengaluru Outbound Hub';
          } else if (newStatus === 'Out for Delivery') {
            ev.description = 'Assigned to delivery courier agent. Arriving today.';
            ev.location = courierData.location || `${order.shippingAddress.city} Station`;
          } else if (newStatus === 'Delivered') {
            ev.description = 'Package delivered and signed by customer.';
            ev.location = order.shippingAddress.city;
            if (order.paymentStatus.includes('Cash on Delivery')) {
              order.paymentStatus = 'Paid (COD Collected)';
            }
          }
        } else {
          ev.status = 'Pending';
        }
      });
    }

    localStorage.setItem('bloom_customer_orders', JSON.stringify(orders));
    return order;
  }

  // --- PDF Invoice Generator ---
  generatePdfInvoice(orderId) {
    const order = this.getOrderById(orderId);
    if (!order) {
      alert('Order not found for invoice generation');
      return;
    }

    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) {
      // Fallback: trigger print dialog for clean styled invoice
      this.printHtmlInvoice(order);
      return;
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [166, 83, 111]; // Bloom Deep Rose #A6536F
    const textColor = [41, 35, 41];     // Bloom Text #292329
    const mutedColor = [119, 112, 120];  // Bloom Muted #777078
    const lightBg = [250, 246, 247];    // Bloom Soft #FAF6F7

    // --- Header Banner ---
    doc.setFillColor(...lightBg);
    doc.rect(0, 0, 210, 38, 'F');

    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...primaryColor);
    doc.text('BLOOM BEAUTY', 14, 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...mutedColor);
    doc.text('Authentic Luxury & Clean Cosmetics', 14, 24);
    doc.text('Zynova Beauty Ventures Private Limited | GSTIN: 27AABCB1234D1Z5', 14, 29);
    doc.text('support@bloombeauty.zynova.co.in | https://bloombeauty.zynova.co.in', 14, 34);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...textColor);
    doc.text('TAX INVOICE', 196, 18, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...mutedColor);
    doc.text(`Invoice No: INV-${order.id.replace('BB-', '')}`, 196, 24, { align: 'right' });
    doc.text(`Invoice Date: ${order.formattedDate}`, 196, 29, { align: 'right' });
    doc.text(`Status: ${order.paymentStatus}`, 196, 34, { align: 'right' });

    doc.setDrawColor(238, 231, 233);
    doc.setLineWidth(0.5);
    doc.line(14, 38, 196, 38);

    // --- Bill To / Ship To ---
    let y = 46;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...primaryColor);
    doc.text('CUSTOMER / SHIPPING DETAILS', 14, y);
    doc.text('ORDER & PAYMENT DETAILS', 115, y);

    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...textColor);

    const addr = order.shippingAddress || {};
    doc.text(`Customer Name: ${order.customerName}`, 14, y);
    doc.text(`Order ID: ${order.id}`, 115, y);
    y += 4.5;
    doc.text(`Email: ${order.customerEmail}`, 14, y);
    doc.text(`Order Date: ${order.formattedDate}`, 115, y);
    y += 4.5;
    doc.text(`Phone: ${order.customerPhone}`, 14, y);
    doc.text(`Payment Method: ${order.paymentMethod}`, 115, y);
    y += 4.5;
    doc.text(`Address: ${addr.houseNo || ''}, ${addr.street || ''}`, 14, y);
    doc.text(`Payment Status: ${order.paymentStatus}`, 115, y);
    y += 4.5;
    doc.text(`${addr.city || ''}, ${addr.state || ''} - ${addr.pincode || ''}`, 14, y);
    doc.text(`Courier: ${order.courier ? order.courier.name : 'Express Courier'}`, 115, y);
    y += 4.5;
    if (order.courier && order.courier.awb) {
      doc.text(`Tracking AWB: ${order.courier.awb}`, 115, y);
    }

    // --- Table Header ---
    y += 10;
    doc.setFillColor(...primaryColor);
    doc.rect(14, y, 182, 8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('#', 17, y + 5.5);
    doc.text('Item Description', 25, y + 5.5);
    doc.text('Qty', 125, y + 5.5, { align: 'center' });
    doc.text('Unit Price', 150, y + 5.5, { align: 'right' });
    doc.text('Line Total', 192, y + 5.5, { align: 'right' });

    y += 8;

    // --- Table Rows ---
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...textColor);

    order.items.forEach((item, idx) => {
      const rowBg = idx % 2 === 0 ? [255, 255, 255] : lightBg;
      doc.setFillColor(...rowBg);
      doc.rect(14, y, 182, 8, 'F');

      doc.text(String(idx + 1), 17, y + 5.5);
      
      const itemName = `${item.brand} - ${item.name}`.slice(0, 52);
      doc.text(itemName, 25, y + 5.5);
      
      doc.text(String(item.quantity), 125, y + 5.5, { align: 'center' });
      doc.text(`INR ${item.price.toLocaleString('en-IN')}`, 150, y + 5.5, { align: 'right' });
      
      const lineTotal = item.price * item.quantity;
      doc.text(`INR ${lineTotal.toLocaleString('en-IN')}`, 192, y + 5.5, { align: 'right' });

      y += 8;
    });

    // --- Line Divider ---
    doc.setDrawColor(238, 231, 233);
    doc.line(14, y, 196, y);
    y += 6;

    // --- Financial Summary Box ---
    const summaryX = 120;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...mutedColor);

    doc.text('Item Subtotal:', summaryX, y);
    doc.text(`INR ${order.subtotal.toLocaleString('en-IN')}`, 192, y, { align: 'right' });
    y += 5;

    if (order.discountAmount > 0) {
      doc.setTextColor(166, 83, 111);
      doc.text(`Coupon Discount (${order.couponCode || 'PROMO'}):`, summaryX, y);
      doc.text(`- INR ${order.discountAmount.toLocaleString('en-IN')}`, 192, y, { align: 'right' });
      y += 5;
    }

    doc.setTextColor(...mutedColor);
    doc.text('Shipping & Handling:', summaryX, y);
    doc.text(order.shippingFee === 0 ? 'FREE' : `INR ${order.shippingFee.toLocaleString('en-IN')}`, 192, y, { align: 'right' });
    y += 5;

    doc.text('GST (18% Included):', summaryX, y);
    doc.text(`INR ${order.taxAmount.toLocaleString('en-IN')}`, 192, y, { align: 'right' });
    y += 6;

    // Total Row
    doc.setFillColor(...lightBg);
    doc.rect(summaryX - 4, y - 4, 76, 9, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...primaryColor);
    doc.text('Final Payable Total:', summaryX, y + 2.5);
    doc.text(`INR ${order.totalAmount.toLocaleString('en-IN')}`, 192, y + 2.5, { align: 'right' });

    // --- Footer Notice ---
    y = 265;
    doc.setDrawColor(238, 231, 233);
    doc.line(14, y, 196, y);
    y += 5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    doc.text('Thank you for choosing Bloom Beauty!', 105, y, { align: 'center' });
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...mutedColor);
    doc.text('All products are 100% genuine and verified directly from authorized brand partners.', 105, y, { align: 'center' });
    y += 4;
    doc.text('For queries, returns or assistance, please reach out to support@bloombeauty.zynova.co.in', 105, y, { align: 'center' });

    // Save PDF
    doc.save(`Bloom_Beauty_Invoice_${order.id}.pdf`);
  }

  // Fallback print window if jsPDF is unavailable
  printHtmlInvoice(order) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${order.id}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #292329; margin: 40px; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #A6536F; padding-bottom: 20px; }
          .logo { font-size: 24px; font-weight: bold; color: #A6536F; }
          .title { font-size: 20px; font-weight: bold; text-align: right; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 24px 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #A6536F; color: white; text-align: left; padding: 10px; font-size: 12px; }
          td { padding: 10px; border-bottom: 1px solid #EEE7E9; font-size: 12px; }
          .summary { float: right; width: 300px; margin-top: 10px; }
          .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
          .summary-row.total { font-weight: bold; font-size: 16px; color: #A6536F; border-top: 2px solid #A6536F; padding-top: 10px; }
          .footer { clear: both; text-align: center; font-size: 11px; color: #777078; margin-top: 60px; border-top: 1px solid #EEE7E9; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">BLOOM BEAUTY</div>
            <div style="font-size: 12px; color: #777078; margin-top: 4px;">Zynova Beauty Ventures Private Limited | GSTIN: 27AABCB1234D1Z5</div>
            <div style="font-size: 12px; color: #777078;">support@bloombeauty.zynova.co.in</div>
          </div>
          <div>
            <div class="title">TAX INVOICE</div>
            <div style="font-size: 12px; color: #777078; text-align: right;">Invoice No: INV-${order.id.replace('BB-', '')}</div>
            <div style="font-size: 12px; color: #777078; text-align: right;">Date: ${order.formattedDate}</div>
          </div>
        </div>

        <div class="meta-grid">
          <div>
            <h4 style="margin: 0 0 6px; color: #A6536F;">BILL TO & SHIP TO</h4>
            <div><strong>${order.customerName}</strong></div>
            <div>${order.customerEmail} | ${order.customerPhone}</div>
            <div>${order.shippingAddress.houseNo}, ${order.shippingAddress.street}</div>
            <div>${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</div>
          </div>
          <div>
            <h4 style="margin: 0 0 6px; color: #A6536F;">ORDER DETAILS</h4>
            <div>Order ID: <strong>${order.id}</strong></div>
            <div>Payment Method: ${order.paymentMethod}</div>
            <div>Payment Status: <strong>${order.paymentStatus}</strong></div>
            <div>Courier: ${order.courier ? order.courier.name : 'Express'} (${order.courier ? order.courier.awb : ''})</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Item Description</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Unit Price</th>
              <th style="text-align: right;">Line Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map((it, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td><strong>${it.brand}</strong> - ${it.name} ${it.shade ? `(Shade: ${it.shade})` : ''}</td>
                <td style="text-align: center;">${it.quantity}</td>
                <td style="text-align: right;">₹${it.price.toLocaleString('en-IN')}</td>
                <td style="text-align: right;">₹${(it.price * it.quantity).toLocaleString('en-IN')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="summary">
          <div class="summary-row"><span>Item Subtotal:</span><span>₹${order.subtotal.toLocaleString('en-IN')}</span></div>
          ${order.discountAmount > 0 ? `<div class="summary-row" style="color: #A6536F;"><span>Coupon Discount (${order.couponCode}):</span><span>-₹${order.discountAmount.toLocaleString('en-IN')}</span></div>` : ''}
          <div class="summary-row"><span>Delivery Charges:</span><span>${order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span></div>
          <div class="summary-row"><span>GST (18% Included):</span><span>₹${order.taxAmount.toLocaleString('en-IN')}</span></div>
          <div class="summary-row total"><span>Total Amount:</span><span>₹${order.totalAmount.toLocaleString('en-IN')}</span></div>
        </div>

        <div class="footer">
          <p><strong>Thank you for choosing Bloom Beauty!</strong></p>
          <p>Genuine products sourced directly from authorized brand partners.</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
}

// Export singleton instance globally
window.bloomCommerce = new BloomCommerceStore();

