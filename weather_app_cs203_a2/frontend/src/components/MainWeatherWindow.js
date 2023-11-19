import React, { Component } from "react";
import axios from 'axios';


export default class MainWeatherWindow extends Component {

    constructor(props){
        super(props);
        this.state = {
          weatherData: null,
          loading: true,
          city: 'Hamilton',
          country: 'NZ',
          countryError: "",
          cityError: "",
        };
        this._isMounted = false;
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
    
          const response = await axios.get('/api/weather/',{
            params: {
              city,
              country,
            },
            
          });
          
          if (this._isMounted) {
            console.log(response.data);
            this.setState({
              weatherData: response.data,
              loading: false,
            });
            if (localStorage.getItem("weatherData")){
              alert("Weather data was previously saved for offline use. Please tick the offline checkbox again to save updated data.")
            }
          }
         
        }catch (error){
          if(this._isMounted){
            console.error('Error fetching weather data. Checking local storage: ', error);
            this.loadLocalData();
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

      saveWeatherToFile = () => {
        
        if (offlineToggle.checked == true){
          console.log("Checkbox checked");
          alert("Weather now saved for offline use");
          localStorage.setItem('weatherData', JSON.stringify(this.state.weatherData));
        }
        else{
          console.log("Checkbox un-checked");
          localStorage.removeItem('weatherData');
        }
      }

      loadLocalData() {
        const localdata = localStorage.getItem("weatherData");
        this.state.weatherData = JSON.parse(localdata);
        alert("The Page was unable to fetch updated weather data. Currently using previuosly saved data");
      }

      

      
    render() {

        const {weatherData , loading ,cityError , countryError} = this.state;


        return (
            <div id="mainWeatherID">
                <h1>Main Weather!!</h1>
                <h2>Current Weather</h2>
                {
                    loading ? (
                      <div>
                        <p>
                          loading....
                        </p>
                        <div className="spinner"></div>
                      </div>
                    ) : ( weatherData ? (
                        <div>
                            <div>
                                <label htmlFor="city">City: </label>
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="Enter city name"
                                    onChange={this.handleCityChange}
                                />
                                {cityError && <p className="error-message">{cityError}</p>}
                            </div>
                            <div>
                                <label htmlFor="country">Country Code: </label>
                                <input
                                    type="text"
                                    id="country"
                                    placeholder="Enter country code (e.g., US)"
                                    onChange={this.handleCountryChange}
                                />
                                {countryError && <p className="error-message">{countryError}</p>}
                            </div>
                            
                            <button onClick={this.handleGetWeatherClick}>Get Weather</button>
                            <div> 
                            <input type="checkbox" id="offlineToggle" name="offlineToggle" onClick={this.saveWeatherToFile}></input>
                            <label for="offlineToggle">Save weather info for offline use</label>
                            </div>
                            <div id="weather-info">
                                {weatherData && (
                                    <div>
                                        <h2>Weather in {weatherData.city}, {weatherData.country}</h2>
                                        <p>Temperature: {weatherData.temperature}°C</p>
                                        <p>Weather: {weatherData.weather_description}</p>
                                        <p>Humidity: {weatherData.humidity}%</p>
                                        <p>Wind Speed: {weatherData.wind_speed} m/s</p>
                                    </div>
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
