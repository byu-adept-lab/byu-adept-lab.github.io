/* Mobile nav toggle. The only script on the site; the menu is a plain <ul>
   that CSS reveals at wide viewports, so nothing breaks without JS. */
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('site-menu');
  if (!toggle || !menu) {
    return;
  }

  function close() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    menu.classList.toggle('is-open', !isOpen);
  });

  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
      close();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      close();
      toggle.focus();
    }
  });
})();
