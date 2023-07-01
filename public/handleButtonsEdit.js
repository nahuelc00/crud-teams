/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
function redirect(idTeam) {
  window.history.pushState('', '', `/form/edit/${idTeam}`);
  location.reload();
}

function editTeam(idTeam) {
  return fetch(`http://localhost:8080/form/edit/${idTeam}`);
}

function handleButtonsEdit() {
  const $buttonsEdit = document.querySelectorAll('.actions__edit');

  $buttonsEdit.forEach(($button) => {
    $button.addEventListener('click', () => {
      let idTeam = $button.getAttribute('data-id-team');

      if (isNaN(Number(idTeam))) {
        idTeam = document.querySelector('.team-page').getAttribute('id');
        editTeam(idTeam).then(redirect(idTeam));
      } else {
        editTeam(idTeam).then(redirect(idTeam));
      }
    });
  });
}
handleButtonsEdit();
