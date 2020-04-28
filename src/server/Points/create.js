const mongoose  = require('mongoose');
const Point = require("./PointModel");

module.exports = async (req, res) => {
    try {
         const data = req.body;

         const point = {
            _id: mongoose.Types.ObjectId(),
             meridianBranch: mongoose.Types.ObjectId(data.meridianBranch),
             name: data.name,
             shape: data.shape,
             coords: data.coords,
             preFillColor:data.preFillColor,
             lineWidth: data.lineWidth,
             find:data.find,
             use: data.use
         };
        const response = {
            msg: "Product successfully created",
            data: point
        };

        // Use Product.Model to create a new product
        await Point.create(point);

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
};
