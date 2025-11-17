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


function scrollUpBtn(){
  const btn = document.querySelector('.scroll-up');
  btn.classList.add('disabled');

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function checkScrollPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const isNearBottom = scrollTop + windowHeight >= documentHeight - 700;
    const hasScrolled = scrollTop > 300; // Add minimum scroll threshold

    if (isNearBottom && hasScrolled) { // Check both conditions
      btn.classList.remove('disabled');
    } else {
      btn.classList.add('disabled');
    }
  }

  window.addEventListener('scroll', checkScrollPosition);

  checkScrollPosition();
}

scrollUpBtn();