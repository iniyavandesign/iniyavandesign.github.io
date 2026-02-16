/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "bottom",
  distance: "30px",
  duration: 1000,
  delay: 200,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  reset: false
});

// Header
sr.reveal('header', {
  origin: 'top',
  distance: '20px',
  delay: 100
});

// Hero Title
sr.reveal('.one', {
  delay: 300,
  distance: '40px',
  origin: 'bottom',
  scale: 0.95
});

// Case Studies
sr.reveal('.big-card-wrapper', {
  interval: 200,
  distance: '50px',
  origin: 'bottom',
  viewFactor: 0.2
});

// About Me
sr.reveal('.four', {
  origin: 'right',
  distance: '60px',
  duration: 1200,
  delay: 100
});

sr.reveal('.two', {
  interval: 100,
  origin: 'bottom',
  distance: '30px'
});

sr.reveal('.five', {
  delay: 100,
  distance: '20px'
});

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
const interactiveElements = document.querySelectorAll('a, button, .case-card, .big-card-wrapper');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('hovering');
  });
});