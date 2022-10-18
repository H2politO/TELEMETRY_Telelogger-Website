import React, { useState } from "react"
import { ComponentsPage } from "../models/componentsPage"
import { ComponentEncapsulator } from "../components/componentEncapsulator"
import RGL, { WidthProvider } from "react-grid-layout";


const ReactGridLayout = WidthProvider(RGL);
//const [layout, setLayout] = useState([])

export const Demo = (onLayoutChange) => {



    const components = [
        { "compID": "1", "nameComponent": "", "typeComponent": 3, "cmpMinRange": 0, "cmpMaxRange": 50, "sensorSelected": [{ "ID": "1", "topicName": "Speed", "sensorName": "Speed", "minValue": 1, "maxValue": 50 }], "prescaler": 1, "deleted": false, "value": 0, "w": 4, "h": 5, "x": 0, "y": 0 },
        { "compID": "2", "nameComponent": "", "typeComponent": 5, "cmpMinRange": 0, "cmpMaxRange": 100, "sensorSelected": [{ "ID": "2", "topicName": "Map", "sensorName": "Speed", "minValue": 1, "maxValue": 100 }], "prescaler": 1, "deleted": false, "value": 0, "w": 2, "h": 8, "x": 10, "y": 0 },
        { "compID": "3", "nameComponent": "Velocitá", "typeComponent": 2, "cmpMinRange": 0, "cmpMaxRange": 40, "sensorSelected": [{ "ID": "3", "topicName": "Speed", "sensorName": "Speed", "minValue": 1, "maxValue": 40 }], "prescaler": 1, "deleted": false, "value": 0, "w": 2, "h": 7, "x": 0, "y": 6 },
        //{ "compID": "4", "nameComponent": "Velocitá", "typeComponent": 4, "cmpMinRange": 0, "cmpMaxRange": 40, "sensorSelected": [{ "ID": "4", "topicName": "Speed", "sensorName": "Speed", "minValue": 1, "maxValue": 40 }], "prescaler": 1, "deleted": false, "value": 0, "w": 4, "h": 9, "x": 4, "y": 0 },
        //{"nameComponent":"","typeComponent":"4","cmpMinRange":0,"cmpMaxRange":100,"sensorSelected":[{"ID":"2","topicName":"Speed","sensorName":"Speed","minValue":1,"maxValue":100}],"prescaler":1,"deleted":false,"value":0,"w":5,"h":9,"compID":"ddb55488-a191-4eda-82d9-8e1c8755cd4a"},
        {"nameComponent":"ASD","typeComponent":4,"cmpMinRange":0,"cmpMaxRange":100,"sensorSelected":[{"ID":"2","topicName":"Speed","sensorName":"Speed","minValue":1,"maxValue":100},{"ID":"3","topicName":"Temperature","sensorName":"Temperature","minValue":1,"maxValue":100},{"ID":"4","topicName":"FCVoltage","sensorName":"Fuel Cell Voltage","minValue":1,"maxValue":100}],"prescaler":1,"deleted":false,"value":0,"w":4,"h":10,"compID":"61200ef3-dc36-4f25-ab8b-42a9e0b9d496", "x": 6, "y": 0 },
        {"nameComponent":"","typeComponent":6,"cmpMinRange":0,"cmpMaxRange":100,"sensorSelected":[{"ID":"13","topicName":"Messaging","sensorName":"Messaging client","minValue":1,"maxValue":100}],"prescaler":1,"deleted":false,"value":0,"w":2,"h":10,"compID":"713b1eb5-3032-44e5-b054-219a022d0e4b", "x": 4, "y": 6}
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