async function feedback(event) {
  event.preventDefault();

  const nameField = document.querySelector('.name-field');
  const emailField = document.querySelector('.email-field');
  const messageField = document.querySelector('.message-field');

  const email = emailField.value.trim();
  const name = nameField.value.trim();
  const question = messageField.value.trim();

  const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]:checked');
  const contactReasons = Array.from(checkboxes).map(cb => cb.value);

  const sliderOne = document.getElementById('slider-1');
  const sliderTwo = document.getElementById('slider-2');
  const budgetMin = sliderOne ? parseInt(sliderOne.value) : null;
  const budgetMax = sliderTwo ? parseInt(sliderTwo.value) : null;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  emailField.classList.remove('error');
  nameField.classList.remove('error');
  messageField.classList.remove('error');

  let isValid = true;

  if (!name) {
    nameField.classList.add('error');
    nameField.focus();
    isValid = false;
  }

  if (!email) {
    emailField.classList.add('error');
    if (isValid) emailField.focus();
    isValid = false;
  } else if (!emailRegex.test(email)) {
    emailField.classList.add('error');
    if (isValid) emailField.focus();
    isValid = false;
  }


  if (isValid) {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Contact Reasons:', contactReasons);
    console.log('Budget Range:', budgetMin, '-', budgetMax);
    console.log('Question:', question);

    const requestData = {
      name: name,
      email: email,
      contactReasons: contactReasons.length > 0 ? contactReasons : null,
      budgetMin: budgetMin,
      budgetMax: budgetMax,
      question: question || null
    };

    try {
      const response = await fetch('http://localhost:5000/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        alert('Failed to send your request. Please try again.');
        return;
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Message sent successfully!');

      nameField.value = '';
      emailField.value = '';
      messageField.value = '';

      checkboxes.forEach(cb => cb.checked = false);

      if (sliderOne) sliderOne.value = 1000;
      if (sliderTwo) sliderTwo.value = 5000;

    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  }
}