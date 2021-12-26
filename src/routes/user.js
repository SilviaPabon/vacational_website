const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/user_controller.js'); 

const {isLoggedIn} = require('../libs/protect_functions.js'); 

router.get('/dashboard', controller.dashboard);

router.get('/plans', isLoggedIn, controller.watchUserPlans);

router.post('/plans/add', isLoggedIn, controller.userAddPlans);

router.get('/plans/delete/:id', isLoggedIn, controller.userDeletePlans);

module.exports = router; 