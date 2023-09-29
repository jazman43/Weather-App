import React, { Component } from "react";
import { createRoot } from "react-dom/client";


//here we will change between each fucntion/ scetion 
//this is where the side menu will live with each section having its own button
export default class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <h1>Welcome to React!!! dum</h1>;
    }
}


const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App/>);