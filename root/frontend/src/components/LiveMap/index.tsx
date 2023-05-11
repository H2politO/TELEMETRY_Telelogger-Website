import React, { Component } from "react";
import 'leaflet';
import 'leaflet-draw';
import 'leaflet-realtime'
import 'leaflet-gpx'
import car from './carA.png'
import { AltimetryMap } from './altimetryMap'
declare const L: any

type Props = {
    position: Position
}

type Position= {
    lng: number,
    lat: number
}

type state = {
    selectedFile: undefined,
    isFilePicked: false
    altimetryPoints: number[]
    carPosition: 0
}

import { GeoJsonObject } from "geojson";
import { TRACK } from './track.js'
import src from "react-select/dist/declarations/src/index.js";

export class LiveMap extends Component<any, any> {

    constructor(props: Props) {
        super(props);
        this.state = {
            altimetryPoints: [],
            strategyPoints: []
        }
    }

    i = 0;

    carIcon = L.icon({
        iconUrl: car,
        iconSize: [15, 15]
    })

    map: any;
    layer: any;
    mapWithPoints: any;
    marker = L.marker([0, 0], { icon: this.carIcon });
    //marker: any;

    m: any;

    px = 0;
    py = 0;

    trackPoints;

    componentDidMount() {

        // create map
        this.map = L.map('circuitMap',
        ).setView([
            0, 0
        ], 0);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(this.map);
       
    }

    componentDidUpdate() {

        //on props change (updating of lat and lng)
        console.log("Update");
        if(this.props.position[0] != undefined && this.props.position[1] !=undefined)
            this.playPosition(this.props.position[0], this.props.position[1])

        //console.log('comp update')
        //console.log(this.props.position)
        //if(this.props.position.latitude!=undefined)
        //this.playPosition()
    }


    //function needed to compute the center of the map in order to center it when the component is loaded or when the new position is updated 
    computeCenter(tp) {
        tp.forEach(p => {
            this.px += p[1];
            this.py += p[0];
        });
        this.px = this.px / (tp.length);
        this.py = this.py / (tp.length);
    }

    playCar(tp) {

        this.marker = L.marker([tp[this.i % (tp.length - 1)][1], tp[this.i % (tp.length - 1)][0]], { icon: this.carIcon });

        setInterval(() => {
            this.i++
            this.marker.remove();

            this.marker = L.marker([tp[this.i % (tp.length - 1)][1], tp[this.i % (tp.length - 1)][0]], { icon: this.carIcon });
            this.marker.addTo(this.map);

            this.setState({ carPosition: this.i }, () => {
            });

            //Enable to follow car
            this.map.setView([tp[this.i % (tp.length - 1)][1], tp[this.i % (tp.length - 1)][0]], 17);

        }, 200)
    }

    //puts the marker on the latitude and longitude passed to the component; this function should be updated on the new props received
    playPosition(lat, lng) {

        console.log("Playing car at ", lat, lng) 
        this.marker.remove();
        this.map.setView([lat, lng], 17);
        this.marker = L.marker([lat, lng], { icon: this.carIcon });
        this.marker.addTo(this.map);
    }


    fileInsertion = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
        this.setState({ isFilePicked: true });

        console.log(event.target.files[0])

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
                    obj[headers[j]] = currentline[j].replace("\r", "");
                }
                result.push(obj);
            }

            //Compute trackpoints needed to draw the map
            this.trackPoints = result.map((p) => {
                return [parseFloat(p.Lat), parseFloat(p.Long)]
            })

            //Compute altimetryPoints used to draw the graph
            this.setState({
                altimetryPoints: result.map((p) => {
                    return parseFloat(p.Altitude.replace("\r", "")).toFixed(2)
                }),
                strategyPoints: result.map((p) => {
                    return parseInt(p.Distance)
                })
            })


            let loadedGeoJSON = {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "LineString",
                            "coordinates":
                                this.trackPoints
                        }
                    }]
            }



            if (this.m != undefined) {
                this.m.remove()
                this.px = 0;
                this.py = 0;
            }

            this.computeCenter(this.trackPoints)

            console.log(loadedGeoJSON);
            this.m = L.geoJSON(loadedGeoJSON).addTo(this.map).setStyle({ color: 'red', weight: 4 });
            this.map.setView([
                this.px, this.py
            ], 17);

            //this.playCar(this.trackPoints)
        }

        reader.readAsText(event.target.files[0]);
    };

    handleSubmission = () => {
        this.setState({ isFilePicked: !this.state.isFilePicked })

    };

    render() {

        let altimetryMap
        let filePicker
        if (this.state.isFilePicked) {
            altimetryMap = <AltimetryMap data={[this.state.altimetryPoints, this.state.carPosition]}></AltimetryMap>
        } else {
            filePicker = <input type="file" name="file" onChange={this.fileInsertion} />
        }
        return (
            <div>
                {
                    filePicker
                }
                <div>
                    <button onClick={this.handleSubmission}>Toggle altimetry</button>

                </div>
                <div className="parentMap" id="circuitMap"></div>
                {
                    altimetryMap
                }


            </div>

        )
    }
}