import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars} from '@fortawesome/free-solid-svg-icons';
import '../styles/Navigation.css';
export default function Navigation() {

  const toggleMenu = () => {
    alert("Have to show menu")
  };

  return (
    <nav>

      <div className="logo">
        Pinnacle
        <span>Pass</span>
      </div>

      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Search"
        />
        <button type="submit" className="searchButton">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </div>

      <div className="Drawer" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </nav>
  );
}
