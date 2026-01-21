function initQAToggle() {
  const toggleButtons = document.querySelectorAll('.qa-toggle');
  const OPEN_ICON = '../../assets/images/qa/plus.svg';
  const CLOSE_ICON = '../../assets/images/qa/minus.svg';

  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const qaItem = this.closest('.qa-question') || this.closest('.qa-item');
      if (!qaItem) return;

      const isOpen = qaItem.classList.toggle('open');
      const answer = qaItem.querySelector('.qa-question-answer') || qaItem.querySelector('.qa-answer');

      if (answer) {
        answer.style.display = isOpen ? 'block' : 'none';
        answer.classList.toggle('show', isOpen);
      }

      const img = this.querySelector('img');
      if (img) {
        img.src = isOpen ? CLOSE_ICON : OPEN_ICON;
        img.alt = isOpen ? 'close' : 'open';
      }

      this.classList.toggle('open', isOpen);
    });
  });
}

function initBudgetSlider() {
  const sliderOne = document.getElementById("slider-1");
  const sliderTwo = document.getElementById("slider-2");
  const valueLeft = document.getElementById("value-left");
  const valueRight = document.getElementById("value-right");
  const sliderTrack = document.querySelector(".slider-track");

  if (!sliderOne || !sliderTwo) return;

  const minGap = 0;
  const sliderMaxValue = parseInt(sliderOne.max);
  const sliderMinValue = parseInt(sliderOne.min);

  function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    updateValues();
    fillColor();
  }

  function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    updateValues();
    fillColor();
  }

  function updateValues() {
    valueLeft.textContent = '$' + parseInt(sliderOne.value).toLocaleString();
    valueRight.textContent = '$' + parseInt(sliderTwo.value).toLocaleString();

    const percent1 = ((sliderOne.value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
    const percent2 = ((sliderTwo.value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

    valueLeft.style.left = percent1 + '%';
    valueRight.style.left = percent2 + '%';
  }

  function fillColor() {
    const percent1 = ((sliderOne.value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
    const percent2 = ((sliderTwo.value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

    sliderTrack.style.left = percent1 + '%';
    sliderTrack.style.width = (percent2 - percent1) + '%';
  }

  sliderOne.addEventListener('input', slideOne);
  sliderTwo.addEventListener('input', slideTwo);

  slideOne();
  slideTwo();
}

function initQA() {
  initQAToggle();
  initBudgetSlider();
}

window.initQAToggle = initQAToggle;
window.initBudgetSlider = initBudgetSlider;
window.initQA = initQA;