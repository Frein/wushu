// MeridianModel.js
const  mongoose = require('mongoose');

// Set Product Schema
const schema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: [true, 'Name field is required'],
        },
        type: String,
        data: Buffer
    }),
    File = mongoose.model('files', schema);
module.exports = File;
