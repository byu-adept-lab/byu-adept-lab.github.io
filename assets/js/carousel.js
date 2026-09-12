/* Paging for every carousel on the site: the research-area tiles and the hero
 * and paper-figure slideshows on the homepage, the figure slideshow and area
 * tiles on /research/, the student tiles on /people/. Each [data-carousel] on
 * the page gets its own independent instance.
 *
 * The markup is a horizontally scrolling, snapping track that already holds
 * every tile, so with JS off all of them stay reachable by scroll, keyboard
 * and screen reader. This script only adds the paging controls that the
 * .is-active class reveals.
 *
 * The paging idiom follows twkillian.github.io/assets/js/carousel.js — move one
 * page of cards at a time, cycle past the ends, arrows plus indicators. Here the
 * move is a native scroll rather than a transform, which is what keeps the no-JS
 * case working and nothing hidden from assistive tech.
 *
 * A page is one column of tiles wide by however many tiles the CSS grid stacks
 * in a column: the research carousel pages three single-row tiles at a time, the
 * student carousel pages one column of stacked tiles. Both the column width and
 * the row count are measured from the DOM, so CSS keeps owning the breakpoints
 * and the script never needs to know them.
 *
 * Advancing on its own is opt-in per instance through data-carousel-autoplay and
 * off for everything that does not carry it — see initAutoplay below.
 */
(function () {
  'use strict';

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function debounce(fn, wait) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, wait);
    };
  }

  function Carousel(root) {
    this.root = root;
    this.viewport = root.querySelector('[data-carousel-viewport]');
    this.track = root.querySelector('[data-carousel-track]');
    this.prevBtn = root.querySelector('[data-carousel-prev]');
    this.nextBtn = root.querySelector('[data-carousel-next]');
    this.dotsHost = root.querySelector('[data-carousel-dots]');
    if (!this.viewport || !this.track) return;

    this.cards = Array.prototype.slice.call(this.track.children);
    this.count = this.cards.length;
    if (this.count === 0) return;

    this.pages = 0;

    if (this.prevBtn) this.prevBtn.addEventListener('click', this.pageByHand.bind(this, -1));
    if (this.nextBtn) this.nextBtn.addEventListener('click', this.pageByHand.bind(this, 1));
    this.root.addEventListener('keydown', this.onKeydown.bind(this));

    var self = this;
    this.viewport.addEventListener('scroll', debounce(function () {
      self.syncDots();
    }, 90));
    window.addEventListener('resize', debounce(function () {
      self.layout();
    }, 150));

    this.layout();
    this.initAutoplay();
  }

  /* Card width plus gap, measured from the DOM so CSS owns the breakpoints. */
  Carousel.prototype.step = function () {
    var first = this.cards[0];
    if (!first) return 0;
    var styles = window.getComputedStyle(this.track);
    var gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return first.getBoundingClientRect().width + gap;
  };

  Carousel.prototype.perView = function () {
    var step = this.step();
    if (!step) return 1;
    return Math.max(1, Math.round(this.viewport.clientWidth / step));
  };

  /* Tiles stacked in one column, also measured rather than configured. With
     grid-auto-flow: column the tiles of a column are consecutive in the DOM and
     share a left edge, so counting from the first one until the edge moves gives
     the rows per page — 1 for a single-row track, 3 for the student grid. */
  Carousel.prototype.rows = function () {
    var first = this.cards[0];
    if (!first) return 1;

    var left = first.getBoundingClientRect().left;
    var rows = 1;
    for (var i = 1; i < this.count; i++) {
      if (Math.abs(this.cards[i].getBoundingClientRect().left - left) > 1) break;
      rows++;
    }
    return rows;
  };

  Carousel.prototype.maxScroll = function () {
    return Math.max(0, this.viewport.scrollWidth - this.viewport.clientWidth);
  };

  /* Controls appear only when there is somewhere to page to. */
  Carousel.prototype.layout = function () {
    var active = this.maxScroll() > 1;
    this.root.classList.toggle('is-active', active);
    this.root.classList.toggle('is-static', !active);
    this.pages = active ? Math.ceil(this.count / (this.perView() * this.rows())) : 0;
    this.renderDots();
    this.syncDots();
    /* A resize can leave nothing to page to, which is also nothing to advance
       through. No-op unless this instance opted into autoplay. */
    this.syncAutoplay();
  };

  Carousel.prototype.scrollToLeft = function (left) {
    if (!prefersReducedMotion() && this.viewport.scrollTo) {
      this.viewport.scrollTo({ left: left, behavior: 'smooth' });
    } else {
      this.viewport.scrollLeft = left;
    }
  };

  /* One page forward or back, cycling at the ends. */
  Carousel.prototype.page = function (direction) {
    var max = this.maxScroll();
    if (max <= 1) return;

    var current = this.viewport.scrollLeft;
    var distance = this.step() * this.perView();
    var target;

    if (direction > 0) {
      target = current >= max - 1 ? 0 : Math.min(current + distance, max);
    } else {
      target = current <= 1 ? max : Math.max(current - distance, 0);
    }

    this.scrollToLeft(target);
  };

  Carousel.prototype.goToPage = function (index) {
    this.scrollToLeft(Math.min(index * this.step() * this.perView(), this.maxScroll()));
  };

  /* Every route by which the reader pages deliberately — the arrows, the arrow
     keys, an indicator — comes through one of these two, so "the user has taken
     over" is decided in one place rather than at each call site. */
  Carousel.prototype.pageByHand = function (direction) {
    this.abandonAutoplay();
    this.page(direction);
  };

  Carousel.prototype.goToPageByHand = function (index) {
    this.abandonAutoplay();
    this.goToPage(index);
  };

  Carousel.prototype.renderDots = function () {
    if (!this.dotsHost || this.dotsHost.childElementCount === this.pages) return;

    this.dotsHost.innerHTML = '';
    for (var i = 0; i < this.pages; i++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', 'Page ' + (i + 1) + ' of ' + this.pages);
      dot.addEventListener('click', this.goToPageByHand.bind(this, i));
      this.dotsHost.appendChild(dot);
    }
  };

  Carousel.prototype.syncDots = function () {
    if (!this.dotsHost || !this.dotsHost.childElementCount) return;

    var pageWidth = this.step() * this.perView();
    var active = pageWidth ? Math.round(this.viewport.scrollLeft / pageWidth) : 0;
    if (active > this.pages - 1) active = this.pages - 1;

    for (var i = 0; i < this.dotsHost.children.length; i++) {
      if (i === active) {
        this.dotsHost.children[i].setAttribute('aria-current', 'true');
      } else {
        this.dotsHost.children[i].removeAttribute('aria-current');
      }
    }
  };

  /* Arrow keys page, but only from the track or the arrows themselves, so they
     keep their normal meaning when focus is on a link inside a tile. */
  Carousel.prototype.onKeydown = function (event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

    var target = event.target;
    var fromControls = target.closest && target.closest('.carousel-arrow, .carousel-dot');
    if (target !== this.viewport && !fromControls) return;

    event.preventDefault();
    this.pageByHand(event.key === 'ArrowLeft' ? -1 : 1);
  };

  /* === Advancing on its own ================================================
     Opt in per instance with data-carousel-autoplay="<milliseconds>" on the
     root. Without that attribute nothing below binds a listener or starts a
     timer, so the research-area tiles and the student carousel — which are
     navigation, not display — stay entirely manual. .carousel-solo does not
     imply it either: the hero slideshow is solo and still manual until someone
     adds the attribute to it.

     The timer only runs while nobody appears to be reading. It never runs under
     prefers-reduced-motion; it stops while the pointer or the focus is inside
     the carousel, and while the tab is hidden; and paging by hand retires it,
     after which only the pause/play control starts it again, because that is
     the reader asking for it rather than the page overriding them.

     Slide changes are deliberately not announced. A live region firing every
     twelve seconds would interrupt a screen reader mid-sentence; the indicators
     already carry aria-current for anyone who goes looking. */
  var AUTOPLAY_DEFAULT_MS = 12000;
  var AUTOPLAY_MIN_MS = 1000;
  var PAUSE_GLYPH = '\u25AE\u25AE';
  var PLAY_GLYPH = '\u25B7';

  Carousel.prototype.initAutoplay = function () {
    var attr = this.root.getAttribute('data-carousel-autoplay');
    if (attr === null) return;

    var ms = parseInt(attr, 10);
    this.autoplay = {
      /* One flag for "the reader wants this running". Manual paging and the
         pause button both clear it; only the play button sets it back. */
      wants: true,
      delay: isNaN(ms) || ms < AUTOPLAY_MIN_MS ? AUTOPLAY_DEFAULT_MS : ms,
      timer: null,
      hovered: false,
      focused: false,
      shown: null
    };
    this.toggleBtn = this.root.querySelector('[data-carousel-toggle]');

    var self = this;
    var sync = function () { self.syncAutoplay(); };

    this.root.addEventListener('mouseenter', function () {
      self.autoplay.hovered = true;
      sync();
    });
    this.root.addEventListener('mouseleave', function () {
      self.autoplay.hovered = false;
      sync();
    });

    /* focusin/focusout rather than focus/blur: these bubble, so tabbing to a
       paper link inside a slide counts as focus being in the carousel. */
    this.root.addEventListener('focusin', function () {
      self.autoplay.focused = true;
      sync();
    });
    this.root.addEventListener('focusout', function (event) {
      if (self.root.contains(event.relatedTarget)) return;
      self.autoplay.focused = false;
      sync();
    });

    document.addEventListener('visibilitychange', sync);

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', function () {
        self.autoplay.wants = !self.autoplay.wants;
        sync();
      });
    }

    /* Someone can turn reduced motion on while the page is open. */
    var motion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion) {
      if (motion.addEventListener) motion.addEventListener('change', sync);
      else if (motion.addListener) motion.addListener(sync);
    }

    this.syncAutoplay();
  };

  /* Manual paging retires the timer for the rest of the page's life. */
  Carousel.prototype.abandonAutoplay = function () {
    if (!this.autoplay || !this.autoplay.wants) return;
    this.autoplay.wants = false;
    this.syncAutoplay();
  };

  /* Restarts or clears the timer from the current state, and keeps the control
     telling the truth about it. Cheap enough to call on every event. */
  Carousel.prototype.syncAutoplay = function () {
    var a = this.autoplay;
    if (!a) return;

    /* Reduced motion disables it outright rather than advancing without the
       animation: the objection is to the movement, not to the easing. */
    var possible = !prefersReducedMotion() && this.maxScroll() > 1;
    var running = possible && a.wants && !a.hovered && !a.focused && !document.hidden;

    if (a.timer) {
      clearInterval(a.timer);
      a.timer = null;
    }
    if (running) {
      var self = this;
      a.timer = setInterval(function () { self.page(1); }, a.delay);
    }

    /* Offering to pause something that cannot move is just clutter, so the
       control appears only while advancing is possible at all. */
    this.root.classList.toggle('has-autoplay', possible);

    if (this.toggleBtn && a.shown !== a.wants) {
      a.shown = a.wants;
      this.toggleBtn.setAttribute('aria-label',
        a.wants ? 'Pause the slideshow' : 'Play the slideshow');
      var glyph = this.toggleBtn.querySelector('span') || this.toggleBtn;
      glyph.textContent = a.wants ? PAUSE_GLYPH : PLAY_GLYPH;
    }
  };

  function init() {
    var roots = document.querySelectorAll('[data-carousel]');
    for (var i = 0; i < roots.length; i++) {
      new Carousel(roots[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
