//here is where the rain radar will live
import React, { Component, useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route, Link, Outlet,
    useNavigate,
    Routes, } from "react-router-dom";
import axios from 'axios';



//current test will change to the rain radar soon
export default class RainRadar extends Component{
      constructor(props){
          super(props);
          this.state = {
            city: 'Auckland',
            country: 'NZ',
            radarImageUrl: null,
            loading: true,
                        
          };
          this._isMounted = false;
      }

      componentDidMount() {
        this._isMounted = true;
        this.getWeatherData();
      }

      

      async getWeatherData() {
          try{
            const {city, country} = this.state;

            

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
      
      handleCityChange = (e) =>{
        this.setState({ city: e.target.value, cityError: ""});
    };
      
    handleCountryChange = (e) =>{
      this.setState({ country: e.target.value, countryError: ""});
    };

      componentWillUnmount() {
        this._isMounted = false;
        console.log("Request canceled due to component unmount");
      }

      handleGetWeatherClick = () => {
        this.setState({ loading: true }); // Set loading to true before fetching data
        this.getWeatherData();
      };

    render() {      

      const {radarImageUrl , loading ,city , country} = this.state;


        return (
            <div id="rainRadarID">
                <div>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">{/*<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}<path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
                  </button>                  
                </div>
                <h1 id="mainWeatherTitle">Rain Radar</h1>
                {
                  loading ? (
                    <div className="mainWeatherInputFields">
                      <p>loading....</p>
                      <div className="spinner"></div>
                    </div>
                    
                  ) : (
                    radarImageUrl ? (
                      <div >
                          <div className="mainWeatherInputFields">
                            <label htmlFor="city">City: </label>
                              <input
                                type="text"
                                id="city"
                                placeholder="Enter city name"
                                onChange={this.handleCityChange}
                              />
                            {/*cityError && <p className="error-message">{cityError}</p>*/}
                          </div>
                          <div className="mainWeatherInputFields">
                            <label htmlFor="country">Country Code: </label>
                              <input
                                type="text"
                                id="country"
                                placeholder="Enter country code (e.g., US)"
                                onChange={this.handleCountryChange}
                              />
                              {/*countryError && <p className="error-message">{countryError}</p>*/}
                          </div>
                        
                          <button className="getWeatherButton" onClick={this.handleGetWeatherClick}>Get Weather</button>
                        <div className="mainWeatherInfoBox">
                          
                          <h2>Weather in {city}, {country}</h2>
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
                
            </div>
        );
    };
}


/*
export default class SideBarMenu extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
          
        );
    }
}
*/



