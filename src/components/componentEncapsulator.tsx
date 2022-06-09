import React from "react";
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
import { IoReload } from "react-icons/io5";
import Paho from 'paho-mqtt';

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

    const style = { color: "red", fontSize: "1.5em" }
    const [val, setVal] = useState(0);

    let sens: Sensor = passedComp.sensorSelected[0];
    //let mine = JSON.parse(sens.toString());

    //let mqttClientId: string = 'h2politoTest' + mine.ID
    let client: any;

    //new client
    const _init = () => {
        console.log('Creating a client for' + sens.sensorName);
        console.log("Connection Started");
        client = new Paho.Client("broker.hivemq.com", Number(8000), "/mqtt", "myClientId" + new Date().getTime());
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client.connect({ onSuccess: onConnect });
        client.connect({ onSuccess: onConnect, onFailure: onFailureConnect });
    }


    // called when the client connects
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        if (client == undefined) {
            console.log('Client undefined');
        }
        client.subscribe("h2polito" + sens.sensorName, {});
    }


    // called when the client loses its connection
    function onConnectionLost(responseObject: any) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }

    // called when a message arrives
    function onMessageArrived(message: any) {
        console.log('Log messaggio')
        console.log(message);
        let prov = JSON.parse(message.payloadString);
        setVal(parseInt(prov));
        console.log(prov);
    }

    function onFailureConnect() {
        console.log("Connection failedddd");
    }


    return (
        <div className="card flex-auto dashboardElement">

            <div className="card-header bg-transparent">
                <span className="cards-title">{passedComp.nameComponent}&nbsp;</span>
                <button type="button" className="float-right" aria-label="Close" onClick={() => onDelete(passedComp.compID)}>&times;</button>
                <button type="button" aria-label="Subscribe" onClick={() => _init()}><IoReload size={20} style={style} /></button>
            </div>

            {val}

            <div className="card-body">
                {passedComp.typeComponent == ComponentType.check &&
                    <div className="">
                        <SimpleLight title={passedComp.sensorSelected[0].ID + ' ' + passedComp.sensorSelected[0].sensorName} status={val} />
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
                        <LiveGraph data={0} height="300px" speedHistory={0} rpmHistory={0} crankHistory={0} launchStateHistory={0} mapHistory={0} />
                    </div>
                }

                {passedComp.typeComponent == ComponentType.throttlePressure &&
                    <div className="basis-full">
                        <ThrottlePressure value={passedComp.value} />
                    </div>
                }

            </div>
            <br />
            <div style={{ display: "block" }} className="card-footer">
                {sens.ID} - {sens.sensorName}
            </div>

        </div >

    )
}
