/* Add all the apis to be called for the database */

const express = require('express')

const router = express.Router()

//GET all runs
router.get('/', (req, res) => {
    res.json({mssg: 'GET all run info'})
})

//GET single workout
router.get('/:id', (req,res) => {
    res.json({mssg: 'GET a single run info'})
})

module.exports=router

/*
//respond to get requests on routes, go on localhost3000 and check the response
app.get('/', (req, res) => {
    res.json({mssg: 'welcome to the app'})
})
*/