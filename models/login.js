const db = require('../dbconnection');

const loginSchema = db.Schema({
    login:{type: String, required: true},
    password:{type: String, required: true},
});

module.exports = db.model('Login', loginSchema);