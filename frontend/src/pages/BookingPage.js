import React, { useState, useEffect } from 'react';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [upcomingWeek, setUpcomingWeek] = useState([]);

  useEffect(() => {
    const generateUpcomingWeek = () => {
      const today = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const upcomingDates = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        upcomingDates.push(`${days[date.getDay()]}, ${date.toLocaleDateString()}`);
      }

      return upcomingDates;
    };

    setUpcomingWeek(generateUpcomingWeek());
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const theaters = [
    { id: 1, name: 'Theater 1', location: 'Location 1' },
    { id: 2, name: 'Theater 2', location: 'Location 2' },
    { id: 3, name: 'Theater 3', location: 'Location 3' },
  ];

  return (
    <div className="booking-page">
      <div className="date-selector">
        {upcomingWeek.map((day, index) => (
          <button key={index} onClick={() => handleDateSelect(day)}>
            {day}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="theater-cards">
          <h2>Theaters available on {selectedDate}:</h2>
          {theaters.map((theater) => (
            <div key={theater.id} className="theater-card">
              <h3>{theater.name}</h3>
              <p>{theater.location}</p>
              <button onClick={() => {}}>Book Tickets</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPage;
