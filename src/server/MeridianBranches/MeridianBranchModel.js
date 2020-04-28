// MeridianModel.js
const  mongoose = require('mongoose');

// Set Product Schema
const schema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: [true, 'Name field is required'],
        },
        file: {type: mongoose.Schema.Types.ObjectId, ref: 'files'},
        meridian: {type: mongoose.Schema.Types.ObjectId, ref: 'meridians'}
    }),
    MeridianBranch = mongoose.model('meridianBranches', schema);
module.exports = MeridianBranch;
