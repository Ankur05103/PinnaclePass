import React from 'react';
import '../styles/Movies.css';
import MovieCard from '../components/MovieCard.jsx';
import moviesData from '../utils/MoviesList.js';

const Movies = () => {
  return (
    <div>
    <h2 className="TopPicks">Movies in Theatres</h2>
    <div className="movies">
      {moviesData.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
    </div>
    
  );
};

export default Movies;
