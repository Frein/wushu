const Meridian = require("./MeridianModel");

module.exports = async (req, res) => {
    try {
            const id = req.body.id;
            const data = {...req.body.data};
            delete data._id;
            const response = {
                msg: "Product successfully updated",
                data: data
            };

        await Meridian.findOneAndUpdate({ _id: id }, data)

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
