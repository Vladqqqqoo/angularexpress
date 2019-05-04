const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    login: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    firstName: {type: String},
    lastName: {type: String},
    age: {type: Number},
    location: {type: String},
    website: {type: String},
    skills: {type: String},
    bio: {type: String},
    avatar: {type: String},
    shots: {type: Array}
}, {versionKey: false});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
