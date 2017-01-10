var Users = require('mongoose').model('users'),
    passport = require('passport');
exports.create = function(req, res, next){
    var users = new Users(req.body);
    users.save(function(err){
        if(err){
            console.error(err);
            return next(err);
        } else{
            res.json(users);
        }
    });
};

exports.list = function(req, res, next){
    Users.find({}, function(err, users) {
        if(err){
            console.error(err);
            return next(err);
        } else {
            res.json(users);
        }
    });
};

var getErrorMessage = function(err){
    var message = '';
    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'username already exists';
                break;
            default:
                message = 'something went wrong';
        }
    } else {
        for(var errName in err.errors){
            if(err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

exports.renderSignin = function(req, res, next){
    if(!req.users){
        res.render('signin', {
            title: 'sign in form',
            messages: req.flash('error') || req.flash('info')
        });
    }else{
        return res.redirect('/');
    }
};

exports.renderSignup = function(req, res, next){
    if(!req.users){
        res.render('signup', {
            title: 'sign up form',
            messages: req.flash('error') || req.flash('info')
        });
    }else{
        return res.redirect('/');
    }
};

exports.signup = function(req, res, next){
    if(!req.users){
        var users = new Users(req.body);
        console.log('signup ' + users.firstName);
        var message = null;
        users.provider = 'local';
        console.log('signup save start');
        users.save(function(err){
            if(err){
                var message = getErrorMessage(err);
                req.flash('error', message);
                console.error(err);
                return res.redirect('/signup');
            }
            console.log('signup save req.login start');
            req.login(users, function(err){
                if(err) {
                    console.error(err);
                    return next(err);
                }
                console.log('signup save res.redirect start');
                return res.redirect('/');
            });
        });
    }else{
        return res.redirect('/');
    }
};

exports.signout = function(req, res){
    req.logout();
    res.redirect('/');
};