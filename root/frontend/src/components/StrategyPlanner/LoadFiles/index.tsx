import React, { useEffect, useState, CSSProperties, createRef } from "react";
import { Close } from "@mui/icons-material"
import { Button } from "@mui/base";
import { xButtonStyle, titleStyle, statusStyle, headerStyle, buttonStyle } from "./styles"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const MAX_COUNT = 5;

export const LoadFile = ({setLoadFile, selectedFiles, setSelectedFiles}) => {
    
    const [status, setStatus] = useState("")
    const dofileDownload = createRef<HTMLAnchorElement>();
    const doFileUpload = createRef<HTMLInputElement>();
    const [downloadUrl, setDownloadUrl] = useState("");

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false); 
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    //use to update max 5 files
    const handleUploadFiles = files => {

      const uploaded = [...uploadedFiles];
      let limitExceeded = false;
    
      files.some((file) => {
        if (uploaded.findIndex((f) => f.name) === -1) { //not updates the same file
             uploaded.push(file);
             if (uploaded.length === MAX_COUNT) setFileLimit(true);
             if (uploaded.length > MAX_COUNT) {
                 alert("Exceeded the max");
                 setFileLimit(false)
                 limitExceeded = true;
                 return true
              }
        }
        setUploadedFiles(uploaded)
     
      })

      if (!limitExceeded) setUploadedFiles(uploaded)
      
    }

    const handleFileEvent = (e) => {
          
          const chosenFiles = Array.prototype.slice.call(e.target.files)
          handleUploadFiles(chosenFiles);

          setSelectedFiles(chosenFiles);   
          console.log(chosenFiles)
    }

    const closeWindow = () =>{
        //use to close the load file window
        setLoadFile(false);
    }

    //create the list with the uploaded files

    const useStyles = makeStyles((theme ) => ({
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    }));
    
    const classes = useStyles();
    
    
    const handleListItemClick = (element, index) => {
      //select the index from the array 
      selectedFiles.map((value) =>
    React.cloneElement(element, {
      key: index,
    
    }),
  );
      setSelectedIndex(index);

    };


    const handleDeleteClick = (index) => {
      //use to delete file in the list
      const uploadedFiles=[...selectedFiles]
      console.log(index)
      
      uploadedFiles.splice(index, 1);
      setSelectedFiles(uploadedFiles)
      console.log(uploadedFiles)
      
    }
      
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
                    <h1 style={titleStyle}> Load Files </h1>
                    <Button style={xButtonStyle} onClick = {closeWindow}> <Close /></Button>
                    <h1 style={statusStyle}>{status}</h1>
                </div>
       
                <input id="fileUpload" type="file" multiple
                  accept= ".csv"
                  onChange={handleFileEvent}
                  disabled={fileLimit} 
                />
                
                <div className={classes.root}>
                 <List component="nav">
                  
               { selectedFiles.map((file,index)  => {
                 return (
                 <ListItem
                  button
                  //selected={selectedIndex === 0}
                  //onClick={(event) => handleListItemClick(element, event, index)}
                 >
                 <ListItemIcon>
               </ListItemIcon>
          <ListItemText primary={file.name}/> 
          <DeleteIcon onClick={() => handleDeleteClick(index)}/>
        </ListItem>
                 );
          })}
        </List>
        </div>
                
       
        </div>
    )

}
export default LoadFile