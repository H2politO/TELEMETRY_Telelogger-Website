import React, { useRef, createRef, useEffect, useState } from "react";
import {Close} from "@mui/icons-material"
import { Divider, OutlinedInput, InputAdornment } from "@mui/material";
import { Button } from "@mui/base";
import {LatLng, icon} from'leaflet';
import 'leaflet-draw';
import 'leaflet-realtime'
import Cookies from 'universal-cookie';  
import {rootStyle, xButtonStyle, mapPreviewStyle, titleStyle, statusStyle, centralColumnStyle, headerStyle, leftColumnStyle, buttonStyle, baseStyle, rightColumnStyle} from "./styles"  
import { Coord } from "../types";



import startRes from './start.png'
import stopRes from './stop.png'




declare const L: any


//Turn degree into radians
function degToRad(deg){
    return (deg * (Math.PI/180));
}
//Get the distance between two GPS points
export function getGpsDistance(A:Coord, B:Coord){
    let lonA = A.lng;
    let latA = A.lat;
    let lonB = B.lng;
    let latB = B.lat;

    const eRad = 6371e3; //Earth radius

    const deltaLat = degToRad(latB - latA);
    const deltaLon = degToRad(lonB - lonA);
    //Convert angles in radians
    latA = degToRad(latA);
    latB = degToRad(latB);

    let a =  (Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.cos(latA) * Math.cos(latB) * Math.sin(deltaLon/2) * Math.sin(deltaLon/2));
    let c =  (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));

    return eRad * c;
}

let rawData:Coord[] = [];

let startIcon = L.icon({
    iconUrl: startRes,
    iconSize: [30, 30]
})
let stopIcon = L.icon({
    iconUrl: stopRes,
    iconSize: [30, 30]
})

const dofileDownload = createRef<HTMLAnchorElement>()
const doFileUpload = createRef<HTMLInputElement>();

let processedData:Coord[] = [];
let map, startMark, stopMark, processedLine; //Map and helpers

const cookies = new Cookies();

//setAct is used to reset action when closed
//alertCb is used to send alerts to main page
export const MapCreator = ({setAct, alertCb}) => {
    const didMount = useRef(false); //USed to avoid updates on first render

    const [status, setStatus] = useState("");


    const [minDistance, setMinDistance] = useState(0);
    const [startTrim, setStartTrim] = useState(0);
    const [endTrim, setEndTrim] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState("");

    const closeWindow = () =>{
        setAct("");
    }
    
    const loadData = (file:File) => {
        
        if(file == null){
            alertCb("No file selected", "error")
            return;
        }
            

        let fileData = new FileReader();
        
        fileData.onloadend = (e) =>{
            if(e.target?.result?.toString() == undefined){
                alertCb("File empty", "error")
                return;
            }
                
            let fileByLines = e.target.result.toString().split("\n");
            
            //Detect if the file contains all the data or not by taking how many elements are in header
            //The file is complete only if there are more then 2 entries in the header
            const fileHeader = fileByLines[0].split(";");

                      
            let latIndex = fileHeader.indexOf("LATITUDE");
            let lngIndex = fileHeader.indexOf("LONGITUDE");
            
            for(let i=1; i<fileByLines.length; i++){
                
                let record = fileByLines[i].split(";");
                rawData.push({lat:parseFloat(record[latIndex]), lng:parseFloat(record[lngIndex])});
                
            }

            rawData = rawData.filter(pos => (pos.lat != 0 && pos.lng != 0));//Remove zeros
            rawData.splice(rawData.length-1,1)

            updateMap();

            alertCb("File loaded", "success")

            startMark.setLatLng(rawData[startTrim] as LatLng);
            stopMark.setLatLng(rawData[rawData.length-endTrim-1] as LatLng);

        }

        fileData.readAsText(file);
    }
    
    const updateMap = () =>{
        //Load points on map    

        let polyLine = L.polyline( rawData as Array<LatLng>   , {color: "yellow"}).addTo(map);
        map.fitBounds(polyLine.getBounds());
        startMark = L.marker(rawData[0] as LatLng,  {icon: startIcon});
        stopMark = L.marker(rawData[rawData.length-1] as LatLng,  {icon: stopIcon});

        startMark.addTo(map);
        stopMark.addTo(map);
    }

    const processData = () => {
        if(rawData.length == 0){
            alertCb("No points loaded!", "error");
            return;
        }


        //Average results
        let averagedData:Coord[] = [];

        //Keep only points above a min distance in next section
        processedData = []; //Clean array
        processedData.push(rawData[startTrim]); //Add first point

        let i = startTrim, lapOver = false;

        while(i < (rawData.length-endTrim) && !lapOver ){
            let lastElement = processedData[processedData.length - 1]; //Get the last element in the processed data
            
            if(getGpsDistance(lastElement, rawData[i]) >= minDistance){ //Only take points further than distance
                processedData.push(rawData[i]);
                //If the distance from the start point is less then minimum distance the lap is over
                // NOTE: Also check for the change in index because otherwise we always find the point to be close enough
                if(getGpsDistance(processedData[0], rawData[i]) <= minDistance && (i-startTrim) > 100){ 
                    lapOver = true;
                    setStatus(`Lap completed ${processedData.length} points`)
                    alertCb(`Lap completed ${processedData.length} points`, "success");
                } 
            }
            i ++;
        }

        if(!lapOver){
            setStatus(``)
            alertCb(" Lap not done!", "error");
        }

        if(processedLine != null){
            processedLine.remove();
        }
        processedLine = L.polyline( processedData as Array<LatLng>   , {color: "red"});
        processedLine.addTo(map);


    }

    const saveData = () =>{
        let outString = "ID;LATITUDE;LONGITUDE\n";

        for(let i=0; i<processedData.length; i++){
            outString += `${i};${processedData[i].lat};${processedData[i].lng}\n`
        }

        const blob = new Blob([outString], { type: 'application/text' }); //Create blob object
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url); //Create URL to the  blob
        
    }

    //Called when download url is set
    useEffect(()=>{
        if ( !didMount.current ){ //Prevent running this when it's the first rendering
            didMount.current = true;
            return;
        }
        
        dofileDownload.current.click(); //start the download by emulating the user click on a hidden ancor element   
        URL.revokeObjectURL(downloadUrl); //Remove the linked URL
    }, [downloadUrl])

    //Called on component load
    useEffect(()=>{
        map = L.map('mapPreview', {
            center: [45, 7],
            zoom: 13
        });
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(map);
        
        let tmp;
        
        tmp = cookies.get("startTrim");
        if( tmp != null){
            setStartTrim(tmp);
        }

        tmp = cookies.get("stopTrim");
        if( tmp != null){
            setEndTrim(tmp);
        }
        
        tmp = cookies.get("minDistance");
        if( tmp != null){
            setMinDistance(tmp);
        }

        if(rawData.length != 0){
            updateMap();
        }

    }, [])


    
    //isEnd: is endTrim? or is startTrim
    const updateTrim = (event, multiplier, isEnd) => {
        let tmp = parseInt(event.target.value)*multiplier;
        
        if(tmp > rawData.length || tmp < 0 || isNaN(tmp))
            return;
        
        if(isEnd){
            setEndTrim(tmp);
            cookies.set("stopTrim", tmp);
            stopMark.setLatLng(rawData[rawData.length-endTrim-1] as LatLng);
        }
        else{
            setStartTrim(tmp);
            cookies.set("startTrim", tmp);
            startMark.setLatLng(rawData[startTrim] as LatLng);
        }
        
    }

    return (
       <div style={rootStyle}>

            <div className="dragHandle"  id="header" style={headerStyle}>
                <h1 style={titleStyle}>Map Creation</h1>                
                <Button style={xButtonStyle} onClick={closeWindow}> <Close/></Button>
                <h1 style={statusStyle}>{status}</h1>
            </div>

            <Divider  sx={{ position: "relative", top: "-20px", bgcolor: "black", width:"100%", stroke:"1px" }} ></Divider>

            <div id="baseContainer" style={baseStyle}>
                
                <div id="leftColumn" style={leftColumnStyle}>
                    <h2 id="mapHeader" style={{ textAlign:"center", width: "100%"}}> Map Preview </h2>
                    <div id="mapPreview" style={mapPreviewStyle}></div>
                    <h2 id="rawLabel" style={{textAlign:"left", width: "100%"}}>🟨 Raw Points </h2>
                    <h2 id="procLabel" style={{textAlign:"left", width: "100%"}}>🟥 Processed Points </h2>
                </div>

                <div id="centralColumn" style={centralColumnStyle}>
                    <a hidden download="map.csv" href={downloadUrl} ref={dofileDownload} ></a> 

                    <Button id="loadDataBtn" style={buttonStyle} onClick={()=>doFileUpload.current?.click()}>Load raw data</Button>
                    <input type="file" accept=".txt" onChange={e =>loadData(e.target.files[0])} id="fileUpButton" ref={doFileUpload} hidden/>
                    <Button id="procDataBtn" style={buttonStyle} onClick={processData} >Process raw data</Button>
                    <Button id="saveDataBtn" style={buttonStyle} onClick={saveData} >Save Processed data</Button>
                </div>                

                <div id="rightColumn" style={rightColumnStyle}>
                    <h1>Max point distance</h1>
                    
                    <OutlinedInput
                        type="number"
                        
                        id="maxPointDistanceSelector"
                        endAdornment={<InputAdornment position="end">m</InputAdornment>}
                        inputProps={{
                        'aria-label': 'distance',
                        'min': 0,
                        }}
                        value={minDistance}
                        onChange={event => { setMinDistance(parseFloat(event.target.value)); cookies.set("minDistance", parseFloat(event.target.value))}} //Update the minimum distance
                    />


                    <h1>Start point trim</h1>
                    
                
                    <OutlinedInput
                        type="number"
                        id="startTrim"
                        endAdornment={<InputAdornment position="end">fine</InputAdornment>}
                        inputProps={{
                        'aria-label': 'Index',
                        }}
                        value={startTrim}
                        onChange={(event) => {updateTrim(event, 1, false)}}
                    />
                    <OutlinedInput
                        type="number"
                        id="startTrimCoarse"
                        endAdornment={<InputAdornment position="end">coarse</InputAdornment>}
                        inputProps={{
                        'aria-label': 'Index',
                        }}
                        value={startTrim/10}
                        onChange={(event) => {updateTrim(event, 10, false)}}
                    />
                    
                    
                    <h1>End point trim</h1>
                    
                    <OutlinedInput
                        type="number"
                        id="endTrim"
                        endAdornment={<InputAdornment position="end">fine</InputAdornment>}
                        inputProps={{
                        'aria-label': 'Index',
                        }}
                        value={endTrim}
                        onChange={(event) => {updateTrim(event, 1, true)}}
                    />
                    <OutlinedInput
                        type="number"
                        id="endTrimCoarse"
                        endAdornment={<InputAdornment position="end">coarse</InputAdornment>}
                        inputProps={{
                        'aria-label': 'Index',
                        }}
                        value={endTrim/10}
                        onChange={(event) => {updateTrim(event, 10, true)}}
                    />
                    
                    
                
                </div>
            </div>
    </div>
    )
}

export default MapCreator