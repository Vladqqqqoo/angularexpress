const express = require('express');
const router = express.Router();
const userAccountController = require('../controllers/userAccountController');
const passport = require('passport');

router.use(passport.authenticate('jwt', {session: false}));

router.get('/info', userAccountController.getUserInfo);
router.post('/info', userAccountController.updateUserInfo);
router.post('/password', userAccountController.updateUserPassword);
router.post('/avatar', userAccountController.updateUserAvatar);

module.exports = router;
