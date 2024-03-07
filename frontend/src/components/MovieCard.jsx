import React from "react";
import "../styles/MovieCard.css";

export default function MovieCard({movie}) {
  return (
    <div className="movie">
      <img src={movie.poster} alt={movie.name} />
      <div className="details">
        <h2>{movie.name}</h2>
        <p>{movie.category}</p>
        <a href={`/booking/${movie.id}`}><button type="submit" onClick={()=>{}} className="CardBtn">Book</button></a>
      </div>
    </div>
  );
}