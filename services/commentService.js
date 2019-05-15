const commentModel = require('../models/comment');

class CommentService {
    createComment(req, res, next){
        commentModel.create(req.body)
            .then(
                comment => {
                    res.send(comment)
                }
            )
    }

    getAllComments(req, res, next){
        commentModel.find({shotId: req.params.id})
            .then(
                allComments => {
                    res.send(allComments);
                    }
            )
    }
}

let commentService = new CommentService();
module.exports = commentService;
