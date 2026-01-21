function initHeader() {
  const burgerBtn = document.querySelector('.burgerBtn');
  const header = document.querySelector('.header');
  const navBar = document.querySelector('.nav-bar');
  const body = document.querySelector('body');
  let isBurgerOpen = false;
  const screenWidth = window.innerWidth;
  let scrollPosition = 0;

  if(screenWidth > 768) return;

  if(!isBurgerOpen) {
    burgerBtn.src = '../../assets/images/header/openBurger.svg';
    navBar.style.display = 'none';
    header.style.height = 'auto';
  } else {
    burgerBtn.src = '../../assets/images/header/closeBurger.svg';
    navBar.style.display = 'flex';
  }

  burgerBtn.addEventListener('click', () => {
    isBurgerOpen = !isBurgerOpen;

    if(isBurgerOpen) {
      scrollPosition = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';

      burgerBtn.src = '../../assets/images/header/closeBurger.svg';
      navBar.style.display = 'flex';
    } else {
      burgerBtn.src = '../../assets/images/header/openBurger.svg';
      navBar.style.display = 'none';
      header.style.height = 'auto';

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      window.scrollTo({
        top: scrollPosition,
        behavior: 'instant'
      });
    }
  });
}

window.initHeader = initHeader;