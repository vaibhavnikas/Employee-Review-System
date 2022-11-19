// file containing all routes for employee
const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
const employeeController = require('../controllers/employee_controller');

router.get('/', employeeController.displayEmployeeView);
router.get('/update-review/:id', employeeController.displayUpdateReviewForm);

module.exports = router;