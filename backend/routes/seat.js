const express = require('express')

const router = express.Router()

//controller functions
const { getseatsbyshowId } = require( '../controller/seatController')

// getTheater router
router.get('/getseatsbyshowId/:showId',getseatsbyshowId)

module.exports = router