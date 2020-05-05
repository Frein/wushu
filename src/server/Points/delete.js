const Point = require("./PointModel");

module.exports = async (req, res) => {
    try {
            const id = req.body.id;

            const response = {
                msg: "Product successfully deleted",
            };

        await Point.findOneAndDelete({ _id: id })

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
