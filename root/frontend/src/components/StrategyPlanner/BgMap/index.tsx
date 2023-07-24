import React, { CSSProperties, Component, useEffect } from "react";
import 'leaflet';
import 'leaflet-draw';
import { LatLng } from "leaflet";
import redPoint from './redPoint.png'
import greenCross from './greenCross.png'
import { Coord, StratRecord } from "../types";
import { getGpsDistance } from "../MapCreator";
declare const L: any

const divStyle:CSSProperties = {
    zIndex: "0",
    position: "relative",
    
}

const redIcon = L.icon({
    iconUrl: redPoint,
    iconSize: [15, 15]
})
const greenIcon = L.icon({
    iconUrl: greenCross,
    iconSize: [15, 15]
})

let map, marker, mainLine, tmpLine;

/*
@brief  Gets the closest point from map dat, returns the index of the point
@note   If the point is not found returns -1
*/
function getClosestPoint(mapDat:StratRecord[], position:Coord){
    let minDist = 5000;
    let tmpIndex = -1;
    let tmpDist:number;

    
    for(let i=0; i<mapDat.length; i++){
        tmpDist = getGpsDistance(mapDat[i].pos, position);
        if(tmpDist < minDist){
            minDist = tmpDist;
            tmpIndex = i;
        }
    }

    return tmpIndex;

}

//forwardRef needed to make internal hooks accesible from parent
export const BgMap = React.forwardRef((props, ref) => {


    //Called on inital render
    useEffect(()=>{

        // create map
        map = L.map('backgroundMap');

        map.setView([
            45, 7
        ], 4);
        
        marker = L.marker([0, 0], { icon: redIcon });

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(map);
        

    }, []);



    //Used to make internal functions accesible from parent
    React.useImperativeHandle(ref, () => ({
        playPosition (pos:Coord, mapData?:StratRecord[]) {
            let pointIndex = -1; //By default ignore map data
            let lat = pos.lat, lng = pos.lng;
            
            if(mapData != undefined){
                pointIndex = getClosestPoint(mapData, pos);
            }

            marker.remove();

            if(pointIndex != -1){
                marker = L.marker([mapData[pointIndex].pos.lat, mapData[pointIndex].pos.lng], { icon: greenIcon });    
            }
            else{
                marker = L.marker([lat, lng], { icon: redIcon });
            }
                                   
            marker.addTo(map);
            
        },

        updatePath (stratData) {
            let path = stratData.map(function(item){return item.pos}); //Convert to simple position tuples
            mainLine = L.polyline( path as Array<LatLng>   , {color: "yellow"}).addTo(map);
            map.fitBounds(mainLine.getBounds());    
        },

        tmpPath (stratData) {
            let path = stratData.map(function(item){return item.pos}); //Convert to simple position tuples
            if (path.length == 0)
                return;
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