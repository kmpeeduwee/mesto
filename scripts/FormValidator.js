export default class FormValidator {
  constructor(
    {
      formSelector,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    }
  ) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  _setEventListeners() {
    const forms = Array.from(document.querySelectorAll(`.${this._formSelector}`));
    forms.forEach(form => {
      const inputs = Array.from(form.querySelectorAll(`.${this._inputSelector}`));
      const button = form.querySelector(`.${this._submitButtonSelector}`);


      inputs.forEach(input => {
        input.addEventListener('input', () => {
          this._checkValidation(form, input, `.${this._errorClass}`, `.${this._inputErrorClass}`);
          this._toggleButtonState(inputs, button, `${this._inactiveButtonClass}`);
        });
      });
    });
  }

  enableValidation = () => {
    const forms = Array.from(document.querySelectorAll(`.${this._formSelector}`));
    forms.forEach(form => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
      });
      this._setEventListeners();
    });
  };

  _noValidInput = (inputs) => inputs.some(input => !input.validity.valid);

  _toggleButtonState = (inputs, button, disableClass) => {
    if (this._noValidInput(inputs)) {
      button.classList.add(disableClass);
      button.disabled = true;
    } else {
      button.classList.remove(disableClass);
      button.disabled = false;
    }
  };

  _checkValidation = (form, input, errorClass, inputErrorClass) => {
    if (!input.validity.valid) {
      this._showInputError(form, input, input.validationMessage, errorClass, inputErrorClass);
    } else {
      this._hideInputError(form, input, errorClass, inputErrorClass);
    }
  };

  _getElementError = (form, inputId) => form.querySelector(`.${inputId}-error`);

  _showInputError = (form, input, errorMessage, errorClass, inputErrorClass) => {
    const error = this._getElementError(form, input.id);
    input.classList.add(inputErrorClass);
    error.classList.add(errorClass);
    error.textContent = errorMessage;
  };

  _hideInputError = (form, input, errorClass, inputErrorClass) => {
    const error = this._getElementError(form, input.id);
    input.classList.remove(inputErrorClass);
    error.classList.remove(errorClass);
    error.textContent = '';
  };
}
