const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const { JWT_SECRET } = require('./config/configs');
const User = require('./models/user');

// jwt strategy
passport.use(new JwtStrategy({
    // Take jwt from cookies
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // TODO: Check if jwt expired
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch(error) {
        done(error, false);
    }
}));

// Local strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Find the user by given email
        const user = await User.findOne({email});
        
        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }
        // Check if the password is correct
        const isCorrect = await user.isValidPassword(password);

        // If not, handle it
        if (!isCorrect) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch(error) {
        done(error, false);
    }

}));