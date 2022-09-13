import React from "react"
import { ComponentsPage } from "../models/componentsPage"
import { ComponentEncapsulator } from "../components/componentEncapsulator"
import RGL, { WidthProvider } from "react-grid-layout";


const ReactGridLayout = WidthProvider(RGL);

export const Demo = () => {

    
    const components = [
        { "compID": 1, "nameComponent": "", "typeComponent": 3, "cmpMinRange": 0, "cmpMaxRange": 100, "sensorSelected": [{ "ID": "2", "topicName": "Speed", "sensorName": "Speed", "minValue": 1, "maxValue": 100 }], "prescaler": 1, "deleted": false, "value": 0, "w": 6, "h": 6 },
        { "compID": 2, "nameComponent": "", "typeComponent": 3, "cmpMinRange": 0, "cmpMaxRange": 100, "sensorSelected": [{ "ID": "2", "topicName": "Speed", "sensorName": "Speed", "minValue": 1, "maxValue": 100 }], "prescaler": 1, "deleted": false, "value": 0, "w": 6, "h": 6 }

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
            </ReactGridLayout >


        </div>
    )
}