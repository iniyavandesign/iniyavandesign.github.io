/* ════════════════════════════════════════════════════
   INIYAVAN DESIGN — MAIN.JS
   ════════════════════════════════════════════════════ */

/* ── CUSTOM CURSOR ─────────────────────────────── */
const dot  = document.querySelector('.c-dot');
const ring = document.querySelector('.c-ring');

if (dot && ring) {
  window.addEventListener('mousemove', (e) => {
    dot.style.left  = `${e.clientX}px`;
    dot.style.top   = `${e.clientY}px`;
    ring.animate(
      { left: `${e.clientX}px`, top: `${e.clientY}px` },
      { duration: 450, fill: 'forwards' }
    );
  });

  document.querySelectorAll('a, button, .project-row, .btn-primary-dark, .btn-outline-dark').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ── SCROLL REVEAL ─────────────────────────────── */
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '24px',
    duration: 900,
    delay: 80,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: false
  });

  sr.reveal('.hero-badge',   { delay: 100 });
  sr.reveal('.hero-heading', { delay: 200, distance: '40px' });
  sr.reveal('.hero-sub',     { delay: 350 });
  sr.reveal('.hero-stats',   { delay: 420 });
  sr.reveal('.hero-actions', { delay: 520 });
  sr.reveal('.skills-ticker',{ delay: 650, origin: 'top', distance: '0px', opacity: 0 });

  // Projects & About
  sr.reveal('.project-row',  { interval: 150, distance: '30px' });
  sr.reveal('.about-heading',{ delay: 100, distance: '32px' });
  sr.reveal('.about-img',    { delay: 200, scale: 0.95 });
  sr.reveal('.about-body',   { interval: 100 });
  sr.reveal('.about-skills', { delay: 200 });
  sr.reveal('.about-actions',{ delay: 300 });

  // Case Study Components
  sr.reveal('.cs-title',     { delay: 100, distance: '40px' });
  sr.reveal('.cs-subtitle',  { delay: 200 });
  sr.reveal('.meta-item',    { interval: 80, delay: 300 });
  sr.reveal('.cs-hero-img',  { delay: 400, scale: 0.98, distance: '0px' });
  sr.reveal('.stat-card',    { interval: 150 });
  sr.reveal('.user-card',    { interval: 150 });
  sr.reveal('.problem-box',  { delay: 100 });
  sr.reveal('.screen-mockup',{ delay: 150, distance: '40px' });

  sr.reveal('.footer-cta',   { delay: 100 });
}

/* ── NAME HIGHLIGHT ────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.name-hl').forEach(el => el.classList.add('revealed'));
  }, 1000);

  /* ── AUTO EXPERIENCE YEARS ───────────────────── */
  // Career start: July 1, 2019. Increments every July 1.
  const START = new Date(2019, 6, 1); // 6 = July (0-indexed)
  const now   = new Date();
  let years   = now.getFullYear() - START.getFullYear();
  const anniversary = new Date(now.getFullYear(), 6, 1);
  if (now < anniversary) years--;

  document.querySelectorAll('.exp-years').forEach(el => {
    el.textContent = years;
  });

  /* ── COPYRIGHT YEAR ──────────────────────────── */
  const yearEl = document.getElementById('copy-year');
  if (yearEl) yearEl.textContent = now.getFullYear();

  /* ── ROTATING GREETING ────────────────────────── */
  const greetings = [
    { text: "வணக்கம்", lang: "ta" }, // Tamil
    { text: "Hello", lang: "en" },   // English
    { text: "नमस्ते", lang: "hi" }   // Hindi
  ];
  
  const greetingEl = document.getElementById('rotating-greeting');
  if (greetingEl) {
    let index = 0;
    
    const rotate = () => {
      // Phase 1: Fade out
      greetingEl.classList.add('greeting-fade-out');
      
      setTimeout(() => {
        // Phase 2: Update text and fade in
        index = (index + 1) % greetings.length;
        const current = greetings[index];
        greetingEl.textContent = current.text;
        
        // Apply font-tamil only for Tamil language
        if (current.lang === 'ta') {
          greetingEl.classList.add('font-tamil');
        } else {
          greetingEl.classList.remove('font-tamil');
        }

        greetingEl.classList.remove('greeting-fade-out');
        greetingEl.classList.add('greeting-fade-in');
        
        // Phase 3: Cleanup for next cycle
        setTimeout(() => {
          greetingEl.classList.remove('greeting-fade-in');
        }, 400);
      }, 400);
    };

    // Start rotating after initial delay
    setInterval(rotate, 3000);
  }
});

/* ── WAVE SCROLL PARALLAX ──────────────────────── */
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const waves = document.querySelectorAll('.parallax > use');

  waves.forEach((wave, i) => {
    const speed  = (i + 1) * 0.14;
    const offset = (scrolled * speed) % 100;
    wave.setAttribute('x', 48 + offset);
  });

  const wavesBg = document.querySelector('.waves-bg');
  if (wavesBg) {
    wavesBg.style.transform = `translateY(${scrolled * 0.04}px)`;
  }

  lastScrollY = scrolled;
}, { passive: true });

/* ── NAV SCROLL STYLE ──────────────────────────── */
const nav = document.querySelector('.nav-bar');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 20
      ? 'rgba(0,0,0,0.12)'
      : 'rgba(232,232,232,1)';
  }, { passive: true });
}
