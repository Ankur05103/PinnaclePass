const express = require('express')

const router = express.Router()

//controller functions
const { postTheaters } = require( '../controller/theaterController')

// getTheater router
router.post('/postTheaters',postTheaters)

module.exports = router