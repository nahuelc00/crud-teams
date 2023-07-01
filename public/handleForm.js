/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-else-return */

function validateAddTeam(formData) {
  const name = formData.get('name');
  const shortName = formData.get('shortName');
  const abbreviation = formData.get('abbreviation');
  const nameArea = formData.get('nameArea');
  const idArea = formData.get('idArea');
  const address = formData.get('address');
  const phone = formData.get('phone');
  const web = formData.get('website');
  const email = formData.get('email');
  const founded = formData.get('founded');
  const colors = formData.get('colors');
  const stadium = formData.get('stadium');
  const shieldImg = formData.get('shieldImg');

  if (name === '') {
    const textError = 'Please, type the name';
    document.querySelector('.name__error').textContent = textError;
  } else {
    document.querySelector('.name__error').textContent = '';
  }

  if (shortName === '') {
    const textError = 'Please, type the shortname';
    document.querySelector('.shortname__error').textContent = textError;
  } else {
    document.querySelector('.shortname__error').textContent = '';
  }

  if (abbreviation === '') {
    const textError = 'Please, type the abbreviation';
    document.querySelector('.abbreviation__error').textContent = textError;
  } else {
    document.querySelector('.abbreviation__error').textContent = '';
  }

  if (nameArea === '') {
    const textError = 'Please, type the name area';
    document.querySelector('.area-name__error').textContent = textError;
  } else {
    document.querySelector('.area-name__error').textContent = '';
  }

  if (idArea === '') {
    const textError = 'Please, type the id area';
    document.querySelector('.area-id__error').textContent = textError;
  } else if (isNaN(idArea)) {
    textError = 'The area id should be a number';
  } else {
    document.querySelector('.area-id__error').textContent = '';
  }

  if (address === '') {
    const textError = 'Please, type the address';
    document.querySelector('.address__error').textContent = textError;
  } else {
    document.querySelector('.address__error').textContent = '';
  }

  if (phone === '') {
    const textError = 'Please, type the phone number';
    document.querySelector('.phone__error').textContent = textError;
  } else {
    document.querySelector('.phone__error').textContent = '';
  }

  if (web === '') {
    const textError = 'Please, type the website';
    document.querySelector('.web__error').textContent = textError;
  } else {
    document.querySelector('.web__error').textContent = '';
  }

  if (email === '') {
    const textError = 'Please, type the email';
    document.querySelector('.email__error').textContent = textError;
  } else {
    document.querySelector('.email__error').textContent = '';
  }

  if (founded === '') {
    const textError = 'Please, type the date of its foundation';
    document.querySelector('.founded__error').textContent = textError;
  } else {
    document.querySelector('.founded__error').textContent = '';
  }

  if (colors === '') {
    const textError = 'Please, type the colors';
    document.querySelector('.colors__error').textContent = textError;
  } else {
    document.querySelector('.colors__error').textContent = '';
  }

  if (stadium === '') {
    const textError = 'Please, type the stadium';
    document.querySelector('.stadium__error').textContent = textError;
  } else {
    document.querySelector('.stadium__error').textContent = '';
  }

  if (shieldImg.size === 0) {
    const textError = 'Please, insert a shield file';
    document.querySelector('.shield__error').textContent = textError;
  } else {
    document.querySelector('.shield__error').textContent = '';
  }

  let counterErrors = 0;
  document.querySelectorAll('.error').forEach(($error) => {
    if ($error.textContent) {
      counterErrors += 1;
    }
  });

  return {
    errors: counterErrors,
  };
}

function handleSubmitForm() {
  const $formCreateTeam = document.querySelector('form');

  $formCreateTeam.addEventListener('submit', (event) => {
    event.preventDefault();
    const buttonText = event.target.querySelector('button').textContent;
    const formData = new FormData(event.target);

    const { errors } = validateAddTeam(formData);
    const isFormValid = errors === 0;

    if (isFormValid) {
      if (buttonText === 'Send team') {
        fetch('http://localhost:8080/teams', {
          method: 'post',
          body: formData,
        }).then(() => {
          alert('Team Saved Succesfully');
        }).then(() => {
          location.replace('/');
        });
      }

      if (buttonText === 'Update team') {
        const idTeam = event.target.getAttribute('id');
        formData.append('id', idTeam);
        fetch(`http://localhost:8080/team/${idTeam}`, {
          method: 'put',
          body: formData,
        }).then(() => {
          alert('Team Saved Succesfully');
        }).then(() => {
          location.replace('/');
        });
      }
    }
  });
}

handleSubmitForm();
