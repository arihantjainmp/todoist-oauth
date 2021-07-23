const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    accesstoken: {
        type: String,
        required: true
    },
    tasks: [{
         id: Number,
         assigner: Number,
         project_id : Number,
         section_id : Number,
         order : Number,
         content : String,
         description : String,
         completed : Boolean,
         label_ids : [{type:String}],
         priority : Number,
         comment_count : Number,
         creator : Number,
         created : String,
         url : String
    }],
    lastupdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Userdata', PostSchema);