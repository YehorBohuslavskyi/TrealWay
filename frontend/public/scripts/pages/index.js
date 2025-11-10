document.addEventListener('DOMContentLoaded', function () {
  const components = [
    { url: '../../components/header.html', target: '#header-placeholder', onload: 'initTransfer' },
    { url: '../../components/info.html', target: '#info-placeholder' },
    { url: '../../components/reasons.html', target: '#reasons-placeholder' },
    { url: '../../components/services.html', target: '#services-placeholder' },
    { url: '../../components/projects.html', target: '#projects-placeholder' },
    { url: '../../components/QA.html', target: '#qa-placeholder' },
    { url: '../../components/footer.html', target: '#footer-placeholder' },
  ];

  Promise.all(
    components.map(c =>
      fetch(c.url).then(r => {
        if (!r.ok) throw new Error(`Failed to fetch ${c.url}: ${r.status}`);
        return r.text();
      }),
    ),
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