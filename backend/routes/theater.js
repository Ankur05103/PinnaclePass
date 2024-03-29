const express = require('express')

const router = express.Router()

//controller functions
const { postTheaters, getTheaters, getTheaterById } = require( '../controller/theaterController')

// getTheater router
router.post('/postTheaters',postTheaters)
router.get('/getTheater',getTheaters)
router.get('/getTheaterbyId/:theaterId',getTheaterById)

module.exports = router