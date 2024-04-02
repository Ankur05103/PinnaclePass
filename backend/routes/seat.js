const express = require('express')

const router = express.Router()

//controller functions
const { getseatsbyshowId, postSeatsByShowId } = require( '../controller/seatController')

// getTheater router
router.get('/getseatsbyshowId/:showId',getseatsbyshowId)
router.post('/postseatsbyshowId',postSeatsByShowId)

module.exports = router