const express = require('express');
const router = express.Router();
const shotController = require('../controllers/shotController');
const passport = require('passport');


router.get('/', shotController.getShot);
router.get('/list', shotController.getList);
router.post('/', passport.authenticate('jwt', {session: false}), shotController.uploadOneShot);
router.put('/like', passport.authenticate('jwt', {session: false}),shotController.likeShot);
router.get('/user/list', passport.authenticate('jwt', {session: false}), shotController.getUserList); // Только свои посты

router.put('/:id',passport.authenticate('jwt', {session: false}), shotController.updateShot);
router.delete('/:id',passport.authenticate('jwt', {session: false}), shotController.deleteShot);

module.exports = router;
