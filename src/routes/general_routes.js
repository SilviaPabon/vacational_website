const express = require('express');
const router = express.Router();
const pool = require('../database/database');

router.get('/', async (req, res) => {
    //Antes de renderizar la vista, se cargan los planes para mostrarlos en el slider
    const plans = await pool.query('SELECT * FROM PLANS');

    //Objeto que handlebars renderizará
    const handlebarsObject = {
        customStyles: '<link rel="stylesheet" href="/styles/splide.min.css">',
        title: 'Home',
        carrouselData: plans
    };

    res.render('index', handlebarsObject);
});

module.exports = router;
