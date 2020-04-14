import React from 'react';
import './App.css';
import ImageMapper from 'react-image-mapper';
import points from './map'

class App extends React.Component{
    constructor() {
        super();
        this.state={};
    }
    moveOnImage(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
            moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
        });
    }

    enterArea(area) {
        this.setState({
            hoveredArea: area,
            msg: `You entered ${area.id} ${area.name} at coords ${JSON.stringify(
                area.coords
            )} !`
        });
    }

    leaveArea(area) {
        this.setState({
            hoveredArea: null,
            msg: `You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
                area.coords
            )} !`
        });
    }

    getTipPosition(area) {
        return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
    }

    render() {
        return (
            <div>
                <div className='leftcol'>
                    <div className="container">
                        <ImageMapper src='head.jpg' width={800}
                                     onImageMouseMove={evt => this.moveOnImage(evt)}
                                     onMouseEnter={area => this.enterArea(area)}
                                     onMouseLeave={area => this.leaveArea(area)}
                                     map={points}/>
                        {
                            this.state.hoveredArea &&
                            <span className="tooltip"
                                  style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
    		{ this.state.hoveredArea &&
            <div style={{width:'250px'}}>
                <h3>{this.state.hoveredArea.name}</h3>
                <p>{this.state.hoveredArea.find}</p>
            </div>
            }
    	</span>
                        }
                        <pre className="message">
                {this.state.msg ? this.state.msg : null}
        </pre>
                        <pre>{this.state.moveMsg ? this.state.moveMsg : null}</pre>
                    </div>
                </div>
                <div className='rightcol'>
                    {
                        points.areas.map(p=><div>
                            <h3>{p.name}</h3>
                            <p>Как найти: {p.find}</p>
                            <p>Используется при: {p.use}</p>
                        </div>)
                    }
                </div>
            </div>

        );
    }


}

export default App;
