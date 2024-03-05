import React from "react";
import "../styles/MovieCard.css";

export default function MovieCard() {
  return (
    <div className="movie">
      <img src={"https://thetelugufilmnagar.com/wp-content/uploads/2022/11/Adipurush.webp"} alt="Movie Poster" />
      <div className="details">
        <h2>Adipurush</h2>
        <p>Description Description Description Description Description</p>
        <a href="/booking"><button type="submit" onClick={()=>{}}>Book</button></a>
        
      </div>
    </div>
  );
}
