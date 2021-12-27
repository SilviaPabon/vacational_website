const navIcon = document.querySelector('.nav__toggle'); 
const navList = document.querySelector('.nav__navigation'); 
const body = document.getElementsByTagName('body')[0]; 

//Cuando se haga click sobre el menú de celulares, despliega el menú lateral
navIcon.addEventListener('click', ()=>{
    navList.classList.toggle('nav__visible'); 
    body.classList.toggle('body--fixed');

    if(navList.classList.contains('nav__visible')){
        navIcon.setAttribute('aria-label', 'Close menu'); 
    }else{
        navIcon.setAttribute('aria-label', 'Open menu'); 
    }
}); 