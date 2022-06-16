import React, { useEffect } from "react";
import { useState } from "react";
import '../App.css';
import '../index.css';
import Speedometer from "../components/Speedometer";
import Tachometer from '../components/Tachometer';
import LinearGauge from "../components/LinearGauge";
import ThrottlePressure from "../components/ThrottlePressure";
import SimpleLight from "../components/SimpleLight";
import LiveGraph from "../components/LiveGraph";
import { DataItem, Data } from '../components/LiveGraph/data';
import { ComponentsPage } from '../models/componentsPage'
import { Sensor } from "../models/sensor";
import { IoReload, IoClose} from "react-icons/io5";
import Paho from 'paho-mqtt';
import { CastConnected } from "@material-ui/icons";
import LiveGraph2 from "../components/LiveGraph2";
import { useRef } from "react";

enum ComponentType {
    check = 1,
    radialGauge,
    linearGauge,
    plot,
    throttlePressure,
}

interface Props {
    passedComp: ComponentsPage,
    onDelete: any
}



export const ComponentEncapsulator: React.FC<Props> = ({ passedComp, onDelete }) => {

    const style1 = { color: "red"};
    const style2 = { color: "black"};
    const [val, setVal] = useState();
    const [isConnected, setConnected] = useState(false);

    let sens: Sensor = passedComp.sensorSelected[0];
    //let mine = JSON.parse(sens.toString());

    //let mqttClientId: string = 'h2politoTest' + mine.ID
    let client: any;

    //new client
    const _init = () => {
        console.log('Creating a client for ' + sens.sensorName + ' and starting the connection');
        client = new Paho.Client("broker.mqttdashboard.com", Number(8000), "/mqtt", sens.sensorName! + new Date().getTime());
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client.connect({ onSuccess: onConnect, onFailure: onFailureConnect });
    }


    // called when the client connects
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        if (client == undefined) {
            console.log('Client undefined');
        }
        client.subscribe("H2polito/" + sens.topicName, {});
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
        console.log('Log messaggio from' + sens.sensorName)
        console.log(message);
        let prov = JSON.parse(message.payloadString);
        setVal(parseInt(prov));
        console.log(prov);
    }

    function onFailureConnect() {
        console.log("Connection failed from " + sens.sensorName);
        setConnected(false);
    }

    useEffect(() => {
        _init();
      }, []);

    return (
        <div className="card flex-auto dashboardElement">
            <div className="card-header bg-transparent">
                <span className="cards-title">{passedComp.nameComponent}</span>
                <button type="button" className="float-right" aria-label="Close" onClick={() => onDelete(passedComp)}><IoClose size={20} style={style1}/></button>
                <button type="button" className="float-right" onClick={() => _init()}><IoReload size={20} style={style2}/></button>
            </div>

            <div className="card-body">
                {passedComp.typeComponent == ComponentType.check &&
                    <div className="">
                        <SimpleLight value={Boolean(JSON.parse(val.toString()))} name={passedComp.nameComponent!} />
                    </div>
                }
                {passedComp.typeComponent == ComponentType.radialGauge &&
                    <div className="basis-1/3">
                        <Speedometer value={val} minSpeed={passedComp.cmpMinRange} maxSpeed={passedComp.cmpMaxRange} prescaler={passedComp.prescaler} />
                    </div>
                }
                {passedComp.typeComponent == ComponentType.linearGauge &&
                    <div className="basis-full">
                        <LinearGauge value={val} minVal={passedComp.cmpMinRange} maxVal={passedComp.cmpMaxRange} />
                    </div>
                }

                {passedComp.typeComponent == ComponentType.plot &&
                    <div className="basis-full">
                        <LiveGraph2 passedData={val} minVal={passedComp.cmpMinRange} sensorList={passedComp.sensorSelected} id={passedComp.sensorSelected[0].ID} maxVal={passedComp.cmpMaxRange}/>
                    </div>
                }


                {passedComp.typeComponent == ComponentType.throttlePressure &&
                    <div className="basis-full">
                        {passedComp.cmpMinRange}
                        {passedComp.cmpMaxRange}
                        <ThrottlePressure value={val} minVal={passedComp.cmpMinRange} maxVal={passedComp.cmpMaxRange} />
                    </div>
                }

            </div>
            <br />
            {isConnected == false &&
                <div style={{ display: "block" }} className="card-footer bg-red-200">
                    {sens.ID} - {sens.sensorName}
                </div>
            }
            {isConnected == true &&
                <div style={{ display: "block" }} className="card-footer bg-green-200">
                    {sens.ID} - {sens.sensorName}
                </div>
            }

        </div >

        

    )
}
