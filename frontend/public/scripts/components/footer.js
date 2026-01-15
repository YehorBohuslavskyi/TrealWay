function footer(event){
  event.preventDefault();

  const emailField = document.querySelector('.footer-email-input');

  const email = emailField.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  emailField.classList.remove('error');

  let isValid = true;

  if(!email){
    emailField.classList.add('error');
    if(isValid) emailField.focus();
    isValid = false;
  } else if(!emailRegex.test(email)){
    emailField.classList.add('error');
    if(isValid) emailField.focus();
    isValid = false;
  }

  if(isValid) {
    console.log('Name:', name);

    alert('Message sent!');

    fetch('http://localhost:5000/client', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    emailField.value = '';
  }
}