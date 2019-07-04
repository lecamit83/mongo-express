
const User = require('../models/user.model');

module.exports = {
  getUsers : function(req, res, next) {
    User.find({})
      .sort({ createdAt : 'asc'})
      .exec(function(error, users){
        if(error) return next(error);
        res.send({users});
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
      newUser.save();
    });
  }
  
}
