import React from "react";
import "../styles/MovieCard.css";

export default function MovieCard({movie}) {
  return (
    <div className="movie">
      <img src={movie.posterImage} alt={movie.title} />
      <div className="details">
        <h2>{movie.title}</h2>
        <p>{movie.category}</p>
        <a href={`/Movies/${movie._id}`}><button type="submit" onClick={()=>{}} className="CardBtn">Show Details</button></a>
      </div>
    </div>
  );
}



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
//     {
//         "_id": "65f2cda813b933d257755fd1",
//         "movieId": 2,
//         "title": "Shaitaan",
//         "category": "U/A",
//         "genre": "Action/Thriller",
//         "languages": [
//             "Hindi"
//         ],
//         "description": "In the aftermath of the 2016 Kashmir unrest, a young local field agent, Zooni Haksar, is picked out by Rajeshwari Swaminathan from the Prime Minister`s Office for a top secret mission. Their aim? Cracking down on terrorism and putting an end to the billion dollar conflict economy in the valley, by doing the absolute impossible - Abrogating the notorious Article 370. That too, without spilling a single drop of innocent blood.",
//         "posterImage": "https://assetscdn1.paytm.com/images/cinema/Shaitaan-705x750-8476f990-d9e2-11ee-8171-7df0cded886f.jpg?format=webp&imwidth=300",
//         "__v": 0