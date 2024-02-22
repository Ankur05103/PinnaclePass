// import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Header() {
  const toggleMenu = () => {
    alert("Have to show menu");
  };

  const {logout} = useLogout()
  const { user } = useAuthContext()
 
  const handleClick = () => {
    logout()
  }

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
        {user && (<div >
            <span>{user.email}</span>
            <button onClick={handleClick} className="logout-button">Log out</button>
          </div>
        )
        }
        {!user &&(
          // <div>
            <a href="/login">Login</a>
          // </div>
        )}
        {!user &&(
        <a href="/signup">SignUp</a>
        )}
      </div>
    </div>
  );
}
