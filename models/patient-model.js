const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bloodDonorSchema = new Schema({
    donorUserID: { type: String, required: true },
    donorName: { type: String, required: true },
    donorBloodGroup: { type: String, required: true },
    donorPhone: { type: String, required: true },
    DonorEligible: { type: Object, required: true }
});

const patientSchema = new Schema({
    userPosted: { type: String, required: true },
    patientName: { type: String, required: true },
    patientBloodGroup: { type: String, required: true },
    patientLocation: { type: String, required: true },
    patientContact: { type: String, required: true },
    blood_donors: { type: [bloodDonorSchema], required: false, default: [] } // Array of donors
});

module.exports = mongoose.model('Patient', patientSchema);
