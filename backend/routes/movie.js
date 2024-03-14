const express = require('express')

const router = express.Router()

//controller functions
const { getMovies,postMovie, getMoviebyId } = require( '../controller/movieController')

// getMovie router
router.get('/getMovie',getMovies)
router.post('/postMovie',postMovie)
router.get('/getMoviebyId/:id',getMoviebyId)

module.exports = router