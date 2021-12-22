const passport = require("passport");

const controller = {}; 
/* const passport = require('passport'); */

controller.dashboard = (req, res) => {

    const handlebarsObject = {
        title: 'Admin Dashboard',
    };

    res.render('adminViews/dashboard', handlebarsObject); 
};

controller.createAccount = (req, res) => {

    const handlebarsObject = {
        title: 'Admin Create Account',
    };

    res.render('auth/signup_admin', handlebarsObject); 

}; 

controller.createAccountPost = passport.authenticate('local.adminSignup', {
    successRedirect: '/admin/dashboard', 
    failureRedirect: '/admin/createAccount', 
    failureFlash: true
});  

/* controller.signupPost =  passport.authenticate('local.signup', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/users/signup',
    failureFlash: true
}); */

module.exports = controller; 