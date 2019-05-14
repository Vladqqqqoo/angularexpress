const express = require('express');
const router = express.Router();
const shotController = require('../controllers/shotController');
const passport = require('passport');

// router.use(passport.authenticate('jwt', {session: false}));

router.get('/user/list', passport.authenticate('jwt', {session: false}), shotController.getUserList);
//Только свои посты

router.get('/list', shotController.getList);
router.post('/', passport.authenticate('jwt', {session: false}), shotController.uploadOneShot);
router.put('/like', passport.authenticate('jwt', {session: false}),shotController.likeShot);
router.post('/comment', passport.authenticate('jwt', {session: false}),shotController.commentShot);

router.get('/:id', shotController.getShot);
router.put('/:id',passport.authenticate('jwt', {session: false}), shotController.updateShot);
router.delete('/:id',passport.authenticate('jwt', {session: false}), shotController.deleteShot);

module.exports = router;
