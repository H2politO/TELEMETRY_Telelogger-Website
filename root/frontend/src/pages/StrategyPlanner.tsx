import React, { useState, useEffect, Component, createRef, useRef } from 'react';
import '../App.css';
import '../index.css';
import Cookies from "universal-cookie"
import {  Snackbar, Alert, AlertColor } from "@mui/material";

import Paho from "paho-mqtt"
import {CarPicker} from "../components/StrategyPlanner/CarPicker"
import { BgMap } from '../components/StrategyPlanner/BgMap';
import TopMenu from '../components/StrategyPlanner/TopMenu';
import MapCreator from '../components/StrategyPlanner/MapCreator';
import { StratRecord, Coord } from '../components/StrategyPlanner/types';
import MapConfigurator from '../components/StrategyPlanner/MapConfigurator';
import BulkEditor from '../components/StrategyPlanner/BulkEditor';

import RGL, { WidthProvider } from "react-grid-layout";

const GridLayout = WidthProvider(RGL);

let cookie = new Cookies();

let mqttClient:Paho.Client;

const layout = [
    { i: "mapCreator", x: 4, y: 2, w: 10, h: 15 },
    { i: "mapEditTable", x: 16, y: 2, w: 5, h: 15, minW: 5},
    { i: "mapEditBulk", x: 0, y: 5, w: 4, h: 10 },
];


export const StrategyPlanner = () => {
    
    const [stratMap, setStratmap] = useState<Array<StratRecord>>([]);
    const bgMapRef = useRef(null);

    const [carSelect, setCarSelect] = useState('1'); //Contains current selected car, 1= Juno 2= Idra
    const [currAction, setAction] = useState(""); //Contains the current menu selection

    //What to show on screen
    const [mapConfigEn, setMapConfigEn] = useState(false); //Enables the map configurator view
    const [blkConfigEn, setBlkConfigEn] = useState(false); //Enables the bulk map configurator view
    const [mapCreateEn, setMapCreateEn] = useState(false); //Enables the map configurator view

    //Alert snackbar handler
    //const alertRef = createRef<HTMLDivElement>();
    const [openAlert, setOpenAlert] = useState(false);
    const [alertStatus, setAlertStatus] = useState("default");
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>('info');
    
    //Handle alert closign
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
       }
       setOpenAlert(false)
    }

    //Show alert in bottom right
    const putAlert = (data, severity) =>{
        setAlertSeverity(severity);
        setAlertStatus(data);
        setOpenAlert(true);
    }

    //Downlaoad helpers
    const dofileDownload = createRef<HTMLAnchorElement>();
    const doFileUpload = createRef<HTMLInputElement>();
    const [menuUpdate, setMenuUpdate] = useState(false); //USed to force updates when menu pressed
    const [downloadUrl, setDownloadUrl] = useState("");
    const didMount = useRef(false); //USed to avoid updates on first render



    //Useeffect called only when the page is loaded; if cookies are present load them; if they aren't, don't
    useEffect(() => {
        
        console.log("Starting root mqtt client...");
        mqttClient = new Paho.Client("broker.mqttdashboard.com", Number(8000), "/mqtt", "myClientId" + new Date().getTime());
        mqttClient.connect({ onSuccess: onConnect });

    }, [])

    //Called when mqtt client connects
    function onConnect(){
        console.log("Root MQTT Client connected");
        mqttClient.onMessageArrived = mqttRxCallback;
        updateMqttSubs();    

    }

    function updateMqttSubs(){

        if(mqttClient == undefined)
            return;
            
        if(!mqttClient.isConnected()) //IF not connected return early
            return;

        if(carSelect == "1"){
            mqttClient.unsubscribe("H2polito/Idra/Position")
            mqttClient.subscribe("H2polito/Juno/Position")
            putAlert("Connected to Juno", "success");
        }
        else if(carSelect == "2"){
            mqttClient.unsubscribe("H2polito/Juno/Position")
            mqttClient.subscribe("H2polito/Idra/Position")
            putAlert("Connected to Idra", "success");
        }
    }

    function mqttRxCallback(message){
        //We don't care about the topic since there is no visible difference among the cars
        let record = message.payloadString.split(";");
        bgMapRef.current.playPosition({lat:parseFloat(record[0]), lng:parseFloat(record[1])}, stratMap)
    }   

    //Called when anything is pressed from menu and action updated
    useEffect(() => {        
        console.log("Menu action:", currAction)
        if(currAction == "load"){
            doFileUpload.current?.click();
        }
        else if(currAction == "save"){
            saveData();
        }
        else if(currAction == "edit"){
            setMapConfigEn(true);
        }
        else if(currAction == "create"){
            setMapCreateEn(true);
        }
        else if(currAction == "send"){
            sendData();
        }
        else if(currAction == "home"){
            bgMapRef.current.updatePath(stratMap);
        }


    }, [currAction, menuUpdate]);

    //Called when save data url created
    useEffect(()=>{
        if ( !didMount.current ){ //Prevent running this when it's the first rendering
            didMount.current = true;
            return;
        }
        
        dofileDownload.current.click(); //start the download by emulating the user click on a hidden ancor element   
        URL.revokeObjectURL(downloadUrl); //Remove the linked URL
    }, [downloadUrl])

    //Called when carselect changes
    useEffect(()=>{
        updateMqttSubs();
    }, [carSelect])

    //Called when map config window changes, detect when disappears and removes path from map
    useEffect(()=>{
        if(!mapConfigEn)
            bgMapRef.current. removeHighPath();
    }, [mapConfigEn])

    //Called when strategy data is updated
    useEffect(()=>{
        if(stratMap == undefined)
            return;
        console.log("Updaing background map")
        console.log(stratMap)
        bgMapRef.current.updatePath(stratMap)
        
    }, [stratMap])

    //Loads the map data (called when file uploaded)
    const loadData = (file:File) => {
        
        
        if(file == null){
            //setStatus("⚠️ No file selected!");
            return;
        }
            
        let fileData = new FileReader();
        
        fileData.onloadend = (e) =>{
            if(e.target?.result?.toString() == undefined){
                putAlert("Error code 001", "warning");    
                return;
            }
                
            let fileByLines = e.target.result.toString().split("\n");

            //Detect if the file contains all the data or not by taking how many elements are in header
            //The file is complete only if there are more then 2 entries in the header
            const fileHeader = fileByLines[0].split(";");

            
            let idIndex = fileHeader.indexOf("ID");
            let latIndex = fileHeader.indexOf("LATITUDE");
            let lngIndex = fileHeader.indexOf("LONGITUDE");
            
            let strategyIndex= fileHeader.indexOf("STRATEGY");
            let sectorIndex = fileHeader.indexOf("SECTOR");
            let speedIndex = fileHeader.indexOf("SPEED");
            let altitudeIndex = fileHeader.indexOf("ALTITUDE");

            let isMapComplete = (strategyIndex > 0 && sectorIndex > 0 && speedIndex > 0 && altitudeIndex > 0); //Check if all data is present


            if(!isMapComplete){
                putAlert("Map does not have full data", "warning");    
            }
           
            


            for(let i=1; i<fileByLines.length-1; i++){
                
                let record = fileByLines[i].split(";");

                if(isMapComplete){
                    stratMap.push( {id:parseInt(record[idIndex]), pos:{lat:parseFloat(record[latIndex]), lng:parseFloat(record[lngIndex])}, altitude:parseFloat(record[altitudeIndex]), speed:parseFloat(record[speedIndex]), strategy:parseInt(record[strategyIndex]), sector:parseInt(record[sectorIndex]), note: ""});
                }
                else{
                    stratMap.push({id:parseInt(record[idIndex]), pos:{lat:parseFloat(record[latIndex]), lng:parseFloat(record[lngIndex])}, speed:0, altitude:0, strategy:-1, sector:-1, note: ""});
                }

                
            }
            
            if( bgMapRef.current != undefined)
                bgMapRef.current.updatePath(stratMap);

            setStratmap(stratMap);
            setMapConfigEn(true);
            //setStatus("File Loaded");

             
        }

        fileData.readAsText(file);
    }  

    //Saves the map data
    const saveData = () =>{
        if(stratMap.length == 0){
            putAlert("Upload a file first", "error");
            return;
        }
        let outString = "ID;LATITUDE;LONGITUDE;ALTITUDE;SPEED;STRATEGY;SECTOR;NOTE\n";

        for(let i=0; i<stratMap.length; i++){
            outString += `${i};${stratMap[i].pos.lat};${stratMap[i].pos.lng};${stratMap[i].altitude};${stratMap[i].speed};${stratMap[i].strategy};${stratMap[i].sector};\n`
        }
        const blob = new Blob([outString], { type: 'application/text' }); //Create blob object
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url); //Create URL to the  blob
        
    }

    //Send data to phone
    const sendData = () =>{
        if(stratMap.length == 0){
            putAlert("Upload a file first", "error");
            return;
        }
        let outString = "ID;LATITUDE;LONGITUDE;STRATEGY;SECTOR;NOTE\n";

        for(let i=0; i<stratMap.length; i++){
            outString += `${i};${stratMap[i].pos.lat};${stratMap[i].pos.lng};${stratMap[i].strategy};${stratMap[i].sector};\n`
        }
        const blob = new Blob([outString], { type: 'application/text' }); //Create blob object
        const url = URL.createObjectURL(blob);
        
        fetch('http://h2polito.duckdns.org/JunoFile', {  // Server IP address

            method: 'POST', 
            mode: 'cors', 
            body: outString
        }).then((response) => { //When response received notify phone file is online
            console.log("DONE")
            let msg = new Paho.Message("ready")
            msg.destinationName = "H2polito/Juno/Strategy"
            mqttClient.send(msg)
        });
    }

    const updateSelection = (startI, endI) =>{
        bgMapRef.current.highlightedPath(stratMap.slice(startI, endI+1));
    }

    return (
        <div  className="mb-auto mx-auto">
            
            {/*Alert handler (bottom right corner)*/}
            <Snackbar open={openAlert} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}>
                <Alert 
                    severity={alertSeverity} 
                    sx={{ width: '100%' }} 
                    onClose={handleClose} 
                    >
                        {alertStatus}
                </Alert>
            </Snackbar>

            {/*Downlaod/Upload hidden anchors*/}
            <a hidden download="mapDl.csv" href={downloadUrl} ref={dofileDownload} ></a> 
            <input type="file" accept=".csv" onChange={e =>loadData(e.target.files[0])} id="fileUpButton" ref={doFileUpload} hidden/>

            {/*background map*/}
           <BgMap ref={bgMapRef}></BgMap>


            {/*carPicker on top right*/}
           <CarPicker carSelect={carSelect} setCarSelect={setCarSelect} ></CarPicker>
            {/*menu on top right*/}
           <TopMenu setAct={setAction} menuUp={menuUpdate} setMenu={setMenuUpdate} ></TopMenu>

           <GridLayout
                style={{position:"absolute",top:"19%",bottom:"0",left:"0",right:"0",margin:"auto",zIndex:"5",width:"100%",height:"100%"}}
                className="layout"
                layout={layout}
                cols={18}
                maxRows={20}
                draggableHandle='.dragHandle'
                resizeHandles = {["se"]}
                rowHeight={30}
                compactType={null   }
                autoSize={true}

            >
                {/*show map creator conditionally*/}
                {mapCreateEn && 
                    /*NOTE: both key and data grid are required to avoid the component not appearing*/
                    <div key="mapCreator" data-grid={{x: 4, y: 2, w: 10, h: 15}}>
                        <MapCreator setMapCreateEn={setMapCreateEn} alertCb={putAlert}/>
                    </div>
                }        

                {/*show map configurator conditonally*/}    
                {mapConfigEn &&
                    <div key="mapEditTable" data-grid={{x: 16, y: 2, w: 6, h: 15, minW: 5}}>
                        
                        <MapConfigurator putMarker={bgMapRef.current.putMarker} setBlkConfigEn={setBlkConfigEn} setMapConfigEn={setMapConfigEn} mapData={stratMap} setMapData={setStratmap}></MapConfigurator>
                    </div>
                }       
                
                {/*show map bulk configurator conditonally*/}
                {blkConfigEn &&
                    <div key="mapEditBulk" data-grid={{ x: 0, y: 5, w: 4, h: 10}}>
                        <BulkEditor updateSelection={updateSelection} updateMap={bgMapRef.current.updatePath(stratMap)} setBlkConfigEn={setBlkConfigEn} mapData={stratMap} setMapData={setStratmap}></BulkEditor>
                    </div>
                }     
                
                
            </GridLayout>
                


            
            

        </div>
    )

}

export default StrategyPlanner