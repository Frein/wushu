const  mongoose = require('mongoose');
const File = require( './FileModel');

module.exports = async (req, res) => {
    try {
        let id = req.query.id;
        let file = await File.findOne({_id:mongoose.mongo.ObjectId(id)});

        res.contentType(file.type);
        res.end(file.data, 'binary');


    } catch (err) {
        console.log(err) // output to netlify function log
        res.send( {
            statusCode: 500,
            body: {msg: err.message}
        });
    }
}
