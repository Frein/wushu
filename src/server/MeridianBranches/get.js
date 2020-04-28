const  mongoose = require('mongoose');
const MeridianBranchModel = require( './MeridianBranchModel');

module.exports = async (req, res) => {
    try {
        let meridianId = req.body.meridianBranchId;
        const meridianBranch = await MeridianBranchModel.findOne({_id:mongoose.mongo.ObjectId(meridianId)});

        res.send( {
            statusCode: 200,
            body: meridianBranch
        })

    } catch (err) {
        console.log(err) // output to netlify function log
        res.send( {
            statusCode: 500,
            body: {msg: err.message}
        });
    }
}
