import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup";

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
              path="/signup"
              element = {<Signup/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
