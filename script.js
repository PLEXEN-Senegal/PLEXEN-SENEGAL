// ═══════════════════════════════════════════
//  PLEXEN — SCRIPT.JS
//  Navbar sticky | Slider | Scroll animations | Compteurs
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. NAVBAR STICKY ──────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ── 2. MENU BURGER ────────────────────────
  const burger = document.getElementById('burger');
  const navLiens = document.getElementById('navLiens');
  if (burger && navLiens) {
    burger.addEventListener('click', function () {
      navLiens.classList.toggle('ouvert');
      burger.classList.toggle('ouvert');
    });
    // Fermer si on clique sur un lien
    navLiens.querySelectorAll('a').forEach(function (lien) {
      lien.addEventListener('click', function () {
        navLiens.classList.remove('ouvert');
        burger.classList.remove('ouvert');
      });
    });
  }

  // ── 3. SLIDER HERO ────────────────────────
  const diapos = document.querySelectorAll('.diapo');
  const points = document.querySelectorAll('.point');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let indexActuel = 0;
  let intervalleSlider;

  function afficherDiapo(index) {
    diapos.forEach(function (d) { d.classList.remove('actif-diapo'); });
    points.forEach(function (p) { p.classList.remove('actif-point'); });
    if (diapos[index]) {
      diapos[index].classList.add('actif-diapo');
      // Relancer les animations
      diapos[index].querySelectorAll('[data-anime]').forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(36px)';
        setTimeout(function () {
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 200);
      });
    }
    if (points[index]) points[index].classList.add('actif-point');
    indexActuel = index;
  }

  function diapoSuivante() {
    var suivant = (indexActuel + 1) % diapos.length;
    afficherDiapo(suivant);
  }

  function diapoPrecedente() {
    var precedent = (indexActuel - 1 + diapos.length) % diapos.length;
    afficherDiapo(precedent);
  }

  function demarrerAuto() {
    intervalleSlider = setInterval(diapoSuivante, 5000);
  }

  function arreterAuto() {
    clearInterval(intervalleSlider);
  }

  if (diapos.length > 0) {
    // Initialiser la première diapo
    afficherDiapo(0);
    demarrerAuto();

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        arreterAuto();
        diapoSuivante();
        demarrerAuto();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        arreterAuto();
        diapoPrecedente();
        demarrerAuto();
      });
    }
    points.forEach(function (point, i) {
      point.addEventListener('click', function () {
        arreterAuto();
        afficherDiapo(i);
        demarrerAuto();
      });
    });
  }

  // ── 4. ANIMATIONS AU SCROLL ───────────────
  var elementsAnimes = document.querySelectorAll('[data-anime]');

  function verifierVisibilite() {
    elementsAnimes.forEach(function (el, index) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        setTimeout(function () {
          el.classList.add('visible');
        }, index % 4 * 120); // décalage en cascade
      }
    });
  }

  // Vérifier au chargement
  verifierVisibilite();
  window.addEventListener('scroll', verifierVisibilite, { passive: true });

  // ── 5. COMPTEURS ANIMÉS ───────────────────
  var compteurs = document.querySelectorAll('.chiffre-num');
  var compteursLances = false;

  function animer(el, cible, duree) {
    var debut = 0;
    var increment = cible / (duree / 16);
    var timer = setInterval(function () {
      debut += increment;
      if (debut >= cible) {
        el.textContent = cible;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(debut);
      }
    }, 16);
  }

  function verifierCompteurs() {
    if (compteursLances) return;
    if (compteurs.length === 0) return;
    var rect = compteurs[0].getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      compteursLances = true;
      compteurs.forEach(function (el) {
        var cible = parseInt(el.getAttribute('data-cible'), 10);
        animer(el, cible, 2000);
      });
    }
  }

  window.addEventListener('scroll', verifierCompteurs, { passive: true });
  verifierCompteurs();

  // ── 6. ACTIVE LINK ────────────────────────
  var pageCourante = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-liens a').forEach(function (lien) {
    var href = lien.getAttribute('href');
    if (href === pageCourante) {
      document.querySelectorAll('.nav-liens a').forEach(function (l) { l.classList.remove('actif'); });
      lien.classList.add('actif');
    }
  });

});
