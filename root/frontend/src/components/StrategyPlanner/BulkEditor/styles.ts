import {CSSProperties} from "react"

export const rootStyle:CSSProperties = {
    position: "absolute",
    top: "12%",
    right: "0",
    bottom: "0",
    left: "-80%",
    margin: "auto",

    zIndex: "10",
    width: "20%",
    height: "40%",
    borderRadius: "20px",
    
    background: "solid",
    backgroundColor: "white",
    textAlign: "center",
}

export const baseStyle:CSSProperties = {
    
    top: "10%",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    height: "90%",
    width: "100%",

    margin: "auto",
    zIndex: "10",
}

export const headerStyle:CSSProperties = {
    display: "block"
}

export const titleStyle:CSSProperties = {
    
    textAlign: "center",
    display:"block",
    color: "green",
    height: "30px",
    fontSize: "30px",
    width: "100%"
}

export const xButtonStyle:CSSProperties = {
    position: "relative",
    top: "-27px",
    right:"10px",
    
    height: "30px",

    color:"red",
    border:"solid",
    borderRadius: "10px",
    borderColor: "black",
    borderWidth: "1px",
    
    float: "right",
}

export const leftButtonStyle:CSSProperties = {
    position: "relative",
    top: "-27px",
    left:"10px",
    
    height: "30px",

    color:"black",
    border:"solid",
    borderRadius: "10px",
    borderColor: "black",
    borderWidth: "1px",
    
    float: "left",
}


export const rightColumnStyle: CSSProperties = {
    flexGrow: "1",
    height: "80%",
    width: "100%",
    padding: "20px",
    background:"solid",
    textAlign: "center",
    

}

export const leftColumnStyle: CSSProperties = {
    flexGrow: "1",
    height: "80%",
    width: "100%",
    padding: "20px",
    background:"solid",
    textAlign: "center",
    
}

export const buttonStyle:CSSProperties = {
    top: "-100px",
    width: "50px",
    height: "50px",
    border: "solid",
    color: "black",
    backgroundColor: "white",
    
}