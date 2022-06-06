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
    throttlePressure,
}

interface Props {
    passedComp: ComponentsPage,
    compCode: number;
}


export const ComponentEncapsulator: React.FC<Props> = ({ passedComp, compCode }) => {

    let sens: Sensor = JSON.parse(JSON.stringify(passedComp.sensorSelected));
    let mine = JSON.parse(sens.toString());
    return (
        <div className="card flex-auto dashboardElement">

            <div className="card-header bg-blue-100">
                <span className="cards-title">{passedComp.nameComponent}&nbsp;</span>
                <button type="button" className="float-right" aria-label="Close">&times;</button>
            </div>

            <div className="card-body">
                {passedComp.typeComponent == ComponentType.check &&
                    <div className="">
                        <SimpleLight title={passedComp.sensorSelected.ID + ' ' + passedComp.sensorSelected.sensorName} status={1} />
                    </div>
                }
                {passedComp.typeComponent == ComponentType.radialGauge &&
                    <div className="basis-1/3">
                        <Speedometer value={passedComp.value} minSpeed={passedComp.cmpMinRange} maxSpeed={passedComp.cmpMaxRange} prescaler={passedComp.prescaler} />
                    </div>
                }
                {passedComp.typeComponent == ComponentType.linearGauge &&
                    <div className="basis-full">
                        <LinearGauge value={passedComp.value} minVal={passedComp.cmpMinRange} maxVal={passedComp.cmpMaxRange} />
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
                {mine.ID} - {mine.sensorName}
            </div>

        </div >

    )
}
