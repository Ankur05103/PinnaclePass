const merchantId = "PGTESTPAYUAT";
const paymentURL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
const crypto = require("crypto");
const axios  = require('axios');
const Order = require("../models/orderSchema");

function generateTransactionId() {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000000);
  const merchantPrefix = merchantId.slice(0, 4);
  const transactionId = `${merchantPrefix}${timestamp}${randomNumber}`;

  return transactionId;
}

const makePayment = async (req, res) => {
  try {
    const mTxnId =  generateTransactionId();
    const showId = req.params.showId;
    const selectedSeats = req.params.seats;
    const { amount } = req.body;
    const data = {
      merchantId: merchantId,
      merchantTransactionId:mTxnId,
      merchantUserId: "MUID123",
      amount: amount,
      redirectUrl:`http://localhost:4003/Booking/ticket/${mTxnId}/${showId}/${selectedSeats}`,
      // `http://localhost:4003/api/payment/status/${mTxnId}`,
      redirectMode: "REDIRECT",
      // callbackUrl: "https://webhook.site/callback-url",
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
    const sha256 = crypto.createHash("sha256").update(str).digest('hex');

    const checkSum = sha256 + "###" + keyIndex;

    const options = {
      method: "post",
      url: paymentURL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        'X-VERIFY': checkSum
      },
      data: {
        request:base64Payload
      },
    };

    axios
      .request(options)
      .then(async function (response) {
        console.log("Payment API Response:", response.data);
        return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url);
      })
      .catch(function (error) {
        console.error("Payment API Error:", error.message);
        res.status(500).json({ msg: "Payment Failed", status: "error", error: error.message });
    });

  } catch (err) {
    console.error("Internal Server Error:", err.message);
    res.status(500).json({ msg: "Internal Server Error", status: "error", error: err.message });
  }
};


const checkPaymentStatus = async (req, res) => {
  const showId = req.params.showId;
  const selectedSeats = req.params.seats;
  const merchantTransactionId = req.params.txnId;
  console.log("merchantTransactionId :- ",merchantTransactionId); 
  console.log("here 1 in checkPaymentStatus");
  try {
      const key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";

      const keyIndex = 1;
      const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + key;
      const sha256 = crypto.createHash("sha256").update(string).digest('hex');
      const checksum = sha256 + "###" + keyIndex;

      const URL = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`;

      const options = {
          method: 'GET',
          url: URL,
          headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              'X-VERIFY': checksum,
              'X-MERCHANT-ID': merchantId,
          },
      };
      axios.
        request(options)
        .then(function (response) {
          console.log(response.data);
          // res.send(response.data);
        })
        .catch(function (err) {
          console.error(err);
        });


      console.log("Status API Request Options:", options);

      try {
          const response = await axios.request(options);
          console.log("here 3 aaaa",response.data);

          if (response.data.data.responseCode === 'SUCCESS') {
            console.log("here 4 aaaa",response.data);
              // Create a new order instance
              const newOrder = new Order({
                  merchantTransactionId,
                  status: 'SUCCESS',
                  paymentAmount: response.data.data.amount,
                  paymentInstrumentType: response.data.data.paymentInstrument.type,
                  paymentTransactionId: response.data.data.transactionId,
                  paymentTime:  Date.now(),
                  showId: showId,
                  selectedSeats:selectedSeats
              });
              console.log("here 5 aaaa",response.data);

              // Save the new order to the database
              await newOrder.save();
              console.log("here 6 aaaa",response.data);

              // Redirect to the success URL
              // const url = "http://localhost:4300/success";
              // return res.redirect(url);
      console.log("here 7 aaaa",response.data);
              res.send(newOrder);
              console.log("here 8 aaaa",response.data);
          } else {
            console.log("here 9 aaaa",response.data);
              // Redirect to the failure URL
              const url = `http://localhost:4300/failure`;
              // return res.redirect(url);
              res.send(response.data);
          }
      } catch (error) {
          console.log("Status API Error:", error.message);
          console.log("Status API Error Response:", error.response.data);
          res.status(500).json({ msg: "Error checking payment status", status: "error", error: error.message });
      }

  } catch (error) {
      console.error("Internal Server Error:", error.message);
      res.send({error: "error"});
      // res.status(500).json({ msg: "Internal Server Error", status: "error", error: error.message });
  }
};


module.exports = {makePayment,checkPaymentStatus}
