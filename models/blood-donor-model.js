const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bloodDonorSchema = new Schema({
    user_id: {type: String, required: true},
    donorName: {type: String, required: true},
    blood_group: {type: String, required: true},
    donorPhone: {type: String, required: true},
    location: {
        type: [Number],
        required: true
    }
});

module.exports = mongoose.model("BloodDonor", bloodDonorSchema);