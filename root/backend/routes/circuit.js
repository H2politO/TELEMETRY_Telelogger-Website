const express = require('express')
const router = express.Router()

const {
    createCircuit,
    getCircuits
} = require('../controllers/circuitController')


router.post('/postCircuit', createCircuit);

router.get('/getCircuits', getCircuits);

module.exports = router
