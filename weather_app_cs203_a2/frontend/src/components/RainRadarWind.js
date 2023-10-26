//here is where the rain radar will live
import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link, Outlet,
    useNavigate,
    Routes, } from "react-router-dom";

import MainWeather from "./MainWeatherWindow";
import WeatherWarings from "./WeaterWaringsWind";
import LaundryForcast from "./LaundryForcastWind";
import IdealFinishing from "./IdealFinishingWind";
import FireDanger from "./FireDangerWind";
import BBqForcast from "./BbqForcastWind";


const apiKey = '6cd8596a9e075cc1718aeee820c8d1fa';
const lon = 20.87;
const lat = 10.88;
const apiSiteCall = 'https://api.openweathermap.org/data/2.5/weather?lat=${10.90}&lon=${20.89}&appid=${6cd8596a9e075cc1718aeee820c8d1fa}'


class RainRadar extends Component{
    constructor(props){
        super(props);
        this.state = {
          radarData: null,
          loading: true,
        };
    }


    componentDidMount(){
      fetch('https://api.openweathermap.org/data/2.5/weather?lat=${10.90}&lon=${20.89}&appid=${6cd8596a9e075cc1718aeee820c8d1fa}')
        .then(Response => {
          if(!Response.ok){
            throw new Error('Network response was not ok fail fail !!');
          }
          return Response.json();
        })
        .then(data => 
          {
            this.setState({
              radarData: data,
              loading: false,
            });
          })
          .catch(error =>{
            console.error('Error fetching radar data: ', error);
            this.setState({loading: false});
          })
    }


    render(){
      const {radarData , loading} = this.state;
        return (
            <div id="rainRadarID">
                <h1>Rain Radar</h1>
                {
                  loading ? (
                    <p>loading radar data ....</p>
                  ) : (
                    radarData ? (
                      <div>
                        <p>Display the radar data..</p>
                      </div>
                    ) : (
                      <p>No Radar data availble</p>
                    )
                  ) 
                }
                <div>
                  <p>here we have a map with an rain over lay how this works idk lol </p>
                </div>
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
                  <Link to="/main-weather">Weather</Link>
                </li>
                <li>
                  <Link to="/weather-warings">Weather Warings</Link>
                </li>
                <li>
                  <Link to="/laundry-forcast">Laundry Forcast</Link>
                </li>
                <li>
                  <Link to="/ideal-finishing">Ideal Finishing</Link>
                </li>
                <li>
                  <Link to="/fire-danger">Fire Danger</Link>
                </li>
                <li>
                  <Link to="/bbq-forcast">BBq Forcast</Link>
                </li>

                {/* Add more links for additional pages as needed */}
              </ul>
            </div>

            <div id="content">
              {/* Define routes for your pages */}
              <Routes>
                <Route exact path="/rain-radar" element={<RainRadar />} />
                <Route exact path="/main-weather" element={<MainWeather />} />
                <Route exact path="/weather-warings" element={<WeatherWarings />} />
                <Route exact path="/laundry-forcast" element={<LaundryForcast />} />
                <Route exact path="/ideal-finishing" element={<IdealFinishing />} />
                <Route exact path="/fire-danger" element={<FireDanger />} />
                <Route exact path="/bbq-forcast" element={<BBqForcast />} />
                {/* Add more routes for additional pages as needed */}
              </Routes>
            </div>
          </div>
        );
    }
}