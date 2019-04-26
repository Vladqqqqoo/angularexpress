const authService = require('../services/authService');

class AuthController {

    logIn(req, res, next) {
        authService.logIn(req, res, next);
    }

    logOut(req, res, next) {
        authService.logOut(req, res, next);
    }

    signUp(req, res, next) {
        authService.signUp(req, res, next);
    }

    refresh(req, res, next) {
        authService.refresh(req, res, next);
    }
}

let authController = new AuthController();
module.exports = authController;
