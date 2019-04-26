const UserModel = require('../models/user');
const passport = require('passport')

class UserAccountService {
    getUserInfo(req, res, next){
        console.log(req.params._id + ' tuta');
        // passport.authenticate('jwt', {session: false}, (err, payload) => {
        //     UserModel.findOne({_id: payload}).then(data=>{
                res.json('asdf');
        //     });
        // })
        // (req, res);
    }

    updateUserInfo(req, res, next){
        console.log(req.body.login);
        UserModel.findOneAndUpdate({login: req.body.login}, req.body).then( (data) =>{
                console.log(data)
        }
        );
        res.send('asdf')
    }
}

let userAccountService = new UserAccountService();
module.exports = userAccountService;
