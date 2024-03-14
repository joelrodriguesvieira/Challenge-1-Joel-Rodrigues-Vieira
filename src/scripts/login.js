let inputUserEmail = document.getElementById('user-email');
inputUserEmail.addEventListener('input', (e) => addTextDecoration(e));

function addTextDecoration(event) {
    (event.target.value.trim() !== '') ? event.target.classList.add('underline-text') : event.target.classList.remove('underline-text');
}