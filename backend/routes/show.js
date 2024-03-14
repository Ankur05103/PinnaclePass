const express = require('express')

const router = express.Router()

//controller functions
const { getshowsbyTheaterId } = require( '../controller/showController')

// getTheater router
router.get('/getshowsbyTheaterId/:theaterId',getshowsbyTheaterId)

module.exports = router