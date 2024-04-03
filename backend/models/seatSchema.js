const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
    show: {
        type: Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Seat', seatSchema);
