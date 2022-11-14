const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
const homeController = require('../controllers/home_controller');

router.get('/', passport.checkAuthentication,homeController.home);
router.use('/user',require('./users'));
router.use('/admin',require('./admin'));

module.exports = router;