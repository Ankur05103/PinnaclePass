const express = require('express')

const router = express.Router()

//controller functions
const { gettheatersbyMovieId } = require( '../controller/theaterController')

// getTheater router
router.get('/getTheatersbyMovieId/:movieId',gettheatersbyMovieId)

module.exports = router