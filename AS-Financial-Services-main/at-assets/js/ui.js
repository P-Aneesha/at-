/* AS Financial Services – shared UI: header, footer, icons, toast, modal, search, helpers */
(function (g) {
  const B = document.body.dataset.base || '';
  const ICONS = {
    home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>', users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3.5-5.5 7-5.5s7 2 7 5.5M16 4.5a3.5 3.5 0 010 7M22 20c0-2.6-1.8-4.4-4-5"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/>', grad: '<path d="M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/>',
    car: '<path d="M5 16l1.5-6A2 2 0 018.4 8.5h7.2a2 2 0 011.9 1.5L19 16M3 16h18v3H3zM7 19v2M17 19v2"/><circle cx="7.5" cy="16" r=".5"/><circle cx="16.5" cy="16" r=".5"/>',
    building: '<path d="M4 21V4h10v17M14 9h6v12M8 8h2M8 12h2M8 16h2M2 21h20"/>', wallet: '<rect x="3" y="6" width="18" height="14" rx="2.5"/><path d="M3 10h18M16 15h2"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>', check: '<path d="M5 12l4 4 10-10"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    map: '<path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>', search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/>', bell: '<path d="M6 16V11a6 6 0 0112 0v5l2 2H4zM10 21h4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>', chev: '<path d="M6 9l6 6 6-6"/>', star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    file: '<path d="M6 3h8l5 5v13H6zM14 3v5h5"/>', upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>', logout: '<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>', chart: '<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>', edit: '<path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4"/>', trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', eyeoff: '<path d="M3 3l18 18M10 6a9 9 0 0112 6 12 12 0 01-3 4M6 7.5C3.5 9 2 12 2 12s4 7 10 7a9 9 0 004-1"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>', heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/>',
    msg: '<path d="M4 5h16v11H9l-5 4z"/>', arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    layout: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/>',
    percent: '<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>', calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2"/>'
  };
  const icon = (n, cls) => '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[n] || '') + '</svg>';
  const inr = n => '₹' + Math.round(+n || 0).toLocaleString('en-IN');
  const fmtAmt = n => n >= 10000000 ? (n / 10000000).toFixed(n % 10000000 ? 1 : 0) + ' Cr' : n >= 100000 ? (n / 100000).toFixed(n % 100000 ? 1 : 0) + ' L' : n.toLocaleString('en-IN');
  const fmtTen = m => m % 12 === 0 && m >= 24 ? m / 12 + ' yrs' : m + ' mo';
  const fmtDate = d => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const initials = n => String(n).split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();

  /* toast */
  function toast(msg, type) {
    let box = $('.toasts'); if (!box) { box = document.createElement('div'); box.className = 'toasts'; document.body.appendChild(box); }
    const t = document.createElement('div'); t.className = 'toast ' + (type || ''); t.textContent = msg; box.appendChild(t);
    setTimeout(() => { t.style.opacity = 0; t.style.transition = '.4s'; setTimeout(() => t.remove(), 400); }, 3600);
  }
  /* modal */
  function modal(html, opts) {
    opts = opts || {};
    const o = document.createElement('div'); o.className = 'overlay show';
    o.innerHTML = '<div class="modal ' + (opts.wide ? 'wide' : '') + '" role="dialog" aria-modal="true"><div class="modal-head"><h3>' + (opts.title || '') + '</h3><button class="icon-btn" data-close aria-label="Close">' + icon('x') + '</button></div><div class="modal-body">' + html + '</div></div>';
    const close = () => { o.remove(); document.removeEventListener('keydown', esc_); };
    const esc_ = e => { if (e.key === 'Escape') close(); };
    o.addEventListener('click', e => { if (e.target === o || e.target.closest('[data-close]')) close(); });
    document.addEventListener('keydown', esc_); document.body.appendChild(o);
    o.close = close; return o;
  }
  function confirmBox(msg, onYes) {
    const m = modal('<p style="margin-bottom:22px">' + esc(msg) + '</p><div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-outline btn-sm" data-close>Cancel</button><button class="btn btn-danger btn-sm" id="cf-yes">Confirm</button></div>', { title: 'Please confirm' });
    $('#cf-yes', m).onclick = () => { m.close(); onYes(); };
  }

  /* header / footer */
  function header(active) {
    const A = g.AT; const cust = A.Auth.customer();
    if (cust) {
      return '<header class="nav customer-nav"><div class="container nav-in">' +
        '<a class="logo" href="' + B + 'dashboard.html"><span class="logo-mark">AT</span><span>AS Financial Services<small>Customer portal</small></span></a>' +
        '<div class="customer-nav-actions"><a class="btn btn-outline btn-sm" href="' + B + 'dashboard.html">Dashboard</a>' +
        '<a class="btn btn-gold btn-sm" href="' + B + 'login.html" data-logout>Logout</a></div>' +
        '</div></header>';
    }
    const loans = A.DB.loans();
    const ddServices = loans.map(l => '<li><a href="' + B + 'service.html?id=' + l.id + '">' + esc(l.name) + '</a></li>').join('') + '<li><a href="' + B + 'services.html"><b>View all services →</b></a></li>';
    const cls = k => active === k ? 'active' : '';
    const login = cust
      ? '<a class="btn btn-outline btn-sm" href="' + B + 'dashboard.html">' + icon('user') + ' ' + esc(cust.name.split(' ')[0]) + '</a>'
      : '<a class="btn btn-outline btn-sm" href="' + B + 'login.html">Login</a>';
    return '<div class="demo-strip">Demonstration website — all rates, lenders and applications are sample data, not real financial offers.</div>' +
      '<header class="nav"><div class="container nav-in"><a class="logo" href="' + B + 'index.html"><span class="logo-mark">AT</span><span>AS Financial Services<small>Financial Services</small></span></a>' +
      '<ul class="menu" id="menu">' +
      '<li><a class="' + cls('home') + '" href="' + B + 'index.html">Home</a></li>' +
      '<li><a class="' + cls('about') + '" href="' + B + 'about.html">About</a></li>' +
      '<li><a class="' + cls('services') + '" href="' + B + 'services.html">Services ' + icon('chev') + '</a><ul class="dd">' + ddServices + '</ul></li>' +
      '<li><a class="' + cls('lenders') + '" href="' + B + 'lenders.html">Lenders ' + icon('chev') + '</a><ul class="dd"><li><a href="' + B + 'lenders.html">Lender Partners</a></li><li><a href="' + B + 'compare.html">Compare Loans</a></li></ul></li>' +
      '<li><a class="' + cls('guides') + '" href="' + B + 'guides.html">Guides</a></li>' +
      '<li><a class="' + cls('emi') + '" href="' + B + 'emi-calculator.html">EMI Calculator</a></li>' +
      '<li><a class="' + cls('contact') + '" href="' + B + 'contact.html">Contact</a></li></ul>' +
      '<div class="nav-actions"><button class="icon-btn" id="search-btn" aria-label="Search">' + icon('search') + '</button>' + login +
      '<button class="icon-btn burger" id="burger" aria-label="Menu">' + icon('menu') + '</button></div></div></header>';
  }
  function footer() {
    if (g.AT.Auth.customer()) {
      return '<footer class="footer"><div class="container"><div class="foot-bottom"><span>© 2026 AS Financial Services. Customer portal demonstration.</span><span>All data is simulated.</span></div></div></footer>';
    }
    const loans = g.AT.DB.loans();
    return '<footer class="footer"><div class="container"><div class="foot-grid"><div><a class="logo" href="' + B + 'index.html"><span class="logo-mark">AT</span><span>AS Financial Services</span></a><p>Premium financial guidance and loan assistance. We help you compare options and prepare your application with clarity.</p></div>' +
      '<div><h4>Services</h4>' + loans.slice(0, 6).map(l => '<a href="' + B + 'service.html?id=' + l.id + '">' + esc(l.name) + '</a>').join('') + '</div>' +
      '<div><h4>Company</h4><a href="' + B + 'about.html">About Us</a><a href="' + B + 'lenders.html">Lender Partners</a><a href="' + B + 'compare.html">Compare Loans</a><a href="' + B + 'emi-calculator.html">EMI Calculator</a><a href="' + B + 'guides.html">Guides</a><a href="' + B + 'contact.html">Contact</a></div>' +
      '<div><h4>Account</h4><a href="' + B + 'login.html">Customer Login</a><a href="' + B + 'register.html">Create Account</a><a href="' + B + 'apply.html">Apply for a Loan</a><a href="' + B + 'admin/login.html">Admin Login</a><a href="' + B + 'privacy.html">Privacy Policy</a><a href="' + B + 'terms.html">Terms &amp; Conditions</a></div></div>' +
      '<div class="foot-bottom"><span>© 2026 AS Financial Services. Demonstration project — not a real financial institution.</span><span>Rates and lenders shown are sample data.</span></div></div></footer>';
  }

  /* search */
  function openSearch() {
    const m = modal('<input class="input" id="sq" placeholder="Search services, lenders, guides, pages…" autofocus><div class="search-res" id="sres" style="margin-top:14px"></div>', { title: 'Search' });
    const A = g.AT;
    const idx = [].concat(
      A.DB.loans().map(l => ({ t: l.name, s: 'Service', u: 'service.html?id=' + l.id, k: l.desc })),
      A.DB.lenders().filter(l => l.enabled).map(l => ({ t: l.name, s: 'Lender', u: 'lenders.html', k: l.elig })),
      A.DB.guides().map(x => ({ t: x.title, s: 'Guide', u: 'guides.html?id=' + x.id, k: x.body })),
      [['About Us', 'about.html'], ['Contact Us', 'contact.html'], ['EMI Calculator', 'emi-calculator.html'], ['Compare Loans', 'compare.html'], ['Apply for a Loan', 'apply.html'], ['Customer Login', 'login.html'], ['Register', 'register.html'], ['Privacy Policy', 'privacy.html'], ['Terms & Conditions', 'terms.html']].map(p => ({ t: p[0], s: 'Page', u: p[1], k: '' })));
    const run = () => {
      const q = $('#sq', m).value.trim().toLowerCase();
      const r = idx.filter(x => !q || (x.t + ' ' + x.k).toLowerCase().includes(q)).slice(0, 8);
      $('#sres', m).innerHTML = r.length ? r.map(x => '<a href="' + B + x.u + '"><span>' + esc(x.t) + '</span><small>' + x.s + '</small></a>').join('') : '<p style="color:var(--muted)">No results found.</p>';
    };
    $('#sq', m).addEventListener('input', run); run(); setTimeout(() => $('#sq', m).focus(), 50);
  }

  function accordion(root) {
    $$('.faq-q', root).forEach(b => b.onclick = () => { const it = b.parentElement; const was = it.classList.contains('open'); $$('.faq-item', root).forEach(i => i.classList.remove('open')); if (!was) it.classList.add('open'); });
  }
  function reveal() {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    $$('.reveal').forEach(el => io.observe(el));
  }
  function pwToggle(root) {
    $$('.pw', root).forEach(w => { const i = $('input', w), b = $('button', w); if (!b) return; b.innerHTML = icon('eye'); b.onclick = () => { const show = i.type === 'password'; i.type = show ? 'text' : 'password'; b.innerHTML = icon(show ? 'eyeoff' : 'eye'); }; });
  }
  /* validation helpers */
  const V = {
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
    mobile: v => /^[6-9]\d{9}$/.test(v),
    pass: v => v.length >= 8 && /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v)
  };
  function setErr(input, msg) {
    const f = input.closest('div:not(.pw):not(.num-box)'); let m = f.querySelector('.err-msg'); if (!m) { m = document.createElement('div'); m.className = 'err-msg'; f.appendChild(m); }
    input.classList.toggle('err', !!msg); m.textContent = msg || '';
    return !msg;
  }
  function wireDemoLink(root) {
    $$('[data-logout]', root).forEach(b => b.onclick = e => { e.preventDefault(); g.AT.Auth.logoutCustomer(); toast('You have been logged out.'); setTimeout(() => location.href = B + 'login.html', 500); });
  }

  /* guards */
  const Guard = {
    customer() { if (!g.AT.Auth.customer()) { location.replace(B + 'login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.hash)); return false; } return true; },
    admin() {
      if (!g.AT.Auth.admin()) {
        const who = g.AT.Auth.customer() ? '?denied=1' : '';
        location.replace(B + 'admin/login.html' + who); return false;
      } return true;
    }
  };

  function mount(active, opts) {
    opts = opts || {};
    const h = $('#site-header'); if (h) { h.innerHTML = header(active); }
    const f = $('#site-footer'); if (f) f.innerHTML = footer();
    const bg = $('#burger'); if (bg) bg.onclick = () => { $('#menu').classList.toggle('open'); };
    const sb = $('#search-btn'); if (sb) sb.onclick = openSearch;
    reveal(); pwToggle(document); wireDemoLink(document);
    if ('scrollRestoration' in history) history.scrollRestoration = 'auto';
  }

  g.UI = { icon, inr, fmtAmt, fmtTen, fmtDate, esc, $, $$, toast, modal, confirmBox, mount, accordion, reveal, pwToggle, V, setErr, Guard, initials, base: B, openSearch };
})(window);
