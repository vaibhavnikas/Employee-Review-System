const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
const adminController = require('../controllers/admin_controller');

router.get('/', adminController.home);

router.get('/manage-employees', adminController.manageEmployees);

router.get('/add-employee', adminController.displayAddEmployeeForm);

router.post('/add-employee', adminController.addEmployee);

router.get('/delete-employee/:id', adminController.deleteEmployee);

router.get('/update-employee-details/:id', adminController.displayUpdateEmployeeForm);

router.post('/update-employee/:id', adminController.updateEmployeeDetails);

router.get('/manage-reviews', adminController.manageReviews);

router.post('/assign-review', adminController.assignReview);

router.get('/update-review/:id', adminController.displayUpdateReviewForm);

router.get('/make-admin/:id', adminController.makeAdmin);

module.exports = router;