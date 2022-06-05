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
<<<<<<< Updated upstream
    passedComp: ComponentsPage
=======
    passedComp: ComponentsPage,
    compCode: number;
>>>>>>> Stashed changes
}


export const ComponentEncapsulator: React.FC<Props> = ({ passedComp, compCode }) => {

    function deleteItself(){
        passedComp.deleted=true;
        console.log(passedComp.deleted);
    }



    return (
<<<<<<< Updated upstream
        <div className="dashboardElement">
            <p>{passedComp.nameComponent}</p>
            <p>{passedComp.sensorSelected.ID}</p>
            {/*<div>{JSON.stringify(passedComp)}</div>*/
            }
            {passedComp.typeComponent == ComponentType.check &&
                <div className="dashboardElement">
                    <SimpleLight title={passedComp.sensorSelected?.ID} status={1} />
=======
        <div className="">
            <div>{passedComp.nameComponent}</div>
            {passedComp.typeComponent == ComponentType.check &&
                <div className="basis-1/3">
                    <SimpleLight title={compSensor.ID + ' ' + compSensor.sensorName} status={1} />
>>>>>>> Stashed changes
                </div>
            }
            {passedComp.typeComponent == ComponentType.radialGauge &&
                <div className="basis-1/3">
                    <Speedometer value={100} minSpeed={passedComp.cmpMinRange} maxSpeed={passedComp.cmpMaxRange} height="220px" prescaler={passedComp.prescaler} />
                </div>
            }
            {passedComp.typeComponent == ComponentType.linearGauge &&
<<<<<<< Updated upstream
                <div className="dashboardElement">
                    <LinearGauge value={60} />
                </div>
            }
=======
                <div className="basis-1/3">
                    <LinearGauge value={60} minVal={passedComp.cmpMinRange} maxVal={passedComp.cmpMaxRange} />
                </div>
            }
            {passedComp.typeComponent == ComponentType.plot &&
                <div className="basis-full">
                    <LiveGraph data={0} height="300px" speedHistory={0} rpmHistory={0} crankHistory={0} launchStateHistory={0} mapHistory={0} />
                </div>
            }
            <button onClick={deleteItself}>Delete component</button>
            <div>{passedComp.deleted.toString()}</div> 
            <p>{compSensor.ID} {compSensor.sensorName}</p>
>>>>>>> Stashed changes
        </div>

    )
}
