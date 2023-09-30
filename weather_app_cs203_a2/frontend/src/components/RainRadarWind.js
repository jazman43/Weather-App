//here is where the rain radar will live
import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link, Outlet,
    useNavigate,
    Routes, } from "react-router-dom";

import MainWeather from "./MainWeatherWindow";



class RainRadar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div id="rainRadarID">
                <h1>Rain Radar</h1>
            </div>
        );
    }
}


export default class SideBarMenu extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
          <div id="container">
            <div id="sidebarId">
              <ul>
                {/* Create links to navigate to different pages */}
                <li>
                  <Link to="/rain-radar">Rain Radar</Link>
                </li>
                <li>
                  <Link to="/main-weather">weather</Link>
                </li>

                {/* Add more links for additional pages as needed */}
              </ul>
            </div>

            <div id="content">
              {/* Define routes for your pages */}
              <Routes>
                <Route exact path="/rain-radar" element={<RainRadar />} />
                <Route exact path="/main-weather" element={<MainWeather />} />
                {/* Add more routes for additional pages as needed */}
              </Routes>
            </div>
          </div>
        );
    }
}