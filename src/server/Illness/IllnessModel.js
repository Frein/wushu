// MeridianModel.js
const  mongoose = require('mongoose');

// Set Product Schema
const schema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        points:[{type: mongoose.Schema.Types.ObjectId, ref: 'points'}],
        name: {
            type: String,
            required: [true, 'Name field is required'],
        },
        description: {
            type: String,
        },

    }),
    Illness = mongoose.model('illnesses', schema)

module.exports = Illness;
