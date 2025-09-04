import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
// Import images from src/assets
import personImg from '../assets/person.jpg';
import eventImg from '../assets/event.jpg';
import guardImg from '../assets/gaurd2.webp';
import cctvImg from '../assets/cctv.jpeg';
import fireImg from '../assets/alarm.jpeg';

const API_BASE_URL = process.env.REACT_APP_API_URL;
// Map filenames to imports
const imageMap = {
  'person.jpg': personImg,
  'event.jpg': eventImg,
  'gaurd2.webp': guardImg,
  'cctv.jpeg': cctvImg,
  'alarm.jpeg': fireImg
};

function Hero() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/home`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHomeData(data.data);
        } else {
          setError(data.message || 'Failed to load homepage data');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">Loading homepage...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <section className="hero-section">
      {/* HERO CAROUSEL */}
      <div className="hero-carousel-wrapper">
        <Carousel fade controls={false} indicators={false} interval={4000}>
          {homeData.carousel_slides.map((slide, index) => (
            <Carousel.Item key={index}>
              <div
                className="carousel-bg zoom"
                style={{ backgroundImage: `url(${imageMap[slide.image]})` }}
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
          <h1 className="hero-title display-3">Trusted Protection. Proven Performance.</h1>
          <p className="hero-subtitle">
            GKO Security delivers top-tier security solutions, tailored for East Africa.
          </p>
          <Link to="/about" className="hero-btn btn btn-primary">
            Learn More About Us
          </Link>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section className="services py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4 text-primary">Our Security Services</h2>
          <Row className="g-4 text-center">
            {homeData.services.map((service, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 service-card">
                  <Card.Img variant="top" src={imageMap[service.image]} alt={service.title} />
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
            {homeData.testimonials.map((testimonial, index) => (
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
    </section>
  );
}

export default Hero;



