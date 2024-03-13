const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Movie = mongoose.model('Movie', movieSchema);

app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST endpoint to add a new movie
app.post('/movies', async (req, res) => {
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
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});