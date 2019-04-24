const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router.post('/login', UsersController.logIn);
router.post('/signup', UsersController.signUp);

module.exports = router;
