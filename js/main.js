/* ============================================
   Nasz Dentysta — Main JS
   Language switcher, mobile menu, FAQ, scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Language ---
  const html = document.documentElement;
  const savedLang = localStorage.getItem('language') || 'pl';
  setLanguage(savedLang);

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = this.getAttribute('data-lang');
      setLanguage(lang);
      localStorage.setItem('language', lang);
    });
  });

  function setLanguage(lang) {
    html.setAttribute('lang', lang);
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    var titles = {
      'pl': 'Nasz Dentysta — Dentysta Zielona Góra | Od 1989 roku',
      'ua': 'Nasz Dentysta — Стоматолог Зелена Гура | З 1989 року'
    };
    document.title = titles[lang] || titles['pl'];
  }

  // --- Mobile Menu ---
  var menuBtn = document.querySelector('.mobile-menu-btn');
  var navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      menuBtn.innerHTML = navLinks.classList.contains('active') ? '&#x2715;' : '&#9776;';
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '&#9776;';
      });
    });
  }

  // --- Header scroll ---
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var wasActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('active'); });
      if (!wasActive) item.classList.add('active');
    });
  });

  // --- Scroll animations ---
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(function (el) {
    observer.observe(el);
  });

  // --- Sticky CTA visibility ---
  var stickyCta = document.querySelector('.sticky-cta');
  var heroSection = document.querySelector('.hero');
  var footerEl = document.querySelector('.footer');
  if (stickyCta && heroSection) {
    window.addEventListener('scroll', function () {
      var heroBottom = heroSection.getBoundingClientRect().bottom;
      var footerTop = footerEl ? footerEl.getBoundingClientRect().top : Infinity;
      var show = heroBottom < 0 && footerTop > window.innerHeight;
      stickyCta.style.display = show ? 'block' : 'none';
    }, { passive: true });
  }

  // --- Cookie Consent ---
  var consent = localStorage.getItem('cookieConsent');
  var banner = document.getElementById('cookieBanner');
  if (!consent && banner) {
    setTimeout(function () { banner.classList.add('show'); }, 1200);
  } else if (consent === 'accepted' && typeof gtag === 'function') {
    gtag('consent', 'update', { 'analytics_storage': 'granted' });
  }

  window.acceptCookies = function () {
    localStorage.setItem('cookieConsent', 'accepted');
    if (banner) banner.classList.remove('show');
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }
  };
  window.declineCookies = function () {
    localStorage.setItem('cookieConsent', 'declined');
    if (banner) banner.classList.remove('show');
  };

  // --- UA Banner dismiss ---
  var uaBanner = document.querySelector('.ua-banner');
  if (uaBanner) {
    var dismissed = localStorage.getItem('uaBannerDismissed');
    if (dismissed) uaBanner.style.display = 'none';
    uaBanner.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        setLanguage('ua');
        localStorage.setItem('language', 'ua');
      }
    });
    var closeBtn = uaBanner.querySelector('.ua-banner-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        uaBanner.style.display = 'none';
        localStorage.setItem('uaBannerDismissed', '1');
      });
    }
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Contact form ---
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      fetch(form.action, { method: 'POST', body: data })
        .then(function () {
          form.reset();
          var success = document.getElementById('formSuccess');
          if (success) success.style.display = 'block';
          if (typeof gtag === 'function') {
            gtag('event', 'form_submit', { event_category: 'contact' });
          }
        })
        .catch(function () {
          alert('Błąd wysyłania. Zadzwoń: 68 320 50 66');
        });
    });
  }
});
