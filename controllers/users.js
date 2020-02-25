const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/configs');

// Function for create a token
signToken = user => {
    return JWT.sign({
        iss: 'LetsSayitSomething',
        sub: user._id,
        iat: new Date().getTime(), // Current time
        exp: new Date().setDate(new Date().getDate() + 1) // Current time + 1 day ahead
    }, JWT_SECRET);
};

module.exports = {
    signUp: async (req, res, next) => {
        const { firstname, lastname, email, password } = req.body;

        // Check if user exist
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).json({ error: 'Email is already in use' });
        }

        // Create a new user
        let user = new User({
            firstname,
            lastname,
            email,
            password
        });
        await user.save();

        // Generate the token
        const token = signToken(user);

        // Save token to the cookie
        res.cookie('jwt', token, {httpOnly: true, secure: true});

        res.render('index', { isAuthorised: true, name: req.user.firstname });
    },

    signIn: async (req, res, next) => {
        console.log(req.user);
        // Generate token
        const token = signToken(req.user);

        // Create cookies
        res.cookie('jwt', token, {httpOnly: true, secure: true});

        // Render page (not redirect) with parameters
        res.render('index', { isAuthorised: true, name: req.user.firstname });
    },

    // Logout user
    logOut: async (req, res, next) => {
        res.clearCookie('jwt');
        res.redirect('/');
    },

    // Redirect to the profile page (to update URL)
    secret: async (req, res, next) => {
        console.log('Token is ok, you accessed to be here');
        res.redirect('profile');
    },

    // Profile page
    profile: async (req, res, next) => {
        res.render('profile', {title: `${req.user.firstname} profile`, name: req.user.firstname });
    }
}