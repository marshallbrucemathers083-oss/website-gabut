/**
 * ==============================================================================
 * AUDIO CONTROLLER (js/audio.js)
 * ==============================================================================
 * Handles audio playback for the website.
 * - Prioritizes custom MP3 if provided in SITE_CONTENT.audio.customAudioSrc.
 * - Seamlessly falls back to a built-in calming procedural ambient piano synth
 *   via Web Audio API if no MP3 is provided, ensuring music works 100% out of the box!
 * ==============================================================================
 */

class AudioController {
  constructor() {
    this.isPlaying = false;
    this.audioContext = null;
    this.synthInterval = null;
    this.htmlAudio = null;
    this.usingCustomAudio = false;
    this.gainNode = null;
    this.toggleBtn = document.getElementById("audio-toggle");
    this.trackTitleEl = document.getElementById("audio-track-title");
    this.trackArtistEl = document.getElementById("audio-track-artist");

    this.initDOM();
  }

  initDOM() {
    // Populate track info from content.js
    if (window.SITE_CONTENT && window.SITE_CONTENT.audio) {
      if (this.trackTitleEl) {
        this.trackTitleEl.textContent = window.SITE_CONTENT.audio.trackTitle || "Warm Twilight";
      }
      if (this.trackArtistEl) {
        this.trackArtistEl.textContent = window.SITE_CONTENT.audio.trackArtist || "Gentle Melody";
      }
    }

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => this.toggle());
    }
  }

  /**
   * Called on initial user interaction (click on "Begin Journey" button)
   */
  async start() {
    if (this.isPlaying) return;

    const customSrc = window.SITE_CONTENT && window.SITE_CONTENT.audio && window.SITE_CONTENT.audio.customAudioSrc;

    if (customSrc && customSrc.trim() !== "") {
      try {
        this.htmlAudio = new Audio(customSrc);
        this.htmlAudio.loop = true;
        this.htmlAudio.volume = 0.6;
        await this.htmlAudio.play();
        this.usingCustomAudio = true;
        this.isPlaying = true;
        this.updateUI();
        return;
      } catch (err) {
        console.warn("Could not play custom audio, falling back to ambient synth:", err);
      }
    }

    // Built-in procedural ambient synth
    this.startSynth();
  }

  /**
   * Procedural Ambient Synth using Web Audio API
   * Generates a warm, dreamy chord progression with gentle arpeggio notes.
   */
  startSynth() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }

      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }

      // Master Gain for smooth volume transitions
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.setValueAtTime(0.001, this.audioContext.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.35, this.audioContext.currentTime + 2.0);

      // Master Lowpass Filter for that warm, cozy, lo-fi aesthetic
      const masterFilter = this.audioContext.createBiquadFilter();
      masterFilter.type = "lowpass";
      masterFilter.frequency.setValueAtTime(1400, this.audioContext.currentTime);
      masterFilter.Q.setValueAtTime(1.2, this.audioContext.currentTime);

      // Connect filter -> gain -> destination
      masterFilter.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);

      this.masterDestination = masterFilter;

      // Chord progression frequencies (Hz):
      // Chord 1: Cmaj9  (C3, G3, B3, E4, G4)
      // Chord 2: G/B    (B2, G3, D4, G4, B4)
      // Chord 3: Am9    (A2, E3, G3, C4, E4)
      // Chord 4: Fmaj7#11 (F2, C3, E3, A3, B3, E4)
      const chordProgressions = [
        [130.81, 196.00, 246.94, 329.63, 392.00], // Cmaj9
        [123.47, 196.00, 293.66, 392.00, 493.88], // G/B
        [110.00, 164.81, 196.00, 261.63, 329.63], // Am9
        [87.31,  130.81, 164.81, 220.00, 246.94, 329.63]  // Fmaj7
      ];

      let chordIndex = 0;
      let step = 0;

      const playChord = () => {
        if (!this.isPlaying || !this.audioContext) return;
        const currentChord = chordProgressions[chordIndex];
        const now = this.audioContext.currentTime;

        // Play root pad note with warm, soft envelope
        this.playPadTone(currentChord[0], now, 4.0);
        if (currentChord[1]) {
          this.playPadTone(currentChord[1], now + 0.1, 3.8);
        }

        chordIndex = (chordIndex + 1) % chordProgressions.length;
      };

      const playArpNote = () => {
        if (!this.isPlaying || !this.audioContext) return;
        const currentChord = chordProgressions[chordIndex === 0 ? chordProgressions.length - 1 : chordIndex - 1];
        const note = currentChord[step % currentChord.length];
        const now = this.audioContext.currentTime;

        // Occasional gentle music box / kalimba chime
        if (Math.random() > 0.2) {
          this.playBellTone(note * (Math.random() > 0.6 ? 2 : 1), now, 2.0);
        }

        step++;
      };

      this.isPlaying = true;
      this.updateUI();

      // Trigger initial chord immediately
      playChord();

      // Recurring timer for chord changes (every 4.5 seconds)
      this.chordTimer = setInterval(playChord, 4500);

      // Recurring timer for soft chimes/arpeggio (every 900ms)
      this.arpTimer = setInterval(playArpNote, 900);

    } catch (e) {
      console.error("Web Audio initialization error:", e);
    }
  }

  playPadTone(freq, startTime, duration) {
    if (!this.audioContext || !this.masterDestination) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.08, startTime + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterDestination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  playBellTone(freq, startTime, duration) {
    if (!this.audioContext || !this.masterDestination) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    // Triangle or sine with harmonic warmth
    osc.type = Math.random() > 0.5 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.04, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterDestination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  stopSynth() {
    if (this.chordTimer) clearInterval(this.chordTimer);
    if (this.arpTimer) clearInterval(this.arpTimer);
    if (this.gainNode && this.audioContext) {
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioContext.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.6);
    }
    this.isPlaying = false;
    this.updateUI();
  }

  toggle() {
    if (this.usingCustomAudio && this.htmlAudio) {
      if (this.isPlaying) {
        this.htmlAudio.pause();
        this.isPlaying = false;
      } else {
        this.htmlAudio.play();
        this.isPlaying = true;
      }
      this.updateUI();
      return;
    }

    if (this.isPlaying) {
      this.stopSynth();
    } else {
      this.startSynth();
    }
  }

  updateUI() {
    if (!this.toggleBtn) return;
    const waveIcon = this.toggleBtn.querySelector(".audio-waves");
    const label = this.toggleBtn.querySelector(".audio-status-label");

    if (this.isPlaying) {
      this.toggleBtn.classList.add("playing");
      this.toggleBtn.setAttribute("aria-label", "Pause Music");
      if (waveIcon) waveIcon.classList.add("active");
      if (label) label.textContent = "Music: Playing";
    } else {
      this.toggleBtn.classList.remove("playing");
      this.toggleBtn.setAttribute("aria-label", "Play Music");
      if (waveIcon) waveIcon.classList.remove("active");
      if (label) label.textContent = "Music: Paused";
    }
  }
}

// Global instance
window.audioController = null;
document.addEventListener("DOMContentLoaded", () => {
  window.audioController = new AudioController();
});
