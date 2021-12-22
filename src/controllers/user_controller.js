const controller = {}; 

controller.dashboard = (req, res) => {
    res.render('userViews/dashboard');
};

module.exports = controller; 