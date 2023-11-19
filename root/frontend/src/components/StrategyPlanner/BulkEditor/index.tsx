import React, { CSSProperties, Component, useEffect, useState } from "react";
import { Close} from "@mui/icons-material"
import {  OutlinedInput, Divider, Alert } from "@mui/material";
import Button from '@mui/material/Button';
import * as Styles from "./styles"


export const BulkEditor = ({setBlkConfigEn, mapData, setMapData, updateSelection, updateMap}) => {
    const [startIndex, setStartIndex] = useState(0); //Index where to start editing data
    const [endIndex, setEndIndex] = useState(0); //Index where to stop editing data
    const [strategy, setStrategy] = useState(-1); // Strategy to set to selected points
    const [sector, setSector] = useState(-1); //Sector to assign to selected points

    const closeWindow = ()=>{
        setBlkConfigEn(false);
    }

    //Send updates to parent
    useEffect(()=>{
        updateSelection(startIndex, endIndex);
    }, [startIndex, endIndex])

    //Update current indexes
    const updateIndexes = (event, isEndIndex) => {
        let tmp = parseInt(event.target.value);
        if(tmp < 0 || tmp > mapData.length){

            return; //Avoid problems
        }
        if(isEndIndex){
            if(tmp>startIndex)
                setEndIndex(tmp);
        }
        else{
            if(tmp<endIndex)
                setStartIndex(tmp);
        }
        
    }
    
    const setStrat = (event) =>{
        let tmp = parseInt(event.target.value);
        if(tmp < -1 || tmp > 20)
            return; //Avoid problems
        setStrategy(tmp);
    }

    const setSect = (event) =>{
        let tmp = parseInt(event.target.value);
        if(tmp < -1 || tmp > 20)
            return; //Avoid problems
        setSector(tmp);
    }

    //Updated the data in the parent mapData (called when edit is pressed, used to shift forward)
    const updateData = ()=>{
        let tmpData = mapData.map(obj => ({...obj}));
        for(let i = startIndex; i<endIndex; i ++){
            if(strategy != -1)
                tmpData[i].strategy = strategy;
            if(sector != -1)
                tmpData[i].sector = sector;
        }
        
        setMapData(tmpData)
        setStartIndex(endIndex);
        if(endIndex+1 < mapData.length)
            setEndIndex(endIndex+1);
        
    }
    


    return (
        <div style={Styles.rootStyle}>
        <div className="dragHandle" id="header" style={Styles.headerStyle}>
            <h1 style={Styles.titleStyle}>Bulk Edit</h1>                
            <Button style={Styles.xButtonStyle} onClick={closeWindow}> <Close/></Button>
        </div>


        <Divider  sx={{ position: "relative", top: "-20px", bgcolor: "black", width:"100%", stroke:"1px" }} ></Divider>

        <div id="main" style={Styles.baseStyle}>
            <div id="leftColumn" style={Styles.leftColumnStyle}>
                <h2>Set</h2>
                <p>Strategy</p>
                <OutlinedInput
                    type="number"
                    id="stratInput"
                    inputProps={{
                    'aria-label': 'Strategy',
                    }}
                    value={strategy}
                    onChange={(event) => {setStrat(event)}}
                />
                <p>Sector</p>
                <OutlinedInput
                    type="number"
                    id="sectInput"
                    inputProps={{
                    'aria-label': 'Sector',
                    }}
                    value={sector}
                    onChange={(event) => {setSect(event)}}
                />
                <p></p>
                <p>-1 = Ignore setting</p>
            </div>
            <div id="rightColumn" style={Styles.rightColumnStyle}>
                <h2>Select</h2>
                <p>To Index</p>
                <OutlinedInput
                    type="number"
                    id="endIdInput"
                    inputProps={{
                    'aria-label': 'Index',
                    }}
                    value={endIndex}
                    onChange={(event) => {updateIndexes(event, true)}}
                />
                <p>From Index</p>
                <OutlinedInput
                    type="number"
                    id="startIdInput"
                    inputProps={{
                    'aria-label': 'Index',
                    }}
                    value={startIndex}
                    onChange={(event) => {updateIndexes(event, false)}}
                />
            </div>
        </div>
        <Button style={Styles.buttonStyle} onClick={updateData}> EDIT</Button>
    </div>
    )
}

export default BulkEditor