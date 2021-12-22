const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/user_controller.js'); 

router.get('/dashboard', controller.dashboard); 

module.exports = router; 