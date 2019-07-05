const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const User = require('../models/user.model');

module.exports = {
  getUsers : function(req, res, next) {
    User.find({})
      .sort({ createdAt : 'asc'})
      .exec(function(error, users){
        if(error) return next(error);
        res.status(200).send({users});
      });
  },
  getUser : function(req, res, next) {
    const { username } = req.params;
    console.log(username);
    User.findOne({ username })
      .sort({ createdAt : 'asc'})
      .exec(function(error, user){
        if(error) return next(error);
        if( !user ) return next(404);
        res.status(200).send({user});
      });
  },
  ensureAuthenticated : function(req, res, next) {
    if(req.isAuthenticated()){
      return res.redirect('/api/users/home');
    }
    next();
  },
  updateUser : function(req, res, next) {
    const { id } = req.params;
  
    User.findByIdAndUpdate(id, req.body)
      .exec(function(error, user){
        if(error) return next(error);
        res.status(200).send({user});
      });
  },
  signUp : function(req, res, next){
    const { username, password } = req.body;
    User.findOne({ username }, function(error, user){
      if(error) return next(error);
      if(user){
        res.send({message : "User already exist!"});
      }
      let newUser = new User({ username, password });
      newUser.save().then(function(){
        res.status(201).send(newUser);
      });
    });
  },
  getLogginPage : function(req, res) {
    res.send({message : 'Login Page'});
  },
  loggin : passport.authenticate('local', {
    failureRedirect : '/api/users/loggin',
    successRedirect : '/api/users/home'
  }),
  getHomePage : function(req, res){
    res.send({ message : 'Home Page'});
  },

}
passport.use('local', new LocalStrategy(function(username, password, done){
  User.findOne({ username }, function(error, user){
      if(error) return done(error);
      if( !user ) return done(null, false);
      if(!user.verifyPassword(password)) {return done(null, false);}
      return done(null, user);
  });
}));
