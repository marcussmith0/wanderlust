const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var userSchema = new Schema({

    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },

    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],

    following: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],

    liked_comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]

});

module.exports = mongoose.model("User", userSchema);