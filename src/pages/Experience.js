import React from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import "../pages/experience.css";

// Images (replace with your real images later)
import exp1 from "../assets/exp1.jpg";
import exp2 from "../assets/exp2.jpg";
import exp3 from "../assets/exp3.jpg";
import exp4 from "../assets/exp4.jpg";

export default function ExperiencePage() {
  const experiences = [
    {
      image: exp1,
      title: "Wellness & Relaxation",
      description:
        "Unwind in serene spaces designed to restore balance, calm, and inner peace.",
    },
    {
      image: exp2,
      title: "Culinary Journeys",
      description:
        "Indulge in refined dining inspired by international flavors and local heritage.",
    },
    {
      image: exp3,
      title: "Cultural Evenings",
      description:
        "Enjoy live music, cultural performances, and elegant evening moments.",
    },
    {
      image: exp4,
      title: "Scenic Escapes",
      description:
        "Wake up to breathtaking views and tranquil surroundings.",
    },
  ];

  return (
    <div className="experience-page">
      {/* HERO CAROUSEL */}
      <Carousel fade className="experience-hero">
        {[exp1, exp2, exp3].map((img, index) => (
          <Carousel.Item key={index}>
            <div
              className="hero-slide"
              style={{
                backgroundImage: `url(${img})`,
              }}
            >
              <div className="hero-overlay">
                <h1 className="display-3 fw-bold">
                  Experience Timeless Elegance
                </h1>
                <p className="lead">
                  Where comfort, culture, and unforgettable moments come together
                </p>
                <Button variant="light" size="lg" href="/contact">
                  Plan Your Experience
                </Button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="py-5">
        {/* INTRO */}
        <section className="text-center mb-5">
          <h2 className="mb-4">A World of Refined Experiences</h2>
          <p className="lead text-muted mx-auto intro-text">
            Inspired by Serena Hotel’s refined elegance, our experiences are
            thoughtfully curated to inspire relaxation, connection, and
            discovery. Every moment is designed to leave a lasting impression.
          </p>
        </section>

        {/* EXPERIENCE CARDS */}
        <section className="mb-5">
          <Row>
            {experiences.map((item, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="experience-card border-0 shadow-sm h-100">
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* FEATURED EXPERIENCE */}
        <section className="featured-experience mb-5">
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src={exp2}
                alt="Featured Experience"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2 className="mb-3">Signature Dining Experience</h2>
              <p className="lead text-muted">
                Enjoy an exquisite dining experience set in an elegant
                atmosphere, where flavors, service, and ambiance blend
                seamlessly into unforgettable moments.
              </p>
              <Button variant="primary" href="/dining">
                Explore Dining
              </Button>
            </Col>
          </Row>
        </section>

        {/* GALLERY */}
        <section className="mb-5">
          <h2 className="text-center mb-4">Moments That Become Memories</h2>
          <Row className="g-4">
            {[exp1, exp2, exp3, exp4].map((img, index) => (
              <Col md={3} sm={6} key={index}>
                <div
                  className="gallery-image"
                  style={{ backgroundImage: `url(${img})` }}
                />
              </Col>
            ))}
          </Row>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="mb-3">Your Journey Begins Here</h2>
          <p className="lead mb-4">
            Discover experiences crafted with elegance, comfort, and care.
          </p>
          <Button variant="dark" size="lg" href="/contact">
            Book Your Stay
          </Button>
        </section>
      </Container>
    </div>
  );
}
