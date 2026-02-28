alert("main.js kjører");
async function injectComponent(mountSelector, url) {
  const mount = document.querySelector(mountSelector);
  if (!mount) {
    console.warn("Mount point not found:", mountSelector);
    return;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn("Failed to fetch:", url, res.status);
      return;
    }
    mount.innerHTML = await res.text();
  } catch (err) {
    console.error("Fetch error:", err);
  }
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

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => obs.observe(el));
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("main.js running");

  await injectComponent("#nav", "components/nav.html");

  console.log("nav after inject:", document.querySelector("#nav")?.innerHTML);

  setActiveNav();
  initReveal();

  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
});
