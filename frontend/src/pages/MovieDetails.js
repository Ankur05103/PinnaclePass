import {React,useState} from 'react';
import '../styles/MovieDetails.css';
import { useParams,Link } from 'react-router-dom';
import moviesData from '../utils/MoviesList.js';
import theatersData from '../utils/theatersData.js'
import '../styles/Seating.css'

const MovieDetails = () => {
  const date = new Date();

  const [selectedDay, setSelectedDay] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const renderDates = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(); // Create a new date object for each iteration
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
        
        <Link to={`/seats/${id}/${selectedDate}/${selectedTime}`}>
        <button
          className="seat-button"
          // type="radio"
          // name="time"
          id={`t${index + 1}`}
          
          onClick={() => {
            setSelectedTime(time);
          }}
        /></Link>
        <label htmlFor={`t${index + 1}`} className="time">
          {time}
        </label>
      </div>
    ));
  };


  let { id } = useParams();

  const movie = moviesData[id-1]

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details">
        <div className="movie-details-top">
          <div className="movie-poster">
            <img src={movie.poster} alt={movie.name} />
          </div>
          <div className="movie-info">
            <p><strong>Name:</strong> {movie.name}</p>
            <p><strong>Category:</strong> {movie.category}</p>
            <p><strong>Languages:</strong> {movie.language}</p>
            <p><strong>About the movie: </strong>{movie.about}</p>
          </div>
        </div>
        <div className="theatres">
          <h3>Theatres & Timings</h3>
          {/* <ul>
              <li>
                <h4>theatre name</h4>
                <ul>
                  <li >timings</li>
                </ul>
                <h4>theatre name</h4>
                <ul>
                  <li >timings</li>
                </ul>
                <h4>theatre name</h4>
                <ul>
                  <li >timings</li>
                </ul>
              </li>
          </ul> */
          }
          <div className="timings">
        <div className="dates">{renderDates()}</div>
      </div>
          <ul>
            {theatersData.map((theater, index) => (
              <li key={index}>
                <ul className='timing-list'>
                <h4>{theater.name}</h4>
                  <div>
                  <div className="timings">
                    <div className="times">{renderTimes()}</div>
                  </div>
                  </div>
                  
                </ul>
                
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
