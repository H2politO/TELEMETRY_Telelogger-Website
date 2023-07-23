const express = require("express");
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const exp = require("constants");

const app = express();

app.use(cors());

app.get(["/"], (req, res) =>{

});


//Setup post reception for text
app.use(express.text());

app.post(["/JunoFile"], (req, res) =>{
    console.log("Recieved file")
    fs.writeFile("./data/juno.csv", req.body, "utf8", ()=>{ res.send("") } //Write the file, then send response
)});

app.get(["/JunoFile"], (req, res) =>{
    console.log("Recieved request")
    if(fs.existsSync("./data/juno.csv")){
        res.sendFile(path.join(__dirname, './data/', 'juno.csv'));
    }
});

//Send assets
app.use(express.static('../frontend/dist'))


//Send to all get requests the main page
app.get(['/', '/*'], (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});