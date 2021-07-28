const mongoose = require('mongoose');

const AccesstokenSchema = mongoose.Schema({
    accesstoken: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Accesstokensave', AccesstokenSchema);