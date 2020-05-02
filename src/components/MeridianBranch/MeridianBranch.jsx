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
            dataService('/meridianBranch/get', {meridianBranchId: id}),
            dataService('/point/list', {meridianBranchId:id})])
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

    let map =   {
        name: "Меридиан желудка",
        areas: state.points.map(p=>{ return {...p, _id:undefined, meridianBranch:undefined}})
    };
    console.log(map);

    return (
            <div>
                <Link to={'/meridians?user='+user}>назад</Link>
                <div className='leftcol'>
                    <div className="container">
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
                    </div>
                </div>
                <div className='rightcol'>
                    {
                        state.points.filter(a=> a.shape!=='line').map((p, i)=><div key={i}>
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
