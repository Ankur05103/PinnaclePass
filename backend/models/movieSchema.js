const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    movieId: {
        type: Number,
        unique: true
    },
    title:{
        type:String,
        required:true,
        unique:true,
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
    },
    posterImage:{
        type:String,
        required:true
    }
})



module.exports = mongoose.model('Movie',movieSchema)