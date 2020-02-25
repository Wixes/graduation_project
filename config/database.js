const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/usersCredentials";

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI ||url, {useNewUrlParser:true}, function (err) {
    if (err) {
        console.log('Error in connection to the user database...');
    }
    else {
        console.log('Connected to the user database');
    }
});
};

module.exports = connectDB;