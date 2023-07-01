function handlerClosePage() {
  const $closePage = document.querySelector('.team-page__close');
  $closePage.addEventListener('click', () => {
    window.history.pushState('', '', '/');
    location.reload();
  });
}
handlerClosePage();
