const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
    login: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    firstName: {type: String, require: false},
    lastName: {type: String, require: false},
    age: {type: Number, require: false},
    location: {type: String, require: false},
    website: {type: String, require: false},
    skills: {type: String, require: false},
    bio: {type: String, require: false}
}, {versionKey: false});

UserSchema.set('toJSON', {
    versionKey: false,
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
