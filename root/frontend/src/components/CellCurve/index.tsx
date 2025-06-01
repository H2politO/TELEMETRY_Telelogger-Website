//@ts-nocheck
import React, { useRef, createRef, useEffect, useState } from "react";
import { Sensor } from "../../models/sensor";
import { useLayoutEffect } from "react";
import uPlot from "uplot";
import { Height } from "@mui/icons-material";
import { height } from "@mui/system";
import { Button } from "@mui/material";
import Paho from "paho-mqtt";

//test vars for resizing


const doFileUpload = createRef<HTMLInputElement>();
let voltData:Float = [];
let currData:Float = [];

const fcVTopic = "H2politO/Idra/dcdcInVolt";
const fcITopic = "H2politO/Idra/dcdcInCurr";

function findClosest(arr, target) {
    let res = arr[0];
    let iOut = 0;
    for (let i = 1; i < arr.length; i++) {
      
        // update the result if we find a closer element.
        if (Math.abs(arr[i] - target) <= Math.abs(res - target)) {
            res = arr[i];
            iOut = i;
        }
    }
    return iOut;
}

export const CellCurve = (passedData) => {
    const timestamp = useRef(0);
    const [newVData, setNewVData] = useState();
    const [cellVData, setCellVData] = useState(); 
    const [cellIData, setCellIData] = useState(); 
    const [perf, setPerf] = useState(0);

    let testHeight;
    let testWidth;

    let client = new Paho.Client(
        "31.97.32.141",
        Number(9001),
        "/mqtt"
      );

    const colors = [
        "red",
        "blue",
        "lightblue",
        "green",
        "Orange",
        "black",
        "brown",
    ];

    const plot = useRef();

    const opts = {
        id: Math.random(),

        series: [
            {},
            {
                label: "Curva Polarizzazione",
                stroke: colors[0],
                width: 2,
            },
            {
                label: "Punto di Lavoro",
                stroke: colors[1],
                width: 5,
            },
        ],

        scales: {
            x: {
                time: false,
                label:"Current (A)",
                labelSize: 10,
            },

            y: {
                label:"Voltage (V)",
                labelSize: 10,
                auto: true,
                range: [
                    0,
                    50,
                ],
            },
        },

        axes: [
            {
                show: true,
                label: "Current (A)",
                labelSize: 30,
            },
            {
                show: true,
                label: "Voltage (V)",
                labelSize: 30,
                labelFont: "bold 12px Arial",
                font: "12px Arial",
                gap: 5,
                size: 50,
                
                grid: {
                    show: true,
                    stroke: "#eee",
                    width: 2,
                    dash: [],
                },
            },
    ]

    };


//on load of the component
useEffect(() => {
    plot.current = new uPlot(opts, [], plot.current);
    client.connect({ onSuccess: onConnect});
   
    console.log(plot.current)
    let lastCurrent = 0;
    let nonZeroIdx = 0;
    client.onMessageArrived = function (message){
        console.log("Recieved Voltage: " + message.destinationName)
        if(message.destinationName == fcITopic){
            lastCurrent = parseFloat(message.payloadString);
            nonZeroIdx = plot.current.valToIdx(lastCurrent);
            console.log("Recieved Current: " + lastCurrent)
        }

        if(message.destinationName == fcVTopic){
            let zeros = new Array(currData.length).fill(NaN);
            zeros[nonZeroIdx] = parseFloat(message.payloadString);
            setNewVData(zeros);
            console.log("Recieved Voltage: zeros[nonZeroIdx]")
            plot.current.setCursor({left: plot.current.valToPos(lastCurrent, "x"), top:plot.current.valToPos(zeros[nonZeroIdx], "y")}, false);
            plot.current.cursor._lock = true;
            setPerf(100 * ((zeros[nonZeroIdx]) / voltData[nonZeroIdx]));
        }
    }
}, []);

function onConnect() {
    client.subscribe(fcITopic);
    client.subscribe(fcVTopic);
    console.log("Connected to MQTT");
}

useEffect(()=>{
    plot.current.setData([cellIData, cellVData, newVData])
}, [newVData]);


const loadData = (file:File) => {
    
    currData = [];
    voltData = [];
  
    if(file == null){
        return;
    }  

    let fileData = new FileReader();
    
    fileData.onloadend = (e) =>{
        if(e.target?.result?.toString() == undefined){
            console.log("Empty File");
            return;
        }
            
        let fileByLines = e.target.result.toString().split("\n");

        for(let i=0; i<fileByLines.length-1; i++){
            
            let record = fileByLines[i].split(",");
            voltData.push(parseFloat(record[3]));
            currData.push(parseFloat(record[2]));
        }

        setCellVData(voltData);
        setCellIData(currData);
        let zeros = new Array(currData.length).fill(NaN);
        setNewVData(zeros);
    }

    fileData.readAsText(file);
}

//Handle resize
useEffect(() => {
    if (plot.current) {
        //if the "window" is resized
        if (
            testHeight != passedData.parentRef.current.offsetHeight - 150 ||
            testWidth != passedData.parentRef.current.offsetWidth - 150
        ) {
            plot.current.setSize({
                height: passedData.parentRef.current.offsetHeight - 150,
                width: passedData.parentRef.current.offsetWidth - 150,
            });
            //sets test vars to the current dimensions of the plot
            testHeight = passedData.parentRef.current.offsetHeight - 150;
            testWidth = passedData.parentRef.current.offsetWidth - 150;
            console.log("Test")
        }
    }
}, [passedData.parentRef.current])
//Debug
useEffect(() => {
    console.log("plot update");
}, [plot]);



return (
    <div>
        <div className="csv-reader">
        <input type="file" accept=".csv" onChange={e =>loadData(e.target.files[0])} id="fileUpButton" ref={doFileUpload}/>
        </div>
        <div ref={plot} key={12}></div>
        Performance: {perf.toFixed(2)} %
    </div>
);

};