import React, { useState } from 'react';
import '../styles/Seating.css';
import { rows, rows2 } from '../utils/data';

const Seating = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const seatPrice = 10; 

    const handleSeatClick = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const calculateTotalPrice = () => {
        return selectedSeats.length * seatPrice;
    };

    return (
        <div className="seating">
            <h2>Select Your Seats</h2>
            <div className="seat-grid">
                {rows.map((seat) => (
                    <div
                        key={seat.id}
                        className={`seat ${selectedSeats.includes(seat.seat) ? 'selected' : ''}`}
                        onClick={() => handleSeatClick(seat.seat)}
                    >
                        {seat.seat}
                    </div>
                ))}
                {rows2.map((seat) => (
                    <div
                        key={seat.id}
                        className={`seat ${selectedSeats.includes(seat.seat) ? 'selected' : ''}`}
                        onClick={() => handleSeatClick(seat.seat)}
                    >
                        {seat.seat}
                    </div>
                ))}
            </div>
            <div className="selected-seats">
                <p>Selected Seats: {selectedSeats.join(', ')}</p>
                <p>Total Price: ${calculateTotalPrice()}</p>
            </div>
        </div>
    );
};

export default Seating;
