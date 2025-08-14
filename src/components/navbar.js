import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoginModal from "./LoginModal";
import "./navbar.css";
import gko from "../assets/gko.jpg";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <img src={gko} alt="GKO Logo" className="logo-img" />
          <span className="company-name">GKO Security Ltd</span>
        </div>
      </div>

      <div className="navbar-right">
        <ul className="nav-menu">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about_us">About Us</NavLink></li>
          <li
            className="dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <NavLink to="/services" className="nav-link">Services ▾</NavLink>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li><NavLink to="/services/cctv">CCTV Installation</NavLink></li>
                <li><NavLink to="/services/alarm">Alarm Response</NavLink></li>
                <li><NavLink to="/services/guards">Guard Services</NavLink></li>
              </ul>
            )}
          </li>
          <li><NavLink to="/contact">Contact Us</NavLink></li>
          <li><NavLink to="/careers">Career</NavLink></li>
          <li>
            <button className="btn-login" onClick={() => setShowLoginModal(true)}>Login</button>
          </li>
        </ul>
      </div>

      <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />
    </nav>
  );
}
