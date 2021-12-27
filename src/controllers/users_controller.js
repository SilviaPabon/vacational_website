const controller = {}; 
const passport = require('passport');
const pool = require('../database/database'); 

controller.signup = (req, res) => {
    const handlebarsObject = {
        title: 'Users :: Sign Up', //Título de la página
    };
    res.render('auth/signup', handlebarsObject);
};

controller.signupPost =  passport.authenticate('local.signup', {
    successRedirect: '/users/signin',
    failureRedirect: '/users/signup',
    failureFlash: true
});

controller.signin = (req, res) => {
    const handlebarsObject = {
        title: 'Users :: Sign In', //Título de la página
    };
    res.render('auth/signin', handlebarsObject);
};

controller.signinPost = (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/signin',
        failureFlash: true
    })(req, res, next);
};

//Vista para editar los cambpos que están en la BD
controller.editAccount = async(req, res) => {

    //Se obtiene el id del usuario
    const { usersId } = req.user; 
    
    //Se obtienen los datos actuales del usuario
    const actualUser = await pool.query('SELECT * FROM USERS WHERE usersId = ?', [usersId]); 
    
    //Se mandan los datos dentro del objeto de Handlebars
    const handlebarsObject = {
        title: 'Users :: Update Account',
        actualUser: actualUser[0]
    };

    res.render('auth/edit', handlebarsObject); 

}; 

//Vista a la que se hace POST para actualizar los datos en la BD (Se encarga passport)
controller.updateAccount = (req, res, next) => {
    passport.authenticate('local.updateAccount', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/update',
        failureFlash: true
    })(req, res, next);
}; 

controller.logout = (req, res) => {
    req.logOut(); //Cierra la sesión
    res.redirect('/users/signin'); //Lo redirecciona a iniciar sesión
};

module.exports = controller; 