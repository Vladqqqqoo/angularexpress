const commentModel = require('../models/comment');
const mongoose = require("mongoose");

class CommentService {
    createComment(req, res, next){
        commentModel.create(req.body).then(
            data => {
                commentModel.aggregate([
                    {
                        $match: {
                            "shotId": {$eq: mongoose.Types.ObjectId(req.body.shotId)},
                            "_id": {$eq: mongoose.Types.ObjectId(data._id)}
                        }
                    },
                    {
                        $lookup: {
                            localField: 'commentatorId',
                            from: 'users',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    {
                        $unwind: {
                            'path': '$user',
                            'preserveNullAndEmptyArrays': true
                        }
                    }
                ])
                    .then(
                        comment => {
                            console.log(comment);
                            res.send(comment)
                        }
                    );

            }
        )

    }

    getAllComments(req, res, next){
        commentModel.aggregate([
            {
                $match: {
                    "shotId": {$eq : mongoose.Types.ObjectId(req.params.id)},
                }
            },
            {
                $lookup: {
                    localField: 'commentatorId',
                    from: 'users',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': true
                }
            }
        ])
            .then(data => res.send(data))
    }

    deleteComment(req, res, next){
        commentModel.deleteOne({_id: req.params.id}).then(
            data => res.send(data)
        )
    }

    updateComment(req, res, next){
        commentModel.updateOne({_id: req.params.id}, {commentMessage: req.body.message})
            .then(
                data=> {
                    res.send(data)
                }
            );
    }
}

let commentService = new CommentService();
module.exports = commentService;
