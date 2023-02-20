import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        <div className="label">
          <h1>BLOGER</h1>
          <h2>Welcome <span>{currentUser?.username} !</span></h2>
        </div>
        
      </div>
      
      <div className="links">
        <Link className="link" to="/">
          <button className="btn" type="button">
            <b>All</b>
          </button>
        </Link>
        <Link className="link" to="/?cat=art">
          <button className="btn" type="button">
            Art
          </button>
        </Link>
        <Link className="link" to="/?cat=science">
          <button className="btn" type="button">
            Science
          </button>
        </Link>
        <Link className="link" to="/?cat=technology">
          <button className="btn" type="button">
            Technology
          </button>
        </Link>
        <Link className="link" to="/?cat=cinema">
          <button className="btn" type="button">
            Cinema
          </button>
        </Link>
        <Link className="link" to="/?cat=design">
          <button className="btn" type="button">
            Design
          </button>
        </Link>
        <Link className="link" to="/?cat=food">
          <button className="btn" type="button">
            Food
          </button>
        </Link>
        {currentUser ? (
          <div className="authend">
            <Link to="/">
              <button className="logout" onClick={logout}>Logout</button>
            </Link>
            <Link className="link" to="/write">
              <button className="write">
                Write
              </button>
            </Link>
          </div>
        ) : (
          <Link className="login" to="/login">
            <button className="btn" type="button">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;