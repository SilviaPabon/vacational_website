const pool = require('../database/database');  

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

        res.redirect('/dashboard');
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

    },

    /*Función para saber si el usuario es dueño de un comentario (Y lo pueede eliminar)*/
    async ownComment (req, res, next){

        //Se obtiene el id del usuario actual y el id del comentario a eliminar
        const actualUserId  = req.user.usersId; 
        const commentId = req.params.id; 

        //Se selecciona el id de la persona que es dueña del comentario a eliminar
        const result = await pool.query('SELECT usersId, plansId FROM COMMENTS WHERE commentsId = ?', [commentId]); 
        
        if(result[0]['usersId'] == actualUserId){
            //Si es dueño, lo deja continuar
            return next(); 
        }else{
            //Si no es dueño, lo regresa y le envía un mensaje
            req.flash('message', 'You can´t delete other person´s comment'); 
            res.redirect(`/plans/${result[0]['plansId']}`); 
        } 

    } 
};
