const  mongoose = require('mongoose');
const Points = require( './PointModel');

module.exports = async (req, res) => {
    try {
        let meridianBranchId = req.body.meridianBranch;
        const points = await Points.find({meridianBranch:mongoose.mongo.ObjectId(meridianBranchId)});

        res.send( {
            statusCode: 201,
            body: points
        })

    } catch (err) {
        console.log(err); // output to netlify function log
        res.send( {
            statusCode: 500,
            body: {msg: err.message}
        });
    }
}
