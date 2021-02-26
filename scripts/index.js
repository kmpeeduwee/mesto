const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const body = document.querySelector('.body');
const popupEditProfile = body.querySelector('.popup_type_editProfile');
const popupAddCard = body.querySelector('.popup_type_addPlace');
const popupBigImage = body.querySelector('.popup_type_bigImage'); //
const openButtonEditProfile = body.querySelector('.profile__editButton');
const openButtonAddCard = body.querySelector('.profile__addButton');
const inputProfileName = popupEditProfile.querySelector('.popup__input_type_name');
const inputProfileProfession = popupEditProfile.querySelector('.popup__input_type_profession');
const inputCardPlace = popupAddCard.querySelector('.popup__input_type_place');
const inputCardLinkImage = popupAddCard.querySelector('.popup__input_type_image');
const nameInput = body.querySelector('.profile__name');
const jobInput = body.querySelector('.profile__profession');
const formEditProfile = popupEditProfile.querySelector('.popup__form-container');
const formAddCard = popupAddCard.querySelector('.popup__form-container');
const cardContainer = body.querySelector('.elements');
const popupImage = popupBigImage.querySelector('.popup__image');
const popupImageCaption = popupBigImage.querySelector('.popup__caption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleOverlayClick);
  body.addEventListener('keydown', handleEscUp);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleOverlayClick);
  body.removeEventListener('keydown', handleEscUp);
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup__closeButton') || evt.target.classList.contains('popup_opened')) {
    const targetElement = evt.target;
    const targetPopup = targetElement.closest('.popup_opened');
    closePopup(targetPopup);
  }
}

function handleEscUp(evt) {
  const ESCAPE_KEY = 'Escape';
  if (evt.key === ESCAPE_KEY) {
    const targetPopup = body.querySelector('.popup_opened');
    closePopup(targetPopup);
  }
}

function editProfile(evt) {
  evt.preventDefault();
  nameInput.textContent = inputProfileName.value;
  jobInput.textContent = inputProfileProfession.value;
  closePopup(popupEditProfile);
}

function openButtonImg(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupBigImage);
}

openButtonEditProfile.addEventListener('click', function () {
  inputProfileName.value = nameInput.textContent;
  inputProfileProfession.value = jobInput.textContent;
  openPopup(popupEditProfile);
});

openButtonAddCard.addEventListener('click', function () {
  formAddCard.reset();
  addCardValidator.disableSubmitButton();
  openPopup(popupAddCard);
});

import Card from "./Card.js";

function addPlace(evt) {
  evt.preventDefault();
  cardContainer.prepend(createCard(inputCardPlace.value, inputCardLinkImage.value, '.template', openButtonImg));
  closePopup(popupAddCard);
}

function createCard(name, link, cardSelector, openButtonImg) {
  const card = new Card(name, link, cardSelector, openButtonImg);
  return card.createCard();
}

initialCards.forEach(function (item) {
  cardContainer.prepend(createCard(item.name, item.link, '.template', openButtonImg));
});

formEditProfile.addEventListener('submit', editProfile);
formAddCard.addEventListener('submit', addPlace);

import FormValidator from "./FormValidator.js";

const validationObject = {
  formSelector: 'popup__form-container',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__saveButton',
  inactiveButtonClass: 'popup__saveButton_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

const editProfileValidator = new FormValidator(validationObject, formEditProfile);
const addCardValidator = new FormValidator(validationObject, formAddCard);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
