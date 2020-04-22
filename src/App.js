import React from 'react';
import './App.css';
import View from "./components/View";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Edit from "./components/Edit";
import EditZone from "./components/EditZone";
import View2 from "./components/View2";
import ViewZone1 from "./components/ViewZone1";

class App extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/developer">
                    <Edit />
                </Route>
                    <Route path="/developerzone">
                        <EditZone />
                    </Route>
                    <Route path="/lesson2/zones">
                        <ViewZone1 />
                    </Route>
                    <Route path="/lesson2">
                        <View2 />
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
