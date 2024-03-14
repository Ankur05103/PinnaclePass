const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const showSchema = require('./showSchema')

const theaterSchema = new Schema({
    theaterName:{
        type:String,
        required:true
    },
    theaterLocation:{
        type:String,
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
})

module.exports = mongoose.model('Theater',theaterSchema)


// theater = {
//     name;
//    location;
//    show = [show(time ani seat)] // mhanje multiple show
//    }
   
//    show = {
//     date;
//    time;
//    seats = [seat];
//    }
   
//    seat = {
//     number;
//    reserved;
//    }