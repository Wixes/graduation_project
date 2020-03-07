const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const upload = require('../config/multerSettings');
const passportConfig = require('../passport');
const profileController = require('../controllers/profile');

router.get('/', passport.authenticate('jwt', { session: false }), profileController.profile);

router.post('/upload/image', passport.authenticate('jwt', { session: false }), upload.single('avatar-upload'), profileController.upload);

module.exports = router;