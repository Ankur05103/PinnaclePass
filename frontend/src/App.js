import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Seating from "./pages/Seating";
import Footer from "./components/Footer";
import Movies from "./pages/MoviesPage";
import MovieDetails from "./pages/MovieDetails";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element = {<Home/>}
            />
            <Route
              path="/login"
              element = {<Login/>}
            />
            <Route
            path="/Movies"
            element = {<Movies/>}
            />
            <Route
              path="/booking/:id"
              element = {<MovieDetails/>}
            />
            <Route
              path="/seats/:id/:date/:time"
              element = {<Seating/>}
            />
          </Routes>
        </div>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
