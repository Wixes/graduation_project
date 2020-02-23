const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const { validateBody, schemas } = require('../helpers/routeHelper');
const UsersController = require('../controllers/users');
const passportConfig = require('../passport');

// TODO: render different block for user/guest in header
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Record your achievments!' });
});

// Create a new user and, if exist, render error
router.post('/register', validateBody(schemas.authSchema), UsersController.signUp);

router.post('/login', validateBody(schemas.signInSchema), passport.authenticate('local', { session: false}), UsersController.signIn);

router.get('/secret', passport.authenticate('jwt', { session: false }), UsersController.secret);

module.exports = router;
