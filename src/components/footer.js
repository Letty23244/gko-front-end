// src/components/Footer.js
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../components/footer.css"; // optional for custom styles

function SocialLinks() {
  return (
    <div className="d-flex mt-3">
      <a href="#" className="me-3 text-light" aria-label="Facebook">
        <FaFacebook size={24} className="hover-opacity" />
      </a>
      <a href="#" className="me-3 text-light" aria-label="Twitter">
        <FaTwitter size={24} className="hover-opacity" />
      </a>
      <a href="#" className="me-3 text-light" aria-label="Instagram">
        <FaInstagram size={24} className="hover-opacity" />
      </a>
      <a href="#" className="text-light" aria-label="LinkedIn">
        <FaLinkedin size={24} className="hover-opacity" />
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer bg-navy blue text-light pt-5">
      <Container>
        <Row>
          {/* Logo + About */}
          <Col md={4} className="mb-4">
            <h3 className="fw-bold mb-3">HOTEL JUSTINO</h3>
            <p>
              Experience luxury, comfort, and elegance at Hotel Justino. Enjoy world-class hospitality, fine dining, and unforgettable experiences.
            </p>
            <SocialLinks />
          </Col>

          {/* Quick Links */}
          <Col md={2} className="mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/accommodation" className="text-light text-decoration-none">Accommodation</a></li>
              <li><a href="/dining" className="text-light text-decoration-none">Dining</a></li>
              <li><a href="/experience" className="text-light text-decoration-none">Experiences</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3} className="mb-4">
            <h5 className="mb-3">Contact Us</h5>
            <p>Plot 1336, Port Bell Road, Kitintale, Kampala</p>
            <p>+256 700 000000</p>
            <p>info@hoteljustino.com</p>
          </Col>

          {/* Newsletter */}
          <Col md={3}>
            <h5 className="mb-3">Newsletter</h5>
            <p>Subscribe to get latest offers and updates.</p>
            <Form className="d-flex">
              <Form.Control type="email" placeholder="Enter email" className="me-2" />
              <Button variant="primary">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        <hr className="bg-light" />

        <Row>
          <Col className="text-center pb-3">
            &copy; {new Date().getFullYear()} Hotel Justino. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
