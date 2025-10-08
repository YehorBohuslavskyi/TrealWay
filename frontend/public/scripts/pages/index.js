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
});