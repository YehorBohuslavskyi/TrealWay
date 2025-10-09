document.addEventListener('DOMContentLoaded', function () {
  fetch('../../components/header.html')
    .then(res => res.text())
    .then(html => {
      const hdr = document.getElementById('header-placeholder');
      if (!hdr) return;
      hdr.innerHTML = html;
      if (typeof window.initHeader === 'function') window.initHeader();
    })
    .catch(err => console.error(err));

  const components = [
    { url: '../../components/info.html',    target: '#info-placeholder',    onload: 'initTransfer' },
    { url: '../../components/reasons.html', target: '#reasons-placeholder' },
    { url: '../../components/services.html', target: '#services-placeholder' },
    { url: '../../components/projects.html', target: '#projects-placeholder' },
  ];

  Promise.all(
    components.map(c =>
      fetch(c.url).then(r => {
        if (!r.ok) throw new Error(`Failed to fetch ${c.url}: ${r.status}`);
        return r.text();
      })
    )
  ).then(htmls => {
    htmls.forEach((html, i) => {
      const el = document.querySelector(components[i].target);
      if (el) el.innerHTML = html;
    });

    components.forEach(c => {
      if (c.onload && typeof window[c.onload] === 'function') {
        window[c.onload]();
      }
    });
  }).catch(err => console.error(err));

});