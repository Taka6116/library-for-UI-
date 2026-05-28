/* =====================================================================
   script-gsap.js — GSAP-style Scroll & Parallax Animations
   Pure vanilla JS (IntersectionObserver + requestAnimationFrame)
   ===================================================================== */
(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────────────── */
  function qs(s, c)  { return (c || document).querySelector(s); }
  function qsa(s, c) { return Array.from((c || document).querySelectorAll(s)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return Math.min(Math.max(v, lo), hi); }
  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
  function easeOutElastic(t) {
    return t === 0 ? 0 : t === 1 ? 1 :
      Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1;
  }

  /* ── 1. Scroll Scrub ─────────────────────────────────────────────
     An orb moves left-to-right based on scroll position through
     the demo card, like a GSAP scrub timeline.                      */
  function initScrollScrub() {
    var demos = qsa('.gsap-scrub-demo');
    if (!demos.length) return;
    demos.forEach(function (demo) {
      var orb   = demo.querySelector('.gsap-scrub-orb');
      var label = demo.querySelector('.gsap-scrub-label');
      var track = demo.querySelector('.gsap-scrub-track');
      if (!orb || !track) return;
      function update() {
        var rect = demo.getBoundingClientRect();
        var wh   = window.innerHeight;
        var p    = clamp((wh * 0.6 - rect.top) / (rect.height * 1.4), 0, 1);
        var maxX = track.offsetWidth - orb.offsetWidth - 4;
        orb.style.transform = 'translateX(' + (p * maxX) + 'px)';
        orb.style.background = 'hsl(' + (200 + p * 160) + ',85%,62%)';
        orb.style.boxShadow = '0 0 ' + (12 + p * 16) + 'px hsl(' + (200 + p * 160) + ',85%,62%)';
        if (label) label.textContent = Math.round(p * 100) + '%';
      }
      window.addEventListener('scroll', update, { passive: true });
      update();
    });
  }

  /* ── 2. Stagger Cascade ──────────────────────────────────────────
     Cards fly in one after another with elastic easing.             */
  function initStaggerCascade() {
    var groups = qsa('.gsap-cascade-group');
    if (!groups.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var items = qsa('.gsap-cascade-card', entry.target);
        items.forEach(function (item, i) {
          setTimeout(function () { item.classList.add('gsap-c-in'); }, i * 75);
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    groups.forEach(function (g) { obs.observe(g); });
  }

  /* ── 3. Float Orbs ───────────────────────────────────────────────
     Shapes float continuously with sine-wave offset per shape.      */
  function initFloatOrbs() {
    var orbs = qsa('.gsap-float-orb');
    if (!orbs.length) return;
    var t0 = performance.now();
    function frame(now) {
      var t = (now - t0) * 0.001;
      orbs.forEach(function (orb, i) {
        var ph  = parseFloat(orb.dataset.phase  || i * 1.1);
        var amp = parseFloat(orb.dataset.amp    || 14);
        var spd = parseFloat(orb.dataset.speed  || 0.65);
        var y   = Math.sin(t * spd + ph) * amp;
        var x   = Math.cos(t * spd * 0.7 + ph) * (amp * 0.45);
        var r   = Math.sin(t * 0.4 + ph) * 12;
        orb.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) rotate(' + r.toFixed(2) + 'deg)';
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ── 4. Magnetic Cluster ─────────────────────────────────────────
     Dots in a grid shift toward cursor proximity.                   */
  function initMagneticCluster() {
    var grids = qsa('.gsap-mag-grid');
    if (!grids.length) return;
    grids.forEach(function (grid) {
      var dots = qsa('.gsap-mag-dot', grid);
      var targets = dots.map(function () { return { x: 0, y: 0 }; });
      var mx = 0, my = 0, inside = false;
      function frame() {
        dots.forEach(function (dot, i) {
          if (inside) {
            var rect = dot.getBoundingClientRect();
            var cx   = rect.left + rect.width / 2;
            var cy   = rect.top  + rect.height / 2;
            var dx   = mx - cx;
            var dy   = my - cy;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var pull = Math.max(0, 1 - dist / 80);
            targets[i].x = lerp(targets[i].x, dx * pull * 0.35, 0.18);
            targets[i].y = lerp(targets[i].y, dy * pull * 0.35, 0.18);
          } else {
            targets[i].x = lerp(targets[i].x, 0, 0.12);
            targets[i].y = lerp(targets[i].y, 0, 0.12);
          }
          dot.style.transform = 'translate(' + targets[i].x.toFixed(2) + 'px,' + targets[i].y.toFixed(2) + 'px)';
        });
        requestAnimationFrame(frame);
      }
      grid.addEventListener('mousemove', function (e) {
        inside = true; mx = e.clientX; my = e.clientY;
      });
      grid.addEventListener('mouseleave', function () { inside = false; });
      requestAnimationFrame(frame);
    });
  }

  /* ── 5. Word-By-Word Reveal ──────────────────────────────────────
     Each word fades + slides up sequentially on scroll.             */
  function initWordReveal() {
    var els = qsa('.gsap-word-reveal');
    if (!els.length) return;
    els.forEach(function (el) {
      var text  = el.textContent.trim();
      var words = text.split(/\s+/);
      el.innerHTML = words.map(function (w, i) {
        return '<span class="gsap-wr-word" style="--wi:' + i + ';transition-delay:' + (i * 0.06) + 's">' + w + '</span>';
      }).join(' ');
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('gsap-wr-active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ── 6. Parallax Depth Layers ────────────────────────────────────
     3 layers move at different rates; far = blur.                   */
  function initParallaxDepth() {
    var sections = qsa('.gsap-depth-section');
    if (!sections.length) return;
    sections.forEach(function (section) {
      var layers = qsa('.gsap-depth-layer', section);
      function update() {
        var rect = section.getBoundingClientRect();
        var wh   = window.innerHeight;
        var p    = (wh / 2 - rect.top - rect.height / 2) / wh;
        layers.forEach(function (layer) {
          var depth = parseFloat(layer.dataset.depth || 0.5);
          layer.style.transform = 'translateY(' + (p * 55 * depth) + 'px)';
          var blur = Math.abs(depth - 0.5) * 3;
          layer.style.filter = blur > 0.3 ? 'blur(' + blur.toFixed(1) + 'px)' : '';
        });
      }
      window.addEventListener('scroll', update, { passive: true });
      update();
    });
  }

  /* ── 7. Spring Cards ─────────────────────────────────────────────
     Cards respond to hover with spring-physics tilt.                */
  function initSpringCards() {
    var cards = qsa('.gsap-spring-card');
    if (!cards.length) return;
    cards.forEach(function (card) {
      var rx = 0, ry = 0, tx = 0, ty = 0, raf;
      var shine = card.querySelector('.gsap-spring-shine');
      function tick() {
        rx = lerp(rx, tx, 0.1);
        ry = lerp(ry, ty, 0.1);
        card.style.transform = 'perspective(600px) rotateY(' + rx + 'deg) rotateX(' + (-ry) + 'deg) scale3d(1.03,1.03,1.03)';
        if (shine) {
          shine.style.background = 'radial-gradient(circle at ' + (50 + rx * 3) + '% ' + (50 + ry * 3) + '%, rgba(255,255,255,0.22) 0%, transparent 65%)';
        }
        if (Math.abs(rx - tx) > 0.05 || Math.abs(ry - ty) > 0.05) {
          raf = requestAnimationFrame(tick);
        }
      }
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width  - 0.5) * 20;
        ty = ((e.clientY - r.top)  / r.height - 0.5) * 14;
        cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
      });
      card.addEventListener('mouseleave', function () {
        tx = 0; ty = 0;
        cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
        setTimeout(function () { card.style.transform = ''; }, 500);
      });
    });
  }

  /* ── 8. Count Morph ──────────────────────────────────────────────
     Numbers count up with spring-like easing on scroll.            */
  function initCountMorph() {
    var els = qsa('.gsap-countmorph');
    if (!els.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el       = entry.target;
        var target   = parseFloat(el.dataset.target || 100);
        var duration = parseInt(el.dataset.duration  || 2200);
        var prefix   = el.dataset.prefix || '';
        var suffix   = el.dataset.suffix || '';
        var decimals = parseInt(el.dataset.decimals  || 0);
        var t0       = performance.now();
        function step(now) {
          var progress = Math.min((now - t0) / duration, 1);
          var ease     = easeOutElastic(progress);
          var value    = ease * target;
          el.textContent = prefix + value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ── 9. Clip Wipe Reveal ─────────────────────────────────────────
     Content revealed via expanding circle clip-path.               */
  function initClipWipe() {
    var els = qsa('.gsap-clip-wipe');
    if (!els.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('gsap-cw-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ── 10. Velocity Tilt ───────────────────────────────────────────
     Card tilts forward in the direction of scroll velocity.        */
  function initVelocityTilt() {
    var cards = qsa('.gsap-vel-card');
    if (!cards.length) return;
    var lastY = window.scrollY, velocity = 0, displayVel = 0;
    window.addEventListener('scroll', function () {
      var newY = window.scrollY;
      velocity = newY - lastY;
      lastY    = newY;
    }, { passive: true });
    function frame() {
      displayVel = lerp(displayVel, velocity, 0.15);
      velocity   = lerp(velocity,   0,        0.35);
      var tilt   = clamp(displayVel * 0.4, -12, 12);
      cards.forEach(function (card) {
        card.style.transform = 'perspective(500px) rotateX(' + (-tilt) + 'deg)';
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ── Inject required CSS ─────────────────────────────────────────
     All GSAP demo styles, self-contained.                          */
  function injectStyles() {
    var css = `
/* ── Scroll Scrub ── */
.gsap-scrub-demo{padding:28px 24px;display:flex;flex-direction:column;gap:12px;justify-content:center;align-items:center;background:linear-gradient(135deg,#0a0a2a 0%,#120b2e 100%);height:100%}
.gsap-scrub-track{width:100%;max-width:280px;height:6px;background:rgba(255,255,255,.1);border-radius:4px;position:relative;overflow:visible}
.gsap-scrub-orb{position:absolute;top:50%;width:20px;height:20px;border-radius:50%;background:#60a5fa;transform:translateY(-50%);transition:background .2s,box-shadow .2s;margin-top:0}
.gsap-scrub-label{font-size:36px;font-weight:800;color:rgba(255,255,255,.9);font-variant-numeric:tabular-nums;letter-spacing:-1px}
.gsap-scrub-hint{font-size:11px;color:rgba(255,255,255,.3);letter-spacing:.5px}

/* ── Stagger Cascade ── */
.gsap-cascade-group{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:16px;width:100%}
.gsap-cascade-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:14px 12px;opacity:0;transform:translateY(24px) scale(.96);transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1)}
.gsap-cascade-card.gsap-c-in{opacity:1;transform:none}
.gsap-cc-icon{font-size:20px;margin-bottom:6px}
.gsap-cc-line{height:5px;border-radius:3px;background:rgba(255,255,255,.15);margin-bottom:4px}
.gsap-cc-line:last-child{width:60%}

/* ── Float Orbs ── */
.gsap-float-stage{position:relative;width:100%;height:100%;overflow:hidden;background:linear-gradient(135deg,#070716 0%,#0e0a25 100%)}
.gsap-float-orb{position:absolute;border-radius:50%;opacity:.85}

/* ── Magnetic Grid ── */
.gsap-mag-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;padding:24px;cursor:none;align-content:center;height:100%;background:#050518}
.gsap-mag-dot{width:8px;height:8px;border-radius:50%;background:rgba(139,92,246,.6);margin:auto;transition:background .3s}
.gsap-mag-grid:hover .gsap-mag-dot{background:rgba(167,139,250,.9)}

/* ── Word Reveal ── */
.gsap-word-reveal-wrap{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;height:100%;background:linear-gradient(135deg,#0c0c22 0%,#130d28 100%);padding:24px;text-align:center}
.gsap-word-reveal{font-size:22px;font-weight:800;color:#fff;line-height:1.4;letter-spacing:-.4px}
.gsap-wr-word{display:inline-block;opacity:0;transform:translateY(16px) blur(6px);transition:opacity .5s,transform .5s,filter .5s}
.gsap-word-reveal.gsap-wr-active .gsap-wr-word{opacity:1;transform:none;filter:none}
.gsap-word-sub{font-size:12px;color:rgba(255,255,255,.35);letter-spacing:.5px}

/* ── Depth Parallax ── */
.gsap-depth-section{position:relative;width:100%;height:100%;overflow:hidden;background:#060614}
.gsap-depth-layer{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transition:filter .1s}
.gsap-depth-shapes{width:100%;height:100%;position:relative}

/* ── Spring Cards ── */
.gsap-spring-card{border-radius:14px;overflow:hidden;position:relative;cursor:none;transform-style:preserve-3d;transition:transform .15s}
.gsap-spring-shine{position:absolute;inset:0;pointer-events:none;z-index:2}

/* ── Count Morph ── */
.gsap-countmorph-wrap{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:center;height:100%;padding:20px;background:linear-gradient(135deg,#05051a 0%,#0e0825 100%)}
.gsap-cm-item{text-align:center;min-width:80px}
.gsap-countmorph{font-size:32px;font-weight:900;letter-spacing:-1.5px;line-height:1;font-variant-numeric:tabular-nums}
.gsap-cm-label{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,.35);margin-top:4px}

/* ── Clip Wipe ── */
.gsap-clip-wipe{clip-path:circle(0% at 50% 50%);transition:clip-path .9s cubic-bezier(.16,1,.3,1)}
.gsap-clip-wipe.gsap-cw-in{clip-path:circle(150% at 50% 50%)}
.gsap-cw-inner{width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(135deg,#1a1a3e 0%,#2d1b69 100%)}

/* ── Velocity Tilt ── */
.gsap-vel-stage{display:flex;align-items:center;justify-content:center;height:100%;background:#08081e;padding:20px}
.gsap-vel-card{border-radius:16px;overflow:hidden;width:180px;height:140px;background:linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#4c1d95 100%);border:1px solid rgba(139,92,246,.3);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;transform-style:preserve-3d}
.gsap-vel-icon{font-size:28px}
.gsap-vel-label{font-size:12px;font-weight:600;color:rgba(255,255,255,.8);letter-spacing:.5px}
.gsap-vel-hint{font-size:10px;color:rgba(255,255,255,.3);position:absolute;bottom:12px;left:0;right:0;text-align:center}
`;
    var s = document.createElement('style');
    s.id  = 'gsap-anim-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ── Boot ─────────────────────────────────────────────────────── */
  function init() {
    injectStyles();
    initScrollScrub();
    initStaggerCascade();
    initFloatOrbs();
    initMagneticCluster();
    initWordReveal();
    initParallaxDepth();
    initSpringCards();
    initCountMorph();
    initClipWipe();
    initVelocityTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
