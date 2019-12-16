const db = require('../dbconnection');

const applicantSchema = db.Schema({
    firstname:{type: String, required: true},
    lastname:{type: String, required: true},
});

module.exports = db.model('Applicant', applicantSchema);