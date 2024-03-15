window.addEventListener('load', main);

function main() {    
    const btnRegisterUser = document.getElementById('btn-register');
    btnRegisterUser.addEventListener("click", handleForm);
};

function handleForm(e) {
    e.preventDefault();
    const userNameInput = document.getElementById('first-name').value;
    const lastNameInput = document.getElementById('last-name').value;
    const dateBirthdayInput = document.getElementById('birth-date').value;
    const countryInput = document.getElementById('country').value;
    const cityInput = document.getElementById('city').value;
    const emailInput = document.getElementById('e-mail').value;
    const passwordInput = document.getElementById('password').value;
    const passwordCheckInput = document.getElementById('check-password').value;

    if (validateForm(userNameInput,lastNameInput,dateBirthdayInput,countryInput,cityInput,emailInput,passwordInput,passwordCheckInput)) {
        let listUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = {
            'first-name': userNameInput,
            'last-name': lastNameInput,
            'date-birthday': dateBirthdayInput,
            'country': countryInput,
            'city': cityInput,
            'email': emailInput,
            'password': passwordInput
        };
        listUsers.push(user);
        localStorage.setItem('users',JSON.stringify(listUsers));
        document.getElementById('unique-form').reset();
        Toastify({
            text: "Registered User",
            duration: 4000,
            style: {
                background: "linear-gradient(to right, #FF2D04, #C13216)",
                color: "#fff",
            },
            gravity: "bottom",
            position: "left"
        }).showToast();
    } else {
        Toastify({
            text: "Please, check the values entered",
            duration: 4000,
            style: {
                background: "#FF0000",
                color: "#fff",
            },
            gravity: "bottom",
            position: "left"
        }).showToast();
    }

};

function validateForm(firstName, lastName,date,country,city,email,password,checkPassword) {
    return isValidInput(firstName) && 
           isValidLastName(lastName) &&
           isValidDateBirthday(date) &&
           isValidInput(country) &&
           isValidInput(city) &&
           isValidEmail(email) &&
           isValidPassword(password) &&
           isValidCheckPassword(password, checkPassword);
}

function isValidInput(word) {
    let check = /^[A-Z][a-z]*\s?^[A-Z][a-z]*$/;
    return check.test(word);
};

function isValidLastName(lastName) {
    let check = /^[A-Z][a-z]*/;
    return check.test(lastName);
};

function isValidDateBirthday(date) {
    let check = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19\d{2}|20[012]\d)$/;
    return check.test(date);
};

function isValidEmail(email) {
    let check = /\w+@\w+\.\w+/;
    return check.test(email);
};

function isValidPassword(password) {
    let check = /^([a-zA-Z0-9@*#]{4,16})/;
    return check.test(password);
};

function isValidCheckPassword(password,checkPassword) {
    return (password === checkPassword);
};
