const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
	userName: /^[a-zA-Z0-9\_\-]{4,32}$/, // Letras, numeros, guion y guion_bajo
	fullName: /^[a-zA-ZÀ-ÿ\s]{1,64}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/,// 7 a 14 numeros.
};
