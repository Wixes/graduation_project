const multer = require('multer');

// SETTINGS FOR AVATAR UPLOAD
const avatar = {
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads/avatars');
        },
        filename: function(req, file, cb){
            cb(null, new Date().toISOString() + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
};

// SETTINGS FOR FILES UPLOAD
const files = {
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads/files');
        },
        filename: function(req, file, cb){
            cb(null, new Date().toISOString() + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png'
            ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
};

module.exports = {
    upload_avatar: multer({
        storage: avatar.storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: avatar.fileFilter
    }),

    upload_files: multer({
        storage: files.storage,
        limits: {
            fileSize: 1024 * 1024 * 15
        },
        fileFilter: files.fileFilter
    })
}