const Illness =require ('../Illness/IllnessModel');
const  mongoose = require('mongoose');

module.exports = async (req, res) => {
    try {
        let problemId = req.body.problem;
        const points = (await Illness.findOne({_id:mongoose.mongo.ObjectId(problemId)})
            .populate('points')).points;

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
