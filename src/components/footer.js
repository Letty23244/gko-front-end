import React from "react";
import "./footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Column 1 – Company */}
        <div className="footer-col">
          <h3>GKO Security Ltd</h3>
          <p className="tagline">Trusted protection since 2011</p>
        </div>

        {/* Column 2 – Quick links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Plot 1336, Port Bell Rd,<br />Kitintale, Kampala</p>
          <p>Phone: +256 700 000000</p>
          <p>Email: gkogroupltd@gmail.com</p>
        </div>
      </div>

      
      <div className="footer-bottom">
        © {year} GKO Security Ltd. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
