// const show = require('../models/showSchema')

const getshowsbyTheaterId = async (req, res) => {
    const theaterId = req.params.theaterId;

    try {
        // Find shows associated with the given theater ID
        const shows = await Show.find({ theater: theaterId });

        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {getshowsbyTheaterId}

