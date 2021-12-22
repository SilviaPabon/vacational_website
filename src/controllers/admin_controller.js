const controller = {}; 
/* const passport = require('passport'); */

controller.dashboard = (req, res) => {

    const handlebarsObject = {
        title: 'Admin Dashboard',
    };

    res.render('adminViews/dashboard', handlebarsObject); 
};

module.exports = controller; 