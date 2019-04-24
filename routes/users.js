const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router.post('/login', UsersController.logIn);
router.post('/logout', UsersController.logOut);
router.post('/signup', UsersController.signUp);
router.post('/refresh', UsersController.refresh);

module.exports = router;
