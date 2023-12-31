//Here is where the Weather warings window lives
import React, { Component } from "react";
import axios from "axios";

//this component is for the weather alerts 
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
          //get backend data
          const response = await axios.get('/api/WeatherWarnings/',{
            params: {
              city,
              country,
              cityError: "",
              countryError: "",
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
                <h1>Weather Warings</h1>
                {/** if loading display loading text and a spinner animaion */
                    loading ? (
                      <div>
                        <p>loading....</p>
                        <div className="spinner"></div>
                      </div>
                    ) : ( weatherData ? (
                        <div>
                          {/** display input feilds*/}
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
                            <div id="weather-info">
                              {weatherData.alerts_event ? (/**display alert data if there is an alert */
                                <div>
                                  <h2>Weather in {weatherData.city}, {weatherData.country}</h2>
                                  <p>event: {weatherData.alerts_event}</p>
                                  <p>alert description: {weatherData.alerts_description}</p>
                                </div>
                              ) : (/** display no alerts here messege */
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
