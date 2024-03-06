import MovieCard from "../components/MovieCard"
import ImageSlider from '../components/ImageSlider';

const Home = ()=>{
    return (
        <div className="home">
          <ImageSlider />
      <strong className="TopPicks">Top picks for you</strong>
      <div className="TopPicks">
        
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
      </div>
      
    </div>
    )
}

export default Home;