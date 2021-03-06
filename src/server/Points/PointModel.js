// MeridianModel.js
const  mongoose = require('mongoose');

// Set Product Schema
const schema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        meridianBranch:{type: mongoose.Schema.Types.ObjectId, ref: 'meridianBranches'},
        name: {
            type: String,
            required: [true, 'Name field is required'],
        },
        number:{
            type:Number
        },
        shape: {
            type: String,
            required: [true, 'description field is required']
        },
        coords:{
            type: [Number]
        },
        preFillColor:{
            type: String
        },
        lineWidth:{
            type: Number
        },
        find: {
            type: String
        },
        use: {
            type: String
        },
        illnesses:[{type: mongoose.Schema.Types.ObjectId, ref: 'illnesses'}],
        system: {
            type: Boolean
        }
    }),
    Point = mongoose.model('points', schema)

module.exports = Point;
