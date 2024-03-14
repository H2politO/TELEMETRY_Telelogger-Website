import React, { useEffect, useRef } from "react";
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


import { v4 as uuidv4 } from 'uuid';

import { LiveMap } from "./LiveMap";
import { LapTimer } from "./LapTimer"
import { MessageSender } from "./messageSender";

import { AVAILABLE_COMPONENTS } from "../models/constants";

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { UplotLive } from "./LiveGraph2/uplot_live";
import { SensorList } from "./Sidebar/sensorsList";


export enum ComponentType {
    check = 1,
    radialGauge,
    linearGauge,
    plot,
    circuitMap,
    lapTimer,
    messageSender,
    carPicker
}


interface Props {
    passedComp: ComponentsPage,
    onDelete: any
    onResize?: (id: string, width: number, height: number) => void;
}


    export const ComponentEncapsulator: React.FC<Props> = ({ passedComp, onDelete, onResize }) => {

    const style1 = { color: "red" };
    const style2 = { color: "black" };

    const [val, setVal] = useState<number[]>([]);
    const [position, setPosition] = useState([undefined, undefined]);
    const [isConnected, setConnected] = useState(false);

    const parentRef = useRef(null);
    let carSelected

    //Topic name uses all sensors of the object and the local time
    let topicName = passedComp.sensorSelected.map(e => { return ' ' + String(e.sensorName) }).toString() + " " + new Date().getTime();
    console.log(topicName)
    let arrayMessages: number[] = [];
    let client = new Paho.Client("broker.mqttdashboard.com", Number(8000), "/mqtt", topicName);


    const { compID, typeComponent } = passedComp;
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

 

    useEffect(() => {

        //parentRef.current.style.height = window.innerHeight
        //parentRef.current.style.width = window.innerWidth
        //console.log(parentRef.current.style.height, parentRef.current.style.width );
        console.log(document.getElementById('cas').offsetHeight, document.getElementById('cas').offsetWidth);


    }, [width, height, onResize, compID]);

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

        //Connect each sensor to the topic
        passedComp.sensorSelected.forEach((s, index) => {
            arrayMessages.push(0);
            console.log('%c Connecting to the topic: ' + "H2polito/" + s.topicName, 'color: orange');
            client.subscribe("H2polito/" + s.topicName, {});
            if (topicName == "Messaging"){
                carSelected = s.topicName;
            }
            
            //console.log(carSelected)
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
            if (message.payloadString)
                if (('H2polito/' + sensor.topicName) == message.destinationName) {
                    if (sensor.topicName == "Idra/Position") {
                        //do stuff for the GNSS sensor
                        let lat = parseFloat(message.payloadString.split(';')[0]);
                        let lng = parseFloat(message.payloadString.split(';')[1]);
                        setPosition([lat, lng])
                        console.log(sensor.topicName)
                    }else if (sensor.topicName == "Idra/Messaging") {
                        //do stuff for the GNSS sensor
                        let lat = parseFloat(message.payloadString.split(';')[0]);
                        let lng = parseFloat(message.payloadString.split(';')[1]);
                        setPosition([lat, lng])
                    }
                    else {
                        //added condition to protect crashes due to strings sent to the channels
                        if (Number.isNaN(parseInt(message.payloadString))) {
                            console.error("Got a string on channel " + message.destinationName)
                        } else {
                            arrayMessages[index] = JSON.parse(message.payloadString);
                        }
                    }

                }
        });
        setVal([...arrayMessages]);
    }

    function onFailureConnect() {
        console.error("Connection failed from " + topicName);
        setConnected(false);
    }

    useEffect(() => {

        const handleResize = () => {
            if (parentRef.current) {
                //console.log(parentRef.current.offsetHeight, parentRef.current.offsetWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
    }, [parentRef])


    //Called once when the component is mounted
    useEffect(() => {
        _init();

        //Return called when the component will unmount
        return () => {
            passedComp.sensorSelected.map((s, index) => {
                console.log('Unsubscribing ' + "H2polito/" + s.topicName);
                try {
                    console.log("Unsubscribe went well")
                    client.unsubscribe("H2polito/" + s.topicName, {}); 
                } catch (InvalidState) {
                    console.log("Error unsubscribing")
                }
                return
            })
            try {
                client.disconnect();
            }
            catch (InvalidState) {
                console.log("Error disconnect")
            }
        }
    }, []);



    return (
        <div className="card dashboardElement" id="cas">
            {window.location.pathname == "/" &&
                <div className="card-header handle">
                    <span className="cards-title">{passedComp.sensorSelected[0].topicName.split('/')[0]} </span>
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
                                <span key={index}>{s.sensorName} {val[index]} | </span>
                            )
                            )}
                        </span>
                    }

                    <span>

                        <button type="button" className="float-right" aria-label="Close" onClick={() => onDelete(passedComp)}><IoClose size={20} style={style1} /></button>
                        <button type="button" className="float-right" onClick={() => _init()}><IoReload size={18} style={style2} /></button>
                    </span>



                </div>}

            <div className="card-body" ref={parentRef} >
                {passedComp.typeComponent == AVAILABLE_COMPONENTS[0].ID &&
                    <div className="basis-full">
                        <SimpleLight key={uuidv4()} value={val} comp={passedComp} />
                    </div>

                }
                {passedComp.typeComponent == AVAILABLE_COMPONENTS[1].ID &&
                    <div className="basis-1/3">
                        <Speedometer value={val} minSpeed={passedComp.cmpMinRange} maxSpeed={passedComp.cmpMaxRange} />
                    </div>
                }
                {passedComp.typeComponent == AVAILABLE_COMPONENTS[2].ID &&
                    <div className="basis-full">
                        <LinearGauge value={val} minVal={passedComp.cmpMinRange} maxVal={passedComp.cmpMaxRange} />
                        <div>{val}</div>
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
                        <LiveMap position={[position[0], position[1]]}></LiveMap>
                    </div>

                }

                {passedComp.typeComponent == AVAILABLE_COMPONENTS[5].ID &&
                    <div className="basis-full" style={{ height: "100%" }}>
                        <LapTimer></LapTimer>
                    </div>
                }

                {passedComp.typeComponent == AVAILABLE_COMPONENTS[6].ID &&
                    <div>
                        <MessageSender car={carSelected}></MessageSender>
                    </div>
                }

                {passedComp.typeComponent == AVAILABLE_COMPONENTS[7].ID &&
                    <div >
                        <UplotLive passedData={val} parentRef={parentRef} sensorList={passedComp.sensorSelected}></UplotLive>
                    </div>
                }

            </div>

        </div >



    )
}
