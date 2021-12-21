const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/users_controller.js'); 

router.get('/', controller.index); 

router.get('/signup', controller.signup); 

router.post('/signup', controller.signupPost);

router.get('/signin', controller.signin); 

module.exports = router; 