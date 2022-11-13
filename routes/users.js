const express = require('express');
const passport = require('../config/passport-local-strategy');
const router = express.Router();
const usersController = require('../controllers/users_controllers');

router.get('/sign-in', usersController.signIn);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/user/sign-in'}
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;