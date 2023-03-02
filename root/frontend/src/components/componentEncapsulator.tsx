import React, { useEffect } from "react";
import { useState } from "react";
import '../App.css';
import '../index.css';
import Speedometer from "../components/Speedometer";
import Tachometer from '../components/Tachometer';
import LinearGauge from "../components/LinearGauge";
import ThrottlePressure from "../components/ThrottlePressure";
import SimpleLight from "../components/SimpleLight";
import { ComponentsPage } from '../models/componentsPage'
import { Sensor } from "../models/sensor";
import { IoReload, IoClose } from "react-icons/io5";
import Paho from 'paho-mqtt';
import LiveGraph2 from "../components/LiveGraph2";
import { MyFileUppy } from "./FileUploader/MyFileUppy";

import { LiveMap } from "./LiveMap";
import { LapTimer } from "./LapTimer"
import { MessageSender } from "./messageSender";

import { AVAILABLE_COMPONENTS } from "../models/constants";

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { type } from "os";


export enum ComponentType {
    check = 1,
    radialGauge,
    linearGauge,
    plot,
    circuitMap,
    lapTimer,
    messageSender
}


interface Props {
    passedComp: ComponentsPage,
    onDelete: any
}

export const ComponentEncapsulator: React.FC<Props> = ({ passedComp, onDelete }) => {

    const style1 = { color: "red" };
    const style2 = { color: "black" };

    const [val, setVal] = useState<number[]>([]);
    const [singleVal, setSingleVal] = useState<number>(0);
    const [position, setPosition] = useState({});
    const [isConnected, setConnected] = useState(false);

    //Topic name uses all sensors of the object and the local time
    let topicName = passedComp.sensorSelected.map(e => {return ' ' + String(e.sensorName)}).toString() + " " + new Date().getTime();
    let arrayMessages: number[] = [];
    let client = new Paho.Client("broker.mqttdashboard.com", Number(8000), "/mqtt", topicName);

    //Creation a client with a list of sensors
    const _init = () => {
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client.connect({ onSuccess: onConnect, onFailure: onFailureConnect });
    }


    // Function called when the client manages to connect to the topic
    function onConnect() {

        console.group('%c Creating a client for the following sensors: ' + topicName, 'color: lightblue; font-weight: bold; font-size: 15px');

        if (client == undefined) {
            console.log('Client undefined');
        }

        passedComp.sensorSelected.forEach((s, index) => {
            arrayMessages.push(0);
            console.log('%c Connecting to the topic: ' + "H2polito/" + s.topicName, 'color: orange');
            client.subscribe("H2polito/" + s.topicName, {});
        });

        console.groupEnd()
        setVal(arrayMessages);

        setConnected(true);
    }


    // Function called when the connection has been lost
    function onConnectionLost(responseObject: any) {
        if (responseObject.errorCode !== 0) {
            console.error("onConnectionLost:" + responseObject.errorMessage);
        }

        console.groupEnd()
        setConnected(false);
    }

    // Function called when a message arrives at destination
    function onMessageArrived(message: any) {

        console.log('Message arrived on destination: ' + message.destinationName + ' ' + message.payloadString);

        //Finds the matching payload that with the string "H2polito/Vehicle" + sensor name
        passedComp.sensorSelected.forEach((sensor, index) => {
            if (('H2polito/' + sensor.topicName) == message.destinationName) {
                if(message.payloadString)
                if (sensor.sensorName == "Position") {
                }
                else{
                    if(typeof JSON.parse(message.payloadString) != "number"){
                        console.error("Got a string on channel " + message.destinationName)        
                    }else{
                        arrayMessages[index] = JSON.parse(message.payloadString);
                    }
                }

            }
        });

        setSingleVal(arrayMessages[0])
        setVal(arrayMessages);
    }

    function onFailureConnect() {
        console.error("Connection failed from " + topicName);
        setConnected(false);
    }


    //Called once when the component is mounted
    useEffect(() => {
        _init();

        //Return called when the component will unmount
        return () => {
            passedComp.sensorSelected.map((s, index) => {
                console.log('Unsubscribing ' + "H2polito/" + s.topicName);
                try{
                    console.log("Unsubscribe went well")
                client.unsubscribe("H2polito/" + s.topicName, {});
                } catch(InvalidState){
                    console.log("Error unsubscribing")
                }
                return
            })
            try{
            client.disconnect();
            }
            catch(InvalidState){
                console.log("Error disconnect")
            }
        }
    }, []);



    return (
        <div className="card dashboardElement">
            {window.location.pathname == "/" &&
                <div className="card-header handle">
                    <span className="cards-title">{passedComp.nameComponent} </span>
                    {isConnected == false &&
                        <span className="text-red-500">
                            {passedComp.sensorSelected.map((s: Sensor, index) => (
                                <span key={index}>{s.sensorName} </span>
                            )
                            )}

                        </span>
                    }
                    {isConnected == true &&

                        <span className=" text-green-500">
                            {passedComp.sensorSelected.map((s: Sensor, index) => (
                                <span key={index}>{s.sensorName} </span>
                            )
                            )}
                        </span>
                    }

                    <span>

                        <button type="button" className="float-right" aria-label="Close" onClick={() => onDelete(passedComp)}><IoClose size={20} style={style1} /></button>
                        <button type="button" className="float-right" onClick={() => _init()}><IoReload size={18} style={style2} /></button>
                    </span>



                </div>}

            <div className="card-body">
                {passedComp.typeComponent == AVAILABLE_COMPONENTS[0].ID &&
                    <div className="">
                        <SimpleLight value={val} comp={passedComp} />
                    </div>

                }
                {passedComp.typeComponent == AVAILABLE_COMPONENTS[1].ID &&
                    <div className="basis-1/3">
                        <Speedometer value={singleVal} minSpeed={passedComp.cmpMinRange} maxSpeed={passedComp.cmpMaxRange} />
                    </div>
                }
                {passedComp.typeComponent == AVAILABLE_COMPONENTS[2].ID &&
                    <div className="basis-full">
                        <LinearGauge value={singleVal} minVal={passedComp.cmpMinRange} maxVal={passedComp.cmpMaxRange} />
                    </div>
                }

                {passedComp.typeComponent == AVAILABLE_COMPONENTS[3].ID &&
                    <div className="basis-full" >
                        <LiveGraph2 passedData={val} minVal={passedComp.cmpMinRange} sensorList={passedComp.sensorSelected} id={passedComp.compID} maxVal={passedComp.cmpMaxRange} />
                    </div>
                }

                {/*passedComp.typeComponent == ComponentType.throttlePressure &&
                    <div className="basis-full">
                        {passedComp.cmpMinRange}
                        {passedComp.cmpMaxRange}
                        <ThrottlePressure value={singleVal} minVal={passedComp.cmpMinRange} maxVal={passedComp.cmpMaxRange} />
                    </div>
            */}



                {passedComp.typeComponent == AVAILABLE_COMPONENTS[4].ID &&
                    <div className="basis-full" style={{ height: "100%" }}>
                        <LiveMap position={position}></LiveMap>
                    </div>

                }

                {passedComp.typeComponent == AVAILABLE_COMPONENTS[5].ID &&
                    <div className="basis-full" style={{ height: "100%" }}>
                        <LapTimer></LapTimer>
                    </div>
                }

                {passedComp.typeComponent == AVAILABLE_COMPONENTS[6].ID &&
                    <div>
                        <MessageSender></MessageSender>
                    </div>
                }

                {passedComp.typeComponent == AVAILABLE_COMPONENTS[7].ID &&
                    <div>
                        <MyFileUppy></MyFileUppy>
                    </div>
                }

            </div>

        </div >



    )
}
