const models = require('../models');



 exports.get_home = function(req, res, next) {//passport facilitates req.user if there is an active session

    res.render('home', { title: 'Mashat-Law'});

}