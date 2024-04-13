const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    merchantTransactionId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['SUCCESS', 'FAILURE'],
    },
    paymentAmount: {
        type: Number,
        required: true,
    },
    paymentInstrumentType: {
        type: String,
        required: true,
    },
    paymentTransactionId: {
        type: String,
        required: true,
    },
    paymentTime: {
        type: Date,
        required: true,
    },
    showId : {
        type : String,
        required: true,
    },
    selectedSeats:{
        type : [String],
        required: true,
    }
});

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;

module.exports = mongoose.model('Order', orderSchema);