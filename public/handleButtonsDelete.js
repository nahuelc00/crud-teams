/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

function showAlertAndRedirect() {
  alert('Team deleted');
  location.replace('/');
}

function deleteTeam(idTeam) {
  return fetch(`http://localhost:8080/team/${idTeam}`, {
    method: 'delete',
  });
}

function renderDeleteConfirmation(text) {
  return window.confirm(text);
}

function handleButtonsDelete() {
  const $buttonsDelete = document.querySelectorAll('.actions__delete');

  $buttonsDelete.forEach(($button) => {
    $button.addEventListener('click', () => {
      const isTeamDeleted = renderDeleteConfirmation('Are you sure you want to delete the team?');

      if (isTeamDeleted) {
        let idTeam = $button.getAttribute('data-id-team');

        if (isNaN(Number(idTeam))) {
          idTeam = document.querySelector('.team-page').getAttribute('id');
          deleteTeam(idTeam).then(showAlertAndRedirect());
        } else {
          deleteTeam(idTeam).then(showAlertAndRedirect());
        }
      }
    });
  });
}
handleButtonsDelete();
