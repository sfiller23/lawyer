let LocalStrategy = require('passport-local').Strategy;//defining local strategy to handle auth

let bcrypt = require('bcrypt');//for password incription
let models = require('./models');

const validPassword = function(user, password){
    return bcrypt.compareSync(password, user.password);//compers the hash passwords
}
module.exports = function(passport){
    passport.serializeUser(function(user,done){// saves user in session
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){// fethes user from db
        models.User.findOne({
            where:{
                'id':id
            }
        }).then(user => {
            if(user == null){
                done(new Error('Wrong user id'));
            }
            done(null, user);
        });
    });
    passport.use(new LocalStrategy({// telling passport what fields to authenticate
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true//to include the req param in the next function for error handling
    },
    function(req, email, password, done){
        return models.User.findOne({
            where: {
                'email':email
            },
        }).then(user => {
            if(user == null){//errors of auth:
                req.flush('message', 'Incorrect Credentials.');
                return done(null, false);
            }else if(user.password == null || user.password == undefined){
                req.flash('message', 'You must reset your password');
                return done(null, false);
            }else if(!validPassword(user, password)){
                req.flush('message', 'Incorrect Credentials.');
                return done(null, false);
            }
            return done(null,user);
        }).catch(err => {
            done(null,false);
        })//errors of db
    }))

}

