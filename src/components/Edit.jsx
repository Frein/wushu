import ImageMapper from "./ImageMapper";
import React from "react";
import '../App.css'
import points from "../data/map";

export default class Edit extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            url:'https://acupuncture5element.netlify.app/body.jpg',
            currentName: '',
            currentFind: '',
            currentUse: '',
            currentX:'',
            currentY:'',
            currentSize: 6,
            points:[],
            check:false
        };
    }

    getCurrentPoint(color) {
        if (this.state.currentX &&  this.state.currentY) {
            return {
                name: this.state.currentName,
                shape: "circle",
                coords: [this.state.currentX, this.state.currentY, this.state.currentSize],
                preFillColor: color || "rgb(0,0,0,1)",
                lineWidth: 2,
                find: this.state.currentFind,
                use: this.state.currentUse
            };
        }
    }

    clearCurrent(){
        this.setState({
            currentName: '',
            currentFind: '',
            currentUse: '',
            currentX:'',
            currentY:''
        })
    }


    moveOnImage(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
            moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
        });
    }

    clickedOutside(evt) {
        this.setState({
            currentX: evt.nativeEvent.layerX,
            currentY: evt.nativeEvent.layerY
        });
    }

    render(){
        var expression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
        var regex = new RegExp(expression);
        const currentAreas = {areas:[...this.state.points]};
        const newPoint = this.getCurrentPoint('red');
        if(newPoint)
            currentAreas.areas.push(newPoint);


      //  console.log(this.state.points);
        return <div>
            <div className='leftcol'>
                <div className="container">
                     <input type='text' placeholder={'imageUrl'} width='300px' value={this.state.url} onChange={ (
                         event)=>this.setState({url: event.target.value})}
                     style ={{
                         width:'300px'
                     }}/>
                     <button onClick={()=>{
                         prompt("Copy to clipboard: Ctrl+C, Enter", JSON.stringify({
                             points: this.state.points,
                             url:this.state.url
                         }
                         ));
                     }}>Экспортировать</button>
                    {/*<button onClick={()=>{*/}
                    {/*    fetch('/create', {*/}
                    {/*        method: 'POST',*/}
                    {/*        headers: {*/}
                    {/*            'Content-Type': 'application/json'*/}
                    {/*        },*/}
                    {/*        body: JSON.stringify({qwe:123}) // body data type must match "Content-Type" header)*/}
                    {/*    })*/}
                    {/*        .then(response=> {*/}
                    {/*        return response.json()})*/}
                    {/*    .then((data) => {*/}
                    {/*        console.log(data);*/}
                    {/*    });*/}
                    {/*}}>QWE</button>*/}
                     {this.state.url && this.state.url.match(regex) &&
                    <><ImageMapper src={this.state.url} width={800}
                                 onImageMouseMove={evt => this.moveOnImage(evt)}
                                   onImageClick={evt => this.clickedOutside(evt)}
                                 map={currentAreas} />
                    <pre>{this.state.moveMsg ? this.state.moveMsg : null}</pre>
                    </>}
                </div>
            </div>
            <div className='rightcol'>
                X: <input readOnly={true} value={this.state.currentX}/>
                 Y: <input readOnly={true} value={this.state.currentY}/>
                 Size: <input value={this.state.currentSize} onChange={(event)=>this.setState({currentSize: event.target.value})}/>
                 <br/>
                 <input placeholder='Название точки' value={this.state.currentName} onChange={(event)=>this.setState({currentName: event.target.value})}/>
                 <br/>
                 <textarea placeholder='Как искать' value={this.state.currentFind} onChange={(event)=>this.setState({currentFind: event.target.value})} />
                 <br/>
                 <textarea placeholder='Применение' value={this.state.currentUse} onChange={(event)=>this.setState({currentUse: event.target.value})} />
                 <br/>
                 <button onClick={()=>{
                     this.setState({points:[...this.state.points, (this.getCurrentPoint())]})
                     this.clearCurrent();
                 }}>Добавить точку</button>
                <button>Очистить</button>

                <div>
                {
                    this.state.points.filter(a=> a.shape!=='line').map((p, i)=><div key={i}>
                        <h3>{p.name}</h3>
                        <p>Как найти: {p.find}</p>
                        <p>Используется при: {p.use}</p>
                        <button onClick={()=>{

                            if(this.state.points.length===1)
                                this.setState({points:[]})
                            this.setState({points: [...this.state.points.slice(0,i), ...this.state.points.slice(i+1)]})
                        }}>Удалить точку</button>
                    </div>)
                }
                </div>
            </div>
        </div>
    }


}
