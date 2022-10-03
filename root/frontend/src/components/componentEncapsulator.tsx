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
import { CastConnected, Check } from "@material-ui/icons";
import LiveGraph2 from "../components/LiveGraph2";
import { LiveGraph3 } from "../components/LiveGraph3";
import { useRef } from "react";
import { LiveGraph } from "./LiveGraph/livegraph";
import { LiveMap } from "./LiveMap";
import { ComponentTypeEncapsulator } from "../models/componentType";
import { LapTimer } from "./LapTimer"
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { SensorList } from "./Sidebar/sensorsList";

export enum ComponentType {
    check = 1,
    radialGauge,
    linearGauge,
    plot,
    circuitMap,
    lapTimer=6
}


interface Props {
    passedComp: ComponentsPage,
    onDelete: any
}

export const ComponentEncapsulator: React.FC<Props> = ({ passedComp, onDelete }) => {

    const style1 = { color: "red" };
    const style2 = { color: "black" };
    let filler: number[] = [];
    const [val, setVal] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
    const [singleVal, setSingleVal] = useState(0);
    const [isConnected, setConnected] = useState(false);

    let sens: Sensor = passedComp.sensorSelected[0];
    //let mine = JSON.parse(sens.toString());

    let arrayMessages: number[] = [];
    //let mqttClientId: string = 'h2politoTest' + mine.ID
    let client: any;

    //new client
    const _init = () => {
        console.group('%c Creating a client for the following sensors:'+ passedComp.sensorSelected.map(e => {
            return ' ' + String(e.sensorName)
        }), 'color: lightblue; font-weight: bold; font-size: 15px' );
        
        client = new Paho.Client("broker.mqttdashboard.com", Number(8000), "/mqtt", sens.sensorName! + new Date().getTime());
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client.connect({ onSuccess: onConnect, onFailure: onFailureConnect });
    }


    // called when the client connects
    function onConnect() {
        if (client == undefined) {
            console.log('Client undefined');
        }

        passedComp.sensorSelected.forEach((s, index) => {
            arrayMessages.push(0);
            console.log('%c Connecting to the topic: ' + s.topicName, 'color: orange');
            client.subscribe("H2polito/" + s.topicName, {});
        });

        console.groupEnd()
        setSingleVal(0);
        setVal(arrayMessages);

        setConnected(true);
    }


    // called when the client loses its connection
    function onConnectionLost(responseObject: any) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
        setConnected(false);
    }

    // called when a message arrives
    function onMessageArrived(message: any) {

        console.log('Message arrived on destination: ' + message.destinationName);

        passedComp.sensorSelected.forEach((sensor, index) => {
            if (('H2polito/' + sensor.topicName) == message.destinationName) {
                arrayMessages[index] = JSON.parse(message.payloadString);
                //console.log('Index: ' + index)
                console.log(sensor.topicName + ' ' + arrayMessages[index]);
            }

        });

        setSingleVal(JSON.parse(message.payloadString));
        setVal(arrayMessages);
        console.log('Array of messages: ' + val);

    }

    function onFailureConnect() {
        console.log("Connection failed from " + sens.sensorName);
        setConnected(false);
    }


    useEffect(() => {
        _init();
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
                        <SimpleLight value={val[0]} name={passedComp.nameComponent!} />
                    </div>
                }
                {passedComp.typeComponent == ComponentType.radialGauge &&
                    <div className="basis-1/3">
                        <Speedometer value={val[0] * passedComp.prescaler} minSpeed={passedComp.cmpMinRange} maxSpeed={passedComp.cmpMaxRange} />
                    </div>
                }
                {passedComp.typeComponent == ComponentType.linearGauge &&
                    <div className="basis-full">
                        <LinearGauge value={val[0]} minVal={passedComp.cmpMinRange} maxVal={passedComp.cmpMaxRange} />
                    </div>
                }

                {passedComp.typeComponent == ComponentType.plot &&
                    <div className="basis-full" >
                        <LiveGraph2 passedData={val} minVal={passedComp.cmpMinRange} sensorList={passedComp.sensorSelected} id={passedComp.sensorSelected[0].ID} maxVal={passedComp.cmpMaxRange}/>
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



            </div>
            <br />
            {isConnected == false &&
                <div style={{ display: "block" }} className="card-footer bg-red-200">
                    {passedComp.sensorSelected.map((s: Sensor) => (
                        <div>{s.ID} - {s.sensorName}</div>
                    )
                    )}

                </div>
            }
            {isConnected == true &&
                <div style={{ display: "block" }} className="card-footer bg-green-200">
                    {passedComp.sensorSelected.map((s: Sensor) => (
                        <div>{s.ID} - {s.sensorName}</div>
                    )
                    )}
                </div>
            }

        </div >



    )
}
