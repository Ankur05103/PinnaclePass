import MovieCard from "../components/MovieCard"

const Home = ()=>{
    return (
        <div className="home">
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