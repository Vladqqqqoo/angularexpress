const UserModel = require('../models/user');

class UserAccountService {
    getUserInfo(req, res, next){
        UserModel.findOne({_id: req.params._id}).then(data=>{
            res.json(data);
        });
    }


    updateUserInfo(req, res, next){
        UserModel.findOneAndUpdate({login: req.body.login}, req.body).then( (data) => res.sendStatus(200)
        );
    }

}

let userAccountService = new UserAccountService();
module.exports = userAccountService;
