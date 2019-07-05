const express = require('express');
const UsersController = require('../controllers/users.controller');
const router = express.Router();


router.route('/')
  .get(UsersController.getUsers);


router.route('/loggin')
  .get(UsersController.ensureAuthenticated ,UsersController.getLogginPage)
  .post(UsersController.loggin);
router.route('/signup')
  .get((req, res)=>{
    res.send({message : 'sign up page'})
  })
  .post(UsersController.signUp);


router.get('/home',  UsersController.getHomePage);

router.route('/user/:username')
  .get(UsersController.getUser);
  

router.route('/update/:id')
  .get((req, res)=>{
    res.send(req.params.id);
  })
  .put(UsersController.updateUser);
  
  
module.exports = router;
