const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        session: false,
    },
    function (login, password, done) {
        return UserModel.findOne({login, password})
            .then(user => {
                if (!user) {
                    return done(null, false, {message: 'User not found'});
                }
                return done(null, user, {message: 'Logged In Successfully'})
            })
            .catch(err => {
                return done(err);
            })
    }));

const passportOpt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
    secretOrKey: 'access',
};

passport.use(new JwtStrategy(passportOpt, function (request, jwtPayload, done) {
    request._id = jwtPayload._id;
    return done(null, jwtPayload);
}));

module.exports = passport;


