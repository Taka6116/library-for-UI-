<script>
// ==================== THEME ====================
const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;
themeBtn.addEventListener('click', () => {
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  themeBtn.textContent = isDark ? '🌙 ダーク' : '☀️ ライト';
});
document.getElementById('dmToggle').addEventListener('click', () => themeBtn.click());

// ==================== SEARCH ====================
const searchEl = document.getElementById('search');
const cards = document.querySelectorAll('.ecard');
const countEl = document.getElementById('count');
searchEl.addEventListener('input', () => {
  const q = searchEl.value.toLowerCase();
  let visible = 0;
  cards.forEach(c => {
    const name = c.dataset.name || '';
    const match = !q || name.includes(q);
    c.classList.toggle('hidden', !match);
    c.classList.toggle('highlight', !!(q && match));
    if (match) visible++;
  });
  countEl.textContent = `${visible} / 36 エフェクト`;
});

// ==================== SPOTLIGHT (OLD) ====================
const spotDemo = document.getElementById('spotDemo');
const spotOver = document.getElementById('spotOver');
spotDemo.addEventListener('mousemove', e => {
  const r = spotDemo.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
  const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
  spotOver.style.setProperty('--mx', x + '%');
  spotOver.style.setProperty('--my', y + '%');
});

// ==================== CARD SPOTLIGHT ====================
document.querySelectorAll('[data-cs]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
    const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
    card.style.setProperty('--cx', x + '%');
    card.style.setProperty('--cy', y + '%');
  });
});

// ==================== NOISE TOGGLE ====================
const noiseOv = document.getElementById('noiseOv');
document.getElementById('noiseOn').addEventListener('click', function() {
  noiseOv.style.opacity = '.07';
  this.classList.add('on');
  document.getElementById('noiseOff').classList.remove('on');
});
document.getElementById('noiseOff').addEventListener('click', function() {
  noiseOv.style.opacity = '0';
  this.classList.add('on');
  document.getElementById('noiseOn').classList.remove('on');
});

// ==================== METEORS ====================
const meteorDemo = document.getElementById('meteorDemo');
for (let i = 0; i < 12; i++) {
  const m = document.createElement('div');
  m.className = 'meteor';
  const top = Math.random() * 40;
  const left = Math.random() * 100;
  const dur = 1.5 + Math.random() * 2.5;
  const delay = Math.random() * 4;
  const opacity = 0.4 + Math.random() * 0.6;
  m.style.cssText = `top:${top}%;left:${left}%;animation-duration:${dur}s;animation-delay:${delay}s;opacity:${opacity}`;
  meteorDemo.insertBefore(m, meteorDemo.firstChild);
}

// ==================== FLOATING DOCK ====================
const dockItems = document.querySelectorAll('[data-dock]');
dockItems.forEach((item, i) => {
  item.addEventListener('mouseenter', () => {
    dockItems.forEach((el, j) => {
      const dist = Math.abs(j - i);
      el.style.transform = dist === 0
        ? 'scale(1.5) translateY(-12px)'
        : dist === 1
        ? 'scale(1.25) translateY(-6px)'
        : 'scale(1)';
    });
  });
});
document.getElementById('dockEl').addEventListener('mouseleave', () => {
  dockItems.forEach(el => el.style.transform = '');
});

// ==================== PLAYGROUND ====================
const fsSlider = document.getElementById('fsSlider');
const fwSlider = document.getElementById('fwSlider');
const lsSlider = document.getElementById('lsSlider');
const playPreview = document.getElementById('playPreview');
function updatePlay() {
  const fs = fsSlider.value;
  const fw = fwSlider.value;
  const ls = lsSlider.value;
  document.getElementById('fsVal').textContent = fs;
  document.getElementById('fwVal').textContent = fw;
  document.getElementById('lsVal').textContent = ls;
  playPreview.style.fontSize = fs + 'px';
  playPreview.style.fontWeight = fw;
  playPreview.style.letterSpacing = ls + 'px';
}
[fsSlider, fwSlider, lsSlider].forEach(s => s.addEventListener('input', updatePlay));

// ==================== MAGNETIC BUTTON ====================
const magWrap = document.getElementById('magWrap');
const magBtn = document.getElementById('magBtn');
magWrap.addEventListener('mousemove', e => {
  const r = magBtn.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const dx = (e.clientX - cx) * 0.35;
  const dy = (e.clientY - cy) * 0.35;
  magBtn.style.transform = `translate(${dx}px, ${dy}px)`;
});
magWrap.addEventListener('mouseleave', () => {
  magBtn.style.transform = 'translate(0,0)';
});

// ==================== 3D CARD ====================
const card3dEl = document.getElementById('card3dEl');
card3dEl.addEventListener('mousemove', e => {
  const r = card3dEl.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const rx = ((e.clientY - cy) / r.height) * -20;
  const ry = ((e.clientX - cx) / r.width) * 20;
  card3dEl.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
});
card3dEl.addEventListener('mouseleave', () => {
  card3dEl.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
});

// ==================== TEXT GENERATE ====================
const phrases = [
  'Build something beautiful.',
  'Modern UI — 現代のデザイン',
  'Dark. Minimal. Powerful.',
  'Crafted with attention.',
  'Every pixel matters. ✦'
];
let pIdx = 0, cIdx = 0;
const tgenOut = document.getElementById('tgenOut');
const cursor = '<span class="tgen-cur"></span>';
function typeNext() {
  const phrase = phrases[pIdx];
  if (cIdx < phrase.length) {
    tgenOut.innerHTML = phrase.slice(0, ++cIdx) + cursor;
    setTimeout(typeNext, 55 + Math.random() * 30);
  } else {
    setTimeout(() => {
      pIdx = (pIdx + 1) % phrases.length;
      cIdx = 0;
      eraseText();
    }, 2200);
  }
}
function eraseText() {
  const phrase = phrases[(pIdx - 1 + phrases.length) % phrases.length];
  if (cIdx < phrase.length) {
    tgenOut.innerHTML = phrase.slice(0, phrase.length - ++cIdx) + cursor;
    setTimeout(eraseText, 30);
  } else { typeNext(); }
}
typeNext();

// ==================== SCROLL REVEAL ====================
const words = document.querySelectorAll('.rev-word');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const wds = e.target.querySelectorAll('.rev-word');
      wds.forEach((w, i) => setTimeout(() => w.classList.add('vis'), i * 80));
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.d-scroll').forEach(el => observer.observe(el));
// Auto-trigger for visible ones
setTimeout(() => {
  document.querySelectorAll('.rev-word').forEach((w, i) => {
    setTimeout(() => w.classList.add('vis'), i * 100 + 500);
  });
}, 800);

// ==================== STATEFUL BUTTON ====================
const stateBtn = document.getElementById('stateBtn');
const stateHint = document.getElementById('stateHint');
const states = [
  { cls: 'idle', txt: 'Deploy', hint: 'クリックしてみて' },
  { cls: 'loading', txt: '⟳ Deploying...', hint: '処理中...' },
  { cls: 'success', txt: '✓ Deployed!', hint: '成功しました' },
  { cls: 'idle', txt: 'Deploy Again', hint: 'もう一度試す' },
];
let stateIdx = 0;
stateBtn.addEventListener('click', () => {
  if (stateBtn.classList.contains('loading')) return;
  stateIdx = (stateIdx + 1) % states.length;
  const s = states[stateIdx];
  stateBtn.className = 'state-btn ' + s.cls;
  stateBtn.textContent = s.txt;
  stateHint.textContent = s.hint;
  if (s.cls === 'loading') {
    setTimeout(() => {
      stateIdx = 2;
      stateBtn.className = 'state-btn success';
      stateBtn.textContent = '✓ Deployed!';
      stateHint.textContent = '成功しました';
    }, 1800);
  }
});

// ==================== SHARED ELEMENT ====================
const setItems = document.querySelectorAll('[data-set]');
const setImg = document.getElementById('setImg');
const setName = document.getElementById('setName');
const gradients = [
  'linear-gradient(135deg,#7c3aed,#2563eb)',
  'linear-gradient(135deg,#0ea5e9,#10b981)',
  'linear-gradient(135deg,#f59e0b,#ef4444)',
];
const names = ['Violet', 'Ocean', 'Sunset'];
setItems.forEach(item => {
  item.addEventListener('click', () => {
    setItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const idx = +item.dataset.set;
    setImg.style.background = gradients[idx];
    setName.textContent = names[idx];
  });
});

// ==================== TOAST ====================
document.getElementById('toastClose').addEventListener('click', () => {
  const stack = document.getElementById('toastStack');
  const t1 = stack.querySelector('.t1');
  if (t1) {
    t1.style.opacity = '0';
    t1.style.transform = 'translateX(100%) scale(0.9)';
    t1.style.transition = 'all .3s ease';
    setTimeout(() => {
      t1.remove();
      const toasts = stack.querySelectorAll('.toast');
      const cls = ['t1','t2','t3'];
      toasts.forEach((t, i) => {
        t.className = 'toast ' + (cls[i] || '');
        t.style.opacity = '';
        t.style.transform = '';
      });
    }, 320);
  }
});

// ==================== SIDEBAR SCROLL SPY ====================
const sbLinks = document.querySelectorAll('.sb-link');
const sections = document.querySelectorAll('.ecard[id], .cat-section');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      sbLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-50px 0px -50px 0px' });
document.querySelectorAll('.ecard[id]').forEach(el => sectionObserver.observe(el));

// ==================== COUNT DYNAMIC ====================
countEl.textContent = document.querySelectorAll('.ecard').length + ' エフェクト';
searchEl.addEventListener('input', () => {}, false); // override below

// ==================== SCRAMBLE TEXT ====================
const CHARS = '!@#$%^&*ABCDEFGHIJKLMNabcdefghijklmn0123456789░▒▓█▄▀■□';
const scramblePhrases = ['MODERN DESIGN ✦','HELLO WORLD','UI LIBRARY','SCRAMBLE TEXT','DARK & MINIMAL','SHIP IT FAST'];
let spIdx = 0;
function scramble(el, target, dur = 900) {
  const start = Date.now();
  const iv = setInterval(() => {
    const t = Math.min((Date.now()-start)/dur, 1);
    const done = Math.floor(t * target.length);
    el.textContent = target.split('').map((c,i) =>
      i < done ? c : c === ' ' ? ' ' : CHARS[Math.floor(Math.random()*CHARS.length)]
    ).join('');
    if (t >= 1) clearInterval(iv);
  }, 28);
}
const scrambleOut = document.getElementById('scrambleOut');
const scrambleBtn = document.getElementById('scrambleBtn');
if (scrambleOut && scrambleBtn) {
  scramble(scrambleOut, scramblePhrases[0]);
  scrambleBtn.addEventListener('click', () => {
    spIdx = (spIdx+1) % scramblePhrases.length;
    scramble(scrambleOut, scramblePhrases[spIdx]);
  });
}

// ==================== WORD FLIP ====================
const wfInner = document.getElementById('wfInner');
let wfIdx = 0;
if (wfInner) setInterval(() => {
  wfIdx = (wfIdx+1) % 4;
  wfInner.style.transform = `translateY(-${wfIdx * 1.25}em)`;
}, 1800);

// ==================== SPLIT CHAR ====================
const splitTxt = document.getElementById('splitTxt');
if (splitTxt) {
  'BEAUTIFUL'.split('').forEach((c, i) => {
    const s = document.createElement('span');
    s.className = 'split-char';
    s.textContent = c;
    s.style.transitionDelay = (i * 0.065) + 's';
    s.style.color = i % 2 === 0 ? 'var(--text)' : 'var(--accentb)';
    splitTxt.appendChild(s);
  });
  const triggerSplit = () => {
    splitTxt.querySelectorAll('.split-char').forEach(c => c.classList.remove('vis'));
    setTimeout(() => splitTxt.querySelectorAll('.split-char').forEach(c => c.classList.add('vis')), 60);
  };
  setTimeout(triggerSplit, 500);
  splitTxt.addEventListener('click', () => { triggerSplit(); });
  setInterval(triggerSplit, 4000);
}

// ==================== WAVE TEXT ====================
const waveTxt = document.getElementById('waveTxt');
if (waveTxt) {
  'Wave Effect ✦'.split('').forEach((c, i) => {
    const s = document.createElement('span');
    s.className = 'wave-char';
    s.textContent = c === ' ' ? ' ' : c;
    s.style.animationDelay = (i * 0.09) + 's';
    s.style.color = i % 3 === 0 ? 'var(--accentb)' : i % 3 === 1 ? 'var(--accent2)' : 'var(--text)';
    waveTxt.appendChild(s);
  });
}

// ==================== COUNT UP ====================
function countUp(el, target, dur = 1800) {
  const start = Date.now();
  const tick = () => {
    const p = Math.min((Date.now()-start)/dur, 1);
    const eased = 1 - Math.pow(1-p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  };
  tick();
}
const cuEl = document.getElementById('countup');
if (cuEl) {
  const startCount = () => {
    countUp(document.getElementById('cu1'), 24800);
    countUp(document.getElementById('cu2'), 148200);
    countUp(document.getElementById('cu3'), 3600000);
  };
  const cuObs = new IntersectionObserver(e => { if(e[0].isIntersecting){ startCount(); cuObs.disconnect(); }},{threshold:.5});
  cuObs.observe(cuEl);
  cuEl.addEventListener('click', () => {
    ['cu1','cu2','cu3'].forEach(id => document.getElementById(id).textContent='0');
    setTimeout(startCount, 80);
  });
}

// ==================== HIGHLIGHT SWEEP ====================
const hlWords = ['hlW1','hlW2','hlW3','hlW4','hlW5'];
let hlIdx = 0;
function nextHL() {
  document.querySelectorAll('.hl-word').forEach(w => w.classList.remove('active'));
  if (hlIdx < hlWords.length) {
    const el = document.getElementById(hlWords[hlIdx]);
    if (el) el.classList.add('active');
    hlIdx++;
    setTimeout(nextHL, 550);
  } else { setTimeout(() => { hlIdx=0; nextHL(); }, 1800); }
}
if (document.getElementById('hlW1')) setTimeout(nextHL, 700);

// ==================== SLIDE STACK ====================
const ssTrack = document.getElementById('ssTrack');
let ssIdx = 0;
if (ssTrack) setInterval(() => {
  ssIdx = (ssIdx+1) % 4;
  ssTrack.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
  ssTrack.style.transform = `translateY(-${ssIdx * 1.2}em)`;
}, 2000);

// ==================== PARTICLE FIELD ====================
const pCanvas = document.getElementById('particleCanvas');
if (pCanvas) {
  const pCtx = pCanvas.getContext('2d');
  const pMouse = { x: null, y: null };
  let pts = [];
  const initP = () => {
    pCanvas.width = pCanvas.offsetWidth;
    pCanvas.height = pCanvas.offsetHeight;
    pts = Array.from({length:60}, () => ({
      x: Math.random()*pCanvas.width, y: Math.random()*pCanvas.height,
      vx: (Math.random()-.5)*.7, vy: (Math.random()-.5)*.7,
      sz: Math.random()*1.5+.5, op: Math.random()*.4+.15
    }));
  };
  const drawP = () => {
    const W = pCanvas.width, H = pCanvas.height;
    pCtx.clearRect(0,0,W,H);
    pts.forEach(p => {
      if (pMouse.x !== null) {
        const dx=p.x-pMouse.x, dy=p.y-pMouse.y, d=Math.sqrt(dx*dx+dy*dy);
        if (d < 90) { p.vx+=dx/d*.18; p.vy+=dy/d*.18; }
      }
      p.vx*=.98; p.vy*=.98;
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      pCtx.beginPath(); pCtx.arc(p.x,p.y,p.sz,0,Math.PI*2);
      pCtx.fillStyle=`rgba(139,92,246,${p.op})`; pCtx.fill();
    });
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
      if(d<85){ pCtx.beginPath(); pCtx.moveTo(pts[i].x,pts[i].y); pCtx.lineTo(pts[j].x,pts[j].y);
        pCtx.strokeStyle=`rgba(139,92,246,${(1-d/85)*.18})`; pCtx.lineWidth=.6; pCtx.stroke(); }
    }
    requestAnimationFrame(drawP);
  };
  const pd = document.querySelector('.d-particle');
  if (pd) {
    pd.addEventListener('mousemove', e => { const r=pCanvas.getBoundingClientRect(); pMouse.x=e.clientX-r.left; pMouse.y=e.clientY-r.top; });
    pd.addEventListener('mouseleave', () => { pMouse.x=pMouse.y=null; });
    initP(); drawP();
  }
}

// ==================== CUSTOM CURSOR ====================
const cursorDemo = document.getElementById('cursorDemo');
const csrF = document.getElementById('csrF');
const csrD = document.getElementById('csrD');
if (cursorDemo && csrF && csrD) {
  cursorDemo.addEventListener('mousemove', e => {
    const r = cursorDemo.getBoundingClientRect();
    const x = e.clientX-r.left, y = e.clientY-r.top;
    csrF.style.left = x+'px'; csrF.style.top = y+'px';
    csrD.style.left = x+'px'; csrD.style.top = y+'px';
  });
  const cBtn = document.getElementById('cursorBtn2');
  if (cBtn) {
    cBtn.addEventListener('mouseenter', () => { csrF.style.width='52px'; csrF.style.height='52px'; csrF.style.background='rgba(139,92,246,.15)'; });
    cBtn.addEventListener('mouseleave', () => { csrF.style.width='24px'; csrF.style.height='24px'; csrF.style.background=''; });
  }
}

// ==================== RIPPLE ====================
function addRipple(btn) {
  if (!btn) return;
  btn.addEventListener('click', e => {
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width,r.height)*2;
    const span = document.createElement('span');
    span.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,.28);left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px;transform:scale(0);animation:ripple-anim .65s linear;pointer-events:none`;
    btn.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  });
}
addRipple(document.getElementById('rplBtn1'));
addRipple(document.getElementById('rplBtn2'));

// ==================== CONFETTI ====================
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiBtn = document.getElementById('confettiBtn');
if (confettiCanvas && confettiBtn) {
  const cCtx = confettiCanvas.getContext('2d');
  confettiBtn.addEventListener('click', () => {
    confettiCanvas.width = confettiCanvas.offsetWidth;
    confettiCanvas.height = confettiCanvas.offsetHeight;
    const pieces = Array.from({length:90}, () => ({
      x: confettiCanvas.width/2, y: confettiCanvas.height*.55,
      vx: (Math.random()-.5)*12, vy: -(Math.random()*12+4),
      color: `hsl(${Math.random()*360},80%,62%)`,
      w: Math.random()*9+4, h: Math.random()*5+2,
      rot: Math.random()*Math.PI*2, rv: (Math.random()-.5)*.35
    }));
    let frame = 0;
    const draw = () => {
      cCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
      pieces.forEach(p => {
        p.x+=p.vx; p.y+=p.vy; p.vy+=.28; p.vx*=.99; p.rot+=p.rv;
        cCtx.save(); cCtx.translate(p.x,p.y); cCtx.rotate(p.rot);
        cCtx.fillStyle=p.color; cCtx.globalAlpha=Math.max(0,1-frame/110);
        cCtx.fillRect(-p.w/2,-p.h/2,p.w,p.h); cCtx.restore();
      });
      if(++frame < 110) requestAnimationFrame(draw);
      else cCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    };
    draw();
  });
}

// ==================== MOUSE FOLLOWER ====================
const followerDemo = document.getElementById('followerDemo');
const followEl = document.getElementById('followEl');
if (followerDemo && followEl) {
  followerDemo.addEventListener('mousemove', e => {
    const r = followerDemo.getBoundingClientRect();
    followEl.style.left = (e.clientX-r.left)+'px';
    followEl.style.top  = (e.clientY-r.top)+'px';
  });
}

// ==================== SPRING DRAG ====================
const springCard = document.getElementById('springCard');
const springDemo = document.getElementById('springDemo');
if (springCard && springDemo) {
  let dragging=false, sx=0, sy=0, ox=0, oy=0;
  springCard.addEventListener('mousedown', e => {
    dragging=true;
    const dr=springDemo.getBoundingClientRect(), cr=springCard.getBoundingClientRect();
    ox=cr.left-dr.left+cr.width/2; oy=cr.top-dr.top+cr.height/2;
    sx=e.clientX; sy=e.clientY;
    springCard.style.transition='none'; e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if(!dragging) return;
    const dx=e.clientX-sx, dy=e.clientY-sy;
    springCard.style.left=(ox+dx)+'px'; springCard.style.top=(oy+dy)+'px';
    springCard.style.transform=`translate(-50%,-50%) rotate(${dx*.04}deg)`;
  });
  document.addEventListener('mouseup', () => {
    if(!dragging) return; dragging=false;
    springCard.style.transition='left .65s cubic-bezier(.34,1.56,.64,1),top .65s cubic-bezier(.34,1.56,.64,1),transform .65s cubic-bezier(.34,1.56,.64,1)';
    springCard.style.left='50%'; springCard.style.top='50%'; springCard.style.transform='translate(-50%,-50%)';
  });
}

// ==================== MODAL HELPERS ====================
// Universal open/close for overlay modals
document.querySelectorAll('[id$="Trigger"]').forEach(btn => {
  const overlayId = btn.id.replace('Trigger', 'Overlay');
  const overlay = document.getElementById(overlayId);
  if (overlay) btn.addEventListener('click', () => overlay.classList.add('md-open'));
});
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const overlay = document.getElementById(btn.dataset.close);
    if (overlay) overlay.classList.remove('md-open');
  });
});
// Close on overlay backdrop click
document.querySelectorAll('.md-overlay').forEach(ov => {
  ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('md-open'); });
});

// ==================== FLIP CARD MODAL ====================
const mflCard = document.getElementById('mflCard');
if (mflCard) {
  mflCard.addEventListener('click', () => mflCard.classList.toggle('mfl-flipped'));
}

// ==================== STACKED MODALS ====================
const mstTrigger = document.getElementById('mstTrigger');
const mstWrap = document.getElementById('mstWrap');
const mstBg = document.getElementById('mstBg');
const mstClose = document.getElementById('mstClose');
const mstOk = document.getElementById('mstOk');
const mstCancel = document.getElementById('mstCancel');
const closeMst = () => { if (mstWrap) mstWrap.classList.remove('mst-open'); };
if (mstTrigger) mstTrigger.addEventListener('click', () => mstWrap && mstWrap.classList.add('mst-open'));
if (mstBg) mstBg.addEventListener('click', closeMst);
if (mstClose) mstClose.addEventListener('click', closeMst);
if (mstOk) mstOk.addEventListener('click', closeMst);
if (mstCancel) mstCancel.addEventListener('click', closeMst);

// Bottom sheet pills
const mds6Pills = document.getElementById('mds6Pills');
if (mds6Pills) {
  mds6Pills.querySelectorAll('.mds-pill').forEach(p => {
    p.addEventListener('click', () => {
      mds6Pills.querySelectorAll('.mds-pill').forEach(x => x.classList.remove('on'));
      p.classList.add('on');
    });
  });
}

// ==================== PARALLAX (mousemove) ====================
const parallaxDemo = document.getElementById('parallaxDemo');
const parL1 = document.getElementById('parL1');
const parL2 = document.getElementById('parL2');
const parL3 = document.getElementById('parL3');
if (parallaxDemo) {
  parallaxDemo.addEventListener('mousemove', e => {
    const r = parallaxDemo.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / r.width;
    const y = (e.clientY - r.top - r.height / 2) / r.height;
    parL1.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
    parL2.style.transform = `translate(${x * 22}px, ${y * 18}px)`;
    parL3.style.transform = `translate(${x * 38}px, ${y * 30}px)`;
  });
  parallaxDemo.addEventListener('mouseleave', () => {
    parL1.style.transform = 'translate(0,0)';
    parL2.style.transform = 'translate(0,0)';
    parL3.style.transform = 'translate(0,0)';
  });
}

// ==================== 3D TILT ====================
const tilt3dDemo = document.getElementById('tilt3dDemo');
const tiltCard = document.getElementById('tiltCard');
if (tilt3dDemo && tiltCard) {
  tilt3dDemo.addEventListener('mousemove', e => {
    const r = tilt3dDemo.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    tiltCard.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 14}deg) scale(1.04)`;
  });
  tilt3dDemo.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateY(0) rotateX(0) scale(1)';
    tiltCard.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
    setTimeout(() => { tiltCard.style.transition = 'transform .12s ease'; }, 500);
  });
  tilt3dDemo.addEventListener('mouseenter', () => {
    tiltCard.style.transition = 'transform .12s ease';
  });
}

// ==================== CURSOR SPOTLIGHT ====================
const csDemo = document.getElementById('cursorSpotDemo');
const csMask = document.getElementById('csMask');
const csDots = document.getElementById('csDots');
if (csDemo && csMask) {
  // generate dots
  for (let i = 0; i < 70; i++) {
    const d = document.createElement('div');
    d.className = 'cs-dot';
    csDots.appendChild(d);
  }
  csDemo.addEventListener('mousemove', e => {
    const r = csDemo.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    csMask.style.background = `radial-gradient(circle 80px at ${x}px ${y}px, transparent, rgba(7,7,20,.96) 100%)`;
  });
  csDemo.addEventListener('mouseleave', () => {
    csMask.style.background = 'radial-gradient(circle 80px at 50% 50%, transparent, rgba(7,7,20,.96) 100%)';
  });
}

// ==================== NOISE CANVAS (IntersectionObserver fix) ====================
const noiseCanvas = document.getElementById('noiseCanvas');
if (noiseCanvas) {
  let noiseTimer = null;
  const nCtx = noiseCanvas.getContext('2d');
  const drawNoise = () => {
    const w = noiseCanvas.parentElement.offsetWidth || 300;
    const h = noiseCanvas.parentElement.offsetHeight || 200;
    if (noiseCanvas.width !== w) noiseCanvas.width = w;
    if (noiseCanvas.height !== h) noiseCanvas.height = h;
    const id = nCtx.createImageData(w, h);
    for (let i = 0; i < id.data.length; i += 4) {
      const v = Math.random() * 255;
      id.data[i] = id.data[i+1] = id.data[i+2] = v;
      id.data[i+3] = 255;
    }
    nCtx.putImageData(id, 0, 0);
  };
  const noiseObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      drawNoise();
      noiseTimer = setInterval(drawNoise, 90);
    } else {
      clearInterval(noiseTimer);
    }
  }, { threshold: 0.1 });
  noiseObs.observe(noiseCanvas);
}

// ==================== MAGNETIC GRID ====================
const mgGrid = document.getElementById('mgGrid');
if (mgGrid) {
  const EMOJIS = ['✦','★','◆','●','▲','◉','⬡','✿'];
  for (let i = 0; i < 15; i++) {
    const c = document.createElement('div');
    c.className = 'mg-cell';
    c.textContent = EMOJIS[i % EMOJIS.length];
    mgGrid.appendChild(c);
  }
  const mgDemo = document.getElementById('magGridDemo');
  if (mgDemo) {
    mgDemo.addEventListener('mousemove', e => {
      const cells = mgGrid.querySelectorAll('.mg-cell');
      cells.forEach(cell => {
        const r = cell.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 80;
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 12;
          const tx = (dx / dist) * force;
          const ty = (dy / dist) * force;
          cell.style.transform = `translate(${tx}px, ${ty}px) scale(${1 + force * 0.015})`;
          cell.style.background = `rgba(139,92,246,${0.1 + force * 0.03})`;
          cell.style.borderColor = `rgba(139,92,246,${0.2 + force * 0.05})`;
          cell.style.boxShadow = `0 0 ${force * 2}px rgba(139,92,246,.4)`;
        } else {
          cell.style.transform = '';
          cell.style.background = '';
          cell.style.borderColor = '';
          cell.style.boxShadow = '';
        }
      });
    });
    mgDemo.addEventListener('mouseleave', () => {
      mgGrid.querySelectorAll('.mg-cell').forEach(c => {
        c.style.transform = '';
        c.style.background = '';
        c.style.borderColor = '';
        c.style.boxShadow = '';
      });
    });
  }
}

// ==================== RADIAL MENU ====================
const rmCenter = document.getElementById('rmCenter');
const rmWrap = document.getElementById('rmWrap');
if (rmCenter && rmWrap) {
  rmCenter.addEventListener('click', e => {
    e.stopPropagation();
    rmWrap.classList.toggle('rm-open');
  });
  document.addEventListener('click', () => rmWrap.classList.remove('rm-open'));
}

// ==================== PAGE TRANSITION ====================
const pageTransDemo = document.getElementById('pageTransDemo');
if (pageTransDemo) {
  let ptState = 'a'; // 'a' or 'b'
  pageTransDemo.addEventListener('click', () => {
    if (ptState === 'a') {
      pageTransDemo.classList.add('pt-go');
      setTimeout(() => {
        pageTransDemo.classList.remove('pt-go');
        pageTransDemo.classList.add('pt-done');
        ptState = 'b';
      }, 500);
    } else {
      pageTransDemo.classList.remove('pt-done');
      pageTransDemo.querySelector('.pt-p2').style.transform = 'translateX(100%)';
      setTimeout(() => { pageTransDemo.querySelector('.pt-p2').style.transform = ''; }, 10);
      ptState = 'a';
    }
  });
}

// ==================== MASK REVEAL ====================
const mrBox = document.getElementById('mrBox');
const maskRevealDemo = document.getElementById('maskRevealDemo');
if (mrBox && maskRevealDemo) {
  let mrToggle = false;
  maskRevealDemo.addEventListener('click', () => {
    mrToggle = !mrToggle;
    mrBox.classList.toggle('revealed', mrToggle);
  });
}

// ==================== LIVE FEED ====================
const lfBody = document.getElementById('lfBody');
const lfCount = document.getElementById('lfCount');
if (lfBody) {
  const users = [
    { name: 'Mia', bg: 'linear-gradient(135deg,#0ea5e9,#10b981)', action: 'merged PR #88' },
    { name: 'Leo', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', action: 'left a comment' },
    { name: 'Yui', bg: 'linear-gradient(135deg,#6d28d9,#f59e0b)', action: 'pushed to main' },
    { name: 'Dan', bg: 'linear-gradient(135deg,#10b981,#6d28d9)', action: 'closed issue #7' },
  ];
  let lfIdx = 0, lfTotal = 3;
  setInterval(() => {
    const u = users[lfIdx % users.length]; lfIdx++;
    const item = document.createElement('div');
    item.className = 'lf-item';
    item.innerHTML = `<div class="lf-av" style="background:${u.bg}">${u.name[0]}</div><div><div class="lf-who">${u.name}</div><div class="lf-what">${u.action}</div></div>`;
    lfBody.prepend(item);
    lfTotal++;
    if (lfCount) lfCount.textContent = lfTotal + ' events';
    if (lfBody.children.length > 5) lfBody.removeChild(lfBody.lastChild);
  }, 2200);
}

// ==================== PROGRESSIVE DISCLOSURE ====================
const pdWrap = document.getElementById('pdWrap');
const pdTrigger = document.getElementById('pdTrigger');
if (pdWrap && pdTrigger) {
  pdTrigger.addEventListener('click', () => pdWrap.classList.toggle('pd-open'));
}

// ==================== EXPANDABLE BENTO ====================
const ebGrid = document.getElementById('ebGrid');
if (ebGrid) {
  let ebActive = null;
  ebGrid.querySelectorAll('.eb-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      if (ebActive && ebActive !== cell) ebActive.classList.remove('eb-exp');
      if (cell.classList.contains('eb-exp')) {
        cell.classList.remove('eb-exp');
        ebActive = null;
      } else {
        cell.classList.add('eb-exp');
        ebActive = cell;
      }
    });
  });
}

// ==================== PILL NAV ====================
const pnavWrap = document.getElementById('pnavWrap');
const pnavPill = document.getElementById('pnavPill');
if (pnavWrap && pnavPill) {
  const pnavItems = pnavWrap.querySelectorAll('.pnav-item');
  const movePill = (el) => {
    const wr = pnavWrap.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    pnavPill.style.left = (er.left - wr.left) + 'px';
    pnavPill.style.width = er.width + 'px';
  };
  // init
  setTimeout(() => {
    const active = pnavWrap.querySelector('.pnav-active');
    if (active) movePill(active);
  }, 50);
  pnavItems.forEach(item => {
    item.addEventListener('click', () => {
      pnavItems.forEach(i => i.classList.remove('pnav-active'));
      item.classList.add('pnav-active');
      movePill(item);
    });
  });
}

// ==================== SEGMENTED CONTROL ====================
const segCtrl = document.getElementById('segCtrl');
const segSlider = document.getElementById('segSlider');
if (segCtrl && segSlider) {
  const segOpts = segCtrl.querySelectorAll('.seg-opt');
  const moveSlider = (el) => {
    const cr = segCtrl.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    segSlider.style.left = (er.left - cr.left) + 'px';
    segSlider.style.width = er.width + 'px';
  };
  setTimeout(() => {
    const sel = segCtrl.querySelector('.seg-sel');
    if (sel) moveSlider(sel);
  }, 50);
  segOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      segOpts.forEach(o => o.classList.remove('seg-sel'));
      opt.classList.add('seg-sel');
      moveSlider(opt);
    });
  });
}

// ==================== INLINE EDIT ====================
const ieVal = document.getElementById('ieVal');
const ieInp = document.getElementById('ieInp');
const ieHint = document.getElementById('ieHint');
const ieActions = document.getElementById('ieActions');
const ieSave = document.getElementById('ieSave');
const ieCancel = document.getElementById('ieCancel');
if (ieVal && ieInp) {
  let ieOrig = ieInp.value;
  const startEdit = () => {
    ieVal.style.display = 'none';
    ieInp.classList.add('ie-show');
    ieActions.classList.add('ie-show');
    ieInp.focus();
    if (ieHint) ieHint.style.display = 'none';
  };
  const endEdit = (save) => {
    if (save) {
      ieOrig = ieInp.value;
      ieVal.textContent = ieInp.value + ' ✏️';
    } else {
      ieInp.value = ieOrig;
    }
    ieVal.style.display = '';
    ieInp.classList.remove('ie-show');
    ieActions.classList.remove('ie-show');
    if (ieHint) { ieHint.style.display = ''; ieHint.textContent = 'クリックして編集'; }
  };
  ieVal.addEventListener('click', startEdit);
  if (ieSave) ieSave.addEventListener('click', () => endEdit(true));
  if (ieCancel) ieCancel.addEventListener('click', () => endEdit(false));
}

// ==================== OPTIMISTIC UI ====================
const optBtn = document.getElementById('optBtn');
const optToast = document.getElementById('optToast');
if (optBtn) {
  let optState = 'idle';
  optBtn.addEventListener('click', () => {
    if (optState !== 'idle') { optState = 'idle'; optBtn.className = 'opt-btn opt-idle'; optBtn.textContent = '✦ いいね！する'; if(optToast) { optToast.classList.remove('opt-show'); } return; }
    // Optimistic: instantly show success
    optState = 'success';
    optBtn.className = 'opt-btn opt-ok';
    optBtn.textContent = '✅ いいね済み';
    if (optToast) { optToast.classList.add('opt-show'); }
    // Simulate sync in background
    setTimeout(() => { }, 1500);
  });
}

// ==================== CONTEXTUAL ACTION BAR ====================
const ctxItem1 = document.getElementById('ctxItem1');
const ctxBar = document.getElementById('ctxBar');
if (ctxItem1 && ctxBar) {
  ctxItem1.addEventListener('click', () => {
    ctxItem1.classList.toggle('ctx-sel');
    ctxBar.classList.toggle('ctx-hidden', !ctxItem1.classList.contains('ctx-sel'));
  });
}

// ==================== SHARED LAYOUT (filter chips) ====================
const shlChips = document.getElementById('shlChips');
if (shlChips) {
  shlChips.querySelectorAll('.shl-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      shlChips.querySelectorAll('.shl-chip').forEach(c => c.classList.remove('shl-on'));
      chip.classList.add('shl-on');
    });
  });
}

// ==================== LAYERED CARD STACK ====================
const layeredStackDemo = document.getElementById('layeredStackDemo');
if (layeredStackDemo) {
  layeredStackDemo.addEventListener('click', () => {
    const stack = layeredStackDemo.querySelector('.ls-stack');
    const cards = stack.querySelectorAll('.ls-card');
    const first = cards[0];
    first.style.transition = 'all .4s cubic-bezier(.34,1.56,.64,1)';
    first.style.transform = 'translateX(200px) rotate(15deg) scale(.8)';
    first.style.opacity = '0';
    setTimeout(() => {
      first.style.transition = 'none';
      first.style.transform = '';
      first.style.opacity = '';
      stack.appendChild(first);
      // reorder z-index
      stack.querySelectorAll('.ls-card').forEach((c, i) => {
        c.style.zIndex = 3 - i;
        c.style.top = (i * 7) + 'px';
        c.style.left = (i * 7) + 'px';
        c.style.filter = `brightness(${1 - i * 0.17})`;
      });
    }, 380);
  });
}

// ==================== COMMAND MENU (typing sim) ====================
const cmuInp = document.getElementById('cmuInp');
const cmuResults = document.getElementById('cmuResults');
if (cmuInp && cmuResults) {
  const allCmds = [
    { icon: '📄', name: 'New Document', key: '⌘N' },
    { icon: '🎨', name: 'Open Design System', key: '⌘D' },
    { icon: '✦', name: 'Ask AI...', key: '⌘/' },
    { icon: '⚙️', name: 'Settings', key: '⌘,' },
    { icon: '📊', name: 'Analytics Dashboard', key: '' },
    { icon: '👥', name: 'Team Members', key: '' },
    { icon: '🚀', name: 'Deploy to Production', key: '' },
  ];
  cmuInp.removeAttribute('readonly');
  cmuInp.addEventListener('input', () => {
    const q = cmuInp.value.toLowerCase();
    const filtered = q ? allCmds.filter(c => c.name.toLowerCase().includes(q)) : allCmds.slice(0, 4);
    cmuResults.innerHTML = '';
    filtered.forEach((cmd, i) => {
      const row = document.createElement('div');
      row.className = 'cmu-row' + (i === 0 ? ' cmu-focus' : '');
      row.innerHTML = `<span class="cmu-ri">${cmd.icon}</span><span class="cmu-rn">${cmd.name}</span><span class="cmu-rm">${cmd.key ? `<span class="cmu-rk">${cmd.key}</span>` : ''}</span>`;
      cmuResults.appendChild(row);
    });
    if (!filtered.length) {
      cmuResults.innerHTML = '<div class="cmu-row" style="color:rgba(255,255,255,.3);justify-content:center">No results</div>';
    }
  });
}

// ==================== LOTTIE MICRO ====================
const ltLike = document.getElementById('ltLike');
const ltCheck = document.getElementById('ltCheck');
const ltStar = document.getElementById('ltStar');
const fireAnim = (el, cls) => {
  if (!el) return;
  el.classList.remove(cls);
  void el.offsetWidth; // reflow
  el.classList.add(cls);
  el.addEventListener('animationend', () => el.classList.remove(cls), { once: true });
};
if (ltLike) ltLike.addEventListener('click', () => fireAnim(ltLike, 'lt-like'));
if (ltCheck) ltCheck.addEventListener('click', () => fireAnim(ltCheck, 'lt-check'));
if (ltStar) ltStar.addEventListener('click', () => fireAnim(ltStar, 'lt-star'));

// ==================== RANGE SLIDER ====================
const rsTrack1 = document.getElementById('rsTrack1');
const rsVal1 = document.getElementById('rsVal1');
const rsTrack2 = document.getElementById('rsTrack2');
const rsVal2 = document.getElementById('rsVal2');
function updateSlider(track, valEl, formatter) {
  if (!track || !valEl) return;
  const pct = (track.value - track.min) / (track.max - track.min) * 100;
  track.style.setProperty('--pct', pct + '%');
  valEl.textContent = formatter(track.value);
}
if (rsTrack1) {
  rsTrack1.style.setProperty('--pct', '72%');
  rsTrack1.addEventListener('input', () => updateSlider(rsTrack1, rsVal1, v => v));
}
if (rsTrack2) {
  rsTrack2.style.setProperty('--pct', '45%');
  rsTrack2.addEventListener('input', () => updateSlider(rsTrack2, rsVal2, v => '¥' + (parseInt(v) * 1000).toLocaleString()));
}

// ==================== OTP INPUT ====================
const otpInputs = document.querySelectorAll('.otp-d');
const otpStatus = document.getElementById('otpStatus');
otpInputs.forEach((inp, i) => {
  inp.addEventListener('input', () => {
    inp.value = inp.value.replace(/[^0-9]/g, '').slice(-1);
    if (inp.value && i < otpInputs.length - 1) otpInputs[i + 1].focus();
    const code = [...otpInputs].map(x => x.value).join('');
    if (otpStatus) {
      if (code.length === 6) {
        otpStatus.textContent = '✓ コード認証中...';
        otpStatus.style.color = 'var(--green)';
      } else {
        otpStatus.textContent = `${code.length}/6桁 入力してください`;
        otpStatus.style.color = '';
      }
    }
  });
  inp.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && !inp.value && i > 0) otpInputs[i - 1].focus();
  });
  inp.addEventListener('paste', e => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
    [...paste.slice(0, 6)].forEach((ch, j) => { if (otpInputs[i + j]) otpInputs[i + j].value = ch; });
    const next = Math.min(i + paste.length, 5);
    otpInputs[next].focus();
  });
});

// ==================== MULTI-TAG INPUT ====================
const mtWrap = document.getElementById('mtWrap');
const mtInput = document.getElementById('mtInput');
function removeTag(btn) {
  btn.closest('.mt-chip').remove();
}
if (mtWrap) {
  mtWrap.addEventListener('click', e => {
    if (e.target.classList.contains('mt-rm')) removeTag(e.target);
  });
}
if (mtInput) {
  mtInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && mtInput.value.trim()) {
      e.preventDefault();
      const chip = document.createElement('div');
      chip.className = 'mt-chip';
      chip.innerHTML = mtInput.value.trim() + ' <button class="mt-rm">×</button>';
      mtWrap.insertBefore(chip, mtInput);
      mtInput.value = '';
    }
    if (e.key === 'Backspace' && !mtInput.value) {
      const chips = mtWrap.querySelectorAll('.mt-chip');
      if (chips.length) chips[chips.length - 1].remove();
    }
  });
}

// ==================== PASSWORD STRENGTH ====================
const pwInp = document.getElementById('pwInp');
const pwEye = document.getElementById('pwEye');
const pwLbl = document.getElementById('pwLbl');
const pwBars = [document.getElementById('pwB1'), document.getElementById('pwB2'), document.getElementById('pwB3'), document.getElementById('pwB4')];
const pwReqs = [document.getElementById('pwR1'), document.getElementById('pwR2'), document.getElementById('pwR3'), document.getElementById('pwR4')];
const pwRules = [v => v.length >= 8, v => /[A-Z]/.test(v), v => /[0-9]/.test(v), v => /[^A-Za-z0-9]/.test(v)];
const pwLabels = ['弱い', '普通', '強い', '最強'];
const pwColors = ['var(--red)', 'var(--yellow)', 'var(--accent2)', 'var(--green)'];
if (pwInp) {
  pwInp.addEventListener('input', () => {
    const v = pwInp.value;
    const score = pwRules.filter(fn => fn(v)).length;
    pwBars.forEach((b, i) => {
      if (!b) return;
      b.style.background = i < score ? pwColors[score - 1] : 'var(--surface3)';
      b.style.transform = i < score ? 'scaleX(1)' : 'scaleX(0.3)';
    });
    if (pwLbl) pwLbl.textContent = v.length === 0 ? 'パスワードを入力してください' : pwLabels[score - 1] || '弱い';
    if (pwLbl) pwLbl.style.color = v.length ? pwColors[score - 1] : '';
    pwReqs.forEach((r, i) => {
      if (!r) return;
      r.classList.toggle('pw-met', pwRules[i](v));
    });
  });
}
if (pwEye) {
  pwEye.addEventListener('click', () => {
    pwInp.type = pwInp.type === 'password' ? 'text' : 'password';
    pwEye.textContent = pwInp.type === 'password' ? '👁' : '🙈';
  });
}

// ==================== FILE DROP ZONE ====================
const fdZone = document.getElementById('fdZone');
const fdInput = document.getElementById('fdInput');
const fdBrowse = document.getElementById('fdBrowse');
const fdBadge = document.getElementById('fdBadge');
if (fdZone) {
  fdZone.addEventListener('dragover', e => { e.preventDefault(); fdZone.classList.add('fd-over'); });
  fdZone.addEventListener('dragleave', () => fdZone.classList.remove('fd-over'));
  fdZone.addEventListener('drop', e => {
    e.preventDefault();
    fdZone.classList.remove('fd-over');
    handleFiles(e.dataTransfer.files);
  });
}
if (fdBrowse && fdInput) {
  fdBrowse.addEventListener('click', () => fdInput.click());
  fdInput.addEventListener('change', () => handleFiles(fdInput.files));
}
function handleFiles(files) {
  if (!files || !files.length) return;
  if (fdBadge) {
    fdBadge.textContent = files.length === 1 ? files[0].name : `${files.length} ファイル選択中`;
    fdBadge.style.display = 'inline-block';
  }
  const fdTitle = fdZone && fdZone.querySelector('.fd-title');
  if (fdTitle) fdTitle.textContent = '✓ ファイル選択済み';
}

// ==================== PRICING TOGGLE ====================
const prtChk = document.getElementById('prtChk');
const prtP1 = document.getElementById('prtP1');
const prtP2 = document.getElementById('prtP2');
const prtS1 = document.getElementById('prtS1');
const prtS2 = document.getElementById('prtS2');
if (prtChk) {
  prtChk.addEventListener('change', () => {
    const yearly = prtChk.checked;
    if (prtP1) { prtP1.style.opacity = '0'; setTimeout(() => { prtP1.textContent = yearly ? '¥784' : '¥980'; prtP1.style.opacity = '1'; }, 200); }
    if (prtP2) { prtP2.style.opacity = '0'; setTimeout(() => { prtP2.textContent = yearly ? '¥2,384' : '¥2,980'; prtP2.style.opacity = '1'; }, 200); }
    if (prtS1) prtS1.textContent = yearly ? '/月 (年払い)' : '/月';
    if (prtS2) prtS2.textContent = yearly ? '/月 (年払い)' : '/月';
  });
}

// ==================== COUNTDOWN TIMER ====================
(function() {
  const cdH = document.getElementById('cdH');
  const cdM = document.getElementById('cdM');
  const cdS = document.getElementById('cdS');
  if (!cdH || !cdM || !cdS) return;
  let total = 2 * 3600 + 45 * 60 + 30;
  const tick = () => {
    if (total <= 0) { cdH.textContent = '00'; cdM.textContent = '00'; cdS.textContent = '00'; return; }
    total--;
    cdH.textContent = String(Math.floor(total / 3600)).padStart(2, '0');
    cdM.textContent = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    cdS.textContent = String(total % 60).padStart(2, '0');
    [cdH, cdM, cdS].forEach(el => {
      el.style.transform = 'translateY(-3px)';
      setTimeout(() => el.style.transform = '', 150);
    });
  };
  setInterval(tick, 1000);
})();

// ==================== COPY TO CLIPBOARD ====================
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy;
    const orig = btn.textContent;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '✓ コピー済み';
      btn.style.color = 'var(--green)';
      btn.style.borderColor = 'var(--green)';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    }).catch(() => {
      btn.textContent = 'エラー';
      setTimeout(() => { btn.textContent = orig; }, 1500);
    });
  });
});

// ==================== STEP WIZARD ====================
(function() {
  const stepsEl = document.getElementById('swzSteps');
  const contentEl = document.getElementById('swzContent');
  const backBtn = document.getElementById('swzBack');
  const nextBtn = document.getElementById('swzNext');
  if (!stepsEl) return;
  let current = 1;
  const contents = [
    'ステップ 1: アカウント情報を入力してください。',
    'ステップ 2: プロフィール情報を入力してください。',
    'ステップ 3: 入力内容をご確認ください。',
    '🎉 ステップ 4: 設定が完了しました！'
  ];
  function render() {
    const steps = stepsEl.querySelectorAll('.swz-step');
    steps.forEach((s, i) => {
      s.className = 'swz-step';
      if (i < current) s.classList.add('swz-done');
      else if (i === current) s.classList.add('swz-active');
      else s.classList.add('swz-todo');
      const circle = s.querySelector('.swz-circle');
      if (circle) circle.textContent = i < current ? '✓' : String(i + 1);
    });
    if (contentEl) contentEl.textContent = contents[current];
    if (backBtn) backBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === steps.length - 1;
    if (nextBtn) nextBtn.textContent = current === steps.length - 2 ? '完了 ✓' : '次へ →';
  }
  if (nextBtn) nextBtn.addEventListener('click', () => { if (current < 3) { current++; render(); } });
  if (backBtn) backBtn.addEventListener('click', () => { if (current > 0) { current--; render(); } });
  render();
})();

// ==================== ANNOUNCE BAR CLOSE ====================
document.querySelectorAll('.ab-x').forEach(btn => {
  btn.addEventListener('click', () => {
    const strip = btn.closest('.ab-strip');
    if (strip) { strip.style.opacity = '0'; strip.style.maxHeight = '0'; strip.style.padding = '0'; setTimeout(() => strip.remove(), 300); }
  });
});

// ==================== COOKIE CONSENT ====================
const ckAccept = document.getElementById('ckAccept');
const ckDecline = document.getElementById('ckDecline');
const ckPanel = document.querySelector('.ck-panel');
function ckDismiss(accepted) {
  if (!ckPanel) return;
  ckPanel.style.opacity = '0';
  ckPanel.style.transform = 'translateY(10px)';
  setTimeout(() => {
    const ckIco = ckPanel.querySelector('.ck-ico');
    const ckText = ckPanel.querySelector('.ck-text');
    const ckBtns = ckPanel.querySelector('.ck-btns');
    if (ckIco) ckIco.textContent = accepted ? '✓' : '✕';
    if (ckText) ckText.textContent = accepted ? 'クッキーを許可しました。' : 'クッキーを拒否しました。';
    if (ckBtns) ckBtns.style.display = 'none';
    ckPanel.style.opacity = '1';
    ckPanel.style.transform = '';
  }, 300);
}
if (ckAccept) ckAccept.addEventListener('click', () => ckDismiss(true));
if (ckDecline) ckDecline.addEventListener('click', () => ckDismiss(false));

// ==================== DRAG & DROP REORDER ====================
(function() {
  const ddList = document.getElementById('ddList');
  if (!ddList) return;
  let dragging = null;
  ddList.addEventListener('dragstart', e => {
    dragging = e.target.closest('.dd-item');
    if (dragging) setTimeout(() => dragging.classList.add('dd-drag'), 0);
  });
  ddList.addEventListener('dragend', () => {
    if (dragging) dragging.classList.remove('dd-drag');
    ddList.querySelectorAll('.dd-over').forEach(el => el.classList.remove('dd-over'));
    dragging = null;
  });
  ddList.addEventListener('dragover', e => {
    e.preventDefault();
    const target = e.target.closest('.dd-item');
    if (target && target !== dragging) {
      ddList.querySelectorAll('.dd-over').forEach(el => el.classList.remove('dd-over'));
      target.classList.add('dd-over');
      const rect = target.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      if (e.clientY < mid) ddList.insertBefore(dragging, target);
      else ddList.insertBefore(dragging, target.nextSibling);
    }
  });
  ddList.addEventListener('dragleave', e => {
    const target = e.target.closest('.dd-item');
    if (target) target.classList.remove('dd-over');
  });
  ddList.addEventListener('drop', e => {
    e.preventDefault();
    ddList.querySelectorAll('.dd-over').forEach(el => el.classList.remove('dd-over'));
  });
})();

// ==================== SEARCH (updated with dynamic count) ====================
const _totalCards = document.querySelectorAll('.ecard').length;
countEl.textContent = _totalCards + ' エフェクト';
searchEl.oninput = () => {
  const q = searchEl.value.toLowerCase();
  let vis = 0;
  document.querySelectorAll('.ecard').forEach(c => {
    const match = !q || (c.dataset.name||'').includes(q);
    c.classList.toggle('hidden', !match);
    c.classList.toggle('highlight', !!(q && match));
    if(match) vis++;
  });
  countEl.textContent = q ? `${vis} / ${_totalCards} エフェクト` : `${_totalCards} エフェクト`;