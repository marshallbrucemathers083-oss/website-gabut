/**
 * ==============================================================================
 * BACKGROUND PARTICLES SYSTEM (js/particles.js)
 * ==============================================================================
 * Renders subtle floating starlight / dust motes in the background canvas.
 * Lightweight, optimized for 60fps, responsive, and battery-friendly.
 * ==============================================================================
 */

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.numParticles = 45;
    this.animationId = null;

    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.init();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.4 - 0.1, // gently drift upwards
        glow: Math.random() > 0.5,
        hue: Math.random() > 0.5 ? 42 : 340 // warm golden amber or soft blush rose
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around edges
      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

      if (p.glow) {
        this.ctx.fillStyle = `hsla(${p.hue}, 85%, 75%, ${p.alpha})`;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = `hsla(${p.hue}, 90%, 70%, 0.6)`;
      } else {
        this.ctx.fillStyle = `rgba(255, 245, 230, ${p.alpha * 0.6})`;
        this.ctx.shadowBlur = 0;
      }

      this.ctx.fill();
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ParticleSystem("bg-particles");
});
