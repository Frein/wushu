const mongooseInit = require('./mongooseInit')
const mongoose  = require('mongoose');
const Point = require("./Points/PointModel");
const Illness = require("./Illness/IllnessModel");

// TODO проверить используется где то этот файл или нет, сделать нормальный module.exports

function removeLastPoint(str) {
    if(str[str.length-1]==='.')
        return str.substring(0, str.length - 1);
    else
        return str;
}

(async function(){
    let problems  = await Illness.find().populate('points');

    let points = {};
    problems.forEach(problem=>{
        problem.points.forEach(point=>{
            let p = points[point._id];
            if(!p) {
                points[point._id] = point.toObject();
            }
            p = points[point._id];
            p.illnesses.push(problem);
        });
    });

    console.log(points);

    // Object.keys(points).forEach(async p=>{
    //    let point = points[p];
    //    if(point.system)
    //        return;
    //
    //     let res=  await Point.findOneAndUpdate({ _id: p }, point);
    //
    // });

    //console.log(Object.keys(points).length);
    // let points  = await Point.find();
    //
    // let res={};
    // points.forEach(p=>{
    //         let problems = p.use.split(',');
    //         problems.forEach(pr=>{
    //             var b = pr.split(';');
    //             b.forEach(c=>{
    //                 let d = removeLastPoint(c.trim().toLowerCase());
    //                 if(res[d]===undefined)
    //                     res[d]={count:1, points:[p]};
    //                 else{
    //                     res[d].count=res[d].count+1;
    //                     res[d].points.push(p);
    //                 }
    //             })
    //         })
    // });

    // Object.keys(res).forEach(async problem=>{
    //     await Illness.create({
    //         _id: mongoose.Types.ObjectId(),
    //         name:problem,
    //         points: res[problem].points
    //     });
    // });
})();

function checkAuthenticated(req, res, next) {
    // console.log('!', req.isAuthenticated)
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    return next()
}
