const mongoose  = require('mongoose');
const Meridian = require("./MeridianModel");

module.exports = async (req, res) => {
    try {
         const data = req.body,
            meridian = {
                _id: mongoose.Types.ObjectId(),
                name: data.name,
                description: data.description,
                maxActivityTime: data.maxActivityTime,
                season:data.season,
                element: data.element
            },
            response = {
                msg: "Product successfully created",
                data: meridian
            };

        // Use Product.Model to create a new product
        await Meridian.create(meridian);

        res.send( {
            statusCode: 201,
            body: JSON.stringify(response)
        });
    } catch (err) {
        console.log('meridian.create', err);
        res.send( {
            statusCode: 500,
            body: JSON.stringify({msg: err.message})
        });
    }
}
