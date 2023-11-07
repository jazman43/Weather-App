import React, { Component } from "react";

class MainWeatherInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            country: "",
            weatherData: null,
            cityError: "",
            countryError: "",
            fetchError: "",
        };
    }

    handleCityChange = (e) => {
        this.setState({ city: e.target.value, cityError: "" });
    };

    handleCountryChange = (e) => {
        this.setState({ country: e.target.value, countryError: "" });
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

    getWeather = async () => {
        const { city, country } = this.state;

        if (!this.validateInput()) {
            return;
        }

        try {
            const apiKey = '6cd8596a9e075cc1718aeee820c8d1fa'; // Replace with your API key
            const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

            const response = await fetch(`${apiUrl}?q=${city},${country}&appid=${apiKey}&units=metric`);
            if (response.ok) {
                const data = await response.json();
                this.setState({ weatherData: data, fetchError: "" });
            } else {
                console.error('Error fetching weather data');
                this.setState({ fetchError: "Invalid city or country code" });
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.setState({ fetchError: "An error occurred while fetching weather data" });
        }
    };

    render() {
        const { weatherData, cityError, countryError, fetchError } = this.state;

        return (
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
                {fetchError && <p className="error-message">{fetchError}</p>}
                <button onClick={this.getWeather}>Get Weather</button>
                <div id="weather-info">
                    {weatherData && (
                        <div>
                            <h2>Weather in {weatherData.name}, {weatherData.sys.country}</h2>
                            <p>Temperature: {weatherData.main.temp}°C</p>
                            <p>Weather: {weatherData.weather[0].description}</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default MainWeatherInfo;
