import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dates.css'
const TheaterDetails = ({ theaterId }) => {
  const [theater, setTheater] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheaterById = async () => {
      try {
        const response = await axios.get(`/api/theater/getTheaterbyId/${theaterId}`); // Assuming your backend endpoint is '/api/theater/:theaterId'
        setTheater(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTheaterById();
  }, [theaterId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!theater) {
    return <div>Theater not found</div>;
  }

  return (
    <div className='Show-details-of-Theater'>
      {/* <h2>Theater Details</h2> */}
      <p className='Theater-name'>{theater.theaterName}</p>
      <p className='Theater-location'>{theater.theaterLocation}</p>
    </div>
  );
};

export default TheaterDetails;
