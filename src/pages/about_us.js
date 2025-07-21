import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaEye, FaBullseye, FaHeart, FaUsers, FaHandshake, FaShieldAlt } from "react-icons/fa";
import securityTeamImg from "../assets/gaurd2.webp";
import "./about_us.css";


export default function AboutPage() {
  return (
    <Container className="py-5">
      <h1 className="text-center text-primary mb-4">About GKO Security Ltd</h1>

      <p className="text-center mb-5 lead">
        GKO Security Ltd was established in 2011 to offer security solutions due to increasing threats to people and their property.
        Today, we are one of Uganda’s leading security companies, trusted by individuals and organizations alike.
      </p>

      <Row className="mb-5 align-items-center">
        <Col md={6}>
          <p>
            From a humble beginning rooted in quality service, we've grown into a major employer with over 1,000 Ugandans in skilled and semi-skilled roles.
            Our head office is located at Plot 1336, Port Bell Road, Kitintale, P.O BOX 21603, Kampala, Uganda.
          </p>
          <p>
            With a team of trained and dedicated professionals, we deliver peace of mind through reliable and secure service.
          </p>
        </Col>
        <Col md={6}>
          <img
        src={securityTeamImg}
        alt="GKO Security Team"
        className="img-fluid rounded shadow"
        style={{ width: "100%", marginBottom: "20px" }} // Optional style
      />
        </Col>
      </Row>

      <Row className="g-4 mb-5 hover-card mb-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
        <Card.Title className="text-primary"><FaEye /> Our Vision</Card.Title>

              <Card.Text>
                To be the leading service provider in the region by delivering trusted, professional,
                and innovative security solutions that guarantee the safety of individuals, institutions, and property.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm , hover-card mb-4">
            <Card.Body>
              <Card.Title className="text-primary"><FaBullseye /> Our Mission</Card.Title>
              <Card.Text>
                To provide reliable, customer-tailored security services through trained personnel and modern technology,
                with a deep understanding of each client’s unique needs.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm ,hover-card mb-4" >
        <Card.Body>
          <Card.Title className="text-primary"><FaHeart /> Our Core Values</Card.Title>
          <ul className="mt-3">
            <li><strong><FaShieldAlt /> Integrity:</strong> We believe in honesty and fairness in everything we do.</li>
            <li><strong><FaBullseye /> Pursuit of Excellence:</strong> We constantly strive to improve and deliver the best results.</li>
            <li><strong><FaUsers /> Teamwork:</strong> We support one another to achieve shared goals.</li>
            <li><strong><FaHandshake /> Partnership:</strong> We build long-term relationships with clients and partners.</li>
            <li><strong><FaShieldAlt /> Ownership:</strong> We take responsibility and deliver on our promises consistently.</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}
