/*
Inside the controllers it is present all the functions and code that is called from the models;
It is put everything inside the controllers in order to have a cleaner code inside the model folder
*/

const circuitModel = require('../models/circuitModel')

//Create a new circuit
const createCircuit = async (req, res) => {

    console.log('Richiesta ricevuta')
    console.log(req.body)
    const { name, length, dateTime } = req.body;

    try {
        const circuit = await circuitModel.create({ name, length, dateTime })
        res.status(200).json(circuit)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Get all the available circuits
const getCircuits = async (req, res) => {
    const circuits = await circuitModel.find({}).sort({createdAt: -1})
    res.status(200).json(circuits)
    
}



//Remember to export the functions that you want to use in the model
module.exports = {
    createCircuit,
    getCircuits
}