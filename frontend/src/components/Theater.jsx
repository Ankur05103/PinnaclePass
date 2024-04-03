import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      {/* <h2>Theater Details</h2> */}
      <p>Theater Name: {theater.theaterName}</p>
      <p>Theater Location: {theater.theaterLocation}</p>
    </div>
  );
};

export default TheaterDetails;
