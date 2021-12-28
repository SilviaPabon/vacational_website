const deleteButtons = document.querySelectorAll('#deleteComment'); 

deleteButtons.forEach(button => {
    //Por cada botón se añade un mensaje de confirmación
    button.addEventListener('click', (e) => {
        if(!confirm('Are you sure you want to delete it?')){
            e.preventDefault(); //Si se da cancelar, se evita el click
        }
    }); 
}); 