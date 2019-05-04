const express = require('express');
const router = express.Router();
const shotController = require('../controllers/shotController');
const passport = require('passport');

router.use(passport.authenticate('jwt', {session: false}));

router.get('/user/list', shotController.getUserList);
router.get('/list', shotController.getList);
router.post('/', shotController.uploadOneShot);


router.get('/:id', shotController.getShot);
router.put('/:id', shotController.updateShot);

module.exports = router;
