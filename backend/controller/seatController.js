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


// const Seat = require('../models/Seat');

// const postSeatsByShowId = async (req, res) => {
//     const { showId, seatNumbers } = req.body;

//     try {
//         // Create an array to store the newly created seats
//         const createdSeats = [];

//         // Iterate through the provided seat numbers
//         for (const seatNumber of seatNumbers) {
//             // Create a new seat object
//             const newSeat = new Seat({
//                 seatNumber,
//                 show: showId,
//                 status: 'available' // Assuming all seats are initially available
//             });

//             // Save the new seat to the database
//             const createdSeat = await newSeat.save();

//             // Push the created seat to the array
//             createdSeats.push(createdSeat);
//         }

//         // Respond with the array of created seats
//         res.status(201).json(createdSeats);
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({ message: error.message });
//     }
// }

// module.exports = { postSeatsByShowId };


