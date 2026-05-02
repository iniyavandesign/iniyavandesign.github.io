/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "bottom",
  distance: "20px",
  duration: 1000,
  delay: 100,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  reset: false
});

// Reveal components
sr.reveal('.hero-title-large', { delay: 200, distance: '40px' });
sr.reveal('.hero-subtitle', { delay: 400 });
sr.reveal('.big-card-wrapper', { interval: 200, distance: '40px' });
sr.reveal('section', { interval: 100, distance: '30px' });

/* CUSTOM CURSOR ANIMATION */
const cursorDot = document.createElement('div');
const cursorOutline = document.createElement('div');

cursorDot.className = 'cursor-dot';
cursorOutline.className = 'cursor-outline';

document.body.appendChild(cursorDot);
document.body.appendChild(cursorOutline);

window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Animate the outline to follow with delay
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Hover effect for links and buttons
const updateInteractiveElements = () => {
  const interactiveElements = document.querySelectorAll('a, button, .big-card-wrapper, .custom-btn, .out-custom-btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('mouseleave'));
  });
};

updateInteractiveElements();

// Re-run on dynamic changes if any
window.addEventListener('load', () => {
  updateInteractiveElements();

  // Trigger name underline animation after hero reveals
  setTimeout(() => {
    const name = document.querySelector('.name-highlight');
    if (name) name.classList.add('revealed');
  }, 900);

  // Auto-calculate years of experience
  // Career start: July 1, 2019 — increments every July 1st
  const START_DATE = new Date(2019, 6, 1); // Month is 0-indexed: 6 = July
  const today = new Date();

  let years = today.getFullYear() - START_DATE.getFullYear();

  // Only count this year's anniversary if we've passed July 1
  const thisYearAnniversary = new Date(today.getFullYear(), 6, 1);
  if (today < thisYearAnniversary) {
    years -= 1;
  }

  // Update all .exp-years elements
  document.querySelectorAll('.exp-years').forEach(el => {
    el.textContent = years;
  });
});

/* WAVE SCROLL ANIMATION */
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const waves = document.querySelectorAll('.parallax > use');
  const wavesContainer = document.querySelector('.waves-container');
  
  if (wavesContainer) {
      // Subtle vertical shift of the whole wave container
      wavesContainer.style.transform = `translateY(${scrolled * 0.05}px)`;
  }

  waves.forEach((wave, index) => {
    // Different speed for each wave layer for parallax effect
    const speed = (index + 1) * 0.15;
    const xOffset = (scrolled * speed) % 100;
    // Update the x attribute for the SVG use element
    wave.setAttribute('x', 48 + xOffset);
  });
});