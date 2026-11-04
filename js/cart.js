// Luxury Cart & Bag State Management with LocalStorage persistence

import { products } from './products.js';

class CartState {
  constructor() {
    this.items = [];
    this.discountPercent = 0;
    this.promoCode = '';
    this.freeShippingThreshold = 15000;
    this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem('mahira_cart');
      if (stored) {
        this.items = JSON.parse(stored);
      } else {
        // Pre-populate with one item for high-end preview feel
        this.items = [
          {
            id: 'prod-1',
            quantity: 1,
            selectedSize: 'Unstitched (Free Size)',
            selectedColor: '#D4AF37'
          }
        ];
      }
    } catch (_) {
      this.items = [];
    }
  }

  save() {
    try {
      localStorage.setItem('mahira_cart', JSON.stringify(this.items));
    } catch (_) {}
    this.notify();
  }

  addItem(productId, size = 'Unstitched (Free Size)', color = '#D4AF37') {
    const existing = this.items.find(
      (item) => item.id === productId && item.selectedSize === size
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        id: productId,
        quantity: 1,
        selectedSize: size,
        selectedColor: color
      });
    }
    this.save();
    showToast('Added to your royal collection bag ✦');
  }

  removeItem(productId, size) {
    this.items = this.items.filter(
      (item) => !(item.id === productId && item.selectedSize === size)
    );
    this.save();
  }

  updateQuantity(productId, size, delta) {
    const item = this.items.find(
      (i) => i.id === productId && i.selectedSize === size
    );
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(productId, size);
    } else {
      this.save();
    }
  }

  applyPromo(code) {
    const clean = code.trim().toUpperCase();
    if (clean === 'MAHIRA10' || clean === 'ROYAL10') {
      this.discountPercent = 10;
      this.promoCode = clean;
      this.save();
      return { success: true, message: '10% Royal Heritage privilege applied!' };
    }
    return { success: false, message: 'Invalid privilege voucher.' };
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => {
      const prod = products.find((p) => p.id === item.id);
      return sum + (prod ? prod.price * item.quantity : 0);
    }, 0);
  }

  getDiscount() {
    return Math.round((this.getSubtotal() * this.discountPercent) / 100);
  }

  getTotal() {
    const sub = this.getSubtotal();
    const disc = this.getDiscount();
    return Math.max(0, sub - disc);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  notify() {
    renderCartUI();
  }
}

export const cart = new CartState();

export function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

export function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'luxury-toast';
  toast.innerHTML = `
    <span class="toast-icon">✦</span>
    <span class="toast-text">${message}</span>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

export function renderCartUI() {
  const badge = document.getElementById('cart-count-badge');
  const count = cart.getCount();
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  const listContainer = document.getElementById('cart-items-list');
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountEl = document.getElementById('cart-discount');
  const discountRow = document.getElementById('cart-discount-row');
  const totalEl = document.getElementById('cart-total');
  const progressFill = document.getElementById('free-shipping-progress');
  const shippingText = document.getElementById('free-shipping-text');

  if (!listContainer) return;

  const subtotal = cart.getSubtotal();
  const discount = cart.getDiscount();
  const total = cart.getTotal();

  if (subtotalEl) subtotalEl.textContent = formatINR(subtotal);
  if (discountEl) discountEl.textContent = '-' + formatINR(discount);
  if (discountRow) discountRow.style.display = discount > 0 ? 'flex' : 'none';
  if (totalEl) totalEl.textContent = formatINR(total);

  // Free shipping progress
  if (progressFill && shippingText) {
    const pct = Math.min(100, Math.round((subtotal / cart.freeShippingThreshold) * 100));
    progressFill.style.width = `${pct}%`;
    if (subtotal >= cart.freeShippingThreshold) {
      shippingText.innerHTML = `<strong>Congratulations!</strong> You qualify for Complimentary Express Heritage White-Glove Delivery.`;
    } else {
      const remaining = cart.freeShippingThreshold - subtotal;
      shippingText.innerHTML = `Add <strong>${formatINR(remaining)}</strong> more to unlock Complimentary White-Glove Worldwide Delivery.`;
    }
  }

  if (cart.items.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-cart-state">
        <div class="empty-cart-crest">✦</div>
        <h3>Your Bag is Empty</h3>
        <p>Explore our timeless silhouettes and add handcrafted heirlooms to your curation.</p>
        <button class="gold-btn-outline" onclick="document.getElementById('cart-drawer').classList.remove('open')">Discover Sarees</button>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = cart.items
    .map((item) => {
      const prod = products.find((p) => p.id === item.id);
      if (!prod) return '';

      return `
        <div class="cart-item" data-id="${item.id}" data-size="${item.selectedSize}">
          <div class="cart-item-img-wrap">
            <img src="${prod.image}" alt="${prod.name}" class="cart-item-img" />
          </div>
          <div class="cart-item-details">
            <div class="cart-item-head">
              <h4 class="cart-item-title">${prod.name}</h4>
              <button class="cart-item-remove" data-action="remove" aria-label="Remove item">×</button>
            </div>
            <p class="cart-item-meta">${item.selectedSize} • ${prod.craft}</p>
            <div class="cart-item-bottom">
              <div class="cart-qty-ctrl">
                <button class="qty-btn" data-action="decrease">−</button>
                <span class="qty-num">${item.quantity}</span>
                <button class="qty-btn" data-action="increase">+</button>
              </div>
              <span class="cart-item-price">${formatINR(prod.price * item.quantity)}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  // Attach cart item events
  listContainer.querySelectorAll('.cart-item').forEach((itemEl) => {
    const id = itemEl.dataset.id;
    const size = itemEl.dataset.size;

    itemEl.querySelector('[data-action="remove"]')?.addEventListener('click', () => {
      cart.removeItem(id, size);
    });

    itemEl.querySelector('[data-action="decrease"]')?.addEventListener('click', () => {
      cart.updateQuantity(id, size, -1);
    });

    itemEl.querySelector('[data-action="increase"]')?.addEventListener('click', () => {
      cart.updateQuantity(id, size, 1);
    });
  });
}

export function initCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const triggerBtn = document.getElementById('cart-trigger-btn');
  const closeBtn = document.getElementById('cart-close-btn');
  const promoBtn = document.getElementById('apply-promo-btn');
  const promoInput = document.getElementById('promo-code-input');
  const promoMsg = document.getElementById('promo-feedback-msg');
  const checkoutBtn = document.getElementById('checkout-btn');

  function openCart() {
    renderCartUI();
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openCart);
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);

  if (promoBtn && promoInput) {
    promoBtn.addEventListener('click', () => {
      const result = cart.applyPromo(promoInput.value);
      if (promoMsg) {
        promoMsg.textContent = result.message;
        promoMsg.className = `promo-msg ${result.success ? 'success' : 'error'}`;
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      showToast('Proceeding to Secure Heritage Vault Checkout...');
      setTimeout(() => {
        alert(`Order Summary:\nTotal Amount: ${formatINR(cart.getTotal())}\n\nThank you for choosing Mahira Select.\nIn a production deployment, this redirects to Razorpay / Stripe gateway.`);
      }, 600);
    });
  }

  // Initial render
  renderCartUI();

  // Expose open function globally
  window.openMahiraCart = openCart;
  window.closeMahiraCart = closeCart;
}

