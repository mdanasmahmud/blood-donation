const uniqueValidator = require('mongoose-unique-validator')

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    email: {type: String, required: true, unique: true}
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)