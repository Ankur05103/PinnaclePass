import React from "react";
import "../styles/MovieCard.css";

export default function MovieCard() {
  return (
    <div className="movie">
      <img src={"https://via.placeholder.com/175"} alt="Movie Poster" />
      <div className="details">
        <h2>Adipurush</h2>
        <p>Description Description Description Description Description</p>
        <button type="submit">Book</button>
      </div>
    </div>
  );
}
