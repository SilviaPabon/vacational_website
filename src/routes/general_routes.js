const express = require('express');
const router = express.Router();
const pool = require('../database/database');
const protectFunctions = require('../libs/protect_functions'); 

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

router.get('/dashboard', protectFunctions.isLoggedIn, async (req, res) => {
    
    /*Toma los roles del usuario*/
    const id = req.user.usersId; 
    const userRoles = await pool.query('SELECT roleId FROM usersHasRoles WHERE userId = ?', id); 

    //Si tiene el rol de admin, lo redirige al dashboard de admin
    if(userRoles.some( role => role.roleId == 1)){
        res.redirect('/admin/dashboard');  
    }else{
        //Si no es admin, lo redirige al dashboard de user
        res.redirect('/user/dashboard');  
    }

}); 

module.exports = router;
