// MeridianModel.js
const  mongoose = require('mongoose');

// Set Product Schema
const schema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: [true, 'Name field is required'],
        },
        description: {
            type: String,
            required: [true, 'description field is required']
        },
        maxActivityTime:{
            type: String
        },
        minActivityTime:{
            type: String
        },
        season:{
            type: String
        },
        element: {
            type: String
        }
    }),
    Meridian = mongoose.model('meridians', schema)

module.exports = Meridian;
