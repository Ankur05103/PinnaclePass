import React from 'react';
import '../styles/MovieDetails.css';
import { useParams } from 'react-router-dom';
import moviesData from '../utils/MoviesList.js';

const MovieDetails = ({props}) => {

  let { id } = useParams();

  const movie = moviesData[id-1]

  // const movie = moviesData.filter((m)=> {
  //   return m.id === _id ? m.name : null;
  // })

  // console.log(movie);

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
          </div>
        </div>
        <div className="theatres">
          <h3>Theatres & Timings</h3>
          <ul>
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
