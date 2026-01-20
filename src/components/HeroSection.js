import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Carousel, Button, Spinner, Alert } from 'react-bootstrap';
// Removed: import api from '../Api/Api';
// Removed: import { useEffect, useState } from 'react';

// Local fallback images

import guardImg from '../assets/gaurd2.webp';
import cctvImg from '../assets/cctv.jpeg';
import fireImg from '../assets/alarm.jpeg';
import hotelJustinoImg from '../assets/hotelJustino.jpg';
import barImg from '../assets/bar.jpg';

// Map backend image names → local fallback imports
const imageMap = {
 
  'gaurd2.webp': guardImg,
  'cctv.jpeg': cctvImg,
  'alarm.jpeg': fireImg,
  'hotelJustino.jpg': hotelJustinoImg,
  'bar.jpg': barImg
};

// STATIC DATA (Now the sole source of content)
const staticData = {
  carousel_slides: [
    { title: "Welcome to Hotel Justino", subtitle: "Comfort, elegance, and exceptional hospitality", image: "hotelJustino.jpg" },
    { title: "Relax, Dine & Unwind", subtitle: "Experience luxury, great food, and memorable moments", image: "bar.jpg" } // Added a second slide for a realistic carousel
  ],
  services: [
    { title: "Security Guards", description: "Professional guards for all needs", image: "gaurd2.webp" },
    { title: "CCTV Monitoring", description: "High-tech surveillance systems", image: "cctv.jpeg" },
    { title: "Fire Alarm Systems", description: "Protect your property from fire hazards", image: "alarm.jpeg" }
  ],
  testimonials: [
    { text: "Excellent service and highly professional team!", author: "John Doe" },
    { text: "We trust GKO Security for all our security needs.", author: "Jane Smith" }
  ]
};

function Hero() {
  // Directly use the static data, bypassing state, loading, and effects.
  const homeData = staticData;

  const carouselSlides = homeData.carousel_slides;
  const services = homeData.services;
  const testimonials = homeData.testimonials;

  // Removed: if (loading) return <p className="text-center mt-5">Loading homepage...</p>;
  // Removed: error handling display

  return (
    <section className="hero-section">
      {/* HERO CAROUSEL */}
      <div className="hero-carousel-wrapper">
        {/* NOTE: We removed error and loading imports, but kept all bootstrap components for rendering */}
        <Carousel fade controls={false} indicators={false} interval={4000}>
          {carouselSlides.map((slide, index) => (
            <Carousel.Item key={index}>
              <div
                className="carousel-bg zoom"
                style={{ backgroundImage: `url(${imageMap[slide.image] || hotelJustinoImg})` }}
              >
                <div className="carousel-caption">
                  <h2>{slide.title}</h2>
                  <p>{slide.subtitle}</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="hero-overlay-content text-center">
          <h1 className="hero-title display-3">Comfort You Can Trust. Hospitality You’ll Remember</h1>
          <p className="hero-subtitle">
             Hotel Justino offers exceptional accommodation, dining, and relaxation in the heart of the city.
          </p>
          <Link to="/about" className="hero-btn btn btn-primary">
            Discover Our Hotel
          </Link>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section className="services py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4 text-primary">Our Security Services</h2>
          <Row className="g-4 text-center">
            {services.map((service, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 service-card">
                  <Card.Img variant="top" src={imageMap[service.image] || guardImg} alt={service.title} />
                  <Card.Body>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials py-5">
        <Container>
          <h2 className="text-center mb-4 text-primary">What Our Clients Say</h2>
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col md={6} key={index}>
                <Card className="testimonial-card p-3 shadow-sm">
                  <Card.Body>
                    <Card.Text>"{testimonial.text}"</Card.Text>
                    <Card.Footer className="text-muted text-end">– {testimonial.author}</Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* Removed error display logic */}
    </section>
  );
}

export default Hero;
