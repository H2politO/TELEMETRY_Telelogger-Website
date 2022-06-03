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

enum ComponentType {
    check = 1,
    radialGauge,
    linearGauge,
    plot,
}

interface Props {
    passedComp: ComponentsPage
}


export const ComponentEncapsulator: React.FC<Props> = ({ passedComp }) => {


    return (
        <div className="dashboardElement">
            <p>{passedComp.nameComponent}</p>
            <p>{passedComp.sensorSelected.ID}</p>
            {/*<div>{JSON.stringify(passedComp)}</div>*/
            }
            {passedComp.typeComponent == ComponentType.check &&
                <div className="dashboardElement">
                    <SimpleLight title={passedComp.sensorSelected?.ID} status={1} />
                </div>
            }
            {passedComp.typeComponent == ComponentType.radialGauge &&
                <div className="dashboardElement">
                    <Speedometer value={100} minSpeed={passedComp.cmpMinRange} maxSpeed={passedComp.cmpMaxRange} height="220px" prescaler={passedComp.prescaler} />
                </div>
            }
            {passedComp.typeComponent == ComponentType.linearGauge &&
                <div className="dashboardElement">
                    <LinearGauge value={60} />
                </div>
            }
        </div>

    )
}
