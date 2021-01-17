let openButton = document.querySelector('.profile__editButton');
let overlay = document.querySelector('.overlay');

console.log(openButton);

openButton.addEventListener('click', () => {
  overlay.classList.add('overlay_active')
  console.log("clicked")
});


