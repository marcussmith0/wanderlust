var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({

    text: {
        type: String,
        minlength: 1
    },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    created_at: Date,

    _creator: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Comment", commentSchema);