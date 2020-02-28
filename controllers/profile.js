const {base64pic} = require('../helpers/imageConverter');

module.exports = {
    profile: async (req, res, next) => {
        console.log(req.user);
        const pic = base64pic(req.user.picture.data);
        res.render('profile', {
            title: `${req.user.firstname} profile`,
            name: req.user.firstname ,
            pic: pic
        });
    }
}