import React, { CSSProperties, Component } from "react";
import {Select, MenuItem, InputLabel, SelectChangeEvent} from "@mui/material"

const divStyle:CSSProperties = {
    position: "absolute",
    top: "10%",
    right: "10px",
    zIndex: "10",
    width: "150px",
    height: "50px",
    background: "solid",
    backgroundColor: "white",
    borderRadius: "20px",
    display: "flex", 
    alignItems: "center",

}



export const CarPicker = ({carSelect, setCarSelect}) => {




    const handleChange = (event:SelectChangeEvent) => {
        setCarSelect(event.target.value as string);
    }

    return (
        <div >
            <Select
                style={divStyle}
                value={carSelect}
                onChange={handleChange}
            >
                <MenuItem value={1}>Juno</MenuItem>
                <MenuItem value={2}>Idra</MenuItem>
                
            </Select>
        </div>
    )
}

export default CarPicker