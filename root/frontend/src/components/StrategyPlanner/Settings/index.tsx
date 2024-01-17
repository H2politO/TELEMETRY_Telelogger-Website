import React, { useEffect, useState, CSSProperties } from "react";
import { Close } from "@mui/icons-material"
import { Switch } from "@mui/material";
import { Button } from "@mui/base";
import FormControlLabel from '@mui/material/FormControlLabel';
import 'leaflet-draw';
import 'leaflet-realtime'
import Cookies from 'universal-cookie';  
import { xButtonStyle, titleStyle, statusStyle, headerStyle } from "./styles"
import Select, { ActionMeta, OnChangeValue } from 'react-select'
import { IDRA_SENSORS } from "../../../models/constants";
import { JUNO_SENSORS } from "../../../models/constants";
import Option from "react-select/dist/declarations/src/components/Option";



type Option = {
    label: string,
    value: any,
}

const cookie= new Cookies();
let lastSelection 
export const Settings = ({setSettings, carSelect, dispDataEn, setDispDataEn, setDisplayTopic}) => {
    
    const [status, setStatus] = useState("");
    
    //
    const [selectedOption,setSelectedOption]=useState(null)
    
    const closeWindow = () =>{
        setSettings(false);
    }
     
    const state = {
        IDRA_SENSORS,
        JUNO_SENSORS,
    }

    
    useEffect(()=>{
       //use to save and upload data
       lastSelection = cookie.get("lastSelection")
       if (lastSelection!=null){
            console.log("cookie",lastSelection)
            setDisplayTopic("H2polito/" + lastSelection.value.topic )
            setSelectedOption(lastSelection)
        }
    },[])

    useEffect(()=>{
    console.log(carSelect)
    }, [carSelect])

    //use to enable real-time data
    const enablePressed = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDispDataEn(event.target.checked);
    }

    const handleChange = (newValue: OnChangeValue<Option, false>, actionMeta: ActionMeta<Option>) => {
       console.log(newValue)
       setDisplayTopic("H2polito/" + newValue.value.topicName);
       setSelectedOption(newValue)
       cookie.set("lastSelection",newValue)
    };
   
    const divStyle:CSSProperties = {
        position: "absolute",
        top: "10%",
        right: "0px",
        zIndex: "70 ",
        width: "100%",
        height: "90%",
        background: "solid",
        backgroundColor: "white",
        borderRadius: "20px",
        display: "block", 
        alignItems: "center",

    }


    return ( 
        
        <div style={divStyle}>

                <div className="dragHandle" id="header" style={headerStyle}>
                    <h1 style={titleStyle}> Settings </h1>
                    <Button style={xButtonStyle} onClick={closeWindow}> <Close /></Button>
                    <h1 style={statusStyle}>{status}</h1>



            
            {carSelect!="1" &&
                    <div className='myFormGroup'>
                      <label>Select sensor for Idra:</label>
                      <Select value={selectedOption} options={state.IDRA_SENSORS} onChange={handleChange} ></Select>
                    </div>
            }

            {carSelect=="1" &&
                    <div className='myFormGroup'>
                      <label>Select sensor for Juno:</label>
                      <Select value={selectedOption} options={state.IDRA_SENSORS} onChange={handleChange} ></Select>
                    </div> 
            }

            <FormControlLabel checked={dispDataEn} onChange={enablePressed} style={{display:"block"}} 
               value="start"
               control={<Switch color="primary" />}
               label="Enable real-time data"
               labelPlacement="start"
            ></FormControlLabel>
            
                
             </div>
        </div>
    )
}

export default Settings
