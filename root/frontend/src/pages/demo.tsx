import React, { useState } from "react"
import { ComponentsPage } from "../models/componentsPage"
import { ComponentEncapsulator } from "../components/componentEncapsulator"
import RGL, { WidthProvider } from "react-grid-layout";


const ReactGridLayout = WidthProvider(RGL);
//const [layout, setLayout] = useState([])

export const Demo = (onLayoutChange) => {



    const components = [
        { "compID": "1", "nameComponent": "", "typeComponent": 3, "cmpMinRange": 0, "cmpMaxRange": 100, "sensorSelected": [{ "ID": "1", "topicName": "Speed", "sensorName": "Speed", "minValue": 1, "maxValue": 100 }], "prescaler": 1, "deleted": false, "value": 0, "w": 6, "h": 6, "x": 0, "y": 0 },
        { "compID": "2", "nameComponent": "", "typeComponent": 3, "cmpMinRange": 0, "cmpMaxRange": 100, "sensorSelected": [{ "ID": "2", "topicName": "Speed", "sensorName": "Speed", "minValue": 1, "maxValue": 100 }], "prescaler": 1, "deleted": false, "value": 0, "w": 6, "h": 6, "x": 6, "y": 0 },
        { "compID": "3", "nameComponent": "Velocitá", "typeComponent": 2, "cmpMinRange": 0, "cmpMaxRange": 40, "sensorSelected": [{ "ID": "3", "topicName": "Speed", "sensorName": "Speed", "minValue": 1, "maxValue": 40 }], "prescaler": 1, "deleted": false, "value": 0, "w": 3, "h": 6, "x": 0, "y": 6 },
        { "compID": "4", "nameComponent": "Velocitá", "typeComponent": 4, "cmpMinRange": 0, "cmpMaxRange": 40, "sensorSelected": [{ "ID": "4", "topicName": "Speed", "sensorName": "Speed", "minValue": 1, "maxValue": 40 }], "prescaler": 1, "deleted": false, "value": 0, "w": 5, "h": 9, "x": 6, "y": 6 }
    ]


    /*
    onLayoutChange(layout: any) {
        saveToLS("layout", layout);
        this.setState({ layout });
        this.props.onLayoutChange(layout); // updates status display
      }
    */



    return (
        <div>
            <ReactGridLayout
                rowHeight={50}
                cols={12}
                className="layout"
                margin={[5,5]}
                isDraggable={false}
                isResizable={false}
            >
                {components.map((comp, index) => (
                    <div key={comp.compID} data-grid={{ x: comp.x, y: comp.y, w: comp.w, h: comp.h }} >
                        {<ComponentEncapsulator  passedComp={comp as ComponentsPage} onDelete={null}></ComponentEncapsulator>}
                    </div>
                ))}
            </ReactGridLayout >
        </div>
    )
}