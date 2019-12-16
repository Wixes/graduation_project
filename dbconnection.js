const mongoose = require('mongoose');
const url='mongodb+srv://MainAdmin_01:1NP0Qft7NcVEprVn@minicrm0-01qds.mongodb.net/test?retryWrites=true&w=majority';
/* const url = "mongodb://127.0.0.1:27017/Apllicationdb"; */
mongoose.connect(url, {useNewUrlParser:true}, function (err) {
    if (err) {
        console.log('Error in connection');
    }
    else {
        console.log('Connected!');
    }
});

module.exports = mongoose;