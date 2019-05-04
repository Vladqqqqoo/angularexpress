const shotService = require('../services/shotService');

class ShotController {
    uploadOneShot(req, res, next){
        shotService.uploadOneShot(req, res, next)
    }

    getShot(req, res, next){
        shotService.getShot(req, res, next)
    }

    updateShot(req, res, next){
        shotService.updateShot(req, res, next)
    }

    getList(req, res, next){
        shotService.getList(req, res, next);
    }

}

const shotController = new ShotController();
module.exports = shotController;
