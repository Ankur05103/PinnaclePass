import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TicketDetails = () => {
  const currentUrl = window.location.href;

const pathParts = currentUrl.split('/');

const seatInfo = pathParts[pathParts.length - 1];

const seats = seatInfo.split(',');

  const { txnId , showId, seatss}= useParams();

  const [paymentData, setPaymentData] = useState(null);


  const fetchPaymentStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:4002/api/payment/status/${txnId}/${showId}/${seats}`);
      const paymentData = response.data;
      setPaymentData(paymentData);
  
      // Check the status after setting paymentData
      if (paymentData.status === "SUCCESS") {
        reserveSeats(seats); // Call reserveSeats if status is SUCCESS
      }
    } catch (error) {
      console.log('Error fetching payment status:', error.message);
    }
  };
  

  const reserveSeats = async (seats) => {
    try {
      for (var i = 0; i < seats.length; i++) {
        const response = await axios.patch(
          `/api/seat/patchseatsbyshowId/${showId}`,
          { showId, seatNumber: seats[i] }
        );
        // console.log("reserve seats response :- ",response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchPaymentStatus(); 
  }, []);

  return (
    <div>
      <h2>Tickets Booked Successfully</h2>
      <p>Thank you for booking your tickets. Enjoy the show!</p>
      
    </div>
  );
};

export default TicketDetails;