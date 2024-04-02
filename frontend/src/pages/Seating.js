import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormatDateTime from "../components/date";
import "../styles/Seating.css";

const Seating = (props) => {
  const { _id } = useParams();
  const showID = _id;
  // const date = new Date();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [show, setShow] = useState([]);
  const seatPrice = 10; //price hardcode ahe te change karayla lagnar

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await axios.get(`/api/show/getShow/${_id}`);
        setShow(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchShow(_id);
    console.log(show);
  }, [show]);

  const handleSeatClick = (seat) => {

    //itha patch lagnar isBooked update karayla

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
    const showId = _id; 
    const fetchData = async () => {
      const seatsData = await fetchSeatsByShowId(showId);
      setSeats(seatsData);
    };
    fetchData();
  }, []);

  return (
    <div className="seating">
      <h2>Select Your Seats</h2>
      <div className="seat-container">
        <div className="seat-grid">
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
          <p>Date & time of Show :{FormatDateTime(show[0].startTime)}</p>
        ) : (
          <p>Loading</p>
        )}
        {/* <p>Time of Show: </p> */}
        <p>Total Price: ₹{calculateTotalPrice()}</p>
      </div>
      <button>Book Now</button>

      {/* <div className="timings">
        <div className="dates">{renderDates()}</div>
        <div className="times">{renderTimes()}</div>
      </div> */}
    </div>
  );
};

export default Seating;

// const renderDates = () => {
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const dates = [];

//   for (let i = 0; i < 7; i++) {
//     const currentDate = new Date();
//     currentDate.setDate(currentDate.getDate() + i);

//     dates.push(
//       <div key={i}>
//         <input
//           className="seat-button"
//           type="radio"
//           name="date"
//           id={`d${i + 1}`}
//           defaultChecked={i === 0}
//           onChange={() => {
//             // setSelectedDay(days[currentDate.getDay()]);
//             // setSelectedDate(currentDate.getDate());
//           }}
//         />
//         <label htmlFor={`d${i + 1}`} className="dates-item">
//           <div className="day">{days[currentDate.getDay()]}</div>
//           <div className="date">{currentDate.getDate()}</div>
//         </label>
//       </div>
//     );
//   }

//   return dates;
// };

// const renderTimes = () => {
//   const times = ["11:00", "14:30", "18:00", "21:30"];
//   return times.map((time, index) => (
//     <div key={index}>
//       <input
//         className="seat-button"
//         type="radio"
//         name="time"
//         id={`t${index + 1}`}
//         defaultChecked={index === 0}
//         // onChange={() => setSelectedTime(time)}
//       />
//       <label htmlFor={`t${index + 1}`} className="time">
//         {time}
//       </label>
//     </div>
//   ));
// };
