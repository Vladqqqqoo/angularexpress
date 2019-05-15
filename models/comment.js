const mongoose = require('mongoose');

const {Schema} = mongoose;

const commentSchema = new Schema({
    shotId: {type: Schema.Types.ObjectId, require: true},
    commentatorId: {type: Schema.Types.ObjectId, require: true},
    commentMessage: {type: String, require: true,},
}, {versionKey: false});

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;
