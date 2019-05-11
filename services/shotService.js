const userModel = require('../models/user');
const shotModel = require('../models/shot');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/shots'))
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});

const upload = multer({storage: storage}).single('file');


class ShotService {
    uploadOneShot(req, res, next) {
        upload(req, res, function (err) {
            if (err) {
                return res.send(err.toString());
            }
            shotModel.create({shotUrl: `shots/${req.file.filename}`, idUser: req._id})
                .then(shot => {
                        userModel.updateOne({_id: req._id}, {
                            $push: {
                                shots: shot._id
                            }
                        })
                            .then(
                                user => {
                                    res.send(shot);
                                }
                            )
                    }
                )
        });
    };

    getShot(req, res, next) {
        const obj = {};
        shotModel.findOne({_id: req.params.id}).then(data => {
            obj.currentShot = data;
            shotModel.find({_id: {$gt: req.params.id}}).sort({_id: 1}).limit(1).then(data => {
                obj['nextShot'] = data[0];
                shotModel.find({_id: {$lt: req.params.id}}).sort({_id: -1}).limit(1).then(data => {
                    obj.prevShot = data[0];
                    res.send(obj);
                });
            });
        });
    }

    updateShot(req, res, next) {
        shotModel.updateOne({_id: req.params.id}, req.body)
            .then(
                data => {
                    res.send(data);
                }
            )
    }

    getUserList(req, res, next) {
        shotModel.find({idUser: req._id}).then(
            data => {
                res.send(data)
            }
        );
    }

    getList(req, res, next) {
        shotModel.find({}).then(
            data => {
                res.send(data)
            }
        );
    }

    likeShot(req, res, next) {
        shotModel.findOne({_id: req.body._id})
            .then(shot =>{

        })
    }
}

let shotService = new ShotService();
module.exports = shotService;
