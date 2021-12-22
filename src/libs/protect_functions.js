const pool = require('../database/database');  
const keys = require('../database/keys');

module.exports = {

    /*Función para saber si está logueado*/ 
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/users/signin');
    },

    /*Función para saber si no está logueado*/
    isNotLoggedId(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }

        res.redirect('/profile');
    },

    /*Función para saber si el usuario es administrador*/
    async isAdmin (req, res, next){

        /*Toma los roles del usuario*/
        const id = req.user.usersId; 
        const userRoles = await pool.query('SELECT roleId FROM usersHasRoles WHERE userId = ?', id); 

        //Si tiene el rol de admin, lo deja pasar
        if(userRoles.some( role => role.roleId == 1)){
            return next(); 
        }

        /*Si no es admin, lo regresa al dashboard de usuario*/ 
        res.redirect('/user/dashboard');

    }
};
