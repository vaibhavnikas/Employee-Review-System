const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
const adminController = require('../controllers/admin_controller');

router.get('/', adminController.home);

router.get('/manage-employees', adminController.manageEmployees);

module.exports = router;