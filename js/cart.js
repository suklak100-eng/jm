// Luxury Private Vault Bag Controller for Mahira Haute Joaillerie

import { exhibitionPieces } from './products.js';

class VaultCart {
  constructor() {
    this.items = [];
    this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem('mahira_vault_bag');
      if (stored) {
        this.items = JSON.parse(stored);
      } else {
        // Initial showcase item
        this.items = [{ id: 'exhibit-01', quantity: 1 }];
      }
    } catch (_) {
      this.items = [];
    }
  }

  save() {
    try {
      localStorage.setItem('mahira_vault_bag', JSON.stringify(this.items));
    } catch (_) {}
    this.render();
  }

  addItem(productId) {
    const existing = this.items.find((i) => i.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ id: productId, quantity: 1 });
    }
    this.save();
    showToast('Piece added to your Private Vault Bag ✦');
  }

  removeItem(productId) {
    this.items = this.items.filter((i) => i.id !== productId);
    this.save();
  }

  getTotal() {
    return this.items.reduce((sum, item) => {
      const prod = exhibitionPieces.find((p) => p.id === item.id);
      return sum + (prod ? prod.price * item.quantity : 0);
    }, 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  render() {
    renderCartUI();
  }
}

export const vault = new VaultCart();

export function formatINR(val) {
  return '₹' + val.toLocaleString('en-IN');
}

export function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'luxury-toast';
  toast.innerHTML = `<span>💎</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

export function renderCartUI() {
  const badge = document.getElementById('vault-count-badge');
  const count = vault.getCount();
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  const list = document.getElementById('cart-items-list');
  const totalEl = document.getElementById('cart-total-amount');

  if (totalEl) {
    totalEl.textContent = formatINR(vault.getTotal());
  }

  if (!list) return;

  if (vault.items.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 70px 20px; color: #777785;">
        <div style="font-size: 2.2rem; margin-bottom: 14px; color: var(--gold-400);">✦</div>
        <h4 style="font-family: var(--font-display); color: #fff; margin-bottom: 8px; letter-spacing: 0.15em;">Your Vault is Empty</h4>
        <p style="font-size: 1rem; color: var(--text-muted);">Curate singular heirlooms from our masterwork exhibition.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = vault.items
    .map((item) => {
      const prod = exhibitionPieces.find((p) => p.id === item.id);
      if (!prod) return '';

      return `
        <div class="cart-item-row" data-id="${item.id}">
          <img src="${prod.image}" alt="${prod.name}" class="cart-item-thumb" />
          <div class="cart-item-info">
            <h4 class="cart-item-title">${prod.name}</h4>
            <div class="cart-item-metal">${prod.stone}</div>
            <div class="cart-item-foot">
              <span class="cart-item-price">${formatINR(prod.price * item.quantity)}</span>
              <button class="cart-item-del-btn" data-action="remove">Remove</button>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  list.querySelectorAll('[data-action="remove"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('.cart-item-row');
      if (row) vault.removeItem(row.dataset.id);
    });
  });
}

export function initVaultDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const triggerBtn = document.getElementById('vault-trigger-btn');
  const closeBtn = document.getElementById('cart-close-trigger');
  const checkoutBtn = document.getElementById('checkout-action-btn');

  function openDrawer() {
    renderCartUI();
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      showToast('Initiating Private Concierge Acquisition Protocol...');
      setTimeout(() => {
        alert(`Private Vault Order Value: ${formatINR(vault.getTotal())}\n\nA Senior Haute Joaillerie Concierge will connect with you discretely.`);
      }, 500);
    });
  }

  renderCartUI();
  window.openVault = openDrawer;
  window.closeVault = closeDrawer;
}
