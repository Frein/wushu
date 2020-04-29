import React, { useState, useEffect } from 'react';
import dataService from "../data/dataService";
import {Link} from "react-router-dom";

export default function Meridians() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let canEdit = params.get('user')==='xinxin';
    const [meridianList, setMeridianList] = useState([]);
    const [selectedMeridian, setSelectedMeridian] = useState({});
    const [branches, setMeridianBranches] = useState([]);
    const [newBranch, setNewBranch] = useState({name:''});

    const updateMeridianList = ()=>{
        setSelectedMeridian({})
        dataService('/meridian/list').then((data)=>{
            setMeridianList(data)
            setSelectedMeridian(data[0])
        }
            )
    };

    const updateMeridianBranches = () => {
        if (selectedMeridian._id !== 'new')
            dataService('/meridianBranch/list', {id: selectedMeridian._id}).then((data) => setMeridianBranches(data))
    }
    useEffect(() => {
        updateMeridianList()
    },[]);

    useEffect(() => {
        updateMeridianBranches();
    },[selectedMeridian._id]);

    return (
        <div>
            <div className='leftcol'>
                <h2>Список меридианов</h2>
                {canEdit && <button onClick={()=>{
                    setSelectedMeridian({
                        _id:'new',
                        name: "",
                        description: "",
                        maxActivityTime: "",
                        season: "",
                        element: "",})
                }}>Добавить меридиан</button> }
                {
                    meridianList.map((m,i)=><h3 style={{cursor: 'pointer',color: selectedMeridian&& m._id === selectedMeridian._id?'blue':'black'}} key={i} onClick={()=>{
                        setSelectedMeridian(m);
                    }}>{m.name}</h3>
                        )
                }
            </div>
            <div className='rightcol'>

                {selectedMeridian._id && <>
                    {
                        canEdit&&<><button onClick={()=>{
                            if(selectedMeridian._id!=='new')
                               dataService('/meridian/update', {id:selectedMeridian._id, data:selectedMeridian} ).then(()=>updateMeridianList())
                            else
                                dataService('/meridian/create', selectedMeridian ).then(()=>updateMeridianList())
                        }}>Сохранить</button>
                            <button onClick={()=>{
                                dataService('/meridian/delete', {meridianId:selectedMeridian._id}).then(()=>updateMeridianList())
                            }
                            }
                            >Удалить</button>
                        </>
                    }
                    {!canEdit?<h2>{selectedMeridian.name}</h2>:
                    <p><b>Название:</b>
                    <input value={selectedMeridian.name} onChange={
                    (event)=>{
                        setSelectedMeridian({...selectedMeridian, name:event.target.value})
                    }
                }/></p>}

                    <p>{!canEdit?selectedMeridian.description:<><b>Описание:</b>
                        <textarea rows={5} cols={50} value={selectedMeridian.description} onChange={
                            (event)=>{
                                setSelectedMeridian({...selectedMeridian, description:event.target.value})
                            }
                        }/></> }</p>
                    <p><b>Стихия: </b>{!canEdit?selectedMeridian.element:<input value={selectedMeridian.element} onChange={
                        (event)=>{
                            setSelectedMeridian({...selectedMeridian, element:event.target.value})
                        }
                    }/>}</p>
                    <p><b>Сезон: </b>{!canEdit?selectedMeridian.season:<input value={selectedMeridian.season} onChange={
                        (event)=>{
                            setSelectedMeridian({...selectedMeridian, season:event.target.value})
                        }
                    }/>}</p>
                    <p><b>Время максимальной активности: </b>{!canEdit?selectedMeridian.maxActivityTime:<input value={selectedMeridian.maxActivityTime} onChange={
                        (event)=>{
                            setSelectedMeridian({...selectedMeridian, maxActivityTime:event.target.value})
                        }
                    }/>}</p>
                    <div>
                        <b>Ветви:</b>
                        {canEdit && <><input value={newBranch.name} onChange={(event)=>{
                            setNewBranch({...newBranch, name:event.target.value})
                        }
                        }/><button onClick={()=>{
                            if(newBranch.name)
                                dataService('/MeridianBranch/create', {...newBranch, meridian:selectedMeridian._id})
                                    .then(()=>{
                                        updateMeridianBranches();
                                        setNewBranch({name:''})
                                    })
                        }
                        }>Добавить</button></>}
                        <ul>
                        {branches.map((b, i)=> {
                            return <li key={i}>{!canEdit?<Link key={i} to={'/MeridianBranch/' + b._id}>{b.name}</Link>:
                                <><input value={b.name} onChange={(event)=>{
                                    const newBranches = [...branches];
                                    newBranches[i].name= event.target.value;
                                    setMeridianBranches(newBranches)
                                }}/><button onClick={()=>{
                                    dataService('/MeridianBranch/update', {id:b._id, data:b}).then(()=>updateMeridianBranches());
                                }
                                }>Сохранить</button><button onClick={()=>{
                                    dataService('/MeridianBranch/delete', {id:b._id}).then(()=>updateMeridianBranches());
                                }
                                }>Удалить</button></>}</li>
                        }
                        )}
                        </ul>
                    </div>
                </>
                }
            </div>
        </div>
    );
}


