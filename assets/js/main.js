async function injectComponent(mountSelector, url) {
  const mount = document.querySelector(mountSelector);
  if (!mount) return;

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`Failed to load component: ${url}`);
    return;
  }
  mount.innerHTML = await res.text();
}

function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;

  const link = document.querySelector(`nav a[data-nav="${page}"]`);
  if (link) link.classList.add("active");
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        }
      });
    },
    { root: null, threshold: 0.12 }
  );

  els.forEach(el => obs.observe(el));
}

document.addEventListener("DOMContentLoaded", async () => {
  await injectComponent("#nav", "components/nav.html");
  setActiveNav();
  initReveal();

  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
});
