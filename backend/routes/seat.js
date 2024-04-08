const express = require('express');
const router = express.Router();
const { getseatsbyshowId, postSeatsByShowId, patchSeatsByShowId } = require('../controller/seatController');

router.get('/getseatsbyshowId/:showId', getseatsbyshowId);
router.post('/postseatsbyshowId', postSeatsByShowId);
router.patch('/patchseatsbyshowId/:showId', patchSeatsByShowId); 

module.exports = router;
