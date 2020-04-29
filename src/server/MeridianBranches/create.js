const mongoose  = require('mongoose');
const MeridianBranch = require("./MeridianBranchModel");
const Meridian = require("../Meridians/MeridianModel");

module.exports = async (req, res) => {
    try {
        let meridianId = req.body.meridian;
        let mer = await Meridian.findOne({_id:mongoose.mongo.ObjectID(meridianId)});

         const data = req.body;
        const meridianBranch = {
            _id: mongoose.Types.ObjectId(),
            name: data.name,
            meridian: mer
        };
        const response = {
            msg: "Product successfully created",
            data: meridianBranch
        };

        // Use Product.Model to create a new product
        await MeridianBranch.create(meridianBranch);

        res.send( {
            statusCode: 201,
            body: JSON.stringify(response)
        });
    } catch (err) {
        console.log('meridianBranch.create', err);
        res.send( {
            statusCode: 500,
            body: JSON.stringify({msg: err.message})
        });
    }
};
