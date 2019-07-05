const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const logger = require('morgan');
require('./db/mongo.db');

const apiRoute = require('./routes/api.route');
const configPassport = require('./configs/configPassport');

//Declare and Configure
const app = express();
const PORT = process.env.PORT || 3000;

const configSession = {
  secret: 'mySecret',
  saveUninitialized: true,
  resave : true,
  cookie : {
    maxAge: 24*1000,
  }
}

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session(configSession));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
configPassport();

//Routers
app.use('/api', apiRoute);

// Running Server
app.listen(PORT, function(error){
  if(error) throw error;
  console.log(`Server is running on PORT=${PORT}`);
})
