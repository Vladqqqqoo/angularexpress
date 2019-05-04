const express = require('express');
const router = express.Router();
const shotController = require('../controllers/shotController');

router.get('/list', shotController.getList);
router.put('/:id', shotController.updateShot);
router.get('/:id', shotController.getShot);
router.post('/', shotController.uploadOneShot);

module.exports = router;
