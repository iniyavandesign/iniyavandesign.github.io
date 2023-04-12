/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2500,
    delay: 400,
  });
  
  sr.reveal(`.profile__border`);
  sr.reveal(`.header_section`, { delay: 500 });
  sr.reveal(`.work`, { delay: 600 });
  sr.reveal(`.work_title`, { delay: 700 });
  sr.reveal(`.picture`, { delay: 700 });
  sr.reveal(`.hire`, { delay: 800 });
  sr.reveal(`.filters__content`, { delay: 900 });
  sr.reveal(`.filters`, { delay: 1000 });