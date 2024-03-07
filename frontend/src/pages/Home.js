import MovieCard from "../components/MovieCard"
import ImageSlider from '../components/ImageSlider';

const moviesData = [
  { id: 1, name: 'Movie 1', category: 'Action', language: 'English', poster: 'https://assetscdn1.paytm.com/images/cinema/Shaitaan-705x750-8476f990-d9e2-11ee-8171-7df0cded886f.jpg?format=webp&imwidth=300' },
  { id: 2, name: 'Movie 2', category: 'Comedy', language: 'French', poster: 'https://assetscdn1.paytm.com/images/cinema/Article-370--705x750-0d1f18a0-b845-11ee-8af7-ef221f22e642.jpg?format=webp&imwidth=300' },
  { id: 3, name: 'Movie 3', category: 'Drama', language: 'Spanish', poster: 'https://assetscdn1.paytm.com/images/cinema/Shivrayancha-Chhava-705x750-150d4530-6f1d-11ee-8d97-473f463cc499.jpg?format=webp&imwidth=300' },
  // Add more movies as needed
];

const Home = ()=>{
    return (
        <div className="home">
          <ImageSlider />
      <strong className="TopPicks">Top picks for you</strong>
      <div className="TopPicks">

      {moviesData.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      {moviesData.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
        
        {/* <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/> */}
      </div>
      
    </div>
    )
}

export default Home;