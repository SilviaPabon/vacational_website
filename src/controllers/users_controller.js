const controller = {}; 
const passport = require('passport');

controller.signup = (req, res) => {
    res.render('auth/signup');
};

controller.signupPost =  passport.authenticate('local.signup', {
    successRedirect: '/users/signin',
    failureRedirect: '/users/signup',
    failureFlash: true
});

controller.signin = (req, res) => {
    res.render('auth/signin');
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