const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

var userSchema = new Schema({
  username : {
    type: String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  displayName : {
    type: String,
  },
  biography : {
    type: String
  }
}, {
  timestamps: true
});


userSchema.pre('save', function(done){
  let user = this;
  if(!user.isModified('password')) {
    return done();
  }
  bcrypt.genSalt(10, function(error, salt){
    if(error) return done(error);
    bcrypt.hash(user.password, salt, function(error, hashPassword){
      if(error) return done(error);
      user.password = hashPassword;
      done();
    });
  });
});

userSchema.methods.name = function() {
  return this.displayName || this.username;
}

var User = mongoose.model('User', userSchema);
module.exports = User;
