const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/plans_controller.js'); 

//Home de las rutas
router.get('/', controller.index); 

//Ruta de plan específico
router.get('/:id', controller.specificPlan); 


module.exports = router; 