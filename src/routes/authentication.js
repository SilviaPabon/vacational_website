const express = require('express');
const router = express.Router();
const controller = require('../controllers/users_controller.js');
const protectFunctions = require('../libs/protect_functions'); 

router.get('/signup', protectFunctions.isNotLoggedId,  controller.signup);

router.post('/signup', protectFunctions.isNotLoggedId, controller.signupPost);

router.get('/signin', protectFunctions.isNotLoggedId, controller.signin);

router.post('/signin', protectFunctions.isNotLoggedId, controller.signinPost);

router.get('/logout', protectFunctions.isLoggedIn, controller.logout);

module.exports = router;
