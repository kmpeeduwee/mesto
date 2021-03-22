import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupCardImage = this._popup.querySelector('.popup__image');
    this._cardCaption = this._popup.querySelector('.popup__caption');
  }

  open(item) {
    this._popupCardImage.src = item.link;
    this._popupCardImage.alt = item.name;
    this._cardCaption.textContent = item.name;
    super.open();
  }
}
