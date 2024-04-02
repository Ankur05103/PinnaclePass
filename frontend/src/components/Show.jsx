import React, { useState, useEffect } from "react";
import {Link,useParams} from "react-router-dom"
import axios from "axios";
import TheaterDetails from "./Theater";
import FormatDateTime from "./date";

const ShowsByMovieId = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const response = await axios.get(`/api/movie/getMoviebyId/${movieId}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    };

    fetchMovieById(); // Call without passing movie as argument
  }, [movieId]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(
          `/api/show/getshowsbyMovieId/${movie?._id}`
        );
        setShows(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shows:", error);
        setLoading(false);
      }
    };

    if (movie?._id) {
      fetchShows();
    }
  }, [movie]);

  return (
    <div>
      {(movie) && <h1>Movie : {movie.title}</h1>}
      <h2>Shows :</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {shows.map((show) => (
            <li key={show._id}>
              <TheaterDetails theaterId={show.theater}></TheaterDetails>
              <p>Show : {FormatDateTime(show.startTime)}</p> {/* Call FormatDateTime directly */}
              <a href={`/seats/${show._id}`}>
                <button type="submit" onClick={()=>{}} className="bookButton">
                  Book
                </button>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowsByMovieId;
