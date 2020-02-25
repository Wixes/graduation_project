const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const { validateBody, schemas } = require('../helpers/routeHelper');
const UsersController = require('../controllers/users');
const passportConfig = require('../passport');

// TODO: Make it as controller (remove logic from route)
// Idea: make it as middleware for EACH request
router.get('/', function(req, res, next) {
  passport.authenticate('jwt', {session: false}, (err, user, profile) => {
    if (err) return next(err);
    if (!user) return res.render('index');
    return res.render('index', { title: "Record your achievments!", isAuthorised: true, name: user.firstname })
  })(req, res, next);
});

router.post('/register', validateBody(schemas.authSchema), UsersController.signUp);

router.post('/login', validateBody(schemas.signInSchema), passport.authenticate('local', { session: false}), UsersController.signIn);

router.get('/logout', UsersController.logOut);

router.get('/secret', passport.authenticate('jwt', { session: false }), UsersController.secret);

router.get('/profile', passport.authenticate('jwt', { session: false}), UsersController.profile);

module.exports = router;
