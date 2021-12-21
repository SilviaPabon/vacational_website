const controller = {}; 
const passport = require('passport');

controller.index = (req, res) => {
    res.send('This is the user route'); 
};

controller.signup = (req, res) => {
    res.render('auth/signup');
};

controller.signupPost =  passport.authenticate('local.signup', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/users/signup',
    failureFlash: true
}); 

module.exports = controller; 