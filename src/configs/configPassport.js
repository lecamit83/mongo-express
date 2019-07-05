const passport = require('passport');
const User = require('../models/user.model');
module.exports = function configPassport(){
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function(id, done){
        User.findById(id, function(error, user){
            done(error, user);
        });
    });
};