const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/admin_controller'); 
const protectFunctions = require('../libs/protect_functions'); 

//Home de las rutas
router.get('/dashboard', protectFunctions.isLoggedIn, protectFunctions.isAdmin, controller.dashboard); 

router.get('/createAccount', protectFunctions.isLoggedIn, protectFunctions.isAdmin, controller.createAccount); 
router.post('/createAccount', protectFunctions.isLoggedIn, protectFunctions.isAdmin, controller.createAccountPost);

router.get('/plans', protectFunctions.isLoggedIn, protectFunctions.isAdmin, controller.plans); 

router.get('/plans/add', protectFunctions.isLoggedIn, protectFunctions.isAdmin, controller.addPlan); 
router.post('/plans/add', protectFunctions.isLoggedIn, protectFunctions.isAdmin, controller.addPlanPost); 

router.get('/plans/delete/:id', protectFunctions.isLoggedIn, protectFunctions.isAdmin, controller.removePlan); 


module.exports = router; 