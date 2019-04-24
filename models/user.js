const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
    login: {type: String, require: true, unique: true},
    password: {type: String, require: true},
});

UserSchema.set('toJSON', {
    versionKey: false,
});

const UserModel = mongoose.model('customer', UserSchema);

module.exports = UserModel;
