const uniqueValidator = require('mongoose-unique-validator')

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userProfileSchema = new Schema({
    userFirstName: {type: String, required: false},
    userLastName: {type: String, required: false},
    userGender: {type: String, required: false},
    userBirthdate: {type: String, required: false},
    userHomeAddress: {type: String, required: false},
    userPhone: {type: String, required: false},
    userEmergencyPhone: {type: String, required: false}
})

const medicalProfileSchema = new Schema({
    userBloodGroup: {type: String, required: false},
    userHeight: {type: String, required: false},
    userPreExistingCondition: {type: String, required: false},
    userPreExistingSurgeries: {type: String, required: false},
    userBloodTransfusion: {type: String, required: false},
    userSmoke: {type: String, required: false},
    userDrugAbuse: {type: String, required: false},
    userAlcohol: {type: String, required: false},
})

const userSchema = new Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    email: {type: String, required: true, unique: true},
    userProfile: {type: [userProfileSchema], required: false, default: []},
    userMedicalProfile: {type: [medicalProfileSchema], required: false, default: []}
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)