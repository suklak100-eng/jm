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

// Realistic Boutique Salon Unveil Acoustic Synthesizer
// Synthesizes heavy silk velvet fabric draw rustle + warm royal crystalline chime
function playLuxuryRevealSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;

    // 1. SILK / VELVET FABRIC DRAWING RUSTLE (Soft filtered pink noise glide)
    const bufferSize = Math.floor(ctx.sampleRate * 1.4);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.09;
    }

    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(650, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(260, now + 1.2);
    noiseFilter.Q.setValueAtTime(1.8, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.linearRampToValueAtTime(0.065, now + 0.2);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);

    noiseSrc.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSrc.start(now);
    noiseSrc.stop(now + 1.3);

    // 2. LUXURY SHOWROOM HARMONIC CHIME (Opulent Warm Rhodes / Bell Chord)
    // Major 9th Chord: C4 (261.63Hz), G4 (392.00Hz), B4 (493.88Hz), D5 (587.33Hz), E5 (659.25Hz), G5 (783.99Hz)
    const chimeNotes = [
      { f: 261.63, delay: 0.12, vol: 0.05 },
      { f: 392.00, delay: 0.18, vol: 0.045 },
      { f: 493.88, delay: 0.25, vol: 0.04 },
      { f: 587.33, delay: 0.32, vol: 0.035 },
      { f: 659.25, delay: 0.40, vol: 0.03 },
      { f: 783.99, delay: 0.48, vol: 0.025 }
    ];

    chimeNotes.forEach(({ f, delay, vol }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + delay);

      // Warm lowpass filter to remove digital hardness
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3200, now + delay);
      filter.frequency.exponentialRampToValueAtTime(650, now + delay + 2.0);

      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.exponentialRampToValueAtTime(vol, now + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 2.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 2.3);
    });
  } catch (_) {}
}
