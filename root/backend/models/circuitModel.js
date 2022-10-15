const { timeStamp } = require('console')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const circuitSchema = new Schema ({

    name: {
        type: String,
        required: true
    },

    length: {
        type: Number,
        required: true
    },

    dateTime: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Circuit', circuitSchema);

