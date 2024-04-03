const merchantId = "PGTESTPAYUAT";
const paymentURL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
const crypto = require("crypto");
const axios  = require('axios');


function generateTransactionId() {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000000);
  const merchantPrefix = merchantId.slice(0, 4);
  const transactionId = `${merchantPrefix}${timestamp}${randomNumber}`;

  return transactionId;
}

const makePayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const data = {
      merchantId: merchantId,
      merchantTransactionId: generateTransactionId(),
      merchantUserId: "MUID123",
      amount: amount,
      redirectUrl: "https://webhook.site/redirect-url",
      redirectMode: "REDIRECT",
      callbackUrl: "https://webhook.site/callback-url",
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
        const phonePeTransactionId = response.data.transactionId;
            res.status(201).send({
                    msg: "payment done",
                    status: "success",
                    data: response.data,
                    phonePeTransactionId: phonePeTransactionId,
                });
                console.log("Payment API Response:", response.data);
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
    try {
        const merchantTransactionId = req.params.txnId;
        const merchantUserId = merchantId;  
        const key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";

        const keyIndex = 1;
        const string = `/pg/v1/status/${merchantUserId}/${merchantTransactionId}` + key;
        const sha256 = crypto.createHash("sha256").update(string).digest(hex);
        const checksum = sha256 + "###" + keyIndex;

        const URL = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantUserId}/${merchantTransactionId}`;

        const options = {
            method: 'GET',
            url: URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': merchantUserId,
            }
        };

        console.log("Status API Request Options:", options);

        try {
            const response = await axios.request(options);

            if (response.data.data.responseCode === 'SUCCESS') {
               
                // Create a new order instance
                const newOrder = new Order({
                    name: this.name,  
                    phone: this.phone,  
                    email: this.email,  
                    transactionId: merchantTransactionId,
                    paymentStatus: response.data.data.responseCode,
                    price: this.price,  
                    user: this.user, 
                    dateOrdered: Date.now(),
                });

                // Save the new order to the database
                await newOrder.save();

                // Redirect to the success URL
                const url = "http://localhost:4200/success";
                return res.redirect(url);
            } else {
                // Redirect to the failure URL
                const url = `http://localhost:4200/failure`;
                return res.redirect(url);
            }
        } catch (error) {
            console.error("Status API Error:", error.message);
            console.error("Status API Error Response:", error.response.data);
            res.status(500).json({ msg: "Error checking payment status", status: "error", error: error.message });
        }
    } catch (error) {
        console.error("Internal Server Error:", error.message);
        res.status(500).json({ msg: "Internal Server Error", status: "error", error: error.message });
    }
};

module.exports = {makePayment,checkPaymentStatus}
