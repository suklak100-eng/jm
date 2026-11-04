// Atelier Sovereign Console Orchestrator
// Full CRUD, Visual Customizer, Content CMS, and Auth Control

import {
  getExhibitionPieces,
  saveExhibitionPieces,
  resetExhibitionPieces,
  getSiteSettings,
  saveSiteSettings,
  resetSiteSettings,
  getSiteContent,
  saveSiteContent,
  resetSiteContent,
  getAdminAuth,
  saveAdminAuth
} from './products.js';

document.addEventListener('DOMContentLoaded', () => {
  initAuthSession();
  initTabs();
  initCatalogManager();
  initThemeManager();
  initContentManager();
  initSecurityManager();
  initBackupManager();
});

/* ---------------- 1. AUTHENTICATION & SESSION CONTROL ---------------- */
function initAuthSession() {
  const loginScreen = document.getElementById('login-screen');
  const dashboardScreen = document.getElementById('dashboard-screen');
  const loginForm = document.getElementById('admin-login-form');
  const loginUser = document.getElementById('login-username');
  const loginPass = document.getElementById('login-password');
  const togglePassBtn = document.getElementById('toggle-login-pass');
  const errorMsg = document.getElementById('login-error-msg');
  const logoutBtn = document.getElementById('admin-logout-btn');
  const userBadge = document.getElementById('active-user-badge');

  function checkSession() {
    const isLoggedIn = sessionStorage.getItem('mahira_admin_logged_in') === 'true';
    if (isLoggedIn) {
      const auth = getAdminAuth();
      if (userBadge) userBadge.textContent = auth.username || 'admin';
      loginScreen.style.display = 'none';
      dashboardScreen.classList.add('active');
      refreshAllViews();
    } else {
      loginScreen.style.display = 'flex';
      dashboardScreen.classList.remove('active');
    }
  }

  // Toggle Password Visibility
  if (togglePassBtn) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = loginPass.type === 'password';
      loginPass.type = isPass ? 'text' : 'password';
      togglePassBtn.textContent = isPass ? '🔒' : '👁️';
    });
  }

  // Login Form Submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const auth = getAdminAuth();
      const enteredUser = loginUser.value.trim();
      const enteredPass = loginPass.value;

      if (enteredUser === auth.username && enteredPass === auth.password) {
        sessionStorage.setItem('mahira_admin_logged_in', 'true');
        if (errorMsg) errorMsg.style.display = 'none';
        loginPass.value = '';
        checkSession();
        showAdminToast('Authenticated into Sovereign Atelier Console ✦');
      } else {
        if (errorMsg) {
          errorMsg.textContent = 'Invalid identifier or secret password. Please verify and retry.';
          errorMsg.style.display = 'block';
        }
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('mahira_admin_logged_in');
      checkSession();
      showAdminToast('Signed out from Sovereign Atelier Console.');
    });
  }

  checkSession();
}

/* ---------------- 2. NAVIGATION TABS ---------------- */
function initTabs() {
  const tabBtns = document.querySelectorAll('.admin-tab-btn');
  const tabPanels = document.querySelectorAll('.admin-tab-panel');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach((b) => b.classList.remove('active'));
      tabPanels.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`tab-${target}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* ---------------- 3. MASTERWORK CATALOG (CRUD) ---------------- */
let currentEditingId = null;

function initCatalogManager() {
  const addBtn = document.getElementById('add-piece-trigger-btn');
  const resetBtn = document.getElementById('reset-catalog-btn');
  const searchInput = document.getElementById('catalog-search-input');
  const modal = document.getElementById('piece-modal');
  const overlay = document.getElementById('piece-modal-overlay');
  const closeBtn = document.getElementById('piece-modal-close');
  const cancelBtn = document.getElementById('piece-modal-cancel');
  const pieceForm = document.getElementById('piece-form');
  const filePicker = document.getElementById('form-file-picker');
  const imgInput = document.getElementById('form-piece-image');
  const previewStage = document.getElementById('form-img-preview');
  const previewImg = document.getElementById('form-preview-img-tag');

  // Open Modal Helper
  function openModal(isEdit = false, piece = null) {
    modal.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    const titleEl = document.getElementById('piece-modal-title');
    if (isEdit && piece) {
      currentEditingId = piece.id;
      titleEl.textContent = `Edit Masterpiece — ${piece.name}`;
      document.getElementById('form-piece-id').value = piece.id;
      document.getElementById('form-piece-name').value = piece.name || '';
      document.getElementById('form-piece-num').value = piece.num || '';
      document.getElementById('form-piece-price').value = piece.price || '';
      document.getElementById('form-piece-provenance').value = piece.provenance || '';
      document.getElementById('form-piece-stone').value = piece.stone || '';
      document.getElementById('form-piece-carat').value = piece.carat || '';
      document.getElementById('form-piece-metal').value = piece.metal || '';
      document.getElementById('form-piece-image').value = piece.image || '';
      document.getElementById('form-piece-quote').value = piece.quote || '';

      const gem = piece.gemology || {};
      document.getElementById('form-gem-origin').value = gem.origin || '';
      document.getElementById('form-gem-clarity').value = gem.clarity || '';
      document.getElementById('form-gem-diamonds').value = gem.diamonds || '';
      document.getElementById('form-gem-report').value = gem.report || '';

      if (piece.image) {
        previewImg.src = piece.image;
        previewStage.classList.add('active');
      } else {
        previewStage.classList.remove('active');
      }
    } else {
      currentEditingId = null;
      titleEl.textContent = 'Add New Haute Joaillerie Masterpiece';
      pieceForm.reset();
      document.getElementById('form-piece-id').value = '';

      const pieces = getExhibitionPieces();
      const nextNum = pieces.length + 1;
      document.getElementById('form-piece-num').value = `N° 0${nextNum}`;
      document.getElementById('form-piece-provenance').value = 'Imperial Collection • Place Vendôme';
      document.getElementById('form-gem-diamonds').value = 'Colorless (E-F Grade), VVS1 Clarity';
      document.getElementById('form-gem-report').value = 'SSEF & GIA Gemological Dossier';

      previewStage.classList.remove('active');
      previewImg.src = '';
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (addBtn) addBtn.addEventListener('click', () => openModal(false));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  // File Upload Handling with Downscaling / WebP Compression
  if (filePicker) {
    filePicker.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      processImageFile(file, (dataUrl) => {
        imgInput.value = dataUrl;
        previewImg.src = dataUrl;
        previewStage.classList.add('active');
        showAdminToast('Image uploaded and optimized successfully ✦');
      });
    });
  }

  // URL Input Live Preview
  if (imgInput) {
    imgInput.addEventListener('input', () => {
      const val = imgInput.value.trim();
      if (val) {
        previewImg.src = val;
        previewStage.classList.add('active');
      } else {
        previewStage.classList.remove('active');
      }
    });
  }

  // Form Submission (Add or Update)
  if (pieceForm) {
    pieceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pieces = getExhibitionPieces();

      const name = document.getElementById('form-piece-name').value.trim();
      const num = document.getElementById('form-piece-num').value.trim();
      const priceVal = parseFloat(document.getElementById('form-piece-price').value) || 0;
      const provenance = document.getElementById('form-piece-provenance').value.trim();
      const stone = document.getElementById('form-piece-stone').value.trim();
      const carat = document.getElementById('form-piece-carat').value.trim();
      const metal = document.getElementById('form-piece-metal').value.trim();
      const image = document.getElementById('form-piece-image').value.trim() ||
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85';
      const quote = document.getElementById('form-piece-quote').value.trim();

      const gemOrigin = document.getElementById('form-gem-origin').value.trim();
      const gemClarity = document.getElementById('form-gem-clarity').value.trim();
      const gemDiamonds = document.getElementById('form-gem-diamonds').value.trim();
      const gemReport = document.getElementById('form-gem-report').value.trim();

      const priceFormatted = '₹' + priceVal.toLocaleString('en-IN');

      if (currentEditingId) {
        // Edit existing
        const idx = pieces.findIndex((p) => p.id === currentEditingId);
        if (idx !== -1) {
          pieces[idx] = {
            ...pieces[idx],
            name,
            num,
            price: priceVal,
            priceFormatted,
            provenance,
            stone,
            carat,
            metal,
            image,
            quote,
            gemology: {
              origin: gemOrigin,
              clarity: gemClarity,
              diamonds: gemDiamonds,
              metalPurity: metal,
              report: gemReport
            }
          };
          saveExhibitionPieces(pieces);
          showAdminToast(`Masterpiece "${name}" updated successfully ✦`);
        }
      } else {
        // Add new
        const newPiece = {
          id: `exhibit-${Date.now()}`,
          name,
          num,
          price: priceVal,
          priceFormatted,
          provenance,
          stone,
          carat,
          metal,
          image,
          quote,
          gemology: {
            origin: gemOrigin,
            clarity: gemClarity,
            diamonds: gemDiamonds,
            metalPurity: metal,
            report: gemReport
          }
        };
        pieces.push(newPiece);
        saveExhibitionPieces(pieces);
        showAdminToast(`New masterpiece "${name}" added to exhibition ✦`);
      }

      closeModal();
      refreshAllViews();
    });
  }

  // Reset Catalog to Defaults
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to restore the original 4 imperial masterworks? Any custom pieces will be reset.')) {
        resetExhibitionPieces();
        refreshAllViews();
        showAdminToast('Exhibition catalog reset to original imperial masterworks.');
      }
    });
  }

  // Search Filter
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      renderCatalogGrid(query);
    });
  }
}

// Render Catalog Cards Grid
function renderCatalogGrid(filterQuery = '') {
  const container = document.getElementById('catalog-cards-grid');
  const countNote = document.getElementById('catalog-count-note');
  if (!container) return;

  const pieces = getExhibitionPieces();
  const filtered = filterQuery
    ? pieces.filter((p) =>
        (p.name && p.name.toLowerCase().includes(filterQuery)) ||
        (p.stone && p.stone.toLowerCase().includes(filterQuery)) ||
        (p.provenance && p.provenance.toLowerCase().includes(filterQuery)) ||
        (p.num && p.num.toLowerCase().includes(filterQuery))
      )
    : pieces;

  if (countNote) {
    countNote.textContent = `Showing ${filtered.length} of ${pieces.length} masterpieces`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--admin-text-muted);">
        <div style="font-size: 2rem; color: var(--admin-gold-400); margin-bottom: 10px;">✦</div>
        <h3>No masterpieces matched your query</h3>
        <p style="font-size: 0.82rem; margin-top: 6px;">Try adjusting your search terms or add a new piece.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((piece) => {
      return `
        <div class="piece-admin-card" data-id="${piece.id}">
          <div class="piece-card-thumb-wrap">
            <img src="${piece.image}" alt="${piece.name}" class="piece-card-thumb" loading="lazy" />
            <span class="piece-card-num-badge">${piece.num}</span>
          </div>

          <div class="piece-card-body">
            <div class="piece-card-provenance">${piece.provenance}</div>
            <h3 class="piece-card-title">${piece.name}</h3>
            <div class="piece-card-details">
              <strong>Gemstone:</strong> ${piece.stone}<br>
              <strong>Carat:</strong> ${piece.carat}
            </div>

            <div class="piece-card-price-row">
              <div class="piece-card-price">${piece.priceFormatted}</div>
              <div class="piece-card-actions">
                <button class="action-icon-btn edit-piece-btn" data-id="${piece.id}" title="Edit Masterpiece">
                  ✏️ Edit
                </button>
                <button class="action-icon-btn delete-btn delete-piece-btn" data-id="${piece.id}" title="Remove Piece">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  // Attach Action Listeners
  container.querySelectorAll('.edit-piece-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const piece = pieces.find((p) => p.id === btn.dataset.id);
      if (piece) {
        const titleEl = document.getElementById('piece-modal-title');
        titleEl.textContent = `Edit Masterpiece — ${piece.name}`;
        currentEditingId = piece.id;

        document.getElementById('form-piece-id').value = piece.id;
        document.getElementById('form-piece-name').value = piece.name || '';
        document.getElementById('form-piece-num').value = piece.num || '';
        document.getElementById('form-piece-price').value = piece.price || '';
        document.getElementById('form-piece-provenance').value = piece.provenance || '';
        document.getElementById('form-piece-stone').value = piece.stone || '';
        document.getElementById('form-piece-carat').value = piece.carat || '';
        document.getElementById('form-piece-metal').value = piece.metal || '';
        document.getElementById('form-piece-image').value = piece.image || '';
        document.getElementById('form-piece-quote').value = piece.quote || '';

        const gem = piece.gemology || {};
        document.getElementById('form-gem-origin').value = gem.origin || '';
        document.getElementById('form-gem-clarity').value = gem.clarity || '';
        document.getElementById('form-gem-diamonds').value = gem.diamonds || '';
        document.getElementById('form-gem-report').value = gem.report || '';

        const previewImg = document.getElementById('form-preview-img-tag');
        const previewStage = document.getElementById('form-img-preview');
        if (piece.image) {
          previewImg.src = piece.image;
          previewStage.classList.add('active');
        }

        const modal = document.getElementById('piece-modal');
        const overlay = document.getElementById('piece-modal-overlay');
        modal.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  container.querySelectorAll('.delete-piece-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const piece = pieces.find((p) => p.id === btn.dataset.id);
      if (piece && confirm(`Remove "${piece.name}" from the public exhibition?`)) {
        const remaining = pieces.filter((p) => p.id !== piece.id);
        saveExhibitionPieces(remaining);
        refreshAllViews();
        showAdminToast(`Removed "${piece.name}" from exhibition.`);
      }
    });
  });
}

/* ---------------- 4. VISUAL EXPERIENCE & THEME ---------------- */
function initThemeManager() {
  const toggleCursor = document.getElementById('toggle-cursor');
  const toggleStardust = document.getElementById('toggle-stardust');
  const goldPicker = document.getElementById('theme-gold-picker');
  const goldText = document.getElementById('theme-gold-text');
  const bgPicker = document.getElementById('theme-bg-picker');
  const bgText = document.getElementById('theme-bg-text');
  const glowPicker = document.getElementById('theme-glow-picker');
  const glowText = document.getElementById('theme-glow-text');
  const saveBtn = document.getElementById('save-theme-btn');
  const resetBtn = document.getElementById('reset-theme-btn');
  const presetBtns = document.querySelectorAll('.palette-chip-btn');

  function syncPickers(settings) {
    if (toggleCursor) toggleCursor.checked = settings.cursorEnabled !== false;
    if (toggleStardust) toggleStardust.checked = settings.stardustEnabled !== false;

    if (goldPicker && goldText) {
      goldPicker.value = settings.primaryGold || '#e5c47a';
      goldText.value = settings.primaryGold || '#e5c47a';
    }
    if (bgPicker && bgText) {
      bgPicker.value = settings.bgDeep || '#07070a';
      bgText.value = settings.bgDeep || '#07070a';
    }
    if (glowPicker && glowText) {
      glowPicker.value = settings.goldGlow || '#c9a456';
      glowText.value = settings.goldGlow || '#c9a456';
    }
  }

  // Two-way sync for color swatches
  if (goldPicker && goldText) {
    goldPicker.addEventListener('input', () => (goldText.value = goldPicker.value));
    goldText.addEventListener('input', () => {
      if (/^#[0-9A-F]{6}$/i.test(goldText.value)) goldPicker.value = goldText.value;
    });
  }
  if (bgPicker && bgText) {
    bgPicker.addEventListener('input', () => (bgText.value = bgPicker.value));
    bgText.addEventListener('input', () => {
      if (/^#[0-9A-F]{6}$/i.test(bgText.value)) bgPicker.value = bgText.value;
    });
  }
  if (glowPicker && glowText) {
    glowPicker.addEventListener('input', () => (glowText.value = glowPicker.value));
    glowText.addEventListener('input', () => {
      if (/^#[0-9A-F]{6}$/i.test(glowText.value)) glowPicker.value = glowText.value;
    });
  }

  // Presets
  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const gold = btn.dataset.gold;
      const bg = btn.dataset.bg;
      const glow = btn.dataset.glow;

      if (goldPicker) goldPicker.value = gold;
      if (goldText) goldText.value = gold;
      if (bgPicker) bgPicker.value = bg;
      if (bgText) bgText.value = bg;
      if (glowPicker) glowPicker.value = glow;
      if (glowText) glowText.value = glow;

      showAdminToast(`Selected preset: ${btn.textContent.trim()}`);
    });
  });

  // Save Theme
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const newSettings = {
        cursorEnabled: toggleCursor.checked,
        stardustEnabled: toggleStardust.checked,
        primaryGold: goldText.value.trim(),
        bgDeep: bgText.value.trim(),
        goldGlow: glowText.value.trim()
      };
      saveSiteSettings(newSettings);
      refreshAllViews();
      showAdminToast('Visual experience & theme settings saved ✦');
    });
  }

  // Reset Theme
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Restore default Place Vendôme gold & obsidian theme?')) {
        resetSiteSettings();
        syncPickers(getSiteSettings());
        refreshAllViews();
        showAdminToast('Theme restored to original Place Vendôme defaults.');
      }
    });
  }

  syncPickers(getSiteSettings());
}

/* ---------------- 5. CONTENT & EDITORIAL CMS ---------------- */
function initContentManager() {
  const heroMeta = document.getElementById('edit-hero-meta');
  const heroTitle = document.getElementById('edit-hero-title');
  const heroSub = document.getElementById('edit-hero-sub');
  const heroImg = document.getElementById('edit-hero-img');
  const heroFile = document.getElementById('hero-file-picker');
  const heroPreviewStage = document.getElementById('hero-img-preview');
  const heroPreviewImg = document.getElementById('hero-preview-img-tag');
  const heroTagTitle = document.getElementById('edit-hero-tag-title');
  const heroTagSub = document.getElementById('edit-hero-tag-sub');
  const heroTagCarat = document.getElementById('edit-hero-tag-carat');
  const marquee = document.getElementById('edit-marquee-text');
  const salons = document.getElementById('edit-salons-list');
  const saveBtn = document.getElementById('save-content-btn');
  const resetBtn = document.getElementById('reset-content-btn');

  function populateContent(content) {
    if (heroMeta) heroMeta.value = content.heroMetaTag || '';
    if (heroTitle) heroTitle.value = content.heroTitle || '';
    if (heroSub) heroSub.value = content.heroSubtitle || '';
    if (heroImg) heroImg.value = content.heroImage || '';
    if (heroTagTitle) heroTagTitle.value = content.heroTagTitle || '';
    if (heroTagSub) heroTagSub.value = content.heroTagSub || '';
    if (heroTagCarat) heroTagCarat.value = content.heroTagCarat || '';
    if (marquee) marquee.value = content.marqueeText || '';
    if (salons) salons.value = content.salonsList || '';

    if (content.heroImage && heroPreviewImg && heroPreviewStage) {
      heroPreviewImg.src = content.heroImage;
      heroPreviewStage.classList.add('active');
    }
  }

  // Hero File Picker
  if (heroFile) {
    heroFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      processImageFile(file, (dataUrl) => {
        heroImg.value = dataUrl;
        heroPreviewImg.src = dataUrl;
        heroPreviewStage.classList.add('active');
        showAdminToast('Hero vitrine image uploaded and optimized ✦');
      });
    });
  }

  // Save Content
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const newContent = {
        heroMetaTag: heroMeta.value.trim(),
        heroTitle: heroTitle.value.trim(),
        heroSubtitle: heroSub.value.trim(),
        heroImage: heroImg.value.trim(),
        heroTagTitle: heroTagTitle.value.trim(),
        heroTagSub: heroTagSub.value.trim(),
        heroTagCarat: heroTagCarat.value.trim(),
        marqueeText: marquee.value.trim(),
        salonsList: salons.value.trim()
      };
      saveSiteContent(newContent);
      showAdminToast('Editorial text & hero announcements saved ✦');
    });
  }

  // Reset Content
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset editorial typography and announcements to defaults?')) {
        resetSiteContent();
        populateContent(getSiteContent());
        showAdminToast('Editorial content reset to original defaults.');
      }
    });
  }

  populateContent(getSiteContent());
}

/* ---------------- 6. SECURITY & PASSWORD MANAGEMENT ---------------- */
function initSecurityManager() {
  const form = document.getElementById('change-password-form');
  const currPass = document.getElementById('sec-curr-pass');
  const newUsername = document.getElementById('sec-new-username');
  const newPass = document.getElementById('sec-new-pass');
  const confirmPass = document.getElementById('sec-confirm-pass');
  const alertBox = document.getElementById('sec-alert-msg');
  const userBadge = document.getElementById('active-user-badge');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const auth = getAdminAuth();

    // 1. Verify Recent / Current Password
    if (currPass.value !== auth.password) {
      alertBox.textContent = 'Verification Failed: The current password you entered is incorrect.';
      alertBox.style.background = 'rgba(248, 113, 113, 0.15)';
      alertBox.style.color = 'var(--admin-danger)';
      alertBox.style.border = '1px solid var(--admin-danger)';
      alertBox.style.display = 'block';
      return;
    }

    // 2. Validate New Password Length
    if (newPass.value.length < 6) {
      alertBox.textContent = 'Password must be at least 6 characters in length.';
      alertBox.style.background = 'rgba(248, 113, 113, 0.15)';
      alertBox.style.color = 'var(--admin-danger)';
      alertBox.style.border = '1px solid var(--admin-danger)';
      alertBox.style.display = 'block';
      return;
    }

    // 3. Confirm Match
    if (newPass.value !== confirmPass.value) {
      alertBox.textContent = 'New password and confirmation do not match.';
      alertBox.style.background = 'rgba(248, 113, 113, 0.15)';
      alertBox.style.color = 'var(--admin-danger)';
      alertBox.style.border = '1px solid var(--admin-danger)';
      alertBox.style.display = 'block';
      return;
    }

    // 4. Save New Credentials
    const updatedUsername = newUsername.value.trim() || auth.username || 'admin';
    const updatedAuth = {
      username: updatedUsername,
      password: newPass.value
    };

    saveAdminAuth(updatedAuth);

    if (userBadge) userBadge.textContent = updatedUsername;

    alertBox.textContent = 'Admin credentials updated successfully! Keep your new password secure.';
    alertBox.style.background = 'rgba(74, 222, 128, 0.15)';
    alertBox.style.color = 'var(--admin-success)';
    alertBox.style.border = '1px solid var(--admin-success)';
    alertBox.style.display = 'block';

    currPass.value = '';
    newPass.value = '';
    confirmPass.value = '';

    showAdminToast('Security credentials updated successfully ✦');
  });
}

/* ---------------- 7. BACKUP & RESTORE ---------------- */
function initBackupManager() {
  const downloadBtn = document.getElementById('download-backup-btn');
  const restoreInput = document.getElementById('restore-file-input');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const payload = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        pieces: getExhibitionPieces(),
        settings: getSiteSettings(),
        content: getSiteContent()
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `mahira-atelier-backup-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      showAdminToast('System backup archive downloaded ✦');
    });
  }

  if (restoreInput) {
    restoreInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && parsed.pieces && Array.isArray(parsed.pieces)) {
            saveExhibitionPieces(parsed.pieces);
            if (parsed.settings) saveSiteSettings(parsed.settings);
            if (parsed.content) saveSiteContent(parsed.content);

            refreshAllViews();
            showAdminToast('Backup restored successfully into Sovereign Atelier ✦');
          } else {
            alert('Invalid backup archive structure.');
          }
        } catch (err) {
          alert('Could not parse JSON archive: ' + err.message);
        }
      };
      reader.readAsText(file);
    });
  }
}

/* ---------------- 8. STATS & VIEW REFRESH ---------------- */
function refreshAllViews() {
  const pieces = getExhibitionPieces();
  const settings = getSiteSettings();

  // 1. Total Pieces Stat
  const totalPiecesEl = document.getElementById('stat-total-pieces');
  if (totalPiecesEl) totalPiecesEl.textContent = pieces.length;

  // 2. Total Valuation Stat
  const totalValuationEl = document.getElementById('stat-total-valuation');
  if (totalValuationEl) {
    const sum = pieces.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
    if (sum >= 10000000) {
      totalValuationEl.textContent = `₹${(sum / 10000000).toFixed(2)} Cr`;
    } else {
      totalValuationEl.textContent = `₹${sum.toLocaleString('en-IN')}`;
    }
  }

  // 3. Toggles Stats
  const cursorStatusEl = document.getElementById('stat-cursor-status');
  if (cursorStatusEl) {
    cursorStatusEl.textContent = settings.cursorEnabled !== false ? 'Active' : 'Disabled';
    cursorStatusEl.style.color = settings.cursorEnabled !== false ? 'var(--admin-gold-300)' : 'var(--admin-text-muted)';
  }

  const stardustStatusEl = document.getElementById('stat-stardust-status');
  if (stardustStatusEl) {
    stardustStatusEl.textContent = settings.stardustEnabled !== false ? 'Active' : 'Disabled';
    stardustStatusEl.style.color = settings.stardustEnabled !== false ? 'var(--admin-gold-300)' : 'var(--admin-text-muted)';
  }

  // 4. Render Catalog Grid
  renderCatalogGrid();
}

/* ---------------- 9. IMAGE PROCESSING (DOWN-SCALING CANVAS) ---------------- */
function processImageFile(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 1400;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const optimized = canvas.toDataURL('image/jpeg', 0.85);
      callback(optimized);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

/* ---------------- 10. LUXURY ADMIN TOAST NOTIFICATION ---------------- */
function showAdminToast(msg, isError = false) {
  const container = document.getElementById('admin-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `admin-toast ${isError ? 'error' : ''}`;
  toast.innerHTML = `<span>💎</span><span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 350);
  }, 3400);
}

