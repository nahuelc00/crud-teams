function handlerClosePage() {
  const $closePage = document.querySelector('.cross-close');
  $closePage.addEventListener('click', () => {
    location.replace('/');
  });
}
handlerClosePage();
