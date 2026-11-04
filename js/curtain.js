// Luxury 3D Silk Curtain Controller with Fluid Scroll & Touch Unveiling

export function initCurtain() {
  const curtainOverlay = document.getElementById('curtain-overlay');
  const unveilBtn = document.getElementById('unveil-btn');
  const replayBtn = document.getElementById('replay-curtain-btn');

  if (!curtainOverlay) return;

  let isUnveiled = false;
  let isAnimating = false;

  function unveil() {
    if (isUnveiled || isAnimating) return;
    isAnimating = true;

    // Remove window event listeners immediately to prevent re-triggering
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('keydown', onKeyDown);

    curtainOverlay.classList.add('is-opening');
    document.body.classList.remove('curtain-active');

    // Trigger soft royal acoustic chime / swoosh if available
    playLuxuryRevealSound();

    // After the 3D parting animation finishes, cleanly disable overlay
    setTimeout(() => {
      curtainOverlay.classList.add('is-opened');
      curtainOverlay.classList.remove('is-opening');
      curtainOverlay.style.display = 'none';
      isUnveiled = true;
      isAnimating = false;

      if (replayBtn) {
        replayBtn.classList.add('visible');
      }
    }, 1300);
  }

  function redraw() {
    if (!isUnveiled || isAnimating) return;
    isAnimating = true;

    if (replayBtn) {
      replayBtn.classList.remove('visible');
    }

    curtainOverlay.style.display = 'flex';
    // Force reflow
    void curtainOverlay.offsetWidth;

    curtainOverlay.classList.remove('is-opened');
    curtainOverlay.classList.add('is-closing');
    document.body.classList.add('curtain-active');

    setTimeout(() => {
      curtainOverlay.classList.remove('is-closing');
      isUnveiled = false;
      isAnimating = false;
      bindCurtainTriggers();
    }, 1200);
  }

  // Mouse wheel scroll trigger
  function onWheel(e) {
    if (isUnveiled || isAnimating) return;
    if (e.deltaY > 10 || e.deltaY < -10) {
      e.preventDefault();
      unveil();
    }
  }

  // Touch swipe trigger for mobile/trackpad
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
      if (Math.abs(deltaY) > 20) {
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

  // Initialize triggers
  bindCurtainTriggers();

  // Button clicks
  if (unveilBtn) {
    unveilBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      unveil();
    });
  }

  // Clicking anywhere on the curtain center or overlay
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

// Procedural harmonic crystal chime for jewelry unveiling
function playLuxuryRevealSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Pure crystalline chime frequencies (C6, E6, G6, B6 harmonic sweep)
    const freqs = [1046.5, 1318.5, 1567.9, 1975.5];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06 / (idx + 1), ctx.currentTime + idx * 0.08 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 1.3);
    });
  } catch (_) {}
}
