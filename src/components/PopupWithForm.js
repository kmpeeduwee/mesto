import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form-container');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submit = submit;
}

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submit);
  }

  _submit = (evt) => {
    evt.preventDefault();
    this._getInputValues();
  }

  close() {
    super.close();
  }
}
