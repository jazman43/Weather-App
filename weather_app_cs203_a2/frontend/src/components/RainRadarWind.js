//here is where the rain radar will live
import React, { Component, useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route, Link, Outlet,
    useNavigate,
    Routes, } from "react-router-dom";
import axios from 'axios';
import MainWeather from "./MainWeatherWindow";
import WeatherWarings from "./WeaterWaringsWind";
import LaundryForcast from "./LaundryForcastWind";
import IdealFinishing from "./IdealFinishingWind";
import FireDanger from "./FireDangerWind";
import BBqForcast from "./BbqForcastWind";


//current test will change to the rain radar soon
  class RainRadar extends Component{
      constructor(props){
          super(props);
          this.state = {
            city: 'London',
            country: 'GB',
            radarImageUrl: null,
            loading: true,
                        
          };
          this._isMounted = false;
      }

      componentDidMount() {
        this._isMounted = true;
        this.getWeatherData();
      }

      handleCityChange = (e) =>{
        this.setState({ city: e.target.value, cityError: ""});
      };
      
      handleCountryChange = (e) =>{
        this.setState({ country: e.target.value, countryError: ""});
      };

      async getWeatherData() {
          try{
            //const {city, country} = this.state;

            

            const response = await axios.get('/api/RainRadarWeather/',{
              params: {
                    city: this.state.city,
                    country: this.state.country,
                },
                responseType: 'arraybuffer', 
              
            });

            const arrayBufferView = new Uint8Array(response.data);
            const blob = new Blob([arrayBufferView], { type: 'image/png' });
            const radarImageUrl = URL.createObjectURL(blob);


            
            
            
            if (this._isMounted) {
              
              this.setState({
                radarImageUrl,
                loading: false,
              });
            }
           
          }catch (error){
            if(this._isMounted){
              console.error('Error fetching weather data: ', error);
              this.setState({
                loading: false,
              });
            }
          }
      }    
      
      

      componentWillUnmount() {
        this._isMounted = false;
        console.log("Request canceled due to component unmount");
      }

      handleGetWeatherClick = () => {
        this.setState({ loading: true }); // Set loading to true before fetching data
        this.getWeatherData();
      };

    render() {      

      const {radarImageUrl , loading ,cityError , countryError} = this.state;


        return (
            <div id="rainRadarID">
                <h1>Rain Radar</h1>
                {
                  loading ? (
                    <p>loading radar data ....</p>
                  ) : (
                    radarImageUrl ? (
                      <div>
                          <div>
                              <label htmlFor="city">City: </label>
                              <input
                                  type="text"
                                  id="city"
                                  placeholder="Enter city name"
                                  onChange={this.handleCityChange}
                              />
                              {/*cityError && <p className="error-message">{cityError}</p>*/}
                          </div>
                          <div>
                              <label htmlFor="country">Country Code: </label>
                              <input
                                  type="text"
                                  id="country"
                                  placeholder="Enter country code (e.g., US)"
                                  onChange={this.handleCountryChange}
                              />
                              {/*countryError && <p className="error-message">{countryError}</p>*/}
                          </div>
                            
                          <button onClick={this.handleGetWeatherClick}>Get Weather</button>

                        <div>
                          <p>Display rain radar!..</p>
                          <div id="rainRadarBackground">
                            <img src={radarImageUrl} alt="Radar Map" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>no data</p>                      
                    )
                  ) 
                }
                <div>
                  <p>here we have a map with an rain over lay how this works idk lol </p>
                                    
                </div>
            </div>
        );
    };
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