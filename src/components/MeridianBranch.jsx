import React, {useEffect, useState} from 'react';
import '../App.css';
import ImageMapper from './ImageMapper';
import points from '../data/map'
import {Link, useParams} from "react-router-dom";
import dataService from "../data/dataService";

function MeridianBranch() {

    let { id } = useParams();
    let points1 = {...points};

    let [meridianBranch, setMeridianBranch] = useState({});
    let [selectedArea, setSelectedArea] =useState({})

   useEffect(()=>{
       dataService('/meridianBranch/get', {
           meridianBranchId: id
       }).then(data=>setMeridianBranch(data))
    },[]);

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

     return (
            <div>
                <Link to='/meridians'>назад</Link>
                <div className='leftcol'>
                    <div className="container">
                        <ImageMapper src={`/file/get?id=${meridianBranch.file}`} width={800}
                                     onMouseEnter={area => enterArea(area)}
                                     onMouseLeave={area => leaveArea(area)}
                                     map={points1}/>
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
                        points1.areas.filter(a=> a.shape!=='line').map((p, i)=><div key={i}>
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
