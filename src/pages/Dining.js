// src/pages/Dining.js
import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import "../pages/dining.css"; // optional, create for custom styles

// Import placeholder images (replace with your hotel images later)
import dining1 from "../assets/dining1.jpg";
import dining2 from "../assets/dining2.jpg";
import dining3 from "../assets/dining3.jpg";
import dining4 from "../assets/dining4.jpg";

export default function DiningPage() {
  const menuItems = [
    {
      image: dining1,
      title: "Grilled Tilapia",
      description: "Served with lemon butter sauce and seasonal vegetables.",
      price: "$12",
    },
    {
      image: dining2,
      title: "Beef Steak",
      description: "Juicy prime beef with garlic mashed potatoes.",
      price: "$18",
    },
    {
      image: dining3,
      title: "Vegetarian Pasta",
      description: "Fresh vegetables with homemade tomato sauce.",
      price: "$10",
    },
    {
      image: dining4,
      title: "Chocolate Lava Cake",
      description: "Rich and molten chocolate cake with vanilla ice cream.",
      price: "$7",
    },
  ];

  const galleryImages = [dining1, dining2, dining3, dining4];

  return (
    <div className="dining-page">
      {/* Hero Section */}
      <div
        className="dining-hero text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${dining1})`,
          height: "60vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="display-3 fw-bold">Savor Culinary Excellence</h1>
          <p className="lead">Fine dining, casual dining, and everything in between</p>
          <Button href="/contact" variant="light" size="lg">
            Reserve a Table
          </Button>
        </div>
      </div>

      <Container className="py-16">
        {/* Overview */}
        <section className="mb-16 text-center">
          <h2 className="mb-4">Welcome to Hotel Justino Restaurant</h2>
          <p className="lead text-muted max-w-3xl mx-auto">
            At Hotel Justino, our restaurant offers a blend of traditional Ugandan flavors and international cuisine.
            Enjoy breakfast, lunch, and dinner in a modern, elegant dining space with spectacular views of Kampala.
            We pride ourselves on excellent service, fresh ingredients, and an unforgettable culinary experience.
          </p>
        </section>

        {/* Menu Highlights */}
        <section className="mb-16">
          <h2 className="text-center mb-12">Our Menu Highlights</h2>
          <Row>
            {menuItems.map((item, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="h-100 shadow-sm rounded-3xl border-0">
                  <Card.Img variant="top" src={item.image} className="rounded-top-3xl" />
                  <Card.Body className="text-center">
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Badge bg="success" className="p-2">{item.price}</Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Chef's Recommendations */}
        <section className="mb-16 text-center">
          <h2 className="mb-6">Chef’s Recommendations</h2>
          <p className="lead text-muted max-w-2xl mx-auto">
            Our chefs carefully select the best dishes each week. Enjoy seasonal specials and must-try creations.
          </p>
          <Row className="mt-8 justify-content-center">
            {menuItems.slice(0, 2).map((item, index) => (
              <Col md={5} key={index} className="mb-4">
                <Card className="h-100 shadow-lg border-0">
                  <Card.Img variant="top" src={item.image} className="rounded-top-3xl" />
                  <Card.Body className="text-center">
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Badge bg="warning" className="p-2">Chef's Special</Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Dining Gallery */}
        <section className="mb-16">
          <h2 className="text-center mb-12">Gallery</h2>
          <Row className="g-4">
            {galleryImages.map((img, index) => (
              <Col md={3} sm={6} key={index}>
                <Card className="border-0 shadow-sm rounded-3xl overflow-hidden">
                  <Card.Img variant="top" src={img} className="hover-scale transition-transform duration-500" />
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Reservation CTA */}
        <section className="text-center mb-16">
          <h2 className="mb-4">Reserve Your Table Today</h2>
          <p className="lead mb-6">
            Call or email us to book a table for an unforgettable dining experience at Hotel Justino.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Reserve Now
          </Button>
        </section>
      </Container>
    </div>
  );
}
