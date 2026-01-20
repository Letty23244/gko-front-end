// src/pages/Dining.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../pages/dining.css";

import dining1 from "../assets/dining1.jpg";
import dining2 from "../assets/dining2.jpg";
import dining3 from "../assets/dining3.jpg";
import dining4 from "../assets/dining4.jpg";

export default function DiningPage() {
  const signatureDishes = [
    {
      image: dining1,
      title: "Grilled Lake Tilapia",
      description: "Freshly sourced, delicately seasoned, and grilled to perfection.",
    },
    {
      image: dining2,
      title: "Prime Beef Steak",
      description: "Tender cuts served with herb butter and seasonal accompaniments.",
    },
    {
      image: dining3,
      title: "Garden Vegetarian Pasta",
      description: "A vibrant blend of fresh vegetables in a light tomato reduction.",
    },
  ];

  const galleryImages = [dining1, dining2, dining3, dining4];

  return (
    <div className="dining-page">
      {/* HERO */}
      <section
        className="dining-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${dining1})`,
        }}
      >
        <div className="hero-content">
          <h1>Exquisite Dining</h1>
          <p>A refined culinary journey at Hotel Justino</p>
          <Button size="lg" variant="light" href="/contact">
            Reserve a Table
          </Button>
        </div>
      </section>

      <Container className="py-5">
        {/* INTRO */}
        <section className="intro-section text-center">
          <p className="intro-text">
            At Hotel Justino, dining is more than a meal — it is an experience.
            Our chefs blend authentic local flavors with international cuisine,
            offering thoughtfully crafted dishes served in an atmosphere of
            comfort, elegance, and warm hospitality.
          </p>
        </section>

        {/* RESTAURANT EXPERIENCE */}
        <section className="venue-section">
          <Row className="align-items-center mb-5">
            <Col md={6}>
              <img src={dining2} alt="Restaurant" className="venue-image" />
            </Col>
            <Col md={6}>
              <h2>Main Restaurant</h2>
              <p>
                Our signature restaurant offers breakfast, lunch, and dinner in
                a serene and elegant setting. Whether enjoying a quiet morning
                meal or an intimate evening dinner, guests are treated to
                exceptional service and exquisite flavors.
              </p>
            </Col>
          </Row>
        </section>

        {/* SIGNATURE DISHES */}
        <section className="signature-section">
          <h2 className="section-title text-center">Signature Creations</h2>
          <Row className="mt-4">
            {signatureDishes.map((dish, index) => (
              <Col md={4} key={index}>
                <div className="signature-card">
                  <img src={dish.image} alt={dish.title} />
                  <h4>{dish.title}</h4>
                  <p>{dish.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* GALLERY */}
        <section className="gallery-section">
          <h2 className="section-title text-center">Dining Gallery</h2>
          <Row className="g-4 mt-3">
            {galleryImages.map((img, index) => (
              <Col md={3} sm={6} key={index}>
                <img src={img} alt="Dining" className="gallery-img" />
              </Col>
            ))}
          </Row>
        </section>

        {/* CTA */}
        <section className="reservation-section text-center">
          <h2>Reserve Your Dining Experience</h2>
          <p>
            Join us for an unforgettable culinary experience in an atmosphere of
            elegance and tranquility.
          </p>
          <Button size="lg" variant="dark" href="/contact">
            Book a Table
          </Button>
        </section>
      </Container>
    </div>
  );
}
