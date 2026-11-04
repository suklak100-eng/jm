// Main Luxury Application Controller for Mahira Haute Joaillerie

import { jewelryProducts, jewelrySuites } from './products.js';
import { vault, formatINR, showToast, initVaultDrawer } from './cart.js';
import { initCurtain } from './curtain.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Curtain Reveal (Scroll & Click)
  initCurtain();

  // 2. Initialize Private Vault Cart Drawer
  initVaultDrawer();

  // 3. Render 3D Interactive Jewelry Cards
  renderJewelryCards();

  // 4. Render Signature Suites
  renderSuites();

  // 5. Initialize Quick View Modal
  initQuickViewModal();

  // 6. Initialize Mobile Navigation
  initMobileNav();

  // 7. Initialize Sticky Header & Scroll Reveals
  initScrollDynamics();

  // 8. Newsletter
  initNewsletter();
});

/* ---------------- 3D TILT JEWELRY CARDS ---------------- */
function renderJewelryCards() {
  const grid = document.getElementById('jewel-grid-container');
  if (!grid) return;

  grid.innerHTML = jewelryProducts
    .map(
      (prod) => `
    <article class="jewel-card reveal-on-scroll" data-id="${prod.id}">
      <div class="jewel-card-photo-wrap">
        <img src="${prod.image}" alt="${prod.name}" class="jewel-card-photo" loading="lazy" />
        <img src="${prod.secondaryImage}" alt="${prod.name} perspective" class="jewel-card-photo-alt" loading="lazy" />
        
        <span class="jewel-category-tag">${prod.tag}</span>

        <button class="jewel-wishlist-toggle" data-wishlist="${prod.id}" aria-label="Save to Wishlist">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div class="jewel-card-info">
        <span class="jewel-carat-spec">${prod.carat}</span>
        <h3 class="jewel-card-title">${prod.name}</h3>
        <p class="jewel-card-metal">${prod.metal}</p>

        <div class="jewel-card-footer">
          <span class="jewel-price">${formatINR(prod.price)}</span>
          <button class="jewel-quick-btn" data-view="${prod.id}">
            Inspect Piece ✦
          </button>
        </div>
      </div>
    </article>
  `
    )
    .join('');

  // Attach 3D Mouse Parallax & Listeners
  const cards = grid.querySelectorAll('.jewel-card');

  cards.forEach((card) => {
    // 3D Tilt on Mouse Move
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });

    // Quick View Trigger
    card.querySelector('[data-view]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      openQuickView(card.dataset.id);
    });

    // Wishlist Toggle
    card.querySelector('[data-wishlist]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      btn.classList.toggle('active');
      const isFav = btn.classList.contains('active');
      showToast(isFav ? 'Piece saved to your Curated Wishlist ♡' : 'Removed from Wishlist');
    });

    // Clicking card opens quick view
    card.addEventListener('click', () => {
      openQuickView(card.dataset.id);
    });
  });
}

/* ---------------- SIGNATURE SUITES ---------------- */
function renderSuites() {
  const container = document.getElementById('suites-container');
  if (!container) return;

  container.innerHTML = jewelrySuites
    .map(
      (suite) => `
    <div class="suite-card reveal-on-scroll">
      <img src="${suite.image}" alt="${suite.title}" class="suite-card-img" loading="lazy" />
      <div class="suite-card-overlay">
        <span class="suite-tag">${suite.tag}</span>
        <h4 class="suite-name">${suite.title}</h4>
        <p class="suite-summary">${suite.summary}</p>
      </div>
    </div>
  `
    )
    .join('');
}

/* ---------------- QUICK VIEW MODAL ---------------- */
function initQuickViewModal() {
  const modal = document.getElementById('quick-view-modal');
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close-trigger');

  function closeModal() {
    if (modal) modal.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  window.openQuickView = openQuickView;
}

function openQuickView(id) {
  const prod = jewelryProducts.find((p) => p.id === id);
  if (!prod) return;

  const modal = document.getElementById('quick-view-modal');
  const overlay = document.getElementById('modal-overlay');
  const body = document.getElementById('modal-content-area');

  if (!modal || !body) return;

  body.innerHTML = `
    <div class="modal-inner-grid">
      <img src="${prod.image}" alt="${prod.name}" class="modal-jewel-img" />
      
      <div>
        <div class="modal-jewel-carat">${prod.carat}</div>
        <h2 class="modal-jewel-title">${prod.name}</h2>
        <div class="modal-jewel-price">${formatINR(prod.price)}</div>
        <p class="modal-jewel-desc">${prod.description}</p>

        <div class="modal-specs-table">
          <div class="modal-spec-row">
            <span class="spec-key">Natural Gemstones</span>
            <span class="spec-val">${prod.specs.gemstones}</span>
          </div>
          <div class="modal-spec-row">
            <span class="spec-key">Diamond Grade</span>
            <span class="spec-val">${prod.specs.diamonds}</span>
          </div>
          <div class="modal-spec-row">
            <span class="spec-key">Precious Metal</span>
            <span class="spec-val">${prod.specs.goldPurity}</span>
          </div>
          <div class="modal-spec-row">
            <span class="spec-key">Provenance & Report</span>
            <span class="spec-val">${prod.specs.certification}</span>
          </div>
        </div>

        <button class="primary-gold-btn" id="modal-acquire-btn" style="width: 100%; justify-content: center;">
          Acquire into Vault ✦
        </button>
      </div>
    </div>
  `;

  body.querySelector('#modal-acquire-btn')?.addEventListener('click', () => {
    vault.addItem(prod.id);
    modal.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    window.openVault();
  });

  modal.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ---------------- MOBILE NAVIGATION ---------------- */
function initMobileNav() {
  const burger = document.getElementById('nav-burger-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('mobile-drawer-close');

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burger) burger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  drawer?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ---------------- STICKY NAV & SCROLL REVEALS ---------------- */
function initScrollDynamics() {
  const header = document.getElementById('site-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  const reveals = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---------------- NEWSLETTER ---------------- */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-input');

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val || !val.includes('@')) {
        showToast('Please enter a valid concierge email.');
        return;
      }
      showToast('Welcome to the Private Circle of Mahira Connoisseurs ✦');
      input.value = '';
    });
  }
}
