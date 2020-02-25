const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/usersCredentials";

mongoose.connect(process.env.MONGODB_URI || url, {useNewUrlParser:true});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected!');
});

module.exports = mongoose;