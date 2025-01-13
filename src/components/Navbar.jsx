import React from 'react';
import logo from "../assets/Brain-Buzz-1.jpg";
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Brain Buzz Logo" />
          <span>Brain Buzz</span>
        </Link>
      </div>
            <div className="navbar-leaderboard">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;