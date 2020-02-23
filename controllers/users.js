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

        // Respond with token
        // Here is need to add some variable for front-end (like isLogged: true)
        res.status(200).json({ token });
    },

    signIn: async (req, res, next) => {
        console.log(req.user);
        // Generate token
        const token = signToken(req.user);
        // TODO: Save token to the localStorage and set it as header 'authorization'

        // Send status in the end
        res.status(200).json({ token });
    },

    secret: async (req, res, next) => {
        console.log('Token is ok, you accessed to be here');
        res.render('secret');
    }
}