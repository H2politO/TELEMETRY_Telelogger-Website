import React, { CSSProperties, Component, useEffect } from "react";
import 'leaflet';
import 'leaflet-draw';
import { LatLng } from "leaflet";
import car from './carA.png'
import { Coord } from "../types";
declare const L: any

const divStyle:CSSProperties = {
    zIndex: "0",
    position: "relative",
    
}

const carIcon = L.icon({
    iconUrl: car,
    iconSize: [15, 15]
})

let map, marker, mainLine, tmpLine;


//forwardRef needed to make internal hooks accesible from parent
export const BgMap = React.forwardRef((props, ref) => {


    //Called on inital render
    useEffect(()=>{

        // create map
        map = L.map('backgroundMap');

        map.setView([
            45, 7
        ], 4);
        
        marker = L.marker([0, 0], { icon: carIcon });

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(map);
        

    }, []);



    //Used to make internal functions accesible from parent
    React.useImperativeHandle(ref, () => ({
        playPosition (pos) {
            let lat = pos.lat, lng = pos.lng;

            //console.log("Playing car at ", lat, lng) 
            marker.remove();
            //map.setView([lat, lng], 17);
            marker = L.marker([lat, lng], { icon: carIcon });
            marker.addTo(map);
            //this.setState({carposition: this.computeClosest(lat, lng)})
        },

        updatePath (stratData) {
            let path = stratData.map(function(item){return item.pos}); //Convert to simple position tuples
            mainLine = L.polyline( path as Array<LatLng>   , {color: "yellow"}).addTo(map);
            map.fitBounds(mainLine.getBounds());    
        },

        tmpPath (stratData) {
            let path = stratData.map(function(item){return item.pos}); //Convert to simple position tuples
            if(tmpLine != undefined)
                tmpLine.remove();
            tmpLine = L.polyline( path as Array<LatLng>   , {color: "red"}).addTo(map);
            map.fitBounds(tmpLine.getBounds());    
        },

        hideTmpPath() {
            if(tmpLine == undefined)
                return;
            tmpLine.remove();
        }

    }));
    
    return (
        <div style={divStyle}>
            <div className="bgMap" id="backgroundMap"></div>
        </div>

    )
});