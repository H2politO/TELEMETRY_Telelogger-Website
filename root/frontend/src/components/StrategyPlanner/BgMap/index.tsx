import React, { CSSProperties, Component } from "react";
import 'leaflet';
import 'leaflet-draw';
import 'leaflet-realtime'
import 'leaflet-gpx'
import car from './carA.png'
import { AltimetryMap } from './altimetryMap'
declare const L: any

const divStyle:CSSProperties = {
    zIndex: "0",
    position: "relative",
    pointerEvents: "none"
}


export class BgMap extends Component<any, any> {



    carIcon = L.icon({
        iconUrl: car,
        iconSize: [15, 15]
    })

    map: any;
    layer: any;
    marker = L.marker([0, 0], { icon: this.carIcon });

    componentDidMount() {

        // create map
        this.map = L.map('backgroundMap',
        ).setView([
            45, 7
        ], 4);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(this.map);

    }

    componentDidUpdate() {

        //on props change (updating of lat and lng)
        //console.log("Update");
        //if (this.props.position[0] != undefined && this.props.position[1] != undefined)
        //    this.playPosition(this.props.position[0], this.props.position[1])

        //console.log('comp update')
        //console.log(this.props.position)
        //if(this.props.position.latitude!=undefined)
        //this.playPosition()
    }


    //puts the marker on the latitude and longitude passed to the component; this function should be updated on the new props received
    playPosition(lat, lng) {

        //console.log("Playing car at ", lat, lng) 
        this.marker.remove();
        this.map.setView([lat, lng], 17);
        this.marker = L.marker([lat, lng], { icon: this.carIcon });
        this.marker.addTo(this.map);
        //this.setState({carposition: this.computeClosest(lat, lng)})
    }


    render() {

        
        return (
            <div style={divStyle}>

                <div className="bgMap" id="backgroundMap"></div>


            </div>

        )
    }
}