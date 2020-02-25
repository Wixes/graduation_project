const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/usersCredentials";

mongoose.Promisa = global.Promise;
mongoose.connect(process.env.MONGODB_URI || url, {useNewUrlParser:true, useMongoClient: true});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected!');
});

module.exports = mongoose;