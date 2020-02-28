const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConfig = require('../passport');
const profileController = require('../controllers/profile');

router.get('/', passport.authenticate('jwt', { session: false }), profileController.profile);

module.exports = router;