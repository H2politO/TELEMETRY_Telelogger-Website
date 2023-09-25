import React, { CSSProperties, Component, useEffect } from "react";

import L from "leaflet"
import Hotline from "leaflet-hotline"


import redPoint from './redPoint.png'
import greenCross from './greenCross.png'
import blackCross from './blackCross.png'
import { Coord, StratRecord } from "../types";
import { getGpsDistance } from "../MapCreator";





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
const blackIcon = L.icon({
    iconUrl: blackCross,
    iconSize: [15, 15]
})

let map, carMarker, markerTmp, mainLine, tmpLine;

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

    Hotline(L); //Pass Leaflet to Hotline
    //Called on inital render
    useEffect(()=>{

        // create map
        map = L.map('backgroundMap');

        map.setView([
            45, 7
        ], 4);
        
        carMarker = L.marker([0, 0], { icon: redIcon });
        markerTmp = L.marker([0, 0], { icon: blackIcon });

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(map);
        

    }, []);

    //Used to make internal functions accesible from parent
    React.useImperativeHandle(ref, () => ({
        //Put car marker at position (sticks to path if available)
        playPosition (pos:Coord, mapData?:StratRecord[]) {
            let pointIndex = -1; //By default ignore map data
            let lat = pos.lat, lng = pos.lng;
            
            if(mapData != undefined){
                pointIndex = getClosestPoint(mapData, pos);
            }

            carMarker.remove();

            if(pointIndex != -1){
                carMarker = L.marker([mapData[pointIndex].pos.lat, mapData[pointIndex].pos.lng], { icon: greenIcon });    
            }
            else{
                carMarker = L.marker([lat, lng], { icon: redIcon });
            }
                                   
            carMarker.addTo(map);
            
        },
        //Puts a marker at specified position
        putMarker (pos:Coord) {
            
            let lat = pos.lat, lng = pos.lng;
            
            markerTmp.remove();

            markerTmp = L.marker([lat, lng], { icon: blackIcon });
                                   
            markerTmp.addTo(map);
            
        },
        //Update the main path (in yellow)
        updatePath (stratData:StratRecord[]) {
            if(stratData.length == 0)
                return;
            
            if(mainLine != undefined)
                mainLine.remove();

            console.log(stratData)
            let path = stratData.map(function(item){return [item.pos.lat, item.pos.lng, item.speed]}); //Convert to simple position tuples
            //mainLine = L.polyline( path as Array<LatLng>   , {color: "yellow"}).addTo(map);
            mainLine = L.hotline(path, {outlineWidth:1,palette:{0:"green",0.5:"yellow",1:"red"}, min:0, max:50});
            
            mainLine.addTo(map);
            
            map.fitBounds(mainLine.getBounds());    
        },
        //Update the selected path (in red)
        highlightedPath (stratData) {
            let path = stratData.map(function(item){return item.pos}); //Convert to simple position tuples
            if (path.length == 0)
                return;
            if(tmpLine != undefined)
                tmpLine.remove();
            tmpLine = L.polyline( path    , {color: "red"}).addTo(map);
            map.fitBounds(tmpLine.getBounds());    
        },
        //Remove the red path
        removeHighPath() {
            if(tmpLine == undefined)
                return;
            tmpLine.remove();
        },


    }));
    
    return (
        <div style={divStyle}>
            <div className="bgMap" id="backgroundMap"></div>
        </div>

    )
});