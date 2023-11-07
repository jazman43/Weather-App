import React, { Component } from "react";
import MainWeatherInfo from "./MainWeatherInfo";

export default class MainWeatherWindow extends Component {
    render() {
        return (
            <div id="mainWeatherID">
                <h1>Main Weather!!</h1>
                <h2>Current Weather</h2>
                <MainWeatherInfo />
            </div>
        );
    }
}
