const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
const homeController = require('../controllers/home_controller');
const adminController = require('../controllers/admin_controller');

// used passport.checkAuthentication before accessing the routes to check user authentication
router.get('/', passport.checkAuthentication,homeController.home);

router.post('/admin/update-review/:id', passport.checkAuthentication, adminController.updateReview);

router.use('/user',require('./users'));

// used passport.checkAdminAuthorization and passport.checkEmployeeAuthorization to prevent employee from accessing admin's views and privileges and vice versa
router.use('/admin', passport.checkAuthentication, passport.checkAdminAuthorization, require('./admin'));

router.use('/employee', passport.checkAuthentication, passport.checkEmployeeAuthorization,require('./employee'));

module.exports = router;