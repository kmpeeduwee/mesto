let body = document.querySelector('.body');

let popup = body.querySelector('.popup');

let openFormButton = body.querySelector('.profile__editButton');
let nameInput = body.querySelector('.profile__name');
let jobInput = body.querySelector('.profile__profession');
let formEditProfile = body.querySelector('.popup__container');

let closeFormButton = formEditProfile.querySelector('.popup__closeButton');
let firstNameInput = formEditProfile.querySelector('.popup__input_type_name');
let secondNameInput = formEditProfile.querySelector('.popup__input_type_profession');

function openPopup () {
  firstNameInput.value = nameInput.textContent;
  secondNameInput.value = jobInput.textContent;
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = firstNameInput.value;
  jobInput.textContent = secondNameInput.value;
  closePopup ();
}

openFormButton.addEventListener('click', openPopup);
formEditProfile.addEventListener('submit', formSubmitHandler);
closeFormButton.addEventListener('click', closePopup);
