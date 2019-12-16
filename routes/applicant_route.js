var express = require('express');
var router = express.Router();
var applicant = require('../models/applicant');

router.post('/', function(req,res,next){
    const applic = new applicant({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    applic.save(function(err,result){
        if(err){
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;