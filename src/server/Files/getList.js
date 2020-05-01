const  mongoose = require('mongoose');
const Files = require( './FileModel');

module.exports = async (req, res) => {
    try {
        const files = await Files.find();

        res.send( {
            statusCode: 201,
            body: files
        })

    } catch (err) {
        console.log(err); // output to netlify function log
        res.send( {
            statusCode: 500,
            body: {msg: err.message}
        });
    }
}
