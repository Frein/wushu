import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Menu from "./Menu";

function App() {
    return (
        <BrowserRouter>
            <Switch>
            <Route component={Menu} path="/"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
