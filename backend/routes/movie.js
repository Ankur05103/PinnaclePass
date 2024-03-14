const express = require('express')

const router = express.Router()

//controller functions
const { getMovies,postMovie } = require( '../controller/movieController')

// getMovie router
router.get('/getMovie',getMovies)
router.post('/postMovie',postMovie)

module.exports = router