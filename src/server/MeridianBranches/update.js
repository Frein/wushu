const MeridianBranch = require("./MeridianBranchModel");

module.exports = async (req, res) => {
    try {
            const id = req.body.id;
            const data = {...req.body.data};
            delete data._id;
            const response = {
                msg: "Product successfully updated",
                data: data
            };

        await MeridianBranch.findOneAndUpdate({ _id: id }, data)

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
}
