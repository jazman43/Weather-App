import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Switch, Route, Link, Outlet,
    useNavigate,
    Routes, } from "react-router-dom";

//import each section

import SideBarMenu from "./RainRadarWind";


export default class App extends Component{
    constructor(props){
        super(props);
    }





    render(){
        return (            
            <Router>
                <SideBarMenu/>
            </Router>    
        );
    }
}


const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App/>);