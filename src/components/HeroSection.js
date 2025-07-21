import React from 'react';
import './HeroSection.css';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';

// Import all images from src/assets
import slide1 from '../assets/person.jpg';
import slide2 from '../assets/event.jpg';
import slide3 from '../assets/gaurd2.webp';
import guardImg from '../assets/gaurd2.webp';
import cctvImg from '../assets/cctv.jpeg';
import fireImg from '../assets/alarm.jpeg';
import eventImg from '../assets/event.jpg';
import personImg from '../assets/person.jpg';

function Hero() {
  return (
    <section className="hero-section">

      {/* HERO CAROUSEL WITH OVERLAYED TEXT */}
      <div className="hero-carousel-wrapper">
        <Carousel fade controls={false} indicators={false} interval={4000}>
          <Carousel.Item>
            <div className="carousel-bg zoom" style={{ backgroundImage: `url(${slide1})` }}></div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-bg zoom" style={{ backgroundImage: `url(${slide2})` }}></div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-bg zoom" style={{ backgroundImage: `url(${slide3})` }}></div>
          </Carousel.Item>
        </Carousel>

        {/* OVERLAY TEXT */}
        <div className="hero-overlay-content text-center">
          <h1 className="hero-title display-3">Trusted Protection. Proven Performance.</h1>
          <p className="hero-subtitle">
            GKO Security delivers top-tier security solutions, tailored for East Africa.
          </p>
          <a href="/about" className="hero-btn">Learn More About Us</a>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section className="services py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4 text-primary">Our Security Services</h2>
          <Row className="g-4 text-center">
            <Col md={4}>
              <Card className="h-100 service-card">
                <Card.Img variant="top" src={guardImg} alt="Guard Services" />
                <Card.Body>
                  <Card.Title>Guard Services</Card.Title>
                  <Card.Text>
                    Professional, uniformed guards for businesses, homes, and events.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 service-card">
                <Card.Img variant="top" src={cctvImg} alt="CCTV Installation" />
                <Card.Body>
                  <Card.Title>CCTV Installation</Card.Title>
                  <Card.Text>
                    Reliable and secure surveillance solutions to monitor your property 24/7.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 service-card">
                <Card.Img variant="top" src={fireImg} alt="Fire Extinguishers" />
                <Card.Body>
                  <Card.Title>Fire Extinguisher Installation</Card.Title>
                  <Card.Text>
                    Certified fire safety solutions for offices, homes, and institutions.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 service-card">
                <Card.Img variant="top" src={eventImg} alt="Event Security" />
                <Card.Body>
                  <Card.Title>Event Security</Card.Title>
                  <Card.Text>
                    Trained personnel to secure corporate, private, and public events.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 service-card">
                <Card.Img variant="top" src={personImg} alt="Security Patrols" />
                <Card.Body>
                  <Card.Title>Security Patrols</Card.Title>
                  <Card.Text>
                    Regular mobile patrol services to ensure perimeter safety and quick response.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 service-card">
                <Card.Img variant="top" src={personImg} alt="Access Control" />
                <Card.Body>
                  <Card.Title>Access Control Systems</Card.Title>
                  <Card.Text>
                    Modern electronic systems to regulate access to your facilities.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials py-5">
        <Container>
          <h2 className="text-center mb-4 text-primary">What Our Clients Say</h2>
          <Row className="g-4">
            <Col md={6}>
              <Card className="testimonial-card p-3 shadow-sm">
                <Card.Body>
                  <Card.Text>
                    "The GKO team provided excellent security for our annual conference. They were alert, courteous, and well-equipped."
                  </Card.Text>
                  <Card.Footer className="text-muted text-end">– Brenda N., Events Coordinator</Card.Footer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="testimonial-card p-3 shadow-sm">
                <Card.Body>
                  <Card.Text>
                    "We feel confident leaving our premises in the hands of GKO. Their patrol team is dependable and responsive."
                  </Card.Text>
                  <Card.Footer className="text-muted text-end">– Michael O., Business Owner</Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </section>
  );
}

export default Hero;
