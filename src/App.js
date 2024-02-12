import "./App.css";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
function App() {
  return (
    <>
      <Header />
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
      
    </>
  );
}

export default App;
