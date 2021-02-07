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
const template = body.querySelector('.template');
const formAddCard = popupAddCard.querySelector('.popup__form-container');
const cardContainer = body.querySelector('.elements');
const popupImage = popupBigImage.querySelector('.popup__image');
const popupImageCaption = popupBigImage.querySelector('.popup__caption');
const saveButtonAddCard = popupAddCard.querySelector('.popup__saveButton_type_card');

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

function creatCard(cardName, cardImageLink) {
  const cardPart = template.content.cloneNode(true);
  const placeName = cardPart.querySelector('.card__title');
  const placeImage = cardPart.querySelector('.card__image');
  const cardButtonDelete = cardPart.querySelector('.card__button_delete');
  const cardLikeButton = cardPart.querySelector('.card__like');
  placeName.textContent = cardName;
  placeImage.src = cardImageLink;
  placeImage.alt = cardName;
  placeImage.addEventListener('click', openButtonImg);
  cardLikeButton.addEventListener('click', likePlace);
  cardButtonDelete.addEventListener('click', removePlace);
  return cardPart;
}

function openButtonImg(evt) {
  const targetElement = evt.target;
  popupImage.src = targetElement.src;
  popupImage.alt = targetElement.alt;
  popupImageCaption.textContent = targetElement.alt;
  openPopup(popupBigImage);
}

function likePlace(evt) {
  evt.target.classList.toggle('card__like_type_active');
}

function removePlace(evt) {
  evt.target.closest('.card').remove();
}

function addPlace(evt) {
  evt.preventDefault();
  cardContainer.prepend(creatCard(inputCardPlace.value, inputCardLinkImage.value));
  closePopup(popupAddCard);
}

openButtonEditProfile.addEventListener('click', function () {
  inputProfileName.value = nameInput.textContent;
  inputProfileProfession.value = jobInput.textContent;
  openPopup(popupEditProfile);
});

openButtonAddCard.addEventListener('click', function () {
  formAddCard.reset();
  saveButtonAddCard.setAttribute('disabled', 'true');
  openPopup(popupAddCard);
});

initialCards.forEach(function (item) {
  cardContainer.prepend(creatCard(item.name, item.link));
});

formEditProfile.addEventListener('submit', editProfile);
formAddCard.addEventListener('submit', addPlace);
