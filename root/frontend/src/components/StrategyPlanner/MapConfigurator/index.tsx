import { useRef, createRef, useEffect, useState } from "react";
import { Close, AutoAwesomeMotion} from "@mui/icons-material"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from "@mui/base";
import { Divider, OutlinedInput, InputAdornment } from "@mui/material";

import Cookies from 'universal-cookie';  
import { Coord } from "../types";
import * as Styles from "./styles"
import { map } from "leaflet";


declare const L: any


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', description: 'Point ID', sortable: true, type: 'number',   },
    { field: 'strategy', headerName: 'Strategy', description: 'Strategy for point', sortable: false, editable: true, type: 'number',  },
    { field: 'sector', headerName: 'Sector', description: 'Sector for point', sortable: false, editable: true, type: 'number', }
  ];


const cookies = new Cookies();


export const MapConfigurator = ({setBlkConfigEn, setMapConfigEn, mapData, setMapData}) => {


    const closeWindow = () =>{
        setBlkConfigEn(false);
        setMapConfigEn(false);
    }

    useEffect(()=>{
        console.log("mapDataChange",mapData )
    }, [mapData])

    
    return (
        <div style={Styles.rootStyle}>

            <div className="dragHandle" id="header" style={Styles.headerStyle}>
                <h1 style={Styles.titleStyle}>Map Setup</h1>                
                <Button style={Styles.xButtonStyle} onClick={closeWindow}> <Close/></Button>
                <Button style={Styles.leftButtonStyle} onClick={()=>setBlkConfigEn(true)}> <AutoAwesomeMotion/> Bulk Edit</Button>
            </div>

            <Divider  sx={{ position: "relative", top: "-20px", bgcolor: "black", width:"100%", stroke:"1px" }} ></Divider>

            <div id="main" style={Styles.baseStyle}>
                <DataGrid
                    rows={mapData}
                    columns={columns}

                    rowSelection={false}

                    processRowUpdate={(updatedRow, originalRow) =>{
                        let tmp = mapData.map(obj => ({...obj}));
                        tmp[originalRow.id] = updatedRow;
                        setMapData(tmp);
                        return updatedRow;
                    }}
                    onProcessRowUpdateError={(err)=>console.error("Error modifying row", err)}

                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'id', sort: 'asc' }],
                          },
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10,50,100]}
                />
            </div>
        </div>
    )
}

export default MapConfigurator