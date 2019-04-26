const express = require('express');
const router = express.Router();
const userAccountController = require('../controllers/userAccountController');
const passport = require('passport');

router.get('', passport.authenticate('jwt', {session: false}), userAccountController.getUserInfo);
router.post('', userAccountController.updateUserInfo);

module.exports = router;
