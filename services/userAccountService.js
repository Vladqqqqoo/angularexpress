const UserModel = require('../models/user');
const passport = require('passport')

class UserAccountService {
    getUserInfo(req, res, next){
        console.log(req.params._id + ' tuta');
            UserModel.findOne({_id: req.params._id}).then(data=>{
                console.log(data)
                res.json(data);
            });
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
