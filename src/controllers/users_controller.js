const controller = {}; 
const passport = require('passport');

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

controller.logout = (req, res) => {
    req.logOut(); //Cierra la sesión
    res.redirect('/users/signin'); //Lo redirecciona a iniciar sesión
};

module.exports = controller; 