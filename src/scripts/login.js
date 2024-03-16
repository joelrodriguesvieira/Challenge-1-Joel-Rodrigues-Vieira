window.addEventListener('load',main);

function main() {
    const btnRegisterNow = document.getElementById('btn-register');
    const btnLoginIn = document.getElementById('btn-submit-login');
    let inputUserEmail = document.getElementById('user-email');

    inputUserEmail.addEventListener('input', (e) => addTextDecoration(e));
    btnRegisterNow.addEventListener('click', () => {
        window.location.href = 'register.html';
    });
    btnLoginIn.addEventListener('click', checkInputs);
    
};

function addTextDecoration(event) {
    (event.target.value.trim() !== '') ? event.target.classList.add('underline-text') : event.target.classList.remove('underline-text');
};

function checkInputs() {
    const inputUserEmail = document.getElementById('user-email');
    const inputUserPassword = document.getElementById('password');
    let listUsers = JSON.parse(localStorage.getItem('users'));

    if (inputUserEmail.value === "" || inputUserPassword.value === "") {
        Toastify({
            text: "Please, fill in all fields",
            duration: 4000,
            style: {
                background: "#FF0000",
                color: "#fff",
            },
            gravity: "bottom",
            position: "left"
        }).showToast();
    } else if (listUsers !== null) {
        handleInputs(inputUserEmail,inputUserPassword);
    }

};

function handleInputs(userEmail,userPassword) {
    let listUsers = JSON.parse(localStorage.getItem('users'));
    let findUser = false;
    
    for (let i = 0; i < listUsers.length; i++) {
        if((listUsers[i].email === userEmail.value) && (listUsers[i].password === userPassword.value)) {
            window.location.href = 'dashboard.html';
            findUser = true;
        }
    }
    
    if (!findUser) {
        const p = document.createElement('p');
        const formLogin = document.getElementById('form-login');
        userEmail.style.border = '1px solid #E9B425';
        userPassword.style.border = '1px solid #E9B425';
        p.classList.add('message-form')
        p.textContent = `Wow, invalid username or password. Please, try again!`;
        formLogin.appendChild(p);
        setTimeout(() => {
            formLogin.removeChild(p);
        }, 2500);
    }
};