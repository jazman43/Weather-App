//Here is where the Weather warings window lives
import React, { Component } from "react";
import axios from "axios";


export default class WeatherWarings extends Component{
    constructor(props){
        super(props);
        this.state = {
          weatherData: null,
          loading: true,
          city: 'Auckland',
          country: 'NZ',
          cityError: "",
          countryError: "",
        }
    }


    handleCityChange = (e) =>{
        this.setState({ city: e.target.value, cityError: ""});
    };
      
    handleCountryChange = (e) =>{
      this.setState({ country: e.target.value, countryError: ""});
    };

    validateInput = () => {
        let valid = true;
        const { city, country } = this.state;
      
        if (!city) {
            this.setState({ cityError: "City is required" });
            valid = false;
        }
      
        if (!country) {
            this.setState({ countryError: "Country is required" });
            valid = false;
        }
      
        return valid;
    };

    async getWeatherData() {
        try{
          const {city, country} = this.state;
    
          if(!this.validateInput()) return;
    
          const response = await axios.get('/api/WeatherWarnings/',{
            params: {
              city : this.state.city,
              country: this.state.country,
            },
            
          });
          
          if (this._isMounted) {
            console.log(response.data);
            this.setState({
              weatherData: response.data,
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
    
    componentDidMount() {
        this._isMounted = true;
        this.getWeatherData();
      }
      
      componentWillUnmount() {
        this._isMounted = false;
        console.log("Request canceled due to component unmount");
      }
      
      handleGetWeatherClick = () => {
        this.setState({ loading: true }); // Set loading to true before fetching data
        this.getWeatherData();
      };

    render(){

        const {weatherData , loading, cityError, countryError } = this.state;

        return (
            <div id="weatherWaringsID">
                <h1 id="mainWeatherTitle">Weather Warings</h1>
                {
                    loading ? (
                      <div className="mainWeatherInputFields">
                        <p>loading....</p>
                        <div className="spinner"></div>
                      </div>
                    ) : ( weatherData ? (
                        <div>
                            <div className="mainWeatherInputFields">
                                <label htmlFor="city">City: </label>
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="Enter city name"
                                    onChange={this.handleCityChange}
                                />
                                {cityError && <p className="error-message">{cityError}</p>}
                            </div>
                            <div className="mainWeatherInputFields">
                                <label htmlFor="country">Country Code: </label>
                                <input
                                    type="text"
                                    id="country"
                                    placeholder="Enter country code (e.g., US)"
                                    onChange={this.handleCountryChange}
                                />
                                {countryError && <p className="error-message">{countryError}</p>}
                            </div>
                            
                            <button className="getWeatherButton" onClick={this.handleGetWeatherClick}>Get Alerts</button>
                            <div id="weather-info">
                              {weatherData.alerts_event ? (
                                <div className="mainWeatherInfoBox">
                                  <h2>Weather in {weatherData.city}, {weatherData.country}</h2>
                                  <p>event: {weatherData.alerts_event}</p>
                                  <p>alert description: {weatherData.alerts_description}</p>
                                </div>
                              ) : (
                                <p>{weatherData.message}</p>
                              )}
                            </div>
                        </div>
                    ) : (
                        <p>no data availble</p>
                    ))
                }
            </div>
        );
    }
}
