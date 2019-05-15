const mongoose = require('mongoose');

const {Schema} = mongoose;

const commentSchema = new Schema({
    postId: {type: Schema.Types.ObjectId, require: true, unique: true},
    commentatorId: {type: Schema.Types.ObjectId, require: true},
    text: {type: String, require: true,},
}, {versionKey: false});

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;
