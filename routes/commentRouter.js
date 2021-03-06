const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const passport = require('passport');

// router.use(passport.authenticate('jwt', {session: false}));

router.get('/all/:id', passport.authenticate('jwt', {session: false}), commentController.getAllComments);
router.post('/', passport.authenticate('jwt', {session: false}), commentController.createComment);
router.put('/:id', passport.authenticate('jwt', {session: false}), commentController.updateComment);
router.delete('/:id', passport.authenticate('jwt', {session: false}), commentController.deleteComment);

module.exports = router;
