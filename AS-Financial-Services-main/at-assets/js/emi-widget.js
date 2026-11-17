/* Reusable EMI calculator widget (used on home page and EMI calculator page) */
(function (g) {
  const { inr, $ } = g.UI;
  function html() {
    return '<div class="calc"><div class="calc-in">' +
      row('Loan Amount', 'amt', 50000, 20000000, 10000, 500000, '₹') +
      row('Interest Rate (p.a.)', 'rate', 5, 30, 0.1, 10.5, '%') +
      row('Loan Tenure (months)', 'ten', 6, 360, 6, 60, 'mo') +
      '<p style="font-size:.8rem;color:var(--muted)">Indicative calculation using the standard reducing-balance EMI formula. Not a lender offer.</p></div>' +
      '<div class="calc-out"><div><div style="font-size:.85rem;color:#A9B7CC">Monthly EMI</div><div class="emi-big" data-o="emi">₹0</div></div>' +
      '<div class="chart-box"><canvas data-o="chart"></canvas></div>' +
      '<div class="legend"><span><i style="background:#C9A227"></i>Principal</span><span><i style="background:#5B7DB1"></i>Interest</span></div>' +
      '<div><div class="res-row"><span>Principal amount</span><b data-o="p">₹0</b></div><div class="res-row"><span>Total interest payable</span><b data-o="int">₹0</b></div><div class="res-row"><span>Total repayment</span><b data-o="tot">₹0</b></div></div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-gold" data-o="expert" href="#">Talk to Our Expert</a><a class="btn btn-outline" style="color:#fff;border-color:#fff" data-o="apply" href="#">Apply Now</a></div></div></div>';
  }
  function row(label, id, min, max, step, val, unit) {
    return '<div class="field-row"><div class="top"><span>' + label + '</span><div class="num-box">' + (unit === '₹' ? '<span>₹</span>' : '') + '<input type="number" data-n="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '">' + (unit !== '₹' ? '<span>' + unit + '</span>' : '') + '</div></div>' +
      '<input type="range" data-r="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></div>';
  }
  function init(root, preset) {
    const base = g.UI.base; let chart;
    const get = id => ({ n: $('[data-n=' + id + ']', root), r: $('[data-r=' + id + ']', root) });
    const F = { amt: get('amt'), rate: get('rate'), ten: get('ten') };
    if (preset) Object.keys(preset).forEach(k => { if (F[k] && preset[k]) { F[k].n.value = F[k].r.value = preset[k]; } });
    function clamp(el) { const mn = +el.min, mx = +el.max; let v = parseFloat(el.value); if (isNaN(v)) v = mn; return Math.min(mx, Math.max(mn, v)); }
    function calc() {
      const p = +F.amt.r.value, r = +F.rate.r.value, n = +F.ten.r.value;
      const out = g.AT.emi(p, r, n);
      $('[data-o=emi]', root).textContent = inr(out.emi); $('[data-o=p]', root).textContent = inr(p);
      $('[data-o=int]', root).textContent = inr(out.interest); $('[data-o=tot]', root).textContent = inr(out.total);
      const q = 'amount=' + p + '&rate=' + r + '&tenure=' + n;
      $('[data-o=expert]', root).href = base + 'contact.html?topic=emi&' + q;
      $('[data-o=apply]', root).href = base + 'apply.html?' + q;
      if (window.Chart) {
        const data = [Math.round(p), Math.round(out.interest)];
        if (!chart) chart = new Chart($('[data-o=chart]', root), { type: 'doughnut', data: { labels: ['Principal', 'Interest'], datasets: [{ data, backgroundColor: ['#C9A227', '#5B7DB1'], borderWidth: 0 }] }, options: { cutout: '68%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ' ' + c.label + ': ' + inr(c.raw) } } } } });
        else { chart.data.datasets[0].data = data; chart.update(); }
      }
      g.emiState = { p, r, n, out };
    }
    Object.keys(F).forEach(k => {
      F[k].r.addEventListener('input', () => { F[k].n.value = F[k].r.value; calc(); });
      F[k].n.addEventListener('input', () => { if (F[k].n.value === '') return; F[k].r.value = clamp(F[k].n); calc(); });
      F[k].n.addEventListener('blur', () => { F[k].n.value = clamp(F[k].n); F[k].r.value = F[k].n.value; calc(); });
    });
    calc();
  }
  g.EmiWidget = { html, init };
})(window);
