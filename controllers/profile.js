const { base64pic } = require('../helpers/imageConverter');
const fs = require('fs');

module.exports = {
    profile: async (req, res, next) => {
        console.log(req.user);
        // read file from filesystem -> encode it to base64 -> assign to variable
        const avatar = base64pic(fs.readFileSync(req.user.picture));

        res.render('profile', {
            isAuthorised: true,
            title: `${req.user.firstname} profile`,
            name: req.user.firstname,
            avatar: avatar
        });
    },
    upload: async (req, res, next) => {
        console.log(req.file);
        res.status(200).json({ 
            filename: req.file.originalname,
            type: req.file.mimetype
        });
    }
}