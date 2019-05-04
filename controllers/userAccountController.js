const userAccountService = require('../services/userAccountService');

class UserAccountController {
    getUserInfo(req, res, next) {
        userAccountService.getUserInfo(req, res, next)
    }

    updateUserInfo(req, res, next) {
        userAccountService.updateUserInfo(req, res, next)
    }

    updateUserPassword(req, res, next) {
        userAccountService.updateUserPassword(req, res, next)
    }

    updateUserAvatar(req, res, next) {
        userAccountService.updateUserAvatar(req, res, next);
    }


}

let userAccountController = new UserAccountController();
module.exports = userAccountController;

