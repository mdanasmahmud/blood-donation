const mongoose = require('mongoose')

const Schema = mongoose.Schema

const patientSchema = new Schema({
    userPosted: {type: String, required: true},
    patientName:{type: String, required: true},
    patientBloodGroup: {type: String, required: true},
    patientLocation: {type: String, required: true},
    patientContact: {type: String, required: true}
})

module.exports = mongoose.model('Patient', patientSchema)