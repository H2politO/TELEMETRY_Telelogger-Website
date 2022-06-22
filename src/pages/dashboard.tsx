import React, { useState, useEffect } from 'react';
import '../App.css';
import '../index.css';
import Speedometer from "../components/Speedometer";
import Tachometer from '../components/Tachometer';
import LinearGauge from "../components/LinearGauge";
import ThrottlePressure from "../components/ThrottlePressure";
import SimpleLight from "../components/SimpleLight";
import Paho from 'paho-mqtt';
import { ComponentEncapsulator } from '../components/componentEncapsulator';
import { ComponentsPage } from '../models/componentsPage';
import { updateStatement } from 'typescript';

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

type Props = {
    compPageList: ComponentsPage[];
    onLayoutChange?: () => (void),
};


export const Dashboard: React.FC<Props> = ({ compPageList, onLayoutChange }) => {

    const [loadTime, setLoadTime] = useState(Math.round((new Date()).getTime() / 1000));
    //const [graphData, setGraphData] = useState<Data>(new Data(loadTime));

    const [components, setcompPageList] = useState(compPageList);
    const [cookiesComponent, setCookies] = useState(compPageList);

    const deleteComponent = (cmpToDlt: ComponentsPage) => {
        console.log('Deleting ');
        let ind = compPageList.findIndex((cmp) => {
            return cmp === cmpToDlt;
        })
        setcompPageList(compPageList.splice(ind, 1));
        console.log(components);
        //update cookies
        setCookies(compPageList);
    }

    useEffect(() => {
        setcompPageList(compPageList);
        setCookies(compPageList);
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
            {/*
            <div className="dashboardContainer flex flex-row flex-wrap ">
             */}
            {components.map((comp: ComponentsPage, index) => (
                <div key={index} data-grid={{ x: index*2, y: index*2, w: 6, h: 7 }}>
                    <ComponentEncapsulator passedComp={comp} onDelete={deleteComponent}></ComponentEncapsulator>
                </div>

            )
            )}
            {//</div>
            }
        </ReactGridLayout >
    )

}

export default Dashboard