import React, { Component } from "react";
import { render } from "react-dom";


export default class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <H1>Welcome to React!!! dum</H1>
        );
    }
}


const appDiv = document.getElementById("app");

render(<App/>, appDiv);