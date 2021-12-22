const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/admin_controller'); 
const protectFunctions = require('../libs/protect_functions'); 

//Home de las rutas
router.get('/dashboard', protectFunctions.isLoggedIn, protectFunctions.isAdmin, controller.dashboard); 

module.exports = router; 