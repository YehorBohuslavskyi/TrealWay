function initHeader() {
  const burgerBtn = document.querySelector('.burgerBtn');
  const navBar = document.querySelector('.nav-bar');
  let isBurgerOpen = false;
  const screenWidth = window.innerWidth;

  if(screenWidth > 768) return;
  if(!isBurgerOpen) {
    burgerBtn.src = '../../assets/images/header/openBurger.svg';
    navBar.style.display = 'none';
  } else {
    burgerBtn.src = '../../assets/images/header/closeBurger.svg';
    navBar.style.display = 'flex';
  }

  burgerBtn.addEventListener('click', () => {
    isBurgerOpen = !isBurgerOpen;

    if(isBurgerOpen) {
      burgerBtn.src = '../../assets/images/header/closeBurger.svg';
      navBar.style.display = 'flex';
    } else {
      burgerBtn.src = '../../assets/images/header/openBurger.svg';
      navBar.style.display = 'none';
    }
  });
}

window.initHeader = initHeader;