// const Seat = require('../models/seatSchema')

const getseatsbyshowId = async (req, res) => {
    const showId = req.params.showId;

    try {
        // Find seats associated with the given show ID
        const seats = await Seat.find({ show: showId });

        res.json(seats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {getseatsbyshowId}

