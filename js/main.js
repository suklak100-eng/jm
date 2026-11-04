// Main Luxury Application Controller for Mahira Select

import { products, accordionItems } from './products.js';
import { cart, formatINR, showToast, initCartDrawer } from './cart.js';
import { audioEngine } from './audio.js';
import { initCurtain } from './curtain.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Curtain Animation
  initCurtain();

  // 2. Initialize Cart Drawer
  initCartDrawer();

  // 3. Initialize Audio Synthesizer & Visualizer
  initAudioControls();

  // 4. Initialize Interactive Accordion Gallery
  initAccordion();

  // 5. Initialize Best Sellers Section & Filtering
  initBestSellers();

  // 6. Initialize Quick View Modal
  initQuickView();

  // 7. Initialize Mega Menu
  initMegaMenu();

  // 8. Initialize Search Drawer
  initSearch();

  // 9. Initialize Mobile Navigation Drawer
  initMobileNav();

  // 10. Initialize Scroll Reveals & Sticky Nav
  initScrollEffects();

  // 11. Newsletter Subscription
  initNewsletter();
});

/* ---------------- AUDIO ATMOSPHERE ---------------- */
function initAudioControls() {
  const toggleBtn = document.getElementById('audio-toggle-btn');
  const toggleHeroBtn = document.getElementById('hero-audio-play-btn');
  const heroAudioCard = document.getElementById('hero-audio-widget');
  const canvas = document.getElementById('audio-visualizer-canvas');
  const volumeSlider = document.getElementById('audio-volume-slider');
  const statusLabel = document.getElementById('audio-status-label');

  if (canvas) {
    audioEngine.bindVisualizer(canvas);
  }

  function handleAudioToggle() {
    const isPlaying = audioEngine.toggle();
    updateAudioUI(isPlaying);
  }

  function updateAudioUI(isPlaying) {
    if (toggleBtn) {
      toggleBtn.classList.toggle('playing', isPlaying);
      toggleBtn.setAttribute('aria-pressed', isPlaying);
    }
    if (toggleHeroBtn) {
      toggleHeroBtn.classList.toggle('playing', isPlaying);
      toggleHeroBtn.innerHTML = isPlaying 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    }
    if (heroAudioCard) {
      heroAudioCard.classList.toggle('active', isPlaying);
    }
    if (statusLabel) {
      statusLabel.textContent = isPlaying ? 'Playing Classical Drone' : 'Ambiance Paused';
    }
  }

  if (toggleBtn) toggleBtn.addEventListener('click', handleAudioToggle);
  if (toggleHeroBtn) toggleHeroBtn.addEventListener('click', handleAudioToggle);

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      audioEngine.setVolume(parseFloat(e.target.value));
    });
  }
}

/* ---------------- INTERACTIVE ACCORDION ---------------- */
function initAccordion() {
  const container = document.getElementById('accordion-cards-container');
  if (!container) return;

  container.innerHTML = accordionItems
    .map((item, index) => {
      const isActive = index === 0 ? 'active' : '';
      return `
        <div class="accordion-panel ${isActive}" data-id="${item.id}">
          <div class="accordion-bg-wrap">
            <img src="${item.image}" alt="${item.title}" class="accordion-img" />
            <div class="accordion-overlay"></div>
          </div>
          
          <div class="accordion-vertical-title">
            <span class="acc-index">0${index + 1}</span>
            <span class="acc-v-text">${item.title}</span>
          </div>

          <div class="accordion-content">
            <span class="acc-badge">${item.badge}</span>
            <h3 class="acc-title">${item.title}</h3>
            <p class="acc-tagline">${item.tagline}</p>
            <p class="acc-desc">${item.details}</p>
            <div class="acc-footer">
              <span class="acc-price">${item.price}</span>
              <button class="gold-pill-btn quick-explore-btn" data-panel="${item.id}">
                Explore Piece <span>→</span>
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  const panels = container.querySelectorAll('.accordion-panel');

  panels.forEach((panel) => {
    panel.addEventListener('mouseenter', () => {
      if (window.innerWidth > 992) {
        panels.forEach((p) => p.classList.remove('active'));
        panel.classList.add('active');
      }
    });

    panel.addEventListener('click', () => {
      panels.forEach((p) => p.classList.remove('active'));
      panel.classList.add('active');
    });

    const btn = panel.querySelector('.quick-explore-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.panel;
        // Open matching product in quick view
        const match = products.find((p) => p.category === 'kalakaari' || p.category === 'sarees');
        if (match) {
          openQuickViewModal(match.id);
        } else {
          showToast(`Browsing ${panel.querySelector('.acc-title').textContent}`);
        }
      });
    }
  });
}

/* ---------------- BEST SELLERS & FILTERING ---------------- */
function initBestSellers() {
  const grid = document.getElementById('bestsellers-grid');
  const filterBtns = document.querySelectorAll('.bestseller-filter-btn');

  function renderGrid(filter = 'all') {
    if (!grid) return;

    const filtered = filter === 'all' 
      ? products 
      : products.filter((p) => p.category === filter);

    grid.innerHTML = filtered
      .map((prod, index) => {
        const isBentoLarge = index === 0 ? 'bento-large' : '';
        return `
          <div class="product-card ${isBentoLarge}" data-id="${prod.id}">
            <div class="prod-img-wrap">
              <img src="${prod.image}" alt="${prod.name}" class="prod-img-primary" loading="lazy" />
              <img src="${prod.secondaryImage}" alt="${prod.name} angle" class="prod-img-secondary" loading="lazy" />
              
              <div class="prod-tag-badge">${prod.tag}</div>
              
              <button class="prod-wishlist-btn" data-wishlist="${prod.id}" aria-label="Add to wishlist">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>

              <div class="prod-quick-actions">
                <button class="quick-view-trigger-btn" data-view="${prod.id}">
                  Quick View
                </button>
                <button class="quick-add-btn" data-add="${prod.id}">
                  Add to Bag +
                </button>
              </div>
            </div>

            <div class="prod-info">
              <div class="prod-meta">
                <span class="prod-collection">${prod.collection}</span>
                <span class="prod-rating">★ ${prod.rating}</span>
              </div>
              <h3 class="prod-title">${prod.name}</h3>
              <p class="prod-craft-line">${prod.craft}</p>
              <div class="prod-price-line">
                <span class="prod-current-price">${formatINR(prod.price)}</span>
                <span class="prod-original-price">${formatINR(prod.originalPrice)}</span>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    // Attach card event listeners
    grid.querySelectorAll('.quick-view-trigger-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openQuickViewModal(btn.dataset.view);
      });
    });

    grid.querySelectorAll('.quick-add-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cart.addItem(btn.dataset.add);
      });
    });

    grid.querySelectorAll('.prod-wishlist-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
        const isActive = btn.classList.contains('active');
        showToast(isActive ? 'Saved to your personal Wishlist ♡' : 'Removed from Wishlist');
      });
    });

    grid.querySelectorAll('.product-card').forEach((card) => {
      card.addEventListener('click', () => {
        openQuickViewModal(card.dataset.id);
      });
    });
  }

  // Initial render
  renderGrid('all');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid(btn.dataset.filter);
    });
  });
}

/* ---------------- QUICK VIEW MODAL ---------------- */
let currentModalProduct = null;

function initQuickView() {
  const modal = document.getElementById('quick-view-modal');
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');

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

  window.openQuickViewModal = openQuickViewModal;
}

function openQuickViewModal(productId) {
  const prod = products.find((p) => p.id === productId);
  if (!prod) return;
  currentModalProduct = prod;

  const modal = document.getElementById('quick-view-modal');
  const overlay = document.getElementById('modal-overlay');
  const body = document.getElementById('modal-body-content');

  if (!modal || !body) return;

  body.innerHTML = `
    <div class="qv-grid">
      <div class="qv-gallery">
        <div class="qv-main-img-wrap">
          <img id="qv-active-img" src="${prod.image}" alt="${prod.name}" />
        </div>
        <div class="qv-thumbs">
          <img class="qv-thumb active" src="${prod.image}" alt="View 1" data-full="${prod.image}" />
          <img class="qv-thumb" src="${prod.secondaryImage}" alt="View 2" data-full="${prod.secondaryImage}" />
        </div>
      </div>

      <div class="qv-details">
        <div class="qv-badge">${prod.tag} • ${prod.origin}</div>
        <h2 class="qv-title">${prod.name}</h2>
        <div class="qv-price-row">
          <span class="qv-price">${formatINR(prod.price)}</span>
          <span class="qv-orig-price">${formatINR(prod.originalPrice)}</span>
          <span class="qv-tax-note">Includes all luxury import & bespoke taxes</span>
        </div>

        <p class="qv-desc">${prod.description}</p>

        <div class="qv-specs-box">
          <div class="qv-spec-item">
            <span class="qv-spec-label">Artisan Weave</span>
            <span class="qv-spec-val">${prod.craft}</span>
          </div>
          <div class="qv-spec-item">
            <span class="qv-spec-label">Fabric Composition</span>
            <span class="qv-spec-val">${prod.fabric}</span>
          </div>
          <div class="qv-spec-item">
            <span class="qv-spec-label">Artisan Cluster</span>
            <span class="qv-spec-val">${prod.origin}</span>
          </div>
        </div>

        <div class="qv-option-group">
          <label class="qv-opt-title">Select Sizing / Draping Specification</label>
          <div class="qv-size-chips" id="qv-size-selector">
            ${prod.sizes
              .map(
                (size, i) => `
              <button class="qv-size-chip ${i === 0 ? 'selected' : ''}" data-size="${size}">
                ${size}
              </button>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="qv-actions">
          <button class="gold-cta-btn qv-add-bag-btn" id="modal-add-to-cart">
            Add to Bag ✦
          </button>
          <button class="gold-outline-btn" id="modal-buy-now">
            Direct Checkout →
          </button>
        </div>

        <div class="qv-perks">
          <div class="qv-perk">
            <span>🛡️</span> 100% Silk Mark & GI-Heritage Certified
          </div>
          <div class="qv-perk">
            <span>📦</span> Complimentary Express Insured Courier
          </div>
          <div class="qv-perk">
            <span>✂️</span> Complimentary Blouse Fit Consultation
          </div>
        </div>
      </div>
    </div>
  `;

  // Image thumbnail switching
  const thumbs = body.querySelectorAll('.qv-thumb');
  const mainImg = body.querySelector('#qv-active-img');
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      thumbs.forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainImg) mainImg.src = thumb.dataset.full;
    });
  });

  // Size chips
  const chips = body.querySelectorAll('.qv-size-chip');
  let selectedSize = prod.sizes[0] || 'Standard';
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedSize = chip.dataset.size;
    });
  });

  // Modal Cart Add
  const addBtn = body.querySelector('#modal-add-to-cart');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      cart.addItem(prod.id, selectedSize);
      modal.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
      window.openMahiraCart();
    });
  }

  const buyBtn = body.querySelector('#modal-buy-now');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      cart.addItem(prod.id, selectedSize);
      modal.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
      window.openMahiraCart();
    });
  }

  modal.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ---------------- MEGA MENU ---------------- */
function initMegaMenu() {
  const trigger = document.getElementById('nav-kalakaari-link');
  const megaMenu = document.getElementById('kalakaari-mega-menu');
  let timeout = null;

  if (!trigger || !megaMenu) return;

  function showMenu() {
    clearTimeout(timeout);
    megaMenu.classList.add('active');
  }

  function hideMenu() {
    timeout = setTimeout(() => {
      megaMenu.classList.remove('active');
    }, 250);
  }

  trigger.addEventListener('mouseenter', showMenu);
  trigger.addEventListener('mouseleave', hideMenu);
  megaMenu.addEventListener('mouseenter', showMenu);
  megaMenu.addEventListener('mouseleave', hideMenu);

  // Keyboard accessibility
  trigger.addEventListener('focus', showMenu);
}

/* ---------------- LIVE SEARCH ---------------- */
function initSearch() {
  const searchBtn = document.getElementById('search-trigger-btn');
  const searchDrawer = document.getElementById('search-drawer');
  const searchOverlay = document.getElementById('search-overlay');
  const closeBtn = document.getElementById('search-close-btn');
  const input = document.getElementById('search-input-field');
  const resultsContainer = document.getElementById('search-live-results');
  const tagChips = document.querySelectorAll('.search-tag-chip');

  function openSearch() {
    if (searchDrawer) searchDrawer.classList.add('open');
    if (searchOverlay) searchOverlay.classList.add('open');
    setTimeout(() => input?.focus(), 150);
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    if (searchDrawer) searchDrawer.classList.remove('open');
    if (searchOverlay) searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  if (searchOverlay) searchOverlay.addEventListener('click', closeSearch);

  function performSearch(query) {
    if (!resultsContainer) return;
    const q = query.trim().toLowerCase();

    if (!q) {
      resultsContainer.innerHTML = `<div class="search-hint">Type above to search by weave, fabric, collection, or motif...</div>`;
      return;
    }

    const matches = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.craft.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-empty">
          <p>No masterworks found matching "<strong>${query}</strong>"</p>
          <span>Try searching for 'Kalamkari', 'Saree', 'Silk', or 'Chanderi'</span>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matches
      .map(
        (m) => `
        <div class="search-result-item" data-id="${m.id}">
          <img src="${m.image}" alt="${m.name}" class="search-res-img" />
          <div class="search-res-info">
            <span class="search-res-cat">${m.category} • ${m.craft}</span>
            <h4 class="search-res-title">${m.name}</h4>
            <span class="search-res-price">${formatINR(m.price)}</span>
          </div>
          <button class="search-res-view-btn">View</button>
        </div>
      `
      )
      .join('');

    resultsContainer.querySelectorAll('.search-result-item').forEach((item) => {
      item.addEventListener('click', () => {
        closeSearch();
        openQuickViewModal(item.dataset.id);
      });
    });
  }

  if (input) {
    input.addEventListener('input', (e) => performSearch(e.target.value));
  }

  tagChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      if (input) {
        input.value = chip.dataset.tag;
        performSearch(chip.dataset.tag);
      }
    });
  });
}

/* ---------------- MOBILE NAVIGATION ---------------- */
function initMobileNav() {
  const burger = document.getElementById('mobile-menu-burger');
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-nav-close');
  const accordions = document.querySelectorAll('.mobile-nav-accordion-trigger');

  function openMobileNav() {
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burger) burger.addEventListener('click', openMobileNav);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileNav);
  if (overlay) overlay.addEventListener('click', closeMobileNav);

  accordions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      parent.classList.toggle('expanded');
    });
  });

  // Close when clicking mobile links
  drawer?.querySelectorAll('a:not(.mobile-nav-accordion-trigger)').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });
}

/* ---------------- SCROLL EFFECTS & STICKY NAV ---------------- */
function initScrollEffects() {
  const header = document.getElementById('site-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Reveal elements on scroll
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
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---------------- NEWSLETTER ---------------- */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val || !val.includes('@')) {
        showToast('Please enter a valid email address.');
        return;
      }
      showToast('Welcome to the Mahira Connoisseurs Circle ✦');
      input.value = '';
    });
  }
}

