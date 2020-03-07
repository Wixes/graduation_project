const { base64pic } = require('../helpers/imageConverter');
const fs = require('fs');
const User = require('../models/user');

module.exports = {
    profile: async (req, res, next) => {
        console.log(req.user);

        // Read file from filesystem -> encode it to base64 -> assign to variable
        const avatar = base64pic(fs.readFileSync(req.user.picture));

        res.render('profile', {
            isAuthorised: true,
            title: `${req.user.firstname} profile`,
            name: req.user.firstname,
            avatar: avatar
        });
    },

    upload: async (req, res, next) => {
        const newImage = {
            picture: req.file.path
        };

        const avatar = base64pic(fs.readFileSync(newImage.picture));

        await User.findByIdAndUpdate(req.user._id, newImage, function (err, res) {
            if (err) {
                console.log ('Whoops! Something went wrong!');
                return;
            } else {
                console.log('Image updated');
            }
        });
        res.render('profile', {
            isAuthorised: true,
            title: `${req.user.firstname} profile`,
            name: req.user.firstname,
            avatar: avatar
        });
    }
}