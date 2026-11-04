// Luxury Silk Curtain Controller with Instant 120FPS Opening & Audio Engine
import { getSiteSettings } from './products.js';

// Pre-warmed shared AudioContext and pre-computed buffers
let sharedAudioCtx = null;
let prewarmedNoiseBuffer = null;

function getAudioContext() {
  if (!sharedAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

// Pre-generate pink noise buffer once on page load (eliminates main-thread scroll lag)
function getNoiseBuffer(ctx) {
  if (prewarmedNoiseBuffer) return prewarmedNoiseBuffer;
  try {
    const len = Math.floor(ctx.sampleRate * 1.3);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const out = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      out[i] = (b0 + b1 + b2) * 0.085;
    }
    prewarmedNoiseBuffer = buf;
    return buf;
  } catch (_) {
    return null;
  }
}

export function initCurtain() {
  const curtainOverlay = document.getElementById('curtain-overlay');
  const siteRoot = document.getElementById('site-root');
  const unveilBtn = document.getElementById('unveil-btn');
  const replayBtn = document.getElementById('replay-curtain-btn');

  if (!curtainOverlay) return;

  let isUnveiled = false;
  let isAnimating = false;

  // Prime AudioContext on ANY early touch or pointer activity
  const primeAudio = () => {
    getAudioContext();
  };
  ['pointerdown', 'touchstart', 'wheel', 'keydown'].forEach((evt) => {
    window.addEventListener(evt, primeAudio, { once: true, passive: true });
  });

  function unveil() {
    if (isUnveiled || isAnimating) return;
    isAnimating = true;

    // Immediately unbind triggers to prevent duplicate firings
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('keydown', onKeyDown);

    // Instant hardware-accelerated class addition
    curtainOverlay.classList.add('is-opening');
    if (siteRoot) {
      siteRoot.classList.add('site-revealed');
    }
    document.body.classList.remove('curtain-active');

    // Trigger instant audio playback
    playCurtainOpeningSound();

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

  // Instant scroll trigger (Fires on the VERY FIRST pixel of scroll!)
  function onWheel(e) {
    if (isUnveiled || isAnimating) return;
    if (Math.abs(e.deltaY) > 1.2 || Math.abs(e.deltaX) > 1.2) {
      e.preventDefault();
      unveil();
    }
  }

  // Instant touch swipe trigger
  let touchStartY = 0;
  let touchStartX = 0;

  function onTouchStart(e) {
    if (e.touches && e.touches[0]) {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    }
  }

  function onTouchMove(e) {
    if (isUnveiled || isAnimating) return;
    if (e.touches && e.touches[0]) {
      const deltaY = touchStartY - e.touches[0].clientY;
      const deltaX = touchStartX - e.touches[0].clientX;
      if (Math.abs(deltaY) > 5 || Math.abs(deltaX) > 5) {
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

  // Instant click/tap anywhere on curtain or button
  if (unveilBtn) {
    unveilBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      unveil();
    });
  }

  curtainOverlay.addEventListener('pointerdown', () => {
    primeAudio();
  });

  curtainOverlay.addEventListener('click', () => {
    if (!isUnveiled && !isAnimating) {
      unveil();
    }
  });

  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      redraw();
    });
  }

  window.unveilCurtain = unveil;
  window.redrawCurtain = redraw;
}

// ---------------- SOUND ORCHESTRATION ENGINE ----------------
export function playCurtainOpeningSound() {
  const settings = getSiteSettings();

  // If custom audio file (MP3 / WAV / Base64) is uploaded by Admin
  if (settings.curtainAudioMode === 'custom' && settings.customCurtainAudio) {
    try {
      const audio = new Audio(settings.customCurtainAudio);
      audio.volume = 0.85;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          playSynthesizedAudioPreset(settings.curtainAudioMode || 'salon-chime');
        });
      }
      return;
    } catch (_) {
      // Fallback to synthesized preset
    }
  }

  // Synthesized preset audio
  playSynthesizedAudioPreset(settings.curtainAudioMode || 'salon-chime');
}

export function playSynthesizedAudioPreset(mode = 'salon-chime') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. SILK / VELVET FABRIC DRAWING RUSTLE (Pre-computed buffer for 0ms lag)
    const noiseBuf = getNoiseBuffer(ctx);
    if (noiseBuf) {
      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = noiseBuf;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(650, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(280, now + 1.1);
      noiseFilter.Q.setValueAtTime(1.6, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.0001, now);
      noiseGain.gain.linearRampToValueAtTime(0.065, now + 0.18);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      noiseSrc.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSrc.start(now);
      noiseSrc.stop(now + 1.25);
    }

    // 2. CHOSEN CHIME PRESET
    let chimeNotes = [];

    if (mode === 'place-vendome') {
      // Deep grand cathedral/palace bell resonance
      chimeNotes = [
        { f: 220.00, delay: 0.1, vol: 0.06 },
        { f: 329.63, delay: 0.15, vol: 0.05 },
        { f: 440.00, delay: 0.22, vol: 0.045 },
        { f: 659.25, delay: 0.32, vol: 0.035 }
      ];
    } else if (mode === 'celestial-harp') {
      // Shimmering harp glissando
      chimeNotes = [
        { f: 523.25, delay: 0.08, vol: 0.04 },
        { f: 659.25, delay: 0.14, vol: 0.04 },
        { f: 783.99, delay: 0.20, vol: 0.04 },
        { f: 1046.50, delay: 0.26, vol: 0.035 },
        { f: 1318.51, delay: 0.32, vol: 0.03 }
      ];
    } else {
      // Default: Royal Salon Chime (Warm Major 9th Rhodes Bell)
      chimeNotes = [
        { f: 261.63, delay: 0.10, vol: 0.05 },
        { f: 392.00, delay: 0.16, vol: 0.045 },
        { f: 493.88, delay: 0.22, vol: 0.04 },
        { f: 587.33, delay: 0.28, vol: 0.035 },
        { f: 659.25, delay: 0.35, vol: 0.03 },
        { f: 783.99, delay: 0.42, vol: 0.025 }
      ];
    }

    chimeNotes.forEach(({ f, delay, vol }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + delay);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3000, now + delay);
      filter.frequency.exponentialRampToValueAtTime(700, now + delay + 1.8);

      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.exponentialRampToValueAtTime(vol, now + delay + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 2.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 2.2);
    });
  } catch (_) {}
}
