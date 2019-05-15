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

const upload = multer({storage: storage}).single('file');


class ShotService {
    uploadOneShot(req, res, next) {
        upload(req, res, function (err) {
            if (err) {
                return res.send(err.toString());
            }
            shotModel.create({shotUrl: `shots/${req.file.filename}`, idUser: req._id})
                .then(shot => {
                    res.send(shot);
                })
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

    async getList(req, res, next) {
        const data = await shotModel.aggregate([
            {
                $lookup: {
                    localField: 'idUser',
                    from: 'users',
                    foreignField: '_id',
                    as: 'username'
                }
            },
            {
                $unwind: {
                    'path': '$username',
                    'preserveNullAndEmptyArrays': true
                }
            },
        ]);
        res.send(data);

    }

    likeShot(req, res, next) {
        shotModel.findOne({_id: req.body.shotId})
            .then(shot => {
                const userIndex = shot.likedBy.findIndex(userId => userId === req._id);
                if (userIndex !== -1) {
                    console.log(`like exist`);
                    shot.likes--;
                    shot.likedBy.splice(userIndex, 1);
                    shotModel.updateOne({_id: shot._id}, shot)
                        .then(updateQuery => {
                            res.send({
                                likes: shot.likes,
                                likedBy: shot.likedBy,
                                isLiked: false
                            })
                        })
                } else {
                    console.log('like does not exist');
                    shot.likes++;
                    shot.likedBy.push(req._id);
                    shotModel.updateOne({_id: shot._id}, shot)
                        .then(updateQuery => {
                            res.send({
                                likes: shot.likes,
                                likedBy: shot.likedBy,
                                isLiked: true
                            })
                        })
                }
            })
    }

    deleteShot(req, res, next){
        shotModel.findOne({_id: req.params.id})
            .then(
                shot =>{
                    const filePath = `${path.join(__dirname, '../public')}/${shot.shotUrl}`;
                    fs.unlinkSync(filePath);
                    console.log(`DELETE SHOT - ${shot.shotUrl}`);
                    shotModel.deleteOne({_id: req.params.id})
                        .then( data => {
                            res.send(data)
                            }
                        )
                }
            )
    }
}

let shotService = new ShotService();
module.exports = shotService;
