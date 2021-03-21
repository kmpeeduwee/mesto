export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return card;
  }

  _handleTrashClick(evt) {
    this._card.remove();
  }

  _handleLikeClick(evt) {
    this._card.querySelector('.card__like').classList.toggle('card__like_type_active');
  }

  _setEventListeners() {
    this._card.querySelector('.card__button_delete').addEventListener('click', () => {
      this._handleTrashClick();
    });

    this._card.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__image').alt = this._name;
    this._card.querySelector('.card__title').textContent = this._name;
    return this._card;
  }

}
