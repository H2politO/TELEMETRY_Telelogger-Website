import React from "react";
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

enum ComponentType {
    check = 1,
    radialGauge,
    linearGauge,
    plot,
}

interface Props {
    passedComp: ComponentsPage,
}


export const ComponentEncapsulator: React.FC<Props> = ({ passedComp }) => {

    let compSensor: Sensor = JSON.parse(passedComp.sensorSelected.toString());
    if(passedComp.cmpMaxRange==undefined || passedComp.cmpMinRange==undefined){
        passedComp.cmpMinRange=0;
        passedComp.cmpMaxRange=100
    }

    return (
        <div className="dashboardElement">
            {passedComp.typeComponent == ComponentType.check &&
                <div className="dashboardElement">
                    <SimpleLight title={compSensor.ID + ' ' + compSensor.sensorName} status={1} />
                </div>
            }
            {passedComp.typeComponent == ComponentType.radialGauge &&
                <div className="dashboardElement">
                    <Speedometer value={100} minSpeed={passedComp.cmpMinRange} maxSpeed={passedComp.cmpMaxRange} height="220px" prescaler={passedComp.prescaler} />
                </div>
            }
            {passedComp.typeComponent == ComponentType.linearGauge &&
                <div className="dashboardElement">
                    <LinearGauge value={60} minVal={passedComp.cmpMinRange} maxVal={passedComp.cmpMaxRange} />
                </div>
            }
            {passedComp.typeComponent == ComponentType.plot &&
                <div className="basis-full">
                    <LiveGraph data={0} height="300px" speedHistory={0} rpmHistory={0} crankHistory={0} launchStateHistory={0} mapHistory={0} />
                </div>
            }
            <p>{compSensor.ID} {compSensor.sensorName}</p>
        </div>

    )
}
