const Seat = require('../models/seatSchema')

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




const postSeatsByShowId = async (req, res) => {
    const { showId, seatNumbers } = req.body;

    try {
        // Create an array to store the newly created seats
        const createdSeats = [];

        // Iterate through the provided seat numbers
        for (const seatNumber of seatNumbers) {
            // Create a new seat object
            const newSeat = new Seat({
                show: showId,
                seatNumber,
                isBooked: false
            });

            // Save the new seat to the database
            const createdSeat = await newSeat.save();

            // Push the created seat to the array
            createdSeats.push(createdSeat);
        }

        // Respond with the array of created seats
        res.status(201).json(createdSeats);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
}

const patchSeatsByShowId = async (req, res) => {
    const { showId } = req.params; 
    const { seatNumber } = req.body;

    try {
        const response = await Seat.findOneAndUpdate({ show: showId, seatNumber }, { isBooked: true });

        if (!response) {
            return res.status(404).json({ message: 'Seat not found' });
        }

        res.status(200).send('Seat updated successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getseatsbyshowId, postSeatsByShowId, patchSeatsByShowId };



