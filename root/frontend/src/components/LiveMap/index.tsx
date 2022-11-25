import React, { Component } from "react";
import 'leaflet';
import 'leaflet-draw';
import 'leaflet-realtime'
import 'leaflet-gpx'
import car from './carA.png'
declare const L: any

import { GeoJsonObject } from "geojson";
import { TRACK } from './track.js'
import src from "react-select/dist/declarations/src/index.js";

export class LiveMap extends Component<any> {

    state = {
        selectedFile: undefined,
        isFilePicked: false
    }

    gpx = TRACK as GeoJsonObject;
    i = 0;

    carIcon = L.icon({
        iconUrl: car,
        iconSize: [15, 15]
    })

    map: any;
    layer: any;
    mapWithPoints: any;
    marker: any;

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
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

        let mapWithPath = L.geoJSON(this.gpx).addTo(this.map);
        mapWithPath.setStyle({ color: 'white', weight: 4 });

    }

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

        }, 50)
    }

    changeHandler = (event) => {
        this.state.selectedFile = event.target.files[0];
        this.state.isFilePicked = true;

        console.log(event.target.files[0])

        const reader = new FileReader();

        reader.onload = async (e) => {

            let lines = reader.result.toString().split("\n");
            var headers = lines[0].split(";");
            var result = [];

            for (var i = 1; i < lines.length - 1; i++) {

                var obj = {};
                var currentline = lines[i].split(";");

                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }

            this.trackPoints = result.map((p) => {
                return [parseFloat(p.Lat), parseFloat(p.Long)]
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

            this.computeCenter(this.trackPoints)

            if (this.m != undefined) {
                this.m.remove()

                this.px = 0;
                this.py = 0;
                this.computeCenter(this.trackPoints)
            }

            console.log(loadedGeoJSON);
            this.m = L.geoJSON(loadedGeoJSON).addTo(this.map).setStyle({ color: 'orange', weight: 4 });
            this.map.setView([
                this.px, this.py
            ], 17);

            this.playCar(this.trackPoints)
        }

        reader.readAsText(event.target.files[0]);
    };

    handleSubmission = () => {

    };

    render() {
        return (
            <div >
                {this.state.isFilePicked == false &&
                    <input type="file" name="file" onChange={this.changeHandler} />
                }
                {/*<div>
                    //<button onClick={this.handleSubmission}>Submit</button>
    
                </div>*/
                }

                    <div className="parentMap" id="circuitMap"></div>

            </div>

        )
    }
}