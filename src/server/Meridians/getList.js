
const MeridianModel = require( './MeridianModel');

module.exports = async (req, res) => {
    try {
        const meridians = await MeridianModel.find();

        res.send( {
            statusCode: 200,
            body: meridians
        })

    } catch (err) {
        console.log(err) // output to netlify function log
        res.send( {
            statusCode: 500,
            body: {msg: err.message}
        });
    }
}
