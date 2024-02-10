import React, { useState } from "react";
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
        <a href="#">MOVIES</a>
        <a href="#">Sports</a>
        <a href="#">Drama</a>
        <a href="#">Events</a>
      </div>
    </div>
  );
}
