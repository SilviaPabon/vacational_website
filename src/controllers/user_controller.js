const controller = {}; 

const pool = require('../database/database');

controller.dashboard = (req, res) => {
    res.render('userViews/dashboard');
};

controller.watchuserplans = async(req, res) => {
    const plans = await pool.query('SELECT * FROM RESERVATIONS WHERE usersId = ?', [req.user.usersId]);
    res.render('userViews/userEditplans', {plans});
};


controller.addplans = async (req, res) => {
    const {plansId, plansName, plansCountry, plansImageUrl} = req.body;

    const newReserv = {
        plansId,
        usersId: req.user.usersId
    }; //para enlazar el objeto con el usuario
    
    await pool.query('INSERT INTO RESERVATIONS set ?', [newReserv]);
    req.flash('success', 'link saved successfully'); //nombremensaje, valor mensaje
    console.log(newReserv); //me envía a links de nuevo
    res.redirect('/user/plans');
};

module.exports = controller; 