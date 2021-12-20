const controller = {}; 

controller.index = (req, res) => {
    res.send('This is the user route'); 
};

controller.signup = (req, res) => {
    res.render('auth/signup');
};

module.exports = controller; 