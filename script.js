class FormElement {

    constructor(inputField, errorLabel, checkIfValid) {
        this.inputField = inputField;
        this.errorLabel = errorLabel;
        this.checkIfValid = checkIfValid;
        this.addEventListeners();
    }

    addEventListeners() {
        this.inputField.addEventListener('input', this.validate.bind(this));
    }

    validate() {
        const message = this.checkIfValid(this.inputField.value);
        this.errorLabel.textContent = message;
        this.inputField.setCustomValidity(message);
    }

    getValue() {
        return this.inputField.value;
    }
}

const validCountries = [
    'Mexico',
    'United States',
    'Canada'
];

const email = new FormElement(
    document.getElementById('email'),
    document.querySelector('#email + .error'),
    (value) => {
        const pattern = new RegExp('[a-zA-Z0-9]+@[a-zA-Z0-9]+\.*[a-zA-Z]{0,3}');
        if (pattern.test(value)) return '';
        return 'Email should be in the format name@domain';
    }
);

const country = new FormElement(
    document.getElementById('country'),
    document.querySelector('#country + .error'),
    (value) => {
        if (validCountries.includes(value.trim())) return '';
        return 'Please select a valid country in North America';
    }
);

const zip = new FormElement(
    document.getElementById('zip'),
    document.querySelector('#zip + .error'),
    (value) => {
        const pattern = new RegExp('[0-9]{5}');
        if (pattern.test(value)) return '';
        return 'ZIP Code must consist of 5 numbers';
    }
);

const password = new FormElement(
    document.getElementById('password'),
    document.querySelector('#password + .error'),
    (value) => {
        const lengthPattern = new RegExp('.{8,}');
        const upperCasePattern = new RegExp('[A-Z]+');
        const lowerCasePattern = new RegExp('[a-z]+');
        if (!lengthPattern.test(value)) return 'Password must be at least 8 characters long';
        if (!upperCasePattern.test(value)) return 'Password must include at least one upper case letter';
        if (!lowerCasePattern.test(value)) return 'Password must include at least one lower case letter';
        return '';
    }
);

const passwordConfirm = new FormElement(
    document.getElementById('password-confirm'),
    document.querySelector('#password-confirm + .error'),
    (value) => {
        if (value === password.getValue()) return '';
        return `Passwords don't match`;    
    }
);

const form = document.querySelector('form');
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (form.checkValidity()) {
        alert('High Five!');
    } else {
        form.reportValidity();
    }
});