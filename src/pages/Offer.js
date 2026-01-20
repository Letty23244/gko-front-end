// src/pages/Offers.js
import React from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import "../pages/offer.css"; // optional for custom styles

// Sample images for offers
import offer1 from "../assets/offer1.webp";
import offer2 from "../assets/offer2.jpg";
import offer3 from "../assets/offer3.webp";
import offer4 from "../assets/offer4.webp";

export default function OffersPage() {
  const offers = [
    {
      image: offer1,
      title: "Weekend Getaway",
      description: "Stay 2 nights and get 20% off your weekend stay.",
      link: "/contact",
    },
    {
      image: offer2,
      title: "Dining Delight",
      description: "Book a table at our restaurant and enjoy a complimentary dessert.",
      link: "/dining",
    },
    {
      image: offer3,
      title: "Spa & Wellness",
      description: "Relax with a 30% discount on spa treatments.",
      link: "/spa",
    },
    {
      image: offer4,
      title: "Family Package",
      description: "Kids stay free and enjoy breakfast with the family.",
      link: "/contact",
    },
  ];

  return (
    <div className="offers-page">
      {/* Hero Section */}
      <Carousel fade className="offers-hero">
        {[offer1, offer2, offer3].map((img, index) => (
          <Carousel.Item key={index}>
            <div
              className="hero-slide"
              style={{
                backgroundImage: `url(${img})`,
                height: "60vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="hero-overlay text-center text-white d-flex flex-column justify-content-center align-items-center h-100">
                <h1 className="display-3 fw-bold">Exclusive Offers</h1>
                <p className="lead mb-3">
                  Unforgettable experiences at unbeatable rates
                </p>
                <Button variant="light" size="lg" href="/contact">
                  Book Now
                </Button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="py-5">
        {/* Intro */}
        <section className="text-center mb-5">
          <h2 className="mb-4">Our Special Offers</h2>
          <p className="lead text-muted mx-auto intro-text">
            Discover exclusive packages, seasonal promotions, and curated experiences
            that make your stay at Hotel Justino truly unforgettable.
          </p>
        </section>

        {/* Offers Grid */}
        <section className="mb-5">
          <Row className="g-4">
            {offers.map((offer, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="offer-card border-0 shadow-sm h-100">
                  <div
                    className="card-image"
                    style={{
                      backgroundImage: `url(${offer.image})`,
                      height: "200px",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{offer.title}</Card.Title>
                    <Card.Text>{offer.description}</Card.Text>
                    <Button variant="primary" href={offer.link}>
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-5">
          <h2 className="mb-3">Ready to Experience Luxury?</h2>
          <p className="lead mb-4">
            Take advantage of our exclusive offers and create memories that last a lifetime.
          </p>
          <Button variant="dark" size="lg" href="/contact">
            Book Your Stay
          </Button>
        </section>
      </Container>
    </div>
  );
}
