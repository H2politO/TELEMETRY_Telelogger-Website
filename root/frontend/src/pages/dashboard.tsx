import React, { useState, useEffect } from 'react';
import '../App.css';
import '../index.css';
import Speedometer from "../components/Speedometer";
import Tachometer from '../components/Tachometer';
import LinearGauge from "../components/LinearGauge";
import ThrottlePressure from "../components/ThrottlePressure";
import SimpleLight from "../components/SimpleLight";
import Cookies from "universal-cookie"
import Paho from 'paho-mqtt';
import { ComponentEncapsulator } from '../components/componentEncapsulator';
import { ComponentsPage } from '../models/componentsPage';
import { updateStatement } from 'typescript';
import { ComponentTypeEncapsulator } from '../models/componentType';
import { ComponentType } from '../components/componentEncapsulator';
import { LiveGraph } from '../components/LiveGraph/livegraph';
import { LiveMap } from '../components/LiveMap';

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

type Props = {
    compPageList: ComponentsPage[];
    useMountEffect?: () => (void)
};

export const cmpType: ComponentTypeEncapsulator[] = [
    { compType: ComponentType.check, w: 3, h: 3 },
    { compType: ComponentType.radialGauge, w: 3, h: 8 },
    { compType: ComponentType.linearGauge, w: 6, h: 6 },
    { compType: ComponentType.plot, w: 5, h: 9 },
    { compType: ComponentType.circuitMap, w: 3, h: 9 },
    { compType: ComponentType.lapTimer, w: 3, h: 12 },
    { compType: ComponentType.messageSender, w: 3, h: 12 },
]

export const Dashboard: React.FC<Props> = ({ compPageList }) => {

    const [components, setcompPageList] = useState(compPageList);
    let cookie = new Cookies();
    let myList = compPageList;

    const deleteComponent = (cmpToDlt: ComponentsPage) => {
        console.log('Deleting ');
        let ind = compPageList.findIndex((cmp) => {
            return cmp === cmpToDlt;
        })

        console.log(ind)

        myList = compPageList;
        //myList.splice(ind,1);

        console.log(myList)
        setcompPageList(compPageList.splice(ind, 1));
        //cookie.set('compPage', myList);
        //console.log('Cookies after delete', cookie.get('compPage'));
    }

    useEffect(() => {

        setcompPageList(myList);
        cookie.set('compPage', myList);
        //console.log(cookie.get('compPage'))
        //console.log('Cookies A', cookie.get('compPage'));
    })


    return (
        <div>

            <ReactGridLayout
                rowHeight={50}
                cols={12}
                compactType="vertical"
            >

                {components.map((comp: ComponentsPage, index) => (
                    <div key={comp.compID} data-grid={{ x: 0, y: 0, w: comp.w, h: comp.h }}>
                            <ComponentEncapsulator passedComp={comp} onDelete={deleteComponent}></ComponentEncapsulator>
                        </div>
                ))}
            </ReactGridLayout >
        </div>
    )

}

export default Dashboard