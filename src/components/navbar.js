// Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/about_us">About Us</NavLink></li>

        <li
          className="dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <NavLink to="/services" className="nav-link">
        Services ▾
      </NavLink>
      {showDropdown && (
        <ul className={`dropdown-menu ${showDropdown ? '' : 'hidden'}`}>
          <li><NavLink to="/services/cctv">CCTV Installation</NavLink></li>
          <li><NavLink to="/services/alarm">Alarm Response</NavLink></li>
          <li><NavLink to="/services/guards">Guard Services</NavLink></li>
        </ul>
          )}
          
        </li>
<li><NavLink to="/contact">Contact Us</NavLink></li>
<li><NavLink to="/careers">Career</NavLink></li>
<li><NavLink to="/login" className="btn-login">Login</NavLink></li>

      </ul>
    </nav>
  );
}

