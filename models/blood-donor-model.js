const mongoose = require('mongoose')

const Schema = mongoose.Schema


const bloodDonerSchema = new Schema({
    user_id: {type: String, required: true},
    donorName: {type: String, required: true},
    blood_group: {type: String, required: true}
})

module.exports = mongoose.model("BloodDoner", bloodDonerSchema);