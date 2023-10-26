//here is where the main weather window will live 

import React, { Component } from "react";



export default class MainWeather extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div id="mainWeatherID">
                <h1>main weather</h1>
            </div>
        );
    }
}