function Path(destination) {
  const dest = document.querySelector('.' + destination);
  const headerHeight = 136;
  const offset = 20;
  const elementPosition = dest.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}