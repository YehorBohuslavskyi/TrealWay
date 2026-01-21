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

window.initQAToggle = initQAToggle;