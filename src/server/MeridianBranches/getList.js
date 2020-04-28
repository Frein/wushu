const  mongoose = require('mongoose');
const MeridianBranchModel = require( './MeridianBranchModel');

module.exports = async (req, res) => {
    try {
        let meridianId = req.body.meridianId;
        let meridianBranches = await MeridianBranchModel.find({meridian:mongoose.mongo.ObjectId(meridianId)});

        res.send( {
            statusCode: 200,
            body: meridianBranches
        })

    } catch (err) {
        console.log(err) // output to netlify function log
        res.send( {
            statusCode: 500,
            body: {msg: err.message}
        });
    }
}
