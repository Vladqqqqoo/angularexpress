const commentModel = require('../models/comment');

class CommentService {
    createComment(req, res, next){
        commentModel.create(req.body)
            .then(
                comment => {
                    res.send(comment)
                }
            )
            .catch(
                err => console.log(err)
            )
    }

    getAllComments(req, res, next){
        commentModel.find({shotId: req.params.id})
            .then(
                allComments => {
                    res.send(allComments);
                    }
            )
            .catch(
                err => console.log(err)
            )
    }
}

let commentService = new CommentService();
module.exports = commentService;
