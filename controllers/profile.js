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
            // Check if files in database
            let files = 0;
            if (!req.user.files.length == 0)
                files = req.user.files;

            res.render('profile', {
                isAuthorised: true,
                title: `${req.user.firstname} profile`,
                name: req.user.firstname,
                avatar: avatar,
                files: files
            });
        });
    },

    upload_avatar: async (req, res, next) => {
        // Create variable for new image
        const newImage = {
            picture: req.file.path
        };
        
        // Find user and upload an image
        await User.findByIdAndUpdate(req.user._id, newImage, {new: true}, function (err, user) {
            if (err) {
                console.log ('Whoops! Something went wrong!');
                return;
            } else {
                console.log('Image updated');
                res.redirect('/profile');
            }
        });
        
    },

    upload_files: async (req, res, next) => {

        // Map necessary properties
        let files = req.files.map(obj => {
            let rObj = {}
            let date = new Date();
            rObj['name'] = obj.originalname
            rObj['path'] = obj.path
            rObj['date'] = date.toISOString().substring(0, 10)
            return rObj
        });        

        // Find user and update his files with $push operation
        await User.findByIdAndUpdate(req.user._id, {$push: {
            files: files
        }}).exec();

        res.redirect('/profile');
    },

    download_files: async(req, res, next) => {
        
        // Check if file in the list and download it
        for (const file of req.user.files) {
            if (file._id == req.params.id) {

                // TODO: make a callback
                res.download(file.path);
                break;
            }
            else {
                console.log('There is no such file!');
            }
        };
    },

    delete_files: async (req, res, next) => {
        // Check if file in the list
        for (const file of req.user.files) {
            if (file._id == req.params.id) {

                // Find user and delete specific field in database
                await User.findByIdAndUpdate(req.user._id, {$pull: {
                    files: file
                }}).exec();

                // delete file from filesystem
                await fs.unlink(file.path, function(err) {
                    if (err && err.code == 'ENOENT') {
                        console.log('File doesnt exist, wont remove it!');
                    } else if (err) {
                        console.log('Error while trying to remove file!');
                    } else {
                        console.log('File removed');
                    }
                });

                // Redirect (for correct rendering) at the same page
                res.redirect('/profile');
            }
            else {
                console.log('There is no such file for deletion!');
            }
        };
    }
}