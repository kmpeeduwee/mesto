export default class FormValidator {
  _inputSelector
  _submitButtonSelector
  _inactiveButtonClass
  _inputErrorClass
  _errorClass
  _formElement

  constructor(options, formElement) {
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formElement = formElement
  }

  _noValidInput = (inputs) => inputs.some(input => !input.validity.valid);

  _toggleButtonState = (inputs, button) => {
    if (this._noValidInput(inputs)) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
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
      const button = this._formElement.querySelector(`.${this._submitButtonSelector}`);
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          this._checkValidation(input);
          this._toggleButtonState(inputs, button);
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
