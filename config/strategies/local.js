var passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    users = require('mongoose').model('users');

module.exports = function(){
    passport.use(new localStrategy(function(username, password, done){
        users.findOne({
            username: username
        }, function(err, user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false, {
                    message: 'unknown user'
                });
            }
            if(!user.authenticate(password)){
                return done(null, false, {
                    message: 'invalid password'
                });
            }
            return done(null, user);
        });
    }));
};