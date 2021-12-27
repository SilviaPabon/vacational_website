const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/plans_controller.js'); 
const protectFunctions = require('../libs/protect_functions'); 

//Home de las rutas
router.get('/', controller.index); 

//Ruta de plan específico
router.get('/:id', controller.specificPlan); 

//Ruta para agregar un comentario a un plan
router.post('/comment/:id', protectFunctions.isLoggedIn ,controller.addComment); 

//Ruta para eliminar un comentario
router.get('/comment/delete/:id', protectFunctions.isLoggedIn, protectFunctions.ownComment, controller.removeComment); 

module.exports = router; 