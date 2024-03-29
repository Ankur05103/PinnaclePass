import React, { useState } from "react";
import "../styles/Seating.css";
import { rows, rows2 } from "../utils/data";
import { useParams } from "react-router-dom";

const Seating = (props) => {
  const { id, _selectedDate, _selectedTime } = useParams();

  console.log(id, _selectedDate, _selectedTime);

  const date = new Date();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Sun");
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [selectedDate, setSelectedDate] = useState(date.getDate());
  const seatPrice = 10;

  const renderDates = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(); 
      currentDate.setDate(currentDate.getDate() + i);

      dates.push(
        <div key={i}>
          <input
            className="seat-button"
            type="radio"
            name="date"
            id={`d${i + 1}`}
            defaultChecked={i === 0}
            onChange={() => {
              setSelectedDay(days[currentDate.getDay()]);
              setSelectedDate(currentDate.getDate());
            }}
          />
          <label htmlFor={`d${i + 1}`} className="dates-item">
            <div className="day">{days[currentDate.getDay()]}</div>
            <div className="date">{currentDate.getDate()}</div>
          </label>
        </div>
      );
    }

    return dates;
  };

  const renderTimes = () => {
    const times = ["11:00", "14:30", "18:00", "21:30"];
    return times.map((time, index) => (
      <div key={index}>
        <input
          className="seat-button"
          type="radio"
          name="time"
          id={`t${index + 1}`}
          defaultChecked={index === 0}
          onChange={() => setSelectedTime(time)}
        />
        <label htmlFor={`t${index + 1}`} className="time">
          {time}
        </label>
      </div>
    ));
  };

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat.seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seat));
    } else if (seat.isReserved == true) {
  alert('seat is reserved');
    } else {
      setSelectedSeats([...selectedSeats, seat.seat]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedSeats.length * seatPrice;
  };

  return (
    <div className="seating">
      <h2>Select Your Seats</h2>
      <div className="seat-container">
        <div className="seat-grid">
          {rows.map((seat) => (
            <div
              key={seat.id}
              className={`seat ${
                selectedSeats.includes(seat.seat) ? "selected" : ""
              } ${seat.isReserved ? "reserved" : ""}`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat.seat}
            </div>
          ))}
          {rows2.map((seat) => (
            <div
              key={seat.id}
              className={`seat ${
                selectedSeats.includes(seat.seat) ? "selected" : ""
              }`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat.seat}
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
        <p>
          Date of Show : {_selectedDate} , {selectedDay}
        </p>
        <p>Time of Show: {_selectedTime}</p>
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
