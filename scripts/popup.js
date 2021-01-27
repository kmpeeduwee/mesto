let body = document.querySelector('.body');
let popup = body.querySelector('.popup');
let popupPlace = body.querySelector('.popup_image')
let openFormButton = body.querySelector('.profile__editButton');
let openFormPlaceButton = body.querySelector('.profile__addButton');
let nameInput = body.querySelector('.profile__name');
let jobInput = body.querySelector('.profile__profession');
let formEditProfile = body.querySelector('.popup__container');
let formAddPlace = body.querySelector('.popup__container_type_image');
let closeFormButton = formEditProfile.querySelector('.popup__closeButton');
let closeFormPlaceButton = formAddPlace.querySelector('.popup__closeButton_type_card');
let firstNameInput = formEditProfile.querySelector('.popup__input_type_name');
let secondNameInput = formEditProfile.querySelector('.popup__input_type_profession');
let placeNameInput = formAddPlace.querySelector('.popup__input_type_place');
let placeImageInput = formAddPlace.querySelector('.popup__input_type_image');

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

function openPopupPlace () {
  placeNameInput.value = placeNameInput.textContent;
  placeImageInput.value = placeImageInput.textContent;
  popupPlace.classList.add('popup_opened');
}

function closePopupPlace () {
  popupPlace.classList.remove('popup_opened');
}

openFormButton.addEventListener('click', openPopup);
formEditProfile.addEventListener('submit', formSubmitHandler);
closeFormButton.addEventListener('click', closePopup);
openFormPlaceButton.addEventListener('click', openPopupPlace);
closeFormPlaceButton.addEventListener('click', closePopupPlace);

