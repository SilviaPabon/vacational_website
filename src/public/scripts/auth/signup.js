const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input'); //access inputs inside form

const expressions = {
	username: /^[a-zA-Z0-9\_\-]{1,32}$/, // Letras, numeros, guion y guion_bajo
	fullname: /^[a-zA-ZÀ-ÿ\s]{1,64}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{3,12}$/, // 4 a 12 digitos.
};

const camps = {
    username: false,
    fullname: false,
    password: false
};

const validateForm = (e) => {
    switch (e.target.name) {
        case 'username':
            validateCamp(expressions.username, e.target, 'username');
        break;
        case 'usersFullname':
            validateCamp(expressions.fullname, e.target, 'fullname');
        break;
        case 'password':
            validateCamp(expressions.password, e.target, 'password');
        break;
    }
};

const validateCamp = (expression, input, camp) => {
    if (expression.test(input.value)){
        document.getElementById(`group__${camp}`).classList.remove('form__group--incorrect');
        document.getElementById(`group__${camp}`).classList.add('form__group--correct');
        document.querySelector(`#group__${camp} i`).classList.add('fa-check-circle');
        document.querySelector(`#group__${camp} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group__${camp}  .form__input-error`).classList.remove('form__input-error-act');
        camps[camp] = true;
    } else {
        document.getElementById(`group__${camp}`).classList.add('form__group--incorrect');
        document.getElementById(`group__${camp}`).classList.add('form__group--correct');
        document.querySelector(`#group__${camp} i`).classList.add('fa-times-circle');
        document.querySelector(`#group__${camp} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group__${camp}  .form__input-error`).classList.add('form__input-error-act');
        camps[camp] = false;
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (e) => {
    
    if(camps.username && camps.fullname && camps.password){
        this.submit();
        //return;
    } else {
        e.preventDefault();
        document.querySelectorAll('.form__group--correct').forEach((icon) => {
			icon.classList.remove('form__group--correct');
		});
        document.querySelectorAll('.form__group--incorrect').forEach((icon) => {
			icon.classList.remove('form__group--incorrect');
		});
        document.getElementById('form__message').classList.add('form__message--act');
        setTimeout(() => {
            document.getElementById('form__message').classList.remove('form__message--act');
        }, 5000);
    } 
});