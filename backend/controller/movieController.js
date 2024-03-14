const Movie = require('../models/movieSchema')

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postMovie = async (req, res) => {
    const { title, category, genre, languages, description } = req.body;

    if (!title || !category || !languages || !description) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newMovie = new Movie({
            title,
            category,
            genre,
            languages,
            description
        });

        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {getMovies, postMovie}
