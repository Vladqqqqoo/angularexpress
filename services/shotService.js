const userModel = require('../models/user');
const shotModel = require('../models/shot');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/shots'))
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});

var upload = multer({storage: storage}).single('file');


class ShotService {
    uploadOneShot(req, res, next) {
        shotModel.find().then((data)=>{
            res.send(data);
        });
    }

    getShot(req, res, next) {
        res.sendStatus(404);

    }
    updateShot(req, res, next) {
        res.sendStatus(404);
    }

    getList(req, res, next) {
        res.sendStatus(404);
    }
}

let shotService = new ShotService();
module.exports = shotService;
