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


module.exports = {getTheaters, postTheaters}

