require('dotenv/config');
const mongoose = require('mongoose');

const {
  DB_USER,
  DB_PASS, 
  DB_NAME
} = process.env;

mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@ds247377.mlab.com:47377/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true
}, function(error){
  if(error) throw error;
  console.log('Connected database!');
});
