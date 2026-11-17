/* AS Financial Services – demo data store, auth and role-based access.
   SIMULATED SECURITY: everything lives in the browser (localStorage/sessionStorage).
   A production system needs a secure backend: hashed passwords, server-side sessions/JWT,
   server-enforced role checks and a real database. */
(function (g) {
  const P = 'asfs_';
  const J = {
    get(k, d) { try { const v = localStorage.getItem(P + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(P + k, JSON.stringify(v)); } catch (e) {} }
  };
  const hash = s => { let h = 5381; for (const c of String(s)) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0; return 'h' + h.toString(36); };
  const uid = p => p + Math.random().toString(36).slice(2, 8);
  const daysAgo = n => new Date(Date.now() - n * 864e5).toISOString();

  const STATUS = ['Application Submitted', 'Under Review', 'Documents Required', 'Approved', 'Rejected'];
  const STATUS_CLASS = { 'Application Submitted': 'b-sub', 'Under Review': 'b-rev', 'Documents Required': 'b-doc', 'Approved': 'b-ok', 'Rejected': 'b-no' };
  const ADMIN = { email: 'admin@atsolutions.com', passHash: hash('Admin@123'), name: 'Admin User', role: 'ADMIN' };

  const LOANS = [
    { id: 'personal-loan', name: 'Personal Loans', icon: 'wallet', grad: 'linear-gradient(135deg,#0B1F3A,#1d4a85)', rate: '10.5% – 24%', minAmt: 50000, maxAmt: 4000000, tenure: '12 – 60 months', eligibility: 'Age 21–58, salaried or self-employed, min. monthly income ₹20,000', desc: 'Flexible funds for weddings, travel, medical needs or consolidating debt, with minimal paperwork.', docs: ['Identity proof', 'Address proof', 'Last 3 months salary slips', '6 months bank statement'] },
    { id: 'home-loan', name: 'Home Loans', icon: 'home', grad: 'linear-gradient(135deg,#12305A,#2f6f9f)', rate: '8.4% – 11%', minAmt: 500000, maxAmt: 100000000, tenure: '5 – 30 years', eligibility: 'Age 21–65, stable income, good repayment history', desc: 'Buy, build or renovate your dream home with long tenures and competitive sample rates.', docs: ['Identity proof', 'Address proof', 'Income proof', 'Property documents'] },
    { id: 'business-loan', name: 'Business Loans', icon: 'briefcase', grad: 'linear-gradient(135deg,#1a2a4a,#6b4f10)', rate: '12% – 26%', minAmt: 100000, maxAmt: 20000000, tenure: '12 – 84 months', eligibility: 'Business vintage 2+ years, annual turnover ₹10 lakh+', desc: 'Working capital and growth funding for MSMEs, traders and professionals.', docs: ['KYC of proprietor/partners', 'Business registration', 'ITR & financials', '12 months bank statement'] },
    { id: 'education-loan', name: 'Education Loans', icon: 'grad', grad: 'linear-gradient(135deg,#0f3b46,#1d7a8a)', rate: '9% – 14%', minAmt: 100000, maxAmt: 15000000, tenure: '5 – 15 years', eligibility: 'Admission to a recognised institution; co-applicant required', desc: 'Fund higher education in India or abroad with moratorium during the course period.', docs: ['Admission letter', 'Fee structure', 'Co-applicant KYC', 'Co-applicant income proof'] },
    { id: 'vehicle-loan', name: 'Vehicle Loans', icon: 'car', grad: 'linear-gradient(135deg,#2a1f45,#4b3b8f)', rate: '8.7% – 15%', minAmt: 100000, maxAmt: 5000000, tenure: '12 – 84 months', eligibility: 'Age 21–65, minimum 1 year employment or business', desc: 'Drive home a new or pre-owned car or two-wheeler with quick approvals.', docs: ['Identity proof', 'Address proof', 'Income proof', 'Vehicle quotation'] },
    { id: 'loan-against-property', name: 'Loan Against Property', icon: 'building', grad: 'linear-gradient(135deg,#3a2a12,#8a6a1d)', rate: '9.5% – 14%', minAmt: 500000, maxAmt: 50000000, tenure: '5 – 20 years', eligibility: 'Owner of residential/commercial property with clear title', desc: 'Unlock the value of your property for business or personal needs at lower rates.', docs: ['KYC', 'Property title documents', 'Income proof', 'Bank statement'] }
  ];

  const LENDERS = [
    { id: 'l1', name: 'Crestline Bank', rate: 10.5, rateMax: 18, minAmt: 50000, maxAmt: 3500000, minTen: 12, maxTen: 60, fee: 1.5, elig: 'Income ₹25k+ • CIBIL 700+', types: ['personal-loan', 'vehicle-loan'], enabled: true, color: '#12305A' },
    { id: 'l2', name: 'Meridian Finance', rate: 11.2, rateMax: 21, minAmt: 100000, maxAmt: 4000000, minTen: 12, maxTen: 72, fee: 2.0, elig: 'Income ₹20k+ • CIBIL 680+', types: ['personal-loan', 'business-loan'], enabled: true, color: '#8a6a1d' },
    { id: 'l3', name: 'Harbor Housing Finance', rate: 8.4, rateMax: 10.8, minAmt: 500000, maxAmt: 80000000, minTen: 60, maxTen: 360, fee: 0.5, elig: 'Income ₹30k+ • Age 21–65', types: ['home-loan', 'loan-against-property'], enabled: true, color: '#1d7a8a' },
    { id: 'l4', name: 'Summit Capital', rate: 12.0, rateMax: 24, minAmt: 100000, maxAmt: 15000000, minTen: 12, maxTen: 84, fee: 2.25, elig: 'Business vintage 2 yrs+', types: ['business-loan'], enabled: true, color: '#4b3b8f' },
    { id: 'l5', name: 'Orchid Education Credit', rate: 9.0, rateMax: 13.5, minAmt: 100000, maxAmt: 12000000, minTen: 60, maxTen: 180, fee: 1.0, elig: 'Co-applicant required', types: ['education-loan'], enabled: true, color: '#2f8f6f' },
    { id: 'l6', name: 'Velocity Auto Finance', rate: 8.7, rateMax: 14, minAmt: 100000, maxAmt: 5000000, minTen: 12, maxTen: 84, fee: 1.0, elig: 'Income ₹18k+ • Age 21–65', types: ['vehicle-loan'], enabled: true, color: '#b0520a' },
    { id: 'l7', name: 'Pinnacle Securities Lending', rate: 9.5, rateMax: 13, minAmt: 500000, maxAmt: 40000000, minTen: 60, maxTen: 240, fee: 1.25, elig: 'Property owner • Clear title', types: ['loan-against-property', 'home-loan'], enabled: true, color: '#0B1F3A' },
    { id: 'l8', name: 'Brightpath Microfinance', rate: 14.0, rateMax: 26, minAmt: 50000, maxAmt: 1000000, minTen: 12, maxTen: 48, fee: 2.5, elig: 'Income ₹15k+', types: ['personal-loan', 'business-loan'], enabled: true, color: '#a12929' }
  ];

  const SITE = {
    banners: [
      { id: 'b1', title: 'Festive season: zero consultation fee on all loan guidance', sub: 'Demo banner' },
      { id: 'b2', title: 'Compare 8+ lender listings side by side — free', sub: 'Demo banner' }
    ],
    testimonials: [
      { id: 't1', name: 'Ritu Sharma', role: 'Salaried, Hyderabad', rating: 5, text: 'The team explained every option clearly and helped me compare lenders without any pressure. The process felt transparent from start to finish.' },
      { id: 't2', name: 'Karthik Reddy', role: 'Business owner', rating: 5, text: 'I needed working capital quickly. AS Financial Services shortlisted suitable lenders and guided me on the documents. Very professional support.' },
      { id: 't3', name: 'Meera Nair', role: 'Parent & home buyer', rating: 4, text: 'The EMI calculator and guides helped us plan our home loan confidently. Support was always responsive on WhatsApp.' },
      { id: 't4', name: 'Arjun Patel', role: 'Postgraduate student', rating: 5, text: 'Education loan paperwork looked scary, but their step-by-step checklist made it simple.' }
    ],
    faqs: [
      { id: 'f1', q: 'Is AS Financial Services a lender?', a: 'No. AS Financial Services is a financial guidance and loan-assistance consultancy. We help you compare options and prepare applications; lending decisions are made by the lenders.' },
      { id: 'f2', q: 'Do you charge for consultation?', a: 'Our initial guidance and comparison tools are free. Any service fee, if applicable, is explained upfront before you proceed.' },
      { id: 'f3', q: 'Are the rates on this website real offers?', a: 'No. This website is a demonstration. All rates, lenders and application records are sample data and are not real financial offers.' },
      { id: 'f4', q: 'What documents do I usually need?', a: 'Typically identity proof, address proof, income proof and bank statements. Exact requirements vary by loan type and lender.' },
      { id: 'f5', q: 'How long does the process take?', a: 'Timelines depend on the lender and the completeness of your documents. Well-prepared applications generally move faster.' },
      { id: 'f6', q: 'Will checking eligibility affect my credit score?', a: 'The eligibility check on this demo is an indicative calculator only and does not contact any credit bureau.' }
    ]
  };

  const GUIDES = [
    { id: 'g1', cat: 'Basics', title: 'How EMI is calculated — and why tenure matters', read: 5, body: 'EMI is computed with the formula EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the principal, r the monthly interest rate and n the number of months. A longer tenure lowers your EMI but increases the total interest paid. Use our EMI calculator to test different combinations before you decide.' },
    { id: 'g2', cat: 'Credit', title: '7 habits that keep your credit score healthy', read: 6, body: 'Pay every due date on time, keep card utilisation below 30%, avoid too many loan enquiries in a short span, maintain a healthy mix of credit, review your report for errors, avoid closing your oldest account, and borrow only what you can comfortably repay.' },
    { id: 'g3', cat: 'Home Loans', title: 'Home loan checklist: documents and costs to plan for', read: 7, body: 'Besides the down payment, plan for processing fees, legal and valuation charges, stamp duty and registration. Keep identity, address, income and property papers ready. Compare floating and fixed rate options and check prepayment rules.' },
    { id: 'g4', cat: 'Business', title: 'Choosing the right business loan for working capital', read: 6, body: 'Match the product to the need: term loans for assets, overdraft or cash credit for day-to-day working capital. Maintain clean banking records, GST filings and ITRs — they strengthen your application considerably.' },
    { id: 'g5', cat: 'Education', title: 'Education loans: moratorium, co-applicants and tax benefits', read: 5, body: 'Most education loans offer a moratorium until the course ends plus a grace period. A co-applicant is usually required. Interest paid may qualify for tax deduction under applicable provisions — consult a tax professional.' },
    { id: 'g6', cat: 'Basics', title: 'Fixed vs floating interest rates explained', read: 4, body: 'Fixed rates stay constant for a period, offering predictability. Floating rates move with market benchmarks and can fall or rise. Consider your risk appetite, tenure and prepayment plans.' }
  ];

  function seed() {
    if (J.get('seeded')) return;
    const pw = hash('Demo@123');
    const customers = [
      { id: 'c1', name: 'Demo Customer', email: 'demo@customer.com', mobile: '9876500001', pass: pw, role: 'CUSTOMER', created: daysAgo(40), city: 'Hyderabad', saved: ['l1', 'l3'], notifications: [{ id: 'n1', text: 'Welcome to AS Financial Services! This is a demo account.', date: daysAgo(40), read: true }, { id: 'n2', text: 'Your Personal Loan application is now Under Review.', date: daysAgo(3), read: false }], docs: {} },
      { id: 'c2', name: 'Priya Menon', email: 'priya@example.com', mobile: '9876500002', pass: pw, role: 'CUSTOMER', created: daysAgo(75), city: 'Bengaluru', saved: [], notifications: [], docs: {} },
      { id: 'c3', name: 'Rahul Verma', email: 'rahul@example.com', mobile: '9876500003', pass: pw, role: 'CUSTOMER', created: daysAgo(20), city: 'Pune', saved: ['l5'], notifications: [], docs: {} },
      { id: 'c4', name: 'Sneha Iyer', email: 'sneha@example.com', mobile: '9876500004', pass: pw, role: 'CUSTOMER', created: daysAgo(110), city: 'Chennai', saved: [], notifications: [], docs: {} },
      { id: 'c5', name: 'Vikram Singh', email: 'vikram@example.com', mobile: '9876500005', pass: pw, role: 'CUSTOMER', created: daysAgo(8), city: 'Delhi', saved: [], notifications: [], docs: {} }
    ];
    const mk = (n, cid, type, amount, tenure, status, ago, purpose) => {
      const c = customers.find(x => x.id === cid);
      return { id: 'a' + n, ref: 'ATS-2026-' + String(1000 + n), customerId: cid, type, amount, tenure, purpose, status, created: daysAgo(ago),
        personal: { name: c.name, dob: '1994-05-12', mobile: c.mobile, email: c.email, address: c.city },
        employment: { type: 'Salaried', company: 'Sample Pvt Ltd', income: 65000, experience: 4 },
        docs: { identity: 'id-proof.pdf', address: 'address-proof.pdf', income: '' }, docsRequested: status === 'Documents Required' ? 'Please upload last 3 months salary slips.' : '',
        history: [{ status: 'Application Submitted', date: daysAgo(ago), note: 'Application received' }].concat(status !== 'Application Submitted' ? [{ status, date: daysAgo(Math.max(ago - 2, 0)), note: 'Status updated by admin' }] : []) };
    };
    const apps = [
      mk(1, 'c1', 'personal-loan', 300000, 36, 'Under Review', 5, 'Home renovation'),
      mk(2, 'c2', 'home-loan', 4500000, 240, 'Approved', 60, 'Purchase of apartment'),
      mk(3, 'c3', 'education-loan', 1200000, 120, 'Documents Required', 12, 'Masters programme'),
      mk(4, 'c4', 'business-loan', 800000, 48, 'Rejected', 90, 'Working capital'),
      mk(5, 'c5', 'vehicle-loan', 650000, 60, 'Application Submitted', 2, 'New hatchback'),
      mk(6, 'c2', 'personal-loan', 150000, 24, 'Approved', 30, 'Medical expenses'),
      mk(7, 'c4', 'loan-against-property', 2500000, 120, 'Under Review', 9, 'Business expansion')
    ];
    const enq = [
      { id: 'e1', name: 'Anita Rao', email: 'anita@example.com', phone: '9876511111', message: 'I would like to know the documents required for a home loan.', status: 'Pending', date: daysAgo(1) },
      { id: 'e2', name: 'Suresh Kumar', email: 'suresh@example.com', phone: '9876522222', message: 'Can you help me compare business loan options for my shop?', status: 'Resolved', date: daysAgo(6) },
      { id: 'e3', name: 'Demo Customer', email: 'demo@customer.com', phone: '9876500001', message: 'Need an update on my personal loan application.', status: 'Pending', date: daysAgo(2), customerId: 'c1' }
    ];
    J.set('customers', customers); J.set('apps', apps); J.set('enq', enq);
    J.set('lenders', LENDERS); J.set('loans', LOANS); J.set('site', SITE); J.set('guides', GUIDES);
    J.set('seeded', 1);
  }
  seed();

  /* ---------- auth ---------- */
  const SS = { get: k => { try { return sessionStorage.getItem(P + k); } catch (e) { return null; } }, set: (k, v) => { try { sessionStorage.setItem(P + k, v); } catch (e) {} }, del: k => { try { sessionStorage.removeItem(P + k); } catch (e) {} } };
  const LS = { get: k => { try { return localStorage.getItem(P + k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(P + k, v); } catch (e) {} }, del: k => { try { localStorage.removeItem(P + k); } catch (e) {} } };

  const Auth = {
    hash,
    customers: () => J.get('customers', []),
    saveCustomers: c => J.set('customers', c),
    customer() {
      const id = SS.get('cs') || LS.get('cs');
      if (!id) return null;
      const c = J.get('customers', []).find(x => x.id === id && x.role === 'CUSTOMER');
      return c || null;
    },
    admin() { return SS.get('as') === 'ADMIN' ? { name: ADMIN.name, email: ADMIN.email, role: 'ADMIN' } : null; },
    findCustomer(idf) {
      idf = String(idf).trim().toLowerCase();
      return J.get('customers', []).find(c => c.email.toLowerCase() === idf || c.mobile === idf);
    },
    loginCustomer(idf, pass, remember) {
      const c = Auth.findCustomer(idf);
      if (!c || c.pass !== hash(pass)) return { ok: false, msg: 'Incorrect email/mobile or password.' };
      Auth.startCustomer(c.id, remember); return { ok: true, customer: c };
    },
    startCustomer(id, remember) { SS.del('cs'); LS.del('cs'); (remember ? LS : SS).set('cs', id); },
    logoutCustomer() { SS.del('cs'); LS.del('cs'); },
    loginAdmin(email, pass) {
      if (String(email).trim().toLowerCase() === ADMIN.email && hash(pass) === (J.get('adminPass', ADMIN.passHash))) { SS.set('as', 'ADMIN'); return { ok: true }; }
      return { ok: false, msg: 'Invalid administrator credentials.' };
    },
    changeAdminPassword(cur, next) {
      if (hash(cur) !== J.get('adminPass', ADMIN.passHash)) return { ok: false, msg: 'Current password is incorrect.' };
      J.set('adminPass', hash(next)); return { ok: true };
    },
    logoutAdmin() { SS.del('as'); },
    register(d) {
      const email = d.email.trim().toLowerCase();
      if (email === ADMIN.email || /^admin@/.test(email)) return { ok: false, msg: 'This email address is reserved. Please use a different one.' };
      const list = J.get('customers', []);
      if (list.some(c => c.email.toLowerCase() === email)) return { ok: false, msg: 'An account with this email already exists.' };
      if (list.some(c => c.mobile === d.mobile)) return { ok: false, msg: 'An account with this mobile number already exists.' };
      // role is ALWAYS forced to CUSTOMER – no client input can set it
      const c = { id: uid('c'), name: d.name.trim(), email, mobile: d.mobile, pass: hash(d.password), role: 'CUSTOMER', created: new Date().toISOString(), city: '', saved: [], notifications: [{ id: uid('n'), text: 'Welcome to AS Financial Services! Your demo account is ready.', date: new Date().toISOString(), read: false }], docs: {} };
      list.push(c); J.set('customers', list); return { ok: true, customer: c };
    }
  };

  /* ---------- data access ---------- */
  const DB = {
    get: J.get, set: J.set, uid, STATUS, STATUS_CLASS, ADMIN_EMAIL: ADMIN.email,
    apps: () => J.get('apps', []), saveApps: a => J.set('apps', a),
    enq: () => J.get('enq', []), saveEnq: e => J.set('enq', e),
    lenders: () => J.get('lenders', []), saveLenders: l => J.set('lenders', l),
    loans: () => J.get('loans', []), saveLoans: l => J.set('loans', l),
    site: () => J.get('site', SITE), saveSite: s => J.set('site', s),
    guides: () => J.get('guides', GUIDES),
    customerById: id => J.get('customers', []).find(c => c.id === id),
    updateCustomer(id, patch) { const l = J.get('customers', []); const i = l.findIndex(c => c.id === id); if (i < 0) return; l[i] = Object.assign(l[i], patch); J.set('customers', l); return l[i]; },
    notify(cid, text) { const l = J.get('customers', []); const c = l.find(x => x.id === cid); if (!c) return; c.notifications.unshift({ id: uid('n'), text, date: new Date().toISOString(), read: false }); J.set('customers', l); },
    addEnquiry(e) { const l = DB.enq(); l.unshift(Object.assign({ id: uid('e'), status: 'Pending', date: new Date().toISOString() }, e)); DB.saveEnq(l); },
    nextRef() { return 'ATS-2026-' + String(1000 + DB.apps().length + 1 + Math.floor(Math.random() * 90)); },
    addApplication(a) {
      const l = DB.apps(); const app = Object.assign({ id: uid('a'), ref: DB.nextRef(), status: 'Application Submitted', created: new Date().toISOString(), docsRequested: '', history: [{ status: 'Application Submitted', date: new Date().toISOString(), note: 'Application received' }] }, a);
      l.unshift(app); DB.saveApps(l); DB.notify(a.customerId, 'Application ' + app.ref + ' submitted successfully (demo).'); return app;
    },
    setStatus(appId, status, note) {
      const l = DB.apps(); const a = l.find(x => x.id === appId); if (!a) return;
      a.status = status; a.history.push({ status, date: new Date().toISOString(), note: note || 'Status updated by admin' });
      if (status === 'Documents Required' && note) a.docsRequested = note;
      DB.saveApps(l); DB.notify(a.customerId, 'Your application ' + a.ref + ' is now: ' + status + '.'); return a;
    },
    resetDemo() { Object.keys(localStorage).filter(k => k.startsWith(P)).forEach(k => localStorage.removeItem(k)); try { sessionStorage.clear(); } catch (e) {} }
  };

  /* ---------- EMI ---------- */
  function emi(p, annualRate, months) {
    p = +p; months = +months; const r = annualRate / 12 / 100;
    if (!p || !months) return { emi: 0, total: 0, interest: 0 };
    const e = r === 0 ? p / months : p * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
    return { emi: e, total: e * months, interest: e * months - p };
  }

  g.AT = { Auth, DB, emi, hash };
})(window);
