const Show = require('../models/showSchema')

const getshowsbyMovieId = async (req, res) => {
    const movieId = req.params.movieId;

    try {
        // Find shows associated with the given theater ID
        const shows = await Show.find({ movie: movieId });

        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getShow = async(req, res) => {
    const _id = req.params._id;

    try {
        // Find shows associated with the given theater ID
        const shows = await Show.find({ _id: _id });

        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postShow = async (req,res) => {
    const { theater, movie, startTime } = req.body;

    try {
        // Create a new show instance
        const newShow = new Show({
            theater: theater,
            movie: movie,
            startTime
        });

        // Save the new show to the database
        const savedShow = await newShow.save();

        res.status(201).json(savedShow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {getshowsbyMovieId,postShow,getShow}

