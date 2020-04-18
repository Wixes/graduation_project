const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// User schema
const user = new mongoose.Schema({
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
        maxlength: 32,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 32
    },
    files: [{
        name: String,
        path: String,
        created: String,
        place: String,
        subject: String,
        date: String,
        mark: String,
        kind: String
    }],
    picture: {
        type: String,
        default: 'build/utils/default.jpg'
    }
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
        console.log('Just checking this shit');
        next(error);
    }
});

// Add method to compare passwords
user.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch(error) {
        console.log('i dont know but maybe here');
        throw new Error(error);
    }
};

module.exports = mongoose.model('User', user);