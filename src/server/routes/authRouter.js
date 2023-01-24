const Router = require('express');
const {check} = require("express-validator");
const controller = require('../controllers/authController');
const router = new Router();

router.post('/registration',
  [
    check('email', 'Incorrect email').isEmail(),
    check('firstName', 'Type in your name').isLength({min:1}),
    check('lastName', 'Type in your name').isLength({min:1}),
    check('password', 'The password length must be at least one symbol').isLength({min: 1})
  ],
  controller.registration);

  router.post('/login',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password').exists()
    ],
    controller.login);

router.post('/login', controller.login);

module.exports = router;