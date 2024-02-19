// import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.css";
export default function Header() {
  const toggleMenu = () => {
    alert("Have to show menu");
  };

  return (
    <div>
      <nav>
        <div className="logo">
          Pinnacle
          <span>Pass</span>
        </div>

        <div className="search">
          <input type="text" className="searchTerm" placeholder="Search" />
          <button type="submit" className="searchButton">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="Drawer" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </nav>


      <div className="Options-menu">
        <a href="http://localhost:3000/">MOVIES</a>
        <a href="http://localhost:3000/">Sports</a>
        <a href="http://localhost:3000/">Drama</a>
        <a href="http://localhost:3000/">Events</a>
        <a href="/login">Login</a>
        <a href="/signup">SignUp</a>
        {/* <Link to ="/login">
          <h1>Login</h1>
        </Link>
        <Link to ="/signup">
          <h1>Signup</h1>
        </Link> */}
      </div>
    </div>
  );
}
