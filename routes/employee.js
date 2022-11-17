const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
const employeeController = require('../controllers/employee_controller');

router.get('/', employeeController.displayEmployeeView);

module.exports = router;