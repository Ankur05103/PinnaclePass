const Theater = require('../models/theatreSchema')


const getTheaters = async(req, res) => {
    try {
        const theaters = await Theater.find();
        res.status(200).json(theaters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postTheaters = async (req,res) => {
    const { theaterName, theaterLocation } = req.body;

    try {
        // Create a new theater instance
        const newTheater = new Theater({
            theaterName,
            theaterLocation
        });

        // Save the new theater to the database
        const savedTheater = await newTheater.save();

        res.status(201).json(savedTheater);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const getTheaterById = async (req, res) => {
    try {
        // Extract theater ID from request parameters
        const theaterId = req.params.theaterId;

        // Query the database for the theater with the given ID
        const theater = await Theater.findById(theaterId);

        // If theater is not found, return 404 Not Found
        if (!theater) {
            return res.status(404).json({ message: 'Theater not found' });
        }

        // If theater is found, return it
        res.status(200).json(theater);
    } catch (error) {
        // If an error occurs, return 500 Internal Server Error
        res.status(500).json({ message: error.message });
    }
};


module.exports = {getTheaters, postTheaters,getTheaterById}

