const  mongoose = require('mongoose');
const Illness = require( './IllnessModel');

module.exports = async (req, res) => {
    try {
        // let meridianBranchId = req.body.meridianBranch;
        const illnesses = await Illness.find();

        res.send( {
            statusCode: 201,
            body: illnesses
        })

    } catch (err) {
        console.log(err); // output to netlify function log
        res.send( {
            statusCode: 500,
            body: {msg: err.message}
        });
    }
}
