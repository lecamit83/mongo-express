const express = require('express');
const UsersController = require('../controllers/users.controller');
const router = express.Router();

router.route('/')
  .get(UsersController.getUsers);

router.route('/signup')
  .post(UsersController.signUp);

  
module.exports = router;
