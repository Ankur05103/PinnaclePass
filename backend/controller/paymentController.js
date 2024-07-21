const merchantId = "PGTESTPAYUAT";
const paymentURL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
const crypto = require("crypto");
const axios = require("axios");
const Order = require("../models/orderSchema");

function generateTransactionId() {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000000);
  const merchantPrefix = merchantId.slice(0, 4);
  return `${merchantPrefix}${timestamp}${randomNumber}`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeRequestWithRetry(options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.request(options);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 429 && i < retries - 1) {
        const retryAfter = error.response.headers['retry-after'] || 1;
        console.log(`Retrying in ${retryAfter} seconds...`);
        await sleep(retryAfter * 1000);
      } else {
        throw error;
      }
    }
  }
}

const makePayment = async (req, res) => {
  try {
    const mTxnId = generateTransactionId();
    const showId = req.params.showId;
    const selectedSeats = req.params.seats;
    const { amount } = req.body;
    const data = {
      merchantId: merchantId,
      merchantTransactionId: mTxnId,
      merchantUserId: "MUID123",
      amount: amount,
      redirectUrl: `http://localhost:4003/Booking/ticket/${mTxnId}/${showId}/${selectedSeats}`,
      redirectMode: "REDIRECT",
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payload = JSON.stringify(data);
    const base64Payload = Buffer.from(payload).toString("base64");
    const saltKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const keyIndex = 1;

    const str = base64Payload + "/pg/v1/pay" + saltKey;
    const sha256 = crypto.createHash("sha256").update(str).digest("hex");

    const checkSum = sha256 + "###" + keyIndex;

    const options = {
      method: "post",
      url: paymentURL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checkSum,
      },
      data: {
        request: base64Payload,
      },
    };

    const response = await makeRequestWithRetry(options);
    console.log("Payment API Response:", response.data);
    res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url);

  } catch (error) {
    console.error("Payment API Error:", error.message);
    res.status(500).json({ msg: "Payment Failed", status: "error", error: error.message });
  }
};

const checkPaymentStatus = async (req, res) => {
  const showId = req.params.showId;
  const selectedSeats = req.params.seats;
  const merchantTransactionId = req.params.txnId;

  try {
    const key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const URL = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`;

    const options = {
      method: "GET",
      url: URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    };

    const response = await makeRequestWithRetry(options);

    if (response.data.data.responseCode === "SUCCESS") {
      const newOrder = new Order({
        merchantTransactionId,
        status: "SUCCESS",
        paymentAmount: response.data.data.amount,
        paymentInstrumentType: response.data.data.paymentInstrument.type,
        paymentTransactionId: response.data.data.transactionId,
        paymentTime: Date.now(),
        showId: showId,
        selectedSeats: selectedSeats,
      });

      await newOrder.save();
      res.send(newOrder);
    } else {
      res.status(400).send(response.data);
    }

  } catch (error) {
    console.error("Status API Error:", error.message);
    res.status(500).json({ msg: "Error checking payment status", status: "error", error: error.message });
  }
};

module.exports = { makePayment, checkPaymentStatus };
