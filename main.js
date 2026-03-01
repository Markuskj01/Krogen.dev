/* =============================================================================
   main.js — Portfolio of Markus Krogen Jensen
   =============================================================================
   Contents:
   1. Language switcher  (NO / EN, persisted in localStorage)
   2. Navigation scroll shadow
   ============================================================================= */


/* =============================================================================
   1. LANGUAGE SWITCHER
   Supports Norwegian Bokmål (default) and English.

   HTML conventions expected in markup:
     [data-no] [data-en]  — leaf text elements; textContent is swapped on toggle.
     .lang-no / .lang-en  — block elements with inner HTML; toggled via `hidden`.
     .lang-toggle          — button(s) in the nav that trigger the switch.

   Preference is stored in localStorage under the key "lang".
   ============================================================================= */

(function () {
  'use strict';

  var DEFAULT_LANG = 'no';

  /* ------------------------------------------------------------------
     applyLanguage(lang)
     Sets all translatable content on the current page to the given
     language ('no' or 'en') and persists the choice.
  ------------------------------------------------------------------ */
  function applyLanguage(lang) {

    /* Update the document language attribute for accessibility / SEO */
    document.documentElement.lang = (lang === 'no') ? 'nb' : 'en';

    /* --- Swap text on leaf elements with data-no / data-en ---------- */
    document.querySelectorAll('[data-no][data-en]').forEach(function (el) {
      /* Only swap textContent — never touch elements that contain child nodes
         beyond a single text node, those use the .lang-no/.lang-en pattern */
      el.textContent = (lang === 'no') ? el.dataset.no : el.dataset.en;
    });

    /* --- Show / hide HTML blocks ------------------------------------ */
    document.querySelectorAll('.lang-no').forEach(function (el) {
      el.hidden = (lang !== 'no');
    });
    document.querySelectorAll('.lang-en').forEach(function (el) {
      el.hidden = (lang !== 'en');
    });

    /* --- Update toggle button label ---------------------------------
       The button always shows the OTHER language (what clicking switches TO) */
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = (lang === 'no') ? 'EN' : 'NO';
      btn.setAttribute(
        'aria-label',
        (lang === 'no') ? 'Switch to English' : 'Bytt til norsk'
      );
    });

    /* --- Persist preference ---------------------------------------- */
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {
      /* localStorage unavailable (e.g. private browsing with strict settings) */
    }
  }

  /* ------------------------------------------------------------------
     getStoredLang()
     Returns the persisted language preference, or the default.
  ------------------------------------------------------------------ */
  function getStoredLang() {
    try {
      return localStorage.getItem('lang') || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  /* ------------------------------------------------------------------
     init()
     Applies the stored language on page load and wires up the toggle.
  ------------------------------------------------------------------ */
  function init() {
    var lang = getStoredLang();
    applyLanguage(lang);

    /* Wire click handlers on every .lang-toggle button on the page */
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = getStoredLang();
        applyLanguage(current === 'no' ? 'en' : 'no');
      });
    });
  }

  /* Run after DOM is parsed */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());


/* =============================================================================
   2. NAVIGATION — Scroll shadow
   Adds .scrolled to .nav once the user scrolls past 20px, which triggers
   the drop-shadow defined in CSS.
   ============================================================================= */

(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  if (!nav) return;

  function onScroll() {
    /* classList.toggle(name, force) — cleaner than add/remove */
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* Run once immediately so state is correct on load */

}());
