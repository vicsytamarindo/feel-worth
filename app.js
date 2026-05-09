// =================== Storage ===================
const S = {
  get(k, d) { try { const v = localStorage.getItem('worth.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { localStorage.setItem('worth.' + k, JSON.stringify(v)); },
  del(k)    { localStorage.removeItem('worth.' + k); }
};

// =================== Language ===================
let lang = S.get('lang', (navigator.language || 'en').toLowerCase().startsWith('it') ? 'it' : 'en');
function t(key) { return I18N[lang][key] ?? I18N.en[key] ?? key; }

function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); el.setAttribute('aria-label', t(el.dataset.i18nTitle)); });
  document.getElementById('lang-toggle').textContent = lang === 'en' ? 'IT' : 'EN';
  setHeader(currentScreen);
  renderHere();
  renderBreathe();
  renderLetters();
  renderLetterbox();
  if (!breatheRunning) {
    document.getElementById('breathe-label').textContent = t('breathe.tap');
    document.getElementById('breathe-toggle').textContent = t('breathe.begin');
  }
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  lang = lang === 'en' ? 'it' : 'en';
  S.set('lang', lang);
  applyLanguage();
});

// =================== Navigation ===================
const screens = ['here','breathe','letters'];
let currentScreen = 'here';

function setHeader(name) {
  document.getElementById('screen-title').textContent = t('title.' + name);
  document.getElementById('screen-sub').textContent = t('sub.' + name);
}
function show(name) {
  currentScreen = name;
  screens.forEach(s => document.getElementById(s).classList.toggle('active', s === name));
  document.querySelectorAll('nav.tabs button').forEach(b => b.classList.toggle('active', b.dataset.screen === name));
  setHeader(name);
  closeAbout();
}
document.querySelectorAll('nav.tabs button').forEach(b => {
  b.addEventListener('click', () => show(b.dataset.screen));
});

// =================== Date helpers ===================
function todayKey() {
  const d = new Date();
  const pad = n => String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}
function fmtDate(ts) {
  return new Date(ts).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
function fmtDateTime(ts) {
  return new Date(ts).toLocaleString(lang === 'it' ? 'it-IT' : 'en-US', { dateStyle: 'short', timeStyle: 'short' });
}

// =================== HERE ===================
// Storage shape:
//   phrases: array of { date: 'YYYY-MM-DD', category: 'gratitude', text: '...' }
//   today's entry is the one whose date === todayKey()
function getPhrases() { return S.get('phrases', []); }
function setPhrases(arr) { S.set('phrases', arr); }
function todayPhrase() {
  return getPhrases().find(p => p.date === todayKey()) || null;
}
function pastPhrases() {
  return getPhrases().filter(p => p.date !== todayKey()).sort((a,b) => b.date.localeCompare(a.date));
}

// HERE state machine: 'choose' | 'write' | 'locked'
let hereState = 'choose';
let hereCategory = null;
let browseIndex = 0;

function renderHere() {
  const root = document.getElementById('here-content');
  root.innerHTML = '';

  const today = todayPhrase();
  if (today) hereState = 'locked';
  else if (hereState === 'locked') hereState = 'choose'; // reset across days

  if (hereState === 'locked') {
    root.appendChild(buildLockedView(today));
  } else if (hereState === 'write') {
    root.appendChild(buildWriteView(hereCategory));
  } else {
    root.appendChild(buildChooseView());
  }
}

function buildChooseView() {
  const wrap = document.createElement('div');
  const card = document.createElement('div'); card.className = 'card';
  const title = document.createElement('div'); title.className = 'cat-title'; title.textContent = t('here.entryTitle');
  const hint = document.createElement('p'); hint.className = 'cat-hint'; hint.textContent = t('here.entryHint');
  card.appendChild(title); card.appendChild(hint);

  const grid = document.createElement('div'); grid.className = 'cat-grid';
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-card';
    btn.style.setProperty('--tint', CATEGORY_TINTS[cat]);
    const lab = document.createElement('div'); lab.className = 'cat-label'; lab.textContent = t('cat.' + cat + '.label');
    const helper = document.createElement('div'); helper.className = 'cat-helper'; helper.textContent = t('cat.' + cat + '.helper');
    btn.appendChild(lab); btn.appendChild(helper);
    btn.addEventListener('click', () => {
      hereCategory = cat;
      hereState = 'write';
      renderHere();
    });
    grid.appendChild(btn);
  });
  card.appendChild(grid);
  wrap.appendChild(card);

  const past = pastPhrases();
  if (past.length >= 1) {
    const div = document.createElement('div'); div.className = 'divider';
    div.appendChild(document.createTextNode(t('here.orKeepPast')));
    wrap.appendChild(div);

    browseIndex = Math.min(browseIndex, past.length - 1);
    const c2 = document.createElement('div'); c2.className = 'card past-card';
    const cat = document.createElement('div'); cat.className = 'past-cat';
    cat.textContent = t('cat.' + past[browseIndex].category + '.label');
    const text = document.createElement('div'); text.className = 'past-text';
    text.textContent = '“' + past[browseIndex].text + '”';
    const date = document.createElement('div'); date.className = 'past-date';
    date.textContent = fmtDate(past[browseIndex].date + 'T00:00:00');
    c2.appendChild(cat); c2.appendChild(text); c2.appendChild(date);

    const acts = document.createElement('div'); acts.className = 'actions center';
    if (past.length >= 2) {
      const shuffle = document.createElement('button');
      shuffle.className = 'pill tiny';
      shuffle.textContent = t('here.another');
      shuffle.addEventListener('click', () => {
        let n = browseIndex;
        while (n === browseIndex) n = Math.floor(Math.random() * past.length);
        browseIndex = n;
        renderHere();
      });
      acts.appendChild(shuffle);
    }
    const use = document.createElement('button');
    use.className = 'pill tiny primary';
    use.textContent = past.length === 1 ? t('here.keepYesterday') : t('here.useThis');
    use.addEventListener('click', () => {
      const chosen = past[browseIndex];
      const phrases = getPhrases();
      phrases.push({ date: todayKey(), category: chosen.category, text: chosen.text });
      setPhrases(phrases);
      hereState = 'locked';
      renderHere();
    });
    acts.appendChild(use);
    c2.appendChild(acts);
    wrap.appendChild(c2);
  }

  return wrap;
}

function buildWriteView(cat) {
  const card = document.createElement('div'); card.className = 'card';

  const prompt = document.createElement('p'); prompt.className = 'write-prompt';
  prompt.textContent = t('cat.' + cat + '.helper');
  const label = document.createElement('h3'); label.className = 'write-cat-label';
  label.textContent = t('cat.' + cat + '.label');
  card.appendChild(prompt); card.appendChild(label);

  const ta = document.createElement('textarea');
  ta.className = 'write-area';
  ta.placeholder = t('here.writePlaceholder');
  ta.maxLength = 280;
  ta.autofocus = true;
  card.appendChild(ta);

  const err = document.createElement('div'); err.className = 'error-text';
  card.appendChild(err);

  const acts = document.createElement('div'); acts.className = 'write-actions';
  const reset = document.createElement('button');
  reset.className = 'reset-link';
  reset.textContent = t('here.reset');
  reset.addEventListener('click', () => {
    hereCategory = null;
    hereState = 'choose';
    renderHere();
  });
  const keep = document.createElement('button');
  keep.className = 'pill primary';
  keep.textContent = t('here.keep');
  keep.addEventListener('click', () => {
    const text = ta.value.trim();
    if (!text) { err.textContent = t('here.tooShort'); return; }
    const phrases = getPhrases();
    phrases.push({ date: todayKey(), category: cat, text });
    setPhrases(phrases);
    hereState = 'locked';
    renderHere();
  });
  acts.appendChild(reset);
  acts.appendChild(keep);
  card.appendChild(acts);

  setTimeout(() => ta.focus(), 30);
  return card;
}

function buildLockedView(p) {
  const card = document.createElement('div'); card.className = 'card';
  const wrap = document.createElement('div'); wrap.className = 'locked';

  const badge = document.createElement('span'); badge.className = 'badge';
  badge.textContent = t('here.savedFor');
  const cat = document.createElement('div'); cat.className = 'from-cat';
  cat.textContent = t('cat.' + p.category + '.label');
  const phr = document.createElement('div'); phr.className = 'phrase';
  phr.textContent = '“' + p.text + '”';
  const sub = document.createElement('div'); sub.className = 'sub-note';
  sub.textContent = t('here.savedSub');

  wrap.appendChild(badge);
  wrap.appendChild(cat);
  wrap.appendChild(phr);
  wrap.appendChild(sub);
  card.appendChild(wrap);
  return card;
}

// =================== BREATHE ===================
let currentPattern = S.get('pattern', 'calm');
let breatheRunning = false;
let breatheAbort = null;
const orb = document.getElementById('orb');
const breatheLabel = document.getElementById('breathe-label');
const breatheToggle = document.getElementById('breathe-toggle');

function renderBreathe() {
  const row = document.getElementById('pattern-row');
  row.innerHTML = '';
  Object.keys(PATTERNS).forEach(key => {
    const b = document.createElement('button');
    b.className = 'pill' + (key === currentPattern ? ' active' : '');
    b.textContent = t('breathe.' + key + '.label');
    b.addEventListener('click', () => {
      currentPattern = key;
      S.set('pattern', key);
      stopBreathing();
      renderBreathe();
    });
    row.appendChild(b);
  });
  document.getElementById('pattern-desc').textContent = t('breathe.' + currentPattern + '.desc');
}

function setOrb(scale, durationMs) {
  orb.style.transition = `transform ${durationMs}ms ease-in-out`;
  orb.style.transform = `scale(${scale})`;
}
function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    if (signal) signal.addEventListener('abort', () => { clearTimeout(id); reject(); });
  });
}
async function runBreath() {
  const ctrl = new AbortController();
  breatheAbort = ctrl;
  const p = PATTERNS[currentPattern];
  try {
    while (!ctrl.signal.aborted) {
      breatheLabel.textContent = t('breathe.in');
      setOrb(1.1, p.in * 1000);
      await wait(p.in * 1000, ctrl.signal);
      if (p.hold1 > 0) {
        breatheLabel.textContent = t('breathe.hold');
        await wait(p.hold1 * 1000, ctrl.signal);
      }
      breatheLabel.textContent = t('breathe.out');
      setOrb(0.6, p.out * 1000);
      await wait(p.out * 1000, ctrl.signal);
      if (p.hold2 > 0) {
        breatheLabel.textContent = t('breathe.hold');
        await wait(p.hold2 * 1000, ctrl.signal);
      }
    }
  } catch { /* aborted */ }
}
function stopBreathing() {
  breatheRunning = false;
  if (breatheAbort) breatheAbort.abort();
  setOrb(0.6, 600);
  breatheLabel.textContent = t('breathe.tap');
  breatheToggle.textContent = t('breathe.begin');
}
breatheToggle.addEventListener('click', () => {
  if (breatheRunning) {
    stopBreathing();
  } else {
    breatheRunning = true;
    breatheToggle.textContent = t('breathe.stop');
    runBreath();
  }
});

// =================== LETTERS ===================
function getLetters() { return S.get('letters', []); }
function saveLetters(arr) { S.set('letters', arr); }

function renderLetters() {
  // Form labels are static via data-i18n; nothing dynamic here.
  document.getElementById('open-box-btn').textContent = t('letters.openBox');
}

// Send modal
const sendBackdrop = document.getElementById('send-modal-backdrop');
const sendChange = document.getElementById('send-change-when');
const sendChips = document.getElementById('send-chips');
const sendCustom = document.getElementById('send-custom-time');
let sendChoice = 'anytime';

function openSendModal() {
  sendChoice = 'anytime';
  sendChange.checked = false;
  sendChips.classList.remove('show');
  sendCustom.classList.remove('show');
  sendCustom.value = '';
  document.querySelectorAll('#send-chips .pill').forEach(b => b.classList.toggle('active', b.dataset.opt === 'anytime'));
  sendBackdrop.classList.add('show');
}
function closeSendModal() { sendBackdrop.classList.remove('show'); }

document.getElementById('letter-send').addEventListener('click', () => {
  const subject = document.getElementById('letter-subject').value.trim();
  const body = document.getElementById('letter-body').value.trim();
  if (!subject && !body) return;
  openSendModal();
});

document.getElementById('send-cancel').addEventListener('click', closeSendModal);
sendBackdrop.addEventListener('click', (e) => { if (e.target === sendBackdrop) closeSendModal(); });

sendChange.addEventListener('change', () => {
  if (sendChange.checked) {
    sendChips.classList.add('show');
    if (!S.get('explainer-seen', false)) openExplainer();
  } else {
    sendChips.classList.remove('show');
    sendCustom.classList.remove('show');
    sendChoice = 'anytime';
    document.querySelectorAll('#send-chips .pill').forEach(b => b.classList.toggle('active', b.dataset.opt === 'anytime'));
  }
});

document.querySelectorAll('#send-chips .pill').forEach(btn => {
  btn.addEventListener('click', () => {
    sendChoice = btn.dataset.opt;
    document.querySelectorAll('#send-chips .pill').forEach(b => b.classList.toggle('active', b === btn));
    sendCustom.classList.toggle('show', sendChoice === 'custom');
    if (sendChoice === 'custom' && !sendCustom.value) {
      const d = new Date(); d.setMonth(d.getMonth() + 1); d.setHours(9, 0, 0, 0);
      const pad = n => String(n).padStart(2,'0');
      sendCustom.value = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
  });
});

function computeOpenAfter() {
  if (!sendChange.checked) return null;
  const now = new Date();
  switch (sendChoice) {
    case 'week':   { const d = new Date(now); d.setDate(d.getDate() + 7); return d.getTime(); }
    case 'month':  { const d = new Date(now); d.setMonth(d.getMonth() + 1); return d.getTime(); }
    case 'three':  { const d = new Date(now); d.setMonth(d.getMonth() + 3); return d.getTime(); }
    case 'year':   { const d = new Date(now); d.setFullYear(d.getFullYear() + 1); return d.getTime(); }
    case 'custom': { const v = sendCustom.value; return v ? new Date(v).getTime() : null; }
    default: return null;
  }
}

document.getElementById('send-confirm').addEventListener('click', () => {
  const subject = document.getElementById('letter-subject').value.trim();
  const body = document.getElementById('letter-body').value.trim();
  const openAfter = computeOpenAfter();
  const letters = getLetters();
  letters.push({
    id: Date.now() + '-' + Math.random().toString(36).slice(2, 8),
    subject, body,
    openAfter,
    createdAt: Date.now(),
    read: true,        // self-authored — start as read
    favorite: false,
  });
  saveLetters(letters);
  // clear form
  document.getElementById('letter-subject').value = '';
  document.getElementById('letter-body').value = '';
  closeSendModal();
  showToast(t('toast.sent'));
  renderLetterbox();
});

// Sealed-letter explainer
const explainerBackdrop = document.getElementById('explainer-backdrop');
function openExplainer() { explainerBackdrop.classList.add('show'); }
function closeExplainer() {
  explainerBackdrop.classList.remove('show');
  S.set('explainer-seen', true);
}
document.getElementById('explainer-dismiss').addEventListener('click', closeExplainer);

// =================== LETTERBOX ===================
const boxBackdrop = document.getElementById('box-backdrop');
function openLetterbox() {
  renderLetterbox();
  boxBackdrop.classList.add('show');
}
function closeLetterbox() { boxBackdrop.classList.remove('show'); }
document.getElementById('open-box-btn').addEventListener('click', openLetterbox);
document.getElementById('box-close').addEventListener('click', closeLetterbox);
boxBackdrop.addEventListener('click', (e) => { if (e.target === boxBackdrop) closeLetterbox(); });

function renderLetterbox() {
  const list = document.getElementById('box-list');
  const empty = document.getElementById('box-empty');
  const letters = getLetters().slice().sort((a, b) => {
    if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
    return b.createdAt - a.createdAt;
  });
  list.innerHTML = '';
  if (letters.length === 0) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  const now = Date.now();

  letters.forEach(L => {
    const sealed = L.openAfter && L.openAfter > now;
    const li = document.createElement('li');
    if (!L.read && !sealed) li.classList.add('unread');

    const row = document.createElement('div'); row.className = 'l-row';
    const subj = document.createElement('div'); subj.className = 'l-subj';
    if (!L.read && !sealed) {
      const dot = document.createElement('span'); dot.className = 'new-dot';
      subj.appendChild(dot);
    }
    subj.appendChild(document.createTextNode(L.subject || '—'));
    const when = document.createElement('div'); when.className = 'l-when';
    when.textContent = fmtDate(L.createdAt);
    row.appendChild(subj); row.appendChild(when);
    li.appendChild(row);

    const preview = document.createElement('div'); preview.className = 'l-preview';
    if (sealed) {
      preview.classList.add('l-sealed');
      preview.textContent = '🔒 ' + t('box.sealedUntil') + ' ' + fmtDateTime(L.openAfter);
    } else {
      preview.textContent = (L.body || '').replace(/\s+/g, ' ').slice(0, 80);
    }
    li.appendChild(preview);

    if (!sealed) {
      const body = document.createElement('div'); body.className = 'l-body';
      body.textContent = L.body || '';
      li.appendChild(body);

      const acts = document.createElement('div'); acts.className = 'l-actions';
      const star = document.createElement('button');
      star.className = 'icon-btn star' + (L.favorite ? ' on' : '');
      star.innerHTML = L.favorite ? '★' : '☆';
      star.title = t(L.favorite ? 'box.unfavorite' : 'box.favorite');
      star.setAttribute('aria-label', star.title);
      star.addEventListener('click', (e) => {
        e.stopPropagation();
        const all = getLetters(); const idx = all.findIndex(x => x.id === L.id);
        if (idx >= 0) { all[idx].favorite = !all[idx].favorite; saveLetters(all); renderLetterbox(); }
      });
      const readBtn = document.createElement('button');
      readBtn.className = 'icon-btn';
      readBtn.innerHTML = L.read ? '◐' : '●';
      readBtn.title = t(L.read ? 'box.markUnread' : 'box.markRead');
      readBtn.setAttribute('aria-label', readBtn.title);
      readBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const all = getLetters(); const idx = all.findIndex(x => x.id === L.id);
        if (idx >= 0) { all[idx].read = !all[idx].read; saveLetters(all); renderLetterbox(); }
      });
      const burn = document.createElement('button');
      burn.className = 'icon-btn burn';
      burn.innerHTML = '🔥';
      burn.title = t('box.burn');
      burn.setAttribute('aria-label', burn.title);
      burn.addEventListener('click', (e) => {
        e.stopPropagation();
        confirmBurn(L.id);
      });
      acts.appendChild(star);
      acts.appendChild(readBtn);
      acts.appendChild(burn);
      li.appendChild(acts);

      li.addEventListener('click', (e) => {
        if (e.target.closest('.l-actions')) return;
        const wasOpen = li.classList.contains('open');
        li.classList.toggle('open');
        if (!wasOpen && !L.read) {
          const all = getLetters(); const idx = all.findIndex(x => x.id === L.id);
          if (idx >= 0) { all[idx].read = true; saveLetters(all); renderLetterbox(); }
        }
      });
    }

    list.appendChild(li);
  });
}

// Burn flow (two-step)
const burn1 = document.getElementById('burn1-backdrop');
const burn2 = document.getElementById('burn2-backdrop');
let burnTargetId = null;
function confirmBurn(id) {
  burnTargetId = id;
  burn1.classList.add('show');
}
document.getElementById('burn1-cancel').addEventListener('click', () => { burn1.classList.remove('show'); burnTargetId = null; });
document.getElementById('burn1-yes').addEventListener('click', () => {
  burn1.classList.remove('show');
  burn2.classList.add('show');
});
document.getElementById('burn2-cancel').addEventListener('click', () => { burn2.classList.remove('show'); burnTargetId = null; });
document.getElementById('burn2-yes').addEventListener('click', () => {
  if (burnTargetId) {
    saveLetters(getLetters().filter(x => x.id !== burnTargetId));
    burnTargetId = null;
  }
  burn2.classList.remove('show');
  renderLetterbox();
});

// =================== Toast ===================
function showToast(text) {
  let el = document.getElementById('toast');
  if (el) el.remove();
  el = document.createElement('div');
  el.id = 'toast';
  el.className = 'toast';
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => { if (el && el.parentNode) el.parentNode.removeChild(el); }, 2600);
}

// =================== About bubble ===================
const aboutBtn = document.getElementById('about-btn');
const aboutPop = document.getElementById('about-pop');
let aboutOpen = false;
function openAbout() {
  aboutOpen = true;
  document.getElementById('about-title').textContent = t('about.' + currentScreen + '.title');
  document.getElementById('about-body').textContent = t('about.' + currentScreen + '.body');
  aboutPop.style.display = 'block';
}
function closeAbout() {
  aboutOpen = false;
  aboutPop.style.display = 'none';
}
aboutBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  aboutOpen ? closeAbout() : openAbout();
});
document.addEventListener('click', (e) => {
  if (aboutOpen && !aboutPop.contains(e.target) && e.target !== aboutBtn) closeAbout();
});

// =================== Tutorial ===================
const tutBackdrop = document.getElementById('tut-backdrop');
const tutCounter = document.getElementById('tut-counter');
const tutTitle = document.getElementById('tut-title');
const tutBody = document.getElementById('tut-body');
const tutNext = document.getElementById('tut-next');
const tutSkip = document.getElementById('tut-skip');
let tutStep = 0;
const TUT_STEPS = 5;

function openTutorial() {
  tutStep = 0;
  renderTutStep();
  tutBackdrop.classList.add('show');
}
function renderTutStep() {
  tutCounter.textContent = `${tutStep + 1} / ${TUT_STEPS}`;
  tutTitle.textContent = t('tut.' + tutStep + '.title');
  tutBody.textContent = t('tut.' + tutStep + '.body');
  tutNext.textContent = tutStep === TUT_STEPS - 1 ? t('tut.done') : t('tut.next');
}
function closeTutorial() {
  tutBackdrop.classList.remove('show');
  S.set('tutorial-done', true);
}
tutNext.addEventListener('click', () => {
  if (tutStep === TUT_STEPS - 1) closeTutorial();
  else { tutStep++; renderTutStep(); }
});
tutSkip.addEventListener('click', closeTutorial);

// =================== Init ===================
applyLanguage();
show('here');

if (!S.get('tutorial-done', false)) {
  setTimeout(openTutorial, 300);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
