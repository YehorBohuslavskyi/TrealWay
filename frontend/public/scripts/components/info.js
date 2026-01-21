function animateCounters() {
  const counters = document.querySelectorAll('.item-content');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        animateCounter(entry.target);
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const text = element.textContent;
  const hasPlus = text.includes('+');
  const hasPercent = text.includes('%');
  const hasK = text.includes('k') || text.includes('K');

  const targetValue = parseFloat(text.replace(/[^0-9.]/g, ''));
  const duration = 2000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const currentValue = Math.floor(targetValue * progress);

    let displayValue = currentValue;
    if (hasK) displayValue = currentValue + 'k';
    else if (hasPercent) displayValue = currentValue + '%';
    else if (hasPlus) displayValue = currentValue + '+';

    element.textContent = displayValue;

    if (frame === totalFrames) {
      clearInterval(counter);
      element.textContent = text;
    }
  }, frameDuration);
}

window.animateCounters = animateCounters;