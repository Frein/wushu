import ImageMapper from "../ImageMapper";
import React, {useEffect, useState} from "react";
import '../../App.css'
import dataService from "../../data/dataService";
import {useParams} from "react-router-dom";

export default function Edit() {

    let { id } = useParams();

    const [currentPoint, setCurrentPoint] = useState({
            name: '',
            find: '',
            use: '',
            number:'',
            X:'',
            Y:'',
            size: 6,
            system: false
    });

    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState({});
    const [meridianBranch, setMeridianBranch] = useState({});
    const [points, setPoints] = useState([]);

    const updatePointList = ()=>{
        dataService('/point/list', {meridianBranch:id})
            .then((data)=>setPoints(data));
    }

    useEffect(()=>{
        Promise.all([
        dataService('/meridianBranch/get', {id: id}),
        dataService('/file/list'),
        dataService('/point/list', {meridianBranch:id})
        ]).then(([meridianBranch, files, points])=>{
            setMeridianBranch(meridianBranch);
            setFiles(files);
            setPoints(points);
            let file = files.find(f=> f._id === meridianBranch.file)?? files[0];
            setSelectedFile(file)
            if(!meridianBranch.file)
                dataService('/meridianBranch/update', { id:meridianBranch._id, data:{...meridianBranch, file:file._id}} )
        })
    }, [id]);

    const getCurrentPoint = (color) => {
        if (currentPoint.X && currentPoint.Y) {
            return {
                ...currentPoint,
                meridianBranch:meridianBranch._id,
                shape: "circle",
                coords: [currentPoint.X, currentPoint.Y, currentPoint.size],
                preFillColor: color || "rgb(0,0,0,1)",
                lineWidth: 2
            };
        }
    };

    const clearCurrent = () => {
        setCurrentPoint({
            name: '',
            find: '',
            use: '',
            number:'',
            X:'',
            Y:'',
            size: 6,
            system: false
        })
    };

    const clickedOutside = (evt) => {
        setCurrentPoint({
            ...currentPoint,
            X: evt.nativeEvent.layerX,
            Y: evt.nativeEvent.layerY
        });
    };


    const currentAreas = {name:'test', areas:[...points]};
    const newPoint = getCurrentPoint('red');
    if(newPoint)
        currentAreas.areas.push(newPoint);
    console.log(currentAreas.areas);
      //  console.log(this.state.points);
        return <div>
            <div className='leftcol'>
                <div className="container">
                    <select value={selectedFile._id} onChange={(event)=>{
                        let find = files.find(f=>f._id===event.target.value);
                        setSelectedFile(find)
                        dataService('/meridianBranch/update', { id:meridianBranch._id, data:{...meridianBranch, file:find._id}} )

                    }}>
                        {files.map((f,i)=> <option key={i} value={f._id}>{f.name}</option>)}
                    </select>
                    {selectedFile._id&& <ImageMapper src={`/file/get?id=${selectedFile._id}`} width={800}
                                 onImageClick={evt => clickedOutside(evt)}
                                 map={currentAreas} />
                    }
                </div>
            </div>
            <div className='rightcol'>
                X: <input readOnly={true} value={currentPoint.X}/>
                <br/>
                 Y: <input readOnly={true} value={currentPoint.Y}/>
                 <br/>
                 Size: <input value={currentPoint.size}
                              onChange={(event)=>setCurrentPoint({...currentPoint, size: event.target.value})}/>
                 <br/>
                 <input placeholder='Название точки' value={currentPoint.name}
                        onChange={(event)=>setCurrentPoint({...currentPoint, name: event.target.value})}/>
                 <br/>
                <input placeholder='Номер точки' value={currentPoint.number}
                       onChange={(event)=>setCurrentPoint({...currentPoint, number: +event.target.value})}/>
                <br/>
                <input type="checkbox"  id ='system' checked={currentPoint.system}
                       onChange={(event)=>{
                           setCurrentPoint({...currentPoint, system: event.target.checked})
                       }}/>
                <label htmlFor="system">Системная?</label>
                <br/>
                 <textarea placeholder='Как искать' value={currentPoint.find}
                           onChange={(event)=>setCurrentPoint({...currentPoint, find: event.target.value})} />
                 <br/>
                 <textarea placeholder='Применение' value={currentPoint.use}
                           onChange={(event)=>setCurrentPoint({...currentPoint, use: event.target.value})} />
                 <br/>
                 <button onClick={()=>{
                     dataService('/point/create', getCurrentPoint())
                         .then(()=>updatePointList());
                     clearCurrent();
                 }}>Добавить точку</button>
                <button onClick={()=>clearCurrent()}>Очистить</button>

                <div>
                {
                    points.filter(a=> a.shape!=='line').map((p, i)=><div key={i}>
                        <h3>{p.name}</h3>
                        <p>Как найти: {p.find}</p>
                        <p>Используется при: {p.use}</p>
                        <button onClick={()=>{
                            dataService('/point/delete/', {id:p._id}).then(()=>updatePointList())
                            // if(this.state.points.length===1)
                            //     this.setState({points:[]})
                            // this.setState({points: [...this.state.points.slice(0,i), ...this.state.points.slice(i+1)]})
                        }}>Удалить точку</button>
                    </div>)
                }
                </div>
            </div>
        </div>
}
