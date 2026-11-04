// Indian Classical Sitar & Tanpura Heritage Ambience Audio Synthesizer
// Uses Web Audio API for zero-dependency, pristine acoustic immersion

class HeritageAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.filter = null;
    this.analyser = null;
    this.volume = 0.65;
    this.animationId = null;
    this.canvas = null;
    this.canvasCtx = null;
    this.playbackTime = 0;
    this.timerInterval = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

    // Warm resonant acoustic filter (simulates hollow wooden gourd resonance)
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    // Analyser node for real-time waveform visualizer
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 128;

    this.masterGain.connect(this.filter);
    this.filter.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  // Raag Bhairav / Yaman harmonic root drone (Sa, Pa, Sa', Ga)
  start() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    // Frequencies for Tanpura drone in C# (138.59 Hz)
    // 1st string: Pa (G#3 - 207.65 Hz)
    // 2nd string: Sa' (C#4 - 277.18 Hz)
    // 3rd string: Sa' (C#4 - 277.18 Hz with micro-detune)
    // 4th string: Kharaj Sa (C#3 - 138.59 Hz deep bass)
    const notes = [
      { freq: 138.59, type: 'triangle', gain: 0.35, detune: 0 },
      { freq: 207.65, type: 'sawtooth', gain: 0.18, detune: 2 },
      { freq: 277.18, type: 'triangle', gain: 0.22, detune: -3 },
      { freq: 277.18, type: 'sine', gain: 0.20, detune: 4 },
      { freq: 349.23, type: 'sine', gain: 0.12, detune: 1 }, // Ga
      { freq: 415.30, type: 'triangle', gain: 0.10, detune: -2 }, // Pa octave
      { freq: 554.37, type: 'sine', gain: 0.08, detune: 3 } // Sa'' shimmer
    ];

    this.oscillators = [];

    notes.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = note.type;
      osc.frequency.setValueAtTime(note.freq, this.ctx.currentTime);
      osc.detune.setValueAtTime(note.detune, this.ctx.currentTime);

      // Add gentle LFO tremolo (simulates plucked jivari silk thread buzz)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.3 + Math.random() * 0.4, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(note.gain * 0.3, this.ctx.currentTime);
      lfo.connect(lfoGain.gain);
      lfo.start();

      noteGain.gain.setValueAtTime(note.gain, this.ctx.currentTime);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);
      osc.start();

      this.oscillators.push({ osc, lfo });
    });

    // Smooth luxury fade-in
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(this.volume, this.ctx.currentTime + 1.8);

    this.isPlaying = true;
    this.startTimer();
    this.startVisualizer();
  }

  stop() {
    if (!this.isPlaying || !this.ctx) return;

    // Smooth luxury fade-out
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);

    setTimeout(() => {
      this.oscillators.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          osc.disconnect();
          lfo.stop();
          lfo.disconnect();
        } catch (_) {}
      });
      this.oscillators = [];
      this.isPlaying = false;
      this.stopTimer();
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
    }, 850);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && this.isPlaying) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  bindVisualizer(canvasElement) {
    this.canvas = canvasElement;
    if (canvasElement) {
      this.canvasCtx = canvasElement.getContext('2d');
    }
  }

  startVisualizer() {
    if (!this.canvas || !this.canvasCtx || !this.analyser) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      this.animationId = requestAnimationFrame(render);
      this.analyser.getByteFrequencyData(dataArray);

      const width = this.canvas.width;
      const height = this.canvas.height;
      this.canvasCtx.clearRect(0, 0, width, height);

      const barCount = 18;
      const barWidth = 2.5;
      const gap = (width - (barCount * barWidth)) / (barCount - 1);

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i * 2] || 0;
        const percent = value / 255;
        const barHeight = Math.max(3, percent * height * 0.9);
        const x = i * (barWidth + gap);
        const y = height - barHeight;

        const gradient = this.canvasCtx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#c5a059');
        gradient.addColorStop(1, '#f7e7b4');

        this.canvasCtx.fillStyle = gradient;
        this.canvasCtx.fillRect(x, y, barWidth, barHeight);
      }
    };
    render();
  }

  startTimer() {
    const timeDisplay = document.getElementById('audio-timer');
    if (!timeDisplay) return;

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.playbackTime += 1;
      const mins = Math.floor(this.playbackTime / 60);
      const secs = this.playbackTime % 60;
      timeDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}

export const audioEngine = new HeritageAudioEngine();

