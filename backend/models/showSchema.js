const mongoose = require('mongoose')
const Schema = mongoose.Schema

const showSchema = new Schema({
    theater: {
        type: Schema.Types.ObjectId,
        ref: 'Theater',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('Show',showSchema)