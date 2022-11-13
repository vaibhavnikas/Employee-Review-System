const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controllers');

router.get('/sign-in', usersController.signIn);
router.post('/create-session', usersController.createSession);

module.exports = router;