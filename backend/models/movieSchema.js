const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
    },
    languages:{
        type:[String],
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Movie',movieSchema)