const theater = require('../models/theatreSchema')

const gettheatersbyMovieId = async (req, res) => {
    const movieId = req.params.movieId;

    try {
        // Find theaters associated with the given movie ID
        const theaters = await theater.find({ movie: movieId });

        res.json(theaters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {gettheatersbyMovieId}

