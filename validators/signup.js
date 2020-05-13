
let models = require('../models');
let validator = require('validator');

const validateCreateUserFields = function(errors, req){//this function is synch
    if(!validator.isEmail(req.body.email)){
        errors["email"] = "Please use a valid email.";
    }
    if(!validator.isAscii(req.body.password)){
        errors["password"] = "Invalid characters in password";
    }
    if(!validator.isLength(req.body.password, {min: 8, max: 25})){
        errors["password"] = "Minimum characters for password is 8, maximum is 25";
    }
}
//thous function need to work at the same time, for these we need to use a Promise:
exports.validateUser = function(errors, req){//this function is asynch
    return new Promise(function(resolve, reject){
        validateCreateUserFields(errors, req);
        return models.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(u => {
            if(u !== null){
                errors["email"] = "Email is already in use. Please login or reset your password";
            }
            resolve(errors);
        })
    })

}