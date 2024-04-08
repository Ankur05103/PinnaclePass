const express = require('express')
const router = express.Router()
const {makePayment,checkPaymentStatus}  = require('../controller/paymentController')

router.post("/makePayment",makePayment)
router.post('/status/:txnId',checkPaymentStatus)

module.exports = router