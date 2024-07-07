const mongoose = require('mongoose')

const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    user_id: {type: String, required: true},
    patientName: {type: String, required: true},
    preferredTime: {type: String, required: true},
    patientLocationText: {type: String, required: true},
    patientPhone: {type: String, required: true},
    patientBloodGroup: {type: String, required: true},
    status: {type: String, required: true}

})

module.exports = mongoose.model('Appointment', appointmentSchema);