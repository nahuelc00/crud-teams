/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
function handleButtonsSee() {
  const $buttonsSee = document.querySelectorAll('.actions__see');

  $buttonsSee.forEach(($button) => {
    $button.addEventListener('click', () => {
      const idTeam = $button.getAttribute('data-id-team');
      const urlTeam = `http://localhost:8080/team/${idTeam}/see`;
      window.history.pushState('', '', urlTeam);
      location.reload();
    });
  });
}
handleButtonsSee();
