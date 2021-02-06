const validateOptions = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saveButton',
  inactiveButtonClass: 'popup__saveButton_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
}

const enableValidation = (options) => {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  } = options

  const forms = Array.from(document.querySelectorAll(formSelector))

  forms.forEach(form => {
    const button = form.querySelector(submitButtonSelector)
    const inputs = Array.from(form.querySelectorAll(inputSelector))
    toggleButtonState(inputs, button, inactiveButtonClass)
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      toggleButtonState(inputs, button, inactiveButtonClass)
    })
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkValidation(form, input, errorClass, inputErrorClass)
        toggleButtonState(inputs, button, inactiveButtonClass)
      })
    })
  })
}
const noValidInput = (inputs) => inputs.some(input => !input.validity.valid)

const toggleButtonState = (inputs, button, disableClass) => {
  if (noValidInput(inputs)) {
    button.classList.add(disableClass)
    button.disabled = true
  } else {
    button.classList.remove(disableClass)
    button.disabled = false
  }
}
const checkValidation = (form, input, errorClass, inputErrorClass) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, errorClass, inputErrorClass)
  } else {
    hideInputError(form, input, errorClass, inputErrorClass)
  }
}
const getElementError = (form, inputId) => form.querySelector(`.${inputId}-error`)
const showInputError = (form, input, errorMessage, errorClass, inputErrorClass) => {
  const error = getElementError(form, input.id)
  input.classList.add(inputErrorClass)
  error.classList.add(errorClass);
  error.textContent = errorMessage;
};
const hideInputError = (form, input, errorClass, inputErrorClass) => {
  const error = getElementError(form, input.id)
  input.classList.remove(inputErrorClass)
  error.classList.remove(errorClass);
  error.textContent = '';
};
