const db = require('../config/database');
const bcrypt = require('bcrypt');

const user = new db.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
        },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 128
    },
});

// Use mongoose middleware to hash password
// We're not using arrow functions here, because we need reference (this)
user.pre('save', async function(next) {
    try {
        // Generate salt and hash password, and reassign the password with hashed password
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(this.password, salt);
        this.password = passwordHashed;
        next();
    } catch(error){
        next(error);
    }
});

// Add method to compare passwords
user.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch(error) {
        throw new Error(error);
    }
};

module.exports = db.model('User', user);