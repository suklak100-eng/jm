// Luxury Haute Joaillerie Exhibition Engine
// Cartier / Bulgari / Graff Awwwards-Caliber Digital Experience

import { getExhibitionPieces, diamondCuts, getSiteSettings, getSiteContent } from './products.js';
import { vault, formatINR, showToast, initVaultDrawer } from './cart.js';
import { initCurtain } from './curtain.js';

document.addEventListener('DOMContentLoaded', () => {
  // 0. Apply Client Customizations (Theme colors, texts, toggles)
  applySiteCustomizations();

  // 1. Initialize Curtain Unveiling (Scroll & Click with Zero Black Screen)
  initCurtain();

  // 2. Initialize Private Vault Cart
  initVaultDrawer();

  // 3. Initialize Interactive Diamond Stardust Canvas
  initStardustCanvas();

  // 4. Initialize Custom Luxury Cursor
  initLuxuryCursor();

  // 5. Render Signature Product Showcase & Filter Pills (From Reference Video)
  renderSignatureProducts('all');
  initCatalogFilters();

  // 6. Render Archival Museum Exhibition Salons
  renderExhibition();

  // 7. Initialize Interactive 4Cs Diamond Loupe
  initDiamondLoupe();

  // 8. Initialize FAQ Accordion (From Reference Video)
  initFaqAccordion();

  // 9. Initialize Gemological Dossier Modal
  initDossierModal();

  // 10. Mobile Navigation Drawer
  initMobileNav();

  // 11. Sticky Header & Scroll Dynamic Reveals
  initScrollDynamics();

  // 12. Private Salon Concierge Form
  initConciergeForm();

  // 13. Vault Checkout Action
  const checkoutBtn = document.getElementById('vault-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }
});

/* ---------------- 0. CLIENT CUSTOMIZATIONS & LIVE CMS ENGINE ---------------- */
function applySiteCustomizations() {
  const settings = getSiteSettings();
  const content = getSiteContent();

  // Dynamic Theme Variables
  const root = document.documentElement;
  if (settings.primaryGold) {
    root.style.setProperty('--gold-400', settings.primaryGold);
    root.style.setProperty('--gold-border', `${settings.primaryGold}38`);
    root.style.setProperty('--gold-glow', `${settings.primaryGold}59`);
  }
  if (settings.bgDeep) {
    root.style.setProperty('--bg-deep', settings.bgDeep);
  }

  // Cursor Class
  if (settings.cursorEnabled === false) {
    document.body.classList.add('cursor-disabled');
  }

  // Canvas Shimmer Display
  const canvas = document.getElementById('stardust-canvas');
  if (canvas && settings.stardustEnabled === false) {
    canvas.style.display = 'none';
  }

  // Dynamic Content Bindings
  const heroMeta = document.getElementById('hero-meta-tag');
  if (heroMeta && content.heroMetaTag) heroMeta.innerHTML = content.heroMetaTag;

  const heroTitle = document.getElementById('hero-title-main');
  if (heroTitle && content.heroTitle) heroTitle.innerHTML = content.heroTitle;

  const heroSub = document.getElementById('hero-poetic-sub');
  if (heroSub && content.heroSubtitle) heroSub.innerHTML = content.heroSubtitle;

  const heroImg = document.getElementById('hero-vitrine-img');
  if (heroImg && content.heroImage) heroImg.src = content.heroImage;

  const heroTagTitle = document.getElementById('hero-tag-title');
  if (heroTagTitle && content.heroTagTitle) heroTagTitle.textContent = content.heroTagTitle;

  const heroTagSub = document.getElementById('hero-tag-sub');
  if (heroTagSub && content.heroTagSub) heroTagSub.textContent = content.heroTagSub;

  const heroTagCarat = document.getElementById('hero-tag-carat');
  if (heroTagCarat && content.heroTagCarat) heroTagCarat.textContent = content.heroTagCarat;

  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack && content.marqueeText) {
    marqueeTrack.innerHTML = `
      <div class="marquee-unit">${content.marqueeText}</div>
      <div class="marquee-unit">${content.marqueeText}</div>
    `;
  }

  const salonsList = document.getElementById('footer-salons-list');
  if (salonsList && content.salonsList) salonsList.textContent = content.salonsList;
}

/* ---------------- 1. STARDUST & CAUSTIC SHIMMER CANVAS ---------------- */
function initStardustCanvas() {
  const settings = getSiteSettings();
  if (settings.stardustEnabled === false) return;

  const canvas = document.getElementById('stardust-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = window.innerWidth < 768 ? 25 : 55;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -Math.random() * 0.3 - 0.08,
      alpha: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      hue: Math.random() > 0.4 ? 'gold' : 'diamond'
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

      // Wrap edges smoothly
      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      // Subtle mouse interaction
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.x -= (dx / dist) * 0.6;
        p.y -= (dy / dist) * 0.6;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      const color =
        p.hue === 'gold'
          ? `rgba(229, 196, 122, ${Math.max(0.1, Math.min(0.85, p.alpha))})`
          : `rgba(255, 255, 255, ${Math.max(0.1, Math.min(0.9, p.alpha))})`;

      ctx.fillStyle = color;
      ctx.shadowBlur = p.hue === 'gold' ? 8 : 12;
      ctx.shadowColor = p.hue === 'gold' ? '#e5c47a' : '#ffffff';
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ---------------- 2. CUSTOM LUXURY RING CURSOR ---------------- */
function initLuxuryCursor() {
  const settings = getSiteSettings();
  if (settings.cursorEnabled === false) return;
  if (window.innerWidth < 1024) return; // Desktop only

  const cursor = document.createElement('div');
  cursor.id = 'luxury-cursor';
  cursor.innerHTML = '<div class="cursor-ring"></div><div class="cursor-dot"></div>';
  document.body.appendChild(cursor);

  let mouseX = -100, mouseY = -100;
  let currentX = -100, currentY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function update() {
    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;

    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(update);
  }
  update();

  document.querySelectorAll('a, button, .exhibit-image-stage, .loupe-cut-btn').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

/* ---------------- 3. RENDER EXHIBITION SALONS (NO IMAGE CLIPPING!) ---------------- */
function renderExhibition() {
  const container = document.getElementById('exhibition-container');
  if (!container) return;

  const pieces = getExhibitionPieces();
  container.innerHTML = pieces
    .map((piece, idx) => {
      const isReverse = idx % 2 === 1 ? 'reverse' : '';
      return `
      <section class="exhibit-salon-block ${isReverse} reveal-on-scroll" data-id="${piece.id}">
        
        <!-- Left Showcase Visual (Spacious, Full Piece Visible with Breathing Room) -->
        <div class="exhibit-visual-col">
          <div class="exhibit-image-stage">
            <img src="${piece.image}" alt="${piece.name}" class="exhibit-primary-img" loading="lazy" />
          </div>
        </div>

        <!-- Right Minimalist Curatorial Column (Clean, Uncluttered, Pure Focus) -->
        <div class="exhibit-text-col">
          <div class="exhibit-meta-row">
            <span class="exhibit-tag-pill">${piece.num} • ${piece.provenance}</span>
          </div>

          <h2 class="exhibit-title">${piece.name}</h2>
          <p class="exhibit-stone-line">${piece.stone}</p>
          <div class="exhibit-carat-badge">${piece.carat}</div>

          <div class="exhibit-actions-row">
            <div class="exhibit-price-val">${piece.priceFormatted}</div>
            
            <div class="exhibit-btns-group">
              <button class="primary-gold-btn examine-dossier-btn" data-id="${piece.id}">
                Examine Dossier ✦
              </button>
              <button class="ghost-btn acquire-btn" data-id="${piece.id}">
                Acquire Piece
              </button>
            </div>
          </div>
        </div>

      </section>
    `;
    })
    .join('');

  // Attach Listeners
  container.querySelectorAll('.examine-dossier-btn').forEach((btn) => {
    btn.addEventListener('click', () => openDossier(btn.dataset.id));
  });

  container.querySelectorAll('.acquire-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      vault.addItem(btn.dataset.id);
      window.openVault();
    });
  });

  // Soft Parallax on hover
  container.querySelectorAll('.exhibit-image-stage').forEach((stage) => {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const img = stage.querySelector('.exhibit-primary-img');
      if (img) {
        img.style.transform = `scale(1.04) translate(${x * 12}px, ${y * 12}px)`;
      }
    });

    stage.addEventListener('mouseleave', () => {
      const img = stage.querySelector('.exhibit-primary-img');
      if (img) {
        img.style.transform = 'scale(1) translate(0, 0)';
      }
    });
  });
}

/* ---------------- 4. INTERACTIVE 4Cs DIAMOND LOUPE ---------------- */
function initDiamondLoupe() {
  const buttonsContainer = document.getElementById('loupe-cuts-nav');
  const loupeSvg = document.getElementById('loupe-facets-polygon');
  const cutNameEl = document.getElementById('loupe-cut-name');
  const cutSubEl = document.getElementById('loupe-cut-sub');
  const cutDescEl = document.getElementById('loupe-cut-desc');
  const cutCaratEl = document.getElementById('loupe-cut-carat');
  const cutFacetsEl = document.getElementById('loupe-cut-facets');
  const cutRatioEl = document.getElementById('loupe-cut-ratio');

  if (!buttonsContainer) return;

  buttonsContainer.innerHTML = diamondCuts
    .map(
      (cut, idx) => `
    <button class="loupe-cut-btn ${idx === 0 ? 'active' : ''}" data-cut="${cut.id}">
      <span class="cut-btn-name">${cut.name}</span>
      <span class="cut-btn-sub">${cut.subtitle}</span>
    </button>
  `
    )
    .join('');

  function selectCut(cutId) {
    const cut = diamondCuts.find((c) => c.id === cutId) || diamondCuts[0];

    buttonsContainer.querySelectorAll('.loupe-cut-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.cut === cutId);
    });

    if (loupeSvg) {
      loupeSvg.setAttribute('points', cut.svgPoints);
      loupeSvg.style.transform = 'scale(1.06)';
      setTimeout(() => (loupeSvg.style.transform = 'scale(1)'), 300);
    }

    if (cutNameEl) cutNameEl.textContent = cut.name;
    if (cutSubEl) cutSubEl.textContent = cut.subtitle;
    if (cutDescEl) cutDescEl.textContent = cut.description;
    if (cutCaratEl) cutCaratEl.textContent = cut.caratSample;
    if (cutFacetsEl) cutFacetsEl.textContent = `${cut.facets} Facets`;
    if (cutRatioEl) cutRatioEl.textContent = cut.ratios;
  }

  buttonsContainer.querySelectorAll('.loupe-cut-btn').forEach((btn) => {
    btn.addEventListener('click', () => selectCut(btn.dataset.cut));
  });

  selectCut('emerald');
}

/* ---------------- 5. GEMOLOGICAL DOSSIER MODAL ---------------- */
function initDossierModal() {
  const modal = document.getElementById('dossier-modal');
  const overlay = document.getElementById('dossier-overlay');
  const closeBtn = document.getElementById('dossier-close-btn');

  function closeModal() {
    if (modal) modal.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeModal();
    }
  });

  window.openDossier = (id) => {
    const pieces = getExhibitionPieces();
    const piece = pieces.find((p) => p.id === id);
    if (!piece || !modal) return;

    const content = document.getElementById('dossier-content');
    content.innerHTML = `
      <div class="dossier-inner-grid">
        
        <div>
          <img src="${piece.image}" alt="${piece.name}" class="dossier-img" />
          <div style="margin-top: 14px; font-family: var(--font-sans); font-size: 0.72rem; color: var(--gold-400); letter-spacing: 0.12em;">
            ✦ ${piece.gemology.report}
          </div>
        </div>

        <div>
          <div class="dossier-number">${piece.num} • ${piece.provenance}</div>
          <h2 class="dossier-title">${piece.name}</h2>
          <div class="dossier-price-tag">${piece.priceFormatted}</div>
          
          <p class="dossier-description">${piece.quote}</p>

          <div class="dossier-specs-table">
            <div class="dossier-spec-row">
              <span class="dossier-key">Mine of Origin</span>
              <span class="dossier-val">${piece.gemology.origin}</span>
            </div>
            <div class="dossier-spec-row">
              <span class="dossier-key">Carat & Weight</span>
              <span class="dossier-val">${piece.carat}</span>
            </div>
            <div class="dossier-spec-row">
              <span class="dossier-key">Clarity & Color</span>
              <span class="dossier-val">${piece.gemology.clarity}</span>
            </div>
            <div class="dossier-spec-row">
              <span class="dossier-key">Metal Hallmarking</span>
              <span class="dossier-val">${piece.gemology.metalPurity}</span>
            </div>
          </div>

          <div class="dossier-actions-pane">
            <button class="primary-gold-btn" id="dossier-acquire-action" style="flex: 1; justify-content: center;">
              Acquire into Private Vault ✦
            </button>
            <button class="ghost-btn" onclick="showToast('Salon Concierge notified for private viewing'); document.getElementById('dossier-modal').classList.remove('open'); document.getElementById('dossier-overlay').classList.remove('open'); document.body.style.overflow = '';">
              Book Viewing in Salon
            </button>
          </div>
        </div>

      </div>
    `;

    content.querySelector('#dossier-acquire-action')?.addEventListener('click', () => {
      vault.addItem(piece.id);
      closeModal();
      window.openVault();
    });

    modal.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
}

/* ---------------- 6. SALON MENU & MOBILE NAVIGATION ---------------- */
function initMobileNav() {
  const triggers = [
    document.getElementById('salon-menu-trigger'),
    document.getElementById('mobile-burger-trigger'),
    document.getElementById('menu-trigger-btn')
  ].filter(Boolean);

  const drawer = document.getElementById('salon-menu-drawer') || document.getElementById('mobile-salon-drawer');
  const overlay = document.getElementById('salon-drawer-overlay') || document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('salon-drawer-close') || document.getElementById('mobile-drawer-close');

  function openDrawer() {
    drawer?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggers.forEach((btn) => btn.addEventListener('click', openDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('open')) {
      closeDrawer();
    }
  });

  drawer?.querySelectorAll('a').forEach((l) => l.addEventListener('click', closeDrawer));
}

/* ---------------- 7. STICKY NAV & SCROLL REVEALS ---------------- */
function initScrollDynamics() {
  const header = document.getElementById('site-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
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
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---------------- 8. SIGNATURE PRODUCT SHOWCASE (From Reference Video) ---------------- */
export function renderSignatureProducts(category = 'all') {
  const container = document.getElementById('home-products-grid');
  if (!container) return;

  const pieces = getExhibitionPieces();
  const filtered = category === 'all' 
    ? pieces.slice(0, 8) 
    : pieces.filter((p) => p.category === category);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: var(--text-muted);">
        <p>No masterworks found in this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((piece) => {
    return `
      <div class="jewel-card reveal-on-scroll is-revealed" data-id="${piece.id}">
        <div class="jewel-card-media">
          <a href="product.html?id=${piece.id}">
            <img src="${piece.image}" alt="${piece.name}" class="jewel-img-primary" loading="lazy" />
            <img src="${piece.secondaryImage || piece.image}" alt="${piece.name}" class="jewel-img-secondary" loading="lazy" />
          </a>
          <span class="jewel-badge">${piece.num} • ${piece.metal.split('&')[0]}</span>
          <button class="jewel-wishlist-btn" data-id="${piece.id}" title="Add to Wishlist" aria-label="Wishlist">
            ♥
          </button>
        </div>
        <div class="jewel-card-body">
          <div class="jewel-card-cat">${(piece.category || 'Jewellery').toUpperCase()}</div>
          <a href="product.html?id=${piece.id}" class="jewel-card-name">${piece.name}</a>
          <div class="jewel-card-stone">${piece.stone}</div>
          <div class="jewel-card-foot">
            <span class="jewel-card-price">${piece.priceFormatted}</span>
            <button class="jewel-card-add-btn add-to-vault-btn" data-id="${piece.id}">
              + Add to Bag
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach event listeners
  container.querySelectorAll('.add-to-vault-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      vault.addItem(btn.dataset.id);
      window.openVault();
    });
  });

  container.querySelectorAll('.jewel-wishlist-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      showToast(btn.classList.contains('active') ? 'Added to Wishlist ✦' : 'Removed from Wishlist');
    });
  });
}

function initCatalogFilters() {
  const filterBtns = document.querySelectorAll('.catalog-filter-pill');
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category || 'all';
      renderSignatureProducts(cat);
    });
  });
}

/* ---------------- 9. FAQ ACCORDION (From Reference Video) ---------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((i) => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/* ---------------- 10. CONCIERGE FORM ---------------- */
function initConciergeForm() {
  const form = document.getElementById('salon-concierge-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('concierge-name')?.value || 'Guest';
      const salon = document.getElementById('concierge-salon')?.value || 'Atelier';
      const date = document.getElementById('concierge-date')?.value || 'Selected Date';

      showToast(`Appointment requested for ${name} at ${salon} on ${date}. Our Master Jeweler will contact you ✦`);
      form.reset();
    });
  }
}
