//обработка открытия/закрытия попапа

let openButton = document.querySelector('.profile__editButton');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__closeButton');

let tooglePopup = () => {
  popup.classList.toggle('popup_opened');
};

openButton.addEventListener('click', tooglePopup);
closeButton.addEventListener('click', tooglePopup);

popup.addEventListener('click', () => {
  if (event.target === event.currentTarget) {
    tooglePopup();
  };
});

//обработка формы

let form = document.querySelector('.popupForm');

let nameInput = document.querySelector('.profile__name').textContent;
let jobInput = document.querySelector('.profile__profession').textContent;


const nameProfile = document.forms.profile.elements.name;
const professionProfile = document.forms.profile.elements.profession;

nameProfile.value = nameInput;
professionProfile.value = jobInput;

//сохранение введенных в форму значений

const popupSaveButton = document.querySelector('.popup__saveButton');
popupSaveButton.addEventListener('click', function (event) {
  const userName = document.querySelector('.profile__name');
  const userProfession = document.querySelector('.profile__profession');
  userName.textContent = nameProfile.value;
  userProfession.textContent = professionProfile.value;
  event.preventDefault();
  tooglePopup();
});


