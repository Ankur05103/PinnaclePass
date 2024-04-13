import React, { useState, useEffect } from "react";
import "../styles/MovieDetails.css";
import { useParams,Link } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const date = new Date();

  const [selectedDay, setSelectedDay] = useState();
  const [_selectedTime, setSelectedTime] = useState();
  const [_selectedDate, setSelectedDate] = useState();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theaters, setTheaters] = useState(null);
  const { _id } = useParams();

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const response = await axios.get(`/api/movie/getMoviebyId/${_id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    };
    fetchMovieById(movie);
  }, [_id]);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await axios.get('/api/theater/getTheater');
        setTheaters(response.data);
      } catch (error) {
        console.error("Error fetching Theater:", error);
      }
    };
    // console.log(theaters);
    if(_id)
      fetchTheater(theaters);
  }, [_id]);

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
        <a href={`/seats/${_id}/${_selectedDate}/${_selectedTime}`}>
          <button
            className="seat-button"
            id={`t${index + 1}`}
            onClick={() => {
              setSelectedTime(time);
            }}
          />
        </a>
        <label htmlFor={`t${index + 1}`} className="time">
          {time}
        </label>
      </div>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details">
        <div className="movie-details-top">
          <div className="movie-poster">
            <img src={movie.posterImage} alt={movie.title} />
          </div>
          <div className="movie-info">
            <p>
              <strong>Name:</strong> {movie.title}
            </p>
            <p>
              <strong>Category:</strong> {movie.category}
            </p>
            <p>
              {/* <strong>Languages:</strong> {movie.language} */}
            </p>
            <p>
              <strong>About the movie: </strong>
              {movie.description}
            </p>
            <Link to={`/Movies/${_id}/shows`} >
                  <button className="bookButton">Book tickets</button>
            </Link>
          </div>
        </div>
        <div>
          <h2>About the movie : </h2>
          <p>
            
          </p>
        </div>
        <div>
          <h2>Cast : </h2>
        </div>
        
        <div>
      </div>
      </div>
      
    </div>
  );
};

export default MovieDetails;


// "_id": "65f2cd6713b933d257755fcd",
//         "movieId": 1,
//         "title": "Article 370",
//         "category": "U/A",
//         "genre": "Action/Thriller",
//         "languages": [
//             "Hindi"
//         ],
//         "description": "In the aftermath of the 2016 Kashmir unrest, a young local field agent, Zooni Haksar, is picked out by Rajeshwari Swaminathan from the Prime Minister`s Office for a top secret mission. Their aim? Cracking down on terrorism and putting an end to the billion dollar conflict economy in the valley, by doing the absolute impossible - Abrogating the notorious Article 370. That too, without spilling a single drop of innocent blood.",
//         "posterImage": "https://assetscdn1.paytm.com/images/cinema/Article-370--705x750-0d1f18a0-b845-11ee-8af7-ef221f22e642.jpg?format=webp&imwidth=300",
//         "__v": 0
//     },