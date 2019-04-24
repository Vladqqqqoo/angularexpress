const UserModel = require('../models/user');
const validation = require('../modules/validation');

const passport = require('passport');
const jwt = require('jsonwebtoken');

class UsersController {
    static generateTokens(data) {
        const jwtToken = jwt.sign({_id: data._id}, 'access', {expiresIn: 15});
        const refreshToken = jwt.sign({_id: data.id}, 'refresh', {expiresIn: "1h"});
        return {jwt: jwtToken, refreshToken: refreshToken};
    }

    logIn(req, res, next) {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                console.log(`This is user - ${user}`);
                console.log(`This is error - ${err}`);
                return res.status(400).json({
                    message: info ? info.message : 'Login failed',
                    user: user
                });
            }
            res.json(UsersController.generateTokens(user));
        })
        (req, res);
    }

    signUp(req, res, next) {
        const errorMessage = validation.checkSignIn(req);
        if (!errorMessage.status) {
            res.status(406).send({errorMessage, user: req.body});
        } else {
            UserModel.create(req.body)
                .then(user => res.send(user))
                .catch(error => res.status(400).send(error));
        }
    }
}

let UsersList = new UsersController();

module.exports = UsersList;
