const usersService = require('../services/usersService');

class UsersController {

    logIn(req, res, next) {
        usersService.logIn(req, res, next);
    }

    logOut(req, res, next) {
        usersService.logOut(req, res, next);
    }

    signUp(req, res, next) {
        usersService.signUp(req, res, next);
    }

    refresh(req, res, next) {
        usersService.refresh(req, res, next);
    }
}

let UsersList = new UsersController();
module.exports = UsersList;
