const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const { validateBody, schemas } = require('../helpers/dataValidate');
const UsersController = require('../controllers/users');
const passportConfig = require('../passport');

// Callback function doesn't have access to req, res objects
// That's why we're using such a construction.
// https://github.com/jaredhanson/passport/issues/1
router.get('/', function(req, res, next) {
  passport.authenticate('jwt', {session: false}, (err, user, profile) => {
    if (err) return next(err);
    // Render page for guest
    if (!user) 
        return res.render('index', {
          title: "Record your achievments!"
        }); 
    // Render page for user
    return res.render('index', {           
       title: "Record your achievments!", 
       isAuthorised: true,
       firstname: user.firstname
       })
  })(req, res, next); // Sends arguments to the callback
                      // (For more info check this link:
                      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
});

router.post('/register', validateBody(schemas.authSchema), UsersController.signUp);

router.post('/login', validateBody(schemas.signInSchema), passport.authenticate('local', { session: false}), UsersController.signIn);

router.get('/logout', UsersController.logOut);

module.exports = router;
