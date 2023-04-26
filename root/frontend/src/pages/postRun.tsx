
import { useEffect, useRef, useState } from "react";
import '../App.css'
//import { Timeline } from "vis-timeline/standalone";

import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';

import 'leaflet';
import 'leaflet-draw';
import 'leaflet-realtime'

import { GeoJsonObject } from "geojson";
import 'leaflet-gpx'
declare const L: any


import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

import 'leaflet';

export const PostRun = (props) => {

    const [dataArray, setDataArray] = useState([]);
    const [timeData, setTimeDataArray] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [dataWheel, setDataWheel] = useState([]);
    const [dataVoltage, setDataVoltage] = useState([]);
    const [dataSpeed, setDataSpeed] = useState([]);
    const [dataCurrents, setDataCurrents] = useState([]);
    const [trackPoints, setTrackPoints] = useState(undefined)

    const plotRefWheel = useRef();
    const plotRefVoltage = useRef();
    const plotRefCurrents = useRef();
    const plotRefSpeed = useRef();

    let map: any;
    let m: any

    /*
    useEffect(() => {
        if (timeData.length != 0) {
            const container = document.getElementById('mytimeline');
            if (!container) return; // Return early if element not found

            console.log(timeData)
            const options = {};
            const timeline = new Timeline(container, timeData, options);
            return () => {
                timeline.destroy();
            }

        }

    }, [timeData]);*/


    useEffect(() => {
        new uPlot(optsWheel, dataWheel, plotRefWheel.current)
    }, [dataWheel])

    useEffect(() => {
        new uPlot(optsVoltage, dataVoltage, plotRefVoltage.current)
    }, [dataVoltage])

    useEffect(() => {
        new uPlot(optsCurrents, dataCurrents, plotRefCurrents.current)
    }, [dataCurrents])

    useEffect(() => {
        new uPlot(optsSpeed, dataSpeed, plotRefSpeed.current)
        console.log(dataSpeed)
        if (dataSpeed.length != 0)
            setIsFilePicked(true)
    }, [dataSpeed])

    /*
    useEffect(() => {

        console.log(trackPoints)
        console.log(map)

        if (trackPoints != undefined) {
            let loadedGeoJSON = {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "LineString",
                            "coordinates":
                                trackPoints
                        }
                    }]
            }

            if (m != undefined) {
                m.remove()
            }

            m = L.geoJSON(loadedGeoJSON).addTo(map).setStyle({ color: 'red', weight: 4 });
        }

    }, [trackPoints])*/

    /*
    useEffect(() => {
        console.log('Creating map')
        map = L.map('circuitMap',
        ).setView([
            0, 0
        ], 0);

        map = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        console.log(map)
        
    }, [])*/




    const fileInsertion = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        const reader = new FileReader();
        reader.onload = async (e) => {

            let lines = reader.result.toString().split("\n");
            var headers = lines[0].replace("\r", "").split(";");
            console.log(headers)
            var result = [];

            //Looping inside file until it reaches the end of it
            for (var i = 1; i < lines.length - 1; i++) {

                var obj = {};
                var currentline = lines[i].split(";");

                //For each line, scan through it and save the data
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = parseFloat(currentline[j])
                }
                result.push(obj);
            }
            //setTimeDataArray(result.map((x, ind) => { return { id: ind, start: x["TIME"] } }))
            //console.log(result.map((x, ind) => { return { y: x["PURGE"], label: ind /1000 } }))
            setDataArray([...result])

            setDataWheel([result.map((x, ind) => ind),
            result.map((x) => x["PURGE"]),
            result.map((x) => x["SHORT"]),
            result.map((x) => x["ACTON"]),
            result.map((x) => x["MOTORON"]),
            result.map((x) => x["POWERMODE"]),
            result.map((x) => x["INTEME"]),
            result.map((x) => x["EXTEME"]),
            result.map((x) => x["DEAEME"]),
            ])

            setDataVoltage([result.map((x, ind) => ind),
            result.map((x) => x["VOLTFC"]),
            result.map((x) => x["VOLTSC"]),
            ])

            setDataCurrents([result.map((x, ind) => ind),
            result.map((x) => x["MOTORCURRENT"]),
            result.map((x) => x["STARTEGY"]),
            ])

            setDataSpeed([result.map((x, ind) => ind),
            result.map((x) => x["SPEED"]),
            ])

            /*setTrackPoints(result.map((p) => {
                return [parseFloat(p["LATITUDE"]), parseFloat(p["LONGITUDE"])]
            }))
            setTrackPoints([[-105, 40], [-110, 45], [-115, 55]])*/
        }

        console.log(event.target.files[0].name)
        //setIsFilePicked(true)
        reader.readAsText(event.target.files[0])

    };


    const optsWheel = {
        title: "Wheel & Emergencies",
        width: 1400,
        height: 200,
        series: [
            {
            },
            {
                label: "Purge",
                stroke: "violet"
            },
            {
                label: "Short",
                stroke: "blue"
            },
            {
                label: "Acton",
                stroke: "cyan"
            },
            {
                label: "Motor On",
                stroke: "orange"
            },
            {
                label: "Powermode On",
                stroke: "yellow"
            },
            {
                label: "Internal Emergency",
                stroke: "red"
            },
            {
                label: "External Emergency",
                stroke: "red"
            },
            {
                label: "Deadman Emergency",
                stroke: "red"
            },
            //to add h2 emergency
        ],
        cursor: {
            sync: {
                key: 'synch',
            },
        },
    };

    const optsVoltage = {
        title: "Fuel Cell and Supercap voltage",
        width: 1400,
        height: 300,
        series: [
            {
            },
            {
                label: "Fuel Cell Voltage",
                stroke: "violet"
            },
            {
                label: "Supercap Voltage",
                stroke: "blue"
            }
        ],
        cursor: {
            sync: {
                key: 'synch',
            },
        },
    };

    const optsCurrents = {
        title: "Motor current and strategy",
        width: 1400,
        height: 300,
        series: [
            {
            },
            {
                label: "Motor current",
                stroke: "green"
            },
            {
                label: "Strategy",
                stroke: "brown"
            }
        ],
        cursor: {
            sync: {
                key: 'synch',
            },
        },
    };

    const optsSpeed = {
        title: "Speed",
        width: 1400,
        height: 300,
        series: [
            {
            },
            {
                label: "Speed",
                stroke: "red"
            }
        ],
        cursor: {
            sync: {
                key: 'synch',
            },
        },
    };




    return (
        <div className="bg-gray-800">

            {!isFilePicked &&
                <input type="file" name="file" onChange={fileInsertion} />
            }


            {/*<div id="circuitMap"></div>*/
            }
            {isFilePicked &&
                <div>

                    <div className="bg-gray-400" ref={plotRefWheel} key={'a'}></div>
                    <div className="bg-gray-400" ref={plotRefVoltage} key={'b'}></div>
                    <div className="bg-gray-400" ref={plotRefCurrents} key={'c'}></div>
                    <div className="bg-gray-400" ref={plotRefSpeed} key={'d'}></div>

                </div>
            }



        </div>
    )
}