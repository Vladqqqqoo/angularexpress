const UserModel = require('../models/user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/avatars'))
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});

var upload = multer({storage: storage}).single('file');


class UserAccountService {
    getUserInfo(req, res, next) {
        UserModel.findOne({_id: req._id}).then(data => {
            res.json(data);
        });
    }

    updateUserInfo(req, res, next) {
        UserModel.updateOne({login: req.body.login}, req.body).then((data) => res.send(data));
    }

    updateUserPassword(req, res, next) {
        UserModel.updateOne({_id: req._id, password: req.body.oldPassword}, {password: req.body.newPassword}).then(
            data => {
                if (data === null) {
                    res.sendStatus(400);
                } else {
                    res.sendStatus(200);
                }
            }
        ).catch(err => {
            console.log(err);
            res.status(500).send(err)
        });
    }

    updateUserAvatar(req, res, next) {
        upload(req, res, function (err) {
            if (err) {
                return res.end(err.toString());
            }
            UserModel.findOne({_id: req._id}).then(user => {
                if (user.avatar) {
                    const filePath = `${path.join(__dirname, '../public')}/${user.avatar}`;
                    fs.unlinkSync(filePath);
                    console.log(`DELETE OLD AVATAR - ${user.avatar}`);
                } else {
                    console.log('NO AVATAR');
                }
                UserModel.updateOne({_id: req._id}, {avatar: `avatars/${req.file.filename}`}).then(data => {
                    console.log(`UPDATE IMAGE - ${data}`);
                    res.send(`avatars/${req.file.filename}`);
                });
            });
        });
    }
}

let userAccountService = new UserAccountService();
module.exports = userAccountService;
