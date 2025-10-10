function qaButton(el) {
  const OPEN_ICON = '../../assets/images/qa/plus.svg';
  const CLOSE_ICON = '../../assets/images/qa/minus.svg';

  const item = el.closest('.qa-question');
  if (!item) return;

  const isOpen = item.classList.toggle('open');

  const answer = item.querySelector('.qa-question-answer');
  if (answer) {
    answer.style.display = isOpen ? 'block' : 'none';

    const img = el.querySelector('img');
    if (img) {
      img.src = isOpen ? CLOSE_ICON : OPEN_ICON;
      img.alt = isOpen ? 'close' : 'open';
    }
  }
}