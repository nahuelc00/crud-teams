function handleAddTeam() {
  const $button = document.querySelector('.counter-teams__button');
  $button.addEventListener('click', () => {
    window.history.pushState('', '', '/form');
    location.reload();
  });
}

handleAddTeam();
