const express = require('express')

const router = express.Router()

//controller functions
const { getshowsbyMovieId, postShow } = require( '../controller/showController')

// getTheater router
router.get('/getshowsbyMovieId/:movieId',getshowsbyMovieId)
router.post('/postShow',postShow)

module.exports = router