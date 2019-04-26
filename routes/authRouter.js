const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.logIn);
router.post('/logout', authController.logOut);
router.post('/signup', authController.signUp);
router.post('/refresh', authController.refresh);

module.exports = router;
