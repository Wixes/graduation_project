const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const { profile } = require('../controllers/users');
const passportConfig = require('../passport');

router.get('/', passport.authenticate('jwt', { session: false }), profile);

module.exports = router;