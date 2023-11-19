import React, { Component } from "react";
import axios from 'axios';

//the component to display current weather
export default class MainWeatherWindow extends Component {

    constructor(props){
        super(props);
        this.state = {
          weatherData: null,
          loading: true,
          //defult location
          city: 'Auckland',
          country: 'NZ',
          countryError: "",
          cityError: "",
          
        };
        this._isMounted = false;
    }

      //for handling the change to city and current state 
    handleCityChange = (e) =>{
        this.setState({ city: e.target.value, cityError: ""});
    };
      
    handleCountryChange = (e) =>{
      this.setState({ country: e.target.value, countryError: ""});
    };

    //error checking for city and country
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

    //getting data from backend
    async getWeatherData() {
        try{
          const {city, country} = this.state;
    
          if(!this.validateInput()) return;
          
          const response = await axios.get('/api/weather/',{
            params: {
              city,
              country,
              cityError: "",
              countryError: "",
            },
            
          });
          
          //set data and stop loading 
          if (this._isMounted) {
            console.log(response.data);
            this.setState({
              weatherData: response.data,
              loading: false,
            });
          }
         
        //display error if cant find correct data stop loading   
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
    
    //re loads page if new location is inputed 
    handleGetWeatherClick = () => {
      this.setState({ loading: true }); // Set loading to true before fetching data
      this.getWeatherData();
    };

    render() {

        const {weatherData , loading ,cityError , countryError} = this.state;


        return (
            <div id="mainWeatherID">
                <h1 id="mainWeatherTitle">Current Weather</h1>                
                {/** if loading display loading text and a spinner animaion */
                    loading ? (
                      <div>
                        <p>
                          loading....
                        </p>
                        <div className="spinner"></div>
                      </div>
                    ) : ( weatherData ? (/**when loading is complete and data reseved from backend */
                        <div id="mainWeatherDataBox">
                          {/** display input feilds*/}
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
                            
                            <button className="getWeatherButton" onClick={this.handleGetWeatherClick}>Get Weather</button>
                            <div id="weather-info">
                                {weatherData && (/**display weather date sent from backed */
                                    <div className="mainWeatherInfoBox">
                                        <h2>Weather in {weatherData.city}, {weatherData.country}</h2>
                                        <p>Temperature: {weatherData.temperature}°C</p>
                                        <p>Weather: {weatherData.weather_description}</p>
                                        <img src={weatherData.weather_icon_url} alt="Weather Icon" style={{width: '50px', height: '50px'}}/>
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
