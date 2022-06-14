import React, { useState, useEffect } from 'react';
import '../App.css';
import '../index.css';
import Speedometer from "../components/Speedometer";
import Tachometer from '../components/Tachometer';
import LinearGauge from "../components/LinearGauge";
import ThrottlePressure from "../components/ThrottlePressure";
import SimpleLight from "../components/SimpleLight";
import LiveGraph from "../components/LiveGraph";
import { DataItem, Data } from '../components/LiveGraph/data';

import Paho from 'paho-mqtt';
import { ComponentEncapsulator } from '../components/componentEncapsulator';
import { ComponentsPage } from '../models/componentsPage';
import { updateStatement } from 'typescript';


type Props = {
    compPageList: ComponentsPage[];
}

export const Dashboard: React.FC<Props> = ({ compPageList }) => {

    const [loadTime, setLoadTime] = useState(Math.round((new Date()).getTime() / 1000));
    const [graphData, setGraphData] = useState<Data>(new Data(loadTime));

    const [components, setcompPageList] = useState(compPageList);



    const deleteComponent = (cmpToDlt: ComponentsPage) => {
        console.log('Deleting ');
        let ind = compPageList.findIndex((cmp) => {
            return cmp === cmpToDlt;
        })
        setcompPageList(compPageList.splice(ind, 1));
        console.log(components);
    }

    useEffect(()=>{
        setcompPageList(compPageList);
    })

    var Components = ["div"];
    let compCode = 0;

    return (
        <div>
            <div className="dashboardContainer flex flex-row flex-wrap ">
                {components.map((comp: ComponentsPage) => (
                    <div>
                        <ComponentEncapsulator passedComp={comp} onDelete={deleteComponent}></ComponentEncapsulator>
                    </div>

                )
                )}
            </div>
        </div>
    )

}

export default Dashboard