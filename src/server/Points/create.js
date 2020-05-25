const mongoose  = require('mongoose');
const Point = require("./PointModel");
const Illness = require("../Illness/IllnessModel");

module.exports = async (req, res) => {
    try {
        let pointId = mongoose.Types.ObjectId();
         const data = req.body;

         let problems=[];
        for (let problem of data.problems){
            if(problem._id){
                problems.push(problem);
                continue;
            }

            problem={
              ...problem,
                _id: mongoose.Types.ObjectId(),
                points:[pointId]
            };
            await Illness.create(problem);
            problems.push(problem);
        }

        const point = {
            _id: pointId,
             meridianBranch: mongoose.Types.ObjectId(data.meridianBranch),
             name: data.name,
             shape: data.shape,
             coords: data.coords,
             preFillColor:data.preFillColor,
             lineWidth: data.lineWidth,
             find:data.find,
             use: data.use,
             number:data.number,
             system:data.system,
             illnesses:problems.map(p=>p._id)
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
