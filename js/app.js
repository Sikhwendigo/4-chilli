/* ═══════════════════════════════════════════════════════════
   4 CHILLI — behaviour
   Depends on menu-data.js (MENU, SIGNATURES, HOURS, HOLIDAYS, SHOP)
   ═══════════════════════════════════════════════════════════ */
(() => {
'use strict';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand = (a) => a[Math.floor(Math.random() * a.length)];

const money = (n) => 'R' + (Number.isInteger(n) ? n : n.toFixed(2));
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────────── Reveal on scroll */
const revealables = '.reveal, .card, .contact, .shelf__item';
function armReveal(root = document) {
  $$(revealables, root).forEach(el => {
    if (el.hasAttribute('data-rev')) return;
    el.setAttribute('data-rev', '');
  });
}
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (!e.isIntersecting) return;
    e.target.style.setProperty('--rev-d', Math.min(i * 60, 320) + 'ms');
    e.target.classList.add('is-in');
    revealIO.unobserve(e.target);
  });
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

function observeReveals() {
  $$('[data-rev]:not(.is-in)').forEach(el => revealIO.observe(el));
}

/* ─────────────────────────────────────────── Nav */
const nav = $('#nav');
const navProgress = $('#navProgress');
const navLinks = $('#navLinks');
const navToggle = $('#navToggle');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navLinks.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* Scroll-spy */
const spySections = ['signatures', 'menu', 'story', 'visit'];
const spyIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    $$('[data-nav]').forEach(a =>
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });

/* ─────────────────────────────────────────── Scroll loop (progress, chrome) */
const toTop = $('#toTop');
let ticking = false;

function onScroll() {
  const y = window.scrollY;
  const vh = window.innerHeight;
  const max = document.documentElement.scrollHeight - vh;

  nav.classList.toggle('is-stuck', y > 24);
  navProgress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  toTop.classList.toggle('is-on', y > vh * 0.9);
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
}, { passive: true });

toTop.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

/* ─────────────────────────────────────────── Count-up stats */
const countIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, dur = 1400;
    if (reduced) { el.textContent = target; countIO.unobserve(el); return; }
    const t0 = performance.now();
    (function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
    countIO.unobserve(el);
  });
}, { threshold: 0.6 });

/* ─────────────────────────────────────────── Heat rating: up to four chillies */
const heatDots = (n, cls = '') =>
  `<span class="heat ${cls}" title="Heat ${n} of 4" aria-label="Heat level ${n} of 4">` +
  [0, 1, 2, 3].map(i => `<svg viewBox="0 0 64 64" class="${i < n ? 'on' : ''}" aria-hidden="true"><use href="#i-chilli"/></svg>`).join('') +
  `</span>`;

/* ─────────────────────────────────────────── Signature cards */
$('#signatureCards').innerHTML = SIGNATURES.map((s, i) => `
  <article class="card">
    <div class="card__media">
      <span class="card__n">${String(i + 1).padStart(2, '0')}</span>
      <img src="${esc(s.img)}" alt="${esc(s.alt)}" loading="lazy" decoding="async" width="800" height="600" />
      <span class="card__tag">${esc(s.tag)}</span>
    </div>
    <div class="card__body">
      <h3 class="card__name">${esc(s.name)}</h3>
      <p class="card__desc">${esc(s.desc)}</p>
      <div class="card__foot">
        <span class="card__from"><small>From</small>${money(s.from)}</span>
        ${heatDots(s.heat, 'heat--lg')}
        <a class="card__go" href="#menu" data-jump="${s.jump}" aria-label="See ${esc(s.name)} on the menu">
          <svg width="18" height="18" aria-hidden="true"><use href="#i-arrow"/></svg>
        </a>
      </div>
    </div>
  </article>`).join('');

/* ─────────────────────────────────────────── Menu render */
const rail = $('#menuRail');
const body = $('#menuBody');

const colWidth = (n) => (n >= 4 ? 78 : n === 3 ? 88 : n === 1 ? 100 : 94);

rail.innerHTML = MENU.map((s, i) =>
  `<button role="tab" data-rail="${s.id}"${i === 0 ? ' class="is-active"' : ''}>${esc(s.short)}</button>`
).join('');

body.innerHTML = MENU.map(sec => {
  const cw = colWidth(sec.cols.length);
  const multi = sec.cols.length > 1;

  /* grouped column captions (e.g. bunny chow) */
  let groupRow = '';
  if (sec.cols.some(c => c.group)) {
    const runs = [];
    sec.cols.forEach(c => {
      const last = runs[runs.length - 1];
      if (last && last.label === c.group) last.n++;
      else runs.push({ label: c.group || '', n: 1 });
    });
    groupRow = `<div class="mcols__grouprow">${runs.map(r =>
      `<em class="mcols__g" style="width:calc(${r.n} * var(--cw) + ${r.n - 1} * .4rem)">${esc(r.label)}</em>`
    ).join('')}</div>`;
  }

  const header = multi ? `
    <div class="mcols">
      <div class="mcols__spacer"></div>
      <div class="mcols__stack">
        ${groupRow}
        <div class="mcols__row">
          ${sec.cols.map(c => `<span class="mcols__c">${esc(c.label)}</span>`).join('')}
        </div>
      </div>
    </div>` : '';

  const groups = sec.groups.map(g => {
    const gh = g.name ? `<h4 class="mgroup__head">${esc(g.name)}${g.note ? ` <span>${esc(g.note)}</span>` : ''}</h4>` : '';
    const rows = g.items.map(it => {
      const key = `${sec.id}|${it.name}|${it.note || ''}`;
      const prices = it.prices.map((p, i) => {
        const col = sec.cols[i] || {};
        const label = col.label || '';
        // a column's full descriptor keeps otherwise-identical labels distinct
        // (e.g. bunny chow's two "¼" columns: hollow loaf vs deconstructed)
        const size = multi ? (col.group ? `${label} · ${col.group}` : label) : '';
        if (p == null) return `<span class="mprice mprice--empty" aria-hidden="true">—</span>`;
        const aria = `Add ${it.name}${it.note ? ' ' + it.note : ''}${size ? ', ' + size : ''}, ${money(p)}, to your order`;
        return `<button class="mprice" type="button"
                  data-add="${esc(key)}" data-size="${esc(size)}" data-price="${p}"
                  aria-label="${esc(aria)}">
                  <span class="mprice__label">${esc(multi ? (col.short ? `${label} ${col.short}` : label) : '')}</span>
                  <span class="mprice__row">
                    <span class="mprice__val">${money(p)}</span>
                    <span class="mprice__add" aria-hidden="true">+</span>
                  </span>
                </button>`;
      }).join('');

      return `<div class="mitem" data-diet="${it.diet}" data-search="${esc((it.name + ' ' + (it.note || '') + ' ' + sec.name).toLowerCase())}">
          <div class="mitem__main">
            <span class="dot dot--${it.diet}" title="${it.diet}"></span>
            <span class="mitem__name">${esc(it.name)}</span>
            ${it.note ? `<span class="mitem__note">${esc(it.note)}</span>` : ''}
            ${it.heat ? heatDots(it.heat) : ''}
          </div>
          <div class="mitem__prices">${prices}</div>
        </div>`;
    }).join('');
    return gh + rows;
  }).join('');

  return `<section class="msec" id="sec-${sec.id}" style="--cw:${cw}px">
      <header class="msec__head">
        <h3 class="msec__title">${esc(sec.name)}</h3>
        <p class="msec__tagline">${esc(sec.tagline)}</p>
      </header>
      ${header}
      ${groups}
    </section>`;
}).join('') + `<div class="mempty" id="menuEmpty" hidden><b>Nothing matches that</b>Try a different search, or clear your filters.</div>`;

/* ─────────────────────────────────────────── Menu filtering */
const searchInput = $('#menuSearch');
const searchClear = $('#searchClear');
let diet = 'all';
let query = '';

function dietOk(v) {
  if (diet === 'all') return true;
  if (diet === 'veg') return v === 'veg' || v === 'vegan';
  return v === diet;
}

function applyFilters() {
  const q = query.trim().toLowerCase();
  let total = 0;

  $$('.msec').forEach(sec => {
    let shown = 0;
    $$('.mitem', sec).forEach(item => {
      const ok = dietOk(item.dataset.diet) && (!q || item.dataset.search.includes(q));
      item.classList.toggle('is-hidden', !ok);
      if (ok) shown++;

      // highlight
      const nameEl = $('.mitem__name', item);
      const raw = nameEl.textContent;
      nameEl.innerHTML = (q && ok && raw.toLowerCase().includes(q))
        ? esc(raw).replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'), '<mark>$1</mark>')
        : esc(raw);
    });
    sec.classList.toggle('is-hidden', shown === 0);
    total += shown;
  });

  $('#menuEmpty').hidden = total > 0;
  searchClear.hidden = !query;
}

searchInput.addEventListener('input', (e) => { query = e.target.value; applyFilters(); });
searchClear.addEventListener('click', () => { query = ''; searchInput.value = ''; applyFilters(); searchInput.focus(); });

$$('.filters .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    $$('.filters .chip').forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    diet = chip.dataset.diet;
    applyFilters();
  });
});

/* ─────────────────────────────────────────── Rail navigation */
function jumpTo(id) {
  const el = $('#sec-' + id);
  if (!el) return;
  // clear the sticky nav and the sticky section rail, measured rather than hard-coded
  const offset = nav.offsetHeight + $('.railwrap').offsetHeight + 12;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
}

rail.addEventListener('click', (e) => {
  const b = e.target.closest('[data-rail]');
  if (b) jumpTo(b.dataset.rail);
});

document.addEventListener('click', (e) => {
  const j = e.target.closest('[data-jump]');
  if (!j) return;
  e.preventDefault();
  // clear filters so the target is guaranteed visible
  query = ''; searchInput.value = ''; diet = 'all';
  $$('.filters .chip').forEach(c => c.classList.toggle('is-active', c.dataset.diet === 'all'));
  applyFilters();
  setTimeout(() => jumpTo(j.dataset.jump), 60);
});

/* Centre a rail pill by moving ONLY the rail's own scrollLeft.
   scrollIntoView() must not be used here: it scrolls every scrollable
   ancestor including the document, so it yanks the page while the user
   is scrolling the menu. */
function centreRailPill(b) {
  const bRect = b.getBoundingClientRect();
  const rRect = rail.getBoundingClientRect();
  const delta = (bRect.left + bRect.width / 2) - (rRect.left + rRect.width / 2);
  const max = rail.scrollWidth - rail.clientWidth;
  const left = Math.max(0, Math.min(rail.scrollLeft + delta, max));
  if (Math.abs(left - rail.scrollLeft) < 2) return;
  rail.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' });
}

/* keep the rail pill in sync + auto-scroll the rail */
let activeRailId = null;
const railIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id.replace('sec-', '');
    if (id === activeRailId) return;      // don't re-fire for the same section
    activeRailId = id;
    $$('[data-rail]').forEach(b => {
      const on = b.dataset.rail === id;
      b.classList.toggle('is-active', on);
      if (on) centreRailPill(b);
    });
  });
}, { rootMargin: '-25% 0px -65% 0px' });

/* ─────────────────────────────────────────── Order tray */
const STORE = '4chilli.order.v1';
const tray = $('#tray'), scrim = $('#scrim'), fab = $('#trayFab');
let order = [];
let orderText = '';   // plain-text order, shared by WhatsApp + copy fallback

try { order = JSON.parse(localStorage.getItem(STORE)) || []; } catch { order = []; }

/* Order reference: a short code (time + two letters, e.g. 1418-KX) that appears in the
   WhatsApp message, the docket and the sent notice. The owner confirms "#1418-KX" and
   both sides know which order is meant. It stays fixed while the customer edits the
   basket, and a basket left for hours, or edited after sending, gets a fresh one. */
const REF_STORE = '4chilli.ref.v1';
const REF_TTL = 6 * 60 * 60 * 1000;
let orderRef = null;
try {
  const r = JSON.parse(localStorage.getItem(REF_STORE));
  if (r && Date.now() - r.at < REF_TTL) orderRef = r;
} catch { orderRef = null; }

function saveRef() {
  try {
    if (orderRef) localStorage.setItem(REF_STORE, JSON.stringify(orderRef));
    else localStorage.removeItem(REF_STORE);
  } catch { /* private mode */ }
}
function resetRef() { orderRef = null; saveRef(); }

function currentRef() {
  if (!orderRef || Date.now() - orderRef.at > REF_TTL) {
    const d = new Date();
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';   // no I or O: easy to read out over the phone
    const pick = () => letters[Math.floor(Math.random() * letters.length)];
    const hhmm = String(d.getHours()).padStart(2, '0') + String(d.getMinutes()).padStart(2, '0');
    orderRef = { code: `${hhmm}-${pick()}${pick()}`, at: Date.now(), sent: false };
    saveRef();
  }
  return orderRef.code;
}

/* any change after the order was sent is a new order, so it gets a new reference */
function touchRef() { if (orderRef && orderRef.sent) resetRef(); }

function save() {
  try { localStorage.setItem(STORE, JSON.stringify(order)); } catch { /* private mode */ }
}

function itemLabel(o) {
  const [, name, note] = o.key.split('|');
  return name + (note ? ` (${note})` : '');
}

function renderTray() {
  const count = order.reduce((n, o) => n + o.qty, 0);
  const total = order.reduce((n, o) => n + o.qty * o.price, 0);

  fab.hidden = count === 0;
  $('#trayCount').textContent = count;
  $('#trayTotal').textContent = money(Math.round(total * 100) / 100);
  if (!count) resetRef();
  $('#trayMeta').textContent = count
    ? `Order #${currentRef()} · ${count} item${count > 1 ? 's' : ''}`
    : 'Nothing added yet';

  $('#trayItems').innerHTML = order.length ? order.map((o, i) => `
    <div class="trow">
      <div>
        <div class="trow__name">${esc(itemLabel(o))}</div>
        <div class="trow__meta">${o.size ? esc(o.size) + ' · ' : ''}${money(o.price)} each</div>
      </div>
      <div class="trow__ctrl">
        <button type="button" data-dec="${i}" aria-label="Remove one">−</button>
        <span class="trow__qty">${o.qty}</span>
        <button type="button" data-inc="${i}" aria-label="Add one">+</button>
      </div>
      <div class="trow__price">${money(Math.round(o.qty * o.price * 100) / 100)}</div>
    </div>`).join('')
    : `<div class="tray__empty">
         <svg viewBox="0 0 64 64" aria-hidden="true"><use href="#i-chilli"/></svg>
         Your order is empty.<br />Tap any price on the menu to start.
       </div>`;

  orderText = buildMessage(Math.round(total * 100) / 100);
  syncPriceButtons();

  /* WhatsApp deep link. wa.me is the officially supported format; the number
     must be international with no +, spaces or leading zero. */
  const wa = $('#trayWhatsapp');
  if (order.length) {
    wa.href = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(orderText)}`;
    wa.removeAttribute('aria-disabled');
    wa.classList.remove('is-disabled');
  } else {
    wa.removeAttribute('href');            // nothing to send
    wa.setAttribute('aria-disabled', 'true');
    wa.classList.add('is-disabled');
  }

  save();
}

/* Build the message. Long orders get a condensed form — some WhatsApp clients
   silently drop very long ?text= payloads, so we keep the URL well under 2 kB. */
function buildMessage(total) {
  if (!order.length) return '';
  const money2 = (o) => money(Math.round(o.qty * o.price * 100) / 100);
  const tail = `\n\nEstimated total: ${money(total)}\n\nName:\nCollection time:`;

  const full = order.map(o =>
    `• ${o.qty} x ${itemLabel(o)}${o.size ? ` (${o.size})` : ''} - ${money2(o)}`).join('\n');
  const head = `Hi 4 Chilli, I'd like to place order #${currentRef()}:`;
  let msg = `${head}\n\n${full}${tail}`;

  if (encodeURIComponent(msg).length > 1500) {
    const lean = order.map(o =>
      `${o.qty}x ${itemLabel(o)}${o.size ? ` (${o.size})` : ''}`).join('\n');
    msg = `${head}\n\n${lean}${tail}`;
  }
  return msg;
}

/* Show which prices are already in the order, and how many */
function syncPriceButtons() {
  $$('button.mprice').forEach(b => {
    const o = order.find(x => x.key === b.dataset.add && x.size === b.dataset.size);
    b.classList.toggle('is-in', !!o);
    const badge = $('.mprice__add', b);
    if (badge) badge.textContent = o ? `${o.qty}` : '+';
  });
}

function addItem(key, size, price, btn) {
  touchRef();
  const found = order.find(o => o.key === key && o.size === size);
  if (found) found.qty++;
  else order.push({ key, size, price, qty: 1 });
  renderTray();
  toast(`Added ${itemLabel({ key })}${size ? ` · ${size}` : ''}`);
  if (btn) {
    btn.classList.remove('just-added');
    void btn.offsetWidth;
    btn.classList.add('just-added');
    btn.addEventListener('animationend', () => btn.classList.remove('just-added'), { once: true });
  }
}

body.addEventListener('click', (e) => {
  const b = e.target.closest('[data-add]');
  if (!b) return;
  addItem(b.dataset.add, b.dataset.size, +b.dataset.price, b);
});

$('#trayItems').addEventListener('click', (e) => {
  const inc = e.target.closest('[data-inc]'), dec = e.target.closest('[data-dec]');
  if (inc || dec) touchRef();
  if (inc) order[+inc.dataset.inc].qty++;
  else if (dec) {
    const i = +dec.dataset.dec;
    if (--order[i].qty <= 0) order.splice(i, 1);
  } else return;
  renderTray();
});

function openTray(on) {
  tray.classList.toggle('is-open', on);
  tray.setAttribute('aria-hidden', String(!on));
  scrim.classList.toggle('is-on', on);
  document.body.style.overflow = on ? 'hidden' : '';
  if (on) $('#trayClose').focus();
}
fab.addEventListener('click', () => openTray(true));
$('#trayClose').addEventListener('click', () => openTray(false));
scrim.addEventListener('click', () => openTray(false));
$('#trayClear').addEventListener('click', () => { order = []; renderTray(); openTray(false); toast('Order cleared'); });

/* Don't let a disabled (empty) WhatsApp button navigate anywhere.
   Otherwise: let the link open WhatsApp, then show the "wait 5 minutes" notice. */
$('#trayWhatsapp').addEventListener('click', (e) => {
  if (!order.length) { e.preventDefault(); toast('Add something to your order first'); return; }
  $('#sentRef').textContent = '#' + currentRef();
  orderRef.sent = true;
  saveRef();
  setTimeout(() => openModal(true), 800);   // after the hand-off to WhatsApp
});

/* ─────────────────────────────────────────── Post-send notice */
const sentModal = $('#sentModal');

function openModal(on) {
  sentModal.hidden = !on;
  sentModal.classList.toggle('is-on', on);
  if (on) {
    openTray(false);
    document.body.style.overflow = 'hidden';
    $('#sentClose').focus();
  } else {
    document.body.style.overflow = '';
  }
}
$('#sentClose').addEventListener('click', () => openModal(false));
sentModal.addEventListener('click', (e) => { if (e.target === sentModal) openModal(false); });

/* Fallback for when WhatsApp isn't installed or the deep link is blocked */
$('#trayCopy').addEventListener('click', async () => {
  if (!order.length) { toast('Nothing to copy yet'); return; }
  try {
    await navigator.clipboard.writeText(orderText);
    toast('Order copied — paste it into WhatsApp');
  } catch {
    const ta = document.createElement('textarea');
    ta.value = orderText;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-1000px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); toast('Order copied — paste it into WhatsApp'); }
    catch { toast('Could not copy — please screenshot your order'); }
    ta.remove();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (sentModal && !sentModal.hidden) openModal(false);
  else openTray(false);
});

/* ─────────────────────────────────────────── Toast */
let toastT;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('is-on');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('is-on'), 2200);
}

/* ─────────────────────────────────────────── Hours + open status */
const todayIdx = (new Date().getDay() + 6) % 7;   // 0 = Monday

$('#hoursTable tbody').innerHTML = HOURS.map((h, i) => `
  <tr class="${i === todayIdx ? 'is-today' : ''} ${h.open ? '' : 'is-shut'}">
    <td>${h.day}</td>
    <td>${h.open ? `${h.open} – ${h.close}` : 'Closed'}</td>
  </tr>`).join('');

/* local date as YYYY-MM-DD — never use toISOString(), which shifts to UTC
   and would flip the date for anyone east of Greenwich (SA is UTC+2) */
const isoDay = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const holidayOn = (d) => (typeof HOLIDAYS === 'object' && HOLIDAYS) ? HOLIDAYS[isoDay(d)] : undefined;

(function setStatus() {
  const el = $('#openStatus'), txt = $('.status__text', el);
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const fromMin = (v) => `${String(Math.floor(v / 60)).padStart(2, '0')}:${String(v % 60).padStart(2, '0')}`;
  const today = HOURS[todayIdx];
  const todayHoliday = holidayOn(now);

  /* next day that is both a trading day and not a public holiday */
  const nextOpen = () => {
    for (let i = 1; i <= 8; i++) {
      const d = new Date(now); d.setDate(d.getDate() + i);
      const hrs = HOURS[(todayIdx + i) % 7];
      if (hrs.open && !holidayOn(d)) {
        return { at: hrs.open, when: i === 1 ? 'tomorrow' : hrs.day };
      }
    }
    return null;
  };

  if (todayHoliday) {
    el.classList.add('is-closed');
    const n = nextOpen();
    txt.textContent = n
      ? `Closed for ${todayHoliday} · opens ${n.when} at ${n.at}`
      : `Closed for ${todayHoliday}`;
    return;
  }

  if (today.open && mins >= toMin(today.open) && mins < toMin(today.close)) {
    /* the kitchen stops taking food orders before the shop shuts */
    const early = (SHOP && SHOP.kitchenClosesEarlyMins) || 0;
    const kitchenShut = toMin(today.close) - early;
    const left = toMin(today.close) - mins;
    el.classList.add('is-open');

    if (mins >= kitchenShut) {
      txt.textContent = `Shop open · kitchen closed`;
    } else {
      const tillKitchen = kitchenShut - mins;
      txt.textContent = tillKitchen <= 60
        ? `Open · kitchen closes in ${tillKitchen} min`
        : `Open now · kitchen until ${fromMin(kitchenShut)}`;
    }
  } else {
    el.classList.add('is-closed');
    const n = nextOpen();
    const soon = today.open && mins < toMin(today.open);
    txt.textContent = soon
      ? `Closed · opens at ${today.open}`
      : n ? `Closed · opens ${n.when} at ${n.at}` : 'Closed';
  }
})();

/* ─────────────────────────────────────────── Boot */
$('#year').textContent = new Date().getFullYear();
armReveal();
observeReveals();
spySections.forEach(id => { const el = $('#' + id); if (el) spyIO.observe(el); });
$$('.msec').forEach(s => railIO.observe(s));
$$('.count').forEach(el => countIO.observe(el));
renderTray();
onScroll();

})();
