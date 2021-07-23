const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    accesstoken: {
        type: String,
        required: true
    },
    tasks: [{
        type: String,
        required: true
    }],
    lastupdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Userdata', PostSchema);