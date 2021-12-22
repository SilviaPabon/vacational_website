const router = {}; 

//Las rutas se separaron por mayor organización
router.authentication = require('./authentication.js'); 
router.plans = require('./plans.js');
router.generalRoutes = require('./general_routes.js'); 
router.user = require('./user.js');
router.admin = require('./admin.js'); 

module.exports = router; 