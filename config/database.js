const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/usersCredentials";

mongoose.connect(url, {useNewUrlParser:true}, function (err) {
    if (err) {
        console.log('Error in connection to the user database...');
    }
    else {
        console.log('Connected to the user database');
    }
});

module.exports = mongoose;