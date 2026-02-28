// Reveal elements on scroll using IntersectionObserver

(() => {
  const els = document.querySelectorAll(".reveal");

  // If browser doesn't support it, just show everything.
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target); // animate once (Apple-like)
        }
      });
    },
    { root: null, threshold: 0.12 }
  );

  els.forEach((el) => obs.observe(el));
})();
