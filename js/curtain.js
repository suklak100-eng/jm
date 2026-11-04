// Cinematic Satin Curtain Reveal Controller
// Creates luxurious silk draping physics, audio cue, and reveal mechanics

export function initCurtain() {
  const curtainOverlay = document.getElementById('curtain-overlay');
  const curtainLeft = document.getElementById('curtain-left');
  const curtainRight = document.getElementById('curtain-right');
  const curtainCenter = document.getElementById('curtain-center');
  const unveilBtn = document.getElementById('unveil-btn');
  const redrawBtn = document.getElementById('redraw-curtain-btn');

  if (!curtainOverlay) return;

  let isUnveiled = false;

  function unveil() {
    if (isUnveiled) return;
    isUnveiled = true;

    curtainOverlay.classList.add('is-opening');

    // Trigger subtle silk swoosh audio effect if audio context permitted
    playCurtainSwoosh();

    // After animation finishes, allow full pointer events to website
    setTimeout(() => {
      curtainOverlay.classList.add('is-open');
      curtainOverlay.classList.remove('is-opening');
      document.body.classList.remove('curtain-active');

      // Show floating replay button
      if (redrawBtn) {
        redrawBtn.classList.add('visible');
      }
    }, 1800);
  }

  function redraw() {
    if (!isUnveiled) return;
    isUnveiled = false;

    if (redrawBtn) {
      redrawBtn.classList.remove('visible');
    }

    curtainOverlay.classList.remove('is-open');
    curtainOverlay.classList.add('is-closing');
    document.body.classList.add('curtain-active');

    // Play gentle draw sound
    playCurtainSwoosh();

    setTimeout(() => {
      curtainOverlay.classList.remove('is-closing');
    }, 1600);
  }

  // Click listeners
  if (unveilBtn) {
    unveilBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      unveil();
    });
  }

  // Clicking anywhere on the curtain also unveils it
  curtainOverlay.addEventListener('click', () => {
    if (!isUnveiled) unveil();
  });

  // Re-draw button
  if (redrawBtn) {
    redrawBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      redraw();
    });
  }

  // Keyboard accessibility: Escape or Enter
  window.addEventListener('keydown', (e) => {
    if (!isUnveiled && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      unveil();
    }
  });

  // Expose methods globally for inspection/testing
  window.unveilCurtain = unveil;
  window.redrawCurtain = redraw;
}

// Procedural silk fabric swoosh sound using Web Audio API
function playCurtainSwoosh() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Pink/white noise buffer for soft fabric rustle
    const bufferSize = ctx.sampleRate * 1.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02; // Pink noise filter
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 1.2);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 1.3);
  } catch (_) {
    // Silent fallback
  }
}

