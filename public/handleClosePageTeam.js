function handlerClosePage() {
  const $closePage = document.querySelector('.team-page__close');
  $closePage.addEventListener('click', () => {
    location.replace('/');
  });
}
handlerClosePage();
