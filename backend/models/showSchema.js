const mongoose = require('mongoose')
const Schema = mongoose.Schema

const showSchema = new Schema({
    theater: {
        type: Schema.Types.ObjectId,
        ref: 'Theater',
        required: true
    },
    movie:{
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('Show',showSchema)