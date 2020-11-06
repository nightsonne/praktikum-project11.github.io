export default class FormValidator {
	constructor(form) {
		this.form = form;
		this.setEventListeners = this.setEventListeners.bind(this);
	}

	checkInputValidity(input, errorMessage) {
    
    if (input.validity.valueMissing) {
      errorMessage.textContent = 'Это обязательное поле';
      return false
    } else if (input.validity.tooShort || input.validity.tooLong) {
      errorMessage.textContent = 'Должно быть от 2 до 30 символов';
      return false
    } else if (input.validity.typeMismatch && input.type === 'url') {
      errorMessage.textContent = 'Здесь должна быть ссылка';
      return false
    } else {
    errorMessage.textContent = '';
    return true;
    }
	};

	setSubmitButtonState(valid) {
		const button = this.form.querySelector('button');
		if (!valid) {
			button.setAttribute('disabled', true);
			button.classList.remove('popup__button_valid');
		}
		if (valid) {
			button.removeAttribute('disabled', true);
			button.classList.add('popup__button_valid');
		}
  };
  
	isFieldValid(input) {
		const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
		const valid = this.checkInputValidity(input, errorElem);
		return valid;
  };
  
	setEventListeners() {
		const inputs = [...this.form.querySelectorAll('input')];
		this.form.addEventListener('input', (evnt) => {
			const inputForValidation = evnt.target;
			this.isFieldValid(inputForValidation);
			if (inputs.every((input) => input.validity.valid)) {
				this.setSubmitButtonState(true);
			} else {
				this.setSubmitButtonState(false);
			}
		});
  };
  
resetFormErrors() {
  const inputs = [...this.form.querySelectorAll('input')];
  inputs.forEach((input) => {
  const error = input.parentNode.querySelector(`#${input.id}-error`);
  input.setCustomValidity('');
  error.innerText = '';
 });
};

}
