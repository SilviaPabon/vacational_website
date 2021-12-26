const controller = {}; 

const pool = require('../database/database');

controller.dashboard = (req, res) => {
    res.render('userViews/dashboard');
};
//despliegue de planes del usuario
controller.watchUserPlans = async(req, res) => {
    const plans = await pool.query('SELECT PLANS.plansId, plansName, plansCountry, plansImageUrl, reservationsDate FROM PLANS, RESERVATIONS WHERE PLANS.plansId = RESERVATIONS.plansId and RESERVATIONS.usersId = ?', [req.user.usersId]);
    res.render('userViews/userEditplans', {plans});
};

//para que el usuario agrege los planes
controller.userAddPlans = async (req, res) => {
    const {plansId} = req.body;
    
    const newReserv = {
        plansId,
        usersId: req.user.usersId
    }; 

    const rows = await pool.query('SELECT * FROM RESERVATIONS WHERE plansId = ? and usersId = ?', [plansId, req.user.usersId]);

    console.log(plansId);
    if(rows.length > 0) {
        const user = rows[0];
        console.log(user);
        req.flash('message','You already have this reservation');
        res.redirect('/user/plans');
    } else {
        await pool.query('INSERT INTO RESERVATIONS set ?', [newReserv]);
        res.redirect('/user/plans');
    }
    //await pool.query('INSERT INTO RESERVATIONS set ?', [newReserv]);
    //req.flash('success', 'Your reservation has been made successfully'); 
    
};

controller.userDeletePlans = async(req, res) => {
    const { id } = req.params;

    //Intenta eliminar el id dado
    const result = await pool.query('DELETE FROM RESERVATIONS WHERE plansId = ? and usersId = ?', [id, req.user.usersId]);

    if (result['affectedRows'] == 0) {
        req.flash('message', `You don't have any reservation with ${id} id`); 
        res.redirect('/user/plans');
    } else {
        //SE manda el flash para indicar que se eliminó correctamente
        req.flash('success', 'Reservation deleted succesfully');
        res.redirect('/user/plans');
    }
};

module.exports = controller; 