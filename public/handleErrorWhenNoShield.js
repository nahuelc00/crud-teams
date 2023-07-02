function handleErrorWhenNoShieldFound() {
  const $imgs = document.querySelectorAll('img');
  $imgs.forEach(($img) => {
    $img.addEventListener('error', function () {
      this.src = 'http://localhost:8080/images/no-shield';
    });
  });
}
handleErrorWhenNoShieldFound();
