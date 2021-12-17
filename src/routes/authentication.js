const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/users_controller.js'); 

router.get('/', controller.index); 

module.exports = router; 