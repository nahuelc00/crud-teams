function handleAddTeam() {
  const $button = document.querySelector('.counter-teams__button');
  $button.addEventListener('click', () => {
    location.replace('/form');
  });
}

handleAddTeam();
