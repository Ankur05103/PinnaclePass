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
  const [SelectedTime, setSelectedTime] = useState([]);
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

  const renderTimes = () => {
    const times = [
      "00:00",
      "03:00",
      "06:00",
      "08:30",
      "09:00",
      "12:00",
      "15:00",
      "18:00",
      "21:00",
    ];

    return times.map((time, index) => (
      <div key={index}>
        <input
          className="seat-button"
          type="radio"
          name="time"
          id={`t${index + 1}`}
          // defaultChecked={index === 0}
          onChange={() => setSelectedTime(time)}
        />
        <label htmlFor={`t${index + 1}`} className="time">
          {time}
        </label>
      </div>
    ));
  };

  const _filteredShows = shows.filter((show) => {
    const showDate = new Date(show.startTime);
    return showDate.getDate() === SelectedDate;
  });
  console.log(_filteredShows);
  const filteredShows = _filteredShows.filter((show) => {
    const showDate = new Date(show.startTime);

    showDate.setHours(showDate.getHours() - 5);
    showDate.setMinutes(showDate.getMinutes() - 30);

    if (showDate.getHours() < 0) {
      showDate.setDate(showDate.getDate() - 1);
      showDate.setHours(showDate.getHours() + 24);
    }
    if (showDate.getMinutes() < 0) {
      showDate.setHours(showDate.getHours() - 1);
      showDate.setMinutes(showDate.getMinutes() + 60);
    }

    const hours = ("0" + showDate.getHours()).slice(-2);
    const minutes = ("0" + showDate.getMinutes()).slice(-2);
    const time = `${hours}:${minutes}`;

    return time === SelectedTime;
  });

  return (
    <div className="Show-details">
      {movie && <h1 className="show_heading">{movie.title}</h1>}

      <h2 className="show_heading">Dates available</h2>

      <div className="timings">
        <div className="dates">{renderDates()}</div>
      </div>

      <h2 className="show_heading">Timings available(24 Hr)</h2>

      <div className="timings">
        <div className="times">{renderTimes()}</div>
      </div>
      <h2 className="shows-details">Shows :</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredShows.length === 0 && <p>No shows available</p> }
          {console.log("here are the filtered show :", filteredShows)}
          {filteredShows.length !== 0 &&  filteredShows.map((show) => (
            <li key={show._id}>
              <div className="ShowComponent">
                <div>
                  <TheaterDetails theaterId={show.theater}></TheaterDetails>
                  <p>Show : {FormatDateTime(show.startTime)}</p>{" "}
                </div>
                <div>
                  <a href={`/seats/${show._id}`}>
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
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowsByMovieId;
