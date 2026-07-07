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
    var msgOk = form.dataset.ok || 'Thank you! Your message has been sent.';
    var msgErr = form.dataset.err || 'An error occurred.';
    var msgErrConn = form.dataset.errconn || 'A connection error occurred.';
    var msgSending = form.dataset.sending || 'Sending...';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-result');
      var btn = form.querySelector('button[type="submit"]');
      var originalLabel = btn ? btn.textContent : '';

      if (btn) { btn.disabled = true; btn.textContent = msgSending; }
      if (note) { note.textContent = ''; note.style.color = ''; }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            if (note) {
              note.textContent = msgOk;
              note.style.color = 'var(--gold-bright)';
            }
          } else {
            response.json().then(function (data) {
              var msg = (data && data.errors && data.errors.length)
                ? data.errors.map(function (er) { return er.message; }).join(', ')
                : msgErr;
              if (note) { note.textContent = msg; note.style.color = '#d98c8c'; }
            }).catch(function () {
              if (note) { note.textContent = msgErr; note.style.color = '#d98c8c'; }
            });
          }
        })
        .catch(function () {
          if (note) { note.textContent = msgErrConn; note.style.color = '#d98c8c'; }
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
        });
    });
  }
});
