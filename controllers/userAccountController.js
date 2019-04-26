const userAccountService = require('../services/userAccountService');

class UserAccountController {
    getUserInfo(req, res, next){
        userAccountService.getUserInfo(req, res, next)
    }

    updateUserInfo(req, res, next){
        userAccountService.updateUserInfo(req, res, next)
    }
}

let UserPageController = new UserAccountController();
module.exports = UserPageController;

