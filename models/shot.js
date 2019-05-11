const mongoose = require('mongoose');

const {Schema} = mongoose;

const shotSchema = new Schema({
    shotUrl: {type: String, require: true, unique: true},
    idUser: {type: Schema.Types.ObjectId, require: true},
    title: {type: String},
    tags: {type: String},
    description: {type: String},
    likes: {type: Number, default: 0},
    likedBy: {type: Array},
}, {versionKey: false});

const shotModel = mongoose.model('shot', shotSchema);

module.exports = shotModel;
