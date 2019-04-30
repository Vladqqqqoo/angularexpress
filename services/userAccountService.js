const UserModel = require('../models/user');

class UserAccountService {
    getUserInfo(req, res, next){
        UserModel.findOne({_id: req._id}).then(data=>{
            res.json(data);
        });
    }


    updateUserInfo(req, res, next){
        UserModel.updateOne({login: req.body.login}, req.body).then( (data) => res.sendStatus(200)
        );
    }

    updateUserPassword(req, res, next){
        UserModel.updateOne({_id: req._id, password: req.body.oldPassword}, {password: req.body.newPassword}).then(
            data => {
                if(data === null){
                    res.sendStatus(400);
                }
                else {
                    res.sendStatus(200);
                }
            }
        ).catch(err => {
            console.log(err);
            res.status(500).send(err)
        });
    }

}

let userAccountService = new UserAccountService();
module.exports = userAccountService;
