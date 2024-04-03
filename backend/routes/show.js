const express = require('express')

const router = express.Router()

//controller functions
const { getshowsbyMovieId, postShow, getShow } = require( '../controller/showController')

// getTheater router
router.get('/getshowsbyMovieId/:movieId',getshowsbyMovieId)
router.post('/postShow',postShow)
router.get('/getShow/:_id',getShow)

module.exports = router