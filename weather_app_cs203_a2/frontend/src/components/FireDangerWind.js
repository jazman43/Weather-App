//Here is where the fire danger window will live
import React, { Component } from "react";



export default class FireDanger extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div id="fireDangerID">
                <h1>Fire Danger</h1>
            </div>
        );
    }
}