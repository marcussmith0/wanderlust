var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({

    text: {
        type: String,
        minlength: 1
    },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],

    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],

    created_at: Date,

    created_by : {
        
    }

});

module.exports = mongoose.model("Comment", commentSchema);