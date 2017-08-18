// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var postSchema = new Schema({
    
    title: String,
    description: String,
    image: String,
    image_id: String,
    created_at: Date,

    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],

    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

});

// the schema is useless so far
// we need to create a model using it
var Post = mongoose.model('Post', postSchema);

// make this available to our users in our Node applications
module.exports = Post;