const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const passportConfig = require('../passport');
const profileController = require('../controllers/profile');

router.get('/', passport.authenticate('jwt', { session: false }), profileController.profile);

router.post('/upload', upload.single('avatar-upload'), profileController.upload);

module.exports = router;