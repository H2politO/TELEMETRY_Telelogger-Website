const express = require("express");
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const exp = require("constants");
const process = require('process');
const multer = require('multer')

let PORT = 3000;

//Dynamic port with command line first argument
if(process.argv[2] != undefined){
    PORT = parseInt(process.argv[2]);
}

//Setup express
const app = express(); 
const upload = multer({ dest: 'http://localhost:3000/'});

//Allow cross origin reference (to remove in production version)
app.use(cors());

//Setup post reception for text


//Load the juno file
app.post(["/JunoFile/:fileName"], (req, res) =>{
    
    console.log("Recieved file, name : " + req.params.fileName)
    fs.writeFile("./data/juno.csv", req.body, "utf8", ()=>{ res.send("") } //Write the file, then send response
)});

//Send the juno file
app.get(["/JunoFile"], (req, res) =>{
    console.log("Recieved request")
    if(fs.existsSync("./data/juno.csv")){
        res.sendFile(path.join(__dirname, './data/', 'juno.csv'));
    }
});

//Load the idra file
app.post(["/IdraFile/:fileName"], (req, res) =>{
    console.log("Recieved file, name : " + req.params.fileName)
    fs.writeFile("./data/idra.csv", req.body, "utf8", ()=>{ res.send("") } //Write the file, then send response
)});

//Send the idra file
app.get(["/IdraFile"], (req, res) =>{
    console.log("Recieved request")
    if(fs.existsSync("./data/idra.csv")){
        res.sendFile(path.join(__dirname, './data/', 'idra.csv'));
    }
});

//Send assets
app.use(express.static('../frontend/dist'))

//Send to all get requests the main page
app.get(['/', '/*'], (req, res) => {
    
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log("Listen on the port " + PORT);
});