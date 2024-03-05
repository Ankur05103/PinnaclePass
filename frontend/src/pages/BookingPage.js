import React, { useState, useEffect } from 'react';

const BookingPage = () => {

  const theaters = [
    { id: 1, name: 'Theater 1', location: 'Location 1' },
    { id: 2, name: 'Theater 2', location: 'Location 2' },
    { id: 3, name: 'Theater 3', location: 'Location 3' },
  ];

  return (
    <div className="booking-page">

        <div className="theater-cards">
          <h2>Theaters available on Adipurush:</h2>
          {theaters.map((theater) => (
            <div key={theater.id} className="theater-card">
              <h3>{theater.name}</h3>
              <p>{theater.location}</p>
              <a href="/seats"><button onClick={()=>{}}>Book Tickets</button></a>
              {/* <button onClick={() => {}}>Book Tickets</button> */}
            </div>
          ))}
        </div>
      
    </div>
  );
};

export default BookingPage;
