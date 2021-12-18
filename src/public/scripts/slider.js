var splide = new Splide('.splide', {
    type: 'loop',
    perPage: 3,
    gap: '16px',
    perMove: 1,
    //Inicialmente se quita la paginación ya que se sobrepone a los textos
    pagination: false,

    //Opciones para responsive
    breakpoints: {
        576: {
            perPage: 1,
        },
        768:{
            perPage: 2,
        }
    },
});

splide.mount();
