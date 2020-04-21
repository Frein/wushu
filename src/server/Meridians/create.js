const mongoose  = require('mongoose');
const Product = require("./productModel");

module.exports = async (req, res) => {
    try {
         const data = req.body,
            name = data.name,
            price = parseInt(data.price),
            id = mongoose.Types.ObjectId(),
            product = {
                _id: id,
                name,
                price,
                __v: 0
            },
            response = {
                msg: "Product successfully created",
                data: product
            }

        // Use Product.Model to create a new product
        await Product.create(product)

        res.send( {
            statusCode: 201,
            body: JSON.stringify(response)
        });
    } catch (err) {
        console.log('product.create', err) // output to netlify function log
        res.send( {
            statusCode: 500,
            body: JSON.stringify({msg: err.message})
        });
    }
}
