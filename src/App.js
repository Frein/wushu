import React from 'react';
import './App.css';
import View from "./components/View";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Edit from "./components/Edit";

class App extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/developer">
                       <Edit />
                    </Route>
                    <Route path="/">
                        <View />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }


}

export default App;
