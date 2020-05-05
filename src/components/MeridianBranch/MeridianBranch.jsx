import React, {useEffect, useState} from 'react';
import '../../App.css';
import ImageMapper from '../ImageMapper';
import {Link, useParams} from "react-router-dom";
import dataService from "../../data/dataService";

function MeridianBranch() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let user = params.get('user');

    let { id } = useParams();

    let [state, setState] = useState({points:[],meridianBranch:{}});
    let [selectedArea, setSelectedArea] =useState({});
    // let [points, setPoints] = useState([]);

   useEffect(()=>{
       Promise.all([
            dataService('/meridianBranch/get', {id: id}),
            dataService('/point/list', {meridianBranch:id})])
           .then(([meridianBranch, points])=>{
           console.log(meridianBranch);
           console.log(points);
           setState({meridianBranch,points})
       })
    },[id]);

    const enterArea = (area) => {
        setSelectedArea({
            hoveredArea: area,
        });
    };

    const leaveArea = (area) => {
        setSelectedArea({
            hoveredArea: null
        });
    };

    const getTipPosition = (area) => {
        return { top: `${area.center[1]+50}px`, left: `${area.center[0]+125}px` };
    };

    let lines = [];
    if(state.points.length){
        let first=state.points[0];
    let currentLine={
        name: `line0`,
        shape: 'line',
        coords:[first.coords[0], first.coords[1]]
    };


    // "coords": [454, 256, 454, 289, 454, 326, 454, 352],
    //     "meridianBranch": {
    //     "$oid": "5ea3563e94fae0044ce3965c"
    // },
    // "name": "line1",
    //     "shape": "line",
    //     "__v": 0
    debugger


    state.points.forEach((p,i)=>{
        if (i===0) return;
        if(p.system){
            lines.push(JSON.parse(JSON.stringify(currentLine)));
            currentLine.coords=[];
            lines.push({
                name: `line${i}`,
                shape: 'line',
                lineDash: [5,10],
                coords:[state.points[i-1].coords[0], state.points[i-1].coords[1],p.coords[0], p.coords[1],state.points[i+1].coords[0], state.points[i+1].coords[1]]
            })
        }else{
        currentLine.coords.push(p.coords[0]);
        currentLine.coords.push(p.coords[1]);
        }
    });

    lines.push(currentLine)
    }
    let map =   {
        name: "Меридиан желудка",
        areas: [...state.points.filter(p=>!p.system).map(p=>{ return {...p, _id:undefined, meridianBranch:undefined}}), ...lines]
    };
    console.log(map);

    return (
            <div>
                <Link to={'/meridians?user='+user}>назад</Link>
                <div className='leftcol'>
                    {state.meridianBranch&&<div className="container">
                        <ImageMapper src={`/file/get?id=${state.meridianBranch.file}`} width={800}
                                     onMouseEnter={area => enterArea(area)}
                                     onMouseLeave={area => leaveArea(area)}
                                     map={map}/>
                        {
                            selectedArea.hoveredArea &&selectedArea.hoveredArea.shape!=='line' &&
                            <span className="tooltip"
                                  style={{ ...getTipPosition(selectedArea.hoveredArea)}}>
                                { selectedArea.hoveredArea &&
                                <div style={{width:'250px'}}>
                                    <h3>{selectedArea.hoveredArea.name}</h3>
                                    <p>{selectedArea.hoveredArea.find}</p>
                                </div>
                                }
                            </span>
                        }
                    </div>}
                </div>
                <div className='rightcol' style={{"overflow":"auto", "height":"650px"}}>
                    {
                        state.points.filter(a=> a.shape!=='line' && !a.system).map((p, i)=><div key={i}>
                            <h3>{p.name}</h3>
                            <p>Как найти: {p.find}</p>
                            <p>Используется при: {p.use}</p>
                        </div>)
                    }
                </div>
            </div>

        );
}
 export default MeridianBranch;
