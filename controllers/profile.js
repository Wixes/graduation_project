const { base64pic } = require('../helpers/imageConverter');
const fs = require('fs');
const User = require('../models/user');

module.exports = {
    profile: async (req, res, next) => {
        console.log('User: ' + req.user);

        // Kludge, sorry for that :)
        // If user previously uploaded picture, but for some reason
        // there is no picture in filesystem
        // default picture Will be rendered
        fs.readFile(req.user.picture, function(err, data) {
            let avatar = '';
            // If file doesn't exist, then encode 'avatar' with default image
            if (err) {
                avatar = base64pic(fs.readFileSync('uploads/avatars/default.jpg'));
            } else {
                avatar = base64pic(data);
            };
            res.render('profile', {
                isAuthorised: true,
                title: `${req.user.firstname} profile`,
                name: req.user.firstname,
                avatar: avatar
            });
        });
    },

    upload_avatar: async (req, res, next) => {
        // Create variable for new image
        const newImage = {
            picture: req.file.path
        };

        // Encode image to base64 (needed for correct re-render)
        const avatar = base64pic(fs.readFileSync(newImage.picture));

        // Find user and upload an image
        await User.findByIdAndUpdate(req.user._id, newImage, {new: true}, function (err, user) {
            if (err) {
                console.log ('Whoops! Something went wrong!');
                return;
            } else {
                console.log('Image updated');
                res.render('profile', {
                    isAuthorised: true,
                    title: `${user.firstname} profile`,
                    name: user.firstname,
                    avatar: avatar
                });
            }
        });
        
    },

    upload_files: async (req, res, next) => {

        // Map necessary properties
        let files = req.files.map(obj => {
            let rObj = {}
            rObj['name'] = obj.originalname
            rObj['path'] = obj.path
            return rObj
        });


        await User.findByIdAndUpdate(req.user._id, {$push: {
            files: files
        }}).exec();

        res.json({
            'Files': req.files
        })
    }
}