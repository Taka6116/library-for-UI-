/* =====================================================================
   script-v2.js — UI Library Phase 1-8 Enhancement
   Depends on: script.js (never modified), index.html, styles.css
   ===================================================================== */
(function () {
  'use strict';

  /* ───────────────────────────────────────────────────────────────────
     0. Wait for DOM + script.js to settle
  ─────────────────────────────────────────────────────────────────── */
  function init() {
    buildIndex();
    setupViewToggle();
    setupDrawer();
    setupCommandPalette();
    setupSidebar();
    setupProgressDots();
    setupFavorites();
    setupEnhancedSearch();
    setupHistoryAPI();
  }

  /* ───────────────────────────────────────────────────────────────────
     1. Index — flat array of all component cards
  ─────────────────────────────────────────────────────────────────── */
  var INDEX = [];

  function buildIndex() {
    document.querySelectorAll('.ecard').forEach(function (card) {
      var nameEl = card.querySelector('.cname');
      var descEl = card.querySelector('.cdesc');
      var demoEl = card.querySelector('.demo');
      INDEX.push({
        card: card,
        name: (nameEl ? nameEl.textContent : ''),
        desc: (descEl ? descEl.textContent : ''),
        tags: (card.dataset.name || ''),
        demoClass: demoEl ? Array.from(demoEl.classList).find(function (c) { return c.startsWith('d-'); }) || '' : ''
      });
    });
  }

  /* ───────────────────────────────────────────────────────────────────
     2. View Toggle — grid / list
  ─────────────────────────────────────────────────────────────────── */
  var mainEl = document.querySelector('.main');

  function setupViewToggle() {
    var savedView = localStorage.getItem('ui-lib-view') || 'grid';
    setView(savedView, true);

    var btnGrid = document.getElementById('viewGrid');
    var btnList = document.getElementById('viewList');
    if (!btnGrid || !btnList) return;

    btnGrid.addEventListener('click', function () { setView('grid'); });
    btnList.addEventListener('click', function () { setView('list'); });
  }

  function setView(v, silent) {
    if (!mainEl) return;
    mainEl.classList.toggle('view-grid', v === 'grid');
    mainEl.classList.toggle('view-list', v === 'list');
    var btnGrid = document.getElementById('viewGrid');
    var btnList = document.getElementById('viewList');
    if (btnGrid) btnGrid.classList.toggle('active', v === 'grid');
    if (btnList) btnList.classList.toggle('active', v === 'list');
    if (!silent) localStorage.setItem('ui-lib-view', v);
  }

  /* ───────────────────────────────────────────────────────────────────
     3. Drawer
  ─────────────────────────────────────────────────────────────────── */
  var drawer = document.getElementById('drawer');
  var drawerOverlay = document.getElementById('drawerOverlay');
  var drawerClose = document.getElementById('drawerClose');
  var drawerTitle = document.getElementById('drawerTitle');
  var drawerBadge = document.getElementById('drawerBadge');
  var drawerDemoSlot = document.getElementById('drawerDemoSlot');
  var drawerDesc = document.getElementById('drawerDesc');
  var drawerCodeHtml = document.getElementById('drawerCodeHtml');
  var drawerCodeCss = document.getElementById('drawerCodeCss');
  var drawerCodeJs = document.getElementById('drawerCodeJs');

  var currentCard = null;
  var currentDemoEl = null;

  function setupDrawer() {
    if (!drawer) return;

    // Card click → open drawer
    document.querySelector('.main').addEventListener('click', function (e) {
      var card = e.target.closest('.ecard');
      if (!card) return;
      // Don't open if clicking the fav button
      if (e.target.closest('.fav-btn')) return;
      openDrawer(card);
    });

    // Close handlers
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Keyboard
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    // Code tab switching
    document.querySelectorAll('.code-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var panelId = tab.dataset.panel;
        document.querySelectorAll('.code-tab').forEach(function (t) { t.classList.remove('active'); });
        document.querySelectorAll('.code-panel').forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var panel = document.getElementById(panelId);
        if (panel) panel.classList.add('active');
      });
    });

    // Copy buttons
    document.querySelectorAll('.code-copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var codeEl = btn.nextElementSibling && btn.nextElementSibling.querySelector('code');
        if (!codeEl) return;
        navigator.clipboard.writeText(codeEl.textContent).then(function () {
          btn.textContent = 'Copied!';
          setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
        }).catch(function () {});
      });
    });
  }

  function openDrawer(card) {
    if (!drawer || !card) return;

    // Close previous drawer first (restore demo)
    if (currentCard && currentCard !== card) {
      restoreDemo();
    }

    currentCard = card;

    var nameEl = card.querySelector('.cname');
    var descEl = card.querySelector('.cdesc');
    var demoEl = card.querySelector('.demo');

    // Populate header
    if (drawerTitle) drawerTitle.textContent = nameEl ? nameEl.textContent : '';
    if (drawerBadge) {
      var demoClass = demoEl ? Array.from(demoEl.classList).find(function (c) { return c.startsWith('d-'); }) || '' : '';
      drawerBadge.textContent = demoClass || 'demo';
    }

    // Description
    if (drawerDesc) drawerDesc.textContent = descEl ? descEl.textContent : '';

    // Move demo element into drawer (preserves RAF loops + event listeners)
    if (demoEl && drawerDemoSlot) {
      currentDemoEl = demoEl;
      // Clone placeholder to maintain card layout
      var placeholder = document.createElement('div');
      placeholder.className = demoEl.className + ' demo-placeholder';
      placeholder.dataset.placeholder = '1';
      card.insertBefore(placeholder, demoEl);
      drawerDemoSlot.innerHTML = '';
      drawerDemoSlot.appendChild(demoEl);
    }

    // Code snippets
    populateCode(card, demoEl);

    // Open animation
    drawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // History
    if (window.history && !drawer.dataset.historyPushed) {
      history.pushState({ drawer: true }, '', '#drawer');
      drawer.dataset.historyPushed = '1';
    }

    // Track recents
    addRecent(card);
  }

  function closeDrawer() {
    if (!drawer || !drawer.classList.contains('open')) return;
    restoreDemo();
    drawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
    drawer.dataset.historyPushed = '';
    currentCard = null;
  }

  function restoreDemo() {
    if (!currentDemoEl || !currentCard) return;
    var placeholder = currentCard.querySelector('.demo-placeholder');
    if (placeholder) {
      currentCard.insertBefore(currentDemoEl, placeholder);
      placeholder.remove();
    } else {
      var cinfo = currentCard.querySelector('.cinfo');
      if (cinfo) {
        currentCard.insertBefore(currentDemoEl, cinfo);
      } else {
        currentCard.appendChild(currentDemoEl);
      }
    }
    currentDemoEl = null;
  }

  function populateCode(card, demoEl) {
    if (!drawerCodeHtml || !drawerCodeCss || !drawerCodeJs) return;

    // HTML: demo outerHTML
    var htmlCode = demoEl ? escapeHtml(demoEl.outerHTML) : '<!-- No demo available -->';
    drawerCodeHtml.innerHTML = htmlCode;

    // CSS: reference to class
    var demoClass = demoEl ? Array.from(demoEl.classList).find(function (c) { return c.startsWith('d-'); }) || '' : '';
    drawerCodeCss.textContent = demoClass
      ? '/* See .' + demoClass + ' in styles.css */\n\n/* Example variables used:\n--bg: #050510\n--surface: #08081c\n--accent: #6d28d9\n--accentb: #8b5cf6\n*/'
      : '/* See styles.css */';

    // JS: relevant note
    var tags = (card.dataset.name || '');
    var hasAnimation = tags.match(/animation|canvas|particle|scroll|kinetic|liquid|morph|elastic|spring|overshoot|stagger/i);
    drawerCodeJs.textContent = hasAnimation
      ? '// This component uses requestAnimationFrame.\n// See script.js for the full animation loop.\n// Search for "' + (demoClass || 'demo') + '" in script.js.'
      : '// No custom JS required for this component.\n// Pure CSS implementation.';
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ───────────────────────────────────────────────────────────────────
     4. ⌘K Command Palette
  ─────────────────────────────────────────────────────────────────── */
  var cmdPalette = document.getElementById('cmdPalette');
  var cmdOverlay = document.getElementById('cmdOverlay');
  var cmdInput = document.getElementById('cmdInput');
  var cmdResults = document.getElementById('cmdResults');
  var cmdSelectedIndex = -1;

  function setupCommandPalette() {
    if (!cmdPalette) return;

    // Open with Ctrl+K or Cmd+K
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openCmd();
      }
      if (e.key === 'Escape' && cmdPalette.classList.contains('open')) {
        closeCmd();
      }
    });

    // ⌘K badge in search bar
    var cmdBadge = document.getElementById('cmdOpenBadge');
    if (cmdBadge) cmdBadge.addEventListener('click', openCmd);

    if (cmdOverlay) cmdOverlay.addEventListener('click', closeCmd);

    // Search input
    if (cmdInput) {
      cmdInput.addEventListener('input', function () {
        renderCmdResults(cmdInput.value.trim());
      });

      cmdInput.addEventListener('keydown', function (e) {
        var items = cmdResults.querySelectorAll('.cmd-item');
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          cmdSelectedIndex = Math.min(cmdSelectedIndex + 1, items.length - 1);
          updateCmdSelection(items);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          cmdSelectedIndex = Math.max(cmdSelectedIndex - 1, 0);
          updateCmdSelection(items);
        } else if (e.key === 'Enter') {
          var sel = cmdResults.querySelector('.cmd-item.selected');
          if (sel) sel.click();
        }
      });
    }
  }

  function openCmd() {
    if (!cmdPalette) return;
    cmdPalette.classList.add('open');
    if (cmdOverlay) cmdOverlay.classList.add('open');
    if (cmdInput) {
      cmdInput.value = '';
      cmdInput.focus();
    }
    cmdSelectedIndex = -1;
    renderCmdResults('');
  }

  function closeCmd() {
    if (!cmdPalette) return;
    cmdPalette.classList.remove('open');
    if (cmdOverlay) cmdOverlay.classList.remove('open');
  }

  function renderCmdResults(q) {
    if (!cmdResults) return;
    cmdSelectedIndex = -1;
    var lq = q.toLowerCase();
    var results = INDEX.filter(function (item) {
      if (!lq) return true;
      return (item.name + ' ' + item.tags + ' ' + item.desc).toLowerCase().includes(lq);
    }).slice(0, 20);

    cmdResults.innerHTML = results.map(function (item, i) {
      var highlighted = q ? item.name.replace(new RegExp('(' + escapeRegex(q) + ')', 'gi'), '<mark>$1</mark>') : item.name;
      return '<div class="cmd-item" data-idx="' + i + '">' +
        '<span class="cmd-item-name">' + highlighted + '</span>' +
        '<span class="cmd-item-tag">' + (item.demoClass || '') + '</span>' +
        '</div>';
    }).join('');

    cmdResults.querySelectorAll('.cmd-item').forEach(function (el, i) {
      el.addEventListener('click', function () {
        var item = results[i];
        if (item) {
          closeCmd();
          openDrawer(item.card);
          item.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

  function updateCmdSelection(items) {
    items.forEach(function (el, i) {
      el.classList.toggle('selected', i === cmdSelectedIndex);
    });
    var sel = items[cmdSelectedIndex];
    if (sel) sel.scrollIntoView({ block: 'nearest' });
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /* ───────────────────────────────────────────────────────────────────
     5. Sidebar — badges + Intersection Observer + sidebar search
  ─────────────────────────────────────────────────────────────────── */
  function setupSidebar() {
    addSidebarBadges();
    setupSidebarIntersection();
    setupSidebarSearch();
    setupFavoritesSection();
  }

  function addSidebarBadges() {
    document.querySelectorAll('.sb-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var id = href.replace('#', '');
      var section = document.getElementById(id);
      if (!section) return;
      var count = section.querySelectorAll('.ecard').length;
      if (count > 0) {
        var badge = document.createElement('span');
        badge.className = 'sb-badge';
        badge.textContent = count;
        link.appendChild(badge);
      }
    });
  }

  function setupSidebarIntersection() {
    var links = document.querySelectorAll('.sb-link[href^="#"]');
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').replace('#', '');
      var section = document.getElementById(id);
      if (section) sections.push({ section: section, link: link });
    });

    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (l) { l.classList.remove('active'); });
          var match = sections.find(function (s) { return s.section.id === id; });
          if (match) {
            match.link.classList.add('active');
            // Scroll sidebar to show active link
            match.link.scrollIntoView({ block: 'nearest' });
          }
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s.section); });
  }

  function setupSidebarSearch() {
    var input = document.getElementById('sidebarSearch');
    if (!input) return;
    input.addEventListener('input', function () {
      var q = input.value.toLowerCase();
      document.querySelectorAll('.sb-cat').forEach(function (cat) {
        var links = cat.querySelectorAll('.sb-link');
        var anyVisible = false;
        links.forEach(function (link) {
          var text = link.textContent.toLowerCase();
          var show = !q || text.includes(q);
          link.style.display = show ? '' : 'none';
          if (show) anyVisible = true;
        });
        cat.style.display = anyVisible ? '' : 'none';
      });
    });
  }

  function setupFavoritesSection() {
    renderFavoritesSection();
  }

  /* ───────────────────────────────────────────────────────────────────
     6. Progress Dots
  ─────────────────────────────────────────────────────────────────── */
  function setupProgressDots() {
    var dotsNav = document.getElementById('progressDots');
    if (!dotsNav) return;

    var sections = document.querySelectorAll('.cat-section, .tip-section');
    sections.forEach(function (section, i) {
      var dot = document.createElement('button');
      dot.className = 'pd-dot';
      dot.title = getSectionTitle(section);
      dot.addEventListener('click', function () {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      dotsNav.appendChild(dot);
    });

    if (!('IntersectionObserver' in window)) return;

    var dots = dotsNav.querySelectorAll('.pd-dot');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = Array.from(sections).indexOf(entry.target);
          dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  function getSectionTitle(section) {
    var titleEl = section.querySelector('.cat-title, .sect-title');
    return titleEl ? titleEl.textContent.trim() : (section.id || '');
  }

  /* ───────────────────────────────────────────────────────────────────
     7. Favorites
  ─────────────────────────────────────────────────────────────────── */
  var FAV_KEY = 'ui-lib-favorites';

  function getFavorites() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch (e) { return []; }
  }

  function setFavorites(arr) {
    localStorage.setItem(FAV_KEY, JSON.stringify(arr));
  }

  function getCardId(card) {
    var demoEl = card.querySelector('.demo');
    var cls = demoEl ? Array.from(demoEl.classList).find(function (c) { return c.startsWith('d-'); }) : null;
    return cls || card.querySelector('.cname')?.textContent.trim() || '';
  }

  function isFavorited(id) {
    return getFavorites().indexOf(id) !== -1;
  }

  function toggleFavorite(id) {
    var favs = getFavorites();
    var idx = favs.indexOf(id);
    if (idx === -1) {
      favs.push(id);
    } else {
      favs.splice(idx, 1);
    }
    setFavorites(favs);
    return idx === -1; // true if now favorited
  }

  function setupFavorites() {
    // Add ☆ button to each card
    INDEX.forEach(function (item) {
      var id = getCardId(item.card);
      if (!id) return;

      var btn = document.createElement('button');
      btn.className = 'fav-btn';
      btn.title = 'お気に入り';
      btn.textContent = isFavorited(id) ? '★' : '☆';
      btn.classList.toggle('favorited', isFavorited(id));

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var nowFav = toggleFavorite(id);
        btn.textContent = nowFav ? '★' : '☆';
        btn.classList.toggle('favorited', nowFav);
        renderFavoritesSection();
      });

      item.card.style.position = 'relative';
      item.card.appendChild(btn);
    });
  }

  function renderFavoritesSection() {
    var section = document.getElementById('favoritesSection');
    var grid = document.getElementById('favoritesGrid');
    if (!section || !grid) return;

    var favs = getFavorites();
    var favCards = INDEX.filter(function (item) {
      return favs.indexOf(getCardId(item.card)) !== -1;
    });

    if (favCards.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';
    grid.innerHTML = favCards.map(function (item) {
      return '<a class="fav-item" href="#" data-id="' + getCardId(item.card) + '">' +
        '<span class="fav-item-dot">★</span>' +
        '<span class="fav-item-name">' + escapeHtml(item.name) + '</span>' +
        '</a>';
    }).join('');

    grid.querySelectorAll('.fav-item').forEach(function (el, i) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var card = favCards[i] && favCards[i].card;
        if (card) {
          openDrawer(card);
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

  /* ───────────────────────────────────────────────────────────────────
     8. Recents
  ─────────────────────────────────────────────────────────────────── */
  var RECENTS_KEY = 'ui-lib-recents';

  function getRecents() {
    try { return JSON.parse(localStorage.getItem(RECENTS_KEY) || '[]'); } catch (e) { return []; }
  }

  function addRecent(card) {
    var id = getCardId(card);
    if (!id) return;
    var nameEl = card.querySelector('.cname');
    var name = nameEl ? nameEl.textContent.trim() : id;
    var recents = getRecents().filter(function (r) { return r.id !== id; });
    recents.unshift({ id: id, name: name });
    if (recents.length > 10) recents = recents.slice(0, 10);
    localStorage.setItem(RECENTS_KEY, JSON.stringify(recents));
  }

  /* ───────────────────────────────────────────────────────────────────
     9. Enhanced Search (overrides script.js oninput)
  ─────────────────────────────────────────────────────────────────── */
  function setupEnhancedSearch() {
    var searchEl = document.getElementById('search');
    var countEl = document.getElementById('count');
    var emptyState = document.getElementById('searchEmptyState');
    if (!searchEl) return;

    // Override the handler set by script.js
    searchEl.oninput = null;

    var debounceTimer = null;

    searchEl.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        doSearch(searchEl.value.trim(), countEl, emptyState);
      }, 150);
    });

    // Show recents on focus when empty
    searchEl.addEventListener('focus', function () {
      if (!searchEl.value) showRecentDropdown(searchEl);
    });

    searchEl.addEventListener('blur', function () {
      setTimeout(hideRecentDropdown, 200);
    });
  }

  function doSearch(q, countEl, emptyState) {
    var lq = q.toLowerCase();
    var total = INDEX.length;
    var vis = 0;
    var hasStagger = q.length > 0;

    INDEX.forEach(function (item, i) {
      var card = item.card;
      var match = !lq ||
        item.name.toLowerCase().includes(lq) ||
        item.tags.toLowerCase().includes(lq) ||
        item.desc.toLowerCase().includes(lq);

      card.classList.toggle('hidden', !match);
      card.classList.toggle('highlight', !!(lq && match));

      if (match) {
        vis++;
        // Highlight matching text in card name
        var nameEl = card.querySelector('.cname');
        if (nameEl && lq) {
          nameEl.innerHTML = item.name.replace(
            new RegExp('(' + escapeRegex(q) + ')', 'gi'),
            '<mark>$1</mark>'
          );
        } else if (nameEl) {
          nameEl.textContent = item.name;
        }

        // Stagger animation
        if (hasStagger) {
          card.classList.remove('stagger-enter');
          void card.offsetWidth; // reflow
          card.style.setProperty('--stagger-delay', (i % 30 * 20) + 'ms');
          card.classList.add('stagger-enter');
        }
      } else {
        var nameEl2 = card.querySelector('.cname');
        if (nameEl2) nameEl2.textContent = item.name;
      }
    });

    if (countEl) {
      countEl.textContent = lq ? vis + ' / ' + total + ' エフェクト' : total + ' エフェクト';
    }

    if (emptyState) {
      emptyState.style.display = (vis === 0 && lq) ? 'flex' : 'none';
    }
  }

  /* Recents dropdown */
  var recentDropdown = null;

  function showRecentDropdown(searchEl) {
    hideRecentDropdown();
    var recents = getRecents();
    if (recents.length === 0) return;

    recentDropdown = document.createElement('div');
    recentDropdown.className = 'recent-dropdown';
    recentDropdown.innerHTML =
      '<div class="recent-dropdown-hdr">最近見たコンポーネント</div>' +
      recents.map(function (r) {
        return '<div class="recent-item" data-id="' + escapeHtml(r.id) + '">' +
          '<span class="recent-item-icon">⏱</span>' +
          '<span>' + escapeHtml(r.name) + '</span>' +
          '</div>';
      }).join('');

    recentDropdown.querySelectorAll('.recent-item').forEach(function (el) {
      el.addEventListener('click', function () {
        var id = el.dataset.id;
        var found = INDEX.find(function (item) { return getCardId(item.card) === id; });
        if (found) {
          hideRecentDropdown();
          openDrawer(found.card);
          found.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });

    var wrap = searchEl.parentElement;
    wrap.style.position = 'relative';
    wrap.appendChild(recentDropdown);
  }

  function hideRecentDropdown() {
    if (recentDropdown && recentDropdown.parentElement) {
      recentDropdown.parentElement.removeChild(recentDropdown);
    }
    recentDropdown = null;
  }

  /* ───────────────────────────────────────────────────────────────────
     10. History API
  ─────────────────────────────────────────────────────────────────── */
  function setupHistoryAPI() {
    window.addEventListener('popstate', function (e) {
      if (drawer && drawer.classList.contains('open')) {
        // Don't push state again — just close
        drawer.dataset.historyPushed = '';
        restoreDemo();
        drawer.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
        currentCard = null;
      }
    });
  }

  /* ───────────────────────────────────────────────────────────────────
     11. Stagger on filter chips
  ─────────────────────────────────────────────────────────────────── */
  function setupFilterStagger() {
    document.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        setTimeout(function () {
          var visible = document.querySelectorAll('.ecard:not(.hidden)');
          visible.forEach(function (card, i) {
            card.classList.remove('stagger-enter');
            void card.offsetWidth;
            card.style.setProperty('--stagger-delay', (i % 30 * 18) + 'ms');
            card.classList.add('stagger-enter');
          });
        }, 50);
      });
    });
  }

  /* ───────────────────────────────────────────────────────────────────
     Boot
  ─────────────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(init, 0);
    });
  } else {
    setTimeout(init, 0);
  }

  setTimeout(setupFilterStagger, 100);

})();
