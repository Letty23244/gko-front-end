// src/pages/ContactUs.js
import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../pages/contact.css"; // optional custom styles

// Hero Image (replace with your hotel hero image)
import heroImg from "../assets/room1.jpg";

function SocialLinks() {
  return (
    <div className="d-flex justify-content-center mt-3">
      <a href="#" className="mx-2 text-primary" aria-label="Facebook">
        <FaFacebook size={28} className="hover-opacity"/>
      </a>
      <a href="#" className="mx-2 text-primary" aria-label="Twitter">
        <FaTwitter size={28} className="hover-opacity"/>
      </a>
      <a href="#" className="mx-2 text-primary" aria-label="Instagram">
        <FaInstagram size={28} className="hover-opacity"/>
      </a>
      <a href="#" className="mx-2 text-primary" aria-label="LinkedIn">
        <FaLinkedin size={28} className="hover-opacity"/>
      </a>
    </div>
  );
}

export default function ContactUs() {
  return (
    <div className="contact-page">
      {/* HERO SECTION */}
      <div
        className="contact-hero text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${heroImg})`,
          height: "60vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "30px 40px",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <h1 className="display-4 fw-bold">Get in Touch</h1>
          <p className="lead">We would love to hear from you. Reach out to plan your perfect stay!</p>
        </div>
      </div>

      <Container className="py-5">
        <Row className="g-4">
          {/* Contact Form */}
          <Col lg={6}>
            <Card className="p-4 shadow-lg rounded-4 border-0">
              <Card.Body>
                <h3 className="text-primary mb-4">Send Us a Message</h3>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="Subject" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Write your message here..." />
                  </Form.Group>

                  <Button variant="primary" className="w-100">
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Hotel Info, Map, Social Links */}
          <Col lg={6}>
            <Card className="p-4 shadow-lg rounded-4 mb-4 border-0">
              <h3 className="text-primary mb-3">Hotel Justino</h3>
              <p>Plot 1336, Port Bell Road, Kitintale</p>
              <p>P.O BOX 21603, Kampala, Uganda</p>
              <p>Phone: +256 700 000000</p>
              <p>Email: info@hoteljustino.com</p>
            </Card>

            <Card className="p-4 shadow-lg rounded-4 mb-4 border-0">
              <h4 className="text-primary mb-3">Operating Hours</h4>
              <p>Monday - Friday: 8:00 AM – 10:00 PM</p>
              <p>Saturday: 9:00 AM – 8:00 PM</p>
              <p>Sunday: 9:00 AM – 6:00 PM</p>
            </Card>

            <Card className="p-4 shadow-lg rounded-4 mb-4 border-0">
              <h4 className="text-primary mb-3">Follow Us</h4>
              <SocialLinks />
            </Card>

            <Card className="shadow-lg rounded-4 border-0">
              <iframe
                title="Hotel Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8456259980664!2d32.62970801509138!3d0.31357966408101914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb597b267f2f%3A0x1c1f243e0532b984!2sKitintale%2C%20Kampala!5e0!3m2!1sen!2sug!4v1657123456789!5m2!1sen!2sug"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "16px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Card>
          </Col>
        </Row>

        {/* Testimonials */}
        <Row className="mt-5">
          <Col>
            <h2 className="text-center text-primary mb-4">Guest Reviews</h2>
            <Row className="g-4">
              {[
                { text: "An unforgettable stay! The hotel staff went above and beyond.", name: "Alice M." },
                { text: "Beautiful rooms, amazing dining, and excellent service.", name: "Brian K." },
                { text: "Luxury experience with comfort and elegance throughout.", name: "Clara P." }
              ].map((item, i) => (
                <Col md={4} key={i}>
                  <Card className="p-3 shadow-sm rounded-4">
                    <Card.Body>
                      <Card.Text>"{item.text}"</Card.Text>
                      <footer className="blockquote-footer">{item.name}</footer>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
