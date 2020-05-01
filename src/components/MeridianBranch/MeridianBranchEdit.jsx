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
            X:'',
            Y:'',
            size: 6,});

    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState({});
    const [meridianBranch, setMeridianBranch] = useState({});
    const [points, setPoints] = useState([]);

    useEffect(()=>{
        Promise.all([
        dataService('/meridianBranch/get', {id: id}),
        dataService('/file/list'),
        dataService('/point/list', {meridianBranch:id})
        ]).then(([meridianBranch, files, points])=>{
            setMeridianBranch(meridianBranch);
            setFiles(files);
            setPoints(points);
            setSelectedFile(files.find(f=> f._id = meridianBranch.file)?? files[0])
        })
    }, [id]);

    const getCurrentPoint = (color) => {
        if (currentPoint.X && currentPoint.Y) {
            return {
                ...currentPoint,
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
            X:'',
            Y:''
        })
    };

    const clickedOutside = (evt) => {
        setCurrentPoint({
            X: evt.nativeEvent.layerX,
            Y: evt.nativeEvent.layerY
        });
    };

    const currentAreas = {name:'test', areas:[...points]};
    const newPoint = getCurrentPoint('red');
    if(newPoint)
        currentAreas.areas.push(newPoint);


      //  console.log(this.state.points);
        return <div>
            <div className='leftcol'>
                <div className="container">
                    <select value={selectedFile._id} onChange={(event)=>{
                        debugger
                        setSelectedFile(files.find(f=>f._id===event.target.value))
                    }}>
                        {files.map(f=> <option value={f._id}>{f.name}</option>)}
                    </select>
                    <ImageMapper src={`/file/get?id=${selectedFile._id}`} width={800}
                                 onImageClick={evt => clickedOutside(evt)}
                                 map={currentAreas} />
                </div>
            </div>
            {/*<div className='rightcol'>*/}
            {/*    X: <input readOnly={true} value={this.state.currentX}/>*/}
            {/*     Y: <input readOnly={true} value={this.state.currentY}/>*/}
            {/*     Size: <input value={this.state.currentSize} onChange={(event)=>this.setState({currentSize: event.target.value})}/>*/}
            {/*     <br/>*/}
            {/*     <input placeholder='Название точки' value={this.state.currentName} onChange={(event)=>this.setState({currentName: event.target.value})}/>*/}
            {/*     <br/>*/}
            {/*     <textarea placeholder='Как искать' value={this.state.currentFind} onChange={(event)=>this.setState({currentFind: event.target.value})} />*/}
            {/*     <br/>*/}
            {/*     <textarea placeholder='Применение' value={this.state.currentUse} onChange={(event)=>this.setState({currentUse: event.target.value})} />*/}
            {/*     <br/>*/}
            {/*     <button onClick={()=>{*/}
            {/*         this.setState({points:[...this.state.points, (this.getCurrentPoint())]})*/}
            {/*         this.clearCurrent();*/}
            {/*     }}>Добавить точку</button>*/}
            {/*    <button>Очистить</button>*/}

            {/*    <div>*/}
            {/*    {*/}
            {/*        this.state.points.filter(a=> a.shape!=='line').map((p, i)=><div key={i}>*/}
            {/*            <h3>{p.name}</h3>*/}
            {/*            <p>Как найти: {p.find}</p>*/}
            {/*            <p>Используется при: {p.use}</p>*/}
            {/*            <button onClick={()=>{*/}

            {/*                if(this.state.points.length===1)*/}
            {/*                    this.setState({points:[]})*/}
            {/*                this.setState({points: [...this.state.points.slice(0,i), ...this.state.points.slice(i+1)]})*/}
            {/*            }}>Удалить точку</button>*/}
            {/*        </div>)*/}
            {/*    }*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
}
