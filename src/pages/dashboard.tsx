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

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

type Props = {
    compPageList: ComponentsPage[];
    onLayoutChange?: () => (void),
    useMountEffect?: () => (void)
};

const cmpType: ComponentTypeEncapsulator[] = [
    { compType: ComponentType.check, w: 3, h: 3 },
    { compType: ComponentType.radialGauge, w: 3, h: 8 },
    { compType: ComponentType.linearGauge, w: 6, h: 6 },
    { compType: ComponentType.plot, w: 5, h: 10 },
    { compType: ComponentType.throttlePressure, w: 6, h: 6 },
]

export const Dashboard: React.FC<Props> = ({ compPageList, onLayoutChange }) => {

    const [components, setcompPageList] = useState(compPageList);
    let cookie = new Cookies();

    const deleteComponent = (cmpToDlt: ComponentsPage) => {
        console.log('Deleting ');
        let ind = compPageList.findIndex((cmp) => {
            return cmp === cmpToDlt;
        })
        
        setcompPageList(compPageList.splice(ind, 1));
        //cookie.set('compPage', components);
        //console.log('Cookies after delete', cookie.get('compPage'));
        console.log(components);

        //update cookies
    }

    useEffect(() => {

        setcompPageList(compPageList);
        //cookie.set('compPage', components);
        //console.log('Cookies A', cookie.get('compPage'));
    })

    var Components = ["div"];
    let compCode = 0;

    return (
        <ReactGridLayout
            onLayoutChange={onLayoutChange}
            rowHeight={50}
            cols={12}
            className="layout"
        >
            {components.map((comp: ComponentsPage, index) => (
                <div key={index} data-grid={{ x: 0, y: 0, w: cmpType[comp.typeComponent - 1].w, h: cmpType[comp.typeComponent - 1].h }}>
                    <ComponentEncapsulator passedComp={comp} onDelete={deleteComponent}></ComponentEncapsulator>
                </div>

            )
            )}
        </ReactGridLayout >
    )

}

export default Dashboard