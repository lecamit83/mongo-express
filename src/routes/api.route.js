const express = require('express');
const userRoute = require('./users.route');
const router = express.Router();

router.use('/users', userRoute);


// Catch 404 Error 
router.use(function(error, req, res, next){
  console.error(error);
  res.status(404);
  res.send({
    errors : 'Not Found!'
  });
});
// Catching Error Handling

module.exports = router;
