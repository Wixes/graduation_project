const mongoose = require('mongoose');
const url = "mongodb+srv://Wixes98:kSynQUuVWJqRtv6@graduation-klcor.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url, {useNewUrlParser:true}, function (err) {
    if (err) {
        console.log('Error in connection to the user database...');
    }
    else {
        console.log('Connected to the user database');
    }
});

module.exports = mongoose;