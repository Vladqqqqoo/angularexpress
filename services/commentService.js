const commentModel = require('../models/comment');
const mongoose = require("mongoose");

class CommentService {
    async createComment(req, res, next){
        await commentModel.create(req.body).then(
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

    async getAllComments(req, res, next){
        const comment = await commentModel.aggregate([
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
        ]);
        res.send(comment)
    }
}

let commentService = new CommentService();
module.exports = commentService;
