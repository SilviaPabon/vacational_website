const express = require('express');
const router = express.Router();
const controller = require('../controllers/users_controller.js');

router.get('/signup', controller.signup);

router.post('/signup', controller.signupPost);

router.get('/signin', controller.signin);

router.post('/signin', controller.signinPost);

router.get('/logout', (req, res) => {
    req.logOut(); //Cierra la sesión
    res.redirect('/users/signin'); //Lo redirecciona a iniciar sesión
});

module.exports = router;
