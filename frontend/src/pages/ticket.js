import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TicketDetails = () => {
  const { txnId , showId, seats}= useParams();

  const [paymentData, setPaymentData] = useState(null);

  const fetchPaymentStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:4002/api/payment/status/${txnId}/${showId}/${seats}`);
      setPaymentData(response.data);

      if(paymentData.status === "SUCCESS"){
        reserveSeats(seats);
      }


    } catch (error) {
      console.log('Error fetching payment status:', error);
    }
  };

  const reserveSeats = async (seats) => {
    // console.log(seats);
    try {
      for (var i = 0; i < seats.length; i++) {
        // console.log(_id);
        const response = await axios.patch(
          `/api/seat/patchseatsbyshowId/${showId}`,
          { showId, seatNumber: seats[i] }
        );
        console.log("reserve seats response :- ",response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };


  // useEffect(() => {

  //   fetchPaymentStatus();
  // }, [paymentStatus]);

  return (
    <div>
      <h2>Tickets Booked Successfully</h2>
      <p>Thank you for booking your tickets. Enjoy the show!</p>
      <button onClick={fetchPaymentStatus}>Check Payment Status</button>
      {
        (paymentData) && <p>{JSON.stringify(paymentData)}</p> 
      }
    </div>
  );
};

export default TicketDetails;