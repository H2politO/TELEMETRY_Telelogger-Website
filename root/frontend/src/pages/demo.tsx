import React from "react"
import { ComponentsPage } from "../models/componentsPage"
import { ComponentEncapsulator } from "../components/componentEncapsulator"
import RGL, { WidthProvider } from "react-grid-layout";


const ReactGridLayout = WidthProvider(RGL);

export const Demo = () => {


    const components = [
        { "compID": 1, "nameComponent": "", "typeComponent": 3, "cmpMinRange": 0, "cmpMaxRange": 100, "sensorSelected": [{ "ID": "1", "topicName": "Speed", "sensorName": "Speed", "minValue": 1, "maxValue": 100 }], "prescaler": 1, "deleted": false, "value": 0, "w": 6, "h": 6 },
        { "compID": 2, "nameComponent": "", "typeComponent": 3, "cmpMinRange": 0, "cmpMaxRange": 100, "sensorSelected": [{ "ID": "2", "topicName": "Speed", "sensorName": "Speed", "minValue": 1, "maxValue": 100 }], "prescaler": 1, "deleted": false, "value": 0, "w": 6, "h": 6 },
        { "compID": 3, "nameComponent": "Velocitá", "typeComponent": 2, "cmpMinRange": 0, "cmpMaxRange": 40, "sensorSelected": [{ "ID": "3", "topicName": "Speed", "sensorName": "Speed", "minValue": 1, "maxValue": 40 }], "prescaler": 1, "deleted": false, "value": 0, "w": 3, "h": 6 },
        { "compID": 4, "nameComponent": "Strategia", "typeComponent": 4, "cmpMinRange": 0, "cmpMaxRange": 40, "sensorSelected": [{ "ID": "4", "topicName": "Strategy", "sensorName": "Strategy", "minValue": 1, "maxValue": 40 }], "prescaler": 1, "deleted": false, "value": 0, "w": 5, "h": 9 }
    ]

    return (
        <div>

            <ReactGridLayout
                rowHeight={50}
                cols={12}
                className="layout"
            >
                {components.map((comp, index) => (
                    <div key={comp.compID} data-grid={{ x: 0, y: 0, w: comp.w, h: comp.h }}>
                        <ComponentEncapsulator passedComp={comp as ComponentsPage} onDelete={null}></ComponentEncapsulator>
                    </div>
                ))}
                {/*
                    <div key={components[0].compID} data-grid={{ x: 0, y: 0, w: components[0].w, h: components[0].h }}>
                        <ComponentEncapsulator passedComp={components[0] as ComponentsPage} onDelete={null}></ComponentEncapsulator></div>
                    
                }
                {
                    <div key={components[1].compID} data-grid={{ x: 3, y: 3, w: components[1].w, h: components[1].h }}>
                    <ComponentEncapsulator passedComp={components[1] as ComponentsPage} onDelete={null}></ComponentEncapsulator></div>
                */}
            </ReactGridLayout >


        </div>
    )
}