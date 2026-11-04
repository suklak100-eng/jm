// Luxury 3D Silk Curtain Controller with Real-Time Site Reveal Bloom

export function initCurtain() {
  const curtainOverlay = document.getElementById('curtain-overlay');
  const siteRoot = document.getElementById('site-root');
  const unveilBtn = document.getElementById('unveil-btn');
  const replayBtn = document.getElementById('replay-curtain-btn');

  if (!curtainOverlay) return;

  let isUnveiled = false;
  let isAnimating = false;

  function unveil() {
    if (isUnveiled || isAnimating) return;
    isAnimating = true;

    // Remove window event listeners immediately
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('keydown', onKeyDown);

    // CRITICAL: At the exact moment curtain starts opening, bloom site-root into full clarity
    curtainOverlay.classList.add('is-opening');
    if (siteRoot) {
      siteRoot.classList.add('site-revealed');
    }
    document.body.classList.remove('curtain-active');

    // Chime sound
    playLuxuryRevealSound();

    // After curtains have fully parted, cleanly disable overlay
    setTimeout(() => {
      curtainOverlay.classList.add('is-opened');
      curtainOverlay.classList.remove('is-opening');
      curtainOverlay.style.display = 'none';
      isUnveiled = true;
      isAnimating = false;

      if (replayBtn) {
        replayBtn.classList.add('visible');
      }
    }, 1250);
  }

  function redraw() {
    if (!isUnveiled || isAnimating) return;
    isAnimating = true;

    if (replayBtn) {
      replayBtn.classList.remove('visible');
    }

    if (siteRoot) {
      siteRoot.classList.remove('site-revealed');
    }

    curtainOverlay.style.display = 'flex';
    void curtainOverlay.offsetWidth; // Force reflow

    curtainOverlay.classList.remove('is-opened');
    curtainOverlay.classList.add('is-closing');
    document.body.classList.add('curtain-active');

    setTimeout(() => {
      curtainOverlay.classList.remove('is-closing');
      isUnveiled = false;
      isAnimating = false;
      bindCurtainTriggers();
    }, 1150);
  }

  // Mouse wheel scroll trigger
  function onWheel(e) {
    if (isUnveiled || isAnimating) return;
    if (e.deltaY > 10 || e.deltaY < -10) {
      e.preventDefault();
      unveil();
    }
  }

  // Touch swipe trigger
  let touchStartY = 0;
  function onTouchStart(e) {
    if (e.touches && e.touches[0]) {
      touchStartY = e.touches[0].clientY;
    }
  }

  function onTouchMove(e) {
    if (isUnveiled || isAnimating) return;
    if (e.touches && e.touches[0]) {
      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) > 15) {
        e.preventDefault();
        unveil();
      }
    }
  }

  // Keyboard trigger
  function onKeyDown(e) {
    if (isUnveiled || isAnimating) return;
    if (['ArrowDown', 'ArrowUp', ' ', 'Enter', 'PageDown'].includes(e.key)) {
      e.preventDefault();
      unveil();
    }
  }

  function bindCurtainTriggers() {
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
  }

  bindCurtainTriggers();

  // Button click
  if (unveilBtn) {
    unveilBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      unveil();
    });
  }

  // Click on curtain
  curtainOverlay.addEventListener('click', () => {
    if (!isUnveiled && !isAnimating) {
      unveil();
    }
  });

  // Replay button
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      redraw();
    });
  }

  window.unveilCurtain = unveil;
  window.redrawCurtain = redraw;
}

// Procedural harmonic crystal chime
function playLuxuryRevealSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const freqs = [1046.5, 1318.5, 1567.9, 1975.5];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.05 / (idx + 1), ctx.currentTime + idx * 0.08 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 1.3);
    });
  } catch (_) {}
}
