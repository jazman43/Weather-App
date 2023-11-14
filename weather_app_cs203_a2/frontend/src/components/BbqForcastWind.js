import React, { Component } from "react";
import axios from 'axios';

export default class WeeklyForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastData: null,
      loading: true,
      city: 'Hamilton',
      country: 'NZ',
      cityError: "",
      countryError: "",
    };
    this._isMounted = false;
  }

  isSuitableForBBQ = (weather) => {
    // Add your condition to determine if it's suitable for a BBQ
    // For example, check if the temperature is between 18°C and 30°C and the weather is clear
    return weather.temp.day >= 18 && weather.temp.day <= 30 && weather.weather[0].main === 'Clear';
  };

  handleInputChange = (field, value) => {
    this.setState({ [field]: value, [`${field}Error`]: "" });
  };

  validateInput = () => {
    const { city, country } = this.state;
    const errors = {};

    if (!city) {
      errors.cityError = "City is required";
    }

    if (!country) {
      errors.countryError = "Country is required";
    }

    this.setState(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  async getWeeklyForecastData() {
    try {
      const { city, country } = this.state;

      if (!this.validateInput()) return;

      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast/daily', {
        params: {
          q: `${city},${country}`,
          cnt: 7,
          appid: '6cd8596a9e075cc1718aeee820c8d1fa',
        },
      });

      if (this._isMounted) {
        console.log(response.data);

        if (response.data && response.data.list && response.data.list.length > 0) {
          this.setState({
            forecastData: response.data.list,
            loading: false,
          });
        } else {
          console.error('Invalid data structure in the response:', response.data);
          this.setState({
            loading: false,
          });
        }
      }
    } catch (error) {
      if (this._isMounted) {
        console.error('Error fetching weekly forecast data: ', error);
        this.setState({
          loading: false,
        });
      }
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.getWeeklyForecastData();
  }

  componentWillUnmount() {
    this._isMounted = false;
    console.log("Request canceled due to component unmount");
  }

  handleGetForecastClick = () => {
    this.setState({ loading: true });
    this.getWeeklyForecastData();
  };

  convertTimestampToDay = (timestamp) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return daysOfWeek[date.getDay()];
  };

  render() {
    const { forecastData, loading, cityError, countryError, city, country } = this.state;

    return (
      <div id="weeklyForecastID">
        <h1>BBQ Forecast</h1>
        {loading ? (
          <p>Loading.....</p>
        ) : forecastData ? (
          <div>
            <div>
              <label htmlFor="city">City: </label>
              <input
                type="text"
                id="city"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => this.handleInputChange("city", e.target.value)}
              />
              {cityError && (
                <p className="error-message">{cityError}</p>
              )}
            </div>
            <div>
              <label htmlFor="country">Country Code: </label>
              <input
                type="text"
                id="country"
                placeholder="Enter country code (e.g., US)"
                value={country}
                onChange={(e) => this.handleInputChange("country", e.target.value)}
              />
              {countryError && (
                <p className="error-message">{countryError}</p>
              )}
            </div>

            <button onClick={this.handleGetForecastClick}>
              Get Weekly Forecast
            </button>

            <div id="forecast-info" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {forecastData && forecastData.length > 0 ? (
                <div>
                  <h2>Weekly Forecast for {city}, {country}</h2>
                  {forecastData.map((day, index) => (
                    <div key={index}>
                      <h3>{this.convertTimestampToDay(day.dt)}</h3>
                      <p>Temperature: {day.temp.day}°C</p>
                      <p>Weather: {day.weather[0].description}</p>
                      <p>Humidity: {day.humidity}%</p>
                      <p>Wind Speed: {day.speed} m/s</p>

                      {/* Display BBQ message based on weather suitability */}
                      {this.isSuitableForBBQ(day) ? (
                        <p>Weather looks suitable for a BBQ! 🌞🍔</p>
                      ) : (
                        <p>Consider other plans, BBQ conditions may not be ideal. ☁️🚫🍖</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    );
  }
}
