const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var albumSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true,
    },

    description: {
        type: String,
        minlength: 2
    },

    featured_image: String,
    image_id: String,

    photos: [{
        type: Schema.Types.ObjectId,
        ref: "Photo"
    }],

    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]

});

module.exports = mongoose.model("Album", albumSchema);