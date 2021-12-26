const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/user_controller.js'); 
const protectFunctions = require('../libs/protect_functions'); 

router.get('/dashboard', protectFunctions.isLoggedIn, controller.dashboard);

router.get('/plans', protectFunctions.isLoggedIn, controller.watchUserPlans);

router.post('/plans/add', protectFunctions.isLoggedIn, controller.userAddPlans);

router.get('/plans/delete/:id', protectFunctions.isLoggedIn, controller.userDeletePlans);

module.exports = router; 