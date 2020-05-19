import ImageMapper from "./ImageMapper";
import React from "react";
import '../App.css'

export default class EditZone extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            url:'body.jpg',
            down:false,
            currentColor:'rgb(255,2550,0,0.3)',
            areas:[],
            zones:[],
            currentName: '',
            currentFind: '',
            currentUse: '',

        };
    }

    currentCoords = []

    getCurrentZone(color) {
        if (this.currentCoords.length) {
            return {
                name: this.state.currentName,
                shape: "line",
                coords: this.currentCoords,
                strokeColor: color || "rgb(0,0,0,1)",
                lineWidth: 2,
                find: this.state.currentFind,
                use: this.state.currentUse
            };
        }
    }

    moveOnImage(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        if(this.state.down)
            this.currentCoords = [...this.currentCoords, coords.x, coords.y];
    }

    mouseUpOnImage(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        console.log(coords, 'Mouse Up')
        this.setState(this.setState({
          down:false
        }));
    }

    mouseDownOnImage(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.currentCoords = [...this.currentCoords, coords.x, coords.y];
        this.setState({
            down:true
        });
        console.log(coords, 'Mouse down')
    }

    clearCurrent(){
        this.setState({
            currentName: '',
            currentFind: '',
            currentUse: '',
        });
        this.currentCoords=[];
    }

    render(){
        var expression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
        var regex = new RegExp(expression);
        console.log(this.state.down, this.currentCoords)

        const currentAreas = {areas:[...this.state.zones]};
        const newZone = this.getCurrentZone('red');
        if(newZone)
            currentAreas.areas.push(newZone);

        console.log(currentAreas);

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
                                zones: this.state.zones,
                                url:this.state.url
                            }
                        ));
                    }}>Экспортировать</button>
                     {this.state.url && this.state.url.match(regex) &&
                    <><ImageMapper src={this.state.url} width={800}
                                 onImageMouseMove={evt => this.moveOnImage(evt)}
                                   onImageMouseDown={evt => this.mouseDownOnImage(evt)}
                                   onImageMouseUp={evt => this.mouseUpOnImage(evt)}
                                editMode={true}
                                 map={currentAreas} />
                    </>}
                </div>
                </div>
            <div className='rightcol'>
                Color: <input value={this.state.currentColor} onChange={(event)=>this.setState({currentColor: event.target.value})}/>
                <br/>
                <input placeholder='Название зоны' value={this.state.currentName} onChange={(event)=>this.setState({currentName: event.target.value})}/>
                <br/>
                <textarea placeholder='Как искать' value={this.state.currentFind} onChange={(event)=>this.setState({currentFind: event.target.value})} />
                <br/>
                <textarea placeholder='Применение' value={this.state.currentUse} onChange={(event)=>this.setState({currentUse: event.target.value})} />
                <br/>
                <button onClick={()=>{
                    this.setState({zones:[...this.state.zones, {
                        ...this.getCurrentZone(),
                            shape: "poly",
                            preFillColor: this.state.currentColor
                        }]});
                    this.clearCurrent();
                }}>Зону добавить</button>
                <button onClick={()=>{
                    this.clearCurrent();
                    this.forceUpdate();
                }}>Очистить</button>

                <div>
                    {
                        this.state.zones.map((p, i)=><div key={i}>
                            <h3>{p.name}</h3>
                            <p>Как найти: {p.find}</p>
                            <p>Используется при: {p.use}</p>
                            <button onClick={()=>{
                                debugger
                                if(this.state.zones.length===1)
                                    this.setState({zones:[]})
                                this.setState({zones: [...this.state.zones.slice(0,i), ...this.state.zones.slice(i+1)]})
                            }}>Удалить зону</button>
                        </div>)
                    }
                </div>
            </div>
        </div>
    }
}



