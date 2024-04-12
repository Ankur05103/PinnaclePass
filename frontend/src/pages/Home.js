import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MovieCard from "../components/MovieCard"
import ImageSlider from '../components/ImageSlider';

const Home = ()=>{
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/api/movie/getMovie');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

    return (
        <div className="home">
          <ImageSlider />
      <strong className="TopPicks">Top picks for you</strong>
      <div className="TopPicks">
        
      <div className="movies">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      </div>
      
    </div>
    )
}

export default Home;