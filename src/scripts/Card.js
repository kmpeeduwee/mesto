export default class Card {
  constructor(name, link, templateSelector, openButtonImg) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._openButtonImg = openButtonImg;
  }

  _getTemplate() {
    const card = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return card;
  }

  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__image').alt = this._name;
    this._card.querySelector('.card__title').textContent = this._name;
    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.card__button_delete').addEventListener('click', (evt) => {
      evt.target.closest('.card').remove();
    });

    this._card.querySelector('.card__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like_type_active');
    });

    this._card.querySelector('.card__image').addEventListener('click', () => {
    this._openButtonImg(this._name, this._link)
    });
  }
}
