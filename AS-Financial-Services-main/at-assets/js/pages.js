/* Shared page renderers (services, lenders, reviews, FAQ, contact form) */
(function (g) {
  const { icon, esc, $, toast, V, setErr, inr, fmtAmt } = g.UI; const B = g.UI.base;
  const DB = () => g.AT.DB;

  function services(el, limit) {
    el.innerHTML = DB().loans().slice(0, limit || 99).map(l =>
      '<article class="card svc hover reveal"><div class="svc-img" style="background:' + l.grad + '">' + icon(l.icon) + '</div><div class="svc-body"><span class="tag">From ' + esc(l.rate.split(' – ')[0]) + ' p.a. (sample)</span><h3>' + esc(l.name) + '</h3><p>' + esc(l.desc) + '</p><a class="btn btn-outline btn-sm" href="' + B + 'service.html?id=' + l.id + '">Explore More ' + icon('arrow') + '</a></div></article>').join('');
    g.UI.reveal();
  }
  function lenders(el, limit) {
    el.innerHTML = DB().lenders().filter(l => l.enabled).slice(0, limit || 99).map(l =>
      '<div class="card lender hover reveal"><div class="lg" style="background:' + l.color + '">' + esc(l.name.split(' ').map(w => w[0]).slice(0, 2).join('')) + '</div><h3 style="font-size:1.1rem">' + esc(l.name) + '</h3><p>Sample rate from ' + l.rate + '% p.a.</p><p style="margin-top:6px"><span class="tag">Demo listing</span></p></div>').join('');
    g.UI.reveal();
  }
  function reviews(el) {
    el.innerHTML = DB().site().testimonials.map(t =>
      '<div class="card review hover reveal"><div class="stars">' + '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating) + '</div><p>“' + esc(t.text) + '”</p><div class="who"><div class="avatar">' + g.UI.initials(t.name) + '</div><div><b style="color:var(--navy)">' + esc(t.name) + '</b><div style="font-size:.8rem;color:var(--muted)">' + esc(t.role) + '</div></div></div></div>').join('');
    g.UI.reveal();
  }
  function ratingAvg() { const t = DB().site().testimonials; return t.length ? (t.reduce((a, b) => a + b.rating, 0) / t.length).toFixed(1) : '–'; }
  function faqs(el) {
    el.innerHTML = DB().site().faqs.map(f => '<div class="faq-item"><button class="faq-q">' + esc(f.q) + icon('chev') + '</button><div class="faq-a">' + esc(f.a) + '</div></div>').join('');
    g.UI.accordion(el);
  }
  function contactForm(form) {
    const cust = g.AT.Auth.customer(); const q = new URLSearchParams(location.search);
    if (cust) { form.elements.name.value = cust.name; form.email.value = cust.email; form.phone.value = cust.mobile; }
    if (q.get('topic') === 'emi' && form.message && !form.message.value) form.message.value = 'I used the EMI calculator (amount ₹' + (+q.get('amount') || '').toLocaleString('en-IN') + ', rate ' + q.get('rate') + '%, tenure ' + q.get('tenure') + ' months) and would like expert guidance.';
    if (q.get('service') && form.message && !form.message.value) form.message.value = 'I would like guidance on ' + q.get('service') + '.';
    form.addEventListener('submit', e => {
      e.preventDefault(); let ok = true;
      ok = setErr(form.elements.name, form.elements.name.value.trim().length < 2 ? 'Please enter your full name.' : '') && ok;
      ok = setErr(form.email, !V.email(form.email.value.trim()) ? 'Enter a valid email address.' : '') && ok;
      ok = setErr(form.phone, !V.mobile(form.phone.value.trim()) ? 'Enter a valid 10-digit Indian mobile number.' : '') && ok;
      ok = setErr(form.message, form.message.value.trim().length < 10 ? 'Please add a short message (min. 10 characters).' : '') && ok;
      if (!ok) return;
      DB().addEnquiry({ name: form.elements.name.value.trim(), email: form.email.value.trim(), phone: form.phone.value.trim(), message: form.message.value.trim(), customerId: cust ? cust.id : undefined });
      form.reset(); toast('Thank you! Your enquiry has been submitted (demo).', 'ok');
    });
  }
  function contactFormHtml() {
    return '<form class="form-grid" novalidate><div><label class="lbl">Full name</label><input class="input" name="name" placeholder="Your name"></div><div><label class="lbl">Mobile number</label><input class="input" name="phone" placeholder="10-digit mobile" inputmode="numeric" maxlength="10"></div><div class="full"><label class="lbl">Email</label><input class="input" name="email" type="email" placeholder="you@example.com"></div><div class="full"><label class="lbl">How can we help?</label><textarea class="input" name="message" rows="4" placeholder="Tell us about your requirement…"></textarea></div><div class="full"><button class="btn btn-navy btn-block" type="submit">Send Enquiry</button></div></form>';
  }
  function contactInfo() {
    const wa = 'https://wa.me/919182703079?text=' + encodeURIComponent('Hello AS Financial Services, I would like loan guidance.');
    const maps = 'https://maps.google.com/?q=Panchavati+Colony+Road+No+1+Medipalli+Hyderabad+500098';
    return '<a class="info-line" href="tel:+919182703079"><div class="ic">' + icon('phone') + '</div><div><b style="color:var(--navy)">+91 91827 03079</b><div style="color:var(--muted);font-size:.85rem">Mon–Sat · 9:30 AM–7:00 PM</div></div></a>' +
      '<a class="info-line" href="mailto:asfinancialservicesandsolution@gmail.com"><div class="ic">' + icon('mail') + '</div><div><b style="color:var(--navy)">asfinancialservicesandsolution@gmail.com</b><div style="color:var(--muted);font-size:.85rem">Email us for assistance</div></div></a>' +
      '<a class="info-line" href="' + maps + '" target="_blank" rel="noopener"><div class="ic">' + icon('building') + '</div><div><b style="color:var(--navy)">Visit our office</b><div style="color:var(--muted);font-size:.85rem">Panchavati Colony Road No. 1, Medipalli, Hyderabad, Telangana 500098</div><div style="color:var(--navy);font-size:.82rem;font-weight:600;margin-top:4px">Get directions</div></div></a>' +
      '<a class="btn wa" target="_blank" rel="noopener" href="' + wa + '">' + icon('msg') + ' Chat on WhatsApp</a>';
  }
  /* indicative eligibility: 50% FOIR, reducing-balance present value */
  function eligible(income, existing, rate, months) {
    const emiCap = Math.max(0, income * 0.5 - existing); const r = rate / 12 / 100;
    const pv = emiCap <= 0 ? 0 : (r === 0 ? emiCap * months : emiCap * (Math.pow(1 + r, months) - 1) / (r * Math.pow(1 + r, months)));
    return { emiCap, amount: Math.floor(pv / 10000) * 10000 };
  }
  function eligibilityModal(l) {
    const tenure = Math.min(l.maxTen, 60 * (l.types.indexOf('home-loan') >= 0 ? 4 : 1));
    const m = g.UI.modal('<p style="color:var(--muted);margin-bottom:16px">Indicative check for <b>' + esc(l.name) + '</b> at ' + l.rate + '% over ' + g.UI.fmtTen(tenure) + '. Eligibility criteria: ' + esc(l.elig) + '. <b>Demo calculation only — no credit bureau is contacted.</b></p>' +
      '<div class="form-grid"><div><label class="lbl">Monthly income (₹)</label><input class="input" id="el-inc" type="number" min="0" placeholder="e.g. 60000"></div><div><label class="lbl">Existing monthly EMIs (₹)</label><input class="input" id="el-emi" type="number" min="0" value="0"></div></div>' +
      '<div id="el-res" style="margin:20px 0"></div><div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-gold" id="el-go">Check Eligibility</button></div>', { title: 'Check Eligibility' });
    g.UI.$('#el-go', m).onclick = () => {
      const inc = +g.UI.$('#el-inc', m).value, ex = +g.UI.$('#el-emi', m).value || 0;
      if (!(inc > 0)) { toast('Enter your monthly income.', 'err'); return; }
      const r = eligible(inc, ex, l.rate, tenure); const amt = Math.min(r.amount, l.maxAmt);
      g.UI.$('#el-res', m).innerHTML = amt >= l.minAmt
        ? '<div class="card" style="background:#F1FBF5;border-color:#BFE8D0"><b style="color:var(--ok)">Indicatively eligible</b><div style="font:700 1.8rem var(--serif);color:var(--navy)">up to ' + inr(amt) + '</div><small style="color:var(--muted)">Affordable EMI ≈ ' + inr(r.emiCap) + '/month (50% of income less existing EMIs). Not a lender decision.</small><div style="margin-top:14px"><a class="btn btn-navy btn-sm" href="' + B + 'apply.html?amount=' + amt + '&lender=' + l.id + '">Proceed to Apply</a></div></div>'
        : '<div class="card" style="background:#FFF4F4;border-color:#F3C6C6"><b style="color:var(--bad)">Below minimum amount</b><p style="color:var(--muted);font-size:.9rem">Based on these inputs, the indicative amount is below this lender\'s sample minimum of ' + inr(l.minAmt) + '. Try a different lender or talk to an expert.</p></div>';
    };
  }
  g.Pages = { services, lenders, reviews, faqs, contactForm, contactFormHtml, contactInfo, ratingAvg, eligible, eligibilityModal };
})(window);
