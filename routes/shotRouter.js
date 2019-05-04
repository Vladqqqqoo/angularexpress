const express = require('express');
const router = express.Router();
const shotController = require('../controllers/shotController');
const passport = require('passport');

router.use(passport.authenticate('jwt', {session: false}));

router.get('/list', shotController.getList);
router.put('/:id', shotController.updateShot);
router.get('/:id', shotController.getShot);
router.post('/', shotController.uploadOneShot);

module.exports = router;
