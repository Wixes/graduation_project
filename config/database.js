const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/usersCredentials";
const url2 = "mongodb+srv://Wixes98:kSynQUuVWJqRtv6@graduation-klcor.mongodb.net/usersCredentials";

mongoose.connect(url2, {useNewUrlParser:true}, function (err) {
    if (err) {
        console.log('Error in connection to the user database...');
    }
    else {
        console.log('Connected to the user database');
    }
});

module.exports = mongoose;