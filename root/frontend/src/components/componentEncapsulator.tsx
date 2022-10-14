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
import { CastConnected, Check, Message } from "@material-ui/icons";
import LiveGraph2 from "../components/LiveGraph2";
import { LiveGraph3 } from "../components/LiveGraph3";
import { useRef } from "react";
import { LiveGraph } from "./LiveGraph/livegraph";
import { LiveMap } from "./LiveMap";
import { ComponentTypeEncapsulator } from "../models/componentType";
import { LapTimer } from "./LapTimer"
import { MessageSender } from "./messageSender";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { SensorList } from "./Sidebar/sensorsList";
import { components } from "react-select";

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
    const [isConnected, setConnected] = useState(false);

    let sens: Sensor = passedComp.sensorSelected[0];

    let arrayMessages: number[] = [];
    let client = new Paho.Client("broker.mqttdashboard.com", Number(8000), "/mqtt", sens.sensorName! + new Date().getTime());

    //Creation a client with a list of sensors
    const _init = () => {
        
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client.connect({ onSuccess: onConnect, onFailure: onFailureConnect });
    }


    // Function called when the client manages to connect to the topic
    function onConnect() {

        console.group('%c Creating a client for the following sensors:'+ passedComp.sensorSelected.map(e => {
            return ' ' + String(e.sensorName)
        }), 'color: lightblue; font-weight: bold; font-size: 15px' );

        if (client == undefined) {
            console.log('Client undefined');
        }

        passedComp.sensorSelected.forEach((s, index) => {
            arrayMessages.push(0);
            console.log('%c Connecting to the topic: ' + s.topicName, 'color: orange');
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

        console.log('Message arrived on destination: ' + message.destinationName);

        //Finds the matching payload that with the string "H2polito/" + sensor name
        passedComp.sensorSelected.forEach((sensor, index) => {
            if (('H2polito/' + sensor.topicName) == message.destinationName) {
                arrayMessages[index] = JSON.parse(message.payloadString);
                console.log(sensor.topicName + ' ' + arrayMessages[index]);
            }

        });

        setSingleVal(arrayMessages[0])
        setVal(arrayMessages);
    }

    function onFailureConnect() {
        console.error("Connection failed from " + sens.sensorName);
        setConnected(false);
    }

    const sendData = msg => {

        console.log('Sending the following message: ' + msg);
        let newMsg = new Paho.Message(msg);
        newMsg.destinationName = 'H2polito/Messaginggg';
        client.send(newMsg);

    }


    //Called once when the component is mounted
    useEffect(() => {
        _init();

        //Return called when the component will unmount
        return () => {
            passedComp.sensorSelected.map((s, index) => {
                console.log('Unsubscribing ' + "H2polito/" + s.topicName);
                client.unsubscribe("H2polito/" + s.topicName, {});
                return
            })
            client.disconnect();
            
        }
    }, []);

    return (
        <div className="card dashboardElement">
            <div className="card-header bg-transparent">
                <span className="cards-title">{passedComp.nameComponent}</span>
                <button type="button" className="float-right" aria-label="Close" onClick={() => onDelete(passedComp)}><IoClose size={20} style={style1} /></button>
                <button type="button" className="float-right" onClick={() => _init()}><IoReload size={20} style={style2} /></button>
            </div>

            <div className="card-body">
                {passedComp.typeComponent == ComponentType.check &&
                    <div className="">
                        <SimpleLight value={singleVal} name={passedComp.nameComponent!} />
                    </div>
                }
                {passedComp.typeComponent == ComponentType.radialGauge &&
                    <div className="basis-1/3">
                        <Speedometer value={singleVal} minSpeed={passedComp.cmpMinRange} maxSpeed={passedComp.cmpMaxRange} />
                    </div>
                }
                {passedComp.typeComponent == ComponentType.linearGauge &&
                    <div className="basis-full">
                        <LinearGauge value={singleVal} minVal={passedComp.cmpMinRange} maxVal={passedComp.cmpMaxRange} />
                    </div>
                }

                {passedComp.typeComponent == ComponentType.plot &&
                    <div className="basis-full" >
                        <LiveGraph2 passedData={val} minVal={passedComp.cmpMinRange} sensorList={passedComp.sensorSelected} id={passedComp.compID} maxVal={passedComp.cmpMaxRange}/>
                    </div>
                }

                {/*passedComp.typeComponent == ComponentType.throttlePressure &&
                    <div className="basis-full">
                        {passedComp.cmpMinRange}
                        {passedComp.cmpMaxRange}
                        <ThrottlePressure value={singleVal} minVal={passedComp.cmpMinRange} maxVal={passedComp.cmpMaxRange} />
                    </div>
            */}

                {passedComp.typeComponent == ComponentType.circuitMap &&
                    <div className="basis-full" style={{ height: "100%" }}>
                        <LiveMap ></LiveMap>
                    </div>

                }

                {passedComp.typeComponent == ComponentType.lapTimer &&
                    <div className="basis-full" style={{ height: "100%" }}>
                        <LapTimer></LapTimer>
                    </div>
                }

                {passedComp.typeComponent == ComponentType.messageSender &&
                    <div>
                        <MessageSender sendData={sendData}></MessageSender>
                    </div>
                }



            </div>
            <br />
            {isConnected == false &&
                <div style={{ display: "block" }} className="card-footer bg-red-200">
                    {passedComp.sensorSelected.map((s: Sensor, index) => (
                        <div key={index}>{s.ID} - {s.sensorName}</div>
                    )
                    )}

                </div>
            }
            {isConnected == true &&
                <div style={{ display: "block" }} className="card-footer bg-green-200">
                    {passedComp.sensorSelected.map((s: Sensor, index) => (
                        <div key={index}>{s.ID} - {s.sensorName}</div>
                    )
                    )}
                </div>
            }

        </div >



    )
}
