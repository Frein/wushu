const fs = require('fs');
const path = require('path');
const File = require("./FileModel");
const mongoose  = require('mongoose');

module.exports = async (req, res) => {
    try {
        let imageData = await fs.readFileSync(path.join(__dirname,'../../../public/head.jpg'));

        // Create an Image instance
        const image = {
            _id: mongoose.Types.ObjectId(),
            type: 'image/jpg',
            name:'Body',
            data: imageData
        };


        // Use Product.Model to create a new product
        await File.create(image);

        res.send( {
            statusCode: 201,
            body: JSON.stringify(image)
        });
    } catch (err) {
        console.log('meridianBranch.create', err);
        res.send( {
            statusCode: 500,
            body: JSON.stringify({msg: err.message})
        });
    }
};
