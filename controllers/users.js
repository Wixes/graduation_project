const JWT = require('jsonwebtoken');
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

        // Save user to the database
        await user.save(function(err, user) {
            if (err) throw err;
            console.log('user is created in database');
        });

        // Generate the token
        const token = signToken(user);

        // Save token to the cookie
        res.cookie('jwt', token, {httpOnly: true, secure: true});

        // Render page
        res.render('index', {
            isAuthorised: true,
            firstname: user.firstname
        });
    },

    signIn: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);

        // Create cookies
        res.cookie('jwt', token, {httpOnly: true, secure: true});

        // Render page (not redirect) with parameters
        res.render('index', {
            isAuthorised: true,
            name: req.user.firstname,
        });
    },

    // Logout user
    logOut: async (req, res, next) => {
        res.clearCookie('jwt');
        res.redirect('/');
    }

}