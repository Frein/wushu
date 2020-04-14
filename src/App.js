import React from 'react';
import './App.css';
import ImageMapper from 'react-image-mapper';

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

    render() {
        return (
            <div className="App">
                <ImageMapper src='head.jpg' width={800}
                             onImageMouseMove={evt => this.moveOnImage(evt)}
                             map={{ name: 'qwe', areas: [{
                        name: "5",
                        shape: "circle",
                        coords: [190, 200, 3],
                        preFillColor: "rgb(0,0,0,1)",
                        lineWidth: 2
                    }, ] }}/>
                <pre className="message">
                {this.state.msg ? this.state.msg : null}
        </pre>
                <pre>{this.state.moveMsg ? this.state.moveMsg : null}</pre>
            </div>
        );
    }


}

export default App;
