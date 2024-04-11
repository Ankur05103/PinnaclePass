const express = require('express')
const router = express.Router()
const {makePayment,checkPaymentStatus}  = require('../controller/paymentController')

router.post("/makePayment/:showId/:seats",makePayment)
router.get("/status/:txnId/:showId/:seats",checkPaymentStatus)

module.exports = router