const Movie = require('../models/movieSchema')

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getMoviebyId = async (req, res) => {
    const movieId = req.params.id;

    try {
        const movie = await Movie.findOne({ _id: movieId });
        
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const postMovie = async (req, res) => {
    const { title, category, genre, languages, description ,posterImage,movieId} = req.body;

    if (!title || !category || !languages || !description) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newMovie = new Movie({
            movieId,
            title,
            category,
            genre,
            languages,
            description,
            posterImage
        });

        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {getMovies, postMovie,getMoviebyId}
