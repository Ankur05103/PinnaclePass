import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import {Link} from 'react-router-dom';
import { toast } from "react-hot-toast"

export default function Header() {
  const toggleMenu = () => {
    alert("Have to show menu");
  };

  const {logout} = useLogout()
  const { user } = useAuthContext()
 
  const handleClick = () => {
    logout()
    toast.success("Logged out successfully")
  }

  return (
    <div>
      <nav className="navigation">
        <div >
          <Link to="/" className="logo"> 
          Pinnacle
          <span>Pass</span>
          </Link>
          
        </div>

        {/* <div className="nav-search">
          <input type="text" className="nav-searchTerm" placeholder="Search" />
          <button type="submit" className="nav-searchButton">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div> */}

        <div className="Logout-div">
          {user && (
            <div>
            <span>{user.email}</span>
            </div>
          )}
        {user && (
        <div >
            <button onClick={handleClick} className="logout-button">Log out</button>
        </div>
        )
        
        }
        {!user &&(
              <Link to="/login" >
                  <button className="LoginButton">Login/Signup</button>
              </Link>
        )}
        
        <div className="Drawer" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        
        </div>


      </nav>


      <div className="Options-menu">
      <Link to="/movies" > Movies </Link>
      <Link to="/booking" > Sports </Link>
      <Link to="/booking" > Drama </Link>
      <Link to="/booking" > Events </Link>
      </div>
    </div>
  );
}
