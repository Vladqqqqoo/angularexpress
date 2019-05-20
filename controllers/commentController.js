const commentService = require('../services/commentService');

class CommentController {
    createComment(req, res, next){
        commentService.createComment(req, res, next)
    }

    getAllComments(req, res, next){
        commentService.getAllComments(req, res, next);
    }

    deleteComment(req, res, next){
        commentService.deleteComment(req, res, next)
    }

    updateComment(req, res, next){
        commentService.updateComment(req, res, next)
    }
}

let commentController = new CommentController();
module.exports = commentController;

