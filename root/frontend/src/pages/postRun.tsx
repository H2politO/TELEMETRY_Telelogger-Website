//@ts-nocheck
import { useEffect, useRef, useState } from "react";
import '../App.css'
import car from './carA.png'
//import { Timeline } from "vis-timeline/standalone";

import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';

import 'leaflet-draw';
import 'leaflet-realtime'

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import 'leaflet';
import { log } from "console";

export const PostRun = (props) => {

    const [dataArray, setDataArray] = useState([]);
    const [timeData, setTimeDataArray] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [dataWheelIdra, setDataWheelIdra] = useState([]);
    const [dataVoltage, setDataVoltage] = useState([]);
    const [dataSpeed, setDataSpeed] = useState([]);
    const [dataCurrents, setDataCurrents] = useState([]);
    const [dataAltimetry, setDataAltimetry] = useState([]);
    const [trackPoints, setTrackPoints] = useState(undefined)


    const plotRefWheelIdra = useRef();
    const plotRefVoltage = useRef();
    const plotRefCurrents = useRef();
    const plotRefAltimetry = useRef();
    const plotRefSpeed = useRef();

    let centerLatitude = 0
    let centerLongitude = 0

    let carIcon = L.icon({
        iconUrl: car,
        iconSize: [15, 15]
    })

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
        plotRefWheelIdra.current = new uPlot(optsWheelIdra, dataWheelIdra, plotRefWheelIdra.current);
    }, [dataWheelIdra]);


    useEffect(() => {
        plotRefVoltage.current = new uPlot(optsVoltage, dataVoltage, plotRefVoltage.current)
    }, [dataVoltage])

    useEffect(() => {
        plotRefCurrents.current = new uPlot(optsCurrents, dataCurrents, plotRefCurrents.current)
    }, [dataCurrents])

    useEffect(() => {
        plotRefAltimetry.current = new uPlot(optsAltimetry, dataAltimetry, plotRefAltimetry.current)
    }, [dataAltimetry])

    useEffect(() => {
        plotRefSpeed.current = new uPlot(optsSpeed, dataSpeed, plotRefSpeed.current)

        if (dataSpeed.length != 0)
            setIsFilePicked(true)
    }, [dataSpeed])


    useEffect(() => {

        if (trackPoints != undefined) {

            computeCenter(trackPoints)
            console.log('Creating map')
            const newMap = L.map('mapId').setView([centerLatitude, centerLongitude], 17);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(newMap);

            console.log(trackPoints)
            L.polygon(trackPoints).addTo(newMap)

            m = newMap

            console.log(trackPoints)
            playCar(trackPoints)

        }
        //m = L.geoJSON(loadedGeoJSON).addTo(map).setStyle({ color: 'red', weight: 4 });

    }, [trackPoints])

    //Function listens to resizes of the pages and adapts the graphs width to it
    window.addEventListener("resize", e => {

        if (plotRefWheelIdra.current) {
            plotRefWheelIdra.current.setSize({
                width: window.innerWidth - 100,
                height: 170
            });
        }
        if (plotRefVoltage.current) {
            plotRefVoltage.current.setSize({
                width: window.innerWidth - 100,
                height: 300
            });
        }
        if (plotRefCurrents.current) {
            plotRefCurrents.current.setSize({
                width: window.innerWidth - 100,
                height: 300
            });
        }
        if (plotRefAltimetry.current) {
            plotRefAltimetry.current.setSize({
                width: window.innerWidth - 100,
                height: 300
            });
        }
        if (plotRefSpeed.current) {
            plotRefSpeed.current.setSize({
                width: window.innerWidth - 100,
                height: 300
            });
        }
    });


    function playCar(tp) {
        let i = 0
        let marker = L.marker([tp[i % (tp.length - 1)][0], tp[i % (tp.length - 1)][1]], { icon: carIcon });

        setInterval(() => {
            i++
            marker.remove();

            marker = L.marker([tp[i % (tp.length - 1)][0], tp[i % (tp.length - 1)][1]], { icon: carIcon });

            marker.addTo(m);

            //Enable to follow car
            m.setView([tp[i % (tp.length - 1)][0], tp[i % (tp.length - 1)][1]], 17);

        }, 1)
    }

    const fileInsertion = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        const reader = new FileReader();
        reader.onload = async (e) => {

            let lines = reader.result.toString().split("\n");
            var headers = lines[0].replace("\r", "").split(";");
            console.log(headers)
            var result = [];


            console.log(reader)
            console.log(event.target.files[0])

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

            if (event.target.files[0].name.slice(0, 4) === "IDRA") {
                console.log('idra car')
                setDataWheelIdra([result.map((x, ind) => (x["TIME"] / 1000 / 60)),
                result.map((x) => x["PURGE"]),
                result.map((x) => x["SHORT"]),
                result.map((x) => x["ACTON"]),
                result.map((x) => x["MOTORON"]),
                result.map((x) => x["POWERMODE"]),
                result.map((x) => x["INTEME"]),
                result.map((x) => x["EXTEME"]),
                result.map((x) => x["DEAEME"]),
                result.map((x) => x["H2EME"]),
                ])

                setDataVoltage([result.map((x, ind) => (x["TIME"] / 1000 / 60)),
                result.map((x) => x["VOLTFC"]),
                result.map((x) => x["VOLTSC"]),
                ])

                setDataCurrents([result.map((x, ind) => (x["TIME"] / 1000 / 60)),
                result.map((x) => x["MOTORCURRENT"]),
                result.map((x) => x["STARTEGY"]),
                ])
            }
            else if (event.target.files[0].name.slice(0, 4) === "JUNO") {

            }
            else {
                console.log("wrong file name");
            }

            setDataAltimetry([result.map((x, ind) => (x["TIME"] / 1000 / 60)),
            result.map((x) => x["ALTITUDE"]),
            ])

            setDataSpeed([result.map((x, ind) => (x["TIME"] / 1000 / 60)),
            result.map((x) => x["SPEED"]),
            result.map((x) => x["GPS_SPEED"])
            ])


            setTrackPoints(result.filter(filterNanPoints).map((p) => {
                /*if((p["LONGITUDE"] > 100  || p["LONGITUDE"] < 100 || p["LONGITUDE"].isNaN()) || (p["LATITUDE"] > 100  || p["LATITUDE"] < 100 ||  p["LATITUDE"].isNaN()) ){
                    [45.124500,7.203535]
                }*/
                return [parseFloat(p["LONGITUDE"]), parseFloat(p["LATITUDE"])]
            }))
        }

        console.log(event.target.files[0].name)
        //setIsFilePicked(true)
        reader.readAsText(event.target.files[0])

    };

    function computeCenter(tp) {
        centerLatitude = 0
        centerLongitude = 0
        tp.forEach(p => {
            if (!isNaN(parseFloat(p[0])) && !isNaN(parseFloat(p[1]))) {
                centerLongitude += parseFloat((p[1]));
                centerLatitude += parseFloat((p[0]));
            }
        });

        centerLongitude = centerLongitude / (tp.length);
        centerLatitude = centerLatitude / (tp.length);
    }

    function filterNanPoints(p) {

        //remove error from gps
        if ((p["LONGITUDE"] > 47 || p["LONGITUDE"] < 43 || isNaN(p["LONGITUDE"])) || (p["LATITUDE"] > 8 || p["LATITUDE"] < 6 || isNaN(p["LATITUDE"]))) {
            //console.log(p)
            return [p["LONGITUDE"] = 44, p["LATITUDE"] = 7]
        }

        else {
            return [p["LONGITUDE"], p["LATITUDE"]]
        }
    }

    const optsWheelIdra = {
        title: "Wheel & Emergencies",
        width: window.innerWidth - 100,
        height: 200,
        series: [
            {
                label: "Time",
                //value: (self, rawValue) =>  (Math.floor(rawValue) + "." + rawValue.toString().split('.')[1].charAt(0) +  "min"),
            },
            {
                label: "Purge",
                stroke: "violet",
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
            {
                label: "Hydrogen Emergency",
                stroke: "red"
            }
            //to add h2 emergency
        ],
        cursor: {
            sync: {
                key: 'synch',
            },

            x: {
                color: '#ff0000', // set the color of the vertical line
                width: 1 // set the width of the vertical line
            },
        },

        scales: {
            x: {
                time: false,
            },
            y: {
                auto: false,
                range: [0, 1],
            }

        },
    };

    const optsVoltage = {
        title: "Fuel Cell and Supercap voltage",
        width: window.innerWidth - 100,
        height: 300,
        series: [
            {
                label: "Time",
                //value: (self, rawValue) =>  Math.floor(rawValue) + "." + rawValue.toString().split('.')[1].charAt(0) +  "min",
            },
            {
                label: "Fuel Cell Voltage",
                stroke: "violet",
            },
            {
                label: "Supercap Voltage",
                stroke: "blue"
            },
        ],
        cursor: {
            sync: {
                key: 'synch',
            },
        },

        scales: {
            x: {
                time: false,
            },
            y: {
                auto: false,
                range: [24, 44],
            }

        },
    };

    const optsCurrents = {
        title: "Motor current and strategy",
        width: window.innerWidth - 100,
        height: 300,
        series: [
            {
                label: "Time",

                //value: (self, rawValue) =>  Math.floor(rawValue) + "." + rawValue.toString().split('.')[1].charAt(0) +  "min",
                //value: (self, rawValue) =>  + Math.floor(rawValue) +  "min",
            },
            {
                label: "Motor current",
                stroke: "lightgreen"
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

        scales: {
            x: {
                time: false,
                notch: {
                    size: 4,
                    stroke: "white",
                    width: 10,
                    dash: [],
                    // Set the value where the notch should be drawn
                    // This can be a timestamp for a time series chart or an index for a non-time series chart
                    value: 8055,
                },
            }

        },
    };

    const optsSpeed = {
        title: "Speed",
        width: window.innerWidth - 100,
        height: 300,
        series: [
            {
                label: "Time",
            },
            {
                label: "Sensor Speed",
                stroke: "red"
            },
            {
                label: "Gps Speed",
                stroke: "grey"
            }
        ],
        cursor: {
            sync: {
                key: 'synch',
            },
        },
        scales: {
            x: {
                time: false,
            },
            y: {
                auto: false,
                range: [0, 40],
            }

        },
    };

    const optsAltimetry = {
        title: "Altimetry",
        width: window.innerWidth - 100,
        height: 300,

        scales: {
            x: {
                time: false,

            }
        },
        series: [
            {
                label: "Time",
                //value: (self, rawValue) =>  Math.floor(rawValue) + "." + rawValue.toString().split('.')[1].charAt(0) +  "min",
            },
            {
                label: "Altimetry",
                stroke: "cyan"
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

            <div id="mapId" style={{ height: '500px' }}>
            </div>

            {isFilePicked &&
                <div>

                    <div className="bg-gray-500" ref={plotRefWheelIdra} key={'a'}></div>
                    <div className="bg-gray-500" ref={plotRefVoltage} key={'b'}></div>
                    <div className="bg-gray-500" ref={plotRefCurrents} key={'c'}></div>
                    <div className="bg-gray-500" ref={plotRefAltimetry} key={'d'}></div>
                    <div className="bg-gray-500" ref={plotRefSpeed} key={'e'}></div>

                </div>
            }

        </div>
    )
}