//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { Sensor } from "../../models/sensor"
import { useLayoutEffect } from "react";
import uPlot from "uplot";

export const UplotLive = (passedData) => {

    const timestamp = useRef(0);
    const [data, setData] = useState([[0], [0]]);
    const [plotHeight, setPlotHeight] = useState(300);

    const maxDataLength = 50;

    const plot = useRef();

    //on load of the component
    useEffect(() => {
        plot.current = new uPlot(opts, data, plot.current);
    }, [])

    useEffect(() => {
        console.log(data)
        if (data != undefined) {
            plot.current.setData([[...data[0], timestamp.current], [...data[1], passedData.passedData[0]]])
        }
    }, [data])

    /*useEffect(() => {
        
        console.log('something prop has changed.')
        if (passedData.passedData[0] != undefined) {
            timestamp++;
            console.log(data)
            setData([[...data[0],timestamp], [...data[1], passedData.passedData[0]]])
        }
    }, [passedData]);*/

    useEffect(() => {
        //console.log(passedData);
        plot.current.height = passedData.parentRef.current.offsetHeight;
        plot.current.width = passedData.parentRef.current.offsetWidth;
        console.log(plot.current.height, plot.current.width)
        //console.log(`Parent height: ${height}, width: ${width}`);
        if (passedData.passedData[0] != undefined) {
            setData((prevData) => {
                let date = new Date()
                timestamp.current= timestamp.current+0.5

                //current_date = date.getMinutes() + "-" + (date.getSeconds())
                const newData = [[...prevData[0], timestamp.current], [...prevData[1], passedData.passedData[0]]];
                if (newData[0].length > maxDataLength) {
                    newData[0] = newData[0].slice(-maxDataLength);
                    newData[1] = newData[1].slice(-maxDataLength);
                }
                return newData;
            });
        }
    }, [passedData]);

    useEffect(() => {
        console.log("plot update")
    }, [plot])


    const opts = {
        id: Math.random(),
        series: [
            {
            },
            {
                label: passedData.sensorList[0].sensorName,
                stroke: "#" + Math.floor(Math.random() * 16777215).toString(16)
            },
        ],

        scales: {
            x: {
                time: false,
            },

            y: {
                auto: false,
                range: [passedData.sensorList[0].minValue, passedData.sensorList[0].maxValue],
            }

        },

    };

    return (
        <div className="bg-gray-200" ref={plot} key={passedData.sensorList[0].ID}></div>
    )
}