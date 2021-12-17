const router = {}; 

//Las rutas se separaron por mayor organización
router.authentication = require('./authentication.js'); 
router.plans = require('./plans.js');
router.general_routes = require('./general_routes.js'); 

module.exports = router; 