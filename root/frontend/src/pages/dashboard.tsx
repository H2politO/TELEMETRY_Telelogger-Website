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

export const Dashboard: React.FC<Props> = ({ compPageList }) => {

    const [components, setcompPageList] = useState(compPageList);
    let cookie = new Cookies();
    let myList = compPageList;


    //Function used to delete the passed components
    const deleteComponent = (cmpToDlt: ComponentsPage) => {
        console.log('Deleting ');
        let ind = compPageList.findIndex((cmp) => {
            return cmp === cmpToDlt;
        })

        console.log(ind)

        myList = compPageList;

        console.log(myList)
        setcompPageList(compPageList.splice(ind, 1));

    }

    //On each change of the page, set new cookies
    useEffect(() => {
        setcompPageList(myList);
        //Set age of the cookies to 1 year (60 seconds * 60 minutes * 24 hours * 365 days)
        cookie.set('compPage', myList, {maxAge: 60*60*24*365});
    })


    return (
        <div>

            <ReactGridLayout
                rowHeight={50}
                cols={12}
                compactType="vertical"
                draggableHandle='.handle'
            >
                {components.map((comp: ComponentsPage, index) => (
                    <div key={comp.compID} data-grid={{ x: 0, y: 0, w: comp.w, h: comp.h }}>
                            <ComponentEncapsulator passedComp={comp} onDelete={deleteComponent} ></ComponentEncapsulator>
                        </div>
                ))}
            </ReactGridLayout >
        </div>
    )

}

export default Dashboard