import './index.css';
import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import FormValidator from '../scripts/FormValidator.js';
import Popup from '../scripts/Popup.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

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

const validationObject = {
  formSelector: 'popup__form-container',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__saveButton',
  inactiveButtonClass: 'popup__saveButton_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

const userInfo = new UserInfo('.profile__name', '.profile__profession')
const body = document.querySelector('.body');
const popupEditProfile = body.querySelector('.popup_type_editProfile');
const popupAddCard = body.querySelector('.popup_type_addPlace');
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

const editProfileValidator = new FormValidator(validationObject, formEditProfile);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(validationObject, formAddCard);
addCardValidator.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_bigImage');
popupWithImage.setEventListeners();

const createCard = (item) => {
  const card = new Card(item, '.template', () => {
    popupWithImage.open(item);
  });
  return card.createCard();
}

const cardsSection = new Section({items: initialCards, renderer: createCard}, '.elements');
cardsSection.renderItems();

const popupAddForm = new PopupWithForm(
  '.popup_type_addPlace',
  () => {
    const item = {};
    item.name = inputCardPlace.value;
    item.link = inputCardLinkImage.value;
    const newCard = createCard(item);
    cardsSection.addItem(newCard);
    formAddCard.reset();
    popupAddForm.close();
  }
);
popupAddForm.setEventListeners();

openButtonAddCard.addEventListener('click', () => {
  // addCardValidator.toggleButtonState();
  popupAddForm.open();
});

const popupEditForm = new PopupWithForm('.popup_type_editProfile', () => {
  userInfo.setUserInfo(inputProfileName.value, inputProfileProfession.value);
  popupEditForm.close();
});
popupEditForm.setEventListeners();

openButtonEditProfile.addEventListener('click', () => {
  const inputValues = userInfo.getUserInfo();
  nameInput.value = inputValues.name;
  jobInput.value = inputValues.info;
  // editProfileValidator.toggleButtonState();
  popupEditForm.open();
});
