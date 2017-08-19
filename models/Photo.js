var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    
    image: String,
    image_id: String,
    created_at: Date,

    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

});


var Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;