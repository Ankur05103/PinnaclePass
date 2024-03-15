const express = require('express')

const router = express.Router()

//controller functions
const { postTheaters, getTheaters } = require( '../controller/theaterController')

// getTheater router
router.post('/postTheaters',postTheaters)
router.get('/getTheater',getTheaters)

module.exports = router