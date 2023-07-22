import {CSSProperties} from "react"

export const rootStyle:CSSProperties = {
    position: "absolute",
    top: "10%",
    right: "0",
    bottom: "0",
    left: "0",
    margin: "auto",

    zIndex: "10",
    width: "70%",
    height: "80%",
    borderRadius: "20px",
    
    background: "solid",
    backgroundColor: "white",
}

export const baseStyle:CSSProperties = {
    
    top: "10%",
    right: "0",
    bottom: "0",
    left: "0",
    
    height: "90%",
    width: "100%",

    margin: "auto",
    zIndex: "10",
    display: "flex"
}

export const headerStyle:CSSProperties = {
    display: "block"
}

export const mapPreviewStyle:CSSProperties = {
    textAlign: "center",
    width: "99%",
    height: "80%",
}

export const titleStyle:CSSProperties = {
    
    textAlign: "center",
    display:"block",
    color: "green",
    height: "30px",
    fontSize: "30px",
    width: "100%"
}

export const statusStyle:CSSProperties = {
    position: "relative",
    top: "-30px",
    right: "10px",
    left: "-30px",

    height: "30px",
    lineHeight: "30px",

    textAlign: "center",
    
    color: "black",
    fontSize: "15px",
    
    float: "right",
}

export const xButtonStyle:CSSProperties = {
    position: "relative",
    top: "-30px",
    right:"10px",
    
    height: "30px",

    color:"red",
    border:"solid",
    borderRadius: "10px",
    borderColor: "black",
    borderWidth: "1px",
    
    float: "right",
}

export const centralColumnStyle: CSSProperties = {
    flexGrow: "1",
    padding: "20px",
    height: "100%",
    background:"solid",
    textAlign: "center"
}

export const rightColumnStyle: CSSProperties = {
    flexGrow: "1",
    height: "100%",
    width: "250px",
    padding: "20px",
    background:"solid",
    textAlign: "center"
}

export const leftColumnStyle: CSSProperties = {
    flexGrow: "4",
    width: "100%",
    height: "100%",
    background:"solid",
    textAlign: "center"
}

export const buttonStyle:CSSProperties = {
    
    width: "150px",
    height: "50px",
    border: "solid",
    borderWidth: "2px",
    backgroundColor: "grey",
    display: "block"
}

