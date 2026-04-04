// ═══════════════════════════════════
//  PLEXEN — SCRIPT.JS
// ═══════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {

  // 1. NAVBAR STICKY
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // 2. BURGER MENU
  var burger = document.getElementById('burger');
  var navLiens = document.getElementById('navLiens');
  if (burger && navLiens) {
    burger.addEventListener('click', function () {
      navLiens.classList.toggle('ouvert');
    });
    navLiens.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLiens.classList.remove('ouvert');
      });
    });
  }

  // 3. HERO SLIDER
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dot');
  var idx = 0;
  var timer;

  function goTo(n) {
    slides[idx].classList.remove('actif');
    dots[idx] && dots[idx].classList.remove('actif');
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add('actif');
    dots[idx] && dots[idx].classList.add('actif');
  }

  function auto() { timer = setInterval(function () { goTo(idx + 1); }, 5500); }
  function stop() { clearInterval(timer); }

  if (slides.length) {
    auto();
    var nb = document.getElementById('nextBtn');
    var pb = document.getElementById('prevBtn');
    if (nb) nb.addEventListener('click', function () { stop(); goTo(idx + 1); auto(); });
    if (pb) pb.addEventListener('click', function () { stop(); goTo(idx - 1); auto(); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { stop(); goTo(i); auto(); });
    });
  }

  // 4. SCROLL ANIMATIONS
  var animEls = document.querySelectorAll('[data-anime]');
  function checkAnime() {
    animEls.forEach(function (el, i) {
      if (el.getBoundingClientRect().top < window.innerHeight - 80) {
        var delay = el.getAttribute('data-delai') || 0;
        setTimeout(function () { el.classList.add('visible'); }, delay * 120);
      }
    });
  }
  checkAnime();
  window.addEventListener('scroll', checkAnime, { passive: true });

  // 5. COMPTEURS
  var compteurs = document.querySelectorAll('.chiffre-num');
  var done = false;
  function runCompteurs() {
    if (done || !compteurs.length) return;
    var rect = compteurs[0].getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      done = true;
      compteurs.forEach(function (el) {
        var cible = parseInt(el.getAttribute('data-cible'), 10);
        var step = cible / 80;
        var cur = 0;
        var t = setInterval(function () {
          cur += step;
          if (cur >= cible) { el.textContent = cible; clearInterval(t); }
          else { el.textContent = Math.floor(cur); }
        }, 20);
      });
    }
  }
  window.addEventListener('scroll', runCompteurs, { passive: true });
  runCompteurs();

  // 6. ACTIVE LINK
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-liens a').forEach(function (a) {
    a.classList.toggle('actif', a.getAttribute('href') === page);
  });

});
