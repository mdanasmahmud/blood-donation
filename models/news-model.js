const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newsSchema = new Schema({
    newsTitle: {type: String, required: true},
    shortDescription:{type: String, required: true},
    newsDate:{type: String, required: true},
    newsDescription:{type: String, required: true},
    newsAuthor:{type: String, required: true}
})

module.exports = mongoose.model("News", newsSchema)