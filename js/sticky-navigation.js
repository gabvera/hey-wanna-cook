// Sticky navigation

const sectionHero = document.querySelector('#hero')
const header = sectionHero.querySelector('.header')

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent, "ent")
    
    if (ent.isIntersecting === false) {
      header.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      header.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

obs.observe(sectionHero);

//////