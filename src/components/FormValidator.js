export default class FormValidator {
  constructor(options, formElement) {
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(`.${this._submitButtonSelector}`);
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  };

  _noValidInput = (inputs) => inputs.some(input => !input.validity.valid);

  _toggleButtonState = (inputs) => {
    if (this._noValidInput(inputs)) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  };

  _showInputError = (input, errorMessage) => {
    const error = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = errorMessage;
  };

  _hideInputError = (input) => {
    const error = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  };

  _setEventListeners() {
      const inputs = Array.from(this._formElement.querySelectorAll(`.${this._inputSelector}`));
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          this._checkValidation(input);
          this._toggleButtonState(inputs);
        });
      });
  }

  _checkValidation = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners()
  }
}
