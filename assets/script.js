document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('nav.primary');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-result');
      if (note) {
        note.textContent = 'Mulțumim! Mesajul a fost pregătit — vă rugăm să ne scrieți direct la info@lca.md sau să ne sunați, formularul nu este conectat la un server.';
      }
    });
  }
});
