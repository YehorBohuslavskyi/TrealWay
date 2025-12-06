function feedback(event){
  event.preventDefault();

  const nameField = document.querySelector('.name-field');
  const emailField = document.querySelector('.email-field');
  const messageField = document.querySelector('.message-field');

  const email = emailField.value.trim();
  const name = nameField.value.trim();
  const message = messageField.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  emailField.classList.remove('error');
  nameField.classList.remove('error');
  messageField.classList.remove('error');

  let isValid = true;

  if(!name){
    nameField.classList.add('error');
    nameField.focus();
    isValid = false;
  }

  if(!email){
    emailField.classList.add('error');
    if(isValid) emailField.focus();
    isValid = false;
  } else if(!emailRegex.test(email)){
    emailField.classList.add('error');
    if(isValid) emailField.focus();
    isValid = false;
  }

  if(!message){
    messageField.classList.add('error');
    if(isValid) messageField.focus();
    isValid = false;
  }

  if(isValid) {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    alert('Message sent!');

    nameField.value = '';
    emailField.value = '';
    messageField.value = '';
  }
}