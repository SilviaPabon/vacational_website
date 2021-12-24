const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/user_controller.js'); 

const {isLoggedIn} = require('../libs/protect_functions.js'); 

router.get('/dashboard', controller.dashboard);

router.get('/plans', isLoggedIn, controller.watchuserplans);

router.post('/plans', isLoggedIn, controller.addplans);



module.exports = router; 