import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import TheaterDetails from "./Theater";
import FormatDateTime from "./date";
import "../styles/Shows.css";

const ShowsByMovieId = () => {
  const [month, setMonth] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const [SelectedDay, setSelectedDay] = useState([]);
  const [SelectedDate, setSelectedDate] = useState([]);

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

  //experiment filtering shows ...risky
  const groupShowsByMovieAndTheater = (allShows) => {
    const groupedShows = {};
    allShows.forEach((show) => {
      const key = `${show.movie}_${show.theater}`;
      if (!groupedShows[key]) {
        groupedShows[key] = [];
      }
      groupedShows[key].push(show);
    });
    return groupedShows;
  };

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
            // defaultChecked={i === 0}
            onChange={() => {
              setSelectedDay(days[currentDate.getDay()]);
              setSelectedDate(currentDate.getDate());
              setMonth(currentDate.getMonth());
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

  const filteredShows = shows.filter((show) => {
    const showDate = new Date(show.startTime);
    return showDate.getDate() === SelectedDate;
  });
  const groupedShowsArray = groupShowsByMovieAndTheater(filteredShows);
  return (
    <div className="Show-details">
      {movie && <h1 className="show-movie-name">{movie.title}</h1>}
      <h2>Dates available</h2>
      <div className="timings">
        <div className="dates">{renderDates()}</div>
      </div>
      <h2 className="shows-details">Shows :</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {Object.entries(groupedShowsArray).map(([key, showsGroup]) => {
            const showTimes = showsGroup.map((show) =>
              FormatDateTime(show.startTime).slice(-5)
            );
            console.log(showTimes);

            return (
              <li key={key}>
                <div className="ShowComponent">
                  <div>
                    <TheaterDetails
                      theaterId={showsGroup[0].theater}
                    ></TheaterDetails>
                    <p>
                      Show :{" "}
                      {showTimes.map((showTime, index) => (
                        <span key={index}>
                          {showTime}
                          {index < showTimes.length - 1 ? " " : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div>
                    <a href={`/seats/${showsGroup[0]._id}`}>
                      <button
                        type="submit"
                        onClick={() => {}}
                        className="bookButton"
                      >
                        Book
                      </button>
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ShowsByMovieId;