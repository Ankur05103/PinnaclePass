import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormatDateTime from "../components/date";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-hot-toast"
import "../styles/Seating.css";

const Seating = (props) => {
  const { _id } = useParams();
  const { user } = useAuthContext()
  let myseats;
  // const date = new Date();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [show, setShow] = useState([]);
  const seatPrice = 100; //price hardcode ahe te change karayla lagnar

  const handleBookNowClick = async () => {
    try {
      if(user){
      const amount = seatPrice * 100 * selectedSeats.length; // You can set the amount dynamically or fetch it from somewhere
      const response = await axios.post(`/api/payment/makePayment/${_id}/${selectedSeats}`, { amount });
      const paymentUrl = response.data; // Assuming redirectUrl is provided in the response

      // Redirect to the payment URL
      window.location.href = paymentUrl;
    }else{
      toast.error("Please Login to Book tickets")
    }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const reserveSeats = async (seats) => {
    // console.log(seats);
    try {
      for (var i = 0; i < seats.length; i++) {
        // console.log(_id);
        const response = await axios.patch(
          `/api/seat/patchseatsbyshowId/${_id}`,
          { _id, seatNumber: seats[i] }
        );
        // console.log(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await axios.get(`/api/show/getShow/${_id}`);
        setShow(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    if (_id) {
      fetchShow();
    }
  }, [_id]);

  const handleSeatClick = (seat) => {

    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seatNumber));
    } else if (seat.isBooked == true) {
      alert("seat is reserved");
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNumber]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedSeats.length * seatPrice;
  };

  const fetchSeatsByShowId = async (showId) => {
    try {
      const response = await fetch(`/api/seat/getseatsbyshowId/${showId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch seats");
      }

      const seats = await response.json();

      return seats;
    } catch (error) {
      console.error("Error fetching seats:", error.message);
      return [];
    }
  };

  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const showId = _id; //
    const fetchData = async () => {
      const seatsData = await fetchSeatsByShowId(showId);
      setSeats(seatsData);
    };
    fetchData();
  }, [_id]);

  return (
    <div className="seating">
      <h2>Select Your Seats</h2>
      <div className="seat-container">
        <div className="seat-grid">
          {seats.length === 0 && <p>No seats available</p>}
          {seats.map((seat) => (
            <div
              key={seat._id}
              className={`seat ${
                selectedSeats.includes(seat.seatNumber) ? "selected" : ""
              } ${seat.isBooked ? "reserved" : ""}`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>
      </div>
      <div className="seats-screen">
        <div className="seat-screen-light"></div>
        <div className="seat-screen-div"></div>
      </div>
      <div className="selected-seats">
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
        {show[0] ? (
          <p>Time:{FormatDateTime(show[0].startTime)}</p>
        ) : (
          <p>Loading</p>
        )}
        {/* <p>Time of Show: </p> */}
        <p>Total Price: ₹{calculateTotalPrice()}</p>
      </div>
      <button onClick={
        // () => reserveSeats(selectedSeats)
        handleBookNowClick}>Book Now</button>

      {/* <div className="timings">
        <div className="dates">{renderDates()}</div>
        <div className="times">{renderTimes()}</div>
      </div> */}
    </div>
  );
};

export default Seating;

