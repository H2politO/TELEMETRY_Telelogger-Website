import React, { useState, useEffect, Component } from 'react';
import '../App.css';
import '../index.css';
import Cookies from "universal-cookie"
import { ComponentEncapsulator } from '../components/componentEncapsulator';
import { ComponentsPage } from '../models/componentsPage';
import Paho from "paho-mqtt"
import {CarPicker} from "../components/StrategyPlanner/CarPicker"
import { BgMap } from '../components/StrategyPlanner/BgMap';
import BottomMenu from '../components/StrategyPlanner/BottomMenu';
import MapCreator from '../components/StrategyPlanner/MapCreator';


let cookie = new Cookies();


type Props = {

};


export const StrategyPlanner = () => {
    
    let mqttClient:Paho.Client;
    const [carSelect, setCarSelect] = React.useState('1'); //Contains current selected car, 1= Juno 2= Idra
    const [currAction, setAction] = React.useState(""); //Contains the current menu selection

    //Useeffect called only when the page is loaded; if cookies are present load them; if they aren't, don't
    useEffect(() => {
        
        console.log("Starting root mqtt client...");
        mqttClient = new Paho.Client("broker.mqttdashboard.com", Number(8000), "/mqtt", "myClientId" + new Date().getTime());
        mqttClient.connect({ onSuccess: onConnect });

    }, [])

    //Called when mqtt client connects
    function onConnect(){
        console.log("Root MQTT Client connected");
    }



    return (
        <div  className="mb-auto mx-auto">
           
           <BgMap></BgMap>
           <CarPicker carSelect={carSelect} setCarSelect={setCarSelect} ></CarPicker>
           <BottomMenu setAct={setAction}></BottomMenu>

            {currAction=="create" && 
                <MapCreator setAct={setAction}></MapCreator>
            }

        </div>
    )

}

export default StrategyPlanner