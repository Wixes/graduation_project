const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const { upload_avatar, upload_files } = require('../config/multerSettings');
const passportConfig = require('../passport');
const profileController = require('../controllers/profile');

router.get('/', passport.authenticate('jwt', { session: false }), profileController.profile);

router.post('/upload/image', passport.authenticate('jwt', { session: false }), upload_avatar.single('avatar-upload'), profileController.upload_avatar);

router.post('/upload/files', passport.authenticate('jwt', { session: false }), upload_files.array('files-upload', 6), profileController.upload_files);

router.get('/download/files/:id', passport.authenticate('jwt', { session: false }), profileController.download_files);

router.get('/delete/files/:id', passport.authenticate('jwt', { session: false }), profileController.delete_files);

router.post('/edit/file/:id', passport.authenticate('jwt', { session: false }), profileController.edit_file);

module.exports = router;