import React, { useState, useEffect } from 'react';
import dataService from "../data/dataService";
import {Link} from "react-router-dom";

export default function Meridians() {
    const [meridianList, setMeridianList] = useState([]);
    const [selectedMeridian, setSelectedMeridian] = useState({});
    const [branches, setMeridianBranches] = useState([]);

    useEffect(() => {
        dataService('/meridian/list').then((data)=>setMeridianList(data))
    },[]);

    useEffect(() => {
        dataService('/meridianBranch/list', {meridianId:selectedMeridian._id}).then((data)=>setMeridianBranches(data))
    },[selectedMeridian]);

    console.log(branches);
    return (
        <div>
            <div className='leftcol'>
                <h2>Список меридианов</h2>
                {
                    meridianList.map((m,i)=><h3 style={{cursor: 'pointer',color: m._id === selectedMeridian._id?'blue':'black'}} key={i} onClick={()=>{
                        setSelectedMeridian(m);
                    }}>{m.name}</h3>)
                }
            </div>
            <div className='rightcol'>
                {selectedMeridian._id && <><h2>{selectedMeridian.name}</h2>
                    <p>{selectedMeridian.description}</p>
                    <p><b>Стихия: </b>{selectedMeridian.element}</p>
                    <p><b>Сезон: </b>{selectedMeridian.season}</p>
                    <p><b>Время максимальной активности: </b>{selectedMeridian.maxActivityTime}</p>
                    <div>
                        <b>Ветви:</b>
                        <ul>
                        {branches.map((b, i)=> {
                            return <li><Link key={i} to={'/MeridianBranch/'+b._id}>{b.name}</Link></li>
                        }
                        )}
                        </ul>
                    </div></>
                }
            </div>
        </div>
    );
}


