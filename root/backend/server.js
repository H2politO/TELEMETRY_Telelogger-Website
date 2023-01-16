const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()
//all the routes are located inside routes/runs file
const circuitRoutes = require('./routes/circuit')
const circuitModel = require('./models/circuitModel')

var bodyParser = require('body-parser')

//express app
const app = express();
app.use(bodyParser.json())

mongoose.connect(process.env.MONGOOSE_URI)
    .then(() => {
        //listen to port number 3000 ONLY afer the connection to the database
        app.listen(process.env.PORT, () => {
            console.log('Connected to database, listening for requests');
        })
    })
    .catch((err) => {
        console.error(err)
    })

//Goes to circuitRoutes when the path is the one that matches the string inside
app.use('/circuit' , circuitRoutes)

//middleware to log all the requests and where they come from
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})


//the first paramether is to use the runRoutes only when the route /api/runs is invoked
//app.use('/', circuit)




